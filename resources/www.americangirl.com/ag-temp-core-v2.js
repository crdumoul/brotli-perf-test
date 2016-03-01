/* Copyright 2011, SiteSpect, Inc. All Rights Reserved. */
(function (h) {
	var d = h.document,
	j = {},
	m = h.encodeURIComponent;
	j.Cookie = function () {
		return {
			get : function (h, a) {
				if (h) {
					var b;
					var f = d.cookie;
					b = " " + h + "=";
					var f = " " + f + ";",
					e = f.indexOf(b);
					e >= 0 ? (e += b.length, b = decodeURIComponent(f.substring(e, f.indexOf(";", e)))) : b = "";
					if (!b)
						return "";
					a && (a = a.substr(0, 1).toLowerCase());
					switch (a) {
					case "s":
						return b;
					case "a":
						return b.split("\u000b");
					default:
						return b.match("\u000b") ? b.split("\u000b") : b
					}
				}
			},
			set : function (k, a, b, f, e, c) {
				if (k && !/^(?:expires|max-age|path|domain|secure|HttpOnly)$/i.test(k))
					typeof a === "object" && (a = a.join("\u000b")), !b || b.toString().substr(0, 1) !== ";" ? (c || (c = "/"), e || (e = h.location.hostname.match(/^[\d.]+|(?:\.[\da-z\-]+)*[\da-z\-]+\.[\da-z\-]+$/i)[0]), e.substr(0, 1) !== "." && (e = "." + e), f = !f ? "" : ";secure", b != null && (b = parseInt(b, 10), isNaN(b) && (b = 0), b = ";expires=" + (new Date(+new Date + b)).toUTCString()), c = ";path=" + c + ";domain=" + e + b + f) : c = b, k = m(k) + "=" + m(a) + c, d.cookie = k
			}
		}
	}
	();
	j.JSEvents = function () {
		function k(a, b, f) {
			a.addEventListener ? a.addEventListener(b, f, false) : a.attachEvent && a.attachEvent("on" +
				b, f)
		}
		return {
			on : k,
			off : function (a, b, f) {
				a.removeEventListener ? a.removeEventListener(b, f, false) : a.detachEvent && a.detachEvent("on" + b, f)
			},
			trgt : function (a) {
				if (!a)
					a = h.event;
				a = a.target || a.srcElement || d;
				if (a.nodeType === 3)
					a = a.parentNode;
				return a
			},
			ready : function (a) {
				var b = false,
				f = false,
				e,
				c;
				e = function () {
					if (!b) {
						if (!d.body)
							return setTimeout(e, 1);
						b = true;
						a()
					}
				};
				if (d.addEventListener)
					c = function () {
						d.removeEventListener("DOMContentLoaded", c, false);
						e()
					},
				d.addEventListener("DOMContentLoaded", c, false);
				else if (d.attachEvent) {
					c = function () {
						d.readyState === "complete" && (d.detachEvent("onreadystatechange", c), e())
					};
					d.attachEvent("onreadystatechange", c);
					try {
						f = h.frameElement === null
					} catch (q) {}
					d.documentElement.doScroll && f && function g() {
						if (!b) {
							try {
								d.documentElement.doScroll("left")
							} catch (a) {
								setTimeout(g, 1);
								return
							}
							e()
						}
					}
					()
				}
				k(h, "load", e)
			}
		}
	}
	();
	j.TimerFactory = function () {
		function d() {
			var a = -1,
			b = -1;
			return {
				start : function (b) {
					a = (b || new Date).getTime();
					return a > 0
				},
				stop : function () {
					b = (new Date).getTime();
					return b > 0
				},
				reset : function () {
					b = a = -1
				},
				diff : function () {
					if (a <= 0)
						throw "Failure to Start Timer";
					if (b <= 0)
						throw "Failure to Stop Timer";
					if (a > b)
						throw "Failure to Reset Timer";
					return (b - a) / 1E3
				}
			}
		}
		return {
			get : function () {
				return new d
			}
		}
	}
	();
	j.EventTrack = function () {
		function kAsync(b) {
			b += "-1";
			var a;
			try {
				a = h.ActiveXObject ? new h.ActiveXObject("Microsoft.XMLHTTP") : new h.XMLHttpRequest,
				a.open("GET", b, true)
			} catch (e) {
				return false
			}
			try {
				a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
				a.setRequestHeader("Accept", "*/*")
			} catch (d) {}
			try {
				a.send(null)
			} catch (f) {
				if (f.number & 1)
					return false
			}
			c[c.length] = a;
			return true
		}
		function kSync(b) {
			b += "-1";
			var a;
			try {
				a = h.ActiveXObject ? new h.ActiveXObject("Microsoft.XMLHTTP") : new h.XMLHttpRequest,
				a.open("GET", b, false)
			} catch (e) {
				return false
			}
			try {
				a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
				a.setRequestHeader("Accept", "*/*")
			} catch (d) {}
			try {
				a.send(null)
			} catch (f) {
				if (f.number & 1)
					return false
			}
			c[c.length] = a;
			return true
		}
		var a = document.location.hostname,
		b = "" || h.location.protocol,
		f = "/__ssobj/track",
		e = Math.floor(Math.random() * 99999999),
		c = [];
		return {
			rp : function (j, n) {
				var g;
				g = j;
				var i = n,
				p = (new Date).getTime() + e,
				o = [],
				l;
				if (typeof g === "object") {
					for (l = 0; l < g.length; l++)
						g[l] = "event" + l + "=" + m(g[l]);
					g = g.join("&")
				} else
					g = "event=" + m(g);
				if (i && typeof i === "object") {
					for (l in i)
						i.hasOwnProperty(l) && (o[o.length] = "value_" + m(l) + "=" + m(i[l]));
					i = o.join("&")
				} else
					i = "value=" + m(i != null ? i : "");
				g = b + "//" + a + f + "?" + g + "&" + i + "&x=" + p;
				if (h.location.hostname !== a || !kAsync(g))
					b === "https:" ? (i = g, i += "-3", g = "SS.IMG" + e, i = '<img src="' + i + '" height="1" width="1" border="0" id="' + g + '" />', (!d.readyState || d.readyState === "complete") && d.body && d.body.innerHTML ? d.body.innerHTML += i : d.write(i), d.getElementById && (g = d.getElementById(g), c[c.length] = g)) : (g += "-2", i = new Image, i.src = g, c[c.length] = i)
			},
			rpSync : function (j, n) {
				var g;
				g = j;
				var i = n,
				p = (new Date).getTime() + e,
				o = [],
				l;
				if (typeof g === "object") {
					for (l = 0; l < g.length; l++)
						g[l] = "event" + l + "=" + m(g[l]);
					g = g.join("&")
				} else
					g = "event=" + m(g);
				if (i && typeof i === "object") {
					for (l in i)
						i.hasOwnProperty(l) && (o[o.length] = "value_" + m(l) + "=" + m(i[l]));
					i = o.join("&")
				} else
					i = "value=" + m(i != null ? i : "");
				g = b + "//" + a + f + "?" + g + "&" + i + "&x=" + p;
				if (h.location.hostname !== a || !kSync(g))
					b === "https:" ? (i = g, i += "-3", g = "SS.IMG" + e, i = '<img src="' + i + '" height="1" width="1" border="0" id="' + g + '" />', (!d.readyState || d.readyState === "complete") && d.body && d.body.innerHTML ? d.body.innerHTML += i : d.write(i), d.getElementById && (g = d.getElementById(g), c[c.length] = g)) : (g += "-2", i = new Image, i.src = g, c[c.length] = i)
			},
			rpAsync : function (j, n) {
				var g;
				g = j;
				var i = n,
				p = (new Date).getTime() + e,
				o = [],
				l;
				if (typeof g === "object") {
					for (l = 0; l < g.length; l++)
						g[l] = "event" + l + "=" + m(g[l]);
					g = g.join("&")
				} else
					g = "event=" + m(g);
				if (i && typeof i === "object") {
					for (l in i)
						i.hasOwnProperty(l) && (o[o.length] = "value_" + m(l) + "=" + m(i[l]));
					i = o.join("&")
				} else
					i = "value=" + m(i != null ? i : "");
				g = b + "//" + a + f + "?" + g + "&" + i + "&x=" + p;
				if (h.location.hostname !== a || !kAsync(g))
					b === "https:" ? (i = g, i += "-3", g = "SS.IMG" + e, i = '<img src="' + i + '" height="1" width="1" border="0" id="' + g + '" />', (!d.readyState || d.readyState === "complete") && d.body && d.body.innerHTML ? d.body.innerHTML += i : d.write(i), d.getElementById && (g = d.getElementById(g), c[c.length] = g)) : (g += "-2", i = new Image, i.src = g, c[c.length] = i)
			},
			r : c
		}
	}
	();
	j.PageTimer = function () {
		function d(a) {
			var c = false;
			return function () {
				if (f && !c && (c = true, b.stop()))
					try {
						var d = b.diff();
						d <= 1795 && j.EventTrack.rp(a, d)
					} catch (h) {}

			}
		}
		var a = j.JSEvents,
		b,
		f;
		return {
			time : function (e, c, m) {
				b = j.TimerFactory.get();
				if (f = b.start(m)) {
					var n = d(c),
					c = false;
					e === "ready" ? (a.ready(n), c = true) : e === "load" ? (a.on(h, "load", n), c = true) : e === "dwell" ? (a.on(h, "unload", n), c = true) : e === "abandon" && (a.on(h, "unload", n), a.on(h, "load", function () {
							a.off(h, "unload", n)
						}), c = true);
					return c
				} else
					return false
			}
		}
	}
	();
	h.SS = j
})(this);
