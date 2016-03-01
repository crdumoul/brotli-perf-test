/*!
 * EventEmitter v4.2.7 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */
(function(){"use strict";function t(){}function r(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,i=this,s=i.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(i,e){var t,n=this.getListenersAsObject(i),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===r(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(i,s){var n,e,t=this.getListenersAsObject(i);for(e in t)t.hasOwnProperty(e)&&(n=r(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return i.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}).call(this);;
var Events=new EventEmitter;;
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
/*!
 * jQuery Form Plugin
 * version: 2.69 (06-APR-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){function b(){if(a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(b):window.opera&&window.opera.postError&&window.opera.postError(b)}}a.fn.ajaxSubmit=function(c){function r(){function t(){if(!j.aborted){var c=i.contentWindow?i.contentWindow.document:i.contentDocument?i.contentDocument:i.document;if(!c||c.location.href==e.iframeSrc)if(!m)return;i.detachEvent?i.detachEvent("onload",t):i.removeEventListener("load",t,!1);var d=!0;try{if(m)throw"timeout";var f=e.dataType=="xml"||c.XMLDocument||a.isXMLDoc(c);b("isXml="+f);if(!f&&window.opera&&(c.body==null||c.body.innerHTML=="")&&--s){b("requeing onLoad callback, DOM not available"),setTimeout(t,250);return}j.responseText=c.body?c.body.innerHTML:c.documentElement?c.documentElement.innerHTML:null,j.responseXML=c.XMLDocument?c.XMLDocument:c,j.getResponseHeader=function(a){var b={"content-type":e.dataType};return b[a]};var g=/(json|script)/.test(e.dataType);if(g||e.textarea){var l=c.getElementsByTagName("textarea")[0];if(l)j.responseText=l.value;else if(g){var n=c.getElementsByTagName("pre")[0],o=c.getElementsByTagName("body")[0];n?j.responseText=n.textContent:o&&(j.responseText=o.innerHTML)}}else e.dataType=="xml"&&!j.responseXML&&j.responseText!=null&&(j.responseXML=u(j.responseText));q=w(j,e.dataType,e)}catch(p){b("error caught:",p),d=!1,j.error=p,e.error&&e.error.call(e.context,j,"error",p),k&&a.event.trigger("ajaxError",[j,e,p])}j.aborted&&(b("upload aborted"),d=!1),d&&(e.success&&e.success.call(e.context,q,"success",j),k&&a.event.trigger("ajaxSuccess",[j,e])),k&&a.event.trigger("ajaxComplete",[j,e]),k&&!--a.active&&a.event.trigger("ajaxStop"),e.complete&&e.complete.call(e.context,j,d?"success":"error"),setTimeout(function(){h.removeData("form-plugin-onload"),h.remove(),j.responseXML=null},100)}}function p(){var b=l.attr("target"),c=l.attr("action");d.setAttribute("target",f),d.getAttribute("method")!="POST"&&d.setAttribute("method","POST"),d.getAttribute("action")!=e.url&&d.setAttribute("action",e.url),e.skipEncodingOverride||l.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),e.timeout&&setTimeout(function(){m=!0,t()},e.timeout);var g=[];try{if(e.extraData)for(var j in e.extraData)g.push(a('<input type="hidden" name="'+j+'" value="'+e.extraData[j]+'" />').appendTo(d)[0]);h.appendTo("body"),i.attachEvent?i.attachEvent("onload",t):i.addEventListener("load",t,!1),d.submit()}finally{d.setAttribute("action",c),b?d.setAttribute("target",b):l.removeAttr("target"),a(g).remove()}}var d=l[0];if(a(":input[name=submit],:input[id=submit]",d).length)alert('Error: Form elements must not have name or id of "submit".');else{var e=a.extend(!0,{},a.ajaxSettings,c);e.context=e.context||e;var f="jqFormIO"+(new Date).getTime(),g="_"+f,h=a('<iframe id="'+f+'" name="'+f+'" src="'+e.iframeSrc+'" />'),i=h[0];h.css({position:"absolute",top:"-1000px",left:"-1000px"});var j={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){b("aborting upload...");var c="aborted";this.aborted=1,h.attr("src",e.iframeSrc),j.error=c,e.error&&e.error.call(e.context,j,"error",c),k&&a.event.trigger("ajaxError",[j,e,c]),e.complete&&e.complete.call(e.context,j,"error")}},k=e.global;k&&!(a.active++)&&a.event.trigger("ajaxStart"),k&&a.event.trigger("ajaxSend",[j,e]);if(e.beforeSend&&e.beforeSend.call(e.context,j,e)===!1){e.global&&a.active--;return}if(j.aborted)return;var m=0,n=d.clk;if(n){var o=n.name;o&&!n.disabled&&(e.extraData=e.extraData||{},e.extraData[o]=n.value,n.type=="image"&&(e.extraData[o+".x"]=d.clk_x,e.extraData[o+".y"]=d.clk_y))}e.forceSync?p():setTimeout(p,10);var q,r,s=50,u=a.parseXML||function(a,b){window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml");return b&&b.documentElement&&b.documentElement.nodeName!="parsererror"?b:null},v=a.parseJSON||function(a){return window.eval("("+a+")")},w=function(b,c,d){var e=b.getResponseHeader("content-type")||"",f=c==="xml"||!c&&e.indexOf("xml")>=0,g=f?b.responseXML:b.responseText;f&&g.documentElement.nodeName==="parsererror"&&a.error&&a.error("parsererror"),d&&d.dataFilter&&(g=d.dataFilter(g,c)),typeof g=="string"&&(c==="json"||!c&&e.indexOf("json")>=0?g=v(g):(c==="script"||!c&&e.indexOf("javascript")>=0)&&a.globalEval(g));return g}}}if(!this.length){b("ajaxSubmit: skipping submit process - no element selected");return this}typeof c=="function"&&(c={success:c});var d=this.attr("action"),e=typeof d=="string"?a.trim(d):"";e&&(e=(e.match(/^([^#]+)/)||[])[1]),e=e||window.location.href||"",c=a.extend(!0,{url:e,success:a.ajaxSettings.success,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},c);var f={};this.trigger("form-pre-serialize",[this,c,f]);if(f.veto){b("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(c.beforeSerialize&&c.beforeSerialize(this,c)===!1){b("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var g,h,i=this.formToArray(c.semantic);if(c.data){c.extraData=c.data;for(g in c.data)if(c.data[g]instanceof Array)for(var j in c.data[g])i.push({name:g,value:c.data[g][j]});else h=c.data[g],h=a.isFunction(h)?h():h,i.push({name:g,value:h})}if(c.beforeSubmit&&c.beforeSubmit(i,this,c)===!1){b("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[i,this,c,f]);if(f.veto){b("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var k=a.param(i);c.type.toUpperCase()=="GET"?(c.url+=(c.url.indexOf("?")>=0?"&":"?")+k,c.data=null):c.data=k;var l=this,m=[];c.resetForm&&m.push(function(){l.resetForm()}),c.clearForm&&m.push(function(){l.clearForm()});if(!c.dataType&&c.target){var n=c.success||function(){};m.push(function(b){var d=c.replaceTarget?"replaceWith":"html";a(c.target)[d](b).each(n,arguments)})}else c.success&&m.push(c.success);c.success=function(a,b,d){var e=c.context||c;for(var f=0,g=m.length;f<g;f++)m[f].apply(e,[a,b,d||l,l])};var o=a("input:file",this).length>0,p="multipart/form-data",q=l.attr("enctype")==p||l.attr("encoding")==p;c.iframe!==!1&&(o||c.iframe||q)?c.closeKeepAlive?a.get(c.closeKeepAlive,r):r():a.ajax(c),this.trigger("form-submit-notify",[this,c]);return this},a.fn.ajaxForm=function(c){if(this.length===0){var d={s:this.selector,c:this.context};if(!a.isReady&&d.s){b("DOM not ready, queuing ajaxForm"),a(function(){a(d.s,d.c).ajaxForm(c)});return this}b("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}return this.ajaxFormUnbind().bind("submit.form-plugin",function(b){b.isDefaultPrevented()||(b.preventDefault(),a(this).ajaxSubmit(c))}).bind("click.form-plugin",function(b){var c=b.target,d=a(c);if(!d.is(":submit,input:image")){var e=d.closest(":submit");if(e.length==0)return;c=e[0]}var f=this;f.clk=c;if(c.type=="image")if(b.offsetX!=undefined)f.clk_x=b.offsetX,f.clk_y=b.offsetY;else if(typeof a.fn.offset=="function"){var g=d.offset();f.clk_x=b.pageX-g.left,f.clk_y=b.pageY-g.top}else f.clk_x=b.pageX-c.offsetLeft,f.clk_y=b.pageY-c.offsetTop;setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)})},a.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},a.fn.formToArray=function(b){var c=[];if(this.length===0)return c;var d=this[0],e=b?d.getElementsByTagName("*"):d.elements;if(!e)return c;var f,g,h,i,j,k,l;for(f=0,k=e.length;f<k;f++){j=e[f],h=j.name;if(!h)continue;if(b&&d.clk&&j.type=="image"){!j.disabled&&d.clk==j&&(c.push({name:h,value:a(j).val()}),c.push({name:h+".x",value:d.clk_x},{name:h+".y",value:d.clk_y}));continue}i=a.fieldValue(j,!0);if(i&&i.constructor==Array)for(g=0,l=i.length;g<l;g++)c.push({name:h,value:i[g]});else i!==null&&typeof i!="undefined"&&c.push({name:h,value:i})}if(!b&&d.clk){var m=a(d.clk),n=m[0];h=n.name,h&&!n.disabled&&n.type=="image"&&(c.push({name:h,value:m.val()}),c.push({name:h+".x",value:d.clk_x},{name:h+".y",value:d.clk_y}))}return c},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];this.each(function(){var d=this.name;if(!!d){var e=a.fieldValue(this,b);if(e&&e.constructor==Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else e!==null&&typeof e!="undefined"&&c.push({name:this.name,value:e})}});return a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);if(g===null||typeof g=="undefined"||g.constructor==Array&&!g.length)continue;g.constructor==Array?a.merge(c,g):c.push(g)}return c},a.fieldValue=function(b,c){var d=b.name,e=b.type,f=b.tagName.toLowerCase();c===undefined&&(c=!0);if(c&&(!d||b.disabled||e=="reset"||e=="button"||(e=="checkbox"||e=="radio")&&!b.checked||(e=="submit"||e=="image")&&b.form&&b.form.clk!=b||f=="select"&&b.selectedIndex==-1))return null;if(f=="select"){var g=b.selectedIndex;if(g<0)return null;var h=[],i=b.options,j=e=="select-one",k=j?g+1:i.length;for(var l=j?g:0;l<k;l++){var m=i[l];if(m.selected){var n=m.value;n||(n=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value);if(j)return n;h.push(n)}}return h}return a(b).val()},a.fn.clearForm=function(){return this.each(function(){a("input,select,textarea",this).clearFields()})},a.fn.clearFields=a.fn.clearInputs=function(){return this.each(function(){var a=this.type,b=this.tagName.toLowerCase();a=="text"||a=="password"||b=="textarea"?this.value="":a=="checkbox"||a=="radio"?this.checked=!1:b=="select"&&(this.selectedIndex=-1)})},a.fn.resetForm=function(){return this.each(function(){(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)&&this.reset()})},a.fn.enable=function(a){a===undefined&&(a=!0);return this.each(function(){this.disabled=!a})},a.fn.selected=function(b){b===undefined&&(b=!0);return this.each(function(){var c=this.type;if(c=="checkbox"||c=="radio")this.checked=b;else if(this.tagName.toLowerCase()=="option"){var d=a(this).parent("select");b&&d[0]&&d[0].type=="select-one"&&d.find("option").selected(!1),this.selected=b}})}})(jQuery);
!function(a){function b(e){var f=a.Deferred(),g=setTimeout(a.proxy(f,"reject","AnvatoPlayer: SDK Timeout ("+d+"ms"),d),h=document.createElement("script");return h.type="text/javascript",h.src=e.baseURL+"scripts/anvload.js",h.setAttribute("data-anvp",window.JSON.stringify(e)),h.onerror=a.proxy(f,"reject","AnvatoPlayer: SDK Error"),h.onload=function(){clearTimeout(g),g=setTimeout(a.proxy(f,"reject","AnvatoPlayer: Player Timeout ("+d+"ms)"),d);var h=window.anvp=window.anvp||{};h.onReady=function(a){a.setListener(function(a){window.console&&window.console.debug&&c&&window.console.debug(a.name,a.args),a.args||(a.args=[]),a.args.unshift(h[a.sender]),b.emitEvent(a.name,a.args)})},h[e.pInstance]=h[e.pInstance]||{},h[e.pInstance].onReady=function(a){clearTimeout(g),f.resolve(a,e),b.emit("ready",a,e)}},(document.body||document.getElementsByTagName("body")[0]).appendChild(h),f}var c=a.cookie("tve_debug"),d=15e3;a.extend(b,new EventEmitter),window.AnvatoPlayer=b}(jQuery),function(){Drupal.behaviors.anvatoPlayer={attach:function(a,b){if(b.anvatoPlayers){var c;for(var d in b.anvatoPlayers)c=b.anvatoPlayers[d],c.embed&&!c.embedded&&(window.AnvatoPlayer(c.params),c.embedded=!0)}}}}(jQuery);;
//! moment.js
//! version : 2.6.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function c(a,b){function c(){ib.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}var d=!0;return i(function(){return d&&(c(),d=!1),b.apply(this,arguments)},b)}function d(a,b){return function(c){return l(a.call(this,c),b)}}function e(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function f(){}function g(a){y(a),i(this,a)}function h(a){var b=r(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._bubble()}function i(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function j(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&wb.hasOwnProperty(b)&&(c[b]=a[b]);return c}function k(a){return 0>a?Math.ceil(a):Math.floor(a)}function l(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function m(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&db(a,"Date",cb(a,"Date")+f*c),g&&bb(a,cb(a,"Month")+g*c),d&&ib.updateOffset(a,f||g)}function n(a){return"[object Array]"===Object.prototype.toString.call(a)}function o(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function p(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&t(a[d])!==t(b[d]))&&g++;return g+f}function q(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Zb[a]||$b[b]||b}return a}function r(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=q(c),b&&(d[b]=a[c]));return d}function s(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}ib[b]=function(e,f){var g,h,i=ib.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=ib().utc().set(d,a);return i.call(ib.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function t(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function u(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function v(a,b,c){return $(ib([a,11,31+b-c]),b,c).week}function w(a){return x(a)?366:365}function x(a){return a%4===0&&a%100!==0||a%400===0}function y(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[pb]<0||a._a[pb]>11?pb:a._a[qb]<1||a._a[qb]>u(a._a[ob],a._a[pb])?qb:a._a[rb]<0||a._a[rb]>23?rb:a._a[sb]<0||a._a[sb]>59?sb:a._a[tb]<0||a._a[tb]>59?tb:a._a[ub]<0||a._a[ub]>999?ub:-1,a._pf._overflowDayOfYear&&(ob>b||b>qb)&&(b=qb),a._pf.overflow=b)}function z(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function A(a){return a?a.toLowerCase().replace("_","-"):a}function B(a,b){return b._isUTC?ib(a).zone(b._offset||0):ib(a).local()}function C(a,b){return b.abbr=a,vb[a]||(vb[a]=new f),vb[a].set(b),vb[a]}function D(a){delete vb[a]}function E(a){var b,c,d,e,f=0,g=function(a){if(!vb[a]&&xb)try{require("./lang/"+a)}catch(b){}return vb[a]};if(!a)return ib.fn._lang;if(!n(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=A(a[f]).split("-"),b=e.length,d=A(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&p(e,d,!0)>=b-1)break;b--}f++}return ib.fn._lang}function F(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function G(a){var b,c,d=a.match(Bb);for(b=0,c=d.length;c>b;b++)d[b]=cc[d[b]]?cc[d[b]]:F(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function H(a,b){return a.isValid()?(b=I(b,a.lang()),_b[b]||(_b[b]=G(b)),_b[b](a)):a.lang().invalidDate()}function I(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Cb.lastIndex=0;d>=0&&Cb.test(a);)a=a.replace(Cb,c),Cb.lastIndex=0,d-=1;return a}function J(a,b){var c,d=b._strict;switch(a){case"Q":return Nb;case"DDDD":return Pb;case"YYYY":case"GGGG":case"gggg":return d?Qb:Fb;case"Y":case"G":case"g":return Sb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Rb:Gb;case"S":if(d)return Nb;case"SS":if(d)return Ob;case"SSS":if(d)return Pb;case"DDD":return Eb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ib;case"a":case"A":return E(b._l)._meridiemParse;case"X":return Lb;case"Z":case"ZZ":return Jb;case"T":return Kb;case"SSSS":return Hb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Ob:Db;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Db;case"Do":return Mb;default:return c=new RegExp(R(Q(a.replace("\\","")),"i"))}}function K(a){a=a||"";var b=a.match(Jb)||[],c=b[b.length-1]||[],d=(c+"").match(Xb)||["-",0,0],e=+(60*d[1])+t(d[2]);return"+"===d[0]?-e:e}function L(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[pb]=3*(t(b)-1));break;case"M":case"MM":null!=b&&(e[pb]=t(b)-1);break;case"MMM":case"MMMM":d=E(c._l).monthsParse(b),null!=d?e[pb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[qb]=t(b));break;case"Do":null!=b&&(e[qb]=t(parseInt(b,10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=t(b));break;case"YY":e[ob]=ib.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[ob]=t(b);break;case"a":case"A":c._isPm=E(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[rb]=t(b);break;case"m":case"mm":e[sb]=t(b);break;case"s":case"ss":e[tb]=t(b);break;case"S":case"SS":case"SSS":case"SSSS":e[ub]=t(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=K(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function M(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=O(a),a._w&&null==a._a[qb]&&null==a._a[pb]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?1900+c:2e3+c:c:null==a._a[ob]?ib().weekYear():a._a[ob]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=_(f(g.GG),g.W||1,g.E,4,1):(i=E(a._l),j=null!=g.d?X(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=_(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[ob]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[ob]?d[ob]:a._a[ob],a._dayOfYear>w(e)&&(a._pf._overflowDayOfYear=!0),c=W(e,0,a._dayOfYear),a._a[pb]=c.getUTCMonth(),a._a[qb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[rb]+=t((a._tzm||0)/60),l[sb]+=t((a._tzm||0)%60),a._d=(a._useUTC?W:V).apply(null,l)}}function N(a){var b;a._d||(b=r(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],M(a))}function O(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function P(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=E(a._l),h=""+a._i,i=h.length,j=0;for(d=I(a._f,g).match(Bb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(J(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),cc[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),L(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[rb]<12&&(a._a[rb]+=12),a._isPm===!1&&12===a._a[rb]&&(a._a[rb]=0),M(a),y(a)}function Q(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function R(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function S(a){var c,d,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,c=i({},a),c._pf=b(),c._f=a._f[f],P(c),z(c)&&(g+=c._pf.charsLeftOver,g+=10*c._pf.unusedTokens.length,c._pf.score=g,(null==e||e>g)&&(e=g,d=c));i(a,d||c)}function T(a){var b,c,d=a._i,e=Tb.exec(d);if(e){for(a._pf.iso=!0,b=0,c=Vb.length;c>b;b++)if(Vb[b][1].exec(d)){a._f=Vb[b][0]+(e[6]||" ");break}for(b=0,c=Wb.length;c>b;b++)if(Wb[b][1].exec(d)){a._f+=Wb[b][0];break}d.match(Jb)&&(a._f+="Z"),P(a)}else ib.createFromInputFallback(a)}function U(b){var c=b._i,d=yb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?T(b):n(c)?(b._a=c.slice(0),M(b)):o(c)?b._d=new Date(+c):"object"==typeof c?N(b):"number"==typeof c?b._d=new Date(c):ib.createFromInputFallback(b)}function V(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function W(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function X(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Y(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Z(a,b,c){var d=nb(Math.abs(a)/1e3),e=nb(d/60),f=nb(e/60),g=nb(f/24),h=nb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",nb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,Y.apply({},i)}function $(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=ib(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function _(a,b,c,d,e){var f,g,h=W(a,0,1).getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:w(a-1)+g}}function ab(b){var c=b._i,d=b._f;return null===c||d===a&&""===c?ib.invalid({nullInput:!0}):("string"==typeof c&&(b._i=c=E().preparse(c)),ib.isMoment(c)?(b=j(c),b._d=new Date(+c._d)):d?n(d)?S(b):P(b):U(b),new g(b))}function bb(a,b){var c;return"string"==typeof b&&(b=a.lang().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),u(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function cb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function db(a,b,c){return"Month"===b?bb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function eb(a,b){return function(c){return null!=c?(db(this,a,c),ib.updateOffset(this,b),this):cb(this,a)}}function fb(a){ib.duration.fn[a]=function(){return this._data[a]}}function gb(a,b){ib.duration.fn["as"+a]=function(){return+this/b}}function hb(a){"undefined"==typeof ender&&(jb=mb.moment,mb.moment=a?c("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",ib):ib)}for(var ib,jb,kb,lb="2.6.0",mb="undefined"!=typeof global?global:this,nb=Math.round,ob=0,pb=1,qb=2,rb=3,sb=4,tb=5,ub=6,vb={},wb={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},xb="undefined"!=typeof module&&module.exports,yb=/^\/?Date\((\-?\d+)/i,zb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ab=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Bb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Cb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,Db=/\d\d?/,Eb=/\d{1,3}/,Fb=/\d{1,4}/,Gb=/[+\-]?\d{1,6}/,Hb=/\d+/,Ib=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Jb=/Z|[\+\-]\d\d:?\d\d/gi,Kb=/T/i,Lb=/[\+\-]?\d+(\.\d{1,3})?/,Mb=/\d{1,2}/,Nb=/\d/,Ob=/\d\d/,Pb=/\d{3}/,Qb=/\d{4}/,Rb=/[+-]?\d{6}/,Sb=/[+-]?\d+/,Tb=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ub="YYYY-MM-DDTHH:mm:ssZ",Vb=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Wb=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Xb=/([\+\-]|\d\d)/gi,Yb=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),Zb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},$b={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},_b={},ac="DDD w W M D d".split(" "),bc="M D H h m s w W".split(" "),cc={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return l(this.year()%100,2)},YYYY:function(){return l(this.year(),4)},YYYYY:function(){return l(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+l(Math.abs(a),6)},gg:function(){return l(this.weekYear()%100,2)},gggg:function(){return l(this.weekYear(),4)},ggggg:function(){return l(this.weekYear(),5)},GG:function(){return l(this.isoWeekYear()%100,2)},GGGG:function(){return l(this.isoWeekYear(),4)},GGGGG:function(){return l(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return t(this.milliseconds()/100)},SS:function(){return l(t(this.milliseconds()/10),2)},SSS:function(){return l(this.milliseconds(),3)},SSSS:function(){return l(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+l(t(a/60),2)+":"+l(t(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+l(t(a/60),2)+l(t(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},dc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];ac.length;)kb=ac.pop(),cc[kb+"o"]=e(cc[kb],kb);for(;bc.length;)kb=bc.pop(),cc[kb+kb]=d(cc[kb],2);for(cc.DDDD=d(cc.DDD,3),i(f.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=ib.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=ib([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return $(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),ib=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=c,g._f=d,g._l=e,g._strict=f,g._isUTC=!1,g._pf=b(),ab(g)},ib.suppressDeprecationWarnings=!1,ib.createFromInputFallback=c("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i)}),ib.utc=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=c,g._f=d,g._strict=f,g._pf=b(),ab(g).utc()},ib.unix=function(a){return ib(1e3*a)},ib.duration=function(a,b){var c,d,e,f=a,g=null;return ib.isDuration(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(g=zb.exec(a))?(c="-"===g[1]?-1:1,f={y:0,d:t(g[qb])*c,h:t(g[rb])*c,m:t(g[sb])*c,s:t(g[tb])*c,ms:t(g[ub])*c}):(g=Ab.exec(a))&&(c="-"===g[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},f={y:e(g[2]),M:e(g[3]),d:e(g[4]),h:e(g[5]),m:e(g[6]),s:e(g[7]),w:e(g[8])}),d=new h(f),ib.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},ib.version=lb,ib.defaultFormat=Ub,ib.momentProperties=wb,ib.updateOffset=function(){},ib.lang=function(a,b){var c;return a?(b?C(A(a),b):null===b?(D(a),a="en"):vb[a]||E(a),c=ib.duration.fn._lang=ib.fn._lang=E(a),c._abbr):ib.fn._lang._abbr},ib.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),E(a)},ib.isMoment=function(a){return a instanceof g||null!=a&&a.hasOwnProperty("_isAMomentObject")},ib.isDuration=function(a){return a instanceof h},kb=dc.length-1;kb>=0;--kb)s(dc[kb]);ib.normalizeUnits=function(a){return q(a)},ib.invalid=function(a){var b=ib.utc(0/0);return null!=a?i(b._pf,a):b._pf.userInvalidated=!0,b},ib.parseZone=function(){return ib.apply(null,arguments).parseZone()},ib.parseTwoDigitYear=function(a){return t(a)+(t(a)>68?1900:2e3)},i(ib.fn=g.prototype,{clone:function(){return ib(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=ib(this).utc();return 0<a.year()&&a.year()<=9999?H(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):H(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return z(this)},isDSTShifted:function(){return this._a?this.isValid()&&p(this._a,(this._isUTC?ib.utc(this._a):ib(this._a)).toArray())>0:!1},parsingFlags:function(){return i({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=H(this,a||ib.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?ib.duration(+b,a):ib.duration(a,b),m(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?ib.duration(+b,a):ib.duration(a,b),m(this,c,-1),this},diff:function(a,b,c){var d,e,f=B(a,this),g=6e4*(this.zone()-f.zone());return b=q(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-ib(this).startOf("month")-(f-ib(f).startOf("month")))/d,e-=6e4*(this.zone()-ib(this).startOf("month").zone()-(f.zone()-ib(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:k(e)},from:function(a,b){return ib.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(ib(),a)},calendar:function(){var a=B(ib(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return x(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=X(a,this.lang()),this.add({d:a-b})):b},month:eb("Month",!0),startOf:function(a){switch(a=q(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(a){return a=q(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+ib(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+ib(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+B(a,this).startOf(b)},min:function(a){return a=ib.apply(null,arguments),this>a?this:a},max:function(a){return a=ib.apply(null,arguments),a>this?this:a},zone:function(a,b){var c=this._offset||0;return null==a?this._isUTC?c:this._d.getTimezoneOffset():("string"==typeof a&&(a=K(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,c!==a&&(!b||this._changeInProgress?m(this,ib.duration(c-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,ib.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?ib(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return u(this.year(),this.month())},dayOfYear:function(a){var b=nb((ib(this).startOf("day")-ib(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=$(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=$(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=$(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return v(this.year(),1,4)},weeksInYear:function(){var a=this._lang._week;return v(this.year(),a.dow,a.doy)},get:function(a){return a=q(a),this[a]()},set:function(a,b){return a=q(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=E(b),this)}}),ib.fn.millisecond=ib.fn.milliseconds=eb("Milliseconds",!1),ib.fn.second=ib.fn.seconds=eb("Seconds",!1),ib.fn.minute=ib.fn.minutes=eb("Minutes",!1),ib.fn.hour=ib.fn.hours=eb("Hours",!0),ib.fn.date=eb("Date",!0),ib.fn.dates=c("dates accessor is deprecated. Use date instead.",eb("Date",!0)),ib.fn.year=eb("FullYear",!0),ib.fn.years=c("years accessor is deprecated. Use year instead.",eb("FullYear",!0)),ib.fn.days=ib.fn.day,ib.fn.months=ib.fn.month,ib.fn.weeks=ib.fn.week,ib.fn.isoWeeks=ib.fn.isoWeek,ib.fn.quarters=ib.fn.quarter,ib.fn.toJSON=ib.fn.toISOString,i(ib.duration.fn=h.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,h=this._data;h.milliseconds=e%1e3,a=k(e/1e3),h.seconds=a%60,b=k(a/60),h.minutes=b%60,c=k(b/60),h.hours=c%24,f+=k(c/24),h.days=f%30,g+=k(f/30),h.months=g%12,d=k(g/12),h.years=d},weeks:function(){return k(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*t(this._months/12)},humanize:function(a){var b=+this,c=Z(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=ib.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=ib.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=q(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=q(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:ib.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(kb in Yb)Yb.hasOwnProperty(kb)&&(gb(kb,Yb[kb]),fb(kb.toLowerCase()));gb("Weeks",6048e5),ib.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},ib.lang("en",{ordinal:function(a){var b=a%10,c=1===t(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),xb?module.exports=ib:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(mb.moment=jb),ib}),hb(!0)):hb()}).call(this);;
!function(a,b){var c,d=(window.console||{info:function(){},error:function(){},log:function(){}},{}),e=[];d.setCurrentEventId=function(a){return c===a?!1:(c=a,!0)},d.getEvents=function(a){a=b.extend({count:5,airings:!1,fresh:!1},a);var c=d.updateEvents(a),e=d.getCurrentEvents(a.count);return a.fresh||e.length!==a.count?c.pipe(b.proxy(d,"getCurrentEvents",a.count)):b.Deferred().resolve(e)},d.updateEvents=function(a){var f=AnvatoLocationSettings.host+"/rest/"+AnvatoLocationSettings.version+"/tve?anvack="+AnvatoLocationSettings.access_token+"&upcoming_events="+a.count;return b.getJSON(f).pipe(function(f){try{f.station.current_event.event_id,f.station.next_event.event_id,f.station.upcoming_events.length}catch(g){return b.Deferred().reject("Anvato.Schedule: Unable to determine current schedule.")}return c=f.station.current_event.event_id,e=f.station.upcoming_events,e.unshift(f.station.next_event),e.unshift(f.station.current_event),e=b.map(e,d.processMetadata),a.airings?d.getEventAirings(e):e})},d.getEventAirings=function(a){function c(a){var c=moment.unix(a.ts_start);return a.time=c.format("h:mm"),a.dayPeriod=c.format("A"),a.rating=a.metadata.rovi_tv_rating,b.get("/a/airings",{startDate:d,endDate:e,order:"startTime",sortDir:"ASC",imageStyle:"nbc_schedule2_detail",programTitle:a.title,stationCallsign:a.metadata.rovi_callsign}).pipe(function(b){return b=b&&b[0],b&&(a.thumbnail=b.image&&b.image.src,a.rating=a.rating||b.rating),a},function(){return b.Deferred().resolve(a)})}var d=moment().startOf("hour").toISOString(),e=moment().add(1,"days").endOf("day").toISOString();return b.when.apply(b,b.map(a,c)).pipe(function(){return b.makeArray(arguments)})},d.getCurrentEvent=function(){for(var a=0;a<e.length;a++)if(e[a].event_id===c)return e[a]},d.getNextEvent=function(){for(var a=0;a<e.length;a++)if(e[a].event_id===c)return e[a+1]},d.getUpcomingEvents=function(a){for(var b=0;b<e.length;b++)if(e[b].event_id===c)return a?e.slice(b+1,b+1+a):e.slice(b+1);return[]},d.getCurrentEvents=function(a){for(var b=0;b<e.length;b++)if(e[b].event_id===c)return a?e.slice(b,b+a):e.slice(b);return[]},d.processMetadata=function(a){if("custom_metadata"in a){var b,c,d={};for(b in a.custom_metadata)c=a.custom_metadata[b],d[c.name]=c.value;a.metadata=d}return a},d.calculateDuration=function(a){return parseInt(a.ts_end,10)-parseInt(a.ts_start,10)},d.formatTime=function(a,b){var c=Math.floor(a/3600),d=Math.floor((a-3600*c)/60),e=Math.floor(a-3600*c-60*d);if(10>c&&(c="0"+c),10>d&&(d="0"+d),10>e&&(e="0"+e),null!==b){var f=b.replace("hh",c);return f=f.replace("h",1*c+""),f=f.replace("mm",d),f=f.replace("m",1*d+""),f=f.replace("ss",e),f=f.replace("s",1*e+"")}return c+":"+d+":"+e},a.Anvato=a.Anvato||{},a.Anvato.Schedule=d}(window,jQuery);;
/*! Dust - Asynchronous Templating - v2.5.1
* http://linkedin.github.io/dustjs/
* Copyright (c) 2014 Aleksander Williams; Released under the MIT License */
!function(root){function Context(a,b,c,d){this.stack=a,this.global=b,this.blocks=c,this.templateName=d}function Stack(a,b,c,d){this.tail=b,this.isObject=a&&"object"==typeof a,this.head=a,this.index=c,this.of=d}function Stub(a){this.head=new Chunk(this),this.callback=a,this.out=""}function Stream(){this.head=new Chunk(this)}function Chunk(a,b,c){this.root=a,this.next=b,this.data=[],this.flushable=!1,this.taps=c}function Tap(a,b){this.head=a,this.tail=b}var dust={},NONE="NONE",ERROR="ERROR",WARN="WARN",INFO="INFO",DEBUG="DEBUG",loggingLevels=[DEBUG,INFO,WARN,ERROR,NONE],EMPTY_FUNC=function(){},logger={},originalLog,loggerContext;dust.debugLevel=NONE,dust.config={whitespace:!1},dust._aliases={write:"w",end:"e",map:"m",render:"r",reference:"f",section:"s",exists:"x",notexists:"nx",block:"b",partial:"p",helper:"h"},root&&root.console&&root.console.log&&(loggerContext=root.console,originalLog=root.console.log),logger.log=loggerContext?function(){logger.log="function"==typeof originalLog?function(){originalLog.apply(loggerContext,arguments)}:function(){var a=Array.prototype.slice.apply(arguments).join(" ");originalLog(a)},logger.log.apply(this,arguments)}:function(){},dust.log=function(a,b){b=b||INFO,dust.debugLevel!==NONE&&dust.indexInArray(loggingLevels,b)>=dust.indexInArray(loggingLevels,dust.debugLevel)&&(dust.logQueue||(dust.logQueue=[]),dust.logQueue.push({message:a,type:b}),logger.log("[DUST "+b+"]: "+a))},dust.helpers={},dust.cache={},dust.register=function(a,b){a&&(dust.cache[a]=b)},dust.render=function(a,b,c){var d=new Stub(c).head;try{dust.load(a,d,Context.wrap(b,a)).end()}catch(e){d.setError(e)}},dust.stream=function(a,b){var c=new Stream,d=c.head;return dust.nextTick(function(){try{dust.load(a,c.head,Context.wrap(b,a)).end()}catch(e){d.setError(e)}}),c},dust.renderSource=function(a,b,c){return dust.compileFn(a)(b,c)},dust.compileFn=function(a,b){b=b||null;var c=dust.loadSource(dust.compile(a,b));return function(a,d){var e=d?new Stub(d):new Stream;return dust.nextTick(function(){"function"==typeof c?c(e.head,Context.wrap(a,b)).end():dust.log(new Error("Template ["+b+"] cannot be resolved to a Dust function"),ERROR)}),e}},dust.load=function(a,b,c){var d=dust.cache[a];return d?d(b,c):dust.onLoad?b.map(function(b){dust.onLoad(a,function(d,e){return d?b.setError(d):(dust.cache[a]||dust.loadSource(dust.compile(e,a)),void dust.cache[a](b,c).end())})}):b.setError(new Error("Template Not Found: "+a))},dust.loadSource=function(source,path){return eval(source)},dust.isArray=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},dust.indexInArray=function(a,b,c){if(c=+c||0,Array.prototype.indexOf)return a.indexOf(b,c);if(void 0===a||null===a)throw new TypeError('cannot call method "indexOf" of null');var d=a.length;for(1/0===Math.abs(c)&&(c=0),0>c&&(c+=d,0>c&&(c=0));d>c;c++)if(a[c]===b)return c;return-1},dust.nextTick=function(){return function(a){setTimeout(a,0)}}(),dust.isEmpty=function(a){return dust.isArray(a)&&!a.length?!0:0===a?!1:!a},dust.filter=function(a,b,c){if(c)for(var d=0,e=c.length;e>d;d++){var f=c[d];"s"===f?b=null:"function"==typeof dust.filters[f]?a=dust.filters[f](a):dust.log("Invalid filter ["+f+"]",WARN)}return b&&(a=dust.filters[b](a)),a},dust.filters={h:function(a){return dust.escapeHtml(a)},j:function(a){return dust.escapeJs(a)},u:encodeURI,uc:encodeURIComponent,js:function(a){return JSON?JSON.stringify(a):(dust.log("JSON is undefined.  JSON stringify has not been used on ["+a+"]",WARN),a)},jp:function(a){return JSON?JSON.parse(a):(dust.log("JSON is undefined.  JSON parse has not been used on ["+a+"]",WARN),a)}},dust.makeBase=function(a){return new Context(new Stack,a)},Context.wrap=function(a,b){return a instanceof Context?a:new Context(new Stack(a),{},null,b)},Context.prototype.get=function(a,b){return"string"==typeof a&&("."===a[0]&&(b=!0,a=a.substr(1)),a=a.split(".")),this._get(b,a)},Context.prototype._get=function(a,b){var c,d,e,f,g,h=this.stack,i=1;if(d=b[0],e=b.length,a&&0===e)f=h,h=h.head;else{if(a)h&&(h=h.head?h.head[d]:void 0);else{for(;h&&(!h.isObject||(f=h.head,c=h.head[d],void 0===c));)h=h.tail;h=void 0!==c?c:this.global?this.global[d]:void 0}for(;h&&e>i;)f=h,h=h[b[i]],i++}return"function"==typeof h?(g=function(){try{return h.apply(f,arguments)}catch(a){throw dust.log(a,ERROR),a}},g.__dustBody=!!h.__dustBody,g):(void 0===h&&dust.log("Cannot find the value for reference [{"+b.join(".")+"}] in template ["+this.getTemplateName()+"]"),h)},Context.prototype.getPath=function(a,b){return this._get(a,b)},Context.prototype.push=function(a,b,c){return new Context(new Stack(a,this.stack,b,c),this.global,this.blocks,this.getTemplateName())},Context.prototype.rebase=function(a){return new Context(new Stack(a),this.global,this.blocks,this.getTemplateName())},Context.prototype.current=function(){return this.stack.head},Context.prototype.getBlock=function(a){if("function"==typeof a){var b=new Chunk;a=a(b,this).data.join("")}var c=this.blocks;if(!c)return void dust.log("No blocks for context[{"+a+"}] in template ["+this.getTemplateName()+"]",DEBUG);for(var d,e=c.length;e--;)if(d=c[e][a])return d},Context.prototype.shiftBlocks=function(a){var b,c=this.blocks;return a?(b=c?c.concat([a]):[a],new Context(this.stack,this.global,b,this.getTemplateName())):this},Context.prototype.getTemplateName=function(){return this.templateName},Stub.prototype.flush=function(){for(var a=this.head;a;){if(!a.flushable)return a.error?(this.callback(a.error),dust.log("Chunk error ["+a.error+"] thrown. Ceasing to render this template.",WARN),void(this.flush=EMPTY_FUNC)):void 0;this.out+=a.data.join(""),a=a.next,this.head=a}this.callback(null,this.out)},Stream.prototype.flush=function(){for(var a=this.head;a;){if(!a.flushable)return a.error?(this.emit("error",a.error),dust.log("Chunk error ["+a.error+"] thrown. Ceasing to render this template.",WARN),void(this.flush=EMPTY_FUNC)):void 0;this.emit("data",a.data.join("")),a=a.next,this.head=a}this.emit("end")},Stream.prototype.emit=function(a,b){if(!this.events)return dust.log("No events to emit",INFO),!1;var c=this.events[a];if(!c)return dust.log("Event type ["+a+"] does not exist",WARN),!1;if("function"==typeof c)c(b);else if(dust.isArray(c))for(var d=c.slice(0),e=0,f=d.length;f>e;e++)d[e](b);else dust.log("Event Handler ["+c+"] is not of a type that is handled by emit",WARN)},Stream.prototype.on=function(a,b){return this.events||(this.events={}),this.events[a]?"function"==typeof this.events[a]?this.events[a]=[this.events[a],b]:this.events[a].push(b):b?this.events[a]=b:dust.log("Callback for type ["+a+"] does not exist. Listener not registered.",WARN),this},Stream.prototype.pipe=function(a){return this.on("data",function(b){try{a.write(b,"utf8")}catch(c){dust.log(c,ERROR)}}).on("end",function(){try{return a.end()}catch(b){dust.log(b,ERROR)}}).on("error",function(b){a.error(b)}),this},Chunk.prototype.write=function(a){var b=this.taps;return b&&(a=b.go(a)),this.data.push(a),this},Chunk.prototype.end=function(a){return a&&this.write(a),this.flushable=!0,this.root.flush(),this},Chunk.prototype.map=function(a){var b=new Chunk(this.root,this.next,this.taps),c=new Chunk(this.root,b,this.taps);this.next=c,this.flushable=!0;try{a(c)}catch(d){dust.log(d,ERROR),c.setError(d)}return b},Chunk.prototype.tap=function(a){var b=this.taps;return this.taps=b?b.push(a):new Tap(a),this},Chunk.prototype.untap=function(){return this.taps=this.taps.tail,this},Chunk.prototype.render=function(a,b){return a(this,b)},Chunk.prototype.reference=function(a,b,c,d){return"function"==typeof a&&(a=a.apply(b.current(),[this,b,null,{auto:c,filters:d}]),a instanceof Chunk)?a:dust.isEmpty(a)?this:this.write(dust.filter(a,c,d))},Chunk.prototype.section=function(a,b,c,d){if("function"==typeof a&&!a.__dustBody){try{a=a.apply(b.current(),[this,b,c,d])}catch(e){return dust.log(e,ERROR),this.setError(e)}if(a instanceof Chunk)return a}var f=c.block,g=c["else"];if(d&&(b=b.push(d)),dust.isArray(a)){if(f){var h=a.length,i=this;if(h>0){b.stack.head&&(b.stack.head.$len=h);for(var j=0;h>j;j++)b.stack.head&&(b.stack.head.$idx=j),i=f(i,b.push(a[j],j,h));return b.stack.head&&(b.stack.head.$idx=void 0,b.stack.head.$len=void 0),i}if(g)return g(this,b)}}else if(a===!0){if(f)return f(this,b)}else if(a||0===a){if(f)return f(this,b.push(a))}else if(g)return g(this,b);return dust.log("Not rendering section (#) block in template ["+b.getTemplateName()+"], because above key was not found",DEBUG),this},Chunk.prototype.exists=function(a,b,c){var d=c.block,e=c["else"];if(dust.isEmpty(a)){if(e)return e(this,b)}else if(d)return d(this,b);return dust.log("Not rendering exists (?) block in template ["+b.getTemplateName()+"], because above key was not found",DEBUG),this},Chunk.prototype.notexists=function(a,b,c){var d=c.block,e=c["else"];if(dust.isEmpty(a)){if(d)return d(this,b)}else if(e)return e(this,b);return dust.log("Not rendering not exists (^) block check in template ["+b.getTemplateName()+"], because above key was found",DEBUG),this},Chunk.prototype.block=function(a,b,c){var d=c.block;return a&&(d=a),d?d(this,b):this},Chunk.prototype.partial=function(a,b,c){var d;d=dust.makeBase(b.global),d.blocks=b.blocks,b.stack&&b.stack.tail&&(d.stack=b.stack.tail),c&&(d=d.push(c)),"string"==typeof a&&(d.templateName=a),d=d.push(b.stack.head);var e;return e="function"==typeof a?this.capture(a,d,function(a,b){d.templateName=d.templateName||a,dust.load(a,b,d).end()}):dust.load(a,this,d)},Chunk.prototype.helper=function(a,b,c,d){var e=this;if(!dust.helpers[a])return dust.log("Invalid helper ["+a+"]",WARN),e;try{return dust.helpers[a](e,b,c,d)}catch(f){return dust.log("Error in "+a+" helper: "+f,ERROR),e.setError(f)}},Chunk.prototype.capture=function(a,b,c){return this.map(function(d){var e=new Stub(function(a,b){a?d.setError(a):c(b,d)});a(e.head,b).end()})},Chunk.prototype.setError=function(a){return this.error=a,this.root.flush(),this};for(var f in Chunk.prototype)dust._aliases[f]&&(Chunk.prototype[dust._aliases[f]]=Chunk.prototype[f]);Tap.prototype.push=function(a){return new Tap(a,this)},Tap.prototype.go=function(a){for(var b=this;b;)a=b.head(a),b=b.tail;return a};var HCHARS=/[&<>"']/,AMP=/&/g,LT=/</g,GT=/>/g,QUOT=/\"/g,SQUOT=/\'/g;dust.escapeHtml=function(a){return"string"==typeof a&&HCHARS.test(a)?a.replace(AMP,"&amp;").replace(LT,"&lt;").replace(GT,"&gt;").replace(QUOT,"&quot;").replace(SQUOT,"&#39;"):a};var BS=/\\/g,FS=/\//g,CR=/\r/g,LS=/\u2028/g,PS=/\u2029/g,NL=/\n/g,LF=/\f/g,SQ=/'/g,DQ=/"/g,TB=/\t/g;dust.escapeJs=function(a){return"string"==typeof a?a.replace(BS,"\\\\").replace(FS,"\\/").replace(DQ,'\\"').replace(SQ,"\\'").replace(CR,"\\r").replace(LS,"\\u2028").replace(PS,"\\u2029").replace(NL,"\\n").replace(LF,"\\f").replace(TB,"\\t"):a},"object"==typeof exports?module.exports=dust:root.dust=dust}(function(){return this}());;
/*! dustjs-helpers - v1.6.1
* https://github.com/linkedin/dustjs-helpers
* Copyright (c) 2015 Aleksander Williams; Released under the MIT License */
!function(a,b){"function"==typeof define&&define.amd&&define.amd.dust===!0?define(["dust.core"],b):"object"==typeof exports?module.exports=b(require("dustjs-linkedin")):b(a.dust)}(this,function(dust){function a(a){i[a]||(h("Deprecation warning: "+a+" is deprecated and will be removed in a future version of dustjs-helpers","WARN"),h("For help and a deprecation timeline, see https://github.com/linkedin/dustjs-helpers/wiki/Deprecated-Features#"+a.replace(/\W+/g,""),"WARN"),i[a]=!0)}function b(a){return a.stack.tail&&"undefined"!=typeof a.stack.tail.head.__select__}function c(a){return a.get("__select__")}function d(a,b){var c=a.stack.head,d=a.rebase();return a.stack&&a.stack.tail&&(d.stack=a.stack.tail),d.push({__select__:{isResolved:!1,isDefaulted:!1,isDeferredComplete:!1,deferreds:[],key:b}}).push(c,a.stack.index,a.stack.of)}function e(a,b){return"function"==typeof b?b.toString().replace(/(^\s+|\s+$)/gm,"").replace(/\n/gm,"").replace(/,\s*/gm,", ").replace(/\)\{/gm,") {"):b}function f(a,d,e,f,i){f=f||{};var j,k,l,m=e.block,n=f.filterOpType||"";if(f.hasOwnProperty("key"))j=dust.helpers.tap(f.key,a,d);else{if(!b(d))return h("No key specified for filter in {@"+n+"}"),a;l=c(d),j=l.key,l.isResolved&&(i=function(){return!1})}return k=dust.helpers.tap(f.value,a,d),i(g(k,f.type,d),g(j,f.type,d))?(b(d)&&("default"===n&&(l.isDefaulted=!0),l.isResolved=!0),m?a.render(m,d):a):e["else"]?a.render(e["else"],d):a}function g(a,b,c){if("undefined"!=typeof a)switch(b||typeof a){case"number":return+a;case"string":return String(a);case"boolean":return a="false"===a?!1:a,Boolean(a);case"date":return new Date(a);case"context":return c.get(a)}return a}var h=dust.log?function(a,b){b=b||"INFO",dust.log(a,b)}:function(){},i={},j={tap:function(a,b,c){if("function"!=typeof a)return a;var d,e="";return d=b.tap(function(a){return e+=a,""}).render(a,c),b.untap(),d.constructor!==b.constructor?d:""===e?!1:e},sep:function(a,b,c){var d=c.block;return b.stack.index===b.stack.of-1?a:d?d(a,b):a},first:function(a,b,c){return 0===b.stack.index?c.block(a,b):a},last:function(a,b,c){return b.stack.index===b.stack.of-1?c.block(a,b):a},contextDump:function(a,b,c,d){var f,g=d||{},i=g.to||"output",j=g.key||"current";return i=dust.helpers.tap(i,a,b),j=dust.helpers.tap(j,a,b),f="full"===j?JSON.stringify(b.stack,e,2):JSON.stringify(b.stack.head,e,2),"console"===i?(h(f),a):(f=f.replace(/</g,"\\u003c"),a.write(f))},math:function(a,b,c,e){if(e&&"undefined"!=typeof e.key&&e.method){var f=e.key,g=e.method,i=e.operand,j=e.round,k=null;switch(f=parseFloat(dust.helpers.tap(f,a,b)),i=parseFloat(dust.helpers.tap(i,a,b)),g){case"mod":(0===i||i===-0)&&h("Division by 0 in {@math} helper","WARN"),k=f%i;break;case"add":k=f+i;break;case"subtract":k=f-i;break;case"multiply":k=f*i;break;case"divide":(0===i||i===-0)&&h("Division by 0 in {@math} helper","WARN"),k=f/i;break;case"ceil":k=Math.ceil(f);break;case"floor":k=Math.floor(f);break;case"round":k=Math.round(f);break;case"abs":k=Math.abs(f);break;case"toint":k=parseInt(f,10);break;default:h("{@math}: method "+g+" not supported")}return null!==k?(j&&(k=Math.round(k)),c&&c.block?(b=d(b,k),a.render(c.block,b)):a.write(k)):a}return h("Key is a required parameter for math helper along with method/operand!"),a},select:function(a,b,e,f){var g,i,j,k,l=e.block;if(f.hasOwnProperty("key"))if(i=dust.helpers.tap(f.key,a,b),l){if(b=d(b,i),g=c(b),a=a.render(l,b),g.deferreds.length)for(g.isDeferredComplete=!0,k=0,j=g.deferreds.length;j>k;k++)g.deferreds[k]()}else h("Missing body block in {@select}");else h("No key provided for {@select}","WARN");return a},eq:function(a,b,c,d){return d.filterOpType="eq",f(a,b,c,d,function(a,b){return b===a})},ne:function(a,b,c,d){return d.filterOpType="ne",f(a,b,c,d,function(a,b){return b!==a})},lt:function(a,b,c,d){return d.filterOpType="lt",f(a,b,c,d,function(a,b){return a>b})},lte:function(a,b,c,d){return d.filterOpType="lte",f(a,b,c,d,function(a,b){return a>=b})},gt:function(a,b,c,d){return d.filterOpType="gt",f(a,b,c,d,function(a,b){return b>a})},gte:function(a,b,c,d){return d.filterOpType="gte",f(a,b,c,d,function(a,b){return b>=a})},any:function(a,d,e){var f;return b(d)?(f=c(d),f.isDeferredComplete?h("{@any} nested inside {@any} or {@none} block. It needs its own {@select} block","WARN"):a=a.map(function(a){f.deferreds.push(function(){f.isResolved&&!f.isDefaulted&&(a=a.render(e.block,d)),a.end()})})):h("{@any} used outside of a {@select} block","WARN"),a},none:function(a,d,e){var f;return b(d)?(f=c(d),f.isDeferredComplete?h("{@none} nested inside {@any} or {@none} block. It needs its own {@select} block","WARN"):a=a.map(function(a){f.deferreds.push(function(){f.isResolved||(a=a.render(e.block,d)),a.end()})})):h("{@none} used outside of a {@select} block","WARN"),a},"default":function(c,d,e,g){return g.filterOpType="default",a("{@default}"),b(d)?f(c,d,e,g,function(){return!0}):(h("{@default} used outside of a {@select} block","WARN"),c)},size:function(a,b,c,d){var e,f,g,h=0;if(d=d||{},e=d.key,e&&e!==!0)if(dust.isArray(e))h=e.length;else if(!isNaN(parseFloat(e))&&isFinite(e))h=e;else if("object"==typeof e){f=0;for(g in e)Object.hasOwnProperty.call(e,g)&&f++;h=f}else h=(e+"").length;else h=0;return a.write(h)}};for(var k in j)dust.helpers[k]=j[k];return dust});;
/**
 * A simple wrapper around dust to easily integrate with jQuery
 */
/*global jQuery, dust*/
(function ($) {
  /**
   * Render a dust template to the current element
   *
   * @param {string} template (optional)
   *   Name of the dust template to use.
   *   If skipped, will use this parameter as data, and
   *      will attempt to use data attribute if not specified.
   * @param {object|function|Promise} data
   *   An object to pass to dust template function
   *   If a function is passed
   *     The function will be called on each element in the set
   *     with the element as context, and the index as an argument
   *   If a Promise is passed
   *     We will render the template from the result of the promise
   *     when it becomes available
   *   Finally, attempt to parse data attributes if data not specified
   */
  $.fn.dust = function (templateName, data) {
    if (arguments.length === 1) {
      data = templateName;
      templateName = false;
    }
    return $.extend(this, $.when.apply($,
      this.map(function (index, domElement) {
        return $.dust(domElement,
          templateName || $(domElement).data('dust-template'),
          ($.isFunction(data) ? data.call(domElement, index) : (data || $(domElement).data()))
        );
      }).get()
    ));
  };

  $.fn.dust_compile = function (templateName) {
    return this.each(function () {
      dust.compileFn($(this).html(), templateName || $(this).attr('id'));
    });
  };

  /**
   * Render a Dust template to a particular element
   *
   * @param {selector} element
   *   A jQuery Selector to apply templated data to
   * @param {string} templateName
   *   Name of the dust template to render
   * @param {object|Promise} templateData
   *   Data to pass to dust template
   *   Or, promise of data to pass to dust template
   * @return {jQuery.Deferred}
   *   Promise resolved with the element has rendered with the element
   */
  $.dust = function (element, templateName, templateData) {
    if (templateData && typeof templateData.then === 'function') {
      var pipe = templateData.pipe || templateData.then; // compat jQuery <1.8
      return pipe($.proxy($.dust, $, element, templateName));
    }
    var deferred = new $.Deferred();
    dust.render(templateName, templateData, function (err, out) {
      if (err) {
        return deferred.reject(err.message);
      }
      else {
        deferred.resolve($(element).html(out));
      }
    });
    return deferred;
  };

  $.dust.compile = function () {
    $('script[type="text/dust-template"][id]').dust_compile();
  };

}(jQuery));;
(function(){function a(a){function c(a){a+="";var b=a.split(":"),c=~a.indexOf("-")?-1:1,d=Math.abs(+b[0]),e=parseInt(b[1],10)||0,f=parseInt(b[2],10)||0;return c*(60*d+e+f/60)}function d(a,b,d,e,f,g,h,i,j,l){this.name=a,this.startYear=+b,this.endYear=+d,this.month=+e,this.day=+f,this.dayRule=+g,this.time=c(h),this.timeRule=+i,this.offset=c(j),this.letters=l||"",this.date=k(this.date),this.weekdayAfter=k(this.weekdayAfter),this.lastWeekday=k(this.lastWeekday)}function e(a,b){this.rule=b,this.start=b.start(a)}function f(a,b){return a.isLast?-1:b.isLast?1:b.start-a.start}function g(a){this.name=a,this.rules=[],this.lastYearRule=k(this.lastYearRule)}function h(b,d,e,f,g,h){var i,j="string"==typeof g?g.split("_"):[9999];for(this.name=b,this.offset=c(d),this.ruleSet=e,this.letters=f,this.lastRule=k(this.lastRule),i=0;i<j.length;i++)j[i]=+j[i];this.until=a.utc(j).subtract("m",c(h))}function i(a,b){return a.until-b.until}function j(a){this.name=n(a),this.displayName=a,this.zones=[],this.zoneAndRule=k(this.zoneAndRule,function(a){return+a})}function k(a,b){var c={};return function(d){var e=b?b.apply(this,arguments):d;return e in c?c[e]:c[e]=a.apply(this,arguments)}}function l(a){var b,c,d;for(b in a)for(d=a[b],c=0;c<d.length;c++)m(b+"	"+d[c])}function m(a){if(y[a])return y[a];var b=a.split(/\s/),c=n(b[0]),e=new d(c,b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8],b[9],b[10]);return y[a]=e,r(c).add(e),e}function n(a){return(a||"").toLowerCase().replace(/\//g,"_")}function o(a){var b,c,d;for(b in a)for(d=a[b],c=0;c<d.length;c++)q(b+"	"+d[c])}function p(a){var b;for(b in a)C[n(b)]=n(a[b])}function q(a){if(A[a])return A[a];var b=a.split(/\s/),c=n(b[0]),d=new h(c,b[1],r(b[2]),b[3],b[4],b[5]);return A[a]=d,s(b[0]).add(d),d}function r(a){return a=n(a),z[a]||(z[a]=new g(a)),z[a]}function s(a){var b=n(a);return C[b]&&(b=C[b]),B[b]||(B[b]=new j(a)),B[b]}function t(a){a&&(a.zones&&o(a.zones),a.rules&&l(a.rules),a.links&&p(a.links))}function u(){var a,b=[];for(a in B)b.push(B[a]);return b}var v,w=a.fn.zoneName,x=a.fn.zoneAbbr,y={},z={},A={},B={},C={},D=1,E=2,F=7,G=8;return void 0!==a.tz?a:(d.prototype={contains:function(a){return a>=this.startYear&&a<=this.endYear},start:function(b){return b=Math.min(Math.max(b,this.startYear),this.endYear),a.utc([b,this.month,this.date(b),0,this.time])},date:function(a){return this.dayRule===F?this.day:this.dayRule===G?this.lastWeekday(a):this.weekdayAfter(a)},weekdayAfter:function(b){for(var c=this.day,d=a([b,this.month,1]).day(),e=this.dayRule+1-d;c>e;)e+=7;return e},lastWeekday:function(b){var c=this.day,d=c%7,e=a([b,this.month+1,1]).day(),f=a([b,this.month,1]).daysInMonth(),g=f+(d-(e-1))-7*~~(c/7);return d>=e&&(g-=7),g}},e.prototype={equals:function(a){return a&&a.rule===this.rule?Math.abs(a.start-this.start)<864e5:!1}},g.prototype={add:function(a){this.rules.push(a)},ruleYears:function(a,b){var c,d,g,h=a.year(),i=[];for(c=0;c<this.rules.length;c++)d=this.rules[c],d.contains(h)?i.push(new e(h,d)):d.contains(h+1)&&i.push(new e(h+1,d));return i.push(new e(h-1,this.lastYearRule(h-1))),b&&(g=new e(h-1,b.lastRule()),g.start=b.until.clone().utc(),g.isLast=b.ruleSet!==this,i.push(g)),i.sort(f),i},rule:function(a,b,c){var d,e,f,g,h,i=this.ruleYears(a,c),j=0;for(c&&(e=c.offset+c.lastRule().offset,f=9e4*Math.abs(e)),h=i.length-1;h>-1;h--)g=d,d=i[h],d.equals(g)||(c&&!d.isLast&&Math.abs(d.start-c.until)<=f&&(j+=e-b),d.rule.timeRule===E&&(j=b),d.rule.timeRule!==D&&d.start.add("m",-j),j=d.rule.offset+b);for(h=0;h<i.length;h++)if(d=i[h],a>=d.start&&!d.isLast)return d.rule;return v},lastYearRule:function(a){var b,c,d,e=v,f=-1e30;for(b=0;b<this.rules.length;b++)c=this.rules[b],a>=c.startYear&&(d=c.start(a),d>f&&(f=d,e=c));return e}},h.prototype={rule:function(a,b){return this.ruleSet.rule(a,this.offset,b)},lastRule:function(){return this.rule(this.until)},format:function(a){return this.letters.replace("%s",a.letters)}},j.prototype={zoneAndRule:function(a){var b,c,d;for(a=a.clone().utc(),b=0;b<this.zones.length&&(c=this.zones[b],!(a<c.until));b++)d=c;return[c,c.rule(a,d)]},add:function(a){this.zones.push(a),this.zones.sort(i)},format:function(a){var b=this.zoneAndRule(a);return b[0].format(b[1])},offset:function(a){var b=this.zoneAndRule(a);return-(b[0].offset+b[1].offset)}},a.updateOffset=function(a,b){var c;a._z&&(c=a._z.offset(a),Math.abs(c)<16&&(c/=60),a.zone(c,b))},a.fn.tz=function(b){return b?(this._z=s(b),this._z&&a.updateOffset(this),this):this._z?this._z.displayName:void 0},a.fn.zoneName=function(){return this._z?this._z.format(this):w.call(this)},a.fn.zoneAbbr=function(){return this._z?this._z.format(this):x.call(this)},a.momentProperties._z=null,a.tz=function(){var b,c=[],d=arguments.length-1;for(b=0;d>b;b++)c[b]=arguments[b];var e=a.apply(null,c),f=e.zone();return e.tz(arguments[d]),e.add("minutes",e.zone()-f)},a.tz.add=t,a.tz.addRule=m,a.tz.addZone=q,a.tz.zones=u,a.tz.version=b,a.tz.zoneExists=function(a){return s(a).zones.length>0},v=m("- 0 9999 0 0 0 0 0 0"),a)}var b="0.0.6";"function"==typeof define&&define.amd?define("moment-timezone",["moment"],a):"undefined"!=typeof module?module.exports=a(require("moment")):"undefined"!=typeof window&&window.moment&&a(window.moment)}).apply(this);;
moment.tz.add({
  "zones": {
    "America/Chicago": [
      "-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36",
      "-6 US C%sT 1920 -6",
      "-6 Chicago C%sT 1936_2_1_2 -6",
      "-5 - EST 1936_10_15_2 -5",
      "-6 Chicago C%sT 1942 -6",
      "-6 US C%sT 1946 -6",
      "-6 Chicago C%sT 1967 -6",
      "-6 US C%sT"
    ],
    "America/Denver": [
      "-6:59:56 - LMT 1883_10_18_12_0_4 -6:59:56",
      "-7 US M%sT 1920 -7",
      "-7 Denver M%sT 1942 -7",
      "-7 US M%sT 1946 -7",
      "-7 Denver M%sT 1967 -7",
      "-7 US M%sT"
    ],
    "America/Los_Angeles": [
      "-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58",
      "-8 US P%sT 1946 -8",
      "-8 CA P%sT 1967 -8",
      "-8 US P%sT"
    ],
    "America/New_York": [
      "-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2",
      "-5 US E%sT 1920 -5",
      "-5 NYC E%sT 1942 -5",
      "-5 US E%sT 1946 -5",
      "-5 NYC E%sT 1967 -5",
      "-5 US E%sT"
    ]
  },
  "rules": {
    "US": [
      "1918 1919 2 0 8 2 0 1 D",
      "1918 1919 9 0 8 2 0 0 S",
      "1942 1942 1 9 7 2 0 1 W",
      "1945 1945 7 14 7 23 1 1 P",
      "1945 1945 8 30 7 2 0 0 S",
      "1967 2006 9 0 8 2 0 0 S",
      "1967 1973 3 0 8 2 0 1 D",
      "1974 1974 0 6 7 2 0 1 D",
      "1975 1975 1 23 7 2 0 1 D",
      "1976 1986 3 0 8 2 0 1 D",
      "1987 2006 3 1 0 2 0 1 D",
      "2007 9999 2 8 0 2 0 1 D",
      "2007 9999 10 1 0 2 0 0 S"
    ],
    "Chicago": [
      "1920 1920 5 13 7 2 0 1 D",
      "1920 1921 9 0 8 2 0 0 S",
      "1921 1921 2 0 8 2 0 1 D",
      "1922 1966 3 0 8 2 0 1 D",
      "1922 1954 8 0 8 2 0 0 S",
      "1955 1966 9 0 8 2 0 0 S"
    ],
    "Denver": [
      "1920 1921 2 0 8 2 0 1 D",
      "1920 1920 9 0 8 2 0 0 S",
      "1921 1921 4 22 7 2 0 0 S",
      "1965 1966 3 0 8 2 0 1 D",
      "1965 1966 9 0 8 2 0 0 S"
    ],
    "CA": [
      "1948 1948 2 14 7 2 0 1 D",
      "1949 1949 0 1 7 2 0 0 S",
      "1950 1966 3 0 8 2 0 1 D",
      "1950 1961 8 0 8 2 0 0 S",
      "1962 1966 9 0 8 2 0 0 S"
    ],
    "NYC": [
      "1920 1920 2 0 8 2 0 1 D",
      "1920 1920 9 0 8 2 0 0 S",
      "1921 1966 3 0 8 2 0 1 D",
      "1921 1954 8 0 8 2 0 0 S",
      "1955 1966 9 0 8 2 0 0 S"
    ]
  },
  "links": {}
});;
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
;
/**
 * @file
 * Adobe Pass javascript API.
 */
;
(function($, window, Drupal) {

  /**
   * @doc module
   * @name tve
   * @description
   * TVE global namespace
   */
  var tve = (window.tve = window.tve || {});

  /**
   * @doc object
   * @name tve.adobePass
   */
  var instance = tve.adobePass || (tve.adobePass = {});

  /**
   * @doc property
   * @name tve.adobePass:exists
   * @type {boolean}
   * @description
   * Use this variable to define if the service is already created.
   */
  instance.exists = false;

  /**
   * @doc function
   * @name tve.adobePass:getInstance
   *
   * @description initiates Adobe Pass service with the provided configuration and returns the service instance.
   *              tve.adobePass is exposed as singleton. getInstance recall returns the previously instantiated instance.
   *
   * @param {Object=} config for new instance.
   * @returns {tve.adobePass.AdobePassConnector} Adobe Pass service instance.
   */
  instance.getInstance = $.proxy(function(config) {

    // tve.adobePass instance is singleton
    if (instance.exists) {
      return instance;
    }
    else {

      // Also extending the origin object(tve.adobePass).
      // So you can use the new reference returned by method or continue using tve.adobePass.
      $.extend(this, new AdobePassConnector(config));
      // Mark service as created.
      this.exists = true;

      // Returns newly created singleton.
      return this;
    }
  }, instance);

  /**
   * @doc function
   * @name tve.adobePass:AdobePassConnector
   * @constructor
   * @param {Object=} config configuration for Adobe Pass service instance.
   * @description
   * ##Default config which can be extended with your options:
   * * `accessEnablerId` - {@type string} Access Enabler swf object id
   * * `mvpdFrameId` - {@type string} MVPD login-iframe id
   * * `adobePassIframeContainerId` - {@type string} MVPD login-iframe container id.
   *                                                 Iframe will be appended to this wrapper.
   * * `authNCheckedSuccessCallback` - {@type function({
   *                                      isAuthenticated: {@type boolean},
   *                                      mvpdId: {@type string | null
   *                                   }})} callback will be fired after AccessEnabler getAuthentication check.
   *                                   It becomes user authentication status object with mvpdId and auth-status.
   * * `authNCheckedFailedCallback` - {@type function} will be fired in case of any error while AccessEnabler processes.
   *                                                   1. embed object creation failed
   *                                                   2. timeout expired before response
   *
   */
  function AdobePassConnector(config) {
    var NONE_URL = 'none',
      EXPIRED_DATE = -1,
      TRUE_FLAG = '1';

    var basePath = (Drupal && Drupal.settings.basePath) || '/',
      noop = function() {},

      /**
       * Analytics obj, uses tveAnalytics if module is enabled.
       * Implements the following interface {
       *   trackMvpdSelected: function({Object=}),
       *   trackPassSignIn: function({Object=}),
       *   trackAuthentication: function({Object=})
       * }
       */
      tveAnalytics = tve.analytics ? {
        trackMvpdSelected: tve.analytics.trackAuthEvents.bind(tve.analytics, tve.analytics.events.MVPD_SELECTED),
        trackPassSignIn: tve.analytics.trackAuthEvents.bind(tve.analytics, tve.analytics.events.PASS_SIGNIN),
        trackAuthentication: tve.analytics.trackAuthEvents.bind(tve.analytics, tve.analytics.events.AUTHN_TRACK)
      } : {
        trackMvpdSelected: noop,
        trackPassSignIn: noop,
        trackAuthentication: noop
      },

      // Default configuration, can be extended by user configuration.
      defaults = {
        accessEnablerId: 'accessEnabler',
        accessEnablerHost: 'http://entitlement.auth.adobe.com',
        accessEnablerConfig: {
          callSetConfig: true
        },
        mvpdWindowId: 'mvpdwindow',
        mvpdFrameId: 'mvpdframe',
        adobePassIframeContainerId: 'adobePassIframeContainer',
        // Adobe officailly reccomends sending IFRAME-based providers to POPUP.
        popupIframes: false,

        authNCheckedSuccessCallback: noop,
        authNCheckedFailedCallback: noop,
        openAdobePassFrame: noop,

        cookie: {
          path: basePath,
          user: 'nbcu_user_settings',
          loginPending: 'nbcu_ap_loginpending',
          adobePassUserGuid: 'instance_user_guid'
        },

        // Using tve.mvpdService with default configuration if it's not overriden.
        mvpdService: tve.mvpdService && tve.mvpdService.getInstance() || {

          // We are assuming getMvpd to return object which implements jQuery Promise API
          getMvpd: function() {
            return $.Deferred().promise();
          }
        },

        logger: {
          useWatchDog: true,
          url: basePath + 'adobe-pass/log',

          // Your custom logger callback.
          log: noop,
          messages: {
            INITIALIZATION_ERROR: Drupal.t('AccessEnabler Initialization Failed'),
            SWF_OBJECT_FAILURE: Drupal.t('swf object creation failed'),
            TIMEOUT: Drupal.t('Adobe Pass authn/authz process could not be completed due to some technical Issue'),
            NON_ENTITLED_MVPD: Drupal.t('User is authenticated with non-entitled MVPD')
          },
          errorLvl: {
            INFO: 'info',
            WARNING: 'warning',
            ERROR: 'error'
          }
        },

        analytics: tveAnalytics
      },

      // tve.adobePass events listener, for pub/sub functionality.
      pubSub = $({}),
      // key-value list of MVPDs and their associated metadata by Provider ID
      mvpds = {},
      selectedProvider, redirect, authzCallback, metadataStatusCallback = {}, mvpdWindow, aeCheckTimeoutId, accessEnabler;

    // Constructing tve.adobePass instance. Exposing API, embedding swf.
    init.call(this);

    function init() {
      var getUserStatus = function() {
          var userCookie;

          try {
            userCookie = JSON.parse($.cookie(config.cookie.user));
          }
          catch(e) {
            logError({
              errorId: e.name,
              message: e.message
            });
          }

          return userCookie;
        },
        userCookie;

      this.config = config = $.extend(defaults, Drupal.settings.adobePass, config);

      this.ACCESS_ENABLER_ID = config.accessEnablerId;
      this.events = {
        AUTHN_CHECKED: 'authChecked.adobePass'
      };

      // Safely parsing user cookie.
      userCookie = getUserStatus();

      // Exposing user authentication status as global properties. This data can be approved only after
      // getAuthentication in your authNCheckedSuccessCallback, but properties will be also updated by tve.adobePass.
      this.isAuthenticated = userCookie && userCookie.authn;
      this.currentProvider = userCookie && userCookie.selectedProvider;

      // Exposing public methods.
      publishApi(this);

      // Embedding AccessEnabled swg, adding handler.
      // Initialization entry point.
      loadAccessEnabler();
    }

    /**
     * Embeds AccessEnabler swf object into specific container.
     *
     * @param {Object} settings
     *    Configuration object exposed from adobe_pass.module.
     */
    function loadAccessEnabler() {
      var params = {
          menu: 'false',
          quality: 'low',
          AllowScriptAccess: 'always',
          swliveconnect: 'true',
          wmode: 'transparent',
          align: 'middle'
        },
        attributes = {
          id: config.accessEnablerId,
          name: config.accessEnablerId,
          style: "position: fixed; z-index: 9999; display: inline-block; " +
            "visibility: visible; left: 0px !important; top: 0px !important;"
        },
        ACCESS_ENABLER_CONTAINER_ID = 'contentAccessEnabler',
        container = document.createElement('div');
      container.id = ACCESS_ENABLER_CONTAINER_ID;
      
      // Avoids loading access enabler swf file if flash is disabled.
      if (!swfobject.hasFlashPlayerVersion(config.adobePassFlashVer)) {
        config.authNCheckedFailedCallback(false);
        return;
      }

      $(document.body).append(container);

      swfobject.embedSWF(
        // AccessEnabler.swf location.
        config.adobePassAccessEnablerLoc,
        // Container ID to embed AccessEnabled.swf.
        ACCESS_ENABLER_CONTAINER_ID,
        // Object size 1pxx1px.
        1, 1,
        // Minimum flash version.
        config.adobePassFlashVer,
        // XiSwfUrlStr.
        null,
        // Flash variables.
        null,
        // Parameters.
        params,
        // Object attributes.
        attributes,
        // Onload callback.
        accessLoadedCheck
      );
    }

    /**
     * Creates timeout for swf loaded event.
     *
     * Logs an error, if timeout expired before onload event.
     */
    function accessLoadedCheck(status) {

      // Checking for swf object successfull creation
      if (status.success) {

        // Setting timeout for AccessEnabler init process. Timeout is configured via admin. Default is 30seconds.
        aeCheckTimeoutId = setTimeout(function() {
          if (accessEnabler == null) {
            logError({
              message: config.logger.messages.INITIALIZATION_ERROR
            });
          }

          config.authNCheckedFailedCallback(config.logger.messages.TIMEOUT);
        }, config.adobePassTimeoutLength);
      }
      else {
        logError({
          message: config.logger.messages.SWF_OBJECT_FAILURE
        });
        config.authNCheckedFailedCallback(status);
      }
    }

    /**
     * Clears accessLoadedCheck timeout.
     */
    function stopAECheck() {
      if (aeCheckTimeoutId) {
        clearTimeout(aeCheckTimeoutId);
        aeCheckTimeoutId = null;
      }
    }

    /**
     * Initiates the check authentication process on load of the page.
     */
    function initiateCheckAuthProcess() {
      stopAECheck();
      accessEnabler = document.getElementById(config.accessEnablerId);

      // Logging error and exit if AccessEnabler is not found.
      if (accessEnabler == null) {
        logError({
          message: config.logger.messages.INITIALIZATION_ERROR
        });

        return;
      }

      // Enabler configuration.
      accessEnabler.setProviderDialogURL(NONE_URL);
      accessEnabler.setRequestor(config.adobePassRequestorId, null, config.accessEnablerConfig);
      accessEnabler.checkAuthentication();

      return this;
    }

    /**
     * Start the authentication flow if no valid authentication token
     * is found in the local shared object.
     */
    function getAuthentication(redirectUrl) {
      redirect = redirectUrl || document.URL || window.location.href;
      accessEnabler.getAuthentication(redirect);

      return this;
    }

    /**
     * Start the authorization flow.
     */
    function getAuthorization(resource, callback) {
      authzCallback = callback;
      accessEnabler.getAuthorization(resource);

      return this;
    }

    /**
     * Checks if the current user has authorization to view the asset.
     *
     * @param {string} resourceID
     * @param {function():} callback
     * @returns {?Object} chains tve.adobePass if called in it's context.
     */
    function checkAuthorization(resourceID, callback) {
      authzCallback = callback;
      accessEnabler.checkAuthorization(resourceID);

      return this;
    }

    /**
     * Performs authentication with the provided MVPD ID.
     * You can pass optional redirectUrl to perform redirect after login process.
     * @param {string } id the MVPD id to authenticate.
     * @param {string=} redirectUrl the optional redirect url to go to after login process.
     *
     * @return {?Object} chains tve.adobePass instance if called in this context.
     */
    function login(id, redirectUrl) {
      getAuthentication(redirectUrl);
      setSelectedProvider(id);

      return this;
    }

    /**
     * Clear all authentication and authorization for the client.
     */
    function logout() {
      _deleteCookie();
      accessEnabler.logout();

      return this;
    }

    /**
     * Set the ID of the selected provider.
     *
     * @param providerId A provider identifier.
     */
    function setSelectedProvider(providerId) {
      var args = {
        'authnStatus': 'Not Authenticated',
        'mvpd_id': providerId
      };

      aeCheckTimeoutId = setTimeout(function() {
        if (!mvpdWindow) {
          logError({
            message: config.logger.messages.TIMEOUT
          });
        }

        stopAECheck();
      }, config.adobePassTimeoutLength);

      config.analytics.trackMvpdSelected(args);
      $.cookie(config.cookie.loginPending, TRUE_FLAG, {
        expires: 1,
        path: config.cookie.path
      });
      selectedProvider = providerId;

      var mvpd = mvpds[selectedProvider];

      // Do not create any windows for refreshless and temp pass
      if (config.accessEnablerConfig.backgroundLogin && !mvpd.tempPass) {
        // Popup / Redirect Providers.
        if (!mvpd.iframe) {
          mvpdWindow = window.open(config.accessEnablerHost, config.mvpdWindowId);
        }
        // Iframe Providers.
        else {
          if (config.popupIframes) {
            var width = mvpd.width;
            var height = mvpd.height;
            // Center on screen
            var top = document.all ? window.screenTop : window.screenY + 100;
            var left = document.all ? window.screenLeft : window.screenX + window.innerWidth / 2 - width / 2;
            mvpdWindow = window.open(config.accessEnablerHost, config.mvpdFrameId, [
              "width=" + width,
              "height=" + height,
              "top=" + top,
              "left=" + left
            ].join(","));
          }
        }
      }
      accessEnabler.setSelectedProvider(selectedProvider);

      return this;
    }

    /**
     * Find the currently selected provider.
     * @return An object with two properties:
     * - MVPD: contains the currently selected provider ID, or null if no MVPD was selected;
     * - AE_State: contains the Access Enabler's current authentication status for the user,
     *             one of 'New User', 'User Not Authenticated' or 'User Authenticated')
     */
    function getSelectedProvider() {
      return accessEnabler.getSelectedProvider();
    }

    /**
     * Perform the post auth check actions.
     */
    function performPostAuthCheckActions(isAuthenticated) {
      var selected = getSelectedProvider();

      isAuthenticated = !!isAuthenticated;

      if (isAuthenticated) {
        // Adding a check to avoid user getting access to the site using shared token for non entitled mvpds.
        config.mvpdService.getMvpd(selected.MVPD)
          .then(function(mvpdConfig) {
            if (mvpdConfig) {
              setAuthCookies(isAuthenticated, selected.MVPD);
              runCallback();
            }
            else {
              trackNonEntitledMvpd();
            }
          }, function(error, status) {
            var errorMsg = status || config.logger.messages.NON_ENTITLED_MVPD;

            if (status) {
              runCallback();
            }
            else {
              trackNonEntitledMvpd();
            }

            logError({message: errorMsg});
          });
      }
      else {
        _deleteCookie();
        
        if (selected.MVPD != null) {
          accessEnabler.setSelectedProvider(null);
        }
        runCallback();
      }

      function runCallback(nonEntitledMvpd) {
        var status;

        instance.isAuthenticated = nonEntitledMvpd ? false : isAuthenticated,
        instance.currentProvider = nonEntitledMvpd ? null : selected.MVPD;

        status = {
          isAuthenticated: instance.isAuthenticated,
          mvpdId: instance.currentProvider
        };

        instance.publish(instance.events.AUTHN_CHECKED, status);
        config.authNCheckedSuccessCallback(status);
      }

      function trackNonEntitledMvpd() {
        logout();
        runCallback(true);
      }
    }

    function setAuthCookies(isAuthenticated, providerId) {
      _setCookie({
        authn: isAuthenticated,
        selectedProvider: providerId
      });
    }

    function cancelAuthentication() {
      var mvpdFrame = document.getElementById(config.mvpdFrameId);
      accessEnabler.setProviderDialogURL(NONE_URL);

      stopAECheck();

      if (accessEnabler.getSelectedProvider().MVPD != null) {
        accessEnabler.setSelectedProvider(null);
      }

      if (mvpdFrame) {
        mvpdFrame.src = 'about:blank';
      }
      mvpdWindow = null;
    }

    /**
     * Creates a iframe from mvpd login screen to load
     */
    function createIframe(width, height) {
      var selected = getSelectedProvider(),
        args = {
          'authnStatus' : 'Not Authenticated',
          'mvpd_id' : selected.MVPD
        };
      // This call needs to be triggered for new window/iframe workflow.
      config.analytics.trackPassSignIn(args);

      // if mvpd is opened in new window
      if (mvpdWindow) {
        mvpdWindow.resizeTo(width,height);
        return false;
      }

      stopAECheck();
      config.openAdobePassFrame();
      create();

      function create() {
        var container = document.getElementById(config.adobePassIframeContainerId),
          iframe = document.getElementById(config.mvpdFrameId);

        // Create the iframe to the specified width and height for the MVPD login page.
        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.id = iframe.name = config.mvpdFrameId;
          iframe.style.width = width + 'px';
          iframe.style.height = height + 'px';
        }

        container.appendChild(iframe);
        // Force the name into the DOM since it is still not refreshed, for IE.
        window.frames[config.mvpdFrameId].name = config.mvpdFrameId;
      }
    }

    /**
     * Destroy iframe opened for MVPD login.
     */
    function destroyIframe() {
      config.destroyIframe();
    }

    /**
     *  Reopens the mvpd login screen if the user has kept the login screen open
     */
    function reopenMVPDWindow() {
      if (mvpdWindow && !mvpdWindow.closed) {
        mvpdWindow.focus();
        return true;
      }
      else{
        return false;
      }
    }

    /**
     * Returns the adobe pass GUID.
     */
    function getUserGuid() {
      return $.cookie(config.cookie.adobePassUserGuid);
    }

    /**
     * Send Tracking Data function implementation
     * @public
     */
    function sendAuthnEvents(trackingEventType, trackingData) {
      var AUTH_DETECTION_EVENT = 'authenticationDetection';

      // Getting the selected mvpd id from tracking data since after authn success page gets reloaded.
      if (trackingData[0] && trackingEventType === AUTH_DETECTION_EVENT) {
        selectedProvider = trackingData[1];
      }
      var args = {'authnStatus' : trackingData[0] ? 'Authenticated' : 'Not Authenticated', 'mvpd_id' : selectedProvider };
      $.cookie(config.cookie.adobePassUserGuid, trackingData[2], { path: config.cookie.path });

      if (trackingEventType === AUTH_DETECTION_EVENT && $.cookie(config.cookie.loginPending) != null) {
        config.analytics.trackAuthentication(args);
        $.cookie(config.cookie.loginPending, '', { expires: EXPIRED_DATE, path: config.cookie.path });
      }
    }

    /**
     * Logs the error message into drupalis watch dog
     */
    function logError(error) {
      var loggerConfig = config.logger;

      error.level = error.level || loggerConfig.errorLvl.ERROR;

      if (error.level == 'info') {
        return false;
      }

      if (loggerConfig.useWatchDog) {
        $.ajax({
          type: 'POST',
          url: loggerConfig.url,
          dataType: 'json',
          data: {
            error: error
          }
        });
      }

      if (typeof loggerConfig.log === 'function') {
        loggerConfig.log(error);
      }

      return error;
    }

    /**
     * Sets adobe cookies.
     *
     * @param input parameters
     */
    function _setCookie(input) {
      $.cookie(config.cookie.user, JSON.stringify(input), {
        path: config.cookie.path
      });
    }

    /**
     * Deletes adobe auth cookies.
     */
    function _deleteCookie() {
      $.cookie(config.cookie.user, '', {
        expires: EXPIRED_DATE,
        path: config.cookie.path
      });
    }

    /**
     * Process the recieved metadata from adobe.
     */
    function processUserMetadata(key, encrypted, data) {
      var callbackFunction = (typeof metadataStatusCallback[key] == 'function')
        ? metadataStatusCallback[key]
        : eval(metadataStatusCallback[key]);

      callbackFunction(key, encrypted, data);
    }

    /**
     * Process the recieved config from adobe.
     */
    function processConfigXML(configXML) {
      $.each($($.parseXML(configXML)).find('mvpd'), function (idx, item) {
        var mid = $('id', item).text();
        mvpds[mid] = {
          name: $('displayName', item).text(),
          logo: $('logoUrl', item).text(),
          iframe: $('iFrameRequired', item).text() == "true",
          width: $('iFrameWidth', item).text(),
          height: $('iFrameHeight', item).text(),
          tempPass: $('tempPass', item).text() == 'true'
        };
      });
    }

    /**
     * Gets user metadata from adobe.
     */
    function getUserMetadata(key, callback) {
      metadataStatusCallback[key] = callback;
      accessEnabler.getMetadata(key);
    }

    /**
     * implementation for authz success.
     */
    function setToken(requestedResourceID, token) {
      var callbackFunction = (typeof authzCallback == 'function') ? authzCallback : eval(authzCallback);
      callbackFunction(true, {requestedResourceID: requestedResourceID, token: token});
    }

    /**
     * implementation for authz failure.
     */
    function tokenRequestFailed(requestedResourceID, requestErrorCode, requestErrorDetails) {
      var callbackFunction = (typeof authzCallback == 'function') ? authzCallback : eval(authzCallback);

      callbackFunction(false, {
        requestedResourceID: requestedResourceID,
        requestErrorCode: requestErrorCode,
        requestErrorDetails: requestErrorDetails
      });
    }

    /**
     * Publish/subscribe implementation for tve.adobePass obj
     * @returns {tve.adobePass.subscribe}
     */
    function subscribe() {
      pubSub.on.apply(pubSub, arguments);
      return this;
    }

    function unsubscribe() {
      pubSub.off.apply(pubSub, arguments);
      return this;
    }

    function publish() {
      pubSub.trigger.apply(pubSub, arguments);
      return this;
    }

    function publishApi(instance) {
      $.extend(instance, {
        'initiateCheckAuthProcess': initiateCheckAuthProcess,
        'stopAECheck': stopAECheck,
        'createIframe': createIframe,
        'destroyIframe' : destroyIframe,
        'performPostAuthCheckActions': performPostAuthCheckActions,
        'getAuthentication': getAuthentication,
        'login': login,
        'logout': logout,
        'setSelectedProvider': setSelectedProvider,
        'cancelAuthentication': cancelAuthentication,
        'sendAuthnEvents': sendAuthnEvents,
        'reopenMVPDWindow': reopenMVPDWindow,
        'getUserGuid': getUserGuid,
        'getUserMetadata': getUserMetadata,
        'processUserMetadata': processUserMetadata,
        'processConfigXML': processConfigXML,
        'setToken': setToken,
        'tokenRequestFailed': tokenRequestFailed,
        'getAuthorization': getAuthorization,
        'checkAuthorization': checkAuthorization,
        'logError': logError,
        'subscribe': subscribe,
        'unsubscribe': unsubscribe,
        'publish': publish
      });
    }
  }

  /**
   * Global Callbacks
   */

  /**
   * Called when the Access Enabler is successfully loaded and initialized.
   * This is the entry point for your communication with the AE.
   */
  window.swfLoaded = function() {
    accessEnabler.bind('errorEvent', 'tveAdobePassLogError');
    tve.adobePass.initiateCheckAuthProcess();
  };

  /**
   * Callback that receives the list of available providers for the current requestor ID.
   */
  window.displayProviderDialog = function(providers) {
    tve.adobePass.stopAECheck();
  };

  /**
   * Callback that creates an iFrame to use for login if the MVPD requires it.
   */
  window.createIFrame = function(width, height) {
    tve.adobePass.createIframe(width, height);
  };

  /**
   * accessEnabler `errorEvent` handler
   * @returns {*}
   */
  window.tveAdobePassLogError = function() {
    return tve.adobePass.logError.apply(null, arguments);
  };

  /**
   * Callback that destroys an MVPD's iFrame.
   */
  window.destroyIFrame = function() {
    tve.adobePass.destroyIframe();
  };

  /**
   * Callback that receives the result of a successful authorization token request.
   * Your implementation sets the authorization token.
   */
  window.setToken = function(requestedResourceID, token) {
    tve.adobePass.setToken(requestedResourceID, token);
  };

  /**
   * Callback that indicates a failed authorization token request.
   * @param requestedResourceID The resource ID for which the token request failed.
   * @param requestErrorCode  The error code for the failure.
   * @param requestErrorDetails The custom error message that describes the failure.
   */
  window.tokenRequestFailed = function(requestedResourceID, requestErrorCode, requestErrorDetails) {
    tve.adobePass.tokenRequestFailed(requestedResourceID, requestErrorCode, requestErrorDetails);
  };

  /** Callback that customizes the size of the provided selector dialog. **/
  window.setMovieDimensions = function(width, height) {
    //TODO: Set the dimension for the provider selector.
  };

  /**
   * Callback that indicates the authentication status for the user.
   *  @param isAuthenticated Authentication status is one of 1 (Authenticated) or 0 (Not authenticated).
   *  @param errorCode Any error that occurred when determining the authentication status,
   *                   or an empty string if no error occurred.
   */
  window.setAuthenticationStatus = function(isAuthenticated, errorCode) {
    tve.adobePass.performPostAuthCheckActions(isAuthenticated, errorCode);
  };

  /**
   * Callback that sends a tracking data event and associated data
   *  @param trackingEventType The type of event that triggered this tracking event
   *  @param trackingData An array of all the tracking data/variables associated with the tracking event
   *
   * There are three possible tracking events types:
   *    authorizationDetection    - any time an authorization token request returns
   *    authenticationDetection    - any time an authentication check occurs
   *    mvpdSelection                - when the user selects an mvpd in the mvpd selection dialog
   * trackingData values:
   * For trackingEventType 'authorizationDetection'
   *     [0] Whether the token request was successful [true/false]
   *       and if true:
   *       [1] MVPD ID [string]
   *       [2] User ID (md5 hashed) [string]
   *       [3] Whether it was cached or not [true/false]
   *
   * For trackingEventType 'authenticationDetection'
   *     [0] Whether the token request was successful (false)
   *       and if successful is true:
   *       [1] MVPD ID
   *       [2] User ID (md5 hashed)
   *       [3] Whether it was cached or not (true/false)
   *
   * For trackingEventType 'mvpdSelection'
   *       [0] MVPD ID
   *
   * MVPD Example: MVPD ID for Comcast is 'Comcast'
   */
  window.sendTrackingData = function(trackingEventType, trackingData) {
    tve.adobePass.sendAuthnEvents(trackingEventType,trackingData);
  };

  /**
   * Called when a get-metadata request has completed successfully.
   * Passes back property key for the requested value, an array containing the resource ID for an AuthZ
   * token TTL (or null for any other key), and the property value retrieved from Access Enabler.
   *
   * @param key the Metadata key for which a value has been requested
   * @param encrypted true if value is encrypted
   * @param value the values associated with the Metadata key or null if no value is associated with the key.
   */
  window.setMetadataStatus = function(key, encrypted, value) {
    tve.adobePass.processUserMetadata(key, encrypted, value);
  };

  /**
   * Called when a accessEnabler is initialized with callSetConfig on.
   * Passes back list of MVPDs with helpful associated metadata.
   *
   * @param string configXML configuration data as an XML string.
   */
  window.setConfig = function (configXML) {
    tve.adobePass.processConfigXML(configXML);
  };

})(jQuery, this, this.Drupal);
;
;
(function($, window) {
  'use strict';

  var getTimestamp = function() {
    return Date.now ? Date.now() : Number(new Date);
  };

  function getFeature (name) {
    try {
      if (window[name] !== null) {
        return window[name];
      }
    }
    catch (e) {}
    return null;
  }

  // LocalStorage wrapper to provide MVPD data cache.
  var appCache = {
    storage: getFeature('localStorage') || getFeature('sessionStorage'),
    get: function(key) {
      var data;

      try {
        data = JSON.parse(this.storage.getItem(key));
      }
      catch(e) {}

      return data;
    },
    set: function(key, value) {
      try {
        this.storage.setItem(key, JSON.stringify(value));
      }
      catch(e) {}

      return this;
    },
    remove: function(key) {
      var value;

      try {
        value = JSON.parse(this.storage.getItem(key));
        this.storage.removeItem(key);
        return value;
      }
      catch(e) {}

      return value;
    }
  };

  // Safe initialization for global tve.mvpdService namespace
  var tve = (window.tve = window.tve || {}),
    instance = tve.mvpdService || (tve.mvpdService = {exists: false});

  instance.getInstance = $.proxy(function(config) {
    if (instance.exists) {
      return instance;
    }
    else {
      $.extend(this, new MvpdService(config));
      this.exists = true;

      return this;
    }
  }, instance);

  function MvpdService(config) {
    var DEFAULT_PLATFORM_KEY = 'pc',
      mvpdSet = {};

    // creating a closure to store memorized search results
    var getProviderById = (function() {
      var savedProviders = {};

      /**
       * @doc function
       * @description returns provider found by id
       *
       * @param {string} id of the provider
       * @param {string} platformId is a platform id to look for in cache default is `pc`
       *
       * @returns  {Object|null}
       */
      return function getProviderById(id, platformId) {
        var result, platformKey, platformFromMemory, context;

        if (!id) {
          return null;
        }

        result = null;
        platformKey = getPlatformKey(platformId);
        platformFromMemory = savedProviders[platformKey] = savedProviders[platformKey] || {};

        // Returns provider from memory.
        if (result = platformFromMemory[id]) {
          return result;
        }

        context = mvpdSet[platformKey] && mvpdSet[platformKey].all;

        if (!context || !context.length) {
          return null;
        }

        $.each(context, function(index, provider) {

          // mvpd_id is a unique field.
          if (provider.mvpd_id === id) {

            // semorizing found provider
            platformFromMemory[id] = result = provider;
            // stop looping
            return false;
          }
        });

        return result;
      };
    })();

    this.config = config = $.extend({

      path: getBasePath() + 'mvpd',
      // 10 minutes cache valid timeout (in milliseconds).
      cacheTimeout: 600000,
      logError: function() {}

    }, config);

    this.getMvpd = (function() {
      var requestStack = {};

      function loadFromCache(platformConfig) {
        var platformKey = getPlatformKey(platformConfig && platformConfig.platformId),
          platformProviders = mvpdSet[platformKey] = appCache.get(platformKey);

        if (platformProviders && !isCacheValid(platformProviders.timestamp)) {
          appCache.remove(platformKey);
          mvpdSet[platformKey] = null;
        }
      }

      function getMvpd(id, platformConfig) {
        var getFirstIfIdProvided = getSecondIfTrue(id),
          dataKey = getFirstIfIdProvided('all', id),
          pendingRequest = requestStack[dataKey],
          fetchFromMvpdServiceDirectly = Boolean(platformConfig),
          platformMvpdUrl, platformId, providerInfo, platformKey;

        if (fetchFromMvpdServiceDirectly) {
          platformMvpdUrl = platformConfig.url;
          platformId = platformConfig.platformId;
        }
        else {
          platformMvpdUrl = config.path;
        }

        platformKey = getPlatformKey(platformId);
        providerInfo = getFirstIfIdProvided(mvpdSet[platformKey], getFuncWrap(getProviderById, [id, platformId]));

        if (getFirstIfIdProvided(providerInfo && providerInfo.fullList, providerInfo)) {
          return $.when(providerInfo);
        }
        else if (pendingRequest) {
          return pendingRequest;
        }
        else {
          var deferred = $.Deferred(),
            url = platformMvpdUrl + getFirstIfIdProvided('', '/' + id);

          $.get(url).then(function(data) {
              var mvpdData;

              if ('status' in data && !data.status) {
                deferred.reject(data);
              }
              else {
                mvpdData = getFirstIfIdProvided(getFuncWrap(processProviders, [data, platformId]), data.mvpd);
                deferred.resolve(mvpdData);

                if (id) {
                  mvpdSet[platformKey] = mvpdSet[platformKey] || {
                    all: [],
                    fullList: false,
                    timestamp: getTimestamp()
                  };

                  mvpdSet[platformKey].all.push(mvpdData);
                  appCache.set(platformKey, mvpdSet[platformKey]);
                }
                else {
                  mvpdData.timestamp = getTimestamp();
                  mvpdData.fullList = true;
                  appCache.set(platformKey, mvpdData);
                }
              }
            }, function(response) {
              config.logError.apply(config, arguments);
              deferred.reject.apply(deferred, arguments);
            })
            .always(function() {
              delete requestStack[dataKey];
            });

          return requestStack[dataKey] = deferred.promise();
        }
      }

      return function(id, platformConfig) {
        loadFromCache(platformConfig);
        return getMvpd.call(this, id, platformConfig);
      };
    })();

    this.addPlatform = function(config) {
      var self = this;

      this.platforms = this.platforms || {};

      return this.platforms[config.platformId] = this.platforms[config.platformId] || {
        url: config.url,
        getMvpd: function(id) {
          return self.getMvpd(id, config);
        }
      };
    };

    function isFunction(value) {
      return typeof value == 'function';
    }

    function existy(value) {
      return value != null;
    }

    function getFuncWrap(func, args) {
      if (!isFunction(func)) {
        throw new TypeError;
      }

      return function() {
        return func.apply(this, args);
      };
    }

    function getPlatformKey(suffix) {
      var MVPD_LIST_KEY = 'tveMvpdList';

      return [MVPD_LIST_KEY, '.', suffix || DEFAULT_PLATFORM_KEY].join('');
    }

    function getSecondIfTrue(value) {
      return function(options) {
        var result = (arguments.length > 1 ? arguments : options)[Number(existy(value))];
        return isFunction(result) ? result() : result;
      };
    }

    /**
     * @doc function
     * @description Returns base path. Safely parses Drupal.settings or use root '/' path
     * @returns {string}
     */
    function getBasePath() {
      var drupalSettings = (Drupal && Drupal.settings) || {};

      return drupalSettings.basePath || '/';
    }

    /**
     * @doc function
     * @description Compares current timestamp with provided cache timestamp.
     *              Returns true if diff between timestamps is lower than configured timeout
     *
     * @param {number} timestamp cache timestamp
     *
     * @returns {boolean}
     */
    function isCacheValid(timestamp) {
      return getTimestamp() - timestamp < config.cacheTimeout;
    }

    function processProviders(providers, converterId) {
      var push = Array.prototype.push,
        concat = Array.prototype.concat,
        coverters = {
          'false': function(providers) {
            var processedProviders = [];
            // Flatten featured and non-featured arrays with apply with apply.
            push.apply(processedProviders, concat.apply([], [providers.featured, providers.not_featured]));

            // Sorting providers list by titles to display alphabetically sorted in dropdown of all providers.
            // Using Array.prototype.sort.
            processedProviders.sort(alphabeticalSort);

            return {
              all: processedProviders,
              featured: providers.featured
            };
          },
          'true': function(providers) {
            var processedProviders = [],
              featuredProviders = [],
              mappingRules = {
                mvpd: 'mvpd_id',
                title: 'title',
                is_new_window: 'isNewWindow',
                pickerImage: 'mvpd_logo',
                pickerImage_2x: 'mvpd_logo_2x'
              },
              isMvpdFeatured = function(mvpd) {
                // not featured tier is 2
                var FEATURED_MVPD_TIER_VALUE = 1;

                return mvpd.tier === FEATURED_MVPD_TIER_VALUE;
              },
              isFeatured, current;

            providers = providers.mvpdWhitelist;

            for (var i = 0, length = providers.length; i < length; i++) {
              current = providers[i];
              isFeatured = isMvpdFeatured(current);

              current = processObjectFields(current, mappingRules);

              processedProviders.push(current);
              if (isFeatured) {
                featuredProviders.push(current);
              }
            }

            // Sorting providers list by titles to display alphabetically sorted in dropdown of all providers.
            // Using Array.prototype.sort.
            processedProviders.sort(alphabeticalSort);

            return {
              all: processedProviders,
              featured: featuredProviders
            };
          }
        };

      if (!providers) return;

      /**
       * @doc function
       * @description Comparator for Array.sort which sorts object by `title` key
       *              `title` is lowercased before comparison
       *
       * @param {Object} a is the first object in comparison
       * @param {Object} b is the second object in comparison
       *
       * @returns {number}
       */
      function alphabeticalSort(a, b) {
        var aTitleNormalized = a.title.toLowerCase(),
          bTitleNormalized = b.title.toLowerCase();

        if (aTitleNormalized > bTitleNormalized) {
          return 1;
        }
        else if (aTitleNormalized < bTitleNormalized) {
          return -1;
        }
        else {
          return 0;
        }
      }

      /**
       * @doc function
       * @description Processes the object and formates the output
       *
       * @param {Object} obj initial object to be mapped
       * @param {Object} mappingRules mapping rules with the following style {key: value}
       *                 key is the new object key for the value field in the obj
       *
       * @throws {TypeError} if obj is null or undefined
       * @returns {Object}
       */
      function processObjectFields(obj, mappingRules) {
        var mappedResult = {};

        if (!existy(obj)) {
          throw new TypeError;
        }
        for (var key in obj) {
          if (mappingRules.hasOwnProperty(key)) {
            mappedResult[mappingRules[key]] = obj[key];
          }
          else {
            mappedResult[key] = obj[key];
          }
        }

        return mappedResult;
      }

      // Returns object with limited featured mvpd-list and full list of entitled mvpds.
      return providers ? coverters[existy(converterId)](providers) : undefined;
    }
  }

})(jQuery, this);
;
!function(a,b,c,d){function e(a){var b,c={};for(c.all=[],b=0;b<a.all.length;b++)c.all[b]=f(a.all[b]);for(c.featured=[],b=0;b<a.featured.length;b++)c.featured[b]=f(a.featured[b]);return c}function f(a){var b={id:a.mvpd_id,k2_id:a.mvpd_k2_id,name:a.title,link:a.mvpd_url,authorized_err:a.authorized_err};return b.link&&!b.link.match("http")&&(b.link="http://"+b.link),b.images={small:{src:a.mvpd_logo},header:{src:a.mvpd_color}},b}var g={};g.mvpdService=null,g.getService=function(){return g.mvpdService||(g.mvpdService=c.mvpdService.getInstance())},g.getList=function(){return g.getService().getMvpd().pipe(e).promise()},g.getProvider=function(a){return g.getService().getMvpd(a).pipe(f).promise()},d.MVPD=g}(jQuery,Drupal,tve,this);;
!function(a,b,c,d,e){function f(a,b){var c=document.createElement("a");return c.href=a,c.search=c.search?c.search.split("?")[1]+"&"+b:"?"+b,c.href}var g={},h=window.console&&window.console.log?window.console:{log:a.noop},i=a.cookie("tve_debug"),j="MVPDAuth::AUTHN_SUCCESS",k="MVPDAuth::AUTHN_FAILURE",l="MVPDAuth::OPEN_MVPD_IFRAME",m="MVPDAuth::CLOSE_MVPD_IFRAME",n="MVPDAuth::LOGOUT_ACTION",o="MVPDAuth::HEADER_CLICK",p=2e3;g.USER_NOT_AUTHORIZED_ERROR="User not Authorized Error",g.isAttemptingLogin=!1,g.adobePass=null,g.wasLoggedIn="true"===a.cookie("adobepass-logged-in"),g.authStatus=null,g.provider=null,g.authenticate=function(){i&&h.log("MVPDAuth.authenticate"),g.isBlocked=a(".nbc-homepage").length&&!a("#nbc-tve-app").length,g.isBlocked||(a("body").toggleClass("adobepass-logged-in",g.wasLoggedIn),g.isAnvatoMode()||(i&&h.log("MVPDAuth instantiate AdobePass"),g.adobePass=tve.adobePass.getInstance({mvpdService:d.getService(),accessEnablerConfig:{backgroundLogin:!0,backgroundLogout:!0},adobePassIframeContainerId:"nbc-mvpd-iframe-container",authNCheckedSuccessCallback:g.authNCheckedSuccessCallback,authNCheckedFailedCallback:g.authNCheckedFailedCallback,openAdobePassFrame:a.proxy(c,"emit",l),destroyIframe:a.proxy(c,"emit",m)})))},g.isAnvatoMode=function(){return!(!window.anvp&&!window.NBCTVE)},g.getUserAgentError=function(a){var c=g.getDevice(),d=b.settings.nbc_mvpd_auth.errors[a];return c.isOldIE?{message:d.old_ie}:c.isiOS?{hasApp:!0,className:"player-error--hide-peacock",message:d.ios,message_cta:d.ios_cta,message_download:d.ios_download,message_cta_link:d.ios_url,app_link_ios:d.ios_url,app_link_android:d.android_url}:c.isAndroid?{hasApp:!0,className:"player-error--hide-peacock",message:d.android,message_cta:d.android_cta,message_download:d.android_download,message_cta_link:d.android_url,app_link_ios:d.ios_url,app_link_android:d.android_url}:c.isUnsupportedMobile?{message:d.mobile}:g.isFlashPluginEnabled()?void 0:{className:"player-error--hide-peacock player-error--translucent-background player-error--flash",link:d.no_flash_url,message:d.no_flash}},g.getUserMetadata=function(b){if(a.isArray(b))return a.when.apply(a,a.map(b,a.proxy(this.getUserMetadata,this)));var c=a.Deferred();return this.adobePass.getUserMetadata(b,function(a,b,d){c.resolve(d)}),c.promise()},g.isFlashPluginEnabled=function(){try{return!!new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(a){return void 0!==navigator.mimeTypes["application/x-shockwave-flash"]}},g.getDevice=function(){var a=navigator.userAgent,b={};return b.isOldIE=a.match(/MSIE\s[678]/),b.isKindle=a.match(/Kindle|Silk/i),b.isAndroid=a.match(/Android/i)&&!b.isKindle,b.isiOS=a.match(/iPhone|iPad|iPod/i),b.isUnsupportedMobile=(a.match(/mobile|opera m/i)||b.isKindle)&&!b.isiOS&&!b.isAndroid,b},g.anvp=function(a){var c=window.anvp[b.settings.nbctve.app.player.id],d=Array.prototype.slice.call(arguments,1);return c[a].apply(c,d)},g.authorize=function(b){function c(a,c){a===b&&e.resolve({requestedResourceID:a,token:c}),"function"==typeof f&&f(a,c)}function d(a,c,d){a===b&&e.reject({requestedResourceID:a,requestErrorCode:c,requestErrorDetails:d}),"function"==typeof g&&g(a,c,d)}var e=a.Deferred(),f=window.setToken,g=window.tokenRequestFailed;return window.setToken=c,window.tokenRequestFailed=d,accessEnabler.checkAuthorization(b),e},g.authNCheckedSuccessCallback=function(b){i&&h.log("MVPDAuth.authNCheckedSuccessCallback",b);var d=!(!b.isAuthenticated||!b.mvpdId);g.authStatus=b,c.emit(d?j:k,b,g.wasLoggedIn),g.wasLoggedIn=d,a.cookie("adobepass-logged-in",g.wasLoggedIn,{expires:1,path:"/"})},g.authNCheckedFailedCallback=function(a){i&&h.log("MVPDAuth.authNCheckedFailedCallback",a),g.authStatus={isAuthenticated:!1,mvpdId:null},c.emit(k,a,g.wasLoggedIn)},g.setHeaderProvider=function(b){i&&h.log("MVPDAuth.setHeaderProvider",b);var e=a("#mvpd-header-container"),g=a.Deferred();return e.length&&e.data("mvpdId")===b?g.reject("Already logged in"):(e.length&&e.remove(),b&&"PASSIVE"!==b?(d.getProvider(b).done(function(d){d.link=f(d.link,"ref=header"),e=a("<div>",{id:"mvpd-header-container"}),e.data("mvpdId",b).dust("mvpd-header",d).done(g.resolve).prependTo(".header-search").on("click","#nav-mvpd-logo",a.proxy(e,"toggleClass","open",null)).on("click","#mvpd-logout",a.proxy(c,"emit",n)).on("click","#mvpd-link",a.proxy(c,"emit",o))}),g):g.reject("Not logged in"))},c.on("provider-selected",function(a){g.isAttemptingLogin=!0,g.isAnvatoMode()?g.anvp("setSelectedProvider",a):g.adobePass.login(a)}),c.on("cancel-login",function(){g.isAttemptingLogin=!1,g.isAnvatoMode()||g.adobePass.cancelAuthentication()}),c.on(j,function(b){i&&h.log(j,b),a("body").addClass("adobepass-logged-in"),g.setHeaderProvider(b.mvpdId).done(function(a){a.fadeIn(p)}),d.getProvider(b.mvpdId).done(function(a){g.provider=a})}),c.on(k,function(b){i&&h.log(k,b),a("body").removeClass("adobepass-logged-in"),g.setHeaderProvider(null)}),c.on(n,function(){accessEnabler.logout()}),a(g.authenticate),e.MVPDAuth=g}(jQuery,Drupal,Events,MVPD,this);;
// nbc_mvpd_auth/templates/dust/mvpd-header.dust
(function(){dust.register("mvpd-header",body_0);function body_0(chk,ctx){return chk.w("  <div class=\"mvpd-header-content\"><div id=\"nav-mvpd-logo\"><img src=\"").f(ctx.getPath(false, ["images","header","src"]),ctx,"h").w("\" /></div>").x(ctx.get(["link"], false),ctx,{"block":body_1},{}).w("<div id=\"mvpd-logout\">Logout</div></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<a id=\"mvpd-link\" target=\"_blank\" href=\"").f(ctx.get(["link"], false),ctx,"h").w("\">Visit Site</a>");}body_1.__dustBody=!0;return body_0;})();;
!function(a,b,c,d){function e(b,e){this.$el=a(b),this.$el.data("nbc_mvpd_auth_dialogs",this),this.settings=e,this.$current=null,this.$main=a("<div />",{"class":"mvpd-dialog",html:'<div class="inner"/>'}),this.$main.inner=this.$main.find(".inner"),this.$main.child=null,this.$help=a("<div />",{"class":"mvpd-help",html:'<div class="modal-close"><button/></div><div class="inner"/>'}),this.$help.inner=this.$help.find(".inner"),this.$help.child=null,this.settings.headline=a(".video-player").length?this.settings.strings.headline_vod:this.settings.strings.headline_live;var f={};a.each({mvpd_dialog_provider_short:"$main",mvpd_dialog_provider_full:"$main",mvpd_dialog_login:"$main",mvpd_retrieve_provider:"$help",mvpd_retrieve_option:"$help",mvpd_retrieve_signin:"$help"},function(b,c){f[b]=a("<div />",{id:b,"class":"mvpd-dialog-page","data-parent":c,"data-dust-template":b})}),this.$pages=f,d.getList().pipe(a.proxy(this,"render")),this.$main.on("click","a",a.proxy(this,"setPageEvent")),this.$main.on("click","#mvpd_dialog_login .mvpd-cta-back",a.proxy(c,"emit","cancel-login")),this.$help.on("click","a,button[data-link]",a.proxy(this,"setPageEvent")),this.$help.on("change","input[name=help-option]",a.proxy(this,"showHelpSubmit")),this.$help.on("click",".modal-close",a.proxy(this,"closeHelp"))}var f=400,g=b.behaviors.nbc_mvpd_auth={dialogs:[],attach:function(c){a(".nbc_mvpd_auth_dialogs",c).once("nbc_mvpd_auth_dialogs",function(){g.dialogs.push(new e(this,b.settings.nbc_mvpd_auth))})},callMethod:function(a){for(var b=Array.prototype.slice.call(arguments,1),c=0;c<this.dialogs.length;c++)this.dialogs[c][a].apply(this.dialogs[c],b)}};c.on("MVPDAuth::OPEN_MVPD_IFRAME",a.proxy(g,"callMethod","setPage","mvpd_dialog_login")),c.on("MVPDAuth::CLOSE_MVPD_IFRAME",a.proxy(g,"callMethod","stop")),e.prototype.render=function(b){var c=[];this.$el.append(this.$main).append(this.$help),this.settings.providers=b,this.settings.blanks=[],b.featured.length>this.settings.featured_providers&&(b.featured.length=this.settings.featured_providers);for(var d=b.featured.length;d<this.settings.featured_providers;d++)this.settings.blanks.push({});for(var e in this.$pages)c.push(this.$pages[e].dust(this.settings));return a.when.apply(a,c)},e.prototype.setPageEvent=function(b){var d=a(b.currentTarget).data()||{};d.link?(b.preventDefault(),this.setPage(d.link)):d.loginMvpd&&(b.preventDefault(),c.emit("provider-selected",d.loginMvpd))},e.prototype.start=function(){this.setPage("mvpd_dialog_provider_short")},e.prototype.stop=function(){this.$current&&(this.hideParent(this.$current),this.$current=null)},e.prototype.setPage=function(b){if(this.$pages[b]){var c=this.$pages[b],d=this[c.data("parent")],e=d.child;(c!==e||d!==this.$current)&&(e?(c.appendTo(d.inner),e.removeClass("reveal"),setTimeout(a.proxy(e,"remove"),f),setTimeout(a.proxy(c,"addClass","reveal"),f/2)):(c.appendTo(d.inner),c.addClass("reveal")),this.setParent(d),d.child=c)}},e.prototype.setParent=function(a){a!==this.$current&&(this.$current&&a!==this.$help&&this.hideParent(this.$current),this.showParent(a),this.$current=a)},e.prototype.showParent=function(b){b&&!b.visible&&(b.show(),setTimeout(a.proxy(b,"addClass","reveal"),0),b.visible=!0)},e.prototype.hideParent=function(b){parent&&b.visible&&(b.hide(),setTimeout(a.proxy(b,"removeClass","reveal"),0),b.child&&(setTimeout(a.proxy(b.child,"remove"),f),b.child=null),b.visible=!1)},e.prototype.showHelpSubmit=function(){this.$help.inner.find(".retreive_provider__button").addClass("reveal")},e.prototype.closeHelp=function(){this.setParent(this.$main)},e.prototype.showPopupLoginMessage=function(b,c){a('<div id="popup-container"/>').dust("popup-login-success",c||{message:"You've successfully logged in."}).done(function(c){c.prependTo(b),a(".popup-content",c).delayed("addClass","hide",3e3)}).delayed("remove",5e3)};for(var h in e.prototype)g[h]=a.proxy(g,"callMethod",h);a.fn.delayed=function(a){var b=this,c=Array.prototype.slice.call(arguments,1),d=c.pop();return this.delay(d).queue(function(d){b[a].apply(b,c),d()})}}(jQuery,Drupal,Events,MVPD);;
// nbc_mvpd_auth/templates/dust/mvpd_dialog_login.dust
(function(){dust.register("mvpd_dialog_login",body_0);function body_0(chk,ctx){return chk.w("<a class=\"mvpd-cta-back\" data-link=\"mvpd_dialog_provider_short\">").f(ctx.getPath(false, ["strings","back"]),ctx,"h").w("</a><div id=\"nbc-mvpd-iframe-container\" class=\"provider-iframe-wrapper\"></div><div class=\"action-links\"><a class=\"action-center\" target=\"_blank\" href=\"").f(ctx.getPath(false, ["strings","faq_cta_link"]),ctx,"h").w("\"> ").f(ctx.getPath(false, ["strings","faq_cta"]),ctx,"h").w(" </a></div>");}body_0.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/mvpd_dialog_provider_full.dust
(function(){dust.register("mvpd_dialog_provider_full",body_0);function body_0(chk,ctx){return chk.w("<a class=\"mvpd-cta-back\" data-link=\"mvpd_dialog_provider_short\">").f(ctx.getPath(false, ["strings","back"]),ctx,"h").w("</a><h1>").f(ctx.getPath(false, ["strings","provider_headline"]),ctx,"h").w("</h1><ul class=\"mvpd-provider-full\">").s(ctx.getPath(false, ["providers","all"]),ctx,{"block":body_1},{}).w("</ul><div class=\"action-links\"><a class=\"action-center\" target=\"_blank\" href=\"").f(ctx.getPath(false, ["strings","faq_cta_link"]),ctx,"h").w("\"> ").f(ctx.getPath(false, ["strings","faq_cta"]),ctx,"h").w(" </a></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li><a href=\"#\" data-login-mvpd=\"").f(ctx.get(["id"], false),ctx,"h").w("\">").f(ctx.get(["name"], false),ctx,"h").w("</a></li>");}body_1.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/mvpd_dialog_provider_short.dust
(function(){dust.register("mvpd_dialog_provider_short",body_0);function body_0(chk,ctx){return chk.w("<h1>").f(ctx.get(["headline"], false),ctx,"h").w("</h1><div class=\"provider-few\"><div class=\"provider-few-inner\">").s(ctx.getPath(false, ["providers","featured"]),ctx,{"block":body_1},{}).s(ctx.get(["blanks"], false),ctx,{"block":body_2},{}).w("</div></div><p><a class=\"mvpd-cta-next\" data-link=\"mvpd_dialog_provider_full\">").f(ctx.getPath(false, ["strings","provider_cta"]),ctx,"h").w("</a></p><div class=\"action-links\"><a class=\"action-center\" target=\"_blank\" href=\"").f(ctx.getPath(false, ["strings","faq_cta_link"]),ctx,"h").w("\"> ").f(ctx.getPath(false, ["strings","faq_cta"]),ctx,"h").w(" </a></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"provider-few-cell\"><a href=\"#\" data-login-mvpd=\"").f(ctx.get(["id"], false),ctx,"h").w("\"><div><img src=\"").f(ctx.getPath(false, ["images","small","src"]),ctx,"h").w("\"/></div></a></div>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<div class=\"provider-few-cell blank-cell\"></div>");}body_2.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/mvpd_retrieve_option.dust
(function(){dust.register("mvpd_retrieve_option",body_0);function body_0(chk,ctx){return chk.w("<a data-link=\"mvpd_retrieve_provider\" class=\"mvpd-cta-back\">").f(ctx.getPath(false, ["strings","back_provider"]),ctx,"h").w("</a><h1> ").f(ctx.getPath(false, ["strings","help_option"]),ctx,"h").w(" </h1><form><label><input type=\"radio\" name=\"help-option\">").f(ctx.getPath(false, ["strings","help_option1"]),ctx,"h").w("</label><label><input type=\"radio\" name=\"help-option\">").f(ctx.getPath(false, ["strings","help_option2"]),ctx,"h").w("</label><label><input type=\"radio\" name=\"help-option\">").f(ctx.getPath(false, ["strings","help_option3"]),ctx,"h").w("</label><button class=\"retreive_provider__button\" data-link=\"mvpd_retrieve_signin\">").f(ctx.getPath(false, ["strings","get_info"]),ctx,"h").w("</button></form>");}body_0.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/mvpd_retrieve_provider.dust
(function(){dust.register("mvpd_retrieve_provider",body_0);function body_0(chk,ctx){return chk.w("<p>").f(ctx.getPath(false, ["strings","help_direction"]),ctx,"h").w("</p><h1> ").f(ctx.getPath(false, ["strings","help_provider"]),ctx,"h").w(" </h1><ul class=\"mvpd-provider-full\">").s(ctx.getPath(false, ["providers","all"]),ctx,{"block":body_1},{}).w("</ul>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li><a href=\"#\" data-mvpd-id=\"").f(ctx.get(["id"], false),ctx,"h").w("\" data-link=\"mvpd_retrieve_option\">").f(ctx.get(["name"], false),ctx,"h").w("</a></li>");}body_1.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/mvpd_retrieve_signin.dust
(function(){dust.register("mvpd_retrieve_signin",body_0);function body_0(chk,ctx){return chk.w("<h1>").f(ctx.getPath(false, ["strings","auth_end1"]),ctx,"h").w("<a data-link=\"mvpd_dialog_provider_short\" class=\"modal-signin\">").f(ctx.getPath(false, ["strings","auth_end2"]),ctx,"h").w("</a></h1>");}body_0.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/popup-login-success.dust
(function(){dust.register("popup-login-success",body_0);function body_0(chk,ctx){return chk.w("<div class=\"popup-content login ").f(ctx.get(["className"], false),ctx,"h").w("\"><div class=\"icon icon-check-fill\"></div><div class=\"popup-message\">").f(ctx.get(["message"], false),ctx,"h").x(ctx.get(["subline"], false),ctx,{"block":body_1},{}).w("</div></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"popup-message__subline\">").f(ctx.get(["subline"], false),ctx,"h").w("</div>");}body_1.__dustBody=!0;return body_0;})();;
// nbc_mvpd_auth/templates/dust/player-error.dust
(function(){dust.register("player-error",body_0);function body_0(chk,ctx){return chk.w("<div class=\"player-error ").f(ctx.get(["className"], false),ctx,"h").w("\"><span class=\"error-peacock\"></span><div class=\"error-message\"><div class=\"message\">").x(ctx.get(["html"], false),ctx,{"else":body_1,"block":body_2},{}).w("</div>").x(ctx.get(["link"], false),ctx,{"block":body_3},{}).x(ctx.get(["hasApp"], false),ctx,{"block":body_4},{}).w("</div></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.f(ctx.get(["message"], false),ctx,"h");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.f(ctx.get(["message"], false),ctx,"h",["s"]);}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<a href=\"").f(ctx.get(["link"], false),ctx,"h").w("\" class=\"link\" target=\"_blank\"></a>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w("<a href=\"").f(ctx.get(["message_cta_link"], false),ctx,"h").w("\"><div class=\"error-message_cta\"><span>").f(ctx.get(["message_cta"], false),ctx,"h").w("</span></div></a><div class=\"error-message-download\">").f(ctx.get(["message_download"], false),ctx,"h").w("</div><div class=\"app-button-container\"><a class=\"app-button-ios\" href=\"").f(ctx.get(["app_link_ios"], false),ctx,"h").w("\"></a><a class=\"app-button-android\" href=\"").f(ctx.get(["app_link_android"], false),ctx,"h").w("\"></a></div>");}body_4.__dustBody=!0;return body_0;})();;
;
!function(a,b){var c=window.console||{error:b.noop,warn:b.noop};if("undefined"==typeof a.s)return void c.error("The global object s is undefined, NBCAnalytics will not load.");var d=a.s,e=function(a){this.settings=b.extend({platform:/android|mobile/i.test(navigator.userAgent)?"Mobile":"PC",requestorID:"nbcentertainment",timezone:"America/New_York"},a),this.contextData={}};e.prototype.collectContextDataSet=function(a){var c=this;b.each(a,function(a,b){c.setContextData(a,b)})},e.prototype.setContextData=function(a,b){"undefined"!=typeof a&&"undefined"!=typeof b&&""!==b&&(this.contextData[a]=b)},e.prototype.saveContextData=function(){b.extend(d.contextData,this.contextData)},e.prototype.resetContextData=function(){this.contextData={},d.contextData={}},e.prototype.setupTracking=function(){d.pageName=this.settings.requestorID+":"+this.settings.platform+":"+document.title},e.prototype.teardownTracking=function(){this.resetContextData()},e.prototype.stringifyKeys=function(a){return b.map(a,function(a,b){return"contextData."+b}).join(",")},e.prototype.trackPage=function(a,b){this.setupTracking(),b&&this.collectContextDataSet(b),this.saveContextData(),"undefined"!=typeof a&&(d.pageName=a),d.linkTrackEvents=d.linkTrackVars="None",d.t(),this.teardownTracking()},e.prototype.trackEvent=function(a,b,c){this.setupTracking(),c&&this.collectContextDataSet(c),this.saveContextData(),d.events=d.linkTrackEvents=a,d.pev2=b,d.linkTrackVars=this.stringifyKeys(this.contextData),d.tl(this,"o",b),this.teardownTracking()},a.NBCAnalytics=e}(window,jQuery);;
!function(a,b){var c=window.console||{error:b.noop,warn:b.noop};if("undefined"==typeof s)return void c.error("The global object s is undefined, NBCTVEAnalytics will not load.");var d=function(a){NBCAnalytics.call(this,a),this.original_s_account=this.original_s=""};"function"!=typeof Object.create&&(Object.create=function(){var a=function(){};return function(b){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof b)throw new TypeError("Argument must be an object");a.prototype=b;var c=new a;return a.prototype=null,c}}()),d.prototype=Object.create(NBCAnalytics.prototype),d.prototype.constructor=d,d.prototype.setupTracking=function(){this.setReportingContext(this.settings.reportingSuiteId),NBCAnalytics.prototype.setupTracking.call(this);var a=moment().tz(this.settings.timezone);this.contextData["tve.minute"]=a.format("HH:mm"),this.contextData["tve.hour"]=a.format("HH"),this.contextData["tve.day"]=a.format("dddd"),this.contextData["tve.date"]=a.format("M-D-YYYY"),this.contextData["tve.platform"]=this.settings.platform,this.contextData["tve.domain"]=document.domain,this.contextData["tve.rsid"]=this.settings.tveReportingID,this.contextData["tve.network"]="NBC",this.contextData["tve.passnetwork"]="NBCentertainment",this.contextData["tve.module"]="nbc_tve"},d.prototype.teardownTracking=function(){NBCAnalytics.prototype.teardownTracking.call(this),this.resetReportingContext()},d.prototype.setReportingContext=function(b){this.original_s_account=a.s_account,a.s.sa(b)},d.prototype.resetReportingContext=function(){this.original_s_account&&a.s.sa(this.original_s_account)},a.NBCTVEAnalytics=d}(window,jQuery);;
/*! jQuery plugin for Hammer.JS - v1.1.3 - 2014-05-20
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

!function(a,b){"use strict";function c(){e.READY||(t.determineEventTypes(),s.each(e.gestures,function(a){v.register(a)}),t.onTouch(e.DOCUMENT,o,v.detect),t.onTouch(e.DOCUMENT,p,v.detect),e.READY=!0)}function d(a,c){Date.now||(Date.now=function(){return(new Date).getTime()}),a.utils.each(["on","off"],function(d){a.utils[d]=function(a,e,f){c(a)[d](e,function(a){var d=c.extend({},a.originalEvent,a);d.button===b&&(d.button=a.which-1),f.call(this,d)})}}),a.Instance.prototype.trigger=function(a,b){var d=c(this.element);return d.has(b.target).length&&(d=c(b.target)),d.trigger({type:a,gesture:b})},c.fn.hammer=function(b){return this.each(function(){var d=c(this),e=d.data("hammer");e?e&&b&&a.utils.extend(e.options,b):d.data("hammer",new a(this,b||{}))})}}var e=function w(a,b){return new w.Instance(a,b||{})};e.VERSION="1.1.3",e.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},e.DOCUMENT=document,e.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,e.HAS_TOUCHEVENTS="ontouchstart"in a,e.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),e.NO_MOUSEEVENTS=e.HAS_TOUCHEVENTS&&e.IS_MOBILE||e.HAS_POINTEREVENTS,e.CALCULATE_INTERVAL=25;var f={},g=e.DIRECTION_DOWN="down",h=e.DIRECTION_LEFT="left",i=e.DIRECTION_UP="up",j=e.DIRECTION_RIGHT="right",k=e.POINTER_MOUSE="mouse",l=e.POINTER_TOUCH="touch",m=e.POINTER_PEN="pen",n=e.EVENT_START="start",o=e.EVENT_MOVE="move",p=e.EVENT_END="end",q=e.EVENT_RELEASE="release",r=e.EVENT_TOUCH="touch";e.READY=!1,e.plugins=e.plugins||{},e.gestures=e.gestures||{};var s=e.utils={extend:function(a,c,d){for(var e in c)!c.hasOwnProperty(e)||a[e]!==b&&d||(a[e]=c[e]);return a},on:function(a,b,c){a.addEventListener(b,c,!1)},off:function(a,b,c){a.removeEventListener(b,c,!1)},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=0,f=a.length;f>e;e++)if(c.call(d,a[e],e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},inStr:function(a,b){return a.indexOf(b)>-1},inArray:function(a,b){if(a.indexOf){var c=a.indexOf(b);return-1===c?!1:c}for(var d=0,e=a.length;e>d;d++)if(a[d]===b)return d;return!1},toArray:function(a){return Array.prototype.slice.call(a,0)},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[],d=[],e=[],f=Math.min,g=Math.max;return 1===a.length?{pageX:a[0].pageX,pageY:a[0].pageY,clientX:a[0].clientX,clientY:a[0].clientY}:(s.each(a,function(a){b.push(a.pageX),c.push(a.pageY),d.push(a.clientX),e.push(a.clientY)}),{pageX:(f.apply(Math,b)+g.apply(Math,b))/2,pageY:(f.apply(Math,c)+g.apply(Math,c))/2,clientX:(f.apply(Math,d)+g.apply(Math,d))/2,clientY:(f.apply(Math,e)+g.apply(Math,e))/2})},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return 180*Math.atan2(d,c)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.clientX-b.clientX),d=Math.abs(a.clientY-b.clientY);return c>=d?a.clientX-b.clientX>0?h:j:a.clientY-b.clientY>0?i:g},getDistance:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==i||a==g},setPrefixedCss:function(a,b,c,d){var e=["","Webkit","Moz","O","ms"];b=s.toCamelCase(b);for(var f=0;f<e.length;f++){var g=b;if(e[f]&&(g=e[f]+g.slice(0,1).toUpperCase()+g.slice(1)),g in a.style){a.style[g]=(null==d||d)&&c||"";break}}},toggleBehavior:function(a,b,c){if(b&&a&&a.style){s.each(b,function(b,d){s.setPrefixedCss(a,d,b,c)});var d=c&&function(){return!1};"none"==b.userSelect&&(a.onselectstart=d),"none"==b.userDrag&&(a.ondragstart=d)}},toCamelCase:function(a){return a.replace(/[_-]([a-z])/g,function(a){return a[1].toUpperCase()})}};e.Instance=function(a,b){var d=this;c(),this.element=a,this.enabled=!0,s.each(b,function(a,c){delete b[c],b[s.toCamelCase(c)]=a}),this.options=s.extend(s.extend({},e.defaults),b||{}),this.options.behavior&&s.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=t.onTouch(a,n,function(a){d.enabled&&a.eventType==n?v.startDetect(d,a):a.eventType==r&&v.detect(a)}),this.eventHandlers=[]},e.Instance.prototype={on:function(a,b){var c=this;return t.on(c.element,a,b,function(a){c.eventHandlers.push({gesture:a,handler:b})}),c},off:function(a,b){var c=this;return t.off(c.element,a,b,function(a){var d=s.inArray({gesture:a,handler:b});d!==!1&&c.eventHandlers.splice(d,1)}),c},trigger:function(a,b){b||(b={});var c=e.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var d=this.element;return s.hasParent(b.target,d)&&(d=b.target),d.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){var a,b;for(s.toggleBehavior(this.element,this.options.behavior,!1),a=-1;b=this.eventHandlers[++a];)s.off(this.element,b.gesture,b.handler);return this.eventHandlers=[],t.off(this.element,f[n],this.eventStartHandler),null}};var t=e.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(a,b,c,d){var e=b.split(" ");s.each(e,function(b){s.on(a,b,c),d&&d(b)})},off:function(a,b,c,d){var e=b.split(" ");s.each(e,function(b){s.off(a,b,c),d&&d(b)})},onTouch:function(a,b,c){var d=this,g=function(f){var g,h=f.type.toLowerCase(),i=e.HAS_POINTEREVENTS,j=s.inStr(h,"mouse");j&&d.preventMouseEvents||(j&&b==n&&0===f.button?(d.preventMouseEvents=!1,d.shouldDetect=!0):i&&b==n?d.shouldDetect=1===f.buttons||u.matchType(l,f):j||b!=n||(d.preventMouseEvents=!0,d.shouldDetect=!0),i&&b!=p&&u.updatePointer(b,f),d.shouldDetect&&(g=d.doDetect.call(d,f,b,a,c)),g==p&&(d.preventMouseEvents=!1,d.shouldDetect=!1,u.reset()),i&&b==p&&u.updatePointer(b,f))};return this.on(a,f[b],g),g},doDetect:function(a,b,c,d){var e=this.getTouchList(a,b),f=e.length,g=b,h=e.trigger,i=f;b==n?h=r:b==p&&(h=q,i=e.length-(a.changedTouches?a.changedTouches.length:1)),i>0&&this.started&&(g=o),this.started=!0;var j=this.collectEventData(c,g,e,a);return b!=p&&d.call(v,j),h&&(j.changedLength=i,j.eventType=h,d.call(v,j),j.eventType=g,delete j.changedLength),g==p&&(d.call(v,j),this.started=!1),g},determineEventTypes:function(){var b;return b=e.HAS_POINTEREVENTS?a.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:e.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],f[n]=b[0],f[o]=b[1],f[p]=b[2],f},getTouchList:function(a,b){if(e.HAS_POINTEREVENTS)return u.getTouchList();if(a.touches){if(b==o)return a.touches;var c=[],d=[].concat(s.toArray(a.touches),s.toArray(a.changedTouches)),f=[];return s.each(d,function(a){s.inArray(c,a.identifier)===!1&&f.push(a),c.push(a.identifier)}),f}return a.identifier=1,[a]},collectEventData:function(a,b,c,d){var e=l;return s.inStr(d.type,"mouse")||u.matchType(k,d)?e=k:u.matchType(m,d)&&(e=m),{center:s.getCenter(c),timeStamp:Date.now(),target:d.target,touches:c,eventType:b,pointerType:e,srcEvent:d,preventDefault:function(){var a=this.srcEvent;a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return v.stopDetect()}}}},u=e.PointerEvent={pointers:{},getTouchList:function(){var a=[];return s.each(this.pointers,function(b){a.push(b)}),a},updatePointer:function(a,b){a==p||a!=p&&1!==b.buttons?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b)},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,d={};return d[k]=c===(b.MSPOINTER_TYPE_MOUSE||k),d[l]=c===(b.MSPOINTER_TYPE_TOUCH||l),d[m]=c===(b.MSPOINTER_TYPE_PEN||m),d[a]},reset:function(){this.pointers={}}},v=e.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:s.extend({},b),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst,c=b.options;return s.each(this.gestures,function(d){!this.stopped&&b.enabled&&c[d.name]&&d.handler.call(d,a,b)},this),this.current&&(this.current.lastEvent=a),a.eventType==p&&this.stopDetect(),a}},stopDetect:function(){this.previous=s.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(a,b,c,d,f){var g=this.current,h=!1,i=g.lastCalcEvent,j=g.lastCalcData;i&&a.timeStamp-i.timeStamp>e.CALCULATE_INTERVAL&&(b=i.center,c=a.timeStamp-i.timeStamp,d=a.center.clientX-i.center.clientX,f=a.center.clientY-i.center.clientY,h=!0),(a.eventType==r||a.eventType==q)&&(g.futureCalcEvent=a),(!g.lastCalcEvent||h)&&(j.velocity=s.getVelocity(c,d,f),j.angle=s.getAngle(b,a.center),j.direction=s.getDirection(b,a.center),g.lastCalcEvent=g.futureCalcEvent||a,g.futureCalcEvent=a),a.velocityX=j.velocity.x,a.velocityY=j.velocity.y,a.interimAngle=j.angle,a.interimDirection=j.direction},extendEventData:function(a){var b=this.current,c=b.startEvent,d=b.lastEvent||c;(a.eventType==r||a.eventType==q)&&(c.touches=[],s.each(a.touches,function(a){c.touches.push({clientX:a.clientX,clientY:a.clientY})}));var e=a.timeStamp-c.timeStamp,f=a.center.clientX-c.center.clientX,g=a.center.clientY-c.center.clientY;return this.getCalculatedData(a,d.center,e,f,g),s.extend(a,{startEvent:c,deltaTime:e,deltaX:f,deltaY:g,distance:s.getDistance(c.center,a.center),angle:s.getAngle(c.center,a.center),direction:s.getDirection(c.center,a.center),scale:s.getScale(c.touches,a.touches),rotation:s.getRotation(c.touches,a.touches)}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),s.extend(e.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};!function(a){function b(b,d){var e=v.current;if(!(d.options.dragMaxTouches>0&&b.touches.length>d.options.dragMaxTouches))switch(b.eventType){case n:c=!1;break;case o:if(b.distance<d.options.dragMinDistance&&e.name!=a)return;var f=e.startEvent.center;if(e.name!=a&&(e.name=a,d.options.dragDistanceCorrection&&b.distance>0)){var k=Math.abs(d.options.dragMinDistance/b.distance);f.pageX+=b.deltaX*k,f.pageY+=b.deltaY*k,f.clientX+=b.deltaX*k,f.clientY+=b.deltaY*k,b=v.extendEventData(b)}(e.lastEvent.dragLockToAxis||d.options.dragLockToAxis&&d.options.dragLockMinDistance<=b.distance)&&(b.dragLockToAxis=!0);var l=e.lastEvent.direction;b.dragLockToAxis&&l!==b.direction&&(b.direction=s.isVertical(l)?b.deltaY<0?i:g:b.deltaX<0?h:j),c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),d.trigger(a+b.direction,b);var m=s.isVertical(b.direction);(d.options.dragBlockVertical&&m||d.options.dragBlockHorizontal&&!m)&&b.preventDefault();break;case q:c&&b.changedLength<=d.options.dragMaxTouches&&(d.trigger(a+"end",b),c=!1);break;case p:c=!1}}var c=!1;e.gestures.Drag={name:a,index:50,handler:b,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),e.gestures.Gesture={name:"gesture",index:1337,handler:function(a,b){b.trigger(this.name,a)}},function(a){function b(b,d){var e=d.options,f=v.current;switch(b.eventType){case n:clearTimeout(c),f.name=a,c=setTimeout(function(){f&&f.name==a&&d.trigger(a,b)},e.holdTimeout);break;case o:b.distance>e.holdThreshold&&clearTimeout(c);break;case q:clearTimeout(c)}}var c;e.gestures.Hold={name:a,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:b}}("hold"),e.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==q&&b.trigger(this.name,a)}},e.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(a,b){if(a.eventType==q){var c=a.touches.length,d=b.options;if(c<d.swipeMinTouches||c>d.swipeMaxTouches)return;(a.velocityX>d.swipeVelocityX||a.velocityY>d.swipeVelocityY)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},function(a){function b(b,d){var e,f,g=d.options,h=v.current,i=v.previous;switch(b.eventType){case n:c=!1;break;case o:c=c||b.distance>g.tapMaxDistance;break;case p:!s.inStr(b.srcEvent.type,"cancel")&&b.deltaTime<g.tapMaxTime&&!c&&(e=i&&i.lastEvent&&b.timeStamp-i.lastEvent.timeStamp,f=!1,i&&i.name==a&&e&&e<g.doubleTapInterval&&b.distance<g.doubleTapDistance&&(d.trigger("doubletap",b),f=!0),(!f||g.tapAlways)&&(h.name=a,d.trigger(h.name,b)))}}var c=!1;e.gestures.Tap={name:a,index:100,handler:b,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),e.gestures.Touch={name:"touch",index:-1/0,defaults:{preventDefault:!1,preventMouse:!1},handler:function(a,b){return b.options.preventMouse&&a.pointerType==k?void a.stopDetect():(b.options.preventDefault&&a.preventDefault(),void(a.eventType==r&&b.trigger("touch",a)))}},function(a){function b(b,d){switch(b.eventType){case n:c=!1;break;case o:if(b.touches.length<2)return;var e=Math.abs(1-b.scale),f=Math.abs(b.rotation);if(e<d.options.transformMinScale&&f<d.options.transformMinRotation)return;v.current.name=a,c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),f>d.options.transformMinRotation&&d.trigger("rotate",b),e>d.options.transformMinScale&&(d.trigger("pinch",b),d.trigger("pinch"+(b.scale<1?"in":"out"),b));break;case q:c&&b.changedLength<2&&(d.trigger(a+"end",b),c=!1)}}var c=!1;e.gestures.Transform={name:a,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:b}}("transform"),a.Hammer=e,"undefined"!=typeof module&&module.exports&&(module.exports=e),"function"==typeof define&&define.amd?define(["jquery"],function(b){return d(a.Hammer,b)}):d(a.Hammer,a.jQuery||a.Zepto)}(window);
;
/*
 * iosSlider - http://iosscripts.com/iosslider/
 * 
 * Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin
 *
 * A jQuery plugin which allows you to integrate a customizable, cross-browser 
 * content slider into your web presence. Designed for use as a content slider, carousel, 
 * scrolling website banner, or image gallery.
 * 
 * Copyright (c) 2013 Marc Whitbread
 * 
 * Version: v1.3.43 (06/17/2014)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons – Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
 *    distribution elsewhere "as is" without prior consent. If you would like to feature
 *    iosSlider on your site, please do not link directly to the resource zip files. Please
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

;(function($) {
	
	/* global variables */
	var scrollbarNumber = 0;
	var xScrollDistance = 0;
	var yScrollDistance = 0;
	var scrollIntervalTime = 10;
	var scrollbarDistance = 0;
	var isTouch = 'ontouchstart' in window || (navigator.msMaxTouchPoints > 0);
	var supportsOrientationChange = 'onorientationchange' in window;
	var isWebkit = false;
	var has3DTransform = false;
	var isIe7 = false;
	var isIe8 = false;
	var isIe9 = false;
	var isIe = false;
	var isGecko = false;
	var grabOutCursor = 'pointer';
	var grabInCursor = 'pointer';
	var onChangeEventLastFired = new Array();
	var autoSlideTimeouts = new Array();
	var iosSliders = new Array();
	var iosSliderSettings = new Array();
	var isEventCleared = new Array();
	var slideTimeouts = new Array();
	var activeChildOffsets = new Array();
	var activeChildInfOffsets = new Array();
	var infiniteSliderOffset = new Array();
	var sliderMin = new Array();
	var sliderMax = new Array();
	var sliderAbsMax = new Array();
	var touchLocks = new Array();
	
	/* private functions */
	var helpers = {
    
        showScrollbar: function(settings, scrollbarClass) {
			
			if(settings.scrollbarHide) {
				$('.' + scrollbarClass).css({
					opacity: settings.scrollbarOpacity,
					filter: 'alpha(opacity:' + (settings.scrollbarOpacity * 100) + ')'
				});
			}
			
		},
		
		hideScrollbar: function(settings, scrollTimeouts, j, distanceOffsetArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber) {
			
			if(settings.scrollbar && settings.scrollbarHide) {
					
				for(var i = j; i < j+25; i++) {
					
					scrollTimeouts[scrollTimeouts.length] = helpers.hideScrollbarIntervalTimer(scrollIntervalTime * i, distanceOffsetArray[j], ((j + 24) - i) / 24, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings);
					
				}
			
			}
			
		},
		
		hideScrollbarInterval: function(newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings) {
	
			scrollbarDistance = (newOffset * -1) / (sliderMax[sliderNumber]) * (stageWidth - scrollMargin - scrollBorder - scrollbarWidth);
			
			helpers.setSliderOffset('.' + scrollbarClass, scrollbarDistance);
			
			$('.' + scrollbarClass).css({
				opacity: settings.scrollbarOpacity * opacity,
				filter: 'alpha(opacity:' + (settings.scrollbarOpacity * opacity * 100) + ')'
			});
			
		},
		
		slowScrollHorizontalInterval: function(node, slideNodes, newOffset, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, activeChildOffset, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings) {
			
			if(settings.infiniteSlider) {
				
				if((newOffset <= (sliderMax[sliderNumber] * -1)) || (newOffset <= (sliderAbsMax[sliderNumber] * -1))) {
					
					var scrollerWidth = $(node).width();

					if(newOffset <= (sliderAbsMax[sliderNumber] * -1)) {
						
						var sum = originalOffsets[0] * -1;
						$(slideNodes).each(function(i) {
							
							helpers.setSliderOffset($(slideNodes)[i], sum + centeredSlideOffset);
							if(i < childrenOffsets.length) {
								childrenOffsets[i] = sum * -1;
							}
							sum = sum + slideNodeOuterWidths[i];
							
						});
						
						newOffset = newOffset + childrenOffsets[0] * -1;
						sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
						infiniteSliderOffset[sliderNumber] = 0;
						
					}
						
					while(newOffset <= (sliderMax[sliderNumber] * -1)) {
						
						var lowSlideNumber = 0;
						var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
						$(slideNodes).each(function(i) {
							
							if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
								lowSlideOffset = helpers.getSliderOffset(this, 'x');
								lowSlideNumber = i;
							}
							
						});
						
						var tempOffset = sliderMin[sliderNumber] + scrollerWidth;
						helpers.setSliderOffset($(slideNodes)[lowSlideNumber], tempOffset);
						
						sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

						childrenOffsets.splice(0, 1);
						childrenOffsets.splice(childrenOffsets.length, 0, tempOffset * -1 + centeredSlideOffset);

						infiniteSliderOffset[sliderNumber]++;
						
					}
					
				}
				
				if((newOffset >= (sliderMin[sliderNumber] * -1)) || (newOffset >= 0)) {

					var scrollerWidth = $(node).width();
					
					if(newOffset > 0) {
						
						var sum = originalOffsets[0] * -1;
						$(slideNodes).each(function(i) {
							
							helpers.setSliderOffset($(slideNodes)[i], sum + centeredSlideOffset);
							if(i < childrenOffsets.length) {
								childrenOffsets[i] = sum * -1;
							}
							sum = sum + slideNodeOuterWidths[i];
							
						});
						
						newOffset = newOffset - childrenOffsets[0] * -1;
						sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
						infiniteSliderOffset[sliderNumber] = numberOfSlides;
						
						while(((childrenOffsets[0] * -1 - scrollerWidth + centeredSlideOffset) > 0)) {
							
							var highSlideNumber = 0;
							var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
							$(slideNodes).each(function(i) {
								
								if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
									highSlideOffset = helpers.getSliderOffset(this, 'x');
									highSlideNumber = i;
								}
								
							});

							var tempOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber];
							helpers.setSliderOffset($(slideNodes)[highSlideNumber], tempOffset);
							
							childrenOffsets.splice(0, 0, tempOffset * -1 + centeredSlideOffset);
							childrenOffsets.splice(childrenOffsets.length-1, 1);

							sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
							sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

							infiniteSliderOffset[sliderNumber]--;
							activeChildOffsets[sliderNumber]++;
							
						}

					} 
					
					while(newOffset > (sliderMin[sliderNumber] * -1)) {
						
						var highSlideNumber = 0;
						var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
						$(slideNodes).each(function(i) {
							
							if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
								highSlideOffset = helpers.getSliderOffset(this, 'x');
								highSlideNumber = i;
							}
							
						});						
					
						var tempOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber];
						helpers.setSliderOffset($(slideNodes)[highSlideNumber], tempOffset);

						childrenOffsets.splice(0, 0, tempOffset * -1 + centeredSlideOffset);
						childrenOffsets.splice(childrenOffsets.length-1, 1);

						sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

						infiniteSliderOffset[sliderNumber]--;
						
					}
				
				}
				
			}

			var slideChanged = false;
			var newChildOffset = helpers.calcActiveOffset(settings, newOffset, childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, activeChildOffset, sliderNumber);
			var tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
			
			if(settings.infiniteSlider) {
								
				if(tempOffset != activeChildInfOffsets[sliderNumber]) slideChanged = true;
					
			} else {
			
				if(newChildOffset != activeChildOffsets[sliderNumber]) slideChanged = true;
			
			}
			
			if(slideChanged) {

				var args = new helpers.args('change', settings, node, $(node).children(':eq(' + tempOffset + ')'), tempOffset, endOffset);
				$(node).parent().data('args', args);
				
				if(settings.onSlideChange != '') {
				
					settings.onSlideChange(args);
				
				}
			
			}
			
			activeChildOffsets[sliderNumber] = newChildOffset;
			activeChildInfOffsets[sliderNumber] = tempOffset;
			
			newOffset = Math.floor(newOffset);
			
			if(sliderNumber != $(node).parent().data('args').data.sliderNumber) return true;
			helpers.setSliderOffset(node, newOffset);

			if(settings.scrollbar) {
				
				scrollbarDistance = Math.floor((newOffset * -1 - sliderMin[sliderNumber] + centeredSlideOffset) / (sliderMax[sliderNumber] - sliderMin[sliderNumber] + centeredSlideOffset) * (scrollbarStageWidth - scrollMargin - scrollbarWidth));
				var width = scrollbarWidth - scrollBorder;
				
				if(newOffset >= (sliderMin[sliderNumber] * -1 + centeredSlideOffset)) {

					width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1);
					
					helpers.setSliderOffset($('.' + scrollbarClass), 0);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
				
				} else if(newOffset <= ((sliderMax[sliderNumber] * -1) + 1)) {
					
					width = scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarDistance;
					
					helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
					
				} else {
					
					helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
				
				}
				
			}
			
		},
		
		slowScrollHorizontal: function(node, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings) {
			
			var nodeOffset = helpers.getSliderOffset(node, 'x');
			var distanceOffsetArray = new Array();
			var xScrollDistanceArray = new Array();
			var snapDirection = 0;
			var maxSlideVelocity = 25 / 1024 * stageWidth;
			var changeSlideFired = false;
			frictionCoefficient = settings.frictionCoefficient;
			elasticFrictionCoefficient = settings.elasticFrictionCoefficient;
			snapFrictionCoefficient = settings.snapFrictionCoefficient;
				
			if((xScrollDistance > settings.snapVelocityThreshold) && settings.snapToChildren && !snapOverride) {
				snapDirection = 1;
			} else if((xScrollDistance < (settings.snapVelocityThreshold * -1)) && settings.snapToChildren && !snapOverride) {
				snapDirection = -1;
			}
			
			if(xScrollDistance < (maxSlideVelocity * -1)) {
				xScrollDistance = maxSlideVelocity * -1;
			} else if(xScrollDistance > maxSlideVelocity) {
				xScrollDistance = maxSlideVelocity;
			}
			
			if(!($(node)[0] === $(currentEventNode)[0])) {
				snapDirection = snapDirection * -1;
				xScrollDistance = xScrollDistance * -2;
			}
			
			var tempInfiniteSliderOffset = infiniteSliderOffset[sliderNumber];
			
			if(settings.infiniteSlider) {
			
				var tempSliderMin = sliderMin[sliderNumber];
				var tempSliderMax = sliderMax[sliderNumber];
			
			}
			
			var tempChildrenOffsets = new Array();
			var tempSlideNodeOffsets = new Array();

			for(var i = 0; i < childrenOffsets.length; i++) {
				
				tempChildrenOffsets[i] = childrenOffsets[i];
				
				if(i < slideNodes.length) {
					tempSlideNodeOffsets[i] = helpers.getSliderOffset($(slideNodes[i]), 'x');
				}
				
			}
			
			while((xScrollDistance > 1) || (xScrollDistance < -1)) {
				
				xScrollDistance = xScrollDistance * frictionCoefficient;
				nodeOffset = nodeOffset + xScrollDistance;

				if(((nodeOffset > (sliderMin[sliderNumber] * -1)) || (nodeOffset < (sliderMax[sliderNumber] * -1))) && !settings.infiniteSlider) {
					xScrollDistance = xScrollDistance * elasticFrictionCoefficient;
					nodeOffset = nodeOffset + xScrollDistance;
				}
				
				if(settings.infiniteSlider) {
					
					if(nodeOffset <= (tempSliderMax * -1)) {
						
						var scrollerWidth = $(node).width();
							
						var lowSlideNumber = 0;
						var lowSlideOffset = tempSlideNodeOffsets[0];
						for(var i = 0; i < tempSlideNodeOffsets.length; i++) {
							
							if(tempSlideNodeOffsets[i] < lowSlideOffset) {
								lowSlideOffset = tempSlideNodeOffsets[i];
								lowSlideNumber = i;
							}
							
						}
						
						var newOffset = tempSliderMin + scrollerWidth;
						tempSlideNodeOffsets[lowSlideNumber] = newOffset;
						
						tempSliderMin = tempChildrenOffsets[1] * -1 + centeredSlideOffset;
						tempSliderMax = tempSliderMin + scrollerWidth - stageWidth;
						
						tempChildrenOffsets.splice(0, 1);
						tempChildrenOffsets.splice(tempChildrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset);

						tempInfiniteSliderOffset++;
						
					}
					
					if(nodeOffset >= (tempSliderMin * -1)) {
						
						var scrollerWidth = $(node).width();
						
						var highSlideNumber = 0;
						var highSlideOffset = tempSlideNodeOffsets[0];
						for(var i = 0; i < tempSlideNodeOffsets.length; i++) {
							
							if(tempSlideNodeOffsets[i] > highSlideOffset) {
								highSlideOffset = tempSlideNodeOffsets[i];
								highSlideNumber = i;
							}
							
						}

						var newOffset = tempSliderMin - slideNodeOuterWidths[highSlideNumber];
						tempSlideNodeOffsets[highSlideNumber] = newOffset;
						
						tempChildrenOffsets.splice(0, 0, newOffset * -1 + centeredSlideOffset);
						tempChildrenOffsets.splice(tempChildrenOffsets.length-1, 1);

						tempSliderMin = tempChildrenOffsets[0] * -1 + centeredSlideOffset;
						tempSliderMax = tempSliderMin + scrollerWidth - stageWidth;

						tempInfiniteSliderOffset--;
					
					}
						
				}

				distanceOffsetArray[distanceOffsetArray.length] = nodeOffset;
				xScrollDistanceArray[xScrollDistanceArray.length] = xScrollDistance;
				
			}

			var slideChanged = false;
			var newChildOffset = helpers.calcActiveOffset(settings, nodeOffset, tempChildrenOffsets, stageWidth, tempInfiniteSliderOffset, numberOfSlides, activeChildOffsets[sliderNumber], sliderNumber);

			var tempOffset = (newChildOffset + tempInfiniteSliderOffset + numberOfSlides)%numberOfSlides;

			if(settings.snapToChildren) {
			
				if(settings.infiniteSlider) {
				
					if(tempOffset != activeChildInfOffsets[sliderNumber]) {
						slideChanged = true;
					}
						
				} else {
				
					if(newChildOffset != activeChildOffsets[sliderNumber]) {
						slideChanged = true;
					}
				
				}

				if((snapDirection < 0) && !slideChanged) {
				
					newChildOffset++;
					
					if((newChildOffset >= childrenOffsets.length) && !settings.infiniteSlider) newChildOffset = childrenOffsets.length - 1;
					
				} else if((snapDirection > 0) && !slideChanged) {
				
					newChildOffset--;
					
					if((newChildOffset < 0) && !settings.infiniteSlider) newChildOffset = 0;
					
				}
				
			}

			if(settings.snapToChildren || (((nodeOffset > (sliderMin[sliderNumber] * -1)) || (nodeOffset < (sliderMax[sliderNumber] * -1))) && !settings.infiniteSlider)) {
				
				if(((nodeOffset > (sliderMin[sliderNumber] * -1)) || (nodeOffset < (sliderMax[sliderNumber] * -1))) && !settings.infiniteSlider) {
					distanceOffsetArray.splice(0, distanceOffsetArray.length);					
				} else {
					distanceOffsetArray.splice(distanceOffsetArray.length * 0.10, distanceOffsetArray.length);
					nodeOffset = (distanceOffsetArray.length > 0) ? distanceOffsetArray[distanceOffsetArray.length-1] : nodeOffset;
				}

				while((nodeOffset < (tempChildrenOffsets[newChildOffset] - 0.5)) || (nodeOffset > (tempChildrenOffsets[newChildOffset] + 0.5))) {
					
					nodeOffset = ((nodeOffset - (tempChildrenOffsets[newChildOffset])) * snapFrictionCoefficient) + (tempChildrenOffsets[newChildOffset]);
					distanceOffsetArray[distanceOffsetArray.length] = nodeOffset;

				}
				
				distanceOffsetArray[distanceOffsetArray.length] = tempChildrenOffsets[newChildOffset];
			}

			var jStart = 1;
			if((distanceOffsetArray.length%2) != 0) {
				jStart = 0;
			}
			
			var lastTimeoutRegistered = 0;
			var count = 0;
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			var endOffset = (newChildOffset + tempInfiniteSliderOffset + numberOfSlides)%numberOfSlides;
			
			var lastCheckOffset = 0;
			for(var j = jStart; j < distanceOffsetArray.length; j = j + 2) {
				
				if((j == jStart) || (Math.abs(distanceOffsetArray[j] - lastCheckOffset) > 1) || (j >= (distanceOffsetArray.length - 2))) {
				
					lastCheckOffset	= distanceOffsetArray[j];
					
					scrollTimeouts[scrollTimeouts.length] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * j, node, slideNodes, distanceOffsetArray[j], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, newChildOffset, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings);
				
				}
				
			}
			
			var slideChanged = false;
			var tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
			
			if(settings.infiniteSlider) {
				
				if(tempOffset != activeChildInfOffsets[sliderNumber]) {
					slideChanged = true;
				}
					
			} else {
			
				if(newChildOffset != activeChildOffsets[sliderNumber]) {
					slideChanged = true;
				}
			
			}
			
			if(settings.onSlideComplete != '' && (distanceOffsetArray.length > 1)) {
				
				scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (j + 1), settings, node, $(node).children(':eq(' + tempOffset + ')'), endOffset, sliderNumber);
				
			}
			
			scrollTimeouts[scrollTimeouts.length] = helpers.updateBackfaceVisibilityTimer(scrollIntervalTime * (j + 1), slideNodes, sliderNumber, numberOfSlides, settings);
			
			slideTimeouts[sliderNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, j, distanceOffsetArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber);
				
		},
		
		onSlideComplete: function(settings, node, slideNode, newChildOffset, sliderNumber) {
			
			var isChanged = (onChangeEventLastFired[sliderNumber] != newChildOffset) ? true : false;
			var args = new helpers.args('complete', settings, $(node), slideNode, newChildOffset, newChildOffset);
			$(node).parent().data('args', args);
				
			if(settings.onSlideComplete != '') {
				settings.onSlideComplete(args);
			}
			
			onChangeEventLastFired[sliderNumber] = newChildOffset;
		
		},
		
		getSliderOffset: function(node, xy) {
			
			var sliderOffset = 0;
			xy = (xy == 'x') ? 4 : 5;
			
			if(has3DTransform) {
				
				var transforms = new Array('-webkit-transform', '-moz-transform', 'transform');
				var transformArray;
				
				for(var i = 0; i < transforms.length; i++) {
					
					if($(node).css(transforms[i]) != undefined) {
						
						if($(node).css(transforms[i]).length > 0) {
						
							transformArray = $(node).css(transforms[i]).split(',');
							
							break;
							
						}
					
					}
				
				}
				
				sliderOffset = (transformArray[xy] == undefined) ? 0 : parseInt(transformArray[xy], 10);

			} else {
			
				sliderOffset = parseInt($(node).css('left'), 10);
			
			}
			
			return sliderOffset;
		
		},
		
		setSliderOffset: function(node, sliderOffset) {
			
			sliderOffset = parseInt(sliderOffset, 10);
			
			if(has3DTransform) {
				
				$(node).css({
					'msTransform': 'matrix(1,0,0,1,' + sliderOffset + ',0)',
					'webkitTransform': 'matrix(1,0,0,1,' + sliderOffset + ',0)',
					'MozTransform': 'matrix(1,0,0,1,' + sliderOffset + ',0)',
					'transform': 'matrix(1,0,0,1,' + sliderOffset + ',0)'
				});
			
			} else {

				$(node).css({
					left: sliderOffset + 'px'
				});
			
			}
						
		},
		
		setBrowserInfo: function() {
			
			if(navigator.userAgent.match('WebKit') != null) {
				isWebkit = true;
				grabOutCursor = '-webkit-grab';
				grabInCursor = '-webkit-grabbing';
			} else if(navigator.userAgent.match('Gecko') != null) {
				isGecko = true;
				grabOutCursor = 'move';
				grabInCursor = '-moz-grabbing';
			} else if(navigator.userAgent.match('MSIE 7') != null) {
				isIe7 = true;
				isIe = true;
			} else if(navigator.userAgent.match('MSIE 8') != null) {
				isIe8 = true;
				isIe = true;
			} else if(navigator.userAgent.match('MSIE 9') != null) {
				isIe9 = true;
				isIe = true;
			}
			
		},
		
		has3DTransform: function() {
			
			var has3D = false;
			
			var testElement = $('<div />').css({
				'msTransform': 'matrix(1,1,1,1,1,1)',
				'webkitTransform': 'matrix(1,1,1,1,1,1)',
				'MozTransform': 'matrix(1,1,1,1,1,1)',
				'transform': 'matrix(1,1,1,1,1,1)'
			});
			
			if(testElement.attr('style') == '') {
				has3D = false;
			} else if(isGecko && (parseInt(navigator.userAgent.split('/')[3], 10) >= 21)) {
				//bug in v21+ which does not render slides properly in 3D
				has3D = false;
			} else if (isIe7 || isIe8 || isIe9) {
				// http://caniuse.com/#feat=transforms3d
				has3D = false;
			} else if(testElement.attr('style') != undefined) {
				has3D = true;
			}
			
			return has3D;
			
		},
		
		getSlideNumber: function(slide, sliderNumber, numberOfSlides) {
			
			return (slide - infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides;
		
		}, 

        calcActiveOffset: function(settings, offset, childrenOffsets, stageWidth, infiniteSliderOffset, numberOfSlides, activeChildOffset, sliderNumber) {

			var isFirst = false;
			var arrayOfOffsets = new Array();
			var newChildOffset;
			
			if(offset > childrenOffsets[0]) newChildOffset = 0;
			if(offset < (childrenOffsets[childrenOffsets.length-1])) newChildOffset = numberOfSlides - 1;
			
			for(var i = 0; i < childrenOffsets.length; i++) {
								
				if((childrenOffsets[i] <= offset) && (childrenOffsets[i] > (offset - stageWidth))) {
				
					if(!isFirst && (childrenOffsets[i] != offset)) {
						
						arrayOfOffsets[arrayOfOffsets.length] = childrenOffsets[i-1];
						
					}
					
					arrayOfOffsets[arrayOfOffsets.length] = childrenOffsets[i];
					
					isFirst = true;
						
				}
			
			}
			
			if(arrayOfOffsets.length == 0) {
				arrayOfOffsets[0] = childrenOffsets[childrenOffsets.length - 1];
			}
			
			var distance = stageWidth;
			var closestChildOffset = 0;
			
			for(var i = 0; i < arrayOfOffsets.length; i++) {
				
				var newDistance = Math.abs(offset - arrayOfOffsets[i]);

				if(newDistance < distance) {
					closestChildOffset = arrayOfOffsets[i];
					distance = newDistance;
				}
				
			}
			
			for(var i = 0; i < childrenOffsets.length; i++) {
				
				if(closestChildOffset == childrenOffsets[i]) {
					newChildOffset = i;
						
				}
				
			}
			
			return newChildOffset;
		
		},
		
		changeSlide: function(slide, node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings) {
			
			helpers.autoSlidePause(sliderNumber);
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			var steps = Math.ceil(settings.autoSlideTransTimer / 10) + 1;
			var startOffset = helpers.getSliderOffset(node, 'x');
			var endOffset = childrenOffsets[slide];
			var offsetDiff = endOffset - startOffset;
			var direction = slide - (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;

			if(settings.infiniteSlider) {
				
				slide = (slide - infiniteSliderOffset[sliderNumber] + numberOfSlides * 2)%numberOfSlides;
				
				var appendArray = false;
				if((slide == 0) && (numberOfSlides == 2)) {
					
					slide = numberOfSlides;
					childrenOffsets[slide] = childrenOffsets[slide-1] - $(slideNodes).eq(0).outerWidth(true);
					appendArray = true;
					
				}
				
				endOffset = childrenOffsets[slide];
				offsetDiff = endOffset - startOffset;
								
				var offsets = new Array(childrenOffsets[slide] - $(node).width(), childrenOffsets[slide] + $(node).width());
				
				if(appendArray) {
					childrenOffsets.splice(childrenOffsets.length-1, 1);
				}
				
				for(var i = 0; i < offsets.length; i++) {
					
					if(Math.abs(offsets[i] - startOffset) < Math.abs(offsetDiff)) {
						offsetDiff = (offsets[i] - startOffset);
					}
				
				}
				
			}
			
			if((offsetDiff < 0) && (direction == -1)) {
				offsetDiff += $(node).width();
			} else if((offsetDiff > 0) && (direction == 1)) {
				offsetDiff -= $(node).width();
			}
			
			var stepArray = new Array();
			var t;
			var nextStep;

			helpers.showScrollbar(settings, scrollbarClass);

			for(var i = 0; i <= steps; i++) {

				t = i;
				t /= steps;
				t--;
				nextStep = startOffset + offsetDiff*(Math.pow(t,5) + 1);
				
				stepArray[stepArray.length] = nextStep;
				
			}
			
			var tempOffset = (slide + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;

			var lastCheckOffset = 0;
			for(var i = 0; i < stepArray.length; i++) {
				
				if((i == 0) || (Math.abs(stepArray[i] - lastCheckOffset) > 1) || (i >= (stepArray.length - 2))) {

					lastCheckOffset	= stepArray[i];
					
					scrollTimeouts[i] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * (i + 1), node, slideNodes, stepArray[i], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, tempOffset, settings);
						
				}
				
				if((i == 0) && (settings.onSlideStart != '')) {
				
					var tempOffset2 = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;	
					settings.onSlideStart(new helpers.args('start', settings, node, $(node).children(':eq(' + tempOffset2 + ')'), tempOffset2, slide));
					
				}
					
			}

			var slideChanged = false;
			
			if(settings.infiniteSlider) {
				
				if(tempOffset != activeChildInfOffsets[sliderNumber]) {
					slideChanged = true;
				}
					
			} else {
			
				if(slide != activeChildOffsets[sliderNumber]) {
					slideChanged = true;
				}
			
			}
	
			if(slideChanged && (settings.onSlideComplete != '')) {

				scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (i + 1), settings, node, $(node).children(':eq(' + tempOffset + ')'), tempOffset, sliderNumber);
				
			}
			
			/*scrollTimeouts[scrollTimeouts.length] = setTimeout(function() {
				activeChildOffsets[sliderNumber] = activeChildOffsets[sliderNumber];
			}, scrollIntervalTime * (i + 1));*/
			
			slideTimeouts[sliderNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, i, stepArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber);
			
			helpers.autoSlide(node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
			
		},
		
		changeOffset: function(endOffset, node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings) {
		
			helpers.autoSlidePause(sliderNumber);
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			if(!settings.infiniteSlider) {
				endOffset = (endOffset > (sliderMin[sliderNumber] * -1 + centeredSlideOffset)) ? sliderMin[sliderNumber] * -1 + centeredSlideOffset : endOffset;
				endOffset = (endOffset < (sliderMax[sliderNumber] * -1)) ? sliderMax[sliderNumber] * -1 : endOffset;
			}
			
			var steps = Math.ceil(settings.autoSlideTransTimer / 10) + 1;
			var startOffset = helpers.getSliderOffset(node, 'x');
			var slide = (helpers.calcActiveOffset(settings, endOffset, childrenOffsets, stageWidth, infiniteSliderOffset, numberOfSlides, activeChildOffsets[sliderNumber], sliderNumber) + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
			var testOffsets = childrenOffsets.slice();
			
			if(settings.snapToChildren && !settings.infiniteSlider) {
				endOffset = childrenOffsets[slide];
			} else if(settings.infiniteSlider && settings.snapToChildren) {
				while(endOffset >= testOffsets[0]) {
					testOffsets.splice(0, 0, testOffsets[numberOfSlides-1] + $(node).width());
					testOffsets.splice(numberOfSlides, 1);
				}
				
				while(endOffset <= testOffsets[numberOfSlides-1]) {
					testOffsets.splice(numberOfSlides, 0, testOffsets[0] - $(node).width());
					testOffsets.splice(0, 1);
				}
				
				slide = helpers.calcActiveOffset(settings, endOffset, testOffsets, stageWidth, infiniteSliderOffset, numberOfSlides, activeChildOffsets[sliderNumber], sliderNumber);
				endOffset = testOffsets[slide];
				
			}
			
			var offsetDiff = endOffset - startOffset;
						
			var stepArray = new Array();
			var t;
			var nextStep;

			helpers.showScrollbar(settings, scrollbarClass);

			for(var i = 0; i <= steps; i++) {

				t = i;
				t /= steps;
				t--;
				nextStep = startOffset + offsetDiff*(Math.pow(t,5) + 1);
				
				stepArray[stepArray.length] = nextStep;
				
			}
			
			var tempOffset = (slide + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
			
			var lastCheckOffset = 0;
			for(var i = 0; i < stepArray.length; i++) {
				
				if((i == 0) || (Math.abs(stepArray[i] - lastCheckOffset) > 1) || (i >= (stepArray.length - 2))) {

					lastCheckOffset	= stepArray[i];
					
					scrollTimeouts[i] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * (i + 1), node, slideNodes, stepArray[i], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, tempOffset, settings);
						
				}
				
				if((i == 0) && (settings.onSlideStart != '')) {
					var tempOffset = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;		
				
					settings.onSlideStart(new helpers.args('start', settings, node, $(node).children(':eq(' + tempOffset + ')'), tempOffset, slide));
				}
					
			}

			var slideChanged = false;
			
			if(settings.infiniteSlider) {
				
				if(tempOffset != activeChildInfOffsets[sliderNumber]) {
					slideChanged = true;
				}
					
			} else {
			
				if(slide != activeChildOffsets[sliderNumber]) {
					slideChanged = true;
				}
			
			}
				
			if(slideChanged && (settings.onSlideComplete != '')) {

				scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (i + 1), settings, node, $(node).children(':eq(' + tempOffset + ')'), tempOffset, sliderNumber);
			}
			
			slideTimeouts[sliderNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, i, stepArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber);
			
			helpers.autoSlide(node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
			
		},
		
		autoSlide: function(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings) {
			
			if(!iosSliderSettings[sliderNumber].autoSlide) return false;
			
			helpers.autoSlidePause(sliderNumber);

			autoSlideTimeouts[sliderNumber] = setTimeout(function() {

				if(!settings.infiniteSlider && (activeChildOffsets[sliderNumber] > childrenOffsets.length-1)) {
					activeChildOffsets[sliderNumber] = activeChildOffsets[sliderNumber] - numberOfSlides;
				}
				
				var nextSlide = activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + 1;

				helpers.changeSlide(nextSlide, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
				
				helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
				
			}, settings.autoSlideTimer + settings.autoSlideTransTimer);
			
		},
				
		autoSlidePause: function(sliderNumber) {

			clearTimeout(autoSlideTimeouts[sliderNumber]);

		},
		
		isUnselectable: function(node, settings) {

			if(settings.unselectableSelector != '') {
				if($(node).closest(settings.unselectableSelector).length == 1) return true;
			}
			
			return false;
			
		},
		
		/* timers */
		slowScrollHorizontalIntervalTimer: function(scrollIntervalTime, node, slideNodes, step, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings) {
		
			var scrollTimeout = setTimeout(function() {
				helpers.slowScrollHorizontalInterval(node, slideNodes, step, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings);
			}, scrollIntervalTime);
			
			return scrollTimeout;
		
		},
		
		onSlideCompleteTimer: function(scrollIntervalTime, settings, node, slideNode, slide, scrollbarNumber) {

			var scrollTimeout = setTimeout(function() {
				helpers.onSlideComplete(settings, node, slideNode, slide, scrollbarNumber);
			}, scrollIntervalTime);
			
			return scrollTimeout;
		
		},
		
		hideScrollbarIntervalTimer: function(scrollIntervalTime, newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings) {

			var scrollTimeout = setTimeout(function() {
				helpers.hideScrollbarInterval(newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings);
			}, scrollIntervalTime);
		
			return scrollTimeout;
		
		},
		
		updateBackfaceVisibilityTimer: function(scrollIntervalTime, slideNodes, sliderNumber, numberOfSlides, settings) {
		
			var scrollTimeout = setTimeout(function() {
				helpers.updateBackfaceVisibility(slideNodes, sliderNumber, numberOfSlides, settings);
			}, scrollIntervalTime);
			
			return scrollTimeout;
			
		},
		
		updateBackfaceVisibility: function(slideNodes, sliderNumber, numberOfSlides, settings) {

			var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
			var usedSlideArray = Array();
			
			//loop through buffered slides
			for(var i = 0; i < (settings.hardwareAccelBuffer * 2); i++) {
				
				var slide_eq = helpers.mod(slide+i-settings.hardwareAccelBuffer, numberOfSlides);
				
				//check if backface visibility applied
				if($(slideNodes).eq(slide_eq).css('-webkit-backface-visibility') == 'visible') {
					
					usedSlideArray[usedSlideArray.length] = slide_eq;
					
					var eq_h = helpers.mod(slide_eq+settings.hardwareAccelBuffer*2, numberOfSlides);
					var eq_l = helpers.mod(slide_eq-settings.hardwareAccelBuffer*2, numberOfSlides);
					
					//buffer backface visibility
					$(slideNodes).eq(slide_eq).css('-webkit-backface-visibility', 'hidden');
					
					if(usedSlideArray.indexOf(eq_l) == -1) 
						$(slideNodes).eq(eq_l).css('-webkit-backface-visibility', '');
						
					if(usedSlideArray.indexOf(eq_h) == -1) 
						$(slideNodes).eq(eq_h).css('-webkit-backface-visibility', '');
					
				}
				
			}
			
		},
		
		mod: function(x, mod) {
		
			var rem = x % mod;
			
		    return rem < 0 ? rem + mod : rem;
			
		},
						
		args: function(func, settings, node, activeSlideNode, newChildOffset, targetSlideOffset) {
			
			this.prevSlideNumber = ($(node).parent().data('args') == undefined) ? undefined : $(node).parent().data('args').prevSlideNumber;
			this.prevSlideObject = ($(node).parent().data('args') == undefined) ? undefined : $(node).parent().data('args').prevSlideObject;
			this.targetSlideNumber = targetSlideOffset + 1;
			this.targetSlideObject = $(node).children(':eq(' + targetSlideOffset + ')');
			this.slideChanged = false;
			
			if(func == 'load') {
				this.targetSlideNumber = undefined;
				this.targetSlideObject = undefined;
			} else if(func == 'start') {
				this.targetSlideNumber = undefined;
				this.targetSlideObject = undefined;
			} else if(func == 'change') {
				this.slideChanged = true;
				this.prevSlideNumber = ($(node).parent().data('args') == undefined) ? settings.startAtSlide : $(node).parent().data('args').currentSlideNumber;
				this.prevSlideObject = $(node).children(':eq(' + this.prevSlideNumber + ')');
			} else if(func == 'complete') {
				this.slideChanged = $(node).parent().data('args').slideChanged;
			}
			
			this.settings = settings;
			this.data = $(node).parent().data('iosslider');
			this.sliderObject = node;
			this.sliderContainerObject = $(node).parent();

			this.currentSlideObject = activeSlideNode;
			this.currentSlideNumber = newChildOffset + 1;
			this.currentSliderOffset = helpers.getSliderOffset(node, 'x') * -1;
			
		},
		
		preventDrag: function(event) {
			event.preventDefault();
		},
		
		preventClick: function(event) {
			event.stopImmediatePropagation();
			return false;
		},
		
		enableClick: function() {
			return true;
		}
        
    }
    
    helpers.setBrowserInfo();
    
    var methods = {
		
		init: function(options, node) {

			has3DTransform = helpers.has3DTransform();
			
			var settings = $.extend(true, {
				'elasticPullResistance': 0.6, 		
				'frictionCoefficient': 0.92,
				'elasticFrictionCoefficient': 0.6,
				'snapFrictionCoefficient': 0.92,
				'snapToChildren': false,
				'snapSlideCenter': false,
				'startAtSlide': 1,
				'scrollbar': false,
				'scrollbarDrag': false,
				'scrollbarHide': true,
				'scrollbarPaging': false,
				'scrollbarLocation': 'top',
				'scrollbarContainer': '',
				'scrollbarOpacity': 0.4,
				'scrollbarHeight': '4px',
				'scrollbarBorder': '0',
				'scrollbarMargin': '5px',
				'scrollbarBackground': '#000',
				'scrollbarBorderRadius': '100px',
				'scrollbarShadow': '0 0 0 #000',
				'scrollbarElasticPullResistance': 0.9,
				'desktopClickDrag': false,
				'keyboardControls': false,
				'tabToAdvance': false,
				'responsiveSlideContainer': true,
				'responsiveSlides': true,
				'navSlideSelector': '',
				'navPrevSelector': '',
				'navNextSelector': '',
				'autoSlideToggleSelector': '',
				'autoSlide': false,
				'autoSlideTimer': 5000,
				'autoSlideTransTimer': 750,
				'autoSlideHoverPause': true,
				'infiniteSlider': false,
				'snapVelocityThreshold': 5,
				'slideStartVelocityThreshold': 0,
				'horizontalSlideLockThreshold': 5,
				'verticalSlideLockThreshold': 3,
				'hardwareAccelBuffer': 5,
				'stageCSS': {
					position: 'relative',
					top: '0',
					left: '0',
					overflow: 'hidden',
					zIndex: 1
				},
				'unselectableSelector': '',
				'onSliderLoaded': '',
				'onSliderUpdate': '',
				'onSliderResize': '',
				'onSlideStart': '',
				'onSlideChange': '',
				'onSlideComplete': ''
			}, options);
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function(i) {
				
				scrollbarNumber++;
				var sliderNumber = scrollbarNumber;
				var scrollTimeouts = new Array();
				iosSliderSettings[sliderNumber] = $.extend({}, settings);
				sliderMin[sliderNumber] = 0;
				sliderMax[sliderNumber] = 0;
				var minTouchpoints = 0;
				var xCurrentScrollRate = new Array(0, 0);
				var yCurrentScrollRate = new Array(0, 0);
				var scrollbarBlockClass = 'scrollbarBlock' + scrollbarNumber;
				var scrollbarClass = 'scrollbar' + scrollbarNumber;
				var scrollbarNode;
				var scrollbarBlockNode;
				var scrollbarStageWidth;
				var scrollbarWidth;
				var containerWidth;
				var containerHeight;
				var centeredSlideOffset = 0;
				var stageNode = $(this);
				var stageWidth;
				var stageHeight;
				var slideWidth;
				var scrollMargin;
				var scrollBorder;
				var lastTouch;
				var isFirstInit = true;
				var newChildOffset = -1;
				var webkitTransformArray = new Array();
				var childrenOffsets;
				var originalOffsets = new Array();
				var scrollbarStartOpacity = 0;
				var xScrollStartPosition = 0;
				var yScrollStartPosition = 0;
				var currentTouches = 0;
				var scrollerNode = $(this).children(':first-child');
				var slideNodes;
				var slideNodeWidths;
				var slideNodeOuterWidths;
				var numberOfSlides = $(scrollerNode).children().not('script').length;
				var xScrollStarted = false;
				var lastChildOffset = 0;
				var isMouseDown = false;
				var currentSlider = undefined;
				var sliderStopLocation = 0;
				var infiniteSliderWidth;
				infiniteSliderOffset[sliderNumber] = 0;
				var shortContent = false;
				onChangeEventLastFired[sliderNumber] = -1;
				var isAutoSlideToggleOn = false;
				iosSliders[sliderNumber] = stageNode;
				isEventCleared[sliderNumber] = false;
				var currentEventNode;
				var intermediateChildOffset = 0;
				var tempInfiniteSliderOffset = 0;
				var preventXScroll = false;
				var snapOverride = false;
				var clickEvent = 'touchstart.iosSliderEvent click.iosSliderEvent';
				var scrollerWidth;
				var anchorEvents;
				var onclickEvents;
				var allScrollerNodeChildren;
				touchLocks[sliderNumber] = false;
				slideTimeouts[sliderNumber] = new Array();
				if(settings.scrollbarDrag) {
					settings.scrollbar = true;
					settings.scrollbarHide = false;
				}
				var $this = $(this);
				var data = $this.data('iosslider');	
				if(data != undefined) return true;

				if(parseInt($().jquery.split('.').join(''), 10) >= 14.2) {
					$(this).delegate('img', 'dragstart.iosSliderEvent', function(event) { event.preventDefault(); });	
				} else {
					$(this).find('img').bind('dragstart.iosSliderEvent', function(event) { event.preventDefault(); });
				}
		   		
				if(settings.infiniteSlider) {
					settings.scrollbar = false;
				}
				
				if(settings.infiniteSlider && (numberOfSlides == 1)) {
					settings.infiniteSlider = false;
				}
						
				if(settings.scrollbar) {
					
					if(settings.scrollbarContainer != '') {
						$(settings.scrollbarContainer).append("<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>");
					} else {
						$(scrollerNode).parent().append("<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>");
					}
				
				}
				
				if(!init()) return true;
				
				$(this).find('a').bind('mousedown', helpers.preventDrag);
				$(this).find("[onclick]").bind('click', helpers.preventDrag).each(function() {
						
					$(this).data('onclick', this.onclick);
				
				});
				
				var newChildOffset = helpers.calcActiveOffset(settings, helpers.getSliderOffset($(scrollerNode), 'x'), childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, undefined, sliderNumber);
				var tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
				
				var args = new helpers.args('load', settings, scrollerNode, $(scrollerNode).children(':eq(' + tempOffset + ')'), tempOffset, tempOffset);
				$(stageNode).data('args', args);

				if(settings.onSliderLoaded != '') {

					settings.onSliderLoaded(args);
					
				}
				
				onChangeEventLastFired[sliderNumber] = tempOffset;

				function init() {
					
					helpers.autoSlidePause(sliderNumber);
					
					anchorEvents = $(scrollerNode).find('a');
					onclickEvents = $(scrollerNode).find('[onclick]');
					allScrollerNodeChildren = $(scrollerNode).find('*');
					
					$(stageNode).css('width', '');
					$(stageNode).css('height', '');
					$(scrollerNode).css('width', '');
					slideNodes = $(scrollerNode).children().not('script').get();
					slideNodeWidths = new Array();
					slideNodeOuterWidths = new Array();
					
					if(settings.responsiveSlides) {
						$(slideNodes).css('width', '');
					}
					
					sliderMax[sliderNumber] = 0;
					childrenOffsets = new Array();
					containerWidth = $(stageNode).parent().width();
					stageWidth = $(stageNode).outerWidth(true);
					
					if(settings.responsiveSlideContainer) {
						stageWidth = ($(stageNode).outerWidth(true) > containerWidth) ? containerWidth : $(stageNode).width();
					}

					$(stageNode).css({
						position: settings.stageCSS.position,
						top: settings.stageCSS.top,
						left: settings.stageCSS.left,
						overflow: settings.stageCSS.overflow,
						zIndex: settings.stageCSS.zIndex,
						'webkitPerspective': 1000,
						'webkitBackfaceVisibility': 'hidden',
						'msTouchAction': 'pan-y',
						width: stageWidth
					});
					
					$(settings.unselectableSelector).css({
						cursor: 'default'
					});
						
					for(var j = 0; j < slideNodes.length; j++) {
						
						slideNodeWidths[j] = $(slideNodes[j]).width();
						slideNodeOuterWidths[j] = $(slideNodes[j]).outerWidth(true);
						var newWidth = slideNodeOuterWidths[j];
						
						if(settings.responsiveSlides) {

							if(slideNodeOuterWidths[j] > stageWidth) {
								
								newWidth = stageWidth + (slideNodeOuterWidths[j] - slideNodeWidths[j]) * -1;
								slideNodeWidths[j] = newWidth;
								slideNodeOuterWidths[j] = stageWidth;
								
							} else {

								newWidth = slideNodeWidths[j];
								
							}
							
							$(slideNodes[j]).css({
								width: newWidth
							});
					
						}
						
						$(slideNodes[j]).css({
							overflow: 'hidden',
							position: 'absolute'
						});
						
						childrenOffsets[j] = sliderMax[sliderNumber] * -1;
						
						sliderMax[sliderNumber] = sliderMax[sliderNumber] + newWidth + (slideNodeOuterWidths[j] - slideNodeWidths[j]);
					
					}
					
					if(settings.snapSlideCenter) {
						centeredSlideOffset = (stageWidth - slideNodeOuterWidths[0]) * 0.5;
						
						if(settings.responsiveSlides && (slideNodeOuterWidths[0] > stageWidth)) {
							centeredSlideOffset = 0;
						}
					}
					
					sliderAbsMax[sliderNumber] = sliderMax[sliderNumber] * 2;
					
					for(var j = 0; j < slideNodes.length; j++) {
						
						helpers.setSliderOffset($(slideNodes[j]), childrenOffsets[j] * -1 + sliderMax[sliderNumber] + centeredSlideOffset);
						
						childrenOffsets[j] = childrenOffsets[j] - sliderMax[sliderNumber];
					
					}
					
					if(!settings.infiniteSlider && !settings.snapSlideCenter) {
					
						for(var i = 0; i < childrenOffsets.length; i++) {
							
							if(childrenOffsets[i] <= ((sliderMax[sliderNumber] * 2 - stageWidth) * -1)) {
								break;
							}
							
							lastChildOffset = i;
							
						}
						
						childrenOffsets.splice(lastChildOffset + 1, childrenOffsets.length);
						childrenOffsets[childrenOffsets.length] = (sliderMax[sliderNumber] * 2 - stageWidth) * -1;
					
					}
					
					for(var i = 0; i < childrenOffsets.length; i++) {
						originalOffsets[i] = childrenOffsets[i];
					}
					
					if(isFirstInit) {
						
						iosSliderSettings[sliderNumber].startAtSlide = (iosSliderSettings[sliderNumber].startAtSlide > childrenOffsets.length) ? childrenOffsets.length : iosSliderSettings[sliderNumber].startAtSlide;
						if(settings.infiniteSlider) {
							iosSliderSettings[sliderNumber].startAtSlide = (iosSliderSettings[sliderNumber].startAtSlide - 1 + numberOfSlides)%numberOfSlides;
							activeChildOffsets[sliderNumber] = (iosSliderSettings[sliderNumber].startAtSlide);
						} else {
							iosSliderSettings[sliderNumber].startAtSlide = ((iosSliderSettings[sliderNumber].startAtSlide - 1) < 0) ? childrenOffsets.length-1 : iosSliderSettings[sliderNumber].startAtSlide;	
							activeChildOffsets[sliderNumber] = (iosSliderSettings[sliderNumber].startAtSlide-1);
						}
						activeChildInfOffsets[sliderNumber] = activeChildOffsets[sliderNumber];
					}
					
					sliderMin[sliderNumber] = sliderMax[sliderNumber] + centeredSlideOffset;

					$(scrollerNode).css({
						position: 'relative',
						cursor: grabOutCursor,
						'webkitPerspective': '0',
						'webkitBackfaceVisibility': 'hidden',
						width: sliderMax[sliderNumber] + 'px'
					});
					
					scrollerWidth = sliderMax[sliderNumber];
					sliderMax[sliderNumber] = sliderMax[sliderNumber] * 2 - stageWidth + centeredSlideOffset * 2;
					
					shortContent = (((scrollerWidth + centeredSlideOffset) < stageWidth) || (stageWidth == 0)) ? true : false;

					if(shortContent) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
					}
					
					containerHeight = $(stageNode).parent().outerHeight(true);
					stageHeight = $(stageNode).height();
					
					if(settings.responsiveSlideContainer) {
						stageHeight = (stageHeight > containerHeight) ? containerHeight : stageHeight;
					}
					
					$(stageNode).css({
						height: stageHeight
					});

					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);
					
					if(settings.infiniteSlider && !shortContent) {
						
						var currentScrollOffset = helpers.getSliderOffset($(scrollerNode), 'x');
						var count = (infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides * -1;
						
						while(count < 0) {
							
							var lowSlideNumber = 0;
							var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
							$(slideNodes).each(function(i) {
								
								if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
									lowSlideOffset = helpers.getSliderOffset(this, 'x');
									lowSlideNumber = i;
								}
								
							});
							
							var newOffset = sliderMin[sliderNumber] + scrollerWidth;
							helpers.setSliderOffset($(slideNodes)[lowSlideNumber], newOffset);
							
							sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset;
							sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

							childrenOffsets.splice(0, 1);
							childrenOffsets.splice(childrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset);

							count++;
							
						}
						
						while(((childrenOffsets[0] * -1 - scrollerWidth + centeredSlideOffset) > 0) && settings.snapSlideCenter && isFirstInit) {
							
							var highSlideNumber = 0;
							var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
							$(slideNodes).each(function(i) {
								
								if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
									highSlideOffset = helpers.getSliderOffset(this, 'x');
									highSlideNumber = i;
								}
								
							});

							var newOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber];
							helpers.setSliderOffset($(slideNodes)[highSlideNumber], newOffset);
							
							childrenOffsets.splice(0, 0, newOffset * -1 + centeredSlideOffset);
							childrenOffsets.splice(childrenOffsets.length-1, 1);

							sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
							sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

							infiniteSliderOffset[sliderNumber]--;
							activeChildOffsets[sliderNumber]++;
							
						}
						
						while(currentScrollOffset <= (sliderMax[sliderNumber] * -1)) {
							
							var lowSlideNumber = 0;
							var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
							$(slideNodes).each(function(i) {
								
								if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
									lowSlideOffset = helpers.getSliderOffset(this, 'x');
									lowSlideNumber = i;
								}
								
							});
							
							var newOffset = sliderMin[sliderNumber] + scrollerWidth;
							helpers.setSliderOffset($(slideNodes)[lowSlideNumber], newOffset);	
							
							sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset;
							sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

							childrenOffsets.splice(0, 1);
							childrenOffsets.splice(childrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset);

							infiniteSliderOffset[sliderNumber]++;
							activeChildOffsets[sliderNumber]--;
							
						}
					
					}
					
					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);
					
					helpers.updateBackfaceVisibility(slideNodes, sliderNumber, numberOfSlides, settings);
					
					if(!settings.desktopClickDrag) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
					}
					
					if(settings.scrollbar) {
						
						$('.' + scrollbarBlockClass).css({ 
							margin: settings.scrollbarMargin,
							overflow: 'hidden',
							display: 'none'
						});
						
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({ 
							border: settings.scrollbarBorder
						});
						
						scrollMargin = parseInt($('.' + scrollbarBlockClass).css('marginLeft')) + parseInt($('.' + scrollbarBlockClass).css('marginRight'));
						scrollBorder = parseInt($('.' + scrollbarBlockClass + ' .' + scrollbarClass).css('borderLeftWidth'), 10) + parseInt($('.' + scrollbarBlockClass + ' .' + scrollbarClass).css('borderRightWidth'), 10);
						scrollbarStageWidth = (settings.scrollbarContainer != '') ? $(settings.scrollbarContainer).width() : stageWidth;
						scrollbarWidth = (stageWidth / scrollerWidth) * (scrollbarStageWidth - scrollMargin);
		
						if(!settings.scrollbarHide) {
							scrollbarStartOpacity = settings.scrollbarOpacity;
						}
						
						$('.' + scrollbarBlockClass).css({ 
							position: 'absolute',
							left: 0,
							width: scrollbarStageWidth - scrollMargin + 'px',
							margin: settings.scrollbarMargin
						});
						
						if(settings.scrollbarLocation == 'top') {
							$('.' + scrollbarBlockClass).css('top', '0');
						} else {
							$('.' + scrollbarBlockClass).css('bottom', '0');
						}

						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({ 
							borderRadius: settings.scrollbarBorderRadius,
							background: settings.scrollbarBackground,
							height: settings.scrollbarHeight,
							width: scrollbarWidth - scrollBorder + 'px',
							minWidth: settings.scrollbarHeight,
							border: settings.scrollbarBorder,
							'webkitPerspective': 1000,
							'webkitBackfaceVisibility': 'hidden',
							'position': 'relative',
							opacity: scrollbarStartOpacity,
							filter: 'alpha(opacity:' + (scrollbarStartOpacity * 100) + ')',
							boxShadow: settings.scrollbarShadow
						});
						
						helpers.setSliderOffset($('.' + scrollbarBlockClass + ' .' + scrollbarClass), Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1 - sliderMin[sliderNumber] + centeredSlideOffset) / (sliderMax[sliderNumber] - sliderMin[sliderNumber] + centeredSlideOffset) * (scrollbarStageWidth - scrollMargin - scrollbarWidth)));
		
						$('.' + scrollbarBlockClass).css({
							display: 'block'
						});
						
						scrollbarNode = $('.' + scrollbarBlockClass + ' .' + scrollbarClass);
						scrollbarBlockNode = $('.' + scrollbarBlockClass);						
						
					}
					
					if(settings.scrollbarDrag && !shortContent) {
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({
							cursor: grabOutCursor
						});
					}
					
					if(settings.infiniteSlider) {
					
						infiniteSliderWidth = (sliderMax[sliderNumber] + stageWidth) / 3;
						
					}
					
					if(settings.navSlideSelector != '') {
								
						$(settings.navSlideSelector).each(function(j) {
						
							$(this).css({
								cursor: 'pointer'
							});
							
							$(this).unbind(clickEvent).bind(clickEvent, function(e) {
								
								if(e.type == 'touchstart') {
									$(this).unbind('click.iosSliderEvent');
								} else {
									$(this).unbind('touchstart.iosSliderEvent');
								}
								clickEvent = e.type + '.iosSliderEvent';

								helpers.changeSlide(j, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
								
							});
						
						});
								
					}	
					
					if(settings.navPrevSelector != '') {
						
						$(settings.navPrevSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navPrevSelector).unbind(clickEvent).bind(clickEvent, function(e) {	
							
							if(e.type == 'touchstart') {
								$(this).unbind('click.iosSliderEvent');
							} else {
								$(this).unbind('touchstart.iosSliderEvent');
							}
							clickEvent = e.type + '.iosSliderEvent';

							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
											
							if((slide > 0) || settings.infiniteSlider) {
								helpers.changeSlide(slide - 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
							}
						});
					
					}
					
					if(settings.navNextSelector != '') {
						
						$(settings.navNextSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navNextSelector).unbind(clickEvent).bind(clickEvent, function(e) {
							
							if(e.type == 'touchstart') {
								$(this).unbind('click.iosSliderEvent');
							} else {
								$(this).unbind('touchstart.iosSliderEvent');
							}
							clickEvent = e.type + '.iosSliderEvent';
							
							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
							
							if((slide < childrenOffsets.length-1) || settings.infiniteSlider) {
								helpers.changeSlide(slide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
							}
						});
					
					}
					
					if(settings.autoSlide && !shortContent) {
						
						if(settings.autoSlideToggleSelector != '') {
						
							$(settings.autoSlideToggleSelector).css({
								cursor: 'pointer'
							});
							
							$(settings.autoSlideToggleSelector).unbind(clickEvent).bind(clickEvent, function(e) {
								
								if(e.type == 'touchstart') {
									$(this).unbind('click.iosSliderEvent');
								} else {
									$(this).unbind('touchstart.iosSliderEvent');
								}
								clickEvent = e.type + '.iosSliderEvent';
							
								if(!isAutoSlideToggleOn) {
								
									helpers.autoSlidePause(sliderNumber);
									isAutoSlideToggleOn = true;
									
									$(settings.autoSlideToggleSelector).addClass('on');
									
								} else {
									
									helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
									
									isAutoSlideToggleOn = false;
									
									$(settings.autoSlideToggleSelector).removeClass('on');
									
								}
							
							});
						
						}
					
					}
					
					helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);

					$(stageNode).bind('mouseleave.iosSliderEvent', function() {
						
						if(isAutoSlideToggleOn) return true;
						
						helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
						
					});
					
					$(stageNode).bind('touchend.iosSliderEvent', function() {
						
						if(isAutoSlideToggleOn) return true;
						
						helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
					
					});

					if(settings.autoSlideHoverPause) {
						$(stageNode).bind('mouseenter.iosSliderEvent', function() {
							helpers.autoSlidePause(sliderNumber);
						});
					}
						
					$(stageNode).data('iosslider', {
						obj: $this,
						settings: settings,
						scrollerNode: scrollerNode,
						slideNodes: slideNodes,
						numberOfSlides: numberOfSlides,
						centeredSlideOffset: centeredSlideOffset,
						sliderNumber: sliderNumber,
						originalOffsets: originalOffsets,
						childrenOffsets: childrenOffsets,
						sliderMax: sliderMax[sliderNumber],
						scrollbarClass: scrollbarClass,
						scrollbarWidth: scrollbarWidth, 
						scrollbarStageWidth: scrollbarStageWidth,
						stageWidth: stageWidth, 
						scrollMargin: scrollMargin, 
						scrollBorder: scrollBorder, 
						infiniteSliderOffset: infiniteSliderOffset[sliderNumber], 
						infiniteSliderWidth: infiniteSliderWidth,
						slideNodeOuterWidths: slideNodeOuterWidths,
						shortContent: shortContent
					});
					
					isFirstInit = false;
					
					return true;
				
				}
				
				if(settings.scrollbarPaging && settings.scrollbar && !shortContent) {
					
					$(scrollbarBlockNode).css('cursor', 'pointer');
					
					$(scrollbarBlockNode).bind('click.iosSliderEvent', function(e) {
						
						if(this == e.target) {
							
							if(e.pageX > $(scrollbarNode).offset().left) {
								methods.nextPage(stageNode);
							} else {
								methods.prevPage(stageNode);
							}
							
						}
					
					});
					
				}
				
				if(iosSliderSettings[sliderNumber].responsiveSlides || iosSliderSettings[sliderNumber].responsiveSlideContainer) {
					
					var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';
					
					$(window).bind(orientationEvent + '.iosSliderEvent-' + sliderNumber, function() {

						if(!init()) return true;
						
						var args = $(stageNode).data('args');
				
						if(settings.onSliderResize != '') {
					    	settings.onSliderResize(args);
					    }
						
					});
					
				}
				
				if((settings.keyboardControls || settings.tabToAdvance) && !shortContent) {

					$(document).bind('keydown.iosSliderEvent', function(e) {
						
						if((!isIe7) && (!isIe8)) {
							var e = e.originalEvent;
						}
						
						if(e.target.nodeName == 'INPUT') return true;
						
						if(touchLocks[sliderNumber]) return true;
						
						if((e.keyCode == 37) && settings.keyboardControls) {
							
							e.preventDefault();
							
							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;

							if((slide > 0) || settings.infiniteSlider) {
								helpers.changeSlide(slide - 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
							} 
								
						} else if(((e.keyCode == 39) && settings.keyboardControls) || ((e.keyCode == 9) && settings.tabToAdvance)) {
							
							e.preventDefault();
							
							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
								
							if((slide < childrenOffsets.length-1) || settings.infiniteSlider) {
								helpers.changeSlide(slide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings);
							}
								
						}
					
					});
					
				}

				if(isTouch || settings.desktopClickDrag) {
					
					var touchStartFlag = false;
					var touchEndFlag = false;
					var touchSelection = $(scrollerNode);
					var touchSelectionMove = $(scrollerNode);
					var preventDefault = null;
					var isUnselectable = false;
					
					if(settings.scrollbarDrag) {
					
						touchSelection = touchSelection.add(scrollbarNode);
						touchSelectionMove = touchSelectionMove.add(scrollbarBlockNode);

					}
					
					$(touchSelection).bind('mousedown.iosSliderEvent touchstart.iosSliderEvent', function(e) {
						
						//if scroll starts, unbind dom from slider touch override
						$(window).one('scroll.iosSliderEvent', function(e) { touchStartFlag = false; });
						
						if(touchStartFlag) return true;
						touchStartFlag = true;
						touchEndFlag = false;
						
						if(e.type == 'touchstart') {
							$(touchSelectionMove).unbind('mousedown.iosSliderEvent');
						} else {
							$(touchSelectionMove).unbind('touchstart.iosSliderEvent');
						}
						
						if(touchLocks[sliderNumber] || shortContent) {
							touchStartFlag = false;
							xScrollStarted = false;
							return true;
						}
						
						isUnselectable = helpers.isUnselectable(e.target, settings);
						
						if(isUnselectable) {
							touchStartFlag = false;
							xScrollStarted = false;
							return true;
						}
						
						currentEventNode = ($(this)[0] === $(scrollbarNode)[0]) ? scrollbarNode : scrollerNode;

						if((!isIe7) && (!isIe8)) {
							var e = e.originalEvent;
						}

						helpers.autoSlidePause(sliderNumber);
						
						allScrollerNodeChildren.unbind('.disableClick');
						
						if(e.type == 'touchstart') {
							
							eventX = e.touches[0].pageX;
							eventY = e.touches[0].pageY;
							
						} else {
						
							if (window.getSelection) {
								if (window.getSelection().empty) {
									window.getSelection().empty();
								} else if (window.getSelection().removeAllRanges) {
									window.getSelection().removeAllRanges();
								}
							} else if (document.selection) {
								if(isIe8) {
									try { document.selection.empty(); } catch(e) { /* absorb ie8 bug */ }
								} else {
									document.selection.empty();
								}
							}
							
							eventX = e.pageX;
							eventY = e.pageY;
							
							isMouseDown = true;
							currentSlider = scrollerNode;

							$(this).css({
								cursor: grabInCursor
							});

						}
						
						xCurrentScrollRate = new Array(0, 0);
						yCurrentScrollRate = new Array(0, 0);
						xScrollDistance = 0;
						xScrollStarted = false;
						
						for(var j = 0; j < scrollTimeouts.length; j++) {
							clearTimeout(scrollTimeouts[j]);
						}
						
						var scrollPosition = helpers.getSliderOffset(scrollerNode, 'x');

						if(scrollPosition > (sliderMin[sliderNumber] * -1 + centeredSlideOffset + scrollerWidth)) {
							
							scrollPosition = sliderMin[sliderNumber] * -1 + centeredSlideOffset + scrollerWidth;

							helpers.setSliderOffset($('.' + scrollbarClass), scrollPosition);
							
							$('.' + scrollbarClass).css({
								width: (scrollbarWidth - scrollBorder) + 'px'
							});
							
						} else if(scrollPosition < (sliderMax[sliderNumber] * -1)) {
						
							scrollPosition = sliderMax[sliderNumber] * -1;

							helpers.setSliderOffset($('.' + scrollbarClass), (scrollbarStageWidth - scrollMargin - scrollbarWidth));
							
							$('.' + scrollbarClass).css({
								width: (scrollbarWidth - scrollBorder) + 'px'
							});
							
						}
						
						var scrollbarSubtractor = ($(this)[0] === $(scrollbarNode)[0]) ? (sliderMin[sliderNumber]) : 0;
						
						xScrollStartPosition = (helpers.getSliderOffset(this, 'x') - eventX - scrollbarSubtractor) * -1;
						yScrollStartPosition = (helpers.getSliderOffset(this, 'y') - eventY) * -1;
						
						xCurrentScrollRate[1] = eventX;
						yCurrentScrollRate[1] = eventY;
						
						snapOverride = false;

					});
					
					$(document).bind('touchmove.iosSliderEvent mousemove.iosSliderEvent', function(e) {
						
						if((!isIe7) && (!isIe8)) {
							var e = e.originalEvent;
						}
						
						if(touchLocks[sliderNumber] || shortContent || isUnselectable || !touchStartFlag) return true;
						
						var edgeDegradation = 0;

						if(e.type == 'touchmove') {
						
							eventX = e.touches[0].pageX;
							eventY = e.touches[0].pageY;
							
						} else {
						
							if(window.getSelection) {
								if(window.getSelection().empty) {
									//window.getSelection().empty(); /* removed to enable input fields within the slider */
								} else if(window.getSelection().removeAllRanges) {
									window.getSelection().removeAllRanges();
								}
							} else if(document.selection) {
								if(isIe8) {
									try { document.selection.empty(); } catch(e) { /* absorb ie8 bug */ }
								} else {
									document.selection.empty();
								}
							}
						
							eventX = e.pageX;
							eventY = e.pageY;
							
							if(!isMouseDown) {
								return true;
							}
							
							if(!isIe) {
								if((typeof e.webkitMovementX != 'undefined' || typeof e.webkitMovementY != 'undefined') && e.webkitMovementY === 0 && e.webkitMovementX === 0) {
									return true;
								}
							}
							
						}
						
						xCurrentScrollRate[0] = xCurrentScrollRate[1];
						xCurrentScrollRate[1] = eventX;
						xScrollDistance = (xCurrentScrollRate[1] - xCurrentScrollRate[0]) / 2;
						
						yCurrentScrollRate[0] = yCurrentScrollRate[1];
						yCurrentScrollRate[1] = eventY;
						yScrollDistance = (yCurrentScrollRate[1] - yCurrentScrollRate[0]) / 2;

						if(!xScrollStarted) {

							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
							var args = new helpers.args('start', settings, scrollerNode, $(scrollerNode).children(':eq(' + slide + ')'), slide, undefined);
							$(stageNode).data('args', args);

							if(settings.onSlideStart != '') {
								settings.onSlideStart(args);
							}
							
						}
						
						if(((yScrollDistance > settings.verticalSlideLockThreshold) || (yScrollDistance < (settings.verticalSlideLockThreshold * -1))) && (e.type == 'touchmove') && (!xScrollStarted)) {
						
							preventXScroll = true;
							
						}
						
						if(((xScrollDistance > settings.horizontalSlideLockThreshold) || (xScrollDistance < (settings.horizontalSlideLockThreshold * -1))) && (e.type == 'touchmove')) {
						
							e.preventDefault();
							
						}
						
						if(((xScrollDistance > settings.slideStartVelocityThreshold) || (xScrollDistance < (settings.slideStartVelocityThreshold * -1)))) {
						
							xScrollStarted = true;
						
						}
						
						if(xScrollStarted && !preventXScroll) {
							
							var scrollPosition = helpers.getSliderOffset(scrollerNode, 'x');
							var scrollbarSubtractor = ($(currentEventNode)[0] === $(scrollbarNode)[0]) ? (sliderMin[sliderNumber]) : centeredSlideOffset;
							var scrollbarMultiplier = ($(currentEventNode)[0] === $(scrollbarNode)[0]) ? ((sliderMin[sliderNumber] - sliderMax[sliderNumber] - centeredSlideOffset) / (scrollbarStageWidth - scrollMargin - scrollbarWidth)) : 1;
							var elasticPullResistance = ($(currentEventNode)[0] === $(scrollbarNode)[0]) ? settings.scrollbarElasticPullResistance : settings.elasticPullResistance;
							var snapCenteredSlideOffset = (settings.snapSlideCenter && ($(currentEventNode)[0] === $(scrollbarNode)[0])) ? 0 : centeredSlideOffset;
							var snapCenteredSlideOffsetScrollbar = (settings.snapSlideCenter && ($(currentEventNode)[0] === $(scrollbarNode)[0])) ? centeredSlideOffset : 0;

							if(e.type == 'touchmove') {
								if(currentTouches != e.touches.length) {
									xScrollStartPosition = (scrollPosition * -1) + eventX;
								}
								
								currentTouches = e.touches.length;
							}

							if(settings.infiniteSlider) {

								if(scrollPosition <= (sliderMax[sliderNumber] * -1)) {
									
									var scrollerWidth = $(scrollerNode).width();
									
									if(scrollPosition <= (sliderAbsMax[sliderNumber] * -1)) {

										var sum = originalOffsets[0] * -1;
										$(slideNodes).each(function(i) {
											
											helpers.setSliderOffset($(slideNodes)[i], sum + centeredSlideOffset);
											if(i < childrenOffsets.length) {
												childrenOffsets[i] = sum * -1;
											}
											sum = sum + slideNodeOuterWidths[i];
											
										});
										
										xScrollStartPosition = xScrollStartPosition - childrenOffsets[0] * -1;
										sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
										infiniteSliderOffset[sliderNumber] = 0;
										
									} else {

										var lowSlideNumber = 0;
										var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
										$(slideNodes).each(function(i) {
											
											if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
												lowSlideOffset = helpers.getSliderOffset(this, 'x');
												lowSlideNumber = i;
											}
											
										});

										var newOffset = sliderMin[sliderNumber] + scrollerWidth;
										helpers.setSliderOffset($(slideNodes)[lowSlideNumber], newOffset);
										
										sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

										childrenOffsets.splice(0, 1);
										childrenOffsets.splice(childrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset);

										infiniteSliderOffset[sliderNumber]++;
										
									}
									
								}
								
								if((scrollPosition >= (sliderMin[sliderNumber] * -1)) || (scrollPosition >= 0)) {
		
									var scrollerWidth = $(scrollerNode).width();
									
									if(scrollPosition >= 0) {

										var sum = originalOffsets[0] * -1;
										$(slideNodes).each(function(i) {
											
											helpers.setSliderOffset($(slideNodes)[i], sum + centeredSlideOffset);
											if(i < childrenOffsets.length) {
												childrenOffsets[i] = sum * -1;
											}
											sum = sum + slideNodeOuterWidths[i];
											
										});
										
										xScrollStartPosition = xScrollStartPosition + childrenOffsets[0] * -1;
										sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
										infiniteSliderOffset[sliderNumber] = numberOfSlides;
										
										while(((childrenOffsets[0] * -1 - scrollerWidth + centeredSlideOffset) > 0)) {
				
											var highSlideNumber = 0;
											var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
											$(slideNodes).each(function(i) {
												
												if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
													highSlideOffset = helpers.getSliderOffset(this, 'x');
													highSlideNumber = i;
												}
												
											});
				
											var newOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber];
											helpers.setSliderOffset($(slideNodes)[highSlideNumber], newOffset);
											
											childrenOffsets.splice(0, 0, newOffset * -1 + centeredSlideOffset);
											childrenOffsets.splice(childrenOffsets.length-1, 1);
				
											sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
											sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
				
											infiniteSliderOffset[sliderNumber]--;
											activeChildOffsets[sliderNumber]++;
											
										}

									} else {

										var highSlideNumber = 0;
										var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
										$(slideNodes).each(function(i) {
											
											if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
												highSlideOffset = helpers.getSliderOffset(this, 'x');
												highSlideNumber = i;
											}
											
										});
										
										var newOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber];
										helpers.setSliderOffset($(slideNodes)[highSlideNumber], newOffset);									

										childrenOffsets.splice(0, 0, newOffset * -1 + centeredSlideOffset);
										childrenOffsets.splice(childrenOffsets.length-1, 1);

										sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

										infiniteSliderOffset[sliderNumber]--;

									}
								
								}
								
							} else {
								
								var scrollerWidth = $(scrollerNode).width();
								
								if(scrollPosition > (sliderMin[sliderNumber] * -1 + centeredSlideOffset)) {

									edgeDegradation = (sliderMin[sliderNumber] + ((xScrollStartPosition - scrollbarSubtractor - eventX + snapCenteredSlideOffset) * -1 * scrollbarMultiplier) - scrollbarSubtractor) * elasticPullResistance * -1 / scrollbarMultiplier;
									
								}
								
								if(scrollPosition < (sliderMax[sliderNumber] * -1)) {
									
									edgeDegradation = (sliderMax[sliderNumber] + snapCenteredSlideOffsetScrollbar + ((xScrollStartPosition - scrollbarSubtractor - eventX) * -1 * scrollbarMultiplier) - scrollbarSubtractor) * elasticPullResistance * -1 / scrollbarMultiplier;
										
								}
							
							}
							
							helpers.setSliderOffset(scrollerNode, ((xScrollStartPosition - scrollbarSubtractor - eventX - edgeDegradation) * -1 * scrollbarMultiplier) - scrollbarSubtractor + snapCenteredSlideOffsetScrollbar);
							
							if(settings.scrollbar) {
								
								helpers.showScrollbar(settings, scrollbarClass);

								scrollbarDistance = Math.floor((xScrollStartPosition - eventX - edgeDegradation - sliderMin[sliderNumber] + snapCenteredSlideOffset) / (sliderMax[sliderNumber] - sliderMin[sliderNumber] + centeredSlideOffset) * (scrollbarStageWidth - scrollMargin - scrollbarWidth) * scrollbarMultiplier);

								var width = scrollbarWidth;
								
								if(scrollbarDistance <= 0) {

									width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1);
									
									helpers.setSliderOffset($('.' + scrollbarClass), 0);
									
									$('.' + scrollbarClass).css({
										width: width + 'px'
									});
									
								} else if(scrollbarDistance >= (scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarWidth)) {

									width = scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarDistance;
									
									helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
									
									$('.' + scrollbarClass).css({
										width: width + 'px'
									});
									
								} else {
								
									helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
									
								}
								
							}
							
							if(e.type == 'touchmove') {
								lastTouch = e.touches[0].pageX;
							}
							
							var slideChanged = false;
							var newChildOffset = helpers.calcActiveOffset(settings, (xScrollStartPosition - eventX - edgeDegradation) * -1, childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, undefined, sliderNumber);
							var tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
							
							if(settings.infiniteSlider) {
								
								if(tempOffset != activeChildInfOffsets[sliderNumber]) {
									slideChanged = true;
								}
									
							} else {
							
								if(newChildOffset != activeChildOffsets[sliderNumber]) {
									slideChanged = true;
								}
							
							}

							if(slideChanged) {
								
								activeChildOffsets[sliderNumber] = newChildOffset;
								activeChildInfOffsets[sliderNumber] = tempOffset;
								snapOverride = true;
								
								var args = new helpers.args('change', settings, scrollerNode, $(scrollerNode).children(':eq(' + tempOffset + ')'), tempOffset, tempOffset);
								$(stageNode).data('args', args);
								
								if(settings.onSlideChange != '') {
									settings.onSlideChange(args);
								}
								
								helpers.updateBackfaceVisibility(slideNodes, sliderNumber, numberOfSlides, settings);
								
							}
							
						}
						
					});
					
					var eventObject = $(window);
					
					if(isIe8 || isIe7) {
						var eventObject = $(document); 
					}
					
					$(touchSelection).bind('touchcancel.iosSliderEvent touchend.iosSliderEvent', function(e) {
						
						var e = e.originalEvent;
						
						if(touchEndFlag) return false;
						touchEndFlag = true;
						
						if(touchLocks[sliderNumber] || shortContent) return true;
						
						if(isUnselectable) return true;
						
						if(e.touches.length != 0) {
							
							for(var j = 0; j < e.touches.length; j++) {
								
								if(e.touches[j].pageX == lastTouch) {
									helpers.slowScrollHorizontal(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings);
								}
								
							}
							
						} else {
							
							helpers.slowScrollHorizontal(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings);
							
						}
						
						preventXScroll = false;
						touchStartFlag = false;
						
						return true;
						
					});
						
					$(eventObject).bind('mouseup.iosSliderEvent-' + sliderNumber, function(e) {
						
						if(xScrollStarted) {
							anchorEvents.unbind('click.disableClick').bind('click.disableClick', helpers.preventClick);
						} else {
							anchorEvents.unbind('click.disableClick').bind('click.disableClick', helpers.enableClick);
						}
						
						onclickEvents.each(function() {
							
							this.onclick = function(event) {
								if(xScrollStarted) { 
									return false;
								}
								
								if($(this).data('onclick')) $(this).data('onclick').call(this, event || window.event);
							}
							
							this.onclick = $(this).data('onclick');
							
						});
						
						if(parseFloat($().jquery) >= 1.8) {
							
							allScrollerNodeChildren.each(function() {
									
								var clickObject = $._data(this, 'events');
								
								if(clickObject != undefined) {
									if(clickObject.click != undefined) {

										if(clickObject.click[0].namespace != 'iosSliderEvent') {
											
											if(!xScrollStarted) { 
												return false;
											}

											$(this).one('click.disableClick', helpers.preventClick);
										    var handlers = $._data(this, 'events').click;
										    var handler = handlers.pop();
										    handlers.splice(0, 0, handler);
											
										}
										
									}
								}
								
							});
						
						} else if(parseFloat($().jquery) >= 1.6) {
						
							allScrollerNodeChildren.each(function() {
									
								var clickObject = $(this).data('events');
								
								if(clickObject != undefined) {
									if(clickObject.click != undefined) {

										if(clickObject.click[0].namespace != 'iosSliderEvent') {
											
											if(!xScrollStarted) { 
												return false;
											}
										
											$(this).one('click.disableClick', helpers.preventClick);
										    var handlers = $(this).data('events').click;
										    var handler = handlers.pop();
										    handlers.splice(0, 0, handler);
											
										}
										
									}
								}
								
							});
						
						}
						
						if(!isEventCleared[sliderNumber]) {
						
							if(shortContent) return true;
							
							if(settings.desktopClickDrag) {
								$(scrollerNode).css({
									cursor: grabOutCursor
								});
							}
							
							if(settings.scrollbarDrag) {
								$(scrollbarNode).css({
									cursor: grabOutCursor
								});
							}
							
							isMouseDown = false;
							
							if(currentSlider == undefined) {
								return true;
							}

							helpers.slowScrollHorizontal(currentSlider, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings);
							
							currentSlider = undefined;
						
						}
						
						preventXScroll = false;
						touchStartFlag = false;
						
					});
				
				}
				
			});	
			
		},
		
		destroy: function(clearStyle, node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				if(clearStyle == undefined) {
		    		clearStyle = true;
		    	}
		    	
	    		helpers.autoSlidePause(data.sliderNumber);
		    	isEventCleared[data.sliderNumber] = true;
		    	$(window).unbind('.iosSliderEvent-' + data.sliderNumber);
		    	$(document).unbind('.iosSliderEvent-' + data.sliderNumber);
		    	$(document).unbind('keydown.iosSliderEvent');
		    	$(this).unbind('.iosSliderEvent');
	    		$(this).children(':first-child').unbind('.iosSliderEvent');
	    		$(this).children(':first-child').children().unbind('.iosSliderEvent');
		    	$(data.settings.scrollbarBlockNode).unbind('.iosSliderEvent');
		    	
		    	if(clearStyle) {
	    			$(this).attr('style', '');
		    		$(this).children(':first-child').attr('style', '');
		    		$(this).children(':first-child').children().attr('style', '');

		    		$(data.settings.navSlideSelector).attr('style', '');
		    		$(data.settings.navPrevSelector).attr('style', '');
		    		$(data.settings.navNextSelector).attr('style', '');
		    		$(data.settings.autoSlideToggleSelector).attr('style', '');
		    		$(data.settings.unselectableSelector).attr('style', '');
	    		}
	    		
	    		if(data.settings.scrollbar) {
	    			$('.scrollbarBlock' + data.sliderNumber).remove();
	    		}
	    		
	    		var scrollTimeouts = slideTimeouts[data.sliderNumber];
	    		
	    		for(var i = 0; i < scrollTimeouts.length; i++) {
					clearTimeout(scrollTimeouts[i]);
				}
	    		
	    		$this.removeData('iosslider');
	    		$this.removeData('args');
		    	
			});
		
		},
		
		update: function(node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {

				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				data.settings.startAtSlide = $this.data('args').currentSlideNumber;
				
				methods.destroy(false, this);
				
				if((data.numberOfSlides != 1) && data.settings.infiniteSlider) {
				 	data.settings.startAtSlide = (activeChildOffsets[data.sliderNumber] + 1 + infiniteSliderOffset[data.sliderNumber] + data.numberOfSlides)%data.numberOfSlides;
				}

				methods.init(data.settings, this);
				
				var args = new helpers.args('update', data.settings, data.scrollerNode, $(data.scrollerNode).children(':eq(' + (data.settings.startAtSlide - 1) + ')'), data.settings.startAtSlide - 1, data.settings.startAtSlide - 1);
				$(data.stageNode).data('args', args);
				
				if(data.settings.onSliderUpdate != '') {
			    	data.settings.onSliderUpdate(args);
			    }
		    	
			});
		
		},
		
		addSlide: function(slideNode, slidePosition) {

			return this.each(function() {
				
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				if($(data.scrollerNode).children().length == 0) {
				
					$(data.scrollerNode).append(slideNode);
					$this.data('args').currentSlideNumber = 1;
					
				} else if(!data.settings.infiniteSlider) {
				
					if(slidePosition <= data.numberOfSlides) {
						$(data.scrollerNode).children(':eq(' + (slidePosition - 1) + ')').before(slideNode);
					} else {
						$(data.scrollerNode).children(':eq(' + (slidePosition - 2) + ')').after(slideNode);
					}
					
					if($this.data('args').currentSlideNumber >= slidePosition) {
						$this.data('args').currentSlideNumber++;
					}
					
				} else {
					
					if(slidePosition == 1) {
						$(data.scrollerNode).children(':eq(0)').before(slideNode);
					} else {
						$(data.scrollerNode).children(':eq(' + (slidePosition - 2) + ')').after(slideNode);
					}
					
					if((infiniteSliderOffset[data.sliderNumber] < -1) && (true)) {
						activeChildOffsets[data.sliderNumber]--;
					}
					
					if($this.data('args').currentSlideNumber >= slidePosition) {
						activeChildOffsets[data.sliderNumber]++;
					}
					
				}
					
				$this.data('iosslider').numberOfSlides++;
				
				methods.update(this);
			
			});
		
		},
		
		removeSlide: function(slideNumber) {
		
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;

				$(data.scrollerNode).children(':eq(' + (slideNumber - 1) + ')').remove();
				if(activeChildOffsets[data.sliderNumber] > (slideNumber - 1)) {
					activeChildOffsets[data.sliderNumber]--;
				}
				
				$this.data('iosslider').numberOfSlides--;

				methods.update(this);
			
			});
		
		},
		
		goToSlide: function(slide, duration, node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {
					
				var $this = $(this);
				var data = $this.data('iosslider');
				
				if((data == undefined) || data.shortContent) return false;
				
				slide = (slide > data.childrenOffsets.length) ? data.childrenOffsets.length - 1 : slide - 1;

				if(duration != undefined)
					data.settings.autoSlideTransTimer = duration;
				
				helpers.changeSlide(slide, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings);

			});
			
		},
		
		prevSlide: function(duration) {
			
			return this.each(function() {
					
				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
				
				var slide = (activeChildOffsets[data.sliderNumber] + infiniteSliderOffset[data.sliderNumber] + data.numberOfSlides)%data.numberOfSlides;
				
				if(duration != undefined)
					data.settings.autoSlideTransTimer = duration;
				
				if((slide > 0) || data.settings.infiniteSlider) {
					helpers.changeSlide(slide - 1, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings);
				}
				
				activeChildOffsets[data.sliderNumber] = slide;

			});
			
		},
		
		nextSlide: function(duration) {
			
			return this.each(function() {
					
				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
				
				var slide = (activeChildOffsets[data.sliderNumber] + infiniteSliderOffset[data.sliderNumber] + data.numberOfSlides)%data.numberOfSlides;
				
				if(duration != undefined)
					data.settings.autoSlideTransTimer = duration;
				
				if((slide < data.childrenOffsets.length-1) || data.settings.infiniteSlider) {
					helpers.changeSlide(slide + 1, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings);
				}
				
				activeChildOffsets[data.sliderNumber] = slide;

			});
			
		},
		
		prevPage: function(duration, node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {

				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				var newOffset = helpers.getSliderOffset(data.scrollerNode, 'x') + data.stageWidth;
				
				if(duration != undefined)
					data.settings.autoSlideTransTimer = duration;
				
				helpers.changeOffset(newOffset, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings);
			
			});
		
		},
		
		nextPage: function(duration, node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {

				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				var newOffset = helpers.getSliderOffset(data.scrollerNode, 'x') - data.stageWidth;
				
				if(duration != undefined)
					data.settings.autoSlideTransTimer = duration;
				
				helpers.changeOffset(newOffset, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings);
			
			});
		
		},
		
		lock: function() {
			
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
				
				$(data.scrollerNode).css({
					cursor: 'default'
				});
				touchLocks[data.sliderNumber] = true;
			
			});
			
		},
		
		unlock: function() {
		
			return this.each(function() {

				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
			
				$(data.scrollerNode).css({
					cursor: grabOutCursor
				});
				touchLocks[data.sliderNumber] = false;
			
			});
		
		},
		
		getData: function() {
		
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
				
				return data;
			
			});	
		
		},
		
		autoSlidePause: function() {
			
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
				
				iosSliderSettings[data.sliderNumber].autoSlide = false;
				
				helpers.autoSlidePause(data.sliderNumber);
				
				return data;
			
			});	
		
		},
		
		autoSlidePlay: function() {
			
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if((data == undefined) || data.shortContent) return false;
				
				iosSliderSettings[data.sliderNumber].autoSlide = true;
				
				helpers.autoSlide($(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings);
				
				return data;
			
			});	
			
		}
	
	}
	
	/* public functions */
	$.fn.iosSlider = function(method) {

		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('invalid method call!');
		}
	
    };

}) (jQuery);
;
!function(a,b,c){function d(b,d){if(b.length){d=a.extend({},b.data(),d);var g=b.children(),h=e(d.mpxUrl);b.prepend(h),g.remove(),b.off(".video-placeholder"),f(b),h.on("load",function(){c.emit("player-initialized",h,d)})}}function e(b,c,d){return a("<iframe/>",{"class":"video-player-mpx",id:"player",src:b,frameborder:"0",scrolling:"no",allowfullscreen:"true",width:c||"100%",height:d||"100%"})}function f(b){var c=a.browser.msie&&+a.browser.version<=8,d=a(document.body||document.documentElement),e=a(window),f=1e3,g=0;g=b.offset().top-e.height()/2+b.height()/2,g+=c?window.pageYOffset||document.documentElement.scrollTop:0,d.animate({scrollTop:g},f)}function g(a){var b=window.location.href+"",c=b.match(a+"=([a-z0-9-]+)");return c&&c[1]}Date.now||function(){return(new Date).getTime()};b.behaviors.videoPlaceholder={attach:function(b){a(".video-placeholder",b).once("video-placeholder").on("click.video-placeholder touchend.video-placeholder",function(b){b.stopPropagation(),d(a(this))}),a("body").once(function(){var b="true"===g("auto");b&&d(a(".video-placeholder"))})}},c.on("change-video",function(b){d(a(".video-placeholder"),b)}),b.videoPlaceholder={},b.videoPlaceholder.fill=d}(jQuery,Drupal,Events);;
!function(a,b,c){"use strict";function d(a,b){this.$el=c(a),c.extend(this,d.defaults,b),this.layout=d.layouts[this.layout_type],this.layout.firstSlide=this.layout.firstSlide||this.layout.slide,this.initialSlide=this.anchorNavigation&&!this.initialSlide?parseInt(f("vc"+this.id),10)||1:1,this.staticItems=this.getStaticItems(),this.slides=[],this.$slider=c(".nmc_carousel_container",a),this.$inner=c('<div class="nmc_inner" />').appendTo(this.$slider),this.$prev=e(c(".btn_prev",a),c.proxy(this,"prevPage")),this.$next=e(c(".btn_next",a),c.proxy(this,"nextPage")),this.$el.on("click",".nmc_item",c.proxy(this,"activateVideo")),this.$el.data("nbc_video_carousel",this),this.fetchSlides&&!this.slides.length&&this.fetch()}function e(a,b){return a.each(function(){var a=!1,d=!1;c(this).on({"click.button":function(a){a.preventDefault(),a.stopPropagation(),d?d=!1:b.call(this)},"touchstart.button":function(b){b.preventDefault(),b.stopPropagation(),a=!0,d=!0},"touchend.button":function(c){a&&(c.preventDefault(),c.stopPropagation(),a=!1,b.call(this))}})})}function f(a){var b=location.hash||g(location.href,/#(.+)/);return g(b,new RegExp(a+"=([^&]+)"))}function g(a,b){var c=a.match(b);return c?c[1]:""}function h(a){return c(".video-player").length?!1:(b.emit("change-video",{mpxUrl:a}),!0)}a.behaviors.nbc_video_carousel={attach:function(b){c(".nbc_mpx_carousel",b).once("nbc_video_carousel",function(){return new d(this,a.settings.video_carousel[c(this).attr("id")])})}},a.nbc_video_carousel=d,d.defaults={id:null,feedUrl:"",anchorNavigation:!1,openInPlayer:!1,openInModal:!1,fetchSlides:!0,initialSlide:0,slidesPerRequest:4,slidesBeforeLoadMoreAction:2,layout_type:"3up",customLinkPattern:"",modalLinkPattern:"/bare/video/@fid",videoTemplate:"video-carousel-item-show"},d.layouts={"1up":{slide:["medium"]},"2up":{slide:["big","big"]},"3up":{slide:["medium","medium","medium"]},"4up":{slide:["big","big","big","big"]},"4up_medium":{slide:["medium","medium","medium","medium"]},"5up":{slide:["big","big","medium","medium","medium"]},"6up":{slide:["medium","medium","medium","medium","medium","medium"]},"8up":{slide:["big","big","medium","medium","medium","medium","medium","medium"]},"9up":{slide:["medium","medium","medium","medium","medium","medium","medium","medium","medium"]},"13up":{slide:["big","small","small","small","small","small","small","small","small","small","small","small","small"]},"5upto8up":{firstSlide:["big","small","small","small","small"],slide:["small","small","small","small","small","small","small","small"]}},d.prototype.$el=null,d.prototype.layout=null,d.prototype.hasData=!1,d.prototype.hasSlider=!1,d.prototype.currentSlide=1,d.prototype.slides=null,d.prototype.$slider=null,d.prototype.$inner=null,d.prototype.$prev=null,d.prototype.$next=null,d.prototype.staticItems=null,d.prototype.isFetchLocked=!1,d.prototype.itemCount=0,d.prototype.isAllItemsLoaded=!1,d.prototype.updateSlider=function(a){a.currentSlideNumber&&(this.currentSlide=parseInt(a.currentSlideNumber,10)),this.currentSlide>=this.slides.length-this.slidesBeforeLoadMoreAction&&this.fetch(),this.updateNavigation(),this.openInModal&&this.$inner.find(".nmc_item__inline-player").remove()},d.prototype.updateNavigation=function(){this.$prev.toggleClass("navigation-disabled",this.currentSlide<=1),this.$next.toggleClass("navigation-disabled",this.currentSlide>this.slides.length-1)},d.prototype.nextPage=function(){this.goToPage(this.currentSlide+1)},d.prototype.prevPage=function(){this.goToPage(this.currentSlide-1)},d.prototype.goToPage=function(a){return a===this.currentSlide||a>this.slides.length||!this.hasSlider?!1:(1>a&&(a=1),void(this.hasSlider&&this.$slider.iosSlider("goToSlide",a)))},d.prototype.reload=function(){this.slides=[],this.currentSlide=1,this.$el.addClass("loading"),this.$slider.iosSlider("destroy"),this.$inner.empty().remove(),this.$inner=c('<div class="nmc_inner" />').appendTo(this.$slider),this.hasData=!1,this.hasSlider=!1,this.isFetchLocked=!1,this.isAllItemsLoaded=!1,this.itemCount=0,this.layout=d.layouts[this.layout_type],this.layout.firstSlide=this.layout.firstSlide||this.layout.slide,this.fetch()},d.prototype.fetch=function(){return this.isFetchLocked?c.Deferred().reject("Already running fetch routine."):this.isAllItemsLoaded?c.Deferred().reject("Already finished pulling in all items."):this.feedUrl?(this.lockFetch(),c.getJSON(this.feedUrl,{range:this.getNextSlideRange()}).pipe(c.proxy(this,"renderSlides")).done(c.proxy(this,"renderCarousel")).fail(c.proxy(this,"renderFailure")).always(c.proxy(this,"updateNavigation")).always(c.proxy(this,"unlockFetch"))):c.Deferred().reject("Unable to pull data from invalid feedUrl.")},d.prototype.renderCarousel=function(){this.hasData||(this.$slider.data("iosslider")&&this.$slider.iosSlider("destroy"),this.$el.removeClass("loading no-content"),1===this.slides.length?(this.$prev.hide(),this.$next.hide()):(this.$slider.iosSlider({snapToChildren:!0,startAtSlide:this.initialSlide,onSlideChange:c.proxy(this,"updateSlider")}),this.$prev.show(),this.$next.show(),this.currentSlide=this.initialSlide,this.hasSlider=!0),this.hasData=!0)},d.prototype.renderFailure=function(){this.isAllItemsLoaded=!0,this.hasData||(this.$el.addClass("no-content").removeClass("loading"),this.hasData=!0)},d.prototype.renderSlides=function(b){var d,e,f=b&&b.entries||[],g=[],h=this.slides.length,i=0,j=0;if(this.staticItems.length&&!this.slides.length&&(f=c.merge(c.merge([],this.staticItems),f)),!f.length)return c.Deferred().reject("No data");for(j=0;j<f.length;j+=i)d=h?this.layout.slide:this.layout.firstSlide,i=d.length,e=f.slice(j,j+i),g.push(this.renderSlide(h,d,e)),h++;return this.itemCount+=f.length,this.isAllItemsLoaded=b.entryCount<=this.itemCount,c.map(g,c.proxy(this,"addSlide")),c.when.apply(c,g).done(c.proxy(this,"setActiveVideo",c(".video-player").data("mpx-fid"))).done(c.proxy(a,"attachBehaviors",this.$inner,a.settings))},d.prototype.getStaticItems=function(){var a=c(".nmc_static_item",this.$el);return a.length?(a.remove(),c.map(a,function(a){return{html:c(a).html()}})):[]},d.prototype.renderSlide=function(a,b,d){var e=this;return c('<div class="nmc_slide"/>').dust(e.videoTemplate,{videoItems:c.map(b,function(c,f){var g=d[f]||{images:e.defaultImages};return g.size=b[f]||"big",g.html?g:(g.link=e.customLinkPattern||g.link||"",g.link=g.link.replace("%videoId",g.fid),e.anchorNavigation&&-1===g.link.indexOf("#")&&(g.link+="#vc"+e.id+"="+(a+1)),g.isLocked="auth"===g.restricted,g)})})},d.prototype.addSlide=function(a){this.hasSlider?this.$slider.iosSlider("addSlide",a,this.slides.length+1):this.$inner.append(a),this.slides.push(a)},d.prototype.activateVideo=function(b){{var d=c(b.currentTarget),e=d.data();c("a",d)}if(e.playerUrl&&e.fid&&!e.external){if(this.openInPlayer){var f=h(e.playerUrl);f&&(this.setActiveVideo(e.fid),b.preventDefault())}if(this.openInModal){var g=c(window).width()<=640,i=navigator.userAgent.match(/iPhone|iPod/i);if(i){d.find(".nmc_item__inline-player").remove();var j=c('<div class="nmc_item__inline-player">');d.append(j),a.videoPlaceholder.fill(j)}else{var k=a.formatString(this.modalLinkPattern,{"@fid":e.fid}),l=(d.find("a").attr("href")||"").match(/\?.+/);l&&!k.match(/\?/)&&(k+=l[0]),c.colorbox({href:k,iframe:!0,scrolling:!1,width:g?"100%":"1024px",height:g?"100%":"726px"})}b.preventDefault()}}},d.prototype.setActiveVideo=function(a){a&&c(".nmc_item",this.$el).each(function(b,d){var e=c(d),f=e.data("fid")===a;e.toggleClass("nmc_item_active",f)})},d.prototype.lockFetch=function(){this.isFetchLocked=!0},d.prototype.unlockFetch=function(){this.isFetchLocked=!1},d.prototype.getNextSlideRange=function(){var a=this.slides.length+1,b=this.slidesPerRequest;return this.slides.length||(b+=this.initialSlide-a),this.getSlideRange(a,b)},d.prototype.getSlideRange=function(a,b){var c=a-1>0?a-1:0,d=this.layout.slide.length,e=this.layout.firstSlide.length-this.staticItems.length,f=1+c*d,g=f+b*d-1;return c>0&&(f+=e-d),g+=e-d,f+"-"+g}}(Drupal,Events,jQuery);;
// features/nbc_video/templates/dust/video-carousel-item-nbc-global.dust
(function(){dust.register("video-carousel-item-nbc-global",body_0);function body_0(chk,ctx){return chk.w("<div class=\"nmc_slide_inner\">").s(ctx.get(["videoItems"], false),ctx,{"block":body_1},{}).w("</div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"nmc_item nmc_item-").f(ctx.get(["$idx"], false),ctx,"h").w(" video-item-").f(ctx.get(["size"], false),ctx,"h").w(" ").x(ctx.get(["isLocked"], false),ctx,{"block":body_2},{}).w("\"data-player-url=\"").f(ctx.get(["playerUrl"], false),ctx,"h").w("\"data-is-full-episode=\"").f(ctx.get(["isFullEpisode"], false),ctx,"h").w("\"data-external=\"").f(ctx.get(["external"], false),ctx,"h").w("\"data-fid=\"").f(ctx.get(["fid"], false),ctx,"h").w("\">").x(ctx.get(["playerUrl"], false),ctx,{"block":body_3},{}).x(ctx.get(["html"], false),ctx,{"block":body_7},{}).nx(ctx.get(["playerUrl"], false),ctx,{"block":body_8},{}).w("</div>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("video-item-is-locked");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<a class=\"mpx-thumbnail-link\"").x(ctx.get(["externalBlank"], false),ctx,{"block":body_4},{}).w(" href=\"").f(ctx.get(["link"], false),ctx,"h").w("\"><span class=\"now-playing\"></span><span class=\"play-icon\"></span><img src=\"").f(ctx.getPath(false, ["images",ctx.get(["size"], false)]),ctx,"h").w("\" alt=\"").f(ctx.get(["description"], false),ctx,"h").w("\"></a><div class=\"video-meta\"><div class=\"video-meta-items\">").x(ctx.get(["showShortName"], false),ctx,{"block":body_5},{}).x(ctx.get(["airdate"], false),ctx,{"block":body_6},{}).w("</div><div class=\"video-title\"><a href=\"").f(ctx.get(["link"], false),ctx,"h").w("\">").f(ctx.get(["shortTitle"], false),ctx,"h",["s"]).w("</a></div></div>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w(" target=\"_blank\"");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w("<div class=\"video-show\"><span>").f(ctx.get(["showShortName"], false),ctx,"h",["s"]).w("</span></div>");}body_5.__dustBody=!0;function body_6(chk,ctx){return chk.w("<div class=\"video-airdate\"><span>").f(ctx.get(["airdate"], false),ctx,"h").w("</span></div>");}body_6.__dustBody=!0;function body_7(chk,ctx){return chk.f(ctx.get(["html"], false),ctx,"h",["s"]);}body_7.__dustBody=!0;function body_8(chk,ctx){return chk.nx(ctx.get(["html"], false),ctx,{"block":body_9},{});}body_8.__dustBody=!0;function body_9(chk,ctx){return chk.w("<div class=\"ghost-thumbnail\"><img src=\"").f(ctx.getPath(false, ["images",ctx.get(["size"], false)]),ctx,"h").w("\"></div>");}body_9.__dustBody=!0;return body_0;})();;
// features/nbc_video/templates/dust/video-carousel-item-nbc-homepage.dust
(function(){dust.register("video-carousel-item-nbc-homepage",body_0);function body_0(chk,ctx){return chk.w("<div class=\"nmc_slide_inner\">").s(ctx.get(["videoItems"], false),ctx,{"block":body_1},{}).w("</div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"nmc_item nmc_item-").f(ctx.get(["$idx"], false),ctx,"h").w(" video-item-").f(ctx.get(["size"], false),ctx,"h").w(" ").x(ctx.get(["isLocked"], false),ctx,{"block":body_2},{}).w("\"data-player-url=\"").f(ctx.get(["playerUrl"], false),ctx,"h").w("\"data-is-full-episode=\"").f(ctx.get(["isFullEpisode"], false),ctx,"h").w("\"data-external=\"").f(ctx.get(["external"], false),ctx,"h").w("\"data-fid=\"").f(ctx.get(["fid"], false),ctx,"h").w("\">").x(ctx.get(["playerUrl"], false),ctx,{"block":body_3},{}).x(ctx.get(["html"], false),ctx,{"block":body_9},{}).nx(ctx.get(["playerUrl"], false),ctx,{"block":body_10},{}).w("</div>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("video-item-is-locked");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<a class=\"mpx-thumbnail-link\"").x(ctx.get(["externalBlank"], false),ctx,{"block":body_4},{}).w(" href=\"").f(ctx.get(["link"], false),ctx,"h").w("\"><span class=\"now-playing\"></span><span class=\"play-icon\"></span><img src=\"").f(ctx.getPath(false, ["images",ctx.get(["size"], false)]),ctx,"h").w("\" alt=\"").f(ctx.get(["description"], false),ctx,"h").w("\"></a><div class=\"video-meta\"><div class=\"video-meta-items\">").x(ctx.get(["showShortName"], false),ctx,{"block":body_5},{}).x(ctx.get(["airdate"], false),ctx,{"block":body_6},{}).w("</div><div class=\"video-meta-subitems\"><span class=\"video-taxonomy\">").x(ctx.get(["season"], false),ctx,{"block":body_7},{}).x(ctx.get(["episode"], false),ctx,{"block":body_8},{}).w(":</span><span class=\"video-title\"><a href=\"").f(ctx.get(["link"], false),ctx,"h").w("\">").f(ctx.get(["shortTitle"], false),ctx,"h",["s"]).w("</a></span></div></div>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w(" target=\"_blank\"");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w("<div class=\"video-show\"><span>").f(ctx.get(["showShortName"], false),ctx,"h",["s"]).w("</span></div>");}body_5.__dustBody=!0;function body_6(chk,ctx){return chk.w("<div class=\"video-airdate\"><span>").f(ctx.get(["airdate"], false),ctx,"h").w("</span></div>");}body_6.__dustBody=!0;function body_7(chk,ctx){return chk.w("S").f(ctx.get(["season"], false),ctx,"h");}body_7.__dustBody=!0;function body_8(chk,ctx){return chk.w(" E").f(ctx.get(["episode"], false),ctx,"h");}body_8.__dustBody=!0;function body_9(chk,ctx){return chk.f(ctx.get(["html"], false),ctx,"h",["s"]);}body_9.__dustBody=!0;function body_10(chk,ctx){return chk.nx(ctx.get(["html"], false),ctx,{"block":body_11},{});}body_10.__dustBody=!0;function body_11(chk,ctx){return chk.w("<div class=\"ghost-thumbnail\"><img src=\"").f(ctx.getPath(false, ["images",ctx.get(["size"], false)]),ctx,"h").w("\"></div>");}body_11.__dustBody=!0;return body_0;})();;
// features/nbc_video/templates/dust/video-carousel-item-show.dust
(function(){dust.register("video-carousel-item-show",body_0);function body_0(chk,ctx){return chk.w("<div class=\"nmc_slide_inner\">").s(ctx.get(["videoItems"], false),ctx,{"block":body_1},{}).w("</div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"nmc_item nmc_item-").f(ctx.get(["$idx"], false),ctx,"h").w(" video-item-").f(ctx.get(["size"], false),ctx,"h").w(" ").x(ctx.get(["isLocked"], false),ctx,{"block":body_2},{}).w("\"data-player-url=\"").f(ctx.get(["playerUrl"], false),ctx,"h").w("\"data-is-full-episode=\"").f(ctx.get(["isFullEpisode"], false),ctx,"h").w("\"data-external=\"").f(ctx.get(["external"], false),ctx,"h").w("\"data-fid=\"").f(ctx.get(["fid"], false),ctx,"h").w("\">").x(ctx.get(["playerUrl"], false),ctx,{"block":body_3},{}).x(ctx.get(["html"], false),ctx,{"block":body_13},{}).nx(ctx.get(["playerUrl"], false),ctx,{"block":body_14},{}).w("</div>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("video-item-is-locked");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<a class=\"mpx-thumbnail-link\"").x(ctx.get(["externalBlank"], false),ctx,{"block":body_4},{}).w(" href=\"").f(ctx.get(["link"], false),ctx,"h").w("\"><span class=\"now-playing\"></span><span class=\"play-icon\"></span><img src=\"").f(ctx.getPath(false, ["images",ctx.get(["size"], false)]),ctx,"h").w("\" alt=\"").f(ctx.get(["description"], false),ctx,"h").w("\"></a><div class=\"video-meta\"><div class=\"video-meta-items\">").x(ctx.get(["isFullEpisode"], false),ctx,{"else":body_5,"block":body_9},{}).w("</div><div class=\"video-title\"><a href=\"").f(ctx.get(["link"], false),ctx,"h").w("\">").f(ctx.get(["shortTitle"], false),ctx,"h",["s"]).w("</a></div></div>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w(" target=\"_blank\"");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.x(ctx.get(["contentType"], false),ctx,{"block":body_6},{}).x(ctx.get(["airdate"], false),ctx,{"block":body_7},{}).x(ctx.get(["duration"], false),ctx,{"block":body_8},{});}body_5.__dustBody=!0;function body_6(chk,ctx){return chk.w("<div class=\"video-category\"><span>").f(ctx.get(["contentType"], false),ctx,"h",["s"]).w("</span></div>");}body_6.__dustBody=!0;function body_7(chk,ctx){return chk.w("<div class=\"video-airdate\"><span>").f(ctx.get(["airdate"], false),ctx,"h").w("</span></div>");}body_7.__dustBody=!0;function body_8(chk,ctx){return chk.w("<div class=\"video-duration\"><span>").f(ctx.get(["duration"], false),ctx,"h").w("</span></div>");}body_8.__dustBody=!0;function body_9(chk,ctx){return chk.x(ctx.get(["season"], false),ctx,{"block":body_10},{}).x(ctx.get(["airdate"], false),ctx,{"block":body_12},{});}body_9.__dustBody=!0;function body_10(chk,ctx){return chk.w("<div class=\"video-season\"><span>S").f(ctx.get(["season"], false),ctx,"h").x(ctx.get(["episode"], false),ctx,{"block":body_11},{}).w("</span></div>");}body_10.__dustBody=!0;function body_11(chk,ctx){return chk.w(" E").f(ctx.get(["episode"], false),ctx,"h");}body_11.__dustBody=!0;function body_12(chk,ctx){return chk.w("<div class=\"video-airdate\"><span>").f(ctx.get(["airdate"], false),ctx,"h").w("</span></div>");}body_12.__dustBody=!0;function body_13(chk,ctx){return chk.f(ctx.get(["html"], false),ctx,"h",["s"]);}body_13.__dustBody=!0;function body_14(chk,ctx){return chk.nx(ctx.get(["html"], false),ctx,{"block":body_15},{});}body_14.__dustBody=!0;function body_15(chk,ctx){return chk.w("<div class=\"ghost-thumbnail\"><img src=\"").f(ctx.getPath(false, ["images",ctx.get(["size"], false)]),ctx,"h").w("\"></div>");}body_15.__dustBody=!0;return body_0;})();;
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: ajax.url,
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }
      return ajax.success(response, status);
    },
    complete: function (response, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(response, ajax.url);
      }
    },
    dataType: 'json',
    type: 'POST'
  };

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = Drupal.checkPlain(v);
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response.hasOwnProperty(i) && response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (response, uri) {
  alert(Drupal.ajaxError(response, uri));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = response.settings || this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  },

  /**
   * Command to add css.
   *
   * Uses the proprietary addImport method if available as browsers which
   * support that method ignore @import statements in dynamically added
   * stylesheets.
   */
  add_css: function (ajax, response, status) {
    // Add the styles in the normal way.
    $('head').prepend(response.data);
    // Add imports in the styles using the addImport method if available.
    var match, importMatch = /^@import url\("(.*)"\);$/igm;
    if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
      importMatch.lastIndex = 0;
      while (match = importMatch.exec(response.data)) {
        document.styleSheets[0].addImport(match[1]);
      }
    }
  },

  /**
   * Command to update a form's build ID.
   */
  updateBuildId: function(ajax, response, status) {
    $('input[name="form_build_id"][value="' + response['old'] + '"]').val(response['new']);
  }
};

})(jQuery);
;
(function (D) {
  var beforeSerialize = D.ajax.prototype.beforeSerialize;
  D.ajax.prototype.beforeSerialize = function (element, options) {
    beforeSerialize.call(this, element, options);
    options.data['ajax_page_state[jquery_version]'] = D.settings.ajaxPageState.jquery_version;
  }
})(Drupal);
;
