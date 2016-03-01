//
// --------------------------------------------------------------------
//  Copyright (c) 2007 - 2012 Business Search Technologies Corporation
// --------------------------------------------------------------------
//

function popTerm(param) {
  var self = this;
  if (param === undefined || param === null) param = {};

  self.url = 'http://orbis.sitesearch.jp/popterm-product/popterm.pl';
  self.css = 'http://orbis.sitesearch.jp/popterm-product/css/popterm2.css';
  self.uid = 'f7cc7e2f142fa753dcb8bd5efb953b5f594308a6';

  self.disable = 0;
  self.interval = 200;
  self.param = param;

  self.targetid = 'query';
  if (param.targetid !== undefined ) {
    self.targetid = param.targetid;
  }
  self.targetname = null;
  if (param.query !== undefined) {
    self.targetname = param.query;
  }
  self.trid = '0';
  if (param.trid !== undefined) {
    self.trid = param.trid;
  }
  self.maxitems = '10';
  if (param.show_count !== undefined ) {
    self.maxitems = param.show_count;
  }
  if (param.maxitems !== undefined) {
    self.maxitems = param.maxitems;
  }
  self.colnum = '1';
  if (param.colnum !== undefined) {
    self.colnum = param.colnum;
  }
  self.id = 'popterm';
  if (param.id !== undefined) {
    self.id = param.id;
  }
  if (param.css !== undefined) {
    self.css = param.css;
  }
  self.enter = '';
  if (param.enter !== undefined) {
    self.enter = param.enter;
  }
  self.click = '';
  if (param.click !== undefined) {
    self.click = param.click;
  }

  self.ua = navigator.userAgent.toLowerCase();
  self.vr = navigator.appVersion.toLowerCase();
  if (param.css_ie6 !== undefined && /msie *6/.test(self.ua)) self.css = param.css_ie6;
  if (param.css_ie7 !== undefined && /msie *7/.test(self.ua)) self.css = param.css_ie7;
  if (param.css_ie8 !== undefined && /msie *8/.test(self.ua)) self.css = param.css_ie8;
  if (param.css_ie9 !== undefined && /msie *9/.test(self.ua)) self.css = param.css_ie9;
  if (param.css_ff !== undefined && /firefox/.test(self.ua)) self.css = param.css_ff;
  if (param.css_gc !== undefined && /chrome/.test(self.ua))  self.css = param.css_gc;
  if (param.css_op !== undefined && /opera/.test(self.ua))   self.css = param.css_op;
  if (param.css_sf !== undefined && /applewebkit/.test(self.ua))  self.css = param.css_sf;

  if ('https:' == document.location.protocol) {
    if (param.ssl_url !== undefined) {
      self.url = param.ssl_url;
      if (param.ssl_css !== undefined) {
        self.css = param.ssl_css;
      }
    } else {
      return {};
    }
  }

  self.query = '';
  self.list = [];
  self.menu = null;
  self.menu_top = null;
  self.menu_bottom = null;
  self.current = null;
  self.target = document.getElementById(self.targetid);
  if (self.targetname !== null) {
    self.target = document.getElementsByName(self.targetname)[0];
  }
  self.cbfunc = 'probo_popterm_callback_' + (new Date()).getTime();
  self.tbd = null;
  self.track = 0;

  self.initialize = function () {
    self.f_createtbl();
    self.f_construct();
    var x = self.target;
    x.setAttribute('autocomplete', 'off');
    self.bindevent(x, "focus",   self.h_focus);
    self.bindevent(x, "blur",    self.h_blur);
    self.bindevent(x, "keyup",   self.h_keyup);
    self.bindevent(x, "keydown", self.h_keydown);
    self.query = self.target.value;
    self.f_hide();
    self.poling();
  }

  self.f_createtbl = function () {
    self.menu = document.createElement("table");
    self.menu.setAttribute("id", self.id);
    var pp = self.target.parentNode;
    pp.insertBefore(self.menu, self.target.nextSibling);
    self.menu.style.position = "absolute";
    self.menu.style.display = "inline";
    var tbd = document.createElement("tbody");
    self.menu.appendChild(tbd);
    self.tbd = tbd;
    if (self.css != null) {
      var c = document.createElement('link');
      c.setAttribute('rel', 'stylesheet');
      c.setAttribute('type', 'text/css');
      c.setAttribute('href', self.css);
      pp.appendChild(c);
    }
  }

  self.f_construct = function () {
    var tr;
    var tbd = document.createElement("tbody");
    for (i = 0; i < self.list.length; i++) {
      var rec = self.list[i];
      tr = document.createElement("tr");
      for (j = 0; j < rec.length && j < self.colnum ; j++) {
        var val = rec[j];
        var td = document.createElement("td");
        document.all ? td.innerText = val : td.textContent = val;
        if (self.param.fit_searchbox_width !== "off") {
          td.style.width = self.getWidth(self.target);
        }
        tr.appendChild(td);
      }
      self.bindevent (tr, "mousedown", self.h_menu_mousedown);
      self.bindevent (tr, "mouseup", self.h_menu_mouseup);
      self.bindevent (tr, "mouseover", self.h_menu_mouseover);
      self.bindevent (tr, "mouseout", self.h_menu_mouseout);
      tbd.appendChild(tr);
      if (i == 0) self.menu_top = tr;
    }
    self.menu_bottom = tr;
    self.menu.replaceChild(tbd, self.tbd);
    if (self.param.fit_searchbox_width !== "off") {
      self.menu.style.width = self.getWidth(self.target);
    }
    if (self.param.fit_boxparent_height !== "off") {
      self.menu.style.marginTop = self.getVOffset2(self.target);
      self.menu.style.marginLeft = self.getHOffset(self.target);
    }
    if (self.param.fit_searchbox_height !== undefined) {
      self.menu.style.marginTop = self.getVOffset(self.target);
      self.menu.style.marginLeft = self.getHOffset(self.target);
    }
    self.tbd = tbd;
  }

  self.f_show = function () {
    if (!self.menu) return;
    if (self.disable > 0) return;
    if (self.list.length == 0) return;
    self.menu.setAttribute("class", self.id + "_visible");
    self.menu.style.visibility = "visible";
    self.menu.style.display = "inline";
  }

  self.f_hide = function () {
    if (!self.menu) return;
    self.menu.setAttribute('class', self.id + "_hidden");
    self.menu.style.visibility = "hidden";
    self.menu.style.display = "none";
  }

  self.f_up = function () {
    if (!self.menu) return;
    var c = self.current;
    if (c != null) c = c.previousSibling;
    if (c == null) c = self.menu_bottom;
    self.f_highlight(c);
  }

  self.f_down = function () {
    if (!self.menu) return;
    var c = self.current;
    if (c != null) c = c.nextSibling;
    if (c == null) c = self.menu_top;
    self.f_highlight(c);
  }

  self.f_highlight = function (e) {
    var r = self.menu.getElementsByTagName('tr');
    for (i = 0; i < r.length; i++) {
      var c = '\v' == 'v' ? 'className' : 'class';
      if (document.documentMode == 8) c = 'class';
      if (r[i] === e) {
        self.current = e;
        r[i].setAttribute(c , self.id + '_selected');
      } else {
        r[i].removeAttribute(c);
      }
    }
  }

  self.f_select = function () {
    var e = self.current;
    if (e === null) return;
    var d = e.getElementsByTagName('td');
    var t = document.all ? d[0].innerText : d[0].textContent;
    self.target.value = t;
    self.query = t;
  }

  self.h_menu_mouseover = function () {
    var e = document.all ? event.srcElement.parentNode : this;
    self.f_highlight(e);
  }

  self.h_menu_mouseout = function () {
    var e = document.all ? event.srcElement.parentNode : this;
    self.f_highlight(null);
    self.current = null;
  }

  self.h_menu_mouseup = function () {
    self.endtrack();
    self.f_select();
    self.update();
    self.target.focus();
  }

  self.h_menu_mousedown = function () {
    var e = document.all ? event.srcElement.parentNode : this;
    self.current = e;
    self.starttrack();
    if (self.click == 'submit') {
      self.dispatchKeydown(13);
    }
  }

  self.h_focus = function () {
    self.current = null;
    self.update();
    self.f_highlight(null);
    self.f_show();
  }

  self.h_blur = function () {
    if (self.track != 0) return;
    self.f_hide();
    self.current = null;
    self.f_highlight(null);
  }

  self.h_keydown = function (e) {
    var k = e.keyCode ? e.keyCode : e.charCode;
    if (k == 27) {
      self.f_hide();
      //self.disable = 1;
      return;
    }
    else if (k == 38) self.f_up();
    else if (k == 40) self.f_down();
    else if (k == 13) {
      if (self.current === null) return;
      self.f_select();
      self.update();
      if (self.enter !== 'submit') {
        self.cancelevent (e);
      }
      self.f_hide();
      return;
    }
    else if (k == 39) {
      if (self.current === null) return;
      self.f_select();
      self.update();
    }
    self.f_show();
  }

  self.h_keyup = function (e) {
    var k = e.keyCode;
  }

  self.starttrack = function () {
    self.track = 1;
    var e = document.all ? document.body : document;
    self.bindevent(e, "mouseup", self.h_menu_mouseup);
  }

  self.endtrack = function () {
    var e = document.all ? document.body : document;
    self.unbindevent(e, "mouseup", self.h_menu_mouseup);
    self.track = 0;
  }

  self.bindevent = function (target, event, handler) {
    if (target.addEventListener) {
      target.addEventListener (event, handler, false);
    } else {
      target.attachEvent ("on" + event, handler);
    }
  }

  self.unbindevent = function (target, event, handler) {
    if (target.removeEventListener) {
      target.removeEventListener (event, handler, false);
    } else {
      target.detachEvent ("on" + event, handler);
    }
  }

  self.cancelevent = function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      window.event.returnValue = false;
    }
  }

  self.cancelbubble = function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
  }

  self.dispatchKeydown = function (keycode) {
    if (document.all) {
      var evt = document.createEventObject();
      evt.keyCode = keycode;
      self.target.fireEvent("onkeydown", evt);
    }
    else {
      var evt = document.createEvent("KeyboardEvent");
      evt.initKeyEvent("keydown", true, true, null, false, false, false, false, keycode, 0);
      self.target.dispatchEvent(evt);
    }
  }

  self.getwidth = function (e) {
    if (document.defaultView) {
      var t = document.defaultView.getComputedStyle(e, null);
      return t.getPropertyValue('width');
    }
    else if (e.offsetWidth) {
      return e.offsetWidth;
    }
    return 0;
  }

  self.getheight = function (e) {
    if (document.defaultView) {
      var t = document.defaultView.getComputedStyle(e, null);
      return t.getPropertyValue('height');
    }
    else if (e.offsetHeight) {
      return e.offsetHeight;
    }
    return 0;
  }

  self.getBorderWidth = function (e) {
    var l = 0, r = 0, t = 0, b = 0;
    if (e.currentStyle) {
      l = e.currentStyle.borderLeftWidth;
      r = e.currentStyle.borderRightWidth;
      t = e.currentStyle.borderTopWidth;
      b = e.currentStyle.borderBottomWidth;
    }
    else if (window.getComputedStyle) {
      var x = window.getComputedStyle(e, null);
      l = x.borderLeftWidth;
      r = x.borderRightWidth;
      t = x.borderTopWidth;
      b = x.borderBottomWidth;
    }
    l = parseInt(l);
    r = parseInt(r);
    t = parseInt(t);
    b = parseInt(b);
    if (isNaN(l)) l = 0;
    if (isNaN(r)) r = 0;
    if (isNaN(t)) t = 0;
    if (isNaN(b)) b = 0;
    return {'left':l, 'right':r, 'top':t, 'bottom':b};
  }

  self.getMargin = function (e) {
    var l = 0, r = 0, t = 0, b = 0;
    if (e.currentStyle) {
      l = e.currentStyle.marginLeft;
      r = e.currentStyle.marginRight;
      t = e.currentStyle.marginTop;
      b = e.currentStyle.marginBottom;
    }
    else if (window.getComputedStyle) {
      var x = window.getComputedStyle(e, null);
      l = x.marginLeft;
      r = x.marginRight;
      t = x.marginTop;
      b = x.marginBottom;
    }
    l = parseInt(l);
    r = parseInt(r);
    t = parseInt(t);
    b = parseInt(b);
    if (isNaN(l)) l = 0;
    if (isNaN(r)) r = 0;
    if (isNaN(t)) t = 0;
    if (isNaN(b)) b = 0;
    return {'left':l, 'right':r, 'top':t, 'bottom':b};
  }

  self.getPadding = function (e) {
    var l = 0, r = 0, t = 0, b = 0;
    if (e.currentStyle) {
      l = e.currentStyle.paddingLeft;
      r = e.currentStyle.paddingRight;
      t = e.currentStyle.paddingTop;
      b = e.currentStyle.paddingBottom;
    }
    else if (window.getComputedStyle) {
      var x = window.getComputedStyle(e, null);
      l = x.paddingLeft;
      r = x.paddingRight;
      t = x.paddingTop;
      b = x.paddingBottom;
    }
    l = parseInt(l);
    r = parseInt(r);
    t = parseInt(t);
    b = parseInt(b);
    if (isNaN(l)) l = 0;
    if (isNaN(r)) r = 0;
    if (isNaN(t)) t = 0;
    if (isNaN(b)) b = 0;
    return {'left':l, 'right':r, 'top':t, 'bottom':b};
  }

  self.getLineheight = function (e) {
    var r = 0;
    if (e.currentStyle) {
      r = e.currentStyle.lineHeight;
    }
    else if (window.getComputedStyle) {
      r = window.getComputedStyle(e, null).lineHeight;
    }
    r = parseInt(r);
    if (isNaN(r)) r = 0;
    return r;
  }

  self.getWidth = function (e) {
    var w = parseInt(self.getwidth(e));
    var b = self.getBorderWidth(e);
    var m = self.getMargin(e);
    var p = self.getPadding(e);
    var r = w + b.left + b.right + p.left + p.right;
    if (/msie */.test(self.ua)) {
      if (document.documentMode ) {
        if (document.documentMode < 9) r = w;
      } else {
        r = w;
      }
    }
    return r + "px";
  }

  self.getVOffset = function (e) {
    var h = parseInt(self.getheight(e));
    var b = self.getBorderWidth(e);
    var m = self.getMargin(e);
    var p = self.getPadding(e);
    var l = self.getLineheight(e);
    var r = h + b.top + b.bottom + p.top + p.bottom + m.top;
    if (/msie */.test(self.ua)) {
      if (document.documentMode ) {
        if (document.documentMode < 9) r = h + m.top;
      } else {
        r = h + m.top;
      }
    }
    return r + "px";
  }

  self.getVOffset2 = function (e) {
    var r = 0;
    var c = e.parentNode.firstChild;
    while (c != e.parentNode.lastChild) {
      if (c.nodeType == 1 && c.getAttribute('id') !== self.id) {
        var i = parseInt(self.getVOffset (c));
        if (r < i) r = i;
      }
      c = c.nextSibling;
    }
    return r + "px";
  }

  self.getHOffset = function (e) {
    var w = parseInt(self.getwidth(e));
    var b = self.getBorderWidth(e);
    var m = self.getMargin(e);
    var p = self.getPadding(e);
    var r = w + b.left + b.right + m.right + p.left + p.right;
    if (/msie */.test(self.ua)) {
      if (document.documentMode ) {
        if (document.documentMode < 9) r = w + m.right;
      } else {
        r = w + m.right;
      }
    }
    return '-' + r + "px";
  }

  self.update = function () {
    var r = '';
    if (/msie *6/.test(self.ua)) r = '&o=' + (new Date()).getTime();
    if (/msie *7/.test(self.ua)) r = '&o=' + (new Date()).getTime();
    var url = this.url +
              '?callback=' + self.cbfunc +
              '&trid=' + self.trid +
              '&k=' + encodeURIComponent(self.query) +
              '&c=' + self.maxitems + r;
    window[self.cbfunc] = function (res) {
      self.callback (res);
    };
    var sc = document.createElement('script');
    sc.src = url;
    sc.type = 'text/javascript';
    sc.charset = 'utf-8';
    //sc.async = true;
    var h = document.getElementsByTagName('head');
    h[0].appendChild(sc);
  }

  self.callback = function (res) {
    self.current = null;
    if (res.list === null || res.list.length === 0) {
      self.list = [];
      self.f_construct ();
      self.f_hide();
    } else {
      self.list = res.list;
      self.f_construct();
      self.f_show();
    }
  }

  self.poling = function () {
    if (self.query === self.target.value) {
      ;
    }
    else if (self.target.value == '') {
      self.query = '';
      self.current = null;
      self.list = [];
      self.f_construct ();
      self.f_hide ();
    } else {
      self.query = self.target.value;
      self.current = null;
      self.update ();
      self.f_construct ();
      self.f_show ();
    }
    setTimeout (self.poling, self.interval);
  }

  self.initialize();
}
