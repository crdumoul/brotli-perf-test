(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var error1, externalObjectLoader, found, frame, frameId, frames, i, len, onloadScript, w;

onloadScript = function() {
  var defaultConfig, key, timer, w;
  w = window;
  if (w !== w.parent) {
    w = window.parent;
    window.BOOMR = w.BOOMR;
    window.Groupon = w.Groupon;
    window.OptimizeSuite = w.OptimizeSuite;
    window.applicationConfig = w.applicationConfig;
  }
  defaultConfig = {
    user_ip: BOOMR.utils.getCookie('b'),
    beacon_url: "/analytic/view.gif",
    BW: {
      enabled: false
    },
    DNS: {
      enabled: false
    },
    autorun: false
  };
  if (typeof applicationConfig !== "undefined" && applicationConfig !== null) {
    for (key in applicationConfig) {
      if (applicationConfig[key] != null) {
        defaultConfig[key] = applicationConfig[key];
      }
    }
  }
  BOOMR.init(defaultConfig);
  if (BOOMR.t_lstart != null) {
    BOOMR.addVar("t_lstart", BOOMR.t_lstart);
  }
  for (timer in BOOMR.gtimers) {
    BOOMR.addVar(timer, BOOMR.gtimers[timer]);
  }
  BOOMR.subscribe('before_beacon', function(performance) {
    var pageData, ref, ref1, ref2, ref3;
    if (OptimizeSuite.TrackingHub.page != null) {
      pageData = OptimizeSuite.TrackingHub.page.data();
      BOOMR.addVar("page_channel", (ref = pageData.channel) != null ? ref : "");
      BOOMR.addVar("page_country", (ref1 = pageData.country) != null ? ref1 : "");
      BOOMR.addVar("page_division", (ref2 = pageData.division) != null ? ref2 : "");
      BOOMR.addVar("page_type", (ref3 = pageData.type) != null ? ref3 : "");
    }
    return OptimizeSuite.TrackingHub.add("performance", {
      performance: performance
    });
  });
  BOOMR.t_end = new Date().getTime();
  BOOMR.addVar("t_end", BOOMR.t_end);
  if (BOOMR.t_done != null) {
    BOOMR.plugins.RT.endTimer("t_done", BOOMR.t_done);
    return BOOMR.page_ready();
  }
};

frameId = 'boomr-if-as';

externalObjectLoader = function(url, onloadScript, id) {
  var doc, dom, error, error1, iframe, where;
  if (id == null) {
    id = 'js-iframe-async';
  }
  iframe = document.createElement('iframe');
  iframe.src = "javascript:false";
  iframe.title = "";
  iframe.role = "presentation";
  (iframe.frameElement || iframe).style.cssText = 'width: 0; height: 0; border: 0; position: absolute';
  iframe.frameBorder = 0;
  where = document.getElementsByTagName('script');
  where = where[where.length - 1];
  where.parentNode.insertBefore(iframe, where);
  try {
    doc = iframe.contentWindow.document;
  } catch (error1) {
    error = error1;
    dom = document.domain;
    iframe.src = "javascript: var d = document.open();d.domain='" + dom + "';void(0);";
    doc = iframe.contentWindow.document;
  }
  doc.open()._load3po = function() {
    var js, scriptInit;
    if (dom != null) {
      this.domain = dom;
    }
    scriptInit = this.createElement("script");
    scriptInit.type = "text/javascript";
    scriptInit.text = "Groupon = window.parent.Groupon;$ = window.parent.$";
    this.body.appendChild(scriptInit);
    js = this.createElement("script");
    js.type = "text/javascript";
    js.id = id;
    js.src = url;
    if (onloadScript != null) {
      js.onload = onloadScript;
    }
    return this.body.appendChild(js);
  };
  doc.write('<body onload="document._load3po();">');
  return doc.close();
};

w = window;

if (w !== w.parent) {
  w = window.parent;
}

frames = w.frames;

found = false;

for (i = 0, len = frames.length; i < len; i++) {
  frame = frames[i];
  try {
    if ((frame != null ? frame.frames['boomr-if-as'] : void 0) != null) {
      found = true;
      break;
    }
  } catch (error1) {

  }
}

if (!found) {
  externalObjectLoader(Groupon.Performance.boomerangUrl, onloadScript, frameId);
}



},{}]},{},[1]);
