(() => {
  var e,
    t = {
      251: (e, t) => {
        (t.read = function (e, t, o, n, r) {
          var a,
            s,
            i = 8 * r - n - 1,
            c = (1 << i) - 1,
            l = c >> 1,
            u = -7,
            d = o ? r - 1 : 0,
            p = o ? -1 : 1,
            h = e[t + d];
          for (
            d += p, a = h & ((1 << -u) - 1), h >>= -u, u += i;
            u > 0;
            a = 256 * a + e[t + d], d += p, u -= 8
          );
          for (
            s = a & ((1 << -u) - 1), a >>= -u, u += n;
            u > 0;
            s = 256 * s + e[t + d], d += p, u -= 8
          );
          if (0 === a) a = 1 - l;
          else {
            if (a === c) return s ? NaN : (1 / 0) * (h ? -1 : 1);
            (s += Math.pow(2, n)), (a -= l);
          }
          return (h ? -1 : 1) * s * Math.pow(2, a - n);
        }),
          (t.write = function (e, t, o, n, r, a) {
            var s,
              i,
              c,
              l = 8 * a - r - 1,
              u = (1 << l) - 1,
              d = u >> 1,
              p = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              h = n ? 0 : a - 1,
              f = n ? 1 : -1,
              m = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
            for (
              t = Math.abs(t),
                isNaN(t) || t === 1 / 0
                  ? ((i = isNaN(t) ? 1 : 0), (s = u))
                  : ((s = Math.floor(Math.log(t) / Math.LN2)),
                    t * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                    (t += s + d >= 1 ? p / c : p * Math.pow(2, 1 - d)) * c >=
                      2 && (s++, (c /= 2)),
                    s + d >= u
                      ? ((i = 0), (s = u))
                      : s + d >= 1
                      ? ((i = (t * c - 1) * Math.pow(2, r)), (s += d))
                      : ((i = t * Math.pow(2, d - 1) * Math.pow(2, r)),
                        (s = 0)));
              r >= 8;
              e[o + h] = 255 & i, h += f, i /= 256, r -= 8
            );
            for (
              s = (s << r) | i, l += r;
              l > 0;
              e[o + h] = 255 & s, h += f, s /= 256, l -= 8
            );
            e[o + h - f] |= 128 * m;
          });
      },
      262: (e, t) => {
        "use strict";
        t.A = (e, t) => {
          const o = e.__vccOpts || e;
          for (const [e, n] of t) o[e] = n;
          return o;
        };
      },
      287: (e, t, o) => {
        "use strict";
        var n = o(526),
          r = o(251),
          a = o(634);
        function s() {
          return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function i(e, t) {
          if (s() < t) throw new RangeError("Invalid typed array length");
          return (
            c.TYPED_ARRAY_SUPPORT
              ? ((e = new Uint8Array(t)).__proto__ = c.prototype)
              : (null === e && (e = new c(t)), (e.length = t)),
            e
          );
        }
        function c(e, t, o) {
          if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c))
            return new c(e, t, o);
          if ("number" == typeof e) {
            if ("string" == typeof t)
              throw new Error(
                "If encoding is specified then the first argument must be a string"
              );
            return d(this, e);
          }
          return l(this, e, t, o);
        }
        function l(e, t, o, n) {
          if ("number" == typeof t)
            throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
            ? (function (e, t, o, n) {
                if ((t.byteLength, o < 0 || t.byteLength < o))
                  throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < o + (n || 0))
                  throw new RangeError("'length' is out of bounds");
                t =
                  void 0 === o && void 0 === n
                    ? new Uint8Array(t)
                    : void 0 === n
                    ? new Uint8Array(t, o)
                    : new Uint8Array(t, o, n);
                c.TYPED_ARRAY_SUPPORT
                  ? ((e = t).__proto__ = c.prototype)
                  : (e = p(e, t));
                return e;
              })(e, t, o, n)
            : "string" == typeof t
            ? (function (e, t, o) {
                ("string" == typeof o && "" !== o) || (o = "utf8");
                if (!c.isEncoding(o))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var n = 0 | f(t, o);
                e = i(e, n);
                var r = e.write(t, o);
                r !== n && (e = e.slice(0, r));
                return e;
              })(e, t, o)
            : (function (e, t) {
                if (c.isBuffer(t)) {
                  var o = 0 | h(t.length);
                  return 0 === (e = i(e, o)).length || t.copy(e, 0, 0, o), e;
                }
                if (t) {
                  if (
                    ("undefined" != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    "length" in t
                  )
                    return "number" != typeof t.length || (n = t.length) != n
                      ? i(e, 0)
                      : p(e, t);
                  if ("Buffer" === t.type && a(t.data)) return p(e, t.data);
                }
                var n;
                throw new TypeError(
                  "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
                );
              })(e, t);
        }
        function u(e) {
          if ("number" != typeof e)
            throw new TypeError('"size" argument must be a number');
          if (e < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function d(e, t) {
          if ((u(t), (e = i(e, t < 0 ? 0 : 0 | h(t))), !c.TYPED_ARRAY_SUPPORT))
            for (var o = 0; o < t; ++o) e[o] = 0;
          return e;
        }
        function p(e, t) {
          var o = t.length < 0 ? 0 : 0 | h(t.length);
          e = i(e, o);
          for (var n = 0; n < o; n += 1) e[n] = 255 & t[n];
          return e;
        }
        function h(e) {
          if (e >= s())
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                s().toString(16) +
                " bytes"
            );
          return 0 | e;
        }
        function f(e, t) {
          if (c.isBuffer(e)) return e.length;
          if (
            "undefined" != typeof ArrayBuffer &&
            "function" == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
          )
            return e.byteLength;
          "string" != typeof e && (e = "" + e);
          var o = e.length;
          if (0 === o) return 0;
          for (var n = !1; ; )
            switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                return o;
              case "utf8":
              case "utf-8":
              case void 0:
                return F(e).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * o;
              case "hex":
                return o >>> 1;
              case "base64":
                return z(e).length;
              default:
                if (n) return F(e).length;
                (t = ("" + t).toLowerCase()), (n = !0);
            }
        }
        function m(e, t, o) {
          var n = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
          if (((void 0 === o || o > this.length) && (o = this.length), o <= 0))
            return "";
          if ((o >>>= 0) <= (t >>>= 0)) return "";
          for (e || (e = "utf8"); ; )
            switch (e) {
              case "hex":
                return R(this, t, o);
              case "utf8":
              case "utf-8":
                return T(this, t, o);
              case "ascii":
                return A(this, t, o);
              case "latin1":
              case "binary":
                return O(this, t, o);
              case "base64":
                return C(this, t, o);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return N(this, t, o);
              default:
                if (n) throw new TypeError("Unknown encoding: " + e);
                (e = (e + "").toLowerCase()), (n = !0);
            }
        }
        function g(e, t, o) {
          var n = e[t];
          (e[t] = e[o]), (e[o] = n);
        }
        function b(e, t, o, n, r) {
          if (0 === e.length) return -1;
          if (
            ("string" == typeof o
              ? ((n = o), (o = 0))
              : o > 2147483647
              ? (o = 2147483647)
              : o < -2147483648 && (o = -2147483648),
            (o = +o),
            isNaN(o) && (o = r ? 0 : e.length - 1),
            o < 0 && (o = e.length + o),
            o >= e.length)
          ) {
            if (r) return -1;
            o = e.length - 1;
          } else if (o < 0) {
            if (!r) return -1;
            o = 0;
          }
          if (("string" == typeof t && (t = c.from(t, n)), c.isBuffer(t)))
            return 0 === t.length ? -1 : v(e, t, o, n, r);
          if ("number" == typeof t)
            return (
              (t &= 255),
              c.TYPED_ARRAY_SUPPORT &&
              "function" == typeof Uint8Array.prototype.indexOf
                ? r
                  ? Uint8Array.prototype.indexOf.call(e, t, o)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, o)
                : v(e, [t], o, n, r)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function v(e, t, o, n, r) {
          var a,
            s = 1,
            i = e.length,
            c = t.length;
          if (
            void 0 !== n &&
            ("ucs2" === (n = String(n).toLowerCase()) ||
              "ucs-2" === n ||
              "utf16le" === n ||
              "utf-16le" === n)
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (s = 2), (i /= 2), (c /= 2), (o /= 2);
          }
          function l(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s);
          }
          if (r) {
            var u = -1;
            for (a = o; a < i; a++)
              if (l(e, a) === l(t, -1 === u ? 0 : a - u)) {
                if ((-1 === u && (u = a), a - u + 1 === c)) return u * s;
              } else -1 !== u && (a -= a - u), (u = -1);
          } else
            for (o + c > i && (o = i - c), a = o; a >= 0; a--) {
              for (var d = !0, p = 0; p < c; p++)
                if (l(e, a + p) !== l(t, p)) {
                  d = !1;
                  break;
                }
              if (d) return a;
            }
          return -1;
        }
        function y(e, t, o, n) {
          o = Number(o) || 0;
          var r = e.length - o;
          n ? (n = Number(n)) > r && (n = r) : (n = r);
          var a = t.length;
          if (a % 2 != 0) throw new TypeError("Invalid hex string");
          n > a / 2 && (n = a / 2);
          for (var s = 0; s < n; ++s) {
            var i = parseInt(t.substr(2 * s, 2), 16);
            if (isNaN(i)) return s;
            e[o + s] = i;
          }
          return s;
        }
        function _(e, t, o, n) {
          return $(F(t, e.length - o), e, o, n);
        }
        function x(e, t, o, n) {
          return $(
            (function (e) {
              for (var t = [], o = 0; o < e.length; ++o)
                t.push(255 & e.charCodeAt(o));
              return t;
            })(t),
            e,
            o,
            n
          );
        }
        function S(e, t, o, n) {
          return x(e, t, o, n);
        }
        function w(e, t, o, n) {
          return $(z(t), e, o, n);
        }
        function E(e, t, o, n) {
          return $(
            (function (e, t) {
              for (
                var o, n, r, a = [], s = 0;
                s < e.length && !((t -= 2) < 0);
                ++s
              )
                (n = (o = e.charCodeAt(s)) >> 8),
                  (r = o % 256),
                  a.push(r),
                  a.push(n);
              return a;
            })(t, e.length - o),
            e,
            o,
            n
          );
        }
        function C(e, t, o) {
          return 0 === t && o === e.length
            ? n.fromByteArray(e)
            : n.fromByteArray(e.slice(t, o));
        }
        function T(e, t, o) {
          o = Math.min(e.length, o);
          for (var n = [], r = t; r < o; ) {
            var a,
              s,
              i,
              c,
              l = e[r],
              u = null,
              d = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
            if (r + d <= o)
              switch (d) {
                case 1:
                  l < 128 && (u = l);
                  break;
                case 2:
                  128 == (192 & (a = e[r + 1])) &&
                    (c = ((31 & l) << 6) | (63 & a)) > 127 &&
                    (u = c);
                  break;
                case 3:
                  (a = e[r + 1]),
                    (s = e[r + 2]),
                    128 == (192 & a) &&
                      128 == (192 & s) &&
                      (c = ((15 & l) << 12) | ((63 & a) << 6) | (63 & s)) >
                        2047 &&
                      (c < 55296 || c > 57343) &&
                      (u = c);
                  break;
                case 4:
                  (a = e[r + 1]),
                    (s = e[r + 2]),
                    (i = e[r + 3]),
                    128 == (192 & a) &&
                      128 == (192 & s) &&
                      128 == (192 & i) &&
                      (c =
                        ((15 & l) << 18) |
                        ((63 & a) << 12) |
                        ((63 & s) << 6) |
                        (63 & i)) > 65535 &&
                      c < 1114112 &&
                      (u = c);
              }
            null === u
              ? ((u = 65533), (d = 1))
              : u > 65535 &&
                ((u -= 65536),
                n.push(((u >>> 10) & 1023) | 55296),
                (u = 56320 | (1023 & u))),
              n.push(u),
              (r += d);
          }
          return (function (e) {
            var t = e.length;
            if (t <= k) return String.fromCharCode.apply(String, e);
            var o = "",
              n = 0;
            for (; n < t; )
              o += String.fromCharCode.apply(String, e.slice(n, (n += k)));
            return o;
          })(n);
        }
        (t.hp = c),
          (t.IS = 50),
          (c.TYPED_ARRAY_SUPPORT =
            void 0 !== o.g.TYPED_ARRAY_SUPPORT
              ? o.g.TYPED_ARRAY_SUPPORT
              : (function () {
                  try {
                    var e = new Uint8Array(1);
                    return (
                      (e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function () {
                          return 42;
                        },
                      }),
                      42 === e.foo() &&
                        "function" == typeof e.subarray &&
                        0 === e.subarray(1, 1).byteLength
                    );
                  } catch (e) {
                    return !1;
                  }
                })()),
          s(),
          (c.poolSize = 8192),
          (c._augment = function (e) {
            return (e.__proto__ = c.prototype), e;
          }),
          (c.from = function (e, t, o) {
            return l(null, e, t, o);
          }),
          c.TYPED_ARRAY_SUPPORT &&
            ((c.prototype.__proto__ = Uint8Array.prototype),
            (c.__proto__ = Uint8Array),
            "undefined" != typeof Symbol &&
              Symbol.species &&
              c[Symbol.species] === c &&
              Object.defineProperty(c, Symbol.species, {
                value: null,
                configurable: !0,
              })),
          (c.alloc = function (e, t, o) {
            return (function (e, t, o, n) {
              return (
                u(t),
                t <= 0
                  ? i(e, t)
                  : void 0 !== o
                  ? "string" == typeof n
                    ? i(e, t).fill(o, n)
                    : i(e, t).fill(o)
                  : i(e, t)
              );
            })(null, e, t, o);
          }),
          (c.allocUnsafe = function (e) {
            return d(null, e);
          }),
          (c.allocUnsafeSlow = function (e) {
            return d(null, e);
          }),
          (c.isBuffer = function (e) {
            return !(null == e || !e._isBuffer);
          }),
          (c.compare = function (e, t) {
            if (!c.isBuffer(e) || !c.isBuffer(t))
              throw new TypeError("Arguments must be Buffers");
            if (e === t) return 0;
            for (
              var o = e.length, n = t.length, r = 0, a = Math.min(o, n);
              r < a;
              ++r
            )
              if (e[r] !== t[r]) {
                (o = e[r]), (n = t[r]);
                break;
              }
            return o < n ? -1 : n < o ? 1 : 0;
          }),
          (c.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (c.concat = function (e, t) {
            if (!a(e))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === e.length) return c.alloc(0);
            var o;
            if (void 0 === t)
              for (t = 0, o = 0; o < e.length; ++o) t += e[o].length;
            var n = c.allocUnsafe(t),
              r = 0;
            for (o = 0; o < e.length; ++o) {
              var s = e[o];
              if (!c.isBuffer(s))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              s.copy(n, r), (r += s.length);
            }
            return n;
          }),
          (c.byteLength = f),
          (c.prototype._isBuffer = !0),
          (c.prototype.swap16 = function () {
            var e = this.length;
            if (e % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2) g(this, t, t + 1);
            return this;
          }),
          (c.prototype.swap32 = function () {
            var e = this.length;
            if (e % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4)
              g(this, t, t + 3), g(this, t + 1, t + 2);
            return this;
          }),
          (c.prototype.swap64 = function () {
            var e = this.length;
            if (e % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8)
              g(this, t, t + 7),
                g(this, t + 1, t + 6),
                g(this, t + 2, t + 5),
                g(this, t + 3, t + 4);
            return this;
          }),
          (c.prototype.toString = function () {
            var e = 0 | this.length;
            return 0 === e
              ? ""
              : 0 === arguments.length
              ? T(this, 0, e)
              : m.apply(this, arguments);
          }),
          (c.prototype.equals = function (e) {
            if (!c.isBuffer(e))
              throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === c.compare(this, e);
          }),
          (c.prototype.inspect = function () {
            var e = "",
              o = t.IS;
            return (
              this.length > 0 &&
                ((e = this.toString("hex", 0, o).match(/.{2}/g).join(" ")),
                this.length > o && (e += " ... ")),
              "<Buffer " + e + ">"
            );
          }),
          (c.prototype.compare = function (e, t, o, n, r) {
            if (!c.isBuffer(e))
              throw new TypeError("Argument must be a Buffer");
            if (
              (void 0 === t && (t = 0),
              void 0 === o && (o = e ? e.length : 0),
              void 0 === n && (n = 0),
              void 0 === r && (r = this.length),
              t < 0 || o > e.length || n < 0 || r > this.length)
            )
              throw new RangeError("out of range index");
            if (n >= r && t >= o) return 0;
            if (n >= r) return -1;
            if (t >= o) return 1;
            if (this === e) return 0;
            for (
              var a = (r >>>= 0) - (n >>>= 0),
                s = (o >>>= 0) - (t >>>= 0),
                i = Math.min(a, s),
                l = this.slice(n, r),
                u = e.slice(t, o),
                d = 0;
              d < i;
              ++d
            )
              if (l[d] !== u[d]) {
                (a = l[d]), (s = u[d]);
                break;
              }
            return a < s ? -1 : s < a ? 1 : 0;
          }),
          (c.prototype.includes = function (e, t, o) {
            return -1 !== this.indexOf(e, t, o);
          }),
          (c.prototype.indexOf = function (e, t, o) {
            return b(this, e, t, o, !0);
          }),
          (c.prototype.lastIndexOf = function (e, t, o) {
            return b(this, e, t, o, !1);
          }),
          (c.prototype.write = function (e, t, o, n) {
            if (void 0 === t) (n = "utf8"), (o = this.length), (t = 0);
            else if (void 0 === o && "string" == typeof t)
              (n = t), (o = this.length), (t = 0);
            else {
              if (!isFinite(t))
                throw new Error(
                  "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                );
              (t |= 0),
                isFinite(o)
                  ? ((o |= 0), void 0 === n && (n = "utf8"))
                  : ((n = o), (o = void 0));
            }
            var r = this.length - t;
            if (
              ((void 0 === o || o > r) && (o = r),
              (e.length > 0 && (o < 0 || t < 0)) || t > this.length)
            )
              throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var a = !1; ; )
              switch (n) {
                case "hex":
                  return y(this, e, t, o);
                case "utf8":
                case "utf-8":
                  return _(this, e, t, o);
                case "ascii":
                  return x(this, e, t, o);
                case "latin1":
                case "binary":
                  return S(this, e, t, o);
                case "base64":
                  return w(this, e, t, o);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return E(this, e, t, o);
                default:
                  if (a) throw new TypeError("Unknown encoding: " + n);
                  (n = ("" + n).toLowerCase()), (a = !0);
              }
          }),
          (c.prototype.toJSON = function () {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        var k = 4096;
        function A(e, t, o) {
          var n = "";
          o = Math.min(e.length, o);
          for (var r = t; r < o; ++r) n += String.fromCharCode(127 & e[r]);
          return n;
        }
        function O(e, t, o) {
          var n = "";
          o = Math.min(e.length, o);
          for (var r = t; r < o; ++r) n += String.fromCharCode(e[r]);
          return n;
        }
        function R(e, t, o) {
          var n = e.length;
          (!t || t < 0) && (t = 0), (!o || o < 0 || o > n) && (o = n);
          for (var r = "", a = t; a < o; ++a) r += q(e[a]);
          return r;
        }
        function N(e, t, o) {
          for (var n = e.slice(t, o), r = "", a = 0; a < n.length; a += 2)
            r += String.fromCharCode(n[a] + 256 * n[a + 1]);
          return r;
        }
        function j(e, t, o) {
          if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
          if (e + t > o)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function I(e, t, o, n, r, a) {
          if (!c.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > r || t < a)
            throw new RangeError('"value" argument is out of bounds');
          if (o + n > e.length) throw new RangeError("Index out of range");
        }
        function P(e, t, o, n) {
          t < 0 && (t = 65535 + t + 1);
          for (var r = 0, a = Math.min(e.length - o, 2); r < a; ++r)
            e[o + r] =
              (t & (255 << (8 * (n ? r : 1 - r)))) >>> (8 * (n ? r : 1 - r));
        }
        function L(e, t, o, n) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var r = 0, a = Math.min(e.length - o, 4); r < a; ++r)
            e[o + r] = (t >>> (8 * (n ? r : 3 - r))) & 255;
        }
        function M(e, t, o, n, r, a) {
          if (o + n > e.length) throw new RangeError("Index out of range");
          if (o < 0) throw new RangeError("Index out of range");
        }
        function U(e, t, o, n, a) {
          return a || M(e, 0, o, 4), r.write(e, t, o, n, 23, 4), o + 4;
        }
        function D(e, t, o, n, a) {
          return a || M(e, 0, o, 8), r.write(e, t, o, n, 52, 8), o + 8;
        }
        (c.prototype.slice = function (e, t) {
          var o,
            n = this.length;
          if (
            ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
            (t = void 0 === t ? n : ~~t) < 0
              ? (t += n) < 0 && (t = 0)
              : t > n && (t = n),
            t < e && (t = e),
            c.TYPED_ARRAY_SUPPORT)
          )
            (o = this.subarray(e, t)).__proto__ = c.prototype;
          else {
            var r = t - e;
            o = new c(r, void 0);
            for (var a = 0; a < r; ++a) o[a] = this[a + e];
          }
          return o;
        }),
          (c.prototype.readUIntLE = function (e, t, o) {
            (e |= 0), (t |= 0), o || j(e, t, this.length);
            for (var n = this[e], r = 1, a = 0; ++a < t && (r *= 256); )
              n += this[e + a] * r;
            return n;
          }),
          (c.prototype.readUIntBE = function (e, t, o) {
            (e |= 0), (t |= 0), o || j(e, t, this.length);
            for (var n = this[e + --t], r = 1; t > 0 && (r *= 256); )
              n += this[e + --t] * r;
            return n;
          }),
          (c.prototype.readUInt8 = function (e, t) {
            return t || j(e, 1, this.length), this[e];
          }),
          (c.prototype.readUInt16LE = function (e, t) {
            return t || j(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (c.prototype.readUInt16BE = function (e, t) {
            return t || j(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (c.prototype.readUInt32LE = function (e, t) {
            return (
              t || j(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
          (c.prototype.readUInt32BE = function (e, t) {
            return (
              t || j(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (c.prototype.readIntLE = function (e, t, o) {
            (e |= 0), (t |= 0), o || j(e, t, this.length);
            for (var n = this[e], r = 1, a = 0; ++a < t && (r *= 256); )
              n += this[e + a] * r;
            return n >= (r *= 128) && (n -= Math.pow(2, 8 * t)), n;
          }),
          (c.prototype.readIntBE = function (e, t, o) {
            (e |= 0), (t |= 0), o || j(e, t, this.length);
            for (var n = t, r = 1, a = this[e + --n]; n > 0 && (r *= 256); )
              a += this[e + --n] * r;
            return a >= (r *= 128) && (a -= Math.pow(2, 8 * t)), a;
          }),
          (c.prototype.readInt8 = function (e, t) {
            return (
              t || j(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (c.prototype.readInt16LE = function (e, t) {
            t || j(e, 2, this.length);
            var o = this[e] | (this[e + 1] << 8);
            return 32768 & o ? 4294901760 | o : o;
          }),
          (c.prototype.readInt16BE = function (e, t) {
            t || j(e, 2, this.length);
            var o = this[e + 1] | (this[e] << 8);
            return 32768 & o ? 4294901760 | o : o;
          }),
          (c.prototype.readInt32LE = function (e, t) {
            return (
              t || j(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (c.prototype.readInt32BE = function (e, t) {
            return (
              t || j(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (c.prototype.readFloatLE = function (e, t) {
            return t || j(e, 4, this.length), r.read(this, e, !0, 23, 4);
          }),
          (c.prototype.readFloatBE = function (e, t) {
            return t || j(e, 4, this.length), r.read(this, e, !1, 23, 4);
          }),
          (c.prototype.readDoubleLE = function (e, t) {
            return t || j(e, 8, this.length), r.read(this, e, !0, 52, 8);
          }),
          (c.prototype.readDoubleBE = function (e, t) {
            return t || j(e, 8, this.length), r.read(this, e, !1, 52, 8);
          }),
          (c.prototype.writeUIntLE = function (e, t, o, n) {
            ((e = +e), (t |= 0), (o |= 0), n) ||
              I(this, e, t, o, Math.pow(2, 8 * o) - 1, 0);
            var r = 1,
              a = 0;
            for (this[t] = 255 & e; ++a < o && (r *= 256); )
              this[t + a] = (e / r) & 255;
            return t + o;
          }),
          (c.prototype.writeUIntBE = function (e, t, o, n) {
            ((e = +e), (t |= 0), (o |= 0), n) ||
              I(this, e, t, o, Math.pow(2, 8 * o) - 1, 0);
            var r = o - 1,
              a = 1;
            for (this[t + r] = 255 & e; --r >= 0 && (a *= 256); )
              this[t + r] = (e / a) & 255;
            return t + o;
          }),
          (c.prototype.writeUInt8 = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 1, 255, 0),
              c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (c.prototype.writeUInt16LE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 2, 65535, 0),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : P(this, e, t, !0),
              t + 2
            );
          }),
          (c.prototype.writeUInt16BE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 2, 65535, 0),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : P(this, e, t, !1),
              t + 2
            );
          }),
          (c.prototype.writeUInt32LE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 4, 4294967295, 0),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e))
                : L(this, e, t, !0),
              t + 4
            );
          }),
          (c.prototype.writeUInt32BE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 4, 4294967295, 0),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : L(this, e, t, !1),
              t + 4
            );
          }),
          (c.prototype.writeIntLE = function (e, t, o, n) {
            if (((e = +e), (t |= 0), !n)) {
              var r = Math.pow(2, 8 * o - 1);
              I(this, e, t, o, r - 1, -r);
            }
            var a = 0,
              s = 1,
              i = 0;
            for (this[t] = 255 & e; ++a < o && (s *= 256); )
              e < 0 && 0 === i && 0 !== this[t + a - 1] && (i = 1),
                (this[t + a] = (((e / s) | 0) - i) & 255);
            return t + o;
          }),
          (c.prototype.writeIntBE = function (e, t, o, n) {
            if (((e = +e), (t |= 0), !n)) {
              var r = Math.pow(2, 8 * o - 1);
              I(this, e, t, o, r - 1, -r);
            }
            var a = o - 1,
              s = 1,
              i = 0;
            for (this[t + a] = 255 & e; --a >= 0 && (s *= 256); )
              e < 0 && 0 === i && 0 !== this[t + a + 1] && (i = 1),
                (this[t + a] = (((e / s) | 0) - i) & 255);
            return t + o;
          }),
          (c.prototype.writeInt8 = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 1, 127, -128),
              c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              e < 0 && (e = 255 + e + 1),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (c.prototype.writeInt16LE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 2, 32767, -32768),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : P(this, e, t, !0),
              t + 2
            );
          }),
          (c.prototype.writeInt16BE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 2, 32767, -32768),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : P(this, e, t, !1),
              t + 2
            );
          }),
          (c.prototype.writeInt32LE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 4, 2147483647, -2147483648),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24))
                : L(this, e, t, !0),
              t + 4
            );
          }),
          (c.prototype.writeInt32BE = function (e, t, o) {
            return (
              (e = +e),
              (t |= 0),
              o || I(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              c.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : L(this, e, t, !1),
              t + 4
            );
          }),
          (c.prototype.writeFloatLE = function (e, t, o) {
            return U(this, e, t, !0, o);
          }),
          (c.prototype.writeFloatBE = function (e, t, o) {
            return U(this, e, t, !1, o);
          }),
          (c.prototype.writeDoubleLE = function (e, t, o) {
            return D(this, e, t, !0, o);
          }),
          (c.prototype.writeDoubleBE = function (e, t, o) {
            return D(this, e, t, !1, o);
          }),
          (c.prototype.copy = function (e, t, o, n) {
            if (
              (o || (o = 0),
              n || 0 === n || (n = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              n > 0 && n < o && (n = o),
              n === o)
            )
              return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (o < 0 || o >= this.length)
              throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
              e.length - t < n - o && (n = e.length - t + o);
            var r,
              a = n - o;
            if (this === e && o < t && t < n)
              for (r = a - 1; r >= 0; --r) e[r + t] = this[r + o];
            else if (a < 1e3 || !c.TYPED_ARRAY_SUPPORT)
              for (r = 0; r < a; ++r) e[r + t] = this[r + o];
            else Uint8Array.prototype.set.call(e, this.subarray(o, o + a), t);
            return a;
          }),
          (c.prototype.fill = function (e, t, o, n) {
            if ("string" == typeof e) {
              if (
                ("string" == typeof t
                  ? ((n = t), (t = 0), (o = this.length))
                  : "string" == typeof o && ((n = o), (o = this.length)),
                1 === e.length)
              ) {
                var r = e.charCodeAt(0);
                r < 256 && (e = r);
              }
              if (void 0 !== n && "string" != typeof n)
                throw new TypeError("encoding must be a string");
              if ("string" == typeof n && !c.isEncoding(n))
                throw new TypeError("Unknown encoding: " + n);
            } else "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < o)
              throw new RangeError("Out of range index");
            if (o <= t) return this;
            var a;
            if (
              ((t >>>= 0),
              (o = void 0 === o ? this.length : o >>> 0),
              e || (e = 0),
              "number" == typeof e)
            )
              for (a = t; a < o; ++a) this[a] = e;
            else {
              var s = c.isBuffer(e) ? e : F(new c(e, n).toString()),
                i = s.length;
              for (a = 0; a < o - t; ++a) this[a + t] = s[a % i];
            }
            return this;
          });
        var B = /[^+\/0-9A-Za-z-_]/g;
        function q(e) {
          return e < 16 ? "0" + e.toString(16) : e.toString(16);
        }
        function F(e, t) {
          var o;
          t = t || 1 / 0;
          for (var n = e.length, r = null, a = [], s = 0; s < n; ++s) {
            if ((o = e.charCodeAt(s)) > 55295 && o < 57344) {
              if (!r) {
                if (o > 56319) {
                  (t -= 3) > -1 && a.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === n) {
                  (t -= 3) > -1 && a.push(239, 191, 189);
                  continue;
                }
                r = o;
                continue;
              }
              if (o < 56320) {
                (t -= 3) > -1 && a.push(239, 191, 189), (r = o);
                continue;
              }
              o = 65536 + (((r - 55296) << 10) | (o - 56320));
            } else r && (t -= 3) > -1 && a.push(239, 191, 189);
            if (((r = null), o < 128)) {
              if ((t -= 1) < 0) break;
              a.push(o);
            } else if (o < 2048) {
              if ((t -= 2) < 0) break;
              a.push((o >> 6) | 192, (63 & o) | 128);
            } else if (o < 65536) {
              if ((t -= 3) < 0) break;
              a.push((o >> 12) | 224, ((o >> 6) & 63) | 128, (63 & o) | 128);
            } else {
              if (!(o < 1114112)) throw new Error("Invalid code point");
              if ((t -= 4) < 0) break;
              a.push(
                (o >> 18) | 240,
                ((o >> 12) & 63) | 128,
                ((o >> 6) & 63) | 128,
                (63 & o) | 128
              );
            }
          }
          return a;
        }
        function z(e) {
          return n.toByteArray(
            (function (e) {
              if (
                (e = (function (e) {
                  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
                })(e).replace(B, "")).length < 2
              )
                return "";
              for (; e.length % 4 != 0; ) e += "=";
              return e;
            })(e)
          );
        }
        function $(e, t, o, n) {
          for (var r = 0; r < n && !(r + o >= t.length || r >= e.length); ++r)
            t[r + o] = e[r];
          return r;
        }
      },
      291: () => {},
      526: (e, t) => {
        "use strict";
        (t.byteLength = function (e) {
          var t = i(e),
            o = t[0],
            n = t[1];
          return (3 * (o + n)) / 4 - n;
        }),
          (t.toByteArray = function (e) {
            var t,
              o,
              a = i(e),
              s = a[0],
              c = a[1],
              l = new r(
                (function (e, t, o) {
                  return (3 * (t + o)) / 4 - o;
                })(0, s, c)
              ),
              u = 0,
              d = c > 0 ? s - 4 : s;
            for (o = 0; o < d; o += 4)
              (t =
                (n[e.charCodeAt(o)] << 18) |
                (n[e.charCodeAt(o + 1)] << 12) |
                (n[e.charCodeAt(o + 2)] << 6) |
                n[e.charCodeAt(o + 3)]),
                (l[u++] = (t >> 16) & 255),
                (l[u++] = (t >> 8) & 255),
                (l[u++] = 255 & t);
            2 === c &&
              ((t = (n[e.charCodeAt(o)] << 2) | (n[e.charCodeAt(o + 1)] >> 4)),
              (l[u++] = 255 & t));
            1 === c &&
              ((t =
                (n[e.charCodeAt(o)] << 10) |
                (n[e.charCodeAt(o + 1)] << 4) |
                (n[e.charCodeAt(o + 2)] >> 2)),
              (l[u++] = (t >> 8) & 255),
              (l[u++] = 255 & t));
            return l;
          }),
          (t.fromByteArray = function (e) {
            for (
              var t,
                n = e.length,
                r = n % 3,
                a = [],
                s = 16383,
                i = 0,
                c = n - r;
              i < c;
              i += s
            )
              a.push(l(e, i, i + s > c ? c : i + s));
            1 === r
              ? ((t = e[n - 1]), a.push(o[t >> 2] + o[(t << 4) & 63] + "=="))
              : 2 === r &&
                ((t = (e[n - 2] << 8) + e[n - 1]),
                a.push(o[t >> 10] + o[(t >> 4) & 63] + o[(t << 2) & 63] + "="));
            return a.join("");
          });
        for (
          var o = [],
            n = [],
            r = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            a =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            s = 0;
          s < 64;
          ++s
        )
          (o[s] = a[s]), (n[a.charCodeAt(s)] = s);
        function i(e) {
          var t = e.length;
          if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var o = e.indexOf("=");
          return -1 === o && (o = t), [o, o === t ? 0 : 4 - (o % 4)];
        }
        function c(e) {
          return (
            o[(e >> 18) & 63] + o[(e >> 12) & 63] + o[(e >> 6) & 63] + o[63 & e]
          );
        }
        function l(e, t, o) {
          for (var n, r = [], a = t; a < o; a += 3)
            (n =
              ((e[a] << 16) & 16711680) +
              ((e[a + 1] << 8) & 65280) +
              (255 & e[a + 2])),
              r.push(c(n));
          return r.join("");
        }
        (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
      },
      606: (e) => {
        var t,
          o,
          n = (e.exports = {});
        function r() {
          throw new Error("setTimeout has not been defined");
        }
        function a() {
          throw new Error("clearTimeout has not been defined");
        }
        function s(e) {
          if (t === setTimeout) return setTimeout(e, 0);
          if ((t === r || !t) && setTimeout)
            return (t = setTimeout), setTimeout(e, 0);
          try {
            return t(e, 0);
          } catch (o) {
            try {
              return t.call(null, e, 0);
            } catch (o) {
              return t.call(this, e, 0);
            }
          }
        }
        !(function () {
          try {
            t = "function" == typeof setTimeout ? setTimeout : r;
          } catch (e) {
            t = r;
          }
          try {
            o = "function" == typeof clearTimeout ? clearTimeout : a;
          } catch (e) {
            o = a;
          }
        })();
        var i,
          c = [],
          l = !1,
          u = -1;
        function d() {
          l &&
            i &&
            ((l = !1),
            i.length ? (c = i.concat(c)) : (u = -1),
            c.length && p());
        }
        function p() {
          if (!l) {
            var e = s(d);
            l = !0;
            for (var t = c.length; t; ) {
              for (i = c, c = []; ++u < t; ) i && i[u].run();
              (u = -1), (t = c.length);
            }
            (i = null),
              (l = !1),
              (function (e) {
                if (o === clearTimeout) return clearTimeout(e);
                if ((o === a || !o) && clearTimeout)
                  return (o = clearTimeout), clearTimeout(e);
                try {
                  return o(e);
                } catch (t) {
                  try {
                    return o.call(null, e);
                  } catch (t) {
                    return o.call(this, e);
                  }
                }
              })(e);
          }
        }
        function h(e, t) {
          (this.fun = e), (this.array = t);
        }
        function f() {}
        (n.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
          c.push(new h(e, t)), 1 !== c.length || l || s(p);
        }),
          (h.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (n.title = "browser"),
          (n.browser = !0),
          (n.env = {}),
          (n.argv = []),
          (n.version = ""),
          (n.versions = {}),
          (n.on = f),
          (n.addListener = f),
          (n.once = f),
          (n.off = f),
          (n.removeListener = f),
          (n.removeAllListeners = f),
          (n.emit = f),
          (n.prependListener = f),
          (n.prependOnceListener = f),
          (n.listeners = function (e) {
            return [];
          }),
          (n.binding = function (e) {
            throw new Error("process.binding is not supported");
          }),
          (n.cwd = function () {
            return "/";
          }),
          (n.chdir = function (e) {
            throw new Error("process.chdir is not supported");
          }),
          (n.umask = function () {
            return 0;
          });
      },
      634: (e) => {
        var t = {}.toString;
        e.exports =
          Array.isArray ||
          function (e) {
            return "[object Array]" == t.call(e);
          };
      },
      807: (e, t, o) => {
        "use strict";
        var n = {};
        o.r(n),
          o.d(n, {
            BaseTransition: () => wn,
            BaseTransitionPropsValidators: () => _n,
            Comment: () => Es,
            DeprecationTypes: () => Bi,
            EffectScope: () => _e,
            ErrorCodes: () => Co,
            ErrorTypeStrings: () => Ii,
            Fragment: () => Ss,
            KeepAlive: () => rr,
            ReactiveEffect: () => Ce,
            Static: () => Cs,
            Suspense: () => gs,
            Teleport: () => hn,
            Text: () => ws,
            TrackOpTypes: () => uo,
            Transition: () => Xi,
            TransitionGroup: () => Yc,
            TriggerOpTypes: () => po,
            VueElement: () => Bc,
            assertNumber: () => Eo,
            callWithAsyncErrorHandling: () => Ao,
            callWithErrorHandling: () => ko,
            camelize: () => P,
            capitalize: () => U,
            cloneVNode: () => Hs,
            compatUtils: () => Di,
            computed: () => Ti,
            createApp: () => El,
            createBlock: () => Ls,
            createCommentVNode: () => Ks,
            createElementBlock: () => Ps,
            createElementVNode: () => Fs,
            createHydrationRenderer: () => qa,
            createPropsRestProxy: () => ta,
            createRenderer: () => Ba,
            createSSRApp: () => Cl,
            createSlots: () => Ir,
            createStaticVNode: () => Ys,
            createTextVNode: () => Ws,
            createVNode: () => zs,
            customRef: () => no,
            defineAsyncComponent: () => er,
            defineComponent: () => Rn,
            defineCustomElement: () => Mc,
            defineEmits: () => $r,
            defineExpose: () => Vr,
            defineModel: () => Yr,
            defineOptions: () => Hr,
            defineProps: () => zr,
            defineSSRCustomElement: () => Uc,
            defineSlots: () => Wr,
            devtools: () => Pi,
            effect: () => De,
            effectScope: () => xe,
            getCurrentInstance: () => ri,
            getCurrentScope: () => Se,
            getCurrentWatcher: () => go,
            getTransitionRawChildren: () => On,
            guardReactiveProps: () => Vs,
            h: () => ki,
            handleError: () => Oo,
            hasInjectionContext: () => xa,
            hydrate: () => wl,
            hydrateOnIdle: () => Gn,
            hydrateOnInteraction: () => Zn,
            hydrateOnMediaQuery: () => Xn,
            hydrateOnVisible: () => Jn,
            initCustomFormatter: () => Ai,
            initDirectivesForSSR: () => Ol,
            inject: () => _a,
            isMemoSame: () => Ri,
            isProxy: () => Ft,
            isReactive: () => Dt,
            isReadonly: () => Bt,
            isRef: () => Wt,
            isRuntimeOnly: () => gi,
            isShallow: () => qt,
            isVNode: () => Ms,
            markRaw: () => $t,
            mergeDefaults: () => Qr,
            mergeModels: () => ea,
            mergeProps: () => Zs,
            nextTick: () => Uo,
            normalizeClass: () => Z,
            normalizeProps: () => Q,
            normalizeStyle: () => Y,
            onActivated: () => sr,
            onBeforeMount: () => fr,
            onBeforeUnmount: () => vr,
            onBeforeUpdate: () => gr,
            onDeactivated: () => ir,
            onErrorCaptured: () => wr,
            onMounted: () => mr,
            onRenderTracked: () => Sr,
            onRenderTriggered: () => xr,
            onScopeDispose: () => we,
            onServerPrefetch: () => _r,
            onUnmounted: () => yr,
            onUpdated: () => br,
            onWatcherCleanup: () => bo,
            openBlock: () => As,
            popScopeId: () => Zo,
            provide: () => ya,
            proxyRefs: () => to,
            pushScopeId: () => Xo,
            queuePostFlushCb: () => qo,
            reactive: () => It,
            readonly: () => Lt,
            ref: () => Yt,
            registerRuntimeCompiler: () => mi,
            render: () => Sl,
            renderList: () => jr,
            renderSlot: () => Pr,
            resolveComponent: () => Tr,
            resolveDirective: () => Or,
            resolveDynamicComponent: () => Ar,
            resolveFilter: () => Ui,
            resolveTransitionHooks: () => Cn,
            setBlockTracking: () => js,
            setDevtoolsHook: () => Li,
            setTransitionHooks: () => An,
            shallowReactive: () => Pt,
            shallowReadonly: () => Mt,
            shallowRef: () => Kt,
            ssrContextKey: () => Ka,
            ssrUtils: () => Mi,
            stop: () => Be,
            toDisplayString: () => me,
            toHandlerKey: () => D,
            toHandlers: () => Mr,
            toRaw: () => zt,
            toRef: () => io,
            toRefs: () => ro,
            toValue: () => Qt,
            transformVNodeArgs: () => Ds,
            triggerRef: () => Xt,
            unref: () => Zt,
            useAttrs: () => Jr,
            useCssModule: () => zc,
            useCssVars: () => gc,
            useHost: () => qc,
            useId: () => Nn,
            useModel: () => ns,
            useSSRContext: () => Ga,
            useShadowRoot: () => Fc,
            useSlots: () => Gr,
            useTemplateRef: () => In,
            useTransitionState: () => vn,
            vModelCheckbox: () => ol,
            vModelDynamic: () => ll,
            vModelRadio: () => rl,
            vModelSelect: () => al,
            vModelText: () => tl,
            vShow: () => hc,
            version: () => Ni,
            warn: () => ji,
            watch: () => Qa,
            watchEffect: () => Ja,
            watchPostEffect: () => Xa,
            watchSyncEffect: () => Za,
            withAsyncContext: () => oa,
            withCtx: () => en,
            withDefaults: () => Kr,
            withDirectives: () => tn,
            withKeys: () => gl,
            withMemo: () => Oi,
            withModifiers: () => fl,
            withScopeId: () => Qo,
          });
        var r = {};
        function a(e) {
          const t = Object.create(null);
          for (const o of e.split(",")) t[o] = 1;
          return (e) => e in t;
        }
        o.r(r),
          o.d(r, {
            hasBrowserEnv: () => _m,
            hasStandardBrowserEnv: () => Sm,
            hasStandardBrowserWebWorkerEnv: () => wm,
            navigator: () => xm,
            origin: () => Em,
          });
        const s = {},
          i = [],
          c = () => {},
          l = () => !1,
          u = (e) =>
            111 === e.charCodeAt(0) &&
            110 === e.charCodeAt(1) &&
            (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
          d = (e) => e.startsWith("onUpdate:"),
          p = Object.assign,
          h = (e, t) => {
            const o = e.indexOf(t);
            o > -1 && e.splice(o, 1);
          },
          f = Object.prototype.hasOwnProperty,
          m = (e, t) => f.call(e, t),
          g = Array.isArray,
          b = (e) => "[object Map]" === T(e),
          v = (e) => "[object Set]" === T(e),
          y = (e) => "[object Date]" === T(e),
          _ = (e) => "function" == typeof e,
          x = (e) => "string" == typeof e,
          S = (e) => "symbol" == typeof e,
          w = (e) => null !== e && "object" == typeof e,
          E = (e) => (w(e) || _(e)) && _(e.then) && _(e.catch),
          C = Object.prototype.toString,
          T = (e) => C.call(e),
          k = (e) => T(e).slice(8, -1),
          A = (e) => "[object Object]" === T(e),
          O = (e) =>
            x(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
          R = a(
            ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
          ),
          N = a(
            "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
          ),
          j = (e) => {
            const t = Object.create(null);
            return (o) => t[o] || (t[o] = e(o));
          },
          I = /-(\w)/g,
          P = j((e) => e.replace(I, (e, t) => (t ? t.toUpperCase() : ""))),
          L = /\B([A-Z])/g,
          M = j((e) => e.replace(L, "-$1").toLowerCase()),
          U = j((e) => e.charAt(0).toUpperCase() + e.slice(1)),
          D = j((e) => (e ? `on${U(e)}` : "")),
          B = (e, t) => !Object.is(e, t),
          q = (e, ...t) => {
            for (let o = 0; o < e.length; o++) e[o](...t);
          },
          F = (e, t, o, n = !1) => {
            Object.defineProperty(e, t, {
              configurable: !0,
              enumerable: !1,
              writable: n,
              value: o,
            });
          },
          z = (e) => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t;
          },
          $ = (e) => {
            const t = x(e) ? Number(e) : NaN;
            return isNaN(t) ? e : t;
          };
        let V;
        const H = () =>
          V ||
          (V =
            "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : void 0 !== o.g
              ? o.g
              : {});
        const W = a(
          "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol"
        );
        function Y(e) {
          if (g(e)) {
            const t = {};
            for (let o = 0; o < e.length; o++) {
              const n = e[o],
                r = x(n) ? X(n) : Y(n);
              if (r) for (const e in r) t[e] = r[e];
            }
            return t;
          }
          if (x(e) || w(e)) return e;
        }
        const K = /;(?![^(]*\))/g,
          G = /:([^]+)/,
          J = /\/\*[^]*?\*\//g;
        function X(e) {
          const t = {};
          return (
            e
              .replace(J, "")
              .split(K)
              .forEach((e) => {
                if (e) {
                  const o = e.split(G);
                  o.length > 1 && (t[o[0].trim()] = o[1].trim());
                }
              }),
            t
          );
        }
        function Z(e) {
          let t = "";
          if (x(e)) t = e;
          else if (g(e))
            for (let o = 0; o < e.length; o++) {
              const n = Z(e[o]);
              n && (t += n + " ");
            }
          else if (w(e)) for (const o in e) e[o] && (t += o + " ");
          return t.trim();
        }
        function Q(e) {
          if (!e) return null;
          let { class: t, style: o } = e;
          return t && !x(t) && (e.class = Z(t)), o && (e.style = Y(o)), e;
        }
        const ee = a(
            "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"
          ),
          te = a(
            "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"
          ),
          oe = a(
            "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"
          ),
          ne = a(
            "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"
          ),
          re =
            "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
          ae = a(re),
          se = a(
            re +
              ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
          );
        function ie(e) {
          return !!e || "" === e;
        }
        const ce = a(
            "accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"
          ),
          le = a(
            "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan"
          );
        const ue = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
        function de(e, t) {
          return e.replace(ue, (e) =>
            t ? ('"' === e ? '\\\\\\"' : `\\\\${e}`) : `\\${e}`
          );
        }
        function pe(e, t) {
          if (e === t) return !0;
          let o = y(e),
            n = y(t);
          if (o || n) return !(!o || !n) && e.getTime() === t.getTime();
          if (((o = S(e)), (n = S(t)), o || n)) return e === t;
          if (((o = g(e)), (n = g(t)), o || n))
            return (
              !(!o || !n) &&
              (function (e, t) {
                if (e.length !== t.length) return !1;
                let o = !0;
                for (let n = 0; o && n < e.length; n++) o = pe(e[n], t[n]);
                return o;
              })(e, t)
            );
          if (((o = w(e)), (n = w(t)), o || n)) {
            if (!o || !n) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const o in e) {
              const n = e.hasOwnProperty(o),
                r = t.hasOwnProperty(o);
              if ((n && !r) || (!n && r) || !pe(e[o], t[o])) return !1;
            }
          }
          return String(e) === String(t);
        }
        function he(e, t) {
          return e.findIndex((e) => pe(e, t));
        }
        const fe = (e) => !(!e || !0 !== e.__v_isRef),
          me = (e) =>
            x(e)
              ? e
              : null == e
              ? ""
              : g(e) || (w(e) && (e.toString === C || !_(e.toString)))
              ? fe(e)
                ? me(e.value)
                : JSON.stringify(e, ge, 2)
              : String(e),
          ge = (e, t) =>
            fe(t)
              ? ge(e, t.value)
              : b(t)
              ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                    (e, [t, o], n) => ((e[be(t, n) + " =>"] = o), e),
                    {}
                  ),
                }
              : v(t)
              ? { [`Set(${t.size})`]: [...t.values()].map((e) => be(e)) }
              : S(t)
              ? be(t)
              : !w(t) || g(t) || A(t)
              ? t
              : String(t),
          be = (e, t = "") => {
            var o;
            return S(e) ? `Symbol(${null != (o = e.description) ? o : t})` : e;
          };
        let ve, ye;
        class _e {
          constructor(e = !1) {
            (this.detached = e),
              (this._active = !0),
              (this._on = 0),
              (this.effects = []),
              (this.cleanups = []),
              (this._isPaused = !1),
              (this.parent = ve),
              !e &&
                ve &&
                (this.index = (ve.scopes || (ve.scopes = [])).push(this) - 1);
          }
          get active() {
            return this._active;
          }
          pause() {
            if (this._active) {
              let e, t;
              if (((this._isPaused = !0), this.scopes))
                for (e = 0, t = this.scopes.length; e < t; e++)
                  this.scopes[e].pause();
              for (e = 0, t = this.effects.length; e < t; e++)
                this.effects[e].pause();
            }
          }
          resume() {
            if (this._active && this._isPaused) {
              let e, t;
              if (((this._isPaused = !1), this.scopes))
                for (e = 0, t = this.scopes.length; e < t; e++)
                  this.scopes[e].resume();
              for (e = 0, t = this.effects.length; e < t; e++)
                this.effects[e].resume();
            }
          }
          run(e) {
            if (this._active) {
              const t = ve;
              try {
                return (ve = this), e();
              } finally {
                ve = t;
              }
            } else 0;
          }
          on() {
            1 === ++this._on && ((this.prevScope = ve), (ve = this));
          }
          off() {
            this._on > 0 &&
              0 === --this._on &&
              ((ve = this.prevScope), (this.prevScope = void 0));
          }
          stop(e) {
            if (this._active) {
              let t, o;
              for (
                this._active = !1, t = 0, o = this.effects.length;
                t < o;
                t++
              )
                this.effects[t].stop();
              for (
                this.effects.length = 0, t = 0, o = this.cleanups.length;
                t < o;
                t++
              )
                this.cleanups[t]();
              if (((this.cleanups.length = 0), this.scopes)) {
                for (t = 0, o = this.scopes.length; t < o; t++)
                  this.scopes[t].stop(!0);
                this.scopes.length = 0;
              }
              if (!this.detached && this.parent && !e) {
                const e = this.parent.scopes.pop();
                e &&
                  e !== this &&
                  ((this.parent.scopes[this.index] = e),
                  (e.index = this.index));
              }
              this.parent = void 0;
            }
          }
        }
        function xe(e) {
          return new _e(e);
        }
        function Se() {
          return ve;
        }
        function we(e, t = !1) {
          ve && ve.cleanups.push(e);
        }
        const Ee = new WeakSet();
        class Ce {
          constructor(e) {
            (this.fn = e),
              (this.deps = void 0),
              (this.depsTail = void 0),
              (this.flags = 5),
              (this.next = void 0),
              (this.cleanup = void 0),
              (this.scheduler = void 0),
              ve && ve.active && ve.effects.push(this);
          }
          pause() {
            this.flags |= 64;
          }
          resume() {
            64 & this.flags &&
              ((this.flags &= -65),
              Ee.has(this) && (Ee.delete(this), this.trigger()));
          }
          notify() {
            (2 & this.flags && !(32 & this.flags)) ||
              8 & this.flags ||
              Oe(this);
          }
          run() {
            if (!(1 & this.flags)) return this.fn();
            (this.flags |= 2), Ve(this), je(this);
            const e = ye,
              t = qe;
            (ye = this), (qe = !0);
            try {
              return this.fn();
            } finally {
              0, Ie(this), (ye = e), (qe = t), (this.flags &= -3);
            }
          }
          stop() {
            if (1 & this.flags) {
              for (let e = this.deps; e; e = e.nextDep) Me(e);
              (this.deps = this.depsTail = void 0),
                Ve(this),
                this.onStop && this.onStop(),
                (this.flags &= -2);
            }
          }
          trigger() {
            64 & this.flags
              ? Ee.add(this)
              : this.scheduler
              ? this.scheduler()
              : this.runIfDirty();
          }
          runIfDirty() {
            Pe(this) && this.run();
          }
          get dirty() {
            return Pe(this);
          }
        }
        let Te,
          ke,
          Ae = 0;
        function Oe(e, t = !1) {
          if (((e.flags |= 8), t)) return (e.next = ke), void (ke = e);
          (e.next = Te), (Te = e);
        }
        function Re() {
          Ae++;
        }
        function Ne() {
          if (--Ae > 0) return;
          if (ke) {
            let e = ke;
            for (ke = void 0; e; ) {
              const t = e.next;
              (e.next = void 0), (e.flags &= -9), (e = t);
            }
          }
          let e;
          for (; Te; ) {
            let t = Te;
            for (Te = void 0; t; ) {
              const o = t.next;
              if (((t.next = void 0), (t.flags &= -9), 1 & t.flags))
                try {
                  t.trigger();
                } catch (t) {
                  e || (e = t);
                }
              t = o;
            }
          }
          if (e) throw e;
        }
        function je(e) {
          for (let t = e.deps; t; t = t.nextDep)
            (t.version = -1),
              (t.prevActiveLink = t.dep.activeLink),
              (t.dep.activeLink = t);
        }
        function Ie(e) {
          let t,
            o = e.depsTail,
            n = o;
          for (; n; ) {
            const e = n.prevDep;
            -1 === n.version ? (n === o && (o = e), Me(n), Ue(n)) : (t = n),
              (n.dep.activeLink = n.prevActiveLink),
              (n.prevActiveLink = void 0),
              (n = e);
          }
          (e.deps = t), (e.depsTail = o);
        }
        function Pe(e) {
          for (let t = e.deps; t; t = t.nextDep)
            if (
              t.dep.version !== t.version ||
              (t.dep.computed &&
                (Le(t.dep.computed) || t.dep.version !== t.version))
            )
              return !0;
          return !!e._dirty;
        }
        function Le(e) {
          if (4 & e.flags && !(16 & e.flags)) return;
          if (((e.flags &= -17), e.globalVersion === He)) return;
          if (
            ((e.globalVersion = He),
            !e.isSSR && 128 & e.flags && ((!e.deps && !e._dirty) || !Pe(e)))
          )
            return;
          e.flags |= 2;
          const t = e.dep,
            o = ye,
            n = qe;
          (ye = e), (qe = !0);
          try {
            je(e);
            const o = e.fn(e._value);
            (0 === t.version || B(o, e._value)) &&
              ((e.flags |= 128), (e._value = o), t.version++);
          } catch (e) {
            throw (t.version++, e);
          } finally {
            (ye = o), (qe = n), Ie(e), (e.flags &= -3);
          }
        }
        function Me(e, t = !1) {
          const { dep: o, prevSub: n, nextSub: r } = e;
          if (
            (n && ((n.nextSub = r), (e.prevSub = void 0)),
            r && ((r.prevSub = n), (e.nextSub = void 0)),
            o.subs === e && ((o.subs = n), !n && o.computed))
          ) {
            o.computed.flags &= -5;
            for (let e = o.computed.deps; e; e = e.nextDep) Me(e, !0);
          }
          t || --o.sc || !o.map || o.map.delete(o.key);
        }
        function Ue(e) {
          const { prevDep: t, nextDep: o } = e;
          t && ((t.nextDep = o), (e.prevDep = void 0)),
            o && ((o.prevDep = t), (e.nextDep = void 0));
        }
        function De(e, t) {
          e.effect instanceof Ce && (e = e.effect.fn);
          const o = new Ce(e);
          t && p(o, t);
          try {
            o.run();
          } catch (e) {
            throw (o.stop(), e);
          }
          const n = o.run.bind(o);
          return (n.effect = o), n;
        }
        function Be(e) {
          e.effect.stop();
        }
        let qe = !0;
        const Fe = [];
        function ze() {
          Fe.push(qe), (qe = !1);
        }
        function $e() {
          const e = Fe.pop();
          qe = void 0 === e || e;
        }
        function Ve(e) {
          const { cleanup: t } = e;
          if (((e.cleanup = void 0), t)) {
            const e = ye;
            ye = void 0;
            try {
              t();
            } finally {
              ye = e;
            }
          }
        }
        let He = 0;
        class We {
          constructor(e, t) {
            (this.sub = e),
              (this.dep = t),
              (this.version = t.version),
              (this.nextDep =
                this.prevDep =
                this.nextSub =
                this.prevSub =
                this.prevActiveLink =
                  void 0);
          }
        }
        class Ye {
          constructor(e) {
            (this.computed = e),
              (this.version = 0),
              (this.activeLink = void 0),
              (this.subs = void 0),
              (this.map = void 0),
              (this.key = void 0),
              (this.sc = 0),
              (this.__v_skip = !0);
          }
          track(e) {
            if (!ye || !qe || ye === this.computed) return;
            let t = this.activeLink;
            if (void 0 === t || t.sub !== ye)
              (t = this.activeLink = new We(ye, this)),
                ye.deps
                  ? ((t.prevDep = ye.depsTail),
                    (ye.depsTail.nextDep = t),
                    (ye.depsTail = t))
                  : (ye.deps = ye.depsTail = t),
                Ke(t);
            else if (
              -1 === t.version &&
              ((t.version = this.version), t.nextDep)
            ) {
              const e = t.nextDep;
              (e.prevDep = t.prevDep),
                t.prevDep && (t.prevDep.nextDep = e),
                (t.prevDep = ye.depsTail),
                (t.nextDep = void 0),
                (ye.depsTail.nextDep = t),
                (ye.depsTail = t),
                ye.deps === t && (ye.deps = e);
            }
            return t;
          }
          trigger(e) {
            this.version++, He++, this.notify(e);
          }
          notify(e) {
            Re();
            try {
              0;
              for (let e = this.subs; e; e = e.prevSub)
                e.sub.notify() && e.sub.dep.notify();
            } finally {
              Ne();
            }
          }
        }
        function Ke(e) {
          if ((e.dep.sc++, 4 & e.sub.flags)) {
            const t = e.dep.computed;
            if (t && !e.dep.subs) {
              t.flags |= 20;
              for (let e = t.deps; e; e = e.nextDep) Ke(e);
            }
            const o = e.dep.subs;
            o !== e && ((e.prevSub = o), o && (o.nextSub = e)),
              (e.dep.subs = e);
          }
        }
        const Ge = new WeakMap(),
          Je = Symbol(""),
          Xe = Symbol(""),
          Ze = Symbol("");
        function Qe(e, t, o) {
          if (qe && ye) {
            let t = Ge.get(e);
            t || Ge.set(e, (t = new Map()));
            let n = t.get(o);
            n || (t.set(o, (n = new Ye())), (n.map = t), (n.key = o)),
              n.track();
          }
        }
        function et(e, t, o, n, r, a) {
          const s = Ge.get(e);
          if (!s) return void He++;
          const i = (e) => {
            e && e.trigger();
          };
          if ((Re(), "clear" === t)) s.forEach(i);
          else {
            const r = g(e),
              a = r && O(o);
            if (r && "length" === o) {
              const e = Number(n);
              s.forEach((t, o) => {
                ("length" === o || o === Ze || (!S(o) && o >= e)) && i(t);
              });
            } else
              switch (
                ((void 0 !== o || s.has(void 0)) && i(s.get(o)),
                a && i(s.get(Ze)),
                t)
              ) {
                case "add":
                  r
                    ? a && i(s.get("length"))
                    : (i(s.get(Je)), b(e) && i(s.get(Xe)));
                  break;
                case "delete":
                  r || (i(s.get(Je)), b(e) && i(s.get(Xe)));
                  break;
                case "set":
                  b(e) && i(s.get(Je));
              }
          }
          Ne();
        }
        function tt(e) {
          const t = zt(e);
          return t === e ? t : (Qe(t, 0, Ze), qt(e) ? t : t.map(Vt));
        }
        function ot(e) {
          return Qe((e = zt(e)), 0, Ze), e;
        }
        const nt = {
          __proto__: null,
          [Symbol.iterator]() {
            return rt(this, Symbol.iterator, Vt);
          },
          concat(...e) {
            return tt(this).concat(...e.map((e) => (g(e) ? tt(e) : e)));
          },
          entries() {
            return rt(this, "entries", (e) => ((e[1] = Vt(e[1])), e));
          },
          every(e, t) {
            return st(this, "every", e, t, void 0, arguments);
          },
          filter(e, t) {
            return st(this, "filter", e, t, (e) => e.map(Vt), arguments);
          },
          find(e, t) {
            return st(this, "find", e, t, Vt, arguments);
          },
          findIndex(e, t) {
            return st(this, "findIndex", e, t, void 0, arguments);
          },
          findLast(e, t) {
            return st(this, "findLast", e, t, Vt, arguments);
          },
          findLastIndex(e, t) {
            return st(this, "findLastIndex", e, t, void 0, arguments);
          },
          forEach(e, t) {
            return st(this, "forEach", e, t, void 0, arguments);
          },
          includes(...e) {
            return ct(this, "includes", e);
          },
          indexOf(...e) {
            return ct(this, "indexOf", e);
          },
          join(e) {
            return tt(this).join(e);
          },
          lastIndexOf(...e) {
            return ct(this, "lastIndexOf", e);
          },
          map(e, t) {
            return st(this, "map", e, t, void 0, arguments);
          },
          pop() {
            return lt(this, "pop");
          },
          push(...e) {
            return lt(this, "push", e);
          },
          reduce(e, ...t) {
            return it(this, "reduce", e, t);
          },
          reduceRight(e, ...t) {
            return it(this, "reduceRight", e, t);
          },
          shift() {
            return lt(this, "shift");
          },
          some(e, t) {
            return st(this, "some", e, t, void 0, arguments);
          },
          splice(...e) {
            return lt(this, "splice", e);
          },
          toReversed() {
            return tt(this).toReversed();
          },
          toSorted(e) {
            return tt(this).toSorted(e);
          },
          toSpliced(...e) {
            return tt(this).toSpliced(...e);
          },
          unshift(...e) {
            return lt(this, "unshift", e);
          },
          values() {
            return rt(this, "values", Vt);
          },
        };
        function rt(e, t, o) {
          const n = ot(e),
            r = n[t]();
          return (
            n === e ||
              qt(e) ||
              ((r._next = r.next),
              (r.next = () => {
                const e = r._next();
                return e.value && (e.value = o(e.value)), e;
              })),
            r
          );
        }
        const at = Array.prototype;
        function st(e, t, o, n, r, a) {
          const s = ot(e),
            i = s !== e && !qt(e),
            c = s[t];
          if (c !== at[t]) {
            const t = c.apply(e, a);
            return i ? Vt(t) : t;
          }
          let l = o;
          s !== e &&
            (i
              ? (l = function (t, n) {
                  return o.call(this, Vt(t), n, e);
                })
              : o.length > 2 &&
                (l = function (t, n) {
                  return o.call(this, t, n, e);
                }));
          const u = c.call(s, l, n);
          return i && r ? r(u) : u;
        }
        function it(e, t, o, n) {
          const r = ot(e);
          let a = o;
          return (
            r !== e &&
              (qt(e)
                ? o.length > 3 &&
                  (a = function (t, n, r) {
                    return o.call(this, t, n, r, e);
                  })
                : (a = function (t, n, r) {
                    return o.call(this, t, Vt(n), r, e);
                  })),
            r[t](a, ...n)
          );
        }
        function ct(e, t, o) {
          const n = zt(e);
          Qe(n, 0, Ze);
          const r = n[t](...o);
          return (-1 !== r && !1 !== r) || !Ft(o[0])
            ? r
            : ((o[0] = zt(o[0])), n[t](...o));
        }
        function lt(e, t, o = []) {
          ze(), Re();
          const n = zt(e)[t].apply(e, o);
          return Ne(), $e(), n;
        }
        const ut = a("__proto__,__v_isRef,__isVue"),
          dt = new Set(
            Object.getOwnPropertyNames(Symbol)
              .filter((e) => "arguments" !== e && "caller" !== e)
              .map((e) => Symbol[e])
              .filter(S)
          );
        function pt(e) {
          S(e) || (e = String(e));
          const t = zt(this);
          return Qe(t, 0, e), t.hasOwnProperty(e);
        }
        class ht {
          constructor(e = !1, t = !1) {
            (this._isReadonly = e), (this._isShallow = t);
          }
          get(e, t, o) {
            if ("__v_skip" === t) return e.__v_skip;
            const n = this._isReadonly,
              r = this._isShallow;
            if ("__v_isReactive" === t) return !n;
            if ("__v_isReadonly" === t) return n;
            if ("__v_isShallow" === t) return r;
            if ("__v_raw" === t)
              return o === (n ? (r ? jt : Nt) : r ? Rt : Ot).get(e) ||
                Object.getPrototypeOf(e) === Object.getPrototypeOf(o)
                ? e
                : void 0;
            const a = g(e);
            if (!n) {
              let e;
              if (a && (e = nt[t])) return e;
              if ("hasOwnProperty" === t) return pt;
            }
            const s = Reflect.get(e, t, Wt(e) ? e : o);
            return (S(t) ? dt.has(t) : ut(t))
              ? s
              : (n || Qe(e, 0, t),
                r
                  ? s
                  : Wt(s)
                  ? a && O(t)
                    ? s
                    : s.value
                  : w(s)
                  ? n
                    ? Lt(s)
                    : It(s)
                  : s);
          }
        }
        class ft extends ht {
          constructor(e = !1) {
            super(!1, e);
          }
          set(e, t, o, n) {
            let r = e[t];
            if (!this._isShallow) {
              const t = Bt(r);
              if (
                (qt(o) || Bt(o) || ((r = zt(r)), (o = zt(o))),
                !g(e) && Wt(r) && !Wt(o))
              )
                return !t && ((r.value = o), !0);
            }
            const a = g(e) && O(t) ? Number(t) < e.length : m(e, t),
              s = Reflect.set(e, t, o, Wt(e) ? e : n);
            return (
              e === zt(n) &&
                (a ? B(o, r) && et(e, "set", t, o) : et(e, "add", t, o)),
              s
            );
          }
          deleteProperty(e, t) {
            const o = m(e, t),
              n = (e[t], Reflect.deleteProperty(e, t));
            return n && o && et(e, "delete", t, void 0), n;
          }
          has(e, t) {
            const o = Reflect.has(e, t);
            return (S(t) && dt.has(t)) || Qe(e, 0, t), o;
          }
          ownKeys(e) {
            return Qe(e, 0, g(e) ? "length" : Je), Reflect.ownKeys(e);
          }
        }
        class mt extends ht {
          constructor(e = !1) {
            super(!0, e);
          }
          set(e, t) {
            return !0;
          }
          deleteProperty(e, t) {
            return !0;
          }
        }
        const gt = new ft(),
          bt = new mt(),
          vt = new ft(!0),
          yt = new mt(!0),
          _t = (e) => e,
          xt = (e) => Reflect.getPrototypeOf(e);
        function St(e) {
          return function (...t) {
            return "delete" !== e && ("clear" === e ? void 0 : this);
          };
        }
        function wt(e, t) {
          const o = {
            get(o) {
              const n = this.__v_raw,
                r = zt(n),
                a = zt(o);
              e || (B(o, a) && Qe(r, 0, o), Qe(r, 0, a));
              const { has: s } = xt(r),
                i = t ? _t : e ? Ht : Vt;
              return s.call(r, o)
                ? i(n.get(o))
                : s.call(r, a)
                ? i(n.get(a))
                : void (n !== r && n.get(o));
            },
            get size() {
              const t = this.__v_raw;
              return !e && Qe(zt(t), 0, Je), Reflect.get(t, "size", t);
            },
            has(t) {
              const o = this.__v_raw,
                n = zt(o),
                r = zt(t);
              return (
                e || (B(t, r) && Qe(n, 0, t), Qe(n, 0, r)),
                t === r ? o.has(t) : o.has(t) || o.has(r)
              );
            },
            forEach(o, n) {
              const r = this,
                a = r.__v_raw,
                s = zt(a),
                i = t ? _t : e ? Ht : Vt;
              return (
                !e && Qe(s, 0, Je),
                a.forEach((e, t) => o.call(n, i(e), i(t), r))
              );
            },
          };
          p(
            o,
            e
              ? {
                  add: St("add"),
                  set: St("set"),
                  delete: St("delete"),
                  clear: St("clear"),
                }
              : {
                  add(e) {
                    t || qt(e) || Bt(e) || (e = zt(e));
                    const o = zt(this);
                    return (
                      xt(o).has.call(o, e) || (o.add(e), et(o, "add", e, e)),
                      this
                    );
                  },
                  set(e, o) {
                    t || qt(o) || Bt(o) || (o = zt(o));
                    const n = zt(this),
                      { has: r, get: a } = xt(n);
                    let s = r.call(n, e);
                    s || ((e = zt(e)), (s = r.call(n, e)));
                    const i = a.call(n, e);
                    return (
                      n.set(e, o),
                      s ? B(o, i) && et(n, "set", e, o) : et(n, "add", e, o),
                      this
                    );
                  },
                  delete(e) {
                    const t = zt(this),
                      { has: o, get: n } = xt(t);
                    let r = o.call(t, e);
                    r || ((e = zt(e)), (r = o.call(t, e)));
                    n && n.call(t, e);
                    const a = t.delete(e);
                    return r && et(t, "delete", e, void 0), a;
                  },
                  clear() {
                    const e = zt(this),
                      t = 0 !== e.size,
                      o = e.clear();
                    return t && et(e, "clear", void 0, void 0), o;
                  },
                }
          );
          return (
            ["keys", "values", "entries", Symbol.iterator].forEach((n) => {
              o[n] = (function (e, t, o) {
                return function (...n) {
                  const r = this.__v_raw,
                    a = zt(r),
                    s = b(a),
                    i = "entries" === e || (e === Symbol.iterator && s),
                    c = "keys" === e && s,
                    l = r[e](...n),
                    u = o ? _t : t ? Ht : Vt;
                  return (
                    !t && Qe(a, 0, c ? Xe : Je),
                    {
                      next() {
                        const { value: e, done: t } = l.next();
                        return t
                          ? { value: e, done: t }
                          : { value: i ? [u(e[0]), u(e[1])] : u(e), done: t };
                      },
                      [Symbol.iterator]() {
                        return this;
                      },
                    }
                  );
                };
              })(n, e, t);
            }),
            o
          );
        }
        function Et(e, t) {
          const o = wt(e, t);
          return (t, n, r) =>
            "__v_isReactive" === n
              ? !e
              : "__v_isReadonly" === n
              ? e
              : "__v_raw" === n
              ? t
              : Reflect.get(m(o, n) && n in t ? o : t, n, r);
        }
        const Ct = { get: Et(!1, !1) },
          Tt = { get: Et(!1, !0) },
          kt = { get: Et(!0, !1) },
          At = { get: Et(!0, !0) };
        const Ot = new WeakMap(),
          Rt = new WeakMap(),
          Nt = new WeakMap(),
          jt = new WeakMap();
        function It(e) {
          return Bt(e) ? e : Ut(e, !1, gt, Ct, Ot);
        }
        function Pt(e) {
          return Ut(e, !1, vt, Tt, Rt);
        }
        function Lt(e) {
          return Ut(e, !0, bt, kt, Nt);
        }
        function Mt(e) {
          return Ut(e, !0, yt, At, jt);
        }
        function Ut(e, t, o, n, r) {
          if (!w(e)) return e;
          if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
          const a =
            (s = e).__v_skip || !Object.isExtensible(s)
              ? 0
              : (function (e) {
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
                })(k(s));
          var s;
          if (0 === a) return e;
          const i = r.get(e);
          if (i) return i;
          const c = new Proxy(e, 2 === a ? n : o);
          return r.set(e, c), c;
        }
        function Dt(e) {
          return Bt(e) ? Dt(e.__v_raw) : !(!e || !e.__v_isReactive);
        }
        function Bt(e) {
          return !(!e || !e.__v_isReadonly);
        }
        function qt(e) {
          return !(!e || !e.__v_isShallow);
        }
        function Ft(e) {
          return !!e && !!e.__v_raw;
        }
        function zt(e) {
          const t = e && e.__v_raw;
          return t ? zt(t) : e;
        }
        function $t(e) {
          return (
            !m(e, "__v_skip") && Object.isExtensible(e) && F(e, "__v_skip", !0),
            e
          );
        }
        const Vt = (e) => (w(e) ? It(e) : e),
          Ht = (e) => (w(e) ? Lt(e) : e);
        function Wt(e) {
          return !!e && !0 === e.__v_isRef;
        }
        function Yt(e) {
          return Gt(e, !1);
        }
        function Kt(e) {
          return Gt(e, !0);
        }
        function Gt(e, t) {
          return Wt(e) ? e : new Jt(e, t);
        }
        class Jt {
          constructor(e, t) {
            (this.dep = new Ye()),
              (this.__v_isRef = !0),
              (this.__v_isShallow = !1),
              (this._rawValue = t ? e : zt(e)),
              (this._value = t ? e : Vt(e)),
              (this.__v_isShallow = t);
          }
          get value() {
            return this.dep.track(), this._value;
          }
          set value(e) {
            const t = this._rawValue,
              o = this.__v_isShallow || qt(e) || Bt(e);
            (e = o ? e : zt(e)),
              B(e, t) &&
                ((this._rawValue = e),
                (this._value = o ? e : Vt(e)),
                this.dep.trigger());
          }
        }
        function Xt(e) {
          e.dep && e.dep.trigger();
        }
        function Zt(e) {
          return Wt(e) ? e.value : e;
        }
        function Qt(e) {
          return _(e) ? e() : Zt(e);
        }
        const eo = {
          get: (e, t, o) => ("__v_raw" === t ? e : Zt(Reflect.get(e, t, o))),
          set: (e, t, o, n) => {
            const r = e[t];
            return Wt(r) && !Wt(o)
              ? ((r.value = o), !0)
              : Reflect.set(e, t, o, n);
          },
        };
        function to(e) {
          return Dt(e) ? e : new Proxy(e, eo);
        }
        class oo {
          constructor(e) {
            (this.__v_isRef = !0), (this._value = void 0);
            const t = (this.dep = new Ye()),
              { get: o, set: n } = e(t.track.bind(t), t.trigger.bind(t));
            (this._get = o), (this._set = n);
          }
          get value() {
            return (this._value = this._get());
          }
          set value(e) {
            this._set(e);
          }
        }
        function no(e) {
          return new oo(e);
        }
        function ro(e) {
          const t = g(e) ? new Array(e.length) : {};
          for (const o in e) t[o] = co(e, o);
          return t;
        }
        class ao {
          constructor(e, t, o) {
            (this._object = e),
              (this._key = t),
              (this._defaultValue = o),
              (this.__v_isRef = !0),
              (this._value = void 0);
          }
          get value() {
            const e = this._object[this._key];
            return (this._value = void 0 === e ? this._defaultValue : e);
          }
          set value(e) {
            this._object[this._key] = e;
          }
          get dep() {
            return (function (e, t) {
              const o = Ge.get(e);
              return o && o.get(t);
            })(zt(this._object), this._key);
          }
        }
        class so {
          constructor(e) {
            (this._getter = e),
              (this.__v_isRef = !0),
              (this.__v_isReadonly = !0),
              (this._value = void 0);
          }
          get value() {
            return (this._value = this._getter());
          }
        }
        function io(e, t, o) {
          return Wt(e)
            ? e
            : _(e)
            ? new so(e)
            : w(e) && arguments.length > 1
            ? co(e, t, o)
            : Yt(e);
        }
        function co(e, t, o) {
          const n = e[t];
          return Wt(n) ? n : new ao(e, t, o);
        }
        class lo {
          constructor(e, t, o) {
            (this.fn = e),
              (this.setter = t),
              (this._value = void 0),
              (this.dep = new Ye(this)),
              (this.__v_isRef = !0),
              (this.deps = void 0),
              (this.depsTail = void 0),
              (this.flags = 16),
              (this.globalVersion = He - 1),
              (this.next = void 0),
              (this.effect = this),
              (this.__v_isReadonly = !t),
              (this.isSSR = o);
          }
          notify() {
            if (((this.flags |= 16), !(8 & this.flags || ye === this)))
              return Oe(this, !0), !0;
          }
          get value() {
            const e = this.dep.track();
            return Le(this), e && (e.version = this.dep.version), this._value;
          }
          set value(e) {
            this.setter && this.setter(e);
          }
        }
        const uo = { GET: "get", HAS: "has", ITERATE: "iterate" },
          po = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" },
          ho = {},
          fo = new WeakMap();
        let mo;
        function go() {
          return mo;
        }
        function bo(e, t = !1, o = mo) {
          if (o) {
            let t = fo.get(o);
            t || fo.set(o, (t = [])), t.push(e);
          } else 0;
        }
        function vo(e, t = 1 / 0, o) {
          if (t <= 0 || !w(e) || e.__v_skip) return e;
          if ((o = o || new Set()).has(e)) return e;
          if ((o.add(e), t--, Wt(e))) vo(e.value, t, o);
          else if (g(e)) for (let n = 0; n < e.length; n++) vo(e[n], t, o);
          else if (v(e) || b(e))
            e.forEach((e) => {
              vo(e, t, o);
            });
          else if (A(e)) {
            for (const n in e) vo(e[n], t, o);
            for (const n of Object.getOwnPropertySymbols(e))
              Object.prototype.propertyIsEnumerable.call(e, n) &&
                vo(e[n], t, o);
          }
          return e;
        }
        const yo = [];
        let _o = !1;
        function xo(e, ...t) {
          if (_o) return;
          (_o = !0), ze();
          const o = yo.length ? yo[yo.length - 1].component : null,
            n = o && o.appContext.config.warnHandler,
            r = (function () {
              let e = yo[yo.length - 1];
              if (!e) return [];
              const t = [];
              for (; e; ) {
                const o = t[0];
                o && o.vnode === e
                  ? o.recurseCount++
                  : t.push({ vnode: e, recurseCount: 0 });
                const n = e.component && e.component.parent;
                e = n && n.vnode;
              }
              return t;
            })();
          if (n)
            ko(n, o, 11, [
              e +
                t
                  .map((e) => {
                    var t, o;
                    return null !=
                      (o = null == (t = e.toString) ? void 0 : t.call(e))
                      ? o
                      : JSON.stringify(e);
                  })
                  .join(""),
              o && o.proxy,
              r.map(({ vnode: e }) => `at <${Ei(o, e.type)}>`).join("\n"),
              r,
            ]);
          else {
            const o = [`[Vue warn]: ${e}`, ...t];
            r.length &&
              o.push(
                "\n",
                ...(function (e) {
                  const t = [];
                  return (
                    e.forEach((e, o) => {
                      t.push(
                        ...(0 === o ? [] : ["\n"]),
                        ...(function ({ vnode: e, recurseCount: t }) {
                          const o = t > 0 ? `... (${t} recursive calls)` : "",
                            n = !!e.component && null == e.component.parent,
                            r = ` at <${Ei(e.component, e.type, n)}`,
                            a = ">" + o;
                          return e.props ? [r, ...So(e.props), a] : [r + a];
                        })(e)
                      );
                    }),
                    t
                  );
                })(r)
              ),
              console.warn(...o);
          }
          $e(), (_o = !1);
        }
        function So(e) {
          const t = [],
            o = Object.keys(e);
          return (
            o.slice(0, 3).forEach((o) => {
              t.push(...wo(o, e[o]));
            }),
            o.length > 3 && t.push(" ..."),
            t
          );
        }
        function wo(e, t, o) {
          return x(t)
            ? ((t = JSON.stringify(t)), o ? t : [`${e}=${t}`])
            : "number" == typeof t || "boolean" == typeof t || null == t
            ? o
              ? t
              : [`${e}=${t}`]
            : Wt(t)
            ? ((t = wo(e, zt(t.value), !0)), o ? t : [`${e}=Ref<`, t, ">"])
            : _(t)
            ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`]
            : ((t = zt(t)), o ? t : [`${e}=`, t]);
        }
        function Eo(e, t) {}
        const Co = {
            SETUP_FUNCTION: 0,
            0: "SETUP_FUNCTION",
            RENDER_FUNCTION: 1,
            1: "RENDER_FUNCTION",
            NATIVE_EVENT_HANDLER: 5,
            5: "NATIVE_EVENT_HANDLER",
            COMPONENT_EVENT_HANDLER: 6,
            6: "COMPONENT_EVENT_HANDLER",
            VNODE_HOOK: 7,
            7: "VNODE_HOOK",
            DIRECTIVE_HOOK: 8,
            8: "DIRECTIVE_HOOK",
            TRANSITION_HOOK: 9,
            9: "TRANSITION_HOOK",
            APP_ERROR_HANDLER: 10,
            10: "APP_ERROR_HANDLER",
            APP_WARN_HANDLER: 11,
            11: "APP_WARN_HANDLER",
            FUNCTION_REF: 12,
            12: "FUNCTION_REF",
            ASYNC_COMPONENT_LOADER: 13,
            13: "ASYNC_COMPONENT_LOADER",
            SCHEDULER: 14,
            14: "SCHEDULER",
            COMPONENT_UPDATE: 15,
            15: "COMPONENT_UPDATE",
            APP_UNMOUNT_CLEANUP: 16,
            16: "APP_UNMOUNT_CLEANUP",
          },
          To = {
            sp: "serverPrefetch hook",
            bc: "beforeCreate hook",
            c: "created hook",
            bm: "beforeMount hook",
            m: "mounted hook",
            bu: "beforeUpdate hook",
            u: "updated",
            bum: "beforeUnmount hook",
            um: "unmounted hook",
            a: "activated hook",
            da: "deactivated hook",
            ec: "errorCaptured hook",
            rtc: "renderTracked hook",
            rtg: "renderTriggered hook",
            0: "setup function",
            1: "render function",
            2: "watcher getter",
            3: "watcher callback",
            4: "watcher cleanup function",
            5: "native event handler",
            6: "component event handler",
            7: "vnode hook",
            8: "directive hook",
            9: "transition hook",
            10: "app errorHandler",
            11: "app warnHandler",
            12: "ref function",
            13: "async component loader",
            14: "scheduler flush",
            15: "component update",
            16: "app unmount cleanup function",
          };
        function ko(e, t, o, n) {
          try {
            return n ? e(...n) : e();
          } catch (e) {
            Oo(e, t, o);
          }
        }
        function Ao(e, t, o, n) {
          if (_(e)) {
            const r = ko(e, t, o, n);
            return (
              r &&
                E(r) &&
                r.catch((e) => {
                  Oo(e, t, o);
                }),
              r
            );
          }
          if (g(e)) {
            const r = [];
            for (let a = 0; a < e.length; a++) r.push(Ao(e[a], t, o, n));
            return r;
          }
        }
        function Oo(e, t, o, n = !0) {
          t && t.vnode;
          const { errorHandler: r, throwUnhandledErrorInProduction: a } =
            (t && t.appContext.config) || s;
          if (t) {
            let n = t.parent;
            const a = t.proxy,
              s = `https://vuejs.org/error-reference/#runtime-${o}`;
            for (; n; ) {
              const t = n.ec;
              if (t)
                for (let o = 0; o < t.length; o++)
                  if (!1 === t[o](e, a, s)) return;
              n = n.parent;
            }
            if (r) return ze(), ko(r, null, 10, [e, a, s]), void $e();
          }
          !(function (e, t, o, n = !0, r = !1) {
            if (r) throw e;
            console.error(e);
          })(e, 0, 0, n, a);
        }
        const Ro = [];
        let No = -1;
        const jo = [];
        let Io = null,
          Po = 0;
        const Lo = Promise.resolve();
        let Mo = null;
        function Uo(e) {
          const t = Mo || Lo;
          return e ? t.then(this ? e.bind(this) : e) : t;
        }
        function Do(e) {
          if (!(1 & e.flags)) {
            const t = $o(e),
              o = Ro[Ro.length - 1];
            !o || (!(2 & e.flags) && t >= $o(o))
              ? Ro.push(e)
              : Ro.splice(
                  (function (e) {
                    let t = No + 1,
                      o = Ro.length;
                    for (; t < o; ) {
                      const n = (t + o) >>> 1,
                        r = Ro[n],
                        a = $o(r);
                      a < e || (a === e && 2 & r.flags) ? (t = n + 1) : (o = n);
                    }
                    return t;
                  })(t),
                  0,
                  e
                ),
              (e.flags |= 1),
              Bo();
          }
        }
        function Bo() {
          Mo || (Mo = Lo.then(Vo));
        }
        function qo(e) {
          g(e)
            ? jo.push(...e)
            : Io && -1 === e.id
            ? Io.splice(Po + 1, 0, e)
            : 1 & e.flags || (jo.push(e), (e.flags |= 1)),
            Bo();
        }
        function Fo(e, t, o = No + 1) {
          for (0; o < Ro.length; o++) {
            const t = Ro[o];
            if (t && 2 & t.flags) {
              if (e && t.id !== e.uid) continue;
              0,
                Ro.splice(o, 1),
                o--,
                4 & t.flags && (t.flags &= -2),
                t(),
                4 & t.flags || (t.flags &= -2);
            }
          }
        }
        function zo(e) {
          if (jo.length) {
            const e = [...new Set(jo)].sort((e, t) => $o(e) - $o(t));
            if (((jo.length = 0), Io)) return void Io.push(...e);
            for (Io = e, Po = 0; Po < Io.length; Po++) {
              const e = Io[Po];
              0,
                4 & e.flags && (e.flags &= -2),
                8 & e.flags || e(),
                (e.flags &= -2);
            }
            (Io = null), (Po = 0);
          }
        }
        const $o = (e) => (null == e.id ? (2 & e.flags ? -1 : 1 / 0) : e.id);
        function Vo(e) {
          try {
            for (No = 0; No < Ro.length; No++) {
              const e = Ro[No];
              !e ||
                8 & e.flags ||
                (4 & e.flags && (e.flags &= -2),
                ko(e, e.i, e.i ? 15 : 14),
                4 & e.flags || (e.flags &= -2));
            }
          } finally {
            for (; No < Ro.length; No++) {
              const e = Ro[No];
              e && (e.flags &= -2);
            }
            (No = -1),
              (Ro.length = 0),
              zo(),
              (Mo = null),
              (Ro.length || jo.length) && Vo(e);
          }
        }
        let Ho,
          Wo = [],
          Yo = !1;
        let Ko = null,
          Go = null;
        function Jo(e) {
          const t = Ko;
          return (Ko = e), (Go = (e && e.type.__scopeId) || null), t;
        }
        function Xo(e) {
          Go = e;
        }
        function Zo() {
          Go = null;
        }
        const Qo = (e) => en;
        function en(e, t = Ko, o) {
          if (!t) return e;
          if (e._n) return e;
          const n = (...o) => {
            n._d && js(-1);
            const r = Jo(t);
            let a;
            try {
              a = e(...o);
            } finally {
              Jo(r), n._d && js(1);
            }
            return a;
          };
          return (n._n = !0), (n._c = !0), (n._d = !0), n;
        }
        function tn(e, t) {
          if (null === Ko) return e;
          const o = _i(Ko),
            n = e.dirs || (e.dirs = []);
          for (let e = 0; e < t.length; e++) {
            let [r, a, i, c = s] = t[e];
            r &&
              (_(r) && (r = { mounted: r, updated: r }),
              r.deep && vo(a),
              n.push({
                dir: r,
                instance: o,
                value: a,
                oldValue: void 0,
                arg: i,
                modifiers: c,
              }));
          }
          return e;
        }
        function on(e, t, o, n) {
          const r = e.dirs,
            a = t && t.dirs;
          for (let s = 0; s < r.length; s++) {
            const i = r[s];
            a && (i.oldValue = a[s].value);
            let c = i.dir[n];
            c && (ze(), Ao(c, o, 8, [e.el, i, e, t]), $e());
          }
        }
        const nn = Symbol("_vte"),
          rn = (e) => e.__isTeleport,
          an = (e) => e && (e.disabled || "" === e.disabled),
          sn = (e) => e && (e.defer || "" === e.defer),
          cn = (e) =>
            "undefined" != typeof SVGElement && e instanceof SVGElement,
          ln = (e) =>
            "function" == typeof MathMLElement && e instanceof MathMLElement,
          un = (e, t) => {
            const o = e && e.to;
            if (x(o)) {
              if (t) {
                return t(o);
              }
              return null;
            }
            return o;
          },
          dn = {
            name: "Teleport",
            __isTeleport: !0,
            process(e, t, o, n, r, a, s, i, c, l) {
              const {
                  mc: u,
                  pc: d,
                  pbc: p,
                  o: {
                    insert: h,
                    querySelector: f,
                    createText: m,
                    createComment: g,
                  },
                } = l,
                b = an(t.props);
              let { shapeFlag: v, children: y, dynamicChildren: _ } = t;
              if (null == e) {
                const e = (t.el = m("")),
                  l = (t.anchor = m(""));
                h(e, o, n), h(l, o, n);
                const d = (e, t) => {
                    16 & v &&
                      (r && r.isCE && (r.ce._teleportTarget = e),
                      u(y, e, t, r, a, s, i, c));
                  },
                  p = () => {
                    const e = (t.target = un(t.props, f)),
                      o = mn(e, t, m, h);
                    e &&
                      ("svg" !== s && cn(e)
                        ? (s = "svg")
                        : "mathml" !== s && ln(e) && (s = "mathml"),
                      b || (d(e, o), fn(t, !1)));
                  };
                b && (d(o, l), fn(t, !0)),
                  sn(t.props)
                    ? ((t.el.__isMounted = !1),
                      Da(() => {
                        p(), delete t.el.__isMounted;
                      }, a))
                    : p();
              } else {
                if (sn(t.props) && !1 === e.el.__isMounted)
                  return void Da(() => {
                    dn.process(e, t, o, n, r, a, s, i, c, l);
                  }, a);
                (t.el = e.el), (t.targetStart = e.targetStart);
                const u = (t.anchor = e.anchor),
                  h = (t.target = e.target),
                  m = (t.targetAnchor = e.targetAnchor),
                  g = an(e.props),
                  v = g ? o : h,
                  y = g ? u : m;
                if (
                  ("svg" === s || cn(h)
                    ? (s = "svg")
                    : ("mathml" === s || ln(h)) && (s = "mathml"),
                  _
                    ? (p(e.dynamicChildren, _, v, r, a, s, i), Ha(e, t, !0))
                    : c || d(e, t, v, y, r, a, s, i, !1),
                  b)
                )
                  g
                    ? t.props &&
                      e.props &&
                      t.props.to !== e.props.to &&
                      (t.props.to = e.props.to)
                    : pn(t, o, u, l, 1);
                else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                  const e = (t.target = un(t.props, f));
                  e && pn(t, e, null, l, 0);
                } else g && pn(t, h, m, l, 1);
                fn(t, b);
              }
            },
            remove(e, t, o, { um: n, o: { remove: r } }, a) {
              const {
                shapeFlag: s,
                children: i,
                anchor: c,
                targetStart: l,
                targetAnchor: u,
                target: d,
                props: p,
              } = e;
              if ((d && (r(l), r(u)), a && r(c), 16 & s)) {
                const e = a || !an(p);
                for (let r = 0; r < i.length; r++) {
                  const a = i[r];
                  n(a, t, o, e, !!a.dynamicChildren);
                }
              }
            },
            move: pn,
            hydrate: function (
              e,
              t,
              o,
              n,
              r,
              a,
              {
                o: {
                  nextSibling: s,
                  parentNode: i,
                  querySelector: c,
                  insert: l,
                  createText: u,
                },
              },
              d
            ) {
              const p = (t.target = un(t.props, c));
              if (p) {
                const c = an(t.props),
                  h = p._lpa || p.firstChild;
                if (16 & t.shapeFlag)
                  if (c)
                    (t.anchor = d(s(e), t, i(e), o, n, r, a)),
                      (t.targetStart = h),
                      (t.targetAnchor = h && s(h));
                  else {
                    t.anchor = s(e);
                    let i = h;
                    for (; i; ) {
                      if (i && 8 === i.nodeType)
                        if ("teleport start anchor" === i.data)
                          t.targetStart = i;
                        else if ("teleport anchor" === i.data) {
                          (t.targetAnchor = i),
                            (p._lpa = t.targetAnchor && s(t.targetAnchor));
                          break;
                        }
                      i = s(i);
                    }
                    t.targetAnchor || mn(p, t, u, l),
                      d(h && s(h), t, p, o, n, r, a);
                  }
                fn(t, c);
              }
              return t.anchor && s(t.anchor);
            },
          };
        function pn(e, t, o, { o: { insert: n }, m: r }, a = 2) {
          0 === a && n(e.targetAnchor, t, o);
          const { el: s, anchor: i, shapeFlag: c, children: l, props: u } = e,
            d = 2 === a;
          if ((d && n(s, t, o), (!d || an(u)) && 16 & c))
            for (let e = 0; e < l.length; e++) r(l[e], t, o, 2);
          d && n(i, t, o);
        }
        const hn = dn;
        function fn(e, t) {
          const o = e.ctx;
          if (o && o.ut) {
            let n, r;
            for (
              t
                ? ((n = e.el), (r = e.anchor))
                : ((n = e.targetStart), (r = e.targetAnchor));
              n && n !== r;

            )
              1 === n.nodeType && n.setAttribute("data-v-owner", o.uid),
                (n = n.nextSibling);
            o.ut();
          }
        }
        function mn(e, t, o, n) {
          const r = (t.targetStart = o("")),
            a = (t.targetAnchor = o(""));
          return (r[nn] = a), e && (n(r, e), n(a, e)), a;
        }
        const gn = Symbol("_leaveCb"),
          bn = Symbol("_enterCb");
        function vn() {
          const e = {
            isMounted: !1,
            isLeaving: !1,
            isUnmounting: !1,
            leavingVNodes: new Map(),
          };
          return (
            mr(() => {
              e.isMounted = !0;
            }),
            vr(() => {
              e.isUnmounting = !0;
            }),
            e
          );
        }
        const yn = [Function, Array],
          _n = {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: yn,
            onEnter: yn,
            onAfterEnter: yn,
            onEnterCancelled: yn,
            onBeforeLeave: yn,
            onLeave: yn,
            onAfterLeave: yn,
            onLeaveCancelled: yn,
            onBeforeAppear: yn,
            onAppear: yn,
            onAfterAppear: yn,
            onAppearCancelled: yn,
          },
          xn = (e) => {
            const t = e.subTree;
            return t.component ? xn(t.component) : t;
          };
        function Sn(e) {
          let t = e[0];
          if (e.length > 1) {
            let o = !1;
            for (const n of e)
              if (n.type !== Es) {
                0, (t = n), (o = !0);
                break;
              }
          }
          return t;
        }
        const wn = {
          name: "BaseTransition",
          props: _n,
          setup(e, { slots: t }) {
            const o = ri(),
              n = vn();
            return () => {
              const r = t.default && On(t.default(), !0);
              if (!r || !r.length) return;
              const a = Sn(r),
                s = zt(e),
                { mode: i } = s;
              if (n.isLeaving) return Tn(a);
              const c = kn(a);
              if (!c) return Tn(a);
              let l = Cn(c, s, n, o, (e) => (l = e));
              c.type !== Es && An(c, l);
              let u = o.subTree && kn(o.subTree);
              if (u && u.type !== Es && !Us(c, u) && xn(o).type !== Es) {
                let e = Cn(u, s, n, o);
                if ((An(u, e), "out-in" === i && c.type !== Es))
                  return (
                    (n.isLeaving = !0),
                    (e.afterLeave = () => {
                      (n.isLeaving = !1),
                        8 & o.job.flags || o.update(),
                        delete e.afterLeave,
                        (u = void 0);
                    }),
                    Tn(a)
                  );
                "in-out" === i && c.type !== Es
                  ? (e.delayLeave = (e, t, o) => {
                      (En(n, u)[String(u.key)] = u),
                        (e[gn] = () => {
                          t(),
                            (e[gn] = void 0),
                            delete l.delayedLeave,
                            (u = void 0);
                        }),
                        (l.delayedLeave = () => {
                          o(), delete l.delayedLeave, (u = void 0);
                        });
                    })
                  : (u = void 0);
              } else u && (u = void 0);
              return a;
            };
          },
        };
        function En(e, t) {
          const { leavingVNodes: o } = e;
          let n = o.get(t.type);
          return n || ((n = Object.create(null)), o.set(t.type, n)), n;
        }
        function Cn(e, t, o, n, r) {
          const {
              appear: a,
              mode: s,
              persisted: i = !1,
              onBeforeEnter: c,
              onEnter: l,
              onAfterEnter: u,
              onEnterCancelled: d,
              onBeforeLeave: p,
              onLeave: h,
              onAfterLeave: f,
              onLeaveCancelled: m,
              onBeforeAppear: b,
              onAppear: v,
              onAfterAppear: y,
              onAppearCancelled: _,
            } = t,
            x = String(e.key),
            S = En(o, e),
            w = (e, t) => {
              e && Ao(e, n, 9, t);
            },
            E = (e, t) => {
              const o = t[1];
              w(e, t),
                g(e)
                  ? e.every((e) => e.length <= 1) && o()
                  : e.length <= 1 && o();
            },
            C = {
              mode: s,
              persisted: i,
              beforeEnter(t) {
                let n = c;
                if (!o.isMounted) {
                  if (!a) return;
                  n = b || c;
                }
                t[gn] && t[gn](!0);
                const r = S[x];
                r && Us(e, r) && r.el[gn] && r.el[gn](), w(n, [t]);
              },
              enter(e) {
                let t = l,
                  n = u,
                  r = d;
                if (!o.isMounted) {
                  if (!a) return;
                  (t = v || l), (n = y || u), (r = _ || d);
                }
                let s = !1;
                const i = (e[bn] = (t) => {
                  s ||
                    ((s = !0),
                    w(t ? r : n, [e]),
                    C.delayedLeave && C.delayedLeave(),
                    (e[bn] = void 0));
                });
                t ? E(t, [e, i]) : i();
              },
              leave(t, n) {
                const r = String(e.key);
                if ((t[bn] && t[bn](!0), o.isUnmounting)) return n();
                w(p, [t]);
                let a = !1;
                const s = (t[gn] = (o) => {
                  a ||
                    ((a = !0),
                    n(),
                    w(o ? m : f, [t]),
                    (t[gn] = void 0),
                    S[r] === e && delete S[r]);
                });
                (S[r] = e), h ? E(h, [t, s]) : s();
              },
              clone(e) {
                const a = Cn(e, t, o, n, r);
                return r && r(a), a;
              },
            };
          return C;
        }
        function Tn(e) {
          if (or(e)) return ((e = Hs(e)).children = null), e;
        }
        function kn(e) {
          if (!or(e)) return rn(e.type) && e.children ? Sn(e.children) : e;
          if (e.component) return e.component.subTree;
          const { shapeFlag: t, children: o } = e;
          if (o) {
            if (16 & t) return o[0];
            if (32 & t && _(o.default)) return o.default();
          }
        }
        function An(e, t) {
          6 & e.shapeFlag && e.component
            ? ((e.transition = t), An(e.component.subTree, t))
            : 128 & e.shapeFlag
            ? ((e.ssContent.transition = t.clone(e.ssContent)),
              (e.ssFallback.transition = t.clone(e.ssFallback)))
            : (e.transition = t);
        }
        function On(e, t = !1, o) {
          let n = [],
            r = 0;
          for (let a = 0; a < e.length; a++) {
            let s = e[a];
            const i =
              null == o ? s.key : String(o) + String(null != s.key ? s.key : a);
            s.type === Ss
              ? (128 & s.patchFlag && r++, (n = n.concat(On(s.children, t, i))))
              : (t || s.type !== Es) &&
                n.push(null != i ? Hs(s, { key: i }) : s);
          }
          if (r > 1) for (let e = 0; e < n.length; e++) n[e].patchFlag = -2;
          return n;
        }
        function Rn(e, t) {
          return _(e) ? (() => p({ name: e.name }, t, { setup: e }))() : e;
        }
        function Nn() {
          const e = ri();
          return e
            ? (e.appContext.config.idPrefix || "v") +
                "-" +
                e.ids[0] +
                e.ids[1]++
            : "";
        }
        function jn(e) {
          e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
        }
        function In(e) {
          const t = ri(),
            o = Kt(null);
          if (t) {
            const n = t.refs === s ? (t.refs = {}) : t.refs;
            Object.defineProperty(n, e, {
              enumerable: !0,
              get: () => o.value,
              set: (e) => (o.value = e),
            });
          } else 0;
          return o;
        }
        function Pn(e, t, o, n, r = !1) {
          if (g(e))
            return void e.forEach((e, a) =>
              Pn(e, t && (g(t) ? t[a] : t), o, n, r)
            );
          if (Qn(n) && !r)
            return void (
              512 & n.shapeFlag &&
              n.type.__asyncResolved &&
              n.component.subTree.component &&
              Pn(e, t, o, n.component.subTree)
            );
          const a = 4 & n.shapeFlag ? _i(n.component) : n.el,
            i = r ? null : a,
            { i: c, r: l } = e;
          const u = t && t.r,
            d = c.refs === s ? (c.refs = {}) : c.refs,
            p = c.setupState,
            f = zt(p),
            b = p === s ? () => !1 : (e) => m(f, e);
          if (
            (null != u &&
              u !== l &&
              (x(u)
                ? ((d[u] = null), b(u) && (p[u] = null))
                : Wt(u) && (u.value = null)),
            _(l))
          )
            ko(l, c, 12, [i, d]);
          else {
            const t = x(l),
              n = Wt(l);
            if (t || n) {
              const s = () => {
                if (e.f) {
                  const o = t ? (b(l) ? p[l] : d[l]) : l.value;
                  r
                    ? g(o) && h(o, a)
                    : g(o)
                    ? o.includes(a) || o.push(a)
                    : t
                    ? ((d[l] = [a]), b(l) && (p[l] = d[l]))
                    : ((l.value = [a]), e.k && (d[e.k] = l.value));
                } else
                  t
                    ? ((d[l] = i), b(l) && (p[l] = i))
                    : n && ((l.value = i), e.k && (d[e.k] = i));
              };
              i ? ((s.id = -1), Da(s, o)) : s();
            } else 0;
          }
        }
        let Ln = !1;
        const Mn = () => {
            Ln ||
              (console.error("Hydration completed but contains mismatches."),
              (Ln = !0));
          },
          Un = (e) => {
            if (1 === e.nodeType)
              return ((e) =>
                e.namespaceURI.includes("svg") &&
                "foreignObject" !== e.tagName)(e)
                ? "svg"
                : ((e) => e.namespaceURI.includes("MathML"))(e)
                ? "mathml"
                : void 0;
          },
          Dn = (e) => 8 === e.nodeType;
        function Bn(e) {
          const {
              mt: t,
              p: o,
              o: {
                patchProp: n,
                createText: r,
                nextSibling: a,
                parentNode: s,
                remove: i,
                insert: c,
                createComment: l,
              },
            } = e,
            d = (o, n, i, l, u, y = !1) => {
              y = y || !!n.dynamicChildren;
              const _ = Dn(o) && "[" === o.data,
                x = () => m(o, n, i, l, u, _),
                { type: S, ref: w, shapeFlag: E, patchFlag: C } = n;
              let T = o.nodeType;
              (n.el = o), -2 === C && ((y = !1), (n.dynamicChildren = null));
              let k = null;
              switch (S) {
                case ws:
                  3 !== T
                    ? "" === n.children
                      ? (c((n.el = r("")), s(o), o), (k = o))
                      : (k = x())
                    : (o.data !== n.children &&
                        (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                          xo(
                            "Hydration text mismatch in",
                            o.parentNode,
                            `\n  - rendered on server: ${JSON.stringify(
                              o.data
                            )}\n  - expected on client: ${JSON.stringify(
                              n.children
                            )}`
                          ),
                        Mn(),
                        (o.data = n.children)),
                      (k = a(o)));
                  break;
                case Es:
                  v(o)
                    ? ((k = a(o)), b((n.el = o.content.firstChild), o, i))
                    : (k = 8 !== T || _ ? x() : a(o));
                  break;
                case Cs:
                  if ((_ && (T = (o = a(o)).nodeType), 1 === T || 3 === T)) {
                    k = o;
                    const e = !n.children.length;
                    for (let t = 0; t < n.staticCount; t++)
                      e &&
                        (n.children += 1 === k.nodeType ? k.outerHTML : k.data),
                        t === n.staticCount - 1 && (n.anchor = k),
                        (k = a(k));
                    return _ ? a(k) : k;
                  }
                  x();
                  break;
                case Ss:
                  k = _ ? f(o, n, i, l, u, y) : x();
                  break;
                default:
                  if (1 & E)
                    k =
                      (1 === T &&
                        n.type.toLowerCase() === o.tagName.toLowerCase()) ||
                      v(o)
                        ? p(o, n, i, l, u, y)
                        : x();
                  else if (6 & E) {
                    n.slotScopeIds = u;
                    const e = s(o);
                    if (
                      ((k = _
                        ? g(o)
                        : Dn(o) && "teleport start" === o.data
                        ? g(o, o.data, "teleport end")
                        : a(o)),
                      t(n, e, null, i, l, Un(e), y),
                      Qn(n) && !n.type.__asyncResolved)
                    ) {
                      let t;
                      _
                        ? ((t = zs(Ss)),
                          (t.anchor = k ? k.previousSibling : e.lastChild))
                        : (t = 3 === o.nodeType ? Ws("") : zs("div")),
                        (t.el = o),
                        (n.component.subTree = t);
                    }
                  } else
                    64 & E
                      ? (k =
                          8 !== T
                            ? x()
                            : n.type.hydrate(o, n, i, l, u, y, e, h))
                      : 128 & E
                      ? (k = n.type.hydrate(o, n, i, l, Un(s(o)), u, y, e, d))
                      : __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                        xo("Invalid HostVNode type:", S, `(${typeof S})`);
              }
              return null != w && Pn(w, null, l, n), k;
            },
            p = (e, t, o, r, a, s) => {
              s = s || !!t.dynamicChildren;
              const {
                  type: c,
                  props: l,
                  patchFlag: d,
                  shapeFlag: p,
                  dirs: f,
                  transition: m,
                } = t,
                g = "input" === c || "option" === c;
              if (g || -1 !== d) {
                f && on(t, null, o, "created");
                let c,
                  y = !1;
                if (v(e)) {
                  y = Va(null, m) && o && o.vnode.props && o.vnode.props.appear;
                  const n = e.content.firstChild;
                  if (y) {
                    const e = n.getAttribute("class");
                    e && (n.$cls = e), m.beforeEnter(n);
                  }
                  b(n, e, o), (t.el = e = n);
                }
                if (16 & p && (!l || (!l.innerHTML && !l.textContent))) {
                  let n = h(e.firstChild, t, e, o, r, a, s),
                    c = !1;
                  for (; n; ) {
                    Wn(e, 1) ||
                      (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                        !c &&
                        (xo(
                          "Hydration children mismatch on",
                          e,
                          "\nServer rendered element contains more child nodes than client vdom."
                        ),
                        (c = !0)),
                      Mn());
                    const t = n;
                    (n = n.nextSibling), i(t);
                  }
                } else if (8 & p) {
                  let o = t.children;
                  "\n" !== o[0] ||
                    ("PRE" !== e.tagName && "TEXTAREA" !== e.tagName) ||
                    (o = o.slice(1)),
                    e.textContent !== o &&
                      (Wn(e, 0) ||
                        (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                          xo(
                            "Hydration text content mismatch on",
                            e,
                            `\n  - rendered on server: ${e.textContent}\n  - expected on client: ${t.children}`
                          ),
                        Mn()),
                      (e.textContent = t.children));
                }
                if (l)
                  if (
                    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ ||
                    g ||
                    !s ||
                    48 & d
                  ) {
                    const r = e.tagName.includes("-");
                    for (const a in l)
                      !__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ ||
                        (f && f.some((e) => e.dir.created)) ||
                        !qn(e, a, l[a], t, o) ||
                        Mn(),
                        ((g &&
                          (a.endsWith("value") || "indeterminate" === a)) ||
                          (u(a) && !R(a)) ||
                          "." === a[0] ||
                          r) &&
                          n(e, a, null, l[a], void 0, o);
                  } else if (l.onClick)
                    n(e, "onClick", null, l.onClick, void 0, o);
                  else if (4 & d && Dt(l.style))
                    for (const e in l.style) l.style[e];
                (c = l && l.onVnodeBeforeMount) && Qs(c, o, t),
                  f && on(t, null, o, "beforeMount"),
                  ((c = l && l.onVnodeMounted) || f || y) &&
                    _s(() => {
                      c && Qs(c, o, t),
                        y && m.enter(e),
                        f && on(t, null, o, "mounted");
                    }, r);
              }
              return e.nextSibling;
            },
            h = (e, t, n, s, i, l, u) => {
              u = u || !!t.dynamicChildren;
              const p = t.children,
                h = p.length;
              let f = !1;
              for (let t = 0; t < h; t++) {
                const m = u ? p[t] : (p[t] = Gs(p[t])),
                  g = m.type === ws;
                e
                  ? (g &&
                      !u &&
                      t + 1 < h &&
                      Gs(p[t + 1]).type === ws &&
                      (c(r(e.data.slice(m.children.length)), n, a(e)),
                      (e.data = m.children)),
                    (e = d(e, m, s, i, l, u)))
                  : g && !m.children
                  ? c((m.el = r("")), n)
                  : (Wn(n, 1) ||
                      (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                        !f &&
                        (xo(
                          "Hydration children mismatch on",
                          n,
                          "\nServer rendered element contains fewer child nodes than client vdom."
                        ),
                        (f = !0)),
                      Mn()),
                    o(null, m, n, null, s, i, Un(n), l));
              }
              return e;
            },
            f = (e, t, o, n, r, i) => {
              const { slotScopeIds: u } = t;
              u && (r = r ? r.concat(u) : u);
              const d = s(e),
                p = h(a(e), t, d, o, n, r, i);
              return p && Dn(p) && "]" === p.data
                ? a((t.anchor = p))
                : (Mn(), c((t.anchor = l("]")), d, p), p);
            },
            m = (e, t, n, r, c, l) => {
              if (
                (Wn(e.parentElement, 1) ||
                  (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                    xo(
                      "Hydration node mismatch:\n- rendered on server:",
                      e,
                      3 === e.nodeType
                        ? "(text)"
                        : Dn(e) && "[" === e.data
                        ? "(start of fragment)"
                        : "",
                      "\n- expected on client:",
                      t.type
                    ),
                  Mn()),
                (t.el = null),
                l)
              ) {
                const t = g(e);
                for (;;) {
                  const o = a(e);
                  if (!o || o === t) break;
                  i(o);
                }
              }
              const u = a(e),
                d = s(e);
              return (
                i(e),
                o(null, t, d, u, n, r, Un(d), c),
                n && ((n.vnode.el = t.el), hs(n, t.el)),
                u
              );
            },
            g = (e, t = "[", o = "]") => {
              let n = 0;
              for (; e; )
                if (
                  (e = a(e)) &&
                  Dn(e) &&
                  (e.data === t && n++, e.data === o)
                ) {
                  if (0 === n) return a(e);
                  n--;
                }
              return e;
            },
            b = (e, t, o) => {
              const n = t.parentNode;
              n && n.replaceChild(e, t);
              let r = o;
              for (; r; )
                r.vnode.el === t && (r.vnode.el = r.subTree.el = e),
                  (r = r.parent);
            },
            v = (e) => 1 === e.nodeType && "TEMPLATE" === e.tagName;
          return [
            (e, t) => {
              if (!t.hasChildNodes())
                return (
                  __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                    xo(
                      "Attempting to hydrate existing markup but container is empty. Performing full mount instead."
                    ),
                  o(null, e, t),
                  zo(),
                  void (t._vnode = e)
                );
              d(t.firstChild, e, null, null, null), zo(), (t._vnode = e);
            },
            d,
          ];
        }
        function qn(e, t, o, n, r) {
          let a, s, i, c;
          if ("class" === t)
            e.$cls
              ? ((i = e.$cls), delete e.$cls)
              : (i = e.getAttribute("class")),
              (c = Z(o)),
              (function (e, t) {
                if (e.size !== t.size) return !1;
                for (const o of e) if (!t.has(o)) return !1;
                return !0;
              })(Fn(i || ""), Fn(c)) || ((a = 2), (s = "class"));
          else if ("style" === t) {
            (i = e.getAttribute("style") || ""),
              (c = x(o)
                ? o
                : (function (e) {
                    if (!e) return "";
                    if (x(e)) return e;
                    let t = "";
                    for (const o in e) {
                      const n = e[o];
                      (x(n) || "number" == typeof n) &&
                        (t += `${o.startsWith("--") ? o : M(o)}:${n};`);
                    }
                    return t;
                  })(Y(o)));
            const t = zn(i),
              l = zn(c);
            if (n.dirs)
              for (const { dir: e, value: t } of n.dirs)
                "show" !== e.name || t || l.set("display", "none");
            r && $n(r, n, l),
              (function (e, t) {
                if (e.size !== t.size) return !1;
                for (const [o, n] of e) if (n !== t.get(o)) return !1;
                return !0;
              })(t, l) || ((a = 3), (s = "style"));
          } else
            ((e instanceof SVGElement && le(t)) ||
              (e instanceof HTMLElement && (se(t) || ce(t)))) &&
              (se(t)
                ? ((i = e.hasAttribute(t)), (c = ie(o)))
                : null == o
                ? ((i = e.hasAttribute(t)), (c = !1))
                : ((i = e.hasAttribute(t)
                    ? e.getAttribute(t)
                    : "value" === t && "TEXTAREA" === e.tagName && e.value),
                  (c =
                    !!(function (e) {
                      if (null == e) return !1;
                      const t = typeof e;
                      return (
                        "string" === t || "number" === t || "boolean" === t
                      );
                    })(o) && String(o))),
              i !== c && ((a = 4), (s = t)));
          if (null != a && !Wn(e, a)) {
            const t = (e) => (!1 === e ? "(not rendered)" : `${s}="${e}"`);
            return (
              xo(
                `Hydration ${Hn[a]} mismatch on`,
                e,
                `\n  - rendered on server: ${t(i)}\n  - expected on client: ${t(
                  c
                )}\n  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.\n  You should fix the source of the mismatch.`
              ),
              !0
            );
          }
          return !1;
        }
        function Fn(e) {
          return new Set(e.trim().split(/\s+/));
        }
        function zn(e) {
          const t = new Map();
          for (const o of e.split(";")) {
            let [e, n] = o.split(":");
            (e = e.trim()), (n = n && n.trim()), e && n && t.set(e, n);
          }
          return t;
        }
        function $n(e, t, o) {
          const n = e.subTree;
          if (
            e.getCssVars &&
            (t === n || (n && n.type === Ss && n.children.includes(t)))
          ) {
            const t = e.getCssVars();
            for (const e in t) o.set(`--${de(e, !1)}`, String(t[e]));
          }
          t === n && e.parent && $n(e.parent, e.vnode, o);
        }
        const Vn = "data-allow-mismatch",
          Hn = {
            0: "text",
            1: "children",
            2: "class",
            3: "style",
            4: "attribute",
          };
        function Wn(e, t) {
          if (0 === t || 1 === t)
            for (; e && !e.hasAttribute(Vn); ) e = e.parentElement;
          const o = e && e.getAttribute(Vn);
          if (null == o) return !1;
          if ("" === o) return !0;
          {
            const e = o.split(",");
            return !(0 !== t || !e.includes("children")) || e.includes(Hn[t]);
          }
        }
        const Yn = H().requestIdleCallback || ((e) => setTimeout(e, 1)),
          Kn = H().cancelIdleCallback || ((e) => clearTimeout(e)),
          Gn =
            (e = 1e4) =>
            (t) => {
              const o = Yn(t, { timeout: e });
              return () => Kn(o);
            };
        const Jn = (e) => (t, o) => {
            const n = new IntersectionObserver((e) => {
              for (const o of e)
                if (o.isIntersecting) {
                  n.disconnect(), t();
                  break;
                }
            }, e);
            return (
              o((e) => {
                if (e instanceof Element)
                  return (function (e) {
                    const {
                        top: t,
                        left: o,
                        bottom: n,
                        right: r,
                      } = e.getBoundingClientRect(),
                      { innerHeight: a, innerWidth: s } = window;
                    return (
                      ((t > 0 && t < a) || (n > 0 && n < a)) &&
                      ((o > 0 && o < s) || (r > 0 && r < s))
                    );
                  })(e)
                    ? (t(), n.disconnect(), !1)
                    : void n.observe(e);
              }),
              () => n.disconnect()
            );
          },
          Xn = (e) => (t) => {
            if (e) {
              const o = matchMedia(e);
              if (!o.matches)
                return (
                  o.addEventListener("change", t, { once: !0 }),
                  () => o.removeEventListener("change", t)
                );
              t();
            }
          },
          Zn =
            (e = []) =>
            (t, o) => {
              x(e) && (e = [e]);
              let n = !1;
              const r = (e) => {
                  n ||
                    ((n = !0),
                    a(),
                    t(),
                    e.target.dispatchEvent(new e.constructor(e.type, e)));
                },
                a = () => {
                  o((t) => {
                    for (const o of e) t.removeEventListener(o, r);
                  });
                };
              return (
                o((t) => {
                  for (const o of e) t.addEventListener(o, r, { once: !0 });
                }),
                a
              );
            };
        const Qn = (e) => !!e.type.__asyncLoader;
        function er(e) {
          _(e) && (e = { loader: e });
          const {
            loader: t,
            loadingComponent: o,
            errorComponent: n,
            delay: r = 200,
            hydrate: a,
            timeout: s,
            suspensible: i = !0,
            onError: c,
          } = e;
          let l,
            u = null,
            d = 0;
          const p = () => {
            let e;
            return (
              u ||
              (e = u =
                t()
                  .catch((e) => {
                    if (
                      ((e = e instanceof Error ? e : new Error(String(e))), c)
                    )
                      return new Promise((t, o) => {
                        c(
                          e,
                          () => t((d++, (u = null), p())),
                          () => o(e),
                          d + 1
                        );
                      });
                    throw e;
                  })
                  .then((t) =>
                    e !== u && u
                      ? u
                      : (t &&
                          (t.__esModule ||
                            "Module" === t[Symbol.toStringTag]) &&
                          (t = t.default),
                        (l = t),
                        t)
                  ))
            );
          };
          return Rn({
            name: "AsyncComponentWrapper",
            __asyncLoader: p,
            __asyncHydrate(e, t, o) {
              let n = !1;
              const r = a
                ? () => {
                    const r = a(
                      () => {
                        o();
                      },
                      (t) =>
                        (function (e, t) {
                          if (Dn(e) && "[" === e.data) {
                            let o = 1,
                              n = e.nextSibling;
                            for (; n; ) {
                              if (1 === n.nodeType) {
                                if (!1 === t(n)) break;
                              } else if (Dn(n))
                                if ("]" === n.data) {
                                  if (0 === --o) break;
                                } else "[" === n.data && o++;
                              n = n.nextSibling;
                            }
                          } else t(e);
                        })(e, t)
                    );
                    r && (t.bum || (t.bum = [])).push(r),
                      (t.u || (t.u = [])).push(() => (n = !0));
                  }
                : o;
              l ? r() : p().then(() => !t.isUnmounted && r());
            },
            get __asyncResolved() {
              return l;
            },
            setup() {
              const e = ni;
              if ((jn(e), l)) return () => tr(l, e);
              const t = (t) => {
                (u = null), Oo(t, e, 13, !n);
              };
              if ((i && e.suspense) || pi)
                return p()
                  .then((t) => () => tr(t, e))
                  .catch((e) => (t(e), () => (n ? zs(n, { error: e }) : null)));
              const a = Yt(!1),
                c = Yt(),
                d = Yt(!!r);
              return (
                r &&
                  setTimeout(() => {
                    d.value = !1;
                  }, r),
                null != s &&
                  setTimeout(() => {
                    if (!a.value && !c.value) {
                      const e = new Error(
                        `Async component timed out after ${s}ms.`
                      );
                      t(e), (c.value = e);
                    }
                  }, s),
                p()
                  .then(() => {
                    (a.value = !0),
                      e.parent && or(e.parent.vnode) && e.parent.update();
                  })
                  .catch((e) => {
                    t(e), (c.value = e);
                  }),
                () =>
                  a.value && l
                    ? tr(l, e)
                    : c.value && n
                    ? zs(n, { error: c.value })
                    : o && !d.value
                    ? zs(o)
                    : void 0
              );
            },
          });
        }
        function tr(e, t) {
          const { ref: o, props: n, children: r, ce: a } = t.vnode,
            s = zs(e, n, r);
          return (s.ref = o), (s.ce = a), delete t.vnode.ce, s;
        }
        const or = (e) => e.type.__isKeepAlive,
          nr = {
            name: "KeepAlive",
            __isKeepAlive: !0,
            props: {
              include: [String, RegExp, Array],
              exclude: [String, RegExp, Array],
              max: [String, Number],
            },
            setup(e, { slots: t }) {
              const o = ri(),
                n = o.ctx;
              if (!n.renderer)
                return () => {
                  const e = t.default && t.default();
                  return e && 1 === e.length ? e[0] : e;
                };
              const r = new Map(),
                a = new Set();
              let s = null;
              const i = o.suspense,
                {
                  renderer: {
                    p: c,
                    m: l,
                    um: u,
                    o: { createElement: d },
                  },
                } = n,
                p = d("div");
              function h(e) {
                ur(e), u(e, o, i, !0);
              }
              function f(e) {
                r.forEach((t, o) => {
                  const n = wi(t.type);
                  n && !e(n) && m(o);
                });
              }
              function m(e) {
                const t = r.get(e);
                !t || (s && Us(t, s)) ? s && ur(s) : h(t),
                  r.delete(e),
                  a.delete(e);
              }
              (n.activate = (e, t, o, n, r) => {
                const a = e.component;
                l(e, t, o, 0, i),
                  c(a.vnode, e, t, o, a, i, n, e.slotScopeIds, r),
                  Da(() => {
                    (a.isDeactivated = !1), a.a && q(a.a);
                    const t = e.props && e.props.onVnodeMounted;
                    t && Qs(t, a.parent, e);
                  }, i);
              }),
                (n.deactivate = (e) => {
                  const t = e.component;
                  Ya(t.m),
                    Ya(t.a),
                    l(e, p, null, 1, i),
                    Da(() => {
                      t.da && q(t.da);
                      const o = e.props && e.props.onVnodeUnmounted;
                      o && Qs(o, t.parent, e), (t.isDeactivated = !0);
                    }, i);
                }),
                Qa(
                  () => [e.include, e.exclude],
                  ([e, t]) => {
                    e && f((t) => ar(e, t)), t && f((e) => !ar(t, e));
                  },
                  { flush: "post", deep: !0 }
                );
              let g = null;
              const b = () => {
                null != g &&
                  (fs(o.subTree.type)
                    ? Da(() => {
                        r.set(g, dr(o.subTree));
                      }, o.subTree.suspense)
                    : r.set(g, dr(o.subTree)));
              };
              return (
                mr(b),
                br(b),
                vr(() => {
                  r.forEach((e) => {
                    const { subTree: t, suspense: n } = o,
                      r = dr(t);
                    if (e.type === r.type && e.key === r.key) {
                      ur(r);
                      const e = r.component.da;
                      return void (e && Da(e, n));
                    }
                    h(e);
                  });
                }),
                () => {
                  if (((g = null), !t.default)) return (s = null);
                  const o = t.default(),
                    n = o[0];
                  if (o.length > 1) return (s = null), o;
                  if (!(Ms(n) && (4 & n.shapeFlag || 128 & n.shapeFlag)))
                    return (s = null), n;
                  let i = dr(n);
                  if (i.type === Es) return (s = null), i;
                  const c = i.type,
                    l = wi(Qn(i) ? i.type.__asyncResolved || {} : c),
                    { include: u, exclude: d, max: p } = e;
                  if ((u && (!l || !ar(u, l))) || (d && l && ar(d, l)))
                    return (i.shapeFlag &= -257), (s = i), n;
                  const h = null == i.key ? c : i.key,
                    f = r.get(h);
                  return (
                    i.el &&
                      ((i = Hs(i)), 128 & n.shapeFlag && (n.ssContent = i)),
                    (g = h),
                    f
                      ? ((i.el = f.el),
                        (i.component = f.component),
                        i.transition && An(i, i.transition),
                        (i.shapeFlag |= 512),
                        a.delete(h),
                        a.add(h))
                      : (a.add(h),
                        p &&
                          a.size > parseInt(p, 10) &&
                          m(a.values().next().value)),
                    (i.shapeFlag |= 256),
                    (s = i),
                    fs(n.type) ? n : i
                  );
                }
              );
            },
          },
          rr = nr;
        function ar(e, t) {
          return g(e)
            ? e.some((e) => ar(e, t))
            : x(e)
            ? e.split(",").includes(t)
            : "[object RegExp]" === T(e) && ((e.lastIndex = 0), e.test(t));
        }
        function sr(e, t) {
          cr(e, "a", t);
        }
        function ir(e, t) {
          cr(e, "da", t);
        }
        function cr(e, t, o = ni) {
          const n =
            e.__wdc ||
            (e.__wdc = () => {
              let t = o;
              for (; t; ) {
                if (t.isDeactivated) return;
                t = t.parent;
              }
              return e();
            });
          if ((pr(t, n, o), o)) {
            let e = o.parent;
            for (; e && e.parent; )
              or(e.parent.vnode) && lr(n, t, o, e), (e = e.parent);
          }
        }
        function lr(e, t, o, n) {
          const r = pr(t, e, n, !0);
          yr(() => {
            h(n[t], r);
          }, o);
        }
        function ur(e) {
          (e.shapeFlag &= -257), (e.shapeFlag &= -513);
        }
        function dr(e) {
          return 128 & e.shapeFlag ? e.ssContent : e;
        }
        function pr(e, t, o = ni, n = !1) {
          if (o) {
            const r = o[e] || (o[e] = []),
              a =
                t.__weh ||
                (t.__weh = (...n) => {
                  ze();
                  const r = ii(o),
                    a = Ao(t, o, e, n);
                  return r(), $e(), a;
                });
            return n ? r.unshift(a) : r.push(a), a;
          }
        }
        const hr =
            (e) =>
            (t, o = ni) => {
              (pi && "sp" !== e) || pr(e, (...e) => t(...e), o);
            },
          fr = hr("bm"),
          mr = hr("m"),
          gr = hr("bu"),
          br = hr("u"),
          vr = hr("bum"),
          yr = hr("um"),
          _r = hr("sp"),
          xr = hr("rtg"),
          Sr = hr("rtc");
        function wr(e, t = ni) {
          pr("ec", e, t);
        }
        const Er = "components",
          Cr = "directives";
        function Tr(e, t) {
          return Rr(Er, e, !0, t) || e;
        }
        const kr = Symbol.for("v-ndc");
        function Ar(e) {
          return x(e) ? Rr(Er, e, !1) || e : e || kr;
        }
        function Or(e) {
          return Rr(Cr, e);
        }
        function Rr(e, t, o = !0, n = !1) {
          const r = Ko || ni;
          if (r) {
            const o = r.type;
            if (e === Er) {
              const e = wi(o, !1);
              if (e && (e === t || e === P(t) || e === U(P(t)))) return o;
            }
            const a = Nr(r[e] || o[e], t) || Nr(r.appContext[e], t);
            return !a && n ? o : a;
          }
        }
        function Nr(e, t) {
          return e && (e[t] || e[P(t)] || e[U(P(t))]);
        }
        function jr(e, t, o, n) {
          let r;
          const a = o && o[n],
            s = g(e);
          if (s || x(e)) {
            let o = !1,
              n = !1;
            s && Dt(e) && ((o = !qt(e)), (n = Bt(e)), (e = ot(e))),
              (r = new Array(e.length));
            for (let s = 0, i = e.length; s < i; s++)
              r[s] = t(
                o ? (n ? Ht(Vt(e[s])) : Vt(e[s])) : e[s],
                s,
                void 0,
                a && a[s]
              );
          } else if ("number" == typeof e) {
            0, (r = new Array(e));
            for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, a && a[o]);
          } else if (w(e))
            if (e[Symbol.iterator])
              r = Array.from(e, (e, o) => t(e, o, void 0, a && a[o]));
            else {
              const o = Object.keys(e);
              r = new Array(o.length);
              for (let n = 0, s = o.length; n < s; n++) {
                const s = o[n];
                r[n] = t(e[s], s, n, a && a[n]);
              }
            }
          else r = [];
          return o && (o[n] = r), r;
        }
        function Ir(e, t) {
          for (let o = 0; o < t.length; o++) {
            const n = t[o];
            if (g(n)) for (let t = 0; t < n.length; t++) e[n[t].name] = n[t].fn;
            else
              n &&
                (e[n.name] = n.key
                  ? (...e) => {
                      const t = n.fn(...e);
                      return t && (t.key = n.key), t;
                    }
                  : n.fn);
          }
          return e;
        }
        function Pr(e, t, o = {}, n, r) {
          if (Ko.ce || (Ko.parent && Qn(Ko.parent) && Ko.parent.ce))
            return (
              "default" !== t && (o.name = t),
              As(),
              Ls(Ss, null, [zs("slot", o, n && n())], 64)
            );
          let a = e[t];
          a && a._c && (a._d = !1), As();
          const s = a && Lr(a(o)),
            i = o.key || (s && s.key),
            c = Ls(
              Ss,
              { key: (i && !S(i) ? i : `_${t}`) + (!s && n ? "_fb" : "") },
              s || (n ? n() : []),
              s && 1 === e._ ? 64 : -2
            );
          return (
            !r && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]),
            a && a._c && (a._d = !0),
            c
          );
        }
        function Lr(e) {
          return e.some(
            (e) =>
              !Ms(e) || (e.type !== Es && !(e.type === Ss && !Lr(e.children)))
          )
            ? e
            : null;
        }
        function Mr(e, t) {
          const o = {};
          for (const n in e) o[t && /[A-Z]/.test(n) ? `on:${n}` : D(n)] = e[n];
          return o;
        }
        const Ur = (e) => (e ? (li(e) ? _i(e) : Ur(e.parent)) : null),
          Dr = p(Object.create(null), {
            $: (e) => e,
            $el: (e) => e.vnode.el,
            $data: (e) => e.data,
            $props: (e) => e.props,
            $attrs: (e) => e.attrs,
            $slots: (e) => e.slots,
            $refs: (e) => e.refs,
            $parent: (e) => Ur(e.parent),
            $root: (e) => Ur(e.root),
            $host: (e) => e.ce,
            $emit: (e) => e.emit,
            $options: (e) => ia(e),
            $forceUpdate: (e) =>
              e.f ||
              (e.f = () => {
                Do(e.update);
              }),
            $nextTick: (e) => e.n || (e.n = Uo.bind(e.proxy)),
            $watch: (e) => ts.bind(e),
          }),
          Br = (e, t) => e !== s && !e.__isScriptSetup && m(e, t),
          qr = {
            get({ _: e }, t) {
              if ("__v_skip" === t) return !0;
              const {
                ctx: o,
                setupState: n,
                data: r,
                props: a,
                accessCache: i,
                type: c,
                appContext: l,
              } = e;
              let u;
              if ("$" !== t[0]) {
                const c = i[t];
                if (void 0 !== c)
                  switch (c) {
                    case 1:
                      return n[t];
                    case 2:
                      return r[t];
                    case 4:
                      return o[t];
                    case 3:
                      return a[t];
                  }
                else {
                  if (Br(n, t)) return (i[t] = 1), n[t];
                  if (r !== s && m(r, t)) return (i[t] = 2), r[t];
                  if ((u = e.propsOptions[0]) && m(u, t))
                    return (i[t] = 3), a[t];
                  if (o !== s && m(o, t)) return (i[t] = 4), o[t];
                  na && (i[t] = 0);
                }
              }
              const d = Dr[t];
              let p, h;
              return d
                ? ("$attrs" === t && Qe(e.attrs, 0, ""), d(e))
                : (p = c.__cssModules) && (p = p[t])
                ? p
                : o !== s && m(o, t)
                ? ((i[t] = 4), o[t])
                : ((h = l.config.globalProperties), m(h, t) ? h[t] : void 0);
            },
            set({ _: e }, t, o) {
              const { data: n, setupState: r, ctx: a } = e;
              return Br(r, t)
                ? ((r[t] = o), !0)
                : n !== s && m(n, t)
                ? ((n[t] = o), !0)
                : !m(e.props, t) &&
                  ("$" !== t[0] || !(t.slice(1) in e)) &&
                  ((a[t] = o), !0);
            },
            has(
              {
                _: {
                  data: e,
                  setupState: t,
                  accessCache: o,
                  ctx: n,
                  appContext: r,
                  propsOptions: a,
                },
              },
              i
            ) {
              let c;
              return (
                !!o[i] ||
                (e !== s && m(e, i)) ||
                Br(t, i) ||
                ((c = a[0]) && m(c, i)) ||
                m(n, i) ||
                m(Dr, i) ||
                m(r.config.globalProperties, i)
              );
            },
            defineProperty(e, t, o) {
              return (
                null != o.get
                  ? (e._.accessCache[t] = 0)
                  : m(o, "value") && this.set(e, t, o.value, null),
                Reflect.defineProperty(e, t, o)
              );
            },
          };
        const Fr = p({}, qr, {
          get(e, t) {
            if (t !== Symbol.unscopables) return qr.get(e, t, e);
          },
          has: (e, t) => "_" !== t[0] && !W(t),
        });
        function zr() {
          return null;
        }
        function $r() {
          return null;
        }
        function Vr(e) {
          0;
        }
        function Hr(e) {
          0;
        }
        function Wr() {
          return null;
        }
        function Yr() {
          0;
        }
        function Kr(e, t) {
          return null;
        }
        function Gr() {
          return Xr().slots;
        }
        function Jr() {
          return Xr().attrs;
        }
        function Xr() {
          const e = ri();
          return e.setupContext || (e.setupContext = yi(e));
        }
        function Zr(e) {
          return g(e) ? e.reduce((e, t) => ((e[t] = null), e), {}) : e;
        }
        function Qr(e, t) {
          const o = Zr(e);
          for (const e in t) {
            if (e.startsWith("__skip")) continue;
            let n = o[e];
            n
              ? g(n) || _(n)
                ? (n = o[e] = { type: n, default: t[e] })
                : (n.default = t[e])
              : null === n && (n = o[e] = { default: t[e] }),
              n && t[`__skip_${e}`] && (n.skipFactory = !0);
          }
          return o;
        }
        function ea(e, t) {
          return e && t
            ? g(e) && g(t)
              ? e.concat(t)
              : p({}, Zr(e), Zr(t))
            : e || t;
        }
        function ta(e, t) {
          const o = {};
          for (const n in e)
            t.includes(n) ||
              Object.defineProperty(o, n, { enumerable: !0, get: () => e[n] });
          return o;
        }
        function oa(e) {
          const t = ri();
          let o = e();
          return (
            ci(),
            E(o) &&
              (o = o.catch((e) => {
                throw (ii(t), e);
              })),
            [o, () => ii(t)]
          );
        }
        let na = !0;
        function ra(e) {
          const t = ia(e),
            o = e.proxy,
            n = e.ctx;
          (na = !1), t.beforeCreate && aa(t.beforeCreate, e, "bc");
          const {
            data: r,
            computed: a,
            methods: s,
            watch: i,
            provide: l,
            inject: u,
            created: d,
            beforeMount: p,
            mounted: h,
            beforeUpdate: f,
            updated: m,
            activated: b,
            deactivated: v,
            beforeDestroy: y,
            beforeUnmount: x,
            destroyed: S,
            unmounted: E,
            render: C,
            renderTracked: T,
            renderTriggered: k,
            errorCaptured: A,
            serverPrefetch: O,
            expose: R,
            inheritAttrs: N,
            components: j,
            directives: I,
            filters: P,
          } = t;
          if (
            (u &&
              (function (e, t) {
                g(e) && (e = da(e));
                for (const o in e) {
                  const n = e[o];
                  let r;
                  (r = w(n)
                    ? "default" in n
                      ? _a(n.from || o, n.default, !0)
                      : _a(n.from || o)
                    : _a(n)),
                    Wt(r)
                      ? Object.defineProperty(t, o, {
                          enumerable: !0,
                          configurable: !0,
                          get: () => r.value,
                          set: (e) => (r.value = e),
                        })
                      : (t[o] = r);
                }
              })(u, n, null),
            s)
          )
            for (const e in s) {
              const t = s[e];
              _(t) && (n[e] = t.bind(o));
            }
          if (r) {
            0;
            const t = r.call(o, o);
            0, w(t) && (e.data = It(t));
          }
          if (((na = !0), a))
            for (const e in a) {
              const t = a[e],
                r = _(t) ? t.bind(o, o) : _(t.get) ? t.get.bind(o, o) : c;
              0;
              const s = !_(t) && _(t.set) ? t.set.bind(o) : c,
                i = Ti({ get: r, set: s });
              Object.defineProperty(n, e, {
                enumerable: !0,
                configurable: !0,
                get: () => i.value,
                set: (e) => (i.value = e),
              });
            }
          if (i) for (const e in i) sa(i[e], n, o, e);
          if (l) {
            const e = _(l) ? l.call(o) : l;
            Reflect.ownKeys(e).forEach((t) => {
              ya(t, e[t]);
            });
          }
          function L(e, t) {
            g(t) ? t.forEach((t) => e(t.bind(o))) : t && e(t.bind(o));
          }
          if (
            (d && aa(d, e, "c"),
            L(fr, p),
            L(mr, h),
            L(gr, f),
            L(br, m),
            L(sr, b),
            L(ir, v),
            L(wr, A),
            L(Sr, T),
            L(xr, k),
            L(vr, x),
            L(yr, E),
            L(_r, O),
            g(R))
          )
            if (R.length) {
              const t = e.exposed || (e.exposed = {});
              R.forEach((e) => {
                Object.defineProperty(t, e, {
                  get: () => o[e],
                  set: (t) => (o[e] = t),
                });
              });
            } else e.exposed || (e.exposed = {});
          C && e.render === c && (e.render = C),
            null != N && (e.inheritAttrs = N),
            j && (e.components = j),
            I && (e.directives = I),
            O && jn(e);
        }
        function aa(e, t, o) {
          Ao(g(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, o);
        }
        function sa(e, t, o, n) {
          let r = n.includes(".") ? os(o, n) : () => o[n];
          if (x(e)) {
            const o = t[e];
            _(o) && Qa(r, o);
          } else if (_(e)) Qa(r, e.bind(o));
          else if (w(e))
            if (g(e)) e.forEach((e) => sa(e, t, o, n));
            else {
              const n = _(e.handler) ? e.handler.bind(o) : t[e.handler];
              _(n) && Qa(r, n, e);
            }
          else 0;
        }
        function ia(e) {
          const t = e.type,
            { mixins: o, extends: n } = t,
            {
              mixins: r,
              optionsCache: a,
              config: { optionMergeStrategies: s },
            } = e.appContext,
            i = a.get(t);
          let c;
          return (
            i
              ? (c = i)
              : r.length || o || n
              ? ((c = {}),
                r.length && r.forEach((e) => ca(c, e, s, !0)),
                ca(c, t, s))
              : (c = t),
            w(t) && a.set(t, c),
            c
          );
        }
        function ca(e, t, o, n = !1) {
          const { mixins: r, extends: a } = t;
          a && ca(e, a, o, !0), r && r.forEach((t) => ca(e, t, o, !0));
          for (const r in t)
            if (n && "expose" === r);
            else {
              const n = la[r] || (o && o[r]);
              e[r] = n ? n(e[r], t[r]) : t[r];
            }
          return e;
        }
        const la = {
          data: ua,
          props: fa,
          emits: fa,
          methods: ha,
          computed: ha,
          beforeCreate: pa,
          created: pa,
          beforeMount: pa,
          mounted: pa,
          beforeUpdate: pa,
          updated: pa,
          beforeDestroy: pa,
          beforeUnmount: pa,
          destroyed: pa,
          unmounted: pa,
          activated: pa,
          deactivated: pa,
          errorCaptured: pa,
          serverPrefetch: pa,
          components: ha,
          directives: ha,
          watch: function (e, t) {
            if (!e) return t;
            if (!t) return e;
            const o = p(Object.create(null), e);
            for (const n in t) o[n] = pa(e[n], t[n]);
            return o;
          },
          provide: ua,
          inject: function (e, t) {
            return ha(da(e), da(t));
          },
        };
        function ua(e, t) {
          return t
            ? e
              ? function () {
                  return p(
                    _(e) ? e.call(this, this) : e,
                    _(t) ? t.call(this, this) : t
                  );
                }
              : t
            : e;
        }
        function da(e) {
          if (g(e)) {
            const t = {};
            for (let o = 0; o < e.length; o++) t[e[o]] = e[o];
            return t;
          }
          return e;
        }
        function pa(e, t) {
          return e ? [...new Set([].concat(e, t))] : t;
        }
        function ha(e, t) {
          return e ? p(Object.create(null), e, t) : t;
        }
        function fa(e, t) {
          return e
            ? g(e) && g(t)
              ? [...new Set([...e, ...t])]
              : p(Object.create(null), Zr(e), Zr(null != t ? t : {}))
            : t;
        }
        function ma() {
          return {
            app: null,
            config: {
              isNativeTag: l,
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
        let ga = 0;
        function ba(e, t) {
          return function (o, n = null) {
            _(o) || (o = p({}, o)), null == n || w(n) || (n = null);
            const r = ma(),
              a = new WeakSet(),
              s = [];
            let i = !1;
            const c = (r.app = {
              _uid: ga++,
              _component: o,
              _props: n,
              _container: null,
              _context: r,
              _instance: null,
              version: Ni,
              get config() {
                return r.config;
              },
              set config(e) {
                0;
              },
              use: (e, ...t) => (
                a.has(e) ||
                  (e && _(e.install)
                    ? (a.add(e), e.install(c, ...t))
                    : _(e) && (a.add(e), e(c, ...t))),
                c
              ),
              mixin: (e) => (r.mixins.includes(e) || r.mixins.push(e), c),
              component: (e, t) =>
                t ? ((r.components[e] = t), c) : r.components[e],
              directive: (e, t) =>
                t ? ((r.directives[e] = t), c) : r.directives[e],
              mount(a, s, l) {
                if (!i) {
                  0;
                  const u = c._ceVNode || zs(o, n);
                  return (
                    (u.appContext = r),
                    !0 === l ? (l = "svg") : !1 === l && (l = void 0),
                    s && t ? t(u, a) : e(u, a, l),
                    (i = !0),
                    (c._container = a),
                    (a.__vue_app__ = c),
                    _i(u.component)
                  );
                }
              },
              onUnmount(e) {
                s.push(e);
              },
              unmount() {
                i &&
                  (Ao(s, c._instance, 16),
                  e(null, c._container),
                  delete c._container.__vue_app__);
              },
              provide: (e, t) => ((r.provides[e] = t), c),
              runWithContext(e) {
                const t = va;
                va = c;
                try {
                  return e();
                } finally {
                  va = t;
                }
              },
            });
            return c;
          };
        }
        let va = null;
        function ya(e, t) {
          if (ni) {
            let o = ni.provides;
            const n = ni.parent && ni.parent.provides;
            n === o && (o = ni.provides = Object.create(n)), (o[e] = t);
          } else 0;
        }
        function _a(e, t, o = !1) {
          const n = ni || Ko;
          if (n || va) {
            let r = va
              ? va._context.provides
              : n
              ? null == n.parent || n.ce
                ? n.vnode.appContext && n.vnode.appContext.provides
                : n.parent.provides
              : void 0;
            if (r && e in r) return r[e];
            if (arguments.length > 1)
              return o && _(t) ? t.call(n && n.proxy) : t;
          } else 0;
        }
        function xa() {
          return !!(ni || Ko || va);
        }
        const Sa = {},
          wa = () => Object.create(Sa),
          Ea = (e) => Object.getPrototypeOf(e) === Sa;
        function Ca(e, t, o, n) {
          const [r, a] = e.propsOptions;
          let i,
            c = !1;
          if (t)
            for (let s in t) {
              if (R(s)) continue;
              const l = t[s];
              let u;
              r && m(r, (u = P(s)))
                ? a && a.includes(u)
                  ? ((i || (i = {}))[u] = l)
                  : (o[u] = l)
                : is(e.emitsOptions, s) ||
                  (s in n && l === n[s]) ||
                  ((n[s] = l), (c = !0));
            }
          if (a) {
            const t = zt(o),
              n = i || s;
            for (let s = 0; s < a.length; s++) {
              const i = a[s];
              o[i] = Ta(r, t, i, n[i], e, !m(n, i));
            }
          }
          return c;
        }
        function Ta(e, t, o, n, r, a) {
          const s = e[o];
          if (null != s) {
            const e = m(s, "default");
            if (e && void 0 === n) {
              const e = s.default;
              if (s.type !== Function && !s.skipFactory && _(e)) {
                const { propsDefaults: a } = r;
                if (o in a) n = a[o];
                else {
                  const s = ii(r);
                  (n = a[o] = e.call(null, t)), s();
                }
              } else n = e;
              r.ce && r.ce._setProp(o, n);
            }
            s[0] &&
              (a && !e
                ? (n = !1)
                : !s[1] || ("" !== n && n !== M(o)) || (n = !0));
          }
          return n;
        }
        const ka = new WeakMap();
        function Aa(e, t, o = !1) {
          const n = o ? ka : t.propsCache,
            r = n.get(e);
          if (r) return r;
          const a = e.props,
            c = {},
            l = [];
          let u = !1;
          if (!_(e)) {
            const n = (e) => {
              u = !0;
              const [o, n] = Aa(e, t, !0);
              p(c, o), n && l.push(...n);
            };
            !o && t.mixins.length && t.mixins.forEach(n),
              e.extends && n(e.extends),
              e.mixins && e.mixins.forEach(n);
          }
          if (!a && !u) return w(e) && n.set(e, i), i;
          if (g(a))
            for (let e = 0; e < a.length; e++) {
              0;
              const t = P(a[e]);
              Oa(t) && (c[t] = s);
            }
          else if (a) {
            0;
            for (const e in a) {
              const t = P(e);
              if (Oa(t)) {
                const o = a[e],
                  n = (c[t] = g(o) || _(o) ? { type: o } : p({}, o)),
                  r = n.type;
                let s = !1,
                  i = !0;
                if (g(r))
                  for (let e = 0; e < r.length; ++e) {
                    const t = r[e],
                      o = _(t) && t.name;
                    if ("Boolean" === o) {
                      s = !0;
                      break;
                    }
                    "String" === o && (i = !1);
                  }
                else s = _(r) && "Boolean" === r.name;
                (n[0] = s), (n[1] = i), (s || m(n, "default")) && l.push(t);
              }
            }
          }
          const d = [c, l];
          return w(e) && n.set(e, d), d;
        }
        function Oa(e) {
          return "$" !== e[0] && !R(e);
        }
        const Ra = (e) => "_" === e[0] || "$stable" === e,
          Na = (e) => (g(e) ? e.map(Gs) : [Gs(e)]),
          ja = (e, t, o) => {
            if (t._n) return t;
            const n = en((...e) => Na(t(...e)), o);
            return (n._c = !1), n;
          },
          Ia = (e, t, o) => {
            const n = e._ctx;
            for (const o in e) {
              if (Ra(o)) continue;
              const r = e[o];
              if (_(r)) t[o] = ja(0, r, n);
              else if (null != r) {
                0;
                const e = Na(r);
                t[o] = () => e;
              }
            }
          },
          Pa = (e, t) => {
            const o = Na(t);
            e.slots.default = () => o;
          },
          La = (e, t, o) => {
            for (const n in t) (!o && Ra(n)) || (e[n] = t[n]);
          },
          Ma = (e, t, o) => {
            const n = (e.slots = wa());
            if (32 & e.vnode.shapeFlag) {
              const e = t.__;
              e && F(n, "__", e, !0);
              const r = t._;
              r ? (La(n, t, o), o && F(n, "_", r, !0)) : Ia(t, n);
            } else t && Pa(e, t);
          },
          Ua = (e, t, o) => {
            const { vnode: n, slots: r } = e;
            let a = !0,
              i = s;
            if (32 & n.shapeFlag) {
              const e = t._;
              e
                ? o && 1 === e
                  ? (a = !1)
                  : La(r, t, o)
                : ((a = !t.$stable), Ia(t, r)),
                (i = t);
            } else t && (Pa(e, t), (i = { default: 1 }));
            if (a) for (const e in r) Ra(e) || null != i[e] || delete r[e];
          };
        const Da = _s;
        function Ba(e) {
          return Fa(e);
        }
        function qa(e) {
          return Fa(e, Bn);
        }
        function Fa(e, t) {
          "boolean" != typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
            (H().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
          H().__VUE__ = !0;
          const {
              insert: o,
              remove: n,
              patchProp: r,
              createElement: a,
              createText: l,
              createComment: u,
              setText: d,
              setElementText: p,
              parentNode: h,
              nextSibling: f,
              setScopeId: b = c,
              insertStaticContent: v,
            } = e,
            y = (
              e,
              t,
              o,
              n = null,
              r = null,
              a = null,
              s = void 0,
              i = null,
              c = !!t.dynamicChildren
            ) => {
              if (e === t) return;
              e && !Us(e, t) && ((n = X(e)), W(e, r, a, !0), (e = null)),
                -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null));
              const { type: l, ref: u, shapeFlag: d } = t;
              switch (l) {
                case ws:
                  _(e, t, o, n);
                  break;
                case Es:
                  x(e, t, o, n);
                  break;
                case Cs:
                  null == e && S(t, o, n, s);
                  break;
                case Ss:
                  j(e, t, o, n, r, a, s, i, c);
                  break;
                default:
                  1 & d
                    ? E(e, t, o, n, r, a, s, i, c)
                    : 6 & d
                    ? I(e, t, o, n, r, a, s, i, c)
                    : (64 & d || 128 & d) &&
                      l.process(e, t, o, n, r, a, s, i, c, ee);
              }
              null != u && r
                ? Pn(u, e && e.ref, a, t || e, !t)
                : null == u && e && null != e.ref && Pn(e.ref, null, a, e, !0);
            },
            _ = (e, t, n, r) => {
              if (null == e) o((t.el = l(t.children)), n, r);
              else {
                const o = (t.el = e.el);
                t.children !== e.children && d(o, t.children);
              }
            },
            x = (e, t, n, r) => {
              null == e ? o((t.el = u(t.children || "")), n, r) : (t.el = e.el);
            },
            S = (e, t, o, n) => {
              [e.el, e.anchor] = v(e.children, t, o, n, e.el, e.anchor);
            },
            w = ({ el: e, anchor: t }) => {
              let o;
              for (; e && e !== t; ) (o = f(e)), n(e), (e = o);
              n(t);
            },
            E = (e, t, o, n, r, a, s, i, c) => {
              "svg" === t.type
                ? (s = "svg")
                : "math" === t.type && (s = "mathml"),
                null == e ? C(t, o, n, r, a, s, i, c) : A(e, t, r, a, s, i, c);
            },
            C = (e, t, n, s, i, c, l, u) => {
              let d, h;
              const { props: f, shapeFlag: m, transition: g, dirs: b } = e;
              if (
                ((d = e.el = a(e.type, c, f && f.is, f)),
                8 & m
                  ? p(d, e.children)
                  : 16 & m && k(e.children, d, null, s, i, za(e, c), l, u),
                b && on(e, null, s, "created"),
                T(d, e, e.scopeId, l, s),
                f)
              ) {
                for (const e in f)
                  "value" === e || R(e) || r(d, e, null, f[e], c, s);
                "value" in f && r(d, "value", null, f.value, c),
                  (h = f.onVnodeBeforeMount) && Qs(h, s, e);
              }
              b && on(e, null, s, "beforeMount");
              const v = Va(i, g);
              v && g.beforeEnter(d),
                o(d, t, n),
                ((h = f && f.onVnodeMounted) || v || b) &&
                  Da(() => {
                    h && Qs(h, s, e),
                      v && g.enter(d),
                      b && on(e, null, s, "mounted");
                  }, i);
            },
            T = (e, t, o, n, r) => {
              if ((o && b(e, o), n))
                for (let t = 0; t < n.length; t++) b(e, n[t]);
              if (r) {
                let o = r.subTree;
                if (
                  t === o ||
                  (fs(o.type) && (o.ssContent === t || o.ssFallback === t))
                ) {
                  const t = r.vnode;
                  T(e, t, t.scopeId, t.slotScopeIds, r.parent);
                }
              }
            },
            k = (e, t, o, n, r, a, s, i, c = 0) => {
              for (let l = c; l < e.length; l++) {
                const c = (e[l] = i ? Js(e[l]) : Gs(e[l]));
                y(null, c, t, o, n, r, a, s, i);
              }
            },
            A = (e, t, o, n, a, i, c) => {
              const l = (t.el = e.el);
              let { patchFlag: u, dynamicChildren: d, dirs: h } = t;
              u |= 16 & e.patchFlag;
              const f = e.props || s,
                m = t.props || s;
              let g;
              if (
                (o && $a(o, !1),
                (g = m.onVnodeBeforeUpdate) && Qs(g, o, t, e),
                h && on(t, e, o, "beforeUpdate"),
                o && $a(o, !0),
                ((f.innerHTML && null == m.innerHTML) ||
                  (f.textContent && null == m.textContent)) &&
                  p(l, ""),
                d
                  ? O(e.dynamicChildren, d, l, o, n, za(t, a), i)
                  : c || F(e, t, l, null, o, n, za(t, a), i, !1),
                u > 0)
              ) {
                if (16 & u) N(l, f, m, o, a);
                else if (
                  (2 & u &&
                    f.class !== m.class &&
                    r(l, "class", null, m.class, a),
                  4 & u && r(l, "style", f.style, m.style, a),
                  8 & u)
                ) {
                  const e = t.dynamicProps;
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t],
                      s = f[n],
                      i = m[n];
                    (i === s && "value" !== n) || r(l, n, s, i, a, o);
                  }
                }
                1 & u && e.children !== t.children && p(l, t.children);
              } else c || null != d || N(l, f, m, o, a);
              ((g = m.onVnodeUpdated) || h) &&
                Da(() => {
                  g && Qs(g, o, t, e), h && on(t, e, o, "updated");
                }, n);
            },
            O = (e, t, o, n, r, a, s) => {
              for (let i = 0; i < t.length; i++) {
                const c = e[i],
                  l = t[i],
                  u =
                    c.el && (c.type === Ss || !Us(c, l) || 198 & c.shapeFlag)
                      ? h(c.el)
                      : o;
                y(c, l, u, null, n, r, a, s, !0);
              }
            },
            N = (e, t, o, n, a) => {
              if (t !== o) {
                if (t !== s)
                  for (const s in t)
                    R(s) || s in o || r(e, s, t[s], null, a, n);
                for (const s in o) {
                  if (R(s)) continue;
                  const i = o[s],
                    c = t[s];
                  i !== c && "value" !== s && r(e, s, c, i, a, n);
                }
                "value" in o && r(e, "value", t.value, o.value, a);
              }
            },
            j = (e, t, n, r, a, s, i, c, u) => {
              const d = (t.el = e ? e.el : l("")),
                p = (t.anchor = e ? e.anchor : l(""));
              let { patchFlag: h, dynamicChildren: f, slotScopeIds: m } = t;
              m && (c = c ? c.concat(m) : m),
                null == e
                  ? (o(d, n, r),
                    o(p, n, r),
                    k(t.children || [], n, p, a, s, i, c, u))
                  : h > 0 && 64 & h && f && e.dynamicChildren
                  ? (O(e.dynamicChildren, f, n, a, s, i, c),
                    (null != t.key || (a && t === a.subTree)) && Ha(e, t, !0))
                  : F(e, t, n, p, a, s, i, c, u);
            },
            I = (e, t, o, n, r, a, s, i, c) => {
              (t.slotScopeIds = i),
                null == e
                  ? 512 & t.shapeFlag
                    ? r.ctx.activate(t, o, n, s, c)
                    : L(t, o, n, r, a, s, c)
                  : U(e, t, c);
            },
            L = (e, t, o, n, r, a, s) => {
              const i = (e.component = oi(e, n, r));
              if ((or(e) && (i.ctx.renderer = ee), hi(i, !1, s), i.asyncDep)) {
                if ((r && r.registerDep(i, D, s), !e.el)) {
                  const e = (i.subTree = zs(Es));
                  x(null, e, t, o);
                }
              } else D(i, e, t, o, r, a, s);
            },
            U = (e, t, o) => {
              const n = (t.component = e.component);
              if (
                (function (e, t, o) {
                  const { props: n, children: r, component: a } = e,
                    { props: s, children: i, patchFlag: c } = t,
                    l = a.emitsOptions;
                  0;
                  if (t.dirs || t.transition) return !0;
                  if (!(o && c >= 0))
                    return (
                      !((!r && !i) || (i && i.$stable)) ||
                      (n !== s && (n ? !s || ps(n, s, l) : !!s))
                    );
                  if (1024 & c) return !0;
                  if (16 & c) return n ? ps(n, s, l) : !!s;
                  if (8 & c) {
                    const e = t.dynamicProps;
                    for (let t = 0; t < e.length; t++) {
                      const o = e[t];
                      if (s[o] !== n[o] && !is(l, o)) return !0;
                    }
                  }
                  return !1;
                })(e, t, o)
              ) {
                if (n.asyncDep && !n.asyncResolved) return void B(n, t, o);
                (n.next = t), n.update();
              } else (t.el = e.el), (n.vnode = t);
            },
            D = (e, t, o, n, r, a, s) => {
              const i = () => {
                if (e.isMounted) {
                  let { next: t, bu: o, u: n, parent: c, vnode: l } = e;
                  {
                    const o = Wa(e);
                    if (o)
                      return (
                        t && ((t.el = l.el), B(e, t, s)),
                        void o.asyncDep.then(() => {
                          e.isUnmounted || i();
                        })
                      );
                  }
                  let u,
                    d = t;
                  0,
                    $a(e, !1),
                    t ? ((t.el = l.el), B(e, t, s)) : (t = l),
                    o && q(o),
                    (u = t.props && t.props.onVnodeBeforeUpdate) &&
                      Qs(u, c, t, l),
                    $a(e, !0);
                  const p = cs(e);
                  0;
                  const f = e.subTree;
                  (e.subTree = p),
                    y(f, p, h(f.el), X(f), e, r, a),
                    (t.el = p.el),
                    null === d && hs(e, p.el),
                    n && Da(n, r),
                    (u = t.props && t.props.onVnodeUpdated) &&
                      Da(() => Qs(u, c, t, l), r);
                } else {
                  let s;
                  const { el: i, props: c } = t,
                    { bm: l, m: u, parent: d, root: p, type: h } = e,
                    f = Qn(t);
                  if (
                    ($a(e, !1),
                    l && q(l),
                    !f && (s = c && c.onVnodeBeforeMount) && Qs(s, d, t),
                    $a(e, !0),
                    i && oe)
                  ) {
                    const t = () => {
                      (e.subTree = cs(e)), oe(i, e.subTree, e, r, null);
                    };
                    f && h.__asyncHydrate ? h.__asyncHydrate(i, e, t) : t();
                  } else {
                    p.ce &&
                      !1 !== p.ce._def.shadowRoot &&
                      p.ce._injectChildStyle(h);
                    const s = (e.subTree = cs(e));
                    0, y(null, s, o, n, e, r, a), (t.el = s.el);
                  }
                  if ((u && Da(u, r), !f && (s = c && c.onVnodeMounted))) {
                    const e = t;
                    Da(() => Qs(s, d, e), r);
                  }
                  (256 & t.shapeFlag ||
                    (d && Qn(d.vnode) && 256 & d.vnode.shapeFlag)) &&
                    e.a &&
                    Da(e.a, r),
                    (e.isMounted = !0),
                    (t = o = n = null);
                }
              };
              e.scope.on();
              const c = (e.effect = new Ce(i));
              e.scope.off();
              const l = (e.update = c.run.bind(c)),
                u = (e.job = c.runIfDirty.bind(c));
              (u.i = e),
                (u.id = e.uid),
                (c.scheduler = () => Do(u)),
                $a(e, !0),
                l();
            },
            B = (e, t, o) => {
              t.component = e;
              const n = e.vnode.props;
              (e.vnode = t),
                (e.next = null),
                (function (e, t, o, n) {
                  const {
                      props: r,
                      attrs: a,
                      vnode: { patchFlag: s },
                    } = e,
                    i = zt(r),
                    [c] = e.propsOptions;
                  let l = !1;
                  if (!(n || s > 0) || 16 & s) {
                    let n;
                    Ca(e, t, r, a) && (l = !0);
                    for (const a in i)
                      (t && (m(t, a) || ((n = M(a)) !== a && m(t, n)))) ||
                        (c
                          ? !o ||
                            (void 0 === o[a] && void 0 === o[n]) ||
                            (r[a] = Ta(c, i, a, void 0, e, !0))
                          : delete r[a]);
                    if (a !== i)
                      for (const e in a)
                        (t && m(t, e)) || (delete a[e], (l = !0));
                  } else if (8 & s) {
                    const o = e.vnode.dynamicProps;
                    for (let n = 0; n < o.length; n++) {
                      let s = o[n];
                      if (is(e.emitsOptions, s)) continue;
                      const u = t[s];
                      if (c)
                        if (m(a, s)) u !== a[s] && ((a[s] = u), (l = !0));
                        else {
                          const t = P(s);
                          r[t] = Ta(c, i, t, u, e, !1);
                        }
                      else u !== a[s] && ((a[s] = u), (l = !0));
                    }
                  }
                  l && et(e.attrs, "set", "");
                })(e, t.props, n, o),
                Ua(e, t.children, o),
                ze(),
                Fo(e),
                $e();
            },
            F = (e, t, o, n, r, a, s, i, c = !1) => {
              const l = e && e.children,
                u = e ? e.shapeFlag : 0,
                d = t.children,
                { patchFlag: h, shapeFlag: f } = t;
              if (h > 0) {
                if (128 & h) return void $(l, d, o, n, r, a, s, i, c);
                if (256 & h) return void z(l, d, o, n, r, a, s, i, c);
              }
              8 & f
                ? (16 & u && J(l, r, a), d !== l && p(o, d))
                : 16 & u
                ? 16 & f
                  ? $(l, d, o, n, r, a, s, i, c)
                  : J(l, r, a, !0)
                : (8 & u && p(o, ""), 16 & f && k(d, o, n, r, a, s, i, c));
            },
            z = (e, t, o, n, r, a, s, c, l) => {
              t = t || i;
              const u = (e = e || i).length,
                d = t.length,
                p = Math.min(u, d);
              let h;
              for (h = 0; h < p; h++) {
                const n = (t[h] = l ? Js(t[h]) : Gs(t[h]));
                y(e[h], n, o, null, r, a, s, c, l);
              }
              u > d ? J(e, r, a, !0, !1, p) : k(t, o, n, r, a, s, c, l, p);
            },
            $ = (e, t, o, n, r, a, s, c, l) => {
              let u = 0;
              const d = t.length;
              let p = e.length - 1,
                h = d - 1;
              for (; u <= p && u <= h; ) {
                const n = e[u],
                  i = (t[u] = l ? Js(t[u]) : Gs(t[u]));
                if (!Us(n, i)) break;
                y(n, i, o, null, r, a, s, c, l), u++;
              }
              for (; u <= p && u <= h; ) {
                const n = e[p],
                  i = (t[h] = l ? Js(t[h]) : Gs(t[h]));
                if (!Us(n, i)) break;
                y(n, i, o, null, r, a, s, c, l), p--, h--;
              }
              if (u > p) {
                if (u <= h) {
                  const e = h + 1,
                    i = e < d ? t[e].el : n;
                  for (; u <= h; )
                    y(
                      null,
                      (t[u] = l ? Js(t[u]) : Gs(t[u])),
                      o,
                      i,
                      r,
                      a,
                      s,
                      c,
                      l
                    ),
                      u++;
                }
              } else if (u > h) for (; u <= p; ) W(e[u], r, a, !0), u++;
              else {
                const f = u,
                  m = u,
                  g = new Map();
                for (u = m; u <= h; u++) {
                  const e = (t[u] = l ? Js(t[u]) : Gs(t[u]));
                  null != e.key && g.set(e.key, u);
                }
                let b,
                  v = 0;
                const _ = h - m + 1;
                let x = !1,
                  S = 0;
                const w = new Array(_);
                for (u = 0; u < _; u++) w[u] = 0;
                for (u = f; u <= p; u++) {
                  const n = e[u];
                  if (v >= _) {
                    W(n, r, a, !0);
                    continue;
                  }
                  let i;
                  if (null != n.key) i = g.get(n.key);
                  else
                    for (b = m; b <= h; b++)
                      if (0 === w[b - m] && Us(n, t[b])) {
                        i = b;
                        break;
                      }
                  void 0 === i
                    ? W(n, r, a, !0)
                    : ((w[i - m] = u + 1),
                      i >= S ? (S = i) : (x = !0),
                      y(n, t[i], o, null, r, a, s, c, l),
                      v++);
                }
                const E = x
                  ? (function (e) {
                      const t = e.slice(),
                        o = [0];
                      let n, r, a, s, i;
                      const c = e.length;
                      for (n = 0; n < c; n++) {
                        const c = e[n];
                        if (0 !== c) {
                          if (((r = o[o.length - 1]), e[r] < c)) {
                            (t[n] = r), o.push(n);
                            continue;
                          }
                          for (a = 0, s = o.length - 1; a < s; )
                            (i = (a + s) >> 1),
                              e[o[i]] < c ? (a = i + 1) : (s = i);
                          c < e[o[a]] &&
                            (a > 0 && (t[n] = o[a - 1]), (o[a] = n));
                        }
                      }
                      (a = o.length), (s = o[a - 1]);
                      for (; a-- > 0; ) (o[a] = s), (s = t[s]);
                      return o;
                    })(w)
                  : i;
                for (b = E.length - 1, u = _ - 1; u >= 0; u--) {
                  const e = m + u,
                    i = t[e],
                    p = e + 1 < d ? t[e + 1].el : n;
                  0 === w[u]
                    ? y(null, i, o, p, r, a, s, c, l)
                    : x && (b < 0 || u !== E[b] ? V(i, o, p, 2) : b--);
                }
              }
            },
            V = (e, t, r, a, s = null) => {
              const {
                el: i,
                type: c,
                transition: l,
                children: u,
                shapeFlag: d,
              } = e;
              if (6 & d) return void V(e.component.subTree, t, r, a);
              if (128 & d) return void e.suspense.move(t, r, a);
              if (64 & d) return void c.move(e, t, r, ee);
              if (c === Ss) {
                o(i, t, r);
                for (let e = 0; e < u.length; e++) V(u[e], t, r, a);
                return void o(e.anchor, t, r);
              }
              if (c === Cs)
                return void (({ el: e, anchor: t }, n, r) => {
                  let a;
                  for (; e && e !== t; ) (a = f(e)), o(e, n, r), (e = a);
                  o(t, n, r);
                })(e, t, r);
              if (2 !== a && 1 & d && l)
                if (0 === a)
                  l.beforeEnter(i), o(i, t, r), Da(() => l.enter(i), s);
                else {
                  const { leave: a, delayLeave: s, afterLeave: c } = l,
                    u = () => {
                      e.ctx.isUnmounted ? n(i) : o(i, t, r);
                    },
                    d = () => {
                      a(i, () => {
                        u(), c && c();
                      });
                    };
                  s ? s(i, u, d) : d();
                }
              else o(i, t, r);
            },
            W = (e, t, o, n = !1, r = !1) => {
              const {
                type: a,
                props: s,
                ref: i,
                children: c,
                dynamicChildren: l,
                shapeFlag: u,
                patchFlag: d,
                dirs: p,
                cacheIndex: h,
              } = e;
              if (
                (-2 === d && (r = !1),
                null != i && (ze(), Pn(i, null, o, e, !0), $e()),
                null != h && (t.renderCache[h] = void 0),
                256 & u)
              )
                return void t.ctx.deactivate(e);
              const f = 1 & u && p,
                m = !Qn(e);
              let g;
              if (
                (m && (g = s && s.onVnodeBeforeUnmount) && Qs(g, t, e), 6 & u)
              )
                G(e.component, o, n);
              else {
                if (128 & u) return void e.suspense.unmount(o, n);
                f && on(e, null, t, "beforeUnmount"),
                  64 & u
                    ? e.type.remove(e, t, o, ee, n)
                    : l && !l.hasOnce && (a !== Ss || (d > 0 && 64 & d))
                    ? J(l, t, o, !1, !0)
                    : ((a === Ss && 384 & d) || (!r && 16 & u)) && J(c, t, o),
                  n && Y(e);
              }
              ((m && (g = s && s.onVnodeUnmounted)) || f) &&
                Da(() => {
                  g && Qs(g, t, e), f && on(e, null, t, "unmounted");
                }, o);
            },
            Y = (e) => {
              const { type: t, el: o, anchor: r, transition: a } = e;
              if (t === Ss) return void K(o, r);
              if (t === Cs) return void w(e);
              const s = () => {
                n(o), a && !a.persisted && a.afterLeave && a.afterLeave();
              };
              if (1 & e.shapeFlag && a && !a.persisted) {
                const { leave: t, delayLeave: n } = a,
                  r = () => t(o, s);
                n ? n(e.el, s, r) : r();
              } else s();
            },
            K = (e, t) => {
              let o;
              for (; e !== t; ) (o = f(e)), n(e), (e = o);
              n(t);
            },
            G = (e, t, o) => {
              const {
                bum: n,
                scope: r,
                job: a,
                subTree: s,
                um: i,
                m: c,
                a: l,
                parent: u,
                slots: { __: d },
              } = e;
              Ya(c),
                Ya(l),
                n && q(n),
                u &&
                  g(d) &&
                  d.forEach((e) => {
                    u.renderCache[e] = void 0;
                  }),
                r.stop(),
                a && ((a.flags |= 8), W(s, e, t, o)),
                i && Da(i, t),
                Da(() => {
                  e.isUnmounted = !0;
                }, t),
                t &&
                  t.pendingBranch &&
                  !t.isUnmounted &&
                  e.asyncDep &&
                  !e.asyncResolved &&
                  e.suspenseId === t.pendingId &&
                  (t.deps--, 0 === t.deps && t.resolve());
            },
            J = (e, t, o, n = !1, r = !1, a = 0) => {
              for (let s = a; s < e.length; s++) W(e[s], t, o, n, r);
            },
            X = (e) => {
              if (6 & e.shapeFlag) return X(e.component.subTree);
              if (128 & e.shapeFlag) return e.suspense.next();
              const t = f(e.anchor || e.el),
                o = t && t[nn];
              return o ? f(o) : t;
            };
          let Z = !1;
          const Q = (e, t, o) => {
              null == e
                ? t._vnode && W(t._vnode, null, null, !0)
                : y(t._vnode || null, e, t, null, null, null, o),
                (t._vnode = e),
                Z || ((Z = !0), Fo(), zo(), (Z = !1));
            },
            ee = {
              p: y,
              um: W,
              m: V,
              r: Y,
              mt: L,
              mc: k,
              pc: F,
              pbc: O,
              n: X,
              o: e,
            };
          let te, oe;
          return (
            t && ([te, oe] = t(ee)),
            { render: Q, hydrate: te, createApp: ba(Q, te) }
          );
        }
        function za({ type: e, props: t }, o) {
          return ("svg" === o && "foreignObject" === e) ||
            ("mathml" === o &&
              "annotation-xml" === e &&
              t &&
              t.encoding &&
              t.encoding.includes("html"))
            ? void 0
            : o;
        }
        function $a({ effect: e, job: t }, o) {
          o
            ? ((e.flags |= 32), (t.flags |= 4))
            : ((e.flags &= -33), (t.flags &= -5));
        }
        function Va(e, t) {
          return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
        }
        function Ha(e, t, o = !1) {
          const n = e.children,
            r = t.children;
          if (g(n) && g(r))
            for (let e = 0; e < n.length; e++) {
              const t = n[e];
              let a = r[e];
              1 & a.shapeFlag &&
                !a.dynamicChildren &&
                ((a.patchFlag <= 0 || 32 === a.patchFlag) &&
                  ((a = r[e] = Js(r[e])), (a.el = t.el)),
                o || -2 === a.patchFlag || Ha(t, a)),
                a.type === ws && (a.el = t.el),
                a.type !== Es || a.el || (a.el = t.el);
            }
        }
        function Wa(e) {
          const t = e.subTree.component;
          if (t) return t.asyncDep && !t.asyncResolved ? t : Wa(t);
        }
        function Ya(e) {
          if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
        }
        const Ka = Symbol.for("v-scx"),
          Ga = () => {
            {
              const e = _a(Ka);
              return e;
            }
          };
        function Ja(e, t) {
          return es(e, null, t);
        }
        function Xa(e, t) {
          return es(e, null, { flush: "post" });
        }
        function Za(e, t) {
          return es(e, null, { flush: "sync" });
        }
        function Qa(e, t, o) {
          return es(e, t, o);
        }
        function es(e, t, o = s) {
          const { immediate: n, deep: r, flush: a, once: i } = o;
          const l = p({}, o);
          const u = (t && n) || (!t && "post" !== a);
          let d;
          if (pi)
            if ("sync" === a) {
              const e = Ga();
              d = e.__watcherHandles || (e.__watcherHandles = []);
            } else if (!u) {
              const e = () => {};
              return (e.stop = c), (e.resume = c), (e.pause = c), e;
            }
          const f = ni;
          l.call = (e, t, o) => Ao(e, f, t, o);
          let m = !1;
          "post" === a
            ? (l.scheduler = (e) => {
                Da(e, f && f.suspense);
              })
            : "sync" !== a &&
              ((m = !0),
              (l.scheduler = (e, t) => {
                t ? e() : Do(e);
              })),
            (l.augmentJob = (e) => {
              t && (e.flags |= 4),
                m && ((e.flags |= 2), f && ((e.id = f.uid), (e.i = f)));
            });
          const b = (function (e, t, o = s) {
            const {
                immediate: n,
                deep: r,
                once: a,
                scheduler: i,
                augmentJob: l,
                call: u,
              } = o,
              d = (e) =>
                r ? e : qt(e) || !1 === r || 0 === r ? vo(e, 1) : vo(e);
            let p,
              f,
              m,
              b,
              v = !1,
              y = !1;
            if (
              (Wt(e)
                ? ((f = () => e.value), (v = qt(e)))
                : Dt(e)
                ? ((f = () => d(e)), (v = !0))
                : g(e)
                ? ((y = !0),
                  (v = e.some((e) => Dt(e) || qt(e))),
                  (f = () =>
                    e.map((e) =>
                      Wt(e)
                        ? e.value
                        : Dt(e)
                        ? d(e)
                        : _(e)
                        ? u
                          ? u(e, 2)
                          : e()
                        : void 0
                    )))
                : (f = _(e)
                    ? t
                      ? u
                        ? () => u(e, 2)
                        : e
                      : () => {
                          if (m) {
                            ze();
                            try {
                              m();
                            } finally {
                              $e();
                            }
                          }
                          const t = mo;
                          mo = p;
                          try {
                            return u ? u(e, 3, [b]) : e(b);
                          } finally {
                            mo = t;
                          }
                        }
                    : c),
              t && r)
            ) {
              const e = f,
                t = !0 === r ? 1 / 0 : r;
              f = () => vo(e(), t);
            }
            const x = Se(),
              S = () => {
                p.stop(), x && x.active && h(x.effects, p);
              };
            if (a && t) {
              const e = t;
              t = (...t) => {
                e(...t), S();
              };
            }
            let w = y ? new Array(e.length).fill(ho) : ho;
            const E = (e) => {
              if (1 & p.flags && (p.dirty || e))
                if (t) {
                  const e = p.run();
                  if (r || v || (y ? e.some((e, t) => B(e, w[t])) : B(e, w))) {
                    m && m();
                    const o = mo;
                    mo = p;
                    try {
                      const o = [
                        e,
                        w === ho ? void 0 : y && w[0] === ho ? [] : w,
                        b,
                      ];
                      (w = e), u ? u(t, 3, o) : t(...o);
                    } finally {
                      mo = o;
                    }
                  }
                } else p.run();
            };
            return (
              l && l(E),
              (p = new Ce(f)),
              (p.scheduler = i ? () => i(E, !1) : E),
              (b = (e) => bo(e, !1, p)),
              (m = p.onStop =
                () => {
                  const e = fo.get(p);
                  if (e) {
                    if (u) u(e, 4);
                    else for (const t of e) t();
                    fo.delete(p);
                  }
                }),
              t
                ? n
                  ? E(!0)
                  : (w = p.run())
                : i
                ? i(E.bind(null, !0), !0)
                : p.run(),
              (S.pause = p.pause.bind(p)),
              (S.resume = p.resume.bind(p)),
              (S.stop = S),
              S
            );
          })(e, t, l);
          return pi && (d ? d.push(b) : u && b()), b;
        }
        function ts(e, t, o) {
          const n = this.proxy,
            r = x(e) ? (e.includes(".") ? os(n, e) : () => n[e]) : e.bind(n, n);
          let a;
          _(t) ? (a = t) : ((a = t.handler), (o = t));
          const s = ii(this),
            i = es(r, a.bind(n), o);
          return s(), i;
        }
        function os(e, t) {
          const o = t.split(".");
          return () => {
            let t = e;
            for (let e = 0; e < o.length && t; e++) t = t[o[e]];
            return t;
          };
        }
        function ns(e, t, o = s) {
          const n = ri();
          const r = P(t);
          const a = M(t),
            i = rs(e, r),
            c = no((i, c) => {
              let l,
                u,
                d = s;
              return (
                Za(() => {
                  const t = e[r];
                  B(l, t) && ((l = t), c());
                }),
                {
                  get: () => (i(), o.get ? o.get(l) : l),
                  set(e) {
                    const i = o.set ? o.set(e) : e;
                    if (!(B(i, l) || (d !== s && B(e, d)))) return;
                    const p = n.vnode.props;
                    (p &&
                      (t in p || r in p || a in p) &&
                      (`onUpdate:${t}` in p ||
                        `onUpdate:${r}` in p ||
                        `onUpdate:${a}` in p)) ||
                      ((l = e), c()),
                      n.emit(`update:${t}`, i),
                      B(e, i) && B(e, d) && !B(i, u) && c(),
                      (d = e),
                      (u = i);
                  },
                }
              );
            });
          return (
            (c[Symbol.iterator] = () => {
              let e = 0;
              return {
                next: () =>
                  e < 2 ? { value: e++ ? i || s : c, done: !1 } : { done: !0 },
              };
            }),
            c
          );
        }
        const rs = (e, t) =>
          "modelValue" === t || "model-value" === t
            ? e.modelModifiers
            : e[`${t}Modifiers`] ||
              e[`${P(t)}Modifiers`] ||
              e[`${M(t)}Modifiers`];
        function as(e, t, ...o) {
          if (e.isUnmounted) return;
          const n = e.vnode.props || s;
          let r = o;
          const a = t.startsWith("update:"),
            i = a && rs(n, t.slice(7));
          let c;
          i &&
            (i.trim && (r = o.map((e) => (x(e) ? e.trim() : e))),
            i.number && (r = o.map(z)));
          let l = n[(c = D(t))] || n[(c = D(P(t)))];
          !l && a && (l = n[(c = D(M(t)))]), l && Ao(l, e, 6, r);
          const u = n[c + "Once"];
          if (u) {
            if (e.emitted) {
              if (e.emitted[c]) return;
            } else e.emitted = {};
            (e.emitted[c] = !0), Ao(u, e, 6, r);
          }
        }
        function ss(e, t, o = !1) {
          const n = t.emitsCache,
            r = n.get(e);
          if (void 0 !== r) return r;
          const a = e.emits;
          let s = {},
            i = !1;
          if (!_(e)) {
            const n = (e) => {
              const o = ss(e, t, !0);
              o && ((i = !0), p(s, o));
            };
            !o && t.mixins.length && t.mixins.forEach(n),
              e.extends && n(e.extends),
              e.mixins && e.mixins.forEach(n);
          }
          return a || i
            ? (g(a) ? a.forEach((e) => (s[e] = null)) : p(s, a),
              w(e) && n.set(e, s),
              s)
            : (w(e) && n.set(e, null), null);
        }
        function is(e, t) {
          return (
            !(!e || !u(t)) &&
            ((t = t.slice(2).replace(/Once$/, "")),
            m(e, t[0].toLowerCase() + t.slice(1)) || m(e, M(t)) || m(e, t))
          );
        }
        function cs(e) {
          const {
              type: t,
              vnode: o,
              proxy: n,
              withProxy: r,
              propsOptions: [a],
              slots: s,
              attrs: i,
              emit: c,
              render: l,
              renderCache: u,
              props: p,
              data: h,
              setupState: f,
              ctx: m,
              inheritAttrs: g,
            } = e,
            b = Jo(e);
          let v, y;
          try {
            if (4 & o.shapeFlag) {
              const e = r || n,
                t = e;
              (v = Gs(l.call(t, e, u, p, f, h, m))), (y = i);
            } else {
              const e = t;
              0,
                (v = Gs(
                  e.length > 1
                    ? e(p, { attrs: i, slots: s, emit: c })
                    : e(p, null)
                )),
                (y = t.props ? i : us(i));
            }
          } catch (t) {
            (Ts.length = 0), Oo(t, e, 1), (v = zs(Es));
          }
          let _ = v;
          if (y && !1 !== g) {
            const e = Object.keys(y),
              { shapeFlag: t } = _;
            e.length &&
              7 & t &&
              (a && e.some(d) && (y = ds(y, a)), (_ = Hs(_, y, !1, !0)));
          }
          return (
            o.dirs &&
              ((_ = Hs(_, null, !1, !0)),
              (_.dirs = _.dirs ? _.dirs.concat(o.dirs) : o.dirs)),
            o.transition && An(_, o.transition),
            (v = _),
            Jo(b),
            v
          );
        }
        function ls(e, t = !0) {
          let o;
          for (let t = 0; t < e.length; t++) {
            const n = e[t];
            if (!Ms(n)) return;
            if (n.type !== Es || "v-if" === n.children) {
              if (o) return;
              o = n;
            }
          }
          return o;
        }
        const us = (e) => {
            let t;
            for (const o in e)
              ("class" === o || "style" === o || u(o)) &&
                ((t || (t = {}))[o] = e[o]);
            return t;
          },
          ds = (e, t) => {
            const o = {};
            for (const n in e) (d(n) && n.slice(9) in t) || (o[n] = e[n]);
            return o;
          };
        function ps(e, t, o) {
          const n = Object.keys(t);
          if (n.length !== Object.keys(e).length) return !0;
          for (let r = 0; r < n.length; r++) {
            const a = n[r];
            if (t[a] !== e[a] && !is(o, a)) return !0;
          }
          return !1;
        }
        function hs({ vnode: e, parent: t }, o) {
          for (; t; ) {
            const n = t.subTree;
            if (
              (n.suspense && n.suspense.activeBranch === e && (n.el = e.el),
              n !== e)
            )
              break;
            ((e = t.vnode).el = o), (t = t.parent);
          }
        }
        const fs = (e) => e.__isSuspense;
        let ms = 0;
        const gs = {
          name: "Suspense",
          __isSuspense: !0,
          process(e, t, o, n, r, a, s, i, c, l) {
            if (null == e)
              !(function (e, t, o, n, r, a, s, i, c) {
                const {
                    p: l,
                    o: { createElement: u },
                  } = c,
                  d = u("div"),
                  p = (e.suspense = vs(e, r, n, t, d, o, a, s, i, c));
                l(null, (p.pendingBranch = e.ssContent), d, null, n, p, a, s),
                  p.deps > 0
                    ? (bs(e, "onPending"),
                      bs(e, "onFallback"),
                      l(null, e.ssFallback, t, o, n, null, a, s),
                      xs(p, e.ssFallback))
                    : p.resolve(!1, !0);
              })(t, o, n, r, a, s, i, c, l);
            else {
              if (a && a.deps > 0 && !e.suspense.isInFallback)
                return (
                  (t.suspense = e.suspense),
                  (t.suspense.vnode = t),
                  void (t.el = e.el)
                );
              !(function (
                e,
                t,
                o,
                n,
                r,
                a,
                s,
                i,
                { p: c, um: l, o: { createElement: u } }
              ) {
                const d = (t.suspense = e.suspense);
                (d.vnode = t), (t.el = e.el);
                const p = t.ssContent,
                  h = t.ssFallback,
                  {
                    activeBranch: f,
                    pendingBranch: m,
                    isInFallback: g,
                    isHydrating: b,
                  } = d;
                if (m)
                  (d.pendingBranch = p),
                    Us(p, m)
                      ? (c(m, p, d.hiddenContainer, null, r, d, a, s, i),
                        d.deps <= 0
                          ? d.resolve()
                          : g &&
                            (b || (c(f, h, o, n, r, null, a, s, i), xs(d, h))))
                      : ((d.pendingId = ms++),
                        b
                          ? ((d.isHydrating = !1), (d.activeBranch = m))
                          : l(m, r, d),
                        (d.deps = 0),
                        (d.effects.length = 0),
                        (d.hiddenContainer = u("div")),
                        g
                          ? (c(null, p, d.hiddenContainer, null, r, d, a, s, i),
                            d.deps <= 0
                              ? d.resolve()
                              : (c(f, h, o, n, r, null, a, s, i), xs(d, h)))
                          : f && Us(p, f)
                          ? (c(f, p, o, n, r, d, a, s, i), d.resolve(!0))
                          : (c(null, p, d.hiddenContainer, null, r, d, a, s, i),
                            d.deps <= 0 && d.resolve()));
                else if (f && Us(p, f)) c(f, p, o, n, r, d, a, s, i), xs(d, p);
                else if (
                  (bs(t, "onPending"),
                  (d.pendingBranch = p),
                  512 & p.shapeFlag
                    ? (d.pendingId = p.component.suspenseId)
                    : (d.pendingId = ms++),
                  c(null, p, d.hiddenContainer, null, r, d, a, s, i),
                  d.deps <= 0)
                )
                  d.resolve();
                else {
                  const { timeout: e, pendingId: t } = d;
                  e > 0
                    ? setTimeout(() => {
                        d.pendingId === t && d.fallback(h);
                      }, e)
                    : 0 === e && d.fallback(h);
                }
              })(e, t, o, n, r, s, i, c, l);
            }
          },
          hydrate: function (e, t, o, n, r, a, s, i, c) {
            const l = (t.suspense = vs(
                t,
                n,
                o,
                e.parentNode,
                document.createElement("div"),
                null,
                r,
                a,
                s,
                i,
                !0
              )),
              u = c(e, (l.pendingBranch = t.ssContent), o, l, a, s);
            0 === l.deps && l.resolve(!1, !0);
            return u;
          },
          normalize: function (e) {
            const { shapeFlag: t, children: o } = e,
              n = 32 & t;
            (e.ssContent = ys(n ? o.default : o)),
              (e.ssFallback = n ? ys(o.fallback) : zs(Es));
          },
        };
        function bs(e, t) {
          const o = e.props && e.props[t];
          _(o) && o();
        }
        function vs(e, t, o, n, r, a, s, i, c, l, u = !1) {
          const {
            p: d,
            m: p,
            um: h,
            n: f,
            o: { parentNode: m, remove: g },
          } = l;
          let b;
          const v = (function (e) {
            const t = e.props && e.props.suspensible;
            return null != t && !1 !== t;
          })(e);
          v && t && t.pendingBranch && ((b = t.pendingId), t.deps++);
          const y = e.props ? $(e.props.timeout) : void 0;
          const _ = a,
            x = {
              vnode: e,
              parent: t,
              parentComponent: o,
              namespace: s,
              container: n,
              hiddenContainer: r,
              deps: 0,
              pendingId: ms++,
              timeout: "number" == typeof y ? y : -1,
              activeBranch: null,
              pendingBranch: null,
              isInFallback: !u,
              isHydrating: u,
              isUnmounted: !1,
              effects: [],
              resolve(e = !1, o = !1) {
                const {
                  vnode: n,
                  activeBranch: r,
                  pendingBranch: s,
                  pendingId: i,
                  effects: c,
                  parentComponent: l,
                  container: u,
                } = x;
                let d = !1;
                x.isHydrating
                  ? (x.isHydrating = !1)
                  : e ||
                    ((d = r && s.transition && "out-in" === s.transition.mode),
                    d &&
                      (r.transition.afterLeave = () => {
                        i === x.pendingId &&
                          (p(s, u, a === _ ? f(r) : a, 0), qo(c));
                      }),
                    r && (m(r.el) === u && (a = f(r)), h(r, l, x, !0)),
                    d || p(s, u, a, 0)),
                  xs(x, s),
                  (x.pendingBranch = null),
                  (x.isInFallback = !1);
                let g = x.parent,
                  y = !1;
                for (; g; ) {
                  if (g.pendingBranch) {
                    g.effects.push(...c), (y = !0);
                    break;
                  }
                  g = g.parent;
                }
                y || d || qo(c),
                  (x.effects = []),
                  v &&
                    t &&
                    t.pendingBranch &&
                    b === t.pendingId &&
                    (t.deps--, 0 !== t.deps || o || t.resolve()),
                  bs(n, "onResolve");
              },
              fallback(e) {
                if (!x.pendingBranch) return;
                const {
                  vnode: t,
                  activeBranch: o,
                  parentComponent: n,
                  container: r,
                  namespace: a,
                } = x;
                bs(t, "onFallback");
                const s = f(o),
                  l = () => {
                    x.isInFallback &&
                      (d(null, e, r, s, n, null, a, i, c), xs(x, e));
                  },
                  u = e.transition && "out-in" === e.transition.mode;
                u && (o.transition.afterLeave = l),
                  (x.isInFallback = !0),
                  h(o, n, null, !0),
                  u || l();
              },
              move(e, t, o) {
                x.activeBranch && p(x.activeBranch, e, t, o), (x.container = e);
              },
              next: () => x.activeBranch && f(x.activeBranch),
              registerDep(e, t, o) {
                const n = !!x.pendingBranch;
                n && x.deps++;
                const r = e.vnode.el;
                e.asyncDep
                  .catch((t) => {
                    Oo(t, e, 0);
                  })
                  .then((a) => {
                    if (
                      e.isUnmounted ||
                      x.isUnmounted ||
                      x.pendingId !== e.suspenseId
                    )
                      return;
                    e.asyncResolved = !0;
                    const { vnode: i } = e;
                    fi(e, a, !1), r && (i.el = r);
                    const c = !r && e.subTree.el;
                    t(
                      e,
                      i,
                      m(r || e.subTree.el),
                      r ? null : f(e.subTree),
                      x,
                      s,
                      o
                    ),
                      c && g(c),
                      hs(e, i.el),
                      n && 0 === --x.deps && x.resolve();
                  });
              },
              unmount(e, t) {
                (x.isUnmounted = !0),
                  x.activeBranch && h(x.activeBranch, o, e, t),
                  x.pendingBranch && h(x.pendingBranch, o, e, t);
              },
            };
          return x;
        }
        function ys(e) {
          let t;
          if (_(e)) {
            const o = Ns && e._c;
            o && ((e._d = !1), As()),
              (e = e()),
              o && ((e._d = !0), (t = ks), Os());
          }
          if (g(e)) {
            const t = ls(e);
            0, (e = t);
          }
          return (
            (e = Gs(e)),
            t &&
              !e.dynamicChildren &&
              (e.dynamicChildren = t.filter((t) => t !== e)),
            e
          );
        }
        function _s(e, t) {
          t && t.pendingBranch
            ? g(e)
              ? t.effects.push(...e)
              : t.effects.push(e)
            : qo(e);
        }
        function xs(e, t) {
          e.activeBranch = t;
          const { vnode: o, parentComponent: n } = e;
          let r = t.el;
          for (; !r && t.component; ) r = (t = t.component.subTree).el;
          (o.el = r), n && n.subTree === o && ((n.vnode.el = r), hs(n, r));
        }
        const Ss = Symbol.for("v-fgt"),
          ws = Symbol.for("v-txt"),
          Es = Symbol.for("v-cmt"),
          Cs = Symbol.for("v-stc"),
          Ts = [];
        let ks = null;
        function As(e = !1) {
          Ts.push((ks = e ? null : []));
        }
        function Os() {
          Ts.pop(), (ks = Ts[Ts.length - 1] || null);
        }
        let Rs,
          Ns = 1;
        function js(e, t = !1) {
          (Ns += e), e < 0 && ks && t && (ks.hasOnce = !0);
        }
        function Is(e) {
          return (
            (e.dynamicChildren = Ns > 0 ? ks || i : null),
            Os(),
            Ns > 0 && ks && ks.push(e),
            e
          );
        }
        function Ps(e, t, o, n, r, a) {
          return Is(Fs(e, t, o, n, r, a, !0));
        }
        function Ls(e, t, o, n, r) {
          return Is(zs(e, t, o, n, r, !0));
        }
        function Ms(e) {
          return !!e && !0 === e.__v_isVNode;
        }
        function Us(e, t) {
          return e.type === t.type && e.key === t.key;
        }
        function Ds(e) {
          Rs = e;
        }
        const Bs = ({ key: e }) => (null != e ? e : null),
          qs = ({ ref: e, ref_key: t, ref_for: o }) => (
            "number" == typeof e && (e = "" + e),
            null != e
              ? x(e) || Wt(e) || _(e)
                ? { i: Ko, r: e, k: t, f: !!o }
                : e
              : null
          );
        function Fs(
          e,
          t = null,
          o = null,
          n = 0,
          r = null,
          a = e === Ss ? 0 : 1,
          s = !1,
          i = !1
        ) {
          const c = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e,
            props: t,
            key: t && Bs(t),
            ref: t && qs(t),
            scopeId: Go,
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
            targetStart: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag: a,
            patchFlag: n,
            dynamicProps: r,
            dynamicChildren: null,
            appContext: null,
            ctx: Ko,
          };
          return (
            i
              ? (Xs(c, o), 128 & a && e.normalize(c))
              : o && (c.shapeFlag |= x(o) ? 8 : 16),
            Ns > 0 &&
              !s &&
              ks &&
              (c.patchFlag > 0 || 6 & a) &&
              32 !== c.patchFlag &&
              ks.push(c),
            c
          );
        }
        const zs = $s;
        function $s(e, t = null, o = null, n = 0, r = null, a = !1) {
          if (((e && e !== kr) || (e = Es), Ms(e))) {
            const n = Hs(e, t, !0);
            return (
              o && Xs(n, o),
              Ns > 0 &&
                !a &&
                ks &&
                (6 & n.shapeFlag ? (ks[ks.indexOf(e)] = n) : ks.push(n)),
              (n.patchFlag = -2),
              n
            );
          }
          if ((Ci(e) && (e = e.__vccOpts), t)) {
            t = Vs(t);
            let { class: e, style: o } = t;
            e && !x(e) && (t.class = Z(e)),
              w(o) && (Ft(o) && !g(o) && (o = p({}, o)), (t.style = Y(o)));
          }
          return Fs(
            e,
            t,
            o,
            n,
            r,
            x(e) ? 1 : fs(e) ? 128 : rn(e) ? 64 : w(e) ? 4 : _(e) ? 2 : 0,
            a,
            !0
          );
        }
        function Vs(e) {
          return e ? (Ft(e) || Ea(e) ? p({}, e) : e) : null;
        }
        function Hs(e, t, o = !1, n = !1) {
          const {
              props: r,
              ref: a,
              patchFlag: s,
              children: i,
              transition: c,
            } = e,
            l = t ? Zs(r || {}, t) : r,
            u = {
              __v_isVNode: !0,
              __v_skip: !0,
              type: e.type,
              props: l,
              key: l && Bs(l),
              ref:
                t && t.ref
                  ? o && a
                    ? g(a)
                      ? a.concat(qs(t))
                      : [a, qs(t)]
                    : qs(t)
                  : a,
              scopeId: e.scopeId,
              slotScopeIds: e.slotScopeIds,
              children: i,
              target: e.target,
              targetStart: e.targetStart,
              targetAnchor: e.targetAnchor,
              staticCount: e.staticCount,
              shapeFlag: e.shapeFlag,
              patchFlag: t && e.type !== Ss ? (-1 === s ? 16 : 16 | s) : s,
              dynamicProps: e.dynamicProps,
              dynamicChildren: e.dynamicChildren,
              appContext: e.appContext,
              dirs: e.dirs,
              transition: c,
              component: e.component,
              suspense: e.suspense,
              ssContent: e.ssContent && Hs(e.ssContent),
              ssFallback: e.ssFallback && Hs(e.ssFallback),
              el: e.el,
              anchor: e.anchor,
              ctx: e.ctx,
              ce: e.ce,
            };
          return c && n && An(u, c.clone(u)), u;
        }
        function Ws(e = " ", t = 0) {
          return zs(ws, null, e, t);
        }
        function Ys(e, t) {
          const o = zs(Cs, null, e);
          return (o.staticCount = t), o;
        }
        function Ks(e = "", t = !1) {
          return t ? (As(), Ls(Es, null, e)) : zs(Es, null, e);
        }
        function Gs(e) {
          return null == e || "boolean" == typeof e
            ? zs(Es)
            : g(e)
            ? zs(Ss, null, e.slice())
            : Ms(e)
            ? Js(e)
            : zs(ws, null, String(e));
        }
        function Js(e) {
          return (null === e.el && -1 !== e.patchFlag) || e.memo ? e : Hs(e);
        }
        function Xs(e, t) {
          let o = 0;
          const { shapeFlag: n } = e;
          if (null == t) t = null;
          else if (g(t)) o = 16;
          else if ("object" == typeof t) {
            if (65 & n) {
              const o = t.default;
              return void (
                o && (o._c && (o._d = !1), Xs(e, o()), o._c && (o._d = !0))
              );
            }
            {
              o = 32;
              const n = t._;
              n || Ea(t)
                ? 3 === n &&
                  Ko &&
                  (1 === Ko.slots._
                    ? (t._ = 1)
                    : ((t._ = 2), (e.patchFlag |= 1024)))
                : (t._ctx = Ko);
            }
          } else
            _(t)
              ? ((t = { default: t, _ctx: Ko }), (o = 32))
              : ((t = String(t)), 64 & n ? ((o = 16), (t = [Ws(t)])) : (o = 8));
          (e.children = t), (e.shapeFlag |= o);
        }
        function Zs(...e) {
          const t = {};
          for (let o = 0; o < e.length; o++) {
            const n = e[o];
            for (const e in n)
              if ("class" === e)
                t.class !== n.class && (t.class = Z([t.class, n.class]));
              else if ("style" === e) t.style = Y([t.style, n.style]);
              else if (u(e)) {
                const o = t[e],
                  r = n[e];
                !r ||
                  o === r ||
                  (g(o) && o.includes(r)) ||
                  (t[e] = o ? [].concat(o, r) : r);
              } else "" !== e && (t[e] = n[e]);
          }
          return t;
        }
        function Qs(e, t, o, n = null) {
          Ao(e, t, 7, [o, n]);
        }
        const ei = ma();
        let ti = 0;
        function oi(e, t, o) {
          const n = e.type,
            r = (t ? t.appContext : e.appContext) || ei,
            a = {
              uid: ti++,
              vnode: e,
              type: n,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              effect: null,
              update: null,
              job: null,
              scope: new _e(!0),
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              provides: t ? t.provides : Object.create(r.provides),
              ids: t ? t.ids : ["", 0, 0],
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: Aa(n, r),
              emitsOptions: ss(n, r),
              emit: null,
              emitted: null,
              propsDefaults: s,
              inheritAttrs: n.inheritAttrs,
              ctx: s,
              data: s,
              props: s,
              attrs: s,
              slots: s,
              refs: s,
              setupState: s,
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
            (a.ctx = { _: a }),
            (a.root = t ? t.root : a),
            (a.emit = as.bind(null, a)),
            e.ce && e.ce(a),
            a
          );
        }
        let ni = null;
        const ri = () => ni || Ko;
        let ai, si;
        {
          const e = H(),
            t = (t, o) => {
              let n;
              return (
                (n = e[t]) || (n = e[t] = []),
                n.push(o),
                (e) => {
                  n.length > 1 ? n.forEach((t) => t(e)) : n[0](e);
                }
              );
            };
          (ai = t("__VUE_INSTANCE_SETTERS__", (e) => (ni = e))),
            (si = t("__VUE_SSR_SETTERS__", (e) => (pi = e)));
        }
        const ii = (e) => {
            const t = ni;
            return (
              ai(e),
              e.scope.on(),
              () => {
                e.scope.off(), ai(t);
              }
            );
          },
          ci = () => {
            ni && ni.scope.off(), ai(null);
          };
        function li(e) {
          return 4 & e.vnode.shapeFlag;
        }
        let ui,
          di,
          pi = !1;
        function hi(e, t = !1, o = !1) {
          t && si(t);
          const { props: n, children: r } = e.vnode,
            a = li(e);
          !(function (e, t, o, n = !1) {
            const r = {},
              a = wa();
            (e.propsDefaults = Object.create(null)), Ca(e, t, r, a);
            for (const t in e.propsOptions[0]) t in r || (r[t] = void 0);
            o
              ? (e.props = n ? r : Pt(r))
              : e.type.props
              ? (e.props = r)
              : (e.props = a),
              (e.attrs = a);
          })(e, n, a, t),
            Ma(e, r, o || t);
          const s = a
            ? (function (e, t) {
                const o = e.type;
                0;
                (e.accessCache = Object.create(null)),
                  (e.proxy = new Proxy(e.ctx, qr)),
                  !1;
                const { setup: n } = o;
                if (n) {
                  ze();
                  const o = (e.setupContext = n.length > 1 ? yi(e) : null),
                    r = ii(e),
                    a = ko(n, e, 0, [e.props, o]),
                    s = E(a);
                  if (($e(), r(), (!s && !e.sp) || Qn(e) || jn(e), s)) {
                    if ((a.then(ci, ci), t))
                      return a
                        .then((o) => {
                          fi(e, o, t);
                        })
                        .catch((t) => {
                          Oo(t, e, 0);
                        });
                    e.asyncDep = a;
                  } else fi(e, a, t);
                } else bi(e, t);
              })(e, t)
            : void 0;
          return t && si(!1), s;
        }
        function fi(e, t, o) {
          _(t)
            ? e.type.__ssrInlineRender
              ? (e.ssrRender = t)
              : (e.render = t)
            : w(t) && (e.setupState = to(t)),
            bi(e, o);
        }
        function mi(e) {
          (ui = e),
            (di = (e) => {
              e.render._rc && (e.withProxy = new Proxy(e.ctx, Fr));
            });
        }
        const gi = () => !ui;
        function bi(e, t, o) {
          const n = e.type;
          if (!e.render) {
            if (!t && ui && !n.render) {
              const t = n.template || ia(e).template;
              if (t) {
                0;
                const { isCustomElement: o, compilerOptions: r } =
                    e.appContext.config,
                  { delimiters: a, compilerOptions: s } = n,
                  i = p(p({ isCustomElement: o, delimiters: a }, r), s);
                n.render = ui(t, i);
              }
            }
            (e.render = n.render || c), di && di(e);
          }
          {
            const t = ii(e);
            ze();
            try {
              ra(e);
            } finally {
              $e(), t();
            }
          }
        }
        const vi = { get: (e, t) => (Qe(e, 0, ""), e[t]) };
        function yi(e) {
          const t = (t) => {
            e.exposed = t || {};
          };
          return {
            attrs: new Proxy(e.attrs, vi),
            slots: e.slots,
            emit: e.emit,
            expose: t,
          };
        }
        function _i(e) {
          return e.exposed
            ? e.exposeProxy ||
                (e.exposeProxy = new Proxy(to($t(e.exposed)), {
                  get: (t, o) => (o in t ? t[o] : o in Dr ? Dr[o](e) : void 0),
                  has: (e, t) => t in e || t in Dr,
                }))
            : e.proxy;
        }
        const xi = /(?:^|[-_])(\w)/g,
          Si = (e) =>
            e.replace(xi, (e) => e.toUpperCase()).replace(/[-_]/g, "");
        function wi(e, t = !0) {
          return _(e) ? e.displayName || e.name : e.name || (t && e.__name);
        }
        function Ei(e, t, o = !1) {
          let n = wi(t);
          if (!n && t.__file) {
            const e = t.__file.match(/([^/\\]+)\.\w+$/);
            e && (n = e[1]);
          }
          if (!n && e && e.parent) {
            const o = (e) => {
              for (const o in e) if (e[o] === t) return o;
            };
            n =
              o(e.components || e.parent.type.components) ||
              o(e.appContext.components);
          }
          return n ? Si(n) : o ? "App" : "Anonymous";
        }
        function Ci(e) {
          return _(e) && "__vccOpts" in e;
        }
        const Ti = (e, t) => {
          const o = (function (e, t, o = !1) {
            let n, r;
            return _(e) ? (n = e) : ((n = e.get), (r = e.set)), new lo(n, r, o);
          })(e, 0, pi);
          return o;
        };
        function ki(e, t, o) {
          const n = arguments.length;
          return 2 === n
            ? w(t) && !g(t)
              ? Ms(t)
                ? zs(e, null, [t])
                : zs(e, t)
              : zs(e, null, t)
            : (n > 3
                ? (o = Array.prototype.slice.call(arguments, 2))
                : 3 === n && Ms(o) && (o = [o]),
              zs(e, t, o));
        }
        function Ai() {
          return void 0;
        }
        function Oi(e, t, o, n) {
          const r = o[n];
          if (r && Ri(r, e)) return r;
          const a = t();
          return (a.memo = e.slice()), (a.cacheIndex = n), (o[n] = a);
        }
        function Ri(e, t) {
          const o = e.memo;
          if (o.length != t.length) return !1;
          for (let e = 0; e < o.length; e++) if (B(o[e], t[e])) return !1;
          return Ns > 0 && ks && ks.push(e), !0;
        }
        const Ni = "3.5.17",
          ji = c,
          Ii = To,
          Pi = Ho,
          Li = function e(t, o) {
            var n, r;
            if (((Ho = t), Ho))
              (Ho.enabled = !0),
                Wo.forEach(({ event: e, args: t }) => Ho.emit(e, ...t)),
                (Wo = []);
            else if (
              "undefined" != typeof window &&
              window.HTMLElement &&
              !(null ==
              (r = null == (n = window.navigator) ? void 0 : n.userAgent)
                ? void 0
                : r.includes("jsdom"))
            ) {
              (o.__VUE_DEVTOOLS_HOOK_REPLAY__ =
                o.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((t) => {
                e(t, o);
              }),
                setTimeout(() => {
                  Ho ||
                    ((o.__VUE_DEVTOOLS_HOOK_REPLAY__ = null),
                    (Yo = !0),
                    (Wo = []));
                }, 3e3);
            } else (Yo = !0), (Wo = []);
          },
          Mi = {
            createComponentInstance: oi,
            setupComponent: hi,
            renderComponentRoot: cs,
            setCurrentRenderingInstance: Jo,
            isVNode: Ms,
            normalizeVNode: Gs,
            getComponentPublicInstance: _i,
            ensureValidVNode: Lr,
            pushWarningContext: function (e) {
              yo.push(e);
            },
            popWarningContext: function () {
              yo.pop();
            },
          },
          Ui = null,
          Di = null,
          Bi = null;
        let qi;
        const Fi = "undefined" != typeof window && window.trustedTypes;
        if (Fi)
          try {
            qi = Fi.createPolicy("vue", { createHTML: (e) => e });
          } catch (e) {}
        const zi = qi ? (e) => qi.createHTML(e) : (e) => e,
          $i = "undefined" != typeof document ? document : null,
          Vi = $i && $i.createElement("template"),
          Hi = {
            insert: (e, t, o) => {
              t.insertBefore(e, o || null);
            },
            remove: (e) => {
              const t = e.parentNode;
              t && t.removeChild(e);
            },
            createElement: (e, t, o, n) => {
              const r =
                "svg" === t
                  ? $i.createElementNS("http://www.w3.org/2000/svg", e)
                  : "mathml" === t
                  ? $i.createElementNS("http://www.w3.org/1998/Math/MathML", e)
                  : o
                  ? $i.createElement(e, { is: o })
                  : $i.createElement(e);
              return (
                "select" === e &&
                  n &&
                  null != n.multiple &&
                  r.setAttribute("multiple", n.multiple),
                r
              );
            },
            createText: (e) => $i.createTextNode(e),
            createComment: (e) => $i.createComment(e),
            setText: (e, t) => {
              e.nodeValue = t;
            },
            setElementText: (e, t) => {
              e.textContent = t;
            },
            parentNode: (e) => e.parentNode,
            nextSibling: (e) => e.nextSibling,
            querySelector: (e) => $i.querySelector(e),
            setScopeId(e, t) {
              e.setAttribute(t, "");
            },
            insertStaticContent(e, t, o, n, r, a) {
              const s = o ? o.previousSibling : t.lastChild;
              if (r && (r === a || r.nextSibling))
                for (
                  ;
                  t.insertBefore(r.cloneNode(!0), o),
                    r !== a && (r = r.nextSibling);

                );
              else {
                Vi.innerHTML = zi(
                  "svg" === n
                    ? `<svg>${e}</svg>`
                    : "mathml" === n
                    ? `<math>${e}</math>`
                    : e
                );
                const r = Vi.content;
                if ("svg" === n || "mathml" === n) {
                  const e = r.firstChild;
                  for (; e.firstChild; ) r.appendChild(e.firstChild);
                  r.removeChild(e);
                }
                t.insertBefore(r, o);
              }
              return [
                s ? s.nextSibling : t.firstChild,
                o ? o.previousSibling : t.lastChild,
              ];
            },
          },
          Wi = "transition",
          Yi = "animation",
          Ki = Symbol("_vtc"),
          Gi = {
            name: String,
            type: String,
            css: { type: Boolean, default: !0 },
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
          Ji = p({}, _n, Gi),
          Xi = ((e) => ((e.displayName = "Transition"), (e.props = Ji), e))(
            (e, { slots: t }) => ki(wn, ec(e), t)
          ),
          Zi = (e, t = []) => {
            g(e) ? e.forEach((e) => e(...t)) : e && e(...t);
          },
          Qi = (e) =>
            !!e && (g(e) ? e.some((e) => e.length > 1) : e.length > 1);
        function ec(e) {
          const t = {};
          for (const o in e) o in Gi || (t[o] = e[o]);
          if (!1 === e.css) return t;
          const {
              name: o = "v",
              type: n,
              duration: r,
              enterFromClass: a = `${o}-enter-from`,
              enterActiveClass: s = `${o}-enter-active`,
              enterToClass: i = `${o}-enter-to`,
              appearFromClass: c = a,
              appearActiveClass: l = s,
              appearToClass: u = i,
              leaveFromClass: d = `${o}-leave-from`,
              leaveActiveClass: h = `${o}-leave-active`,
              leaveToClass: f = `${o}-leave-to`,
            } = e,
            m = (function (e) {
              if (null == e) return null;
              if (w(e)) return [tc(e.enter), tc(e.leave)];
              {
                const t = tc(e);
                return [t, t];
              }
            })(r),
            g = m && m[0],
            b = m && m[1],
            {
              onBeforeEnter: v,
              onEnter: y,
              onEnterCancelled: _,
              onLeave: x,
              onLeaveCancelled: S,
              onBeforeAppear: E = v,
              onAppear: C = y,
              onAppearCancelled: T = _,
            } = t,
            k = (e, t, o, n) => {
              (e._enterCancelled = n),
                nc(e, t ? u : i),
                nc(e, t ? l : s),
                o && o();
            },
            A = (e, t) => {
              (e._isLeaving = !1), nc(e, d), nc(e, f), nc(e, h), t && t();
            },
            O = (e) => (t, o) => {
              const r = e ? C : y,
                s = () => k(t, e, o);
              Zi(r, [t, s]),
                rc(() => {
                  nc(t, e ? c : a), oc(t, e ? u : i), Qi(r) || sc(t, n, g, s);
                });
            };
          return p(t, {
            onBeforeEnter(e) {
              Zi(v, [e]), oc(e, a), oc(e, s);
            },
            onBeforeAppear(e) {
              Zi(E, [e]), oc(e, c), oc(e, l);
            },
            onEnter: O(!1),
            onAppear: O(!0),
            onLeave(e, t) {
              e._isLeaving = !0;
              const o = () => A(e, t);
              oc(e, d),
                e._enterCancelled ? (oc(e, h), uc()) : (uc(), oc(e, h)),
                rc(() => {
                  e._isLeaving && (nc(e, d), oc(e, f), Qi(x) || sc(e, n, b, o));
                }),
                Zi(x, [e, o]);
            },
            onEnterCancelled(e) {
              k(e, !1, void 0, !0), Zi(_, [e]);
            },
            onAppearCancelled(e) {
              k(e, !0, void 0, !0), Zi(T, [e]);
            },
            onLeaveCancelled(e) {
              A(e), Zi(S, [e]);
            },
          });
        }
        function tc(e) {
          return $(e);
        }
        function oc(e, t) {
          t.split(/\s+/).forEach((t) => t && e.classList.add(t)),
            (e[Ki] || (e[Ki] = new Set())).add(t);
        }
        function nc(e, t) {
          t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
          const o = e[Ki];
          o && (o.delete(t), o.size || (e[Ki] = void 0));
        }
        function rc(e) {
          requestAnimationFrame(() => {
            requestAnimationFrame(e);
          });
        }
        let ac = 0;
        function sc(e, t, o, n) {
          const r = (e._endId = ++ac),
            a = () => {
              r === e._endId && n();
            };
          if (null != o) return setTimeout(a, o);
          const { type: s, timeout: i, propCount: c } = ic(e, t);
          if (!s) return n();
          const l = s + "end";
          let u = 0;
          const d = () => {
              e.removeEventListener(l, p), a();
            },
            p = (t) => {
              t.target === e && ++u >= c && d();
            };
          setTimeout(() => {
            u < c && d();
          }, i + 1),
            e.addEventListener(l, p);
        }
        function ic(e, t) {
          const o = window.getComputedStyle(e),
            n = (e) => (o[e] || "").split(", "),
            r = n(`${Wi}Delay`),
            a = n(`${Wi}Duration`),
            s = cc(r, a),
            i = n(`${Yi}Delay`),
            c = n(`${Yi}Duration`),
            l = cc(i, c);
          let u = null,
            d = 0,
            p = 0;
          t === Wi
            ? s > 0 && ((u = Wi), (d = s), (p = a.length))
            : t === Yi
            ? l > 0 && ((u = Yi), (d = l), (p = c.length))
            : ((d = Math.max(s, l)),
              (u = d > 0 ? (s > l ? Wi : Yi) : null),
              (p = u ? (u === Wi ? a.length : c.length) : 0));
          return {
            type: u,
            timeout: d,
            propCount: p,
            hasTransform:
              u === Wi &&
              /\b(transform|all)(,|$)/.test(n(`${Wi}Property`).toString()),
          };
        }
        function cc(e, t) {
          for (; e.length < t.length; ) e = e.concat(e);
          return Math.max(...t.map((t, o) => lc(t) + lc(e[o])));
        }
        function lc(e) {
          return "auto" === e
            ? 0
            : 1e3 * Number(e.slice(0, -1).replace(",", "."));
        }
        function uc() {
          return document.body.offsetHeight;
        }
        const dc = Symbol("_vod"),
          pc = Symbol("_vsh"),
          hc = {
            beforeMount(e, { value: t }, { transition: o }) {
              (e[dc] = "none" === e.style.display ? "" : e.style.display),
                o && t ? o.beforeEnter(e) : fc(e, t);
            },
            mounted(e, { value: t }, { transition: o }) {
              o && t && o.enter(e);
            },
            updated(e, { value: t, oldValue: o }, { transition: n }) {
              !t != !o &&
                (n
                  ? t
                    ? (n.beforeEnter(e), fc(e, !0), n.enter(e))
                    : n.leave(e, () => {
                        fc(e, !1);
                      })
                  : fc(e, t));
            },
            beforeUnmount(e, { value: t }) {
              fc(e, t);
            },
          };
        function fc(e, t) {
          (e.style.display = t ? e[dc] : "none"), (e[pc] = !t);
        }
        const mc = Symbol("");
        function gc(e) {
          const t = ri();
          if (!t) return;
          const o = (t.ut = (o = e(t.proxy)) => {
            Array.from(
              document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
            ).forEach((e) => vc(e, o));
          });
          const n = () => {
            const n = e(t.proxy);
            t.ce ? vc(t.ce, n) : bc(t.subTree, n), o(n);
          };
          gr(() => {
            qo(n);
          }),
            mr(() => {
              Qa(n, c, { flush: "post" });
              const e = new MutationObserver(n);
              e.observe(t.subTree.el.parentNode, { childList: !0 }),
                yr(() => e.disconnect());
            });
        }
        function bc(e, t) {
          if (128 & e.shapeFlag) {
            const o = e.suspense;
            (e = o.activeBranch),
              o.pendingBranch &&
                !o.isHydrating &&
                o.effects.push(() => {
                  bc(o.activeBranch, t);
                });
          }
          for (; e.component; ) e = e.component.subTree;
          if (1 & e.shapeFlag && e.el) vc(e.el, t);
          else if (e.type === Ss) e.children.forEach((e) => bc(e, t));
          else if (e.type === Cs) {
            let { el: o, anchor: n } = e;
            for (; o && (vc(o, t), o !== n); ) o = o.nextSibling;
          }
        }
        function vc(e, t) {
          if (1 === e.nodeType) {
            const o = e.style;
            let n = "";
            for (const e in t)
              o.setProperty(`--${e}`, t[e]), (n += `--${e}: ${t[e]};`);
            o[mc] = n;
          }
        }
        const yc = /(^|;)\s*display\s*:/;
        const _c = /\s*!important$/;
        function xc(e, t, o) {
          if (g(o)) o.forEach((o) => xc(e, t, o));
          else if ((null == o && (o = ""), t.startsWith("--")))
            e.setProperty(t, o);
          else {
            const n = (function (e, t) {
              const o = wc[t];
              if (o) return o;
              let n = P(t);
              if ("filter" !== n && n in e) return (wc[t] = n);
              n = U(n);
              for (let o = 0; o < Sc.length; o++) {
                const r = Sc[o] + n;
                if (r in e) return (wc[t] = r);
              }
              return t;
            })(e, t);
            _c.test(o)
              ? e.setProperty(M(n), o.replace(_c, ""), "important")
              : (e[n] = o);
          }
        }
        const Sc = ["Webkit", "Moz", "ms"],
          wc = {};
        const Ec = "http://www.w3.org/1999/xlink";
        function Cc(e, t, o, n, r, a = ae(t)) {
          n && t.startsWith("xlink:")
            ? null == o
              ? e.removeAttributeNS(Ec, t.slice(6, t.length))
              : e.setAttributeNS(Ec, t, o)
            : null == o || (a && !ie(o))
            ? e.removeAttribute(t)
            : e.setAttribute(t, a ? "" : S(o) ? String(o) : o);
        }
        function Tc(e, t, o, n, r) {
          if ("innerHTML" === t || "textContent" === t)
            return void (null != o && (e[t] = "innerHTML" === t ? zi(o) : o));
          const a = e.tagName;
          if ("value" === t && "PROGRESS" !== a && !a.includes("-")) {
            const n = "OPTION" === a ? e.getAttribute("value") || "" : e.value,
              r = null == o ? ("checkbox" === e.type ? "on" : "") : String(o);
            return (
              (n === r && "_value" in e) || (e.value = r),
              null == o && e.removeAttribute(t),
              void (e._value = o)
            );
          }
          let s = !1;
          if ("" === o || null == o) {
            const n = typeof e[t];
            "boolean" === n
              ? (o = ie(o))
              : null == o && "string" === n
              ? ((o = ""), (s = !0))
              : "number" === n && ((o = 0), (s = !0));
          }
          try {
            e[t] = o;
          } catch (e) {
            0;
          }
          s && e.removeAttribute(r || t);
        }
        function kc(e, t, o, n) {
          e.addEventListener(t, o, n);
        }
        const Ac = Symbol("_vei");
        function Oc(e, t, o, n, r = null) {
          const a = e[Ac] || (e[Ac] = {}),
            s = a[t];
          if (n && s) s.value = n;
          else {
            const [o, i] = (function (e) {
              let t;
              if (Rc.test(e)) {
                let o;
                for (t = {}; (o = e.match(Rc)); )
                  (e = e.slice(0, e.length - o[0].length)),
                    (t[o[0].toLowerCase()] = !0);
              }
              const o = ":" === e[2] ? e.slice(3) : M(e.slice(2));
              return [o, t];
            })(t);
            if (n) {
              const s = (a[t] = (function (e, t) {
                const o = (e) => {
                  if (e._vts) {
                    if (e._vts <= o.attached) return;
                  } else e._vts = Date.now();
                  Ao(
                    (function (e, t) {
                      if (g(t)) {
                        const o = e.stopImmediatePropagation;
                        return (
                          (e.stopImmediatePropagation = () => {
                            o.call(e), (e._stopped = !0);
                          }),
                          t.map((e) => (t) => !t._stopped && e && e(t))
                        );
                      }
                      return t;
                    })(e, o.value),
                    t,
                    5,
                    [e]
                  );
                };
                return (o.value = e), (o.attached = Ic()), o;
              })(n, r));
              kc(e, o, s, i);
            } else
              s &&
                (!(function (e, t, o, n) {
                  e.removeEventListener(t, o, n);
                })(e, o, s, i),
                (a[t] = void 0));
          }
        }
        const Rc = /(?:Once|Passive|Capture)$/;
        let Nc = 0;
        const jc = Promise.resolve(),
          Ic = () => Nc || (jc.then(() => (Nc = 0)), (Nc = Date.now()));
        const Pc = (e) =>
          111 === e.charCodeAt(0) &&
          110 === e.charCodeAt(1) &&
          e.charCodeAt(2) > 96 &&
          e.charCodeAt(2) < 123;
        const Lc = {};
        function Mc(e, t, o) {
          const n = Rn(e, t);
          A(n) && p(n, t);
          class r extends Bc {
            constructor(e) {
              super(n, e, o);
            }
          }
          return (r.def = n), r;
        }
        const Uc = (e, t) => Mc(e, t, Cl),
          Dc = "undefined" != typeof HTMLElement ? HTMLElement : class {};
        class Bc extends Dc {
          constructor(e, t = {}, o = El) {
            super(),
              (this._def = e),
              (this._props = t),
              (this._createApp = o),
              (this._isVueCE = !0),
              (this._instance = null),
              (this._app = null),
              (this._nonce = this._def.nonce),
              (this._connected = !1),
              (this._resolved = !1),
              (this._numberProps = null),
              (this._styleChildren = new WeakSet()),
              (this._ob = null),
              this.shadowRoot && o !== El
                ? (this._root = this.shadowRoot)
                : !1 !== e.shadowRoot
                ? (this.attachShadow({ mode: "open" }),
                  (this._root = this.shadowRoot))
                : (this._root = this);
          }
          connectedCallback() {
            if (!this.isConnected) return;
            this.shadowRoot || this._resolved || this._parseSlots(),
              (this._connected = !0);
            let e = this;
            for (; (e = e && (e.parentNode || e.host)); )
              if (e instanceof Bc) {
                this._parent = e;
                break;
              }
            this._instance ||
              (this._resolved
                ? this._mount(this._def)
                : e && e._pendingResolve
                ? (this._pendingResolve = e._pendingResolve.then(() => {
                    (this._pendingResolve = void 0), this._resolveDef();
                  }))
                : this._resolveDef());
          }
          _setParent(e = this._parent) {
            e &&
              ((this._instance.parent = e._instance),
              this._inheritParentContext(e));
          }
          _inheritParentContext(e = this._parent) {
            e &&
              this._app &&
              Object.setPrototypeOf(
                this._app._context.provides,
                e._instance.provides
              );
          }
          disconnectedCallback() {
            (this._connected = !1),
              Uo(() => {
                this._connected ||
                  (this._ob && (this._ob.disconnect(), (this._ob = null)),
                  this._app && this._app.unmount(),
                  this._instance && (this._instance.ce = void 0),
                  (this._app = this._instance = null));
              });
          }
          _resolveDef() {
            if (this._pendingResolve) return;
            for (let e = 0; e < this.attributes.length; e++)
              this._setAttr(this.attributes[e].name);
            (this._ob = new MutationObserver((e) => {
              for (const t of e) this._setAttr(t.attributeName);
            })),
              this._ob.observe(this, { attributes: !0 });
            const e = (e, t = !1) => {
                (this._resolved = !0), (this._pendingResolve = void 0);
                const { props: o, styles: n } = e;
                let r;
                if (o && !g(o))
                  for (const e in o) {
                    const t = o[e];
                    (t === Number || (t && t.type === Number)) &&
                      (e in this._props && (this._props[e] = $(this._props[e])),
                      ((r || (r = Object.create(null)))[P(e)] = !0));
                  }
                (this._numberProps = r),
                  this._resolveProps(e),
                  this.shadowRoot && this._applyStyles(n),
                  this._mount(e);
              },
              t = this._def.__asyncLoader;
            t
              ? (this._pendingResolve = t().then((t) => {
                  (t.configureApp = this._def.configureApp),
                    e((this._def = t), !0);
                }))
              : e(this._def);
          }
          _mount(e) {
            (this._app = this._createApp(e)),
              this._inheritParentContext(),
              e.configureApp && e.configureApp(this._app),
              (this._app._ceVNode = this._createVNode()),
              this._app.mount(this._root);
            const t = this._instance && this._instance.exposed;
            if (t)
              for (const e in t)
                m(this, e) ||
                  Object.defineProperty(this, e, { get: () => Zt(t[e]) });
          }
          _resolveProps(e) {
            const { props: t } = e,
              o = g(t) ? t : Object.keys(t || {});
            for (const e of Object.keys(this))
              "_" !== e[0] && o.includes(e) && this._setProp(e, this[e]);
            for (const e of o.map(P))
              Object.defineProperty(this, e, {
                get() {
                  return this._getProp(e);
                },
                set(t) {
                  this._setProp(e, t, !0, !0);
                },
              });
          }
          _setAttr(e) {
            if (e.startsWith("data-v-")) return;
            const t = this.hasAttribute(e);
            let o = t ? this.getAttribute(e) : Lc;
            const n = P(e);
            t && this._numberProps && this._numberProps[n] && (o = $(o)),
              this._setProp(n, o, !1, !0);
          }
          _getProp(e) {
            return this._props[e];
          }
          _setProp(e, t, o = !0, n = !1) {
            if (
              t !== this._props[e] &&
              (t === Lc
                ? delete this._props[e]
                : ((this._props[e] = t),
                  "key" === e && this._app && (this._app._ceVNode.key = t)),
              n && this._instance && this._update(),
              o)
            ) {
              const o = this._ob;
              o && o.disconnect(),
                !0 === t
                  ? this.setAttribute(M(e), "")
                  : "string" == typeof t || "number" == typeof t
                  ? this.setAttribute(M(e), t + "")
                  : t || this.removeAttribute(M(e)),
                o && o.observe(this, { attributes: !0 });
            }
          }
          _update() {
            const e = this._createVNode();
            this._app && (e.appContext = this._app._context), Sl(e, this._root);
          }
          _createVNode() {
            const e = {};
            this.shadowRoot ||
              (e.onVnodeMounted = e.onVnodeUpdated =
                this._renderSlots.bind(this));
            const t = zs(this._def, p(e, this._props));
            return (
              this._instance ||
                (t.ce = (e) => {
                  (this._instance = e), (e.ce = this), (e.isCE = !0);
                  const t = (e, t) => {
                    this.dispatchEvent(
                      new CustomEvent(
                        e,
                        A(t[0]) ? p({ detail: t }, t[0]) : { detail: t }
                      )
                    );
                  };
                  (e.emit = (e, ...o) => {
                    t(e, o), M(e) !== e && t(M(e), o);
                  }),
                    this._setParent();
                }),
              t
            );
          }
          _applyStyles(e, t) {
            if (!e) return;
            if (t) {
              if (t === this._def || this._styleChildren.has(t)) return;
              this._styleChildren.add(t);
            }
            const o = this._nonce;
            for (let t = e.length - 1; t >= 0; t--) {
              const n = document.createElement("style");
              o && n.setAttribute("nonce", o),
                (n.textContent = e[t]),
                this.shadowRoot.prepend(n);
            }
          }
          _parseSlots() {
            const e = (this._slots = {});
            let t;
            for (; (t = this.firstChild); ) {
              const o =
                (1 === t.nodeType && t.getAttribute("slot")) || "default";
              (e[o] || (e[o] = [])).push(t), this.removeChild(t);
            }
          }
          _renderSlots() {
            const e = (this._teleportTarget || this).querySelectorAll("slot"),
              t = this._instance.type.__scopeId;
            for (let o = 0; o < e.length; o++) {
              const n = e[o],
                r = n.getAttribute("name") || "default",
                a = this._slots[r],
                s = n.parentNode;
              if (a)
                for (const e of a) {
                  if (t && 1 === e.nodeType) {
                    const o = t + "-s",
                      n = document.createTreeWalker(e, 1);
                    let r;
                    for (e.setAttribute(o, ""); (r = n.nextNode()); )
                      r.setAttribute(o, "");
                  }
                  s.insertBefore(e, n);
                }
              else for (; n.firstChild; ) s.insertBefore(n.firstChild, n);
              s.removeChild(n);
            }
          }
          _injectChildStyle(e) {
            this._applyStyles(e.styles, e);
          }
          _removeChildStyle(e) {
            0;
          }
        }
        function qc(e) {
          const t = ri(),
            o = t && t.ce;
          return o || null;
        }
        function Fc() {
          const e = qc();
          return e && e.shadowRoot;
        }
        function zc(e = "$style") {
          {
            const t = ri();
            if (!t) return s;
            const o = t.type.__cssModules;
            if (!o) return s;
            const n = o[e];
            return n || s;
          }
        }
        const $c = new WeakMap(),
          Vc = new WeakMap(),
          Hc = Symbol("_moveCb"),
          Wc = Symbol("_enterCb"),
          Yc = ((e) => (delete e.props.mode, e))({
            name: "TransitionGroup",
            props: p({}, Ji, { tag: String, moveClass: String }),
            setup(e, { slots: t }) {
              const o = ri(),
                n = vn();
              let r, a;
              return (
                br(() => {
                  if (!r.length) return;
                  const t = e.moveClass || `${e.name || "v"}-move`;
                  if (
                    !(function (e, t, o) {
                      const n = e.cloneNode(),
                        r = e[Ki];
                      r &&
                        r.forEach((e) => {
                          e.split(/\s+/).forEach(
                            (e) => e && n.classList.remove(e)
                          );
                        });
                      o.split(/\s+/).forEach((e) => e && n.classList.add(e)),
                        (n.style.display = "none");
                      const a = 1 === t.nodeType ? t : t.parentNode;
                      a.appendChild(n);
                      const { hasTransform: s } = ic(n);
                      return a.removeChild(n), s;
                    })(r[0].el, o.vnode.el, t)
                  )
                    return void (r = []);
                  r.forEach(Kc), r.forEach(Gc);
                  const n = r.filter(Jc);
                  uc(),
                    n.forEach((e) => {
                      const o = e.el,
                        n = o.style;
                      oc(o, t),
                        (n.transform =
                          n.webkitTransform =
                          n.transitionDuration =
                            "");
                      const r = (o[Hc] = (e) => {
                        (e && e.target !== o) ||
                          (e && !/transform$/.test(e.propertyName)) ||
                          (o.removeEventListener("transitionend", r),
                          (o[Hc] = null),
                          nc(o, t));
                      });
                      o.addEventListener("transitionend", r);
                    }),
                    (r = []);
                }),
                () => {
                  const s = zt(e),
                    i = ec(s);
                  let c = s.tag || Ss;
                  if (((r = []), a))
                    for (let e = 0; e < a.length; e++) {
                      const t = a[e];
                      t.el &&
                        t.el instanceof Element &&
                        (r.push(t),
                        An(t, Cn(t, i, n, o)),
                        $c.set(t, t.el.getBoundingClientRect()));
                    }
                  a = t.default ? On(t.default()) : [];
                  for (let e = 0; e < a.length; e++) {
                    const t = a[e];
                    null != t.key && An(t, Cn(t, i, n, o));
                  }
                  return zs(c, null, a);
                }
              );
            },
          });
        function Kc(e) {
          const t = e.el;
          t[Hc] && t[Hc](), t[Wc] && t[Wc]();
        }
        function Gc(e) {
          Vc.set(e, e.el.getBoundingClientRect());
        }
        function Jc(e) {
          const t = $c.get(e),
            o = Vc.get(e),
            n = t.left - o.left,
            r = t.top - o.top;
          if (n || r) {
            const t = e.el.style;
            return (
              (t.transform = t.webkitTransform = `translate(${n}px,${r}px)`),
              (t.transitionDuration = "0s"),
              e
            );
          }
        }
        const Xc = (e) => {
          const t = e.props["onUpdate:modelValue"] || !1;
          return g(t) ? (e) => q(t, e) : t;
        };
        function Zc(e) {
          e.target.composing = !0;
        }
        function Qc(e) {
          const t = e.target;
          t.composing &&
            ((t.composing = !1), t.dispatchEvent(new Event("input")));
        }
        const el = Symbol("_assign"),
          tl = {
            created(e, { modifiers: { lazy: t, trim: o, number: n } }, r) {
              e[el] = Xc(r);
              const a = n || (r.props && "number" === r.props.type);
              kc(e, t ? "change" : "input", (t) => {
                if (t.target.composing) return;
                let n = e.value;
                o && (n = n.trim()), a && (n = z(n)), e[el](n);
              }),
                o &&
                  kc(e, "change", () => {
                    e.value = e.value.trim();
                  }),
                t ||
                  (kc(e, "compositionstart", Zc),
                  kc(e, "compositionend", Qc),
                  kc(e, "change", Qc));
            },
            mounted(e, { value: t }) {
              e.value = null == t ? "" : t;
            },
            beforeUpdate(
              e,
              {
                value: t,
                oldValue: o,
                modifiers: { lazy: n, trim: r, number: a },
              },
              s
            ) {
              if (((e[el] = Xc(s)), e.composing)) return;
              const i = null == t ? "" : t;
              if (
                ((!a && "number" !== e.type) || /^0\d/.test(e.value)
                  ? e.value
                  : z(e.value)) !== i
              ) {
                if (document.activeElement === e && "range" !== e.type) {
                  if (n && t === o) return;
                  if (r && e.value.trim() === i) return;
                }
                e.value = i;
              }
            },
          },
          ol = {
            deep: !0,
            created(e, t, o) {
              (e[el] = Xc(o)),
                kc(e, "change", () => {
                  const t = e._modelValue,
                    o = il(e),
                    n = e.checked,
                    r = e[el];
                  if (g(t)) {
                    const e = he(t, o),
                      a = -1 !== e;
                    if (n && !a) r(t.concat(o));
                    else if (!n && a) {
                      const o = [...t];
                      o.splice(e, 1), r(o);
                    }
                  } else if (v(t)) {
                    const e = new Set(t);
                    n ? e.add(o) : e.delete(o), r(e);
                  } else r(cl(e, n));
                });
            },
            mounted: nl,
            beforeUpdate(e, t, o) {
              (e[el] = Xc(o)), nl(e, t, o);
            },
          };
        function nl(e, { value: t, oldValue: o }, n) {
          let r;
          if (((e._modelValue = t), g(t))) r = he(t, n.props.value) > -1;
          else if (v(t)) r = t.has(n.props.value);
          else {
            if (t === o) return;
            r = pe(t, cl(e, !0));
          }
          e.checked !== r && (e.checked = r);
        }
        const rl = {
            created(e, { value: t }, o) {
              (e.checked = pe(t, o.props.value)),
                (e[el] = Xc(o)),
                kc(e, "change", () => {
                  e[el](il(e));
                });
            },
            beforeUpdate(e, { value: t, oldValue: o }, n) {
              (e[el] = Xc(n)), t !== o && (e.checked = pe(t, n.props.value));
            },
          },
          al = {
            deep: !0,
            created(e, { value: t, modifiers: { number: o } }, n) {
              const r = v(t);
              kc(e, "change", () => {
                const t = Array.prototype.filter
                  .call(e.options, (e) => e.selected)
                  .map((e) => (o ? z(il(e)) : il(e)));
                e[el](e.multiple ? (r ? new Set(t) : t) : t[0]),
                  (e._assigning = !0),
                  Uo(() => {
                    e._assigning = !1;
                  });
              }),
                (e[el] = Xc(n));
            },
            mounted(e, { value: t }) {
              sl(e, t);
            },
            beforeUpdate(e, t, o) {
              e[el] = Xc(o);
            },
            updated(e, { value: t }) {
              e._assigning || sl(e, t);
            },
          };
        function sl(e, t) {
          const o = e.multiple,
            n = g(t);
          if (!o || n || v(t)) {
            for (let r = 0, a = e.options.length; r < a; r++) {
              const a = e.options[r],
                s = il(a);
              if (o)
                if (n) {
                  const e = typeof s;
                  a.selected =
                    "string" === e || "number" === e
                      ? t.some((e) => String(e) === String(s))
                      : he(t, s) > -1;
                } else a.selected = t.has(s);
              else if (pe(il(a), t))
                return void (e.selectedIndex !== r && (e.selectedIndex = r));
            }
            o || -1 === e.selectedIndex || (e.selectedIndex = -1);
          }
        }
        function il(e) {
          return "_value" in e ? e._value : e.value;
        }
        function cl(e, t) {
          const o = t ? "_trueValue" : "_falseValue";
          return o in e ? e[o] : t;
        }
        const ll = {
          created(e, t, o) {
            dl(e, t, o, null, "created");
          },
          mounted(e, t, o) {
            dl(e, t, o, null, "mounted");
          },
          beforeUpdate(e, t, o, n) {
            dl(e, t, o, n, "beforeUpdate");
          },
          updated(e, t, o, n) {
            dl(e, t, o, n, "updated");
          },
        };
        function ul(e, t) {
          switch (e) {
            case "SELECT":
              return al;
            case "TEXTAREA":
              return tl;
            default:
              switch (t) {
                case "checkbox":
                  return ol;
                case "radio":
                  return rl;
                default:
                  return tl;
              }
          }
        }
        function dl(e, t, o, n, r) {
          const a = ul(e.tagName, o.props && o.props.type)[r];
          a && a(e, t, o, n);
        }
        const pl = ["ctrl", "shift", "alt", "meta"],
          hl = {
            stop: (e) => e.stopPropagation(),
            prevent: (e) => e.preventDefault(),
            self: (e) => e.target !== e.currentTarget,
            ctrl: (e) => !e.ctrlKey,
            shift: (e) => !e.shiftKey,
            alt: (e) => !e.altKey,
            meta: (e) => !e.metaKey,
            left: (e) => "button" in e && 0 !== e.button,
            middle: (e) => "button" in e && 1 !== e.button,
            right: (e) => "button" in e && 2 !== e.button,
            exact: (e, t) => pl.some((o) => e[`${o}Key`] && !t.includes(o)),
          },
          fl = (e, t) => {
            const o = e._withMods || (e._withMods = {}),
              n = t.join(".");
            return (
              o[n] ||
              (o[n] = (o, ...n) => {
                for (let e = 0; e < t.length; e++) {
                  const n = hl[t[e]];
                  if (n && n(o, t)) return;
                }
                return e(o, ...n);
              })
            );
          },
          ml = {
            esc: "escape",
            space: " ",
            up: "arrow-up",
            left: "arrow-left",
            right: "arrow-right",
            down: "arrow-down",
            delete: "backspace",
          },
          gl = (e, t) => {
            const o = e._withKeys || (e._withKeys = {}),
              n = t.join(".");
            return (
              o[n] ||
              (o[n] = (o) => {
                if (!("key" in o)) return;
                const n = M(o.key);
                return t.some((e) => e === n || ml[e] === n) ? e(o) : void 0;
              })
            );
          },
          bl = p(
            {
              patchProp: (e, t, o, n, r, a) => {
                const s = "svg" === r;
                "class" === t
                  ? (function (e, t, o) {
                      const n = e[Ki];
                      n && (t = (t ? [t, ...n] : [...n]).join(" ")),
                        null == t
                          ? e.removeAttribute("class")
                          : o
                          ? e.setAttribute("class", t)
                          : (e.className = t);
                    })(e, n, s)
                  : "style" === t
                  ? (function (e, t, o) {
                      const n = e.style,
                        r = x(o);
                      let a = !1;
                      if (o && !r) {
                        if (t)
                          if (x(t))
                            for (const e of t.split(";")) {
                              const t = e.slice(0, e.indexOf(":")).trim();
                              null == o[t] && xc(n, t, "");
                            }
                          else for (const e in t) null == o[e] && xc(n, e, "");
                        for (const e in o)
                          "display" === e && (a = !0), xc(n, e, o[e]);
                      } else if (r) {
                        if (t !== o) {
                          const e = n[mc];
                          e && (o += ";" + e),
                            (n.cssText = o),
                            (a = yc.test(o));
                        }
                      } else t && e.removeAttribute("style");
                      dc in e &&
                        ((e[dc] = a ? n.display : ""),
                        e[pc] && (n.display = "none"));
                    })(e, o, n)
                  : u(t)
                  ? d(t) || Oc(e, t, 0, n, a)
                  : (
                      "." === t[0]
                        ? ((t = t.slice(1)), 1)
                        : "^" === t[0]
                        ? ((t = t.slice(1)), 0)
                        : (function (e, t, o, n) {
                            if (n)
                              return (
                                "innerHTML" === t ||
                                "textContent" === t ||
                                !!(t in e && Pc(t) && _(o))
                              );
                            if (
                              "spellcheck" === t ||
                              "draggable" === t ||
                              "translate" === t ||
                              "autocorrect" === t
                            )
                              return !1;
                            if ("form" === t) return !1;
                            if ("list" === t && "INPUT" === e.tagName)
                              return !1;
                            if ("type" === t && "TEXTAREA" === e.tagName)
                              return !1;
                            if ("width" === t || "height" === t) {
                              const t = e.tagName;
                              if (
                                "IMG" === t ||
                                "VIDEO" === t ||
                                "CANVAS" === t ||
                                "SOURCE" === t
                              )
                                return !1;
                            }
                            if (Pc(t) && x(o)) return !1;
                            return t in e;
                          })(e, t, n, s)
                    )
                  ? (Tc(e, t, n),
                    e.tagName.includes("-") ||
                      ("value" !== t && "checked" !== t && "selected" !== t) ||
                      Cc(e, t, n, s, 0, "value" !== t))
                  : !e._isVueCE || (!/[A-Z]/.test(t) && x(n))
                  ? ("true-value" === t
                      ? (e._trueValue = n)
                      : "false-value" === t && (e._falseValue = n),
                    Cc(e, t, n, s))
                  : Tc(e, P(t), n, 0, t);
              },
            },
            Hi
          );
        let vl,
          yl = !1;
        function _l() {
          return vl || (vl = Ba(bl));
        }
        function xl() {
          return (vl = yl ? vl : qa(bl)), (yl = !0), vl;
        }
        const Sl = (...e) => {
            _l().render(...e);
          },
          wl = (...e) => {
            xl().hydrate(...e);
          },
          El = (...e) => {
            const t = _l().createApp(...e);
            const { mount: o } = t;
            return (
              (t.mount = (e) => {
                const n = kl(e);
                if (!n) return;
                const r = t._component;
                _(r) || r.render || r.template || (r.template = n.innerHTML),
                  1 === n.nodeType && (n.textContent = "");
                const a = o(n, !1, Tl(n));
                return (
                  n instanceof Element &&
                    (n.removeAttribute("v-cloak"),
                    n.setAttribute("data-v-app", "")),
                  a
                );
              }),
              t
            );
          },
          Cl = (...e) => {
            const t = xl().createApp(...e);
            const { mount: o } = t;
            return (
              (t.mount = (e) => {
                const t = kl(e);
                if (t) return o(t, !0, Tl(t));
              }),
              t
            );
          };
        function Tl(e) {
          return e instanceof SVGElement
            ? "svg"
            : "function" == typeof MathMLElement && e instanceof MathMLElement
            ? "mathml"
            : void 0;
        }
        function kl(e) {
          if (x(e)) {
            return document.querySelector(e);
          }
          return e;
        }
        let Al = !1;
        const Ol = () => {
            Al ||
              ((Al = !0),
              (tl.getSSRProps = ({ value: e }) => ({ value: e })),
              (rl.getSSRProps = ({ value: e }, t) => {
                if (t.props && pe(t.props.value, e)) return { checked: !0 };
              }),
              (ol.getSSRProps = ({ value: e }, t) => {
                if (g(e)) {
                  if (t.props && he(e, t.props.value) > -1)
                    return { checked: !0 };
                } else if (v(e)) {
                  if (t.props && e.has(t.props.value)) return { checked: !0 };
                } else if (e) return { checked: !0 };
              }),
              (ll.getSSRProps = (e, t) => {
                if ("string" != typeof t.type) return;
                const o = ul(t.type.toUpperCase(), t.props && t.props.type);
                return o.getSSRProps ? o.getSSRProps(e, t) : void 0;
              }),
              (hc.getSSRProps = ({ value: e }) => {
                if (!e) return { style: { display: "none" } };
              }));
          },
          Rl = Symbol(""),
          Nl = Symbol(""),
          jl = Symbol(""),
          Il = Symbol(""),
          Pl = Symbol(""),
          Ll = Symbol(""),
          Ml = Symbol(""),
          Ul = Symbol(""),
          Dl = Symbol(""),
          Bl = Symbol(""),
          ql = Symbol(""),
          Fl = Symbol(""),
          zl = Symbol(""),
          $l = Symbol(""),
          Vl = Symbol(""),
          Hl = Symbol(""),
          Wl = Symbol(""),
          Yl = Symbol(""),
          Kl = Symbol(""),
          Gl = Symbol(""),
          Jl = Symbol(""),
          Xl = Symbol(""),
          Zl = Symbol(""),
          Ql = Symbol(""),
          eu = Symbol(""),
          tu = Symbol(""),
          ou = Symbol(""),
          nu = Symbol(""),
          ru = Symbol(""),
          au = Symbol(""),
          su = Symbol(""),
          iu = Symbol(""),
          cu = Symbol(""),
          lu = Symbol(""),
          uu = Symbol(""),
          du = Symbol(""),
          pu = Symbol(""),
          hu = Symbol(""),
          fu = Symbol(""),
          mu = {
            [Rl]: "Fragment",
            [Nl]: "Teleport",
            [jl]: "Suspense",
            [Il]: "KeepAlive",
            [Pl]: "BaseTransition",
            [Ll]: "openBlock",
            [Ml]: "createBlock",
            [Ul]: "createElementBlock",
            [Dl]: "createVNode",
            [Bl]: "createElementVNode",
            [ql]: "createCommentVNode",
            [Fl]: "createTextVNode",
            [zl]: "createStaticVNode",
            [$l]: "resolveComponent",
            [Vl]: "resolveDynamicComponent",
            [Hl]: "resolveDirective",
            [Wl]: "resolveFilter",
            [Yl]: "withDirectives",
            [Kl]: "renderList",
            [Gl]: "renderSlot",
            [Jl]: "createSlots",
            [Xl]: "toDisplayString",
            [Zl]: "mergeProps",
            [Ql]: "normalizeClass",
            [eu]: "normalizeStyle",
            [tu]: "normalizeProps",
            [ou]: "guardReactiveProps",
            [nu]: "toHandlers",
            [ru]: "camelize",
            [au]: "capitalize",
            [su]: "toHandlerKey",
            [iu]: "setBlockTracking",
            [cu]: "pushScopeId",
            [lu]: "popScopeId",
            [uu]: "withCtx",
            [du]: "unref",
            [pu]: "isRef",
            [hu]: "withMemo",
            [fu]: "isMemoSame",
          };
        const gu = {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 1, offset: 0 },
          source: "",
        };
        function bu(e, t, o, n, r, a, s, i = !1, c = !1, l = !1, u = gu) {
          return (
            e &&
              (i
                ? (e.helper(Ll), e.helper(ku(e.inSSR, l)))
                : e.helper(Tu(e.inSSR, l)),
              s && e.helper(Yl)),
            {
              type: 13,
              tag: t,
              props: o,
              children: n,
              patchFlag: r,
              dynamicProps: a,
              directives: s,
              isBlock: i,
              disableTracking: c,
              isComponent: l,
              loc: u,
            }
          );
        }
        function vu(e, t = gu) {
          return { type: 17, loc: t, elements: e };
        }
        function yu(e, t = gu) {
          return { type: 15, loc: t, properties: e };
        }
        function _u(e, t) {
          return { type: 16, loc: gu, key: x(e) ? xu(e, !0) : e, value: t };
        }
        function xu(e, t = !1, o = gu, n = 0) {
          return {
            type: 4,
            loc: o,
            content: e,
            isStatic: t,
            constType: t ? 3 : n,
          };
        }
        function Su(e, t = gu) {
          return { type: 8, loc: t, children: e };
        }
        function wu(e, t = [], o = gu) {
          return { type: 14, loc: o, callee: e, arguments: t };
        }
        function Eu(e, t = void 0, o = !1, n = !1, r = gu) {
          return {
            type: 18,
            params: e,
            returns: t,
            newline: o,
            isSlot: n,
            loc: r,
          };
        }
        function Cu(e, t, o, n = !0) {
          return {
            type: 19,
            test: e,
            consequent: t,
            alternate: o,
            newline: n,
            loc: gu,
          };
        }
        function Tu(e, t) {
          return e || t ? Dl : Bl;
        }
        function ku(e, t) {
          return e || t ? Ml : Ul;
        }
        function Au(e, { helper: t, removeHelper: o, inSSR: n }) {
          e.isBlock ||
            ((e.isBlock = !0),
            o(Tu(n, e.isComponent)),
            t(Ll),
            t(ku(n, e.isComponent)));
        }
        const Ou = new Uint8Array([123, 123]),
          Ru = new Uint8Array([125, 125]);
        function Nu(e) {
          return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
        }
        function ju(e) {
          return 32 === e || 10 === e || 9 === e || 12 === e || 13 === e;
        }
        function Iu(e) {
          return 47 === e || 62 === e || ju(e);
        }
        function Pu(e) {
          const t = new Uint8Array(e.length);
          for (let o = 0; o < e.length; o++) t[o] = e.charCodeAt(o);
          return t;
        }
        const Lu = {
          Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
          CdataEnd: new Uint8Array([93, 93, 62]),
          CommentEnd: new Uint8Array([45, 45, 62]),
          ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
          StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
          TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
          TextareaEnd: new Uint8Array([
            60, 47, 116, 101, 120, 116, 97, 114, 101, 97,
          ]),
        };
        function Mu(e, { compatConfig: t }) {
          const o = t && t[e];
          return "MODE" === e ? o || 3 : o;
        }
        function Uu(e, t) {
          const o = Mu("MODE", t),
            n = Mu(e, t);
          return 3 === o ? !0 === n : !1 !== n;
        }
        function Du(e, t, o, ...n) {
          return Uu(e, t);
        }
        function Bu(e) {
          throw e;
        }
        function qu(e) {}
        function Fu(e, t, o, n) {
          const r = new SyntaxError(
            String(`https://vuejs.org/error-reference/#compiler-${e}`)
          );
          return (r.code = e), (r.loc = t), r;
        }
        const zu = (e) => 4 === e.type && e.isStatic;
        function $u(e) {
          switch (e) {
            case "Teleport":
            case "teleport":
              return Nl;
            case "Suspense":
            case "suspense":
              return jl;
            case "KeepAlive":
            case "keep-alive":
              return Il;
            case "BaseTransition":
            case "base-transition":
              return Pl;
          }
        }
        const Vu = /^\d|[^\$\w\xA0-\uFFFF]/,
          Hu = (e) => !Vu.test(e),
          Wu = /[A-Za-z_$\xA0-\uFFFF]/,
          Yu = /[\.\?\w$\xA0-\uFFFF]/,
          Ku = /\s+[.[]\s*|\s*[.[]\s+/g,
          Gu = (e) => (4 === e.type ? e.content : e.loc.source),
          Ju = (e) => {
            const t = Gu(e)
              .trim()
              .replace(Ku, (e) => e.trim());
            let o = 0,
              n = [],
              r = 0,
              a = 0,
              s = null;
            for (let e = 0; e < t.length; e++) {
              const i = t.charAt(e);
              switch (o) {
                case 0:
                  if ("[" === i) n.push(o), (o = 1), r++;
                  else if ("(" === i) n.push(o), (o = 2), a++;
                  else if (!(0 === e ? Wu : Yu).test(i)) return !1;
                  break;
                case 1:
                  "'" === i || '"' === i || "`" === i
                    ? (n.push(o), (o = 3), (s = i))
                    : "[" === i
                    ? r++
                    : "]" === i && (--r || (o = n.pop()));
                  break;
                case 2:
                  if ("'" === i || '"' === i || "`" === i)
                    n.push(o), (o = 3), (s = i);
                  else if ("(" === i) a++;
                  else if (")" === i) {
                    if (e === t.length - 1) return !1;
                    --a || (o = n.pop());
                  }
                  break;
                case 3:
                  i === s && ((o = n.pop()), (s = null));
              }
            }
            return !r && !a;
          },
          Xu =
            /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,
          Zu = (e) => Xu.test(Gu(e));
        function Qu(e, t, o = !1) {
          for (let n = 0; n < e.props.length; n++) {
            const r = e.props[n];
            if (
              7 === r.type &&
              (o || r.exp) &&
              (x(t) ? r.name === t : t.test(r.name))
            )
              return r;
          }
        }
        function ed(e, t, o = !1, n = !1) {
          for (let r = 0; r < e.props.length; r++) {
            const a = e.props[r];
            if (6 === a.type) {
              if (o) continue;
              if (a.name === t && (a.value || n)) return a;
            } else if ("bind" === a.name && (a.exp || n) && td(a.arg, t))
              return a;
          }
        }
        function td(e, t) {
          return !(!e || !zu(e) || e.content !== t);
        }
        function od(e) {
          return 5 === e.type || 2 === e.type;
        }
        function nd(e) {
          return 7 === e.type && "slot" === e.name;
        }
        function rd(e) {
          return 1 === e.type && 3 === e.tagType;
        }
        function ad(e) {
          return 1 === e.type && 2 === e.tagType;
        }
        const sd = new Set([tu, ou]);
        function id(e, t = []) {
          if (e && !x(e) && 14 === e.type) {
            const o = e.callee;
            if (!x(o) && sd.has(o)) return id(e.arguments[0], t.concat(e));
          }
          return [e, t];
        }
        function cd(e, t, o) {
          let n,
            r,
            a = 13 === e.type ? e.props : e.arguments[2],
            s = [];
          if (a && !x(a) && 14 === a.type) {
            const e = id(a);
            (a = e[0]), (s = e[1]), (r = s[s.length - 1]);
          }
          if (null == a || x(a)) n = yu([t]);
          else if (14 === a.type) {
            const e = a.arguments[0];
            x(e) || 15 !== e.type
              ? a.callee === nu
                ? (n = wu(o.helper(Zl), [yu([t]), a]))
                : a.arguments.unshift(yu([t]))
              : ld(t, e) || e.properties.unshift(t),
              !n && (n = a);
          } else
            15 === a.type
              ? (ld(t, a) || a.properties.unshift(t), (n = a))
              : ((n = wu(o.helper(Zl), [yu([t]), a])),
                r && r.callee === ou && (r = s[s.length - 2]));
          13 === e.type
            ? r
              ? (r.arguments[0] = n)
              : (e.props = n)
            : r
            ? (r.arguments[0] = n)
            : (e.arguments[2] = n);
        }
        function ld(e, t) {
          let o = !1;
          if (4 === e.key.type) {
            const n = e.key.content;
            o = t.properties.some(
              (e) => 4 === e.key.type && e.key.content === n
            );
          }
          return o;
        }
        function ud(e, t) {
          return `_${t}_${e.replace(/[^\w]/g, (t, o) =>
            "-" === t ? "_" : e.charCodeAt(o).toString()
          )}`;
        }
        const dd = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,
          pd = {
            parseMode: "base",
            ns: 0,
            delimiters: ["{{", "}}"],
            getNamespace: () => 0,
            isVoidTag: l,
            isPreTag: l,
            isIgnoreNewlineTag: l,
            isCustomElement: l,
            onError: Bu,
            onWarn: qu,
            comments: !1,
            prefixIdentifiers: !1,
          };
        let hd = pd,
          fd = null,
          md = "",
          gd = null,
          bd = null,
          vd = "",
          yd = -1,
          _d = -1,
          xd = 0,
          Sd = !1,
          wd = null;
        const Ed = [],
          Cd = new (class {
            constructor(e, t) {
              (this.stack = e),
                (this.cbs = t),
                (this.state = 1),
                (this.buffer = ""),
                (this.sectionStart = 0),
                (this.index = 0),
                (this.entityStart = 0),
                (this.baseState = 1),
                (this.inRCDATA = !1),
                (this.inXML = !1),
                (this.inVPre = !1),
                (this.newlines = []),
                (this.mode = 0),
                (this.delimiterOpen = Ou),
                (this.delimiterClose = Ru),
                (this.delimiterIndex = -1),
                (this.currentSequence = void 0),
                (this.sequenceIndex = 0);
            }
            get inSFCRoot() {
              return 2 === this.mode && 0 === this.stack.length;
            }
            reset() {
              (this.state = 1),
                (this.mode = 0),
                (this.buffer = ""),
                (this.sectionStart = 0),
                (this.index = 0),
                (this.baseState = 1),
                (this.inRCDATA = !1),
                (this.currentSequence = void 0),
                (this.newlines.length = 0),
                (this.delimiterOpen = Ou),
                (this.delimiterClose = Ru);
            }
            getPos(e) {
              let t = 1,
                o = e + 1;
              for (let n = this.newlines.length - 1; n >= 0; n--) {
                const r = this.newlines[n];
                if (e > r) {
                  (t = n + 2), (o = e - r);
                  break;
                }
              }
              return { column: o, line: t, offset: e };
            }
            peek() {
              return this.buffer.charCodeAt(this.index + 1);
            }
            stateText(e) {
              60 === e
                ? (this.index > this.sectionStart &&
                    this.cbs.ontext(this.sectionStart, this.index),
                  (this.state = 5),
                  (this.sectionStart = this.index))
                : this.inVPre ||
                  e !== this.delimiterOpen[0] ||
                  ((this.state = 2),
                  (this.delimiterIndex = 0),
                  this.stateInterpolationOpen(e));
            }
            stateInterpolationOpen(e) {
              if (e === this.delimiterOpen[this.delimiterIndex])
                if (this.delimiterIndex === this.delimiterOpen.length - 1) {
                  const e = this.index + 1 - this.delimiterOpen.length;
                  e > this.sectionStart &&
                    this.cbs.ontext(this.sectionStart, e),
                    (this.state = 3),
                    (this.sectionStart = e);
                } else this.delimiterIndex++;
              else
                this.inRCDATA
                  ? ((this.state = 32), this.stateInRCDATA(e))
                  : ((this.state = 1), this.stateText(e));
            }
            stateInterpolation(e) {
              e === this.delimiterClose[0] &&
                ((this.state = 4),
                (this.delimiterIndex = 0),
                this.stateInterpolationClose(e));
            }
            stateInterpolationClose(e) {
              e === this.delimiterClose[this.delimiterIndex]
                ? this.delimiterIndex === this.delimiterClose.length - 1
                  ? (this.cbs.oninterpolation(
                      this.sectionStart,
                      this.index + 1
                    ),
                    this.inRCDATA ? (this.state = 32) : (this.state = 1),
                    (this.sectionStart = this.index + 1))
                  : this.delimiterIndex++
                : ((this.state = 3), this.stateInterpolation(e));
            }
            stateSpecialStartSequence(e) {
              const t = this.sequenceIndex === this.currentSequence.length;
              if (
                t
                  ? Iu(e)
                  : (32 | e) === this.currentSequence[this.sequenceIndex]
              ) {
                if (!t) return void this.sequenceIndex++;
              } else this.inRCDATA = !1;
              (this.sequenceIndex = 0),
                (this.state = 6),
                this.stateInTagName(e);
            }
            stateInRCDATA(e) {
              if (this.sequenceIndex === this.currentSequence.length) {
                if (62 === e || ju(e)) {
                  const t = this.index - this.currentSequence.length;
                  if (this.sectionStart < t) {
                    const e = this.index;
                    (this.index = t),
                      this.cbs.ontext(this.sectionStart, t),
                      (this.index = e);
                  }
                  return (
                    (this.sectionStart = t + 2),
                    this.stateInClosingTagName(e),
                    void (this.inRCDATA = !1)
                  );
                }
                this.sequenceIndex = 0;
              }
              (32 | e) === this.currentSequence[this.sequenceIndex]
                ? (this.sequenceIndex += 1)
                : 0 === this.sequenceIndex
                ? this.currentSequence === Lu.TitleEnd ||
                  (this.currentSequence === Lu.TextareaEnd && !this.inSFCRoot)
                  ? this.inVPre ||
                    e !== this.delimiterOpen[0] ||
                    ((this.state = 2),
                    (this.delimiterIndex = 0),
                    this.stateInterpolationOpen(e))
                  : this.fastForwardTo(60) && (this.sequenceIndex = 1)
                : (this.sequenceIndex = Number(60 === e));
            }
            stateCDATASequence(e) {
              e === Lu.Cdata[this.sequenceIndex]
                ? ++this.sequenceIndex === Lu.Cdata.length &&
                  ((this.state = 28),
                  (this.currentSequence = Lu.CdataEnd),
                  (this.sequenceIndex = 0),
                  (this.sectionStart = this.index + 1))
                : ((this.sequenceIndex = 0),
                  (this.state = 23),
                  this.stateInDeclaration(e));
            }
            fastForwardTo(e) {
              for (; ++this.index < this.buffer.length; ) {
                const t = this.buffer.charCodeAt(this.index);
                if ((10 === t && this.newlines.push(this.index), t === e))
                  return !0;
              }
              return (this.index = this.buffer.length - 1), !1;
            }
            stateInCommentLike(e) {
              e === this.currentSequence[this.sequenceIndex]
                ? ++this.sequenceIndex === this.currentSequence.length &&
                  (this.currentSequence === Lu.CdataEnd
                    ? this.cbs.oncdata(this.sectionStart, this.index - 2)
                    : this.cbs.oncomment(this.sectionStart, this.index - 2),
                  (this.sequenceIndex = 0),
                  (this.sectionStart = this.index + 1),
                  (this.state = 1))
                : 0 === this.sequenceIndex
                ? this.fastForwardTo(this.currentSequence[0]) &&
                  (this.sequenceIndex = 1)
                : e !== this.currentSequence[this.sequenceIndex - 1] &&
                  (this.sequenceIndex = 0);
            }
            startSpecial(e, t) {
              this.enterRCDATA(e, t), (this.state = 31);
            }
            enterRCDATA(e, t) {
              (this.inRCDATA = !0),
                (this.currentSequence = e),
                (this.sequenceIndex = t);
            }
            stateBeforeTagName(e) {
              33 === e
                ? ((this.state = 22), (this.sectionStart = this.index + 1))
                : 63 === e
                ? ((this.state = 24), (this.sectionStart = this.index + 1))
                : Nu(e)
                ? ((this.sectionStart = this.index),
                  0 === this.mode
                    ? (this.state = 6)
                    : this.inSFCRoot
                    ? (this.state = 34)
                    : this.inXML
                    ? (this.state = 6)
                    : (this.state = 116 === e ? 30 : 115 === e ? 29 : 6))
                : 47 === e
                ? (this.state = 8)
                : ((this.state = 1), this.stateText(e));
            }
            stateInTagName(e) {
              Iu(e) && this.handleTagName(e);
            }
            stateInSFCRootTagName(e) {
              if (Iu(e)) {
                const t = this.buffer.slice(this.sectionStart, this.index);
                "template" !== t && this.enterRCDATA(Pu("</" + t), 0),
                  this.handleTagName(e);
              }
            }
            handleTagName(e) {
              this.cbs.onopentagname(this.sectionStart, this.index),
                (this.sectionStart = -1),
                (this.state = 11),
                this.stateBeforeAttrName(e);
            }
            stateBeforeClosingTagName(e) {
              ju(e) ||
                (62 === e
                  ? ((this.state = 1), (this.sectionStart = this.index + 1))
                  : ((this.state = Nu(e) ? 9 : 27),
                    (this.sectionStart = this.index)));
            }
            stateInClosingTagName(e) {
              (62 === e || ju(e)) &&
                (this.cbs.onclosetag(this.sectionStart, this.index),
                (this.sectionStart = -1),
                (this.state = 10),
                this.stateAfterClosingTagName(e));
            }
            stateAfterClosingTagName(e) {
              62 === e &&
                ((this.state = 1), (this.sectionStart = this.index + 1));
            }
            stateBeforeAttrName(e) {
              62 === e
                ? (this.cbs.onopentagend(this.index),
                  this.inRCDATA ? (this.state = 32) : (this.state = 1),
                  (this.sectionStart = this.index + 1))
                : 47 === e
                ? (this.state = 7)
                : 60 === e && 47 === this.peek()
                ? (this.cbs.onopentagend(this.index),
                  (this.state = 5),
                  (this.sectionStart = this.index))
                : ju(e) || this.handleAttrStart(e);
            }
            handleAttrStart(e) {
              118 === e && 45 === this.peek()
                ? ((this.state = 13), (this.sectionStart = this.index))
                : 46 === e || 58 === e || 64 === e || 35 === e
                ? (this.cbs.ondirname(this.index, this.index + 1),
                  (this.state = 14),
                  (this.sectionStart = this.index + 1))
                : ((this.state = 12), (this.sectionStart = this.index));
            }
            stateInSelfClosingTag(e) {
              62 === e
                ? (this.cbs.onselfclosingtag(this.index),
                  (this.state = 1),
                  (this.sectionStart = this.index + 1),
                  (this.inRCDATA = !1))
                : ju(e) || ((this.state = 11), this.stateBeforeAttrName(e));
            }
            stateInAttrName(e) {
              (61 === e || Iu(e)) &&
                (this.cbs.onattribname(this.sectionStart, this.index),
                this.handleAttrNameEnd(e));
            }
            stateInDirName(e) {
              61 === e || Iu(e)
                ? (this.cbs.ondirname(this.sectionStart, this.index),
                  this.handleAttrNameEnd(e))
                : 58 === e
                ? (this.cbs.ondirname(this.sectionStart, this.index),
                  (this.state = 14),
                  (this.sectionStart = this.index + 1))
                : 46 === e &&
                  (this.cbs.ondirname(this.sectionStart, this.index),
                  (this.state = 16),
                  (this.sectionStart = this.index + 1));
            }
            stateInDirArg(e) {
              61 === e || Iu(e)
                ? (this.cbs.ondirarg(this.sectionStart, this.index),
                  this.handleAttrNameEnd(e))
                : 91 === e
                ? (this.state = 15)
                : 46 === e &&
                  (this.cbs.ondirarg(this.sectionStart, this.index),
                  (this.state = 16),
                  (this.sectionStart = this.index + 1));
            }
            stateInDynamicDirArg(e) {
              93 === e
                ? (this.state = 14)
                : (61 === e || Iu(e)) &&
                  (this.cbs.ondirarg(this.sectionStart, this.index + 1),
                  this.handleAttrNameEnd(e));
            }
            stateInDirModifier(e) {
              61 === e || Iu(e)
                ? (this.cbs.ondirmodifier(this.sectionStart, this.index),
                  this.handleAttrNameEnd(e))
                : 46 === e &&
                  (this.cbs.ondirmodifier(this.sectionStart, this.index),
                  (this.sectionStart = this.index + 1));
            }
            handleAttrNameEnd(e) {
              (this.sectionStart = this.index),
                (this.state = 17),
                this.cbs.onattribnameend(this.index),
                this.stateAfterAttrName(e);
            }
            stateAfterAttrName(e) {
              61 === e
                ? (this.state = 18)
                : 47 === e || 62 === e
                ? (this.cbs.onattribend(0, this.sectionStart),
                  (this.sectionStart = -1),
                  (this.state = 11),
                  this.stateBeforeAttrName(e))
                : ju(e) ||
                  (this.cbs.onattribend(0, this.sectionStart),
                  this.handleAttrStart(e));
            }
            stateBeforeAttrValue(e) {
              34 === e
                ? ((this.state = 19), (this.sectionStart = this.index + 1))
                : 39 === e
                ? ((this.state = 20), (this.sectionStart = this.index + 1))
                : ju(e) ||
                  ((this.sectionStart = this.index),
                  (this.state = 21),
                  this.stateInAttrValueNoQuotes(e));
            }
            handleInAttrValue(e, t) {
              (e === t || this.fastForwardTo(t)) &&
                (this.cbs.onattribdata(this.sectionStart, this.index),
                (this.sectionStart = -1),
                this.cbs.onattribend(34 === t ? 3 : 2, this.index + 1),
                (this.state = 11));
            }
            stateInAttrValueDoubleQuotes(e) {
              this.handleInAttrValue(e, 34);
            }
            stateInAttrValueSingleQuotes(e) {
              this.handleInAttrValue(e, 39);
            }
            stateInAttrValueNoQuotes(e) {
              ju(e) || 62 === e
                ? (this.cbs.onattribdata(this.sectionStart, this.index),
                  (this.sectionStart = -1),
                  this.cbs.onattribend(1, this.index),
                  (this.state = 11),
                  this.stateBeforeAttrName(e))
                : (39 !== e && 60 !== e && 61 !== e && 96 !== e) ||
                  this.cbs.onerr(18, this.index);
            }
            stateBeforeDeclaration(e) {
              91 === e
                ? ((this.state = 26), (this.sequenceIndex = 0))
                : (this.state = 45 === e ? 25 : 23);
            }
            stateInDeclaration(e) {
              (62 === e || this.fastForwardTo(62)) &&
                ((this.state = 1), (this.sectionStart = this.index + 1));
            }
            stateInProcessingInstruction(e) {
              (62 === e || this.fastForwardTo(62)) &&
                (this.cbs.onprocessinginstruction(
                  this.sectionStart,
                  this.index
                ),
                (this.state = 1),
                (this.sectionStart = this.index + 1));
            }
            stateBeforeComment(e) {
              45 === e
                ? ((this.state = 28),
                  (this.currentSequence = Lu.CommentEnd),
                  (this.sequenceIndex = 2),
                  (this.sectionStart = this.index + 1))
                : (this.state = 23);
            }
            stateInSpecialComment(e) {
              (62 === e || this.fastForwardTo(62)) &&
                (this.cbs.oncomment(this.sectionStart, this.index),
                (this.state = 1),
                (this.sectionStart = this.index + 1));
            }
            stateBeforeSpecialS(e) {
              e === Lu.ScriptEnd[3]
                ? this.startSpecial(Lu.ScriptEnd, 4)
                : e === Lu.StyleEnd[3]
                ? this.startSpecial(Lu.StyleEnd, 4)
                : ((this.state = 6), this.stateInTagName(e));
            }
            stateBeforeSpecialT(e) {
              e === Lu.TitleEnd[3]
                ? this.startSpecial(Lu.TitleEnd, 4)
                : e === Lu.TextareaEnd[3]
                ? this.startSpecial(Lu.TextareaEnd, 4)
                : ((this.state = 6), this.stateInTagName(e));
            }
            startEntity() {}
            stateInEntity() {}
            parse(e) {
              for (this.buffer = e; this.index < this.buffer.length; ) {
                const e = this.buffer.charCodeAt(this.index);
                switch (
                  (10 === e &&
                    33 !== this.state &&
                    this.newlines.push(this.index),
                  this.state)
                ) {
                  case 1:
                    this.stateText(e);
                    break;
                  case 2:
                    this.stateInterpolationOpen(e);
                    break;
                  case 3:
                    this.stateInterpolation(e);
                    break;
                  case 4:
                    this.stateInterpolationClose(e);
                    break;
                  case 31:
                    this.stateSpecialStartSequence(e);
                    break;
                  case 32:
                    this.stateInRCDATA(e);
                    break;
                  case 26:
                    this.stateCDATASequence(e);
                    break;
                  case 19:
                    this.stateInAttrValueDoubleQuotes(e);
                    break;
                  case 12:
                    this.stateInAttrName(e);
                    break;
                  case 13:
                    this.stateInDirName(e);
                    break;
                  case 14:
                    this.stateInDirArg(e);
                    break;
                  case 15:
                    this.stateInDynamicDirArg(e);
                    break;
                  case 16:
                    this.stateInDirModifier(e);
                    break;
                  case 28:
                    this.stateInCommentLike(e);
                    break;
                  case 27:
                    this.stateInSpecialComment(e);
                    break;
                  case 11:
                    this.stateBeforeAttrName(e);
                    break;
                  case 6:
                    this.stateInTagName(e);
                    break;
                  case 34:
                    this.stateInSFCRootTagName(e);
                    break;
                  case 9:
                    this.stateInClosingTagName(e);
                    break;
                  case 5:
                    this.stateBeforeTagName(e);
                    break;
                  case 17:
                    this.stateAfterAttrName(e);
                    break;
                  case 20:
                    this.stateInAttrValueSingleQuotes(e);
                    break;
                  case 18:
                    this.stateBeforeAttrValue(e);
                    break;
                  case 8:
                    this.stateBeforeClosingTagName(e);
                    break;
                  case 10:
                    this.stateAfterClosingTagName(e);
                    break;
                  case 29:
                    this.stateBeforeSpecialS(e);
                    break;
                  case 30:
                    this.stateBeforeSpecialT(e);
                    break;
                  case 21:
                    this.stateInAttrValueNoQuotes(e);
                    break;
                  case 7:
                    this.stateInSelfClosingTag(e);
                    break;
                  case 23:
                    this.stateInDeclaration(e);
                    break;
                  case 22:
                    this.stateBeforeDeclaration(e);
                    break;
                  case 25:
                    this.stateBeforeComment(e);
                    break;
                  case 24:
                    this.stateInProcessingInstruction(e);
                    break;
                  case 33:
                    this.stateInEntity();
                }
                this.index++;
              }
              this.cleanup(), this.finish();
            }
            cleanup() {
              this.sectionStart !== this.index &&
                (1 === this.state ||
                (32 === this.state && 0 === this.sequenceIndex)
                  ? (this.cbs.ontext(this.sectionStart, this.index),
                    (this.sectionStart = this.index))
                  : (19 !== this.state &&
                      20 !== this.state &&
                      21 !== this.state) ||
                    (this.cbs.onattribdata(this.sectionStart, this.index),
                    (this.sectionStart = this.index)));
            }
            finish() {
              this.handleTrailingData(), this.cbs.onend();
            }
            handleTrailingData() {
              const e = this.buffer.length;
              this.sectionStart >= e ||
                (28 === this.state
                  ? this.currentSequence === Lu.CdataEnd
                    ? this.cbs.oncdata(this.sectionStart, e)
                    : this.cbs.oncomment(this.sectionStart, e)
                  : 6 === this.state ||
                    11 === this.state ||
                    18 === this.state ||
                    17 === this.state ||
                    12 === this.state ||
                    13 === this.state ||
                    14 === this.state ||
                    15 === this.state ||
                    16 === this.state ||
                    20 === this.state ||
                    19 === this.state ||
                    21 === this.state ||
                    9 === this.state ||
                    this.cbs.ontext(this.sectionStart, e));
            }
            emitCodePoint(e, t) {}
          })(Ed, {
            onerr: Wd,
            ontext(e, t) {
              Rd(Ad(e, t), e, t);
            },
            ontextentity(e, t, o) {
              Rd(e, t, o);
            },
            oninterpolation(e, t) {
              if (Sd) return Rd(Ad(e, t), e, t);
              let o = e + Cd.delimiterOpen.length,
                n = t - Cd.delimiterClose.length;
              for (; ju(md.charCodeAt(o)); ) o++;
              for (; ju(md.charCodeAt(n - 1)); ) n--;
              let r = Ad(o, n);
              r.includes("&") && (r = hd.decodeEntities(r, !1)),
                qd({ type: 5, content: Hd(r, !1, Fd(o, n)), loc: Fd(e, t) });
            },
            onopentagname(e, t) {
              const o = Ad(e, t);
              gd = {
                type: 1,
                tag: o,
                ns: hd.getNamespace(o, Ed[0], hd.ns),
                tagType: 0,
                props: [],
                children: [],
                loc: Fd(e - 1, t),
                codegenNode: void 0,
              };
            },
            onopentagend(e) {
              Od(e);
            },
            onclosetag(e, t) {
              const o = Ad(e, t);
              if (!hd.isVoidTag(o)) {
                let n = !1;
                for (let e = 0; e < Ed.length; e++) {
                  if (Ed[e].tag.toLowerCase() === o.toLowerCase()) {
                    (n = !0), e > 0 && Wd(24, Ed[0].loc.start.offset);
                    for (let o = 0; o <= e; o++) {
                      Nd(Ed.shift(), t, o < e);
                    }
                    break;
                  }
                }
                n || Wd(23, jd(e, 60));
              }
            },
            onselfclosingtag(e) {
              const t = gd.tag;
              (gd.isSelfClosing = !0),
                Od(e),
                Ed[0] && Ed[0].tag === t && Nd(Ed.shift(), e);
            },
            onattribname(e, t) {
              bd = {
                type: 6,
                name: Ad(e, t),
                nameLoc: Fd(e, t),
                value: void 0,
                loc: Fd(e),
              };
            },
            ondirname(e, t) {
              const o = Ad(e, t),
                n =
                  "." === o || ":" === o
                    ? "bind"
                    : "@" === o
                    ? "on"
                    : "#" === o
                    ? "slot"
                    : o.slice(2);
              if ((Sd || "" !== n || Wd(26, e), Sd || "" === n))
                bd = {
                  type: 6,
                  name: o,
                  nameLoc: Fd(e, t),
                  value: void 0,
                  loc: Fd(e),
                };
              else if (
                ((bd = {
                  type: 7,
                  name: n,
                  rawName: o,
                  exp: void 0,
                  arg: void 0,
                  modifiers: "." === o ? [xu("prop")] : [],
                  loc: Fd(e),
                }),
                "pre" === n)
              ) {
                (Sd = Cd.inVPre = !0), (wd = gd);
                const e = gd.props;
                for (let t = 0; t < e.length; t++)
                  7 === e[t].type && (e[t] = Vd(e[t]));
              }
            },
            ondirarg(e, t) {
              if (e === t) return;
              const o = Ad(e, t);
              if (Sd) (bd.name += o), $d(bd.nameLoc, t);
              else {
                const n = "[" !== o[0];
                bd.arg = Hd(n ? o : o.slice(1, -1), n, Fd(e, t), n ? 3 : 0);
              }
            },
            ondirmodifier(e, t) {
              const o = Ad(e, t);
              if (Sd) (bd.name += "." + o), $d(bd.nameLoc, t);
              else if ("slot" === bd.name) {
                const e = bd.arg;
                e && ((e.content += "." + o), $d(e.loc, t));
              } else {
                const n = xu(o, !0, Fd(e, t));
                bd.modifiers.push(n);
              }
            },
            onattribdata(e, t) {
              (vd += Ad(e, t)), yd < 0 && (yd = e), (_d = t);
            },
            onattribentity(e, t, o) {
              (vd += e), yd < 0 && (yd = t), (_d = o);
            },
            onattribnameend(e) {
              const t = bd.loc.start.offset,
                o = Ad(t, e);
              7 === bd.type && (bd.rawName = o),
                gd.props.some(
                  (e) => (7 === e.type ? e.rawName : e.name) === o
                ) && Wd(2, t);
            },
            onattribend(e, t) {
              if (gd && bd) {
                if (($d(bd.loc, t), 0 !== e))
                  if (
                    (vd.includes("&") && (vd = hd.decodeEntities(vd, !0)),
                    6 === bd.type)
                  )
                    "class" === bd.name && (vd = Bd(vd).trim()),
                      1 !== e || vd || Wd(13, t),
                      (bd.value = {
                        type: 2,
                        content: vd,
                        loc: 1 === e ? Fd(yd, _d) : Fd(yd - 1, _d + 1),
                      }),
                      Cd.inSFCRoot &&
                        "template" === gd.tag &&
                        "lang" === bd.name &&
                        vd &&
                        "html" !== vd &&
                        Cd.enterRCDATA(Pu("</template"), 0);
                  else {
                    let e = 0;
                    (bd.exp = Hd(vd, !1, Fd(yd, _d), 0, e)),
                      "for" === bd.name &&
                        (bd.forParseResult = (function (e) {
                          const t = e.loc,
                            o = e.content,
                            n = o.match(dd);
                          if (!n) return;
                          const [, r, a] = n,
                            s = (e, o, n = !1) => {
                              const r = t.start.offset + o;
                              return Hd(
                                e,
                                !1,
                                Fd(r, r + e.length),
                                0,
                                n ? 1 : 0
                              );
                            },
                            i = {
                              source: s(a.trim(), o.indexOf(a, r.length)),
                              value: void 0,
                              key: void 0,
                              index: void 0,
                              finalized: !1,
                            };
                          let c = r.trim().replace(kd, "").trim();
                          const l = r.indexOf(c),
                            u = c.match(Td);
                          if (u) {
                            c = c.replace(Td, "").trim();
                            const e = u[1].trim();
                            let t;
                            if (
                              (e &&
                                ((t = o.indexOf(e, l + c.length)),
                                (i.key = s(e, t, !0))),
                              u[2])
                            ) {
                              const n = u[2].trim();
                              n &&
                                (i.index = s(
                                  n,
                                  o.indexOf(
                                    n,
                                    i.key ? t + e.length : l + c.length
                                  ),
                                  !0
                                ));
                            }
                          }
                          c && (i.value = s(c, l, !0));
                          return i;
                        })(bd.exp));
                    let t = -1;
                    "bind" === bd.name &&
                      (t = bd.modifiers.findIndex(
                        (e) => "sync" === e.content
                      )) > -1 &&
                      Du(
                        "COMPILER_V_BIND_SYNC",
                        hd,
                        bd.loc,
                        bd.arg.loc.source
                      ) &&
                      ((bd.name = "model"), bd.modifiers.splice(t, 1));
                  }
                (7 === bd.type && "pre" === bd.name) || gd.props.push(bd);
              }
              (vd = ""), (yd = _d = -1);
            },
            oncomment(e, t) {
              hd.comments &&
                qd({ type: 3, content: Ad(e, t), loc: Fd(e - 4, t + 3) });
            },
            onend() {
              const e = md.length;
              for (let t = 0; t < Ed.length; t++)
                Nd(Ed[t], e - 1), Wd(24, Ed[t].loc.start.offset);
            },
            oncdata(e, t) {
              0 !== Ed[0].ns ? Rd(Ad(e, t), e, t) : Wd(1, e - 9);
            },
            onprocessinginstruction(e) {
              0 === (Ed[0] ? Ed[0].ns : hd.ns) && Wd(21, e - 1);
            },
          }),
          Td = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
          kd = /^\(|\)$/g;
        function Ad(e, t) {
          return md.slice(e, t);
        }
        function Od(e) {
          Cd.inSFCRoot && (gd.innerLoc = Fd(e + 1, e + 1)), qd(gd);
          const { tag: t, ns: o } = gd;
          0 === o && hd.isPreTag(t) && xd++,
            hd.isVoidTag(t)
              ? Nd(gd, e)
              : (Ed.unshift(gd), (1 !== o && 2 !== o) || (Cd.inXML = !0)),
            (gd = null);
        }
        function Rd(e, t, o) {
          {
            const t = Ed[0] && Ed[0].tag;
            "script" !== t &&
              "style" !== t &&
              e.includes("&") &&
              (e = hd.decodeEntities(e, !1));
          }
          const n = Ed[0] || fd,
            r = n.children[n.children.length - 1];
          r && 2 === r.type
            ? ((r.content += e), $d(r.loc, o))
            : n.children.push({ type: 2, content: e, loc: Fd(t, o) });
        }
        function Nd(e, t, o = !1) {
          $d(
            e.loc,
            o
              ? jd(t, 60)
              : (function (e, t) {
                  let o = e;
                  for (; md.charCodeAt(o) !== t && o < md.length - 1; ) o++;
                  return o;
                })(t, 62) + 1
          ),
            Cd.inSFCRoot &&
              (e.children.length
                ? (e.innerLoc.end = p(
                    {},
                    e.children[e.children.length - 1].loc.end
                  ))
                : (e.innerLoc.end = p({}, e.innerLoc.start)),
              (e.innerLoc.source = Ad(
                e.innerLoc.start.offset,
                e.innerLoc.end.offset
              )));
          const { tag: n, ns: r, children: a } = e;
          if (
            (Sd ||
              ("slot" === n
                ? (e.tagType = 2)
                : Pd(e)
                ? (e.tagType = 3)
                : (function ({ tag: e, props: t }) {
                    if (hd.isCustomElement(e)) return !1;
                    if (
                      "component" === e ||
                      ((o = e.charCodeAt(0)), o > 64 && o < 91) ||
                      $u(e) ||
                      (hd.isBuiltInComponent && hd.isBuiltInComponent(e)) ||
                      (hd.isNativeTag && !hd.isNativeTag(e))
                    )
                      return !0;
                    var o;
                    for (let e = 0; e < t.length; e++) {
                      const o = t[e];
                      if (6 === o.type) {
                        if ("is" === o.name && o.value) {
                          if (o.value.content.startsWith("vue:")) return !0;
                          if (Du("COMPILER_IS_ON_ELEMENT", hd, o.loc))
                            return !0;
                        }
                      } else if (
                        "bind" === o.name &&
                        td(o.arg, "is") &&
                        Du("COMPILER_IS_ON_ELEMENT", hd, o.loc)
                      )
                        return !0;
                    }
                    return !1;
                  })(e) && (e.tagType = 1)),
            Cd.inRCDATA || (e.children = Md(a)),
            0 === r && hd.isIgnoreNewlineTag(n))
          ) {
            const e = a[0];
            e && 2 === e.type && (e.content = e.content.replace(/^\r?\n/, ""));
          }
          0 === r && hd.isPreTag(n) && xd--,
            wd === e && ((Sd = Cd.inVPre = !1), (wd = null)),
            Cd.inXML && 0 === (Ed[0] ? Ed[0].ns : hd.ns) && (Cd.inXML = !1);
          {
            const t = e.props;
            if (
              !Cd.inSFCRoot &&
              Uu("COMPILER_NATIVE_TEMPLATE", hd) &&
              "template" === e.tag &&
              !Pd(e)
            ) {
              const t = Ed[0] || fd,
                o = t.children.indexOf(e);
              t.children.splice(o, 1, ...e.children);
            }
            const o = t.find(
              (e) => 6 === e.type && "inline-template" === e.name
            );
            o &&
              Du("COMPILER_INLINE_TEMPLATE", hd, o.loc) &&
              e.children.length &&
              (o.value = {
                type: 2,
                content: Ad(
                  e.children[0].loc.start.offset,
                  e.children[e.children.length - 1].loc.end.offset
                ),
                loc: o.loc,
              });
          }
        }
        function jd(e, t) {
          let o = e;
          for (; md.charCodeAt(o) !== t && o >= 0; ) o--;
          return o;
        }
        const Id = new Set(["if", "else", "else-if", "for", "slot"]);
        function Pd({ tag: e, props: t }) {
          if ("template" === e)
            for (let e = 0; e < t.length; e++)
              if (7 === t[e].type && Id.has(t[e].name)) return !0;
          return !1;
        }
        const Ld = /\r\n/g;
        function Md(e) {
          const t = "preserve" !== hd.whitespace;
          let o = !1;
          for (let n = 0; n < e.length; n++) {
            const r = e[n];
            if (2 === r.type)
              if (xd) r.content = r.content.replace(Ld, "\n");
              else if (Ud(r.content)) {
                const a = e[n - 1] && e[n - 1].type,
                  s = e[n + 1] && e[n + 1].type;
                !a ||
                !s ||
                (t &&
                  ((3 === a && (3 === s || 1 === s)) ||
                    (1 === a && (3 === s || (1 === s && Dd(r.content))))))
                  ? ((o = !0), (e[n] = null))
                  : (r.content = " ");
              } else t && (r.content = Bd(r.content));
          }
          return o ? e.filter(Boolean) : e;
        }
        function Ud(e) {
          for (let t = 0; t < e.length; t++)
            if (!ju(e.charCodeAt(t))) return !1;
          return !0;
        }
        function Dd(e) {
          for (let t = 0; t < e.length; t++) {
            const o = e.charCodeAt(t);
            if (10 === o || 13 === o) return !0;
          }
          return !1;
        }
        function Bd(e) {
          let t = "",
            o = !1;
          for (let n = 0; n < e.length; n++)
            ju(e.charCodeAt(n))
              ? o || ((t += " "), (o = !0))
              : ((t += e[n]), (o = !1));
          return t;
        }
        function qd(e) {
          (Ed[0] || fd).children.push(e);
        }
        function Fd(e, t) {
          return {
            start: Cd.getPos(e),
            end: null == t ? t : Cd.getPos(t),
            source: null == t ? t : Ad(e, t),
          };
        }
        function zd(e) {
          return Fd(e.start.offset, e.end.offset);
        }
        function $d(e, t) {
          (e.end = Cd.getPos(t)), (e.source = Ad(e.start.offset, t));
        }
        function Vd(e) {
          const t = {
            type: 6,
            name: e.rawName,
            nameLoc: Fd(
              e.loc.start.offset,
              e.loc.start.offset + e.rawName.length
            ),
            value: void 0,
            loc: e.loc,
          };
          if (e.exp) {
            const o = e.exp.loc;
            o.end.offset < e.loc.end.offset &&
              (o.start.offset--,
              o.start.column--,
              o.end.offset++,
              o.end.column++),
              (t.value = { type: 2, content: e.exp.content, loc: o });
          }
          return t;
        }
        function Hd(e, t = !1, o, n = 0, r = 0) {
          return xu(e, t, o, n);
        }
        function Wd(e, t, o) {
          hd.onError(Fu(e, Fd(t, t)));
        }
        function Yd(e, t) {
          if (
            (Cd.reset(),
            (gd = null),
            (bd = null),
            (vd = ""),
            (yd = -1),
            (_d = -1),
            (Ed.length = 0),
            (md = e),
            (hd = p({}, pd)),
            t)
          ) {
            let e;
            for (e in t) null != t[e] && (hd[e] = t[e]);
          }
          (Cd.mode =
            "html" === hd.parseMode ? 1 : "sfc" === hd.parseMode ? 2 : 0),
            (Cd.inXML = 1 === hd.ns || 2 === hd.ns);
          const o = t && t.delimiters;
          o && ((Cd.delimiterOpen = Pu(o[0])), (Cd.delimiterClose = Pu(o[1])));
          const n = (fd = (function (e, t = "") {
            return {
              type: 0,
              source: t,
              children: e,
              helpers: new Set(),
              components: [],
              directives: [],
              hoists: [],
              imports: [],
              cached: [],
              temps: 0,
              codegenNode: void 0,
              loc: gu,
            };
          })([], e));
          return (
            Cd.parse(md),
            (n.loc = Fd(0, e.length)),
            (n.children = Md(n.children)),
            (fd = null),
            n
          );
        }
        function Kd(e, t) {
          Jd(e, void 0, t, !!Gd(e));
        }
        function Gd(e) {
          const t = e.children.filter((e) => 3 !== e.type);
          return 1 !== t.length || 1 !== t[0].type || ad(t[0]) ? null : t[0];
        }
        function Jd(e, t, o, n = !1, r = !1) {
          const { children: a } = e,
            s = [];
          for (let t = 0; t < a.length; t++) {
            const i = a[t];
            if (1 === i.type && 0 === i.tagType) {
              const e = n ? 0 : Xd(i, o);
              if (e > 0) {
                if (e >= 2) {
                  (i.codegenNode.patchFlag = -1), s.push(i);
                  continue;
                }
              } else {
                const e = i.codegenNode;
                if (13 === e.type) {
                  const t = e.patchFlag;
                  if ((void 0 === t || 512 === t || 1 === t) && ep(i, o) >= 2) {
                    const t = tp(i);
                    t && (e.props = o.hoist(t));
                  }
                  e.dynamicProps && (e.dynamicProps = o.hoist(e.dynamicProps));
                }
              }
            } else if (12 === i.type) {
              if ((n ? 0 : Xd(i, o)) >= 2) {
                s.push(i);
                continue;
              }
            }
            if (1 === i.type) {
              const t = 1 === i.tagType;
              t && o.scopes.vSlot++, Jd(i, e, o, !1, r), t && o.scopes.vSlot--;
            } else if (11 === i.type) Jd(i, e, o, 1 === i.children.length, !0);
            else if (9 === i.type)
              for (let t = 0; t < i.branches.length; t++)
                Jd(i.branches[t], e, o, 1 === i.branches[t].children.length, r);
          }
          let i = !1;
          const c = [];
          if (s.length === a.length && 1 === e.type)
            if (
              0 === e.tagType &&
              e.codegenNode &&
              13 === e.codegenNode.type &&
              g(e.codegenNode.children)
            )
              (e.codegenNode.children = l(vu(e.codegenNode.children))),
                (i = !0);
            else if (
              1 === e.tagType &&
              e.codegenNode &&
              13 === e.codegenNode.type &&
              e.codegenNode.children &&
              !g(e.codegenNode.children) &&
              15 === e.codegenNode.children.type
            ) {
              const t = u(e.codegenNode, "default");
              t &&
                (c.push(o.cached.length),
                (t.returns = l(vu(t.returns))),
                (i = !0));
            } else if (
              3 === e.tagType &&
              t &&
              1 === t.type &&
              1 === t.tagType &&
              t.codegenNode &&
              13 === t.codegenNode.type &&
              t.codegenNode.children &&
              !g(t.codegenNode.children) &&
              15 === t.codegenNode.children.type
            ) {
              const n = Qu(e, "slot", !0),
                r = n && n.arg && u(t.codegenNode, n.arg);
              r &&
                (c.push(o.cached.length),
                (r.returns = l(vu(r.returns))),
                (i = !0));
            }
          if (!i)
            for (const e of s)
              c.push(o.cached.length), (e.codegenNode = o.cache(e.codegenNode));
          function l(e) {
            const t = o.cache(e);
            return r && o.hmr && (t.needArraySpread = !0), t;
          }
          function u(e, t) {
            if (e.children && !g(e.children) && 15 === e.children.type) {
              const o = e.children.properties.find(
                (e) => e.key === t || e.key.content === t
              );
              return o && o.value;
            }
          }
          c.length &&
            1 === e.type &&
            1 === e.tagType &&
            e.codegenNode &&
            13 === e.codegenNode.type &&
            e.codegenNode.children &&
            !g(e.codegenNode.children) &&
            15 === e.codegenNode.children.type &&
            e.codegenNode.children.properties.push(
              _u("__", xu(JSON.stringify(c), !1))
            ),
            s.length && o.transformHoist && o.transformHoist(a, o, e);
        }
        function Xd(e, t) {
          const { constantCache: o } = t;
          switch (e.type) {
            case 1:
              if (0 !== e.tagType) return 0;
              const n = o.get(e);
              if (void 0 !== n) return n;
              const r = e.codegenNode;
              if (13 !== r.type) return 0;
              if (
                r.isBlock &&
                "svg" !== e.tag &&
                "foreignObject" !== e.tag &&
                "math" !== e.tag
              )
                return 0;
              if (void 0 === r.patchFlag) {
                let n = 3;
                const a = ep(e, t);
                if (0 === a) return o.set(e, 0), 0;
                a < n && (n = a);
                for (let r = 0; r < e.children.length; r++) {
                  const a = Xd(e.children[r], t);
                  if (0 === a) return o.set(e, 0), 0;
                  a < n && (n = a);
                }
                if (n > 1)
                  for (let r = 0; r < e.props.length; r++) {
                    const a = e.props[r];
                    if (7 === a.type && "bind" === a.name && a.exp) {
                      const r = Xd(a.exp, t);
                      if (0 === r) return o.set(e, 0), 0;
                      r < n && (n = r);
                    }
                  }
                if (r.isBlock) {
                  for (let t = 0; t < e.props.length; t++) {
                    if (7 === e.props[t].type) return o.set(e, 0), 0;
                  }
                  t.removeHelper(Ll),
                    t.removeHelper(ku(t.inSSR, r.isComponent)),
                    (r.isBlock = !1),
                    t.helper(Tu(t.inSSR, r.isComponent));
                }
                return o.set(e, n), n;
              }
              return o.set(e, 0), 0;
            case 2:
            case 3:
              return 3;
            case 9:
            case 11:
            case 10:
            default:
              return 0;
            case 5:
            case 12:
              return Xd(e.content, t);
            case 4:
              return e.constType;
            case 8:
              let a = 3;
              for (let o = 0; o < e.children.length; o++) {
                const n = e.children[o];
                if (x(n) || S(n)) continue;
                const r = Xd(n, t);
                if (0 === r) return 0;
                r < a && (a = r);
              }
              return a;
            case 20:
              return 2;
          }
        }
        const Zd = new Set([Ql, eu, tu, ou]);
        function Qd(e, t) {
          if (14 === e.type && !x(e.callee) && Zd.has(e.callee)) {
            const o = e.arguments[0];
            if (4 === o.type) return Xd(o, t);
            if (14 === o.type) return Qd(o, t);
          }
          return 0;
        }
        function ep(e, t) {
          let o = 3;
          const n = tp(e);
          if (n && 15 === n.type) {
            const { properties: e } = n;
            for (let n = 0; n < e.length; n++) {
              const { key: r, value: a } = e[n],
                s = Xd(r, t);
              if (0 === s) return s;
              let i;
              if (
                (s < o && (o = s),
                (i = 4 === a.type ? Xd(a, t) : 14 === a.type ? Qd(a, t) : 0),
                0 === i)
              )
                return i;
              i < o && (o = i);
            }
          }
          return o;
        }
        function tp(e) {
          const t = e.codegenNode;
          if (13 === t.type) return t.props;
        }
        function op(
          e,
          {
            filename: t = "",
            prefixIdentifiers: o = !1,
            hoistStatic: n = !1,
            hmr: r = !1,
            cacheHandlers: a = !1,
            nodeTransforms: i = [],
            directiveTransforms: l = {},
            transformHoist: u = null,
            isBuiltInComponent: d = c,
            isCustomElement: p = c,
            expressionPlugins: h = [],
            scopeId: f = null,
            slotted: m = !0,
            ssr: g = !1,
            inSSR: b = !1,
            ssrCssVars: v = "",
            bindingMetadata: y = s,
            inline: _ = !1,
            isTS: S = !1,
            onError: w = Bu,
            onWarn: E = qu,
            compatConfig: C,
          }
        ) {
          const T = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/),
            k = {
              filename: t,
              selfName: T && U(P(T[1])),
              prefixIdentifiers: o,
              hoistStatic: n,
              hmr: r,
              cacheHandlers: a,
              nodeTransforms: i,
              directiveTransforms: l,
              transformHoist: u,
              isBuiltInComponent: d,
              isCustomElement: p,
              expressionPlugins: h,
              scopeId: f,
              slotted: m,
              ssr: g,
              inSSR: b,
              ssrCssVars: v,
              bindingMetadata: y,
              inline: _,
              isTS: S,
              onError: w,
              onWarn: E,
              compatConfig: C,
              root: e,
              helpers: new Map(),
              components: new Set(),
              directives: new Set(),
              hoists: [],
              imports: [],
              cached: [],
              constantCache: new WeakMap(),
              temps: 0,
              identifiers: Object.create(null),
              scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 },
              parent: null,
              grandParent: null,
              currentNode: e,
              childIndex: 0,
              inVOnce: !1,
              helper(e) {
                const t = k.helpers.get(e) || 0;
                return k.helpers.set(e, t + 1), e;
              },
              removeHelper(e) {
                const t = k.helpers.get(e);
                if (t) {
                  const o = t - 1;
                  o ? k.helpers.set(e, o) : k.helpers.delete(e);
                }
              },
              helperString: (e) => `_${mu[k.helper(e)]}`,
              replaceNode(e) {
                k.parent.children[k.childIndex] = k.currentNode = e;
              },
              removeNode(e) {
                const t = k.parent.children,
                  o = e ? t.indexOf(e) : k.currentNode ? k.childIndex : -1;
                e && e !== k.currentNode
                  ? k.childIndex > o && (k.childIndex--, k.onNodeRemoved())
                  : ((k.currentNode = null), k.onNodeRemoved()),
                  k.parent.children.splice(o, 1);
              },
              onNodeRemoved: c,
              addIdentifiers(e) {},
              removeIdentifiers(e) {},
              hoist(e) {
                x(e) && (e = xu(e)), k.hoists.push(e);
                const t = xu(`_hoisted_${k.hoists.length}`, !1, e.loc, 2);
                return (t.hoisted = e), t;
              },
              cache(e, t = !1, o = !1) {
                const n = (function (e, t, o = !1, n = !1) {
                  return {
                    type: 20,
                    index: e,
                    value: t,
                    needPauseTracking: o,
                    inVOnce: n,
                    needArraySpread: !1,
                    loc: gu,
                  };
                })(k.cached.length, e, t, o);
                return k.cached.push(n), n;
              },
            };
          return (k.filters = new Set()), k;
        }
        function np(e, t) {
          const o = op(e, t);
          rp(e, o),
            t.hoistStatic && Kd(e, o),
            t.ssr ||
              (function (e, t) {
                const { helper: o } = t,
                  { children: n } = e;
                if (1 === n.length) {
                  const o = Gd(e);
                  if (o && o.codegenNode) {
                    const n = o.codegenNode;
                    13 === n.type && Au(n, t), (e.codegenNode = n);
                  } else e.codegenNode = n[0];
                } else if (n.length > 1) {
                  let n = 64;
                  0,
                    (e.codegenNode = bu(
                      t,
                      o(Rl),
                      void 0,
                      e.children,
                      n,
                      void 0,
                      void 0,
                      !0,
                      void 0,
                      !1
                    ));
                }
              })(e, o),
            (e.helpers = new Set([...o.helpers.keys()])),
            (e.components = [...o.components]),
            (e.directives = [...o.directives]),
            (e.imports = o.imports),
            (e.hoists = o.hoists),
            (e.temps = o.temps),
            (e.cached = o.cached),
            (e.transformed = !0),
            (e.filters = [...o.filters]);
        }
        function rp(e, t) {
          t.currentNode = e;
          const { nodeTransforms: o } = t,
            n = [];
          for (let r = 0; r < o.length; r++) {
            const a = o[r](e, t);
            if ((a && (g(a) ? n.push(...a) : n.push(a)), !t.currentNode))
              return;
            e = t.currentNode;
          }
          switch (e.type) {
            case 3:
              t.ssr || t.helper(ql);
              break;
            case 5:
              t.ssr || t.helper(Xl);
              break;
            case 9:
              for (let o = 0; o < e.branches.length; o++) rp(e.branches[o], t);
              break;
            case 10:
            case 11:
            case 1:
            case 0:
              !(function (e, t) {
                let o = 0;
                const n = () => {
                  o--;
                };
                for (; o < e.children.length; o++) {
                  const r = e.children[o];
                  x(r) ||
                    ((t.grandParent = t.parent),
                    (t.parent = e),
                    (t.childIndex = o),
                    (t.onNodeRemoved = n),
                    rp(r, t));
                }
              })(e, t);
          }
          t.currentNode = e;
          let r = n.length;
          for (; r--; ) n[r]();
        }
        function ap(e, t) {
          const o = x(e) ? (t) => t === e : (t) => e.test(t);
          return (e, n) => {
            if (1 === e.type) {
              const { props: r } = e;
              if (3 === e.tagType && r.some(nd)) return;
              const a = [];
              for (let s = 0; s < r.length; s++) {
                const i = r[s];
                if (7 === i.type && o(i.name)) {
                  r.splice(s, 1), s--;
                  const o = t(e, i, n);
                  o && a.push(o);
                }
              }
              return a;
            }
          };
        }
        const sp = "/*@__PURE__*/",
          ip = (e) => `${mu[e]}: _${mu[e]}`;
        function cp(e, t = {}) {
          const o = (function (
            e,
            {
              mode: t = "function",
              prefixIdentifiers: o = "module" === t,
              sourceMap: n = !1,
              filename: r = "template.vue.html",
              scopeId: a = null,
              optimizeImports: s = !1,
              runtimeGlobalName: i = "Vue",
              runtimeModuleName: c = "vue",
              ssrRuntimeModuleName: l = "vue/server-renderer",
              ssr: u = !1,
              isTS: d = !1,
              inSSR: p = !1,
            }
          ) {
            const h = {
              mode: t,
              prefixIdentifiers: o,
              sourceMap: n,
              filename: r,
              scopeId: a,
              optimizeImports: s,
              runtimeGlobalName: i,
              runtimeModuleName: c,
              ssrRuntimeModuleName: l,
              ssr: u,
              isTS: d,
              inSSR: p,
              source: e.source,
              code: "",
              column: 1,
              line: 1,
              offset: 0,
              indentLevel: 0,
              pure: !1,
              map: void 0,
              helper: (e) => `_${mu[e]}`,
              push(e, t = -2, o) {
                h.code += e;
              },
              indent() {
                f(++h.indentLevel);
              },
              deindent(e = !1) {
                e ? --h.indentLevel : f(--h.indentLevel);
              },
              newline() {
                f(h.indentLevel);
              },
            };
            function f(e) {
              h.push("\n" + "  ".repeat(e), 0);
            }
            return h;
          })(e, t);
          t.onContextCreated && t.onContextCreated(o);
          const {
              mode: n,
              push: r,
              prefixIdentifiers: a,
              indent: s,
              deindent: i,
              newline: c,
              scopeId: l,
              ssr: u,
            } = o,
            d = Array.from(e.helpers),
            p = d.length > 0,
            h = !a && "module" !== n;
          !(function (e, t) {
            const {
                ssr: o,
                prefixIdentifiers: n,
                push: r,
                newline: a,
                runtimeModuleName: s,
                runtimeGlobalName: i,
                ssrRuntimeModuleName: c,
              } = t,
              l = i,
              u = Array.from(e.helpers);
            if (
              u.length > 0 &&
              (r(`const _Vue = ${l}\n`, -1), e.hoists.length)
            ) {
              r(
                `const { ${[Dl, Bl, ql, Fl, zl]
                  .filter((e) => u.includes(e))
                  .map(ip)
                  .join(", ")} } = _Vue\n`,
                -1
              );
            }
            (function (e, t) {
              if (!e.length) return;
              t.pure = !0;
              const { push: o, newline: n } = t;
              n();
              for (let r = 0; r < e.length; r++) {
                const a = e[r];
                a && (o(`const _hoisted_${r + 1} = `), pp(a, t), n());
              }
              t.pure = !1;
            })(e.hoists, t),
              a(),
              r("return ");
          })(e, o);
          if (
            (r(
              `function ${u ? "ssrRender" : "render"}(${(u
                ? ["_ctx", "_push", "_parent", "_attrs"]
                : ["_ctx", "_cache"]
              ).join(", ")}) {`
            ),
            s(),
            h &&
              (r("with (_ctx) {"),
              s(),
              p && (r(`const { ${d.map(ip).join(", ")} } = _Vue\n`, -1), c())),
            e.components.length &&
              (lp(e.components, "component", o),
              (e.directives.length || e.temps > 0) && c()),
            e.directives.length &&
              (lp(e.directives, "directive", o), e.temps > 0 && c()),
            e.filters &&
              e.filters.length &&
              (c(), lp(e.filters, "filter", o), c()),
            e.temps > 0)
          ) {
            r("let ");
            for (let t = 0; t < e.temps; t++)
              r(`${t > 0 ? ", " : ""}_temp${t}`);
          }
          return (
            (e.components.length || e.directives.length || e.temps) &&
              (r("\n", 0), c()),
            u || r("return "),
            e.codegenNode ? pp(e.codegenNode, o) : r("null"),
            h && (i(), r("}")),
            i(),
            r("}"),
            {
              ast: e,
              code: o.code,
              preamble: "",
              map: o.map ? o.map.toJSON() : void 0,
            }
          );
        }
        function lp(e, t, { helper: o, push: n, newline: r, isTS: a }) {
          const s = o("filter" === t ? Wl : "component" === t ? $l : Hl);
          for (let o = 0; o < e.length; o++) {
            let i = e[o];
            const c = i.endsWith("__self");
            c && (i = i.slice(0, -6)),
              n(
                `const ${ud(i, t)} = ${s}(${JSON.stringify(i)}${
                  c ? ", true" : ""
                })${a ? "!" : ""}`
              ),
              o < e.length - 1 && r();
          }
        }
        function up(e, t) {
          const o = e.length > 3 || !1;
          t.push("["),
            o && t.indent(),
            dp(e, t, o),
            o && t.deindent(),
            t.push("]");
        }
        function dp(e, t, o = !1, n = !0) {
          const { push: r, newline: a } = t;
          for (let s = 0; s < e.length; s++) {
            const i = e[s];
            x(i) ? r(i, -3) : g(i) ? up(i, t) : pp(i, t),
              s < e.length - 1 && (o ? (n && r(","), a()) : n && r(", "));
          }
        }
        function pp(e, t) {
          if (x(e)) t.push(e, -3);
          else if (S(e)) t.push(t.helper(e));
          else
            switch (e.type) {
              case 1:
              case 9:
              case 11:
              case 12:
                pp(e.codegenNode, t);
                break;
              case 2:
                !(function (e, t) {
                  t.push(JSON.stringify(e.content), -3, e);
                })(e, t);
                break;
              case 4:
                hp(e, t);
                break;
              case 5:
                !(function (e, t) {
                  const { push: o, helper: n, pure: r } = t;
                  r && o(sp);
                  o(`${n(Xl)}(`), pp(e.content, t), o(")");
                })(e, t);
                break;
              case 8:
                fp(e, t);
                break;
              case 3:
                !(function (e, t) {
                  const { push: o, helper: n, pure: r } = t;
                  r && o(sp);
                  o(`${n(ql)}(${JSON.stringify(e.content)})`, -3, e);
                })(e, t);
                break;
              case 13:
                !(function (e, t) {
                  const { push: o, helper: n, pure: r } = t,
                    {
                      tag: a,
                      props: s,
                      children: i,
                      patchFlag: c,
                      dynamicProps: l,
                      directives: u,
                      isBlock: d,
                      disableTracking: p,
                      isComponent: h,
                    } = e;
                  let f;
                  c && (f = String(c));
                  u && o(n(Yl) + "(");
                  d && o(`(${n(Ll)}(${p ? "true" : ""}), `);
                  r && o(sp);
                  const m = d ? ku(t.inSSR, h) : Tu(t.inSSR, h);
                  o(n(m) + "(", -2, e),
                    dp(
                      (function (e) {
                        let t = e.length;
                        for (; t-- && null == e[t]; );
                        return e.slice(0, t + 1).map((e) => e || "null");
                      })([a, s, i, f, l]),
                      t
                    ),
                    o(")"),
                    d && o(")");
                  u && (o(", "), pp(u, t), o(")"));
                })(e, t);
                break;
              case 14:
                !(function (e, t) {
                  const { push: o, helper: n, pure: r } = t,
                    a = x(e.callee) ? e.callee : n(e.callee);
                  r && o(sp);
                  o(a + "(", -2, e), dp(e.arguments, t), o(")");
                })(e, t);
                break;
              case 15:
                !(function (e, t) {
                  const { push: o, indent: n, deindent: r, newline: a } = t,
                    { properties: s } = e;
                  if (!s.length) return void o("{}", -2, e);
                  const i = s.length > 1 || !1;
                  o(i ? "{" : "{ "), i && n();
                  for (let e = 0; e < s.length; e++) {
                    const { key: n, value: r } = s[e];
                    mp(n, t),
                      o(": "),
                      pp(r, t),
                      e < s.length - 1 && (o(","), a());
                  }
                  i && r(), o(i ? "}" : " }");
                })(e, t);
                break;
              case 17:
                !(function (e, t) {
                  up(e.elements, t);
                })(e, t);
                break;
              case 18:
                !(function (e, t) {
                  const { push: o, indent: n, deindent: r } = t,
                    {
                      params: a,
                      returns: s,
                      body: i,
                      newline: c,
                      isSlot: l,
                    } = e;
                  l && o(`_${mu[uu]}(`);
                  o("(", -2, e), g(a) ? dp(a, t) : a && pp(a, t);
                  o(") => "), (c || i) && (o("{"), n());
                  s
                    ? (c && o("return "), g(s) ? up(s, t) : pp(s, t))
                    : i && pp(i, t);
                  (c || i) && (r(), o("}"));
                  l && (e.isNonScopedSlot && o(", undefined, true"), o(")"));
                })(e, t);
                break;
              case 19:
                !(function (e, t) {
                  const {
                      test: o,
                      consequent: n,
                      alternate: r,
                      newline: a,
                    } = e,
                    { push: s, indent: i, deindent: c, newline: l } = t;
                  if (4 === o.type) {
                    const e = !Hu(o.content);
                    e && s("("), hp(o, t), e && s(")");
                  } else s("("), pp(o, t), s(")");
                  a && i(),
                    t.indentLevel++,
                    a || s(" "),
                    s("? "),
                    pp(n, t),
                    t.indentLevel--,
                    a && l(),
                    a || s(" "),
                    s(": ");
                  const u = 19 === r.type;
                  u || t.indentLevel++;
                  pp(r, t), u || t.indentLevel--;
                  a && c(!0);
                })(e, t);
                break;
              case 20:
                !(function (e, t) {
                  const {
                      push: o,
                      helper: n,
                      indent: r,
                      deindent: a,
                      newline: s,
                    } = t,
                    { needPauseTracking: i, needArraySpread: c } = e;
                  c && o("[...(");
                  o(`_cache[${e.index}] || (`),
                    i &&
                      (r(),
                      o(`${n(iu)}(-1`),
                      e.inVOnce && o(", true"),
                      o("),"),
                      s(),
                      o("("));
                  o(`_cache[${e.index}] = `),
                    pp(e.value, t),
                    i &&
                      (o(`).cacheIndex = ${e.index},`),
                      s(),
                      o(`${n(iu)}(1),`),
                      s(),
                      o(`_cache[${e.index}]`),
                      a());
                  o(")"), c && o(")]");
                })(e, t);
                break;
              case 21:
                dp(e.body, t, !0, !1);
            }
        }
        function hp(e, t) {
          const { content: o, isStatic: n } = e;
          t.push(n ? JSON.stringify(o) : o, -3, e);
        }
        function fp(e, t) {
          for (let o = 0; o < e.children.length; o++) {
            const n = e.children[o];
            x(n) ? t.push(n, -3) : pp(n, t);
          }
        }
        function mp(e, t) {
          const { push: o } = t;
          if (8 === e.type) o("["), fp(e, t), o("]");
          else if (e.isStatic) {
            o(Hu(e.content) ? e.content : JSON.stringify(e.content), -2, e);
          } else o(`[${e.content}]`, -3, e);
        }
        new RegExp(
          "\\b" +
            "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield"
              .split(",")
              .join("\\b|\\b") +
            "\\b"
        );
        const gp = ap(/^(if|else|else-if)$/, (e, t, o) =>
          (function (e, t, o, n) {
            if (!("else" === t.name || (t.exp && t.exp.content.trim()))) {
              const n = t.exp ? t.exp.loc : e.loc;
              o.onError(Fu(28, t.loc)), (t.exp = xu("true", !1, n));
            }
            0;
            if ("if" === t.name) {
              const r = bp(e, t),
                a = { type: 9, loc: zd(e.loc), branches: [r] };
              if ((o.replaceNode(a), n)) return n(a, r, !0);
            } else {
              const r = o.parent.children;
              let a = r.indexOf(e);
              for (; a-- >= -1; ) {
                const s = r[a];
                if (s && 3 === s.type) o.removeNode(s);
                else {
                  if (!s || 2 !== s.type || s.content.trim().length) {
                    if (s && 9 === s.type) {
                      "else-if" === t.name &&
                        void 0 ===
                          s.branches[s.branches.length - 1].condition &&
                        o.onError(Fu(30, e.loc)),
                        o.removeNode();
                      const r = bp(e, t);
                      0, s.branches.push(r);
                      const a = n && n(s, r, !1);
                      rp(r, o), a && a(), (o.currentNode = null);
                    } else o.onError(Fu(30, e.loc));
                    break;
                  }
                  o.removeNode(s);
                }
              }
            }
          })(e, t, o, (e, t, n) => {
            const r = o.parent.children;
            let a = r.indexOf(e),
              s = 0;
            for (; a-- >= 0; ) {
              const e = r[a];
              e && 9 === e.type && (s += e.branches.length);
            }
            return () => {
              if (n) e.codegenNode = vp(t, s, o);
              else {
                const n = (function (e) {
                  for (;;)
                    if (19 === e.type) {
                      if (19 !== e.alternate.type) return e;
                      e = e.alternate;
                    } else 20 === e.type && (e = e.value);
                })(e.codegenNode);
                n.alternate = vp(t, s + e.branches.length - 1, o);
              }
            };
          })
        );
        function bp(e, t) {
          const o = 3 === e.tagType;
          return {
            type: 10,
            loc: e.loc,
            condition: "else" === t.name ? void 0 : t.exp,
            children: o && !Qu(e, "for") ? e.children : [e],
            userKey: ed(e, "key"),
            isTemplateIf: o,
          };
        }
        function vp(e, t, o) {
          return e.condition
            ? Cu(e.condition, yp(e, t, o), wu(o.helper(ql), ['""', "true"]))
            : yp(e, t, o);
        }
        function yp(e, t, o) {
          const { helper: n } = o,
            r = _u("key", xu(`${t}`, !1, gu, 2)),
            { children: a } = e,
            s = a[0];
          if (1 !== a.length || 1 !== s.type) {
            if (1 === a.length && 11 === s.type) {
              const e = s.codegenNode;
              return cd(e, r, o), e;
            }
            {
              let t = 64;
              return bu(
                o,
                n(Rl),
                yu([r]),
                a,
                t,
                void 0,
                void 0,
                !0,
                !1,
                !1,
                e.loc
              );
            }
          }
          {
            const e = s.codegenNode,
              t =
                14 === (i = e).type && i.callee === hu
                  ? i.arguments[1].returns
                  : i;
            return 13 === t.type && Au(t, o), cd(t, r, o), e;
          }
          var i;
        }
        const _p = (e, t, o) => {
            const { modifiers: n, loc: r } = e,
              a = e.arg;
            let { exp: s } = e;
            if ((s && 4 === s.type && !s.content.trim() && (s = void 0), !s)) {
              if (4 !== a.type || !a.isStatic)
                return (
                  o.onError(Fu(52, a.loc)), { props: [_u(a, xu("", !0, r))] }
                );
              xp(e), (s = e.exp);
            }
            return (
              4 !== a.type
                ? (a.children.unshift("("), a.children.push(') || ""'))
                : a.isStatic || (a.content = `${a.content} || ""`),
              n.some((e) => "camel" === e.content) &&
                (4 === a.type
                  ? a.isStatic
                    ? (a.content = P(a.content))
                    : (a.content = `${o.helperString(ru)}(${a.content})`)
                  : (a.children.unshift(`${o.helperString(ru)}(`),
                    a.children.push(")"))),
              o.inSSR ||
                (n.some((e) => "prop" === e.content) && Sp(a, "."),
                n.some((e) => "attr" === e.content) && Sp(a, "^")),
              { props: [_u(a, s)] }
            );
          },
          xp = (e, t) => {
            const o = e.arg,
              n = P(o.content);
            e.exp = xu(n, !1, o.loc);
          },
          Sp = (e, t) => {
            4 === e.type
              ? e.isStatic
                ? (e.content = t + e.content)
                : (e.content = `\`${t}\${${e.content}}\``)
              : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
          },
          wp = ap("for", (e, t, o) => {
            const { helper: n, removeHelper: r } = o;
            return (function (e, t, o, n) {
              if (!t.exp) return void o.onError(Fu(31, t.loc));
              const r = t.forParseResult;
              if (!r) return void o.onError(Fu(32, t.loc));
              Ep(r, o);
              const { addIdentifiers: a, removeIdentifiers: s, scopes: i } = o,
                { source: c, value: l, key: u, index: d } = r,
                p = {
                  type: 11,
                  loc: t.loc,
                  source: c,
                  valueAlias: l,
                  keyAlias: u,
                  objectIndexAlias: d,
                  parseResult: r,
                  children: rd(e) ? e.children : [e],
                };
              o.replaceNode(p), i.vFor++;
              const h = n && n(p);
              return () => {
                i.vFor--, h && h();
              };
            })(e, t, o, (t) => {
              const a = wu(n(Kl), [t.source]),
                s = rd(e),
                i = Qu(e, "memo"),
                c = ed(e, "key", !1, !0);
              c && 7 === c.type && !c.exp && xp(c);
              let l =
                c &&
                (6 === c.type
                  ? c.value
                    ? xu(c.value.content, !0)
                    : void 0
                  : c.exp);
              const u = c && l ? _u("key", l) : null,
                d = 4 === t.source.type && t.source.constType > 0,
                p = d ? 64 : c ? 128 : 256;
              return (
                (t.codegenNode = bu(
                  o,
                  n(Rl),
                  void 0,
                  a,
                  p,
                  void 0,
                  void 0,
                  !0,
                  !d,
                  !1,
                  e.loc
                )),
                () => {
                  let c;
                  const { children: p } = t;
                  const h = 1 !== p.length || 1 !== p[0].type,
                    f = ad(e)
                      ? e
                      : s && 1 === e.children.length && ad(e.children[0])
                      ? e.children[0]
                      : null;
                  if (
                    (f
                      ? ((c = f.codegenNode), s && u && cd(c, u, o))
                      : h
                      ? (c = bu(
                          o,
                          n(Rl),
                          u ? yu([u]) : void 0,
                          e.children,
                          64,
                          void 0,
                          void 0,
                          !0,
                          void 0,
                          !1
                        ))
                      : ((c = p[0].codegenNode),
                        s && u && cd(c, u, o),
                        c.isBlock !== !d &&
                          (c.isBlock
                            ? (r(Ll), r(ku(o.inSSR, c.isComponent)))
                            : r(Tu(o.inSSR, c.isComponent))),
                        (c.isBlock = !d),
                        c.isBlock
                          ? (n(Ll), n(ku(o.inSSR, c.isComponent)))
                          : n(Tu(o.inSSR, c.isComponent))),
                    i)
                  ) {
                    const e = Eu(Cp(t.parseResult, [xu("_cached")]));
                    (e.body = {
                      type: 21,
                      body: [
                        Su(["const _memo = (", i.exp, ")"]),
                        Su([
                          "if (_cached",
                          ...(l ? [" && _cached.key === ", l] : []),
                          ` && ${o.helperString(
                            fu
                          )}(_cached, _memo)) return _cached`,
                        ]),
                        Su(["const _item = ", c]),
                        xu("_item.memo = _memo"),
                        xu("return _item"),
                      ],
                      loc: gu,
                    }),
                      a.arguments.push(
                        e,
                        xu("_cache"),
                        xu(String(o.cached.length))
                      ),
                      o.cached.push(null);
                  } else a.arguments.push(Eu(Cp(t.parseResult), c, !0));
                }
              );
            });
          });
        function Ep(e, t) {
          e.finalized || (e.finalized = !0);
        }
        function Cp({ value: e, key: t, index: o }, n = []) {
          return (function (e) {
            let t = e.length;
            for (; t-- && !e[t]; );
            return e
              .slice(0, t + 1)
              .map((e, t) => e || xu("_".repeat(t + 1), !1));
          })([e, t, o, ...n]);
        }
        const Tp = xu("undefined", !1),
          kp = (e, t) => {
            if (1 === e.type && (1 === e.tagType || 3 === e.tagType)) {
              const o = Qu(e, "slot");
              if (o)
                return (
                  o.exp,
                  t.scopes.vSlot++,
                  () => {
                    t.scopes.vSlot--;
                  }
                );
            }
          },
          Ap = (e, t, o, n) => Eu(e, o, !1, !0, o.length ? o[0].loc : n);
        function Op(e, t, o = Ap) {
          t.helper(uu);
          const { children: n, loc: r } = e,
            a = [],
            s = [];
          let i = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
          const c = Qu(e, "slot", !0);
          if (c) {
            const { arg: e, exp: t } = c;
            e && !zu(e) && (i = !0),
              a.push(_u(e || xu("default", !0), o(t, void 0, n, r)));
          }
          let l = !1,
            u = !1;
          const d = [],
            p = new Set();
          let h = 0;
          for (let e = 0; e < n.length; e++) {
            const r = n[e];
            let f;
            if (!rd(r) || !(f = Qu(r, "slot", !0))) {
              3 !== r.type && d.push(r);
              continue;
            }
            if (c) {
              t.onError(Fu(37, f.loc));
              break;
            }
            l = !0;
            const { children: m, loc: g } = r,
              { arg: b = xu("default", !0), exp: v, loc: y } = f;
            let _;
            zu(b) ? (_ = b ? b.content : "default") : (i = !0);
            const x = Qu(r, "for"),
              S = o(v, x, m, g);
            let w, E;
            if ((w = Qu(r, "if")))
              (i = !0), s.push(Cu(w.exp, Rp(b, S, h++), Tp));
            else if ((E = Qu(r, /^else(-if)?$/, !0))) {
              let o,
                r = e;
              for (; r-- && ((o = n[r]), 3 === o.type || !jp(o)); );
              if (o && rd(o) && Qu(o, /^(else-)?if$/)) {
                let e = s[s.length - 1];
                for (; 19 === e.alternate.type; ) e = e.alternate;
                e.alternate = E.exp
                  ? Cu(E.exp, Rp(b, S, h++), Tp)
                  : Rp(b, S, h++);
              } else t.onError(Fu(30, E.loc));
            } else if (x) {
              i = !0;
              const e = x.forParseResult;
              e
                ? (Ep(e),
                  s.push(wu(t.helper(Kl), [e.source, Eu(Cp(e), Rp(b, S), !0)])))
                : t.onError(Fu(32, x.loc));
            } else {
              if (_) {
                if (p.has(_)) {
                  t.onError(Fu(38, y));
                  continue;
                }
                p.add(_), "default" === _ && (u = !0);
              }
              a.push(_u(b, S));
            }
          }
          if (!c) {
            const e = (e, n) => {
              const a = o(e, void 0, n, r);
              return (
                t.compatConfig && (a.isNonScopedSlot = !0), _u("default", a)
              );
            };
            l
              ? d.length &&
                d.some((e) => jp(e)) &&
                (u ? t.onError(Fu(39, d[0].loc)) : a.push(e(void 0, d)))
              : a.push(e(void 0, n));
          }
          const f = i ? 2 : Np(e.children) ? 3 : 1;
          let m = yu(a.concat(_u("_", xu(f + "", !1))), r);
          return (
            s.length && (m = wu(t.helper(Jl), [m, vu(s)])),
            { slots: m, hasDynamicSlots: i }
          );
        }
        function Rp(e, t, o) {
          const n = [_u("name", e), _u("fn", t)];
          return null != o && n.push(_u("key", xu(String(o), !0))), yu(n);
        }
        function Np(e) {
          for (let t = 0; t < e.length; t++) {
            const o = e[t];
            switch (o.type) {
              case 1:
                if (2 === o.tagType || Np(o.children)) return !0;
                break;
              case 9:
                if (Np(o.branches)) return !0;
                break;
              case 10:
              case 11:
                if (Np(o.children)) return !0;
            }
          }
          return !1;
        }
        function jp(e) {
          return (
            (2 !== e.type && 12 !== e.type) ||
            (2 === e.type ? !!e.content.trim() : jp(e.content))
          );
        }
        const Ip = new WeakMap(),
          Pp = (e, t) =>
            function () {
              if (
                1 !== (e = t.currentNode).type ||
                (0 !== e.tagType && 1 !== e.tagType)
              )
                return;
              const { tag: o, props: n } = e,
                r = 1 === e.tagType;
              let a = r
                ? (function (e, t, o = !1) {
                    let { tag: n } = e;
                    const r = Dp(n),
                      a = ed(e, "is", !1, !0);
                    if (a)
                      if (r || Uu("COMPILER_IS_ON_ELEMENT", t)) {
                        let e;
                        if (
                          (6 === a.type
                            ? (e = a.value && xu(a.value.content, !0))
                            : ((e = a.exp), e || (e = xu("is", !1, a.arg.loc))),
                          e)
                        )
                          return wu(t.helper(Vl), [e]);
                      } else
                        6 === a.type &&
                          a.value.content.startsWith("vue:") &&
                          (n = a.value.content.slice(4));
                    const s = $u(n) || t.isBuiltInComponent(n);
                    if (s) return o || t.helper(s), s;
                    return (
                      t.helper($l), t.components.add(n), ud(n, "component")
                    );
                  })(e, t)
                : `"${o}"`;
              const s = w(a) && a.callee === Vl;
              let i,
                c,
                l,
                u,
                d,
                p = 0,
                h =
                  s ||
                  a === Nl ||
                  a === jl ||
                  (!r &&
                    ("svg" === o || "foreignObject" === o || "math" === o));
              if (n.length > 0) {
                const o = Lp(e, t, void 0, r, s);
                (i = o.props), (p = o.patchFlag), (u = o.dynamicPropNames);
                const n = o.directives;
                (d =
                  n && n.length
                    ? vu(
                        n.map((e) =>
                          (function (e, t) {
                            const o = [],
                              n = Ip.get(e);
                            n
                              ? o.push(t.helperString(n))
                              : (t.helper(Hl),
                                t.directives.add(e.name),
                                o.push(ud(e.name, "directive")));
                            const { loc: r } = e;
                            e.exp && o.push(e.exp);
                            e.arg && (e.exp || o.push("void 0"), o.push(e.arg));
                            if (Object.keys(e.modifiers).length) {
                              e.arg ||
                                (e.exp || o.push("void 0"), o.push("void 0"));
                              const t = xu("true", !1, r);
                              o.push(
                                yu(
                                  e.modifiers.map((e) => _u(e, t)),
                                  r
                                )
                              );
                            }
                            return vu(o, e.loc);
                          })(e, t)
                        )
                      )
                    : void 0),
                  o.shouldUseBlock && (h = !0);
              }
              if (e.children.length > 0) {
                a === Il && ((h = !0), (p |= 1024));
                if (r && a !== Nl && a !== Il) {
                  const { slots: o, hasDynamicSlots: n } = Op(e, t);
                  (c = o), n && (p |= 1024);
                } else if (1 === e.children.length && a !== Nl) {
                  const o = e.children[0],
                    n = o.type,
                    r = 5 === n || 8 === n;
                  r && 0 === Xd(o, t) && (p |= 1),
                    (c = r || 2 === n ? o : e.children);
                } else c = e.children;
              }
              u &&
                u.length &&
                (l = (function (e) {
                  let t = "[";
                  for (let o = 0, n = e.length; o < n; o++)
                    (t += JSON.stringify(e[o])), o < n - 1 && (t += ", ");
                  return t + "]";
                })(u)),
                (e.codegenNode = bu(
                  t,
                  a,
                  i,
                  c,
                  0 === p ? void 0 : p,
                  l,
                  d,
                  !!h,
                  !1,
                  r,
                  e.loc
                ));
            };
        function Lp(e, t, o = e.props, n, r, a = !1) {
          const { tag: s, loc: i, children: c } = e;
          let l = [];
          const d = [],
            p = [],
            h = c.length > 0;
          let f = !1,
            m = 0,
            g = !1,
            b = !1,
            v = !1,
            y = !1,
            _ = !1,
            x = !1;
          const w = [],
            E = (e) => {
              l.length && (d.push(yu(Mp(l), i)), (l = [])), e && d.push(e);
            },
            C = () => {
              t.scopes.vFor > 0 && l.push(_u(xu("ref_for", !0), xu("true")));
            },
            T = ({ key: e, value: o }) => {
              if (zu(e)) {
                const a = e.content,
                  s = u(a);
                if (
                  (!s ||
                    (n && !r) ||
                    "onclick" === a.toLowerCase() ||
                    "onUpdate:modelValue" === a ||
                    R(a) ||
                    (y = !0),
                  s && R(a) && (x = !0),
                  s && 14 === o.type && (o = o.arguments[0]),
                  20 === o.type ||
                    ((4 === o.type || 8 === o.type) && Xd(o, t) > 0))
                )
                  return;
                "ref" === a
                  ? (g = !0)
                  : "class" === a
                  ? (b = !0)
                  : "style" === a
                  ? (v = !0)
                  : "key" === a || w.includes(a) || w.push(a),
                  !n ||
                    ("class" !== a && "style" !== a) ||
                    w.includes(a) ||
                    w.push(a);
              } else _ = !0;
            };
          for (let r = 0; r < o.length; r++) {
            const c = o[r];
            if (6 === c.type) {
              const { loc: e, name: o, nameLoc: n, value: r } = c;
              let a = !0;
              if (
                ("ref" === o && ((g = !0), C()),
                "is" === o &&
                  (Dp(s) ||
                    (r && r.content.startsWith("vue:")) ||
                    Uu("COMPILER_IS_ON_ELEMENT", t)))
              )
                continue;
              l.push(
                _u(xu(o, !0, n), xu(r ? r.content : "", a, r ? r.loc : e))
              );
            } else {
              const { name: o, arg: r, exp: u, loc: g, modifiers: b } = c,
                v = "bind" === o,
                y = "on" === o;
              if ("slot" === o) {
                n || t.onError(Fu(40, g));
                continue;
              }
              if ("once" === o || "memo" === o) continue;
              if (
                "is" === o ||
                (v && td(r, "is") && (Dp(s) || Uu("COMPILER_IS_ON_ELEMENT", t)))
              )
                continue;
              if (y && a) continue;
              if (
                (((v && td(r, "key")) ||
                  (y && h && td(r, "vue:before-update"))) &&
                  (f = !0),
                v && td(r, "ref") && C(),
                !r && (v || y))
              ) {
                if (((_ = !0), u))
                  if (v) {
                    if ((E(), Uu("COMPILER_V_BIND_OBJECT_ORDER", t))) {
                      d.unshift(u);
                      continue;
                    }
                    C(), E(), d.push(u);
                  } else
                    E({
                      type: 14,
                      loc: g,
                      callee: t.helper(nu),
                      arguments: n ? [u] : [u, "true"],
                    });
                else t.onError(Fu(v ? 34 : 35, g));
                continue;
              }
              v && b.some((e) => "prop" === e.content) && (m |= 32);
              const x = t.directiveTransforms[o];
              if (x) {
                const { props: o, needRuntime: n } = x(c, e, t);
                !a && o.forEach(T),
                  y && r && !zu(r) ? E(yu(o, i)) : l.push(...o),
                  n && (p.push(c), S(n) && Ip.set(c, n));
              } else N(o) || (p.push(c), h && (f = !0));
            }
          }
          let k;
          if (
            (d.length
              ? (E(), (k = d.length > 1 ? wu(t.helper(Zl), d, i) : d[0]))
              : l.length && (k = yu(Mp(l), i)),
            _
              ? (m |= 16)
              : (b && !n && (m |= 2),
                v && !n && (m |= 4),
                w.length && (m |= 8),
                y && (m |= 32)),
            f ||
              (0 !== m && 32 !== m) ||
              !(g || x || p.length > 0) ||
              (m |= 512),
            !t.inSSR && k)
          )
            switch (k.type) {
              case 15:
                let e = -1,
                  o = -1,
                  n = !1;
                for (let t = 0; t < k.properties.length; t++) {
                  const r = k.properties[t].key;
                  zu(r)
                    ? "class" === r.content
                      ? (e = t)
                      : "style" === r.content && (o = t)
                    : r.isHandlerKey || (n = !0);
                }
                const r = k.properties[e],
                  a = k.properties[o];
                n
                  ? (k = wu(t.helper(tu), [k]))
                  : (r &&
                      !zu(r.value) &&
                      (r.value = wu(t.helper(Ql), [r.value])),
                    a &&
                      (v ||
                        (4 === a.value.type &&
                          "[" === a.value.content.trim()[0]) ||
                        17 === a.value.type) &&
                      (a.value = wu(t.helper(eu), [a.value])));
                break;
              case 14:
                break;
              default:
                k = wu(t.helper(tu), [wu(t.helper(ou), [k])]);
            }
          return {
            props: k,
            directives: p,
            patchFlag: m,
            dynamicPropNames: w,
            shouldUseBlock: f,
          };
        }
        function Mp(e) {
          const t = new Map(),
            o = [];
          for (let n = 0; n < e.length; n++) {
            const r = e[n];
            if (8 === r.key.type || !r.key.isStatic) {
              o.push(r);
              continue;
            }
            const a = r.key.content,
              s = t.get(a);
            s
              ? ("style" === a || "class" === a || u(a)) && Up(s, r)
              : (t.set(a, r), o.push(r));
          }
          return o;
        }
        function Up(e, t) {
          17 === e.value.type
            ? e.value.elements.push(t.value)
            : (e.value = vu([e.value, t.value], e.loc));
        }
        function Dp(e) {
          return "component" === e || "Component" === e;
        }
        const Bp = (e, t) => {
          if (ad(e)) {
            const { children: o, loc: n } = e,
              { slotName: r, slotProps: a } = (function (e, t) {
                let o,
                  n = '"default"';
                const r = [];
                for (let t = 0; t < e.props.length; t++) {
                  const o = e.props[t];
                  if (6 === o.type)
                    o.value &&
                      ("name" === o.name
                        ? (n = JSON.stringify(o.value.content))
                        : ((o.name = P(o.name)), r.push(o)));
                  else if ("bind" === o.name && td(o.arg, "name")) {
                    if (o.exp) n = o.exp;
                    else if (o.arg && 4 === o.arg.type) {
                      const e = P(o.arg.content);
                      n = o.exp = xu(e, !1, o.arg.loc);
                    }
                  } else
                    "bind" === o.name &&
                      o.arg &&
                      zu(o.arg) &&
                      (o.arg.content = P(o.arg.content)),
                      r.push(o);
                }
                if (r.length > 0) {
                  const { props: n, directives: a } = Lp(e, t, r, !1, !1);
                  (o = n), a.length && t.onError(Fu(36, a[0].loc));
                }
                return { slotName: n, slotProps: o };
              })(e, t),
              s = [
                t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
                r,
                "{}",
                "undefined",
                "true",
              ];
            let i = 2;
            a && ((s[2] = a), (i = 3)),
              o.length && ((s[3] = Eu([], o, !1, !1, n)), (i = 4)),
              t.scopeId && !t.slotted && (i = 5),
              s.splice(i),
              (e.codegenNode = wu(t.helper(Gl), s, n));
          }
        };
        const qp = (e, t, o, n) => {
            const { loc: r, modifiers: a, arg: s } = e;
            let i;
            if ((e.exp || a.length || o.onError(Fu(35, r)), 4 === s.type))
              if (s.isStatic) {
                let e = s.content;
                0, e.startsWith("vue:") && (e = `vnode-${e.slice(4)}`);
                i = xu(
                  0 !== t.tagType || e.startsWith("vnode") || !/[A-Z]/.test(e)
                    ? D(P(e))
                    : `on:${e}`,
                  !0,
                  s.loc
                );
              } else i = Su([`${o.helperString(su)}(`, s, ")"]);
            else
              (i = s),
                i.children.unshift(`${o.helperString(su)}(`),
                i.children.push(")");
            let c = e.exp;
            c && !c.content.trim() && (c = void 0);
            let l = o.cacheHandlers && !c && !o.inVOnce;
            if (c) {
              const e = Ju(c),
                t = !(e || Zu(c)),
                o = c.content.includes(";");
              0,
                (t || (l && e)) &&
                  (c = Su([
                    `${t ? "$event" : "(...args)"} => ${o ? "{" : "("}`,
                    c,
                    o ? "}" : ")",
                  ]));
            }
            let u = { props: [_u(i, c || xu("() => {}", !1, r))] };
            return (
              n && (u = n(u)),
              l && (u.props[0].value = o.cache(u.props[0].value)),
              u.props.forEach((e) => (e.key.isHandlerKey = !0)),
              u
            );
          },
          Fp = (e, t) => {
            if (0 === e.type || 1 === e.type || 11 === e.type || 10 === e.type)
              return () => {
                const o = e.children;
                let n,
                  r = !1;
                for (let e = 0; e < o.length; e++) {
                  const t = o[e];
                  if (od(t)) {
                    r = !0;
                    for (let r = e + 1; r < o.length; r++) {
                      const a = o[r];
                      if (!od(a)) {
                        n = void 0;
                        break;
                      }
                      n || (n = o[e] = Su([t], t.loc)),
                        n.children.push(" + ", a),
                        o.splice(r, 1),
                        r--;
                    }
                  }
                }
                if (
                  r &&
                  (1 !== o.length ||
                    (0 !== e.type &&
                      (1 !== e.type ||
                        0 !== e.tagType ||
                        e.props.find(
                          (e) => 7 === e.type && !t.directiveTransforms[e.name]
                        ) ||
                        "template" === e.tag)))
                )
                  for (let e = 0; e < o.length; e++) {
                    const n = o[e];
                    if (od(n) || 8 === n.type) {
                      const r = [];
                      (2 === n.type && " " === n.content) || r.push(n),
                        t.ssr || 0 !== Xd(n, t) || r.push("1"),
                        (o[e] = {
                          type: 12,
                          content: n,
                          loc: n.loc,
                          codegenNode: wu(t.helper(Fl), r),
                        });
                    }
                  }
              };
          },
          zp = new WeakSet(),
          $p = (e, t) => {
            if (1 === e.type && Qu(e, "once", !0)) {
              if (zp.has(e) || t.inVOnce || t.inSSR) return;
              return (
                zp.add(e),
                (t.inVOnce = !0),
                t.helper(iu),
                () => {
                  t.inVOnce = !1;
                  const e = t.currentNode;
                  e.codegenNode &&
                    (e.codegenNode = t.cache(e.codegenNode, !0, !0));
                }
              );
            }
          },
          Vp = (e, t, o) => {
            const { exp: n, arg: r } = e;
            if (!n) return o.onError(Fu(41, e.loc)), Hp();
            const a = n.loc.source.trim(),
              s = 4 === n.type ? n.content : a,
              i = o.bindingMetadata[a];
            if ("props" === i || "props-aliased" === i)
              return o.onError(Fu(44, n.loc)), Hp();
            if (!s.trim() || !Ju(n)) return o.onError(Fu(42, n.loc)), Hp();
            const c = r || xu("modelValue", !0),
              l = r
                ? zu(r)
                  ? `onUpdate:${P(r.content)}`
                  : Su(['"onUpdate:" + ', r])
                : "onUpdate:modelValue";
            let u;
            u = Su([
              `${o.isTS ? "($event: any)" : "$event"} => ((`,
              n,
              ") = $event)",
            ]);
            const d = [_u(c, e.exp), _u(l, u)];
            if (e.modifiers.length && 1 === t.tagType) {
              const t = e.modifiers
                  .map((e) => e.content)
                  .map((e) => (Hu(e) ? e : JSON.stringify(e)) + ": true")
                  .join(", "),
                o = r
                  ? zu(r)
                    ? `${r.content}Modifiers`
                    : Su([r, ' + "Modifiers"'])
                  : "modelModifiers";
              d.push(_u(o, xu(`{ ${t} }`, !1, e.loc, 2)));
            }
            return Hp(d);
          };
        function Hp(e = []) {
          return { props: e };
        }
        const Wp = /[\w).+\-_$\]]/,
          Yp = (e, t) => {
            Uu("COMPILER_FILTERS", t) &&
              (5 === e.type
                ? Kp(e.content, t)
                : 1 === e.type &&
                  e.props.forEach((e) => {
                    7 === e.type && "for" !== e.name && e.exp && Kp(e.exp, t);
                  }));
          };
        function Kp(e, t) {
          if (4 === e.type) Gp(e, t);
          else
            for (let o = 0; o < e.children.length; o++) {
              const n = e.children[o];
              "object" == typeof n &&
                (4 === n.type
                  ? Gp(n, t)
                  : 8 === n.type
                  ? Kp(e, t)
                  : 5 === n.type && Kp(n.content, t));
            }
        }
        function Gp(e, t) {
          const o = e.content;
          let n,
            r,
            a,
            s,
            i = !1,
            c = !1,
            l = !1,
            u = !1,
            d = 0,
            p = 0,
            h = 0,
            f = 0,
            m = [];
          for (a = 0; a < o.length; a++)
            if (((r = n), (n = o.charCodeAt(a)), i))
              39 === n && 92 !== r && (i = !1);
            else if (c) 34 === n && 92 !== r && (c = !1);
            else if (l) 96 === n && 92 !== r && (l = !1);
            else if (u) 47 === n && 92 !== r && (u = !1);
            else if (
              124 !== n ||
              124 === o.charCodeAt(a + 1) ||
              124 === o.charCodeAt(a - 1) ||
              d ||
              p ||
              h
            ) {
              switch (n) {
                case 34:
                  c = !0;
                  break;
                case 39:
                  i = !0;
                  break;
                case 96:
                  l = !0;
                  break;
                case 40:
                  h++;
                  break;
                case 41:
                  h--;
                  break;
                case 91:
                  p++;
                  break;
                case 93:
                  p--;
                  break;
                case 123:
                  d++;
                  break;
                case 125:
                  d--;
              }
              if (47 === n) {
                let e,
                  t = a - 1;
                for (; t >= 0 && ((e = o.charAt(t)), " " === e); t--);
                (e && Wp.test(e)) || (u = !0);
              }
            } else
              void 0 === s ? ((f = a + 1), (s = o.slice(0, a).trim())) : g();
          function g() {
            m.push(o.slice(f, a).trim()), (f = a + 1);
          }
          if (
            (void 0 === s ? (s = o.slice(0, a).trim()) : 0 !== f && g(),
            m.length)
          ) {
            for (a = 0; a < m.length; a++) s = Jp(s, m[a], t);
            (e.content = s), (e.ast = void 0);
          }
        }
        function Jp(e, t, o) {
          o.helper(Wl);
          const n = t.indexOf("(");
          if (n < 0) return o.filters.add(t), `${ud(t, "filter")}(${e})`;
          {
            const r = t.slice(0, n),
              a = t.slice(n + 1);
            return (
              o.filters.add(r),
              `${ud(r, "filter")}(${e}${")" !== a ? "," + a : a}`
            );
          }
        }
        const Xp = new WeakSet(),
          Zp = (e, t) => {
            if (1 === e.type) {
              const o = Qu(e, "memo");
              if (!o || Xp.has(e)) return;
              return (
                Xp.add(e),
                () => {
                  const n = e.codegenNode || t.currentNode.codegenNode;
                  n &&
                    13 === n.type &&
                    (1 !== e.tagType && Au(n, t),
                    (e.codegenNode = wu(t.helper(hu), [
                      o.exp,
                      Eu(void 0, n),
                      "_cache",
                      String(t.cached.length),
                    ])),
                    t.cached.push(null));
                }
              );
            }
          };
        function Qp(e, t = {}) {
          const o = t.onError || Bu,
            n = "module" === t.mode;
          !0 === t.prefixIdentifiers ? o(Fu(47)) : n && o(Fu(48));
          t.cacheHandlers && o(Fu(49)), t.scopeId && !n && o(Fu(50));
          const r = p({}, t, { prefixIdentifiers: !1 }),
            a = x(e) ? Yd(e, r) : e,
            [s, i] = [
              [$p, gp, Zp, wp, Yp, Bp, Pp, kp, Fp],
              { on: qp, bind: _p, model: Vp },
            ];
          return (
            np(
              a,
              p({}, r, {
                nodeTransforms: [...s, ...(t.nodeTransforms || [])],
                directiveTransforms: p({}, i, t.directiveTransforms || {}),
              })
            ),
            cp(a, r)
          );
        }
        const eh = Symbol(""),
          th = Symbol(""),
          oh = Symbol(""),
          nh = Symbol(""),
          rh = Symbol(""),
          ah = Symbol(""),
          sh = Symbol(""),
          ih = Symbol(""),
          ch = Symbol(""),
          lh = Symbol("");
        var uh;
        let dh;
        (uh = {
          [eh]: "vModelRadio",
          [th]: "vModelCheckbox",
          [oh]: "vModelText",
          [nh]: "vModelSelect",
          [rh]: "vModelDynamic",
          [ah]: "withModifiers",
          [sh]: "withKeys",
          [ih]: "vShow",
          [ch]: "Transition",
          [lh]: "TransitionGroup",
        }),
          Object.getOwnPropertySymbols(uh).forEach((e) => {
            mu[e] = uh[e];
          });
        const ph = {
            parseMode: "html",
            isVoidTag: ne,
            isNativeTag: (e) => ee(e) || te(e) || oe(e),
            isPreTag: (e) => "pre" === e,
            isIgnoreNewlineTag: (e) => "pre" === e || "textarea" === e,
            decodeEntities: function (e, t = !1) {
              return (
                dh || (dh = document.createElement("div")),
                t
                  ? ((dh.innerHTML = `<div foo="${e.replace(
                      /"/g,
                      "&quot;"
                    )}">`),
                    dh.children[0].getAttribute("foo"))
                  : ((dh.innerHTML = e), dh.textContent)
              );
            },
            isBuiltInComponent: (e) =>
              "Transition" === e || "transition" === e
                ? ch
                : "TransitionGroup" === e || "transition-group" === e
                ? lh
                : void 0,
            getNamespace(e, t, o) {
              let n = t ? t.ns : o;
              if (t && 2 === n)
                if ("annotation-xml" === t.tag) {
                  if ("svg" === e) return 1;
                  t.props.some(
                    (e) =>
                      6 === e.type &&
                      "encoding" === e.name &&
                      null != e.value &&
                      ("text/html" === e.value.content ||
                        "application/xhtml+xml" === e.value.content)
                  ) && (n = 0);
                } else
                  /^m(?:[ions]|text)$/.test(t.tag) &&
                    "mglyph" !== e &&
                    "malignmark" !== e &&
                    (n = 0);
              else
                t &&
                  1 === n &&
                  (("foreignObject" !== t.tag &&
                    "desc" !== t.tag &&
                    "title" !== t.tag) ||
                    (n = 0));
              if (0 === n) {
                if ("svg" === e) return 1;
                if ("math" === e) return 2;
              }
              return n;
            },
          },
          hh = (e, t) => {
            const o = X(e);
            return xu(JSON.stringify(o), !1, t, 3);
          };
        function fh(e, t) {
          return Fu(e, t);
        }
        const mh = a("passive,once,capture"),
          gh = a("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),
          bh = a("left,right"),
          vh = a("onkeyup,onkeydown,onkeypress"),
          yh = (e, t) =>
            zu(e) && "onclick" === e.content.toLowerCase()
              ? xu(t, !0)
              : 4 !== e.type
              ? Su(["(", e, `) === "onClick" ? "${t}" : (`, e, ")"])
              : e;
        const _h = (e, t) => {
          1 !== e.type ||
            0 !== e.tagType ||
            ("script" !== e.tag && "style" !== e.tag) ||
            t.removeNode();
        };
        const xh = [
            (e) => {
              1 === e.type &&
                e.props.forEach((t, o) => {
                  6 === t.type &&
                    "style" === t.name &&
                    t.value &&
                    (e.props[o] = {
                      type: 7,
                      name: "bind",
                      arg: xu("style", !0, t.loc),
                      exp: hh(t.value.content, t.loc),
                      modifiers: [],
                      loc: t.loc,
                    });
                });
            },
          ],
          Sh = {
            cloak: () => ({ props: [] }),
            html: (e, t, o) => {
              const { exp: n, loc: r } = e;
              return (
                n || o.onError(fh(53, r)),
                t.children.length &&
                  (o.onError(fh(54, r)), (t.children.length = 0)),
                { props: [_u(xu("innerHTML", !0, r), n || xu("", !0))] }
              );
            },
            text: (e, t, o) => {
              const { exp: n, loc: r } = e;
              return (
                n || o.onError(fh(55, r)),
                t.children.length &&
                  (o.onError(fh(56, r)), (t.children.length = 0)),
                {
                  props: [
                    _u(
                      xu("textContent", !0),
                      n
                        ? Xd(n, o) > 0
                          ? n
                          : wu(o.helperString(Xl), [n], r)
                        : xu("", !0)
                    ),
                  ],
                }
              );
            },
            model: (e, t, o) => {
              const n = Vp(e, t, o);
              if (!n.props.length || 1 === t.tagType) return n;
              e.arg && o.onError(fh(58, e.arg.loc));
              const { tag: r } = t,
                a = o.isCustomElement(r);
              if ("input" === r || "textarea" === r || "select" === r || a) {
                let s = oh,
                  i = !1;
                if ("input" === r || a) {
                  const n = ed(t, "type");
                  if (n) {
                    if (7 === n.type) s = rh;
                    else if (n.value)
                      switch (n.value.content) {
                        case "radio":
                          s = eh;
                          break;
                        case "checkbox":
                          s = th;
                          break;
                        case "file":
                          (i = !0), o.onError(fh(59, e.loc));
                      }
                  } else
                    (function (e) {
                      return e.props.some(
                        (e) =>
                          !(
                            7 !== e.type ||
                            "bind" !== e.name ||
                            (e.arg && 4 === e.arg.type && e.arg.isStatic)
                          )
                      );
                    })(t) && (s = rh);
                } else "select" === r && (s = nh);
                i || (n.needRuntime = o.helper(s));
              } else o.onError(fh(57, e.loc));
              return (
                (n.props = n.props.filter(
                  (e) => !(4 === e.key.type && "modelValue" === e.key.content)
                )),
                n
              );
            },
            on: (e, t, o) =>
              qp(e, t, o, (t) => {
                const { modifiers: n } = e;
                if (!n.length) return t;
                let { key: r, value: a } = t.props[0];
                const {
                  keyModifiers: s,
                  nonKeyModifiers: i,
                  eventOptionModifiers: c,
                } = ((e, t, o) => {
                  const n = [],
                    r = [],
                    a = [];
                  for (let s = 0; s < t.length; s++) {
                    const i = t[s].content;
                    ("native" === i && Du("COMPILER_V_ON_NATIVE", o)) || mh(i)
                      ? a.push(i)
                      : bh(i)
                      ? zu(e)
                        ? vh(e.content.toLowerCase())
                          ? n.push(i)
                          : r.push(i)
                        : (n.push(i), r.push(i))
                      : gh(i)
                      ? r.push(i)
                      : n.push(i);
                  }
                  return {
                    keyModifiers: n,
                    nonKeyModifiers: r,
                    eventOptionModifiers: a,
                  };
                })(r, n, o, e.loc);
                if (
                  (i.includes("right") && (r = yh(r, "onContextmenu")),
                  i.includes("middle") && (r = yh(r, "onMouseup")),
                  i.length && (a = wu(o.helper(ah), [a, JSON.stringify(i)])),
                  !s.length ||
                    (zu(r) && !vh(r.content.toLowerCase())) ||
                    (a = wu(o.helper(sh), [a, JSON.stringify(s)])),
                  c.length)
                ) {
                  const e = c.map(U).join("");
                  r = zu(r)
                    ? xu(`${r.content}${e}`, !0)
                    : Su(["(", r, `) + "${e}"`]);
                }
                return { props: [_u(r, a)] };
              }),
            show: (e, t, o) => {
              const { exp: n, loc: r } = e;
              return (
                n || o.onError(fh(61, r)),
                { props: [], needRuntime: o.helper(ih) }
              );
            },
          };
        const wh = Object.create(null);
        let Eh;
        mi(function (e, t) {
          if (!x(e)) {
            if (!e.nodeType) return c;
            e = e.innerHTML;
          }
          const o = (function (e, t) {
              return (
                e +
                JSON.stringify(t, (e, t) =>
                  "function" == typeof t ? t.toString() : t
                )
              );
            })(e, t),
            r = wh[o];
          if (r) return r;
          if ("#" === e[0]) {
            const t = document.querySelector(e);
            0, (e = t ? t.innerHTML : "");
          }
          const a = p({ hoistStatic: !0, onError: void 0, onWarn: c }, t);
          a.isCustomElement ||
            "undefined" == typeof customElements ||
            (a.isCustomElement = (e) => !!customElements.get(e));
          const { code: s } = (function (e, t = {}) {
              return Qp(
                e,
                p({}, ph, t, {
                  nodeTransforms: [_h, ...xh, ...(t.nodeTransforms || [])],
                  directiveTransforms: p({}, Sh, t.directiveTransforms || {}),
                  transformHoist: null,
                })
              );
            })(e, a),
            i = new Function("Vue", s)(n);
          return (i._rc = !0), (wh[o] = i);
        });
        const Ch = (e) => (Eh = e),
          Th = Symbol();
        function kh(e) {
          return (
            e &&
            "object" == typeof e &&
            "[object Object]" === Object.prototype.toString.call(e) &&
            "function" != typeof e.toJSON
          );
        }
        var Ah;
        !(function (e) {
          (e.direct = "direct"),
            (e.patchObject = "patch object"),
            (e.patchFunction = "patch function");
        })(Ah || (Ah = {}));
        const Oh = "undefined" != typeof window,
          Rh = (() =>
            "object" == typeof window && window.window === window
              ? window
              : "object" == typeof self && self.self === self
              ? self
              : "object" == typeof global && global.global === global
              ? global
              : "object" == typeof globalThis
              ? globalThis
              : { HTMLElement: null })();
        function Nh(e, t, o) {
          const n = new XMLHttpRequest();
          n.open("GET", e),
            (n.responseType = "blob"),
            (n.onload = function () {
              Mh(n.response, t, o);
            }),
            (n.onerror = function () {
              console.error("could not download file");
            }),
            n.send();
        }
        function jh(e) {
          const t = new XMLHttpRequest();
          t.open("HEAD", e, !1);
          try {
            t.send();
          } catch (e) {}
          return t.status >= 200 && t.status <= 299;
        }
        function Ih(e) {
          try {
            e.dispatchEvent(new MouseEvent("click"));
          } catch (t) {
            const o = new MouseEvent("click", {
              bubbles: !0,
              cancelable: !0,
              view: window,
              detail: 0,
              screenX: 80,
              screenY: 20,
              clientX: 80,
              clientY: 20,
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              metaKey: !1,
              button: 0,
              relatedTarget: null,
            });
            e.dispatchEvent(o);
          }
        }
        const Ph = "object" == typeof navigator ? navigator : { userAgent: "" },
          Lh = (() =>
            /Macintosh/.test(Ph.userAgent) &&
            /AppleWebKit/.test(Ph.userAgent) &&
            !/Safari/.test(Ph.userAgent))(),
          Mh = Oh
            ? "undefined" != typeof HTMLAnchorElement &&
              "download" in HTMLAnchorElement.prototype &&
              !Lh
              ? function (e, t = "download", o) {
                  const n = document.createElement("a");
                  (n.download = t),
                    (n.rel = "noopener"),
                    "string" == typeof e
                      ? ((n.href = e),
                        n.origin !== location.origin
                          ? jh(n.href)
                            ? Nh(e, t, o)
                            : ((n.target = "_blank"), Ih(n))
                          : Ih(n))
                      : ((n.href = URL.createObjectURL(e)),
                        setTimeout(function () {
                          URL.revokeObjectURL(n.href);
                        }, 4e4),
                        setTimeout(function () {
                          Ih(n);
                        }, 0));
                }
              : "msSaveOrOpenBlob" in Ph
              ? function (e, t = "download", o) {
                  if ("string" == typeof e)
                    if (jh(e)) Nh(e, t, o);
                    else {
                      const t = document.createElement("a");
                      (t.href = e),
                        (t.target = "_blank"),
                        setTimeout(function () {
                          Ih(t);
                        });
                    }
                  else
                    navigator.msSaveOrOpenBlob(
                      (function (e, { autoBom: t = !1 } = {}) {
                        return t &&
                          /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                            e.type
                          )
                          ? new Blob([String.fromCharCode(65279), e], {
                              type: e.type,
                            })
                          : e;
                      })(e, o),
                      t
                    );
                }
              : function (e, t, o, n) {
                  (n = n || open("", "_blank")) &&
                    (n.document.title = n.document.body.innerText =
                      "downloading...");
                  if ("string" == typeof e) return Nh(e, t, o);
                  const r = "application/octet-stream" === e.type,
                    a =
                      /constructor/i.test(String(Rh.HTMLElement)) ||
                      "safari" in Rh,
                    s = /CriOS\/[\d]+/.test(navigator.userAgent);
                  if (
                    (s || (r && a) || Lh) &&
                    "undefined" != typeof FileReader
                  ) {
                    const t = new FileReader();
                    (t.onloadend = function () {
                      let e = t.result;
                      if ("string" != typeof e)
                        throw (
                          ((n = null), new Error("Wrong reader.result type"))
                        );
                      (e = s
                        ? e
                        : e.replace(/^data:[^;]*;/, "data:attachment/file;")),
                        n ? (n.location.href = e) : location.assign(e),
                        (n = null);
                    }),
                      t.readAsDataURL(e);
                  } else {
                    const t = URL.createObjectURL(e);
                    n ? n.location.assign(t) : (location.href = t),
                      (n = null),
                      setTimeout(function () {
                        URL.revokeObjectURL(t);
                      }, 4e4);
                  }
                }
            : () => {};
        const { assign: Uh } = Object;
        const Dh = () => {};
        function Bh(e, t, o, n = Dh) {
          e.push(t);
          const r = () => {
            const o = e.indexOf(t);
            o > -1 && (e.splice(o, 1), n());
          };
          return !o && Se() && we(r), r;
        }
        function qh(e, ...t) {
          e.slice().forEach((e) => {
            e(...t);
          });
        }
        const Fh = (e) => e(),
          zh = Symbol(),
          $h = Symbol();
        function Vh(e, t) {
          e instanceof Map && t instanceof Map
            ? t.forEach((t, o) => e.set(o, t))
            : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
          for (const o in t) {
            if (!t.hasOwnProperty(o)) continue;
            const n = t[o],
              r = e[o];
            kh(r) && kh(n) && e.hasOwnProperty(o) && !Wt(n) && !Dt(n)
              ? (e[o] = Vh(r, n))
              : (e[o] = n);
          }
          return e;
        }
        const Hh = Symbol();
        function Wh(e) {
          return !kh(e) || !Object.prototype.hasOwnProperty.call(e, Hh);
        }
        const { assign: Yh } = Object;
        function Kh(e) {
          return !(!Wt(e) || !e.effect);
        }
        function Gh(e, t, o = {}, n, r, a) {
          let s;
          const i = Yh({ actions: {} }, o);
          const c = { deep: !0 };
          let l, u;
          let d,
            p = [],
            h = [];
          const f = n.state.value[e];
          a || f || (n.state.value[e] = {});
          Yt({});
          let m;
          function g(t) {
            let o;
            (l = u = !1),
              "function" == typeof t
                ? (t(n.state.value[e]),
                  (o = { type: Ah.patchFunction, storeId: e, events: d }))
                : (Vh(n.state.value[e], t),
                  (o = {
                    type: Ah.patchObject,
                    payload: t,
                    storeId: e,
                    events: d,
                  }));
            const r = (m = Symbol());
            Uo().then(() => {
              m === r && (l = !0);
            }),
              (u = !0),
              qh(p, o, n.state.value[e]);
          }
          const b = a
            ? function () {
                const { state: e } = o,
                  t = e ? e() : {};
                this.$patch((e) => {
                  Yh(e, t);
                });
              }
            : Dh;
          const v = (t, o = "") => {
              if (zh in t) return (t[$h] = o), t;
              const r = function () {
                Ch(n);
                const o = Array.from(arguments),
                  a = [],
                  s = [];
                let i;
                qh(h, {
                  args: o,
                  name: r[$h],
                  store: _,
                  after: function (e) {
                    a.push(e);
                  },
                  onError: function (e) {
                    s.push(e);
                  },
                });
                try {
                  i = t.apply(this && this.$id === e ? this : _, o);
                } catch (e) {
                  throw (qh(s, e), e);
                }
                return i instanceof Promise
                  ? i
                      .then((e) => (qh(a, e), e))
                      .catch((e) => (qh(s, e), Promise.reject(e)))
                  : (qh(a, i), i);
              };
              return (r[zh] = !0), (r[$h] = o), r;
            },
            y = {
              _p: n,
              $id: e,
              $onAction: Bh.bind(null, h),
              $patch: g,
              $reset: b,
              $subscribe(t, o = {}) {
                const r = Bh(p, t, o.detached, () => a()),
                  a = s.run(() =>
                    Qa(
                      () => n.state.value[e],
                      (n) => {
                        ("sync" === o.flush ? u : l) &&
                          t({ storeId: e, type: Ah.direct, events: d }, n);
                      },
                      Yh({}, c, o)
                    )
                  );
                return r;
              },
              $dispose: function () {
                s.stop(), (p = []), (h = []), n._s.delete(e);
              },
            },
            _ = It(y);
          n._s.set(e, _);
          const x = ((n._a && n._a.runWithContext) || Fh)(() =>
            n._e.run(() => (s = xe()).run(() => t({ action: v })))
          );
          for (const t in x) {
            const o = x[t];
            if ((Wt(o) && !Kh(o)) || Dt(o))
              a ||
                (f && Wh(o) && (Wt(o) ? (o.value = f[t]) : Vh(o, f[t])),
                (n.state.value[e][t] = o));
            else if ("function" == typeof o) {
              const e = v(o, t);
              (x[t] = e), (i.actions[t] = o);
            } else 0;
          }
          return (
            Yh(_, x),
            Yh(zt(_), x),
            Object.defineProperty(_, "$state", {
              get: () => n.state.value[e],
              set: (e) => {
                g((t) => {
                  Yh(t, e);
                });
              },
            }),
            n._p.forEach((e) => {
              Yh(
                _,
                s.run(() => e({ store: _, app: n._a, pinia: n, options: i }))
              );
            }),
            f && a && o.hydrate && o.hydrate(_.$state, f),
            (l = !0),
            (u = !0),
            _
          );
        }
        var Jh = new Map(),
          Xh = !1;
        function Zh(e) {
          var t = e.data,
            o = t.Action,
            n = t.Payload,
            r = Jh.get(o);
          r &&
            r.forEach(function (e) {
              return e(n);
            });
        }
        function Qh(e, t) {
          Jh.has(e) || Jh.set(e, []),
            Jh.get(e).push(t),
            Xh || (window.addEventListener("message", Zh), (Xh = !0)),
            yr(function () {
              var o = Jh.get(e);
              if (o) {
                var n = o.indexOf(t);
                -1 !== n && o.splice(n, 1), 0 === o.length && Jh.delete(e);
              }
            });
        }
        var ef = new Map(),
          tf = !1;
        function of(e) {
          var t = ef.get(e.key);
          t &&
            t.forEach(function (t) {
              return t(e);
            });
        }
        function nf(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var o =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != o) {
                var n,
                  r,
                  a,
                  s,
                  i = [],
                  c = !0,
                  l = !1;
                try {
                  if (((a = (o = o.call(e)).next), 0 === t)) {
                    if (Object(o) !== o) return;
                    c = !1;
                  } else
                    for (
                      ;
                      !(c = (n = a.call(o)).done) &&
                      (i.push(n.value), i.length !== t);
                      c = !0
                    );
                } catch (e) {
                  (l = !0), (r = e);
                } finally {
                  try {
                    if (
                      !c &&
                      null != o.return &&
                      ((s = o.return()), Object(s) !== s)
                    )
                      return;
                  } finally {
                    if (l) throw r;
                  }
                }
                return i;
              }
            })(e, t) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return rf(e, t);
                var o = {}.toString.call(e).slice(8, -1);
                return (
                  "Object" === o && e.constructor && (o = e.constructor.name),
                  "Map" === o || "Set" === o
                    ? Array.from(e)
                    : "Arguments" === o ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                    ? rf(e, t)
                    : void 0
                );
              }
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function rf(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var o = 0, n = Array(t); o < t; o++) n[o] = e[o];
          return n;
        }
        const af = function (e) {
            if (
              (3 === (e = e.replace("#", "")).length &&
                (e = e
                  .split("")
                  .map(function (e) {
                    return e + e;
                  })
                  .join("")),
              6 !== e.length)
            )
              return null;
            var t = e.match(/([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
            if (!t) return null;
            var o = nf(t, 4),
              n = (o[0], o[1]),
              r = o[2],
              a = o[3];
            return {
              r: parseInt(n, 16),
              g: parseInt(r, 16),
              b: parseInt(a, 16),
            };
          },
          sf = function (e, t, o) {
            (e /= 255), (t /= 255), (o /= 255);
            var n = Math.max(e, t, o),
              r = Math.min(e, t, o),
              a = n - r,
              s = 0;
            0 !== a &&
              (s =
                n === e
                  ? ((t - o) / a) % 6
                  : n === t
                  ? (o - e) / a + 2
                  : (e - t) / a + 4);
            var i = (n + r) / 2;
            return {
              h: (s = Math.round((60 * s + 360) % 360)),
              s: +(100 * (0 === a ? 0 : a / (1 - Math.abs(2 * i - 1)))).toFixed(
                1
              ),
              l: +(100 * i).toFixed(1),
            };
          },
          cf = function (e, t, o) {
            (t /= 100), (o /= 100);
            var n = (1 - Math.abs(2 * o - 1)) * t,
              r = n * (1 - Math.abs(((e / 60) % 2) - 1)),
              a = o - n / 2,
              s = 0,
              i = 0,
              c = 0;
            return (
              e < 60
                ? ((s = n), (i = r), (c = 0))
                : e < 120
                ? ((s = r), (i = n), (c = 0))
                : e < 180
                ? ((s = 0), (i = n), (c = r))
                : e < 240
                ? ((s = 0), (i = r), (c = n))
                : e < 300
                ? ((s = r), (i = 0), (c = n))
                : ((s = n), (i = 0), (c = r)),
              {
                r: Math.round(255 * (s + a)),
                g: Math.round(255 * (i + a)),
                b: Math.round(255 * (c + a)),
              }
            );
          },
          lf = function (e, t, o, n) {
            var r = 1 - n / 100,
              a = function (e) {
                return Math.max(0, Math.min(255, Math.floor(e * r)));
              };
            return { r: a(e), g: a(t), b: a(o) };
          };
        function uf(e, t) {
          return function () {
            return e.apply(t, arguments);
          };
        }
        var df = o(606);
        const { toString: pf } = Object.prototype,
          { getPrototypeOf: hf } = Object,
          { iterator: ff, toStringTag: mf } = Symbol,
          gf =
            ((bf = Object.create(null)),
            (e) => {
              const t = pf.call(e);
              return bf[t] || (bf[t] = t.slice(8, -1).toLowerCase());
            });
        var bf;
        const vf = (e) => ((e = e.toLowerCase()), (t) => gf(t) === e),
          yf = (e) => (t) => typeof t === e,
          { isArray: _f } = Array,
          xf = yf("undefined");
        const Sf = vf("ArrayBuffer");
        const wf = yf("string"),
          Ef = yf("function"),
          Cf = yf("number"),
          Tf = (e) => null !== e && "object" == typeof e,
          kf = (e) => {
            if ("object" !== gf(e)) return !1;
            const t = hf(e);
            return !(
              (null !== t &&
                t !== Object.prototype &&
                null !== Object.getPrototypeOf(t)) ||
              mf in e ||
              ff in e
            );
          },
          Af = vf("Date"),
          Of = vf("File"),
          Rf = vf("Blob"),
          Nf = vf("FileList"),
          jf = vf("URLSearchParams"),
          [If, Pf, Lf, Mf] = [
            "ReadableStream",
            "Request",
            "Response",
            "Headers",
          ].map(vf);
        function Uf(e, t, { allOwnKeys: o = !1 } = {}) {
          if (null == e) return;
          let n, r;
          if (("object" != typeof e && (e = [e]), _f(e)))
            for (n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
          else {
            const r = o ? Object.getOwnPropertyNames(e) : Object.keys(e),
              a = r.length;
            let s;
            for (n = 0; n < a; n++) (s = r[n]), t.call(null, e[s], s, e);
          }
        }
        function Df(e, t) {
          t = t.toLowerCase();
          const o = Object.keys(e);
          let n,
            r = o.length;
          for (; r-- > 0; ) if (((n = o[r]), t === n.toLowerCase())) return n;
          return null;
        }
        const Bf =
            "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : global,
          qf = (e) => !xf(e) && e !== Bf;
        const Ff =
          ((zf = "undefined" != typeof Uint8Array && hf(Uint8Array)),
          (e) => zf && e instanceof zf);
        var zf;
        const $f = vf("HTMLFormElement"),
          Vf = (
            ({ hasOwnProperty: e }) =>
            (t, o) =>
              e.call(t, o)
          )(Object.prototype),
          Hf = vf("RegExp"),
          Wf = (e, t) => {
            const o = Object.getOwnPropertyDescriptors(e),
              n = {};
            Uf(o, (o, r) => {
              let a;
              !1 !== (a = t(o, r, e)) && (n[r] = a || o);
            }),
              Object.defineProperties(e, n);
          };
        const Yf = vf("AsyncFunction"),
          Kf =
            ((Gf = "function" == typeof setImmediate),
            (Jf = Ef(Bf.postMessage)),
            Gf
              ? setImmediate
              : Jf
              ? ((Xf = `axios@${Math.random()}`),
                (Zf = []),
                Bf.addEventListener(
                  "message",
                  ({ source: e, data: t }) => {
                    e === Bf && t === Xf && Zf.length && Zf.shift()();
                  },
                  !1
                ),
                (e) => {
                  Zf.push(e), Bf.postMessage(Xf, "*");
                })
              : (e) => setTimeout(e));
        var Gf, Jf, Xf, Zf;
        const Qf =
            "undefined" != typeof queueMicrotask
              ? queueMicrotask.bind(Bf)
              : (void 0 !== df && df.nextTick) || Kf,
          em = {
            isArray: _f,
            isArrayBuffer: Sf,
            isBuffer: function (e) {
              return (
                null !== e &&
                !xf(e) &&
                null !== e.constructor &&
                !xf(e.constructor) &&
                Ef(e.constructor.isBuffer) &&
                e.constructor.isBuffer(e)
              );
            },
            isFormData: (e) => {
              let t;
              return (
                e &&
                (("function" == typeof FormData && e instanceof FormData) ||
                  (Ef(e.append) &&
                    ("formdata" === (t = gf(e)) ||
                      ("object" === t &&
                        Ef(e.toString) &&
                        "[object FormData]" === e.toString()))))
              );
            },
            isArrayBufferView: function (e) {
              let t;
              return (
                (t =
                  "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
                    ? ArrayBuffer.isView(e)
                    : e && e.buffer && Sf(e.buffer)),
                t
              );
            },
            isString: wf,
            isNumber: Cf,
            isBoolean: (e) => !0 === e || !1 === e,
            isObject: Tf,
            isPlainObject: kf,
            isReadableStream: If,
            isRequest: Pf,
            isResponse: Lf,
            isHeaders: Mf,
            isUndefined: xf,
            isDate: Af,
            isFile: Of,
            isBlob: Rf,
            isRegExp: Hf,
            isFunction: Ef,
            isStream: (e) => Tf(e) && Ef(e.pipe),
            isURLSearchParams: jf,
            isTypedArray: Ff,
            isFileList: Nf,
            forEach: Uf,
            merge: function e() {
              const { caseless: t } = (qf(this) && this) || {},
                o = {},
                n = (n, r) => {
                  const a = (t && Df(o, r)) || r;
                  kf(o[a]) && kf(n)
                    ? (o[a] = e(o[a], n))
                    : kf(n)
                    ? (o[a] = e({}, n))
                    : _f(n)
                    ? (o[a] = n.slice())
                    : (o[a] = n);
                };
              for (let e = 0, t = arguments.length; e < t; e++)
                arguments[e] && Uf(arguments[e], n);
              return o;
            },
            extend: (e, t, o, { allOwnKeys: n } = {}) => (
              Uf(
                t,
                (t, n) => {
                  o && Ef(t) ? (e[n] = uf(t, o)) : (e[n] = t);
                },
                { allOwnKeys: n }
              ),
              e
            ),
            trim: (e) =>
              e.trim
                ? e.trim()
                : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
            stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
            inherits: (e, t, o, n) => {
              (e.prototype = Object.create(t.prototype, n)),
                (e.prototype.constructor = e),
                Object.defineProperty(e, "super", { value: t.prototype }),
                o && Object.assign(e.prototype, o);
            },
            toFlatObject: (e, t, o, n) => {
              let r, a, s;
              const i = {};
              if (((t = t || {}), null == e)) return t;
              do {
                for (r = Object.getOwnPropertyNames(e), a = r.length; a-- > 0; )
                  (s = r[a]),
                    (n && !n(s, e, t)) || i[s] || ((t[s] = e[s]), (i[s] = !0));
                e = !1 !== o && hf(e);
              } while (e && (!o || o(e, t)) && e !== Object.prototype);
              return t;
            },
            kindOf: gf,
            kindOfTest: vf,
            endsWith: (e, t, o) => {
              (e = String(e)),
                (void 0 === o || o > e.length) && (o = e.length),
                (o -= t.length);
              const n = e.indexOf(t, o);
              return -1 !== n && n === o;
            },
            toArray: (e) => {
              if (!e) return null;
              if (_f(e)) return e;
              let t = e.length;
              if (!Cf(t)) return null;
              const o = new Array(t);
              for (; t-- > 0; ) o[t] = e[t];
              return o;
            },
            forEachEntry: (e, t) => {
              const o = (e && e[ff]).call(e);
              let n;
              for (; (n = o.next()) && !n.done; ) {
                const o = n.value;
                t.call(e, o[0], o[1]);
              }
            },
            matchAll: (e, t) => {
              let o;
              const n = [];
              for (; null !== (o = e.exec(t)); ) n.push(o);
              return n;
            },
            isHTMLForm: $f,
            hasOwnProperty: Vf,
            hasOwnProp: Vf,
            reduceDescriptors: Wf,
            freezeMethods: (e) => {
              Wf(e, (t, o) => {
                if (
                  Ef(e) &&
                  -1 !== ["arguments", "caller", "callee"].indexOf(o)
                )
                  return !1;
                const n = e[o];
                Ef(n) &&
                  ((t.enumerable = !1),
                  "writable" in t
                    ? (t.writable = !1)
                    : t.set ||
                      (t.set = () => {
                        throw Error(
                          "Can not rewrite read-only method '" + o + "'"
                        );
                      }));
              });
            },
            toObjectSet: (e, t) => {
              const o = {},
                n = (e) => {
                  e.forEach((e) => {
                    o[e] = !0;
                  });
                };
              return _f(e) ? n(e) : n(String(e).split(t)), o;
            },
            toCamelCase: (e) =>
              e
                .toLowerCase()
                .replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, o) {
                  return t.toUpperCase() + o;
                }),
            noop: () => {},
            toFiniteNumber: (e, t) =>
              null != e && Number.isFinite((e = +e)) ? e : t,
            findKey: Df,
            global: Bf,
            isContextDefined: qf,
            isSpecCompliantForm: function (e) {
              return !!(e && Ef(e.append) && "FormData" === e[mf] && e[ff]);
            },
            toJSONObject: (e) => {
              const t = new Array(10),
                o = (e, n) => {
                  if (Tf(e)) {
                    if (t.indexOf(e) >= 0) return;
                    if (!("toJSON" in e)) {
                      t[n] = e;
                      const r = _f(e) ? [] : {};
                      return (
                        Uf(e, (e, t) => {
                          const a = o(e, n + 1);
                          !xf(a) && (r[t] = a);
                        }),
                        (t[n] = void 0),
                        r
                      );
                    }
                  }
                  return e;
                };
              return o(e, 0);
            },
            isAsyncFn: Yf,
            isThenable: (e) =>
              e && (Tf(e) || Ef(e)) && Ef(e.then) && Ef(e.catch),
            setImmediate: Kf,
            asap: Qf,
            isIterable: (e) => null != e && Ef(e[ff]),
          };
        function tm(e, t, o, n, r) {
          Error.call(this),
            Error.captureStackTrace
              ? Error.captureStackTrace(this, this.constructor)
              : (this.stack = new Error().stack),
            (this.message = e),
            (this.name = "AxiosError"),
            t && (this.code = t),
            o && (this.config = o),
            n && (this.request = n),
            r &&
              ((this.response = r), (this.status = r.status ? r.status : null));
        }
        em.inherits(tm, Error, {
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
              config: em.toJSONObject(this.config),
              code: this.code,
              status: this.status,
            };
          },
        });
        const om = tm.prototype,
          nm = {};
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
          nm[e] = { value: e };
        }),
          Object.defineProperties(tm, nm),
          Object.defineProperty(om, "isAxiosError", { value: !0 }),
          (tm.from = (e, t, o, n, r, a) => {
            const s = Object.create(om);
            return (
              em.toFlatObject(
                e,
                s,
                function (e) {
                  return e !== Error.prototype;
                },
                (e) => "isAxiosError" !== e
              ),
              tm.call(s, e.message, t, o, n, r),
              (s.cause = e),
              (s.name = e.name),
              a && Object.assign(s, a),
              s
            );
          });
        const rm = tm;
        var am = o(287).hp;
        function sm(e) {
          return em.isPlainObject(e) || em.isArray(e);
        }
        function im(e) {
          return em.endsWith(e, "[]") ? e.slice(0, -2) : e;
        }
        function cm(e, t, o) {
          return e
            ? e
                .concat(t)
                .map(function (e, t) {
                  return (e = im(e)), !o && t ? "[" + e + "]" : e;
                })
                .join(o ? "." : "")
            : t;
        }
        const lm = em.toFlatObject(em, {}, null, function (e) {
          return /^is[A-Z]/.test(e);
        });
        const um = function (e, t, o) {
          if (!em.isObject(e)) throw new TypeError("target must be an object");
          t = t || new FormData();
          const n = (o = em.toFlatObject(
              o,
              { metaTokens: !0, dots: !1, indexes: !1 },
              !1,
              function (e, t) {
                return !em.isUndefined(t[e]);
              }
            )).metaTokens,
            r = o.visitor || l,
            a = o.dots,
            s = o.indexes,
            i =
              (o.Blob || ("undefined" != typeof Blob && Blob)) &&
              em.isSpecCompliantForm(t);
          if (!em.isFunction(r))
            throw new TypeError("visitor must be a function");
          function c(e) {
            if (null === e) return "";
            if (em.isDate(e)) return e.toISOString();
            if (em.isBoolean(e)) return e.toString();
            if (!i && em.isBlob(e))
              throw new rm("Blob is not supported. Use a Buffer instead.");
            return em.isArrayBuffer(e) || em.isTypedArray(e)
              ? i && "function" == typeof Blob
                ? new Blob([e])
                : am.from(e)
              : e;
          }
          function l(e, o, r) {
            let i = e;
            if (e && !r && "object" == typeof e)
              if (em.endsWith(o, "{}"))
                (o = n ? o : o.slice(0, -2)), (e = JSON.stringify(e));
              else if (
                (em.isArray(e) &&
                  (function (e) {
                    return em.isArray(e) && !e.some(sm);
                  })(e)) ||
                ((em.isFileList(e) || em.endsWith(o, "[]")) &&
                  (i = em.toArray(e)))
              )
                return (
                  (o = im(o)),
                  i.forEach(function (e, n) {
                    !em.isUndefined(e) &&
                      null !== e &&
                      t.append(
                        !0 === s ? cm([o], n, a) : null === s ? o : o + "[]",
                        c(e)
                      );
                  }),
                  !1
                );
            return !!sm(e) || (t.append(cm(r, o, a), c(e)), !1);
          }
          const u = [],
            d = Object.assign(lm, {
              defaultVisitor: l,
              convertValue: c,
              isVisitable: sm,
            });
          if (!em.isObject(e)) throw new TypeError("data must be an object");
          return (
            (function e(o, n) {
              if (!em.isUndefined(o)) {
                if (-1 !== u.indexOf(o))
                  throw Error("Circular reference detected in " + n.join("."));
                u.push(o),
                  em.forEach(o, function (o, a) {
                    !0 ===
                      (!(em.isUndefined(o) || null === o) &&
                        r.call(t, o, em.isString(a) ? a.trim() : a, n, d)) &&
                      e(o, n ? n.concat(a) : [a]);
                  }),
                  u.pop();
              }
            })(e),
            t
          );
        };
        function dm(e) {
          const t = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0",
          };
          return encodeURIComponent(e).replace(
            /[!'()~]|%20|%00/g,
            function (e) {
              return t[e];
            }
          );
        }
        function pm(e, t) {
          (this._pairs = []), e && um(e, this, t);
        }
        const hm = pm.prototype;
        (hm.append = function (e, t) {
          this._pairs.push([e, t]);
        }),
          (hm.toString = function (e) {
            const t = e
              ? function (t) {
                  return e.call(this, t, dm);
                }
              : dm;
            return this._pairs
              .map(function (e) {
                return t(e[0]) + "=" + t(e[1]);
              }, "")
              .join("&");
          });
        const fm = pm;
        function mm(e) {
          return encodeURIComponent(e)
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }
        function gm(e, t, o) {
          if (!t) return e;
          const n = (o && o.encode) || mm;
          em.isFunction(o) && (o = { serialize: o });
          const r = o && o.serialize;
          let a;
          if (
            ((a = r
              ? r(t, o)
              : em.isURLSearchParams(t)
              ? t.toString()
              : new fm(t, o).toString(n)),
            a)
          ) {
            const t = e.indexOf("#");
            -1 !== t && (e = e.slice(0, t)),
              (e += (-1 === e.indexOf("?") ? "?" : "&") + a);
          }
          return e;
        }
        const bm = class {
            constructor() {
              this.handlers = [];
            }
            use(e, t, o) {
              return (
                this.handlers.push({
                  fulfilled: e,
                  rejected: t,
                  synchronous: !!o && o.synchronous,
                  runWhen: o ? o.runWhen : null,
                }),
                this.handlers.length - 1
              );
            }
            eject(e) {
              this.handlers[e] && (this.handlers[e] = null);
            }
            clear() {
              this.handlers && (this.handlers = []);
            }
            forEach(e) {
              em.forEach(this.handlers, function (t) {
                null !== t && e(t);
              });
            }
          },
          vm = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1,
          },
          ym = {
            isBrowser: !0,
            classes: {
              URLSearchParams:
                "undefined" != typeof URLSearchParams ? URLSearchParams : fm,
              FormData: "undefined" != typeof FormData ? FormData : null,
              Blob: "undefined" != typeof Blob ? Blob : null,
            },
            protocols: ["http", "https", "file", "blob", "url", "data"],
          },
          _m = "undefined" != typeof window && "undefined" != typeof document,
          xm = ("object" == typeof navigator && navigator) || void 0,
          Sm =
            _m &&
            (!xm ||
              ["ReactNative", "NativeScript", "NS"].indexOf(xm.product) < 0),
          wm =
            "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            "function" == typeof self.importScripts,
          Em = (_m && window.location.href) || "http://localhost",
          Cm = { ...r, ...ym };
        const Tm = function (e) {
          function t(e, o, n, r) {
            let a = e[r++];
            if ("__proto__" === a) return !0;
            const s = Number.isFinite(+a),
              i = r >= e.length;
            if (((a = !a && em.isArray(n) ? n.length : a), i))
              return em.hasOwnProp(n, a) ? (n[a] = [n[a], o]) : (n[a] = o), !s;
            (n[a] && em.isObject(n[a])) || (n[a] = []);
            return (
              t(e, o, n[a], r) &&
                em.isArray(n[a]) &&
                (n[a] = (function (e) {
                  const t = {},
                    o = Object.keys(e);
                  let n;
                  const r = o.length;
                  let a;
                  for (n = 0; n < r; n++) (a = o[n]), (t[a] = e[a]);
                  return t;
                })(n[a])),
              !s
            );
          }
          if (em.isFormData(e) && em.isFunction(e.entries)) {
            const o = {};
            return (
              em.forEachEntry(e, (e, n) => {
                t(
                  (function (e) {
                    return em
                      .matchAll(/\w+|\[(\w*)]/g, e)
                      .map((e) => ("[]" === e[0] ? "" : e[1] || e[0]));
                  })(e),
                  n,
                  o,
                  0
                );
              }),
              o
            );
          }
          return null;
        };
        const km = {
          transitional: vm,
          adapter: ["xhr", "http", "fetch"],
          transformRequest: [
            function (e, t) {
              const o = t.getContentType() || "",
                n = o.indexOf("application/json") > -1,
                r = em.isObject(e);
              r && em.isHTMLForm(e) && (e = new FormData(e));
              if (em.isFormData(e)) return n ? JSON.stringify(Tm(e)) : e;
              if (
                em.isArrayBuffer(e) ||
                em.isBuffer(e) ||
                em.isStream(e) ||
                em.isFile(e) ||
                em.isBlob(e) ||
                em.isReadableStream(e)
              )
                return e;
              if (em.isArrayBufferView(e)) return e.buffer;
              if (em.isURLSearchParams(e))
                return (
                  t.setContentType(
                    "application/x-www-form-urlencoded;charset=utf-8",
                    !1
                  ),
                  e.toString()
                );
              let a;
              if (r) {
                if (o.indexOf("application/x-www-form-urlencoded") > -1)
                  return (function (e, t) {
                    return um(
                      e,
                      new Cm.classes.URLSearchParams(),
                      Object.assign(
                        {
                          visitor: function (e, t, o, n) {
                            return Cm.isNode && em.isBuffer(e)
                              ? (this.append(t, e.toString("base64")), !1)
                              : n.defaultVisitor.apply(this, arguments);
                          },
                        },
                        t
                      )
                    );
                  })(e, this.formSerializer).toString();
                if (
                  (a = em.isFileList(e)) ||
                  o.indexOf("multipart/form-data") > -1
                ) {
                  const t = this.env && this.env.FormData;
                  return um(
                    a ? { "files[]": e } : e,
                    t && new t(),
                    this.formSerializer
                  );
                }
              }
              return r || n
                ? (t.setContentType("application/json", !1),
                  (function (e, t, o) {
                    if (em.isString(e))
                      try {
                        return (t || JSON.parse)(e), em.trim(e);
                      } catch (e) {
                        if ("SyntaxError" !== e.name) throw e;
                      }
                    return (o || JSON.stringify)(e);
                  })(e))
                : e;
            },
          ],
          transformResponse: [
            function (e) {
              const t = this.transitional || km.transitional,
                o = t && t.forcedJSONParsing,
                n = "json" === this.responseType;
              if (em.isResponse(e) || em.isReadableStream(e)) return e;
              if (e && em.isString(e) && ((o && !this.responseType) || n)) {
                const o = !(t && t.silentJSONParsing) && n;
                try {
                  return JSON.parse(e);
                } catch (e) {
                  if (o) {
                    if ("SyntaxError" === e.name)
                      throw rm.from(
                        e,
                        rm.ERR_BAD_RESPONSE,
                        this,
                        null,
                        this.response
                      );
                    throw e;
                  }
                }
              }
              return e;
            },
          ],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          env: { FormData: Cm.classes.FormData, Blob: Cm.classes.Blob },
          validateStatus: function (e) {
            return e >= 200 && e < 300;
          },
          headers: {
            common: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": void 0,
            },
          },
        };
        em.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
          km.headers[e] = {};
        });
        const Am = km,
          Om = em.toObjectSet([
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
          Rm = Symbol("internals");
        function Nm(e) {
          return e && String(e).trim().toLowerCase();
        }
        function jm(e) {
          return !1 === e || null == e
            ? e
            : em.isArray(e)
            ? e.map(jm)
            : String(e);
        }
        function Im(e, t, o, n, r) {
          return em.isFunction(n)
            ? n.call(this, t, o)
            : (r && (t = o),
              em.isString(t)
                ? em.isString(n)
                  ? -1 !== t.indexOf(n)
                  : em.isRegExp(n)
                  ? n.test(t)
                  : void 0
                : void 0);
        }
        class Pm {
          constructor(e) {
            e && this.set(e);
          }
          set(e, t, o) {
            const n = this;
            function r(e, t, o) {
              const r = Nm(t);
              if (!r) throw new Error("header name must be a non-empty string");
              const a = em.findKey(n, r);
              (!a ||
                void 0 === n[a] ||
                !0 === o ||
                (void 0 === o && !1 !== n[a])) &&
                (n[a || t] = jm(e));
            }
            const a = (e, t) => em.forEach(e, (e, o) => r(e, o, t));
            if (em.isPlainObject(e) || e instanceof this.constructor) a(e, t);
            else if (
              em.isString(e) &&
              (e = e.trim()) &&
              !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
            )
              a(
                ((e) => {
                  const t = {};
                  let o, n, r;
                  return (
                    e &&
                      e.split("\n").forEach(function (e) {
                        (r = e.indexOf(":")),
                          (o = e.substring(0, r).trim().toLowerCase()),
                          (n = e.substring(r + 1).trim()),
                          !o ||
                            (t[o] && Om[o]) ||
                            ("set-cookie" === o
                              ? t[o]
                                ? t[o].push(n)
                                : (t[o] = [n])
                              : (t[o] = t[o] ? t[o] + ", " + n : n));
                      }),
                    t
                  );
                })(e),
                t
              );
            else if (em.isObject(e) && em.isIterable(e)) {
              let o,
                n,
                r = {};
              for (const t of e) {
                if (!em.isArray(t))
                  throw TypeError(
                    "Object iterator must return a key-value pair"
                  );
                r[(n = t[0])] = (o = r[n])
                  ? em.isArray(o)
                    ? [...o, t[1]]
                    : [o, t[1]]
                  : t[1];
              }
              a(r, t);
            } else null != e && r(t, e, o);
            return this;
          }
          get(e, t) {
            if ((e = Nm(e))) {
              const o = em.findKey(this, e);
              if (o) {
                const e = this[o];
                if (!t) return e;
                if (!0 === t)
                  return (function (e) {
                    const t = Object.create(null),
                      o = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                    let n;
                    for (; (n = o.exec(e)); ) t[n[1]] = n[2];
                    return t;
                  })(e);
                if (em.isFunction(t)) return t.call(this, e, o);
                if (em.isRegExp(t)) return t.exec(e);
                throw new TypeError("parser must be boolean|regexp|function");
              }
            }
          }
          has(e, t) {
            if ((e = Nm(e))) {
              const o = em.findKey(this, e);
              return !(
                !o ||
                void 0 === this[o] ||
                (t && !Im(0, this[o], o, t))
              );
            }
            return !1;
          }
          delete(e, t) {
            const o = this;
            let n = !1;
            function r(e) {
              if ((e = Nm(e))) {
                const r = em.findKey(o, e);
                !r || (t && !Im(0, o[r], r, t)) || (delete o[r], (n = !0));
              }
            }
            return em.isArray(e) ? e.forEach(r) : r(e), n;
          }
          clear(e) {
            const t = Object.keys(this);
            let o = t.length,
              n = !1;
            for (; o--; ) {
              const r = t[o];
              (e && !Im(0, this[r], r, e, !0)) || (delete this[r], (n = !0));
            }
            return n;
          }
          normalize(e) {
            const t = this,
              o = {};
            return (
              em.forEach(this, (n, r) => {
                const a = em.findKey(o, r);
                if (a) return (t[a] = jm(n)), void delete t[r];
                const s = e
                  ? (function (e) {
                      return e
                        .trim()
                        .toLowerCase()
                        .replace(
                          /([a-z\d])(\w*)/g,
                          (e, t, o) => t.toUpperCase() + o
                        );
                    })(r)
                  : String(r).trim();
                s !== r && delete t[r], (t[s] = jm(n)), (o[s] = !0);
              }),
              this
            );
          }
          concat(...e) {
            return this.constructor.concat(this, ...e);
          }
          toJSON(e) {
            const t = Object.create(null);
            return (
              em.forEach(this, (o, n) => {
                null != o &&
                  !1 !== o &&
                  (t[n] = e && em.isArray(o) ? o.join(", ") : o);
              }),
              t
            );
          }
          [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]();
          }
          toString() {
            return Object.entries(this.toJSON())
              .map(([e, t]) => e + ": " + t)
              .join("\n");
          }
          getSetCookie() {
            return this.get("set-cookie") || [];
          }
          get [Symbol.toStringTag]() {
            return "AxiosHeaders";
          }
          static from(e) {
            return e instanceof this ? e : new this(e);
          }
          static concat(e, ...t) {
            const o = new this(e);
            return t.forEach((e) => o.set(e)), o;
          }
          static accessor(e) {
            const t = (this[Rm] = this[Rm] = { accessors: {} }).accessors,
              o = this.prototype;
            function n(e) {
              const n = Nm(e);
              t[n] ||
                (!(function (e, t) {
                  const o = em.toCamelCase(" " + t);
                  ["get", "set", "has"].forEach((n) => {
                    Object.defineProperty(e, n + o, {
                      value: function (e, o, r) {
                        return this[n].call(this, t, e, o, r);
                      },
                      configurable: !0,
                    });
                  });
                })(o, e),
                (t[n] = !0));
            }
            return em.isArray(e) ? e.forEach(n) : n(e), this;
          }
        }
        Pm.accessor([
          "Content-Type",
          "Content-Length",
          "Accept",
          "Accept-Encoding",
          "User-Agent",
          "Authorization",
        ]),
          em.reduceDescriptors(Pm.prototype, ({ value: e }, t) => {
            let o = t[0].toUpperCase() + t.slice(1);
            return {
              get: () => e,
              set(e) {
                this[o] = e;
              },
            };
          }),
          em.freezeMethods(Pm);
        const Lm = Pm;
        function Mm(e, t) {
          const o = this || Am,
            n = t || o,
            r = Lm.from(n.headers);
          let a = n.data;
          return (
            em.forEach(e, function (e) {
              a = e.call(o, a, r.normalize(), t ? t.status : void 0);
            }),
            r.normalize(),
            a
          );
        }
        function Um(e) {
          return !(!e || !e.__CANCEL__);
        }
        function Dm(e, t, o) {
          rm.call(this, null == e ? "canceled" : e, rm.ERR_CANCELED, t, o),
            (this.name = "CanceledError");
        }
        em.inherits(Dm, rm, { __CANCEL__: !0 });
        const Bm = Dm;
        function qm(e, t, o) {
          const n = o.config.validateStatus;
          o.status && n && !n(o.status)
            ? t(
                new rm(
                  "Request failed with status code " + o.status,
                  [rm.ERR_BAD_REQUEST, rm.ERR_BAD_RESPONSE][
                    Math.floor(o.status / 100) - 4
                  ],
                  o.config,
                  o.request,
                  o
                )
              )
            : e(o);
        }
        const Fm = function (e, t) {
          e = e || 10;
          const o = new Array(e),
            n = new Array(e);
          let r,
            a = 0,
            s = 0;
          return (
            (t = void 0 !== t ? t : 1e3),
            function (i) {
              const c = Date.now(),
                l = n[s];
              r || (r = c), (o[a] = i), (n[a] = c);
              let u = s,
                d = 0;
              for (; u !== a; ) (d += o[u++]), (u %= e);
              if (((a = (a + 1) % e), a === s && (s = (s + 1) % e), c - r < t))
                return;
              const p = l && c - l;
              return p ? Math.round((1e3 * d) / p) : void 0;
            }
          );
        };
        const zm = function (e, t) {
            let o,
              n,
              r = 0,
              a = 1e3 / t;
            const s = (t, a = Date.now()) => {
              (r = a),
                (o = null),
                n && (clearTimeout(n), (n = null)),
                e.apply(null, t);
            };
            return [
              (...e) => {
                const t = Date.now(),
                  i = t - r;
                i >= a
                  ? s(e, t)
                  : ((o = e),
                    n ||
                      (n = setTimeout(() => {
                        (n = null), s(o);
                      }, a - i)));
              },
              () => o && s(o),
            ];
          },
          $m = (e, t, o = 3) => {
            let n = 0;
            const r = Fm(50, 250);
            return zm((o) => {
              const a = o.loaded,
                s = o.lengthComputable ? o.total : void 0,
                i = a - n,
                c = r(i);
              n = a;
              e({
                loaded: a,
                total: s,
                progress: s ? a / s : void 0,
                bytes: i,
                rate: c || void 0,
                estimated: c && s && a <= s ? (s - a) / c : void 0,
                event: o,
                lengthComputable: null != s,
                [t ? "download" : "upload"]: !0,
              });
            }, o);
          },
          Vm = (e, t) => {
            const o = null != e;
            return [
              (n) => t[0]({ lengthComputable: o, total: e, loaded: n }),
              t[1],
            ];
          },
          Hm =
            (e) =>
            (...t) =>
              em.asap(() => e(...t)),
          Wm = Cm.hasStandardBrowserEnv
            ? ((e, t) => (o) => (
                (o = new URL(o, Cm.origin)),
                e.protocol === o.protocol &&
                  e.host === o.host &&
                  (t || e.port === o.port)
              ))(
                new URL(Cm.origin),
                Cm.navigator && /(msie|trident)/i.test(Cm.navigator.userAgent)
              )
            : () => !0,
          Ym = Cm.hasStandardBrowserEnv
            ? {
                write(e, t, o, n, r, a) {
                  const s = [e + "=" + encodeURIComponent(t)];
                  em.isNumber(o) &&
                    s.push("expires=" + new Date(o).toGMTString()),
                    em.isString(n) && s.push("path=" + n),
                    em.isString(r) && s.push("domain=" + r),
                    !0 === a && s.push("secure"),
                    (document.cookie = s.join("; "));
                },
                read(e) {
                  const t = document.cookie.match(
                    new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                  );
                  return t ? decodeURIComponent(t[3]) : null;
                },
                remove(e) {
                  this.write(e, "", Date.now() - 864e5);
                },
              }
            : { write() {}, read: () => null, remove() {} };
        function Km(e, t, o) {
          let n = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
          return e && (n || 0 == o)
            ? (function (e, t) {
                return t
                  ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "")
                  : e;
              })(e, t)
            : t;
        }
        const Gm = (e) => (e instanceof Lm ? { ...e } : e);
        function Jm(e, t) {
          t = t || {};
          const o = {};
          function n(e, t, o, n) {
            return em.isPlainObject(e) && em.isPlainObject(t)
              ? em.merge.call({ caseless: n }, e, t)
              : em.isPlainObject(t)
              ? em.merge({}, t)
              : em.isArray(t)
              ? t.slice()
              : t;
          }
          function r(e, t, o, r) {
            return em.isUndefined(t)
              ? em.isUndefined(e)
                ? void 0
                : n(void 0, e, 0, r)
              : n(e, t, 0, r);
          }
          function a(e, t) {
            if (!em.isUndefined(t)) return n(void 0, t);
          }
          function s(e, t) {
            return em.isUndefined(t)
              ? em.isUndefined(e)
                ? void 0
                : n(void 0, e)
              : n(void 0, t);
          }
          function i(o, r, a) {
            return a in t ? n(o, r) : a in e ? n(void 0, o) : void 0;
          }
          const c = {
            url: a,
            method: a,
            data: a,
            baseURL: s,
            transformRequest: s,
            transformResponse: s,
            paramsSerializer: s,
            timeout: s,
            timeoutMessage: s,
            withCredentials: s,
            withXSRFToken: s,
            adapter: s,
            responseType: s,
            xsrfCookieName: s,
            xsrfHeaderName: s,
            onUploadProgress: s,
            onDownloadProgress: s,
            decompress: s,
            maxContentLength: s,
            maxBodyLength: s,
            beforeRedirect: s,
            transport: s,
            httpAgent: s,
            httpsAgent: s,
            cancelToken: s,
            socketPath: s,
            responseEncoding: s,
            validateStatus: i,
            headers: (e, t, o) => r(Gm(e), Gm(t), 0, !0),
          };
          return (
            em.forEach(Object.keys(Object.assign({}, e, t)), function (n) {
              const a = c[n] || r,
                s = a(e[n], t[n], n);
              (em.isUndefined(s) && a !== i) || (o[n] = s);
            }),
            o
          );
        }
        const Xm = (e) => {
            const t = Jm({}, e);
            let o,
              {
                data: n,
                withXSRFToken: r,
                xsrfHeaderName: a,
                xsrfCookieName: s,
                headers: i,
                auth: c,
              } = t;
            if (
              ((t.headers = i = Lm.from(i)),
              (t.url = gm(
                Km(t.baseURL, t.url, t.allowAbsoluteUrls),
                e.params,
                e.paramsSerializer
              )),
              c &&
                i.set(
                  "Authorization",
                  "Basic " +
                    btoa(
                      (c.username || "") +
                        ":" +
                        (c.password
                          ? unescape(encodeURIComponent(c.password))
                          : "")
                    )
                ),
              em.isFormData(n))
            )
              if (Cm.hasStandardBrowserEnv || Cm.hasStandardBrowserWebWorkerEnv)
                i.setContentType(void 0);
              else if (!1 !== (o = i.getContentType())) {
                const [e, ...t] = o
                  ? o
                      .split(";")
                      .map((e) => e.trim())
                      .filter(Boolean)
                  : [];
                i.setContentType([e || "multipart/form-data", ...t].join("; "));
              }
            if (
              Cm.hasStandardBrowserEnv &&
              (r && em.isFunction(r) && (r = r(t)),
              r || (!1 !== r && Wm(t.url)))
            ) {
              const e = a && s && Ym.read(s);
              e && i.set(a, e);
            }
            return t;
          },
          Zm =
            "undefined" != typeof XMLHttpRequest &&
            function (e) {
              return new Promise(function (t, o) {
                const n = Xm(e);
                let r = n.data;
                const a = Lm.from(n.headers).normalize();
                let s,
                  i,
                  c,
                  l,
                  u,
                  {
                    responseType: d,
                    onUploadProgress: p,
                    onDownloadProgress: h,
                  } = n;
                function f() {
                  l && l(),
                    u && u(),
                    n.cancelToken && n.cancelToken.unsubscribe(s),
                    n.signal && n.signal.removeEventListener("abort", s);
                }
                let m = new XMLHttpRequest();
                function g() {
                  if (!m) return;
                  const n = Lm.from(
                    "getAllResponseHeaders" in m && m.getAllResponseHeaders()
                  );
                  qm(
                    function (e) {
                      t(e), f();
                    },
                    function (e) {
                      o(e), f();
                    },
                    {
                      data:
                        d && "text" !== d && "json" !== d
                          ? m.response
                          : m.responseText,
                      status: m.status,
                      statusText: m.statusText,
                      headers: n,
                      config: e,
                      request: m,
                    }
                  ),
                    (m = null);
                }
                m.open(n.method.toUpperCase(), n.url, !0),
                  (m.timeout = n.timeout),
                  "onloadend" in m
                    ? (m.onloadend = g)
                    : (m.onreadystatechange = function () {
                        m &&
                          4 === m.readyState &&
                          (0 !== m.status ||
                            (m.responseURL &&
                              0 === m.responseURL.indexOf("file:"))) &&
                          setTimeout(g);
                      }),
                  (m.onabort = function () {
                    m &&
                      (o(new rm("Request aborted", rm.ECONNABORTED, e, m)),
                      (m = null));
                  }),
                  (m.onerror = function () {
                    o(new rm("Network Error", rm.ERR_NETWORK, e, m)),
                      (m = null);
                  }),
                  (m.ontimeout = function () {
                    let t = n.timeout
                      ? "timeout of " + n.timeout + "ms exceeded"
                      : "timeout exceeded";
                    const r = n.transitional || vm;
                    n.timeoutErrorMessage && (t = n.timeoutErrorMessage),
                      o(
                        new rm(
                          t,
                          r.clarifyTimeoutError
                            ? rm.ETIMEDOUT
                            : rm.ECONNABORTED,
                          e,
                          m
                        )
                      ),
                      (m = null);
                  }),
                  void 0 === r && a.setContentType(null),
                  "setRequestHeader" in m &&
                    em.forEach(a.toJSON(), function (e, t) {
                      m.setRequestHeader(t, e);
                    }),
                  em.isUndefined(n.withCredentials) ||
                    (m.withCredentials = !!n.withCredentials),
                  d && "json" !== d && (m.responseType = n.responseType),
                  h &&
                    (([c, u] = $m(h, !0)), m.addEventListener("progress", c)),
                  p &&
                    m.upload &&
                    (([i, l] = $m(p)),
                    m.upload.addEventListener("progress", i),
                    m.upload.addEventListener("loadend", l)),
                  (n.cancelToken || n.signal) &&
                    ((s = (t) => {
                      m &&
                        (o(!t || t.type ? new Bm(null, e, m) : t),
                        m.abort(),
                        (m = null));
                    }),
                    n.cancelToken && n.cancelToken.subscribe(s),
                    n.signal &&
                      (n.signal.aborted
                        ? s()
                        : n.signal.addEventListener("abort", s)));
                const b = (function (e) {
                  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                  return (t && t[1]) || "";
                })(n.url);
                b && -1 === Cm.protocols.indexOf(b)
                  ? o(
                      new rm(
                        "Unsupported protocol " + b + ":",
                        rm.ERR_BAD_REQUEST,
                        e
                      )
                    )
                  : m.send(r || null);
              });
            },
          Qm = (e, t) => {
            const { length: o } = (e = e ? e.filter(Boolean) : []);
            if (t || o) {
              let o,
                n = new AbortController();
              const r = function (e) {
                if (!o) {
                  (o = !0), s();
                  const t = e instanceof Error ? e : this.reason;
                  n.abort(
                    t instanceof rm
                      ? t
                      : new Bm(t instanceof Error ? t.message : t)
                  );
                }
              };
              let a =
                t &&
                setTimeout(() => {
                  (a = null),
                    r(new rm(`timeout ${t} of ms exceeded`, rm.ETIMEDOUT));
                }, t);
              const s = () => {
                e &&
                  (a && clearTimeout(a),
                  (a = null),
                  e.forEach((e) => {
                    e.unsubscribe
                      ? e.unsubscribe(r)
                      : e.removeEventListener("abort", r);
                  }),
                  (e = null));
              };
              e.forEach((e) => e.addEventListener("abort", r));
              const { signal: i } = n;
              return (i.unsubscribe = () => em.asap(s)), i;
            }
          },
          eg = function* (e, t) {
            let o = e.byteLength;
            if (!t || o < t) return void (yield e);
            let n,
              r = 0;
            for (; r < o; ) (n = r + t), yield e.slice(r, n), (r = n);
          },
          tg = async function* (e) {
            if (e[Symbol.asyncIterator]) return void (yield* e);
            const t = e.getReader();
            try {
              for (;;) {
                const { done: e, value: o } = await t.read();
                if (e) break;
                yield o;
              }
            } finally {
              await t.cancel();
            }
          },
          og = (e, t, o, n) => {
            const r = (async function* (e, t) {
              for await (const o of tg(e)) yield* eg(o, t);
            })(e, t);
            let a,
              s = 0,
              i = (e) => {
                a || ((a = !0), n && n(e));
              };
            return new ReadableStream(
              {
                async pull(e) {
                  try {
                    const { done: t, value: n } = await r.next();
                    if (t) return i(), void e.close();
                    let a = n.byteLength;
                    if (o) {
                      let e = (s += a);
                      o(e);
                    }
                    e.enqueue(new Uint8Array(n));
                  } catch (e) {
                    throw (i(e), e);
                  }
                },
                cancel: (e) => (i(e), r.return()),
              },
              { highWaterMark: 2 }
            );
          },
          ng =
            "function" == typeof fetch &&
            "function" == typeof Request &&
            "function" == typeof Response,
          rg = ng && "function" == typeof ReadableStream,
          ag =
            ng &&
            ("function" == typeof TextEncoder
              ? ((sg = new TextEncoder()), (e) => sg.encode(e))
              : async (e) =>
                  new Uint8Array(await new Response(e).arrayBuffer()));
        var sg;
        const ig = (e, ...t) => {
            try {
              return !!e(...t);
            } catch (e) {
              return !1;
            }
          },
          cg =
            rg &&
            ig(() => {
              let e = !1;
              const t = new Request(Cm.origin, {
                body: new ReadableStream(),
                method: "POST",
                get duplex() {
                  return (e = !0), "half";
                },
              }).headers.has("Content-Type");
              return e && !t;
            }),
          lg = rg && ig(() => em.isReadableStream(new Response("").body)),
          ug = { stream: lg && ((e) => e.body) };
        var dg;
        ng &&
          ((dg = new Response()),
          ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
            !ug[e] &&
              (ug[e] = em.isFunction(dg[e])
                ? (t) => t[e]()
                : (t, o) => {
                    throw new rm(
                      `Response type '${e}' is not supported`,
                      rm.ERR_NOT_SUPPORT,
                      o
                    );
                  });
          }));
        const pg = async (e, t) => {
            const o = em.toFiniteNumber(e.getContentLength());
            return null == o
              ? (async (e) => {
                  if (null == e) return 0;
                  if (em.isBlob(e)) return e.size;
                  if (em.isSpecCompliantForm(e)) {
                    const t = new Request(Cm.origin, {
                      method: "POST",
                      body: e,
                    });
                    return (await t.arrayBuffer()).byteLength;
                  }
                  return em.isArrayBufferView(e) || em.isArrayBuffer(e)
                    ? e.byteLength
                    : (em.isURLSearchParams(e) && (e += ""),
                      em.isString(e) ? (await ag(e)).byteLength : void 0);
                })(t)
              : o;
          },
          hg =
            ng &&
            (async (e) => {
              let {
                url: t,
                method: o,
                data: n,
                signal: r,
                cancelToken: a,
                timeout: s,
                onDownloadProgress: i,
                onUploadProgress: c,
                responseType: l,
                headers: u,
                withCredentials: d = "same-origin",
                fetchOptions: p,
              } = Xm(e);
              l = l ? (l + "").toLowerCase() : "text";
              let h,
                f = Qm([r, a && a.toAbortSignal()], s);
              const m =
                f &&
                f.unsubscribe &&
                (() => {
                  f.unsubscribe();
                });
              let g;
              try {
                if (
                  c &&
                  cg &&
                  "get" !== o &&
                  "head" !== o &&
                  0 !== (g = await pg(u, n))
                ) {
                  let e,
                    o = new Request(t, {
                      method: "POST",
                      body: n,
                      duplex: "half",
                    });
                  if (
                    (em.isFormData(n) &&
                      (e = o.headers.get("content-type")) &&
                      u.setContentType(e),
                    o.body)
                  ) {
                    const [e, t] = Vm(g, $m(Hm(c)));
                    n = og(o.body, 65536, e, t);
                  }
                }
                em.isString(d) || (d = d ? "include" : "omit");
                const r = "credentials" in Request.prototype;
                h = new Request(t, {
                  ...p,
                  signal: f,
                  method: o.toUpperCase(),
                  headers: u.normalize().toJSON(),
                  body: n,
                  duplex: "half",
                  credentials: r ? d : void 0,
                });
                let a = await fetch(h, p);
                const s = lg && ("stream" === l || "response" === l);
                if (lg && (i || (s && m))) {
                  const e = {};
                  ["status", "statusText", "headers"].forEach((t) => {
                    e[t] = a[t];
                  });
                  const t = em.toFiniteNumber(a.headers.get("content-length")),
                    [o, n] = (i && Vm(t, $m(Hm(i), !0))) || [];
                  a = new Response(
                    og(a.body, 65536, o, () => {
                      n && n(), m && m();
                    }),
                    e
                  );
                }
                l = l || "text";
                let b = await ug[em.findKey(ug, l) || "text"](a, e);
                return (
                  !s && m && m(),
                  await new Promise((t, o) => {
                    qm(t, o, {
                      data: b,
                      headers: Lm.from(a.headers),
                      status: a.status,
                      statusText: a.statusText,
                      config: e,
                      request: h,
                    });
                  })
                );
              } catch (t) {
                if (
                  (m && m(),
                  t &&
                    "TypeError" === t.name &&
                    /Load failed|fetch/i.test(t.message))
                )
                  throw Object.assign(
                    new rm("Network Error", rm.ERR_NETWORK, e, h),
                    { cause: t.cause || t }
                  );
                throw rm.from(t, t && t.code, e, h);
              }
            }),
          fg = { http: null, xhr: Zm, fetch: hg };
        em.forEach(fg, (e, t) => {
          if (e) {
            try {
              Object.defineProperty(e, "name", { value: t });
            } catch (e) {}
            Object.defineProperty(e, "adapterName", { value: t });
          }
        });
        const mg = (e) => `- ${e}`,
          gg = (e) => em.isFunction(e) || null === e || !1 === e,
          bg = (e) => {
            e = em.isArray(e) ? e : [e];
            const { length: t } = e;
            let o, n;
            const r = {};
            for (let a = 0; a < t; a++) {
              let t;
              if (
                ((o = e[a]),
                (n = o),
                !gg(o) &&
                  ((n = fg[(t = String(o)).toLowerCase()]), void 0 === n))
              )
                throw new rm(`Unknown adapter '${t}'`);
              if (n) break;
              r[t || "#" + a] = n;
            }
            if (!n) {
              const e = Object.entries(r).map(
                ([e, t]) =>
                  `adapter ${e} ` +
                  (!1 === t
                    ? "is not supported by the environment"
                    : "is not available in the build")
              );
              let o = t
                ? e.length > 1
                  ? "since :\n" + e.map(mg).join("\n")
                  : " " + mg(e[0])
                : "as no adapter specified";
              throw new rm(
                "There is no suitable adapter to dispatch the request " + o,
                "ERR_NOT_SUPPORT"
              );
            }
            return n;
          };
        function vg(e) {
          if (
            (e.cancelToken && e.cancelToken.throwIfRequested(),
            e.signal && e.signal.aborted)
          )
            throw new Bm(null, e);
        }
        function yg(e) {
          vg(e),
            (e.headers = Lm.from(e.headers)),
            (e.data = Mm.call(e, e.transformRequest)),
            -1 !== ["post", "put", "patch"].indexOf(e.method) &&
              e.headers.setContentType("application/x-www-form-urlencoded", !1);
          return bg(e.adapter || Am.adapter)(e).then(
            function (t) {
              return (
                vg(e),
                (t.data = Mm.call(e, e.transformResponse, t)),
                (t.headers = Lm.from(t.headers)),
                t
              );
            },
            function (t) {
              return (
                Um(t) ||
                  (vg(e),
                  t &&
                    t.response &&
                    ((t.response.data = Mm.call(
                      e,
                      e.transformResponse,
                      t.response
                    )),
                    (t.response.headers = Lm.from(t.response.headers)))),
                Promise.reject(t)
              );
            }
          );
        }
        const _g = "1.10.0",
          xg = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach(
          (e, t) => {
            xg[e] = function (o) {
              return typeof o === e || "a" + (t < 1 ? "n " : " ") + e;
            };
          }
        );
        const Sg = {};
        (xg.transitional = function (e, t, o) {
          function n(e, t) {
            return (
              "[Axios v" +
              _g +
              "] Transitional option '" +
              e +
              "'" +
              t +
              (o ? ". " + o : "")
            );
          }
          return (o, r, a) => {
            if (!1 === e)
              throw new rm(
                n(r, " has been removed" + (t ? " in " + t : "")),
                rm.ERR_DEPRECATED
              );
            return (
              t &&
                !Sg[r] &&
                ((Sg[r] = !0),
                console.warn(
                  n(
                    r,
                    " has been deprecated since v" +
                      t +
                      " and will be removed in the near future"
                  )
                )),
              !e || e(o, r, a)
            );
          };
        }),
          (xg.spelling = function (e) {
            return (t, o) => (
              console.warn(`${o} is likely a misspelling of ${e}`), !0
            );
          });
        const wg = {
            assertOptions: function (e, t, o) {
              if ("object" != typeof e)
                throw new rm(
                  "options must be an object",
                  rm.ERR_BAD_OPTION_VALUE
                );
              const n = Object.keys(e);
              let r = n.length;
              for (; r-- > 0; ) {
                const a = n[r],
                  s = t[a];
                if (s) {
                  const t = e[a],
                    o = void 0 === t || s(t, a, e);
                  if (!0 !== o)
                    throw new rm(
                      "option " + a + " must be " + o,
                      rm.ERR_BAD_OPTION_VALUE
                    );
                  continue;
                }
                if (!0 !== o)
                  throw new rm("Unknown option " + a, rm.ERR_BAD_OPTION);
              }
            },
            validators: xg,
          },
          Eg = wg.validators;
        class Cg {
          constructor(e) {
            (this.defaults = e || {}),
              (this.interceptors = { request: new bm(), response: new bm() });
          }
          async request(e, t) {
            try {
              return await this._request(e, t);
            } catch (e) {
              if (e instanceof Error) {
                let t = {};
                Error.captureStackTrace
                  ? Error.captureStackTrace(t)
                  : (t = new Error());
                const o = t.stack ? t.stack.replace(/^.+\n/, "") : "";
                try {
                  e.stack
                    ? o &&
                      !String(e.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
                      (e.stack += "\n" + o)
                    : (e.stack = o);
                } catch (e) {}
              }
              throw e;
            }
          }
          _request(e, t) {
            "string" == typeof e ? ((t = t || {}).url = e) : (t = e || {}),
              (t = Jm(this.defaults, t));
            const { transitional: o, paramsSerializer: n, headers: r } = t;
            void 0 !== o &&
              wg.assertOptions(
                o,
                {
                  silentJSONParsing: Eg.transitional(Eg.boolean),
                  forcedJSONParsing: Eg.transitional(Eg.boolean),
                  clarifyTimeoutError: Eg.transitional(Eg.boolean),
                },
                !1
              ),
              null != n &&
                (em.isFunction(n)
                  ? (t.paramsSerializer = { serialize: n })
                  : wg.assertOptions(
                      n,
                      { encode: Eg.function, serialize: Eg.function },
                      !0
                    )),
              void 0 !== t.allowAbsoluteUrls ||
                (void 0 !== this.defaults.allowAbsoluteUrls
                  ? (t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
                  : (t.allowAbsoluteUrls = !0)),
              wg.assertOptions(
                t,
                {
                  baseUrl: Eg.spelling("baseURL"),
                  withXsrfToken: Eg.spelling("withXSRFToken"),
                },
                !0
              ),
              (t.method = (
                t.method ||
                this.defaults.method ||
                "get"
              ).toLowerCase());
            let a = r && em.merge(r.common, r[t.method]);
            r &&
              em.forEach(
                ["delete", "get", "head", "post", "put", "patch", "common"],
                (e) => {
                  delete r[e];
                }
              ),
              (t.headers = Lm.concat(a, r));
            const s = [];
            let i = !0;
            this.interceptors.request.forEach(function (e) {
              ("function" == typeof e.runWhen && !1 === e.runWhen(t)) ||
                ((i = i && e.synchronous), s.unshift(e.fulfilled, e.rejected));
            });
            const c = [];
            let l;
            this.interceptors.response.forEach(function (e) {
              c.push(e.fulfilled, e.rejected);
            });
            let u,
              d = 0;
            if (!i) {
              const e = [yg.bind(this), void 0];
              for (
                e.unshift.apply(e, s),
                  e.push.apply(e, c),
                  u = e.length,
                  l = Promise.resolve(t);
                d < u;

              )
                l = l.then(e[d++], e[d++]);
              return l;
            }
            u = s.length;
            let p = t;
            for (d = 0; d < u; ) {
              const e = s[d++],
                t = s[d++];
              try {
                p = e(p);
              } catch (e) {
                t.call(this, e);
                break;
              }
            }
            try {
              l = yg.call(this, p);
            } catch (e) {
              return Promise.reject(e);
            }
            for (d = 0, u = c.length; d < u; ) l = l.then(c[d++], c[d++]);
            return l;
          }
          getUri(e) {
            return gm(
              Km(
                (e = Jm(this.defaults, e)).baseURL,
                e.url,
                e.allowAbsoluteUrls
              ),
              e.params,
              e.paramsSerializer
            );
          }
        }
        em.forEach(["delete", "get", "head", "options"], function (e) {
          Cg.prototype[e] = function (t, o) {
            return this.request(
              Jm(o || {}, { method: e, url: t, data: (o || {}).data })
            );
          };
        }),
          em.forEach(["post", "put", "patch"], function (e) {
            function t(t) {
              return function (o, n, r) {
                return this.request(
                  Jm(r || {}, {
                    method: e,
                    headers: t ? { "Content-Type": "multipart/form-data" } : {},
                    url: o,
                    data: n,
                  })
                );
              };
            }
            (Cg.prototype[e] = t()), (Cg.prototype[e + "Form"] = t(!0));
          });
        const Tg = Cg;
        class kg {
          constructor(e) {
            if ("function" != typeof e)
              throw new TypeError("executor must be a function.");
            let t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            const o = this;
            this.promise.then((e) => {
              if (!o._listeners) return;
              let t = o._listeners.length;
              for (; t-- > 0; ) o._listeners[t](e);
              o._listeners = null;
            }),
              (this.promise.then = (e) => {
                let t;
                const n = new Promise((e) => {
                  o.subscribe(e), (t = e);
                }).then(e);
                return (
                  (n.cancel = function () {
                    o.unsubscribe(t);
                  }),
                  n
                );
              }),
              e(function (e, n, r) {
                o.reason || ((o.reason = new Bm(e, n, r)), t(o.reason));
              });
          }
          throwIfRequested() {
            if (this.reason) throw this.reason;
          }
          subscribe(e) {
            this.reason
              ? e(this.reason)
              : this._listeners
              ? this._listeners.push(e)
              : (this._listeners = [e]);
          }
          unsubscribe(e) {
            if (!this._listeners) return;
            const t = this._listeners.indexOf(e);
            -1 !== t && this._listeners.splice(t, 1);
          }
          toAbortSignal() {
            const e = new AbortController(),
              t = (t) => {
                e.abort(t);
              };
            return (
              this.subscribe(t),
              (e.signal.unsubscribe = () => this.unsubscribe(t)),
              e.signal
            );
          }
          static source() {
            let e;
            return {
              token: new kg(function (t) {
                e = t;
              }),
              cancel: e,
            };
          }
        }
        const Ag = kg;
        const Og = {
          Continue: 100,
          SwitchingProtocols: 101,
          Processing: 102,
          EarlyHints: 103,
          Ok: 200,
          Created: 201,
          Accepted: 202,
          NonAuthoritativeInformation: 203,
          NoContent: 204,
          ResetContent: 205,
          PartialContent: 206,
          MultiStatus: 207,
          AlreadyReported: 208,
          ImUsed: 226,
          MultipleChoices: 300,
          MovedPermanently: 301,
          Found: 302,
          SeeOther: 303,
          NotModified: 304,
          UseProxy: 305,
          Unused: 306,
          TemporaryRedirect: 307,
          PermanentRedirect: 308,
          BadRequest: 400,
          Unauthorized: 401,
          PaymentRequired: 402,
          Forbidden: 403,
          NotFound: 404,
          MethodNotAllowed: 405,
          NotAcceptable: 406,
          ProxyAuthenticationRequired: 407,
          RequestTimeout: 408,
          Conflict: 409,
          Gone: 410,
          LengthRequired: 411,
          PreconditionFailed: 412,
          PayloadTooLarge: 413,
          UriTooLong: 414,
          UnsupportedMediaType: 415,
          RangeNotSatisfiable: 416,
          ExpectationFailed: 417,
          ImATeapot: 418,
          MisdirectedRequest: 421,
          UnprocessableEntity: 422,
          Locked: 423,
          FailedDependency: 424,
          TooEarly: 425,
          UpgradeRequired: 426,
          PreconditionRequired: 428,
          TooManyRequests: 429,
          RequestHeaderFieldsTooLarge: 431,
          UnavailableForLegalReasons: 451,
          InternalServerError: 500,
          NotImplemented: 501,
          BadGateway: 502,
          ServiceUnavailable: 503,
          GatewayTimeout: 504,
          HttpVersionNotSupported: 505,
          VariantAlsoNegotiates: 506,
          InsufficientStorage: 507,
          LoopDetected: 508,
          NotExtended: 510,
          NetworkAuthenticationRequired: 511,
        };
        Object.entries(Og).forEach(([e, t]) => {
          Og[t] = e;
        });
        const Rg = Og;
        const Ng = (function e(t) {
          const o = new Tg(t),
            n = uf(Tg.prototype.request, o);
          return (
            em.extend(n, Tg.prototype, o, { allOwnKeys: !0 }),
            em.extend(n, o, null, { allOwnKeys: !0 }),
            (n.create = function (o) {
              return e(Jm(t, o));
            }),
            n
          );
        })(Am);
        (Ng.Axios = Tg),
          (Ng.CanceledError = Bm),
          (Ng.CancelToken = Ag),
          (Ng.isCancel = Um),
          (Ng.VERSION = _g),
          (Ng.toFormData = um),
          (Ng.AxiosError = rm),
          (Ng.Cancel = Ng.CanceledError),
          (Ng.all = function (e) {
            return Promise.all(e);
          }),
          (Ng.spread = function (e) {
            return function (t) {
              return e.apply(null, t);
            };
          }),
          (Ng.isAxiosError = function (e) {
            return em.isObject(e) && !0 === e.isAxiosError;
          }),
          (Ng.mergeConfig = Jm),
          (Ng.AxiosHeaders = Lm),
          (Ng.formToJSON = (e) => Tm(em.isHTMLForm(e) ? new FormData(e) : e)),
          (Ng.getAdapter = bg),
          (Ng.HttpStatusCode = Rg),
          (Ng.default = Ng);
        const jg = Ng;
        function Ig() {
          var e,
            t,
            o = "function" == typeof Symbol ? Symbol : {},
            n = o.iterator || "@@iterator",
            r = o.toStringTag || "@@toStringTag";
          function a(o, n, r, a) {
            var c = n && n.prototype instanceof i ? n : i,
              l = Object.create(c.prototype);
            return (
              Pg(
                l,
                "_invoke",
                (function (o, n, r) {
                  var a,
                    i,
                    c,
                    l = 0,
                    u = r || [],
                    d = !1,
                    p = {
                      p: 0,
                      n: 0,
                      v: e,
                      a: h,
                      f: h.bind(e, 4),
                      d: function (t, o) {
                        return (a = t), (i = 0), (c = e), (p.n = o), s;
                      },
                    };
                  function h(o, n) {
                    for (
                      i = o, c = n, t = 0;
                      !d && l && !r && t < u.length;
                      t++
                    ) {
                      var r,
                        a = u[t],
                        h = p.p,
                        f = a[2];
                      o > 3
                        ? (r = f === n) &&
                          ((c = a[(i = a[4]) ? 5 : ((i = 3), 3)]),
                          (a[4] = a[5] = e))
                        : a[0] <= h &&
                          ((r = o < 2 && h < a[1])
                            ? ((i = 0), (p.v = n), (p.n = a[1]))
                            : h < f &&
                              (r = o < 3 || a[0] > n || n > f) &&
                              ((a[4] = o), (a[5] = n), (p.n = f), (i = 0)));
                    }
                    if (r || o > 1) return s;
                    throw ((d = !0), n);
                  }
                  return function (r, u, f) {
                    if (l > 1) throw TypeError("Generator is already running");
                    for (
                      d && 1 === u && h(u, f), i = u, c = f;
                      (t = i < 2 ? e : c) || !d;

                    ) {
                      a ||
                        (i
                          ? i < 3
                            ? (i > 1 && (p.n = -1), h(i, c))
                            : (p.n = c)
                          : (p.v = c));
                      try {
                        if (((l = 2), a)) {
                          if ((i || (r = "next"), (t = a[r]))) {
                            if (!(t = t.call(a, c)))
                              throw TypeError(
                                "iterator result is not an object"
                              );
                            if (!t.done) return t;
                            (c = t.value), i < 2 && (i = 0);
                          } else
                            1 === i && (t = a.return) && t.call(a),
                              i < 2 &&
                                ((c = TypeError(
                                  "The iterator does not provide a '" +
                                    r +
                                    "' method"
                                )),
                                (i = 1));
                          a = e;
                        } else if ((t = (d = p.n < 0) ? c : o.call(n, p)) !== s)
                          break;
                      } catch (t) {
                        (a = e), (i = 1), (c = t);
                      } finally {
                        l = 1;
                      }
                    }
                    return { value: t, done: d };
                  };
                })(o, r, a),
                !0
              ),
              l
            );
          }
          var s = {};
          function i() {}
          function c() {}
          function l() {}
          t = Object.getPrototypeOf;
          var u = [][n]
              ? t(t([][n]()))
              : (Pg((t = {}), n, function () {
                  return this;
                }),
                t),
            d = (l.prototype = i.prototype = Object.create(u));
          function p(e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, l)
                : ((e.__proto__ = l), Pg(e, r, "GeneratorFunction")),
              (e.prototype = Object.create(d)),
              e
            );
          }
          return (
            (c.prototype = l),
            Pg(d, "constructor", l),
            Pg(l, "constructor", c),
            (c.displayName = "GeneratorFunction"),
            Pg(l, r, "GeneratorFunction"),
            Pg(d),
            Pg(d, r, "Generator"),
            Pg(d, n, function () {
              return this;
            }),
            Pg(d, "toString", function () {
              return "[object Generator]";
            }),
            (Ig = function () {
              return { w: a, m: p };
            })()
          );
        }
        function Pg(e, t, o, n) {
          var r = Object.defineProperty;
          try {
            r({}, "", {});
          } catch (e) {
            r = 0;
          }
          (Pg = function (e, t, o, n) {
            if (t)
              r
                ? r(e, t, {
                    value: o,
                    enumerable: !n,
                    configurable: !n,
                    writable: !n,
                  })
                : (e[t] = o);
            else {
              var a = function (t, o) {
                Pg(e, t, function (e) {
                  return this._invoke(t, o, e);
                });
              };
              a("next", 0), a("throw", 1), a("return", 2);
            }
          }),
            Pg(e, t, o, n);
        }
        function Lg(e, t, o, n, r, a, s) {
          try {
            var i = e[a](s),
              c = i.value;
          } catch (e) {
            return void o(e);
          }
          i.done ? t(c) : Promise.resolve(c).then(n, r);
        }
        function Mg(e) {
          return Ug.apply(this, arguments);
        }
        function Ug() {
          var e;
          return (
            (e = Ig().m(function e(t) {
              var o,
                n,
                r,
                a,
                s,
                i = arguments;
              return Ig().w(
                function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        return (
                          (o = i.length > 1 && void 0 !== i[1] ? i[1] : {}),
                          (n = i.length > 2 ? i[2] : void 0),
                          (e.p = 1),
                          (r =
                            n ||
                            ("function" == typeof GetParentResourceName
                              ? GetParentResourceName()
                              : "nui-fallback")),
                          (e.n = 2),
                          jg.post("https://".concat(r, "/").concat(t), o)
                        );
                      case 2:
                        return (a = e.v), e.a(2, a.data);
                      case 3:
                        return (
                          (e.p = 3),
                          (s = e.v),
                          console.error(
                            "[NUI] Erro ao chamar ".concat(t, ":"),
                            s
                          ),
                          e.a(2, null)
                        );
                    }
                },
                e,
                null,
                [[1, 3]]
              );
            })),
            (Ug = function () {
              var t = this,
                o = arguments;
              return new Promise(function (n, r) {
                var a = e.apply(t, o);
                function s(e) {
                  Lg(a, n, r, s, i, "next", e);
                }
                function i(e) {
                  Lg(a, n, r, s, i, "throw", e);
                }
                s(void 0);
              });
            }),
            Ug.apply(this, arguments)
          );
        }
        function Dg(e) {
          return (
            (Dg =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Dg(e)
          );
        }
        var Bg = function (e) {
            return e < 10 ? "0" + e : e;
          },
          qg = (function (e, t, o) {
            let n;
            const r = "function" == typeof t;
            function a(o, a) {
              const s = xa();
              (o = o || (s ? _a(Th, null) : null)) && Ch(o),
                (o = Eh)._s.has(e) ||
                  (r
                    ? Gh(e, t, n, o)
                    : (function (e, t, o) {
                        const { state: n, actions: r, getters: a } = t,
                          s = o.state.value[e];
                        let i;
                        i = Gh(
                          e,
                          function () {
                            s || (o.state.value[e] = n ? n() : {});
                            const t = ro(o.state.value[e]);
                            return Yh(
                              t,
                              r,
                              Object.keys(a || {}).reduce(
                                (t, n) => (
                                  (t[n] = $t(
                                    Ti(() => {
                                      Ch(o);
                                      const t = o._s.get(e);
                                      return a[n].call(t, t);
                                    })
                                  )),
                                  t
                                ),
                                {}
                              )
                            );
                          },
                          t,
                          o,
                          0,
                          !0
                        );
                      })(e, n, o));
              return o._s.get(e);
            }
            return (n = r ? o : t), (a.$id = e), a;
          })("settings", {
            state: function () {
              return {
                display: !1,
                messageBox: !1,
                inTimeout: !1,
                fnTimeout: null,
                notifications: !0,
                chatMessage: "",
                chatInput: null,
                block: [],
                active: "",
                tags: [],
                messages: [],
                indexCommand: null,
                commands: [],
                me: [],
                grayscale: !1,
                colors: {},
              };
            },
            getters: {
              theme: function (e) {
                var t = {};
                return (
                  Object.keys(e.colors).forEach(function (o) {
                    var n = e.colors[o];
                    if (n && "object" === Dg(n)) {
                      if (((t[o.toUpperCase()] = {}), n.background)) {
                        var r = af(n.background);
                        r &&
                          (t[o.toUpperCase()].background = ""
                            .concat(r.r, " ")
                            .concat(r.g, " ")
                            .concat(r.b));
                      }
                      if (n.letter || n.text) {
                        var a = n.letter || n.text,
                          s = af(a);
                        s &&
                          (t[o.toUpperCase()].letter = ""
                            .concat(s.r, " ")
                            .concat(s.g, " ")
                            .concat(s.b));
                      }
                    }
                  }),
                  t
                );
              },
            },
            actions: {
              tagBgColor: function (e) {
                return (
                  (this.theme[e.toUpperCase()] &&
                    this.theme[e.toUpperCase()].background) ||
                  getComputedStyle(document.documentElement)
                    .getPropertyValue("--main")
                    .trim()
                );
              },
              tagTextColor: function (e) {
                return (
                  (this.theme[e.toUpperCase()] &&
                    this.theme[e.toUpperCase()].letter) ||
                  document.documentElement.style.getPropertyValue("--mainText")
                );
              },
              tagMessages: function (e) {
                return "GERAL" === e
                  ? this.messages
                  : this.messages.filter(function (t) {
                      return t.tag == e;
                    });
              },
              getNotifications: function () {
                var e = !0;
                localStorage &&
                  localStorage.getItem("chat:notifications") &&
                  (e = "true" === localStorage.getItem("chat:notifications")),
                  (this.notifications = e);
              },
              setNotifications: function (e) {
                localStorage.setItem("chat:notifications", e),
                  (this.notifications = e);
              },
              addChatMessage: function (e, t, o) {
                var n = this,
                  r = new Date(),
                  a = Bg(r.getHours()) + ":" + Bg(r.getMinutes());
                this.messages.push({ tag: o, author: e, message: t, clock: a }),
                  this.tags.find(function (e) {
                    return "GERAL" == e;
                  }) || this.tags.push("GERAL"),
                  this.tags.find(function (e) {
                    return "OOC" == e;
                  }) || this.tags.push("OOC"),
                  this.active || (this.active = "GERAL"),
                  this.notifications &&
                    (this.inTimeout && clearTimeout(this.fnTimeout),
                    (this.active =
                      "OOC" == o && "GERAL" == this.active
                        ? "GERAL"
                        : this.active),
                    (this.messageBox = !0),
                    (this.inTimeout = !0),
                    (this.fnTimeout = setTimeout(function () {
                      n.display || (n.messageBox = !1),
                        (n.inTimeout = !1),
                        (n.inTimeout = !1);
                    }, 5e3)));
              },
              submit: function () {
                var e = "(" + this.block.join("|") + ")\\b",
                  t = new RegExp(e, "i");
                if (this.block.length > 0 && t.test(this.chatMessage)) return;
                if (this.chatMessage) {
                  var o = this.chatMessage.substring(0, 1),
                    n = this.chatMessage.substring(1, 2);
                  if ("/" === o && !n) return;
                  Mg("ChatSubmit", {
                    tag: "GERAL" == this.active ? "GERAL" : this.active,
                    message:
                      this.chatMessage.length > 200
                        ? this.chatMessage.substring(0, 200)
                        : this.chatMessage,
                  }),
                    "/" === o &&
                      n &&
                      (this.commands.length > 0
                        ? this.commands[this.commands.length - 1] !=
                            this.chatMessage &&
                          this.commands.push(this.chatMessage)
                        : this.commands.push(this.chatMessage),
                      (this.messageBox = !1),
                      (this.display = !1)),
                    this.reset(),
                    (this.chatMessage = "");
                } else this.close();
              },
              reset: function () {
                this.indexCommand =
                  this.commands.length > 0 ? this.commands.length : null;
              },
              close: function () {
                Mg("Close"),
                  this.inTimeout && clearTimeout(this.fnTimeout),
                  (this.display = !1),
                  (this.messageBox = !1);
              },
            },
          }),
          Fg = { class: "relative -mt-3 flex flex-col items-start" },
          zg = { class: "mt-0.5" };
        const $g = {
          __name: "Me",
          setup: function (e) {
            var t = qg();
            return function (e, o) {
              return (
                As(),
                Ls(
                  Yc,
                  { name: "fade" },
                  {
                    default: en(function () {
                      return [
                        (As(!0),
                        Ps(
                          Ss,
                          null,
                          jr(Zt(t).me, function (e) {
                            return (
                              As(),
                              Ps(
                                "div",
                                {
                                  class:
                                    "absolute z-0 w-72 flex flex-col justify-end",
                                  style: Y({
                                    top: 100 * e.position.y + "%",
                                    left:
                                      100 * e.position.x +
                                      (e.clean ? 0 : 3) +
                                      "%",
                                  }),
                                  key: e.id,
                                },
                                [
                                  Fs(
                                    "div",
                                    {
                                      class: Z([
                                        "absolute bottom-0 left-0 rounded max-w-72 bg-black/50 pt-1 pb-2 px-3",
                                        e.clean
                                          ? "-translate-x-1/2"
                                          : "after:absolute after:top-full after:left-4 after:size-0 after:border-solid after:border-transparent after:border-b-[1rem] after:border-l-[2rem] after:border-l-black/50",
                                      ]),
                                    },
                                    [
                                      Fs("div", Fg, [
                                        Fs(
                                          "div",
                                          {
                                            class: Z([
                                              "rounded py-0.5 px-1.5 whitespace-nowrap text-xs font-semibold",
                                              e.clean
                                                ? "bg-yellow-500 text-black"
                                                : Zt(t).grayscale
                                                ? "bg-white text-black"
                                                : "bg-main text-mainText",
                                            ]),
                                          },
                                          me(e.author),
                                          3
                                        ),
                                      ]),
                                      Fs("p", zg, me(e.message), 1),
                                    ],
                                    2
                                  ),
                                ],
                                4
                              )
                            );
                          }),
                          128
                        )),
                      ];
                    }),
                    _: 1,
                  }
                )
              );
            };
          },
        };
        var Vg = { class: "relative bg-black/50 p-3 rounded [direction:ltr]" },
          Hg = { class: "flex items-end justify-between gap-1.5" },
          Wg = { class: "relative flex-1 -mt-4 flex items-center gap-1.5" },
          Yg = {
            class:
              "font-semibold py-0.5 px-1.5 rounded text-xs tracking-widest bg-neutral-900",
          },
          Kg = {
            class:
              "absolute top-2 right-3 whitespace-nowrap opacity-50 text-xs",
          },
          Gg = { class: "text-xs pt-1.5 opacity-70" };
        const Jg = {
            __name: "Item",
            props: {
              tag: String,
              author: String,
              clock: String,
              message: String,
            },
            setup: function (e) {
              var t = qg();
              return function (o, n) {
                return (
                  As(),
                  Ps(
                    "div",
                    {
                      class: "pt-2",
                      style: Y({
                        "--main": Zt(t).tagBgColor(e.tag),
                        "--text": Zt(t).tagTextColor(e.tag),
                      }),
                    },
                    [
                      Fs("div", Vg, [
                        Fs("div", Hg, [
                          Fs("div", Wg, [
                            Fs("div", Yg, me(e.author), 1),
                            Fs(
                              "div",
                              {
                                class: Z([
                                  "font-semibold py-0.5 px-1.5 rounded text-xs uppercase tracking-widest",
                                  [
                                    Zt(t).grayscale &&
                                    !Zt(t).theme.hasOwnProperty(e.tag)
                                      ? "bg-white text-black"
                                      : "bg-main text-mainText",
                                  ],
                                ]),
                              },
                              me(e.tag),
                              3
                            ),
                          ]),
                        ]),
                        Fs("div", Kg, me(e.clock), 1),
                        Fs("p", Gg, me(e.message), 1),
                      ]),
                    ],
                    4
                  )
                );
              };
            },
          },
          Xg = {
            __name: "List",
            props: ["messages", "tag"],
            setup: function (e) {
              var t = e,
                o = Yt(null),
                n = function () {
                  Uo(function () {
                    o.value.scrollTop = o.value.scrollHeight;
                  });
                };
              return (
                Qa(
                  function () {
                    return t.messages;
                  },
                  function () {
                    n();
                  },
                  { deep: !0 }
                ),
                mr(function () {
                  Uo(function () {
                    n();
                  });
                }),
                function (t, n) {
                  return (
                    As(),
                    Ps(
                      "div",
                      Zs(
                        {
                          class:
                            "absolute top-0 left-0 w-full h-full overflow-hidden overflow-y-auto scrollbar-custom space-y-1.5 pl-2 [direction:rtl] opacity-0 transition-opacity",
                          ref_key: "list",
                          ref: o,
                        },
                        t.$attrs
                      ),
                      [
                        (As(!0),
                        Ps(
                          Ss,
                          null,
                          jr(e.messages, function (e, t) {
                            return (
                              As(),
                              Ls(
                                Zt(Jg),
                                {
                                  key: t,
                                  tag: e.tag,
                                  author: e.author,
                                  clock: e.clock,
                                  message: e.message,
                                },
                                null,
                                8,
                                ["tag", "author", "clock", "message"]
                              )
                            );
                          }),
                          128
                        )),
                      ],
                      16
                    )
                  );
                }
              );
            },
          };
        var Zg = o(262);
        const Qg = {},
          eb = (0, Zg.A)(Qg, [
            [
              "render",
              function (e, t) {
                return (
                  As(),
                  Ps(
                    "svg",
                    Zs(
                      {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 18 18",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      e.$props
                    ),
                    t[0] ||
                      (t[0] = [
                        Fs(
                          "path",
                          {
                            d: "M9 18C13.9711 18 18 13.9711 18 9C18 4.02891 13.9711 0 9 0C4.02891 0 0 4.02891 0 9C0 13.9711 4.02891 18 9 18ZM3.57187 11.0391C3.4418 10.5574 3.83555 10.125 4.33477 10.125H13.6652C14.1645 10.125 14.5582 10.5574 14.4281 11.0391C13.7812 13.4297 11.5945 15.1875 9 15.1875C6.40547 15.1875 4.21875 13.4297 3.57187 11.0391ZM7.65 7.48125L7.64297 7.47422C7.63594 7.46719 7.62891 7.45664 7.61836 7.44258C7.59727 7.41445 7.56211 7.37227 7.51992 7.32305C7.43203 7.22461 7.30898 7.09102 7.16133 6.96094C6.85195 6.68672 6.50039 6.46875 6.1875 6.46875C5.87461 6.46875 5.52305 6.68672 5.21367 6.96094C5.06602 7.09102 4.94297 7.22461 4.85508 7.32305C4.81289 7.37227 4.77773 7.41445 4.75664 7.44258C4.74609 7.45664 4.73555 7.46719 4.73203 7.47422L4.725 7.48125C4.65117 7.57969 4.52461 7.61836 4.41211 7.57969C4.29961 7.54102 4.21875 7.43555 4.21875 7.3125C4.21875 6.6832 4.4543 6.06094 4.80234 5.59687C5.14688 5.13984 5.64258 4.78125 6.1875 4.78125C6.73242 4.78125 7.22812 5.13984 7.57266 5.59687C7.9207 6.06094 8.15625 6.6832 8.15625 7.3125C8.15625 7.43203 8.07891 7.54102 7.96289 7.57969C7.84688 7.61836 7.72031 7.57969 7.65 7.48125ZM13.275 7.48125L13.268 7.47422C13.2609 7.46719 13.2539 7.45664 13.2434 7.44258C13.2223 7.41445 13.1871 7.37227 13.1449 7.32305C13.057 7.22461 12.934 7.09102 12.7863 6.96094C12.477 6.68672 12.1254 6.46875 11.8125 6.46875C11.4996 6.46875 11.148 6.68672 10.8387 6.96094C10.691 7.09102 10.568 7.22461 10.4801 7.32305C10.4379 7.37227 10.4027 7.41445 10.3816 7.44258C10.3711 7.45664 10.3605 7.46719 10.357 7.47422L10.35 7.48125C10.2762 7.57969 10.1496 7.61836 10.0371 7.57969C9.92461 7.54102 9.84375 7.43555 9.84375 7.3125C9.84375 6.6832 10.0793 6.06094 10.4273 5.59687C10.7719 5.13984 11.2676 4.78125 11.8125 4.78125C12.3574 4.78125 12.8531 5.13984 13.1977 5.59687C13.5457 6.06094 13.7812 6.6832 13.7812 7.3125C13.7812 7.43203 13.7039 7.54102 13.5879 7.57969C13.4719 7.61836 13.3453 7.57969 13.275 7.48125Z",
                            fill: "currentColor",
                          },
                          null,
                          -1
                        ),
                      ]),
                    16
                  )
                );
              },
            ],
          ]);
        function tb() {
          return {
            Smileys: {
              "rosto risonho": "😀",
              "rosto risonho com olhos bem abertos": "😃",
              "rosto risonho com olhos sorridentes": "😄",
              "rosto contente com olhos sorridentes": "😁",
              "rosto risonho com olhos semicerrados": "😆",
              "rosto risonho com gota de suor": "😅",
              "rolando no chão de rir": "🤣",
              "rosto chorando de rir": "😂",
              "rosto levemente sorridente": "🙂",
              "rosto de cabeça para baixo": "🙃",
              "cara a derreter": "🫠",
              "rosto com olho piscando": "😉",
              "rosto sorridente com olhos sorridentes": "😊",
              "rosto sorridente com auréola": "😇",
              "rosto sorridente com 3 corações": "🥰",
              "rosto sorridente com olhos de coração": "😍",
              "rosto com olhar maravilhado": "🤩",
              "rosto mandando um beijo": "😘",
              "rosto beijando": "😗",
              "rosto beijando com olhos fechados": "😚",
              "rosto beijando com olhos sorridentes": "😙",
              "rosto sorridente com lágrima": "🥲",
              "rosto saboreando comida": "😋",
              "rosto mostrando a língua": "😛",
              "rosto piscando e com língua para fora": "😜",
              "rosto bizarro": "🤪",
              "rosto com olhos semicerrados e língua para fora": "😝",
              "rosto com cifrões": "🤑",
              "rosto abraçando": "🤗",
              "rosto com a mão sobre a boca": "🤭",
              "cara com os olhos abertos e a mão na boca": "🫢",
              "cara com olho a espreitar": "🫣",
              "rosto fazendo sinal de silêncio": "🤫",
              "rosto pensativo": "🤔",
              "cara de saudação": "🫡",
              "rosto com boca de zíper": "🤐",
              "rosto com sobrancelha levantada": "🤨",
              "rosto neutro": "😐",
              "rosto inexpressivo": "😑",
              "rosto sem boca": "😶",
              "cara com linha tracejada": "🫥",
              "rosto nas nuvens": "😶",
              "rosto com sorriso maroto": "😏",
              "rosto aborrecido": "😒",
              "rosto com olhos revirados": "🙄",
              "rosto expressando desagrado": "😬",
              "rosto exalando": "😮",
              "rosto de mentiroso": "🤥",
              "cara trémula": "🫨",
              "rosto aliviado": "😌",
              "rosto deprimido": "😔",
              "rosto sonolento": "😪",
              "rosto babando": "🤤",
              "rosto dormindo": "😴",
              "rosto com máscara médica": "😷",
              "rosto com termômetro": "🤒",
              "rosto com atadura na cabeça": "🤕",
              "rosto nauseado": "🤢",
              "rosto vomitando": "🤮",
              "rosto espirrando": "🤧",
              "rosto fervendo de calor": "🥵",
              "rosto gelado": "🥶",
              "rosto embriagado": "🥴",
              "rosto atordoado": "😵",
              "rosto com olhos em espiral": "😵",
              "cabeça explodindo": "🤯",
              "rosto com chapéu de caubói": "🤠",
              "rosto festivo": "🥳",
              "rosto disfarçado": "🥸",
              "rosto sorridente com óculos escuros": "😎",
              "rosto de nerd": "🤓",
              "rosto com monóculo": "🧐",
              "rosto confuso": "😕",
              "cara com boca na diagonal": "🫤",
              "rosto preocupado": "😟",
              "rosto meio triste": "🙁",
              "rosto com boca aberta": "😮",
              "rosto surpreso": "😯",
              "rosto espantado": "😲",
              "rosto ruborizado": "😳",
              "rosto implorando": "🥺",
              "cara a conter as lágrimas": "🥹",
              "rosto franzido com boca aberta": "😦",
              "rosto angustiado": "😧",
              "rosto amedrontado": "😨",
              "rosto ansioso com gota de suor": "😰",
              "rosto triste mas aliviado": "😥",
              "rosto chorando": "😢",
              "rosto chorando aos berros": "😭",
              "rosto gritando de medo": "😱",
              "rosto perplexo": "😖",
              "rosto perseverante": "😣",
              "rosto desapontado": "😞",
              "rosto cabisbaixo com gota de suor": "😓",
              "rosto desolado": "😩",
              "rosto cansado": "😫",
              "rosto bocejando": "🥱",
              "rosto soltando vapor pelo nariz": "😤",
              "rosto furioso": "😡",
              "rosto zangado": "😠",
              "rosto com símbolos na boca": "🤬",
              "rosto sorridente com chifres": "😈",
              "rosto zangado com chifres": "👿",
              caveira: "💀",
              cocô: "💩",
              "rosto de palhaço": "🤡",
              ogro: "👹",
              "duende japonês": "👺",
              fantasma: "👻",
              alienígena: "👽",
              "monstro alienígena": "👾",
              "rosto de robô": "🤖",
              "rosto de gato sorrindo": "😺",
              "rosto de gato sorrindo com olhos sorridentes": "😸",
              "rosto de gato com lágrimas de alegria": "😹",
              "rosto de gato sorridente com olhos de coração": "😻",
              "rosto de gato com sorriso irônico": "😼",
              "rosto de gato mandando um beijo": "😽",
              "rosto de gato desolado": "🙀",
              "rosto de gato chorando": "😿",
              "rosto de gato mal humorado": "😾",
              "macaco que não vê nada": "🙈",
              "macaco que não ouve nada": "🙉",
              "macaco que não fala nada": "🙊",
            },
            Pessoas: {
              "mão acenando": "👋",
              "dorso da mão levantado": "🤚",
              "mão aberta com os dedos separados": "🖐",
              "mão levantada": "✋",
              "saudação vulcana": "🖖",
              "mão para a direita": "🫱",
              "mão para a esquerda": "🫲",
              "palma da mão virada para baixo": "🫳",
              "palma da mão virada para cima": "🫴",
              "mão a empurrar para a esquerda": "🫷",
              "mão a empurrar para a direita": "🫸",
              "sinal de ok": "👌",
              "dedos comprimidos": "🤌",
              "mão beliscando": "🤏",
              "mão em v de vitória": "✌",
              "dedos cruzados": "🤞",
              "mão com o dedo indicador e o polegar cruzados": "🫰",
              "gesto de te amo": "🤟",
              "saudação do rock": "🤘",
              "sinal me liga": "🤙",
              "dorso da mão com dedo indicador apontando para a esquerda": "👈",
              "dorso da mão com dedo indicador apontando para a direita": "👉",
              "dorso da mão com dedo indicador apontando para cima": "👆",
              "dedo do meio": "🖕",
              "dorso da mão com dedo indicador apontando para baixo": "👇",
              "indicador apontando para cima": "☝",
              "dedo indicador a apontar ao visor": "🫵",
              "polegar para cima": "👍",
              "polegar para baixo": "👎",
              "punho levantado": "✊",
              soco: "👊",
              "punho esquerdo": "🤛",
              "punho direito": "🤜",
              "mãos aplaudindo": "👏",
              "mãos para cima": "🙌",
              "mãos em coração": "🫶",
              "mãos abertas": "👐",
              "palmas unidas para cima": "🤲",
              "aperto de mãos": "🤝",
              "mãos juntas": "🙏",
              "escrevendo à mão": "✍",
              "esmalte de unha": "💅",
              selfie: "🤳",
              bíceps: "💪",
              "braço mecânico": "🦾",
              "perna mecânica": "🦿",
              perna: "🦵",
              pé: "🦶",
              orelha: "👂",
              "ouvido com aparelho auditivo": "🦻",
              nariz: "👃",
              cérebro: "🧠",
              "coração humano": "🫀",
              pulmões: "🫁",
              dente: "🦷",
              osso: "🦴",
              olhos: "👀",
              olho: "👁",
              língua: "👅",
              boca: "👄",
              "morder o lábio": "🫦",
              bebê: "👶",
              criança: "🧒",
              menino: "👦",
              menina: "👧",
              pessoa: "🧑",
              "pessoa cabelo louro": "👱",
              homem: "👨",
              "homem barba": "🧔",
              "homem barbudo": "🧔",
              "man medium light skin tone beard": "🧔",
              "mulher barba": "🧔",
              "woman medium light skin tone beard": "🧔",
              "homem cabelo vermelho": "👨",
              "homem cabelo cacheado": "👨",
              "homem cabelo branco": "👨",
              "homem careca": "👨",
              mulher: "👩",
              "mulher cabelo vermelho": "👩",
              "pessoa cabelo vermelho": "🧑",
              "mulher cabelo cacheado": "👩",
              "pessoa cabelo cacheado": "🧑",
              "mulher cabelo branco": "👩",
              "pessoa cabelo branco": "🧑",
              "mulher careca": "👩",
              "pessoa careca": "🧑",
              "mulher cabelo loiro": "👱",
              "woman medium light skin tone blond hair": "👱",
              "homem cabelo loiro": "👱",
              "man medium light skin tone blond hair": "👱",
              idoso: "🧓",
              "homem idoso": "👴",
              idosa: "👵",
              "franzindo a sobrancelha": "🙍",
              "homem franzindo a sobrancelha": "🙍",
              "mulher franzindo a sobrancelha": "🙍",
              "pessoa fazendo bico": "🙎",
              "homem fazendo bico": "🙎",
              "mulher fazendo bico": "🙎",
              "pessoa fazendo gesto de não": "🙅",
              "homem fazendo gesto de não": "🙅",
              "mulher fazendo gesto de não": "🙅",
              "pessoa fazendo gesto de ok": "🙆",
              "homem fazendo gesto de ok": "🙆",
              "mulher fazendo gesto de ok": "🙆",
              "pessoa com a palma virada para cima": "💁",
              "homem com a palma virada para cima": "💁",
              "mulher com a palma virada para cima": "💁",
              "pessoa levantando a mão": "🙋",
              "homem levantando a mão": "🙋",
              "mulher levantando a mão": "🙋",
              "pessoa surda": "🧏",
              "homem surdo": "🧏",
              "mulher surda": "🧏",
              "pessoa fazendo reverência": "🙇",
              "homem fazendo reverência": "🙇",
              "mulher fazendo reverência": "🙇",
              "pessoa decepcionada": "🤦",
              "homem decepcionado": "🤦",
              "mulher decepcionada": "🤦",
              "pessoa dando de ombros": "🤷",
              "homem dando de ombros": "🤷",
              "mulher dando de ombros": "🤷",
              "profissional de saúde": "🧑",
              "homem profissional da saúde": "👨",
              "mulher profissional da saúde": "👩",
              aluno: "🧑",
              estudante: "👨",
              aluna: "👩",
              "professora na escola": "🧑",
              professor: "👨",
              professora: "👩",
              "juiz no tribunal": "🧑",
              juiz: "👨",
              juíza: "👩",
              agricultor: "🧑",
              fazendeiro: "👨",
              fazendeira: "👩",
              "chef de cozinha": "🧑",
              cozinheiro: "👨",
              cozinheira: "👩",
              "mecânico trabalhando": "🧑",
              mecânico: "👨",
              mecânica: "👩",
              "funcionário de fábrica": "🧑",
              operário: "👨",
              operária: "👩",
              "trabalhador de escritório": "🧑",
              "funcionário de escritório": "👨",
              "funcionária de escritório": "👩",
              cientista: "🧑",
              "cientista homem": "👨",
              "cientista mulher": "👩",
              programador: "🧑",
              tecnólogo: "👨",
              tecnóloga: "👩",
              cantor: "🧑",
              "cantor homem": "👨",
              cantora: "👩",
              artista: "🧑",
              "artista plástico": "👨",
              "artista plástica": "👩",
              piloto: "🧑",
              "piloto de avião homem": "👨",
              "piloto de avião mulher": "👩",
              astronauta: "🧑",
              "astronauta homem": "👨",
              "astronauta mulher": "👩",
              bombeiro: "🧑",
              "bombeiro homem": "👨",
              "man firefighter medium dark skin tone": "👨",
              bombeira: "👩",
              policial: "👮",
              "policial homem": "👮",
              "policial mulher": "👮",
              detetive: "🕵",
              "detetive homem": "🕵",
              "detetive mulher": "🕵",
              guarda: "💂",
              "guarda homem": "💂",
              "guarda mulher": "💂",
              ninja: "🥷",
              "trabalhador de construção civil": "👷",
              pedreiro: "👷",
              pedreira: "👷",
              "pessoa com coroa": "🫅",
              príncipe: "🤴",
              princesa: "👸",
              "pessoa com turbante": "👳",
              "homem com turbante": "👳",
              "mulher com turbante": "👳",
              "homem de boné": "👲",
              "pessoa com véu": "🧕",
              "pessoa de smoking": "🤵",
              "homem de smoking": "🤵",
              "mulher de smoking": "🤵",
              noiva: "👰",
              "noivo com véu": "👰",
              "noiva com véu": "👰",
              grávida: "🤰",
              "homem grávido": "🫃",
              "pessoa grávida": "🫄",
              amamentando: "🤱",
              "mulher alimentando bebê": "👩",
              "homem alimentando bebê": "👨",
              "pessoa alimentando bebê": "🧑",
              "bebê anjo": "👼",
              "papai noel": "🎅",
              "mamãe noel": "🤶",
              noel: "🧑",
              "super herói": "🦸",
              "homem super herói": "🦸",
              "super heroína": "🦸",
              supervilão: "🦹",
              "homem supervilão": "🦹",
              supervilã: "🦹",
              mago: "🧙",
              "homem mago": "🧙",
              maga: "🧙",
              fada: "🧚",
              "homem fada": "🧚",
              "mulher fada": "🧚",
              vampiro: "🧛",
              "homem vampiro": "🧛",
              "mulher vampira": "🧛",
              "pessoa sereia": "🧜",
              sereio: "🧜",
              sereia: "🧜",
              elfo: "🧝",
              "elfo homem": "🧝",
              elfa: "🧝",
              gênio: "🧞",
              "homem gênio": "🧞",
              "mulher gênio": "🧞",
              zumbi: "🧟",
              "homem zumbi": "🧟",
              "mulher zumbi": "🧟",
              duende: "🧌",
              "pessoa recebendo massagem facial": "💆",
              "homem recebendo massagem facial": "💆",
              "mulher recebendo massagem facial": "💆",
              "pessoa cortando o cabelo": "💇",
              "homem cortando o cabelo": "💇",
              "man getting haircut medium light skin tone": "💇",
              "mulher cortando o cabelo": "💇",
              "pessoa andando": "🚶",
              "homem andando": "🚶",
              "mulher andando": "🚶",
              "pessoa em pé": "🧍",
              "homem em pé": "🧍",
              "mulher em pé": "🧍",
              "pessoa ajoelhando": "🧎",
              "homem ajoelhando": "🧎",
              "mulher ajoelhando": "🧎",
              "pessoa com bengala para cego": "🧑",
              "homem com bengala para cego": "👨",
              "mulher com bengala para cego": "👩",
              "pessoa em cadeira de rodas motorizada": "🧑",
              "homem em cadeira de rodas motorizada": "👨",
              "mulher em cadeira de rodas motorizada": "👩",
              "pessoa em cadeira de rodas manual": "🧑",
              "homem em cadeira de rodas manual": "👨",
              "mulher em cadeira de rodas manual": "👩",
              "pessoa correndo": "🏃",
              "homem correndo": "🏃",
              "mulher correndo": "🏃",
              "mulher dançando": "💃",
              "homem dançando": "🕺",
              "pessoa de terno levitando": "🕴",
              "pessoas com orelhas de coelho": "👯",
              "homens com orelhas de coelho": "👯",
              "mulheres com orelhas de coelho": "👯",
              "pessoa na sauna": "🧖",
              "homem na sauna": "🧖",
              "mulher na sauna": "🧖",
              "pessoa escalando": "🧗",
              "homem escalando": "🧗",
              "mulher escalando": "🧗",
              esgrimista: "🤺",
              "corrida de cavalos": "🏇",
              esquiador: "⛷",
              "praticante de snowboard": "🏂",
              golfista: "🏌",
              "homem golfista": "🏌",
              "mulher golfista": "🏌",
              surfista: "🏄",
              "homem surfista": "🏄",
              "mulher surfista": "🏄",
              "pessoa remando": "🚣",
              "homem remando": "🚣",
              "mulher remando": "🚣",
              "pessoa nadando": "🏊",
              "homem nadando": "🏊",
              "mulher nadando": "🏊",
              "pessoa jogando basquete": "⛹",
              "homem jogando basquete": "⛹",
              "mulher jogando basquete": "⛹",
              "pessoa levantando peso": "🏋",
              "homem levantando peso": "🏋",
              "mulher levantando peso": "🏋",
              ciclista: "🚴",
              "homem ciclista": "🚴",
              "mulher ciclista": "🚴",
              "pessoa fazendo mountain bike": "🚵",
              "homem fazendo mountain bike": "🚵",
              "mulher fazendo mountain bike": "🚵",
              "pessoa fazendo estrela": "🤸",
              "homem fazendo estrela": "🤸",
              "mulher fazendo estrela": "🤸",
              "pessoas lutando": "🤼",
              "homens lutando": "🤼",
              "mulheres lutando": "🤼",
              "pessoa jogando polo aquático": "🤽",
              "homem jogando polo aquático": "🤽",
              "mulher jogando polo aquático": "🤽",
              handebol: "🤾",
              "jogador de handebol": "🤾",
              "jogadora de handebol": "🤾",
              malabarista: "🤹",
              "homem malabarista": "🤹",
              "mulher malabarista": "🤹",
              "pessoa na posição de lótus": "🧘",
              "homem na posição de lótus": "🧘",
              "mulher na posição de lótus": "🧘",
              "pessoa tomando banho": "🛀",
              "pessoa deitada na cama": "🛌",
              "pessoas de mãos dadas": "🧑",
              "duas mulheres de mãos dadas": "👭",
              "homem e mulher de mãos dadas": "👫",
              "dois homens de mãos dadas": "👬",
              beijo: "💏",
              "beijo mulher homem": "👩",
              "beijo homem homem": "👨",
              "beijo mulher mulher": "👩",
              "casal apaixonado": "💑",
              "casal apaixonado mulher homem": "👩",
              "casal apaixonado homem homem": "👨",
              "casal apaixonado mulher mulher": "👩",
              "família homem mulher menino": "👨",
              "família homem mulher menina": "👨",
              "família homem mulher menina menino": "👨",
              "família homem mulher menino menino": "👨",
              "família homem mulher menina menina": "👨",
              "família homem homem menino": "👨",
              "família homem homem menina": "👨",
              "família homem homem menina menino": "👨",
              "família homem homem menino menino": "👨",
              "família homem homem menina menina": "👨",
              "família mulher mulher menino": "👩",
              "família mulher mulher menina": "👩",
              "família mulher mulher menina menino": "👩",
              "família mulher mulher menino menino": "👩",
              "família mulher mulher menina menina": "👩",
              "família homem menino": "👨",
              "família homem menino menino": "👨",
              "família homem menina": "👨",
              "família homem menina menino": "👨",
              "família homem menina menina": "👨",
              "família mulher menino": "👩",
              "família mulher menino menino": "👩",
              "família mulher menina": "👩",
              "família mulher menina menino": "👩",
              "família mulher menina menina": "👩",
              "silhueta falando": "🗣",
              "silhueta de busto": "👤",
              "silhueta de bustos": "👥",
              "pessoas se abraçando": "🫂",
              família: "👪",
              "family adult adult child": "🧑",
              "family adult adult child child": "🧑",
              "family adult child": "🧑",
              "family adult child child": "🧑",
              pegadas: "👣",
              dna: "🧬",
              "gota de sangue": "🩸",
              "cabelo vermelho": "🦰",
              "cabelo cacheado": "🦱",
              careca: "🦲",
              "cabelo branco": "🦳",
              "família mulher menino menina": "👩",
              "família mulher homem menino menina": "👩",
              "família mulher homem menina menino": "👩",
              "família homem homem menino bebê": "👨",
            },
            "Animais e Natureza": {
              "rosto de macaco": "🐵",
              macaco: "🐒",
              gorila: "🦍",
              orangotango: "🦧",
              "rosto de cachorro": "🐶",
              cachorro: "🐕",
              "cão guia": "🦮",
              "cão de serviço": "🐕",
              poodle: "🐩",
              "rosto de lobo": "🐺",
              "rosto de raposa": "🦊",
              guaxinim: "🦝",
              "rosto de gato": "🐱",
              gato: "🐈",
              "gato preto": "🐈",
              "rosto de leão": "🦁",
              "rosto de tigre": "🐯",
              tigre: "🐅",
              leopardo: "🐆",
              "rosto de cavalo": "🐴",
              "cara de alce": "🫎",
              burro: "🫏",
              cavalo: "🐎",
              "rosto de unicórnio": "🦄",
              zebra: "🦓",
              cervo: "🦌",
              bisão: "🦬",
              "rosto de vaca": "🐮",
              boi: "🐂",
              "búfalo asiático": "🐃",
              vaca: "🐄",
              "rosto de porco": "🐷",
              porco: "🐖",
              javali: "🐗",
              "nariz de porco": "🐽",
              carneiro: "🐏",
              ovelha: "🐑",
              cabra: "🐐",
              camelo: "🐪",
              "camelo com duas corcovas": "🐫",
              lhama: "🦙",
              girafa: "🦒",
              elefante: "🐘",
              mamute: "🦣",
              rinoceronte: "🦏",
              hipopótamo: "🦛",
              "rosto de camundongo": "🐭",
              camundongo: "🐁",
              rato: "🐀",
              "rosto de hamster": "🐹",
              "rosto de coelho": "🐰",
              coelho: "🐇",
              esquilo: "🐿",
              castor: "🦫",
              "porco espinho": "🦔",
              morcego: "🦇",
              "rosto de urso": "🐻",
              "urso polar": "🐻",
              coala: "🐨",
              "rosto de panda": "🐼",
              preguiça: "🦥",
              lontra: "🦦",
              gambá: "🦨",
              canguru: "🦘",
              texugo: "🦡",
              patas: "🐾",
              peru: "🦃",
              galinha: "🐔",
              galo: "🐓",
              "pintinho chocando": "🐣",
              "pintinho de perfil": "🐤",
              "pintinho de frente": "🐥",
              pássaro: "🐦",
              pinguim: "🐧",
              "pomba branca": "🕊",
              águia: "🦅",
              pato: "🦆",
              cisne: "🦢",
              coruja: "🦉",
              dodô: "🦤",
              pena: "🪶",
              flamingo: "🦩",
              pavão: "🦚",
              papagaio: "🦜",
              asa: "🪽",
              leque: "🐦",
              ganso: "🪿",
              sapo: "🐸",
              crocodilo: "🐊",
              tartaruga: "🐢",
              lagartixa: "🦎",
              cobra: "🐍",
              "rosto de dragão": "🐲",
              dragão: "🐉",
              saurópode: "🦕",
              "tiranossauro rex": "🦖",
              "baleia esguichando água": "🐳",
              baleia: "🐋",
              golfinho: "🐬",
              foca: "🦭",
              peixe: "🐟",
              "peixe tropical": "🐠",
              baiacu: "🐡",
              tubarão: "🦈",
              polvo: "🐙",
              caramujo: "🐚",
              coral: "🪸",
              alforreca: "🪼",
              caracol: "🐌",
              borboleta: "🦋",
              inseto: "🐛",
              formiga: "🐜",
              abelha: "🐝",
              besouro: "🪲",
              joaninha: "🐞",
              grilo: "🦗",
              barata: "🪳",
              aranha: "🕷",
              "teia de aranha": "🕸",
              escorpião: "🦂",
              mosquito: "🦟",
              mosca: "🪰",
              minhoca: "🪱",
              micróbio: "🦠",
              buquê: "💐",
              "flor de cerejeira": "🌸",
              "flor branca": "💮",
              "flor de lotus": "🪷",
              roseta: "🏵",
              rosa: "🌹",
              "flor murcha": "🥀",
              hibisco: "🌺",
              girassol: "🌻",
              flor: "🌼",
              tulipa: "🌷",
              jacinto: "🪻",
              "muda de planta": "🌱",
              "vaso com planta": "🪴",
              conífera: "🌲",
              "árvore caidiça": "🌳",
              palmeira: "🌴",
              cacto: "🌵",
              "planta de arroz": "🌾",
              erva: "🌿",
              trevo: "☘",
              "trevo de quatro folhas": "🍀",
              "folha de bordo": "🍁",
              "folhas caídas": "🍂",
              "folha ao vento": "🍃",
              "ninho vazio": "🪹",
              "ninho com ovos": "🪺",
              cogumelo: "🍄",
              caranguejo: "🦀",
              lagosta: "🦞",
              camarão: "🦐",
              lula: "🦑",
              ostra: "🦪",
              pedra: "🪨",
              madeira: "🪵",
              "lua nova": "🌑",
              "lua crescente côncava": "🌒",
              "quarto crescente": "🌓",
              "lua crescente convexa": "🌔",
              "lua cheia": "🌕",
              "lua minguante convexa": "🌖",
              "quarto minguante": "🌗",
              "lua minguante côncava": "🌘",
              "lua crescente": "🌙",
              "rosto da lua nova": "🌚",
              "rosto da lua de quarto crescente": "🌛",
              "rosto da lua de quarto minguante": "🌜",
              sol: "☀",
              "rosto da lua cheia": "🌝",
              "rosto do sol": "🌞",
              "planeta com anéis": "🪐",
              "estrela branca média": "⭐",
              "estrela brilhante": "🌟",
              "estrela cadente": "🌠",
              "via láctea": "🌌",
              nuvem: "☁",
              "sol por trás das nuvens": "⛅",
              "chuva com trovão": "⛈",
              "sol com nuvens": "🌤",
              nublado: "🌥",
              "sol com chuva": "🌦",
              "nuvem com chuva": "🌧",
              "nuvem com neve": "🌨",
              "nuvem com trovão": "🌩",
              tornado: "🌪",
              nevoeiro: "🌫",
              "rosto de vento": "🌬",
              ciclone: "🌀",
              "arco íris": "🌈",
              "guarda chuva fechado": "🌂",
              "guarda chuva": "☂",
              "sombrinha na chuva": "☔",
              "guarda sol": "⛱",
              "alta tensão": "⚡",
              "floco de neve": "❄",
              "boneco de neve": "☃",
              "boneco de neve sem neve": "⛄",
              cometa: "☄",
              fogo: "🔥",
              gota: "💧",
              onda: "🌊",
            },
            "Comida e Bebida": {
              uvas: "🍇",
              melão: "🍈",
              melancia: "🍉",
              tangerina: "🍊",
              limão: "🍋",
              banana: "🍌",
              abacaxi: "🍍",
              manga: "🥭",
              "maçã vermelha": "🍎",
              "maçã verde": "🍏",
              pera: "🍐",
              pêssego: "🍑",
              cereja: "🍒",
              morango: "🍓",
              mirtilos: "🫐",
              kiwi: "🥝",
              tomate: "🍅",
              azeitona: "🫒",
              coco: "🥥",
              abacate: "🥑",
              berinjela: "🍆",
              batata: "🥔",
              cenoura: "🥕",
              milho: "🌽",
              pimenta: "🌶",
              pimentão: "🫑",
              pepino: "🥒",
              verdura: "🥬",
              brócolis: "🥦",
              alho: "🧄",
              cebola: "🧅",
              amendoim: "🥜",
              feijões: "🫘",
              castanha: "🌰",
              gengibre: "🫚",
              "vagem de ervilha": "🫛",
              pão: "🍞",
              croissant: "🥐",
              baguete: "🥖",
              "pão sírio": "🫓",
              pretzel: "🥨",
              rosca: "🥯",
              panquecas: "🥞",
              waffle: "🧇",
              queijo: "🧀",
              carne: "🍖",
              "coxa de frango": "🍗",
              "corte de carne": "🥩",
              bacon: "🥓",
              hambúrguer: "🍔",
              "batata frita": "🍟",
              pizza: "🍕",
              "cachorro quente": "🌭",
              sanduíche: "🥪",
              taco: "🌮",
              burrito: "🌯",
              tamale: "🫔",
              "pão recheado": "🥙",
              falafel: "🧆",
              ovo: "🥚",
              "ovo frito": "🍳",
              "caçarola com comida": "🥘",
              panela: "🍲",
              fondue: "🫕",
              "tigela com colher": "🥣",
              "salada verde": "🥗",
              pipoca: "🍿",
              manteiga: "🧈",
              sal: "🧂",
              "comida enlatada": "🥫",
              bentô: "🍱",
              "biscoito de arroz": "🍘",
              "arroz japonês": "🍙",
              "arroz cozido": "🍚",
              "arroz com curry": "🍛",
              lámen: "🍜",
              espaguete: "🍝",
              "batata assada": "🍠",
              oden: "🍢",
              sushi: "🍣",
              "camarão frito": "🍤",
              "bolinho de peixe": "🍥",
              "bolo lunar": "🥮",
              dango: "🍡",
              "bolinho asiático": "🥟",
              "biscoito da sorte": "🥠",
              "caixa para viagem": "🥡",
              "sorvete italiano": "🍦",
              "raspadinha de gelo": "🍧",
              sorvete: "🍨",
              donut: "🍩",
              biscoito: "🍪",
              "bolo de aniversário": "🎂",
              "pão de ló de morango": "🍰",
              cupcake: "🧁",
              torta: "🥧",
              chocolate: "🍫",
              bala: "🍬",
              pirulito: "🍭",
              pudim: "🍮",
              "pote de mel": "🍯",
              mamadeira: "🍼",
              "copo de leite": "🥛",
              café: "☕",
              bule: "🫖",
              "xícara de chá sem alça": "🍵",
              saquê: "🍶",
              "garrafa de champanhe": "🍾",
              vinho: "🍷",
              coquetel: "🍸",
              "bebida tropical": "🍹",
              cerveja: "🍺",
              "canecas de cerveja": "🍻",
              "taças brindando": "🥂",
              copo: "🥃",
              "líquido a verter": "🫗",
              "copo com canudo": "🥤",
              "chá perolado": "🧋",
              "suco de caixa": "🧃",
              mate: "🧉",
              "cubo de gelo": "🧊",
              hashi: "🥢",
              "prato com talheres": "🍽",
              "garfo e faca": "🍴",
              colher: "🥄",
              "faca de cozinha": "🔪",
              jarro: "🫙",
              ânfora: "🏺",
            },
            Atividades: {
              "abóbora de halloween": "🎃",
              "árvore de natal": "🎄",
              "fogos de artifício": "🎆",
              "vela estrela": "🎇",
              bombinha: "🧨",
              brilhos: "✨",
              balão: "🎈",
              "cone de festa": "🎉",
              confete: "🎊",
              "árvore de tanabata": "🎋",
              "decoração de pinhos": "🎍",
              "bonecas japonesas": "🎎",
              "bandeira de carpas": "🎏",
              "carrilhão de vento": "🎐",
              "contemplação da lua": "🎑",
              "envelope vermelho": "🧧",
              presente: "🎁",
              "ingresso de cinema": "🎟",
              ingresso: "🎫",
              "medalha militar": "🎖",
              troféu: "🏆",
              "medalha esportiva": "🏅",
              "medalha de ouro": "🥇",
              "medalha de prata": "🥈",
              "medalha de bronze": "🥉",
              "bola de futebol": "⚽",
              "bola de beisebol": "⚾",
              softbol: "🥎",
              "bola de basquete": "🏀",
              "bola de vôlei": "🏐",
              "bola de futebol americano": "🏈",
              "bola de rugby": "🏉",
              tênis: "🎾",
              frisbee: "🥏",
              boliche: "🎳",
              críquete: "🏏",
              "hóquei de campo": "🏑",
              "hóquei no gelo": "🏒",
              lacrosse: "🥍",
              "pingue pongue": "🏓",
              badminton: "🏸",
              "luva de boxe": "🥊",
              "quimono de artes marciais": "🥋",
              gol: "🥅",
              "bandeira no buraco": "⛳",
              "patins de gelo": "⛸",
              pesca: "🎣",
              "máscara de mergulho": "🤿",
              "camiseta de corrida": "🎽",
              esqui: "🎿",
              trenó: "🛷",
              "pedra de curling": "🥌",
              "no alvo": "🎯",
              ioiô: "🪀",
              pipa: "🪁",
              "pistola d água": "🔫",
              bilhar: "🎱",
              "bola de cristal": "🔮",
              "varinha mágica": "🪄",
              videogame: "🎮",
              joystick: "🕹",
              "caça níquel": "🎰",
              "jogo de dado": "🎲",
              "quebra cabeça": "🧩",
              pinhata: "🪅",
              "bola espelhada": "🪩",
              "boneca russa": "🪆",
              "peão de xadrez": "♟",
              curinga: "🃏",
              "dragão vermelho de mahjong": "🀄",
              "carta de flores": "🎴",
              máscara: "🎭",
              "quadro emoldurado": "🖼",
              "paleta de tintas": "🎨",
              "naipe de espadas": "♠",
              "naipe de copas": "♥",
              "naipe de ouros": "♦",
              "naipe de paus": "♣",
            },
            "Viagens e Locais": {
              "globo mostrando europa e áfrica": "🌍",
              "globo mostrando as américas": "🌎",
              "globo mostrando ásia e oceania": "🌏",
              "globo com meridianos": "🌐",
              "mapa múndi": "🗺",
              "mapa do japão": "🗾",
              bússola: "🧭",
              "montanha com neve": "🏔",
              montanha: "⛰",
              vulcão: "🌋",
              "monte fuji": "🗻",
              acampamento: "🏕",
              "praia e guarda sol": "🏖",
              deserto: "🏜",
              "ilha deserta": "🏝",
              "parque nacional": "🏞",
              estádio: "🏟",
              "prédio grego": "🏛",
              construção: "🏗",
              tijolo: "🧱",
              cabana: "🛖",
              casas: "🏘",
              "casa abandonada": "🏚",
              casa: "🏠",
              "casa com jardim": "🏡",
              "edifício comercial": "🏢",
              "correio japonês": "🏣",
              correio: "🏤",
              hospital: "🏥",
              banco: "🏦",
              hotel: "🏨",
              motel: "🏩",
              "loja de conveniência": "🏪",
              escola: "🏫",
              "loja de departamentos": "🏬",
              fábrica: "🏭",
              "castelo japonês": "🏯",
              castelo: "🏰",
              "capela de casamento": "💒",
              "torre de tóquio": "🗼",
              "estátua da liberdade": "🗽",
              igreja: "⛪",
              mesquita: "🕌",
              "templo hindu": "🛕",
              sinagoga: "🕍",
              "santuário japonês": "⛩",
              "caaba islã": "🕋",
              fonte: "⛲",
              barraca: "⛺",
              enevoado: "🌁",
              "noite estrelada": "🌃",
              cidade: "🏙",
              "aurora sobre montanhas": "🌄",
              "aurora sobre água": "🌅",
              "cidade ao anoitecer": "🌆",
              "pôr do sol": "🌇",
              "ponte à noite": "🌉",
              chamas: "♨",
              carrossel: "🎠",
              "escorrega infantil": "🛝",
              "roda gigante": "🎡",
              "montanha russa": "🎢",
              barbearia: "💈",
              circo: "🎪",
              locomotiva: "🚂",
              "vagão de trem": "🚃",
              "trem de alta velocidade": "🚄",
              "trem de alta velocidade japonês": "🚅",
              trem: "🚆",
              metrô: "🚇",
              "trem urbano": "🚈",
              estação: "🚉",
              "bonde elétrico": "🚊",
              monotrilho: "🚝",
              "estrada de ferro na montanha": "🚞",
              bonde: "🚋",
              ônibus: "🚌",
              "ônibus se aproximando": "🚍",
              trólebus: "🚎",
              van: "🚐",
              ambulância: "🚑",
              "carro do corpo de bombeiros": "🚒",
              "viatura policial": "🚓",
              "viatura policial se aproximando": "🚔",
              táxi: "🚕",
              "táxi se aproximando": "🚖",
              carro: "🚗",
              "carro se aproximando": "🚘",
              suv: "🚙",
              caminhonete: "🛻",
              "caminhão de entrega": "🚚",
              caminhão: "🚛",
              trator: "🚜",
              "carro de corrida": "🏎",
              motocicleta: "🏍",
              scooter: "🛵",
              "cadeira de rodas manual": "🦽",
              "cadeira de rodas motorizada": "🦼",
              "automóvel riquixá": "🛺",
              bicicleta: "🚲",
              patinete: "🛴",
              skate: "🛹",
              "patins de rodas": "🛼",
              "ponto de ônibus": "🚏",
              estrada: "🛣",
              trilhos: "🛤",
              "barril de óleo": "🛢",
              "posto de gasolina": "⛽",
              roda: "🛞",
              sirene: "🚨",
              "semáforo horizontal": "🚥",
              "semáforo vertical": "🚦",
              "sinal de pare": "🛑",
              "em construção": "🚧",
              âncora: "⚓",
              "bóia em anel": "🛟",
              "barco a vela": "⛵",
              canoa: "🛶",
              lancha: "🚤",
              cruzeiro: "🛳",
              balsa: "⛴",
              barco: "🛥",
              navio: "🚢",
              avião: "✈",
              "avião pequeno": "🛩",
              "avião decolando": "🛫",
              "avião aterrissando": "🛬",
              paraquedas: "🪂",
              assento: "💺",
              helicóptero: "🚁",
              "estrada de ferro suspensa": "🚟",
              "cabo suspenso usado em teleféricos nas montanhas": "🚠",
              teleférico: "🚡",
              satélite: "🛰",
              foguete: "🚀",
              "disco voador": "🛸",
              moai: "🗿",
            },
            Objetos: {
              sineta: "🛎",
              mala: "🧳",
              ampulheta: "⌛",
              "ampulheta contando o tempo": "⏳",
              "relógio de pulso": "⌚",
              despertador: "⏰",
              cronômetro: "⏱",
              "relógio temporizador": "⏲",
              "relógio de mesa": "🕰",
              "12 horas": "🕛",
              "doze e meia": "🕧",
              "1 hora": "🕐",
              "uma e meia": "🕜",
              "2 horas": "🕑",
              "duas e meia": "🕝",
              "3 horas": "🕒",
              "três e meia": "🕞",
              "4 horas": "🕓",
              "quatro e meia": "🕟",
              "5 horas": "🕔",
              "cinco e meia": "🕠",
              "6 horas": "🕕",
              "seis e meia": "🕡",
              "7 horas": "🕖",
              "sete e meia": "🕢",
              "8 horas": "🕗",
              "oito e meia": "🕣",
              "9 horas": "🕘",
              "nove e meia": "🕤",
              "10 horas": "🕙",
              "dez e meia": "🕥",
              "11 horas": "🕚",
              "onze e meia": "🕦",
              termômetro: "🌡",
              "laço de fita": "🎀",
              "fita de lembrete": "🎗",
              "ursinho de pelúcia": "🧸",
              carretel: "🧵",
              "agulha de costura": "🪡",
              novelo: "🧶",
              nó: "🪢",
              óculos: "👓",
              "óculos escuros": "🕶",
              "óculos de proteção": "🥽",
              jaleco: "🥼",
              "colete salva vidas": "🦺",
              gravata: "👔",
              camiseta: "👕",
              jeans: "👖",
              cachecol: "🧣",
              luvas: "🧤",
              casaco: "🧥",
              meias: "🧦",
              vestido: "👗",
              quimono: "👘",
              sari: "🥻",
              maiô: "🩱",
              cueca: "🩲",
              shorts: "🩳",
              biquíni: "👙",
              "roupas femininas": "👚",
              "pássaro preto": "🪭",
              bolsinha: "👛",
              "bolsa de mão": "👜",
              "bolsa pequena": "👝",
              "sacolas de compras": "🛍",
              mochila: "🎒",
              chinelo: "🩴",
              "sapato masculino": "👞",
              "tênis de corrida": "👟",
              "bota de trekking": "🥾",
              sapatilha: "🥿",
              "sapato de salto alto": "👠",
              "sandália feminina": "👡",
              "sapatilha de balé": "🩰",
              "bota feminina": "👢",
              "pinça de cabelo": "🪮",
              coroa: "👑",
              "chapéu feminino": "👒",
              cartola: "🎩",
              "chapéu de formatura": "🎓",
              boné: "🧢",
              "capacete militar": "🪖",
              "capacacete de socorrista": "⛑",
              "rosário de oração": "📿",
              batom: "💄",
              anel: "💍",
              "pedra preciosa": "💎",
              "alto falante silenciado": "🔇",
              "alto falante com volume baixo": "🔈",
              "alto falante com volume médio": "🔉",
              "alto falante com volume alto": "🔊",
              buzina: "📢",
              megafone: "📣",
              "corneta postal": "📯",
              sino: "🔔",
              "sino silenciado": "🔕",
              "partitura musical": "🎼",
              "nota musical": "🎵",
              "notas musicais": "🎶",
              "microfone de estúdio": "🎙",
              "controle de volume": "🎚",
              "botões giratórios": "🎛",
              microfone: "🎤",
              "fones de ouvido": "🎧",
              rádio: "📻",
              saxofone: "🎷",
              acordeão: "🪗",
              guitarra: "🎸",
              "teclado musical": "🎹",
              trompete: "🎺",
              violino: "🎻",
              banjo: "🪕",
              tambor: "🥁",
              "tambor comprido": "🪘",
              maracas: "🪇",
              flauta: "🪈",
              "telefone celular": "📱",
              "telefone celular com seta": "📲",
              "telefone no gancho": "☎",
              telefone: "📞",
              pager: "📟",
              fax: "📠",
              pilha: "🔋",
              "bateria fraca": "🪫",
              "tomada elétrica": "🔌",
              laptop: "💻",
              "computador de mesa": "🖥",
              impressora: "🖨",
              teclado: "⌨",
              mouse: "🖱",
              trackball: "🖲",
              minidisc: "💽",
              disquete: "💾",
              cd: "💿",
              dvd: "📀",
              ábaco: "🧮",
              "câmera de cinema": "🎥",
              "rolo de filmes": "🎞",
              "projetor de filmes": "📽",
              claquete: "🎬",
              televisão: "📺",
              câmera: "📷",
              "câmera com flash": "📸",
              "câmera de vídeo": "📹",
              videocassete: "📼",
              "lupa para a esquerda": "🔍",
              "lupa para a direita": "🔎",
              vela: "🕯",
              lâmpada: "💡",
              lanterna: "🔦",
              "lanterna vermelha de papel": "🏮",
              "lâmpada de óleo": "🪔",
              "caderno decorado": "📔",
              "livro fechado": "📕",
              "livro aberto": "📖",
              "livro verde": "📗",
              "livro azul": "📘",
              "livro laranja": "📙",
              livros: "📚",
              caderno: "📓",
              "livro contábil": "📒",
              "página dobrada": "📃",
              pergaminho: "📜",
              "página voltada para cima": "📄",
              jornal: "📰",
              "jornal enrolado": "🗞",
              "marcadores de página": "📑",
              "marcador de página": "🔖",
              etiqueta: "🏷",
              "saco de dinheiro": "💰",
              moeda: "🪙",
              "nota de iene": "💴",
              "nota de dólar": "💵",
              "nota de euro": "💶",
              "nota de libra": "💷",
              "dinheiro voando": "💸",
              "cartão de crédito": "💳",
              recibo: "🧾",
              "gráfico subindo com iene": "💹",
              envelope: "✉",
              "e mail": "📧",
              "envelope chegando": "📨",
              "envelope com seta": "📩",
              "bandeja de saída": "📤",
              "bandeja de entrada": "📥",
              pacote: "📦",
              "caixa de correio fechada com bandeira levantada": "📫",
              "caixa de correio fechada com bandeira abaixada": "📪",
              "caixa de correio aberta com bandeira levantada": "📬",
              "caixa de correio aberta com bandeira abaixada": "📭",
              "caixa de correio": "📮",
              "urna eleitoral com cédula": "🗳",
              lápis: "✏",
              "ponta de caneta tinteiro": "✒",
              "caneta tinteiro": "🖋",
              caneta: "🖊",
              pincel: "🖌",
              "giz de cera": "🖍",
              memorando: "📝",
              maleta: "💼",
              "pasta de arquivos": "📁",
              "pasta de arquivos aberta": "📂",
              "divisores de pastas": "🗂",
              calendário: "📅",
              "calendário com folhas destacáveis": "📆",
              "bloco espiral": "🗒",
              "calendário espiral": "🗓",
              "índice de cartões": "📇",
              "gráfico subindo": "📈",
              "gráfico caindo": "📉",
              "gráfico de barras": "📊",
              prancheta: "📋",
              tacha: "📌",
              "tacha redonda": "📍",
              "clipe de papel": "📎",
              "clipes de papel conectados": "🖇",
              "régua reta": "📏",
              "régua triangular": "📐",
              tesoura: "✂",
              "caixa de arquivos": "🗃",
              "gavetas de escritório": "🗄",
              lixeira: "🗑",
              cadeado: "🔒",
              "cadeado aberto": "🔓",
              "cadeado com caneta": "🔏",
              "cadeado fechado com chave": "🔐",
              chave: "🔑",
              "chave antiga": "🗝",
              martelo: "🔨",
              machado: "🪓",
              picareta: "⛏",
              "martelo e picareta": "⚒",
              "martelo e chave inglesa": "🛠",
              adaga: "🗡",
              "espadas cruzadas": "⚔",
              bomba: "💣",
              bumerangue: "🪃",
              "arco e flecha": "🏹",
              escudo: "🛡",
              serrote: "🪚",
              "chave inglesa": "🔧",
              "chave de fenda": "🪛",
              "porca e parafuso": "🔩",
              engrenagem: "⚙",
              braçadeira: "🗜",
              balança: "⚖",
              "bengala para cegos": "🦯",
              link: "🔗",
              correntes: "⛓",
              gancho: "🪝",
              "caixa de ferramentas": "🧰",
              ímã: "🧲",
              escada: "🪜",
              alambique: "⚗",
              "tubo de ensaio": "🧪",
              "placa de petri": "🧫",
              microscópio: "🔬",
              telescópio: "🔭",
              "antena parabólica": "📡",
              seringa: "💉",
              comprimido: "💊",
              "atadura adesiva": "🩹",
              muleta: "🩼",
              estetoscópio: "🩺",
              "raio x": "🩻",
              porta: "🚪",
              espelho: "🪞",
              janela: "🪟",
              cama: "🛏",
              "sofá e luminária": "🛋",
              cadeira: "🪑",
              "vaso sanitário": "🚽",
              desentupidor: "🪠",
              chuveiro: "🚿",
              banheira: "🛁",
              ratoeira: "🪤",
              lâmina: "🪒",
              "frasco de loção": "🧴",
              "alfinete de segurança": "🧷",
              vassoura: "🧹",
              cesta: "🧺",
              "rolo de papel": "🧻",
              balde: "🪣",
              sabonete: "🧼",
              bolhas: "🫧",
              "escova de dentes": "🪥",
              esponja: "🧽",
              "extintor de incêndio": "🧯",
              "carrinho de compras": "🛒",
              cigarro: "🚬",
              caixão: "⚰",
              lápide: "🪦",
              "urna funerária": "⚱",
              "olho grego": "🧿",
              "mão hamsá": "🪬",
              placa: "🪧",
              "cartão de identificação": "🪪",
            },
            Símbolos: {
              "carta de amor": "💌",
              "coração com flecha": "💘",
              "coração com fita": "💝",
              "coração brilhante": "💖",
              "coração crescendo": "💗",
              "coração pulsante": "💓",
              "corações girando": "💞",
              "dois corações": "💕",
              "coração decorativo": "💟",
              "exclamação de coração": "❣",
              "coração partido": "💔",
              "coração em chamas": "❤",
              "coração remendado": "❤",
              "coração vermelho": "❤",
              "coração cor de rosa": "🩷",
              "coração laranja": "🧡",
              "coração amarelo": "💛",
              "coração verde": "💚",
              "coração azul": "💙",
              "coração azul claro": "🩵",
              "coração roxo": "💜",
              "coração marrom": "🤎",
              "coração preto": "🖤",
              "coração cinzento": "🩶",
              "coração branco": "🤍",
              "marca de beijo": "💋",
              "cem pontos": "💯",
              "símbolo de raiva": "💢",
              colisão: "💥",
              zonzo: "💫",
              "pingos de suor": "💦",
              rapidez: "💨",
              buraco: "🕳",
              "balão de diálogo": "💬",
              "olho no balão de diálogo": "👁",
              "balão de diálogo à esquerda": "🗨",
              "balão de raiva à direita": "🗯",
              "balão de pensamento": "💭",
              zzz: "💤",
              elevador: "🛗",
              "símbolo de caixa automático": "🏧",
              "símbolo de lixeira": "🚮",
              "água potável": "🚰",
              "símbolo de cadeira de rodas": "♿",
              "banheiro masculino": "🚹",
              "banheiro feminino": "🚺",
              banheiro: "🚻",
              "símbolo de bebê": "🚼",
              wc: "🚾",
              "controle de passaportes": "🛂",
              alfândega: "🛃",
              "restituição de bagagem": "🛄",
              "depósito de bagagem": "🛅",
              aviso: "⚠",
              "crianças atravessando": "🚸",
              "entrada proibida": "⛔",
              proibido: "🚫",
              "proibido andar de bicicleta": "🚳",
              "proibido fumar": "🚭",
              "proibido jogar lixo no chão": "🚯",
              "água não potável": "🚱",
              "proibida a passagem de pedestres": "🚷",
              "proibido o uso de telefone celular": "📵",
              "proibido para menores de 18 anos": "🔞",
              radioativo: "☢",
              "setas verticais no sentido horário": "🔃",
              "botão de setas em sentido anti horário": "🔄",
              "seta back": "🔙",
              "seta end": "🔚",
              "seta on": "🔛",
              "seta soon": "🔜",
              "seta top": "🔝",
              "local de culto": "🛐",
              menorá: "🕎",
              "estrela de seis pontas": "🔯",
              "símbolo khanda": "🪯",
              "signo de áries": "♈",
              "signo de touro": "♉",
              "signo de gêmeos": "♊",
              "signo de câncer": "♋",
              "signo de leão": "♌",
              "signo de virgem": "♍",
              "signo de libra": "♎",
              "signo de escorpião": "♏",
              "signo de sagitário": "♐",
              "signo de capricórnio": "♑",
              "signo de aquário": "♒",
              "signo de peixes": "♓",
              "signo de ofiúco": "⛎",
              "botão de músicas aleatórias": "🔀",
              "botão de repetir": "🔁",
              "botão de repetir uma única faixa": "🔂",
              "botão reproduzir": "▶",
              "botão avançar": "⏩",
              "botão de próxima faixa": "⏭",
              "botão de reproduzir ou pausar": "⏯",
              "botão de retroceder": "⏪",
              "botão de faixa anterior": "⏮",
              "botão apontando para cima": "🔼",
              "botão de avanço para cima": "⏫",
              "botão apontando para baixo": "🔽",
              "botão de avanço para baixo": "⏬",
              "botão pausar": "⏸",
              "botão parar": "⏹",
              "botão gravar": "⏺",
              cinema: "🎦",
              "botão de diminuir brilho": "🔅",
              "botão de aumentar brilho": "🔆",
              "barras de sinal": "📶",
              "sem fios": "🛜",
              "modo vibratório": "📳",
              "telefone celular desligado": "📴",
              "símbolo de adição": "➕",
              "símbolo de subtração": "➖",
              "símbolo de divisão": "➗",
              "sinal de igual a negrito": "🟰",
              "ponto de interrogação vermelho": "❓",
              "ponto de interrogação branco": "❔",
              "ponto de exclamação branco": "❕",
              "ponto de exclamação vermelho": "❗",
              "câmbio de moeda": "💱",
              cifrão: "💲",
              "emblema de tridente": "🔱",
              crachá: "📛",
              "símbolo japonês de principiante": "🔰",
              "círculo grande oco": "⭕",
              "marca de seleção branca": "✅",
              xis: "❌",
              "botão de xis": "❎",
              "laço encaracolado": "➰",
              "loop encaracolado duas vezes": "➿",
              "keycap 10": "🔟",
              "letras latinas maiúsculas": "🔠",
              "letras latinas minúsculas": "🔡",
              números: "🔢",
              símbolos: "🔣",
              "letras latinas": "🔤",
              "botão a tipo sanguíneo": "🅰",
              "botão ab tipo sanguíneo": "🆎",
              "botão b tipo sanguíneo": "🅱",
              "botão cl": "🆑",
              "botão cool": "🆒",
              "botão free": "🆓",
              "botão id": "🆔",
              "botão new": "🆕",
              "botão ng": "🆖",
              "botão o tipo sanguíneo": "🅾",
              "botão ok": "🆗",
              "botão p": "🅿",
              "botão sos": "🆘",
              "botão up": "🆙",
              "botão vs": "🆚",
              "botão japonês de aqui": "🈁",
              "botão japonês de não gratuito": "🈶",
              "botão japonês de reservado": "🈯",
              "botão japonês de barganha": "🉐",
              "botão japonês de desconto": "🈹",
              "botão japonês de gratuito": "🈚",
              "botão japonês de proibido": "🈲",
              "botão japonês de aceitável": "🉑",
              "botão japonês de aplicação": "🈸",
              "botão japonês de nota mínima": "🈴",
              "botão japonês de vago": "🈳",
              "botão japonês de parabéns": "㊗",
              "botão japonês de segredo": "㊙",
              "botão japonês de aberto para negócios": "🈺",
              "botão japonês de sem vagas": "🈵",
              "círculo vermelho": "🔴",
              "círculo laranja": "🟠",
              "círculo amarelo": "🟡",
              "círculo verde": "🟢",
              "círculo azul": "🔵",
              "círculo roxo": "🟣",
              "círculo marrom": "🟤",
              "círculo preto": "⚫",
              "círculo branco": "⚪",
              "quadrado vermelho": "🟥",
              "quadrado laranja": "🟧",
              "quadrado amarelo": "🟨",
              "quadrado verde": "🟩",
              "quadrado azul": "🟦",
              "quadrado roxo": "🟪",
              "quadrado marrom": "🟫",
              "quadrado preto grande": "⬛",
              "quadrado branco grande": "⬜",
              "quadrado preto médio menor": "◾",
              "quadrado branco médio menor": "◽",
              "losango laranja grande": "🔶",
              "losango azul grande": "🔷",
              "losango laranja pequeno": "🔸",
              "losango azul pequeno": "🔹",
              "triângulo vermelho para cima": "🔺",
              "triângulo vermelho para baixo": "🔻",
              "diamante com um ponto": "💠",
              "botão de opção": "🔘",
              "botão quadrado branco": "🔳",
              "botão quadrado preto": "🔲",
            },
          };
        }
        function ob(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var o =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != o) {
                var n,
                  r,
                  a,
                  s,
                  i = [],
                  c = !0,
                  l = !1;
                try {
                  if (((a = (o = o.call(e)).next), 0 === t)) {
                    if (Object(o) !== o) return;
                    c = !1;
                  } else
                    for (
                      ;
                      !(c = (n = a.call(o)).done) &&
                      (i.push(n.value), i.length !== t);
                      c = !0
                    );
                } catch (e) {
                  (l = !0), (r = e);
                } finally {
                  try {
                    if (
                      !c &&
                      null != o.return &&
                      ((s = o.return()), Object(s) !== s)
                    )
                      return;
                  } finally {
                    if (l) throw r;
                  }
                }
                return i;
              }
            })(e, t) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return nb(e, t);
                var o = {}.toString.call(e).slice(8, -1);
                return (
                  "Object" === o && e.constructor && (o = e.constructor.name),
                  "Map" === o || "Set" === o
                    ? Array.from(e)
                    : "Arguments" === o ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                    ? nb(e, t)
                    : void 0
                );
              }
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function nb(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var o = 0, n = Array(t); o < t; o++) n[o] = e[o];
          return n;
        }
        var rb = { class: "p-3 w-full absolute top-0 left-0" },
          ab = { key: 0, class: "text-center" },
          sb = { class: "font-medium" },
          ib = { class: "grid grid-cols-5 text-2xl" },
          cb = ["onClick"];
        const lb = {
          __name: "EmojiMenu",
          setup: function (e) {
            var t = qg(),
              o = Yt(!1),
              n = Yt(null);
            var r = Yt(""),
              a = Ti(function () {
                return (function (e) {
                  var t = e.toLowerCase(),
                    o = {};
                  for (var n in {
                    Smileys: {
                      "rosto risonho": "😀",
                      "rosto risonho com olhos bem abertos": "😃",
                      "rosto risonho com olhos sorridentes": "😄",
                      "rosto contente com olhos sorridentes": "😁",
                      "rosto risonho com olhos semicerrados": "😆",
                      "rosto risonho com gota de suor": "😅",
                      "rolando no chão de rir": "🤣",
                      "rosto chorando de rir": "😂",
                      "rosto levemente sorridente": "🙂",
                      "rosto de cabeça para baixo": "🙃",
                      "cara a derreter": "🫠",
                      "rosto com olho piscando": "😉",
                      "rosto sorridente com olhos sorridentes": "😊",
                      "rosto sorridente com auréola": "😇",
                      "rosto sorridente com 3 corações": "🥰",
                      "rosto sorridente com olhos de coração": "😍",
                      "rosto com olhar maravilhado": "🤩",
                      "rosto mandando um beijo": "😘",
                      "rosto beijando": "😗",
                      "rosto beijando com olhos fechados": "😚",
                      "rosto beijando com olhos sorridentes": "😙",
                      "rosto sorridente com lágrima": "🥲",
                      "rosto saboreando comida": "😋",
                      "rosto mostrando a língua": "😛",
                      "rosto piscando e com língua para fora": "😜",
                      "rosto bizarro": "🤪",
                      "rosto com olhos semicerrados e língua para fora": "😝",
                      "rosto com cifrões": "🤑",
                      "rosto abraçando": "🤗",
                      "rosto com a mão sobre a boca": "🤭",
                      "cara com os olhos abertos e a mão na boca": "🫢",
                      "cara com olho a espreitar": "🫣",
                      "rosto fazendo sinal de silêncio": "🤫",
                      "rosto pensativo": "🤔",
                      "cara de saudação": "🫡",
                      "rosto com boca de zíper": "🤐",
                      "rosto com sobrancelha levantada": "🤨",
                      "rosto neutro": "😐",
                      "rosto inexpressivo": "😑",
                      "rosto sem boca": "😶",
                      "cara com linha tracejada": "🫥",
                      "rosto nas nuvens": "😶",
                      "rosto com sorriso maroto": "😏",
                      "rosto aborrecido": "😒",
                      "rosto com olhos revirados": "🙄",
                      "rosto expressando desagrado": "😬",
                      "rosto exalando": "😮",
                      "rosto de mentiroso": "🤥",
                      "cara trémula": "🫨",
                      "rosto aliviado": "😌",
                      "rosto deprimido": "😔",
                      "rosto sonolento": "😪",
                      "rosto babando": "🤤",
                      "rosto dormindo": "😴",
                      "rosto com máscara médica": "😷",
                      "rosto com termômetro": "🤒",
                      "rosto com atadura na cabeça": "🤕",
                      "rosto nauseado": "🤢",
                      "rosto vomitando": "🤮",
                      "rosto espirrando": "🤧",
                      "rosto fervendo de calor": "🥵",
                      "rosto gelado": "🥶",
                      "rosto embriagado": "🥴",
                      "rosto atordoado": "😵",
                      "rosto com olhos em espiral": "😵",
                      "cabeça explodindo": "🤯",
                      "rosto com chapéu de caubói": "🤠",
                      "rosto festivo": "🥳",
                      "rosto disfarçado": "🥸",
                      "rosto sorridente com óculos escuros": "😎",
                      "rosto de nerd": "🤓",
                      "rosto com monóculo": "🧐",
                      "rosto confuso": "😕",
                      "cara com boca na diagonal": "🫤",
                      "rosto preocupado": "😟",
                      "rosto meio triste": "🙁",
                      "rosto com boca aberta": "😮",
                      "rosto surpreso": "😯",
                      "rosto espantado": "😲",
                      "rosto ruborizado": "😳",
                      "rosto implorando": "🥺",
                      "cara a conter as lágrimas": "🥹",
                      "rosto franzido com boca aberta": "😦",
                      "rosto angustiado": "😧",
                      "rosto amedrontado": "😨",
                      "rosto ansioso com gota de suor": "😰",
                      "rosto triste mas aliviado": "😥",
                      "rosto chorando": "😢",
                      "rosto chorando aos berros": "😭",
                      "rosto gritando de medo": "😱",
                      "rosto perplexo": "😖",
                      "rosto perseverante": "😣",
                      "rosto desapontado": "😞",
                      "rosto cabisbaixo com gota de suor": "😓",
                      "rosto desolado": "😩",
                      "rosto cansado": "😫",
                      "rosto bocejando": "🥱",
                      "rosto soltando vapor pelo nariz": "😤",
                      "rosto furioso": "😡",
                      "rosto zangado": "😠",
                      "rosto com símbolos na boca": "🤬",
                      "rosto sorridente com chifres": "😈",
                      "rosto zangado com chifres": "👿",
                      caveira: "💀",
                      cocô: "💩",
                      "rosto de palhaço": "🤡",
                      ogro: "👹",
                      "duende japonês": "👺",
                      fantasma: "👻",
                      alienígena: "👽",
                      "monstro alienígena": "👾",
                      "rosto de robô": "🤖",
                      "rosto de gato sorrindo": "😺",
                      "rosto de gato sorrindo com olhos sorridentes": "😸",
                      "rosto de gato com lágrimas de alegria": "😹",
                      "rosto de gato sorridente com olhos de coração": "😻",
                      "rosto de gato com sorriso irônico": "😼",
                      "rosto de gato mandando um beijo": "😽",
                      "rosto de gato desolado": "🙀",
                      "rosto de gato chorando": "😿",
                      "rosto de gato mal humorado": "😾",
                      "macaco que não vê nada": "🙈",
                      "macaco que não ouve nada": "🙉",
                      "macaco que não fala nada": "🙊",
                    },
                    Pessoas: {
                      "mão acenando": "👋",
                      "dorso da mão levantado": "🤚",
                      "mão aberta com os dedos separados": "🖐",
                      "mão levantada": "✋",
                      "saudação vulcana": "🖖",
                      "mão para a direita": "🫱",
                      "mão para a esquerda": "🫲",
                      "palma da mão virada para baixo": "🫳",
                      "palma da mão virada para cima": "🫴",
                      "mão a empurrar para a esquerda": "🫷",
                      "mão a empurrar para a direita": "🫸",
                      "sinal de ok": "👌",
                      "dedos comprimidos": "🤌",
                      "mão beliscando": "🤏",
                      "mão em v de vitória": "✌",
                      "dedos cruzados": "🤞",
                      "mão com o dedo indicador e o polegar cruzados": "🫰",
                      "gesto de te amo": "🤟",
                      "saudação do rock": "🤘",
                      "sinal me liga": "🤙",
                      "dorso da mão com dedo indicador apontando para a esquerda":
                        "👈",
                      "dorso da mão com dedo indicador apontando para a direita":
                        "👉",
                      "dorso da mão com dedo indicador apontando para cima":
                        "👆",
                      "dedo do meio": "🖕",
                      "dorso da mão com dedo indicador apontando para baixo":
                        "👇",
                      "indicador apontando para cima": "☝",
                      "dedo indicador a apontar ao visor": "🫵",
                      "polegar para cima": "👍",
                      "polegar para baixo": "👎",
                      "punho levantado": "✊",
                      soco: "👊",
                      "punho esquerdo": "🤛",
                      "punho direito": "🤜",
                      "mãos aplaudindo": "👏",
                      "mãos para cima": "🙌",
                      "mãos em coração": "🫶",
                      "mãos abertas": "👐",
                      "palmas unidas para cima": "🤲",
                      "aperto de mãos": "🤝",
                      "mãos juntas": "🙏",
                      "escrevendo à mão": "✍",
                      "esmalte de unha": "💅",
                      selfie: "🤳",
                      bíceps: "💪",
                      "braço mecânico": "🦾",
                      "perna mecânica": "🦿",
                      perna: "🦵",
                      pé: "🦶",
                      orelha: "👂",
                      "ouvido com aparelho auditivo": "🦻",
                      nariz: "👃",
                      cérebro: "🧠",
                      "coração humano": "🫀",
                      pulmões: "🫁",
                      dente: "🦷",
                      osso: "🦴",
                      olhos: "👀",
                      olho: "👁",
                      língua: "👅",
                      boca: "👄",
                      "morder o lábio": "🫦",
                      bebê: "👶",
                      criança: "🧒",
                      menino: "👦",
                      menina: "👧",
                      pessoa: "🧑",
                      "pessoa cabelo louro": "👱",
                      homem: "👨",
                      "homem barba": "🧔",
                      "homem barbudo": "🧔",
                      "man medium light skin tone beard": "🧔",
                      "mulher barba": "🧔",
                      "woman medium light skin tone beard": "🧔",
                      "homem cabelo vermelho": "👨",
                      "homem cabelo cacheado": "👨",
                      "homem cabelo branco": "👨",
                      "homem careca": "👨",
                      mulher: "👩",
                      "mulher cabelo vermelho": "👩",
                      "pessoa cabelo vermelho": "🧑",
                      "mulher cabelo cacheado": "👩",
                      "pessoa cabelo cacheado": "🧑",
                      "mulher cabelo branco": "👩",
                      "pessoa cabelo branco": "🧑",
                      "mulher careca": "👩",
                      "pessoa careca": "🧑",
                      "mulher cabelo loiro": "👱",
                      "woman medium light skin tone blond hair": "👱",
                      "homem cabelo loiro": "👱",
                      "man medium light skin tone blond hair": "👱",
                      idoso: "🧓",
                      "homem idoso": "👴",
                      idosa: "👵",
                      "franzindo a sobrancelha": "🙍",
                      "homem franzindo a sobrancelha": "🙍",
                      "mulher franzindo a sobrancelha": "🙍",
                      "pessoa fazendo bico": "🙎",
                      "homem fazendo bico": "🙎",
                      "mulher fazendo bico": "🙎",
                      "pessoa fazendo gesto de não": "🙅",
                      "homem fazendo gesto de não": "🙅",
                      "mulher fazendo gesto de não": "🙅",
                      "pessoa fazendo gesto de ok": "🙆",
                      "homem fazendo gesto de ok": "🙆",
                      "mulher fazendo gesto de ok": "🙆",
                      "pessoa com a palma virada para cima": "💁",
                      "homem com a palma virada para cima": "💁",
                      "mulher com a palma virada para cima": "💁",
                      "pessoa levantando a mão": "🙋",
                      "homem levantando a mão": "🙋",
                      "mulher levantando a mão": "🙋",
                      "pessoa surda": "🧏",
                      "homem surdo": "🧏",
                      "mulher surda": "🧏",
                      "pessoa fazendo reverência": "🙇",
                      "homem fazendo reverência": "🙇",
                      "mulher fazendo reverência": "🙇",
                      "pessoa decepcionada": "🤦",
                      "homem decepcionado": "🤦",
                      "mulher decepcionada": "🤦",
                      "pessoa dando de ombros": "🤷",
                      "homem dando de ombros": "🤷",
                      "mulher dando de ombros": "🤷",
                      "profissional de saúde": "🧑",
                      "homem profissional da saúde": "👨",
                      "mulher profissional da saúde": "👩",
                      aluno: "🧑",
                      estudante: "👨",
                      aluna: "👩",
                      "professora na escola": "🧑",
                      professor: "👨",
                      professora: "👩",
                      "juiz no tribunal": "🧑",
                      juiz: "👨",
                      juíza: "👩",
                      agricultor: "🧑",
                      fazendeiro: "👨",
                      fazendeira: "👩",
                      "chef de cozinha": "🧑",
                      cozinheiro: "👨",
                      cozinheira: "👩",
                      "mecânico trabalhando": "🧑",
                      mecânico: "👨",
                      mecânica: "👩",
                      "funcionário de fábrica": "🧑",
                      operário: "👨",
                      operária: "👩",
                      "trabalhador de escritório": "🧑",
                      "funcionário de escritório": "👨",
                      "funcionária de escritório": "👩",
                      cientista: "🧑",
                      "cientista homem": "👨",
                      "cientista mulher": "👩",
                      programador: "🧑",
                      tecnólogo: "👨",
                      tecnóloga: "👩",
                      cantor: "🧑",
                      "cantor homem": "👨",
                      cantora: "👩",
                      artista: "🧑",
                      "artista plástico": "👨",
                      "artista plástica": "👩",
                      piloto: "🧑",
                      "piloto de avião homem": "👨",
                      "piloto de avião mulher": "👩",
                      astronauta: "🧑",
                      "astronauta homem": "👨",
                      "astronauta mulher": "👩",
                      bombeiro: "🧑",
                      "bombeiro homem": "👨",
                      "man firefighter medium dark skin tone": "👨",
                      bombeira: "👩",
                      policial: "👮",
                      "policial homem": "👮",
                      "policial mulher": "👮",
                      detetive: "🕵",
                      "detetive homem": "🕵",
                      "detetive mulher": "🕵",
                      guarda: "💂",
                      "guarda homem": "💂",
                      "guarda mulher": "💂",
                      ninja: "🥷",
                      "trabalhador de construção civil": "👷",
                      pedreiro: "👷",
                      pedreira: "👷",
                      "pessoa com coroa": "🫅",
                      príncipe: "🤴",
                      princesa: "👸",
                      "pessoa com turbante": "👳",
                      "homem com turbante": "👳",
                      "mulher com turbante": "👳",
                      "homem de boné": "👲",
                      "pessoa com véu": "🧕",
                      "pessoa de smoking": "🤵",
                      "homem de smoking": "🤵",
                      "mulher de smoking": "🤵",
                      noiva: "👰",
                      "noivo com véu": "👰",
                      "noiva com véu": "👰",
                      grávida: "🤰",
                      "homem grávido": "🫃",
                      "pessoa grávida": "🫄",
                      amamentando: "🤱",
                      "mulher alimentando bebê": "👩",
                      "homem alimentando bebê": "👨",
                      "pessoa alimentando bebê": "🧑",
                      "bebê anjo": "👼",
                      "papai noel": "🎅",
                      "mamãe noel": "🤶",
                      noel: "🧑",
                      "super herói": "🦸",
                      "homem super herói": "🦸",
                      "super heroína": "🦸",
                      supervilão: "🦹",
                      "homem supervilão": "🦹",
                      supervilã: "🦹",
                      mago: "🧙",
                      "homem mago": "🧙",
                      maga: "🧙",
                      fada: "🧚",
                      "homem fada": "🧚",
                      "mulher fada": "🧚",
                      vampiro: "🧛",
                      "homem vampiro": "🧛",
                      "mulher vampira": "🧛",
                      "pessoa sereia": "🧜",
                      sereio: "🧜",
                      sereia: "🧜",
                      elfo: "🧝",
                      "elfo homem": "🧝",
                      elfa: "🧝",
                      gênio: "🧞",
                      "homem gênio": "🧞",
                      "mulher gênio": "🧞",
                      zumbi: "🧟",
                      "homem zumbi": "🧟",
                      "mulher zumbi": "🧟",
                      duende: "🧌",
                      "pessoa recebendo massagem facial": "💆",
                      "homem recebendo massagem facial": "💆",
                      "mulher recebendo massagem facial": "💆",
                      "pessoa cortando o cabelo": "💇",
                      "homem cortando o cabelo": "💇",
                      "man getting haircut medium light skin tone": "💇",
                      "mulher cortando o cabelo": "💇",
                      "pessoa andando": "🚶",
                      "homem andando": "🚶",
                      "mulher andando": "🚶",
                      "pessoa em pé": "🧍",
                      "homem em pé": "🧍",
                      "mulher em pé": "🧍",
                      "pessoa ajoelhando": "🧎",
                      "homem ajoelhando": "🧎",
                      "mulher ajoelhando": "🧎",
                      "pessoa com bengala para cego": "🧑",
                      "homem com bengala para cego": "👨",
                      "mulher com bengala para cego": "👩",
                      "pessoa em cadeira de rodas motorizada": "🧑",
                      "homem em cadeira de rodas motorizada": "👨",
                      "mulher em cadeira de rodas motorizada": "👩",
                      "pessoa em cadeira de rodas manual": "🧑",
                      "homem em cadeira de rodas manual": "👨",
                      "mulher em cadeira de rodas manual": "👩",
                      "pessoa correndo": "🏃",
                      "homem correndo": "🏃",
                      "mulher correndo": "🏃",
                      "mulher dançando": "💃",
                      "homem dançando": "🕺",
                      "pessoa de terno levitando": "🕴",
                      "pessoas com orelhas de coelho": "👯",
                      "homens com orelhas de coelho": "👯",
                      "mulheres com orelhas de coelho": "👯",
                      "pessoa na sauna": "🧖",
                      "homem na sauna": "🧖",
                      "mulher na sauna": "🧖",
                      "pessoa escalando": "🧗",
                      "homem escalando": "🧗",
                      "mulher escalando": "🧗",
                      esgrimista: "🤺",
                      "corrida de cavalos": "🏇",
                      esquiador: "⛷",
                      "praticante de snowboard": "🏂",
                      golfista: "🏌",
                      "homem golfista": "🏌",
                      "mulher golfista": "🏌",
                      surfista: "🏄",
                      "homem surfista": "🏄",
                      "mulher surfista": "🏄",
                      "pessoa remando": "🚣",
                      "homem remando": "🚣",
                      "mulher remando": "🚣",
                      "pessoa nadando": "🏊",
                      "homem nadando": "🏊",
                      "mulher nadando": "🏊",
                      "pessoa jogando basquete": "⛹",
                      "homem jogando basquete": "⛹",
                      "mulher jogando basquete": "⛹",
                      "pessoa levantando peso": "🏋",
                      "homem levantando peso": "🏋",
                      "mulher levantando peso": "🏋",
                      ciclista: "🚴",
                      "homem ciclista": "🚴",
                      "mulher ciclista": "🚴",
                      "pessoa fazendo mountain bike": "🚵",
                      "homem fazendo mountain bike": "🚵",
                      "mulher fazendo mountain bike": "🚵",
                      "pessoa fazendo estrela": "🤸",
                      "homem fazendo estrela": "🤸",
                      "mulher fazendo estrela": "🤸",
                      "pessoas lutando": "🤼",
                      "homens lutando": "🤼",
                      "mulheres lutando": "🤼",
                      "pessoa jogando polo aquático": "🤽",
                      "homem jogando polo aquático": "🤽",
                      "mulher jogando polo aquático": "🤽",
                      handebol: "🤾",
                      "jogador de handebol": "🤾",
                      "jogadora de handebol": "🤾",
                      malabarista: "🤹",
                      "homem malabarista": "🤹",
                      "mulher malabarista": "🤹",
                      "pessoa na posição de lótus": "🧘",
                      "homem na posição de lótus": "🧘",
                      "mulher na posição de lótus": "🧘",
                      "pessoa tomando banho": "🛀",
                      "pessoa deitada na cama": "🛌",
                      "pessoas de mãos dadas": "🧑",
                      "duas mulheres de mãos dadas": "👭",
                      "homem e mulher de mãos dadas": "👫",
                      "dois homens de mãos dadas": "👬",
                      beijo: "💏",
                      "beijo mulher homem": "👩",
                      "beijo homem homem": "👨",
                      "beijo mulher mulher": "👩",
                      "casal apaixonado": "💑",
                      "casal apaixonado mulher homem": "👩",
                      "casal apaixonado homem homem": "👨",
                      "casal apaixonado mulher mulher": "👩",
                      "família homem mulher menino": "👨",
                      "família homem mulher menina": "👨",
                      "família homem mulher menina menino": "👨",
                      "família homem mulher menino menino": "👨",
                      "família homem mulher menina menina": "👨",
                      "família homem homem menino": "👨",
                      "família homem homem menina": "👨",
                      "família homem homem menina menino": "👨",
                      "família homem homem menino menino": "👨",
                      "família homem homem menina menina": "👨",
                      "família mulher mulher menino": "👩",
                      "família mulher mulher menina": "👩",
                      "família mulher mulher menina menino": "👩",
                      "família mulher mulher menino menino": "👩",
                      "família mulher mulher menina menina": "👩",
                      "família homem menino": "👨",
                      "família homem menino menino": "👨",
                      "família homem menina": "👨",
                      "família homem menina menino": "👨",
                      "família homem menina menina": "👨",
                      "família mulher menino": "👩",
                      "família mulher menino menino": "👩",
                      "família mulher menina": "👩",
                      "família mulher menina menino": "👩",
                      "família mulher menina menina": "👩",
                      "silhueta falando": "🗣",
                      "silhueta de busto": "👤",
                      "silhueta de bustos": "👥",
                      "pessoas se abraçando": "🫂",
                      família: "👪",
                      "family adult adult child": "🧑",
                      "family adult adult child child": "🧑",
                      "family adult child": "🧑",
                      "family adult child child": "🧑",
                      pegadas: "👣",
                      dna: "🧬",
                      "gota de sangue": "🩸",
                      "cabelo vermelho": "🦰",
                      "cabelo cacheado": "🦱",
                      careca: "🦲",
                      "cabelo branco": "🦳",
                      "família mulher menino menina": "👩",
                      "família mulher homem menino menina": "👩",
                      "família mulher homem menina menino": "👩",
                      "família homem homem menino bebê": "👨",
                    },
                    "Animais e Natureza": {
                      "rosto de macaco": "🐵",
                      macaco: "🐒",
                      gorila: "🦍",
                      orangotango: "🦧",
                      "rosto de cachorro": "🐶",
                      cachorro: "🐕",
                      "cão guia": "🦮",
                      "cão de serviço": "🐕",
                      poodle: "🐩",
                      "rosto de lobo": "🐺",
                      "rosto de raposa": "🦊",
                      guaxinim: "🦝",
                      "rosto de gato": "🐱",
                      gato: "🐈",
                      "gato preto": "🐈",
                      "rosto de leão": "🦁",
                      "rosto de tigre": "🐯",
                      tigre: "🐅",
                      leopardo: "🐆",
                      "rosto de cavalo": "🐴",
                      "cara de alce": "🫎",
                      burro: "🫏",
                      cavalo: "🐎",
                      "rosto de unicórnio": "🦄",
                      zebra: "🦓",
                      cervo: "🦌",
                      bisão: "🦬",
                      "rosto de vaca": "🐮",
                      boi: "🐂",
                      "búfalo asiático": "🐃",
                      vaca: "🐄",
                      "rosto de porco": "🐷",
                      porco: "🐖",
                      javali: "🐗",
                      "nariz de porco": "🐽",
                      carneiro: "🐏",
                      ovelha: "🐑",
                      cabra: "🐐",
                      camelo: "🐪",
                      "camelo com duas corcovas": "🐫",
                      lhama: "🦙",
                      girafa: "🦒",
                      elefante: "🐘",
                      mamute: "🦣",
                      rinoceronte: "🦏",
                      hipopótamo: "🦛",
                      "rosto de camundongo": "🐭",
                      camundongo: "🐁",
                      rato: "🐀",
                      "rosto de hamster": "🐹",
                      "rosto de coelho": "🐰",
                      coelho: "🐇",
                      esquilo: "🐿",
                      castor: "🦫",
                      "porco espinho": "🦔",
                      morcego: "🦇",
                      "rosto de urso": "🐻",
                      "urso polar": "🐻",
                      coala: "🐨",
                      "rosto de panda": "🐼",
                      preguiça: "🦥",
                      lontra: "🦦",
                      gambá: "🦨",
                      canguru: "🦘",
                      texugo: "🦡",
                      patas: "🐾",
                      peru: "🦃",
                      galinha: "🐔",
                      galo: "🐓",
                      "pintinho chocando": "🐣",
                      "pintinho de perfil": "🐤",
                      "pintinho de frente": "🐥",
                      pássaro: "🐦",
                      pinguim: "🐧",
                      "pomba branca": "🕊",
                      águia: "🦅",
                      pato: "🦆",
                      cisne: "🦢",
                      coruja: "🦉",
                      dodô: "🦤",
                      pena: "🪶",
                      flamingo: "🦩",
                      pavão: "🦚",
                      papagaio: "🦜",
                      asa: "🪽",
                      leque: "🐦",
                      ganso: "🪿",
                      sapo: "🐸",
                      crocodilo: "🐊",
                      tartaruga: "🐢",
                      lagartixa: "🦎",
                      cobra: "🐍",
                      "rosto de dragão": "🐲",
                      dragão: "🐉",
                      saurópode: "🦕",
                      "tiranossauro rex": "🦖",
                      "baleia esguichando água": "🐳",
                      baleia: "🐋",
                      golfinho: "🐬",
                      foca: "🦭",
                      peixe: "🐟",
                      "peixe tropical": "🐠",
                      baiacu: "🐡",
                      tubarão: "🦈",
                      polvo: "🐙",
                      caramujo: "🐚",
                      coral: "🪸",
                      alforreca: "🪼",
                      caracol: "🐌",
                      borboleta: "🦋",
                      inseto: "🐛",
                      formiga: "🐜",
                      abelha: "🐝",
                      besouro: "🪲",
                      joaninha: "🐞",
                      grilo: "🦗",
                      barata: "🪳",
                      aranha: "🕷",
                      "teia de aranha": "🕸",
                      escorpião: "🦂",
                      mosquito: "🦟",
                      mosca: "🪰",
                      minhoca: "🪱",
                      micróbio: "🦠",
                      buquê: "💐",
                      "flor de cerejeira": "🌸",
                      "flor branca": "💮",
                      "flor de lotus": "🪷",
                      roseta: "🏵",
                      rosa: "🌹",
                      "flor murcha": "🥀",
                      hibisco: "🌺",
                      girassol: "🌻",
                      flor: "🌼",
                      tulipa: "🌷",
                      jacinto: "🪻",
                      "muda de planta": "🌱",
                      "vaso com planta": "🪴",
                      conífera: "🌲",
                      "árvore caidiça": "🌳",
                      palmeira: "🌴",
                      cacto: "🌵",
                      "planta de arroz": "🌾",
                      erva: "🌿",
                      trevo: "☘",
                      "trevo de quatro folhas": "🍀",
                      "folha de bordo": "🍁",
                      "folhas caídas": "🍂",
                      "folha ao vento": "🍃",
                      "ninho vazio": "🪹",
                      "ninho com ovos": "🪺",
                      cogumelo: "🍄",
                      caranguejo: "🦀",
                      lagosta: "🦞",
                      camarão: "🦐",
                      lula: "🦑",
                      ostra: "🦪",
                      pedra: "🪨",
                      madeira: "🪵",
                      "lua nova": "🌑",
                      "lua crescente côncava": "🌒",
                      "quarto crescente": "🌓",
                      "lua crescente convexa": "🌔",
                      "lua cheia": "🌕",
                      "lua minguante convexa": "🌖",
                      "quarto minguante": "🌗",
                      "lua minguante côncava": "🌘",
                      "lua crescente": "🌙",
                      "rosto da lua nova": "🌚",
                      "rosto da lua de quarto crescente": "🌛",
                      "rosto da lua de quarto minguante": "🌜",
                      sol: "☀",
                      "rosto da lua cheia": "🌝",
                      "rosto do sol": "🌞",
                      "planeta com anéis": "🪐",
                      "estrela branca média": "⭐",
                      "estrela brilhante": "🌟",
                      "estrela cadente": "🌠",
                      "via láctea": "🌌",
                      nuvem: "☁",
                      "sol por trás das nuvens": "⛅",
                      "chuva com trovão": "⛈",
                      "sol com nuvens": "🌤",
                      nublado: "🌥",
                      "sol com chuva": "🌦",
                      "nuvem com chuva": "🌧",
                      "nuvem com neve": "🌨",
                      "nuvem com trovão": "🌩",
                      tornado: "🌪",
                      nevoeiro: "🌫",
                      "rosto de vento": "🌬",
                      ciclone: "🌀",
                      "arco íris": "🌈",
                      "guarda chuva fechado": "🌂",
                      "guarda chuva": "☂",
                      "sombrinha na chuva": "☔",
                      "guarda sol": "⛱",
                      "alta tensão": "⚡",
                      "floco de neve": "❄",
                      "boneco de neve": "☃",
                      "boneco de neve sem neve": "⛄",
                      cometa: "☄",
                      fogo: "🔥",
                      gota: "💧",
                      onda: "🌊",
                    },
                    "Comida e Bebida": {
                      uvas: "🍇",
                      melão: "🍈",
                      melancia: "🍉",
                      tangerina: "🍊",
                      limão: "🍋",
                      banana: "🍌",
                      abacaxi: "🍍",
                      manga: "🥭",
                      "maçã vermelha": "🍎",
                      "maçã verde": "🍏",
                      pera: "🍐",
                      pêssego: "🍑",
                      cereja: "🍒",
                      morango: "🍓",
                      mirtilos: "🫐",
                      kiwi: "🥝",
                      tomate: "🍅",
                      azeitona: "🫒",
                      coco: "🥥",
                      abacate: "🥑",
                      berinjela: "🍆",
                      batata: "🥔",
                      cenoura: "🥕",
                      milho: "🌽",
                      pimenta: "🌶",
                      pimentão: "🫑",
                      pepino: "🥒",
                      verdura: "🥬",
                      brócolis: "🥦",
                      alho: "🧄",
                      cebola: "🧅",
                      amendoim: "🥜",
                      feijões: "🫘",
                      castanha: "🌰",
                      gengibre: "🫚",
                      "vagem de ervilha": "🫛",
                      pão: "🍞",
                      croissant: "🥐",
                      baguete: "🥖",
                      "pão sírio": "🫓",
                      pretzel: "🥨",
                      rosca: "🥯",
                      panquecas: "🥞",
                      waffle: "🧇",
                      queijo: "🧀",
                      carne: "🍖",
                      "coxa de frango": "🍗",
                      "corte de carne": "🥩",
                      bacon: "🥓",
                      hambúrguer: "🍔",
                      "batata frita": "🍟",
                      pizza: "🍕",
                      "cachorro quente": "🌭",
                      sanduíche: "🥪",
                      taco: "🌮",
                      burrito: "🌯",
                      tamale: "🫔",
                      "pão recheado": "🥙",
                      falafel: "🧆",
                      ovo: "🥚",
                      "ovo frito": "🍳",
                      "caçarola com comida": "🥘",
                      panela: "🍲",
                      fondue: "🫕",
                      "tigela com colher": "🥣",
                      "salada verde": "🥗",
                      pipoca: "🍿",
                      manteiga: "🧈",
                      sal: "🧂",
                      "comida enlatada": "🥫",
                      bentô: "🍱",
                      "biscoito de arroz": "🍘",
                      "arroz japonês": "🍙",
                      "arroz cozido": "🍚",
                      "arroz com curry": "🍛",
                      lámen: "🍜",
                      espaguete: "🍝",
                      "batata assada": "🍠",
                      oden: "🍢",
                      sushi: "🍣",
                      "camarão frito": "🍤",
                      "bolinho de peixe": "🍥",
                      "bolo lunar": "🥮",
                      dango: "🍡",
                      "bolinho asiático": "🥟",
                      "biscoito da sorte": "🥠",
                      "caixa para viagem": "🥡",
                      "sorvete italiano": "🍦",
                      "raspadinha de gelo": "🍧",
                      sorvete: "🍨",
                      donut: "🍩",
                      biscoito: "🍪",
                      "bolo de aniversário": "🎂",
                      "pão de ló de morango": "🍰",
                      cupcake: "🧁",
                      torta: "🥧",
                      chocolate: "🍫",
                      bala: "🍬",
                      pirulito: "🍭",
                      pudim: "🍮",
                      "pote de mel": "🍯",
                      mamadeira: "🍼",
                      "copo de leite": "🥛",
                      café: "☕",
                      bule: "🫖",
                      "xícara de chá sem alça": "🍵",
                      saquê: "🍶",
                      "garrafa de champanhe": "🍾",
                      vinho: "🍷",
                      coquetel: "🍸",
                      "bebida tropical": "🍹",
                      cerveja: "🍺",
                      "canecas de cerveja": "🍻",
                      "taças brindando": "🥂",
                      copo: "🥃",
                      "líquido a verter": "🫗",
                      "copo com canudo": "🥤",
                      "chá perolado": "🧋",
                      "suco de caixa": "🧃",
                      mate: "🧉",
                      "cubo de gelo": "🧊",
                      hashi: "🥢",
                      "prato com talheres": "🍽",
                      "garfo e faca": "🍴",
                      colher: "🥄",
                      "faca de cozinha": "🔪",
                      jarro: "🫙",
                      ânfora: "🏺",
                    },
                    Atividades: {
                      "abóbora de halloween": "🎃",
                      "árvore de natal": "🎄",
                      "fogos de artifício": "🎆",
                      "vela estrela": "🎇",
                      bombinha: "🧨",
                      brilhos: "✨",
                      balão: "🎈",
                      "cone de festa": "🎉",
                      confete: "🎊",
                      "árvore de tanabata": "🎋",
                      "decoração de pinhos": "🎍",
                      "bonecas japonesas": "🎎",
                      "bandeira de carpas": "🎏",
                      "carrilhão de vento": "🎐",
                      "contemplação da lua": "🎑",
                      "envelope vermelho": "🧧",
                      presente: "🎁",
                      "ingresso de cinema": "🎟",
                      ingresso: "🎫",
                      "medalha militar": "🎖",
                      troféu: "🏆",
                      "medalha esportiva": "🏅",
                      "medalha de ouro": "🥇",
                      "medalha de prata": "🥈",
                      "medalha de bronze": "🥉",
                      "bola de futebol": "⚽",
                      "bola de beisebol": "⚾",
                      softbol: "🥎",
                      "bola de basquete": "🏀",
                      "bola de vôlei": "🏐",
                      "bola de futebol americano": "🏈",
                      "bola de rugby": "🏉",
                      tênis: "🎾",
                      frisbee: "🥏",
                      boliche: "🎳",
                      críquete: "🏏",
                      "hóquei de campo": "🏑",
                      "hóquei no gelo": "🏒",
                      lacrosse: "🥍",
                      "pingue pongue": "🏓",
                      badminton: "🏸",
                      "luva de boxe": "🥊",
                      "quimono de artes marciais": "🥋",
                      gol: "🥅",
                      "bandeira no buraco": "⛳",
                      "patins de gelo": "⛸",
                      pesca: "🎣",
                      "máscara de mergulho": "🤿",
                      "camiseta de corrida": "🎽",
                      esqui: "🎿",
                      trenó: "🛷",
                      "pedra de curling": "🥌",
                      "no alvo": "🎯",
                      ioiô: "🪀",
                      pipa: "🪁",
                      "pistola d água": "🔫",
                      bilhar: "🎱",
                      "bola de cristal": "🔮",
                      "varinha mágica": "🪄",
                      videogame: "🎮",
                      joystick: "🕹",
                      "caça níquel": "🎰",
                      "jogo de dado": "🎲",
                      "quebra cabeça": "🧩",
                      pinhata: "🪅",
                      "bola espelhada": "🪩",
                      "boneca russa": "🪆",
                      "peão de xadrez": "♟",
                      curinga: "🃏",
                      "dragão vermelho de mahjong": "🀄",
                      "carta de flores": "🎴",
                      máscara: "🎭",
                      "quadro emoldurado": "🖼",
                      "paleta de tintas": "🎨",
                      "naipe de espadas": "♠",
                      "naipe de copas": "♥",
                      "naipe de ouros": "♦",
                      "naipe de paus": "♣",
                    },
                    "Viagens e Locais": {
                      "globo mostrando europa e áfrica": "🌍",
                      "globo mostrando as américas": "🌎",
                      "globo mostrando ásia e oceania": "🌏",
                      "globo com meridianos": "🌐",
                      "mapa múndi": "🗺",
                      "mapa do japão": "🗾",
                      bússola: "🧭",
                      "montanha com neve": "🏔",
                      montanha: "⛰",
                      vulcão: "🌋",
                      "monte fuji": "🗻",
                      acampamento: "🏕",
                      "praia e guarda sol": "🏖",
                      deserto: "🏜",
                      "ilha deserta": "🏝",
                      "parque nacional": "🏞",
                      estádio: "🏟",
                      "prédio grego": "🏛",
                      construção: "🏗",
                      tijolo: "🧱",
                      cabana: "🛖",
                      casas: "🏘",
                      "casa abandonada": "🏚",
                      casa: "🏠",
                      "casa com jardim": "🏡",
                      "edifício comercial": "🏢",
                      "correio japonês": "🏣",
                      correio: "🏤",
                      hospital: "🏥",
                      banco: "🏦",
                      hotel: "🏨",
                      motel: "🏩",
                      "loja de conveniência": "🏪",
                      escola: "🏫",
                      "loja de departamentos": "🏬",
                      fábrica: "🏭",
                      "castelo japonês": "🏯",
                      castelo: "🏰",
                      "capela de casamento": "💒",
                      "torre de tóquio": "🗼",
                      "estátua da liberdade": "🗽",
                      igreja: "⛪",
                      mesquita: "🕌",
                      "templo hindu": "🛕",
                      sinagoga: "🕍",
                      "santuário japonês": "⛩",
                      "caaba islã": "🕋",
                      fonte: "⛲",
                      barraca: "⛺",
                      enevoado: "🌁",
                      "noite estrelada": "🌃",
                      cidade: "🏙",
                      "aurora sobre montanhas": "🌄",
                      "aurora sobre água": "🌅",
                      "cidade ao anoitecer": "🌆",
                      "pôr do sol": "🌇",
                      "ponte à noite": "🌉",
                      chamas: "♨",
                      carrossel: "🎠",
                      "escorrega infantil": "🛝",
                      "roda gigante": "🎡",
                      "montanha russa": "🎢",
                      barbearia: "💈",
                      circo: "🎪",
                      locomotiva: "🚂",
                      "vagão de trem": "🚃",
                      "trem de alta velocidade": "🚄",
                      "trem de alta velocidade japonês": "🚅",
                      trem: "🚆",
                      metrô: "🚇",
                      "trem urbano": "🚈",
                      estação: "🚉",
                      "bonde elétrico": "🚊",
                      monotrilho: "🚝",
                      "estrada de ferro na montanha": "🚞",
                      bonde: "🚋",
                      ônibus: "🚌",
                      "ônibus se aproximando": "🚍",
                      trólebus: "🚎",
                      van: "🚐",
                      ambulância: "🚑",
                      "carro do corpo de bombeiros": "🚒",
                      "viatura policial": "🚓",
                      "viatura policial se aproximando": "🚔",
                      táxi: "🚕",
                      "táxi se aproximando": "🚖",
                      carro: "🚗",
                      "carro se aproximando": "🚘",
                      suv: "🚙",
                      caminhonete: "🛻",
                      "caminhão de entrega": "🚚",
                      caminhão: "🚛",
                      trator: "🚜",
                      "carro de corrida": "🏎",
                      motocicleta: "🏍",
                      scooter: "🛵",
                      "cadeira de rodas manual": "🦽",
                      "cadeira de rodas motorizada": "🦼",
                      "automóvel riquixá": "🛺",
                      bicicleta: "🚲",
                      patinete: "🛴",
                      skate: "🛹",
                      "patins de rodas": "🛼",
                      "ponto de ônibus": "🚏",
                      estrada: "🛣",
                      trilhos: "🛤",
                      "barril de óleo": "🛢",
                      "posto de gasolina": "⛽",
                      roda: "🛞",
                      sirene: "🚨",
                      "semáforo horizontal": "🚥",
                      "semáforo vertical": "🚦",
                      "sinal de pare": "🛑",
                      "em construção": "🚧",
                      âncora: "⚓",
                      "bóia em anel": "🛟",
                      "barco a vela": "⛵",
                      canoa: "🛶",
                      lancha: "🚤",
                      cruzeiro: "🛳",
                      balsa: "⛴",
                      barco: "🛥",
                      navio: "🚢",
                      avião: "✈",
                      "avião pequeno": "🛩",
                      "avião decolando": "🛫",
                      "avião aterrissando": "🛬",
                      paraquedas: "🪂",
                      assento: "💺",
                      helicóptero: "🚁",
                      "estrada de ferro suspensa": "🚟",
                      "cabo suspenso usado em teleféricos nas montanhas": "🚠",
                      teleférico: "🚡",
                      satélite: "🛰",
                      foguete: "🚀",
                      "disco voador": "🛸",
                      moai: "🗿",
                    },
                    Objetos: {
                      sineta: "🛎",
                      mala: "🧳",
                      ampulheta: "⌛",
                      "ampulheta contando o tempo": "⏳",
                      "relógio de pulso": "⌚",
                      despertador: "⏰",
                      cronômetro: "⏱",
                      "relógio temporizador": "⏲",
                      "relógio de mesa": "🕰",
                      "12 horas": "🕛",
                      "doze e meia": "🕧",
                      "1 hora": "🕐",
                      "uma e meia": "🕜",
                      "2 horas": "🕑",
                      "duas e meia": "🕝",
                      "3 horas": "🕒",
                      "três e meia": "🕞",
                      "4 horas": "🕓",
                      "quatro e meia": "🕟",
                      "5 horas": "🕔",
                      "cinco e meia": "🕠",
                      "6 horas": "🕕",
                      "seis e meia": "🕡",
                      "7 horas": "🕖",
                      "sete e meia": "🕢",
                      "8 horas": "🕗",
                      "oito e meia": "🕣",
                      "9 horas": "🕘",
                      "nove e meia": "🕤",
                      "10 horas": "🕙",
                      "dez e meia": "🕥",
                      "11 horas": "🕚",
                      "onze e meia": "🕦",
                      termômetro: "🌡",
                      "laço de fita": "🎀",
                      "fita de lembrete": "🎗",
                      "ursinho de pelúcia": "🧸",
                      carretel: "🧵",
                      "agulha de costura": "🪡",
                      novelo: "🧶",
                      nó: "🪢",
                      óculos: "👓",
                      "óculos escuros": "🕶",
                      "óculos de proteção": "🥽",
                      jaleco: "🥼",
                      "colete salva vidas": "🦺",
                      gravata: "👔",
                      camiseta: "👕",
                      jeans: "👖",
                      cachecol: "🧣",
                      luvas: "🧤",
                      casaco: "🧥",
                      meias: "🧦",
                      vestido: "👗",
                      quimono: "👘",
                      sari: "🥻",
                      maiô: "🩱",
                      cueca: "🩲",
                      shorts: "🩳",
                      biquíni: "👙",
                      "roupas femininas": "👚",
                      "pássaro preto": "🪭",
                      bolsinha: "👛",
                      "bolsa de mão": "👜",
                      "bolsa pequena": "👝",
                      "sacolas de compras": "🛍",
                      mochila: "🎒",
                      chinelo: "🩴",
                      "sapato masculino": "👞",
                      "tênis de corrida": "👟",
                      "bota de trekking": "🥾",
                      sapatilha: "🥿",
                      "sapato de salto alto": "👠",
                      "sandália feminina": "👡",
                      "sapatilha de balé": "🩰",
                      "bota feminina": "👢",
                      "pinça de cabelo": "🪮",
                      coroa: "👑",
                      "chapéu feminino": "👒",
                      cartola: "🎩",
                      "chapéu de formatura": "🎓",
                      boné: "🧢",
                      "capacete militar": "🪖",
                      "capacacete de socorrista": "⛑",
                      "rosário de oração": "📿",
                      batom: "💄",
                      anel: "💍",
                      "pedra preciosa": "💎",
                      "alto falante silenciado": "🔇",
                      "alto falante com volume baixo": "🔈",
                      "alto falante com volume médio": "🔉",
                      "alto falante com volume alto": "🔊",
                      buzina: "📢",
                      megafone: "📣",
                      "corneta postal": "📯",
                      sino: "🔔",
                      "sino silenciado": "🔕",
                      "partitura musical": "🎼",
                      "nota musical": "🎵",
                      "notas musicais": "🎶",
                      "microfone de estúdio": "🎙",
                      "controle de volume": "🎚",
                      "botões giratórios": "🎛",
                      microfone: "🎤",
                      "fones de ouvido": "🎧",
                      rádio: "📻",
                      saxofone: "🎷",
                      acordeão: "🪗",
                      guitarra: "🎸",
                      "teclado musical": "🎹",
                      trompete: "🎺",
                      violino: "🎻",
                      banjo: "🪕",
                      tambor: "🥁",
                      "tambor comprido": "🪘",
                      maracas: "🪇",
                      flauta: "🪈",
                      "telefone celular": "📱",
                      "telefone celular com seta": "📲",
                      "telefone no gancho": "☎",
                      telefone: "📞",
                      pager: "📟",
                      fax: "📠",
                      pilha: "🔋",
                      "bateria fraca": "🪫",
                      "tomada elétrica": "🔌",
                      laptop: "💻",
                      "computador de mesa": "🖥",
                      impressora: "🖨",
                      teclado: "⌨",
                      mouse: "🖱",
                      trackball: "🖲",
                      minidisc: "💽",
                      disquete: "💾",
                      cd: "💿",
                      dvd: "📀",
                      ábaco: "🧮",
                      "câmera de cinema": "🎥",
                      "rolo de filmes": "🎞",
                      "projetor de filmes": "📽",
                      claquete: "🎬",
                      televisão: "📺",
                      câmera: "📷",
                      "câmera com flash": "📸",
                      "câmera de vídeo": "📹",
                      videocassete: "📼",
                      "lupa para a esquerda": "🔍",
                      "lupa para a direita": "🔎",
                      vela: "🕯",
                      lâmpada: "💡",
                      lanterna: "🔦",
                      "lanterna vermelha de papel": "🏮",
                      "lâmpada de óleo": "🪔",
                      "caderno decorado": "📔",
                      "livro fechado": "📕",
                      "livro aberto": "📖",
                      "livro verde": "📗",
                      "livro azul": "📘",
                      "livro laranja": "📙",
                      livros: "📚",
                      caderno: "📓",
                      "livro contábil": "📒",
                      "página dobrada": "📃",
                      pergaminho: "📜",
                      "página voltada para cima": "📄",
                      jornal: "📰",
                      "jornal enrolado": "🗞",
                      "marcadores de página": "📑",
                      "marcador de página": "🔖",
                      etiqueta: "🏷",
                      "saco de dinheiro": "💰",
                      moeda: "🪙",
                      "nota de iene": "💴",
                      "nota de dólar": "💵",
                      "nota de euro": "💶",
                      "nota de libra": "💷",
                      "dinheiro voando": "💸",
                      "cartão de crédito": "💳",
                      recibo: "🧾",
                      "gráfico subindo com iene": "💹",
                      envelope: "✉",
                      "e mail": "📧",
                      "envelope chegando": "📨",
                      "envelope com seta": "📩",
                      "bandeja de saída": "📤",
                      "bandeja de entrada": "📥",
                      pacote: "📦",
                      "caixa de correio fechada com bandeira levantada": "📫",
                      "caixa de correio fechada com bandeira abaixada": "📪",
                      "caixa de correio aberta com bandeira levantada": "📬",
                      "caixa de correio aberta com bandeira abaixada": "📭",
                      "caixa de correio": "📮",
                      "urna eleitoral com cédula": "🗳",
                      lápis: "✏",
                      "ponta de caneta tinteiro": "✒",
                      "caneta tinteiro": "🖋",
                      caneta: "🖊",
                      pincel: "🖌",
                      "giz de cera": "🖍",
                      memorando: "📝",
                      maleta: "💼",
                      "pasta de arquivos": "📁",
                      "pasta de arquivos aberta": "📂",
                      "divisores de pastas": "🗂",
                      calendário: "📅",
                      "calendário com folhas destacáveis": "📆",
                      "bloco espiral": "🗒",
                      "calendário espiral": "🗓",
                      "índice de cartões": "📇",
                      "gráfico subindo": "📈",
                      "gráfico caindo": "📉",
                      "gráfico de barras": "📊",
                      prancheta: "📋",
                      tacha: "📌",
                      "tacha redonda": "📍",
                      "clipe de papel": "📎",
                      "clipes de papel conectados": "🖇",
                      "régua reta": "📏",
                      "régua triangular": "📐",
                      tesoura: "✂",
                      "caixa de arquivos": "🗃",
                      "gavetas de escritório": "🗄",
                      lixeira: "🗑",
                      cadeado: "🔒",
                      "cadeado aberto": "🔓",
                      "cadeado com caneta": "🔏",
                      "cadeado fechado com chave": "🔐",
                      chave: "🔑",
                      "chave antiga": "🗝",
                      martelo: "🔨",
                      machado: "🪓",
                      picareta: "⛏",
                      "martelo e picareta": "⚒",
                      "martelo e chave inglesa": "🛠",
                      adaga: "🗡",
                      "espadas cruzadas": "⚔",
                      bomba: "💣",
                      bumerangue: "🪃",
                      "arco e flecha": "🏹",
                      escudo: "🛡",
                      serrote: "🪚",
                      "chave inglesa": "🔧",
                      "chave de fenda": "🪛",
                      "porca e parafuso": "🔩",
                      engrenagem: "⚙",
                      braçadeira: "🗜",
                      balança: "⚖",
                      "bengala para cegos": "🦯",
                      link: "🔗",
                      correntes: "⛓",
                      gancho: "🪝",
                      "caixa de ferramentas": "🧰",
                      ímã: "🧲",
                      escada: "🪜",
                      alambique: "⚗",
                      "tubo de ensaio": "🧪",
                      "placa de petri": "🧫",
                      microscópio: "🔬",
                      telescópio: "🔭",
                      "antena parabólica": "📡",
                      seringa: "💉",
                      comprimido: "💊",
                      "atadura adesiva": "🩹",
                      muleta: "🩼",
                      estetoscópio: "🩺",
                      "raio x": "🩻",
                      porta: "🚪",
                      espelho: "🪞",
                      janela: "🪟",
                      cama: "🛏",
                      "sofá e luminária": "🛋",
                      cadeira: "🪑",
                      "vaso sanitário": "🚽",
                      desentupidor: "🪠",
                      chuveiro: "🚿",
                      banheira: "🛁",
                      ratoeira: "🪤",
                      lâmina: "🪒",
                      "frasco de loção": "🧴",
                      "alfinete de segurança": "🧷",
                      vassoura: "🧹",
                      cesta: "🧺",
                      "rolo de papel": "🧻",
                      balde: "🪣",
                      sabonete: "🧼",
                      bolhas: "🫧",
                      "escova de dentes": "🪥",
                      esponja: "🧽",
                      "extintor de incêndio": "🧯",
                      "carrinho de compras": "🛒",
                      cigarro: "🚬",
                      caixão: "⚰",
                      lápide: "🪦",
                      "urna funerária": "⚱",
                      "olho grego": "🧿",
                      "mão hamsá": "🪬",
                      placa: "🪧",
                      "cartão de identificação": "🪪",
                    },
                    Símbolos: {
                      "carta de amor": "💌",
                      "coração com flecha": "💘",
                      "coração com fita": "💝",
                      "coração brilhante": "💖",
                      "coração crescendo": "💗",
                      "coração pulsante": "💓",
                      "corações girando": "💞",
                      "dois corações": "💕",
                      "coração decorativo": "💟",
                      "exclamação de coração": "❣",
                      "coração partido": "💔",
                      "coração em chamas": "❤",
                      "coração remendado": "❤",
                      "coração vermelho": "❤",
                      "coração cor de rosa": "🩷",
                      "coração laranja": "🧡",
                      "coração amarelo": "💛",
                      "coração verde": "💚",
                      "coração azul": "💙",
                      "coração azul claro": "🩵",
                      "coração roxo": "💜",
                      "coração marrom": "🤎",
                      "coração preto": "🖤",
                      "coração cinzento": "🩶",
                      "coração branco": "🤍",
                      "marca de beijo": "💋",
                      "cem pontos": "💯",
                      "símbolo de raiva": "💢",
                      colisão: "💥",
                      zonzo: "💫",
                      "pingos de suor": "💦",
                      rapidez: "💨",
                      buraco: "🕳",
                      "balão de diálogo": "💬",
                      "olho no balão de diálogo": "👁",
                      "balão de diálogo à esquerda": "🗨",
                      "balão de raiva à direita": "🗯",
                      "balão de pensamento": "💭",
                      zzz: "💤",
                      elevador: "🛗",
                      "símbolo de caixa automático": "🏧",
                      "símbolo de lixeira": "🚮",
                      "água potável": "🚰",
                      "símbolo de cadeira de rodas": "♿",
                      "banheiro masculino": "🚹",
                      "banheiro feminino": "🚺",
                      banheiro: "🚻",
                      "símbolo de bebê": "🚼",
                      wc: "🚾",
                      "controle de passaportes": "🛂",
                      alfândega: "🛃",
                      "restituição de bagagem": "🛄",
                      "depósito de bagagem": "🛅",
                      aviso: "⚠",
                      "crianças atravessando": "🚸",
                      "entrada proibida": "⛔",
                      proibido: "🚫",
                      "proibido andar de bicicleta": "🚳",
                      "proibido fumar": "🚭",
                      "proibido jogar lixo no chão": "🚯",
                      "água não potável": "🚱",
                      "proibida a passagem de pedestres": "🚷",
                      "proibido o uso de telefone celular": "📵",
                      "proibido para menores de 18 anos": "🔞",
                      radioativo: "☢",
                      "setas verticais no sentido horário": "🔃",
                      "botão de setas em sentido anti horário": "🔄",
                      "seta back": "🔙",
                      "seta end": "🔚",
                      "seta on": "🔛",
                      "seta soon": "🔜",
                      "seta top": "🔝",
                      "local de culto": "🛐",
                      menorá: "🕎",
                      "estrela de seis pontas": "🔯",
                      "símbolo khanda": "🪯",
                      "signo de áries": "♈",
                      "signo de touro": "♉",
                      "signo de gêmeos": "♊",
                      "signo de câncer": "♋",
                      "signo de leão": "♌",
                      "signo de virgem": "♍",
                      "signo de libra": "♎",
                      "signo de escorpião": "♏",
                      "signo de sagitário": "♐",
                      "signo de capricórnio": "♑",
                      "signo de aquário": "♒",
                      "signo de peixes": "♓",
                      "signo de ofiúco": "⛎",
                      "botão de músicas aleatórias": "🔀",
                      "botão de repetir": "🔁",
                      "botão de repetir uma única faixa": "🔂",
                      "botão reproduzir": "▶",
                      "botão avançar": "⏩",
                      "botão de próxima faixa": "⏭",
                      "botão de reproduzir ou pausar": "⏯",
                      "botão de retroceder": "⏪",
                      "botão de faixa anterior": "⏮",
                      "botão apontando para cima": "🔼",
                      "botão de avanço para cima": "⏫",
                      "botão apontando para baixo": "🔽",
                      "botão de avanço para baixo": "⏬",
                      "botão pausar": "⏸",
                      "botão parar": "⏹",
                      "botão gravar": "⏺",
                      cinema: "🎦",
                      "botão de diminuir brilho": "🔅",
                      "botão de aumentar brilho": "🔆",
                      "barras de sinal": "📶",
                      "sem fios": "🛜",
                      "modo vibratório": "📳",
                      "telefone celular desligado": "📴",
                      "símbolo de adição": "➕",
                      "símbolo de subtração": "➖",
                      "símbolo de divisão": "➗",
                      "sinal de igual a negrito": "🟰",
                      "ponto de interrogação vermelho": "❓",
                      "ponto de interrogação branco": "❔",
                      "ponto de exclamação branco": "❕",
                      "ponto de exclamação vermelho": "❗",
                      "câmbio de moeda": "💱",
                      cifrão: "💲",
                      "emblema de tridente": "🔱",
                      crachá: "📛",
                      "símbolo japonês de principiante": "🔰",
                      "círculo grande oco": "⭕",
                      "marca de seleção branca": "✅",
                      xis: "❌",
                      "botão de xis": "❎",
                      "laço encaracolado": "➰",
                      "loop encaracolado duas vezes": "➿",
                      "keycap 10": "🔟",
                      "letras latinas maiúsculas": "🔠",
                      "letras latinas minúsculas": "🔡",
                      números: "🔢",
                      símbolos: "🔣",
                      "letras latinas": "🔤",
                      "botão a tipo sanguíneo": "🅰",
                      "botão ab tipo sanguíneo": "🆎",
                      "botão b tipo sanguíneo": "🅱",
                      "botão cl": "🆑",
                      "botão cool": "🆒",
                      "botão free": "🆓",
                      "botão id": "🆔",
                      "botão new": "🆕",
                      "botão ng": "🆖",
                      "botão o tipo sanguíneo": "🅾",
                      "botão ok": "🆗",
                      "botão p": "🅿",
                      "botão sos": "🆘",
                      "botão up": "🆙",
                      "botão vs": "🆚",
                      "botão japonês de aqui": "🈁",
                      "botão japonês de não gratuito": "🈶",
                      "botão japonês de reservado": "🈯",
                      "botão japonês de barganha": "🉐",
                      "botão japonês de desconto": "🈹",
                      "botão japonês de gratuito": "🈚",
                      "botão japonês de proibido": "🈲",
                      "botão japonês de aceitável": "🉑",
                      "botão japonês de aplicação": "🈸",
                      "botão japonês de nota mínima": "🈴",
                      "botão japonês de vago": "🈳",
                      "botão japonês de parabéns": "㊗",
                      "botão japonês de segredo": "㊙",
                      "botão japonês de aberto para negócios": "🈺",
                      "botão japonês de sem vagas": "🈵",
                      "círculo vermelho": "🔴",
                      "círculo laranja": "🟠",
                      "círculo amarelo": "🟡",
                      "círculo verde": "🟢",
                      "círculo azul": "🔵",
                      "círculo roxo": "🟣",
                      "círculo marrom": "🟤",
                      "círculo preto": "⚫",
                      "círculo branco": "⚪",
                      "quadrado vermelho": "🟥",
                      "quadrado laranja": "🟧",
                      "quadrado amarelo": "🟨",
                      "quadrado verde": "🟩",
                      "quadrado azul": "🟦",
                      "quadrado roxo": "🟪",
                      "quadrado marrom": "🟫",
                      "quadrado preto grande": "⬛",
                      "quadrado branco grande": "⬜",
                      "quadrado preto médio menor": "◾",
                      "quadrado branco médio menor": "◽",
                      "losango laranja grande": "🔶",
                      "losango azul grande": "🔷",
                      "losango laranja pequeno": "🔸",
                      "losango azul pequeno": "🔹",
                      "triângulo vermelho para cima": "🔺",
                      "triângulo vermelho para baixo": "🔻",
                      "diamante com um ponto": "💠",
                      "botão de opção": "🔘",
                      "botão quadrado branco": "🔳",
                      "botão quadrado preto": "🔲",
                    },
                  })
                    if (tb().hasOwnProperty(n)) {
                      for (
                        var r = tb()[n], a = {}, s = 0, i = Object.entries(r);
                        s < i.length;
                        s++
                      ) {
                        var c = ob(i[s], 2),
                          l = c[0],
                          u = c[1];
                        r.hasOwnProperty(l) &&
                          l.toLowerCase().includes(t) &&
                          (a[l] = u);
                      }
                      Object.values(a).length > 0 && (o[n] = a);
                    }
                  return o;
                })(r.value);
              }),
              s = function (e) {
                e.stopPropagation(),
                  o.value || (r.value = ""),
                  (o.value = !o.value);
              },
              i = function (e) {
                !n.value ||
                  n.value.contains(e.target) ||
                  e.target.matches(".dropdown-button") ||
                  (o.value = !1);
              };
            return (
              Qa(
                function () {
                  return t.chatInput;
                },
                function () {
                  o.value = !1;
                }
              ),
              mr(function () {
                document.addEventListener("click", i);
              }),
              yr(function () {
                document.removeEventListener("click", i);
              }),
              function (e, i) {
                return (
                  As(),
                  Ps(
                    "div",
                    {
                      class: "relative",
                      style: Y({
                        "--main": Zt(t).tagBgColor(Zt(t).active),
                        "--mainText": Zt(t).tagTextColor(Zt(t).active),
                      }),
                      onClick: s,
                    },
                    [
                      Fs(
                        "button",
                        {
                          ref: "button",
                          class: Z([
                            "bg-black/50 w-11 h-11 min-w-11 min-h-11 flex items-center justify-center rounded transition-colors",
                            [
                              o.value
                                ? Zt(t).grayscale &&
                                  !Zt(t).theme.hasOwnProperty(Zt(t).active)
                                  ? "bg-white text-black"
                                  : "bg-main text-mainText"
                                : "text-white/50 hover:text-white/80",
                            ],
                          ]),
                        },
                        [zs(Zt(eb), { class: "w-4 h-4" })],
                        2
                      ),
                      Fs(
                        "div",
                        {
                          class: Z([
                            "absolute left-0 mt-2 w-56 max-h-64 origin-top-left rounded bg-black/50 flex flex-col items-stretch transition-all",
                            [
                              o.value
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0 pointer-events-none",
                            ],
                          ]),
                          ref_key: "dropdownMenu",
                          ref: n,
                          onClick:
                            i[1] || (i[1] = fl(function () {}, ["stop"])),
                        },
                        [
                          Fs("div", rb, [
                            tn(
                              Fs(
                                "input",
                                {
                                  type: "text",
                                  class:
                                    "w-full bg-black/50 rounded h-8 px-2 text-sm placeholder:text-white/50",
                                  "onUpdate:modelValue":
                                    i[0] ||
                                    (i[0] = function (e) {
                                      return (r.value = e);
                                    }),
                                  placeholder: "Pesquisar...",
                                },
                                null,
                                512
                              ),
                              [[tl, r.value]]
                            ),
                          ]),
                          Fs(
                            "div",
                            {
                              class: Z([
                                "flex-1 overflow-hidden overflow-y-auto space-y-2 p-3 mt-14",
                                [
                                  Zt(t).grayscale &&
                                  !Zt(t).theme.hasOwnProperty(Zt(t).active)
                                    ? "scrollbar-custom-grayscale"
                                    : "scrollbar-custom",
                                ],
                              ]),
                            },
                            [
                              Object.values(a.value).length <= 0
                                ? (As(),
                                  Ps("div", ab, " Nenhum emoji encontrado "))
                                : (As(!0),
                                  Ps(
                                    Ss,
                                    { key: 1 },
                                    jr(a.value, function (e, o) {
                                      return (
                                        As(),
                                        Ps("div", { key: o }, [
                                          Fs("div", sb, me(o), 1),
                                          Fs("div", ib, [
                                            (As(!0),
                                            Ps(
                                              Ss,
                                              null,
                                              jr(e, function (e, o) {
                                                return (
                                                  As(),
                                                  Ps(
                                                    "button",
                                                    {
                                                      key: o,
                                                      class:
                                                        "flex items-center justify-center rounded aspect-square hover:bg-black/50",
                                                      onClick: function (o) {
                                                        !(function (e) {
                                                          (t.chatMessage += e),
                                                            t.chatInput.focus();
                                                        })(e),
                                                          s(o);
                                                      },
                                                    },
                                                    me(e),
                                                    9,
                                                    cb
                                                  )
                                                );
                                              }),
                                              128
                                            )),
                                          ]),
                                        ])
                                      );
                                    }),
                                    128
                                  )),
                            ],
                            2
                          ),
                        ],
                        2
                      ),
                    ],
                    4
                  )
                );
              }
            );
          },
        };
        var ub = {
          width: "34",
          height: "34",
          viewBox: "0 0 34 34",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        };
        const db = {},
          pb = (0, Zg.A)(db, [
            [
              "render",
              function (e, t) {
                return (
                  As(),
                  Ps(
                    "svg",
                    ub,
                    t[0] ||
                      (t[0] = [
                        Fs(
                          "path",
                          {
                            d: "M16.9993 9.35001C16.462 9.35001 16.0279 9.77733 16.0279 10.3063V10.88C13.8118 11.3223 12.1422 13.2527 12.1422 15.5656V16.1274C12.1422 17.5319 11.617 18.8886 10.6699 19.9405L10.4453 20.1885C10.1903 20.4694 10.1295 20.8728 10.2844 21.2165C10.4392 21.5601 10.7883 21.7813 11.1708 21.7813H22.8278C23.2103 21.7813 23.5563 21.5601 23.7142 21.2165C23.872 20.8728 23.8083 20.4694 23.5533 20.1885L23.3287 19.9405C22.3815 18.8886 21.8564 17.5349 21.8564 16.1274V15.5656C21.8564 13.2527 20.1867 11.3223 17.9707 10.88V10.3063C17.9707 9.77733 17.5366 9.35001 16.9993 9.35001ZM18.3744 24.0912C18.7387 23.7326 18.9421 23.2455 18.9421 22.7375H16.9993H15.0564C15.0564 23.2455 15.2598 23.7326 15.6241 24.0912C15.9884 24.4498 16.4832 24.65 16.9993 24.65C17.5153 24.65 18.0102 24.4498 18.3744 24.0912Z",
                            fill: "currentColor",
                          },
                          null,
                          -1
                        ),
                      ])
                  )
                );
              },
            ],
          ]);
        var hb = {
          width: "34",
          height: "34",
          viewBox: "0 0 34 34",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        };
        const fb = {},
          mb = (0, Zg.A)(fb, [
            [
              "render",
              function (e, t) {
                return (
                  As(),
                  Ps(
                    "svg",
                    hb,
                    t[0] ||
                      (t[0] = [
                        Fs(
                          "path",
                          {
                            d: "M8.78375 9.50248C8.47988 9.25745 8.03868 9.31422 7.79908 9.625C7.55949 9.93579 7.615 10.387 7.91888 10.6321L25.2164 24.4977C25.5203 24.7427 25.9615 24.6859 26.201 24.3752C26.4406 24.0644 26.3851 23.6131 26.0813 23.3681L23.5246 21.3181C23.5392 21.2673 23.5451 21.2136 23.5451 21.1568C23.5451 20.332 23.2237 19.5401 22.6539 18.9544L22.6101 18.9126C22.0111 18.3 21.6751 17.4692 21.6751 16.6026V15.5657C21.6751 13.2528 20.068 11.3223 17.9351 10.8801V10.3063C17.9351 9.77741 17.5172 9.35008 17.0001 9.35008C16.4829 9.35008 16.0651 9.77741 16.0651 10.3063V10.8801C14.8203 11.1371 13.7568 11.9021 13.0848 12.951L8.78375 9.50248ZM12.3251 16.6026C12.3251 17.4692 11.9891 18.3 11.3901 18.9126L11.3462 18.9574C10.7765 19.5401 10.4551 20.332 10.4551 21.1598C10.4551 21.5034 10.7268 21.7813 11.0628 21.7813H19.5187L12.3251 15.9871V16.6056V16.6026ZM18.8701 22.7376H17.0001H15.1301C15.1301 23.2456 15.3258 23.7327 15.6765 24.0913C16.0271 24.4499 16.5033 24.6501 17.0001 24.6501C17.4968 24.6501 17.9731 24.4499 18.3237 24.0913C18.6743 23.7327 18.8701 23.2456 18.8701 22.7376Z",
                            fill: "currentColor",
                          },
                          null,
                          -1
                        ),
                      ])
                  )
                );
              },
            ],
          ]);
        var gb = {
            class: "absolute z-10 top-6 left-6 w-[27rem] transition-all",
          },
          bb = { class: "relative flex-1" },
          vb = ["onClick"];
        const yb = {
          __name: "index",
          setup: function (e) {
            var t = qg(),
              o = (function (e) {
                const t = zt(e),
                  o = {};
                for (const n in t) {
                  const r = t[n];
                  r.effect
                    ? (o[n] = Ti({
                        get: () => e[n],
                        set(t) {
                          e[n] = t;
                        },
                      }))
                    : (Wt(r) || Dt(r)) && (o[n] = io(e, n));
                }
                return o;
              })(t),
              n = o.chatMessage,
              r = o.chatInput;
            var a = function () {
                setTimeout(function () {
                  r.value.scrollLeft = r.value.scrollWidth;
                }, 0);
              },
              s = function (e) {
                "ArrowUp" === e.key &&
                  t.commands.length > 0 &&
                  t.indexCommand > 0 &&
                  (t.indexCommand--,
                  (n.value = t.commands[t.indexCommand]),
                  n.value &&
                    n.value.length > 0 &&
                    setTimeout(function () {
                      return r.value.setSelectionRange(
                        n.value.length,
                        n.value.length
                      );
                    }, 0)),
                  "ArrowDown" === e.key &&
                    t.commands.length > 0 &&
                    t.indexCommand < t.commands.length &&
                    (t.indexCommand++,
                    (n.value = t.commands[t.indexCommand]),
                    n.value &&
                      n.value.length > 0 &&
                      setTimeout(function () {
                        return r.value.setSelectionRange(
                          n.value.length,
                          n.value.length
                        );
                      }, 0));
              },
              i = function () {
                t.setNotifications(!t.notifications);
              };
            return (
              mr(function () {
                t.getNotifications(), r.value.focus();
              }),
              function (e, o) {
                return (
                  As(),
                  Ps("div", gb, [
                    Fs(
                      "div",
                      {
                        class: Z([
                          "w-full h-80 transition-opacity relative",
                          {
                            "opacity-0 pointer-events-none": !Zt(t).messageBox,
                          },
                        ]),
                      },
                      [
                        (As(!0),
                        Ps(
                          Ss,
                          null,
                          jr(Zt(t).tags, function (e, o) {
                            return (
                              As(),
                              Ls(
                                Zt(Xg),
                                {
                                  key: o,
                                  messages: Zt(t).tagMessages(e),
                                  tag: e,
                                  class: Z([
                                    Zt(t).active == e
                                      ? "!opacity-100"
                                      : "pointer-events-none",
                                  ]),
                                },
                                null,
                                8,
                                ["messages", "tag", "class"]
                              )
                            );
                          }),
                          128
                        )),
                      ],
                      2
                    ),
                    Fs(
                      "div",
                      {
                        class: Z([
                          "w-full pl-2 mt-4 flex items-stretch gap-1.5 relative transition-opacity",
                          { "opacity-0 pointer-events-none": !Zt(t).display },
                        ]),
                      },
                      [
                        Fs("div", bb, [
                          tn(
                            Fs(
                              "input",
                              {
                                ref_key: "chatInput",
                                ref: r,
                                type: "text",
                                placeholder: "DIGITE SUA MENSAGEM AQUI...",
                                "onUpdate:modelValue":
                                  o[0] ||
                                  (o[0] = function (e) {
                                    return Wt(n) ? (n.value = e) : null;
                                  }),
                                class:
                                  "w-full bg-black/50 rounded placeholder:text-white/50 text-sm placeholder:text-xs placeholder:tracking-widest h-11 pl-4 pr-11",
                                onKeypress:
                                  o[1] ||
                                  (o[1] = gl(
                                    function () {
                                      var e;
                                      return (
                                        Zt(t).submit &&
                                        (e = Zt(t)).submit.apply(e, arguments)
                                      );
                                    },
                                    ["enter"]
                                  )),
                                onKeydown: s,
                                onBlur: a,
                                onFocus: a,
                                maxlength: "200",
                              },
                              null,
                              544
                            ),
                            [[tl, Zt(n)]]
                          ),
                          Fs(
                            "button",
                            {
                              class:
                                "absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer",
                              onClick: i,
                            },
                            [
                              Zt(t).notifications
                                ? Ks("", !0)
                                : (As(),
                                  Ls(Zt(mb), {
                                    key: 0,
                                    class:
                                      "w-9 h-9 opacity-25 hover:opacity-50 transition-opacity",
                                  })),
                              Zt(t).notifications
                                ? (As(),
                                  Ls(Zt(pb), {
                                    key: 1,
                                    class:
                                      "w-9 h-9 hover:opacity-80 transition-opacity",
                                  }))
                                : Ks("", !0),
                            ]
                          ),
                        ]),
                        zs(Zt(lb)),
                      ],
                      2
                    ),
                    Fs(
                      "div",
                      {
                        class: Z([
                          "w-full pl-2 mt-1.5 flex items-center flex-wrap gap-1.5 transition-opacity",
                          { "opacity-0 pointer-events-none": !Zt(t).display },
                        ]),
                      },
                      [
                        (As(!0),
                        Ps(
                          Ss,
                          null,
                          jr(Zt(t).tags, function (e, o) {
                            return (
                              As(),
                              Ps(
                                "button",
                                {
                                  key: o,
                                  class: Z([
                                    "text-xs py-1 px-2 rounded transition-all uppercase tracking-widest",
                                    [
                                      e === Zt(t).active
                                        ? "pointer-events-none " +
                                          (Zt(t).grayscale &&
                                          !Zt(t).theme.hasOwnProperty(e)
                                            ? "bg-white text-black"
                                            : "bg-main text-mainText")
                                        : "bg-black/50 " +
                                          (Zt(t).grayscale &&
                                          !Zt(t).theme.hasOwnProperty(e)
                                            ? "hover:bg-white hover:text-black"
                                            : "hover:bg-main hover:text-mainText"),
                                    ],
                                  ]),
                                  style: Y({
                                    "--main": Zt(t).tagBgColor(e),
                                    "--text": Zt(t).tagTextColor(e),
                                  }),
                                  onClick: function (o) {
                                    return (function (e) {
                                      e != t.active &&
                                        ((t.active = e), r.value.focus());
                                    })(e);
                                  },
                                },
                                me(e),
                                15,
                                vb
                              )
                            );
                          }),
                          128
                        )),
                      ],
                      2
                    ),
                  ])
                );
              }
            );
          },
        };
        function _b(e) {
          var t = Object(e),
            o = [];
          for (var n in t) o.unshift(n);
          return function e() {
            for (; o.length; )
              if ((n = o.pop()) in t) return (e.value = n), (e.done = !1), e;
            return (e.done = !0), e;
          };
        }
        function xb() {
          var e,
            t,
            o = "function" == typeof Symbol ? Symbol : {},
            n = o.iterator || "@@iterator",
            r = o.toStringTag || "@@toStringTag";
          function a(o, n, r, a) {
            var c = n && n.prototype instanceof i ? n : i,
              l = Object.create(c.prototype);
            return (
              Sb(
                l,
                "_invoke",
                (function (o, n, r) {
                  var a,
                    i,
                    c,
                    l = 0,
                    u = r || [],
                    d = !1,
                    p = {
                      p: 0,
                      n: 0,
                      v: e,
                      a: h,
                      f: h.bind(e, 4),
                      d: function (t, o) {
                        return (a = t), (i = 0), (c = e), (p.n = o), s;
                      },
                    };
                  function h(o, n) {
                    for (
                      i = o, c = n, t = 0;
                      !d && l && !r && t < u.length;
                      t++
                    ) {
                      var r,
                        a = u[t],
                        h = p.p,
                        f = a[2];
                      o > 3
                        ? (r = f === n) &&
                          ((c = a[(i = a[4]) ? 5 : ((i = 3), 3)]),
                          (a[4] = a[5] = e))
                        : a[0] <= h &&
                          ((r = o < 2 && h < a[1])
                            ? ((i = 0), (p.v = n), (p.n = a[1]))
                            : h < f &&
                              (r = o < 3 || a[0] > n || n > f) &&
                              ((a[4] = o), (a[5] = n), (p.n = f), (i = 0)));
                    }
                    if (r || o > 1) return s;
                    throw ((d = !0), n);
                  }
                  return function (r, u, f) {
                    if (l > 1) throw TypeError("Generator is already running");
                    for (
                      d && 1 === u && h(u, f), i = u, c = f;
                      (t = i < 2 ? e : c) || !d;

                    ) {
                      a ||
                        (i
                          ? i < 3
                            ? (i > 1 && (p.n = -1), h(i, c))
                            : (p.n = c)
                          : (p.v = c));
                      try {
                        if (((l = 2), a)) {
                          if ((i || (r = "next"), (t = a[r]))) {
                            if (!(t = t.call(a, c)))
                              throw TypeError(
                                "iterator result is not an object"
                              );
                            if (!t.done) return t;
                            (c = t.value), i < 2 && (i = 0);
                          } else
                            1 === i && (t = a.return) && t.call(a),
                              i < 2 &&
                                ((c = TypeError(
                                  "The iterator does not provide a '" +
                                    r +
                                    "' method"
                                )),
                                (i = 1));
                          a = e;
                        } else if ((t = (d = p.n < 0) ? c : o.call(n, p)) !== s)
                          break;
                      } catch (t) {
                        (a = e), (i = 1), (c = t);
                      } finally {
                        l = 1;
                      }
                    }
                    return { value: t, done: d };
                  };
                })(o, r, a),
                !0
              ),
              l
            );
          }
          var s = {};
          function i() {}
          function c() {}
          function l() {}
          t = Object.getPrototypeOf;
          var u = [][n]
              ? t(t([][n]()))
              : (Sb((t = {}), n, function () {
                  return this;
                }),
                t),
            d = (l.prototype = i.prototype = Object.create(u));
          function p(e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, l)
                : ((e.__proto__ = l), Sb(e, r, "GeneratorFunction")),
              (e.prototype = Object.create(d)),
              e
            );
          }
          return (
            (c.prototype = l),
            Sb(d, "constructor", l),
            Sb(l, "constructor", c),
            (c.displayName = "GeneratorFunction"),
            Sb(l, r, "GeneratorFunction"),
            Sb(d),
            Sb(d, r, "Generator"),
            Sb(d, n, function () {
              return this;
            }),
            Sb(d, "toString", function () {
              return "[object Generator]";
            }),
            (xb = function () {
              return { w: a, m: p };
            })()
          );
        }
        function Sb(e, t, o, n) {
          var r = Object.defineProperty;
          try {
            r({}, "", {});
          } catch (e) {
            r = 0;
          }
          (Sb = function (e, t, o, n) {
            if (t)
              r
                ? r(e, t, {
                    value: o,
                    enumerable: !n,
                    configurable: !n,
                    writable: !n,
                  })
                : (e[t] = o);
            else {
              var a = function (t, o) {
                Sb(e, t, function (e) {
                  return this._invoke(t, o, e);
                });
              };
              a("next", 0), a("throw", 1), a("return", 2);
            }
          }),
            Sb(e, t, o, n);
        }
        function wb(e, t, o, n, r, a, s) {
          try {
            var i = e[a](s),
              c = i.value;
          } catch (e) {
            return void o(e);
          }
          i.done ? t(c) : Promise.resolve(c).then(n, r);
        }
        function Eb() {
          var e;
          return (
            (e = xb().m(function e(t) {
              var o,
                n,
                r,
                a,
                s,
                i,
                c,
                l,
                u,
                d,
                p,
                h,
                f,
                m,
                g,
                b,
                v,
                y,
                _,
                x,
                S,
                w,
                E;
              return xb().w(function (e) {
                for (;;)
                  switch (e.n) {
                    case 0:
                      return (
                        (o = af),
                        (n = sf),
                        (r = cf),
                        (a = lf),
                        (e.n = 1),
                        Mg("Theme", {}, "chat")
                      );
                    case 1:
                      if ((s = e.v)) {
                        e.n = 2;
                        break;
                      }
                      return e.a(2);
                    case 2:
                      (i = n(18, 4, 2)),
                        (c = n(31, 6, 3)),
                        (l =
                          "function" == typeof GetParentResourceName
                            ? GetParentResourceName()
                            : "nui-fallback"),
                        (u = function (e, t) {
                          return t.reduce(function (e, t) {
                            return e && void 0 !== e[t] ? e[t] : void 0;
                          }, e);
                        }),
                        (d = function (e, t, o) {
                          if (
                            e.variable &&
                            "string" == typeof e.variable &&
                            void 0 !== o
                          ) {
                            var n = e.store || qg,
                              r = "function" == typeof n ? n() : null;
                            r
                              ? (r[e.variable] = o)
                              : console.warn(
                                  "Store inválida fornecida para '".concat(
                                    t,
                                    "'"
                                  )
                                );
                          }
                        }),
                        (w = _b(t));
                    case 3:
                      if ((E = w()).done) {
                        e.n = 6;
                        break;
                      }
                      if (
                        ((p = E.value),
                        (f = t[p]),
                        (m = p.split("-")),
                        (g = u(s, m)),
                        f.rgb &&
                          null !== (h = s.scripts) &&
                          void 0 !== h &&
                          null !== (h = h[l]) &&
                          void 0 !== h &&
                          h[m[0]] &&
                          "string" == typeof (b = u(s.scripts[l], m)) &&
                          (g = b),
                        d(f, p, g),
                        "string" != typeof g)
                      ) {
                        e.n = 5;
                        break;
                      }
                      if ((v = o(g))) {
                        e.n = 4;
                        break;
                      }
                      return e.a(3, 3);
                    case 4:
                      (y = n(v.r, v.g, v.b)),
                        f.rgb &&
                          document.documentElement.style.setProperty(
                            "--".concat(p),
                            "".concat(v.r, " ").concat(v.g, " ").concat(v.b)
                          ),
                        f.fromTo &&
                          ((_ = r(y.h, 0 === y.s ? y.s : i.s, i.l)),
                          (x = r(y.h, 0 === y.s ? y.s : c.s, c.l)),
                          document.documentElement.style.setProperty(
                            "--from",
                            "".concat(_.r, " ").concat(_.g, " ").concat(_.b)
                          ),
                          document.documentElement.style.setProperty(
                            "--to",
                            "".concat(x.r, " ").concat(x.g, " ").concat(x.b)
                          )),
                        f.grayscaleCheck && 0 === y.s && (qg().grayscale = !0),
                        f.hover &&
                          (S = a(v.r, v.g, v.b, 20)) &&
                          document.documentElement.style.setProperty(
                            "--".concat(p, "Hover"),
                            "".concat(S.r, " ").concat(S.g, " ").concat(S.b)
                          );
                    case 5:
                      e.n = 3;
                      break;
                    case 6:
                      return e.a(2);
                  }
              }, e);
            })),
            (Eb = function () {
              var t = this,
                o = arguments;
              return new Promise(function (n, r) {
                var a = e.apply(t, o);
                function s(e) {
                  wb(a, n, r, s, i, "next", e);
                }
                function i(e) {
                  wb(a, n, r, s, i, "throw", e);
                }
                s(void 0);
              });
            }),
            Eb.apply(this, arguments)
          );
        }
        function Cb(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return Ab(e);
            })(e) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(e) ||
            kb(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function Tb(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var o =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != o) {
                var n,
                  r,
                  a,
                  s,
                  i = [],
                  c = !0,
                  l = !1;
                try {
                  if (((a = (o = o.call(e)).next), 0 === t)) {
                    if (Object(o) !== o) return;
                    c = !1;
                  } else
                    for (
                      ;
                      !(c = (n = a.call(o)).done) &&
                      (i.push(n.value), i.length !== t);
                      c = !0
                    );
                } catch (e) {
                  (l = !0), (r = e);
                } finally {
                  try {
                    if (
                      !c &&
                      null != o.return &&
                      ((s = o.return()), Object(s) !== s)
                    )
                      return;
                  } finally {
                    if (l) throw r;
                  }
                }
                return i;
              }
            })(e, t) ||
            kb(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function kb(e, t) {
          if (e) {
            if ("string" == typeof e) return Ab(e, t);
            var o = {}.toString.call(e).slice(8, -1);
            return (
              "Object" === o && e.constructor && (o = e.constructor.name),
              "Map" === o || "Set" === o
                ? Array.from(e)
                : "Arguments" === o ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                ? Ab(e, t)
                : void 0
            );
          }
        }
        function Ab(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var o = 0, n = Array(t); o < t; o++) n[o] = e[o];
          return n;
        }
        var Ob = { class: "flex items-center justify-center h-full" };
        var Rb = El({
            __name: "App",
            setup: function (e) {
              var t,
                o,
                n = qg();
              return (
                Qh("Chat", function (e) {
                  n.inTimeout && clearTimeout(n.fnTimeout);
                  var t = Tb(e, 2),
                    o = t[0],
                    r = t[1];
                  (n.tags = ["GERAL", "OOC"].concat(Cb(o))),
                    (n.block = r),
                    (n.active = n.active ? n.active : n.tags[0]),
                    (n.display = !0),
                    (n.messageBox = !0),
                    n.reset(),
                    n.chatInput.focus();
                }),
                Qh("Message", function (e) {
                  var t = Tb(e, 3),
                    o = t[0],
                    r = t[1],
                    a = t[2];
                  n.addChatMessage(o, r, a);
                }),
                Qh("ShowMe", function (e) {
                  var t = Tb(e, 6),
                    o = t[0],
                    r = t[1],
                    a = t[2],
                    s = t[3],
                    i = t[4],
                    c = t[5];
                  n.me.find(function (e) {
                    return e.id === o;
                  }) ||
                    n.me.push({
                      id: o,
                      author: r,
                      message: a,
                      clean: c,
                      position: { x: s, y: i },
                    });
                }),
                Qh("UpdateMe", function (e) {
                  var t = Tb(e, 4),
                    o = t[0],
                    r = t[1],
                    a = t[2],
                    s = t[3],
                    i = n.me.find(function (e) {
                      return e.id === o;
                    });
                  i &&
                    ((i.message = r), (i.position.x = a), (i.position.y = s));
                }),
                Qh("RemoveMe", function (e) {
                  var t = n.me.findIndex(function (t) {
                    return t.id === e;
                  });
                  -1 !== t && n.me.splice(t, 1);
                }),
                (t = "Escape"),
                (o = function () {
                  n.display && n.close();
                }),
                ef.has(t) || ef.set(t, []),
                ef.get(t).push(o),
                tf || (window.addEventListener("keydown", of), (tf = !0)),
                yr(function () {
                  var e = ef.get(t);
                  if (e) {
                    var n = e.indexOf(o);
                    -1 !== n && e.splice(n, 1),
                      0 === e.length && ef.delete(t),
                      0 === ef.size &&
                        (window.removeEventListener("keydown", of), (tf = !1));
                  }
                }),
                mr(function () {
                  !(function (e) {
                    Eb.apply(this, arguments);
                  })({
                    main: {
                      rgb: !0,
                      fromTo: !0,
                      hover: !0,
                      grayscaleCheck: !0,
                    },
                    mainText: { rgb: !0 },
                    chat: { variable: "colors" },
                  });
                }),
                function (e, t) {
                  return As(), Ps("div", Ob, [zs(Zt($g)), zs(Zt(yb))]);
                }
              );
            },
          }),
          Nb = (function () {
            const e = xe(!0),
              t = e.run(() => Yt({}));
            let o = [],
              n = [];
            const r = $t({
              install(e) {
                Ch(r),
                  (r._a = e),
                  e.provide(Th, r),
                  (e.config.globalProperties.$pinia = r),
                  n.forEach((e) => o.push(e)),
                  (n = []);
              },
              use(e) {
                return this._a ? o.push(e) : n.push(e), this;
              },
              _p: o,
              _a: null,
              _e: e,
              _s: new Map(),
              state: t,
            });
            return r;
          })(),
          jb = {
            beforeMount: function (e, t) {
              (e.clickOutsideEvent = function (o) {
                e == o.target || e.contains(o.target) || t.value();
              }),
                document.addEventListener("click", e.clickOutsideEvent);
            },
            unmounted: function (e) {
              document.removeEventListener("click", e.clickOutsideEvent);
            },
          };
        Rb.directive("click-outside", jb).use(Nb).mount("#app");
      },
    },
    o = {};
  function n(e) {
    var r = o[e];
    if (void 0 !== r) return r.exports;
    var a = (o[e] = { exports: {} });
    return t[e](a, a.exports, n), a.exports;
  }
  (n.m = t),
    (e = []),
    (n.O = (t, o, r, a) => {
      if (!o) {
        var s = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [o, r, a] = e[u], i = !0, c = 0; c < o.length; c++)
            (!1 & a || s >= a) && Object.keys(n.O).every((e) => n.O[e](o[c]))
              ? o.splice(c--, 1)
              : ((i = !1), a < s && (s = a));
          if (i) {
            e.splice(u--, 1);
            var l = r();
            void 0 !== l && (t = l);
          }
        }
        return t;
      }
      a = a || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > a; u--) e[u] = e[u - 1];
      e[u] = [o, r, a];
    }),
    (n.d = (e, t) => {
      for (var o in t)
        n.o(t, o) &&
          !n.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      var e = { 392: 0, 997: 0 };
      n.O.j = (t) => 0 === e[t];
      var t = (t, o) => {
          var r,
            a,
            [s, i, c] = o,
            l = 0;
          if (s.some((t) => 0 !== e[t])) {
            for (r in i) n.o(i, r) && (n.m[r] = i[r]);
            if (c) var u = c(n);
          }
          for (t && t(o); l < s.length; l++)
            (a = s[l]), n.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
          return n.O(u);
        },
        o = (self.webpackChunkfiivem_vue_boilerplate =
          self.webpackChunkfiivem_vue_boilerplate || []);
      o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o)));
    })(),
    n.O(void 0, [997], () => n(807));
  var r = n.O(void 0, [997], () => n(291));
  r = n.O(r);
})();
