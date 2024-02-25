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
                cabinet: {
                    birthday: "21.02.2002",
                    check_gpt: null,
                    city: "фливолжафджиловаждол",
                    create_at: "2024-02-21 12:51:58",
                    feedback: false,
                    feedback_phone: "380931453791",
                    is_active: true,
                    kind: "офіс",
                    name: "арвилор",
                    qualities: null,
                    questionnaire: "Що для вас є ключовими цінностями в житті?: ифжвоаждолфиваждол\nЯк ви відповідаєте на виклики та труднощі в роботі?: двлоажфдиоваждлфоивад\nЯк ви володієте навичками управління часом?: фиждвлоажфдиоаждфиоваж\nЯк ви реагуєте на критику?: жфдивлоаджфоиваждлофиважд\nЯк ви вирішуєте складні завдання чи проблеми?: ифвждлоаижфлдоваждфиоваждф\n",
                    rating: null,
                    status: null,
                    telegram_id: 210325718,
                    title: "Менеджер/ка з організаційного документообігу та комунікацій"
                },
                first_name: "Денис",
                host: "https://avrora-hr.fly.dev/",
                phone_number: "+380675478881",
                telegram_id: 210325718,
                password: "519d9a296dd5ccb730e1c3bac2255aae90ead3690c81c0b5a31b3f191c01c051696ede10d2f5d14b9edcb72b28844e1b34",
                content: "Хочеш стати частиною команди Аврори? Я маю для тебе кілька вакансій",
                visit_website: false
            };
            let cabinet = data.cabinet;
            let globalCabinet = {
                cabinet
            };
            let currentContent = data.content;
            let currentUserName = data.first_name;
            let currentTelegramID = data.telegram_id;
            let currentPassword = data.password;
            let currentUserPhone = data.phone_number;
            let actualHost = data.host;
            let currentTemplateID = "home-page";
            let firstEnter = true;
            let currentVacancyID = "";
            let currentVacancyTitle = "";
            let vacancies = data.vacancies;
            let globalVacancies = {
                vacancies
            };
            let currentVacancyKind;
            let reserveBranch = false;
            let currentFile = {};
            let templatesRoad = [ "home-page" ];
            let vacanciesFetch = false;
            const errorMessage = "Нажаль сталась помилка під час відправки заявки. Спробуйте ще раз, або зв'яжіться з нами по телефону";
            const homePageTitleElement = document.querySelector(".home-page__title");
            const homePageTitleText = `Привіт, ${currentUserName}! `;
            homePageTitleElement.insertAdjacentText("afterbegin", `${homePageTitleText}`);
            const homePageSubtitleElement = document.querySelector(".home-page__subtitle");
            homePageSubtitleElement.insertAdjacentHTML("beforeend", `${currentContent}`);
            document.querySelectorAll(".button");
            const footerElement = document.querySelector(".footer");
            function hiddenOrShowFooter() {
                if (templatesRoad.length === 1) {
                    footerElement.classList.add("animation-hidden-footer");
                    setTimeout((function() {
                        footerElement.classList.add("_hidden");
                        footerElement.classList.remove("animation-hidden-footer");
                    }), 490);
                } else if (templatesRoad.length !== 1 && !footerElement.classList.contains("_hidden")) ; else if (templatesRoad.length !== 1 && footerElement.classList.contains("_hidden")) setTimeout((function() {
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
                function delayedFunction() {
                    document.querySelector(".page").classList.add("overflow-y-scroll");
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                    document.querySelector(".page").classList.remove("overflow-y-scroll");
                }
                setTimeout(delayedFunction, 300);
            }
            function removeDigitsAndUnderscore(inputString) {
                let prefix = inputString.slice(0, 4);
                let rest = inputString.slice(4);
                let resultPrefix = prefix.replace(/[0-9_]/g, "");
                let resultString = resultPrefix + rest;
                return resultString;
            }
            const includeCurrentTemplate = currentTemplateID => {
                const allWidgetTemplates = document.querySelectorAll(".page-template");
                for (let item of allWidgetTemplates) if (item.id !== currentTemplateID && !firstEnter) {
                    item.classList.add("position-left");
                    setTimeout((function() {
                        item.classList.add("_hidden-template");
                        item.classList.remove("position-left");
                    }), 290);
                } else if (item.id === currentTemplateID && !firstEnter) setTimeout((function() {
                    item.classList.remove("position-right");
                    item.classList.remove("_hidden-template");
                    item.classList.add("position-right");
                    setTimeout((function() {
                        item.classList.remove("position-right");
                        console.log("ok");
                    }), 100);
                }), 600);
            };
            includeCurrentTemplate(currentTemplateID);
            const addVacanciesAndKindsToList = () => {
                if (vacanciesFetch === false) {
                    vacanciesFetch = true;
                    fetch(`${actualHost}/vacancies/${currentTelegramID}/${currentPassword}`).then((response => {
                        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
                        return response.json();
                    })).then((data => {
                        let globalKinds = [];
                        globalVacancies = data;
                        const findAllKindsOfVacancies = vacancies => {
                            for (let i = 0; i < vacancies.vacancies.length; i++) {
                                let currentKind = vacancies.vacancies[i].kind;
                                if (!globalKinds.includes(currentKind)) globalKinds.push(currentKind);
                            }
                        };
                        findAllKindsOfVacancies(globalVacancies);
                        let directionsButtons = document.querySelector(".directions-page__buttons-block");
                        for (let i = 0; i < globalKinds.length; i++) directionsButtons.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<button id="${i}_jobs-list-page-${i}" class="route-button button route-button-main-style button-effect kind-vacancy-button">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>${globalKinds[i][0].toUpperCase() + globalKinds[i].slice(1)}</div>\n\t\t\t\t\t</button>\n\t\t\t\t\t`);
                        const addListenerToAllKindButtons = () => {
                            const allKindButtons = document.querySelectorAll(".kind-vacancy-button");
                            for (let item of allKindButtons) item.addEventListener("click", (() => {
                                currentVacancyKind = item.lastElementChild.textContent;
                                reserveBranch = false;
                            }));
                        };
                        addListenerToAllKindButtons();
                        for (let i = 0; i < globalKinds.length; i++) document.querySelector(".page").insertAdjacentHTML("beforeend", `\n\t\t\t\t\t\t<section id="jobs-list-page-${i}" class="page-template page__jobs-list jobs-list-page-${i} jobs-list _hidden-template section-padding">\n\t\t\t\t\t\t\t<div class="jobs-list__container">\n\t\t\t\t\t\t\t\t<div class="jobs-list__buttons-block jobs-list__${i}">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</section>\n\t\t\t\t\t`);
                        removePreloaderInKindsList();
                        for (let i = 0; i < globalKinds.length; i++) {
                            let currentVacanciesTemplate = document.querySelector(`.jobs-list-page-${i}`);
                            for (let j = 0; j < globalVacancies.vacancies.length; j++) if (globalKinds[i] === globalVacancies.vacancies[j].kind) currentVacanciesTemplate.querySelector(".jobs-list__container").querySelector(`.jobs-list__${i}`).insertAdjacentHTML("beforeend", `\n\t\t\t\t\t\t\t\t<button id="vacancy-page" data-vacancy-id="${globalVacancies.vacancies[j]._id}" class="route-button button button-effect jobs-list__item">\n\t\t\t\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t\t\t\t<div>${globalVacancies.vacancies[j].title}</div>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t`);
                            currentVacanciesTemplate.querySelector(".jobs-list__container").querySelector(`.jobs-list__${i}`).insertAdjacentHTML("beforeend", `\n\t\t\t\t\t\t<button id="005_reserve-directions-page" class="route-button button button-effect reserve-template-main-page-button">\n\t\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t\t<div>Не знайшов вакансії для себе?</div>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t`);
                        }
                        let reserveDirectionsButtons = document.querySelector(".reserve-directions-page__buttons-block");
                        for (let i = 0; i < globalKinds.length; i++) reserveDirectionsButtons.insertAdjacentHTML("beforeend", `\n\t\t\t\t\t<button id="0${i}_post-request-vacancy-page" class="route-button button route-button-main-style button-effect kind-reserve-button">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>${globalKinds[i][0].toUpperCase() + globalKinds[i].slice(1)}</div>\n\t\t\t\t\t</button>\n\t\t\t\t\t`);
                        const addListenerToAllKindReserveButtons = () => {
                            const allKindsReserveButtons = document.querySelectorAll(".kind-reserve-button");
                            for (let item of allKindsReserveButtons) item.addEventListener("click", (e => {
                                addQuestionsToChat();
                                currentVacancyKind = item.lastElementChild.textContent;
                                reserveBranch = true;
                                addBackButtonMechanics(e.target);
                            }));
                        };
                        addListenerToAllKindReserveButtons();
                        const allJobItemsButtons = document.querySelectorAll(".jobs-list__item");
                        for (let item of allJobItemsButtons) item.addEventListener("click", (function(e) {
                            scrollToTop();
                            let vacancyTitle = "";
                            let vacancyContent = "";
                            for (let i = 0; i < globalVacancies.vacancies.length; i++) if (globalVacancies.vacancies[i]._id === +item.getAttribute(`data-vacancy-id`)) {
                                let titleObject = {
                                    text: `${globalVacancies.vacancies[i].title}`
                                };
                                let textObject = {
                                    text: `${globalVacancies.vacancies[i].description_html}`
                                };
                                vacancyTitle = cleanTagsStylesAndAttributes(titleObject);
                                vacancyContent = cleanTagsStylesAndAttributes(textObject);
                            }
                            includeCurrentTemplate(removeDigitsAndUnderscore(item.id));
                            currentVacancyID = item.getAttribute(`data-vacancy-id`);
                            currentVacancyTitle = item.lastElementChild.textContent;
                            document.querySelector(".vacancy-page__title").innerHTML = "";
                            document.querySelector(".vacancy-page__content").innerHTML = "";
                            document.querySelector(".vacancy-page__title").insertAdjacentHTML("afterbegin", `${vacancyTitle}`);
                            document.querySelector(".vacancy-page__content").insertAdjacentHTML("afterbegin", `${vacancyContent}`);
                        }));
                        addListenerToAllRouteButtons();
                    })).catch((error => {
                        console.error("Fetch error:", error);
                    }));
                }
            };
            document.querySelector(".find-vacancy-main-page-button").addEventListener("click", (() => {
                if (vacanciesFetch === false) addPreloaderInKindsList();
                addVacanciesAndKindsToList();
            }));
            const addPreloaderInKindsList = () => {
                let preloaderContainer = document.querySelector(".preloader-in-widget");
                setTimeout((function() {
                    preloaderContainer.classList.remove("preloader-hidden");
                }), 200);
            };
            const removePreloaderInKindsList = () => {
                let preloaderContainer = document.querySelector(".preloader-in-widget");
                setTimeout((function() {
                    preloaderContainer.classList.add("preloader-hidden");
                }), 300);
            };
            const addListenerToAllRouteButtons = () => {
                if (document.querySelector(".route-button")) {
                    const listenerFunctions = e => {
                        currentTemplateID = removeDigitsAndUnderscore(e.target.id);
                        addBackButtonMechanics(e.target);
                        firstEnter = false;
                        includeCurrentTemplate(currentTemplateID);
                        hiddenOrShowFooter();
                        scrollToTop();
                    };
                    const allRouteButtons = document.querySelectorAll(".route-button");
                    for (let item of allRouteButtons) {
                        item.removeEventListener("click", listenerFunctions);
                        item.addEventListener("click", listenerFunctions);
                    }
                }
            };
            addListenerToAllRouteButtons();
            const headerUserName = document.querySelector(".header__user-name-text");
            headerUserName.insertAdjacentText("afterbegin", `${data.first_name}`);
            let dataKind = currentVacancyKind;
            let dataName = "";
            let dataPhone = currentUserPhone;
            let dataCity = "";
            let dataBornDate = "";
            let postVariablesArray = [ dataName, dataPhone, dataCity, dataBornDate ];
            let objectKeys = [ "name", "feedback_phone", "city", "birthday", "cv" ];
            const postVacancyObject = {
                kind: dataKind,
                name: dataName,
                feedback_phone: dataPhone,
                city: dataCity,
                birthday: dataBornDate,
                cv: ""
            };
            let fixedQuestionsCounter = 5;
            let allQuestionsCounter = 5;
            let questionsCounter = -1;
            let answersCounter = -1;
            const requestButtonsArray = document.querySelectorAll(".vacancy-page__request-button");
            for (let button of requestButtonsArray) button.addEventListener("click", (() => {
                addQuestionsToChat();
                showTextInput();
            }));
            const questionsArray = [ `Добрий день. Будь-ласка, вкажіть ваші ім'я та прізвище:`, `Вкажіть актуальний номер телефону для зв'язку:`, `Вкажіть місто проживання:`, `Вкажіть дату народження:`, `Додайте резюме у форматі .docx або .pdf:` ];
            const finalMessage = "Дякуємо за терпіння! Залишилось перевірити правильність введених даних і можна надсилати заявку)";
            let additionalQuestions;
            function addQuestionsToChat() {
                fetch(`${actualHost}/forms/${currentTelegramID}/${data.password}`).then((response => {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })).then((data => {
                    if (validateAdditionalAPIQuestions(data)) {
                        additionalQuestions = data;
                        addAdditionalQuestionsToMainPostObject(additionalQuestions, postVacancyObject);
                        addAdditionalQuestionsToMainCheckQuestionsArray(additionalQuestions, checkQuestionsArray);
                        return addAdditionalQuestionsToMainQuestionsArray(additionalQuestions, questionsArray);
                    } else setTimeout((function() {
                        addQuestionsToChat();
                    }), 2e3);
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
            const deleteErrorMessagesInChat = () => {
                const allErrorMessages = document.querySelectorAll(".main-error-style__container");
                for (let item of allErrorMessages) item.classList.add("_hidden-error-messages");
            };
            const validateName = value => {
                if (value.length <= 3 || value.length > 100) return false; else return true;
            };
            const errorValidateNameMessage = () => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element main-error-style__container">\n\t\t\t<div class="main-error-style">Неправильно введені дані. Ім'я та прізвище мають містити від 4 до 100 символів</div>\n\t\t</div>\n\t`);
                scrollChatToBottom();
            };
            const validatePhone = phone => {
                let phoneNumber = phone.replaceAll(" ", "");
                let errorsCounter = 0;
                let includeSymbols = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
                includeSymbols.forEach((function(element) {
                    for (let i = 0; i < phoneNumber.length; i++) if (phoneNumber[i] === element) errorsCounter++;
                }));
                if (phoneNumber.length < 10 || phoneNumber.length > 30 || errorsCounter !== 10) return false; else return true;
            };
            const errorValidatePhoneMessage = () => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element main-error-style__container">\n\t\t\t<div class="main-error-style">Неправильно введені дані. Телефон має містити лише цифри, та мати довжину 10 символів.</div>\n\t\t</div>\n\t`);
                scrollChatToBottom();
            };
            const validateCity = city => {
                if (city.length < 2 || city.length > 100) return false; else return true;
            };
            const errorValidateCityMessage = () => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element main-error-style__container">\n\t\t\t<div class="main-error-style">Неправильно введені дані. Назва населеного пункту має містити від 2 до 100 символів</div>\n\t\t</div>\n\t`);
                scrollChatToBottom();
            };
            const validateBirthday = date => {
                let formattedDate = formateDate(date);
                if (formattedDate.length !== 10 || findAge(formattedDate) < 18 || findAge(formattedDate) > 70) return false; else return true;
            };
            const formateDate = date => {
                let parts = date.split("-");
                let formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
                return formattedDate;
            };
            const findAge = birthdate => {
                const [day, month, year] = birthdate.split(".");
                const birthDateObj = new Date(`${year}-${month}-${day}`);
                const currentDate = new Date;
                const ageInMillis = currentDate - birthDateObj;
                const ageInYears = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1e3));
                return ageInYears;
            };
            const errorValidateBirthday = () => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element main-error-style__container">\n\t\t\t<div class="main-error-style">Для того, щоб подати заявку вам має бути не менше 18 і не більше 70 років</div>\n\t\t</div>\n\t`);
                scrollChatToBottom();
            };
            const validateAdditionalAnswers = data => {
                if (data.length < 10 || data.length > 500) return false; else return true;
            };
            const errorValidateAdditionalAnswersMessage = () => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element main-error-style__container">\n\t\t\t<div class="main-error-style">Неправильно введені дані. Довжина відповіді має бути від 10 до 500 символів</div>\n\t\t</div>\n\t`);
                scrollChatToBottom();
            };
            const errorValidateFileFormat = () => {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element main-error-style__container">\n\t\t\t<div class="main-error-style">Неправильний формат резюме. Розширення файлу має бути .docx або .pdf</div>\n\t\t</div>\n\t`);
                scrollChatToBottom();
            };
            const chatInput = document.querySelector(".post-request-vacancy-page__input");
            chatInput.addEventListener("keyup", (event => {
                if (event.key === "Enter") if (answersCounter === -1) validateName(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateNameMessage(); else if (answersCounter === 1) validateCity(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateCityMessage(); else if (answersCounter > 2) validateAdditionalAnswers(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateAdditionalAnswersMessage();
            }));
            const sendMessageButton = document.querySelector(".post-request-vacancy-page__send-message");
            sendMessageButton.addEventListener("click", (() => {
                if (answersCounter === -1) validateName(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateNameMessage(); else if (answersCounter === 1) validateCity(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateCityMessage(); else if (answersCounter > 2) validateAdditionalAnswers(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateAdditionalAnswersMessage();
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
                    addResumeBlock();
                } else if (questionsCounter + 1 > fixedQuestionsCounter && answersCounter < allQuestionsCounter) {
                    let currentQuestionKey = `q${questionsCounter + 1 - fixedQuestionsCounter}`;
                    let currentAdditionalQuestion = additionalQuestions.forms[`${currentQuestionKey}`];
                    postVacancyObject[`${currentQuestionKey}`] = {
                        [currentAdditionalQuestion]: `${chatInput.value}`
                    };
                    addUserAnswers(chatInput.value);
                    addMessagesAfterUserAnswers(questionsArray);
                    checkFinalAnswerMessage();
                    addResumeBlock();
                }
                chatInput.value = "";
                deleteErrorMessagesInChat();
            };
            const addResumeBlock = () => {
                console.log("function");
                if (objectKeys[questionsCounter] === "cv") {
                    console.log("function cv");
                    function delayedFunction() {
                        scrollChatToBottom();
                        addResumeField();
                    }
                    setTimeout(delayedFunction, 900);
                }
            };
            const addResumeField = () => {
                hiddenTextInput();
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="add-resume-container phone-buttons-show-animations">\n\t\t\t<input class="input-hidden add-resume-input" type="file" id="fileInput" accept=".pdf, .docx">\n\t\t\t<button class="add-resume-file-button">\n\t\t\t\t<span class="icon-upload-1 add-resume-choose-image"></span>\n\t\t\t\t<span class="icon-vacancy-icon add-resume-file-image hidden-file-buttons"></span>\n\t\t\t\t<div class="add-resume-choose-text">Вибрати файл</div>\n\t\t\t</button>\n\t\t\t<div class="save-delete-resume-buttons-container">\n\t\t\t\t<button class="delete-resume-button hidden-file-buttons">\n\t\t\t\t\t<span class="icon-cross"></span>\n\t\t\t\t\tВидалити\n\t\t\t\t</button>\n\t\t\t\t<button class="save-resume-button hidden-file-buttons">\n\t\t\t\t\t<span class="icon-check"></span>\n\t\t\t\t\tЗберегти\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<button class="skip-resume-button">Пропустити</button>\n\t\t</div>\n\t`);
                scrollChatToBottom();
                addUploadFileCode();
                document.querySelector(".save-resume-button").addEventListener("click", (() => {
                    saveFiledataAndContinueChat();
                }));
                document.querySelector(".skip-resume-button").addEventListener("click", (() => {
                    continueFileButton();
                }));
            };
            const addUploadFileCode = () => {
                let fileInput = document.querySelector(".add-resume-input");
                let fileButton = document.querySelector(".add-resume-file-button");
                fileButton.addEventListener("click", (function() {
                    fileInput.click();
                }));
                fileInput.addEventListener("change", (function(event) {
                    let file = event.target.files[0];
                    let fileName = event.target.files[0].name;
                    let fileExtension = fileName.split(".").pop().toLowerCase();
                    removeDeleteAndSaveButtons(document.querySelector(".delete-resume-button"), fileInput);
                    if (file && fileExtension === "docx" || file && fileExtension === "pdf") addDeleteAndSaveButtons(fileName); else if (fileExtension !== "docx" || fileExtension !== "pdf") {
                        errorValidateFileFormat();
                        deleteErrorMessagesInChat();
                    }
                    let reader = new FileReader;
                    reader.onload = function(e) {
                        let fileBytes = new Uint8Array(e.target.result);
                        let base64String = btoa(String.fromCharCode.apply(null, fileBytes));
                        currentFile = {
                            file_name: fileName,
                            file_data: base64String
                        };
                    };
                    reader.readAsArrayBuffer(file);
                }));
            };
            const addDeleteAndSaveButtons = fileName => {
                if (fileName) {
                    document.querySelector(".delete-resume-button").classList.remove("hidden-file-buttons");
                    document.querySelector(".save-resume-button").classList.remove("hidden-file-buttons");
                    document.querySelector(".skip-resume-button").classList.add("hidden-file-buttons");
                    document.querySelector(".add-resume-choose-text").innerText = `${fileName}`;
                    document.querySelector(".add-resume-choose-image").classList.add("hidden-file-buttons");
                    document.querySelector(".add-resume-file-image").classList.remove("hidden-file-buttons");
                } else removeDeleteAndSaveButtons(document.querySelector(".delete-resume-button"));
            };
            const removeDeleteAndSaveButtons = (deleteButton, fileInput) => {
                deleteButton.addEventListener("click", (() => {
                    document.querySelector(".delete-resume-button").classList.add("hidden-file-buttons");
                    document.querySelector(".save-resume-button").classList.add("hidden-file-buttons");
                    document.querySelector(".skip-resume-button").classList.remove("hidden-file-buttons");
                    document.querySelector(".add-resume-choose-text").innerText = "Вибрати файл";
                    document.querySelector(".add-resume-choose-image").classList.remove("hidden-file-buttons");
                    document.querySelector(".add-resume-file-image").classList.add("hidden-file-buttons");
                    currentFile = {};
                    fileInput.value = "";
                }));
            };
            const saveFiledataAndContinueChat = () => {
                document.querySelector(".add-resume-container").classList.add("hidden-file-buttons");
                answersCounter++;
                addMessagesAfterUserAnswers(questionsArray);
                scrollChatToBottom();
                showTextInput();
            };
            const continueFileButton = () => {
                document.querySelector(".add-resume-container").classList.add("hidden-file-buttons");
                answersCounter++;
                addMessagesAfterUserAnswers(questionsArray);
                scrollChatToBottom();
                showTextInput();
                currentFile = {};
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
                if (validateBirthday(dateInput.value)) {
                    deleteErrorMessagesInChat();
                    writeActualBirthDate(dateInput.value);
                    addUserMessageToChat(formateDate(dateInput.value));
                    hiddenCalendarInput();
                    answersCounter++;
                    function delayedFunction() {
                        addMessagesAfterUserAnswers(questionsArray);
                        scrollChatToBottom();
                        showTextInput();
                        addResumeBlock();
                    }
                    setTimeout(delayedFunction, 300);
                } else errorValidateBirthday();
            }));
            dateInput.addEventListener("keyup", (event => {
                if (event.key === "Enter") if (validateBirthday(dateInput.value)) {
                    deleteErrorMessagesInChat();
                    writeActualBirthDate(dateInput.value);
                    addUserMessageToChat(formateDate(dateInput.value));
                    hiddenCalendarInput();
                    answersCounter++;
                    function delayedFunction() {
                        addMessagesAfterUserAnswers(questionsArray);
                        scrollChatToBottom();
                        showTextInput();
                        addResumeBlock();
                    }
                    setTimeout(delayedFunction, 300);
                } else errorValidateBirthday();
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
                            chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="change-number-container phone-buttons-show-animations">\n\t\t\t\t\t<button class="route-button route-button-main-style button-effect actual-number-button">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>Так, ${dataPhone} - це актуальный номер</div>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button class="route-button route-button-main-style button-effect no-actual-number-button">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>Ні, хочу вказати інший номер</div>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t`);
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
                            deleteErrorMessagesInChat();
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
                if (validatePhone(sendNumberAsMessageInput.value)) {
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
                    deleteErrorMessagesInChat();
                } else {
                    errorValidatePhoneMessage();
                    scrollChatToBottom();
                }
            }));
            sendNumberAsMessageInput.addEventListener("keyup", (event => {
                if (event.key === "Enter" && validatePhone(sendNumberAsMessageInput.value)) {
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
                    deleteErrorMessagesInChat();
                } else if (event.key === "Enter" && !validatePhone(sendNumberAsMessageInput.value)) {
                    errorValidatePhoneMessage();
                    scrollChatToBottom();
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
            const adaptPhoneNumber = data => {
                const cleanSpace = data.replaceAll(" ", "").replaceAll("+", "").replaceAll(")", "").replaceAll("(", "");
                const startPhone = "38";
                let finalPhone = cleanSpace;
                if (cleanSpace[0] === "0") finalPhone = startPhone + cleanSpace;
                if (finalPhone[0] === "3" && finalPhone[1] === "8" && finalPhone.length === 12) return finalPhone; else return false;
            };
            const writeCurrentNumber = number => {
                dataPhone = adaptPhoneNumber(number);
                postVacancyObject.feedback_phone = dataPhone;
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
                    chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element final-message__container input-hidden">\n\t\t\t<div class="main-message-style final-message">${message}</div>\n\t\t\t<button id="001_check-request-vacancy-page" class="route-button final-message__button route-button-main-style button-effect">\n\t\t\t\t<div id="circle"></div>\n\t\t\t\t<div>Продовжити</div>\n\t\t\t</button>\n\t\t</div>\n\t\t`);
                    changeMessageContainerPadding();
                    showFinalBlock();
                    downloadPolitics();
                    const addListenerToAllRouteButtonsFinalMessage = () => {
                        if (document.querySelector(".final-message__button")) {
                            const finalButton = document.querySelector(".final-message__button");
                            finalButton.addEventListener("click", (e => {
                                currentTemplateID = removeDigitsAndUnderscore(e.target.id);
                                includeCurrentTemplate(currentTemplateID);
                                hiddenOrShowFooter();
                                scrollToTop();
                            }));
                        }
                    };
                    addListenerToAllRouteButtonsFinalMessage();
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
                chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element user-message__container">\n\t\t\t<div class="main-message-style user-message">${userMessage}</div>\n\t\t</div>\n\t`);
            }
            function addMessageToChat(question) {
                const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
                function delayedFunction() {
                    chatMessagesBlock.insertAdjacentHTML("beforeend", `\n\t\t<div class="post-request-vacancy-page__message-element app-message__container bot-message-animation">\n\t\t\t<div class="main-message-style app-message">${question}</div>\n\t\t</div>\n\t`);
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
            const checkQuestionsArray = [ `Ім'я та прізвище:`, `Номер телефону для зв'язку:`, `Місто проживання:`, `Дата народження:`, `Завантажене резюме:` ];
            const addAdditionalQuestionsToMainCheckQuestionsArray = (questionsObject, arrayToWrite) => {
                for (var key in questionsObject.forms) if (key.startsWith("q")) arrayToWrite.push(questionsObject.forms[key]);
            };
            const addInputFieldsToCheckPage = () => {
                const checkPageMainContainer = document.querySelector(".check-request-vacancy-page__items-container");
                if (reserveBranch === false) checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t<div class="check-request-vacancy-page__question-input-container">\n\t\t\t\t\t<div class="check-request-vacancy-page__check-question vacancy-title-on-check-page"> \n\t\t\t\t\t<span class="icon-vacancy-icon vacancy-mark"></span> Назва вакансії:</div>\n\t\t\t\t\t<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">${currentVacancyTitle}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`); else if (reserveBranch === true) checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t<div class="check-request-vacancy-page__question-input-container">\n\t\t\t\t\t<div class="check-request-vacancy-page__check-question vacancy-title-on-check-page"> \n\t\t\t\t\t<span class="icon-vacancy-icon vacancy-mark"></span> Назва вакансії:</div>\n\t\t\t\t\t<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">Резерв</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`);
                for (let i = 0; i < Object.keys(postVacancyObject).length - 1; i++) if (i < fixedQuestionsCounter) checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t\t<div data-key="${Object.keys(postVacancyObject)[i + 1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">\n\t\t\t\t\t\t<div class="check-request-vacancy-page__check-question"> \n\t\t\t\t\t\t<span class="icon-check green-check-mark"></span>\n\t\t\t\t\t\t<span class="icon-cross red-cross _hidden-icon"></span> ${checkQuestionsArray[i]}</div>\n\t\t\t\t\t\t<input disabled value="${postVacancyObject[Object.keys(postVacancyObject)[i + 1]]}" type="text" class="check-request-vacancy-page__check-input">\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class="check-request-vacancy-page__edit-button">\n\t\t\t\t\t\t<span class="icon-edit check-request-vacancy-page__edit-button-image edit-icon"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t`); else {
                    let objectElement = postVacancyObject[Object.keys(postVacancyObject)[i + 1]];
                    let objectElementAnswer = objectElement[Object.keys(objectElement)[0]];
                    checkPageMainContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="check-request-vacancy-page__check-item">\n\t\t\t\t\t<div data-key="${Object.keys(postVacancyObject)[i + 1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">\n\t\t\t\t\t\t<div class="check-request-vacancy-page__check-question"> <span class="icon-check green-check-mark"></span> <span class="icon-cross red-cross _hidden-icon"></span> ${checkQuestionsArray[i]}</div>\n\t\t\t\t\t\t<textarea disabled type="text" class="check-request-vacancy-page__check-input check-textarea">${objectElementAnswer}</textarea>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class="check-request-vacancy-page__edit-button">\n\t\t\t\t\t\t<span class="icon-edit check-request-vacancy-page__edit-button-image edit-icon"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t`);
                }
                addListenerOnEditButtons();
                inactiveCheckInputs();
                addAllInputsValidateListeners();
            };
            const addListenerOnEditButtons = () => {
                const allEditButtons = document.querySelectorAll(".check-request-vacancy-page__edit-button");
                for (let item of allEditButtons) item.addEventListener("click", (() => {
                    if (item.previousElementSibling.lastElementChild.hasAttribute("disabled")) activeCheckInput(item); else writeNewDataToPostVacancyObject(item);
                }));
            };
            const activeCheckInput = button => {
                if (button.classList.contains("check-request-vacancy-page__edit-button")) {
                    const allCheckItems = document.querySelectorAll(".check-request-vacancy-page__question-input-container");
                    for (let item of allCheckItems) {
                        item.lastElementChild.disabled = true;
                        item.lastElementChild.blur();
                        item.parentElement.classList.add("inactive-input-container-border");
                        item.parentElement.classList.remove("active-input-container-border");
                        if (item.nextElementSibling !== null) item.nextElementSibling.children[0].classList.remove("_hidden-icon");
                    }
                    let inputContainer = button.previousElementSibling;
                    inputContainer.lastElementChild.disabled = false;
                    inputContainer.lastElementChild.focus();
                    inputContainer.parentElement.classList.remove("inactive-input-container-border");
                    inputContainer.parentElement.classList.add("active-input-container-border");
                    inputContainer.nextElementSibling.children[0].classList.add("_hidden-icon");
                }
            };
            const inactiveCheckInputs = () => {
                const allCheckInputs = document.querySelectorAll(".check-request-vacancy-page__check-input");
                const allCheckEditButtonsImages = document.querySelectorAll(".check-request-vacancy-page__edit-button-image");
                document.addEventListener("click", (event => {
                    if (event.target) if (!event.target.classList.contains("check-request-vacancy-page__edit-button") && !event.target.classList.contains("check-request-vacancy-page__edit-button-image") && !event.target.classList.contains("check-request-vacancy-page__check-input") || event.target.classList.contains("check-request-vacancy-page__check-input") && !event.target.parentElement.parentElement.classList.contains("active-input-container-border")) {
                        for (let item of allCheckInputs) {
                            item.parentElement.parentElement.classList.add("inactive-input-container-border");
                            item.parentElement.parentElement.classList.remove("active-input-container-border");
                            item.blur();
                            item.disabled = true;
                        }
                        for (let item of allCheckEditButtonsImages) item.classList.remove("_hidden-icon");
                    }
                }));
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
            const checkActiveCheckbox = () => {
                let checkbox = document.querySelector(".check-request-vacancy-page__politics-input");
                if (checkbox.checked) return true;
            };
            const noCheckActiveCheckboxMessage = () => {
                let message = document.querySelector(".check-request-vacancy-page__politics-message");
                message.classList.remove("_hidden");
            };
            const addListenerToPoliticsCheckbox = () => {
                let checkbox = document.querySelector(".check-request-vacancy-page__politics-input");
                let message = document.querySelector(".check-request-vacancy-page__politics-message");
                checkbox.addEventListener("click", (() => {
                    if (checkbox.checked) message.classList.add("_hidden");
                }));
            };
            addListenerToPoliticsCheckbox();
            const sendObjectDataToServer = () => {
                const checkRequestVacancyButton = document.querySelector(".check-request-vacancy-page__request-button");
                checkRequestVacancyButton.addEventListener("click", (() => {
                    if (checkActiveCheckbox()) fetchPostData(postVacancyObject, currentVacancyID); else {
                        noCheckActiveCheckboxMessage();
                        console.log("checkbox not active");
                    }
                }));
            };
            sendObjectDataToServer();
            const addCVObjectToMainObject = cvObject => {
                cvObject.cv = {};
                return cvObject;
            };
            function fetchPostData(objectData, vacancyID) {
                let apiPostDataURL = "";
                if (reserveBranch === false) apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/${vacancyID}`; else if (reserveBranch === true) {
                    apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/reserve`;
                    currentVacancyTitle = "Резерв";
                }
                const data = addCVObjectToMainObject(objectData);
                objectData.kind = currentVacancyKind.toLowerCase();
                objectData.cv = currentFile;
                console.log(objectData);
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
                    if (validateAPIPostDataVacancy(data)) {
                        console.log("Отримано дані від сервера:", data);
                        showMainMessage(`\n\t\t\t\t\t<div class="main-message-template-style__message">\n\t\t\t\t\t\tЗаявка успішно надіслана. Перевірити статус, свої анкетні дані, або відкликати заявку ви можете в особистому кабінеті\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class="route-button main-message-template-style__home-button route-button-main-style button-effect">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>Зрозуміло</div>\n\t\t\t\t\t</button>\n\t\t\t\t`);
                    } else setTimeout((function() {
                        fetchPostData(objectData, vacancyID);
                    }), 2e3);
                })).catch((error => {
                    console.error("Помилка під час виконання POST-запиту:", error);
                    showMainMessage(errorMessage);
                }));
            }
            const addAllInputsValidateListeners = () => {
                const allCheckInputs = document.querySelectorAll(".check-request-vacancy-page__check-input");
                for (let i = 0; i < allCheckInputs.length; i++) allCheckInputs[i].setAttribute("check-item-number", `${i}`);
                for (let item of allCheckInputs) item.addEventListener("keyup", (event => {
                    if (+event.target.getAttribute("check-item-number") === 1) validateName(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 0); else if (+event.target.getAttribute("check-item-number") === 2) validatePhoneOnCheckPage(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 1); else if (+event.target.getAttribute("check-item-number") === 3) validateCity(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 2); else if (+event.target.getAttribute("check-item-number") === 4) validateBirthdayOnCheckPage(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 3); else if (+event.target.getAttribute("check-item-number") > 4) validateAdditionalAnswers(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 4);
                }));
            };
            const validateBirthdayOnCheckPage = date => {
                let errorsCounter = 0;
                let includeSymbols = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
                for (let i = 0; i < 10; i++) for (let j = 0; j < includeSymbols.length; j++) if (date[i] === includeSymbols[j]) errorsCounter++;
                if (date.length !== 10 || findAgeOnCheckPage(date) < 18 || findAgeOnCheckPage(date) > 70 || date[2] !== "." || date[5] !== "." || errorsCounter !== 8) return false; else return true;
            };
            const findAgeOnCheckPage = birthdate => {
                const [day, month, year] = birthdate.split(".");
                const birthDateObj = new Date(`${year}-${month}-${day}`);
                const currentDate = new Date;
                const ageInMillis = currentDate - birthDateObj;
                const ageInYears = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1e3));
                return ageInYears;
            };
            const validatePhoneOnCheckPage = phone => {
                let phoneToString = phone.toString();
                let phoneNumber = phoneToString.replaceAll(" ", "");
                let errorsCounter = 0;
                let includeSymbols = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
                includeSymbols.forEach((function(element) {
                    for (let i = 0; i < phoneNumber.length; i++) if (phoneNumber[i] === element) errorsCounter++;
                }));
                if (phoneNumber.length !== 12 || errorsCounter !== 12 || phoneNumber[0] !== "3" || phoneNumber[1] !== "8" || phoneNumber[2] !== "0") return false; else return true;
            };
            const addRedCross = (item, messageNumber) => {
                const errorMessages = [ "Поле має містити від 4 до 100 символів", "Введіть номер телефону у форматі: 380930000000 (без знаків +,),(, та пробілів)", "Поле має містити від 2 до 100 символів", "Введіть дату народження у форматі: 25.06.1997. Для заповнення заявки кандидату має виповнитись 18 років", "Поле має містити від 10 до 500 символів" ];
                item.previousElementSibling.querySelector(".red-cross").classList.remove("_hidden-icon");
                item.previousElementSibling.querySelector(".green-check-mark").classList.add("_hidden-icon");
                addErrorMessageOnCheckPage(errorMessages[messageNumber]);
            };
            const addGreenCheck = item => {
                item.previousElementSibling.querySelector(".green-check-mark").classList.remove("_hidden-icon");
                item.previousElementSibling.querySelector(".red-cross").classList.add("_hidden-icon");
                deleteErrorMessageOnCheckPage();
            };
            const addErrorMessageOnCheckPage = message => {
                const errorMessageElement = document.querySelector(".error-message-check-input");
                if (errorMessageElement.classList.contains("_hidden-error-message")) {
                    errorMessageElement.innerText = `${message}`;
                    errorMessageElement.classList.remove("_hidden-error-message");
                }
            };
            const deleteErrorMessageOnCheckPage = () => {
                const errorMessageElement = document.querySelector(".error-message-check-input");
                if (!errorMessageElement.classList.contains("_hidden-error-message")) {
                    errorMessageElement.classList.add("error-message-check-input-hidden");
                    function delay() {
                        errorMessageElement.classList.add("_hidden-error-message");
                        errorMessageElement.classList.remove("error-message-check-input-hidden");
                    }
                    setTimeout(delay, 500);
                }
            };
            const showMainMessage = messageText => {
                let message = document.querySelector(".main-message-template-style");
                message.classList.remove("_hidden-template");
                document.querySelector(".main-message-template-style__wrapper").innerHTML = `${messageText}`;
                showMessageAnimation();
                if (document.querySelector(".main-message-template-style__home-button")) reloadPageAfterClickHomeButton();
            };
            const showMessageAnimation = () => {
                document.querySelector(".main-message-template-style__wrapper").classList.add("position-message-animation");
                document.querySelector(".main-message-template-style__wrapper").classList.remove("hidden-message");
                let message = document.querySelector(".main-message-template-style");
                message.classList.add("yellow-bg-color-animation");
                function delay() {
                    message.classList.add("bg-yellow-color");
                    document.querySelector(".main-message-template-style__wrapper").classList.remove("margin-top");
                }
                setTimeout(delay, 990);
            };
            const reloadPageAfterClickHomeButton = () => {
                document.querySelector(".main-message-template-style__home-button").addEventListener("click", (() => {
                    window.location.reload();
                    let message = document.querySelector(".main-message-template-style");
                    message.classList.add("_hidden-template");
                }));
            };
            const writeDataToCabinet = data => {
                const cabinetWrapper = document.querySelector(".cabinet-page__wrapper");
                const cabinetMainButton = document.querySelector(".user-cabinet-main-page-button");
                if (data.cabinet === "") {
                    cabinetMainButton.classList.add("_hidden-cabinet-button");
                    cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="cabinet-page__item">\n\t\t\t\tЗаявки відсутні\n\t\t\t</div>\n\t\t`);
                } else {
                    cabinetMainButton.classList.remove("_hidden-cabinet-button");
                    if (data.cabinet.title === "Хочу бути номер 1") cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="cabinet-page__item">\n\t\t\t\t\t<div class="cabinet-page__item-name">Назва вакансії:</div>\n\t\t\t\t\t<textarea class="cabinet-page__item-value-vacancy" data-item="title">Резерв</textarea>\n\t\t\t\t</div>\n\t\t\t`); else if (data.cabinet.title !== "Хочу бути номер 1") cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="cabinet-page__item">\n\t\t\t\t\t<div class="cabinet-page__item-name">Назва вакансії:</div>\n\t\t\t\t\t<textarea class="cabinet-page__item-value-vacancy" data-item="title">${data.cabinet.title}</textarea>\n\t\t\t\t</div>\n\t\t\t`);
                    cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="cabinet-page__item">\n\t\t\t\t<div class="cabinet-page__item-name">Ім'я та прізвище:</div>\n\t\t\t\t<textarea class="cabinet-page__item-value cabinet-page__item-value-name" data-item="name">${data.cabinet.name}</textarea>\n\t\t\t</div>\n\t\t`);
                    cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="cabinet-page__item">\n\t\t\t\t<div class="cabinet-page__item-name">Телефон:</div>\n\t\t\t\t<textarea class="cabinet-page__item-value cabinet-page__item-value-phone" data-item="phone">${data.cabinet.feedback_phone}</textarea>\n\t\t\t</div>\n\t\t`);
                    cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="cabinet-page__item">\n\t\t\t\t<div class="cabinet-page__item-name">Місто:</div>\n\t\t\t\t<textarea class="cabinet-page__item-value cabinet-page__item-value-city" data-item="city">${data.cabinet.city}</textarea>\n\t\t\t</div>\n\t\t`);
                    cabinetWrapper.insertAdjacentHTML("beforeend", `\n\t\t\t<div class="cabinet-page__item">\n\t\t\t\t<div class="cabinet-page__item-name">Дата народження:</div>\n\t\t\t\t<textarea class="cabinet-page__item-value cabinet-page__item-value-birthday" data-item="birthday">${data.cabinet.birthday}</textarea>\n\t\t\t</div>\n\t\t`);
                }
            };
            writeDataToCabinet(globalCabinet);
            currentVacancyID = data.cabinet._id;
            searchButtonDeleteAddDelay();
            const deleteAddInCabinet = () => {
                fetch(`${actualHost}/del_order/${currentTelegramID}/${currentPassword}`).then((response => {
                    if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
                    return response.json();
                })).then((data => {
                    if (validateResponseAfterDeleteAdd(data)) showMainMessage(`\n\t\t\t\t\t<div class="main-message-template-style__message">\n\t\t\t\t\t\tВаша заявка успішно видалена\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class="route-button main-message-template-style__home-button route-button-main-style button-effect">\n\t\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t\t<div>На головну</div>\n\t\t\t\t\t</button>\n\t\t\t\t`); else setTimeout((function() {
                        deleteAddInCabinet();
                    }), 2e3);
                })).catch((error => {
                    console.error("Fetch error:", error);
                }));
            };
            function searchButtonDeleteAddDelay() {
                if (document.querySelector(".cabinet-page__delete-button")) document.querySelector(".cabinet-page__delete-button").addEventListener("click", (() => {
                    deleteAddInCabinet();
                }));
            }
            const addBackButtonMechanics = targetButton => {
                let currentId = removeDigitsAndUnderscore(targetButton.id);
                if (currentId !== "vacancy-page" && currentId !== "post-request-vacancy-page") templatesRoad.push(currentId); else if (currentId.includes("post-request-vacancy-page") && !templatesRoad[templatesRoad.length - 1].includes("post-request-vacancy-page")) templatesRoad.push(currentId); else if (currentId === "vacancy-page") {
                    let vacancyTitle = targetButton.lastElementChild.textContent;
                    let uniteName = currentId + ": " + vacancyTitle;
                    templatesRoad.push(uniteName);
                }
                if (templatesRoad[templatesRoad.length - 2] === templatesRoad[templatesRoad.length - 1]) templatesRoad.pop();
            };
            const backToPreviousTemplate = () => {
                if (templatesRoad[templatesRoad.length - 1] !== "post-request-vacancy-page") {
                    templatesRoad.pop();
                    let lastTemplate = templatesRoad[templatesRoad.length - 1];
                    includeLastTemplate(lastTemplate);
                    currentTemplateID = lastTemplate;
                    deleteChatContent();
                    console.log(templatesRoad);
                } else if (templatesRoad[templatesRoad.length - 1] === "post-request-vacancy-page") {
                    templatesRoad.pop();
                    let lastTemplate = templatesRoad[templatesRoad.length - 1];
                    currentTemplateID = lastTemplate;
                    console.log(lastTemplate);
                    console.log(currentVacancyID);
                    includeLastTemplate("vacancy-page");
                    includeLastVacancyContent();
                    deleteChatContent();
                }
            };
            const deleteChatContent = () => {
                fixedQuestionsCounter = 5;
                allQuestionsCounter = 5;
                questionsCounter = -1;
                answersCounter = -1;
                document.querySelector(".post-request-vacancy-page__messages-container").innerHTML = "";
                document.querySelector(".post-request-vacancy-page__messages-container").classList.remove("padding-message-container-final");
                document.querySelector(".post-request-vacancy-page__messages-container").classList.add("padding-message-container-chat");
            };
            const addListenerToBackButton = () => {
                const backButton = document.querySelector(".footer__button-back-link");
                backButton.addEventListener("click", (() => {
                    if (currentTemplateID === "post-request-vacancy-page" || currentTemplateID === "check-request-vacancy-page") {
                        console.log(currentTemplateID);
                        showMainMessage(`\n\t\t\t\t<div class="main-message-template-style__message">\n\t\t\t\t\tПісля виходу з чату ваші відповіді будуть видалені\n\t\t\t\t</div>\n\t\t\t\t<button class="route-button main-message-template-style__width route-button-main-style button-effect stay-in-chat-button">\n\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t<div>Залишитись</div>\n\t\t\t\t</button>\n\t\t\t\t<button class="route-button main-message-template-style__width route-button-main-style button-effect back-out-chat-button">\n\t\t\t\t\t<div id="circle"></div>\n\t\t\t\t\t<div>Вийти</div>\n\t\t\t\t</button>\n\t\t\t`);
                        document.querySelector(".stay-in-chat-button").addEventListener("click", (() => {
                            document.querySelector(".main-message-template-style").classList.add("_hidden-template");
                        }));
                        document.querySelector(".back-out-chat-button").addEventListener("click", (() => {
                            document.querySelector(".main-message-template-style").classList.add("_hidden-template");
                            if (templatesRoad[templatesRoad.length - 2] === "reserve-directions-page") {
                                includeLastTemplate("reserve-directions-page");
                                templatesRoad.pop();
                                currentTemplateID = templatesRoad[templatesRoad.length - 1];
                            } else backToPreviousTemplate();
                        }));
                    } else backToPreviousTemplate();
                    hiddenOrShowFooter();
                }));
            };
            addListenerToBackButton();
            const includeLastTemplate = currentTemplateID => {
                const allWidgetTemplates = document.querySelectorAll(".page-template");
                for (let item of allWidgetTemplates) if (item.id !== currentTemplateID && !firstEnter) {
                    item.classList.add("position-left-reverse");
                    setTimeout((function() {
                        item.classList.add("_hidden-template");
                        item.classList.remove("position-left-reverse");
                    }), 300);
                } else if (item.id === currentTemplateID && !firstEnter) setTimeout((function() {
                    item.classList.add("position-right-reverse");
                    item.classList.remove("_hidden-template");
                    setTimeout((function() {
                        item.classList.remove("position-right-reverse");
                    }), 100);
                }), 300);
            };
            const includeLastVacancyContent = () => {
                let lastVacancyTitle = "";
                let lastVacancyContent = "";
                for (let i = 0; i < globalVacancies.vacancies.length; i++) if (globalVacancies.vacancies[i]._id === +currentVacancyID) {
                    lastVacancyTitle = globalVacancies.vacancies[i].title;
                    lastVacancyContent = globalVacancies.vacancies[i].description_html;
                }
                const vacancyPageTitle = document.querySelector(".vacancy-page__title");
                const vacancyPageDescription = document.querySelector(".vacancy-page__content");
                vacancyPageTitle.innerHTML = lastVacancyTitle;
                vacancyPageDescription.innerHTML = lastVacancyContent;
            };
            const validateAPIPostDataVacancy = data => {
                if (data.first_name || data.telegram_id) return true;
            };
            const validateAdditionalAPIQuestions = data => {
                if (Object.keys(data.forms).length > 0) return true;
            };
            const validateResponseAfterDeleteAdd = data => {
                if (data.response === "the application has been withdrawn") return true;
            };
            const addYellowBGAfterClickOnReloadButton = () => {
                let reloadButton = document.querySelector(".footer__button-main-link");
                reloadButton.addEventListener("click", (() => {
                    reloadButton.classList.remove("_hidden-yellow-bg");
                }));
            };
            addYellowBGAfterClickOnReloadButton();
            const downloadPolitics = () => {
                const politicsContainer = document.querySelector(".politics-page__wrapper");
                fetch(`${actualHost}/politika-konfidencijnosti/${currentTelegramID}/${currentPassword}`).then((response => {
                    if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
                    return response.json();
                })).then((data => {
                    let resultText = cleanTagsStylesAndAttributes(data);
                    politicsContainer.insertAdjacentHTML("afterbegin", `${resultText}`);
                })).catch((error => {
                    console.error("Fetch error:", error);
                }));
            };
            const cleanTagsStylesAndAttributes = data => {
                let doc = (new DOMParser).parseFromString(data.text, "text/html");
                let styleTags = doc.querySelectorAll("style");
                styleTags.forEach((function(styleTag) {
                    styleTag.parentNode.removeChild(styleTag);
                }));
                let elements = doc.querySelectorAll("*");
                elements.forEach((function(element) {
                    element.removeAttribute("style");
                    element.style.fontFamily = "";
                }));
                let pTags = doc.querySelectorAll("p");
                pTags.forEach((function(pTag) {
                    pTag.style.marginTop = "15px";
                }));
                let cleanedHtml = (new XMLSerializer).serializeToString(doc);
                return cleanedHtml;
            };
            const downloadInformationAboutCompany = () => {
                let aboutAurora = document.querySelector(".about-aurora__container");
                let corporateCulture = document.querySelector(".corporate-culture__container");
                let auroraSport = document.querySelector(".aurora-sport__container");
                let socialResponsibility = document.querySelector(".social-responsibility__container");
                let aboutAuroraMainButton = document.querySelector(".about-company-main-page-button");
                aboutAuroraMainButton.addEventListener("click", (() => {
                    fetch(`${actualHost}/about_avrora/${currentTelegramID}/${currentPassword}`).then((response => {
                        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
                        return response.json();
                    })).then((data => {
                        aboutAurora.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data["Що ти знаєш про Аврору?"]}<div>`);
                        corporateCulture.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data["Корпоративна культура"]}<div>`);
                        auroraSport.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data["Аврора спорт"]}<div>`);
                        socialResponsibility.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data["Соціальна відповідальність"]}<div>`);
                    })).catch((error => {
                        console.error("Fetch error:", error);
                    }));
                }));
            };
            downloadInformationAboutCompany();
        }));
        __webpack_require__(69);
        document.addEventListener("DOMContentLoaded", (() => {}));
        window["FLS"] = true;
        isWebp();
    })();
})();