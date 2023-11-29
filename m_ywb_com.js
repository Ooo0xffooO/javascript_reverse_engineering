var window = this;
var navigator = {};

var utils = function (n,e) {
    var i = void 0 !== e ? e : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}
        , r = []
        , a = []
        , o = "undefined" != typeof Uint8Array ? Uint8Array : Array
        , s = !1;

    function l() {
        s = !0;
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = 0, n = t.length; e < n; ++e)
            r[e] = t[e],
                a[t.charCodeAt(e)] = e;
        a["-".charCodeAt(0)] = 62,
            a["_".charCodeAt(0)] = 63
    }

    function u(t) {
        var e;
        s || l();
        for (var n = t.length, i = n % 3, a = "", o = [], u = 0, c = n - i; u < c; u += 16383)
            o.push(function (t, e, n) {
                for (var i, a = [], o = u; o < n; o += 3)
                    i = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2],
                        a.push(r[(i = i) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
                return a.join("")
            }(t, 0, c < u + 16383 ? c : u + 16383));
        return 1 == i ? (e = t[n - 1],
            a = (a += r[e >> 2]) + r[e << 4 & 63] + "==") : 2 == i && (e = (t[n - 2] << 8) + t[n - 1],
            a = (a = (a += r[e >> 10]) + r[e >> 4 & 63]) + r[e << 2 & 63] + "="),
            o.push(a),
            o.join("")
    }

    function c(t, e, n, i, r) {
        var a, o, s = 8 * r - i - 1, l = (1 << s) - 1, u = l >> 1, c = -7, f = n ? r - 1 : 0,
            d = n ? -1 : 1;
        r = t[e + f];
        for (f += d,
                 a = r & (1 << -c) - 1,
                 r >>= -c,
                 c += s; 0 < c; a = 256 * a + t[e + f],
                 f += d,
                 c -= 8)
            ;
        for (o = a & (1 << -c) - 1,
                 a >>= -c,
                 c += i; 0 < c; o = 256 * o + t[e + f],
                 f += d,
                 c -= 8)
            ;
        if (0 === a)
            a = 1 - u;
        else {
            if (a === l)
                return o ? NaN : 1 / 0 * (r ? -1 : 1);
            o += Math.pow(2, i),
                a -= u
        }
        return (r ? -1 : 1) * o * Math.pow(2, a - i)
    }

    function f(t, e, n, i, r, a) {
        var o, s, l = 8 * a - r - 1, u = (1 << l) - 1, c = u >> 1,
            f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = i ? 0 : a - 1, h = i ? 1 : -1;
        a = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e),
                 isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0,
                     o = u) : (o = Math.floor(Math.log(e) / Math.LN2),
                 e * (i = Math.pow(2, -o)) < 1 && (o--,
                     i *= 2),
                 2 <= (e += 1 <= o + c ? f / i : f * Math.pow(2, 1 - c)) * i && (o++,
                     i /= 2),
                     u <= o + c ? (s = 0,
                         o = u) : 1 <= o + c ? (s = (e * i - 1) * Math.pow(2, r),
                         o += c) : (s = e * Math.pow(2, c - 1) * Math.pow(2, r),
                         o = 0)); 8 <= r; t[n + d] = 255 & s,
                 d += h,
                 s /= 256,
                 r -= 8)
            ;
        for (o = o << r | s,
                 l += r; 0 < l; t[n + d] = 255 & o,
                 d += h,
                 o /= 256,
                 l -= 8)
            ;
        t[n + d - h] |= 128 * a
    }

    var d = {}.toString
        , h = Array.isArray || function (t) {
        return "[object Array]" == d.call(t)
    }
        , p = (g.TYPED_ARRAY_SUPPORT = void 0 === i.TYPED_ARRAY_SUPPORT || i.TYPED_ARRAY_SUPPORT,
        m());

    function m() {
        return g.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }

    function b(t, e) {
        if (m() < e)
            throw new RangeError("Invalid typed array length");
        return g.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = g.prototype : (t = null === t ? new g(e) : t).length = e,
            t
    }

    function g(t, e, n) {
        if (!(g.TYPED_ARRAY_SUPPORT || this instanceof g))
            return new g(t, e, n);
        if ("number" != typeof t)
            return v(this, t, e, n);
        if ("string" == typeof e)
            throw new Error("If encoding is specified then the first argument must be a string");
        return w(this, t)
    }

    function v(t, e, n, i) {
        if ("number" == typeof e)
            throw new TypeError('"value" argument must not be a number');
        if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer) {
            var r = t
                , a = e
                , o = n;
            if (a.byteLength,
            o < 0 || a.byteLength < o)
                throw new RangeError("'offset' is out of bounds");
            if (a.byteLength < o + (i || 0))
                throw new RangeError("'length' is out of bounds");
            return a = void 0 === o && void 0 === i ? new Uint8Array(a) : void 0 === i ? new Uint8Array(a, o) : new Uint8Array(a, o, i),
                g.TYPED_ARRAY_SUPPORT ? (r = a).__proto__ = g.prototype : r = _(r, a),
                r
        }
        if ("string" == typeof e) {
            if (o = t,
                i = e,
                a = n,
                !g.isEncoding(a = "string" == typeof a && "" !== a ? a : "utf8"))
                throw new TypeError('"encoding" must be a valid string encoding');
            return (i = (o = b(o, r = 0 | k(i, a))).write(i, a)) !== r ? o.slice(0, i) : o
        }
        var s;
        n = t;
        if (S(i = e))
            return 0 !== (n = b(n, s = 0 | M(i.length))).length && i.copy(n, 0, 0, s),
                n;
        if (i) {
            if ("undefined" != typeof ArrayBuffer && i.buffer instanceof ArrayBuffer || "length" in i)
                return "number" != typeof i.length || (s = i.length) != s ? b(n, 0) : _(n, i);
            if ("Buffer" === i.type && h(i.data))
                return _(n, i.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }

    function y(t) {
        if ("number" != typeof t)
            throw new TypeError('"size" argument must be a number');
        if (t < 0)
            throw new RangeError('"size" argument must not be negative')
    }

    function w(t, e) {
        if (y(e),
            t = b(t, e < 0 ? 0 : 0 | M(e)),
            !g.TYPED_ARRAY_SUPPORT)
            for (var n = 0; n < e; ++n)
                t[n] = 0;
        return t
    }

    function _(t, e) {
        var n = e.length < 0 ? 0 : 0 | M(e.length);
        t = b(t, n);
        for (var i = 0; i < n; i += 1)
            t[i] = 255 & e[i];
        return t
    }

    function M(t) {
        if (t >= m())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + m().toString(16) + " bytes");
        return 0 | t
    }

    function S(t) {
        return null != t && t._isBuffer
    }

    function k(t, e) {
        if (S(t))
            return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
            return t.byteLength;
        var n = (t = "string" != typeof t ? "" + t : t).length;
        if (0 === n)
            return 0;
        for (var i = !1; ;)
            switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return n;
                case "utf8":
                case "utf-8":
                case void 0:
                    return F(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return U(t).length;
                default:
                    if (i)
                        return F(t).length;
                    e = ("" + e).toLowerCase(),
                        i = !0
            }
    }

    function E(t, e, n) {
        var i = t[e];
        t[e] = t[n],
            t[n] = i
    }

    function A(t, e, n, i, r) {
        if (0 === t.length)
            return -1;
        if ("string" == typeof n ? (i = n,
            n = 0) : 2147483647 < n ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
            n = +n,
        (n = (n = isNaN(n) ? r ? 0 : t.length - 1 : n) < 0 ? t.length + n : n) >= t.length) {
            if (r)
                return -1;
            n = t.length - 1
        } else if (n < 0) {
            if (!r)
                return -1;
            n = 0
        }
        if (S(e = "string" == typeof e ? g.from(e, i) : e))
            return 0 === e.length ? -1 : C(t, e, n, i, r);
        if ("number" == typeof e)
            return e &= 255,
                g.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (r ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(t, e, n) : C(t, [e], n, i, r);
        throw new TypeError("val must be string, number or Buffer")
    }

    function C(t, e, n, i, r) {
        var a = 1
            , o = t.length
            , s = e.length;
        if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
            if (t.length < 2 || e.length < 2)
                return -1;
            o /= a = 2,
                s /= 2,
                n /= 2
        }

        function l(t, e) {
            return 1 === a ? t[e] : t.readUInt16BE(e * a)
        }

        if (r)
            for (var u = -1, c = n; c < o; c++)
                if (l(t, c) === l(e, -1 === u ? 0 : c - u)) {
                    if (c - (u = -1 === u ? c : u) + 1 === s)
                        return u * a
                } else
                    -1 !== u && (c -= c - u),
                        u = -1;
        else
            for (c = n = o < n + s ? o - s : n; 0 <= c; c--) {
                for (var f = !0, d = 0; d < s; d++)
                    if (l(t, c + d) !== l(e, d)) {
                        f = !1;
                        break
                    }
                if (f)
                    return c
            }
        return -1
    }

    function R(t, e, n, i) {
        return V(function (t) {
            for (var e = [], n = 0; n < t.length; ++n)
                e.push(255 & t.charCodeAt(n));
            return e
        }(e), t, n, i)
    }

    function I(t, e, n) {
        n = Math.min(t.length, n);
        for (var i = [], r = e; r < n;) {
            var a, o, s, l, u = t[r], c = null, f = 239 < u ? 4 : 223 < u ? 3 : 191 < u ? 2 : 1;
            if (r + f <= n)
                switch (f) {
                    case 1:
                        u < 128 && (c = u);
                        break;
                    case 2:
                        128 == (192 & (a = t[r + 1])) && 127 < (l = (31 & u) << 6 | 63 & a) && (c = l);
                        break;
                    case 3:
                        a = t[r + 1],
                            o = t[r + 2],
                        128 == (192 & a) && 128 == (192 & o) && 2047 < (l = (15 & u) << 12 | (63 & a) << 6 | 63 & o) && (l < 55296 || 57343 < l) && (c = l);
                        break;
                    case 4:
                        a = t[r + 1],
                            o = t[r + 2],
                            s = t[r + 3],
                        128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && 65535 < (l = (15 & u) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) && l < 1114112 && (c = l)
                }
            null === c ? (c = 65533,
                f = 1) : 65535 < c && (c -= 65536,
                i.push(c >>> 10 & 1023 | 55296),
                c = 56320 | 1023 & c),
                i.push(c),
                r += f
        }
        var d = i
            , h = d.length;
        if (h <= N)
            return String.fromCharCode.apply(String, d);
        for (var p = "", m = 0; m < h;)
            p += String.fromCharCode.apply(String, d.slice(m, m += N));
        return p
    }

    g.poolSize = 8192,
        g._augment = function (t) {
            return t.__proto__ = g.prototype,
                t
        }
        ,
        g.from = function (t, e, n) {
            return v(null, t, e, n)
        }
        ,
    g.TYPED_ARRAY_SUPPORT && (g.prototype.__proto__ = Uint8Array.prototype,
        g.__proto__ = Uint8Array),
        g.alloc = function (t, e, n) {
            return e = e,
                n = n,
                y(t = t),
                t <= 0 || void 0 === e ? b(null, t) : "string" == typeof n ? b(null, t).fill(e, n) : b(null, t).fill(e)
        }
        ,
        g.allocUnsafe = function (t) {
            return w(null, t)
        }
        ,
        g.allocUnsafeSlow = function (t) {
            return w(null, t)
        }
        ,
        g.isBuffer = z,
        g.compare = function (t, e) {
            if (!S(t) || !S(e))
                throw new TypeError("Arguments must be Buffers");
            if (t === e)
                return 0;
            for (var n = t.length, i = e.length, r = 0, a = Math.min(n, i); r < a; ++r)
                if (t[r] !== e[r]) {
                    n = t[r],
                        i = e[r];
                    break
                }
            return n < i ? -1 : i < n ? 1 : 0
        }
        ,
        g.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
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
                    return !1
            }
        }
        ,
        g.concat = function (t, e) {
            if (!h(t))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length)
                return g.alloc(0);
            if (void 0 === e)
                for (r = e = 0; r < t.length; ++r)
                    e += t[r].length;
            for (var n = g.allocUnsafe(e), i = 0, r = 0; r < t.length; ++r) {
                var a = t[r];
                if (!S(a))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(n, i),
                    i += a.length
            }
            return n
        }
        ,
        g.byteLength = k,
        g.prototype._isBuffer = !0,
        g.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2)
                E(this, e, e + 1);
            return this
        }
        ,
        g.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4)
                E(this, e, e + 3),
                    E(this, e + 1, e + 2);
            return this
        }
        ,
        g.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8)
                E(this, e, e + 7),
                    E(this, e + 1, e + 6),
                    E(this, e + 2, e + 5),
                    E(this, e + 3, e + 4);
            return this
        }
        ,
        g.prototype.toString = function () {
            var t = 0 | this.length;
            return 0 == t ? "" : 0 === arguments.length ? I(this, 0, t) : function (t, e, n) {
                var i, r = !1;
                if ((e = void 0 === e || e < 0 ? 0 : e) > this.length)
                    return "";
                if ((n = void 0 === n || n > this.length ? this.length : n) <= 0)
                    return "";
                if ((n >>>= 0) <= (e >>>= 0))
                    return "";
                for (t = t || "utf8"; ;)
                    switch (t) {
                        case "hex":
                            var a = e
                                , o = n
                                , s = this.length;
                            (!o || o < 0 || s < o) && (o = s);
                            for (var l = "", c = a = !a || a < 0 ? 0 : a; c < o; ++c)
                                l += function (t) {
                                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                                }(this[c]);
                            return l;
                        case "utf8":
                        case "utf-8":
                            return I(this, e, n);
                        case "ascii":
                            s = e;
                            var f = n
                                , d = "";
                            f = Math.min(this.length, f);
                            for (var h = s; h < f; ++h)
                                d += String.fromCharCode(127 & this[h]);
                            return d;
                        case "latin1":
                        case "binary":
                            a = e;
                            var p = n
                                , m = "";
                            p = Math.min(this.length, p);
                            for (var b = a; b < p; ++b)
                                m += String.fromCharCode(this[b]);
                            return m;
                        case "base64":
                            return g = this,
                                i = n,
                                0 === (v = e) && i === g.length ? u(g) : u(g.slice(v, i));
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            for (var g = e, v = n, y = this.slice(g, v), w = "", _ = 0; _ < y.length; _ += 2)
                                w += String.fromCharCode(y[_] + 256 * y[_ + 1]);
                            return w;
                        default:
                            if (r)
                                throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(),
                                r = !0
                    }
            }
                .apply(this, arguments)
        }
        ,
        g.prototype.equals = function (t) {
            if (S(t))
                return this === t || 0 === g.compare(this, t);
            throw new TypeError("Argument must be a Buffer")
        }
        ,
        g.prototype.inspect = function () {
            var t = "";
            return 0 < this.length && (t = this.toString("hex", 0, 50).match(/.{2}/g).join(" "),
            50 < this.length && (t += " ... ")),
            "<Buffer " + t + ">"
        }
        ,
        g.prototype.compare = function (t, e, n, i, r) {
            if (!S(t))
                throw new TypeError("Argument must be a Buffer");
            if (void 0 === n && (n = t ? t.length : 0),
            void 0 === i && (i = 0),
            void 0 === r && (r = this.length),
            (e = void 0 === e ? 0 : e) < 0 || n > t.length || i < 0 || r > this.length)
                throw new RangeError("out of range index");
            if (r <= i && n <= e)
                return 0;
            if (r <= i)
                return -1;
            if (n <= e)
                return 1;
            if (this === t)
                return 0;
            for (var a = (r >>>= 0) - (i >>>= 0), o = (n >>>= 0) - (e >>>= 0), s = Math.min(a, o), l = this.slice(i, r), u = t.slice(e, n), c = 0; c < s; ++c)
                if (l[c] !== u[c]) {
                    a = l[c],
                        o = u[c];
                    break
                }
            return a < o ? -1 : o < a ? 1 : 0
        }
        ,
        g.prototype.includes = function (t, e, n) {
            return -1 !== this.indexOf(t, e, n)
        }
        ,
        g.prototype.indexOf = function (t, e, n) {
            return A(this, t, e, n, !0)
        }
        ,
        g.prototype.lastIndexOf = function (t, e, n) {
            return A(this, t, e, n, !1)
        }
        ,
        g.prototype.write = function (t, e, n, i) {
            if (void 0 === e)
                i = "utf8",
                    n = this.length,
                    e = 0;
            else if (void 0 === n && "string" == typeof e)
                i = e,
                    n = this.length,
                    e = 0;
            else {
                if (!isFinite(e))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0,
                    isFinite(n) ? (n |= 0,
                    void 0 === i && (i = "utf8")) : (i = n,
                        n = void 0)
            }
            var r = this.length - e;
            if ((void 0 === n || r < n) && (n = r),
            0 < t.length && (n < 0 || e < 0) || e > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            for (var a, o, s, l, u, c = !1; ;)
                switch (i = i || "utf8") {
                    case "hex":
                        var f = t
                            , d = e
                            , h = n
                            , p = (d = Number(d) || 0,
                        this.length - d);
                        if ((!h || (h = Number(h)) > p) && (h = p),
                        (p = f.length) % 2 != 0)
                            throw new TypeError("Invalid hex string");
                        p / 2 < h && (h = p / 2);
                        for (var m = 0; m < h; ++m) {
                            var b = parseInt(f.substr(2 * m, 2), 16);
                            if (isNaN(b))
                                return m;
                            this[d + m] = b
                        }
                        return m;
                    case "utf8":
                    case "utf-8":
                        return p = e,
                            u = n,
                            V(F(t, (l = this).length - p), l, p, u);
                    case "ascii":
                        return R(this, t, e, n);
                    case "latin1":
                    case "binary":
                        return R(this, t, e, n);
                    case "base64":
                        return l = this,
                            u = e,
                            s = n,
                            V(U(t), l, u, s);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return s = e,
                            o = n,
                            V(function (t, e) {
                                for (var n, i, r = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
                                    i = (n = t.charCodeAt(a)) >> 8,
                                        r.push(n % 256),
                                        r.push(i);
                                return r
                            }(t, (a = this).length - s), a, s, o);
                    default:
                        if (c)
                            throw new TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase(),
                            c = !0
                }
        }
        ,
        g.prototype.toJSON = function () {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
    ;
    var N = 4096;

    function P(t, e, n) {
        if (t % 1 != 0 || t < 0)
            throw new RangeError("offset is not uint");
        if (n < t + e)
            throw new RangeError("Trying to access beyond buffer length")
    }

    function O(t, e, n, i, r, a) {
        if (!S(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
        if (r < e || e < a)
            throw new RangeError('"value" argument is out of bounds');
        if (n + i > t.length)
            throw new RangeError("Index out of range")
    }

    function x(t, e, n, i) {
        e < 0 && (e = 65535 + e + 1);
        for (var r = 0, a = Math.min(t.length - n, 2); r < a; ++r)
            t[n + r] = (e & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
    }

    function T(t, e, n, i) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var r = 0, a = Math.min(t.length - n, 4); r < a; ++r)
            t[n + r] = e >>> 8 * (i ? r : 3 - r) & 255
    }

    function B(t, e, n, i) {
        if (n + i > t.length)
            throw new RangeError("Index out of range");
        if (n < 0)
            throw new RangeError("Index out of range")
    }

    function L(t, e, n, i, r) {
        return r || B(t, 0, n, 4),
            f(t, e, n, i, 23, 4),
        n + 4
    }

    function D(t, e, n, i, r) {
        return r || B(t, 0, n, 8),
            f(t, e, n, i, 52, 8),
        n + 8
    }

    g.prototype.slice = function (t, e) {
        var n = this.length;
        if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n),
            (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n),
        e < t && (e = t),
            g.TYPED_ARRAY_SUPPORT)
            (r = this.subarray(t, e)).__proto__ = g.prototype;
        else
            for (var i = e - t, r = new g(i, void 0), a = 0; a < i; ++a)
                r[a] = this[a + t];
        return r
    }
        ,
        g.prototype.readUIntLE = function (t, e, n) {
            t |= 0,
                e |= 0,
            n || P(t, e, this.length);
            for (var i = this[t], r = 1, a = 0; ++a < e && (r *= 256);)
                i += this[t + a] * r;
            return i
        }
        ,
        g.prototype.readUIntBE = function (t, e, n) {
            t |= 0,
                e |= 0,
            n || P(t, e, this.length);
            for (var i = this[t + --e], r = 1; 0 < e && (r *= 256);)
                i += this[t + --e] * r;
            return i
        }
        ,
        g.prototype.readUInt8 = function (t, e) {
            return e || P(t, 1, this.length),
                this[t]
        }
        ,
        g.prototype.readUInt16LE = function (t, e) {
            return e || P(t, 2, this.length),
            this[t] | this[t + 1] << 8
        }
        ,
        g.prototype.readUInt16BE = function (t, e) {
            return e || P(t, 2, this.length),
            this[t] << 8 | this[t + 1]
        }
        ,
        g.prototype.readUInt32LE = function (t, e) {
            return e || P(t, 4, this.length),
            (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }
        ,
        g.prototype.readUInt32BE = function (t, e) {
            return e || P(t, 4, this.length),
            16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }
        ,
        g.prototype.readIntLE = function (t, e, n) {
            t |= 0,
                e |= 0,
            n || P(t, e, this.length);
            for (var i = this[t], r = 1, a = 0; ++a < e && (r *= 256);)
                i += this[t + a] * r;
            return i >= (r *= 128) && (i -= Math.pow(2, 8 * e)),
                i
        }
        ,
        g.prototype.readIntBE = function (t, e, n) {
            t |= 0,
                e |= 0,
            n || P(t, e, this.length);
            for (var i = e, r = 1, a = this[t + --i]; 0 < i && (r *= 256);)
                a += this[t + --i] * r;
            return a >= (r *= 128) && (a -= Math.pow(2, 8 * e)),
                a
        }
        ,
        g.prototype.readInt8 = function (t, e) {
            return e || P(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }
        ,
        g.prototype.readInt16LE = function (t, e) {
            return e || P(t, 2, this.length),
                32768 & (e = this[t] | this[t + 1] << 8) ? 4294901760 | e : e
        }
        ,
        g.prototype.readInt16BE = function (t, e) {
            return e || P(t, 2, this.length),
                32768 & (e = this[t + 1] | this[t] << 8) ? 4294901760 | e : e
        }
        ,
        g.prototype.readInt32LE = function (t, e) {
            return e || P(t, 4, this.length),
            this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }
        ,
        g.prototype.readInt32BE = function (t, e) {
            return e || P(t, 4, this.length),
            this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }
        ,
        g.prototype.readFloatLE = function (t, e) {
            return e || P(t, 4, this.length),
                c(this, t, !0, 23, 4)
        }
        ,
        g.prototype.readFloatBE = function (t, e) {
            return e || P(t, 4, this.length),
                c(this, t, !1, 23, 4)
        }
        ,
        g.prototype.readDoubleLE = function (t, e) {
            return e || P(t, 8, this.length),
                c(this, t, !0, 52, 8)
        }
        ,
        g.prototype.readDoubleBE = function (t, e) {
            return e || P(t, 8, this.length),
                c(this, t, !1, 52, 8)
        }
        ,
        g.prototype.writeUIntLE = function (t, e, n, i) {
            t = +t,
                e |= 0,
                n |= 0,
            i || O(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var r = 1
                , a = 0;
            for (this[e] = 255 & t; ++a < n && (r *= 256);)
                this[e + a] = t / r & 255;
            return e + n
        }
        ,
        g.prototype.writeUIntBE = function (t, e, n, i) {
            t = +t,
                e |= 0,
                n |= 0,
            i || O(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var r = n - 1
                , a = 1;
            for (this[e + r] = 255 & t; 0 <= --r && (a *= 256);)
                this[e + r] = t / a & 255;
            return e + n
        }
        ,
        g.prototype.writeUInt8 = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 1, 255, 0),
            g.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                this[e] = 255 & t,
            e + 1
        }
        ,
        g.prototype.writeUInt16LE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 2, 65535, 0),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                    this[e + 1] = t >>> 8) : x(this, t, e, !0),
            e + 2
        }
        ,
        g.prototype.writeUInt16BE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 2, 65535, 0),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                    this[e + 1] = 255 & t) : x(this, t, e, !1),
            e + 2
        }
        ,
        g.prototype.writeUInt32LE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 4, 4294967295, 0),
                g.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
                    this[e + 2] = t >>> 16,
                    this[e + 1] = t >>> 8,
                    this[e] = 255 & t) : T(this, t, e, !0),
            e + 4
        }
        ,
        g.prototype.writeUInt32BE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 4, 4294967295, 0),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                    this[e + 1] = t >>> 16,
                    this[e + 2] = t >>> 8,
                    this[e + 3] = 255 & t) : T(this, t, e, !1),
            e + 4
        }
        ,
        g.prototype.writeIntLE = function (t, e, n, i) {
            t = +t,
                e |= 0,
            i || O(this, t, e, n, (i = Math.pow(2, 8 * n - 1)) - 1, -i);
            var r = 0
                , a = 1
                , o = 0;
            for (this[e] = 255 & t; ++r < n && (a *= 256);)
                t < 0 && 0 === o && 0 !== this[e + r - 1] && (o = 1),
                    this[e + r] = (t / a >> 0) - o & 255;
            return e + n
        }
        ,
        g.prototype.writeIntBE = function (t, e, n, i) {
            t = +t,
                e |= 0,
            i || O(this, t, e, n, (i = Math.pow(2, 8 * n - 1)) - 1, -i);
            var r = n - 1
                , a = 1
                , o = 0;
            for (this[e + r] = 255 & t; 0 <= --r && (a *= 256);)
                t < 0 && 0 === o && 0 !== this[e + r + 1] && (o = 1),
                    this[e + r] = (t / a >> 0) - o & 255;
            return e + n
        }
        ,
        g.prototype.writeInt8 = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 1, 127, -128),
            g.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                this[e] = 255 & (t = t < 0 ? 255 + t + 1 : t),
            e + 1
        }
        ,
        g.prototype.writeInt16LE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 2, 32767, -32768),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                    this[e + 1] = t >>> 8) : x(this, t, e, !0),
            e + 2
        }
        ,
        g.prototype.writeInt16BE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 2, 32767, -32768),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                    this[e + 1] = 255 & t) : x(this, t, e, !1),
            e + 2
        }
        ,
        g.prototype.writeInt32LE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 4, 2147483647, -2147483648),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                    this[e + 1] = t >>> 8,
                    this[e + 2] = t >>> 16,
                    this[e + 3] = t >>> 24) : T(this, t, e, !0),
            e + 4
        }
        ,
        g.prototype.writeInt32BE = function (t, e, n) {
            return t = +t,
                e |= 0,
            n || O(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
                g.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                    this[e + 1] = t >>> 16,
                    this[e + 2] = t >>> 8,
                    this[e + 3] = 255 & t) : T(this, t, e, !1),
            e + 4
        }
        ,
        g.prototype.writeFloatLE = function (t, e, n) {
            return L(this, t, e, !0, n)
        }
        ,
        g.prototype.writeFloatBE = function (t, e, n) {
            return L(this, t, e, !1, n)
        }
        ,
        g.prototype.writeDoubleLE = function (t, e, n) {
            return D(this, t, e, !0, n)
        }
        ,
        g.prototype.writeDoubleBE = function (t, e, n) {
            return D(this, t, e, !1, n)
        }
        ,
        g.prototype.copy = function (t, e, n, i) {
            if (n = n || 0,
            i || 0 === i || (i = this.length),
            e >= t.length && (e = t.length),
            (i = 0 < i && i < n ? n : i) === n)
                return 0;
            if (0 === t.length || 0 === this.length)
                return 0;
            if ((e = e || 0) < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("sourceStart out of bounds");
            if (i < 0)
                throw new RangeError("sourceEnd out of bounds");
            i > this.length && (i = this.length);
            var r, a = (i = t.length - e < i - n ? t.length - e + n : i) - n;
            if (this === t && n < e && e < i)
                for (r = a - 1; 0 <= r; --r)
                    t[r + e] = this[r + n];
            else if (a < 1e3 || !g.TYPED_ARRAY_SUPPORT)
                for (r = 0; r < a; ++r)
                    t[r + e] = this[r + n];
            else
                Uint8Array.prototype.set.call(t, this.subarray(n, n + a), e);
            return a
        }
        ,
        g.prototype.fill = function (t, e, n, i) {
            if ("string" == typeof t) {
                var r;
                if ("string" == typeof e ? (i = e,
                    e = 0,
                    n = this.length) : "string" == typeof n && (i = n,
                    n = this.length),
                1 === t.length && (r = t.charCodeAt(0)) < 256 && (t = r),
                void 0 !== i && "string" != typeof i)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof i && !g.isEncoding(i))
                    throw new TypeError("Unknown encoding: " + i)
            } else
                "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= e)
                return this;
            if (e >>>= 0,
                n = void 0 === n ? this.length : n >>> 0,
            "number" == typeof (t = t || 0))
                for (s = e; s < n; ++s)
                    this[s] = t;
            else
                for (var a = S(t) ? t : F(new g(t, i).toString()), o = a.length, s = 0; s < n - e; ++s)
                    this[s + e] = a[s % o];
            return this
        }
    ;
    var q = /[^+\/0-9A-Za-z-_]/g;

    function F(t, e) {
        var n;
        e = e || 1 / 0;
        for (var i = t.length, r = null, a = [], o = 0; o < i; ++o) {
            if (55295 < (n = t.charCodeAt(o)) && n < 57344) {
                if (!r) {
                    if (56319 < n) {
                        -1 < (e -= 3) && a.push(239, 191, 189);
                        continue
                    }
                    if (o + 1 === i) {
                        -1 < (e -= 3) && a.push(239, 191, 189);
                        continue
                    }
                    r = n;
                    continue
                }
                if (n < 56320) {
                    -1 < (e -= 3) && a.push(239, 191, 189),
                        r = n;
                    continue
                }
                n = 65536 + (r - 55296 << 10 | n - 56320)
            } else
                r && -1 < (e -= 3) && a.push(239, 191, 189);
            if (r = null,
            n < 128) {
                if (--e < 0)
                    break;
                a.push(n)
            } else if (n < 2048) {
                if ((e -= 2) < 0)
                    break;
                a.push(n >> 6 | 192, 63 & n | 128)
            } else if (n < 65536) {
                if ((e -= 3) < 0)
                    break;
                a.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
            } else {
                if (!(n < 1114112))
                    throw new Error("Invalid code point");
                if ((e -= 4) < 0)
                    break;
                a.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
            }
        }
        return a
    }

    function U(t) {
        var e, n = function (t) {
            if ((t = ((e = t).trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(q, "")).length < 2)
                return "";
            for (var e; t.length % 4 != 0;)
                t += "=";
            return t
        }(t);
        if (s || l(),
        0 < (t = n.length) % 4)
            throw new Error("Invalid string. Length must be a multiple of 4");
        for (var i = "=" === n[t - 2] ? 2 : "=" === n[t - 1] ? 1 : 0, r = new o(3 * t / 4 - i), u = 0 < i ? t - 4 : t, c = 0, f = 0; f < u; f += 4)
            e = a[n.charCodeAt(f)] << 18 | a[n.charCodeAt(f + 1)] << 12 | a[n.charCodeAt(f + 2)] << 6 | a[n.charCodeAt(f + 3)],
                r[c++] = e >> 16 & 255,
                r[c++] = e >> 8 & 255,
                r[c++] = 255 & e;
        return 2 == i ? (e = a[n.charCodeAt(f)] << 2 | a[n.charCodeAt(f + 1)] >> 4,
            r[c++] = 255 & e) : 1 == i && (e = a[n.charCodeAt(f)] << 10 | a[n.charCodeAt(f + 1)] << 4 | a[n.charCodeAt(f + 2)] >> 2,
            r[c++] = e >> 8 & 255,
            r[c++] = 255 & e),
            r
    }

    function V(t, e, n, i) {
        for (var r = 0; r < i && !(r + n >= e.length || r >= t.length); ++r)
            e[r + n] = t[r];
        return r
    }

    function z(t) {
        return null != t && (!!t._isBuffer || j(t) || "function" == typeof (t = t).readFloatLE && "function" == typeof t.slice && j(t.slice(0, 0)))
    }

    function j(t) {
        return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
    }

    var Y = Object.freeze({
        __proto__: null,
        INSPECT_MAX_BYTES: 50,
        kMaxLength: p,
        Buffer: g,
        SlowBuffer: function (t) {
            return g.alloc(+(t = +t != t ? 0 : t))
        },
        isBuffer: z
    });
    const G = g.from([214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72])
        ,
        W = Uint32Array.from([462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257])
        , H = Uint32Array.from([2746333894, 1453994832, 1736282519, 2993693404]);

    class K {
        constructor(t) {
            let e, n = g.from(t.key, "hex");
            if (16 !== n.length)
                throw new Error("key should be 16 bytes");
            if (this.key = n,
            void 0 !== t.iv && null !== t.iv && 16 !== (e = g.from(t.iv, "hex")).length)
                throw new Error("iv should be 16 bytes");
            this.iv = e,
            0 <= [this.mode = "cbc", "ecb"].indexOf(t.mode) && (this.mode = t.mode),
                this.encryptRoundKeys = new Uint32Array(32),
                this.spawnEncryptRoundKeys(),
                this.decryptRoundKeys = Uint32Array.from(this.encryptRoundKeys),
                this.decryptRoundKeys.reverse(),
            0 <= ["none", this.paddingMode = "pkcs7"].indexOf(t.padding) && (this.paddingMode = t.padding)
        }

        doBlockCrypt(t, e) {
            let n = new Uint32Array(36);
            n.set(t, 0);
            for (let t = 0; t < 32; t++)
                n[t + 4] = n[t] ^ this.tTransform1(n[t + 1] ^ n[t + 2] ^ n[t + 3] ^ e[t]);
            let i = new Uint32Array(4);
            return i[0] = n[35],
                i[1] = n[34],
                i[2] = n[33],
                i[3] = n[32],
                i
        }

        spawnEncryptRoundKeys() {
            let t = new Uint32Array(4)
                , e = (t[0] = this.key[0] << 24 | this.key[1] << 16 | this.key[2] << 8 | this.key[3],
                t[1] = this.key[4] << 24 | this.key[5] << 16 | this.key[6] << 8 | this.key[7],
                t[2] = this.key[8] << 24 | this.key[9] << 16 | this.key[10] << 8 | this.key[11],
                t[3] = this.key[12] << 24 | this.key[13] << 16 | this.key[14] << 8 | this.key[15],
                new Uint32Array(36));
            e[0] = t[0] ^ H[0],
                e[1] = t[1] ^ H[1],
                e[2] = t[2] ^ H[2],
                e[3] = t[3] ^ H[3];
            for (let t = 0; t < 32; t++)
                e[t + 4] = e[t] ^ this.tTransform2(e[t + 1] ^ e[t + 2] ^ e[t + 3] ^ W[t]),
                    this.encryptRoundKeys[t] = e[t + 4]
        }

        rotateLeft(t, e) {
            return t << e | t >>> 32 - e
        }

        linearTransform1(t) {
            return t ^ this.rotateLeft(t, 2) ^ this.rotateLeft(t, 10) ^ this.rotateLeft(t, 18) ^ this.rotateLeft(t, 24)
        }

        linearTransform2(t) {
            return t ^ this.rotateLeft(t, 13) ^ this.rotateLeft(t, 23)
        }

        tauTransform(t) {
            return G[t >>> 24 & 255] << 24 | G[t >>> 16 & 255] << 16 | G[t >>> 8 & 255] << 8 | G[255 & t]
        }

        tTransform1(t) {
            return t = this.tauTransform(t),
                this.linearTransform1(t)
        }

        tTransform2(t) {
            return t = this.tauTransform(t),
                this.linearTransform2(t)
        }

        padding(t) {
            if (null === t)
                return null;
            let e = 16 - t.length % 16
                , n = g.allocUnsafe(t.length + e);
            return n.set(t, 0),
                n.fill(e, t.length),
                n
        }

        dePadding(t) {
            if (null === t)
                return null;
            var e = t[t.length - 1];
            return t.slice(0, t.length - e)
        }

        uint8ToUint32Block(t, e = 0) {
            let n = new Uint32Array(4);
            return n[0] = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3],
                n[1] = t[e + 4] << 24 | t[e + 5] << 16 | t[e + 6] << 8 | t[e + 7],
                n[2] = t[e + 8] << 24 | t[e + 9] << 16 | t[e + 10] << 8 | t[e + 11],
                n[3] = t[e + 12] << 24 | t[e + 13] << 16 | t[e + 14] << 8 | t[e + 15],
                n
        }

        encrypt(t) {
            let e, n = g.from(t, "hex");
            if ("pkcs7" === this.paddingMode)
                e = this.padding(n);
            else {
                if (n.length % 16 != 0)
                    throw new Error("plaintext should be 16 bytes times in no padding mode");
                e = n
            }
            let i = e.length / 16
                , r = g.allocUnsafe(e.length);
            if ("cbc" === this.mode) {
                if (null === this.iv || 16 !== this.iv.length)
                    throw new Error("iv error");
                let t = this.uint8ToUint32Block(this.iv);
                for (let n = 0; n < i; n++) {
                    var a = 16 * n
                        , o = this.uint8ToUint32Block(e, a)
                        , s = (t[0] = t[0] ^ o[0],
                        t[1] = t[1] ^ o[1],
                        t[2] = t[2] ^ o[2],
                        t[3] = t[3] ^ o[3],
                        this.doBlockCrypt(t, this.encryptRoundKeys));
                    t = s;
                    for (let t = 0; t < 16; t++)
                        r[a + t] = s[parseInt(t / 4)] >> (3 - t) % 4 * 8 & 255
                }
            } else
                for (let t = 0; t < i; t++) {
                    var l = 16 * t
                        , u = this.uint8ToUint32Block(e, l)
                        , c = this.doBlockCrypt(u, this.encryptRoundKeys);
                    for (let t = 0; t < 16; t++)
                        r[l + t] = c[parseInt(t / 4)] >> (3 - t) % 4 * 8 & 255
                }
            return r.toString("hex")
        }

        decrypt(t) {
            let e, n = g.from(t, "hex"), i = n.length / 16, r = g.allocUnsafe(n.length);
            if ("cbc" === this.mode) {
                if (null === this.iv || 16 !== this.iv.length)
                    throw new Error("iv error");
                let t = this.uint8ToUint32Block(this.iv);
                for (let e = 0; e < i; e++) {
                    let i = 16 * e
                        , a = this.uint8ToUint32Block(n, i)
                        , o = this.doBlockCrypt(a, this.decryptRoundKeys)
                        , s = new Uint32Array(4);
                    s[0] = t[0] ^ o[0],
                        s[1] = t[1] ^ o[1],
                        s[2] = t[2] ^ o[2],
                        s[3] = t[3] ^ o[3],
                        t = a;
                    for (let t = 0; t < 16; t++)
                        r[i + t] = s[parseInt(t / 4)] >> (3 - t) % 4 * 8 & 255
                }
            } else
                for (let t = 0; t < i; t++) {
                    var a = 16 * t
                        , o = this.uint8ToUint32Block(n, a)
                        , s = this.doBlockCrypt(o, this.decryptRoundKeys);
                    for (let t = 0; t < 16; t++)
                        r[a + t] = s[parseInt(t / 4)] >> (3 - t) % 4 * 8 & 255
                }
            return (e = "pkcs7" === this.paddingMode ? this.dePadding(r) : r).toString("hex")
        }
    }

    var Z = "";

    function Q(t, e, n, i, r) {
        for (; r--;)
            t[e++] = n[i++]
    }

    function J(t, e, n, i) {
        for (; i--;)
            t[e++] = n
    }

    function X(t, e, n) {
        t[e + 3] = (255 & n) >>> 0,
            t[e + 2] = (255 & (n >>>= 8)) >>> 0,
            t[e + 1] = (255 & (n >>>= 8)) >>> 0,
            t[e] = (255 & (n >>>= 8)) >>> 0
    }

    const $ = 64;

    function tt() {
        return et(Z = {
            state: new Array(8),
            block: new Array(64),
            nblocks: 0,
            num: 0
        }),
            Z
    }

    function et(t) {
        for (var e = 0; e < $; e++)
            t.block[e] = 0;
        t.nblocks = 0,
            t.num = 0,
            t.state[0] = 1937774191,
            t.state[1] = 1226093241,
            t.state[2] = 388252375,
            t.state[3] = 3666478592,
            t.state[4] = 2842636476,
            t.state[5] = 372324522,
            t.state[6] = 3817729613,
            t.state[7] = 2969243214
    }

    function nt(t, e) {
        st(t, e, 0, 1)
    }

    function it(t, e) {
        var n = 0
            , i = e.length;
        if (t.num) {
            var r = $ - t.num;
            if (i < r)
                return Q(t.block, t.num, e, 0, i),
                    void (t.num += i);
            Q(t.block, t.num, e, 0, r),
                st(t.state, t.block, 0, 1),
                t.nblocks++,
                n += r,
                i -= r
        }
        0 < (r = Math.floor(i / $)) && (st(t.state, e, n, r),
            t.nblocks += r,
            n += $ * r,
            i -= $ * r),
        (t.num = i) && Q(t.block, 0, e, n, i)
    }

    function rt(t, e) {
        t.block[t.num] = 128,
            t.num + 9 <= $ ? J(t.block, t.num + 1, 0, $ - t.num - 9) : (J(t.block, t.num + 1, 0, $ - t.num - 1),
                nt(t.state, t.block),
                J(t.block, 0, 0, 56));
        var n = t.nblocks >>> 23
            , i = ((t.nblocks << 9) + (t.num << 3) & 4294967295) >>> 0;
        X(t.block, 56, n),
            X(t.block, 60, i),
            nt(t.state, t.block);
        for (var r = 0; r < 8; r++)
            X(e, 4 * r, t.state[r])
    }

    function at(t, e) {
        return (t << e | t >>> 32 - e) >>> 0
    }

    function ot(t) {
        return (t ^ at(t, 9) ^ at(t, 17)) >>> 0
    }

    function st(t, e, n, i) {
        for (var r, a, o, s, l, u, c, f, d, h, p, m, b, g, v = new Array(68), y = [2043430169, 4086860338, 3878753381, 3462539467, 2630111639, 965255983, 1930511966, 3861023932, 3427080569, 2559193843, 823420391, 1646840782, 3293681564, 2292395833, 289824371, 579648742, 2643098247, 991229199, 1982458398, 3964916796, 3634866297, 2974765299, 1654563303, 3309126606, 2323285917, 351604539, 703209078, 1406418156, 2812836312, 1330705329, 2661410658, 1027854021, 2055708042, 4111416084, 3927864873, 3560762451, 2826557607, 1358147919, 2716295838, 1137624381, 2275248762, 255530229, 511060458, 1022120916, 2044241832, 4088483664, 3882000033, 3469032771, 2643098247, 991229199, 1982458398, 3964916796, 3634866297, 2974765299, 1654563303, 3309126606, 2323285917, 351604539, 703209078, 1406418156, 2812836312, 1330705329, 2661410658, 1027854021]; i--;) {
            for (r = t[0],
                     a = t[1],
                     o = t[2],
                     s = t[3],
                     l = t[4],
                     u = t[5],
                     c = t[6],
                     f = t[7],
                     m = 0; m < 16; m++)
                v[m] = (e[b = n + 4 * m] << 24 | e[b + 1] << 16 | e[b + 2] << 8 | e[b + 3]) >>> 0;
            for (; m < 68; m++)
                v[m] = ((g = v[m - 16] ^ v[m - 9] ^ at(v[m - 3], 15)) ^ at(g, 15) ^ at(g, 23)) >>> 0 ^ at(v[m - 13], 7) ^ v[m - 6],
                    v[m] >>>= 0;
            for (m = 0; m < 16; m++)
                h = (4294967295 & ((r ^ a ^ o) >>> 0) + s + ((4294967295 & ((d = at(d = (4294967295 & (d = at(r, 12) + l + y[m])) >>> 0, 7)) ^ at(r, 12))) >>> 0) + (h = (4294967295 & (v[m] ^ v[m + 4])) >>> 0)) >>> 0,
                    p = (4294967295 & ((l ^ u ^ c) >>> 0) + f + d + v[m]) >>> 0,
                    s = o,
                    o = at(a, 9),
                    a = r,
                    r = h,
                    f = c,
                    c = at(u, 19),
                    u = l,
                    l = ot(p);
            for (; m < 64; m++)
                h = (4294967295 & ((r & a | r & o | a & o) >>> 0) + s + ((4294967295 & ((d = at(d = (4294967295 & (d = at(r, 12) + l + y[m])) >>> 0, 7)) ^ at(r, 12))) >>> 0) + (h = (4294967295 & (v[m] ^ v[m + 4])) >>> 0)) >>> 0,
                    p = (4294967295 & (((u ^ c) & l ^ c) >>> 0) + f + d + v[m]) >>> 0,
                    s = o,
                    o = at(a, 9),
                    a = r,
                    r = h,
                    f = c,
                    c = at(u, 19),
                    u = l,
                    l = ot(p);
            t[0] ^= r,
                t[1] ^= a,
                t[2] ^= o,
                t[3] ^= s,
                t[4] ^= l,
                t[5] ^= u,
                t[6] ^= c,
                t[7] ^= f
        }
    }

    function lt(t) {
        var e = new Array(32)
            , n = tt();
        return et(n),
            it(n, t),
            rt(n, e),
            e
    }

    const ut = {
        sm3_ctx_new: tt,
        hmac: function (t, e) {
            var n, i = new Array(32), r = Z = {
                sm3_ctx: tt(),
                key: new Array($)
            };
            for ((o = e.length) <= $ ? (Q(r.key, 0, e, 0, o),
                J(r.key, o, 0, $ - o)) : (et(r.sm3_ctx),
                it(r.sm3_ctx, e),
                rt(r.sm3_ctx, r.key),
                J(r.key, 32, 0, 32)),
                     n = 0; n < $; n++)
                r.key[n] ^= 54;
            et(r.sm3_ctx),
                it(r.sm3_ctx, r.key),
                it(Z.sm3_ctx, t);
            for (var a = Z, o = i, s = 0; s < $; s++)
                a.key[s] ^= 106;
            rt(a.sm3_ctx, o),
                et(a.sm3_ctx),
                it(a.sm3_ctx, a.key),
                it(a.sm3_ctx, o),
                rt(a.sm3_ctx, o);
            var l = Z;
            l.sm3_ctx;
            for (var u = 0; u < $; u++)
                l.key[u] = 0;
            return i
        },
        sm3_ctx_free: function (t) {
        },
        sm3_init: et,
        sm3_update: it,
        sm3_final: rt,
        digest: lt,
        sm3_test: function () {
            var t = [102, 199, 240, 244, 98, 238, 237, 217, 209, 242, 212, 107, 220, 16, 228, 226, 65, 103, 196, 135, 92, 242, 247, 162, 41, 125, 160, 43, 143, 75, 168, 224]
                ,
                e = [222, 190, 159, 249, 34, 117, 184, 161, 56, 96, 72, 137, 193, 142, 90, 77, 111, 219, 112, 229, 56, 126, 87, 101, 41, 61, 203, 163, 156, 12, 87, 50];
            var dgst = lt([97, 98, 99]);
            for (var n = 0; n < 32; n++)
                if (dgst[n] != t[n])
                    return 0;
            for (dgst = lt([97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98, 99, 100]),
                     n = 0; n < 32; n++)
                if (dgst[n] != e[n])
                    return 0;
            return 1
        }
    };
    var ct = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {};

    function ft(t, e) {
        return t(e = {
            exports: {}
        }, e.exports),
            e.exports
    }

    p = "elliptic@^6.5.3";
    var dt = "elliptic@6.5.4"
        , ht = "sha1-2jfOvTHnmhNn6UG1ku0fvr1Yq7s="
        , pt = "/elliptic"
        , mt = {}
        , bt = {
        type: "range",
        registry: !0,
        raw: "elliptic@^6.5.3",
        name: "elliptic",
        escapedName: "elliptic",
        rawSpec: "^6.5.3",
        saveSpec: null,
        fetchSpec: "^6.5.3"
    }
        , gt = ["/browserify-sign", "/create-ecdh"]
        , vt = "http://registrynpm.stg.pinganfu.net/elliptic/download/elliptic-6.5.4.tgz"
        , yt = "da37cebd31e79a1367e941b592ed1fbebd58abbb"
        , wt = "elliptic@^6.5.3"
        , _t = "/Users/hanailing913/Documents/pacode/plugin-sdkapis/node_modules/browserify-sign"
        , Mt = {
        name: "Fedor Indutny",
        email: "fedor@indutny.com"
    }
        , St = {
        url: "https://github.com/indutny/elliptic/issues"
    }
        , kt = {
        "bn.js": "^4.11.9",
        brorand: "^1.1.0",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.1",
        inherits: "^2.0.4",
        "minimalistic-assert": "^1.0.1",
        "minimalistic-crypto-utils": "^1.0.1"
    }
        , Et = "EC cryptography"
        , At = {
        brfs: "^2.0.2",
        coveralls: "^3.1.0",
        eslint: "^7.6.0",
        grunt: "^1.2.1",
        "grunt-browserify": "^5.3.0",
        "grunt-cli": "^1.3.2",
        "grunt-contrib-connect": "^3.0.0",
        "grunt-contrib-copy": "^1.0.0",
        "grunt-contrib-uglify": "^5.0.0",
        "grunt-mocha-istanbul": "^5.0.2",
        "grunt-saucelabs": "^9.0.1",
        istanbul: "^0.4.5",
        mocha: "^8.0.1"
    }
        , Ct = ["lib"]
        , Rt = "https://github.com/indutny/elliptic"
        , It = ["EC", "Elliptic", "curve", "Cryptography"]
        , Nt = "lib/elliptic.js"
        , Pt = "elliptic"
        , Ot = {
        type: "git",
        url: "git+ssh://git@github.com/indutny/elliptic.git"
    }
        , xt = {
        lint: "eslint lib test",
        "lint:fix": "npm run lint -- --fix",
        test: "npm run lint && npm run unit",
        unit: "istanbul test _mocha --reporter=spec test/index.js",
        version: "grunt dist && git add dist/"
    }
        , Tt = (p = Object.freeze({
        __proto__: null,
        _from: p,
        _id: dt,
        _inBundle: !1,
        _integrity: ht,
        _location: pt,
        _phantomChildren: mt,
        _requested: bt,
        _requiredBy: gt,
        _resolved: vt,
        _shasum: yt,
        _spec: wt,
        _where: _t,
        author: Mt,
        bugs: St,
        bundleDependencies: !1,
        dependencies: kt,
        deprecated: !1,
        description: Et,
        devDependencies: At,
        files: Ct,
        homepage: Rt,
        keywords: It,
        license: "MIT",
        main: Nt,
        name: Pt,
        repository: Ot,
        scripts: xt,
        version: "6.5.4",
        "default": {
            _from: p,
            _id: dt,
            _inBundle: !1,
            _integrity: ht,
            _location: pt,
            _phantomChildren: mt,
            _requested: bt,
            _requiredBy: gt,
            _resolved: vt,
            _shasum: yt,
            _spec: wt,
            _where: _t,
            author: Mt,
            bugs: St,
            bundleDependencies: !1,
            dependencies: kt,
            deprecated: !1,
            description: Et,
            devDependencies: At,
            files: Ct,
            homepage: Rt,
            keywords: It,
            license: "MIT",
            main: Nt,
            name: Pt,
            repository: Ot,
            scripts: xt,
            version: "6.5.4"
        }
    }),
        ft(function (t) {
            var e, n = ct;

            function i(t, e) {
                if (!t)
                    throw new Error(e || "Assertion failed")
            }

            function r(t, e) {
                function n() {
                }

                t.super_ = e,
                    n.prototype = e.prototype,
                    t.prototype = new n,
                    t.prototype.constructor = t
            }

            function a(t, e, n) {
                if (a.isBN(t))
                    return t;
                this.negative = 0,
                    this.words = null,
                    this.length = 0,
                (this.red = null) !== t && ("le" !== e && "be" !== e || (n = e,
                    e = 10),
                    this._init(t || 0, e || 10, n || "be"))
            }

            "object" == typeof t ? t.exports = a : n.BN = a,
                (a.BN = a).wordSize = 26;
            try {
                e = ("undefined" != typeof window && void 0 !== window.Buffer ? window : Y).Buffer
            } catch (t) {
            }

            function o(t, e) {
                return 65 <= (t = t.charCodeAt(e)) && t <= 70 ? t - 55 : 97 <= t && t <= 102 ? t - 87 : t - 48 & 15
            }

            function s(t, e, n) {
                var i = o(t, n);
                return e <= n - 1 && (i |= o(t, n - 1) << 4),
                    i
            }

            function l(t, e, n, i) {
                for (var r = 0, a = Math.min(t.length, n), o = e; o < a; o++) {
                    var s = t.charCodeAt(o) - 48;
                    r = r * i + (49 <= s ? s - 49 + 10 : 17 <= s ? s - 17 + 10 : s)
                }
                return r
            }

            a.isBN = function (t) {
                return t instanceof a || null !== t && "object" == typeof t && t.constructor.wordSize === a.wordSize && Array.isArray(t.words)
            }
                ,
                a.max = function (t, e) {
                    return 0 < t.cmp(e) ? t : e
                }
                ,
                a.min = function (t, e) {
                    return t.cmp(e) < 0 ? t : e
                }
                ,
                a.prototype._init = function (t, e, n) {
                    if ("number" == typeof t)
                        return this._initNumber(t, e, n);
                    if ("object" == typeof t)
                        return this._initArray(t, e, n);
                    i((e = "hex" === e ? 16 : e) === (0 | e) && 2 <= e && e <= 36);
                    var r = 0;
                    "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (r++,
                        this.negative = 1),
                    r < t.length && (16 === e ? this._parseHex(t, r, n) : (this._parseBase(t, e, r),
                    "le" === n && this._initArray(this.toArray(), e, n)))
                }
                ,
                a.prototype._initNumber = function (t, e, n) {
                    t < 0 && (this.negative = 1,
                        t = -t),
                        t < 67108864 ? (this.words = [67108863 & t],
                            this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863],
                            this.length = 2) : (i(t < 9007199254740992),
                            this.words = [67108863 & t, t / 67108864 & 67108863, 1],
                            this.length = 3),
                    "le" === n && this._initArray(this.toArray(), e, n)
                }
                ,
                a.prototype._initArray = function (t, e, n) {
                    if (i("number" == typeof t.length),
                    t.length <= 0)
                        return this.words = [0],
                            this.length = 1,
                            this;
                    this.length = Math.ceil(t.length / 3),
                        this.words = new Array(this.length);
                    for (var r = 0; r < this.length; r++)
                        this.words[r] = 0;
                    var a, o, s = 0;
                    if ("be" === n)
                        for (r = t.length - 1,
                                 a = 0; 0 <= r; r -= 3)
                            o = t[r] | t[r - 1] << 8 | t[r - 2] << 16,
                                this.words[a] |= o << s & 67108863,
                                this.words[a + 1] = o >>> 26 - s & 67108863,
                            26 <= (s += 24) && (s -= 26,
                                a++);
                    else if ("le" === n)
                        for (a = r = 0; r < t.length; r += 3)
                            o = t[r] | t[r + 1] << 8 | t[r + 2] << 16,
                                this.words[a] |= o << s & 67108863,
                                this.words[a + 1] = o >>> 26 - s & 67108863,
                            26 <= (s += 24) && (s -= 26,
                                a++);
                    return this.strip()
                }
                ,
                a.prototype._parseHex = function (t, e, n) {
                    this.length = Math.ceil((t.length - e) / 6),
                        this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++)
                        this.words[i] = 0;
                    var r, a = 0, o = 0;
                    if ("be" === n)
                        for (i = t.length - 1; e <= i; i -= 2)
                            r = s(t, e, i) << a,
                                this.words[o] |= 67108863 & r,
                                18 <= a ? (a -= 18,
                                    this.words[o += 1] |= r >>> 26) : a += 8;
                    else
                        for (i = (t.length - e) % 2 == 0 ? e + 1 : e; i < t.length; i += 2)
                            r = s(t, e, i) << a,
                                this.words[o] |= 67108863 & r,
                                18 <= a ? (a -= 18,
                                    this.words[o += 1] |= r >>> 26) : a += 8;
                    this.strip()
                }
                ,
                a.prototype._parseBase = function (t, e, n) {
                    this.words = [0];
                    for (var i = 0, r = this.length = 1; r <= 67108863; r *= e)
                        i++;
                    r = r / e | 0;
                    for (var a = t.length - n, o = a % --i, s = Math.min(a, a - o) + n, u = 0, c = n; c < s; c += i)
                        u = l(t, c, c + i, e),
                            this.imuln(r),
                            this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                    if (0 != o) {
                        var f = 1;
                        for (u = l(t, c, t.length, e),
                                 c = 0; c < o; c++)
                            f *= e;
                        this.imuln(f),
                            this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                    }
                    this.strip()
                }
                ,
                a.prototype.copy = function (t) {
                    t.words = new Array(this.length);
                    for (var e = 0; e < this.length; e++)
                        t.words[e] = this.words[e];
                    t.length = this.length,
                        t.negative = this.negative,
                        t.red = this.red
                }
                ,
                a.prototype.clone = function () {
                    var t = new a(null);
                    return this.copy(t),
                        t
                }
                ,
                a.prototype._expand = function (t) {
                    for (; this.length < t;)
                        this.words[this.length++] = 0;
                    return this
                }
                ,
                a.prototype.strip = function () {
                    for (; 1 < this.length && 0 === this.words[this.length - 1];)
                        this.length--;
                    return this._normSign()
                }
                ,
                a.prototype._normSign = function () {
                    return 1 === this.length && 0 === this.words[0] && (this.negative = 0),
                        this
                }
                ,
                a.prototype.inspect = function () {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                }
            ;
            var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"]
                ,
                c = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                ,
                f = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function d(t, e, n) {
                n.negative = e.negative ^ t.negative;
                var i = t.length + e.length | 0
                    , r = (i = (n.length = i) - 1 | 0,
                (0 | t.words[0]) * (0 | e.words[0]))
                    , a = r / 67108864 | 0;
                n.words[0] = 67108863 & r;
                for (var o = 1; o < i; o++) {
                    for (var s = a >>> 26, l = 67108863 & a, u = Math.min(o, e.length - 1), c = Math.max(0, o - t.length + 1); c <= u; c++)
                        s += (r = (0 | t.words[o - c | 0]) * (0 | e.words[c]) + l) / 67108864 | 0,
                            l = 67108863 & r;
                    n.words[o] = 0 | l,
                        a = 0 | s
                }
                return 0 !== a ? n.words[o] = 0 | a : n.length--,
                    n.strip()
            }

            a.prototype.toString = function (t, e) {
                if (e = 0 | e || 1,
                16 === (t = t || 10) || "hex" === t) {
                    l = "";
                    for (var n = 0, r = 0, a = 0; a < this.length; a++) {
                        var o = this.words[a]
                            , s = (16777215 & (o << n | r)).toString(16)
                            ,
                            l = 0 != (r = o >>> 24 - n & 16777215) || a !== this.length - 1 ? u[6 - s.length] + s + l : s + l;
                        26 <= (n += 2) && (n -= 26,
                            a--)
                    }
                    for (0 !== r && (l = r.toString(16) + l); l.length % e != 0;)
                        l = "0" + l;
                    return 0 !== this.negative ? "-" + l : l
                }
                if (t === (0 | t) && 2 <= t && t <= 36) {
                    var d = c[t]
                        , h = f[t]
                        , p = (l = "",
                        this.clone());
                    for (p.negative = 0; !p.isZero();) {
                        var m = p.modn(h).toString(t);
                        l = (p = p.idivn(h)).isZero() ? m + l : u[d - m.length] + m + l
                    }
                    for (this.isZero() && (l = "0" + l); l.length % e != 0;)
                        l = "0" + l;
                    return 0 !== this.negative ? "-" + l : l
                }
                i(!1, "Base should be between 2 and 36")
            }
                ,
                a.prototype.toNumber = function () {
                    var t = this.words[0];
                    return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : 2 < this.length && i(!1, "Number can only safely store up to 53 bits"),
                        0 !== this.negative ? -t : t
                }
                ,
                a.prototype.toJSON = function () {
                    return this.toString(16)
                }
                ,
                a.prototype.toBuffer = function (t, n) {
                    return i(void 0 !== e),
                        this.toArrayLike(e, t, n)
                }
                ,
                a.prototype.toArray = function (t, e) {
                    return this.toArrayLike(Array, t, e)
                }
                ,
                a.prototype.toArrayLike = function (t, e, n) {
                    var r = this.byteLength()
                        , a = n || Math.max(1, r);
                    i(r <= a, "byte array longer than desired length"),
                        i(0 < a, "Requested array length <= 0"),
                        this.strip();
                    n = "le" === e;
                    var o, s, l = new t(a), u = this.clone();
                    if (n) {
                        for (s = 0; !u.isZero(); s++)
                            o = u.andln(255),
                                u.iushrn(8),
                                l[s] = o;
                        for (; s < a; s++)
                            l[s] = 0
                    } else {
                        for (s = 0; s < a - r; s++)
                            l[s] = 0;
                        for (s = 0; !u.isZero(); s++)
                            o = u.andln(255),
                                u.iushrn(8),
                                l[a - s - 1] = o
                    }
                    return l
                }
                ,
                Math.clz32 ? a.prototype._countBits = function (t) {
                        return 32 - Math.clz32(t)
                    }
                    : a.prototype._countBits = function (t) {
                        var e = 0;
                        return 4096 <= t && (e += 13,
                            t >>>= 13),
                        64 <= t && (e += 7,
                            t >>>= 7),
                        8 <= t && (e += 4,
                            t >>>= 4),
                        2 <= t && (e += 2,
                            t >>>= 2),
                        e + t
                    }
                ,
                a.prototype._zeroBits = function (t) {
                    if (0 === t)
                        return 26;
                    var e = 0;
                    return 0 == (8191 & t) && (e += 13,
                        t >>>= 13),
                    0 == (127 & t) && (e += 7,
                        t >>>= 7),
                    0 == (15 & t) && (e += 4,
                        t >>>= 4),
                    0 == (3 & t) && (e += 2,
                        t >>>= 2),
                    0 == (1 & t) && e++,
                        e
                }
                ,
                a.prototype.bitLength = function () {
                    var t = this.words[this.length - 1];
                    t = this._countBits(t);
                    return 26 * (this.length - 1) + t
                }
                ,
                a.prototype.zeroBits = function () {
                    if (this.isZero())
                        return 0;
                    for (var t = 0, e = 0; e < this.length; e++) {
                        var n = this._zeroBits(this.words[e]);
                        if (t += n,
                        26 !== n)
                            break
                    }
                    return t
                }
                ,
                a.prototype.byteLength = function () {
                    return Math.ceil(this.bitLength() / 8)
                }
                ,
                a.prototype.toTwos = function (t) {
                    return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                }
                ,
                a.prototype.fromTwos = function (t) {
                    return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                }
                ,
                a.prototype.isNeg = function () {
                    return 0 !== this.negative
                }
                ,
                a.prototype.neg = function () {
                    return this.clone().ineg()
                }
                ,
                a.prototype.ineg = function () {
                    return this.isZero() || (this.negative ^= 1),
                        this
                }
                ,
                a.prototype.iuor = function (t) {
                    for (; this.length < t.length;)
                        this.words[this.length++] = 0;
                    for (var e = 0; e < t.length; e++)
                        this.words[e] = this.words[e] | t.words[e];
                    return this.strip()
                }
                ,
                a.prototype.ior = function (t) {
                    return i(0 == (this.negative | t.negative)),
                        this.iuor(t)
                }
                ,
                a.prototype.or = function (t) {
                    return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                }
                ,
                a.prototype.uor = function (t) {
                    return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                }
                ,
                a.prototype.iuand = function (t) {
                    for (var e = this.length > t.length ? t : this, n = 0; n < e.length; n++)
                        this.words[n] = this.words[n] & t.words[n];
                    return this.length = e.length,
                        this.strip()
                }
                ,
                a.prototype.iand = function (t) {
                    return i(0 == (this.negative | t.negative)),
                        this.iuand(t)
                }
                ,
                a.prototype.and = function (t) {
                    return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                }
                ,
                a.prototype.uand = function (t) {
                    return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                }
                ,
                a.prototype.iuxor = function (t) {
                    for (var e, n = this.length > t.length ? (e = this,
                        t) : (e = t,
                        this), i = 0; i < n.length; i++)
                        this.words[i] = e.words[i] ^ n.words[i];
                    if (this !== e)
                        for (; i < e.length; i++)
                            this.words[i] = e.words[i];
                    return this.length = e.length,
                        this.strip()
                }
                ,
                a.prototype.ixor = function (t) {
                    return i(0 == (this.negative | t.negative)),
                        this.iuxor(t)
                }
                ,
                a.prototype.xor = function (t) {
                    return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                }
                ,
                a.prototype.uxor = function (t) {
                    return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                }
                ,
                a.prototype.inotn = function (t) {
                    i("number" == typeof t && 0 <= t);
                    var e = 0 | Math.ceil(t / 26);
                    t %= 26;
                    this._expand(e),
                    0 < t && e--;
                    for (var n = 0; n < e; n++)
                        this.words[n] = 67108863 & ~this.words[n];
                    return 0 < t && (this.words[n] = ~this.words[n] & 67108863 >> 26 - t),
                        this.strip()
                }
                ,
                a.prototype.notn = function (t) {
                    return this.clone().inotn(t)
                }
                ,
                a.prototype.setn = function (t, e) {
                    i("number" == typeof t && 0 <= t);
                    var n = t / 26 | 0;
                    t %= 26;
                    return this._expand(1 + n),
                        this.words[n] = e ? this.words[n] | 1 << t : this.words[n] & ~(1 << t),
                        this.strip()
                }
                ,
                a.prototype.iadd = function (t) {
                    var e, n;
                    if (0 !== this.negative && 0 === t.negative)
                        return this.negative = 0,
                            e = this.isub(t),
                            this.negative ^= 1,
                            this._normSign();
                    if (0 === this.negative && 0 !== t.negative)
                        return t.negative = 0,
                            e = this.isub(t),
                            t.negative = 1,
                            e._normSign();
                    for (var i = this.length > t.length ? (n = this,
                        t) : (n = t,
                        this), r = 0, a = 0; a < i.length; a++)
                        e = (0 | n.words[a]) + (0 | i.words[a]) + r,
                            this.words[a] = 67108863 & e,
                            r = e >>> 26;
                    for (; 0 !== r && a < n.length; a++)
                        e = (0 | n.words[a]) + r,
                            this.words[a] = 67108863 & e,
                            r = e >>> 26;
                    if (this.length = n.length,
                    0 !== r)
                        this.words[this.length] = r,
                            this.length++;
                    else if (n !== this)
                        for (; a < n.length; a++)
                            this.words[a] = n.words[a];
                    return this
                }
                ,
                a.prototype.add = function (t) {
                    var e;
                    return 0 !== t.negative && 0 === this.negative ? (t.negative = 0,
                        e = this.sub(t),
                        t.negative ^= 1,
                        e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0,
                        e = t.sub(this),
                        this.negative = 1,
                        e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                }
                ,
                a.prototype.isub = function (t) {
                    var e;
                    if (0 !== t.negative)
                        return t.negative = 0,
                            e = this.iadd(t),
                            t.negative = 1,
                            e._normSign();
                    if (0 !== this.negative)
                        return this.negative = 0,
                            this.iadd(t),
                            this.negative = 1,
                            this._normSign();
                    var n, i = this.cmp(t);
                    if (0 === i)
                        return this.negative = 0,
                            this.length = 1,
                            this.words[0] = 0,
                            this;
                    for (var r = 0 < i ? (n = this,
                        t) : (n = t,
                        this), a = 0, o = 0; o < r.length; o++)
                        a = (e = (0 | n.words[o]) - (0 | r.words[o]) + a) >> 26,
                            this.words[o] = 67108863 & e;
                    for (; 0 !== a && o < n.length; o++)
                        a = (e = (0 | n.words[o]) + a) >> 26,
                            this.words[o] = 67108863 & e;
                    if (0 === a && o < n.length && n !== this)
                        for (; o < n.length; o++)
                            this.words[o] = n.words[o];
                    return this.length = Math.max(this.length, o),
                    n !== this && (this.negative = 1),
                        this.strip()
                }
                ,
                a.prototype.sub = function (t) {
                    return this.clone().isub(t)
                }
            ;
            var h = function (t, e, n) {
                var i = t.words
                    , r = e.words
                    , a = n.words
                    , o = 8191 & (s = 0 | i[0])
                    , s = s >>> 13
                    , l = 8191 & (u = 0 | i[1])
                    , u = u >>> 13
                    , c = 8191 & (f = 0 | i[2])
                    , f = f >>> 13
                    , d = 8191 & (h = 0 | i[3])
                    , h = h >>> 13
                    , p = 8191 & (m = 0 | i[4])
                    , m = m >>> 13
                    , b = 8191 & (g = 0 | i[5])
                    , g = g >>> 13
                    , v = 8191 & (y = 0 | i[6])
                    , y = y >>> 13
                    , w = 8191 & (_ = 0 | i[7])
                    , _ = _ >>> 13
                    , M = 8191 & (S = 0 | i[8])
                    , S = S >>> 13
                    , k = 8191 & (i = 0 | i[9])
                    , E = (i = i >>> 13,
                    8191 & (A = 0 | r[0]))
                    , A = A >>> 13
                    , C = 8191 & (R = 0 | r[1])
                    , R = R >>> 13
                    , I = 8191 & (N = 0 | r[2])
                    , N = N >>> 13
                    , P = 8191 & (O = 0 | r[3])
                    , O = O >>> 13
                    , x = 8191 & (T = 0 | r[4])
                    , T = T >>> 13
                    , B = 8191 & (L = 0 | r[5])
                    , L = L >>> 13
                    , D = 8191 & (q = 0 | r[6])
                    , q = q >>> 13
                    , F = 8191 & (U = 0 | r[7])
                    , U = U >>> 13
                    , V = 8191 & (z = 0 | r[8])
                    , z = z >>> 13
                    , j = 8191 & (r = 0 | r[9])
                    , Y = (r = r >>> 13,
                        n.negative = t.negative ^ e.negative,
                        n.length = 19,
                    (0 + (t = Math.imul(o, E)) | 0) + ((8191 & (e = Math.imul(o, A) + Math.imul(s, E) | 0)) << 13) | 0)
                    , G = (Math.imul(s, A) + (e >>> 13) | 0) + (Y >>> 26) | 0
                    , W = (t = (Y &= 67108863,
                        Math.imul(l, E)),
                        e = Math.imul(l, A) + Math.imul(u, E) | 0,
                        Math.imul(u, A))
                    ,
                    H = (G + (t = t + Math.imul(o, C) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, R) | 0) + Math.imul(s, C) | 0)) << 13) | 0
                    , K = (G = ((W + Math.imul(s, R) | 0) + (e >>> 13) | 0) + (H >>> 26) | 0,
                        H &= 67108863,
                        t = Math.imul(c, E),
                        e = Math.imul(c, A) + Math.imul(f, E) | 0,
                        W = Math.imul(f, A),
                        t = t + Math.imul(l, C) | 0,
                        e = (e + Math.imul(l, R) | 0) + Math.imul(u, C) | 0,
                        W = W + Math.imul(u, R) | 0,
                    (G + (t = t + Math.imul(o, I) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, N) | 0) + Math.imul(s, I) | 0)) << 13) | 0)
                    , Z = (G = ((W + Math.imul(s, N) | 0) + (e >>> 13) | 0) + (K >>> 26) | 0,
                        K &= 67108863,
                        t = Math.imul(d, E),
                        e = Math.imul(d, A) + Math.imul(h, E) | 0,
                        W = Math.imul(h, A),
                        t = t + Math.imul(c, C) | 0,
                        e = (e + Math.imul(c, R) | 0) + Math.imul(f, C) | 0,
                        W = W + Math.imul(f, R) | 0,
                        t = t + Math.imul(l, I) | 0,
                        e = (e + Math.imul(l, N) | 0) + Math.imul(u, I) | 0,
                        W = W + Math.imul(u, N) | 0,
                    (G + (t = t + Math.imul(o, P) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, O) | 0) + Math.imul(s, P) | 0)) << 13) | 0)
                    , Q = (G = ((W + Math.imul(s, O) | 0) + (e >>> 13) | 0) + (Z >>> 26) | 0,
                        Z &= 67108863,
                        t = Math.imul(p, E),
                        e = Math.imul(p, A) + Math.imul(m, E) | 0,
                        W = Math.imul(m, A),
                        t = t + Math.imul(d, C) | 0,
                        e = (e + Math.imul(d, R) | 0) + Math.imul(h, C) | 0,
                        W = W + Math.imul(h, R) | 0,
                        t = t + Math.imul(c, I) | 0,
                        e = (e + Math.imul(c, N) | 0) + Math.imul(f, I) | 0,
                        W = W + Math.imul(f, N) | 0,
                        t = t + Math.imul(l, P) | 0,
                        e = (e + Math.imul(l, O) | 0) + Math.imul(u, P) | 0,
                        W = W + Math.imul(u, O) | 0,
                    (G + (t = t + Math.imul(o, x) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, T) | 0) + Math.imul(s, x) | 0)) << 13) | 0)
                    , J = (G = ((W + Math.imul(s, T) | 0) + (e >>> 13) | 0) + (Q >>> 26) | 0,
                        Q &= 67108863,
                        t = Math.imul(b, E),
                        e = Math.imul(b, A) + Math.imul(g, E) | 0,
                        W = Math.imul(g, A),
                        t = t + Math.imul(p, C) | 0,
                        e = (e + Math.imul(p, R) | 0) + Math.imul(m, C) | 0,
                        W = W + Math.imul(m, R) | 0,
                        t = t + Math.imul(d, I) | 0,
                        e = (e + Math.imul(d, N) | 0) + Math.imul(h, I) | 0,
                        W = W + Math.imul(h, N) | 0,
                        t = t + Math.imul(c, P) | 0,
                        e = (e + Math.imul(c, O) | 0) + Math.imul(f, P) | 0,
                        W = W + Math.imul(f, O) | 0,
                        t = t + Math.imul(l, x) | 0,
                        e = (e + Math.imul(l, T) | 0) + Math.imul(u, x) | 0,
                        W = W + Math.imul(u, T) | 0,
                    (G + (t = t + Math.imul(o, B) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, L) | 0) + Math.imul(s, B) | 0)) << 13) | 0)
                    , X = (G = ((W + Math.imul(s, L) | 0) + (e >>> 13) | 0) + (J >>> 26) | 0,
                        J &= 67108863,
                        t = Math.imul(v, E),
                        e = Math.imul(v, A) + Math.imul(y, E) | 0,
                        W = Math.imul(y, A),
                        t = t + Math.imul(b, C) | 0,
                        e = (e + Math.imul(b, R) | 0) + Math.imul(g, C) | 0,
                        W = W + Math.imul(g, R) | 0,
                        t = t + Math.imul(p, I) | 0,
                        e = (e + Math.imul(p, N) | 0) + Math.imul(m, I) | 0,
                        W = W + Math.imul(m, N) | 0,
                        t = t + Math.imul(d, P) | 0,
                        e = (e + Math.imul(d, O) | 0) + Math.imul(h, P) | 0,
                        W = W + Math.imul(h, O) | 0,
                        t = t + Math.imul(c, x) | 0,
                        e = (e + Math.imul(c, T) | 0) + Math.imul(f, x) | 0,
                        W = W + Math.imul(f, T) | 0,
                        t = t + Math.imul(l, B) | 0,
                        e = (e + Math.imul(l, L) | 0) + Math.imul(u, B) | 0,
                        W = W + Math.imul(u, L) | 0,
                    (G + (t = t + Math.imul(o, D) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, q) | 0) + Math.imul(s, D) | 0)) << 13) | 0)
                    , $ = (G = ((W + Math.imul(s, q) | 0) + (e >>> 13) | 0) + (X >>> 26) | 0,
                        X &= 67108863,
                        t = Math.imul(w, E),
                        e = Math.imul(w, A) + Math.imul(_, E) | 0,
                        W = Math.imul(_, A),
                        t = t + Math.imul(v, C) | 0,
                        e = (e + Math.imul(v, R) | 0) + Math.imul(y, C) | 0,
                        W = W + Math.imul(y, R) | 0,
                        t = t + Math.imul(b, I) | 0,
                        e = (e + Math.imul(b, N) | 0) + Math.imul(g, I) | 0,
                        W = W + Math.imul(g, N) | 0,
                        t = t + Math.imul(p, P) | 0,
                        e = (e + Math.imul(p, O) | 0) + Math.imul(m, P) | 0,
                        W = W + Math.imul(m, O) | 0,
                        t = t + Math.imul(d, x) | 0,
                        e = (e + Math.imul(d, T) | 0) + Math.imul(h, x) | 0,
                        W = W + Math.imul(h, T) | 0,
                        t = t + Math.imul(c, B) | 0,
                        e = (e + Math.imul(c, L) | 0) + Math.imul(f, B) | 0,
                        W = W + Math.imul(f, L) | 0,
                        t = t + Math.imul(l, D) | 0,
                        e = (e + Math.imul(l, q) | 0) + Math.imul(u, D) | 0,
                        W = W + Math.imul(u, q) | 0,
                    (G + (t = t + Math.imul(o, F) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, U) | 0) + Math.imul(s, F) | 0)) << 13) | 0)
                    , tt = (G = ((W + Math.imul(s, U) | 0) + (e >>> 13) | 0) + ($ >>> 26) | 0,
                        $ &= 67108863,
                        t = Math.imul(M, E),
                        e = Math.imul(M, A) + Math.imul(S, E) | 0,
                        W = Math.imul(S, A),
                        t = t + Math.imul(w, C) | 0,
                        e = (e + Math.imul(w, R) | 0) + Math.imul(_, C) | 0,
                        W = W + Math.imul(_, R) | 0,
                        t = t + Math.imul(v, I) | 0,
                        e = (e + Math.imul(v, N) | 0) + Math.imul(y, I) | 0,
                        W = W + Math.imul(y, N) | 0,
                        t = t + Math.imul(b, P) | 0,
                        e = (e + Math.imul(b, O) | 0) + Math.imul(g, P) | 0,
                        W = W + Math.imul(g, O) | 0,
                        t = t + Math.imul(p, x) | 0,
                        e = (e + Math.imul(p, T) | 0) + Math.imul(m, x) | 0,
                        W = W + Math.imul(m, T) | 0,
                        t = t + Math.imul(d, B) | 0,
                        e = (e + Math.imul(d, L) | 0) + Math.imul(h, B) | 0,
                        W = W + Math.imul(h, L) | 0,
                        t = t + Math.imul(c, D) | 0,
                        e = (e + Math.imul(c, q) | 0) + Math.imul(f, D) | 0,
                        W = W + Math.imul(f, q) | 0,
                        t = t + Math.imul(l, F) | 0,
                        e = (e + Math.imul(l, U) | 0) + Math.imul(u, F) | 0,
                        W = W + Math.imul(u, U) | 0,
                    (G + (t = t + Math.imul(o, V) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, z) | 0) + Math.imul(s, V) | 0)) << 13) | 0);
                G = ((W + Math.imul(s, z) | 0) + (e >>> 13) | 0) + (tt >>> 26) | 0,
                    tt &= 67108863,
                    t = Math.imul(k, E),
                    e = Math.imul(k, A) + Math.imul(i, E) | 0,
                    W = Math.imul(i, A),
                    t = t + Math.imul(M, C) | 0,
                    e = (e + Math.imul(M, R) | 0) + Math.imul(S, C) | 0,
                    W = W + Math.imul(S, R) | 0,
                    t = t + Math.imul(w, I) | 0,
                    e = (e + Math.imul(w, N) | 0) + Math.imul(_, I) | 0,
                    W = W + Math.imul(_, N) | 0,
                    t = t + Math.imul(v, P) | 0,
                    e = (e + Math.imul(v, O) | 0) + Math.imul(y, P) | 0,
                    W = W + Math.imul(y, O) | 0,
                    t = t + Math.imul(b, x) | 0,
                    e = (e + Math.imul(b, T) | 0) + Math.imul(g, x) | 0,
                    W = W + Math.imul(g, T) | 0,
                    t = t + Math.imul(p, B) | 0,
                    e = (e + Math.imul(p, L) | 0) + Math.imul(m, B) | 0,
                    W = W + Math.imul(m, L) | 0,
                    t = t + Math.imul(d, D) | 0,
                    e = (e + Math.imul(d, q) | 0) + Math.imul(h, D) | 0,
                    W = W + Math.imul(h, q) | 0,
                    t = t + Math.imul(c, F) | 0,
                    e = (e + Math.imul(c, U) | 0) + Math.imul(f, F) | 0,
                    W = W + Math.imul(f, U) | 0,
                    t = t + Math.imul(l, V) | 0,
                    e = (e + Math.imul(l, z) | 0) + Math.imul(u, V) | 0,
                    W = W + Math.imul(u, z) | 0,
                    E = (G + (t = t + Math.imul(o, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, r) | 0) + Math.imul(s, j) | 0)) << 13) | 0,
                    G = ((W + Math.imul(s, r) | 0) + (e >>> 13) | 0) + (E >>> 26) | 0,
                    E &= 67108863,
                    t = Math.imul(k, C),
                    e = Math.imul(k, R) + Math.imul(i, C) | 0,
                    W = Math.imul(i, R),
                    t = t + Math.imul(M, I) | 0,
                    e = (e + Math.imul(M, N) | 0) + Math.imul(S, I) | 0,
                    W = W + Math.imul(S, N) | 0,
                    t = t + Math.imul(w, P) | 0,
                    e = (e + Math.imul(w, O) | 0) + Math.imul(_, P) | 0,
                    W = W + Math.imul(_, O) | 0,
                    t = t + Math.imul(v, x) | 0,
                    e = (e + Math.imul(v, T) | 0) + Math.imul(y, x) | 0,
                    W = W + Math.imul(y, T) | 0,
                    t = t + Math.imul(b, B) | 0,
                    e = (e + Math.imul(b, L) | 0) + Math.imul(g, B) | 0,
                    W = W + Math.imul(g, L) | 0,
                    t = t + Math.imul(p, D) | 0,
                    e = (e + Math.imul(p, q) | 0) + Math.imul(m, D) | 0,
                    W = W + Math.imul(m, q) | 0,
                    t = t + Math.imul(d, F) | 0,
                    e = (e + Math.imul(d, U) | 0) + Math.imul(h, F) | 0,
                    W = W + Math.imul(h, U) | 0,
                    t = t + Math.imul(c, V) | 0,
                    e = (e + Math.imul(c, z) | 0) + Math.imul(f, V) | 0,
                    W = W + Math.imul(f, z) | 0,
                    A = (G + (t = t + Math.imul(l, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(l, r) | 0) + Math.imul(u, j) | 0)) << 13) | 0,
                    G = ((W + Math.imul(u, r) | 0) + (e >>> 13) | 0) + (A >>> 26) | 0,
                    A &= 67108863,
                    t = Math.imul(k, I),
                    e = Math.imul(k, N) + Math.imul(i, I) | 0,
                    W = Math.imul(i, N),
                    t = t + Math.imul(M, P) | 0,
                    e = (e + Math.imul(M, O) | 0) + Math.imul(S, P) | 0,
                    W = W + Math.imul(S, O) | 0,
                    t = t + Math.imul(w, x) | 0,
                    e = (e + Math.imul(w, T) | 0) + Math.imul(_, x) | 0,
                    W = W + Math.imul(_, T) | 0,
                    t = t + Math.imul(v, B) | 0,
                    e = (e + Math.imul(v, L) | 0) + Math.imul(y, B) | 0,
                    W = W + Math.imul(y, L) | 0,
                    t = t + Math.imul(b, D) | 0,
                    e = (e + Math.imul(b, q) | 0) + Math.imul(g, D) | 0,
                    W = W + Math.imul(g, q) | 0,
                    t = t + Math.imul(p, F) | 0,
                    e = (e + Math.imul(p, U) | 0) + Math.imul(m, F) | 0,
                    W = W + Math.imul(m, U) | 0,
                    t = t + Math.imul(d, V) | 0,
                    e = (e + Math.imul(d, z) | 0) + Math.imul(h, V) | 0,
                    W = W + Math.imul(h, z) | 0,
                    o = (G + (t = t + Math.imul(c, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(c, r) | 0) + Math.imul(f, j) | 0)) << 13) | 0,
                    G = ((W + Math.imul(f, r) | 0) + (e >>> 13) | 0) + (o >>> 26) | 0,
                    o &= 67108863,
                    t = Math.imul(k, P),
                    e = Math.imul(k, O) + Math.imul(i, P) | 0,
                    W = Math.imul(i, O),
                    t = t + Math.imul(M, x) | 0,
                    e = (e + Math.imul(M, T) | 0) + Math.imul(S, x) | 0,
                    W = W + Math.imul(S, T) | 0,
                    t = t + Math.imul(w, B) | 0,
                    e = (e + Math.imul(w, L) | 0) + Math.imul(_, B) | 0,
                    W = W + Math.imul(_, L) | 0,
                    t = t + Math.imul(v, D) | 0,
                    e = (e + Math.imul(v, q) | 0) + Math.imul(y, D) | 0,
                    W = W + Math.imul(y, q) | 0,
                    t = t + Math.imul(b, F) | 0,
                    e = (e + Math.imul(b, U) | 0) + Math.imul(g, F) | 0,
                    W = W + Math.imul(g, U) | 0,
                    t = t + Math.imul(p, V) | 0,
                    e = (e + Math.imul(p, z) | 0) + Math.imul(m, V) | 0,
                    W = W + Math.imul(m, z) | 0,
                s = (G + (t = t + Math.imul(d, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(d, r) | 0) + Math.imul(h, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(h, r) | 0) + (e >>> 13) | 0) + (s >>> 26) | 0,
                s &= 67108863,
                t = Math.imul(k, x),
                e = Math.imul(k, T) + Math.imul(i, x) | 0,
                W = Math.imul(i, T),
                t = t + Math.imul(M, B) | 0,
                e = (e + Math.imul(M, L) | 0) + Math.imul(S, B) | 0,
                W = W + Math.imul(S, L) | 0,
                t = t + Math.imul(w, D) | 0,
                e = (e + Math.imul(w, q) | 0) + Math.imul(_, D) | 0,
                W = W + Math.imul(_, q) | 0,
                t = t + Math.imul(v, F) | 0,
                e = (e + Math.imul(v, U) | 0) + Math.imul(y, F) | 0,
                W = W + Math.imul(y, U) | 0,
                t = t + Math.imul(b, V) | 0,
                e = (e + Math.imul(b, z) | 0) + Math.imul(g, V) | 0,
                W = W + Math.imul(g, z) | 0,
                C = (G + (t = t + Math.imul(p, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(p, r) | 0) + Math.imul(m, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(m, r) | 0) + (e >>> 13) | 0) + (C >>> 26) | 0,
                C &= 67108863,
                t = Math.imul(k, B),
                e = Math.imul(k, L) + Math.imul(i, B) | 0,
                W = Math.imul(i, L),
                t = t + Math.imul(M, D) | 0,
                e = (e + Math.imul(M, q) | 0) + Math.imul(S, D) | 0,
                W = W + Math.imul(S, q) | 0,
                t = t + Math.imul(w, F) | 0,
                e = (e + Math.imul(w, U) | 0) + Math.imul(_, F) | 0,
                W = W + Math.imul(_, U) | 0,
                t = t + Math.imul(v, V) | 0,
                e = (e + Math.imul(v, z) | 0) + Math.imul(y, V) | 0,
                W = W + Math.imul(y, z) | 0,
                R = (G + (t = t + Math.imul(b, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(b, r) | 0) + Math.imul(g, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(g, r) | 0) + (e >>> 13) | 0) + (R >>> 26) | 0,
                R &= 67108863,
                t = Math.imul(k, D),
                e = Math.imul(k, q) + Math.imul(i, D) | 0,
                W = Math.imul(i, q),
                t = t + Math.imul(M, F) | 0,
                e = (e + Math.imul(M, U) | 0) + Math.imul(S, F) | 0,
                W = W + Math.imul(S, U) | 0,
                t = t + Math.imul(w, V) | 0,
                e = (e + Math.imul(w, z) | 0) + Math.imul(_, V) | 0,
                W = W + Math.imul(_, z) | 0,
                l = (G + (t = t + Math.imul(v, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(v, r) | 0) + Math.imul(y, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(y, r) | 0) + (e >>> 13) | 0) + (l >>> 26) | 0,
                l &= 67108863,
                t = Math.imul(k, F),
                e = Math.imul(k, U) + Math.imul(i, F) | 0,
                W = Math.imul(i, U),
                t = t + Math.imul(M, V) | 0,
                e = (e + Math.imul(M, z) | 0) + Math.imul(S, V) | 0,
                W = W + Math.imul(S, z) | 0,
                u = (G + (t = t + Math.imul(w, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(w, r) | 0) + Math.imul(_, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(_, r) | 0) + (e >>> 13) | 0) + (u >>> 26) | 0,
                u &= 67108863,
                t = Math.imul(k, V),
                e = Math.imul(k, z) + Math.imul(i, V) | 0,
                W = Math.imul(i, z),
                I = (G + (t = t + Math.imul(M, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(M, r) | 0) + Math.imul(S, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(S, r) | 0) + (e >>> 13) | 0) + (I >>> 26) | 0,
                I &= 67108863,
                N = (G + (t = Math.imul(k, j)) | 0) + ((8191 & (e = Math.imul(k, r) + Math.imul(i, j) | 0)) << 13) | 0;
                return G = (Math.imul(i, r) + (e >>> 13) | 0) + (N >>> 26) | 0,
                    N &= 67108863,
                    a[0] = Y,
                    a[1] = H,
                    a[2] = K,
                    a[3] = Z,
                    a[4] = Q,
                    a[5] = J,
                    a[6] = X,
                    a[7] = $,
                    a[8] = tt,
                    a[9] = E,
                    a[10] = A,
                    a[11] = o,
                    a[12] = s,
                    a[13] = C,
                    a[14] = R,
                    a[15] = l,
                    a[16] = u,
                    a[17] = I,
                    a[18] = N,
                0 != G && (a[19] = G,
                    n.length++),
                    n
            };

            function p(t, e, n) {
                return (new m).mulp(t, e, n)
            }

            function m(t, e) {
                this.x = t,
                    this.y = e
            }

            Math.imul || (h = d),
                a.prototype.mulTo = function (t, e) {
                    var n = this.length + t.length;
                    return (10 === this.length && 10 === t.length ? h : n < 63 ? d : n < 1024 ? function (t, e, n) {
                            n.negative = e.negative ^ t.negative,
                                n.length = t.length + e.length;
                            for (var i = 0, r = 0, a = 0; a < n.length - 1; a++) {
                                for (var o = r, s = (r = 0,
                                67108863 & i), l = Math.min(a, e.length - 1), u = Math.max(0, a - t.length + 1); u <= l; u++) {
                                    var c, f = (0 | t.words[a - u]) * (0 | e.words[u]);
                                    s = 67108863 & (c = (67108863 & f) + s | 0);
                                    r += (o = (o = o + (f / 67108864 | 0) | 0) + (c >>> 26) | 0) >>> 26,
                                        o &= 67108863
                                }
                                n.words[a] = s,
                                    i = o,
                                    o = r
                            }
                            return 0 !== i ? n.words[a] = i : n.length--,
                                n.strip()
                        }
                        : p)(this, t, e)
                }
                ,
                m.prototype.makeRBT = function (t) {
                    for (var e = new Array(t), n = a.prototype._countBits(t) - 1, i = 0; i < t; i++)
                        e[i] = this.revBin(i, n, t);
                    return e
                }
                ,
                m.prototype.revBin = function (t, e, n) {
                    if (0 === t || t === n - 1)
                        return t;
                    for (var i = 0, r = 0; r < e; r++)
                        i |= (1 & t) << e - r - 1,
                            t >>= 1;
                    return i
                }
                ,
                m.prototype.permute = function (t, e, n, i, r, a) {
                    for (var o = 0; o < a; o++)
                        i[o] = e[t[o]],
                            r[o] = n[t[o]]
                }
                ,
                m.prototype.transform = function (t, e, n, i, r, a) {
                    this.permute(a, t, e, n, i, r);
                    for (var o = 1; o < r; o <<= 1)
                        for (var s = o << 1, l = Math.cos(2 * Math.PI / s), u = Math.sin(2 * Math.PI / s), c = 0; c < r; c += s)
                            for (var f = l, d = u, h = 0; h < o; h++) {
                                var p = n[c + h]
                                    , m = i[c + h]
                                    , b = n[c + h + o]
                                    , g = f * b - d * (v = i[c + h + o])
                                    , v = f * v + d * b;
                                n[c + h] = p + (b = g),
                                    i[c + h] = m + v,
                                    n[c + h + o] = p - b,
                                    i[c + h + o] = m - v,
                                h !== s && (g = l * f - u * d,
                                    d = l * d + u * f,
                                    f = g)
                            }
                }
                ,
                m.prototype.guessLen13b = function (t, e) {
                    e = 1 & (i = 1 | Math.max(e, t));
                    for (var n = 0, i = i / 2 | 0; i; i >>>= 1)
                        n++;
                    return 1 << n + 1 + e
                }
                ,
                m.prototype.conjugate = function (t, e, n) {
                    if (!(n <= 1))
                        for (var i = 0; i < n / 2; i++) {
                            var r = t[i];
                            t[i] = t[n - i - 1],
                                t[n - i - 1] = r,
                                r = e[i],
                                e[i] = -e[n - i - 1],
                                e[n - i - 1] = -r
                        }
                }
                ,
                m.prototype.normalize13b = function (t, e) {
                    for (var n = 0, i = 0; i < e / 2; i++) {
                        var r = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + n;
                        t[i] = 67108863 & r,
                            n = r < 67108864 ? 0 : r / 67108864 | 0
                    }
                    return t
                }
                ,
                m.prototype.convert13b = function (t, e, n, r) {
                    for (var a = 0, o = 0; o < e; o++)
                        a += 0 | t[o],
                            n[2 * o] = 8191 & a,
                            n[2 * o + 1] = 8191 & (a >>>= 13),
                            a >>>= 13;
                    for (o = 2 * e; o < r; ++o)
                        n[o] = 0;
                    i(0 === a),
                        i(0 == (-8192 & a))
                }
                ,
                m.prototype.stub = function (t) {
                    for (var e = new Array(t), n = 0; n < t; n++)
                        e[n] = 0;
                    return e
                }
                ,
                m.prototype.mulp = function (t, e, n) {
                    var i = 2 * this.guessLen13b(t.length, e.length)
                        , r = this.makeRBT(i)
                        , a = this.stub(i)
                        , o = new Array(i)
                        , s = new Array(i)
                        , l = new Array(i)
                        , u = new Array(i)
                        , c = new Array(i)
                        , f = new Array(i)
                        , d = n.words;
                    d.length = i,
                        this.convert13b(t.words, t.length, o, i),
                        this.convert13b(e.words, e.length, u, i),
                        this.transform(o, a, s, l, i, r),
                        this.transform(u, a, c, f, i, r);
                    for (var h = 0; h < i; h++) {
                        var p = s[h] * c[h] - l[h] * f[h];
                        l[h] = s[h] * f[h] + l[h] * c[h],
                            s[h] = p
                    }
                    return this.conjugate(s, l, i),
                        this.transform(s, l, d, a, i, r),
                        this.conjugate(d, a, i),
                        this.normalize13b(d, i),
                        n.negative = t.negative ^ e.negative,
                        n.length = t.length + e.length,
                        n.strip()
                }
                ,
                a.prototype.mul = function (t) {
                    var e = new a(null);
                    return e.words = new Array(this.length + t.length),
                        this.mulTo(t, e)
                }
                ,
                a.prototype.mulf = function (t) {
                    var e = new a(null);
                    return e.words = new Array(this.length + t.length),
                        p(this, t, e)
                }
                ,
                a.prototype.imul = function (t) {
                    return this.clone().mulTo(t, this)
                }
                ,
                a.prototype.imuln = function (t) {
                    i("number" == typeof t),
                        i(t < 67108864);
                    for (var e = 0, n = 0; n < this.length; n++) {
                        var r = (0 | this.words[n]) * t
                            , a = (67108863 & r) + (67108863 & e);
                        e = (e >>= 26) + (r / 67108864 | 0) + (a >>> 26);
                        this.words[n] = 67108863 & a
                    }
                    return 0 !== e && (this.words[n] = e,
                        this.length++),
                        this
                }
                ,
                a.prototype.muln = function (t) {
                    return this.clone().imuln(t)
                }
                ,
                a.prototype.sqr = function () {
                    return this.mul(this)
                }
                ,
                a.prototype.isqr = function () {
                    return this.imul(this.clone())
                }
                ,
                a.prototype.pow = function (t) {
                    var e = function (t) {
                        for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++) {
                            var i = n % 26;
                            e[n] = (t.words[n / 26 | 0] & 1 << i) >>> i
                        }
                        return e
                    }(t);
                    if (0 === e.length)
                        return new a(1);
                    for (var n = this, i = 0; i < e.length && 0 === e[i]; i++,
                        n = n.sqr())
                        ;
                    if (++i < e.length)
                        for (var r = n.sqr(); i < e.length; i++,
                            r = r.sqr())
                            0 !== e[i] && (n = n.mul(r));
                    return n
                }
                ,
                a.prototype.iushln = function (t) {
                    i("number" == typeof t && 0 <= t);
                    var e = t % 26
                        , n = (t - e) / 26
                        , r = 67108863 >>> 26 - e << 26 - e;
                    if (0 != e) {
                        for (var a = 0, o = 0; o < this.length; o++) {
                            var s = this.words[o] & r
                                , l = (0 | this.words[o]) - s << e;
                            this.words[o] = l | a,
                                a = s >>> 26 - e
                        }
                        a && (this.words[o] = a,
                            this.length++)
                    }
                    if (0 != n) {
                        for (o = this.length - 1; 0 <= o; o--)
                            this.words[o + n] = this.words[o];
                        for (o = 0; o < n; o++)
                            this.words[o] = 0;
                        this.length += n
                    }
                    return this.strip()
                }
                ,
                a.prototype.ishln = function (t) {
                    return i(0 === this.negative),
                        this.iushln(t)
                }
                ,
                a.prototype.iushrn = function (t, e, n) {
                    i("number" == typeof t && 0 <= t),
                        r = e ? (e - e % 26) / 26 : 0;
                    var r, a = t % 26, o = Math.min((t - a) / 26, this.length),
                        s = 67108863 ^ 67108863 >>> a << a, l = n;
                    if (r -= o,
                        r = Math.max(0, r),
                        l) {
                        for (var u = 0; u < o; u++)
                            l.words[u] = this.words[u];
                        l.length = o
                    }
                    if (0 !== o)
                        if (this.length > o)
                            for (this.length -= o,
                                     u = 0; u < this.length; u++)
                                this.words[u] = this.words[u + o];
                        else
                            this.words[0] = 0,
                                this.length = 1;
                    var c = 0;
                    for (u = this.length - 1; 0 <= u && (0 !== c || r <= u); u--) {
                        var f = 0 | this.words[u];
                        this.words[u] = c << 26 - a | f >>> a,
                            c = f & s
                    }
                    return l && 0 !== c && (l.words[l.length++] = c),
                    0 === this.length && (this.words[0] = 0,
                        this.length = 1),
                        this.strip()
                }
                ,
                a.prototype.ishrn = function (t, e, n) {
                    return i(0 === this.negative),
                        this.iushrn(t, e, n)
                }
                ,
                a.prototype.shln = function (t) {
                    return this.clone().ishln(t)
                }
                ,
                a.prototype.ushln = function (t) {
                    return this.clone().iushln(t)
                }
                ,
                a.prototype.shrn = function (t) {
                    return this.clone().ishrn(t)
                }
                ,
                a.prototype.ushrn = function (t) {
                    return this.clone().iushrn(t)
                }
                ,
                a.prototype.testn = function (t) {
                    i("number" == typeof t && 0 <= t);
                    var e = t % 26;
                    t = (t - e) / 26;
                    return !(this.length <= t || !(this.words[t] & 1 << e))
                }
                ,
                a.prototype.imaskn = function (t) {
                    i("number" == typeof t && 0 <= t);
                    var e = t % 26;
                    t = (t - e) / 26;
                    return i(0 === this.negative, "imaskn works only with positive numbers"),
                        this.length <= t ? this : (0 != e && t++,
                            this.length = Math.min(t, this.length),
                        0 != e && (this.words[this.length - 1] &= 67108863 ^ 67108863 >>> e << e),
                            this.strip())
                }
                ,
                a.prototype.maskn = function (t) {
                    return this.clone().imaskn(t)
                }
                ,
                a.prototype.iaddn = function (t) {
                    return i("number" == typeof t),
                        i(t < 67108864),
                        t < 0 ? this.isubn(-t) : 0 !== this.negative ? (1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]),
                            this.negative = 0) : (this.negative = 0,
                            this.isubn(t),
                            this.negative = 1),
                            this) : this._iaddn(t)
                }
                ,
                a.prototype._iaddn = function (t) {
                    this.words[0] += t;
                    for (var e = 0; e < this.length && 67108864 <= this.words[e]; e++)
                        this.words[e] -= 67108864,
                            e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                    return this.length = Math.max(this.length, e + 1),
                        this
                }
                ,
                a.prototype.isubn = function (t) {
                    if (i("number" == typeof t),
                        i(t < 67108864),
                    t < 0)
                        return this.iaddn(-t);
                    if (0 !== this.negative)
                        return this.negative = 0,
                            this.iaddn(t),
                            this.negative = 1,
                            this;
                    if (this.words[0] -= t,
                    1 === this.length && this.words[0] < 0)
                        this.words[0] = -this.words[0],
                            this.negative = 1;
                    else
                        for (var e = 0; e < this.length && this.words[e] < 0; e++)
                            this.words[e] += 67108864,
                                --this.words[e + 1];
                    return this.strip()
                }
                ,
                a.prototype.addn = function (t) {
                    return this.clone().iaddn(t)
                }
                ,
                a.prototype.subn = function (t) {
                    return this.clone().isubn(t)
                }
                ,
                a.prototype.iabs = function () {
                    return this.negative = 0,
                        this
                }
                ,
                a.prototype.abs = function () {
                    return this.clone().iabs()
                }
                ,
                a.prototype._ishlnsubmul = function (t, e, n) {
                    for (var r = t.length + n, a = (this._expand(r),
                        0), o = 0; o < t.length; o++) {
                        var s = (0 | this.words[o + n]) + a
                            , l = (0 | t.words[o]) * e;
                        a = ((s -= 67108863 & l) >> 26) - (l / 67108864 | 0);
                        this.words[o + n] = 67108863 & s
                    }
                    for (; o < this.length - n; o++)
                        a = (s = (0 | this.words[o + n]) + a) >> 26,
                            this.words[o + n] = 67108863 & s;
                    if (0 === a)
                        return this.strip();
                    for (i(-1 === a),
                             o = a = 0; o < this.length; o++)
                        a = (s = -(0 | this.words[o]) + a) >> 26,
                            this.words[o] = 67108863 & s;
                    return this.negative = 1,
                        this.strip()
                }
                ,
                a.prototype._wordDiv = function (t, e) {
                    this.length,
                        t.length;
                    var n = this.clone()
                        , i = t
                        , r = 0 | i.words[i.length - 1];
                    0 != (t = 26 - this._countBits(r)) && (i = i.ushln(t),
                        n.iushln(t),
                        r = 0 | i.words[i.length - 1]);
                    var o, s = n.length - i.length;
                    if ("mod" !== e) {
                        (o = new a(null)).length = 1 + s,
                            o.words = new Array(o.length);
                        for (var l = 0; l < o.length; l++)
                            o.words[l] = 0
                    }
                    var u = n.clone()._ishlnsubmul(i, 1, s);
                    0 === u.negative && (n = u,
                    o && (o.words[s] = 1));
                    for (var c = s - 1; 0 <= c; c--) {
                        var f = 67108864 * (0 | n.words[i.length + c]) + (0 | n.words[i.length + c - 1]);
                        f = Math.min(f / r | 0, 67108863);
                        for (n._ishlnsubmul(i, f, c); 0 !== n.negative;)
                            f--,
                                n.negative = 0,
                                n._ishlnsubmul(i, 1, c),
                            n.isZero() || (n.negative ^= 1);
                        o && (o.words[c] = f)
                    }
                    return o && o.strip(),
                        n.strip(),
                    "div" !== e && 0 != t && n.iushrn(t),
                        {
                            div: o || null,
                            mod: n
                        }
                }
                ,
                a.prototype.divmod = function (t, e, n) {
                    return i(!t.isZero()),
                        this.isZero() ? {
                            div: new a(0),
                            mod: new a(0)
                        } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e),
                        "mod" !== e && (r = s.div.neg()),
                        "div" !== e && (o = s.mod.neg(),
                        n && 0 !== o.negative && o.iadd(t)),
                            {
                                div: r,
                                mod: o
                            }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e),
                            {
                                div: r = "mod" !== e ? s.div.neg() : r,
                                mod: s.mod
                            }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e),
                        "div" !== e && (o = s.mod.neg(),
                        n && 0 !== o.negative && o.isub(t)),
                            {
                                div: s.div,
                                mod: o
                            }) : t.length > this.length || this.cmp(t) < 0 ? {
                            div: new a(0),
                            mod: this
                        } : 1 === t.length ? "div" === e ? {
                            div: this.divn(t.words[0]),
                            mod: null
                        } : "mod" === e ? {
                            div: null,
                            mod: new a(this.modn(t.words[0]))
                        } : {
                            div: this.divn(t.words[0]),
                            mod: new a(this.modn(t.words[0]))
                        } : this._wordDiv(t, e);
                    var r, o, s
                }
                ,
                a.prototype.div = function (t) {
                    return this.divmod(t, "div", !1).div
                }
                ,
                a.prototype.mod = function (t) {
                    return this.divmod(t, "mod", !1).mod
                }
                ,
                a.prototype.umod = function (t) {
                    return this.divmod(t, "mod", !0).mod
                }
                ,
                a.prototype.divRound = function (t) {
                    var e = this.divmod(t);
                    if (e.mod.isZero())
                        return e.div;
                    var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod
                        , i = t.ushrn(1);
                    t = t.andln(1);
                    return (n = n.cmp(i)) < 0 || 1 === t && 0 === n ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                }
                ,
                a.prototype.modn = function (t) {
                    i(t <= 67108863);
                    for (var e = (1 << 26) % t, n = 0, r = this.length - 1; 0 <= r; r--)
                        n = (e * n + (0 | this.words[r])) % t;
                    return n
                }
                ,
                a.prototype.idivn = function (t) {
                    i(t <= 67108863);
                    for (var e = 0, n = this.length - 1; 0 <= n; n--) {
                        var r = (0 | this.words[n]) + 67108864 * e;
                        this.words[n] = r / t | 0,
                            e = r % t
                    }
                    return this.strip()
                }
                ,
                a.prototype.divn = function (t) {
                    return this.clone().idivn(t)
                }
                ,
                a.prototype.egcd = function (t) {
                    i(0 === t.negative),
                        i(!t.isZero());
                    for (var e = this, n = t.clone(), r = (e = 0 !== e.negative ? e.umod(t) : e.clone(),
                        new a(1)), o = new a(0), s = new a(0), l = new a(1), u = 0; e.isEven() && n.isEven();)
                        e.iushrn(1),
                            n.iushrn(1),
                            ++u;
                    for (var c = n.clone(), f = e.clone(); !e.isZero();) {
                        for (var d = 0, h = 1; 0 == (e.words[0] & h) && d < 26; ++d,
                            h <<= 1)
                            ;
                        if (0 < d)
                            for (e.iushrn(d); 0 < d--;)
                                (r.isOdd() || o.isOdd()) && (r.iadd(c),
                                    o.isub(f)),
                                    r.iushrn(1),
                                    o.iushrn(1);
                        for (var p = 0, m = 1; 0 == (n.words[0] & m) && p < 26; ++p,
                            m <<= 1)
                            ;
                        if (0 < p)
                            for (n.iushrn(p); 0 < p--;)
                                (s.isOdd() || l.isOdd()) && (s.iadd(c),
                                    l.isub(f)),
                                    s.iushrn(1),
                                    l.iushrn(1);
                        0 <= e.cmp(n) ? (e.isub(n),
                            r.isub(s),
                            o.isub(l)) : (n.isub(e),
                            s.isub(r),
                            l.isub(o))
                    }
                    return {
                        a: s,
                        b: l,
                        gcd: n.iushln(u)
                    }
                }
                ,
                a.prototype._invmp = function (t) {
                    i(0 === t.negative),
                        i(!t.isZero());
                    for (var e, n = this, r = t.clone(), o = (n = 0 !== n.negative ? n.umod(t) : n.clone(),
                        new a(1)), s = new a(0), l = r.clone(); 0 < n.cmpn(1) && 0 < r.cmpn(1);) {
                        for (var u = 0, c = 1; 0 == (n.words[0] & c) && u < 26; ++u,
                            c <<= 1)
                            ;
                        if (0 < u)
                            for (n.iushrn(u); 0 < u--;)
                                o.isOdd() && o.iadd(l),
                                    o.iushrn(1);
                        for (var f = 0, d = 1; 0 == (r.words[0] & d) && f < 26; ++f,
                            d <<= 1)
                            ;
                        if (0 < f)
                            for (r.iushrn(f); 0 < f--;)
                                s.isOdd() && s.iadd(l),
                                    s.iushrn(1);
                        0 <= n.cmp(r) ? (n.isub(r),
                            o.isub(s)) : (r.isub(n),
                            s.isub(o))
                    }
                    return (e = 0 === n.cmpn(1) ? o : s).cmpn(0) < 0 && e.iadd(t),
                        e
                }
                ,
                a.prototype.gcd = function (t) {
                    if (this.isZero())
                        return t.abs();
                    if (t.isZero())
                        return this.abs();
                    var e = this.clone()
                        , n = t.clone();
                    e.negative = 0;
                    for (var i = n.negative = 0; e.isEven() && n.isEven(); i++)
                        e.iushrn(1),
                            n.iushrn(1);
                    for (; ;) {
                        for (; e.isEven();)
                            e.iushrn(1);
                        for (; n.isEven();)
                            n.iushrn(1);
                        var r = e.cmp(n);
                        if (r < 0) {
                            var a = e;
                            e = n,
                                n = a
                        } else if (0 === r || 0 === n.cmpn(1))
                            break;
                        e.isub(n)
                    }
                    return n.iushln(i)
                }
                ,
                a.prototype.invm = function (t) {
                    return this.egcd(t).a.umod(t)
                }
                ,
                a.prototype.isEven = function () {
                    return 0 == (1 & this.words[0])
                }
                ,
                a.prototype.isOdd = function () {
                    return 1 == (1 & this.words[0])
                }
                ,
                a.prototype.andln = function (t) {
                    return this.words[0] & t
                }
                ,
                a.prototype.bincn = function (t) {
                    i("number" == typeof t);
                    t = (t - (e = t % 26)) / 26;
                    var e = 1 << e;
                    if (this.length <= t)
                        return this._expand(1 + t),
                            this.words[t] |= e,
                            this;
                    for (var n = e, r = t; 0 !== n && r < this.length; r++) {
                        var a = 0 | this.words[r];
                        n = (a += n) >>> 26;
                        a &= 67108863,
                            this.words[r] = a
                    }
                    return 0 !== n && (this.words[r] = n,
                        this.length++),
                        this
                }
                ,
                a.prototype.isZero = function () {
                    return 1 === this.length && 0 === this.words[0]
                }
                ,
                a.prototype.cmpn = function (t) {
                    var e = t < 0;
                    return 0 === this.negative || e ? 0 === this.negative && e ? 1 : (this.strip(),
                        e = 1 < this.length ? 1 : (i((t = e ? -t : t) <= 67108863, "Number is too big"),
                            (e = 0 | this.words[0]) === t ? 0 : e < t ? -1 : 1),
                        0 !== this.negative ? 0 | -e : e) : -1
                }
                ,
                a.prototype.cmp = function (t) {
                    return 0 !== this.negative && 0 === t.negative ? -1 : 0 === this.negative && 0 !== t.negative ? 1 : (t = this.ucmp(t),
                        0 !== this.negative ? 0 | -t : t)
                }
                ,
                a.prototype.ucmp = function (t) {
                    if (this.length > t.length)
                        return 1;
                    if (this.length < t.length)
                        return -1;
                    for (var e = 0, n = this.length - 1; 0 <= n; n--) {
                        var i = 0 | this.words[n]
                            , r = 0 | t.words[n];
                        if (i != r) {
                            i < r ? e = -1 : r < i && (e = 1);
                            break
                        }
                    }
                    return e
                }
                ,
                a.prototype.gtn = function (t) {
                    return 1 === this.cmpn(t)
                }
                ,
                a.prototype.gt = function (t) {
                    return 1 === this.cmp(t)
                }
                ,
                a.prototype.gten = function (t) {
                    return 0 <= this.cmpn(t)
                }
                ,
                a.prototype.gte = function (t) {
                    return 0 <= this.cmp(t)
                }
                ,
                a.prototype.ltn = function (t) {
                    return -1 === this.cmpn(t)
                }
                ,
                a.prototype.lt = function (t) {
                    return -1 === this.cmp(t)
                }
                ,
                a.prototype.lten = function (t) {
                    return this.cmpn(t) <= 0
                }
                ,
                a.prototype.lte = function (t) {
                    return this.cmp(t) <= 0
                }
                ,
                a.prototype.eqn = function (t) {
                    return 0 === this.cmpn(t)
                }
                ,
                a.prototype.eq = function (t) {
                    return 0 === this.cmp(t)
                }
                ,
                a.red = function (t) {
                    return new M(t)
                }
                ,
                a.prototype.toRed = function (t) {
                    return i(!this.red, "Already a number in reduction context"),
                        i(0 === this.negative, "red works only with positives"),
                        t.convertTo(this)._forceRed(t)
                }
                ,
                a.prototype.fromRed = function () {
                    return i(this.red, "fromRed works only with numbers in reduction context"),
                        this.red.convertFrom(this)
                }
                ,
                a.prototype._forceRed = function (t) {
                    return this.red = t,
                        this
                }
                ,
                a.prototype.forceRed = function (t) {
                    return i(!this.red, "Already a number in reduction context"),
                        this._forceRed(t)
                }
                ,
                a.prototype.redAdd = function (t) {
                    return i(this.red, "redAdd works only with red numbers"),
                        this.red.add(this, t)
                }
                ,
                a.prototype.redIAdd = function (t) {
                    return i(this.red, "redIAdd works only with red numbers"),
                        this.red.iadd(this, t)
                }
                ,
                a.prototype.redSub = function (t) {
                    return i(this.red, "redSub works only with red numbers"),
                        this.red.sub(this, t)
                }
                ,
                a.prototype.redISub = function (t) {
                    return i(this.red, "redISub works only with red numbers"),
                        this.red.isub(this, t)
                }
                ,
                a.prototype.redShl = function (t) {
                    return i(this.red, "redShl works only with red numbers"),
                        this.red.shl(this, t)
                }
                ,
                a.prototype.redMul = function (t) {
                    return i(this.red, "redMul works only with red numbers"),
                        this.red._verify2(this, t),
                        this.red.mul(this, t)
                }
                ,
                a.prototype.redIMul = function (t) {
                    return i(this.red, "redMul works only with red numbers"),
                        this.red._verify2(this, t),
                        this.red.imul(this, t)
                }
                ,
                a.prototype.redSqr = function () {
                    return i(this.red, "redSqr works only with red numbers"),
                        this.red._verify1(this),
                        this.red.sqr(this)
                }
                ,
                a.prototype.redISqr = function () {
                    return i(this.red, "redISqr works only with red numbers"),
                        this.red._verify1(this),
                        this.red.isqr(this)
                }
                ,
                a.prototype.redSqrt = function () {
                    return i(this.red, "redSqrt works only with red numbers"),
                        this.red._verify1(this),
                        this.red.sqrt(this)
                }
                ,
                a.prototype.redInvm = function () {
                    return i(this.red, "redInvm works only with red numbers"),
                        this.red._verify1(this),
                        this.red.invm(this)
                }
                ,
                a.prototype.redNeg = function () {
                    return i(this.red, "redNeg works only with red numbers"),
                        this.red._verify1(this),
                        this.red.neg(this)
                }
                ,
                a.prototype.redPow = function (t) {
                    return i(this.red && !t.red, "redPow(normalNum)"),
                        this.red._verify1(this),
                        this.red.pow(this, t)
                }
            ;
            var b = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function g(t, e) {
                this.name = t,
                    this.p = new a(e, 16),
                    this.n = this.p.bitLength(),
                    this.k = new a(1).iushln(this.n).isub(this.p),
                    this.tmp = this._tmp()
            }

            function v() {
                g.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function y() {
                g.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function w() {
                g.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function _() {
                g.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function M(t) {
                var e;
                "string" == typeof t ? (e = a._prime(t),
                    this.m = e.p,
                    this.prime = e) : (i(t.gtn(1), "modulus must be greater than 1"),
                    this.m = t,
                    this.prime = null)
            }

            function S(t) {
                M.call(this, t),
                    this.shift = this.m.bitLength(),
                this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26),
                    this.r = new a(1).iushln(this.shift),
                    this.r2 = this.imod(this.r.sqr()),
                    this.rinv = this.r._invmp(this.m),
                    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
                    this.minv = this.minv.umod(this.r),
                    this.minv = this.r.sub(this.minv)
            }

            g.prototype._tmp = function () {
                var t = new a(null);
                return t.words = new Array(Math.ceil(this.n / 13)),
                    t
            }
                ,
                g.prototype.ireduce = function (t) {
                    for (var e, n = t; this.split(n, this.tmp),
                    (e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength()) > this.n;)
                        ;
                    return 0 === (t = e < this.n ? -1 : n.ucmp(this.p)) ? (n.words[0] = 0,
                        n.length = 1) : 0 < t ? n.isub(this.p) : void 0 !== n.strip ? n.strip() : n._strip(),
                        n
                }
                ,
                g.prototype.split = function (t, e) {
                    t.iushrn(this.n, 0, e)
                }
                ,
                g.prototype.imulK = function (t) {
                    return t.imul(this.k)
                }
                ,
                r(v, g),
                v.prototype.split = function (t, e) {
                    for (var n = Math.min(t.length, 9), i = 0; i < n; i++)
                        e.words[i] = t.words[i];
                    if (e.length = n,
                    t.length <= 9)
                        return t.words[0] = 0,
                            void (t.length = 1);
                    var r = t.words[9];
                    for (e.words[e.length++] = 4194303 & r,
                             i = 10; i < t.length; i++) {
                        var a = 0 | t.words[i];
                        t.words[i - 10] = (4194303 & a) << 4 | r >>> 22,
                            r = a
                    }
                    0 == (t.words[i - 10] = r >>>= 22) && 10 < t.length ? t.length -= 10 : t.length -= 9
                }
                ,
                v.prototype.imulK = function (t) {
                    t.words[t.length] = 0,
                        t.words[t.length + 1] = 0,
                        t.length += 2;
                    for (var e = 0, n = 0; n < t.length; n++) {
                        var i = 0 | t.words[n];
                        e += 977 * i,
                            t.words[n] = 67108863 & e,
                            e = 64 * i + (e / 67108864 | 0)
                    }
                    return 0 === t.words[t.length - 1] && (t.length--,
                    0 === t.words[t.length - 1] && t.length--),
                        t
                }
                ,
                r(y, g),
                r(w, g),
                r(_, g),
                _.prototype.imulK = function (t) {
                    for (var e = 0, n = 0; n < t.length; n++) {
                        var i = 19 * (0 | t.words[n]) + e
                            , r = 67108863 & i;
                        i >>>= 26,
                            t.words[n] = r,
                            e = i
                    }
                    return 0 !== e && (t.words[t.length++] = e),
                        t
                }
                ,
                a._prime = function (t) {
                    if (b[t])
                        return b[t];
                    var e;
                    if ("k256" === t)
                        e = new v;
                    else if ("p224" === t)
                        e = new y;
                    else if ("p192" === t)
                        e = new w;
                    else {
                        if ("p25519" !== t)
                            throw new Error("Unknown prime " + t);
                        e = new _
                    }
                    return b[t] = e
                }
                ,
                M.prototype._verify1 = function (t) {
                    i(0 === t.negative, "red works only with positives"),
                        i(t.red, "red works only with red numbers")
                }
                ,
                M.prototype._verify2 = function (t, e) {
                    i(0 == (t.negative | e.negative), "red works only with positives"),
                        i(t.red && t.red === e.red, "red works only with red numbers")
                }
                ,
                M.prototype.imod = function (t) {
                    return (this.prime ? this.prime.ireduce(t) : t.umod(this.m))._forceRed(this)
                }
                ,
                M.prototype.neg = function (t) {
                    return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                }
                ,
                M.prototype.add = function (t, e) {
                    return this._verify2(t, e),
                    0 <= (t = t.add(e)).cmp(this.m) && t.isub(this.m),
                        t._forceRed(this)
                }
                ,
                M.prototype.iadd = function (t, e) {
                    return this._verify2(t, e),
                    0 <= (t = t.iadd(e)).cmp(this.m) && t.isub(this.m),
                        t
                }
                ,
                M.prototype.sub = function (t, e) {
                    return this._verify2(t, e),
                    (t = t.sub(e)).cmpn(0) < 0 && t.iadd(this.m),
                        t._forceRed(this)
                }
                ,
                M.prototype.isub = function (t, e) {
                    return this._verify2(t, e),
                    (t = t.isub(e)).cmpn(0) < 0 && t.iadd(this.m),
                        t
                }
                ,
                M.prototype.shl = function (t, e) {
                    return this._verify1(t),
                        this.imod(t.ushln(e))
                }
                ,
                M.prototype.imul = function (t, e) {
                    return this._verify2(t, e),
                        this.imod(t.imul(e))
                }
                ,
                M.prototype.mul = function (t, e) {
                    return this._verify2(t, e),
                        this.imod(t.mul(e))
                }
                ,
                M.prototype.isqr = function (t) {
                    return this.imul(t, t.clone())
                }
                ,
                M.prototype.sqr = function (t) {
                    return this.mul(t, t)
                }
                ,
                M.prototype.sqrt = function (t) {
                    if (t.isZero())
                        return t.clone();
                    var e = this.m.andln(3);
                    if (i(e % 2 == 1),
                    3 === e)
                        return e = this.m.add(new a(1)).iushrn(2),
                            this.pow(t, e);
                    for (var n = this.m.subn(1), r = 0; !n.isZero() && 0 === n.andln(1);)
                        r++,
                            n.iushrn(1);
                    i(!n.isZero());
                    for (var o = new a(1).toRed(this), s = o.redNeg(), l = this.m.subn(1).iushrn(1), u = new a(2 * (u = this.m.bitLength()) * u).toRed(this); 0 !== this.pow(u, l).cmp(s);)
                        u.redIAdd(s);
                    for (var c = this.pow(u, n), f = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), h = r; 0 !== d.cmp(o);) {
                        for (var p = d, m = 0; 0 !== p.cmp(o); m++)
                            p = p.redSqr();
                        i(m < h);
                        var b = this.pow(c, new a(1).iushln(h - m - 1));
                        f = f.redMul(b),
                            c = b.redSqr(),
                            d = d.redMul(c),
                            h = m
                    }
                    return f
                }
                ,
                M.prototype.invm = function (t) {
                    return 0 !== (t = t._invmp(this.m)).negative ? (t.negative = 0,
                        this.imod(t).redNeg()) : this.imod(t)
                }
                ,
                M.prototype.pow = function (t, e) {
                    if (e.isZero())
                        return new a(1).toRed(this);
                    if (0 === e.cmpn(1))
                        return t.clone();
                    var n = new Array(16);
                    n[0] = new a(1).toRed(this),
                        n[1] = t;
                    for (var i = 2; i < n.length; i++)
                        n[i] = this.mul(n[i - 1], t);
                    var r = n[0]
                        , o = 0
                        , s = 0
                        , l = e.bitLength() % 26;
                    for (0 === l && (l = 26),
                             i = e.length - 1; 0 <= i; i--) {
                        for (var u = e.words[i], c = l - 1; 0 <= c; c--) {
                            var f = u >> c & 1;
                            r !== n[0] && (r = this.sqr(r)),
                                0 != f || 0 !== o ? (o = o << 1 | f,
                                (4 == ++s || 0 === i && 0 === c) && (r = this.mul(r, n[o]),
                                    o = s = 0)) : s = 0
                        }
                        l = 26
                    }
                    return r
                }
                ,
                M.prototype.convertTo = function (t) {
                    var e = t.umod(this.m);
                    return e === t ? e.clone() : e
                }
                ,
                M.prototype.convertFrom = function (t) {
                    return (t = t.clone()).red = null,
                        t
                }
                ,
                a.mont = function (t) {
                    return new S(t)
                }
                ,
                r(S, M),
                S.prototype.convertTo = function (t) {
                    return this.imod(t.ushln(this.shift))
                }
                ,
                S.prototype.convertFrom = function (t) {
                    return (t = this.imod(t.mul(this.rinv))).red = null,
                        t
                }
                ,
                S.prototype.imul = function (t, e) {
                    return t.isZero() || e.isZero() ? (t.words[0] = 0,
                        t.length = 1,
                        t) : (e = (t = t.imul(e)).maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        e = t = t.isub(e).iushrn(this.shift),
                        0 <= t.cmp(this.m) ? e = t.isub(this.m) : t.cmpn(0) < 0 && (e = t.iadd(this.m)),
                        e._forceRed(this))
                }
                ,
                S.prototype.mul = function (t, e) {
                    return t.isZero() || e.isZero() ? new a(0)._forceRed(this) : (e = (t = t.mul(e)).maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        e = t = t.isub(e).iushrn(this.shift),
                        0 <= t.cmp(this.m) ? e = t.isub(this.m) : t.cmpn(0) < 0 && (e = t.iadd(this.m)),
                        e._forceRed(this))
                }
                ,
                S.prototype.invm = function (t) {
                    return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                }
        }))
        , Bt = Lt;

    function Lt(t, e) {
        if (!t)
            throw new Error(e || "Assertion failed")
    }

    function Dt(t) {
        return (qt = qt || new Vt(null)).generate(t)
    }

    Lt.equal = function (t, e, n) {
        if (t != e)
            throw new Error(n || "Assertion failed: " + t + " != " + e)
    }
    ;
    var qt, Ft = ft(function (t, e) {
        function n(t) {
            return 1 === t.length ? "0" + t : t
        }

        function i(t) {
            for (var e = "", i = 0; i < t.length; i++)
                e += n(t[i].toString(16));
            return e
        }

        e.toArray = function (t, e) {
            if (Array.isArray(t))
                return t.slice();
            if (!t)
                return [];
            var n = [];
            if ("string" != typeof t) {
                for (var i = 0; i < t.length; i++)
                    n[i] = 0 | t[i];
                return n
            }
            if ("hex" === e)
                for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t),
                         i = 0; i < t.length; i += 2)
                    n.push(parseInt(t[i] + t[i + 1], 16));
            else
                for (i = 0; i < t.length; i++) {
                    var r = (a = t.charCodeAt(i)) >> 8
                        , a = 255 & a;
                    r ? n.push(r, a) : n.push(a)
                }
            return n
        }
            ,
            e.zero2 = n,
            e.toHex = i,
            e.encode = function (t, e) {
                return "hex" === e ? i(t) : t
            }
    }), Ut = ft(function (t, e) {
        var n = e;
        n.assert = Bt,
            n.toArray = Ft.toArray,
            n.zero2 = Ft.zero2,
            n.toHex = Ft.toHex,
            n.encode = Ft.encode,
            n.getNAF = function (t, e, n) {
                var i = new Array(Math.max(t.bitLength(), n) + 1);
                i.fill(0);
                for (var r = 1 << e + 1, a = t.clone(), o = 0; o < i.length; o++) {
                    var s, l = a.andln(r - 1);
                    a.isOdd() ? a.isubn(s = (r >> 1) - 1 < l ? (r >> 1) - l : l) : s = 0,
                        i[o] = s,
                        a.iushrn(1)
                }
                return i
            }
            ,
            n.getJSF = function (t, e) {
                var n = [[], []];
                t = t.clone(),
                    e = e.clone();
                for (var i, r = 0, a = 0; 0 < t.cmpn(-r) || 0 < e.cmpn(-a);) {
                    var o, s = t.andln(3) + r & 3, l = e.andln(3) + a & 3;
                    3 === l && (l = -1),
                        o = 0 == (1 & (s = 3 === s ? -1 : s)) ? 0 : 3 != (i = t.andln(7) + r & 7) && 5 !== i || 2 !== l ? s : -s,
                        n[0].push(o),
                        s = 0 == (1 & l) ? 0 : 3 != (i = e.andln(7) + a & 7) && 5 !== i || 2 !== s ? l : -l,
                        n[1].push(s),
                    2 * r === o + 1 && (r = 1 - r),
                    2 * a === s + 1 && (a = 1 - a),
                        t.iushrn(1),
                        e.iushrn(1)
                }
                return n
            }
            ,
            n.cachedProperty = function (t, e, n) {
                var i = "_" + e;
                t.prototype[e] = function () {
                    return void 0 !== this[i] ? this[i] : this[i] = n.call(this)
                }
            }
            ,
            n.parseBytes = function (t) {
                return "string" == typeof t ? n.toArray(t, "hex") : t
            }
            ,
            n.intFromLE = function (t) {
                return new Tt(t, "hex", "le")
            }
    });

    function Vt(t) {
        this.rand = t
    }

    if (dt = Vt,
        Vt.prototype.generate = function (t) {
            return this._rand(t)
        }
        ,
        Vt.prototype._rand = function (t) {
            if (this.rand.getBytes)
                return this.rand.getBytes(t);
            for (var e = new Uint8Array(t), n = 0; n < e.length; n++)
                e[n] = this.rand.getByte();
            return e
        }
        ,
    "object" == typeof self)
        self.crypto && self.crypto.getRandomValues ? Vt.prototype._rand = function (t) {
                return t = new Uint8Array(t),
                    self.crypto.getRandomValues(t),
                    t
            }
            : self.msCrypto && self.msCrypto.getRandomValues ? Vt.prototype._rand = function (t) {
                    return t = new Uint8Array(t),
                        self.msCrypto.getRandomValues(t),
                        t
                }
                : "object" == typeof window && (Vt.prototype._rand = function () {
                    throw new Error("Not implemented yet")
                }
            );
    else
        try {
            var zt = {};
            if ("function" != typeof zt.randomBytes)
                throw new Error("Not supported");
            Vt.prototype._rand = function (t) {
                return zt.randomBytes(t)
            }
        } catch (n) {
        }
    Dt.Rand = dt;
    var jt = Ut.getNAF
        , Yt = Ut.getJSF
        , Gt = Ut.assert;

    function Wt(t, e) {
        this.type = t,
            this.p = new Tt(e.p, 16),
            this.red = e.prime ? Tt.red(e.prime) : Tt.mont(this.p),
            this.zero = new Tt(0).toRed(this.red),
            this.one = new Tt(1).toRed(this.red),
            this.two = new Tt(2).toRed(this.red),
            this.n = e.n && new Tt(e.n, 16),
            this.g = e.g && this.pointFromJSON(e.g, e.gRed),
            this._wnafT1 = new Array(4),
            this._wnafT2 = new Array(4),
            this._wnafT3 = new Array(4),
            this._wnafT4 = new Array(4),
            this._bitLength = this.n ? this.n.bitLength() : 0,
            !(t = this.n && this.p.div(this.n)) || 0 < t.cmpn(100) ? this.redN = null : (this._maxwellTrick = !0,
                this.redN = this.n.toRed(this.red))
    }

    var Ht = Wt;

    function Kt(t, e) {
        this.curve = t,
            this.type = e,
            this.precomputed = null
    }

    Wt.prototype.point = function () {
        throw new Error("Not implemented")
    }
        ,
        Wt.prototype.validate = function () {
            throw new Error("Not implemented")
        }
        ,
        Wt.prototype._fixedNafMul = function (t, e) {
            Gt(t.precomputed);
            var n = t._getDoubles()
                , i = jt(e, 1, this._bitLength);
            t = (1 << n.step + 1) - (n.step % 2 == 0 ? 2 : 1);
            t /= 3;
            for (var r = [], a = 0; a < i.length; a += n.step) {
                for (var o = 0, s = a + n.step - 1; a <= s; s--)
                    o = (o << 1) + i[s];
                r.push(o)
            }
            for (var l = this.jpoint(null, null, null), u = this.jpoint(null, null, null), c = t; 0 < c; c--) {
                for (a = 0; a < r.length; a++)
                    (o = r[a]) === c ? u = u.mixedAdd(n.points[a]) : o === -c && (u = u.mixedAdd(n.points[a].neg()));
                l = l.add(u)
            }
            return l.toP()
        }
        ,
        Wt.prototype._wnafMul = function (t, e) {
            for (var n = t._getNAFPoints(4), i = n.wnd, r = n.points, a = jt(e, i, this._bitLength), o = this.jpoint(null, null, null), s = a.length - 1; 0 <= s; s--) {
                for (var l = 0; 0 <= s && 0 === a[s]; s--)
                    l++;
                if (0 <= s && l++,
                    o = o.dblp(l),
                s < 0)
                    break;
                var u = a[s];
                Gt(0 !== u),
                    o = "affine" === t.type ? 0 < u ? o.mixedAdd(r[u - 1 >> 1]) : o.mixedAdd(r[-u - 1 >> 1].neg()) : 0 < u ? o.add(r[u - 1 >> 1]) : o.add(r[-u - 1 >> 1].neg())
            }
            return "affine" === t.type ? o.toP() : o
        }
        ,
        Wt.prototype._wnafMulAdd = function (t, e, n, i, r) {
            for (var a, o = this._wnafT1, s = this._wnafT2, l = this._wnafT3, u = 0, c = 0; c < i; c++) {
                var f = (a = e[c])._getNAFPoints(t);
                o[c] = f.wnd,
                    s[c] = f.points
            }
            for (c = i - 1; 1 <= c; c -= 2) {
                var d = c - 1
                    , h = c;
                if (1 === o[d] && 1 === o[h]) {
                    var p = [e[d], null, null, e[h]]
                        , m = (0 === e[d].y.cmp(e[h].y) ? (p[1] = e[d].add(e[h]),
                        p[2] = e[d].toJ().mixedAdd(e[h].neg())) : 0 === e[d].y.cmp(e[h].y.redNeg()) ? (p[1] = e[d].toJ().mixedAdd(e[h]),
                        p[2] = e[d].add(e[h].neg())) : (p[1] = e[d].toJ().mixedAdd(e[h]),
                        p[2] = e[d].toJ().mixedAdd(e[h].neg())),
                        [-3, -1, -5, -7, 0, 7, 5, 1, 3])
                        , b = Yt(n[d], n[h]);
                    u = Math.max(b[0].length, u);
                    for (l[d] = new Array(u),
                             l[h] = new Array(u),
                             S = 0; S < u; S++) {
                        var g = 0 | b[0][S]
                            , v = 0 | b[1][S];
                        l[d][S] = m[3 * (1 + g) + (1 + v)],
                            l[h][S] = 0,
                            s[d] = p
                    }
                } else
                    l[d] = jt(n[d], o[d], this._bitLength),
                        l[h] = jt(n[h], o[h], this._bitLength),
                        u = Math.max(l[d].length, u),
                        u = Math.max(l[h].length, u)
            }
            var y = this.jpoint(null, null, null)
                , w = this._wnafT4;
            for (c = u; 0 <= c; c--) {
                for (var _ = 0; 0 <= c;) {
                    for (var M = !0, S = 0; S < i; S++)
                        w[S] = 0 | l[S][c],
                        0 !== w[S] && (M = !1);
                    if (!M)
                        break;
                    _++,
                        c--
                }
                if (0 <= c && _++,
                    y = y.dblp(_),
                c < 0)
                    break;
                for (S = 0; S < i; S++) {
                    var k = w[S];
                    0 !== k && (0 < k ? a = s[S][k - 1 >> 1] : k < 0 && (a = s[S][-k - 1 >> 1].neg()),
                        y = "affine" === a.type ? y.mixedAdd(a) : y.add(a))
                }
            }
            for (c = 0; c < i; c++)
                s[c] = null;
            return r ? y : y.toP()
        }
        ,
        (Wt.BasePoint = Kt).prototype.eq = function () {
            throw new Error("Not implemented")
        }
        ,
        Kt.prototype.validate = function () {
            return this.curve.validate(this)
        }
        ,
        Wt.prototype.decodePoint = function (t, e) {
            if (t = Ut.toArray(t, e),
                e = this.p.byteLength(),
            (4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * e)
                return 6 === t[0] ? Gt(t[t.length - 1] % 2 == 0) : 7 === t[0] && Gt(t[t.length - 1] % 2 == 1),
                    this.point(t.slice(1, 1 + e), t.slice(1 + e, 1 + 2 * e));
            if (2 !== t[0] && 3 !== t[0] || t.length - 1 !== e)
                throw new Error("Unknown point format");
            return this.pointFromX(t.slice(1, 1 + e), 3 === t[0])
        }
        ,
        Kt.prototype.encodeCompressed = function (t) {
            return this.encode(t, !0)
        }
        ,
        Kt.prototype._encode = function (t) {
            var e = this.curve.p.byteLength()
                , n = this.getX().toArray("be", e);
            return t ? [this.getY().isEven() ? 2 : 3].concat(n) : [4].concat(n, this.getY().toArray("be", e))
        }
        ,
        Kt.prototype.encode = function (t, e) {
            return Ut.encode(this._encode(e), t)
        }
        ,
        Kt.prototype.precompute = function (t) {
            if (this.precomputed)
                return this;
            var e = {
                doubles: null,
                naf: null,
                beta: null
            };
            return e.naf = this._getNAFPoints(8),
                e.doubles = this._getDoubles(4, t),
                e.beta = this._getBeta(),
                this.precomputed = e,
                this
        }
        ,
        Kt.prototype._hasDoubles = function (t) {
            if (!this.precomputed)
                return !1;
            var e = this.precomputed.doubles;
            return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
        }
        ,
        Kt.prototype._getDoubles = function (t, e) {
            if (this.precomputed && this.precomputed.doubles)
                return this.precomputed.doubles;
            for (var n = [this], i = this, r = 0; r < e; r += t) {
                for (var a = 0; a < t; a++)
                    i = i.dbl();
                n.push(i)
            }
            return {
                step: t,
                points: n
            }
        }
        ,
        Kt.prototype._getNAFPoints = function (t) {
            if (this.precomputed && this.precomputed.naf)
                return this.precomputed.naf;
            for (var e = [this], n = (1 << t) - 1, i = 1 == n ? null : this.dbl(), r = 1; r < n; r++)
                e[r] = e[r - 1].add(i);
            return {
                wnd: t,
                points: e
            }
        }
        ,
        Kt.prototype._getBeta = function () {
            return null
        }
        ,
        Kt.prototype.dblp = function (t) {
            for (var e = this, n = 0; n < t; n++)
                e = e.dbl();
            return e
        }
        ,
        i.setTimeout,
        i.clearTimeout;
    (ht = i.performance || {}).now || ht.mozNow || ht.msNow || ht.oNow || ht.webkitNow,
        pt = "function" == typeof Object.create ? function (t, e) {
                t.super_ = e,
                    t.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    })
            }
            : function (t, e) {
                function n() {
                }

                t.super_ = e,
                    n.prototype = e.prototype,
                    t.prototype = new n,
                    t.prototype.constructor = t
            }
    ;
    var Zt = /%[sdj%]/g;

    function Qt(t) {
        if (!ue(t)) {
            for (var e = [], n = 0; n < arguments.length; n++)
                e.push($t(arguments[n]));
            return e.join(" ")
        }
        n = 1;
        for (var i = arguments, r = i.length, a = String(t).replace(Zt, function (t) {
            if ("%%" === t)
                return "%";
            if (r <= n)
                return t;
            switch (t) {
                case "%s":
                    return String(i[n++]);
                case "%d":
                    return Number(i[n++]);
                case "%j":
                    try {
                        return JSON.stringify(i[n++])
                    } catch (t) {
                        return "[Circular]"
                    }
                default:
                    return t
            }
        }), o = i[n]; n < r; o = i[++n])
            se(o) || !de(o) ? a += " " + o : a += " " + $t(o);
        return a
    }

    var Jt, Xt = {};

    function $t(t, e) {
        var n = {
            seen: [],
            stylize: ee
        };
        return 3 <= arguments.length && (n.depth = arguments[2]),
        4 <= arguments.length && (n.colors = arguments[3]),
            oe(e) ? n.showHidden = e : e && ge(n, e),
        ce(n.showHidden) && (n.showHidden = !1),
        ce(n.depth) && (n.depth = 2),
        ce(n.colors) && (n.colors = !1),
        ce(n.customInspect) && (n.customInspect = !0),
        n.colors && (n.stylize = te),
            ne(n, t, n.depth)
    }

    function te(t, e) {
        return (e = $t.styles[e]) ? "[" + $t.colors[e][0] + "m" + t + "[" + $t.colors[e][1] + "m" : t
    }

    function ee(t, e) {
        return t
    }

    function ne(t, e, n) {
        if (t.customInspect && e && me(e.inspect) && e.inspect !== $t && (!e.constructor || e.constructor.prototype !== e))
            return ue(i = e.inspect(n, t)) ? i : ne(t, i, n);
        i = t;
        var i,
            r = ce(o = e) ? i.stylize("undefined", "undefined") : ue(o) ? (r = "'" + JSON.stringify(o).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'",
                i.stylize(r, "string")) : le(o) ? i.stylize("" + o, "number") : oe(o) ? i.stylize("" + o, "boolean") : se(o) ? i.stylize("null", "null") : void 0;
        if (r)
            return r;
        var a, o = Object.keys(e), s = (a = {},
            o.forEach(function (t, e) {
                a[t] = !0
            }),
            a);
        if (t.showHidden && (o = Object.getOwnPropertyNames(e)),
        pe(e) && (0 <= o.indexOf("message") || 0 <= o.indexOf("description")))
            return ie(e);
        if (0 === o.length) {
            if (me(e))
                return c = e.name ? ": " + e.name : "",
                    t.stylize("[Function" + c + "]", "special");
            if (fe(e))
                return t.stylize(RegExp.prototype.toString.call(e), "regexp");
            if (he(e))
                return t.stylize(Date.prototype.toString.call(e), "date");
            if (pe(e))
                return ie(e)
        }
        var l, u, c = "", f = !1, d = ["{", "}"];
        return ae(e) && (f = !0,
            d = ["[", "]"]),
        me(e) && (c = " [Function" + (e.name ? ": " + e.name : "") + "]"),
        fe(e) && (c = " " + RegExp.prototype.toString.call(e)),
        he(e) && (c = " " + Date.prototype.toUTCString.call(e)),
        pe(e) && (c = " " + ie(e)),
            0 !== o.length || f && 0 != e.length ? n < 0 ? fe(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(e),
                o = f ? function (t, e, n, i, r) {
                    for (var a = [], o = 0, s = e.length; o < s; ++o)
                        ve(e, String(o)) ? a.push(re(t, e, n, i, String(o), !0)) : a.push("");
                    return r.forEach(function (r) {
                        r.match(/^\d+$/) || a.push(re(t, e, n, i, r, !0))
                    }),
                        a
                }(t, e, n, s, o) : o.map(function (i) {
                    return re(t, e, n, s, i, f)
                }),
                t.seen.pop(),
                l = c,
                u = d,
                60 < (o = o).reduce(function (t, e) {
                    return e.indexOf("\n"),
                    t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0) ? u[0] + ("" === l ? "" : l + "\n ") + " " + o.join(",\n  ") + " " + u[1] : u[0] + l + " " + o.join(", ") + " " + u[1]) : d[0] + c + d[1]
    }

    function ie(t) {
        return "[" + Error.prototype.toString.call(t) + "]"
    }

    function re(t, e, n, i, r, a) {
        var o, s;
        if ((e = Object.getOwnPropertyDescriptor(e, r) || {
            value: e[r]
        }).get ? s = e.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : e.set && (s = t.stylize("[Setter]", "special")),
        ve(i, r) || (o = "[" + r + "]"),
        s || (t.seen.indexOf(e.value) < 0 ? -1 < (s = se(n) ? ne(t, e.value, null) : ne(t, e.value, n - 1)).indexOf("\n") && (s = a ? s.split("\n").map(function (t) {
            return "  " + t
        }).join("\n").substr(2) : "\n" + s.split("\n").map(function (t) {
            return "   " + t
        }).join("\n")) : s = t.stylize("[Circular]", "special")),
            ce(o)) {
            if (a && r.match(/^\d+$/))
                return s;
            o = (o = JSON.stringify("" + r)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (o = o.substr(1, o.length - 2),
                t.stylize(o, "name")) : (o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
                t.stylize(o, "string"))
        }
        return o + ": " + s
    }

    function ae(t) {
        return Array.isArray(t)
    }

    function oe(t) {
        return "boolean" == typeof t
    }

    function se(t) {
        return null === t
    }

    function le(t) {
        return "number" == typeof t
    }

    function ue(t) {
        return "string" == typeof t
    }

    function ce(t) {
        return void 0 === t
    }

    function fe(t) {
        return de(t) && "[object RegExp]" === be(t)
    }

    function de(t) {
        return "object" == typeof t && null !== t
    }

    function he(t) {
        return de(t) && "[object Date]" === be(t)
    }

    function pe(t) {
        return de(t) && ("[object Error]" === be(t) || t instanceof Error)
    }

    function me(t) {
        return "function" == typeof t
    }

    function be(t) {
        return Object.prototype.toString.call(t)
    }

    $t.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    },
        $t.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            "null": "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        };

    function ge(t, e) {
        if (!e || !de(e))
            return t;
        for (var n = Object.keys(e), i = n.length; i--;)
            t[n[i]] = e[n[i]];
        return t
    }

    function ve(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    var ye = {
        inherits: pt,
        _extend: ge,
        log: function () {
        },
        isBuffer: function (t) {
            return g.isBuffer(t)
        },
        isPrimitive: function (t) {
            return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
        },
        isFunction: me,
        isError: pe,
        isDate: he,
        isObject: de,
        isRegExp: fe,
        isUndefined: ce,
        isSymbol: function (t) {
            return "symbol" == typeof t
        },
        isString: ue,
        isNumber: le,
        isNullOrUndefined: function (t) {
            return null == t
        },
        isNull: se,
        isBoolean: oe,
        isArray: ae,
        inspect: $t,
        deprecate: function Dr(t, e) {
            if (ce(i.process))
                return function () {
                    return Dr(t, e).apply(this, arguments)
                }
                    ;
            var n = !1;
            return function () {
                return n || (n = !0),
                    t.apply(this, arguments)
            }
        },
        format: Qt,
        debuglog: function (t) {
            return ce(Jt) && (Jt = ""),
                t = t.toUpperCase(),
            Xt[t] || (new RegExp("\\b" + t + "\\b", "i").test(Jt) ? Xt[t] = function () {
                        Qt.apply(null, arguments)
                    }
                    : Xt[t] = function () {
                    }
            ),
                Xt[t]
        }
    }
        , we = ft(function (t) {
        "function" == typeof Object.create ? t.exports = function (t, e) {
                e && (t.super_ = e,
                    t.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }))
            }
            : t.exports = function (t, e) {
                var n;
                e && (t.super_ = e,
                    (n = function () {
                        }
                    ).prototype = e.prototype,
                    t.prototype = new n,
                    t.prototype.constructor = t)
            }
    })
        , _e = (mt = ft(function (t) {
        try {
            var e = ye;
            if ("function" != typeof e.inherits)
                throw "";
            t.exports = e.inherits
        } catch (e) {
            t.exports = we
        }
    }),
        Ut.assert);

    function Me(t) {
        Ht.call(this, "short", t),
            this.a = new Tt(t.a, 16).toRed(this.red),
            this.b = new Tt(t.b, 16).toRed(this.red),
            this.tinv = this.two.redInvm(),
            this.zeroA = 0 === this.a.fromRed().cmpn(0),
            this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3),
            this.endo = this._getEndomorphism(t),
            this._endoWnafT1 = new Array(4),
            this._endoWnafT2 = new Array(4)
    }

    mt(Me, Ht);
    var Se = Me;

    function ke(t, e, n, i) {
        Ht.BasePoint.call(this, t, "affine"),
            null === e && null === n ? (this.x = null,
                this.y = null,
                this.inf = !0) : (this.x = new Tt(e, 16),
                this.y = new Tt(n, 16),
            i && (this.x.forceRed(this.curve.red),
                this.y.forceRed(this.curve.red)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.inf = !1)
    }

    function Ee(t, e, n, i) {
        Ht.BasePoint.call(this, t, "jacobian"),
            null === e && null === n && null === i ? (this.x = this.curve.one,
                this.y = this.curve.one,
                this.z = new Tt(0)) : (this.x = new Tt(e, 16),
                this.y = new Tt(n, 16),
                this.z = new Tt(i, 16)),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.y.red || (this.y = this.y.toRed(this.curve.red)),
        this.z.red || (this.z = this.z.toRed(this.curve.red)),
            this.zOne = this.z === this.curve.one
    }

    function Ae(t) {
        Ht.call(this, "mont", t),
            this.a = new Tt(t.a, 16).toRed(this.red),
            this.b = new Tt(t.b, 16).toRed(this.red),
            this.i4 = new Tt(4).toRed(this.red).redInvm(),
            this.two = new Tt(2).toRed(this.red),
            this.a24 = this.i4.redMul(this.a.redAdd(this.two))
    }

    Me.prototype._getEndomorphism = function (t) {
        var e, n, i;
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3))
            return n = (t.beta ? new Tt(t.beta, 16) : n = (n = this._getEndoRoots(this.p))[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red),
                t.lambda ? e = new Tt(t.lambda, 16) : (i = this._getEndoRoots(this.n),
                    0 === this.g.mul(i[0]).x.cmp(this.g.x.redMul(n)) ? e = i[0] : (e = i[1],
                        _e(0 === this.g.mul(e).x.cmp(this.g.x.redMul(n))))),
                {
                    beta: n,
                    lambda: e,
                    basis: t.basis ? t.basis.map(function (t) {
                        return {
                            a: new Tt(t.a, 16),
                            b: new Tt(t.b, 16)
                        }
                    }) : this._getEndoBasis(e)
                }
    }
        ,
        Me.prototype._getEndoRoots = function (t) {
            t = t === this.p ? this.red : Tt.mont(t);
            var e = new Tt(2).toRed(t).redInvm()
                , n = e.redNeg();
            t = new Tt(3).toRed(t).redNeg().redSqrt().redMul(e);
            return [n.redAdd(t).fromRed(), n.redSub(t).fromRed()]
        }
        ,
        Me.prototype._getEndoBasis = function (t) {
            for (var e, n, i, r, a, o = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), s = t, l = this.n.clone(), u = new Tt(1), c = new Tt(0), f = new Tt(0), d = new Tt(1), h = 0; 0 !== s.cmpn(0);) {
                var p = l.div(s)
                    , m = l.sub(p.mul(s))
                    , b = f.sub(p.mul(u));
                p = d.sub(p.mul(c));
                if (!i && m.cmp(o) < 0)
                    e = a.neg(),
                        n = u,
                        i = m.neg(),
                        r = b;
                else if (i && 2 == ++h)
                    break;
                l = s,
                    s = a = m,
                    f = u,
                    u = b,
                    d = c,
                    c = p
            }
            t = m.neg();
            var g = b
                , v = i.sqr().add(r.sqr());
            return 0 <= t.sqr().add(g.sqr()).cmp(v) && (t = e,
                g = n),
            i.negative && (i = i.neg(),
                r = r.neg()),
            t.negative && (t = t.neg(),
                g = g.neg()),
                [{
                    a: i,
                    b: r
                }, {
                    a: t,
                    b: g
                }]
        }
        ,
        Me.prototype._endoSplit = function (t) {
            var e, n = (e = this.endo.basis)[0], i = (e = e[1]).b.mul(t).divRound(this.n),
                r = n.b.neg().mul(t).divRound(this.n), a = i.mul(n.a), o = r.mul(e.a);
            i = i.mul(n.b),
                n = r.mul(e.b);
            return {
                k1: t.sub(a).sub(o),
                k2: i.add(n).neg()
            }
        }
        ,
        Me.prototype.pointFromX = function (t, e) {
            var n = (t = (t = new Tt(t, 16)).red ? t : t.toRed(this.red)).redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b)
                , i = n.redSqrt();
            if (0 !== i.redSqr().redSub(n).cmp(this.zero))
                throw new Error("invalid point");
            return n = i.fromRed().isOdd(),
            (e && !n || !e && n) && (i = i.redNeg()),
                this.point(t, i)
        }
        ,
        Me.prototype.validate = function (t) {
            if (t.inf)
                return !0;
            var e = t.x
                , n = (t = t.y,
                this.a.redMul(e));
            e = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
            return 0 === t.redSqr().redISub(e).cmpn(0)
        }
        ,
        Me.prototype._endoWnafMulAdd = function (t, e, n) {
            for (var i = this._endoWnafT1, r = this._endoWnafT2, a = 0; a < t.length; a++) {
                var o = this._endoSplit(e[a])
                    , s = t[a]
                    , l = s._getBeta();
                o.k1.negative && (o.k1.ineg(),
                    s = s.neg(!0)),
                o.k2.negative && (o.k2.ineg(),
                    l = l.neg(!0)),
                    i[2 * a] = s,
                    i[2 * a + 1] = l,
                    r[2 * a] = o.k1,
                    r[2 * a + 1] = o.k2
            }
            n = this._wnafMulAdd(1, i, r, 2 * a, n);
            for (var u = 0; u < 2 * a; u++)
                i[u] = null,
                    r[u] = null;
            return n
        }
        ,
        mt(ke, Ht.BasePoint),
        Me.prototype.point = function (t, e, n) {
            return new ke(this, t, e, n)
        }
        ,
        Me.prototype.pointFromJSON = function (t, e) {
            return ke.fromJSON(this, t, e)
        }
        ,
        ke.prototype._getBeta = function () {
            if (this.curve.endo) {
                var t = this.precomputed;
                if (t && t.beta)
                    return t.beta;
                var e, n, i = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                return t && (e = this.curve,
                    n = function (t) {
                        return e.point(t.x.redMul(e.endo.beta), t.y)
                    }
                    ,
                    (t.beta = i).precomputed = {
                        beta: null,
                        naf: t.naf && {
                            wnd: t.naf.wnd,
                            points: t.naf.points.map(n)
                        },
                        doubles: t.doubles && {
                            step: t.doubles.step,
                            points: t.doubles.points.map(n)
                        }
                    }),
                    i
            }
        }
        ,
        ke.prototype.toJSON = function () {
            return this.precomputed ? [this.x, this.y, this.precomputed && {
                doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1)
                }
            }] : [this.x, this.y]
        }
        ,
        ke.fromJSON = function (t, e, n) {
            "string" == typeof e && (e = JSON.parse(e));
            var i = t.point(e[0], e[1], n);
            if (!e[2])
                return i;

            function r(e) {
                return t.point(e[0], e[1], n)
            }

            return e = e[2],
                i.precomputed = {
                    beta: null,
                    doubles: e.doubles && {
                        step: e.doubles.step,
                        points: [i].concat(e.doubles.points.map(r))
                    },
                    naf: e.naf && {
                        wnd: e.naf.wnd,
                        points: [i].concat(e.naf.points.map(r))
                    }
                },
                i
        }
        ,
        ke.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
        }
        ,
        ke.prototype.isInfinity = function () {
            return this.inf
        }
        ,
        ke.prototype.add = function (t) {
            if (this.inf)
                return t;
            if (t.inf)
                return this;
            if (this.eq(t))
                return this.dbl();
            if (this.neg().eq(t))
                return this.curve.point(null, null);
            if (0 === this.x.cmp(t.x))
                return this.curve.point(null, null);
            t = (e = 0 !== (e = this.y.redSub(t.y)).cmpn(0) ? e.redMul(this.x.redSub(t.x).redInvm()) : e).redSqr().redISub(this.x).redISub(t.x);
            var e = e.redMul(this.x.redSub(t)).redISub(this.y);
            return this.curve.point(t, e)
        }
        ,
        ke.prototype.dbl = function () {
            if (this.inf)
                return this;
            if (0 === (n = this.y.redAdd(this.y)).cmpn(0))
                return this.curve.point(null, null);
            var t = this.curve.a
                , e = this.x.redSqr()
                , n = n.redInvm();
            t = (e = e.redAdd(e).redIAdd(e).redIAdd(t).redMul(n)).redSqr().redISub(this.x.redAdd(this.x)),
                n = e.redMul(this.x.redSub(t)).redISub(this.y);
            return this.curve.point(t, n)
        }
        ,
        ke.prototype.getX = function () {
            return this.x.fromRed()
        }
        ,
        ke.prototype.getY = function () {
            return this.y.fromRed()
        }
        ,
        ke.prototype.mul = function (t) {
            return t = new Tt(t, 16),
                this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t)
        }
        ,
        ke.prototype.mulAdd = function (t, e, n) {
            return e = [this, e],
                t = [t, n],
                this.curve.endo ? this.curve._endoWnafMulAdd(e, t) : this.curve._wnafMulAdd(1, e, t, 2)
        }
        ,
        ke.prototype.jmulAdd = function (t, e, n) {
            return e = [this, e],
                t = [t, n],
                this.curve.endo ? this.curve._endoWnafMulAdd(e, t, !0) : this.curve._wnafMulAdd(1, e, t, 2, !0)
        }
        ,
        ke.prototype.eq = function (t) {
            return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))
        }
        ,
        ke.prototype.neg = function (t) {
            if (this.inf)
                return this;
            var e, n = this.curve.point(this.x, this.y.redNeg());
            return t && this.precomputed && (t = this.precomputed,
                e = function (t) {
                    return t.neg()
                }
                ,
                n.precomputed = {
                    naf: t.naf && {
                        wnd: t.naf.wnd,
                        points: t.naf.points.map(e)
                    },
                    doubles: t.doubles && {
                        step: t.doubles.step,
                        points: t.doubles.points.map(e)
                    }
                }),
                n
        }
        ,
        ke.prototype.toJ = function () {
            return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
        }
        ,
        mt(Ee, Ht.BasePoint),
        Me.prototype.jpoint = function (t, e, n) {
            return new Ee(this, t, e, n)
        }
        ,
        Ee.prototype.toP = function () {
            if (this.isInfinity())
                return this.curve.point(null, null);
            var t = this.z.redInvm()
                , e = t.redSqr()
                , n = this.x.redMul(e);
            e = this.y.redMul(e).redMul(t);
            return this.curve.point(n, e)
        }
        ,
        Ee.prototype.neg = function () {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
        }
        ,
        Ee.prototype.add = function (t) {
            if (this.isInfinity())
                return t;
            if (t.isInfinity())
                return this;
            var e = t.z.redSqr()
                , n = this.z.redSqr()
                , i = this.x.redMul(e)
                , r = t.x.redMul(n);
            e = this.y.redMul(e.redMul(t.z)),
                n = t.y.redMul(n.redMul(this.z)),
                r = i.redSub(r),
                n = e.redSub(n);
            if (0 === r.cmpn(0))
                return 0 !== n.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var a = (o = r.redSqr()).redMul(r)
                , o = (i = i.redMul(o),
                n.redSqr().redIAdd(a).redISub(i).redISub(i));
            n = n.redMul(i.redISub(o)).redISub(e.redMul(a)),
                i = this.z.redMul(t.z).redMul(r);
            return this.curve.jpoint(o, n, i)
        }
        ,
        Ee.prototype.mixedAdd = function (t) {
            if (this.isInfinity())
                return t.toJ();
            if (t.isInfinity())
                return this;
            var e = this.z.redSqr()
                , n = this.x
                , i = t.x.redMul(e)
                , r = this.y;
            t = t.y.redMul(e).redMul(this.z),
                e = n.redSub(i),
                i = r.redSub(t);
            if (0 === e.cmpn(0))
                return 0 !== i.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var a = (t = e.redSqr()).redMul(e);
            n = n.redMul(t),
                t = i.redSqr().redIAdd(a).redISub(n).redISub(n),
                i = i.redMul(n.redISub(t)).redISub(r.redMul(a)),
                n = this.z.redMul(e);
            return this.curve.jpoint(t, i, n)
        }
        ,
        Ee.prototype.dblp = function (t) {
            if (0 === t)
                return this;
            if (this.isInfinity())
                return this;
            if (!t)
                return this.dbl();
            if (this.curve.zeroA || this.curve.threeA) {
                for (var e = this, n = 0; n < t; n++)
                    e = e.dbl();
                return e
            }
            var i = this.curve.a
                , r = this.curve.tinv
                , a = this.x
                , o = this.y
                , s = this.z
                , l = s.redSqr().redSqr()
                , u = o.redAdd(o);
            for (n = 0; n < t; n++) {
                var c = a.redSqr()
                    , f = (d = u.redSqr()).redSqr()
                    , d = (c = c.redAdd(c).redIAdd(c).redIAdd(i.redMul(l)),
                    a.redMul(d))
                    , h = c.redSqr().redISub(d.redAdd(d));
                d = d.redISub(h),
                    c = (c = c.redMul(d)).redIAdd(c).redISub(f),
                    d = u.redMul(s);
                n + 1 < t && (l = l.redMul(f)),
                    a = h,
                    s = d,
                    u = c
            }
            return this.curve.jpoint(a, u.redMul(r), s)
        }
        ,
        Ee.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
        }
        ,
        Ee.prototype._zeroDbl = function () {
            var t, e, n, i, r, a;
            return r = this.zOne ? (t = this.x.redSqr(),
                n = (e = this.y.redSqr()).redSqr(),
                e = (e = this.x.redAdd(e).redSqr().redISub(t).redISub(n)).redIAdd(e),
                i = (t = t.redAdd(t).redIAdd(t)).redSqr().redISub(e).redISub(e),
                n = (n = (n = n.redIAdd(n)).redIAdd(n)).redIAdd(n),
                e = t.redMul(e.redISub(t = i)).redISub(n),
                this.y.redAdd(this.y)) : (i = this.x.redSqr(),
                a = (n = this.y.redSqr()).redSqr(),
                n = (n = this.x.redAdd(n).redSqr().redISub(i).redISub(a)).redIAdd(n),
                r = (i = i.redAdd(i).redIAdd(i)).redSqr(),
                a = (a = (a = a.redIAdd(a)).redIAdd(a)).redIAdd(a),
                t = r.redISub(n).redISub(n),
                e = i.redMul(n.redISub(t)).redISub(a),
                (r = this.y.redMul(this.z)).redIAdd(r)),
                this.curve.jpoint(t, e, r)
        }
        ,
        Ee.prototype._threeDbl = function () {
            var t, e, n, i, r, a, o, s;
            return this.zOne ? (e = this.x.redSqr(),
                r = (n = this.y.redSqr()).redSqr(),
                n = (n = this.x.redAdd(n).redSqr().redISub(e).redISub(r)).redIAdd(n),
                t = i = (e = e.redAdd(e).redIAdd(e).redIAdd(this.curve.a)).redSqr().redISub(n).redISub(n),
                r = (r = (r = r.redIAdd(r)).redIAdd(r)).redIAdd(r),
                e = e.redMul(n.redISub(i)).redISub(r),
                n = this.y.redAdd(this.y)) : (i = this.z.redSqr(),
                r = this.y.redSqr(),
                o = this.x.redMul(r),
                a = (a = this.x.redSub(i).redMul(this.x.redAdd(i))).redAdd(a).redIAdd(a),
                s = (o = (o = o.redIAdd(o)).redIAdd(o)).redAdd(o),
                t = a.redSqr().redISub(s),
                n = this.y.redAdd(this.z).redSqr().redISub(r).redISub(i),
                s = (s = (s = (s = r.redSqr()).redIAdd(s)).redIAdd(s)).redIAdd(s),
                e = a.redMul(o.redISub(t)).redISub(s)),
                this.curve.jpoint(t, e, n)
        }
        ,
        Ee.prototype._dbl = function () {
            var t = this.curve.a
                , e = this.x
                , n = this.y
                , i = this.z
                , r = i.redSqr().redSqr()
                , a = e.redSqr()
                , o = n.redSqr();
            a = a.redAdd(a).redIAdd(a).redIAdd(t.redMul(r)),
                r = (t = (t = e.redAdd(e)).redIAdd(t)).redMul(o),
                e = a.redSqr().redISub(r.redAdd(r)),
                t = r.redISub(e),
                r = (r = (r = (r = o.redSqr()).redIAdd(r)).redIAdd(r)).redIAdd(r),
                o = a.redMul(t).redISub(r),
                a = n.redAdd(n).redMul(i);
            return this.curve.jpoint(e, o, a)
        }
        ,
        Ee.prototype.trpl = function () {
            if (!this.curve.zeroA)
                return this.dbl().add(this);
            var t = this.x.redSqr()
                , e = this.y.redSqr()
                , n = this.z.redSqr()
                , i = e.redSqr()
                , r = (o = t.redAdd(t).redIAdd(t)).redSqr()
                ,
                a = (t = (t = (t = (t = this.x.redAdd(e).redSqr().redISub(t).redISub(i)).redIAdd(t)).redAdd(t).redIAdd(t)).redISub(r)).redSqr()
                , o = (i = (i = (i = (i = i.redIAdd(i)).redIAdd(i)).redIAdd(i)).redIAdd(i),
                    o.redIAdd(t).redSqr().redISub(r).redISub(a).redISub(i));
            r = (r = (r = e.redMul(o)).redIAdd(r)).redIAdd(r),
                e = (e = (e = this.x.redMul(a).redISub(r)).redIAdd(e)).redIAdd(e),
                r = (r = (r = (r = this.y.redMul(o.redMul(i.redISub(o)).redISub(t.redMul(a)))).redIAdd(r)).redIAdd(r)).redIAdd(r),
                i = this.z.redAdd(t).redSqr().redISub(n).redISub(a);
            return this.curve.jpoint(e, r, i)
        }
        ,
        Ee.prototype.mul = function (t, e) {
            return t = new Tt(t, e),
                this.curve._wnafMul(this, t)
        }
        ,
        Ee.prototype.eq = function (t) {
            if ("affine" === t.type)
                return this.eq(t.toJ());
            if (this === t)
                return !0;
            var e = this.z.redSqr()
                , n = t.z.redSqr();
            return 0 === this.x.redMul(n).redISub(t.x.redMul(e)).cmpn(0) && (e = e.redMul(this.z),
                n = n.redMul(t.z),
            0 === this.y.redMul(n).redISub(t.y.redMul(e)).cmpn(0))
        }
        ,
        Ee.prototype.eqXToP = function (t) {
            var e = this.z.redSqr()
                , n = t.toRed(this.curve.red).redMul(e);
            if (0 === this.x.cmp(n))
                return !0;
            for (var i = t.clone(), r = this.curve.redN.redMul(e); ;) {
                if (i.iadd(this.curve.n),
                0 <= i.cmp(this.curve.p))
                    return !1;
                if (n.redIAdd(r),
                0 === this.x.cmp(n))
                    return !0
            }
        }
        ,
        Ee.prototype.inspect = function () {
            return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
        }
        ,
        Ee.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0)
        }
        ,
        mt(Ae, Ht);
    var Ce = Ae;

    function Re(t, e, n) {
        Ht.BasePoint.call(this, t, "projective"),
            null === e && null === n ? (this.x = this.curve.one,
                this.z = this.curve.zero) : (this.x = new Tt(e, 16),
                this.z = new Tt(n, 16),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)))
    }

    Ae.prototype.validate = function (t) {
        var e;
        return 0 === (e = (e = (t = t.normalize().x).redSqr()).redMul(t).redAdd(e.redMul(this.a)).redAdd(t)).redSqrt().redSqr().cmp(e)
    }
        ,
        mt(Re, Ht.BasePoint),
        Ae.prototype.decodePoint = function (t, e) {
            return this.point(Ut.toArray(t, e), 1)
        }
        ,
        Ae.prototype.point = function (t, e) {
            return new Re(this, t, e)
        }
        ,
        Ae.prototype.pointFromJSON = function (t) {
            return Re.fromJSON(this, t)
        }
        ,
        Re.prototype.precompute = function () {
        }
        ,
        Re.prototype._encode = function () {
            return this.getX().toArray("be", this.curve.p.byteLength())
        }
        ,
        Re.fromJSON = function (t, e) {
            return new Re(t, e[0], e[1] || t.one)
        }
        ,
        Re.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }
        ,
        Re.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0)
        }
        ,
        Re.prototype.dbl = function () {
            var t = this.x.redAdd(this.z).redSqr()
                , e = this.x.redSub(this.z).redSqr()
                , n = t.redSub(e);
            t = t.redMul(e),
                e = n.redMul(e.redAdd(this.curve.a24.redMul(n)));
            return this.curve.point(t, e)
        }
        ,
        Re.prototype.add = function () {
            throw new Error("Not supported on Montgomery curve")
        }
        ,
        Re.prototype.diffAdd = function (t, e) {
            var n = this.x.redAdd(this.z)
                , i = this.x.redSub(this.z)
                , r = t.x.redAdd(t.z);
            t = t.x.redSub(t.z).redMul(n),
                n = r.redMul(i),
                r = e.z.redMul(t.redAdd(n).redSqr()),
                i = e.x.redMul(t.redISub(n).redSqr());
            return this.curve.point(r, i)
        }
        ,
        Re.prototype.mul = function (t) {
            for (var e = t.clone(), n = this, i = this.curve.point(null, null), r = []; 0 !== e.cmpn(0); e.iushrn(1))
                r.push(e.andln(1));
            for (var a = r.length - 1; 0 <= a; a--)
                0 === r[a] ? (n = n.diffAdd(i, this),
                    i = i.dbl()) : (i = n.diffAdd(i, this),
                    n = n.dbl());
            return i
        }
        ,
        Re.prototype.mulAdd = function () {
            throw new Error("Not supported on Montgomery curve")
        }
        ,
        Re.prototype.jumlAdd = function () {
            throw new Error("Not supported on Montgomery curve")
        }
        ,
        Re.prototype.eq = function (t) {
            return 0 === this.getX().cmp(t.getX())
        }
        ,
        Re.prototype.normalize = function () {
            return this.x = this.x.redMul(this.z.redInvm()),
                this.z = this.curve.one,
                this
        }
        ,
        Re.prototype.getX = function () {
            return this.normalize(),
                this.x.fromRed()
        }
    ;
    var Ie = Ut.assert;

    function Ne(t) {
        this.twisted = 1 != (0 | t.a),
            this.mOneA = this.twisted && -1 == (0 | t.a),
            this.extended = this.mOneA,
            Ht.call(this, "edwards", t),
            this.a = new Tt(t.a, 16).umod(this.red.m),
            this.a = this.a.toRed(this.red),
            this.c = new Tt(t.c, 16).toRed(this.red),
            this.c2 = this.c.redSqr(),
            this.d = new Tt(t.d, 16).toRed(this.red),
            this.dd = this.d.redAdd(this.d),
            Ie(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
            this.oneC = 1 == (0 | t.c)
    }

    mt(Ne, Ht);
    var Pe = Ne;

    function Oe(t, e, n, i, r) {
        Ht.BasePoint.call(this, t, "projective"),
            null === e && null === n && null === i ? (this.x = this.curve.zero,
                this.y = this.curve.one,
                this.z = this.curve.one,
                this.t = this.curve.zero,
                this.zOne = !0) : (this.x = new Tt(e, 16),
                this.y = new Tt(n, 16),
                this.z = i ? new Tt(i, 16) : this.curve.one,
                this.t = r && new Tt(r, 16),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
                this.zOne = this.z === this.curve.one,
            this.curve.extended && !this.t && (this.t = this.x.redMul(this.y),
            this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
    }

    Ne.prototype._mulA = function (t) {
        return this.mOneA ? t.redNeg() : this.a.redMul(t)
    }
        ,
        Ne.prototype._mulC = function (t) {
            return this.oneC ? t : this.c.redMul(t)
        }
        ,
        Ne.prototype.jpoint = function (t, e, n, i) {
            return this.point(t, e, n, i)
        }
        ,
        Ne.prototype.pointFromX = function (t, e) {
            var n = (t = (t = new Tt(t, 16)).red ? t : t.toRed(this.red)).redSqr()
                , i = this.c2.redSub(this.a.redMul(n));
            n = this.one.redSub(this.c2.redMul(this.d).redMul(n));
            if (0 !== (n = (i = i.redMul(n.redInvm())).redSqrt()).redSqr().redSub(i).cmp(this.zero))
                throw new Error("invalid point");
            return i = n.fromRed().isOdd(),
            (e && !i || !e && i) && (n = n.redNeg()),
                this.point(t, n)
        }
        ,
        Ne.prototype.pointFromY = function (t, e) {
            var n = (i = (t = (t = new Tt(t, 16)).red ? t : t.toRed(this.red)).redSqr()).redSub(this.c2)
                , i = i.redMul(this.d).redMul(this.c2).redSub(this.a);
            if (0 === (n = n.redMul(i.redInvm())).cmp(this.zero)) {
                if (e)
                    throw new Error("invalid point");
                return this.point(this.zero, t)
            }
            if (0 !== (i = n.redSqrt()).redSqr().redSub(n).cmp(this.zero))
                throw new Error("invalid point");
            return i.fromRed().isOdd() !== e && (i = i.redNeg()),
                this.point(i, t)
        }
        ,
        Ne.prototype.validate = function (t) {
            if (t.isInfinity())
                return !0;
            t.normalize();
            var e = t.x.redSqr()
                , n = (t = t.y.redSqr(),
                e.redMul(this.a).redAdd(t));
            e = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(t)));
            return 0 === n.cmp(e)
        }
        ,
        mt(Oe, Ht.BasePoint),
        Ne.prototype.pointFromJSON = function (t) {
            return Oe.fromJSON(this, t)
        }
        ,
        Ne.prototype.point = function (t, e, n, i) {
            return new Oe(this, t, e, n, i)
        }
        ,
        Oe.fromJSON = function (t, e) {
            return new Oe(t, e[0], e[1], e[2])
        }
        ,
        Oe.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }
        ,
        Oe.prototype.isInfinity = function () {
            return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c))
        }
        ,
        Oe.prototype._extDbl = function () {
            var t = this.x.redSqr()
                , e = this.y.redSqr()
                , n = (n = this.z.redSqr()).redIAdd(n)
                , i = this.curve._mulA(t)
                , r = (t = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
                i.redAdd(e))
                , a = (n = r.redSub(n),
                i = i.redSub(e),
                e = t.redMul(n),
                r.redMul(i));
            t = t.redMul(i),
                i = n.redMul(r);
            return this.curve.point(e, a, i, t)
        }
        ,
        Oe.prototype._projDbl = function () {
            var t, e, n, i, r, a, o = this.x.redAdd(this.y).redSqr(), s = this.x.redSqr(),
                l = this.y.redSqr();
            return a = this.curve.twisted ? (a = (n = this.curve._mulA(s)).redAdd(l),
                this.zOne ? (t = o.redSub(s).redSub(l).redMul(a.redSub(this.curve.two)),
                    e = a.redMul(n.redSub(l)),
                    a.redSqr().redSub(a).redSub(a)) : (i = this.z.redSqr(),
                    r = a.redSub(i).redISub(i),
                    t = o.redSub(s).redISub(l).redMul(r),
                    e = a.redMul(n.redSub(l)),
                    a.redMul(r))) : (n = s.redAdd(l),
                i = this.curve._mulC(this.z).redSqr(),
                r = n.redSub(i).redSub(i),
                t = this.curve._mulC(o.redISub(n)).redMul(r),
                e = this.curve._mulC(n).redMul(s.redISub(l)),
                n.redMul(r)),
                this.curve.point(t, e, a)
        }
        ,
        Oe.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
        }
        ,
        Oe.prototype._extAdd = function (t) {
            var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x))
                , n = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x))
                , i = this.t.redMul(this.curve.dd).redMul(t.t)
                , r = (t = this.z.redMul(t.z.redAdd(t.z)),
                n.redSub(e))
                , a = t.redSub(i);
            t = t.redAdd(i),
                i = n.redAdd(e),
                n = r.redMul(a),
                e = t.redMul(i),
                r = r.redMul(i),
                i = a.redMul(t);
            return this.curve.point(n, e, i, r)
        }
        ,
        Oe.prototype._projAdd = function (t) {
            var e, n = this.z.redMul(t.z), i = n.redSqr(), r = this.x.redMul(t.x), a = this.y.redMul(t.y),
                o = this.curve.d.redMul(r).redMul(a), s = i.redSub(o);
            i = i.redAdd(o),
                o = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(r).redISub(a),
                t = n.redMul(s).redMul(o),
                o = this.curve.twisted ? (e = n.redMul(i).redMul(a.redSub(this.curve._mulA(r))),
                    s.redMul(i)) : (e = n.redMul(i).redMul(a.redSub(r)),
                    this.curve._mulC(s).redMul(i));
            return this.curve.point(t, e, o)
        }
        ,
        Oe.prototype.add = function (t) {
            return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
        }
        ,
        Oe.prototype.mul = function (t) {
            return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
        }
        ,
        Oe.prototype.mulAdd = function (t, e, n) {
            return this.curve._wnafMulAdd(1, [this, e], [t, n], 2, !1)
        }
        ,
        Oe.prototype.jmulAdd = function (t, e, n) {
            return this.curve._wnafMulAdd(1, [this, e], [t, n], 2, !0)
        }
        ,
        Oe.prototype.normalize = function () {
            if (this.zOne)
                return this;
            var t = this.z.redInvm();
            return this.x = this.x.redMul(t),
                this.y = this.y.redMul(t),
            this.t && (this.t = this.t.redMul(t)),
                this.z = this.curve.one,
                this.zOne = !0,
                this
        }
        ,
        Oe.prototype.neg = function () {
            return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
        }
        ,
        Oe.prototype.getX = function () {
            return this.normalize(),
                this.x.fromRed()
        }
        ,
        Oe.prototype.getY = function () {
            return this.normalize(),
                this.y.fromRed()
        }
        ,
        Oe.prototype.eq = function (t) {
            return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
        }
        ,
        Oe.prototype.eqXToP = function (t) {
            var e = t.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(e))
                return !0;
            for (var n = t.clone(), i = this.curve.redN.redMul(this.z); ;) {
                if (n.iadd(this.curve.n),
                0 <= n.cmp(this.curve.p))
                    return !1;
                if (e.redIAdd(i),
                0 === this.x.cmp(e))
                    return !0
            }
        }
        ,
        Oe.prototype.toP = Oe.prototype.normalize,
        Oe.prototype.mixedAdd = Oe.prototype.add;
    var xe = ft(function (t, e) {
        e.base = Ht,
            e.short = Se,
            e.mont = Ce,
            e.edwards = Pe
    });

    function Te(t) {
        return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
    }

    function Be(t) {
        return 1 === t.length ? "0" + t : t
    }

    function Le(t) {
        return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
    }

    var De = {
        inherits: mt,
        toArray: function (t, e) {
            if (Array.isArray(t))
                return t.slice();
            if (!t)
                return [];
            var n, i, r = [];
            if ("string" == typeof t)
                if (e) {
                    if ("hex" === e)
                        for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t),
                                 o = 0; o < t.length; o += 2)
                            r.push(parseInt(t[o] + t[o + 1], 16))
                } else
                    for (var a = 0, o = 0; o < t.length; o++) {
                        var s = t.charCodeAt(o);
                        s < 128 ? r[a++] = s : s < 2048 ? (r[a++] = s >> 6 | 192,
                            r[a++] = 63 & s | 128) : (i = o,
                            55296 != (64512 & (n = t).charCodeAt(i)) || i < 0 || i + 1 >= n.length || 56320 != (64512 & n.charCodeAt(i + 1)) ? r[a++] = s >> 12 | 224 : (s = 65536 + ((1023 & s) << 10) + (1023 & t.charCodeAt(++o)),
                                r[a++] = s >> 18 | 240,
                                r[a++] = s >> 12 & 63 | 128),
                            r[a++] = s >> 6 & 63 | 128,
                            r[a++] = 63 & s | 128)
                    }
            else
                for (o = 0; o < t.length; o++)
                    r[o] = 0 | t[o];
            return r
        },
        toHex: function (t) {
            for (var e = "", n = 0; n < t.length; n++)
                e += Be(t[n].toString(16));
            return e
        },
        htonl: Te,
        toHex32: function (t, e) {
            for (var n = "", i = 0; i < t.length; i++) {
                var r = t[i];
                n += Le((r = "little" === e ? Te(r) : r).toString(16))
            }
            return n
        },
        zero2: Be,
        zero8: Le,
        join32: function (t, e, n, i) {
            Bt((n -= e) % 4 == 0);
            for (var r = new Array(n / 4), a = 0, o = e; a < r.length; a++,
                o += 4) {
                var s = "big" === i ? t[o] << 24 | t[o + 1] << 16 | t[o + 2] << 8 | t[o + 3] : t[o + 3] << 24 | t[o + 2] << 16 | t[o + 1] << 8 | t[o];
                r[a] = s >>> 0
            }
            return r
        },
        split32: function (t, e) {
            for (var n = new Array(4 * t.length), i = 0, r = 0; i < t.length; i++,
                r += 4) {
                var a = t[i];
                "big" === e ? (n[r] = a >>> 24,
                    n[r + 1] = a >>> 16 & 255,
                    n[r + 2] = a >>> 8 & 255,
                    n[r + 3] = 255 & a) : (n[r + 3] = a >>> 24,
                    n[r + 2] = a >>> 16 & 255,
                    n[r + 1] = a >>> 8 & 255,
                    n[r] = 255 & a)
            }
            return n
        },
        rotr32: function (t, e) {
            return t >>> e | t << 32 - e
        },
        rotl32: function (t, e) {
            return t << e | t >>> 32 - e
        },
        sum32: function (t, e) {
            return t + e >>> 0
        },
        sum32_3: function (t, e, n) {
            return t + e + n >>> 0
        },
        sum32_4: function (t, e, n, i) {
            return t + e + n + i >>> 0
        },
        sum32_5: function (t, e, n, i, r) {
            return t + e + n + i + r >>> 0
        },
        sum64: function (t, e, n, i) {
            var r = t[e]
                , a = i + t[e + 1] >>> 0;
            t[e] = (a < i ? 1 : 0) + n + r >>> 0,
                t[e + 1] = a
        },
        sum64_hi: function (t, e, n, i) {
            return (e + i >>> 0 < e ? 1 : 0) + t + n >>> 0
        },
        sum64_lo: function (t, e, n, i) {
            return e + i >>> 0
        },
        sum64_4_hi: function (t, e, n, i, r, a, o, s) {
            var l = 0;
            return t + n + r + o + ((l = l + ((t = e + i >>> 0) < e ? 1 : 0) + ((t = t + a >>> 0) < a ? 1 : 0)) + (t + s >>> 0 < s ? 1 : 0)) >>> 0
        },
        sum64_4_lo: function (t, e, n, i, r, a, o, s) {
            return e + i + a + s >>> 0
        },
        sum64_5_hi: function (t, e, n, i, r, a, o, s, l, u) {
            var c = 0;
            return t + n + r + o + l + ((c = (c += (t = e + i >>> 0) < e ? 1 : 0) + ((t = t + a >>> 0) < a ? 1 : 0) + ((t = t + s >>> 0) < s ? 1 : 0)) + (t + u >>> 0 < u ? 1 : 0)) >>> 0
        },
        sum64_5_lo: function (t, e, n, i, r, a, o, s, l, u) {
            return e + i + a + s + u >>> 0
        },
        rotr64_hi: function (t, e, n) {
            return (e << 32 - n | t >>> n) >>> 0
        },
        rotr64_lo: function (t, e, n) {
            return (t << 32 - n | e >>> n) >>> 0
        },
        shr64_hi: function (t, e, n) {
            return t >>> n
        },
        shr64_lo: function (t, e, n) {
            return (t << 32 - n | e >>> n) >>> 0
        }
    };

    function qe() {
        this.pending = null,
            this.pendingTotal = 0,
            this.blockSize = this.constructor.blockSize,
            this.outSize = this.constructor.outSize,
            this.hmacStrength = this.constructor.hmacStrength,
            this.padLength = this.constructor.padLength / 8,
            this.endian = "big",
            this._delta8 = this.blockSize / 8,
            this._delta32 = this.blockSize / 32
    }

    bt = qe;
    var Fe = (qe.prototype.update = function (t, e) {
        if (t = De.toArray(t, e),
            this.pending ? this.pending = this.pending.concat(t) : this.pending = t,
            this.pendingTotal += t.length,
        this.pending.length >= this._delta8) {
            e = (t = this.pending).length % this._delta8,
                this.pending = t.slice(t.length - e, t.length),
            0 === this.pending.length && (this.pending = null),
                t = De.join32(t, 0, t.length - e, this.endian);
            for (var n = 0; n < t.length; n += this._delta32)
                this._update(t, n, n + this._delta32)
        }
        return this
    }
        ,
        qe.prototype.digest = function (t) {
            return this.update(this._pad()),
                Bt(null === this.pending),
                this._digest(t)
        }
        ,
        qe.prototype._pad = function () {
            var t = this.pendingTotal
                , e = this._delta8
                , n = e - (t + this.padLength) % e
                , i = new Array(n + this.padLength);
            i[0] = 128;
            for (var r = 1; r < n; r++)
                i[r] = 0;
            if (t <<= 3,
            "big" === this.endian) {
                for (var a = 8; a < this.padLength; a++)
                    i[r++] = 0;
                i[r++] = 0,
                    i[r++] = 0,
                    i[r++] = 0,
                    i[r++] = 0,
                    i[r++] = t >>> 24 & 255,
                    i[r++] = t >>> 16 & 255,
                    i[r++] = t >>> 8 & 255,
                    i[r++] = 255 & t
            } else
                for (i[r++] = 255 & t,
                         i[r++] = t >>> 8 & 255,
                         i[r++] = t >>> 16 & 255,
                         i[r++] = t >>> 24 & 255,
                         i[r++] = 0,
                         i[r++] = 0,
                         i[r++] = 0,
                         i[r++] = 0,
                         a = 8; a < this.padLength; a++)
                    i[r++] = 0;
            return i
        }
        ,
        {
            BlockHash: bt
        })
        , Ue = De.rotr32;

    function Ve(t, e, n) {
        return t & e ^ ~t & n
    }

    function ze(t, e, n) {
        return t & e ^ t & n ^ e & n
    }

    gt = function (t, e, n, i) {
        return 0 === t ? Ve(e, n, i) : 1 === t || 3 === t ? e ^ n ^ i : 2 === t ? ze(e, n, i) : void 0
    }
        ,
        vt = Ve,
        yt = ze,
        wt = function (t) {
            return Ue(t, 2) ^ Ue(t, 13) ^ Ue(t, 22)
        }
        ,
        _t = function (t) {
            return Ue(t, 6) ^ Ue(t, 11) ^ Ue(t, 25)
        }
        ,
        Mt = function (t) {
            return Ue(t, 7) ^ Ue(t, 18) ^ t >>> 3
        }
        ,
        St = function (t) {
            return Ue(t, 17) ^ Ue(t, 19) ^ t >>> 10
        }
    ;
    var je = De.rotl32
        , Ye = De.sum32
        , Ge = De.sum32_5
        , We = gt
        , He = Fe.BlockHash
        , Ke = [1518500249, 1859775393, 2400959708, 3395469782];

    function Ze() {
        if (!(this instanceof Ze))
            return new Ze;
        He.call(this),
            this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            this.W = new Array(80)
    }

    De.inherits(Ze, He);
    kt = Ze;
    var Qe = (Ze.blockSize = 512,
            Ze.outSize = 160,
            Ze.hmacStrength = 80,
            Ze.padLength = 64,
            Ze.prototype._update = function (t, e) {
                for (var n = this.W, i = 0; i < 16; i++)
                    n[i] = t[e + i];
                for (; i < n.length; i++)
                    n[i] = je(n[i - 3] ^ n[i - 8] ^ n[i - 14] ^ n[i - 16], 1);
                var r = this.h[0]
                    , a = this.h[1]
                    , o = this.h[2]
                    , s = this.h[3]
                    , l = this.h[4];
                for (i = 0; i < n.length; i++) {
                    var u = ~~(i / 20);
                    u = Ge(je(r, 5), We(u, a, o, s), l, n[i], Ke[u]),
                        l = s,
                        s = o,
                        o = je(a, 30),
                        a = r,
                        r = u
                }
                this.h[0] = Ye(this.h[0], r),
                    this.h[1] = Ye(this.h[1], a),
                    this.h[2] = Ye(this.h[2], o),
                    this.h[3] = Ye(this.h[3], s),
                    this.h[4] = Ye(this.h[4], l)
            }
            ,
            Ze.prototype._digest = function (t) {
                return "hex" === t ? De.toHex32(this.h, "big") : De.split32(this.h, "big")
            }
            ,
            De.sum32)
        , Je = De.sum32_4
        , Xe = De.sum32_5
        , $e = vt
        , tn = yt
        , en = wt
        , nn = _t
        , rn = Mt
        , an = St
        , on = Fe.BlockHash
        ,
        sn = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

    function ln() {
        if (!(this instanceof ln))
            return new ln;
        on.call(this),
            this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
            this.k = sn,
            this.W = new Array(64)
    }

    De.inherits(ln, on);
    var un = ln;

    function cn() {
        if (!(this instanceof cn))
            return new cn;
        un.call(this),
            this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
    }

    ln.blockSize = 512,
        ln.outSize = 256,
        ln.hmacStrength = 192,
        ln.padLength = 64,
        ln.prototype._update = function (t, e) {
            for (var n = this.W, i = 0; i < 16; i++)
                n[i] = t[e + i];
            for (; i < n.length; i++)
                n[i] = Je(an(n[i - 2]), n[i - 7], rn(n[i - 15]), n[i - 16]);
            var r = this.h[0]
                , a = this.h[1]
                , o = this.h[2]
                , s = this.h[3]
                , l = this.h[4]
                , u = this.h[5]
                , c = this.h[6]
                , f = this.h[7];
            for (Bt(this.k.length === n.length),
                     i = 0; i < n.length; i++) {
                var d = Xe(f, nn(l), $e(l, u, c), this.k[i], n[i])
                    , h = Qe(en(r), tn(r, a, o));
                f = c,
                    c = u,
                    u = l,
                    l = Qe(s, d),
                    s = o,
                    o = a,
                    a = r,
                    r = Qe(d, h)
            }
            this.h[0] = Qe(this.h[0], r),
                this.h[1] = Qe(this.h[1], a),
                this.h[2] = Qe(this.h[2], o),
                this.h[3] = Qe(this.h[3], s),
                this.h[4] = Qe(this.h[4], l),
                this.h[5] = Qe(this.h[5], u),
                this.h[6] = Qe(this.h[6], c),
                this.h[7] = Qe(this.h[7], f)
        }
        ,
        ln.prototype._digest = function (t) {
            return "hex" === t ? De.toHex32(this.h, "big") : De.split32(this.h, "big")
        }
        ,
        De.inherits(cn, un);
    Et = cn;
    var fn = (cn.blockSize = 512,
            cn.outSize = 224,
            cn.hmacStrength = 192,
            cn.padLength = 64,
            cn.prototype._digest = function (t) {
                return "hex" === t ? De.toHex32(this.h.slice(0, 7), "big") : De.split32(this.h.slice(0, 7), "big")
            }
            ,
            De.rotr64_hi)
        , dn = De.rotr64_lo
        , hn = De.shr64_hi
        , pn = De.shr64_lo
        , mn = De.sum64
        , bn = De.sum64_hi
        , gn = De.sum64_lo
        , vn = De.sum64_4_hi
        , yn = De.sum64_4_lo
        , wn = De.sum64_5_hi
        , _n = De.sum64_5_lo
        , Mn = Fe.BlockHash
        ,
        Sn = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

    function kn() {
        if (!(this instanceof kn))
            return new kn;
        Mn.call(this),
            this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209],
            this.k = Sn,
            this.W = new Array(160)
    }

    De.inherits(kn, Mn);
    var En = kn;

    function An() {
        if (!(this instanceof An))
            return new An;
        En.call(this),
            this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
    }

    kn.blockSize = 1024,
        kn.outSize = 512,
        kn.hmacStrength = 192,
        kn.padLength = 128,
        kn.prototype._prepareBlock = function (t, e) {
            for (var n = this.W, i = 0; i < 32; i++)
                n[i] = t[e + i];
            for (; i < n.length; i += 2) {
                o = n[i - 4],
                    r = n[i - 3],
                (o = fn(o, r, 19) ^ fn(r, o, 29) ^ hn(o, r, 6)) < 0 && (o += 4294967296);
                var r = o
                    , a = (o = n[i - 4],
                    a = n[i - 3],
                (o = dn(o, a, 19) ^ dn(a, o, 29) ^ pn(o, a, 6)) < 0 && (o += 4294967296),
                    o)
                    , o = n[i - 14]
                    , s = n[i - 13]
                    , l = (c = n[i - 30],
                    l = n[i - 29],
                (c = fn(c, l, 1) ^ fn(c, l, 8) ^ hn(c, l, 7)) < 0 && (c += 4294967296),
                    c)
                    , u = (c = n[i - 30],
                    u = n[i - 29],
                (c = dn(c, u, 1) ^ dn(c, u, 8) ^ pn(c, u, 7)) < 0 && (c += 4294967296),
                    c)
                    , c = n[i - 32]
                    , f = n[i - 31];
                n[i] = vn(r, a, o, s, l, u, c, f),
                    n[i + 1] = yn(r, a, o, s, l, u, c, f)
            }
        }
        ,
        kn.prototype._update = function (t, e) {
            this._prepareBlock(t, e);
            var n = this.W
                , i = this.h[0]
                , r = this.h[1]
                , a = this.h[2]
                , o = this.h[3]
                , s = this.h[4]
                , l = this.h[5]
                , u = this.h[6]
                , c = this.h[7]
                , f = this.h[8]
                , d = this.h[9]
                , h = this.h[10]
                , p = this.h[11]
                , m = this.h[12]
                , b = this.h[13]
                , g = this.h[14]
                , v = this.h[15];
            Bt(this.k.length === n.length);
            for (var y = 0; y < n.length; y += 2) {
                var w, _ = g, M = v,
                    S = ((k = fn(S = f, k = d, 14) ^ fn(S, k, 18) ^ fn(k, S, 9)) < 0 && (k += 4294967296),
                        k),
                    k = ((N = dn(k = f, N = d, 14) ^ dn(k, N, 18) ^ dn(N, k, 9)) < 0 && (N += 4294967296),
                        N), E = ((N = f & (N = h) ^ ~f & m) < 0 && (N += 4294967296),
                    (w = d & (w = p) ^ ~d & b) < 0 && (w += 4294967296),
                        this.k[y]), A = this.k[y + 1], C = n[y], R = n[y + 1],
                    I = wn(_, M, S, k, N, w, E, A, C, R), N = _n(_, M, S, k, N, w, E, A, C, R);
                E = ((E = fn(w = i, E = r, 28) ^ fn(E, w, 2) ^ fn(E, w, 7)) < 0 && (E += 4294967296),
                    _ = E,
                (C = dn(A = i, C = r, 28) ^ dn(C, A, 2) ^ dn(C, A, 7)) < 0 && (C += 4294967296),
                (R = (R = i) & a ^ R & s ^ a & s) < 0 && (R += 4294967296),
                (w = (w = r) & o ^ w & l ^ o & l) < 0 && (w += 4294967296),
                    bn(_, M = C, S = R, k = w)),
                    A = gn(_, M, S, k),
                    g = m,
                    v = b,
                    m = h,
                    b = p,
                    h = f,
                    p = d,
                    f = bn(u, c, I, N),
                    d = gn(c, c, I, N),
                    u = s,
                    c = l,
                    s = a,
                    l = o,
                    a = i,
                    o = r,
                    i = bn(I, N, E, A),
                    r = gn(I, N, E, A)
            }
            mn(this.h, 0, i, r),
                mn(this.h, 2, a, o),
                mn(this.h, 4, s, l),
                mn(this.h, 6, u, c),
                mn(this.h, 8, f, d),
                mn(this.h, 10, h, p),
                mn(this.h, 12, m, b),
                mn(this.h, 14, g, v)
        }
        ,
        kn.prototype._digest = function (t) {
            return "hex" === t ? De.toHex32(this.h, "big") : De.split32(this.h, "big")
        }
        ,
        De.inherits(An, En);
    At = An;
    var Cn = (An.blockSize = 1024,
        An.outSize = 384,
        An.hmacStrength = 192,
        An.padLength = 128,
        An.prototype._digest = function (t) {
            return "hex" === t ? De.toHex32(this.h.slice(0, 12), "big") : De.split32(this.h.slice(0, 12), "big")
        }
        ,
        {
            sha1: kt,
            sha224: Et,
            sha256: un,
            sha384: At,
            sha512: En
        })
        , Rn = De.rotl32
        , In = De.sum32
        , Nn = De.sum32_3
        , Pn = De.sum32_4
        , On = Fe.BlockHash;

    function xn() {
        if (!(this instanceof xn))
            return new xn;
        On.call(this),
            this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            this.endian = "little"
    }

    function Tn(t, e, n, i) {
        return t <= 15 ? e ^ n ^ i : t <= 31 ? e & n | ~e & i : t <= 47 ? (e | ~n) ^ i : t <= 63 ? e & i | n & ~i : e ^ (n | ~i)
    }

    De.inherits(xn, On),
        Ct = xn,
        xn.blockSize = 512,
        xn.outSize = 160,
        xn.hmacStrength = 192,
        xn.padLength = 64,
        xn.prototype._update = function (t, e) {
            for (var n, i = c = this.h[0], r = p = this.h[1], a = h = this.h[2], o = d = this.h[3], s = f = this.h[4], l = 0; l < 80; l++) {
                var u = In(Rn(Pn(c, Tn(l, p, h, d), t[Bn[l] + e], (n = l) <= 15 ? 0 : n <= 31 ? 1518500249 : n <= 47 ? 1859775393 : n <= 63 ? 2400959708 : 2840853838), Dn[l]), f)
                    , c = f
                    , f = d
                    , d = Rn(h, 10)
                    , h = p
                    , p = u;
                u = In(Rn(Pn(i, Tn(79 - l, r, a, o), t[Ln[l] + e], (n = l) <= 15 ? 1352829926 : n <= 31 ? 1548603684 : n <= 47 ? 1836072691 : n <= 63 ? 2053994217 : 0), qn[l]), s),
                    i = s,
                    s = o,
                    o = Rn(a, 10),
                    a = r,
                    r = u
            }
            u = Nn(this.h[1], h, o),
                this.h[1] = Nn(this.h[2], d, s),
                this.h[2] = Nn(this.h[3], f, i),
                this.h[3] = Nn(this.h[4], c, r),
                this.h[4] = Nn(this.h[0], p, a),
                this.h[0] = u
        }
        ,
        xn.prototype._digest = function (t) {
            return "hex" === t ? De.toHex32(this.h, "little") : De.split32(this.h, "little")
        }
    ;
    var Bn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]
        ,
        Ln = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]
        ,
        Dn = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]
        ,
        qn = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
        , Fn = {
            ripemd160: Ct
        };

    function Un(t, e, n) {
        if (!(this instanceof Un))
            return new Un(t, e, n);
        this.Hash = t,
            this.blockSize = t.blockSize / 8,
            this.outSize = t.outSize / 8,
            this.inner = null,
            this.outer = null,
            this._init(De.toArray(e, n))
    }

    var Vn = Un
        , zn = (Un.prototype._init = function (t) {
        t.length > this.blockSize && (t = (new this.Hash).update(t).digest()),
            Bt(t.length <= this.blockSize);
        for (var e = t.length; e < this.blockSize; e++)
            t.push(0);
        for (e = 0; e < t.length; e++)
            t[e] ^= 54;
        for (this.inner = (new this.Hash).update(t),
                 e = 0; e < t.length; e++)
            t[e] ^= 106;
        this.outer = (new this.Hash).update(t)
    }
        ,
        Un.prototype.update = function (t, e) {
            return this.inner.update(t, e),
                this
        }
        ,
        Un.prototype.digest = function (t) {
            return this.outer.update(this.inner.digest()),
                this.outer.digest(t)
        }
        ,
        ft(function (t, e) {
            e.utils = De,
                e.common = Fe,
                e.sha = Cn,
                e.ripemd = Fn,
                e.hmac = Vn,
                e.sha1 = e.sha.sha1,
                e.sha256 = e.sha.sha256,
                e.sha224 = e.sha.sha224,
                e.sha384 = e.sha.sha384,
                e.sha512 = e.sha.sha512,
                e.ripemd160 = e.ripemd.ripemd160
        }))
        , jn = {
        doubles: {
            step: 4,
            points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]
        },
        naf: {
            wnd: 7,
            points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]
        }
    }
        , Yn = ft(function (t, e) {
        var n, i = e, r = Ut.assert;

        function a(t) {
            "short" === t.type ? this.curve = new xe.short(t) : "edwards" === t.type ? this.curve = new xe.edwards(t) : this.curve = new xe.mont(t),
                this.g = this.curve.g,
                this.n = this.curve.n,
                this.hash = t.hash,
                r(this.g.validate(), "Invalid curve"),
                r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
        }

        function o(t, e) {
            Object.defineProperty(i, t, {
                configurable: !0,
                enumerable: !0,
                get: function () {
                    var n = new a(e);
                    return Object.defineProperty(i, t, {
                        configurable: !0,
                        enumerable: !0,
                        value: n
                    }),
                        n
                }
            })
        }

        i.PresetCurve = a,
            o("p192", {
                type: "short",
                prime: "p192",
                p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
                b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
                n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
                hash: zn.sha256,
                gRed: !1,
                g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
            }),
            o("p224", {
                type: "short",
                prime: "p224",
                p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
                b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
                n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
                hash: zn.sha256,
                gRed: !1,
                g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
            }),
            o("p256", {
                type: "short",
                prime: null,
                p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
                a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
                b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
                n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
                hash: zn.sha256,
                gRed: !1,
                g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
            }),
            o("p384", {
                type: "short",
                prime: null,
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
                a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
                b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
                n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
                hash: zn.sha384,
                gRed: !1,
                g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
            }),
            o("p521", {
                type: "short",
                prime: null,
                p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
                a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
                b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
                n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
                hash: zn.sha512,
                gRed: !1,
                g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
            }),
            o("curve25519", {
                type: "mont",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "76d06",
                b: "1",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: zn.sha256,
                gRed: !1,
                g: ["9"]
            }),
            o("ed25519", {
                type: "edwards",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "-1",
                c: "1",
                d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: zn.sha256,
                gRed: !1,
                g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
            });
        try {
            n = jn
        } catch (t) {
            n = void 0
        }
        o("secp256k1", {
            type: "short",
            prime: "k256",
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            a: "0",
            b: "7",
            n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
            h: "1",
            hash: zn.sha256,
            beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
            lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
            basis: [{
                a: "3086d221a7d46bcde86c90e49284eb15",
                b: "-e4437ed6010e88286f547fa90abfe4c3"
            }, {
                a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                b: "3086d221a7d46bcde86c90e49284eb15"
            }],
            gRed: !1,
            g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", n]
        })
    });

    function Gn(t) {
        if (!(this instanceof Gn))
            return new Gn(t);
        this.hash = t.hash,
            this.predResist = !!t.predResist,
            this.outLen = this.hash.outSize,
            this.minEntropy = t.minEntropy || this.hash.hmacStrength,
            this._reseed = null,
            this.reseedInterval = null,
            this.K = null,
            this.V = null;
        var e = Ft.toArray(t.entropy, t.entropyEnc || "hex")
            , n = Ft.toArray(t.nonce, t.nonceEnc || "hex");
        t = Ft.toArray(t.pers, t.persEnc || "hex");
        Bt(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"),
            this._init(e, n, t)
    }

    var Wn = Gn
        , Hn = (Gn.prototype._init = function (t, e, n) {
        t = t.concat(e).concat(n),
            this.K = new Array(this.outLen / 8),
            this.V = new Array(this.outLen / 8);
        for (var i = 0; i < this.V.length; i++)
            this.K[i] = 0,
                this.V[i] = 1;
        this._update(t),
            this._reseed = 1,
            this.reseedInterval = 281474976710656
    }
        ,
        Gn.prototype._hmac = function () {
            return new zn.hmac(this.hash, this.K)
        }
        ,
        Gn.prototype._update = function (t) {
            var e = this._hmac().update(this.V).update([0]);
            t && (e = e.update(t)),
                this.K = e.digest(),
                this.V = this._hmac().update(this.V).digest(),
            t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(),
                this.V = this._hmac().update(this.V).digest())
        }
        ,
        Gn.prototype.reseed = function (t, e, n, i) {
            "string" != typeof e && (i = n,
                n = e,
                e = null),
                t = Ft.toArray(t, e),
                n = Ft.toArray(n, i),
                Bt(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"),
                this._update(t.concat(n || [])),
                this._reseed = 1
        }
        ,
        Gn.prototype.generate = function (t, e, n, i) {
            if (this._reseed > this.reseedInterval)
                throw new Error("Reseed is required");
            "string" != typeof e && (i = n,
                n = e,
                e = null),
            n && (n = Ft.toArray(n, i || "hex"),
                this._update(n));
            for (var r = []; r.length < t;)
                this.V = this._hmac().update(this.V).digest(),
                    r = r.concat(this.V);
            return i = r.slice(0, t),
                this._update(n),
                this._reseed++,
                Ft.encode(i, e)
        }
        ,
        Ut.assert);

    function Kn(t, e) {
        this.ec = t,
            this.priv = null,
            this.pub = null,
        e.priv && this._importPrivate(e.priv, e.privEnc),
        e.pub && this._importPublic(e.pub, e.pubEnc)
    }

    var Zn = Kn
        , Qn = (Kn.fromPublic = function (t, e, n) {
        return e instanceof Kn ? e : new Kn(t, {
            pub: e,
            pubEnc: n
        })
    }
        ,
        Kn.fromPrivate = function (t, e, n) {
            return e instanceof Kn ? e : new Kn(t, {
                priv: e,
                privEnc: n
            })
        }
        ,
        Kn.prototype.validate = function () {
            var t = this.getPublic();
            return t.isInfinity() ? {
                result: !1,
                reason: "Invalid public key"
            } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
                result: !0,
                reason: null
            } : {
                result: !1,
                reason: "Public key * N != O"
            } : {
                result: !1,
                reason: "Public key is not a point"
            }
        }
        ,
        Kn.prototype.getPublic = function (t, e) {
            return "string" == typeof t && (e = t,
                t = null),
            this.pub || (this.pub = this.ec.g.mul(this.priv)),
                e ? this.pub.encode(e, t) : this.pub
        }
        ,
        Kn.prototype.getPrivate = function (t) {
            return "hex" === t ? this.priv.toString(16, 2) : this.priv
        }
        ,
        Kn.prototype._importPrivate = function (t, e) {
            this.priv = new Tt(t, e || 16),
                this.priv = this.priv.umod(this.ec.curve.n)
        }
        ,
        Kn.prototype._importPublic = function (t, e) {
            if (t.x || t.y)
                return "mont" === this.ec.curve.type ? Hn(t.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || Hn(t.x && t.y, "Need both x and y coordinate"),
                    void (this.pub = this.ec.curve.point(t.x, t.y));
            this.pub = this.ec.curve.decodePoint(t, e)
        }
        ,
        Kn.prototype.derive = function (t) {
            return t.validate() || Hn(t.validate(), "public point not validated"),
                t.mul(this.priv).getX()
        }
        ,
        Kn.prototype.sign = function (t, e, n) {
            return this.ec.sign(t, this, e, n)
        }
        ,
        Kn.prototype.verify = function (t, e) {
            return this.ec.verify(t, e, this)
        }
        ,
        Kn.prototype.inspect = function () {
            return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
        }
        ,
        Ut.assert);

    function Jn(t, e) {
        if (t instanceof Jn)
            return t;
        this._importDER(t, e) || (Qn(t.r && t.s, "Signature without r or s"),
            this.r = new Tt(t.r, 16),
            this.s = new Tt(t.s, 16),
            void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
    }

    var Xn = Jn;

    function $n(t, e) {
        var n = t[e.place++];
        if (!(128 & n))
            return n;
        var i = 15 & n;
        if (0 == i || 4 < i)
            return !1;
        for (var r = 0, a = 0, o = e.place; a < i; a++,
            o++)
            r = ((r <<= 8) | t[o]) >>> 0;
        return !(r <= 127) && (e.place = o,
            r)
    }

    function ti(t) {
        for (var e = 0, n = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < n;)
            e++;
        return 0 === e ? t : t.slice(e)
    }

    function ei(t, e) {
        if (e < 128)
            t.push(e);
        else {
            var n = 1 + (Math.log(e) / Math.LN2 >>> 3);
            for (t.push(128 | n); --n;)
                t.push(e >>> (n << 3) & 255);
            t.push(e)
        }
    }

    Jn.prototype._importDER = function (t, e) {
        if (48 !== (t = Ut.toArray(t, e))[(e = new function () {
                this.place = 0
            }
        ).place++])
            return !1;
        var n = $n(t, e);
        if (!1 === n)
            return !1;
        if (n + e.place !== t.length)
            return !1;
        if (2 !== t[e.place++])
            return !1;
        if (!1 === (n = $n(t, e)))
            return !1;
        var i = t.slice(e.place, n + e.place);
        if (e.place += n,
        2 !== t[e.place++])
            return !1;
        if (!1 === (n = $n(t, e)))
            return !1;
        if (t.length !== n + e.place)
            return !1;
        if (t = t.slice(e.place, n + e.place),
        0 === i[0]) {
            if (!(128 & i[1]))
                return !1;
            i = i.slice(1)
        }
        if (0 === t[0]) {
            if (!(128 & t[1]))
                return !1;
            t = t.slice(1)
        }
        return this.r = new Tt(i),
            this.s = new Tt(t),
            !(this.recoveryParam = null)
    }
        ,
        Jn.prototype.toDER = function (t) {
            var e = this.r.toArray()
                , n = this.s.toArray();
            for (128 & e[0] && (e = [0].concat(e)),
                 128 & n[0] && (n = [0].concat(n)),
                     e = ti(e),
                     n = ti(n); !(n[0] || 128 & n[1]);)
                n = n.slice(1);
            var i;
            ei(i = [2], e.length),
                (i = i.concat(e)).push(2),
                ei(i, n.length),
                e = i.concat(n);
            return ei(i = [48], e.length),
                i = i.concat(e),
                Ut.encode(i, t)
        }
    ;
    var ni = Ut.assert;

    function ii(t) {
        if (!(this instanceof ii))
            return new ii(t);
        "string" == typeof t && (ni(Object.prototype.hasOwnProperty.call(Yn, t), "Unknown curve " + t),
            t = Yn[t]),
        t instanceof Yn.PresetCurve && (t = {
            curve: t
        }),
            this.curve = t.curve.curve,
            this.n = this.curve.n,
            this.nh = this.n.ushrn(1),
            this.g = this.curve.g,
            this.g = t.curve.g,
            this.g.precompute(t.curve.n.bitLength() + 1),
            this.hash = t.hash || t.curve.hash
    }

    var ri = ii
        , ai = (ii.prototype.keyPair = function (t) {
        return new Zn(this, t)
    }
        ,
        ii.prototype.keyFromPrivate = function (t, e) {
            return Zn.fromPrivate(this, t, e)
        }
        ,
        ii.prototype.keyFromPublic = function (t, e) {
            return Zn.fromPublic(this, t, e)
        }
        ,
        ii.prototype.genKeyPair = function (t) {
            for (var e = new Wn({
                hash: this.hash,
                pers: (t = t || {}).pers,
                persEnc: t.persEnc || "utf8",
                entropy: t.entropy || Dt(this.hash.hmacStrength),
                entropyEnc: t.entropy && t.entropyEnc || "utf8",
                nonce: this.n.toArray()
            }), n = this.n.byteLength(), i = this.n.sub(new Tt(2)); ;) {
                var r = new Tt(e.generate(n));
                if (!(0 < r.cmp(i)))
                    return r.iaddn(1),
                        this.keyFromPrivate(r)
            }
        }
        ,
        ii.prototype._truncateToN = function (t, e) {
            var n = 8 * t.byteLength() - this.n.bitLength();
            return 0 < n && (t = t.ushrn(n)),
                !e && 0 <= t.cmp(this.n) ? t.sub(this.n) : t
        }
        ,
        ii.prototype.sign = function (t, e, n, i) {
            "object" == typeof n && (i = n,
                n = null),
                i = i || {},
                e = this.keyFromPrivate(e, n),
                t = this._truncateToN(new Tt(t, 16));
            n = this.n.byteLength();
            for (var r = e.getPrivate().toArray("be", n), a = (n = t.toArray("be", n),
                new Wn({
                    hash: this.hash,
                    entropy: r,
                    nonce: n,
                    pers: i.pers,
                    persEnc: i.persEnc || "utf8"
                })), o = this.n.sub(new Tt(1)), s = 0; ; s++) {
                var l = i.k ? i.k(s) : new Tt(a.generate(this.n.byteLength()));
                if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || 0 <= l.cmp(o))) {
                    var u = this.g.mul(l);
                    if (!u.isInfinity()) {
                        var c = u.getX()
                            , f = c.umod(this.n);
                        if (0 !== f.cmpn(0) && 0 !== (l = (l = l.invm(this.n).mul(f.mul(e.getPrivate()).iadd(t))).umod(this.n)).cmpn(0))
                            return u = (u.getY().isOdd() ? 1 : 0) | (0 !== c.cmp(f) ? 2 : 0),
                            i.canonical && 0 < l.cmp(this.nh) && (l = this.n.sub(l),
                                u ^= 1),
                                new Xn({
                                    r: f,
                                    s: l,
                                    recoveryParam: u
                                })
                    }
                }
            }
        }
        ,
        ii.prototype.verify = function (t, e, n, i) {
            if (t = this._truncateToN(new Tt(t, 16)),
                n = this.keyFromPublic(n, i),
                i = (e = new Xn(e, "hex")).r,
                e = e.s,
            i.cmpn(1) < 0 || 0 <= i.cmp(this.n))
                return !1;
            if (e.cmpn(1) < 0 || 0 <= e.cmp(this.n))
                return !1;
            var r;
            t = (e = e.invm(this.n)).mul(t).umod(this.n),
                e = e.mul(i).umod(this.n);
            return this.curve._maxwellTrick ? !(r = this.g.jmulAdd(t, n.getPublic(), e)).isInfinity() && r.eqXToP(i) : !(r = this.g.mulAdd(t, n.getPublic(), e)).isInfinity() && 0 === r.getX().umod(this.n).cmp(i)
        }
        ,
        ii.prototype.recoverPubKey = function (t, e, n, i) {
            ni((3 & n) === n, "The recovery param is more than two bits"),
                e = new Xn(e, i);
            i = this.n,
                t = new Tt(t);
            var r = e.r
                , a = e.s
                , o = 1 & n;
            n >>= 1;
            if (0 <= r.cmp(this.curve.p.umod(this.curve.n)) && n)
                throw new Error("Unable to find sencond key candinate");
            return r = n ? this.curve.pointFromX(r.add(this.curve.n), o) : this.curve.pointFromX(r, o),
                n = e.r.invm(i),
                o = i.sub(t).mul(n).umod(i),
                e = a.mul(n).umod(i),
                this.g.mulAdd(o, r, e)
        }
        ,
        ii.prototype.getKeyRecoveryParam = function (t, e, n, i) {
            if (null !== (e = new Xn(e, i)).recoveryParam)
                return e.recoveryParam;
            for (var r, a = 0; a < 4; a++) {
                try {
                    r = this.recoverPubKey(t, e, a)
                } catch (t) {
                    continue
                }
                if (r.eq(n))
                    return a
            }
            throw new Error("Unable to find valid recovery factor")
        }
        ,
        Ut.assert)
        , oi = Ut.parseBytes;
    Rt = Ut.cachedProperty;

    function si(t, e) {
        this.eddsa = t,
            this._secret = oi(e.secret),
            t.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = oi(e.pub)
    }

    si.fromPublic = function (t, e) {
        return e instanceof si ? e : new si(t, {
            pub: e
        })
    }
        ,
        si.fromSecret = function (t, e) {
            return e instanceof si ? e : new si(t, {
                secret: e
            })
        }
        ,
        si.prototype.secret = function () {
            return this._secret
        }
        ,
        Rt(si, "pubBytes", function () {
            return this.eddsa.encodePoint(this.pub())
        }),
        Rt(si, "pub", function () {
            return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
        }),
        Rt(si, "privBytes", function () {
            var t = this.eddsa
                , e = this.hash()
                , n = t.encodingLength - 1;
            return (e = e.slice(0, t.encodingLength))[0] &= 248,
                e[n] &= 127,
                e[n] |= 64,
                e
        }),
        Rt(si, "priv", function () {
            return this.eddsa.decodeInt(this.privBytes())
        }),
        Rt(si, "hash", function () {
            return this.eddsa.hash().update(this.secret()).digest()
        }),
        Rt(si, "messagePrefix", function () {
            return this.hash().slice(this.eddsa.encodingLength)
        }),
        si.prototype.sign = function (t) {
            return ai(this._secret, "KeyPair can only verify"),
                this.eddsa.sign(t, this)
        }
        ,
        si.prototype.verify = function (t, e) {
            return this.eddsa.verify(t, e, this)
        }
        ,
        si.prototype.getSecret = function (t) {
            return ai(this._secret, "KeyPair is public only"),
                Ut.encode(this.secret(), t)
        }
        ,
        si.prototype.getPublic = function (t) {
            return Ut.encode(this.pubBytes(), t)
        }
    ;
    var li = si
        , ui = Ut.assert
        , ci = (It = Ut.cachedProperty,
        Ut.parseBytes);

    function fi(t, e) {
        this.eddsa = t,
        "object" != typeof e && (e = ci(e)),
        Array.isArray(e) && (e = {
            R: e.slice(0, t.encodingLength),
            S: e.slice(t.encodingLength)
        }),
            ui(e.R && e.S, "Signature without R or S"),
        t.isPoint(e.R) && (this._R = e.R),
        e.S instanceof Tt && (this._S = e.S),
            this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded,
            this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded
    }

    It(fi, "S", function () {
        return this.eddsa.decodeInt(this.Sencoded())
    }),
        It(fi, "R", function () {
            return this.eddsa.decodePoint(this.Rencoded())
        }),
        It(fi, "Rencoded", function () {
            return this.eddsa.encodePoint(this.R())
        }),
        It(fi, "Sencoded", function () {
            return this.eddsa.encodeInt(this.S())
        }),
        fi.prototype.toBytes = function () {
            return this.Rencoded().concat(this.Sencoded())
        }
        ,
        fi.prototype.toHex = function () {
            return Ut.encode(this.toBytes(), "hex").toUpperCase()
        }
    ;
    var di = fi
        , hi = Ut.assert
        , pi = Ut.parseBytes;

    function mi(t) {
        if (hi("ed25519" === t, "only tested with ed25519 so far"),
            !(this instanceof mi))
            return new mi(t);
        t = Yn[t].curve,
            this.curve = t,
            this.g = t.g,
            this.g.precompute(t.n.bitLength() + 1),
            this.pointClass = t.point().constructor,
            this.encodingLength = Math.ceil(t.n.bitLength() / 8),
            this.hash = zn.sha512
    }

    var bi = mi;
    mi.prototype.sign = function (t, e) {
        t = pi(t);
        e = this.keyFromSecret(e);
        var n = this.hashInt(e.messagePrefix(), t)
            , i = this.g.mul(n)
            , r = this.encodePoint(i);
        t = this.hashInt(r, e.pubBytes(), t).mul(e.priv()),
            e = n.add(t).umod(this.curve.n);
        return this.makeSignature({
            R: i,
            S: e,
            Rencoded: r
        })
    }
        ,
        mi.prototype.verify = function (t, e, n) {
            t = pi(t),
                e = this.makeSignature(e);
            n = this.keyFromPublic(n),
                t = this.hashInt(e.Rencoded(), n.pubBytes(), t);
            var i = this.g.mul(e.S());
            return e.R().add(n.pub().mul(t)).eq(i)
        }
        ,
        mi.prototype.hashInt = function () {
            for (var t = this.hash(), e = 0; e < arguments.length; e++)
                t.update(arguments[e]);
            return Ut.intFromLE(t.digest()).umod(this.curve.n)
        }
        ,
        mi.prototype.keyFromPublic = function (t) {
            return li.fromPublic(this, t)
        }
        ,
        mi.prototype.keyFromSecret = function (t) {
            return li.fromSecret(this, t)
        }
        ,
        mi.prototype.makeSignature = function (t) {
            return t instanceof di ? t : new di(this, t)
        }
        ,
        mi.prototype.encodePoint = function (t) {
            var e = t.getY().toArray("le", this.encodingLength);
            return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0,
                e
        }
        ,
        mi.prototype.decodePoint = function (t) {
            var e = (t = Ut.parseBytes(t)).length - 1
                , n = t.slice(0, e).concat(-129 & t[e]);
            t = 0 != (128 & t[e]),
                e = Ut.intFromLE(n);
            return this.curve.pointFromY(e, t)
        }
        ,
        mi.prototype.encodeInt = function (t) {
            return t.toArray("le", this.encodingLength)
        }
        ,
        mi.prototype.decodeInt = function (t) {
            return Ut.intFromLE(t)
        }
        ,
        mi.prototype.isPoint = function (t) {
            return t instanceof this.pointClass
        }
    ;
    var gi = p && p["default"] || p
        , vi = ft(function (t, e) {
        e.version = gi.version,
            e.utils = Ut,
            e.rand = Dt,
            e.curve = xe,
            e.curves = Yn,
            e.ec = ri,
            e.eddsa = bi
    })
        , yi = ft(function (t) {
        var e, n = ct;

        function i(t, e) {
            if (!t)
                throw new Error(e || "Assertion failed")
        }

        function r(t, e) {
            function n() {
            }

            t.super_ = e,
                n.prototype = e.prototype,
                t.prototype = new n,
                t.prototype.constructor = t
        }

        function a(t, e, n) {
            if (a.isBN(t))
                return t;
            this.negative = 0,
                this.words = null,
                this.length = 0,
            (this.red = null) !== t && ("le" !== e && "be" !== e || (n = e,
                e = 10),
                this._init(t || 0, e || 10, n || "be"))
        }

        "object" == typeof t ? t.exports = a : n.BN = a,
            (a.BN = a).wordSize = 26;
        try {
            e = ("undefined" != typeof window && void 0 !== window.Buffer ? window : Y).Buffer
        } catch (t) {
        }

        function o(t, e) {
            return 48 <= (e = t.charCodeAt(e)) && e <= 57 ? e - 48 : 65 <= e && e <= 70 ? e - 55 : 97 <= e && e <= 102 ? e - 87 : void i(!1, "Invalid character in " + t)
        }

        function s(t, e, n) {
            var i = o(t, n);
            return e <= n - 1 && (i |= o(t, n - 1) << 4),
                i
        }

        function l(t, e, n, r) {
            for (var a, o = 0, s = Math.min(t.length, n), l = e; l < s; l++) {
                var u = t.charCodeAt(l) - 48;
                o *= r,
                    a = 49 <= u ? u - 49 + 10 : 17 <= u ? u - 17 + 10 : u,
                    i(0 <= u && a < r, "Invalid character"),
                    o += a
            }
            return o
        }

        function u(t, e) {
            t.words = e.words,
                t.length = e.length,
                t.negative = e.negative,
                t.red = e.red
        }

        if (a.isBN = function (t) {
            return t instanceof a || null !== t && "object" == typeof t && t.constructor.wordSize === a.wordSize && Array.isArray(t.words)
        }
            ,
            a.max = function (t, e) {
                return 0 < t.cmp(e) ? t : e
            }
            ,
            a.min = function (t, e) {
                return t.cmp(e) < 0 ? t : e
            }
            ,
            a.prototype._init = function (t, e, n) {
                if ("number" == typeof t)
                    return this._initNumber(t, e, n);
                if ("object" == typeof t)
                    return this._initArray(t, e, n);
                i((e = "hex" === e ? 16 : e) === (0 | e) && 2 <= e && e <= 36);
                var r = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (r++,
                    this.negative = 1),
                r < t.length && (16 === e ? this._parseHex(t, r, n) : (this._parseBase(t, e, r),
                "le" === n && this._initArray(this.toArray(), e, n)))
            }
            ,
            a.prototype._initNumber = function (t, e, n) {
                t < 0 && (this.negative = 1,
                    t = -t),
                    t < 67108864 ? (this.words = [67108863 & t],
                        this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863],
                        this.length = 2) : (i(t < 9007199254740992),
                        this.words = [67108863 & t, t / 67108864 & 67108863, 1],
                        this.length = 3),
                "le" === n && this._initArray(this.toArray(), e, n)
            }
            ,
            a.prototype._initArray = function (t, e, n) {
                if (i("number" == typeof t.length),
                t.length <= 0)
                    return this.words = [0],
                        this.length = 1,
                        this;
                this.length = Math.ceil(t.length / 3),
                    this.words = new Array(this.length);
                for (var r = 0; r < this.length; r++)
                    this.words[r] = 0;
                var a, o, s = 0;
                if ("be" === n)
                    for (r = t.length - 1,
                             a = 0; 0 <= r; r -= 3)
                        o = t[r] | t[r - 1] << 8 | t[r - 2] << 16,
                            this.words[a] |= o << s & 67108863,
                            this.words[a + 1] = o >>> 26 - s & 67108863,
                        26 <= (s += 24) && (s -= 26,
                            a++);
                else if ("le" === n)
                    for (a = r = 0; r < t.length; r += 3)
                        o = t[r] | t[r + 1] << 8 | t[r + 2] << 16,
                            this.words[a] |= o << s & 67108863,
                            this.words[a + 1] = o >>> 26 - s & 67108863,
                        26 <= (s += 24) && (s -= 26,
                            a++);
                return this._strip()
            }
            ,
            a.prototype._parseHex = function (t, e, n) {
                this.length = Math.ceil((t.length - e) / 6),
                    this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++)
                    this.words[i] = 0;
                var r, a = 0, o = 0;
                if ("be" === n)
                    for (i = t.length - 1; e <= i; i -= 2)
                        r = s(t, e, i) << a,
                            this.words[o] |= 67108863 & r,
                            18 <= a ? (a -= 18,
                                this.words[o += 1] |= r >>> 26) : a += 8;
                else
                    for (i = (t.length - e) % 2 == 0 ? e + 1 : e; i < t.length; i += 2)
                        r = s(t, e, i) << a,
                            this.words[o] |= 67108863 & r,
                            18 <= a ? (a -= 18,
                                this.words[o += 1] |= r >>> 26) : a += 8;
                this._strip()
            }
            ,
            a.prototype._parseBase = function (t, e, n) {
                this.words = [0];
                for (var i = 0, r = this.length = 1; r <= 67108863; r *= e)
                    i++;
                r = r / e | 0;
                for (var a = t.length - n, o = a % --i, s = Math.min(a, a - o) + n, u = 0, c = n; c < s; c += i)
                    u = l(t, c, c + i, e),
                        this.imuln(r),
                        this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                if (0 != o) {
                    var f = 1;
                    for (u = l(t, c, t.length, e),
                             c = 0; c < o; c++)
                        f *= e;
                    this.imuln(f),
                        this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                }
                this._strip()
            }
            ,
            a.prototype.copy = function (t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++)
                    t.words[e] = this.words[e];
                t.length = this.length,
                    t.negative = this.negative,
                    t.red = this.red
            }
            ,
            a.prototype._move = function (t) {
                u(t, this)
            }
            ,
            a.prototype.clone = function () {
                var t = new a(null);
                return this.copy(t),
                    t
            }
            ,
            a.prototype._expand = function (t) {
                for (; this.length < t;)
                    this.words[this.length++] = 0;
                return this
            }
            ,
            a.prototype._strip = function () {
                for (; 1 < this.length && 0 === this.words[this.length - 1];)
                    this.length--;
                return this._normSign()
            }
            ,
            a.prototype._normSign = function () {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0),
                    this
            }
            ,
        "undefined" != typeof Symbol && "function" == typeof Symbol["for"])
            try {
                a.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = c
            } catch (t) {
                a.prototype.inspect = c
            }
        else
            a.prototype.inspect = c;

        function c() {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
        }

        var f = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"]
            ,
            d = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            ,
            h = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

        function p(t, e, n) {
            n.negative = e.negative ^ t.negative;
            var i = t.length + e.length | 0
                , r = (i = (n.length = i) - 1 | 0,
            (0 | t.words[0]) * (0 | e.words[0]))
                , a = r / 67108864 | 0;
            n.words[0] = 67108863 & r;
            for (var o = 1; o < i; o++) {
                for (var s = a >>> 26, l = 67108863 & a, u = Math.min(o, e.length - 1), c = Math.max(0, o - t.length + 1); c <= u; c++)
                    s += (r = (0 | t.words[o - c | 0]) * (0 | e.words[c]) + l) / 67108864 | 0,
                        l = 67108863 & r;
                n.words[o] = 0 | l,
                    a = 0 | s
            }
            return 0 !== a ? n.words[o] = 0 | a : n.length--,
                n._strip()
        }

        a.prototype.toString = function (t, e) {
            if (e = 0 | e || 1,
            16 === (t = t || 10) || "hex" === t) {
                l = "";
                for (var n = 0, r = 0, a = 0; a < this.length; a++) {
                    var o = this.words[a]
                        , s = (16777215 & (o << n | r)).toString(16)
                        ,
                        l = 0 != (r = o >>> 24 - n & 16777215) || a !== this.length - 1 ? f[6 - s.length] + s + l : s + l;
                    26 <= (n += 2) && (n -= 26,
                        a--)
                }
                for (0 !== r && (l = r.toString(16) + l); l.length % e != 0;)
                    l = "0" + l;
                return 0 !== this.negative ? "-" + l : l
            }
            if (t === (0 | t) && 2 <= t && t <= 36) {
                var u = d[t]
                    , c = h[t]
                    , p = (l = "",
                    this.clone());
                for (p.negative = 0; !p.isZero();) {
                    var m = p.modrn(c).toString(t);
                    l = (p = p.idivn(c)).isZero() ? m + l : f[u - m.length] + m + l
                }
                for (this.isZero() && (l = "0" + l); l.length % e != 0;)
                    l = "0" + l;
                return 0 !== this.negative ? "-" + l : l
            }
            i(!1, "Base should be between 2 and 36")
        }
            ,
            a.prototype.toNumber = function () {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : 2 < this.length && i(!1, "Number can only safely store up to 53 bits"),
                    0 !== this.negative ? -t : t
            }
            ,
            a.prototype.toJSON = function () {
                return this.toString(16, 2)
            }
            ,
        e && (a.prototype.toBuffer = function (t, n) {
                return this.toArrayLike(e, t, n)
            }
        ),
            a.prototype.toArray = function (t, e) {
                return this.toArrayLike(Array, t, e)
            }
            ,
            a.prototype.toArrayLike = function (t, e, n) {
                this._strip();
                var r = this.byteLength();
                i(r <= (n = n || Math.max(1, r)), "byte array longer than desired length"),
                    i(0 < n, "Requested array length <= 0"),
                    n = n,
                    t = (t = t).allocUnsafe ? t.allocUnsafe(n) : new t(n);
                return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](t, r),
                    t
            }
            ,
            a.prototype._toArrayLikeLE = function (t, e) {
                for (var n = 0, i = 0, r = 0, a = 0; r < this.length; r++) {
                    var o = this.words[r] << a | i;
                    t[n++] = 255 & o,
                    n < t.length && (t[n++] = o >> 8 & 255),
                    n < t.length && (t[n++] = o >> 16 & 255),
                        6 === a ? (n < t.length && (t[n++] = o >> 24 & 255),
                            a = i = 0) : (i = o >>> 24,
                            a += 2)
                }
                if (n < t.length)
                    for (t[n++] = i; n < t.length;)
                        t[n++] = 0
            }
            ,
            a.prototype._toArrayLikeBE = function (t, e) {
                for (var n = t.length - 1, i = 0, r = 0, a = 0; r < this.length; r++) {
                    var o = this.words[r] << a | i;
                    t[n--] = 255 & o,
                    0 <= n && (t[n--] = o >> 8 & 255),
                    0 <= n && (t[n--] = o >> 16 & 255),
                        6 === a ? (0 <= n && (t[n--] = o >> 24 & 255),
                            a = i = 0) : (i = o >>> 24,
                            a += 2)
                }
                if (0 <= n)
                    for (t[n--] = i; 0 <= n;)
                        t[n--] = 0
            }
            ,
            Math.clz32 ? a.prototype._countBits = function (t) {
                    return 32 - Math.clz32(t)
                }
                : a.prototype._countBits = function (t) {
                    var e = 0;
                    return 4096 <= t && (e += 13,
                        t >>>= 13),
                    64 <= t && (e += 7,
                        t >>>= 7),
                    8 <= t && (e += 4,
                        t >>>= 4),
                    2 <= t && (e += 2,
                        t >>>= 2),
                    e + t
                }
            ,
            a.prototype._zeroBits = function (t) {
                if (0 === t)
                    return 26;
                var e = 0;
                return 0 == (8191 & t) && (e += 13,
                    t >>>= 13),
                0 == (127 & t) && (e += 7,
                    t >>>= 7),
                0 == (15 & t) && (e += 4,
                    t >>>= 4),
                0 == (3 & t) && (e += 2,
                    t >>>= 2),
                0 == (1 & t) && e++,
                    e
            }
            ,
            a.prototype.bitLength = function () {
                var t = this.words[this.length - 1];
                t = this._countBits(t);
                return 26 * (this.length - 1) + t
            }
            ,
            a.prototype.zeroBits = function () {
                if (this.isZero())
                    return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var n = this._zeroBits(this.words[e]);
                    if (t += n,
                    26 !== n)
                        break
                }
                return t
            }
            ,
            a.prototype.byteLength = function () {
                return Math.ceil(this.bitLength() / 8)
            }
            ,
            a.prototype.toTwos = function (t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }
            ,
            a.prototype.fromTwos = function (t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }
            ,
            a.prototype.isNeg = function () {
                return 0 !== this.negative
            }
            ,
            a.prototype.neg = function () {
                return this.clone().ineg()
            }
            ,
            a.prototype.ineg = function () {
                return this.isZero() || (this.negative ^= 1),
                    this
            }
            ,
            a.prototype.iuor = function (t) {
                for (; this.length < t.length;)
                    this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++)
                    this.words[e] = this.words[e] | t.words[e];
                return this._strip()
            }
            ,
            a.prototype.ior = function (t) {
                return i(0 == (this.negative | t.negative)),
                    this.iuor(t)
            }
            ,
            a.prototype.or = function (t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }
            ,
            a.prototype.uor = function (t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }
            ,
            a.prototype.iuand = function (t) {
                for (var e = this.length > t.length ? t : this, n = 0; n < e.length; n++)
                    this.words[n] = this.words[n] & t.words[n];
                return this.length = e.length,
                    this._strip()
            }
            ,
            a.prototype.iand = function (t) {
                return i(0 == (this.negative | t.negative)),
                    this.iuand(t)
            }
            ,
            a.prototype.and = function (t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }
            ,
            a.prototype.uand = function (t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }
            ,
            a.prototype.iuxor = function (t) {
                for (var e, n = this.length > t.length ? (e = this,
                    t) : (e = t,
                    this), i = 0; i < n.length; i++)
                    this.words[i] = e.words[i] ^ n.words[i];
                if (this !== e)
                    for (; i < e.length; i++)
                        this.words[i] = e.words[i];
                return this.length = e.length,
                    this._strip()
            }
            ,
            a.prototype.ixor = function (t) {
                return i(0 == (this.negative | t.negative)),
                    this.iuxor(t)
            }
            ,
            a.prototype.xor = function (t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }
            ,
            a.prototype.uxor = function (t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }
            ,
            a.prototype.inotn = function (t) {
                i("number" == typeof t && 0 <= t);
                var e = 0 | Math.ceil(t / 26);
                t %= 26;
                this._expand(e),
                0 < t && e--;
                for (var n = 0; n < e; n++)
                    this.words[n] = 67108863 & ~this.words[n];
                return 0 < t && (this.words[n] = ~this.words[n] & 67108863 >> 26 - t),
                    this._strip()
            }
            ,
            a.prototype.notn = function (t) {
                return this.clone().inotn(t)
            }
            ,
            a.prototype.setn = function (t, e) {
                i("number" == typeof t && 0 <= t);
                var n = t / 26 | 0;
                t %= 26;
                return this._expand(1 + n),
                    this.words[n] = e ? this.words[n] | 1 << t : this.words[n] & ~(1 << t),
                    this._strip()
            }
            ,
            a.prototype.iadd = function (t) {
                var e, n;
                if (0 !== this.negative && 0 === t.negative)
                    return this.negative = 0,
                        e = this.isub(t),
                        this.negative ^= 1,
                        this._normSign();
                if (0 === this.negative && 0 !== t.negative)
                    return t.negative = 0,
                        e = this.isub(t),
                        t.negative = 1,
                        e._normSign();
                for (var i = this.length > t.length ? (n = this,
                    t) : (n = t,
                    this), r = 0, a = 0; a < i.length; a++)
                    e = (0 | n.words[a]) + (0 | i.words[a]) + r,
                        this.words[a] = 67108863 & e,
                        r = e >>> 26;
                for (; 0 !== r && a < n.length; a++)
                    e = (0 | n.words[a]) + r,
                        this.words[a] = 67108863 & e,
                        r = e >>> 26;
                if (this.length = n.length,
                0 !== r)
                    this.words[this.length] = r,
                        this.length++;
                else if (n !== this)
                    for (; a < n.length; a++)
                        this.words[a] = n.words[a];
                return this
            }
            ,
            a.prototype.add = function (t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0,
                    e = this.sub(t),
                    t.negative ^= 1,
                    e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0,
                    e = t.sub(this),
                    this.negative = 1,
                    e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }
            ,
            a.prototype.isub = function (t) {
                var e;
                if (0 !== t.negative)
                    return t.negative = 0,
                        e = this.iadd(t),
                        t.negative = 1,
                        e._normSign();
                if (0 !== this.negative)
                    return this.negative = 0,
                        this.iadd(t),
                        this.negative = 1,
                        this._normSign();
                var n, i = this.cmp(t);
                if (0 === i)
                    return this.negative = 0,
                        this.length = 1,
                        this.words[0] = 0,
                        this;
                for (var r = 0 < i ? (n = this,
                    t) : (n = t,
                    this), a = 0, o = 0; o < r.length; o++)
                    a = (e = (0 | n.words[o]) - (0 | r.words[o]) + a) >> 26,
                        this.words[o] = 67108863 & e;
                for (; 0 !== a && o < n.length; o++)
                    a = (e = (0 | n.words[o]) + a) >> 26,
                        this.words[o] = 67108863 & e;
                if (0 === a && o < n.length && n !== this)
                    for (; o < n.length; o++)
                        this.words[o] = n.words[o];
                return this.length = Math.max(this.length, o),
                n !== this && (this.negative = 1),
                    this._strip()
            }
            ,
            a.prototype.sub = function (t) {
                return this.clone().isub(t)
            }
        ;
        var m = function (t, e, n) {
            var i = t.words
                , r = e.words
                , a = n.words
                , o = 8191 & (s = 0 | i[0])
                , s = s >>> 13
                , l = 8191 & (u = 0 | i[1])
                , u = u >>> 13
                , c = 8191 & (f = 0 | i[2])
                , f = f >>> 13
                , d = 8191 & (h = 0 | i[3])
                , h = h >>> 13
                , p = 8191 & (m = 0 | i[4])
                , m = m >>> 13
                , b = 8191 & (g = 0 | i[5])
                , g = g >>> 13
                , v = 8191 & (y = 0 | i[6])
                , y = y >>> 13
                , w = 8191 & (_ = 0 | i[7])
                , _ = _ >>> 13
                , M = 8191 & (S = 0 | i[8])
                , S = S >>> 13
                , k = 8191 & (i = 0 | i[9])
                , E = (i = i >>> 13,
                8191 & (A = 0 | r[0]))
                , A = A >>> 13
                , C = 8191 & (R = 0 | r[1])
                , R = R >>> 13
                , I = 8191 & (N = 0 | r[2])
                , N = N >>> 13
                , P = 8191 & (O = 0 | r[3])
                , O = O >>> 13
                , x = 8191 & (T = 0 | r[4])
                , T = T >>> 13
                , B = 8191 & (L = 0 | r[5])
                , L = L >>> 13
                , D = 8191 & (q = 0 | r[6])
                , q = q >>> 13
                , F = 8191 & (U = 0 | r[7])
                , U = U >>> 13
                , V = 8191 & (z = 0 | r[8])
                , z = z >>> 13
                , j = 8191 & (r = 0 | r[9])
                , Y = (r = r >>> 13,
                    n.negative = t.negative ^ e.negative,
                    n.length = 19,
                (0 + (t = Math.imul(o, E)) | 0) + ((8191 & (e = Math.imul(o, A) + Math.imul(s, E) | 0)) << 13) | 0)
                , G = (Math.imul(s, A) + (e >>> 13) | 0) + (Y >>> 26) | 0
                , W = (t = (Y &= 67108863,
                    Math.imul(l, E)),
                    e = Math.imul(l, A) + Math.imul(u, E) | 0,
                    Math.imul(u, A))
                ,
                H = (G + (t = t + Math.imul(o, C) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, R) | 0) + Math.imul(s, C) | 0)) << 13) | 0
                , K = (G = ((W + Math.imul(s, R) | 0) + (e >>> 13) | 0) + (H >>> 26) | 0,
                    H &= 67108863,
                    t = Math.imul(c, E),
                    e = Math.imul(c, A) + Math.imul(f, E) | 0,
                    W = Math.imul(f, A),
                    t = t + Math.imul(l, C) | 0,
                    e = (e + Math.imul(l, R) | 0) + Math.imul(u, C) | 0,
                    W = W + Math.imul(u, R) | 0,
                (G + (t = t + Math.imul(o, I) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, N) | 0) + Math.imul(s, I) | 0)) << 13) | 0)
                , Z = (G = ((W + Math.imul(s, N) | 0) + (e >>> 13) | 0) + (K >>> 26) | 0,
                    K &= 67108863,
                    t = Math.imul(d, E),
                    e = Math.imul(d, A) + Math.imul(h, E) | 0,
                    W = Math.imul(h, A),
                    t = t + Math.imul(c, C) | 0,
                    e = (e + Math.imul(c, R) | 0) + Math.imul(f, C) | 0,
                    W = W + Math.imul(f, R) | 0,
                    t = t + Math.imul(l, I) | 0,
                    e = (e + Math.imul(l, N) | 0) + Math.imul(u, I) | 0,
                    W = W + Math.imul(u, N) | 0,
                (G + (t = t + Math.imul(o, P) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, O) | 0) + Math.imul(s, P) | 0)) << 13) | 0)
                , Q = (G = ((W + Math.imul(s, O) | 0) + (e >>> 13) | 0) + (Z >>> 26) | 0,
                    Z &= 67108863,
                    t = Math.imul(p, E),
                    e = Math.imul(p, A) + Math.imul(m, E) | 0,
                    W = Math.imul(m, A),
                    t = t + Math.imul(d, C) | 0,
                    e = (e + Math.imul(d, R) | 0) + Math.imul(h, C) | 0,
                    W = W + Math.imul(h, R) | 0,
                    t = t + Math.imul(c, I) | 0,
                    e = (e + Math.imul(c, N) | 0) + Math.imul(f, I) | 0,
                    W = W + Math.imul(f, N) | 0,
                    t = t + Math.imul(l, P) | 0,
                    e = (e + Math.imul(l, O) | 0) + Math.imul(u, P) | 0,
                    W = W + Math.imul(u, O) | 0,
                (G + (t = t + Math.imul(o, x) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, T) | 0) + Math.imul(s, x) | 0)) << 13) | 0)
                , J = (G = ((W + Math.imul(s, T) | 0) + (e >>> 13) | 0) + (Q >>> 26) | 0,
                    Q &= 67108863,
                    t = Math.imul(b, E),
                    e = Math.imul(b, A) + Math.imul(g, E) | 0,
                    W = Math.imul(g, A),
                    t = t + Math.imul(p, C) | 0,
                    e = (e + Math.imul(p, R) | 0) + Math.imul(m, C) | 0,
                    W = W + Math.imul(m, R) | 0,
                    t = t + Math.imul(d, I) | 0,
                    e = (e + Math.imul(d, N) | 0) + Math.imul(h, I) | 0,
                    W = W + Math.imul(h, N) | 0,
                    t = t + Math.imul(c, P) | 0,
                    e = (e + Math.imul(c, O) | 0) + Math.imul(f, P) | 0,
                    W = W + Math.imul(f, O) | 0,
                    t = t + Math.imul(l, x) | 0,
                    e = (e + Math.imul(l, T) | 0) + Math.imul(u, x) | 0,
                    W = W + Math.imul(u, T) | 0,
                (G + (t = t + Math.imul(o, B) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, L) | 0) + Math.imul(s, B) | 0)) << 13) | 0)
                , X = (G = ((W + Math.imul(s, L) | 0) + (e >>> 13) | 0) + (J >>> 26) | 0,
                    J &= 67108863,
                    t = Math.imul(v, E),
                    e = Math.imul(v, A) + Math.imul(y, E) | 0,
                    W = Math.imul(y, A),
                    t = t + Math.imul(b, C) | 0,
                    e = (e + Math.imul(b, R) | 0) + Math.imul(g, C) | 0,
                    W = W + Math.imul(g, R) | 0,
                    t = t + Math.imul(p, I) | 0,
                    e = (e + Math.imul(p, N) | 0) + Math.imul(m, I) | 0,
                    W = W + Math.imul(m, N) | 0,
                    t = t + Math.imul(d, P) | 0,
                    e = (e + Math.imul(d, O) | 0) + Math.imul(h, P) | 0,
                    W = W + Math.imul(h, O) | 0,
                    t = t + Math.imul(c, x) | 0,
                    e = (e + Math.imul(c, T) | 0) + Math.imul(f, x) | 0,
                    W = W + Math.imul(f, T) | 0,
                    t = t + Math.imul(l, B) | 0,
                    e = (e + Math.imul(l, L) | 0) + Math.imul(u, B) | 0,
                    W = W + Math.imul(u, L) | 0,
                (G + (t = t + Math.imul(o, D) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, q) | 0) + Math.imul(s, D) | 0)) << 13) | 0)
                , $ = (G = ((W + Math.imul(s, q) | 0) + (e >>> 13) | 0) + (X >>> 26) | 0,
                    X &= 67108863,
                    t = Math.imul(w, E),
                    e = Math.imul(w, A) + Math.imul(_, E) | 0,
                    W = Math.imul(_, A),
                    t = t + Math.imul(v, C) | 0,
                    e = (e + Math.imul(v, R) | 0) + Math.imul(y, C) | 0,
                    W = W + Math.imul(y, R) | 0,
                    t = t + Math.imul(b, I) | 0,
                    e = (e + Math.imul(b, N) | 0) + Math.imul(g, I) | 0,
                    W = W + Math.imul(g, N) | 0,
                    t = t + Math.imul(p, P) | 0,
                    e = (e + Math.imul(p, O) | 0) + Math.imul(m, P) | 0,
                    W = W + Math.imul(m, O) | 0,
                    t = t + Math.imul(d, x) | 0,
                    e = (e + Math.imul(d, T) | 0) + Math.imul(h, x) | 0,
                    W = W + Math.imul(h, T) | 0,
                    t = t + Math.imul(c, B) | 0,
                    e = (e + Math.imul(c, L) | 0) + Math.imul(f, B) | 0,
                    W = W + Math.imul(f, L) | 0,
                    t = t + Math.imul(l, D) | 0,
                    e = (e + Math.imul(l, q) | 0) + Math.imul(u, D) | 0,
                    W = W + Math.imul(u, q) | 0,
                (G + (t = t + Math.imul(o, F) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, U) | 0) + Math.imul(s, F) | 0)) << 13) | 0)
                , tt = (G = ((W + Math.imul(s, U) | 0) + (e >>> 13) | 0) + ($ >>> 26) | 0,
                    $ &= 67108863,
                    t = Math.imul(M, E),
                    e = Math.imul(M, A) + Math.imul(S, E) | 0,
                    W = Math.imul(S, A),
                    t = t + Math.imul(w, C) | 0,
                    e = (e + Math.imul(w, R) | 0) + Math.imul(_, C) | 0,
                    W = W + Math.imul(_, R) | 0,
                    t = t + Math.imul(v, I) | 0,
                    e = (e + Math.imul(v, N) | 0) + Math.imul(y, I) | 0,
                    W = W + Math.imul(y, N) | 0,
                    t = t + Math.imul(b, P) | 0,
                    e = (e + Math.imul(b, O) | 0) + Math.imul(g, P) | 0,
                    W = W + Math.imul(g, O) | 0,
                    t = t + Math.imul(p, x) | 0,
                    e = (e + Math.imul(p, T) | 0) + Math.imul(m, x) | 0,
                    W = W + Math.imul(m, T) | 0,
                    t = t + Math.imul(d, B) | 0,
                    e = (e + Math.imul(d, L) | 0) + Math.imul(h, B) | 0,
                    W = W + Math.imul(h, L) | 0,
                    t = t + Math.imul(c, D) | 0,
                    e = (e + Math.imul(c, q) | 0) + Math.imul(f, D) | 0,
                    W = W + Math.imul(f, q) | 0,
                    t = t + Math.imul(l, F) | 0,
                    e = (e + Math.imul(l, U) | 0) + Math.imul(u, F) | 0,
                    W = W + Math.imul(u, U) | 0,
                (G + (t = t + Math.imul(o, V) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, z) | 0) + Math.imul(s, V) | 0)) << 13) | 0);
            G = ((W + Math.imul(s, z) | 0) + (e >>> 13) | 0) + (tt >>> 26) | 0,
                tt &= 67108863,
                t = Math.imul(k, E),
                e = Math.imul(k, A) + Math.imul(i, E) | 0,
                W = Math.imul(i, A),
                t = t + Math.imul(M, C) | 0,
                e = (e + Math.imul(M, R) | 0) + Math.imul(S, C) | 0,
                W = W + Math.imul(S, R) | 0,
                t = t + Math.imul(w, I) | 0,
                e = (e + Math.imul(w, N) | 0) + Math.imul(_, I) | 0,
                W = W + Math.imul(_, N) | 0,
                t = t + Math.imul(v, P) | 0,
                e = (e + Math.imul(v, O) | 0) + Math.imul(y, P) | 0,
                W = W + Math.imul(y, O) | 0,
                t = t + Math.imul(b, x) | 0,
                e = (e + Math.imul(b, T) | 0) + Math.imul(g, x) | 0,
                W = W + Math.imul(g, T) | 0,
                t = t + Math.imul(p, B) | 0,
                e = (e + Math.imul(p, L) | 0) + Math.imul(m, B) | 0,
                W = W + Math.imul(m, L) | 0,
                t = t + Math.imul(d, D) | 0,
                e = (e + Math.imul(d, q) | 0) + Math.imul(h, D) | 0,
                W = W + Math.imul(h, q) | 0,
                t = t + Math.imul(c, F) | 0,
                e = (e + Math.imul(c, U) | 0) + Math.imul(f, F) | 0,
                W = W + Math.imul(f, U) | 0,
                t = t + Math.imul(l, V) | 0,
                e = (e + Math.imul(l, z) | 0) + Math.imul(u, V) | 0,
                W = W + Math.imul(u, z) | 0,
                E = (G + (t = t + Math.imul(o, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(o, r) | 0) + Math.imul(s, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(s, r) | 0) + (e >>> 13) | 0) + (E >>> 26) | 0,
                E &= 67108863,
                t = Math.imul(k, C),
                e = Math.imul(k, R) + Math.imul(i, C) | 0,
                W = Math.imul(i, R),
                t = t + Math.imul(M, I) | 0,
                e = (e + Math.imul(M, N) | 0) + Math.imul(S, I) | 0,
                W = W + Math.imul(S, N) | 0,
                t = t + Math.imul(w, P) | 0,
                e = (e + Math.imul(w, O) | 0) + Math.imul(_, P) | 0,
                W = W + Math.imul(_, O) | 0,
                t = t + Math.imul(v, x) | 0,
                e = (e + Math.imul(v, T) | 0) + Math.imul(y, x) | 0,
                W = W + Math.imul(y, T) | 0,
                t = t + Math.imul(b, B) | 0,
                e = (e + Math.imul(b, L) | 0) + Math.imul(g, B) | 0,
                W = W + Math.imul(g, L) | 0,
                t = t + Math.imul(p, D) | 0,
                e = (e + Math.imul(p, q) | 0) + Math.imul(m, D) | 0,
                W = W + Math.imul(m, q) | 0,
                t = t + Math.imul(d, F) | 0,
                e = (e + Math.imul(d, U) | 0) + Math.imul(h, F) | 0,
                W = W + Math.imul(h, U) | 0,
                t = t + Math.imul(c, V) | 0,
                e = (e + Math.imul(c, z) | 0) + Math.imul(f, V) | 0,
                W = W + Math.imul(f, z) | 0,
                A = (G + (t = t + Math.imul(l, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(l, r) | 0) + Math.imul(u, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(u, r) | 0) + (e >>> 13) | 0) + (A >>> 26) | 0,
                A &= 67108863,
                t = Math.imul(k, I),
                e = Math.imul(k, N) + Math.imul(i, I) | 0,
                W = Math.imul(i, N),
                t = t + Math.imul(M, P) | 0,
                e = (e + Math.imul(M, O) | 0) + Math.imul(S, P) | 0,
                W = W + Math.imul(S, O) | 0,
                t = t + Math.imul(w, x) | 0,
                e = (e + Math.imul(w, T) | 0) + Math.imul(_, x) | 0,
                W = W + Math.imul(_, T) | 0,
                t = t + Math.imul(v, B) | 0,
                e = (e + Math.imul(v, L) | 0) + Math.imul(y, B) | 0,
                W = W + Math.imul(y, L) | 0,
                t = t + Math.imul(b, D) | 0,
                e = (e + Math.imul(b, q) | 0) + Math.imul(g, D) | 0,
                W = W + Math.imul(g, q) | 0,
                t = t + Math.imul(p, F) | 0,
                e = (e + Math.imul(p, U) | 0) + Math.imul(m, F) | 0,
                W = W + Math.imul(m, U) | 0,
                t = t + Math.imul(d, V) | 0,
                e = (e + Math.imul(d, z) | 0) + Math.imul(h, V) | 0,
                W = W + Math.imul(h, z) | 0,
                o = (G + (t = t + Math.imul(c, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(c, r) | 0) + Math.imul(f, j) | 0)) << 13) | 0,
                G = ((W + Math.imul(f, r) | 0) + (e >>> 13) | 0) + (o >>> 26) | 0,
                o &= 67108863,
                t = Math.imul(k, P),
                e = Math.imul(k, O) + Math.imul(i, P) | 0,
                W = Math.imul(i, O),
                t = t + Math.imul(M, x) | 0,
                e = (e + Math.imul(M, T) | 0) + Math.imul(S, x) | 0,
                W = W + Math.imul(S, T) | 0,
                t = t + Math.imul(w, B) | 0,
                e = (e + Math.imul(w, L) | 0) + Math.imul(_, B) | 0,
                W = W + Math.imul(_, L) | 0,
                t = t + Math.imul(v, D) | 0,
                e = (e + Math.imul(v, q) | 0) + Math.imul(y, D) | 0,
                W = W + Math.imul(y, q) | 0,
                t = t + Math.imul(b, F) | 0,
                e = (e + Math.imul(b, U) | 0) + Math.imul(g, F) | 0,
                W = W + Math.imul(g, U) | 0,
                t = t + Math.imul(p, V) | 0,
                e = (e + Math.imul(p, z) | 0) + Math.imul(m, V) | 0,
                W = W + Math.imul(m, z) | 0,
            s = (G + (t = t + Math.imul(d, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(d, r) | 0) + Math.imul(h, j) | 0)) << 13) | 0,
            G = ((W + Math.imul(h, r) | 0) + (e >>> 13) | 0) + (s >>> 26) | 0,
            s &= 67108863,
            t = Math.imul(k, x),
            e = Math.imul(k, T) + Math.imul(i, x) | 0,
            W = Math.imul(i, T),
            t = t + Math.imul(M, B) | 0,
            e = (e + Math.imul(M, L) | 0) + Math.imul(S, B) | 0,
            W = W + Math.imul(S, L) | 0,
            t = t + Math.imul(w, D) | 0,
            e = (e + Math.imul(w, q) | 0) + Math.imul(_, D) | 0,
            W = W + Math.imul(_, q) | 0,
            t = t + Math.imul(v, F) | 0,
            e = (e + Math.imul(v, U) | 0) + Math.imul(y, F) | 0,
            W = W + Math.imul(y, U) | 0,
            t = t + Math.imul(b, V) | 0,
            e = (e + Math.imul(b, z) | 0) + Math.imul(g, V) | 0,
            W = W + Math.imul(g, z) | 0,
            C = (G + (t = t + Math.imul(p, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(p, r) | 0) + Math.imul(m, j) | 0)) << 13) | 0,
            G = ((W + Math.imul(m, r) | 0) + (e >>> 13) | 0) + (C >>> 26) | 0,
            C &= 67108863,
            t = Math.imul(k, B),
            e = Math.imul(k, L) + Math.imul(i, B) | 0,
            W = Math.imul(i, L),
            t = t + Math.imul(M, D) | 0,
            e = (e + Math.imul(M, q) | 0) + Math.imul(S, D) | 0,
            W = W + Math.imul(S, q) | 0,
            t = t + Math.imul(w, F) | 0,
            e = (e + Math.imul(w, U) | 0) + Math.imul(_, F) | 0,
            W = W + Math.imul(_, U) | 0,
            t = t + Math.imul(v, V) | 0,
            e = (e + Math.imul(v, z) | 0) + Math.imul(y, V) | 0,
            W = W + Math.imul(y, z) | 0,
            R = (G + (t = t + Math.imul(b, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(b, r) | 0) + Math.imul(g, j) | 0)) << 13) | 0,
            G = ((W + Math.imul(g, r) | 0) + (e >>> 13) | 0) + (R >>> 26) | 0,
            R &= 67108863,
            t = Math.imul(k, D),
            e = Math.imul(k, q) + Math.imul(i, D) | 0,
            W = Math.imul(i, q),
            t = t + Math.imul(M, F) | 0,
            e = (e + Math.imul(M, U) | 0) + Math.imul(S, F) | 0,
            W = W + Math.imul(S, U) | 0,
            t = t + Math.imul(w, V) | 0,
            e = (e + Math.imul(w, z) | 0) + Math.imul(_, V) | 0,
            W = W + Math.imul(_, z) | 0,
            l = (G + (t = t + Math.imul(v, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(v, r) | 0) + Math.imul(y, j) | 0)) << 13) | 0,
            G = ((W + Math.imul(y, r) | 0) + (e >>> 13) | 0) + (l >>> 26) | 0,
            l &= 67108863,
            t = Math.imul(k, F),
            e = Math.imul(k, U) + Math.imul(i, F) | 0,
            W = Math.imul(i, U),
            t = t + Math.imul(M, V) | 0,
            e = (e + Math.imul(M, z) | 0) + Math.imul(S, V) | 0,
            W = W + Math.imul(S, z) | 0,
            u = (G + (t = t + Math.imul(w, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(w, r) | 0) + Math.imul(_, j) | 0)) << 13) | 0,
            G = ((W + Math.imul(_, r) | 0) + (e >>> 13) | 0) + (u >>> 26) | 0,
            u &= 67108863,
            t = Math.imul(k, V),
            e = Math.imul(k, z) + Math.imul(i, V) | 0,
            W = Math.imul(i, z),
            I = (G + (t = t + Math.imul(M, j) | 0) | 0) + ((8191 & (e = (e + Math.imul(M, r) | 0) + Math.imul(S, j) | 0)) << 13) | 0,
            G = ((W + Math.imul(S, r) | 0) + (e >>> 13) | 0) + (I >>> 26) | 0,
            I &= 67108863,
            N = (G + (t = Math.imul(k, j)) | 0) + ((8191 & (e = Math.imul(k, r) + Math.imul(i, j) | 0)) << 13) | 0;
            return G = (Math.imul(i, r) + (e >>> 13) | 0) + (N >>> 26) | 0,
                N &= 67108863,
                a[0] = Y,
                a[1] = H,
                a[2] = K,
                a[3] = Z,
                a[4] = Q,
                a[5] = J,
                a[6] = X,
                a[7] = $,
                a[8] = tt,
                a[9] = E,
                a[10] = A,
                a[11] = o,
                a[12] = s,
                a[13] = C,
                a[14] = R,
                a[15] = l,
                a[16] = u,
                a[17] = I,
                a[18] = N,
            0 != G && (a[19] = G,
                n.length++),
                n
        };

        function b(t, e, n) {
            n.negative = e.negative ^ t.negative,
                n.length = t.length + e.length;
            for (var i = 0, r = 0, a = 0; a < n.length - 1; a++) {
                for (var o = r, s = (r = 0,
                67108863 & i), l = Math.min(a, e.length - 1), u = Math.max(0, a - t.length + 1); u <= l; u++) {
                    var c, f = (0 | t.words[a - u]) * (0 | e.words[u]);
                    s = 67108863 & (c = (67108863 & f) + s | 0);
                    r += (o = (o = o + (f / 67108864 | 0) | 0) + (c >>> 26) | 0) >>> 26,
                        o &= 67108863
                }
                n.words[a] = s,
                    i = o,
                    o = r
            }
            return 0 !== i ? n.words[a] = i : n.length--,
                n._strip()
        }

        function g(t, e, n) {
            return b(t, e, n)
        }

        Math.imul || (m = p),
            a.prototype.mulTo = function (t, e) {
                var n = this.length + t.length;
                return (10 === this.length && 10 === t.length ? m : n < 63 ? p : n < 1024 ? b : g)(this, t, e)
            }
            ,
            a.prototype.mul = function (t) {
                var e = new a(null);
                return e.words = new Array(this.length + t.length),
                    this.mulTo(t, e)
            }
            ,
            a.prototype.mulf = function (t) {
                var e = new a(null);
                return e.words = new Array(this.length + t.length),
                    g(this, t, e)
            }
            ,
            a.prototype.imul = function (t) {
                return this.clone().mulTo(t, this)
            }
            ,
            a.prototype.imuln = function (t) {
                var e = t < 0;
                i("number" == typeof (t = e ? -t : t)),
                    i(t < 67108864);
                for (var n = 0, r = 0; r < this.length; r++) {
                    var a = (0 | this.words[r]) * t
                        , o = (67108863 & a) + (67108863 & n);
                    n = (n >>= 26) + (a / 67108864 | 0) + (o >>> 26);
                    this.words[r] = 67108863 & o
                }
                return 0 !== n && (this.words[r] = n,
                    this.length++),
                    e ? this.ineg() : this
            }
            ,
            a.prototype.muln = function (t) {
                return this.clone().imuln(t)
            }
            ,
            a.prototype.sqr = function () {
                return this.mul(this)
            }
            ,
            a.prototype.isqr = function () {
                return this.imul(this.clone())
            }
            ,
            a.prototype.pow = function (t) {
                var e = function (t) {
                    for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++)
                        e[n] = t.words[n / 26 | 0] >>> n % 26 & 1;
                    return e
                }(t);
                if (0 === e.length)
                    return new a(1);
                for (var n = this, i = 0; i < e.length && 0 === e[i]; i++,
                    n = n.sqr())
                    ;
                if (++i < e.length)
                    for (var r = n.sqr(); i < e.length; i++,
                        r = r.sqr())
                        0 !== e[i] && (n = n.mul(r));
                return n
            }
            ,
            a.prototype.iushln = function (t) {
                i("number" == typeof t && 0 <= t);
                var e = t % 26
                    , n = (t - e) / 26
                    , r = 67108863 >>> 26 - e << 26 - e;
                if (0 != e) {
                    for (var a = 0, o = 0; o < this.length; o++) {
                        var s = this.words[o] & r
                            , l = (0 | this.words[o]) - s << e;
                        this.words[o] = l | a,
                            a = s >>> 26 - e
                    }
                    a && (this.words[o] = a,
                        this.length++)
                }
                if (0 != n) {
                    for (o = this.length - 1; 0 <= o; o--)
                        this.words[o + n] = this.words[o];
                    for (o = 0; o < n; o++)
                        this.words[o] = 0;
                    this.length += n
                }
                return this._strip()
            }
            ,
            a.prototype.ishln = function (t) {
                return i(0 === this.negative),
                    this.iushln(t)
            }
            ,
            a.prototype.iushrn = function (t, e, n) {
                i("number" == typeof t && 0 <= t),
                    r = e ? (e - e % 26) / 26 : 0;
                var r, a = t % 26, o = Math.min((t - a) / 26, this.length),
                    s = 67108863 ^ 67108863 >>> a << a, l = n;
                if (r -= o,
                    r = Math.max(0, r),
                    l) {
                    for (var u = 0; u < o; u++)
                        l.words[u] = this.words[u];
                    l.length = o
                }
                if (0 !== o)
                    if (this.length > o)
                        for (this.length -= o,
                                 u = 0; u < this.length; u++)
                            this.words[u] = this.words[u + o];
                    else
                        this.words[0] = 0,
                            this.length = 1;
                var c = 0;
                for (u = this.length - 1; 0 <= u && (0 !== c || r <= u); u--) {
                    var f = 0 | this.words[u];
                    this.words[u] = c << 26 - a | f >>> a,
                        c = f & s
                }
                return l && 0 !== c && (l.words[l.length++] = c),
                0 === this.length && (this.words[0] = 0,
                    this.length = 1),
                    this._strip()
            }
            ,
            a.prototype.ishrn = function (t, e, n) {
                return i(0 === this.negative),
                    this.iushrn(t, e, n)
            }
            ,
            a.prototype.shln = function (t) {
                return this.clone().ishln(t)
            }
            ,
            a.prototype.ushln = function (t) {
                return this.clone().iushln(t)
            }
            ,
            a.prototype.shrn = function (t) {
                return this.clone().ishrn(t)
            }
            ,
            a.prototype.ushrn = function (t) {
                return this.clone().iushrn(t)
            }
            ,
            a.prototype.testn = function (t) {
                i("number" == typeof t && 0 <= t);
                var e = t % 26;
                t = (t - e) / 26;
                return !(this.length <= t || !(this.words[t] & 1 << e))
            }
            ,
            a.prototype.imaskn = function (t) {
                i("number" == typeof t && 0 <= t);
                var e = t % 26;
                t = (t - e) / 26;
                return i(0 === this.negative, "imaskn works only with positive numbers"),
                    this.length <= t ? this : (0 != e && t++,
                        this.length = Math.min(t, this.length),
                    0 != e && (this.words[this.length - 1] &= 67108863 ^ 67108863 >>> e << e),
                        this._strip())
            }
            ,
            a.prototype.maskn = function (t) {
                return this.clone().imaskn(t)
            }
            ,
            a.prototype.iaddn = function (t) {
                return i("number" == typeof t),
                    i(t < 67108864),
                    t < 0 ? this.isubn(-t) : 0 !== this.negative ? (1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]),
                        this.negative = 0) : (this.negative = 0,
                        this.isubn(t),
                        this.negative = 1),
                        this) : this._iaddn(t)
            }
            ,
            a.prototype._iaddn = function (t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && 67108864 <= this.words[e]; e++)
                    this.words[e] -= 67108864,
                        e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1),
                    this
            }
            ,
            a.prototype.isubn = function (t) {
                if (i("number" == typeof t),
                    i(t < 67108864),
                t < 0)
                    return this.iaddn(-t);
                if (0 !== this.negative)
                    return this.negative = 0,
                        this.iaddn(t),
                        this.negative = 1,
                        this;
                if (this.words[0] -= t,
                1 === this.length && this.words[0] < 0)
                    this.words[0] = -this.words[0],
                        this.negative = 1;
                else
                    for (var e = 0; e < this.length && this.words[e] < 0; e++)
                        this.words[e] += 67108864,
                            --this.words[e + 1];
                return this._strip()
            }
            ,
            a.prototype.addn = function (t) {
                return this.clone().iaddn(t)
            }
            ,
            a.prototype.subn = function (t) {
                return this.clone().isubn(t)
            }
            ,
            a.prototype.iabs = function () {
                return this.negative = 0,
                    this
            }
            ,
            a.prototype.abs = function () {
                return this.clone().iabs()
            }
            ,
            a.prototype._ishlnsubmul = function (t, e, n) {
                for (var r = t.length + n, a = (this._expand(r),
                    0), o = 0; o < t.length; o++) {
                    var s = (0 | this.words[o + n]) + a
                        , l = (0 | t.words[o]) * e;
                    a = ((s -= 67108863 & l) >> 26) - (l / 67108864 | 0);
                    this.words[o + n] = 67108863 & s
                }
                for (; o < this.length - n; o++)
                    a = (s = (0 | this.words[o + n]) + a) >> 26,
                        this.words[o + n] = 67108863 & s;
                if (0 === a)
                    return this._strip();
                for (i(-1 === a),
                         o = a = 0; o < this.length; o++)
                    a = (s = -(0 | this.words[o]) + a) >> 26,
                        this.words[o] = 67108863 & s;
                return this.negative = 1,
                    this._strip()
            }
            ,
            a.prototype._wordDiv = function (t, e) {
                this.length,
                    t.length;
                var n = this.clone()
                    , i = t
                    , r = 0 | i.words[i.length - 1];
                0 != (t = 26 - this._countBits(r)) && (i = i.ushln(t),
                    n.iushln(t),
                    r = 0 | i.words[i.length - 1]);
                var o, s = n.length - i.length;
                if ("mod" !== e) {
                    (o = new a(null)).length = 1 + s,
                        o.words = new Array(o.length);
                    for (var l = 0; l < o.length; l++)
                        o.words[l] = 0
                }
                var u = n.clone()._ishlnsubmul(i, 1, s);
                0 === u.negative && (n = u,
                o && (o.words[s] = 1));
                for (var c = s - 1; 0 <= c; c--) {
                    var f = 67108864 * (0 | n.words[i.length + c]) + (0 | n.words[i.length + c - 1]);
                    f = Math.min(f / r | 0, 67108863);
                    for (n._ishlnsubmul(i, f, c); 0 !== n.negative;)
                        f--,
                            n.negative = 0,
                            n._ishlnsubmul(i, 1, c),
                        n.isZero() || (n.negative ^= 1);
                    o && (o.words[c] = f)
                }
                return o && o._strip(),
                    n._strip(),
                "div" !== e && 0 != t && n.iushrn(t),
                    {
                        div: o || null,
                        mod: n
                    }
            }
            ,
            a.prototype.divmod = function (t, e, n) {
                return i(!t.isZero()),
                    this.isZero() ? {
                        div: new a(0),
                        mod: new a(0)
                    } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e),
                    "mod" !== e && (r = s.div.neg()),
                    "div" !== e && (o = s.mod.neg(),
                    n && 0 !== o.negative && o.iadd(t)),
                        {
                            div: r,
                            mod: o
                        }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e),
                        {
                            div: r = "mod" !== e ? s.div.neg() : r,
                            mod: s.mod
                        }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e),
                    "div" !== e && (o = s.mod.neg(),
                    n && 0 !== o.negative && o.isub(t)),
                        {
                            div: s.div,
                            mod: o
                        }) : t.length > this.length || this.cmp(t) < 0 ? {
                        div: new a(0),
                        mod: this
                    } : 1 === t.length ? "div" === e ? {
                        div: this.divn(t.words[0]),
                        mod: null
                    } : "mod" === e ? {
                        div: null,
                        mod: new a(this.modrn(t.words[0]))
                    } : {
                        div: this.divn(t.words[0]),
                        mod: new a(this.modrn(t.words[0]))
                    } : this._wordDiv(t, e);
                var r, o, s
            }
            ,
            a.prototype.div = function (t) {
                return this.divmod(t, "div", !1).div
            }
            ,
            a.prototype.mod = function (t) {
                return this.divmod(t, "mod", !1).mod
            }
            ,
            a.prototype.umod = function (t) {
                return this.divmod(t, "mod", !0).mod
            }
            ,
            a.prototype.divRound = function (t) {
                var e = this.divmod(t);
                if (e.mod.isZero())
                    return e.div;
                var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod
                    , i = t.ushrn(1);
                t = t.andln(1);
                return (n = n.cmp(i)) < 0 || 1 === t && 0 === n ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }
            ,
            a.prototype.modrn = function (t) {
                var e = t < 0;
                i((t = e ? -t : t) <= 67108863);
                for (var n = (1 << 26) % t, r = 0, a = this.length - 1; 0 <= a; a--)
                    r = (n * r + (0 | this.words[a])) % t;
                return e ? -r : r
            }
            ,
            a.prototype.modn = function (t) {
                return this.modrn(t)
            }
            ,
            a.prototype.idivn = function (t) {
                var e = t < 0;
                i((t = e ? -t : t) <= 67108863);
                for (var n = 0, r = this.length - 1; 0 <= r; r--) {
                    var a = (0 | this.words[r]) + 67108864 * n;
                    this.words[r] = a / t | 0,
                        n = a % t
                }
                return this._strip(),
                    e ? this.ineg() : this
            }
            ,
            a.prototype.divn = function (t) {
                return this.clone().idivn(t)
            }
            ,
            a.prototype.egcd = function (t) {
                i(0 === t.negative),
                    i(!t.isZero());
                for (var e = this, n = t.clone(), r = (e = 0 !== e.negative ? e.umod(t) : e.clone(),
                    new a(1)), o = new a(0), s = new a(0), l = new a(1), u = 0; e.isEven() && n.isEven();)
                    e.iushrn(1),
                        n.iushrn(1),
                        ++u;
                for (var c = n.clone(), f = e.clone(); !e.isZero();) {
                    for (var d = 0, h = 1; 0 == (e.words[0] & h) && d < 26; ++d,
                        h <<= 1)
                        ;
                    if (0 < d)
                        for (e.iushrn(d); 0 < d--;)
                            (r.isOdd() || o.isOdd()) && (r.iadd(c),
                                o.isub(f)),
                                r.iushrn(1),
                                o.iushrn(1);
                    for (var p = 0, m = 1; 0 == (n.words[0] & m) && p < 26; ++p,
                        m <<= 1)
                        ;
                    if (0 < p)
                        for (n.iushrn(p); 0 < p--;)
                            (s.isOdd() || l.isOdd()) && (s.iadd(c),
                                l.isub(f)),
                                s.iushrn(1),
                                l.iushrn(1);
                    0 <= e.cmp(n) ? (e.isub(n),
                        r.isub(s),
                        o.isub(l)) : (n.isub(e),
                        s.isub(r),
                        l.isub(o))
                }
                return {
                    a: s,
                    b: l,
                    gcd: n.iushln(u)
                }
            }
            ,
            a.prototype._invmp = function (t) {
                i(0 === t.negative),
                    i(!t.isZero());
                for (var e, n = this, r = t.clone(), o = (n = 0 !== n.negative ? n.umod(t) : n.clone(),
                    new a(1)), s = new a(0), l = r.clone(); 0 < n.cmpn(1) && 0 < r.cmpn(1);) {
                    for (var u = 0, c = 1; 0 == (n.words[0] & c) && u < 26; ++u,
                        c <<= 1)
                        ;
                    if (0 < u)
                        for (n.iushrn(u); 0 < u--;)
                            o.isOdd() && o.iadd(l),
                                o.iushrn(1);
                    for (var f = 0, d = 1; 0 == (r.words[0] & d) && f < 26; ++f,
                        d <<= 1)
                        ;
                    if (0 < f)
                        for (r.iushrn(f); 0 < f--;)
                            s.isOdd() && s.iadd(l),
                                s.iushrn(1);
                    0 <= n.cmp(r) ? (n.isub(r),
                        o.isub(s)) : (r.isub(n),
                        s.isub(o))
                }
                return (e = 0 === n.cmpn(1) ? o : s).cmpn(0) < 0 && e.iadd(t),
                    e
            }
            ,
            a.prototype.gcd = function (t) {
                if (this.isZero())
                    return t.abs();
                if (t.isZero())
                    return this.abs();
                var e = this.clone()
                    , n = t.clone();
                e.negative = 0;
                for (var i = n.negative = 0; e.isEven() && n.isEven(); i++)
                    e.iushrn(1),
                        n.iushrn(1);
                for (; ;) {
                    for (; e.isEven();)
                        e.iushrn(1);
                    for (; n.isEven();)
                        n.iushrn(1);
                    var r = e.cmp(n);
                    if (r < 0) {
                        var a = e;
                        e = n,
                            n = a
                    } else if (0 === r || 0 === n.cmpn(1))
                        break;
                    e.isub(n)
                }
                return n.iushln(i)
            }
            ,
            a.prototype.invm = function (t) {
                return this.egcd(t).a.umod(t)
            }
            ,
            a.prototype.isEven = function () {
                return 0 == (1 & this.words[0])
            }
            ,
            a.prototype.isOdd = function () {
                return 1 == (1 & this.words[0])
            }
            ,
            a.prototype.andln = function (t) {
                return this.words[0] & t
            }
            ,
            a.prototype.bincn = function (t) {
                i("number" == typeof t);
                t = (t - (e = t % 26)) / 26;
                var e = 1 << e;
                if (this.length <= t)
                    return this._expand(1 + t),
                        this.words[t] |= e,
                        this;
                for (var n = e, r = t; 0 !== n && r < this.length; r++) {
                    var a = 0 | this.words[r];
                    n = (a += n) >>> 26;
                    a &= 67108863,
                        this.words[r] = a
                }
                return 0 !== n && (this.words[r] = n,
                    this.length++),
                    this
            }
            ,
            a.prototype.isZero = function () {
                return 1 === this.length && 0 === this.words[0]
            }
            ,
            a.prototype.cmpn = function (t) {
                var e = t < 0;
                return 0 === this.negative || e ? 0 === this.negative && e ? 1 : (this._strip(),
                    e = 1 < this.length ? 1 : (i((t = e ? -t : t) <= 67108863, "Number is too big"),
                        (e = 0 | this.words[0]) === t ? 0 : e < t ? -1 : 1),
                    0 !== this.negative ? 0 | -e : e) : -1
            }
            ,
            a.prototype.cmp = function (t) {
                return 0 !== this.negative && 0 === t.negative ? -1 : 0 === this.negative && 0 !== t.negative ? 1 : (t = this.ucmp(t),
                    0 !== this.negative ? 0 | -t : t)
            }
            ,
            a.prototype.ucmp = function (t) {
                if (this.length > t.length)
                    return 1;
                if (this.length < t.length)
                    return -1;
                for (var e = 0, n = this.length - 1; 0 <= n; n--) {
                    var i = 0 | this.words[n]
                        , r = 0 | t.words[n];
                    if (i != r) {
                        i < r ? e = -1 : r < i && (e = 1);
                        break
                    }
                }
                return e
            }
            ,
            a.prototype.gtn = function (t) {
                return 1 === this.cmpn(t)
            }
            ,
            a.prototype.gt = function (t) {
                return 1 === this.cmp(t)
            }
            ,
            a.prototype.gten = function (t) {
                return 0 <= this.cmpn(t)
            }
            ,
            a.prototype.gte = function (t) {
                return 0 <= this.cmp(t)
            }
            ,
            a.prototype.ltn = function (t) {
                return -1 === this.cmpn(t)
            }
            ,
            a.prototype.lt = function (t) {
                return -1 === this.cmp(t)
            }
            ,
            a.prototype.lten = function (t) {
                return this.cmpn(t) <= 0
            }
            ,
            a.prototype.lte = function (t) {
                return this.cmp(t) <= 0
            }
            ,
            a.prototype.eqn = function (t) {
                return 0 === this.cmpn(t)
            }
            ,
            a.prototype.eq = function (t) {
                return 0 === this.cmp(t)
            }
            ,
            a.red = function (t) {
                return new k(t)
            }
            ,
            a.prototype.toRed = function (t) {
                return i(!this.red, "Already a number in reduction context"),
                    i(0 === this.negative, "red works only with positives"),
                    t.convertTo(this)._forceRed(t)
            }
            ,
            a.prototype.fromRed = function () {
                return i(this.red, "fromRed works only with numbers in reduction context"),
                    this.red.convertFrom(this)
            }
            ,
            a.prototype._forceRed = function (t) {
                return this.red = t,
                    this
            }
            ,
            a.prototype.forceRed = function (t) {
                return i(!this.red, "Already a number in reduction context"),
                    this._forceRed(t)
            }
            ,
            a.prototype.redAdd = function (t) {
                return i(this.red, "redAdd works only with red numbers"),
                    this.red.add(this, t)
            }
            ,
            a.prototype.redIAdd = function (t) {
                return i(this.red, "redIAdd works only with red numbers"),
                    this.red.iadd(this, t)
            }
            ,
            a.prototype.redSub = function (t) {
                return i(this.red, "redSub works only with red numbers"),
                    this.red.sub(this, t)
            }
            ,
            a.prototype.redISub = function (t) {
                return i(this.red, "redISub works only with red numbers"),
                    this.red.isub(this, t)
            }
            ,
            a.prototype.redShl = function (t) {
                return i(this.red, "redShl works only with red numbers"),
                    this.red.shl(this, t)
            }
            ,
            a.prototype.redMul = function (t) {
                return i(this.red, "redMul works only with red numbers"),
                    this.red._verify2(this, t),
                    this.red.mul(this, t)
            }
            ,
            a.prototype.redIMul = function (t) {
                return i(this.red, "redMul works only with red numbers"),
                    this.red._verify2(this, t),
                    this.red.imul(this, t)
            }
            ,
            a.prototype.redSqr = function () {
                return i(this.red, "redSqr works only with red numbers"),
                    this.red._verify1(this),
                    this.red.sqr(this)
            }
            ,
            a.prototype.redISqr = function () {
                return i(this.red, "redISqr works only with red numbers"),
                    this.red._verify1(this),
                    this.red.isqr(this)
            }
            ,
            a.prototype.redSqrt = function () {
                return i(this.red, "redSqrt works only with red numbers"),
                    this.red._verify1(this),
                    this.red.sqrt(this)
            }
            ,
            a.prototype.redInvm = function () {
                return i(this.red, "redInvm works only with red numbers"),
                    this.red._verify1(this),
                    this.red.invm(this)
            }
            ,
            a.prototype.redNeg = function () {
                return i(this.red, "redNeg works only with red numbers"),
                    this.red._verify1(this),
                    this.red.neg(this)
            }
            ,
            a.prototype.redPow = function (t) {
                return i(this.red && !t.red, "redPow(normalNum)"),
                    this.red._verify1(this),
                    this.red.pow(this, t)
            }
        ;
        var v = {
            k256: null,
            p224: null,
            p192: null,
            p25519: null
        };

        function y(t, e) {
            this.name = t,
                this.p = new a(e, 16),
                this.n = this.p.bitLength(),
                this.k = new a(1).iushln(this.n).isub(this.p),
                this.tmp = this._tmp()
        }

        function w() {
            y.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
        }

        function _() {
            y.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
        }

        function M() {
            y.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
        }

        function S() {
            y.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
        }

        function k(t) {
            var e;
            "string" == typeof t ? (e = a._prime(t),
                this.m = e.p,
                this.prime = e) : (i(t.gtn(1), "modulus must be greater than 1"),
                this.m = t,
                this.prime = null)
        }

        function E(t) {
            k.call(this, t),
                this.shift = this.m.bitLength(),
            this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26),
                this.r = new a(1).iushln(this.shift),
                this.r2 = this.imod(this.r.sqr()),
                this.rinv = this.r._invmp(this.m),
                this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
                this.minv = this.minv.umod(this.r),
                this.minv = this.r.sub(this.minv)
        }

        y.prototype._tmp = function () {
            var t = new a(null);
            return t.words = new Array(Math.ceil(this.n / 13)),
                t
        }
            ,
            y.prototype.ireduce = function (t) {
                for (var e, n = t; this.split(n, this.tmp),
                (e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength()) > this.n;)
                    ;
                return 0 === (t = e < this.n ? -1 : n.ucmp(this.p)) ? (n.words[0] = 0,
                    n.length = 1) : 0 < t ? n.isub(this.p) : void 0 !== n.strip ? n.strip() : n._strip(),
                    n
            }
            ,
            y.prototype.split = function (t, e) {
                t.iushrn(this.n, 0, e)
            }
            ,
            y.prototype.imulK = function (t) {
                return t.imul(this.k)
            }
            ,
            r(w, y),
            w.prototype.split = function (t, e) {
                for (var n = Math.min(t.length, 9), i = 0; i < n; i++)
                    e.words[i] = t.words[i];
                if (e.length = n,
                t.length <= 9)
                    return t.words[0] = 0,
                        void (t.length = 1);
                var r = t.words[9];
                for (e.words[e.length++] = 4194303 & r,
                         i = 10; i < t.length; i++) {
                    var a = 0 | t.words[i];
                    t.words[i - 10] = (4194303 & a) << 4 | r >>> 22,
                        r = a
                }
                0 == (t.words[i - 10] = r >>>= 22) && 10 < t.length ? t.length -= 10 : t.length -= 9
            }
            ,
            w.prototype.imulK = function (t) {
                t.words[t.length] = 0,
                    t.words[t.length + 1] = 0,
                    t.length += 2;
                for (var e = 0, n = 0; n < t.length; n++) {
                    var i = 0 | t.words[n];
                    e += 977 * i,
                        t.words[n] = 67108863 & e,
                        e = 64 * i + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--,
                0 === t.words[t.length - 1] && t.length--),
                    t
            }
            ,
            r(_, y),
            r(M, y),
            r(S, y),
            S.prototype.imulK = function (t) {
                for (var e = 0, n = 0; n < t.length; n++) {
                    var i = 19 * (0 | t.words[n]) + e
                        , r = 67108863 & i;
                    i >>>= 26,
                        t.words[n] = r,
                        e = i
                }
                return 0 !== e && (t.words[t.length++] = e),
                    t
            }
            ,
            a._prime = function (t) {
                if (v[t])
                    return v[t];
                var e;
                if ("k256" === t)
                    e = new w;
                else if ("p224" === t)
                    e = new _;
                else if ("p192" === t)
                    e = new M;
                else {
                    if ("p25519" !== t)
                        throw new Error("Unknown prime " + t);
                    e = new S
                }
                return v[t] = e
            }
            ,
            k.prototype._verify1 = function (t) {
                i(0 === t.negative, "red works only with positives"),
                    i(t.red, "red works only with red numbers")
            }
            ,
            k.prototype._verify2 = function (t, e) {
                i(0 == (t.negative | e.negative), "red works only with positives"),
                    i(t.red && t.red === e.red, "red works only with red numbers")
            }
            ,
            k.prototype.imod = function (t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : (u(t, t.umod(this.m)._forceRed(this)),
                    t)
            }
            ,
            k.prototype.neg = function (t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }
            ,
            k.prototype.add = function (t, e) {
                return this._verify2(t, e),
                0 <= (t = t.add(e)).cmp(this.m) && t.isub(this.m),
                    t._forceRed(this)
            }
            ,
            k.prototype.iadd = function (t, e) {
                return this._verify2(t, e),
                0 <= (t = t.iadd(e)).cmp(this.m) && t.isub(this.m),
                    t
            }
            ,
            k.prototype.sub = function (t, e) {
                return this._verify2(t, e),
                (t = t.sub(e)).cmpn(0) < 0 && t.iadd(this.m),
                    t._forceRed(this)
            }
            ,
            k.prototype.isub = function (t, e) {
                return this._verify2(t, e),
                (t = t.isub(e)).cmpn(0) < 0 && t.iadd(this.m),
                    t
            }
            ,
            k.prototype.shl = function (t, e) {
                return this._verify1(t),
                    this.imod(t.ushln(e))
            }
            ,
            k.prototype.imul = function (t, e) {
                return this._verify2(t, e),
                    this.imod(t.imul(e))
            }
            ,
            k.prototype.mul = function (t, e) {
                return this._verify2(t, e),
                    this.imod(t.mul(e))
            }
            ,
            k.prototype.isqr = function (t) {
                return this.imul(t, t.clone())
            }
            ,
            k.prototype.sqr = function (t) {
                return this.mul(t, t)
            }
            ,
            k.prototype.sqrt = function (t) {
                if (t.isZero())
                    return t.clone();
                var e = this.m.andln(3);
                if (i(e % 2 == 1),
                3 === e)
                    return e = this.m.add(new a(1)).iushrn(2),
                        this.pow(t, e);
                for (var n = this.m.subn(1), r = 0; !n.isZero() && 0 === n.andln(1);)
                    r++,
                        n.iushrn(1);
                i(!n.isZero());
                for (var o = new a(1).toRed(this), s = o.redNeg(), l = this.m.subn(1).iushrn(1), u = new a(2 * (u = this.m.bitLength()) * u).toRed(this); 0 !== this.pow(u, l).cmp(s);)
                    u.redIAdd(s);
                for (var c = this.pow(u, n), f = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), h = r; 0 !== d.cmp(o);) {
                    for (var p = d, m = 0; 0 !== p.cmp(o); m++)
                        p = p.redSqr();
                    i(m < h);
                    var b = this.pow(c, new a(1).iushln(h - m - 1));
                    f = f.redMul(b),
                        c = b.redSqr(),
                        d = d.redMul(c),
                        h = m
                }
                return f
            }
            ,
            k.prototype.invm = function (t) {
                return 0 !== (t = t._invmp(this.m)).negative ? (t.negative = 0,
                    this.imod(t).redNeg()) : this.imod(t)
            }
            ,
            k.prototype.pow = function (t, e) {
                if (e.isZero())
                    return new a(1).toRed(this);
                if (0 === e.cmpn(1))
                    return t.clone();
                var n = new Array(16);
                n[0] = new a(1).toRed(this),
                    n[1] = t;
                for (var i = 2; i < n.length; i++)
                    n[i] = this.mul(n[i - 1], t);
                var r = n[0]
                    , o = 0
                    , s = 0
                    , l = e.bitLength() % 26;
                for (0 === l && (l = 26),
                         i = e.length - 1; 0 <= i; i--) {
                    for (var u = e.words[i], c = l - 1; 0 <= c; c--) {
                        var f = u >> c & 1;
                        r !== n[0] && (r = this.sqr(r)),
                            0 != f || 0 !== o ? (o = o << 1 | f,
                            (4 == ++s || 0 === i && 0 === c) && (r = this.mul(r, n[o]),
                                o = s = 0)) : s = 0
                    }
                    l = 26
                }
                return r
            }
            ,
            k.prototype.convertTo = function (t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }
            ,
            k.prototype.convertFrom = function (t) {
                return (t = t.clone()).red = null,
                    t
            }
            ,
            a.mont = function (t) {
                return new E(t)
            }
            ,
            r(E, k),
            E.prototype.convertTo = function (t) {
                return this.imod(t.ushln(this.shift))
            }
            ,
            E.prototype.convertFrom = function (t) {
                return (t = this.imod(t.mul(this.rinv))).red = null,
                    t
            }
            ,
            E.prototype.imul = function (t, e) {
                return t.isZero() || e.isZero() ? (t.words[0] = 0,
                    t.length = 1,
                    t) : (e = (t = t.imul(e)).maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    e = t = t.isub(e).iushrn(this.shift),
                    0 <= t.cmp(this.m) ? e = t.isub(this.m) : t.cmpn(0) < 0 && (e = t.iadd(this.m)),
                    e._forceRed(this))
            }
            ,
            E.prototype.mul = function (t, e) {
                return t.isZero() || e.isZero() ? new a(0)._forceRed(this) : (e = (t = t.mul(e)).maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    e = t = t.isub(e).iushrn(this.shift),
                    0 <= t.cmp(this.m) ? e = t.isub(this.m) : t.cmpn(0) < 0 && (e = t.iadd(this.m)),
                    e._forceRed(this))
            }
            ,
            E.prototype.invm = function (t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
    })
        , wi = new Wn({
        hash: zn.sha256,
        entropy: "UQi4W3Y2bJfzleYy+oEZ2kA9A+9jrmwewST9vmBZNgMmFyzzH0S9Vol/UK",
        nonce: "0123456789avcdef",
        pers: "0123456789abcdef"
    });

    function _i(t) {
        for (var e, n, i = [], r = 0; r < t.length; r++) {
            for (e = t.charCodeAt(r),
                     n = []; n.push(255 & e),
                     e >>= 8;)
                ;
            i = i.concat(n.reverse())
        }
        return i
    }

    function Mi(t) {
        if ("string" == typeof t)
            return new yi(t, 16);
        for (var e = "", n = 0; n < t.length; n++) {
            var i = t[n].toString(16);
            1 == i.length && (e += "0"),
                e += i
        }
        return new yi(e, 16)
    }

    function Si(t, e, n) {
        return t.length >= e ? t : n.repeat(e - t.length) + t
    }

    function ki(t) {
        try {
            return crypto.randomBytes(t).toString("hex")
        } catch (mt) {
            for (var e = new Array(t), n = 0; n < t; n++)
                e[n] = Math.floor(256 * Math.random());
            return e
        }
    }

    function Ei(t) {
        t.length % 2 == 1 && (t = "0" + t);
        for (var e = new Array(t.length / 2), n = 0; n < t.length && -1 !== "0123456789ABCDEFabcdef".indexOf(t.substring(n, n + 1)); n += 2)
            e[n / 2] = parseInt(t.substring(n, n + 2), 16);
        return e
    }

    function Ai(t) {
        for (var e = "0123456789abcdef", n = new Array(2 * t.length), i = 0; i < t.length; i++)
            n[2 * i] = e.charAt(t[i] >> 4 & 15),
                n[2 * i + 1] = e.charAt(15 & t[i]);
        return n.join("")
    }

    function Ci(t) {
        if (!(this instanceof Ci))
            return new Ci(t);
        vi.curve.short.call(this, t)
    }

    mt(Ci, vi.curve.short);
    var Ri = Ci({
        type: "SM2",
        prime: null,
        p: "FFFFFFFE FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF 00000000 FFFFFFFF FFFFFFFF",
        a: "FFFFFFFE FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF 00000000 FFFFFFFF FFFFFFFC",
        b: "28E9FA9E 9D9F5E34 4D5A9E4B CF6509A7 F39789F5 15AB8F92 DDBCBD41 4D940E93",
        n: "FFFFFFFE FFFFFFFF FFFFFFFF FFFFFFFF 7203DF6B 21C6052B 53BBF409 39D54123",
        hash: ut,
        gRed: !1,
        g: ["32C4AE2C 1F198119 5F990446 6A39C994 8FE30BBF F2660BE1 715A4589 334C74C7", "BC3736A2 F4F6779C 59BDCEE3 6B692153 D0A9877C C62A4740 02DF32E5 2139F0A0"]
    });

    function Ii(t, e, n) {
        if (null == t)
            return Ri.point();
        var i;
        if (null != e) {
            if (i = Ri.point(t, e),
                !Ri.validate(i))
                throw "point is not on curve"
        } else
            "odd" === n != (t = (t = (e = new yi(t, 16).toRed(Ri.red)).redSqr().redMul(e)).redIAdd(e.redMul(Ri.a)).redIAdd(Ri.b).redSqrt()).fromRed().isOdd() && (t = t.redNeg()),
                i = Ri.point(e, t);
        return i
    }

    function Ni(t, e) {
        if (!(this instanceof Ni))
            return new Ni(t, e);
        if (this.curve = Ri,
            this.pub = null,
        (this.pri = null) != t)
            if ("string" == typeof t)
                this._pubFromString(t);
            else if (Array.isArray(t))
                this._pubFromBytes(t);
            else {
                if (!("x" in t && t.x instanceof yi && "y" in t && t.y instanceof yi))
                    throw "invalid public key";
                this.pub = t
            }
        if (null != e) {
            if ("string" == typeof e)
                this.pri = new yi(e, 16);
            else {
                if (!(e instanceof yi))
                    throw "invalid private key";
                this.pri = e
            }
            null == this.pub && (this.pub = Ri.g.mul(this.pri))
        }
    }

    function Pi() {
        for (var t = 0, e = Ri.n.sub(new yi(2)); 0 < (t = new yi(wi.generate(32, "hex", ki(64)), 16)).cmp(e);)
            ;
        return new Ni(null, t)
    }

    Ni.prototype._pubFromString = function (t) {
        var e = "invalid key string";
        if (t.length < 66)
            throw e;
        var n = t.slice(2, 66);
        switch (t.slice(0, 2)) {
            case "00":
                throw "public key should not be infinity";
            case "02":
                this.pub = Ii(n, null, "even");
                break;
            case "03":
                this.pub = Ii(n, null, "odd");
                break;
            case "04":
            case "06":
            case "07":
                if (t.length < 130)
                    throw e;
                this.pub = Ii(n, t.slice(66, 130));
                break;
            default:
                throw e
        }
    }
        ,
        Ni.prototype._pubFromBytes = function (t) {
            var e = "unrecognized key";
            if (t.length < 33)
                throw e;
            var n = t.slice(1, 33);
            switch (t[0]) {
                case 0:
                    throw "public key should not be infinity";
                case 2:
                    this.pub = Ii(n, null, "even");
                    break;
                case 3:
                    this.pub = Ii(n, null, "odd");
                    break;
                case 4:
                case 6:
                case 7:
                    if (t.length < 65)
                        throw e;
                    this.pub = Ii(n, t.slice(33, 65));
                    break;
                default:
                    throw e
            }
        }
        ,
        Ni.prototype.validate = function () {
            if (null != this.pub) {
                if (this.pub.isInfinity())
                    return !1;
                if (!this.curve.validate(this.pub))
                    return !1;
                if (!this.pub.mul(this.curve.n).isInfinity())
                    return !1
            }
            if (null != this.pri) {
                if (0 < this.pri.cmp(this.curve.n.sub(new yi(2))))
                    return !1;
                if (null != this.pub && !this.pub.eq(this.curve.g.mul(this.pri)))
                    return !1
            }
            return !0
        }
        ,
        Ni.prototype.pubToString = function (t) {
            var e = "";
            switch (t) {
                case "compress":
                    return (e = this.pub.getY().isEven() ? "02" : "03") + this.pub.getX().toString(16, 32);
                case "mix":
                    e = this.pub.getY().isEven() ? "06" : "07";
                    break;
                default:
                    e = "04"
            }
            return e + this.pub.getX().toString(16, 32) + this.pub.getY().toString(16, 32)
        }
        ,
        Ni.prototype.pubToBytes = function (t) {
            var e = [];
            switch (t) {
                case "compress":
                    return this.pub.getY().isEven() ? e.push(2) : e.push(3),
                        e.concat(this.pub.getX().toArray("be", 32));
                case "mix":
                    this.pub.getY().isEven() ? e.push(6) : e.push(7);
                    break;
                default:
                    e.push(4)
            }
            return e.concat(this.pub.getX().toArray("be", 32)).concat(this.pub.getY().toArray("be", 32))
        }
        ,
        Ni.prototype.sign = function (t) {
            if (null == this.pri)
                throw "cannot sign message without private key";
            return "string" == typeof t ? this.signDigest(ut.digest(this._combine(_i(t)))) : this.signDigest(ut.digest(this._combine(t)))
        }
        ,
        Ni.prototype.verify = function (t, e, n) {
            if (null == this.pub)
                throw "cannot verify signature without public key";
            return this.verifyDigest(ut.digest(this._combine(t)), e, n)
        }
        ,
        Ni.prototype.signRaw = function (t) {
            return this.signDigest(ut.digest(t))
        }
        ,
        Ni.prototype.verifyRaw = function (t, e, n) {
            return this.verifyDigest(ut.digest(t), e, n)
        }
        ,
        Ni.prototype.signDigest = function (t) {
            for (var e = {
                r: "",
                s: ""
            }; ;) {
                var n = new yi(wi.generate(32, "hex", ki(64)), 16).umod(this.curve.n)
                    , i = this.curve.g.mul(n);
                if (!(i = Mi(t).add(i.getX()).umod(this.curve.n)).isZero() && !i.add(n).eq(this.curve.n)) {
                    var r = new yi(1).add(this.pri).invm(this.curve.n);
                    n = n.sub(i.mul(this.pri)).umod(this.curve.n);
                    if (!(r = r.mul(n).umod(this.curve.n)).isZero()) {
                        e.r = Si(i.toString(16), 64, "0"),
                            e.s = Si(r.toString(16), 64, "0");
                        break
                    }
                }
            }
            return e
        }
        ,
        Ni.prototype.verifyDigest = function (t, e, n) {
            if (0 <= (e = new yi(e, 16)).cmp(this.curve.n))
                return !1;
            if (0 <= (n = new yi(n, 16)).cmp(this.curve.n))
                return !1;
            var i = e.add(n).umod(this.curve.n);
            return !i.isZero() && (n = this.curve.g.mul(n).add(this.pub.mul(i)),
                !!Mi(t).add(n.getX()).umod(this.curve.n).eq(e))
        }
    ;
    var Oi = {
        c1c3c2: 0,
        c1c2c3: 1
    };
    Ni.prototype.encryptMode = Oi,
        Ni.prototype.encrypt = function (t, e, n) {
            n = void 0 === n ? Oi.c1c3c2 : n,
            "string" == typeof t && (t = ("hex" === e ? Ei : _i)(t));
            for (var i = new Array(t.length), r = 0; r < t.length; r++)
                i[r] = t[r];
            for (; ;) {
                var a, o = (a = Pi()).pri,
                    s = (a = a.pub).getX().toArray("be", 32).concat(a.getY().toArray("be", 32));
                if (0 === this.pub.mul(this.curve.h))
                    return null;
                var l = this.pub.mul(o)
                    , u = 1
                    , c = 0
                    , f = this._KDF(l, u);
                for (r = 0; r < i.length && (c != f.length || (c = 0,
                    u++,
                null !== (f = this._KDF(l, u)))); r++)
                    i[r] ^= f[c++];
                if (null !== f)
                    break
            }
            var d, h = l.getX().toArray("be", 32), p = l.getY().toArray("be", 32), m = new Array(32),
                b = ut.sm3_ctx_new();
            if (ut.sm3_init(b),
                ut.sm3_update(b, h),
                ut.sm3_update(b, t),
                ut.sm3_update(b, p),
                ut.sm3_final(b, m),
                ut.sm3_ctx_free(b),
            n === Oi.c1c2c3)
                d = s.concat(i, m);
            else {
                if (n !== Oi.c1c3c2)
                    return null;
                d = s.concat(m, i)
            }
            return "hex" === e ? Ai(d) : d
        }
        ,
        Ni.prototype.decrypt = function (t, e, n) {
            if (!this.pri)
                return null;
            n = void 0 === n ? Oi.c1c3c2 : n;
            var i = (t = "string" == typeof t ? ("hex" === e ? Ei : _i)(t) : t).slice(0, 64);
            if (n === Oi.c1c2c3) {
                var r = t.length - 32
                    , a = t.slice(64, r);
                r = t.slice(r)
            } else {
                if (n !== Oi.c1c3c2)
                    return null;
                r = t.slice(64, 96),
                    a = t.slice(96)
            }
            for (var o = new Ni("04" + Ai(i)).pub.mul(this.pri), s = new Array(a.length), l = 0; l < a.length; l++)
                s[l] = a[l];
            var u = 1
                , c = 0
                , f = this._KDF(o, u);
            for (l = 0; l < a.length && (c != f.length || (c = 0,
            null !== (f = this._KDF(o, ++u)))); l++)
                s[l] ^= f[c++];
            n = o.getX().toArray("be", 32),
                t = o.getY().toArray("be", 32),
                i = new Array(32);
            var d = ut.sm3_ctx_new();
            return ut.sm3_init(d),
                ut.sm3_update(d, n),
                ut.sm3_update(d, s),
                ut.sm3_update(d, t),
                ut.sm3_final(d, i),
                ut.sm3_ctx_free(d),
                Ai(r) !== Ai(i) ? null : s = "hex" === e ? Ai(s) : s
        }
        ,
        Ni.prototype._KDF = function (t, e) {
            var n = t.getX().toArray("be", 32)
                , i = (t = t.getY().toArray("be", 32),
                new Array(32))
                , r = ut.sm3_ctx_new();
            ut.sm3_init(r),
                ut.sm3_update(r, n),
                ut.sm3_update(r, t),
                ut.sm3_update(r, [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]),
                ut.sm3_final(r, i),
                ut.sm3_ctx_free(r);
            for (var a = 0; a < i.length; a++)
                if (0 !== i[a])
                    return i;
            return null
        }
        ,
        Ni.prototype._combine = function (t) {
            var e = (e = (e = (e = (e = (e = (e = [0, 128, 49, 50, 51, 52, 53, 54, 55, 56, 49, 50, 51, 52, 53, 54, 55, 56]).concat(this.curve.a.fromRed().toArray())).concat(this.curve.b.fromRed().toArray())).concat(this.curve.g.getX().toArray())).concat(this.curve.g.getY().toArray())).concat(this.pub.getX().toArray(16, 32))).concat(this.pub.getY().toArray(16, 32));
            return e = ut.digest(e),
                "string" == typeof t ? e.concat(_i(t)) : e.concat(t)
        }
        ,
        Ni.prototype.toString = function () {
            var t = "public: ";
            return this.pub ? t += "(" + this.pub.getX().toString(16) + ", " + this.pub.getY().toString(16) + ")" : t += "null",
                t += ", private: ",
                this.pri ? t += Si(this.pri.toString(16), 64, "0") : t += "null",
                t
        }
    ;
    const xi = {
        SM2KeyPair: Ni,
        encryptMode: Oi,
        genKeyPair: Pi,
        curve: Ri
    };

    function Ti(t, e, n, i = "") {
        if ([r = ""] = [i],
            i = 16 < (a = r.length) || a < 4 ? null : (a < 16 ? "0" : "") + Number(a).toString(16).toUpperCase() + r + "0000000000000000".substr(0, (14 < a ? 32 : 16) - a - 2),
        !t || !e || !i)
            return null;
        var r = xi.SM2KeyPair("04" + t).encrypt(Bi(i), "hex")
            , a = Di();
        t = Di(),
            i = {
                key: Li(a),
                mode: "cbc",
                iv: Bi(t),
                padding: "pkcs7"
            },
            i = new K(i).encrypt(Li(n + ":" + r));
        return (n = xi.SM2KeyPair("04" + e).encrypt(Bi(a + t), "hex")) + ":" + i
    }

    function Bi(t) {
        if ("" === t)
            return "";
        var e = [];
        e.push("0x");
        for (var n = 0; n < t.length; n++)
            e.push(t.charCodeAt(n).toString(16));
        return e[0] = "",
            e.join("")
    }

    function Li(t) {
        for (var e = [], n = 0, i = t.length; n < i; ++n)
            e.push(t.charCodeAt(n));
        return new Uint8Array(e)
    }

    function Di() {
        var t = [];
        for (let n = 0; n < 16; n++) {
            var e = 16 * Math.random() | 0;
            t.push("0123456789abcdef"[e])
        }
        return t.join("")
    }

    const qi = 16
        , Fi = 65536
        , Ui = 65535;
    let Vi, zi, ji, Yi;

    function Gi(t) {
        zi = new Array(Vi = t);
        for (let t = 0; t < zi.length; t++)
            zi[t] = 0;
        ji = new Wi,
            (Yi = new Wi).digits[0] = 1
    }

    function Wi(t) {
        this.digits = "boolean" == typeof t && 1 == t ? null : zi.slice(0),
            this.isNeg = !1
    }

    function Hi(t) {
        const e = new Wi(!0);
        return e.digits = t.digits.slice(0),
            e.isNeg = t.isNeg,
            e
    }

    function Ki(t) {
        let e = "";
        for (let n = t.length - 1; -1 < n; --n)
            e += t.charAt(n);
        return e
    }

    Gi(20);
    {
        var Zi = 1e15;
        const t = new Wi;
        t.isNeg = Zi < 0,
            Zi = Math.abs(Zi);
        let e = 0;
        for (; 0 < Zi;)
            t.digits[e++] = Zi & Ui,
                Zi >>= 16
    }
    const Qi = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z")
        , Ji = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    function Xi(t) {
        let e = "";
        ir(t);
        for (let n = ir(t); -1 < n; --n)
            e += function (t) {
                let e = "";
                for (let n = 0; n < 4; ++n)
                    e += Ji[15 & t],
                        t >>>= 4;
                return Ki(e)
            }(t.digits[n]);
        return e
    }

    function $i(t) {
        const e = new Wi;
        for (let n = t.length, i = 0; 0 < n; n -= 4,
            ++i)
            e.digits[i] = function (t) {
                let e = 0;
                var n, i = Math.min(t.length, 4);
                for (let r = 0; r < i; ++r)
                    e = (e <<= 4) | (48 <= (n = t.charCodeAt(r)) && n <= 57 ? n - 48 : 65 <= n && n <= 90 ? 10 + n - 65 : 97 <= n && n <= 122 ? 10 + n - 97 : 0);
                return e
            }(t.substr(Math.max(n - 4, 0), Math.min(n, 4)));
        return e
    }

    function tr(t) {
        let e = "";
        for (let r = ir(t); -1 < r; --r)
            e += (n = t.digits[r],
                void 0,
                i = String.fromCharCode(255 & n),
                n >>>= 8,
            String.fromCharCode(255 & n) + i);
        var n, i;
        return e
    }

    function er(t, e) {
        let n;
        if (t.isNeg != e.isNeg)
            e.isNeg = !e.isNeg,
                n = nr(t, e),
                e.isNeg = !e.isNeg;
        else {
            n = new Wi;
            let i, r = 0;
            for (let a = 0; a < t.digits.length; ++a)
                i = t.digits[a] + e.digits[a] + r,
                    n.digits[a] = 65535 & i,
                    r = Number(i >= Fi);
            n.isNeg = t.isNeg
        }
        return n
    }

    function nr(t, e) {
        let n;
        if (t.isNeg != e.isNeg)
            e.isNeg = !e.isNeg,
                n = er(t, e),
                e.isNeg = !e.isNeg;
        else {
            let r, a;
            n = new Wi;
            for (var i = a = 0; i < t.digits.length; ++i)
                r = t.digits[i] - e.digits[i] + a,
                    n.digits[i] = 65535 & r,
                n.digits[i] < 0 && (n.digits[i] += Fi),
                    a = 0 - Number(r < 0);
            if (-1 == a) {
                for (i = a = 0; i < t.digits.length; ++i)
                    r = 0 - n.digits[i] + a,
                        n.digits[i] = 65535 & r,
                    n.digits[i] < 0 && (n.digits[i] += Fi),
                        a = 0 - Number(r < 0);
                n.isNeg = !t.isNeg
            } else
                n.isNeg = t.isNeg
        }
        return n
    }

    function ir(t) {
        let e = t.digits.length - 1;
        for (; 0 < e && 0 == t.digits[e];)
            --e;
        return e
    }

    function rr(t) {
        var e = ir(t);
        let n = t.digits[e];
        var i = (e + 1) * qi;
        let r;
        for (r = i; r > i - qi && 0 == (32768 & n); --r)
            n <<= 1;
        return r
    }

    function ar(t, e) {
        const n = new Wi;
        let i;
        var r = ir(t)
            , a = ir(e);
        let o, s;
        for (let l = 0; l <= a; ++l) {
            i = 0,
                s = l;
            for (let a = 0; a <= r; ++a,
                ++s)
                o = n.digits[s] + t.digits[a] * e.digits[l] + i,
                    n.digits[s] = o & Ui,
                    i = o >>> 16;
            n.digits[l + r + 1] = i
        }
        return n.isNeg = t.isNeg != e.isNeg,
            n
    }

    function or(t, e, n, i, r) {
        var a = Math.min(e + r, t.length);
        for (let r = e, o = i; r < a; ++r,
            ++o)
            n[o] = t[r]
    }

    const sr = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535);

    function lr(t, e) {
        const n = Math.floor(e / qi)
            , i = new Wi;
        or(t.digits, 0, i.digits, n, i.digits.length - n);
        for (var r = e % qi, a = qi - r, o = i.digits.length - 1, s = o - 1; 0 < o; --o,
            --s)
            i.digits[o] = i.digits[o] << r & Ui | (i.digits[s] & sr[r]) >>> a;
        return i.digits[0] = i.digits[o] << r & Ui,
            i.isNeg = t.isNeg,
            i
    }

    const ur = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);

    function cr(t, e) {
        const n = Math.floor(e / qi)
            , i = new Wi;
        or(t.digits, n, i.digits, 0, t.digits.length - n);
        var r = e % qi
            , a = qi - r;
        for (let t = 0, e = t + 1; t < i.digits.length - 1; ++t,
            ++e)
            i.digits[t] = i.digits[t] >>> r | (i.digits[e] & ur[r]) << a;
        return i.digits[i.digits.length - 1] >>>= r,
            i.isNeg = t.isNeg,
            i
    }

    function fr(t, e) {
        var n = new Wi;
        return or(t.digits, 0, n.digits, e, n.digits.length - e),
            n
    }

    function dr(t, e) {
        var n = new Wi;
        return or(t.digits, e, n.digits, 0, n.digits.length - e),
            n
    }

    function hr(t, e) {
        var n = new Wi;
        return or(t.digits, 0, n.digits, 0, e),
            n
    }

    function pr(t, e) {
        if (t.isNeg != e.isNeg)
            return 1 - 2 * Number(t.isNeg);
        for (let n = t.digits.length - 1; 0 <= n; --n)
            if (t.digits[n] != e.digits[n])
                return t.isNeg ? 1 - 2 * Number(t.digits[n] > e.digits[n]) : 1 - 2 * Number(t.digits[n] < e.digits[n]);
        return 0
    }

    function mr(t, e) {
        let n = rr(t)
            , i = rr(e);
        const r = e.isNeg;
        let a, o;
        if (n < i)
            return t.isNeg ? ((a = Hi(Yi)).isNeg = !e.isNeg,
                t.isNeg = !1,
                e.isNeg = !1,
                o = nr(e, t),
                t.isNeg = !0,
                e.isNeg = r) : (a = new Wi,
                o = Hi(t)),
                new Array(a, o);
        a = new Wi,
            o = t;
        let s = Math.ceil(i / qi) - 1
            , l = 0;
        for (; e.digits[s] < 32768;)
            e = lr(e, 1),
                ++l,
                ++i,
                s = Math.ceil(i / qi) - 1;
        o = lr(o, l),
            n += l;
        const u = Math.ceil(n / qi) - 1;
        let c = fr(e, u - s);
        for (; -1 != pr(o, c);)
            ++a.digits[u - s],
                o = nr(o, c);
        for (let t = u; t > s; --t) {
            const n = t >= o.digits.length ? 0 : o.digits[t]
                , i = t - 1 >= o.digits.length ? 0 : o.digits[t - 1]
                , r = t - 2 >= o.digits.length ? 0 : o.digits[t - 2]
                , l = s >= e.digits.length ? 0 : e.digits[s]
                , u = s - 1 >= e.digits.length ? 0 : e.digits[s - 1];
            a.digits[t - s - 1] = n == l ? Ui : Math.floor((n * Fi + i) / l);
            let f = a.digits[t - s - 1] * (l * Fi + u)
                , d = 4294967296 * n + (i * Fi + r);
            for (; f > d;)
                --a.digits[t - s - 1],
                    f = a.digits[t - s - 1] * (l * Fi | u),
                    d = n * Fi * Fi + (i * Fi + r);
            (o = nr(o, function (t, e) {
                let n, i, r;
                const a = new Wi;
                n = ir(t);
                for (let o = i = 0; o <= n; ++o)
                    r = a.digits[o] + t.digits[o] * e + i,
                        a.digits[o] = r & Ui,
                        i = r >>> 16;
                return a.digits[1 + n] = i,
                    a
            }(c = fr(e, t - s - 1), a.digits[t - s - 1]))).isNeg && (o = er(o, c),
                --a.digits[t - s - 1])
        }
        return o = cr(o, l),
            a.isNeg = t.isNeg != r,
        t.isNeg && (a = (r ? er : nr)(a, Yi),
            o = nr(e = cr(e, l), o)),
        0 == o.digits[0] && 0 == ir(o) && (o.isNeg = !1),
            new Array(a, o)
    }

    function br(t) {
        var e = dr(ar(e = dr(t, this.k - 1), this.mu), this.k + 1);
        let n = nr(hr(t, this.k + 1), hr(ar(e, this.modulus), this.k + 1))
            , i = 0 <= pr(n = n.isNeg ? er(n, this.bkplus1) : n, this.modulus);
        for (; i;)
            i = 0 <= pr(n = nr(n, this.modulus), this.modulus);
        return n
    }

    function gr(t, e) {
        return t = ar(t, e),
            this.modulo(t)
    }

    function vr(t, e) {
        let n = new Wi
            , i = (n.digits[0] = 1,
            t)
            , r = e;
        for (; 0 != (1 & r.digits[0]) && (n = this.multiplyMod(n, i)),
               0 != (r = cr(r, 1)).digits[0] || 0 != ir(r);)
            i = this.multiplyMod(i, i);
        return n
    }

    const yr = {};

    function wr(t, e, n, i) {
        this.e = $i(t),
            this.d = $i(e),
            this.m = $i(n),
            this.chunkSize = "number" != typeof i ? 2 * ir(this.m) : i / 8,
            this.radix = 16,
            this.barrett = new function (t) {
                this.modulus = Hi(t),
                    this.k = ir(this.modulus) + 1;
                const e = new Wi;
                e.digits[2 * this.k] = 1,
                    this.mu = mr(e, this.modulus)[0],
                    this.bkplus1 = new Wi,
                    this.bkplus1.digits[this.k + 1] = 1,
                    this.modulo = br,
                    this.multiplyMod = gr,
                    this.powMod = vr
            }
            (this.m)
    }

    function _r(t, e, n, i) {
        const r = new Array;
        let a, o, s, l, u, c, f, d, h, p, m = e.length, b = "";
        for (l = "string" == typeof n ? n == yr.NoPadding ? 1 : n == yr.PKCS1Padding ? 2 : 0 : 0,
                 u = "string" == typeof i && i == yr.RawEncoding ? 1 : 0,
                 1 == l ? m > t.chunkSize && (m = t.chunkSize) : 2 == l && m > t.chunkSize - 11 && (m = t.chunkSize - 11),
                 a = 0,
                 o = 2 == l ? m - 1 : t.chunkSize - 1; a < m;)
            l ? r[o] = e.charCodeAt(a) : r[a] = e.charCodeAt(a),
                a++,
                o--;
        for (1 == l && (a = 0),
                 o = t.chunkSize - m % t.chunkSize; 0 < o;) {
            if (2 == l) {
                for (c = Math.floor(256 * Math.random()); !c;)
                    c = Math.floor(256 * Math.random());
                r[a] = c
            } else
                r[a] = 0;
            a++,
                o--
        }
        for (2 == l && (r[m] = 0,
            r[t.chunkSize - 2] = 2,
            r[t.chunkSize - 1] = 0),
                 f = r.length,
                 a = 0; a < f; a += t.chunkSize) {
            for (d = new Wi,
                     o = 0,
                     s = a; s < a + t.chunkSize; ++o)
                d.digits[o] = r[s++],
                    d.digits[o] += r[s++] << 8;
            h = t.barrett.powMod(d, t.e),
                b += p = 1 == u ? tr(h) : 16 == t.radix ? Xi(h) : function (t, e) {
                    const n = new Wi;
                    n.digits[0] = e;
                    let i = mr(t, n)
                        , r = Qi[i[1].digits[0]];
                    var digit;
                    for (; 1 == pr(i[0], ji);)
                        i = mr(i[0], n),
                            digit = i[1].digits[0],
                            r += Qi[i[1].digits[0]];
                    return (t.isNeg ? "-" : "") + Ki(r)
                }(h, t.radix)
        }
        return b
    }

    function Mr() {
        this.i = 0,
            this.j = 0,
            this.S = new Array
    }

    let Sr, kr, Er;

    function Ar() {
        var t = (new Date).getTime();
        kr[Er++] ^= 255 & t,
            kr[Er++] ^= t >> 8 & 255,
            kr[Er++] ^= t >> 16 & 255,
            kr[Er++] ^= t >> 24 & 255,
        256 <= Er && (Er -= 256)
    }

    if (yr.NoPadding = "NoPadding",
        yr.PKCS1Padding = "PKCS1Padding",
        yr.RawEncoding = "RawEncoding",
        yr.NumericEncoding = "NumericEncoding",
        Mr.prototype.init = function (t) {
            let e, n, i;
            for (e = 0; e < 256; ++e)
                this.S[e] = e;
            for (n = 0,
                     e = 0; e < 256; ++e)
                n = n + this.S[e] + t[e % t.length] & 255,
                    i = this.S[e],
                    this.S[e] = this.S[n],
                    this.S[n] = i;
            this.i = 0,
                this.j = 0
        }
        ,
        Mr.prototype.next = function () {
            var t;
            return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
        }
        ,
    null == kr) {
        let t;
        if (kr = new Array,
            Er = 0,
        window.crypto && window.crypto.getRandomValues) {
            const e = new Uint8Array(32);
            for (window.crypto.getRandomValues(e),
                     t = 0; t < 32; ++t)
                kr[Er++] = e[t]
        }
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            const e = window.crypto.random(32);
            for (t = 0; t < e.length; ++t)
                kr[Er++] = 255 & e.charCodeAt(t)
        }
        for (; Er < 256;)
            t = Math.floor(65536 * Math.random()),
                kr[Er++] = t >>> 8,
                kr[Er++] = 255 & t;
        Er = 0,
            Ar()
    }

    function Cr() {
    }

    Cr.prototype.nextBytes = function (t) {
        let e;
        for (e = 0; e < t.length; ++e)
            t[e] = function () {
                if (null == Sr) {
                    for (Ar(),
                             (Sr = new Mr).init(kr),
                             Er = 0; Er < kr.length; ++Er)
                        kr[Er] = 0;
                    Er = 0
                }
                return Sr.next()
            }()
    }
    ;
    const Rr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function Ir(t) {
        let e = "";
        for (let n = 0; n < t.length; n++)
            e += ("00" + t.charCodeAt(n).toString(16)).substr(-2);
        return e
    }

    function Nr(t) {
        const e = new Cr
            , n = new Array;
        for (let e = 0; e < t; e++)
            n[e] = 0;
        return e.nextBytes(n),
            Or(n)
    }

    function Pr(t) {
        const e = "0123456789abcdef"
            , n = [t.length / 2]
            , i = [];
        for (let r = 0; r < n; r++)
            i[r] = 16 * e.indexOf(t.charAt(2 * r + 0)) + e.indexOf(t.charAt(2 * r + 1));
        return i
    }

    function Or(t) {
        var e = "0123456789abcdef";
        let n = "";
        for (let a = 0, o = t.length; a < o; a++) {
            var i = t[a] % 16
                , r = t[a] - t[a] % 16;
            n += "" + e.substring(r /= 16, 1 + r) + e.substring(i, 1 + i)
        }
        return n
    }

    function xr() {
    }

    function Tr(t) {
        let e = Ir("" + t);
        for (; e.length < 16;)
            e += "00";
        return e
    }

    function Br(t, e, n, i, r) {
        var a = 1024 === r ? "30818902818100" : "3082010A0282010100"
            , o = 1024 === r ? "13" : "17";
        let s = ""
            , l = "";
        var u = -1;
        let c = -1;
        u = n.indexOf(a),
        0 < (c = n.indexOf("0203010001")) && (n = n.substring(0, c),
        0 == u && (s = n.substring(o))),
            u = i.indexOf(a),
        0 < (c = i.indexOf("0203010001")) && (i = i.substring(0, c),
        0 == u && (l = i.substring(o))),
            Gi(524);
        const f = Ir(e + ":" + _r(new wr("10001", "10001", s, r), t, yr.PKCS1Padding, yr.NumericEncoding))
            , d = Nr(8)
            , h = new xr;
        h.init(Ir(d)),
            1024 === r ? h.crypt("0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") : h.crypt("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            n = h.crypt(f);
        const p = _r(new wr("10001", "10001", l, r), d, yr.PKCS1Padding, yr.NumericEncoding);
        let m = "";
        u = 0;
        for (var b = p.length; u < b; u += 2)
            m = p.substring(u, u + 2) + m;
        return function (t) {
            let e, n, i = "";
            for (e = 0; e + 3 <= t.length; e += 3)
                n = parseInt(t.substring(e, e + 3), 16),
                    i += Rr.charAt(n >> 6) + Rr.charAt(63 & n);
            for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
                i += Rr.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
                i += Rr.charAt(n >> 2) + Rr.charAt((3 & n) << 4)); 0 < (3 & i.length);)
                i += "=";
            return i
        }(Tr((a = Nr(12) + m + "00").length / 2) + a + (n = Tr(n.length / 2) + n))
    }

    function Lr(t, e, n, i, r = 1024) {
        {
            let a = Br(i, t, n, e, r);
            return a = 572 != a.length ? Br(i, t, n, e, r) : a
        }
    }

    xr.prototype.init = function (t) {
        var e = Pr(t);
        let n = []
            , i = e.length;
        for (var r = 0; r < 256; r++)
            n[r] = r;
        let a, o = 0;
        for (r = 0; r < 256; r++)
            o = (o + n[r] + e[r % i]) % 256,
                a = n[r],
                n[r] = n[o],
                n[o] = a;
        this.i = 0,
            this.j = 0,
            this.s = n
    }
        ,
        xr.prototype.crypt = function (t) {
            this.p = Pr(t);
            const e = this.s;
            let n = this.i
                , i = this.j;
            const r = [];
            for (let t = 0, o = this.p.length; t < o; t++) {
                i = (i + e[n = (n + 1) % 256]) % 256;
                var a = e[n];
                e[n] = e[i],
                    e[i] = a,
                    r[t] = this.p[t] ^ e[(e[n] + e[i]) % 256]
            }
            return this.s = e,
                this.i = n,
                this.j = i,
                Or(r)
        }
    Nt = {
        gmEncrypt: Ti,
        encryptor: Lr
    }
    return Nt;
}



var timestamp = "1701243869328";
var controllerPublicKey = "30818902818100a3da0dd5e9589c86ba812ae3dcf3091b9f8f51e889f89fd55eb2de54c917d8b54261db1d2d7458eceafa0cb6e128d94afa329ea58663c167f86e62fae3b77cfca59801aa5561b45de16e16884d738a90bd9d23d76623503d0c70a9366db0e4d7c87400f52dc9c236cb4353dd180bdd64dd7e2c17baa35cf14b0a516f8e87b3410203010001";
var securityPublicKey = "30818902818100D80FE66BF45F58D8ED3C13C41249585809BA994F6AF04C6B00A7A1F2A18540ACF3E0FD695D94D0EAF7C604E7630D248090FB6C4EBD6A35A84E781A51ECEB72E471FDEB61586A4A3F34815E9340F125E4D43F64B8E441640E06E01C5B60D7994079D41AD5687F42372E283A7D64F0A34E7DE4AFBF829EF51C7FD1EE7D36B520E10203010001";
var password = "hfjsahf343";
utils_ = utils({}, "1701243869328");
console.log(utils_.encryptor(timestamp,controllerPublicKey,securityPublicKey,password))


var hsmPubKeyGM = "F272877BE4DF7B56EDDB7DCFD1DA29F2A7AD143637FCB812CC46CCEBC94F286A1633B25B67326D4459F6CB0D239913011C388F4BE1647264DFC30C2401E1EEA3"
var appPubKeyGM = "61579793cd0c6b252e5a2a15335ba52537d2e354c83bc9cc551edc832aff1073183b4b9395e58ab32d49934247a33a02bddba2015b780b26fef7c6dc245f915c"

console.log(utils_.gmEncrypt(hsmPubKeyGM,appPubKeyGM,timestamp,password))