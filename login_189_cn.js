var navigator = {};
var window = this;


var encrypt = function() {
    var t = t || function(t, r) {
        var e = Object.create || function() {
            function t() {}
            return function(r) {
                var e;
                return t.prototype = r,
                    e = new t,
                    t.prototype = null,
                    e
            }
        }()
            , i = {}
            , n = i.lib = {}
            , o = n.Base = function() {
            return {
                extend: function(t) {
                    var r = e(this);
                    return t && r.mixIn(t),
                    r.hasOwnProperty("init") && this.init !== r.init || (r.init = function() {
                            r.$super.init.apply(this, arguments)
                        }
                    ),
                        r.init.prototype = r,
                        r.$super = this,
                        r
                },
                create: function() {
                    var t = this.extend();
                    return t.init.apply(t, arguments),
                        t
                },
                init: function() {},
                mixIn: function(t) {
                    for (var r in t)
                        t.hasOwnProperty(r) && (this[r] = t[r]);
                    t.hasOwnProperty("toString") && (this.toString = t.toString)
                },
                clone: function() {
                    return this.init.prototype.extend(this)
                }
            }
        }()
            , s = n.WordArray = o.extend({
            init: function(t, e) {
                t = this.words = t || [],
                    e != r ? this.sigBytes = e : this.sigBytes = 4 * t.length
            },
            toString: function(t) {
                return (t || c).stringify(this)
            },
            concat: function(t) {
                var r = this.words
                    , e = t.words
                    , i = this.sigBytes
                    , n = t.sigBytes;
                if (this.clamp(),
                i % 4)
                    for (var o = 0; o < n; o++) {
                        var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        r[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8
                    }
                else
                    for (var o = 0; o < n; o += 4)
                        r[i + o >>> 2] = e[o >>> 2];
                return this.sigBytes += n,
                    this
            },
            clamp: function() {
                var r = this.words
                    , e = this.sigBytes;
                r[e >>> 2] &= 4294967295 << 32 - e % 4 * 8,
                    r.length = t.ceil(e / 4)
            },
            clone: function() {
                var t = o.clone.call(this);
                return t.words = this.words.slice(0),
                    t
            },
            random: function(r) {
                for (var e, i = [], n = function(r) {
                    var r = r
                        , e = 987654321
                        , i = 4294967295;
                    return function() {
                        e = 36969 * (65535 & e) + (e >> 16) & i,
                            r = 18e3 * (65535 & r) + (r >> 16) & i;
                        var n = (e << 16) + r & i;
                        return n /= 4294967296,
                            n += .5,
                        n * (t.random() > .5 ? 1 : -1)
                    }
                }, o = 0; o < r; o += 4) {
                    var a = n(4294967296 * (e || t.random()));
                    e = 987654071 * a(),
                        i.push(4294967296 * a() | 0)
                }
                return new s.init(i,r)
            }
        })
            , a = i.enc = {}
            , c = a.Hex = {
            stringify: function(t) {
                for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) {
                    var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    i.push((o >>> 4).toString(16)),
                        i.push((15 & o).toString(16))
                }
                return i.join("")
            },
            parse: function(t) {
                for (var r = t.length, e = [], i = 0; i < r; i += 2)
                    e[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new s.init(e,r / 2)
            }
        }
            , h = a.Latin1 = {
            stringify: function(t) {
                for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) {
                    var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    i.push(String.fromCharCode(o))
                }
                return i.join("")
            },
            parse: function(t) {
                for (var r = t.length, e = [], i = 0; i < r; i++)
                    e[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
                return new s.init(e,r)
            }
        }
            , l = a.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(h.stringify(t)))
                } catch (t) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            parse: function(t) {
                return h.parse(unescape(encodeURIComponent(t)))
            }
        }
            , f = n.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = new s.init,
                    this._nDataBytes = 0
            },
            _append: function(t) {
                "string" == typeof t && (t = l.parse(t)),
                    this._data.concat(t),
                    this._nDataBytes += t.sigBytes
            },
            _process: function(r) {
                var e = this._data
                    , i = e.words
                    , n = e.sigBytes
                    , o = this.blockSize
                    , a = 4 * o
                    , c = n / a;
                c = r ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0);
                var h = c * o
                    , l = t.min(4 * h, n);
                if (h) {
                    for (var f = 0; f < h; f += o)
                        this._doProcessBlock(i, f);
                    var u = i.splice(0, h);
                    e.sigBytes -= l
                }
                return new s.init(u,l)
            },
            clone: function() {
                var t = o.clone.call(this);
                return t._data = this._data.clone(),
                    t
            },
            _minBufferSize: 0
        })
            , u = (n.Hasher = f.extend({
            cfg: o.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t),
                    this.reset()
            },
            reset: function() {
                f.reset.call(this),
                    this._doReset()
            },
            update: function(t) {
                return this._append(t),
                    this._process(),
                    this
            },
            finalize: function(t) {
                t && this._append(t);
                var r = this._doFinalize();
                return r
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(r, e) {
                    return new t.init(e).finalize(r)
                }
            },
            _createHmacHelper: function(t) {
                return function(r, e) {
                    return new u.HMAC.init(t,e).finalize(r)
                }
            }
        }),
            i.algo = {});
        return i
    }(Math);
    return function() {
        function r(t, r, e) {
            for (var i = [], o = 0, s = 0; s < r; s++)
                if (s % 4) {
                    var a = e[t.charCodeAt(s - 1)] << s % 4 * 2
                        , c = e[t.charCodeAt(s)] >>> 6 - s % 4 * 2;
                    i[o >>> 2] |= (a | c) << 24 - o % 4 * 8,
                        o++
                }
            return n.create(i, o)
        }
        var e = t
            , i = e.lib
            , n = i.WordArray
            , o = e.enc;
        o.Base64 = {
            stringify: function(t) {
                var r = t.words
                    , e = t.sigBytes
                    , i = this._map;
                t.clamp();
                for (var n = [], o = 0; o < e; o += 3)
                    for (var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255, a = r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = s << 16 | a << 8 | c, l = 0; l < 4 && o + .75 * l < e; l++)
                        n.push(i.charAt(h >>> 6 * (3 - l) & 63));
                var f = i.charAt(64);
                if (f)
                    for (; n.length % 4; )
                        n.push(f);
                return n.join("")
            },
            parse: function(t) {
                var e = t.length
                    , i = this._map
                    , n = this._reverseMap;
                if (!n) {
                    n = this._reverseMap = [];
                    for (var o = 0; o < i.length; o++)
                        n[i.charCodeAt(o)] = o
                }
                var s = i.charAt(64);
                if (s) {
                    var a = t.indexOf(s);
                    a !== -1 && (e = a)
                }
                return r(t, e, n)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }(),
        function(r) {
            function e(t, r, e, i, n, o, s) {
                var a = t + (r & e | ~r & i) + n + s;
                return (a << o | a >>> 32 - o) + r
            }
            function i(t, r, e, i, n, o, s) {
                var a = t + (r & i | e & ~i) + n + s;
                return (a << o | a >>> 32 - o) + r
            }
            function n(t, r, e, i, n, o, s) {
                var a = t + (r ^ e ^ i) + n + s;
                return (a << o | a >>> 32 - o) + r
            }
            function o(t, r, e, i, n, o, s) {
                var a = t + (e ^ (r | ~i)) + n + s;
                return (a << o | a >>> 32 - o) + r
            }
            var s = t
                , a = s.lib
                , c = a.WordArray
                , h = a.Hasher
                , l = s.algo
                , f = [];
            !function() {
                for (var t = 0; t < 64; t++)
                    f[t] = 4294967296 * r.abs(r.sin(t + 1)) | 0
            }();
            var u = l.MD5 = h.extend({
                _doReset: function() {
                    this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(t, r) {
                    for (var s = 0; s < 16; s++) {
                        var a = r + s
                            , c = t[a];
                        t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                    }
                    var h = this._hash.words
                        , l = t[r + 0]
                        , u = t[r + 1]
                        , d = t[r + 2]
                        , v = t[r + 3]
                        , p = t[r + 4]
                        , _ = t[r + 5]
                        , y = t[r + 6]
                        , g = t[r + 7]
                        , B = t[r + 8]
                        , w = t[r + 9]
                        , k = t[r + 10]
                        , S = t[r + 11]
                        , m = t[r + 12]
                        , x = t[r + 13]
                        , b = t[r + 14]
                        , H = t[r + 15]
                        , z = h[0]
                        , A = h[1]
                        , C = h[2]
                        , D = h[3];
                    z = e(z, A, C, D, l, 7, f[0]),
                        D = e(D, z, A, C, u, 12, f[1]),
                        C = e(C, D, z, A, d, 17, f[2]),
                        A = e(A, C, D, z, v, 22, f[3]),
                        z = e(z, A, C, D, p, 7, f[4]),
                        D = e(D, z, A, C, _, 12, f[5]),
                        C = e(C, D, z, A, y, 17, f[6]),
                        A = e(A, C, D, z, g, 22, f[7]),
                        z = e(z, A, C, D, B, 7, f[8]),
                        D = e(D, z, A, C, w, 12, f[9]),
                        C = e(C, D, z, A, k, 17, f[10]),
                        A = e(A, C, D, z, S, 22, f[11]),
                        z = e(z, A, C, D, m, 7, f[12]),
                        D = e(D, z, A, C, x, 12, f[13]),
                        C = e(C, D, z, A, b, 17, f[14]),
                        A = e(A, C, D, z, H, 22, f[15]),
                        z = i(z, A, C, D, u, 5, f[16]),
                        D = i(D, z, A, C, y, 9, f[17]),
                        C = i(C, D, z, A, S, 14, f[18]),
                        A = i(A, C, D, z, l, 20, f[19]),
                        z = i(z, A, C, D, _, 5, f[20]),
                        D = i(D, z, A, C, k, 9, f[21]),
                        C = i(C, D, z, A, H, 14, f[22]),
                        A = i(A, C, D, z, p, 20, f[23]),
                        z = i(z, A, C, D, w, 5, f[24]),
                        D = i(D, z, A, C, b, 9, f[25]),
                        C = i(C, D, z, A, v, 14, f[26]),
                        A = i(A, C, D, z, B, 20, f[27]),
                        z = i(z, A, C, D, x, 5, f[28]),
                        D = i(D, z, A, C, d, 9, f[29]),
                        C = i(C, D, z, A, g, 14, f[30]),
                        A = i(A, C, D, z, m, 20, f[31]),
                        z = n(z, A, C, D, _, 4, f[32]),
                        D = n(D, z, A, C, B, 11, f[33]),
                        C = n(C, D, z, A, S, 16, f[34]),
                        A = n(A, C, D, z, b, 23, f[35]),
                        z = n(z, A, C, D, u, 4, f[36]),
                        D = n(D, z, A, C, p, 11, f[37]),
                        C = n(C, D, z, A, g, 16, f[38]),
                        A = n(A, C, D, z, k, 23, f[39]),
                        z = n(z, A, C, D, x, 4, f[40]),
                        D = n(D, z, A, C, l, 11, f[41]),
                        C = n(C, D, z, A, v, 16, f[42]),
                        A = n(A, C, D, z, y, 23, f[43]),
                        z = n(z, A, C, D, w, 4, f[44]),
                        D = n(D, z, A, C, m, 11, f[45]),
                        C = n(C, D, z, A, H, 16, f[46]),
                        A = n(A, C, D, z, d, 23, f[47]),
                        z = o(z, A, C, D, l, 6, f[48]),
                        D = o(D, z, A, C, g, 10, f[49]),
                        C = o(C, D, z, A, b, 15, f[50]),
                        A = o(A, C, D, z, _, 21, f[51]),
                        z = o(z, A, C, D, m, 6, f[52]),
                        D = o(D, z, A, C, v, 10, f[53]),
                        C = o(C, D, z, A, k, 15, f[54]),
                        A = o(A, C, D, z, u, 21, f[55]),
                        z = o(z, A, C, D, B, 6, f[56]),
                        D = o(D, z, A, C, H, 10, f[57]),
                        C = o(C, D, z, A, y, 15, f[58]),
                        A = o(A, C, D, z, x, 21, f[59]),
                        z = o(z, A, C, D, p, 6, f[60]),
                        D = o(D, z, A, C, S, 10, f[61]),
                        C = o(C, D, z, A, d, 15, f[62]),
                        A = o(A, C, D, z, w, 21, f[63]),
                        h[0] = h[0] + z | 0,
                        h[1] = h[1] + A | 0,
                        h[2] = h[2] + C | 0,
                        h[3] = h[3] + D | 0
                },
                _doFinalize: function() {
                    var t = this._data
                        , e = t.words
                        , i = 8 * this._nDataBytes
                        , n = 8 * t.sigBytes;
                    e[n >>> 5] |= 128 << 24 - n % 32;
                    var o = r.floor(i / 4294967296)
                        , s = i;
                    e[(n + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                        e[(n + 64 >>> 9 << 4) + 14] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
                        t.sigBytes = 4 * (e.length + 1),
                        this._process();
                    for (var a = this._hash, c = a.words, h = 0; h < 4; h++) {
                        var l = c[h];
                        c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                    }
                    return a
                },
                clone: function() {
                    var t = h.clone.call(this);
                    return t._hash = this._hash.clone(),
                        t
                }
            });
            s.MD5 = h._createHelper(u),
                s.HmacMD5 = h._createHmacHelper(u)
        }(Math),
        function() {
            var r = t
                , e = r.lib
                , i = e.WordArray
                , n = e.Hasher
                , o = r.algo
                , s = []
                , a = o.SHA1 = n.extend({
                _doReset: function() {
                    this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                },
                _doProcessBlock: function(t, r) {
                    for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], a = e[3], c = e[4], h = 0; h < 80; h++) {
                        if (h < 16)
                            s[h] = 0 | t[r + h];
                        else {
                            var l = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
                            s[h] = l << 1 | l >>> 31
                        }
                        var f = (i << 5 | i >>> 27) + c + s[h];
                        f += h < 20 ? (n & o | ~n & a) + 1518500249 : h < 40 ? (n ^ o ^ a) + 1859775393 : h < 60 ? (n & o | n & a | o & a) - 1894007588 : (n ^ o ^ a) - 899497514,
                            c = a,
                            a = o,
                            o = n << 30 | n >>> 2,
                            n = i,
                            i = f
                    }
                    e[0] = e[0] + i | 0,
                        e[1] = e[1] + n | 0,
                        e[2] = e[2] + o | 0,
                        e[3] = e[3] + a | 0,
                        e[4] = e[4] + c | 0
                },
                _doFinalize: function() {
                    var t = this._data
                        , r = t.words
                        , e = 8 * this._nDataBytes
                        , i = 8 * t.sigBytes;
                    return r[i >>> 5] |= 128 << 24 - i % 32,
                        r[(i + 64 >>> 9 << 4) + 14] = Math.floor(e / 4294967296),
                        r[(i + 64 >>> 9 << 4) + 15] = e,
                        t.sigBytes = 4 * r.length,
                        this._process(),
                        this._hash
                },
                clone: function() {
                    var t = n.clone.call(this);
                    return t._hash = this._hash.clone(),
                        t
                }
            });
            r.SHA1 = n._createHelper(a),
                r.HmacSHA1 = n._createHmacHelper(a)
        }(),
        function(r) {
            var e = t
                , i = e.lib
                , n = i.WordArray
                , o = i.Hasher
                , s = e.algo
                , a = []
                , c = [];
            !function() {
                function t(t) {
                    for (var e = r.sqrt(t), i = 2; i <= e; i++)
                        if (!(t % i))
                            return !1;
                    return !0
                }
                function e(t) {
                    return 4294967296 * (t - (0 | t)) | 0
                }
                for (var i = 2, n = 0; n < 64; )
                    t(i) && (n < 8 && (a[n] = e(r.pow(i, .5))),
                        c[n] = e(r.pow(i, 1 / 3)),
                        n++),
                        i++
            }();
            var h = []
                , l = s.SHA256 = o.extend({
                _doReset: function() {
                    this._hash = new n.init(a.slice(0))
                },
                _doProcessBlock: function(t, r) {
                    for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], l = e[5], f = e[6], u = e[7], d = 0; d < 64; d++) {
                        if (d < 16)
                            h[d] = 0 | t[r + d];
                        else {
                            var v = h[d - 15]
                                , p = (v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3
                                , _ = h[d - 2]
                                , y = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10;
                            h[d] = p + h[d - 7] + y + h[d - 16]
                        }
                        var g = a & l ^ ~a & f
                            , B = i & n ^ i & o ^ n & o
                            , w = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22)
                            , k = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)
                            , S = u + k + g + c[d] + h[d]
                            , m = w + B;
                        u = f,
                            f = l,
                            l = a,
                            a = s + S | 0,
                            s = o,
                            o = n,
                            n = i,
                            i = S + m | 0
                    }
                    e[0] = e[0] + i | 0,
                        e[1] = e[1] + n | 0,
                        e[2] = e[2] + o | 0,
                        e[3] = e[3] + s | 0,
                        e[4] = e[4] + a | 0,
                        e[5] = e[5] + l | 0,
                        e[6] = e[6] + f | 0,
                        e[7] = e[7] + u | 0
                },
                _doFinalize: function() {
                    var t = this._data
                        , e = t.words
                        , i = 8 * this._nDataBytes
                        , n = 8 * t.sigBytes;
                    return e[n >>> 5] |= 128 << 24 - n % 32,
                        e[(n + 64 >>> 9 << 4) + 14] = r.floor(i / 4294967296),
                        e[(n + 64 >>> 9 << 4) + 15] = i,
                        t.sigBytes = 4 * e.length,
                        this._process(),
                        this._hash
                },
                clone: function() {
                    var t = o.clone.call(this);
                    return t._hash = this._hash.clone(),
                        t
                }
            });
            e.SHA256 = o._createHelper(l),
                e.HmacSHA256 = o._createHmacHelper(l)
        }(Math),
        function() {
            function r(t) {
                return t << 8 & 4278255360 | t >>> 8 & 16711935
            }
            var e = t
                , i = e.lib
                , n = i.WordArray
                , o = e.enc;
            o.Utf16 = o.Utf16BE = {
                stringify: function(t) {
                    for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n += 2) {
                        var o = r[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                        i.push(String.fromCharCode(o))
                    }
                    return i.join("")
                },
                parse: function(t) {
                    for (var r = t.length, e = [], i = 0; i < r; i++)
                        e[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16;
                    return n.create(e, 2 * r)
                }
            };
            o.Utf16LE = {
                stringify: function(t) {
                    for (var e = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) {
                        var s = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
                        n.push(String.fromCharCode(s))
                    }
                    return n.join("")
                },
                parse: function(t) {
                    for (var e = t.length, i = [], o = 0; o < e; o++)
                        i[o >>> 1] |= r(t.charCodeAt(o) << 16 - o % 2 * 16);
                    return n.create(i, 2 * e)
                }
            }
        }(),
        function() {
            if ("function" == typeof ArrayBuffer) {
                var r = t
                    , e = r.lib
                    , i = e.WordArray
                    , n = i.init
                    , o = i.init = function(t) {
                        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)),
                        (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),
                        t instanceof Uint8Array) {
                            for (var r = t.byteLength, e = [], i = 0; i < r; i++)
                                e[i >>> 2] |= t[i] << 24 - i % 4 * 8;
                            n.call(this, e, r)
                        } else
                            n.apply(this, arguments)
                    }
                ;
                o.prototype = i
            }
        }(),
        function(r) {
            function e(t, r, e) {
                return t ^ r ^ e
            }
            function i(t, r, e) {
                return t & r | ~t & e
            }
            function n(t, r, e) {
                return (t | ~r) ^ e
            }
            function o(t, r, e) {
                return t & e | r & ~e
            }
            function s(t, r, e) {
                return t ^ (r | ~e)
            }
            function a(t, r) {
                return t << r | t >>> 32 - r
            }
            var c = t
                , h = c.lib
                , l = h.WordArray
                , f = h.Hasher
                , u = c.algo
                , d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13])
                , v = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11])
                , p = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6])
                , _ = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11])
                , y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838])
                , g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0])
                , B = u.RIPEMD160 = f.extend({
                _doReset: function() {
                    this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                },
                _doProcessBlock: function(t, r) {
                    for (var c = 0; c < 16; c++) {
                        var h = r + c
                            , l = t[h];
                        t[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                    }
                    var f, u, B, w, k, S, m, x, b, H, z = this._hash.words, A = y.words, C = g.words, D = d.words, R = v.words, E = p.words, M = _.words;
                    S = f = z[0],
                        m = u = z[1],
                        x = B = z[2],
                        b = w = z[3],
                        H = k = z[4];
                    for (var F, c = 0; c < 80; c += 1)
                        F = f + t[r + D[c]] | 0,
                            F += c < 16 ? e(u, B, w) + A[0] : c < 32 ? i(u, B, w) + A[1] : c < 48 ? n(u, B, w) + A[2] : c < 64 ? o(u, B, w) + A[3] : s(u, B, w) + A[4],
                            F |= 0,
                            F = a(F, E[c]),
                            F = F + k | 0,
                            f = k,
                            k = w,
                            w = a(B, 10),
                            B = u,
                            u = F,
                            F = S + t[r + R[c]] | 0,
                            F += c < 16 ? s(m, x, b) + C[0] : c < 32 ? o(m, x, b) + C[1] : c < 48 ? n(m, x, b) + C[2] : c < 64 ? i(m, x, b) + C[3] : e(m, x, b) + C[4],
                            F |= 0,
                            F = a(F, M[c]),
                            F = F + H | 0,
                            S = H,
                            H = b,
                            b = a(x, 10),
                            x = m,
                            m = F;
                    F = z[1] + B + b | 0,
                        z[1] = z[2] + w + H | 0,
                        z[2] = z[3] + k + S | 0,
                        z[3] = z[4] + f + m | 0,
                        z[4] = z[0] + u + x | 0,
                        z[0] = F
                },
                _doFinalize: function() {
                    var t = this._data
                        , r = t.words
                        , e = 8 * this._nDataBytes
                        , i = 8 * t.sigBytes;
                    r[i >>> 5] |= 128 << 24 - i % 32,
                        r[(i + 64 >>> 9 << 4) + 14] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8),
                        t.sigBytes = 4 * (r.length + 1),
                        this._process();
                    for (var n = this._hash, o = n.words, s = 0; s < 5; s++) {
                        var a = o[s];
                        o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                    }
                    return n
                },
                clone: function() {
                    var t = f.clone.call(this);
                    return t._hash = this._hash.clone(),
                        t
                }
            });
            c.RIPEMD160 = f._createHelper(B),
                c.HmacRIPEMD160 = f._createHmacHelper(B)
        }(Math),
        function() {
            var r = t
                , e = r.lib
                , i = e.Base
                , n = r.enc
                , o = n.Utf8
                , s = r.algo;
            s.HMAC = i.extend({
                init: function(t, r) {
                    t = this._hasher = new t.init,
                    "string" == typeof r && (r = o.parse(r));
                    var e = t.blockSize
                        , i = 4 * e;
                    r.sigBytes > i && (r = t.finalize(r)),
                        r.clamp();
                    for (var n = this._oKey = r.clone(), s = this._iKey = r.clone(), a = n.words, c = s.words, h = 0; h < e; h++)
                        a[h] ^= 1549556828,
                            c[h] ^= 909522486;
                    n.sigBytes = s.sigBytes = i,
                        this.reset()
                },
                reset: function() {
                    var t = this._hasher;
                    t.reset(),
                        t.update(this._iKey)
                },
                update: function(t) {
                    return this._hasher.update(t),
                        this
                },
                finalize: function(t) {
                    var r = this._hasher
                        , e = r.finalize(t);
                    r.reset();
                    var i = r.finalize(this._oKey.clone().concat(e));
                    return i
                }
            })
        }(),
        function() {
            var r = t
                , e = r.lib
                , i = e.Base
                , n = e.WordArray
                , o = r.algo
                , s = o.SHA1
                , a = o.HMAC
                , c = o.PBKDF2 = i.extend({
                cfg: i.extend({
                    keySize: 4,
                    hasher: s,
                    iterations: 1
                }),
                init: function(t) {
                    this.cfg = this.cfg.extend(t)
                },
                compute: function(t, r) {
                    for (var e = this.cfg, i = a.create(e.hasher, t), o = n.create(), s = n.create([1]), c = o.words, h = s.words, l = e.keySize, f = e.iterations; c.length < l; ) {
                        var u = i.update(r).finalize(s);
                        i.reset();
                        for (var d = u.words, v = d.length, p = u, _ = 1; _ < f; _++) {
                            p = i.finalize(p),
                                i.reset();
                            for (var y = p.words, g = 0; g < v; g++)
                                d[g] ^= y[g]
                        }
                        o.concat(u),
                            h[0]++
                    }
                    return o.sigBytes = 4 * l,
                        o
                }
            });
            r.PBKDF2 = function(t, r, e) {
                return c.create(e).compute(t, r)
            }
        }(),
        function() {
            var r = t
                , e = r.lib
                , i = e.Base
                , n = e.WordArray
                , o = r.algo
                , s = o.MD5
                , a = o.EvpKDF = i.extend({
                cfg: i.extend({
                    keySize: 4,
                    hasher: s,
                    iterations: 1
                }),
                init: function(t) {
                    this.cfg = this.cfg.extend(t)
                },
                compute: function(t, r) {
                    for (var e = this.cfg, i = e.hasher.create(), o = n.create(), s = o.words, a = e.keySize, c = e.iterations; s.length < a; ) {
                        h && i.update(h);
                        var h = i.update(t).finalize(r);
                        i.reset();
                        for (var l = 1; l < c; l++)
                            h = i.finalize(h),
                                i.reset();
                        o.concat(h)
                    }
                    return o.sigBytes = 4 * a,
                        o
                }
            });
            r.EvpKDF = function(t, r, e) {
                return a.create(e).compute(t, r)
            }
        }(),
        function() {
            var r = t
                , e = r.lib
                , i = e.WordArray
                , n = r.algo
                , o = n.SHA256
                , s = n.SHA224 = o.extend({
                _doReset: function() {
                    this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                },
                _doFinalize: function() {
                    var t = o._doFinalize.call(this);
                    return t.sigBytes -= 4,
                        t
                }
            });
            r.SHA224 = o._createHelper(s),
                r.HmacSHA224 = o._createHmacHelper(s)
        }(),
        function(r) {
            var e = t
                , i = e.lib
                , n = i.Base
                , o = i.WordArray
                , s = e.x64 = {};
            s.Word = n.extend({
                init: function(t, r) {
                    this.high = t,
                        this.low = r
                }
            }),
                s.WordArray = n.extend({
                    init: function(t, e) {
                        t = this.words = t || [],
                            e != r ? this.sigBytes = e : this.sigBytes = 8 * t.length
                    },
                    toX32: function() {
                        for (var t = this.words, r = t.length, e = [], i = 0; i < r; i++) {
                            var n = t[i];
                            e.push(n.high),
                                e.push(n.low)
                        }
                        return o.create(e, this.sigBytes)
                    },
                    clone: function() {
                        for (var t = n.clone.call(this), r = t.words = this.words.slice(0), e = r.length, i = 0; i < e; i++)
                            r[i] = r[i].clone();
                        return t
                    }
                })
        }(),
        function(r) {
            var e = t
                , i = e.lib
                , n = i.WordArray
                , o = i.Hasher
                , s = e.x64
                , a = s.Word
                , c = e.algo
                , h = []
                , l = []
                , f = [];
            !function() {
                for (var t = 1, r = 0, e = 0; e < 24; e++) {
                    h[t + 5 * r] = (e + 1) * (e + 2) / 2 % 64;
                    var i = r % 5
                        , n = (2 * t + 3 * r) % 5;
                    t = i,
                        r = n
                }
                for (var t = 0; t < 5; t++)
                    for (var r = 0; r < 5; r++)
                        l[t + 5 * r] = r + (2 * t + 3 * r) % 5 * 5;
                for (var o = 1, s = 0; s < 24; s++) {
                    for (var c = 0, u = 0, d = 0; d < 7; d++) {
                        if (1 & o) {
                            var v = (1 << d) - 1;
                            v < 32 ? u ^= 1 << v : c ^= 1 << v - 32
                        }
                        128 & o ? o = o << 1 ^ 113 : o <<= 1
                    }
                    f[s] = a.create(c, u)
                }
            }();
            var u = [];
            !function() {
                for (var t = 0; t < 25; t++)
                    u[t] = a.create()
            }();
            var d = c.SHA3 = o.extend({
                cfg: o.cfg.extend({
                    outputLength: 512
                }),
                _doReset: function() {
                    for (var t = this._state = [], r = 0; r < 25; r++)
                        t[r] = new a.init;
                    this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                },
                _doProcessBlock: function(t, r) {
                    for (var e = this._state, i = this.blockSize / 2, n = 0; n < i; n++) {
                        var o = t[r + 2 * n]
                            , s = t[r + 2 * n + 1];
                        o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                            s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
                        var a = e[n];
                        a.high ^= s,
                            a.low ^= o
                    }
                    for (var c = 0; c < 24; c++) {
                        for (var d = 0; d < 5; d++) {
                            for (var v = 0, p = 0, _ = 0; _ < 5; _++) {
                                var a = e[d + 5 * _];
                                v ^= a.high,
                                    p ^= a.low
                            }
                            var y = u[d];
                            y.high = v,
                                y.low = p
                        }
                        for (var d = 0; d < 5; d++)
                            for (var g = u[(d + 4) % 5], B = u[(d + 1) % 5], w = B.high, k = B.low, v = g.high ^ (w << 1 | k >>> 31), p = g.low ^ (k << 1 | w >>> 31), _ = 0; _ < 5; _++) {
                                var a = e[d + 5 * _];
                                a.high ^= v,
                                    a.low ^= p
                            }
                        for (var S = 1; S < 25; S++) {
                            var a = e[S]
                                , m = a.high
                                , x = a.low
                                , b = h[S];
                            if (b < 32)
                                var v = m << b | x >>> 32 - b
                                    , p = x << b | m >>> 32 - b;
                            else
                                var v = x << b - 32 | m >>> 64 - b
                                    , p = m << b - 32 | x >>> 64 - b;
                            var H = u[l[S]];
                            H.high = v,
                                H.low = p
                        }
                        var z = u[0]
                            , A = e[0];
                        z.high = A.high,
                            z.low = A.low;
                        for (var d = 0; d < 5; d++)
                            for (var _ = 0; _ < 5; _++) {
                                var S = d + 5 * _
                                    , a = e[S]
                                    , C = u[S]
                                    , D = u[(d + 1) % 5 + 5 * _]
                                    , R = u[(d + 2) % 5 + 5 * _];
                                a.high = C.high ^ ~D.high & R.high,
                                    a.low = C.low ^ ~D.low & R.low
                            }
                        var a = e[0]
                            , E = f[c];
                        a.high ^= E.high,
                            a.low ^= E.low
                    }
                },
                _doFinalize: function() {
                    var t = this._data
                        , e = t.words
                        , i = (8 * this._nDataBytes,
                    8 * t.sigBytes)
                        , o = 32 * this.blockSize;
                    e[i >>> 5] |= 1 << 24 - i % 32,
                        e[(r.ceil((i + 1) / o) * o >>> 5) - 1] |= 128,
                        t.sigBytes = 4 * e.length,
                        this._process();
                    for (var s = this._state, a = this.cfg.outputLength / 8, c = a / 8, h = [], l = 0; l < c; l++) {
                        var f = s[l]
                            , u = f.high
                            , d = f.low;
                        u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8),
                            d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8),
                            h.push(d),
                            h.push(u)
                    }
                    return new n.init(h,a)
                },
                clone: function() {
                    for (var t = o.clone.call(this), r = t._state = this._state.slice(0), e = 0; e < 25; e++)
                        r[e] = r[e].clone();
                    return t
                }
            });
            e.SHA3 = o._createHelper(d),
                e.HmacSHA3 = o._createHmacHelper(d)
        }(Math),
        function() {
            function r() {
                return s.create.apply(s, arguments)
            }
            var e = t
                , i = e.lib
                , n = i.Hasher
                , o = e.x64
                , s = o.Word
                , a = o.WordArray
                , c = e.algo
                , h = [r(1116352408, 3609767458), r(1899447441, 602891725), r(3049323471, 3964484399), r(3921009573, 2173295548), r(961987163, 4081628472), r(1508970993, 3053834265), r(2453635748, 2937671579), r(2870763221, 3664609560), r(3624381080, 2734883394), r(310598401, 1164996542), r(607225278, 1323610764), r(1426881987, 3590304994), r(1925078388, 4068182383), r(2162078206, 991336113), r(2614888103, 633803317), r(3248222580, 3479774868), r(3835390401, 2666613458), r(4022224774, 944711139), r(264347078, 2341262773), r(604807628, 2007800933), r(770255983, 1495990901), r(1249150122, 1856431235), r(1555081692, 3175218132), r(1996064986, 2198950837), r(2554220882, 3999719339), r(2821834349, 766784016), r(2952996808, 2566594879), r(3210313671, 3203337956), r(3336571891, 1034457026), r(3584528711, 2466948901), r(113926993, 3758326383), r(338241895, 168717936), r(666307205, 1188179964), r(773529912, 1546045734), r(1294757372, 1522805485), r(1396182291, 2643833823), r(1695183700, 2343527390), r(1986661051, 1014477480), r(2177026350, 1206759142), r(2456956037, 344077627), r(2730485921, 1290863460), r(2820302411, 3158454273), r(3259730800, 3505952657), r(3345764771, 106217008), r(3516065817, 3606008344), r(3600352804, 1432725776), r(4094571909, 1467031594), r(275423344, 851169720), r(430227734, 3100823752), r(506948616, 1363258195), r(659060556, 3750685593), r(883997877, 3785050280), r(958139571, 3318307427), r(1322822218, 3812723403), r(1537002063, 2003034995), r(1747873779, 3602036899), r(1955562222, 1575990012), r(2024104815, 1125592928), r(2227730452, 2716904306), r(2361852424, 442776044), r(2428436474, 593698344), r(2756734187, 3733110249), r(3204031479, 2999351573), r(3329325298, 3815920427), r(3391569614, 3928383900), r(3515267271, 566280711), r(3940187606, 3454069534), r(4118630271, 4000239992), r(116418474, 1914138554), r(174292421, 2731055270), r(289380356, 3203993006), r(460393269, 320620315), r(685471733, 587496836), r(852142971, 1086792851), r(1017036298, 365543100), r(1126000580, 2618297676), r(1288033470, 3409855158), r(1501505948, 4234509866), r(1607167915, 987167468), r(1816402316, 1246189591)]
                , l = [];
            !function() {
                for (var t = 0; t < 80; t++)
                    l[t] = r()
            }();
            var f = c.SHA512 = n.extend({
                _doReset: function() {
                    this._hash = new a.init([new s.init(1779033703,4089235720), new s.init(3144134277,2227873595), new s.init(1013904242,4271175723), new s.init(2773480762,1595750129), new s.init(1359893119,2917565137), new s.init(2600822924,725511199), new s.init(528734635,4215389547), new s.init(1541459225,327033209)])
                },
                _doProcessBlock: function(t, r) {
                    for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], c = e[5], f = e[6], u = e[7], d = i.high, v = i.low, p = n.high, _ = n.low, y = o.high, g = o.low, B = s.high, w = s.low, k = a.high, S = a.low, m = c.high, x = c.low, b = f.high, H = f.low, z = u.high, A = u.low, C = d, D = v, R = p, E = _, M = y, F = g, P = B, W = w, O = k, U = S, I = m, K = x, X = b, L = H, j = z, N = A, T = 0; T < 80; T++) {
                        var Z = l[T];
                        if (T < 16)
                            var q = Z.high = 0 | t[r + 2 * T]
                                , G = Z.low = 0 | t[r + 2 * T + 1];
                        else {
                            var J = l[T - 15]
                                , $ = J.high
                                , Q = J.low
                                , V = ($ >>> 1 | Q << 31) ^ ($ >>> 8 | Q << 24) ^ $ >>> 7
                                , Y = (Q >>> 1 | $ << 31) ^ (Q >>> 8 | $ << 24) ^ (Q >>> 7 | $ << 25)
                                , tt = l[T - 2]
                                , rt = tt.high
                                , et = tt.low
                                , it = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ rt >>> 6
                                , nt = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ (et >>> 6 | rt << 26)
                                , ot = l[T - 7]
                                , st = ot.high
                                , at = ot.low
                                , ct = l[T - 16]
                                , ht = ct.high
                                , lt = ct.low
                                , G = Y + at
                                , q = V + st + (G >>> 0 < Y >>> 0 ? 1 : 0)
                                , G = G + nt
                                , q = q + it + (G >>> 0 < nt >>> 0 ? 1 : 0)
                                , G = G + lt
                                , q = q + ht + (G >>> 0 < lt >>> 0 ? 1 : 0);
                            Z.high = q,
                                Z.low = G
                        }
                        var ft = O & I ^ ~O & X
                            , ut = U & K ^ ~U & L
                            , dt = C & R ^ C & M ^ R & M
                            , vt = D & E ^ D & F ^ E & F
                            , pt = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7)
                            , _t = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7)
                            , yt = (O >>> 14 | U << 18) ^ (O >>> 18 | U << 14) ^ (O << 23 | U >>> 9)
                            , gt = (U >>> 14 | O << 18) ^ (U >>> 18 | O << 14) ^ (U << 23 | O >>> 9)
                            , Bt = h[T]
                            , wt = Bt.high
                            , kt = Bt.low
                            , St = N + gt
                            , mt = j + yt + (St >>> 0 < N >>> 0 ? 1 : 0)
                            , St = St + ut
                            , mt = mt + ft + (St >>> 0 < ut >>> 0 ? 1 : 0)
                            , St = St + kt
                            , mt = mt + wt + (St >>> 0 < kt >>> 0 ? 1 : 0)
                            , St = St + G
                            , mt = mt + q + (St >>> 0 < G >>> 0 ? 1 : 0)
                            , xt = _t + vt
                            , bt = pt + dt + (xt >>> 0 < _t >>> 0 ? 1 : 0);
                        j = X,
                            N = L,
                            X = I,
                            L = K,
                            I = O,
                            K = U,
                            U = W + St | 0,
                            O = P + mt + (U >>> 0 < W >>> 0 ? 1 : 0) | 0,
                            P = M,
                            W = F,
                            M = R,
                            F = E,
                            R = C,
                            E = D,
                            D = St + xt | 0,
                            C = mt + bt + (D >>> 0 < St >>> 0 ? 1 : 0) | 0
                    }
                    v = i.low = v + D,
                        i.high = d + C + (v >>> 0 < D >>> 0 ? 1 : 0),
                        _ = n.low = _ + E,
                        n.high = p + R + (_ >>> 0 < E >>> 0 ? 1 : 0),
                        g = o.low = g + F,
                        o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0),
                        w = s.low = w + W,
                        s.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0),
                        S = a.low = S + U,
                        a.high = k + O + (S >>> 0 < U >>> 0 ? 1 : 0),
                        x = c.low = x + K,
                        c.high = m + I + (x >>> 0 < K >>> 0 ? 1 : 0),
                        H = f.low = H + L,
                        f.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0),
                        A = u.low = A + N,
                        u.high = z + j + (A >>> 0 < N >>> 0 ? 1 : 0)
                },
                _doFinalize: function() {
                    var t = this._data
                        , r = t.words
                        , e = 8 * this._nDataBytes
                        , i = 8 * t.sigBytes;
                    r[i >>> 5] |= 128 << 24 - i % 32,
                        r[(i + 128 >>> 10 << 5) + 30] = Math.floor(e / 4294967296),
                        r[(i + 128 >>> 10 << 5) + 31] = e,
                        t.sigBytes = 4 * r.length,
                        this._process();
                    var n = this._hash.toX32();
                    return n
                },
                clone: function() {
                    var t = n.clone.call(this);
                    return t._hash = this._hash.clone(),
                        t
                },
                blockSize: 32
            });
            e.SHA512 = n._createHelper(f),
                e.HmacSHA512 = n._createHmacHelper(f)
        }(),
        function() {
            var r = t
                , e = r.x64
                , i = e.Word
                , n = e.WordArray
                , o = r.algo
                , s = o.SHA512
                , a = o.SHA384 = s.extend({
                _doReset: function() {
                    this._hash = new n.init([new i.init(3418070365,3238371032), new i.init(1654270250,914150663), new i.init(2438529370,812702999), new i.init(355462360,4144912697), new i.init(1731405415,4290775857), new i.init(2394180231,1750603025), new i.init(3675008525,1694076839), new i.init(1203062813,3204075428)])
                },
                _doFinalize: function() {
                    var t = s._doFinalize.call(this);
                    return t.sigBytes -= 16,
                        t
                }
            });
            r.SHA384 = s._createHelper(a),
                r.HmacSHA384 = s._createHmacHelper(a)
        }(),
    t.lib.Cipher || function(r) {
        var e = t
            , i = e.lib
            , n = i.Base
            , o = i.WordArray
            , s = i.BufferedBlockAlgorithm
            , a = e.enc
            , c = (a.Utf8,
            a.Base64)
            , h = e.algo
            , l = h.EvpKDF
            , f = i.Cipher = s.extend({
            cfg: n.extend(),
            createEncryptor: function(t, r) {
                return this.create(this._ENC_XFORM_MODE, t, r)
            },
            createDecryptor: function(t, r) {
                return this.create(this._DEC_XFORM_MODE, t, r)
            },
            init: function(t, r, e) {
                this.cfg = this.cfg.extend(e),
                    this._xformMode = t,
                    this._key = r,
                    this.reset()
            },
            reset: function() {
                s.reset.call(this),
                    this._doReset()
            },
            process: function(t) {
                return this._append(t),
                    this._process()
            },
            finalize: function(t) {
                t && this._append(t);
                var r = this._doFinalize();
                return r
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function() {
                function t(t) {
                    return "string" == typeof t ? m : w
                }
                return function(r) {
                    return {
                        encrypt: function(e, i, n) {
                            return t(i).encrypt(r, e, i, n)
                        },
                        decrypt: function(e, i, n) {
                            return t(i).decrypt(r, e, i, n)
                        }
                    }
                }
            }()
        })
            , u = (i.StreamCipher = f.extend({
            _doFinalize: function() {
                var t = this._process(!0);
                return t
            },
            blockSize: 1
        }),
            e.mode = {})
            , d = i.BlockCipherMode = n.extend({
            createEncryptor: function(t, r) {
                return this.Encryptor.create(t, r)
            },
            createDecryptor: function(t, r) {
                return this.Decryptor.create(t, r)
            },
            init: function(t, r) {
                this._cipher = t,
                    this._iv = r
            }
        })
            , v = u.CBC = function() {
            function t(t, e, i) {
                var n = this._iv;
                if (n) {
                    var o = n;
                    this._iv = r
                } else
                    var o = this._prevBlock;
                for (var s = 0; s < i; s++)
                    t[e + s] ^= o[s]
            }
            var e = d.extend();
            return e.Encryptor = e.extend({
                processBlock: function(r, e) {
                    var i = this._cipher
                        , n = i.blockSize;
                    t.call(this, r, e, n),
                        i.encryptBlock(r, e),
                        this._prevBlock = r.slice(e, e + n)
                }
            }),
                e.Decryptor = e.extend({
                    processBlock: function(r, e) {
                        var i = this._cipher
                            , n = i.blockSize
                            , o = r.slice(e, e + n);
                        i.decryptBlock(r, e),
                            t.call(this, r, e, n),
                            this._prevBlock = o
                    }
                }),
                e
        }()
            , p = e.pad = {}
            , _ = p.Pkcs7 = {
            pad: function(t, r) {
                for (var e = 4 * r, i = e - t.sigBytes % e, n = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4)
                    s.push(n);
                var c = o.create(s, i);
                t.concat(c)
            },
            unpad: function(t) {
                var r = 255 & t.words[t.sigBytes - 1 >>> 2];
                t.sigBytes -= r
            }
        }
            , y = (i.BlockCipher = f.extend({
            cfg: f.cfg.extend({
                mode: v,
                padding: _
            }),
            reset: function() {
                f.reset.call(this);
                var t = this.cfg
                    , r = t.iv
                    , e = t.mode;
                if (this._xformMode == this._ENC_XFORM_MODE)
                    var i = e.createEncryptor;
                else {
                    var i = e.createDecryptor;
                    this._minBufferSize = 1
                }
                this._mode && this._mode.__creator == i ? this._mode.init(this, r && r.words) : (this._mode = i.call(e, this, r && r.words),
                    this._mode.__creator = i)
            },
            _doProcessBlock: function(t, r) {
                this._mode.processBlock(t, r)
            },
            _doFinalize: function() {
                var t = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    t.pad(this._data, this.blockSize);
                    var r = this._process(!0)
                } else {
                    var r = this._process(!0);
                    t.unpad(r)
                }
                return r
            },
            blockSize: 4
        }),
            i.CipherParams = n.extend({
                init: function(t) {
                    this.mixIn(t)
                },
                toString: function(t) {
                    return (t || this.formatter).stringify(this)
                }
            }))
            , g = e.format = {}
            , B = g.OpenSSL = {
            stringify: function(t) {
                var r = t.ciphertext
                    , e = t.salt;
                if (e)
                    var i = o.create([1398893684, 1701076831]).concat(e).concat(r);
                else
                    var i = r;
                return i.toString(c)
            },
            parse: function(t) {
                var r = c.parse(t)
                    , e = r.words;
                if (1398893684 == e[0] && 1701076831 == e[1]) {
                    var i = o.create(e.slice(2, 4));
                    e.splice(0, 4),
                        r.sigBytes -= 16
                }
                return y.create({
                    ciphertext: r,
                    salt: i
                })
            }
        }
            , w = i.SerializableCipher = n.extend({
            cfg: n.extend({
                format: B
            }),
            encrypt: function(t, r, e, i) {
                i = this.cfg.extend(i);
                var n = t.createEncryptor(e, i)
                    , o = n.finalize(r)
                    , s = n.cfg;
                return y.create({
                    ciphertext: o,
                    key: e,
                    iv: s.iv,
                    algorithm: t,
                    mode: s.mode,
                    padding: s.padding,
                    blockSize: t.blockSize,
                    formatter: i.format
                })
            },
            decrypt: function(t, r, e, i) {
                i = this.cfg.extend(i),
                    r = this._parse(r, i.format);
                var n = t.createDecryptor(e, i).finalize(r.ciphertext);
                return n
            },
            _parse: function(t, r) {
                return "string" == typeof t ? r.parse(t, this) : t
            }
        })
            , k = e.kdf = {}
            , S = k.OpenSSL = {
            execute: function(t, r, e, i) {
                i || (i = o.random(8));
                var n = l.create({
                    keySize: r + e
                }).compute(t, i)
                    , s = o.create(n.words.slice(r), 4 * e);
                return n.sigBytes = 4 * r,
                    y.create({
                        key: n,
                        iv: s,
                        salt: i
                    })
            }
        }
            , m = i.PasswordBasedCipher = w.extend({
            cfg: w.cfg.extend({
                kdf: S
            }),
            encrypt: function(t, r, e, i) {
                i = this.cfg.extend(i);
                var n = i.kdf.execute(e, t.keySize, t.ivSize);
                i.iv = n.iv;
                var o = w.encrypt.call(this, t, r, n.key, i);
                return o.mixIn(n),
                    o
            },
            decrypt: function(t, r, e, i) {
                i = this.cfg.extend(i),
                    r = this._parse(r, i.format);
                var n = i.kdf.execute(e, t.keySize, t.ivSize, r.salt);
                i.iv = n.iv;
                var o = w.decrypt.call(this, t, r, n.key, i);
                return o
            }
        })
    }(),
        t.mode.CFB = function() {
            function r(t, r, e, i) {
                var n = this._iv;
                if (n) {
                    var o = n.slice(0);
                    this._iv = void 0
                } else
                    var o = this._prevBlock;
                i.encryptBlock(o, 0);
                for (var s = 0; s < e; s++)
                    t[r + s] ^= o[s]
            }
            var e = t.lib.BlockCipherMode.extend();
            return e.Encryptor = e.extend({
                processBlock: function(t, e) {
                    var i = this._cipher
                        , n = i.blockSize;
                    r.call(this, t, e, n, i),
                        this._prevBlock = t.slice(e, e + n)
                }
            }),
                e.Decryptor = e.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher
                            , n = i.blockSize
                            , o = t.slice(e, e + n);
                        r.call(this, t, e, n, i),
                            this._prevBlock = o
                    }
                }),
                e
        }(),
        t.mode.ECB = function() {
            var r = t.lib.BlockCipherMode.extend();
            return r.Encryptor = r.extend({
                processBlock: function(t, r) {
                    this._cipher.encryptBlock(t, r)
                }
            }),
                r.Decryptor = r.extend({
                    processBlock: function(t, r) {
                        this._cipher.decryptBlock(t, r)
                    }
                }),
                r
        }(),
        t.pad.AnsiX923 = {
            pad: function(t, r) {
                var e = t.sigBytes
                    , i = 4 * r
                    , n = i - e % i
                    , o = e + n - 1;
                t.clamp(),
                    t.words[o >>> 2] |= n << 24 - o % 4 * 8,
                    t.sigBytes += n
            },
            unpad: function(t) {
                var r = 255 & t.words[t.sigBytes - 1 >>> 2];
                t.sigBytes -= r
            }
        },
        t.pad.Iso10126 = {
            pad: function(r, e) {
                var i = 4 * e
                    , n = i - r.sigBytes % i;
                r.concat(t.lib.WordArray.random(n - 1)).concat(t.lib.WordArray.create([n << 24], 1))
            },
            unpad: function(t) {
                var r = 255 & t.words[t.sigBytes - 1 >>> 2];
                t.sigBytes -= r
            }
        },
        t.pad.Iso97971 = {
            pad: function(r, e) {
                r.concat(t.lib.WordArray.create([2147483648], 1)),
                    t.pad.ZeroPadding.pad(r, e)
            },
            unpad: function(r) {
                t.pad.ZeroPadding.unpad(r),
                    r.sigBytes--
            }
        },
        t.mode.OFB = function() {
            var r = t.lib.BlockCipherMode.extend()
                , e = r.Encryptor = r.extend({
                processBlock: function(t, r) {
                    var e = this._cipher
                        , i = e.blockSize
                        , n = this._iv
                        , o = this._keystream;
                    n && (o = this._keystream = n.slice(0),
                        this._iv = void 0),
                        e.encryptBlock(o, 0);
                    for (var s = 0; s < i; s++)
                        t[r + s] ^= o[s]
                }
            });
            return r.Decryptor = e,
                r
        }(),
        t.pad.NoPadding = {
            pad: function() {},
            unpad: function() {}
        },
        function(r) {
            var e = t
                , i = e.lib
                , n = i.CipherParams
                , o = e.enc
                , s = o.Hex
                , a = e.format;
            a.Hex = {
                stringify: function(t) {
                    return t.ciphertext.toString(s)
                },
                parse: function(t) {
                    var r = s.parse(t);
                    return n.create({
                        ciphertext: r
                    })
                }
            }
        }(),
        function() {
            var r = t
                , e = r.lib
                , i = e.BlockCipher
                , n = r.algo
                , o = []
                , s = []
                , a = []
                , c = []
                , h = []
                , l = []
                , f = []
                , u = []
                , d = []
                , v = [];
            !function() {
                for (var t = [], r = 0; r < 256; r++)
                    r < 128 ? t[r] = r << 1 : t[r] = r << 1 ^ 283;
                for (var e = 0, i = 0, r = 0; r < 256; r++) {
                    var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
                    n = n >>> 8 ^ 255 & n ^ 99,
                        o[e] = n,
                        s[n] = e;
                    var p = t[e]
                        , _ = t[p]
                        , y = t[_]
                        , g = 257 * t[n] ^ 16843008 * n;
                    a[e] = g << 24 | g >>> 8,
                        c[e] = g << 16 | g >>> 16,
                        h[e] = g << 8 | g >>> 24,
                        l[e] = g;
                    var g = 16843009 * y ^ 65537 * _ ^ 257 * p ^ 16843008 * e;
                    f[n] = g << 24 | g >>> 8,
                        u[n] = g << 16 | g >>> 16,
                        d[n] = g << 8 | g >>> 24,
                        v[n] = g,
                        e ? (e = p ^ t[t[t[y ^ p]]],
                            i ^= t[t[i]]) : e = i = 1
                }
            }();
            var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
                , _ = n.AES = i.extend({
                _doReset: function() {
                    if (!this._nRounds || this._keyPriorReset !== this._key) {
                        for (var t = this._keyPriorReset = this._key, r = t.words, e = t.sigBytes / 4, i = this._nRounds = e + 6, n = 4 * (i + 1), s = this._keySchedule = [], a = 0; a < n; a++)
                            if (a < e)
                                s[a] = r[a];
                            else {
                                var c = s[a - 1];
                                a % e ? e > 6 && a % e == 4 && (c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c]) : (c = c << 8 | c >>> 24,
                                    c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c],
                                    c ^= p[a / e | 0] << 24),
                                    s[a] = s[a - e] ^ c
                            }
                        for (var h = this._invKeySchedule = [], l = 0; l < n; l++) {
                            var a = n - l;
                            if (l % 4)
                                var c = s[a];
                            else
                                var c = s[a - 4];
                            l < 4 || a <= 4 ? h[l] = c : h[l] = f[o[c >>> 24]] ^ u[o[c >>> 16 & 255]] ^ d[o[c >>> 8 & 255]] ^ v[o[255 & c]]
                        }
                    }
                },
                encryptBlock: function(t, r) {
                    this._doCryptBlock(t, r, this._keySchedule, a, c, h, l, o)
                },
                decryptBlock: function(t, r) {
                    var e = t[r + 1];
                    t[r + 1] = t[r + 3],
                        t[r + 3] = e,
                        this._doCryptBlock(t, r, this._invKeySchedule, f, u, d, v, s);
                    var e = t[r + 1];
                    t[r + 1] = t[r + 3],
                        t[r + 3] = e
                },
                _doCryptBlock: function(t, r, e, i, n, o, s, a) {
                    for (var c = this._nRounds, h = t[r] ^ e[0], l = t[r + 1] ^ e[1], f = t[r + 2] ^ e[2], u = t[r + 3] ^ e[3], d = 4, v = 1; v < c; v++) {
                        var p = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ e[d++]
                            , _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ e[d++]
                            , y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ e[d++]
                            , g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ e[d++];
                        h = p,
                            l = _,
                            f = y,
                            u = g
                    }
                    var p = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ e[d++]
                        , _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ e[d++]
                        , y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ e[d++]
                        , g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ e[d++];
                    t[r] = p,
                        t[r + 1] = _,
                        t[r + 2] = y,
                        t[r + 3] = g
                },
                keySize: 8
            });
            r.AES = i._createHelper(_)
        }(),
        function() {
            function r(t, r) {
                var e = (this._lBlock >>> t ^ this._rBlock) & r;
                this._rBlock ^= e,
                    this._lBlock ^= e << t
            }
            function e(t, r) {
                var e = (this._rBlock >>> t ^ this._lBlock) & r;
                this._lBlock ^= e,
                    this._rBlock ^= e << t;
            }
            var i = t
                , n = i.lib
                , o = n.WordArray
                , s = n.BlockCipher
                , a = i.algo
                , c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]
                , h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]
                , l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28]
                , f = [{
                0: 8421888,
                268435456: 32768,
                536870912: 8421378,
                805306368: 2,
                1073741824: 512,
                1342177280: 8421890,
                1610612736: 8389122,
                1879048192: 8388608,
                2147483648: 514,
                2415919104: 8389120,
                2684354560: 33280,
                2952790016: 8421376,
                3221225472: 32770,
                3489660928: 8388610,
                3758096384: 0,
                4026531840: 33282,
                134217728: 0,
                402653184: 8421890,
                671088640: 33282,
                939524096: 32768,
                1207959552: 8421888,
                1476395008: 512,
                1744830464: 8421378,
                2013265920: 2,
                2281701376: 8389120,
                2550136832: 33280,
                2818572288: 8421376,
                3087007744: 8389122,
                3355443200: 8388610,
                3623878656: 32770,
                3892314112: 514,
                4160749568: 8388608,
                1: 32768,
                268435457: 2,
                536870913: 8421888,
                805306369: 8388608,
                1073741825: 8421378,
                1342177281: 33280,
                1610612737: 512,
                1879048193: 8389122,
                2147483649: 8421890,
                2415919105: 8421376,
                2684354561: 8388610,
                2952790017: 33282,
                3221225473: 514,
                3489660929: 8389120,
                3758096385: 32770,
                4026531841: 0,
                134217729: 8421890,
                402653185: 8421376,
                671088641: 8388608,
                939524097: 512,
                1207959553: 32768,
                1476395009: 8388610,
                1744830465: 2,
                2013265921: 33282,
                2281701377: 32770,
                2550136833: 8389122,
                2818572289: 514,
                3087007745: 8421888,
                3355443201: 8389120,
                3623878657: 0,
                3892314113: 33280,
                4160749569: 8421378
            }, {
                0: 1074282512,
                16777216: 16384,
                33554432: 524288,
                50331648: 1074266128,
                67108864: 1073741840,
                83886080: 1074282496,
                100663296: 1073758208,
                117440512: 16,
                134217728: 540672,
                150994944: 1073758224,
                167772160: 1073741824,
                184549376: 540688,
                201326592: 524304,
                218103808: 0,
                234881024: 16400,
                251658240: 1074266112,
                8388608: 1073758208,
                25165824: 540688,
                41943040: 16,
                58720256: 1073758224,
                75497472: 1074282512,
                92274688: 1073741824,
                109051904: 524288,
                125829120: 1074266128,
                142606336: 524304,
                159383552: 0,
                176160768: 16384,
                192937984: 1074266112,
                209715200: 1073741840,
                226492416: 540672,
                243269632: 1074282496,
                260046848: 16400,
                268435456: 0,
                285212672: 1074266128,
                301989888: 1073758224,
                318767104: 1074282496,
                335544320: 1074266112,
                352321536: 16,
                369098752: 540688,
                385875968: 16384,
                402653184: 16400,
                419430400: 524288,
                436207616: 524304,
                452984832: 1073741840,
                469762048: 540672,
                486539264: 1073758208,
                503316480: 1073741824,
                520093696: 1074282512,
                276824064: 540688,
                293601280: 524288,
                310378496: 1074266112,
                327155712: 16384,
                343932928: 1073758208,
                360710144: 1074282512,
                377487360: 16,
                394264576: 1073741824,
                411041792: 1074282496,
                427819008: 1073741840,
                444596224: 1073758224,
                461373440: 524304,
                478150656: 0,
                494927872: 16400,
                511705088: 1074266128,
                528482304: 540672
            }, {
                0: 260,
                1048576: 0,
                2097152: 67109120,
                3145728: 65796,
                4194304: 65540,
                5242880: 67108868,
                6291456: 67174660,
                7340032: 67174400,
                8388608: 67108864,
                9437184: 67174656,
                10485760: 65792,
                11534336: 67174404,
                12582912: 67109124,
                13631488: 65536,
                14680064: 4,
                15728640: 256,
                524288: 67174656,
                1572864: 67174404,
                2621440: 0,
                3670016: 67109120,
                4718592: 67108868,
                5767168: 65536,
                6815744: 65540,
                7864320: 260,
                8912896: 4,
                9961472: 256,
                11010048: 67174400,
                12058624: 65796,
                13107200: 65792,
                14155776: 67109124,
                15204352: 67174660,
                16252928: 67108864,
                16777216: 67174656,
                17825792: 65540,
                18874368: 65536,
                19922944: 67109120,
                20971520: 256,
                22020096: 67174660,
                23068672: 67108868,
                24117248: 0,
                25165824: 67109124,
                26214400: 67108864,
                27262976: 4,
                28311552: 65792,
                29360128: 67174400,
                30408704: 260,
                31457280: 65796,
                32505856: 67174404,
                17301504: 67108864,
                18350080: 260,
                19398656: 67174656,
                20447232: 0,
                21495808: 65540,
                22544384: 67109120,
                23592960: 256,
                24641536: 67174404,
                25690112: 65536,
                26738688: 67174660,
                27787264: 65796,
                28835840: 67108868,
                29884416: 67109124,
                30932992: 67174400,
                31981568: 4,
                33030144: 65792
            }, {
                0: 2151682048,
                65536: 2147487808,
                131072: 4198464,
                196608: 2151677952,
                262144: 0,
                327680: 4198400,
                393216: 2147483712,
                458752: 4194368,
                524288: 2147483648,
                589824: 4194304,
                655360: 64,
                720896: 2147487744,
                786432: 2151678016,
                851968: 4160,
                917504: 4096,
                983040: 2151682112,
                32768: 2147487808,
                98304: 64,
                163840: 2151678016,
                229376: 2147487744,
                294912: 4198400,
                360448: 2151682112,
                425984: 0,
                491520: 2151677952,
                557056: 4096,
                622592: 2151682048,
                688128: 4194304,
                753664: 4160,
                819200: 2147483648,
                884736: 4194368,
                950272: 4198464,
                1015808: 2147483712,
                1048576: 4194368,
                1114112: 4198400,
                1179648: 2147483712,
                1245184: 0,
                1310720: 4160,
                1376256: 2151678016,
                1441792: 2151682048,
                1507328: 2147487808,
                1572864: 2151682112,
                1638400: 2147483648,
                1703936: 2151677952,
                1769472: 4198464,
                1835008: 2147487744,
                1900544: 4194304,
                1966080: 64,
                2031616: 4096,
                1081344: 2151677952,
                1146880: 2151682112,
                1212416: 0,
                1277952: 4198400,
                1343488: 4194368,
                1409024: 2147483648,
                1474560: 2147487808,
                1540096: 64,
                1605632: 2147483712,
                1671168: 4096,
                1736704: 2147487744,
                1802240: 2151678016,
                1867776: 4160,
                1933312: 2151682048,
                1998848: 4194304,
                2064384: 4198464
            }, {
                0: 128,
                4096: 17039360,
                8192: 262144,
                12288: 536870912,
                16384: 537133184,
                20480: 16777344,
                24576: 553648256,
                28672: 262272,
                32768: 16777216,
                36864: 537133056,
                40960: 536871040,
                45056: 553910400,
                49152: 553910272,
                53248: 0,
                57344: 17039488,
                61440: 553648128,
                2048: 17039488,
                6144: 553648256,
                10240: 128,
                14336: 17039360,
                18432: 262144,
                22528: 537133184,
                26624: 553910272,
                30720: 536870912,
                34816: 537133056,
                38912: 0,
                43008: 553910400,
                47104: 16777344,
                51200: 536871040,
                55296: 553648128,
                59392: 16777216,
                63488: 262272,
                65536: 262144,
                69632: 128,
                73728: 536870912,
                77824: 553648256,
                81920: 16777344,
                86016: 553910272,
                90112: 537133184,
                94208: 16777216,
                98304: 553910400,
                102400: 553648128,
                106496: 17039360,
                110592: 537133056,
                114688: 262272,
                118784: 536871040,
                122880: 0,
                126976: 17039488,
                67584: 553648256,
                71680: 16777216,
                75776: 17039360,
                79872: 537133184,
                83968: 536870912,
                88064: 17039488,
                92160: 128,
                96256: 553910272,
                100352: 262272,
                104448: 553910400,
                108544: 0,
                112640: 553648128,
                116736: 16777344,
                120832: 262144,
                124928: 537133056,
                129024: 536871040
            }, {
                0: 268435464,
                256: 8192,
                512: 270532608,
                768: 270540808,
                1024: 268443648,
                1280: 2097152,
                1536: 2097160,
                1792: 268435456,
                2048: 0,
                2304: 268443656,
                2560: 2105344,
                2816: 8,
                3072: 270532616,
                3328: 2105352,
                3584: 8200,
                3840: 270540800,
                128: 270532608,
                384: 270540808,
                640: 8,
                896: 2097152,
                1152: 2105352,
                1408: 268435464,
                1664: 268443648,
                1920: 8200,
                2176: 2097160,
                2432: 8192,
                2688: 268443656,
                2944: 270532616,
                3200: 0,
                3456: 270540800,
                3712: 2105344,
                3968: 268435456,
                4096: 268443648,
                4352: 270532616,
                4608: 270540808,
                4864: 8200,
                5120: 2097152,
                5376: 268435456,
                5632: 268435464,
                5888: 2105344,
                6144: 2105352,
                6400: 0,
                6656: 8,
                6912: 270532608,
                7168: 8192,
                7424: 268443656,
                7680: 270540800,
                7936: 2097160,
                4224: 8,
                4480: 2105344,
                4736: 2097152,
                4992: 268435464,
                5248: 268443648,
                5504: 8200,
                5760: 270540808,
                6016: 270532608,
                6272: 270540800,
                6528: 270532616,
                6784: 8192,
                7040: 2105352,
                7296: 2097160,
                7552: 0,
                7808: 268435456,
                8064: 268443656
            }, {
                0: 1048576,
                16: 33555457,
                32: 1024,
                48: 1049601,
                64: 34604033,
                80: 0,
                96: 1,
                112: 34603009,
                128: 33555456,
                144: 1048577,
                160: 33554433,
                176: 34604032,
                192: 34603008,
                208: 1025,
                224: 1049600,
                240: 33554432,
                8: 34603009,
                24: 0,
                40: 33555457,
                56: 34604032,
                72: 1048576,
                88: 33554433,
                104: 33554432,
                120: 1025,
                136: 1049601,
                152: 33555456,
                168: 34603008,
                184: 1048577,
                200: 1024,
                216: 34604033,
                232: 1,
                248: 1049600,
                256: 33554432,
                272: 1048576,
                288: 33555457,
                304: 34603009,
                320: 1048577,
                336: 33555456,
                352: 34604032,
                368: 1049601,
                384: 1025,
                400: 34604033,
                416: 1049600,
                432: 1,
                448: 0,
                464: 34603008,
                480: 33554433,
                496: 1024,
                264: 1049600,
                280: 33555457,
                296: 34603009,
                312: 1,
                328: 33554432,
                344: 1048576,
                360: 1025,
                376: 34604032,
                392: 33554433,
                408: 34603008,
                424: 0,
                440: 34604033,
                456: 1049601,
                472: 1024,
                488: 33555456,
                504: 1048577
            }, {
                0: 134219808,
                1: 131072,
                2: 134217728,
                3: 32,
                4: 131104,
                5: 134350880,
                6: 134350848,
                7: 2048,
                8: 134348800,
                9: 134219776,
                10: 133120,
                11: 134348832,
                12: 2080,
                13: 0,
                14: 134217760,
                15: 133152,
                2147483648: 2048,
                2147483649: 134350880,
                2147483650: 134219808,
                2147483651: 134217728,
                2147483652: 134348800,
                2147483653: 133120,
                2147483654: 133152,
                2147483655: 32,
                2147483656: 134217760,
                2147483657: 2080,
                2147483658: 131104,
                2147483659: 134350848,
                2147483660: 0,
                2147483661: 134348832,
                2147483662: 134219776,
                2147483663: 131072,
                16: 133152,
                17: 134350848,
                18: 32,
                19: 2048,
                20: 134219776,
                21: 134217760,
                22: 134348832,
                23: 131072,
                24: 0,
                25: 131104,
                26: 134348800,
                27: 134219808,
                28: 134350880,
                29: 133120,
                30: 2080,
                31: 134217728,
                2147483664: 131072,
                2147483665: 2048,
                2147483666: 134348832,
                2147483667: 133152,
                2147483668: 32,
                2147483669: 134348800,
                2147483670: 134217728,
                2147483671: 134219808,
                2147483672: 134350880,
                2147483673: 134217760,
                2147483674: 134219776,
                2147483675: 0,
                2147483676: 133120,
                2147483677: 2080,
                2147483678: 131104,
                2147483679: 134350848
            }]
                , u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679]
                , d = a.DES = s.extend({
                _doReset: function() {
                    for (var t = this._key, r = t.words, e = [], i = 0; i < 56; i++) {
                        var n = c[i] - 1;
                        e[i] = r[n >>> 5] >>> 31 - n % 32 & 1
                    }
                    for (var o = this._subKeys = [], s = 0; s < 16; s++) {
                        for (var a = o[s] = [], f = l[s], i = 0; i < 24; i++)
                            a[i / 6 | 0] |= e[(h[i] - 1 + f) % 28] << 31 - i % 6,
                                a[4 + (i / 6 | 0)] |= e[28 + (h[i + 24] - 1 + f) % 28] << 31 - i % 6;
                        a[0] = a[0] << 1 | a[0] >>> 31;
                        for (var i = 1; i < 7; i++)
                            a[i] = a[i] >>> 4 * (i - 1) + 3;
                        a[7] = a[7] << 5 | a[7] >>> 27
                    }
                    for (var u = this._invSubKeys = [], i = 0; i < 16; i++)
                        u[i] = o[15 - i]
                },
                encryptBlock: function(t, r) {
                    this._doCryptBlock(t, r, this._subKeys)
                },
                decryptBlock: function(t, r) {
                    this._doCryptBlock(t, r, this._invSubKeys)
                },
                _doCryptBlock: function(t, i, n) {
                    this._lBlock = t[i],
                        this._rBlock = t[i + 1],
                        r.call(this, 4, 252645135),
                        r.call(this, 16, 65535),
                        e.call(this, 2, 858993459),
                        e.call(this, 8, 16711935),
                        r.call(this, 1, 1431655765);
                    for (var o = 0; o < 16; o++) {
                        for (var s = n[o], a = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++)
                            h |= f[l][((c ^ s[l]) & u[l]) >>> 0];
                        this._lBlock = c,
                            this._rBlock = a ^ h
                    }
                    var d = this._lBlock;
                    this._lBlock = this._rBlock,
                        this._rBlock = d,
                        r.call(this, 1, 1431655765),
                        e.call(this, 8, 16711935),
                        e.call(this, 2, 858993459),
                        r.call(this, 16, 65535),
                        r.call(this, 4, 252645135),
                        t[i] = this._lBlock,
                        t[i + 1] = this._rBlock
                },
                keySize: 2,
                ivSize: 2,
                blockSize: 2
            });
            i.DES = s._createHelper(d);
            var v = a.TripleDES = s.extend({
                _doReset: function() {
                    var t = this._key
                        , r = t.words;
                    this._des1 = d.createEncryptor(o.create(r.slice(0, 2))),
                        this._des2 = d.createEncryptor(o.create(r.slice(2, 4))),
                        this._des3 = d.createEncryptor(o.create(r.slice(4, 6)))
                },
                encryptBlock: function(t, r) {
                    this._des1.encryptBlock(t, r),
                        this._des2.decryptBlock(t, r),
                        this._des3.encryptBlock(t, r)
                },
                decryptBlock: function(t, r) {
                    this._des3.decryptBlock(t, r),
                        this._des2.encryptBlock(t, r),
                        this._des1.decryptBlock(t, r)
                },
                keySize: 6,
                ivSize: 2,
                blockSize: 2
            });
            i.TripleDES = s._createHelper(v)
        }(),
        function() {
            function r() {
                for (var t = this._S, r = this._i, e = this._j, i = 0, n = 0; n < 4; n++) {
                    r = (r + 1) % 256,
                        e = (e + t[r]) % 256;
                    var o = t[r];
                    t[r] = t[e],
                        t[e] = o,
                        i |= t[(t[r] + t[e]) % 256] << 24 - 8 * n
                }
                return this._i = r,
                    this._j = e,
                    i
            }
            var e = t
                , i = e.lib
                , n = i.StreamCipher
                , o = e.algo
                , s = o.RC4 = n.extend({
                _doReset: function() {
                    for (var t = this._key, r = t.words, e = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)
                        i[n] = n;
                    for (var n = 0, o = 0; n < 256; n++) {
                        var s = n % e
                            , a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                        o = (o + i[n] + a) % 256;
                        var c = i[n];
                        i[n] = i[o],
                            i[o] = c
                    }
                    this._i = this._j = 0
                },
                _doProcessBlock: function(t, e) {
                    t[e] ^= r.call(this)
                },
                keySize: 8,
                ivSize: 0
            });
            e.RC4 = n._createHelper(s);
            var a = o.RC4Drop = s.extend({
                cfg: s.cfg.extend({
                    drop: 192
                }),
                _doReset: function() {
                    s._doReset.call(this);
                    for (var t = this.cfg.drop; t > 0; t--)
                        r.call(this)
                }
            });
            e.RC4Drop = n._createHelper(a)
        }(),
        t.mode.CTRGladman = function() {
            function r(t) {
                if (255 === (t >> 24 & 255)) {
                    var r = t >> 16 & 255
                        , e = t >> 8 & 255
                        , i = 255 & t;
                    255 === r ? (r = 0,
                        255 === e ? (e = 0,
                            255 === i ? i = 0 : ++i) : ++e) : ++r,
                        t = 0,
                        t += r << 16,
                        t += e << 8,
                        t += i
                } else
                    t += 1 << 24;
                return t
            }
            function e(t) {
                return 0 === (t[0] = r(t[0])) && (t[1] = r(t[1])),
                    t
            }
            var i = t.lib.BlockCipherMode.extend()
                , n = i.Encryptor = i.extend({
                processBlock: function(t, r) {
                    var i = this._cipher
                        , n = i.blockSize
                        , o = this._iv
                        , s = this._counter;
                    o && (s = this._counter = o.slice(0),
                        this._iv = void 0),
                        e(s);
                    var a = s.slice(0);
                    i.encryptBlock(a, 0);
                    for (var c = 0; c < n; c++)
                        t[r + c] ^= a[c]
                }
            });
            return i.Decryptor = n,
                i
        }(),
        function() {
            function r() {
                for (var t = this._X, r = this._C, e = 0; e < 8; e++)
                    a[e] = r[e];
                r[0] = r[0] + 1295307597 + this._b | 0,
                    r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0,
                    r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0,
                    r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0,
                    r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0,
                    r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0,
                    r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0,
                    r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0,
                    this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
                for (var e = 0; e < 8; e++) {
                    var i = t[e] + r[e]
                        , n = 65535 & i
                        , o = i >>> 16
                        , s = ((n * n >>> 17) + n * o >>> 15) + o * o
                        , h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                    c[e] = s ^ h
                }
                t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0,
                    t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0,
                    t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0,
                    t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0,
                    t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0,
                    t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0,
                    t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0,
                    t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
            }
            var e = t
                , i = e.lib
                , n = i.StreamCipher
                , o = e.algo
                , s = []
                , a = []
                , c = []
                , h = o.Rabbit = n.extend({
                _doReset: function() {
                    for (var t = this._key.words, e = this.cfg.iv, i = 0; i < 4; i++)
                        t[i] = 16711935 & (t[i] << 8 | t[i] >>> 24) | 4278255360 & (t[i] << 24 | t[i] >>> 8);
                    var n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16]
                        , o = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
                    this._b = 0;
                    for (var i = 0; i < 4; i++)
                        r.call(this);
                    for (var i = 0; i < 8; i++)
                        o[i] ^= n[i + 4 & 7];
                    if (e) {
                        var s = e.words
                            , a = s[0]
                            , c = s[1]
                            , h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                            , l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                            , f = h >>> 16 | 4294901760 & l
                            , u = l << 16 | 65535 & h;
                        o[0] ^= h,
                            o[1] ^= f,
                            o[2] ^= l,
                            o[3] ^= u,
                            o[4] ^= h,
                            o[5] ^= f,
                            o[6] ^= l,
                            o[7] ^= u;
                        for (var i = 0; i < 4; i++)
                            r.call(this)
                    }
                },
                _doProcessBlock: function(t, e) {
                    var i = this._X;
                    r.call(this),
                        s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16,
                        s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16,
                        s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16,
                        s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                    for (var n = 0; n < 4; n++)
                        s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8),
                            t[e + n] ^= s[n]
                },
                blockSize: 4,
                ivSize: 2
            });
            e.Rabbit = n._createHelper(h)
        }(),
        t.mode.CTR = function() {
            var r = t.lib.BlockCipherMode.extend()
                , e = r.Encryptor = r.extend({
                processBlock: function(t, r) {
                    var e = this._cipher
                        , i = e.blockSize
                        , n = this._iv
                        , o = this._counter;
                    n && (o = this._counter = n.slice(0),
                        this._iv = void 0);
                    var s = o.slice(0);
                    e.encryptBlock(s, 0),
                        o[i - 1] = o[i - 1] + 1 | 0;
                    for (var a = 0; a < i; a++)
                        t[r + a] ^= s[a]
                }
            });
            return r.Decryptor = e,
                r
        }(),
        function() {
            function r() {
                for (var t = this._X, r = this._C, e = 0; e < 8; e++)
                    a[e] = r[e];
                r[0] = r[0] + 1295307597 + this._b | 0,
                    r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0,
                    r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0,
                    r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0,
                    r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0,
                    r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0,
                    r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0,
                    r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0,
                    this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
                for (var e = 0; e < 8; e++) {
                    var i = t[e] + r[e]
                        , n = 65535 & i
                        , o = i >>> 16
                        , s = ((n * n >>> 17) + n * o >>> 15) + o * o
                        , h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                    c[e] = s ^ h
                }
                t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0,
                    t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0,
                    t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0,
                    t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0,
                    t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0,
                    t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0,
                    t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0,
                    t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
            }
            var e = t
                , i = e.lib
                , n = i.StreamCipher
                , o = e.algo
                , s = []
                , a = []
                , c = []
                , h = o.RabbitLegacy = n.extend({
                _doReset: function() {
                    var t = this._key.words
                        , e = this.cfg.iv
                        , i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16]
                        , n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
                    this._b = 0;
                    for (var o = 0; o < 4; o++)
                        r.call(this);
                    for (var o = 0; o < 8; o++)
                        n[o] ^= i[o + 4 & 7];
                    if (e) {
                        var s = e.words
                            , a = s[0]
                            , c = s[1]
                            , h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                            , l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                            , f = h >>> 16 | 4294901760 & l
                            , u = l << 16 | 65535 & h;
                        n[0] ^= h,
                            n[1] ^= f,
                            n[2] ^= l,
                            n[3] ^= u,
                            n[4] ^= h,
                            n[5] ^= f,
                            n[6] ^= l,
                            n[7] ^= u;
                        for (var o = 0; o < 4; o++)
                            r.call(this)
                    }
                },
                _doProcessBlock: function(t, e) {
                    var i = this._X;
                    r.call(this),
                        s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16,
                        s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16,
                        s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16,
                        s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                    for (var n = 0; n < 4; n++)
                        s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8),
                            t[e + n] ^= s[n]
                },
                blockSize: 4,
                ivSize: 2
            });
            e.RabbitLegacy = n._createHelper(h)
        }(),
        t.pad.ZeroPadding = {
            pad: function(t, r) {
                var e = 4 * r;
                t.clamp(),
                    t.sigBytes += e - (t.sigBytes % e || e)
            },
            unpad: function(t) {
                for (var r = t.words, e = t.sigBytes - 1; !(r[e >>> 2] >>> 24 - e % 4 * 8 & 255); )
                    e--;
                t.sigBytes = e + 1
            }
        },
        t
};

CryptoJS = new encrypt()


function SM2Cipher(b) {
    this.ct = 1;
    this.sm3c3 = this.sm3keybase = this.p2 = null;
    this.key = Array(32);
    this.keyOff = 0;
    this.cipherMode = "undefined" != typeof b ? b : SM2CipherMode.C1C3C2
}

var pubkeyHex = "";
(function(global, undefined) {
    var SM2CipherMode = {
        C1C2C3: "0",
        C1C3C2: "1"
    };
    (function() {
            function a(a, c) {
                var b = (this._lBlock >>> a ^ this._rBlock) & c;
                this._rBlock ^= b;
                this._lBlock ^= b << a
            }
            function b(a, c) {
                var b = (this._rBlock >>> a ^ this._lBlock) & c;
                this._lBlock ^= b;
                this._rBlock ^= b << a
            }
            var c = CryptoJS
                , d = c.lib
                , e = d.WordArray
                , d = d.BlockCipher
                , f = c.algo
                , g = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]
                , h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]
                , k = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28]
                , l = [{
                0: 8421888,
                268435456: 32768,
                536870912: 8421378,
                805306368: 2,
                1073741824: 512,
                1342177280: 8421890,
                1610612736: 8389122,
                1879048192: 8388608,
                2147483648: 514,
                2415919104: 8389120,
                2684354560: 33280,
                2952790016: 8421376,
                3221225472: 32770,
                3489660928: 8388610,
                3758096384: 0,
                4026531840: 33282,
                134217728: 0,
                402653184: 8421890,
                671088640: 33282,
                939524096: 32768,
                1207959552: 8421888,
                1476395008: 512,
                1744830464: 8421378,
                2013265920: 2,
                2281701376: 8389120,
                2550136832: 33280,
                2818572288: 8421376,
                3087007744: 8389122,
                3355443200: 8388610,
                3623878656: 32770,
                3892314112: 514,
                4160749568: 8388608,
                1: 32768,
                268435457: 2,
                536870913: 8421888,
                805306369: 8388608,
                1073741825: 8421378,
                1342177281: 33280,
                1610612737: 512,
                1879048193: 8389122,
                2147483649: 8421890,
                2415919105: 8421376,
                2684354561: 8388610,
                2952790017: 33282,
                3221225473: 514,
                3489660929: 8389120,
                3758096385: 32770,
                4026531841: 0,
                134217729: 8421890,
                402653185: 8421376,
                671088641: 8388608,
                939524097: 512,
                1207959553: 32768,
                1476395009: 8388610,
                1744830465: 2,
                2013265921: 33282,
                2281701377: 32770,
                2550136833: 8389122,
                2818572289: 514,
                3087007745: 8421888,
                3355443201: 8389120,
                3623878657: 0,
                3892314113: 33280,
                4160749569: 8421378
            }, {
                0: 1074282512,
                16777216: 16384,
                33554432: 524288,
                50331648: 1074266128,
                67108864: 1073741840,
                83886080: 1074282496,
                100663296: 1073758208,
                117440512: 16,
                134217728: 540672,
                150994944: 1073758224,
                167772160: 1073741824,
                184549376: 540688,
                201326592: 524304,
                218103808: 0,
                234881024: 16400,
                251658240: 1074266112,
                8388608: 1073758208,
                25165824: 540688,
                41943040: 16,
                58720256: 1073758224,
                75497472: 1074282512,
                92274688: 1073741824,
                109051904: 524288,
                125829120: 1074266128,
                142606336: 524304,
                159383552: 0,
                176160768: 16384,
                192937984: 1074266112,
                209715200: 1073741840,
                226492416: 540672,
                243269632: 1074282496,
                260046848: 16400,
                268435456: 0,
                285212672: 1074266128,
                301989888: 1073758224,
                318767104: 1074282496,
                335544320: 1074266112,
                352321536: 16,
                369098752: 540688,
                385875968: 16384,
                402653184: 16400,
                419430400: 524288,
                436207616: 524304,
                452984832: 1073741840,
                469762048: 540672,
                486539264: 1073758208,
                503316480: 1073741824,
                520093696: 1074282512,
                276824064: 540688,
                293601280: 524288,
                310378496: 1074266112,
                327155712: 16384,
                343932928: 1073758208,
                360710144: 1074282512,
                377487360: 16,
                394264576: 1073741824,
                411041792: 1074282496,
                427819008: 1073741840,
                444596224: 1073758224,
                461373440: 524304,
                478150656: 0,
                494927872: 16400,
                511705088: 1074266128,
                528482304: 540672
            }, {
                0: 260,
                1048576: 0,
                2097152: 67109120,
                3145728: 65796,
                4194304: 65540,
                5242880: 67108868,
                6291456: 67174660,
                7340032: 67174400,
                8388608: 67108864,
                9437184: 67174656,
                10485760: 65792,
                11534336: 67174404,
                12582912: 67109124,
                13631488: 65536,
                14680064: 4,
                15728640: 256,
                524288: 67174656,
                1572864: 67174404,
                2621440: 0,
                3670016: 67109120,
                4718592: 67108868,
                5767168: 65536,
                6815744: 65540,
                7864320: 260,
                8912896: 4,
                9961472: 256,
                11010048: 67174400,
                12058624: 65796,
                13107200: 65792,
                14155776: 67109124,
                15204352: 67174660,
                16252928: 67108864,
                16777216: 67174656,
                17825792: 65540,
                18874368: 65536,
                19922944: 67109120,
                20971520: 256,
                22020096: 67174660,
                23068672: 67108868,
                24117248: 0,
                25165824: 67109124,
                26214400: 67108864,
                27262976: 4,
                28311552: 65792,
                29360128: 67174400,
                30408704: 260,
                31457280: 65796,
                32505856: 67174404,
                17301504: 67108864,
                18350080: 260,
                19398656: 67174656,
                20447232: 0,
                21495808: 65540,
                22544384: 67109120,
                23592960: 256,
                24641536: 67174404,
                25690112: 65536,
                26738688: 67174660,
                27787264: 65796,
                28835840: 67108868,
                29884416: 67109124,
                30932992: 67174400,
                31981568: 4,
                33030144: 65792
            }, {
                0: 2151682048,
                65536: 2147487808,
                131072: 4198464,
                196608: 2151677952,
                262144: 0,
                327680: 4198400,
                393216: 2147483712,
                458752: 4194368,
                524288: 2147483648,
                589824: 4194304,
                655360: 64,
                720896: 2147487744,
                786432: 2151678016,
                851968: 4160,
                917504: 4096,
                983040: 2151682112,
                32768: 2147487808,
                98304: 64,
                163840: 2151678016,
                229376: 2147487744,
                294912: 4198400,
                360448: 2151682112,
                425984: 0,
                491520: 2151677952,
                557056: 4096,
                622592: 2151682048,
                688128: 4194304,
                753664: 4160,
                819200: 2147483648,
                884736: 4194368,
                950272: 4198464,
                1015808: 2147483712,
                1048576: 4194368,
                1114112: 4198400,
                1179648: 2147483712,
                1245184: 0,
                1310720: 4160,
                1376256: 2151678016,
                1441792: 2151682048,
                1507328: 2147487808,
                1572864: 2151682112,
                1638400: 2147483648,
                1703936: 2151677952,
                1769472: 4198464,
                1835008: 2147487744,
                1900544: 4194304,
                1966080: 64,
                2031616: 4096,
                1081344: 2151677952,
                1146880: 2151682112,
                1212416: 0,
                1277952: 4198400,
                1343488: 4194368,
                1409024: 2147483648,
                1474560: 2147487808,
                1540096: 64,
                1605632: 2147483712,
                1671168: 4096,
                1736704: 2147487744,
                1802240: 2151678016,
                1867776: 4160,
                1933312: 2151682048,
                1998848: 4194304,
                2064384: 4198464
            }, {
                0: 128,
                4096: 17039360,
                8192: 262144,
                12288: 536870912,
                16384: 537133184,
                20480: 16777344,
                24576: 553648256,
                28672: 262272,
                32768: 16777216,
                36864: 537133056,
                40960: 536871040,
                45056: 553910400,
                49152: 553910272,
                53248: 0,
                57344: 17039488,
                61440: 553648128,
                2048: 17039488,
                6144: 553648256,
                10240: 128,
                14336: 17039360,
                18432: 262144,
                22528: 537133184,
                26624: 553910272,
                30720: 536870912,
                34816: 537133056,
                38912: 0,
                43008: 553910400,
                47104: 16777344,
                51200: 536871040,
                55296: 553648128,
                59392: 16777216,
                63488: 262272,
                65536: 262144,
                69632: 128,
                73728: 536870912,
                77824: 553648256,
                81920: 16777344,
                86016: 553910272,
                90112: 537133184,
                94208: 16777216,
                98304: 553910400,
                102400: 553648128,
                106496: 17039360,
                110592: 537133056,
                114688: 262272,
                118784: 536871040,
                122880: 0,
                126976: 17039488,
                67584: 553648256,
                71680: 16777216,
                75776: 17039360,
                79872: 537133184,
                83968: 536870912,
                88064: 17039488,
                92160: 128,
                96256: 553910272,
                100352: 262272,
                104448: 553910400,
                108544: 0,
                112640: 553648128,
                116736: 16777344,
                120832: 262144,
                124928: 537133056,
                129024: 536871040
            }, {
                0: 268435464,
                256: 8192,
                512: 270532608,
                768: 270540808,
                1024: 268443648,
                1280: 2097152,
                1536: 2097160,
                1792: 268435456,
                2048: 0,
                2304: 268443656,
                2560: 2105344,
                2816: 8,
                3072: 270532616,
                3328: 2105352,
                3584: 8200,
                3840: 270540800,
                128: 270532608,
                384: 270540808,
                640: 8,
                896: 2097152,
                1152: 2105352,
                1408: 268435464,
                1664: 268443648,
                1920: 8200,
                2176: 2097160,
                2432: 8192,
                2688: 268443656,
                2944: 270532616,
                3200: 0,
                3456: 270540800,
                3712: 2105344,
                3968: 268435456,
                4096: 268443648,
                4352: 270532616,
                4608: 270540808,
                4864: 8200,
                5120: 2097152,
                5376: 268435456,
                5632: 268435464,
                5888: 2105344,
                6144: 2105352,
                6400: 0,
                6656: 8,
                6912: 270532608,
                7168: 8192,
                7424: 268443656,
                7680: 270540800,
                7936: 2097160,
                4224: 8,
                4480: 2105344,
                4736: 2097152,
                4992: 268435464,
                5248: 268443648,
                5504: 8200,
                5760: 270540808,
                6016: 270532608,
                6272: 270540800,
                6528: 270532616,
                6784: 8192,
                7040: 2105352,
                7296: 2097160,
                7552: 0,
                7808: 268435456,
                8064: 268443656
            }, {
                0: 1048576,
                16: 33555457,
                32: 1024,
                48: 1049601,
                64: 34604033,
                80: 0,
                96: 1,
                112: 34603009,
                128: 33555456,
                144: 1048577,
                160: 33554433,
                176: 34604032,
                192: 34603008,
                208: 1025,
                224: 1049600,
                240: 33554432,
                8: 34603009,
                24: 0,
                40: 33555457,
                56: 34604032,
                72: 1048576,
                88: 33554433,
                104: 33554432,
                120: 1025,
                136: 1049601,
                152: 33555456,
                168: 34603008,
                184: 1048577,
                200: 1024,
                216: 34604033,
                232: 1,
                248: 1049600,
                256: 33554432,
                272: 1048576,
                288: 33555457,
                304: 34603009,
                320: 1048577,
                336: 33555456,
                352: 34604032,
                368: 1049601,
                384: 1025,
                400: 34604033,
                416: 1049600,
                432: 1,
                448: 0,
                464: 34603008,
                480: 33554433,
                496: 1024,
                264: 1049600,
                280: 33555457,
                296: 34603009,
                312: 1,
                328: 33554432,
                344: 1048576,
                360: 1025,
                376: 34604032,
                392: 33554433,
                408: 34603008,
                424: 0,
                440: 34604033,
                456: 1049601,
                472: 1024,
                488: 33555456,
                504: 1048577
            }, {
                0: 134219808,
                1: 131072,
                2: 134217728,
                3: 32,
                4: 131104,
                5: 134350880,
                6: 134350848,
                7: 2048,
                8: 134348800,
                9: 134219776,
                10: 133120,
                11: 134348832,
                12: 2080,
                13: 0,
                14: 134217760,
                15: 133152,
                2147483648: 2048,
                2147483649: 134350880,
                2147483650: 134219808,
                2147483651: 134217728,
                2147483652: 134348800,
                2147483653: 133120,
                2147483654: 133152,
                2147483655: 32,
                2147483656: 134217760,
                2147483657: 2080,
                2147483658: 131104,
                2147483659: 134350848,
                2147483660: 0,
                2147483661: 134348832,
                2147483662: 134219776,
                2147483663: 131072,
                16: 133152,
                17: 134350848,
                18: 32,
                19: 2048,
                20: 134219776,
                21: 134217760,
                22: 134348832,
                23: 131072,
                24: 0,
                25: 131104,
                26: 134348800,
                27: 134219808,
                28: 134350880,
                29: 133120,
                30: 2080,
                31: 134217728,
                2147483664: 131072,
                2147483665: 2048,
                2147483666: 134348832,
                2147483667: 133152,
                2147483668: 32,
                2147483669: 134348800,
                2147483670: 134217728,
                2147483671: 134219808,
                2147483672: 134350880,
                2147483673: 134217760,
                2147483674: 134219776,
                2147483675: 0,
                2147483676: 133120,
                2147483677: 2080,
                2147483678: 131104,
                2147483679: 134350848
            }]
                , p = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679]
                , n = f.DES = d.extend({
                _doReset: function() {
                    for (var a = this._key.words, c = [], b = 0; 56 > b; b++) {
                        var d = g[b] - 1;
                        c[b] = a[d >>> 5] >>> 31 - d % 32 & 1
                    }
                    a = this._subKeys = [];
                    for (d = 0; 16 > d; d++) {
                        for (var e = a[d] = [], f = k[d], b = 0; 24 > b; b++) {
                            e[b / 6 | 0] |= c[(h[b] - 1 + f) % 28] << 31 - b % 6,
                                e[4 + (b / 6 | 0)] |= c[28 + (h[b + 24] - 1 + f) % 28] << 31 - b % 6
                        }
                        e[0] = e[0] << 1 | e[0] >>> 31;
                        for (b = 1; 7 > b; b++) {
                            e[b] >>>= 4 * (b - 1) + 3
                        }
                        e[7] = e[7] << 5 | e[7] >>> 27
                    }
                    c = this._invSubKeys = [];
                    for (b = 0; 16 > b; b++) {
                        c[b] = a[15 - b]
                    }
                },
                encryptBlock: function(a, c) {
                    this._doCryptBlock(a, c, this._subKeys)
                },
                decryptBlock: function(a, c) {
                    this._doCryptBlock(a, c, this._invSubKeys)
                },
                _doCryptBlock: function(c, d, e) {
                    this._lBlock = c[d];
                    this._rBlock = c[d + 1];
                    a.call(this, 4, 252645135);
                    a.call(this, 16, 65535);
                    b.call(this, 2, 858993459);
                    b.call(this, 8, 16711935);
                    a.call(this, 1, 1431655765);
                    for (var f = 0; 16 > f; f++) {
                        for (var g = e[f], h = this._lBlock, k = this._rBlock, n = 0, u = 0; 8 > u; u++) {
                            n |= l[u][((k ^ g[u]) & p[u]) >>> 0]
                        }
                        this._lBlock = k;
                        this._rBlock = h ^ n
                    }
                    e = this._lBlock;
                    this._lBlock = this._rBlock;
                    this._rBlock = e;
                    a.call(this, 1, 1431655765);
                    b.call(this, 8, 16711935);
                    b.call(this, 2, 858993459);
                    a.call(this, 16, 65535);
                    a.call(this, 4, 252645135);
                    c[d] = this._lBlock;
                    c[d + 1] = this._rBlock
                },
                keySize: 2,
                ivSize: 2,
                blockSize: 2
            });
            c.DES = d._createHelper(n);
            f = f.TripleDES = d.extend({
                _doReset: function() {
                    var a = this._key.words;
                    this._des1 = n.createEncryptor(e.create(a.slice(0, 2)));
                    this._des2 = n.createEncryptor(e.create(a.slice(2, 4)));
                    this._des3 = n.createEncryptor(e.create(a.slice(4, 6)))
                },
                encryptBlock: function(a, c) {
                    this._des1.encryptBlock(a, c);
                    this._des2.decryptBlock(a, c);
                    this._des3.encryptBlock(a, c)
                },
                decryptBlock: function(a, c) {
                    this._des3.decryptBlock(a, c);
                    this._des2.encryptBlock(a, c);
                    this._des1.decryptBlock(a, c)
                },
                keySize: 6,
                ivSize: 2,
                blockSize: 2
            });
            c.TripleDES = d._createHelper(f)
        }
    )();
    (function() {
            var a = CryptoJS
                , b = a.lib.WordArray;
            a.enc.Base64 = {
                stringify: function(a) {
                    var b = a.words
                        , e = a.sigBytes
                        , f = this._map;
                    a.clamp();
                    a = [];
                    for (var g = 0; g < e; g += 3) {
                        for (var h = (b[g >>> 2] >>> 24 - g % 4 * 8 & 255) << 16 | (b[g + 1 >>> 2] >>> 24 - (g + 1) % 4 * 8 & 255) << 8 | b[g + 2 >>> 2] >>> 24 - (g + 2) % 4 * 8 & 255, k = 0; 4 > k && g + 0.75 * k < e; k++) {
                            a.push(f.charAt(h >>> 6 * (3 - k) & 63))
                        }
                    }
                    if (b = f.charAt(64)) {
                        for (; a.length % 4; ) {
                            a.push(b)
                        }
                    }
                    return a.join("")
                },
                parse: function(a) {
                    var d = a.length
                        , e = this._map
                        , f = e.charAt(64);
                    f && (f = a.indexOf(f),
                    -1 != f && (d = f));
                    for (var f = [], g = 0, h = 0; h < d; h++) {
                        if (h % 4) {
                            var k = e.indexOf(a.charAt(h - 1)) << h % 4 * 2
                                , l = e.indexOf(a.charAt(h)) >>> 6 - h % 4 * 2;
                            f[g >>> 2] |= (k | l) << 24 - g % 4 * 8;
                            g++
                        }
                    }
                    return b.create(f, g)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }
        }
    )();
    var dbits, canary = 244837814094590, j_lm = 15715070 == (canary & 16777215);
    function BigInteger(a, b, c) {
        null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
    }
    function nbi() {
        return new BigInteger(null)
    }
    function am1(a, b, c, d, e, f) {
        for (; 0 <= --f; ) {
            var g = b * this[a++] + c[d] + e;
            e = Math.floor(g / 67108864);
            c[d++] = g & 67108863
        }
        return e
    }
    function am2(a, b, c, d, e, f) {
        var g = b & 32767;
        for (b >>= 15; 0 <= --f; ) {
            var h = this[a] & 32767
                , k = this[a++] >> 15
                , l = b * h + k * g
                , h = g * h + ((l & 32767) << 15) + c[d] + (e & 1073741823);
            e = (h >>> 30) + (l >>> 15) + b * k + (e >>> 30);
            c[d++] = h & 1073741823
        }
        return e
    }
    function am3(a, b, c, d, e, f) {
        var g = b & 16383;
        for (b >>= 14; 0 <= --f; ) {
            var h = this[a] & 16383
                , k = this[a++] >> 14
                , l = b * h + k * g
                , h = g * h + ((l & 16383) << 14) + c[d] + e;
            e = (h >> 28) + (l >> 14) + b * k;
            c[d++] = h & 268435455
        }
        return e
    }
    j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2,
        dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1,
        dbits = 26) : (BigInteger.prototype.am = am3,
        dbits = 28);
    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = (1 << dbits) - 1;
    BigInteger.prototype.DV = 1 << dbits;
    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2, BI_FP);
    BigInteger.prototype.F1 = BI_FP - dbits;
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = [], rr, vv;
    rr = 48;
    for (vv = 0; 9 >= vv; ++vv) {
        BI_RC[rr++] = vv
    }
    rr = 97;
    for (vv = 10; 36 > vv; ++vv) {
        BI_RC[rr++] = vv
    }
    rr = 65;
    for (vv = 10; 36 > vv; ++vv) {
        BI_RC[rr++] = vv
    }
    function int2char(a) {
        return BI_RM.charAt(a)
    }
    function intAt(a, b) {
        var c = BI_RC[a.charCodeAt(b)];
        return null == c ? -1 : c
    }
    function bnpCopyTo(a) {
        for (var b = this.t - 1; 0 <= b; --b) {
            a[b] = this[b]
        }
        a.t = this.t;
        a.s = this.s
    }
    function bnpFromInt(a) {
        this.t = 1;
        this.s = 0 > a ? -1 : 0;
        0 < a ? this[0] = a : -1 > a ? this[0] = a + this.DV : this.t = 0
    }
    function nbv(a) {
        var b = nbi();
        b.fromInt(a);
        return b
    }
    function bnpFromString(a, b) {
        var c;
        if (16 == b) {
            c = 4
        } else {
            if (8 == b) {
                c = 3
            } else {
                if (256 == b) {
                    c = 8
                } else {
                    if (2 == b) {
                        c = 1
                    } else {
                        if (32 == b) {
                            c = 5
                        } else {
                            if (4 == b) {
                                c = 2
                            } else {
                                this.fromRadix(a, b);
                                return
                            }
                        }
                    }
                }
            }
        }
        this.s = this.t = 0;
        for (var d = a.length, e = !1, f = 0; 0 <= --d; ) {
            var g = 8 == c ? a[d] & 255 : intAt(a, d);
            0 > g ? "-" == a.charAt(d) && (e = !0) : (e = !1,
                0 == f ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f,
                    this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f,
                f += c,
            f >= this.DB && (f -= this.DB))
        }
        8 == c && 0 != (a[0] & 128) && (this.s = -1,
        0 < f && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f));
        this.clamp();
        e && BigInteger.ZERO.subTo(this, this)
    }
    function bnpClamp() {
        for (var a = this.s & this.DM; 0 < this.t && this[this.t - 1] == a; ) {
            --this.t
        }
    }
    function bnToString(a) {
        if (0 > this.s) {
            return "-" + this.negate().toString(a)
        }
        if (16 == a) {
            a = 4
        } else {
            if (8 == a) {
                a = 3
            } else {
                if (2 == a) {
                    a = 1
                } else {
                    if (32 == a) {
                        a = 5
                    } else {
                        if (4 == a) {
                            a = 2
                        } else {
                            return this.toRadix(a)
                        }
                    }
                }
            }
        }
        var b = (1 << a) - 1, c, d = !1, e = "", f = this.t, g = this.DB - f * this.DB % a;
        if (0 < f--) {
            for (g < this.DB && 0 < (c = this[f] >> g) && (d = !0,
                e = int2char(c)); 0 <= f; ) {
                g < a ? (c = (this[f] & (1 << g) - 1) << a - g,
                    c |= this[--f] >> (g += this.DB - a)) : (c = this[f] >> (g -= a) & b,
                0 >= g && (g += this.DB,
                    --f)),
                0 < c && (d = !0),
                d && (e += int2char(c))
            }
        }
        return d ? e : "0"
    }
    function bnNegate() {
        var a = nbi();
        BigInteger.ZERO.subTo(this, a);
        return a
    }
    function bnAbs() {
        return 0 > this.s ? this.negate() : this
    }
    function bnCompareTo(a) {
        var b = this.s - a.s;
        if (0 != b) {
            return b
        }
        var c = this.t
            , b = c - a.t;
        if (0 != b) {
            return 0 > this.s ? -b : b
        }
        for (; 0 <= --c; ) {
            if (0 != (b = this[c] - a[c])) {
                return b
            }
        }
        return 0
    }
    function nbits(a) {
        var b = 1, c;
        0 != (c = a >>> 16) && (a = c,
            b += 16);
        0 != (c = a >> 8) && (a = c,
            b += 8);
        0 != (c = a >> 4) && (a = c,
            b += 4);
        0 != (c = a >> 2) && (a = c,
            b += 2);
        0 != a >> 1 && (b += 1);
        return b
    }
    function bnBitLength() {
        return 0 >= this.t ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
    }
    function bnpDLShiftTo(a, b) {
        var c;
        for (c = this.t - 1; 0 <= c; --c) {
            b[c + a] = this[c]
        }
        for (c = a - 1; 0 <= c; --c) {
            b[c] = 0
        }
        b.t = this.t + a;
        b.s = this.s
    }
    function bnpDRShiftTo(a, b) {
        for (var c = a; c < this.t; ++c) {
            b[c - a] = this[c]
        }
        b.t = Math.max(this.t - a, 0);
        b.s = this.s
    }
    function bnpLShiftTo(a, b) {
        var c = a % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(a / this.DB), g = this.s << c & this.DM, h;
        for (h = this.t - 1; 0 <= h; --h) {
            b[h + f + 1] = this[h] >> d | g,
                g = (this[h] & e) << c
        }
        for (h = f - 1; 0 <= h; --h) {
            b[h] = 0
        }
        b[f] = g;
        b.t = this.t + f + 1;
        b.s = this.s;
        b.clamp()
    }
    function bnpRShiftTo(a, b) {
        b.s = this.s;
        var c = Math.floor(a / this.DB);
        if (c >= this.t) {
            b.t = 0
        } else {
            var d = a % this.DB
                , e = this.DB - d
                , f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g) {
                b[g - c - 1] |= (this[g] & f) << e,
                    b[g - c] = this[g] >> d
            }
            0 < d && (b[this.t - c - 1] |= (this.s & f) << e);
            b.t = this.t - c;
            b.clamp()
        }
    }
    function bnpSubTo(a, b) {
        for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e; ) {
            d += this[c] - a[c],
                b[c++] = d & this.DM,
                d >>= this.DB
        }
        if (a.t < this.t) {
            for (d -= a.s; c < this.t; ) {
                d += this[c],
                    b[c++] = d & this.DM,
                    d >>= this.DB
            }
            d += this.s
        } else {
            for (d += this.s; c < a.t; ) {
                d -= a[c],
                    b[c++] = d & this.DM,
                    d >>= this.DB
            }
            d -= a.s
        }
        b.s = 0 > d ? -1 : 0;
        -1 > d ? b[c++] = this.DV + d : 0 < d && (b[c++] = d);
        b.t = c;
        b.clamp()
    }
    function bnpMultiplyTo(a, b) {
        var c = this.abs()
            , d = a.abs()
            , e = c.t;
        for (b.t = e + d.t; 0 <= --e; ) {
            b[e] = 0
        }
        for (e = 0; e < d.t; ++e) {
            b[e + c.t] = c.am(0, d[e], b, e, 0, c.t)
        }
        b.s = 0;
        b.clamp();
        this.s != a.s && BigInteger.ZERO.subTo(b, b)
    }
    function bnpSquareTo(a) {
        for (var b = this.abs(), c = a.t = 2 * b.t; 0 <= --c; ) {
            a[c] = 0
        }
        for (c = 0; c < b.t - 1; ++c) {
            var d = b.am(c, b[c], a, 2 * c, 0, 1);
            (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV,
                a[c + b.t + 1] = 1)
        }
        0 < a.t && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
        a.s = 0;
        a.clamp()
    }
    function bnpDivRemTo(a, b, c) {
        var d = a.abs();
        if (!(0 >= d.t)) {
            var e = this.abs();
            if (e.t < d.t) {
                null != b && b.fromInt(0),
                null != c && this.copyTo(c)
            } else {
                null == c && (c = nbi());
                var f = nbi()
                    , g = this.s;
                a = a.s;
                var h = this.DB - nbits(d[d.t - 1]);
                0 < h ? (d.lShiftTo(h, f),
                    e.lShiftTo(h, c)) : (d.copyTo(f),
                    e.copyTo(c));
                d = f.t;
                e = f[d - 1];
                if (0 != e) {
                    var k = e * (1 << this.F1) + (1 < d ? f[d - 2] >> this.F2 : 0)
                        , l = this.FV / k
                        , k = (1 << this.F1) / k
                        , p = 1 << this.F2
                        , n = c.t
                        , q = n - d
                        , m = null == b ? nbi() : b;
                    f.dlShiftTo(q, m);
                    0 <= c.compareTo(m) && (c[c.t++] = 1,
                        c.subTo(m, c));
                    BigInteger.ONE.dlShiftTo(d, m);
                    for (m.subTo(f, f); f.t < d; ) {
                        f[f.t++] = 0
                    }
                    for (; 0 <= --q; ) {
                        var r = c[--n] == e ? this.DM : Math.floor(c[n] * l + (c[n - 1] + p) * k);
                        if ((c[n] += f.am(0, r, c, q, 0, d)) < r) {
                            for (f.dlShiftTo(q, m),
                                     c.subTo(m, c); c[n] < --r; ) {
                                c.subTo(m, c)
                            }
                        }
                    }
                    null != b && (c.drShiftTo(d, b),
                    g != a && BigInteger.ZERO.subTo(b, b));
                    c.t = d;
                    c.clamp();
                    0 < h && c.rShiftTo(h, c);
                    0 > g && BigInteger.ZERO.subTo(c, c)
                }
            }
        }
    }
    function bnMod(a) {
        var b = nbi();
        this.abs().divRemTo(a, null, b);
        0 > this.s && 0 < b.compareTo(BigInteger.ZERO) && a.subTo(b, b);
        return b
    }
    function Classic(a) {
        this.m = a
    }
    function cConvert(a) {
        return 0 > a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m) : a
    }
    function cRevert(a) {
        return a
    }
    function cReduce(a) {
        a.divRemTo(this.m, null, a)
    }
    function cMulTo(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    function cSqrTo(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
        if (1 > this.t) {
            return 0
        }
        var a = this[0];
        if (0 == (a & 1)) {
            return 0
        }
        var b = a & 3
            , b = b * (2 - (a & 15) * b) & 15
            , b = b * (2 - (a & 255) * b) & 255
            , b = b * (2 - ((a & 65535) * b & 65535)) & 65535
            , b = b * (2 - a * b % this.DV) % this.DV;
        return 0 < b ? this.DV - b : -b
    }
    function Montgomery(a) {
        this.m = a;
        this.mp = a.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << a.DB - 15) - 1;
        this.mt2 = 2 * a.t
    }
    function montConvert(a) {
        var b = nbi();
        a.abs().dlShiftTo(this.m.t, b);
        b.divRemTo(this.m, null, b);
        0 > a.s && 0 < b.compareTo(BigInteger.ZERO) && this.m.subTo(b, b);
        return b
    }
    function montRevert(a) {
        var b = nbi();
        a.copyTo(b);
        this.reduce(b);
        return b
    }
    function montReduce(a) {
        for (; a.t <= this.mt2; ) {
            a[a.t++] = 0
        }
        for (var b = 0; b < this.m.t; ++b) {
            var c = a[b] & 32767
                , d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM
                , c = b + this.m.t;
            for (a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV; ) {
                a[c] -= a.DV,
                    a[++c]++
            }
        }
        a.clamp();
        a.drShiftTo(this.m.t, a);
        0 <= a.compareTo(this.m) && a.subTo(this.m, a)
    }
    function montSqrTo(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    function montMulTo(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
        return 0 == (0 < this.t ? this[0] & 1 : this.s)
    }
    function bnpExp(a, b) {
        if (4294967295 < a || 1 > a) {
            return BigInteger.ONE
        }
        var c = nbi()
            , d = nbi()
            , e = b.convert(this)
            , f = nbits(a) - 1;
        for (e.copyTo(c); 0 <= --f; ) {
            if (b.sqrTo(c, d),
            0 < (a & 1 << f)) {
                b.mulTo(d, e, c)
            } else {
                var g = c
                    , c = d
                    , d = g
            }
        }
        return b.revert(c)
    }
    function bnModPowInt(a, b) {
        var c;
        c = 256 > a || b.isEven() ? new Classic(b) : new Montgomery(b);
        return this.exp(a, c)
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);
    function bnClone() {
        var a = nbi();
        this.copyTo(a);
        return a
    }
    function bnIntValue() {
        if (0 > this.s) {
            if (1 == this.t) {
                return this[0] - this.DV
            }
            if (0 == this.t) {
                return -1
            }
        } else {
            if (1 == this.t) {
                return this[0]
            }
            if (0 == this.t) {
                return 0
            }
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }
    function bnByteValue() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24
    }
    function bnShortValue() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16
    }
    function bnpChunkSize(a) {
        return Math.floor(Math.LN2 * this.DB / Math.log(a))
    }
    function bnSigNum() {
        return 0 > this.s ? -1 : 0 >= this.t || 1 == this.t && 0 >= this[0] ? 0 : 1
    }
    function bnpToRadix(a) {
        null == a && (a = 10);
        if (0 == this.signum() || 2 > a || 36 < a) {
            return "0"
        }
        var b = this.chunkSize(a)
            , b = Math.pow(a, b)
            , c = nbv(b)
            , d = nbi()
            , e = nbi()
            , f = "";
        for (this.divRemTo(c, d, e); 0 < d.signum(); ) {
            f = (b + e.intValue()).toString(a).substr(1) + f,
                d.divRemTo(c, d, e)
        }
        return e.intValue().toString(a) + f
    }
    function bnpFromRadix(a, b) {
        this.fromInt(0);
        null == b && (b = 10);
        for (var c = this.chunkSize(b), d = Math.pow(b, c), e = !1, f = 0, g = 0, h = 0; h < a.length; ++h) {
            var k = intAt(a, h);
            0 > k ? "-" == a.charAt(h) && 0 == this.signum() && (e = !0) : (g = b * g + k,
            ++f >= c && (this.dMultiply(d),
                this.dAddOffset(g, 0),
                g = f = 0))
        }
        0 < f && (this.dMultiply(Math.pow(b, f)),
            this.dAddOffset(g, 0));
        e && BigInteger.ZERO.subTo(this, this)
    }
    function bnpFromNumber(a, b, c) {
        if ("number" == typeof b) {
            if (2 > a) {
                this.fromInt(1)
            } else {
                for (this.fromNumber(a, c),
                     this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this),
                     this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b); ) {
                    this.dAddOffset(2, 0),
                    this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this)
                }
            }
        } else {
            c = [];
            var d = a & 7;
            c.length = (a >> 3) + 1;
            b.nextBytes(c);
            c[0] = 0 < d ? c[0] & (1 << d) - 1 : 0;
            this.fromString(c, 256)
        }
    }
    function bnToByteArray() {
        var a = this.t
            , b = [];
        b[0] = this.s;
        var c = this.DB - a * this.DB % 8, d, e = 0;
        if (0 < a--) {
            for (c < this.DB && (d = this[a] >> c) != (this.s & this.DM) >> c && (b[e++] = d | this.s << this.DB - c); 0 <= a; ) {
                if (8 > c ? (d = (this[a] & (1 << c) - 1) << 8 - c,
                    d |= this[--a] >> (c += this.DB - 8)) : (d = this[a] >> (c -= 8) & 255,
                0 >= c && (c += this.DB,
                    --a)),
                0 != (d & 128) && (d |= -256),
                0 == e && (this.s & 128) != (d & 128) && ++e,
                0 < e || d != this.s) {
                    b[e++] = d
                }
            }
        }
        return b
    }
    function bnEquals(a) {
        return 0 == this.compareTo(a)
    }
    function bnMin(a) {
        return 0 > this.compareTo(a) ? this : a
    }
    function bnMax(a) {
        return 0 < this.compareTo(a) ? this : a
    }
    function bnpBitwiseTo(a, b, c) {
        var d, e, f = Math.min(a.t, this.t);
        for (d = 0; d < f; ++d) {
            c[d] = b(this[d], a[d])
        }
        if (a.t < this.t) {
            e = a.s & this.DM;
            for (d = f; d < this.t; ++d) {
                c[d] = b(this[d], e)
            }
            c.t = this.t
        } else {
            e = this.s & this.DM;
            for (d = f; d < a.t; ++d) {
                c[d] = b(e, a[d])
            }
            c.t = a.t
        }
        c.s = b(this.s, a.s);
        c.clamp()
    }
    function op_and(a, b) {
        return a & b
    }
    function bnAnd(a) {
        var b = nbi();
        this.bitwiseTo(a, op_and, b);
        return b
    }
    function op_or(a, b) {
        return a | b
    }
    function bnOr(a) {
        var b = nbi();
        this.bitwiseTo(a, op_or, b);
        return b
    }
    function op_xor(a, b) {
        return a ^ b
    }
    function bnXor(a) {
        var b = nbi();
        this.bitwiseTo(a, op_xor, b);
        return b
    }
    function op_andnot(a, b) {
        return a & ~b
    }
    function bnAndNot(a) {
        var b = nbi();
        this.bitwiseTo(a, op_andnot, b);
        return b
    }
    function bnNot() {
        for (var a = nbi(), b = 0; b < this.t; ++b) {
            a[b] = this.DM & ~this[b]
        }
        a.t = this.t;
        a.s = ~this.s;
        return a
    }
    function bnShiftLeft(a) {
        var b = nbi();
        0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b);
        return b
    }
    function bnShiftRight(a) {
        var b = nbi();
        0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b);
        return b
    }
    function lbit(a) {
        if (0 == a) {
            return -1
        }
        var b = 0;
        0 == (a & 65535) && (a >>= 16,
            b += 16);
        0 == (a & 255) && (a >>= 8,
            b += 8);
        0 == (a & 15) && (a >>= 4,
            b += 4);
        0 == (a & 3) && (a >>= 2,
            b += 2);
        0 == (a & 1) && ++b;
        return b
    }
    function bnGetLowestSetBit() {
        for (var a = 0; a < this.t; ++a) {
            if (0 != this[a]) {
                return a * this.DB + lbit(this[a])
            }
        }
        return 0 > this.s ? this.t * this.DB : -1
    }
    function cbit(a) {
        for (var b = 0; 0 != a; ) {
            a &= a - 1,
                ++b
        }
        return b
    }
    function bnBitCount() {
        for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) {
            a += cbit(this[c] ^ b)
        }
        return a
    }
    function bnTestBit(a) {
        var b = Math.floor(a / this.DB);
        return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
    }
    function bnpChangeBit(a, b) {
        var c = BigInteger.ONE.shiftLeft(a);
        this.bitwiseTo(c, b, c);
        return c
    }
    function bnSetBit(a) {
        return this.changeBit(a, op_or)
    }
    function bnClearBit(a) {
        return this.changeBit(a, op_andnot)
    }
    function bnFlipBit(a) {
        return this.changeBit(a, op_xor)
    }
    function bnpAddTo(a, b) {
        for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e; ) {
            d += this[c] + a[c],
                b[c++] = d & this.DM,
                d >>= this.DB
        }
        if (a.t < this.t) {
            for (d += a.s; c < this.t; ) {
                d += this[c],
                    b[c++] = d & this.DM,
                    d >>= this.DB
            }
            d += this.s
        } else {
            for (d += this.s; c < a.t; ) {
                d += a[c],
                    b[c++] = d & this.DM,
                    d >>= this.DB
            }
            d += a.s
        }
        b.s = 0 > d ? -1 : 0;
        0 < d ? b[c++] = d : -1 > d && (b[c++] = this.DV + d);
        b.t = c;
        b.clamp()
    }
    function bnAdd(a) {
        var b = nbi();
        this.addTo(a, b);
        return b
    }
    function bnSubtract(a) {
        var b = nbi();
        this.subTo(a, b);
        return b
    }
    function bnMultiply(a) {
        var b = nbi();
        this.multiplyTo(a, b);
        return b
    }
    function bnSquare() {
        var a = nbi();
        this.squareTo(a);
        return a
    }
    function bnDivide(a) {
        var b = nbi();
        this.divRemTo(a, b, null);
        return b
    }
    function bnRemainder(a) {
        var b = nbi();
        this.divRemTo(a, null, b);
        return b
    }
    function bnDivideAndRemainder(a) {
        var b = nbi()
            , c = nbi();
        this.divRemTo(a, b, c);
        return [b, c]
    }
    function bnpDMultiply(a) {
        this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp()
    }
    function bnpDAddOffset(a, b) {
        if (0 != a) {
            for (; this.t <= b; ) {
                this[this.t++] = 0
            }
            for (this[b] += a; this[b] >= this.DV; ) {
                this[b] -= this.DV,
                ++b >= this.t && (this[this.t++] = 0),
                    ++this[b]
            }
        }
    }
    function NullExp() {}
    function nNop(a) {
        return a
    }
    function nMulTo(a, b, c) {
        a.multiplyTo(b, c)
    }
    function nSqrTo(a, b) {
        a.squareTo(b)
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(a) {
        return this.exp(a, new NullExp)
    }
    function bnpMultiplyLowerTo(a, b, c) {
        var d = Math.min(this.t + a.t, b);
        c.s = 0;
        for (c.t = d; 0 < d; ) {
            c[--d] = 0
        }
        var e;
        for (e = c.t - this.t; d < e; ++d) {
            c[d + this.t] = this.am(0, a[d], c, d, 0, this.t)
        }
        for (e = Math.min(a.t, b); d < e; ++d) {
            this.am(0, a[d], c, d, 0, b - d)
        }
        c.clamp()
    }
    function bnpMultiplyUpperTo(a, b, c) {
        --b;
        var d = c.t = this.t + a.t - b;
        for (c.s = 0; 0 <= --d; ) {
            c[d] = 0
        }
        for (d = Math.max(b - this.t, 0); d < a.t; ++d) {
            c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b)
        }
        c.clamp();
        c.drShiftTo(1, c)
    }
    function Barrett(a) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
        this.mu = this.r2.divide(a);
        this.m = a
    }
    function barrettConvert(a) {
        if (0 > a.s || a.t > 2 * this.m.t) {
            return a.mod(this.m)
        }
        if (0 > a.compareTo(this.m)) {
            return a
        }
        var b = nbi();
        a.copyTo(b);
        this.reduce(b);
        return b
    }
    function barrettRevert(a) {
        return a
    }
    function barrettReduce(a) {
        a.drShiftTo(this.m.t - 1, this.r2);
        a.t > this.m.t + 1 && (a.t = this.m.t + 1,
            a.clamp());
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > a.compareTo(this.r2); ) {
            a.dAddOffset(1, this.m.t + 1)
        }
        for (a.subTo(this.r2, a); 0 <= a.compareTo(this.m); ) {
            a.subTo(this.m, a)
        }
    }
    function barrettSqrTo(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    function barrettMulTo(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(a, b) {
        var c = a.bitLength(), d, e = nbv(1), f;
        if (0 >= c) {
            return e
        }
        d = 18 > c ? 1 : 48 > c ? 3 : 144 > c ? 4 : 768 > c ? 5 : 6;
        f = 8 > c ? new Classic(b) : b.isEven() ? new Barrett(b) : new Montgomery(b);
        var g = []
            , h = 3
            , k = d - 1
            , l = (1 << d) - 1;
        g[1] = f.convert(this);
        if (1 < d) {
            for (c = nbi(),
                     f.sqrTo(g[1], c); h <= l; ) {
                g[h] = nbi(),
                    f.mulTo(c, g[h - 2], g[h]),
                    h += 2
            }
        }
        for (var p = a.t - 1, n, q = !0, m = nbi(), c = nbits(a[p]) - 1; 0 <= p; ) {
            c >= k ? n = a[p] >> c - k & l : (n = (a[p] & (1 << c + 1) - 1) << k - c,
            0 < p && (n |= a[p - 1] >> this.DB + c - k));
            for (h = d; 0 == (n & 1); ) {
                n >>= 1,
                    --h
            }
            0 > (c -= h) && (c += this.DB,
                --p);
            if (q) {
                g[n].copyTo(e),
                    q = !1
            } else {
                for (; 1 < h; ) {
                    f.sqrTo(e, m),
                        f.sqrTo(m, e),
                        h -= 2
                }
                0 < h ? f.sqrTo(e, m) : (h = e,
                    e = m,
                    m = h);
                f.mulTo(m, g[n], e)
            }
            for (; 0 <= p && 0 == (a[p] & 1 << c); ) {
                f.sqrTo(e, m),
                    h = e,
                    e = m,
                    m = h,
                0 > --c && (c = this.DB - 1,
                    --p)
            }
        }
        return f.revert(e)
    }
    function bnGCD(a) {
        var b = 0 > this.s ? this.negate() : this.clone();
        a = 0 > a.s ? a.negate() : a.clone();
        if (0 > b.compareTo(a)) {
            var c = b
                , b = a;
            a = c
        }
        var c = b.getLowestSetBit()
            , d = a.getLowestSetBit();
        if (0 > d) {
            return b
        }
        c < d && (d = c);
        0 < d && (b.rShiftTo(d, b),
            a.rShiftTo(d, a));
        for (; 0 < b.signum(); ) {
            0 < (c = b.getLowestSetBit()) && b.rShiftTo(c, b),
            0 < (c = a.getLowestSetBit()) && a.rShiftTo(c, a),
                0 <= b.compareTo(a) ? (b.subTo(a, b),
                    b.rShiftTo(1, b)) : (a.subTo(b, a),
                    a.rShiftTo(1, a))
        }
        0 < d && a.lShiftTo(d, a);
        return a
    }
    function bnpModInt(a) {
        if (0 >= a) {
            return 0
        }
        var b = this.DV % a
            , c = 0 > this.s ? a - 1 : 0;
        if (0 < this.t) {
            if (0 == b) {
                c = this[0] % a
            } else {
                for (var d = this.t - 1; 0 <= d; --d) {
                    c = (b * c + this[d]) % a
                }
            }
        }
        return c
    }
    function bnModInverse(a) {
        var b = a.isEven();
        if (this.isEven() && b || 0 == a.signum()) {
            return BigInteger.ZERO
        }
        for (var c = a.clone(), d = this.clone(), e = nbv(1), f = nbv(0), g = nbv(0), h = nbv(1); 0 != c.signum(); ) {
            for (; c.isEven(); ) {
                c.rShiftTo(1, c),
                    b ? (e.isEven() && f.isEven() || (e.addTo(this, e),
                        f.subTo(a, f)),
                        e.rShiftTo(1, e)) : f.isEven() || f.subTo(a, f),
                    f.rShiftTo(1, f)
            }
            for (; d.isEven(); ) {
                d.rShiftTo(1, d),
                    b ? (g.isEven() && h.isEven() || (g.addTo(this, g),
                        h.subTo(a, h)),
                        g.rShiftTo(1, g)) : h.isEven() || h.subTo(a, h),
                    h.rShiftTo(1, h)
            }
            0 <= c.compareTo(d) ? (c.subTo(d, c),
            b && e.subTo(g, e),
                f.subTo(h, f)) : (d.subTo(c, d),
            b && g.subTo(e, g),
                h.subTo(f, h))
        }
        if (0 != d.compareTo(BigInteger.ONE)) {
            return BigInteger.ZERO
        }
        if (0 <= h.compareTo(a)) {
            return h.subtract(a)
        }
        if (0 > h.signum()) {
            h.addTo(a, h)
        } else {
            return h
        }
        return 0 > h.signum() ? h.add(a) : h
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
        , lplim = 67108864 / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(a) {
        var b, c = this.abs();
        if (1 == c.t && c[0] <= lowprimes[lowprimes.length - 1]) {
            for (b = 0; b < lowprimes.length; ++b) {
                if (c[0] == lowprimes[b]) {
                    return !0
                }
            }
            return !1
        }
        if (c.isEven()) {
            return !1
        }
        for (b = 1; b < lowprimes.length; ) {
            for (var d = lowprimes[b], e = b + 1; e < lowprimes.length && d < lplim; ) {
                d *= lowprimes[e++]
            }
            for (d = c.modInt(d); b < e; ) {
                if (0 == d % lowprimes[b++]) {
                    return !1
                }
            }
        }
        return c.millerRabin(a)
    }
    function bnpMillerRabin(a) {
        var b = this.subtract(BigInteger.ONE)
            , c = b.getLowestSetBit();
        if (0 >= c) {
            return !1
        }
        var d = b.shiftRight(c);
        a = a + 1 >> 1;
        a > lowprimes.length && (a = lowprimes.length);
        for (var e = nbi(), f = 0; f < a; ++f) {
            e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
            var g = e.modPow(d, this);
            if (0 != g.compareTo(BigInteger.ONE) && 0 != g.compareTo(b)) {
                for (var h = 1; h++ < c && 0 != g.compareTo(b); ) {
                    if (g = g.modPowInt(2, this),
                    0 == g.compareTo(BigInteger.ONE)) {
                        return !1
                    }
                }
                if (0 != g.compareTo(b)) {
                    return !1
                }
            }
        }
        return !0
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    BigInteger.prototype.square = bnSquare;
    function Arcfour() {
        this.j = this.i = 0;
        this.S = []
    }
    function ARC4init(a) {
        var b, c, d;
        for (b = 0; 256 > b; ++b) {
            this.S[b] = b
        }
        for (b = c = 0; 256 > b; ++b) {
            c = c + this.S[b] + a[b % a.length] & 255,
                d = this.S[b],
                this.S[b] = this.S[c],
                this.S[c] = d
        }
        this.j = this.i = 0
    }
    function ARC4next() {
        var a;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        a = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = a;
        return this.S[a + this.S[this.i] & 255]
    }
    Arcfour.prototype.init = ARC4init;
    Arcfour.prototype.next = ARC4next;
    function prng_newstate() {
        return new Arcfour
    }
    var rng_psize = 256, rng_state, rng_pool, rng_pptr;
    function rng_seed_int(a) {
        rng_pool[rng_pptr++] ^= a & 255;
        rng_pool[rng_pptr++] ^= a >> 8 & 255;
        rng_pool[rng_pptr++] ^= a >> 16 & 255;
        rng_pool[rng_pptr++] ^= a >> 24 & 255;
        rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
    }
    function rng_seed_time() {
        rng_seed_int((new Date).getTime())
    }
    if (null == rng_pool) {
        rng_pool = [];
        rng_pptr = 0;
        var t;
        if ("Netscape" == navigator.appName && "5" > navigator.appVersion && window.crypto) {
            var z = window.crypto.random(32);
            for (t = 0; t < z.length; ++t) {
                rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
            }
        }
        for (; rng_pptr < rng_psize; ) {
            t = Math.floor(65536 * Math.random()),
                rng_pool[rng_pptr++] = t >>> 8,
                rng_pool[rng_pptr++] = t & 255
        }
        rng_pptr = 0;
        rng_seed_time()
    }
    function rng_get_byte() {
        if (null == rng_state) {
            rng_seed_time();
            rng_state = prng_newstate();
            rng_state.init(rng_pool);
            for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
                rng_pool[rng_pptr] = 0
            }
            rng_pptr = 0
        }
        return rng_state.next()
    }
    function rng_get_bytes(a) {
        var b;
        for (b = 0; b < a.length; ++b) {
            a[b] = rng_get_byte()
        }
    }
    function SecureRandom() {}
    SecureRandom.prototype.nextBytes = rng_get_bytes;
    var KJUR = {};
    "undefined" != typeof KJUR.crypto && KJUR.crypto || (KJUR.crypto = {});
    KJUR.crypto.Util = new function() {
        this.DIGESTINFOHEAD = {
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            ripemd160: "3021300906052b2403020105000414"
        };
        this.DEFAULTPROVIDER = {
            md5: "cryptojs",
            sha1: "cryptojs",
            sha224: "cryptojs",
            sha256: "cryptojs",
            sha384: "cryptojs",
            sha512: "cryptojs",
            ripemd160: "cryptojs",
            hmacmd5: "cryptojs",
            hmacsha1: "cryptojs",
            hmacsha224: "cryptojs",
            hmacsha256: "cryptojs",
            hmacsha384: "cryptojs",
            hmacsha512: "cryptojs",
            hmacripemd160: "cryptojs",
            sm3: "cryptojs",
            MD5withRSA: "cryptojs/jsrsa",
            SHA1withRSA: "cryptojs/jsrsa",
            SHA224withRSA: "cryptojs/jsrsa",
            SHA256withRSA: "cryptojs/jsrsa",
            SHA384withRSA: "cryptojs/jsrsa",
            SHA512withRSA: "cryptojs/jsrsa",
            RIPEMD160withRSA: "cryptojs/jsrsa",
            MD5withECDSA: "cryptojs/jsrsa",
            SHA1withECDSA: "cryptojs/jsrsa",
            SHA224withECDSA: "cryptojs/jsrsa",
            SHA256withECDSA: "cryptojs/jsrsa",
            SHA384withECDSA: "cryptojs/jsrsa",
            SHA512withECDSA: "cryptojs/jsrsa",
            RIPEMD160withECDSA: "cryptojs/jsrsa",
            SHA1withDSA: "cryptojs/jsrsa",
            SHA224withDSA: "cryptojs/jsrsa",
            SHA256withDSA: "cryptojs/jsrsa",
            MD5withRSAandMGF1: "cryptojs/jsrsa",
            SHA1withRSAandMGF1: "cryptojs/jsrsa",
            SHA224withRSAandMGF1: "cryptojs/jsrsa",
            SHA256withRSAandMGF1: "cryptojs/jsrsa",
            SHA384withRSAandMGF1: "cryptojs/jsrsa",
            SHA512withRSAandMGF1: "cryptojs/jsrsa",
            RIPEMD160withRSAandMGF1: "cryptojs/jsrsa"
        };
        this.CRYPTOJSMESSAGEDIGESTNAME = {
            md5: "CryptoJS.algo.MD5",
            sha1: "CryptoJS.algo.SHA1",
            sha224: "CryptoJS.algo.SHA224",
            sha256: "CryptoJS.algo.SHA256",
            sha384: "CryptoJS.algo.SHA384",
            sha512: "CryptoJS.algo.SHA512",
            ripemd160: "CryptoJS.algo.RIPEMD160",
            sm3: "CryptoJS.algo.SM3"
        };
        this.getDigestInfoHex = function(a, b) {
            if ("undefined" == typeof this.DIGESTINFOHEAD[b]) {
                throw "alg not supported in Util.DIGESTINFOHEAD: " + b
            }
            return this.DIGESTINFOHEAD[b] + a
        }
        ;
        this.getPaddedDigestInfoHex = function(a, b, c) {
            var d = this.getDigestInfoHex(a, b);
            a = c / 4;
            if (d.length + 22 > a) {
                throw "key is too short for SigAlg: keylen=" + c + "," + b
            }
            b = "00" + d;
            c = "";
            a = a - 4 - b.length;
            for (d = 0; d < a; d += 2) {
                c += "ff"
            }
            return "0001" + c + b
        }
        ;
        this.hashString = function(a, b) {
            return (new KJUR.crypto.MessageDigest({
                alg: b
            })).digestString(a)
        }
        ;
        this.hashHex = function(a, b) {
            return (new KJUR.crypto.MessageDigest({
                alg: b
            })).digestHex(a)
        }
        ;
        this.sha1 = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "sha1",
                prov: "cryptojs"
            })).digestString(a)
        }
        ;
        this.sha256 = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "sha256",
                prov: "cryptojs"
            })).digestString(a)
        }
        ;
        this.sha256Hex = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "sha256",
                prov: "cryptojs"
            })).digestHex(a)
        }
        ;
        this.sha512 = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "sha512",
                prov: "cryptojs"
            })).digestString(a)
        }
        ;
        this.sha512Hex = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "sha512",
                prov: "cryptojs"
            })).digestHex(a)
        }
        ;
        this.md5 = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "md5",
                prov: "cryptojs"
            })).digestString(a)
        }
        ;
        this.ripemd160 = function(a) {
            return (new KJUR.crypto.MessageDigest({
                alg: "ripemd160",
                prov: "cryptojs"
            })).digestString(a)
        }
        ;
        this.getCryptoJSMDByName = function(a) {}
    }
    ;
    KJUR.crypto.MessageDigest = function(a) {
        this.setAlgAndProvider = function(a, c) {
            null != a && void 0 === c && (c = KJUR.crypto.Util.DEFAULTPROVIDER[a]);
            if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:sm3:".indexOf(a) && "cryptojs" == c) {
                try {
                    this.md = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[a]).create()
                } catch (d) {
                    throw "setAlgAndProvider hash alg set fail alg=" + a + "/" + d
                }
                this.updateString = function(a) {
                    this.md.update(a)
                }
                ;
                this.updateHex = function(a) {
                    a = CryptoJS.enc.Hex.parse(a);
                    this.md.update(a)
                }
                ;
                this.digest = function() {
                    return this.md.finalize().toString(CryptoJS.enc.Hex)
                }
                ;
                this.digestString = function(a) {
                    this.updateString(a);
                    return this.digest()
                }
                ;
                this.digestHex = function(a) {
                    this.updateHex(a);
                    return this.digest()
                }
            }
            if (-1 != ":sha256:".indexOf(a) && "sjcl" == c) {
                try {
                    this.md = new sjcl.hash.sha256
                } catch (d) {
                    throw "setAlgAndProvider hash alg set fail alg=" + a + "/" + d
                }
                this.updateString = function(a) {
                    this.md.update(a)
                }
                ;
                this.updateHex = function(a) {
                    a = sjcl.codec.hex.toBits(a);
                    this.md.update(a)
                }
                ;
                this.digest = function() {
                    var a = this.md.finalize();
                    return sjcl.codec.hex.fromBits(a)
                }
                ;
                this.digestString = function(a) {
                    this.updateString(a);
                    return this.digest()
                }
                ;
                this.digestHex = function(a) {
                    this.updateHex(a);
                    return this.digest()
                }
            }
        }
        ;
        this.updateString = function(a) {
            throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
        }
        ;
        this.updateHex = function(a) {
            throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
        }
        ;
        this.digest = function() {
            throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName
        }
        ;
        this.digestString = function(a) {
            throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
        }
        ;
        this.digestHex = function(a) {
            throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
        }
        ;
        void 0 !== a && void 0 !== a.alg && (this.algName = a.alg,
        void 0 === a.prov && (this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]),
            this.setAlgAndProvider(this.algName, this.provName))
    }
    ;
    KJUR.crypto.Mac = function(a) {
        this.setAlgAndProvider = function(a, c) {
            null == a && (a = "hmacsha1");
            a = a.toLowerCase();
            if ("hmac" != a.substr(0, 4)) {
                throw "setAlgAndProvider unsupported HMAC alg: " + a
            }
            void 0 === c && (c = KJUR.crypto.Util.DEFAULTPROVIDER[a]);
            this.algProv = a + "/" + c;
            var d = a.substr(4);
            if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(d) && "cryptojs" == c) {
                try {
                    var e = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[d]);
                    this.mac = CryptoJS.algo.HMAC.create(e, this.pass)
                } catch (f) {
                    throw "setAlgAndProvider hash alg set fail hashAlg=" + d + "/" + f
                }
                this.updateString = function(a) {
                    this.mac.update(a)
                }
                ;
                this.updateHex = function(a) {
                    a = CryptoJS.enc.Hex.parse(a);
                    this.mac.update(a)
                }
                ;
                this.doFinal = function() {
                    return this.mac.finalize().toString(CryptoJS.enc.Hex)
                }
                ;
                this.doFinalString = function(a) {
                    this.updateString(a);
                    return this.doFinal()
                }
                ;
                this.doFinalHex = function(a) {
                    this.updateHex(a);
                    return this.doFinal()
                }
            }
        }
        ;
        this.updateString = function(a) {
            throw "updateString(str) not supported for this alg/prov: " + this.algProv
        }
        ;
        this.updateHex = function(a) {
            throw "updateHex(hex) not supported for this alg/prov: " + this.algProv
        }
        ;
        this.doFinal = function() {
            throw "digest() not supported for this alg/prov: " + this.algProv
        }
        ;
        this.doFinalString = function(a) {
            throw "digestString(str) not supported for this alg/prov: " + this.algProv
        }
        ;
        this.doFinalHex = function(a) {
            throw "digestHex(hex) not supported for this alg/prov: " + this.algProv
        }
        ;
        void 0 !== a && (void 0 !== a.pass && (this.pass = a.pass),
        void 0 !== a.alg && (this.algName = a.alg,
        void 0 === a.prov && (this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]),
            this.setAlgAndProvider(this.algName, this.provName)))
    }
    ;
    KJUR.crypto.Signature = function(a) {
        var b = null;
        this._setAlgNames = function() {
            this.algName.match(/^(.+)with(.+)$/) && (this.mdAlgName = RegExp.$1.toLowerCase(),
                this.pubkeyAlgName = RegExp.$2.toLowerCase())
        }
        ;
        this._zeroPaddingOfSignature = function(a, b) {
            for (var e = "", f = b / 4 - a.length, g = 0; g < f; g++) {
                e += "0"
            }
            return e + a
        }
        ;
        this.setAlgAndProvider = function(a, b) {
            this._setAlgNames();
            if ("cryptojs/jsrsa" != b) {
                throw "provider not supported: " + b
            }
            if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:sm3:".indexOf(this.mdAlgName)) {
                try {
                    this.md = new KJUR.crypto.MessageDigest({
                        alg: this.mdAlgName
                    })
                } catch (e) {
                    throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + e
                }
                this.init = function(a, c) {
                    var b = null;
                    try {
                        b = void 0 === c ? KEYUTIL.getKey(a) : KEYUTIL.getKey(a, c)
                    } catch (d) {
                        throw "init failed:" + d
                    }
                    if (!0 === b.isPrivate) {
                        this.prvKey = b,
                            this.state = "SIGN"
                    } else {
                        if (!0 === b.isPublic) {
                            this.pubKey = b,
                                this.state = "VERIFY"
                        } else {
                            throw "init failed.:" + b
                        }
                    }
                }
                ;
                this.initSign = function(a) {
                    "string" == typeof a.ecprvhex && "string" == typeof a.eccurvename ? (this.ecprvhex = a.ecprvhex,
                        this.eccurvename = a.eccurvename) : this.prvKey = a;
                    this.state = "SIGN"
                }
                ;
                this.initVerifyByPublicKey = function(a) {
                    "string" == typeof a.ecpubhex && "string" == typeof a.eccurvename ? (this.ecpubhex = a.ecpubhex,
                        this.eccurvename = a.eccurvename) : a instanceof KJUR.crypto.ECDSA ? this.pubKey = a : a instanceof RSAKey && (this.pubKey = a);
                    this.state = "VERIFY"
                }
                ;
                this.initVerifyByCertificatePEM = function(a) {
                    var c = new X509;
                    c.readCertPEM(a);
                    this.pubKey = c.subjectPublicKeyRSA;
                    this.state = "VERIFY"
                }
                ;
                this.updateString = function(a) {
                    this.md.updateString(a)
                }
                ;
                this.updateHex = function(a) {
                    this.md.updateHex(a)
                }
                ;
                this.sign = function() {
                    "sm2" != this.eccurvename && (this.sHashHex = this.md.digest());
                    if ("undefined" != typeof this.ecprvhex && "undefined" != typeof this.eccurvename) {
                        if ("sm2" == this.eccurvename) {
                            var a = new KJUR.crypto.SM3withSM2({
                                curve: this.eccurvename
                            })
                                , c = a.ecparams.G
                                , b = c.multiply(new BigInteger(this.ecprvhex,16))
                                , d = b.getX().toBigInteger().toRadix(16) + b.getY().toBigInteger().toRadix(16)
                                , b = new SM3Digest
                                , c = (new SM3Digest).GetZ(c, d)
                                , c = b.GetWords(b.GetHex(c).toString())
                                , d = CryptoJS.enc.Utf8.stringify(this.md.md._data)
                                , d = CryptoJS.enc.Utf8.parse(d).toString()
                                , d = b.GetWords(d)
                                , k = Array(b.GetDigestSize());
                            b.BlockUpdate(c, 0, c.length);
                            b.BlockUpdate(d, 0, d.length);
                            b.DoFinal(k, 0);
                            this.sHashHex = b.GetHex(k).toString()
                        } else {
                            a = new KJUR.crypto.ECDSA({
                                curve: this.eccurvename
                            })
                        }
                        this.hSign = a.signHex(this.sHashHex, this.ecprvhex)
                    } else {
                        if ("rsaandmgf1" == this.pubkeyAlgName) {
                            this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen)
                        } else {
                            if ("rsa" == this.pubkeyAlgName) {
                                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName)
                            } else {
                                if (this.prvKey instanceof KJUR.crypto.ECDSA) {
                                    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                                } else {
                                    if (this.prvKey instanceof KJUR.crypto.DSA) {
                                        this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                                    } else {
                                        throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                                    }
                                }
                            }
                        }
                    }
                    return this.hSign
                }
                ;
                this.signString = function(a) {
                    this.updateString(a);
                    this.sign()
                }
                ;
                this.signHex = function(a) {
                    this.updateHex(a);
                    this.sign()
                }
                ;
                this.verify = function(a) {
                    "sm2" != this.eccurvename && (this.sHashHex = this.md.digest());
                    if ("undefined" != typeof this.ecpubhex && "undefined" != typeof this.eccurvename) {
                        if ("sm2" == this.eccurvename) {
                            var c = new KJUR.crypto.SM3withSM2({
                                curve: this.eccurvename
                            })
                                , b = c.ecparams.G
                                , d = this.ecpubhex.substr(2, 128)
                                , k = new SM3Digest
                                , b = (new SM3Digest).GetZ(b, d)
                                , b = k.GetWords(k.GetHex(b).toString())
                                , d = CryptoJS.enc.Utf8.stringify(this.md.md._data)
                                , d = CryptoJS.enc.Utf8.parse(d).toString()
                                , d = k.GetWords(d)
                                , l = Array(k.GetDigestSize());
                            k.BlockUpdate(b, 0, b.length);
                            k.BlockUpdate(d, 0, d.length);
                            k.DoFinal(l, 0);
                            this.sHashHex = k.GetHex(l).toString()
                        } else {
                            c = new KJUR.crypto.ECDSA({
                                curve: this.eccurvename
                            })
                        }
                        return c.verifyHex(this.sHashHex, a, this.ecpubhex)
                    }
                    if ("rsaandmgf1" == this.pubkeyAlgName) {
                        return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, a, this.mdAlgName, this.pssSaltLen)
                    }
                    if ("rsa" == this.pubkeyAlgName || this.pubKey instanceof KJUR.crypto.ECDSA || this.pubKey instanceof KJUR.crypto.DSA) {
                        return this.pubKey.verifyWithMessageHash(this.sHashHex, a)
                    }
                    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                }
            }
        }
        ;
        this.init = function(a, b) {
            throw "init(key, pass) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.initVerifyByPublicKey = function(a) {
            throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.initVerifyByCertificatePEM = function(a) {
            throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.initSign = function(a) {
            throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.updateString = function(a) {
            throw "updateString(str) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.updateHex = function(a) {
            throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.sign = function() {
            throw "sign() not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.signString = function(a) {
            throw "digestString(str) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.signHex = function(a) {
            throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.verify = function(a) {
            throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName
        }
        ;
        this.initParams = a;
        if (void 0 !== a && (void 0 !== a.alg && (this.algName = a.alg,
            this.provName = void 0 === a.prov ? KJUR.crypto.Util.DEFAULTPROVIDER[this.algName] : a.prov,
            this.algProvName = this.algName + ":" + this.provName,
            this.setAlgAndProvider(this.algName, this.provName),
            this._setAlgNames()),
        void 0 !== a.psssaltlen && (this.pssSaltLen = a.psssaltlen),
        void 0 !== a.prvkeypem)) {
            if (void 0 !== a.prvkeypas) {
                throw "both prvkeypem and prvkeypas parameters not supported"
            }
            try {
                b = new RSAKey,
                    b.readPrivateKeyFromPEMString(a.prvkeypem),
                    this.initSign(b)
            } catch (c) {
                throw "fatal error to load pem private key: " + c
            }
        }
    }
    ;
    KJUR.crypto.OID = new function() {
        this.oidhex2name = {
            "2a864886f70d010101": "rsaEncryption",
            "2a8648ce3d0201": "ecPublicKey",
            "2a8648ce380401": "dsa",
            "2a8648ce3d030107": "secp256r1",
            "2b8104001f": "secp192k1",
            "2b81040021": "secp224r1",
            "2b8104000a": "secp256k1",
            "2b81040023": "secp521r1",
            "2b81040022": "secp384r1",
            "2a8648ce380403": "SHA1withDSA",
            "608648016503040301": "SHA224withDSA",
            "608648016503040302": "SHA256withDSA"
        }
    }
    ;
    function ECFieldElementFp(a, b) {
        this.x = b;
        this.q = a
    }
    function feFpEquals(a) {
        return a == this ? !0 : this.q.equals(a.q) && this.x.equals(a.x)
    }
    function feFpToBigInteger() {
        return this.x
    }
    function feFpNegate() {
        return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))
    }
    function feFpAdd(a) {
        return new ECFieldElementFp(this.q,this.x.add(a.toBigInteger()).mod(this.q))
    }
    function feFpSubtract(a) {
        return new ECFieldElementFp(this.q,this.x.subtract(a.toBigInteger()).mod(this.q))
    }
    function feFpMultiply(a) {
        return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger()).mod(this.q))
    }
    function feFpSquare() {
        return new ECFieldElementFp(this.q,this.x.square().mod(this.q))
    }
    function feFpDivide(a) {
        return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))
    }
    ECFieldElementFp.prototype.equals = feFpEquals;
    ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;
    ECFieldElementFp.prototype.negate = feFpNegate;
    ECFieldElementFp.prototype.add = feFpAdd;
    ECFieldElementFp.prototype.subtract = feFpSubtract;
    ECFieldElementFp.prototype.multiply = feFpMultiply;
    ECFieldElementFp.prototype.square = feFpSquare;
    ECFieldElementFp.prototype.divide = feFpDivide;
    function ECPointFp(a, b, c, d) {
        this.curve = a;
        this.x = b;
        this.y = c;
        this.z = null == d ? BigInteger.ONE : d;
        this.zinv = null
    }
    function pointFpGetX() {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
    }
    function pointFpGetY() {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
    }
    function pointFpEquals(a) {
        return a == this ? !0 : this.isInfinity() ? a.isInfinity() : a.isInfinity() ? this.isInfinity() : a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q).equals(BigInteger.ZERO) ? a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q).equals(BigInteger.ZERO) : !1
    }
    function pointFpIsInfinity() {
        return null == this.x && null == this.y ? !0 : this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO)
    }
    function pointFpNegate() {
        return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)
    }
    function pointFpAdd(a) {
        if (this.isInfinity()) {
            return a
        }
        if (a.isInfinity()) {
            return this
        }
        var b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q)
            , c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
        if (BigInteger.ZERO.equals(c)) {
            return BigInteger.ZERO.equals(b) ? this.twice() : this.curve.getInfinity()
        }
        var d = new BigInteger("3")
            , e = this.x.toBigInteger()
            , f = this.y.toBigInteger();
        a.x.toBigInteger();
        a.y.toBigInteger();
        var g = c.square()
            , h = g.multiply(c)
            , e = e.multiply(g)
            , g = b.square().multiply(this.z)
            , c = g.subtract(e.shiftLeft(1)).multiply(a.z).subtract(h).multiply(c).mod(this.curve.q)
            , b = e.multiply(d).multiply(b).subtract(f.multiply(h)).subtract(g.multiply(b)).multiply(a.z).add(b.multiply(h)).mod(this.curve.q);
        a = h.multiply(this.z).multiply(a.z).mod(this.curve.q);
        return new ECPointFp(this.curve,this.curve.fromBigInteger(c),this.curve.fromBigInteger(b),a)
    }
    function pointFpTwice() {
        if (this.isInfinity()) {
            return this
        }
        if (0 == this.y.toBigInteger().signum()) {
            return this.curve.getInfinity()
        }
        var a = new BigInteger("3")
            , b = this.x.toBigInteger()
            , c = this.y.toBigInteger()
            , d = c.multiply(this.z)
            , e = d.multiply(c).mod(this.curve.q)
            , c = this.curve.a.toBigInteger()
            , f = b.square().multiply(a);
        BigInteger.ZERO.equals(c) || (f = f.add(this.z.square().multiply(c)));
        f = f.mod(this.curve.q);
        c = f.square().subtract(b.shiftLeft(3).multiply(e)).shiftLeft(1).multiply(d).mod(this.curve.q);
        a = f.multiply(a).multiply(b).subtract(e.shiftLeft(1)).shiftLeft(2).multiply(e).subtract(f.square().multiply(f)).mod(this.curve.q);
        d = d.square().multiply(d).shiftLeft(3).mod(this.curve.q);
        return new ECPointFp(this.curve,this.curve.fromBigInteger(c),this.curve.fromBigInteger(a),d)
    }
    function pointFpMultiply(a) {
        if (this.isInfinity()) {
            return this
        }
        if (0 == a.signum()) {
            return this.curve.getInfinity()
        }
        var b = a.multiply(new BigInteger("3")), c = this.negate(), d = this, e;
        for (e = b.bitLength() - 2; 0 < e; --e) {
            var d = d.twice()
                , f = b.testBit(e)
                , g = a.testBit(e);
            f != g && (d = d.add(f ? this : c))
        }
        return d
    }
    function pointFpMultiplyTwo(a, b, c) {
        var d;
        d = a.bitLength() > c.bitLength() ? a.bitLength() - 1 : c.bitLength() - 1;
        for (var e = this.curve.getInfinity(), f = this.add(b); 0 <= d; ) {
            e = e.twice(),
                a.testBit(d) ? e = c.testBit(d) ? e.add(f) : e.add(this) : c.testBit(d) && (e = e.add(b)),
                --d
        }
        return e
    }
    ECPointFp.prototype.getX = pointFpGetX;
    ECPointFp.prototype.getY = pointFpGetY;
    ECPointFp.prototype.equals = pointFpEquals;
    ECPointFp.prototype.isInfinity = pointFpIsInfinity;
    ECPointFp.prototype.negate = pointFpNegate;
    ECPointFp.prototype.add = pointFpAdd;
    ECPointFp.prototype.twice = pointFpTwice;
    ECPointFp.prototype.multiply = pointFpMultiply;
    ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;
    function ECCurveFp(a, b, c) {
        this.q = a;
        this.a = this.fromBigInteger(b);
        this.b = this.fromBigInteger(c);
        this.infinity = new ECPointFp(this,null,null)
    }
    function curveFpGetQ() {
        return this.q
    }
    function curveFpGetA() {
        return this.a
    }
    function curveFpGetB() {
        return this.b
    }
    function curveFpEquals(a) {
        return a == this ? !0 : this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b)
    }
    function curveFpGetInfinity() {
        return this.infinity
    }
    function curveFpFromBigInteger(a) {
        return new ECFieldElementFp(this.q,a)
    }
    function curveFpDecodePointHex(a) {
        switch (parseInt(a.substr(0, 2), 16)) {
            case 0:
                return this.infinity;
            case 2:
            case 3:
                return null;
            case 4:
            case 6:
            case 7:
                var b = (a.length - 2) / 2
                    , c = a.substr(2, b);
                a = a.substr(b + 2, b);
                return new ECPointFp(this,this.fromBigInteger(new BigInteger(c,16)),this.fromBigInteger(new BigInteger(a,16)));
            default:
                return null
        }
    }
    ECCurveFp.prototype.getQ = curveFpGetQ;
    ECCurveFp.prototype.getA = curveFpGetA;
    ECCurveFp.prototype.getB = curveFpGetB;
    ECCurveFp.prototype.equals = curveFpEquals;
    ECCurveFp.prototype.getInfinity = curveFpGetInfinity;
    ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;
    ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;
    ECFieldElementFp.prototype.getByteLength = function() {
        return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
    }
    ;
    ECPointFp.prototype.getEncoded = function(a) {
        var b = function(a, c) {
            var b = a.toByteArrayUnsigned();
            if (c < b.length) {
                b = b.slice(b.length - c)
            } else {
                for (; c > b.length; ) {
                    b.unshift(0)
                }
            }
            return b
        }
            , c = this.getX().toBigInteger()
            , d = this.getY().toBigInteger()
            , c = b(c, 32);
        a ? d.isEven() ? c.unshift(2) : c.unshift(3) : (c.unshift(4),
            c = c.concat(b(d, 32)));
        return c
    }
    ;
    ECPointFp.decodeFrom = function(a, b) {
        var c = b.length - 1
            , d = b.slice(1, 1 + c / 2)
            , c = b.slice(1 + c / 2, 1 + c);
        d.unshift(0);
        c.unshift(0);
        d = new BigInteger(d);
        c = new BigInteger(c);
        return new ECPointFp(a,a.fromBigInteger(d),a.fromBigInteger(c))
    }
    ;
    ECPointFp.decodeFromHex = function(a, b) {
        b.substr(0, 2);
        var c = b.length - 2
            , d = b.substr(2, c / 2)
            , c = b.substr(2 + c / 2, c / 2)
            , d = new BigInteger(d,16)
            , c = new BigInteger(c,16);
        return new ECPointFp(a,a.fromBigInteger(d),a.fromBigInteger(c))
    }
    ;
    ECPointFp.prototype.add2D = function(a) {
        if (this.isInfinity()) {
            return a
        }
        if (a.isInfinity()) {
            return this
        }
        if (this.x.equals(a.x)) {
            return this.y.equals(a.y) ? this.twice() : this.curve.getInfinity()
        }
        var b = a.x.subtract(this.x)
            , b = a.y.subtract(this.y).divide(b);
        a = b.square().subtract(this.x).subtract(a.x);
        b = b.multiply(this.x.subtract(a)).subtract(this.y);
        return new ECPointFp(this.curve,a,b)
    }
    ;
    ECPointFp.prototype.twice2D = function() {
        if (this.isInfinity()) {
            return this
        }
        if (0 == this.y.toBigInteger().signum()) {
            return this.curve.getInfinity()
        }
        var a = this.curve.fromBigInteger(BigInteger.valueOf(2))
            , b = this.curve.fromBigInteger(BigInteger.valueOf(3))
            , b = this.x.square().multiply(b).add(this.curve.a).divide(this.y.multiply(a))
            , a = b.square().subtract(this.x.multiply(a))
            , b = b.multiply(this.x.subtract(a)).subtract(this.y);
        return new ECPointFp(this.curve,a,b)
    }
    ;
    ECPointFp.prototype.multiply2D = function(a) {
        if (this.isInfinity()) {
            return this
        }
        if (0 == a.signum()) {
            return this.curve.getInfinity()
        }
        var b = a.multiply(new BigInteger("3")), c = this.negate(), d = this, e;
        for (e = b.bitLength() - 2; 0 < e; --e) {
            var d = d.twice()
                , f = b.testBit(e)
                , g = a.testBit(e);
            f != g && (d = d.add2D(f ? this : c))
        }
        return d
    }
    ;
    ECPointFp.prototype.isOnCurve = function() {
        var a = this.getX().toBigInteger()
            , b = this.getY().toBigInteger()
            , c = this.curve.getA().toBigInteger()
            , d = this.curve.getB().toBigInteger()
            , e = this.curve.getQ()
            , b = b.multiply(b).mod(e)
            , a = a.multiply(a).multiply(a).add(c.multiply(a)).add(d).mod(e);
        return b.equals(a)
    }
    ;
    ECPointFp.prototype.toString = function() {
        return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")"
    }
    ;
    ECPointFp.prototype.validate = function() {
        var a = this.curve.getQ();
        if (this.isInfinity()) {
            throw Error("Point is at infinity.")
        }
        var b = this.getX().toBigInteger()
            , c = this.getY().toBigInteger();
        if (0 > b.compareTo(BigInteger.ONE) || 0 < b.compareTo(a.subtract(BigInteger.ONE))) {
            throw Error("x coordinate out of bounds")
        }
        if (0 > c.compareTo(BigInteger.ONE) || 0 < c.compareTo(a.subtract(BigInteger.ONE))) {
            throw Error("y coordinate out of bounds")
        }
        if (!this.isOnCurve()) {
            throw Error("Point is not on the curve.")
        }
        if (this.multiply(a).isInfinity()) {
            throw Error("Point is not a scalar multiple of G.")
        }
        return !0
    }
    ;
    "undefined" != typeof KJUR && KJUR || (KJUR = {});
    "undefined" != typeof KJUR.crypto && KJUR.crypto || (KJUR.crypto = {});
    KJUR.crypto.ECDSA = function(a) {
        var b = new SecureRandom;
        this.type = "EC";
        this.getBigRandom = function(a) {
            return (new BigInteger(a.bitLength(),b)).mod(a.subtract(BigInteger.ONE)).add(BigInteger.ONE)
        }
        ;
        this.setNamedCurve = function(a) {
            this.ecparams = KJUR.crypto.ECParameterDB.getByName(a);
            this.pubKeyHex = this.prvKeyHex = null;
            this.curveName = a
        }
        ;
        this.setPrivateKeyHex = function(a) {
            this.isPrivate = !0;
            this.prvKeyHex = a
        }
        ;
        this.setPublicKeyHex = function(a) {
            this.isPublic = !0;
            this.pubKeyHex = a
        }
        ;
        this.generateKeyPairHex = function() {
            var a = this.getBigRandom(this.ecparams.n)
                , b = this.ecparams.G.multiply(a)
                , e = b.getX().toBigInteger()
                , b = b.getY().toBigInteger()
                , f = this.ecparams.keylen / 4
                , a = ("0000000000" + a.toString(16)).slice(-f)
                , e = ("0000000000" + e.toString(16)).slice(-f)
                , b = ("0000000000" + b.toString(16)).slice(-f)
                , e = "04" + e + b;
            this.setPrivateKeyHex(a);
            this.setPublicKeyHex(e);
            return {
                ecprvhex: a,
                ecpubhex: e
            }
        }
        ;
        this.signWithMessageHash = function(a) {
            return this.signHex(a, this.prvKeyHex)
        }
        ;
        this.signHex = function(a, b) {
            var e = new BigInteger(b,16)
                , f = this.ecparams.n
                , g = new BigInteger(a,16);
            do {
                var h = this.getBigRandom(f)
                    , k = this.ecparams.G.multiply(h).getX().toBigInteger().mod(f)
            } while (0 >= k.compareTo(BigInteger.ZERO));
            e = h.modInverse(f).multiply(g.add(e.multiply(k))).mod(f);
            return KJUR.crypto.ECDSA.biRSSigToASN1Sig(k, e)
        }
        ;
        this.sign = function(a, b) {
            var e = this.ecparams.n
                , f = BigInteger.fromByteArrayUnsigned(a);
            do {
                var g = this.getBigRandom(e)
                    , h = this.ecparams.G.multiply(g).getX().toBigInteger().mod(e)
            } while (0 >= h.compareTo(BigInteger.ZERO));
            e = g.modInverse(e).multiply(f.add(b.multiply(h))).mod(e);
            return this.serializeSig(h, e)
        }
        ;
        this.verifyWithMessageHash = function(a, b) {
            return this.verifyHex(a, b, this.pubKeyHex)
        }
        ;
        this.verifyHex = function(a, b, e) {
            var f;
            f = KJUR.crypto.ECDSA.parseSigHex(b);
            b = f.r;
            f = f.s;
            e = ECPointFp.decodeFromHex(this.ecparams.curve, e);
            a = new BigInteger(a,16);
            return this.verifyRaw(a, b, f, e)
        }
        ;
        this.verify = function(a, b, e) {
            var f;
            if (Bitcoin.Util.isArray(b)) {
                b = this.parseSig(b),
                    f = b.r,
                    b = b.s
            } else {
                if ("object" === typeof b && b.r && b.s) {
                    f = b.r,
                        b = b.s
                } else {
                    throw "Invalid value for signature"
                }
            }
            if (!(e instanceof ECPointFp)) {
                if (Bitcoin.Util.isArray(e)) {
                    e = ECPointFp.decodeFrom(this.ecparams.curve, e)
                } else {
                    throw "Invalid format for pubkey value, must be byte array or ECPointFp"
                }
            }
            a = BigInteger.fromByteArrayUnsigned(a);
            return this.verifyRaw(a, f, b, e)
        }
        ;
        this.verifyRaw = function(a, b, e, f) {
            var g = this.ecparams.n
                , h = this.ecparams.G;
            if (0 > b.compareTo(BigInteger.ONE) || 0 <= b.compareTo(g) || 0 > e.compareTo(BigInteger.ONE) || 0 <= e.compareTo(g)) {
                return !1
            }
            e = e.modInverse(g);
            a = a.multiply(e).mod(g);
            e = b.multiply(e).mod(g);
            return h.multiply(a).add(f.multiply(e)).getX().toBigInteger().mod(g).equals(b)
        }
        ;
        this.serializeSig = function(a, b) {
            var e = a.toByteArraySigned()
                , f = b.toByteArraySigned()
                , g = [];
            g.push(2);
            g.push(e.length);
            g = g.concat(e);
            g.push(2);
            g.push(f.length);
            g = g.concat(f);
            g.unshift(g.length);
            g.unshift(48);
            return g
        }
        ;
        this.parseSig = function(a) {
            var b;
            if (48 != a[0]) {
                throw Error("Signature not a valid DERSequence")
            }
            b = 2;
            if (2 != a[b]) {
                throw Error("First element in signature must be a DERInteger")
            }
            var e = a.slice(b + 2, b + 2 + a[b + 1]);
            b += 2 + a[b + 1];
            if (2 != a[b]) {
                throw Error("Second element in signature must be a DERInteger")
            }
            a = a.slice(b + 2, b + 2 + a[b + 1]);
            e = BigInteger.fromByteArrayUnsigned(e);
            a = BigInteger.fromByteArrayUnsigned(a);
            return {
                r: e,
                s: a
            }
        }
        ;
        this.parseSigCompact = function(a) {
            if (65 !== a.length) {
                throw "Signature has the wrong length"
            }
            var b = a[0] - 27;
            if (0 > b || 7 < b) {
                throw "Invalid signature type"
            }
            var e = this.ecparams.n
                , f = BigInteger.fromByteArrayUnsigned(a.slice(1, 33)).mod(e);
            a = BigInteger.fromByteArrayUnsigned(a.slice(33, 65)).mod(e);
            return {
                r: f,
                s: a,
                i: b
            }
        }
        ;
        void 0 !== a && void 0 !== a.curve && (this.curveName = a.curve);
        void 0 === this.curveName && (this.curveName = "secp256r1");
        this.setNamedCurve(this.curveName);
        void 0 !== a && (void 0 !== a.prv && this.setPrivateKeyHex(a.prv),
        void 0 !== a.pub && this.setPublicKeyHex(a.pub))
    }
    ;
    KJUR.crypto.ECDSA.parseSigHex = function(a) {
        var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
        a = new BigInteger(b.r,16);
        b = new BigInteger(b.s,16);
        return {
            r: a,
            s: b
        }
    }
    ;
    KJUR.crypto.ECDSA.parseSigHexInHexRS = function(a) {
        if ("30" != a.substr(0, 2)) {
            throw "signature is not a ASN.1 sequence"
        }
        var b = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
        if (2 != b.length) {
            throw "number of signature ASN.1 sequence elements seem wrong"
        }
        var c = b[0]
            , b = b[1];
        if ("02" != a.substr(c, 2)) {
            throw "1st item of sequene of signature is not ASN.1 integer"
        }
        if ("02" != a.substr(b, 2)) {
            throw "2nd item of sequene of signature is not ASN.1 integer"
        }
        c = ASN1HEX.getHexOfV_AtObj(a, c);
        a = ASN1HEX.getHexOfV_AtObj(a, b);
        return {
            r: c,
            s: a
        }
    }
    ;
    KJUR.crypto.ECDSA.asn1SigToConcatSig = function(a) {
        var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
        a = b.r;
        b = b.s;
        "00" == a.substr(0, 2) && 8 == a.length / 2 * 8 % 128 && (a = a.substr(2));
        "00" == b.substr(0, 2) && 8 == b.length / 2 * 8 % 128 && (b = b.substr(2));
        if (0 != a.length / 2 * 8 % 128) {
            throw "unknown ECDSA sig r length error"
        }
        if (0 != b.length / 2 * 8 % 128) {
            throw "unknown ECDSA sig s length error"
        }
        return a + b
    }
    ;
    KJUR.crypto.ECDSA.concatSigToASN1Sig = function(a) {
        if (0 != a.length / 2 * 8 % 128) {
            throw "unknown ECDSA concatinated r-s sig  length error"
        }
        var b = a.substr(0, a.length / 2);
        a = a.substr(a.length / 2);
        return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(b, a)
    }
    ;
    KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function(a, b) {
        var c = new BigInteger(a,16)
            , d = new BigInteger(b,16);
        return KJUR.crypto.ECDSA.biRSSigToASN1Sig(c, d)
    }
    ;
    KJUR.crypto.ECDSA.biRSSigToASN1Sig = function(a, b) {
        var c = new KJUR.asn1.DERInteger({
            bigint: a
        })
            , d = new KJUR.asn1.DERInteger({
            bigint: b
        });
        return (new KJUR.asn1.DERSequence({
            array: [c, d]
        })).getEncodedHex()
    }
    ;
    (function() {
            var a = CryptoJS
                , b = a.lib
                , c = b.WordArray
                , d = b.Hasher
                , e = []
                , b = a.algo.SM3 = d.extend({
                _doReset: function() {
                    this._hash = new c.init([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214])
                },
                _doProcessBlock: function(a, b) {
                    for (var c = this._hash.words, d = c[0], l = c[1], p = c[2], n = c[3], q = c[4], m = 0; 80 > m; m++) {
                        if (16 > m) {
                            e[m] = a[b + m] | 0
                        } else {
                            var r = e[m - 3] ^ e[m - 8] ^ e[m - 14] ^ e[m - 16];
                            e[m] = r << 1 | r >>> 31
                        }
                        r = (d << 5 | d >>> 27) + q + e[m];
                        r = 20 > m ? r + ((l & p | ~l & n) + 1518500249) : 40 > m ? r + ((l ^ p ^ n) + 1859775393) : 60 > m ? r + ((l & p | l & n | p & n) - 1894007588) : r + ((l ^ p ^ n) - 899497514);
                        q = n;
                        n = p;
                        p = l << 30 | l >>> 2;
                        l = d;
                        d = r
                    }
                    c[0] = c[0] + d | 0;
                    c[1] = c[1] + l | 0;
                    c[2] = c[2] + p | 0;
                    c[3] = c[3] + n | 0;
                    c[4] = c[4] + q | 0
                },
                _doFinalize: function() {
                    var a = this._data
                        , b = a.words
                        , c = 8 * this._nDataBytes
                        , d = 8 * a.sigBytes;
                    b[d >>> 5] |= 128 << 24 - d % 32;
                    b[(d + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296);
                    b[(d + 64 >>> 9 << 4) + 15] = c;
                    a.sigBytes = 4 * b.length;
                    this._process();
                    return this._hash
                },
                clone: function() {
                    var a = d.clone.call(this);
                    a._hash = this._hash.clone();
                    return a
                }
            });
            a.SM3 = d._createHelper(b);
            a.HmacSM3 = d._createHmacHelper(b)
        }
    )();
    function SM3Digest() {
        this.BYTE_LENGTH = 64;
        this.xBuf = [];
        this.byteCount = this.xBufOff = 0;
        this.DIGEST_LENGTH = 32;
        this.v0 = [1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214];
        this.v0 = [1937774191, 1226093241, 388252375, -628488704, -1452330820, 372324522, -477237683, -1325724082];
        this.v = Array(8);
        this.v_ = Array(8);
        this.X0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.X = Array(68);
        this.xOff = 0;
        this.T_00_15 = 2043430169;
        this.T_16_63 = 2055708042;
        0 < arguments.length ? this.InitDigest(arguments[0]) : this.Init()
    }
    SM3Digest.prototype = {
        Init: function() {
            this.xBuf = Array(4);
            this.Reset()
        },
        InitDigest: function(a) {
            this.xBuf = Array(a.xBuf.length);
            Array.Copy(a.xBuf, 0, this.xBuf, 0, a.xBuf.length);
            this.xBufOff = a.xBufOff;
            this.byteCount = a.byteCount;
            Array.Copy(a.X, 0, this.X, 0, a.X.length);
            this.xOff = a.xOff;
            Array.Copy(a.v, 0, this.v, 0, a.v.length)
        },
        GetDigestSize: function() {
            return this.DIGEST_LENGTH
        },
        Reset: function() {
            this.xBufOff = this.byteCount = 0;
            Array.Clear(this.xBuf, 0, this.xBuf.length);
            Array.Copy(this.v0, 0, this.v, 0, this.v0.length);
            this.xOff = 0;
            Array.Copy(this.X0, 0, this.X, 0, this.X0.length)
        },
        GetByteLength: function() {
            return this.BYTE_LENGTH
        },
        ProcessBlock: function() {
            var a, b = this.X, c = Array(64);
            for (a = 16; 68 > a; a++) {
                b[a] = this.P1(b[a - 16] ^ b[a - 9] ^ this.ROTATE(b[a - 3], 15)) ^ this.ROTATE(b[a - 13], 7) ^ b[a - 6]
            }
            for (a = 0; 64 > a; a++) {
                c[a] = b[a] ^ b[a + 4]
            }
            var d = this.v
                , e = this.v_;
            Array.Copy(d, 0, e, 0, this.v0.length);
            var f, g;
            for (a = 0; 16 > a; a++) {
                g = this.ROTATE(e[0], 12),
                    f = Int32.parse(Int32.parse(g + e[4]) + this.ROTATE(this.T_00_15, a)),
                    f = this.ROTATE(f, 7),
                    g ^= f,
                    g = Int32.parse(Int32.parse(this.FF_00_15(e[0], e[1], e[2]) + e[3]) + g) + c[a],
                    f = Int32.parse(Int32.parse(this.GG_00_15(e[4], e[5], e[6]) + e[7]) + f) + b[a],
                    e[3] = e[2],
                    e[2] = this.ROTATE(e[1], 9),
                    e[1] = e[0],
                    e[0] = g,
                    e[7] = e[6],
                    e[6] = this.ROTATE(e[5], 19),
                    e[5] = e[4],
                    e[4] = this.P0(f)
            }
            for (a = 16; 64 > a; a++) {
                g = this.ROTATE(e[0], 12),
                    f = Int32.parse(Int32.parse(g + e[4]) + this.ROTATE(this.T_16_63, a)),
                    f = this.ROTATE(f, 7),
                    g ^= f,
                    g = Int32.parse(Int32.parse(this.FF_16_63(e[0], e[1], e[2]) + e[3]) + g) + c[a],
                    f = Int32.parse(Int32.parse(this.GG_16_63(e[4], e[5], e[6]) + e[7]) + f) + b[a],
                    e[3] = e[2],
                    e[2] = this.ROTATE(e[1], 9),
                    e[1] = e[0],
                    e[0] = g,
                    e[7] = e[6],
                    e[6] = this.ROTATE(e[5], 19),
                    e[5] = e[4],
                    e[4] = this.P0(f)
            }
            for (a = 0; 8 > a; a++) {
                d[a] ^= Int32.parse(e[a])
            }
            this.xOff = 0;
            Array.Copy(this.X0, 0, this.X, 0, this.X0.length)
        },
        ProcessWord: function(a, b) {
            var c = a[b] << 24
                , c = c | (a[++b] & 255) << 16
                , c = c | (a[++b] & 255) << 8
                , c = c | a[++b] & 255;
            this.X[this.xOff] = c;
            16 == ++this.xOff && this.ProcessBlock()
        },
        ProcessLength: function(a) {
            14 < this.xOff && this.ProcessBlock();
            this.X[14] = this.URShiftLong(a, 32);
            this.X[15] = a & 4294967295
        },
        IntToBigEndian: function(a, b, c) {
            b[c] = Int32.parseByte(this.URShift(a, 24));
            b[++c] = Int32.parseByte(this.URShift(a, 16));
            b[++c] = Int32.parseByte(this.URShift(a, 8));
            b[++c] = Int32.parseByte(a)
        },
        DoFinal: function(a, b) {
            this.Finish();
            for (var c = 0; 8 > c; c++) {
                this.IntToBigEndian(this.v[c], a, b + 4 * c)
            }
            this.Reset();
            for (var d = a.length, c = 0; c < d; c++) {
                a[c] &= 255
            }
            return this.DIGEST_LENGTH
        },
        Update: function(a) {
            this.xBuf[this.xBufOff++] = a;
            this.xBufOff == this.xBuf.length && (this.ProcessWord(this.xBuf, 0),
                this.xBufOff = 0);
            this.byteCount++
        },
        BlockUpdate: function(a, b, c) {
            for (; 0 != this.xBufOff && 0 < c; ) {
                this.Update(a[b]),
                    b++,
                    c--
            }
            for (; c > this.xBuf.length; ) {
                this.ProcessWord(a, b),
                    b += this.xBuf.length,
                    c -= this.xBuf.length,
                    this.byteCount += this.xBuf.length
            }
            for (; 0 < c; ) {
                this.Update(a[b]),
                    b++,
                    c--
            }
        },
        Finish: function() {
            var a = this.byteCount << 3;
            for (this.Update(128); 0 != this.xBufOff; ) {
                this.Update(0)
            }
            this.ProcessLength(a);
            this.ProcessBlock()
        },
        ROTATE: function(a, b) {
            return a << b | this.URShift(a, 32 - b)
        },
        P0: function(a) {
            return a ^ this.ROTATE(a, 9) ^ this.ROTATE(a, 17)
        },
        P1: function(a) {
            return a ^ this.ROTATE(a, 15) ^ this.ROTATE(a, 23)
        },
        FF_00_15: function(a, b, c) {
            return a ^ b ^ c
        },
        FF_16_63: function(a, b, c) {
            return a & b | a & c | b & c
        },
        GG_00_15: function(a, b, c) {
            return a ^ b ^ c
        },
        GG_16_63: function(a, b, c) {
            return a & b | ~a & c
        },
        URShift: function(a, b) {
            if (a > Int32.maxValue || a < Int32.minValue) {
                a = Int32.parse(a)
            }
            return 0 <= a ? a >> b : (a >> b) + (2 << ~b)
        },
        URShiftLong: function(a, b) {
            var c;
            c = new BigInteger;
            c.fromInt(a);
            if (0 <= c.signum()) {
                c = c.shiftRight(b).intValue()
            } else {
                var d = new BigInteger;
                d.fromInt(2);
                var e = ~b;
                c = "";
                if (0 > e) {
                    d = 64 + e;
                    for (e = 0; e < d; e++) {
                        c += "0"
                    }
                    d = new BigInteger;
                    d.fromInt(a >> b);
                    c = new BigInteger("10" + c,2);
                    c.toRadix(10);
                    c = c.add(d).toRadix(10)
                } else {
                    c = d.shiftLeft(~b).intValue(),
                        c = (a >> b) + c
                }
            }
            return c
        },
        GetZ: function(a, b) {
            var c = CryptoJS.enc.Utf8.parse("1234567812345678")
                , d = 32 * c.words.length;
            this.Update(d >> 8 & 255);
            this.Update(d & 255);
            c = this.GetWords(c.toString());
            this.BlockUpdate(c, 0, c.length);
            var c = this.GetWords(a.curve.a.toBigInteger().toRadix(16))
                , d = this.GetWords(a.curve.b.toBigInteger().toRadix(16))
                , e = this.GetWords(a.getX().toBigInteger().toRadix(16))
                , f = this.GetWords(a.getY().toBigInteger().toRadix(16))
                , g = this.GetWords(b.substr(0, 64))
                , h = this.GetWords(b.substr(64, 64));
            this.BlockUpdate(c, 0, c.length);
            this.BlockUpdate(d, 0, d.length);
            this.BlockUpdate(e, 0, e.length);
            this.BlockUpdate(f, 0, f.length);
            this.BlockUpdate(g, 0, g.length);
            this.BlockUpdate(h, 0, h.length);
            c = Array(this.GetDigestSize());
            this.DoFinal(c, 0);
            return c
        },
        GetWords: function(a) {
            for (var b = [], c = a.length, d = 0; d < c; d += 2) {
                b[b.length] = parseInt(a.substr(d, 2), 16)
            }
            return b
        },
        GetHex: function(a) {
            for (var b = [], c = 0, d = 0; d < 2 * a.length; d += 2) {
                b[d >>> 3] |= parseInt(a[c]) << 24 - d % 8 * 4,
                    c++
            }
            return new CryptoJS.lib.WordArray.init(b,a.length)
        }
    };
    Array.Clear = function(a, b, c) {
        for (var elm in a) {
            a[elm] = null
        }
    }
    ;
    Array.Copy = function(a, b, c, d, e) {
        a = a.slice(b, b + e);
        for (b = 0; b < a.length; b++) {
            c[d] = a[b],
                d++
        }
    }
    ;
    var Int32 = {
        minValue: -parseInt("10000000000000000000000000000000", 2),
        maxValue: 2147483647,
        parse: function(a) {
            if (a < this.minValue) {
                a = new Number(-a);
                a = a.toString(2);
                a = a.substr(a.length - 31, 31);
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.substr(c, 1)
                        , b = b + ("0" == d ? "1" : "0")
                }
                a = parseInt(b, 2);
                return a + 1
            }
            if (a > this.maxValue) {
                a = Number(a);
                a = a.toString(2);
                a = a.substr(a.length - 31, 31);
                b = "";
                for (c = 0; c < a.length; c++) {
                    d = a.substr(c, 1),
                        b += "0" == d ? "1" : "0"
                }
                a = parseInt(b, 2);
                return -(a + 1)
            }
            return a
        },
        parseByte: function(a) {
            if (0 > a) {
                a = new Number(-a);
                a = a.toString(2);
                a = a.substr(a.length - 8, 8);
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.substr(c, 1)
                        , b = b + ("0" == d ? "1" : "0")
                }
                return parseInt(b, 2) + 1
            }
            return 255 < a ? (a = Number(a),
                a = a.toString(2),
                parseInt(a.substr(a.length - 8, 8), 2)) : a
        }
    };
    "undefined" != typeof KJUR && KJUR || (KJUR = {});
    "undefined" != typeof KJUR.crypto && KJUR.crypto || (KJUR.crypto = {});
    KJUR.crypto.SM3withSM2 = function(a) {
        var b = new SecureRandom;
        this.type = "SM2";
        this.getBigRandom = function(a) {
            return (new BigInteger(a.bitLength(),b)).mod(a.subtract(BigInteger.ONE)).add(BigInteger.ONE)
        }
        ;
        this.setNamedCurve = function(a) {
            this.ecparams = KJUR.crypto.ECParameterDB.getByName(a);
            this.pubKeyHex = this.prvKeyHex = null;
            this.curveName = a
        }
        ;
        this.setPrivateKeyHex = function(a) {
            this.isPrivate = !0;
            this.prvKeyHex = a
        }
        ;
        this.setPublicKeyHex = function(a) {
            this.isPublic = !0;
            this.pubKeyHex = a
        }
        ;
        this.generateKeyPairHex = function() {
            var a = this.getBigRandom(this.ecparams.n)
                , b = this.ecparams.G.multiply(a)
                , e = b.getX().toBigInteger()
                , b = b.getY().toBigInteger()
                , f = this.ecparams.keylen / 4
                , a = ("0000000000" + a.toString(16)).slice(-f)
                , e = ("0000000000" + e.toString(16)).slice(-f)
                , b = ("0000000000" + b.toString(16)).slice(-f)
                , e = "04" + e + b;
            this.setPrivateKeyHex(a);
            this.setPublicKeyHex(e);
            return {
                ecprvhex: a,
                ecpubhex: e
            }
        }
        ;
        this.signWithMessageHash = function(a) {
            return this.signHex(a, this.prvKeyHex)
        }
        ;
        this.signHex = function(a, b) {
            var e = new BigInteger(b,16)
                , f = this.ecparams.n
                , g = new BigInteger(a,16)
                , h = null
                , k = null
                , l = k = null;
            do {
                do {
                    k = this.generateKeyPairHex(),
                        h = new BigInteger(k.ecprvhex,16),
                        k = ECPointFp.decodeFromHex(this.ecparams.curve, k.ecpubhex),
                        k = g.add(k.getX().toBigInteger()),
                        k = k.mod(f)
                } while (k.equals(BigInteger.ZERO) || k.add(h).equals(f));
                var p = e.add(BigInteger.ONE)
                    , p = p.modInverse(f)
                    , l = k.multiply(e)
                    , l = h.subtract(l).mod(f)
                    , l = p.multiply(l).mod(f)
            } while (l.equals(BigInteger.ZERO));
            return KJUR.crypto.ECDSA.biRSSigToASN1Sig(k, l)
        }
        ;
        this.sign = function(a, b) {
            var e = this.ecparams.n
                , f = BigInteger.fromByteArrayUnsigned(a);
            do {
                var g = this.getBigRandom(e)
                    , h = this.ecparams.G.multiply(g).getX().toBigInteger().mod(e)
            } while (0 >= h.compareTo(BigInteger.ZERO));
            e = g.modInverse(e).multiply(f.add(b.multiply(h))).mod(e);
            return this.serializeSig(h, e)
        }
        ;
        this.verifyWithMessageHash = function(a, b) {
            return this.verifyHex(a, b, this.pubKeyHex)
        }
        ;
        this.verifyHex = function(a, b, e) {
            var f;
            f = KJUR.crypto.ECDSA.parseSigHex(b);
            b = f.r;
            f = f.s;
            e = ECPointFp.decodeFromHex(this.ecparams.curve, e);
            a = new BigInteger(a,16);
            return this.verifyRaw(a, b, f, e)
        }
        ;
        this.verify = function(a, b, e) {
            var f;
            if (Bitcoin.Util.isArray(b)) {
                b = this.parseSig(b),
                    f = b.r,
                    b = b.s
            } else {
                if ("object" === typeof b && b.r && b.s) {
                    f = b.r,
                        b = b.s
                } else {
                    throw "Invalid value for signature"
                }
            }
            if (!(e instanceof ECPointFp)) {
                if (Bitcoin.Util.isArray(e)) {
                    e = ECPointFp.decodeFrom(this.ecparams.curve, e)
                } else {
                    throw "Invalid format for pubkey value, must be byte array or ECPointFp"
                }
            }
            a = BigInteger.fromByteArrayUnsigned(a);
            return this.verifyRaw(a, f, b, e)
        }
        ;
        this.verifyRaw = function(a, b, e, f) {
            var g = this.ecparams.n
                , h = this.ecparams.G
                , k = b.add(e).mod(g);
            if (k.equals(BigInteger.ZERO)) {
                return !1
            }
            e = h.multiply(e);
            e = e.add(f.multiply(k));
            a = a.add(e.getX().toBigInteger()).mod(g);
            return b.equals(a)
        }
        ;
        this.serializeSig = function(a, b) {
            var e = a.toByteArraySigned()
                , f = b.toByteArraySigned()
                , g = [];
            g.push(2);
            g.push(e.length);
            g = g.concat(e);
            g.push(2);
            g.push(f.length);
            g = g.concat(f);
            g.unshift(g.length);
            g.unshift(48);
            return g
        }
        ;
        this.parseSig = function(a) {
            var b;
            if (48 != a[0]) {
                throw Error("Signature not a valid DERSequence")
            }
            b = 2;
            if (2 != a[b]) {
                throw Error("First element in signature must be a DERInteger")
            }
            var e = a.slice(b + 2, b + 2 + a[b + 1]);
            b += 2 + a[b + 1];
            if (2 != a[b]) {
                throw Error("Second element in signature must be a DERInteger")
            }
            a = a.slice(b + 2, b + 2 + a[b + 1]);
            e = BigInteger.fromByteArrayUnsigned(e);
            a = BigInteger.fromByteArrayUnsigned(a);
            return {
                r: e,
                s: a
            }
        }
        ;
        this.parseSigCompact = function(a) {
            if (65 !== a.length) {
                throw "Signature has the wrong length"
            }
            var b = a[0] - 27;
            if (0 > b || 7 < b) {
                throw "Invalid signature type"
            }
            var e = this.ecparams.n
                , f = BigInteger.fromByteArrayUnsigned(a.slice(1, 33)).mod(e);
            a = BigInteger.fromByteArrayUnsigned(a.slice(33, 65)).mod(e);
            return {
                r: f,
                s: a,
                i: b
            }
        }
        ;
        void 0 !== a && void 0 !== a.curve && (this.curveName = a.curve);
        void 0 === this.curveName && (this.curveName = "sm2");
        this.setNamedCurve(this.curveName);
        void 0 !== a && (void 0 !== a.prv && this.setPrivateKeyHex(a.prv),
        void 0 !== a.pub && this.setPublicKeyHex(a.pub))
    }
    ;
    "undefined" != typeof KJUR && KJUR || (KJUR = {});
    "undefined" != typeof KJUR.crypto && KJUR.crypto || (KJUR.crypto = {});
    KJUR.crypto.ECParameterDB = new function() {
        var a = {}
            , b = {};
        this.getByName = function(c) {
            var d = c;
            "undefined" != typeof b[d] && (d = b[c]);
            if ("undefined" != typeof a[d]) {
                return a[d]
            }
            throw "unregistered EC curve name: " + d
        }
        ;
        this.regist = function(c, d, e, f, g, h, k, l, p, n, q, m) {
            a[c] = {};
            e = new BigInteger(e,16);
            f = new BigInteger(f,16);
            g = new BigInteger(g,16);
            h = new BigInteger(h,16);
            k = new BigInteger(k,16);
            e = new ECCurveFp(e,f,g);
            l = e.decodePointHex("04" + l + p);
            a[c].name = c;
            a[c].keylen = d;
            a[c].curve = e;
            a[c].G = l;
            a[c].n = h;
            a[c].h = k;
            a[c].oid = q;
            a[c].info = m;
            for (d = 0; d < n.length; d++) {
                b[n[d]] = c
            }
        }
    }
    ;
    KJUR.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field");
    KJUR.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field");
    KJUR.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field");
    KJUR.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []);
    KJUR.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []);
    KJUR.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []);
    KJUR.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []);
    KJUR.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]);
    KJUR.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]);
    KJUR.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]);
    KJUR.crypto.ECParameterDB.regist("sm2", 256, "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", "28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", "1", "32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7", "BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0", ["sm2", "SM2"]);
    SM2Cipher.prototype = {
        Reset: function() {
            this.sm3keybase = new SM3Digest;
            this.sm3c3 = new SM3Digest;
            for (var a = this.p2.getX().toBigInteger().toRadix(16); 64 > a.length; ) {
                a = "0" + a
            }
            for (var a = this.GetWords(a), b = this.p2.getY().toBigInteger().toRadix(16); 64 > b.length; ) {
                b = "0" + b
            }
            b = this.GetWords(b);
            this.sm3keybase.BlockUpdate(a, 0, a.length);
            this.sm3c3.BlockUpdate(a, 0, a.length);
            this.sm3keybase.BlockUpdate(b, 0, b.length);
            this.ct = 1;
            this.NextKey()
        },
        NextKey: function() {
            var a = new SM3Digest(this.sm3keybase);
            a.Update(this.ct >> 24 & 255);
            a.Update(this.ct >> 16 & 255);
            a.Update(this.ct >> 8 & 255);
            a.Update(this.ct & 255);
            a.DoFinal(this.key, 0);
            this.keyOff = 0;
            this.ct++
        },
        KDF: function(a) {
            var b = Array(a)
                , c = new SM3Digest
                , d = Array(32)
                , e = 1
                , f = a / 32;
            a %= 32;
            for (var g = this.p2.getX().toBigInteger().toRadix(16); 64 > g.length; ) {
                g = "0" + g
            }
            for (var g = this.GetWords(g), h = this.p2.getY().toBigInteger().toRadix(16); 64 > h.length; ) {
                h = "0" + h
            }
            for (var h = this.GetWords(h), k = 0, l = 0; l < f; l++) {
                c.BlockUpdate(g, 0, g.length),
                    c.BlockUpdate(h, 0, h.length),
                    c.Update(e >> 24 & 255),
                    c.Update(e >> 16 & 255),
                    c.Update(e >> 8 & 255),
                    c.Update(e & 255),
                    c.DoFinal(b, k),
                    k += 32,
                    e++
            }
            0 != a && (c.BlockUpdate(g, 0, g.length),
                c.BlockUpdate(h, 0, h.length),
                c.Update(e >> 24 & 255),
                c.Update(e >> 16 & 255),
                c.Update(e >> 8 & 255),
                c.Update(e & 255),
                c.DoFinal(d, 0));
            Array.Copy(d, 0, b, k, a);
            for (l = 0; l < b.length; l++) {
                b[l] &= 255
            }
            return b
        },
        InitEncipher: function(a) {
            var b = null
                , c = null
                , c = new KJUR.crypto.ECDSA({
                curve: "sm2"
            })
                , d = c.generateKeyPairHex()
                , b = new BigInteger(d.ecprvhex,16)
                , c = ECPointFp.decodeFromHex(c.ecparams.curve, d.ecpubhex);
            this.p2 = a.multiply(b);
            this.Reset();
            return c
        },
        EncryptBlock: function(a) {
            this.sm3c3.BlockUpdate(a, 0, a.length);
            for (var b = this.KDF(a.length), c = 0; c < a.length; c++) {
                a[c] ^= b[c]
            }
        },
        InitDecipher: function(a, b) {
            this.p2 = b.multiply(a);
            this.p2.getX().toBigInteger().toRadix(16);
            this.p2.getY().toBigInteger().toRadix(16);
            this.Reset()
        },
        DecryptBlock: function(a) {
            for (var b = this.KDF(a.length), c = 0, d = "", c = 0; c < b.length; c++) {
                d += b[c].toString(16)
            }
            for (c = 0; c < a.length; c++) {
                a[c] ^= b[c]
            }
            this.sm3c3.BlockUpdate(a, 0, a.length)
        },
        Dofinal: function(a) {
            for (var b = this.p2.getY().toBigInteger().toRadix(16); 64 > b.length; ) {
                b = "0" + b
            }
            b = this.GetWords(b);
            this.sm3c3.BlockUpdate(b, 0, b.length);
            this.sm3c3.DoFinal(a, 0);
            this.Reset()
        },
        Encrypt: function(a, b) {
            var c = Array(b.length);
            Array.Copy(b, 0, c, 0, b.length);
            var d = this.InitEncipher(a);
            this.EncryptBlock(c);
            var e = Array(32);
            this.Dofinal(e);
            for (var f = d.getX().toBigInteger().toRadix(16), d = d.getY().toBigInteger().toRadix(16); 64 > f.length; ) {
                f = "0" + f
            }
            for (; 64 > d.length; ) {
                d = "0" + d
            }
            f += d;
            c = this.GetHex(c).toString();
            0 != c.length % 2 && (c = "0" + c);
            e = this.GetHex(e).toString();
            d = f + c + e;
            this.cipherMode == SM2CipherMode.C1C3C2 && (d = f + e + c);
            return d
        },
        GetWords: function(a) {
            for (var b = [], c = a.length, d = 0; d < c; d += 2) {
                b[b.length] = parseInt(a.substr(d, 2), 16)
            }
            return b
        },
        GetHex: function(a) {
            for (var b = [], c = 0, d = 0; d < 2 * a.length; d += 2) {
                b[d >>> 3] |= parseInt(a[c]) << 24 - d % 8 * 4,
                    c++
            }
            return new CryptoJS.lib.WordArray.init(b,a.length)
        },
        Decrypt: function(a, b) {
            var c = b.substr(0, 64)
                , d = b.substr(0 + c.length, 64)
                , e = b.substr(c.length + d.length, b.length - c.length - d.length - 64)
                , f = b.substr(b.length - 64);
            this.cipherMode == SM2CipherMode.C1C3C2 && (f = b.substr(c.length + d.length, 64),
                e = b.substr(c.length + d.length + 64));
            e = this.GetWords(e);
            c = this.CreatePoint(c, d);
            this.InitDecipher(a, c);
            this.DecryptBlock(e);
            c = Array(32);
            this.Dofinal(c);
            return this.GetHex(c).toString() == f ? (f = this.GetHex(e),
                CryptoJS.enc.Utf8.stringify(f)) : ""
        },
        CreatePoint: function(a, b) {
            var c = new KJUR.crypto.ECDSA({
                curve: "sm2"
            });
            return ECPointFp.decodeFromHex(c.ecparams.curve, "04" + a + b)
        },
        changeToBigInteger: function(a, b) {
            return new BigInteger(a,b)
        }
    };
}(window));
function sm2Encrypt(e, g, c) {
    c = c == 0 ? c : 1;
    var b = CryptoJS.enc.Utf8.parse(e);
    b = CryptoJS.enc.Base64.stringify(b);
    b = CryptoJS.enc.Utf8.parse(b);
    var d = g;
    if (d.length > 64 * 2) {
        d = d.substr(d.length - 64 * 2)
    }
    var j = d.substr(0, 64);
    var h = d.substr(64);
    var f = new SM2Cipher(c);
    var a = f.CreatePoint(j, h);
    b = f.GetWords(b.toString());
    var i = f.Encrypt(a, b);
    return "04" + i
}
//public_key由前面的响应而来
var public_key = '04789757df8826b52cfaf5f5fe2fb293838131d4123e69670632574eb6a9225c7c400719157795cc0f775dbe42dfeaa5a2fd1131f53e62b4f4326737bbe02e2bbf'
console.log(sm2Encrypt("3532fetewt",public_key,0))