(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}var b=new Error("Cannot find module '"+a+"'");
throw b.code="MODULE_NOT_FOUND",b}var f=j[a]={exports:{}};h[a][0].call(f.exports,function(g){var n=h[a][1][g];
return m(n?n:g)},f,f.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(n,m,i){var l=n("./ac-browser/BrowserData");
var j=/applewebkit/i;var k=n("./ac-browser/IE");var o=l.create();o.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!j.test(a):false};o.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(o.name==="IE"){o.IE={documentMode:k.getDocumentMode()}}m.exports=o},{"./ac-browser/BrowserData":2,"./ac-browser/IE":3}],2:[function(g,k,h){g("@marcom/ac-polyfills/Array/prototype.filter");
g("@marcom/ac-polyfills/Array/prototype.some");var j=g("./data");function i(){}i.prototype={__getBrowserVersion:function(c,b){var d;
if(!c||!b){return}var a=j.browser.filter(function(f){return f.identity===b});a.some(function(f){var o=f.versionSearch||b;
var n=c.indexOf(o);if(n>-1){d=parseFloat(c.substring(n+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":4,"@marcom/ac-polyfills/Array/prototype.filter":45,"@marcom/ac-polyfills/Array/prototype.some":49}],3:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],4:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],5:[function(i,h,g){h.exports=function f(a){a=a||window.event;if(a.preventDefault){a.preventDefault()
}else{a.returnValue=false}}},{}],6:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],7:[function(d,g,f){g.exports=8},{}],8:[function(d,g,f){g.exports=11
},{}],9:[function(d,g,f){g.exports=9},{}],10:[function(d,g,f){g.exports=1},{}],11:[function(d,g,f){g.exports=3
},{}],12:[function(k,j,g){var i=k("./internal/validate");j.exports=function h(b,a){i.insertNode(b,true,"insertFirstChild");
i.parentNode(a,true,"insertFirstChild");if(!a.firstChild){return a.appendChild(b)
}return a.insertBefore(b,a.firstChild)}},{"./internal/validate":14}],13:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":17}],14:[function(z,B,w){var D=z("./isNodeType");
var C=z("../COMMENT_NODE");var v=z("../DOCUMENT_FRAGMENT_NODE");var x=z("../ELEMENT_NODE");
var y=z("../TEXT_NODE");var t=[x,y,C,v];var A=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[x,y,C];var u=" must be an Element, TextNode, or Comment";var s=[x,v];var r=" must be an Element, or Document Fragment";
var E=" must have a parentNode";B.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!D(d,s)){throw new TypeError(b+": "+c+r)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!D(d,q)){throw new TypeError(b+": "+c+u)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!D(d,t)){throw new TypeError(b+": "+c+A)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+E)}}}},{"../COMMENT_NODE":7,"../DOCUMENT_FRAGMENT_NODE":8,"../ELEMENT_NODE":10,"../TEXT_NODE":11,"./isNodeType":13}],15:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_FRAGMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_FRAGMENT_NODE":8,"./internal/isNodeType":13}],16:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./ELEMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./ELEMENT_NODE":10,"./internal/isNodeType":13}],17:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],18:[function(k,j,g){var i=k("./internal/validate");j.exports=function h(a){i.childNode(a,true,"remove");
if(!a.parentNode){return a}return a.parentNode.removeChild(a)}},{"./internal/validate":14}],19:[function(g,j,h){var i=g("./internal/validate");
j.exports=function k(b,a){i.insertNode(b,true,"insertFirstChild","newNode");i.childNode(a,true,"insertFirstChild","oldNode");
i.hasParentNode(a,"insertFirstChild","oldNode");return a.parentNode.replaceChild(b,a)
}},{"./internal/validate":14}],20:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],21:[function(z,C,x){z("@marcom/ac-polyfills/Array/prototype.indexOf");
var r=z("@marcom/ac-dom-nodes/isNode");var D=z("@marcom/ac-dom-nodes/COMMENT_NODE");
var v=z("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");var w=z("@marcom/ac-dom-nodes/DOCUMENT_NODE");
var y=z("@marcom/ac-dom-nodes/ELEMENT_NODE");var A=z("@marcom/ac-dom-nodes/TEXT_NODE");
var E=function(a,b){if(!r(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var t=[y,w,v];var s=" must be an Element, Document, or Document Fragment";
var q=[y,A,D];var u=" must be an Element, TextNode, or Comment";var B=" must be a string";
C.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!E(d,t)){throw new TypeError(b+": "+c+s)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!E(d,q)){throw new TypeError(b+": "+c+u)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+B)
}}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":7,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":8,"@marcom/ac-dom-nodes/DOCUMENT_NODE":9,"@marcom/ac-dom-nodes/ELEMENT_NODE":10,"@marcom/ac-dom-nodes/TEXT_NODE":11,"@marcom/ac-dom-nodes/isNode":17,"@marcom/ac-polyfills/Array/prototype.indexOf":47}],22:[function(p,o,q){var n=p("@marcom/ac-dom-nodes/isElement");
var l=p("./internal/validate");var k=p("./internal/nativeMatches");var m=p("./shims/matchesSelector");
o.exports=function j(a,b){l.selector(b,true,"matchesSelector");if(!n(a)){return false
}if(!k){return m(a,b)}return k.call(a,b)}},{"./internal/nativeMatches":20,"./internal/validate":21,"./shims/matchesSelector":26,"@marcom/ac-dom-nodes/isElement":16}],23:[function(o,n,i){var m=o("@marcom/ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function l(a,b){k.childNode(a,true,"nextSibling");
k.selector(b,false,"nextSibling");if(a.nextElementSibling&&!b){return a.nextElementSibling
}while(a=a.nextSibling){if(m(a)){if(!b||j(a,b)){return a}}}return null}},{"./internal/validate":21,"./matchesSelector":22,"@marcom/ac-dom-nodes/isElement":16}],24:[function(o,n,j){var k=o("./internal/validate");
var i=o("./shims/querySelector");var l=("querySelector" in document);n.exports=function m(b,a){a=a||document;
k.parentNode(a,true,"querySelector","context");k.selector(b,true,"querySelector");
if(!l){return i(b,a)}return a.querySelector(b)}},{"./internal/validate":21,"./shims/querySelector":27}],25:[function(i,o,j){i("@marcom/ac-polyfills/Array/prototype.slice");
var k=i("./internal/validate");var l=i("./shims/querySelectorAll");var m=("querySelectorAll" in document);
o.exports=function n(b,a){a=a||document;k.parentNode(a,true,"querySelectorAll","context");
k.selector(b,true,"querySelectorAll");if(!m){return l(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":21,"./shims/querySelectorAll":28,"@marcom/ac-polyfills/Array/prototype.slice":48}],26:[function(k,j,g){var i=k("../querySelectorAll");
j.exports=function h(a,f){var b=a.parentNode||document;var d=i(f,b);var c;for(c=0;
c<d.length;c++){if(d[c]===a){return true}}return false}},{"../querySelectorAll":25}],27:[function(g,k,h){var j=g("./querySelectorAll");
k.exports=function i(b,a){var c=j(b,a);return c.length?c[0]:null}},{"./querySelectorAll":28}],28:[function(s,t,q){s("@marcom/ac-polyfills/Array/prototype.indexOf");
var m=s("@marcom/ac-dom-nodes/isElement");var o=s("@marcom/ac-dom-nodes/isDocumentFragment");
var l=s("@marcom/ac-dom-nodes/remove");var r="_ac_qsa_";var n=function(c,b){var a;
if(b===document){return true}a=c;while((a=a.parentNode)&&m(a)){if(a===b){return true
}}return false};var p=function(a){if("recalc" in a){a.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};t.exports=function u(b,g){var d=document.createElement();
var c=r+(Math.random()+"").slice(-6);var a=[];var f;g=g||document;document[c]=[];
d.innerHTML="x<style>*{display:recalc;}"+b+'{ac-qsa:expression(document["'+c+'"] && document["'+c+'"].push(this));}';
d=d.lastChild;if(o(g)){g.appendChild(d)}else{document.documentElement.firstChild.appendChild(d)
}p(g);while(document[c].length){f=document[c].shift();f.style.removeAttribute("ac-qsa");
if(a.indexOf(f)===-1&&n(f,g)){a.push(f)}}document[c]=null;l(d);p(g);return a}},{"@marcom/ac-dom-nodes/isDocumentFragment":15,"@marcom/ac-dom-nodes/isElement":16,"@marcom/ac-dom-nodes/remove":18,"@marcom/ac-polyfills/Array/prototype.indexOf":47}],29:[function(d,g,f){g.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],30:[function(f,i,g){i.exports=function h(a){var b;return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)
}return b}}},{}],31:[function(m,l,h){var j=m("./helpers/globals");var k=m("@marcom/ac-function/once");
function i(){var a=j.getDocument();return !!a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":29,"@marcom/ac-function/once":30}],32:[function(m,l,h){var j=m("./helpers/globals");
var k=m("@marcom/ac-function/once");function i(){var a=j.getWindow();var c=j.getDocument();
var b=j.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":29,"@marcom/ac-function/once":30}],33:[function(g,k,h){var i=g("./extend");
k.exports=function j(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return i({},a,b)}},{"./extend":34}],34:[function(k,j,g){k("@marcom/ac-polyfills/Array/prototype.forEach");
var h=Object.prototype.hasOwnProperty;j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{"@marcom/ac-polyfills/Array/prototype.forEach":46}],35:[function(t,u,q){t("@marcom/ac-polyfills/Function/prototype.bind");
var s=t("@marcom/ac-object/defaults");var m=t("@marcom/ac-dom-traversal/querySelector");
var w=t("@marcom/ac-dom-traversal/querySelectorAll");var r=t("@marcom/ac-dom-traversal/nextSibling");
var o=t("./internal/CheckboxMenu");var v={className:"footer"};function n(b,a){a=s(v,a||{});
this.el=b;this._selectors={wrapper:"."+a.className,directory:a.directorySelector||"."+a.className+"-directory",mini:a.miniSelector||"."+a.className+"-mini"};
this._initializeDirectory();this._initializeLangLink()}var p=n.prototype;p._initializeDirectory=function(){this._directory=m(this._selectors.directory,this.el);
if(!this._directory){return}var c=w(this._selectors.directory+"-column-section-state",this.directory);
var b;var a;var d;for(var f=0;f<c.length;f++){b=r(c[f]);a=m(this._selectors.directory+"-column-section-anchor-open",b);
d=m(this._selectors.directory+"-column-section-anchor-close",b);o.create(c[f],a,d)
}};p._initializeLangLink=function(){var c;var b;var a;this._langLink=m(this._selectors.mini+"-locale-lang",this.el);
if(!this._langLink){return}c=window.location.pathname;b=this._langLink.getAttribute("data-locale-current");
a=this._langLink.pathname;if(c.indexOf(b)!==-1){c=c.replace(b,a);if(c.charAt(0)!=="/"){c="/"+c
}this._langLink.href=c}};u.exports=n},{"./internal/CheckboxMenu":36,"@marcom/ac-dom-traversal/nextSibling":23,"@marcom/ac-dom-traversal/querySelector":24,"@marcom/ac-dom-traversal/querySelectorAll":25,"@marcom/ac-object/defaults":33,"@marcom/ac-polyfills/Function/prototype.bind":51}],36:[function(n,m,i){n("@marcom/ac-polyfills/Function/prototype.bind");
var j=n("@marcom/ac-dom-events/utils/addEventListener");var o=n("@marcom/ac-dom-events/preventDefault");
function k(b,c,a){this.el=b;this.anchorOpen=c;this.anchorClose=a;this._lastOpen=this.el.checked;
j(this.el,"change",this.update.bind(this));j(this.anchorOpen,"click",this._anchorOpenClick.bind(this));
j(this.anchorClose,"click",this._anchorCloseClick.bind(this));if(window.location.hash==="#"+b.id){window.location.hash=""
}}k.create=function(b,c,a){return new k(b,c,a)};var l=k.prototype;l.update=function(){var a=this.isOpen();
if(a!==this._lastOpen){this._lastOpen=a}};l.isOpen=function(){return this.el.checked
};l.toggle=function(){if(this.isOpen()){this.close()}else{this.open()}};l.open=function(){if(!this.el.checked){this.el.checked=true;
this.update()}};l.close=function(){if(this.el.checked){this.el.checked=false;this.update()
}};l._anchorOpenClick=function(a){o(a);this.open();this.anchorClose.focus()};l._anchorCloseClick=function(a){o(a);
this.close();this.anchorOpen.focus()};m.exports=k},{"@marcom/ac-dom-events/preventDefault":5,"@marcom/ac-dom-events/utils/addEventListener":6,"@marcom/ac-polyfills/Function/prototype.bind":51}],37:[function(j,p,k){var n=j("@marcom/ac-classlist/add");
var m=j("@marcom/ac-classlist/remove");var l=j("@marcom/ac-object/extend");var q=function(b,a){this._target=b;
this._tests={};this.addTests(a)};var o=q.prototype;o.addTests=function(a){this._tests=l(this._tests,a||{})
};o._supports=function(a){if(typeof this._tests[a]==="undefined"){return false}if(typeof this._tests[a]==="function"){this._tests[a]=this._tests[a]()
}return this._tests[a]};o._addClass=function(a,b){b=b||"no-";if(this._supports(a)){n(this._target,a)
}else{n(this._target,b+a)}};o.htmlClass=function(){var a;m(this._target,"no-js");
n(this._target,"js");for(a in this._tests){if(this._tests.hasOwnProperty(a)){this._addClass(a)
}}};p.exports=q},{"@marcom/ac-classlist/add":38,"@marcom/ac-classlist/remove":43,"@marcom/ac-object/extend":44}],38:[function(g,k,h){g("@marcom/ac-polyfills/Array/prototype.slice");
g("@marcom/ac-polyfills/Element/prototype.classList");var j=g("./className/add");
k.exports=function i(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);return
}for(c=0;c<a.length;c++){j(b,a[c])}}},{"./className/add":39,"@marcom/ac-polyfills/Array/prototype.slice":48,"@marcom/ac-polyfills/Element/prototype.classList":50}],39:[function(g,k,h){var j=g("./contains");
k.exports=function i(a,b){if(!j(a,b)){a.className+=" "+b}}},{"./contains":40}],40:[function(g,k,h){var i=g("./getTokenRegExp");
k.exports=function j(a,b){return i(b).test(a.className)}},{"./getTokenRegExp":41}],41:[function(f,i,g){i.exports=function h(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],42:[function(m,l,h){var k=m("./contains");var j=m("./getTokenRegExp");l.exports=function i(a,b){if(k(a,b)){a.className=a.className.replace(j(b),"$1").trim()
}}},{"./contains":40,"./getTokenRegExp":41}],43:[function(j,i,k){j("@marcom/ac-polyfills/Array/prototype.slice");
j("@marcom/ac-polyfills/Element/prototype.classList");var g=j("./className/remove");
i.exports=function h(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){g(b,a[c])}}},{"./className/remove":42,"@marcom/ac-polyfills/Array/prototype.slice":48,"@marcom/ac-polyfills/Element/prototype.classList":50}],44:[function(d,g,f){arguments[4][34][0].apply(f,arguments)
},{"@marcom/ac-polyfills/Array/prototype.forEach":46,dup:34}],45:[function(f,i,g){if(!Array.prototype.filter){Array.prototype.filter=function h(a,b){var c=Object(this);
var n=c.length>>>0;var d;var m=[];if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<n;d+=1){if(d in c&&a.call(b,c[d],d,c)){m.push(c[d])}}return m}}},{}],46:[function(f,i,g){if(!Array.prototype.forEach){Array.prototype.forEach=function h(a,b){var c=Object(this);
var l;var d;if(typeof a!=="function"){throw new TypeError("No function object passed to forEach.")
}for(l=0;l<this.length;l+=1){d=c[l];a.call(b,d,l,c)}}}},{}],47:[function(f,i,g){if(!Array.prototype.indexOf){Array.prototype.indexOf=function h(c,b){var a=b||0;
var d=0;if(a<0){a=this.length+b-1;if(a<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(d=0;d<this.length;d++){if(this[d]===c){return d}}return(-1)}}},{}],48:[function(d,g,f){(function(){var b=Array.prototype.slice;
try{b.call(document.documentElement)}catch(a){Array.prototype.slice=function(u,q){q=(typeof q!=="undefined")?q:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return b.call(this,u,q)
}var i,r=[],p,s=this.length;var t=u||0;t=(t>=0)?t:s+t;var c=(q)?q:s;if(q<0){c=s+q
}p=c-t;if(p>0){r=new Array(p);if(this.charAt){for(i=0;i<p;i++){r[i]=this.charAt(t+i)
}}else{for(i=0;i<p;i++){r[i]=this[t+i]}}}return r}}}())},{}],49:[function(f,i,g){if(!Array.prototype.some){Array.prototype.some=function h(a,b){var d=Object(this);
var l=d.length>>>0;var c;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(c=0;c<l;c+=1){if(c in d&&a.call(b,d[c],c,d)===true){return true}}return false
}}},{}],50:[function(d,g,f){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(t){if(!("Element" in t)){return
}var C="classList",x="prototype",b=t.Element[x],B=Object,s=String[x].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},A=Array[x].indexOf||function(h){var i=0,j=this.length;for(;i<j;i++){if(i in this&&this[i]===h){return i
}}return -1},a=function(i,h){this.name=i;this.code=DOMException[i];this.message=h
},w=function(h,i){if(i===""){throw new a("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(i)){throw new a("INVALID_CHARACTER_ERR","String contains an invalid character")
}return A.call(h,i)},z=function(h){var i=s.call(h.getAttribute("class")||""),j=i?i.split(/\s+/):[],k=0,l=j.length;
for(;k<l;k++){this.push(j[k])}this._updateClassName=function(){h.setAttribute("class",this.toString())
}},y=z[x]=[],u=function(){return new z(this)};a[x]=Error[x];y.item=function(h){return this[h]||null
};y.contains=function(h){h+="";return w(this,h)!==-1};y.add=function(){var h=arguments,i=0,k=h.length,j,l=false;
do{j=h[i]+"";if(w(this,j)===-1){this.push(j);l=true}}while(++i<k);if(l){this._updateClassName()
}};y.remove=function(){var h=arguments,i=0,l=h.length,j,m=false,k;do{j=h[i]+"";
k=w(this,j);while(k!==-1){this.splice(k,1);m=true;k=w(this,j)}}while(++i<l);if(m){this._updateClassName()
}};y.toggle=function(j,i){j+="";var k=this.contains(j),h=k?i!==true&&"remove":i!==false&&"add";
if(h){this[h](j)}if(i===true||i===false){return i}else{return !k}};y.toString=function(){return this.join(" ")
};if(B.defineProperty){var c={get:u,enumerable:true,configurable:true};try{B.defineProperty(b,C,c)
}catch(v){if(v.number===-2146823252){c.enumerable=false;B.defineProperty(b,C,c)
}}}else{if(B[x].__defineGetter__){b.__defineGetter__(C,u)}}}(self))}else{(function(){var b=document.createElement("_");
b.classList.add("c1","c2");if(!b.classList.contains("c2")){var a=function(j){var k=DOMTokenList.prototype[j];
DOMTokenList.prototype[j]=function(h){var i,m=arguments.length;for(i=0;i<m;i++){h=arguments[i];
k.call(this,h)}}};a("add");a("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(k,j){if(1 in arguments&&!this.contains(k)===!j){return j
}else{return c.call(this,k)}}}b=null}())}}},{}],51:[function(d,g,f){if(!Function.prototype.bind){Function.prototype.bind=function(k){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var a=Array.prototype.slice.call(arguments,1);var b=this;var j=function(){};var c=function(){return b.apply((this instanceof j&&k)?this:k,a.concat(Array.prototype.slice.call(arguments)))
};j.prototype=this.prototype;c.prototype=new j();return c}}},{}],52:[function(i,h,f){if(!String.prototype.trim){String.prototype.trim=function g(){return this.replace(/^\s+|\s+$/g,"")
}}},{}],53:[function(g,k,h){g("@marcom/ac-polyfills/String/prototype.trim");var i=g("./ac-globalfooter/GlobalFooter");
var j=document.getElementById("ac-globalfooter");if(j){k.exports=new i(j)}},{"./ac-globalfooter/GlobalFooter":54,"@marcom/ac-polyfills/String/prototype.trim":52}],54:[function(C,D,B){C("@marcom/ac-polyfills/Function/prototype.bind");
var u=C("@marcom/ac-footer/Footer");var s=C("@marcom/ac-headjs/FeatureDetect");
var q=C("./featureDetectTests");var r=C("@marcom/ac-dom-traversal/querySelector");
var E=C("@marcom/ac-dom-traversal/querySelectorAll");var y=C("@marcom/ac-dom-events/utils/addEventListener");
var w=C("@marcom/ac-dom-events/preventDefault");var A=C("@marcom/ac-dom-nodes/insertFirstChild");
var x=C("@marcom/ac-dom-nodes/replace");var v=function(a){var b=new s(a,q);b.htmlClass();
u.call(this,a,{className:"ac-gf",miniSelector:".ac-gf-footer"});this._initializeBuyStrip();
this._initializeChatLink()};var t=u.prototype;var z=v.prototype=Object.create(t);
v.prototype.constructor=v;z._initializeBuyStrip=function(){var b;var a;this._buystrip=r(".ac-gf-buystrip");
if(!this._buystrip){return}b=E(".ac-gf-buystrip-info-content",this._buystrip);for(a=0;
a<b.length;a++){this._makeBlockLink(b[a])}};z._initializeChatLink=function(){var a;
if(this._buystrip){this._chatLink=r(".ac-gf-buystrip-info-cta-chat",this._buystrip);
if(this._chatLink){a=this._chatLink.parentNode;if(a.href){this._chatLink=a}this._onChatLinkClick=this._onChatLinkClick.bind(this);
y(this._chatLink,"click",this._onChatLinkClick)}}};z._onChatLinkClick=function(a){w(a);
window.open(this._chatLink.href,"chat","width=375,height=773")};z._makeBlockLink=function(d){var b;
var f;var a;var c;b=E("a",d);if(!b.length){return}b=b[0];a=document.createElement("a");
a.className="ac-gf-block";a.href=b.href;f=document.createElement("span");f.className=b.className+" ac-gf-block-link";
f.innerHTML=b.innerHTML;b.parentNode.className+=" with-cta";x(f,b);A(a,d);while(d.childNodes.length>1){c=d.childNodes[1];
if(c.href){break}a.appendChild(c)}};D.exports=v},{"./featureDetectTests":55,"@marcom/ac-dom-events/preventDefault":5,"@marcom/ac-dom-events/utils/addEventListener":6,"@marcom/ac-dom-nodes/insertFirstChild":12,"@marcom/ac-dom-nodes/replace":19,"@marcom/ac-dom-traversal/querySelector":24,"@marcom/ac-dom-traversal/querySelectorAll":25,"@marcom/ac-footer/Footer":35,"@marcom/ac-headjs/FeatureDetect":37,"@marcom/ac-polyfills/Function/prototype.bind":51}],55:[function(l,k,m){var j=l("@marcom/ac-browser");
var i=l("@marcom/ac-feature/touchAvailable");var h=l("@marcom/ac-feature/svgAvailable");
k.exports={touch:i,svg:h,ie7:(j.IE&&j.IE.documentMode===7),ie8:(j.IE&&j.IE.documentMode===8)}
},{"@marcom/ac-browser":1,"@marcom/ac-feature/svgAvailable":31,"@marcom/ac-feature/touchAvailable":32}]},{},[53]);