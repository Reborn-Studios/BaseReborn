function GA(e, t) {
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
var _u =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function uo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var IS = { exports: {} },
  sf = {},
  TS = { exports: {} },
  Me = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Is = Symbol.for("react.element"),
  KA = Symbol.for("react.portal"),
  QA = Symbol.for("react.fragment"),
  YA = Symbol.for("react.strict_mode"),
  XA = Symbol.for("react.profiler"),
  ZA = Symbol.for("react.provider"),
  JA = Symbol.for("react.context"),
  eD = Symbol.for("react.forward_ref"),
  tD = Symbol.for("react.suspense"),
  nD = Symbol.for("react.memo"),
  rD = Symbol.for("react.lazy"),
  b1 = Symbol.iterator;
function iD(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (b1 && e[b1]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var PS = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  RS = Object.assign,
  AS = {};
function tu(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = AS),
    (this.updater = n || PS);
}
tu.prototype.isReactComponent = {};
tu.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
tu.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function DS() {}
DS.prototype = tu.prototype;
function em(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = AS),
    (this.updater = n || PS);
}
var tm = (em.prototype = new DS());
tm.constructor = em;
RS(tm, tu.prototype);
tm.isPureReactComponent = !0;
var _1 = Array.isArray,
  NS = Object.prototype.hasOwnProperty,
  nm = { current: null },
  MS = { key: !0, ref: !0, __self: !0, __source: !0 };
function LS(e, t, n) {
  var r,
    i = {},
    l = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (l = "" + t.key),
    t))
      NS.call(t, r) && !MS.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var f = Array(a), d = 0; d < a; d++) f[d] = arguments[d + 2];
    i.children = f;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: Is,
    type: e,
    key: l,
    ref: s,
    props: i,
    _owner: nm.current,
  };
}
function oD(e, t) {
  return {
    $$typeof: Is,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function rm(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Is;
}
function lD(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var O1 = /\/+/g;
function Ip(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? lD("" + e.key)
    : t.toString(36);
}
function Ja(e, t, n, r, i) {
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
          case Is:
          case KA:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + Ip(s, 0) : r),
      _1(i)
        ? ((n = ""),
          e != null && (n = e.replace(O1, "$&/") + "/"),
          Ja(i, t, n, "", function (d) {
            return d;
          }))
        : i != null &&
          (rm(i) &&
            (i = oD(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(O1, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), _1(e)))
    for (var a = 0; a < e.length; a++) {
      l = e[a];
      var f = r + Ip(l, a);
      s += Ja(l, t, n, f, i);
    }
  else if (((f = iD(e)), typeof f == "function"))
    for (e = f.call(e), a = 0; !(l = e.next()).done; )
      (l = l.value), (f = r + Ip(l, a++)), (s += Ja(l, t, n, f, i));
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
function Ia(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ja(e, r, "", "", function (l) {
      return t.call(n, l, i++);
    }),
    r
  );
}
function uD(e) {
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
var un = { current: null },
  ec = { transition: null },
  sD = {
    ReactCurrentDispatcher: un,
    ReactCurrentBatchConfig: ec,
    ReactCurrentOwner: nm,
  };
function FS() {
  throw Error("act(...) is not supported in production builds of React.");
}
Me.Children = {
  map: Ia,
  forEach: function (e, t, n) {
    Ia(
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
      Ia(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Ia(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!rm(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
Me.Component = tu;
Me.Fragment = QA;
Me.Profiler = XA;
Me.PureComponent = em;
Me.StrictMode = YA;
Me.Suspense = tD;
Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sD;
Me.act = FS;
Me.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = RS({}, e.props),
    i = e.key,
    l = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (s = nm.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (f in t)
      NS.call(t, f) &&
        !MS.hasOwnProperty(f) &&
        (r[f] = t[f] === void 0 && a !== void 0 ? a[f] : t[f]);
  }
  var f = arguments.length - 2;
  if (f === 1) r.children = n;
  else if (1 < f) {
    a = Array(f);
    for (var d = 0; d < f; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: Is, type: e.type, key: i, ref: l, props: r, _owner: s };
};
Me.createContext = function (e) {
  return (
    (e = {
      $$typeof: JA,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ZA, _context: e }),
    (e.Consumer = e)
  );
};
Me.createElement = LS;
Me.createFactory = function (e) {
  var t = LS.bind(null, e);
  return (t.type = e), t;
};
Me.createRef = function () {
  return { current: null };
};
Me.forwardRef = function (e) {
  return { $$typeof: eD, render: e };
};
Me.isValidElement = rm;
Me.lazy = function (e) {
  return { $$typeof: rD, _payload: { _status: -1, _result: e }, _init: uD };
};
Me.memo = function (e, t) {
  return { $$typeof: nD, type: e, compare: t === void 0 ? null : t };
};
Me.startTransition = function (e) {
  var t = ec.transition;
  ec.transition = {};
  try {
    e();
  } finally {
    ec.transition = t;
  }
};
Me.unstable_act = FS;
Me.useCallback = function (e, t) {
  return un.current.useCallback(e, t);
};
Me.useContext = function (e) {
  return un.current.useContext(e);
};
Me.useDebugValue = function () {};
Me.useDeferredValue = function (e) {
  return un.current.useDeferredValue(e);
};
Me.useEffect = function (e, t) {
  return un.current.useEffect(e, t);
};
Me.useId = function () {
  return un.current.useId();
};
Me.useImperativeHandle = function (e, t, n) {
  return un.current.useImperativeHandle(e, t, n);
};
Me.useInsertionEffect = function (e, t) {
  return un.current.useInsertionEffect(e, t);
};
Me.useLayoutEffect = function (e, t) {
  return un.current.useLayoutEffect(e, t);
};
Me.useMemo = function (e, t) {
  return un.current.useMemo(e, t);
};
Me.useReducer = function (e, t, n) {
  return un.current.useReducer(e, t, n);
};
Me.useRef = function (e) {
  return un.current.useRef(e);
};
Me.useState = function (e) {
  return un.current.useState(e);
};
Me.useSyncExternalStore = function (e, t, n) {
  return un.current.useSyncExternalStore(e, t, n);
};
Me.useTransition = function () {
  return un.current.useTransition();
};
Me.version = "18.3.1";
TS.exports = Me;
var I = TS.exports;
const Ae = uo(I),
  zS = GA({ __proto__: null, default: Ae }, [I]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var aD = I,
  cD = Symbol.for("react.element"),
  fD = Symbol.for("react.fragment"),
  dD = Object.prototype.hasOwnProperty,
  pD = aD.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  hD = { key: !0, ref: !0, __self: !0, __source: !0 };
function $S(e, t, n) {
  var r,
    i = {},
    l = null,
    s = null;
  n !== void 0 && (l = "" + n),
    t.key !== void 0 && (l = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) dD.call(t, r) && !hD.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: cD,
    type: e,
    key: l,
    ref: s,
    props: i,
    _owner: pD.current,
  };
}
sf.Fragment = fD;
sf.jsx = $S;
sf.jsxs = $S;
IS.exports = sf;
var im = IS.exports;
const Cn = im.Fragment,
  W = im.jsx,
  we = im.jsxs;
var BS = { exports: {} },
  Hn = {},
  US = { exports: {} },
  HS = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(H, Z) {
    var _ = H.length;
    H.push(Z);
    e: for (; 0 < _; ) {
      var re = (_ - 1) >>> 1,
        ae = H[re];
      if (0 < i(ae, Z)) (H[re] = Z), (H[_] = ae), (_ = re);
      else break e;
    }
  }
  function n(H) {
    return H.length === 0 ? null : H[0];
  }
  function r(H) {
    if (H.length === 0) return null;
    var Z = H[0],
      _ = H.pop();
    if (_ !== Z) {
      H[0] = _;
      e: for (var re = 0, ae = H.length, O = ae >>> 1; re < O; ) {
        var de = 2 * (re + 1) - 1,
          Pe = H[de],
          me = de + 1,
          De = H[me];
        if (0 > i(Pe, _))
          me < ae && 0 > i(De, Pe)
            ? ((H[re] = De), (H[me] = _), (re = me))
            : ((H[re] = Pe), (H[de] = _), (re = de));
        else if (me < ae && 0 > i(De, _)) (H[re] = De), (H[me] = _), (re = me);
        else break e;
      }
    }
    return Z;
  }
  function i(H, Z) {
    var _ = H.sortIndex - Z.sortIndex;
    return _ !== 0 ? _ : H.id - Z.id;
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
    A = typeof setTimeout == "function" ? setTimeout : null,
    y = typeof clearTimeout == "function" ? clearTimeout : null,
    w = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function k(H) {
    for (var Z = n(d); Z !== null; ) {
      if (Z.callback === null) r(d);
      else if (Z.startTime <= H)
        r(d), (Z.sortIndex = Z.expirationTime), t(f, Z);
      else break;
      Z = n(d);
    }
  }
  function R(H) {
    if (((S = !1), k(H), !E))
      if (n(f) !== null) (E = !0), ue(D);
      else {
        var Z = n(d);
        Z !== null && ne(R, Z.startTime - H);
      }
  }
  function D(H, Z) {
    (E = !1), S && ((S = !1), y(z), (z = -1)), (m = !0);
    var _ = v;
    try {
      for (
        k(Z), g = n(f);
        g !== null && (!(g.expirationTime > Z) || (H && !$()));

      ) {
        var re = g.callback;
        if (typeof re == "function") {
          (g.callback = null), (v = g.priorityLevel);
          var ae = re(g.expirationTime <= Z);
          (Z = e.unstable_now()),
            typeof ae == "function" ? (g.callback = ae) : g === n(f) && r(f),
            k(Z);
        } else r(f);
        g = n(f);
      }
      if (g !== null) var O = !0;
      else {
        var de = n(d);
        de !== null && ne(R, de.startTime - Z), (O = !1);
      }
      return O;
    } finally {
      (g = null), (v = _), (m = !1);
    }
  }
  var T = !1,
    F = null,
    z = -1,
    q = 5,
    G = -1;
  function $() {
    return !(e.unstable_now() - G < q);
  }
  function Q() {
    if (F !== null) {
      var H = e.unstable_now();
      G = H;
      var Z = !0;
      try {
        Z = F(!0, H);
      } finally {
        Z ? B() : ((T = !1), (F = null));
      }
    } else T = !1;
  }
  var B;
  if (typeof w == "function")
    B = function () {
      w(Q);
    };
  else if (typeof MessageChannel < "u") {
    var U = new MessageChannel(),
      J = U.port2;
    (U.port1.onmessage = Q),
      (B = function () {
        J.postMessage(null);
      });
  } else
    B = function () {
      A(Q, 0);
    };
  function ue(H) {
    (F = H), T || ((T = !0), B());
  }
  function ne(H, Z) {
    z = A(function () {
      H(e.unstable_now());
    }, Z);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (H) {
      H.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      E || m || ((E = !0), ue(D));
    }),
    (e.unstable_forceFrameRate = function (H) {
      0 > H || 125 < H
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (q = 0 < H ? Math.floor(1e3 / H) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(f);
    }),
    (e.unstable_next = function (H) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = v;
      }
      var _ = v;
      v = Z;
      try {
        return H();
      } finally {
        v = _;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (H, Z) {
      switch (H) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          H = 3;
      }
      var _ = v;
      v = H;
      try {
        return Z();
      } finally {
        v = _;
      }
    }),
    (e.unstable_scheduleCallback = function (H, Z, _) {
      var re = e.unstable_now();
      switch (
        (typeof _ == "object" && _ !== null
          ? ((_ = _.delay), (_ = typeof _ == "number" && 0 < _ ? re + _ : re))
          : (_ = re),
        H)
      ) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return (
        (ae = _ + ae),
        (H = {
          id: p++,
          callback: Z,
          priorityLevel: H,
          startTime: _,
          expirationTime: ae,
          sortIndex: -1,
        }),
        _ > re
          ? ((H.sortIndex = _),
            t(d, H),
            n(f) === null &&
              H === n(d) &&
              (S ? (y(z), (z = -1)) : (S = !0), ne(R, _ - re)))
          : ((H.sortIndex = ae), t(f, H), E || m || ((E = !0), ue(D))),
        H
      );
    }),
    (e.unstable_shouldYield = $),
    (e.unstable_wrapCallback = function (H) {
      var Z = v;
      return function () {
        var _ = v;
        v = Z;
        try {
          return H.apply(this, arguments);
        } finally {
          v = _;
        }
      };
    });
})(HS);
US.exports = HS;
var gD = US.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mD = I,
  Bn = gD;
function te(e) {
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
var jS = new Set(),
  ls = {};
function Vo(e, t) {
  Bl(e, t), Bl(e + "Capture", t);
}
function Bl(e, t) {
  for (ls[e] = t, e = 0; e < t.length; e++) jS.add(t[e]);
}
var fi = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Nh = Object.prototype.hasOwnProperty,
  vD =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  I1 = {},
  T1 = {};
function yD(e) {
  return Nh.call(T1, e)
    ? !0
    : Nh.call(I1, e)
    ? !1
    : vD.test(e)
    ? (T1[e] = !0)
    : ((I1[e] = !0), !1);
}
function wD(e, t, n, r) {
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
function xD(e, t, n, r) {
  if (t === null || typeof t > "u" || wD(e, t, n, r)) return !0;
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
function sn(e, t, n, r, i, l, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = s);
}
var Ht = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ht[e] = new sn(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Ht[t] = new sn(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Ht[e] = new sn(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Ht[e] = new sn(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ht[e] = new sn(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ht[e] = new sn(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ht[e] = new sn(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ht[e] = new sn(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ht[e] = new sn(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var om = /[\-:]([a-z])/g;
function lm(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(om, lm);
    Ht[t] = new sn(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(om, lm);
    Ht[t] = new sn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(om, lm);
  Ht[t] = new sn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ht[e] = new sn(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ht.xlinkHref = new sn(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ht[e] = new sn(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function um(e, t, n, r) {
  var i = Ht.hasOwnProperty(t) ? Ht[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (xD(t, n, i, r) && (n = null),
    r || i === null
      ? yD(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
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
var mi = mD.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Ta = Symbol.for("react.element"),
  ml = Symbol.for("react.portal"),
  vl = Symbol.for("react.fragment"),
  sm = Symbol.for("react.strict_mode"),
  Mh = Symbol.for("react.profiler"),
  WS = Symbol.for("react.provider"),
  VS = Symbol.for("react.context"),
  am = Symbol.for("react.forward_ref"),
  Lh = Symbol.for("react.suspense"),
  Fh = Symbol.for("react.suspense_list"),
  cm = Symbol.for("react.memo"),
  Ni = Symbol.for("react.lazy"),
  qS = Symbol.for("react.offscreen"),
  P1 = Symbol.iterator;
function Ou(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (P1 && e[P1]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var vt = Object.assign,
  Tp;
function Fu(e) {
  if (Tp === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Tp = (t && t[1]) || "";
    }
  return (
    `
` +
    Tp +
    e
  );
}
var Pp = !1;
function Rp(e, t) {
  if (!e || Pp) return "";
  Pp = !0;
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
    (Pp = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Fu(e) : "";
}
function SD(e) {
  switch (e.tag) {
    case 5:
      return Fu(e.type);
    case 16:
      return Fu("Lazy");
    case 13:
      return Fu("Suspense");
    case 19:
      return Fu("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Rp(e.type, !1)), e;
    case 11:
      return (e = Rp(e.type.render, !1)), e;
    case 1:
      return (e = Rp(e.type, !0)), e;
    default:
      return "";
  }
}
function zh(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case vl:
      return "Fragment";
    case ml:
      return "Portal";
    case Mh:
      return "Profiler";
    case sm:
      return "StrictMode";
    case Lh:
      return "Suspense";
    case Fh:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case VS:
        return (e.displayName || "Context") + ".Consumer";
      case WS:
        return (e._context.displayName || "Context") + ".Provider";
      case am:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case cm:
        return (
          (t = e.displayName || null), t !== null ? t : zh(e.type) || "Memo"
        );
      case Ni:
        (t = e._payload), (e = e._init);
        try {
          return zh(e(t));
        } catch {}
    }
  return null;
}
function ED(e) {
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
      return zh(t);
    case 8:
      return t === sm ? "StrictMode" : "Mode";
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
function to(e) {
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
function GS(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function CD(e) {
  var t = GS(e) ? "checked" : "value",
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
function Pa(e) {
  e._valueTracker || (e._valueTracker = CD(e));
}
function KS(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = GS(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function mc(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function $h(e, t) {
  var n = t.checked;
  return vt({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function R1(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = to(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function QS(e, t) {
  (t = t.checked), t != null && um(e, "checked", t, !1);
}
function Bh(e, t) {
  QS(e, t);
  var n = to(t.value),
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
    ? Uh(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Uh(e, t.type, to(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function A1(e, t, n) {
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
function Uh(e, t, n) {
  (t !== "number" || mc(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var zu = Array.isArray;
function Il(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + to(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Hh(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(te(91));
  return vt({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function D1(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(te(92));
      if (zu(n)) {
        if (1 < n.length) throw Error(te(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: to(n) };
}
function YS(e, t) {
  var n = to(t.value),
    r = to(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function N1(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function XS(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function jh(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? XS(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ra,
  ZS = (function (e) {
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
        Ra = Ra || document.createElement("div"),
          Ra.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ra.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function us(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Wu = {
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
  kD = ["Webkit", "ms", "Moz", "O"];
Object.keys(Wu).forEach(function (e) {
  kD.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Wu[t] = Wu[e]);
  });
});
function JS(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Wu.hasOwnProperty(e) && Wu[e])
    ? ("" + t).trim()
    : t + "px";
}
function eE(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = JS(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var bD = vt(
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
function Wh(e, t) {
  if (t) {
    if (bD[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(te(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(te(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(te(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(te(62));
  }
}
function Vh(e, t) {
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
var qh = null;
function fm(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Gh = null,
  Tl = null,
  Pl = null;
function M1(e) {
  if ((e = Rs(e))) {
    if (typeof Gh != "function") throw Error(te(280));
    var t = e.stateNode;
    t && ((t = pf(t)), Gh(e.stateNode, e.type, t));
  }
}
function tE(e) {
  Tl ? (Pl ? Pl.push(e) : (Pl = [e])) : (Tl = e);
}
function nE() {
  if (Tl) {
    var e = Tl,
      t = Pl;
    if (((Pl = Tl = null), M1(e), t)) for (e = 0; e < t.length; e++) M1(t[e]);
  }
}
function rE(e, t) {
  return e(t);
}
function iE() {}
var Ap = !1;
function oE(e, t, n) {
  if (Ap) return e(t, n);
  Ap = !0;
  try {
    return rE(e, t, n);
  } finally {
    (Ap = !1), (Tl !== null || Pl !== null) && (iE(), nE());
  }
}
function ss(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = pf(n);
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
  if (n && typeof n != "function") throw Error(te(231, t, typeof n));
  return n;
}
var Kh = !1;
if (fi)
  try {
    var Iu = {};
    Object.defineProperty(Iu, "passive", {
      get: function () {
        Kh = !0;
      },
    }),
      window.addEventListener("test", Iu, Iu),
      window.removeEventListener("test", Iu, Iu);
  } catch {
    Kh = !1;
  }
function _D(e, t, n, r, i, l, s, a, f) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (p) {
    this.onError(p);
  }
}
var Vu = !1,
  vc = null,
  yc = !1,
  Qh = null,
  OD = {
    onError: function (e) {
      (Vu = !0), (vc = e);
    },
  };
function ID(e, t, n, r, i, l, s, a, f) {
  (Vu = !1), (vc = null), _D.apply(OD, arguments);
}
function TD(e, t, n, r, i, l, s, a, f) {
  if ((ID.apply(this, arguments), Vu)) {
    if (Vu) {
      var d = vc;
      (Vu = !1), (vc = null);
    } else throw Error(te(198));
    yc || ((yc = !0), (Qh = d));
  }
}
function qo(e) {
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
function lE(e) {
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
function L1(e) {
  if (qo(e) !== e) throw Error(te(188));
}
function PD(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = qo(e)), t === null)) throw Error(te(188));
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
        if (l === n) return L1(i), e;
        if (l === r) return L1(i), t;
        l = l.sibling;
      }
      throw Error(te(188));
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
        if (!s) throw Error(te(189));
      }
    }
    if (n.alternate !== r) throw Error(te(190));
  }
  if (n.tag !== 3) throw Error(te(188));
  return n.stateNode.current === n ? e : t;
}
function uE(e) {
  return (e = PD(e)), e !== null ? sE(e) : null;
}
function sE(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = sE(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var aE = Bn.unstable_scheduleCallback,
  F1 = Bn.unstable_cancelCallback,
  RD = Bn.unstable_shouldYield,
  AD = Bn.unstable_requestPaint,
  kt = Bn.unstable_now,
  DD = Bn.unstable_getCurrentPriorityLevel,
  dm = Bn.unstable_ImmediatePriority,
  cE = Bn.unstable_UserBlockingPriority,
  wc = Bn.unstable_NormalPriority,
  ND = Bn.unstable_LowPriority,
  fE = Bn.unstable_IdlePriority,
  af = null,
  Br = null;
function MD(e) {
  if (Br && typeof Br.onCommitFiberRoot == "function")
    try {
      Br.onCommitFiberRoot(af, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var kr = Math.clz32 ? Math.clz32 : zD,
  LD = Math.log,
  FD = Math.LN2;
function zD(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((LD(e) / FD) | 0)) | 0;
}
var Aa = 64,
  Da = 4194304;
function $u(e) {
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
function xc(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    l = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var a = s & ~i;
    a !== 0 ? (r = $u(a)) : ((l &= s), l !== 0 && (r = $u(l)));
  } else (s = n & ~i), s !== 0 ? (r = $u(s)) : l !== 0 && (r = $u(l));
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
      (n = 31 - kr(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function $D(e, t) {
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
function BD(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var s = 31 - kr(l),
      a = 1 << s,
      f = i[s];
    f === -1
      ? (!(a & n) || a & r) && (i[s] = $D(a, t))
      : f <= t && (e.expiredLanes |= a),
      (l &= ~a);
  }
}
function Yh(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function dE() {
  var e = Aa;
  return (Aa <<= 1), !(Aa & 4194240) && (Aa = 64), e;
}
function Dp(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ts(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - kr(t)),
    (e[t] = n);
}
function UD(e, t) {
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
    var i = 31 - kr(n),
      l = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~l);
  }
}
function pm(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - kr(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var Ye = 0;
function pE(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var hE,
  hm,
  gE,
  mE,
  vE,
  Xh = !1,
  Na = [],
  Hi = null,
  ji = null,
  Wi = null,
  as = new Map(),
  cs = new Map(),
  Li = [],
  HD =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function z1(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Hi = null;
      break;
    case "dragenter":
    case "dragleave":
      ji = null;
      break;
    case "mouseover":
    case "mouseout":
      Wi = null;
      break;
    case "pointerover":
    case "pointerout":
      as.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      cs.delete(t.pointerId);
  }
}
function Tu(e, t, n, r, i, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [i],
      }),
      t !== null && ((t = Rs(t)), t !== null && hm(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function jD(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Hi = Tu(Hi, e, t, n, r, i)), !0;
    case "dragenter":
      return (ji = Tu(ji, e, t, n, r, i)), !0;
    case "mouseover":
      return (Wi = Tu(Wi, e, t, n, r, i)), !0;
    case "pointerover":
      var l = i.pointerId;
      return as.set(l, Tu(as.get(l) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (l = i.pointerId), cs.set(l, Tu(cs.get(l) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function yE(e) {
  var t = To(e.target);
  if (t !== null) {
    var n = qo(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = lE(n)), t !== null)) {
          (e.blockedOn = t),
            vE(e.priority, function () {
              gE(n);
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
function tc(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Zh(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (qh = r), n.target.dispatchEvent(r), (qh = null);
    } else return (t = Rs(n)), t !== null && hm(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function $1(e, t, n) {
  tc(e) && n.delete(t);
}
function WD() {
  (Xh = !1),
    Hi !== null && tc(Hi) && (Hi = null),
    ji !== null && tc(ji) && (ji = null),
    Wi !== null && tc(Wi) && (Wi = null),
    as.forEach($1),
    cs.forEach($1);
}
function Pu(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Xh ||
      ((Xh = !0),
      Bn.unstable_scheduleCallback(Bn.unstable_NormalPriority, WD)));
}
function fs(e) {
  function t(i) {
    return Pu(i, e);
  }
  if (0 < Na.length) {
    Pu(Na[0], e);
    for (var n = 1; n < Na.length; n++) {
      var r = Na[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Hi !== null && Pu(Hi, e),
      ji !== null && Pu(ji, e),
      Wi !== null && Pu(Wi, e),
      as.forEach(t),
      cs.forEach(t),
      n = 0;
    n < Li.length;
    n++
  )
    (r = Li[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Li.length && ((n = Li[0]), n.blockedOn === null); )
    yE(n), n.blockedOn === null && Li.shift();
}
var Rl = mi.ReactCurrentBatchConfig,
  Sc = !0;
function VD(e, t, n, r) {
  var i = Ye,
    l = Rl.transition;
  Rl.transition = null;
  try {
    (Ye = 1), gm(e, t, n, r);
  } finally {
    (Ye = i), (Rl.transition = l);
  }
}
function qD(e, t, n, r) {
  var i = Ye,
    l = Rl.transition;
  Rl.transition = null;
  try {
    (Ye = 4), gm(e, t, n, r);
  } finally {
    (Ye = i), (Rl.transition = l);
  }
}
function gm(e, t, n, r) {
  if (Sc) {
    var i = Zh(e, t, n, r);
    if (i === null) jp(e, t, r, Ec, n), z1(e, r);
    else if (jD(i, e, t, n, r)) r.stopPropagation();
    else if ((z1(e, r), t & 4 && -1 < HD.indexOf(e))) {
      for (; i !== null; ) {
        var l = Rs(i);
        if (
          (l !== null && hE(l),
          (l = Zh(e, t, n, r)),
          l === null && jp(e, t, r, Ec, n),
          l === i)
        )
          break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else jp(e, t, r, null, n);
  }
}
var Ec = null;
function Zh(e, t, n, r) {
  if (((Ec = null), (e = fm(r)), (e = To(e)), e !== null))
    if (((t = qo(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = lE(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Ec = e), null;
}
function wE(e) {
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
      switch (DD()) {
        case dm:
          return 1;
        case cE:
          return 4;
        case wc:
        case ND:
          return 16;
        case fE:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Bi = null,
  mm = null,
  nc = null;
function xE() {
  if (nc) return nc;
  var e,
    t = mm,
    n = t.length,
    r,
    i = "value" in Bi ? Bi.value : Bi.textContent,
    l = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[l - r]; r++);
  return (nc = i.slice(e, 1 < r ? 1 - r : void 0));
}
function rc(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Ma() {
  return !0;
}
function B1() {
  return !1;
}
function jn(e) {
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
        ? Ma
        : B1),
      (this.isPropagationStopped = B1),
      this
    );
  }
  return (
    vt(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Ma));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Ma));
      },
      persist: function () {},
      isPersistent: Ma,
    }),
    t
  );
}
var nu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  vm = jn(nu),
  Ps = vt({}, nu, { view: 0, detail: 0 }),
  GD = jn(Ps),
  Np,
  Mp,
  Ru,
  cf = vt({}, Ps, {
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
    getModifierState: ym,
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
        : (e !== Ru &&
            (Ru && e.type === "mousemove"
              ? ((Np = e.screenX - Ru.screenX), (Mp = e.screenY - Ru.screenY))
              : (Mp = Np = 0),
            (Ru = e)),
          Np);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Mp;
    },
  }),
  U1 = jn(cf),
  KD = vt({}, cf, { dataTransfer: 0 }),
  QD = jn(KD),
  YD = vt({}, Ps, { relatedTarget: 0 }),
  Lp = jn(YD),
  XD = vt({}, nu, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ZD = jn(XD),
  JD = vt({}, nu, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  eN = jn(JD),
  tN = vt({}, nu, { data: 0 }),
  H1 = jn(tN),
  nN = {
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
  rN = {
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
  iN = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function oN(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = iN[e]) ? !!t[e] : !1;
}
function ym() {
  return oN;
}
var lN = vt({}, Ps, {
    key: function (e) {
      if (e.key) {
        var t = nN[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = rc(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? rN[e.keyCode] || "Unidentified"
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
    getModifierState: ym,
    charCode: function (e) {
      return e.type === "keypress" ? rc(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? rc(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  uN = jn(lN),
  sN = vt({}, cf, {
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
  j1 = jn(sN),
  aN = vt({}, Ps, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ym,
  }),
  cN = jn(aN),
  fN = vt({}, nu, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  dN = jn(fN),
  pN = vt({}, cf, {
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
  hN = jn(pN),
  gN = [9, 13, 27, 32],
  wm = fi && "CompositionEvent" in window,
  qu = null;
fi && "documentMode" in document && (qu = document.documentMode);
var mN = fi && "TextEvent" in window && !qu,
  SE = fi && (!wm || (qu && 8 < qu && 11 >= qu)),
  W1 = String.fromCharCode(32),
  V1 = !1;
function EE(e, t) {
  switch (e) {
    case "keyup":
      return gN.indexOf(t.keyCode) !== -1;
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
function CE(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var yl = !1;
function vN(e, t) {
  switch (e) {
    case "compositionend":
      return CE(t);
    case "keypress":
      return t.which !== 32 ? null : ((V1 = !0), W1);
    case "textInput":
      return (e = t.data), e === W1 && V1 ? null : e;
    default:
      return null;
  }
}
function yN(e, t) {
  if (yl)
    return e === "compositionend" || (!wm && EE(e, t))
      ? ((e = xE()), (nc = mm = Bi = null), (yl = !1), e)
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
      return SE && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var wN = {
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
function q1(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!wN[e.type] : t === "textarea";
}
function kE(e, t, n, r) {
  tE(r),
    (t = Cc(t, "onChange")),
    0 < t.length &&
      ((n = new vm("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Gu = null,
  ds = null;
function xN(e) {
  ME(e, 0);
}
function ff(e) {
  var t = Sl(e);
  if (KS(t)) return e;
}
function SN(e, t) {
  if (e === "change") return t;
}
var bE = !1;
if (fi) {
  var Fp;
  if (fi) {
    var zp = "oninput" in document;
    if (!zp) {
      var G1 = document.createElement("div");
      G1.setAttribute("oninput", "return;"),
        (zp = typeof G1.oninput == "function");
    }
    Fp = zp;
  } else Fp = !1;
  bE = Fp && (!document.documentMode || 9 < document.documentMode);
}
function K1() {
  Gu && (Gu.detachEvent("onpropertychange", _E), (ds = Gu = null));
}
function _E(e) {
  if (e.propertyName === "value" && ff(ds)) {
    var t = [];
    kE(t, ds, e, fm(e)), oE(xN, t);
  }
}
function EN(e, t, n) {
  e === "focusin"
    ? (K1(), (Gu = t), (ds = n), Gu.attachEvent("onpropertychange", _E))
    : e === "focusout" && K1();
}
function CN(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return ff(ds);
}
function kN(e, t) {
  if (e === "click") return ff(t);
}
function bN(e, t) {
  if (e === "input" || e === "change") return ff(t);
}
function _N(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Or = typeof Object.is == "function" ? Object.is : _N;
function ps(e, t) {
  if (Or(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Nh.call(t, i) || !Or(e[i], t[i])) return !1;
  }
  return !0;
}
function Q1(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Y1(e, t) {
  var n = Q1(e);
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
    n = Q1(n);
  }
}
function OE(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? OE(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function IE() {
  for (var e = window, t = mc(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = mc(e.document);
  }
  return t;
}
function xm(e) {
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
function ON(e) {
  var t = IE(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    OE(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && xm(n)) {
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
          (i = Y1(n, l));
        var s = Y1(n, r);
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
var IN = fi && "documentMode" in document && 11 >= document.documentMode,
  wl = null,
  Jh = null,
  Ku = null,
  eg = !1;
function X1(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  eg ||
    wl == null ||
    wl !== mc(r) ||
    ((r = wl),
    "selectionStart" in r && xm(r)
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
    (Ku && ps(Ku, r)) ||
      ((Ku = r),
      (r = Cc(Jh, "onSelect")),
      0 < r.length &&
        ((t = new vm("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = wl))));
}
function La(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var xl = {
    animationend: La("Animation", "AnimationEnd"),
    animationiteration: La("Animation", "AnimationIteration"),
    animationstart: La("Animation", "AnimationStart"),
    transitionend: La("Transition", "TransitionEnd"),
  },
  $p = {},
  TE = {};
fi &&
  ((TE = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete xl.animationend.animation,
    delete xl.animationiteration.animation,
    delete xl.animationstart.animation),
  "TransitionEvent" in window || delete xl.transitionend.transition);
function df(e) {
  if ($p[e]) return $p[e];
  if (!xl[e]) return e;
  var t = xl[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in TE) return ($p[e] = t[n]);
  return e;
}
var PE = df("animationend"),
  RE = df("animationiteration"),
  AE = df("animationstart"),
  DE = df("transitionend"),
  NE = new Map(),
  Z1 =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function so(e, t) {
  NE.set(e, t), Vo(t, [e]);
}
for (var Bp = 0; Bp < Z1.length; Bp++) {
  var Up = Z1[Bp],
    TN = Up.toLowerCase(),
    PN = Up[0].toUpperCase() + Up.slice(1);
  so(TN, "on" + PN);
}
so(PE, "onAnimationEnd");
so(RE, "onAnimationIteration");
so(AE, "onAnimationStart");
so("dblclick", "onDoubleClick");
so("focusin", "onFocus");
so("focusout", "onBlur");
so(DE, "onTransitionEnd");
Bl("onMouseEnter", ["mouseout", "mouseover"]);
Bl("onMouseLeave", ["mouseout", "mouseover"]);
Bl("onPointerEnter", ["pointerout", "pointerover"]);
Bl("onPointerLeave", ["pointerout", "pointerover"]);
Vo(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Vo(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Vo("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Vo(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Vo(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Vo(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Bu =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  RN = new Set("cancel close invalid load scroll toggle".split(" ").concat(Bu));
function J1(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), TD(r, t, void 0, e), (e.currentTarget = null);
}
function ME(e, t) {
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
          J1(i, a, d), (l = f);
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
          J1(i, a, d), (l = f);
        }
    }
  }
  if (yc) throw ((e = Qh), (yc = !1), (Qh = null), e);
}
function ut(e, t) {
  var n = t[og];
  n === void 0 && (n = t[og] = new Set());
  var r = e + "__bubble";
  n.has(r) || (LE(t, e, 2, !1), n.add(r));
}
function Hp(e, t, n) {
  var r = 0;
  t && (r |= 4), LE(n, e, r, t);
}
var Fa = "_reactListening" + Math.random().toString(36).slice(2);
function hs(e) {
  if (!e[Fa]) {
    (e[Fa] = !0),
      jS.forEach(function (n) {
        n !== "selectionchange" && (RN.has(n) || Hp(n, !1, e), Hp(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Fa] || ((t[Fa] = !0), Hp("selectionchange", !1, t));
  }
}
function LE(e, t, n, r) {
  switch (wE(t)) {
    case 1:
      var i = VD;
      break;
    case 4:
      i = qD;
      break;
    default:
      i = gm;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Kh ||
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
function jp(e, t, n, r, i) {
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
          if (((s = To(a)), s === null)) return;
          if (((f = s.tag), f === 5 || f === 6)) {
            r = l = s;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  oE(function () {
    var d = l,
      p = fm(n),
      g = [];
    e: {
      var v = NE.get(e);
      if (v !== void 0) {
        var m = vm,
          E = e;
        switch (e) {
          case "keypress":
            if (rc(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = uN;
            break;
          case "focusin":
            (E = "focus"), (m = Lp);
            break;
          case "focusout":
            (E = "blur"), (m = Lp);
            break;
          case "beforeblur":
          case "afterblur":
            m = Lp;
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
            m = U1;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = QD;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = cN;
            break;
          case PE:
          case RE:
          case AE:
            m = ZD;
            break;
          case DE:
            m = dN;
            break;
          case "scroll":
            m = GD;
            break;
          case "wheel":
            m = hN;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = eN;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = j1;
        }
        var S = (t & 4) !== 0,
          A = !S && e === "scroll",
          y = S ? (v !== null ? v + "Capture" : null) : v;
        S = [];
        for (var w = d, k; w !== null; ) {
          k = w;
          var R = k.stateNode;
          if (
            (k.tag === 5 &&
              R !== null &&
              ((k = R),
              y !== null && ((R = ss(w, y)), R != null && S.push(gs(w, R, k)))),
            A)
          )
            break;
          w = w.return;
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
            n !== qh &&
            (E = n.relatedTarget || n.fromElement) &&
            (To(E) || E[di]))
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
              (E = E ? To(E) : null),
              E !== null &&
                ((A = qo(E)), E !== A || (E.tag !== 5 && E.tag !== 6)) &&
                (E = null))
            : ((m = null), (E = d)),
          m !== E)
        ) {
          if (
            ((S = U1),
            (R = "onMouseLeave"),
            (y = "onMouseEnter"),
            (w = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = j1),
              (R = "onPointerLeave"),
              (y = "onPointerEnter"),
              (w = "pointer")),
            (A = m == null ? v : Sl(m)),
            (k = E == null ? v : Sl(E)),
            (v = new S(R, w + "leave", m, n, p)),
            (v.target = A),
            (v.relatedTarget = k),
            (R = null),
            To(p) === d &&
              ((S = new S(y, w + "enter", E, n, p)),
              (S.target = k),
              (S.relatedTarget = A),
              (R = S)),
            (A = R),
            m && E)
          )
            t: {
              for (S = m, y = E, w = 0, k = S; k; k = cl(k)) w++;
              for (k = 0, R = y; R; R = cl(R)) k++;
              for (; 0 < w - k; ) (S = cl(S)), w--;
              for (; 0 < k - w; ) (y = cl(y)), k--;
              for (; w--; ) {
                if (S === y || (y !== null && S === y.alternate)) break t;
                (S = cl(S)), (y = cl(y));
              }
              S = null;
            }
          else S = null;
          m !== null && ew(g, v, m, S, !1),
            E !== null && A !== null && ew(g, A, E, S, !0);
        }
      }
      e: {
        if (
          ((v = d ? Sl(d) : window),
          (m = v.nodeName && v.nodeName.toLowerCase()),
          m === "select" || (m === "input" && v.type === "file"))
        )
          var D = SN;
        else if (q1(v))
          if (bE) D = bN;
          else {
            D = CN;
            var T = EN;
          }
        else
          (m = v.nodeName) &&
            m.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (D = kN);
        if (D && (D = D(e, d))) {
          kE(g, D, n, p);
          break e;
        }
        T && T(e, v, d),
          e === "focusout" &&
            (T = v._wrapperState) &&
            T.controlled &&
            v.type === "number" &&
            Uh(v, "number", v.value);
      }
      switch (((T = d ? Sl(d) : window), e)) {
        case "focusin":
          (q1(T) || T.contentEditable === "true") &&
            ((wl = T), (Jh = d), (Ku = null));
          break;
        case "focusout":
          Ku = Jh = wl = null;
          break;
        case "mousedown":
          eg = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (eg = !1), X1(g, n, p);
          break;
        case "selectionchange":
          if (IN) break;
        case "keydown":
        case "keyup":
          X1(g, n, p);
      }
      var F;
      if (wm)
        e: {
          switch (e) {
            case "compositionstart":
              var z = "onCompositionStart";
              break e;
            case "compositionend":
              z = "onCompositionEnd";
              break e;
            case "compositionupdate":
              z = "onCompositionUpdate";
              break e;
          }
          z = void 0;
        }
      else
        yl
          ? EE(e, n) && (z = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (z = "onCompositionStart");
      z &&
        (SE &&
          n.locale !== "ko" &&
          (yl || z !== "onCompositionStart"
            ? z === "onCompositionEnd" && yl && (F = xE())
            : ((Bi = p),
              (mm = "value" in Bi ? Bi.value : Bi.textContent),
              (yl = !0))),
        (T = Cc(d, z)),
        0 < T.length &&
          ((z = new H1(z, e, null, n, p)),
          g.push({ event: z, listeners: T }),
          F ? (z.data = F) : ((F = CE(n)), F !== null && (z.data = F)))),
        (F = mN ? vN(e, n) : yN(e, n)) &&
          ((d = Cc(d, "onBeforeInput")),
          0 < d.length &&
            ((p = new H1("onBeforeInput", "beforeinput", null, n, p)),
            g.push({ event: p, listeners: d }),
            (p.data = F)));
    }
    ME(g, t);
  });
}
function gs(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Cc(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      l = i.stateNode;
    i.tag === 5 &&
      l !== null &&
      ((i = l),
      (l = ss(e, n)),
      l != null && r.unshift(gs(e, l, i)),
      (l = ss(e, t)),
      l != null && r.push(gs(e, l, i))),
      (e = e.return);
  }
  return r;
}
function cl(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ew(e, t, n, r, i) {
  for (var l = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n,
      f = a.alternate,
      d = a.stateNode;
    if (f !== null && f === r) break;
    a.tag === 5 &&
      d !== null &&
      ((a = d),
      i
        ? ((f = ss(n, l)), f != null && s.unshift(gs(n, f, a)))
        : i || ((f = ss(n, l)), f != null && s.push(gs(n, f, a)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var AN = /\r\n?/g,
  DN = /\u0000|\uFFFD/g;
function tw(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      AN,
      `
`
    )
    .replace(DN, "");
}
function za(e, t, n) {
  if (((t = tw(t)), tw(e) !== t && n)) throw Error(te(425));
}
function kc() {}
var tg = null,
  ng = null;
function rg(e, t) {
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
var ig = typeof setTimeout == "function" ? setTimeout : void 0,
  NN = typeof clearTimeout == "function" ? clearTimeout : void 0,
  nw = typeof Promise == "function" ? Promise : void 0,
  MN =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof nw < "u"
      ? function (e) {
          return nw.resolve(null).then(e).catch(LN);
        }
      : ig;
function LN(e) {
  setTimeout(function () {
    throw e;
  });
}
function Wp(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), fs(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  fs(t);
}
function Vi(e) {
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
function rw(e) {
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
var ru = Math.random().toString(36).slice(2),
  Fr = "__reactFiber$" + ru,
  ms = "__reactProps$" + ru,
  di = "__reactContainer$" + ru,
  og = "__reactEvents$" + ru,
  FN = "__reactListeners$" + ru,
  zN = "__reactHandles$" + ru;
function To(e) {
  var t = e[Fr];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[di] || n[Fr])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = rw(e); e !== null; ) {
          if ((n = e[Fr])) return n;
          e = rw(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Rs(e) {
  return (
    (e = e[Fr] || e[di]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Sl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(te(33));
}
function pf(e) {
  return e[ms] || null;
}
var lg = [],
  El = -1;
function ao(e) {
  return { current: e };
}
function st(e) {
  0 > El || ((e.current = lg[El]), (lg[El] = null), El--);
}
function rt(e, t) {
  El++, (lg[El] = e.current), (e.current = t);
}
var no = {},
  Zt = ao(no),
  wn = ao(!1),
  Lo = no;
function Ul(e, t) {
  var n = e.type.contextTypes;
  if (!n) return no;
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
function xn(e) {
  return (e = e.childContextTypes), e != null;
}
function bc() {
  st(wn), st(Zt);
}
function iw(e, t, n) {
  if (Zt.current !== no) throw Error(te(168));
  rt(Zt, t), rt(wn, n);
}
function FE(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(te(108, ED(e) || "Unknown", i));
  return vt({}, n, r);
}
function _c(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || no),
    (Lo = Zt.current),
    rt(Zt, e),
    rt(wn, wn.current),
    !0
  );
}
function ow(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(te(169));
  n
    ? ((e = FE(e, t, Lo)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      st(wn),
      st(Zt),
      rt(Zt, e))
    : st(wn),
    rt(wn, n);
}
var ui = null,
  hf = !1,
  Vp = !1;
function zE(e) {
  ui === null ? (ui = [e]) : ui.push(e);
}
function $N(e) {
  (hf = !0), zE(e);
}
function co() {
  if (!Vp && ui !== null) {
    Vp = !0;
    var e = 0,
      t = Ye;
    try {
      var n = ui;
      for (Ye = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (ui = null), (hf = !1);
    } catch (i) {
      throw (ui !== null && (ui = ui.slice(e + 1)), aE(dm, co), i);
    } finally {
      (Ye = t), (Vp = !1);
    }
  }
  return null;
}
var Cl = [],
  kl = 0,
  Oc = null,
  Ic = 0,
  nr = [],
  rr = 0,
  Fo = null,
  si = 1,
  ai = "";
function Co(e, t) {
  (Cl[kl++] = Ic), (Cl[kl++] = Oc), (Oc = e), (Ic = t);
}
function $E(e, t, n) {
  (nr[rr++] = si), (nr[rr++] = ai), (nr[rr++] = Fo), (Fo = e);
  var r = si;
  e = ai;
  var i = 32 - kr(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var l = 32 - kr(t) + i;
  if (30 < l) {
    var s = i - (i % 5);
    (l = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (si = (1 << (32 - kr(t) + i)) | (n << i) | r),
      (ai = l + e);
  } else (si = (1 << l) | (n << i) | r), (ai = e);
}
function Sm(e) {
  e.return !== null && (Co(e, 1), $E(e, 1, 0));
}
function Em(e) {
  for (; e === Oc; )
    (Oc = Cl[--kl]), (Cl[kl] = null), (Ic = Cl[--kl]), (Cl[kl] = null);
  for (; e === Fo; )
    (Fo = nr[--rr]),
      (nr[rr] = null),
      (ai = nr[--rr]),
      (nr[rr] = null),
      (si = nr[--rr]),
      (nr[rr] = null);
}
var zn = null,
  Ln = null,
  dt = !1,
  Er = null;
function BE(e, t) {
  var n = lr(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function lw(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (zn = e), (Ln = Vi(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (zn = e), (Ln = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Fo !== null ? { id: si, overflow: ai } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = lr(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (zn = e),
            (Ln = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ug(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function sg(e) {
  if (dt) {
    var t = Ln;
    if (t) {
      var n = t;
      if (!lw(e, t)) {
        if (ug(e)) throw Error(te(418));
        t = Vi(n.nextSibling);
        var r = zn;
        t && lw(e, t)
          ? BE(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (dt = !1), (zn = e));
      }
    } else {
      if (ug(e)) throw Error(te(418));
      (e.flags = (e.flags & -4097) | 2), (dt = !1), (zn = e);
    }
  }
}
function uw(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  zn = e;
}
function $a(e) {
  if (e !== zn) return !1;
  if (!dt) return uw(e), (dt = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !rg(e.type, e.memoizedProps))),
    t && (t = Ln))
  ) {
    if (ug(e)) throw (UE(), Error(te(418)));
    for (; t; ) BE(e, t), (t = Vi(t.nextSibling));
  }
  if ((uw(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(te(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ln = Vi(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ln = null;
    }
  } else Ln = zn ? Vi(e.stateNode.nextSibling) : null;
  return !0;
}
function UE() {
  for (var e = Ln; e; ) e = Vi(e.nextSibling);
}
function Hl() {
  (Ln = zn = null), (dt = !1);
}
function Cm(e) {
  Er === null ? (Er = [e]) : Er.push(e);
}
var BN = mi.ReactCurrentBatchConfig;
function Au(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(te(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(te(147, e));
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
    if (typeof e != "string") throw Error(te(284));
    if (!n._owner) throw Error(te(290, e));
  }
  return e;
}
function Ba(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      te(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function sw(e) {
  var t = e._init;
  return t(e._payload);
}
function HE(e) {
  function t(y, w) {
    if (e) {
      var k = y.deletions;
      k === null ? ((y.deletions = [w]), (y.flags |= 16)) : k.push(w);
    }
  }
  function n(y, w) {
    if (!e) return null;
    for (; w !== null; ) t(y, w), (w = w.sibling);
    return null;
  }
  function r(y, w) {
    for (y = new Map(); w !== null; )
      w.key !== null ? y.set(w.key, w) : y.set(w.index, w), (w = w.sibling);
    return y;
  }
  function i(y, w) {
    return (y = Qi(y, w)), (y.index = 0), (y.sibling = null), y;
  }
  function l(y, w, k) {
    return (
      (y.index = k),
      e
        ? ((k = y.alternate),
          k !== null
            ? ((k = k.index), k < w ? ((y.flags |= 2), w) : k)
            : ((y.flags |= 2), w))
        : ((y.flags |= 1048576), w)
    );
  }
  function s(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function a(y, w, k, R) {
    return w === null || w.tag !== 6
      ? ((w = Zp(k, y.mode, R)), (w.return = y), w)
      : ((w = i(w, k)), (w.return = y), w);
  }
  function f(y, w, k, R) {
    var D = k.type;
    return D === vl
      ? p(y, w, k.props.children, R, k.key)
      : w !== null &&
        (w.elementType === D ||
          (typeof D == "object" &&
            D !== null &&
            D.$$typeof === Ni &&
            sw(D) === w.type))
      ? ((R = i(w, k.props)), (R.ref = Au(y, w, k)), (R.return = y), R)
      : ((R = cc(k.type, k.key, k.props, null, y.mode, R)),
        (R.ref = Au(y, w, k)),
        (R.return = y),
        R);
  }
  function d(y, w, k, R) {
    return w === null ||
      w.tag !== 4 ||
      w.stateNode.containerInfo !== k.containerInfo ||
      w.stateNode.implementation !== k.implementation
      ? ((w = Jp(k, y.mode, R)), (w.return = y), w)
      : ((w = i(w, k.children || [])), (w.return = y), w);
  }
  function p(y, w, k, R, D) {
    return w === null || w.tag !== 7
      ? ((w = No(k, y.mode, R, D)), (w.return = y), w)
      : ((w = i(w, k)), (w.return = y), w);
  }
  function g(y, w, k) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return (w = Zp("" + w, y.mode, k)), (w.return = y), w;
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Ta:
          return (
            (k = cc(w.type, w.key, w.props, null, y.mode, k)),
            (k.ref = Au(y, null, w)),
            (k.return = y),
            k
          );
        case ml:
          return (w = Jp(w, y.mode, k)), (w.return = y), w;
        case Ni:
          var R = w._init;
          return g(y, R(w._payload), k);
      }
      if (zu(w) || Ou(w))
        return (w = No(w, y.mode, k, null)), (w.return = y), w;
      Ba(y, w);
    }
    return null;
  }
  function v(y, w, k, R) {
    var D = w !== null ? w.key : null;
    if ((typeof k == "string" && k !== "") || typeof k == "number")
      return D !== null ? null : a(y, w, "" + k, R);
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case Ta:
          return k.key === D ? f(y, w, k, R) : null;
        case ml:
          return k.key === D ? d(y, w, k, R) : null;
        case Ni:
          return (D = k._init), v(y, w, D(k._payload), R);
      }
      if (zu(k) || Ou(k)) return D !== null ? null : p(y, w, k, R, null);
      Ba(y, k);
    }
    return null;
  }
  function m(y, w, k, R, D) {
    if ((typeof R == "string" && R !== "") || typeof R == "number")
      return (y = y.get(k) || null), a(w, y, "" + R, D);
    if (typeof R == "object" && R !== null) {
      switch (R.$$typeof) {
        case Ta:
          return (y = y.get(R.key === null ? k : R.key) || null), f(w, y, R, D);
        case ml:
          return (y = y.get(R.key === null ? k : R.key) || null), d(w, y, R, D);
        case Ni:
          var T = R._init;
          return m(y, w, k, T(R._payload), D);
      }
      if (zu(R) || Ou(R)) return (y = y.get(k) || null), p(w, y, R, D, null);
      Ba(w, R);
    }
    return null;
  }
  function E(y, w, k, R) {
    for (
      var D = null, T = null, F = w, z = (w = 0), q = null;
      F !== null && z < k.length;
      z++
    ) {
      F.index > z ? ((q = F), (F = null)) : (q = F.sibling);
      var G = v(y, F, k[z], R);
      if (G === null) {
        F === null && (F = q);
        break;
      }
      e && F && G.alternate === null && t(y, F),
        (w = l(G, w, z)),
        T === null ? (D = G) : (T.sibling = G),
        (T = G),
        (F = q);
    }
    if (z === k.length) return n(y, F), dt && Co(y, z), D;
    if (F === null) {
      for (; z < k.length; z++)
        (F = g(y, k[z], R)),
          F !== null &&
            ((w = l(F, w, z)), T === null ? (D = F) : (T.sibling = F), (T = F));
      return dt && Co(y, z), D;
    }
    for (F = r(y, F); z < k.length; z++)
      (q = m(F, y, z, k[z], R)),
        q !== null &&
          (e && q.alternate !== null && F.delete(q.key === null ? z : q.key),
          (w = l(q, w, z)),
          T === null ? (D = q) : (T.sibling = q),
          (T = q));
    return (
      e &&
        F.forEach(function ($) {
          return t(y, $);
        }),
      dt && Co(y, z),
      D
    );
  }
  function S(y, w, k, R) {
    var D = Ou(k);
    if (typeof D != "function") throw Error(te(150));
    if (((k = D.call(k)), k == null)) throw Error(te(151));
    for (
      var T = (D = null), F = w, z = (w = 0), q = null, G = k.next();
      F !== null && !G.done;
      z++, G = k.next()
    ) {
      F.index > z ? ((q = F), (F = null)) : (q = F.sibling);
      var $ = v(y, F, G.value, R);
      if ($ === null) {
        F === null && (F = q);
        break;
      }
      e && F && $.alternate === null && t(y, F),
        (w = l($, w, z)),
        T === null ? (D = $) : (T.sibling = $),
        (T = $),
        (F = q);
    }
    if (G.done) return n(y, F), dt && Co(y, z), D;
    if (F === null) {
      for (; !G.done; z++, G = k.next())
        (G = g(y, G.value, R)),
          G !== null &&
            ((w = l(G, w, z)), T === null ? (D = G) : (T.sibling = G), (T = G));
      return dt && Co(y, z), D;
    }
    for (F = r(y, F); !G.done; z++, G = k.next())
      (G = m(F, y, z, G.value, R)),
        G !== null &&
          (e && G.alternate !== null && F.delete(G.key === null ? z : G.key),
          (w = l(G, w, z)),
          T === null ? (D = G) : (T.sibling = G),
          (T = G));
    return (
      e &&
        F.forEach(function (Q) {
          return t(y, Q);
        }),
      dt && Co(y, z),
      D
    );
  }
  function A(y, w, k, R) {
    if (
      (typeof k == "object" &&
        k !== null &&
        k.type === vl &&
        k.key === null &&
        (k = k.props.children),
      typeof k == "object" && k !== null)
    ) {
      switch (k.$$typeof) {
        case Ta:
          e: {
            for (var D = k.key, T = w; T !== null; ) {
              if (T.key === D) {
                if (((D = k.type), D === vl)) {
                  if (T.tag === 7) {
                    n(y, T.sibling),
                      (w = i(T, k.props.children)),
                      (w.return = y),
                      (y = w);
                    break e;
                  }
                } else if (
                  T.elementType === D ||
                  (typeof D == "object" &&
                    D !== null &&
                    D.$$typeof === Ni &&
                    sw(D) === T.type)
                ) {
                  n(y, T.sibling),
                    (w = i(T, k.props)),
                    (w.ref = Au(y, T, k)),
                    (w.return = y),
                    (y = w);
                  break e;
                }
                n(y, T);
                break;
              } else t(y, T);
              T = T.sibling;
            }
            k.type === vl
              ? ((w = No(k.props.children, y.mode, R, k.key)),
                (w.return = y),
                (y = w))
              : ((R = cc(k.type, k.key, k.props, null, y.mode, R)),
                (R.ref = Au(y, w, k)),
                (R.return = y),
                (y = R));
          }
          return s(y);
        case ml:
          e: {
            for (T = k.key; w !== null; ) {
              if (w.key === T)
                if (
                  w.tag === 4 &&
                  w.stateNode.containerInfo === k.containerInfo &&
                  w.stateNode.implementation === k.implementation
                ) {
                  n(y, w.sibling),
                    (w = i(w, k.children || [])),
                    (w.return = y),
                    (y = w);
                  break e;
                } else {
                  n(y, w);
                  break;
                }
              else t(y, w);
              w = w.sibling;
            }
            (w = Jp(k, y.mode, R)), (w.return = y), (y = w);
          }
          return s(y);
        case Ni:
          return (T = k._init), A(y, w, T(k._payload), R);
      }
      if (zu(k)) return E(y, w, k, R);
      if (Ou(k)) return S(y, w, k, R);
      Ba(y, k);
    }
    return (typeof k == "string" && k !== "") || typeof k == "number"
      ? ((k = "" + k),
        w !== null && w.tag === 6
          ? (n(y, w.sibling), (w = i(w, k)), (w.return = y), (y = w))
          : (n(y, w), (w = Zp(k, y.mode, R)), (w.return = y), (y = w)),
        s(y))
      : n(y, w);
  }
  return A;
}
var jl = HE(!0),
  jE = HE(!1),
  Tc = ao(null),
  Pc = null,
  bl = null,
  km = null;
function bm() {
  km = bl = Pc = null;
}
function _m(e) {
  var t = Tc.current;
  st(Tc), (e._currentValue = t);
}
function ag(e, t, n) {
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
function Al(e, t) {
  (Pc = e),
    (km = bl = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (vn = !0), (e.firstContext = null));
}
function sr(e) {
  var t = e._currentValue;
  if (km !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), bl === null)) {
      if (Pc === null) throw Error(te(308));
      (bl = e), (Pc.dependencies = { lanes: 0, firstContext: e });
    } else bl = bl.next = e;
  return t;
}
var Po = null;
function Om(e) {
  Po === null ? (Po = [e]) : Po.push(e);
}
function WE(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Om(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    pi(e, r)
  );
}
function pi(e, t) {
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
var Mi = !1;
function Im(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function VE(e, t) {
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
function ci(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function qi(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Be & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      pi(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Om(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    pi(e, n)
  );
}
function ic(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), pm(e, n);
  }
}
function aw(e, t) {
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
function Rc(e, t, n, r) {
  var i = e.updateQueue;
  Mi = !1;
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
              g = vt({}, g, v);
              break e;
            case 2:
              Mi = !0;
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
    ($o |= s), (e.lanes = s), (e.memoizedState = g);
  }
}
function cw(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(te(191, i));
        i.call(r);
      }
    }
}
var As = {},
  Ur = ao(As),
  vs = ao(As),
  ys = ao(As);
function Ro(e) {
  if (e === As) throw Error(te(174));
  return e;
}
function Tm(e, t) {
  switch ((rt(ys, t), rt(vs, e), rt(Ur, As), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : jh(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = jh(t, e));
  }
  st(Ur), rt(Ur, t);
}
function Wl() {
  st(Ur), st(vs), st(ys);
}
function qE(e) {
  Ro(ys.current);
  var t = Ro(Ur.current),
    n = jh(t, e.type);
  t !== n && (rt(vs, e), rt(Ur, n));
}
function Pm(e) {
  vs.current === e && (st(Ur), st(vs));
}
var ht = ao(0);
function Ac(e) {
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
var qp = [];
function Rm() {
  for (var e = 0; e < qp.length; e++)
    qp[e]._workInProgressVersionPrimary = null;
  qp.length = 0;
}
var oc = mi.ReactCurrentDispatcher,
  Gp = mi.ReactCurrentBatchConfig,
  zo = 0,
  mt = null,
  Tt = null,
  Dt = null,
  Dc = !1,
  Qu = !1,
  ws = 0,
  UN = 0;
function qt() {
  throw Error(te(321));
}
function Am(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Or(e[n], t[n])) return !1;
  return !0;
}
function Dm(e, t, n, r, i, l) {
  if (
    ((zo = l),
    (mt = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (oc.current = e === null || e.memoizedState === null ? VN : qN),
    (e = n(r, i)),
    Qu)
  ) {
    l = 0;
    do {
      if (((Qu = !1), (ws = 0), 25 <= l)) throw Error(te(301));
      (l += 1),
        (Dt = Tt = null),
        (t.updateQueue = null),
        (oc.current = GN),
        (e = n(r, i));
    } while (Qu);
  }
  if (
    ((oc.current = Nc),
    (t = Tt !== null && Tt.next !== null),
    (zo = 0),
    (Dt = Tt = mt = null),
    (Dc = !1),
    t)
  )
    throw Error(te(300));
  return e;
}
function Nm() {
  var e = ws !== 0;
  return (ws = 0), e;
}
function Mr() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Dt === null ? (mt.memoizedState = Dt = e) : (Dt = Dt.next = e), Dt;
}
function ar() {
  if (Tt === null) {
    var e = mt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Tt.next;
  var t = Dt === null ? mt.memoizedState : Dt.next;
  if (t !== null) (Dt = t), (Tt = e);
  else {
    if (e === null) throw Error(te(310));
    (Tt = e),
      (e = {
        memoizedState: Tt.memoizedState,
        baseState: Tt.baseState,
        baseQueue: Tt.baseQueue,
        queue: Tt.queue,
        next: null,
      }),
      Dt === null ? (mt.memoizedState = Dt = e) : (Dt = Dt.next = e);
  }
  return Dt;
}
function xs(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Kp(e) {
  var t = ar(),
    n = t.queue;
  if (n === null) throw Error(te(311));
  n.lastRenderedReducer = e;
  var r = Tt,
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
      if ((zo & p) === p)
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
          (mt.lanes |= p),
          ($o |= p);
      }
      d = d.next;
    } while (d !== null && d !== l);
    f === null ? (s = r) : (f.next = a),
      Or(r, t.memoizedState) || (vn = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = f),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (l = i.lane), (mt.lanes |= l), ($o |= l), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Qp(e) {
  var t = ar(),
    n = t.queue;
  if (n === null) throw Error(te(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    l = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (l = e(l, s.action)), (s = s.next);
    while (s !== i);
    Or(l, t.memoizedState) || (vn = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (n.lastRenderedState = l);
  }
  return [l, r];
}
function GE() {}
function KE(e, t) {
  var n = mt,
    r = ar(),
    i = t(),
    l = !Or(r.memoizedState, i);
  if (
    (l && ((r.memoizedState = i), (vn = !0)),
    (r = r.queue),
    Mm(XE.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || (Dt !== null && Dt.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Ss(9, YE.bind(null, n, r, i, t), void 0, null),
      Nt === null)
    )
      throw Error(te(349));
    zo & 30 || QE(n, t, i);
  }
  return i;
}
function QE(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = mt.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (mt.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function YE(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), ZE(t) && JE(e);
}
function XE(e, t, n) {
  return n(function () {
    ZE(t) && JE(e);
  });
}
function ZE(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Or(e, n);
  } catch {
    return !0;
  }
}
function JE(e) {
  var t = pi(e, 1);
  t !== null && br(t, e, 1, -1);
}
function fw(e) {
  var t = Mr();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xs,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = WN.bind(null, mt, e)),
    [t.memoizedState, e]
  );
}
function Ss(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = mt.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (mt.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function eC() {
  return ar().memoizedState;
}
function lc(e, t, n, r) {
  var i = Mr();
  (mt.flags |= e),
    (i.memoizedState = Ss(1 | t, n, void 0, r === void 0 ? null : r));
}
function gf(e, t, n, r) {
  var i = ar();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (Tt !== null) {
    var s = Tt.memoizedState;
    if (((l = s.destroy), r !== null && Am(r, s.deps))) {
      i.memoizedState = Ss(t, n, l, r);
      return;
    }
  }
  (mt.flags |= e), (i.memoizedState = Ss(1 | t, n, l, r));
}
function dw(e, t) {
  return lc(8390656, 8, e, t);
}
function Mm(e, t) {
  return gf(2048, 8, e, t);
}
function tC(e, t) {
  return gf(4, 2, e, t);
}
function nC(e, t) {
  return gf(4, 4, e, t);
}
function rC(e, t) {
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
function iC(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), gf(4, 4, rC.bind(null, t, e), n)
  );
}
function Lm() {}
function oC(e, t) {
  var n = ar();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Am(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function lC(e, t) {
  var n = ar();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Am(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function uC(e, t, n) {
  return zo & 21
    ? (Or(n, t) || ((n = dE()), (mt.lanes |= n), ($o |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (vn = !0)), (e.memoizedState = n));
}
function HN(e, t) {
  var n = Ye;
  (Ye = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Gp.transition;
  Gp.transition = {};
  try {
    e(!1), t();
  } finally {
    (Ye = n), (Gp.transition = r);
  }
}
function sC() {
  return ar().memoizedState;
}
function jN(e, t, n) {
  var r = Ki(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    aC(e))
  )
    cC(t, n);
  else if (((n = WE(e, t, n, r)), n !== null)) {
    var i = ln();
    br(n, e, r, i), fC(n, t, r);
  }
}
function WN(e, t, n) {
  var r = Ki(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (aC(e)) cC(t, i);
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
        if (((i.hasEagerState = !0), (i.eagerState = a), Or(a, s))) {
          var f = t.interleaved;
          f === null
            ? ((i.next = i), Om(t))
            : ((i.next = f.next), (f.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = WE(e, t, i, r)),
      n !== null && ((i = ln()), br(n, e, r, i), fC(n, t, r));
  }
}
function aC(e) {
  var t = e.alternate;
  return e === mt || (t !== null && t === mt);
}
function cC(e, t) {
  Qu = Dc = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function fC(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), pm(e, n);
  }
}
var Nc = {
    readContext: sr,
    useCallback: qt,
    useContext: qt,
    useEffect: qt,
    useImperativeHandle: qt,
    useInsertionEffect: qt,
    useLayoutEffect: qt,
    useMemo: qt,
    useReducer: qt,
    useRef: qt,
    useState: qt,
    useDebugValue: qt,
    useDeferredValue: qt,
    useTransition: qt,
    useMutableSource: qt,
    useSyncExternalStore: qt,
    useId: qt,
    unstable_isNewReconciler: !1,
  },
  VN = {
    readContext: sr,
    useCallback: function (e, t) {
      return (Mr().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: sr,
    useEffect: dw,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        lc(4194308, 4, rC.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return lc(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return lc(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Mr();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Mr();
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
        (e = e.dispatch = jN.bind(null, mt, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Mr();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: fw,
    useDebugValue: Lm,
    useDeferredValue: function (e) {
      return (Mr().memoizedState = e);
    },
    useTransition: function () {
      var e = fw(!1),
        t = e[0];
      return (e = HN.bind(null, e[1])), (Mr().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = mt,
        i = Mr();
      if (dt) {
        if (n === void 0) throw Error(te(407));
        n = n();
      } else {
        if (((n = t()), Nt === null)) throw Error(te(349));
        zo & 30 || QE(r, t, n);
      }
      i.memoizedState = n;
      var l = { value: n, getSnapshot: t };
      return (
        (i.queue = l),
        dw(XE.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        Ss(9, YE.bind(null, r, l, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Mr(),
        t = Nt.identifierPrefix;
      if (dt) {
        var n = ai,
          r = si;
        (n = (r & ~(1 << (32 - kr(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = ws++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = UN++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  qN = {
    readContext: sr,
    useCallback: oC,
    useContext: sr,
    useEffect: Mm,
    useImperativeHandle: iC,
    useInsertionEffect: tC,
    useLayoutEffect: nC,
    useMemo: lC,
    useReducer: Kp,
    useRef: eC,
    useState: function () {
      return Kp(xs);
    },
    useDebugValue: Lm,
    useDeferredValue: function (e) {
      var t = ar();
      return uC(t, Tt.memoizedState, e);
    },
    useTransition: function () {
      var e = Kp(xs)[0],
        t = ar().memoizedState;
      return [e, t];
    },
    useMutableSource: GE,
    useSyncExternalStore: KE,
    useId: sC,
    unstable_isNewReconciler: !1,
  },
  GN = {
    readContext: sr,
    useCallback: oC,
    useContext: sr,
    useEffect: Mm,
    useImperativeHandle: iC,
    useInsertionEffect: tC,
    useLayoutEffect: nC,
    useMemo: lC,
    useReducer: Qp,
    useRef: eC,
    useState: function () {
      return Qp(xs);
    },
    useDebugValue: Lm,
    useDeferredValue: function (e) {
      var t = ar();
      return Tt === null ? (t.memoizedState = e) : uC(t, Tt.memoizedState, e);
    },
    useTransition: function () {
      var e = Qp(xs)[0],
        t = ar().memoizedState;
      return [e, t];
    },
    useMutableSource: GE,
    useSyncExternalStore: KE,
    useId: sC,
    unstable_isNewReconciler: !1,
  };
function xr(e, t) {
  if (e && e.defaultProps) {
    (t = vt({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function cg(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : vt({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var mf = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? qo(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ln(),
      i = Ki(e),
      l = ci(r, i);
    (l.payload = t),
      n != null && (l.callback = n),
      (t = qi(e, l, i)),
      t !== null && (br(t, e, i, r), ic(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ln(),
      i = Ki(e),
      l = ci(r, i);
    (l.tag = 1),
      (l.payload = t),
      n != null && (l.callback = n),
      (t = qi(e, l, i)),
      t !== null && (br(t, e, i, r), ic(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ln(),
      r = Ki(e),
      i = ci(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = qi(e, i, r)),
      t !== null && (br(t, e, r, n), ic(t, e, r));
  },
};
function pw(e, t, n, r, i, l, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, l, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !ps(n, r) || !ps(i, l)
      : !0
  );
}
function dC(e, t, n) {
  var r = !1,
    i = no,
    l = t.contextType;
  return (
    typeof l == "object" && l !== null
      ? (l = sr(l))
      : ((i = xn(t) ? Lo : Zt.current),
        (r = t.contextTypes),
        (l = (r = r != null) ? Ul(e, i) : no)),
    (t = new t(n, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = mf),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function hw(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && mf.enqueueReplaceState(t, t.state, null);
}
function fg(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Im(e);
  var l = t.contextType;
  typeof l == "object" && l !== null
    ? (i.context = sr(l))
    : ((l = xn(t) ? Lo : Zt.current), (i.context = Ul(e, l))),
    (i.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == "function" && (cg(e, t, l, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && mf.enqueueReplaceState(i, i.state, null),
      Rc(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Vl(e, t) {
  try {
    var n = "",
      r = t;
    do (n += SD(r)), (r = r.return);
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
function Yp(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function dg(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var KN = typeof WeakMap == "function" ? WeakMap : Map;
function pC(e, t, n) {
  (n = ci(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Lc || ((Lc = !0), (Eg = r)), dg(e, t);
    }),
    n
  );
}
function hC(e, t, n) {
  (n = ci(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        dg(e, t);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == "function" &&
      (n.callback = function () {
        dg(e, t),
          typeof r != "function" &&
            (Gi === null ? (Gi = new Set([this])) : Gi.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function gw(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new KN();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = s3.bind(null, e, t, n)), t.then(e, e));
}
function mw(e) {
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
function vw(e, t, n, r, i) {
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
              : ((t = ci(-1, 1)), (t.tag = 2), qi(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var QN = mi.ReactCurrentOwner,
  vn = !1;
function rn(e, t, n, r) {
  t.child = e === null ? jE(t, null, n, r) : jl(t, e.child, n, r);
}
function yw(e, t, n, r, i) {
  n = n.render;
  var l = t.ref;
  return (
    Al(t, i),
    (r = Dm(e, t, n, r, l, i)),
    (n = Nm()),
    e !== null && !vn
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        hi(e, t, i))
      : (dt && n && Sm(t), (t.flags |= 1), rn(e, t, r, i), t.child)
  );
}
function ww(e, t, n, r, i) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" &&
      !Wm(l) &&
      l.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), gC(e, t, l, r, i))
      : ((e = cc(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & i))) {
    var s = l.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ps), n(s, r) && e.ref === t.ref)
    )
      return hi(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Qi(l, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function gC(e, t, n, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (ps(l, r) && e.ref === t.ref)
      if (((vn = !1), (t.pendingProps = r = l), (e.lanes & i) !== 0))
        e.flags & 131072 && (vn = !0);
      else return (t.lanes = e.lanes), hi(e, t, i);
  }
  return pg(e, t, n, r, i);
}
function mC(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        rt(Ol, Nn),
        (Nn |= n);
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
          rt(Ol, Nn),
          (Nn |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : n),
        rt(Ol, Nn),
        (Nn |= r);
    }
  else
    l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
      rt(Ol, Nn),
      (Nn |= r);
  return rn(e, t, i, n), t.child;
}
function vC(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function pg(e, t, n, r, i) {
  var l = xn(n) ? Lo : Zt.current;
  return (
    (l = Ul(t, l)),
    Al(t, i),
    (n = Dm(e, t, n, r, l, i)),
    (r = Nm()),
    e !== null && !vn
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        hi(e, t, i))
      : (dt && r && Sm(t), (t.flags |= 1), rn(e, t, n, i), t.child)
  );
}
function xw(e, t, n, r, i) {
  if (xn(n)) {
    var l = !0;
    _c(t);
  } else l = !1;
  if ((Al(t, i), t.stateNode === null))
    uc(e, t), dC(t, n, r), fg(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps;
    s.props = a;
    var f = s.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = sr(d))
      : ((d = xn(n) ? Lo : Zt.current), (d = Ul(t, d)));
    var p = n.getDerivedStateFromProps,
      g =
        typeof p == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    g ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== r || f !== d) && hw(t, s, r, d)),
      (Mi = !1);
    var v = t.memoizedState;
    (s.state = v),
      Rc(t, r, s, i),
      (f = t.memoizedState),
      a !== r || v !== f || wn.current || Mi
        ? (typeof p == "function" && (cg(t, n, p, r), (f = t.memoizedState)),
          (a = Mi || pw(t, n, a, r, v, f, d))
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
      VE(e, t),
      (a = t.memoizedProps),
      (d = t.type === t.elementType ? a : xr(t.type, a)),
      (s.props = d),
      (g = t.pendingProps),
      (v = s.context),
      (f = n.contextType),
      typeof f == "object" && f !== null
        ? (f = sr(f))
        : ((f = xn(n) ? Lo : Zt.current), (f = Ul(t, f)));
    var m = n.getDerivedStateFromProps;
    (p =
      typeof m == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== g || v !== f) && hw(t, s, r, f)),
      (Mi = !1),
      (v = t.memoizedState),
      (s.state = v),
      Rc(t, r, s, i);
    var E = t.memoizedState;
    a !== g || v !== E || wn.current || Mi
      ? (typeof m == "function" && (cg(t, n, m, r), (E = t.memoizedState)),
        (d = Mi || pw(t, n, d, r, v, E, f) || !1)
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
  return hg(e, t, n, r, l, i);
}
function hg(e, t, n, r, i, l) {
  vC(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && ow(t, n, !1), hi(e, t, l);
  (r = t.stateNode), (QN.current = t);
  var a =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = jl(t, e.child, null, l)), (t.child = jl(t, null, a, l)))
      : rn(e, t, a, l),
    (t.memoizedState = r.state),
    i && ow(t, n, !0),
    t.child
  );
}
function yC(e) {
  var t = e.stateNode;
  t.pendingContext
    ? iw(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && iw(e, t.context, !1),
    Tm(e, t.containerInfo);
}
function Sw(e, t, n, r, i) {
  return Hl(), Cm(i), (t.flags |= 256), rn(e, t, n, r), t.child;
}
var gg = { dehydrated: null, treeContext: null, retryLane: 0 };
function mg(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function wC(e, t, n) {
  var r = t.pendingProps,
    i = ht.current,
    l = !1,
    s = (t.flags & 128) !== 0,
    a;
  if (
    ((a = s) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    rt(ht, i & 1),
    e === null)
  )
    return (
      sg(t),
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
                : (l = wf(s, r, 0, null)),
              (e = No(e, r, n, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = mg(n)),
              (t.memoizedState = gg),
              e)
            : Fm(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return YN(e, t, s, r, a, i, n);
  if (l) {
    (l = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
    var f = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = f),
          (t.deletions = null))
        : ((r = Qi(i, f)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (l = Qi(a, l)) : ((l = No(l, s, n, null)), (l.flags |= 2)),
      (l.return = t),
      (r.return = t),
      (r.sibling = l),
      (t.child = r),
      (r = l),
      (l = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? mg(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (l.memoizedState = s),
      (l.childLanes = e.childLanes & ~n),
      (t.memoizedState = gg),
      r
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = Qi(l, { mode: "visible", children: r.children })),
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
function Fm(e, t) {
  return (
    (t = wf({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ua(e, t, n, r) {
  return (
    r !== null && Cm(r),
    jl(t, e.child, null, n),
    (e = Fm(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function YN(e, t, n, r, i, l, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Yp(Error(te(422)))), Ua(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((l = r.fallback),
        (i = t.mode),
        (r = wf({ mode: "visible", children: r.children }, i, 0, null)),
        (l = No(l, i, s, null)),
        (l.flags |= 2),
        (r.return = t),
        (l.return = t),
        (r.sibling = l),
        (t.child = r),
        t.mode & 1 && jl(t, e.child, null, s),
        (t.child.memoizedState = mg(s)),
        (t.memoizedState = gg),
        l);
  if (!(t.mode & 1)) return Ua(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (
      (r = a), (l = Error(te(419))), (r = Yp(l, r, void 0)), Ua(e, t, s, r)
    );
  }
  if (((a = (s & e.childLanes) !== 0), vn || a)) {
    if (((r = Nt), r !== null)) {
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
          ((l.retryLane = i), pi(e, i), br(r, e, i, -1));
    }
    return jm(), (r = Yp(Error(te(421)))), Ua(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = a3.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (Ln = Vi(i.nextSibling)),
      (zn = t),
      (dt = !0),
      (Er = null),
      e !== null &&
        ((nr[rr++] = si),
        (nr[rr++] = ai),
        (nr[rr++] = Fo),
        (si = e.id),
        (ai = e.overflow),
        (Fo = t)),
      (t = Fm(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Ew(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ag(e.return, t, n);
}
function Xp(e, t, n, r, i) {
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
function xC(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    l = r.tail;
  if ((rn(e, t, r.children, n), (r = ht.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Ew(e, n, t);
        else if (e.tag === 19) Ew(e, n, t);
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
  if ((rt(ht, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && Ac(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Xp(t, !1, i, n, l);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Ac(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Xp(t, !0, n, null, l);
        break;
      case "together":
        Xp(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function uc(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function hi(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    ($o |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(te(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Qi(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Qi(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function XN(e, t, n) {
  switch (t.tag) {
    case 3:
      yC(t), Hl();
      break;
    case 5:
      qE(t);
      break;
    case 1:
      xn(t.type) && _c(t);
      break;
    case 4:
      Tm(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      rt(Tc, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (rt(ht, ht.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? wC(e, t, n)
          : (rt(ht, ht.current & 1),
            (e = hi(e, t, n)),
            e !== null ? e.sibling : null);
      rt(ht, ht.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return xC(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        rt(ht, ht.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), mC(e, t, n);
  }
  return hi(e, t, n);
}
var SC, vg, EC, CC;
SC = function (e, t) {
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
vg = function () {};
EC = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Ro(Ur.current);
    var l = null;
    switch (n) {
      case "input":
        (i = $h(e, i)), (r = $h(e, r)), (l = []);
        break;
      case "select":
        (i = vt({}, i, { value: void 0 })),
          (r = vt({}, r, { value: void 0 })),
          (l = []);
        break;
      case "textarea":
        (i = Hh(e, i)), (r = Hh(e, r)), (l = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = kc);
    }
    Wh(n, r);
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
            (ls.hasOwnProperty(d)
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
              (ls.hasOwnProperty(d)
                ? (f != null && d === "onScroll" && ut("scroll", e),
                  l || a === f || (l = []))
                : (l = l || []).push(d, f));
    }
    n && (l = l || []).push("style", n);
    var d = l;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
CC = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Du(e, t) {
  if (!dt)
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
function Gt(e) {
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
function ZN(e, t, n) {
  var r = t.pendingProps;
  switch ((Em(t), t.tag)) {
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
      return Gt(t), null;
    case 1:
      return xn(t.type) && bc(), Gt(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Wl(),
        st(wn),
        st(Zt),
        Rm(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          ($a(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Er !== null && (bg(Er), (Er = null)))),
        vg(e, t),
        Gt(t),
        null
      );
    case 5:
      Pm(t);
      var i = Ro(ys.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        EC(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(te(166));
          return Gt(t), null;
        }
        if (((e = Ro(Ur.current)), $a(t))) {
          (r = t.stateNode), (n = t.type);
          var l = t.memoizedProps;
          switch (((r[Fr] = t), (r[ms] = l), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              ut("cancel", r), ut("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ut("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Bu.length; i++) ut(Bu[i], r);
              break;
            case "source":
              ut("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ut("error", r), ut("load", r);
              break;
            case "details":
              ut("toggle", r);
              break;
            case "input":
              R1(r, l), ut("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!l.multiple }),
                ut("invalid", r);
              break;
            case "textarea":
              D1(r, l), ut("invalid", r);
          }
          Wh(n, l), (i = null);
          for (var s in l)
            if (l.hasOwnProperty(s)) {
              var a = l[s];
              s === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (l.suppressHydrationWarning !== !0 &&
                      za(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (l.suppressHydrationWarning !== !0 &&
                      za(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : ls.hasOwnProperty(s) &&
                  a != null &&
                  s === "onScroll" &&
                  ut("scroll", r);
            }
          switch (n) {
            case "input":
              Pa(r), A1(r, l, !0);
              break;
            case "textarea":
              Pa(r), N1(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = kc);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = XS(n)),
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
            (e[Fr] = t),
            (e[ms] = r),
            SC(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = Vh(n, r)), n)) {
              case "dialog":
                ut("cancel", e), ut("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ut("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Bu.length; i++) ut(Bu[i], e);
                i = r;
                break;
              case "source":
                ut("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                ut("error", e), ut("load", e), (i = r);
                break;
              case "details":
                ut("toggle", e), (i = r);
                break;
              case "input":
                R1(e, r), (i = $h(e, r)), ut("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = vt({}, r, { value: void 0 })),
                  ut("invalid", e);
                break;
              case "textarea":
                D1(e, r), (i = Hh(e, r)), ut("invalid", e);
                break;
              default:
                i = r;
            }
            Wh(n, i), (a = i);
            for (l in a)
              if (a.hasOwnProperty(l)) {
                var f = a[l];
                l === "style"
                  ? eE(e, f)
                  : l === "dangerouslySetInnerHTML"
                  ? ((f = f ? f.__html : void 0), f != null && ZS(e, f))
                  : l === "children"
                  ? typeof f == "string"
                    ? (n !== "textarea" || f !== "") && us(e, f)
                    : typeof f == "number" && us(e, "" + f)
                  : l !== "suppressContentEditableWarning" &&
                    l !== "suppressHydrationWarning" &&
                    l !== "autoFocus" &&
                    (ls.hasOwnProperty(l)
                      ? f != null && l === "onScroll" && ut("scroll", e)
                      : f != null && um(e, l, f, s));
              }
            switch (n) {
              case "input":
                Pa(e), A1(e, r, !1);
                break;
              case "textarea":
                Pa(e), N1(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + to(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? Il(e, !!r.multiple, l, !1)
                    : r.defaultValue != null &&
                      Il(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = kc);
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
      return Gt(t), null;
    case 6:
      if (e && t.stateNode != null) CC(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(te(166));
        if (((n = Ro(ys.current)), Ro(Ur.current), $a(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Fr] = t),
            (l = r.nodeValue !== n) && ((e = zn), e !== null))
          )
            switch (e.tag) {
              case 3:
                za(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  za(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Fr] = t),
            (t.stateNode = r);
      }
      return Gt(t), null;
    case 13:
      if (
        (st(ht),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (dt && Ln !== null && t.mode & 1 && !(t.flags & 128))
          UE(), Hl(), (t.flags |= 98560), (l = !1);
        else if (((l = $a(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(te(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(te(317));
            l[Fr] = t;
          } else
            Hl(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Gt(t), (l = !1);
        } else Er !== null && (bg(Er), (Er = null)), (l = !0);
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ht.current & 1 ? Pt === 0 && (Pt = 3) : jm())),
          t.updateQueue !== null && (t.flags |= 4),
          Gt(t),
          null);
    case 4:
      return (
        Wl(), vg(e, t), e === null && hs(t.stateNode.containerInfo), Gt(t), null
      );
    case 10:
      return _m(t.type._context), Gt(t), null;
    case 17:
      return xn(t.type) && bc(), Gt(t), null;
    case 19:
      if ((st(ht), (l = t.memoizedState), l === null)) return Gt(t), null;
      if (((r = (t.flags & 128) !== 0), (s = l.rendering), s === null))
        if (r) Du(l, !1);
        else {
          if (Pt !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = Ac(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Du(l, !1),
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
                return rt(ht, (ht.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            kt() > ql &&
            ((t.flags |= 128), (r = !0), Du(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Ac(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Du(l, !0),
              l.tail === null && l.tailMode === "hidden" && !s.alternate && !dt)
            )
              return Gt(t), null;
          } else
            2 * kt() - l.renderingStartTime > ql &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Du(l, !1), (t.lanes = 4194304));
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
          (l.renderingStartTime = kt()),
          (t.sibling = null),
          (n = ht.current),
          rt(ht, r ? (n & 1) | 2 : n & 1),
          t)
        : (Gt(t), null);
    case 22:
    case 23:
      return (
        Hm(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Nn & 1073741824 && (Gt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Gt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(te(156, t.tag));
}
function JN(e, t) {
  switch ((Em(t), t.tag)) {
    case 1:
      return (
        xn(t.type) && bc(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Wl(),
        st(wn),
        st(Zt),
        Rm(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Pm(t), null;
    case 13:
      if (
        (st(ht), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(te(340));
        Hl();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return st(ht), null;
    case 4:
      return Wl(), null;
    case 10:
      return _m(t.type._context), null;
    case 22:
    case 23:
      return Hm(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ha = !1,
  Yt = !1,
  e3 = typeof WeakSet == "function" ? WeakSet : Set,
  ce = null;
function _l(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        xt(e, t, r);
      }
    else n.current = null;
}
function yg(e, t, n) {
  try {
    n();
  } catch (r) {
    xt(e, t, r);
  }
}
var Cw = !1;
function t3(e, t) {
  if (((tg = Sc), (e = IE()), xm(e))) {
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
    ng = { focusedElem: e, selectionRange: n }, Sc = !1, ce = t;
    ce !== null;

  )
    if (((t = ce), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (ce = e);
    else
      for (; ce !== null; ) {
        t = ce;
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
                    A = E.memoizedState,
                    y = t.stateNode,
                    w = y.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : xr(t.type, S),
                      A
                    );
                  y.__reactInternalSnapshotBeforeUpdate = w;
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
                throw Error(te(163));
            }
        } catch (R) {
          xt(t, t.return, R);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (ce = e);
          break;
        }
        ce = t.return;
      }
  return (E = Cw), (Cw = !1), E;
}
function Yu(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        (i.destroy = void 0), l !== void 0 && yg(t, n, l);
      }
      i = i.next;
    } while (i !== r);
  }
}
function vf(e, t) {
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
function wg(e) {
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
function kC(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), kC(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Fr], delete t[ms], delete t[og], delete t[FN], delete t[zN])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function bC(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function kw(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || bC(e.return)) return null;
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
function xg(e, t, n) {
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
          n != null || t.onclick !== null || (t.onclick = kc));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (xg(e, t, n), e = e.sibling; e !== null; ) xg(e, t, n), (e = e.sibling);
}
function Sg(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Sg(e, t, n), e = e.sibling; e !== null; ) Sg(e, t, n), (e = e.sibling);
}
var $t = null,
  Sr = !1;
function Pi(e, t, n) {
  for (n = n.child; n !== null; ) _C(e, t, n), (n = n.sibling);
}
function _C(e, t, n) {
  if (Br && typeof Br.onCommitFiberUnmount == "function")
    try {
      Br.onCommitFiberUnmount(af, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Yt || _l(n, t);
    case 6:
      var r = $t,
        i = Sr;
      ($t = null),
        Pi(e, t, n),
        ($t = r),
        (Sr = i),
        $t !== null &&
          (Sr
            ? ((e = $t),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : $t.removeChild(n.stateNode));
      break;
    case 18:
      $t !== null &&
        (Sr
          ? ((e = $t),
            (n = n.stateNode),
            e.nodeType === 8
              ? Wp(e.parentNode, n)
              : e.nodeType === 1 && Wp(e, n),
            fs(e))
          : Wp($t, n.stateNode));
      break;
    case 4:
      (r = $t),
        (i = Sr),
        ($t = n.stateNode.containerInfo),
        (Sr = !0),
        Pi(e, t, n),
        ($t = r),
        (Sr = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Yt &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var l = i,
            s = l.destroy;
          (l = l.tag),
            s !== void 0 && (l & 2 || l & 4) && yg(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      Pi(e, t, n);
      break;
    case 1:
      if (
        !Yt &&
        (_l(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          xt(n, t, a);
        }
      Pi(e, t, n);
      break;
    case 21:
      Pi(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Yt = (r = Yt) || n.memoizedState !== null), Pi(e, t, n), (Yt = r))
        : Pi(e, t, n);
      break;
    default:
      Pi(e, t, n);
  }
}
function bw(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new e3()),
      t.forEach(function (r) {
        var i = c3.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function wr(e, t) {
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
              ($t = a.stateNode), (Sr = !1);
              break e;
            case 3:
              ($t = a.stateNode.containerInfo), (Sr = !0);
              break e;
            case 4:
              ($t = a.stateNode.containerInfo), (Sr = !0);
              break e;
          }
          a = a.return;
        }
        if ($t === null) throw Error(te(160));
        _C(l, s, i), ($t = null), (Sr = !1);
        var f = i.alternate;
        f !== null && (f.return = null), (i.return = null);
      } catch (d) {
        xt(i, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) OC(t, e), (t = t.sibling);
}
function OC(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((wr(t, e), Nr(e), r & 4)) {
        try {
          Yu(3, e, e.return), vf(3, e);
        } catch (S) {
          xt(e, e.return, S);
        }
        try {
          Yu(5, e, e.return);
        } catch (S) {
          xt(e, e.return, S);
        }
      }
      break;
    case 1:
      wr(t, e), Nr(e), r & 512 && n !== null && _l(n, n.return);
      break;
    case 5:
      if (
        (wr(t, e),
        Nr(e),
        r & 512 && n !== null && _l(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          us(i, "");
        } catch (S) {
          xt(e, e.return, S);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var l = e.memoizedProps,
          s = n !== null ? n.memoizedProps : l,
          a = e.type,
          f = e.updateQueue;
        if (((e.updateQueue = null), f !== null))
          try {
            a === "input" && l.type === "radio" && l.name != null && QS(i, l),
              Vh(a, s);
            var d = Vh(a, l);
            for (s = 0; s < f.length; s += 2) {
              var p = f[s],
                g = f[s + 1];
              p === "style"
                ? eE(i, g)
                : p === "dangerouslySetInnerHTML"
                ? ZS(i, g)
                : p === "children"
                ? us(i, g)
                : um(i, p, g, d);
            }
            switch (a) {
              case "input":
                Bh(i, l);
                break;
              case "textarea":
                YS(i, l);
                break;
              case "select":
                var v = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var m = l.value;
                m != null
                  ? Il(i, !!l.multiple, m, !1)
                  : v !== !!l.multiple &&
                    (l.defaultValue != null
                      ? Il(i, !!l.multiple, l.defaultValue, !0)
                      : Il(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[ms] = l;
          } catch (S) {
            xt(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((wr(t, e), Nr(e), r & 4)) {
        if (e.stateNode === null) throw Error(te(162));
        (i = e.stateNode), (l = e.memoizedProps);
        try {
          i.nodeValue = l;
        } catch (S) {
          xt(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (wr(t, e), Nr(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          fs(t.containerInfo);
        } catch (S) {
          xt(e, e.return, S);
        }
      break;
    case 4:
      wr(t, e), Nr(e);
      break;
    case 13:
      wr(t, e),
        Nr(e),
        (i = e.child),
        i.flags & 8192 &&
          ((l = i.memoizedState !== null),
          (i.stateNode.isHidden = l),
          !l ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Bm = kt())),
        r & 4 && bw(e);
      break;
    case 22:
      if (
        ((p = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Yt = (d = Yt) || p), wr(t, e), (Yt = d)) : wr(t, e),
        Nr(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !p && e.mode & 1)
        )
          for (ce = e, p = e.child; p !== null; ) {
            for (g = ce = p; ce !== null; ) {
              switch (((v = ce), (m = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Yu(4, v, v.return);
                  break;
                case 1:
                  _l(v, v.return);
                  var E = v.stateNode;
                  if (typeof E.componentWillUnmount == "function") {
                    (r = v), (n = v.return);
                    try {
                      (t = r),
                        (E.props = t.memoizedProps),
                        (E.state = t.memoizedState),
                        E.componentWillUnmount();
                    } catch (S) {
                      xt(r, n, S);
                    }
                  }
                  break;
                case 5:
                  _l(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    Ow(g);
                    continue;
                  }
              }
              m !== null ? ((m.return = v), (ce = m)) : Ow(g);
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
                      (a.style.display = JS("display", s)));
              } catch (S) {
                xt(e, e.return, S);
              }
            }
          } else if (g.tag === 6) {
            if (p === null)
              try {
                g.stateNode.nodeValue = d ? "" : g.memoizedProps;
              } catch (S) {
                xt(e, e.return, S);
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
      wr(t, e), Nr(e), r & 4 && bw(e);
      break;
    case 21:
      break;
    default:
      wr(t, e), Nr(e);
  }
}
function Nr(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (bC(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(te(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (us(i, ""), (r.flags &= -33));
          var l = kw(e);
          Sg(e, l, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = kw(e);
          xg(e, a, s);
          break;
        default:
          throw Error(te(161));
      }
    } catch (f) {
      xt(e, e.return, f);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function n3(e, t, n) {
  (ce = e), IC(e);
}
function IC(e, t, n) {
  for (var r = (e.mode & 1) !== 0; ce !== null; ) {
    var i = ce,
      l = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || Ha;
      if (!s) {
        var a = i.alternate,
          f = (a !== null && a.memoizedState !== null) || Yt;
        a = Ha;
        var d = Yt;
        if (((Ha = s), (Yt = f) && !d))
          for (ce = i; ce !== null; )
            (s = ce),
              (f = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? Iw(i)
                : f !== null
                ? ((f.return = s), (ce = f))
                : Iw(i);
        for (; l !== null; ) (ce = l), IC(l), (l = l.sibling);
        (ce = i), (Ha = a), (Yt = d);
      }
      _w(e);
    } else
      i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (ce = l)) : _w(e);
  }
}
function _w(e) {
  for (; ce !== null; ) {
    var t = ce;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Yt || vf(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Yt)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : xr(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var l = t.updateQueue;
              l !== null && cw(t, l, r);
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
                cw(t, s, n);
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
                    g !== null && fs(g);
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
              throw Error(te(163));
          }
        Yt || (t.flags & 512 && wg(t));
      } catch (v) {
        xt(t, t.return, v);
      }
    }
    if (t === e) {
      ce = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (ce = n);
      break;
    }
    ce = t.return;
  }
}
function Ow(e) {
  for (; ce !== null; ) {
    var t = ce;
    if (t === e) {
      ce = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (ce = n);
      break;
    }
    ce = t.return;
  }
}
function Iw(e) {
  for (; ce !== null; ) {
    var t = ce;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            vf(4, t);
          } catch (f) {
            xt(t, n, f);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (f) {
              xt(t, i, f);
            }
          }
          var l = t.return;
          try {
            wg(t);
          } catch (f) {
            xt(t, l, f);
          }
          break;
        case 5:
          var s = t.return;
          try {
            wg(t);
          } catch (f) {
            xt(t, s, f);
          }
      }
    } catch (f) {
      xt(t, t.return, f);
    }
    if (t === e) {
      ce = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (ce = a);
      break;
    }
    ce = t.return;
  }
}
var r3 = Math.ceil,
  Mc = mi.ReactCurrentDispatcher,
  zm = mi.ReactCurrentOwner,
  ur = mi.ReactCurrentBatchConfig,
  Be = 0,
  Nt = null,
  _t = null,
  Ut = 0,
  Nn = 0,
  Ol = ao(0),
  Pt = 0,
  Es = null,
  $o = 0,
  yf = 0,
  $m = 0,
  Xu = null,
  hn = null,
  Bm = 0,
  ql = 1 / 0,
  oi = null,
  Lc = !1,
  Eg = null,
  Gi = null,
  ja = !1,
  Ui = null,
  Fc = 0,
  Zu = 0,
  Cg = null,
  sc = -1,
  ac = 0;
function ln() {
  return Be & 6 ? kt() : sc !== -1 ? sc : (sc = kt());
}
function Ki(e) {
  return e.mode & 1
    ? Be & 2 && Ut !== 0
      ? Ut & -Ut
      : BN.transition !== null
      ? (ac === 0 && (ac = dE()), ac)
      : ((e = Ye),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : wE(e.type))),
        e)
    : 1;
}
function br(e, t, n, r) {
  if (50 < Zu) throw ((Zu = 0), (Cg = null), Error(te(185)));
  Ts(e, n, r),
    (!(Be & 2) || e !== Nt) &&
      (e === Nt && (!(Be & 2) && (yf |= n), Pt === 4 && Fi(e, Ut)),
      Sn(e, r),
      n === 1 && Be === 0 && !(t.mode & 1) && ((ql = kt() + 500), hf && co()));
}
function Sn(e, t) {
  var n = e.callbackNode;
  BD(e, t);
  var r = xc(e, e === Nt ? Ut : 0);
  if (r === 0)
    n !== null && F1(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && F1(n), t === 1))
      e.tag === 0 ? $N(Tw.bind(null, e)) : zE(Tw.bind(null, e)),
        MN(function () {
          !(Be & 6) && co();
        }),
        (n = null);
    else {
      switch (pE(r)) {
        case 1:
          n = dm;
          break;
        case 4:
          n = cE;
          break;
        case 16:
          n = wc;
          break;
        case 536870912:
          n = fE;
          break;
        default:
          n = wc;
      }
      n = LC(n, TC.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function TC(e, t) {
  if (((sc = -1), (ac = 0), Be & 6)) throw Error(te(327));
  var n = e.callbackNode;
  if (Dl() && e.callbackNode !== n) return null;
  var r = xc(e, e === Nt ? Ut : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = zc(e, r);
  else {
    t = r;
    var i = Be;
    Be |= 2;
    var l = RC();
    (Nt !== e || Ut !== t) && ((oi = null), (ql = kt() + 500), Do(e, t));
    do
      try {
        l3();
        break;
      } catch (a) {
        PC(e, a);
      }
    while (1);
    bm(),
      (Mc.current = l),
      (Be = i),
      _t !== null ? (t = 0) : ((Nt = null), (Ut = 0), (t = Pt));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Yh(e)), i !== 0 && ((r = i), (t = kg(e, i)))), t === 1)
    )
      throw ((n = Es), Do(e, 0), Fi(e, r), Sn(e, kt()), n);
    if (t === 6) Fi(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !i3(i) &&
          ((t = zc(e, r)),
          t === 2 && ((l = Yh(e)), l !== 0 && ((r = l), (t = kg(e, l)))),
          t === 1))
      )
        throw ((n = Es), Do(e, 0), Fi(e, r), Sn(e, kt()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(te(345));
        case 2:
          ko(e, hn, oi);
          break;
        case 3:
          if (
            (Fi(e, r), (r & 130023424) === r && ((t = Bm + 500 - kt()), 10 < t))
          ) {
            if (xc(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              ln(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = ig(ko.bind(null, e, hn, oi), t);
            break;
          }
          ko(e, hn, oi);
          break;
        case 4:
          if ((Fi(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - kr(r);
            (l = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~l);
          }
          if (
            ((r = i),
            (r = kt() - r),
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
                : 1960 * r3(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ig(ko.bind(null, e, hn, oi), r);
            break;
          }
          ko(e, hn, oi);
          break;
        case 5:
          ko(e, hn, oi);
          break;
        default:
          throw Error(te(329));
      }
    }
  }
  return Sn(e, kt()), e.callbackNode === n ? TC.bind(null, e) : null;
}
function kg(e, t) {
  var n = Xu;
  return (
    e.current.memoizedState.isDehydrated && (Do(e, t).flags |= 256),
    (e = zc(e, t)),
    e !== 2 && ((t = hn), (hn = n), t !== null && bg(t)),
    e
  );
}
function bg(e) {
  hn === null ? (hn = e) : hn.push.apply(hn, e);
}
function i3(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            l = i.getSnapshot;
          i = i.value;
          try {
            if (!Or(l(), i)) return !1;
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
function Fi(e, t) {
  for (
    t &= ~$m,
      t &= ~yf,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - kr(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Tw(e) {
  if (Be & 6) throw Error(te(327));
  Dl();
  var t = xc(e, 0);
  if (!(t & 1)) return Sn(e, kt()), null;
  var n = zc(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Yh(e);
    r !== 0 && ((t = r), (n = kg(e, r)));
  }
  if (n === 1) throw ((n = Es), Do(e, 0), Fi(e, t), Sn(e, kt()), n);
  if (n === 6) throw Error(te(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    ko(e, hn, oi),
    Sn(e, kt()),
    null
  );
}
function Um(e, t) {
  var n = Be;
  Be |= 1;
  try {
    return e(t);
  } finally {
    (Be = n), Be === 0 && ((ql = kt() + 500), hf && co());
  }
}
function Bo(e) {
  Ui !== null && Ui.tag === 0 && !(Be & 6) && Dl();
  var t = Be;
  Be |= 1;
  var n = ur.transition,
    r = Ye;
  try {
    if (((ur.transition = null), (Ye = 1), e)) return e();
  } finally {
    (Ye = r), (ur.transition = n), (Be = t), !(Be & 6) && co();
  }
}
function Hm() {
  (Nn = Ol.current), st(Ol);
}
function Do(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), NN(n)), _t !== null))
    for (n = _t.return; n !== null; ) {
      var r = n;
      switch ((Em(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && bc();
          break;
        case 3:
          Wl(), st(wn), st(Zt), Rm();
          break;
        case 5:
          Pm(r);
          break;
        case 4:
          Wl();
          break;
        case 13:
          st(ht);
          break;
        case 19:
          st(ht);
          break;
        case 10:
          _m(r.type._context);
          break;
        case 22:
        case 23:
          Hm();
      }
      n = n.return;
    }
  if (
    ((Nt = e),
    (_t = e = Qi(e.current, null)),
    (Ut = Nn = t),
    (Pt = 0),
    (Es = null),
    ($m = yf = $o = 0),
    (hn = Xu = null),
    Po !== null)
  ) {
    for (t = 0; t < Po.length; t++)
      if (((n = Po[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          l = n.pending;
        if (l !== null) {
          var s = l.next;
          (l.next = i), (r.next = s);
        }
        n.pending = r;
      }
    Po = null;
  }
  return e;
}
function PC(e, t) {
  do {
    var n = _t;
    try {
      if ((bm(), (oc.current = Nc), Dc)) {
        for (var r = mt.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        Dc = !1;
      }
      if (
        ((zo = 0),
        (Dt = Tt = mt = null),
        (Qu = !1),
        (ws = 0),
        (zm.current = null),
        n === null || n.return === null)
      ) {
        (Pt = 1), (Es = t), (_t = null);
        break;
      }
      e: {
        var l = e,
          s = n.return,
          a = n,
          f = t;
        if (
          ((t = Ut),
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
          var m = mw(s);
          if (m !== null) {
            (m.flags &= -257),
              vw(m, s, a, l, t),
              m.mode & 1 && gw(l, d, t),
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
              gw(l, d, t), jm();
              break e;
            }
            f = Error(te(426));
          }
        } else if (dt && a.mode & 1) {
          var A = mw(s);
          if (A !== null) {
            !(A.flags & 65536) && (A.flags |= 256),
              vw(A, s, a, l, t),
              Cm(Vl(f, a));
            break e;
          }
        }
        (l = f = Vl(f, a)),
          Pt !== 4 && (Pt = 2),
          Xu === null ? (Xu = [l]) : Xu.push(l),
          (l = s);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (t &= -t), (l.lanes |= t);
              var y = pC(l, f, t);
              aw(l, y);
              break e;
            case 1:
              a = f;
              var w = l.type,
                k = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof w.getDerivedStateFromError == "function" ||
                  (k !== null &&
                    typeof k.componentDidCatch == "function" &&
                    (Gi === null || !Gi.has(k))))
              ) {
                (l.flags |= 65536), (t &= -t), (l.lanes |= t);
                var R = hC(l, a, t);
                aw(l, R);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      DC(n);
    } catch (D) {
      (t = D), _t === n && n !== null && (_t = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function RC() {
  var e = Mc.current;
  return (Mc.current = Nc), e === null ? Nc : e;
}
function jm() {
  (Pt === 0 || Pt === 3 || Pt === 2) && (Pt = 4),
    Nt === null || (!($o & 268435455) && !(yf & 268435455)) || Fi(Nt, Ut);
}
function zc(e, t) {
  var n = Be;
  Be |= 2;
  var r = RC();
  (Nt !== e || Ut !== t) && ((oi = null), Do(e, t));
  do
    try {
      o3();
      break;
    } catch (i) {
      PC(e, i);
    }
  while (1);
  if ((bm(), (Be = n), (Mc.current = r), _t !== null)) throw Error(te(261));
  return (Nt = null), (Ut = 0), Pt;
}
function o3() {
  for (; _t !== null; ) AC(_t);
}
function l3() {
  for (; _t !== null && !RD(); ) AC(_t);
}
function AC(e) {
  var t = MC(e.alternate, e, Nn);
  (e.memoizedProps = e.pendingProps),
    t === null ? DC(e) : (_t = t),
    (zm.current = null);
}
function DC(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = JN(n, t)), n !== null)) {
        (n.flags &= 32767), (_t = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Pt = 6), (_t = null);
        return;
      }
    } else if (((n = ZN(n, t, Nn)), n !== null)) {
      _t = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      _t = t;
      return;
    }
    _t = t = e;
  } while (t !== null);
  Pt === 0 && (Pt = 5);
}
function ko(e, t, n) {
  var r = Ye,
    i = ur.transition;
  try {
    (ur.transition = null), (Ye = 1), u3(e, t, n, r);
  } finally {
    (ur.transition = i), (Ye = r);
  }
  return null;
}
function u3(e, t, n, r) {
  do Dl();
  while (Ui !== null);
  if (Be & 6) throw Error(te(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(te(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = n.lanes | n.childLanes;
  if (
    (UD(e, l),
    e === Nt && ((_t = Nt = null), (Ut = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ja ||
      ((ja = !0),
      LC(wc, function () {
        return Dl(), null;
      })),
    (l = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || l)
  ) {
    (l = ur.transition), (ur.transition = null);
    var s = Ye;
    Ye = 1;
    var a = Be;
    (Be |= 4),
      (zm.current = null),
      t3(e, n),
      OC(n, e),
      ON(ng),
      (Sc = !!tg),
      (ng = tg = null),
      (e.current = n),
      n3(n),
      AD(),
      (Be = a),
      (Ye = s),
      (ur.transition = l);
  } else e.current = n;
  if (
    (ja && ((ja = !1), (Ui = e), (Fc = i)),
    (l = e.pendingLanes),
    l === 0 && (Gi = null),
    MD(n.stateNode),
    Sn(e, kt()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (Lc) throw ((Lc = !1), (e = Eg), (Eg = null), e);
  return (
    Fc & 1 && e.tag !== 0 && Dl(),
    (l = e.pendingLanes),
    l & 1 ? (e === Cg ? Zu++ : ((Zu = 0), (Cg = e))) : (Zu = 0),
    co(),
    null
  );
}
function Dl() {
  if (Ui !== null) {
    var e = pE(Fc),
      t = ur.transition,
      n = Ye;
    try {
      if (((ur.transition = null), (Ye = 16 > e ? 16 : e), Ui === null))
        var r = !1;
      else {
        if (((e = Ui), (Ui = null), (Fc = 0), Be & 6)) throw Error(te(331));
        var i = Be;
        for (Be |= 4, ce = e.current; ce !== null; ) {
          var l = ce,
            s = l.child;
          if (ce.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var f = 0; f < a.length; f++) {
                var d = a[f];
                for (ce = d; ce !== null; ) {
                  var p = ce;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yu(8, p, l);
                  }
                  var g = p.child;
                  if (g !== null) (g.return = p), (ce = g);
                  else
                    for (; ce !== null; ) {
                      p = ce;
                      var v = p.sibling,
                        m = p.return;
                      if ((kC(p), p === d)) {
                        ce = null;
                        break;
                      }
                      if (v !== null) {
                        (v.return = m), (ce = v);
                        break;
                      }
                      ce = m;
                    }
                }
              }
              var E = l.alternate;
              if (E !== null) {
                var S = E.child;
                if (S !== null) {
                  E.child = null;
                  do {
                    var A = S.sibling;
                    (S.sibling = null), (S = A);
                  } while (S !== null);
                }
              }
              ce = l;
            }
          }
          if (l.subtreeFlags & 2064 && s !== null) (s.return = l), (ce = s);
          else
            e: for (; ce !== null; ) {
              if (((l = ce), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Yu(9, l, l.return);
                }
              var y = l.sibling;
              if (y !== null) {
                (y.return = l.return), (ce = y);
                break e;
              }
              ce = l.return;
            }
        }
        var w = e.current;
        for (ce = w; ce !== null; ) {
          s = ce;
          var k = s.child;
          if (s.subtreeFlags & 2064 && k !== null) (k.return = s), (ce = k);
          else
            e: for (s = w; ce !== null; ) {
              if (((a = ce), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      vf(9, a);
                  }
                } catch (D) {
                  xt(a, a.return, D);
                }
              if (a === s) {
                ce = null;
                break e;
              }
              var R = a.sibling;
              if (R !== null) {
                (R.return = a.return), (ce = R);
                break e;
              }
              ce = a.return;
            }
        }
        if (
          ((Be = i), co(), Br && typeof Br.onPostCommitFiberRoot == "function")
        )
          try {
            Br.onPostCommitFiberRoot(af, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (Ye = n), (ur.transition = t);
    }
  }
  return !1;
}
function Pw(e, t, n) {
  (t = Vl(n, t)),
    (t = pC(e, t, 1)),
    (e = qi(e, t, 1)),
    (t = ln()),
    e !== null && (Ts(e, 1, t), Sn(e, t));
}
function xt(e, t, n) {
  if (e.tag === 3) Pw(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Pw(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Gi === null || !Gi.has(r)))
        ) {
          (e = Vl(n, e)),
            (e = hC(t, e, 1)),
            (t = qi(t, e, 1)),
            (e = ln()),
            t !== null && (Ts(t, 1, e), Sn(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function s3(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ln()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Nt === e &&
      (Ut & n) === n &&
      (Pt === 4 || (Pt === 3 && (Ut & 130023424) === Ut && 500 > kt() - Bm)
        ? Do(e, 0)
        : ($m |= n)),
    Sn(e, t);
}
function NC(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Da), (Da <<= 1), !(Da & 130023424) && (Da = 4194304))
      : (t = 1));
  var n = ln();
  (e = pi(e, t)), e !== null && (Ts(e, t, n), Sn(e, n));
}
function a3(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), NC(e, n);
}
function c3(e, t) {
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
      throw Error(te(314));
  }
  r !== null && r.delete(t), NC(e, n);
}
var MC;
MC = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || wn.current) vn = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (vn = !1), XN(e, t, n);
      vn = !!(e.flags & 131072);
    }
  else (vn = !1), dt && t.flags & 1048576 && $E(t, Ic, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      uc(e, t), (e = t.pendingProps);
      var i = Ul(t, Zt.current);
      Al(t, n), (i = Dm(null, t, r, e, i, n));
      var l = Nm();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            xn(r) ? ((l = !0), _c(t)) : (l = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Im(t),
            (i.updater = mf),
            (t.stateNode = i),
            (i._reactInternals = t),
            fg(t, r, e, n),
            (t = hg(null, t, r, !0, l, n)))
          : ((t.tag = 0), dt && l && Sm(t), rn(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (uc(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = d3(r)),
          (e = xr(r, e)),
          i)
        ) {
          case 0:
            t = pg(null, t, r, e, n);
            break e;
          case 1:
            t = xw(null, t, r, e, n);
            break e;
          case 11:
            t = yw(null, t, r, e, n);
            break e;
          case 14:
            t = ww(null, t, r, xr(r.type, e), n);
            break e;
        }
        throw Error(te(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : xr(r, i)),
        pg(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : xr(r, i)),
        xw(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((yC(t), e === null)) throw Error(te(387));
        (r = t.pendingProps),
          (l = t.memoizedState),
          (i = l.element),
          VE(e, t),
          Rc(t, r, null, n);
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
            (i = Vl(Error(te(423)), t)), (t = Sw(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Vl(Error(te(424)), t)), (t = Sw(e, t, r, n, i));
            break e;
          } else
            for (
              Ln = Vi(t.stateNode.containerInfo.firstChild),
                zn = t,
                dt = !0,
                Er = null,
                n = jE(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Hl(), r === i)) {
            t = hi(e, t, n);
            break e;
          }
          rn(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        qE(t),
        e === null && sg(t),
        (r = t.type),
        (i = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (s = i.children),
        rg(r, i) ? (s = null) : l !== null && rg(r, l) && (t.flags |= 32),
        vC(e, t),
        rn(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && sg(t), null;
    case 13:
      return wC(e, t, n);
    case 4:
      return (
        Tm(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = jl(t, null, r, n)) : rn(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : xr(r, i)),
        yw(e, t, r, i, n)
      );
    case 7:
      return rn(e, t, t.pendingProps, n), t.child;
    case 8:
      return rn(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return rn(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (l = t.memoizedProps),
          (s = i.value),
          rt(Tc, r._currentValue),
          (r._currentValue = s),
          l !== null)
        )
          if (Or(l.value, s)) {
            if (l.children === i.children && !wn.current) {
              t = hi(e, t, n);
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
                      (f = ci(-1, n & -n)), (f.tag = 2);
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
                      ag(l.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  f = f.next;
                }
              } else if (l.tag === 10) s = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((s = l.return), s === null)) throw Error(te(341));
                (s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  ag(s, n, t),
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
        rn(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Al(t, n),
        (i = sr(i)),
        (r = r(i)),
        (t.flags |= 1),
        rn(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = xr(r, t.pendingProps)),
        (i = xr(r.type, i)),
        ww(e, t, r, i, n)
      );
    case 15:
      return gC(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : xr(r, i)),
        uc(e, t),
        (t.tag = 1),
        xn(r) ? ((e = !0), _c(t)) : (e = !1),
        Al(t, n),
        dC(t, r, i),
        fg(t, r, i, n),
        hg(null, t, r, !0, e, n)
      );
    case 19:
      return xC(e, t, n);
    case 22:
      return mC(e, t, n);
  }
  throw Error(te(156, t.tag));
};
function LC(e, t) {
  return aE(e, t);
}
function f3(e, t, n, r) {
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
function lr(e, t, n, r) {
  return new f3(e, t, n, r);
}
function Wm(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function d3(e) {
  if (typeof e == "function") return Wm(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === am)) return 11;
    if (e === cm) return 14;
  }
  return 2;
}
function Qi(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = lr(e.tag, t, e.key, e.mode)),
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
function cc(e, t, n, r, i, l) {
  var s = 2;
  if (((r = e), typeof e == "function")) Wm(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case vl:
        return No(n.children, i, l, t);
      case sm:
        (s = 8), (i |= 8);
        break;
      case Mh:
        return (
          (e = lr(12, n, t, i | 2)), (e.elementType = Mh), (e.lanes = l), e
        );
      case Lh:
        return (e = lr(13, n, t, i)), (e.elementType = Lh), (e.lanes = l), e;
      case Fh:
        return (e = lr(19, n, t, i)), (e.elementType = Fh), (e.lanes = l), e;
      case qS:
        return wf(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case WS:
              s = 10;
              break e;
            case VS:
              s = 9;
              break e;
            case am:
              s = 11;
              break e;
            case cm:
              s = 14;
              break e;
            case Ni:
              (s = 16), (r = null);
              break e;
          }
        throw Error(te(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = lr(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = l), t
  );
}
function No(e, t, n, r) {
  return (e = lr(7, e, r, t)), (e.lanes = n), e;
}
function wf(e, t, n, r) {
  return (
    (e = lr(22, e, r, t)),
    (e.elementType = qS),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Zp(e, t, n) {
  return (e = lr(6, e, null, t)), (e.lanes = n), e;
}
function Jp(e, t, n) {
  return (
    (t = lr(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function p3(e, t, n, r, i) {
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
    (this.eventTimes = Dp(0)),
    (this.expirationTimes = Dp(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Dp(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Vm(e, t, n, r, i, l, s, a, f) {
  return (
    (e = new p3(e, t, n, a, f)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = lr(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Im(l),
    e
  );
}
function h3(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: ml,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function FC(e) {
  if (!e) return no;
  e = e._reactInternals;
  e: {
    if (qo(e) !== e || e.tag !== 1) throw Error(te(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (xn(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(te(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xn(n)) return FE(e, n, t);
  }
  return t;
}
function zC(e, t, n, r, i, l, s, a, f) {
  return (
    (e = Vm(n, r, !0, e, i, l, s, a, f)),
    (e.context = FC(null)),
    (n = e.current),
    (r = ln()),
    (i = Ki(n)),
    (l = ci(r, i)),
    (l.callback = t ?? null),
    qi(n, l, i),
    (e.current.lanes = i),
    Ts(e, i, r),
    Sn(e, r),
    e
  );
}
function xf(e, t, n, r) {
  var i = t.current,
    l = ln(),
    s = Ki(i);
  return (
    (n = FC(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = ci(l, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = qi(i, t, s)),
    e !== null && (br(e, i, s, l), ic(e, i, s)),
    s
  );
}
function $c(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Rw(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function qm(e, t) {
  Rw(e, t), (e = e.alternate) && Rw(e, t);
}
function g3() {
  return null;
}
var $C =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Gm(e) {
  this._internalRoot = e;
}
Sf.prototype.render = Gm.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(te(409));
  xf(e, t, null, null);
};
Sf.prototype.unmount = Gm.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Bo(function () {
      xf(null, e, null, null);
    }),
      (t[di] = null);
  }
};
function Sf(e) {
  this._internalRoot = e;
}
Sf.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = mE();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Li.length && t !== 0 && t < Li[n].priority; n++);
    Li.splice(n, 0, e), n === 0 && yE(e);
  }
};
function Km(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ef(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Aw() {}
function m3(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function () {
        var d = $c(s);
        l.call(d);
      };
    }
    var s = zC(t, r, e, 0, null, !1, !1, "", Aw);
    return (
      (e._reactRootContainer = s),
      (e[di] = s.current),
      hs(e.nodeType === 8 ? e.parentNode : e),
      Bo(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var d = $c(f);
      a.call(d);
    };
  }
  var f = Vm(e, 0, !1, null, null, !1, !1, "", Aw);
  return (
    (e._reactRootContainer = f),
    (e[di] = f.current),
    hs(e.nodeType === 8 ? e.parentNode : e),
    Bo(function () {
      xf(t, f, n, r);
    }),
    f
  );
}
function Cf(e, t, n, r, i) {
  var l = n._reactRootContainer;
  if (l) {
    var s = l;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var f = $c(s);
        a.call(f);
      };
    }
    xf(t, s, e, i);
  } else s = m3(n, t, e, i, r);
  return $c(s);
}
hE = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $u(t.pendingLanes);
        n !== 0 &&
          (pm(t, n | 1), Sn(t, kt()), !(Be & 6) && ((ql = kt() + 500), co()));
      }
      break;
    case 13:
      Bo(function () {
        var r = pi(e, 1);
        if (r !== null) {
          var i = ln();
          br(r, e, 1, i);
        }
      }),
        qm(e, 1);
  }
};
hm = function (e) {
  if (e.tag === 13) {
    var t = pi(e, 134217728);
    if (t !== null) {
      var n = ln();
      br(t, e, 134217728, n);
    }
    qm(e, 134217728);
  }
};
gE = function (e) {
  if (e.tag === 13) {
    var t = Ki(e),
      n = pi(e, t);
    if (n !== null) {
      var r = ln();
      br(n, e, t, r);
    }
    qm(e, t);
  }
};
mE = function () {
  return Ye;
};
vE = function (e, t) {
  var n = Ye;
  try {
    return (Ye = e), t();
  } finally {
    Ye = n;
  }
};
Gh = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Bh(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
            var i = pf(r);
            if (!i) throw Error(te(90));
            KS(r), Bh(r, i);
          }
        }
      }
      break;
    case "textarea":
      YS(e, n);
      break;
    case "select":
      (t = n.value), t != null && Il(e, !!n.multiple, t, !1);
  }
};
rE = Um;
iE = Bo;
var v3 = { usingClientEntryPoint: !1, Events: [Rs, Sl, pf, tE, nE, Um] },
  Nu = {
    findFiberByHostInstance: To,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  y3 = {
    bundleType: Nu.bundleType,
    version: Nu.version,
    rendererPackageName: Nu.rendererPackageName,
    rendererConfig: Nu.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: mi.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = uE(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Nu.findFiberByHostInstance || g3,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Wa = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Wa.isDisabled && Wa.supportsFiber)
    try {
      (af = Wa.inject(y3)), (Br = Wa);
    } catch {}
}
Hn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = v3;
Hn.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Km(t)) throw Error(te(200));
  return h3(e, t, null, n);
};
Hn.createRoot = function (e, t) {
  if (!Km(e)) throw Error(te(299));
  var n = !1,
    r = "",
    i = $C;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Vm(e, 1, !1, null, null, n, !1, r, i)),
    (e[di] = t.current),
    hs(e.nodeType === 8 ? e.parentNode : e),
    new Gm(t)
  );
};
Hn.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(te(188))
      : ((e = Object.keys(e).join(",")), Error(te(268, e)));
  return (e = uE(t)), (e = e === null ? null : e.stateNode), e;
};
Hn.flushSync = function (e) {
  return Bo(e);
};
Hn.hydrate = function (e, t, n) {
  if (!Ef(t)) throw Error(te(200));
  return Cf(null, e, t, !0, n);
};
Hn.hydrateRoot = function (e, t, n) {
  if (!Km(e)) throw Error(te(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    l = "",
    s = $C;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = zC(t, null, e, 1, n ?? null, i, !1, l, s)),
    (e[di] = t.current),
    hs(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Sf(t);
};
Hn.render = function (e, t, n) {
  if (!Ef(t)) throw Error(te(200));
  return Cf(null, e, t, !1, n);
};
Hn.unmountComponentAtNode = function (e) {
  if (!Ef(e)) throw Error(te(40));
  return e._reactRootContainer
    ? (Bo(function () {
        Cf(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[di] = null);
        });
      }),
      !0)
    : !1;
};
Hn.unstable_batchedUpdates = Um;
Hn.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ef(n)) throw Error(te(200));
  if (e == null || e._reactInternals === void 0) throw Error(te(38));
  return Cf(e, t, n, !1, r);
};
Hn.version = "18.3.1-next-f1338f8080-20240426";
function BC() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(BC);
    } catch (e) {
      console.error(e);
    }
}
BC(), (BS.exports = Hn);
var iu = BS.exports;
const Va = uo(iu);
var UC,
  Dw = iu;
(UC = Dw.createRoot), Dw.hydrateRoot;
var HC = { exports: {} },
  jC = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gl = I;
function w3(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var x3 = typeof Object.is == "function" ? Object.is : w3,
  S3 = Gl.useState,
  E3 = Gl.useEffect,
  C3 = Gl.useLayoutEffect,
  k3 = Gl.useDebugValue;
function b3(e, t) {
  var n = t(),
    r = S3({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    l = r[1];
  return (
    C3(
      function () {
        (i.value = n), (i.getSnapshot = t), eh(i) && l({ inst: i });
      },
      [e, n, t]
    ),
    E3(
      function () {
        return (
          eh(i) && l({ inst: i }),
          e(function () {
            eh(i) && l({ inst: i });
          })
        );
      },
      [e]
    ),
    k3(n),
    n
  );
}
function eh(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !x3(e, n);
  } catch {
    return !0;
  }
}
function _3(e, t) {
  return t();
}
var O3 =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? _3
    : b3;
jC.useSyncExternalStore =
  Gl.useSyncExternalStore !== void 0 ? Gl.useSyncExternalStore : O3;
HC.exports = jC;
var I3 = HC.exports,
  WC = { exports: {} },
  VC = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kf = I,
  T3 = I3;
function P3(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var R3 = typeof Object.is == "function" ? Object.is : P3,
  A3 = T3.useSyncExternalStore,
  D3 = kf.useRef,
  N3 = kf.useEffect,
  M3 = kf.useMemo,
  L3 = kf.useDebugValue;
VC.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var l = D3(null);
  if (l.current === null) {
    var s = { hasValue: !1, value: null };
    l.current = s;
  } else s = l.current;
  l = M3(
    function () {
      function f(m) {
        if (!d) {
          if (((d = !0), (p = m), (m = r(m)), i !== void 0 && s.hasValue)) {
            var E = s.value;
            if (i(E, m)) return (g = E);
          }
          return (g = m);
        }
        if (((E = g), R3(p, m))) return E;
        var S = r(m);
        return i !== void 0 && i(E, S) ? E : ((p = m), (g = S));
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
  var a = A3(e, l[0], l[1]);
  return (
    N3(
      function () {
        (s.hasValue = !0), (s.value = a);
      },
      [a]
    ),
    L3(a),
    a
  );
};
WC.exports = VC;
var F3 = WC.exports;
function z3(e) {
  e();
}
let qC = z3;
const $3 = (e) => (qC = e),
  B3 = () => qC,
  Nw = Symbol.for("react-redux-context"),
  Mw = typeof globalThis < "u" ? globalThis : {};
function U3() {
  var e;
  if (!I.createContext) return {};
  const t = (e = Mw[Nw]) != null ? e : (Mw[Nw] = new Map());
  let n = t.get(I.createContext);
  return n || ((n = I.createContext(null)), t.set(I.createContext, n)), n;
}
const ro = U3();
function Qm(e = ro) {
  return function () {
    return I.useContext(e);
  };
}
const GC = Qm(),
  H3 = () => {
    throw new Error("uSES not initialized!");
  };
let KC = H3;
const j3 = (e) => {
    KC = e;
  },
  W3 = (e, t) => e === t;
function V3(e = ro) {
  const t = e === ro ? GC : Qm(e);
  return function (r, i = {}) {
    const {
        equalityFn: l = W3,
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
    I.useRef(!0);
    const m = I.useCallback(
        {
          [r.name](S) {
            return r(S);
          },
        }[r.name],
        [r, g, s]
      ),
      E = KC(d.addNestedSub, f.getState, p || f.getState, m, l);
    return I.useDebugValue(E), E;
  };
}
const q3 = V3();
function Bc() {
  return (
    (Bc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Bc.apply(null, arguments)
  );
}
function Ym(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var QC = { exports: {} },
  Xe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mt = typeof Symbol == "function" && Symbol.for,
  Xm = Mt ? Symbol.for("react.element") : 60103,
  Zm = Mt ? Symbol.for("react.portal") : 60106,
  bf = Mt ? Symbol.for("react.fragment") : 60107,
  _f = Mt ? Symbol.for("react.strict_mode") : 60108,
  Of = Mt ? Symbol.for("react.profiler") : 60114,
  If = Mt ? Symbol.for("react.provider") : 60109,
  Tf = Mt ? Symbol.for("react.context") : 60110,
  Jm = Mt ? Symbol.for("react.async_mode") : 60111,
  Pf = Mt ? Symbol.for("react.concurrent_mode") : 60111,
  Rf = Mt ? Symbol.for("react.forward_ref") : 60112,
  Af = Mt ? Symbol.for("react.suspense") : 60113,
  G3 = Mt ? Symbol.for("react.suspense_list") : 60120,
  Df = Mt ? Symbol.for("react.memo") : 60115,
  Nf = Mt ? Symbol.for("react.lazy") : 60116,
  K3 = Mt ? Symbol.for("react.block") : 60121,
  Q3 = Mt ? Symbol.for("react.fundamental") : 60117,
  Y3 = Mt ? Symbol.for("react.responder") : 60118,
  X3 = Mt ? Symbol.for("react.scope") : 60119;
function Wn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Xm:
        switch (((e = e.type), e)) {
          case Jm:
          case Pf:
          case bf:
          case Of:
          case _f:
          case Af:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case Tf:
              case Rf:
              case Nf:
              case Df:
              case If:
                return e;
              default:
                return t;
            }
        }
      case Zm:
        return t;
    }
  }
}
function YC(e) {
  return Wn(e) === Pf;
}
Xe.AsyncMode = Jm;
Xe.ConcurrentMode = Pf;
Xe.ContextConsumer = Tf;
Xe.ContextProvider = If;
Xe.Element = Xm;
Xe.ForwardRef = Rf;
Xe.Fragment = bf;
Xe.Lazy = Nf;
Xe.Memo = Df;
Xe.Portal = Zm;
Xe.Profiler = Of;
Xe.StrictMode = _f;
Xe.Suspense = Af;
Xe.isAsyncMode = function (e) {
  return YC(e) || Wn(e) === Jm;
};
Xe.isConcurrentMode = YC;
Xe.isContextConsumer = function (e) {
  return Wn(e) === Tf;
};
Xe.isContextProvider = function (e) {
  return Wn(e) === If;
};
Xe.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Xm;
};
Xe.isForwardRef = function (e) {
  return Wn(e) === Rf;
};
Xe.isFragment = function (e) {
  return Wn(e) === bf;
};
Xe.isLazy = function (e) {
  return Wn(e) === Nf;
};
Xe.isMemo = function (e) {
  return Wn(e) === Df;
};
Xe.isPortal = function (e) {
  return Wn(e) === Zm;
};
Xe.isProfiler = function (e) {
  return Wn(e) === Of;
};
Xe.isStrictMode = function (e) {
  return Wn(e) === _f;
};
Xe.isSuspense = function (e) {
  return Wn(e) === Af;
};
Xe.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === bf ||
    e === Pf ||
    e === Of ||
    e === _f ||
    e === Af ||
    e === G3 ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Nf ||
        e.$$typeof === Df ||
        e.$$typeof === If ||
        e.$$typeof === Tf ||
        e.$$typeof === Rf ||
        e.$$typeof === Q3 ||
        e.$$typeof === Y3 ||
        e.$$typeof === X3 ||
        e.$$typeof === K3))
  );
};
Xe.typeOf = Wn;
QC.exports = Xe;
var Z3 = QC.exports,
  XC = Z3,
  J3 = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  eM = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  ZC = {};
ZC[XC.ForwardRef] = J3;
ZC[XC.Memo] = eM;
var Je = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ev = Symbol.for("react.element"),
  tv = Symbol.for("react.portal"),
  Mf = Symbol.for("react.fragment"),
  Lf = Symbol.for("react.strict_mode"),
  Ff = Symbol.for("react.profiler"),
  zf = Symbol.for("react.provider"),
  $f = Symbol.for("react.context"),
  tM = Symbol.for("react.server_context"),
  Bf = Symbol.for("react.forward_ref"),
  Uf = Symbol.for("react.suspense"),
  Hf = Symbol.for("react.suspense_list"),
  jf = Symbol.for("react.memo"),
  Wf = Symbol.for("react.lazy"),
  nM = Symbol.for("react.offscreen"),
  JC;
JC = Symbol.for("react.module.reference");
function cr(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ev:
        switch (((e = e.type), e)) {
          case Mf:
          case Ff:
          case Lf:
          case Uf:
          case Hf:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case tM:
              case $f:
              case Bf:
              case Wf:
              case jf:
              case zf:
                return e;
              default:
                return t;
            }
        }
      case tv:
        return t;
    }
  }
}
Je.ContextConsumer = $f;
Je.ContextProvider = zf;
Je.Element = ev;
Je.ForwardRef = Bf;
Je.Fragment = Mf;
Je.Lazy = Wf;
Je.Memo = jf;
Je.Portal = tv;
Je.Profiler = Ff;
Je.StrictMode = Lf;
Je.Suspense = Uf;
Je.SuspenseList = Hf;
Je.isAsyncMode = function () {
  return !1;
};
Je.isConcurrentMode = function () {
  return !1;
};
Je.isContextConsumer = function (e) {
  return cr(e) === $f;
};
Je.isContextProvider = function (e) {
  return cr(e) === zf;
};
Je.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === ev;
};
Je.isForwardRef = function (e) {
  return cr(e) === Bf;
};
Je.isFragment = function (e) {
  return cr(e) === Mf;
};
Je.isLazy = function (e) {
  return cr(e) === Wf;
};
Je.isMemo = function (e) {
  return cr(e) === jf;
};
Je.isPortal = function (e) {
  return cr(e) === tv;
};
Je.isProfiler = function (e) {
  return cr(e) === Ff;
};
Je.isStrictMode = function (e) {
  return cr(e) === Lf;
};
Je.isSuspense = function (e) {
  return cr(e) === Uf;
};
Je.isSuspenseList = function (e) {
  return cr(e) === Hf;
};
Je.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Mf ||
    e === Ff ||
    e === Lf ||
    e === Uf ||
    e === Hf ||
    e === nM ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Wf ||
        e.$$typeof === jf ||
        e.$$typeof === zf ||
        e.$$typeof === $f ||
        e.$$typeof === Bf ||
        e.$$typeof === JC ||
        e.getModuleId !== void 0))
  );
};
Je.typeOf = cr;
function rM() {
  const e = B3();
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
const Lw = { notify() {}, get: () => [] };
function iM(e, t) {
  let n,
    r = Lw,
    i = 0,
    l = !1;
  function s(S) {
    p();
    const A = r.subscribe(S);
    let y = !1;
    return () => {
      y || ((y = !0), A(), g());
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
    i++, n || ((n = t ? t.addNestedSub(f) : e.subscribe(f)), (r = rM()));
  }
  function g() {
    i--, n && i === 0 && (n(), (n = void 0), r.clear(), (r = Lw));
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
const oM =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  lM = oM ? I.useLayoutEffect : I.useEffect;
function uM({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: i = "once",
  noopCheck: l = "once",
}) {
  const s = I.useMemo(() => {
      const d = iM(e);
      return {
        store: e,
        subscription: d,
        getServerState: r ? () => r : void 0,
        stabilityCheck: i,
        noopCheck: l,
      };
    }, [e, r, i, l]),
    a = I.useMemo(() => e.getState(), [e]);
  lM(() => {
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
  const f = t || ro;
  return I.createElement(f.Provider, { value: s }, n);
}
function ek(e = ro) {
  const t = e === ro ? GC : Qm(e);
  return function () {
    const { store: r } = t();
    return r;
  };
}
const sM = ek();
function aM(e = ro) {
  const t = e === ro ? sM : ek(e);
  return function () {
    return t().dispatch;
  };
}
const cM = aM();
j3(F3.useSyncExternalStoreWithSelector);
$3(iu.unstable_batchedUpdates);
const tk = I.createContext({ dragDropManager: void 0 });
function Cs(e) {
  "@babel/helpers - typeof";
  return (
    (Cs =
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
    Cs(e)
  );
}
function fM(e, t) {
  if (Cs(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (Cs(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dM(e) {
  var t = fM(e, "string");
  return Cs(t) == "symbol" ? t : t + "";
}
function pM(e, t, n) {
  return (
    (t = dM(t)) in e
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
function Fw(e, t) {
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
function zw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Fw(Object(n), !0).forEach(function (r) {
          pM(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Fw(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Kt(e) {
  return (
    "Minified Redux error #" +
    e +
    "; visit https://redux.js.org/Errors?code=" +
    e +
    " for the full message or use the non-minified dev environment for full errors. "
  );
}
var $w = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })(),
  th = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  Uc = {
    INIT: "@@redux/INIT" + th(),
    REPLACE: "@@redux/REPLACE" + th(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + th();
    },
  };
function hM(e) {
  if (typeof e != "object" || e === null) return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function nv(e, t, n) {
  var r;
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(Kt(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(Kt(1));
    return n(nv)(e, t);
  }
  if (typeof e != "function") throw new Error(Kt(2));
  var i = e,
    l = t,
    s = [],
    a = s,
    f = !1;
  function d() {
    a === s && (a = s.slice());
  }
  function p() {
    if (f) throw new Error(Kt(3));
    return l;
  }
  function g(S) {
    if (typeof S != "function") throw new Error(Kt(4));
    if (f) throw new Error(Kt(5));
    var A = !0;
    return (
      d(),
      a.push(S),
      function () {
        if (A) {
          if (f) throw new Error(Kt(6));
          (A = !1), d();
          var w = a.indexOf(S);
          a.splice(w, 1), (s = null);
        }
      }
    );
  }
  function v(S) {
    if (!hM(S)) throw new Error(Kt(7));
    if (typeof S.type > "u") throw new Error(Kt(8));
    if (f) throw new Error(Kt(9));
    try {
      (f = !0), (l = i(l, S));
    } finally {
      f = !1;
    }
    for (var A = (s = a), y = 0; y < A.length; y++) {
      var w = A[y];
      w();
    }
    return S;
  }
  function m(S) {
    if (typeof S != "function") throw new Error(Kt(10));
    (i = S), v({ type: Uc.REPLACE });
  }
  function E() {
    var S,
      A = g;
    return (
      (S = {
        subscribe: function (w) {
          if (typeof w != "object" || w === null) throw new Error(Kt(11));
          function k() {
            w.next && w.next(p());
          }
          k();
          var R = A(k);
          return { unsubscribe: R };
        },
      }),
      (S[$w] = function () {
        return this;
      }),
      S
    );
  }
  return (
    v({ type: Uc.INIT }),
    (r = { dispatch: v, subscribe: g, getState: p, replaceReducer: m }),
    (r[$w] = E),
    r
  );
}
function gM(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, { type: Uc.INIT });
    if (typeof r > "u") throw new Error(Kt(12));
    if (typeof n(void 0, { type: Uc.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(Kt(13));
  });
}
function mM(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    typeof e[i] == "function" && (n[i] = e[i]);
  }
  var l = Object.keys(n),
    s;
  try {
    gM(n);
  } catch (a) {
    s = a;
  }
  return function (f, d) {
    if ((f === void 0 && (f = {}), s)) throw s;
    for (var p = !1, g = {}, v = 0; v < l.length; v++) {
      var m = l[v],
        E = n[m],
        S = f[m],
        A = E(S, d);
      if (typeof A > "u") throw (d && d.type, new Error(Kt(14)));
      (g[m] = A), (p = p || A !== S);
    }
    return (p = p || l.length !== Object.keys(f).length), p ? g : f;
  };
}
function Hc() {
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
function vM() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function (r) {
    return function () {
      var i = r.apply(void 0, arguments),
        l = function () {
          throw new Error(Kt(15));
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
        (l = Hc.apply(void 0, a)(i.dispatch)),
        zw(zw({}, i), {}, { dispatch: l })
      );
    };
  };
}
function be(e, t, ...n) {
  if (yM() && t === void 0)
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
function yM() {
  return typeof process < "u" && {}.NODE_ENV === "production";
}
function wM(e, t, n) {
  return t.split(".").reduce((r, i) => (r && r[i] ? r[i] : n || null), e);
}
function xM(e, t) {
  return e.filter((n) => n !== t);
}
function nk(e) {
  return typeof e == "object";
}
function SM(e, t) {
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
function EM(e, t) {
  return e.filter((n) => t.indexOf(n) > -1);
}
const rv = "dnd-core/INIT_COORDS",
  Vf = "dnd-core/BEGIN_DRAG",
  iv = "dnd-core/PUBLISH_DRAG_SOURCE",
  qf = "dnd-core/HOVER",
  Gf = "dnd-core/DROP",
  Kf = "dnd-core/END_DRAG";
function Bw(e, t) {
  return {
    type: rv,
    payload: { sourceClientOffset: t || null, clientOffset: e || null },
  };
}
const CM = {
  type: rv,
  payload: { clientOffset: null, sourceClientOffset: null },
};
function kM(e) {
  return function (n = [], r = { publishSource: !0 }) {
    const {
        publishSource: i = !0,
        clientOffset: l,
        getSourceClientOffset: s,
      } = r,
      a = e.getMonitor(),
      f = e.getRegistry();
    e.dispatch(Bw(l)), bM(n, a, f);
    const d = IM(n, a);
    if (d == null) {
      e.dispatch(CM);
      return;
    }
    let p = null;
    if (l) {
      if (!s) throw new Error("getSourceClientOffset must be defined");
      _M(s), (p = s(d));
    }
    e.dispatch(Bw(l, p));
    const v = f.getSource(d).beginDrag(a, d);
    if (v == null) return;
    OM(v), f.pinSource(d);
    const m = f.getSourceType(d);
    return {
      type: Vf,
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
function bM(e, t, n) {
  be(!t.isDragging(), "Cannot call beginDrag while dragging."),
    e.forEach(function (r) {
      be(n.getSource(r), "Expected sourceIds to be registered.");
    });
}
function _M(e) {
  be(
    typeof e == "function",
    "When clientOffset is provided, getSourceClientOffset must be a function."
  );
}
function OM(e) {
  be(nk(e), "Item must be an object.");
}
function IM(e, t) {
  let n = null;
  for (let r = e.length - 1; r >= 0; r--)
    if (t.canDragSource(e[r])) {
      n = e[r];
      break;
    }
  return n;
}
function TM(e, t, n) {
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
function PM(e) {
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
        TM(e, i, n[i]);
      });
  }
  return e;
}
function RM(e) {
  return function (n = {}) {
    const r = e.getMonitor(),
      i = e.getRegistry();
    AM(r),
      MM(r).forEach((s, a) => {
        const f = DM(s, a, i, r),
          d = { type: Gf, payload: { dropResult: PM({}, n, f) } };
        e.dispatch(d);
      });
  };
}
function AM(e) {
  be(e.isDragging(), "Cannot call drop while not dragging."),
    be(!e.didDrop(), "Cannot call drop twice during one drag operation.");
}
function DM(e, t, n, r) {
  const i = n.getTarget(e);
  let l = i ? i.drop(r, e) : void 0;
  return NM(l), typeof l > "u" && (l = t === 0 ? {} : r.getDropResult()), l;
}
function NM(e) {
  be(
    typeof e > "u" || nk(e),
    "Drop result must either be an object or undefined."
  );
}
function MM(e) {
  const t = e.getTargetIds().filter(e.canDropOnTarget, e);
  return t.reverse(), t;
}
function LM(e) {
  return function () {
    const n = e.getMonitor(),
      r = e.getRegistry();
    FM(n);
    const i = n.getSourceId();
    return (
      i != null && (r.getSource(i, !0).endDrag(n, i), r.unpinSource()),
      { type: Kf }
    );
  };
}
function FM(e) {
  be(e.isDragging(), "Cannot call endDrag while not dragging.");
}
function _g(e, t) {
  return t === null
    ? e === null
    : Array.isArray(e)
    ? e.some((n) => n === t)
    : e === t;
}
function zM(e) {
  return function (n, { clientOffset: r } = {}) {
    $M(n);
    const i = n.slice(0),
      l = e.getMonitor(),
      s = e.getRegistry(),
      a = l.getItemType();
    return (
      UM(i, s, a),
      BM(i, l, s),
      HM(i, l, s),
      { type: qf, payload: { targetIds: i, clientOffset: r || null } }
    );
  };
}
function $M(e) {
  be(Array.isArray(e), "Expected targetIds to be an array.");
}
function BM(e, t, n) {
  be(t.isDragging(), "Cannot call hover while not dragging."),
    be(!t.didDrop(), "Cannot call hover after drop.");
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    be(
      e.lastIndexOf(i) === r,
      "Expected targetIds to be unique in the passed array."
    );
    const l = n.getTarget(i);
    be(l, "Expected targetIds to be registered.");
  }
}
function UM(e, t, n) {
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r],
      l = t.getTargetType(i);
    _g(l, n) || e.splice(r, 1);
  }
}
function HM(e, t, n) {
  e.forEach(function (r) {
    n.getTarget(r).hover(t, r);
  });
}
function jM(e) {
  return function () {
    if (e.getMonitor().isDragging()) return { type: iv };
  };
}
function WM(e) {
  return {
    beginDrag: kM(e),
    publishDragSource: jM(e),
    hover: zM(e),
    drop: RM(e),
    endDrag: LM(e),
  };
}
class VM {
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
    const i = WM(this);
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
function qM(e, t) {
  return { x: e.x + t.x, y: e.y + t.y };
}
function rk(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function GM(e) {
  const {
    clientOffset: t,
    initialClientOffset: n,
    initialSourceClientOffset: r,
  } = e;
  return !t || !n || !r ? null : rk(qM(t, r), n);
}
function KM(e) {
  const { clientOffset: t, initialClientOffset: n } = e;
  return !t || !n ? null : rk(t, n);
}
const Ju = [],
  ov = [];
Ju.__IS_NONE__ = !0;
ov.__IS_ALL__ = !0;
function QM(e, t) {
  return e === Ju ? !1 : e === ov || typeof t > "u" ? !0 : EM(t, e).length > 0;
}
class YM {
  subscribeToStateChange(t, n = {}) {
    const { handlerIds: r } = n;
    be(typeof t == "function", "listener must be a function."),
      be(
        typeof r > "u" || Array.isArray(r),
        "handlerIds, when specified, must be an array of strings."
      );
    let i = this.store.getState().stateId;
    const l = () => {
      const s = this.store.getState(),
        a = s.stateId;
      try {
        a === i || (a === i + 1 && !QM(s.dirtyHandlerIds, r)) || t();
      } finally {
        i = a;
      }
    };
    return this.store.subscribe(l);
  }
  subscribeToOffsetChange(t) {
    be(typeof t == "function", "listener must be a function.");
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
      be(n, `Expected to find a valid source. sourceId=${t}`),
      this.isDragging() ? !1 : n.canDrag(this, t)
    );
  }
  canDropOnTarget(t) {
    if (!t) return !1;
    const n = this.registry.getTarget(t);
    if (
      (be(n, `Expected to find a valid target. targetId=${t}`),
      !this.isDragging() || this.didDrop())
    )
      return !1;
    const r = this.registry.getTargetType(t),
      i = this.getItemType();
    return _g(r, i) && n.canDrop(this, t);
  }
  isDragging() {
    return !!this.getItemType();
  }
  isDraggingSource(t) {
    if (!t) return !1;
    const n = this.registry.getSource(t, !0);
    if (
      (be(n, `Expected to find a valid source. sourceId=${t}`),
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
    if (l && !_g(i, l)) return !1;
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
    return GM(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return KM(this.store.getState().dragOffset);
  }
  constructor(t, n) {
    (this.store = t), (this.registry = n);
  }
}
const Uw = typeof global < "u" ? global : self,
  ik = Uw.MutationObserver || Uw.WebKitMutationObserver;
function ok(e) {
  return function () {
    const n = setTimeout(i, 0),
      r = setInterval(i, 50);
    function i() {
      clearTimeout(n), clearInterval(r), e();
    }
  };
}
function XM(e) {
  let t = 1;
  const n = new ik(e),
    r = document.createTextNode("");
  return (
    n.observe(r, { characterData: !0 }),
    function () {
      (t = -t), (r.data = t);
    }
  );
}
const ZM = typeof ik == "function" ? XM : ok;
class JM {
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
      (this.requestFlush = ZM(this.flush)),
      (this.requestErrorThrow = ok(() => {
        if (this.pendingErrors.length) throw this.pendingErrors.shift();
      }));
  }
}
class e4 {
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
class t4 {
  create(t) {
    const n = this.freeTasks,
      r = n.length ? n.pop() : new e4(this.onError, (i) => (n[n.length] = i));
    return (r.task = t), r;
  }
  constructor(t) {
    (this.onError = t), (this.freeTasks = []);
  }
}
const lk = new JM(),
  n4 = new t4(lk.registerPendingError);
function r4(e) {
  lk.enqueueTask(n4.create(e));
}
const lv = "dnd-core/ADD_SOURCE",
  uv = "dnd-core/ADD_TARGET",
  sv = "dnd-core/REMOVE_SOURCE",
  Qf = "dnd-core/REMOVE_TARGET";
function i4(e) {
  return { type: lv, payload: { sourceId: e } };
}
function o4(e) {
  return { type: uv, payload: { targetId: e } };
}
function l4(e) {
  return { type: sv, payload: { sourceId: e } };
}
function u4(e) {
  return { type: Qf, payload: { targetId: e } };
}
function s4(e) {
  be(typeof e.canDrag == "function", "Expected canDrag to be a function."),
    be(
      typeof e.beginDrag == "function",
      "Expected beginDrag to be a function."
    ),
    be(typeof e.endDrag == "function", "Expected endDrag to be a function.");
}
function a4(e) {
  be(typeof e.canDrop == "function", "Expected canDrop to be a function."),
    be(typeof e.hover == "function", "Expected hover to be a function."),
    be(typeof e.drop == "function", "Expected beginDrag to be a function.");
}
function Og(e, t) {
  if (t && Array.isArray(e)) {
    e.forEach((n) => Og(n, !1));
    return;
  }
  be(
    typeof e == "string" || typeof e == "symbol",
    t
      ? "Type can only be a string, a symbol, or an array of either."
      : "Type can only be a string or a symbol."
  );
}
var ir;
(function (e) {
  (e.SOURCE = "SOURCE"), (e.TARGET = "TARGET");
})(ir || (ir = {}));
let c4 = 0;
function f4() {
  return c4++;
}
function d4(e) {
  const t = f4().toString();
  switch (e) {
    case ir.SOURCE:
      return `S${t}`;
    case ir.TARGET:
      return `T${t}`;
    default:
      throw new Error(`Unknown Handler Role: ${e}`);
  }
}
function Hw(e) {
  switch (e[0]) {
    case "S":
      return ir.SOURCE;
    case "T":
      return ir.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${e}`);
  }
}
function jw(e, t) {
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
class p4 {
  addSource(t, n) {
    Og(t), s4(n);
    const r = this.addHandler(ir.SOURCE, t, n);
    return this.store.dispatch(i4(r)), r;
  }
  addTarget(t, n) {
    Og(t, !0), a4(n);
    const r = this.addHandler(ir.TARGET, t, n);
    return this.store.dispatch(o4(r)), r;
  }
  containsHandler(t) {
    return jw(this.dragSources, t) || jw(this.dropTargets, t);
  }
  getSource(t, n = !1) {
    return (
      be(this.isSourceId(t), "Expected a valid source ID."),
      n && t === this.pinnedSourceId
        ? this.pinnedSource
        : this.dragSources.get(t)
    );
  }
  getTarget(t) {
    return (
      be(this.isTargetId(t), "Expected a valid target ID."),
      this.dropTargets.get(t)
    );
  }
  getSourceType(t) {
    return (
      be(this.isSourceId(t), "Expected a valid source ID."), this.types.get(t)
    );
  }
  getTargetType(t) {
    return (
      be(this.isTargetId(t), "Expected a valid target ID."), this.types.get(t)
    );
  }
  isSourceId(t) {
    return Hw(t) === ir.SOURCE;
  }
  isTargetId(t) {
    return Hw(t) === ir.TARGET;
  }
  removeSource(t) {
    be(this.getSource(t), "Expected an existing source."),
      this.store.dispatch(l4(t)),
      r4(() => {
        this.dragSources.delete(t), this.types.delete(t);
      });
  }
  removeTarget(t) {
    be(this.getTarget(t), "Expected an existing target."),
      this.store.dispatch(u4(t)),
      this.dropTargets.delete(t),
      this.types.delete(t);
  }
  pinSource(t) {
    const n = this.getSource(t);
    be(n, "Expected an existing source."),
      (this.pinnedSourceId = t),
      (this.pinnedSource = n);
  }
  unpinSource() {
    be(this.pinnedSource, "No source is pinned at the time."),
      (this.pinnedSourceId = null),
      (this.pinnedSource = null);
  }
  addHandler(t, n, r) {
    const i = d4(t);
    return (
      this.types.set(i, n),
      t === ir.SOURCE
        ? this.dragSources.set(i, r)
        : t === ir.TARGET && this.dropTargets.set(i, r),
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
const h4 = (e, t) => e === t;
function g4(e, t) {
  return !e && !t ? !0 : !e || !t ? !1 : e.x === t.x && e.y === t.y;
}
function m4(e, t, n = h4) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; ++r) if (!n(e[r], t[r])) return !1;
  return !0;
}
function v4(e = Ju, t) {
  switch (t.type) {
    case qf:
      break;
    case lv:
    case uv:
    case Qf:
    case sv:
      return Ju;
    case Vf:
    case iv:
    case Kf:
    case Gf:
    default:
      return ov;
  }
  const { targetIds: n = [], prevTargetIds: r = [] } = t.payload,
    i = SM(n, r);
  if (!(i.length > 0 || !m4(n, r))) return Ju;
  const s = r[r.length - 1],
    a = n[n.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function y4(e, t, n) {
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
function w4(e) {
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
        y4(e, i, n[i]);
      });
  }
  return e;
}
const Ww = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null,
};
function x4(e = Ww, t) {
  const { payload: n } = t;
  switch (t.type) {
    case rv:
    case Vf:
      return {
        initialSourceClientOffset: n.sourceClientOffset,
        initialClientOffset: n.clientOffset,
        clientOffset: n.clientOffset,
      };
    case qf:
      return g4(e.clientOffset, n.clientOffset)
        ? e
        : w4({}, e, { clientOffset: n.clientOffset });
    case Kf:
    case Gf:
      return Ww;
    default:
      return e;
  }
}
function S4(e, t, n) {
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
function fl(e) {
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
        S4(e, i, n[i]);
      });
  }
  return e;
}
const E4 = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null,
};
function C4(e = E4, t) {
  const { payload: n } = t;
  switch (t.type) {
    case Vf:
      return fl({}, e, {
        itemType: n.itemType,
        item: n.item,
        sourceId: n.sourceId,
        isSourcePublic: n.isSourcePublic,
        dropResult: null,
        didDrop: !1,
      });
    case iv:
      return fl({}, e, { isSourcePublic: !0 });
    case qf:
      return fl({}, e, { targetIds: n.targetIds });
    case Qf:
      return e.targetIds.indexOf(n.targetId) === -1
        ? e
        : fl({}, e, { targetIds: xM(e.targetIds, n.targetId) });
    case Gf:
      return fl({}, e, {
        dropResult: n.dropResult,
        didDrop: !0,
        targetIds: [],
      });
    case Kf:
      return fl({}, e, {
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
function k4(e = 0, t) {
  switch (t.type) {
    case lv:
    case uv:
      return e + 1;
    case sv:
    case Qf:
      return e - 1;
    default:
      return e;
  }
}
function b4(e = 0) {
  return e + 1;
}
function _4(e, t, n) {
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
function O4(e) {
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
        _4(e, i, n[i]);
      });
  }
  return e;
}
function I4(e = {}, t) {
  return {
    dirtyHandlerIds: v4(e.dirtyHandlerIds, {
      type: t.type,
      payload: O4({}, t.payload, {
        prevTargetIds: wM(e, "dragOperation.targetIds", []),
      }),
    }),
    dragOffset: x4(e.dragOffset, t),
    refCount: k4(e.refCount, t),
    dragOperation: C4(e.dragOperation, t),
    stateId: b4(e.stateId),
  };
}
function T4(e, t = void 0, n = {}, r = !1) {
  const i = P4(r),
    l = new YM(i, new p4(i)),
    s = new VM(i, l),
    a = e(s, t, n);
  return s.receiveBackend(a), s;
}
function P4(e) {
  const t = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return nv(I4, e && t && t({ name: "dnd-core", instanceId: "dnd-core" }));
}
function R4(e, t) {
  if (e == null) return {};
  var n = A4(e, t),
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
function A4(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    l;
  for (l = 0; l < r.length; l++)
    (i = r[l]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
let Vw = 0;
const fc = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
var D4 = I.memo(function (t) {
  var { children: n } = t,
    r = R4(t, ["children"]);
  const [i, l] = N4(r);
  return (
    I.useEffect(() => {
      if (l) {
        const s = uk();
        return (
          ++Vw,
          () => {
            --Vw === 0 && (s[fc] = null);
          }
        );
      }
    }, []),
    W(tk.Provider, { value: i, children: n })
  );
});
function N4(e) {
  if ("manager" in e) return [{ dragDropManager: e.manager }, !1];
  const t = M4(e.backend, e.context, e.options, e.debugMode),
    n = !e.context;
  return [t, n];
}
function M4(e, t = uk(), n, r) {
  const i = t;
  return i[fc] || (i[fc] = { dragDropManager: T4(e, t, n, r) }), i[fc];
}
function uk() {
  return typeof global < "u" ? global : window;
}
var L4 = function e(t, n) {
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
const F4 = uo(L4),
  Uo = typeof window < "u" ? I.useLayoutEffect : I.useEffect;
function sk(e, t, n) {
  const [r, i] = I.useState(() => t(e)),
    l = I.useCallback(() => {
      const s = t(e);
      F4(r, s) || (i(s), n && n());
    }, [r, e, n]);
  return Uo(l), [r, l];
}
function z4(e, t, n) {
  const [r, i] = sk(e, t, n);
  return (
    Uo(
      function () {
        const s = e.getHandlerId();
        if (s != null) return e.subscribeToStateChange(i, { handlerIds: [s] });
      },
      [e, i]
    ),
    r
  );
}
function ak(e, t, n) {
  return z4(t, e || (() => ({})), () => n.reconnect());
}
function ck(e, t) {
  const n = [...(t || [])];
  return (
    t == null && typeof e != "function" && n.push(e),
    I.useMemo(() => (typeof e == "function" ? e() : e), n)
  );
}
function $4(e) {
  return I.useMemo(() => e.hooks.dragSource(), [e]);
}
function B4(e) {
  return I.useMemo(() => e.hooks.dragPreview(), [e]);
}
let nh = !1,
  rh = !1;
class U4 {
  receiveHandlerId(t) {
    this.sourceId = t;
  }
  getHandlerId() {
    return this.sourceId;
  }
  canDrag() {
    be(
      !nh,
      "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor"
    );
    try {
      return (nh = !0), this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      nh = !1;
    }
  }
  isDragging() {
    if (!this.sourceId) return !1;
    be(
      !rh,
      "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor"
    );
    try {
      return (rh = !0), this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      rh = !1;
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
let ih = !1;
class H4 {
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
    be(
      !ih,
      "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor"
    );
    try {
      return (ih = !0), this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      ih = !1;
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
function j4(e, t, n) {
  const r = n.getRegistry(),
    i = r.addTarget(e, t);
  return [i, () => r.removeTarget(i)];
}
function W4(e, t, n) {
  const r = n.getRegistry(),
    i = r.addSource(e, t);
  return [i, () => r.removeSource(i)];
}
function Ig(e, t, n, r) {
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
function Tg(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function V4(e) {
  if (typeof e.type == "string") return;
  const t = e.type.displayName || e.type.name || "the component";
  throw new Error(
    `Only native element nodes can now be passed to React DnD connectors.You can either wrap ${t} into a <div>, or turn it into a drag source or a drop target itself.`
  );
}
function q4(e) {
  return (t = null, n = null) => {
    if (!I.isValidElement(t)) {
      const l = t;
      return e(l, n), l;
    }
    const r = t;
    return V4(r), G4(r, n ? (l) => e(l, n) : e);
  };
}
function fk(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      const r = e[n];
      if (n.endsWith("Ref")) t[n] = e[n];
      else {
        const i = q4(r);
        t[n] = () => i;
      }
    }),
    t
  );
}
function qw(e, t) {
  typeof e == "function" ? e(t) : (e.current = t);
}
function G4(e, t) {
  const n = e.ref;
  return (
    be(
      typeof n != "string",
      "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs"
    ),
    n
      ? I.cloneElement(e, {
          ref: (r) => {
            qw(n, r), qw(t, r);
          },
        })
      : I.cloneElement(e, { ref: t })
  );
}
class K4 {
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
    return !Ig(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }
  didDragPreviewOptionsChange() {
    return !Ig(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
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
    (this.hooks = fk({
      dragSource: (n, r) => {
        this.clearDragSource(),
          (this.dragSourceOptions = r || null),
          Tg(n) ? (this.dragSourceRef = n) : (this.dragSourceNode = n),
          this.reconnectDragSource();
      },
      dragPreview: (n, r) => {
        this.clearDragPreview(),
          (this.dragPreviewOptions = r || null),
          Tg(n) ? (this.dragPreviewRef = n) : (this.dragPreviewNode = n),
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
class Q4 {
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
    return !Ig(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
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
    (this.hooks = fk({
      dropTarget: (n, r) => {
        this.clearDropTarget(),
          (this.dropTargetOptions = r),
          Tg(n) ? (this.dropTargetRef = n) : (this.dropTargetNode = n),
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
function vi() {
  const { dragDropManager: e } = I.useContext(tk);
  return be(e != null, "Expected drag drop context"), e;
}
function Y4(e, t) {
  const n = vi(),
    r = I.useMemo(() => new K4(n.getBackend()), [n]);
  return (
    Uo(
      () => (
        (r.dragSourceOptions = e || null),
        r.reconnect(),
        () => r.disconnectDragSource()
      ),
      [r, e]
    ),
    Uo(
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
function X4() {
  const e = vi();
  return I.useMemo(() => new U4(e), [e]);
}
class Z4 {
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
function J4(e, t, n) {
  const r = I.useMemo(() => new Z4(e, t, n), [t, n]);
  return (
    I.useEffect(() => {
      r.spec = e;
    }, [e]),
    r
  );
}
function eL(e) {
  return I.useMemo(() => {
    const t = e.type;
    return be(t != null, "spec.type must be defined"), t;
  }, [e]);
}
function tL(e, t, n) {
  const r = vi(),
    i = J4(e, t, n),
    l = eL(e);
  Uo(
    function () {
      if (l != null) {
        const [a, f] = W4(l, i, r);
        return t.receiveHandlerId(a), n.receiveHandlerId(a), f;
      }
    },
    [r, t, n, i, l]
  );
}
function nL(e, t) {
  const n = ck(e, t);
  be(
    !n.begin,
    "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)"
  );
  const r = X4(),
    i = Y4(n.options, n.previewOptions);
  return tL(n, r, i), [ak(n.collect, r, i), $4(i), B4(i)];
}
function rL(e) {
  const n = vi().getMonitor(),
    [r, i] = sk(n, e);
  return (
    I.useEffect(() => n.subscribeToOffsetChange(i)),
    I.useEffect(() => n.subscribeToStateChange(i)),
    r
  );
}
function iL(e) {
  return I.useMemo(() => e.hooks.dropTarget(), [e]);
}
function oL(e) {
  const t = vi(),
    n = I.useMemo(() => new Q4(t.getBackend()), [t]);
  return (
    Uo(
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
function lL() {
  const e = vi();
  return I.useMemo(() => new H4(e), [e]);
}
function uL(e) {
  const { accept: t } = e;
  return I.useMemo(
    () => (
      be(e.accept != null, "accept must be defined"), Array.isArray(t) ? t : [t]
    ),
    [t]
  );
}
class sL {
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
function aL(e, t) {
  const n = I.useMemo(() => new sL(e, t), [t]);
  return (
    I.useEffect(() => {
      n.spec = e;
    }, [e]),
    n
  );
}
function cL(e, t, n) {
  const r = vi(),
    i = aL(e, t),
    l = uL(e);
  Uo(
    function () {
      const [a, f] = j4(l, i, r);
      return t.receiveHandlerId(a), n.receiveHandlerId(a), f;
    },
    [r, t, i, n, l.map((s) => s.toString()).join("|")]
  );
}
function jc(e, t) {
  const n = ck(e, t),
    r = lL(),
    i = oL(n.options);
  return cL(n, r, i), [ak(n.collect, r, i), iL(i)];
}
var Yi;
(function (e) {
  (e.mouse = "mouse"), (e.touch = "touch"), (e.keyboard = "keyboard");
})(Yi || (Yi = {}));
class fL {
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
function dL(e, t, n, r) {
  return Math.sqrt(Math.pow(Math.abs(n - e), 2) + Math.pow(Math.abs(r - t), 2));
}
function pL(e, t, n, r, i) {
  if (!i) return !1;
  const l = (Math.atan2(r - t, n - e) * 180) / Math.PI + 180;
  for (let s = 0; s < i.length; ++s) {
    const a = i[s];
    if (a && (a.start == null || l >= a.start) && (a.end == null || l <= a.end))
      return !0;
  }
  return !1;
}
const hL = { Left: 1, Right: 2, Center: 4 },
  gL = { Left: 0, Center: 1, Right: 2 };
function oh(e) {
  return e.button === void 0 || e.button === gL.Left;
}
function mL(e) {
  return e.buttons === void 0 || (e.buttons & hL.Left) === 0;
}
function dk(e) {
  return !!e.targetTouches;
}
const vL = 1;
function yL(e) {
  const t = e.nodeType === vL ? e : e.parentElement;
  if (!t) return;
  const { top: n, left: r } = t.getBoundingClientRect();
  return { x: r, y: n };
}
function wL(e, t) {
  if (e.targetTouches.length === 1) return Wc(e.targetTouches[0]);
  if (t && e.touches.length === 1 && e.touches[0].target === t.target)
    return Wc(e.touches[0]);
}
function Wc(e, t) {
  return dk(e) ? wL(e, t) : { x: e.clientX, y: e.clientY };
}
const Gw = (() => {
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
  Mu = {
    [Yi.mouse]: {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      contextmenu: "contextmenu",
    },
    [Yi.touch]: { start: "touchstart", move: "touchmove", end: "touchend" },
    [Yi.keyboard]: { keydown: "keydown" },
  };
class es {
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
      (be(!es.isSetUp, "Cannot have two Touch backends at the same time."),
      (es.isSetUp = !0),
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
      ((es.isSetUp = !1),
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
    const l = Gw ? { capture: i, passive: !1 } : i;
    this.listenerTypes.forEach(function (s) {
      const a = Mu[s][n];
      a && t.addEventListener(a, r, l);
    });
  }
  removeEventListener(t, n, r, i = !1) {
    const l = Gw ? { capture: i, passive: !1 } : i;
    this.listenerTypes.forEach(function (s) {
      const a = Mu[s][n];
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
        case Mu.mouse.move:
          s = { x: l.clientX, y: l.clientY };
          break;
        case Mu.touch.move:
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
      return l && yL(l);
    }),
      (this.handleTopMoveStartCapture = (i) => {
        oh(i) && (this.moveStartSourceIds = []);
      }),
      (this.handleMoveStart = (i) => {
        Array.isArray(this.moveStartSourceIds) &&
          this.moveStartSourceIds.unshift(i);
      }),
      (this.handleTopMoveStart = (i) => {
        if (!oh(i)) return;
        const l = Wc(i);
        l &&
          (dk(i) && (this.lastTargetTouchFallback = i.targetTouches[0]),
          (this._mouseClientOffset = l)),
          (this.waitingForDelay = !1);
      }),
      (this.handleTopMoveStartDelay = (i) => {
        if (!oh(i)) return;
        const l =
          i.type === Mu.touch.start
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
          f = Wc(i, this.lastTargetTouchFallback);
        if (!f) return;
        if (
          this._isScrolling ||
          (!this.monitor.isDragging() &&
            pL(
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
            dL(
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
          .filter((E, S, A) => A.indexOf(E) === S);
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
          !!mL(i))
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
      (this.options = new fL(r, n)),
      (this.actions = t.getActions()),
      (this.monitor = t.getMonitor()),
      (this.sourceNodes = new Map()),
      (this.sourcePreviewNodes = new Map()),
      (this.sourcePreviewNodeOptions = new Map()),
      (this.targetNodes = new Map()),
      (this.listenerTypes = []),
      (this._mouseClientOffset = {}),
      (this._isScrolling = !1),
      this.options.enableMouseEvents && this.listenerTypes.push(Yi.mouse),
      this.options.enableTouchEvents && this.listenerTypes.push(Yi.touch),
      this.options.enableKeyboardEvents && this.listenerTypes.push(Yi.keyboard);
  }
}
const xL = function (t, n = {}, r = {}) {
  return new es(t, n, r);
};
function Cr(e) {
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
function io(e) {
  return !!e && !!e[ft];
}
function gi(e) {
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
        (typeof i == "function" && Function.toString.call(i) === IL)
      );
    })(e) ||
      Array.isArray(e) ||
      !!e[ex] ||
      !!(!((t = e.constructor) === null || t === void 0) && t[ex]) ||
      av(e) ||
      cv(e))
  );
}
function Ho(e, t, n) {
  n === void 0 && (n = !1),
    ou(e) === 0
      ? (n ? Object.keys : Ml)(e).forEach(function (r) {
          (n && typeof r == "symbol") || t(r, e[r], e);
        })
      : e.forEach(function (r, i) {
          return t(i, r, e);
        });
}
function ou(e) {
  var t = e[ft];
  return t
    ? t.i > 3
      ? t.i - 4
      : t.i
    : Array.isArray(e)
    ? 1
    : av(e)
    ? 2
    : cv(e)
    ? 3
    : 0;
}
function Nl(e, t) {
  return ou(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function SL(e, t) {
  return ou(e) === 2 ? e.get(t) : e[t];
}
function pk(e, t, n) {
  var r = ou(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function hk(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function av(e) {
  return _L && e instanceof Map;
}
function cv(e) {
  return OL && e instanceof Set;
}
function bo(e) {
  return e.o || e.t;
}
function fv(e) {
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  var t = mk(e);
  delete t[ft];
  for (var n = Ml(t), r = 0; r < n.length; r++) {
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
function dv(e, t) {
  return (
    t === void 0 && (t = !1),
    pv(e) ||
      io(e) ||
      !gi(e) ||
      (ou(e) > 1 && (e.set = e.add = e.clear = e.delete = EL),
      Object.freeze(e),
      t &&
        Ho(
          e,
          function (n, r) {
            return dv(r, !0);
          },
          !0
        )),
    e
  );
}
function EL() {
  Cr(2);
}
function pv(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function Hr(e) {
  var t = Ng[e];
  return t || Cr(18, e), t;
}
function CL(e, t) {
  Ng[e] || (Ng[e] = t);
}
function Pg() {
  return ks;
}
function lh(e, t) {
  t && (Hr("Patches"), (e.u = []), (e.s = []), (e.v = t));
}
function Vc(e) {
  Rg(e), e.p.forEach(kL), (e.p = null);
}
function Rg(e) {
  e === ks && (ks = e.l);
}
function Kw(e) {
  return (ks = { p: [], l: ks, h: e, m: !0, _: 0 });
}
function kL(e) {
  var t = e[ft];
  t.i === 0 || t.i === 1 ? t.j() : (t.g = !0);
}
function uh(e, t) {
  t._ = t.p.length;
  var n = t.p[0],
    r = e !== void 0 && e !== n;
  return (
    t.h.O || Hr("ES5").S(t, e, r),
    r
      ? (n[ft].P && (Vc(t), Cr(4)),
        gi(e) && ((e = qc(t, e)), t.l || Gc(t, e)),
        t.u && Hr("Patches").M(n[ft].t, e, t.u, t.s))
      : (e = qc(t, n, [])),
    Vc(t),
    t.u && t.v(t.u, t.s),
    e !== gk ? e : void 0
  );
}
function qc(e, t, n) {
  if (pv(t)) return t;
  var r = t[ft];
  if (!r)
    return (
      Ho(
        t,
        function (a, f) {
          return Qw(e, r, t, a, f, n);
        },
        !0
      ),
      t
    );
  if (r.A !== e) return t;
  if (!r.P) return Gc(e, r.t, !0), r.t;
  if (!r.I) {
    (r.I = !0), r.A._--;
    var i = r.i === 4 || r.i === 5 ? (r.o = fv(r.k)) : r.o,
      l = i,
      s = !1;
    r.i === 3 && ((l = new Set(i)), i.clear(), (s = !0)),
      Ho(l, function (a, f) {
        return Qw(e, r, i, a, f, n, s);
      }),
      Gc(e, i, !1),
      n && e.u && Hr("Patches").N(r, n, e.u, e.s);
  }
  return r.o;
}
function Qw(e, t, n, r, i, l, s) {
  if (io(i)) {
    var a = qc(e, i, l && t && t.i !== 3 && !Nl(t.R, r) ? l.concat(r) : void 0);
    if ((pk(n, r, a), !io(a))) return;
    e.m = !1;
  } else s && n.add(i);
  if (gi(i) && !pv(i)) {
    if (!e.h.D && e._ < 1) return;
    qc(e, i), (t && t.A.l) || Gc(e, i);
  }
}
function Gc(e, t, n) {
  n === void 0 && (n = !1), !e.l && e.h.D && e.m && dv(t, n);
}
function sh(e, t) {
  var n = e[ft];
  return (n ? bo(n) : e)[t];
}
function Yw(e, t) {
  if (t in e)
    for (var n = Object.getPrototypeOf(e); n; ) {
      var r = Object.getOwnPropertyDescriptor(n, t);
      if (r) return r;
      n = Object.getPrototypeOf(n);
    }
}
function zi(e) {
  e.P || ((e.P = !0), e.l && zi(e.l));
}
function ah(e) {
  e.o || (e.o = fv(e.t));
}
function Ag(e, t, n) {
  var r = av(t)
    ? Hr("MapSet").F(t, n)
    : cv(t)
    ? Hr("MapSet").T(t, n)
    : e.O
    ? (function (i, l) {
        var s = Array.isArray(i),
          a = {
            i: s ? 1 : 0,
            A: l ? l.A : Pg(),
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
          d = bs;
        s && ((f = [a]), (d = Uu));
        var p = Proxy.revocable(f, d),
          g = p.revoke,
          v = p.proxy;
        return (a.k = v), (a.j = g), v;
      })(t, n)
    : Hr("ES5").J(t, n);
  return (n ? n.A : Pg()).p.push(r), r;
}
function Dg(e) {
  return (
    io(e) || Cr(22, e),
    (function t(n) {
      if (!gi(n)) return n;
      var r,
        i = n[ft],
        l = ou(n);
      if (i) {
        if (!i.P && (i.i < 4 || !Hr("ES5").K(i))) return i.t;
        (i.I = !0), (r = Xw(n, l)), (i.I = !1);
      } else r = Xw(n, l);
      return (
        Ho(r, function (s, a) {
          (i && SL(i.t, s) === a) || pk(r, s, t(a));
        }),
        l === 3 ? new Set(r) : r
      );
    })(e)
  );
}
function Xw(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return fv(e);
}
function bL() {
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
                var f = this[ft];
                return bs.get(f, l);
              },
              set: function (f) {
                var d = this[ft];
                bs.set(d, l, f);
              },
            }),
      a
    );
  }
  function t(l) {
    for (var s = l.length - 1; s >= 0; s--) {
      var a = l[s][ft];
      if (!a.P)
        switch (a.i) {
          case 5:
            r(a) && zi(a);
            break;
          case 4:
            n(a) && zi(a);
        }
    }
  }
  function n(l) {
    for (var s = l.t, a = l.k, f = Ml(a), d = f.length - 1; d >= 0; d--) {
      var p = f[d];
      if (p !== ft) {
        var g = s[p];
        if (g === void 0 && !Nl(s, p)) return !0;
        var v = a[p],
          m = v && v[ft];
        if (m ? m.t !== g : !hk(v, g)) return !0;
      }
    }
    var E = !!s[ft];
    return f.length !== Ml(s).length + (E ? 0 : 1);
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
  CL("ES5", {
    J: function (l, s) {
      var a = Array.isArray(l),
        f = (function (p, g) {
          if (p) {
            for (var v = Array(g.length), m = 0; m < g.length; m++)
              Object.defineProperty(v, "" + m, e(m, !0));
            return v;
          }
          var E = mk(g);
          delete E[ft];
          for (var S = Ml(E), A = 0; A < S.length; A++) {
            var y = S[A];
            E[y] = e(y, p || !!E[y].enumerable);
          }
          return Object.create(Object.getPrototypeOf(g), E);
        })(a, l),
        d = {
          i: a ? 5 : 4,
          A: s ? s.A : Pg(),
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
      return Object.defineProperty(f, ft, { value: d, writable: !0 }), f;
    },
    S: function (l, s, a) {
      a
        ? io(s) && s[ft].A === l && t(l.p)
        : (l.u &&
            (function f(d) {
              if (d && typeof d == "object") {
                var p = d[ft];
                if (p) {
                  var g = p.t,
                    v = p.k,
                    m = p.R,
                    E = p.i;
                  if (E === 4)
                    Ho(v, function (k) {
                      k !== ft &&
                        (g[k] !== void 0 || Nl(g, k)
                          ? m[k] || f(v[k])
                          : ((m[k] = !0), zi(p)));
                    }),
                      Ho(g, function (k) {
                        v[k] !== void 0 || Nl(v, k) || ((m[k] = !1), zi(p));
                      });
                  else if (E === 5) {
                    if ((r(p) && (zi(p), (m.length = !0)), v.length < g.length))
                      for (var S = v.length; S < g.length; S++) m[S] = !1;
                    else for (var A = g.length; A < v.length; A++) m[A] = !0;
                    for (
                      var y = Math.min(v.length, g.length), w = 0;
                      w < y;
                      w++
                    )
                      v.hasOwnProperty(w) || (m[w] = !0),
                        m[w] === void 0 && f(v[w]);
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
var Zw,
  ks,
  hv = typeof Symbol < "u" && typeof Symbol("x") == "symbol",
  _L = typeof Map < "u",
  OL = typeof Set < "u",
  Jw = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u",
  gk = hv
    ? Symbol.for("immer-nothing")
    : (((Zw = {})["immer-nothing"] = !0), Zw),
  ex = hv ? Symbol.for("immer-draftable") : "__$immer_draftable",
  ft = hv ? Symbol.for("immer-state") : "__$immer_state",
  IL = "" + Object.prototype.constructor,
  Ml =
    typeof Reflect < "u" && Reflect.ownKeys
      ? Reflect.ownKeys
      : Object.getOwnPropertySymbols !== void 0
      ? function (e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        }
      : Object.getOwnPropertyNames,
  mk =
    Object.getOwnPropertyDescriptors ||
    function (e) {
      var t = {};
      return (
        Ml(e).forEach(function (n) {
          t[n] = Object.getOwnPropertyDescriptor(e, n);
        }),
        t
      );
    },
  Ng = {},
  bs = {
    get: function (e, t) {
      if (t === ft) return e;
      var n = bo(e);
      if (!Nl(n, t))
        return (function (i, l, s) {
          var a,
            f = Yw(l, s);
          return f
            ? "value" in f
              ? f.value
              : (a = f.get) === null || a === void 0
              ? void 0
              : a.call(i.k)
            : void 0;
        })(e, n, t);
      var r = n[t];
      return e.I || !gi(r)
        ? r
        : r === sh(e.t, t)
        ? (ah(e), (e.o[t] = Ag(e.A.h, r, e)))
        : r;
    },
    has: function (e, t) {
      return t in bo(e);
    },
    ownKeys: function (e) {
      return Reflect.ownKeys(bo(e));
    },
    set: function (e, t, n) {
      var r = Yw(bo(e), t);
      if (r?.set) return r.set.call(e.k, n), !0;
      if (!e.P) {
        var i = sh(bo(e), t),
          l = i?.[ft];
        if (l && l.t === n) return (e.o[t] = n), (e.R[t] = !1), !0;
        if (hk(n, i) && (n !== void 0 || Nl(e.t, t))) return !0;
        ah(e), zi(e);
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
        sh(e.t, t) !== void 0 || t in e.t
          ? ((e.R[t] = !1), ah(e), zi(e))
          : delete e.R[t],
        e.o && delete e.o[t],
        !0
      );
    },
    getOwnPropertyDescriptor: function (e, t) {
      var n = bo(e),
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
      Cr(11);
    },
    getPrototypeOf: function (e) {
      return Object.getPrototypeOf(e.t);
    },
    setPrototypeOf: function () {
      Cr(12);
    },
  },
  Uu = {};
Ho(bs, function (e, t) {
  Uu[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
}),
  (Uu.deleteProperty = function (e, t) {
    return Uu.set.call(this, e, t, void 0);
  }),
  (Uu.set = function (e, t, n) {
    return bs.set.call(this, e[0], t, n, e[0]);
  });
var TL = (function () {
    function e(n) {
      var r = this;
      (this.O = Jw),
        (this.D = !0),
        (this.produce = function (i, l, s) {
          if (typeof i == "function" && typeof l != "function") {
            var a = l;
            l = i;
            var f = r;
            return function (S) {
              var A = this;
              S === void 0 && (S = a);
              for (
                var y = arguments.length, w = Array(y > 1 ? y - 1 : 0), k = 1;
                k < y;
                k++
              )
                w[k - 1] = arguments[k];
              return f.produce(S, function (R) {
                var D;
                return (D = l).call.apply(D, [A, R].concat(w));
              });
            };
          }
          var d;
          if (
            (typeof l != "function" && Cr(6),
            s !== void 0 && typeof s != "function" && Cr(7),
            gi(i))
          ) {
            var p = Kw(r),
              g = Ag(r, i, void 0),
              v = !0;
            try {
              (d = l(g)), (v = !1);
            } finally {
              v ? Vc(p) : Rg(p);
            }
            return typeof Promise < "u" && d instanceof Promise
              ? d.then(
                  function (S) {
                    return lh(p, s), uh(S, p);
                  },
                  function (S) {
                    throw (Vc(p), S);
                  }
                )
              : (lh(p, s), uh(d, p));
          }
          if (!i || typeof i != "object") {
            if (
              ((d = l(i)) === void 0 && (d = i),
              d === gk && (d = void 0),
              r.D && dv(d, !0),
              s)
            ) {
              var m = [],
                E = [];
              Hr("Patches").M(i, d, m, E), s(m, E);
            }
            return d;
          }
          Cr(21, i);
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
        gi(n) || Cr(8), io(n) && (n = Dg(n));
        var r = Kw(this),
          i = Ag(this, n, void 0);
        return (i[ft].C = !0), Rg(r), i;
      }),
      (t.finishDraft = function (n, r) {
        var i = n && n[ft],
          l = i.A;
        return lh(l, r), uh(void 0, l);
      }),
      (t.setAutoFreeze = function (n) {
        this.D = n;
      }),
      (t.setUseProxies = function (n) {
        n && !Jw && Cr(20), (this.O = n);
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
        var s = Hr("Patches").$;
        return io(n)
          ? s(n, r)
          : this.produce(n, function (a) {
              return s(a, r);
            });
      }),
      e
    );
  })(),
  Un = new TL(),
  vk = Un.produce;
Un.produceWithPatches.bind(Un);
Un.setAutoFreeze.bind(Un);
Un.setUseProxies.bind(Un);
Un.applyPatches.bind(Un);
Un.createDraft.bind(Un);
Un.finishDraft.bind(Un);
function yk(e) {
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
var wk = yk();
wk.withExtraArgument = yk;
const tx = wk;
var xk =
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
  PL =
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
  Kl =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
      return e;
    },
  RL = Object.defineProperty,
  AL = Object.defineProperties,
  DL = Object.getOwnPropertyDescriptors,
  nx = Object.getOwnPropertySymbols,
  NL = Object.prototype.hasOwnProperty,
  ML = Object.prototype.propertyIsEnumerable,
  rx = function (e, t, n) {
    return t in e
      ? RL(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n);
  },
  Xi = function (e, t) {
    for (var n in t || (t = {})) NL.call(t, n) && rx(e, n, t[n]);
    if (nx)
      for (var r = 0, i = nx(t); r < i.length; r++) {
        var n = i[r];
        ML.call(t, n) && rx(e, n, t[n]);
      }
    return e;
  },
  ch = function (e, t) {
    return AL(e, DL(t));
  },
  LL = function (e, t, n) {
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
  FL =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? Hc
              : Hc.apply(null, arguments);
        };
function zL(e) {
  if (typeof e != "object" || e === null) return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  for (var n = t; Object.getPrototypeOf(n) !== null; )
    n = Object.getPrototypeOf(n);
  return t === n;
}
var $L = function (e) {
  return e && typeof e.match == "function";
};
function Zi(e, t) {
  function n() {
    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    if (t) {
      var l = t.apply(void 0, r);
      if (!l) throw new Error("prepareAction did not return an object");
      return Xi(
        Xi({ type: e, payload: l.payload }, "meta" in l && { meta: l.meta }),
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
var BL = (function (e) {
    xk(t, e);
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
          ? new (t.bind.apply(t, Kl([void 0], n[0].concat(this))))()
          : new (t.bind.apply(t, Kl([void 0], n.concat(this))))();
      }),
      t
    );
  })(Array),
  UL = (function (e) {
    xk(t, e);
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
          ? new (t.bind.apply(t, Kl([void 0], n[0].concat(this))))()
          : new (t.bind.apply(t, Kl([void 0], n.concat(this))))();
      }),
      t
    );
  })(Array);
function Mg(e) {
  return gi(e) ? vk(e, function () {}) : e;
}
function HL(e) {
  return typeof e == "boolean";
}
function jL() {
  return function (t) {
    return WL(t);
  };
}
function WL(e) {
  e === void 0 && (e = {});
  var t = e.thunk,
    n = t === void 0 ? !0 : t;
  e.immutableCheck, e.serializableCheck, e.actionCreatorCheck;
  var r = new BL();
  return (
    n && (HL(n) ? r.push(tx) : r.push(tx.withExtraArgument(n.extraArgument))), r
  );
}
var VL = !0;
function qL(e) {
  var t = jL(),
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
  else if (zL(i)) m = mM(i);
  else
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    );
  var E = s;
  typeof E == "function" && (E = E(t));
  var S = vM.apply(void 0, E),
    A = Hc;
  f && (A = FL(Xi({ trace: !VL }, typeof f == "object" && f)));
  var y = new UL(S),
    w = y;
  Array.isArray(v) ? (w = Kl([S], v)) : typeof v == "function" && (w = v(y));
  var k = A.apply(void 0, w);
  return nv(m, p, k);
}
function Sk(e) {
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
function GL(e) {
  return typeof e == "function";
}
function KL(e, t, n, r) {
  n === void 0 && (n = []);
  var i = typeof t == "function" ? Sk(t) : [t, n, r],
    l = i[0],
    s = i[1],
    a = i[2],
    f;
  if (GL(e))
    f = function () {
      return Mg(e());
    };
  else {
    var d = Mg(e);
    f = function () {
      return d;
    };
  }
  function p(g, v) {
    g === void 0 && (g = f());
    var m = Kl(
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
          if (io(E)) {
            var A = E,
              y = S(A, v);
            return y === void 0 ? E : y;
          } else {
            if (gi(E))
              return vk(E, function (w) {
                return S(w, v);
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
function QL(e, t) {
  return e + "/" + t;
}
function gv(e) {
  var t = e.name;
  if (!t) throw new Error("`name` is a required option for createSlice");
  typeof process < "u";
  var n =
      typeof e.initialState == "function" ? e.initialState : Mg(e.initialState),
    r = e.reducers || {},
    i = Object.keys(r),
    l = {},
    s = {},
    a = {};
  i.forEach(function (p) {
    var g = r[p],
      v = QL(t, p),
      m,
      E;
    "reducer" in g ? ((m = g.reducer), (E = g.prepare)) : (m = g),
      (l[p] = m),
      (s[v] = m),
      (a[p] = E ? Zi(v, E) : Zi(v));
  });
  function f() {
    var p =
        typeof e.extraReducers == "function"
          ? Sk(e.extraReducers)
          : [e.extraReducers],
      g = p[0],
      v = g === void 0 ? {} : g,
      m = p[1],
      E = m === void 0 ? [] : m,
      S = p[2],
      A = S === void 0 ? void 0 : S,
      y = Xi(Xi({}, v), s);
    return KL(n, function (w) {
      for (var k in y) w.addCase(k, y[k]);
      for (var R = 0, D = E; R < D.length; R++) {
        var T = D[R];
        w.addMatcher(T.matcher, T.reducer);
      }
      A && w.addDefaultCase(A);
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
var YL = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  XL = function (e) {
    e === void 0 && (e = 21);
    for (var t = "", n = e; n--; ) t += YL[(Math.random() * 64) | 0];
    return t;
  },
  ZL = ["name", "message", "stack", "code"],
  fh = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  ix = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  JL = function (e) {
    if (typeof e == "object" && e !== null) {
      for (var t = {}, n = 0, r = ZL; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == "string" && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  },
  mv = (function () {
    function e(t, n, r) {
      var i = Zi(t + "/fulfilled", function (d, p, g, v) {
          return {
            payload: d,
            meta: ch(Xi({}, v || {}), {
              arg: g,
              requestId: p,
              requestStatus: "fulfilled",
            }),
          };
        }),
        l = Zi(t + "/pending", function (d, p, g) {
          return {
            payload: void 0,
            meta: ch(Xi({}, g || {}), {
              arg: p,
              requestId: d,
              requestStatus: "pending",
            }),
          };
        }),
        s = Zi(t + "/rejected", function (d, p, g, v, m) {
          return {
            payload: v,
            error: ((r && r.serializeError) || JL)(d || "Rejected"),
            meta: ch(Xi({}, m || {}), {
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
          var m = r?.idGenerator ? r.idGenerator(d) : XL(),
            E = new a(),
            S;
          function A(w) {
            (S = w), E.abort();
          }
          var y = (function () {
            return LL(this, null, function () {
              var w, k, R, D, T, F, z;
              return PL(this, function (q) {
                switch (q.label) {
                  case 0:
                    return (
                      q.trys.push([0, 4, , 5]),
                      (D =
                        (w = r?.condition) == null
                          ? void 0
                          : w.call(r, d, { getState: g, extra: v })),
                      tF(D) ? [4, D] : [3, 2]
                    );
                  case 1:
                    (D = q.sent()), (q.label = 2);
                  case 2:
                    if (D === !1 || E.signal.aborted)
                      throw {
                        name: "ConditionError",
                        message:
                          "Aborted due to condition callback returning false.",
                      };
                    return (
                      (T = new Promise(function (G, $) {
                        return E.signal.addEventListener("abort", function () {
                          return $({
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
                          T,
                          Promise.resolve(
                            n(d, {
                              dispatch: p,
                              getState: g,
                              extra: v,
                              requestId: m,
                              signal: E.signal,
                              abort: A,
                              rejectWithValue: function (G, $) {
                                return new fh(G, $);
                              },
                              fulfillWithValue: function (G, $) {
                                return new ix(G, $);
                              },
                            })
                          ).then(function (G) {
                            if (G instanceof fh) throw G;
                            return G instanceof ix
                              ? i(G.payload, m, d, G.meta)
                              : i(G, m, d);
                          }),
                        ]),
                      ]
                    );
                  case 3:
                    return (R = q.sent()), [3, 5];
                  case 4:
                    return (
                      (F = q.sent()),
                      (R =
                        F instanceof fh
                          ? s(null, m, d, F.payload, F.meta)
                          : s(F, m, d)),
                      [3, 5]
                    );
                  case 5:
                    return (
                      (z =
                        r &&
                        !r.dispatchConditionRejection &&
                        s.match(R) &&
                        R.meta.condition),
                      z || p(R),
                      [2, R]
                    );
                }
              });
            });
          })();
          return Object.assign(y, {
            abort: A,
            requestId: m,
            arg: d,
            unwrap: function () {
              return y.then(eF);
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
function eF(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function tF(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var nF = function (e, t) {
  return $L(e) ? e.match(t) : e(t);
};
function vv() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return function (n) {
    return e.some(function (r) {
      return nF(r, n);
    });
  };
}
function yv(e, t) {
  if (!e || !e.meta) return !1;
  var n = typeof e.meta.requestId == "string",
    r = t.indexOf(e.meta.requestStatus) > -1;
  return n && r;
}
function wv(e) {
  return (
    typeof e[0] == "function" &&
    "pending" in e[0] &&
    "fulfilled" in e[0] &&
    "rejected" in e[0]
  );
}
function Ek() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return e.length === 0
    ? function (n) {
        return yv(n, ["pending"]);
      }
    : wv(e)
    ? function (n) {
        var r = e.map(function (l) {
            return l.pending;
          }),
          i = vv.apply(void 0, r);
        return i(n);
      }
    : Ek()(e[0]);
}
function Ck() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return e.length === 0
    ? function (n) {
        return yv(n, ["rejected"]);
      }
    : wv(e)
    ? function (n) {
        var r = e.map(function (l) {
            return l.rejected;
          }),
          i = vv.apply(void 0, r);
        return i(n);
      }
    : Ck()(e[0]);
}
function kk() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return e.length === 0
    ? function (n) {
        return yv(n, ["fulfilled"]);
      }
    : wv(e)
    ? function (n) {
        var r = e.map(function (l) {
            return l.fulfilled;
          }),
          i = vv.apply(void 0, r);
        return i(n);
      }
    : kk()(e[0]);
}
var xv = "listenerMiddleware";
Zi(xv + "/add");
Zi(xv + "/removeAll");
Zi(xv + "/remove");
var ox;
typeof queueMicrotask == "function" &&
  queueMicrotask.bind(
    typeof window < "u" ? window : typeof global < "u" ? global : globalThis
  );
bL();
var Xt = ((e) => (
    (e.PLAYER = "player"),
    (e.SHOP = "shop"),
    (e.CONTAINER = "container"),
    (e.CRAFTING = "crafting"),
    e
  ))(Xt || {}),
  Kc = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ Kc.exports;
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
      A = 1,
      y = 2,
      w = 4,
      k = 8,
      R = 16,
      D = 32,
      T = 64,
      F = 128,
      z = 256,
      q = 512,
      G = 30,
      $ = "...",
      Q = 800,
      B = 16,
      U = 1,
      J = 2,
      ue = 3,
      ne = 1 / 0,
      H = 9007199254740991,
      Z = 17976931348623157e292,
      _ = 0 / 0,
      re = 4294967295,
      ae = re - 1,
      O = re >>> 1,
      de = [
        ["ary", F],
        ["bind", A],
        ["bindKey", y],
        ["curry", k],
        ["curryRight", R],
        ["flip", q],
        ["partial", D],
        ["partialRight", T],
        ["rearg", z],
      ],
      Pe = "[object Arguments]",
      me = "[object Array]",
      De = "[object AsyncFunction]",
      Se = "[object Boolean]",
      Fe = "[object Date]",
      Ie = "[object DOMException]",
      Ue = "[object Error]",
      ze = "[object Function]",
      Ge = "[object GeneratorFunction]",
      yt = "[object Map]",
      Vn = "[object Number]",
      he = "[object Null]",
      at = "[object Object]",
      Lt = "[object Promise]",
      kn = "[object Proxy]",
      bn = "[object RegExp]",
      jt = "[object Set]",
      Tr = "[object String]",
      Gr = "[object Symbol]",
      Qo = "[object Undefined]",
      Pr = "[object WeakMap]",
      qn = "[object WeakSet]",
      V = "[object ArrayBuffer]",
      ie = "[object DataView]",
      pe = "[object Float32Array]",
      He = "[object Float64Array]",
      je = "[object Int8Array]",
      Jt = "[object Int16Array]",
      Gn = "[object Int32Array]",
      _n = "[object Uint8Array]",
      Kr = "[object Uint8ClampedArray]",
      Qr = "[object Uint16Array]",
      ot = "[object Uint32Array]",
      cu = /\b__p \+= '';/g,
      hr = /\b(__p \+=) '' \+/g,
      m_ = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      Yv = /&(?:amp|lt|gt|quot|#39);/g,
      Xv = /[&<>"']/g,
      v_ = RegExp(Yv.source),
      y_ = RegExp(Xv.source),
      w_ = /<%-([\s\S]+?)%>/g,
      x_ = /<%([\s\S]+?)%>/g,
      Zv = /<%=([\s\S]+?)%>/g,
      S_ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      E_ = /^\w*$/,
      C_ =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      md = /[\\^$.*+?()[\]{}|]/g,
      k_ = RegExp(md.source),
      vd = /^\s+/,
      b_ = /\s/,
      __ = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      O_ = /\{\n\/\* \[wrapped with (.+)\] \*/,
      I_ = /,? & /,
      T_ = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      P_ = /[()=,{}\[\]\/\s]/,
      R_ = /\\(\\)?/g,
      A_ = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      Jv = /\w*$/,
      D_ = /^[-+]0x[0-9a-f]+$/i,
      N_ = /^0b[01]+$/i,
      M_ = /^\[object .+?Constructor\]$/,
      L_ = /^0o[0-7]+$/i,
      F_ = /^(?:0|[1-9]\d*)$/,
      z_ = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      Bs = /($^)/,
      $_ = /['\n\r\u2028\u2029\\]/g,
      Us = "\\ud800-\\udfff",
      B_ = "\\u0300-\\u036f",
      U_ = "\\ufe20-\\ufe2f",
      H_ = "\\u20d0-\\u20ff",
      ey = B_ + U_ + H_,
      ty = "\\u2700-\\u27bf",
      ny = "a-z\\xdf-\\xf6\\xf8-\\xff",
      j_ = "\\xac\\xb1\\xd7\\xf7",
      W_ = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
      V_ = "\\u2000-\\u206f",
      q_ =
        " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      ry = "A-Z\\xc0-\\xd6\\xd8-\\xde",
      iy = "\\ufe0e\\ufe0f",
      oy = j_ + W_ + V_ + q_,
      yd = "['’]",
      G_ = "[" + Us + "]",
      ly = "[" + oy + "]",
      Hs = "[" + ey + "]",
      uy = "\\d+",
      K_ = "[" + ty + "]",
      sy = "[" + ny + "]",
      ay = "[^" + Us + oy + uy + ty + ny + ry + "]",
      wd = "\\ud83c[\\udffb-\\udfff]",
      Q_ = "(?:" + Hs + "|" + wd + ")",
      cy = "[^" + Us + "]",
      xd = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Sd = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      Yo = "[" + ry + "]",
      fy = "\\u200d",
      dy = "(?:" + sy + "|" + ay + ")",
      Y_ = "(?:" + Yo + "|" + ay + ")",
      py = "(?:" + yd + "(?:d|ll|m|re|s|t|ve))?",
      hy = "(?:" + yd + "(?:D|LL|M|RE|S|T|VE))?",
      gy = Q_ + "?",
      my = "[" + iy + "]?",
      X_ = "(?:" + fy + "(?:" + [cy, xd, Sd].join("|") + ")" + my + gy + ")*",
      Z_ = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
      J_ = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
      vy = my + gy + X_,
      eO = "(?:" + [K_, xd, Sd].join("|") + ")" + vy,
      tO = "(?:" + [cy + Hs + "?", Hs, xd, Sd, G_].join("|") + ")",
      nO = RegExp(yd, "g"),
      rO = RegExp(Hs, "g"),
      Ed = RegExp(wd + "(?=" + wd + ")|" + tO + vy, "g"),
      iO = RegExp(
        [
          Yo + "?" + sy + "+" + py + "(?=" + [ly, Yo, "$"].join("|") + ")",
          Y_ + "+" + hy + "(?=" + [ly, Yo + dy, "$"].join("|") + ")",
          Yo + "?" + dy + "+" + py,
          Yo + "+" + hy,
          J_,
          Z_,
          uy,
          eO,
        ].join("|"),
        "g"
      ),
      oO = RegExp("[" + fy + Us + ey + iy + "]"),
      lO = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      uO = [
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
      sO = -1,
      lt = {};
    (lt[pe] =
      lt[He] =
      lt[je] =
      lt[Jt] =
      lt[Gn] =
      lt[_n] =
      lt[Kr] =
      lt[Qr] =
      lt[ot] =
        !0),
      (lt[Pe] =
        lt[me] =
        lt[V] =
        lt[Se] =
        lt[ie] =
        lt[Fe] =
        lt[Ue] =
        lt[ze] =
        lt[yt] =
        lt[Vn] =
        lt[at] =
        lt[bn] =
        lt[jt] =
        lt[Tr] =
        lt[Pr] =
          !1);
    var tt = {};
    (tt[Pe] =
      tt[me] =
      tt[V] =
      tt[ie] =
      tt[Se] =
      tt[Fe] =
      tt[pe] =
      tt[He] =
      tt[je] =
      tt[Jt] =
      tt[Gn] =
      tt[yt] =
      tt[Vn] =
      tt[at] =
      tt[bn] =
      tt[jt] =
      tt[Tr] =
      tt[Gr] =
      tt[_n] =
      tt[Kr] =
      tt[Qr] =
      tt[ot] =
        !0),
      (tt[Ue] = tt[ze] = tt[Pr] = !1);
    var aO = {
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
      cO = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      },
      fO = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      },
      dO = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      pO = parseFloat,
      hO = parseInt,
      yy = typeof _u == "object" && _u && _u.Object === Object && _u,
      gO = typeof self == "object" && self && self.Object === Object && self,
      Ft = yy || gO || Function("return this")(),
      Cd = t && !t.nodeType && t,
      ho = Cd && !0 && e && !e.nodeType && e,
      wy = ho && ho.exports === Cd,
      kd = wy && yy.process,
      Kn = (function () {
        try {
          var M = ho && ho.require && ho.require("util").types;
          return M || (kd && kd.binding && kd.binding("util"));
        } catch {}
      })(),
      xy = Kn && Kn.isArrayBuffer,
      Sy = Kn && Kn.isDate,
      Ey = Kn && Kn.isMap,
      Cy = Kn && Kn.isRegExp,
      ky = Kn && Kn.isSet,
      by = Kn && Kn.isTypedArray;
    function On(M, K, j) {
      switch (j.length) {
        case 0:
          return M.call(K);
        case 1:
          return M.call(K, j[0]);
        case 2:
          return M.call(K, j[0], j[1]);
        case 3:
          return M.call(K, j[0], j[1], j[2]);
      }
      return M.apply(K, j);
    }
    function mO(M, K, j, se) {
      for (var Ee = -1, We = M == null ? 0 : M.length; ++Ee < We; ) {
        var Ot = M[Ee];
        K(se, Ot, j(Ot), M);
      }
      return se;
    }
    function Qn(M, K) {
      for (
        var j = -1, se = M == null ? 0 : M.length;
        ++j < se && K(M[j], j, M) !== !1;

      );
      return M;
    }
    function vO(M, K) {
      for (var j = M == null ? 0 : M.length; j-- && K(M[j], j, M) !== !1; );
      return M;
    }
    function _y(M, K) {
      for (var j = -1, se = M == null ? 0 : M.length; ++j < se; )
        if (!K(M[j], j, M)) return !1;
      return !0;
    }
    function Si(M, K) {
      for (
        var j = -1, se = M == null ? 0 : M.length, Ee = 0, We = [];
        ++j < se;

      ) {
        var Ot = M[j];
        K(Ot, j, M) && (We[Ee++] = Ot);
      }
      return We;
    }
    function js(M, K) {
      var j = M == null ? 0 : M.length;
      return !!j && Xo(M, K, 0) > -1;
    }
    function bd(M, K, j) {
      for (var se = -1, Ee = M == null ? 0 : M.length; ++se < Ee; )
        if (j(K, M[se])) return !0;
      return !1;
    }
    function ct(M, K) {
      for (
        var j = -1, se = M == null ? 0 : M.length, Ee = Array(se);
        ++j < se;

      )
        Ee[j] = K(M[j], j, M);
      return Ee;
    }
    function Ei(M, K) {
      for (var j = -1, se = K.length, Ee = M.length; ++j < se; )
        M[Ee + j] = K[j];
      return M;
    }
    function _d(M, K, j, se) {
      var Ee = -1,
        We = M == null ? 0 : M.length;
      for (se && We && (j = M[++Ee]); ++Ee < We; ) j = K(j, M[Ee], Ee, M);
      return j;
    }
    function yO(M, K, j, se) {
      var Ee = M == null ? 0 : M.length;
      for (se && Ee && (j = M[--Ee]); Ee--; ) j = K(j, M[Ee], Ee, M);
      return j;
    }
    function Od(M, K) {
      for (var j = -1, se = M == null ? 0 : M.length; ++j < se; )
        if (K(M[j], j, M)) return !0;
      return !1;
    }
    var wO = Id("length");
    function xO(M) {
      return M.split("");
    }
    function SO(M) {
      return M.match(T_) || [];
    }
    function Oy(M, K, j) {
      var se;
      return (
        j(M, function (Ee, We, Ot) {
          if (K(Ee, We, Ot)) return (se = We), !1;
        }),
        se
      );
    }
    function Ws(M, K, j, se) {
      for (var Ee = M.length, We = j + (se ? 1 : -1); se ? We-- : ++We < Ee; )
        if (K(M[We], We, M)) return We;
      return -1;
    }
    function Xo(M, K, j) {
      return K === K ? DO(M, K, j) : Ws(M, Iy, j);
    }
    function EO(M, K, j, se) {
      for (var Ee = j - 1, We = M.length; ++Ee < We; )
        if (se(M[Ee], K)) return Ee;
      return -1;
    }
    function Iy(M) {
      return M !== M;
    }
    function Ty(M, K) {
      var j = M == null ? 0 : M.length;
      return j ? Pd(M, K) / j : _;
    }
    function Id(M) {
      return function (K) {
        return K == null ? n : K[M];
      };
    }
    function Td(M) {
      return function (K) {
        return M == null ? n : M[K];
      };
    }
    function Py(M, K, j, se, Ee) {
      return (
        Ee(M, function (We, Ot, et) {
          j = se ? ((se = !1), We) : K(j, We, Ot, et);
        }),
        j
      );
    }
    function CO(M, K) {
      var j = M.length;
      for (M.sort(K); j--; ) M[j] = M[j].value;
      return M;
    }
    function Pd(M, K) {
      for (var j, se = -1, Ee = M.length; ++se < Ee; ) {
        var We = K(M[se]);
        We !== n && (j = j === n ? We : j + We);
      }
      return j;
    }
    function Rd(M, K) {
      for (var j = -1, se = Array(M); ++j < M; ) se[j] = K(j);
      return se;
    }
    function kO(M, K) {
      return ct(K, function (j) {
        return [j, M[j]];
      });
    }
    function Ry(M) {
      return M && M.slice(0, My(M) + 1).replace(vd, "");
    }
    function In(M) {
      return function (K) {
        return M(K);
      };
    }
    function Ad(M, K) {
      return ct(K, function (j) {
        return M[j];
      });
    }
    function fu(M, K) {
      return M.has(K);
    }
    function Ay(M, K) {
      for (var j = -1, se = M.length; ++j < se && Xo(K, M[j], 0) > -1; );
      return j;
    }
    function Dy(M, K) {
      for (var j = M.length; j-- && Xo(K, M[j], 0) > -1; );
      return j;
    }
    function bO(M, K) {
      for (var j = M.length, se = 0; j--; ) M[j] === K && ++se;
      return se;
    }
    var _O = Td(aO),
      OO = Td(cO);
    function IO(M) {
      return "\\" + dO[M];
    }
    function TO(M, K) {
      return M == null ? n : M[K];
    }
    function Zo(M) {
      return oO.test(M);
    }
    function PO(M) {
      return lO.test(M);
    }
    function RO(M) {
      for (var K, j = []; !(K = M.next()).done; ) j.push(K.value);
      return j;
    }
    function Dd(M) {
      var K = -1,
        j = Array(M.size);
      return (
        M.forEach(function (se, Ee) {
          j[++K] = [Ee, se];
        }),
        j
      );
    }
    function Ny(M, K) {
      return function (j) {
        return M(K(j));
      };
    }
    function Ci(M, K) {
      for (var j = -1, se = M.length, Ee = 0, We = []; ++j < se; ) {
        var Ot = M[j];
        (Ot === K || Ot === p) && ((M[j] = p), (We[Ee++] = j));
      }
      return We;
    }
    function Vs(M) {
      var K = -1,
        j = Array(M.size);
      return (
        M.forEach(function (se) {
          j[++K] = se;
        }),
        j
      );
    }
    function AO(M) {
      var K = -1,
        j = Array(M.size);
      return (
        M.forEach(function (se) {
          j[++K] = [se, se];
        }),
        j
      );
    }
    function DO(M, K, j) {
      for (var se = j - 1, Ee = M.length; ++se < Ee; )
        if (M[se] === K) return se;
      return -1;
    }
    function NO(M, K, j) {
      for (var se = j + 1; se--; ) if (M[se] === K) return se;
      return se;
    }
    function Jo(M) {
      return Zo(M) ? LO(M) : wO(M);
    }
    function gr(M) {
      return Zo(M) ? FO(M) : xO(M);
    }
    function My(M) {
      for (var K = M.length; K-- && b_.test(M.charAt(K)); );
      return K;
    }
    var MO = Td(fO);
    function LO(M) {
      for (var K = (Ed.lastIndex = 0); Ed.test(M); ) ++K;
      return K;
    }
    function FO(M) {
      return M.match(Ed) || [];
    }
    function zO(M) {
      return M.match(iO) || [];
    }
    var $O = function M(K) {
        K = K == null ? Ft : el.defaults(Ft.Object(), K, el.pick(Ft, uO));
        var j = K.Array,
          se = K.Date,
          Ee = K.Error,
          We = K.Function,
          Ot = K.Math,
          et = K.Object,
          Nd = K.RegExp,
          BO = K.String,
          Yn = K.TypeError,
          qs = j.prototype,
          UO = We.prototype,
          tl = et.prototype,
          Gs = K["__core-js_shared__"],
          Ks = UO.toString,
          Ke = tl.hasOwnProperty,
          HO = 0,
          Ly = (function () {
            var o = /[^.]+$/.exec((Gs && Gs.keys && Gs.keys.IE_PROTO) || "");
            return o ? "Symbol(src)_1." + o : "";
          })(),
          Qs = tl.toString,
          jO = Ks.call(et),
          WO = Ft._,
          VO = Nd(
            "^" +
              Ks.call(Ke)
                .replace(md, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          Ys = wy ? K.Buffer : n,
          ki = K.Symbol,
          Xs = K.Uint8Array,
          Fy = Ys ? Ys.allocUnsafe : n,
          Zs = Ny(et.getPrototypeOf, et),
          zy = et.create,
          $y = tl.propertyIsEnumerable,
          Js = qs.splice,
          By = ki ? ki.isConcatSpreadable : n,
          du = ki ? ki.iterator : n,
          go = ki ? ki.toStringTag : n,
          ea = (function () {
            try {
              var o = xo(et, "defineProperty");
              return o({}, "", {}), o;
            } catch {}
          })(),
          qO = K.clearTimeout !== Ft.clearTimeout && K.clearTimeout,
          GO = se && se.now !== Ft.Date.now && se.now,
          KO = K.setTimeout !== Ft.setTimeout && K.setTimeout,
          ta = Ot.ceil,
          na = Ot.floor,
          Md = et.getOwnPropertySymbols,
          QO = Ys ? Ys.isBuffer : n,
          Uy = K.isFinite,
          YO = qs.join,
          XO = Ny(et.keys, et),
          It = Ot.max,
          Wt = Ot.min,
          ZO = se.now,
          JO = K.parseInt,
          Hy = Ot.random,
          eI = qs.reverse,
          Ld = xo(K, "DataView"),
          pu = xo(K, "Map"),
          Fd = xo(K, "Promise"),
          nl = xo(K, "Set"),
          hu = xo(K, "WeakMap"),
          gu = xo(et, "create"),
          ra = hu && new hu(),
          rl = {},
          tI = So(Ld),
          nI = So(pu),
          rI = So(Fd),
          iI = So(nl),
          oI = So(hu),
          ia = ki ? ki.prototype : n,
          mu = ia ? ia.valueOf : n,
          jy = ia ? ia.toString : n;
        function C(o) {
          if (wt(o) && !ke(o) && !(o instanceof Le)) {
            if (o instanceof Xn) return o;
            if (Ke.call(o, "__wrapped__")) return W0(o);
          }
          return new Xn(o);
        }
        var il = (function () {
          function o() {}
          return function (u) {
            if (!pt(u)) return {};
            if (zy) return zy(u);
            o.prototype = u;
            var c = new o();
            return (o.prototype = n), c;
          };
        })();
        function oa() {}
        function Xn(o, u) {
          (this.__wrapped__ = o),
            (this.__actions__ = []),
            (this.__chain__ = !!u),
            (this.__index__ = 0),
            (this.__values__ = n);
        }
        (C.templateSettings = {
          escape: w_,
          evaluate: x_,
          interpolate: Zv,
          variable: "",
          imports: { _: C },
        }),
          (C.prototype = oa.prototype),
          (C.prototype.constructor = C),
          (Xn.prototype = il(oa.prototype)),
          (Xn.prototype.constructor = Xn);
        function Le(o) {
          (this.__wrapped__ = o),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = re),
            (this.__views__ = []);
        }
        function lI() {
          var o = new Le(this.__wrapped__);
          return (
            (o.__actions__ = an(this.__actions__)),
            (o.__dir__ = this.__dir__),
            (o.__filtered__ = this.__filtered__),
            (o.__iteratees__ = an(this.__iteratees__)),
            (o.__takeCount__ = this.__takeCount__),
            (o.__views__ = an(this.__views__)),
            o
          );
        }
        function uI() {
          if (this.__filtered__) {
            var o = new Le(this);
            (o.__dir__ = -1), (o.__filtered__ = !0);
          } else (o = this.clone()), (o.__dir__ *= -1);
          return o;
        }
        function sI() {
          var o = this.__wrapped__.value(),
            u = this.__dir__,
            c = ke(o),
            h = u < 0,
            x = c ? o.length : 0,
            b = xT(0, x, this.__views__),
            P = b.start,
            N = b.end,
            L = N - P,
            Y = h ? N : P - 1,
            X = this.__iteratees__,
            ee = X.length,
            le = 0,
            fe = Wt(L, this.__takeCount__);
          if (!c || (!h && x == L && fe == L)) return p0(o, this.__actions__);
          var ve = [];
          e: for (; L-- && le < fe; ) {
            Y += u;
            for (var Te = -1, ye = o[Y]; ++Te < ee; ) {
              var Ne = X[Te],
                $e = Ne.iteratee,
                Rn = Ne.type,
                nn = $e(ye);
              if (Rn == J) ye = nn;
              else if (!nn) {
                if (Rn == U) continue e;
                break e;
              }
            }
            ve[le++] = ye;
          }
          return ve;
        }
        (Le.prototype = il(oa.prototype)), (Le.prototype.constructor = Le);
        function mo(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.clear(); ++u < c; ) {
            var h = o[u];
            this.set(h[0], h[1]);
          }
        }
        function aI() {
          (this.__data__ = gu ? gu(null) : {}), (this.size = 0);
        }
        function cI(o) {
          var u = this.has(o) && delete this.__data__[o];
          return (this.size -= u ? 1 : 0), u;
        }
        function fI(o) {
          var u = this.__data__;
          if (gu) {
            var c = u[o];
            return c === f ? n : c;
          }
          return Ke.call(u, o) ? u[o] : n;
        }
        function dI(o) {
          var u = this.__data__;
          return gu ? u[o] !== n : Ke.call(u, o);
        }
        function pI(o, u) {
          var c = this.__data__;
          return (
            (this.size += this.has(o) ? 0 : 1),
            (c[o] = gu && u === n ? f : u),
            this
          );
        }
        (mo.prototype.clear = aI),
          (mo.prototype.delete = cI),
          (mo.prototype.get = fI),
          (mo.prototype.has = dI),
          (mo.prototype.set = pI);
        function Yr(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.clear(); ++u < c; ) {
            var h = o[u];
            this.set(h[0], h[1]);
          }
        }
        function hI() {
          (this.__data__ = []), (this.size = 0);
        }
        function gI(o) {
          var u = this.__data__,
            c = la(u, o);
          if (c < 0) return !1;
          var h = u.length - 1;
          return c == h ? u.pop() : Js.call(u, c, 1), --this.size, !0;
        }
        function mI(o) {
          var u = this.__data__,
            c = la(u, o);
          return c < 0 ? n : u[c][1];
        }
        function vI(o) {
          return la(this.__data__, o) > -1;
        }
        function yI(o, u) {
          var c = this.__data__,
            h = la(c, o);
          return h < 0 ? (++this.size, c.push([o, u])) : (c[h][1] = u), this;
        }
        (Yr.prototype.clear = hI),
          (Yr.prototype.delete = gI),
          (Yr.prototype.get = mI),
          (Yr.prototype.has = vI),
          (Yr.prototype.set = yI);
        function Xr(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.clear(); ++u < c; ) {
            var h = o[u];
            this.set(h[0], h[1]);
          }
        }
        function wI() {
          (this.size = 0),
            (this.__data__ = {
              hash: new mo(),
              map: new (pu || Yr)(),
              string: new mo(),
            });
        }
        function xI(o) {
          var u = ya(this, o).delete(o);
          return (this.size -= u ? 1 : 0), u;
        }
        function SI(o) {
          return ya(this, o).get(o);
        }
        function EI(o) {
          return ya(this, o).has(o);
        }
        function CI(o, u) {
          var c = ya(this, o),
            h = c.size;
          return c.set(o, u), (this.size += c.size == h ? 0 : 1), this;
        }
        (Xr.prototype.clear = wI),
          (Xr.prototype.delete = xI),
          (Xr.prototype.get = SI),
          (Xr.prototype.has = EI),
          (Xr.prototype.set = CI);
        function vo(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.__data__ = new Xr(); ++u < c; ) this.add(o[u]);
        }
        function kI(o) {
          return this.__data__.set(o, f), this;
        }
        function bI(o) {
          return this.__data__.has(o);
        }
        (vo.prototype.add = vo.prototype.push = kI), (vo.prototype.has = bI);
        function mr(o) {
          var u = (this.__data__ = new Yr(o));
          this.size = u.size;
        }
        function _I() {
          (this.__data__ = new Yr()), (this.size = 0);
        }
        function OI(o) {
          var u = this.__data__,
            c = u.delete(o);
          return (this.size = u.size), c;
        }
        function II(o) {
          return this.__data__.get(o);
        }
        function TI(o) {
          return this.__data__.has(o);
        }
        function PI(o, u) {
          var c = this.__data__;
          if (c instanceof Yr) {
            var h = c.__data__;
            if (!pu || h.length < i - 1)
              return h.push([o, u]), (this.size = ++c.size), this;
            c = this.__data__ = new Xr(h);
          }
          return c.set(o, u), (this.size = c.size), this;
        }
        (mr.prototype.clear = _I),
          (mr.prototype.delete = OI),
          (mr.prototype.get = II),
          (mr.prototype.has = TI),
          (mr.prototype.set = PI);
        function Wy(o, u) {
          var c = ke(o),
            h = !c && Eo(o),
            x = !c && !h && Ti(o),
            b = !c && !h && !x && sl(o),
            P = c || h || x || b,
            N = P ? Rd(o.length, BO) : [],
            L = N.length;
          for (var Y in o)
            (u || Ke.call(o, Y)) &&
              !(
                P &&
                (Y == "length" ||
                  (x && (Y == "offset" || Y == "parent")) ||
                  (b &&
                    (Y == "buffer" ||
                      Y == "byteLength" ||
                      Y == "byteOffset")) ||
                  ti(Y, L))
              ) &&
              N.push(Y);
          return N;
        }
        function Vy(o) {
          var u = o.length;
          return u ? o[Kd(0, u - 1)] : n;
        }
        function RI(o, u) {
          return wa(an(o), yo(u, 0, o.length));
        }
        function AI(o) {
          return wa(an(o));
        }
        function zd(o, u, c) {
          ((c !== n && !vr(o[u], c)) || (c === n && !(u in o))) && Zr(o, u, c);
        }
        function vu(o, u, c) {
          var h = o[u];
          (!(Ke.call(o, u) && vr(h, c)) || (c === n && !(u in o))) &&
            Zr(o, u, c);
        }
        function la(o, u) {
          for (var c = o.length; c--; ) if (vr(o[c][0], u)) return c;
          return -1;
        }
        function DI(o, u, c, h) {
          return (
            bi(o, function (x, b, P) {
              u(h, x, c(x), P);
            }),
            h
          );
        }
        function qy(o, u) {
          return o && Ar(u, Rt(u), o);
        }
        function NI(o, u) {
          return o && Ar(u, fn(u), o);
        }
        function Zr(o, u, c) {
          u == "__proto__" && ea
            ? ea(o, u, {
                configurable: !0,
                enumerable: !0,
                value: c,
                writable: !0,
              })
            : (o[u] = c);
        }
        function $d(o, u) {
          for (var c = -1, h = u.length, x = j(h), b = o == null; ++c < h; )
            x[c] = b ? n : wp(o, u[c]);
          return x;
        }
        function yo(o, u, c) {
          return (
            o === o &&
              (c !== n && (o = o <= c ? o : c),
              u !== n && (o = o >= u ? o : u)),
            o
          );
        }
        function Zn(o, u, c, h, x, b) {
          var P,
            N = u & g,
            L = u & v,
            Y = u & m;
          if ((c && (P = x ? c(o, h, x, b) : c(o)), P !== n)) return P;
          if (!pt(o)) return o;
          var X = ke(o);
          if (X) {
            if (((P = ET(o)), !N)) return an(o, P);
          } else {
            var ee = Vt(o),
              le = ee == ze || ee == Ge;
            if (Ti(o)) return m0(o, N);
            if (ee == at || ee == Pe || (le && !x)) {
              if (((P = L || le ? {} : M0(o)), !N))
                return L ? fT(o, NI(P, o)) : cT(o, qy(P, o));
            } else {
              if (!tt[ee]) return x ? o : {};
              P = CT(o, ee, N);
            }
          }
          b || (b = new mr());
          var fe = b.get(o);
          if (fe) return fe;
          b.set(o, P),
            c1(o)
              ? o.forEach(function (ye) {
                  P.add(Zn(ye, u, c, ye, o, b));
                })
              : s1(o) &&
                o.forEach(function (ye, Ne) {
                  P.set(Ne, Zn(ye, u, c, Ne, o, b));
                });
          var ve = Y ? (L ? op : ip) : L ? fn : Rt,
            Te = X ? n : ve(o);
          return (
            Qn(Te || o, function (ye, Ne) {
              Te && ((Ne = ye), (ye = o[Ne])),
                vu(P, Ne, Zn(ye, u, c, Ne, o, b));
            }),
            P
          );
        }
        function MI(o) {
          var u = Rt(o);
          return function (c) {
            return Gy(c, o, u);
          };
        }
        function Gy(o, u, c) {
          var h = c.length;
          if (o == null) return !h;
          for (o = et(o); h--; ) {
            var x = c[h],
              b = u[x],
              P = o[x];
            if ((P === n && !(x in o)) || !b(P)) return !1;
          }
          return !0;
        }
        function Ky(o, u, c) {
          if (typeof o != "function") throw new Yn(s);
          return ku(function () {
            o.apply(n, c);
          }, u);
        }
        function yu(o, u, c, h) {
          var x = -1,
            b = js,
            P = !0,
            N = o.length,
            L = [],
            Y = u.length;
          if (!N) return L;
          c && (u = ct(u, In(c))),
            h
              ? ((b = bd), (P = !1))
              : u.length >= i && ((b = fu), (P = !1), (u = new vo(u)));
          e: for (; ++x < N; ) {
            var X = o[x],
              ee = c == null ? X : c(X);
            if (((X = h || X !== 0 ? X : 0), P && ee === ee)) {
              for (var le = Y; le--; ) if (u[le] === ee) continue e;
              L.push(X);
            } else b(u, ee, h) || L.push(X);
          }
          return L;
        }
        var bi = S0(Rr),
          Qy = S0(Ud, !0);
        function LI(o, u) {
          var c = !0;
          return (
            bi(o, function (h, x, b) {
              return (c = !!u(h, x, b)), c;
            }),
            c
          );
        }
        function ua(o, u, c) {
          for (var h = -1, x = o.length; ++h < x; ) {
            var b = o[h],
              P = u(b);
            if (P != null && (N === n ? P === P && !Pn(P) : c(P, N)))
              var N = P,
                L = b;
          }
          return L;
        }
        function FI(o, u, c, h) {
          var x = o.length;
          for (
            c = Oe(c),
              c < 0 && (c = -c > x ? 0 : x + c),
              h = h === n || h > x ? x : Oe(h),
              h < 0 && (h += x),
              h = c > h ? 0 : d1(h);
            c < h;

          )
            o[c++] = u;
          return o;
        }
        function Yy(o, u) {
          var c = [];
          return (
            bi(o, function (h, x, b) {
              u(h, x, b) && c.push(h);
            }),
            c
          );
        }
        function zt(o, u, c, h, x) {
          var b = -1,
            P = o.length;
          for (c || (c = bT), x || (x = []); ++b < P; ) {
            var N = o[b];
            u > 0 && c(N)
              ? u > 1
                ? zt(N, u - 1, c, h, x)
                : Ei(x, N)
              : h || (x[x.length] = N);
          }
          return x;
        }
        var Bd = E0(),
          Xy = E0(!0);
        function Rr(o, u) {
          return o && Bd(o, u, Rt);
        }
        function Ud(o, u) {
          return o && Xy(o, u, Rt);
        }
        function sa(o, u) {
          return Si(u, function (c) {
            return ni(o[c]);
          });
        }
        function wo(o, u) {
          u = Oi(u, o);
          for (var c = 0, h = u.length; o != null && c < h; ) o = o[Dr(u[c++])];
          return c && c == h ? o : n;
        }
        function Zy(o, u, c) {
          var h = u(o);
          return ke(o) ? h : Ei(h, c(o));
        }
        function en(o) {
          return o == null
            ? o === n
              ? Qo
              : he
            : go && go in et(o)
            ? wT(o)
            : AT(o);
        }
        function Hd(o, u) {
          return o > u;
        }
        function zI(o, u) {
          return o != null && Ke.call(o, u);
        }
        function $I(o, u) {
          return o != null && u in et(o);
        }
        function BI(o, u, c) {
          return o >= Wt(u, c) && o < It(u, c);
        }
        function jd(o, u, c) {
          for (
            var h = c ? bd : js,
              x = o[0].length,
              b = o.length,
              P = b,
              N = j(b),
              L = 1 / 0,
              Y = [];
            P--;

          ) {
            var X = o[P];
            P && u && (X = ct(X, In(u))),
              (L = Wt(X.length, L)),
              (N[P] =
                !c && (u || (x >= 120 && X.length >= 120))
                  ? new vo(P && X)
                  : n);
          }
          X = o[0];
          var ee = -1,
            le = N[0];
          e: for (; ++ee < x && Y.length < L; ) {
            var fe = X[ee],
              ve = u ? u(fe) : fe;
            if (
              ((fe = c || fe !== 0 ? fe : 0), !(le ? fu(le, ve) : h(Y, ve, c)))
            ) {
              for (P = b; --P; ) {
                var Te = N[P];
                if (!(Te ? fu(Te, ve) : h(o[P], ve, c))) continue e;
              }
              le && le.push(ve), Y.push(fe);
            }
          }
          return Y;
        }
        function UI(o, u, c, h) {
          return (
            Rr(o, function (x, b, P) {
              u(h, c(x), b, P);
            }),
            h
          );
        }
        function wu(o, u, c) {
          (u = Oi(u, o)), (o = $0(o, u));
          var h = o == null ? o : o[Dr(er(u))];
          return h == null ? n : On(h, o, c);
        }
        function Jy(o) {
          return wt(o) && en(o) == Pe;
        }
        function HI(o) {
          return wt(o) && en(o) == V;
        }
        function jI(o) {
          return wt(o) && en(o) == Fe;
        }
        function xu(o, u, c, h, x) {
          return o === u
            ? !0
            : o == null || u == null || (!wt(o) && !wt(u))
            ? o !== o && u !== u
            : WI(o, u, c, h, xu, x);
        }
        function WI(o, u, c, h, x, b) {
          var P = ke(o),
            N = ke(u),
            L = P ? me : Vt(o),
            Y = N ? me : Vt(u);
          (L = L == Pe ? at : L), (Y = Y == Pe ? at : Y);
          var X = L == at,
            ee = Y == at,
            le = L == Y;
          if (le && Ti(o)) {
            if (!Ti(u)) return !1;
            (P = !0), (X = !1);
          }
          if (le && !X)
            return (
              b || (b = new mr()),
              P || sl(o) ? A0(o, u, c, h, x, b) : vT(o, u, L, c, h, x, b)
            );
          if (!(c & E)) {
            var fe = X && Ke.call(o, "__wrapped__"),
              ve = ee && Ke.call(u, "__wrapped__");
            if (fe || ve) {
              var Te = fe ? o.value() : o,
                ye = ve ? u.value() : u;
              return b || (b = new mr()), x(Te, ye, c, h, b);
            }
          }
          return le ? (b || (b = new mr()), yT(o, u, c, h, x, b)) : !1;
        }
        function VI(o) {
          return wt(o) && Vt(o) == yt;
        }
        function Wd(o, u, c, h) {
          var x = c.length,
            b = x,
            P = !h;
          if (o == null) return !b;
          for (o = et(o); x--; ) {
            var N = c[x];
            if (P && N[2] ? N[1] !== o[N[0]] : !(N[0] in o)) return !1;
          }
          for (; ++x < b; ) {
            N = c[x];
            var L = N[0],
              Y = o[L],
              X = N[1];
            if (P && N[2]) {
              if (Y === n && !(L in o)) return !1;
            } else {
              var ee = new mr();
              if (h) var le = h(Y, X, L, o, u, ee);
              if (!(le === n ? xu(X, Y, E | S, h, ee) : le)) return !1;
            }
          }
          return !0;
        }
        function e0(o) {
          if (!pt(o) || OT(o)) return !1;
          var u = ni(o) ? VO : M_;
          return u.test(So(o));
        }
        function qI(o) {
          return wt(o) && en(o) == bn;
        }
        function GI(o) {
          return wt(o) && Vt(o) == jt;
        }
        function KI(o) {
          return wt(o) && ba(o.length) && !!lt[en(o)];
        }
        function t0(o) {
          return typeof o == "function"
            ? o
            : o == null
            ? dn
            : typeof o == "object"
            ? ke(o)
              ? i0(o[0], o[1])
              : r0(o)
            : C1(o);
        }
        function Vd(o) {
          if (!Cu(o)) return XO(o);
          var u = [];
          for (var c in et(o)) Ke.call(o, c) && c != "constructor" && u.push(c);
          return u;
        }
        function QI(o) {
          if (!pt(o)) return RT(o);
          var u = Cu(o),
            c = [];
          for (var h in o)
            (h == "constructor" && (u || !Ke.call(o, h))) || c.push(h);
          return c;
        }
        function qd(o, u) {
          return o < u;
        }
        function n0(o, u) {
          var c = -1,
            h = cn(o) ? j(o.length) : [];
          return (
            bi(o, function (x, b, P) {
              h[++c] = u(x, b, P);
            }),
            h
          );
        }
        function r0(o) {
          var u = up(o);
          return u.length == 1 && u[0][2]
            ? F0(u[0][0], u[0][1])
            : function (c) {
                return c === o || Wd(c, o, u);
              };
        }
        function i0(o, u) {
          return ap(o) && L0(u)
            ? F0(Dr(o), u)
            : function (c) {
                var h = wp(c, o);
                return h === n && h === u ? xp(c, o) : xu(u, h, E | S);
              };
        }
        function aa(o, u, c, h, x) {
          o !== u &&
            Bd(
              u,
              function (b, P) {
                if ((x || (x = new mr()), pt(b))) YI(o, u, P, c, aa, h, x);
                else {
                  var N = h ? h(fp(o, P), b, P + "", o, u, x) : n;
                  N === n && (N = b), zd(o, P, N);
                }
              },
              fn
            );
        }
        function YI(o, u, c, h, x, b, P) {
          var N = fp(o, c),
            L = fp(u, c),
            Y = P.get(L);
          if (Y) {
            zd(o, c, Y);
            return;
          }
          var X = b ? b(N, L, c + "", o, u, P) : n,
            ee = X === n;
          if (ee) {
            var le = ke(L),
              fe = !le && Ti(L),
              ve = !le && !fe && sl(L);
            (X = L),
              le || fe || ve
                ? ke(N)
                  ? (X = N)
                  : Et(N)
                  ? (X = an(N))
                  : fe
                  ? ((ee = !1), (X = m0(L, !0)))
                  : ve
                  ? ((ee = !1), (X = v0(L, !0)))
                  : (X = [])
                : bu(L) || Eo(L)
                ? ((X = N),
                  Eo(N) ? (X = p1(N)) : (!pt(N) || ni(N)) && (X = M0(L)))
                : (ee = !1);
          }
          ee && (P.set(L, X), x(X, L, h, b, P), P.delete(L)), zd(o, c, X);
        }
        function o0(o, u) {
          var c = o.length;
          if (c) return (u += u < 0 ? c : 0), ti(u, c) ? o[u] : n;
        }
        function l0(o, u, c) {
          u.length
            ? (u = ct(u, function (b) {
                return ke(b)
                  ? function (P) {
                      return wo(P, b.length === 1 ? b[0] : b);
                    }
                  : b;
              }))
            : (u = [dn]);
          var h = -1;
          u = ct(u, In(ge()));
          var x = n0(o, function (b, P, N) {
            var L = ct(u, function (Y) {
              return Y(b);
            });
            return { criteria: L, index: ++h, value: b };
          });
          return CO(x, function (b, P) {
            return aT(b, P, c);
          });
        }
        function XI(o, u) {
          return u0(o, u, function (c, h) {
            return xp(o, h);
          });
        }
        function u0(o, u, c) {
          for (var h = -1, x = u.length, b = {}; ++h < x; ) {
            var P = u[h],
              N = wo(o, P);
            c(N, P) && Su(b, Oi(P, o), N);
          }
          return b;
        }
        function ZI(o) {
          return function (u) {
            return wo(u, o);
          };
        }
        function Gd(o, u, c, h) {
          var x = h ? EO : Xo,
            b = -1,
            P = u.length,
            N = o;
          for (o === u && (u = an(u)), c && (N = ct(o, In(c))); ++b < P; )
            for (
              var L = 0, Y = u[b], X = c ? c(Y) : Y;
              (L = x(N, X, L, h)) > -1;

            )
              N !== o && Js.call(N, L, 1), Js.call(o, L, 1);
          return o;
        }
        function s0(o, u) {
          for (var c = o ? u.length : 0, h = c - 1; c--; ) {
            var x = u[c];
            if (c == h || x !== b) {
              var b = x;
              ti(x) ? Js.call(o, x, 1) : Xd(o, x);
            }
          }
          return o;
        }
        function Kd(o, u) {
          return o + na(Hy() * (u - o + 1));
        }
        function JI(o, u, c, h) {
          for (var x = -1, b = It(ta((u - o) / (c || 1)), 0), P = j(b); b--; )
            (P[h ? b : ++x] = o), (o += c);
          return P;
        }
        function Qd(o, u) {
          var c = "";
          if (!o || u < 1 || u > H) return c;
          do u % 2 && (c += o), (u = na(u / 2)), u && (o += o);
          while (u);
          return c;
        }
        function Re(o, u) {
          return dp(z0(o, u, dn), o + "");
        }
        function eT(o) {
          return Vy(al(o));
        }
        function tT(o, u) {
          var c = al(o);
          return wa(c, yo(u, 0, c.length));
        }
        function Su(o, u, c, h) {
          if (!pt(o)) return o;
          u = Oi(u, o);
          for (
            var x = -1, b = u.length, P = b - 1, N = o;
            N != null && ++x < b;

          ) {
            var L = Dr(u[x]),
              Y = c;
            if (L === "__proto__" || L === "constructor" || L === "prototype")
              return o;
            if (x != P) {
              var X = N[L];
              (Y = h ? h(X, L, N) : n),
                Y === n && (Y = pt(X) ? X : ti(u[x + 1]) ? [] : {});
            }
            vu(N, L, Y), (N = N[L]);
          }
          return o;
        }
        var a0 = ra
            ? function (o, u) {
                return ra.set(o, u), o;
              }
            : dn,
          nT = ea
            ? function (o, u) {
                return ea(o, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value: Ep(u),
                  writable: !0,
                });
              }
            : dn;
        function rT(o) {
          return wa(al(o));
        }
        function Jn(o, u, c) {
          var h = -1,
            x = o.length;
          u < 0 && (u = -u > x ? 0 : x + u),
            (c = c > x ? x : c),
            c < 0 && (c += x),
            (x = u > c ? 0 : (c - u) >>> 0),
            (u >>>= 0);
          for (var b = j(x); ++h < x; ) b[h] = o[h + u];
          return b;
        }
        function iT(o, u) {
          var c;
          return (
            bi(o, function (h, x, b) {
              return (c = u(h, x, b)), !c;
            }),
            !!c
          );
        }
        function ca(o, u, c) {
          var h = 0,
            x = o == null ? h : o.length;
          if (typeof u == "number" && u === u && x <= O) {
            for (; h < x; ) {
              var b = (h + x) >>> 1,
                P = o[b];
              P !== null && !Pn(P) && (c ? P <= u : P < u)
                ? (h = b + 1)
                : (x = b);
            }
            return x;
          }
          return Yd(o, u, dn, c);
        }
        function Yd(o, u, c, h) {
          var x = 0,
            b = o == null ? 0 : o.length;
          if (b === 0) return 0;
          u = c(u);
          for (
            var P = u !== u, N = u === null, L = Pn(u), Y = u === n;
            x < b;

          ) {
            var X = na((x + b) / 2),
              ee = c(o[X]),
              le = ee !== n,
              fe = ee === null,
              ve = ee === ee,
              Te = Pn(ee);
            if (P) var ye = h || ve;
            else
              Y
                ? (ye = ve && (h || le))
                : N
                ? (ye = ve && le && (h || !fe))
                : L
                ? (ye = ve && le && !fe && (h || !Te))
                : fe || Te
                ? (ye = !1)
                : (ye = h ? ee <= u : ee < u);
            ye ? (x = X + 1) : (b = X);
          }
          return Wt(b, ae);
        }
        function c0(o, u) {
          for (var c = -1, h = o.length, x = 0, b = []; ++c < h; ) {
            var P = o[c],
              N = u ? u(P) : P;
            if (!c || !vr(N, L)) {
              var L = N;
              b[x++] = P === 0 ? 0 : P;
            }
          }
          return b;
        }
        function f0(o) {
          return typeof o == "number" ? o : Pn(o) ? _ : +o;
        }
        function Tn(o) {
          if (typeof o == "string") return o;
          if (ke(o)) return ct(o, Tn) + "";
          if (Pn(o)) return jy ? jy.call(o) : "";
          var u = o + "";
          return u == "0" && 1 / o == -ne ? "-0" : u;
        }
        function _i(o, u, c) {
          var h = -1,
            x = js,
            b = o.length,
            P = !0,
            N = [],
            L = N;
          if (c) (P = !1), (x = bd);
          else if (b >= i) {
            var Y = u ? null : gT(o);
            if (Y) return Vs(Y);
            (P = !1), (x = fu), (L = new vo());
          } else L = u ? [] : N;
          e: for (; ++h < b; ) {
            var X = o[h],
              ee = u ? u(X) : X;
            if (((X = c || X !== 0 ? X : 0), P && ee === ee)) {
              for (var le = L.length; le--; ) if (L[le] === ee) continue e;
              u && L.push(ee), N.push(X);
            } else x(L, ee, c) || (L !== N && L.push(ee), N.push(X));
          }
          return N;
        }
        function Xd(o, u) {
          return (
            (u = Oi(u, o)), (o = $0(o, u)), o == null || delete o[Dr(er(u))]
          );
        }
        function d0(o, u, c, h) {
          return Su(o, u, c(wo(o, u)), h);
        }
        function fa(o, u, c, h) {
          for (
            var x = o.length, b = h ? x : -1;
            (h ? b-- : ++b < x) && u(o[b], b, o);

          );
          return c
            ? Jn(o, h ? 0 : b, h ? b + 1 : x)
            : Jn(o, h ? b + 1 : 0, h ? x : b);
        }
        function p0(o, u) {
          var c = o;
          return (
            c instanceof Le && (c = c.value()),
            _d(
              u,
              function (h, x) {
                return x.func.apply(x.thisArg, Ei([h], x.args));
              },
              c
            )
          );
        }
        function Zd(o, u, c) {
          var h = o.length;
          if (h < 2) return h ? _i(o[0]) : [];
          for (var x = -1, b = j(h); ++x < h; )
            for (var P = o[x], N = -1; ++N < h; )
              N != x && (b[x] = yu(b[x] || P, o[N], u, c));
          return _i(zt(b, 1), u, c);
        }
        function h0(o, u, c) {
          for (var h = -1, x = o.length, b = u.length, P = {}; ++h < x; ) {
            var N = h < b ? u[h] : n;
            c(P, o[h], N);
          }
          return P;
        }
        function Jd(o) {
          return Et(o) ? o : [];
        }
        function ep(o) {
          return typeof o == "function" ? o : dn;
        }
        function Oi(o, u) {
          return ke(o) ? o : ap(o, u) ? [o] : j0(qe(o));
        }
        var oT = Re;
        function Ii(o, u, c) {
          var h = o.length;
          return (c = c === n ? h : c), !u && c >= h ? o : Jn(o, u, c);
        }
        var g0 =
          qO ||
          function (o) {
            return Ft.clearTimeout(o);
          };
        function m0(o, u) {
          if (u) return o.slice();
          var c = o.length,
            h = Fy ? Fy(c) : new o.constructor(c);
          return o.copy(h), h;
        }
        function tp(o) {
          var u = new o.constructor(o.byteLength);
          return new Xs(u).set(new Xs(o)), u;
        }
        function lT(o, u) {
          var c = u ? tp(o.buffer) : o.buffer;
          return new o.constructor(c, o.byteOffset, o.byteLength);
        }
        function uT(o) {
          var u = new o.constructor(o.source, Jv.exec(o));
          return (u.lastIndex = o.lastIndex), u;
        }
        function sT(o) {
          return mu ? et(mu.call(o)) : {};
        }
        function v0(o, u) {
          var c = u ? tp(o.buffer) : o.buffer;
          return new o.constructor(c, o.byteOffset, o.length);
        }
        function y0(o, u) {
          if (o !== u) {
            var c = o !== n,
              h = o === null,
              x = o === o,
              b = Pn(o),
              P = u !== n,
              N = u === null,
              L = u === u,
              Y = Pn(u);
            if (
              (!N && !Y && !b && o > u) ||
              (b && P && L && !N && !Y) ||
              (h && P && L) ||
              (!c && L) ||
              !x
            )
              return 1;
            if (
              (!h && !b && !Y && o < u) ||
              (Y && c && x && !h && !b) ||
              (N && c && x) ||
              (!P && x) ||
              !L
            )
              return -1;
          }
          return 0;
        }
        function aT(o, u, c) {
          for (
            var h = -1,
              x = o.criteria,
              b = u.criteria,
              P = x.length,
              N = c.length;
            ++h < P;

          ) {
            var L = y0(x[h], b[h]);
            if (L) {
              if (h >= N) return L;
              var Y = c[h];
              return L * (Y == "desc" ? -1 : 1);
            }
          }
          return o.index - u.index;
        }
        function w0(o, u, c, h) {
          for (
            var x = -1,
              b = o.length,
              P = c.length,
              N = -1,
              L = u.length,
              Y = It(b - P, 0),
              X = j(L + Y),
              ee = !h;
            ++N < L;

          )
            X[N] = u[N];
          for (; ++x < P; ) (ee || x < b) && (X[c[x]] = o[x]);
          for (; Y--; ) X[N++] = o[x++];
          return X;
        }
        function x0(o, u, c, h) {
          for (
            var x = -1,
              b = o.length,
              P = -1,
              N = c.length,
              L = -1,
              Y = u.length,
              X = It(b - N, 0),
              ee = j(X + Y),
              le = !h;
            ++x < X;

          )
            ee[x] = o[x];
          for (var fe = x; ++L < Y; ) ee[fe + L] = u[L];
          for (; ++P < N; ) (le || x < b) && (ee[fe + c[P]] = o[x++]);
          return ee;
        }
        function an(o, u) {
          var c = -1,
            h = o.length;
          for (u || (u = j(h)); ++c < h; ) u[c] = o[c];
          return u;
        }
        function Ar(o, u, c, h) {
          var x = !c;
          c || (c = {});
          for (var b = -1, P = u.length; ++b < P; ) {
            var N = u[b],
              L = h ? h(c[N], o[N], N, c, o) : n;
            L === n && (L = o[N]), x ? Zr(c, N, L) : vu(c, N, L);
          }
          return c;
        }
        function cT(o, u) {
          return Ar(o, sp(o), u);
        }
        function fT(o, u) {
          return Ar(o, D0(o), u);
        }
        function da(o, u) {
          return function (c, h) {
            var x = ke(c) ? mO : DI,
              b = u ? u() : {};
            return x(c, o, ge(h, 2), b);
          };
        }
        function ol(o) {
          return Re(function (u, c) {
            var h = -1,
              x = c.length,
              b = x > 1 ? c[x - 1] : n,
              P = x > 2 ? c[2] : n;
            for (
              b = o.length > 3 && typeof b == "function" ? (x--, b) : n,
                P && tn(c[0], c[1], P) && ((b = x < 3 ? n : b), (x = 1)),
                u = et(u);
              ++h < x;

            ) {
              var N = c[h];
              N && o(u, N, h, b);
            }
            return u;
          });
        }
        function S0(o, u) {
          return function (c, h) {
            if (c == null) return c;
            if (!cn(c)) return o(c, h);
            for (
              var x = c.length, b = u ? x : -1, P = et(c);
              (u ? b-- : ++b < x) && h(P[b], b, P) !== !1;

            );
            return c;
          };
        }
        function E0(o) {
          return function (u, c, h) {
            for (var x = -1, b = et(u), P = h(u), N = P.length; N--; ) {
              var L = P[o ? N : ++x];
              if (c(b[L], L, b) === !1) break;
            }
            return u;
          };
        }
        function dT(o, u, c) {
          var h = u & A,
            x = Eu(o);
          function b() {
            var P = this && this !== Ft && this instanceof b ? x : o;
            return P.apply(h ? c : this, arguments);
          }
          return b;
        }
        function C0(o) {
          return function (u) {
            u = qe(u);
            var c = Zo(u) ? gr(u) : n,
              h = c ? c[0] : u.charAt(0),
              x = c ? Ii(c, 1).join("") : u.slice(1);
            return h[o]() + x;
          };
        }
        function ll(o) {
          return function (u) {
            return _d(S1(x1(u).replace(nO, "")), o, "");
          };
        }
        function Eu(o) {
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
            var c = il(o.prototype),
              h = o.apply(c, u);
            return pt(h) ? h : c;
          };
        }
        function pT(o, u, c) {
          var h = Eu(o);
          function x() {
            for (var b = arguments.length, P = j(b), N = b, L = ul(x); N--; )
              P[N] = arguments[N];
            var Y = b < 3 && P[0] !== L && P[b - 1] !== L ? [] : Ci(P, L);
            if (((b -= Y.length), b < c))
              return I0(o, u, pa, x.placeholder, n, P, Y, n, n, c - b);
            var X = this && this !== Ft && this instanceof x ? h : o;
            return On(X, this, P);
          }
          return x;
        }
        function k0(o) {
          return function (u, c, h) {
            var x = et(u);
            if (!cn(u)) {
              var b = ge(c, 3);
              (u = Rt(u)),
                (c = function (N) {
                  return b(x[N], N, x);
                });
            }
            var P = o(u, c, h);
            return P > -1 ? x[b ? u[P] : P] : n;
          };
        }
        function b0(o) {
          return ei(function (u) {
            var c = u.length,
              h = c,
              x = Xn.prototype.thru;
            for (o && u.reverse(); h--; ) {
              var b = u[h];
              if (typeof b != "function") throw new Yn(s);
              if (x && !P && va(b) == "wrapper") var P = new Xn([], !0);
            }
            for (h = P ? h : c; ++h < c; ) {
              b = u[h];
              var N = va(b),
                L = N == "wrapper" ? lp(b) : n;
              L &&
              cp(L[0]) &&
              L[1] == (F | k | D | z) &&
              !L[4].length &&
              L[9] == 1
                ? (P = P[va(L[0])].apply(P, L[3]))
                : (P = b.length == 1 && cp(b) ? P[N]() : P.thru(b));
            }
            return function () {
              var Y = arguments,
                X = Y[0];
              if (P && Y.length == 1 && ke(X)) return P.plant(X).value();
              for (var ee = 0, le = c ? u[ee].apply(this, Y) : X; ++ee < c; )
                le = u[ee].call(this, le);
              return le;
            };
          });
        }
        function pa(o, u, c, h, x, b, P, N, L, Y) {
          var X = u & F,
            ee = u & A,
            le = u & y,
            fe = u & (k | R),
            ve = u & q,
            Te = le ? n : Eu(o);
          function ye() {
            for (var Ne = arguments.length, $e = j(Ne), Rn = Ne; Rn--; )
              $e[Rn] = arguments[Rn];
            if (fe)
              var nn = ul(ye),
                An = bO($e, nn);
            if (
              (h && ($e = w0($e, h, x, fe)),
              b && ($e = x0($e, b, P, fe)),
              (Ne -= An),
              fe && Ne < Y)
            ) {
              var Ct = Ci($e, nn);
              return I0(o, u, pa, ye.placeholder, c, $e, Ct, N, L, Y - Ne);
            }
            var yr = ee ? c : this,
              ii = le ? yr[o] : o;
            return (
              (Ne = $e.length),
              N ? ($e = DT($e, N)) : ve && Ne > 1 && $e.reverse(),
              X && L < Ne && ($e.length = L),
              this && this !== Ft && this instanceof ye && (ii = Te || Eu(ii)),
              ii.apply(yr, $e)
            );
          }
          return ye;
        }
        function _0(o, u) {
          return function (c, h) {
            return UI(c, o, u(h), {});
          };
        }
        function ha(o, u) {
          return function (c, h) {
            var x;
            if (c === n && h === n) return u;
            if ((c !== n && (x = c), h !== n)) {
              if (x === n) return h;
              typeof c == "string" || typeof h == "string"
                ? ((c = Tn(c)), (h = Tn(h)))
                : ((c = f0(c)), (h = f0(h))),
                (x = o(c, h));
            }
            return x;
          };
        }
        function np(o) {
          return ei(function (u) {
            return (
              (u = ct(u, In(ge()))),
              Re(function (c) {
                var h = this;
                return o(u, function (x) {
                  return On(x, h, c);
                });
              })
            );
          });
        }
        function ga(o, u) {
          u = u === n ? " " : Tn(u);
          var c = u.length;
          if (c < 2) return c ? Qd(u, o) : u;
          var h = Qd(u, ta(o / Jo(u)));
          return Zo(u) ? Ii(gr(h), 0, o).join("") : h.slice(0, o);
        }
        function hT(o, u, c, h) {
          var x = u & A,
            b = Eu(o);
          function P() {
            for (
              var N = -1,
                L = arguments.length,
                Y = -1,
                X = h.length,
                ee = j(X + L),
                le = this && this !== Ft && this instanceof P ? b : o;
              ++Y < X;

            )
              ee[Y] = h[Y];
            for (; L--; ) ee[Y++] = arguments[++N];
            return On(le, x ? c : this, ee);
          }
          return P;
        }
        function O0(o) {
          return function (u, c, h) {
            return (
              h && typeof h != "number" && tn(u, c, h) && (c = h = n),
              (u = ri(u)),
              c === n ? ((c = u), (u = 0)) : (c = ri(c)),
              (h = h === n ? (u < c ? 1 : -1) : ri(h)),
              JI(u, c, h, o)
            );
          };
        }
        function ma(o) {
          return function (u, c) {
            return (
              (typeof u == "string" && typeof c == "string") ||
                ((u = tr(u)), (c = tr(c))),
              o(u, c)
            );
          };
        }
        function I0(o, u, c, h, x, b, P, N, L, Y) {
          var X = u & k,
            ee = X ? P : n,
            le = X ? n : P,
            fe = X ? b : n,
            ve = X ? n : b;
          (u |= X ? D : T), (u &= ~(X ? T : D)), u & w || (u &= ~(A | y));
          var Te = [o, u, x, fe, ee, ve, le, N, L, Y],
            ye = c.apply(n, Te);
          return cp(o) && B0(ye, Te), (ye.placeholder = h), U0(ye, o, u);
        }
        function rp(o) {
          var u = Ot[o];
          return function (c, h) {
            if (
              ((c = tr(c)), (h = h == null ? 0 : Wt(Oe(h), 292)), h && Uy(c))
            ) {
              var x = (qe(c) + "e").split("e"),
                b = u(x[0] + "e" + (+x[1] + h));
              return (
                (x = (qe(b) + "e").split("e")), +(x[0] + "e" + (+x[1] - h))
              );
            }
            return u(c);
          };
        }
        var gT =
          nl && 1 / Vs(new nl([, -0]))[1] == ne
            ? function (o) {
                return new nl(o);
              }
            : bp;
        function T0(o) {
          return function (u) {
            var c = Vt(u);
            return c == yt ? Dd(u) : c == jt ? AO(u) : kO(u, o(u));
          };
        }
        function Jr(o, u, c, h, x, b, P, N) {
          var L = u & y;
          if (!L && typeof o != "function") throw new Yn(s);
          var Y = h ? h.length : 0;
          if (
            (Y || ((u &= ~(D | T)), (h = x = n)),
            (P = P === n ? P : It(Oe(P), 0)),
            (N = N === n ? N : Oe(N)),
            (Y -= x ? x.length : 0),
            u & T)
          ) {
            var X = h,
              ee = x;
            h = x = n;
          }
          var le = L ? n : lp(o),
            fe = [o, u, c, h, x, X, ee, b, P, N];
          if (
            (le && PT(fe, le),
            (o = fe[0]),
            (u = fe[1]),
            (c = fe[2]),
            (h = fe[3]),
            (x = fe[4]),
            (N = fe[9] = fe[9] === n ? (L ? 0 : o.length) : It(fe[9] - Y, 0)),
            !N && u & (k | R) && (u &= ~(k | R)),
            !u || u == A)
          )
            var ve = dT(o, u, c);
          else
            u == k || u == R
              ? (ve = pT(o, u, N))
              : (u == D || u == (A | D)) && !x.length
              ? (ve = hT(o, u, c, h))
              : (ve = pa.apply(n, fe));
          var Te = le ? a0 : B0;
          return U0(Te(ve, fe), o, u);
        }
        function P0(o, u, c, h) {
          return o === n || (vr(o, tl[c]) && !Ke.call(h, c)) ? u : o;
        }
        function R0(o, u, c, h, x, b) {
          return (
            pt(o) && pt(u) && (b.set(u, o), aa(o, u, n, R0, b), b.delete(u)), o
          );
        }
        function mT(o) {
          return bu(o) ? n : o;
        }
        function A0(o, u, c, h, x, b) {
          var P = c & E,
            N = o.length,
            L = u.length;
          if (N != L && !(P && L > N)) return !1;
          var Y = b.get(o),
            X = b.get(u);
          if (Y && X) return Y == u && X == o;
          var ee = -1,
            le = !0,
            fe = c & S ? new vo() : n;
          for (b.set(o, u), b.set(u, o); ++ee < N; ) {
            var ve = o[ee],
              Te = u[ee];
            if (h) var ye = P ? h(Te, ve, ee, u, o, b) : h(ve, Te, ee, o, u, b);
            if (ye !== n) {
              if (ye) continue;
              le = !1;
              break;
            }
            if (fe) {
              if (
                !Od(u, function (Ne, $e) {
                  if (!fu(fe, $e) && (ve === Ne || x(ve, Ne, c, h, b)))
                    return fe.push($e);
                })
              ) {
                le = !1;
                break;
              }
            } else if (!(ve === Te || x(ve, Te, c, h, b))) {
              le = !1;
              break;
            }
          }
          return b.delete(o), b.delete(u), le;
        }
        function vT(o, u, c, h, x, b, P) {
          switch (c) {
            case ie:
              if (o.byteLength != u.byteLength || o.byteOffset != u.byteOffset)
                return !1;
              (o = o.buffer), (u = u.buffer);
            case V:
              return !(
                o.byteLength != u.byteLength || !b(new Xs(o), new Xs(u))
              );
            case Se:
            case Fe:
            case Vn:
              return vr(+o, +u);
            case Ue:
              return o.name == u.name && o.message == u.message;
            case bn:
            case Tr:
              return o == u + "";
            case yt:
              var N = Dd;
            case jt:
              var L = h & E;
              if ((N || (N = Vs), o.size != u.size && !L)) return !1;
              var Y = P.get(o);
              if (Y) return Y == u;
              (h |= S), P.set(o, u);
              var X = A0(N(o), N(u), h, x, b, P);
              return P.delete(o), X;
            case Gr:
              if (mu) return mu.call(o) == mu.call(u);
          }
          return !1;
        }
        function yT(o, u, c, h, x, b) {
          var P = c & E,
            N = ip(o),
            L = N.length,
            Y = ip(u),
            X = Y.length;
          if (L != X && !P) return !1;
          for (var ee = L; ee--; ) {
            var le = N[ee];
            if (!(P ? le in u : Ke.call(u, le))) return !1;
          }
          var fe = b.get(o),
            ve = b.get(u);
          if (fe && ve) return fe == u && ve == o;
          var Te = !0;
          b.set(o, u), b.set(u, o);
          for (var ye = P; ++ee < L; ) {
            le = N[ee];
            var Ne = o[le],
              $e = u[le];
            if (h) var Rn = P ? h($e, Ne, le, u, o, b) : h(Ne, $e, le, o, u, b);
            if (!(Rn === n ? Ne === $e || x(Ne, $e, c, h, b) : Rn)) {
              Te = !1;
              break;
            }
            ye || (ye = le == "constructor");
          }
          if (Te && !ye) {
            var nn = o.constructor,
              An = u.constructor;
            nn != An &&
              "constructor" in o &&
              "constructor" in u &&
              !(
                typeof nn == "function" &&
                nn instanceof nn &&
                typeof An == "function" &&
                An instanceof An
              ) &&
              (Te = !1);
          }
          return b.delete(o), b.delete(u), Te;
        }
        function ei(o) {
          return dp(z0(o, n, G0), o + "");
        }
        function ip(o) {
          return Zy(o, Rt, sp);
        }
        function op(o) {
          return Zy(o, fn, D0);
        }
        var lp = ra
          ? function (o) {
              return ra.get(o);
            }
          : bp;
        function va(o) {
          for (
            var u = o.name + "", c = rl[u], h = Ke.call(rl, u) ? c.length : 0;
            h--;

          ) {
            var x = c[h],
              b = x.func;
            if (b == null || b == o) return x.name;
          }
          return u;
        }
        function ul(o) {
          var u = Ke.call(C, "placeholder") ? C : o;
          return u.placeholder;
        }
        function ge() {
          var o = C.iteratee || Cp;
          return (
            (o = o === Cp ? t0 : o),
            arguments.length ? o(arguments[0], arguments[1]) : o
          );
        }
        function ya(o, u) {
          var c = o.__data__;
          return _T(u) ? c[typeof u == "string" ? "string" : "hash"] : c.map;
        }
        function up(o) {
          for (var u = Rt(o), c = u.length; c--; ) {
            var h = u[c],
              x = o[h];
            u[c] = [h, x, L0(x)];
          }
          return u;
        }
        function xo(o, u) {
          var c = TO(o, u);
          return e0(c) ? c : n;
        }
        function wT(o) {
          var u = Ke.call(o, go),
            c = o[go];
          try {
            o[go] = n;
            var h = !0;
          } catch {}
          var x = Qs.call(o);
          return h && (u ? (o[go] = c) : delete o[go]), x;
        }
        var sp = Md
            ? function (o) {
                return o == null
                  ? []
                  : ((o = et(o)),
                    Si(Md(o), function (u) {
                      return $y.call(o, u);
                    }));
              }
            : _p,
          D0 = Md
            ? function (o) {
                for (var u = []; o; ) Ei(u, sp(o)), (o = Zs(o));
                return u;
              }
            : _p,
          Vt = en;
        ((Ld && Vt(new Ld(new ArrayBuffer(1))) != ie) ||
          (pu && Vt(new pu()) != yt) ||
          (Fd && Vt(Fd.resolve()) != Lt) ||
          (nl && Vt(new nl()) != jt) ||
          (hu && Vt(new hu()) != Pr)) &&
          (Vt = function (o) {
            var u = en(o),
              c = u == at ? o.constructor : n,
              h = c ? So(c) : "";
            if (h)
              switch (h) {
                case tI:
                  return ie;
                case nI:
                  return yt;
                case rI:
                  return Lt;
                case iI:
                  return jt;
                case oI:
                  return Pr;
              }
            return u;
          });
        function xT(o, u, c) {
          for (var h = -1, x = c.length; ++h < x; ) {
            var b = c[h],
              P = b.size;
            switch (b.type) {
              case "drop":
                o += P;
                break;
              case "dropRight":
                u -= P;
                break;
              case "take":
                u = Wt(u, o + P);
                break;
              case "takeRight":
                o = It(o, u - P);
                break;
            }
          }
          return { start: o, end: u };
        }
        function ST(o) {
          var u = o.match(O_);
          return u ? u[1].split(I_) : [];
        }
        function N0(o, u, c) {
          u = Oi(u, o);
          for (var h = -1, x = u.length, b = !1; ++h < x; ) {
            var P = Dr(u[h]);
            if (!(b = o != null && c(o, P))) break;
            o = o[P];
          }
          return b || ++h != x
            ? b
            : ((x = o == null ? 0 : o.length),
              !!x && ba(x) && ti(P, x) && (ke(o) || Eo(o)));
        }
        function ET(o) {
          var u = o.length,
            c = new o.constructor(u);
          return (
            u &&
              typeof o[0] == "string" &&
              Ke.call(o, "index") &&
              ((c.index = o.index), (c.input = o.input)),
            c
          );
        }
        function M0(o) {
          return typeof o.constructor == "function" && !Cu(o) ? il(Zs(o)) : {};
        }
        function CT(o, u, c) {
          var h = o.constructor;
          switch (u) {
            case V:
              return tp(o);
            case Se:
            case Fe:
              return new h(+o);
            case ie:
              return lT(o, c);
            case pe:
            case He:
            case je:
            case Jt:
            case Gn:
            case _n:
            case Kr:
            case Qr:
            case ot:
              return v0(o, c);
            case yt:
              return new h();
            case Vn:
            case Tr:
              return new h(o);
            case bn:
              return uT(o);
            case jt:
              return new h();
            case Gr:
              return sT(o);
          }
        }
        function kT(o, u) {
          var c = u.length;
          if (!c) return o;
          var h = c - 1;
          return (
            (u[h] = (c > 1 ? "& " : "") + u[h]),
            (u = u.join(c > 2 ? ", " : " ")),
            o.replace(
              __,
              `{
/* [wrapped with ` +
                u +
                `] */
`
            )
          );
        }
        function bT(o) {
          return ke(o) || Eo(o) || !!(By && o && o[By]);
        }
        function ti(o, u) {
          var c = typeof o;
          return (
            (u = u ?? H),
            !!u &&
              (c == "number" || (c != "symbol" && F_.test(o))) &&
              o > -1 &&
              o % 1 == 0 &&
              o < u
          );
        }
        function tn(o, u, c) {
          if (!pt(c)) return !1;
          var h = typeof u;
          return (
            h == "number" ? cn(c) && ti(u, c.length) : h == "string" && u in c
          )
            ? vr(c[u], o)
            : !1;
        }
        function ap(o, u) {
          if (ke(o)) return !1;
          var c = typeof o;
          return c == "number" ||
            c == "symbol" ||
            c == "boolean" ||
            o == null ||
            Pn(o)
            ? !0
            : E_.test(o) || !S_.test(o) || (u != null && o in et(u));
        }
        function _T(o) {
          var u = typeof o;
          return u == "string" ||
            u == "number" ||
            u == "symbol" ||
            u == "boolean"
            ? o !== "__proto__"
            : o === null;
        }
        function cp(o) {
          var u = va(o),
            c = C[u];
          if (typeof c != "function" || !(u in Le.prototype)) return !1;
          if (o === c) return !0;
          var h = lp(c);
          return !!h && o === h[0];
        }
        function OT(o) {
          return !!Ly && Ly in o;
        }
        var IT = Gs ? ni : Op;
        function Cu(o) {
          var u = o && o.constructor,
            c = (typeof u == "function" && u.prototype) || tl;
          return o === c;
        }
        function L0(o) {
          return o === o && !pt(o);
        }
        function F0(o, u) {
          return function (c) {
            return c == null ? !1 : c[o] === u && (u !== n || o in et(c));
          };
        }
        function TT(o) {
          var u = Ca(o, function (h) {
              return c.size === d && c.clear(), h;
            }),
            c = u.cache;
          return u;
        }
        function PT(o, u) {
          var c = o[1],
            h = u[1],
            x = c | h,
            b = x < (A | y | F),
            P =
              (h == F && c == k) ||
              (h == F && c == z && o[7].length <= u[8]) ||
              (h == (F | z) && u[7].length <= u[8] && c == k);
          if (!(b || P)) return o;
          h & A && ((o[2] = u[2]), (x |= c & A ? 0 : w));
          var N = u[3];
          if (N) {
            var L = o[3];
            (o[3] = L ? w0(L, N, u[4]) : N), (o[4] = L ? Ci(o[3], p) : u[4]);
          }
          return (
            (N = u[5]),
            N &&
              ((L = o[5]),
              (o[5] = L ? x0(L, N, u[6]) : N),
              (o[6] = L ? Ci(o[5], p) : u[6])),
            (N = u[7]),
            N && (o[7] = N),
            h & F && (o[8] = o[8] == null ? u[8] : Wt(o[8], u[8])),
            o[9] == null && (o[9] = u[9]),
            (o[0] = u[0]),
            (o[1] = x),
            o
          );
        }
        function RT(o) {
          var u = [];
          if (o != null) for (var c in et(o)) u.push(c);
          return u;
        }
        function AT(o) {
          return Qs.call(o);
        }
        function z0(o, u, c) {
          return (
            (u = It(u === n ? o.length - 1 : u, 0)),
            function () {
              for (
                var h = arguments, x = -1, b = It(h.length - u, 0), P = j(b);
                ++x < b;

              )
                P[x] = h[u + x];
              x = -1;
              for (var N = j(u + 1); ++x < u; ) N[x] = h[x];
              return (N[u] = c(P)), On(o, this, N);
            }
          );
        }
        function $0(o, u) {
          return u.length < 2 ? o : wo(o, Jn(u, 0, -1));
        }
        function DT(o, u) {
          for (var c = o.length, h = Wt(u.length, c), x = an(o); h--; ) {
            var b = u[h];
            o[h] = ti(b, c) ? x[b] : n;
          }
          return o;
        }
        function fp(o, u) {
          if (
            !(u === "constructor" && typeof o[u] == "function") &&
            u != "__proto__"
          )
            return o[u];
        }
        var B0 = H0(a0),
          ku =
            KO ||
            function (o, u) {
              return Ft.setTimeout(o, u);
            },
          dp = H0(nT);
        function U0(o, u, c) {
          var h = u + "";
          return dp(o, kT(h, NT(ST(h), c)));
        }
        function H0(o) {
          var u = 0,
            c = 0;
          return function () {
            var h = ZO(),
              x = B - (h - c);
            if (((c = h), x > 0)) {
              if (++u >= Q) return arguments[0];
            } else u = 0;
            return o.apply(n, arguments);
          };
        }
        function wa(o, u) {
          var c = -1,
            h = o.length,
            x = h - 1;
          for (u = u === n ? h : u; ++c < u; ) {
            var b = Kd(c, x),
              P = o[b];
            (o[b] = o[c]), (o[c] = P);
          }
          return (o.length = u), o;
        }
        var j0 = TT(function (o) {
          var u = [];
          return (
            o.charCodeAt(0) === 46 && u.push(""),
            o.replace(C_, function (c, h, x, b) {
              u.push(x ? b.replace(R_, "$1") : h || c);
            }),
            u
          );
        });
        function Dr(o) {
          if (typeof o == "string" || Pn(o)) return o;
          var u = o + "";
          return u == "0" && 1 / o == -ne ? "-0" : u;
        }
        function So(o) {
          if (o != null) {
            try {
              return Ks.call(o);
            } catch {}
            try {
              return o + "";
            } catch {}
          }
          return "";
        }
        function NT(o, u) {
          return (
            Qn(de, function (c) {
              var h = "_." + c[0];
              u & c[1] && !js(o, h) && o.push(h);
            }),
            o.sort()
          );
        }
        function W0(o) {
          if (o instanceof Le) return o.clone();
          var u = new Xn(o.__wrapped__, o.__chain__);
          return (
            (u.__actions__ = an(o.__actions__)),
            (u.__index__ = o.__index__),
            (u.__values__ = o.__values__),
            u
          );
        }
        function MT(o, u, c) {
          (c ? tn(o, u, c) : u === n) ? (u = 1) : (u = It(Oe(u), 0));
          var h = o == null ? 0 : o.length;
          if (!h || u < 1) return [];
          for (var x = 0, b = 0, P = j(ta(h / u)); x < h; )
            P[b++] = Jn(o, x, (x += u));
          return P;
        }
        function LT(o) {
          for (
            var u = -1, c = o == null ? 0 : o.length, h = 0, x = [];
            ++u < c;

          ) {
            var b = o[u];
            b && (x[h++] = b);
          }
          return x;
        }
        function FT() {
          var o = arguments.length;
          if (!o) return [];
          for (var u = j(o - 1), c = arguments[0], h = o; h--; )
            u[h - 1] = arguments[h];
          return Ei(ke(c) ? an(c) : [c], zt(u, 1));
        }
        var zT = Re(function (o, u) {
            return Et(o) ? yu(o, zt(u, 1, Et, !0)) : [];
          }),
          $T = Re(function (o, u) {
            var c = er(u);
            return (
              Et(c) && (c = n), Et(o) ? yu(o, zt(u, 1, Et, !0), ge(c, 2)) : []
            );
          }),
          BT = Re(function (o, u) {
            var c = er(u);
            return Et(c) && (c = n), Et(o) ? yu(o, zt(u, 1, Et, !0), n, c) : [];
          });
        function UT(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? ((u = c || u === n ? 1 : Oe(u)), Jn(o, u < 0 ? 0 : u, h))
            : [];
        }
        function HT(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? ((u = c || u === n ? 1 : Oe(u)),
              (u = h - u),
              Jn(o, 0, u < 0 ? 0 : u))
            : [];
        }
        function jT(o, u) {
          return o && o.length ? fa(o, ge(u, 3), !0, !0) : [];
        }
        function WT(o, u) {
          return o && o.length ? fa(o, ge(u, 3), !0) : [];
        }
        function VT(o, u, c, h) {
          var x = o == null ? 0 : o.length;
          return x
            ? (c && typeof c != "number" && tn(o, u, c) && ((c = 0), (h = x)),
              FI(o, u, c, h))
            : [];
        }
        function V0(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var x = c == null ? 0 : Oe(c);
          return x < 0 && (x = It(h + x, 0)), Ws(o, ge(u, 3), x);
        }
        function q0(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var x = h - 1;
          return (
            c !== n && ((x = Oe(c)), (x = c < 0 ? It(h + x, 0) : Wt(x, h - 1))),
            Ws(o, ge(u, 3), x, !0)
          );
        }
        function G0(o) {
          var u = o == null ? 0 : o.length;
          return u ? zt(o, 1) : [];
        }
        function qT(o) {
          var u = o == null ? 0 : o.length;
          return u ? zt(o, ne) : [];
        }
        function GT(o, u) {
          var c = o == null ? 0 : o.length;
          return c ? ((u = u === n ? 1 : Oe(u)), zt(o, u)) : [];
        }
        function KT(o) {
          for (var u = -1, c = o == null ? 0 : o.length, h = {}; ++u < c; ) {
            var x = o[u];
            h[x[0]] = x[1];
          }
          return h;
        }
        function K0(o) {
          return o && o.length ? o[0] : n;
        }
        function QT(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var x = c == null ? 0 : Oe(c);
          return x < 0 && (x = It(h + x, 0)), Xo(o, u, x);
        }
        function YT(o) {
          var u = o == null ? 0 : o.length;
          return u ? Jn(o, 0, -1) : [];
        }
        var XT = Re(function (o) {
            var u = ct(o, Jd);
            return u.length && u[0] === o[0] ? jd(u) : [];
          }),
          ZT = Re(function (o) {
            var u = er(o),
              c = ct(o, Jd);
            return (
              u === er(c) ? (u = n) : c.pop(),
              c.length && c[0] === o[0] ? jd(c, ge(u, 2)) : []
            );
          }),
          JT = Re(function (o) {
            var u = er(o),
              c = ct(o, Jd);
            return (
              (u = typeof u == "function" ? u : n),
              u && c.pop(),
              c.length && c[0] === o[0] ? jd(c, n, u) : []
            );
          });
        function e2(o, u) {
          return o == null ? "" : YO.call(o, u);
        }
        function er(o) {
          var u = o == null ? 0 : o.length;
          return u ? o[u - 1] : n;
        }
        function t2(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var x = h;
          return (
            c !== n && ((x = Oe(c)), (x = x < 0 ? It(h + x, 0) : Wt(x, h - 1))),
            u === u ? NO(o, u, x) : Ws(o, Iy, x, !0)
          );
        }
        function n2(o, u) {
          return o && o.length ? o0(o, Oe(u)) : n;
        }
        var r2 = Re(Q0);
        function Q0(o, u) {
          return o && o.length && u && u.length ? Gd(o, u) : o;
        }
        function i2(o, u, c) {
          return o && o.length && u && u.length ? Gd(o, u, ge(c, 2)) : o;
        }
        function o2(o, u, c) {
          return o && o.length && u && u.length ? Gd(o, u, n, c) : o;
        }
        var l2 = ei(function (o, u) {
          var c = o == null ? 0 : o.length,
            h = $d(o, u);
          return (
            s0(
              o,
              ct(u, function (x) {
                return ti(x, c) ? +x : x;
              }).sort(y0)
            ),
            h
          );
        });
        function u2(o, u) {
          var c = [];
          if (!(o && o.length)) return c;
          var h = -1,
            x = [],
            b = o.length;
          for (u = ge(u, 3); ++h < b; ) {
            var P = o[h];
            u(P, h, o) && (c.push(P), x.push(h));
          }
          return s0(o, x), c;
        }
        function pp(o) {
          return o == null ? o : eI.call(o);
        }
        function s2(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? (c && typeof c != "number" && tn(o, u, c)
                ? ((u = 0), (c = h))
                : ((u = u == null ? 0 : Oe(u)), (c = c === n ? h : Oe(c))),
              Jn(o, u, c))
            : [];
        }
        function a2(o, u) {
          return ca(o, u);
        }
        function c2(o, u, c) {
          return Yd(o, u, ge(c, 2));
        }
        function f2(o, u) {
          var c = o == null ? 0 : o.length;
          if (c) {
            var h = ca(o, u);
            if (h < c && vr(o[h], u)) return h;
          }
          return -1;
        }
        function d2(o, u) {
          return ca(o, u, !0);
        }
        function p2(o, u, c) {
          return Yd(o, u, ge(c, 2), !0);
        }
        function h2(o, u) {
          var c = o == null ? 0 : o.length;
          if (c) {
            var h = ca(o, u, !0) - 1;
            if (vr(o[h], u)) return h;
          }
          return -1;
        }
        function g2(o) {
          return o && o.length ? c0(o) : [];
        }
        function m2(o, u) {
          return o && o.length ? c0(o, ge(u, 2)) : [];
        }
        function v2(o) {
          var u = o == null ? 0 : o.length;
          return u ? Jn(o, 1, u) : [];
        }
        function y2(o, u, c) {
          return o && o.length
            ? ((u = c || u === n ? 1 : Oe(u)), Jn(o, 0, u < 0 ? 0 : u))
            : [];
        }
        function w2(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? ((u = c || u === n ? 1 : Oe(u)),
              (u = h - u),
              Jn(o, u < 0 ? 0 : u, h))
            : [];
        }
        function x2(o, u) {
          return o && o.length ? fa(o, ge(u, 3), !1, !0) : [];
        }
        function S2(o, u) {
          return o && o.length ? fa(o, ge(u, 3)) : [];
        }
        var E2 = Re(function (o) {
            return _i(zt(o, 1, Et, !0));
          }),
          C2 = Re(function (o) {
            var u = er(o);
            return Et(u) && (u = n), _i(zt(o, 1, Et, !0), ge(u, 2));
          }),
          k2 = Re(function (o) {
            var u = er(o);
            return (
              (u = typeof u == "function" ? u : n), _i(zt(o, 1, Et, !0), n, u)
            );
          });
        function b2(o) {
          return o && o.length ? _i(o) : [];
        }
        function _2(o, u) {
          return o && o.length ? _i(o, ge(u, 2)) : [];
        }
        function O2(o, u) {
          return (
            (u = typeof u == "function" ? u : n),
            o && o.length ? _i(o, n, u) : []
          );
        }
        function hp(o) {
          if (!(o && o.length)) return [];
          var u = 0;
          return (
            (o = Si(o, function (c) {
              if (Et(c)) return (u = It(c.length, u)), !0;
            })),
            Rd(u, function (c) {
              return ct(o, Id(c));
            })
          );
        }
        function Y0(o, u) {
          if (!(o && o.length)) return [];
          var c = hp(o);
          return u == null
            ? c
            : ct(c, function (h) {
                return On(u, n, h);
              });
        }
        var I2 = Re(function (o, u) {
            return Et(o) ? yu(o, u) : [];
          }),
          T2 = Re(function (o) {
            return Zd(Si(o, Et));
          }),
          P2 = Re(function (o) {
            var u = er(o);
            return Et(u) && (u = n), Zd(Si(o, Et), ge(u, 2));
          }),
          R2 = Re(function (o) {
            var u = er(o);
            return (u = typeof u == "function" ? u : n), Zd(Si(o, Et), n, u);
          }),
          A2 = Re(hp);
        function D2(o, u) {
          return h0(o || [], u || [], vu);
        }
        function N2(o, u) {
          return h0(o || [], u || [], Su);
        }
        var M2 = Re(function (o) {
          var u = o.length,
            c = u > 1 ? o[u - 1] : n;
          return (c = typeof c == "function" ? (o.pop(), c) : n), Y0(o, c);
        });
        function X0(o) {
          var u = C(o);
          return (u.__chain__ = !0), u;
        }
        function L2(o, u) {
          return u(o), o;
        }
        function xa(o, u) {
          return u(o);
        }
        var F2 = ei(function (o) {
          var u = o.length,
            c = u ? o[0] : 0,
            h = this.__wrapped__,
            x = function (b) {
              return $d(b, o);
            };
          return u > 1 ||
            this.__actions__.length ||
            !(h instanceof Le) ||
            !ti(c)
            ? this.thru(x)
            : ((h = h.slice(c, +c + (u ? 1 : 0))),
              h.__actions__.push({ func: xa, args: [x], thisArg: n }),
              new Xn(h, this.__chain__).thru(function (b) {
                return u && !b.length && b.push(n), b;
              }));
        });
        function z2() {
          return X0(this);
        }
        function $2() {
          return new Xn(this.value(), this.__chain__);
        }
        function B2() {
          this.__values__ === n && (this.__values__ = f1(this.value()));
          var o = this.__index__ >= this.__values__.length,
            u = o ? n : this.__values__[this.__index__++];
          return { done: o, value: u };
        }
        function U2() {
          return this;
        }
        function H2(o) {
          for (var u, c = this; c instanceof oa; ) {
            var h = W0(c);
            (h.__index__ = 0),
              (h.__values__ = n),
              u ? (x.__wrapped__ = h) : (u = h);
            var x = h;
            c = c.__wrapped__;
          }
          return (x.__wrapped__ = o), u;
        }
        function j2() {
          var o = this.__wrapped__;
          if (o instanceof Le) {
            var u = o;
            return (
              this.__actions__.length && (u = new Le(this)),
              (u = u.reverse()),
              u.__actions__.push({ func: xa, args: [pp], thisArg: n }),
              new Xn(u, this.__chain__)
            );
          }
          return this.thru(pp);
        }
        function W2() {
          return p0(this.__wrapped__, this.__actions__);
        }
        var V2 = da(function (o, u, c) {
          Ke.call(o, c) ? ++o[c] : Zr(o, c, 1);
        });
        function q2(o, u, c) {
          var h = ke(o) ? _y : LI;
          return c && tn(o, u, c) && (u = n), h(o, ge(u, 3));
        }
        function G2(o, u) {
          var c = ke(o) ? Si : Yy;
          return c(o, ge(u, 3));
        }
        var K2 = k0(V0),
          Q2 = k0(q0);
        function Y2(o, u) {
          return zt(Sa(o, u), 1);
        }
        function X2(o, u) {
          return zt(Sa(o, u), ne);
        }
        function Z2(o, u, c) {
          return (c = c === n ? 1 : Oe(c)), zt(Sa(o, u), c);
        }
        function Z0(o, u) {
          var c = ke(o) ? Qn : bi;
          return c(o, ge(u, 3));
        }
        function J0(o, u) {
          var c = ke(o) ? vO : Qy;
          return c(o, ge(u, 3));
        }
        var J2 = da(function (o, u, c) {
          Ke.call(o, c) ? o[c].push(u) : Zr(o, c, [u]);
        });
        function eP(o, u, c, h) {
          (o = cn(o) ? o : al(o)), (c = c && !h ? Oe(c) : 0);
          var x = o.length;
          return (
            c < 0 && (c = It(x + c, 0)),
            _a(o) ? c <= x && o.indexOf(u, c) > -1 : !!x && Xo(o, u, c) > -1
          );
        }
        var tP = Re(function (o, u, c) {
            var h = -1,
              x = typeof u == "function",
              b = cn(o) ? j(o.length) : [];
            return (
              bi(o, function (P) {
                b[++h] = x ? On(u, P, c) : wu(P, u, c);
              }),
              b
            );
          }),
          nP = da(function (o, u, c) {
            Zr(o, c, u);
          });
        function Sa(o, u) {
          var c = ke(o) ? ct : n0;
          return c(o, ge(u, 3));
        }
        function rP(o, u, c, h) {
          return o == null
            ? []
            : (ke(u) || (u = u == null ? [] : [u]),
              (c = h ? n : c),
              ke(c) || (c = c == null ? [] : [c]),
              l0(o, u, c));
        }
        var iP = da(
          function (o, u, c) {
            o[c ? 0 : 1].push(u);
          },
          function () {
            return [[], []];
          }
        );
        function oP(o, u, c) {
          var h = ke(o) ? _d : Py,
            x = arguments.length < 3;
          return h(o, ge(u, 4), c, x, bi);
        }
        function lP(o, u, c) {
          var h = ke(o) ? yO : Py,
            x = arguments.length < 3;
          return h(o, ge(u, 4), c, x, Qy);
        }
        function uP(o, u) {
          var c = ke(o) ? Si : Yy;
          return c(o, ka(ge(u, 3)));
        }
        function sP(o) {
          var u = ke(o) ? Vy : eT;
          return u(o);
        }
        function aP(o, u, c) {
          (c ? tn(o, u, c) : u === n) ? (u = 1) : (u = Oe(u));
          var h = ke(o) ? RI : tT;
          return h(o, u);
        }
        function cP(o) {
          var u = ke(o) ? AI : rT;
          return u(o);
        }
        function fP(o) {
          if (o == null) return 0;
          if (cn(o)) return _a(o) ? Jo(o) : o.length;
          var u = Vt(o);
          return u == yt || u == jt ? o.size : Vd(o).length;
        }
        function dP(o, u, c) {
          var h = ke(o) ? Od : iT;
          return c && tn(o, u, c) && (u = n), h(o, ge(u, 3));
        }
        var pP = Re(function (o, u) {
            if (o == null) return [];
            var c = u.length;
            return (
              c > 1 && tn(o, u[0], u[1])
                ? (u = [])
                : c > 2 && tn(u[0], u[1], u[2]) && (u = [u[0]]),
              l0(o, zt(u, 1), [])
            );
          }),
          Ea =
            GO ||
            function () {
              return Ft.Date.now();
            };
        function hP(o, u) {
          if (typeof u != "function") throw new Yn(s);
          return (
            (o = Oe(o)),
            function () {
              if (--o < 1) return u.apply(this, arguments);
            }
          );
        }
        function e1(o, u, c) {
          return (
            (u = c ? n : u),
            (u = o && u == null ? o.length : u),
            Jr(o, F, n, n, n, n, u)
          );
        }
        function t1(o, u) {
          var c;
          if (typeof u != "function") throw new Yn(s);
          return (
            (o = Oe(o)),
            function () {
              return (
                --o > 0 && (c = u.apply(this, arguments)), o <= 1 && (u = n), c
              );
            }
          );
        }
        var gp = Re(function (o, u, c) {
            var h = A;
            if (c.length) {
              var x = Ci(c, ul(gp));
              h |= D;
            }
            return Jr(o, h, u, c, x);
          }),
          n1 = Re(function (o, u, c) {
            var h = A | y;
            if (c.length) {
              var x = Ci(c, ul(n1));
              h |= D;
            }
            return Jr(u, h, o, c, x);
          });
        function r1(o, u, c) {
          u = c ? n : u;
          var h = Jr(o, k, n, n, n, n, n, u);
          return (h.placeholder = r1.placeholder), h;
        }
        function i1(o, u, c) {
          u = c ? n : u;
          var h = Jr(o, R, n, n, n, n, n, u);
          return (h.placeholder = i1.placeholder), h;
        }
        function o1(o, u, c) {
          var h,
            x,
            b,
            P,
            N,
            L,
            Y = 0,
            X = !1,
            ee = !1,
            le = !0;
          if (typeof o != "function") throw new Yn(s);
          (u = tr(u) || 0),
            pt(c) &&
              ((X = !!c.leading),
              (ee = "maxWait" in c),
              (b = ee ? It(tr(c.maxWait) || 0, u) : b),
              (le = "trailing" in c ? !!c.trailing : le));
          function fe(Ct) {
            var yr = h,
              ii = x;
            return (h = x = n), (Y = Ct), (P = o.apply(ii, yr)), P;
          }
          function ve(Ct) {
            return (Y = Ct), (N = ku(Ne, u)), X ? fe(Ct) : P;
          }
          function Te(Ct) {
            var yr = Ct - L,
              ii = Ct - Y,
              k1 = u - yr;
            return ee ? Wt(k1, b - ii) : k1;
          }
          function ye(Ct) {
            var yr = Ct - L,
              ii = Ct - Y;
            return L === n || yr >= u || yr < 0 || (ee && ii >= b);
          }
          function Ne() {
            var Ct = Ea();
            if (ye(Ct)) return $e(Ct);
            N = ku(Ne, Te(Ct));
          }
          function $e(Ct) {
            return (N = n), le && h ? fe(Ct) : ((h = x = n), P);
          }
          function Rn() {
            N !== n && g0(N), (Y = 0), (h = L = x = N = n);
          }
          function nn() {
            return N === n ? P : $e(Ea());
          }
          function An() {
            var Ct = Ea(),
              yr = ye(Ct);
            if (((h = arguments), (x = this), (L = Ct), yr)) {
              if (N === n) return ve(L);
              if (ee) return g0(N), (N = ku(Ne, u)), fe(L);
            }
            return N === n && (N = ku(Ne, u)), P;
          }
          return (An.cancel = Rn), (An.flush = nn), An;
        }
        var gP = Re(function (o, u) {
            return Ky(o, 1, u);
          }),
          mP = Re(function (o, u, c) {
            return Ky(o, tr(u) || 0, c);
          });
        function vP(o) {
          return Jr(o, q);
        }
        function Ca(o, u) {
          if (typeof o != "function" || (u != null && typeof u != "function"))
            throw new Yn(s);
          var c = function () {
            var h = arguments,
              x = u ? u.apply(this, h) : h[0],
              b = c.cache;
            if (b.has(x)) return b.get(x);
            var P = o.apply(this, h);
            return (c.cache = b.set(x, P) || b), P;
          };
          return (c.cache = new (Ca.Cache || Xr)()), c;
        }
        Ca.Cache = Xr;
        function ka(o) {
          if (typeof o != "function") throw new Yn(s);
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
        function yP(o) {
          return t1(2, o);
        }
        var wP = oT(function (o, u) {
            u =
              u.length == 1 && ke(u[0])
                ? ct(u[0], In(ge()))
                : ct(zt(u, 1), In(ge()));
            var c = u.length;
            return Re(function (h) {
              for (var x = -1, b = Wt(h.length, c); ++x < b; )
                h[x] = u[x].call(this, h[x]);
              return On(o, this, h);
            });
          }),
          mp = Re(function (o, u) {
            var c = Ci(u, ul(mp));
            return Jr(o, D, n, u, c);
          }),
          l1 = Re(function (o, u) {
            var c = Ci(u, ul(l1));
            return Jr(o, T, n, u, c);
          }),
          xP = ei(function (o, u) {
            return Jr(o, z, n, n, n, u);
          });
        function SP(o, u) {
          if (typeof o != "function") throw new Yn(s);
          return (u = u === n ? u : Oe(u)), Re(o, u);
        }
        function EP(o, u) {
          if (typeof o != "function") throw new Yn(s);
          return (
            (u = u == null ? 0 : It(Oe(u), 0)),
            Re(function (c) {
              var h = c[u],
                x = Ii(c, 0, u);
              return h && Ei(x, h), On(o, this, x);
            })
          );
        }
        function CP(o, u, c) {
          var h = !0,
            x = !0;
          if (typeof o != "function") throw new Yn(s);
          return (
            pt(c) &&
              ((h = "leading" in c ? !!c.leading : h),
              (x = "trailing" in c ? !!c.trailing : x)),
            o1(o, u, { leading: h, maxWait: u, trailing: x })
          );
        }
        function kP(o) {
          return e1(o, 1);
        }
        function bP(o, u) {
          return mp(ep(u), o);
        }
        function _P() {
          if (!arguments.length) return [];
          var o = arguments[0];
          return ke(o) ? o : [o];
        }
        function OP(o) {
          return Zn(o, m);
        }
        function IP(o, u) {
          return (u = typeof u == "function" ? u : n), Zn(o, m, u);
        }
        function TP(o) {
          return Zn(o, g | m);
        }
        function PP(o, u) {
          return (u = typeof u == "function" ? u : n), Zn(o, g | m, u);
        }
        function RP(o, u) {
          return u == null || Gy(o, u, Rt(u));
        }
        function vr(o, u) {
          return o === u || (o !== o && u !== u);
        }
        var AP = ma(Hd),
          DP = ma(function (o, u) {
            return o >= u;
          }),
          Eo = Jy(
            (function () {
              return arguments;
            })()
          )
            ? Jy
            : function (o) {
                return wt(o) && Ke.call(o, "callee") && !$y.call(o, "callee");
              },
          ke = j.isArray,
          NP = xy ? In(xy) : HI;
        function cn(o) {
          return o != null && ba(o.length) && !ni(o);
        }
        function Et(o) {
          return wt(o) && cn(o);
        }
        function MP(o) {
          return o === !0 || o === !1 || (wt(o) && en(o) == Se);
        }
        var Ti = QO || Op,
          LP = Sy ? In(Sy) : jI;
        function FP(o) {
          return wt(o) && o.nodeType === 1 && !bu(o);
        }
        function zP(o) {
          if (o == null) return !0;
          if (
            cn(o) &&
            (ke(o) ||
              typeof o == "string" ||
              typeof o.splice == "function" ||
              Ti(o) ||
              sl(o) ||
              Eo(o))
          )
            return !o.length;
          var u = Vt(o);
          if (u == yt || u == jt) return !o.size;
          if (Cu(o)) return !Vd(o).length;
          for (var c in o) if (Ke.call(o, c)) return !1;
          return !0;
        }
        function $P(o, u) {
          return xu(o, u);
        }
        function BP(o, u, c) {
          c = typeof c == "function" ? c : n;
          var h = c ? c(o, u) : n;
          return h === n ? xu(o, u, n, c) : !!h;
        }
        function vp(o) {
          if (!wt(o)) return !1;
          var u = en(o);
          return (
            u == Ue ||
            u == Ie ||
            (typeof o.message == "string" &&
              typeof o.name == "string" &&
              !bu(o))
          );
        }
        function UP(o) {
          return typeof o == "number" && Uy(o);
        }
        function ni(o) {
          if (!pt(o)) return !1;
          var u = en(o);
          return u == ze || u == Ge || u == De || u == kn;
        }
        function u1(o) {
          return typeof o == "number" && o == Oe(o);
        }
        function ba(o) {
          return typeof o == "number" && o > -1 && o % 1 == 0 && o <= H;
        }
        function pt(o) {
          var u = typeof o;
          return o != null && (u == "object" || u == "function");
        }
        function wt(o) {
          return o != null && typeof o == "object";
        }
        var s1 = Ey ? In(Ey) : VI;
        function HP(o, u) {
          return o === u || Wd(o, u, up(u));
        }
        function jP(o, u, c) {
          return (c = typeof c == "function" ? c : n), Wd(o, u, up(u), c);
        }
        function WP(o) {
          return a1(o) && o != +o;
        }
        function VP(o) {
          if (IT(o)) throw new Ee(l);
          return e0(o);
        }
        function qP(o) {
          return o === null;
        }
        function GP(o) {
          return o == null;
        }
        function a1(o) {
          return typeof o == "number" || (wt(o) && en(o) == Vn);
        }
        function bu(o) {
          if (!wt(o) || en(o) != at) return !1;
          var u = Zs(o);
          if (u === null) return !0;
          var c = Ke.call(u, "constructor") && u.constructor;
          return typeof c == "function" && c instanceof c && Ks.call(c) == jO;
        }
        var yp = Cy ? In(Cy) : qI;
        function KP(o) {
          return u1(o) && o >= -H && o <= H;
        }
        var c1 = ky ? In(ky) : GI;
        function _a(o) {
          return typeof o == "string" || (!ke(o) && wt(o) && en(o) == Tr);
        }
        function Pn(o) {
          return typeof o == "symbol" || (wt(o) && en(o) == Gr);
        }
        var sl = by ? In(by) : KI;
        function QP(o) {
          return o === n;
        }
        function YP(o) {
          return wt(o) && Vt(o) == Pr;
        }
        function XP(o) {
          return wt(o) && en(o) == qn;
        }
        var ZP = ma(qd),
          JP = ma(function (o, u) {
            return o <= u;
          });
        function f1(o) {
          if (!o) return [];
          if (cn(o)) return _a(o) ? gr(o) : an(o);
          if (du && o[du]) return RO(o[du]());
          var u = Vt(o),
            c = u == yt ? Dd : u == jt ? Vs : al;
          return c(o);
        }
        function ri(o) {
          if (!o) return o === 0 ? o : 0;
          if (((o = tr(o)), o === ne || o === -ne)) {
            var u = o < 0 ? -1 : 1;
            return u * Z;
          }
          return o === o ? o : 0;
        }
        function Oe(o) {
          var u = ri(o),
            c = u % 1;
          return u === u ? (c ? u - c : u) : 0;
        }
        function d1(o) {
          return o ? yo(Oe(o), 0, re) : 0;
        }
        function tr(o) {
          if (typeof o == "number") return o;
          if (Pn(o)) return _;
          if (pt(o)) {
            var u = typeof o.valueOf == "function" ? o.valueOf() : o;
            o = pt(u) ? u + "" : u;
          }
          if (typeof o != "string") return o === 0 ? o : +o;
          o = Ry(o);
          var c = N_.test(o);
          return c || L_.test(o)
            ? hO(o.slice(2), c ? 2 : 8)
            : D_.test(o)
            ? _
            : +o;
        }
        function p1(o) {
          return Ar(o, fn(o));
        }
        function eR(o) {
          return o ? yo(Oe(o), -H, H) : o === 0 ? o : 0;
        }
        function qe(o) {
          return o == null ? "" : Tn(o);
        }
        var tR = ol(function (o, u) {
            if (Cu(u) || cn(u)) {
              Ar(u, Rt(u), o);
              return;
            }
            for (var c in u) Ke.call(u, c) && vu(o, c, u[c]);
          }),
          h1 = ol(function (o, u) {
            Ar(u, fn(u), o);
          }),
          Oa = ol(function (o, u, c, h) {
            Ar(u, fn(u), o, h);
          }),
          nR = ol(function (o, u, c, h) {
            Ar(u, Rt(u), o, h);
          }),
          rR = ei($d);
        function iR(o, u) {
          var c = il(o);
          return u == null ? c : qy(c, u);
        }
        var oR = Re(function (o, u) {
            o = et(o);
            var c = -1,
              h = u.length,
              x = h > 2 ? u[2] : n;
            for (x && tn(u[0], u[1], x) && (h = 1); ++c < h; )
              for (var b = u[c], P = fn(b), N = -1, L = P.length; ++N < L; ) {
                var Y = P[N],
                  X = o[Y];
                (X === n || (vr(X, tl[Y]) && !Ke.call(o, Y))) && (o[Y] = b[Y]);
              }
            return o;
          }),
          lR = Re(function (o) {
            return o.push(n, R0), On(g1, n, o);
          });
        function uR(o, u) {
          return Oy(o, ge(u, 3), Rr);
        }
        function sR(o, u) {
          return Oy(o, ge(u, 3), Ud);
        }
        function aR(o, u) {
          return o == null ? o : Bd(o, ge(u, 3), fn);
        }
        function cR(o, u) {
          return o == null ? o : Xy(o, ge(u, 3), fn);
        }
        function fR(o, u) {
          return o && Rr(o, ge(u, 3));
        }
        function dR(o, u) {
          return o && Ud(o, ge(u, 3));
        }
        function pR(o) {
          return o == null ? [] : sa(o, Rt(o));
        }
        function hR(o) {
          return o == null ? [] : sa(o, fn(o));
        }
        function wp(o, u, c) {
          var h = o == null ? n : wo(o, u);
          return h === n ? c : h;
        }
        function gR(o, u) {
          return o != null && N0(o, u, zI);
        }
        function xp(o, u) {
          return o != null && N0(o, u, $I);
        }
        var mR = _0(function (o, u, c) {
            u != null && typeof u.toString != "function" && (u = Qs.call(u)),
              (o[u] = c);
          }, Ep(dn)),
          vR = _0(function (o, u, c) {
            u != null && typeof u.toString != "function" && (u = Qs.call(u)),
              Ke.call(o, u) ? o[u].push(c) : (o[u] = [c]);
          }, ge),
          yR = Re(wu);
        function Rt(o) {
          return cn(o) ? Wy(o) : Vd(o);
        }
        function fn(o) {
          return cn(o) ? Wy(o, !0) : QI(o);
        }
        function wR(o, u) {
          var c = {};
          return (
            (u = ge(u, 3)),
            Rr(o, function (h, x, b) {
              Zr(c, u(h, x, b), h);
            }),
            c
          );
        }
        function xR(o, u) {
          var c = {};
          return (
            (u = ge(u, 3)),
            Rr(o, function (h, x, b) {
              Zr(c, x, u(h, x, b));
            }),
            c
          );
        }
        var SR = ol(function (o, u, c) {
            aa(o, u, c);
          }),
          g1 = ol(function (o, u, c, h) {
            aa(o, u, c, h);
          }),
          ER = ei(function (o, u) {
            var c = {};
            if (o == null) return c;
            var h = !1;
            (u = ct(u, function (b) {
              return (b = Oi(b, o)), h || (h = b.length > 1), b;
            })),
              Ar(o, op(o), c),
              h && (c = Zn(c, g | v | m, mT));
            for (var x = u.length; x--; ) Xd(c, u[x]);
            return c;
          });
        function CR(o, u) {
          return m1(o, ka(ge(u)));
        }
        var kR = ei(function (o, u) {
          return o == null ? {} : XI(o, u);
        });
        function m1(o, u) {
          if (o == null) return {};
          var c = ct(op(o), function (h) {
            return [h];
          });
          return (
            (u = ge(u)),
            u0(o, c, function (h, x) {
              return u(h, x[0]);
            })
          );
        }
        function bR(o, u, c) {
          u = Oi(u, o);
          var h = -1,
            x = u.length;
          for (x || ((x = 1), (o = n)); ++h < x; ) {
            var b = o == null ? n : o[Dr(u[h])];
            b === n && ((h = x), (b = c)), (o = ni(b) ? b.call(o) : b);
          }
          return o;
        }
        function _R(o, u, c) {
          return o == null ? o : Su(o, u, c);
        }
        function OR(o, u, c, h) {
          return (
            (h = typeof h == "function" ? h : n), o == null ? o : Su(o, u, c, h)
          );
        }
        var v1 = T0(Rt),
          y1 = T0(fn);
        function IR(o, u, c) {
          var h = ke(o),
            x = h || Ti(o) || sl(o);
          if (((u = ge(u, 4)), c == null)) {
            var b = o && o.constructor;
            x
              ? (c = h ? new b() : [])
              : pt(o)
              ? (c = ni(b) ? il(Zs(o)) : {})
              : (c = {});
          }
          return (
            (x ? Qn : Rr)(o, function (P, N, L) {
              return u(c, P, N, L);
            }),
            c
          );
        }
        function TR(o, u) {
          return o == null ? !0 : Xd(o, u);
        }
        function PR(o, u, c) {
          return o == null ? o : d0(o, u, ep(c));
        }
        function RR(o, u, c, h) {
          return (
            (h = typeof h == "function" ? h : n),
            o == null ? o : d0(o, u, ep(c), h)
          );
        }
        function al(o) {
          return o == null ? [] : Ad(o, Rt(o));
        }
        function AR(o) {
          return o == null ? [] : Ad(o, fn(o));
        }
        function DR(o, u, c) {
          return (
            c === n && ((c = u), (u = n)),
            c !== n && ((c = tr(c)), (c = c === c ? c : 0)),
            u !== n && ((u = tr(u)), (u = u === u ? u : 0)),
            yo(tr(o), u, c)
          );
        }
        function NR(o, u, c) {
          return (
            (u = ri(u)),
            c === n ? ((c = u), (u = 0)) : (c = ri(c)),
            (o = tr(o)),
            BI(o, u, c)
          );
        }
        function MR(o, u, c) {
          if (
            (c && typeof c != "boolean" && tn(o, u, c) && (u = c = n),
            c === n &&
              (typeof u == "boolean"
                ? ((c = u), (u = n))
                : typeof o == "boolean" && ((c = o), (o = n))),
            o === n && u === n
              ? ((o = 0), (u = 1))
              : ((o = ri(o)), u === n ? ((u = o), (o = 0)) : (u = ri(u))),
            o > u)
          ) {
            var h = o;
            (o = u), (u = h);
          }
          if (c || o % 1 || u % 1) {
            var x = Hy();
            return Wt(o + x * (u - o + pO("1e-" + ((x + "").length - 1))), u);
          }
          return Kd(o, u);
        }
        var LR = ll(function (o, u, c) {
          return (u = u.toLowerCase()), o + (c ? w1(u) : u);
        });
        function w1(o) {
          return Sp(qe(o).toLowerCase());
        }
        function x1(o) {
          return (o = qe(o)), o && o.replace(z_, _O).replace(rO, "");
        }
        function FR(o, u, c) {
          (o = qe(o)), (u = Tn(u));
          var h = o.length;
          c = c === n ? h : yo(Oe(c), 0, h);
          var x = c;
          return (c -= u.length), c >= 0 && o.slice(c, x) == u;
        }
        function zR(o) {
          return (o = qe(o)), o && y_.test(o) ? o.replace(Xv, OO) : o;
        }
        function $R(o) {
          return (o = qe(o)), o && k_.test(o) ? o.replace(md, "\\$&") : o;
        }
        var BR = ll(function (o, u, c) {
            return o + (c ? "-" : "") + u.toLowerCase();
          }),
          UR = ll(function (o, u, c) {
            return o + (c ? " " : "") + u.toLowerCase();
          }),
          HR = C0("toLowerCase");
        function jR(o, u, c) {
          (o = qe(o)), (u = Oe(u));
          var h = u ? Jo(o) : 0;
          if (!u || h >= u) return o;
          var x = (u - h) / 2;
          return ga(na(x), c) + o + ga(ta(x), c);
        }
        function WR(o, u, c) {
          (o = qe(o)), (u = Oe(u));
          var h = u ? Jo(o) : 0;
          return u && h < u ? o + ga(u - h, c) : o;
        }
        function VR(o, u, c) {
          (o = qe(o)), (u = Oe(u));
          var h = u ? Jo(o) : 0;
          return u && h < u ? ga(u - h, c) + o : o;
        }
        function qR(o, u, c) {
          return (
            c || u == null ? (u = 0) : u && (u = +u),
            JO(qe(o).replace(vd, ""), u || 0)
          );
        }
        function GR(o, u, c) {
          return (
            (c ? tn(o, u, c) : u === n) ? (u = 1) : (u = Oe(u)), Qd(qe(o), u)
          );
        }
        function KR() {
          var o = arguments,
            u = qe(o[0]);
          return o.length < 3 ? u : u.replace(o[1], o[2]);
        }
        var QR = ll(function (o, u, c) {
          return o + (c ? "_" : "") + u.toLowerCase();
        });
        function YR(o, u, c) {
          return (
            c && typeof c != "number" && tn(o, u, c) && (u = c = n),
            (c = c === n ? re : c >>> 0),
            c
              ? ((o = qe(o)),
                o &&
                (typeof u == "string" || (u != null && !yp(u))) &&
                ((u = Tn(u)), !u && Zo(o))
                  ? Ii(gr(o), 0, c)
                  : o.split(u, c))
              : []
          );
        }
        var XR = ll(function (o, u, c) {
          return o + (c ? " " : "") + Sp(u);
        });
        function ZR(o, u, c) {
          return (
            (o = qe(o)),
            (c = c == null ? 0 : yo(Oe(c), 0, o.length)),
            (u = Tn(u)),
            o.slice(c, c + u.length) == u
          );
        }
        function JR(o, u, c) {
          var h = C.templateSettings;
          c && tn(o, u, c) && (u = n), (o = qe(o)), (u = Oa({}, u, h, P0));
          var x = Oa({}, u.imports, h.imports, P0),
            b = Rt(x),
            P = Ad(x, b),
            N,
            L,
            Y = 0,
            X = u.interpolate || Bs,
            ee = "__p += '",
            le = Nd(
              (u.escape || Bs).source +
                "|" +
                X.source +
                "|" +
                (X === Zv ? A_ : Bs).source +
                "|" +
                (u.evaluate || Bs).source +
                "|$",
              "g"
            ),
            fe =
              "//# sourceURL=" +
              (Ke.call(u, "sourceURL")
                ? (u.sourceURL + "").replace(/\s/g, " ")
                : "lodash.templateSources[" + ++sO + "]") +
              `
`;
          o.replace(le, function (ye, Ne, $e, Rn, nn, An) {
            return (
              $e || ($e = Rn),
              (ee += o.slice(Y, An).replace($_, IO)),
              Ne &&
                ((N = !0),
                (ee +=
                  `' +
__e(` +
                  Ne +
                  `) +
'`)),
              nn &&
                ((L = !0),
                (ee +=
                  `';
` +
                  nn +
                  `;
__p += '`)),
              $e &&
                (ee +=
                  `' +
((__t = (` +
                  $e +
                  `)) == null ? '' : __t) +
'`),
              (Y = An + ye.length),
              ye
            );
          }),
            (ee += `';
`);
          var ve = Ke.call(u, "variable") && u.variable;
          if (!ve)
            ee =
              `with (obj) {
` +
              ee +
              `
}
`;
          else if (P_.test(ve)) throw new Ee(a);
          (ee = (L ? ee.replace(cu, "") : ee)
            .replace(hr, "$1")
            .replace(m_, "$1;")),
            (ee =
              "function(" +
              (ve || "obj") +
              `) {
` +
              (ve
                ? ""
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (N ? ", __e = _.escape" : "") +
              (L
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              ee +
              `return __p
}`);
          var Te = E1(function () {
            return We(b, fe + "return " + ee).apply(n, P);
          });
          if (((Te.source = ee), vp(Te))) throw Te;
          return Te;
        }
        function eA(o) {
          return qe(o).toLowerCase();
        }
        function tA(o) {
          return qe(o).toUpperCase();
        }
        function nA(o, u, c) {
          if (((o = qe(o)), o && (c || u === n))) return Ry(o);
          if (!o || !(u = Tn(u))) return o;
          var h = gr(o),
            x = gr(u),
            b = Ay(h, x),
            P = Dy(h, x) + 1;
          return Ii(h, b, P).join("");
        }
        function rA(o, u, c) {
          if (((o = qe(o)), o && (c || u === n))) return o.slice(0, My(o) + 1);
          if (!o || !(u = Tn(u))) return o;
          var h = gr(o),
            x = Dy(h, gr(u)) + 1;
          return Ii(h, 0, x).join("");
        }
        function iA(o, u, c) {
          if (((o = qe(o)), o && (c || u === n))) return o.replace(vd, "");
          if (!o || !(u = Tn(u))) return o;
          var h = gr(o),
            x = Ay(h, gr(u));
          return Ii(h, x).join("");
        }
        function oA(o, u) {
          var c = G,
            h = $;
          if (pt(u)) {
            var x = "separator" in u ? u.separator : x;
            (c = "length" in u ? Oe(u.length) : c),
              (h = "omission" in u ? Tn(u.omission) : h);
          }
          o = qe(o);
          var b = o.length;
          if (Zo(o)) {
            var P = gr(o);
            b = P.length;
          }
          if (c >= b) return o;
          var N = c - Jo(h);
          if (N < 1) return h;
          var L = P ? Ii(P, 0, N).join("") : o.slice(0, N);
          if (x === n) return L + h;
          if ((P && (N += L.length - N), yp(x))) {
            if (o.slice(N).search(x)) {
              var Y,
                X = L;
              for (
                x.global || (x = Nd(x.source, qe(Jv.exec(x)) + "g")),
                  x.lastIndex = 0;
                (Y = x.exec(X));

              )
                var ee = Y.index;
              L = L.slice(0, ee === n ? N : ee);
            }
          } else if (o.indexOf(Tn(x), N) != N) {
            var le = L.lastIndexOf(x);
            le > -1 && (L = L.slice(0, le));
          }
          return L + h;
        }
        function lA(o) {
          return (o = qe(o)), o && v_.test(o) ? o.replace(Yv, MO) : o;
        }
        var uA = ll(function (o, u, c) {
            return o + (c ? " " : "") + u.toUpperCase();
          }),
          Sp = C0("toUpperCase");
        function S1(o, u, c) {
          return (
            (o = qe(o)),
            (u = c ? n : u),
            u === n ? (PO(o) ? zO(o) : SO(o)) : o.match(u) || []
          );
        }
        var E1 = Re(function (o, u) {
            try {
              return On(o, n, u);
            } catch (c) {
              return vp(c) ? c : new Ee(c);
            }
          }),
          sA = ei(function (o, u) {
            return (
              Qn(u, function (c) {
                (c = Dr(c)), Zr(o, c, gp(o[c], o));
              }),
              o
            );
          });
        function aA(o) {
          var u = o == null ? 0 : o.length,
            c = ge();
          return (
            (o = u
              ? ct(o, function (h) {
                  if (typeof h[1] != "function") throw new Yn(s);
                  return [c(h[0]), h[1]];
                })
              : []),
            Re(function (h) {
              for (var x = -1; ++x < u; ) {
                var b = o[x];
                if (On(b[0], this, h)) return On(b[1], this, h);
              }
            })
          );
        }
        function cA(o) {
          return MI(Zn(o, g));
        }
        function Ep(o) {
          return function () {
            return o;
          };
        }
        function fA(o, u) {
          return o == null || o !== o ? u : o;
        }
        var dA = b0(),
          pA = b0(!0);
        function dn(o) {
          return o;
        }
        function Cp(o) {
          return t0(typeof o == "function" ? o : Zn(o, g));
        }
        function hA(o) {
          return r0(Zn(o, g));
        }
        function gA(o, u) {
          return i0(o, Zn(u, g));
        }
        var mA = Re(function (o, u) {
            return function (c) {
              return wu(c, o, u);
            };
          }),
          vA = Re(function (o, u) {
            return function (c) {
              return wu(o, c, u);
            };
          });
        function kp(o, u, c) {
          var h = Rt(u),
            x = sa(u, h);
          c == null &&
            !(pt(u) && (x.length || !h.length)) &&
            ((c = u), (u = o), (o = this), (x = sa(u, Rt(u))));
          var b = !(pt(c) && "chain" in c) || !!c.chain,
            P = ni(o);
          return (
            Qn(x, function (N) {
              var L = u[N];
              (o[N] = L),
                P &&
                  (o.prototype[N] = function () {
                    var Y = this.__chain__;
                    if (b || Y) {
                      var X = o(this.__wrapped__),
                        ee = (X.__actions__ = an(this.__actions__));
                      return (
                        ee.push({ func: L, args: arguments, thisArg: o }),
                        (X.__chain__ = Y),
                        X
                      );
                    }
                    return L.apply(o, Ei([this.value()], arguments));
                  });
            }),
            o
          );
        }
        function yA() {
          return Ft._ === this && (Ft._ = WO), this;
        }
        function bp() {}
        function wA(o) {
          return (
            (o = Oe(o)),
            Re(function (u) {
              return o0(u, o);
            })
          );
        }
        var xA = np(ct),
          SA = np(_y),
          EA = np(Od);
        function C1(o) {
          return ap(o) ? Id(Dr(o)) : ZI(o);
        }
        function CA(o) {
          return function (u) {
            return o == null ? n : wo(o, u);
          };
        }
        var kA = O0(),
          bA = O0(!0);
        function _p() {
          return [];
        }
        function Op() {
          return !1;
        }
        function _A() {
          return {};
        }
        function OA() {
          return "";
        }
        function IA() {
          return !0;
        }
        function TA(o, u) {
          if (((o = Oe(o)), o < 1 || o > H)) return [];
          var c = re,
            h = Wt(o, re);
          (u = ge(u)), (o -= re);
          for (var x = Rd(h, u); ++c < o; ) u(c);
          return x;
        }
        function PA(o) {
          return ke(o) ? ct(o, Dr) : Pn(o) ? [o] : an(j0(qe(o)));
        }
        function RA(o) {
          var u = ++HO;
          return qe(o) + u;
        }
        var AA = ha(function (o, u) {
            return o + u;
          }, 0),
          DA = rp("ceil"),
          NA = ha(function (o, u) {
            return o / u;
          }, 1),
          MA = rp("floor");
        function LA(o) {
          return o && o.length ? ua(o, dn, Hd) : n;
        }
        function FA(o, u) {
          return o && o.length ? ua(o, ge(u, 2), Hd) : n;
        }
        function zA(o) {
          return Ty(o, dn);
        }
        function $A(o, u) {
          return Ty(o, ge(u, 2));
        }
        function BA(o) {
          return o && o.length ? ua(o, dn, qd) : n;
        }
        function UA(o, u) {
          return o && o.length ? ua(o, ge(u, 2), qd) : n;
        }
        var HA = ha(function (o, u) {
            return o * u;
          }, 1),
          jA = rp("round"),
          WA = ha(function (o, u) {
            return o - u;
          }, 0);
        function VA(o) {
          return o && o.length ? Pd(o, dn) : 0;
        }
        function qA(o, u) {
          return o && o.length ? Pd(o, ge(u, 2)) : 0;
        }
        return (
          (C.after = hP),
          (C.ary = e1),
          (C.assign = tR),
          (C.assignIn = h1),
          (C.assignInWith = Oa),
          (C.assignWith = nR),
          (C.at = rR),
          (C.before = t1),
          (C.bind = gp),
          (C.bindAll = sA),
          (C.bindKey = n1),
          (C.castArray = _P),
          (C.chain = X0),
          (C.chunk = MT),
          (C.compact = LT),
          (C.concat = FT),
          (C.cond = aA),
          (C.conforms = cA),
          (C.constant = Ep),
          (C.countBy = V2),
          (C.create = iR),
          (C.curry = r1),
          (C.curryRight = i1),
          (C.debounce = o1),
          (C.defaults = oR),
          (C.defaultsDeep = lR),
          (C.defer = gP),
          (C.delay = mP),
          (C.difference = zT),
          (C.differenceBy = $T),
          (C.differenceWith = BT),
          (C.drop = UT),
          (C.dropRight = HT),
          (C.dropRightWhile = jT),
          (C.dropWhile = WT),
          (C.fill = VT),
          (C.filter = G2),
          (C.flatMap = Y2),
          (C.flatMapDeep = X2),
          (C.flatMapDepth = Z2),
          (C.flatten = G0),
          (C.flattenDeep = qT),
          (C.flattenDepth = GT),
          (C.flip = vP),
          (C.flow = dA),
          (C.flowRight = pA),
          (C.fromPairs = KT),
          (C.functions = pR),
          (C.functionsIn = hR),
          (C.groupBy = J2),
          (C.initial = YT),
          (C.intersection = XT),
          (C.intersectionBy = ZT),
          (C.intersectionWith = JT),
          (C.invert = mR),
          (C.invertBy = vR),
          (C.invokeMap = tP),
          (C.iteratee = Cp),
          (C.keyBy = nP),
          (C.keys = Rt),
          (C.keysIn = fn),
          (C.map = Sa),
          (C.mapKeys = wR),
          (C.mapValues = xR),
          (C.matches = hA),
          (C.matchesProperty = gA),
          (C.memoize = Ca),
          (C.merge = SR),
          (C.mergeWith = g1),
          (C.method = mA),
          (C.methodOf = vA),
          (C.mixin = kp),
          (C.negate = ka),
          (C.nthArg = wA),
          (C.omit = ER),
          (C.omitBy = CR),
          (C.once = yP),
          (C.orderBy = rP),
          (C.over = xA),
          (C.overArgs = wP),
          (C.overEvery = SA),
          (C.overSome = EA),
          (C.partial = mp),
          (C.partialRight = l1),
          (C.partition = iP),
          (C.pick = kR),
          (C.pickBy = m1),
          (C.property = C1),
          (C.propertyOf = CA),
          (C.pull = r2),
          (C.pullAll = Q0),
          (C.pullAllBy = i2),
          (C.pullAllWith = o2),
          (C.pullAt = l2),
          (C.range = kA),
          (C.rangeRight = bA),
          (C.rearg = xP),
          (C.reject = uP),
          (C.remove = u2),
          (C.rest = SP),
          (C.reverse = pp),
          (C.sampleSize = aP),
          (C.set = _R),
          (C.setWith = OR),
          (C.shuffle = cP),
          (C.slice = s2),
          (C.sortBy = pP),
          (C.sortedUniq = g2),
          (C.sortedUniqBy = m2),
          (C.split = YR),
          (C.spread = EP),
          (C.tail = v2),
          (C.take = y2),
          (C.takeRight = w2),
          (C.takeRightWhile = x2),
          (C.takeWhile = S2),
          (C.tap = L2),
          (C.throttle = CP),
          (C.thru = xa),
          (C.toArray = f1),
          (C.toPairs = v1),
          (C.toPairsIn = y1),
          (C.toPath = PA),
          (C.toPlainObject = p1),
          (C.transform = IR),
          (C.unary = kP),
          (C.union = E2),
          (C.unionBy = C2),
          (C.unionWith = k2),
          (C.uniq = b2),
          (C.uniqBy = _2),
          (C.uniqWith = O2),
          (C.unset = TR),
          (C.unzip = hp),
          (C.unzipWith = Y0),
          (C.update = PR),
          (C.updateWith = RR),
          (C.values = al),
          (C.valuesIn = AR),
          (C.without = I2),
          (C.words = S1),
          (C.wrap = bP),
          (C.xor = T2),
          (C.xorBy = P2),
          (C.xorWith = R2),
          (C.zip = A2),
          (C.zipObject = D2),
          (C.zipObjectDeep = N2),
          (C.zipWith = M2),
          (C.entries = v1),
          (C.entriesIn = y1),
          (C.extend = h1),
          (C.extendWith = Oa),
          kp(C, C),
          (C.add = AA),
          (C.attempt = E1),
          (C.camelCase = LR),
          (C.capitalize = w1),
          (C.ceil = DA),
          (C.clamp = DR),
          (C.clone = OP),
          (C.cloneDeep = TP),
          (C.cloneDeepWith = PP),
          (C.cloneWith = IP),
          (C.conformsTo = RP),
          (C.deburr = x1),
          (C.defaultTo = fA),
          (C.divide = NA),
          (C.endsWith = FR),
          (C.eq = vr),
          (C.escape = zR),
          (C.escapeRegExp = $R),
          (C.every = q2),
          (C.find = K2),
          (C.findIndex = V0),
          (C.findKey = uR),
          (C.findLast = Q2),
          (C.findLastIndex = q0),
          (C.findLastKey = sR),
          (C.floor = MA),
          (C.forEach = Z0),
          (C.forEachRight = J0),
          (C.forIn = aR),
          (C.forInRight = cR),
          (C.forOwn = fR),
          (C.forOwnRight = dR),
          (C.get = wp),
          (C.gt = AP),
          (C.gte = DP),
          (C.has = gR),
          (C.hasIn = xp),
          (C.head = K0),
          (C.identity = dn),
          (C.includes = eP),
          (C.indexOf = QT),
          (C.inRange = NR),
          (C.invoke = yR),
          (C.isArguments = Eo),
          (C.isArray = ke),
          (C.isArrayBuffer = NP),
          (C.isArrayLike = cn),
          (C.isArrayLikeObject = Et),
          (C.isBoolean = MP),
          (C.isBuffer = Ti),
          (C.isDate = LP),
          (C.isElement = FP),
          (C.isEmpty = zP),
          (C.isEqual = $P),
          (C.isEqualWith = BP),
          (C.isError = vp),
          (C.isFinite = UP),
          (C.isFunction = ni),
          (C.isInteger = u1),
          (C.isLength = ba),
          (C.isMap = s1),
          (C.isMatch = HP),
          (C.isMatchWith = jP),
          (C.isNaN = WP),
          (C.isNative = VP),
          (C.isNil = GP),
          (C.isNull = qP),
          (C.isNumber = a1),
          (C.isObject = pt),
          (C.isObjectLike = wt),
          (C.isPlainObject = bu),
          (C.isRegExp = yp),
          (C.isSafeInteger = KP),
          (C.isSet = c1),
          (C.isString = _a),
          (C.isSymbol = Pn),
          (C.isTypedArray = sl),
          (C.isUndefined = QP),
          (C.isWeakMap = YP),
          (C.isWeakSet = XP),
          (C.join = e2),
          (C.kebabCase = BR),
          (C.last = er),
          (C.lastIndexOf = t2),
          (C.lowerCase = UR),
          (C.lowerFirst = HR),
          (C.lt = ZP),
          (C.lte = JP),
          (C.max = LA),
          (C.maxBy = FA),
          (C.mean = zA),
          (C.meanBy = $A),
          (C.min = BA),
          (C.minBy = UA),
          (C.stubArray = _p),
          (C.stubFalse = Op),
          (C.stubObject = _A),
          (C.stubString = OA),
          (C.stubTrue = IA),
          (C.multiply = HA),
          (C.nth = n2),
          (C.noConflict = yA),
          (C.noop = bp),
          (C.now = Ea),
          (C.pad = jR),
          (C.padEnd = WR),
          (C.padStart = VR),
          (C.parseInt = qR),
          (C.random = MR),
          (C.reduce = oP),
          (C.reduceRight = lP),
          (C.repeat = GR),
          (C.replace = KR),
          (C.result = bR),
          (C.round = jA),
          (C.runInContext = M),
          (C.sample = sP),
          (C.size = fP),
          (C.snakeCase = QR),
          (C.some = dP),
          (C.sortedIndex = a2),
          (C.sortedIndexBy = c2),
          (C.sortedIndexOf = f2),
          (C.sortedLastIndex = d2),
          (C.sortedLastIndexBy = p2),
          (C.sortedLastIndexOf = h2),
          (C.startCase = XR),
          (C.startsWith = ZR),
          (C.subtract = WA),
          (C.sum = VA),
          (C.sumBy = qA),
          (C.template = JR),
          (C.times = TA),
          (C.toFinite = ri),
          (C.toInteger = Oe),
          (C.toLength = d1),
          (C.toLower = eA),
          (C.toNumber = tr),
          (C.toSafeInteger = eR),
          (C.toString = qe),
          (C.toUpper = tA),
          (C.trim = nA),
          (C.trimEnd = rA),
          (C.trimStart = iA),
          (C.truncate = oA),
          (C.unescape = lA),
          (C.uniqueId = RA),
          (C.upperCase = uA),
          (C.upperFirst = Sp),
          (C.each = Z0),
          (C.eachRight = J0),
          (C.first = K0),
          kp(
            C,
            (function () {
              var o = {};
              return (
                Rr(C, function (u, c) {
                  Ke.call(C.prototype, c) || (o[c] = u);
                }),
                o
              );
            })(),
            { chain: !1 }
          ),
          (C.VERSION = r),
          Qn(
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
          Qn(["drop", "take"], function (o, u) {
            (Le.prototype[o] = function (c) {
              c = c === n ? 1 : It(Oe(c), 0);
              var h = this.__filtered__ && !u ? new Le(this) : this.clone();
              return (
                h.__filtered__
                  ? (h.__takeCount__ = Wt(c, h.__takeCount__))
                  : h.__views__.push({
                      size: Wt(c, re),
                      type: o + (h.__dir__ < 0 ? "Right" : ""),
                    }),
                h
              );
            }),
              (Le.prototype[o + "Right"] = function (c) {
                return this.reverse()[o](c).reverse();
              });
          }),
          Qn(["filter", "map", "takeWhile"], function (o, u) {
            var c = u + 1,
              h = c == U || c == ue;
            Le.prototype[o] = function (x) {
              var b = this.clone();
              return (
                b.__iteratees__.push({ iteratee: ge(x, 3), type: c }),
                (b.__filtered__ = b.__filtered__ || h),
                b
              );
            };
          }),
          Qn(["head", "last"], function (o, u) {
            var c = "take" + (u ? "Right" : "");
            Le.prototype[o] = function () {
              return this[c](1).value()[0];
            };
          }),
          Qn(["initial", "tail"], function (o, u) {
            var c = "drop" + (u ? "" : "Right");
            Le.prototype[o] = function () {
              return this.__filtered__ ? new Le(this) : this[c](1);
            };
          }),
          (Le.prototype.compact = function () {
            return this.filter(dn);
          }),
          (Le.prototype.find = function (o) {
            return this.filter(o).head();
          }),
          (Le.prototype.findLast = function (o) {
            return this.reverse().find(o);
          }),
          (Le.prototype.invokeMap = Re(function (o, u) {
            return typeof o == "function"
              ? new Le(this)
              : this.map(function (c) {
                  return wu(c, o, u);
                });
          })),
          (Le.prototype.reject = function (o) {
            return this.filter(ka(ge(o)));
          }),
          (Le.prototype.slice = function (o, u) {
            o = Oe(o);
            var c = this;
            return c.__filtered__ && (o > 0 || u < 0)
              ? new Le(c)
              : (o < 0 ? (c = c.takeRight(-o)) : o && (c = c.drop(o)),
                u !== n &&
                  ((u = Oe(u)), (c = u < 0 ? c.dropRight(-u) : c.take(u - o))),
                c);
          }),
          (Le.prototype.takeRightWhile = function (o) {
            return this.reverse().takeWhile(o).reverse();
          }),
          (Le.prototype.toArray = function () {
            return this.take(re);
          }),
          Rr(Le.prototype, function (o, u) {
            var c = /^(?:filter|find|map|reject)|While$/.test(u),
              h = /^(?:head|last)$/.test(u),
              x = C[h ? "take" + (u == "last" ? "Right" : "") : u],
              b = h || /^find/.test(u);
            x &&
              (C.prototype[u] = function () {
                var P = this.__wrapped__,
                  N = h ? [1] : arguments,
                  L = P instanceof Le,
                  Y = N[0],
                  X = L || ke(P),
                  ee = function (Ne) {
                    var $e = x.apply(C, Ei([Ne], N));
                    return h && le ? $e[0] : $e;
                  };
                X &&
                  c &&
                  typeof Y == "function" &&
                  Y.length != 1 &&
                  (L = X = !1);
                var le = this.__chain__,
                  fe = !!this.__actions__.length,
                  ve = b && !le,
                  Te = L && !fe;
                if (!b && X) {
                  P = Te ? P : new Le(this);
                  var ye = o.apply(P, N);
                  return (
                    ye.__actions__.push({ func: xa, args: [ee], thisArg: n }),
                    new Xn(ye, le)
                  );
                }
                return ve && Te
                  ? o.apply(this, N)
                  : ((ye = this.thru(ee)),
                    ve ? (h ? ye.value()[0] : ye.value()) : ye);
              });
          }),
          Qn(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (o) {
              var u = qs[o],
                c = /^(?:push|sort|unshift)$/.test(o) ? "tap" : "thru",
                h = /^(?:pop|shift)$/.test(o);
              C.prototype[o] = function () {
                var x = arguments;
                if (h && !this.__chain__) {
                  var b = this.value();
                  return u.apply(ke(b) ? b : [], x);
                }
                return this[c](function (P) {
                  return u.apply(ke(P) ? P : [], x);
                });
              };
            }
          ),
          Rr(Le.prototype, function (o, u) {
            var c = C[u];
            if (c) {
              var h = c.name + "";
              Ke.call(rl, h) || (rl[h] = []), rl[h].push({ name: u, func: c });
            }
          }),
          (rl[pa(n, y).name] = [{ name: "wrapper", func: n }]),
          (Le.prototype.clone = lI),
          (Le.prototype.reverse = uI),
          (Le.prototype.value = sI),
          (C.prototype.at = F2),
          (C.prototype.chain = z2),
          (C.prototype.commit = $2),
          (C.prototype.next = B2),
          (C.prototype.plant = H2),
          (C.prototype.reverse = j2),
          (C.prototype.toJSON = C.prototype.valueOf = C.prototype.value = W2),
          (C.prototype.first = C.prototype.head),
          du && (C.prototype[du] = U2),
          C
        );
      },
      el = $O();
    ho ? (((ho.exports = el)._ = el), (Cd._ = el)) : (Ft._ = el);
  }).call(_u);
})(Kc, Kc.exports);
var bk = Kc.exports;
const St = {
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
  plastic: {
    name: "plastic",
    close: !1,
    label: "Plastico",
    stack: !1,
    usable: !1,
    count: 0,
  },
  dollars: {
    name: "dollars",
    close: !1,
    label: "Dinheiro",
    stack: !1,
    usable: !1,
    count: 0,
  },
};
let dc = "https://api.rebornsystem.com.br/imagens";
function rF(e) {
  e && e !== "" && (dc = e);
}
const _k = () => !window.invokeNative,
  Ok = () => {},
  iF = window.GetParentResourceName
    ? window.GetParentResourceName()
    : "ox_inventory";
async function _r(e, t) {
  if (!_k())
    try {
      return await (
        await fetch(`https://${iF}/${e}`, {
          method: "post",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify(t),
        })
      ).json();
    } catch (n) {
      throw Error(`Failed to fetch NUI callback ${e}! (${n})`);
    }
}
const lx = (e, t) => {
    if (t.type !== "shop" || !gn(e)) return !0;
    if (e.count !== void 0 && e.count === 0) return !1;
    if (e.grade === void 0 || !t.groups) return !0;
    const n = Mn.getState().inventory.leftInventory;
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
  ux = (e, t) => {
    if (!gn(e) || t !== "crafting" || !e.ingredients) return !0;
    const n = Mn.getState().inventory.leftInventory;
    return (
      Object.entries(e.ingredients).filter((l) => {
        const [s, a] = [l[0], l[1]],
          f = St[s];
        return a >= 1 && f && f.count >= a
          ? !1
          : !n.items.find((p) => {
              if (gn(p) && p.name === s && a < 1)
                return p.metadata?.durability >= a * 100;
            });
      }).length === 0
    );
  },
  gn = (e, t = !1) =>
    (e.name !== void 0 && e.weight !== void 0) ||
    (t && e.name !== void 0 && e.count !== void 0 && e.weight !== void 0),
  oF = (e, t) => e.name === t.name && bk.isEqual(e.metadata, t.metadata),
  lF = (e, t, n) =>
    t.stack
      ? n.find(
          (i) => i.name === e.name && bk.isEqual(i.metadata, e.metadata)
        ) || n.find((i) => i.name === void 0)
      : n.find((i) => i.name === void 0),
  Yf = (e, t, n) => ({
    sourceInventory: t === Xt.PLAYER ? e.leftInventory : e.rightInventory,
    targetInventory: n
      ? n === Xt.PLAYER
        ? e.leftInventory
        : e.rightInventory
      : t === Xt.PLAYER
      ? e.rightInventory
      : e.leftInventory,
  }),
  Ql = (e, t) => {
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
  Ik = (e) => e.reduce((t, n) => (gn(n) ? t + n.weight : t), 0),
  sx = async (e) => {
    const t = await _r("getItemData", e);
    if (t?.name) return (St[e] = t), t;
  },
  jr = (e) => {
    const t = typeof e == "object";
    if (t) {
      if (!e.name) return;
      const i = e.metadata;
      if (i?.imageurl) return `${i.imageurl}`;
      if (i?.image) return `${dc}/${i.image}.png`;
    }
    const n = t ? e.name : e,
      r = St[n];
    return r
      ? (r.image || (r.image = `${dc}/${n}.png`), r.image)
      : `${dc}/${n}.png`;
  },
  uF = (e, t) => {
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
              (typeof St[a.name] > "u" && sx(a.name),
              (a.durability = Ql(a.metadata, i))),
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
                (typeof St[a.name] > "u" && sx(a.name),
                (a.durability = Ql(a.metadata, i))),
              a
            );
          }),
        }),
      (e.isBusy = !1);
  },
  sF = (e, t) => {
    if (t.payload.items) {
      Array.isArray(t.payload.items) || (t.payload.items = [t.payload.items]);
      const n = Math.floor(Date.now() / 1e3);
      Object.values(t.payload.items)
        .filter((r) => !!r)
        .forEach((r) => {
          const i =
            r.inventory && r.inventory !== Xt.PLAYER
              ? e.rightInventory
              : e.leftInventory;
          (r.item.durability = Ql(r.item.metadata, n)),
            (i.items[r.item.slot - 1] = r.item);
        }),
        e.rightInventory.type === Xt.CRAFTING &&
          (e.rightInventory = { ...e.rightInventory });
    }
    if (t.payload.itemCount) {
      const n = Object.entries(t.payload.itemCount);
      for (let r = 0; r < n.length; r++) {
        const i = n[r][0],
          l = n[r][1];
        St[i]
          ? (St[i].count += l)
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
        Sv.caseReducers.setupInventory(e, {
          type: "setupInventory",
          payload: {
            leftInventory: i === "leftInventory" ? e[i] : void 0,
            rightInventory: i === "rightInventory" ? e[i] : void 0,
          },
        });
    }
  },
  aF = (e, t) => {
    const { fromSlot: n, fromType: r, toSlot: i, toType: l } = t.payload,
      { sourceInventory: s, targetInventory: a } = Yf(e, r, l),
      f = Math.floor(Date.now() / 1e3);
    [s.items[n.slot - 1], a.items[i.slot - 1]] = [
      { ...a.items[i.slot - 1], slot: n.slot, durability: Ql(i.metadata, f) },
      { ...s.items[n.slot - 1], slot: i.slot, durability: Ql(n.metadata, f) },
    ];
  },
  cF = (e, t) => {
    const {
        fromSlot: n,
        fromType: r,
        toSlot: i,
        toType: l,
        count: s,
      } = t.payload,
      { sourceInventory: a, targetInventory: f } = Yf(e, r, l),
      d = n.weight / n.count;
    (f.items[i.slot - 1] = {
      ...f.items[i.slot - 1],
      count: i.count + s,
      weight: d * (i.count + s),
    }),
      !(r === Xt.SHOP || r === Xt.CRAFTING) &&
        (a.items[n.slot - 1] =
          n.count - s > 0
            ? {
                ...a.items[n.slot - 1],
                count: n.count - s,
                weight: d * (n.count - s),
              }
            : { slot: n.slot });
  },
  fF = (e, t) => {
    const {
        fromSlot: n,
        fromType: r,
        toSlot: i,
        toType: l,
        count: s,
      } = t.payload,
      { sourceInventory: a, targetInventory: f } = Yf(e, r, l),
      d = n.weight / n.count,
      p = Math.floor(Date.now() / 1e3),
      g = a.items[n.slot - 1];
    (f.items[i.slot - 1] = {
      ...g,
      count: s,
      weight: d * s,
      slot: i.slot,
      durability: Ql(g.metadata, p),
    }),
      !(r === Xt.SHOP || r === Xt.CRAFTING) &&
        (a.items[n.slot - 1] =
          n.count - s > 0
            ? {
                ...a.items[n.slot - 1],
                count: n.count - s,
                weight: d * (n.count - s),
              }
            : { slot: n.slot });
  },
  dF = {
    leftInventory: { id: "", type: "", slots: 0, maxWeight: 0, items: [] },
    rightInventory: { id: "", type: "", slots: 0, maxWeight: 0, items: [] },
    additionalMetadata: new Array(),
    itemAmount: 0,
    shiftPressed: !1,
    isBusy: !1,
  },
  Sv = gv({
    name: "inventory",
    initialState: dF,
    reducers: {
      stackSlots: cF,
      swapSlots: aF,
      setupInventory: uF,
      moveSlots: fF,
      refreshSlots: sF,
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
      e.addMatcher(Ek, (t) => {
        (t.isBusy = !0),
          (t.history = {
            leftInventory: Dg(t.leftInventory),
            rightInventory: Dg(t.rightInventory),
          });
      }),
        e.addMatcher(kk, (t) => {
          t.isBusy = !1;
        }),
        e.addMatcher(Ck, (t) => {
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
    setAdditionalMetadata: pF,
    setItemAmount: hF,
    setShiftPressed: gF,
    setupInventory: Tk,
    swapSlots: mF,
    moveSlots: vF,
    stackSlots: yF,
    refreshSlots: wF,
    setContainerWeight: xF,
  } = Sv.actions,
  Pk = (e) => e.inventory.leftInventory,
  SF = (e) => e.inventory.rightInventory,
  EF = (e) => e.inventory.itemAmount,
  CF = Sv.reducer,
  kF = { open: !1, item: null, inventoryType: null },
  Rk = gv({
    name: "tooltip",
    initialState: kF,
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
  { openTooltip: bF, closeTooltip: ts } = Rk.actions,
  _F = Rk.reducer,
  OF = { coords: null, item: null },
  Ak = gv({
    name: "contextMenu",
    initialState: OF,
    reducers: {
      openContextMenu(e, t) {
        (e.coords = t.payload.coords), (e.item = t.payload.item);
      },
      closeContextMenu(e) {
        e.coords = null;
      },
    },
  }),
  { openContextMenu: IF, closeContextMenu: Dk } = Ak.actions,
  TF = Ak.reducer,
  Mn = qL({ reducer: { inventory: CF, tooltip: _F, contextMenu: TF } }),
  lu = () => cM(),
  yi = q3,
  zr = (e, t) => {
    const n = I.useRef(Ok);
    I.useEffect(() => {
      n.current = t;
    }, [t]),
      I.useEffect(() => {
        const r = (i) => {
          const { action: l, data: s } = i.data;
          n.current && l === e && n.current(s);
        };
        return (
          window.addEventListener("message", r),
          () => window.removeEventListener("message", r)
        );
      }, [e]);
  };
function Lg(e, t) {
  return (
    (Lg = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, r) {
          return (n.__proto__ = r), n;
        }),
    Lg(e, t)
  );
}
function Ev(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Lg(e, t);
}
var Nk = { exports: {} },
  PF = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  RF = PF,
  AF = RF;
function Mk() {}
function Lk() {}
Lk.resetWarningCache = Mk;
var DF = function () {
  function e(r, i, l, s, a, f) {
    if (f !== AF) {
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
    checkPropTypes: Lk,
    resetWarningCache: Mk,
  };
  return (n.PropTypes = n), n;
};
Nk.exports = DF();
var NF = Nk.exports;
const Ce = uo(NF);
function MF(e, t) {
  return e.classList
    ? !!t && e.classList.contains(t)
    : (" " + (e.className.baseVal || e.className) + " ").indexOf(
        " " + t + " "
      ) !== -1;
}
function LF(e, t) {
  e.classList
    ? e.classList.add(t)
    : MF(e, t) ||
      (typeof e.className == "string"
        ? (e.className = e.className + " " + t)
        : e.setAttribute(
            "class",
            ((e.className && e.className.baseVal) || "") + " " + t
          ));
}
function ax(e, t) {
  return e
    .replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1")
    .replace(/\s+/g, " ")
    .replace(/^\s*|\s*$/g, "");
}
function FF(e, t) {
  e.classList
    ? e.classList.remove(t)
    : typeof e.className == "string"
    ? (e.className = ax(e.className, t))
    : e.setAttribute(
        "class",
        ax((e.className && e.className.baseVal) || "", t)
      );
}
const cx = { disabled: !1 },
  Qc = Ae.createContext(null);
var Fk = function (t) {
    return t.scrollTop;
  },
  Hu = "unmounted",
  _o = "exited",
  Oo = "entering",
  gl = "entered",
  Fg = "exiting",
  wi = (function (e) {
    Ev(t, e);
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
            ? ((f = _o), (l.appearStatus = Oo))
            : (f = gl)
          : r.unmountOnExit || r.mountOnEnter
          ? (f = Hu)
          : (f = _o),
        (l.state = { status: f }),
        (l.nextCallback = null),
        l
      );
    }
    t.getDerivedStateFromProps = function (i, l) {
      var s = i.in;
      return s && l.status === Hu ? { status: _o } : null;
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
            ? s !== Oo && s !== gl && (l = Oo)
            : (s === Oo || s === gl) && (l = Fg);
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
          if ((this.cancelNextCallback(), l === Oo)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef
                ? this.props.nodeRef.current
                : Va.findDOMNode(this);
              s && Fk(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === _o &&
            this.setState({ status: Hu });
      }),
      (n.performEnter = function (i) {
        var l = this,
          s = this.props.enter,
          a = this.context ? this.context.isMounting : i,
          f = this.props.nodeRef ? [a] : [Va.findDOMNode(this), a],
          d = f[0],
          p = f[1],
          g = this.getTimeouts(),
          v = a ? g.appear : g.enter;
        if ((!i && !s) || cx.disabled) {
          this.safeSetState({ status: gl }, function () {
            l.props.onEntered(d);
          });
          return;
        }
        this.props.onEnter(d, p),
          this.safeSetState({ status: Oo }, function () {
            l.props.onEntering(d, p),
              l.onTransitionEnd(v, function () {
                l.safeSetState({ status: gl }, function () {
                  l.props.onEntered(d, p);
                });
              });
          });
      }),
      (n.performExit = function () {
        var i = this,
          l = this.props.exit,
          s = this.getTimeouts(),
          a = this.props.nodeRef ? void 0 : Va.findDOMNode(this);
        if (!l || cx.disabled) {
          this.safeSetState({ status: _o }, function () {
            i.props.onExited(a);
          });
          return;
        }
        this.props.onExit(a),
          this.safeSetState({ status: Fg }, function () {
            i.props.onExiting(a),
              i.onTransitionEnd(s.exit, function () {
                i.safeSetState({ status: _o }, function () {
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
            : Va.findDOMNode(this),
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
        if (i === Hu) return null;
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
        var a = Ym(l, [
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
        return Ae.createElement(
          Qc.Provider,
          { value: null },
          typeof s == "function"
            ? s(i, a)
            : Ae.cloneElement(Ae.Children.only(s), a)
        );
      }),
      t
    );
  })(Ae.Component);
wi.contextType = Qc;
wi.propTypes = {};
function dl() {}
wi.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: dl,
  onEntering: dl,
  onEntered: dl,
  onExit: dl,
  onExiting: dl,
  onExited: dl,
};
wi.UNMOUNTED = Hu;
wi.EXITED = _o;
wi.ENTERING = Oo;
wi.ENTERED = gl;
wi.EXITING = Fg;
const zF = wi;
var $F = function (t, n) {
    return (
      t &&
      n &&
      n.split(" ").forEach(function (r) {
        return LF(t, r);
      })
    );
  },
  dh = function (t, n) {
    return (
      t &&
      n &&
      n.split(" ").forEach(function (r) {
        return FF(t, r);
      })
    );
  },
  Cv = (function (e) {
    Ev(t, e);
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
          s === "active" && i && Fk(i),
          a && ((this.appliedClasses[l][s] = a), $F(i, a));
      }),
      (n.removeClasses = function (i, l) {
        var s = this.appliedClasses[l],
          a = s.base,
          f = s.active,
          d = s.done;
        (this.appliedClasses[l] = {}),
          a && dh(i, a),
          f && dh(i, f),
          d && dh(i, d);
      }),
      (n.render = function () {
        var i = this.props;
        i.classNames;
        var l = Ym(i, ["classNames"]);
        return Ae.createElement(
          zF,
          Bc({}, l, {
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
  })(Ae.Component);
Cv.defaultProps = { classNames: "" };
Cv.propTypes = {};
const zk = Cv;
function BF(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function kv(e, t) {
  var n = function (l) {
      return t && I.isValidElement(l) ? t(l) : l;
    },
    r = Object.create(null);
  return (
    e &&
      I.Children.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = n(i);
      }),
    r
  );
}
function UF(e, t) {
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
function Ao(e, t, n) {
  return n[t] != null ? n[t] : e.props[t];
}
function HF(e, t) {
  return kv(e.children, function (n) {
    return I.cloneElement(n, {
      onExited: t.bind(null, n),
      in: !0,
      appear: Ao(n, "appear", e),
      enter: Ao(n, "enter", e),
      exit: Ao(n, "exit", e),
    });
  });
}
function jF(e, t, n) {
  var r = kv(e.children),
    i = UF(t, r);
  return (
    Object.keys(i).forEach(function (l) {
      var s = i[l];
      if (I.isValidElement(s)) {
        var a = l in t,
          f = l in r,
          d = t[l],
          p = I.isValidElement(d) && !d.props.in;
        f && (!a || p)
          ? (i[l] = I.cloneElement(s, {
              onExited: n.bind(null, s),
              in: !0,
              exit: Ao(s, "exit", e),
              enter: Ao(s, "enter", e),
            }))
          : !f && a && !p
          ? (i[l] = I.cloneElement(s, { in: !1 }))
          : f &&
            a &&
            I.isValidElement(d) &&
            (i[l] = I.cloneElement(s, {
              onExited: n.bind(null, s),
              in: d.props.in,
              exit: Ao(s, "exit", e),
              enter: Ao(s, "enter", e),
            }));
      }
    }),
    i
  );
}
var WF =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  VF = {
    component: "div",
    childFactory: function (t) {
      return t;
    },
  },
  bv = (function (e) {
    Ev(t, e);
    function t(r, i) {
      var l;
      l = e.call(this, r, i) || this;
      var s = l.handleExited.bind(BF(l));
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
        return { children: f ? HF(i, a) : jF(i, s, a), firstRender: !1 };
      }),
      (n.handleExited = function (i, l) {
        var s = kv(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(l),
          this.mounted &&
            this.setState(function (a) {
              var f = Bc({}, a.children);
              return delete f[i.key], { children: f };
            }));
      }),
      (n.render = function () {
        var i = this.props,
          l = i.component,
          s = i.childFactory,
          a = Ym(i, ["component", "childFactory"]),
          f = this.state.contextValue,
          d = WF(this.state.children).map(s);
        return (
          delete a.appear,
          delete a.enter,
          delete a.exit,
          l === null
            ? Ae.createElement(Qc.Provider, { value: f }, d)
            : Ae.createElement(
                Qc.Provider,
                { value: f },
                Ae.createElement(l, a, d)
              )
        );
      }),
      t
    );
  })(Ae.Component);
bv.propTypes = {};
bv.defaultProps = VF;
const qF = bv,
  GF = (e) => {
    const t = I.useRef(null);
    return W(zk, {
      nodeRef: t,
      in: e.in,
      timeout: 200,
      classNames: "transition-slide-up",
      unmountOnExit: !0,
      children: Ae.cloneElement(e.children, { ref: t }),
    });
  },
  KF = () => {
    const [e, t] = I.useState(!1),
      n = yi(Pk).items.slice(0, 5),
      [r, i] = I.useState();
    return (
      zr("toggleHotbar", () => {
        e
          ? t(!1)
          : (r && clearTimeout(r), t(!0), i(setTimeout(() => t(!1), 3e3)));
      }),
      W(GF, {
        in: e,
        children: W("div", {
          className: "hotbar-container",
          children: n.map((l, s) =>
            W(
              "div",
              {
                className: "hotbar-item-slot",
                children: W("div", {
                  className: "hotbar-item-slot-hex",
                  style: { backgroundImage: `url(${jr("hexagono")})` },
                  children: we("div", {
                    className: "hotbar-item-container",
                    children: [
                      W("div", {
                        className: "hotbar-item-slot-number",
                        children: s + 1,
                      }),
                      W("div", {
                        className: "hotbar-item-image",
                        style: { backgroundImage: `url(${jr(l) || "none"}` },
                      }),
                      W("div", {
                        className: "hotbar-item-slot-quantity",
                        children: l.count,
                      }),
                    ],
                  }),
                }),
              },
              `hotbar-${l.slot}`
            )
          ),
        }),
      })
    );
  },
  QF = ["Escape"],
  YF = (e) => {
    const t = I.useRef(Ok),
      n = lu();
    I.useEffect(() => {
      t.current = e;
    }, [e]),
      I.useEffect(() => {
        const r = (i) => {
          QF.includes(i.code) && (t.current(!1), n(ts()), n(Dk()), _r("exit"));
        };
        return (
          window.addEventListener("keyup", r),
          () => window.removeEventListener("keyup", r)
        );
      }, []);
  },
  ph = (e, t, n) => {
    let r = e * n,
      i = t * (1 - n);
    return r + i;
  },
  qa = (e, t, n) => {
    let r = ph(e[0], t[0], n),
      i = ph(e[1], t[1], n),
      l = ph(e[2], t[2], n);
    return `rgb(${r}, ${i}, ${l})`;
  },
  Ri = {
    primaryColor: [231, 76, 60],
    secondColor: [39, 174, 96],
    accentColor: [211, 84, 0],
  },
  XF = ({ percent: e, durability: t }) => {
    const n = I.useMemo(
      () =>
        t
          ? e < 50
            ? qa(Ri.accentColor, Ri.primaryColor, e / 100)
            : qa(Ri.secondColor, Ri.accentColor, e / 100)
          : e > 50
          ? qa(Ri.primaryColor, Ri.accentColor, e / 100)
          : qa(Ri.accentColor, Ri.secondColor, e / 50),
      [t, e]
    );
    return W("div", {
      className: t ? "durability-bar" : "weight-bar",
      children: W("div", {
        style: {
          visibility: e > 0 ? "visible" : "hidden",
          height: "100%",
          width: `${e}%`,
          backgroundColor: n,
          transition: `background ${0.3}s ease, width ${0.3}s ease`,
        },
      }),
    });
  },
  ZF = mv(
    "inventory/validateMove",
    async (e, { rejectWithValue: t, dispatch: n }) => {
      try {
        const r = await _r("swapItems", e);
        if (r === !1) return t(r);
        typeof r == "number" && n(xF(r));
      } catch {
        return t(!1);
      }
    }
  ),
  zg = (e, t) => {
    const { inventory: n } = Mn.getState(),
      { sourceInventory: r, targetInventory: i } = Yf(
        n,
        e.inventory,
        t?.inventory
      ),
      l = r.items[e.item.slot - 1],
      s = St[l.name];
    if (s === void 0) return console.error(`${l.name} item data undefined!`);
    if (l.metadata?.container !== void 0) {
      if (i.type === Xt.CONTAINER)
        return console.log(
          `Cannot store container ${l.name} inside another container`
        );
      if (n.rightInventory.id === l.metadata.container)
        return console.log(`Cannot move container ${l.name} when opened`);
    }
    const a = t ? i.items[t.item.slot - 1] : lF(l, s, i.items);
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
          ? l.count
          : n.itemAmount === 0 || n.itemAmount > l.count
          ? 1
          : n.itemAmount,
      d = {
        fromSlot: l,
        toSlot: a,
        fromType: r.type,
        toType: i.type,
        count: f,
      };
    Mn.dispatch(ZF({ ...d, fromSlot: l.slot, toSlot: a.slot })),
      gn(a, !0)
        ? s.stack && oF(l, a)
          ? Mn.dispatch(yF({ ...d, toSlot: a }))
          : Mn.dispatch(mF({ ...d, toSlot: a }))
        : Mn.dispatch(vF(d));
  },
  JF = mv("inventory/buyItem", async (e, { rejectWithValue: t }) => {
    try {
      const n = await _r("buyItem", e);
      if (n === !1) return t(n);
    } catch {
      return t(!1);
    }
  }),
  fx = (e, t) => {
    const { inventory: n } = Mn.getState(),
      r = n.rightInventory,
      i = n.leftInventory,
      l = r.items[e.item.slot - 1],
      s = r.items[t.item.slot - 1],
      a = l || s;
    if (!a || !gn(a) || a.count === 0) return;
    if (St[a.name] === void 0)
      return console.error(`Item ${a.name} data undefined!`);
    const d = i.items[t.item.slot - 1];
    if (d === void 0) return console.error("Target slot undefined");
    const p =
        n.itemAmount !== 0
          ? a.count && n.itemAmount > a.count
            ? a.count
            : n.itemAmount
          : 1,
      g = {
        fromSlot: a,
        toSlot: d,
        fromType: r.type,
        toType: i.type,
        count: p,
      };
    Mn.dispatch(JF({ ...g, fromSlot: a.slot, toSlot: d.slot }));
  },
  Xf = (e) => {
    _r("useItem", e.slot);
  },
  gt = {},
  e6 = mv("inventory/craftItem", async (e, { rejectWithValue: t }) => {
    try {
      const n = await _r("craftItem", e);
      if (n === !1) return t(n);
    } catch {
      return t(!1);
    }
  }),
  t6 = (e, t) => {
    const { inventory: n } = Mn.getState(),
      r = n.rightInventory,
      i = n.leftInventory,
      l = r.items[e.item.slot - 1];
    if (!gn(l)) throw new Error(`Item ${l.slot} name === undefined`);
    if (l.count === 0) return;
    if (St[l.name] === void 0)
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
    Mn.dispatch(e6({ ...d, fromSlot: l.slot, toSlot: a.slot }));
  },
  dx = Math.floor;
function $k(e) {
  return Bk(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ds(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function n6(e) {
  var t;
  return (t = (Bk(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Bk(e) {
  return e instanceof Node || e instanceof Ds(e).Node;
}
function mn(e) {
  return e instanceof Element || e instanceof Ds(e).Element;
}
function Yl(e) {
  return e instanceof HTMLElement || e instanceof Ds(e).HTMLElement;
}
function $g(e) {
  return typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Ds(e).ShadowRoot;
}
function r6(e) {
  return ["html", "body", "#document"].includes($k(e));
}
function i6(e) {
  return Ds(e).getComputedStyle(e);
}
function o6(e) {
  if ($k(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || ($g(e) && e.host) || n6(e);
  return $g(t) ? t.host : t;
}
function $i(e) {
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
function At(e, t) {
  if (!e || !t) return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && $g(n)) {
    let r = t;
    for (; r; ) {
      if (e === r) return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function _v() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function l6() {
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
function Uk(e) {
  if (e.mozInputSource === 0 && e.isTrusted) return !0;
  const t = /Android/i;
  return (t.test(_v()) || t.test(l6())) && e.pointerType
    ? e.type === "click" && e.buttons === 1
    : e.detail === 0 && !e.pointerType;
}
function Hk(e) {
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
function jk() {
  return /apple/i.test(navigator.vendor);
}
function u6() {
  return _v().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function Yc(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function s6(e) {
  return "nativeEvent" in e;
}
function a6(e) {
  return e.matches("html,body");
}
function on(e) {
  return e?.ownerDocument || document;
}
function hh(e, t) {
  if (t == null) return !1;
  if ("composedPath" in e) return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
function Ov(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const c6 =
  "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function Wk(e) {
  return Yl(e) && e.matches(c6);
}
function Bt(e) {
  e.preventDefault(), e.stopPropagation();
}
const f6 = Math.min,
  d6 = Math.max,
  p6 = { left: "right", right: "left", bottom: "top", top: "bottom" },
  h6 = { start: "end", end: "start" };
function px(e, t, n) {
  return d6(e, f6(t, n));
}
function Zf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function jo(e) {
  return e.split("-")[0];
}
function Jf(e) {
  return e.split("-")[1];
}
function Vk(e) {
  return e === "x" ? "y" : "x";
}
function qk(e) {
  return e === "y" ? "height" : "width";
}
function Xl(e) {
  return ["top", "bottom"].includes(jo(e)) ? "y" : "x";
}
function Gk(e) {
  return Vk(Xl(e));
}
function g6(e, t, n) {
  n === void 0 && (n = !1);
  const r = Jf(e),
    i = Gk(e),
    l = qk(i);
  let s =
    i === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[l] > t.floating[l] && (s = Xc(s)), [s, Xc(s)];
}
function m6(e) {
  const t = Xc(e);
  return [Bg(e), t, Bg(t)];
}
function Bg(e) {
  return e.replace(/start|end/g, (t) => h6[t]);
}
function v6(e, t, n) {
  const r = ["left", "right"],
    i = ["right", "left"],
    l = ["top", "bottom"],
    s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? i : r) : t ? r : i;
    case "left":
    case "right":
      return t ? l : s;
    default:
      return [];
  }
}
function y6(e, t, n, r) {
  const i = Jf(e);
  let l = v6(jo(e), n === "start", r);
  return (
    i && ((l = l.map((s) => s + "-" + i)), t && (l = l.concat(l.map(Bg)))), l
  );
}
function Xc(e) {
  return e.replace(/left|right|bottom|top/g, (t) => p6[t]);
}
function w6(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function x6(e) {
  return typeof e != "number"
    ? w6(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Zc(e) {
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
function hx(e, t, n) {
  let { reference: r, floating: i } = e;
  const l = Xl(t),
    s = Gk(t),
    a = qk(s),
    f = jo(t),
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
  switch (Jf(t)) {
    case "start":
      m[s] -= v * (n && d ? -1 : 1);
      break;
    case "end":
      m[s] += v * (n && d ? -1 : 1);
      break;
  }
  return m;
}
const S6 = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: i = "absolute",
      middleware: l = [],
      platform: s,
    } = n,
    a = l.filter(Boolean),
    f = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({ reference: e, floating: t, strategy: i }),
    { x: p, y: g } = hx(d, r, f),
    v = r,
    m = {},
    E = 0;
  for (let S = 0; S < a.length; S++) {
    const { name: A, fn: y } = a[S],
      {
        x: w,
        y: k,
        data: R,
        reset: D,
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
    (p = w ?? p),
      (g = k ?? g),
      (m = { ...m, [A]: { ...m[A], ...R } }),
      D &&
        E <= 50 &&
        (E++,
        typeof D == "object" &&
          (D.placement && (v = D.placement),
          D.rects &&
            (d =
              D.rects === !0
                ? await s.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: i,
                  })
                : D.rects),
          ({ x: p, y: g } = hx(d, v, f))),
        (S = -1));
  }
  return { x: p, y: g, placement: v, strategy: i, middlewareData: m };
};
async function Kk(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: l, rects: s, elements: a, strategy: f } = e,
    {
      boundary: d = "clippingAncestors",
      rootBoundary: p = "viewport",
      elementContext: g = "floating",
      altBoundary: v = !1,
      padding: m = 0,
    } = Zf(t, e),
    E = x6(m),
    A = a[v ? (g === "floating" ? "reference" : "floating") : g],
    y = Zc(
      await l.getClippingRect({
        element:
          (n = await (l.isElement == null ? void 0 : l.isElement(A))) == null ||
          n
            ? A
            : A.contextElement ||
              (await (l.getDocumentElement == null
                ? void 0
                : l.getDocumentElement(a.floating))),
        boundary: d,
        rootBoundary: p,
        strategy: f,
      })
    ),
    w =
      g === "floating"
        ? { x: r, y: i, width: s.floating.width, height: s.floating.height }
        : s.reference,
    k = await (l.getOffsetParent == null
      ? void 0
      : l.getOffsetParent(a.floating)),
    R = (await (l.isElement == null ? void 0 : l.isElement(k)))
      ? (await (l.getScale == null ? void 0 : l.getScale(k))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    D = Zc(
      l.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: w,
            offsetParent: k,
            strategy: f,
          })
        : w
    );
  return {
    top: (y.top - D.top + E.top) / R.y,
    bottom: (D.bottom - y.bottom + E.bottom) / R.y,
    left: (y.left - D.left + E.left) / R.x,
    right: (D.right - y.right + E.right) / R.x,
  };
}
const E6 = function (e) {
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
            ...A
          } = Zf(e, t);
        if ((n = l.arrow) != null && n.alignmentOffset) return {};
        const y = jo(i),
          w = Xl(a),
          k = jo(a) === a,
          R = await (f.isRTL == null ? void 0 : f.isRTL(d.floating)),
          D = v || (k || !S ? [Xc(a)] : m6(a)),
          T = E !== "none";
        !v && T && D.push(...y6(a, S, E, R));
        const F = [a, ...D],
          z = await Kk(t, A),
          q = [];
        let G = ((r = l.flip) == null ? void 0 : r.overflows) || [];
        if ((p && q.push(z[y]), g)) {
          const U = g6(i, s, R);
          q.push(z[U[0]], z[U[1]]);
        }
        if (
          ((G = [...G, { placement: i, overflows: q }]),
          !q.every((U) => U <= 0))
        ) {
          var $, Q;
          const U = ((($ = l.flip) == null ? void 0 : $.index) || 0) + 1,
            J = F[U];
          if (J)
            return {
              data: { index: U, overflows: G },
              reset: { placement: J },
            };
          let ue =
            (Q = G.filter((ne) => ne.overflows[0] <= 0).sort(
              (ne, H) => ne.overflows[1] - H.overflows[1]
            )[0]) == null
              ? void 0
              : Q.placement;
          if (!ue)
            switch (m) {
              case "bestFit": {
                var B;
                const ne =
                  (B = G.filter((H) => {
                    if (T) {
                      const Z = Xl(H.placement);
                      return Z === w || Z === "y";
                    }
                    return !0;
                  })
                    .map((H) => [
                      H.placement,
                      H.overflows
                        .filter((Z) => Z > 0)
                        .reduce((Z, _) => Z + _, 0),
                    ])
                    .sort((H, Z) => H[1] - Z[1])[0]) == null
                    ? void 0
                    : B[0];
                ne && (ue = ne);
                break;
              }
              case "initialPlacement":
                ue = a;
                break;
            }
          if (i !== ue) return { reset: { placement: ue } };
        }
        return {};
      },
    }
  );
};
async function C6(e, t) {
  const { placement: n, platform: r, elements: i } = e,
    l = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    s = jo(n),
    a = Jf(n),
    f = Xl(n) === "y",
    d = ["left", "top"].includes(s) ? -1 : 1,
    p = l && f ? -1 : 1,
    g = Zf(t, e);
  let {
    mainAxis: v,
    crossAxis: m,
    alignmentAxis: E,
  } = typeof g == "number"
    ? { mainAxis: g, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...g };
  return (
    a && typeof E == "number" && (m = a === "end" ? E * -1 : E),
    f ? { x: m * p, y: v * d } : { x: v * d, y: m * p }
  );
}
const k6 = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: i, y: l, placement: s, middlewareData: a } = t,
            f = await C6(t, e);
          return s === ((n = a.offset) == null ? void 0 : n.placement) &&
            (r = a.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: i + f.x, y: l + f.y, data: { ...f, placement: s } };
        },
      }
    );
  },
  b6 = function (e) {
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
                fn: (A) => {
                  let { x: y, y: w } = A;
                  return { x: y, y: w };
                },
              },
              ...f
            } = Zf(e, t),
            d = { x: n, y: r },
            p = await Kk(t, f),
            g = Xl(jo(i)),
            v = Vk(g);
          let m = d[v],
            E = d[g];
          if (l) {
            const A = v === "y" ? "top" : "left",
              y = v === "y" ? "bottom" : "right",
              w = m + p[A],
              k = m - p[y];
            m = px(w, m, k);
          }
          if (s) {
            const A = g === "y" ? "top" : "left",
              y = g === "y" ? "bottom" : "right",
              w = E + p[A],
              k = E - p[y];
            E = px(w, E, k);
          }
          const S = a.fn({ ...t, [v]: m, [g]: E });
          return { ...S, data: { x: S.x - n, y: S.y - r } };
        },
      }
    );
  },
  Ug = Math.min,
  Ll = Math.max,
  Jc = Math.round,
  Ga = Math.floor,
  oo = (e) => ({ x: e, y: e });
function uu(e) {
  return Qk(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function $n(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function xi(e) {
  var t;
  return (t = (Qk(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Qk(e) {
  return e instanceof Node || e instanceof $n(e).Node;
}
function Wr(e) {
  return e instanceof Element || e instanceof $n(e).Element;
}
function Vr(e) {
  return e instanceof HTMLElement || e instanceof $n(e).HTMLElement;
}
function gx(e) {
  return typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof $n(e).ShadowRoot;
}
function Ns(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = Ir(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !["inline", "contents"].includes(i)
  );
}
function _6(e) {
  return ["table", "td", "th"].includes(uu(e));
}
function ed(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Iv(e) {
  const t = Tv(),
    n = Ir(e);
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective", "filter"].some((r) =>
      (n.willChange || "").includes(r)
    ) ||
    ["paint", "layout", "strict", "content"].some((r) =>
      (n.contain || "").includes(r)
    )
  );
}
function O6(e) {
  let t = lo(e);
  for (; Vr(t) && !Zl(t); ) {
    if (ed(t)) return null;
    if (Iv(t)) return t;
    t = lo(t);
  }
  return null;
}
function Tv() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function Zl(e) {
  return ["html", "body", "#document"].includes(uu(e));
}
function Ir(e) {
  return $n(e).getComputedStyle(e);
}
function td(e) {
  return Wr(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function lo(e) {
  if (uu(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (gx(e) && e.host) || xi(e);
  return gx(t) ? t.host : t;
}
function Yk(e) {
  const t = lo(e);
  return Zl(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Vr(t) && Ns(t)
    ? t
    : Yk(t);
}
function Ji(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = Yk(e),
    l = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
    s = $n(i);
  return l
    ? t.concat(
        s,
        s.visualViewport || [],
        Ns(i) ? i : [],
        s.frameElement && n ? Ji(s.frameElement) : []
      )
    : t.concat(i, Ji(i, [], n));
}
function Xk(e) {
  const t = Ir(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const i = Vr(e),
    l = i ? e.offsetWidth : n,
    s = i ? e.offsetHeight : r,
    a = Jc(n) !== l || Jc(r) !== s;
  return a && ((n = l), (r = s)), { width: n, height: r, $: a };
}
function Pv(e) {
  return Wr(e) ? e : e.contextElement;
}
function Fl(e) {
  const t = Pv(e);
  if (!Vr(t)) return oo(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: i, $: l } = Xk(t);
  let s = (l ? Jc(n.width) : n.width) / r,
    a = (l ? Jc(n.height) : n.height) / i;
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: s, y: a }
  );
}
const I6 = oo(0);
function Zk(e) {
  const t = $n(e);
  return !Tv() || !t.visualViewport
    ? I6
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function T6(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== $n(e)) ? !1 : t;
}
function Wo(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(),
    l = Pv(e);
  let s = oo(1);
  t && (r ? Wr(r) && (s = Fl(r)) : (s = Fl(e)));
  const a = T6(l, n, r) ? Zk(l) : oo(0);
  let f = (i.left + a.x) / s.x,
    d = (i.top + a.y) / s.y,
    p = i.width / s.x,
    g = i.height / s.y;
  if (l) {
    const v = $n(l),
      m = r && Wr(r) ? $n(r) : r;
    let E = v,
      S = E.frameElement;
    for (; S && r && m !== E; ) {
      const A = Fl(S),
        y = S.getBoundingClientRect(),
        w = Ir(S),
        k = y.left + (S.clientLeft + parseFloat(w.paddingLeft)) * A.x,
        R = y.top + (S.clientTop + parseFloat(w.paddingTop)) * A.y;
      (f *= A.x),
        (d *= A.y),
        (p *= A.x),
        (g *= A.y),
        (f += k),
        (d += R),
        (E = $n(S)),
        (S = E.frameElement);
    }
  }
  return Zc({ width: p, height: g, x: f, y: d });
}
function P6(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e;
  const l = i === "fixed",
    s = xi(r),
    a = t ? ed(t.floating) : !1;
  if (r === s || (a && l)) return n;
  let f = { scrollLeft: 0, scrollTop: 0 },
    d = oo(1);
  const p = oo(0),
    g = Vr(r);
  if (
    (g || (!g && !l)) &&
    ((uu(r) !== "body" || Ns(s)) && (f = td(r)), Vr(r))
  ) {
    const v = Wo(r);
    (d = Fl(r)), (p.x = v.x + r.clientLeft), (p.y = v.y + r.clientTop);
  }
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - f.scrollLeft * d.x + p.x,
    y: n.y * d.y - f.scrollTop * d.y + p.y,
  };
}
function R6(e) {
  return Array.from(e.getClientRects());
}
function Jk(e) {
  return Wo(xi(e)).left + td(e).scrollLeft;
}
function A6(e) {
  const t = xi(e),
    n = td(e),
    r = e.ownerDocument.body,
    i = Ll(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    l = Ll(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Jk(e);
  const a = -n.scrollTop;
  return (
    Ir(r).direction === "rtl" && (s += Ll(t.clientWidth, r.clientWidth) - i),
    { width: i, height: l, x: s, y: a }
  );
}
function D6(e, t) {
  const n = $n(e),
    r = xi(e),
    i = n.visualViewport;
  let l = r.clientWidth,
    s = r.clientHeight,
    a = 0,
    f = 0;
  if (i) {
    (l = i.width), (s = i.height);
    const d = Tv();
    (!d || (d && t === "fixed")) && ((a = i.offsetLeft), (f = i.offsetTop));
  }
  return { width: l, height: s, x: a, y: f };
}
function N6(e, t) {
  const n = Wo(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    l = Vr(e) ? Fl(e) : oo(1),
    s = e.clientWidth * l.x,
    a = e.clientHeight * l.y,
    f = i * l.x,
    d = r * l.y;
  return { width: s, height: a, x: f, y: d };
}
function mx(e, t, n) {
  let r;
  if (t === "viewport") r = D6(e, n);
  else if (t === "document") r = A6(xi(e));
  else if (Wr(t)) r = N6(t, n);
  else {
    const i = Zk(e);
    r = { ...t, x: t.x - i.x, y: t.y - i.y };
  }
  return Zc(r);
}
function eb(e, t) {
  const n = lo(e);
  return n === t || !Wr(n) || Zl(n)
    ? !1
    : Ir(n).position === "fixed" || eb(n, t);
}
function M6(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Ji(e, [], !1).filter((a) => Wr(a) && uu(a) !== "body"),
    i = null;
  const l = Ir(e).position === "fixed";
  let s = l ? lo(e) : e;
  for (; Wr(s) && !Zl(s); ) {
    const a = Ir(s),
      f = Iv(s);
    !f && a.position === "fixed" && (i = null),
      (
        l
          ? !f && !i
          : (!f &&
              a.position === "static" &&
              !!i &&
              ["absolute", "fixed"].includes(i.position)) ||
            (Ns(s) && !f && eb(e, s))
      )
        ? (r = r.filter((p) => p !== s))
        : (i = a),
      (s = lo(s));
  }
  return t.set(e, r), r;
}
function L6(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
  const s = [
      ...(n === "clippingAncestors"
        ? ed(t)
          ? []
          : M6(t, this._c)
        : [].concat(n)),
      r,
    ],
    a = s[0],
    f = s.reduce((d, p) => {
      const g = mx(t, p, i);
      return (
        (d.top = Ll(g.top, d.top)),
        (d.right = Ug(g.right, d.right)),
        (d.bottom = Ug(g.bottom, d.bottom)),
        (d.left = Ll(g.left, d.left)),
        d
      );
    }, mx(t, a, i));
  return {
    width: f.right - f.left,
    height: f.bottom - f.top,
    x: f.left,
    y: f.top,
  };
}
function F6(e) {
  const { width: t, height: n } = Xk(e);
  return { width: t, height: n };
}
function z6(e, t, n) {
  const r = Vr(t),
    i = xi(t),
    l = n === "fixed",
    s = Wo(e, !0, l, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const f = oo(0);
  if (r || (!r && !l))
    if (((uu(t) !== "body" || Ns(i)) && (a = td(t)), r)) {
      const g = Wo(t, !0, l, t);
      (f.x = g.x + t.clientLeft), (f.y = g.y + t.clientTop);
    } else i && (f.x = Jk(i));
  const d = s.left + a.scrollLeft - f.x,
    p = s.top + a.scrollTop - f.y;
  return { x: d, y: p, width: s.width, height: s.height };
}
function gh(e) {
  return Ir(e).position === "static";
}
function vx(e, t) {
  return !Vr(e) || Ir(e).position === "fixed"
    ? null
    : t
    ? t(e)
    : e.offsetParent;
}
function tb(e, t) {
  const n = $n(e);
  if (ed(e)) return n;
  if (!Vr(e)) {
    let i = lo(e);
    for (; i && !Zl(i); ) {
      if (Wr(i) && !gh(i)) return i;
      i = lo(i);
    }
    return n;
  }
  let r = vx(e, t);
  for (; r && _6(r) && gh(r); ) r = vx(r, t);
  return r && Zl(r) && gh(r) && !Iv(r) ? n : r || O6(e) || n;
}
const $6 = async function (e) {
  const t = this.getOffsetParent || tb,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: z6(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function B6(e) {
  return Ir(e).direction === "rtl";
}
const U6 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: P6,
  getDocumentElement: xi,
  getClippingRect: L6,
  getOffsetParent: tb,
  getElementRects: $6,
  getClientRects: R6,
  getDimensions: F6,
  getScale: Fl,
  isElement: Wr,
  isRTL: B6,
};
function H6(e, t) {
  let n = null,
    r;
  const i = xi(e);
  function l() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), (n = null);
  }
  function s(a, f) {
    a === void 0 && (a = !1), f === void 0 && (f = 1), l();
    const { left: d, top: p, width: g, height: v } = e.getBoundingClientRect();
    if ((a || t(), !g || !v)) return;
    const m = Ga(p),
      E = Ga(i.clientWidth - (d + g)),
      S = Ga(i.clientHeight - (p + v)),
      A = Ga(d),
      w = {
        rootMargin: -m + "px " + -E + "px " + -S + "px " + -A + "px",
        threshold: Ll(0, Ug(1, f)) || 1,
      };
    let k = !0;
    function R(D) {
      const T = D[0].intersectionRatio;
      if (T !== f) {
        if (!k) return s();
        T
          ? s(!1, T)
          : (r = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      k = !1;
    }
    try {
      n = new IntersectionObserver(R, { ...w, root: i.ownerDocument });
    } catch {
      n = new IntersectionObserver(R, w);
    }
    n.observe(e);
  }
  return s(!0), l;
}
function j6(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: l = !0,
      elementResize: s = typeof ResizeObserver == "function",
      layoutShift: a = typeof IntersectionObserver == "function",
      animationFrame: f = !1,
    } = r,
    d = Pv(e),
    p = i || l ? [...(d ? Ji(d) : []), ...Ji(t)] : [];
  p.forEach((y) => {
    i && y.addEventListener("scroll", n, { passive: !0 }),
      l && y.addEventListener("resize", n);
  });
  const g = d && a ? H6(d, n) : null;
  let v = -1,
    m = null;
  s &&
    ((m = new ResizeObserver((y) => {
      let [w] = y;
      w &&
        w.target === d &&
        m &&
        (m.unobserve(t),
        cancelAnimationFrame(v),
        (v = requestAnimationFrame(() => {
          var k;
          (k = m) == null || k.observe(t);
        }))),
        n();
    })),
    d && !f && m.observe(d),
    m.observe(t));
  let E,
    S = f ? Wo(e) : null;
  f && A();
  function A() {
    const y = Wo(e);
    S &&
      (y.x !== S.x ||
        y.y !== S.y ||
        y.width !== S.width ||
        y.height !== S.height) &&
      n(),
      (S = y),
      (E = requestAnimationFrame(A));
  }
  return (
    n(),
    () => {
      var y;
      p.forEach((w) => {
        i && w.removeEventListener("scroll", n),
          l && w.removeEventListener("resize", n);
      }),
        g?.(),
        (y = m) == null || y.disconnect(),
        (m = null),
        f && cancelAnimationFrame(E);
    }
  );
}
const W6 = k6,
  V6 = b6,
  q6 = E6,
  G6 = (e, t, n) => {
    const r = new Map(),
      i = { platform: U6, ...n },
      l = { ...i.platform, _c: r };
    return S6(e, t, { ...i, platform: l });
  };
var pc = typeof document < "u" ? I.useLayoutEffect : I.useEffect;
function ef(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!ef(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const l = i[r];
      if (!(l === "_owner" && e.$$typeof) && !ef(e[l], t[l])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function nb(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function yx(e, t) {
  const n = nb(e);
  return Math.round(t * n) / n;
}
function wx(e) {
  const t = I.useRef(e);
  return (
    pc(() => {
      t.current = e;
    }),
    t
  );
}
function K6(e) {
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
    [p, g] = I.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [v, m] = I.useState(r);
  ef(v, r) || m(r);
  const [E, S] = I.useState(null),
    [A, y] = I.useState(null),
    w = I.useCallback((ne) => {
      ne !== T.current && ((T.current = ne), S(ne));
    }, []),
    k = I.useCallback((ne) => {
      ne !== F.current && ((F.current = ne), y(ne));
    }, []),
    R = l || E,
    D = s || A,
    T = I.useRef(null),
    F = I.useRef(null),
    z = I.useRef(p),
    q = f != null,
    G = wx(f),
    $ = wx(i),
    Q = I.useCallback(() => {
      if (!T.current || !F.current) return;
      const ne = { placement: t, strategy: n, middleware: v };
      $.current && (ne.platform = $.current),
        G6(T.current, F.current, ne).then((H) => {
          const Z = { ...H, isPositioned: !0 };
          B.current &&
            !ef(z.current, Z) &&
            ((z.current = Z),
            iu.flushSync(() => {
              g(Z);
            }));
        });
    }, [v, t, n, $]);
  pc(() => {
    d === !1 &&
      z.current.isPositioned &&
      ((z.current.isPositioned = !1), g((ne) => ({ ...ne, isPositioned: !1 })));
  }, [d]);
  const B = I.useRef(!1);
  pc(
    () => (
      (B.current = !0),
      () => {
        B.current = !1;
      }
    ),
    []
  ),
    pc(() => {
      if ((R && (T.current = R), D && (F.current = D), R && D)) {
        if (G.current) return G.current(R, D, Q);
        Q();
      }
    }, [R, D, Q, G, q]);
  const U = I.useMemo(
      () => ({ reference: T, floating: F, setReference: w, setFloating: k }),
      [w, k]
    ),
    J = I.useMemo(() => ({ reference: R, floating: D }), [R, D]),
    ue = I.useMemo(() => {
      const ne = { position: n, left: 0, top: 0 };
      if (!J.floating) return ne;
      const H = yx(J.floating, p.x),
        Z = yx(J.floating, p.y);
      return a
        ? {
            ...ne,
            transform: "translate(" + H + "px, " + Z + "px)",
            ...(nb(J.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: H, top: Z };
    }, [n, a, J.floating, p.x, p.y]);
  return I.useMemo(
    () => ({ ...p, update: Q, refs: U, elements: J, floatingStyles: ue }),
    [p, Q, U, J, ue]
  );
}
const rb = (e, t) => ({ ...W6(e), options: [e, t] }),
  ib = (e, t) => ({ ...V6(e), options: [e, t] }),
  ob = (e, t) => ({ ...q6(e), options: [e, t] });
/*!
 * tabbable 6.2.0
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */ var Q6 = [
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
  Hg = Q6.join(","),
  lb = typeof Element > "u",
  _s = lb
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  tf =
    !lb && Element.prototype.getRootNode
      ? function (e) {
          var t;
          return e == null || (t = e.getRootNode) === null || t === void 0
            ? void 0
            : t.call(e);
        }
      : function (e) {
          return e?.ownerDocument;
        },
  nf = function e(t, n) {
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
  Y6 = function (t) {
    var n,
      r =
        t == null || (n = t.getAttribute) === null || n === void 0
          ? void 0
          : n.call(t, "contenteditable");
    return r === "" || r === "true";
  },
  X6 = function (t, n, r) {
    if (nf(t)) return [];
    var i = Array.prototype.slice.apply(t.querySelectorAll(Hg));
    return n && _s.call(t, Hg) && i.unshift(t), (i = i.filter(r)), i;
  },
  Z6 = function e(t, n, r) {
    for (var i = [], l = Array.from(t); l.length; ) {
      var s = l.shift();
      if (!nf(s, !1))
        if (s.tagName === "SLOT") {
          var a = s.assignedElements(),
            f = a.length ? a : s.children,
            d = e(f, !0, r);
          r.flatten
            ? i.push.apply(i, d)
            : i.push({ scopeParent: s, candidates: d });
        } else {
          var p = _s.call(s, Hg);
          p && r.filter(s) && (n || !t.includes(s)) && i.push(s);
          var g =
              s.shadowRoot ||
              (typeof r.getShadowRoot == "function" && r.getShadowRoot(s)),
            v = !nf(g, !1) && (!r.shadowRootFilter || r.shadowRootFilter(s));
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
  ub = function (t) {
    return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
  },
  sb = function (t) {
    if (!t) throw new Error("No node provided");
    return t.tabIndex < 0 &&
      (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Y6(t)) &&
      !ub(t)
      ? 0
      : t.tabIndex;
  },
  J6 = function (t, n) {
    var r = sb(t);
    return r < 0 && n && !ub(t) ? 0 : r;
  },
  e5 = function (t, n) {
    return t.tabIndex === n.tabIndex
      ? t.documentOrder - n.documentOrder
      : t.tabIndex - n.tabIndex;
  },
  ab = function (t) {
    return t.tagName === "INPUT";
  },
  t5 = function (t) {
    return ab(t) && t.type === "hidden";
  },
  n5 = function (t) {
    var n =
      t.tagName === "DETAILS" &&
      Array.prototype.slice.apply(t.children).some(function (r) {
        return r.tagName === "SUMMARY";
      });
    return n;
  },
  r5 = function (t, n) {
    for (var r = 0; r < t.length; r++)
      if (t[r].checked && t[r].form === n) return t[r];
  },
  i5 = function (t) {
    if (!t.name) return !0;
    var n = t.form || tf(t),
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
    var l = r5(i, t.form);
    return !l || l === t;
  },
  o5 = function (t) {
    return ab(t) && t.type === "radio";
  },
  l5 = function (t) {
    return o5(t) && !i5(t);
  },
  u5 = function (t) {
    var n,
      r = t && tf(t),
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
        (r = tf(i)),
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
  xx = function (t) {
    var n = t.getBoundingClientRect(),
      r = n.width,
      i = n.height;
    return r === 0 && i === 0;
  },
  s5 = function (t, n) {
    var r = n.displayCheck,
      i = n.getShadowRoot;
    if (getComputedStyle(t).visibility === "hidden") return !0;
    var l = _s.call(t, "details>summary:first-of-type"),
      s = l ? t.parentElement : t;
    if (_s.call(s, "details:not([open]) *")) return !0;
    if (!r || r === "full" || r === "legacy-full") {
      if (typeof i == "function") {
        for (var a = t; t; ) {
          var f = t.parentElement,
            d = tf(t);
          if (f && !f.shadowRoot && i(f) === !0) return xx(t);
          t.assignedSlot
            ? (t = t.assignedSlot)
            : !f && d !== t.ownerDocument
            ? (t = d.host)
            : (t = f);
        }
        t = a;
      }
      if (u5(t)) return !t.getClientRects().length;
      if (r !== "legacy-full") return !0;
    } else if (r === "non-zero-area") return xx(t);
    return !1;
  },
  a5 = function (t) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
      for (var n = t.parentElement; n; ) {
        if (n.tagName === "FIELDSET" && n.disabled) {
          for (var r = 0; r < n.children.length; r++) {
            var i = n.children.item(r);
            if (i.tagName === "LEGEND")
              return _s.call(n, "fieldset[disabled] *") ? !0 : !i.contains(t);
          }
          return !0;
        }
        n = n.parentElement;
      }
    return !1;
  },
  c5 = function (t, n) {
    return !(n.disabled || nf(n) || t5(n) || s5(n, t) || n5(n) || a5(n));
  },
  Sx = function (t, n) {
    return !(l5(n) || sb(n) < 0 || !c5(t, n));
  },
  f5 = function (t) {
    var n = parseInt(t.getAttribute("tabindex"), 10);
    return !!(isNaN(n) || n >= 0);
  },
  d5 = function e(t) {
    var n = [],
      r = [];
    return (
      t.forEach(function (i, l) {
        var s = !!i.scopeParent,
          a = s ? i.scopeParent : i,
          f = J6(a, s),
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
        .sort(e5)
        .reduce(function (i, l) {
          return l.isScope ? i.push.apply(i, l.content) : i.push(l.content), i;
        }, [])
        .concat(n)
    );
  },
  Rv = function (t, n) {
    n = n || {};
    var r;
    return (
      n.getShadowRoot
        ? (r = Z6([t], n.includeContainer, {
            filter: Sx.bind(null, n),
            flatten: !1,
            getShadowRoot: n.getShadowRoot,
            shadowRootFilter: f5,
          }))
        : (r = X6(t, n.includeContainer, Sx.bind(null, n))),
      d5(r)
    );
  };
function Av(e) {
  return I.useMemo(
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
const Dv = "ArrowUp",
  nd = "ArrowDown",
  Jl = "ArrowLeft",
  Ms = "ArrowRight";
function Ka(e, t, n) {
  return Math.floor(e / t) !== n;
}
function ns(e, t) {
  return t < 0 || t >= e.current.length;
}
function mh(e, t) {
  return Qt(e, { disabledIndices: t });
}
function Ex(e, t) {
  return Qt(e, {
    decrement: !0,
    startingIndex: e.current.length,
    disabledIndices: t,
  });
}
function Qt(e, t) {
  let {
    startingIndex: n = -1,
    decrement: r = !1,
    disabledIndices: i,
    amount: l = 1,
  } = t === void 0 ? {} : t;
  const s = e.current;
  let a = n;
  do {
    var f, d;
    a = a + (r ? -l : l);
  } while (
    a >= 0 &&
    a <= s.length - 1 &&
    (i
      ? i.includes(a)
      : s[a] == null ||
        ((f = s[a]) != null && f.hasAttribute("disabled")) ||
        ((d = s[a]) == null ? void 0 : d.getAttribute("aria-disabled")) ===
          "true")
  );
  return a;
}
function p5(e, t) {
  let {
      event: n,
      orientation: r,
      loop: i,
      cols: l,
      disabledIndices: s,
      minIndex: a,
      maxIndex: f,
      prevIndex: d,
      stopEvent: p = !1,
    } = t,
    g = d;
  if (n.key === Dv) {
    if ((p && Bt(n), d === -1)) g = f;
    else if (
      ((g = Qt(e, {
        startingIndex: g,
        amount: l,
        decrement: !0,
        disabledIndices: s,
      })),
      i && (d - l < a || g < 0))
    ) {
      const v = d % l,
        m = f % l,
        E = f - (m - v);
      m === v ? (g = f) : (g = m > v ? E : E - l);
    }
    ns(e, g) && (g = d);
  }
  if (
    (n.key === nd &&
      (p && Bt(n),
      d === -1
        ? (g = a)
        : ((g = Qt(e, { startingIndex: d, amount: l, disabledIndices: s })),
          i &&
            d + l > f &&
            (g = Qt(e, {
              startingIndex: (d % l) - l,
              amount: l,
              disabledIndices: s,
            }))),
      ns(e, g) && (g = d)),
    r === "both")
  ) {
    const v = dx(d / l);
    n.key === Ms &&
      (p && Bt(n),
      d % l !== l - 1
        ? ((g = Qt(e, { startingIndex: d, disabledIndices: s })),
          i &&
            Ka(g, l, v) &&
            (g = Qt(e, { startingIndex: d - (d % l) - 1, disabledIndices: s })))
        : i &&
          (g = Qt(e, { startingIndex: d - (d % l) - 1, disabledIndices: s })),
      Ka(g, l, v) && (g = d)),
      n.key === Jl &&
        (p && Bt(n),
        d % l !== 0
          ? ((g = Qt(e, {
              startingIndex: d,
              disabledIndices: s,
              decrement: !0,
            })),
            i &&
              Ka(g, l, v) &&
              (g = Qt(e, {
                startingIndex: d + (l - (d % l)),
                decrement: !0,
                disabledIndices: s,
              })))
          : i &&
            (g = Qt(e, {
              startingIndex: d + (l - (d % l)),
              decrement: !0,
              disabledIndices: s,
            })),
        Ka(g, l, v) && (g = d));
    const m = dx(f / l) === v;
    ns(e, g) &&
      (i && m
        ? (g =
            n.key === Jl
              ? f
              : Qt(e, { startingIndex: d - (d % l) - 1, disabledIndices: s }))
        : (g = d));
  }
  return g;
}
let Cx = 0;
function li(e, t) {
  t === void 0 && (t = {});
  const { preventScroll: n = !1, cancelPrevious: r = !0, sync: i = !1 } = t;
  r && cancelAnimationFrame(Cx);
  const l = () => e?.focus({ preventScroll: n });
  i ? l() : (Cx = requestAnimationFrame(l));
}
var Qe = typeof document < "u" ? I.useLayoutEffect : I.useEffect;
function h5(e, t) {
  const n = e.compareDocumentPosition(t);
  return n & Node.DOCUMENT_POSITION_FOLLOWING ||
    n & Node.DOCUMENT_POSITION_CONTAINED_BY
    ? -1
    : n & Node.DOCUMENT_POSITION_PRECEDING ||
      n & Node.DOCUMENT_POSITION_CONTAINS
    ? 1
    : 0;
}
function g5(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of e.entries()) if (r !== t.get(n)) return !1;
  return !0;
}
const cb = I.createContext({
  register: () => {},
  unregister: () => {},
  map: new Map(),
  elementsRef: { current: [] },
});
function m5(e) {
  let { children: t, elementsRef: n, labelsRef: r } = e;
  const [i, l] = I.useState(() => new Map()),
    s = I.useCallback((f) => {
      l((d) => new Map(d).set(f, null));
    }, []),
    a = I.useCallback((f) => {
      l((d) => {
        const p = new Map(d);
        return p.delete(f), p;
      });
    }, []);
  return (
    Qe(() => {
      const f = new Map(i);
      Array.from(f.keys())
        .sort(h5)
        .forEach((p, g) => {
          f.set(p, g);
        }),
        g5(i, f) || l(f);
    }, [i]),
    I.createElement(
      cb.Provider,
      {
        value: I.useMemo(
          () => ({
            register: s,
            unregister: a,
            map: i,
            elementsRef: n,
            labelsRef: r,
          }),
          [s, a, i, n, r]
        ),
      },
      t
    )
  );
}
function fb(e) {
  let { label: t } = e === void 0 ? {} : e;
  const [n, r] = I.useState(null),
    i = I.useRef(null),
    {
      register: l,
      unregister: s,
      map: a,
      elementsRef: f,
      labelsRef: d,
    } = I.useContext(cb),
    p = I.useCallback(
      (g) => {
        if (((i.current = g), n !== null && ((f.current[n] = g), d))) {
          var v;
          const m = t !== void 0;
          d.current[n] = m ? t : (v = g?.textContent) != null ? v : null;
        }
      },
      [n, f, d, t]
    );
  return (
    Qe(() => {
      const g = i.current;
      if (g)
        return (
          l(g),
          () => {
            s(g);
          }
        );
    }, [l, s]),
    Qe(() => {
      const g = i.current ? a.get(i.current) : null;
      g != null && r(g);
    }, [a]),
    I.useMemo(() => ({ ref: p, index: n ?? -1 }), [n, p])
  );
}
function Os() {
  return (
    (Os = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Os.apply(this, arguments)
  );
}
let vh = !1,
  v5 = 0;
const kx = () => "floating-ui-" + v5++;
function y5() {
  const [e, t] = I.useState(() => (vh ? kx() : void 0));
  return (
    Qe(() => {
      e == null && t(kx());
    }, []),
    I.useEffect(() => {
      vh || (vh = !0);
    }, []),
    e
  );
}
const w5 = zS["useId".toString()],
  Ls = w5 || y5;
function db() {
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
const pb = I.createContext(null),
  hb = I.createContext(null),
  Go = () => {
    var e;
    return ((e = I.useContext(pb)) == null ? void 0 : e.id) || null;
  },
  fo = () => I.useContext(hb);
function x5(e) {
  const t = Ls(),
    n = fo(),
    r = Go(),
    i = e || r;
  return (
    Qe(() => {
      const l = { id: t, parentId: i };
      return (
        n?.addNode(l),
        () => {
          n?.removeNode(l);
        }
      );
    }, [n, t, i]),
    t
  );
}
function S5(e) {
  let { children: t, id: n } = e;
  const r = Go();
  return I.createElement(
    pb.Provider,
    { value: I.useMemo(() => ({ id: n, parentId: r }), [n, r]) },
    t
  );
}
function E5(e) {
  let { children: t } = e;
  const n = I.useRef([]),
    r = I.useCallback((s) => {
      n.current = [...n.current, s];
    }, []),
    i = I.useCallback((s) => {
      n.current = n.current.filter((a) => a !== s);
    }, []),
    l = I.useState(() => db())[0];
  return I.createElement(
    hb.Provider,
    {
      value: I.useMemo(
        () => ({ nodesRef: n, addNode: r, removeNode: i, events: l }),
        [n, r, i, l]
      ),
    },
    t
  );
}
function eu(e) {
  return "data-floating-ui-" + e;
}
function yn(e) {
  const t = I.useRef(e);
  return (
    Qe(() => {
      t.current = e;
    }),
    t
  );
}
const bx = eu("safe-polygon");
function yh(e, t, n) {
  return n && !Yc(n) ? 0 : typeof e == "number" ? e : e?.[t];
}
function C5(e, t) {
  t === void 0 && (t = {});
  const {
      open: n,
      onOpenChange: r,
      dataRef: i,
      events: l,
      elements: { domReference: s, floating: a },
      refs: f,
    } = e,
    {
      enabled: d = !0,
      delay: p = 0,
      handleClose: g = null,
      mouseOnly: v = !1,
      restMs: m = 0,
      move: E = !0,
    } = t,
    S = fo(),
    A = Go(),
    y = yn(g),
    w = yn(p),
    k = I.useRef(),
    R = I.useRef(),
    D = I.useRef(),
    T = I.useRef(),
    F = I.useRef(!0),
    z = I.useRef(!1),
    q = I.useRef(() => {}),
    G = I.useCallback(() => {
      var U;
      const J = (U = i.current.openEvent) == null ? void 0 : U.type;
      return J?.includes("mouse") && J !== "mousedown";
    }, [i]);
  I.useEffect(() => {
    if (!d) return;
    function U() {
      clearTimeout(R.current), clearTimeout(T.current), (F.current = !0);
    }
    return (
      l.on("dismiss", U),
      () => {
        l.off("dismiss", U);
      }
    );
  }, [d, l]),
    I.useEffect(() => {
      if (!d || !y.current || !n) return;
      function U(ue) {
        G() && r(!1, ue);
      }
      const J = on(a).documentElement;
      return (
        J.addEventListener("mouseleave", U),
        () => {
          J.removeEventListener("mouseleave", U);
        }
      );
    }, [a, n, r, d, y, i, G]);
  const $ = I.useCallback(
      function (U, J) {
        J === void 0 && (J = !0);
        const ue = yh(w.current, "close", k.current);
        ue && !D.current
          ? (clearTimeout(R.current),
            (R.current = setTimeout(() => r(!1, U), ue)))
          : J && (clearTimeout(R.current), r(!1, U));
      },
      [w, r]
    ),
    Q = I.useCallback(() => {
      q.current(), (D.current = void 0);
    }, []),
    B = I.useCallback(() => {
      if (z.current) {
        const U = on(f.floating.current).body;
        (U.style.pointerEvents = ""), U.removeAttribute(bx), (z.current = !1);
      }
    }, [f]);
  return (
    I.useEffect(() => {
      if (!d) return;
      function U() {
        return i.current.openEvent
          ? ["click", "mousedown"].includes(i.current.openEvent.type)
          : !1;
      }
      function J(H) {
        if (
          (clearTimeout(R.current),
          (F.current = !1),
          (v && !Yc(k.current)) || (m > 0 && yh(w.current, "open") === 0))
        )
          return;
        const Z = yh(w.current, "open", k.current);
        Z
          ? (R.current = setTimeout(() => {
              r(!0, H);
            }, Z))
          : r(!0, H);
      }
      function ue(H) {
        if (U()) return;
        q.current();
        const Z = on(a);
        if ((clearTimeout(T.current), y.current)) {
          n || clearTimeout(R.current),
            (D.current = y.current({
              ...e,
              tree: S,
              x: H.clientX,
              y: H.clientY,
              onClose() {
                B(), Q(), $(H);
              },
            }));
          const re = D.current;
          Z.addEventListener("mousemove", re),
            (q.current = () => {
              Z.removeEventListener("mousemove", re);
            });
          return;
        }
        (k.current === "touch" ? !At(a, H.relatedTarget) : !0) && $(H);
      }
      function ne(H) {
        U() ||
          y.current == null ||
          y.current({
            ...e,
            tree: S,
            x: H.clientX,
            y: H.clientY,
            onClose() {
              B(), Q(), $(H);
            },
          })(H);
      }
      if (mn(s)) {
        const H = s;
        return (
          n && H.addEventListener("mouseleave", ne),
          a?.addEventListener("mouseleave", ne),
          E && H.addEventListener("mousemove", J, { once: !0 }),
          H.addEventListener("mouseenter", J),
          H.addEventListener("mouseleave", ue),
          () => {
            n && H.removeEventListener("mouseleave", ne),
              a?.removeEventListener("mouseleave", ne),
              E && H.removeEventListener("mousemove", J),
              H.removeEventListener("mouseenter", J),
              H.removeEventListener("mouseleave", ue);
          }
        );
      }
    }, [s, a, d, e, v, m, E, $, Q, B, r, n, S, w, y, i]),
    Qe(() => {
      var U;
      if (
        d &&
        n &&
        (U = y.current) != null &&
        U.__options.blockPointerEvents &&
        G()
      ) {
        const ne = on(a).body;
        if (
          (ne.setAttribute(bx, ""),
          (ne.style.pointerEvents = "none"),
          (z.current = !0),
          mn(s) && a)
        ) {
          var J, ue;
          const H = s,
            Z =
              S == null ||
              (J = S.nodesRef.current.find((_) => _.id === A)) == null ||
              (ue = J.context) == null
                ? void 0
                : ue.elements.floating;
          return (
            Z && (Z.style.pointerEvents = ""),
            (H.style.pointerEvents = "auto"),
            (a.style.pointerEvents = "auto"),
            () => {
              (H.style.pointerEvents = ""), (a.style.pointerEvents = "");
            }
          );
        }
      }
    }, [d, n, A, a, s, S, y, i, G]),
    Qe(() => {
      n || ((k.current = void 0), Q(), B());
    }, [n, Q, B]),
    I.useEffect(
      () => () => {
        Q(), clearTimeout(R.current), clearTimeout(T.current), B();
      },
      [d, s, Q, B]
    ),
    I.useMemo(() => {
      if (!d) return {};
      function U(J) {
        k.current = J.pointerType;
      }
      return {
        reference: {
          onPointerDown: U,
          onPointerEnter: U,
          onMouseMove(J) {
            n ||
              m === 0 ||
              (clearTimeout(T.current),
              (T.current = setTimeout(() => {
                F.current || r(!0, J.nativeEvent);
              }, m)));
          },
        },
        floating: {
          onMouseEnter() {
            clearTimeout(R.current);
          },
          onMouseLeave(J) {
            l.emit("dismiss", {
              type: "mouseLeave",
              data: { returnFocus: !1 },
            }),
              $(J.nativeEvent, !1);
          },
        },
      };
    }, [l, d, m, n, r, $])
  );
}
function k5(e, t) {
  var n;
  let r = [],
    i = (n = e.find((l) => l.id === t)) == null ? void 0 : n.parentId;
  for (; i; ) {
    const l = e.find((s) => s.id === i);
    (i = l?.parentId), l && (r = r.concat(l));
  }
  return r;
}
function Mo(e, t) {
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
function b5(e, t) {
  let n,
    r = -1;
  function i(l, s) {
    s > r && ((n = l), (r = s)),
      Mo(e, l).forEach((f) => {
        i(f.id, s + 1);
      });
  }
  return i(t, 0), e.find((l) => l.id === n);
}
let pl = new WeakMap(),
  Qa = new WeakSet(),
  Ya = {},
  wh = 0;
const _5 = () => typeof HTMLElement < "u" && "inert" in HTMLElement.prototype,
  gb = (e) => e && (e.host || gb(e.parentNode)),
  O5 = (e, t) =>
    t
      .map((n) => {
        if (e.contains(n)) return n;
        const r = gb(n);
        return e.contains(r) ? r : null;
      })
      .filter((n) => n != null);
function I5(e, t, n, r) {
  const i = "data-floating-ui-inert",
    l = r ? "inert" : n ? "aria-hidden" : null,
    s = O5(t, e),
    a = new Set(),
    f = new Set(s),
    d = [];
  Ya[i] || (Ya[i] = new WeakMap());
  const p = Ya[i];
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
            A = S !== null && S !== "false",
            y = (pl.get(E) || 0) + 1,
            w = (p.get(E) || 0) + 1;
          pl.set(E, y),
            p.set(E, w),
            d.push(E),
            y === 1 && A && Qa.add(E),
            w === 1 && E.setAttribute(i, ""),
            !A && l && E.setAttribute(l, "true");
        }
      });
  }
  return (
    wh++,
    () => {
      d.forEach((m) => {
        const E = (pl.get(m) || 0) - 1,
          S = (p.get(m) || 0) - 1;
        pl.set(m, E),
          p.set(m, S),
          E || (!Qa.has(m) && l && m.removeAttribute(l), Qa.delete(m)),
          S || m.removeAttribute(i);
      }),
        wh--,
        wh ||
          ((pl = new WeakMap()),
          (pl = new WeakMap()),
          (Qa = new WeakSet()),
          (Ya = {}));
    }
  );
}
function _x(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = on(e[0]).body;
  return I5(e.concat(Array.from(r.querySelectorAll("[aria-live]"))), r, t, n);
}
const Nv = () => ({
  getShadowRoot: !0,
  displayCheck:
    typeof ResizeObserver == "function" &&
    ResizeObserver.toString().includes("[native code]")
      ? "full"
      : "none",
});
function mb(e, t) {
  const n = Rv(e, Nv());
  t === "prev" && n.reverse();
  const r = n.indexOf($i(on(e)));
  return n.slice(r + 1)[0];
}
function vb() {
  return mb(document.body, "next");
}
function yb() {
  return mb(document.body, "prev");
}
function rs(e, t) {
  const n = t || e.currentTarget,
    r = e.relatedTarget;
  return !r || !At(n, r);
}
function T5(e) {
  Rv(e, Nv()).forEach((n) => {
    (n.dataset.tabindex = n.getAttribute("tabindex") || ""),
      n.setAttribute("tabindex", "-1");
  });
}
function P5(e) {
  e.querySelectorAll("[data-tabindex]").forEach((n) => {
    const r = n.dataset.tabindex;
    delete n.dataset.tabindex,
      r ? n.setAttribute("tabindex", r) : n.removeAttribute("tabindex");
  });
}
const Mv = {
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
let R5;
function Ox(e) {
  e.key === "Tab" && (e.target, clearTimeout(R5));
}
const rf = I.forwardRef(function (t, n) {
    const [r, i] = I.useState();
    Qe(
      () => (
        jk() && i("button"),
        document.addEventListener("keydown", Ox),
        () => {
          document.removeEventListener("keydown", Ox);
        }
      ),
      []
    );
    const l = {
      ref: n,
      tabIndex: 0,
      role: r,
      "aria-hidden": r ? void 0 : !0,
      [eu("focus-guard")]: "",
      style: Mv,
    };
    return I.createElement("span", Os({}, t, l));
  }),
  wb = I.createContext(null);
function A5(e) {
  let { id: t, root: n } = e === void 0 ? {} : e;
  const [r, i] = I.useState(null),
    l = Ls(),
    s = xb(),
    a = I.useMemo(
      () => ({ id: t, root: n, portalContext: s, uniqueId: l }),
      [t, n, s, l]
    ),
    f = I.useRef();
  return (
    Qe(
      () => () => {
        r?.remove();
      },
      [r, a]
    ),
    Qe(() => {
      if (f.current === a) return;
      f.current = a;
      const { id: d, root: p, portalContext: g, uniqueId: v } = a,
        m = d ? document.getElementById(d) : null,
        E = eu("portal");
      if (m) {
        const S = document.createElement("div");
        (S.id = v), S.setAttribute(E, ""), m.appendChild(S), i(S);
      } else {
        let S = p || g?.portalNode;
        S && !mn(S) && (S = S.current), (S = S || document.body);
        let A = null;
        d &&
          ((A = document.createElement("div")), (A.id = d), S.appendChild(A));
        const y = document.createElement("div");
        (y.id = v), y.setAttribute(E, ""), (S = A || S), S.appendChild(y), i(y);
      }
    }, [a]),
    r
  );
}
function Lv(e) {
  let { children: t, id: n, root: r = null, preserveTabOrder: i = !0 } = e;
  const l = A5({ id: n, root: r }),
    [s, a] = I.useState(null),
    f = I.useRef(null),
    d = I.useRef(null),
    p = I.useRef(null),
    g = I.useRef(null),
    v = !!s && !s.modal && s.open && i && !!(r || l);
  return (
    I.useEffect(() => {
      if (!l || !i || (s != null && s.modal)) return;
      function m(E) {
        l && rs(E) && (E.type === "focusin" ? P5 : T5)(l);
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
    I.createElement(
      wb.Provider,
      {
        value: I.useMemo(
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
        I.createElement(rf, {
          "data-type": "outside",
          ref: f,
          onFocus: (m) => {
            if (rs(m, l)) {
              var E;
              (E = p.current) == null || E.focus();
            } else {
              const S = yb() || s?.refs.domReference.current;
              S?.focus();
            }
          },
        }),
      v && l && I.createElement("span", { "aria-owns": l.id, style: Mv }),
      l && iu.createPortal(t, l),
      v &&
        l &&
        I.createElement(rf, {
          "data-type": "outside",
          ref: d,
          onFocus: (m) => {
            if (rs(m, l)) {
              var E;
              (E = g.current) == null || E.focus();
            } else {
              const S = vb() || s?.refs.domReference.current;
              S?.focus(),
                s?.closeOnFocusOut && s?.onOpenChange(!1, m.nativeEvent);
            }
          },
        })
    )
  );
}
const xb = () => I.useContext(wb),
  D5 = I.forwardRef(function (t, n) {
    return I.createElement(
      "button",
      Os({}, t, { type: "button", ref: n, tabIndex: -1, style: Mv })
    );
  });
function Sb(e) {
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
      dataRef: A,
      elements: { domReference: y, floating: w },
    } = t,
    k = _5() ? l : !0,
    R = yn(i),
    D = yn(s),
    T = yn(a),
    F = fo(),
    z = xb(),
    q = typeof s == "number" && s < 0,
    G = I.useRef(null),
    $ = I.useRef(null),
    Q = I.useRef(!1),
    B = I.useRef(null),
    U = I.useRef(!1),
    J = z != null,
    ue = y && y.getAttribute("role") === "combobox" && Wk(y) && q,
    ne = I.useCallback(
      function (re) {
        return re === void 0 && (re = w), re ? Rv(re, Nv()) : [];
      },
      [w]
    ),
    H = I.useCallback(
      (re) => {
        const ae = ne(re);
        return R.current
          .map((O) =>
            y && O === "reference" ? y : w && O === "floating" ? w : ae
          )
          .filter(Boolean)
          .flat();
      },
      [y, w, R, ne]
    );
  I.useEffect(() => {
    if (r || !f) return;
    function re(O) {
      if (O.key === "Tab") {
        At(w, $i(on(w))) && ne().length === 0 && !ue && Bt(O);
        const de = H(),
          Pe = Ov(O);
        R.current[0] === "reference" &&
          Pe === y &&
          (Bt(O), O.shiftKey ? li(de[de.length - 1]) : li(de[1])),
          R.current[1] === "floating" &&
            Pe === w &&
            O.shiftKey &&
            (Bt(O), li(de[0]));
      }
    }
    const ae = on(w);
    return (
      ae.addEventListener("keydown", re),
      () => {
        ae.removeEventListener("keydown", re);
      }
    );
  }, [r, y, w, f, R, v, ue, ne, H]),
    I.useEffect(() => {
      if (r || !p) return;
      function re() {
        (U.current = !0),
          setTimeout(() => {
            U.current = !1;
          });
      }
      function ae(O) {
        const de = O.relatedTarget;
        queueMicrotask(() => {
          const Pe = !(
            At(y, de) ||
            At(w, de) ||
            At(de, w) ||
            At(z?.portalNode, de) ||
            (de != null && de.hasAttribute(eu("focus-guard"))) ||
            (F &&
              (Mo(F.nodesRef.current, m).find((me) => {
                var De, Se;
                return (
                  At(
                    (De = me.context) == null ? void 0 : De.elements.floating,
                    de
                  ) ||
                  At(
                    (Se = me.context) == null
                      ? void 0
                      : Se.elements.domReference,
                    de
                  )
                );
              }) ||
                k5(F.nodesRef.current, m).find((me) => {
                  var De, Se;
                  return (
                    ((De = me.context) == null
                      ? void 0
                      : De.elements.floating) === de ||
                    ((Se = me.context) == null
                      ? void 0
                      : Se.elements.domReference) === de
                  );
                })))
          );
          de &&
            Pe &&
            !U.current &&
            de !== B.current &&
            ((Q.current = !0), E(!1, O));
        });
      }
      if (w && Yl(y))
        return (
          y.addEventListener("focusout", ae),
          y.addEventListener("pointerdown", re),
          !f && w.addEventListener("focusout", ae),
          () => {
            y.removeEventListener("focusout", ae),
              y.removeEventListener("pointerdown", re),
              !f && w.removeEventListener("focusout", ae);
          }
        );
    }, [r, y, w, f, m, F, z, E, p]),
    I.useEffect(() => {
      var re;
      if (r) return;
      const ae = Array.from(
        (z == null || (re = z.portalNode) == null
          ? void 0
          : re.querySelectorAll("[" + eu("portal") + "]")) || []
      );
      if (w) {
        const O = [
            w,
            ...ae,
            G.current,
            $.current,
            R.current.includes("reference") || ue ? y : null,
          ].filter((Pe) => Pe != null),
          de = f ? _x(O, k, !k) : _x(O);
        return () => {
          de();
        };
      }
    }, [r, y, w, f, R, z, ue, k]),
    Qe(() => {
      if (r || !w) return;
      const re = on(w),
        ae = $i(re);
      queueMicrotask(() => {
        const O = H(w),
          de = D.current,
          Pe = (typeof de == "number" ? O[de] : de.current) || w,
          me = At(w, ae);
        !q && !me && g && li(Pe, { preventScroll: Pe === w });
      });
    }, [r, g, w, q, H, D]),
    Qe(() => {
      if (r || !w) return;
      let re = !1;
      const ae = on(w),
        O = $i(ae),
        de = A.current;
      B.current = O;
      function Pe(me) {
        if (
          (me.type === "escapeKey" &&
            v.domReference.current &&
            (B.current = v.domReference.current),
          ["referencePress", "escapeKey"].includes(me.type))
        )
          return;
        const De = me.data.returnFocus;
        typeof De == "object"
          ? ((Q.current = !1), (re = De.preventScroll))
          : (Q.current = !De);
      }
      return (
        S.on("dismiss", Pe),
        () => {
          S.off("dismiss", Pe);
          const me = $i(ae);
          (At(w, me) ||
            (F &&
              Mo(F.nodesRef.current, m).some((Se) => {
                var Fe;
                return At(
                  (Fe = Se.context) == null ? void 0 : Fe.elements.floating,
                  me
                );
              })) ||
            (de.openEvent &&
              ["click", "mousedown"].includes(de.openEvent.type))) &&
            v.domReference.current &&
            (B.current = v.domReference.current),
            T.current &&
              Yl(B.current) &&
              !Q.current &&
              li(B.current, { cancelPrevious: !1, preventScroll: re });
        }
      );
    }, [r, w, T, A, v, S, F, m]),
    Qe(() => {
      if (!(r || !z))
        return (
          z.setFocusManagerState({
            modal: f,
            closeOnFocusOut: p,
            open: g,
            onOpenChange: E,
            refs: v,
          }),
          () => {
            z.setFocusManagerState(null);
          }
        );
    }, [r, z, f, g, E, v, p]),
    Qe(() => {
      if (!r && w && typeof MutationObserver == "function" && !q) {
        const re = () => {
          const O = w.getAttribute("tabindex");
          R.current.includes("floating") ||
          ($i(on(w)) !== v.domReference.current && ne().length === 0)
            ? O !== "0" && w.setAttribute("tabindex", "0")
            : O !== "-1" && w.setAttribute("tabindex", "-1");
        };
        re();
        const ae = new MutationObserver(re);
        return (
          ae.observe(w, { childList: !0, subtree: !0, attributes: !0 }),
          () => {
            ae.disconnect();
          }
        );
      }
    }, [r, w, v, R, ne, q]);
  function Z(re) {
    return r || !d || !f
      ? null
      : I.createElement(
          D5,
          {
            ref: re === "start" ? G : $,
            onClick: (ae) => E(!1, ae.nativeEvent),
          },
          typeof d == "string" ? d : "Dismiss"
        );
  }
  const _ = !r && k && !ue && (J || f);
  return I.createElement(
    I.Fragment,
    null,
    _ &&
      I.createElement(rf, {
        "data-type": "inside",
        ref: z?.beforeInsideRef,
        onFocus: (re) => {
          if (f) {
            const O = H();
            li(i[0] === "reference" ? O[0] : O[O.length - 1]);
          } else if (z != null && z.preserveTabOrder && z.portalNode)
            if (((Q.current = !1), rs(re, z.portalNode))) {
              const O = vb() || y;
              O?.focus();
            } else {
              var ae;
              (ae = z.beforeOutsideRef.current) == null || ae.focus();
            }
        },
      }),
    !ue && Z("start"),
    n,
    Z("end"),
    _ &&
      I.createElement(rf, {
        "data-type": "inside",
        ref: z?.afterInsideRef,
        onFocus: (re) => {
          if (f) li(H()[0]);
          else if (z != null && z.preserveTabOrder && z.portalNode)
            if ((p && (Q.current = !0), rs(re, z.portalNode))) {
              const O = yb() || y;
              O?.focus();
            } else {
              var ae;
              (ae = z.afterOutsideRef.current) == null || ae.focus();
            }
        },
      })
  );
}
const xh = new Set(),
  Eb = I.forwardRef(function (t, n) {
    let { lockScroll: r = !1, ...i } = t;
    const l = Ls();
    return (
      Qe(() => {
        if (!r) return;
        xh.add(l);
        const s = /iP(hone|ad|od)|iOS/.test(_v()),
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
            A =
              ((E = window.visualViewport) == null ? void 0 : E.offsetTop) || 0;
          Object.assign(a, {
            position: "fixed",
            top: -(v - Math.floor(A)) + "px",
            left: -(g - Math.floor(S)) + "px",
            right: "0",
          });
        }
        return () => {
          xh.delete(l),
            xh.size === 0 &&
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
      I.createElement(
        "div",
        Os({ ref: n }, i, {
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
  });
function Ix(e) {
  return Yl(e.target) && e.target.tagName === "BUTTON";
}
function Tx(e) {
  return Wk(e);
}
function N5(e, t) {
  t === void 0 && (t = {});
  const {
      open: n,
      onOpenChange: r,
      dataRef: i,
      elements: { domReference: l },
    } = e,
    {
      enabled: s = !0,
      event: a = "click",
      toggle: f = !0,
      ignoreMouse: d = !1,
      keyboardHandlers: p = !0,
    } = t,
    g = I.useRef(),
    v = I.useRef(!1);
  return I.useMemo(
    () =>
      s
        ? {
            reference: {
              onPointerDown(m) {
                g.current = m.pointerType;
              },
              onMouseDown(m) {
                m.button === 0 &&
                  ((Yc(g.current, !0) && d) ||
                    (a !== "click" &&
                      (n &&
                      f &&
                      (!i.current.openEvent ||
                        i.current.openEvent.type === "mousedown")
                        ? r(!1, m.nativeEvent)
                        : (m.preventDefault(), r(!0, m.nativeEvent)))));
              },
              onClick(m) {
                if (a === "mousedown" && g.current) {
                  g.current = void 0;
                  return;
                }
                (Yc(g.current, !0) && d) ||
                  (n &&
                  f &&
                  (!i.current.openEvent || i.current.openEvent.type === "click")
                    ? r(!1, m.nativeEvent)
                    : r(!0, m.nativeEvent));
              },
              onKeyDown(m) {
                (g.current = void 0),
                  !(m.defaultPrevented || !p || Ix(m)) &&
                    (m.key === " " &&
                      !Tx(l) &&
                      (m.preventDefault(), (v.current = !0)),
                    m.key === "Enter" && r(!(n && f), m.nativeEvent));
              },
              onKeyUp(m) {
                m.defaultPrevented ||
                  !p ||
                  Ix(m) ||
                  Tx(l) ||
                  (m.key === " " &&
                    v.current &&
                    ((v.current = !1), r(!(n && f), m.nativeEvent)));
              },
            },
          }
        : {},
    [s, i, a, d, p, l, f, n, r]
  );
}
const M5 = zS["useInsertionEffect".toString()],
  L5 = M5 || ((e) => e());
function eo(e) {
  const t = I.useRef(() => {});
  return (
    L5(() => {
      t.current = e;
    }),
    I.useCallback(function () {
      for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
        r[i] = arguments[i];
      return t.current == null ? void 0 : t.current(...r);
    }, [])
  );
}
const F5 = {
    pointerdown: "onPointerDown",
    mousedown: "onMouseDown",
    click: "onClick",
  },
  z5 = {
    pointerdown: "onPointerDownCapture",
    mousedown: "onMouseDownCapture",
    click: "onClickCapture",
  },
  $5 = (e) => {
    var t, n;
    return {
      escapeKeyBubbles:
        typeof e == "boolean" ? e : (t = e?.escapeKey) != null ? t : !1,
      outsidePressBubbles:
        typeof e == "boolean" ? e : (n = e?.outsidePress) != null ? n : !0,
    };
  };
function Cb(e, t) {
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
      ancestorScroll: A = !1,
      bubbles: y,
    } = t,
    w = fo(),
    k = Go() != null,
    R = eo(typeof v == "function" ? v : () => !1),
    D = typeof v == "function" ? R : v,
    T = I.useRef(!1),
    { escapeKeyBubbles: F, outsidePressBubbles: z } = $5(y),
    q = eo(($) => {
      if (!n || !p || !g || $.key !== "Escape") return;
      const Q = w ? Mo(w.nodesRef.current, l) : [];
      if (!F && ($.stopPropagation(), Q.length > 0)) {
        let B = !0;
        if (
          (Q.forEach((U) => {
            var J;
            if (
              (J = U.context) != null &&
              J.open &&
              !U.context.dataRef.current.__escapeKeyBubbles
            ) {
              B = !1;
              return;
            }
          }),
          !B)
        )
          return;
      }
      i.emit("dismiss", {
        type: "escapeKey",
        data: { returnFocus: { preventScroll: !1 } },
      }),
        r(!1, s6($) ? $.nativeEvent : $);
    }),
    G = eo(($) => {
      const Q = T.current;
      if (((T.current = !1), Q || (typeof D == "function" && !D($)))) return;
      const B = Ov($),
        U = "[" + eu("inert") + "]",
        J = on(f).querySelectorAll(U);
      let ue = mn(B) ? B : null;
      for (; ue && !r6(ue); ) {
        const Z = o6(ue);
        if (Z === on(f).body || !mn(Z)) break;
        ue = Z;
      }
      if (
        J.length &&
        mn(B) &&
        !a6(B) &&
        !At(B, f) &&
        Array.from(J).every((Z) => !At(ue, Z))
      )
        return;
      if (Yl(B) && f) {
        const Z = B.clientWidth > 0 && B.scrollWidth > B.clientWidth,
          _ = B.clientHeight > 0 && B.scrollHeight > B.clientHeight;
        let re = _ && $.offsetX > B.clientWidth;
        if (
          (_ &&
            i6(B).direction === "rtl" &&
            (re = $.offsetX <= B.offsetWidth - B.clientWidth),
          re || (Z && $.offsetY > B.clientHeight))
        )
          return;
      }
      const ne =
        w &&
        Mo(w.nodesRef.current, l).some((Z) => {
          var _;
          return hh($, (_ = Z.context) == null ? void 0 : _.elements.floating);
        });
      if (hh($, f) || hh($, a) || ne) return;
      const H = w ? Mo(w.nodesRef.current, l) : [];
      if (H.length > 0) {
        let Z = !0;
        if (
          (H.forEach((_) => {
            var re;
            if (
              (re = _.context) != null &&
              re.open &&
              !_.context.dataRef.current.__outsidePressBubbles
            ) {
              Z = !1;
              return;
            }
          }),
          !Z)
        )
          return;
      }
      i.emit("dismiss", {
        type: "outsidePress",
        data: { returnFocus: k ? { preventScroll: !0 } : Uk($) || Hk($) },
      }),
        r(!1, $);
    });
  return (
    I.useEffect(() => {
      if (!n || !p) return;
      (d.current.__escapeKeyBubbles = F), (d.current.__outsidePressBubbles = z);
      function $(U) {
        r(!1, U);
      }
      const Q = on(f);
      g && Q.addEventListener("keydown", q), D && Q.addEventListener(m, G);
      let B = [];
      return (
        A &&
          (mn(a) && (B = Ji(a)),
          mn(f) && (B = B.concat(Ji(f))),
          !mn(s) &&
            s &&
            s.contextElement &&
            (B = B.concat(Ji(s.contextElement)))),
        (B = B.filter((U) => {
          var J;
          return (
            U !== ((J = Q.defaultView) == null ? void 0 : J.visualViewport)
          );
        })),
        B.forEach((U) => {
          U.addEventListener("scroll", $, { passive: !0 });
        }),
        () => {
          g && Q.removeEventListener("keydown", q),
            D && Q.removeEventListener(m, G),
            B.forEach((U) => {
              U.removeEventListener("scroll", $);
            });
        }
      );
    }, [d, f, a, s, g, D, m, n, r, A, p, F, z, q, G]),
    I.useEffect(() => {
      T.current = !1;
    }, [D, m]),
    I.useMemo(
      () =>
        p
          ? {
              reference: {
                onKeyDown: q,
                [F5[S]]: ($) => {
                  E &&
                    (i.emit("dismiss", {
                      type: "referencePress",
                      data: { returnFocus: !1 },
                    }),
                    r(!1, $.nativeEvent));
                },
              },
              floating: {
                onKeyDown: q,
                [z5[m]]: () => {
                  T.current = !0;
                },
              },
            }
          : {},
      [p, i, E, m, S, r, q]
    )
  );
}
function Fv(e) {
  var t;
  e === void 0 && (e = {});
  const { open: n = !1, onOpenChange: r, nodeId: i } = e,
    [l, s] = I.useState(null),
    a = ((t = e.elements) == null ? void 0 : t.reference) || l,
    f = K6(e),
    d = fo(),
    p = eo((R, D) => {
      R && (v.current.openEvent = D), r?.(R, D);
    }),
    g = I.useRef(null),
    v = I.useRef({}),
    m = I.useState(() => db())[0],
    E = Ls(),
    S = I.useCallback(
      (R) => {
        const D = mn(R)
          ? {
              getBoundingClientRect: () => R.getBoundingClientRect(),
              contextElement: R,
            }
          : R;
        f.refs.setReference(D);
      },
      [f.refs]
    ),
    A = I.useCallback(
      (R) => {
        (mn(R) || R === null) && ((g.current = R), s(R)),
          (mn(f.refs.reference.current) ||
            f.refs.reference.current === null ||
            (R !== null && !mn(R))) &&
            f.refs.setReference(R);
      },
      [f.refs]
    ),
    y = I.useMemo(
      () => ({
        ...f.refs,
        setReference: A,
        setPositionReference: S,
        domReference: g,
      }),
      [f.refs, A, S]
    ),
    w = I.useMemo(() => ({ ...f.elements, domReference: a }), [f.elements, a]),
    k = I.useMemo(
      () => ({
        ...f,
        refs: y,
        elements: w,
        dataRef: v,
        nodeId: i,
        floatingId: E,
        events: m,
        open: n,
        onOpenChange: p,
      }),
      [f, i, E, m, n, p, y, w]
    );
  return (
    Qe(() => {
      const R = d?.nodesRef.current.find((D) => D.id === i);
      R && (R.context = k);
    }),
    I.useMemo(() => ({ ...f, context: k, refs: y, elements: w }), [f, y, w, k])
  );
}
function Sh(e, t, n) {
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
function kb(e) {
  e === void 0 && (e = []);
  const t = e,
    n = I.useCallback((l) => Sh(l, e, "reference"), t),
    r = I.useCallback((l) => Sh(l, e, "floating"), t),
    i = I.useCallback(
      (l) => Sh(l, e, "item"),
      e.map((l) => l?.item)
    );
  return I.useMemo(
    () => ({ getReferenceProps: n, getFloatingProps: r, getItemProps: i }),
    [n, r, i]
  );
}
let Px = !1;
function rd(e, t, n) {
  switch (e) {
    case "vertical":
      return t;
    case "horizontal":
      return n;
    default:
      return t || n;
  }
}
function Rx(e, t) {
  return rd(t, e === Dv || e === nd, e === Jl || e === Ms);
}
function Eh(e, t, n) {
  return (
    rd(t, e === nd, n ? e === Jl : e === Ms) ||
    e === "Enter" ||
    e == " " ||
    e === ""
  );
}
function B5(e, t, n) {
  return rd(t, n ? e === Jl : e === Ms, e === nd);
}
function Ax(e, t, n) {
  return rd(t, n ? e === Ms : e === Jl, e === Dv);
}
function U5(e, t) {
  const {
      open: n,
      onOpenChange: r,
      refs: i,
      elements: { domReference: l, floating: s },
    } = e,
    {
      listRef: a,
      activeIndex: f,
      onNavigate: d = () => {},
      enabled: p = !0,
      selectedIndex: g = null,
      allowEscape: v = !1,
      loop: m = !1,
      nested: E = !1,
      rtl: S = !1,
      virtual: A = !1,
      focusItemOnOpen: y = "auto",
      focusItemOnHover: w = !0,
      openOnArrowKeyDown: k = !0,
      disabledIndices: R = void 0,
      orientation: D = "vertical",
      cols: T = 1,
      scrollItemIntoView: F = !0,
      virtualItemRef: z,
    } = t,
    q = Go(),
    G = fo(),
    $ = eo(d),
    Q = I.useRef(y),
    B = I.useRef(g ?? -1),
    U = I.useRef(null),
    J = I.useRef(!0),
    ue = I.useRef($),
    ne = I.useRef(!!s),
    H = I.useRef(!1),
    Z = I.useRef(!1),
    _ = yn(R),
    re = yn(n),
    ae = yn(F),
    [O, de] = I.useState(),
    [Pe, me] = I.useState(),
    De = eo(function (Ie, Ue, ze) {
      ze === void 0 && (ze = !1);
      const Ge = Ie.current[Ue.current];
      Ge &&
        (A
          ? (de(Ge.id),
            G?.events.emit("virtualfocus", Ge),
            z && (z.current = Ge))
          : li(Ge, {
              preventScroll: !0,
              sync: u6() && jk() ? Px || H.current : !1,
            }),
        requestAnimationFrame(() => {
          const yt = ae.current;
          yt &&
            Ge &&
            (ze || !J.current) &&
            (Ge.scrollIntoView == null ||
              Ge.scrollIntoView(
                typeof yt == "boolean"
                  ? { block: "nearest", inline: "nearest" }
                  : yt
              ));
        }));
    });
  Qe(() => {
    document.createElement("div").focus({
      get preventScroll() {
        return (Px = !0), !1;
      },
    });
  }, []),
    Qe(() => {
      p &&
        (n && s
          ? Q.current && g != null && ((Z.current = !0), $(g))
          : ne.current && ((B.current = -1), ue.current(null)));
    }, [p, n, s, g, $]),
    Qe(() => {
      if (p && n && s)
        if (f == null) {
          if (((H.current = !1), g != null)) return;
          if (
            (ne.current && ((B.current = -1), De(a, B)),
            !ne.current &&
              Q.current &&
              (U.current != null || (Q.current === !0 && U.current == null)))
          ) {
            let Ie = 0;
            const Ue = () => {
              a.current[0] == null
                ? (Ie < 2 && (Ie ? requestAnimationFrame : queueMicrotask)(Ue),
                  Ie++)
                : ((B.current =
                    U.current == null || Eh(U.current, D, S) || E
                      ? mh(a, _.current)
                      : Ex(a, _.current)),
                  (U.current = null),
                  $(B.current));
            };
            Ue();
          }
        } else
          ns(a, f) || ((B.current = f), De(a, B, Z.current), (Z.current = !1));
    }, [p, n, s, f, g, E, a, D, S, $, De, _]),
    Qe(() => {
      var Ie, Ue;
      if (!p || s || !G || A || !ne.current) return;
      const ze = G.nodesRef.current,
        Ge =
          (Ie = ze.find((he) => he.id === q)) == null ||
          (Ue = Ie.context) == null
            ? void 0
            : Ue.elements.floating,
        yt = $i(on(s)),
        Vn = ze.some(
          (he) => he.context && At(he.context.elements.floating, yt)
        );
      Ge && !Vn && J.current && Ge.focus({ preventScroll: !0 });
    }, [p, s, G, q, A]),
    Qe(() => {
      if (!p || !G || !A || q) return;
      function Ie(Ue) {
        me(Ue.id), z && (z.current = Ue);
      }
      return (
        G.events.on("virtualfocus", Ie),
        () => {
          G.events.off("virtualfocus", Ie);
        }
      );
    }, [p, G, A, q, z]),
    Qe(() => {
      (ue.current = $), (ne.current = !!s);
    }),
    Qe(() => {
      n || (U.current = null);
    }, [n]);
  const Se = f != null,
    Fe = I.useMemo(() => {
      function Ie(ze) {
        if (!n) return;
        const Ge = a.current.indexOf(ze);
        Ge !== -1 && $(Ge);
      }
      return {
        onFocus(ze) {
          let { currentTarget: Ge } = ze;
          Ie(Ge);
        },
        onClick: (ze) => {
          let { currentTarget: Ge } = ze;
          return Ge.focus({ preventScroll: !0 });
        },
        ...(w && {
          onMouseMove(ze) {
            let { currentTarget: Ge } = ze;
            Ie(Ge);
          },
          onPointerLeave(ze) {
            let { pointerType: Ge } = ze;
            !J.current ||
              Ge === "touch" ||
              ((B.current = -1),
              De(a, B),
              $(null),
              A || li(i.floating.current, { preventScroll: !0 }));
          },
        }),
      };
    }, [n, i, De, w, a, $, A]);
  return I.useMemo(() => {
    if (!p) return {};
    const Ie = _.current;
    function Ue(he) {
      if (
        ((J.current = !1),
        (H.current = !0),
        !re.current && he.currentTarget === i.floating.current)
      )
        return;
      if (E && Ax(he.key, D, S)) {
        Bt(he), r(!1, he.nativeEvent), Yl(l) && !A && l.focus();
        return;
      }
      const at = B.current,
        Lt = mh(a, Ie),
        kn = Ex(a, Ie);
      if (
        (he.key === "Home" && (Bt(he), (B.current = Lt), $(B.current)),
        he.key === "End" && (Bt(he), (B.current = kn), $(B.current)),
        !(
          T > 1 &&
          ((B.current = p5(a, {
            event: he,
            orientation: D,
            loop: m,
            cols: T,
            disabledIndices: Ie,
            minIndex: Lt,
            maxIndex: kn,
            prevIndex: B.current,
            stopEvent: !0,
          })),
          $(B.current),
          D === "both")
        ) && Rx(he.key, D))
      ) {
        if (
          (Bt(he),
          n && !A && $i(he.currentTarget.ownerDocument) === he.currentTarget)
        ) {
          (B.current = Eh(he.key, D, S) ? Lt : kn), $(B.current);
          return;
        }
        Eh(he.key, D, S)
          ? m
            ? (B.current =
                at >= kn
                  ? v && at !== a.current.length
                    ? -1
                    : Lt
                  : Qt(a, { startingIndex: at, disabledIndices: Ie }))
            : (B.current = Math.min(
                kn,
                Qt(a, { startingIndex: at, disabledIndices: Ie })
              ))
          : m
          ? (B.current =
              at <= Lt
                ? v && at !== -1
                  ? a.current.length
                  : kn
                : Qt(a, {
                    startingIndex: at,
                    decrement: !0,
                    disabledIndices: Ie,
                  }))
          : (B.current = Math.max(
              Lt,
              Qt(a, { startingIndex: at, decrement: !0, disabledIndices: Ie })
            )),
          ns(a, B.current) ? $(null) : $(B.current);
      }
    }
    function ze(he) {
      y === "auto" && Uk(he.nativeEvent) && (Q.current = !0);
    }
    function Ge(he) {
      (Q.current = y), y === "auto" && Hk(he.nativeEvent) && (Q.current = !0);
    }
    const yt = A && n && Se && { "aria-activedescendant": Pe || O },
      Vn = a.current.find((he) => he?.id === O);
    return {
      reference: {
        ...yt,
        onKeyDown(he) {
          J.current = !1;
          const at = he.key.indexOf("Arrow") === 0,
            Lt = B5(he.key, D, S),
            kn = Ax(he.key, D, S),
            bn = Rx(he.key, D),
            jt = (E ? Lt : bn) || he.key === "Enter" || he.key.trim() === "";
          if (A && n) {
            const Pr = G?.nodesRef.current.find((V) => V.parentId == null),
              qn = G && Pr ? b5(G.nodesRef.current, Pr.id) : null;
            if (at && qn && z) {
              const V = new KeyboardEvent("keydown", {
                key: he.key,
                bubbles: !0,
              });
              if (Lt || kn) {
                var Tr, Gr;
                const ie =
                    ((Tr = qn.context) == null
                      ? void 0
                      : Tr.elements.domReference) === he.currentTarget,
                  pe =
                    kn && !ie
                      ? (Gr = qn.context) == null
                        ? void 0
                        : Gr.elements.domReference
                      : Lt
                      ? Vn
                      : null;
                pe && (Bt(he), pe.dispatchEvent(V), me(void 0));
              }
              if (
                bn &&
                qn.context &&
                qn.context.open &&
                qn.parentId &&
                he.currentTarget !== qn.context.elements.domReference
              ) {
                var Qo;
                Bt(he),
                  (Qo = qn.context.elements.domReference) == null ||
                    Qo.dispatchEvent(V);
                return;
              }
            }
            return Ue(he);
          }
          if (!(!n && !k && at)) {
            if ((jt && (U.current = E && bn ? null : he.key), E)) {
              Lt &&
                (Bt(he),
                n
                  ? ((B.current = mh(a, Ie)), $(B.current))
                  : r(!0, he.nativeEvent));
              return;
            }
            bn &&
              (g != null && (B.current = g),
              Bt(he),
              !n && k ? r(!0, he.nativeEvent) : Ue(he),
              n && $(B.current));
          }
        },
        onFocus() {
          n && $(null);
        },
        onPointerDown: Ge,
        onMouseDown: ze,
        onClick: ze,
      },
      floating: {
        "aria-orientation": D === "both" ? void 0 : D,
        ...yt,
        onKeyDown: Ue,
        onPointerMove() {
          J.current = !0;
        },
      },
      item: Fe,
    };
  }, [
    l,
    i,
    O,
    Pe,
    _,
    re,
    a,
    p,
    D,
    S,
    A,
    n,
    Se,
    E,
    g,
    k,
    v,
    T,
    m,
    y,
    $,
    r,
    Fe,
    G,
    z,
  ]);
}
function H5(e, t) {
  t === void 0 && (t = {});
  const { open: n, floatingId: r } = e,
    { enabled: i = !0, role: l = "dialog" } = t,
    s = Ls();
  return I.useMemo(() => {
    const a = { id: r, role: l };
    return i
      ? l === "tooltip"
        ? { reference: { "aria-describedby": n ? r : void 0 }, floating: a }
        : {
            reference: {
              "aria-expanded": n ? "true" : "false",
              "aria-haspopup": l === "alertdialog" ? "dialog" : l,
              "aria-controls": n ? r : void 0,
              ...(l === "listbox" && { role: "combobox" }),
              ...(l === "menu" && { id: s }),
            },
            floating: { ...a, ...(l === "menu" && { "aria-labelledby": s }) },
          }
      : {};
  }, [i, l, n, r, s]);
}
const Dx = (e) =>
  e.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (t, n) => (n ? "-" : "") + t.toLowerCase()
  );
function hl(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function j5(e, t) {
  const [n, r] = I.useState(e);
  return (
    e && !n && r(!0),
    I.useEffect(() => {
      if (!e) {
        const i = setTimeout(() => r(!1), t);
        return () => clearTimeout(i);
      }
    }, [e, t]),
    n
  );
}
function W5(e, t) {
  t === void 0 && (t = {});
  const {
      open: n,
      elements: { floating: r },
    } = e,
    { duration: i = 250 } = t,
    s = (typeof i == "number" ? i : i.close) || 0,
    [a, f] = I.useState(!1),
    [d, p] = I.useState("unmounted"),
    g = j5(n, s);
  return (
    Qe(() => {
      a && !g && p("unmounted");
    }, [a, g]),
    Qe(() => {
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
function zv(e, t) {
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
    d = I.useMemo(() => ({ side: f, placement: a }), [f, a]),
    p = typeof s == "number",
    g = (p ? s : s.open) || 0,
    v = (p ? s : s.close) || 0,
    [m, E] = I.useState(() => ({ ...hl(l, d), ...hl(n, d) })),
    { isMounted: S, status: A } = W5(e, { duration: s }),
    y = yn(n),
    w = yn(r),
    k = yn(i),
    R = yn(l);
  return (
    Qe(() => {
      const D = hl(y.current, d),
        T = hl(k.current, d),
        F = hl(R.current, d),
        z =
          hl(w.current, d) ||
          Object.keys(D).reduce((q, G) => ((q[G] = ""), q), {});
      if (
        (A === "initial" &&
          E((q) => ({ transitionProperty: q.transitionProperty, ...F, ...D })),
        A === "open" &&
          E({
            transitionProperty: Object.keys(z).map(Dx).join(","),
            transitionDuration: g + "ms",
            ...F,
            ...z,
          }),
        A === "close")
      ) {
        const q = T || D;
        E({
          transitionProperty: Object.keys(q).map(Dx).join(","),
          transitionDuration: v + "ms",
          ...F,
          ...q,
        });
      }
    }, [v, k, y, w, R, g, A, d]),
    { isMounted: S, styles: m }
  );
}
function V5(e, t) {
  var n;
  const { open: r, dataRef: i } = e,
    {
      listRef: l,
      activeIndex: s,
      onMatch: a,
      onTypingChange: f,
      enabled: d = !0,
      findMatch: p = null,
      resetMs: g = 750,
      ignoreKeys: v = [],
      selectedIndex: m = null,
    } = t,
    E = I.useRef(),
    S = I.useRef(""),
    A = I.useRef((n = m ?? s) != null ? n : -1),
    y = I.useRef(null),
    w = eo(a),
    k = eo(f),
    R = yn(p),
    D = yn(v);
  return (
    Qe(() => {
      r && (clearTimeout(E.current), (y.current = null), (S.current = ""));
    }, [r]),
    Qe(() => {
      if (r && S.current === "") {
        var T;
        A.current = (T = m ?? s) != null ? T : -1;
      }
    }, [r, m, s]),
    I.useMemo(() => {
      if (!d) return {};
      function T(q) {
        q
          ? i.current.typing || ((i.current.typing = q), k(q))
          : i.current.typing && ((i.current.typing = q), k(q));
      }
      function F(q, G, $) {
        const Q = R.current
          ? R.current(G, $)
          : G.find(
              (B) => B?.toLocaleLowerCase().indexOf($.toLocaleLowerCase()) === 0
            );
        return Q ? q.indexOf(Q) : -1;
      }
      function z(q) {
        const G = l.current;
        if (
          (S.current.length > 0 &&
            S.current[0] !== " " &&
            (F(G, G, S.current) === -1 ? T(!1) : q.key === " " && Bt(q)),
          G == null ||
            D.current.includes(q.key) ||
            q.key.length !== 1 ||
            q.ctrlKey ||
            q.metaKey ||
            q.altKey)
        )
          return;
        r && q.key !== " " && (Bt(q), T(!0)),
          G.every((U) => {
            var J, ue;
            return U
              ? ((J = U[0]) == null ? void 0 : J.toLocaleLowerCase()) !==
                  ((ue = U[1]) == null ? void 0 : ue.toLocaleLowerCase())
              : !0;
          }) &&
            S.current === q.key &&
            ((S.current = ""), (A.current = y.current)),
          (S.current += q.key),
          clearTimeout(E.current),
          (E.current = setTimeout(() => {
            (S.current = ""), (A.current = y.current), T(!1);
          }, g));
        const Q = A.current,
          B = F(
            G,
            [...G.slice((Q || 0) + 1), ...G.slice(0, (Q || 0) + 1)],
            S.current
          );
        B !== -1
          ? (w(B), (y.current = B))
          : q.key !== " " && ((S.current = ""), T(!1));
      }
      return {
        reference: { onKeyDown: z },
        floating: {
          onKeyDown: z,
          onKeyUp(q) {
            q.key === " " && T(!1);
          },
        },
      };
    }, [d, r, i, l, g, D, R, w, k])
  );
}
function Nx(e, t) {
  const [n, r] = e;
  let i = !1;
  const l = t.length;
  for (let s = 0, a = l - 1; s < l; a = s++) {
    const [f, d] = t[s] || [0, 0],
      [p, g] = t[a] || [0, 0];
    d >= r != g >= r && n <= ((p - f) * (r - d)) / (g - d) + f && (i = !i);
  }
  return i;
}
function q5(e, t) {
  return (
    e[0] >= t.x &&
    e[0] <= t.x + t.width &&
    e[1] >= t.y &&
    e[1] <= t.y + t.height
  );
}
function G5(e) {
  e === void 0 && (e = {});
  const {
    buffer: t = 0.5,
    blockPointerEvents: n = !1,
    requireIntent: r = !0,
  } = e;
  let i,
    l = !1,
    s = null,
    a = null,
    f = performance.now();
  function d(g, v) {
    const m = performance.now(),
      E = m - f;
    if (s === null || a === null || E === 0)
      return (s = g), (a = v), (f = m), null;
    const S = g - s,
      A = v - a,
      w = Math.sqrt(S * S + A * A) / E;
    return (s = g), (a = v), (f = m), w;
  }
  const p = (g) => {
    let {
      x: v,
      y: m,
      placement: E,
      elements: S,
      onClose: A,
      nodeId: y,
      tree: w,
    } = g;
    return function (R) {
      function D() {
        clearTimeout(i), A();
      }
      if (
        (clearTimeout(i),
        !S.domReference || !S.floating || E == null || v == null || m == null)
      )
        return;
      const { clientX: T, clientY: F } = R,
        z = [T, F],
        q = Ov(R),
        G = R.type === "mouseleave",
        $ = At(S.floating, q),
        Q = At(S.domReference, q),
        B = S.domReference.getBoundingClientRect(),
        U = S.floating.getBoundingClientRect(),
        J = E.split("-")[0],
        ue = v > U.right - U.width / 2,
        ne = m > U.bottom - U.height / 2,
        H = q5(z, B),
        Z = U.width > B.width,
        _ = U.height > B.height,
        re = (Z ? B : U).left,
        ae = (Z ? B : U).right,
        O = (_ ? B : U).top,
        de = (_ ? B : U).bottom;
      if ($ && ((l = !0), !G)) return;
      if ((Q && (l = !1), Q && !G)) {
        l = !0;
        return;
      }
      if (
        (G && mn(R.relatedTarget) && At(S.floating, R.relatedTarget)) ||
        (w &&
          Mo(w.nodesRef.current, y).some((De) => {
            let { context: Se } = De;
            return Se?.open;
          }))
      )
        return;
      if (
        (J === "top" && m >= B.bottom - 1) ||
        (J === "bottom" && m <= B.top + 1) ||
        (J === "left" && v >= B.right - 1) ||
        (J === "right" && v <= B.left + 1)
      )
        return D();
      let Pe = [];
      switch (J) {
        case "top":
          Pe = [
            [re, B.top + 1],
            [re, U.bottom - 1],
            [ae, U.bottom - 1],
            [ae, B.top + 1],
          ];
          break;
        case "bottom":
          Pe = [
            [re, U.top + 1],
            [re, B.bottom - 1],
            [ae, B.bottom - 1],
            [ae, U.top + 1],
          ];
          break;
        case "left":
          Pe = [
            [U.right - 1, de],
            [U.right - 1, O],
            [B.left + 1, O],
            [B.left + 1, de],
          ];
          break;
        case "right":
          Pe = [
            [B.right - 1, de],
            [B.right - 1, O],
            [U.left + 1, O],
            [U.left + 1, de],
          ];
          break;
      }
      function me(De) {
        let [Se, Fe] = De;
        switch (J) {
          case "top": {
            const Ie = [
                Z ? Se + t / 2 : ue ? Se + t * 4 : Se - t * 4,
                Fe + t + 1,
              ],
              Ue = [Z ? Se - t / 2 : ue ? Se + t * 4 : Se - t * 4, Fe + t + 1],
              ze = [
                [U.left, ue || Z ? U.bottom - t : U.top],
                [U.right, ue ? (Z ? U.bottom - t : U.top) : U.bottom - t],
              ];
            return [Ie, Ue, ...ze];
          }
          case "bottom": {
            const Ie = [Z ? Se + t / 2 : ue ? Se + t * 4 : Se - t * 4, Fe - t],
              Ue = [Z ? Se - t / 2 : ue ? Se + t * 4 : Se - t * 4, Fe - t],
              ze = [
                [U.left, ue || Z ? U.top + t : U.bottom],
                [U.right, ue ? (Z ? U.top + t : U.bottom) : U.top + t],
              ];
            return [Ie, Ue, ...ze];
          }
          case "left": {
            const Ie = [
                Se + t + 1,
                _ ? Fe + t / 2 : ne ? Fe + t * 4 : Fe - t * 4,
              ],
              Ue = [Se + t + 1, _ ? Fe - t / 2 : ne ? Fe + t * 4 : Fe - t * 4];
            return [
              ...[
                [ne || _ ? U.right - t : U.left, U.top],
                [ne ? (_ ? U.right - t : U.left) : U.right - t, U.bottom],
              ],
              Ie,
              Ue,
            ];
          }
          case "right": {
            const Ie = [Se - t, _ ? Fe + t / 2 : ne ? Fe + t * 4 : Fe - t * 4],
              Ue = [Se - t, _ ? Fe - t / 2 : ne ? Fe + t * 4 : Fe - t * 4],
              ze = [
                [ne || _ ? U.left + t : U.right, U.top],
                [ne ? (_ ? U.left + t : U.right) : U.left + t, U.bottom],
              ];
            return [Ie, Ue, ...ze];
          }
        }
      }
      if (!Nx([T, F], Pe)) {
        if (l && !H) return D();
        if (!G && r) {
          const De = d(R.clientX, R.clientY);
          if (De !== null && De < 0.1) return D();
        }
        Nx([T, F], me([v, m]))
          ? !l && r && (i = window.setTimeout(D, 40))
          : D();
      }
    };
  };
  return (p.__options = { blockPointerEvents: n }), p;
}
const K5 = (
    { item: e, inventoryId: t, inventoryType: n, inventoryGroups: r },
    i
  ) => {
    const l = vi(),
      s = lu(),
      a = I.useRef(null),
      f = I.useCallback(
        () => lx(e, { type: n, groups: r }) && ux(e, n),
        [e, n, r]
      ),
      [{ isDragging: d }, p] = nL(
        () => ({
          type: "SLOT",
          collect: (w) => ({ isDragging: w.isDragging() }),
          item: () =>
            gn(e, n !== Xt.SHOP)
              ? {
                  inventory: n,
                  item: { name: e.name, slot: e.slot },
                  image: e?.name && `url(${jr(e) || "none"}`,
                }
              : null,
          canDrag: f,
        }),
        [n, e]
      ),
      [{ isOver: g }, v] = jc(
        () => ({
          accept: "SLOT",
          collect: (w) => ({ isOver: w.isOver() }),
          drop: (w) => {
            if ((s(ts()), n === Xt.SHOP)) {
              fx(w, { inventory: n, item: { slot: e.slot } });
              return;
            }
            switch (w.inventory) {
              case Xt.SHOP:
                fx(w, { inventory: n, item: { slot: e.slot } });
                break;
              case Xt.CRAFTING:
                t6(w, { inventory: n, item: { slot: e.slot } });
                break;
              default:
                zg(w, { inventory: n, item: { slot: e.slot } });
                break;
            }
          },
          canDrop: (w) =>
            (w.item.slot !== e.slot || w.inventory !== n) && n !== Xt.CRAFTING,
        }),
        [n, e]
      );
    zr("refreshSlots", (w) => {
      (!d && !w.items) ||
        !Array.isArray(w.items) ||
        !w.items.find((R) => R.item.slot === e.slot && R.inventory === t) ||
        l.dispatch({ type: "dnd-core/END_DRAG" });
    });
    const m = (w) => p(v(w)),
      E = (w) => {
        w.preventDefault(),
          !(n !== "player" || !gn(e)) &&
            s(IF({ item: e, coords: { x: w.clientX, y: w.clientY } }));
      },
      S = (w) => {
        s(ts()),
          a.current && clearTimeout(a.current),
          w.ctrlKey && gn(e) && n !== "shop" && n !== "crafting"
            ? zg({ item: e, inventory: n })
            : w.altKey && gn(e) && n === "player" && Xf(e);
      },
      A = Av([m, i]);
    let y = e.name;
    return (
      gn(e) &&
        e?.currency !== "money" &&
        e.currency !== "black_money" &&
        e.price &&
        e.price > 0 &&
        e.currency &&
        (y = e.currency),
      W("div", {
        ref: A,
        onContextMenu: E,
        onClick: S,
        className: "inventory-slot",
        style: {
          filter:
            !lx(e, { type: n, groups: r }) || !ux(e, n)
              ? "brightness(80%) grayscale(100%)"
              : void 0,
          opacity: d ? 0.4 : 1,
          backgroundImage: `url(${y ? jr(y) : "none"}`,
          border: g ? "1px dashed rgba(255,255,255,0.4)" : "",
        },
        children:
          gn(e) &&
          we("div", {
            className: "item-slot-wrapper",
            onMouseEnter: () => {
              a.current = setTimeout(() => {
                s(bF({ item: e, inventoryType: n }));
              }, 500);
            },
            onMouseLeave: () => {
              s(ts()),
                a.current && (clearTimeout(a.current), (a.current = null));
            },
            children: [
              we("div", {
                className:
                  n === "player" && e.slot <= 5
                    ? "item-hotslot-header-wrapper"
                    : "item-slot-header-wrapper",
                children: [
                  n === "player" &&
                    e.slot <= 5 &&
                    W("div", {
                      className: "inventory-slot-number",
                      children: e.slot,
                    }),
                  W("div", {
                    className: "item-slot-info-wrapper",
                    children: W("p", {
                      children: e.count
                        ? e.count.toLocaleString("en-us") + "x"
                        : "",
                    }),
                  }),
                ],
              }),
              we("div", {
                children: [
                  n !== "shop" &&
                    e?.durability !== void 0 &&
                    W(XF, { percent: e.durability, durability: !0 }),
                  n === "shop" &&
                    e?.price !== void 0 &&
                    W(Cn, {
                      children:
                        e?.currency !== "money" &&
                        e.currency !== "black_money" &&
                        e.price > 0 &&
                        e.currency
                          ? we("div", {
                              className: "item-slot-currency-wrapper",
                              children: [
                                we("p", {
                                  style: { color: "#2ECC71" },
                                  children: [
                                    "$",
                                    e.metadata && e.metadata.amount
                                      ? e.metadata.amount
                                      : e.price,
                                  ],
                                }),
                                W("img", {
                                  src: e.name ? jr(e.name) : "none",
                                  alt: "item-image",
                                  style: {
                                    imageRendering: "-webkit-optimize-contrast",
                                    height: "auto",
                                    width: "2vh",
                                    backfaceVisibility: "hidden",
                                    transform: "translateZ(0)",
                                  },
                                }),
                              ],
                            })
                          : W(Cn, {
                              children:
                                e.price > 0 &&
                                W("div", {
                                  className: "item-slot-price-wrapper",
                                  style: {
                                    color:
                                      e.currency === "money" || !e.currency
                                        ? "#2ECC71"
                                        : "#E74C3C",
                                  },
                                  children: we("p", {
                                    children: [
                                      gt.$ || "$",
                                      e.price.toLocaleString("en-us"),
                                    ],
                                  }),
                                }),
                            }),
                    }),
                ],
              }),
              W("div", {
                className: "item-slot-info-weight",
                children: W("p", {
                  children: (e.weight / 1e3).toFixed(2) + "kg",
                }),
              }),
            ],
          }),
      })
    );
  },
  bb = Ae.memo(Ae.forwardRef(K5));
function _b(e) {
  const [t, n] = I.useState(null),
    r = I.useRef(null);
  return {
    ref: I.useCallback(
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
var Ob = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Mx = Ae.createContext && Ae.createContext(Ob),
  Q5 = ["attr", "size", "title"];
function Y5(e, t) {
  if (e == null) return {};
  var n = X5(e, t),
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
function X5(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function of() {
  return (
    (of = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    of.apply(this, arguments)
  );
}
function Lx(e, t) {
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
function lf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Lx(Object(n), !0).forEach(function (r) {
          Z5(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Lx(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Z5(e, t, n) {
  return (
    (t = J5(t)),
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
function J5(e) {
  var t = ez(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ez(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ib(e) {
  return (
    e &&
    e.map((t, n) =>
      Ae.createElement(t.tag, lf({ key: n }, t.attr), Ib(t.child))
    )
  );
}
function Fs(e) {
  return (t) =>
    Ae.createElement(tz, of({ attr: lf({}, e.attr) }, t), Ib(e.child));
}
function tz(e) {
  var t = (n) => {
    var { attr: r, size: i, title: l } = e,
      s = Y5(e, Q5),
      a = i || n.size || "1em",
      f;
    return (
      n.className && (f = n.className),
      e.className && (f = (f ? f + " " : "") + e.className),
      Ae.createElement(
        "svg",
        of(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          s,
          {
            className: f,
            style: lf(lf({ color: e.color || n.color }, n.style), e.style),
            height: a,
            width: a,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        l && Ae.createElement("title", null, l),
        e.children
      )
    );
  };
  return Mx !== void 0
    ? Ae.createElement(Mx.Consumer, null, (n) => t(n))
    : t(Ob);
}
function nz(e) {
  return Fs({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z",
        },
        child: [],
      },
    ],
  })(e);
}
function rz(e) {
  return Fs({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z",
        },
        child: [],
      },
    ],
  })(e);
}
function Fx(e) {
  return Fs({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M20 8v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.86 1.28-3.41 3-3.86V2h3v2h4V2h3v2.14c1.72.45 3 2 3 3.86zM6 12v2h10v2h2v-4H6z",
        },
        child: [],
      },
    ],
  })(e);
}
const Tb = (e) => {
    const {
      inventory: { itemAmount: t },
    } = Mn.getState();
    _r("giveItem", { slot: e.slot, count: t });
  },
  iz = ({ infoVisible: e, setInfoVisible: t }) => {
    const { refs: n, context: r } = Fv({ open: e, onOpenChange: t }),
      i = Cb(r, { outsidePressEvent: "mousedown" }),
      { isMounted: l, styles: s } = zv(r),
      { getFloatingProps: a } = kb([i]);
    return W(Cn, {
      children:
        l &&
        W(Lv, {
          children: W(Eb, {
            lockScroll: !0,
            className: "useful-controls-dialog-overlay",
            "data-open": e,
            style: s,
            children: W(Sb, {
              context: r,
              children: we("div", {
                ref: n.setFloating,
                ...a(),
                className: "useful-controls-dialog",
                style: s,
                children: [
                  we("div", {
                    className: "useful-controls-dialog-title",
                    children: [
                      W("p", {
                        children: gt.ui_usefulcontrols || "Useful controls",
                      }),
                      W("div", {
                        className: "useful-controls-dialog-close",
                        onClick: () => t(!1),
                        children: W("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          height: "1em",
                          viewBox: "0 0 400 528",
                          children: W("path", {
                            d: "M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z",
                          }),
                        }),
                      }),
                    ],
                  }),
                  we("div", {
                    className: "useful-controls-content-wrapper",
                    children: [
                      we("p", {
                        children: [
                          W("kbd", { children: "RMB" }),
                          W("br", {}),
                          gt.ui_rmb,
                        ],
                      }),
                      we("p", {
                        children: [
                          W("kbd", { children: "ALT + LMB" }),
                          W("br", {}),
                          gt.ui_alt_lmb,
                        ],
                      }),
                      we("p", {
                        children: [
                          W("kbd", { children: "CTRL + LMB" }),
                          W("br", {}),
                          gt.ui_ctrl_lmb,
                        ],
                      }),
                      we("p", {
                        children: [
                          W("kbd", { children: "SHIFT + Drag" }),
                          W("br", {}),
                          gt.ui_shift_drag,
                        ],
                      }),
                      we("p", {
                        children: [
                          W("kbd", { children: "CTRL + SHIFT + LMB" }),
                          W("br", {}),
                          gt.ui_ctrl_shift_lmb,
                        ],
                      }),
                      W("div", {
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
  oz = () => {
    const e = yi(EF),
      t = lu(),
      [n, r] = I.useState(!1);
    return (
      jc(() => ({
        accept: "SLOT",
        drop: (l) => {
          l.inventory === "player" && Xf(l.item);
        },
      })),
      jc(() => ({
        accept: "SLOT",
        drop: (l) => {
          l.inventory === "player" && Tb(l.item);
        },
      })),
      we(Cn, {
        children: [
          W(iz, { infoVisible: n, setInfoVisible: r }),
          W("div", {
            className: "inventory-control",
            children: W("div", {
              className: "inventory-control-wrapper",
              children: W("input", {
                className: "inventory-control-input",
                type: "number",
                defaultValue: e,
                onChange: (l) => {
                  (l.target.valueAsNumber =
                    isNaN(l.target.valueAsNumber) || l.target.valueAsNumber < 0
                      ? 0
                      : Math.floor(l.target.valueAsNumber)),
                    t(hF(l.target.valueAsNumber));
                },
                min: 0,
              }),
            }),
          }),
        ],
      })
    );
  },
  zx = 30,
  Pb = ({ inventory: e, weight: t }) => {
    const [n, r] = I.useState(0),
      i = I.useRef(null),
      { ref: l, entry: s } = _b({ threshold: 0.5 }),
      a = yi((d) => d.inventory.isBusy);
    I.useEffect(() => {
      s && s.isIntersecting && r((d) => ++d);
    }, [s]);
    const f = ({ type: d }) =>
      d === "crafting" || d === "drop" || d === "newdrop"
        ? W(rz, {
            size: 25,
            style: { zIndex: 2 },
            color: "white",
            className: "icons",
          })
        : d === "player" || d === "otherplayer" || d === "inspect"
        ? W(Fx, {
            size: 25,
            style: { zIndex: 2 },
            color: "white",
            className: "icons",
          })
        : d === "trunk"
        ? W(nz, {
            size: 25,
            style: { zIndex: 2 },
            color: "white",
            className: "icons",
          })
        : W(Fx, {
            size: 25,
            style: { zIndex: 2 },
            color: "white",
            className: "icons",
          });
    return W(Cn, {
      children: we("div", {
        className: "inventory-grid-wrapper",
        style: { pointerEvents: a ? "none" : "auto" },
        children: [
          we("div", {
            className: "inventory-grid-header inventory-grid-header-container",
            children: [
              we("div", {
                className: "inventory-grid-header-wrapper",
                children: [
                  W("div", {
                    className: "inventory-grid-header-image",
                    style: { backgroundImage: `url(${jr("hexagono")})` },
                    children: W(f, { type: e.type }),
                  }),
                  we("div", {
                    children: [
                      W("p", { children: e.label }),
                      e.maxWeight &&
                        we("span", {
                          children: [
                            (t / 1e3).toFixed(2),
                            "/",
                            e.maxWeight / 1e3,
                            "kg",
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              e.type === "player" && W(oz, {}),
            ],
          }),
          W("div", {
            className: "inventory-grid-container",
            ref: i,
            children: W(Cn, {
              children: e.items
                .slice(0, (n + 1) * zx)
                .map((d, p) =>
                  W(
                    bb,
                    {
                      item: d,
                      ref: p === (n + 1) * zx - 1 ? l : null,
                      inventoryType: e.type,
                      inventoryGroups: e.groups,
                      inventoryId: e.id,
                    },
                    `${e.type}-${e.id}-${d.slot}`
                  )
                ),
            }),
          }),
        ],
      }),
    });
  };
function lz(e) {
  return Fs({
    tag: "svg",
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M496,224a48,48,0,1,0-48-48A48,48,0,0,0,496,224ZM311.47,178.45A56.77,56.77,0,0,1,328,176a56,56,0,0,1,19,3.49l15.35-48.61A24,24,0,0,0,342,99.74c-11.53-1.35-22.21,6.44-25.71,17.51l-20.9,66.17ZM93.65,386.33c.8-.19,1.54-.54,2.35-.71V359.93a156,156,0,0,1,107.06-148l73.7-22.76L310.92,81.05a24,24,0,0,0-20.33-31.11c-11.53-1.34-22.22,6.45-25.72,17.52L231.42,173.88a8,8,0,0,1-15.26-4.83L259.53,31.26A24,24,0,0,0,239.2.15C227.67-1.19,217,6.6,213.49,17.66L165.56,169.37a8,8,0,1,1-15.26-4.82l38.56-122a24,24,0,0,0-20.33-31.11C157,10,146.32,17.83,142.82,28.9l-60,189.85L80.76,168.7A24,24,0,0,0,56.9,144.55c-13.23-.05-24.72,10.54-24.9,23.86V281.14A123.69,123.69,0,0,0,93.65,386.33ZM519.1,336H360a8,8,0,0,1,0-16H488a24,24,0,0,0,23.54-28.76C509.35,279.84,498.71,272,487.1,272H288l47.09-17.06a24,24,0,0,0-14.18-45.88L213.19,242.31A123.88,123.88,0,0,0,128,360v25.65a79.78,79.78,0,0,1,58,108.63A118.9,118.9,0,0,0,248,512H456a24,24,0,0,0,23.54-28.76C477.35,471.84,466.71,464,455.1,464H360a8,8,0,0,1,0-16H488a24,24,0,0,0,23.54-28.76C509.35,407.84,498.71,400,487.1,400H360a8,8,0,0,1,0-16H520a24,24,0,0,0,23.54-28.76C541.35,343.84,530.71,336,519.1,336ZM416,64a32,32,0,1,0-32-32A32,32,0,0,0,416,64ZM112,416a48,48,0,1,0,48,48A48,48,0,0,0,112,416Z",
        },
        child: [],
      },
    ],
  })(e);
}
function uz(e) {
  return Fs({
    tag: "svg",
    attr: { viewBox: "0 0 192 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z",
        },
        child: [],
      },
    ],
  })(e);
}
const sz = () => {
    const e = yi(SF),
      [, t] = jc(() => ({
        accept: "SLOT",
        drop: (r) => {
          r.inventory === "player" && Xf(r.item);
        },
      })),
      n = I.useMemo(
        () =>
          e.maxWeight !== void 0 ? Math.floor(Ik(e.items) * 1e3) / 1e3 : 0,
        [e.maxWeight, e.items]
      );
    return we("div", {
      className: "inventory-right-container",
      children: [
        W(Pb, { inventory: e, weight: n }),
        W("span", { className: "line" }),
        we("button", {
          className: "inventory-control-button",
          ref: t,
          children: [W(lz, { size: 40 }), gt.ui_use || "Usar"],
        }),
      ],
    });
  },
  az = () => {
    const e = yi(Pk),
      [t, n] = I.useState(0),
      { ref: r, entry: i } = _b({ threshold: 0.5 });
    I.useEffect(() => {
      i && i.isIntersecting && n((a) => ++a);
    }, [i]);
    const l = I.useMemo(
        () =>
          e.maxWeight !== void 0 ? Math.floor(Ik(e.items) * 1e3) / 1e3 : 0,
        [e.maxWeight, e.items]
      ),
      s = { ...e };
    return (
      (s.items = e.items.slice(5, (t + 1) * e.slots)),
      we("div", {
        className: "inventory-left-container",
        children: [
          we("div", {
            className: "inventory-grid-header-wrapper inventory-grid-header",
            children: [
              W("div", {
                className: "inventory-grid-header-image",
                style: { backgroundImage: `url(${jr("hexagono")})` },
                children: W(uz, {
                  size: 25,
                  style: { zIndex: 2 },
                  color: "white",
                  className: "icons",
                }),
              }),
              we("div", {
                children: [
                  W("p", { children: "Corpo" }),
                  W("span", { children: "Esse é seu inventário rapido" }),
                ],
              }),
            ],
          }),
          W("div", {
            className: "inventory-grid-hotbar",
            children: e.items
              .slice(0, 5)
              .map((a, f) =>
                W(
                  bb,
                  {
                    item: a,
                    ref: f === (t + 1) * e.slots - 1 ? r : null,
                    inventoryType: e.type,
                    inventoryGroups: e.groups,
                    inventoryId: e.id,
                  },
                  `${e.type}-${e.id}-${a.slot}`
                )
              ),
          }),
          W(Pb, { inventory: s, weight: l }),
        ],
      })
    );
  },
  $x = ["http", "https", "mailto", "tel"];
function cz(e) {
  const t = (e || "").trim(),
    n = t.charAt(0);
  if (n === "#" || n === "/") return t;
  const r = t.indexOf(":");
  if (r === -1) return t;
  let i = -1;
  for (; ++i < $x.length; ) {
    const l = $x[i];
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
 */ var fz = function (t) {
  return (
    t != null &&
    t.constructor != null &&
    typeof t.constructor.isBuffer == "function" &&
    t.constructor.isBuffer(t)
  );
};
const Rb = uo(fz);
function is(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
    ? Bx(e.position)
    : "start" in e || "end" in e
    ? Bx(e)
    : "line" in e || "column" in e
    ? jg(e)
    : "";
}
function jg(e) {
  return Ux(e && e.line) + ":" + Ux(e && e.column);
}
function Bx(e) {
  return jg(e && e.start) + "-" + jg(e && e.end);
}
function Ux(e) {
  return e && typeof e == "number" ? e : 1;
}
class fr extends Error {
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
      (this.name = is(n) || "1:1"),
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
fr.prototype.file = "";
fr.prototype.name = "";
fr.prototype.reason = "";
fr.prototype.message = "";
fr.prototype.stack = "";
fr.prototype.fatal = null;
fr.prototype.column = null;
fr.prototype.line = null;
fr.prototype.source = null;
fr.prototype.ruleId = null;
fr.prototype.position = null;
const Lr = { basename: dz, dirname: pz, extname: hz, join: gz, sep: "/" };
function dz(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  zs(e);
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
function pz(e) {
  if ((zs(e), e.length === 0)) return ".";
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
function hz(e) {
  zs(e);
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
function gz(...e) {
  let t = -1,
    n;
  for (; ++t < e.length; )
    zs(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : mz(n);
}
function mz(e) {
  zs(e);
  const t = e.charCodeAt(0) === 47;
  let n = vz(e, !t);
  return (
    n.length === 0 && !t && (n = "."),
    n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"),
    t ? "/" + n : n
  );
}
function vz(e, t) {
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
function zs(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const yz = { cwd: wz };
function wz() {
  return "/";
}
function Wg(e) {
  return e !== null && typeof e == "object" && e.href && e.origin;
}
function xz(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!Wg(e)) {
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
  return Sz(e);
}
function Sz(e) {
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
const Ch = ["history", "path", "basename", "stem", "extname", "dirname"];
class Ab {
  constructor(t) {
    let n;
    t
      ? typeof t == "string" || Ez(t)
        ? (n = { value: t })
        : Wg(t)
        ? (n = { path: t })
        : (n = t)
      : (n = {}),
      (this.data = {}),
      (this.messages = []),
      (this.history = []),
      (this.cwd = yz.cwd()),
      this.value,
      this.stored,
      this.result,
      this.map;
    let r = -1;
    for (; ++r < Ch.length; ) {
      const l = Ch[r];
      l in n &&
        n[l] !== void 0 &&
        n[l] !== null &&
        (this[l] = l === "history" ? [...n[l]] : n[l]);
    }
    let i;
    for (i in n) Ch.includes(i) || (this[i] = n[i]);
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    Wg(t) && (t = xz(t)),
      bh(t, "path"),
      this.path !== t && this.history.push(t);
  }
  get dirname() {
    return typeof this.path == "string" ? Lr.dirname(this.path) : void 0;
  }
  set dirname(t) {
    Hx(this.basename, "dirname"), (this.path = Lr.join(t || "", this.basename));
  }
  get basename() {
    return typeof this.path == "string" ? Lr.basename(this.path) : void 0;
  }
  set basename(t) {
    bh(t, "basename"),
      kh(t, "basename"),
      (this.path = Lr.join(this.dirname || "", t));
  }
  get extname() {
    return typeof this.path == "string" ? Lr.extname(this.path) : void 0;
  }
  set extname(t) {
    if ((kh(t, "extname"), Hx(this.dirname, "extname"), t)) {
      if (t.charCodeAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Lr.join(this.dirname, this.stem + (t || ""));
  }
  get stem() {
    return typeof this.path == "string"
      ? Lr.basename(this.path, this.extname)
      : void 0;
  }
  set stem(t) {
    bh(t, "stem"),
      kh(t, "stem"),
      (this.path = Lr.join(this.dirname || "", t + (this.extname || "")));
  }
  toString(t) {
    return (this.value || "").toString(t || void 0);
  }
  message(t, n, r) {
    const i = new fr(t, n, r);
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
function kh(e, t) {
  if (e && e.includes(Lr.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Lr.sep + "`"
    );
}
function bh(e, t) {
  if (!e) throw new Error("`" + t + "` cannot be empty");
}
function Hx(e, t) {
  if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Ez(e) {
  return Rb(e);
}
function jx(e) {
  if (e) throw e;
}
var hc = Object.prototype.hasOwnProperty,
  Db = Object.prototype.toString,
  Wx = Object.defineProperty,
  Vx = Object.getOwnPropertyDescriptor,
  qx = function (t) {
    return typeof Array.isArray == "function"
      ? Array.isArray(t)
      : Db.call(t) === "[object Array]";
  },
  Gx = function (t) {
    if (!t || Db.call(t) !== "[object Object]") return !1;
    var n = hc.call(t, "constructor"),
      r =
        t.constructor &&
        t.constructor.prototype &&
        hc.call(t.constructor.prototype, "isPrototypeOf");
    if (t.constructor && !n && !r) return !1;
    var i;
    for (i in t);
    return typeof i > "u" || hc.call(t, i);
  },
  Kx = function (t, n) {
    Wx && n.name === "__proto__"
      ? Wx(t, n.name, {
          enumerable: !0,
          configurable: !0,
          value: n.newValue,
          writable: !0,
        })
      : (t[n.name] = n.newValue);
  },
  Qx = function (t, n) {
    if (n === "__proto__")
      if (hc.call(t, n)) {
        if (Vx) return Vx(t, n).value;
      } else return;
    return t[n];
  },
  Cz = function e() {
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
          (r = Qx(a, n)),
            (i = Qx(t, n)),
            a !== i &&
              (p && i && (Gx(i) || (l = qx(i)))
                ? (l
                    ? ((l = !1), (s = r && qx(r) ? r : []))
                    : (s = r && Gx(r) ? r : {}),
                  Kx(a, { name: n, newValue: e(p, s, i) }))
                : typeof i < "u" && Kx(a, { name: n, newValue: i }));
    return a;
  };
const Yx = uo(Cz);
function Vg(e) {
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
function kz() {
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
      (i = d), p ? bz(p, a)(...d) : s(null, ...d);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return e.push(i), t;
  }
}
function bz(e, t) {
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
const _z = Mb().freeze(),
  Nb = {}.hasOwnProperty;
function Mb() {
  const e = kz(),
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
    const S = Mb();
    let A = -1;
    for (; ++A < t.length; ) S.use(...t[A]);
    return S.data(Yx(!0, {}, n)), S;
  }
  function s(S, A) {
    return typeof S == "string"
      ? arguments.length === 2
        ? (Ih("data", r), (n[S] = A), l)
        : (Nb.call(n, S) && n[S]) || null
      : S
      ? (Ih("data", r), (n = S), l)
      : n;
  }
  function a() {
    if (r) return l;
    for (; ++i < t.length; ) {
      const [S, ...A] = t[i];
      if (A[0] === !1) continue;
      A[0] === !0 && (A[0] = void 0);
      const y = S.call(l, ...A);
      typeof y == "function" && e.use(y);
    }
    return (r = !0), (i = Number.POSITIVE_INFINITY), l;
  }
  function f(S, ...A) {
    let y;
    if ((Ih("use", r), S != null))
      if (typeof S == "function") D(S, ...A);
      else if (typeof S == "object") Array.isArray(S) ? R(S) : k(S);
      else throw new TypeError("Expected usable value, not `" + S + "`");
    return y && (n.settings = Object.assign(n.settings || {}, y)), l;
    function w(T) {
      if (typeof T == "function") D(T);
      else if (typeof T == "object")
        if (Array.isArray(T)) {
          const [F, ...z] = T;
          D(F, ...z);
        } else k(T);
      else throw new TypeError("Expected usable value, not `" + T + "`");
    }
    function k(T) {
      R(T.plugins), T.settings && (y = Object.assign(y || {}, T.settings));
    }
    function R(T) {
      let F = -1;
      if (T != null)
        if (Array.isArray(T))
          for (; ++F < T.length; ) {
            const z = T[F];
            w(z);
          }
        else throw new TypeError("Expected a list of plugins, not `" + T + "`");
    }
    function D(T, F) {
      let z = -1,
        q;
      for (; ++z < t.length; )
        if (t[z][0] === T) {
          q = t[z];
          break;
        }
      q
        ? (Vg(q[1]) && Vg(F) && (F = Yx(!0, q[1], F)), (q[1] = F))
        : t.push([...arguments]);
    }
  }
  function d(S) {
    l.freeze();
    const A = Lu(S),
      y = l.Parser;
    return (
      _h("parse", y),
      Xx(y, "parse") ? new y(String(A), A).parse() : y(String(A), A)
    );
  }
  function p(S, A) {
    l.freeze();
    const y = Lu(A),
      w = l.Compiler;
    return (
      Oh("stringify", w),
      Zx(S),
      Xx(w, "compile") ? new w(S, y).compile() : w(S, y)
    );
  }
  function g(S, A, y) {
    if (
      (Zx(S),
      l.freeze(),
      !y && typeof A == "function" && ((y = A), (A = void 0)),
      !y)
    )
      return new Promise(w);
    w(null, y);
    function w(k, R) {
      e.run(S, Lu(A), D);
      function D(T, F, z) {
        (F = F || S), T ? R(T) : k ? k(F) : y(null, F, z);
      }
    }
  }
  function v(S, A) {
    let y, w;
    return l.run(S, A, k), Jx("runSync", "run", w), y;
    function k(R, D) {
      jx(R), (y = D), (w = !0);
    }
  }
  function m(S, A) {
    if ((l.freeze(), _h("process", l.Parser), Oh("process", l.Compiler), !A))
      return new Promise(y);
    y(null, A);
    function y(w, k) {
      const R = Lu(S);
      l.run(l.parse(R), R, (T, F, z) => {
        if (T || !F || !z) D(T);
        else {
          const q = l.stringify(F, z);
          q == null || (Tz(q) ? (z.value = q) : (z.result = q)), D(T, z);
        }
      });
      function D(T, F) {
        T || !F ? k(T) : w ? w(F) : A(null, F);
      }
    }
  }
  function E(S) {
    let A;
    l.freeze(), _h("processSync", l.Parser), Oh("processSync", l.Compiler);
    const y = Lu(S);
    return l.process(y, w), Jx("processSync", "process", A), y;
    function w(k) {
      (A = !0), jx(k);
    }
  }
}
function Xx(e, t) {
  return (
    typeof e == "function" &&
    e.prototype &&
    (Oz(e.prototype) || t in e.prototype)
  );
}
function Oz(e) {
  let t;
  for (t in e) if (Nb.call(e, t)) return !0;
  return !1;
}
function _h(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Parser`");
}
function Oh(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Compiler`");
}
function Ih(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Zx(e) {
  if (!Vg(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Jx(e, t, n) {
  if (!n)
    throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function Lu(e) {
  return Iz(e) ? e : new Ab(e);
}
function Iz(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Tz(e) {
  return typeof e == "string" || Rb(e);
}
const Pz = {};
function Rz(e, t) {
  const n = t || Pz,
    r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0,
    i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Lb(e, r, i);
}
function Lb(e, t, n) {
  if (Az(e)) {
    if ("value" in e) return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return eS(e.children, t, n);
  }
  return Array.isArray(e) ? eS(e, t, n) : "";
}
function eS(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) r[i] = Lb(e[i], t, n);
  return r.join("");
}
function Az(e) {
  return !!(e && typeof e == "object");
}
function qr(e, t, n, r) {
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
function or(e, t) {
  return e.length > 0 ? (qr(e, e.length, 0, t), e) : t;
}
const tS = {}.hasOwnProperty;
function Dz(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; ) Nz(t, e[n]);
  return t;
}
function Nz(e, t) {
  let n;
  for (n in t) {
    const i = (tS.call(e, n) ? e[n] : void 0) || (e[n] = {}),
      l = t[n];
    let s;
    if (l)
      for (s in l) {
        tS.call(i, s) || (i[s] = []);
        const a = l[s];
        Mz(i[s], Array.isArray(a) ? a : a ? [a] : []);
      }
  }
}
function Mz(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; ) (t[n].add === "after" ? e : r).push(t[n]);
  qr(e, 0, 0, r);
}
const Lz =
    /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,
  $r = po(/[A-Za-z]/),
  Fn = po(/[\dA-Za-z]/),
  Fz = po(/[#-'*+\--9=?A-Z^-~]/);
function qg(e) {
  return e !== null && (e < 32 || e === 127);
}
const Gg = po(/\d/),
  zz = po(/[\dA-Fa-f]/),
  $z = po(/[!-/:-@[-`{-~]/);
function xe(e) {
  return e !== null && e < -2;
}
function En(e) {
  return e !== null && (e < 0 || e === 32);
}
function Ve(e) {
  return e === -2 || e === -1 || e === 32;
}
const Bz = po(Lz),
  Uz = po(/\s/);
function po(e) {
  return t;
  function t(n) {
    return n !== null && e.test(String.fromCharCode(n));
  }
}
function it(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return s;
  function s(f) {
    return Ve(f) ? (e.enter(n), a(f)) : t(f);
  }
  function a(f) {
    return Ve(f) && l++ < i ? (e.consume(f), a) : (e.exit(n), t(f));
  }
}
const Hz = { tokenize: jz };
function jz(e) {
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
      it(e, t, "linePrefix")
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
    return xe(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), s);
  }
}
const Wz = { tokenize: Vz },
  nS = { tokenize: qz };
function Vz(e) {
  const t = this,
    n = [];
  let r = 0,
    i,
    l,
    s;
  return a;
  function a(k) {
    if (r < n.length) {
      const R = n[r];
      return (t.containerState = R[1]), e.attempt(R[0].continuation, f, d)(k);
    }
    return d(k);
  }
  function f(k) {
    if ((r++, t.containerState._closeFlow)) {
      (t.containerState._closeFlow = void 0), i && w();
      const R = t.events.length;
      let D = R,
        T;
      for (; D--; )
        if (t.events[D][0] === "exit" && t.events[D][1].type === "chunkFlow") {
          T = t.events[D][1].end;
          break;
        }
      y(r);
      let F = R;
      for (; F < t.events.length; )
        (t.events[F][1].end = Object.assign({}, T)), F++;
      return (
        qr(t.events, D + 1, 0, t.events.slice(R)), (t.events.length = F), d(k)
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
    return (t.containerState = {}), e.check(nS, p, g)(k);
  }
  function p(k) {
    return i && w(), y(r), v(k);
  }
  function g(k) {
    return (
      (t.parser.lazy[t.now().line] = r !== n.length), (s = t.now().offset), E(k)
    );
  }
  function v(k) {
    return (t.containerState = {}), e.attempt(nS, m, E)(k);
  }
  function m(k) {
    return r++, n.push([t.currentConstruct, t.containerState]), v(k);
  }
  function E(k) {
    if (k === null) {
      i && w(), y(0), e.consume(k);
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
      A(e.exit("chunkFlow"), !0), y(0), e.consume(k);
      return;
    }
    return xe(k)
      ? (e.consume(k),
        A(e.exit("chunkFlow")),
        (r = 0),
        (t.interrupt = void 0),
        a)
      : (e.consume(k), S);
  }
  function A(k, R) {
    const D = t.sliceStream(k);
    if (
      (R && D.push(null),
      (k.previous = l),
      l && (l.next = k),
      (l = k),
      i.defineSkip(k.start),
      i.write(D),
      t.parser.lazy[k.start.line])
    ) {
      let T = i.events.length;
      for (; T--; )
        if (
          i.events[T][1].start.offset < s &&
          (!i.events[T][1].end || i.events[T][1].end.offset > s)
        )
          return;
      const F = t.events.length;
      let z = F,
        q,
        G;
      for (; z--; )
        if (t.events[z][0] === "exit" && t.events[z][1].type === "chunkFlow") {
          if (q) {
            G = t.events[z][1].end;
            break;
          }
          q = !0;
        }
      for (y(r), T = F; T < t.events.length; )
        (t.events[T][1].end = Object.assign({}, G)), T++;
      qr(t.events, z + 1, 0, t.events.slice(F)), (t.events.length = T);
    }
  }
  function y(k) {
    let R = n.length;
    for (; R-- > k; ) {
      const D = n[R];
      (t.containerState = D[1]), D[0].exit.call(t, e);
    }
    n.length = k;
  }
  function w() {
    i.write([null]),
      (l = void 0),
      (i = void 0),
      (t.containerState._closeFlow = void 0);
  }
}
function qz(e, t, n) {
  return it(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function rS(e) {
  if (e === null || En(e) || Uz(e)) return 1;
  if (Bz(e)) return 2;
}
function $v(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && ((t = l(t, n)), r.push(l));
  }
  return t;
}
const Kg = { name: "attention", tokenize: Kz, resolveAll: Gz };
function Gz(e, t) {
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
          iS(g, -f),
            iS(v, f),
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
              (d = or(d, [
                ["enter", e[r][1], t],
                ["exit", e[r][1], t],
              ])),
            (d = or(d, [
              ["enter", i, t],
              ["enter", s, t],
              ["exit", s, t],
              ["enter", l, t],
            ])),
            (d = or(
              d,
              $v(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)
            )),
            (d = or(d, [
              ["exit", l, t],
              ["enter", a, t],
              ["exit", a, t],
              ["exit", i, t],
            ])),
            e[n][1].end.offset - e[n][1].start.offset
              ? ((p = 2),
                (d = or(d, [
                  ["enter", e[n][1], t],
                  ["exit", e[n][1], t],
                ])))
              : (p = 0),
            qr(e, r - 1, n - r + 3, d),
            (n = r + d.length - p - 2);
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Kz(e, t) {
  const n = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = rS(r);
  let l;
  return s;
  function s(f) {
    return (l = f), e.enter("attentionSequence"), a(f);
  }
  function a(f) {
    if (f === l) return e.consume(f), a;
    const d = e.exit("attentionSequence"),
      p = rS(f),
      g = !p || (p === 2 && i) || n.includes(f),
      v = !i || (i === 2 && p) || n.includes(r);
    return (
      (d._open = !!(l === 42 ? g : g && (i || !v))),
      (d._close = !!(l === 42 ? v : v && (p || !g))),
      t(f)
    );
  }
}
function iS(e, t) {
  (e.column += t), (e.offset += t), (e._bufferIndex += t);
}
const Qz = { name: "autolink", tokenize: Yz };
function Yz(e, t, n) {
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
    return $r(m) ? (e.consume(m), s) : d(m);
  }
  function s(m) {
    return m === 43 || m === 45 || m === 46 || Fn(m) ? ((r = 1), a(m)) : d(m);
  }
  function a(m) {
    return m === 58
      ? (e.consume(m), (r = 0), f)
      : (m === 43 || m === 45 || m === 46 || Fn(m)) && r++ < 32
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
      : m === null || m === 32 || m === 60 || qg(m)
      ? n(m)
      : (e.consume(m), f);
  }
  function d(m) {
    return m === 64 ? (e.consume(m), p) : Fz(m) ? (e.consume(m), d) : n(m);
  }
  function p(m) {
    return Fn(m) ? g(m) : n(m);
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
    if ((m === 45 || Fn(m)) && r++ < 63) {
      const E = m === 45 ? v : g;
      return e.consume(m), E;
    }
    return n(m);
  }
}
const id = { tokenize: Xz, partial: !0 };
function Xz(e, t, n) {
  return r;
  function r(l) {
    return Ve(l) ? it(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || xe(l) ? t(l) : n(l);
  }
}
const Fb = {
  name: "blockQuote",
  tokenize: Zz,
  continuation: { tokenize: Jz },
  exit: e$,
};
function Zz(e, t, n) {
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
    return Ve(s)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(s),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        t)
      : (e.exit("blockQuotePrefix"), t(s));
  }
}
function Jz(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return Ve(s)
      ? it(
          e,
          l,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(s)
      : l(s);
  }
  function l(s) {
    return e.attempt(Fb, t, n)(s);
  }
}
function e$(e) {
  e.exit("blockQuote");
}
const zb = { name: "characterEscape", tokenize: t$ };
function t$(e, t, n) {
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
    return $z(l)
      ? (e.enter("characterEscapeValue"),
        e.consume(l),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        t)
      : n(l);
  }
}
const oS = document.createElement("i");
function Bv(e) {
  const t = "&" + e + ";";
  oS.innerHTML = t;
  const n = oS.textContent;
  return (n.charCodeAt(n.length - 1) === 59 && e !== "semi") || n === t
    ? !1
    : n;
}
const $b = { name: "characterReference", tokenize: n$ };
function n$(e, t, n) {
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
      : (e.enter("characterReferenceValue"), (l = 31), (s = Fn), p(g));
  }
  function d(g) {
    return g === 88 || g === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(g),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (l = 6),
        (s = zz),
        p)
      : (e.enter("characterReferenceValue"), (l = 7), (s = Gg), p(g));
  }
  function p(g) {
    if (g === 59 && i) {
      const v = e.exit("characterReferenceValue");
      return s === Fn && !Bv(r.sliceSerialize(v))
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
const lS = { tokenize: i$, partial: !0 },
  uS = { name: "codeFenced", tokenize: r$, concrete: !0 };
function r$(e, t, n) {
  const r = this,
    i = { tokenize: D, partial: !0 };
  let l = 0,
    s = 0,
    a;
  return f;
  function f(T) {
    return d(T);
  }
  function d(T) {
    const F = r.events[r.events.length - 1];
    return (
      (l =
        F && F[1].type === "linePrefix"
          ? F[2].sliceSerialize(F[1], !0).length
          : 0),
      (a = T),
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      p(T)
    );
  }
  function p(T) {
    return T === a
      ? (s++, e.consume(T), p)
      : s < 3
      ? n(T)
      : (e.exit("codeFencedFenceSequence"),
        Ve(T) ? it(e, g, "whitespace")(T) : g(T));
  }
  function g(T) {
    return T === null || xe(T)
      ? (e.exit("codeFencedFence"), r.interrupt ? t(T) : e.check(lS, S, R)(T))
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        v(T));
  }
  function v(T) {
    return T === null || xe(T)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), g(T))
      : Ve(T)
      ? (e.exit("chunkString"),
        e.exit("codeFencedFenceInfo"),
        it(e, m, "whitespace")(T))
      : T === 96 && T === a
      ? n(T)
      : (e.consume(T), v);
  }
  function m(T) {
    return T === null || xe(T)
      ? g(T)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        E(T));
  }
  function E(T) {
    return T === null || xe(T)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), g(T))
      : T === 96 && T === a
      ? n(T)
      : (e.consume(T), E);
  }
  function S(T) {
    return e.attempt(i, R, A)(T);
  }
  function A(T) {
    return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), y;
  }
  function y(T) {
    return l > 0 && Ve(T) ? it(e, w, "linePrefix", l + 1)(T) : w(T);
  }
  function w(T) {
    return T === null || xe(T)
      ? e.check(lS, S, R)(T)
      : (e.enter("codeFlowValue"), k(T));
  }
  function k(T) {
    return T === null || xe(T)
      ? (e.exit("codeFlowValue"), w(T))
      : (e.consume(T), k);
  }
  function R(T) {
    return e.exit("codeFenced"), t(T);
  }
  function D(T, F, z) {
    let q = 0;
    return G;
    function G(J) {
      return T.enter("lineEnding"), T.consume(J), T.exit("lineEnding"), $;
    }
    function $(J) {
      return (
        T.enter("codeFencedFence"),
        Ve(J)
          ? it(
              T,
              Q,
              "linePrefix",
              r.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4
            )(J)
          : Q(J)
      );
    }
    function Q(J) {
      return J === a ? (T.enter("codeFencedFenceSequence"), B(J)) : z(J);
    }
    function B(J) {
      return J === a
        ? (q++, T.consume(J), B)
        : q >= s
        ? (T.exit("codeFencedFenceSequence"),
          Ve(J) ? it(T, U, "whitespace")(J) : U(J))
        : z(J);
    }
    function U(J) {
      return J === null || xe(J) ? (T.exit("codeFencedFence"), F(J)) : z(J);
    }
  }
}
function i$(e, t, n) {
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
const Th = { name: "codeIndented", tokenize: l$ },
  o$ = { tokenize: u$, partial: !0 };
function l$(e, t, n) {
  const r = this;
  return i;
  function i(d) {
    return e.enter("codeIndented"), it(e, l, "linePrefix", 4 + 1)(d);
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
      : xe(d)
      ? e.attempt(o$, s, f)(d)
      : (e.enter("codeFlowValue"), a(d));
  }
  function a(d) {
    return d === null || xe(d)
      ? (e.exit("codeFlowValue"), s(d))
      : (e.consume(d), a);
  }
  function f(d) {
    return e.exit("codeIndented"), t(d);
  }
}
function u$(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line]
      ? n(s)
      : xe(s)
      ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i)
      : it(e, l, "linePrefix", 4 + 1)(s);
  }
  function l(s) {
    const a = r.events[r.events.length - 1];
    return a &&
      a[1].type === "linePrefix" &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : xe(s)
      ? i(s)
      : n(s);
  }
}
const s$ = { name: "codeText", tokenize: f$, resolve: a$, previous: c$ };
function a$(e) {
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
function c$(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function f$(e, t, n) {
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
      : xe(g)
      ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), f)
      : (e.enter("codeTextData"), d(g));
  }
  function d(g) {
    return g === null || g === 32 || g === 96 || xe(g)
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
function Bb(e) {
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
      r[1].contentType && (Object.assign(t, d$(e, n)), (n = t[n]), (d = !0));
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
        qr(e, i, n - i + 1, a));
    }
  }
  return !d;
}
function d$(e, t) {
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
  const A = [S];
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
      A.push(S),
      (m._tokenizer = void 0),
      (m.previous = void 0),
      (m = m.next));
  for (
    s.events = [],
      m ? ((m._tokenizer = void 0), (m.previous = void 0)) : A.pop(),
      v = A.length;
    v--;

  ) {
    const y = a.slice(A[v], A[v + 1]),
      w = l.pop();
    f.unshift([w, w + y.length - 1]), qr(e, w, 2, y);
  }
  for (v = -1; ++v < f.length; )
    (d[E + f[v][0]] = E + f[v][1]), (E += f[v][1] - f[v][0] - 1);
  return d;
}
const p$ = { tokenize: m$, resolve: g$ },
  h$ = { tokenize: v$, partial: !0 };
function g$(e) {
  return Bb(e), e;
}
function m$(e, t) {
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
    return a === null ? l(a) : xe(a) ? e.check(h$, s, l)(a) : (e.consume(a), i);
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
function v$(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return (
      e.exit("chunkContent"),
      e.enter("lineEnding"),
      e.consume(s),
      e.exit("lineEnding"),
      it(e, l, "linePrefix")
    );
  }
  function l(s) {
    if (s === null || xe(s)) return n(s);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") &&
      a &&
      a[1].type === "linePrefix" &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function Ub(e, t, n, r, i, l, s, a, f) {
  const d = f || Number.POSITIVE_INFINITY;
  let p = 0;
  return g;
  function g(y) {
    return y === 60
      ? (e.enter(r), e.enter(i), e.enter(l), e.consume(y), e.exit(l), v)
      : y === null || y === 32 || y === 41 || qg(y)
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
      : y === null || y === 60 || xe(y)
      ? n(y)
      : (e.consume(y), y === 92 ? E : m);
  }
  function E(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), m) : m(y);
  }
  function S(y) {
    return !p && (y === null || y === 41 || En(y))
      ? (e.exit("chunkString"), e.exit(a), e.exit(s), e.exit(r), t(y))
      : p < d && y === 40
      ? (e.consume(y), p++, S)
      : y === 41
      ? (e.consume(y), p--, S)
      : y === null || y === 32 || y === 40 || qg(y)
      ? n(y)
      : (e.consume(y), y === 92 ? A : S);
  }
  function A(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), S) : S(y);
  }
}
function Hb(e, t, n, r, i, l) {
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
      : xe(m)
      ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), p)
      : (e.enter("chunkString", { contentType: "string" }), g(m));
  }
  function g(m) {
    return m === null || m === 91 || m === 93 || xe(m) || a++ > 999
      ? (e.exit("chunkString"), p(m))
      : (e.consume(m), f || (f = !Ve(m)), m === 92 ? v : g);
  }
  function v(m) {
    return m === 91 || m === 92 || m === 93 ? (e.consume(m), a++, g) : g(m);
  }
}
function jb(e, t, n, r, i, l) {
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
      : xe(v)
      ? (e.enter("lineEnding"),
        e.consume(v),
        e.exit("lineEnding"),
        it(e, d, "linePrefix"))
      : (e.enter("chunkString", { contentType: "string" }), p(v));
  }
  function p(v) {
    return v === s || v === null || xe(v)
      ? (e.exit("chunkString"), d(v))
      : (e.consume(v), v === 92 ? g : p);
  }
  function g(v) {
    return v === s || v === 92 ? (e.consume(v), p) : p(v);
  }
}
function os(e, t) {
  let n;
  return r;
  function r(i) {
    return xe(i)
      ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), (n = !0), r)
      : Ve(i)
      ? it(e, r, n ? "linePrefix" : "lineSuffix")(i)
      : t(i);
  }
}
function zl(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const y$ = { name: "definition", tokenize: x$ },
  w$ = { tokenize: S$, partial: !0 };
function x$(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(m) {
    return e.enter("definition"), s(m);
  }
  function s(m) {
    return Hb.call(
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
      (i = zl(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      m === 58
        ? (e.enter("definitionMarker"),
          e.consume(m),
          e.exit("definitionMarker"),
          f)
        : n(m)
    );
  }
  function f(m) {
    return En(m) ? os(e, d)(m) : d(m);
  }
  function d(m) {
    return Ub(
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
    return e.attempt(w$, g, g)(m);
  }
  function g(m) {
    return Ve(m) ? it(e, v, "whitespace")(m) : v(m);
  }
  function v(m) {
    return m === null || xe(m)
      ? (e.exit("definition"), r.parser.defined.push(i), t(m))
      : n(m);
  }
}
function S$(e, t, n) {
  return r;
  function r(a) {
    return En(a) ? os(e, i)(a) : n(a);
  }
  function i(a) {
    return jb(
      e,
      l,
      n,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(a);
  }
  function l(a) {
    return Ve(a) ? it(e, s, "whitespace")(a) : s(a);
  }
  function s(a) {
    return a === null || xe(a) ? t(a) : n(a);
  }
}
const E$ = { name: "hardBreakEscape", tokenize: C$ };
function C$(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return xe(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const k$ = { name: "headingAtx", tokenize: _$, resolve: b$ };
function b$(e, t) {
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
      qr(e, r, n - r + 1, [
        ["enter", i, t],
        ["enter", l, t],
        ["exit", l, t],
        ["exit", i, t],
      ])),
    e
  );
}
function _$(e, t, n) {
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
      : p === null || En(p)
      ? (e.exit("atxHeadingSequence"), a(p))
      : n(p);
  }
  function a(p) {
    return p === 35
      ? (e.enter("atxHeadingSequence"), f(p))
      : p === null || xe(p)
      ? (e.exit("atxHeading"), t(p))
      : Ve(p)
      ? it(e, a, "whitespace")(p)
      : (e.enter("atxHeadingText"), d(p));
  }
  function f(p) {
    return p === 35 ? (e.consume(p), f) : (e.exit("atxHeadingSequence"), a(p));
  }
  function d(p) {
    return p === null || p === 35 || En(p)
      ? (e.exit("atxHeadingText"), a(p))
      : (e.consume(p), d);
  }
}
const O$ = [
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
  sS = ["pre", "script", "style", "textarea"],
  I$ = { name: "htmlFlow", tokenize: A$, resolveTo: R$, concrete: !0 },
  T$ = { tokenize: N$, partial: !0 },
  P$ = { tokenize: D$, partial: !0 };
function R$(e) {
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
function A$(e, t, n) {
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
      : $r(O)
      ? (e.consume(O), (s = String.fromCharCode(O)), A)
      : n(O);
  }
  function v(O) {
    return O === 45
      ? (e.consume(O), (i = 2), m)
      : O === 91
      ? (e.consume(O), (i = 5), (a = 0), E)
      : $r(O)
      ? (e.consume(O), (i = 4), r.interrupt ? t : _)
      : n(O);
  }
  function m(O) {
    return O === 45 ? (e.consume(O), r.interrupt ? t : _) : n(O);
  }
  function E(O) {
    const de = "CDATA[";
    return O === de.charCodeAt(a++)
      ? (e.consume(O), a === de.length ? (r.interrupt ? t : Q) : E)
      : n(O);
  }
  function S(O) {
    return $r(O) ? (e.consume(O), (s = String.fromCharCode(O)), A) : n(O);
  }
  function A(O) {
    if (O === null || O === 47 || O === 62 || En(O)) {
      const de = O === 47,
        Pe = s.toLowerCase();
      return !de && !l && sS.includes(Pe)
        ? ((i = 1), r.interrupt ? t(O) : Q(O))
        : O$.includes(s.toLowerCase())
        ? ((i = 6), de ? (e.consume(O), y) : r.interrupt ? t(O) : Q(O))
        : ((i = 7),
          r.interrupt && !r.parser.lazy[r.now().line] ? n(O) : l ? w(O) : k(O));
    }
    return O === 45 || Fn(O)
      ? (e.consume(O), (s += String.fromCharCode(O)), A)
      : n(O);
  }
  function y(O) {
    return O === 62 ? (e.consume(O), r.interrupt ? t : Q) : n(O);
  }
  function w(O) {
    return Ve(O) ? (e.consume(O), w) : G(O);
  }
  function k(O) {
    return O === 47
      ? (e.consume(O), G)
      : O === 58 || O === 95 || $r(O)
      ? (e.consume(O), R)
      : Ve(O)
      ? (e.consume(O), k)
      : G(O);
  }
  function R(O) {
    return O === 45 || O === 46 || O === 58 || O === 95 || Fn(O)
      ? (e.consume(O), R)
      : D(O);
  }
  function D(O) {
    return O === 61 ? (e.consume(O), T) : Ve(O) ? (e.consume(O), D) : k(O);
  }
  function T(O) {
    return O === null || O === 60 || O === 61 || O === 62 || O === 96
      ? n(O)
      : O === 34 || O === 39
      ? (e.consume(O), (f = O), F)
      : Ve(O)
      ? (e.consume(O), T)
      : z(O);
  }
  function F(O) {
    return O === f
      ? (e.consume(O), (f = null), q)
      : O === null || xe(O)
      ? n(O)
      : (e.consume(O), F);
  }
  function z(O) {
    return O === null ||
      O === 34 ||
      O === 39 ||
      O === 47 ||
      O === 60 ||
      O === 61 ||
      O === 62 ||
      O === 96 ||
      En(O)
      ? D(O)
      : (e.consume(O), z);
  }
  function q(O) {
    return O === 47 || O === 62 || Ve(O) ? k(O) : n(O);
  }
  function G(O) {
    return O === 62 ? (e.consume(O), $) : n(O);
  }
  function $(O) {
    return O === null || xe(O) ? Q(O) : Ve(O) ? (e.consume(O), $) : n(O);
  }
  function Q(O) {
    return O === 45 && i === 2
      ? (e.consume(O), ue)
      : O === 60 && i === 1
      ? (e.consume(O), ne)
      : O === 62 && i === 4
      ? (e.consume(O), re)
      : O === 63 && i === 3
      ? (e.consume(O), _)
      : O === 93 && i === 5
      ? (e.consume(O), Z)
      : xe(O) && (i === 6 || i === 7)
      ? (e.exit("htmlFlowData"), e.check(T$, ae, B)(O))
      : O === null || xe(O)
      ? (e.exit("htmlFlowData"), B(O))
      : (e.consume(O), Q);
  }
  function B(O) {
    return e.check(P$, U, ae)(O);
  }
  function U(O) {
    return e.enter("lineEnding"), e.consume(O), e.exit("lineEnding"), J;
  }
  function J(O) {
    return O === null || xe(O) ? B(O) : (e.enter("htmlFlowData"), Q(O));
  }
  function ue(O) {
    return O === 45 ? (e.consume(O), _) : Q(O);
  }
  function ne(O) {
    return O === 47 ? (e.consume(O), (s = ""), H) : Q(O);
  }
  function H(O) {
    if (O === 62) {
      const de = s.toLowerCase();
      return sS.includes(de) ? (e.consume(O), re) : Q(O);
    }
    return $r(O) && s.length < 8
      ? (e.consume(O), (s += String.fromCharCode(O)), H)
      : Q(O);
  }
  function Z(O) {
    return O === 93 ? (e.consume(O), _) : Q(O);
  }
  function _(O) {
    return O === 62
      ? (e.consume(O), re)
      : O === 45 && i === 2
      ? (e.consume(O), _)
      : Q(O);
  }
  function re(O) {
    return O === null || xe(O)
      ? (e.exit("htmlFlowData"), ae(O))
      : (e.consume(O), re);
  }
  function ae(O) {
    return e.exit("htmlFlow"), t(O);
  }
}
function D$(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return xe(s)
      ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), l)
      : n(s);
  }
  function l(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function N$(e, t, n) {
  return r;
  function r(i) {
    return (
      e.enter("lineEnding"),
      e.consume(i),
      e.exit("lineEnding"),
      e.attempt(id, t, n)
    );
  }
}
const M$ = { name: "htmlText", tokenize: L$ };
function L$(e, t, n) {
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
      ? (e.consume(_), D)
      : _ === 63
      ? (e.consume(_), k)
      : $r(_)
      ? (e.consume(_), z)
      : n(_);
  }
  function d(_) {
    return _ === 45
      ? (e.consume(_), p)
      : _ === 91
      ? (e.consume(_), (l = 0), E)
      : $r(_)
      ? (e.consume(_), w)
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
      : xe(_)
      ? ((s = g), ne(_))
      : (e.consume(_), g);
  }
  function v(_) {
    return _ === 45 ? (e.consume(_), m) : g(_);
  }
  function m(_) {
    return _ === 62 ? ue(_) : _ === 45 ? v(_) : g(_);
  }
  function E(_) {
    const re = "CDATA[";
    return _ === re.charCodeAt(l++)
      ? (e.consume(_), l === re.length ? S : E)
      : n(_);
  }
  function S(_) {
    return _ === null
      ? n(_)
      : _ === 93
      ? (e.consume(_), A)
      : xe(_)
      ? ((s = S), ne(_))
      : (e.consume(_), S);
  }
  function A(_) {
    return _ === 93 ? (e.consume(_), y) : S(_);
  }
  function y(_) {
    return _ === 62 ? ue(_) : _ === 93 ? (e.consume(_), y) : S(_);
  }
  function w(_) {
    return _ === null || _ === 62
      ? ue(_)
      : xe(_)
      ? ((s = w), ne(_))
      : (e.consume(_), w);
  }
  function k(_) {
    return _ === null
      ? n(_)
      : _ === 63
      ? (e.consume(_), R)
      : xe(_)
      ? ((s = k), ne(_))
      : (e.consume(_), k);
  }
  function R(_) {
    return _ === 62 ? ue(_) : k(_);
  }
  function D(_) {
    return $r(_) ? (e.consume(_), T) : n(_);
  }
  function T(_) {
    return _ === 45 || Fn(_) ? (e.consume(_), T) : F(_);
  }
  function F(_) {
    return xe(_) ? ((s = F), ne(_)) : Ve(_) ? (e.consume(_), F) : ue(_);
  }
  function z(_) {
    return _ === 45 || Fn(_)
      ? (e.consume(_), z)
      : _ === 47 || _ === 62 || En(_)
      ? q(_)
      : n(_);
  }
  function q(_) {
    return _ === 47
      ? (e.consume(_), ue)
      : _ === 58 || _ === 95 || $r(_)
      ? (e.consume(_), G)
      : xe(_)
      ? ((s = q), ne(_))
      : Ve(_)
      ? (e.consume(_), q)
      : ue(_);
  }
  function G(_) {
    return _ === 45 || _ === 46 || _ === 58 || _ === 95 || Fn(_)
      ? (e.consume(_), G)
      : $(_);
  }
  function $(_) {
    return _ === 61
      ? (e.consume(_), Q)
      : xe(_)
      ? ((s = $), ne(_))
      : Ve(_)
      ? (e.consume(_), $)
      : q(_);
  }
  function Q(_) {
    return _ === null || _ === 60 || _ === 61 || _ === 62 || _ === 96
      ? n(_)
      : _ === 34 || _ === 39
      ? (e.consume(_), (i = _), B)
      : xe(_)
      ? ((s = Q), ne(_))
      : Ve(_)
      ? (e.consume(_), Q)
      : (e.consume(_), U);
  }
  function B(_) {
    return _ === i
      ? (e.consume(_), (i = void 0), J)
      : _ === null
      ? n(_)
      : xe(_)
      ? ((s = B), ne(_))
      : (e.consume(_), B);
  }
  function U(_) {
    return _ === null ||
      _ === 34 ||
      _ === 39 ||
      _ === 60 ||
      _ === 61 ||
      _ === 96
      ? n(_)
      : _ === 47 || _ === 62 || En(_)
      ? q(_)
      : (e.consume(_), U);
  }
  function J(_) {
    return _ === 47 || _ === 62 || En(_) ? q(_) : n(_);
  }
  function ue(_) {
    return _ === 62
      ? (e.consume(_), e.exit("htmlTextData"), e.exit("htmlText"), t)
      : n(_);
  }
  function ne(_) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(_),
      e.exit("lineEnding"),
      H
    );
  }
  function H(_) {
    return Ve(_)
      ? it(
          e,
          Z,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(_)
      : Z(_);
  }
  function Z(_) {
    return e.enter("htmlTextData"), s(_);
  }
}
const Uv = { name: "labelEnd", tokenize: H$, resolveTo: U$, resolveAll: B$ },
  F$ = { tokenize: j$ },
  z$ = { tokenize: W$ },
  $$ = { tokenize: V$ };
function B$(e) {
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
function U$(e, t) {
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
    (a = or(a, e.slice(l + 1, l + r + 3))),
    (a = or(a, [["enter", p, t]])),
    (a = or(
      a,
      $v(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, s - 3), t)
    )),
    (a = or(a, [["exit", p, t], e[s - 2], e[s - 1], ["exit", d, t]])),
    (a = or(a, e.slice(s + 1))),
    (a = or(a, [["exit", f, t]])),
    qr(e, l, e.length, a),
    e
  );
}
function H$(e, t, n) {
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
            zl(r.sliceSerialize({ start: l.end, end: r.now() }))
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
      ? e.attempt(F$, p, s ? p : g)(v)
      : v === 91
      ? e.attempt(z$, p, s ? d : g)(v)
      : s
      ? p(v)
      : g(v);
  }
  function d(v) {
    return e.attempt($$, p, g)(v);
  }
  function p(v) {
    return t(v);
  }
  function g(v) {
    return (l._balanced = !0), n(v);
  }
}
function j$(e, t, n) {
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
    return En(g) ? os(e, l)(g) : l(g);
  }
  function l(g) {
    return g === 41
      ? p(g)
      : Ub(
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
    return En(g) ? os(e, f)(g) : p(g);
  }
  function a(g) {
    return n(g);
  }
  function f(g) {
    return g === 34 || g === 39 || g === 40
      ? jb(
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
    return En(g) ? os(e, p)(g) : p(g);
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
function W$(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Hb.call(
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
      zl(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? t(a)
      : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function V$(e, t, n) {
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
const q$ = { name: "labelStartImage", tokenize: G$, resolveAll: Uv.resolveAll };
function G$(e, t, n) {
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
const K$ = { name: "labelStartLink", tokenize: Q$, resolveAll: Uv.resolveAll };
function Q$(e, t, n) {
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
const Ph = { name: "lineEnding", tokenize: Y$ };
function Y$(e, t) {
  return n;
  function n(r) {
    return (
      e.enter("lineEnding"),
      e.consume(r),
      e.exit("lineEnding"),
      it(e, t, "linePrefix")
    );
  }
}
const gc = { name: "thematicBreak", tokenize: X$ };
function X$(e, t, n) {
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
      : r >= 3 && (d === null || xe(d))
      ? (e.exit("thematicBreak"), t(d))
      : n(d);
  }
  function f(d) {
    return d === i
      ? (e.consume(d), r++, f)
      : (e.exit("thematicBreakSequence"),
        Ve(d) ? it(e, a, "whitespace")(d) : a(d));
  }
}
const pn = {
    name: "list",
    tokenize: e8,
    continuation: { tokenize: t8 },
    exit: r8,
  },
  Z$ = { tokenize: i8, partial: !0 },
  J$ = { tokenize: n8, partial: !0 };
function e8(e, t, n) {
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
        : Gg(m)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = E), e.enter(E, { _container: !0 })),
        E === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          m === 42 || m === 45 ? e.check(gc, n, d)(m) : d(m)
        );
      if (!r.interrupt || m === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), f(m);
    }
    return n(m);
  }
  function f(m) {
    return Gg(m) && ++s < 10
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
      e.check(id, r.interrupt ? n : p, e.attempt(Z$, v, g))
    );
  }
  function p(m) {
    return (r.containerState.initialBlankLine = !0), l++, v(m);
  }
  function g(m) {
    return Ve(m)
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
function t8(e, t, n) {
  const r = this;
  return (r.containerState._closeFlow = void 0), e.check(id, i, l);
  function i(a) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      it(e, t, "listItemIndent", r.containerState.size + 1)(a)
    );
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !Ve(a)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        s(a))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(J$, t, s)(a));
  }
  function s(a) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      it(
        e,
        e.attempt(pn, t, n),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(a)
    );
  }
}
function n8(e, t, n) {
  const r = this;
  return it(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const s = r.events[r.events.length - 1];
    return s &&
      s[1].type === "listItemIndent" &&
      s[2].sliceSerialize(s[1], !0).length === r.containerState.size
      ? t(l)
      : n(l);
  }
}
function r8(e) {
  e.exit(this.containerState.type);
}
function i8(e, t, n) {
  const r = this;
  return it(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(l) {
    const s = r.events[r.events.length - 1];
    return !Ve(l) && s && s[1].type === "listItemPrefixWhitespace"
      ? t(l)
      : n(l);
  }
}
const aS = { name: "setextUnderline", tokenize: l8, resolveTo: o8 };
function o8(e, t) {
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
function l8(e, t, n) {
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
        Ve(d) ? it(e, f, "lineSuffix")(d) : f(d));
  }
  function f(d) {
    return d === null || xe(d) ? (e.exit("setextHeadingLine"), t(d)) : n(d);
  }
}
const u8 = { tokenize: s8 };
function s8(e) {
  const t = this,
    n = e.attempt(
      id,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        it(
          e,
          e.attempt(this.parser.constructs.flow, i, e.attempt(p$, i)),
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
const a8 = { resolveAll: Vb() },
  c8 = Wb("string"),
  f8 = Wb("text");
function Wb(e) {
  return { tokenize: t, resolveAll: Vb(e === "text" ? d8 : void 0) };
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
function Vb(e) {
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
function d8(e, t) {
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
function p8(e, t, n) {
  let r = Object.assign(
    n ? Object.assign({}, n) : { line: 1, column: 1, offset: 0 },
    { _index: 0, _bufferIndex: -1 }
  );
  const i = {},
    l = [];
  let s = [],
    a = [];
  const f = {
      consume: w,
      enter: k,
      exit: R,
      attempt: F(D),
      check: F(T),
      interrupt: F(T, { interrupt: !0 }),
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
  function g($) {
    return (
      (s = or(s, $)),
      A(),
      s[s.length - 1] !== null
        ? []
        : (z(t, 0), (d.events = $v(l, d.events, d)), d.events)
    );
  }
  function v($, Q) {
    return g8(m($), Q);
  }
  function m($) {
    return h8(s, $);
  }
  function E() {
    const { line: $, column: Q, offset: B, _index: U, _bufferIndex: J } = r;
    return { line: $, column: Q, offset: B, _index: U, _bufferIndex: J };
  }
  function S($) {
    (i[$.line] = $.column), G();
  }
  function A() {
    let $;
    for (; r._index < s.length; ) {
      const Q = s[r._index];
      if (typeof Q == "string")
        for (
          $ = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === $ && r._bufferIndex < Q.length;

        )
          y(Q.charCodeAt(r._bufferIndex));
      else y(Q);
    }
  }
  function y($) {
    p = p($);
  }
  function w($) {
    xe($)
      ? (r.line++, (r.column = 1), (r.offset += $ === -3 ? 2 : 1), G())
      : $ !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === s[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (d.previous = $);
  }
  function k($, Q) {
    const B = Q || {};
    return (
      (B.type = $),
      (B.start = E()),
      d.events.push(["enter", B, d]),
      a.push(B),
      B
    );
  }
  function R($) {
    const Q = a.pop();
    return (Q.end = E()), d.events.push(["exit", Q, d]), Q;
  }
  function D($, Q) {
    z($, Q.from);
  }
  function T($, Q) {
    Q.restore();
  }
  function F($, Q) {
    return B;
    function B(U, J, ue) {
      let ne, H, Z, _;
      return Array.isArray(U) ? ae(U) : "tokenize" in U ? ae([U]) : re(U);
      function re(me) {
        return De;
        function De(Se) {
          const Fe = Se !== null && me[Se],
            Ie = Se !== null && me.null,
            Ue = [
              ...(Array.isArray(Fe) ? Fe : Fe ? [Fe] : []),
              ...(Array.isArray(Ie) ? Ie : Ie ? [Ie] : []),
            ];
          return ae(Ue)(Se);
        }
      }
      function ae(me) {
        return (ne = me), (H = 0), me.length === 0 ? ue : O(me[H]);
      }
      function O(me) {
        return De;
        function De(Se) {
          return (
            (_ = q()),
            (Z = me),
            me.partial || (d.currentConstruct = me),
            me.name && d.parser.constructs.disable.null.includes(me.name)
              ? Pe()
              : me.tokenize.call(
                  Q ? Object.assign(Object.create(d), Q) : d,
                  f,
                  de,
                  Pe
                )(Se)
          );
        }
      }
      function de(me) {
        return $(Z, _), J;
      }
      function Pe(me) {
        return _.restore(), ++H < ne.length ? O(ne[H]) : ue;
      }
    }
  }
  function z($, Q) {
    $.resolveAll && !l.includes($) && l.push($),
      $.resolve &&
        qr(d.events, Q, d.events.length - Q, $.resolve(d.events.slice(Q), d)),
      $.resolveTo && (d.events = $.resolveTo(d.events, d));
  }
  function q() {
    const $ = E(),
      Q = d.previous,
      B = d.currentConstruct,
      U = d.events.length,
      J = Array.from(a);
    return { restore: ue, from: U };
    function ue() {
      (r = $),
        (d.previous = Q),
        (d.currentConstruct = B),
        (d.events.length = U),
        (a = J),
        G();
    }
  }
  function G() {
    r.line in i &&
      r.column < 2 &&
      ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function h8(e, t) {
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
function g8(e, t) {
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
const m8 = {
    42: pn,
    43: pn,
    45: pn,
    48: pn,
    49: pn,
    50: pn,
    51: pn,
    52: pn,
    53: pn,
    54: pn,
    55: pn,
    56: pn,
    57: pn,
    62: Fb,
  },
  v8 = { 91: y$ },
  y8 = { [-2]: Th, [-1]: Th, 32: Th },
  w8 = {
    35: k$,
    42: gc,
    45: [aS, gc],
    60: I$,
    61: aS,
    95: gc,
    96: uS,
    126: uS,
  },
  x8 = { 38: $b, 92: zb },
  S8 = {
    [-5]: Ph,
    [-4]: Ph,
    [-3]: Ph,
    33: q$,
    38: $b,
    42: Kg,
    60: [Qz, M$],
    91: K$,
    92: [E$, zb],
    93: Uv,
    95: Kg,
    96: s$,
  },
  E8 = { null: [Kg, a8] },
  C8 = { null: [42, 95] },
  k8 = { null: [] },
  b8 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: C8,
        contentInitial: v8,
        disable: k8,
        document: m8,
        flow: w8,
        flowInitial: y8,
        insideSpan: E8,
        string: x8,
        text: S8,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function _8(e) {
  const n = Dz([b8, ...((e || {}).extensions || [])]),
    r = {
      defined: [],
      lazy: {},
      constructs: n,
      content: i(Hz),
      document: i(Wz),
      flow: i(u8),
      string: i(c8),
      text: i(f8),
    };
  return r;
  function i(l) {
    return s;
    function s(a) {
      return p8(r, l, a);
    }
  }
}
const cS = /[\0\t\n\r]/g;
function O8() {
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
        ((cS.lastIndex = g),
        (d = cS.exec(l)),
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
function I8(e) {
  for (; !Bb(e); );
  return e;
}
function qb(e, t) {
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
const T8 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function P8(e) {
  return e.replace(T8, R8);
}
function R8(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1),
      l = i === 120 || i === 88;
    return qb(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return Bv(n) || e;
}
const Gb = {}.hasOwnProperty,
  A8 = function (e, t, n) {
    return (
      typeof t != "string" && ((n = t), (t = void 0)),
      D8(n)(I8(_8(n).document().write(O8()(e, t, !0))))
    );
  };
function D8(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(bn),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: a(he),
      blockQuote: a(Ue),
      characterEscape: $,
      characterReference: $,
      codeFenced: a(ze),
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: f,
      codeIndented: a(ze, f),
      codeText: a(Ge, f),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: a(yt),
      definitionDestinationString: f,
      definitionLabelString: f,
      definitionTitleString: f,
      emphasis: a(Vn),
      hardBreakEscape: a(at),
      hardBreakTrailing: a(at),
      htmlFlow: a(Lt, f),
      htmlFlowData: $,
      htmlText: a(Lt, f),
      htmlTextData: $,
      image: a(kn),
      label: f,
      link: a(bn),
      listItem: a(Tr),
      listItemValue: E,
      listOrdered: a(jt, m),
      listUnordered: a(jt),
      paragraph: a(Gr),
      reference: Pe,
      referenceString: f,
      resourceDestinationString: f,
      resourceTitleString: f,
      setextHeading: a(he),
      strong: a(Qo),
      thematicBreak: a(qn),
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: F,
      autolink: p(),
      autolinkEmail: Ie,
      autolinkProtocol: Fe,
      blockQuote: p(),
      characterEscapeValue: Q,
      characterReferenceMarkerHexadecimal: De,
      characterReferenceMarkerNumeric: De,
      characterReferenceValue: Se,
      codeFenced: p(w),
      codeFencedFence: y,
      codeFencedFenceInfo: S,
      codeFencedFenceMeta: A,
      codeFlowValue: Q,
      codeIndented: p(k),
      codeText: p(ne),
      codeTextData: Q,
      data: Q,
      definition: p(),
      definitionDestinationString: T,
      definitionLabelString: R,
      definitionTitleString: D,
      emphasis: p(),
      hardBreakEscape: p(U),
      hardBreakTrailing: p(U),
      htmlFlow: p(J),
      htmlFlowData: Q,
      htmlText: p(ue),
      htmlTextData: Q,
      image: p(Z),
      label: re,
      labelText: _,
      lineEnding: B,
      link: p(H),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: me,
      resourceDestinationString: ae,
      resourceTitleString: O,
      resource: de,
      setextHeading: p(G),
      setextHeadingLineSequence: q,
      setextHeadingText: z,
      strong: p(),
      thematicBreak: p(),
    },
  };
  Kb(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(V) {
    let ie = { type: "root", children: [] };
    const pe = {
        stack: [ie],
        tokenStack: [],
        config: t,
        enter: d,
        exit: g,
        buffer: f,
        resume: v,
        setData: l,
        getData: s,
      },
      He = [];
    let je = -1;
    for (; ++je < V.length; )
      if (V[je][1].type === "listOrdered" || V[je][1].type === "listUnordered")
        if (V[je][0] === "enter") He.push(je);
        else {
          const Jt = He.pop();
          je = i(V, Jt, je);
        }
    for (je = -1; ++je < V.length; ) {
      const Jt = t[V[je][0]];
      Gb.call(Jt, V[je][1].type) &&
        Jt[V[je][1].type].call(
          Object.assign({ sliceSerialize: V[je][2].sliceSerialize }, pe),
          V[je][1]
        );
    }
    if (pe.tokenStack.length > 0) {
      const Jt = pe.tokenStack[pe.tokenStack.length - 1];
      (Jt[1] || fS).call(pe, void 0, Jt[0]);
    }
    for (
      ie.position = {
        start: Ai(
          V.length > 0 ? V[0][1].start : { line: 1, column: 1, offset: 0 }
        ),
        end: Ai(
          V.length > 0
            ? V[V.length - 2][1].end
            : { line: 1, column: 1, offset: 0 }
        ),
      },
        je = -1;
      ++je < t.transforms.length;

    )
      ie = t.transforms[je](ie) || ie;
    return ie;
  }
  function i(V, ie, pe) {
    let He = ie - 1,
      je = -1,
      Jt = !1,
      Gn,
      _n,
      Kr,
      Qr;
    for (; ++He <= pe; ) {
      const ot = V[He];
      if (
        (ot[1].type === "listUnordered" ||
        ot[1].type === "listOrdered" ||
        ot[1].type === "blockQuote"
          ? (ot[0] === "enter" ? je++ : je--, (Qr = void 0))
          : ot[1].type === "lineEndingBlank"
          ? ot[0] === "enter" &&
            (Gn && !Qr && !je && !Kr && (Kr = He), (Qr = void 0))
          : ot[1].type === "linePrefix" ||
            ot[1].type === "listItemValue" ||
            ot[1].type === "listItemMarker" ||
            ot[1].type === "listItemPrefix" ||
            ot[1].type === "listItemPrefixWhitespace" ||
            (Qr = void 0),
        (!je && ot[0] === "enter" && ot[1].type === "listItemPrefix") ||
          (je === -1 &&
            ot[0] === "exit" &&
            (ot[1].type === "listUnordered" || ot[1].type === "listOrdered")))
      ) {
        if (Gn) {
          let cu = He;
          for (_n = void 0; cu--; ) {
            const hr = V[cu];
            if (
              hr[1].type === "lineEnding" ||
              hr[1].type === "lineEndingBlank"
            ) {
              if (hr[0] === "exit") continue;
              _n && ((V[_n][1].type = "lineEndingBlank"), (Jt = !0)),
                (hr[1].type = "lineEnding"),
                (_n = cu);
            } else if (
              !(
                hr[1].type === "linePrefix" ||
                hr[1].type === "blockQuotePrefix" ||
                hr[1].type === "blockQuotePrefixWhitespace" ||
                hr[1].type === "blockQuoteMarker" ||
                hr[1].type === "listItemIndent"
              )
            )
              break;
          }
          Kr && (!_n || Kr < _n) && (Gn._spread = !0),
            (Gn.end = Object.assign({}, _n ? V[_n][1].start : ot[1].end)),
            V.splice(_n || He, 0, ["exit", Gn, ot[2]]),
            He++,
            pe++;
        }
        ot[1].type === "listItemPrefix" &&
          ((Gn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ot[1].start),
            end: void 0,
          }),
          V.splice(He, 0, ["enter", Gn, ot[2]]),
          He++,
          pe++,
          (Kr = void 0),
          (Qr = !0));
      }
    }
    return (V[ie][1]._spread = Jt), pe;
  }
  function l(V, ie) {
    n[V] = ie;
  }
  function s(V) {
    return n[V];
  }
  function a(V, ie) {
    return pe;
    function pe(He) {
      d.call(this, V(He), He), ie && ie.call(this, He);
    }
  }
  function f() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function d(V, ie, pe) {
    return (
      this.stack[this.stack.length - 1].children.push(V),
      this.stack.push(V),
      this.tokenStack.push([ie, pe]),
      (V.position = { start: Ai(ie.start) }),
      V
    );
  }
  function p(V) {
    return ie;
    function ie(pe) {
      V && V.call(this, pe), g.call(this, pe);
    }
  }
  function g(V, ie) {
    const pe = this.stack.pop(),
      He = this.tokenStack.pop();
    if (He)
      He[0].type !== V.type &&
        (ie ? ie.call(this, V, He[0]) : (He[1] || fS).call(this, V, He[0]));
    else
      throw new Error(
        "Cannot close `" +
          V.type +
          "` (" +
          is({ start: V.start, end: V.end }) +
          "): it’s not open"
      );
    return (pe.position.end = Ai(V.end)), pe;
  }
  function v() {
    return Rz(this.stack.pop());
  }
  function m() {
    l("expectingFirstListItemValue", !0);
  }
  function E(V) {
    if (s("expectingFirstListItemValue")) {
      const ie = this.stack[this.stack.length - 2];
      (ie.start = Number.parseInt(this.sliceSerialize(V), 10)),
        l("expectingFirstListItemValue");
    }
  }
  function S() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.lang = V;
  }
  function A() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.meta = V;
  }
  function y() {
    s("flowCodeInside") || (this.buffer(), l("flowCodeInside", !0));
  }
  function w() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    (ie.value = V.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")), l("flowCodeInside");
  }
  function k() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.value = V.replace(/(\r?\n|\r)$/g, "");
  }
  function R(V) {
    const ie = this.resume(),
      pe = this.stack[this.stack.length - 1];
    (pe.label = ie), (pe.identifier = zl(this.sliceSerialize(V)).toLowerCase());
  }
  function D() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.title = V;
  }
  function T() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.url = V;
  }
  function F(V) {
    const ie = this.stack[this.stack.length - 1];
    if (!ie.depth) {
      const pe = this.sliceSerialize(V).length;
      ie.depth = pe;
    }
  }
  function z() {
    l("setextHeadingSlurpLineEnding", !0);
  }
  function q(V) {
    const ie = this.stack[this.stack.length - 1];
    ie.depth = this.sliceSerialize(V).charCodeAt(0) === 61 ? 1 : 2;
  }
  function G() {
    l("setextHeadingSlurpLineEnding");
  }
  function $(V) {
    const ie = this.stack[this.stack.length - 1];
    let pe = ie.children[ie.children.length - 1];
    (!pe || pe.type !== "text") &&
      ((pe = Pr()),
      (pe.position = { start: Ai(V.start) }),
      ie.children.push(pe)),
      this.stack.push(pe);
  }
  function Q(V) {
    const ie = this.stack.pop();
    (ie.value += this.sliceSerialize(V)), (ie.position.end = Ai(V.end));
  }
  function B(V) {
    const ie = this.stack[this.stack.length - 1];
    if (s("atHardBreak")) {
      const pe = ie.children[ie.children.length - 1];
      (pe.position.end = Ai(V.end)), l("atHardBreak");
      return;
    }
    !s("setextHeadingSlurpLineEnding") &&
      t.canContainEols.includes(ie.type) &&
      ($.call(this, V), Q.call(this, V));
  }
  function U() {
    l("atHardBreak", !0);
  }
  function J() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.value = V;
  }
  function ue() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.value = V;
  }
  function ne() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.value = V;
  }
  function H() {
    const V = this.stack[this.stack.length - 1];
    if (s("inReference")) {
      const ie = s("referenceType") || "shortcut";
      (V.type += "Reference"),
        (V.referenceType = ie),
        delete V.url,
        delete V.title;
    } else delete V.identifier, delete V.label;
    l("referenceType");
  }
  function Z() {
    const V = this.stack[this.stack.length - 1];
    if (s("inReference")) {
      const ie = s("referenceType") || "shortcut";
      (V.type += "Reference"),
        (V.referenceType = ie),
        delete V.url,
        delete V.title;
    } else delete V.identifier, delete V.label;
    l("referenceType");
  }
  function _(V) {
    const ie = this.sliceSerialize(V),
      pe = this.stack[this.stack.length - 2];
    (pe.label = P8(ie)), (pe.identifier = zl(ie).toLowerCase());
  }
  function re() {
    const V = this.stack[this.stack.length - 1],
      ie = this.resume(),
      pe = this.stack[this.stack.length - 1];
    if ((l("inReference", !0), pe.type === "link")) {
      const He = V.children;
      pe.children = He;
    } else pe.alt = ie;
  }
  function ae() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.url = V;
  }
  function O() {
    const V = this.resume(),
      ie = this.stack[this.stack.length - 1];
    ie.title = V;
  }
  function de() {
    l("inReference");
  }
  function Pe() {
    l("referenceType", "collapsed");
  }
  function me(V) {
    const ie = this.resume(),
      pe = this.stack[this.stack.length - 1];
    (pe.label = ie),
      (pe.identifier = zl(this.sliceSerialize(V)).toLowerCase()),
      l("referenceType", "full");
  }
  function De(V) {
    l("characterReferenceType", V.type);
  }
  function Se(V) {
    const ie = this.sliceSerialize(V),
      pe = s("characterReferenceType");
    let He;
    pe
      ? ((He = qb(ie, pe === "characterReferenceMarkerNumeric" ? 10 : 16)),
        l("characterReferenceType"))
      : (He = Bv(ie));
    const je = this.stack.pop();
    (je.value += He), (je.position.end = Ai(V.end));
  }
  function Fe(V) {
    Q.call(this, V);
    const ie = this.stack[this.stack.length - 1];
    ie.url = this.sliceSerialize(V);
  }
  function Ie(V) {
    Q.call(this, V);
    const ie = this.stack[this.stack.length - 1];
    ie.url = "mailto:" + this.sliceSerialize(V);
  }
  function Ue() {
    return { type: "blockquote", children: [] };
  }
  function ze() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function Ge() {
    return { type: "inlineCode", value: "" };
  }
  function yt() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function Vn() {
    return { type: "emphasis", children: [] };
  }
  function he() {
    return { type: "heading", depth: void 0, children: [] };
  }
  function at() {
    return { type: "break" };
  }
  function Lt() {
    return { type: "html", value: "" };
  }
  function kn() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function bn() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function jt(V) {
    return {
      type: "list",
      ordered: V.type === "listOrdered",
      start: null,
      spread: V._spread,
      children: [],
    };
  }
  function Tr(V) {
    return { type: "listItem", spread: V._spread, checked: null, children: [] };
  }
  function Gr() {
    return { type: "paragraph", children: [] };
  }
  function Qo() {
    return { type: "strong", children: [] };
  }
  function Pr() {
    return { type: "text", value: "" };
  }
  function qn() {
    return { type: "thematicBreak" };
  }
}
function Ai(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function Kb(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Kb(e, r) : N8(e, r);
  }
}
function N8(e, t) {
  let n;
  for (n in t)
    if (Gb.call(t, n)) {
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
function fS(e, t) {
  throw e
    ? new Error(
        "Cannot close `" +
          e.type +
          "` (" +
          is({ start: e.start, end: e.end }) +
          "): a different token (`" +
          t.type +
          "`, " +
          is({ start: t.start, end: t.end }) +
          ") is open"
      )
    : new Error(
        "Cannot close document, a token (`" +
          t.type +
          "`, " +
          is({ start: t.start, end: t.end }) +
          ") is still open"
      );
}
function M8(e) {
  Object.assign(this, {
    Parser: (n) => {
      const r = this.data("settings");
      return A8(
        n,
        Object.assign({}, r, e, {
          extensions: this.data("micromarkExtensions") || [],
          mdastExtensions: this.data("fromMarkdownExtensions") || [],
        })
      );
    },
  });
}
function L8(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function F8(e, t) {
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
function z8(e, t) {
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
function $8(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function B8(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function su(e) {
  const t = [];
  let n = -1,
    r = 0,
    i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let s = "";
    if (l === 37 && Fn(e.charCodeAt(n + 1)) && Fn(e.charCodeAt(n + 2))) i = 2;
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
function Qb(e, t) {
  const n = String(t.identifier).toUpperCase(),
    r = su(n.toLowerCase()),
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
function U8(e, t) {
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
    Qb(e, { type: "footnoteReference", identifier: i, position: t.position })
  );
}
function H8(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function j8(e, t) {
  if (e.dangerous) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
  return null;
}
function Yb(e, t) {
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
function W8(e, t) {
  const n = e.definition(t.identifier);
  if (!n) return Yb(e, t);
  const r = { src: su(n.url || ""), alt: t.alt };
  n.title !== null && n.title !== void 0 && (r.title = n.title);
  const i = { type: "element", tagName: "img", properties: r, children: [] };
  return e.patch(t, i), e.applyData(t, i);
}
function V8(e, t) {
  const n = { src: su(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt),
    t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function q8(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return e.patch(t, r), e.applyData(t, r);
}
function G8(e, t) {
  const n = e.definition(t.identifier);
  if (!n) return Yb(e, t);
  const r = { href: su(n.url || "") };
  n.title !== null && n.title !== void 0 && (r.title = n.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: r,
    children: e.all(t),
  };
  return e.patch(t, i), e.applyData(t, i);
}
function K8(e, t) {
  const n = { href: su(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t),
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Q8(e, t, n) {
  const r = e.all(t),
    i = n ? Y8(n) : Xb(t),
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
function Y8(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; ) t = Xb(n[r]);
  }
  return t;
}
function Xb(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function X8(e, t) {
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
function Z8(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function J8(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function eB(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Hv = Zb("start"),
  jv = Zb("end");
function tB(e) {
  return { start: Hv(e), end: jv(e) };
}
function Zb(e) {
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
function nB(e, t) {
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
      a = Hv(t.children[1]),
      f = jv(t.children[t.children.length - 1]);
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
function rB(e, t, n) {
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
function iB(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
const dS = 9,
  pS = 32;
function oB(e) {
  const t = String(e),
    n = /\r?\n|\r/g;
  let r = n.exec(t),
    i = 0;
  const l = [];
  for (; r; )
    l.push(hS(t.slice(i, r.index), i > 0, !0), r[0]),
      (i = r.index + r[0].length),
      (r = n.exec(t));
  return l.push(hS(t.slice(i), i > 0, !1)), l.join("");
}
function hS(e, t, n) {
  let r = 0,
    i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === dS || l === pS; ) r++, (l = e.codePointAt(r));
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === dS || l === pS; ) i--, (l = e.codePointAt(i - 1));
  }
  return i > r ? e.slice(r, i) : "";
}
function lB(e, t) {
  const n = { type: "text", value: oB(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function uB(e, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e.patch(t, n), e.applyData(t, n);
}
const sB = {
  blockquote: L8,
  break: F8,
  code: z8,
  delete: $8,
  emphasis: B8,
  footnoteReference: Qb,
  footnote: U8,
  heading: H8,
  html: j8,
  imageReference: W8,
  image: V8,
  inlineCode: q8,
  linkReference: G8,
  link: K8,
  listItem: Q8,
  list: X8,
  paragraph: Z8,
  root: J8,
  strong: eB,
  table: nB,
  tableCell: iB,
  tableRow: rB,
  text: lB,
  thematicBreak: uB,
  toml: Xa,
  yaml: Xa,
  definition: Xa,
  footnoteDefinition: Xa,
};
function Xa() {
  return null;
}
const Jb = function (e) {
  if (e == null) return dB;
  if (typeof e == "string") return fB(e);
  if (typeof e == "object") return Array.isArray(e) ? aB(e) : cB(e);
  if (typeof e == "function") return od(e);
  throw new Error("Expected function, string, or object as test");
};
function aB(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; ) t[n] = Jb(e[n]);
  return od(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; ) if (t[l].call(this, ...i)) return !0;
    return !1;
  }
}
function cB(e) {
  return od(t);
  function t(n) {
    let r;
    for (r in e) if (n[r] !== e[r]) return !1;
    return !0;
  }
}
function fB(e) {
  return od(t);
  function t(n) {
    return n && n.type === e;
  }
}
function od(e) {
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
function dB() {
  return !0;
}
const pB = !0,
  gS = !1,
  hB = "skip",
  gB = function (e, t, n, r) {
    typeof t == "function" &&
      typeof n != "function" &&
      ((r = n), (n = t), (t = null));
    const i = Jb(t),
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
          ((v = mB(n(a, d))), v[0] === gS)
        )
          return v;
        if (a.children && v[0] !== hB)
          for (
            E = (r ? a.children.length : -1) + l, S = d.concat(a);
            E > -1 && E < a.children.length;

          ) {
            if (((m = s(a.children[E], E, S)()), m[0] === gS)) return m;
            E = typeof m[1] == "number" ? m[1] : E + l;
          }
        return v;
      }
    }
  };
function mB(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [pB, e] : [e];
}
const Wv = function (e, t, n, r) {
  typeof t == "function" &&
    typeof n != "function" &&
    ((r = n), (n = t), (t = null)),
    gB(e, t, i, r);
  function i(l, s) {
    const a = s[s.length - 1];
    return n(l, a ? a.children.indexOf(l) : null, a);
  }
};
function vB(e) {
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
const mS = {}.hasOwnProperty;
function yB(e) {
  const t = Object.create(null);
  if (!e || !e.type) throw new Error("mdast-util-definitions expected node");
  return (
    Wv(e, "definition", (r) => {
      const i = vS(r.identifier);
      i && !mS.call(t, i) && (t[i] = r);
    }),
    n
  );
  function n(r) {
    const i = vS(r);
    return i && mS.call(t, i) ? t[i] : null;
  }
}
function vS(e) {
  return String(e || "").toUpperCase();
}
const uf = {}.hasOwnProperty;
function wB(e, t) {
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
    (s.handlers = { ...sB, ...n.handlers }),
    (s.definition = yB(e)),
    (s.footnoteById = i),
    (s.footnoteOrder = []),
    (s.footnoteCounts = {}),
    (s.patch = xB),
    (s.applyData = SB),
    (s.one = a),
    (s.all = f),
    (s.wrap = CB),
    (s.augment = l),
    Wv(e, "footnoteDefinition", (d) => {
      const p = String(d.identifier).toUpperCase();
      uf.call(i, p) || (i[p] = d);
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
      vB(g) || (p.position = { start: Hv(g), end: jv(g) });
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
    return e_(s, d, p);
  }
  function f(d) {
    return Vv(s, d);
  }
}
function xB(e, t) {
  e.position && (t.position = tB(e));
}
function SB(e, t) {
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
function e_(e, t, n) {
  const r = t && t.type;
  if (!r) throw new Error("Expected node, got `" + t + "`");
  return uf.call(e.handlers, r)
    ? e.handlers[r](e, t, n)
    : e.passThrough && e.passThrough.includes(r)
    ? "children" in t
      ? { ...t, children: Vv(e, t) }
      : t
    : e.unknownHandler
    ? e.unknownHandler(e, t, n)
    : EB(e, t);
}
function Vv(e, t) {
  const n = [];
  if ("children" in t) {
    const r = t.children;
    let i = -1;
    for (; ++i < r.length; ) {
      const l = e_(e, r[i], t);
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
function EB(e, t) {
  const n = t.data || {},
    r =
      "value" in t && !(uf.call(n, "hProperties") || uf.call(n, "hChildren"))
        ? { type: "text", value: t.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: Vv(e, t),
          };
  return e.patch(t, r), e.applyData(t, r);
}
function CB(e, t) {
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
function kB(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.footnoteOrder.length; ) {
    const r = e.footnoteById[e.footnoteOrder[n]];
    if (!r) continue;
    const i = e.all(r),
      l = String(r.identifier).toUpperCase(),
      s = su(l.toLowerCase());
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
function t_(e, t) {
  const n = wB(e, t),
    r = n.one(e, null),
    i = kB(n);
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
const bB = function (e, t) {
    return e && "run" in e ? OB(e, t) : IB(e || t);
  },
  _B = bB;
function OB(e, t) {
  return (n, r, i) => {
    e.run(t_(n, t), r, (l) => {
      i(l);
    });
  };
}
function IB(e) {
  return (t) => t_(t, e);
}
class $s {
  constructor(t, n, r) {
    (this.property = t), (this.normal = n), r && (this.space = r);
  }
}
$s.prototype.property = {};
$s.prototype.normal = {};
$s.prototype.space = null;
function n_(e, t) {
  const n = {},
    r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
  return new $s(n, r, t);
}
function Qg(e) {
  return e.toLowerCase();
}
class dr {
  constructor(t, n) {
    (this.property = t), (this.attribute = n);
  }
}
dr.prototype.space = null;
dr.prototype.boolean = !1;
dr.prototype.booleanish = !1;
dr.prototype.overloadedBoolean = !1;
dr.prototype.number = !1;
dr.prototype.commaSeparated = !1;
dr.prototype.spaceSeparated = !1;
dr.prototype.commaOrSpaceSeparated = !1;
dr.prototype.mustUseProperty = !1;
dr.prototype.defined = !1;
let TB = 0;
const _e = Ko(),
  bt = Ko(),
  r_ = Ko(),
  oe = Ko(),
  nt = Ko(),
  $l = Ko(),
  Dn = Ko();
function Ko() {
  return 2 ** ++TB;
}
const Yg = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: _e,
        booleanish: bt,
        commaOrSpaceSeparated: Dn,
        commaSeparated: $l,
        number: oe,
        overloadedBoolean: r_,
        spaceSeparated: nt,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Rh = Object.keys(Yg);
class qv extends dr {
  constructor(t, n, r, i) {
    let l = -1;
    if ((super(t, n), yS(this, "space", i), typeof r == "number"))
      for (; ++l < Rh.length; ) {
        const s = Rh[l];
        yS(this, Rh[l], (r & Yg[s]) === Yg[s]);
      }
  }
}
qv.prototype.defined = !0;
function yS(e, t, n) {
  n && (e[t] = n);
}
const PB = {}.hasOwnProperty;
function au(e) {
  const t = {},
    n = {};
  let r;
  for (r in e.properties)
    if (PB.call(e.properties, r)) {
      const i = e.properties[r],
        l = new qv(r, e.transform(e.attributes || {}, r), i, e.space);
      e.mustUseProperty &&
        e.mustUseProperty.includes(r) &&
        (l.mustUseProperty = !0),
        (t[r] = l),
        (n[Qg(r)] = r),
        (n[Qg(l.attribute)] = r);
    }
  return new $s(t, n, e.space);
}
const i_ = au({
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
  o_ = au({
    space: "xml",
    transform(e, t) {
      return "xml:" + t.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
  });
function l_(e, t) {
  return t in e ? e[t] : t;
}
function u_(e, t) {
  return l_(e, t.toLowerCase());
}
const s_ = au({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: u_,
    properties: { xmlns: null, xmlnsXLink: null },
  }),
  a_ = au({
    transform(e, t) {
      return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
    },
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: bt,
      ariaAutoComplete: null,
      ariaBusy: bt,
      ariaChecked: bt,
      ariaColCount: oe,
      ariaColIndex: oe,
      ariaColSpan: oe,
      ariaControls: nt,
      ariaCurrent: null,
      ariaDescribedBy: nt,
      ariaDetails: null,
      ariaDisabled: bt,
      ariaDropEffect: nt,
      ariaErrorMessage: null,
      ariaExpanded: bt,
      ariaFlowTo: nt,
      ariaGrabbed: bt,
      ariaHasPopup: null,
      ariaHidden: bt,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: nt,
      ariaLevel: oe,
      ariaLive: null,
      ariaModal: bt,
      ariaMultiLine: bt,
      ariaMultiSelectable: bt,
      ariaOrientation: null,
      ariaOwns: nt,
      ariaPlaceholder: null,
      ariaPosInSet: oe,
      ariaPressed: bt,
      ariaReadOnly: bt,
      ariaRelevant: null,
      ariaRequired: bt,
      ariaRoleDescription: nt,
      ariaRowCount: oe,
      ariaRowIndex: oe,
      ariaRowSpan: oe,
      ariaSelected: bt,
      ariaSetSize: oe,
      ariaSort: null,
      ariaValueMax: oe,
      ariaValueMin: oe,
      ariaValueNow: oe,
      ariaValueText: null,
      role: null,
    },
  }),
  RB = au({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    transform: u_,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: $l,
      acceptCharset: nt,
      accessKey: nt,
      action: null,
      allow: null,
      allowFullScreen: _e,
      allowPaymentRequest: _e,
      allowUserMedia: _e,
      alt: null,
      as: null,
      async: _e,
      autoCapitalize: null,
      autoComplete: nt,
      autoFocus: _e,
      autoPlay: _e,
      blocking: nt,
      capture: null,
      charSet: null,
      checked: _e,
      cite: null,
      className: nt,
      cols: oe,
      colSpan: null,
      content: null,
      contentEditable: bt,
      controls: _e,
      controlsList: nt,
      coords: oe | $l,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: _e,
      defer: _e,
      dir: null,
      dirName: null,
      disabled: _e,
      download: r_,
      draggable: bt,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: _e,
      formTarget: null,
      headers: nt,
      height: oe,
      hidden: _e,
      high: oe,
      href: null,
      hrefLang: null,
      htmlFor: nt,
      httpEquiv: nt,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: _e,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: _e,
      itemId: null,
      itemProp: nt,
      itemRef: nt,
      itemScope: _e,
      itemType: nt,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: _e,
      low: oe,
      manifest: null,
      max: null,
      maxLength: oe,
      media: null,
      method: null,
      min: null,
      minLength: oe,
      multiple: _e,
      muted: _e,
      name: null,
      nonce: null,
      noModule: _e,
      noValidate: _e,
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
      open: _e,
      optimum: oe,
      pattern: null,
      ping: nt,
      placeholder: null,
      playsInline: _e,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: _e,
      referrerPolicy: null,
      rel: nt,
      required: _e,
      reversed: _e,
      rows: oe,
      rowSpan: oe,
      sandbox: nt,
      scope: null,
      scoped: _e,
      seamless: _e,
      selected: _e,
      shadowRootClonable: _e,
      shadowRootDelegatesFocus: _e,
      shadowRootMode: null,
      shape: null,
      size: oe,
      sizes: null,
      slot: null,
      span: oe,
      spellCheck: bt,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: oe,
      step: null,
      style: null,
      tabIndex: oe,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: _e,
      useMap: null,
      value: bt,
      width: oe,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: nt,
      axis: null,
      background: null,
      bgColor: null,
      border: oe,
      borderColor: null,
      bottomMargin: oe,
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
      compact: _e,
      declare: _e,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: oe,
      leftMargin: oe,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: oe,
      marginWidth: oe,
      noResize: _e,
      noHref: _e,
      noShade: _e,
      noWrap: _e,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: oe,
      rules: null,
      scheme: null,
      scrolling: bt,
      standby: null,
      summary: null,
      text: null,
      topMargin: oe,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: oe,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: _e,
      disableRemotePlayback: _e,
      prefix: null,
      property: null,
      results: oe,
      security: null,
      unselectable: null,
    },
  }),
  AB = au({
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
    transform: l_,
    properties: {
      about: Dn,
      accentHeight: oe,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: oe,
      amplitude: oe,
      arabicForm: null,
      ascent: oe,
      attributeName: null,
      attributeType: null,
      azimuth: oe,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: oe,
      by: null,
      calcMode: null,
      capHeight: oe,
      className: nt,
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
      descent: oe,
      diffuseConstant: oe,
      direction: null,
      display: null,
      dur: null,
      divisor: oe,
      dominantBaseline: null,
      download: _e,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: oe,
      enableBackground: null,
      end: null,
      event: null,
      exponent: oe,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: oe,
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
      g1: $l,
      g2: $l,
      glyphName: $l,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: oe,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: oe,
      horizOriginX: oe,
      horizOriginY: oe,
      id: null,
      ideographic: oe,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: oe,
      k: oe,
      k1: oe,
      k2: oe,
      k3: oe,
      k4: oe,
      kernelMatrix: Dn,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: oe,
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
      mediaSize: oe,
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
      overlinePosition: oe,
      overlineThickness: oe,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: oe,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: nt,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: oe,
      pointsAtY: oe,
      pointsAtZ: oe,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: Dn,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: Dn,
      rev: Dn,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: Dn,
      requiredFeatures: Dn,
      requiredFonts: Dn,
      requiredFormats: Dn,
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
      specularConstant: oe,
      specularExponent: oe,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: oe,
      strikethroughThickness: oe,
      string: null,
      stroke: null,
      strokeDashArray: Dn,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: oe,
      strokeOpacity: oe,
      strokeWidth: null,
      style: null,
      surfaceScale: oe,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: Dn,
      tabIndex: oe,
      tableValues: null,
      target: null,
      targetX: oe,
      targetY: oe,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: Dn,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: oe,
      underlineThickness: oe,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: oe,
      values: null,
      vAlphabetic: oe,
      vMathematical: oe,
      vectorEffect: null,
      vHanging: oe,
      vIdeographic: oe,
      version: null,
      vertAdvY: oe,
      vertOriginX: oe,
      vertOriginY: oe,
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
      xHeight: oe,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
  }),
  DB = /^data[-\w.:]+$/i,
  wS = /-[a-z]/g,
  NB = /[A-Z]/g;
function MB(e, t) {
  const n = Qg(t);
  let r = t,
    i = dr;
  if (n in e.normal) return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && DB.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(wS, FB);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!wS.test(l)) {
        let s = l.replace(NB, LB);
        s.charAt(0) !== "-" && (s = "-" + s), (t = "data" + s);
      }
    }
    i = qv;
  }
  return new i(r, t);
}
function LB(e) {
  return "-" + e.toLowerCase();
}
function FB(e) {
  return e.charAt(1).toUpperCase();
}
const xS = {
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
  zB = n_([o_, i_, s_, a_, RB], "html"),
  $B = n_([o_, i_, s_, a_, AB], "svg");
function BB(e) {
  if (e.allowedElements && e.disallowedElements)
    throw new TypeError(
      "Only one of `allowedElements` and `disallowedElements` should be defined"
    );
  if (e.allowedElements || e.disallowedElements || e.allowElement)
    return (t) => {
      Wv(t, "element", (n, r, i) => {
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
var c_ = { exports: {} },
  Ze = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gv = Symbol.for("react.element"),
  Kv = Symbol.for("react.portal"),
  ld = Symbol.for("react.fragment"),
  ud = Symbol.for("react.strict_mode"),
  sd = Symbol.for("react.profiler"),
  ad = Symbol.for("react.provider"),
  cd = Symbol.for("react.context"),
  UB = Symbol.for("react.server_context"),
  fd = Symbol.for("react.forward_ref"),
  dd = Symbol.for("react.suspense"),
  pd = Symbol.for("react.suspense_list"),
  hd = Symbol.for("react.memo"),
  gd = Symbol.for("react.lazy"),
  HB = Symbol.for("react.offscreen"),
  f_;
f_ = Symbol.for("react.module.reference");
function pr(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Gv:
        switch (((e = e.type), e)) {
          case ld:
          case sd:
          case ud:
          case dd:
          case pd:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case UB:
              case cd:
              case fd:
              case gd:
              case hd:
              case ad:
                return e;
              default:
                return t;
            }
        }
      case Kv:
        return t;
    }
  }
}
Ze.ContextConsumer = cd;
Ze.ContextProvider = ad;
Ze.Element = Gv;
Ze.ForwardRef = fd;
Ze.Fragment = ld;
Ze.Lazy = gd;
Ze.Memo = hd;
Ze.Portal = Kv;
Ze.Profiler = sd;
Ze.StrictMode = ud;
Ze.Suspense = dd;
Ze.SuspenseList = pd;
Ze.isAsyncMode = function () {
  return !1;
};
Ze.isConcurrentMode = function () {
  return !1;
};
Ze.isContextConsumer = function (e) {
  return pr(e) === cd;
};
Ze.isContextProvider = function (e) {
  return pr(e) === ad;
};
Ze.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Gv;
};
Ze.isForwardRef = function (e) {
  return pr(e) === fd;
};
Ze.isFragment = function (e) {
  return pr(e) === ld;
};
Ze.isLazy = function (e) {
  return pr(e) === gd;
};
Ze.isMemo = function (e) {
  return pr(e) === hd;
};
Ze.isPortal = function (e) {
  return pr(e) === Kv;
};
Ze.isProfiler = function (e) {
  return pr(e) === sd;
};
Ze.isStrictMode = function (e) {
  return pr(e) === ud;
};
Ze.isSuspense = function (e) {
  return pr(e) === dd;
};
Ze.isSuspenseList = function (e) {
  return pr(e) === pd;
};
Ze.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === ld ||
    e === sd ||
    e === ud ||
    e === dd ||
    e === pd ||
    e === HB ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === gd ||
        e.$$typeof === hd ||
        e.$$typeof === ad ||
        e.$$typeof === cd ||
        e.$$typeof === fd ||
        e.$$typeof === f_ ||
        e.getModuleId !== void 0))
  );
};
Ze.typeOf = pr;
c_.exports = Ze;
var jB = c_.exports;
const WB = uo(jB);
function VB(e) {
  const t = e && typeof e == "object" && e.type === "text" ? e.value || "" : e;
  return typeof t == "string" && t.replace(/[ \t\n\f\r]/g, "") === "";
}
function qB(e) {
  return e.join(" ").trim();
}
function GB(e, t) {
  const n = t || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e)
    .join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " "))
    .trim();
}
var Qv = { exports: {} },
  SS = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
  KB = /\n/g,
  QB = /^\s*/,
  YB = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
  XB = /^:\s*/,
  ZB = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
  JB = /^[;\s]*/,
  e9 = /^\s+|\s+$/g,
  t9 = `
`,
  ES = "/",
  CS = "*",
  Io = "",
  n9 = "comment",
  r9 = "declaration",
  i9 = function (e, t) {
    if (typeof e != "string")
      throw new TypeError("First argument must be a string");
    if (!e) return [];
    t = t || {};
    var n = 1,
      r = 1;
    function i(E) {
      var S = E.match(KB);
      S && (n += S.length);
      var A = E.lastIndexOf(t9);
      r = ~A ? E.length - A : r + E.length;
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
        var A = S[0];
        return i(A), (e = e.slice(A.length)), S;
      }
    }
    function d() {
      f(QB);
    }
    function p(E) {
      var S;
      for (E = E || []; (S = g()); ) S !== !1 && E.push(S);
      return E;
    }
    function g() {
      var E = l();
      if (!(ES != e.charAt(0) || CS != e.charAt(1))) {
        for (
          var S = 2;
          Io != e.charAt(S) && (CS != e.charAt(S) || ES != e.charAt(S + 1));

        )
          ++S;
        if (((S += 2), Io === e.charAt(S - 1)))
          return a("End of comment missing");
        var A = e.slice(2, S - 2);
        return (
          (r += 2),
          i(A),
          (e = e.slice(S)),
          (r += 2),
          E({ type: n9, comment: A })
        );
      }
    }
    function v() {
      var E = l(),
        S = f(YB);
      if (S) {
        if ((g(), !f(XB))) return a("property missing ':'");
        var A = f(ZB),
          y = E({
            type: r9,
            property: kS(S[0].replace(SS, Io)),
            value: A ? kS(A[0].replace(SS, Io)) : Io,
          });
        return f(JB), y;
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
function kS(e) {
  return e ? e.replace(e9, Io) : Io;
}
var o9 = i9;
function d_(e, t) {
  var n = null;
  if (!e || typeof e != "string") return n;
  for (
    var r, i = o9(e), l = typeof t == "function", s, a, f = 0, d = i.length;
    f < d;
    f++
  )
    (r = i[f]),
      (s = r.property),
      (a = r.value),
      l ? t(s, a, r) : a && (n || (n = {}), (n[s] = a));
  return n;
}
Qv.exports = d_;
Qv.exports.default = d_;
var l9 = Qv.exports;
const u9 = uo(l9),
  Xg = {}.hasOwnProperty,
  s9 = new Set(["table", "thead", "tbody", "tfoot", "tr"]);
function p_(e, t) {
  const n = [];
  let r = -1,
    i;
  for (; ++r < t.children.length; )
    (i = t.children[r]),
      i.type === "element"
        ? n.push(a9(e, i, r, t))
        : i.type === "text"
        ? (t.type !== "element" || !s9.has(t.tagName) || !VB(i)) &&
          n.push(i.value)
        : i.type === "raw" && !e.options.skipHtml && n.push(i.value);
  return n;
}
function a9(e, t, n, r) {
  const i = e.options,
    l = i.transformLinkUri === void 0 ? cz : i.transformLinkUri,
    s = e.schema,
    a = t.tagName,
    f = {};
  let d = s,
    p;
  if (
    (s.space === "html" && a === "svg" && ((d = $B), (e.schema = d)),
    t.properties)
  )
    for (p in t.properties)
      Xg.call(t.properties, p) && f9(f, p, t.properties[p], e);
  (a === "ol" || a === "ul") && e.listDepth++;
  const g = p_(e, t);
  (a === "ol" || a === "ul") && e.listDepth--, (e.schema = s);
  const v = t.position || {
      start: { line: null, column: null, offset: null },
      end: { line: null, column: null, offset: null },
    },
    m = i.components && Xg.call(i.components, a) ? i.components[a] : a,
    E = typeof m == "string" || m === Ae.Fragment;
  if (!WB.isValidElementType(m))
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
    const S = c9(t);
    (f.checked = S && S.properties ? !!S.properties.checked : null),
      (f.index = Ah(r, t)),
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
    i.sourcePos && (f["data-sourcepos"] = h9(v)),
    !E && i.rawSourcePos && (f.sourcePosition = t.position),
    !E &&
      i.includeElementIndex &&
      ((f.index = Ah(r, t)), (f.siblingCount = Ah(r))),
    E || (f.node = t),
    g.length > 0 ? Ae.createElement(m, f, g) : Ae.createElement(m, f)
  );
}
function c9(e) {
  let t = -1;
  for (; ++t < e.children.length; ) {
    const n = e.children[t];
    if (n.type === "element" && n.tagName === "input") return n;
  }
  return null;
}
function Ah(e, t) {
  let n = -1,
    r = 0;
  for (; ++n < e.children.length && e.children[n] !== t; )
    e.children[n].type === "element" && r++;
  return r;
}
function f9(e, t, n, r) {
  const i = MB(r.schema, t);
  let l = n;
  l == null ||
    l !== l ||
    (Array.isArray(l) && (l = i.commaSeparated ? GB(l) : qB(l)),
    i.property === "style" && typeof l == "string" && (l = d9(l)),
    i.space && i.property
      ? (e[Xg.call(xS, i.property) ? xS[i.property] : i.property] = l)
      : i.attribute && (e[i.attribute] = l));
}
function d9(e) {
  const t = {};
  try {
    u9(e, n);
  } catch {}
  return t;
  function n(r, i) {
    const l = r.slice(0, 4) === "-ms-" ? `ms-${r.slice(4)}` : r;
    t[l.replace(/-([a-z])/g, p9)] = i;
  }
}
function p9(e, t) {
  return t.toUpperCase();
}
function h9(e) {
  return [e.start.line, ":", e.start.column, "-", e.end.line, ":", e.end.column]
    .map(String)
    .join("");
}
const bS = {}.hasOwnProperty,
  g9 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  Za = {
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
function h_(e) {
  for (const l in Za)
    if (bS.call(Za, l) && bS.call(e, l)) {
      const s = Za[l];
      console.warn(
        `[react-markdown] Warning: please ${
          s.to ? `use \`${s.to}\` instead of` : "remove"
        } \`${l}\` (see <${g9}#${s.id}> for more info)`
      ),
        delete Za[l];
    }
  const t = _z()
      .use(M8)
      .use(e.remarkPlugins || [])
      .use(_B, { ...e.remarkRehypeOptions, allowDangerousHtml: !0 })
      .use(e.rehypePlugins || [])
      .use(BB, e),
    n = new Ab();
  typeof e.children == "string"
    ? (n.value = e.children)
    : e.children !== void 0 &&
      e.children !== null &&
      console.warn(
        `[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`
      );
  const r = t.runSync(t.parse(n), n);
  if (r.type !== "root") throw new TypeError("Expected a `root` node");
  let i = Ae.createElement(
    Ae.Fragment,
    {},
    p_({ options: e, schema: zB, listDepth: 0 }, r)
  );
  return (
    e.className && (i = Ae.createElement("div", { className: e.className }, i)),
    i
  );
}
h_.propTypes = {
  children: Ce.string,
  className: Ce.string,
  allowElement: Ce.func,
  allowedElements: Ce.arrayOf(Ce.string),
  disallowedElements: Ce.arrayOf(Ce.string),
  unwrapDisallowed: Ce.bool,
  remarkPlugins: Ce.arrayOf(
    Ce.oneOfType([
      Ce.object,
      Ce.func,
      Ce.arrayOf(
        Ce.oneOfType([
          Ce.bool,
          Ce.string,
          Ce.object,
          Ce.func,
          Ce.arrayOf(Ce.any),
        ])
      ),
    ])
  ),
  rehypePlugins: Ce.arrayOf(
    Ce.oneOfType([
      Ce.object,
      Ce.func,
      Ce.arrayOf(
        Ce.oneOfType([
          Ce.bool,
          Ce.string,
          Ce.object,
          Ce.func,
          Ce.arrayOf(Ce.any),
        ])
      ),
    ])
  ),
  sourcePos: Ce.bool,
  rawSourcePos: Ce.bool,
  skipHtml: Ce.bool,
  includeElementIndex: Ce.bool,
  transformLinkUri: Ce.oneOfType([Ce.func, Ce.bool]),
  linkTarget: Ce.oneOfType([Ce.func, Ce.string]),
  transformImageUri: Ce.func,
  components: Ce.object,
};
const m9 = () =>
    we("svg", {
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
        W("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        W("circle", { cx: "12", cy: "12", r: "9" }),
        W("polyline", { points: "12 7 12 12 15 15" }),
      ],
    }),
  _S = () => W("div", { className: "divider" }),
  v9 = ({ item: e, inventoryType: t, style: n }, r) => {
    const i = yi((d) => d.inventory.additionalMetadata),
      l = I.useMemo(() => St[e.name], [e]),
      s = I.useMemo(
        () =>
          e.ingredients
            ? Object.entries(e.ingredients).sort((d, p) => d[1] - p[1])
            : null,
        [e]
      ),
      a = e.metadata?.description || l?.description,
      f = l?.ammoName && St[l?.ammoName]?.label;
    return W(Cn, {
      children: l
        ? we("div", {
            style: { ...n },
            className: "tooltip-wrapper",
            ref: r,
            children: [
              we("div", {
                className: "tooltip-header-wrapper",
                children: [
                  W("p", { children: e.metadata?.label || l.label || e.name }),
                  t === "crafting"
                    ? we("div", {
                        className: "tooltip-crafting-duration",
                        children: [
                          W(m9, {}),
                          we("p", {
                            children: [
                              (e.duration !== void 0 ? e.duration : 3e3) / 1e3,
                              "s",
                            ],
                          }),
                        ],
                      })
                    : W("p", { children: e.metadata?.type }),
                ],
              }),
              W(_S, {}),
              a &&
                W("div", {
                  className: "tooltip-description",
                  children: W(h_, {
                    className: "tooltip-markdown",
                    children: a,
                  }),
                }),
              t !== "crafting"
                ? we(Cn, {
                    children: [
                      e.durability !== void 0 &&
                        we("p", {
                          children: [
                            gt.ui_durability,
                            ": ",
                            Math.trunc(e.durability),
                          ],
                        }),
                      e.metadata?.ammo !== void 0 &&
                        we("p", {
                          children: [gt.ui_ammo, ": ", e.metadata.ammo],
                        }),
                      f && we("p", { children: [gt.ammo_type, ": ", f] }),
                      e.metadata?.serial &&
                        we("p", {
                          children: [gt.ui_serial, ": ", e.metadata.serial],
                        }),
                      e.metadata?.components &&
                        e.metadata?.components[0] &&
                        we("p", {
                          children: [
                            gt.ui_components,
                            ":",
                            " ",
                            (e.metadata?.components).map((d, p, g) =>
                              p + 1 === g.length
                                ? St[d]?.label
                                : St[d]?.label + ", "
                            ),
                          ],
                        }),
                      e.metadata?.weapontint &&
                        we("p", {
                          children: [gt.ui_tint, ": ", e.metadata.weapontint],
                        }),
                      i.map((d, p) =>
                        W(
                          I.Fragment,
                          {
                            children:
                              e.metadata &&
                              e.metadata[d.metadata] &&
                              we("p", {
                                children: [
                                  d.value,
                                  ": ",
                                  e.metadata[d.metadata],
                                ],
                              }),
                          },
                          `metadata-${p}`
                        )
                      ),
                    ],
                  })
                : W("div", {
                    className: "tooltip-ingredients",
                    children:
                      s &&
                      s.map((d) => {
                        const [p, g] = [d[0], d[1]];
                        return we(
                          "div",
                          {
                            className: "tooltip-ingredient",
                            children: [
                              W("img", {
                                src: p ? jr(p) : "none",
                                alt: "item-image",
                              }),
                              W("p", {
                                children:
                                  g >= 1
                                    ? `${g}x ${St[p]?.label || p}`
                                    : g === 0
                                    ? `${St[p]?.label || p}`
                                    : g < 1 &&
                                      `${g * 100}% ${St[p]?.label || p}`,
                              }),
                            ],
                          },
                          `ingredient-${p}`
                        );
                      }),
                  }),
            ],
          })
        : we("div", {
            className: "tooltip-wrapper",
            ref: r,
            style: n,
            children: [
              W("div", {
                className: "tooltip-header-wrapper",
                children: W("p", { children: e.name }),
              }),
              W(_S, {}),
            ],
          }),
    });
  },
  y9 = Ae.forwardRef(v9),
  w9 = () => {
    const e = yi((a) => a.tooltip),
      {
        refs: t,
        context: n,
        floatingStyles: r,
      } = Fv({
        middleware: [ob(), ib(), rb({ mainAxis: 10, crossAxis: 10 })],
        open: e.open,
        placement: "right-start",
      }),
      { isMounted: i, styles: l } = zv(n, { duration: 200 }),
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
      I.useEffect(
        () => (
          window.addEventListener("mousemove", s),
          () => {
            window.removeEventListener("mousemove", s);
          }
        ),
        []
      ),
      W(Cn, {
        children:
          i &&
          e.item &&
          e.inventoryType &&
          W(Lv, {
            children: W(y9, {
              ref: t.setFloating,
              style: { ...r, ...l },
              item: e.item,
              inventoryType: e.inventoryType,
            }),
          }),
      })
    );
  },
  x9 = (e) => {
    const t = document.createElement("input");
    (t.value = e),
      document.body.appendChild(t),
      t.select(),
      document.execCommand("copy"),
      document.body.removeChild(t);
  },
  Zg = Ae.createContext({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    setHasFocusInside: () => {},
    isOpen: !1,
  }),
  OS = Ae.forwardRef(({ children: e, label: t, ...n }, r) => {
    const i = yi((ne) => ne.contextMenu),
      [l, s] = I.useState(!1),
      [a, f] = I.useState(!1),
      [d, p] = I.useState(null),
      g = I.useRef([]),
      v = I.useRef([]),
      m = I.useContext(Zg),
      E = fo(),
      S = x5(),
      A = Go(),
      y = fb(),
      w = A != null,
      {
        floatingStyles: k,
        refs: R,
        context: D,
      } = Fv({
        nodeId: S,
        open: l,
        onOpenChange: s,
        placement: w ? "right-start" : "bottom-start",
        middleware: [
          rb({ mainAxis: w ? 0 : 4, alignmentAxis: w ? -4 : 0 }),
          ob(),
          ib(),
        ],
        whileElementsMounted: j6,
      }),
      { isMounted: T, styles: F } = zv(D);
    I.useEffect(() => {
      w ||
        (i.coords &&
          (R.setPositionReference({
            getBoundingClientRect() {
              return {
                width: 0,
                height: 0,
                x: i.coords.x,
                y: i.coords.y,
                top: i.coords.y,
                right: i.coords.x,
                bottom: i.coords.y,
                left: i.coords.x,
              };
            },
          }),
          s(!0)),
        i.coords || s(!1));
    }, [i]);
    const z = C5(D, {
        enabled: w,
        delay: { open: 75 },
        handleClose: G5({ blockPointerEvents: !0 }),
      }),
      q = N5(D, { event: "mousedown", toggle: !w, ignoreMouse: w }),
      G = H5(D, { role: "menu" }),
      $ = Cb(D, { bubbles: !0 }),
      Q = U5(D, { listRef: g, activeIndex: d, nested: w, onNavigate: p }),
      B = V5(D, { listRef: v, onMatch: l ? p : void 0, activeIndex: d }),
      {
        getReferenceProps: U,
        getFloatingProps: J,
        getItemProps: ue,
      } = kb([z, q, G, $, Q, B]);
    return (
      I.useEffect(() => {
        if (!E) return;
        function ne() {
          s(!1);
        }
        function H(Z) {
          Z.nodeId !== S && Z.parentId === A && s(!1);
        }
        return (
          E.events.on("click", ne),
          E.events.on("menuopen", H),
          () => {
            E.events.off("click", ne), E.events.off("menuopen", H);
          }
        );
      }, [E, S, A]),
      I.useEffect(() => {
        l && E && E.events.emit("menuopen", { parentId: A, nodeId: S });
      }, [E, l, S, A]),
      we(S5, {
        id: S,
        children: [
          w &&
            we("button", {
              ref: Av([R.setReference, y.ref, r]),
              tabIndex: w ? (m.activeIndex === y.index ? 0 : -1) : void 0,
              role: w ? "menuitem" : void 0,
              "data-open": l ? "" : void 0,
              "data-nested": w ? "" : void 0,
              "data-focus-inside": a ? "" : void 0,
              className: w ? "context-menu-item" : "context-menu-list",
              ...U(
                m.getItemProps({
                  ...n,
                  onFocus(ne) {
                    n.onFocus?.(ne), f(!1), m.setHasFocusInside(!0);
                  },
                })
              ),
              children: [
                t,
                w &&
                  W("span", {
                    "aria-hidden": !0,
                    style: { marginLeft: 10, fontSize: 10 },
                    children: "▶",
                  }),
              ],
            }),
          W(Zg.Provider, {
            value: {
              activeIndex: d,
              setActiveIndex: p,
              getItemProps: ue,
              setHasFocusInside: f,
              isOpen: l,
            },
            children: W(m5, {
              elementsRef: g,
              labelsRef: v,
              children:
                T &&
                W(Lv, {
                  children: W(Eb, {
                    lockScroll: !0,
                    children: W(Sb, {
                      context: D,
                      modal: !0,
                      initialFocus: R.floating,
                      children: W("div", {
                        ref: R.setFloating,
                        className: "context-menu-list",
                        style: { ...k, ...F },
                        ...J(),
                        children: e,
                      }),
                    }),
                  }),
                }),
            }),
          }),
        ],
      })
    );
  }),
  Di = Ae.forwardRef(({ label: e, disabled: t, ...n }, r) => {
    const i = I.useContext(Zg),
      l = fb({ label: t ? null : e }),
      s = fo(),
      a = l.index === i.activeIndex;
    return W("button", {
      ...n,
      ref: Av([l.ref, r]),
      type: "button",
      role: "menuitem",
      className: "context-menu-item",
      tabIndex: a ? 0 : -1,
      disabled: t,
      ...i.getItemProps({
        onClick(f) {
          n.onClick?.(f), s?.events.emit("click");
        },
        onFocus(f) {
          n.onFocus?.(f), i.setHasFocusInside(!0);
        },
      }),
      children: e,
    });
  }),
  Dh = Ae.forwardRef((e, t) =>
    Go() === null
      ? W(E5, { children: W(OS, { ...e, ref: t }) })
      : W(OS, { ...e, ref: t })
  ),
  S9 = () => {
    const t = yi((i) => i.contextMenu).item,
      n = (i) => {
        if (t)
          switch (i && i.action) {
            case "use":
              Xf({ name: t.name, slot: t.slot });
              break;
            case "give":
              Tb({ name: t.name, slot: t.slot });
              break;
            case "drop":
              gn(t) && zg({ item: t, inventory: "player" });
              break;
            case "remove":
              _r("removeComponent", { component: i?.component, slot: i?.slot });
              break;
            case "removeAmmo":
              _r("removeAmmo", t.slot);
              break;
            case "copy":
              x9(i.serial || "");
              break;
            case "custom":
              _r("useButton", { id: (i?.id || 0) + 1, slot: t.slot });
              break;
          }
      },
      r = (i) =>
        i.reduce((l, s, a) => {
          if (s.group) {
            const f = l.findIndex((d) => d.groupName === s.group);
            f !== -1
              ? l[f].buttons.push({ ...s, index: a })
              : l.push({ groupName: s.group, buttons: [{ ...s, index: a }] });
          } else l.push({ groupName: null, buttons: [{ ...s, index: a }] });
          return l;
        }, []);
    return W(Cn, {
      children: we(Dh, {
        children: [
          W(Di, {
            onClick: () => n({ action: "use" }),
            label: gt.ui_use || "Use",
          }),
          W(Di, {
            onClick: () => n({ action: "give" }),
            label: gt.ui_give || "Give",
          }),
          W(Di, {
            onClick: () => n({ action: "drop" }),
            label: gt.ui_drop || "Drop",
          }),
          t &&
            t.metadata?.ammo > 0 &&
            W(Di, {
              onClick: () => n({ action: "removeAmmo" }),
              label: gt.ui_remove_ammo,
            }),
          t &&
            t.metadata?.serial &&
            W(Di, {
              onClick: () => n({ action: "copy", serial: t.metadata?.serial }),
              label: gt.ui_copy,
            }),
          t &&
            t.metadata?.components &&
            t.metadata?.components.length > 0 &&
            W(Dh, {
              label: gt.ui_removeattachments,
              children:
                t &&
                t.metadata?.components.map((i, l) =>
                  W(
                    Di,
                    {
                      onClick: () =>
                        n({ action: "remove", component: i, slot: t.slot }),
                      label: St[i]?.label || "",
                    },
                    l
                  )
                ),
            }),
          ((t && t.name && St[t.name]?.buttons?.length) || 0) > 0 &&
            W(Cn, {
              children:
                t &&
                t.name &&
                r(St[t.name]?.buttons).map((i, l) =>
                  W(
                    Ae.Fragment,
                    {
                      children: i.groupName
                        ? W(Dh, {
                            label: i.groupName,
                            children: i.buttons.map((s) =>
                              W(
                                Di,
                                {
                                  onClick: () =>
                                    n({ action: "custom", id: s.index }),
                                  label: s.label,
                                },
                                s.index
                              )
                            ),
                          })
                        : i.buttons.map((s) =>
                            W(
                              Di,
                              {
                                onClick: () =>
                                  n({ action: "custom", id: s.index }),
                                label: s.label,
                              },
                              s.index
                            )
                          ),
                    },
                    l
                  )
                ),
            }),
        ],
      }),
    });
  },
  g_ = (e) => {
    const t = I.useRef(null);
    return W(zk, {
      in: e.in,
      nodeRef: t,
      classNames: "transition-fade",
      timeout: 200,
      unmountOnExit: !0,
      children: W("span", { ref: t, children: e.children }),
    });
  },
  E9 = () => {
    const [e, t] = I.useState(!1),
      n = lu();
    return (
      zr("setInventoryVisible", t),
      zr("closeInventory", () => {
        t(!1), n(Dk()), n(ts());
      }),
      YF(t),
      zr("setupInventory", (r) => {
        n(Tk(r)), !e && t(!0);
      }),
      zr("refreshSlots", (r) => n(wF(r))),
      zr("displayMetadata", (r) => {
        n(pF(r));
      }),
      we(Cn, {
        children: [
          W(g_, {
            in: e,
            children: we("div", {
              className: "inventory-wrapper",
              children: [W(az, {}), W(sz, {}), W(w9, {}), W(S9, {})],
            }),
          }),
          W(KF, {}),
        ],
      })
    );
  },
  Jg = (e, t) => ({ x: e.x - t.x, y: e.y - t.y }),
  C9 = (e) => {
    const t = e.getInitialClientOffset(),
      n = e.getInitialSourceClientOffset();
    return t === null || n === null || t.x === void 0 || t.y === void 0
      ? { x: 0, y: 0 }
      : Jg(t, n);
  },
  k9 = (e, t) => {
    const n = e.getClientOffset();
    if (n === null) return null;
    if (!t.current || !t.current.getBoundingClientRect) return Jg(n, C9(e));
    const r = t.current.getBoundingClientRect(),
      i = { x: r.width / 2, y: r.height / 2 };
    return Jg(n, i);
  },
  b9 = () => {
    const e = I.useRef(null),
      {
        data: t,
        isDragging: n,
        currentOffset: r,
      } = rL((i) => ({
        data: i.getItem(),
        currentOffset: k9(i, e),
        isDragging: i.isDragging(),
      }));
    return W(Cn, {
      children:
        n &&
        r &&
        t.item &&
        W("div", {
          className: "item-drag-preview",
          ref: e,
          style: {
            transform: `translate(${r.x}px, ${r.y}px)`,
            backgroundImage: t.image,
          },
        }),
    });
  },
  _9 = (e) => {
    const [t, n] = I.useState(!1),
      r = I.useCallback(
        (s) =>
          ({ key: a }) => {
            a === e && n(s);
          },
        [e]
      ),
      i = r(!0),
      l = r(!1);
    return (
      I.useEffect(
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
  O9 = () => {
    const e = lu(),
      t = _9("Shift");
    return (
      I.useEffect(() => {
        e(gF(t));
      }, [t, e]),
      W(Cn, {})
    );
  },
  I9 = () => {
    const e = lu(),
      t = vi();
    return (
      zr("init", ({ locale: n, items: r, leftInventory: i, imagepath: l }) => {
        for (const s in n) gt[s] = n[s];
        for (const s in r) St[s] = r[s];
        rF(l), e(Tk({ leftInventory: i }));
      }),
      _r("uiLoaded", {}),
      zr("closeInventory", () => {
        t.dispatch({ type: "dnd-core/END_DRAG" });
      }),
      we("div", {
        className: "app-wrapper",
        children: [W(E9, {}), W(b9, {}), W(O9, {})],
      })
    );
  };
addEventListener("dragstart", function (e) {
  e.preventDefault();
});
const T9 = (e = []) => {
    const [t, n] = I.useState(e);
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
  P9 = Ae.createContext(null),
  R9 = Ae.forwardRef((e, t) => {
    const n = e.item.item;
    return we("div", {
      className: "item-notification-item",
      children: [
        W("div", {
          className: "item-notification-item-box",
          ref: t,
          style: { backgroundImage: `url(${jr("hexagono")})`, ...e.style },
          children: W("div", {
            className: "item-notification-image",
            style: {
              backgroundImage: `url(${
                jr(n) || "https://img.icons8.com/ios-filled/100/no-image.png"
              }`,
              ...e.style,
            },
          }),
        }),
        we("div", {
          className: "item-notification-item-name",
          children: [
            W("div", {
              className: "item-notification-name",
              children: n.metadata?.label || St[n.name]?.label || "Lockpick",
            }),
            W("div", {
              className: "item-notification-action-box",
              children: W("p", { children: e.item.text }),
            }),
          ],
        }),
      ],
    });
  }),
  A9 = ({ children: e }) => {
    const t = T9(),
      n = (r) => {
        const i = Ae.createRef(),
          l = { id: Date.now(), item: r, ref: i };
        t.add(l);
        const s = setTimeout(() => {
          t.remove(), clearTimeout(s);
        }, 2500);
      };
    return (
      zr("itemNotify", ([r, i, l]) => {
        n({
          item: r,
          text: l
            ? `${gt[i] || "Adicionado"} ${l}x`
            : `${gt[i] || "Adicionado"}`,
        });
      }),
      we(P9.Provider, {
        value: { add: n },
        children: [
          e,
          iu.createPortal(
            W(qF, {
              className: "item-notification-container",
              children: t.values.map((r, i) =>
                W(
                  g_,
                  { children: W(R9, { item: r.item, ref: r.ref }) },
                  `item-notification-${i}`
                )
              ),
            }),
            document.body
          ),
        ],
      })
    );
  },
  ju = document.getElementById("root");
_k() &&
  ((ju.style.backgroundImage = 'url("https://i.imgur.com/iPTAdYV.png")'),
  (ju.style.backgroundSize = "cover"),
  (ju.style.backgroundRepeat = "no-repeat"),
  (ju.style.backgroundPosition = "center"));
UC(ju).render(
  W(Ae.StrictMode, {
    children: W(uM, {
      store: Mn,
      children: W(D4, {
        backend: xL,
        options: { enableMouseEvents: !0 },
        children: W(A9, { children: W(I9, {}) }),
      }),
    }),
  })
);
