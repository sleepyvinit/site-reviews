! function(t, i, s) {
    "use strict";
    var n = function(t, s) {
            var n = {}.toString.call(t);
            this.selects = "[object String]" === n ? i.querySelectorAll(t) : "[object NodeList]" === n ? t : [t], this.destroy = function() {
                this.widgets.forEach(function(t) {
                    t.t()
                })
            }, this.rebuild = function() {
                this.widgets.forEach(function(t) {
                    t.i()
                })
            }, this.widgets = [];
            for (var e = 0; e < this.selects.length; e++)
                if ("SELECT" === this.selects[e].tagName && !this.selects[e]["star-rating"]) {
                    var o = new h(this.selects[e], s);
                    void 0 !== o.direction && this.widgets.push(o)
                }
        },
        h = function(t, i) {
            this.el = t, this.s = this.h({}, this.o, i || {}, JSON.parse(t.getAttribute("data-options"))), this.u(), this.stars < 1 || this.stars > this.s.maxStars || this.l()
        };
    h.prototype = {
        o: {
            classname: "gl-star-rating",
            clearable: !0,
            initialText: "Select a Rating",
            maxStars: 10,
            showText: !0
        },
        l: function() {
            this.v(), this.current = this.selected = this.m(), this._(), this.p(), this.g(), this.S(this.current), this.R("add"), this.el["star-rating"] = !0
        },
        L: function() {
            this.s.showText && (this.textEl = this.G(this.widgetEl, {
                class: this.s.classname + "-text"
            }, !0))
        },
        p: function() {
            var t = this.F(),
                i = this.G(this.el, {
                    class: this.s.classname + "-stars"
                }, !0);
            for (var s in t) {
                var n = this.T({
                    "data-value": s,
                    "data-text": t[s]
                });
                i.innerHTML += n.outerHTML
            }
            this.widgetEl = i, this.L()
        },
        j: function(t) {
            (t < 0 || isNaN(t)) && (t = 0), t > this.stars && (t = this.stars), this.widgetEl.classList.remove("s" + 10 * this.current), this.widgetEl.classList.add("s" + 10 * t), this.s.showText && (this.textEl.textContent = t < 1 ? this.s.initialText : this.widgetEl.childNodes[t - 1].dataset.text), this.current = t
        },
        T: function(t) {
            var s = i.createElement("span");
            for (var n in t = t || {}) s.setAttribute(n, t[n]);
            return s
        },
        t: function() {
            this.R("remove");
            var t = this.el.parentNode;
            t.parentNode.replaceChild(this.el, t), delete this.el["star-rating"]
        },
        M: function(t, i, s) {
            s.forEach(function(s) {
                t[i + "EventListener"](s, this.events[s])
            }.bind(this))
        },
        h: function() {
            var t = [].slice.call(arguments),
                i = t[0],
                s = t.slice(1);
            return Object.keys(s).forEach(function(t) {
                for (var n in s[t]) s[t].hasOwnProperty(n) && (i[n] = s[t][n])
            }), i
        },
        O: function(t) {
            var i = {},
                s = t.pageX || t.changedTouches[0].pageX,
                n = this.widgetEl.offsetWidth;
            return i.ltr = Math.max(s - this.offsetLeft, 1), i.rtl = n - i.ltr, Math.min(Math.ceil(i[this.direction] / Math.round(n / this.stars)), this.stars)
        },
        F: function() {
            for (var t = this.el, i = {}, s = {}, n = 0; n < t.length; n++) this.k(t[n]) || (i[t[n].value] = t[n].text);
            return Object.keys(i).sort().forEach(function(t) {
                s[t] = i[t]
            }), s
        },
        m: function() {
            return parseInt(this.el.options[Math.max(this.el.selectedIndex, 0)].value) || 0
        },
        R: function(t) {
            var i = this.el.closest("form");
            i && "FORM" === i.tagName && this.M(i, t, ["reset"]), this.M(this.el, t, ["change", "keydown"]), this.M(this.widgetEl, t, ["mousedown", "mouseleave", "mousemove", "mouseover", "touchend", "touchmove", "touchstart"])
        },
        v: function() {
            this.events = {
                change: this.C.bind(this),
                keydown: this.N.bind(this),
                mousedown: this.D.bind(this),
                mouseleave: this.I.bind(this),
                mousemove: this.q.bind(this),
                mouseover: this.V.bind(this),
                reset: this.A.bind(this),
                touchend: this.D.bind(this),
                touchmove: this.q.bind(this),
                touchstart: this.V.bind(this)
            }
        },
        G: function(t, i, s) {
            var n = this.T(i);
            return t.parentNode.insertBefore(n, !0 === s ? t.nextSibling : t), n
        },
        k: function(t) {
            return null === t.getAttribute("value") || "" === t.value
        },
        C: function() {
            this.j(this.m())
        },
        N: function(t) {
            if (~["ArrowLeft", "ArrowRight"].indexOf(t.key)) {
                var i = "ArrowLeft" === t.key ? -1 : 1;
                "rtl" === this.direction && (i *= -1), this.S(Math.min(Math.max(this.m() + i, 0), this.stars)), this.H()
            }
        },
        D: function(t) {
            t.preventDefault();
            var i = this.O(t);
            if (0 !== this.current && parseFloat(this.selected) === i && this.s.clearable) return this.A(), void this.H();
            this.S(i), this.H()
        },
        I: function(t) {
            t.preventDefault(), this.j(this.selected)
        },
        q: function(t) {
            t.preventDefault(), this.j(this.O(t))
        },
        V: function(t) {
            t.preventDefault();
            var s = this.widgetEl.getBoundingClientRect();
            this.offsetLeft = s.left + i.body.scrollLeft
        },
        A: function() {
            var t = this.el.querySelector("[selected]"),
                i = t ? t.value : "";
            this.el.value = i, this.selected = parseInt(i) || 0, this.j(i)
        },
        i: function() {
            this.el.parentNode.classList.contains(this.s.classname) && this.t(), this.l()
        },
        g: function() {
            var i = this.el.parentNode;
            this.direction = t.getComputedStyle(i, null).getPropertyValue("direction"), i.classList.add(this.s.classname + "-" + this.direction)
        },
        S: function(t) {
            this.el.value = this.selected = t, this.j(t)
        },
        u: function() {
            var t = this.el;
            this.stars = 0;
            for (var i = 0; i < t.length; i++)
                if (!this.k(t[i])) {
                    if (isNaN(parseFloat(t[i].value)) || !isFinite(t[i].value)) return void(this.stars = 0);
                    this.stars++
                }
        },
        H: function() {
            this.el.dispatchEvent(new Event("change"))
        },
        _: function() {
            this.G(this.el, {
                class: this.s.classname,
                "data-star-rating": ""
            }).appendChild(this.el)
        }
    }, "function" == typeof define && define.amd ? define([], function() {
        return n
    }) : "object" == typeof module && module.exports ? module.exports = n : t.StarRating = n
}(window, document), window.hasOwnProperty("GLSR") || (window.GLSR = {}), window.GLSR.forms = [],
    function() {
        "use strict";
        GLSR.Ajax = function() {}, GLSR.Ajax.prototype = {
            get: function(t, i, s) {
                this.P(i), this.xhr.open("GET", t, !0), this.xhr.responseType = "text", this.B(s), this.xhr.send()
            },
            U: function(t) {
                return "json" === this.xhr.responseType || !0 === this.xhr.json ? t({
                    message: this.xhr.statusText
                }, !1) : "text" === this.xhr.responseType ? t(this.xhr.statusText) : void 0
            },
            W: function(t) {
                if (0 === this.xhr.status || this.xhr.status >= 200 && this.xhr.status < 300 || 304 === this.xhr.status) {
                    if ("json" === this.xhr.responseType) return t(this.xhr.response.data, this.xhr.response.success);
                    if ("text" === this.xhr.responseType) return t(this.xhr.responseText);
                    if (!0 === this.xhr.json) {
                        var i = JSON.parse(this.xhr.response);
                        return t(i.data, i.success)
                    }
                } else this.U(t)
            },
            isFileSupported: function() {
                var t = document.createElement("INPUT");
                return t.type = "file", "files" in t
            },
            isFormDataSupported: function() {
                return !!window.FormData
            },
            isUploadSupported: function() {
                var t = new XMLHttpRequest;
                return !!(t && "upload" in t && "onprogress" in t.upload)
            },
            post: function(t, i, s) {
                this.P(i), this.xhr.open("POST", GLSR.ajaxurl, !0), this.xhr.responseType = "json", this.xhr.json = !0, this.B(s), this.xhr.send(this.X(t))
            },
            P: function(t) {
                this.xhr = new XMLHttpRequest, this.xhr.onload = this.W.bind(this, t), this.xhr.onerror = this.U.bind(this, t)
            },
            J: function(t, i, s) {
                return "object" != typeof i || i instanceof Date || i instanceof File ? t.append(s, i || "") : Object.keys(i).forEach(function(n) {
                    i.hasOwnProperty(n) && (t = this.J(t, i[n], s ? s[n] : n))
                }.bind(this)), t
            },
            X: function(t) {
                var i = new FormData;
                return "[object HTMLFormElement]" === Object.prototype.toString.call(t) && (i = new FormData(t)), "[object Object]" === Object.prototype.toString.call(t) && Object.keys(t).forEach(function(s) {
                    i.append(s, t[s])
                }), i.append("action", GLSR.action), i.append("_ajax_request", !0), i
            },
            B: function(t) {
                for (var i in (t = t || {})["X-Requested-With"] = "XMLHttpRequest", t) t.hasOwnProperty(i) && this.xhr.setRequestHeader(i, t[i])
            }
        }
    }(),
    function() {
        "use strict";
        GLSR.Excerpts = function(t) {
            this.l(t || document)
        }, GLSR.Excerpts.prototype = {
            config: {
                hiddenClass: "glsr-hidden",
                hiddenTextSelector: ".glsr-hidden-text",
                readMoreClass: "glsr-read-more",
                visibleClass: "glsr-visible"
            },
            Y: function(t) {
                var i = document.createElement("span"),
                    s = document.createElement("a");
                s.setAttribute("href", "#"), s.setAttribute("data-text", t.getAttribute("data-show-less")), s.innerHTML = t.getAttribute("data-show-more"), s.addEventListener("click", this.K.bind(this)), i.setAttribute("class", this.config.readMoreClass), i.appendChild(s), t.parentNode.insertBefore(i, t.nextSibling)
            },
            K: function(t) {
                t.preventDefault();
                var i = t.currentTarget,
                    s = i.parentNode.previousSibling,
                    n = i.getAttribute("data-text");
                s.classList.toggle(this.config.hiddenClass), s.classList.toggle(this.config.visibleClass), i.setAttribute("data-text", i.innerText), i.innerText = n
            },
            l: function(t) {
                for (var i = t.querySelectorAll(this.config.hiddenTextSelector), s = 0; s < i.length; s++) this.Y(i[s])
            }
        }
    }(),
    function() {
        "use strict";
        var t = function(t, i) {
            this.button = i, this.config = GLSR.validationconfig, this.events = {
                submit: this.$.bind(this)
            }, this.form = t, this.isActive = !1, this.recaptcha = new GLSR.Recaptcha(this), this.stars = null, this.strings = GLSR.validationstrings, this.useAjax = this.Z(), this.validation = new GLSR.Validation(t)
        };
        t.prototype = {
            destroy: function() {
                this.destroyForm(), this.destroyRecaptcha(), this.destroyStarRatings(), this.isActive = !1
            },
            destroyForm: function() {
                this.form.removeEventListener("submit", this.events.submit)
            },
            destroyRecaptcha: function() {
                this.recaptcha.t()
            },
            destroyStarRatings: function() {
                this.stars && (this.stars.destroy(), delete this.stars)
            },
            init: function() {
                this.isActive || (this.initForm(), this.initStarRatings(), this.initRecaptcha(), this.isActive = !0)
            },
            initForm: function() {
                this.destroyForm(), this.form.addEventListener("submit", this.events.submit)
            },
            initRecaptcha: function() {
                this.recaptcha.tt()
            },
            initStarRatings: function() {
                this.destroyStarRatings(), this.stars = new StarRating(this.form.querySelectorAll("select.glsr-star-rating"), {
                    clearable: !1,
                    showText: !1
                })
            },
            it: function(t, i, s) {
                t.classList[s ? "add" : "remove"](i)
            },
            st: function() {
                this.button.setAttribute("disabled", "")
            },
            nt: function() {
                this.button.removeAttribute("disabled")
            },
            ht: function(t, i) {
                var s = !0 === i;
                "unset" !== t.recaptcha ? ("reset" === t.recaptcha && this.recaptcha.et(), s && (this.recaptcha.et(), this.form.reset()), this.ot(t.errors), this.rt(t.message, s), this.nt(), t.form = this.form, document.dispatchEvent(new CustomEvent("site-reviews/after/submission", {
                    detail: t
                })), s && "" !== t.redirect && (window.location = t.redirect)) : this.recaptcha.at()
            },
            Z: function() {
                var t = new GLSR.Ajax,
                    i = !0;
                return [].forEach.call(this.form.elements, function(s) {
                    "file" === s.type && (i = t.isFileSupported() && t.isUploadSupported())
                }), i && !this.form.classList.contains("no-ajax")
            },
            $: function(t) {
                if (!this.validation.ut()) return t.preventDefault(), void this.rt(this.strings.errors, !1);
                this.ct(), (this.form["g-recaptcha-response"] && "" === this.form["g-recaptcha-response"].value || this.useAjax) && (t.preventDefault(), this.ft())
            },
            ct: function() {
                this.rt("", !0), this.validation.et()
            },
            ot: function(t) {
                if (t)
                    for (var i in t)
                        if (t.hasOwnProperty(i)) {
                            var s = GLSR.nameprefix ? GLSR.nameprefix + "[" + i + "]" : i,
                                n = this.form.querySelector('[name="' + s + '"]');
                            this.validation.dt(n, t[i]), this.validation.lt(n.validation, "add")
                        }
            },
            rt: function(t, i) {
                var s = this.form.querySelector("." + this.config.message_tag_class);
                null === s && ((s = document.createElement(this.config.message_tag)).className = this.config.message_tag_class, this.button.parentNode.insertBefore(s, this.button.nextSibling)), this.it(s, this.config.message_error_class, !i), this.it(s, this.config.message_success_class, i), s.classList.remove(this.config.message_initial_class), s.innerHTML = t
            },
            ft: function(t) {
                (new GLSR.Ajax).isFormDataSupported() ? (this.st(), this.form[GLSR.nameprefix + "[_counter]"].value = t || 0, (new GLSR.Ajax).post(this.form, this.ht.bind(this))) : this.rt(this.strings.unsupported, !1)
            }
        }, GLSR.Forms = function(i) {
            var s, n, h;
            n = document.querySelectorAll("form.glsr-form");
            for (var e = 0; e < n.length; e++)
                if (h = n[e].querySelector("[type=submit]")) {
                    var o = GLSR.forms.findIndex(function(t) {
                        return t.form === n[e]
                    }); - 1 !== o && i ? GLSR.forms[o].init() : (s = new t(n[e], h), i && s.init(), GLSR.forms.push(s))
                }
        }
    }(),
    function() {
        "use strict";
        var t = function(t) {
            this.el = t, this.v()
        };
        t.prototype = {
            config: {
                hideClass: "glsr-hide",
                linkSelector: ".glsr-pagination a",
                scrollTime: 468
            },
            ht: function(t, i, s) {
                var n = this.el.querySelector(".glsr-pagination"),
                    h = this.el.querySelector(".glsr-reviews");
                s && h && n ? (n.outerHTML = i.pagination, h.outerHTML = i.reviews, this.vt(this.el), this.el.classList.remove(this.config.hideClass), this.v(), window.history.pushState(null, "", t), new GLSR.Excerpts(this.el)) : window.location = t
            },
            v: function() {
                for (var t = this.el.querySelectorAll(this.config.linkSelector), i = 0; i < t.length; i++) t[i].addEventListener("click", this.K.bind(this))
            },
            K: function(t) {
                var i = this.el.querySelector("glsr-pagination");
                if (i) {
                    var s = {};
                    s[GLSR.nameprefix + "[_action]"] = "fetch-paged-reviews", s[GLSR.nameprefix + "[atts]"] = i.dataset.atts, s[GLSR.nameprefix + "[url]"] = t.currentTarget.href, this.el.classList.add(this.config.hideClass), t.preventDefault(), (new GLSR.Ajax).post(s, this.ht.bind(this, t.currentTarget.href))
                }
            },
            vt: function(t, i) {
                var s;
                i = i || 16;
                for (var n = 0; n < GLSR.ajaxpagination.length; n++)(s = document.querySelector(GLSR.ajaxpagination[n])) && "fixed" === window.getComputedStyle(s).getPropertyValue("position") && (i += s.clientHeight);
                var h = t.getBoundingClientRect().top - i;
                h > 0 || this._t({
                    endY: h,
                    offset: window.pageYOffset,
                    startTime: window.performance.now(),
                    startY: t.scrollTop
                })
            },
            _t: function(t) {
                var i = (window.performance.now() - t.startTime) / this.config.scrollTime;
                i = i > 1 ? 1 : i;
                var s = .5 * (1 - Math.cos(Math.PI * i)),
                    n = t.startY + (t.endY - t.startY) * s;
                window.scroll(0, t.offset + n), n !== t.endY && window.requestAnimationFrame(this._t.bind(this, t))
            }
        }, GLSR.Pagination = function() {
            this.navs = [];
            var i = document.querySelectorAll(".glsr-ajax-pagination");
            i.length && i.forEach(function(i) {
                this.navs.push(new t(i))
            }.bind(this))
        }
    }(),
    function() {
        "use strict";
        GLSR.Recaptcha = function(t) {
            this.Form = t, this.counter = 0, this.id = -1, this.is_submitting = !1, this.recaptchaEl = t.form.querySelector(".glsr-recaptcha-holder"), this.observer = new MutationObserver(function(t) {
                var i = t.pop();
                i.target && "visible" !== i.target.style.visibility && (this.observer.disconnect(), setTimeout(function() {
                    this.is_submitting || this.Form.nt()
                }.bind(this), 250))
            }.bind(this))
        }, GLSR.Recaptcha.prototype = {
            t: function() {
                this.counter = 0, this.id = -1, this.is_submitting = !1, this.recaptchaEl && (this.recaptchaEl.innerHTML = "")
            },
            at: function() {
                if (-1 !== this.id) return this.counter = 0, this.wt(this.id), void grecaptcha.execute(this.id);
                setTimeout(function() {
                    this.counter++, this.ft.call(this.Form, this.counter)
                }.bind(this), 1e3)
            },
            wt: function(t) {
                var i = window.___grecaptcha_cfg.clients[t];
                for (var s in i)
                    if (i.hasOwnProperty(s) && "[object String]" === Object.prototype.toString.call(i[s])) {
                        var n = document.querySelector("iframe[name=c-" + i[s] + "]");
                        if (n) {
                            this.observer.observe(n.parentElement.parentElement, {
                                attributeFilter: ["style"],
                                attributes: !0
                            });
                            break
                        }
                    }
            },
            tt: function() {
                this.Form.form.onsubmit = null, this.t(), this.pt()
            },
            pt: function() {
                this.recaptchaEl && setTimeout(function() {
                    if ("undefined" == typeof grecaptcha || void 0 === grecaptcha.render) return this.pt();
                    this.id = grecaptcha.render(this.recaptchaEl, {
                        callback: this.ft.bind(this.Form, this.counter),
                        "expired-callback": this.et.bind(this),
                        isolated: !0
                    }, !0)
                }.bind(this), 250)
            },
            et: function() {
                this.counter = 0, this.is_submitting = !1, -1 !== this.id && grecaptcha.reset(this.id)
            },
            ft: function(t) {
                if (this.recaptcha.is_submitting = !0, !this.useAjax) return this.st(), void this.form.submit();
                this.ft(t)
            }
        }
    }(),
    function() {
        "use strict";

        function t(t) {
            var i = 'input[name="' + t.getAttribute("name") + '"]:checked';
            return t.validation.form.querySelectorAll(i).length
        }
        var i = {
            email: {
                fn: function(t) {
                    return !t || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
                }
            },
            max: {
                fn: function(i, s) {
                    return !i || ("checkbox" === this.type ? t(this) <= parseInt(s) : parseFloat(i) <= parseFloat(s))
                }
            },
            maxlength: {
                fn: function(t, i) {
                    return !t || t.length <= parseInt(i)
                }
            },
            min: {
                fn: function(i, s) {
                    return !i || ("checkbox" === this.type ? t(this) >= parseInt(s) : parseFloat(i) >= parseFloat(s))
                }
            },
            minlength: {
                fn: function(t, i) {
                    return !t || t.length >= parseInt(i)
                }
            },
            number: {
                fn: function(t) {
                    return !t || !isNaN(parseFloat(t))
                },
                priority: 2
            },
            required: {
                fn: function(i) {
                    return "radio" === this.type || "checkbox" === this.type ? t(this) : void 0 !== i && "" !== i
                },
                priority: 99,
                halt: !0
            }
        };
        GLSR.Validation = function(t) {
            this.config = GLSR.validationconfig, this.form = t, this.form.setAttribute("novalidate", ""), this.strings = GLSR.validationstrings, this.l()
        }, GLSR.Validation.prototype = {
            gt: ["required", "max", "maxlength", "min", "minlength", "pattern"],
            St: "input:not([type^=hidden]):not([type^=submit]), select, textarea",
            Rt: function(t) {
                var i = ~["radio", "checkbox"].indexOf(t.getAttribute("type")) || "SELECT" === t.nodeName ? "change" : "input";
                t.addEventListener(i, function(t) {
                    this.ut(t.target)
                }.bind(this))
            },
            Lt: function(t, i, s) {
                [].forEach.call(t, function(t) {
                    ~this.gt.indexOf(t.name) ? this.bt(i, s, t.name, t.value) : "type" === t.name && this.bt(i, s, t.value)
                }.bind(this))
            },
            bt: function(t, s, n, h) {
                if (i[n] && (i[n].name = n, t.push(i[n]), h)) {
                    var e = h.split(",");
                    e.unshift(null), s[n] = e
                }
            },
            et: function() {
                for (var t in this.fields) this.fields.hasOwnProperty(t) && (this.fields[t].errorElements = null, this.fields[t].input.classList.remove(this.config.input_error_class), this.fields[t].input.classList.remove(this.config.input_valid_class));
                [].map.call(this.form.querySelectorAll("." + this.config.error_tag_class), function(t) {
                    t.parentNode.classList.remove(this.config.field_error_class), t.parentNode.removeChild(t)
                }.bind(this))
            },
            h: function() {
                var t = [].slice.call(arguments),
                    i = t[0],
                    s = t.slice(1);
                return Object.keys(s).forEach(function(t) {
                    for (var n in s[t]) s[t].hasOwnProperty(n) && (i[n] = s[t][n])
                }), i
            },
            Gt: function(t) {
                if (t.errorElements) return t.errorElements;
                var i, s = t.input.closest("." + this.config.field_class);
                return s && null === (i = s.closest("." + this.config.error_tag_class)) && ((i = document.createElement(this.config.error_tag)).className = this.config.error_tag_class, s.appendChild(i)), t.errorElements = [s, i]
            },
            l: function() {
                this.fields = [].map.call(this.form.querySelectorAll(this.St), function(t) {
                    return this.Et(t)
                }.bind(this))
            },
            Et: function(t) {
                var i = {},
                    s = [];
                return this.Lt(t.attributes, s, i), this.xt(s), this.Rt(t), t.validation = {
                    form: this.form,
                    input: t,
                    params: i,
                    validators: s
                }
            },
            lt: function(t, i) {
                var s = this.Gt(t),
                    n = "add" === i;
                t.input.classList[i](this.config.input_error_class), t.input.classList[n ? "remove" : "add"](this.config.input_valid_class), s[0] && s[0].classList[i](this.config.field_error_class), s[1] && (s[1].innerHTML = n ? t.errors.join("<br>") : "", s[1].style.display = n ? "" : "none")
            },
            dt: function(t, i) {
                t.validation || this.Et(t), t.validation.errors = i
            },
            xt: function(t) {
                t.sort(function(t, i) {
                    return (i.priority || 1) - (t.priority || 1)
                })
            },
            ut: function(t) {
                var i = !0,
                    s = this.fields;
                for (var n in t instanceof HTMLElement && (s = [t.validation]), s)
                    if (s.hasOwnProperty(n)) {
                        var h = s[n];
                        this.Ft(h) ? this.lt(h, "remove") : (i = !1, this.lt(h, "add"))
                    } return i
            },
            Ft: function(t) {
                var i = [],
                    s = !0;
                for (var n in t.validators)
                    if (t.validators.hasOwnProperty(n)) {
                        var h = t.validators[n],
                            e = t.params[h.name] ? t.params[h.name] : [];
                        if (e[0] = t.input.value, !h.fn.apply(t.input, e)) {
                            s = !1;
                            var o = this.strings[h.name];
                            if (i.push(o.replace(/(\%s)/g, e[1])), !0 === h.halt) break
                        }
                    } return t.errors = i, s
            }
        }
    }(), document.addEventListener("DOMContentLoaded", function() {
        for (var t = document.querySelectorAll(".glsr-widget, .glsr-shortcode"), i = 0; i < t.length; i++) {
            var s = window.getComputedStyle(t[i], null).getPropertyValue("direction");
            t[i].classList.add("glsr-" + s)
        }
        document.all && !window.atob || (new GLSR.Forms(!0), new GLSR.Pagination, new GLSR.Excerpts)
    });