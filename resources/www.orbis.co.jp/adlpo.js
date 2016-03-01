//***********************************
// adlpo.js version 2.1.4
// Copyright Data Artist Inc. All Rights Reserved.
// Released on Mar. 20 2014
//***********************************

function adlpoMain(arg) {
  var argum = new Array();
  for ( var i = 0; i < arguments.length; i++) {
    argum[i] = 'arguments[' + i + ']';
  }
  eval('adlpoSetup._in(' + argum.join(',') + ');');
}
function _adlpoocA() {
  for ( var i in ADLPOs) {
    ADLPOs[i].finalize();
  }
}
function _adlpooctbi(id) {
  ADLPOs[id].activate();
  if (!ADLPOs[id].isActivated()) {
    _adlpooe.disable();
    ADLPOs[id].finalize();
  }
}
function _adlpogrdurl() {
  var retUrl = "";
  if (adlpoClkUrl1.length > 0) {
    if (adlpoCp.length > 0) {
      retUrl = adlpoClkUrl1 + '&' + adlpoCp + '=' + encodeURIComponent(adlpoDefUrl);
    } else {
      retUrl = adlpoClkUrl1 + encodeURIComponent(adlpoDefUrl);
    }
  } else {
    retUrl = adlpoDefUrl;
  }
  return retUrl;
}
function _adlpogurlp(){
  var hash = new Array();
  var param;
  if(param = location.search){
    var parray = param.replace('?','').split('&');
    for(var i=0;i<parray.length;i++){
      var n = parray[i].split('=');
      hash[n[0]] = n[1];
    }
  }else{
    return false;
  }
  return hash;
}
function _adlpoake(key, search){
  if(!search || (search.constructor !== Array && search.constructor !== Object) ){
    return false;
  }
  return key in search;
}
function optout(){
  try{
    if (typeof localStorage != 'undefined') {
      adlpoCookie = adlpoLocalStorage;
      adlpoCookie._in(_adlpockna);
      if (adlpoCookie.isEnable()) {
        adlpoCookie.clear();
        adlpoCookie.setCookie(_adlpotoof, 1, _adlpouiet);
      }
    }
  } catch(e){}
}
if (typeof _adlpotgcn == 'undefined') {
var adlpoCookie = {
  name: null,
  domain: null,
  cookies: new Array(),
  _in: function(n, d) {
    this.name = n;
    var cookdom='';
    var reg = /([^.]+\.([^.]{2,3}\.[^.]{2,3}|[^.]+))$/;
    var ar = reg.exec(d);
    if(ar != null){
      cookdom='.'+ar[1];
    }    
    this.domain = (d == ''?'':'; domain='+cookdom);
    this.loadCookies();
  },
  isEnable: function() {
    this.setCookie(_adlpoocce, 'true', 60);
    this.loadCookies();
    return this.getCookie(_adlpoocce) == 'true';
  },
  setCookie: function(n, v, t) {
    if (typeof n != 'undefined' && typeof v != 'undefined' && typeof t != 'undefined') {
      this.cookies[n] = {name:n,value:escape(v),expireOn:Math.ceil(t + new Date().getTime()/1000)};
      this.saveCookies();
    }
  },
  getCookie: function(n) {
    var r = this.cookies[n];
    if (typeof r == 'undefined' || r == null) {
      return null;
    }
    return unescape(r.value);
  },
  deleteCookie: function(n) {
    var obj = new Object();
    for (i in this.cookies) {
      if (i != n) {
        obj[i] = this.cookies[i];
      }
    }
    this.cookies = obj;
    this.saveCookies();
  },
  loadCookies: function() {
    this.cookies = new Object();
    var n = adlpodoc.cookie.indexOf(this.name + "=");
    if (n != -1) {
      var p = adlpodoc.cookie.indexOf(";", n);
      if (p == -1) {
        p = adlpodoc.cookie.indexOf(",", n);
        if (p == -1) {
          p = adlpodoc.cookie.length;
        }
      }
      var c = adlpodoc.cookie.substring(n + this.name.length + 1, p).split("|");
      var t = Math.ceil(new Date().getTime() / 1000);
      for (i in c) {
        var num_i = Number(i);
        if (!isNaN(num_i)) {
          var pz = c[num_i].split("#");
          if (t <= pz[2]) {
            this.cookies[pz[0]] = {name:pz[0], value:pz[1], expireOn:pz[2]};
          }
        }
      }
    }
  },
  saveCookies: function() {
    var res = new Array();
    var t = 0;
    for (i in this.cookies) {
      if (this.cookies[i] != null) {
        res[res.length] = this.cookies[i].name + '#' + this.cookies[i].value + '#' + this.cookies[i].expireOn;
        if (t < this.cookies[i].expireOn) {
          t = this.cookies[i].expireOn;
        }
      }
    }
    var dt = new Date(t * 1000);
    adlpodoc.cookie = this.name +'='+ res.join('|') +'; expires='+ dt.toGMTString() +'; path=/'+ this.domain;
  }
};
var adlpoLocalStorage = {
  name: null,
  domain: null,
  cookies: new Array(),
  _in: function(n) {
    this.name = n;
    this.loadCookies();
  },
  isEnable: function() {
    this.setCookie(_adlpoocce, 'true', 60);
    this.loadCookies();
    return (this.getCookie(_adlpoocce) == 'true' && this.getCookie(_adlpotoof) !== "1") ? true : false;
  },
  setCookie: function(n, v, t) {
    if (typeof n != 'undefined' && typeof v != 'undefined' && typeof t != 'undefined') {
      this.cookies[n] = {name:n,value:escape(v),expireOn:Math.ceil(t + new Date().getTime()/1000)};
      this.saveCookies();
    }
  },
  getCookie: function(n) {
    var r = this.cookies[n];
    if (typeof r == 'undefined' || r == null) {
      return null;
    }
    return unescape(r.value);
  },
  deleteCookie: function(n) {
    var obj = new Object();
    for (i in this.cookies) {
      if (i != n) {
        obj[i] = this.cookies[i];
      }
    }
    this.cookies = obj;
    this.saveCookies();
  },
  loadCookies: function() {
    this.cookies = new Object();
    var item = localStorage.getItem(this.name);
    if (item != null) {
      var c = item.split("|");
      var t = Math.ceil(new Date().getTime() / 1000);
      for (i in c) {
        var num_i = Number(i);
        if (!isNaN(num_i)) {
          var pz = c[num_i].split("#");
          if (t <= pz[2]) {
            this.cookies[pz[0]] = {name:pz[0], value:pz[1], expireOn:pz[2]};
          }
        }
      }
    }
  },
  saveCookies: function() {
    var res = new Array();
    for (i in this.cookies) {
      if (this.cookies[i] != null) {
        res[res.length] = this.cookies[i].name + '#' + this.cookies[i].value + '#' + this.cookies[i].expireOn;
      }
    }
    localStorage.setItem(this.name, res.join('|'));
  },
  clear: function() {
    localStorage.clear();
  }
};
var adlpoPc = {
  cookieName: null,
  expireTime: null,
  id:null,
  _in: function(id, n, exT) {
    this.cookieName = n;
    this.expireTime = exT;
    this.id = adlpoCookie.getCookie(n);
    if (this.id == null || this.id.length == 0) {
      this.id = id;
    }
    adlpoCookie.setCookie(this.cookieName, this.id, this.expireTime);
  },
  getId: function() {
    adlpoCookie.setCookie(_adlpopcid, this.id, this.expireTime);
    return this.id;
  },
  forceId: function(fId) {
    if (this.id != fId) {
      this.id = fId;
      adlpoCookie.setCookie(this.cookieName, this.id, this.expireTime);
      return true;
    }
    return false;
  }
};
var adlpoPlatform = {
  ie: null,
  mac: null,
  supported: null,
  _in: function() {
    this.ie = window.navigator.appVersion.indexOf("MSIE") != -1;
    this.mac = window.navigator.appVersion.indexOf("Mac") != -1;
    var opera = window.navigator.userAgent.indexOf("Opera") != -1;
    var knq = window.navigator.userAgent.indexOf("Konqueror") != -1;
    var ie4 = this.ie && (window.navigator.appVersion.indexOf("MSIE 4.") != -1);
    var ns = (navigator.appName == 'Netscape') && (parseInt(navigator.appVersion) == 4);
    if(opera) opera = !opera;
    this.supported = !(ns || ie4 || opera || knq);
  },
  isSupported: function() {
    return this.supported;
  },
  isLocalStorageSupported: function() {
    var ff = window.navigator.userAgent.indexOf("Firefox") != -1;
    if (ff) this.supported = null;
    return this.supported;
  },
  supportsReplace: function() {
    return !(this.ie && this.mac);
  }
};
var adlpoSafeOnload = {
  temp: new Array(),
  orderFirst: null,
  orderMiddle: null,
  orderLast: null,
  el: null,
  actionStarted: false,
  ev: null,
  _in: function(el) {
    this.orderFirst = 0;
    this.orderMiddle = 500;
    this.orderLast = 1000;
    this.el = el;
    if (typeof _Functions == "undefined") {
      _Functions = new Array();
    }
    var offset = _Functions.length;
    _Functions[offset] = this;
    this.ev = new Function('event','_Functions['+offset+'].action(event);');
    this.setup();
  },
  add: function(v) {
    this.sortedAdd(v, this.orderMiddle);
  },
  sortedAdd: function(a,o) {
    var res = new Array();
    res.order = o;
    res.action = a;
    this.temp[this.temp.length] = res;
  },
  setup: function() {
    if (this.el.onload != this.ev) {
      if (this.el.onload) {
        this.add(this.el.onload);
      }
      this.el.onload = this.ev;
    }
  },
  action: function(v) {
    if (this.actionStarted == true) {
      return;
    }
    this.actionStarted = true;
    this.temp.sort(this.orderSort);
    for (var i = 0; i < this.temp.length; i++) {
      this.el.onload = this.temp[i].action;
      this.el.onload(v);
    }
    this.el.onload = this.ev;
  },
  orderSort: function(a1, a2) {
    return a1.order - a2.order;
  }
};
var adlpoOe = {
  platform: null,
  safe: null,
  status: true,
  _in: function(param) {
    this.platform = adlpoPlatform;
    this.platform._in();
    this.status = this.platform.isSupported();
    if (adlpoUser.getPageParameter(param) != null) {
      this.status = false;
    }
    if (!adlpoCookie.isEnable()) {
      try{
        if (typeof localStorage === 'undefined' || !this.platform.isLocalStorageSupported()) {
          this.status = false;
        } else {
          adlpoCookie = adlpoLocalStorage;
          adlpoCookie._in(_adlpockna);
          if (!adlpoCookie.isEnable()) {
            this.status = false;
          } else {
            _adlpoopid = adlpoPc;
            _adlpoopid._in(adlpoUser._ogi(), _adlpopcid, _adlpouiet);
          }
        }
      } catch(e) {
        this.status = false;
      }
    }
    if (adlpoCookie.getCookie(_adlpoodc) == 'true') {
      this.status = false;
    }
    if (this.isAdmin()) {
      this.enable();
    }
  },
  isEnabled: function() {
    return this.status;
  },
  getAdlpoSafeOnload: function() {
    if (this.safe == null) {
      this.safe = adlpoSafeOnload;
      this.safe._in(window);
    }
    return this.safe;
  },
  disable: function(duration) {
    if (typeof duration == 'undefined') {
      duration = 60 * 10;
    }
    if (!this.isAdmin()) {
      this.status = false;
      adlpoCookie.setCookie(_adlpoodc, 'true', duration);
    }
  },
  enable: function() {
    this.status = true;
    adlpoCookie.deleteCookie(_adlpoodc);
  },
  isAdmin: function() {
    return adlpodoc.location.href.indexOf(_adlpooea) != -1;
  },
  limitTraffic: function(level, duration) {
    if (typeof level == 'undefined') {
      return;
    }
    var tCookie = adlpoCookie.getCookie(_adlpootsc);
    if (this.isAdmin()) {
      tCookie = true;
      adlpoCookie.setCookie(_adlpootlc, level, duration);
      adlpoCookie.setCookie(_adlpootsc, tCookie, duration);
    }else if (tCookie == null || adlpoCookie.getCookie(_adlpootlc) != level) {
      tCookie = (Math.random() * 100) <= level;
      adlpoCookie.setCookie(_adlpootlc, level, duration);
      adlpoCookie.setCookie(_adlpootsc, tCookie, duration);
    }
    if (tCookie) {
      this.enable();
    }else {
      this.disable();
    }
  }
};
var adlpoSetup = {
  _in: function(arg) {
    if (!adlpoPlatform.isSupported()) {
      return;
    }
    _adlpooe.safe.setup();
    var res = new Array();
    var traffic = false;
    var exchange = false;
    var insert_id = "";
    var area_id = '';
    var area_param = '';
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i] == 'pr=at') {
        traffic = true;
      }
      if (arguments[i] == 'pr=ux') {
        exchange = true;
      }
      if (arguments[i].match(/^img=([0-9a-zA-Z_-]+)$/)) {
        insert_id = RegExp.$1;
      }
      res[i] = arguments[i];
    }
    var _adlpo_name_tmp = "";
    if (traffic == true) {
      if (arg.length == 0) {
        _adlpo_name_tmp = _adlpopgdt;
      } else {
        _adlpo_name_tmp = arg;
      }
      area_id = _adlpo_name_tmp + _adlpotgcn;
      area_param = _adlpopage + '=' + _adlpo_name_tmp;
    } else if (exchange == true){
      _adlpo_name_tmp = arg;
      area_id = _adlpo_name_tmp + _adlpotgcn;
      area_param = _adlpofnct + '=' + _adlpo_name_tmp;
    } else {
      _adlpo_name_tmp = arg;
      area_id = _adlpo_name_tmp + _adlpotgcn;
      area_param = _adlpoarea + '=' + _adlpo_name_tmp;
    }
    res[0] = area_param;
    var obj = new ADLPOORB();
    obj._in(area_id, res);
    if (insert_id.length>0){obj.setInsertId(insert_id);}
    obj.put();
    _adlpotgcn++;
  },
  defaultDisplayNone: function () {
    adlpodoc.write('<style>.' + _adlpodflt + ' { visibility:hidden; }</style>');
  }
};
var adlpoUser = {
  _ogi: function() {
    return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999);
  },
  getPageParameter: function(name) {
    var temp = null;
    var reg = new RegExp(name + '=([^\&]*)');
    var res = reg.exec(document.location);
    if (res != null && res.length >=2) {
      temp = res[1];
    }
    return temp;
  }
};
var adlpodoc = document;
var _adlpotgcn = 1;
var _adlpoatid = 171;
var _adlposurl = 'http://t.adlpo.com/script/c.js';
if (typeof _adlpouiet == 'undefined') {
  var _adlpouiet = 7776000;
}
if (typeof _adlpoot == 'undefined') {
  var _adlpoot = 60000;
}
if (typeof _adlpootlp == 'undefined') {
  var _adlpootlp;
}
if (typeof _adlpootd == 'undefined') {
  var _adlpootd = 3 * 30 * 24 * 60 * 60;
}
if (typeof _adlpockdm == 'undefined') {
  var _adlpockdm = '';
  var _adlpodre = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
  if (!_adlpodre.exec(adlpodoc.location.host)) {
    _adlpockdm = adlpodoc.location.hostname;
  }
}
if (typeof _adlpodidv == 'undefined') {
var _adlpodidv = Math.floor(Math.random() * 99999999);
}
var _adlpopcid = 'PC';
var _adlpockna = 'adlpo';
var _adlpoocce = 'check';
var _adlpomdnm = 'md';
var _adlpomdvl = 'cdl';
var _adlpomdvc = 'tcv';
var _adlpomdvt = 'tat';
var _adlpomdvp = 'cpv';
var _adlpomdvx = 'xud';
var _adlpoacnt = 'aci';
var _adlpouqid = 'ud';
var _adlpohost = 'hs';
var _adlpourl  = 'ul';
var _adlporefr = 'rf';
var _adlpoarea = 'ar';
var _adlpochar = 'ch';
var _adlpopage = 'tp';
var _adlpofnct = 'fn';
var _adlpoarct = 'ct';
var _adlpousag = 'ua';
var _adlpopltf = 'pf';
var _adlporqtm = 'rt';
var _adlporqsc = 'rs';
var _adlporqcl = 'cs';
var _adlpordu1 = 'r1';
var _adlpoapu1 = 'a1';
var _adlpordit = 'ri';
var _adlpochnp = 'cp';
var _adlpodidn = 'dy';
var _adlporsct = 'rct';
var _adlpotoof = 'too';
var _adlpoarcnt = 0;
var ADLPOs     = new Object();
var _adlpoimpt = 'ADLPOImported-';
var _adlpomakr = 'ADLPOMarker-';
var _adlpodflt = 'ADLPODefault';
var _adlpopgdt = 'DefaultPageID';
var _adlpoodc  = 'disable';
var _adlpootlc = 'level';
var _adlpootsc = 'traffic';
var _adlpooea  = 'envId';
adlpoCookie._in(_adlpockna, _adlpockdm);
var _adlpoopid = adlpoPc;
_adlpoopid._in(adlpoUser._ogi(), _adlpopcid, _adlpouiet);
var _adlpooe = adlpoOe;
_adlpooe._in('ADLPOORBDisable');
if (_adlpooe.platform.isSupported()) {
  if(_adlpooe.safe == null) {
    _adlpooe.getAdlpoSafeOnload();
  }
  _adlpooe.safe.add(_adlpoocA);
  _adlpooe.limitTraffic(_adlpootlp, _adlpootd);
  if (_adlpooe.isEnabled()) {
    adlpoSetup.defaultDisplayNone();
  }
}
var adlpoOfferContent = {
  show : function(obj) {
    if (obj.importDiv()) {
      var div = obj.importDiv();
      var inner = div.innerHTML;
      var cook_ = '';
      var aCookie = document.cookie.split("; ");
      for ( var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if ("adlpo" == aCrumb[0]) {
          cook_ = escape(aCrumb[1]);
          break;
        }
      }
    } else {
      var div = obj.importDiv();
    }
    return obj.showContent(div);
  }
}
}
function ADLPOORB(){}
ADLPOORB.prototype = {
  id: null,
  url: null,
  timeout: null,
  activated: 0,
  defaultDiv: null,
  offer: null,
  time: new Array(),
  activateCount: 0,
  error: null,
  insert_id: new String,
  _in: function(id, url) {
    url[url.length] = _adlpoarct + '=' + ++_adlpoarcnt;
    this.id = id;
    this.url = this.buildUrl(url);
    this.offer = adlpoOfferContent;
    if (ADLPOs[id]) {
      this.put = this.putNothing;
      this.activateAction = this.hide;
    }
    ADLPOs[id] = this;
  },
  setInsertId: function(ist_id) {
    this.insert_id = ist_id;
  },
  put: function() {
    var status = false;
    var url = adlpodoc.URL;
    if (_adlpooe.isEnabled() || status) {
      if (this.insert_id.length>0) {
        var img_tag = '<img src="' + this.url + '" width="1" height="1">';
        adlpodoc.getElementById(this.insert_id).innerHTML = img_tag;
      } else {
        adlpodoc.write('<div id="' + this.markerName() + '" style="visibility:hidden;display:none">');
        ADLPOs[this.id].startTimeout(_adlpoot);
        adlpodoc.write('<script type="text/javascript" src="' + this.url + '"><'+ '\/script></div>');
      }
    }else {
      if (!this.insert_id) {
        adlpodoc.write('<div id="' + this.markerName() + '"></div>');
      }
    }
  },
  putNothing: function() {
    adlpodoc.write('<div id="' + this.markerName() + '"></div>');
  },
  hide: function() {
    var el = adlpodoc.getElementById(this.markerName());
    if (el != null) {
      el.style.visibility = 'hidden';
      el.style.display = 'none';
    }
    var el = this.getDefaultDiv();
    if (el != null) {
      el.style.visibility = 'visible';
      el.style.display = '';
      return 1;
    }
    return 0;
  },
  show: function() {
    var result = this.offer.show(this);
    return result;
  },
  activateAction: function() {
    return this.show();
  },
  showContent: function(obj) {
    if (obj == null) {
      return 0;
    }
    var el = this.getDefaultDiv();
    if (_adlpooe.platform.supportsReplace()) {
      if (el != null) {
        el.parentNode.replaceChild(obj, el);
      }else {
        var div = adlpodoc.getElementById(this.markerName());
        if (div == null) {
          return 0;
        }
        this.visible(div);
      }
    }else {
      var div = adlpodoc.getElementById(this.markerName());
      if (div == null) {
        return 0;
      }
      if (el != null) {
        this.invisible(el);
      }
      this.visible(div);
    }
    this.visible(obj);
    return 1;
  },
  invisible: function(el) {
    el.style.visibility = 'hidden';
    el.style.display = 'none';
  },
  visible: function(el) {
    el.style.visibility = 'visible';
    el.style.display = '';
  },
  startTimeout: function(time) {
    this.timeout = window.setTimeout('_adlpooctbi("' + this.id + '")', time);
  },
  cancelTimeout: function() {
    if (this.timeout != null) {
      window.clearTimeout(this.timeout);
      this.timeout=null;
    }
  },
  getDefaultDiv: function() {
    if (this.defaultDiv != null) {
      return this.defaultDiv;
    }
    var node = adlpodoc.getElementById(this.markerName());
    while (node != null) {
      if ((node.nodeType == 1) && (node.nodeName == 'DIV')) {
        if (node.className.indexOf(_adlpomakr) > 0) {
          return null;
        } else if (node.className == _adlpodflt) {
          this.defaultDiv = node;
          return node;
        }
      }
      node = node.previousSibling;
    }
    return null;
  },
  activate: function() {
    if (this.activated) {
      return this.activated;
    }
    if (this.activateAction()) {
      this.cancelTimeout();
      this.activated = 1;
    }
    return this.activated;
  },
  isActivated: function() {
    return this.activated;
  },
  markerName: function() {
    return _adlpomakr + this.id;
  },
  importName: function() {
    return _adlpoimpt + this.id;
  },
  importDiv: function() {
    return adlpodoc.getElementById(this.importName());
  },
  finalize: function() {
    this.cancelTimeout();
    if (!this.activate()) {
      this.hide();
    }
  },
  parameters: function() {
    var url = this.url;
    var position = url.indexOf('?');
    if (position == -1 || position == (url.length - 1)) {
      return new Array();
    }
    var queryString = url.substring(position + 1);
    var pairs = queryString.split('&');
    var queryArray = new Array();
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      if (pair.length < 2 || pair[0] == '' || pair[1] == '') {
        continue;
      } else {
        queryArray[pair[0]] = pair[1];
      }
    }
    return queryArray;
  },
  setActivateAction: function(ac) {
    this.activateAction = ac;
  },
  setOffer: function(off) {
    this.offer = off;
  },
  getAttribute : function () {
    var att='';
    att += '&' + _adlpousag + '=' + escape(navigator.userAgent);
    return att;
  },
  encode : function (url) {
    if (!this.encodeCheck(url)) {
      url = encodeURIComponent(url);
    }
    return url;
  },
  encodeCheck : function (url) {
    for(var ct = 1; ct <= url.length - 1; ct++){
      var ch = url.charAt(ct);
      if ((ch == '?') || (ch == '=') || (ch == '&') || (ch == '#') || (ch == ':') || (ch == '/')) {
        return false;
      }
    }
    return true;
  },
  buildUrl: function(param) {
    var sUrl = _adlposurl;
    var conv = false;
    var traffic = false;
    var preview = false;
    var exchange= false;
    var adLoc   = false;
    var imgRes  = false;
    var url = adlpodoc.URL;
    if (adlpodoc.location.protocol == 'https:') {
      sUrl = sUrl.replace('http:', 'https:')
    }
    sUrl += '?' + _adlpoacnt + '=' + _adlpoatid;
    sUrl += '&' + _adlpohost + '=' + adlpodoc.location.hostname;
    for (var i = 0; i < param.length; i++) {
      if (param[i] == 'pr=cv') {
        conv = true;
      } else if (param[i] == 'pr=at') {
        traffic = true;
      } else if (param[i] == 'pr=ux') {
    	exchange = true;
      } else if (param[i] == 'lc=ad') {
        adLoc = true;
      } else if (param[i].match(/^img=([0-9a-zA-Z_-]+)$/)) {
        imgRes = true;
      }
      sUrl += '&' + param[i];
    }
    if(url.indexOf('ADLPOPreview') > -1) {
      preview = true;
    }
    if (preview) {
      sUrl += '&' + _adlpomdnm + '=' + _adlpomdvp;
    } else if (traffic) {
      sUrl += '&' + _adlpomdnm + '=' + _adlpomdvt;
    } else if (conv) {
      sUrl += '&' + _adlpomdnm + '=' + _adlpomdvc;
    } else if (exchange) {
      sUrl += '&' + _adlpomdnm + '=' + _adlpomdvx;
    } else {
      sUrl += '&' + _adlpomdnm + '=' + _adlpomdvl;
    }
    if ((conv || traffic) && imgRes) {
      sUrl += '&' + _adlporsct + '=img';
    }
    if (adLoc) {
      var char = (document.charset ? document.charset : (document.characterSet ? document.characterSet : 'UTF-8'));
      sUrl += '&' + _adlpochar + '=' + char;
      if (adlpoClkUrl1.length > 0) {sUrl += '&' + _adlpordu1 + '=' + this.encode(adlpoClkUrl1);}
      if (adlpoApiUrl1.length > 0) {sUrl += '&' + _adlpoapu1 + '=' + this.encode(adlpoApiUrl1);}
      if (adlpoRedIntr == 1) {sUrl += '&' + _adlpordit + '=1';}
      if (adlpoCp.length > 0) {sUrl += '&' + _adlpochnp + '=' + adlpoCp;}
      if (_adlpoake("pf", adlpoUrlParam)) {sUrl += '&' + _adlpopltf + '=' + adlpoUrlParam["pf"];}
    }
    sUrl += this.getAttribute();
    sUrl += '&' + _adlpodidn + '=' + _adlpodidv;
    var _ora_real = escape(adlpodoc.referrer);
    var _oua_real = escape(adlpodoc.location);
    var _dt = new Date();
    var _reqt = _dt.getTime();
    return sUrl + '&' + _adlpouqid + '=' + _adlpoopid.getId()
        + '&' + _adlpourl + '=' + _oua_real + '&' + _adlporefr + '=' + _ora_real
        + '&' + _adlporqtm + '=' + _reqt + '&' + _adlporqsc + '=' + _adlporqcl
  }
}
var adlpoUrlParam = _adlpogurlp();
var adlpoClkUrl1  = "";
var adlpoApiUrl1 = "";
var adlpoRedIntr = "";
var adlpoCp = "";
if (_adlpoake("clkurl1", adlpoUrlParam)) {adlpoClkUrl1 = decodeURIComponent(adlpoUrlParam["clkurl1"]);}
if (_adlpoake("apiurl1", adlpoUrlParam)) {adlpoApiUrl1 = decodeURIComponent(adlpoUrlParam["apiurl1"]);}
if (_adlpoake("ri", adlpoUrlParam)) {adlpoRedIntr = decodeURIComponent(adlpoUrlParam["ri"]);}
if (_adlpoake("cp", adlpoUrlParam)) {adlpoCp = decodeURIComponent(adlpoUrlParam["cp"]);}
var adlpoDefUrl = '';
var adlpoRedirectUrl = _adlpogrdurl();
