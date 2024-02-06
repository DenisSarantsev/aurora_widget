(() => {
    var __webpack_modules__ = {
        69: function(module) {
            !function(t, n) {
                true ? module.exports = n() : 0;
            }(0, (function() {
                function t(t, n) {
                    for (var r = 0; r < n.length; r++) {
                        var e = n[r];
                        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
                        Object.defineProperty(t, e.key, e);
                    }
                }
                function n(n, r, e) {
                    return r && t(n.prototype, r), e && t(n, e), n;
                }
                function r() {
                    return (r = Object.assign || function(t) {
                        for (var n = 1; n < arguments.length; n++) {
                            var r = arguments[n];
                            for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e]);
                        }
                        return t;
                    }).apply(this, arguments);
                }
                function e(t, n) {
                    t.prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
                }
                function i(t) {
                    return (i = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                        return t.__proto__ || Object.getPrototypeOf(t);
                    })(t);
                }
                function o(t, n) {
                    return (o = Object.setPrototypeOf || function(t, n) {
                        return t.__proto__ = n, t;
                    })(t, n);
                }
                function u(t, n, r) {
                    return (u = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
                            !0;
                        } catch (t) {
                            return !1;
                        }
                    }() ? Reflect.construct : function(t, n, r) {
                        var e = [ null ];
                        e.push.apply(e, n);
                        var i = new (Function.bind.apply(t, e));
                        return r && o(i, r.prototype), i;
                    }).apply(null, arguments);
                }
                function f(t) {
                    var n = "function" == typeof Map ? new Map : void 0;
                    return (f = function(t) {
                        if (null === t || -1 === Function.toString.call(t).indexOf("[native code]")) return t;
                        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                        if (void 0 !== n) {
                            if (n.has(t)) return n.get(t);
                            n.set(t, r);
                        }
                        function r() {
                            return u(t, arguments, i(this).constructor);
                        }
                        return r.prototype = Object.create(t.prototype, {
                            constructor: {
                                value: r,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), o(r, t);
                    })(t);
                }
                function s(t, n) {
                    try {
                        var r = t();
                    } catch (t) {
                        return n(t);
                    }
                    return r && r.then ? r.then(void 0, n) : r;
                }
                "undefined" != typeof Symbol && (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))), 
                "undefined" != typeof Symbol && (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")));
                var c, a = "2.9.7", h = function() {};
                !function(t) {
                    t[t.off = 0] = "off", t[t.error = 1] = "error", t[t.warning = 2] = "warning", t[t.info = 3] = "info", 
                    t[t.debug = 4] = "debug";
                }(c || (c = {}));
                var v = c.off, l = function() {
                    function t(t) {
                        this.t = t;
                    }
                    t.getLevel = function() {
                        return v;
                    }, t.setLevel = function(t) {
                        return v = c[t];
                    };
                    var n = t.prototype;
                    return n.error = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        this.i(console.error, c.error, n);
                    }, n.warn = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        this.i(console.warn, c.warning, n);
                    }, n.info = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        this.i(console.info, c.info, n);
                    }, n.debug = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        this.i(console.log, c.debug, n);
                    }, n.i = function(n, r, e) {
                        r <= t.getLevel() && n.apply(console, [ "[" + this.t + "] " ].concat(e));
                    }, t;
                }(), d = O, m = E, p = g, w = x, b = T, y = "/", P = new RegExp([ "(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?" ].join("|"), "g");
                function g(t, n) {
                    for (var r, e = [], i = 0, o = 0, u = "", f = n && n.delimiter || y, s = n && n.whitelist || void 0, c = !1; null !== (r = P.exec(t)); ) {
                        var a = r[0], h = r[1], v = r.index;
                        if (u += t.slice(o, v), o = v + a.length, h) u += h[1], c = !0; else {
                            var l = "", d = r[2], m = r[3], p = r[4], w = r[5];
                            if (!c && u.length) {
                                var b = u.length - 1, g = u[b];
                                (!s || s.indexOf(g) > -1) && (l = g, u = u.slice(0, b));
                            }
                            u && (e.push(u), u = "", c = !1);
                            var E = m || p, x = l || f;
                            e.push({
                                name: d || i++,
                                prefix: l,
                                delimiter: x,
                                optional: "?" === w || "*" === w,
                                repeat: "+" === w || "*" === w,
                                pattern: E ? A(E) : "[^" + k(x === f ? x : x + f) + "]+?"
                            });
                        }
                    }
                    return (u || o < t.length) && e.push(u + t.substr(o)), e;
                }
                function E(t, n) {
                    return function(r, e) {
                        var i = t.exec(r);
                        if (!i) return !1;
                        for (var o = i[0], u = i.index, f = {}, s = e && e.decode || decodeURIComponent, c = 1; c < i.length; c++) if (void 0 !== i[c]) {
                            var a = n[c - 1];
                            f[a.name] = a.repeat ? i[c].split(a.delimiter).map((function(t) {
                                return s(t, a);
                            })) : s(i[c], a);
                        }
                        return {
                            path: o,
                            index: u,
                            params: f
                        };
                    };
                }
                function x(t, n) {
                    for (var r = new Array(t.length), e = 0; e < t.length; e++) "object" == typeof t[e] && (r[e] = new RegExp("^(?:" + t[e].pattern + ")$", R(n)));
                    return function(n, e) {
                        for (var i = "", o = e && e.encode || encodeURIComponent, u = !e || !1 !== e.validate, f = 0; f < t.length; f++) {
                            var s = t[f];
                            if ("string" != typeof s) {
                                var c, a = n ? n[s.name] : void 0;
                                if (Array.isArray(a)) {
                                    if (!s.repeat) throw new TypeError('Expected "' + s.name + '" to not repeat, but got array');
                                    if (0 === a.length) {
                                        if (s.optional) continue;
                                        throw new TypeError('Expected "' + s.name + '" to not be empty');
                                    }
                                    for (var h = 0; h < a.length; h++) {
                                        if (c = o(a[h], s), u && !r[f].test(c)) throw new TypeError('Expected all "' + s.name + '" to match "' + s.pattern + '"');
                                        i += (0 === h ? s.prefix : s.delimiter) + c;
                                    }
                                } else if ("string" != typeof a && "number" != typeof a && "boolean" != typeof a) {
                                    if (!s.optional) throw new TypeError('Expected "' + s.name + '" to be ' + (s.repeat ? "an array" : "a string"));
                                } else {
                                    if (c = o(String(a), s), u && !r[f].test(c)) throw new TypeError('Expected "' + s.name + '" to match "' + s.pattern + '", but got "' + c + '"');
                                    i += s.prefix + c;
                                }
                            } else i += s;
                        }
                        return i;
                    };
                }
                function k(t) {
                    return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
                }
                function A(t) {
                    return t.replace(/([=!:$/()])/g, "\\$1");
                }
                function R(t) {
                    return t && t.sensitive ? "" : "i";
                }
                function T(t, n, r) {
                    for (var e = (r = r || {}).strict, i = !1 !== r.start, o = !1 !== r.end, u = r.delimiter || y, f = [].concat(r.endsWith || []).map(k).concat("$").join("|"), s = i ? "^" : "", c = 0; c < t.length; c++) {
                        var a = t[c];
                        if ("string" == typeof a) s += k(a); else {
                            var h = a.repeat ? "(?:" + a.pattern + ")(?:" + k(a.delimiter) + "(?:" + a.pattern + "))*" : a.pattern;
                            n && n.push(a), s += a.optional ? a.prefix ? "(?:" + k(a.prefix) + "(" + h + "))?" : "(" + h + ")?" : k(a.prefix) + "(" + h + ")";
                        }
                    }
                    if (o) e || (s += "(?:" + k(u) + ")?"), s += "$" === f ? "$" : "(?=" + f + ")"; else {
                        var v = t[t.length - 1], l = "string" == typeof v ? v[v.length - 1] === u : void 0 === v;
                        e || (s += "(?:" + k(u) + "(?=" + f + "))?"), l || (s += "(?=" + k(u) + "|" + f + ")");
                    }
                    return new RegExp(s, R(r));
                }
                function O(t, n, r) {
                    return t instanceof RegExp ? function(t, n) {
                        if (!n) return t;
                        var r = t.source.match(/\((?!\?)/g);
                        if (r) for (var e = 0; e < r.length; e++) n.push({
                            name: e,
                            prefix: null,
                            delimiter: null,
                            optional: !1,
                            repeat: !1,
                            pattern: null
                        });
                        return t;
                    }(t, n) : Array.isArray(t) ? function(t, n, r) {
                        for (var e = [], i = 0; i < t.length; i++) e.push(O(t[i], n, r).source);
                        return new RegExp("(?:" + e.join("|") + ")", R(r));
                    }(t, n, r) : function(t, n, r) {
                        return T(g(t, r), n, r);
                    }(t, n, r);
                }
                d.match = function(t, n) {
                    var r = [];
                    return E(O(t, r, n), r);
                }, d.regexpToFunction = m, d.parse = p, d.compile = function(t, n) {
                    return x(g(t, n), n);
                }, d.tokensToFunction = w, d.tokensToRegExp = b;
                var S = {
                    container: "container",
                    history: "history",
                    namespace: "namespace",
                    prefix: "data-barba",
                    prevent: "prevent",
                    wrapper: "wrapper"
                }, j = new (function() {
                    function t() {
                        this.o = S, this.u = new DOMParser;
                    }
                    var n = t.prototype;
                    return n.toString = function(t) {
                        return t.outerHTML;
                    }, n.toDocument = function(t) {
                        return this.u.parseFromString(t, "text/html");
                    }, n.toElement = function(t) {
                        var n = document.createElement("div");
                        return n.innerHTML = t, n;
                    }, n.getHtml = function(t) {
                        return void 0 === t && (t = document), this.toString(t.documentElement);
                    }, n.getWrapper = function(t) {
                        return void 0 === t && (t = document), t.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]');
                    }, n.getContainer = function(t) {
                        return void 0 === t && (t = document), t.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]');
                    }, n.removeContainer = function(t) {
                        document.body.contains(t) && t.parentNode.removeChild(t);
                    }, n.addContainer = function(t, n) {
                        var r = this.getContainer();
                        r ? this.s(t, r) : n.appendChild(t);
                    }, n.getNamespace = function(t) {
                        void 0 === t && (t = document);
                        var n = t.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
                        return n ? n.getAttribute(this.o.prefix + "-" + this.o.namespace) : null;
                    }, n.getHref = function(t) {
                        if (t.tagName && "a" === t.tagName.toLowerCase()) {
                            if ("string" == typeof t.href) return t.href;
                            var n = t.getAttribute("href") || t.getAttribute("xlink:href");
                            if (n) return this.resolveUrl(n.baseVal || n);
                        }
                        return null;
                    }, n.resolveUrl = function() {
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        var e = n.length;
                        if (0 === e) throw new Error("resolveUrl requires at least one argument; got none.");
                        var i = document.createElement("base");
                        if (i.href = arguments[0], 1 === e) return i.href;
                        var o = document.getElementsByTagName("head")[0];
                        o.insertBefore(i, o.firstChild);
                        for (var u, f = document.createElement("a"), s = 1; s < e; s++) f.href = arguments[s], 
                        i.href = u = f.href;
                        return o.removeChild(i), u;
                    }, n.s = function(t, n) {
                        n.parentNode.insertBefore(t, n.nextSibling);
                    }, t;
                }()), M = new (function() {
                    function t() {
                        this.h = [], this.v = -1;
                    }
                    var e = t.prototype;
                    return e.init = function(t, n) {
                        this.l = "barba";
                        var r = {
                            ns: n,
                            scroll: {
                                x: window.scrollX,
                                y: window.scrollY
                            },
                            url: t
                        };
                        this.h.push(r), this.v = 0;
                        var e = {
                            from: this.l,
                            index: 0,
                            states: [].concat(this.h)
                        };
                        window.history && window.history.replaceState(e, "", t);
                    }, e.change = function(t, n, r) {
                        if (r && r.state) {
                            var e = r.state, i = e.index;
                            n = this.m(this.v - i), this.replace(e.states), this.v = i;
                        } else this.add(t, n);
                        return n;
                    }, e.add = function(t, n) {
                        var r = this.size, e = this.p(n), i = {
                            ns: "tmp",
                            scroll: {
                                x: window.scrollX,
                                y: window.scrollY
                            },
                            url: t
                        };
                        this.h.push(i), this.v = r;
                        var o = {
                            from: this.l,
                            index: r,
                            states: [].concat(this.h)
                        };
                        switch (e) {
                          case "push":
                            window.history && window.history.pushState(o, "", t);
                            break;

                          case "replace":
                            window.history && window.history.replaceState(o, "", t);
                        }
                    }, e.update = function(t, n) {
                        var e = n || this.v, i = r({}, this.get(e), {}, t);
                        this.set(e, i);
                    }, e.remove = function(t) {
                        t ? this.h.splice(t, 1) : this.h.pop(), this.v--;
                    }, e.clear = function() {
                        this.h = [], this.v = -1;
                    }, e.replace = function(t) {
                        this.h = t;
                    }, e.get = function(t) {
                        return this.h[t];
                    }, e.set = function(t, n) {
                        return this.h[t] = n;
                    }, e.p = function(t) {
                        var n = "push", r = t, e = S.prefix + "-" + S.history;
                        return r.hasAttribute && r.hasAttribute(e) && (n = r.getAttribute(e)), n;
                    }, e.m = function(t) {
                        return Math.abs(t) > 1 ? t > 0 ? "forward" : "back" : 0 === t ? "popstate" : t > 0 ? "back" : "forward";
                    }, n(t, [ {
                        key: "current",
                        get: function() {
                            return this.h[this.v];
                        }
                    }, {
                        key: "state",
                        get: function() {
                            return this.h[this.h.length - 1];
                        }
                    }, {
                        key: "previous",
                        get: function() {
                            return this.v < 1 ? null : this.h[this.v - 1];
                        }
                    }, {
                        key: "size",
                        get: function() {
                            return this.h.length;
                        }
                    } ]), t;
                }()), L = function(t, n) {
                    try {
                        var r = function() {
                            if (!n.next.html) return Promise.resolve(t).then((function(t) {
                                var r = n.next;
                                if (t) {
                                    var e = j.toElement(t);
                                    r.namespace = j.getNamespace(e), r.container = j.getContainer(e), r.html = t, M.update({
                                        ns: r.namespace
                                    });
                                    var i = j.toDocument(t);
                                    document.title = i.title;
                                }
                            }));
                        }();
                        return Promise.resolve(r && r.then ? r.then((function() {})) : void 0);
                    } catch (t) {
                        return Promise.reject(t);
                    }
                }, $ = d, _ = {
                    __proto__: null,
                    update: L,
                    nextTick: function() {
                        return new Promise((function(t) {
                            window.requestAnimationFrame(t);
                        }));
                    },
                    pathToRegexp: $
                }, q = function() {
                    return window.location.origin;
                }, B = function(t) {
                    return void 0 === t && (t = window.location.href), U(t).port;
                }, U = function(t) {
                    var n, r = t.match(/:\d+/);
                    if (null === r) /^http/.test(t) && (n = 80), /^https/.test(t) && (n = 443); else {
                        var e = r[0].substring(1);
                        n = parseInt(e, 10);
                    }
                    var i, o = t.replace(q(), ""), u = {}, f = o.indexOf("#");
                    f >= 0 && (i = o.slice(f + 1), o = o.slice(0, f));
                    var s = o.indexOf("?");
                    return s >= 0 && (u = D(o.slice(s + 1)), o = o.slice(0, s)), {
                        hash: i,
                        path: o,
                        port: n,
                        query: u
                    };
                }, D = function(t) {
                    return t.split("&").reduce((function(t, n) {
                        var r = n.split("=");
                        return t[r[0]] = r[1], t;
                    }), {});
                }, F = function(t) {
                    return void 0 === t && (t = window.location.href), t.replace(/(\/#.*|\/|#.*)$/, "");
                }, H = {
                    __proto__: null,
                    getHref: function() {
                        return window.location.href;
                    },
                    getOrigin: q,
                    getPort: B,
                    getPath: function(t) {
                        return void 0 === t && (t = window.location.href), U(t).path;
                    },
                    parse: U,
                    parseQuery: D,
                    clean: F
                };
                function I(t, n, r) {
                    return void 0 === n && (n = 2e3), new Promise((function(e, i) {
                        var o = new XMLHttpRequest;
                        o.onreadystatechange = function() {
                            if (o.readyState === XMLHttpRequest.DONE) if (200 === o.status) e(o.responseText); else if (o.status) {
                                var n = {
                                    status: o.status,
                                    statusText: o.statusText
                                };
                                r(t, n), i(n);
                            }
                        }, o.ontimeout = function() {
                            var e = new Error("Timeout error [" + n + "]");
                            r(t, e), i(e);
                        }, o.onerror = function() {
                            var n = new Error("Fetch error");
                            r(t, n), i(n);
                        }, o.open("GET", t), o.timeout = n, o.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), 
                        o.setRequestHeader("x-barba", "yes"), o.send();
                    }));
                }
                var C = function(t) {
                    return !!t && ("object" == typeof t || "function" == typeof t) && "function" == typeof t.then;
                };
                function N(t, n) {
                    return void 0 === n && (n = {}), function() {
                        for (var r = arguments.length, e = new Array(r), i = 0; i < r; i++) e[i] = arguments[i];
                        var o = !1, u = new Promise((function(r, i) {
                            n.async = function() {
                                return o = !0, function(t, n) {
                                    t ? i(t) : r(n);
                                };
                            };
                            var u = t.apply(n, e);
                            o || (C(u) ? u.then(r, i) : r(u));
                        }));
                        return u;
                    };
                }
                var X = new (function(t) {
                    function n() {
                        var n;
                        return (n = t.call(this) || this).logger = new l("@barba/core"), n.all = [ "ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after" ], 
                        n.registered = new Map, n.init(), n;
                    }
                    e(n, t);
                    var r = n.prototype;
                    return r.init = function() {
                        var t = this;
                        this.registered.clear(), this.all.forEach((function(n) {
                            t[n] || (t[n] = function(r, e) {
                                t.registered.has(n) || t.registered.set(n, new Set), t.registered.get(n).add({
                                    ctx: e || {},
                                    fn: r
                                });
                            });
                        }));
                    }, r.do = function(t) {
                        for (var n = this, r = arguments.length, e = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) e[i - 1] = arguments[i];
                        if (this.registered.has(t)) {
                            var o = Promise.resolve();
                            return this.registered.get(t).forEach((function(t) {
                                o = o.then((function() {
                                    return N(t.fn, t.ctx).apply(void 0, e);
                                }));
                            })), o.catch((function(r) {
                                n.logger.debug("Hook error [" + t + "]"), n.logger.error(r);
                            }));
                        }
                        return Promise.resolve();
                    }, r.clear = function() {
                        var t = this;
                        this.all.forEach((function(n) {
                            delete t[n];
                        })), this.init();
                    }, r.help = function() {
                        this.logger.info("Available hooks: " + this.all.join(","));
                        var t = [];
                        this.registered.forEach((function(n, r) {
                            return t.push(r);
                        })), this.logger.info("Registered hooks: " + t.join(","));
                    }, n;
                }(h)), z = function() {
                    function t(t) {
                        if (this.P = [], "boolean" == typeof t) this.g = t; else {
                            var n = Array.isArray(t) ? t : [ t ];
                            this.P = n.map((function(t) {
                                return $(t);
                            }));
                        }
                    }
                    return t.prototype.checkHref = function(t) {
                        if ("boolean" == typeof this.g) return this.g;
                        var n = U(t).path;
                        return this.P.some((function(t) {
                            return null !== t.exec(n);
                        }));
                    }, t;
                }(), G = function(t) {
                    function n(n) {
                        var r;
                        return (r = t.call(this, n) || this).k = new Map, r;
                    }
                    e(n, t);
                    var i = n.prototype;
                    return i.set = function(t, n, r) {
                        return this.k.set(t, {
                            action: r,
                            request: n
                        }), {
                            action: r,
                            request: n
                        };
                    }, i.get = function(t) {
                        return this.k.get(t);
                    }, i.getRequest = function(t) {
                        return this.k.get(t).request;
                    }, i.getAction = function(t) {
                        return this.k.get(t).action;
                    }, i.has = function(t) {
                        return !this.checkHref(t) && this.k.has(t);
                    }, i.delete = function(t) {
                        return this.k.delete(t);
                    }, i.update = function(t, n) {
                        var e = r({}, this.k.get(t), {}, n);
                        return this.k.set(t, e), e;
                    }, n;
                }(z), Q = function() {
                    return !window.history.pushState;
                }, W = function(t) {
                    return !t.el || !t.href;
                }, J = function(t) {
                    var n = t.event;
                    return n.which > 1 || n.metaKey || n.ctrlKey || n.shiftKey || n.altKey;
                }, K = function(t) {
                    var n = t.el;
                    return n.hasAttribute("target") && "_blank" === n.target;
                }, V = function(t) {
                    var n = t.el;
                    return void 0 !== n.protocol && window.location.protocol !== n.protocol || void 0 !== n.hostname && window.location.hostname !== n.hostname;
                }, Y = function(t) {
                    var n = t.el;
                    return void 0 !== n.port && B() !== B(n.href);
                }, Z = function(t) {
                    var n = t.el;
                    return n.getAttribute && "string" == typeof n.getAttribute("download");
                }, tt = function(t) {
                    return t.el.hasAttribute(S.prefix + "-" + S.prevent);
                }, nt = function(t) {
                    return Boolean(t.el.closest("[" + S.prefix + "-" + S.prevent + '="all"]'));
                }, rt = function(t) {
                    var n = t.href;
                    return F(n) === F() && B(n) === B();
                }, et = function(t) {
                    function n(n) {
                        var r;
                        return (r = t.call(this, n) || this).suite = [], r.tests = new Map, r.init(), r;
                    }
                    e(n, t);
                    var r = n.prototype;
                    return r.init = function() {
                        this.add("pushState", Q), this.add("exists", W), this.add("newTab", J), this.add("blank", K), 
                        this.add("corsDomain", V), this.add("corsPort", Y), this.add("download", Z), this.add("preventSelf", tt), 
                        this.add("preventAll", nt), this.add("sameUrl", rt, !1);
                    }, r.add = function(t, n, r) {
                        void 0 === r && (r = !0), this.tests.set(t, n), r && this.suite.push(t);
                    }, r.run = function(t, n, r, e) {
                        return this.tests.get(t)({
                            el: n,
                            event: r,
                            href: e
                        });
                    }, r.checkLink = function(t, n, r) {
                        var e = this;
                        return this.suite.some((function(i) {
                            return e.run(i, t, n, r);
                        }));
                    }, n;
                }(z), it = function(t) {
                    function n(r, e) {
                        var i;
                        void 0 === e && (e = "Barba error");
                        for (var o = arguments.length, u = new Array(o > 2 ? o - 2 : 0), f = 2; f < o; f++) u[f - 2] = arguments[f];
                        return (i = t.call.apply(t, [ this ].concat(u)) || this).error = r, i.label = e, 
                        Error.captureStackTrace && Error.captureStackTrace(function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t;
                        }(i), n), i.name = "BarbaError", i;
                    }
                    return e(n, t), n;
                }(f(Error)), ot = function() {
                    function t(t) {
                        void 0 === t && (t = []), this.logger = new l("@barba/core"), this.all = [], this.page = [], 
                        this.once = [], this.A = [ {
                            name: "namespace",
                            type: "strings"
                        }, {
                            name: "custom",
                            type: "function"
                        } ], t && (this.all = this.all.concat(t)), this.update();
                    }
                    var n = t.prototype;
                    return n.add = function(t, n) {
                        switch (t) {
                          case "rule":
                            this.A.splice(n.position || 0, 0, n.value);
                            break;

                          case "transition":
                          default:
                            this.all.push(n);
                        }
                        this.update();
                    }, n.resolve = function(t, n) {
                        var r = this;
                        void 0 === n && (n = {});
                        var e = n.once ? this.once : this.page;
                        e = e.filter(n.self ? function(t) {
                            return t.name && "self" === t.name;
                        } : function(t) {
                            return !t.name || "self" !== t.name;
                        });
                        var i = new Map, o = e.find((function(e) {
                            var o = !0, u = {};
                            return !(!n.self || "self" !== e.name) || (r.A.reverse().forEach((function(n) {
                                o && (o = r.R(e, n, t, u), e.from && e.to && (o = r.R(e, n, t, u, "from") && r.R(e, n, t, u, "to")), 
                                e.from && !e.to && (o = r.R(e, n, t, u, "from")), !e.from && e.to && (o = r.R(e, n, t, u, "to")));
                            })), i.set(e, u), o);
                        })), u = i.get(o), f = [];
                        if (f.push(n.once ? "once" : "page"), n.self && f.push("self"), u) {
                            var s, c = [ o ];
                            Object.keys(u).length > 0 && c.push(u), (s = this.logger).info.apply(s, [ "Transition found [" + f.join(",") + "]" ].concat(c));
                        } else this.logger.info("No transition found [" + f.join(",") + "]");
                        return o;
                    }, n.update = function() {
                        var t = this;
                        this.all = this.all.map((function(n) {
                            return t.T(n);
                        })).sort((function(t, n) {
                            return t.priority - n.priority;
                        })).reverse().map((function(t) {
                            return delete t.priority, t;
                        })), this.page = this.all.filter((function(t) {
                            return void 0 !== t.leave || void 0 !== t.enter;
                        })), this.once = this.all.filter((function(t) {
                            return void 0 !== t.once;
                        }));
                    }, n.R = function(t, n, r, e, i) {
                        var o = !0, u = !1, f = t, s = n.name, c = s, a = s, h = s, v = i ? f[i] : f, l = "to" === i ? r.next : r.current;
                        if (i ? v && v[s] : v[s]) {
                            switch (n.type) {
                              case "strings":
                              default:
                                var d = Array.isArray(v[c]) ? v[c] : [ v[c] ];
                                l[c] && -1 !== d.indexOf(l[c]) && (u = !0), -1 === d.indexOf(l[c]) && (o = !1);
                                break;

                              case "object":
                                var m = Array.isArray(v[a]) ? v[a] : [ v[a] ];
                                l[a] ? (l[a].name && -1 !== m.indexOf(l[a].name) && (u = !0), -1 === m.indexOf(l[a].name) && (o = !1)) : o = !1;
                                break;

                              case "function":
                                v[h](r) ? u = !0 : o = !1;
                            }
                            u && (i ? (e[i] = e[i] || {}, e[i][s] = f[i][s]) : e[s] = f[s]);
                        }
                        return o;
                    }, n.O = function(t, n, r) {
                        var e = 0;
                        return (t[n] || t.from && t.from[n] || t.to && t.to[n]) && (e += Math.pow(10, r), 
                        t.from && t.from[n] && (e += 1), t.to && t.to[n] && (e += 2)), e;
                    }, n.T = function(t) {
                        var n = this;
                        t.priority = 0;
                        var r = 0;
                        return this.A.forEach((function(e, i) {
                            r += n.O(t, e.name, i + 1);
                        })), t.priority = r, t;
                    }, t;
                }(), ut = function() {
                    function t(t) {
                        void 0 === t && (t = []), this.logger = new l("@barba/core"), this.S = !1, this.store = new ot(t);
                    }
                    var r = t.prototype;
                    return r.get = function(t, n) {
                        return this.store.resolve(t, n);
                    }, r.doOnce = function(t) {
                        var n = t.data, r = t.transition;
                        try {
                            var e = function() {
                                i.S = !1;
                            }, i = this, o = r || {};
                            i.S = !0;
                            var u = s((function() {
                                return Promise.resolve(i.j("beforeOnce", n, o)).then((function() {
                                    return Promise.resolve(i.once(n, o)).then((function() {
                                        return Promise.resolve(i.j("afterOnce", n, o)).then((function() {}));
                                    }));
                                }));
                            }), (function(t) {
                                i.S = !1, i.logger.debug("Transition error [before/after/once]"), i.logger.error(t);
                            }));
                            return Promise.resolve(u && u.then ? u.then(e) : e());
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.doPage = function(t) {
                        var n = t.data, r = t.transition, e = t.page, i = t.wrapper;
                        try {
                            var o = function(t) {
                                if (u) return t;
                                f.S = !1;
                            }, u = !1, f = this, c = r || {}, a = !0 === c.sync || !1;
                            f.S = !0;
                            var h = s((function() {
                                function t() {
                                    return Promise.resolve(f.j("before", n, c)).then((function() {
                                        var t = !1;
                                        function r(r) {
                                            return t ? r : Promise.resolve(f.remove(n)).then((function() {
                                                return Promise.resolve(f.j("after", n, c)).then((function() {}));
                                            }));
                                        }
                                        var o = function() {
                                            if (a) return s((function() {
                                                return Promise.resolve(f.add(n, i)).then((function() {
                                                    return Promise.resolve(f.j("beforeLeave", n, c)).then((function() {
                                                        return Promise.resolve(f.j("beforeEnter", n, c)).then((function() {
                                                            return Promise.resolve(Promise.all([ f.leave(n, c), f.enter(n, c) ])).then((function() {
                                                                return Promise.resolve(f.j("afterLeave", n, c)).then((function() {
                                                                    return Promise.resolve(f.j("afterEnter", n, c)).then((function() {}));
                                                                }));
                                                            }));
                                                        }));
                                                    }));
                                                }));
                                            }), (function(t) {
                                                if (f.M(t)) throw new it(t, "Transition error [sync]");
                                            }));
                                            var r = function(r) {
                                                return t ? r : s((function() {
                                                    var t = function() {
                                                        if (!1 !== o) return Promise.resolve(f.add(n, i)).then((function() {
                                                            return Promise.resolve(f.j("beforeEnter", n, c)).then((function() {
                                                                return Promise.resolve(f.enter(n, c, o)).then((function() {
                                                                    return Promise.resolve(f.j("afterEnter", n, c)).then((function() {}));
                                                                }));
                                                            }));
                                                        }));
                                                    }();
                                                    if (t && t.then) return t.then((function() {}));
                                                }), (function(t) {
                                                    if (f.M(t)) throw new it(t, "Transition error [before/after/enter]");
                                                }));
                                            }, o = !1, u = s((function() {
                                                return Promise.resolve(f.j("beforeLeave", n, c)).then((function() {
                                                    return Promise.resolve(Promise.all([ f.leave(n, c), L(e, n) ]).then((function(t) {
                                                        return t[0];
                                                    }))).then((function(t) {
                                                        return o = t, Promise.resolve(f.j("afterLeave", n, c)).then((function() {}));
                                                    }));
                                                }));
                                            }), (function(t) {
                                                if (f.M(t)) throw new it(t, "Transition error [before/after/leave]");
                                            }));
                                            return u && u.then ? u.then(r) : r(u);
                                        }();
                                        return o && o.then ? o.then(r) : r(o);
                                    }));
                                }
                                var r = function() {
                                    if (a) return Promise.resolve(L(e, n)).then((function() {}));
                                }();
                                return r && r.then ? r.then(t) : t();
                            }), (function(t) {
                                if (f.S = !1, t.name && "BarbaError" === t.name) throw f.logger.debug(t.label), 
                                f.logger.error(t.error), t;
                                throw f.logger.debug("Transition error [page]"), f.logger.error(t), t;
                            }));
                            return Promise.resolve(h && h.then ? h.then(o) : o(h));
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.once = function(t, n) {
                        try {
                            return Promise.resolve(X.do("once", t, n)).then((function() {
                                return n.once ? N(n.once, n)(t) : Promise.resolve();
                            }));
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.leave = function(t, n) {
                        try {
                            return Promise.resolve(X.do("leave", t, n)).then((function() {
                                return n.leave ? N(n.leave, n)(t) : Promise.resolve();
                            }));
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.enter = function(t, n, r) {
                        try {
                            return Promise.resolve(X.do("enter", t, n)).then((function() {
                                return n.enter ? N(n.enter, n)(t, r) : Promise.resolve();
                            }));
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.add = function(t, n) {
                        try {
                            return j.addContainer(t.next.container, n), X.do("nextAdded", t), Promise.resolve();
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.remove = function(t) {
                        try {
                            return j.removeContainer(t.current.container), X.do("currentRemoved", t), Promise.resolve();
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, r.M = function(t) {
                        return t.message ? !/Timeout error|Fetch error/.test(t.message) : !t.status;
                    }, r.j = function(t, n, r) {
                        try {
                            return Promise.resolve(X.do(t, n, r)).then((function() {
                                return r[t] ? N(r[t], r)(n) : Promise.resolve();
                            }));
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, n(t, [ {
                        key: "isRunning",
                        get: function() {
                            return this.S;
                        },
                        set: function(t) {
                            this.S = t;
                        }
                    }, {
                        key: "hasOnce",
                        get: function() {
                            return this.store.once.length > 0;
                        }
                    }, {
                        key: "hasSelf",
                        get: function() {
                            return this.store.all.some((function(t) {
                                return "self" === t.name;
                            }));
                        }
                    }, {
                        key: "shouldWait",
                        get: function() {
                            return this.store.all.some((function(t) {
                                return t.to && !t.to.route || t.sync;
                            }));
                        }
                    } ]), t;
                }(), ft = function() {
                    function t(t) {
                        var n = this;
                        this.names = [ "beforeLeave", "afterLeave", "beforeEnter", "afterEnter" ], this.byNamespace = new Map, 
                        0 !== t.length && (t.forEach((function(t) {
                            n.byNamespace.set(t.namespace, t);
                        })), this.names.forEach((function(t) {
                            X[t](n.L(t));
                        })));
                    }
                    return t.prototype.L = function(t) {
                        var n = this;
                        return function(r) {
                            var e = t.match(/enter/i) ? r.next : r.current, i = n.byNamespace.get(e.namespace);
                            return i && i[t] ? N(i[t], i)(r) : Promise.resolve();
                        };
                    }, t;
                }();
                Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), 
                Element.prototype.closest || (Element.prototype.closest = function(t) {
                    var n = this;
                    do {
                        if (n.matches(t)) return n;
                        n = n.parentElement || n.parentNode;
                    } while (null !== n && 1 === n.nodeType);
                    return null;
                });
                var st = {
                    container: null,
                    html: "",
                    namespace: "",
                    url: {
                        hash: "",
                        href: "",
                        path: "",
                        port: null,
                        query: {}
                    }
                };
                return new (function() {
                    function t() {
                        this.version = a, this.schemaPage = st, this.Logger = l, this.logger = new l("@barba/core"), 
                        this.plugins = [], this.hooks = X, this.dom = j, this.helpers = _, this.history = M, 
                        this.request = I, this.url = H;
                    }
                    var e = t.prototype;
                    return e.use = function(t, n) {
                        var r = this.plugins;
                        r.indexOf(t) > -1 ? this.logger.warn("Plugin [" + t.name + "] already installed.") : "function" == typeof t.install ? (t.install(this, n), 
                        r.push(t)) : this.logger.warn("Plugin [" + t.name + '] has no "install" method.');
                    }, e.init = function(t) {
                        var n = void 0 === t ? {} : t, e = n.transitions, i = void 0 === e ? [] : e, o = n.views, u = void 0 === o ? [] : o, f = n.schema, s = void 0 === f ? S : f, c = n.requestError, a = n.timeout, h = void 0 === a ? 2e3 : a, v = n.cacheIgnore, d = void 0 !== v && v, m = n.prefetchIgnore, p = void 0 !== m && m, w = n.preventRunning, b = void 0 !== w && w, y = n.prevent, P = void 0 === y ? null : y, g = n.debug, E = n.logLevel;
                        if (l.setLevel(!0 === (void 0 !== g && g) ? "debug" : void 0 === E ? "off" : E), 
                        this.logger.info(this.version), Object.keys(s).forEach((function(t) {
                            S[t] && (S[t] = s[t]);
                        })), this.$ = c, this.timeout = h, this.cacheIgnore = d, this.prefetchIgnore = p, 
                        this.preventRunning = b, this._ = this.dom.getWrapper(), !this._) throw new Error("[@barba/core] No Barba wrapper found");
                        this._.setAttribute("aria-live", "polite"), this.q();
                        var x = this.data.current;
                        if (!x.container) throw new Error("[@barba/core] No Barba container found");
                        if (this.cache = new G(d), this.prevent = new et(p), this.transitions = new ut(i), 
                        this.views = new ft(u), null !== P) {
                            if ("function" != typeof P) throw new Error("[@barba/core] Prevent should be a function");
                            this.prevent.add("preventCustom", P);
                        }
                        this.history.init(x.url.href, x.namespace), this.B = this.B.bind(this), this.U = this.U.bind(this), 
                        this.D = this.D.bind(this), this.F(), this.plugins.forEach((function(t) {
                            return t.init();
                        }));
                        var k = this.data;
                        k.trigger = "barba", k.next = k.current, k.current = r({}, this.schemaPage), this.hooks.do("ready", k), 
                        this.once(k), this.q();
                    }, e.destroy = function() {
                        this.q(), this.H(), this.history.clear(), this.hooks.clear(), this.plugins = [];
                    }, e.force = function(t) {
                        window.location.assign(t);
                    }, e.go = function(t, n, r) {
                        var e;
                        if (void 0 === n && (n = "barba"), this.transitions.isRunning) this.force(t); else if (!(e = "popstate" === n ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(t) : this.prevent.run("sameUrl", null, null, t)) || this.transitions.hasSelf) return n = this.history.change(t, n, r), 
                        r && (r.stopPropagation(), r.preventDefault()), this.page(t, n, e);
                    }, e.once = function(t) {
                        try {
                            var n = this;
                            return Promise.resolve(n.hooks.do("beforeEnter", t)).then((function() {
                                function r() {
                                    return Promise.resolve(n.hooks.do("afterEnter", t)).then((function() {}));
                                }
                                var e = function() {
                                    if (n.transitions.hasOnce) {
                                        var r = n.transitions.get(t, {
                                            once: !0
                                        });
                                        return Promise.resolve(n.transitions.doOnce({
                                            transition: r,
                                            data: t
                                        })).then((function() {}));
                                    }
                                }();
                                return e && e.then ? e.then(r) : r();
                            }));
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, e.page = function(t, n, e) {
                        try {
                            var i = function() {
                                var t = o.data;
                                return Promise.resolve(o.hooks.do("page", t)).then((function() {
                                    var n = s((function() {
                                        var n = o.transitions.get(t, {
                                            once: !1,
                                            self: e
                                        });
                                        return Promise.resolve(o.transitions.doPage({
                                            data: t,
                                            page: u,
                                            transition: n,
                                            wrapper: o._
                                        })).then((function() {
                                            o.q();
                                        }));
                                    }), (function() {
                                        0 === l.getLevel() && o.force(t.current.url.href);
                                    }));
                                    if (n && n.then) return n.then((function() {}));
                                }));
                            }, o = this;
                            o.data.next.url = r({
                                href: t
                            }, o.url.parse(t)), o.data.trigger = n;
                            var u = o.cache.has(t) ? o.cache.update(t, {
                                action: "click"
                            }).request : o.cache.set(t, o.request(t, o.timeout, o.onRequestError.bind(o, n)), "click").request, f = function() {
                                if (o.transitions.shouldWait) return Promise.resolve(L(u, o.data)).then((function() {}));
                            }();
                            return Promise.resolve(f && f.then ? f.then(i) : i());
                        } catch (t) {
                            return Promise.reject(t);
                        }
                    }, e.onRequestError = function(t) {
                        this.transitions.isRunning = !1;
                        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++) r[e - 1] = arguments[e];
                        var i = r[0], o = r[1], u = this.cache.getAction(i);
                        return this.cache.delete(i), !(this.$ && !1 === this.$(t, u, i, o) || ("click" === u && this.force(i), 
                        1));
                    }, e.prefetch = function(t) {
                        var n = this;
                        this.cache.has(t) || this.cache.set(t, this.request(t, this.timeout, this.onRequestError.bind(this, "barba")).catch((function(t) {
                            n.logger.error(t);
                        })), "prefetch");
                    }, e.F = function() {
                        !0 !== this.prefetchIgnore && (document.addEventListener("mouseover", this.B), document.addEventListener("touchstart", this.B)), 
                        document.addEventListener("click", this.U), window.addEventListener("popstate", this.D);
                    }, e.H = function() {
                        !0 !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.B), 
                        document.removeEventListener("touchstart", this.B)), document.removeEventListener("click", this.U), 
                        window.removeEventListener("popstate", this.D);
                    }, e.B = function(t) {
                        var n = this, r = this.I(t);
                        if (r) {
                            var e = this.dom.getHref(r);
                            this.prevent.checkHref(e) || this.cache.has(e) || this.cache.set(e, this.request(e, this.timeout, this.onRequestError.bind(this, r)).catch((function(t) {
                                n.logger.error(t);
                            })), "enter");
                        }
                    }, e.U = function(t) {
                        var n = this.I(t);
                        if (n) return this.transitions.isRunning && this.preventRunning ? (t.preventDefault(), 
                        void t.stopPropagation()) : void this.go(this.dom.getHref(n), n, t);
                    }, e.D = function(t) {
                        this.go(this.url.getHref(), "popstate", t);
                    }, e.I = function(t) {
                        for (var n = t.target; n && !this.dom.getHref(n); ) n = n.parentNode;
                        if (n && !this.prevent.checkLink(n, t, this.dom.getHref(n))) return n;
                    }, e.q = function() {
                        var t = this.url.getHref(), n = {
                            container: this.dom.getContainer(),
                            html: this.dom.getHtml(),
                            namespace: this.dom.getNamespace(),
                            url: r({
                                href: t
                            }, this.url.parse(t))
                        };
                        this.C = {
                            current: n,
                            next: r({}, this.schemaPage),
                            trigger: void 0
                        }, this.hooks.do("reset", this.data);
                    }, n(t, [ {
                        key: "data",
                        get: function() {
                            return this.C;
                        }
                    }, {
                        key: "wrapper",
                        get: function() {
                            return this._;
                        }
                    } ]), t;
                }());
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        document.addEventListener("DOMContentLoaded", (() => {
            let data = {
                title: "АврорА",
                cabinet: "",
                first_name: "Денис",
                phone_number: "+380675478881",
                telegram_id: 210325718,
                password: "5777ef8c7a3f5c32bf2a85814352bc763d063712287a142087225d8a8367f7784b5eb193814fc801eb68",
                content: "Хочеш стати частиною команди Аврори? Я маю для тебе кілька вакансій",
                visit_website: false
            };
            data.cabinet;
            let currentContent = data.content;
            let currentUserName = data.first_name;
            let currentTelegramID = data.telegram_id;
            let currentPassword = data.password;
            let currentUserPhone = data.phone_number;
            let actualHost = "https://avrora-web.fly.dev";
            let currentTemplateID = "home-page";
            let firstEnter = true;
            let currentVacancyID = "";
            let currentVacancyTitle = "";
            let globalVacancies;
            const homePageTitleElement = document.querySelector(".home-page__title");
            const homePageTitleText = `Привіт, ${currentUserName}! `;
            homePageTitleElement.insertAdjacentText("afterbegin", `${homePageTitleText}`);
            const homePageSubtitleElement = document.querySelector(".home-page__subtitle");
            homePageSubtitleElement.insertAdjacentHTML("beforeend", `${currentContent}`);
            document.querySelectorAll(".button");
            const footerElement = document.querySelector(".footer");
            function hiddenOrShowFooter() {
                if (currentTemplateID === "home-page") {
                    footerElement.classList.add("animation-hidden-footer");
                    setTimeout((function() {
                        footerElement.classList.add("_hidden");
                        footerElement.classList.remove("animation-hidden-footer");
                    }), 490);
                } else setTimeout((function() {
                    footerElement.classList.remove("_hidden");
                    footerElement.classList.add("animation-show-footer");
                    setTimeout((function() {
                        footerElement.classList.remove("animation-show-footer");
                    }), 490);
                }), 300);
            }
            hiddenOrShowFooter();
            const footerButtonToHome = document.querySelector(".footer__button-main-link");
            footerButtonToHome.addEventListener("click", (() => {
                window.location.reload();
                firstEnter = true;
                currentTemplateID = "home-page";
            }));
            function scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
            const mainPageContainer = document.querySelector(".page");
            function addWhiteBackground(button) {
                let itemID = removeDigitsAndUnderscore(button.id);
                if (itemID === "post-request-vacancy-page") mainPageContainer.classList.add("white-background"); else mainPageContainer.classList.remove("white-background");
            }
            const addListenerToAllRouteButtons = () => {
                if (document.querySelector(".route-button")) {
                    const allRouteButtons = document.querySelectorAll(".route-button");
                    for (let item of allRouteButtons) item.addEventListener("click", (e => {
                        currentTemplateID = removeDigitsAndUnderscore(e.target.id);
                        firstEnter = false;
                        includeCurrentTemplate(currentTemplateID);
                        addWhiteBackground(item);
                        hiddenOrShowFooter();
                        scrollToTop();
                    }));
                }
            };
            addListenerToAllRouteButtons();
            function removeDigitsAndUnderscore(inputString) {
                var resultString = inputString.replace(/[0-9_]/g, "");
                return resultString;
            }
            const allWidgetTemplates = document.querySelectorAll(".page-template");
            const includeCurrentTemplate = currentTemplateID => {
                for (let item of allWidgetTemplates) if (item.id !== currentTemplateID && !firstEnter) {
                    item.classList.add("position-left");
                    setTimeout((function() {
                        item.classList.add("_hidden-template");
                        item.classList.remove("position-left");
                    }), 290);
                } else if (item.id === currentTemplateID && !firstEnter) setTimeout((function() {
                    item.classList.add("position-right");
                    item.classList.remove("_hidden-template");
                    setTimeout((function() {
                        item.classList.remove("position-right");
                    }), 100);
                }), 290);
            };
            includeCurrentTemplate(currentTemplateID);
            let officeVacancies = [];
            let shopVacancies = [];
            let stockVacancies = [];
            const officeVacanciesElement = document.querySelector(".jobs-list__office");
            const shopVacanciesElement = document.querySelector(".jobs-list__shop");
            const stockVacanciesElement = document.querySelector(".jobs-list__stock");
            const apiVacanciesUrl = `${actualHost}/vacancies/${data.telegram_id}/${data.password}`;
            fetch(apiVacanciesUrl).then((response => {
                if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
                return response.json();
            })).then((data => {
                globalVacancies = data;
                for (let i = 0; i < globalVacancies.vacancies.length; i++) {
                    let currentVacancy = globalVacancies.vacancies[i];
                    if (currentVacancy.kind === "офіс") officeVacancies.push(currentVacancy); else if (currentVacancy.kind === "магазин") shopVacancies.push(currentVacancy); else if (currentVacancy.kind === "склад") stockVacancies.push(currentVacancy);
                }
                for (let i = 0; i < officeVacancies.length; i++) officeVacanciesElement.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<button id="${i}0_vacancy-page" data-vacancy-id="${officeVacancies[i]._id}" class="button button-effect jobs-list__item">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>${officeVacancies[i].title}</div>\n\t\t\t\t\t</button>\n\t\t\t\t`);
                for (let i = 0; i < shopVacancies.length; i++) shopVacanciesElement.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<button id="${i}1_vacancy-page" data-vacancy-id="${shopVacancies[i]._id}" class="button button-effect jobs-list__item">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>${shopVacancies[i].title}</div>\n\t\t\t\t\t</button>\n\t\t\t\t`);
                for (let i = 0; i < stockVacancies.length; i++) stockVacanciesElement.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<button id="${i}2_vacancy-page" data-vacancy-id="${stockVacancies[i]._id}" class="button button-effect jobs-list__item">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>${stockVacancies[i].title}</div>\n\t\t\t\t\t</button>\n\t\t\t\t`);
                const allJobItemsButtons = document.querySelectorAll(".jobs-list__item");
                for (let item of allJobItemsButtons) item.addEventListener("click", (function() {
                    scrollToTop();
                    let vacancyTitle = "";
                    let vacancyContent = "";
                    for (let i = 0; i < globalVacancies.vacancies.length; i++) if (globalVacancies.vacancies[i]._id === item.getAttribute(`data-vacancy-id`)) {
                        vacancyTitle = globalVacancies.vacancies[i].title;
                        vacancyContent = globalVacancies.vacancies[i].description_html;
                    }
                    includeCurrentTemplate(removeDigitsAndUnderscore(item.id));
                    currentVacancyID = item.getAttribute(`data-vacancy-id`);
                    currentVacancyTitle = item.lastElementChild.textContent;
                    document.querySelector(".vacancy-page__title").innerHTML = "";
                    document.querySelector(".vacancy-page__content").innerHTML = "";
                    document.querySelector(".vacancy-page__title").insertAdjacentHTML("afterbegin", `${vacancyTitle}`);
                    document.querySelector(".vacancy-page__content").insertAdjacentHTML("afterbegin", `${vacancyContent}`);
                }));
            })).catch((error => {
                console.error("Ошибка при выполнении запроса:", error);
            }));
            fetch(`${actualHost}/cabinet/${currentTelegramID}/${data.password}`).then((response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })).then((data => {
                console.log(data);
            })).catch((error => {
                console.error("Fetch error:", error);
            }));
            const headerUserName = document.querySelector(".header__user-name-text");
            headerUserName.insertAdjacentText("afterbegin", `${data.first_name}`);
            document.addEventListener("click", (() => {
                if (currentTemplateID === "post-request-vacancy-page") document.querySelector(".page").classList.add("page-chat-height"); else document.querySelector(".page").classList.remove("page-chat-height");
            }));
            let dataKind = "склад";
            let dataName = "";
            let dataPhone = currentUserPhone;
            let dataCity = "";
            let dataBornDate = "";
            let postVariablesArray = [ dataName, dataPhone, dataCity, dataBornDate ];
            let objectKeys = [ "name", "feedback_phone", "city", "birthday" ];
            const postVacancyObject = {
                kind: dataKind,
                name: dataName,
                feedback_phone: dataPhone,
                city: dataCity,
                birthday: dataBornDate
            };
            let fixedQuestionsCounter = 4;
            let allQuestionsCounter = 4;
            let questionsCounter = -1;
            let answersCounter = -1;
            const requestButtonsArray = document.querySelectorAll(".vacancy-page__request-button");
            for (let button of requestButtonsArray) button.addEventListener("click", (() => {
                addQuestionsToChat();
            }));
            const questionsArray = [ `Добрий день. Будь-ласка, вкажіть ваші ім'я та прізвище:`, `Вкажіть актуальний номер телефону для зв'язку:`, `Вкажіть місто проживання:`, `Вкажіть дату народження:` ];
            const finalMessage = "Дякуємо за терпіння! Залишилось перевірити правильність введених даних і можна надсилати заявку)";
            let additionalQuestions;
            function addQuestionsToChat() {
                fetch(`${actualHost}/forms/${currentTelegramID}/${data.password}`).then((response => {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })).then((data => {
                    additionalQuestions = data;
                    addAdditionalQuestionsToMainPostObject(additionalQuestions, postVacancyObject);
                    addAdditionalQuestionsToMainCheckQuestionsArray(additionalQuestions, checkQuestionsArray);
                    return addAdditionalQuestionsToMainQuestionsArray(additionalQuestions, questionsArray);
                })).then((array => {
                    addMessagesAfterUserAnswers(array);
                })).catch((error => {
                    console.error("Fetch error:", error);
                }));
            }
            const addMessagesAfterUserAnswers = questionsArray => {
                if (answersCounter === questionsCounter && questionsArray[questionsCounter + 1] !== void 0) {
                    addMessageToChat(questionsArray[questionsCounter + 1]);
                    questionsCounter++;
                }
            };
            const chatInput = document.querySelector(".post-request-vacancy-page__input");
            chatInput.addEventListener("keyup", (event => {
                if (event.key === "Enter") addAnswersAndQuestionsToChat();
            }));
            const sendMessageButton = document.querySelector(".post-request-vacancy-page__send-message");
            sendMessageButton.addEventListener("click", (() => {
                addAnswersAndQuestionsToChat();
            }));
            const addAnswersAndQuestionsToChat = () => {
                if (questionsCounter + 1 <= fixedQuestionsCounter) {
                    postVariablesArray[questionsCounter] = chatInput.value;
                    postVacancyObject[objectKeys[questionsCounter]] = postVariablesArray[questionsCounter];
                    addUserAnswers(postVariablesArray[questionsCounter]);
                    scrollChatToBottom();
                    addMessagesAfterUserAnswers(questionsArray);
                    addPhoneAnswerBlock();
                    addBirthDateAnswerBlock();
                } else if (questionsCounter + 1 > fixedQuestionsCounter && answersCounter < allQuestionsCounter) {
                    let currentQuestionKey = `q${questionsCounter + 1 - fixedQuestionsCounter}`;
                    let currentAdditionalQuestion = additionalQuestions.forms[`${currentQuestionKey}`];
                    postVacancyObject[`${currentQuestionKey}`] = {
                        [currentAdditionalQuestion]: `${chatInput.value}`
                    };
                    addUserAnswers(chatInput.value);
                    addMessagesAfterUserAnswers(questionsArray);
                    checkFinalAnswerMessage();
                }
                chatInput.value = "";
            };
            const addBirthDateAnswerBlock = () => {
                if (objectKeys[questionsCounter] === "birthday") {
                    hiddenTextInput();
                    function delayedFunction() {
                        showCalendarInput();
                    }
                    setTimeout(delayedFunction, 300);
                }
            };
            const dateInput = document.querySelector(".post-request-vacancy-page__date-input");
            const dateSendButton = document.querySelector(".post-request-vacancy-page__send-date");
            dateSendButton.addEventListener("click", (() => {
                writeActualBirthDate(dateInput.value);
                addUserMessageToChat(dateInput.value);
                hiddenCalendarInput();
                answersCounter++;
                function delayedFunction() {
                    addMessagesAfterUserAnswers(questionsArray);
                    scrollChatToBottom();
                    showTextInput();
                }
                setTimeout(delayedFunction, 300);
            }));
            dateInput.addEventListener("keyup", (event => {
                if (event.key === "Enter") {
                    writeActualBirthDate(dateInput.value);
                    addUserMessageToChat(dateInput.value);
                    hiddenCalendarInput();
                    answersCounter++;
                    function delayedFunction() {
                        addMessagesAfterUserAnswers(questionsArray);
                        scrollChatToBottom();
                        showTextInput();
                    }
                    setTimeout(delayedFunction, 300);
                }
            }));
            const showCalendarInput = () => {
                document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-hidden-animation");
                document.querySelector(".post-request-vacancy-page__date-input-container").classList.add("input-show-animation");
                function delayedFunction() {
                    document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-hidden");
                }
                setTimeout(delayedFunction, 300);
            };
            const hiddenCalendarInput = () => {
                document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-show-animation");
                document.querySelector(".post-request-vacancy-page__date-input-container").classList.add("input-hidden-animation");
                function delayedFunction() {
                    document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-visible");
                    document.querySelector(".post-request-vacancy-page__date-input-container").classList.add("input-hidden");
                }
                setTimeout(delayedFunction, 300);
            };
            const writeActualBirthDate = date => {
                let parts = date.split("-");
                let formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
                dataBornDate = formattedDate;
                postVacancyObject.birthday = formattedDate;
            };
            const addPhoneAnswerBlock = () => {
                if (objectKeys[questionsCounter] === "feedback_phone") {
                    hiddenTextInput();
                    new Promise((function(resolve, reject) {
                        function showButtons() {
                            const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                            chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<div class="change-number-container phone-buttons-show-animations">\n\t\t\t\t\t\t<button class="route-button route-button-main-style button-effect actual-number-button">\n\t\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t\t<div>Так, ${dataPhone} - це актуальный номер</div>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class="route-button route-button-main-style button-effect no-actual-number-button">\n\t\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t\t<div>Ні, хочу вказати інший номер</div>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t`);
                            const actualNumberButton = document.querySelector(".actual-number-button");
                            const noActualNumberButton = document.querySelector(".no-actual-number-button");
                            const numberButtonsArray = [ actualNumberButton, noActualNumberButton ];
                            resolve(numberButtonsArray);
                        }
                        setTimeout(showButtons, 1e3);
                    })).then((buttons => {
                        buttons[0].addEventListener("click", (() => {
                            writeCurrentNumber(currentUserPhone);
                            hiddenPhoneNumberInput();
                            deleteNumbersButtons();
                            answersCounter++;
                            function delayedFunction() {
                                addUserMessageToChat(currentUserPhone);
                                addMessagesAfterUserAnswers(questionsArray);
                                scrollChatToBottom();
                                showTextInput();
                            }
                            setTimeout(delayedFunction, 300);
                        }));
                        buttons[1].addEventListener("click", (() => {
                            showPhoneNumberInput();
                        }));
                    }));
                }
            };
            const sendNumberAsMessageInput = document.querySelector(".post-request-vacancy-page__phone-input");
            const sendNumberAsMessageButton = document.querySelector(".post-request-vacancy-page__send-phone");
            sendNumberAsMessageButton.addEventListener("click", (() => {
                writeCurrentNumber(sendNumberAsMessageInput.value);
                hiddenPhoneNumberInput();
                deleteNumbersButtons();
                answersCounter++;
                function delayedFunction() {
                    addUserMessageToChat(sendNumberAsMessageInput.value);
                    addMessagesAfterUserAnswers(questionsArray);
                    scrollChatToBottom();
                    showTextInput();
                }
                setTimeout(delayedFunction, 300);
            }));
            sendNumberAsMessageInput.addEventListener("keyup", (event => {
                if (event.key === "Enter") {
                    writeCurrentNumber(sendNumberAsMessageInput.value);
                    hiddenPhoneNumberInput();
                    deleteNumbersButtons();
                    answersCounter++;
                    function delayedFunction() {
                        addUserMessageToChat(sendNumberAsMessageInput.value);
                        addMessagesAfterUserAnswers(questionsArray);
                        scrollChatToBottom();
                        showTextInput();
                    }
                    setTimeout(delayedFunction, 300);
                }
            }));
            const deleteNumbersButtons = () => {
                document.querySelector(".change-number-container").classList.remove("phone-buttons-show-animations");
                document.querySelector(".change-number-container").classList.add("phone-buttons-hidden-animations");
                function delayedFunction() {
                    document.querySelector(".change-number-container").classList.remove("phone-buttons-hidden-animations");
                    document.querySelector(".change-number-container").innerHTML = "";
                }
                setTimeout(delayedFunction, 300);
            };
            const showPhoneNumberInput = () => {
                document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-hidden-animation");
                document.querySelector(".post-request-vacancy-page__phone-input-container").classList.add("input-show-animation");
                function delayedFunction() {
                    document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-hidden");
                    document.querySelector(".post-request-vacancy-page__phone-input").focus();
                }
                setTimeout(delayedFunction, 300);
            };
            const hiddenPhoneNumberInput = () => {
                document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-show-animation");
                document.querySelector(".post-request-vacancy-page__phone-input-container").classList.add("input-hidden-animation");
                function delayedFunction() {
                    document.querySelector(".post-request-vacancy-page__phone-input-container").classList.add("input-hidden");
                    document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-visible");
                }
                setTimeout(delayedFunction, 300);
            };
            const writeCurrentNumber = number => {
                dataPhone = number;
                postVacancyObject.feedback_phone = number;
            };
            const inactiveMessageButton = () => {
                document.querySelector(".post-request-vacancy-page__send-message").disabled = true;
            };
            const activeMesssageButton = () => {
                document.querySelector(".post-request-vacancy-page__send-message").disabled = false;
            };
            const inactiveInput = () => {
                document.querySelector(".post-request-vacancy-page__input").disabled = true;
            };
            const activeInput = () => {
                document.querySelector(".post-request-vacancy-page__input").disabled = false;
                document.querySelector(".post-request-vacancy-page__input").focus();
            };
            const hiddenTextInput = () => {
                document.querySelector(".post-request-vacancy-page__input-container").classList.remove("input-visible");
                document.querySelector(".post-request-vacancy-page__input-container").classList.add("input-hidden-animation");
                function delayedFunction() {
                    document.querySelector(".post-request-vacancy-page__input-container").classList.add("input-hidden");
                }
                setTimeout(delayedFunction, 300);
            };
            const showTextInput = () => {
                document.querySelector(".post-request-vacancy-page__input-container").classList.remove("input-hidden-animation");
                document.querySelector(".post-request-vacancy-page__input-container").classList.add("input-show-animation");
                function delayedFunction() {
                    document.querySelector(".post-request-vacancy-page__input-container").classList.remove("input-hidden");
                }
                setTimeout(delayedFunction, 300);
            };
            const checkFinalAnswerMessage = () => {
                scrollChatToBottom();
                let keys = Object.keys(postVacancyObject);
                let lastKey = keys[keys.length - 1];
                if (postVacancyObject[lastKey] !== void 0 && postVacancyObject[lastKey] !== null && postVacancyObject[lastKey] !== "") {
                    addFinalMessageAfterAnswers(finalMessage);
                    scrollChatToBottom();
                    hiddenTextInput();
                }
            };
            const addFinalMessageAfterAnswers = message => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                function delayedFunction() {
                    chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="post-request-vacancy-page__message-element final-message__container input-hidden">\n\t\t\t\t<div class="main-message-style final-message">${message}</div>\n\t\t\t\t<button id="001_check-request-vacancy-page" class="route-button final-message__button route-button-main-style button-effect">\n\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t<div>Продовжити</div>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t`);
                    changeMessageContainerPadding();
                    showFinalBlock();
                    addListenerToAllRouteButtons();
                    addInputFieldsToCheckPage();
                }
                setTimeout(delayedFunction, 300);
            };
            const changeMessageContainerPadding = () => {
                document.querySelector(".post-request-vacancy-page__messages-container").classList.remove("padding-message-container-chat");
                document.querySelector(".post-request-vacancy-page__messages-container").classList.add("padding-message-container-final");
            };
            const showFinalBlock = () => {
                document.querySelector(".final-message__container").classList.add("show-final-message");
                function delayedFunction() {
                    document.querySelector(".final-message__container").classList.remove("input-hidden");
                    document.querySelector(".final-message__container").classList.add("input-visible");
                    scrollChatToBottom();
                }
                setTimeout(delayedFunction, 300);
            };
            const addUserAnswers = userMessageText => {
                inactiveInput();
                inactiveMessageButton();
                addUserMessageToChat(userMessageText);
                answersCounter++;
            };
            function scrollChatToBottom() {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight);
            }
            function addUserMessageToChat(userMessage) {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="post-request-vacancy-page__message-element user-message__container">\n\t\t\t\t<div class="main-message-style user-message">${userMessage}</div>\n\t\t\t</div>\n\t\t`);
            }
            function addMessageToChat(question) {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                function delayedFunction() {
                    chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="post-request-vacancy-page__message-element app-message__container bot-message-animation">\n\t\t\t\t<div class="main-message-style app-message">${question}</div>\n\t\t\t</div>\n\t\t`);
                }
                setTimeout(delayedFunction, 1);
                function onInput() {
                    activeInput();
                    activeMesssageButton();
                }
                setTimeout(onInput, 800);
            }
            const addAdditionalQuestionsToMainQuestionsArray = (questionsObject, arrayToWrite) => {
                for (var key in questionsObject.forms) if (key.startsWith("q")) arrayToWrite.push(questionsObject.forms[key]);
                return arrayToWrite;
            };
            const addAdditionalQuestionsToMainPostObject = (questionsObject, objectToWrite) => {
                for (var key in questionsObject.forms) {
                    allQuestionsCounter++;
                    if (key.startsWith("q")) objectToWrite[`${key}`] = "";
                }
            };
            const checkQuestionsArray = [ `Ім'я та прізвище:`, `Номер телефону для зв'язку:`, `Місто проживання:`, `Дата народження:` ];
            const addAdditionalQuestionsToMainCheckQuestionsArray = (questionsObject, arrayToWrite) => {
                for (var key in questionsObject.forms) if (key.startsWith("q")) arrayToWrite.push(questionsObject.forms[key]);
            };
            const addInputFieldsToCheckPage = () => {
                const checkPageMainContainer = document.querySelector(".check-request-vacancy-page__items-container");
                checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t\t\t<div class="check-request-vacancy-page__question-input-container">\n\t\t\t\t\t\t\t<div class="check-request-vacancy-page__check-question">Назва вакансії:</div>\n\t\t\t\t\t\t\t<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">${currentVacancyTitle}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t`);
                for (let i = 0; i < Object.keys(postVacancyObject).length - 1; i++) if (i < fixedQuestionsCounter) checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t\t\t<div data-key="${Object.keys(postVacancyObject)[i + 1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">\n\t\t\t\t\t\t\t<div class="check-request-vacancy-page__check-question">${checkQuestionsArray[i]}</div>\n\t\t\t\t\t\t\t<input disabled value="${postVacancyObject[Object.keys(postVacancyObject)[i + 1]]}" type="text" class="check-request-vacancy-page__check-input">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="check-request-vacancy-page__edit-button">\n\t\t\t\t\t\t\t<img src="../../img/icons/edit.png" alt="edit icon" class="check-request-vacancy-page__edit-button-image edit-icon">\n\t\t\t\t\t\t\t<img src="../../img/icons/save.png" alt="save icon" class="check-request-vacancy-page__edit-button-image save-icon _hidden-icon">\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t`); else {
                    let objectElement = postVacancyObject[Object.keys(postVacancyObject)[i + 1]];
                    let objectElementAnswer = objectElement[Object.keys(objectElement)[0]];
                    checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t\t\t<div data-key="${Object.keys(postVacancyObject)[i + 1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">\n\t\t\t\t\t\t\t<div class="check-request-vacancy-page__check-question">${checkQuestionsArray[i]}</div>\n\t\t\t\t\t\t\t<textarea disabled type="text" class="check-request-vacancy-page__check-input check-textarea">${objectElementAnswer}</textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="check-request-vacancy-page__edit-button">\n\t\t\t\t\t\t\t<img src="../../img/icons/edit.png" alt="edit icon" class="check-request-vacancy-page__edit-button-image edit-icon">\n\t\t\t\t\t\t\t<img src="../../img/icons/save.png" alt="save icon" class="check-request-vacancy-page__edit-button-image save-icon _hidden-icon">\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t`);
                }
                addListenerOnEditButtons();
            };
            const addListenerOnEditButtons = () => {
                const allEditButtons = document.querySelectorAll(".check-request-vacancy-page__edit-button");
                for (let item of allEditButtons) item.addEventListener("click", (() => {
                    changeButtonImage(item);
                    if (item.previousElementSibling.lastElementChild.hasAttribute("disabled")) activeCheckInput(item); else {
                        inactiveCheckInput(item);
                        writeNewDataToPostVacancyObject(item);
                    }
                }));
            };
            const activeCheckInput = button => {
                let inputContainer = button.previousElementSibling;
                inputContainer.lastElementChild.disabled = false;
                inputContainer.lastElementChild.focus();
                inputContainer.parentElement.classList.remove("inactive-input-container-border");
                inputContainer.parentElement.classList.add("active-input-container-border");
            };
            const inactiveCheckInput = button => {
                let inputContainer = button.previousElementSibling;
                inputContainer.lastElementChild.disabled = true;
                inputContainer.lastElementChild.blur();
                inputContainer.parentElement.classList.remove("active-input-container-border");
                inputContainer.parentElement.classList.add("inactive-input-container-border");
            };
            const changeButtonImage = button => {
                button.lastElementChild.classList.toggle("_hidden-icon");
                button.firstElementChild.classList.toggle("_hidden-icon");
            };
            const writeNewDataToPostVacancyObject = button => {
                let inputElement = button.previousElementSibling.lastElementChild;
                let currentObjectKey = button.previousElementSibling.dataset.key;
                if (currentObjectKey[0] === "q" && currentObjectKey.length === 2) {
                    let objectElement = postVacancyObject[currentObjectKey];
                    let currentQuestion = Object.keys(objectElement)[0];
                    objectElement[currentQuestion] = inputElement.value;
                } else postVacancyObject[currentObjectKey] = inputElement.value;
            };
            const sendObjectDataToServer = () => {
                const checkRequestVacancyButton = document.querySelector(".check-request-vacancy-page__request-button");
                checkRequestVacancyButton.addEventListener("click", (() => {
                    fetchPostData(postVacancyObject, currentVacancyID);
                }));
            };
            sendObjectDataToServer();
            const addCVObjectToMainObject = cvObject => {
                cvObject.cv = {};
                return cvObject;
            };
            function fetchPostData(objectData, vacancyID) {
                const apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/${vacancyID}`;
                const data = addCVObjectToMainObject(objectData);
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                };
                fetch(apiPostDataURL, requestOptions).then((response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })).then((data => {
                    console.log("Отримано дані від сервера:", data);
                })).catch((error => {
                    console.error("Помилка під час виконання POST-запиту:", error);
                }));
            }
        }));
        __webpack_require__(69);
        document.addEventListener("DOMContentLoaded", (() => {}));
        window["FLS"] = true;
        isWebp();
    })();
})();