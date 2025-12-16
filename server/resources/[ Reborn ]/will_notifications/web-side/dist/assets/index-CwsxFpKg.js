(function () {
  const Y = document.createElement("link").relList;
  if (Y && Y.supports && Y.supports("modulepreload")) return;
  for (const p of document.querySelectorAll('link[rel="modulepreload"]')) v(p);
  new MutationObserver((p) => {
    for (const U of p)
      if (U.type === "childList")
        for (const G of U.addedNodes)
          G.tagName === "LINK" && G.rel === "modulepreload" && v(G);
  }).observe(document, { childList: !0, subtree: !0 });
  function _(p) {
    const U = {};
    return (
      p.integrity && (U.integrity = p.integrity),
      p.referrerPolicy && (U.referrerPolicy = p.referrerPolicy),
      p.crossOrigin === "use-credentials"
        ? (U.credentials = "include")
        : p.crossOrigin === "anonymous"
        ? (U.credentials = "omit")
        : (U.credentials = "same-origin"),
      U
    );
  }
  function v(p) {
    if (p.ep) return;
    p.ep = !0;
    const U = _(p);
    fetch(p.href, U);
  }
})();
var ic = { exports: {} },
  Te = {};
var gv;
function $d() {
  if (gv) return Te;
  gv = 1;
  var A = Symbol.for("react.transitional.element"),
    Y = Symbol.for("react.fragment");
  function _(v, p, U) {
    var G = null;
    if (
      (U !== void 0 && (G = "" + U),
      p.key !== void 0 && (G = "" + p.key),
      "key" in p)
    ) {
      U = {};
      for (var k in p) k !== "key" && (U[k] = p[k]);
    } else U = p;
    return (
      (p = U.ref),
      { $$typeof: A, type: v, key: G, ref: p !== void 0 ? p : null, props: U }
    );
  }
  return (Te.Fragment = Y), (Te.jsx = _), (Te.jsxs = _), Te;
}
var Sv;
function Fd() {
  return Sv || ((Sv = 1), (ic.exports = $d())), ic.exports;
}
var x = Fd(),
  cc = { exports: {} },
  X = {};
var rv;
function kd() {
  if (rv) return X;
  rv = 1;
  var A = Symbol.for("react.transitional.element"),
    Y = Symbol.for("react.portal"),
    _ = Symbol.for("react.fragment"),
    v = Symbol.for("react.strict_mode"),
    p = Symbol.for("react.profiler"),
    U = Symbol.for("react.consumer"),
    G = Symbol.for("react.context"),
    k = Symbol.for("react.forward_ref"),
    R = Symbol.for("react.suspense"),
    E = Symbol.for("react.memo"),
    I = Symbol.for("react.lazy"),
    q = Symbol.for("react.activity"),
    P = Symbol.iterator;
  function Yl(o) {
    return o === null || typeof o != "object"
      ? null
      : ((o = (P && o[P]) || o["@@iterator"]),
        typeof o == "function" ? o : null);
  }
  var pl = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    jl = Object.assign,
    Ut = {};
  function Fl(o, T, M) {
    (this.props = o),
      (this.context = T),
      (this.refs = Ut),
      (this.updater = M || pl);
  }
  (Fl.prototype.isReactComponent = {}),
    (Fl.prototype.setState = function (o, T) {
      if (typeof o != "object" && typeof o != "function" && o != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, o, T, "setState");
    }),
    (Fl.prototype.forceUpdate = function (o) {
      this.updater.enqueueForceUpdate(this, o, "forceUpdate");
    });
  function Ft() {}
  Ft.prototype = Fl.prototype;
  function ql(o, T, M) {
    (this.props = o),
      (this.context = T),
      (this.refs = Ut),
      (this.updater = M || pl);
  }
  var it = (ql.prototype = new Ft());
  (it.constructor = ql), jl(it, Fl.prototype), (it.isPureReactComponent = !0);
  var Et = Array.isArray;
  function Xl() {}
  var $ = { H: null, A: null, T: null, S: null },
    Ql = Object.prototype.hasOwnProperty;
  function At(o, T, M) {
    var N = M.ref;
    return {
      $$typeof: A,
      type: o,
      key: T,
      ref: N !== void 0 ? N : null,
      props: M,
    };
  }
  function Za(o, T) {
    return At(o.type, T, o.props);
  }
  function _t(o) {
    return typeof o == "object" && o !== null && o.$$typeof === A;
  }
  function Zl(o) {
    var T = { "=": "=0", ":": "=2" };
    return (
      "$" +
      o.replace(/[=:]/g, function (M) {
        return T[M];
      })
    );
  }
  var Ea = /\/+/g;
  function Nt(o, T) {
    return typeof o == "object" && o !== null && o.key != null
      ? Zl("" + o.key)
      : T.toString(36);
  }
  function rt(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (
          (typeof o.status == "string"
            ? o.then(Xl, Xl)
            : ((o.status = "pending"),
              o.then(
                function (T) {
                  o.status === "pending" &&
                    ((o.status = "fulfilled"), (o.value = T));
                },
                function (T) {
                  o.status === "pending" &&
                    ((o.status = "rejected"), (o.reason = T));
                }
              )),
          o.status)
        ) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function r(o, T, M, N, Q) {
    var V = typeof o;
    (V === "undefined" || V === "boolean") && (o = null);
    var ul = !1;
    if (o === null) ul = !0;
    else
      switch (V) {
        case "bigint":
        case "string":
        case "number":
          ul = !0;
          break;
        case "object":
          switch (o.$$typeof) {
            case A:
            case Y:
              ul = !0;
              break;
            case I:
              return (ul = o._init), r(ul(o._payload), T, M, N, Q);
          }
      }
    if (ul)
      return (
        (Q = Q(o)),
        (ul = N === "" ? "." + Nt(o, 0) : N),
        Et(Q)
          ? ((M = ""),
            ul != null && (M = ul.replace(Ea, "$&/") + "/"),
            r(Q, T, M, "", function (Du) {
              return Du;
            }))
          : Q != null &&
            (_t(Q) &&
              (Q = Za(
                Q,
                M +
                  (Q.key == null || (o && o.key === Q.key)
                    ? ""
                    : ("" + Q.key).replace(Ea, "$&/") + "/") +
                  ul
              )),
            T.push(Q)),
        1
      );
    ul = 0;
    var xl = N === "" ? "." : N + ":";
    if (Et(o))
      for (var Sl = 0; Sl < o.length; Sl++)
        (N = o[Sl]), (V = xl + Nt(N, Sl)), (ul += r(N, T, M, V, Q));
    else if (((Sl = Yl(o)), typeof Sl == "function"))
      for (o = Sl.call(o), Sl = 0; !(N = o.next()).done; )
        (N = N.value), (V = xl + Nt(N, Sl++)), (ul += r(N, T, M, V, Q));
    else if (V === "object") {
      if (typeof o.then == "function") return r(rt(o), T, M, N, Q);
      throw (
        ((T = String(o)),
        Error(
          "Objects are not valid as a React child (found: " +
            (T === "[object Object]"
              ? "object with keys {" + Object.keys(o).join(", ") + "}"
              : T) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return ul;
  }
  function O(o, T, M) {
    if (o == null) return o;
    var N = [],
      Q = 0;
    return (
      r(o, N, "", "", function (V) {
        return T.call(M, V, Q++);
      }),
      N
    );
  }
  function j(o) {
    if (o._status === -1) {
      var T = o._result;
      (T = T()),
        T.then(
          function (M) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 1), (o._result = M));
          },
          function (M) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 2), (o._result = M));
          }
        ),
        o._status === -1 && ((o._status = 0), (o._result = T));
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var fl =
      typeof reportError == "function"
        ? reportError
        : function (o) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var T = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof o == "object" &&
                  o !== null &&
                  typeof o.message == "string"
                    ? String(o.message)
                    : String(o),
                error: o,
              });
              if (!window.dispatchEvent(T)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", o);
              return;
            }
            console.error(o);
          },
    ol = {
      map: O,
      forEach: function (o, T, M) {
        O(
          o,
          function () {
            T.apply(this, arguments);
          },
          M
        );
      },
      count: function (o) {
        var T = 0;
        return (
          O(o, function () {
            T++;
          }),
          T
        );
      },
      toArray: function (o) {
        return (
          O(o, function (T) {
            return T;
          }) || []
        );
      },
      only: function (o) {
        if (!_t(o))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return o;
      },
    };
  return (
    (X.Activity = q),
    (X.Children = ol),
    (X.Component = Fl),
    (X.Fragment = _),
    (X.Profiler = p),
    (X.PureComponent = ql),
    (X.StrictMode = v),
    (X.Suspense = R),
    (X.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
    (X.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (o) {
        return $.H.useMemoCache(o);
      },
    }),
    (X.cache = function (o) {
      return function () {
        return o.apply(null, arguments);
      };
    }),
    (X.cacheSignal = function () {
      return null;
    }),
    (X.cloneElement = function (o, T, M) {
      if (o == null)
        throw Error(
          "The argument must be a React element, but you passed " + o + "."
        );
      var N = jl({}, o.props),
        Q = o.key;
      if (T != null)
        for (V in (T.key !== void 0 && (Q = "" + T.key), T))
          !Ql.call(T, V) ||
            V === "key" ||
            V === "__self" ||
            V === "__source" ||
            (V === "ref" && T.ref === void 0) ||
            (N[V] = T[V]);
      var V = arguments.length - 2;
      if (V === 1) N.children = M;
      else if (1 < V) {
        for (var ul = Array(V), xl = 0; xl < V; xl++)
          ul[xl] = arguments[xl + 2];
        N.children = ul;
      }
      return At(o.type, Q, N);
    }),
    (X.createContext = function (o) {
      return (
        (o = {
          $$typeof: G,
          _currentValue: o,
          _currentValue2: o,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (o.Provider = o),
        (o.Consumer = { $$typeof: U, _context: o }),
        o
      );
    }),
    (X.createElement = function (o, T, M) {
      var N,
        Q = {},
        V = null;
      if (T != null)
        for (N in (T.key !== void 0 && (V = "" + T.key), T))
          Ql.call(T, N) &&
            N !== "key" &&
            N !== "__self" &&
            N !== "__source" &&
            (Q[N] = T[N]);
      var ul = arguments.length - 2;
      if (ul === 1) Q.children = M;
      else if (1 < ul) {
        for (var xl = Array(ul), Sl = 0; Sl < ul; Sl++)
          xl[Sl] = arguments[Sl + 2];
        Q.children = xl;
      }
      if (o && o.defaultProps)
        for (N in ((ul = o.defaultProps), ul))
          Q[N] === void 0 && (Q[N] = ul[N]);
      return At(o, V, Q);
    }),
    (X.createRef = function () {
      return { current: null };
    }),
    (X.forwardRef = function (o) {
      return { $$typeof: k, render: o };
    }),
    (X.isValidElement = _t),
    (X.lazy = function (o) {
      return { $$typeof: I, _payload: { _status: -1, _result: o }, _init: j };
    }),
    (X.memo = function (o, T) {
      return { $$typeof: E, type: o, compare: T === void 0 ? null : T };
    }),
    (X.startTransition = function (o) {
      var T = $.T,
        M = {};
      $.T = M;
      try {
        var N = o(),
          Q = $.S;
        Q !== null && Q(M, N),
          typeof N == "object" &&
            N !== null &&
            typeof N.then == "function" &&
            N.then(Xl, fl);
      } catch (V) {
        fl(V);
      } finally {
        T !== null && M.types !== null && (T.types = M.types), ($.T = T);
      }
    }),
    (X.unstable_useCacheRefresh = function () {
      return $.H.useCacheRefresh();
    }),
    (X.use = function (o) {
      return $.H.use(o);
    }),
    (X.useActionState = function (o, T, M) {
      return $.H.useActionState(o, T, M);
    }),
    (X.useCallback = function (o, T) {
      return $.H.useCallback(o, T);
    }),
    (X.useContext = function (o) {
      return $.H.useContext(o);
    }),
    (X.useDebugValue = function () {}),
    (X.useDeferredValue = function (o, T) {
      return $.H.useDeferredValue(o, T);
    }),
    (X.useEffect = function (o, T) {
      return $.H.useEffect(o, T);
    }),
    (X.useEffectEvent = function (o) {
      return $.H.useEffectEvent(o);
    }),
    (X.useId = function () {
      return $.H.useId();
    }),
    (X.useImperativeHandle = function (o, T, M) {
      return $.H.useImperativeHandle(o, T, M);
    }),
    (X.useInsertionEffect = function (o, T) {
      return $.H.useInsertionEffect(o, T);
    }),
    (X.useLayoutEffect = function (o, T) {
      return $.H.useLayoutEffect(o, T);
    }),
    (X.useMemo = function (o, T) {
      return $.H.useMemo(o, T);
    }),
    (X.useOptimistic = function (o, T) {
      return $.H.useOptimistic(o, T);
    }),
    (X.useReducer = function (o, T, M) {
      return $.H.useReducer(o, T, M);
    }),
    (X.useRef = function (o) {
      return $.H.useRef(o);
    }),
    (X.useState = function (o) {
      return $.H.useState(o);
    }),
    (X.useSyncExternalStore = function (o, T, M) {
      return $.H.useSyncExternalStore(o, T, M);
    }),
    (X.useTransition = function () {
      return $.H.useTransition();
    }),
    (X.version = "19.2.0"),
    X
  );
}
var bv;
function dc() {
  return bv || ((bv = 1), (cc.exports = kd())), cc.exports;
}
var Cl = dc(),
  sc = { exports: {} },
  Ee = {},
  oc = { exports: {} },
  vc = {};
var zv;
function Id() {
  return (
    zv ||
      ((zv = 1),
      (function (A) {
        function Y(r, O) {
          var j = r.length;
          r.push(O);
          l: for (; 0 < j; ) {
            var fl = (j - 1) >>> 1,
              ol = r[fl];
            if (0 < p(ol, O)) (r[fl] = O), (r[j] = ol), (j = fl);
            else break l;
          }
        }
        function _(r) {
          return r.length === 0 ? null : r[0];
        }
        function v(r) {
          if (r.length === 0) return null;
          var O = r[0],
            j = r.pop();
          if (j !== O) {
            r[0] = j;
            l: for (var fl = 0, ol = r.length, o = ol >>> 1; fl < o; ) {
              var T = 2 * (fl + 1) - 1,
                M = r[T],
                N = T + 1,
                Q = r[N];
              if (0 > p(M, j))
                N < ol && 0 > p(Q, M)
                  ? ((r[fl] = Q), (r[N] = j), (fl = N))
                  : ((r[fl] = M), (r[T] = j), (fl = T));
              else if (N < ol && 0 > p(Q, j)) (r[fl] = Q), (r[N] = j), (fl = N);
              else break l;
            }
          }
          return O;
        }
        function p(r, O) {
          var j = r.sortIndex - O.sortIndex;
          return j !== 0 ? j : r.id - O.id;
        }
        if (
          ((A.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var U = performance;
          A.unstable_now = function () {
            return U.now();
          };
        } else {
          var G = Date,
            k = G.now();
          A.unstable_now = function () {
            return G.now() - k;
          };
        }
        var R = [],
          E = [],
          I = 1,
          q = null,
          P = 3,
          Yl = !1,
          pl = !1,
          jl = !1,
          Ut = !1,
          Fl = typeof setTimeout == "function" ? setTimeout : null,
          Ft = typeof clearTimeout == "function" ? clearTimeout : null,
          ql = typeof setImmediate < "u" ? setImmediate : null;
        function it(r) {
          for (var O = _(E); O !== null; ) {
            if (O.callback === null) v(E);
            else if (O.startTime <= r)
              v(E), (O.sortIndex = O.expirationTime), Y(R, O);
            else break;
            O = _(E);
          }
        }
        function Et(r) {
          if (((jl = !1), it(r), !pl))
            if (_(R) !== null) (pl = !0), Xl || ((Xl = !0), Zl());
            else {
              var O = _(E);
              O !== null && rt(Et, O.startTime - r);
            }
        }
        var Xl = !1,
          $ = -1,
          Ql = 5,
          At = -1;
        function Za() {
          return Ut ? !0 : !(A.unstable_now() - At < Ql);
        }
        function _t() {
          if (((Ut = !1), Xl)) {
            var r = A.unstable_now();
            At = r;
            var O = !0;
            try {
              l: {
                (pl = !1), jl && ((jl = !1), Ft($), ($ = -1)), (Yl = !0);
                var j = P;
                try {
                  t: {
                    for (
                      it(r), q = _(R);
                      q !== null && !(q.expirationTime > r && Za());

                    ) {
                      var fl = q.callback;
                      if (typeof fl == "function") {
                        (q.callback = null), (P = q.priorityLevel);
                        var ol = fl(q.expirationTime <= r);
                        if (((r = A.unstable_now()), typeof ol == "function")) {
                          (q.callback = ol), it(r), (O = !0);
                          break t;
                        }
                        q === _(R) && v(R), it(r);
                      } else v(R);
                      q = _(R);
                    }
                    if (q !== null) O = !0;
                    else {
                      var o = _(E);
                      o !== null && rt(Et, o.startTime - r), (O = !1);
                    }
                  }
                  break l;
                } finally {
                  (q = null), (P = j), (Yl = !1);
                }
                O = void 0;
              }
            } finally {
              O ? Zl() : (Xl = !1);
            }
          }
        }
        var Zl;
        if (typeof ql == "function")
          Zl = function () {
            ql(_t);
          };
        else if (typeof MessageChannel < "u") {
          var Ea = new MessageChannel(),
            Nt = Ea.port2;
          (Ea.port1.onmessage = _t),
            (Zl = function () {
              Nt.postMessage(null);
            });
        } else
          Zl = function () {
            Fl(_t, 0);
          };
        function rt(r, O) {
          $ = Fl(function () {
            r(A.unstable_now());
          }, O);
        }
        (A.unstable_IdlePriority = 5),
          (A.unstable_ImmediatePriority = 1),
          (A.unstable_LowPriority = 4),
          (A.unstable_NormalPriority = 3),
          (A.unstable_Profiling = null),
          (A.unstable_UserBlockingPriority = 2),
          (A.unstable_cancelCallback = function (r) {
            r.callback = null;
          }),
          (A.unstable_forceFrameRate = function (r) {
            0 > r || 125 < r
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (Ql = 0 < r ? Math.floor(1e3 / r) : 5);
          }),
          (A.unstable_getCurrentPriorityLevel = function () {
            return P;
          }),
          (A.unstable_next = function (r) {
            switch (P) {
              case 1:
              case 2:
              case 3:
                var O = 3;
                break;
              default:
                O = P;
            }
            var j = P;
            P = O;
            try {
              return r();
            } finally {
              P = j;
            }
          }),
          (A.unstable_requestPaint = function () {
            Ut = !0;
          }),
          (A.unstable_runWithPriority = function (r, O) {
            switch (r) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                r = 3;
            }
            var j = P;
            P = r;
            try {
              return O();
            } finally {
              P = j;
            }
          }),
          (A.unstable_scheduleCallback = function (r, O, j) {
            var fl = A.unstable_now();
            switch (
              (typeof j == "object" && j !== null
                ? ((j = j.delay),
                  (j = typeof j == "number" && 0 < j ? fl + j : fl))
                : (j = fl),
              r)
            ) {
              case 1:
                var ol = -1;
                break;
              case 2:
                ol = 250;
                break;
              case 5:
                ol = 1073741823;
                break;
              case 4:
                ol = 1e4;
                break;
              default:
                ol = 5e3;
            }
            return (
              (ol = j + ol),
              (r = {
                id: I++,
                callback: O,
                priorityLevel: r,
                startTime: j,
                expirationTime: ol,
                sortIndex: -1,
              }),
              j > fl
                ? ((r.sortIndex = j),
                  Y(E, r),
                  _(R) === null &&
                    r === _(E) &&
                    (jl ? (Ft($), ($ = -1)) : (jl = !0), rt(Et, j - fl)))
                : ((r.sortIndex = ol),
                  Y(R, r),
                  pl || Yl || ((pl = !0), Xl || ((Xl = !0), Zl()))),
              r
            );
          }),
          (A.unstable_shouldYield = Za),
          (A.unstable_wrapCallback = function (r) {
            var O = P;
            return function () {
              var j = P;
              P = O;
              try {
                return r.apply(this, arguments);
              } finally {
                P = j;
              }
            };
          });
      })(vc)),
    vc
  );
}
var Tv;
function Pd() {
  return Tv || ((Tv = 1), (oc.exports = Id())), oc.exports;
}
var yc = { exports: {} },
  Bl = {};
var Ev;
function lm() {
  if (Ev) return Bl;
  Ev = 1;
  var A = dc();
  function Y(R) {
    var E = "https://react.dev/errors/" + R;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var I = 2; I < arguments.length; I++)
        E += "&args[]=" + encodeURIComponent(arguments[I]);
    }
    return (
      "Minified React error #" +
      R +
      "; visit " +
      E +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function _() {}
  var v = {
      d: {
        f: _,
        r: function () {
          throw Error(Y(522));
        },
        D: _,
        C: _,
        L: _,
        m: _,
        X: _,
        S: _,
        M: _,
      },
      p: 0,
      findDOMNode: null,
    },
    p = Symbol.for("react.portal");
  function U(R, E, I) {
    var q =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: p,
      key: q == null ? null : "" + q,
      children: R,
      containerInfo: E,
      implementation: I,
    };
  }
  var G = A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function k(R, E) {
    if (R === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (Bl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v),
    (Bl.createPortal = function (R, E) {
      var I =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11))
        throw Error(Y(299));
      return U(R, E, null, I);
    }),
    (Bl.flushSync = function (R) {
      var E = G.T,
        I = v.p;
      try {
        if (((G.T = null), (v.p = 2), R)) return R();
      } finally {
        (G.T = E), (v.p = I), v.d.f();
      }
    }),
    (Bl.preconnect = function (R, E) {
      typeof R == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E =
              typeof E == "string"
                ? E === "use-credentials"
                  ? E
                  : ""
                : void 0))
          : (E = null),
        v.d.C(R, E));
    }),
    (Bl.prefetchDNS = function (R) {
      typeof R == "string" && v.d.D(R);
    }),
    (Bl.preinit = function (R, E) {
      if (typeof R == "string" && E && typeof E.as == "string") {
        var I = E.as,
          q = k(I, E.crossOrigin),
          P = typeof E.integrity == "string" ? E.integrity : void 0,
          Yl = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        I === "style"
          ? v.d.S(R, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: q,
              integrity: P,
              fetchPriority: Yl,
            })
          : I === "script" &&
            v.d.X(R, {
              crossOrigin: q,
              integrity: P,
              fetchPriority: Yl,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (Bl.preinitModule = function (R, E) {
      if (typeof R == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var I = k(E.as, E.crossOrigin);
            v.d.M(R, {
              crossOrigin: I,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
          }
        } else E == null && v.d.M(R);
    }),
    (Bl.preload = function (R, E) {
      if (
        typeof R == "string" &&
        typeof E == "object" &&
        E !== null &&
        typeof E.as == "string"
      ) {
        var I = E.as,
          q = k(I, E.crossOrigin);
        v.d.L(R, I, {
          crossOrigin: q,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0,
          type: typeof E.type == "string" ? E.type : void 0,
          fetchPriority:
            typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          referrerPolicy:
            typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
          imageSrcSet:
            typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
          imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
          media: typeof E.media == "string" ? E.media : void 0,
        });
      }
    }),
    (Bl.preloadModule = function (R, E) {
      if (typeof R == "string")
        if (E) {
          var I = k(E.as, E.crossOrigin);
          v.d.m(R, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: I,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          });
        } else v.d.m(R);
    }),
    (Bl.requestFormReset = function (R) {
      v.d.r(R);
    }),
    (Bl.unstable_batchedUpdates = function (R, E) {
      return R(E);
    }),
    (Bl.useFormState = function (R, E, I) {
      return G.H.useFormState(R, E, I);
    }),
    (Bl.useFormStatus = function () {
      return G.H.useHostTransitionStatus();
    }),
    (Bl.version = "19.2.0"),
    Bl
  );
}
var Av;
function tm() {
  if (Av) return yc.exports;
  Av = 1;
  function A() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(A);
      } catch (Y) {
        console.error(Y);
      }
  }
  return A(), (yc.exports = lm()), yc.exports;
}
var _v;
function am() {
  if (_v) return Ee;
  _v = 1;
  var A = Pd(),
    Y = dc(),
    _ = tm();
  function v(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function p(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function U(l) {
    var t = l,
      a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do (t = l), (t.flags & 4098) !== 0 && (a = t.return), (l = t.return);
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function G(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function k(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function R(l) {
    if (U(l) !== l) throw Error(v(188));
  }
  function E(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = U(l)), t === null)) throw Error(v(188));
      return t !== l ? null : l;
    }
    for (var a = l, u = t; ; ) {
      var e = a.return;
      if (e === null) break;
      var n = e.alternate;
      if (n === null) {
        if (((u = e.return), u !== null)) {
          a = u;
          continue;
        }
        break;
      }
      if (e.child === n.child) {
        for (n = e.child; n; ) {
          if (n === a) return R(e), l;
          if (n === u) return R(e), t;
          n = n.sibling;
        }
        throw Error(v(188));
      }
      if (a.return !== u.return) (a = e), (u = n);
      else {
        for (var f = !1, i = e.child; i; ) {
          if (i === a) {
            (f = !0), (a = e), (u = n);
            break;
          }
          if (i === u) {
            (f = !0), (u = e), (a = n);
            break;
          }
          i = i.sibling;
        }
        if (!f) {
          for (i = n.child; i; ) {
            if (i === a) {
              (f = !0), (a = n), (u = e);
              break;
            }
            if (i === u) {
              (f = !0), (u = n), (a = e);
              break;
            }
            i = i.sibling;
          }
          if (!f) throw Error(v(189));
        }
      }
      if (a.alternate !== u) throw Error(v(190));
    }
    if (a.tag !== 3) throw Error(v(188));
    return a.stateNode.current === a ? l : t;
  }
  function I(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = I(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var q = Object.assign,
    P = Symbol.for("react.element"),
    Yl = Symbol.for("react.transitional.element"),
    pl = Symbol.for("react.portal"),
    jl = Symbol.for("react.fragment"),
    Ut = Symbol.for("react.strict_mode"),
    Fl = Symbol.for("react.profiler"),
    Ft = Symbol.for("react.consumer"),
    ql = Symbol.for("react.context"),
    it = Symbol.for("react.forward_ref"),
    Et = Symbol.for("react.suspense"),
    Xl = Symbol.for("react.suspense_list"),
    $ = Symbol.for("react.memo"),
    Ql = Symbol.for("react.lazy"),
    At = Symbol.for("react.activity"),
    Za = Symbol.for("react.memo_cache_sentinel"),
    _t = Symbol.iterator;
  function Zl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (_t && l[_t]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var Ea = Symbol.for("react.client.reference");
  function Nt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ea ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case jl:
        return "Fragment";
      case Fl:
        return "Profiler";
      case Ut:
        return "StrictMode";
      case Et:
        return "Suspense";
      case Xl:
        return "SuspenseList";
      case At:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case pl:
          return "Portal";
        case ql:
          return l.displayName || "Context";
        case Ft:
          return (l._context.displayName || "Context") + ".Consumer";
        case it:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case $:
          return (
            (t = l.displayName || null), t !== null ? t : Nt(l.type) || "Memo"
          );
        case Ql:
          (t = l._payload), (l = l._init);
          try {
            return Nt(l(t));
          } catch {}
      }
    return null;
  }
  var rt = Array.isArray,
    r = Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    O = _.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    j = { pending: !1, data: null, method: null, action: null },
    fl = [],
    ol = -1;
  function o(l) {
    return { current: l };
  }
  function T(l) {
    0 > ol || ((l.current = fl[ol]), (fl[ol] = null), ol--);
  }
  function M(l, t) {
    ol++, (fl[ol] = l.current), (l.current = t);
  }
  var N = o(null),
    Q = o(null),
    V = o(null),
    ul = o(null);
  function xl(l, t) {
    switch ((M(V, t), M(Q, l), M(N, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Go(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          (t = Go(t)), (l = Xo(t, l));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    T(N), M(N, l);
  }
  function Sl() {
    T(N), T(Q), T(V);
  }
  function Du(l) {
    l.memoizedState !== null && M(ul, l);
    var t = N.current,
      a = Xo(t, l.type);
    t !== a && (M(Q, l), M(N, a));
  }
  function Ae(l) {
    Q.current === l && (T(N), T(Q)),
      ul.current === l && (T(ul), (Se._currentValue = j));
  }
  var Zn, mc;
  function Aa(l) {
    if (Zn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (Zn = (t && t[1]) || ""),
          (mc =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Zn +
      l +
      mc
    );
  }
  var Ln = !1;
  function Vn(l, t) {
    if (!l || Ln) return "";
    Ln = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var u = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(z, []);
                } catch (g) {
                  var h = g;
                }
                Reflect.construct(l, [], z);
              } else {
                try {
                  z.call();
                } catch (g) {
                  h = g;
                }
                l.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                h = g;
              }
              (z = l()) &&
                typeof z.catch == "function" &&
                z.catch(function () {});
            }
          } catch (g) {
            if (g && h && typeof g.stack == "string") return [g.stack, h.stack];
          }
          return [null, null];
        },
      };
      u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var e = Object.getOwnPropertyDescriptor(
        u.DetermineComponentFrameRoot,
        "name"
      );
      e &&
        e.configurable &&
        Object.defineProperty(u.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = u.DetermineComponentFrameRoot(),
        f = n[0],
        i = n[1];
      if (f && i) {
        var c = f.split(`
`),
          m = i.split(`
`);
        for (
          e = u = 0;
          u < c.length && !c[u].includes("DetermineComponentFrameRoot");

        )
          u++;
        for (; e < m.length && !m[e].includes("DetermineComponentFrameRoot"); )
          e++;
        if (u === c.length || e === m.length)
          for (
            u = c.length - 1, e = m.length - 1;
            1 <= u && 0 <= e && c[u] !== m[e];

          )
            e--;
        for (; 1 <= u && 0 <= e; u--, e--)
          if (c[u] !== m[e]) {
            if (u !== 1 || e !== 1)
              do
                if ((u--, e--, 0 > e || c[u] !== m[e])) {
                  var S =
                    `
` + c[u].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      S.includes("<anonymous>") &&
                      (S = S.replace("<anonymous>", l.displayName)),
                    S
                  );
                }
              while (1 <= u && 0 <= e);
            break;
          }
      }
    } finally {
      (Ln = !1), (Error.prepareStackTrace = a);
    }
    return (a = l ? l.displayName || l.name : "") ? Aa(a) : "";
  }
  function Mv(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Aa(l.type);
      case 16:
        return Aa("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? Aa("Suspense Fallback")
          : Aa("Suspense");
      case 19:
        return Aa("SuspenseList");
      case 0:
      case 15:
        return Vn(l.type, !1);
      case 11:
        return Vn(l.type.render, !1);
      case 1:
        return Vn(l.type, !0);
      case 31:
        return Aa("Activity");
      default:
        return "";
    }
  }
  function hc(l) {
    try {
      var t = "",
        a = null;
      do (t += Mv(l, a)), (a = l), (l = l.return);
      while (l);
      return t;
    } catch (u) {
      return (
        `
Error generating stack: ` +
        u.message +
        `
` +
        u.stack
      );
    }
  }
  var Kn = Object.prototype.hasOwnProperty,
    Jn = A.unstable_scheduleCallback,
    wn = A.unstable_cancelCallback,
    pv = A.unstable_shouldYield,
    Dv = A.unstable_requestPaint,
    kl = A.unstable_now,
    Uv = A.unstable_getCurrentPriorityLevel,
    gc = A.unstable_ImmediatePriority,
    Sc = A.unstable_UserBlockingPriority,
    _e = A.unstable_NormalPriority,
    Nv = A.unstable_LowPriority,
    rc = A.unstable_IdlePriority,
    Hv = A.log,
    Rv = A.unstable_setDisableYieldValue,
    Uu = null,
    Il = null;
  function kt(l) {
    if (
      (typeof Hv == "function" && Rv(l),
      Il && typeof Il.setStrictMode == "function")
    )
      try {
        Il.setStrictMode(Uu, l);
      } catch {}
  }
  var Pl = Math.clz32 ? Math.clz32 : Bv,
    Cv = Math.log,
    qv = Math.LN2;
  function Bv(l) {
    return (l >>>= 0), l === 0 ? 32 : (31 - ((Cv(l) / qv) | 0)) | 0;
  }
  var Oe = 256,
    Me = 262144,
    pe = 4194304;
  function _a(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
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
        return 64;
      case 128:
        return 128;
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
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function De(l, t, a) {
    var u = l.pendingLanes;
    if (u === 0) return 0;
    var e = 0,
      n = l.suspendedLanes,
      f = l.pingedLanes;
    l = l.warmLanes;
    var i = u & 134217727;
    return (
      i !== 0
        ? ((u = i & ~n),
          u !== 0
            ? (e = _a(u))
            : ((f &= i),
              f !== 0
                ? (e = _a(f))
                : a || ((a = i & ~l), a !== 0 && (e = _a(a)))))
        : ((i = u & ~n),
          i !== 0
            ? (e = _a(i))
            : f !== 0
            ? (e = _a(f))
            : a || ((a = u & ~l), a !== 0 && (e = _a(a)))),
      e === 0
        ? 0
        : t !== 0 &&
          t !== e &&
          (t & n) === 0 &&
          ((n = e & -e),
          (a = t & -t),
          n >= a || (n === 32 && (a & 4194048) !== 0))
        ? t
        : e
    );
  }
  function Nu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Yv(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
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
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function bc() {
    var l = pe;
    return (pe <<= 1), (pe & 62914560) === 0 && (pe = 4194304), l;
  }
  function Wn(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Hu(l, t) {
    (l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0));
  }
  function jv(l, t, a, u, e, n) {
    var f = l.pendingLanes;
    (l.pendingLanes = a),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= a),
      (l.entangledLanes &= a),
      (l.errorRecoveryDisabledLanes &= a),
      (l.shellSuspendCounter = 0);
    var i = l.entanglements,
      c = l.expirationTimes,
      m = l.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var S = 31 - Pl(a),
        z = 1 << S;
      (i[S] = 0), (c[S] = -1);
      var h = m[S];
      if (h !== null)
        for (m[S] = null, S = 0; S < h.length; S++) {
          var g = h[S];
          g !== null && (g.lane &= -536870913);
        }
      a &= ~z;
    }
    u !== 0 && zc(l, u, 0),
      n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
  }
  function zc(l, t, a) {
    (l.pendingLanes |= t), (l.suspendedLanes &= ~t);
    var u = 31 - Pl(t);
    (l.entangledLanes |= t),
      (l.entanglements[u] = l.entanglements[u] | 1073741824 | (a & 261930));
  }
  function Tc(l, t) {
    var a = (l.entangledLanes |= t);
    for (l = l.entanglements; a; ) {
      var u = 31 - Pl(a),
        e = 1 << u;
      (e & t) | (l[u] & t) && (l[u] |= t), (a &= ~e);
    }
  }
  function Ec(l, t) {
    var a = t & -t;
    return (
      (a = (a & 42) !== 0 ? 1 : $n(a)),
      (a & (l.suspendedLanes | t)) !== 0 ? 0 : a
    );
  }
  function $n(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
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
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Fn(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Ac() {
    var l = O.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : sv(l.type));
  }
  function _c(l, t) {
    var a = O.p;
    try {
      return (O.p = l), t();
    } finally {
      O.p = a;
    }
  }
  var It = Math.random().toString(36).slice(2),
    Dl = "__reactFiber$" + It,
    Ll = "__reactProps$" + It,
    La = "__reactContainer$" + It,
    kn = "__reactEvents$" + It,
    xv = "__reactListeners$" + It,
    Gv = "__reactHandles$" + It,
    Oc = "__reactResources$" + It,
    Ru = "__reactMarker$" + It;
  function In(l) {
    delete l[Dl], delete l[Ll], delete l[kn], delete l[xv], delete l[Gv];
  }
  function Va(l) {
    var t = l[Dl];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if ((t = a[La] || a[Dl])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (l = wo(l); l !== null; ) {
            if ((a = l[Dl])) return a;
            l = wo(l);
          }
        return t;
      }
      (l = a), (a = l.parentNode);
    }
    return null;
  }
  function Ka(l) {
    if ((l = l[Dl] || l[La])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function Cu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(v(33));
  }
  function Ja(l) {
    var t = l[Oc];
    return (
      t ||
        (t = l[Oc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Ol(l) {
    l[Ru] = !0;
  }
  var Mc = new Set(),
    pc = {};
  function Oa(l, t) {
    wa(l, t), wa(l + "Capture", t);
  }
  function wa(l, t) {
    for (pc[l] = t, l = 0; l < t.length; l++) Mc.add(t[l]);
  }
  var Xv = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Dc = {},
    Uc = {};
  function Qv(l) {
    return Kn.call(Uc, l)
      ? !0
      : Kn.call(Dc, l)
      ? !1
      : Xv.test(l)
      ? (Uc[l] = !0)
      : ((Dc[l] = !0), !1);
  }
  function Ue(l, t, a) {
    if (Qv(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var u = t.toLowerCase().slice(0, 5);
            if (u !== "data-" && u !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function Ne(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function Ht(l, t, a, u) {
    if (u === null) l.removeAttribute(a);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + u);
    }
  }
  function ct(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Nc(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Zv(l, t, a) {
    var u = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof u < "u" &&
      typeof u.get == "function" &&
      typeof u.set == "function"
    ) {
      var e = u.get,
        n = u.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return e.call(this);
          },
          set: function (f) {
            (a = "" + f), n.call(this, f);
          },
        }),
        Object.defineProperty(l, t, { enumerable: u.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = "" + f;
          },
          stopTracking: function () {
            (l._valueTracker = null), delete l[t];
          },
        }
      );
    }
  }
  function Pn(l) {
    if (!l._valueTracker) {
      var t = Nc(l) ? "checked" : "value";
      l._valueTracker = Zv(l, t, "" + l[t]);
    }
  }
  function Hc(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      u = "";
    return (
      l && (u = Nc(l) ? (l.checked ? "true" : "false") : l.value),
      (l = u),
      l !== a ? (t.setValue(l), !0) : !1
    );
  }
  function He(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Lv = /[\n"\\]/g;
  function st(l) {
    return l.replace(Lv, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function lf(l, t, a, u, e, n, f, i) {
    (l.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (l.type = f)
        : l.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + ct(t))
          : l.value !== "" + ct(t) && (l.value = "" + ct(t))
        : (f !== "submit" && f !== "reset") || l.removeAttribute("value"),
      t != null
        ? tf(l, f, ct(t))
        : a != null
        ? tf(l, f, ct(a))
        : u != null && l.removeAttribute("value"),
      e == null && n != null && (l.defaultChecked = !!n),
      e != null &&
        (l.checked = e && typeof e != "function" && typeof e != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.name = "" + ct(i))
        : l.removeAttribute("name");
  }
  function Rc(l, t, a, u, e, n, f, i) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || a != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) {
        Pn(l);
        return;
      }
      (a = a != null ? "" + ct(a) : ""),
        (t = t != null ? "" + ct(t) : a),
        i || t === l.value || (l.value = t),
        (l.defaultValue = t);
    }
    (u = u ?? e),
      (u = typeof u != "function" && typeof u != "symbol" && !!u),
      (l.checked = i ? l.checked : !!u),
      (l.defaultChecked = !!u),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (l.name = f),
      Pn(l);
  }
  function tf(l, t, a) {
    (t === "number" && He(l.ownerDocument) === l) ||
      l.defaultValue === "" + a ||
      (l.defaultValue = "" + a);
  }
  function Wa(l, t, a, u) {
    if (((l = l.options), t)) {
      t = {};
      for (var e = 0; e < a.length; e++) t["$" + a[e]] = !0;
      for (a = 0; a < l.length; a++)
        (e = t.hasOwnProperty("$" + l[a].value)),
          l[a].selected !== e && (l[a].selected = e),
          e && u && (l[a].defaultSelected = !0);
    } else {
      for (a = "" + ct(a), t = null, e = 0; e < l.length; e++) {
        if (l[e].value === a) {
          (l[e].selected = !0), u && (l[e].defaultSelected = !0);
          return;
        }
        t !== null || l[e].disabled || (t = l[e]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Cc(l, t, a) {
    if (
      t != null &&
      ((t = "" + ct(t)), t !== l.value && (l.value = t), a == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + ct(a) : "";
  }
  function qc(l, t, a, u) {
    if (t == null) {
      if (u != null) {
        if (a != null) throw Error(v(92));
        if (rt(u)) {
          if (1 < u.length) throw Error(v(93));
          u = u[0];
        }
        a = u;
      }
      a == null && (a = ""), (t = a);
    }
    (a = ct(t)),
      (l.defaultValue = a),
      (u = l.textContent),
      u === a && u !== "" && u !== null && (l.value = u),
      Pn(l);
  }
  function $a(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Vv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bc(l, t, a) {
    var u = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? u
        ? l.setProperty(t, "")
        : t === "float"
        ? (l.cssFloat = "")
        : (l[t] = "")
      : u
      ? l.setProperty(t, a)
      : typeof a != "number" || a === 0 || Vv.has(t)
      ? t === "float"
        ? (l.cssFloat = a)
        : (l[t] = ("" + a).trim())
      : (l[t] = a + "px");
  }
  function Yc(l, t, a) {
    if (t != null && typeof t != "object") throw Error(v(62));
    if (((l = l.style), a != null)) {
      for (var u in a)
        !a.hasOwnProperty(u) ||
          (t != null && t.hasOwnProperty(u)) ||
          (u.indexOf("--") === 0
            ? l.setProperty(u, "")
            : u === "float"
            ? (l.cssFloat = "")
            : (l[u] = ""));
      for (var e in t)
        (u = t[e]), t.hasOwnProperty(e) && a[e] !== u && Bc(l, e, u);
    } else for (var n in t) t.hasOwnProperty(n) && Bc(l, n, t[n]);
  }
  function af(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
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
  var Kv = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Jv =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Re(l) {
    return Jv.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function Rt() {}
  var uf = null;
  function ef(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var Fa = null,
    ka = null;
  function jc(l) {
    var t = Ka(l);
    if (t && (l = t.stateNode)) {
      var a = l[Ll] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (lf(
              l,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + st("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var u = a[t];
              if (u !== l && u.form === l.form) {
                var e = u[Ll] || null;
                if (!e) throw Error(v(90));
                lf(
                  u,
                  e.value,
                  e.defaultValue,
                  e.defaultValue,
                  e.checked,
                  e.defaultChecked,
                  e.type,
                  e.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (u = a[t]), u.form === l.form && Hc(u);
          }
          break l;
        case "textarea":
          Cc(l, a.value, a.defaultValue);
          break l;
        case "select":
          (t = a.value), t != null && Wa(l, !!a.multiple, t, !1);
      }
    }
  }
  var nf = !1;
  function xc(l, t, a) {
    if (nf) return l(t, a);
    nf = !0;
    try {
      var u = l(t);
      return u;
    } finally {
      if (
        ((nf = !1),
        (Fa !== null || ka !== null) &&
          (zn(), Fa && ((t = Fa), (l = ka), (ka = Fa = null), jc(t), l)))
      )
        for (t = 0; t < l.length; t++) jc(l[t]);
    }
  }
  function qu(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var u = a[Ll] || null;
    if (u === null) return null;
    a = u[t];
    l: switch (t) {
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
        (u = !u.disabled) ||
          ((l = l.type),
          (u = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !u);
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function") throw Error(v(231, t, typeof a));
    return a;
  }
  var Ct = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    ff = !1;
  if (Ct)
    try {
      var Bu = {};
      Object.defineProperty(Bu, "passive", {
        get: function () {
          ff = !0;
        },
      }),
        window.addEventListener("test", Bu, Bu),
        window.removeEventListener("test", Bu, Bu);
    } catch {
      ff = !1;
    }
  var Pt = null,
    cf = null,
    Ce = null;
  function Gc() {
    if (Ce) return Ce;
    var l,
      t = cf,
      a = t.length,
      u,
      e = "value" in Pt ? Pt.value : Pt.textContent,
      n = e.length;
    for (l = 0; l < a && t[l] === e[l]; l++);
    var f = a - l;
    for (u = 1; u <= f && t[a - u] === e[n - u]; u++);
    return (Ce = e.slice(l, 1 < u ? 1 - u : void 0));
  }
  function qe(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Be() {
    return !0;
  }
  function Xc() {
    return !1;
  }
  function Vl(l) {
    function t(a, u, e, n, f) {
      (this._reactName = a),
        (this._targetInst = e),
        (this.type = u),
        (this.nativeEvent = n),
        (this.target = f),
        (this.currentTarget = null);
      for (var i in l)
        l.hasOwnProperty(i) && ((a = l[i]), (this[i] = a ? a(n) : n[i]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Be
          : Xc),
        (this.isPropagationStopped = Xc),
        this
      );
    }
    return (
      q(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Be));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Be));
        },
        persist: function () {},
        isPersistent: Be,
      }),
      t
    );
  }
  var Ma = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ye = Vl(Ma),
    Yu = q({}, Ma, { view: 0, detail: 0 }),
    wv = Vl(Yu),
    sf,
    of,
    ju,
    je = q({}, Yu, {
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
      getModifierState: yf,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== ju &&
              (ju && l.type === "mousemove"
                ? ((sf = l.screenX - ju.screenX), (of = l.screenY - ju.screenY))
                : (of = sf = 0),
              (ju = l)),
            sf);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : of;
      },
    }),
    Qc = Vl(je),
    Wv = q({}, je, { dataTransfer: 0 }),
    $v = Vl(Wv),
    Fv = q({}, Yu, { relatedTarget: 0 }),
    vf = Vl(Fv),
    kv = q({}, Ma, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Iv = Vl(kv),
    Pv = q({}, Ma, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    ly = Vl(Pv),
    ty = q({}, Ma, { data: 0 }),
    Zc = Vl(ty),
    ay = {
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
    uy = {
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
    ey = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ny(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = ey[l])
      ? !!t[l]
      : !1;
  }
  function yf() {
    return ny;
  }
  var fy = q({}, Yu, {
      key: function (l) {
        if (l.key) {
          var t = ay[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = qe(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
          ? uy[l.keyCode] || "Unidentified"
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
      getModifierState: yf,
      charCode: function (l) {
        return l.type === "keypress" ? qe(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? qe(l)
          : l.type === "keydown" || l.type === "keyup"
          ? l.keyCode
          : 0;
      },
    }),
    iy = Vl(fy),
    cy = q({}, je, {
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
    Lc = Vl(cy),
    sy = q({}, Yu, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yf,
    }),
    oy = Vl(sy),
    vy = q({}, Ma, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    yy = Vl(vy),
    dy = q({}, je, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
          ? -l.wheelDeltaX
          : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
          ? -l.wheelDeltaY
          : "wheelDelta" in l
          ? -l.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    my = Vl(dy),
    hy = q({}, Ma, { newState: 0, oldState: 0 }),
    gy = Vl(hy),
    Sy = [9, 13, 27, 32],
    df = Ct && "CompositionEvent" in window,
    xu = null;
  Ct && "documentMode" in document && (xu = document.documentMode);
  var ry = Ct && "TextEvent" in window && !xu,
    Vc = Ct && (!df || (xu && 8 < xu && 11 >= xu)),
    Kc = " ",
    Jc = !1;
  function wc(l, t) {
    switch (l) {
      case "keyup":
        return Sy.indexOf(t.keyCode) !== -1;
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
  function Wc(l) {
    return (l = l.detail), typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ia = !1;
  function by(l, t) {
    switch (l) {
      case "compositionend":
        return Wc(t);
      case "keypress":
        return t.which !== 32 ? null : ((Jc = !0), Kc);
      case "textInput":
        return (l = t.data), l === Kc && Jc ? null : l;
      default:
        return null;
    }
  }
  function zy(l, t) {
    if (Ia)
      return l === "compositionend" || (!df && wc(l, t))
        ? ((l = Gc()), (Ce = cf = Pt = null), (Ia = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Vc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ty = {
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
  function $c(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Ty[l.type] : t === "textarea";
  }
  function Fc(l, t, a, u) {
    Fa ? (ka ? ka.push(u) : (ka = [u])) : (Fa = u),
      (t = pn(t, "onChange")),
      0 < t.length &&
        ((a = new Ye("onChange", "change", null, a, u)),
        l.push({ event: a, listeners: t }));
  }
  var Gu = null,
    Xu = null;
  function Ey(l) {
    Co(l, 0);
  }
  function xe(l) {
    var t = Cu(l);
    if (Hc(t)) return l;
  }
  function kc(l, t) {
    if (l === "change") return t;
  }
  var Ic = !1;
  if (Ct) {
    var mf;
    if (Ct) {
      var hf = "oninput" in document;
      if (!hf) {
        var Pc = document.createElement("div");
        Pc.setAttribute("oninput", "return;"),
          (hf = typeof Pc.oninput == "function");
      }
      mf = hf;
    } else mf = !1;
    Ic = mf && (!document.documentMode || 9 < document.documentMode);
  }
  function l0() {
    Gu && (Gu.detachEvent("onpropertychange", t0), (Xu = Gu = null));
  }
  function t0(l) {
    if (l.propertyName === "value" && xe(Xu)) {
      var t = [];
      Fc(t, Xu, l, ef(l)), xc(Ey, t);
    }
  }
  function Ay(l, t, a) {
    l === "focusin"
      ? (l0(), (Gu = t), (Xu = a), Gu.attachEvent("onpropertychange", t0))
      : l === "focusout" && l0();
  }
  function _y(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return xe(Xu);
  }
  function Oy(l, t) {
    if (l === "click") return xe(t);
  }
  function My(l, t) {
    if (l === "input" || l === "change") return xe(t);
  }
  function py(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var lt = typeof Object.is == "function" ? Object.is : py;
  function Qu(l, t) {
    if (lt(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(l),
      u = Object.keys(t);
    if (a.length !== u.length) return !1;
    for (u = 0; u < a.length; u++) {
      var e = a[u];
      if (!Kn.call(t, e) || !lt(l[e], t[e])) return !1;
    }
    return !0;
  }
  function a0(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function u0(l, t) {
    var a = a0(l);
    l = 0;
    for (var u; a; ) {
      if (a.nodeType === 3) {
        if (((u = l + a.textContent.length), l <= t && u >= t))
          return { node: a, offset: t - l };
        l = u;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = a0(a);
    }
  }
  function e0(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? e0(l, t.parentNode)
        : "contains" in l
        ? l.contains(t)
        : l.compareDocumentPosition
        ? !!(l.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function n0(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = He(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = He(l.document);
    }
    return t;
  }
  function gf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var Dy = Ct && "documentMode" in document && 11 >= document.documentMode,
    Pa = null,
    Sf = null,
    Zu = null,
    rf = !1;
  function f0(l, t, a) {
    var u =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    rf ||
      Pa == null ||
      Pa !== He(u) ||
      ((u = Pa),
      "selectionStart" in u && gf(u)
        ? (u = { start: u.selectionStart, end: u.selectionEnd })
        : ((u = (
            (u.ownerDocument && u.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (u = {
            anchorNode: u.anchorNode,
            anchorOffset: u.anchorOffset,
            focusNode: u.focusNode,
            focusOffset: u.focusOffset,
          })),
      (Zu && Qu(Zu, u)) ||
        ((Zu = u),
        (u = pn(Sf, "onSelect")),
        0 < u.length &&
          ((t = new Ye("onSelect", "select", null, t, a)),
          l.push({ event: t, listeners: u }),
          (t.target = Pa))));
  }
  function pa(l, t) {
    var a = {};
    return (
      (a[l.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + l] = "webkit" + t),
      (a["Moz" + l] = "moz" + t),
      a
    );
  }
  var lu = {
      animationend: pa("Animation", "AnimationEnd"),
      animationiteration: pa("Animation", "AnimationIteration"),
      animationstart: pa("Animation", "AnimationStart"),
      transitionrun: pa("Transition", "TransitionRun"),
      transitionstart: pa("Transition", "TransitionStart"),
      transitioncancel: pa("Transition", "TransitionCancel"),
      transitionend: pa("Transition", "TransitionEnd"),
    },
    bf = {},
    i0 = {};
  Ct &&
    ((i0 = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete lu.animationend.animation,
      delete lu.animationiteration.animation,
      delete lu.animationstart.animation),
    "TransitionEvent" in window || delete lu.transitionend.transition);
  function Da(l) {
    if (bf[l]) return bf[l];
    if (!lu[l]) return l;
    var t = lu[l],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in i0) return (bf[l] = t[a]);
    return l;
  }
  var c0 = Da("animationend"),
    s0 = Da("animationiteration"),
    o0 = Da("animationstart"),
    Uy = Da("transitionrun"),
    Ny = Da("transitionstart"),
    Hy = Da("transitioncancel"),
    v0 = Da("transitionend"),
    y0 = new Map(),
    zf =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  zf.push("scrollEnd");
  function bt(l, t) {
    y0.set(l, t), Oa(t, [l]);
  }
  var Ge =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    ot = [],
    tu = 0,
    Tf = 0;
  function Xe() {
    for (var l = tu, t = (Tf = tu = 0); t < l; ) {
      var a = ot[t];
      ot[t++] = null;
      var u = ot[t];
      ot[t++] = null;
      var e = ot[t];
      ot[t++] = null;
      var n = ot[t];
      if (((ot[t++] = null), u !== null && e !== null)) {
        var f = u.pending;
        f === null ? (e.next = e) : ((e.next = f.next), (f.next = e)),
          (u.pending = e);
      }
      n !== 0 && d0(a, e, n);
    }
  }
  function Qe(l, t, a, u) {
    (ot[tu++] = l),
      (ot[tu++] = t),
      (ot[tu++] = a),
      (ot[tu++] = u),
      (Tf |= u),
      (l.lanes |= u),
      (l = l.alternate),
      l !== null && (l.lanes |= u);
  }
  function Ef(l, t, a, u) {
    return Qe(l, t, a, u), Ze(l);
  }
  function Ua(l, t) {
    return Qe(l, null, null, t), Ze(l);
  }
  function d0(l, t, a) {
    l.lanes |= a;
    var u = l.alternate;
    u !== null && (u.lanes |= a);
    for (var e = !1, n = l.return; n !== null; )
      (n.childLanes |= a),
        (u = n.alternate),
        u !== null && (u.childLanes |= a),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (e = !0)),
        (l = n),
        (n = n.return);
    return l.tag === 3
      ? ((n = l.stateNode),
        e &&
          t !== null &&
          ((e = 31 - Pl(a)),
          (l = n.hiddenUpdates),
          (u = l[e]),
          u === null ? (l[e] = [t]) : u.push(t),
          (t.lane = a | 536870912)),
        n)
      : null;
  }
  function Ze(l) {
    if (50 < oe) throw ((oe = 0), (Hi = null), Error(v(185)));
    for (var t = l.return; t !== null; ) (l = t), (t = l.return);
    return l.tag === 3 ? l.stateNode : null;
  }
  var au = {};
  function Ry(l, t, a, u) {
    (this.tag = l),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = u),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function tt(l, t, a, u) {
    return new Ry(l, t, a, u);
  }
  function Af(l) {
    return (l = l.prototype), !(!l || !l.isReactComponent);
  }
  function qt(l, t) {
    var a = l.alternate;
    return (
      a === null
        ? ((a = tt(l.tag, t, l.key, l.mode)),
          (a.elementType = l.elementType),
          (a.type = l.type),
          (a.stateNode = l.stateNode),
          (a.alternate = l),
          (l.alternate = a))
        : ((a.pendingProps = t),
          (a.type = l.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = l.flags & 65011712),
      (a.childLanes = l.childLanes),
      (a.lanes = l.lanes),
      (a.child = l.child),
      (a.memoizedProps = l.memoizedProps),
      (a.memoizedState = l.memoizedState),
      (a.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = l.sibling),
      (a.index = l.index),
      (a.ref = l.ref),
      (a.refCleanup = l.refCleanup),
      a
    );
  }
  function m0(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return (
      a === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = a.childLanes),
          (l.lanes = a.lanes),
          (l.child = a.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = a.memoizedProps),
          (l.memoizedState = a.memoizedState),
          (l.updateQueue = a.updateQueue),
          (l.type = a.type),
          (t = a.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Le(l, t, a, u, e, n) {
    var f = 0;
    if (((u = l), typeof l == "function")) Af(l) && (f = 1);
    else if (typeof l == "string")
      f = jd(l, a, N.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
        ? 27
        : 5;
    else
      l: switch (l) {
        case At:
          return (l = tt(31, a, t, e)), (l.elementType = At), (l.lanes = n), l;
        case jl:
          return Na(a.children, e, n, t);
        case Ut:
          (f = 8), (e |= 24);
          break;
        case Fl:
          return (
            (l = tt(12, a, t, e | 2)), (l.elementType = Fl), (l.lanes = n), l
          );
        case Et:
          return (l = tt(13, a, t, e)), (l.elementType = Et), (l.lanes = n), l;
        case Xl:
          return (l = tt(19, a, t, e)), (l.elementType = Xl), (l.lanes = n), l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case ql:
                f = 10;
                break l;
              case Ft:
                f = 9;
                break l;
              case it:
                f = 11;
                break l;
              case $:
                f = 14;
                break l;
              case Ql:
                (f = 16), (u = null);
                break l;
            }
          (f = 29),
            (a = Error(v(130, l === null ? "null" : typeof l, ""))),
            (u = null);
      }
    return (
      (t = tt(f, a, t, e)), (t.elementType = l), (t.type = u), (t.lanes = n), t
    );
  }
  function Na(l, t, a, u) {
    return (l = tt(7, l, u, t)), (l.lanes = a), l;
  }
  function _f(l, t, a) {
    return (l = tt(6, l, null, t)), (l.lanes = a), l;
  }
  function h0(l) {
    var t = tt(18, null, null, 0);
    return (t.stateNode = l), t;
  }
  function Of(l, t, a) {
    return (
      (t = tt(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var g0 = new WeakMap();
  function vt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = g0.get(l);
      return a !== void 0
        ? a
        : ((t = { value: l, source: t, stack: hc(t) }), g0.set(l, t), t);
    }
    return { value: l, source: t, stack: hc(t) };
  }
  var uu = [],
    eu = 0,
    Ve = null,
    Lu = 0,
    yt = [],
    dt = 0,
    la = null,
    Ot = 1,
    Mt = "";
  function Bt(l, t) {
    (uu[eu++] = Lu), (uu[eu++] = Ve), (Ve = l), (Lu = t);
  }
  function S0(l, t, a) {
    (yt[dt++] = Ot), (yt[dt++] = Mt), (yt[dt++] = la), (la = l);
    var u = Ot;
    l = Mt;
    var e = 32 - Pl(u) - 1;
    (u &= ~(1 << e)), (a += 1);
    var n = 32 - Pl(t) + e;
    if (30 < n) {
      var f = e - (e % 5);
      (n = (u & ((1 << f) - 1)).toString(32)),
        (u >>= f),
        (e -= f),
        (Ot = (1 << (32 - Pl(t) + e)) | (a << e) | u),
        (Mt = n + l);
    } else (Ot = (1 << n) | (a << e) | u), (Mt = l);
  }
  function Mf(l) {
    l.return !== null && (Bt(l, 1), S0(l, 1, 0));
  }
  function pf(l) {
    for (; l === Ve; )
      (Ve = uu[--eu]), (uu[eu] = null), (Lu = uu[--eu]), (uu[eu] = null);
    for (; l === la; )
      (la = yt[--dt]),
        (yt[dt] = null),
        (Mt = yt[--dt]),
        (yt[dt] = null),
        (Ot = yt[--dt]),
        (yt[dt] = null);
  }
  function r0(l, t) {
    (yt[dt++] = Ot),
      (yt[dt++] = Mt),
      (yt[dt++] = la),
      (Ot = t.id),
      (Mt = t.overflow),
      (la = l);
  }
  var Ul = null,
    yl = null,
    F = !1,
    ta = null,
    mt = !1,
    Df = Error(v(519));
  function aa(l) {
    var t = Error(
      v(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Vu(vt(t, l)), Df);
  }
  function b0(l) {
    var t = l.stateNode,
      a = l.type,
      u = l.memoizedProps;
    switch (((t[Dl] = l), (t[Ll] = u), a)) {
      case "dialog":
        J("cancel", t), J("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        J("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ye.length; a++) J(ye[a], t);
        break;
      case "source":
        J("error", t);
        break;
      case "img":
      case "image":
      case "link":
        J("error", t), J("load", t);
        break;
      case "details":
        J("toggle", t);
        break;
      case "input":
        J("invalid", t),
          Rc(
            t,
            u.value,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name,
            !0
          );
        break;
      case "select":
        J("invalid", t);
        break;
      case "textarea":
        J("invalid", t), qc(t, u.value, u.defaultValue, u.children);
    }
    (a = u.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      u.suppressHydrationWarning === !0 ||
      jo(t.textContent, a)
        ? (u.popover != null && (J("beforetoggle", t), J("toggle", t)),
          u.onScroll != null && J("scroll", t),
          u.onScrollEnd != null && J("scrollend", t),
          u.onClick != null && (t.onclick = Rt),
          (t = !0))
        : (t = !1),
      t || aa(l, !0);
  }
  function z0(l) {
    for (Ul = l.return; Ul; )
      switch (Ul.tag) {
        case 5:
        case 31:
        case 13:
          mt = !1;
          return;
        case 27:
        case 3:
          mt = !0;
          return;
        default:
          Ul = Ul.return;
      }
  }
  function nu(l) {
    if (l !== Ul) return !1;
    if (!F) return z0(l), (F = !0), !1;
    var t = l.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = l.type),
          (a =
            !(a !== "form" && a !== "button") || Ji(l.type, l.memoizedProps))),
        (a = !a)),
      a && yl && aa(l),
      z0(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(v(317));
      yl = Jo(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(v(317));
      yl = Jo(l);
    } else
      t === 27
        ? ((t = yl), ga(l.type) ? ((l = ki), (ki = null), (yl = l)) : (yl = t))
        : (yl = Ul ? gt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function Ha() {
    (yl = Ul = null), (F = !1);
  }
  function Uf() {
    var l = ta;
    return (
      l !== null &&
        (Wl === null ? (Wl = l) : Wl.push.apply(Wl, l), (ta = null)),
      l
    );
  }
  function Vu(l) {
    ta === null ? (ta = [l]) : ta.push(l);
  }
  var Nf = o(null),
    Ra = null,
    Yt = null;
  function ua(l, t, a) {
    M(Nf, t._currentValue), (t._currentValue = a);
  }
  function jt(l) {
    (l._currentValue = Nf.current), T(Nf);
  }
  function Hf(l, t, a) {
    for (; l !== null; ) {
      var u = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), u !== null && (u.childLanes |= t))
          : u !== null && (u.childLanes & t) !== t && (u.childLanes |= t),
        l === a)
      )
        break;
      l = l.return;
    }
  }
  function Rf(l, t, a, u) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null; ) {
      var n = e.dependencies;
      if (n !== null) {
        var f = e.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = e;
          for (var c = 0; c < t.length; c++)
            if (i.context === t[c]) {
              (n.lanes |= a),
                (i = n.alternate),
                i !== null && (i.lanes |= a),
                Hf(n.return, a, l),
                u || (f = null);
              break l;
            }
          n = i.next;
        }
      } else if (e.tag === 18) {
        if (((f = e.return), f === null)) throw Error(v(341));
        (f.lanes |= a),
          (n = f.alternate),
          n !== null && (n.lanes |= a),
          Hf(f, a, l),
          (f = null);
      } else f = e.child;
      if (f !== null) f.return = e;
      else
        for (f = e; f !== null; ) {
          if (f === l) {
            f = null;
            break;
          }
          if (((e = f.sibling), e !== null)) {
            (e.return = f.return), (f = e);
            break;
          }
          f = f.return;
        }
      e = f;
    }
  }
  function fu(l, t, a, u) {
    l = null;
    for (var e = t, n = !1; e !== null; ) {
      if (!n) {
        if ((e.flags & 524288) !== 0) n = !0;
        else if ((e.flags & 262144) !== 0) break;
      }
      if (e.tag === 10) {
        var f = e.alternate;
        if (f === null) throw Error(v(387));
        if (((f = f.memoizedProps), f !== null)) {
          var i = e.type;
          lt(e.pendingProps.value, f.value) ||
            (l !== null ? l.push(i) : (l = [i]));
        }
      } else if (e === ul.current) {
        if (((f = e.alternate), f === null)) throw Error(v(387));
        f.memoizedState.memoizedState !== e.memoizedState.memoizedState &&
          (l !== null ? l.push(Se) : (l = [Se]));
      }
      e = e.return;
    }
    l !== null && Rf(t, l, a, u), (t.flags |= 262144);
  }
  function Ke(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!lt(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function Ca(l) {
    (Ra = l),
      (Yt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null);
  }
  function Nl(l) {
    return T0(Ra, l);
  }
  function Je(l, t) {
    return Ra === null && Ca(l), T0(l, t);
  }
  function T0(l, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Yt === null)) {
      if (l === null) throw Error(v(308));
      (Yt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288);
    } else Yt = Yt.next = t;
    return a;
  }
  var Cy =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, u) {
                  l.push(u);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                l.forEach(function (a) {
                  return a();
                });
            };
          },
    qy = A.unstable_scheduleCallback,
    By = A.unstable_NormalPriority,
    zl = {
      $$typeof: ql,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Cf() {
    return { controller: new Cy(), data: new Map(), refCount: 0 };
  }
  function Ku(l) {
    l.refCount--,
      l.refCount === 0 &&
        qy(By, function () {
          l.controller.abort();
        });
  }
  var Ju = null,
    qf = 0,
    iu = 0,
    cu = null;
  function Yy(l, t) {
    if (Ju === null) {
      var a = (Ju = []);
      (qf = 0),
        (iu = ji()),
        (cu = {
          status: "pending",
          value: void 0,
          then: function (u) {
            a.push(u);
          },
        });
    }
    return qf++, t.then(E0, E0), t;
  }
  function E0() {
    if (--qf === 0 && Ju !== null) {
      cu !== null && (cu.status = "fulfilled");
      var l = Ju;
      (Ju = null), (iu = 0), (cu = null);
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function jy(l, t) {
    var a = [],
      u = {
        status: "pending",
        value: null,
        reason: null,
        then: function (e) {
          a.push(e);
        },
      };
    return (
      l.then(
        function () {
          (u.status = "fulfilled"), (u.value = t);
          for (var e = 0; e < a.length; e++) (0, a[e])(t);
        },
        function (e) {
          for (u.status = "rejected", u.reason = e, e = 0; e < a.length; e++)
            (0, a[e])(void 0);
        }
      ),
      u
    );
  }
  var A0 = r.S;
  r.S = function (l, t) {
    (fo = kl()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Yy(l, t),
      A0 !== null && A0(l, t);
  };
  var qa = o(null);
  function Bf() {
    var l = qa.current;
    return l !== null ? l : vl.pooledCache;
  }
  function we(l, t) {
    t === null ? M(qa, qa.current) : M(qa, t.pool);
  }
  function _0() {
    var l = Bf();
    return l === null ? null : { parent: zl._currentValue, pool: l };
  }
  var su = Error(v(460)),
    Yf = Error(v(474)),
    We = Error(v(542)),
    $e = { then: function () {} };
  function O0(l) {
    return (l = l.status), l === "fulfilled" || l === "rejected";
  }
  function M0(l, t, a) {
    switch (
      ((a = l[a]),
      a === void 0 ? l.push(t) : a !== t && (t.then(Rt, Rt), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), D0(l), l);
      default:
        if (typeof t.status == "string") t.then(Rt, Rt);
        else {
          if (((l = vl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(v(482));
          (l = t),
            (l.status = "pending"),
            l.then(
              function (u) {
                if (t.status === "pending") {
                  var e = t;
                  (e.status = "fulfilled"), (e.value = u);
                }
              },
              function (u) {
                if (t.status === "pending") {
                  var e = t;
                  (e.status = "rejected"), (e.reason = u);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), D0(l), l);
        }
        throw ((Ya = t), su);
    }
  }
  function Ba(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((Ya = a), su)
        : a;
    }
  }
  var Ya = null;
  function p0() {
    if (Ya === null) throw Error(v(459));
    var l = Ya;
    return (Ya = null), l;
  }
  function D0(l) {
    if (l === su || l === We) throw Error(v(483));
  }
  var ou = null,
    wu = 0;
  function Fe(l) {
    var t = wu;
    return (wu += 1), ou === null && (ou = []), M0(ou, l, t);
  }
  function Wu(l, t) {
    (t = t.props.ref), (l.ref = t !== void 0 ? t : null);
  }
  function ke(l, t) {
    throw t.$$typeof === P
      ? Error(v(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          v(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l
          )
        ));
  }
  function U0(l) {
    function t(y, s) {
      if (l) {
        var d = y.deletions;
        d === null ? ((y.deletions = [s]), (y.flags |= 16)) : d.push(s);
      }
    }
    function a(y, s) {
      if (!l) return null;
      for (; s !== null; ) t(y, s), (s = s.sibling);
      return null;
    }
    function u(y) {
      for (var s = new Map(); y !== null; )
        y.key !== null ? s.set(y.key, y) : s.set(y.index, y), (y = y.sibling);
      return s;
    }
    function e(y, s) {
      return (y = qt(y, s)), (y.index = 0), (y.sibling = null), y;
    }
    function n(y, s, d) {
      return (
        (y.index = d),
        l
          ? ((d = y.alternate),
            d !== null
              ? ((d = d.index), d < s ? ((y.flags |= 67108866), s) : d)
              : ((y.flags |= 67108866), s))
          : ((y.flags |= 1048576), s)
      );
    }
    function f(y) {
      return l && y.alternate === null && (y.flags |= 67108866), y;
    }
    function i(y, s, d, b) {
      return s === null || s.tag !== 6
        ? ((s = _f(d, y.mode, b)), (s.return = y), s)
        : ((s = e(s, d)), (s.return = y), s);
    }
    function c(y, s, d, b) {
      var C = d.type;
      return C === jl
        ? S(y, s, d.props.children, b, d.key)
        : s !== null &&
          (s.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === Ql &&
              Ba(C) === s.type))
        ? ((s = e(s, d.props)), Wu(s, d), (s.return = y), s)
        : ((s = Le(d.type, d.key, d.props, null, y.mode, b)),
          Wu(s, d),
          (s.return = y),
          s);
    }
    function m(y, s, d, b) {
      return s === null ||
        s.tag !== 4 ||
        s.stateNode.containerInfo !== d.containerInfo ||
        s.stateNode.implementation !== d.implementation
        ? ((s = Of(d, y.mode, b)), (s.return = y), s)
        : ((s = e(s, d.children || [])), (s.return = y), s);
    }
    function S(y, s, d, b, C) {
      return s === null || s.tag !== 7
        ? ((s = Na(d, y.mode, b, C)), (s.return = y), s)
        : ((s = e(s, d)), (s.return = y), s);
    }
    function z(y, s, d) {
      if (
        (typeof s == "string" && s !== "") ||
        typeof s == "number" ||
        typeof s == "bigint"
      )
        return (s = _f("" + s, y.mode, d)), (s.return = y), s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case Yl:
            return (
              (d = Le(s.type, s.key, s.props, null, y.mode, d)),
              Wu(d, s),
              (d.return = y),
              d
            );
          case pl:
            return (s = Of(s, y.mode, d)), (s.return = y), s;
          case Ql:
            return (s = Ba(s)), z(y, s, d);
        }
        if (rt(s) || Zl(s))
          return (s = Na(s, y.mode, d, null)), (s.return = y), s;
        if (typeof s.then == "function") return z(y, Fe(s), d);
        if (s.$$typeof === ql) return z(y, Je(y, s), d);
        ke(y, s);
      }
      return null;
    }
    function h(y, s, d, b) {
      var C = s !== null ? s.key : null;
      if (
        (typeof d == "string" && d !== "") ||
        typeof d == "number" ||
        typeof d == "bigint"
      )
        return C !== null ? null : i(y, s, "" + d, b);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Yl:
            return d.key === C ? c(y, s, d, b) : null;
          case pl:
            return d.key === C ? m(y, s, d, b) : null;
          case Ql:
            return (d = Ba(d)), h(y, s, d, b);
        }
        if (rt(d) || Zl(d)) return C !== null ? null : S(y, s, d, b, null);
        if (typeof d.then == "function") return h(y, s, Fe(d), b);
        if (d.$$typeof === ql) return h(y, s, Je(y, d), b);
        ke(y, d);
      }
      return null;
    }
    function g(y, s, d, b, C) {
      if (
        (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
      )
        return (y = y.get(d) || null), i(s, y, "" + b, C);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Yl:
            return (
              (y = y.get(b.key === null ? d : b.key) || null), c(s, y, b, C)
            );
          case pl:
            return (
              (y = y.get(b.key === null ? d : b.key) || null), m(s, y, b, C)
            );
          case Ql:
            return (b = Ba(b)), g(y, s, d, b, C);
        }
        if (rt(b) || Zl(b)) return (y = y.get(d) || null), S(s, y, b, C, null);
        if (typeof b.then == "function") return g(y, s, d, Fe(b), C);
        if (b.$$typeof === ql) return g(y, s, d, Je(s, b), C);
        ke(s, b);
      }
      return null;
    }
    function D(y, s, d, b) {
      for (
        var C = null, ll = null, H = s, L = (s = 0), W = null;
        H !== null && L < d.length;
        L++
      ) {
        H.index > L ? ((W = H), (H = null)) : (W = H.sibling);
        var tl = h(y, H, d[L], b);
        if (tl === null) {
          H === null && (H = W);
          break;
        }
        l && H && tl.alternate === null && t(y, H),
          (s = n(tl, s, L)),
          ll === null ? (C = tl) : (ll.sibling = tl),
          (ll = tl),
          (H = W);
      }
      if (L === d.length) return a(y, H), F && Bt(y, L), C;
      if (H === null) {
        for (; L < d.length; L++)
          (H = z(y, d[L], b)),
            H !== null &&
              ((s = n(H, s, L)),
              ll === null ? (C = H) : (ll.sibling = H),
              (ll = H));
        return F && Bt(y, L), C;
      }
      for (H = u(H); L < d.length; L++)
        (W = g(H, y, L, d[L], b)),
          W !== null &&
            (l && W.alternate !== null && H.delete(W.key === null ? L : W.key),
            (s = n(W, s, L)),
            ll === null ? (C = W) : (ll.sibling = W),
            (ll = W));
      return (
        l &&
          H.forEach(function (Ta) {
            return t(y, Ta);
          }),
        F && Bt(y, L),
        C
      );
    }
    function B(y, s, d, b) {
      if (d == null) throw Error(v(151));
      for (
        var C = null, ll = null, H = s, L = (s = 0), W = null, tl = d.next();
        H !== null && !tl.done;
        L++, tl = d.next()
      ) {
        H.index > L ? ((W = H), (H = null)) : (W = H.sibling);
        var Ta = h(y, H, tl.value, b);
        if (Ta === null) {
          H === null && (H = W);
          break;
        }
        l && H && Ta.alternate === null && t(y, H),
          (s = n(Ta, s, L)),
          ll === null ? (C = Ta) : (ll.sibling = Ta),
          (ll = Ta),
          (H = W);
      }
      if (tl.done) return a(y, H), F && Bt(y, L), C;
      if (H === null) {
        for (; !tl.done; L++, tl = d.next())
          (tl = z(y, tl.value, b)),
            tl !== null &&
              ((s = n(tl, s, L)),
              ll === null ? (C = tl) : (ll.sibling = tl),
              (ll = tl));
        return F && Bt(y, L), C;
      }
      for (H = u(H); !tl.done; L++, tl = d.next())
        (tl = g(H, y, L, tl.value, b)),
          tl !== null &&
            (l &&
              tl.alternate !== null &&
              H.delete(tl.key === null ? L : tl.key),
            (s = n(tl, s, L)),
            ll === null ? (C = tl) : (ll.sibling = tl),
            (ll = tl));
      return (
        l &&
          H.forEach(function (Wd) {
            return t(y, Wd);
          }),
        F && Bt(y, L),
        C
      );
    }
    function sl(y, s, d, b) {
      if (
        (typeof d == "object" &&
          d !== null &&
          d.type === jl &&
          d.key === null &&
          (d = d.props.children),
        typeof d == "object" && d !== null)
      ) {
        switch (d.$$typeof) {
          case Yl:
            l: {
              for (var C = d.key; s !== null; ) {
                if (s.key === C) {
                  if (((C = d.type), C === jl)) {
                    if (s.tag === 7) {
                      a(y, s.sibling),
                        (b = e(s, d.props.children)),
                        (b.return = y),
                        (y = b);
                      break l;
                    }
                  } else if (
                    s.elementType === C ||
                    (typeof C == "object" &&
                      C !== null &&
                      C.$$typeof === Ql &&
                      Ba(C) === s.type)
                  ) {
                    a(y, s.sibling),
                      (b = e(s, d.props)),
                      Wu(b, d),
                      (b.return = y),
                      (y = b);
                    break l;
                  }
                  a(y, s);
                  break;
                } else t(y, s);
                s = s.sibling;
              }
              d.type === jl
                ? ((b = Na(d.props.children, y.mode, b, d.key)),
                  (b.return = y),
                  (y = b))
                : ((b = Le(d.type, d.key, d.props, null, y.mode, b)),
                  Wu(b, d),
                  (b.return = y),
                  (y = b));
            }
            return f(y);
          case pl:
            l: {
              for (C = d.key; s !== null; ) {
                if (s.key === C)
                  if (
                    s.tag === 4 &&
                    s.stateNode.containerInfo === d.containerInfo &&
                    s.stateNode.implementation === d.implementation
                  ) {
                    a(y, s.sibling),
                      (b = e(s, d.children || [])),
                      (b.return = y),
                      (y = b);
                    break l;
                  } else {
                    a(y, s);
                    break;
                  }
                else t(y, s);
                s = s.sibling;
              }
              (b = Of(d, y.mode, b)), (b.return = y), (y = b);
            }
            return f(y);
          case Ql:
            return (d = Ba(d)), sl(y, s, d, b);
        }
        if (rt(d)) return D(y, s, d, b);
        if (Zl(d)) {
          if (((C = Zl(d)), typeof C != "function")) throw Error(v(150));
          return (d = C.call(d)), B(y, s, d, b);
        }
        if (typeof d.then == "function") return sl(y, s, Fe(d), b);
        if (d.$$typeof === ql) return sl(y, s, Je(y, d), b);
        ke(y, d);
      }
      return (typeof d == "string" && d !== "") ||
        typeof d == "number" ||
        typeof d == "bigint"
        ? ((d = "" + d),
          s !== null && s.tag === 6
            ? (a(y, s.sibling), (b = e(s, d)), (b.return = y), (y = b))
            : (a(y, s), (b = _f(d, y.mode, b)), (b.return = y), (y = b)),
          f(y))
        : a(y, s);
    }
    return function (y, s, d, b) {
      try {
        wu = 0;
        var C = sl(y, s, d, b);
        return (ou = null), C;
      } catch (H) {
        if (H === su || H === We) throw H;
        var ll = tt(29, H, null, y.mode);
        return (ll.lanes = b), (ll.return = y), ll;
      } finally {
      }
    };
  }
  var ja = U0(!0),
    N0 = U0(!1),
    ea = !1;
  function jf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function xf(l, t) {
    (l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        });
  }
  function na(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function fa(l, t, a) {
    var u = l.updateQueue;
    if (u === null) return null;
    if (((u = u.shared), (al & 2) !== 0)) {
      var e = u.pending;
      return (
        e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
        (u.pending = t),
        (t = Ze(l)),
        d0(l, null, a),
        t
      );
    }
    return Qe(l, u, t, a), Ze(l);
  }
  function $u(l, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var u = t.lanes;
      (u &= l.pendingLanes), (a |= u), (t.lanes = a), Tc(l, a);
    }
  }
  function Gf(l, t) {
    var a = l.updateQueue,
      u = l.alternate;
    if (u !== null && ((u = u.updateQueue), a === u)) {
      var e = null,
        n = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var f = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          n === null ? (e = n = f) : (n = n.next = f), (a = a.next);
        } while (a !== null);
        n === null ? (e = n = t) : (n = n.next = t);
      } else e = n = t;
      (a = {
        baseState: u.baseState,
        firstBaseUpdate: e,
        lastBaseUpdate: n,
        shared: u.shared,
        callbacks: u.callbacks,
      }),
        (l.updateQueue = a);
      return;
    }
    (l = a.lastBaseUpdate),
      l === null ? (a.firstBaseUpdate = t) : (l.next = t),
      (a.lastBaseUpdate = t);
  }
  var Xf = !1;
  function Fu() {
    if (Xf) {
      var l = cu;
      if (l !== null) throw l;
    }
  }
  function ku(l, t, a, u) {
    Xf = !1;
    var e = l.updateQueue;
    ea = !1;
    var n = e.firstBaseUpdate,
      f = e.lastBaseUpdate,
      i = e.shared.pending;
    if (i !== null) {
      e.shared.pending = null;
      var c = i,
        m = c.next;
      (c.next = null), f === null ? (n = m) : (f.next = m), (f = c);
      var S = l.alternate;
      S !== null &&
        ((S = S.updateQueue),
        (i = S.lastBaseUpdate),
        i !== f &&
          (i === null ? (S.firstBaseUpdate = m) : (i.next = m),
          (S.lastBaseUpdate = c)));
    }
    if (n !== null) {
      var z = e.baseState;
      (f = 0), (S = m = c = null), (i = n);
      do {
        var h = i.lane & -536870913,
          g = h !== i.lane;
        if (g ? (w & h) === h : (u & h) === h) {
          h !== 0 && h === iu && (Xf = !0),
            S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                });
          l: {
            var D = l,
              B = i;
            h = t;
            var sl = a;
            switch (B.tag) {
              case 1:
                if (((D = B.payload), typeof D == "function")) {
                  z = D.call(sl, z, h);
                  break l;
                }
                z = D;
                break l;
              case 3:
                D.flags = (D.flags & -65537) | 128;
              case 0:
                if (
                  ((D = B.payload),
                  (h = typeof D == "function" ? D.call(sl, z, h) : D),
                  h == null)
                )
                  break l;
                z = q({}, z, h);
                break l;
              case 2:
                ea = !0;
            }
          }
          (h = i.callback),
            h !== null &&
              ((l.flags |= 64),
              g && (l.flags |= 8192),
              (g = e.callbacks),
              g === null ? (e.callbacks = [h]) : g.push(h));
        } else
          (g = {
            lane: h,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            S === null ? ((m = S = g), (c = z)) : (S = S.next = g),
            (f |= h);
        if (((i = i.next), i === null)) {
          if (((i = e.shared.pending), i === null)) break;
          (g = i),
            (i = g.next),
            (g.next = null),
            (e.lastBaseUpdate = g),
            (e.shared.pending = null);
        }
      } while (!0);
      S === null && (c = z),
        (e.baseState = c),
        (e.firstBaseUpdate = m),
        (e.lastBaseUpdate = S),
        n === null && (e.shared.lanes = 0),
        (va |= f),
        (l.lanes = f),
        (l.memoizedState = z);
    }
  }
  function H0(l, t) {
    if (typeof l != "function") throw Error(v(191, l));
    l.call(t);
  }
  function R0(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++) H0(a[l], t);
  }
  var vu = o(null),
    Ie = o(0);
  function C0(l, t) {
    (l = Jt), M(Ie, l), M(vu, t), (Jt = l | t.baseLanes);
  }
  function Qf() {
    M(Ie, Jt), M(vu, vu.current);
  }
  function Zf() {
    (Jt = Ie.current), T(vu), T(Ie);
  }
  var at = o(null),
    ht = null;
  function ia(l) {
    var t = l.alternate;
    M(rl, rl.current & 1),
      M(at, l),
      ht === null &&
        (t === null || vu.current !== null || t.memoizedState !== null) &&
        (ht = l);
  }
  function Lf(l) {
    M(rl, rl.current), M(at, l), ht === null && (ht = l);
  }
  function q0(l) {
    l.tag === 22
      ? (M(rl, rl.current), M(at, l), ht === null && (ht = l))
      : ca();
  }
  function ca() {
    M(rl, rl.current), M(at, at.current);
  }
  function ut(l) {
    T(at), ht === l && (ht = null), T(rl);
  }
  var rl = o(0);
  function Pe(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || $i(a) || Fi(a)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var xt = 0,
    Z = null,
    il = null,
    Tl = null,
    ln = !1,
    yu = !1,
    xa = !1,
    tn = 0,
    Iu = 0,
    du = null,
    xy = 0;
  function hl() {
    throw Error(v(321));
  }
  function Vf(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!lt(l[a], t[a])) return !1;
    return !0;
  }
  function Kf(l, t, a, u, e, n) {
    return (
      (xt = n),
      (Z = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (r.H = l === null || l.memoizedState === null ? Ss : fi),
      (xa = !1),
      (n = a(u, e)),
      (xa = !1),
      yu && (n = Y0(t, a, u, e)),
      B0(l),
      n
    );
  }
  function B0(l) {
    r.H = te;
    var t = il !== null && il.next !== null;
    if (((xt = 0), (Tl = il = Z = null), (ln = !1), (Iu = 0), (du = null), t))
      throw Error(v(300));
    l === null ||
      El ||
      ((l = l.dependencies), l !== null && Ke(l) && (El = !0));
  }
  function Y0(l, t, a, u) {
    Z = l;
    var e = 0;
    do {
      if ((yu && (du = null), (Iu = 0), (yu = !1), 25 <= e))
        throw Error(v(301));
      if (((e += 1), (Tl = il = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        (n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0);
      }
      (r.H = rs), (n = t(a, u));
    } while (yu);
    return n;
  }
  function Gy() {
    var l = r.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? Pu(t) : t),
      (l = l.useState()[0]),
      (il !== null ? il.memoizedState : null) !== l && (Z.flags |= 1024),
      t
    );
  }
  function Jf() {
    var l = tn !== 0;
    return (tn = 0), l;
  }
  function wf(l, t, a) {
    (t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~a);
  }
  function Wf(l) {
    if (ln) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), (l = l.next);
      }
      ln = !1;
    }
    (xt = 0), (Tl = il = Z = null), (yu = !1), (Iu = tn = 0), (du = null);
  }
  function Gl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Tl === null ? (Z.memoizedState = Tl = l) : (Tl = Tl.next = l), Tl;
  }
  function bl() {
    if (il === null) {
      var l = Z.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = il.next;
    var t = Tl === null ? Z.memoizedState : Tl.next;
    if (t !== null) (Tl = t), (il = l);
    else {
      if (l === null)
        throw Z.alternate === null ? Error(v(467)) : Error(v(310));
      (il = l),
        (l = {
          memoizedState: il.memoizedState,
          baseState: il.baseState,
          baseQueue: il.baseQueue,
          queue: il.queue,
          next: null,
        }),
        Tl === null ? (Z.memoizedState = Tl = l) : (Tl = Tl.next = l);
    }
    return Tl;
  }
  function an() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pu(l) {
    var t = Iu;
    return (
      (Iu += 1),
      du === null && (du = []),
      (l = M0(du, l, t)),
      (t = Z),
      (Tl === null ? t.memoizedState : Tl.next) === null &&
        ((t = t.alternate),
        (r.H = t === null || t.memoizedState === null ? Ss : fi)),
      l
    );
  }
  function un(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Pu(l);
      if (l.$$typeof === ql) return Nl(l);
    }
    throw Error(v(438, String(l)));
  }
  function $f(l) {
    var t = null,
      a = Z.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var u = Z.alternate;
      u !== null &&
        ((u = u.updateQueue),
        u !== null &&
          ((u = u.memoCache),
          u != null &&
            (t = {
              data: u.data.map(function (e) {
                return e.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = an()), (Z.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(l), u = 0; u < l; u++) a[u] = Za;
    return t.index++, a;
  }
  function Gt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function en(l) {
    var t = bl();
    return Ff(t, il, l);
  }
  function Ff(l, t, a) {
    var u = l.queue;
    if (u === null) throw Error(v(311));
    u.lastRenderedReducer = a;
    var e = l.baseQueue,
      n = u.pending;
    if (n !== null) {
      if (e !== null) {
        var f = e.next;
        (e.next = n.next), (n.next = f);
      }
      (t.baseQueue = e = n), (u.pending = null);
    }
    if (((n = l.baseState), e === null)) l.memoizedState = n;
    else {
      t = e.next;
      var i = (f = null),
        c = null,
        m = t,
        S = !1;
      do {
        var z = m.lane & -536870913;
        if (z !== m.lane ? (w & z) === z : (xt & z) === z) {
          var h = m.revertLane;
          if (h === 0)
            c !== null &&
              (c = c.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: m.action,
                  hasEagerState: m.hasEagerState,
                  eagerState: m.eagerState,
                  next: null,
                }),
              z === iu && (S = !0);
          else if ((xt & h) === h) {
            (m = m.next), h === iu && (S = !0);
            continue;
          } else
            (z = {
              lane: 0,
              revertLane: m.revertLane,
              gesture: null,
              action: m.action,
              hasEagerState: m.hasEagerState,
              eagerState: m.eagerState,
              next: null,
            }),
              c === null ? ((i = c = z), (f = n)) : (c = c.next = z),
              (Z.lanes |= h),
              (va |= h);
          (z = m.action),
            xa && a(n, z),
            (n = m.hasEagerState ? m.eagerState : a(n, z));
        } else
          (h = {
            lane: z,
            revertLane: m.revertLane,
            gesture: m.gesture,
            action: m.action,
            hasEagerState: m.hasEagerState,
            eagerState: m.eagerState,
            next: null,
          }),
            c === null ? ((i = c = h), (f = n)) : (c = c.next = h),
            (Z.lanes |= z),
            (va |= z);
        m = m.next;
      } while (m !== null && m !== t);
      if (
        (c === null ? (f = n) : (c.next = i),
        !lt(n, l.memoizedState) && ((El = !0), S && ((a = cu), a !== null)))
      )
        throw a;
      (l.memoizedState = n),
        (l.baseState = f),
        (l.baseQueue = c),
        (u.lastRenderedState = n);
    }
    return e === null && (u.lanes = 0), [l.memoizedState, u.dispatch];
  }
  function kf(l) {
    var t = bl(),
      a = t.queue;
    if (a === null) throw Error(v(311));
    a.lastRenderedReducer = l;
    var u = a.dispatch,
      e = a.pending,
      n = t.memoizedState;
    if (e !== null) {
      a.pending = null;
      var f = (e = e.next);
      do (n = l(n, f.action)), (f = f.next);
      while (f !== e);
      lt(n, t.memoizedState) || (El = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (a.lastRenderedState = n);
    }
    return [n, u];
  }
  function j0(l, t, a) {
    var u = Z,
      e = bl(),
      n = F;
    if (n) {
      if (a === void 0) throw Error(v(407));
      a = a();
    } else a = t();
    var f = !lt((il || e).memoizedState, a);
    if (
      (f && ((e.memoizedState = a), (El = !0)),
      (e = e.queue),
      li(X0.bind(null, u, e, l), [l]),
      e.getSnapshot !== t || f || (Tl !== null && Tl.memoizedState.tag & 1))
    ) {
      if (
        ((u.flags |= 2048),
        mu(9, { destroy: void 0 }, G0.bind(null, u, e, a, t), null),
        vl === null)
      )
        throw Error(v(349));
      n || (xt & 127) !== 0 || x0(u, t, a);
    }
    return a;
  }
  function x0(l, t, a) {
    (l.flags |= 16384),
      (l = { getSnapshot: t, value: a }),
      (t = Z.updateQueue),
      t === null
        ? ((t = an()), (Z.updateQueue = t), (t.stores = [l]))
        : ((a = t.stores), a === null ? (t.stores = [l]) : a.push(l));
  }
  function G0(l, t, a, u) {
    (t.value = a), (t.getSnapshot = u), Q0(t) && Z0(l);
  }
  function X0(l, t, a) {
    return a(function () {
      Q0(t) && Z0(l);
    });
  }
  function Q0(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !lt(l, a);
    } catch {
      return !0;
    }
  }
  function Z0(l) {
    var t = Ua(l, 2);
    t !== null && $l(t, l, 2);
  }
  function If(l) {
    var t = Gl();
    if (typeof l == "function") {
      var a = l;
      if (((l = a()), xa)) {
        kt(!0);
        try {
          a();
        } finally {
          kt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Gt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function L0(l, t, a, u) {
    return (l.baseState = a), Ff(l, il, typeof u == "function" ? u : Gt);
  }
  function Xy(l, t, a, u, e) {
    if (cn(l)) throw Error(v(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: e,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          n.listeners.push(f);
        },
      };
      r.T !== null ? a(!0) : (n.isTransition = !1),
        u(n),
        (a = t.pending),
        a === null
          ? ((n.next = t.pending = n), V0(t, n))
          : ((n.next = a.next), (t.pending = a.next = n));
    }
  }
  function V0(l, t) {
    var a = t.action,
      u = t.payload,
      e = l.state;
    if (t.isTransition) {
      var n = r.T,
        f = {};
      r.T = f;
      try {
        var i = a(e, u),
          c = r.S;
        c !== null && c(f, i), K0(l, t, i);
      } catch (m) {
        Pf(l, t, m);
      } finally {
        n !== null && f.types !== null && (n.types = f.types), (r.T = n);
      }
    } else
      try {
        (n = a(e, u)), K0(l, t, n);
      } catch (m) {
        Pf(l, t, m);
      }
  }
  function K0(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (u) {
            J0(l, t, u);
          },
          function (u) {
            return Pf(l, t, u);
          }
        )
      : J0(l, t, a);
  }
  function J0(l, t, a) {
    (t.status = "fulfilled"),
      (t.value = a),
      w0(t),
      (l.state = a),
      (t = l.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (l.pending = null) : ((a = a.next), (t.next = a), V0(l, a)));
  }
  function Pf(l, t, a) {
    var u = l.pending;
    if (((l.pending = null), u !== null)) {
      u = u.next;
      do (t.status = "rejected"), (t.reason = a), w0(t), (t = t.next);
      while (t !== u);
    }
    l.action = null;
  }
  function w0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function W0(l, t) {
    return t;
  }
  function $0(l, t) {
    if (F) {
      var a = vl.formState;
      if (a !== null) {
        l: {
          var u = Z;
          if (F) {
            if (yl) {
              t: {
                for (var e = yl, n = mt; e.nodeType !== 8; ) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (((e = gt(e.nextSibling)), e === null)) {
                    e = null;
                    break t;
                  }
                }
                (n = e.data), (e = n === "F!" || n === "F" ? e : null);
              }
              if (e) {
                (yl = gt(e.nextSibling)), (u = e.data === "F!");
                break l;
              }
            }
            aa(u);
          }
          u = !1;
        }
        u && (t = a[0]);
      }
    }
    return (
      (a = Gl()),
      (a.memoizedState = a.baseState = t),
      (u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: W0,
        lastRenderedState: t,
      }),
      (a.queue = u),
      (a = ms.bind(null, Z, u)),
      (u.dispatch = a),
      (u = If(!1)),
      (n = ni.bind(null, Z, !1, u.queue)),
      (u = Gl()),
      (e = { state: t, dispatch: null, action: l, pending: null }),
      (u.queue = e),
      (a = Xy.bind(null, Z, e, n, a)),
      (e.dispatch = a),
      (u.memoizedState = l),
      [t, a, !1]
    );
  }
  function F0(l) {
    var t = bl();
    return k0(t, il, l);
  }
  function k0(l, t, a) {
    if (
      ((t = Ff(l, t, W0)[0]),
      (l = en(Gt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var u = Pu(t);
      } catch (f) {
        throw f === su ? We : f;
      }
    else u = t;
    t = bl();
    var e = t.queue,
      n = e.dispatch;
    return (
      a !== t.memoizedState &&
        ((Z.flags |= 2048),
        mu(9, { destroy: void 0 }, Qy.bind(null, e, a), null)),
      [u, n, l]
    );
  }
  function Qy(l, t) {
    l.action = t;
  }
  function I0(l) {
    var t = bl(),
      a = il;
    if (a !== null) return k0(t, a, l);
    bl(), (t = t.memoizedState), (a = bl());
    var u = a.queue.dispatch;
    return (a.memoizedState = l), [t, u, !1];
  }
  function mu(l, t, a, u) {
    return (
      (l = { tag: l, create: a, deps: u, inst: t, next: null }),
      (t = Z.updateQueue),
      t === null && ((t = an()), (Z.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = l.next = l)
        : ((u = a.next), (a.next = l), (l.next = u), (t.lastEffect = l)),
      l
    );
  }
  function P0() {
    return bl().memoizedState;
  }
  function nn(l, t, a, u) {
    var e = Gl();
    (Z.flags |= l),
      (e.memoizedState = mu(
        1 | t,
        { destroy: void 0 },
        a,
        u === void 0 ? null : u
      ));
  }
  function fn(l, t, a, u) {
    var e = bl();
    u = u === void 0 ? null : u;
    var n = e.memoizedState.inst;
    il !== null && u !== null && Vf(u, il.memoizedState.deps)
      ? (e.memoizedState = mu(t, n, a, u))
      : ((Z.flags |= l), (e.memoizedState = mu(1 | t, n, a, u)));
  }
  function ls(l, t) {
    nn(8390656, 8, l, t);
  }
  function li(l, t) {
    fn(2048, 8, l, t);
  }
  function Zy(l) {
    Z.flags |= 4;
    var t = Z.updateQueue;
    if (t === null) (t = an()), (Z.updateQueue = t), (t.events = [l]);
    else {
      var a = t.events;
      a === null ? (t.events = [l]) : a.push(l);
    }
  }
  function ts(l) {
    var t = bl().memoizedState;
    return (
      Zy({ ref: t, nextImpl: l }),
      function () {
        if ((al & 2) !== 0) throw Error(v(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function as(l, t) {
    return fn(4, 2, l, t);
  }
  function us(l, t) {
    return fn(4, 4, l, t);
  }
  function es(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function ns(l, t, a) {
    (a = a != null ? a.concat([l]) : null), fn(4, 4, es.bind(null, t, l), a);
  }
  function ti() {}
  function fs(l, t) {
    var a = bl();
    t = t === void 0 ? null : t;
    var u = a.memoizedState;
    return t !== null && Vf(t, u[1]) ? u[0] : ((a.memoizedState = [l, t]), l);
  }
  function is(l, t) {
    var a = bl();
    t = t === void 0 ? null : t;
    var u = a.memoizedState;
    if (t !== null && Vf(t, u[1])) return u[0];
    if (((u = l()), xa)) {
      kt(!0);
      try {
        l();
      } finally {
        kt(!1);
      }
    }
    return (a.memoizedState = [u, t]), u;
  }
  function ai(l, t, a) {
    return a === void 0 || ((xt & 1073741824) !== 0 && (w & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = a), (l = co()), (Z.lanes |= l), (va |= l), a);
  }
  function cs(l, t, a, u) {
    return lt(a, t)
      ? a
      : vu.current !== null
      ? ((l = ai(l, a, u)), lt(l, t) || (El = !0), l)
      : (xt & 42) === 0 || ((xt & 1073741824) !== 0 && (w & 261930) === 0)
      ? ((El = !0), (l.memoizedState = a))
      : ((l = co()), (Z.lanes |= l), (va |= l), t);
  }
  function ss(l, t, a, u, e) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var f = r.T,
      i = {};
    (r.T = i), ni(l, !1, t, a);
    try {
      var c = e(),
        m = r.S;
      if (
        (m !== null && m(i, c),
        c !== null && typeof c == "object" && typeof c.then == "function")
      ) {
        var S = jy(c, u);
        le(l, t, S, ft(l));
      } else le(l, t, u, ft(l));
    } catch (z) {
      le(l, t, { then: function () {}, status: "rejected", reason: z }, ft());
    } finally {
      (O.p = n),
        f !== null && i.types !== null && (f.types = i.types),
        (r.T = f);
    }
  }
  function Ly() {}
  function ui(l, t, a, u) {
    if (l.tag !== 5) throw Error(v(476));
    var e = os(l).queue;
    ss(
      l,
      e,
      t,
      j,
      a === null
        ? Ly
        : function () {
            return vs(l), a(u);
          }
    );
  }
  function os(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: j,
      baseState: j,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Gt,
        lastRenderedState: j,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Gt,
          lastRenderedState: a,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function vs(l) {
    var t = os(l);
    t.next === null && (t = l.alternate.memoizedState),
      le(l, t.next.queue, {}, ft());
  }
  function ei() {
    return Nl(Se);
  }
  function ys() {
    return bl().memoizedState;
  }
  function ds() {
    return bl().memoizedState;
  }
  function Vy(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = ft();
          l = na(a);
          var u = fa(t, l, a);
          u !== null && ($l(u, t, a), $u(u, t, a)),
            (t = { cache: Cf() }),
            (l.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function Ky(l, t, a) {
    var u = ft();
    (a = {
      lane: u,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      cn(l)
        ? hs(t, a)
        : ((a = Ef(l, t, a, u)), a !== null && ($l(a, l, u), gs(a, t, u)));
  }
  function ms(l, t, a) {
    var u = ft();
    le(l, t, a, u);
  }
  function le(l, t, a, u) {
    var e = {
      lane: u,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (cn(l)) hs(t, e);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var f = t.lastRenderedState,
            i = n(f, a);
          if (((e.hasEagerState = !0), (e.eagerState = i), lt(i, f)))
            return Qe(l, t, e, 0), vl === null && Xe(), !1;
        } catch {
        } finally {
        }
      if (((a = Ef(l, t, e, u)), a !== null))
        return $l(a, l, u), gs(a, t, u), !0;
    }
    return !1;
  }
  function ni(l, t, a, u) {
    if (
      ((u = {
        lane: 2,
        revertLane: ji(),
        gesture: null,
        action: u,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      cn(l))
    ) {
      if (t) throw Error(v(479));
    } else (t = Ef(l, a, u, 2)), t !== null && $l(t, l, 2);
  }
  function cn(l) {
    var t = l.alternate;
    return l === Z || (t !== null && t === Z);
  }
  function hs(l, t) {
    yu = ln = !0;
    var a = l.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (l.pending = t);
  }
  function gs(l, t, a) {
    if ((a & 4194048) !== 0) {
      var u = t.lanes;
      (u &= l.pendingLanes), (a |= u), (t.lanes = a), Tc(l, a);
    }
  }
  var te = {
    readContext: Nl,
    use: un,
    useCallback: hl,
    useContext: hl,
    useEffect: hl,
    useImperativeHandle: hl,
    useLayoutEffect: hl,
    useInsertionEffect: hl,
    useMemo: hl,
    useReducer: hl,
    useRef: hl,
    useState: hl,
    useDebugValue: hl,
    useDeferredValue: hl,
    useTransition: hl,
    useSyncExternalStore: hl,
    useId: hl,
    useHostTransitionStatus: hl,
    useFormState: hl,
    useActionState: hl,
    useOptimistic: hl,
    useMemoCache: hl,
    useCacheRefresh: hl,
  };
  te.useEffectEvent = hl;
  var Ss = {
      readContext: Nl,
      use: un,
      useCallback: function (l, t) {
        return (Gl().memoizedState = [l, t === void 0 ? null : t]), l;
      },
      useContext: Nl,
      useEffect: ls,
      useImperativeHandle: function (l, t, a) {
        (a = a != null ? a.concat([l]) : null),
          nn(4194308, 4, es.bind(null, t, l), a);
      },
      useLayoutEffect: function (l, t) {
        return nn(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        nn(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var a = Gl();
        t = t === void 0 ? null : t;
        var u = l();
        if (xa) {
          kt(!0);
          try {
            l();
          } finally {
            kt(!1);
          }
        }
        return (a.memoizedState = [u, t]), u;
      },
      useReducer: function (l, t, a) {
        var u = Gl();
        if (a !== void 0) {
          var e = a(t);
          if (xa) {
            kt(!0);
            try {
              a(t);
            } finally {
              kt(!1);
            }
          }
        } else e = t;
        return (
          (u.memoizedState = u.baseState = e),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: e,
          }),
          (u.queue = l),
          (l = l.dispatch = Ky.bind(null, Z, l)),
          [u.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = Gl();
        return (l = { current: l }), (t.memoizedState = l);
      },
      useState: function (l) {
        l = If(l);
        var t = l.queue,
          a = ms.bind(null, Z, t);
        return (t.dispatch = a), [l.memoizedState, a];
      },
      useDebugValue: ti,
      useDeferredValue: function (l, t) {
        var a = Gl();
        return ai(a, l, t);
      },
      useTransition: function () {
        var l = If(!1);
        return (
          (l = ss.bind(null, Z, l.queue, !0, !1)),
          (Gl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, a) {
        var u = Z,
          e = Gl();
        if (F) {
          if (a === void 0) throw Error(v(407));
          a = a();
        } else {
          if (((a = t()), vl === null)) throw Error(v(349));
          (w & 127) !== 0 || x0(u, t, a);
        }
        e.memoizedState = a;
        var n = { value: a, getSnapshot: t };
        return (
          (e.queue = n),
          ls(X0.bind(null, u, n, l), [l]),
          (u.flags |= 2048),
          mu(9, { destroy: void 0 }, G0.bind(null, u, n, a, t), null),
          a
        );
      },
      useId: function () {
        var l = Gl(),
          t = vl.identifierPrefix;
        if (F) {
          var a = Mt,
            u = Ot;
          (a = (u & ~(1 << (32 - Pl(u) - 1))).toString(32) + a),
            (t = "_" + t + "R_" + a),
            (a = tn++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "_");
        } else (a = xy++), (t = "_" + t + "r_" + a.toString(32) + "_");
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ei,
      useFormState: $0,
      useActionState: $0,
      useOptimistic: function (l) {
        var t = Gl();
        t.memoizedState = t.baseState = l;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a), (t = ni.bind(null, Z, !0, a)), (a.dispatch = t), [l, t]
        );
      },
      useMemoCache: $f,
      useCacheRefresh: function () {
        return (Gl().memoizedState = Vy.bind(null, Z));
      },
      useEffectEvent: function (l) {
        var t = Gl(),
          a = { impl: l };
        return (
          (t.memoizedState = a),
          function () {
            if ((al & 2) !== 0) throw Error(v(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    fi = {
      readContext: Nl,
      use: un,
      useCallback: fs,
      useContext: Nl,
      useEffect: li,
      useImperativeHandle: ns,
      useInsertionEffect: as,
      useLayoutEffect: us,
      useMemo: is,
      useReducer: en,
      useRef: P0,
      useState: function () {
        return en(Gt);
      },
      useDebugValue: ti,
      useDeferredValue: function (l, t) {
        var a = bl();
        return cs(a, il.memoizedState, l, t);
      },
      useTransition: function () {
        var l = en(Gt)[0],
          t = bl().memoizedState;
        return [typeof l == "boolean" ? l : Pu(l), t];
      },
      useSyncExternalStore: j0,
      useId: ys,
      useHostTransitionStatus: ei,
      useFormState: F0,
      useActionState: F0,
      useOptimistic: function (l, t) {
        var a = bl();
        return L0(a, il, l, t);
      },
      useMemoCache: $f,
      useCacheRefresh: ds,
    };
  fi.useEffectEvent = ts;
  var rs = {
    readContext: Nl,
    use: un,
    useCallback: fs,
    useContext: Nl,
    useEffect: li,
    useImperativeHandle: ns,
    useInsertionEffect: as,
    useLayoutEffect: us,
    useMemo: is,
    useReducer: kf,
    useRef: P0,
    useState: function () {
      return kf(Gt);
    },
    useDebugValue: ti,
    useDeferredValue: function (l, t) {
      var a = bl();
      return il === null ? ai(a, l, t) : cs(a, il.memoizedState, l, t);
    },
    useTransition: function () {
      var l = kf(Gt)[0],
        t = bl().memoizedState;
      return [typeof l == "boolean" ? l : Pu(l), t];
    },
    useSyncExternalStore: j0,
    useId: ys,
    useHostTransitionStatus: ei,
    useFormState: I0,
    useActionState: I0,
    useOptimistic: function (l, t) {
      var a = bl();
      return il !== null
        ? L0(a, il, l, t)
        : ((a.baseState = l), [l, a.queue.dispatch]);
    },
    useMemoCache: $f,
    useCacheRefresh: ds,
  };
  rs.useEffectEvent = ts;
  function ii(l, t, a, u) {
    (t = l.memoizedState),
      (a = a(u, t)),
      (a = a == null ? t : q({}, t, a)),
      (l.memoizedState = a),
      l.lanes === 0 && (l.updateQueue.baseState = a);
  }
  var ci = {
    enqueueSetState: function (l, t, a) {
      l = l._reactInternals;
      var u = ft(),
        e = na(u);
      (e.payload = t),
        a != null && (e.callback = a),
        (t = fa(l, e, u)),
        t !== null && ($l(t, l, u), $u(t, l, u));
    },
    enqueueReplaceState: function (l, t, a) {
      l = l._reactInternals;
      var u = ft(),
        e = na(u);
      (e.tag = 1),
        (e.payload = t),
        a != null && (e.callback = a),
        (t = fa(l, e, u)),
        t !== null && ($l(t, l, u), $u(t, l, u));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var a = ft(),
        u = na(a);
      (u.tag = 2),
        t != null && (u.callback = t),
        (t = fa(l, u, a)),
        t !== null && ($l(t, l, a), $u(t, l, a));
    },
  };
  function bs(l, t, a, u, e, n, f) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(u, n, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Qu(a, u) || !Qu(e, n)
        : !0
    );
  }
  function zs(l, t, a, u) {
    (l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, u),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, u),
      t.state !== l && ci.enqueueReplaceState(t, t.state, null);
  }
  function Ga(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var u in t) u !== "ref" && (a[u] = t[u]);
    }
    if ((l = l.defaultProps)) {
      a === t && (a = q({}, a));
      for (var e in l) a[e] === void 0 && (a[e] = l[e]);
    }
    return a;
  }
  function Ts(l) {
    Ge(l);
  }
  function Es(l) {
    console.error(l);
  }
  function As(l) {
    Ge(l);
  }
  function sn(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function _s(l, t, a) {
    try {
      var u = l.onCaughtError;
      u(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function si(l, t, a) {
    return (
      (a = na(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        sn(l, t);
      }),
      a
    );
  }
  function Os(l) {
    return (l = na(l)), (l.tag = 3), l;
  }
  function Ms(l, t, a, u) {
    var e = a.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = u.value;
      (l.payload = function () {
        return e(n);
      }),
        (l.callback = function () {
          _s(t, a, u);
        });
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (l.callback = function () {
        _s(t, a, u),
          typeof e != "function" &&
            (ya === null ? (ya = new Set([this])) : ya.add(this));
        var i = u.stack;
        this.componentDidCatch(u.value, {
          componentStack: i !== null ? i : "",
        });
      });
  }
  function Jy(l, t, a, u, e) {
    if (
      ((a.flags |= 32768),
      u !== null && typeof u == "object" && typeof u.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && fu(t, a, e, !0),
        (a = at.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              ht === null ? Tn() : a.alternate === null && gl === 0 && (gl = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = e),
              u === $e
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([u])) : t.add(u),
                  qi(l, u, e)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              u === $e
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([u]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([u])) : a.add(u)),
                  qi(l, u, e)),
              !1
            );
        }
        throw Error(v(435, a.tag));
      }
      return qi(l, u, e), Tn(), !1;
    }
    if (F)
      return (
        (t = at.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = e),
            u !== Df && ((l = Error(v(422), { cause: u })), Vu(vt(l, a))))
          : (u !== Df && ((t = Error(v(423), { cause: u })), Vu(vt(t, a))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (e &= -e),
            (l.lanes |= e),
            (u = vt(u, a)),
            (e = si(l.stateNode, u, e)),
            Gf(l, e),
            gl !== 4 && (gl = 2)),
        !1
      );
    var n = Error(v(520), { cause: u });
    if (
      ((n = vt(n, a)),
      se === null ? (se = [n]) : se.push(n),
      gl !== 4 && (gl = 2),
      t === null)
    )
      return !0;
    (u = vt(u, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (l = e & -e),
            (a.lanes |= l),
            (l = si(a.stateNode, u, l)),
            Gf(a, l),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (n = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (ya === null || !ya.has(n)))))
          )
            return (
              (a.flags |= 65536),
              (e &= -e),
              (a.lanes |= e),
              (e = Os(e)),
              Ms(e, l, a, u),
              Gf(a, e),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var oi = Error(v(461)),
    El = !1;
  function Hl(l, t, a, u) {
    t.child = l === null ? N0(t, null, a, u) : ja(t, l.child, a, u);
  }
  function ps(l, t, a, u, e) {
    a = a.render;
    var n = t.ref;
    if ("ref" in u) {
      var f = {};
      for (var i in u) i !== "ref" && (f[i] = u[i]);
    } else f = u;
    return (
      Ca(t),
      (u = Kf(l, t, a, f, n, e)),
      (i = Jf()),
      l !== null && !El
        ? (wf(l, t, e), Xt(l, t, e))
        : (F && i && Mf(t), (t.flags |= 1), Hl(l, t, u, e), t.child)
    );
  }
  function Ds(l, t, a, u, e) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" &&
        !Af(n) &&
        n.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = n), Us(l, t, n, u, e))
        : ((l = Le(a.type, null, u, t, t.mode, e)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !ri(l, e))) {
      var f = n.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Qu), a(f, u) && l.ref === t.ref)
      )
        return Xt(l, t, e);
    }
    return (
      (t.flags |= 1),
      (l = qt(n, u)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function Us(l, t, a, u, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Qu(n, u) && l.ref === t.ref)
        if (((El = !1), (t.pendingProps = u = n), ri(l, e)))
          (l.flags & 131072) !== 0 && (El = !0);
        else return (t.lanes = l.lanes), Xt(l, t, e);
    }
    return vi(l, t, a, u, e);
  }
  function Ns(l, t, a, u) {
    var e = u.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      u.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | a : a), l !== null)) {
          for (u = t.child = l.child, e = 0; u !== null; )
            (e = e | u.lanes | u.childLanes), (u = u.sibling);
          u = e & ~n;
        } else (u = 0), (t.child = null);
        return Hs(l, t, n, a, u);
      }
      if ((a & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && we(t, n !== null ? n.cachePool : null),
          n !== null ? C0(t, n) : Qf(),
          q0(t);
      else
        return (
          (u = t.lanes = 536870912),
          Hs(l, t, n !== null ? n.baseLanes | a : a, a, u)
        );
    } else
      n !== null
        ? (we(t, n.cachePool), C0(t, n), ca(), (t.memoizedState = null))
        : (l !== null && we(t, null), Qf(), ca());
    return Hl(l, t, e, a), t.child;
  }
  function ae(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Hs(l, t, a, u, e) {
    var n = Bf();
    return (
      (n = n === null ? null : { parent: zl._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: a, cachePool: n }),
      l !== null && we(t, null),
      Qf(),
      q0(t),
      l !== null && fu(l, t, u, !0),
      (t.childLanes = e),
      null
    );
  }
  function on(l, t) {
    return (
      (t = yn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function Rs(l, t, a) {
    return (
      ja(t, l.child, null, a),
      (l = on(t, t.pendingProps)),
      (l.flags |= 2),
      ut(t),
      (t.memoizedState = null),
      l
    );
  }
  function wy(l, t, a) {
    var u = t.pendingProps,
      e = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (F) {
        if (u.mode === "hidden")
          return (l = on(t, u)), (t.lanes = 536870912), ae(null, l);
        if (
          (Lf(t),
          (l = yl)
            ? ((l = Ko(l, mt)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: la !== null ? { id: Ot, overflow: Mt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = h0(l)),
                (a.return = t),
                (t.child = a),
                (Ul = t),
                (yl = null)))
            : (l = null),
          l === null)
        )
          throw aa(t);
        return (t.lanes = 536870912), null;
      }
      return on(t, u);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var f = n.dehydrated;
      if ((Lf(t), e))
        if (t.flags & 256) (t.flags &= -257), (t = Rs(l, t, a));
        else if (t.memoizedState !== null)
          (t.child = l.child), (t.flags |= 128), (t = null);
        else throw Error(v(558));
      else if (
        (El || fu(l, t, a, !1), (e = (a & l.childLanes) !== 0), El || e)
      ) {
        if (
          ((u = vl),
          u !== null && ((f = Ec(u, a)), f !== 0 && f !== n.retryLane))
        )
          throw ((n.retryLane = f), Ua(l, f), $l(u, l, f), oi);
        Tn(), (t = Rs(l, t, a));
      } else
        (l = n.treeContext),
          (yl = gt(f.nextSibling)),
          (Ul = t),
          (F = !0),
          (ta = null),
          (mt = !1),
          l !== null && r0(t, l),
          (t = on(t, u)),
          (t.flags |= 4096);
      return t;
    }
    return (
      (l = qt(l.child, { mode: u.mode, children: u.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function vn(l, t) {
    var a = t.ref;
    if (a === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(v(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function vi(l, t, a, u, e) {
    return (
      Ca(t),
      (a = Kf(l, t, a, u, void 0, e)),
      (u = Jf()),
      l !== null && !El
        ? (wf(l, t, e), Xt(l, t, e))
        : (F && u && Mf(t), (t.flags |= 1), Hl(l, t, a, e), t.child)
    );
  }
  function Cs(l, t, a, u, e, n) {
    return (
      Ca(t),
      (t.updateQueue = null),
      (a = Y0(t, u, a, e)),
      B0(l),
      (u = Jf()),
      l !== null && !El
        ? (wf(l, t, n), Xt(l, t, n))
        : (F && u && Mf(t), (t.flags |= 1), Hl(l, t, a, n), t.child)
    );
  }
  function qs(l, t, a, u, e) {
    if ((Ca(t), t.stateNode === null)) {
      var n = au,
        f = a.contextType;
      typeof f == "object" && f !== null && (n = Nl(f)),
        (n = new a(u, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = ci),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = u),
        (n.state = t.memoizedState),
        (n.refs = {}),
        jf(t),
        (f = a.contextType),
        (n.context = typeof f == "object" && f !== null ? Nl(f) : au),
        (n.state = t.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == "function" && (ii(t, a, f, u), (n.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((f = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          f !== n.state && ci.enqueueReplaceState(n, n.state, null),
          ku(t, u, n, e),
          Fu(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (u = !0);
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps,
        c = Ga(a, i);
      n.props = c;
      var m = n.context,
        S = a.contextType;
      (f = au), typeof S == "object" && S !== null && (f = Nl(S));
      var z = a.getDerivedStateFromProps;
      (S =
        typeof z == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (i = t.pendingProps !== i),
        S ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i || m !== f) && zs(t, n, u, f)),
        (ea = !1);
      var h = t.memoizedState;
      (n.state = h),
        ku(t, u, n, e),
        Fu(),
        (m = t.memoizedState),
        i || h !== m || ea
          ? (typeof z == "function" && (ii(t, a, z, u), (m = t.memoizedState)),
            (c = ea || bs(t, a, c, u, h, m, f))
              ? (S ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = u),
                (t.memoizedState = m)),
            (n.props = u),
            (n.state = m),
            (n.context = f),
            (u = c))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (u = !1));
    } else {
      (n = t.stateNode),
        xf(l, t),
        (f = t.memoizedProps),
        (S = Ga(a, f)),
        (n.props = S),
        (z = t.pendingProps),
        (h = n.context),
        (m = a.contextType),
        (c = au),
        typeof m == "object" && m !== null && (c = Nl(m)),
        (i = a.getDerivedStateFromProps),
        (m =
          typeof i == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((f !== z || h !== c) && zs(t, n, u, c)),
        (ea = !1),
        (h = t.memoizedState),
        (n.state = h),
        ku(t, u, n, e),
        Fu();
      var g = t.memoizedState;
      f !== z ||
      h !== g ||
      ea ||
      (l !== null && l.dependencies !== null && Ke(l.dependencies))
        ? (typeof i == "function" && (ii(t, a, i, u), (g = t.memoizedState)),
          (S =
            ea ||
            bs(t, a, S, u, h, g, c) ||
            (l !== null && l.dependencies !== null && Ke(l.dependencies)))
            ? (m ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(u, g, c),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(u, g, c)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (f === l.memoizedProps && h === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (f === l.memoizedProps && h === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = u),
              (t.memoizedState = g)),
          (n.props = u),
          (n.state = g),
          (n.context = c),
          (u = S))
        : (typeof n.componentDidUpdate != "function" ||
            (f === l.memoizedProps && h === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (f === l.memoizedProps && h === l.memoizedState) ||
            (t.flags |= 1024),
          (u = !1));
    }
    return (
      (n = u),
      vn(l, t),
      (u = (t.flags & 128) !== 0),
      n || u
        ? ((n = t.stateNode),
          (a =
            u && typeof a.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && u
            ? ((t.child = ja(t, l.child, null, e)),
              (t.child = ja(t, null, a, e)))
            : Hl(l, t, a, e),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Xt(l, t, e)),
      l
    );
  }
  function Bs(l, t, a, u) {
    return Ha(), (t.flags |= 256), Hl(l, t, a, u), t.child;
  }
  var yi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function di(l) {
    return { baseLanes: l, cachePool: _0() };
  }
  function mi(l, t, a) {
    return (l = l !== null ? l.childLanes & ~a : 0), t && (l |= nt), l;
  }
  function Ys(l, t, a) {
    var u = t.pendingProps,
      e = !1,
      n = (t.flags & 128) !== 0,
      f;
    if (
      ((f = n) ||
        (f =
          l !== null && l.memoizedState === null ? !1 : (rl.current & 2) !== 0),
      f && ((e = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (F) {
        if (
          (e ? ia(t) : ca(),
          (l = yl)
            ? ((l = Ko(l, mt)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: la !== null ? { id: Ot, overflow: Mt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = h0(l)),
                (a.return = t),
                (t.child = a),
                (Ul = t),
                (yl = null)))
            : (l = null),
          l === null)
        )
          throw aa(t);
        return Fi(l) ? (t.lanes = 32) : (t.lanes = 536870912), null;
      }
      var i = u.children;
      return (
        (u = u.fallback),
        e
          ? (ca(),
            (e = t.mode),
            (i = yn({ mode: "hidden", children: i }, e)),
            (u = Na(u, e, a, null)),
            (i.return = t),
            (u.return = t),
            (i.sibling = u),
            (t.child = i),
            (u = t.child),
            (u.memoizedState = di(a)),
            (u.childLanes = mi(l, f, a)),
            (t.memoizedState = yi),
            ae(null, u))
          : (ia(t), hi(t, i))
      );
    }
    var c = l.memoizedState;
    if (c !== null && ((i = c.dehydrated), i !== null)) {
      if (n)
        t.flags & 256
          ? (ia(t), (t.flags &= -257), (t = gi(l, t, a)))
          : t.memoizedState !== null
          ? (ca(), (t.child = l.child), (t.flags |= 128), (t = null))
          : (ca(),
            (i = u.fallback),
            (e = t.mode),
            (u = yn({ mode: "visible", children: u.children }, e)),
            (i = Na(i, e, a, null)),
            (i.flags |= 2),
            (u.return = t),
            (i.return = t),
            (u.sibling = i),
            (t.child = u),
            ja(t, l.child, null, a),
            (u = t.child),
            (u.memoizedState = di(a)),
            (u.childLanes = mi(l, f, a)),
            (t.memoizedState = yi),
            (t = ae(null, u)));
      else if ((ia(t), Fi(i))) {
        if (((f = i.nextSibling && i.nextSibling.dataset), f)) var m = f.dgst;
        (f = m),
          (u = Error(v(419))),
          (u.stack = ""),
          (u.digest = f),
          Vu({ value: u, source: null, stack: null }),
          (t = gi(l, t, a));
      } else if (
        (El || fu(l, t, a, !1), (f = (a & l.childLanes) !== 0), El || f)
      ) {
        if (
          ((f = vl),
          f !== null && ((u = Ec(f, a)), u !== 0 && u !== c.retryLane))
        )
          throw ((c.retryLane = u), Ua(l, u), $l(f, l, u), oi);
        $i(i) || Tn(), (t = gi(l, t, a));
      } else
        $i(i)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = c.treeContext),
            (yl = gt(i.nextSibling)),
            (Ul = t),
            (F = !0),
            (ta = null),
            (mt = !1),
            l !== null && r0(t, l),
            (t = hi(t, u.children)),
            (t.flags |= 4096));
      return t;
    }
    return e
      ? (ca(),
        (i = u.fallback),
        (e = t.mode),
        (c = l.child),
        (m = c.sibling),
        (u = qt(c, { mode: "hidden", children: u.children })),
        (u.subtreeFlags = c.subtreeFlags & 65011712),
        m !== null ? (i = qt(m, i)) : ((i = Na(i, e, a, null)), (i.flags |= 2)),
        (i.return = t),
        (u.return = t),
        (u.sibling = i),
        (t.child = u),
        ae(null, u),
        (u = t.child),
        (i = l.child.memoizedState),
        i === null
          ? (i = di(a))
          : ((e = i.cachePool),
            e !== null
              ? ((c = zl._currentValue),
                (e = e.parent !== c ? { parent: c, pool: c } : e))
              : (e = _0()),
            (i = { baseLanes: i.baseLanes | a, cachePool: e })),
        (u.memoizedState = i),
        (u.childLanes = mi(l, f, a)),
        (t.memoizedState = yi),
        ae(l.child, u))
      : (ia(t),
        (a = l.child),
        (l = a.sibling),
        (a = qt(a, { mode: "visible", children: u.children })),
        (a.return = t),
        (a.sibling = null),
        l !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [l]), (t.flags |= 16)) : f.push(l)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function hi(l, t) {
    return (
      (t = yn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function yn(l, t) {
    return (l = tt(22, l, null, t)), (l.lanes = 0), l;
  }
  function gi(l, t, a) {
    return (
      ja(t, l.child, null, a),
      (l = hi(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function js(l, t, a) {
    l.lanes |= t;
    var u = l.alternate;
    u !== null && (u.lanes |= t), Hf(l.return, t, a);
  }
  function Si(l, t, a, u, e, n) {
    var f = l.memoizedState;
    f === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: u,
          tail: a,
          tailMode: e,
          treeForkCount: n,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = u),
        (f.tail = a),
        (f.tailMode = e),
        (f.treeForkCount = n));
  }
  function xs(l, t, a) {
    var u = t.pendingProps,
      e = u.revealOrder,
      n = u.tail;
    u = u.children;
    var f = rl.current,
      i = (f & 2) !== 0;
    if (
      (i ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      M(rl, f),
      Hl(l, t, u, a),
      (u = F ? Lu : 0),
      !i && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && js(l, a, t);
        else if (l.tag === 19) js(l, a, t);
        else if (l.child !== null) {
          (l.child.return = l), (l = l.child);
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        (l.sibling.return = l.return), (l = l.sibling);
      }
    switch (e) {
      case "forwards":
        for (a = t.child, e = null; a !== null; )
          (l = a.alternate),
            l !== null && Pe(l) === null && (e = a),
            (a = a.sibling);
        (a = e),
          a === null
            ? ((e = t.child), (t.child = null))
            : ((e = a.sibling), (a.sibling = null)),
          Si(t, !1, e, a, n, u);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, e = t.child, t.child = null; e !== null; ) {
          if (((l = e.alternate), l !== null && Pe(l) === null)) {
            t.child = e;
            break;
          }
          (l = e.sibling), (e.sibling = a), (a = e), (e = l);
        }
        Si(t, !0, a, null, n, u);
        break;
      case "together":
        Si(t, !1, null, null, void 0, u);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Xt(l, t, a) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (va |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((fu(l, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(v(153));
    if (t.child !== null) {
      for (
        l = t.child, a = qt(l, l.pendingProps), t.child = a, a.return = t;
        l.sibling !== null;

      )
        (l = l.sibling),
          (a = a.sibling = qt(l, l.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function ri(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Ke(l)));
  }
  function Wy(l, t, a) {
    switch (t.tag) {
      case 3:
        xl(t, t.stateNode.containerInfo),
          ua(t, zl, l.memoizedState.cache),
          Ha();
        break;
      case 27:
      case 5:
        Du(t);
        break;
      case 4:
        xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ua(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return (t.flags |= 128), Lf(t), null;
        break;
      case 13:
        var u = t.memoizedState;
        if (u !== null)
          return u.dehydrated !== null
            ? (ia(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
            ? Ys(l, t, a)
            : (ia(t), (l = Xt(l, t, a)), l !== null ? l.sibling : null);
        ia(t);
        break;
      case 19:
        var e = (l.flags & 128) !== 0;
        if (
          ((u = (a & t.childLanes) !== 0),
          u || (fu(l, t, a, !1), (u = (a & t.childLanes) !== 0)),
          e)
        ) {
          if (u) return xs(l, t, a);
          t.flags |= 128;
        }
        if (
          ((e = t.memoizedState),
          e !== null &&
            ((e.rendering = null), (e.tail = null), (e.lastEffect = null)),
          M(rl, rl.current),
          u)
        )
          break;
        return null;
      case 22:
        return (t.lanes = 0), Ns(l, t, a, t.pendingProps);
      case 24:
        ua(t, zl, l.memoizedState.cache);
    }
    return Xt(l, t, a);
  }
  function Gs(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) El = !0;
      else {
        if (!ri(l, a) && (t.flags & 128) === 0) return (El = !1), Wy(l, t, a);
        El = (l.flags & 131072) !== 0;
      }
    else (El = !1), F && (t.flags & 1048576) !== 0 && S0(t, Lu, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var u = t.pendingProps;
          if (((l = Ba(t.elementType)), (t.type = l), typeof l == "function"))
            Af(l)
              ? ((u = Ga(l, u)), (t.tag = 1), (t = qs(null, t, l, u, a)))
              : ((t.tag = 0), (t = vi(null, t, l, u, a)));
          else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === it) {
                (t.tag = 11), (t = ps(null, t, l, u, a));
                break l;
              } else if (e === $) {
                (t.tag = 14), (t = Ds(null, t, l, u, a));
                break l;
              }
            }
            throw ((t = Nt(l) || l), Error(v(306, t, "")));
          }
        }
        return t;
      case 0:
        return vi(l, t, t.type, t.pendingProps, a);
      case 1:
        return (u = t.type), (e = Ga(u, t.pendingProps)), qs(l, t, u, e, a);
      case 3:
        l: {
          if ((xl(t, t.stateNode.containerInfo), l === null))
            throw Error(v(387));
          u = t.pendingProps;
          var n = t.memoizedState;
          (e = n.element), xf(l, t), ku(t, u, null, a);
          var f = t.memoizedState;
          if (
            ((u = f.cache),
            ua(t, zl, u),
            u !== n.cache && Rf(t, [zl], a, !0),
            Fu(),
            (u = f.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: u, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = Bs(l, t, u, a);
              break l;
            } else if (u !== e) {
              (e = vt(Error(v(424)), t)), Vu(e), (t = Bs(l, t, u, a));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (
                yl = gt(l.firstChild),
                  Ul = t,
                  F = !0,
                  ta = null,
                  mt = !0,
                  a = N0(t, null, u, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((Ha(), u === e)) {
              t = Xt(l, t, a);
              break l;
            }
            Hl(l, t, u, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          vn(l, t),
          l === null
            ? (a = ko(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : F ||
                ((a = t.type),
                (l = t.pendingProps),
                (u = Dn(V.current).createElement(a)),
                (u[Dl] = t),
                (u[Ll] = l),
                Rl(u, a, l),
                Ol(u),
                (t.stateNode = u))
            : (t.memoizedState = ko(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState
              )),
          null
        );
      case 27:
        return (
          Du(t),
          l === null &&
            F &&
            ((u = t.stateNode = Wo(t.type, t.pendingProps, V.current)),
            (Ul = t),
            (mt = !0),
            (e = yl),
            ga(t.type) ? ((ki = e), (yl = gt(u.firstChild))) : (yl = e)),
          Hl(l, t, t.pendingProps.children, a),
          vn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            F &&
            ((e = u = yl) &&
              ((u = _d(u, t.type, t.pendingProps, mt)),
              u !== null
                ? ((t.stateNode = u),
                  (Ul = t),
                  (yl = gt(u.firstChild)),
                  (mt = !1),
                  (e = !0))
                : (e = !1)),
            e || aa(t)),
          Du(t),
          (e = t.type),
          (n = t.pendingProps),
          (f = l !== null ? l.memoizedProps : null),
          (u = n.children),
          Ji(e, n) ? (u = null) : f !== null && Ji(e, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((e = Kf(l, t, Gy, null, null, a)), (Se._currentValue = e)),
          vn(l, t),
          Hl(l, t, u, a),
          t.child
        );
      case 6:
        return (
          l === null &&
            F &&
            ((l = a = yl) &&
              ((a = Od(a, t.pendingProps, mt)),
              a !== null
                ? ((t.stateNode = a), (Ul = t), (yl = null), (l = !0))
                : (l = !1)),
            l || aa(t)),
          null
        );
      case 13:
        return Ys(l, t, a);
      case 4:
        return (
          xl(t, t.stateNode.containerInfo),
          (u = t.pendingProps),
          l === null ? (t.child = ja(t, null, u, a)) : Hl(l, t, u, a),
          t.child
        );
      case 11:
        return ps(l, t, t.type, t.pendingProps, a);
      case 7:
        return Hl(l, t, t.pendingProps, a), t.child;
      case 8:
        return Hl(l, t, t.pendingProps.children, a), t.child;
      case 12:
        return Hl(l, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (u = t.pendingProps),
          ua(t, t.type, u.value),
          Hl(l, t, u.children, a),
          t.child
        );
      case 9:
        return (
          (e = t.type._context),
          (u = t.pendingProps.children),
          Ca(t),
          (e = Nl(e)),
          (u = u(e)),
          (t.flags |= 1),
          Hl(l, t, u, a),
          t.child
        );
      case 14:
        return Ds(l, t, t.type, t.pendingProps, a);
      case 15:
        return Us(l, t, t.type, t.pendingProps, a);
      case 19:
        return xs(l, t, a);
      case 31:
        return wy(l, t, a);
      case 22:
        return Ns(l, t, a, t.pendingProps);
      case 24:
        return (
          Ca(t),
          (u = Nl(zl)),
          l === null
            ? ((e = Bf()),
              e === null &&
                ((e = vl),
                (n = Cf()),
                (e.pooledCache = n),
                n.refCount++,
                n !== null && (e.pooledCacheLanes |= a),
                (e = n)),
              (t.memoizedState = { parent: u, cache: e }),
              jf(t),
              ua(t, zl, e))
            : ((l.lanes & a) !== 0 && (xf(l, t), ku(t, null, null, a), Fu()),
              (e = l.memoizedState),
              (n = t.memoizedState),
              e.parent !== u
                ? ((e = { parent: u, cache: u }),
                  (t.memoizedState = e),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = e),
                  ua(t, zl, u))
                : ((u = n.cache),
                  ua(t, zl, u),
                  u !== e.cache && Rf(t, [zl], a, !0))),
          Hl(l, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(v(156, t.tag));
  }
  function Qt(l) {
    l.flags |= 4;
  }
  function bi(l, t, a, u, e) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (e & 335544128) === e))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (yo()) l.flags |= 8192;
        else throw ((Ya = $e), Yf);
    } else l.flags &= -16777217;
  }
  function Xs(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !av(t)))
      if (yo()) l.flags |= 8192;
      else throw ((Ya = $e), Yf);
  }
  function dn(l, t) {
    t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? bc() : 536870912), (l.lanes |= t), (ru |= t));
  }
  function ue(l, t) {
    if (!F)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (l.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = l.tail;
          for (var u = null; a !== null; )
            a.alternate !== null && (u = a), (a = a.sibling);
          u === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (u.sibling = null);
      }
  }
  function dl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      a = 0,
      u = 0;
    if (t)
      for (var e = l.child; e !== null; )
        (a |= e.lanes | e.childLanes),
          (u |= e.subtreeFlags & 65011712),
          (u |= e.flags & 65011712),
          (e.return = l),
          (e = e.sibling);
    else
      for (e = l.child; e !== null; )
        (a |= e.lanes | e.childLanes),
          (u |= e.subtreeFlags),
          (u |= e.flags),
          (e.return = l),
          (e = e.sibling);
    return (l.subtreeFlags |= u), (l.childLanes = a), t;
  }
  function $y(l, t, a) {
    var u = t.pendingProps;
    switch ((pf(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return dl(t), null;
      case 1:
        return dl(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (u = null),
          l !== null && (u = l.memoizedState.cache),
          t.memoizedState.cache !== u && (t.flags |= 2048),
          jt(zl),
          Sl(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (l === null || l.child === null) &&
            (nu(t)
              ? Qt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Uf())),
          dl(t),
          null
        );
      case 26:
        var e = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Qt(t),
              n !== null ? (dl(t), Xs(t, n)) : (dl(t), bi(t, e, null, u, a)))
            : n
            ? n !== l.memoizedState
              ? (Qt(t), dl(t), Xs(t, n))
              : (dl(t), (t.flags &= -16777217))
            : ((l = l.memoizedProps),
              l !== u && Qt(t),
              dl(t),
              bi(t, e, l, u, a)),
          null
        );
      case 27:
        if (
          (Ae(t),
          (a = V.current),
          (e = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== u && Qt(t);
        else {
          if (!u) {
            if (t.stateNode === null) throw Error(v(166));
            return dl(t), null;
          }
          (l = N.current),
            nu(t) ? b0(t) : ((l = Wo(e, u, a)), (t.stateNode = l), Qt(t));
        }
        return dl(t), null;
      case 5:
        if ((Ae(t), (e = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== u && Qt(t);
        else {
          if (!u) {
            if (t.stateNode === null) throw Error(v(166));
            return dl(t), null;
          }
          if (((n = N.current), nu(t))) b0(t);
          else {
            var f = Dn(V.current);
            switch (n) {
              case 1:
                n = f.createElementNS("http://www.w3.org/2000/svg", e);
                break;
              case 2:
                n = f.createElementNS("http://www.w3.org/1998/Math/MathML", e);
                break;
              default:
                switch (e) {
                  case "svg":
                    n = f.createElementNS("http://www.w3.org/2000/svg", e);
                    break;
                  case "math":
                    n = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      e
                    );
                    break;
                  case "script":
                    (n = f.createElement("div")),
                      (n.innerHTML = "<script></script>"),
                      (n = n.removeChild(n.firstChild));
                    break;
                  case "select":
                    (n =
                      typeof u.is == "string"
                        ? f.createElement("select", { is: u.is })
                        : f.createElement("select")),
                      u.multiple
                        ? (n.multiple = !0)
                        : u.size && (n.size = u.size);
                    break;
                  default:
                    n =
                      typeof u.is == "string"
                        ? f.createElement(e, { is: u.is })
                        : f.createElement(e);
                }
            }
            (n[Dl] = t), (n[Ll] = u);
            l: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) n.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                (f.child.return = f), (f = f.child);
                continue;
              }
              if (f === t) break l;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break l;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
            t.stateNode = n;
            l: switch ((Rl(n, e, u), e)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                u = !!u.autoFocus;
                break l;
              case "img":
                u = !0;
                break l;
              default:
                u = !1;
            }
            u && Qt(t);
          }
        }
        return (
          dl(t),
          bi(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, a),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== u && Qt(t);
        else {
          if (typeof u != "string" && t.stateNode === null) throw Error(v(166));
          if (((l = V.current), nu(t))) {
            if (
              ((l = t.stateNode),
              (a = t.memoizedProps),
              (u = null),
              (e = Ul),
              e !== null)
            )
              switch (e.tag) {
                case 27:
                case 5:
                  u = e.memoizedProps;
              }
            (l[Dl] = t),
              (l = !!(
                l.nodeValue === a ||
                (u !== null && u.suppressHydrationWarning === !0) ||
                jo(l.nodeValue, a)
              )),
              l || aa(t, !0);
          } else (l = Dn(l).createTextNode(u)), (l[Dl] = t), (t.stateNode = l);
        }
        return dl(t), null;
      case 31:
        if (((a = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((u = nu(t)), a !== null)) {
            if (l === null) {
              if (!u) throw Error(v(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(v(557));
              l[Dl] = t;
            } else
              Ha(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            dl(t), (l = !1);
          } else
            (a = Uf()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = a),
              (l = !0);
          if (!l) return t.flags & 256 ? (ut(t), t) : (ut(t), null);
          if ((t.flags & 128) !== 0) throw Error(v(558));
        }
        return dl(t), null;
      case 13:
        if (
          ((u = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((e = nu(t)), u !== null && u.dehydrated !== null)) {
            if (l === null) {
              if (!e) throw Error(v(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(v(317));
              e[Dl] = t;
            } else
              Ha(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            dl(t), (e = !1);
          } else
            (e = Uf()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = e),
              (e = !0);
          if (!e) return t.flags & 256 ? (ut(t), t) : (ut(t), null);
        }
        return (
          ut(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = u !== null),
              (l = l !== null && l.memoizedState !== null),
              a &&
                ((u = t.child),
                (e = null),
                u.alternate !== null &&
                  u.alternate.memoizedState !== null &&
                  u.alternate.memoizedState.cachePool !== null &&
                  (e = u.alternate.memoizedState.cachePool.pool),
                (n = null),
                u.memoizedState !== null &&
                  u.memoizedState.cachePool !== null &&
                  (n = u.memoizedState.cachePool.pool),
                n !== e && (u.flags |= 2048)),
              a !== l && a && (t.child.flags |= 8192),
              dn(t, t.updateQueue),
              dl(t),
              null)
        );
      case 4:
        return Sl(), l === null && Qi(t.stateNode.containerInfo), dl(t), null;
      case 10:
        return jt(t.type), dl(t), null;
      case 19:
        if ((T(rl), (u = t.memoizedState), u === null)) return dl(t), null;
        if (((e = (t.flags & 128) !== 0), (n = u.rendering), n === null))
          if (e) ue(u, !1);
          else {
            if (gl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = Pe(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      ue(u, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      dn(t, l),
                      t.subtreeFlags = 0,
                      l = a,
                      a = t.child;
                    a !== null;

                  )
                    m0(a, l), (a = a.sibling);
                  return (
                    M(rl, (rl.current & 1) | 2),
                    F && Bt(t, u.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            u.tail !== null &&
              kl() > rn &&
              ((t.flags |= 128), (e = !0), ue(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!e)
            if (((l = Pe(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (e = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                dn(t, l),
                ue(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !n.alternate &&
                  !F)
              )
                return dl(t), null;
            } else
              2 * kl() - u.renderingStartTime > rn &&
                a !== 536870912 &&
                ((t.flags |= 128), (e = !0), ue(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = u.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (u.last = n));
        }
        return u.tail !== null
          ? ((l = u.tail),
            (u.rendering = l),
            (u.tail = l.sibling),
            (u.renderingStartTime = kl()),
            (l.sibling = null),
            (a = rl.current),
            M(rl, e ? (a & 1) | 2 : a & 1),
            F && Bt(t, u.treeForkCount),
            l)
          : (dl(t), null);
      case 22:
      case 23:
        return (
          ut(t),
          Zf(),
          (u = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== u && (t.flags |= 8192)
            : u && (t.flags |= 8192),
          u
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (dl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : dl(t),
          (a = t.updateQueue),
          a !== null && dn(t, a.retryQueue),
          (a = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (a = l.memoizedState.cachePool.pool),
          (u = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (u = t.memoizedState.cachePool.pool),
          u !== a && (t.flags |= 2048),
          l !== null && T(qa),
          null
        );
      case 24:
        return (
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          jt(zl),
          dl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(v(156, t.tag));
  }
  function Fy(l, t) {
    switch ((pf(t), t.tag)) {
      case 1:
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          jt(zl),
          Sl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Ae(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if ((ut(t), t.alternate === null)) throw Error(v(340));
          Ha();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (ut(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(v(340));
          Ha();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return T(rl), null;
      case 4:
        return Sl(), null;
      case 10:
        return jt(t.type), null;
      case 22:
      case 23:
        return (
          ut(t),
          Zf(),
          l !== null && T(qa),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return jt(zl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Qs(l, t) {
    switch ((pf(t), t.tag)) {
      case 3:
        jt(zl), Sl();
        break;
      case 26:
      case 27:
      case 5:
        Ae(t);
        break;
      case 4:
        Sl();
        break;
      case 31:
        t.memoizedState !== null && ut(t);
        break;
      case 13:
        ut(t);
        break;
      case 19:
        T(rl);
        break;
      case 10:
        jt(t.type);
        break;
      case 22:
      case 23:
        ut(t), Zf(), l !== null && T(qa);
        break;
      case 24:
        jt(zl);
    }
  }
  function ee(l, t) {
    try {
      var a = t.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var e = u.next;
        a = e;
        do {
          if ((a.tag & l) === l) {
            u = void 0;
            var n = a.create,
              f = a.inst;
            (u = n()), (f.destroy = u);
          }
          a = a.next;
        } while (a !== e);
      }
    } catch (i) {
      nl(t, t.return, i);
    }
  }
  function sa(l, t, a) {
    try {
      var u = t.updateQueue,
        e = u !== null ? u.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        u = n;
        do {
          if ((u.tag & l) === l) {
            var f = u.inst,
              i = f.destroy;
            if (i !== void 0) {
              (f.destroy = void 0), (e = t);
              var c = a,
                m = i;
              try {
                m();
              } catch (S) {
                nl(e, c, S);
              }
            }
          }
          u = u.next;
        } while (u !== n);
      }
    } catch (S) {
      nl(t, t.return, S);
    }
  }
  function Zs(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        R0(t, a);
      } catch (u) {
        nl(l, l.return, u);
      }
    }
  }
  function Ls(l, t, a) {
    (a.props = Ga(l.type, l.memoizedProps)), (a.state = l.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (u) {
      nl(l, t, u);
    }
  }
  function ne(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var u = l.stateNode;
            break;
          case 30:
            u = l.stateNode;
            break;
          default:
            u = l.stateNode;
        }
        typeof a == "function" ? (l.refCleanup = a(u)) : (a.current = u);
      }
    } catch (e) {
      nl(l, t, e);
    }
  }
  function pt(l, t) {
    var a = l.ref,
      u = l.refCleanup;
    if (a !== null)
      if (typeof u == "function")
        try {
          u();
        } catch (e) {
          nl(l, t, e);
        } finally {
          (l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (e) {
          nl(l, t, e);
        }
      else a.current = null;
  }
  function Vs(l) {
    var t = l.type,
      a = l.memoizedProps,
      u = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && u.focus();
          break l;
        case "img":
          a.src ? (u.src = a.src) : a.srcSet && (u.srcset = a.srcSet);
      }
    } catch (e) {
      nl(l, l.return, e);
    }
  }
  function zi(l, t, a) {
    try {
      var u = l.stateNode;
      rd(u, l.type, a, t), (u[Ll] = t);
    } catch (e) {
      nl(l, l.return, e);
    }
  }
  function Ks(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && ga(l.type)) ||
      l.tag === 4
    );
  }
  function Ti(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || Ks(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;

      ) {
        if (
          (l.tag === 27 && ga(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        (l.child.return = l), (l = l.child);
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ei(l, t, a) {
    var u = l.tag;
    if (u === 5 || u === 6)
      (l = l.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
            ).insertBefore(l, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
            t.appendChild(l),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = Rt));
    else if (
      u !== 4 &&
      (u === 27 && ga(l.type) && ((a = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (Ei(l, t, a), l = l.sibling; l !== null; )
        Ei(l, t, a), (l = l.sibling);
  }
  function mn(l, t, a) {
    var u = l.tag;
    if (u === 5 || u === 6)
      (l = l.stateNode), t ? a.insertBefore(l, t) : a.appendChild(l);
    else if (
      u !== 4 &&
      (u === 27 && ga(l.type) && (a = l.stateNode), (l = l.child), l !== null)
    )
      for (mn(l, t, a), l = l.sibling; l !== null; )
        mn(l, t, a), (l = l.sibling);
  }
  function Js(l) {
    var t = l.stateNode,
      a = l.memoizedProps;
    try {
      for (var u = l.type, e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      Rl(t, u, a), (t[Dl] = l), (t[Ll] = a);
    } catch (n) {
      nl(l, l.return, n);
    }
  }
  var Zt = !1,
    Al = !1,
    Ai = !1,
    ws = typeof WeakSet == "function" ? WeakSet : Set,
    Ml = null;
  function ky(l, t) {
    if (((l = l.containerInfo), (Vi = Bn), (l = n0(l)), gf(l))) {
      if ("selectionStart" in l)
        var a = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          a = ((a = l.ownerDocument) && a.defaultView) || window;
          var u = a.getSelection && a.getSelection();
          if (u && u.rangeCount !== 0) {
            a = u.anchorNode;
            var e = u.anchorOffset,
              n = u.focusNode;
            u = u.focusOffset;
            try {
              a.nodeType, n.nodeType;
            } catch {
              a = null;
              break l;
            }
            var f = 0,
              i = -1,
              c = -1,
              m = 0,
              S = 0,
              z = l,
              h = null;
            t: for (;;) {
              for (
                var g;
                z !== a || (e !== 0 && z.nodeType !== 3) || (i = f + e),
                  z !== n || (u !== 0 && z.nodeType !== 3) || (c = f + u),
                  z.nodeType === 3 && (f += z.nodeValue.length),
                  (g = z.firstChild) !== null;

              )
                (h = z), (z = g);
              for (;;) {
                if (z === l) break t;
                if (
                  (h === a && ++m === e && (i = f),
                  h === n && ++S === u && (c = f),
                  (g = z.nextSibling) !== null)
                )
                  break;
                (z = h), (h = z.parentNode);
              }
              z = g;
            }
            a = i === -1 || c === -1 ? null : { start: i, end: c };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Ki = { focusedElem: l, selectionRange: a }, Bn = !1, Ml = t;
      Ml !== null;

    )
      if (
        ((t = Ml), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        (l.return = t), (Ml = l);
      else
        for (; Ml !== null; ) {
          switch (((t = Ml), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue),
                (l = l !== null ? l.events : null),
                l !== null)
              )
                for (a = 0; a < l.length; a++)
                  (e = l[a]), (e.ref.impl = e.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                (l = void 0),
                  (a = t),
                  (e = n.memoizedProps),
                  (n = n.memoizedState),
                  (u = a.stateNode);
                try {
                  var D = Ga(a.type, e);
                  (l = u.getSnapshotBeforeUpdate(D, n)),
                    (u.__reactInternalSnapshotBeforeUpdate = l);
                } catch (B) {
                  nl(a, a.return, B);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (a = l.nodeType), a === 9)
                )
                  Wi(l);
                else if (a === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wi(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(v(163));
          }
          if (((l = t.sibling), l !== null)) {
            (l.return = t.return), (Ml = l);
            break;
          }
          Ml = t.return;
        }
  }
  function Ws(l, t, a) {
    var u = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Vt(l, a), u & 4 && ee(5, a);
        break;
      case 1:
        if ((Vt(l, a), u & 4))
          if (((l = a.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (f) {
              nl(a, a.return, f);
            }
          else {
            var e = Ga(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(e, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              nl(a, a.return, f);
            }
          }
        u & 64 && Zs(a), u & 512 && ne(a, a.return);
        break;
      case 3:
        if ((Vt(l, a), u & 64 && ((l = a.updateQueue), l !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            R0(l, t);
          } catch (f) {
            nl(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && u & 4 && Js(a);
      case 26:
      case 5:
        Vt(l, a), t === null && u & 4 && Vs(a), u & 512 && ne(a, a.return);
        break;
      case 12:
        Vt(l, a);
        break;
      case 31:
        Vt(l, a), u & 4 && ks(l, a);
        break;
      case 13:
        Vt(l, a),
          u & 4 && Is(l, a),
          u & 64 &&
            ((l = a.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((a = fd.bind(null, a)), Md(l, a))));
        break;
      case 22:
        if (((u = a.memoizedState !== null || Zt), !u)) {
          (t = (t !== null && t.memoizedState !== null) || Al), (e = Zt);
          var n = Al;
          (Zt = u),
            (Al = t) && !n ? Kt(l, a, (a.subtreeFlags & 8772) !== 0) : Vt(l, a),
            (Zt = e),
            (Al = n);
        }
        break;
      case 30:
        break;
      default:
        Vt(l, a);
    }
  }
  function $s(l) {
    var t = l.alternate;
    t !== null && ((l.alternate = null), $s(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && In(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null);
  }
  var ml = null,
    Kl = !1;
  function Lt(l, t, a) {
    for (a = a.child; a !== null; ) Fs(l, t, a), (a = a.sibling);
  }
  function Fs(l, t, a) {
    if (Il && typeof Il.onCommitFiberUnmount == "function")
      try {
        Il.onCommitFiberUnmount(Uu, a);
      } catch {}
    switch (a.tag) {
      case 26:
        Al || pt(a, t),
          Lt(l, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        Al || pt(a, t);
        var u = ml,
          e = Kl;
        ga(a.type) && ((ml = a.stateNode), (Kl = !1)),
          Lt(l, t, a),
          me(a.stateNode),
          (ml = u),
          (Kl = e);
        break;
      case 5:
        Al || pt(a, t);
      case 6:
        if (
          ((u = ml),
          (e = Kl),
          (ml = null),
          Lt(l, t, a),
          (ml = u),
          (Kl = e),
          ml !== null)
        )
          if (Kl)
            try {
              (ml.nodeType === 9
                ? ml.body
                : ml.nodeName === "HTML"
                ? ml.ownerDocument.body
                : ml
              ).removeChild(a.stateNode);
            } catch (n) {
              nl(a, t, n);
            }
          else
            try {
              ml.removeChild(a.stateNode);
            } catch (n) {
              nl(a, t, n);
            }
        break;
      case 18:
        ml !== null &&
          (Kl
            ? ((l = ml),
              Lo(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l,
                a.stateNode
              ),
              Mu(l))
            : Lo(ml, a.stateNode));
        break;
      case 4:
        (u = ml),
          (e = Kl),
          (ml = a.stateNode.containerInfo),
          (Kl = !0),
          Lt(l, t, a),
          (ml = u),
          (Kl = e);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, a, t), Al || sa(4, a, t), Lt(l, t, a);
        break;
      case 1:
        Al ||
          (pt(a, t),
          (u = a.stateNode),
          typeof u.componentWillUnmount == "function" && Ls(a, t, u)),
          Lt(l, t, a);
        break;
      case 21:
        Lt(l, t, a);
        break;
      case 22:
        (Al = (u = Al) || a.memoizedState !== null), Lt(l, t, a), (Al = u);
        break;
      default:
        Lt(l, t, a);
    }
  }
  function ks(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        Mu(l);
      } catch (a) {
        nl(t, t.return, a);
      }
    }
  }
  function Is(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        Mu(l);
      } catch (a) {
        nl(t, t.return, a);
      }
  }
  function Iy(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new ws()), t;
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new ws()),
          t
        );
      default:
        throw Error(v(435, l.tag));
    }
  }
  function hn(l, t) {
    var a = Iy(l);
    t.forEach(function (u) {
      if (!a.has(u)) {
        a.add(u);
        var e = id.bind(null, l, u);
        u.then(e, e);
      }
    });
  }
  function Jl(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var e = a[u],
          n = l,
          f = t,
          i = f;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ga(i.type)) {
                (ml = i.stateNode), (Kl = !1);
                break l;
              }
              break;
            case 5:
              (ml = i.stateNode), (Kl = !1);
              break l;
            case 3:
            case 4:
              (ml = i.stateNode.containerInfo), (Kl = !0);
              break l;
          }
          i = i.return;
        }
        if (ml === null) throw Error(v(160));
        Fs(n, f, e),
          (ml = null),
          (Kl = !1),
          (n = e.alternate),
          n !== null && (n.return = null),
          (e.return = null);
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) Ps(t, l), (t = t.sibling);
  }
  var zt = null;
  function Ps(l, t) {
    var a = l.alternate,
      u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Jl(t, l),
          wl(l),
          u & 4 && (sa(3, l, l.return), ee(3, l), sa(5, l, l.return));
        break;
      case 1:
        Jl(t, l),
          wl(l),
          u & 512 && (Al || a === null || pt(a, a.return)),
          u & 64 &&
            Zt &&
            ((l = l.updateQueue),
            l !== null &&
              ((u = l.callbacks),
              u !== null &&
                ((a = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = a === null ? u : a.concat(u)))));
        break;
      case 26:
        var e = zt;
        if (
          (Jl(t, l),
          wl(l),
          u & 512 && (Al || a === null || pt(a, a.return)),
          u & 4)
        ) {
          var n = a !== null ? a.memoizedState : null;
          if (((u = l.memoizedState), a === null))
            if (u === null)
              if (l.stateNode === null) {
                l: {
                  (u = l.type),
                    (a = l.memoizedProps),
                    (e = e.ownerDocument || e);
                  t: switch (u) {
                    case "title":
                      (n = e.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Ru] ||
                          n[Dl] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = e.createElement(u)),
                          e.head.insertBefore(
                            n,
                            e.querySelector("head > title")
                          )),
                        Rl(n, u, a),
                        (n[Dl] = l),
                        Ol(n),
                        (u = n);
                      break l;
                    case "link":
                      var f = lv("link", "href", e).get(u + (a.href || ""));
                      if (f) {
                        for (var i = 0; i < f.length; i++)
                          if (
                            ((n = f[i]),
                            n.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              n.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              n.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              n.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            f.splice(i, 1);
                            break t;
                          }
                      }
                      (n = e.createElement(u)),
                        Rl(n, u, a),
                        e.head.appendChild(n);
                      break;
                    case "meta":
                      if (
                        (f = lv("meta", "content", e).get(
                          u + (a.content || "")
                        ))
                      ) {
                        for (i = 0; i < f.length; i++)
                          if (
                            ((n = f[i]),
                            n.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              n.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              n.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              n.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            f.splice(i, 1);
                            break t;
                          }
                      }
                      (n = e.createElement(u)),
                        Rl(n, u, a),
                        e.head.appendChild(n);
                      break;
                    default:
                      throw Error(v(468, u));
                  }
                  (n[Dl] = l), Ol(n), (u = n);
                }
                l.stateNode = u;
              } else tv(e, l.type, l.stateNode);
            else l.stateNode = Po(e, u, l.memoizedProps);
          else
            n !== u
              ? (n === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : n.count--,
                u === null
                  ? tv(e, l.type, l.stateNode)
                  : Po(e, u, l.memoizedProps))
              : u === null &&
                l.stateNode !== null &&
                zi(l, l.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        Jl(t, l),
          wl(l),
          u & 512 && (Al || a === null || pt(a, a.return)),
          a !== null && u & 4 && zi(l, l.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (Jl(t, l),
          wl(l),
          u & 512 && (Al || a === null || pt(a, a.return)),
          l.flags & 32)
        ) {
          e = l.stateNode;
          try {
            $a(e, "");
          } catch (D) {
            nl(l, l.return, D);
          }
        }
        u & 4 &&
          l.stateNode != null &&
          ((e = l.memoizedProps), zi(l, e, a !== null ? a.memoizedProps : e)),
          u & 1024 && (Ai = !0);
        break;
      case 6:
        if ((Jl(t, l), wl(l), u & 4)) {
          if (l.stateNode === null) throw Error(v(162));
          (u = l.memoizedProps), (a = l.stateNode);
          try {
            a.nodeValue = u;
          } catch (D) {
            nl(l, l.return, D);
          }
        }
        break;
      case 3:
        if (
          ((Hn = null),
          (e = zt),
          (zt = Un(t.containerInfo)),
          Jl(t, l),
          (zt = e),
          wl(l),
          u & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Mu(t.containerInfo);
          } catch (D) {
            nl(l, l.return, D);
          }
        Ai && ((Ai = !1), lo(l));
        break;
      case 4:
        (u = zt),
          (zt = Un(l.stateNode.containerInfo)),
          Jl(t, l),
          wl(l),
          (zt = u);
        break;
      case 12:
        Jl(t, l), wl(l);
        break;
      case 31:
        Jl(t, l),
          wl(l),
          u & 4 &&
            ((u = l.updateQueue),
            u !== null && ((l.updateQueue = null), hn(l, u)));
        break;
      case 13:
        Jl(t, l),
          wl(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (Sn = kl()),
          u & 4 &&
            ((u = l.updateQueue),
            u !== null && ((l.updateQueue = null), hn(l, u)));
        break;
      case 22:
        e = l.memoizedState !== null;
        var c = a !== null && a.memoizedState !== null,
          m = Zt,
          S = Al;
        if (
          ((Zt = m || e),
          (Al = S || c),
          Jl(t, l),
          (Al = S),
          (Zt = m),
          wl(l),
          u & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = e ? t._visibility & -2 : t._visibility | 1,
              e && (a === null || c || Zt || Al || Xa(l)),
              a = null,
              t = l;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                c = a = t;
                try {
                  if (((n = c.stateNode), e))
                    (f = n.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none");
                  else {
                    i = c.stateNode;
                    var z = c.memoizedProps.style,
                      h =
                        z != null && z.hasOwnProperty("display")
                          ? z.display
                          : null;
                    i.style.display =
                      h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (D) {
                  nl(c, c.return, D);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                c = t;
                try {
                  c.stateNode.nodeValue = e ? "" : c.memoizedProps;
                } catch (D) {
                  nl(c, c.return, D);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                c = t;
                try {
                  var g = c.stateNode;
                  e ? Vo(g, !0) : Vo(c.stateNode, !1);
                } catch (D) {
                  nl(c, c.return, D);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        u & 4 &&
          ((u = l.updateQueue),
          u !== null &&
            ((a = u.retryQueue),
            a !== null && ((u.retryQueue = null), hn(l, a))));
        break;
      case 19:
        Jl(t, l),
          wl(l),
          u & 4 &&
            ((u = l.updateQueue),
            u !== null && ((l.updateQueue = null), hn(l, u)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Jl(t, l), wl(l);
    }
  }
  function wl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, u = l.return; u !== null; ) {
          if (Ks(u)) {
            a = u;
            break;
          }
          u = u.return;
        }
        if (a == null) throw Error(v(160));
        switch (a.tag) {
          case 27:
            var e = a.stateNode,
              n = Ti(l);
            mn(l, n, e);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && ($a(f, ""), (a.flags &= -33));
            var i = Ti(l);
            mn(l, i, f);
            break;
          case 3:
          case 4:
            var c = a.stateNode.containerInfo,
              m = Ti(l);
            Ei(l, m, c);
            break;
          default:
            throw Error(v(161));
        }
      } catch (S) {
        nl(l, l.return, S);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function lo(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        lo(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling);
      }
  }
  function Vt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) Ws(l, t.alternate, t), (t = t.sibling);
  }
  function Xa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sa(4, t, t.return), Xa(t);
          break;
        case 1:
          pt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Ls(t, t.return, a),
            Xa(t);
          break;
        case 27:
          me(t.stateNode);
        case 26:
        case 5:
          pt(t, t.return), Xa(t);
          break;
        case 22:
          t.memoizedState === null && Xa(t);
          break;
        case 30:
          Xa(t);
          break;
        default:
          Xa(t);
      }
      l = l.sibling;
    }
  }
  function Kt(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var u = t.alternate,
        e = l,
        n = t,
        f = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Kt(e, n, a), ee(4, n);
          break;
        case 1:
          if (
            (Kt(e, n, a),
            (u = n),
            (e = u.stateNode),
            typeof e.componentDidMount == "function")
          )
            try {
              e.componentDidMount();
            } catch (m) {
              nl(u, u.return, m);
            }
          if (((u = n), (e = u.updateQueue), e !== null)) {
            var i = u.stateNode;
            try {
              var c = e.shared.hiddenCallbacks;
              if (c !== null)
                for (e.shared.hiddenCallbacks = null, e = 0; e < c.length; e++)
                  H0(c[e], i);
            } catch (m) {
              nl(u, u.return, m);
            }
          }
          a && f & 64 && Zs(n), ne(n, n.return);
          break;
        case 27:
          Js(n);
        case 26:
        case 5:
          Kt(e, n, a), a && u === null && f & 4 && Vs(n), ne(n, n.return);
          break;
        case 12:
          Kt(e, n, a);
          break;
        case 31:
          Kt(e, n, a), a && f & 4 && ks(e, n);
          break;
        case 13:
          Kt(e, n, a), a && f & 4 && Is(e, n);
          break;
        case 22:
          n.memoizedState === null && Kt(e, n, a), ne(n, n.return);
          break;
        case 30:
          break;
        default:
          Kt(e, n, a);
      }
      t = t.sibling;
    }
  }
  function _i(l, t) {
    var a = null;
    l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (a = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== a && (l != null && l.refCount++, a != null && Ku(a));
  }
  function Oi(l, t) {
    (l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Ku(l));
  }
  function Tt(l, t, a, u) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) to(l, t, a, u), (t = t.sibling);
  }
  function to(l, t, a, u) {
    var e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Tt(l, t, a, u), e & 2048 && ee(9, t);
        break;
      case 1:
        Tt(l, t, a, u);
        break;
      case 3:
        Tt(l, t, a, u),
          e & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ku(l)));
        break;
      case 12:
        if (e & 2048) {
          Tt(l, t, a, u), (l = t.stateNode);
          try {
            var n = t.memoizedProps,
              f = n.id,
              i = n.onPostCommit;
            typeof i == "function" &&
              i(
                f,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0
              );
          } catch (c) {
            nl(t, t.return, c);
          }
        } else Tt(l, t, a, u);
        break;
      case 31:
        Tt(l, t, a, u);
        break;
      case 13:
        Tt(l, t, a, u);
        break;
      case 23:
        break;
      case 22:
        (n = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Tt(l, t, a, u)
              : fe(l, t)
            : n._visibility & 2
            ? Tt(l, t, a, u)
            : ((n._visibility |= 2),
              hu(l, t, a, u, (t.subtreeFlags & 10256) !== 0 || !1)),
          e & 2048 && _i(f, t);
        break;
      case 24:
        Tt(l, t, a, u), e & 2048 && Oi(t.alternate, t);
        break;
      default:
        Tt(l, t, a, u);
    }
  }
  function hu(l, t, a, u, e) {
    for (
      e = e && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;

    ) {
      var n = l,
        f = t,
        i = a,
        c = u,
        m = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          hu(n, f, i, c, e), ee(8, f);
          break;
        case 23:
          break;
        case 22:
          var S = f.stateNode;
          f.memoizedState !== null
            ? S._visibility & 2
              ? hu(n, f, i, c, e)
              : fe(n, f)
            : ((S._visibility |= 2), hu(n, f, i, c, e)),
            e && m & 2048 && _i(f.alternate, f);
          break;
        case 24:
          hu(n, f, i, c, e), e && m & 2048 && Oi(f.alternate, f);
          break;
        default:
          hu(n, f, i, c, e);
      }
      t = t.sibling;
    }
  }
  function fe(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = l,
          u = t,
          e = u.flags;
        switch (u.tag) {
          case 22:
            fe(a, u), e & 2048 && _i(u.alternate, u);
            break;
          case 24:
            fe(a, u), e & 2048 && Oi(u.alternate, u);
            break;
          default:
            fe(a, u);
        }
        t = t.sibling;
      }
  }
  var ie = 8192;
  function gu(l, t, a) {
    if (l.subtreeFlags & ie)
      for (l = l.child; l !== null; ) ao(l, t, a), (l = l.sibling);
  }
  function ao(l, t, a) {
    switch (l.tag) {
      case 26:
        gu(l, t, a),
          l.flags & ie &&
            l.memoizedState !== null &&
            xd(a, zt, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        gu(l, t, a);
        break;
      case 3:
      case 4:
        var u = zt;
        (zt = Un(l.stateNode.containerInfo)), gu(l, t, a), (zt = u);
        break;
      case 22:
        l.memoizedState === null &&
          ((u = l.alternate),
          u !== null && u.memoizedState !== null
            ? ((u = ie), (ie = 16777216), gu(l, t, a), (ie = u))
            : gu(l, t, a));
        break;
      default:
        gu(l, t, a);
    }
  }
  function uo(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do (t = l.sibling), (l.sibling = null), (l = t);
      while (l !== null);
    }
  }
  function ce(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var u = t[a];
          (Ml = u), no(u, l);
        }
      uo(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) eo(l), (l = l.sibling);
  }
  function eo(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ce(l), l.flags & 2048 && sa(9, l, l.return);
        break;
      case 3:
        ce(l);
        break;
      case 12:
        ce(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), gn(l))
          : ce(l);
        break;
      default:
        ce(l);
    }
  }
  function gn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var u = t[a];
          (Ml = u), no(u, l);
        }
      uo(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          sa(8, t, t.return), gn(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), gn(t));
          break;
        default:
          gn(t);
      }
      l = l.sibling;
    }
  }
  function no(l, t) {
    for (; Ml !== null; ) {
      var a = Ml;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var u = a.memoizedState.cachePool.pool;
            u != null && u.refCount++;
          }
          break;
        case 24:
          Ku(a.memoizedState.cache);
      }
      if (((u = a.child), u !== null)) (u.return = a), (Ml = u);
      else
        l: for (a = l; Ml !== null; ) {
          u = Ml;
          var e = u.sibling,
            n = u.return;
          if (($s(u), u === a)) {
            Ml = null;
            break l;
          }
          if (e !== null) {
            (e.return = n), (Ml = e);
            break l;
          }
          Ml = n;
        }
    }
  }
  var Py = {
      getCacheForType: function (l) {
        var t = Nl(zl),
          a = t.data.get(l);
        return a === void 0 && ((a = l()), t.data.set(l, a)), a;
      },
      cacheSignal: function () {
        return Nl(zl).controller.signal;
      },
    },
    ld = typeof WeakMap == "function" ? WeakMap : Map,
    al = 0,
    vl = null,
    K = null,
    w = 0,
    el = 0,
    et = null,
    oa = !1,
    Su = !1,
    Mi = !1,
    Jt = 0,
    gl = 0,
    va = 0,
    Qa = 0,
    pi = 0,
    nt = 0,
    ru = 0,
    se = null,
    Wl = null,
    Di = !1,
    Sn = 0,
    fo = 0,
    rn = 1 / 0,
    bn = null,
    ya = null,
    _l = 0,
    da = null,
    bu = null,
    wt = 0,
    Ui = 0,
    Ni = null,
    io = null,
    oe = 0,
    Hi = null;
  function ft() {
    return (al & 2) !== 0 && w !== 0 ? w & -w : r.T !== null ? ji() : Ac();
  }
  function co() {
    if (nt === 0)
      if ((w & 536870912) === 0 || F) {
        var l = Me;
        (Me <<= 1), (Me & 3932160) === 0 && (Me = 262144), (nt = l);
      } else nt = 536870912;
    return (l = at.current), l !== null && (l.flags |= 32), nt;
  }
  function $l(l, t, a) {
    ((l === vl && (el === 2 || el === 9)) || l.cancelPendingCommit !== null) &&
      (zu(l, 0), ma(l, w, nt, !1)),
      Hu(l, a),
      ((al & 2) === 0 || l !== vl) &&
        (l === vl &&
          ((al & 2) === 0 && (Qa |= a), gl === 4 && ma(l, w, nt, !1)),
        Dt(l));
  }
  function so(l, t, a) {
    if ((al & 6) !== 0) throw Error(v(327));
    var u = (!a && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Nu(l, t),
      e = u ? ud(l, t) : Ci(l, t, !0),
      n = u;
    do {
      if (e === 0) {
        Su && !u && ma(l, t, 0, !1);
        break;
      } else {
        if (((a = l.current.alternate), n && !td(a))) {
          (e = Ci(l, t, !1)), (n = !1);
          continue;
        }
        if (e === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var f = 0;
          else
            (f = l.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
          if (f !== 0) {
            t = f;
            l: {
              var i = l;
              e = se;
              var c = i.current.memoizedState.isDehydrated;
              if ((c && (zu(i, f).flags |= 256), (f = Ci(i, f, !1)), f !== 2)) {
                if (Mi && !c) {
                  (i.errorRecoveryDisabledLanes |= n), (Qa |= n), (e = 4);
                  break l;
                }
                (n = Wl),
                  (Wl = e),
                  n !== null && (Wl === null ? (Wl = n) : Wl.push.apply(Wl, n));
              }
              e = f;
            }
            if (((n = !1), e !== 2)) continue;
          }
        }
        if (e === 1) {
          zu(l, 0), ma(l, t, 0, !0);
          break;
        }
        l: {
          switch (((u = l), (n = e), n)) {
            case 0:
            case 1:
              throw Error(v(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ma(u, t, nt, !oa);
              break l;
            case 2:
              Wl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(v(329));
          }
          if ((t & 62914560) === t && ((e = Sn + 300 - kl()), 10 < e)) {
            if ((ma(u, t, nt, !oa), De(u, 0, !0) !== 0)) break l;
            (wt = t),
              (u.timeoutHandle = Qo(
                oo.bind(
                  null,
                  u,
                  a,
                  Wl,
                  bn,
                  Di,
                  t,
                  nt,
                  Qa,
                  ru,
                  oa,
                  n,
                  "Throttled",
                  -0,
                  0
                ),
                e
              ));
            break l;
          }
          oo(u, a, Wl, bn, Di, t, nt, Qa, ru, oa, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Dt(l);
  }
  function oo(l, t, a, u, e, n, f, i, c, m, S, z, h, g) {
    if (
      ((l.timeoutHandle = -1),
      (z = t.subtreeFlags),
      z & 8192 || (z & 16785408) === 16785408)
    ) {
      (z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Rt,
      }),
        ao(t, n, z);
      var D =
        (n & 62914560) === n ? Sn - kl() : (n & 4194048) === n ? fo - kl() : 0;
      if (((D = Gd(z, D)), D !== null)) {
        (wt = n),
          (l.cancelPendingCommit = D(
            bo.bind(null, l, t, n, a, u, e, f, i, c, S, z, null, h, g)
          )),
          ma(l, n, f, !m);
        return;
      }
    }
    bo(l, t, n, a, u, e, f, i, c);
  }
  function td(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var u = 0; u < a.length; u++) {
          var e = a[u],
            n = e.getSnapshot;
          e = e.value;
          try {
            if (!lt(n(), e)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function ma(l, t, a, u) {
    (t &= ~pi),
      (t &= ~Qa),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      u && (l.warmLanes |= t),
      (u = l.expirationTimes);
    for (var e = t; 0 < e; ) {
      var n = 31 - Pl(e),
        f = 1 << n;
      (u[n] = -1), (e &= ~f);
    }
    a !== 0 && zc(l, a, t);
  }
  function zn() {
    return (al & 6) === 0 ? (ve(0), !1) : !0;
  }
  function Ri() {
    if (K !== null) {
      if (el === 0) var l = K.return;
      else (l = K), (Yt = Ra = null), Wf(l), (ou = null), (wu = 0), (l = K);
      for (; l !== null; ) Qs(l.alternate, l), (l = l.return);
      K = null;
    }
  }
  function zu(l, t) {
    var a = l.timeoutHandle;
    a !== -1 && ((l.timeoutHandle = -1), Td(a)),
      (a = l.cancelPendingCommit),
      a !== null && ((l.cancelPendingCommit = null), a()),
      (wt = 0),
      Ri(),
      (vl = l),
      (K = a = qt(l.current, null)),
      (w = t),
      (el = 0),
      (et = null),
      (oa = !1),
      (Su = Nu(l, t)),
      (Mi = !1),
      (ru = nt = pi = Qa = va = gl = 0),
      (Wl = se = null),
      (Di = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var u = l.entangledLanes;
    if (u !== 0)
      for (l = l.entanglements, u &= t; 0 < u; ) {
        var e = 31 - Pl(u),
          n = 1 << e;
        (t |= l[e]), (u &= ~n);
      }
    return (Jt = t), Xe(), a;
  }
  function vo(l, t) {
    (Z = null),
      (r.H = te),
      t === su || t === We
        ? ((t = p0()), (el = 3))
        : t === Yf
        ? ((t = p0()), (el = 4))
        : (el =
            t === oi
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (et = t),
      K === null && ((gl = 1), sn(l, vt(t, l.current)));
  }
  function yo() {
    var l = at.current;
    return l === null
      ? !0
      : (w & 4194048) === w
      ? ht === null
      : (w & 62914560) === w || (w & 536870912) !== 0
      ? l === ht
      : !1;
  }
  function mo() {
    var l = r.H;
    return (r.H = te), l === null ? te : l;
  }
  function ho() {
    var l = r.A;
    return (r.A = Py), l;
  }
  function Tn() {
    (gl = 4),
      oa || ((w & 4194048) !== w && at.current !== null) || (Su = !0),
      ((va & 134217727) === 0 && (Qa & 134217727) === 0) ||
        vl === null ||
        ma(vl, w, nt, !1);
  }
  function Ci(l, t, a) {
    var u = al;
    al |= 2;
    var e = mo(),
      n = ho();
    (vl !== l || w !== t) && ((bn = null), zu(l, t)), (t = !1);
    var f = gl;
    l: do
      try {
        if (el !== 0 && K !== null) {
          var i = K,
            c = et;
          switch (el) {
            case 8:
              Ri(), (f = 6);
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              at.current === null && (t = !0);
              var m = el;
              if (((el = 0), (et = null), Tu(l, i, c, m), a && Su)) {
                f = 0;
                break l;
              }
              break;
            default:
              (m = el), (el = 0), (et = null), Tu(l, i, c, m);
          }
        }
        ad(), (f = gl);
        break;
      } catch (S) {
        vo(l, S);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Yt = Ra = null),
      (al = u),
      (r.H = e),
      (r.A = n),
      K === null && ((vl = null), (w = 0), Xe()),
      f
    );
  }
  function ad() {
    for (; K !== null; ) go(K);
  }
  function ud(l, t) {
    var a = al;
    al |= 2;
    var u = mo(),
      e = ho();
    vl !== l || w !== t
      ? ((bn = null), (rn = kl() + 500), zu(l, t))
      : (Su = Nu(l, t));
    l: do
      try {
        if (el !== 0 && K !== null) {
          t = K;
          var n = et;
          t: switch (el) {
            case 1:
              (el = 0), (et = null), Tu(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (O0(n)) {
                (el = 0), (et = null), So(t);
                break;
              }
              (t = function () {
                (el !== 2 && el !== 9) || vl !== l || (el = 7), Dt(l);
              }),
                n.then(t, t);
              break l;
            case 3:
              el = 7;
              break l;
            case 4:
              el = 5;
              break l;
            case 7:
              O0(n)
                ? ((el = 0), (et = null), So(t))
                : ((el = 0), (et = null), Tu(l, t, n, 7));
              break;
            case 5:
              var f = null;
              switch (K.tag) {
                case 26:
                  f = K.memoizedState;
                case 5:
                case 27:
                  var i = K;
                  if (f ? av(f) : i.stateNode.complete) {
                    (el = 0), (et = null);
                    var c = i.sibling;
                    if (c !== null) K = c;
                    else {
                      var m = i.return;
                      m !== null ? ((K = m), En(m)) : (K = null);
                    }
                    break t;
                  }
              }
              (el = 0), (et = null), Tu(l, t, n, 5);
              break;
            case 6:
              (el = 0), (et = null), Tu(l, t, n, 6);
              break;
            case 8:
              Ri(), (gl = 6);
              break l;
            default:
              throw Error(v(462));
          }
        }
        ed();
        break;
      } catch (S) {
        vo(l, S);
      }
    while (!0);
    return (
      (Yt = Ra = null),
      (r.H = u),
      (r.A = e),
      (al = a),
      K !== null ? 0 : ((vl = null), (w = 0), Xe(), gl)
    );
  }
  function ed() {
    for (; K !== null && !pv(); ) go(K);
  }
  function go(l) {
    var t = Gs(l.alternate, l, Jt);
    (l.memoizedProps = l.pendingProps), t === null ? En(l) : (K = t);
  }
  function So(l) {
    var t = l,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Cs(a, t, t.pendingProps, t.type, void 0, w);
        break;
      case 11:
        t = Cs(a, t, t.pendingProps, t.type.render, t.ref, w);
        break;
      case 5:
        Wf(t);
      default:
        Qs(a, t), (t = K = m0(t, Jt)), (t = Gs(a, t, Jt));
    }
    (l.memoizedProps = l.pendingProps), t === null ? En(l) : (K = t);
  }
  function Tu(l, t, a, u) {
    (Yt = Ra = null), Wf(t), (ou = null), (wu = 0);
    var e = t.return;
    try {
      if (Jy(l, e, t, a, w)) {
        (gl = 1), sn(l, vt(a, l.current)), (K = null);
        return;
      }
    } catch (n) {
      if (e !== null) throw ((K = e), n);
      (gl = 1), sn(l, vt(a, l.current)), (K = null);
      return;
    }
    t.flags & 32768
      ? (F || u === 1
          ? (l = !0)
          : Su || (w & 536870912) !== 0
          ? (l = !1)
          : ((oa = l = !0),
            (u === 2 || u === 9 || u === 3 || u === 6) &&
              ((u = at.current),
              u !== null && u.tag === 13 && (u.flags |= 16384))),
        ro(t, l))
      : En(t);
  }
  function En(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        ro(t, oa);
        return;
      }
      l = t.return;
      var a = $y(t.alternate, t, Jt);
      if (a !== null) {
        K = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        K = t;
        return;
      }
      K = t = l;
    } while (t !== null);
    gl === 0 && (gl = 5);
  }
  function ro(l, t) {
    do {
      var a = Fy(l.alternate, l);
      if (a !== null) {
        (a.flags &= 32767), (K = a);
        return;
      }
      if (
        ((a = l.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        K = l;
        return;
      }
      K = l = a;
    } while (l !== null);
    (gl = 6), (K = null);
  }
  function bo(l, t, a, u, e, n, f, i, c) {
    l.cancelPendingCommit = null;
    do An();
    while (_l !== 0);
    if ((al & 6) !== 0) throw Error(v(327));
    if (t !== null) {
      if (t === l.current) throw Error(v(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= Tf),
        jv(l, a, n, f, i, c),
        l === vl && ((K = vl = null), (w = 0)),
        (bu = t),
        (da = l),
        (wt = a),
        (Ui = n),
        (Ni = e),
        (io = u),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            cd(_e, function () {
              return _o(), null;
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (u = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || u)
      ) {
        (u = r.T), (r.T = null), (e = O.p), (O.p = 2), (f = al), (al |= 4);
        try {
          ky(l, t, a);
        } finally {
          (al = f), (O.p = e), (r.T = u);
        }
      }
      (_l = 1), zo(), To(), Eo();
    }
  }
  function zo() {
    if (_l === 1) {
      _l = 0;
      var l = da,
        t = bu,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        (a = r.T), (r.T = null);
        var u = O.p;
        O.p = 2;
        var e = al;
        al |= 4;
        try {
          Ps(t, l);
          var n = Ki,
            f = n0(l.containerInfo),
            i = n.focusedElem,
            c = n.selectionRange;
          if (
            f !== i &&
            i &&
            i.ownerDocument &&
            e0(i.ownerDocument.documentElement, i)
          ) {
            if (c !== null && gf(i)) {
              var m = c.start,
                S = c.end;
              if ((S === void 0 && (S = m), "selectionStart" in i))
                (i.selectionStart = m),
                  (i.selectionEnd = Math.min(S, i.value.length));
              else {
                var z = i.ownerDocument || document,
                  h = (z && z.defaultView) || window;
                if (h.getSelection) {
                  var g = h.getSelection(),
                    D = i.textContent.length,
                    B = Math.min(c.start, D),
                    sl = c.end === void 0 ? B : Math.min(c.end, D);
                  !g.extend && B > sl && ((f = sl), (sl = B), (B = f));
                  var y = u0(i, B),
                    s = u0(i, sl);
                  if (
                    y &&
                    s &&
                    (g.rangeCount !== 1 ||
                      g.anchorNode !== y.node ||
                      g.anchorOffset !== y.offset ||
                      g.focusNode !== s.node ||
                      g.focusOffset !== s.offset)
                  ) {
                    var d = z.createRange();
                    d.setStart(y.node, y.offset),
                      g.removeAllRanges(),
                      B > sl
                        ? (g.addRange(d), g.extend(s.node, s.offset))
                        : (d.setEnd(s.node, s.offset), g.addRange(d));
                  }
                }
              }
            }
            for (z = [], g = i; (g = g.parentNode); )
              g.nodeType === 1 &&
                z.push({ element: g, left: g.scrollLeft, top: g.scrollTop });
            for (
              typeof i.focus == "function" && i.focus(), i = 0;
              i < z.length;
              i++
            ) {
              var b = z[i];
              (b.element.scrollLeft = b.left), (b.element.scrollTop = b.top);
            }
          }
          (Bn = !!Vi), (Ki = Vi = null);
        } finally {
          (al = e), (O.p = u), (r.T = a);
        }
      }
      (l.current = t), (_l = 2);
    }
  }
  function To() {
    if (_l === 2) {
      _l = 0;
      var l = da,
        t = bu,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        (a = r.T), (r.T = null);
        var u = O.p;
        O.p = 2;
        var e = al;
        al |= 4;
        try {
          Ws(l, t.alternate, t);
        } finally {
          (al = e), (O.p = u), (r.T = a);
        }
      }
      _l = 3;
    }
  }
  function Eo() {
    if (_l === 4 || _l === 3) {
      (_l = 0), Dv();
      var l = da,
        t = bu,
        a = wt,
        u = io;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (_l = 5)
        : ((_l = 0), (bu = da = null), Ao(l, l.pendingLanes));
      var e = l.pendingLanes;
      if (
        (e === 0 && (ya = null),
        Fn(a),
        (t = t.stateNode),
        Il && typeof Il.onCommitFiberRoot == "function")
      )
        try {
          Il.onCommitFiberRoot(Uu, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (u !== null) {
        (t = r.T), (e = O.p), (O.p = 2), (r.T = null);
        try {
          for (var n = l.onRecoverableError, f = 0; f < u.length; f++) {
            var i = u[f];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          (r.T = t), (O.p = e);
        }
      }
      (wt & 3) !== 0 && An(),
        Dt(l),
        (e = l.pendingLanes),
        (a & 261930) !== 0 && (e & 42) !== 0
          ? l === Hi
            ? oe++
            : ((oe = 0), (Hi = l))
          : (oe = 0),
        ve(0);
    }
  }
  function Ao(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Ku(t)));
  }
  function An() {
    return zo(), To(), Eo(), _o();
  }
  function _o() {
    if (_l !== 5) return !1;
    var l = da,
      t = Ui;
    Ui = 0;
    var a = Fn(wt),
      u = r.T,
      e = O.p;
    try {
      (O.p = 32 > a ? 32 : a), (r.T = null), (a = Ni), (Ni = null);
      var n = da,
        f = wt;
      if (((_l = 0), (bu = da = null), (wt = 0), (al & 6) !== 0))
        throw Error(v(331));
      var i = al;
      if (
        ((al |= 4),
        eo(n.current),
        to(n, n.current, f, a),
        (al = i),
        ve(0, !1),
        Il && typeof Il.onPostCommitFiberRoot == "function")
      )
        try {
          Il.onPostCommitFiberRoot(Uu, n);
        } catch {}
      return !0;
    } finally {
      (O.p = e), (r.T = u), Ao(l, t);
    }
  }
  function Oo(l, t, a) {
    (t = vt(a, t)),
      (t = si(l.stateNode, t, 2)),
      (l = fa(l, t, 2)),
      l !== null && (Hu(l, 2), Dt(l));
  }
  function nl(l, t, a) {
    if (l.tag === 3) Oo(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Oo(t, l, a);
          break;
        } else if (t.tag === 1) {
          var u = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof u.componentDidCatch == "function" &&
              (ya === null || !ya.has(u)))
          ) {
            (l = vt(a, l)),
              (a = Os(2)),
              (u = fa(t, a, 2)),
              u !== null && (Ms(a, u, t, l), Hu(u, 2), Dt(u));
            break;
          }
        }
        t = t.return;
      }
  }
  function qi(l, t, a) {
    var u = l.pingCache;
    if (u === null) {
      u = l.pingCache = new ld();
      var e = new Set();
      u.set(t, e);
    } else (e = u.get(t)), e === void 0 && ((e = new Set()), u.set(t, e));
    e.has(a) ||
      ((Mi = !0), e.add(a), (l = nd.bind(null, l, t, a)), t.then(l, l));
  }
  function nd(l, t, a) {
    var u = l.pingCache;
    u !== null && u.delete(t),
      (l.pingedLanes |= l.suspendedLanes & a),
      (l.warmLanes &= ~a),
      vl === l &&
        (w & a) === a &&
        (gl === 4 || (gl === 3 && (w & 62914560) === w && 300 > kl() - Sn)
          ? (al & 2) === 0 && zu(l, 0)
          : (pi |= a),
        ru === w && (ru = 0)),
      Dt(l);
  }
  function Mo(l, t) {
    t === 0 && (t = bc()), (l = Ua(l, t)), l !== null && (Hu(l, t), Dt(l));
  }
  function fd(l) {
    var t = l.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), Mo(l, a);
  }
  function id(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var u = l.stateNode,
          e = l.memoizedState;
        e !== null && (a = e.retryLane);
        break;
      case 19:
        u = l.stateNode;
        break;
      case 22:
        u = l.stateNode._retryCache;
        break;
      default:
        throw Error(v(314));
    }
    u !== null && u.delete(t), Mo(l, a);
  }
  function cd(l, t) {
    return Jn(l, t);
  }
  var _n = null,
    Eu = null,
    Bi = !1,
    On = !1,
    Yi = !1,
    ha = 0;
  function Dt(l) {
    l !== Eu &&
      l.next === null &&
      (Eu === null ? (_n = Eu = l) : (Eu = Eu.next = l)),
      (On = !0),
      Bi || ((Bi = !0), od());
  }
  function ve(l, t) {
    if (!Yi && On) {
      Yi = !0;
      do
        for (var a = !1, u = _n; u !== null; ) {
          if (l !== 0) {
            var e = u.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var f = u.suspendedLanes,
                i = u.pingedLanes;
              (n = (1 << (31 - Pl(42 | l) + 1)) - 1),
                (n &= e & ~(f & ~i)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
            }
            n !== 0 && ((a = !0), No(u, n));
          } else
            (n = w),
              (n = De(
                u,
                u === vl ? n : 0,
                u.cancelPendingCommit !== null || u.timeoutHandle !== -1
              )),
              (n & 3) === 0 || Nu(u, n) || ((a = !0), No(u, n));
          u = u.next;
        }
      while (a);
      Yi = !1;
    }
  }
  function sd() {
    po();
  }
  function po() {
    On = Bi = !1;
    var l = 0;
    ha !== 0 && zd() && (l = ha);
    for (var t = kl(), a = null, u = _n; u !== null; ) {
      var e = u.next,
        n = Do(u, t);
      n === 0
        ? ((u.next = null),
          a === null ? (_n = e) : (a.next = e),
          e === null && (Eu = a))
        : ((a = u), (l !== 0 || (n & 3) !== 0) && (On = !0)),
        (u = e);
    }
    (_l !== 0 && _l !== 5) || ve(l), ha !== 0 && (ha = 0);
  }
  function Do(l, t) {
    for (
      var a = l.suspendedLanes,
        u = l.pingedLanes,
        e = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;

    ) {
      var f = 31 - Pl(n),
        i = 1 << f,
        c = e[f];
      c === -1
        ? ((i & a) === 0 || (i & u) !== 0) && (e[f] = Yv(i, t))
        : c <= t && (l.expiredLanes |= i),
        (n &= ~i);
    }
    if (
      ((t = vl),
      (a = w),
      (a = De(
        l,
        l === t ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      (u = l.callbackNode),
      a === 0 ||
        (l === t && (el === 2 || el === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        u !== null && u !== null && wn(u),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Nu(l, a)) {
      if (((t = a & -a), t === l.callbackPriority)) return t;
      switch ((u !== null && wn(u), Fn(a))) {
        case 2:
        case 8:
          a = Sc;
          break;
        case 32:
          a = _e;
          break;
        case 268435456:
          a = rc;
          break;
        default:
          a = _e;
      }
      return (
        (u = Uo.bind(null, l)),
        (a = Jn(a, u)),
        (l.callbackPriority = t),
        (l.callbackNode = a),
        t
      );
    }
    return (
      u !== null && u !== null && wn(u),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function Uo(l, t) {
    if (_l !== 0 && _l !== 5)
      return (l.callbackNode = null), (l.callbackPriority = 0), null;
    var a = l.callbackNode;
    if (An() && l.callbackNode !== a) return null;
    var u = w;
    return (
      (u = De(
        l,
        l === vl ? u : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      u === 0
        ? null
        : (so(l, u, t),
          Do(l, kl()),
          l.callbackNode != null && l.callbackNode === a
            ? Uo.bind(null, l)
            : null)
    );
  }
  function No(l, t) {
    if (An()) return null;
    so(l, t, !0);
  }
  function od() {
    Ed(function () {
      (al & 6) !== 0 ? Jn(gc, sd) : po();
    });
  }
  function ji() {
    if (ha === 0) {
      var l = iu;
      l === 0 && ((l = Oe), (Oe <<= 1), (Oe & 261888) === 0 && (Oe = 256)),
        (ha = l);
    }
    return ha;
  }
  function Ho(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
      ? l
      : Re("" + l);
  }
  function Ro(l, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      l.id && a.setAttribute("form", l.id),
      t.parentNode.insertBefore(a, t),
      (l = new FormData(l)),
      a.parentNode.removeChild(a),
      l
    );
  }
  function vd(l, t, a, u, e) {
    if (t === "submit" && a && a.stateNode === e) {
      var n = Ho((e[Ll] || null).action),
        f = u.submitter;
      f &&
        ((t = (t = f[Ll] || null)
          ? Ho(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((n = t), (f = null)));
      var i = new Ye("action", "action", null, u, e);
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (u.defaultPrevented) {
                if (ha !== 0) {
                  var c = f ? Ro(e, f) : new FormData(e);
                  ui(
                    a,
                    { pending: !0, data: c, method: e.method, action: n },
                    null,
                    c
                  );
                }
              } else
                typeof n == "function" &&
                  (i.preventDefault(),
                  (c = f ? Ro(e, f) : new FormData(e)),
                  ui(
                    a,
                    { pending: !0, data: c, method: e.method, action: n },
                    n,
                    c
                  ));
            },
            currentTarget: e,
          },
        ],
      });
    }
  }
  for (var xi = 0; xi < zf.length; xi++) {
    var Gi = zf[xi],
      yd = Gi.toLowerCase(),
      dd = Gi[0].toUpperCase() + Gi.slice(1);
    bt(yd, "on" + dd);
  }
  bt(c0, "onAnimationEnd"),
    bt(s0, "onAnimationIteration"),
    bt(o0, "onAnimationStart"),
    bt("dblclick", "onDoubleClick"),
    bt("focusin", "onFocus"),
    bt("focusout", "onBlur"),
    bt(Uy, "onTransitionRun"),
    bt(Ny, "onTransitionStart"),
    bt(Hy, "onTransitionCancel"),
    bt(v0, "onTransitionEnd"),
    wa("onMouseEnter", ["mouseout", "mouseover"]),
    wa("onMouseLeave", ["mouseout", "mouseover"]),
    wa("onPointerEnter", ["pointerout", "pointerover"]),
    wa("onPointerLeave", ["pointerout", "pointerover"]),
    Oa(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Oa(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Oa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Oa(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Oa(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Oa(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var ye =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    md = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(ye)
    );
  function Co(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var u = l[a],
        e = u.event;
      u = u.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var f = u.length - 1; 0 <= f; f--) {
            var i = u[f],
              c = i.instance,
              m = i.currentTarget;
            if (((i = i.listener), c !== n && e.isPropagationStopped()))
              break l;
            (n = i), (e.currentTarget = m);
            try {
              n(e);
            } catch (S) {
              Ge(S);
            }
            (e.currentTarget = null), (n = c);
          }
        else
          for (f = 0; f < u.length; f++) {
            if (
              ((i = u[f]),
              (c = i.instance),
              (m = i.currentTarget),
              (i = i.listener),
              c !== n && e.isPropagationStopped())
            )
              break l;
            (n = i), (e.currentTarget = m);
            try {
              n(e);
            } catch (S) {
              Ge(S);
            }
            (e.currentTarget = null), (n = c);
          }
      }
    }
  }
  function J(l, t) {
    var a = t[kn];
    a === void 0 && (a = t[kn] = new Set());
    var u = l + "__bubble";
    a.has(u) || (qo(t, l, 2, !1), a.add(u));
  }
  function Xi(l, t, a) {
    var u = 0;
    t && (u |= 4), qo(a, l, u, t);
  }
  var Mn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qi(l) {
    if (!l[Mn]) {
      (l[Mn] = !0),
        Mc.forEach(function (a) {
          a !== "selectionchange" && (md.has(a) || Xi(a, !1, l), Xi(a, !0, l));
        });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Mn] || ((t[Mn] = !0), Xi("selectionchange", !1, t));
    }
  }
  function qo(l, t, a, u) {
    switch (sv(t)) {
      case 2:
        var e = Zd;
        break;
      case 8:
        e = Ld;
        break;
      default:
        e = ac;
    }
    (a = e.bind(null, t, a, l)),
      (e = void 0),
      !ff ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (e = !0),
      u
        ? e !== void 0
          ? l.addEventListener(t, a, { capture: !0, passive: e })
          : l.addEventListener(t, a, !0)
        : e !== void 0
        ? l.addEventListener(t, a, { passive: e })
        : l.addEventListener(t, a, !1);
  }
  function Zi(l, t, a, u, e) {
    var n = u;
    if ((t & 1) === 0 && (t & 2) === 0 && u !== null)
      l: for (;;) {
        if (u === null) return;
        var f = u.tag;
        if (f === 3 || f === 4) {
          var i = u.stateNode.containerInfo;
          if (i === e) break;
          if (f === 4)
            for (f = u.return; f !== null; ) {
              var c = f.tag;
              if ((c === 3 || c === 4) && f.stateNode.containerInfo === e)
                return;
              f = f.return;
            }
          for (; i !== null; ) {
            if (((f = Va(i)), f === null)) return;
            if (((c = f.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
              u = n = f;
              continue l;
            }
            i = i.parentNode;
          }
        }
        u = u.return;
      }
    xc(function () {
      var m = n,
        S = ef(a),
        z = [];
      l: {
        var h = y0.get(l);
        if (h !== void 0) {
          var g = Ye,
            D = l;
          switch (l) {
            case "keypress":
              if (qe(a) === 0) break l;
            case "keydown":
            case "keyup":
              g = iy;
              break;
            case "focusin":
              (D = "focus"), (g = vf);
              break;
            case "focusout":
              (D = "blur"), (g = vf);
              break;
            case "beforeblur":
            case "afterblur":
              g = vf;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Qc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = $v;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = oy;
              break;
            case c0:
            case s0:
            case o0:
              g = Iv;
              break;
            case v0:
              g = yy;
              break;
            case "scroll":
            case "scrollend":
              g = wv;
              break;
            case "wheel":
              g = my;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = ly;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Lc;
              break;
            case "toggle":
            case "beforetoggle":
              g = gy;
          }
          var B = (t & 4) !== 0,
            sl = !B && (l === "scroll" || l === "scrollend"),
            y = B ? (h !== null ? h + "Capture" : null) : h;
          B = [];
          for (var s = m, d; s !== null; ) {
            var b = s;
            if (
              ((d = b.stateNode),
              (b = b.tag),
              (b !== 5 && b !== 26 && b !== 27) ||
                d === null ||
                y === null ||
                ((b = qu(s, y)), b != null && B.push(de(s, b, d))),
              sl)
            )
              break;
            s = s.return;
          }
          0 < B.length &&
            ((h = new g(h, D, null, a, S)), z.push({ event: h, listeners: B }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((h = l === "mouseover" || l === "pointerover"),
            (g = l === "mouseout" || l === "pointerout"),
            h &&
              a !== uf &&
              (D = a.relatedTarget || a.fromElement) &&
              (Va(D) || D[La]))
          )
            break l;
          if (
            (g || h) &&
            ((h =
              S.window === S
                ? S
                : (h = S.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
            g
              ? ((D = a.relatedTarget || a.toElement),
                (g = m),
                (D = D ? Va(D) : null),
                D !== null &&
                  ((sl = U(D)),
                  (B = D.tag),
                  D !== sl || (B !== 5 && B !== 27 && B !== 6)) &&
                  (D = null))
              : ((g = null), (D = m)),
            g !== D)
          ) {
            if (
              ((B = Qc),
              (b = "onMouseLeave"),
              (y = "onMouseEnter"),
              (s = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((B = Lc),
                (b = "onPointerLeave"),
                (y = "onPointerEnter"),
                (s = "pointer")),
              (sl = g == null ? h : Cu(g)),
              (d = D == null ? h : Cu(D)),
              (h = new B(b, s + "leave", g, a, S)),
              (h.target = sl),
              (h.relatedTarget = d),
              (b = null),
              Va(S) === m &&
                ((B = new B(y, s + "enter", D, a, S)),
                (B.target = d),
                (B.relatedTarget = sl),
                (b = B)),
              (sl = b),
              g && D)
            )
              t: {
                for (B = hd, y = g, s = D, d = 0, b = y; b; b = B(b)) d++;
                b = 0;
                for (var C = s; C; C = B(C)) b++;
                for (; 0 < d - b; ) (y = B(y)), d--;
                for (; 0 < b - d; ) (s = B(s)), b--;
                for (; d--; ) {
                  if (y === s || (s !== null && y === s.alternate)) {
                    B = y;
                    break t;
                  }
                  (y = B(y)), (s = B(s));
                }
                B = null;
              }
            else B = null;
            g !== null && Bo(z, h, g, B, !1),
              D !== null && sl !== null && Bo(z, sl, D, B, !0);
          }
        }
        l: {
          if (
            ((h = m ? Cu(m) : window),
            (g = h.nodeName && h.nodeName.toLowerCase()),
            g === "select" || (g === "input" && h.type === "file"))
          )
            var ll = kc;
          else if ($c(h))
            if (Ic) ll = My;
            else {
              ll = _y;
              var H = Ay;
            }
          else
            (g = h.nodeName),
              !g ||
              g.toLowerCase() !== "input" ||
              (h.type !== "checkbox" && h.type !== "radio")
                ? m && af(m.elementType) && (ll = kc)
                : (ll = Oy);
          if (ll && (ll = ll(l, m))) {
            Fc(z, ll, a, S);
            break l;
          }
          H && H(l, h, m),
            l === "focusout" &&
              m &&
              h.type === "number" &&
              m.memoizedProps.value != null &&
              tf(h, "number", h.value);
        }
        switch (((H = m ? Cu(m) : window), l)) {
          case "focusin":
            ($c(H) || H.contentEditable === "true") &&
              ((Pa = H), (Sf = m), (Zu = null));
            break;
          case "focusout":
            Zu = Sf = Pa = null;
            break;
          case "mousedown":
            rf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (rf = !1), f0(z, a, S);
            break;
          case "selectionchange":
            if (Dy) break;
          case "keydown":
          case "keyup":
            f0(z, a, S);
        }
        var L;
        if (df)
          l: {
            switch (l) {
              case "compositionstart":
                var W = "onCompositionStart";
                break l;
              case "compositionend":
                W = "onCompositionEnd";
                break l;
              case "compositionupdate":
                W = "onCompositionUpdate";
                break l;
            }
            W = void 0;
          }
        else
          Ia
            ? wc(l, a) && (W = "onCompositionEnd")
            : l === "keydown" &&
              a.keyCode === 229 &&
              (W = "onCompositionStart");
        W &&
          (Vc &&
            a.locale !== "ko" &&
            (Ia || W !== "onCompositionStart"
              ? W === "onCompositionEnd" && Ia && (L = Gc())
              : ((Pt = S),
                (cf = "value" in Pt ? Pt.value : Pt.textContent),
                (Ia = !0))),
          (H = pn(m, W)),
          0 < H.length &&
            ((W = new Zc(W, l, null, a, S)),
            z.push({ event: W, listeners: H }),
            L ? (W.data = L) : ((L = Wc(a)), L !== null && (W.data = L)))),
          (L = ry ? by(l, a) : zy(l, a)) &&
            ((W = pn(m, "onBeforeInput")),
            0 < W.length &&
              ((H = new Zc("onBeforeInput", "beforeinput", null, a, S)),
              z.push({ event: H, listeners: W }),
              (H.data = L))),
          vd(z, l, m, a, S);
      }
      Co(z, t);
    });
  }
  function de(l, t, a) {
    return { instance: l, listener: t, currentTarget: a };
  }
  function pn(l, t) {
    for (var a = t + "Capture", u = []; l !== null; ) {
      var e = l,
        n = e.stateNode;
      if (
        ((e = e.tag),
        (e !== 5 && e !== 26 && e !== 27) ||
          n === null ||
          ((e = qu(l, a)),
          e != null && u.unshift(de(l, e, n)),
          (e = qu(l, t)),
          e != null && u.push(de(l, e, n))),
        l.tag === 3)
      )
        return u;
      l = l.return;
    }
    return [];
  }
  function hd(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Bo(l, t, a, u, e) {
    for (var n = t._reactName, f = []; a !== null && a !== u; ) {
      var i = a,
        c = i.alternate,
        m = i.stateNode;
      if (((i = i.tag), c !== null && c === u)) break;
      (i !== 5 && i !== 26 && i !== 27) ||
        m === null ||
        ((c = m),
        e
          ? ((m = qu(a, n)), m != null && f.unshift(de(a, m, c)))
          : e || ((m = qu(a, n)), m != null && f.push(de(a, m, c)))),
        (a = a.return);
    }
    f.length !== 0 && l.push({ event: t, listeners: f });
  }
  var gd = /\r\n?/g,
    Sd = /\u0000|\uFFFD/g;
  function Yo(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        gd,
        `
`
      )
      .replace(Sd, "");
  }
  function jo(l, t) {
    return (t = Yo(t)), Yo(l) === t;
  }
  function cl(l, t, a, u, e, n) {
    switch (a) {
      case "children":
        typeof u == "string"
          ? t === "body" || (t === "textarea" && u === "") || $a(l, u)
          : (typeof u == "number" || typeof u == "bigint") &&
            t !== "body" &&
            $a(l, "" + u);
        break;
      case "className":
        Ne(l, "class", u);
        break;
      case "tabIndex":
        Ne(l, "tabindex", u);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ne(l, a, u);
        break;
      case "style":
        Yc(l, u, n);
        break;
      case "data":
        if (t !== "object") {
          Ne(l, "data", u);
          break;
        }
      case "src":
      case "href":
        if (u === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (
          u == null ||
          typeof u == "function" ||
          typeof u == "symbol" ||
          typeof u == "boolean"
        ) {
          l.removeAttribute(a);
          break;
        }
        (u = Re("" + u)), l.setAttribute(a, u);
        break;
      case "action":
      case "formAction":
        if (typeof u == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" &&
            (a === "formAction"
              ? (t !== "input" && cl(l, t, "name", e.name, e, null),
                cl(l, t, "formEncType", e.formEncType, e, null),
                cl(l, t, "formMethod", e.formMethod, e, null),
                cl(l, t, "formTarget", e.formTarget, e, null))
              : (cl(l, t, "encType", e.encType, e, null),
                cl(l, t, "method", e.method, e, null),
                cl(l, t, "target", e.target, e, null)));
        if (u == null || typeof u == "symbol" || typeof u == "boolean") {
          l.removeAttribute(a);
          break;
        }
        (u = Re("" + u)), l.setAttribute(a, u);
        break;
      case "onClick":
        u != null && (l.onclick = Rt);
        break;
      case "onScroll":
        u != null && J("scroll", l);
        break;
      case "onScrollEnd":
        u != null && J("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) throw Error(v(61));
          if (((a = u.__html), a != null)) {
            if (e.children != null) throw Error(v(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "muted":
        l.muted = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          u == null ||
          typeof u == "function" ||
          typeof u == "boolean" ||
          typeof u == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        (a = Re("" + u)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        u != null && typeof u != "function" && typeof u != "symbol"
          ? l.setAttribute(a, "" + u)
          : l.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        u && typeof u != "function" && typeof u != "symbol"
          ? l.setAttribute(a, "")
          : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        u === !0
          ? l.setAttribute(a, "")
          : u !== !1 &&
            u != null &&
            typeof u != "function" &&
            typeof u != "symbol"
          ? l.setAttribute(a, u)
          : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        !isNaN(u) &&
        1 <= u
          ? l.setAttribute(a, u)
          : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u)
          ? l.removeAttribute(a)
          : l.setAttribute(a, u);
        break;
      case "popover":
        J("beforetoggle", l), J("toggle", l), Ue(l, "popover", u);
        break;
      case "xlinkActuate":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:actuate", u);
        break;
      case "xlinkArcrole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", u);
        break;
      case "xlinkRole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:role", u);
        break;
      case "xlinkShow":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:show", u);
        break;
      case "xlinkTitle":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:title", u);
        break;
      case "xlinkType":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:type", u);
        break;
      case "xmlBase":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:base", u);
        break;
      case "xmlLang":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", u);
        break;
      case "xmlSpace":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:space", u);
        break;
      case "is":
        Ue(l, "is", u);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = Kv.get(a) || a), Ue(l, a, u));
    }
  }
  function Li(l, t, a, u, e, n) {
    switch (a) {
      case "style":
        Yc(l, u, n);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) throw Error(v(61));
          if (((a = u.__html), a != null)) {
            if (e.children != null) throw Error(v(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof u == "string"
          ? $a(l, u)
          : (typeof u == "number" || typeof u == "bigint") && $a(l, "" + u);
        break;
      case "onScroll":
        u != null && J("scroll", l);
        break;
      case "onScrollEnd":
        u != null && J("scrollend", l);
        break;
      case "onClick":
        u != null && (l.onclick = Rt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!pc.hasOwnProperty(a))
          l: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((e = a.endsWith("Capture")),
              (t = a.slice(2, e ? a.length - 7 : void 0)),
              (n = l[Ll] || null),
              (n = n != null ? n[a] : null),
              typeof n == "function" && l.removeEventListener(t, n, e),
              typeof u == "function")
            ) {
              typeof n != "function" &&
                n !== null &&
                (a in l
                  ? (l[a] = null)
                  : l.hasAttribute(a) && l.removeAttribute(a)),
                l.addEventListener(t, u, e);
              break l;
            }
            a in l
              ? (l[a] = u)
              : u === !0
              ? l.setAttribute(a, "")
              : Ue(l, a, u);
          }
    }
  }
  function Rl(l, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        J("error", l), J("load", l);
        var u = !1,
          e = !1,
          n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var f = a[n];
            if (f != null)
              switch (n) {
                case "src":
                  u = !0;
                  break;
                case "srcSet":
                  e = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(v(137, t));
                default:
                  cl(l, t, n, f, a, null);
              }
          }
        e && cl(l, t, "srcSet", a.srcSet, a, null),
          u && cl(l, t, "src", a.src, a, null);
        return;
      case "input":
        J("invalid", l);
        var i = (n = f = e = null),
          c = null,
          m = null;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var S = a[u];
            if (S != null)
              switch (u) {
                case "name":
                  e = S;
                  break;
                case "type":
                  f = S;
                  break;
                case "checked":
                  c = S;
                  break;
                case "defaultChecked":
                  m = S;
                  break;
                case "value":
                  n = S;
                  break;
                case "defaultValue":
                  i = S;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (S != null) throw Error(v(137, t));
                  break;
                default:
                  cl(l, t, u, S, a, null);
              }
          }
        Rc(l, n, i, c, m, f, e, !1);
        return;
      case "select":
        J("invalid", l), (u = f = n = null);
        for (e in a)
          if (a.hasOwnProperty(e) && ((i = a[e]), i != null))
            switch (e) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                f = i;
                break;
              case "multiple":
                u = i;
              default:
                cl(l, t, e, i, a, null);
            }
        (t = n),
          (a = f),
          (l.multiple = !!u),
          t != null ? Wa(l, !!u, t, !1) : a != null && Wa(l, !!u, a, !0);
        return;
      case "textarea":
        J("invalid", l), (n = e = u = null);
        for (f in a)
          if (a.hasOwnProperty(f) && ((i = a[f]), i != null))
            switch (f) {
              case "value":
                u = i;
                break;
              case "defaultValue":
                e = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(v(91));
                break;
              default:
                cl(l, t, f, i, a, null);
            }
        qc(l, u, e, n);
        return;
      case "option":
        for (c in a)
          if (a.hasOwnProperty(c) && ((u = a[c]), u != null))
            switch (c) {
              case "selected":
                l.selected =
                  u && typeof u != "function" && typeof u != "symbol";
                break;
              default:
                cl(l, t, c, u, a, null);
            }
        return;
      case "dialog":
        J("beforetoggle", l), J("toggle", l), J("cancel", l), J("close", l);
        break;
      case "iframe":
      case "object":
        J("load", l);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ye.length; u++) J(ye[u], l);
        break;
      case "image":
        J("error", l), J("load", l);
        break;
      case "details":
        J("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        J("error", l), J("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (m in a)
          if (a.hasOwnProperty(m) && ((u = a[m]), u != null))
            switch (m) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(v(137, t));
              default:
                cl(l, t, m, u, a, null);
            }
        return;
      default:
        if (af(t)) {
          for (S in a)
            a.hasOwnProperty(S) &&
              ((u = a[S]), u !== void 0 && Li(l, t, S, u, a, void 0));
          return;
        }
    }
    for (i in a)
      a.hasOwnProperty(i) && ((u = a[i]), u != null && cl(l, t, i, u, a, null));
  }
  function rd(l, t, a, u) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var e = null,
          n = null,
          f = null,
          i = null,
          c = null,
          m = null,
          S = null;
        for (g in a) {
          var z = a[g];
          if (a.hasOwnProperty(g) && z != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                c = z;
              default:
                u.hasOwnProperty(g) || cl(l, t, g, null, u, z);
            }
        }
        for (var h in u) {
          var g = u[h];
          if (((z = a[h]), u.hasOwnProperty(h) && (g != null || z != null)))
            switch (h) {
              case "type":
                n = g;
                break;
              case "name":
                e = g;
                break;
              case "checked":
                m = g;
                break;
              case "defaultChecked":
                S = g;
                break;
              case "value":
                f = g;
                break;
              case "defaultValue":
                i = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(v(137, t));
                break;
              default:
                g !== z && cl(l, t, h, g, u, z);
            }
        }
        lf(l, f, i, c, m, S, n, e);
        return;
      case "select":
        g = f = i = h = null;
        for (n in a)
          if (((c = a[n]), a.hasOwnProperty(n) && c != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = c;
              default:
                u.hasOwnProperty(n) || cl(l, t, n, null, u, c);
            }
        for (e in u)
          if (
            ((n = u[e]),
            (c = a[e]),
            u.hasOwnProperty(e) && (n != null || c != null))
          )
            switch (e) {
              case "value":
                h = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                f = n;
              default:
                n !== c && cl(l, t, e, n, u, c);
            }
        (t = i),
          (a = f),
          (u = g),
          h != null
            ? Wa(l, !!a, h, !1)
            : !!u != !!a &&
              (t != null ? Wa(l, !!a, t, !0) : Wa(l, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        g = h = null;
        for (i in a)
          if (
            ((e = a[i]),
            a.hasOwnProperty(i) && e != null && !u.hasOwnProperty(i))
          )
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                cl(l, t, i, null, u, e);
            }
        for (f in u)
          if (
            ((e = u[f]),
            (n = a[f]),
            u.hasOwnProperty(f) && (e != null || n != null))
          )
            switch (f) {
              case "value":
                h = e;
                break;
              case "defaultValue":
                g = e;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (e != null) throw Error(v(91));
                break;
              default:
                e !== n && cl(l, t, f, e, u, n);
            }
        Cc(l, h, g);
        return;
      case "option":
        for (var D in a)
          if (
            ((h = a[D]),
            a.hasOwnProperty(D) && h != null && !u.hasOwnProperty(D))
          )
            switch (D) {
              case "selected":
                l.selected = !1;
                break;
              default:
                cl(l, t, D, null, u, h);
            }
        for (c in u)
          if (
            ((h = u[c]),
            (g = a[c]),
            u.hasOwnProperty(c) && h !== g && (h != null || g != null))
          )
            switch (c) {
              case "selected":
                l.selected =
                  h && typeof h != "function" && typeof h != "symbol";
                break;
              default:
                cl(l, t, c, h, u, g);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var B in a)
          (h = a[B]),
            a.hasOwnProperty(B) &&
              h != null &&
              !u.hasOwnProperty(B) &&
              cl(l, t, B, null, u, h);
        for (m in u)
          if (
            ((h = u[m]),
            (g = a[m]),
            u.hasOwnProperty(m) && h !== g && (h != null || g != null))
          )
            switch (m) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(v(137, t));
                break;
              default:
                cl(l, t, m, h, u, g);
            }
        return;
      default:
        if (af(t)) {
          for (var sl in a)
            (h = a[sl]),
              a.hasOwnProperty(sl) &&
                h !== void 0 &&
                !u.hasOwnProperty(sl) &&
                Li(l, t, sl, void 0, u, h);
          for (S in u)
            (h = u[S]),
              (g = a[S]),
              !u.hasOwnProperty(S) ||
                h === g ||
                (h === void 0 && g === void 0) ||
                Li(l, t, S, h, u, g);
          return;
        }
    }
    for (var y in a)
      (h = a[y]),
        a.hasOwnProperty(y) &&
          h != null &&
          !u.hasOwnProperty(y) &&
          cl(l, t, y, null, u, h);
    for (z in u)
      (h = u[z]),
        (g = a[z]),
        !u.hasOwnProperty(z) ||
          h === g ||
          (h == null && g == null) ||
          cl(l, t, z, h, u, g);
  }
  function xo(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function bd() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, a = performance.getEntriesByType("resource"), u = 0;
        u < a.length;
        u++
      ) {
        var e = a[u],
          n = e.transferSize,
          f = e.initiatorType,
          i = e.duration;
        if (n && i && xo(f)) {
          for (f = 0, i = e.responseEnd, u += 1; u < a.length; u++) {
            var c = a[u],
              m = c.startTime;
            if (m > i) break;
            var S = c.transferSize,
              z = c.initiatorType;
            S &&
              xo(z) &&
              ((c = c.responseEnd), (f += S * (c < i ? 1 : (i - m) / (c - m))));
          }
          if ((--u, (t += (8 * (n + f)) / (e.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Vi = null,
    Ki = null;
  function Dn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Go(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Xo(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Ji(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var wi = null;
  function zd() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === wi
        ? !1
        : ((wi = l), !0)
      : ((wi = null), !1);
  }
  var Qo = typeof setTimeout == "function" ? setTimeout : void 0,
    Td = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Zo = typeof Promise == "function" ? Promise : void 0,
    Ed =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Zo < "u"
        ? function (l) {
            return Zo.resolve(null).then(l).catch(Ad);
          }
        : Qo;
  function Ad(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function ga(l) {
    return l === "head";
  }
  function Lo(l, t) {
    var a = t,
      u = 0;
    do {
      var e = a.nextSibling;
      if ((l.removeChild(a), e && e.nodeType === 8))
        if (((a = e.data), a === "/$" || a === "/&")) {
          if (u === 0) {
            l.removeChild(e), Mu(t);
            return;
          }
          u--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          u++;
        else if (a === "html") me(l.ownerDocument.documentElement);
        else if (a === "head") {
          (a = l.ownerDocument.head), me(a);
          for (var n = a.firstChild; n; ) {
            var f = n.nextSibling,
              i = n.nodeName;
            n[Ru] ||
              i === "SCRIPT" ||
              i === "STYLE" ||
              (i === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(n),
              (n = f);
          }
        } else a === "body" && me(l.ownerDocument.body);
      a = e;
    } while (a);
    Mu(t);
  }
  function Vo(l, t) {
    var a = l;
    l = 0;
    do {
      var u = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        u && u.nodeType === 8)
      )
        if (((a = u.data), a === "/$")) {
          if (l === 0) break;
          l--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || l++;
      a = u;
    } while (a);
  }
  function Wi(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wi(a), In(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function _d(l, t, a, u) {
    for (; l.nodeType === 1; ) {
      var e = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!u && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (u) {
        if (!l[Ru])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== e.rel ||
                l.getAttribute("href") !==
                  (e.href == null || e.href === "" ? null : e.href) ||
                l.getAttribute("crossorigin") !==
                  (e.crossOrigin == null ? null : e.crossOrigin) ||
                l.getAttribute("title") !== (e.title == null ? null : e.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (e.src == null ? null : e.src) ||
                  l.getAttribute("type") !== (e.type == null ? null : e.type) ||
                  l.getAttribute("crossorigin") !==
                    (e.crossOrigin == null ? null : e.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = e.name == null ? null : "" + e.name;
        if (e.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = gt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function Od(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !a) ||
        ((l = gt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Ko(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = gt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function $i(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Fi(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function Md(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading") t();
    else {
      var u = function () {
        t(), a.removeEventListener("DOMContentLoaded", u);
      };
      a.addEventListener("DOMContentLoaded", u), (l._reactRetry = u);
    }
  }
  function gt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var ki = null;
  function Jo(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return gt(l.nextSibling);
          t--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function wo(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else (a !== "/$" && a !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Wo(l, t, a) {
    switch (((t = Dn(a)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(v(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(v(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(v(454));
        return l;
      default:
        throw Error(v(451));
    }
  }
  function me(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    In(l);
  }
  var St = new Map(),
    $o = new Set();
  function Un(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
      ? l
      : l.ownerDocument;
  }
  var Wt = O.d;
  O.d = { f: pd, r: Dd, D: Ud, C: Nd, L: Hd, m: Rd, X: qd, S: Cd, M: Bd };
  function pd() {
    var l = Wt.f(),
      t = zn();
    return l || t;
  }
  function Dd(l) {
    var t = Ka(l);
    t !== null && t.tag === 5 && t.type === "form" ? vs(t) : Wt.r(l);
  }
  var Au = typeof document > "u" ? null : document;
  function Fo(l, t, a) {
    var u = Au;
    if (u && typeof t == "string" && t) {
      var e = st(t);
      (e = 'link[rel="' + l + '"][href="' + e + '"]'),
        typeof a == "string" && (e += '[crossorigin="' + a + '"]'),
        $o.has(e) ||
          ($o.add(e),
          (l = { rel: l, crossOrigin: a, href: t }),
          u.querySelector(e) === null &&
            ((t = u.createElement("link")),
            Rl(t, "link", l),
            Ol(t),
            u.head.appendChild(t)));
    }
  }
  function Ud(l) {
    Wt.D(l), Fo("dns-prefetch", l, null);
  }
  function Nd(l, t) {
    Wt.C(l, t), Fo("preconnect", l, t);
  }
  function Hd(l, t, a) {
    Wt.L(l, t, a);
    var u = Au;
    if (u && l && t) {
      var e = 'link[rel="preload"][as="' + st(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((e += '[imagesrcset="' + st(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (e += '[imagesizes="' + st(a.imageSizes) + '"]'))
        : (e += '[href="' + st(l) + '"]');
      var n = e;
      switch (t) {
        case "style":
          n = _u(l);
          break;
        case "script":
          n = Ou(l);
      }
      St.has(n) ||
        ((l = q(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : l,
            as: t,
          },
          a
        )),
        St.set(n, l),
        u.querySelector(e) !== null ||
          (t === "style" && u.querySelector(he(n))) ||
          (t === "script" && u.querySelector(ge(n))) ||
          ((t = u.createElement("link")),
          Rl(t, "link", l),
          Ol(t),
          u.head.appendChild(t)));
    }
  }
  function Rd(l, t) {
    Wt.m(l, t);
    var a = Au;
    if (a && l) {
      var u = t && typeof t.as == "string" ? t.as : "script",
        e =
          'link[rel="modulepreload"][as="' + st(u) + '"][href="' + st(l) + '"]',
        n = e;
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ou(l);
      }
      if (
        !St.has(n) &&
        ((l = q({ rel: "modulepreload", href: l }, t)),
        St.set(n, l),
        a.querySelector(e) === null)
      ) {
        switch (u) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(ge(n))) return;
        }
        (u = a.createElement("link")),
          Rl(u, "link", l),
          Ol(u),
          a.head.appendChild(u);
      }
    }
  }
  function Cd(l, t, a) {
    Wt.S(l, t, a);
    var u = Au;
    if (u && l) {
      var e = Ja(u).hoistableStyles,
        n = _u(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var i = { loading: 0, preload: null };
        if ((f = u.querySelector(he(n)))) i.loading = 5;
        else {
          (l = q({ rel: "stylesheet", href: l, "data-precedence": t }, a)),
            (a = St.get(n)) && Ii(l, a);
          var c = (f = u.createElement("link"));
          Ol(c),
            Rl(c, "link", l),
            (c._p = new Promise(function (m, S) {
              (c.onload = m), (c.onerror = S);
            })),
            c.addEventListener("load", function () {
              i.loading |= 1;
            }),
            c.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            Nn(f, t, u);
        }
        (f = { type: "stylesheet", instance: f, count: 1, state: i }),
          e.set(n, f);
      }
    }
  }
  function qd(l, t) {
    Wt.X(l, t);
    var a = Au;
    if (a && l) {
      var u = Ja(a).hoistableScripts,
        e = Ou(l),
        n = u.get(e);
      n ||
        ((n = a.querySelector(ge(e))),
        n ||
          ((l = q({ src: l, async: !0 }, t)),
          (t = St.get(e)) && Pi(l, t),
          (n = a.createElement("script")),
          Ol(n),
          Rl(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        u.set(e, n));
    }
  }
  function Bd(l, t) {
    Wt.M(l, t);
    var a = Au;
    if (a && l) {
      var u = Ja(a).hoistableScripts,
        e = Ou(l),
        n = u.get(e);
      n ||
        ((n = a.querySelector(ge(e))),
        n ||
          ((l = q({ src: l, async: !0, type: "module" }, t)),
          (t = St.get(e)) && Pi(l, t),
          (n = a.createElement("script")),
          Ol(n),
          Rl(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        u.set(e, n));
    }
  }
  function ko(l, t, a, u) {
    var e = (e = V.current) ? Un(e) : null;
    if (!e) throw Error(v(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = _u(a.href)),
            (a = Ja(e).hoistableStyles),
            (u = a.get(t)),
            u ||
              ((u = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, u)),
            u)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          l = _u(a.href);
          var n = Ja(e).hoistableStyles,
            f = n.get(l);
          if (
            (f ||
              ((e = e.ownerDocument || e),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, f),
              (n = e.querySelector(he(l))) &&
                !n._p &&
                ((f.instance = n), (f.state.loading = 5)),
              St.has(l) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                St.set(l, a),
                n || Yd(e, l, a, f.state))),
            t && u === null)
          )
            throw Error(v(528, ""));
          return f;
        }
        if (t && u !== null) throw Error(v(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ou(a)),
              (a = Ja(e).hoistableScripts),
              (u = a.get(t)),
              u ||
                ((u = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, u)),
              u)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(v(444, l));
    }
  }
  function _u(l) {
    return 'href="' + st(l) + '"';
  }
  function he(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Io(l) {
    return q({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Yd(l, t, a, u) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (u.loading = 1)
      : ((t = l.createElement("link")),
        (u.preload = t),
        t.addEventListener("load", function () {
          return (u.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (u.loading |= 2);
        }),
        Rl(t, "link", a),
        Ol(t),
        l.head.appendChild(t));
  }
  function Ou(l) {
    return '[src="' + st(l) + '"]';
  }
  function ge(l) {
    return "script[async]" + l;
  }
  function Po(l, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var u = l.querySelector('style[data-href~="' + st(a.href) + '"]');
          if (u) return (t.instance = u), Ol(u), u;
          var e = q({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (u = (l.ownerDocument || l).createElement("style")),
            Ol(u),
            Rl(u, "style", e),
            Nn(u, a.precedence, l),
            (t.instance = u)
          );
        case "stylesheet":
          e = _u(a.href);
          var n = l.querySelector(he(e));
          if (n) return (t.state.loading |= 4), (t.instance = n), Ol(n), n;
          (u = Io(a)),
            (e = St.get(e)) && Ii(u, e),
            (n = (l.ownerDocument || l).createElement("link")),
            Ol(n);
          var f = n;
          return (
            (f._p = new Promise(function (i, c) {
              (f.onload = i), (f.onerror = c);
            })),
            Rl(n, "link", u),
            (t.state.loading |= 4),
            Nn(n, a.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Ou(a.src)),
            (e = l.querySelector(ge(n)))
              ? ((t.instance = e), Ol(e), e)
              : ((u = a),
                (e = St.get(n)) && ((u = q({}, a)), Pi(u, e)),
                (l = l.ownerDocument || l),
                (e = l.createElement("script")),
                Ol(e),
                Rl(e, "link", u),
                l.head.appendChild(e),
                (t.instance = e))
          );
        case "void":
          return null;
        default:
          throw Error(v(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((u = t.instance), (t.state.loading |= 4), Nn(u, a.precedence, l));
    return t.instance;
  }
  function Nn(l, t, a) {
    for (
      var u = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        e = u.length ? u[u.length - 1] : null,
        n = e,
        f = 0;
      f < u.length;
      f++
    ) {
      var i = u[f];
      if (i.dataset.precedence === t) n = i;
      else if (n !== e) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(l, t.firstChild));
  }
  function Ii(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title);
  }
  function Pi(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity);
  }
  var Hn = null;
  function lv(l, t, a) {
    if (Hn === null) {
      var u = new Map(),
        e = (Hn = new Map());
      e.set(a, u);
    } else (e = Hn), (u = e.get(a)), u || ((u = new Map()), e.set(a, u));
    if (u.has(l)) return u;
    for (
      u.set(l, null), a = a.getElementsByTagName(l), e = 0;
      e < a.length;
      e++
    ) {
      var n = a[e];
      if (
        !(
          n[Ru] ||
          n[Dl] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var i = u.get(f);
        i ? i.push(n) : u.set(f, [n]);
      }
    }
    return u;
  }
  function tv(l, t, a) {
    (l = l.ownerDocument || l),
      l.head.insertBefore(
        a,
        t === "title" ? l.querySelector("head > title") : null
      );
  }
  function jd(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (l = t.disabled), typeof t.precedence == "string" && l == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function av(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function xd(l, t, a, u) {
    if (
      a.type === "stylesheet" &&
      (typeof u.media != "string" || matchMedia(u.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var e = _u(u.href),
          n = t.querySelector(he(e));
        if (n) {
          (t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = Rn.bind(l)), t.then(l, l)),
            (a.state.loading |= 4),
            (a.instance = n),
            Ol(n);
          return;
        }
        (n = t.ownerDocument || t),
          (u = Io(u)),
          (e = St.get(e)) && Ii(u, e),
          (n = n.createElement("link")),
          Ol(n);
        var f = n;
        (f._p = new Promise(function (i, c) {
          (f.onload = i), (f.onerror = c);
        })),
          Rl(n, "link", u),
          (a.instance = n);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (l.count++,
          (a = Rn.bind(l)),
          t.addEventListener("load", a),
          t.addEventListener("error", a));
    }
  }
  var lc = 0;
  function Gd(l, t) {
    return (
      l.stylesheets && l.count === 0 && qn(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (a) {
            var u = setTimeout(function () {
              if ((l.stylesheets && qn(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                (l.unsuspend = null), n();
              }
            }, 6e4 + t);
            0 < l.imgBytes && lc === 0 && (lc = 62500 * bd());
            var e = setTimeout(function () {
              if (
                ((l.waitingForImages = !1),
                l.count === 0 &&
                  (l.stylesheets && qn(l, l.stylesheets), l.unsuspend))
              ) {
                var n = l.unsuspend;
                (l.unsuspend = null), n();
              }
            }, (l.imgBytes > lc ? 50 : 800) + t);
            return (
              (l.unsuspend = a),
              function () {
                (l.unsuspend = null), clearTimeout(u), clearTimeout(e);
              }
            );
          }
        : null
    );
  }
  function Rn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) qn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        (this.unsuspend = null), l();
      }
    }
  }
  var Cn = null;
  function qn(l, t) {
    (l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Cn = new Map()),
        t.forEach(Xd, l),
        (Cn = null),
        Rn.call(l));
  }
  function Xd(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Cn.get(l);
      if (a) var u = a.get(null);
      else {
        (a = new Map()), Cn.set(l, a);
        for (
          var e = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            n = 0;
          n < e.length;
          n++
        ) {
          var f = e[n];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (a.set(f.dataset.precedence, f), (u = f));
        }
        u && a.set(null, u);
      }
      (e = t.instance),
        (f = e.getAttribute("data-precedence")),
        (n = a.get(f) || u),
        n === u && a.set(null, e),
        a.set(f, e),
        this.count++,
        (u = Rn.bind(this)),
        e.addEventListener("load", u),
        e.addEventListener("error", u),
        n
          ? n.parentNode.insertBefore(e, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(e, l.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Se = {
    $$typeof: ql,
    Provider: null,
    Consumer: null,
    _currentValue: j,
    _currentValue2: j,
    _threadCount: 0,
  };
  function Qd(l, t, a, u, e, n, f, i, c) {
    (this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Wn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Wn(0)),
      (this.hiddenUpdates = Wn(null)),
      (this.identifierPrefix = u),
      (this.onUncaughtError = e),
      (this.onCaughtError = n),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = c),
      (this.incompleteTransitions = new Map());
  }
  function uv(l, t, a, u, e, n, f, i, c, m, S, z) {
    return (
      (l = new Qd(l, t, a, f, c, m, S, z, i)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = tt(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Cf()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: u, isDehydrated: a, cache: t }),
      jf(n),
      l
    );
  }
  function ev(l) {
    return l ? ((l = au), l) : au;
  }
  function nv(l, t, a, u, e, n) {
    (e = ev(e)),
      u.context === null ? (u.context = e) : (u.pendingContext = e),
      (u = na(t)),
      (u.payload = { element: a }),
      (n = n === void 0 ? null : n),
      n !== null && (u.callback = n),
      (a = fa(l, u, t)),
      a !== null && ($l(a, l, t), $u(a, l, t));
  }
  function fv(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function tc(l, t) {
    fv(l, t), (l = l.alternate) && fv(l, t);
  }
  function iv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ua(l, 67108864);
      t !== null && $l(t, l, 67108864), tc(l, 67108864);
    }
  }
  function cv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ft();
      t = $n(t);
      var a = Ua(l, t);
      a !== null && $l(a, l, t), tc(l, t);
    }
  }
  var Bn = !0;
  function Zd(l, t, a, u) {
    var e = r.T;
    r.T = null;
    var n = O.p;
    try {
      (O.p = 2), ac(l, t, a, u);
    } finally {
      (O.p = n), (r.T = e);
    }
  }
  function Ld(l, t, a, u) {
    var e = r.T;
    r.T = null;
    var n = O.p;
    try {
      (O.p = 8), ac(l, t, a, u);
    } finally {
      (O.p = n), (r.T = e);
    }
  }
  function ac(l, t, a, u) {
    if (Bn) {
      var e = uc(u);
      if (e === null) Zi(l, t, u, Yn, a), ov(l, u);
      else if (Kd(e, l, t, a, u)) u.stopPropagation();
      else if ((ov(l, u), t & 4 && -1 < Vd.indexOf(l))) {
        for (; e !== null; ) {
          var n = Ka(e);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var f = _a(n.pendingLanes);
                  if (f !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; f; ) {
                      var c = 1 << (31 - Pl(f));
                      (i.entanglements[1] |= c), (f &= ~c);
                    }
                    Dt(n), (al & 6) === 0 && ((rn = kl() + 500), ve(0));
                  }
                }
                break;
              case 31:
              case 13:
                (i = Ua(n, 2)), i !== null && $l(i, n, 2), zn(), tc(n, 2);
            }
          if (((n = uc(u)), n === null && Zi(l, t, u, Yn, a), n === e)) break;
          e = n;
        }
        e !== null && u.stopPropagation();
      } else Zi(l, t, u, null, a);
    }
  }
  function uc(l) {
    return (l = ef(l)), ec(l);
  }
  var Yn = null;
  function ec(l) {
    if (((Yn = null), (l = Va(l)), l !== null)) {
      var t = U(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((l = G(t)), l !== null)) return l;
          l = null;
        } else if (a === 31) {
          if (((l = k(t)), l !== null)) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return (Yn = l), null;
  }
  function sv(l) {
    switch (l) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Uv()) {
          case gc:
            return 2;
          case Sc:
            return 8;
          case _e:
          case Nv:
            return 32;
          case rc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var nc = !1,
    Sa = null,
    ra = null,
    ba = null,
    re = new Map(),
    be = new Map(),
    za = [],
    Vd =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function ov(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Sa = null;
        break;
      case "dragenter":
      case "dragleave":
        ra = null;
        break;
      case "mouseover":
      case "mouseout":
        ba = null;
        break;
      case "pointerover":
      case "pointerout":
        re.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        be.delete(t.pointerId);
    }
  }
  function ze(l, t, a, u, e, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: u,
          nativeEvent: n,
          targetContainers: [e],
        }),
        t !== null && ((t = Ka(t)), t !== null && iv(t)),
        l)
      : ((l.eventSystemFlags |= u),
        (t = l.targetContainers),
        e !== null && t.indexOf(e) === -1 && t.push(e),
        l);
  }
  function Kd(l, t, a, u, e) {
    switch (t) {
      case "focusin":
        return (Sa = ze(Sa, l, t, a, u, e)), !0;
      case "dragenter":
        return (ra = ze(ra, l, t, a, u, e)), !0;
      case "mouseover":
        return (ba = ze(ba, l, t, a, u, e)), !0;
      case "pointerover":
        var n = e.pointerId;
        return re.set(n, ze(re.get(n) || null, l, t, a, u, e)), !0;
      case "gotpointercapture":
        return (
          (n = e.pointerId), be.set(n, ze(be.get(n) || null, l, t, a, u, e)), !0
        );
    }
    return !1;
  }
  function vv(l) {
    var t = Va(l.target);
    if (t !== null) {
      var a = U(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = G(a)), t !== null)) {
            (l.blockedOn = t),
              _c(l.priority, function () {
                cv(a);
              });
            return;
          }
        } else if (t === 31) {
          if (((t = k(a)), t !== null)) {
            (l.blockedOn = t),
              _c(l.priority, function () {
                cv(a);
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function jn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = uc(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var u = new a.constructor(a.type, a);
        (uf = u), a.target.dispatchEvent(u), (uf = null);
      } else return (t = Ka(a)), t !== null && iv(t), (l.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function yv(l, t, a) {
    jn(l) && a.delete(t);
  }
  function Jd() {
    (nc = !1),
      Sa !== null && jn(Sa) && (Sa = null),
      ra !== null && jn(ra) && (ra = null),
      ba !== null && jn(ba) && (ba = null),
      re.forEach(yv),
      be.forEach(yv);
  }
  function xn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      nc ||
        ((nc = !0),
        A.unstable_scheduleCallback(A.unstable_NormalPriority, Jd)));
  }
  var Gn = null;
  function dv(l) {
    Gn !== l &&
      ((Gn = l),
      A.unstable_scheduleCallback(A.unstable_NormalPriority, function () {
        Gn === l && (Gn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t],
            u = l[t + 1],
            e = l[t + 2];
          if (typeof u != "function") {
            if (ec(u || a) === null) continue;
            break;
          }
          var n = Ka(a);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            ui(n, { pending: !0, data: e, method: a.method, action: u }, u, e));
        }
      }));
  }
  function Mu(l) {
    function t(c) {
      return xn(c, l);
    }
    Sa !== null && xn(Sa, l),
      ra !== null && xn(ra, l),
      ba !== null && xn(ba, l),
      re.forEach(t),
      be.forEach(t);
    for (var a = 0; a < za.length; a++) {
      var u = za[a];
      u.blockedOn === l && (u.blockedOn = null);
    }
    for (; 0 < za.length && ((a = za[0]), a.blockedOn === null); )
      vv(a), a.blockedOn === null && za.shift();
    if (((a = (l.ownerDocument || l).$$reactFormReplay), a != null))
      for (u = 0; u < a.length; u += 3) {
        var e = a[u],
          n = a[u + 1],
          f = e[Ll] || null;
        if (typeof n == "function") f || dv(a);
        else if (f) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (((e = n), (f = n[Ll] || null))) i = f.formAction;
            else if (ec(e) !== null) continue;
          } else i = f.action;
          typeof i == "function" ? (a[u + 1] = i) : (a.splice(u, 3), (u -= 3)),
            dv(a);
        }
      }
  }
  function mv() {
    function l(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (e = f);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      e !== null && (e(), (e = null)), u || setTimeout(a, 20);
    }
    function a() {
      if (!u && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var u = !1,
        e = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(a, 100),
        function () {
          (u = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            e !== null && (e(), (e = null));
        }
      );
    }
  }
  function fc(l) {
    this._internalRoot = l;
  }
  (Xn.prototype.render = fc.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(v(409));
      var a = t.current,
        u = ft();
      nv(a, u, l, t, null, null);
    }),
    (Xn.prototype.unmount = fc.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          nv(l.current, 2, null, l, null, null), zn(), (t[La] = null);
        }
      });
  function Xn(l) {
    this._internalRoot = l;
  }
  Xn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = Ac();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < za.length && t !== 0 && t < za[a].priority; a++);
      za.splice(a, 0, l), a === 0 && vv(l);
    }
  };
  var hv = Y.version;
  if (hv !== "19.2.0") throw Error(v(527, hv, "19.2.0"));
  O.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(v(188))
        : ((l = Object.keys(l).join(",")), Error(v(268, l)));
    return (
      (l = E(t)),
      (l = l !== null ? I(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var wd = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: r,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qn.isDisabled && Qn.supportsFiber)
      try {
        (Uu = Qn.inject(wd)), (Il = Qn);
      } catch {}
  }
  return (
    (Ee.createRoot = function (l, t) {
      if (!p(l)) throw Error(v(299));
      var a = !1,
        u = "",
        e = Ts,
        n = Es,
        f = As;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (u = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (e = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = uv(l, 1, !1, null, null, a, u, null, e, n, f, mv)),
        (l[La] = t.current),
        Qi(l),
        new fc(t)
      );
    }),
    (Ee.hydrateRoot = function (l, t, a) {
      if (!p(l)) throw Error(v(299));
      var u = !1,
        e = "",
        n = Ts,
        f = Es,
        i = As,
        c = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (u = !0),
          a.identifierPrefix !== void 0 && (e = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (i = a.onRecoverableError),
          a.formState !== void 0 && (c = a.formState)),
        (t = uv(l, 1, !0, t, a ?? null, u, e, c, n, f, i, mv)),
        (t.context = ev(null)),
        (a = t.current),
        (u = ft()),
        (u = $n(u)),
        (e = na(u)),
        (e.callback = null),
        fa(a, e, u),
        (a = u),
        (t.current.lanes = a),
        Hu(t, a),
        Dt(t),
        (l[La] = t.current),
        Qi(l),
        new Xn(t)
      );
    }),
    (Ee.version = "19.2.0"),
    Ee
  );
}
var Ov;
function um() {
  if (Ov) return sc.exports;
  Ov = 1;
  function A() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(A);
      } catch (Y) {
        console.error(Y);
      }
  }
  return A(), (sc.exports = am()), sc.exports;
}
var em = um();
const nm = ({
  occupancy: A = 0,
  progressColor: Y = "#2B2B2B",
  strokeWidth: _ = 8,
  duration: v = 5e3,
}) => {
  const p = Math.min(Math.max(A, 0), 100),
    U = Cl.useRef(null),
    [G, k] = Cl.useState(0),
    R = (p / 100) * G,
    E = G - R;
  return (
    Cl.useEffect(() => {
      U.current &&
        requestAnimationFrame(() => {
          if (U.current) {
            const I = U.current.getTotalLength();
            k(I);
          }
        });
    }, []),
    x.jsxs("div", {
      className: "progress",
      children: [
        x.jsx("div", {
          className: "absolute inset-0 z-0 rounded-full opacity-30",
          style: { backgroundColor: Y },
        }),
        x.jsxs("svg", {
          className: "z-10",
          width: "1vw",
          height: "1vw",
          viewBox: "0 0 115 115",
          children: [
            x.jsx("path", {
              d: "M 57.531845,8.532482 A 48.999363,48.999363 0 0,1 106.53121,57.531845 A 48.999363,48.999363 0 0,1 57.531845,106.53121 A 48.999363,48.999363 0 0,1 8.532482,57.531845 A 48.999363,48.999363 0 0,1 57.531845,8.532482",
              stroke: "#0000004d",
              strokeWidth: _,
              fill: "none",
            }),
            x.jsx("path", {
              className: "progress",
              ref: U,
              d: "M 57.531845,8.532482 A 48.999363,48.999363 0 0,1 106.53121,57.531845 A 48.999363,48.999363 0 0,1 57.531845,106.53121 A 48.999363,48.999363 0 0,1 8.532482,57.531845 A 48.999363,48.999363 0 0,1 57.531845,8.532482",
              fill: "none",
              stroke: Y,
              strokeWidth: _,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeDasharray: G,
              strokeDashoffset: E,
              style: { transition: `stroke-dashoffset ${v}ms linear` },
            }),
          ],
        }),
      ],
    })
  );
};
function fm({ notify: A, config: Y }) {
  const { typeStyles: _ } = Y,
    v = _[A.type] || _.info;
  return x.jsxs("div", {
    className: `notif-card ${A.closing ? "closing" : ""}`,
    style: { background: v.gradient },
    children: [
      x.jsx("div", {
        style: {
          width: "4px",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          background: v.color,
          borderRadius: "10px 0px 0px 10px",
        },
      }),
      x.jsx("div", {
        className: "diamond",
        style: { width: "2vw", height: "2vw", borderColor: v.color },
        children: x.jsx("img", {
          src: v.icon,
          alt: "icon",
          className: "diamond-icon",
        }),
      }),
      x.jsxs("div", {
        className: "notif-content",
        children: [
          x.jsx("h3", {
            style: {
              color: v.color,
              textShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            },
            children: A.title,
          }),
          x.jsx("p", {
            style: {
              color: "white",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.5,
              letterSpacing: 0.2,
              wordSpacing: 0.5,
              whiteSpace: "pre-line",
              textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
            },
            dangerouslySetInnerHTML: { __html: A.message },
          }),
        ],
      }),
      x.jsx(nm, { duration: A.duration, progressColor: v.color }),
    ],
  });
}
const im = () => {},
  pu = (A, Y) => {
    const _ = Cl.useRef(im);
    Cl.useEffect(() => {
      _.current = Y;
    }, [Y]),
      Cl.useEffect(() => {
        const v = (p) => {
          const { action: U, data: G } = p.data;
          _.current && U === A && _.current(G);
        };
        return (
          window.addEventListener("message", v),
          () => window.removeEventListener("message", v)
        );
      }, [A]);
  };
function cm({ config: A }) {
  const [Y, _] = Cl.useState([]);
  return (
    pu("notify", (v) => {
      const p = Math.floor(Math.random() * 1e6),
        U = { ...v, id: p };
      A.debug && console.log("notify", JSON.stringify(U)),
        _((G) => [...G, U]),
        setTimeout(() => {
          _((G) => G.map((k) => (k.id === p ? { ...k, closing: !0 } : k))),
            setTimeout(() => {
              _((G) => G.filter((k) => k.id !== p));
            }, 350);
        }, U.duration);
    }),
    pu("clear", () => {
      _([]);
    }),
    Cl.useEffect(() => {
      Y.map((v) => {
        setTimeout(() => {
          _((p) => p.map((U) => (U.id === v.id ? { ...U, closing: !0 } : U))),
            setTimeout(() => {
              _((p) => p.filter((U) => U.id !== v.id));
            }, 350);
        }, v.duration);
      });
    }, [Y]),
    x.jsx("div", {
      className: "notify-container",
      style: {
        top: A.notifyPosition.top,
        right: A.notifyPosition.right,
        left: A.notifyPosition.left,
        bottom: A.notifyPosition.bottom,
      },
      children: Y.map((v) => x.jsx(fm, { notify: v, config: A }, v.id)),
    })
  );
}
function sm({
  duration: A = 5e3,
  label: Y = "Loading...",
  color: _ = "#ff8c00",
  config: v,
}) {
  const [p, U] = Cl.useState(0),
    G = A / 100,
    {
      progressType: k = 2,
      progressPosition: R = { vertical: "end", horizontal: "center" },
    } = v;
  Cl.useEffect(() => {
    const q = setInterval(() => {
      U((P) => (P >= 100 ? (clearInterval(q), 100) : P + 1));
    }, G);
    return () => {
      U(0), clearInterval(q);
    };
  }, []);
  const E = 32,
    I = Math.floor((p / 100) * E);
  return x.jsxs("div", {
    style: {
      ...$t.container,
      alignItems: R?.vertical,
      justifyContent: R?.horizontal,
    },
    children: [
      x.jsxs("div", {
        style: {
          ...$t.content,
          background: (k === 1 && "#1a1a1a") || void 0,
          flexDirection: k === 1 ? "row" : "column",
          clipPath:
            (k === 1 &&
              "polygon(23% 0, 37% 22%, 100% 23%, 100% 75%, 85% 100%, 0 100%, 0 0)") ||
            void 0,
        },
        children: [
          x.jsxs("div", {
            style: $t.circularProgress,
            children: [
              x.jsxs("svg", {
                width: "120",
                height: "120",
                viewBox: "0 0 120 120",
                style: $t.svg,
                children: [
                  [...Array(E)].map((q, P) => {
                    const Yl = (360 / E) * P,
                      pl = P < I;
                    return x.jsx(
                      "rect",
                      {
                        x: "56",
                        y: "7",
                        width: "6",
                        height: pl ? "12" : "10",
                        rx: "2",
                        fill: pl ? _ : "#333",
                        style: {
                          transformOrigin: "60px 60px",
                          transform: `rotate(${Yl}deg)`,
                        },
                      },
                      P
                    );
                  }),
                  x.jsx("circle", {
                    cx: "60",
                    cy: "60",
                    r: "32",
                    fill: "#1a1a1a",
                    stroke: _,
                    strokeWidth: "2",
                  }),
                ],
              }),
              x.jsxs("div", {
                style: $t.percentageText,
                children: [
                  x.jsx("span", {
                    style: { fontFamily: "cursive" },
                    children: p,
                  }),
                  x.jsx("span", {
                    style: { fontFamily: "math", fontSize: 14, color: _ },
                    children: "%",
                  }),
                ],
              }),
            ],
          }),
          x.jsxs("div", {
            style: $t.textContainer,
            children: [
              x.jsx("h2", {
                style: { ...$t.loadingText, color: _ },
                children: Y,
              }),
              k === 1 &&
                x.jsx("div", {
                  style: $t.barContainer,
                  children: [...Array(14)].map((q, P) =>
                    x.jsx(
                      "div",
                      {
                        style: {
                          ...$t.bar,
                          animation: `fillBar 2.2s ease-in-out ${
                            P * 0.1
                          }s infinite`,
                        },
                      },
                      P
                    )
                  ),
                }),
            ],
          }),
        ],
      }),
      x.jsx("style", {
        children: `
        @keyframes fillBar {
          0%,
          100% {
            background: linear-gradient(to bottom, #444, #222);
          }
          50% {
            background: linear-gradient(to bottom, ${_}, ${_});
          }
        }
        `,
      }),
    ],
  });
}
const $t = {
    container: {
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "end",
      justifyContent: "start",
      margin: "0 auto",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
    },
    content: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "50vw",
    },
    circularProgress: { position: "relative", width: "120px" },
    svg: { transform: "rotate(-90deg)" },
    percentageText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -56%)",
      fontSize: "22px",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    textContainer: { display: "flex", flexDirection: "column", gap: "5px" },
    loadingText: {
      margin: 0,
      fontSize: "22px",
      fontWeight: "normal",
      color: "#ff8c00",
      fontFamily: "Arial, sans-serif",
    },
    barContainer: { display: "flex", alignItems: "flex-end", height: "30px" },
    bar: {
      width: "22px",
      height: "25px",
      background: "linear-gradient(to bottom, #444, #222)",
      clipPath: "polygon(20% 30%, 100% 30%, 75% 100%, 0% 100%)",
    },
  },
  om = ({ config: A }) => {
    const [Y, _] = Cl.useState(null);
    return (
      pu("progress", (v) => {
        if (!v.duration) return;
        _(v), A.debug && console.log("progress", JSON.stringify(v));
        const p = setInterval(() => {
          _((G) => (G ? { ...G, out: !0 } : null));
          const U = setInterval(() => {
            _(null), clearInterval(p), clearInterval(U);
          }, 500);
        }, v.duration);
      }),
      pu("progressEnd", () => {
        _((p) => (p ? { ...p, out: !0 } : null));
        const v = setInterval(() => {
          _(null), clearInterval(v);
        }, 500);
      }),
      Cl.useEffect(() => () => _(null), []),
      Y &&
        x.jsx("div", {
          style: {
            animationName: Y.out ? "upOut" : "upIn",
            animationDuration: "500ms",
            animationTimingFunction: "ease-in-out",
            animationFillMode: "forwards",
          },
          children: x.jsx(sm, {
            config: A,
            duration: Y.duration,
            label: Y.label,
          }),
        })
    );
  },
  vm = ({ notify: A, config: Y }) => {
    const _ = Y[A.type] || Y.general;
    return x.jsxs("div", {
      className: "item-notification",
      style: {
        animationName: A.closing ? "upOut" : "upIn",
        animationDuration: "500ms",
        animationTimingFunction: "ease-in-out",
        animationFillMode: "forwards",
      },
      children: [
        x.jsx("div", {
          className: "diamond",
          style: {
            width: "3vw",
            height: "3vw",
            borderColor: _.borderColor,
            backgroundColor: _.color,
            boxShadow: `0 0 0.3vw ${_.color}`,
            top: "50%",
            left: "50%",
            position: "relative",
            transform: "translate(-50%,-60%) rotate(45deg)",
          },
          children: x.jsx("img", {
            src: A.img,
            alt: "icon",
            style: { width: "100%", transform: "rotate(-45deg)" },
          }),
        }),
        x.jsxs("div", {
          className: "item-desc",
          style: {
            marginTop: "4vw",
            color: "#fff",
            fontSize: "0.8vw",
            textAlign: "center",
          },
          children: [
            A.desc,
            " ",
            x.jsxs("span", {
              className: "item-desc",
              style: { color: _.color, fontSize: "0.6vw" },
              children: ["x", A.amount],
            }),
          ],
        }),
        x.jsx("div", {
          className: "item-info",
          style: {
            backgroundColor: _.color,
            color: _.borderColor,
            fontSize: "0.7vw",
            padding: "0.2vw 0.3vw",
            borderRadius: "0.2vw",
            fontWeight: "bold",
            textShadow: "0 0 0.1vw #000",
            textAlign: "center",
            borderColor: _.borderColor,
            boxShadow: `0 0 0.3vw ${_.borderColor}`,
            borderStyle: "solid",
            borderWidth: "0.1vw",
            marginTop: "0.5vw",
          },
          children: x.jsx("div", { className: "item-title", children: _.text }),
        }),
      ],
    });
  },
  ym = ({ config: A }) => {
    const [Y, _] = Cl.useState([]);
    return (
      pu("itemNotify", (v) => {
        const p = Math.floor(Math.random() * 1e6),
          U = { ...v, id: p };
        A.debug && console.log("itemNotify", JSON.stringify(U)),
          _((G) => [...G, U]),
          setTimeout(() => {
            _((G) => G.map((k) => (k.id === p ? { ...k, closing: !0 } : k))),
              setTimeout(() => {
                _((G) => G.filter((k) => k.id !== p));
              }, 350);
          }, U.duration);
      }),
      Cl.useEffect(() => {
        Y.forEach((v) => {
          setTimeout(() => {
            _((p) => p.map((U) => (U.id === v.id ? { ...U, closing: !0 } : U))),
              setTimeout(() => {
                _((p) => p.filter((U) => U.id !== v.id));
              }, 350);
          }, v.duration);
        });
      }, []),
      x.jsx("div", {
        className: "itens-notify-container",
        style: {
          bottom: A.itemNotifyPosition.bottom,
          left: A.itemNotifyPosition.left,
          right: A.itemNotifyPosition.right,
          top: A.itemNotifyPosition.top,
        },
        children: Y.map((v) =>
          x.jsx(vm, { notify: v, config: A.itemStyles }, v.id)
        ),
      })
    );
  },
  dm = () => !window.invokeNative;
function mm() {
  const [A, Y] = Cl.useState(null);

  return (
    pu("setConfig", (_) => {
      _.debug && console.log("SetConfig"), Y(_);
    }),
    Cl.useEffect(() => {
      const _ = async () => {
        const v = await fetch("/config.json").then((p) => p.json());
        Y(v);
      };
      const __ = async () => {
        const v = await fetch("http://will_notifications/nuiLoaded", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ loaded: !0 }),
        });
        Y(v);
      };
      (dm() && _()) || __();
    }, []),
    A &&
      x.jsxs("div", {
        children: [
          x.jsx(cm, { config: A }),
          x.jsx(om, { config: A }),
          x.jsx(ym, { config: A }),
        ],
      })
  );
}
em.createRoot(document.getElementById("root")).render(
  x.jsx(Cl.StrictMode, { children: x.jsx(mm, {}) })
);
