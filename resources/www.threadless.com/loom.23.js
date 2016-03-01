var Loom = (function() {

/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return n.each(a.match(F)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&n.each(arguments,function(a,c){var d;while((d=n.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body)return setTimeout(n.ready);n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))}}});function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===z.readyState)setTimeout(n.ready);else if(z.addEventListener)z.addEventListener("DOMContentLoaded",K,!1),a.addEventListener("load",K,!1);else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&z.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}J(),n.ready()}}()}return I.promise(b)};var L="undefined",M;for(M in n(l))break;l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},X=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;function bb(){return!0}function cb(){return!1}function db(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=cb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function zb(a){var b=qb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ab(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Cb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=vb(f),h=vb(a),g=0;null!=(e=h[g]);++g)d[g]&&Cb(e,d[g]);if(b)if(c)for(h=h||vb(a),d=d||vb(f),g=0;null!=(e=h[g]);g++)Bb(e,d[g]);else Bb(a,f);return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;while(f=h[e++])pb.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(vb(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0;if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;f>j;j++)d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Db,Eb={};function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");return d.detach(),e}function Gb(a){var b=z,c=Eb[a];return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;if(null==b){if(a=z.getElementsByTagName("body")[0],!a)return;f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null}return b}}();var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Mb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c)return c;var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];if(f)return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c},boxSizing:function(){return null==d&&k(),d},boxSizingReliable:function(){return null==e&&k(),e},pixelPosition:function(){return null==f&&k(),f},reliableMarginRight:function(){var b,c,d,e;if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b)return;c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)}return g}});function k(){var b,c,h=z.getElementsByTagName("body")[0];h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];function Vb(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;while(e--)if(b=Ub[e]+c,b in a)return b;return d}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Xb(a,b,c){var d=Qb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]="",i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)}):Zb(a,b,d):void 0},set:function(a,c,d){var e=d&&Jb(a);return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Jb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)},show:function(){return Wb(this,!0)},hide:function(){return Wb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=$b.propHooks[this.prop];return a&&a.get?a.get(this):$b.propHooks._default.get(this)},run:function(a){var b,c=$b.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=$b.prototype.init,n.fx.step={};var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function gc(){return setTimeout(function(){_b=void 0}),_b=n.now()}function hc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=U[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}if(!n.isEmptyObject(o)){r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function kc(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(kc(k,j.opts.specialEasing);g>f;f++)if(d=ec[f].call(j,a,k,j.opts))return d;return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&dc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)}}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(_b=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),_b=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(ac),ac=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var mc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):nc&&nc.set(a,b,c)}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},pc.id=pc.name=pc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var vc=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");try{Ac=location.href}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href}zc=Hc.exec(Ac.toLowerCase())||[];function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nc(a,b,c,d){var e={},f=a===Jc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Dc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t)return v;h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;function Wc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Wc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Wc(c,a[c],b,e);return d.join("&").replace(Rc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}}):{name:b.name,value:c.replace(Tc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()}:$c;var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc)Yc[a](void 0,!0)}),l.cors=!!Zc&&"withCredentials"in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Xc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function $c(){try{return new a.XMLHttpRequest}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ad=[],bd=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var cd=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&cd)return cd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var dd=a.document.documentElement;function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||dd})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return W(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var fd=a.jQuery,gd=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n},typeof b===L&&(a.jQuery=a.$=n),n});


/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
d)).finalize(c)}}});var t=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();


/*1401387697,170428253,JIT Construction: v1267954,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {window.FB || (function(window) {
var self = window, document = window.document;
var setTimeout = window.setTimeout, setInterval = window.setInterval,clearTimeout = window.clearTimeout,clearInterval = window.clearInterval;var __DEV__ = 0;
function emptyFunction() {};
var __w, __t;
__t=function(a){return a[0];};__w=function(a){return a;};
var require,__d;(function(a){var b={},c={},d=['global','require','requireDynamic','requireLazy','module','exports'];require=function(e,f){if(c.hasOwnProperty(e))return c[e];if(!b.hasOwnProperty(e)){if(f)return null;throw new Error('Module '+e+' has not been defined');}var g=b[e],h=g.deps,i=h.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case 'module':j=g;break;case 'exports':j=g.exports;break;case 'global':j=a;break;case 'require':j=require;break;case 'requireDynamic':j=require;break;case 'requireLazy':j=null;break;default:j=require.call(null,h[l]);}k.push(j);}g.factory.apply(a,k);c[e]=g.exports;return g.exports;};__d=function(e,f,g,h){if(typeof g=='function'){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e);}else c[e]=g;};})(this);
__d("ES5ArrayPrototype",[],function(a,b,c,d,e,f){var g={};g.map=function(h,i){if(typeof h!='function')throw new TypeError();var j,k=this.length,l=new Array(k);for(j=0;j<k;++j)if(j in this)l[j]=h.call(i,this[j],j,this);return l;};g.forEach=function(h,i){g.map.call(this,h,i);};g.filter=function(h,i){if(typeof h!='function')throw new TypeError();var j,k,l=this.length,m=[];for(j=0;j<l;++j)if(j in this){k=this[j];if(h.call(i,k,j,this))m.push(k);}return m;};g.every=function(h,i){if(typeof h!='function')throw new TypeError();var j=new Object(this),k=j.length;for(var l=0;l<k;l++)if(l in j)if(!h.call(i,j[l],l,j))return false;return true;};g.some=function(h,i){if(typeof h!='function')throw new TypeError();var j=new Object(this),k=j.length;for(var l=0;l<k;l++)if(l in j)if(h.call(i,j[l],l,j))return true;return false;};g.indexOf=function(h,i){var j=this.length;i|=0;if(i<0)i+=j;for(;i<j;i++)if(i in this&&this[i]===h)return i;return -1;};e.exports=g;},null);
__d("ES5FunctionPrototype",[],function(a,b,c,d,e,f){var g={};g.bind=function(h){if(typeof this!='function')throw new TypeError('Bind must be called on a function');var i=this,j=Array.prototype.slice.call(arguments,1);function k(){return i.apply(h,j.concat(Array.prototype.slice.call(arguments)));}k.displayName='bound:'+(i.displayName||i.name||'(?)');k.toString=function l(){return 'bound: '+i;};return k;};e.exports=g;},null);
__d("ES5StringPrototype",[],function(a,b,c,d,e,f){var g={};g.trim=function(){if(this==null)throw new TypeError('String.prototype.trim called on null or undefined');return String.prototype.replace.call(this,/^\s+|\s+$/g,'');};g.startsWith=function(h){var i=String(this);if(this==null)throw new TypeError('String.prototype.startsWith called on null or undefined');var j=arguments.length>1?Number(arguments[1]):0;if(isNaN(j))j=0;var k=Math.min(Math.max(j,0),i.length);return i.indexOf(String(h),j)==k;};g.endsWith=function(h){var i=String(this);if(this==null)throw new TypeError('String.prototype.endsWith called on null or undefined');var j=i.length,k=String(h),l=arguments.length>1?Number(arguments[1]):j;if(isNaN(l))l=0;var m=Math.min(Math.max(l,0),j),n=m-k.length;if(n<0)return false;return i.lastIndexOf(k,n)==n;};g.contains=function(h){if(this==null)throw new TypeError('String.prototype.contains called on null or undefined');var i=String(this),j=arguments.length>1?Number(arguments[1]):0;if(isNaN(j))j=0;return i.indexOf(String(h),j)!=-1;};g.repeat=function(h){if(this==null)throw new TypeError('String.prototype.repeat called on null or undefined');var i=String(this),j=h?Number(h):0;if(isNaN(j))j=0;if(j<0||j===Infinity)throw RangeError();if(j===1)return i;if(j===0)return '';var k='';while(j){if(j&1)k+=i;if((j>>=1))i+=i;}return k;};e.exports=g;},null);
__d("ES5Array",[],function(a,b,c,d,e,f){var g={};g.isArray=function(h){return Object.prototype.toString.call(h)=='[object Array]';};e.exports=g;},null);
__d("ES5Object",[],function(a,b,c,d,e,f){var g={};g.create=function(h){var i=typeof h;if(i!='object'&&i!='function')throw new TypeError('Object prototype may only be a Object or null');var j=new Function();j.prototype=h;return new j();};g.keys=function(h){var i=typeof h;if(i!='object'&&i!='function'||h===null)throw new TypeError('Object.keys called on non-object');var j=[];for(var k in h)if(Object.prototype.hasOwnProperty.call(h,k))j.push(k);var l=!({toString:true}).propertyIsEnumerable('toString'),m=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','prototypeIsEnumerable','constructor'];if(l)for(var n=0;n<m.length;n++){var o=m[n];if(Object.prototype.hasOwnProperty.call(h,o))j.push(o);}return j;};e.exports=g;},null);
__d("ES5Date",[],function(a,b,c,d,e,f){var g={};g.now=function(){return new Date().getTime();};e.exports=g;},null);
/**
 * @providesModule JSON3
 * @preserve-header
 *
 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
 */__d("JSON3",[],function(a,b,c,d,e,f){(function(){var g={}.toString,h,i,j,k=e.exports={},l='{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba=new Date(-3509827334573292),ca,da,ea;try{ba=ba.getUTCFullYear()==-109252&&ba.getUTCMonth()===0&&ba.getUTCDate()==1&&ba.getUTCHours()==10&&ba.getUTCMinutes()==37&&ba.getUTCSeconds()==6&&ba.getUTCMilliseconds()==708;}catch(fa){}if(!ba){ca=Math.floor;da=[0,31,59,90,120,151,181,212,243,273,304,334];ea=function(ga,ha){return da[ha]+365*(ga-1970)+ca((ga-1969+(ha=+(ha>1)))/4)-ca((ga-1901+ha)/100)+ca((ga-1601+ha)/400);};}if(typeof JSON=="object"&&JSON){k.stringify=JSON.stringify;k.parse=JSON.parse;}if((m=typeof k.stringify=="function"&&!ea)){(ba=function(){return 1;}).toJSON=ba;try{m=k.stringify(0)==="0"&&k.stringify(new Number())==="0"&&k.stringify(new String())=='""'&&k.stringify(g)===j&&k.stringify(j)===j&&k.stringify()===j&&k.stringify(ba)==="1"&&k.stringify([ba])=="[1]"&&k.stringify([j])=="[null]"&&k.stringify(null)=="null"&&k.stringify([j,g,null])=="[null,null,null]"&&k.stringify({result:[ba,true,false,null,"\0\b\n\f\r\t"]})==l&&k.stringify(null,ba)==="1"&&k.stringify([1,2],null,1)=="[\n 1,\n 2\n]"&&k.stringify(new Date(-8.64e+15))=='"-271821-04-20T00:00:00.000Z"'&&k.stringify(new Date(8.64e+15))=='"+275760-09-13T00:00:00.000Z"'&&k.stringify(new Date(-62198755200000))=='"-000001-01-01T00:00:00.000Z"'&&k.stringify(new Date(-1))=='"1969-12-31T23:59:59.999Z"';}catch(fa){m=false;}}if(typeof k.parse=="function")try{if(k.parse("0")===0&&!k.parse(false)){ba=k.parse(l);if((r=ba.A.length==5&&ba.A[0]==1)){try{r=!k.parse('"\t"');}catch(fa){}if(r)try{r=k.parse("01")!=1;}catch(fa){}}}}catch(fa){r=false;}ba=l=null;if(!m||!r){if(!(h={}.hasOwnProperty))h=function(ga){var ha={},ia;if((ha.__proto__=null,ha.__proto__={toString:1},ha).toString!=g){h=function(ja){var ka=this.__proto__,la=ja in (this.__proto__=null,this);this.__proto__=ka;return la;};}else{ia=ha.constructor;h=function(ja){var ka=(this.constructor||ia).prototype;return ja in this&&!(ja in ka&&this[ja]===ka[ja]);};}ha=null;return h.call(this,ga);};i=function(ga,ha){var ia=0,ja,ka,la,ma;(ja=function(){this.valueOf=0;}).prototype.valueOf=0;ka=new ja();for(la in ka)if(h.call(ka,la))ia++;ja=ka=null;if(!ia){ka=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];ma=function(na,oa){var pa=g.call(na)=="[object Function]",qa,ra;for(qa in na)if(!(pa&&qa=="prototype")&&h.call(na,qa))oa(qa);for(ra=ka.length;qa=ka[--ra];h.call(na,qa)&&oa(qa));};}else if(ia==2){ma=function(na,oa){var pa={},qa=g.call(na)=="[object Function]",ra;for(ra in na)if(!(qa&&ra=="prototype")&&!h.call(pa,ra)&&(pa[ra]=1)&&h.call(na,ra))oa(ra);};}else ma=function(na,oa){var pa=g.call(na)=="[object Function]",qa,ra;for(qa in na)if(!(pa&&qa=="prototype")&&h.call(na,qa)&&!(ra=qa==="constructor"))oa(qa);if(ra||h.call(na,(qa="constructor")))oa(qa);};return ma(ga,ha);};if(!m){n={"\\":"\\\\",'"':'\\"',"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};o=function(ga,ha){return ("000000"+(ha||0)).slice(-ga);};p=function(ga){var ha='"',ia=0,ja;for(;ja=ga.charAt(ia);ia++)ha+='\\"\b\f\n\r\t'.indexOf(ja)>-1?n[ja]:ja<" "?"\\u00"+o(2,ja.charCodeAt(0).toString(16)):ja;return ha+'"';};q=function(ga,ha,ia,ja,ka,la,ma){var na=ha[ga],oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,ab,bb,cb;if(typeof na=="object"&&na){oa=g.call(na);if(oa=="[object Date]"&&!h.call(na,"toJSON")){if(na>-1/0&&na<1/0){if(ea){ra=ca(na/86400000);for(pa=ca(ra/365.2425)+1970-1;ea(pa+1,0)<=ra;pa++);for(qa=ca((ra-ea(pa,0))/30.42);ea(pa,qa+1)<=ra;qa++);ra=1+ra-ea(pa,qa);sa=(na%86400000+86400000)%86400000;ta=ca(sa/3600000)%24;ua=ca(sa/60000)%60;va=ca(sa/1000)%60;wa=sa%1000;}else{pa=na.getUTCFullYear();qa=na.getUTCMonth();ra=na.getUTCDate();ta=na.getUTCHours();ua=na.getUTCMinutes();va=na.getUTCSeconds();wa=na.getUTCMilliseconds();}na=(pa<=0||pa>=10000?(pa<0?"-":"+")+o(6,pa<0?-pa:pa):o(4,pa))+"-"+o(2,qa+1)+"-"+o(2,ra)+"T"+o(2,ta)+":"+o(2,ua)+":"+o(2,va)+"."+o(3,wa)+"Z";}else na=null;}else if(typeof na.toJSON=="function"&&((oa!="[object Number]"&&oa!="[object String]"&&oa!="[object Array]")||h.call(na,"toJSON")))na=na.toJSON(ga);}if(ia)na=ia.call(ha,ga,na);if(na===null)return "null";oa=g.call(na);if(oa=="[object Boolean]"){return ""+na;}else if(oa=="[object Number]"){return na>-1/0&&na<1/0?""+na:"null";}else if(oa=="[object String]")return p(na);if(typeof na=="object"){for(ab=ma.length;ab--;)if(ma[ab]===na)throw TypeError();ma.push(na);xa=[];bb=la;la+=ka;if(oa=="[object Array]"){for(za=0,ab=na.length;za<ab;cb||(cb=true),za++){ya=q(za,na,ia,ja,ka,la,ma);xa.push(ya===j?"null":ya);}return cb?(ka?"[\n"+la+xa.join(",\n"+la)+"\n"+bb+"]":("["+xa.join(",")+"]")):"[]";}else{i(ja||na,function(db){var eb=q(db,na,ia,ja,ka,la,ma);if(eb!==j)xa.push(p(db)+":"+(ka?" ":"")+eb);cb||(cb=true);});return cb?(ka?"{\n"+la+xa.join(",\n"+la)+"\n"+bb+"}":("{"+xa.join(",")+"}")):"{}";}ma.pop();}};k.stringify=function(ga,ha,ia){var ja,ka,la,ma,na,oa;if(typeof ha=="function"||typeof ha=="object"&&ha)if(g.call(ha)=="[object Function]"){ka=ha;}else if(g.call(ha)=="[object Array]"){la={};for(ma=0,na=ha.length;ma<na;oa=ha[ma++],((g.call(oa)=="[object String]"||g.call(oa)=="[object Number]")&&(la[oa]=1)));}if(ia)if(g.call(ia)=="[object Number]"){if((ia-=ia%1)>0)for(ja="",ia>10&&(ia=10);ja.length<ia;ja+=" ");}else if(g.call(ia)=="[object String]")ja=ia.length<=10?ia:ia.slice(0,10);return q("",(oa={},oa[""]=ga,oa),ka,la,ja,"",[]);};}if(!r){s=String.fromCharCode;t={"\\":"\\",'"':'"',"/":"/",b:"\b",t:"\t",n:"\n",f:"\f",r:"\r"};u=function(){z=aa=null;throw SyntaxError();};v=function(){var ga=aa,ha=ga.length,ia,ja,ka,la,ma;while(z<ha){ia=ga.charAt(z);if("\t\r\n ".indexOf(ia)>-1){z++;}else if("{}[]:,".indexOf(ia)>-1){z++;return ia;}else if(ia=='"'){for(ja="@",z++;z<ha;){ia=ga.charAt(z);if(ia<" "){u();}else if(ia=="\\"){ia=ga.charAt(++z);if('\\"/btnfr'.indexOf(ia)>-1){ja+=t[ia];z++;}else if(ia=="u"){ka=++z;for(la=z+4;z<la;z++){ia=ga.charAt(z);if(!(ia>="0"&&ia<="9"||ia>="a"&&ia<="f"||ia>="A"&&ia<="F"))u();}ja+=s("0x"+ga.slice(ka,z));}else u();}else{if(ia=='"')break;ja+=ia;z++;}}if(ga.charAt(z)=='"'){z++;return ja;}u();}else{ka=z;if(ia=="-"){ma=true;ia=ga.charAt(++z);}if(ia>="0"&&ia<="9"){if(ia=="0"&&(ia=ga.charAt(z+1),ia>="0"&&ia<="9"))u();ma=false;for(;z<ha&&(ia=ga.charAt(z),ia>="0"&&ia<="9");z++);if(ga.charAt(z)=="."){la=++z;for(;la<ha&&(ia=ga.charAt(la),ia>="0"&&ia<="9");la++);if(la==z)u();z=la;}ia=ga.charAt(z);if(ia=="e"||ia=="E"){ia=ga.charAt(++z);if(ia=="+"||ia=="-")z++;for(la=z;la<ha&&(ia=ga.charAt(la),ia>="0"&&ia<="9");la++);if(la==z)u();z=la;}return +ga.slice(ka,z);}if(ma)u();if(ga.slice(z,z+4)=="true"){z+=4;return true;}else if(ga.slice(z,z+5)=="false"){z+=5;return false;}else if(ga.slice(z,z+4)=="null"){z+=4;return null;}u();}}return "$";};w=function(ga){var ha,ia,ja;if(ga=="$")u();if(typeof ga=="string"){if(ga.charAt(0)=="@")return ga.slice(1);if(ga=="["){ha=[];for(;;ia||(ia=true)){ga=v();if(ga=="]")break;if(ia)if(ga==","){ga=v();if(ga=="]")u();}else u();if(ga==",")u();ha.push(w(ga));}return ha;}else if(ga=="{"){ha={};for(;;ia||(ia=true)){ga=v();if(ga=="}")break;if(ia)if(ga==","){ga=v();if(ga=="}")u();}else u();if(ga==","||typeof ga!="string"||ga.charAt(0)!="@"||v()!=":")u();ha[ga.slice(1)]=w(v());}return ha;}u();}return ga;};y=function(ga,ha,ia){var ja=x(ga,ha,ia);if(ja===j){delete ga[ha];}else ga[ha]=ja;};x=function(ga,ha,ia){var ja=ga[ha],ka;if(typeof ja=="object"&&ja)if(g.call(ja)=="[object Array]"){for(ka=ja.length;ka--;)y(ja,ka,ia);}else i(ja,function(la){y(ja,la,ia);});return ia.call(ga,ha,ja);};k.parse=function(ga,ha){z=0;aa=ga;var ia=w(v());if(v()!="$")u();z=aa=null;return ha&&g.call(ha)=="[object Function]"?x((ba={},ba[""]=ia,ba),"",ha):ia;};}}}).call(this);},null);
__d("ES5",["ES5ArrayPrototype","ES5FunctionPrototype","ES5StringPrototype","ES5Array","ES5Object","ES5Date","JSON3"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=Array.prototype.slice,o=Object.prototype.toString,p={'JSON.stringify':m.stringify,'JSON.parse':m.parse},q={array:g,'function':h,string:i,Object:k,Array:j,Date:l};for(var r in q){if(!q.hasOwnProperty(r))continue;var s=q[r],t=r===r.toLowerCase()?window[r.replace(/^\w/,function(x){return x.toUpperCase();})].prototype:window[r];for(var u in s){if(!s.hasOwnProperty(u))continue;var v=t[u];p[r+'.'+u]=v&&/\{\s+\[native code\]\s\}/.test(v)?v:s[u];}}function w(x,y,z){var aa=n.call(arguments,3),ba=z?/\s(.*)\]/.exec(o.call(x).toLowerCase())[1]:x,ca=p[ba+'.'+y]||x[y];if(typeof ca==='function')return ca.apply(x,aa);}e.exports=w;},null);
var ES5 = require('ES5');
__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"1267954"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"xd_timeout":{"rate":4,"value":30000},"use_bundle":true},"api":{"mode":"warn","whitelist":["Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Data","Data.process","Data.query","Data.query:wait","Data.waitOn","Data.waitOn:wait","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.unlockForProcessing","Payment.parse","Payment.setSize","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui","ui:subscribe"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","fbcdn_http":"static.ak.fbcdn.net","fbcdn_https":"fbstatic-a.akamaihd.net","cdn_http":"static.ak.facebook.com","cdn_https":"s-static.ak.facebook.com"});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=41","XdBundleUrl":"\/connect\/xd_arbiter\/V80PAcvrynR.js?version=41","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yR\/r\/ks_9ZXiQ0GL.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;_background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif);cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent;_background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_close_icon:active{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent;_background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_loader{background-color:#f2f2f2;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #3b5998;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{max-height:590px;min-height:590px;max-width:500px;min-width:500px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;left:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #29447e;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f2f2f2;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}\n.fb_connect_bar_container div,.fb_connect_bar_container span,.fb_connect_bar_container a,.fb_connect_bar_container img,.fb_connect_bar_container strong{background:none;border-spacing:0;border:0;direction:ltr;font-style:normal;font-variant:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal;vertical-align:baseline}.fb_connect_bar_container{position:fixed;left:0 !important;right:0 !important;height:42px !important;padding:0 25px !important;margin:0 !important;vertical-align:middle !important;border-bottom:1px solid #333 !important;background:#3b5998 !important;z-index:99999999 !important;overflow:hidden !important}.fb_connect_bar_container_ie6{position:absolute;top:expression(document.compatMode==\"CSS1Compat\"? document.documentElement.scrollTop+\"px\":body.scrollTop+\"px\")}.fb_connect_bar{position:relative;margin:auto;height:100\u0025;width:100\u0025;padding:6px 0 0 0 !important;background:none;color:#fff !important;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif !important;font-size:13px !important;font-style:normal !important;font-variant:normal !important;font-weight:normal !important;letter-spacing:normal !important;line-height:1 !important;text-decoration:none !important;text-indent:0 !important;text-shadow:none !important;text-transform:none !important;white-space:normal !important;word-spacing:normal !important}.fb_connect_bar a:hover{color:#fff}.fb_connect_bar .fb_profile img{height:30px;width:30px;vertical-align:middle;margin:0 6px 5px 0}.fb_connect_bar div a,.fb_connect_bar span,.fb_connect_bar span a{color:#bac6da;font-size:11px;text-decoration:none}.fb_connect_bar .fb_buttons{float:right;margin-top:7px}\n.fbpluginrecommendationsbarleft,.fbpluginrecommendationsbarright{position:fixed !important;bottom:0;z-index:999}.fbpluginrecommendationsbarleft{left:10px}.fbpluginrecommendationsbarright{right:10px}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget","css:fb.css.connectbarwidget","css:fb.css.plugin.recommendationsbar"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yW\/r\/PvklbuW2Ycn.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466],"sampleRate":500});__d("JSSDKPluginPipeConfig",[],{"threshold":0,"enabledApps":{"209753825810663":1,"187288694643718":1}});__d("JSSDKConnectBarConfig",[],{"imgs":{"buttonUrl":"rsrc.php\/v2\/yY\/r\/h_Y6u1wrZPW.png","missingProfileUrl":"rsrc.php\/v2\/yo\/r\/UlIqmHJn-SK.gif"}});
__d("QueryString",[],function(a,b,c,d,e,f){function g(k){var l=[];ES5(ES5('Object','keys',false,k).sort(),'forEach',true,function(m){var n=k[m];if(typeof n==='undefined')return;if(n===null){l.push(m);return;}l.push(encodeURIComponent(m)+'='+encodeURIComponent(n));});return l.join('&');}function h(k,l){var m={};if(k==='')return m;var n=k.split('&');for(var o=0;o<n.length;o++){var p=n[o].split('=',2),q=decodeURIComponent(p[0]);if(l&&m.hasOwnProperty(q))throw new URIError('Duplicate key: '+q);m[q]=p.length===2?decodeURIComponent(p[1]):null;}return m;}function i(k,l){return k+(~ES5(k,'indexOf',true,'?')?'&':'?')+(typeof l==='string'?l:j.encode(l));}var j={encode:g,decode:h,appendToUrl:i};e.exports=j;},null);
__d("copyProperties",[],function(a,b,c,d,e,f){function g(h,i,j,k,l,m,n){h=h||{};var o=[i,j,k,l,m],p=0,q;while(o[p]){q=o[p++];for(var r in q)h[r]=q[r];if(q.hasOwnProperty&&q.hasOwnProperty('toString')&&(typeof q.toString!='undefined')&&(h.toString!==q.toString))h.toString=q.toString;}return h;}e.exports=g;},null);
__d("ManagedError",[],function(a,b,c,d,e,f){function g(h,i){Error.prototype.constructor.call(this,h);this.message=h;this.innerError=i;}g.prototype=new Error();g.prototype.constructor=g;e.exports=g;},null);
__d("AssertionError",["ManagedError"],function(a,b,c,d,e,f,g){function h(i){g.prototype.constructor.apply(this,arguments);}h.prototype=new g();h.prototype.constructor=h;e.exports=h;},null);
__d("sprintf",[],function(a,b,c,d,e,f){function g(h){var i=Array.prototype.slice.call(arguments,1),j=0;return h.replace(/%s/g,function(k){return i[j++];});}e.exports=g;},null);
__d("Assert",["AssertionError","sprintf"],function(a,b,c,d,e,f,g,h){function i(n,o){if(typeof n!=='boolean'||!n)throw new g(o);return n;}function j(n,o,p){var q;if(o===undefined){q='undefined';}else if(o===null){q='null';}else{var r=Object.prototype.toString.call(o);q=/\s(\w*)/.exec(r)[1].toLowerCase();}i(ES5(n,'indexOf',true,q)!==-1,p||h('Expression is of type %s, not %s',q,n));return o;}function k(n,o,p){i(o instanceof n,p||'Expression not instance of type');return o;}function l(n,o){m['is'+n]=o;m['maybe'+n]=function(p,q){if(p!=null)o(p,q);};}var m={isInstanceOf:k,isTrue:i,isTruthy:function(n,o){return i(!!n,o);},type:j,define:function(n,o){n=n.substring(0,1).toUpperCase()+n.substring(1).toLowerCase();l(n,function(p,q){i(o(p),q);});}};ES5(['Array','Boolean','Date','Function','Null','Number','Object','Regexp','String','Undefined'],'forEach',true,function(n){l(n,ES5(j,'bind',true,null,n.toLowerCase()));});e.exports=m;},null);
__d("Type",["copyProperties","Assert"],function(a,b,c,d,e,f,g,h){function i(){var m=this.__mixins;if(m)for(var n=0;n<m.length;n++)m[n].apply(this,arguments);}function j(m,n){if(n instanceof m)return true;if(n instanceof i)for(var o=0;o<n.__mixins.length;o++)if(n.__mixins[o]==m)return true;return false;}function k(m,n){var o=m.prototype;if(!ES5('Array','isArray',false,n))n=[n];for(var p=0;p<n.length;p++){var q=n[p];if(typeof q=='function'){o.__mixins.push(q);q=q.prototype;}ES5(ES5('Object','keys',false,q),'forEach',true,function(r){o[r]=q[r];});}}function l(m,n,o){var p=n&&n.hasOwnProperty('constructor')?n.constructor:function(){this.parent.apply(this,arguments);};h.isFunction(p);if(m&&m.prototype instanceof i===false)throw new Error('parent type does not inherit from Type');m=m||i;var q=new Function();q.prototype=m.prototype;p.prototype=new q();g(p.prototype,n);p.prototype.constructor=p;p.parent=m;p.prototype.__mixins=m.prototype.__mixins?Array.prototype.slice.call(m.prototype.__mixins):[];if(o)k(p,o);p.prototype.parent=function(){this.parent=m.prototype.parent;m.apply(this,arguments);};p.prototype.parentCall=function(r){return m.prototype[r].apply(this,Array.prototype.slice.call(arguments,1));};p.extend=function(r,s){return l(this,r,s);};return p;}g(i.prototype,{instanceOf:function(m){return j(m,this);}});g(i,{extend:function(m,n){return typeof m==='function'?l.apply(null,arguments):l(null,m,n);},instanceOf:j});e.exports=i;},null);
__d("ObservableMixin",[],function(a,b,c,d,e,f){function g(){this.__observableEvents={};}g.prototype={inform:function(h){var i=Array.prototype.slice.call(arguments,1),j=Array.prototype.slice.call(this.getSubscribers(h));for(var k=0;k<j.length;k++){if(j[k]===null)continue;try{j[k].apply(this,i);}catch(l){setTimeout(function(){throw l;},0);}}return this;},getSubscribers:function(h){return this.__observableEvents[h]||(this.__observableEvents[h]=[]);},clearSubscribers:function(h){if(h)this.__observableEvents[h]=[];return this;},clearAllSubscribers:function(){this.__observableEvents={};return this;},subscribe:function(h,i){var j=this.getSubscribers(h);j.push(i);return this;},unsubscribe:function(h,i){var j=this.getSubscribers(h);for(var k=0;k<j.length;k++)if(j[k]===i){j.splice(k,1);break;}return this;},monitor:function(h,i){if(!i()){var j=ES5(function(k){if(i.apply(i,arguments))this.unsubscribe(h,j);},'bind',true,this);this.subscribe(h,j);}return this;}};e.exports=g;},null);
__d("sdk.Model",["Type","ObservableMixin"],function(a,b,c,d,e,f,g,h){var i=g.extend({constructor:function(j){this.parent();var k={},l=this;ES5(ES5('Object','keys',false,j),'forEach',true,function(m){k[m]=j[m];l['set'+m]=function(n){if(n===k[m])return this;k[m]=n;l.inform(m+'.change',n);return l;};l['get'+m]=function(){return k[m];};});}},h);e.exports=i;},null);
__d("sdk.Runtime",["sdk.Model","JSSDKRuntimeConfig","copyProperties"],function(a,b,c,d,e,f,g,h,i){var j={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},k=new g({AccessToken:'',ClientID:'',CookieUserID:'',Environment:j.UNKNOWN,Initialized:false,IsVersioned:false,KidDirectedSite:undefined,Locale:h.locale,LoginStatus:undefined,Revision:h.revision,Rtl:h.rtl,Scope:undefined,Secure:undefined,UseCookie:false,UserID:'',Version:undefined});i(k,{ENVIRONMENTS:j,isEnvironment:function(l){var m=this.getEnvironment();return (l|m)===m;}});(function(){var l=/app_runner/.test(window.name)?j.PAGETAB:/iframe_canvas/.test(window.name)?j.CANVAS:j.UNKNOWN;if((l|j.PAGETAB)===l)l=l|j.CANVAS;k.setEnvironment(l);})();e.exports=k;},null);
__d("sdk.Cookie",["QueryString","sdk.Runtime"],function(a,b,c,d,e,f,g,h){var i=null;function j(m,n,o){m=m+h.getClientID();var p=i&&i!=='.';if(p){document.cookie=m+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;';document.cookie=m+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;'+'domain='+location.hostname+';';}var q=new Date(o).toGMTString();document.cookie=m+'='+n+(n&&o===0?'':'; expires='+q)+'; path=/'+(p?'; domain='+i:'');}function k(m){m=m+h.getClientID();var n=new RegExp('\\b'+m+'=([^;]*)\\b');return n.test(document.cookie)?RegExp.$1:null;}var l={setDomain:function(m){i=m;var n=g.encode({base_domain:i&&i!=='.'?i:''}),o=new Date();o.setFullYear(o.getFullYear()+1);j('fbm_',n,o.getTime());},getDomain:function(){return i;},loadMeta:function(){var m=k('fbm_');if(m){var n=g.decode(m);if(!i)i=n.base_domain;return n;}},loadSignedRequest:function(){return k('fbsr_');},setSignedRequestCookie:function(m,n){if(!m)throw new Error('Value passed to Cookie.setSignedRequestCookie '+'was empty.');j('fbsr_',m,n);},clearSignedRequestCookie:function(){j('fbsr_','',0);},setRaw:j};e.exports=l;},null);
__d("guid",[],function(a,b,c,d,e,f){function g(){return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}e.exports=g;},null);
__d("UserAgent",[],function(a,b,c,d,e,f){var g=false,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;function w(){if(g)return;g=true;var y=navigator.userAgent,z=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(y),aa=/(Mac OS X)|(Windows)|(Linux)/.exec(y);s=/\b(iPhone|iP[ao]d)/.exec(y);t=/\b(iP[ao]d)/.exec(y);q=/Android/i.exec(y);u=/FBAN\/\w+;/i.exec(y);v=/Mobile/i.exec(y);r=!!(/Win64/.exec(y));if(z){h=z[1]?parseFloat(z[1]):(z[5]?parseFloat(z[5]):NaN);if(h&&document&&document.documentMode)h=document.documentMode;var ba=/(?:Trident\/(\d+.\d+))/.exec(y);m=ba?parseFloat(ba[1])+4:h;i=z[2]?parseFloat(z[2]):NaN;j=z[3]?parseFloat(z[3]):NaN;k=z[4]?parseFloat(z[4]):NaN;if(k){z=/(?:Chrome\/(\d+\.\d+))/.exec(y);l=z&&z[1]?parseFloat(z[1]):NaN;}else l=NaN;}else h=i=j=l=k=NaN;if(aa){if(aa[1]){var ca=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(y);n=ca?parseFloat(ca[1].replace('_','.')):true;}else n=false;o=!!aa[2];p=!!aa[3];}else n=o=p=false;}var x={ie:function(){return w()||h;},ieCompatibilityMode:function(){return w()||(m>h);},ie64:function(){return x.ie()&&r;},firefox:function(){return w()||i;},opera:function(){return w()||j;},webkit:function(){return w()||k;},safari:function(){return x.webkit();},chrome:function(){return w()||l;},windows:function(){return w()||o;},osx:function(){return w()||n;},linux:function(){return w()||p;},iphone:function(){return w()||s;},mobile:function(){return w()||(s||t||q||v);},nativeApp:function(){return w()||u;},android:function(){return w()||q;},ipad:function(){return w()||t;}};e.exports=x;},null);
__d("hasNamePropertyBug",["guid","UserAgent"],function(a,b,c,d,e,f,g,h){var i=h.ie()?undefined:false;function j(){var l=document.createElement("form"),m=l.appendChild(document.createElement("input"));m.name=g();i=m!==l.elements[m.name];l=m=null;return i;}function k(){return typeof i==='undefined'?j():i;}e.exports=k;},null);
__d("wrapFunction",[],function(a,b,c,d,e,f){var g={};function h(i,j,k){j=j||'default';return function(){var l=j in g?g[j](i,k):i;return l.apply(this,arguments);};}h.setWrapper=function(i,j){j=j||'default';g[j]=i;};e.exports=h;},null);
__d("DOMEventListener",["wrapFunction"],function(a,b,c,d,e,f,g){var h,i;if(window.addEventListener){h=function(k,l,m){m.wrapper=g(m,'entry','DOMEventListener.add '+l);k.addEventListener(l,m.wrapper,false);};i=function(k,l,m){k.removeEventListener(l,m.wrapper,false);};}else if(window.attachEvent){h=function(k,l,m){m.wrapper=g(m,'entry','DOMEventListener.add '+l);k.attachEvent('on'+l,m.wrapper);};i=function(k,l,m){k.detachEvent('on'+l,m.wrapper);};}else i=h=function(){};var j={add:function(k,l,m){h(k,l,m);return {remove:function(){i(k,l,m);k=null;}};},remove:i};e.exports=j;},null);
__d("sdk.createIframe",["copyProperties","guid","hasNamePropertyBug","DOMEventListener"],function(a,b,c,d,e,f,g,h,i,j){function k(l){l=g({},l);var m,n=l.name||h(),o=l.root,p=l.style||{border:'none'},q=l.url,r=l.onload;if(i()){m=document.createElement('<iframe name="'+n+'"/>');}else{m=document.createElement("iframe");m.name=n;}delete l.style;delete l.name;delete l.url;delete l.root;delete l.onload;var s=g({frameBorder:0,allowTransparency:true,scrolling:'no'},l);if(s.width)m.width=s.width+'px';if(s.height)m.height=s.height+'px';delete s.height;delete s.width;for(var t in s)if(s.hasOwnProperty(t))m.setAttribute(t,s[t]);g(m.style,p);m.src="javascript:false";o.appendChild(m);if(r)var u=j.add(m,'load',function(){u.remove();r();});m.src=q;return m;}e.exports=k;},null);
__d("DOMWrapper",[],function(a,b,c,d,e,f){var g,h,i={setRoot:function(j){g=j;},getRoot:function(){return g||document.body;},setWindow:function(j){h=j;},getWindow:function(){return h||self;}};e.exports=i;},null);
__d("sdk.feature",["JSSDKConfig"],function(a,b,c,d,e,f,g){function h(i,j){if(g.features&&i in g.features){var k=g.features[i];if(typeof k==='object'&&typeof k.rate==='number'){if(k.rate&&Math.random()*100<=k.rate){return k.value||true;}else return k.value?null:false;}else return k;}return typeof j!=='undefined'?j:null;}e.exports=h;},null);
__d("sdk.getContextType",["UserAgent","sdk.Runtime"],function(a,b,c,d,e,f,g,h){function i(){if(g.nativeApp())return 3;if(g.mobile())return 2;if(h.isEnvironment(h.ENVIRONMENTS.CANVAS))return 5;return 1;}e.exports=i;},null);
__d("UrlMap",["UrlMapConfig"],function(a,b,c,d,e,f,g){var h={resolve:function(i,j){var k=typeof j=='undefined'?location.protocol.replace(':',''):j?'https':'http';if(i in g)return k+'://'+g[i];if(typeof j=='undefined'&&i+'_'+k in g)return k+'://'+g[i+'_'+k];if(j!==true&&i+'_http' in g)return 'http://'+g[i+'_http'];if(j!==false&&i+'_https' in g)return 'https://'+g[i+'_https'];}};e.exports=h;},null);
__d("sdk.Impressions",["guid","QueryString","sdk.Runtime","UrlMap"],function(a,b,c,d,e,f,g,h,i,j){function k(m){var n=i.getClientID();if(!m.api_key&&n)m.api_key=n;m.kid_directed_site=i.getKidDirectedSite();var o=new Image();o.src=h.appendToUrl(j.resolve('www',true)+'/impression.php/'+g()+'/',m);}var l={log:function(m,n){if(!n.source)n.source='jssdk';k({lid:m,payload:ES5('JSON','stringify',false,n)});},impression:k};e.exports=l;},null);
__d("Log",["sprintf"],function(a,b,c,d,e,f,g){var h={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function i(k,l){var m=Array.prototype.slice.call(arguments,2),n=g.apply(null,m),o=window.console;if(o&&j.level>=l)o[k in o?k:'log'](n);}var j={level:-1,Level:h,debug:ES5(i,'bind',true,null,'debug',h.DEBUG),info:ES5(i,'bind',true,null,'info',h.INFO),warn:ES5(i,'bind',true,null,'warn',h.WARNING),error:ES5(i,'bind',true,null,'error',h.ERROR)};e.exports=j;},null);
__d("Base64",[],function(a,b,c,d,e,f){var g='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';function h(l){l=(l.charCodeAt(0)<<16)|(l.charCodeAt(1)<<8)|l.charCodeAt(2);return String.fromCharCode(g.charCodeAt(l>>>18),g.charCodeAt((l>>>12)&63),g.charCodeAt((l>>>6)&63),g.charCodeAt(l&63));}var i='>___?456789:;<=_______'+'\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31'+'______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';function j(l){l=(i.charCodeAt(l.charCodeAt(0)-43)<<18)|(i.charCodeAt(l.charCodeAt(1)-43)<<12)|(i.charCodeAt(l.charCodeAt(2)-43)<<6)|i.charCodeAt(l.charCodeAt(3)-43);return String.fromCharCode(l>>>16,(l>>>8)&255,l&255);}var k={encode:function(l){l=unescape(encodeURI(l));var m=(l.length+2)%3;l=(l+'\0\0'.slice(m)).replace(/[\s\S]{3}/g,h);return l.slice(0,l.length+m-2)+'=='.slice(m);},decode:function(l){l=l.replace(/[^A-Za-z0-9+\/]/g,'');var m=(l.length+3)&3;l=(l+'AAA'.slice(m)).replace(/..../g,j);l=l.slice(0,l.length+m-3);try{return decodeURIComponent(escape(l));}catch(n){throw new Error('Not valid UTF-8');}},encodeObject:function(l){return k.encode(ES5('JSON','stringify',false,l));},decodeObject:function(l){return ES5('JSON','parse',false,k.decode(l));},encodeNums:function(l){return String.fromCharCode.apply(String,ES5(l,'map',true,function(m){return g.charCodeAt((m|-(m>63))&-(m>0)&63);}));}};e.exports=k;},null);
__d("sdk.SignedRequest",["Base64"],function(a,b,c,d,e,f,g){function h(j){if(!j)return null;var k=j.split('.',2)[1].replace(/\-/g,'+').replace(/\_/g,'/');return g.decodeObject(k);}var i={parse:h};e.exports=i;},null);
__d("URIRFC3986",[],function(a,b,c,d,e,f){var g=new RegExp('^'+'([^:/?#]+:)?'+'(//'+'([^\\\\/?#@]*@)?'+'('+'\\[[A-Fa-f0-9:.]+\\]|'+'[^\\/?#:]*'+')'+'(:[0-9]*)?'+')?'+'([^?#]*)'+'(\\?[^#]*)?'+'(#.*)?'),h={parse:function(i){if(ES5(i,'trim',true)==='')return null;var j=i.match(g),k={};k.uri=j[0]?j[0]:null;k.scheme=j[1]?j[1].substr(0,j[1].length-1):null;k.authority=j[2]?j[2].substr(2):null;k.userinfo=j[3]?j[3].substr(0,j[3].length-1):null;k.host=j[2]?j[4]:null;k.port=j[5]?(j[5].substr(1)?parseInt(j[5].substr(1),10):null):null;k.path=j[6]?j[6]:null;k.query=j[7]?j[7].substr(1):null;k.fragment=j[8]?j[8].substr(1):null;k.isGenericURI=k.authority===null&&!!k.scheme;return k;}};e.exports=h;},null);
__d("createObjectFrom",[],function(a,b,c,d,e,f){function g(h,i){var j={},k=ES5('Array','isArray',false,i);if(typeof i=='undefined')i=true;for(var l=h.length;l--;)j[h[l]]=k?i[l]:i;return j;}e.exports=g;},null);
__d("URISchemes",["createObjectFrom"],function(a,b,c,d,e,f,g){var h=g(['fb','fbcf','fbconnect','fb-messenger','fbrpc','file','ftp','http','https','mailto','ms-app','itms','itms-apps','itms-services','market','svn+ssh','fbstaging','tel','sms']),i={isAllowed:function(j){if(!j)return true;return h.hasOwnProperty(j.toLowerCase());}};e.exports=i;},null);
__d("eprintf",[],function(a,b,c,d,e,f){var g=function(h){var i=ES5(Array.prototype.slice.call(arguments),'map',true,function(l){return String(l);}),j=h.split('%s').length-1;if(j!==i.length-1)return g('eprintf args number mismatch: %s',ES5('JSON','stringify',false,i));var k=1;return h.replace(/%s/g,function(l){return String(i[k++]);});};e.exports=g;},null);
__d("ex",["eprintf"],function(a,b,c,d,e,f,g){var h=function(){var i=Array.prototype.slice.call(arguments,0);i=ES5(i,'map',true,function(j){return String(j);});if(i[0].split('%s').length!==i.length)return h('ex args number mismatch: %s',ES5('JSON','stringify',false,i));return h._prefix+ES5('JSON','stringify',false,i)+h._suffix;};h._prefix='<![EX[';h._suffix=']]>';e.exports=h;},null);
__d("invariant",[],function(a,b,c,d,e,f){"use strict";var g=function(h){if(!h){var i=new Error('Minified exception occured; use the non-minified dev environment for '+'the full error message and additional helpful warnings.');i.framesToPop=1;throw i;}};e.exports=g;},null);
__d("URIBase",["URIRFC3986","URISchemes","copyProperties","ex","invariant"],function(a,b,c,d,e,f,g,h,i,j,k){var l=new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f'+'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF'+'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'),m=new RegExp('^(?:[^/]*:|'+'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');function n(p,q,r,s){if(!q)return true;if(q instanceof o){p.setProtocol(q.getProtocol());p.setDomain(q.getDomain());p.setPort(q.getPort());p.setPath(q.getPath());p.setQueryData(s.deserialize(s.serialize(q.getQueryData())));p.setFragment(q.getFragment());return true;}q=ES5(q.toString(),'trim',true);var t=g.parse(q)||{};if(!r&&!h.isAllowed(t.scheme))return false;p.setProtocol(t.scheme||'');if(!r&&l.test(t.host))return false;p.setDomain(t.host||'');p.setPort(t.port||'');p.setPath(t.path||'');if(r){p.setQueryData(s.deserialize(t.query)||{});}else try{p.setQueryData(s.deserialize(t.query)||{});}catch(u){return false;}p.setFragment(t.fragment||'');if(t.userinfo!==null)if(r){throw new Error(j('URI.parse: invalid URI (userinfo is not allowed in a URI): %s',p.toString()));}else return false;if(!p.getDomain()&&ES5(p.getPath(),'indexOf',true,'\\')!==-1)if(r){throw new Error(j('URI.parse: invalid URI (no domain but multiple back-slashes): %s',p.toString()));}else return false;if(!p.getProtocol()&&m.test(q))if(r){throw new Error(j('URI.parse: invalid URI (unsafe protocol-relative URLs): %s',p.toString()));}else return false;return true;}function o(p,q){"use strict";k(q);this.$URIBase0=q;this.$URIBase1='';this.$URIBase2='';this.$URIBase3='';this.$URIBase4='';this.$URIBase5='';this.$URIBase6={};n(this,p,true,q);}o.prototype.setProtocol=function(p){"use strict";k(h.isAllowed(p));this.$URIBase1=p;return this;};o.prototype.getProtocol=function(p){"use strict";return this.$URIBase1;};o.prototype.setSecure=function(p){"use strict";return this.setProtocol(p?'https':'http');};o.prototype.isSecure=function(){"use strict";return this.getProtocol()==='https';};o.prototype.setDomain=function(p){"use strict";if(l.test(p))throw new Error(j('URI.setDomain: unsafe domain specified: %s for url %s',p,this.toString()));this.$URIBase2=p;return this;};o.prototype.getDomain=function(){"use strict";return this.$URIBase2;};o.prototype.setPort=function(p){"use strict";this.$URIBase3=p;return this;};o.prototype.getPort=function(){"use strict";return this.$URIBase3;};o.prototype.setPath=function(p){"use strict";this.$URIBase4=p;return this;};o.prototype.getPath=function(){"use strict";return this.$URIBase4;};o.prototype.addQueryData=function(p,q){"use strict";if(Object.prototype.toString.call(p)==='[object Object]'){i(this.$URIBase6,p);}else this.$URIBase6[p]=q;return this;};o.prototype.setQueryData=function(p){"use strict";this.$URIBase6=p;return this;};o.prototype.getQueryData=function(){"use strict";return this.$URIBase6;};o.prototype.removeQueryData=function(p){"use strict";if(!ES5('Array','isArray',false,p))p=[p];for(var q=0,r=p.length;q<r;++q)delete this.$URIBase6[p[q]];return this;};o.prototype.setFragment=function(p){"use strict";this.$URIBase5=p;return this;};o.prototype.getFragment=function(){"use strict";return this.$URIBase5;};o.prototype.isEmpty=function(){"use strict";return !(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||ES5('Object','keys',false,this.getQueryData()).length>0||this.getFragment());};o.prototype.toString=function(){"use strict";var p='';if(this.$URIBase1)p+=this.$URIBase1+'://';if(this.$URIBase2)p+=this.$URIBase2;if(this.$URIBase3)p+=':'+this.$URIBase3;if(this.$URIBase4){p+=this.$URIBase4;}else if(p)p+='/';var q=this.$URIBase0.serialize(this.$URIBase6);if(q)p+='?'+q;if(this.$URIBase5)p+='#'+this.$URIBase5;return p;};o.prototype.getOrigin=function(){"use strict";return this.$URIBase1+'://'+this.$URIBase2+(this.$URIBase3?':'+this.$URIBase3:'');};o.isValidURI=function(p,q){return n(new o(null,q),p,false,q);};e.exports=o;},null);
__d("sdk.URI",["Assert","QueryString","URIBase"],function(a,b,c,d,e,f,g,h,i){var j=/\.facebook\.com$/,k={serialize:function(o){return o?h.encode(o):'';},deserialize:function(o){return o?h.decode(o):{};}};for(var l in i)if(i.hasOwnProperty(l))n[l]=i[l];var m=i===null?null:i.prototype;n.prototype=ES5('Object','create',false,m);n.prototype.constructor=n;n.__superConstructor__=i;function n(o){"use strict";g.isString(o,'The passed argument was of invalid type.');if(!(this instanceof n))return new n(o);i.call(this,o,k);}n.prototype.isFacebookURI=function(){"use strict";return j.test(this.getDomain());};n.prototype.valueOf=function(){"use strict";return this.toString();};e.exports=n;},null);
__d("sdk.domReady",[],function(a,b,c,d,e,f){var g,h="readyState" in document?/loaded|complete/.test(document.readyState):!!document.body;function i(){if(!g)return;var l;while(l=g.shift())l();g=null;}function j(l){if(g){g.push(l);return;}else l();}if(!h){g=[];if(document.addEventListener){document.addEventListener('DOMContentLoaded',i,false);window.addEventListener('load',i,false);}else if(document.attachEvent){document.attachEvent('onreadystatechange',i);window.attachEvent('onload',i);}if(document.documentElement.doScroll&&window==window.top){var k=function(){try{document.documentElement.doScroll('left');}catch(l){setTimeout(k,0);return;}i();};k();}}e.exports=j;},3);
__d("sdk.Content",["sdk.domReady","Log","UserAgent"],function(a,b,c,d,e,f,g,h,i){var j,k,l={append:function(m,n){if(!n)if(!j){j=n=document.getElementById('fb-root');if(!n){h.warn('The "fb-root" div has not been created, auto-creating');j=n=document.createElement('div');n.id='fb-root';if(i.ie()||!document.body){g(function(){document.body.appendChild(n);});}else document.body.appendChild(n);}n.className+=' fb_reset';}else n=j;if(typeof m=='string'){var o=document.createElement('div');n.appendChild(o).innerHTML=m;return o;}else return n.appendChild(m);},appendHidden:function(m){if(!n){var n=document.createElement('div'),o=n.style;o.position='absolute';o.top='-10000px';o.width=o.height=0;n=l.append(n);}return l.append(m,n);},submitToTarget:function(m,n){var o=document.createElement('form');o.action=m.url;o.target=m.target;o.method=(n)?'GET':'POST';l.appendHidden(o);for(var p in m.params)if(m.params.hasOwnProperty(p)){var q=m.params[p];if(q!==null&&q!==undefined){var r=document.createElement('input');r.name=p;r.value=q;o.appendChild(r);}}o.submit();o.parentNode.removeChild(o);}};e.exports=l;},null);
__d("sdk.Event",[],function(a,b,c,d,e,f){var g={subscribers:function(){if(!this._subscribersMap)this._subscribersMap={};return this._subscribersMap;},subscribe:function(h,i){var j=this.subscribers();if(!j[h]){j[h]=[i];}else j[h].push(i);},unsubscribe:function(h,i){var j=this.subscribers()[h];if(j)ES5(j,'forEach',true,function(k,l){if(k==i)j[l]=null;});},monitor:function(h,i){if(!i()){var j=this,k=function(){if(i.apply(i,arguments))j.unsubscribe(h,k);};this.subscribe(h,k);}},clear:function(h){delete this.subscribers()[h];},fire:function(h){var i=Array.prototype.slice.call(arguments,1),j=this.subscribers()[h];if(j)ES5(j,'forEach',true,function(k){if(k)k.apply(this,i);});}};e.exports=g;},null);
__d("Queue",["copyProperties"],function(a,b,c,d,e,f,g){var h={};function i(j){"use strict";this._opts=g({interval:0,processor:null},j);this._queue=[];this._stopped=true;}i.prototype._dispatch=function(j){"use strict";if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error('No processor available');}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(ES5(this._dispatch,'bind',true,this),this._opts.interval);}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift());};i.prototype.enqueue=function(j){"use strict";if(this._opts.processor&&!this._stopped){this._opts.processor.call(this,j);}else this._queue.push(j);return this;};i.prototype.start=function(j){"use strict";if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this;};i.prototype.isStarted=function(){"use strict";return !this._stopped;};i.prototype.dispatch=function(){"use strict";this._dispatch(true);};i.prototype.stop=function(j){"use strict";this._stopped=true;if(j)clearTimeout(this._timeout);return this;};i.prototype.merge=function(j,k){"use strict";this._queue[k?'unshift':'push'].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this;};i.prototype.getLength=function(){"use strict";return this._queue.length;};i.get=function(j,k){"use strict";var l;if(j in h){l=h[j];}else l=h[j]=new i(k);return l;};i.exists=function(j){"use strict";return j in h;};i.remove=function(j){"use strict";return delete h[j];};e.exports=i;},null);
__d("JSONRPC",["copyProperties","Log"],function(a,b,c,d,e,f,g,h){function i(j){this._counter=0;this._callbacks={};this.remote=ES5(function(k){this._context=k;return this.remote;},'bind',true,this);this.local={};this._write=j;}g(i.prototype,{stub:function(j){this.remote[j]=ES5(function(){var k=Array.prototype.slice.call(arguments),l={jsonrpc:'2.0',method:j};if(typeof k[k.length-1]=='function'){l.id=++this._counter;this._callbacks[l.id]=k.pop();}l.params=k;this._write(ES5('JSON','stringify',false,l),this._context||{method:j});},'bind',true,this);},read:function(j,k){var l=ES5('JSON','parse',false,j),m=l.id;if(!l.method){if(!this._callbacks[m]){h.warn('Could not find callback %s',m);return;}var n=this._callbacks[m];delete this._callbacks[m];delete l.id;delete l.jsonrpc;n(l);return;}var o=this,p=this.local[l.method],q;if(m){q=function(t,u){var v={jsonrpc:'2.0',id:m};v[t]=u;setTimeout(function(){o._write(ES5('JSON','stringify',false,v),k);},0);};}else q=function(){};if(!p){h.error('Method "%s" has not been defined',l.method);q('error',{code:-32601,message:'Method not found',data:l.method});return;}l.params.push(ES5(q,'bind',true,null,'result'));l.params.push(ES5(q,'bind',true,null,'error'));try{var s=p.apply(k||null,l.params);if(typeof s!=='undefined')q('result',s);}catch(r){h.error('Invokation of RPC method %s resulted in the error: %s',l.method,r.message);q('error',{code:-32603,message:'Internal error',data:r.message});}}});e.exports=i;},null);
__d("sdk.RPC",["Assert","JSONRPC","Queue"],function(a,b,c,d,e,f,g,h,i){var j=new i(),k=new h(function(m){j.enqueue(m);}),l={local:k.local,remote:k.remote,stub:ES5(k.stub,'bind',true,k),setInQueue:function(m){g.isInstanceOf(i,m);m.start(function(n){k.read(n);});},getOutQueue:function(){return j;}};e.exports=l;},null);
__d("sdk.Scribe",["QueryString","sdk.Runtime","UrlMap"],function(a,b,c,d,e,f,g,h,i){function j(l,m){if(typeof m.extra=='object')m.extra.revision=h.getRevision();(new Image()).src=g.appendToUrl(i.resolve('www',true)+'/common/scribe_endpoint.php',{c:l,m:ES5('JSON','stringify',false,m)});}var k={log:j};e.exports=k;},null);
__d("emptyFunction",["copyProperties"],function(a,b,c,d,e,f,g){function h(j){return function(){return j;};}function i(){}g(i,{thatReturns:h,thatReturnsFalse:h(false),thatReturnsTrue:h(true),thatReturnsNull:h(null),thatReturnsThis:function(){return this;},thatReturnsArgument:function(j){return j;}});e.exports=i;},null);
__d("htmlSpecialChars",[],function(a,b,c,d,e,f){var g=/&/g,h=/</g,i=/>/g,j=/"/g,k=/'/g;function l(m){if(typeof m=='undefined'||m===null||!m.toString)return '';if(m===false){return '0';}else if(m===true)return '1';return m.toString().replace(g,'&amp;').replace(j,'&quot;').replace(k,'&#039;').replace(h,'&lt;').replace(i,'&gt;');}e.exports=l;},null);
__d("Flash",["DOMEventListener","DOMWrapper","QueryString","UserAgent","copyProperties","guid","htmlSpecialChars"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n={},o,p=h.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v];}function r(){for(var v in n)if(n.hasOwnProperty(v))q(v);}function s(v){return v.replace(/\d+/g,function(w){return '000'.substring(w.length)+w;});}function t(v){if(!o){if(j.ie()>=9)g.add(window,'unload',r);o=true;}n[v]=v;}var u={embed:function(v,w,x,y){var z=l();v=m(v).replace(/&amp;/g,'&');x=k({allowscriptaccess:'always',flashvars:y,movie:v},x||{});if(typeof x.flashvars=='object')x.flashvars=i.encode(x.flashvars);var aa=[];for(var ba in x)if(x.hasOwnProperty(ba)&&x[ba])aa.push('<param name="'+m(ba)+'" value="'+m(x[ba])+'">');var ca=w.appendChild(p.createElement('span')),da='<object '+(j.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+v+'" '+(x.height?'height="'+x.height+'" ':'')+(x.width?'width="'+x.width+'" ':'')+'id="'+z+'">'+aa.join('')+'</object>';ca.innerHTML=da;var ea=ca.firstChild;t(z);return ea;},remove:q,getVersion:function(){var v='Shockwave Flash',w='application/x-shockwave-flash',x='ShockwaveFlash.ShockwaveFlash',y;if(navigator.plugins&&typeof navigator.plugins[v]=='object'){var z=navigator.plugins[v].description;if(z&&navigator.mimeTypes&&navigator.mimeTypes[w]&&navigator.mimeTypes[w].enabledPlugin)y=z.match(/\d+/g);}if(!y)try{y=(new ActiveXObject(x)).GetVariable('$version').match(/(\d+),(\d+),(\d+),(\d+)/);y=Array.prototype.slice.call(y,1);}catch(aa){}return y;},checkMinVersion:function(v){var w=u.getVersion();if(!w)return false;return s(w.join('.'))>=s(v);},isAvailable:function(){return !!u.getVersion();}};e.exports=u;},null);
__d("dotAccess",[],function(a,b,c,d,e,f){function g(h,i,j){var k=i.split('.');do{var l=k.shift();h=h[l]||j&&(h[l]={});}while(k.length&&h);return h;}e.exports=g;},null);
__d("GlobalCallback",["DOMWrapper","dotAccess","guid","wrapFunction"],function(a,b,c,d,e,f,g,h,i,j){var k,l,m={setPrefix:function(n){k=h(g.getWindow(),n,true);l=n;},create:function(n,o){if(!k)this.setPrefix('__globalCallbacks');var p=i();k[p]=j(n,'entry',o||'GlobalCallback');return l+'.'+p;},remove:function(n){var o=n.substring(l.length+1);delete k[o];}};e.exports=m;},null);
__d("XDM",["DOMEventListener","DOMWrapper","emptyFunction","Flash","GlobalCallback","guid","Log","UserAgent","wrapFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p={},q={transports:[]},r=h.getWindow();function s(u){var v={},w=u.length,x=q.transports;while(w--)v[u[w]]=1;w=x.length;while(w--){var y=x[w],z=p[y];if(!v[y]&&z.isAvailable())return y;}}var t={register:function(u,v){m.debug('Registering %s as XDM provider',u);q.transports.push(u);p[u]=v;},create:function(u){if(!u.whenReady&&!u.onMessage){m.error('An instance without whenReady or onMessage makes no sense');throw new Error('An instance without whenReady or '+'onMessage makes no sense');}if(!u.channel){m.warn('Missing channel name, selecting at random');u.channel=l();}if(!u.whenReady)u.whenReady=i;if(!u.onMessage)u.onMessage=i;var v=u.transport||s(u.blacklist||[]),w=p[v];if(w&&w.isAvailable()){m.debug('%s is available',v);w.init(u);return v;}}};t.register('flash',(function(){var u=false,v,w=false,x=15000,y;return {isAvailable:function(){return j.checkMinVersion('8.0.24');},init:function(z){m.debug('init flash: '+z.channel);var aa={send:function(da,ea,fa,ga){m.debug('sending to: %s (%s)',ea,ga);v.postMessage(da,ea,ga);}};if(u){z.whenReady(aa);return;}var ba=z.root.appendChild(r.document.createElement('div')),ca=k.create(function(){k.remove(ca);clearTimeout(y);m.info('xdm.swf called the callback');var da=k.create(function(ea,fa){ea=decodeURIComponent(ea);fa=decodeURIComponent(fa);m.debug('received message %s from %s',ea,fa);z.onMessage(ea,fa);},'xdm.swf:onMessage');v.init(z.channel,da);z.whenReady(aa);},'xdm.swf:load');v=j.embed(z.flashUrl,ba,null,{protocol:location.protocol.replace(':',''),host:location.host,callback:ca,log:w});y=setTimeout(function(){m.warn('The Flash component did not load within %s ms - '+'verify that the container is not set to hidden or invisible '+'using CSS as this will cause some browsers to not load '+'the components',x);},x);u=true;}};})());t.register('postmessage',(function(){var u=false;return {isAvailable:function(){return !!r.postMessage;},init:function(v){m.debug('init postMessage: '+v.channel);var w='_FB_'+v.channel,x={send:function(y,z,aa,ba){if(r===aa){m.error('Invalid windowref, equal to window (self)');throw new Error();}m.debug('sending to: %s (%s)',z,ba);var ca=function(){aa.postMessage('_FB_'+ba+y,z);};if(n.ie()==8||n.ieCompatibilityMode()){setTimeout(ca,0);}else ca();}};if(u){v.whenReady(x);return;}g.add(r,'message',o(function(event){var y=event.data,z=event.origin||'native';if(!/^(https?:\/\/|native$)/.test(z)){m.debug('Received message from invalid origin type: %s',z);return;}if(typeof y!='string'){m.warn('Received message of type %s from %s, expected a string',typeof y,z);return;}m.debug('received message %s from %s',y,z);if(y.substring(0,w.length)==w)y=y.substring(w.length);v.onMessage(y,z);},'entry','onMessage'));v.whenReady(x);u=true;}};})());e.exports=t;},null);
__d("sdk.XD",["sdk.Content","sdk.Event","Log","QueryString","Queue","sdk.RPC","sdk.Runtime","sdk.Scribe","sdk.URI","UrlMap","JSSDKXDConfig","XDM","sdk.createIframe","sdk.feature","guid"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v=new k(),w=new k(),x=new k(),y,z,aa=u(),ba=q.useCdn?'cdn':'www',ca=t('use_bundle')?q.XdBundleUrl:q.XdUrl,da=p.resolve(ba,false)+ca,ea=p.resolve(ba,true)+ca,fa=u(),ga=location.protocol+'//'+location.host,ha,ia=false,ja='Facebook Cross Domain Communication Frame',ka={},la=new k();l.setInQueue(la);function ma(sa){i.info('Remote XD can talk to facebook.com (%s)',sa);m.setEnvironment(sa==='canvas'?m.ENVIRONMENTS.CANVAS:m.ENVIRONMENTS.PAGETAB);}function na(sa,ta){if(!ta){i.error('No senderOrigin');throw new Error();}var ua=/^https?/.exec(ta)[0];switch(sa.xd_action){case 'proxy_ready':var va,wa;if(ua=='https'){va=x;wa=z;}else{va=w;wa=y;}if(sa.registered){ma(sa.registered);v=va.merge(v);}i.info('Proxy ready, starting queue %s containing %s messages',ua+'ProxyQueue',va.getLength());va.start(function(ya){ha.send(typeof ya==='string'?ya:j.encode(ya),ta,wa.contentWindow,fa+'_'+ua);});break;case 'plugin_ready':i.info('Plugin %s ready, protocol: %s',sa.name,ua);ka[sa.name]={protocol:ua};if(k.exists(sa.name)){var xa=k.get(sa.name);i.debug('Enqueuing %s messages for %s in %s',xa.getLength(),sa.name,ua+'ProxyQueue');(ua=='https'?x:w).merge(xa);}break;}if(sa.data)oa(sa.data,ta);}function oa(sa,ta){if(ta&&ta!=='native'&&!o(ta).isFacebookURI())return;if(typeof sa=='string'){if(/^FB_RPC:/.test(sa)){la.enqueue(sa.substring(7));return;}if(sa.substring(0,1)=='{'){try{sa=ES5('JSON','parse',false,sa);}catch(ua){i.warn('Failed to decode %s as JSON',sa);return;}}else sa=j.decode(sa);}if(!ta)if(sa.xd_sig==aa)ta=sa.xd_origin;if(sa.xd_action){na(sa,ta);return;}if(sa.access_token)m.setSecure(/^https/.test(ga));if(sa.cb){var va=ra._callbacks[sa.cb];if(!ra._forever[sa.cb])delete ra._callbacks[sa.cb];if(va)va(sa);}}function pa(sa,ta){if(sa=='facebook'){ta.relation='parent.parent';v.enqueue(ta);}else{ta.relation='parent.frames["'+sa+'"]';var ua=ka[sa];if(ua){i.debug('Enqueuing message for plugin %s in %s',sa,ua.protocol+'ProxyQueue');(ua.protocol=='https'?x:w).enqueue(ta);}else{i.debug('Buffering message for plugin %s',sa);k.get(sa).enqueue(ta);}}}l.getOutQueue().start(function(sa){pa('facebook','FB_RPC:'+sa);});function qa(sa){if(ia)return;var ta=g.appendHidden(document.createElement('div')),ua=r.create({blacklist:null,root:ta,channel:fa,flashUrl:q.Flash.path,whenReady:function(va){ha=va;var wa={channel:fa,origin:location.protocol+'//'+location.host,transport:ua,xd_name:sa},xa='#'+j.encode(wa);if(m.getSecure()!==true)y=s({url:da+xa,name:'fb_xdm_frame_http',id:'fb_xdm_frame_http',root:ta,'aria-hidden':true,title:ja,tabindex:-1});z=s({url:ea+xa,name:'fb_xdm_frame_https',id:'fb_xdm_frame_https',root:ta,'aria-hidden':true,title:ja,tabindex:-1});},onMessage:oa});if(!ua)n.log('jssdk_error',{appId:m.getClientID(),error:'XD_TRANSPORT',extra:{message:'Failed to create a valid transport'}});ia=true;}var ra={rpc:l,_callbacks:{},_forever:{},_channel:fa,_origin:ga,onMessage:oa,recv:oa,init:qa,sendToFacebook:pa,inform:function(sa,ta,ua,va){pa('facebook',{method:sa,params:ES5('JSON','stringify',false,ta||{}),behavior:va||'p',relation:ua});},handler:function(sa,ta,ua,va){var wa='#'+j.encode({cb:this.registerCallback(sa,ua,va),origin:ga+'/'+fa,domain:location.hostname,relation:ta||'opener'});return (location.protocol=='https:'?ea:da)+wa;},registerCallback:function(sa,ta,ua){ua=ua||u();if(ta)ra._forever[ua]=true;ra._callbacks[ua]=sa;return ua;}};h.subscribe('init:post',function(sa){qa(sa.xdProxyName);var ta=t('xd_timeout');if(ta)setTimeout(function(){var ua=z&&(!!y==w.isStarted()&&!!z==x.isStarted());if(!ua)n.log('jssdk_error',{appId:m.getClientID(),error:'XD_INITIALIZATION',extra:{message:'Failed to initialize in '+ta+'ms'}});},ta);});e.exports=ra;},null);
__d("sdk.Auth",["sdk.Cookie","copyProperties","sdk.createIframe","DOMWrapper","sdk.feature","sdk.getContextType","guid","sdk.Impressions","Log","ObservableMixin","sdk.Runtime","sdk.SignedRequest","UrlMap","sdk.URI","sdk.XD"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v,w,x=new p();function y(ea,fa){var ga=q.getUserID(),ha='';if(ea)if(ea.userID){ha=ea.userID;}else if(ea.signedRequest){var ia=r.parse(ea.signedRequest);if(ia&&ia.user_id)ha=ia.user_id;}var ja=q.getLoginStatus(),ka=(ja==='unknown'&&ea)||(q.getUseCookie()&&q.getCookieUserID()!==ha),la=ga&&!ea,ma=ea&&ga&&ga!=ha,na=ea!=v,oa=fa!=(ja||'unknown');q.setLoginStatus(fa);q.setAccessToken(ea&&ea.accessToken||null);q.setUserID(ha);v=ea;var pa={authResponse:ea,status:fa};if(la||ma)x.inform('logout',pa);if(ka||ma)x.inform('login',pa);if(na)x.inform('authresponse.change',pa);if(oa)x.inform('status.change',pa);return pa;}function z(){return v;}function aa(ea,fa,ga){return function(ha){var ia;if(ha&&ha.access_token){var ja=r.parse(ha.signed_request);fa={accessToken:ha.access_token,userID:ja.user_id,expiresIn:parseInt(ha.expires_in,10),signedRequest:ha.signed_request};if(ha.granted_scopes)fa.grantedScopes=ha.granted_scopes;if(q.getUseCookie()){var ka=fa.expiresIn===0?0:ES5('Date','now',false)+fa.expiresIn*1000,la=g.getDomain();if(!la&&ha.base_domain)g.setDomain('.'+ha.base_domain);g.setSignedRequestCookie(ha.signed_request,ka);}ia='connected';y(fa,ia);}else if(ga==='logout'||ga==='login_status'){if(ha.error&&ha.error==='not_authorized'){ia='not_authorized';}else ia='unknown';y(null,ia);if(q.getUseCookie())g.clearSignedRequestCookie();}if(ha&&ha.https==1)q.setSecure(true);if(ea)ea({authResponse:fa,status:q.getLoginStatus()});return fa;};}function ba(ea){var fa,ga=ES5('Date','now',false);if(w){clearTimeout(w);w=null;}var ha=aa(ea,v,'login_status'),ia=t(s.resolve('www',true)+'/connect/ping').setQueryData({client_id:q.getClientID(),response_type:'token,signed_request,code',domain:location.hostname,origin:l(),redirect_uri:u.handler(function(ja){if(k('e2e_ping_tracking',true)){var ka={init:ga,close:ES5('Date','now',false),method:'ping'};o.debug('e2e: %s',ES5('JSON','stringify',false,ka));n.log(114,{payload:ka});}fa.parentNode.removeChild(fa);if(ha(ja))w=setTimeout(function(){ba(function(){});},1200000);},'parent'),sdk:'joey',kid_directed_site:q.getKidDirectedSite()});fa=i({root:j.getRoot(),name:m(),url:ia.toString(),style:{display:'none'}});}var ca;function da(ea,fa){if(!q.getClientID()){o.warn('FB.getLoginStatus() called before calling FB.init().');return;}if(ea)if(!fa&&ca=='loaded'){ea({status:q.getLoginStatus(),authResponse:z()});return;}else x.subscribe('FB.loginStatus',ea);if(!fa&&ca=='loading')return;ca='loading';var ga=function(ha){ca='loaded';x.inform('FB.loginStatus',ha);x.clearSubscribers('FB.loginStatus');};ba(ga);}h(x,{getLoginStatus:da,fetchLoginStatus:ba,setAuthResponse:y,getAuthResponse:z,parseSignedRequest:r.parse,xdResponseWrapper:aa});e.exports=x;},null);
__d("toArray",["invariant"],function(a,b,c,d,e,f,g){function h(i){var j=i.length;g(!ES5('Array','isArray',false,i)&&(typeof i==='object'||typeof i==='function'));g(typeof j==='number');g(j===0||(j-1) in i);if(i.hasOwnProperty)try{return Array.prototype.slice.call(i);}catch(k){}var l=Array(j);for(var m=0;m<j;m++)l[m]=i[m];return l;}e.exports=h;},null);
__d("createArrayFrom",["toArray"],function(a,b,c,d,e,f,g){function h(j){return (!!j&&(typeof j=='object'||typeof j=='function')&&('length' in j)&&!('setInterval' in j)&&(typeof j.nodeType!='number')&&(ES5('Array','isArray',false,j)||('callee' in j)||('item' in j)));}function i(j){if(!h(j)){return [j];}else if(ES5('Array','isArray',false,j)){return j.slice();}else return g(j);}e.exports=i;},null);
__d("sdk.DOM",["Assert","createArrayFrom","sdk.domReady","UserAgent"],function(a,b,c,d,e,f,g,h,i,j){var k={};function l(z,aa){var ba=(z.getAttribute(aa)||z.getAttribute(aa.replace(/_/g,'-'))||z.getAttribute(aa.replace(/-/g,'_'))||z.getAttribute(aa.replace(/-/g,''))||z.getAttribute(aa.replace(/_/g,''))||z.getAttribute('data-'+aa)||z.getAttribute('data-'+aa.replace(/_/g,'-'))||z.getAttribute('data-'+aa.replace(/-/g,'_'))||z.getAttribute('data-'+aa.replace(/-/g,''))||z.getAttribute('data-'+aa.replace(/_/g,'')));return ba?String(ba):null;}function m(z,aa){var ba=l(z,aa);return ba?/^(true|1|yes|on)$/.test(ba):null;}function n(z,aa){g.isTruthy(z,'element not specified');g.isString(aa);try{return String(z[aa]);}catch(ba){throw new Error('Could not read property '+aa+' : '+ba.message);}}function o(z,aa){g.isTruthy(z,'element not specified');g.isString(aa);try{z.innerHTML=aa;}catch(ba){throw new Error('Could not set innerHTML : '+ba.message);}}function p(z,aa){g.isTruthy(z,'element not specified');g.isString(aa);var ba=' '+n(z,'className')+' ';return ES5(ba,'indexOf',true,' '+aa+' ')>=0;}function q(z,aa){g.isTruthy(z,'element not specified');g.isString(aa);if(!p(z,aa))z.className=n(z,'className')+' '+aa;}function r(z,aa){g.isTruthy(z,'element not specified');g.isString(aa);var ba=new RegExp('\\s*'+aa,'g');z.className=ES5(n(z,'className').replace(ba,''),'trim',true);}function s(z,aa,ba){g.isString(z);aa=aa||document.body;ba=ba||'*';if(aa.querySelectorAll)return h(aa.querySelectorAll(ba+'.'+z));var ca=aa.getElementsByTagName(ba),da=[];for(var ea=0,fa=ca.length;ea<fa;ea++)if(p(ca[ea],z))da[da.length]=ca[ea];return da;}function t(z,aa){g.isTruthy(z,'element not specified');g.isString(aa);aa=aa.replace(/-(\w)/g,function(da,ea){return ea.toUpperCase();});var ba=z.currentStyle||document.defaultView.getComputedStyle(z,null),ca=ba[aa];if(/backgroundPosition?/.test(aa)&&/top|left/.test(ca))ca='0%';return ca;}function u(z,aa,ba){g.isTruthy(z,'element not specified');g.isString(aa);aa=aa.replace(/-(\w)/g,function(ca,da){return da.toUpperCase();});z.style[aa]=ba;}function v(z,aa){var ba=true;for(var ca=0,da;da=aa[ca++];)if(!(da in k)){ba=false;k[da]=true;}if(ba)return;if(!j.ie()){var ea=document.createElement('style');ea.type='text/css';ea.textContent=z;document.getElementsByTagName('head')[0].appendChild(ea);}else try{document.createStyleSheet().cssText=z;}catch(fa){if(document.styleSheets[0])document.styleSheets[0].cssText+=z;}}function w(){var z=(document.documentElement&&document.compatMode=='CSS1Compat')?document.documentElement:document.body;return {scrollTop:z.scrollTop||document.body.scrollTop,scrollLeft:z.scrollLeft||document.body.scrollLeft,width:window.innerWidth?window.innerWidth:z.clientWidth,height:window.innerHeight?window.innerHeight:z.clientHeight};}function x(z){g.isTruthy(z,'element not specified');var aa=0,ba=0;do{aa+=z.offsetLeft;ba+=z.offsetTop;}while(z=z.offsetParent);return {x:aa,y:ba};}var y={containsCss:p,addCss:q,removeCss:r,getByClass:s,getStyle:t,setStyle:u,getAttr:l,getBoolAttr:m,getProp:n,html:o,addCssRules:v,getViewportInfo:w,getPosition:x,ready:i};e.exports=y;},null);
__d("sdk.ErrorHandling",["sdk.feature","ManagedError","sdk.Runtime","sdk.Scribe","UserAgent","wrapFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=g('error_handling',false),n='';function o(u){var v=u._originalError;delete u._originalError;j.log('jssdk_error',{appId:i.getClientID(),error:u.name||u.message,extra:u});throw v;}function p(u){var v={line:u.lineNumber||u.line,message:u.message,name:u.name,script:u.fileName||u.sourceURL||u.script,stack:u.stackTrace||u.stack};v._originalError=u;if(k.chrome()&&/([\w:\.\/]+\.js):(\d+)/.test(u.stack)){v.script=RegExp.$1;v.line=parseInt(RegExp.$2,10);}for(var w in v)(v[w]==null&&delete v[w]);return v;}function q(u,v){return function(){if(!m)return u.apply(this,arguments);try{n=v;return u.apply(this,arguments);}catch(w){if(w instanceof h)throw w;var x=p(w);x.entry=v;var y=ES5(Array.prototype.slice.call(arguments),'map',true,function(z){var aa=Object.prototype.toString.call(z);return (/^\[object (String|Number|Boolean|Object|Date)\]$/).test(aa)?z:z.toString();});x.args=ES5('JSON','stringify',false,y).substring(0,200);o(x);}finally{n='';}};}function r(u){if(!u.__wrapper)u.__wrapper=function(){try{return u.apply(this,arguments);}catch(v){window.setTimeout(function(){throw v;},0);return false;}};return u.__wrapper;}function s(u,v){return function(w,x){var y=v+':'+(n||'[global]')+':'+(w.name||'[anonymous]'+(arguments.callee.caller.name?'('+arguments.callee.caller.name+')':''));return u(l(w,'entry',y),x);};}if(m){setTimeout=s(setTimeout,'setTimeout');setInterval=s(setInterval,'setInterval');l.setWrapper(q,'entry');}var t={guard:q,unguard:r};e.exports=t;},null);
__d("sdk.Insights",["sdk.Impressions"],function(a,b,c,d,e,f,g){var h={TYPE:{NOTICE:'notice',WARNING:'warn',ERROR:'error'},CATEGORY:{DEPRECATED:'deprecated',APIERROR:'apierror'},log:function(i,j,k){var l={source:'jssdk',type:i,category:j,payload:k};g.log(113,l);},impression:g.impression};e.exports=h;},null);
__d("FB",["sdk.Auth","copyProperties","JSSDKCssConfig","dotAccess","sdk.domReady","sdk.DOM","sdk.ErrorHandling","sdk.Content","DOMWrapper","GlobalCallback","sdk.Insights","Log","sdk.Runtime","sdk.Scribe","JSSDKConfig"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v,w,x=j(u,'api.mode'),y={};v=window.FB={};var z={};r.level=1;p.setPrefix('FB.__globalCallbacks');var aa=document.createElement('div');o.setRoot(aa);k(function(){r.info('domReady');n.appendHidden(aa);if(i.rules)l.addCssRules(i.rules,i.components);});s.subscribe('AccessToken.change',function(da){if(!da&&s.getLoginStatus()==='connected')g.getLoginStatus(null,true);});if(j(u,'api.whitelist.length')){w={};ES5(u.api.whitelist,'forEach',true,function(da){w[da]=1;});}function ba(da,ea,fa,ga){var ha;if(/^_/.test(fa)){ha='hide';}else if(w&&!w[ea])ha=x;switch(ha){case 'hide':return;case 'stub':return function(){r.warn('The method FB.%s has been removed from the JS SDK.',ea);};break;default:return m.guard(function(){if(ha==='warn'){r.warn('The method FB.%s is not officially supported by '+'Facebook and access to it will soon be removed.',ea);if(!y.hasOwnProperty(ea)){q.log(q.TYPE.WARNING,q.CATEGORY.DEPRECATED,'FB.'+ea);t.log('jssdk_error',{appId:s.getClientID(),error:'Private method used',extra:{args:ea}});y[ea]=true;}}function ia(qa){if(ES5('Array','isArray',false,qa))return ES5(qa,'map',true,ia);if(qa&&typeof qa==='object'&&qa.__wrapped)return qa.__wrapped;return typeof qa==='function'&&/^function/.test(qa.toString())?m.unguard(qa):qa;}var ja=ES5(Array.prototype.slice.call(arguments),'map',true,ia),ka=da.apply(ga,ja),la,ma=true;if(ka&&typeof ka==='object'){var na=Function();na.prototype=ka;la=new na();la.__wrapped=ka;for(var oa in ka){var pa=ka[oa];if(typeof pa!=='function'||oa==='constructor')continue;ma=false;la[oa]=ba(pa,ea+':'+oa,oa,ka);}}if(!ma)return la;return ma?ka:la;},ea);}}function ca(da,ea){var fa=da?j(v,da,true):v;ES5(ES5('Object','keys',false,ea),'forEach',true,function(ga){var ha=ea[ga];if(typeof ha==='function'){var ia=(da?da+'.':'')+ga,ja=ba(ha,ia,ga,ea);if(ja)fa[ga]=ja;}});}s.setSecure((function(){var da=/iframe_canvas|app_runner/.test(window.name),ea=/dialog/.test(window.name);if(location.protocol=='https:'&&(window==top||!(da||ea)))return true;if(/_fb_https?/.test(window.name))return ES5(window.name,'indexOf',true,'_fb_https')!=-1;})());h(z,{provide:ca});e.exports=z;},null);
__d("ArgumentError",["ManagedError"],function(a,b,c,d,e,f,g){function h(i,j){g.prototype.constructor.apply(this,arguments);}h.prototype=new g();h.prototype.constructor=h;e.exports=h;},null);
__d("CORSRequest",["wrapFunction","QueryString"],function(a,b,c,d,e,f,g,h){function i(l,m){if(!self.XMLHttpRequest)return null;var n=new XMLHttpRequest(),o=function(){};if('withCredentials' in n){n.open(l,m,true);n.setRequestHeader('Content-type','application/x-www-form-urlencoded');}else if(self.XDomainRequest){n=new XDomainRequest();try{n.open(l,m);n.onprogress=n.ontimeout=o;}catch(p){return null;}}else return null;var q={send:function(t){n.send(t);}},r=g(function(){r=o;if('onload' in q)q.onload(n);},'entry','XMLHttpRequest:load'),s=g(function(){s=o;if('onerror' in q)q.onerror(n);},'entry','XMLHttpRequest:error');n.onload=function(){r();};n.onerror=function(){s();};n.onreadystatechange=function(){if(n.readyState==4)if(n.status==200){r();}else s();};return q;}function j(l,m,n,o){n.suppress_http_code=1;var p=h.encode(n);if(m!='post'){l=h.appendToUrl(l,p);p='';}var q=i(m,l);if(!q)return false;q.onload=function(r){o(ES5('JSON','parse',false,r.responseText));};q.onerror=function(r){if(r.responseText){o(ES5('JSON','parse',false,r.responseText));}else o({error:{type:'http',message:'unknown error',status:r.status}});};q.send(p);return true;}var k={execute:j};e.exports=k;},null);
__d("FlashRequest",["DOMWrapper","Flash","GlobalCallback","QueryString","Queue"],function(a,b,c,d,e,f,g,h,i,j,k){var l,m={},n,o;function p(){if(!n)throw new Error('swfUrl has not been set');var s=i.create(function(){l.start(function(u){var v=o.execute(u.method,u.url,u.body);if(!v)throw new Error('Could create request');m[v]=u.callback;});}),t=i.create(function(u,v,w){var x;try{x=ES5('JSON','parse',false,decodeURIComponent(w));}catch(y){x={error:{type:'SyntaxError',message:y.message,status:v,raw:w}};}m[u](x);delete m[u];});o=h.embed(n,g.getRoot(),null,{log:false,initCallback:s,requestCallback:t});}function q(s,t,u,v){u.suppress_http_code=1;if(!u.method)u.method=t;var w=j.encode(u);if(t==='get'&&s.length+w.length<2000){s=j.appendToUrl(s,w);w='';}else t='post';if(!l){if(!h.isAvailable())return false;l=new k();p();}l.enqueue({method:t,url:s,body:w,callback:v});return true;}var r={setSwfUrl:function(s){n=s;},execute:q};e.exports=r;},null);
__d("flattenObject",[],function(a,b,c,d,e,f){function g(h){var i={};for(var j in h)if(h.hasOwnProperty(j)){var k=h[j];if(null===k||undefined===k){continue;}else if(typeof k=='string'){i[j]=k;}else i[j]=ES5('JSON','stringify',false,k);}return i;}e.exports=g;},null);
__d("JSONPRequest",["DOMWrapper","GlobalCallback","QueryString"],function(a,b,c,d,e,f,g,h,i){function j(l,m,n,o){var p=document.createElement('script'),q=function(s){q=function(){};h.remove(n.callback);o(s);p.parentNode.removeChild(p);};n.callback=h.create(q);if(!n.method)n.method=m;l=i.appendToUrl(l,n);if(l.length>2000){h.remove(n.callback);return false;}p.onerror=function(){q({error:{type:'http',message:'unknown error'}});};var r=function(){setTimeout(function(){q({error:{type:'http',message:'unknown error'}});},0);};if(p.addEventListener){p.addEventListener('load',r,false);}else p.onreadystatechange=function(){if(/loaded|complete/.test(this.readyState))r();};p.src=l;g.getRoot().appendChild(p);return true;}var k={execute:j};e.exports=k;},null);
__d("ApiClient",["ArgumentError","Assert","copyProperties","CORSRequest","FlashRequest","flattenObject","JSONPRequest","Log","ObservableMixin","sprintf","sdk.URI","UrlMap","ApiClientConfig"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t,u,v,w={get:true,post:true,'delete':true,put:true},x={fql_query:true,fql_multiquery:true,friends_get:true,notifications_get:true,stream_get:true,users_getinfo:true};function y(da,ea,fa,ga){if(v)fa=i({},v,fa);fa.access_token=fa.access_token||t;fa.pretty=fa.pretty||0;fa=l(fa);var ha={jsonp:m,cors:j,flash:k},ia;if(fa.transport){ia=[fa.transport];delete fa.transport;}else ia=['jsonp','cors','flash'];for(var ja=0;ja<ia.length;ja++){var ka=ha[ia[ja]],la=i({},fa);if(ka.execute(da,ea,la,ga))return;}ga({error:{type:'no-transport',message:'Could not find a usable transport for request'}});}function z(da,ea,fa,ga,ha){ca.inform('request.complete',ea,fa,ga,ha);if(da)da(ha);}function aa(da){h.isString(da,'Invalid path');if(!/^https?/.test(da)&&da.charAt(0)!=='/')da='/'+da;var ea,fa={};try{ea=new q(da);}catch(ga){throw new g(ga.message,ga);}ES5(Array.prototype.slice.call(arguments,1),'forEach',true,function(ma){fa[typeof ma]=ma;});var ha=(fa.string||'get').toLowerCase();h.isTrue(w.hasOwnProperty(ha),p('Invalid method passed to ApiClient: %s',ha));var ia=fa['function'];if(!ia)n.warn('No callback passed to the ApiClient');if(fa.object)ea.addQueryData(fa.object);var ja=ea.getQueryData(),ka=ES5(z,'bind',true,null,ia,ea.getPath(),ha,ja),la=ea.getProtocol()&&ea.getDomain()?ea.setQueryData({}).toString():r.resolve('graph')+ea.getPath();ja.method=ha;y(la,ha=='get'?'get':'post',ja,ka);}function ba(da,ea){h.isObject(da);h.isString(da.method,'method missing');if(!ea)n.warn('No callback passed to the ApiClient');var fa=da.method.toLowerCase().replace('.','_');da.format='json-strings';da.api_key=u;var ga=fa in x?'api_read':'api',ha=r.resolve(ga)+'/restserver.php',ia=ES5(z,'bind',true,null,ea,'/restserver.php','get',da);y(ha,'get',da,ia);}var ca=i(new o(),{setAccessToken:function(da){t=da;},setClientID:function(da){u=da;},setDefaultParams:function(da){v=da;},rest:ba,graph:aa});k.setSwfUrl(s.FlashRequest.swfUrl);e.exports=ca;},null);
__d("sdk.PlatformVersioning",["sdk.Runtime","ManagedError"],function(a,b,c,d,e,f,g,h){var i=/^v\d+\.\d\d?$/,j={REGEX:i,assertVersionIsSet:function(){if(!g.getVersion())throw new h('init not called with valid version');},assertValidVersion:function(k){if(!i.test(k))throw new h('invalid version specified');}};e.exports=j;},null);
__d("sdk.api",["ApiClient","sdk.PlatformVersioning","sdk.Runtime","sdk.URI"],function(a,b,c,d,e,f,g,h,i,j){var k;i.subscribe('ClientID.change',function(m){g.setClientID(m);});i.subscribe('AccessToken.change',function(m){k=m;g.setAccessToken(m);});g.setDefaultParams({sdk:'joey'});g.subscribe('request.complete',function(m,n,o,p){var q=false;if(p&&typeof p=='object')if(p.error){if(p.error=='invalid_token'||(p.error.type=='OAuthException'&&p.error.code==190))q=true;}else if(p.error_code)if(p.error_code=='190')q=true;if(q&&k===i.getAccessToken())i.setAccessToken(null);});g.subscribe('request.complete',function(m,n,o,p){if(((m=='/me/permissions'&&n==='delete')||(m=='/restserver.php'&&o.method=='Auth.revokeAuthorization'))&&p===true)i.setAccessToken(null);});function l(m){if(typeof m==='string'){if(i.getIsVersioned()){h.assertVersionIsSet();if(!/https?/.test(m)&&m.charAt(0)!=='/')m='/'+m;m=j(m).setDomain(null).setProtocol(null).toString();if(!h.REGEX.test(m.substring(1,ES5(m,'indexOf',true,'/',1))))m='/'+i.getVersion()+m;var n=[m].concat(Array.prototype.slice.call(arguments,1));g.graph.apply(g,n);}else g.graph.apply(g,arguments);}else g.rest.apply(g,arguments);}e.exports=l;},null);
__d("legacy:fb.api",["FB","sdk.api"],function(a,b,c,d,e,f,g,h){g.provide('',{api:h});},3);
__d("sdk.Canvas.Environment",["sdk.RPC"],function(a,b,c,d,e,f,g){function h(k){g.remote.getPageInfo(function(l){k(l.result);});}function i(k,l){g.remote.scrollTo({x:k||0,y:l||0});}g.stub('getPageInfo');g.stub('scrollTo');var j={getPageInfo:h,scrollTo:i};e.exports=j;},null);
__d("sdk.Intl",["Log"],function(a,b,c,d,e,f,g){var h=('['+'.!?'+'\u3002'+'\uFF01'+'\uFF1F'+'\u0964'+'\u2026'+'\u0EAF'+'\u1801'+'\u0E2F'+'\uFF0E'+']');function i(l){if(typeof l!='string')return false;return !!l.match(new RegExp(h+'['+')"'+"'"+'\u00BB'+'\u0F3B'+'\u0F3D'+'\u2019'+'\u201D'+'\u203A'+'\u3009'+'\u300B'+'\u300D'+'\u300F'+'\u3011'+'\u3015'+'\u3017'+'\u3019'+'\u301B'+'\u301E'+'\u301F'+'\uFD3F'+'\uFF07'+'\uFF09'+'\uFF3D'+'\\s'+']*$'));}function j(l,m){if(m!==undefined)if(typeof m!='object'){g.error('The second arg to FB.Intl.tx() must be an Object for '+'FB.Intl.tx('+l+', ...)');}else{var n;for(var o in m)if(m.hasOwnProperty(o)){if(i(m[o])){n=new RegExp('\\{'+o+'\\}'+h+'*','g');}else n=new RegExp('\\{'+o+'\\}','g');l=l.replace(n,m[o]);}}return l;}function k(){throw new Error('Placeholder function');}k._=j;e.exports={tx:k};},null);
__d("sdk.Dialog",["sdk.Canvas.Environment","sdk.Content","sdk.DOM","DOMEventListener","sdk.Intl","ObservableMixin","sdk.Runtime","Type","UserAgent","sdk.feature"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=590,r=500,s=240,t=575,u=function(){var y;if(p('dialog_resize_refactor')){var z=v();y=z&&(z.height>=q||z.width>=r);}else y=!!o.ipad();u=function(){return y;};return y;};function v(){if(p('dialog_resize_refactor')){var y=i.getViewportInfo();if(y.height&&y.width)return {width:Math.min(y.width,q),height:Math.min(y.height,r)};}return null;}var w=n.extend({constructor:function y(z,aa){this.parent();this.id=z;this.display=aa;this._e2e={};if(!x._dialogs){x._dialogs={};x._addOrientationHandler();}x._dialogs[z]=this;this.trackEvent('init');},trackEvent:function(y,z){if(this._e2e[y])return this;this._e2e[y]=z||ES5('Date','now',false);if(y=='close')this.inform('e2e:end',this._e2e);return this;},trackEvents:function(y){if(typeof y==='string')y=ES5('JSON','parse',false,y);for(var z in y)if(y.hasOwnProperty(z))this.trackEvent(z,y[z]);return this;}},l),x={newInstance:function(y,z){return new w(y,z);},_dialogs:null,_lastYOffset:0,_loaderEl:null,_overlayEl:null,_stack:[],_active:null,get:function(y){return x._dialogs[y];},_findRoot:function(y){while(y){if(i.containsCss(y,'fb_dialog'))return y;y=y.parentNode;}},_createWWWLoader:function(y){y=y?y:460;return x.create({content:('<div class="dialog_title">'+'  <a id="fb_dialog_loader_close">'+'    <div class="fb_dialog_close_icon"></div>'+'  </a>'+'  <span>Facebook</span>'+'  <div style="clear:both;"></div>'+'</div>'+'<div class="dialog_content"></div>'+'<div class="dialog_footer"></div>'),width:y});},_createMobileLoader:function(){var y=o.nativeApp()?'':('<table>'+'  <tbody>'+'    <tr>'+'      <td class="header_left">'+'        <label class="touchable_button">'+'          <input type="submit" value="'+k.tx._("Cancel")+'"'+'            id="fb_dialog_loader_close"/>'+'        </label>'+'      </td>'+'      <td class="header_center">'+'        <div>'+k.tx._("Loading...")+'</div>'+'      </td>'+'      <td class="header_right">'+'      </td>'+'    </tr>'+'  </tbody>'+'</table>');return x.create({classes:'loading'+(u()?' centered':''),content:('<div class="dialog_header">'+y+'</div>')});},_restoreBodyPosition:function(){if(!u()){var y=document.getElementsByTagName('body')[0];i.removeCss(y,'fb_hidden');}},_showTabletOverlay:function(){if(!u())return;if(!x._overlayEl){x._overlayEl=document.createElement('div');x._overlayEl.setAttribute('id','fb_dialog_ipad_overlay');h.append(x._overlayEl,null);}x._overlayEl.className='';},_hideTabletOverlay:function(){if(u())x._overlayEl.className='hidden';},showLoader:function(y,z){x._showTabletOverlay();if(!x._loaderEl)x._loaderEl=x._findRoot(o.mobile()?x._createMobileLoader():x._createWWWLoader(z));if(!y)y=function(){};var aa=document.getElementById('fb_dialog_loader_close');i.removeCss(aa,'fb_hidden');aa.onclick=function(){x._hideLoader();x._restoreBodyPosition();x._hideTabletOverlay();y();};var ba=document.getElementById('fb_dialog_ipad_overlay');if(ba)ba.ontouchstart=aa.onclick;x._makeActive(x._loaderEl);},_hideLoader:function(){if(x._loaderEl&&x._loaderEl==x._active)x._loaderEl.style.top='-10000px';},_makeActive:function(y){x._setDialogSizes();x._lowerActive();x._active=y;if(m.isEnvironment(m.ENVIRONMENTS.CANVAS))g.getPageInfo(function(z){x._centerActive(z);});x._centerActive();},_lowerActive:function(){if(!x._active)return;x._active.style.top='-10000px';x._active=null;},_removeStacked:function(y){x._stack=ES5(x._stack,'filter',true,function(z){return z!=y;});},_centerActive:function(y){var z=x._active;if(!z)return;var aa=i.getViewportInfo(),ba=parseInt(z.offsetWidth,10),ca=parseInt(z.offsetHeight,10),da=aa.scrollLeft+(aa.width-ba)/2,ea=(aa.height-ca)/2.5;if(da<ea)ea=da;var fa=aa.height-ca-ea,ga=(aa.height-ca)/2;if(y)ga=y.scrollTop-y.offsetTop+(y.clientHeight-ca)/2;if(ga<ea){ga=ea;}else if(ga>fa)ga=fa;ga+=aa.scrollTop;if(o.mobile()){var ha=100;if(u()){ha+=(aa.height-ca)/2;}else{var ia=document.getElementsByTagName('body')[0];i.addCss(ia,'fb_hidden');if(p('dialog_resize_refactor'))ia.style.width='auto';ga=10000;}var ja=i.getByClass('fb_dialog_padding',z);if(ja.length)ja[0].style.height=ha+'px';}z.style.left=(da>0?da:0)+'px';z.style.top=(ga>0?ga:0)+'px';},_setDialogSizes:function(){if(!o.mobile()||u())return;for(var y in x._dialogs)if(x._dialogs.hasOwnProperty(y)){var z=document.getElementById(y);if(z){z.style.width=x.getDefaultSize().width+'px';z.style.height=x.getDefaultSize().height+'px';}}},getDefaultSize:function(){if(o.mobile()){var y=v();if(y)return y;if(o.ipad())return {width:r,height:q};if(o.android()){return {width:screen.availWidth,height:screen.availHeight};}else{var z=window.innerWidth,aa=window.innerHeight,ba=z/aa>1.2;return {width:z,height:Math.max(aa,(ba?screen.width:screen.height))};}}return {width:t,height:s};},_handleOrientationChange:function(y){var z=p('dialog_resize_refactor',false)?i.getViewportInfo().width:screen.availWidth;if(o.android()&&z==x._availScreenWidth){setTimeout(x._handleOrientationChange,50);return;}x._availScreenWidth=z;if(u()){x._centerActive();}else{var aa=x.getDefaultSize().width;for(var ba in x._dialogs)if(x._dialogs.hasOwnProperty(ba)){var ca=document.getElementById(ba);if(ca)ca.style.width=aa+'px';}}},_addOrientationHandler:function(){if(!o.mobile())return;var y="onorientationchange" in window?'orientationchange':'resize';x._availScreenWidth=p('dialog_resize_refactor',false)?i.getViewportInfo().width:screen.availWidth;j.add(window,y,x._handleOrientationChange);},create:function(y){y=y||{};var z=document.createElement('div'),aa=document.createElement('div'),ba='fb_dialog';if(y.closeIcon&&y.onClose){var ca=document.createElement('a');ca.className='fb_dialog_close_icon';ca.onclick=y.onClose;z.appendChild(ca);}ba+=' '+(y.classes||'');if(o.ie()){ba+=' fb_dialog_legacy';ES5(['vert_left','vert_right','horiz_top','horiz_bottom','top_left','top_right','bottom_left','bottom_right'],'forEach',true,function(fa){var ga=document.createElement('span');ga.className='fb_dialog_'+fa;z.appendChild(ga);});}else ba+=o.mobile()?' fb_dialog_mobile':' fb_dialog_advanced';if(y.content)h.append(y.content,aa);z.className=ba;var da=parseInt(y.width,10);if(!isNaN(da))z.style.width=da+'px';aa.className='fb_dialog_content';z.appendChild(aa);if(o.mobile()){var ea=document.createElement('div');ea.className='fb_dialog_padding';z.appendChild(ea);}h.append(z);if(y.visible)x.show(z);return aa;},show:function(y){var z=x._findRoot(y);if(z){x._removeStacked(z);x._hideLoader();x._makeActive(z);x._stack.push(z);if('fbCallID' in y)x.get(y.fbCallID).inform('iframe_show').trackEvent('show');}},hide:function(y){var z=x._findRoot(y);x._hideLoader();if(z==x._active){x._lowerActive();x._restoreBodyPosition();x._hideTabletOverlay();if('fbCallID' in y)x.get(y.fbCallID).inform('iframe_hide').trackEvent('hide');}},remove:function(y){y=x._findRoot(y);if(y){var z=x._active==y;x._removeStacked(y);if(z){x._hideLoader();if(x._stack.length>0){x.show(x._stack.pop());}else{x._lowerActive();x._restoreBodyPosition();x._hideTabletOverlay();}}else if(x._active===null&&x._stack.length>0)x.show(x._stack.pop());setTimeout(function(){y.parentNode.removeChild(y);},3000);}},isActive:function(y){var z=x._findRoot(y);return z&&z===x._active;}};e.exports=x;},null);
__d("sdk.Frictionless",["sdk.Auth","sdk.api","sdk.Event","sdk.Dialog"],function(a,b,c,d,e,f,g,h,i,j){var k={_allowedRecipients:{},_useFrictionless:false,_updateRecipients:function(){k._allowedRecipients={};h('/me/apprequestformerrecipients',function(l){if(!l||l.error)return;ES5(l.data,'forEach',true,function(m){k._allowedRecipients[m.recipient_id]=true;});});},init:function(){k._useFrictionless=true;g.getLoginStatus(function(l){if(l.status=='connected')k._updateRecipients();});i.subscribe('auth.login',function(l){if(l.authResponse)k._updateRecipients();});},_processRequestResponse:function(l,m){return function(n){var o=n&&n.updated_frictionless;if(k._useFrictionless&&o)k._updateRecipients();if(n){if(!m&&n.frictionless){j._hideLoader();j._restoreBodyPosition();j._hideIPadOverlay();}delete n.frictionless;delete n.updated_frictionless;}l&&l(n);};},isAllowed:function(l){if(!l)return false;if(typeof l==='number')return l in k._allowedRecipients;if(typeof l==='string')l=l.split(',');l=ES5(l,'map',true,function(o){return ES5(String(o),'trim',true);});var m=true,n=false;ES5(l,'forEach',true,function(o){m=m&&o in k._allowedRecipients;n=true;});return m&&n;}};i.subscribe('init:post',function(l){if(l.frictionlessRequests)k.init();});e.exports=k;},null);
__d("insertIframe",["guid","GlobalCallback"],function(a,b,c,d,e,f,g,h){function i(j){j.id=j.id||g();j.name=j.name||g();var k=false,l=false,m=function(){if(k&&!l){l=true;j.onload&&j.onload(j.root.firstChild);}},n=h.create(m);if(document.attachEvent){var o=('<iframe'+' id="'+j.id+'"'+' name="'+j.name+'"'+(j.title?' title="'+j.title+'"':'')+(j.className?' class="'+j.className+'"':'')+' style="border:none;'+(j.width?'width:'+j.width+'px;':'')+(j.height?'height:'+j.height+'px;':'')+'"'+' src="javascript:false;"'+' frameborder="0"'+' scrolling="no"'+' allowtransparency="true"'+' onload="'+n+'()"'+'></iframe>');j.root.innerHTML=('<iframe src="javascript:false"'+' frameborder="0"'+' scrolling="no"'+' style="height:1px"></iframe>');k=true;setTimeout(function(){j.root.innerHTML=o;j.root.firstChild.src=j.url;j.onInsert&&j.onInsert(j.root.firstChild);},0);}else{var p=document.createElement('iframe');p.id=j.id;p.name=j.name;p.onload=m;p.scrolling='no';p.style.border='none';p.style.overflow='hidden';if(j.title)p.title=j.title;if(j.className)p.className=j.className;if(j.height!==undefined)p.style.height=j.height+'px';if(j.width!==undefined)if(j.width=='100%'){p.style.width=j.width;}else p.style.width=j.width+'px';j.root.appendChild(p);k=true;p.src=j.url;j.onInsert&&j.onInsert(p);}}e.exports=i;},null);
__d("sdk.Native",["copyProperties","Log","UserAgent"],function(a,b,c,d,e,f,g,h,i){var j='fbNativeReady',k={onready:function(l){if(!i.nativeApp()){h.error('FB.Native.onready only works when the page is rendered '+'in a WebView of the native Facebook app. Test if this is the '+'case calling FB.UA.nativeApp()');return;}if(window.__fbNative&&!this.nativeReady)g(this,window.__fbNative);if(this.nativeReady){l();}else{var m=function(n){window.removeEventListener(j,m);this.onready(l);};window.addEventListener(j,m,false);}}};e.exports=k;},null);
__d("resolveURI",[],function(a,b,c,d,e,f){function g(h){if(!h)return window.location.href;h=h.replace(/&/g,'&amp;').replace(/"/g,'&quot;');var i=document.createElement('div');i.innerHTML='<a href="'+h+'"></a>';return i.firstChild.href;}e.exports=g;},null);
__d("sdk.UIServer",["sdk.Auth","sdk.Content","createObjectFrom","copyProperties","sdk.Dialog","sdk.DOM","sdk.Event","flattenObject","sdk.Frictionless","sdk.getContextType","guid","insertIframe","Log","sdk.Native","QueryString","resolveURI","sdk.RPC","sdk.Runtime","JSSDKConfig","UrlMap","UserAgent","sdk.XD"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba){var ca={transform:function(fa){if(fa.params.display==='touch'&&fa.params.access_token&&window.postMessage){fa.params.channel=ea._xdChannelHandler(fa.id,'parent');if(!aa.nativeApp())fa.params.in_iframe=1;return fa;}else return ea.genericTransform(fa);},getXdRelation:function(fa){var ga=fa.display;if(ga==='touch'&&window.postMessage&&fa.in_iframe)return 'parent';return ea.getXdRelation(fa);}},da={'stream.share':{size:{width:670,height:340},url:'sharer.php',transform:function(fa){if(!fa.params.u)fa.params.u=window.location.toString();fa.params.display='popup';return fa;}},apprequests:{transform:function(fa){fa=ca.transform(fa);fa.params.frictionless=o&&o._useFrictionless;if(fa.params.frictionless){if(o.isAllowed(fa.params.to)){fa.params.display='iframe';fa.params.in_iframe=true;fa.hideLoader=true;}fa.cb=o._processRequestResponse(fa.cb,fa.hideLoader);}fa.closeIcon=false;return fa;},getXdRelation:ca.getXdRelation},feed:ca,'permissions.oauth':{url:'dialog/oauth',size:{width:(aa.mobile()?null:475),height:(aa.mobile()?null:183)},transform:function(fa){if(!x.getClientID()){s.error('FB.login() called before FB.init().');return;}if(g.getAuthResponse()&&!fa.params.scope&&!fa.params.auth_type){s.error('FB.login() called when user is already connected.');fa.cb&&fa.cb({status:x.getLoginStatus(),authResponse:g.getAuthResponse()});return;}var ga=fa.cb,ha=fa.id;delete fa.cb;var ia=ES5('Object','keys',false,j(fa.params.response_type?i(fa.params.response_type.split(',')):{},{token:true,signed_request:true})).join(',');if(fa.params.display==='async'){j(fa.params,{client_id:x.getClientID(),origin:p(),response_type:ia,domain:location.hostname});fa.cb=g.xdResponseWrapper(ga,g.getAuthResponse(),'permissions.oauth');}else j(fa.params,{client_id:x.getClientID(),redirect_uri:v(ea.xdHandler(ga,ha,'opener',g.getAuthResponse(),'permissions.oauth')),origin:p(),response_type:ia,domain:location.hostname});return fa;}},'auth.logout':{url:'logout.php',transform:function(fa){if(!x.getClientID()){s.error('FB.logout() called before calling FB.init().');}else if(!g.getAuthResponse()){s.error('FB.logout() called without an access token.');}else{fa.params.next=ea.xdHandler(fa.cb,fa.id,'parent',g.getAuthResponse(),'logout');return fa;}}},'login.status':{url:'dialog/oauth',transform:function(fa){var ga=fa.cb,ha=fa.id;delete fa.cb;j(fa.params,{client_id:x.getClientID(),redirect_uri:ea.xdHandler(ga,ha,'parent',g.getAuthResponse(),'login_status'),origin:p(),response_type:'token,signed_request,code',domain:location.hostname});return fa;}}},ea={Methods:da,_loadedNodes:{},_defaultCb:{},_resultToken:'"xxRESULTTOKENxx"',genericTransform:function(fa){if(fa.params.display=='dialog'||fa.params.display=='iframe')j(fa.params,{display:'iframe',channel:ea._xdChannelHandler(fa.id,'parent.parent')},true);return fa;},checkOauthDisplay:function(fa){var ga=fa.scope||fa.perms||x.getScope();if(!ga)return fa.display;var ha=ga.split(/\s|,/g);for(var ia=0;ia<ha.length;ia++)if(!y.initSitevars.iframePermissions[ES5(ha[ia],'trim',true)])return 'popup';return fa.display;},prepareCall:function(fa,ga){var ha=fa.method.toLowerCase(),ia=j({},ea.Methods[ha]),ja=q(),ka=x.getSecure()||(ha!=='auth.status'&&ha!='login.status');j(fa,{app_id:x.getClientID(),locale:x.getLocale(),sdk:'joey',access_token:ka&&x.getAccessToken()||undefined});fa.display=ea.getDisplayMode(ia,fa);if(!ia.url)ia.url='dialog/'+ha;if((ia.url=='dialog/oauth'||ia.url=='dialog/permissions.request')&&(fa.display=='iframe'||(fa.display=='touch'&&fa.in_iframe)))fa.display=ea.checkOauthDisplay(fa);if(x.getIsVersioned()&&ia.url.substring(0,7)==='dialog/')ia.url=fa.version+'/'+ia.url;var la={cb:ga,id:ja,size:ia.size||ea.getDefaultSize(),url:z.resolve(fa.display=='touch'?'m':'www',ka)+'/'+ia.url,params:fa,name:ha,dialog:k.newInstance(ja,fa.display)},ma=ia.transform?ia.transform:ea.genericTransform;if(ma){la=ma(la);if(!la)return;}var na=ia.getXdRelation||ea.getXdRelation,oa=na(la.params);if(!(la.id in ea._defaultCb)&&!('next' in la.params)&&!('redirect_uri' in la.params))la.params.next=ea._xdResult(la.cb,la.id,oa,true);if(oa==='parent')j(la.params,{channel_url:ea._xdChannelHandler(ja,'parent.parent')},true);la=ea.prepareParams(la);return la;},prepareParams:function(fa){var ga=fa.params.method;if(fa.params.display!=='async')delete fa.params.method;fa.params=n(fa.params);var ha=u.encode(fa.params);if(!aa.nativeApp()&&ea.urlTooLongForIE(fa.url+'?'+ha)){fa.post=true;}else if(ha)fa.url+='?'+ha;return fa;},urlTooLongForIE:function(fa){return fa.length>2000;},getDisplayMode:function(fa,ga){if(ga.display==='hidden'||ga.display==='none')return ga.display;var ha=x.isEnvironment(x.ENVIRONMENTS.CANVAS)||x.isEnvironment(x.ENVIRONMENTS.PAGETAB);if(ha&&!ga.display)return 'async';if(aa.mobile()||ga.display==='touch')return 'touch';if(!x.getAccessToken()&&(ga.display=='iframe'||ga.display=='dialog')&&!fa.loggedOutIframe){s.error('"dialog" mode can only be used when the user is connected.');return 'popup';}if(fa.connectDisplay&&!ha)return fa.connectDisplay;return ga.display||(x.getAccessToken()?'dialog':'popup');},getXdRelation:function(fa){var ga=fa.display;if(ga==='popup'||ga==='touch')return 'opener';if(ga==='dialog'||ga==='iframe'||ga==='hidden'||ga==='none')return 'parent';if(ga==='async')return 'parent.frames['+window.name+']';},popup:function(fa){var ga=typeof window.screenX!='undefined'?window.screenX:window.screenLeft,ha=typeof window.screenY!='undefined'?window.screenY:window.screenTop,ia=typeof window.outerWidth!='undefined'?window.outerWidth:document.documentElement.clientWidth,ja=typeof window.outerHeight!='undefined'?window.outerHeight:(document.documentElement.clientHeight-22),ka=aa.mobile()?null:fa.size.width,la=aa.mobile()?null:fa.size.height,ma=(ga<0)?window.screen.width+ga:ga,na=parseInt(ma+((ia-ka)/2),10),oa=parseInt(ha+((ja-la)/2.5),10),pa=[];if(ka!==null)pa.push('width='+ka);if(la!==null)pa.push('height='+la);pa.push('left='+na);pa.push('top='+oa);pa.push('scrollbars=1');if(fa.name=='permissions.request'||fa.name=='permissions.oauth')pa.push('location=1,toolbar=0');pa=pa.join(',');var qa;if(fa.post){qa=window.open('about:blank',fa.id,pa);if(qa){ea.setLoadedNode(fa,qa,'popup');h.submitToTarget({url:fa.url,target:fa.id,params:fa.params});}}else{qa=window.open(fa.url,fa.id,pa);if(qa)ea.setLoadedNode(fa,qa,'popup');}if(!qa)return;if(fa.id in ea._defaultCb)ea._popupMonitor();},setLoadedNode:function(fa,ga,ha){if(fa.params&&fa.params.display!='popup')ga.fbCallID=fa.id;ga={node:ga,type:ha,fbCallID:fa.id};ea._loadedNodes[fa.id]=ga;},getLoadedNode:function(fa){var ga=typeof fa=='object'?fa.id:fa,ha=ea._loadedNodes[ga];return ha?ha.node:null;},hidden:function(fa){fa.className='FB_UI_Hidden';fa.root=h.appendHidden('');ea._insertIframe(fa);},iframe:function(fa){fa.className='FB_UI_Dialog';var ga=function(){ea._triggerDefault(fa.id);};fa.root=k.create({onClose:ga,closeIcon:fa.closeIcon===undefined?true:fa.closeIcon,classes:(aa.ipad()?'centered':'')});if(!fa.hideLoader)k.showLoader(ga,fa.size.width);l.addCss(fa.root,'fb_dialog_iframe');ea._insertIframe(fa);},touch:function(fa){if(fa.params&&fa.params.in_iframe){if(fa.ui_created){k.showLoader(function(){ea._triggerDefault(fa.id);},0);}else ea.iframe(fa);}else if(aa.nativeApp()&&!fa.ui_created){fa.frame=fa.id;t.onready(function(){ea.setLoadedNode(fa,t.open(fa.url+'#cb='+fa.frameName),'native');});ea._popupMonitor();}else if(!fa.ui_created)ea.popup(fa);},async:function(fa){fa.params.redirect_uri=location.protocol+'//'+location.host+location.pathname;delete fa.params.access_token;w.remote.showDialog(fa.params,function(ga){var ha=ga.result;if(ha&&ha.e2e){var ia=k.get(fa.id);ia.trackEvents(ha.e2e);ia.trackEvent('close');delete ha.e2e;}fa.cb(ha);});},getDefaultSize:function(){return k.getDefaultSize();},_insertIframe:function(fa){ea._loadedNodes[fa.id]=false;var ga=function(ha){if(fa.id in ea._loadedNodes)ea.setLoadedNode(fa,ha,'iframe');};if(fa.post){r({url:'about:blank',root:fa.root,className:fa.className,width:fa.size.width,height:fa.size.height,id:fa.id,onInsert:ga,onload:function(ha){h.submitToTarget({url:fa.url,target:ha.name,params:fa.params});}});}else r({url:fa.url,root:fa.root,className:fa.className,width:fa.size.width,height:fa.size.height,id:fa.id,name:fa.frameName,onInsert:ga});},_handleResizeMessage:function(fa,ga){var ha=ea.getLoadedNode(fa);if(!ha)return;if(ga.height)ha.style.height=ga.height+'px';if(ga.width)ha.style.width=ga.width+'px';ba.inform('resize.ack',ga||{},'parent.frames['+ha.name+']');if(!k.isActive(ha))k.show(ha);},_triggerDefault:function(fa){ea._xdRecv({frame:fa},ea._defaultCb[fa]||function(){});},_popupMonitor:function(){var fa;for(var ga in ea._loadedNodes)if(ea._loadedNodes.hasOwnProperty(ga)&&ga in ea._defaultCb){var ha=ea._loadedNodes[ga];if(ha.type!='popup'&&ha.type!='native')continue;var ia=ha.node;try{if(ia.closed){ea._triggerDefault(ga);}else fa=true;}catch(ja){}}if(fa&&!ea._popupInterval){ea._popupInterval=setInterval(ea._popupMonitor,100);}else if(!fa&&ea._popupInterval){clearInterval(ea._popupInterval);ea._popupInterval=null;}},_xdChannelHandler:function(fa,ga){return ba.handler(function(ha){var ia=ea.getLoadedNode(fa);if(!ia)return;if(ha.type=='resize'){ea._handleResizeMessage(fa,ha);}else if(ha.type=='hide'){k.hide(ia);}else if(ha.type=='rendered'){var ja=k._findRoot(ia);k.show(ja);}else if(ha.type=='fireevent')m.fire(ha.event);},ga,true,null);},_xdNextHandler:function(fa,ga,ha,ia){if(ia)ea._defaultCb[ga]=fa;return ba.handler(function(ja){ea._xdRecv(ja,fa);},ha)+'&frame='+ga;},_xdRecv:function(fa,ga){var ha=ea.getLoadedNode(fa.frame);if(ha)if(ha.close){try{ha.close();if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&RegExp.$1!=='5')window.focus();ea._popupCount--;}catch(ia){}}else if(l.containsCss(ha,'FB_UI_Hidden')){setTimeout(function(){ha.parentNode.parentNode.removeChild(ha.parentNode);},3000);}else if(l.containsCss(ha,'FB_UI_Dialog'))k.remove(ha);delete ea._loadedNodes[fa.frame];delete ea._defaultCb[fa.frame];if(fa.e2e){var ja=k.get(fa.frame);ja.trackEvents(fa.e2e);ja.trackEvent('close');delete fa.e2e;}ga(fa);},_xdResult:function(fa,ga,ha,ia){return (ea._xdNextHandler(function(ja){fa&&fa(ja.result&&ja.result!=ea._resultToken&&ES5('JSON','parse',false,ja.result));},ga,ha,ia)+'&result='+encodeURIComponent(ea._resultToken));},xdHandler:function(fa,ga,ha,ia,ja){return ea._xdNextHandler(g.xdResponseWrapper(fa,ia,ja),ga,ha,true);}};w.stub('showDialog');e.exports=ea;},null);
__d("sdk.ui",["Assert","sdk.Impressions","Log","sdk.PlatformVersioning","sdk.Runtime","sdk.UIServer","copyProperties","sdk.feature"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){function o(p,q){g.isObject(p);g.maybeFunction(q);if(k.getIsVersioned()){j.assertVersionIsSet();if(p.version){j.assertValidVersion(p.version);}else p.version=k.getVersion();}p=m({},p);if(!p.method){i.error('"method" is a required parameter for FB.ui().');return null;}var r=p.method;if(p.redirect_uri){i.warn('When using FB.ui, you should not specify a redirect_uri.');delete p.redirect_uri;}if((r=='permissions.request'||r=='permissions.oauth')&&(p.display=='iframe'||p.display=='dialog'))p.display=l.checkOauthDisplay(p);var s=n('e2e_tracking',true);if(s)p.e2e={};var t=l.prepareCall(p,q||function(){});if(!t)return null;var u=t.params.display;if(u==='dialog'){u='iframe';}else if(u==='none')u='hidden';var v=l[u];if(!v){i.error('"display" must be one of "popup", '+'"dialog", "iframe", "touch", "async", "hidden", or "none"');return null;}if(s)t.dialog.subscribe('e2e:end',function(w){w.method=r;w.display=u;i.debug('e2e: %s',ES5('JSON','stringify',false,w));h.log(114,{payload:w});});v(t);return t.dialog;}e.exports=o;},null);
__d("legacy:fb.auth",["sdk.Auth","sdk.Cookie","copyProperties","sdk.Event","FB","Log","sdk.Runtime","sdk.SignedRequest","sdk.ui"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){k.provide('',{getLoginStatus:function(){return g.getLoginStatus.apply(g,arguments);},getAuthResponse:function(){return g.getAuthResponse();},getAccessToken:function(){return m.getAccessToken()||null;},getUserID:function(){return m.getUserID()||m.getCookieUserID();},login:function(p,q){if(q&&q.perms&&!q.scope){q.scope=q.perms;delete q.perms;l.warn('OAuth2 specification states that \'perms\' '+'should now be called \'scope\'.  Please update.');}var r=m.isEnvironment(m.ENVIRONMENTS.CANVAS)||m.isEnvironment(m.ENVIRONMENTS.PAGETAB);o(i({method:'permissions.oauth',display:r?'async':'popup',domain:location.hostname},q||{}),p);},logout:function(p){o({method:'auth.logout',display:'hidden'},p);}});g.subscribe('logout',ES5(j.fire,'bind',true,j,'auth.logout'));g.subscribe('login',ES5(j.fire,'bind',true,j,'auth.login'));g.subscribe('authresponse.change',ES5(j.fire,'bind',true,j,'auth.authResponseChange'));g.subscribe('status.change',ES5(j.fire,'bind',true,j,'auth.statusChange'));j.subscribe('init:post',function(p){if(p.status)g.getLoginStatus();if(m.getClientID())if(p.authResponse){g.setAuthResponse(p.authResponse,'connected');}else if(m.getUseCookie()){var q=h.loadSignedRequest(),r;if(q){try{r=n.parse(q);}catch(s){h.clearSignedRequestCookie();}if(r&&r.user_id)m.setCookieUserID(r.user_id);}h.loadMeta();}});},3);
__d("sdk.Canvas.Plugin",["sdk.api","sdk.RPC","Log","UserAgent","sdk.Runtime","createArrayFrom"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m='CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000',n='CLSID:444785F1-DE89-4295-863A-D46C3A781394',o=null,p=!(j.osx()>=10.9&&(j.chrome()>=31||j.webkit()>=537.71||j.firefox()>=25));function q(aa){aa._hideunity_savedstyle={};aa._hideunity_savedstyle.left=aa.style.left;aa._hideunity_savedstyle.position=aa.style.position;aa._hideunity_savedstyle.width=aa.style.width;aa._hideunity_savedstyle.height=aa.style.height;aa.style.left='-10000px';aa.style.position='absolute';aa.style.width='1px';aa.style.height='1px';}function r(aa){if(aa._hideunity_savedstyle){aa.style.left=aa._hideunity_savedstyle.left;aa.style.position=aa._hideunity_savedstyle.position;aa.style.width=aa._hideunity_savedstyle.width;aa.style.height=aa._hideunity_savedstyle.height;}}function s(aa){aa._old_visibility=aa.style.visibility;aa.style.visibility='hidden';}function t(aa){aa.style.visibility=aa._old_visibility||'';delete aa._old_visibility;}function u(aa){var ba=aa.type?aa.type.toLowerCase():null,ca=ba==='application/x-shockwave-flash'||(aa.classid&&aa.classid.toUpperCase()==m);if(!ca)return false;var da=/opaque|transparent/i;if(da.test(aa.getAttribute('wmode')))return false;for(var ea=0;ea<aa.childNodes.length;ea++){var fa=aa.childNodes[ea];if(/param/i.test(fa.nodeName)&&/wmode/i.test(fa.name)&&da.test(fa.value))return false;}return true;}function v(aa){var ba=aa.type?aa.type.toLowerCase():null;return ba==='application/vnd.unity'||(aa.classid&&aa.classid.toUpperCase()==n);}function w(aa){var ba=l(window.document.getElementsByTagName('object'));ba=ba.concat(l(window.document.getElementsByTagName('embed')));var ca=false,da=false;ES5(ba,'forEach',true,function(fa){var ga=u(fa),ha=p&&v(fa);if(!ga&&!ha)return;ca=ca||ga;da=da||ha;var ia=function(){if(aa.state==='opened'){if(ga){s(fa);}else q(fa);}else if(ga){t(fa);}else r(fa);};if(o){i.info('Calling developer specified callback');var ja={state:aa.state,elem:fa};o(ja);setTimeout(ia,200);}else ia();});if(Math.random()<=1/1000){var ea={unity:da,flash:ca};g(k.getClientID()+'/occludespopups','post',ea);}}h.local.hidePluginObjects=function(){i.info('hidePluginObjects called');w({state:'opened'});};h.local.showPluginObjects=function(){i.info('showPluginObjects called');w({state:'closed'});};h.local.showFlashObjects=h.local.showPluginObjects;h.local.hideFlashObjects=h.local.hidePluginObjects;function x(){s();q();}function y(){t();r();}var z={_setHidePluginCallback:function(aa){o=aa;},hidePluginElement:x,showPluginElement:y};e.exports=z;},null);
__d("sdk.Canvas.IframeHandling",["DOMWrapper","sdk.RPC"],function(a,b,c,d,e,f,g,h){var i=null,j;function k(){var o=g.getWindow().document,p=o.body,q=o.documentElement,r=Math.max(p.offsetTop,0),s=Math.max(q.offsetTop,0),t=p.scrollHeight+r,u=p.offsetHeight+r,v=q.scrollHeight+s,w=q.offsetHeight+s;return Math.max(t,u,v,w);}function l(o){if(typeof o!='object')o={};var p=0,q=0;if(!o.height){o.height=k();p=16;q=4;}if(!o.frame)o.frame=window.name||'iframe_canvas';if(j){var r=j.height,s=o.height-r;if(s<=q&&s>=-p)return false;}j=o;h.remote.setSize(o);return true;}function m(o,p){if(p===undefined&&typeof o==='number'){p=o;o=true;}if(o||o===undefined){if(i===null)i=setInterval(function(){l();},p||100);l();}else if(i!==null){clearInterval(i);i=null;}}h.stub('setSize');var n={setSize:l,setAutoGrow:m};e.exports=n;},null);
__d("sdk.Canvas.Navigation",["sdk.RPC"],function(a,b,c,d,e,f,g){function h(j){g.local.navigate=function(k){j({path:k});};g.remote.setNavigationEnabled(true);}g.stub('setNavigationEnabled');var i={setUrlHandler:h};e.exports=i;},null);
__d("sdk.Canvas.Tti",["sdk.RPC","sdk.Runtime"],function(a,b,c,d,e,f,g,h){function i(n,o){var p={appId:h.getClientID(),time:ES5('Date','now',false),name:o},q=[p];if(n)q.push(function(r){n(r.result);});g.remote.logTtiMessage.apply(null,q);}function j(){i(null,'StartIframeAppTtiTimer');}function k(n){i(n,'StopIframeAppTtiTimer');}function l(n){i(n,'RecordIframeAppTti');}g.stub('logTtiMessage');var m={setDoneLoading:l,startTimer:j,stopTimer:k};e.exports=m;},null);
__d("legacy:fb.canvas",["Assert","sdk.Canvas.Environment","sdk.Event","FB","sdk.Canvas.Plugin","sdk.Canvas.IframeHandling","Log","sdk.Canvas.Navigation","sdk.Runtime","sdk.Canvas.Tti"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){j.provide('Canvas',{setSize:function(q){g.maybeObject(q,'Invalid argument');return l.setSize.apply(null,arguments);},setAutoGrow:function(){return l.setAutoGrow.apply(null,arguments);},getPageInfo:function(q){g.isFunction(q,'Invalid argument');return h.getPageInfo.apply(null,arguments);},scrollTo:function(q,r){g.maybeNumber(q,'Invalid argument');g.maybeNumber(r,'Invalid argument');return h.scrollTo.apply(null,arguments);},setDoneLoading:function(q){g.maybeFunction(q,'Invalid argument');return p.setDoneLoading.apply(null,arguments);},startTimer:function(){return p.startTimer.apply(null,arguments);},stopTimer:function(q){g.maybeFunction(q,'Invalid argument');return p.stopTimer.apply(null,arguments);},getHash:function(q){g.isFunction(q,'Invalid argument');return n.getHash.apply(null,arguments);},setHash:function(q){g.isString(q,'Invalid argument');return n.setHash.apply(null,arguments);},setUrlHandler:function(q){g.isFunction(q,'Invalid argument');return n.setUrlHandler.apply(null,arguments);}});i.subscribe('init:post',function(q){if(o.isEnvironment(o.ENVIRONMENTS.CANVAS)){g.isTrue(!q.hideFlashCallback||!q.hidePluginCallback,'cannot specify deprecated hideFlashCallback and new hidePluginCallback');k._setHidePluginCallback(q.hidePluginCallback||q.hideFlashCallback);}});},3);
__d("legacy:fb.canvas-legacy",["Assert","FB","Log","sdk.Canvas.Tti"],function(a,b,c,d,e,f,g,h,i,j){h.provide('CanvasInsights',{setDoneLoading:function(k){i.warn('Deprecated: use FB.Canvas.setDoneLoading');g.maybeFunction(k,'Invalid argument');return j.setDoneLoading.apply(null,arguments);}});},3);
__d("sdk.Canvas.Prefetcher",["sdk.api","createArrayFrom","JSSDKCanvasPrefetcherConfig","sdk.Runtime"],function(a,b,c,d,e,f,g,h,i,j){var k={AUTOMATIC:0,MANUAL:1},l=i.sampleRate,m=i.blacklist,n=k.AUTOMATIC,o=[];function p(){var u={object:'data',link:'href',script:'src'};if(n==k.AUTOMATIC)ES5(ES5('Object','keys',false,u),'forEach',true,function(v){var w=u[v];ES5(h(document.getElementsByTagName(v)),'forEach',true,function(x){if(x[w])o.push(x[w]);});});if(o.length===0)return;g(j.getClientID()+'/staticresources','post',{urls:ES5('JSON','stringify',false,o),is_https:location.protocol==='https:'});o=[];}function q(){if(!j.isEnvironment(j.ENVIRONMENTS.CANVAS)||!j.getClientID()||!l)return;if(Math.random()>1/l||m=='*'||~ES5(m,'indexOf',true,j.getClientID()))return;setTimeout(p,30000);}function r(u){n=u;}function s(u){o.push(u);}var t={COLLECT_AUTOMATIC:k.AUTOMATIC,COLLECT_MANUAL:k.MANUAL,addStaticResource:s,setCollectionMode:r,_maybeSample:q};e.exports=t;},null);
__d("legacy:fb.canvas.prefetcher",["FB","sdk.Canvas.Prefetcher","sdk.Event","sdk.Runtime"],function(a,b,c,d,e,f,g,h,i,j){g.provide('Canvas.Prefetcher',h);i.subscribe('init:post',function(k){if(j.isEnvironment(j.ENVIRONMENTS.CANVAS))h._maybeSample();});},3);
__d("legacy:fb.compat.ui",["copyProperties","FB","Log","sdk.ui","sdk.UIServer"],function(a,b,c,d,e,f,g,h,i,j,k){h.provide('',{share:function(l){i.error('share() has been deprecated. Please use FB.ui() instead.');j({display:'popup',method:'stream.share',u:l});},publish:function(l,m){i.error('publish() has been deprecated. Please use FB.ui() instead.');l=l||{};j(g({display:'popup',method:'stream.publish',preview:1},l||{}),m);},addFriend:function(l,m){i.error('addFriend() has been deprecated. Please use FB.ui() instead.');j({display:'popup',id:l,method:'friend.add'},m);}});k.Methods['auth.login']=k.Methods['permissions.request'];},3);
__d("mergeArrays",[],function(a,b,c,d,e,f){function g(h,i){for(var j=0;j<i.length;j++)if(ES5(h,'indexOf',true,i[j])<0)h.push(i[j]);return h;}e.exports=g;},null);
__d("format",[],function(a,b,c,d,e,f){function g(h,i){i=Array.prototype.slice.call(arguments,1);return h.replace(/\{(\d+)\}/g,function(j,k){var l=i[Number(k)];return (l===null||l===undefined)?'':l.toString();});}e.exports=g;},null);
__d("safeEval",[],function(a,b,c,d,e,f){function g(h,i){if(h===null||typeof h==='undefined')return;if(typeof h!=='string')return h;if(/^\w+$/.test(h)&&typeof window[h]==='function')return window[h].apply(null,i||[]);return Function('return eval("'+h.replace(/"/g,'\\"')+'");').apply(null,i||[]);}e.exports=g;},null);
__d("sdk.Waitable",["sdk.Model"],function(a,b,c,d,e,f,g){var h=g.extend({constructor:function(){this.parent({Value:undefined});},error:function(i){this.inform("error",i);},wait:function(i,j){if(j)this.subscribe('error',j);this.monitor('Value.change',ES5(function(){var k=this.getValue();if(k!==undefined){this.value=k;i(k);return true;}},'bind',true,this));}});e.exports=h;},null);
__d("sdk.Query",["format","safeEval","Type","sdk.Waitable"],function(a,b,c,d,e,f,g,h,i,j){function k(p){return ES5(p.split(','),'map',true,function(q){return ES5(q,'trim',true);});}function l(p){var q=(/^\s*(\w+)\s*=\s*(.*)\s*$/i).exec(p),r,s,t='unknown';if(q){s=q[2];if(/^(["'])(?:\\?.)*?\1$/.test(s)){s=h(s);t='index';}else if(/^\d+\.?\d*$/.test(s))t='index';}if(t=='index'){r={type:'index',key:q[1],value:s};}else r={type:'unknown',value:p};return r;}function m(p){return typeof p==='string'?ES5('JSON','stringify',false,p):p;}var n=1,o=j.extend({constructor:function(){this.parent();this.name='v_'+n++;},hasDependency:function(p){if(arguments.length)this._hasDependency=p;return !!this._hasDependency;},parse:function(p){var q=g.apply(null,p),r=(/^select (.*?) from (\w+)\s+where (.*)$/i).exec(q);this.fields=k(r[1]);this.table=r[2];this.where=l(r[3]);for(var s=1;s<p.length;s++)if(i.instanceOf(o,p[s]))p[s].hasDependency(true);return this;},toFql:function(){var p='select '+this.fields.join(',')+' from '+this.table+' where ';switch(this.where.type){case 'unknown':p+=this.where.value;break;case 'index':p+=this.where.key+'='+m(this.where.value);break;case 'in':if(this.where.value.length==1){p+=this.where.key+'='+m(this.where.value[0]);}else p+=this.where.key+' in ('+ES5(this.where.value,'map',true,m).join(',')+')';break;}return p;},toString:function(){return '#'+this.name;}});e.exports=o;},null);
__d("sdk.Data",["sdk.api","sdk.ErrorHandling","mergeArrays","sdk.Query","safeEval","sdk.Waitable"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m={query:function(n,o){var p=new j().parse(Array.prototype.slice.call(arguments));m.queue.push(p);m._waitToProcess();return p;},waitOn:function(n,o){var p=new l(),q=n.length;if(typeof(o)=='string'){var r=o;o=h.unguard(function(){return k(r);});}ES5(n,'forEach',true,function(s){s.monitor('Value.change',function(){var t=false;if(m._getValue(s)!==undefined){s.value=s.getValue();q--;t=true;}if(q===0){var u=o(ES5(n,'map',true,m._getValue));p.setValue(u!==undefined?u:true);}return t;});});return p;},process:function(n){m._process(n);},_getValue:function(n){return n instanceof l?n.getValue():n;},_selectByIndex:function(n,o,p,q){var r=new j();r.fields=n;r.table=o;r.where={type:'index',key:p,value:q};m.queue.push(r);m._waitToProcess();return r;},_waitToProcess:function(){if(m.timer<0)m.timer=setTimeout(function(){m._process();},10);},_process:function(n){m.timer=-1;var o={},p=m.queue;if(!p.length)return;m.queue=[];for(var q=0;q<p.length;q++){var r=p[q];if(r.where.type=='index'&&!r.hasDependency()){m._mergeIndexQuery(r,o);}else o[r.name]=r;}var s={q:{}};for(var t in o)if(o.hasOwnProperty(t))s.q[t]=o[t].toFql();if(n)s.access_token=n;g('/fql','GET',s,function(u){if(u.error){ES5(ES5('Object','keys',false,o),'forEach',true,function(v){o[v].error(new Error(u.error.message));});}else ES5(u.data,'forEach',true,function(v){o[v.name].setValue(v.fql_result_set);});});},_mergeIndexQuery:function(n,o){var p=n.where.key,q=n.where.value,r='index_'+n.table+'_'+p,s=o[r];if(!s){s=o[r]=new j();s.fields=[p];s.table=n.table;s.where={type:'in',key:p,value:[]};}i(s.fields,n.fields);i(s.where.value,[q]);s.wait(function(t){n.setValue(ES5(t,'filter',true,function(u){return u[p]==q;}));});},timer:-1,queue:[]};e.exports=m;},null);
__d("legacy:fb.data",["FB","sdk.Data"],function(a,b,c,d,e,f,g,h){g.provide('Data',h);},3);
__d("legacy:fb.event",["FB","sdk.Event"],function(a,b,c,d,e,f,g,h){g.provide('Event',{subscribe:ES5(h.subscribe,'bind',true,h),unsubscribe:ES5(h.unsubscribe,'bind',true,h)});},3);
__d("legacy:fb.event-legacy",["FB","sdk.Event"],function(a,b,c,d,e,f,g,h){g.provide('Event',{clear:ES5(h.clear,'bind',true,h),fire:ES5(h.fire,'bind',true,h),monitor:ES5(h.monitor,'bind',true,h)});g.provide('EventProvider',h);},3);
__d("legacy:fb.frictionless",["FB","sdk.Frictionless"],function(a,b,c,d,e,f,g,h){g.provide('Frictionless',h);},3);
__d("sdk.init",["sdk.Cookie","sdk.ErrorHandling","sdk.Event","Log","ManagedError","sdk.PlatformVersioning","QueryString","sdk.Runtime","sdk.URI","copyProperties","createArrayFrom"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function r(t){var u=(typeof t=='number'&&t>0)||(typeof t=='string'&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(t));if(u)return t.toString();j.warn('Invalid App Id: Must be a number or numeric string representing '+'the application id.');return null;}function s(t){if(n.getInitialized())j.warn('FB.init has already been called - this could indicate a problem');if(n.getIsVersioned()){if(Object.prototype.toString.call(t)!=='[object Object]')throw new k('Invalid argument');if(t.authResponse)throw new k('Setting authResponse is not supported');if(!t.version)t.version=o(location.href).getQueryData().sdk_version;l.assertValidVersion(t.version);n.setVersion(t.version);}else{if(/number|string/.test(typeof t)){j.warn('FB.init called with invalid parameters');t={apiKey:t};}t=p({status:true},t||{});}var u=r(t.appId||t.apiKey);if(u!==null)n.setClientID(u);if('scope' in t)n.setScope(t.scope);if(t.cookie){n.setUseCookie(true);if(typeof t.cookie==='string')g.setDomain(t.cookie);}if(t.kidDirectedSite)n.setKidDirectedSite(true);n.setInitialized(true);i.fire('init:post',t);}setTimeout(function(){var t=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;ES5(q(document.getElementsByTagName('script')),'forEach',true,function(u){if(u.src){var v=t.exec(u.src);if(v){var w=m.decode(v[2]);for(var x in w)if(w.hasOwnProperty(x)){var y=w[x];if(y=='0')w[x]=0;}s(w);}}});if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){window.fbAsyncInit.hasRun=true;h.unguard(window.fbAsyncInit)();}},0);e.exports=s;},null);
__d("legacy:fb.init",["FB","sdk.init"],function(a,b,c,d,e,f,g,h){g.provide('',{init:h});},3);
__d("legacy:fb.json",["FB","ManagedError"],function(a,b,c,d,e,f,g,h){g.provide('JSON',{stringify:function(i){try{return ES5('JSON','stringify',false,i);}catch(j){throw new h(j.message,j);}},parse:function(i){try{return ES5('JSON','parse',false,i);}catch(j){throw new h(j.message,j);}}});},3);
__d("legacy:fb.pay",["copyProperties","sdk.Runtime","sdk.UIServer","sdk.XD","FB"],function(a,b,c,d,e,f,g,h,i,j){b('FB');var k={error_code:1383001,error_message:'An unknown error caused the dialog to be closed'},l=function(m){return function(n){m(n&&n.response?ES5('JSON','parse',false,n.response):k);};};g(i.Methods,{'pay.prompt':{transform:function(m){var n=j.handler(l(m.cb),'parent.frames['+(window.name||'iframe_canvas')+']');m.params.channel=n;j.inform('Pay.Prompt',m.params);}},pay:{size:{width:555,height:120},connectDisplay:'popup',transform:function(m){m.cb=l(m.cb);if(!h.isEnvironment(h.ENVIRONMENTS.CANVAS)){m.params.order_info=ES5('JSON','stringify',false,m.params.order_info);return m;}var n=j.handler(m.cb,'parent.frames['+(window.name||'iframe_canvas')+']');m.params.channel=n;m.params.uiserver=true;j.inform('Pay.Prompt',m.params);}}});},3);
__d("legacy:fb.ua",["FB","UserAgent"],function(a,b,c,d,e,f,g,h){g.provide('UA',{nativeApp:h.nativeApp});},3);
__d("legacy:fb.ui",["FB","sdk.ui"],function(a,b,c,d,e,f,g,h){g.provide('',{ui:h});},3);
__d("Miny",[],function(a,b,c,d,e,f){var g='Miny1',h={encode:[],decode:{}},i='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');function j(n){for(var o=h.encode.length;o<n;o++){var p=o.toString(32).split('');p[p.length-1]=i[parseInt(p[p.length-1],32)];p=p.join('');h.encode[o]=p;h.decode[p]=o;}return h;}function k(n){if(/^$|[~\\]|__proto__/.test(n))return n;var o=n.match(/\w+|\W+/g),p={};for(var q=0;q<o.length;q++)p[o[q]]=(p[o[q]]||0)+1;var r=ES5('Object','keys',false,p);r.sort(function(u,v){return p[u]<p[v]?1:(p[v]<p[u]?-1:0);});var s=j(r.length).encode;for(q=0;q<r.length;q++)p[r[q]]=s[q];var t=[];for(q=0;q<o.length;q++)t[q]=p[o[q]];return [g,r.length].concat(r).concat(t.join('')).join('~');}function l(n){var o=n.split('~');if(o.shift()!=g)return n;var p=parseInt(o.shift(),10),q=o.pop();q=q.match(/[0-9a-v]*[\-w-zA-Z_]/g);var r=o,s=j(p).decode,t=[];for(var u=0;u<q.length;u++)t[u]=r[s[q[u]]];return t.join('');}var m={encode:k,decode:l};e.exports=m;},null);
__d("runOnce",[],function(a,b,c,d,e,f){function g(h){var i,j;return function(){if(!i){i=true;j=h();}return j;};}e.exports=g;},null);
__d("XFBML",["Assert","copyProperties","createArrayFrom","sdk.DOM","sdk.feature","sdk.Impressions","Log","ObservableMixin","runOnce","UserAgent"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q={},r={},s=0,t=new n();function u(ca,da){return ca[da]+'';}function v(ca){return ca.scopeName?(ca.scopeName+':'+ca.nodeName):'';}function w(ca){return q[u(ca,'nodeName').toLowerCase()]||q[v(ca).toLowerCase()];}function x(ca){var da=ES5(ES5(u(ca,'className'),'trim',true).split(/\s+/),'filter',true,function(ea){return r.hasOwnProperty(ea);});if(da.length===0)return undefined;if(ca.getAttribute('fb-xfbml-state')||!ca.childNodes||ca.childNodes.length===0||(ca.childNodes.length===1&&ca.childNodes[0].nodeType===3)||(ca.children.length===1&&u(ca.children[0],'className')==='fb-xfbml-parse-ignore'))return r[da[0]];}function y(ca){var da={};ES5(i(ca.attributes),'forEach',true,function(ea){da[u(ea,'name')]=u(ea,'value');});return da;}function z(ca,da,ea){var fa=document.createElement('div');j.addCss(ca,da+'-'+ea);ES5(i(ca.childNodes),'forEach',true,function(ga){fa.appendChild(ga);});ES5(i(ca.attributes),'forEach',true,function(ga){fa.setAttribute(ga.name,ga.value);});ca.parentNode.replaceChild(fa,ca);return fa;}function aa(ca,da,ea){g.isTrue(ca&&ca.nodeType&&ca.nodeType===1&&!!ca.getElementsByTagName,'Invalid DOM node passed to FB.XFBML.parse()');g.isFunction(da,'Invalid callback passed to FB.XFBML.parse()');var fa=++s;m.info('XFBML Parsing Start %s',fa);var ga=1,ha=0,ia=function(){ga--;if(ga===0){m.info('XFBML Parsing Finish %s, %s tags found',fa,ha);da();t.inform('render',fa,ha);}g.isTrue(ga>=0,'onrender() has been called too many times');};ES5(i(ca.getElementsByTagName('*')),'forEach',true,function(ka){if(!ea&&ka.getAttribute('fb-xfbml-state'))return;if(ka.nodeType!==1)return;var la=w(ka)||x(ka);if(!la)return;if(p.ie()<9&&ka.scopeName)ka=z(ka,la.xmlns,la.localName);ga++;ha++;var ma=new la.ctor(ka,la.xmlns,la.localName,y(ka));ma.subscribe('render',o(function(){ka.setAttribute('fb-xfbml-state','rendered');ia();}));var na=function(){if(ka.getAttribute('fb-xfbml-state')=='parsed'){t.subscribe('render.queue',na);}else{ka.setAttribute('fb-xfbml-state','parsed');ma.process();}};na();});t.inform('parse',fa,ha);var ja=30000;setTimeout(function(){if(ga>0)m.warn('%s tags failed to render in %s ms',ga,ja);},ja);ia();}t.subscribe('render',function(){var ca=t.getSubscribers('render.queue');t.clearSubscribers('render.queue');ES5(ca,'forEach',true,function(da){da();});});h(t,{registerTag:function(ca){var da=ca.xmlns+':'+ca.localName;g.isUndefined(q[da],da+' already registered');q[da]=ca;r[ca.xmlns+'-'+ca.localName]=ca;},parse:function(ca,da){aa(ca||document.body,da||function(){},true);},parseNew:function(){aa(document.body,function(){},false);}});if(k('log_tag_count')){var ba=function(ca,da){t.unsubscribe('parse',ba);setTimeout(ES5(l.log,'bind',true,null,102,{tag_count:da}),5000);};t.subscribe('parse',ba);}e.exports=t;},null);
__d("PluginPipe",["sdk.Content","copyProperties","sdk.feature","guid","insertIframe","Miny","ObservableMixin","JSSDKPluginPipeConfig","sdk.Runtime","UrlMap","UserAgent","XFBML"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s=new m(),t=n.threshold,u=[];function v(){return !!(i('plugin_pipe')&&o.getSecure()!==undefined&&(q.chrome()||q.firefox())&&n.enabledApps[o.getClientID()]);}function w(){var y=u;u=[];if(y.length<=t){ES5(y,'forEach',true,function(ba){k(ba.config);});return;}var z=y.length+1;function aa(){z--;if(z===0)x(y);}ES5(y,'forEach',true,function(ba){var ca={};for(var da in ba.config)ca[da]=ba.config[da];ca.url=p.resolve('www',o.getSecure())+'/plugins/plugin_pipe_shell.php';ca.onload=aa;k(ca);});aa();}r.subscribe('parse',w);function x(y){var z=document.createElement('span');g.appendHidden(z);var aa={};ES5(y,'forEach',true,function(fa){aa[fa.config.name]={plugin:fa.tag,params:fa.params};});var ba=ES5('JSON','stringify',false,aa),ca=l.encode(ba);ES5(y,'forEach',true,function(fa){var ga=document.getElementsByName(fa.config.name)[0];ga.onload=fa.config.onload;});var da=p.resolve('www',o.getSecure())+'/plugins/pipe.php',ea=j();k({url:'about:blank',root:z,name:ea,className:'fb_hidden fb_invisible',onload:function(){g.submitToTarget({url:da,target:ea,params:{plugins:ca.length<ba.length?ca:ba}});}});}h(s,{add:function(y){var z=v();z&&u.push({config:y._config,tag:y._tag,params:y._params});return z;}});e.exports=s;},null);
__d("IframePlugin",["sdk.Auth","sdk.DOM","sdk.Event","Log","ObservableMixin","sdk.PlatformVersioning","PluginPipe","QueryString","sdk.Runtime","Type","sdk.URI","UrlMap","UserAgent","sdk.XD","copyProperties","sdk.createIframe","guid","resolveURI"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){var y={skin:'string',font:'string',width:'px',height:'px',ref:'string',color_scheme:'string'};function z(ga,ha,ia){if(ha||ha===0)ga.style.width=ha+'px';if(ia||ia===0)ga.style.height=ia+'px';}function aa(ga){return function(ha){var ia={width:ha.width,height:ha.height,pluginID:ga};i.fire('xfbml.resize',ia);};}var ba={string:function(ga){return ga;},bool:function(ga){return ga?(/^(?:true|1|yes|on)$/i).test(ga):undefined;},url:function(ga){return x(ga);},url_maybe:function(ga){return ga?x(ga):ga;},hostname:function(ga){return ga||window.location.hostname;},px:function(ga){return (/^(\d+)(?:px)?$/).test(ga)?parseInt(RegExp.$1,10):undefined;},text:function(ga){return ga;}};function ca(ga,ha){var ia=ga[ha]||ga[ha.replace(/_/g,'-')]||ga[ha.replace(/_/g,'')]||ga['data-'+ha]||ga['data-'+ha.replace(/_/g,'-')]||ga['data-'+ha.replace(/_/g,'')]||undefined;return ia;}function da(ga,ha,ia,ja){ES5(ES5('Object','keys',false,ga),'forEach',true,function(ka){if(ga[ka]=='text'&&!ia[ka]){ia[ka]=ha.textContent||ha.innerText||'';ha.setAttribute(ka,ia[ka]);}ja[ka]=ba[ga[ka]](ca(ia,ka));});}function ea(ga){return ga||ga==='0'||ga===0?parseInt(ga,10):undefined;}var fa=p.extend({constructor:function(ga,ha,ia,ja){this.parent();ia=ia.replace(/-/g,'_');var ka=ca(ja,'plugin_id');this.subscribe('xd.resize',aa(ka));this.subscribe('xd.resize.flow',aa(ka));this.subscribe('xd.resize.flow',ES5(function(ra){this._config.root.style.verticalAlign='bottom';z(this._config.root,ea(ra.width),ea(ra.height));this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.resize',ES5(function(ra){this._config.root.style.verticalAlign='bottom';z(this._config.root,ea(ra.width),ea(ra.height));z(this._iframe,ea(ra.width),ea(ra.height));this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.resize.iframe',ES5(function(ra){z(this._iframe,ea(ra.width),ea(ra.height));this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.sdk_event',function(ra){var sa=ES5('JSON','parse',false,ra.data);sa.pluginID=ka;i.fire(ra.event,sa,ga);});var la=o.getSecure()||window.location.protocol=='https:',ma=r.resolve('www',la)+'/plugins/'+ia+'.php?',na={};da(this.getParams(),ga,ja,na);da(y,ga,ja,na);na.app_id=o.getClientID();na.locale=o.getLocale();na.sdk='joey';na.kid_directed_site=o.getKidDirectedSite();var oa=ES5(function(ra){this.inform('xd.'+ra.type,ra);},'bind',true,this);na.channel=t.handler(oa,'parent.parent',true);h.addCss(ga,'fb_iframe_widget');var pa=w();this.subscribe('xd.verify',function(ra){t.sendToFacebook(pa,{method:'xd/verify',params:ES5('JSON','stringify',false,ra.token)});});this.subscribe('xd.refreshLoginStatus',ES5(g.getLoginStatus,'bind',true,g,ES5(this.inform,'bind',true,this,'login.status'),true));var qa=document.createElement('span');qa.style.verticalAlign='top';qa.style.width='0px';qa.style.height='0px';this._element=ga;this._ns=ha;this._tag=ia;this._params=na;this._config={root:qa,url:ma+n.encode(na),name:pa,width:(s.mobile()?undefined:(na.width||1000)),height:na.height||1000,style:{border:'none',visibility:'hidden'},title:this._ns+':'+this._tag+' Facebook Social Plugin',onload:ES5(function(){this.inform('render');},'bind',true,this)};},process:function(){if(o.getIsVersioned()){l.assertVersionIsSet();var ga=q(this._config.url);this._config.url=ga.setPath('/'+o.getVersion()+ga.getPath()).toString();}var ha=u({},this._params);delete ha.channel;var ia=n.encode(ha);if(this._element.getAttribute('fb-iframe-plugin-query')==ia){j.info('Skipping render: %s:%s %s',this._ns,this._tag,ia);this.inform('render');return;}this._element.setAttribute('fb-iframe-plugin-query',ia);this.subscribe('render',function(){this._iframe.style.visibility='visible';});while(this._element.firstChild)this._element.removeChild(this._element.firstChild);this._element.appendChild(this._config.root);var ja=s.mobile()?120:45;this._timeoutID=setTimeout(ES5(function(){this._iframe&&z(this._iframe,0,0);j.warn('%s:%s failed to resize in %ss',this._ns,this._tag,ja);},'bind',true,this),ja*1000);if(!m.add(this))this._iframe=v(this._config);if(s.mobile()){h.addCss(this._element,'fb_iframe_widget_fluid');this._element.style.display='block';this._element.style.width='100%';this._element.style.height='auto';this._config.root.style.width='100%';this._config.root.style.height='auto';this._iframe.style.width='100%';this._iframe.style.height='auto';this._iframe.style.position='static';}},updateLift:function(){var ga=this._iframe.style.width===this._config.root.style.width&&this._iframe.style.height===this._config.root.style.height;h[ga?'removeCss':'addCss'](this._iframe,'fb_iframe_widget_lift');}},k);fa.getVal=ca;fa.withParams=function(ga){return fa.extend({getParams:function(){return ga;}});};e.exports=fa;},null);
__d("PluginTags",[],function(a,b,c,d,e,f){var g={activity:{filter:'string',action:'string',max_age:'string',linktarget:'string',header:'bool',recommendations:'bool',site:'hostname'},composer:{action_type:'string',action_properties:'string'},create_event_button:{},degrees:{href:'url'},facepile:{href:'string',action:'string',size:'string',max_rows:'string',show_count:'bool'},follow:{href:'url',layout:'string',show_faces:'bool'},like:{href:'url',layout:'string',show_faces:'bool',share:'bool',action:'string',send:'bool'},like_box:{href:'string',show_faces:'bool',header:'bool',stream:'bool',force_wall:'bool',show_border:'bool',id:'string',connections:'string',profile_id:'string',name:'string'},open_graph:{href:'url',layout:'string',show_faces:'bool',action_type:'string',action_properties:'string'},open_graph_preview:{action_type:'string',action_properties:'string'},page_events:{href:'url'},post:{href:'url',show_border:'bool'},privacy_selector:{},profile_pic:{uid:'string',linked:'bool',href:'string',size:'string',facebook_logo:'bool'},recommendations:{filter:'string',action:'string',max_age:'string',linktarget:'string',header:'bool',site:'hostname'},share_button:{href:'url',type:'string'},shared_activity:{header:'bool'},send:{href:'url'},send_to_mobile:{max_rows:'string',show_faces:'bool',size:'string'},story:{href:'url',show_border:'bool'},topic:{topic_name:'string',topic_id:'string'},want:{href:'url',layout:'string',show_faces:'bool'}},h={subscribe:'follow',fan:'like_box',likebox:'like_box',friendpile:'facepile'};ES5(ES5('Object','keys',false,h),'forEach',true,function(i){g[i]=g[h[i]];});e.exports=g;},null);
__d("sdk.Arbiter",[],function(a,b,c,d,e,f){var g={BEHAVIOR_EVENT:'e',BEHAVIOR_PERSISTENT:'p',BEHAVIOR_STATE:'s'};e.exports=g;},null);
__d("sdk.XFBML.Element",["sdk.DOM","Type","ObservableMixin"],function(a,b,c,d,e,f,g,h,i){var j=h.extend({constructor:function(k){this.parent();this.dom=k;},fire:function(){this.inform.apply(this,arguments);},getAttribute:function(k,l,m){var n=g.getAttr(this.dom,k);return n?m?m(n):n:l;},_getBoolAttribute:function(k,l){var m=g.getBoolAttr(this.dom,k);return m===null?l:m;},_getPxAttribute:function(k,l){return this.getAttribute(k,l,function(m){var n=parseInt(m,10);return isNaN(n)?l:n;});},_getLengthAttribute:function(k,l){return this.getAttribute(k,l,function(m){if(m==='100%')return m;var n=parseInt(m,10);return isNaN(n)?l:n;});},_getAttributeFromList:function(k,l,m){return this.getAttribute(k,l,function(n){n=n.toLowerCase();return (ES5(m,'indexOf',true,n)>-1)?n:l;});},isValid:function(){for(var k=this.dom;k;k=k.parentNode)if(k==document.body)return true;},clear:function(){g.html(this.dom,'');}},i);e.exports=j;},null);
__d("sdk.XFBML.IframeWidget",["sdk.Arbiter","sdk.Auth","sdk.Content","copyProperties","sdk.DOM","sdk.Event","sdk.XFBML.Element","guid","insertIframe","QueryString","sdk.Runtime","sdk.ui","UrlMap","sdk.XD"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u=m.extend({_iframeName:null,_showLoader:true,_refreshOnAuthChange:false,_allowReProcess:false,_fetchPreCachedLoader:false,_visibleAfter:'load',_widgetPipeEnabled:false,_borderReset:false,_repositioned:false,getUrlBits:function(){throw new Error('Inheriting class needs to implement getUrlBits().');},setupAndValidate:function(){return true;},oneTimeSetup:function(){},getSize:function(){},getIframeName:function(){return this._iframeName;},getIframeTitle:function(){return 'Facebook Social Plugin';},getChannelUrl:function(){if(!this._channelUrl){var y=this;this._channelUrl=t.handler(function(z){y.fire('xd.'+z.type,z);},'parent.parent',true);}return this._channelUrl;},getIframeNode:function(){return this.dom.getElementsByTagName('iframe')[0];},arbiterInform:function(event,y,z){t.sendToFacebook(this.getIframeName(),{method:event,params:ES5('JSON','stringify',false,y||{}),behavior:z||g.BEHAVIOR_PERSISTENT});},_arbiterInform:function(event,y,z){var aa='parent.frames["'+this.getIframeNode().name+'"]';t.inform(event,y,aa,z);},getDefaultWebDomain:function(){return s.resolve('www');},process:function(y){if(this._done){if(!this._allowReProcess&&!y)return;this.clear();}else this._oneTimeSetup();this._done=true;this._iframeName=this.getIframeName()||this._iframeName||n();if(!this.setupAndValidate()){this.fire('render');return;}if(this._showLoader)this._addLoader();k.addCss(this.dom,'fb_iframe_widget');if(this._visibleAfter!='immediate'){k.addCss(this.dom,'fb_hide_iframes');}else this.subscribe('iframe.onload',ES5(this.fire,'bind',true,this,'render'));var z=this.getSize()||{},aa=this.getFullyQualifiedURL();if(z.width=='100%')k.addCss(this.dom,'fb_iframe_widget_fluid');this.clear();o({url:aa,root:this.dom.appendChild(document.createElement('span')),name:this._iframeName,title:this.getIframeTitle(),className:q.getRtl()?'fb_rtl':'fb_ltr',height:z.height,width:z.width,onload:ES5(this.fire,'bind',true,this,'iframe.onload')});this._resizeFlow(z);this.loaded=false;this.subscribe('iframe.onload',ES5(function(){this.loaded=true;},'bind',true,this));},generateWidgetPipeIframeName:function(){v++;return 'fb_iframe_'+v;},getFullyQualifiedURL:function(){var y=this._getURL();y+='?'+p.encode(this._getQS());if(y.length>2000){y='about:blank';var z=ES5(function(){this._postRequest();this.unsubscribe('iframe.onload',z);},'bind',true,this);this.subscribe('iframe.onload',z);}return y;},_getWidgetPipeShell:function(){return s.resolve('www')+'/common/widget_pipe_shell.php';},_oneTimeSetup:function(){this.subscribe('xd.resize',ES5(this._handleResizeMsg,'bind',true,this));this.subscribe('xd.resize',ES5(this._bubbleResizeEvent,'bind',true,this));this.subscribe('xd.resize.iframe',ES5(this._resizeIframe,'bind',true,this));this.subscribe('xd.resize.flow',ES5(this._resizeFlow,'bind',true,this));this.subscribe('xd.resize.flow',ES5(this._bubbleResizeEvent,'bind',true,this));this.subscribe('xd.refreshLoginStatus',function(){h.getLoginStatus(function(){},true);});this.subscribe('xd.logout',function(){r({method:'auth.logout',display:'hidden'},function(){});});if(this._refreshOnAuthChange)this._setupAuthRefresh();if(this._visibleAfter=='load')this.subscribe('iframe.onload',ES5(this._makeVisible,'bind',true,this));this.subscribe('xd.verify',ES5(function(y){this.arbiterInform('xd/verify',y.token);},'bind',true,this));this.oneTimeSetup();},_makeVisible:function(){this._removeLoader();k.removeCss(this.dom,'fb_hide_iframes');this.fire('render');},_setupAuthRefresh:function(){h.getLoginStatus(ES5(function(y){var z=y.status;l.subscribe('auth.statusChange',ES5(function(aa){if(!this.isValid())return;if(z=='unknown'||aa.status=='unknown')this.process(true);z=aa.status;},'bind',true,this));},'bind',true,this));},_handleResizeMsg:function(y){if(!this.isValid())return;this._resizeIframe(y);this._resizeFlow(y);if(!this._borderReset){this.getIframeNode().style.border='none';this._borderReset=true;}this._makeVisible();},_bubbleResizeEvent:function(y){var z={height:y.height,width:y.width,pluginID:this.getAttribute('plugin-id')};l.fire('xfbml.resize',z);},_resizeIframe:function(y){var z=this.getIframeNode();if(y.reposition==="true")this._repositionIframe(y);y.height&&(z.style.height=y.height+'px');y.width&&(z.style.width=y.width+'px');this._updateIframeZIndex();},_resizeFlow:function(y){var z=this.dom.getElementsByTagName('span')[0];y.height&&(z.style.height=y.height+'px');y.width&&(z.style.width=y.width+'px');this._updateIframeZIndex();},_updateIframeZIndex:function(){var y=this.dom.getElementsByTagName('span')[0],z=this.getIframeNode(),aa=z.style.height===y.style.height&&z.style.width===y.style.width,ba=aa?'removeCss':'addCss';k[ba](z,'fb_iframe_widget_lift');},_repositionIframe:function(y){var z=this.getIframeNode(),aa=parseInt(k.getStyle(z,'width'),10),ba=k.getPosition(z).x,ca=k.getViewportInfo().width,da=parseInt(y.width,10);if(ba+da>ca&&ba>da){z.style.left=aa-da+'px';this.arbiterInform('xd/reposition',{type:'horizontal'});this._repositioned=true;}else if(this._repositioned){z.style.left='0px';this.arbiterInform('xd/reposition',{type:'restore'});this._repositioned=false;}},_addLoader:function(){if(!this._loaderDiv){k.addCss(this.dom,'fb_iframe_widget_loader');this._loaderDiv=document.createElement('div');this._loaderDiv.className='FB_Loader';this.dom.appendChild(this._loaderDiv);}},_removeLoader:function(){if(this._loaderDiv){k.removeCss(this.dom,'fb_iframe_widget_loader');if(this._loaderDiv.parentNode)this._loaderDiv.parentNode.removeChild(this._loaderDiv);this._loaderDiv=null;}},_getQS:function(){return j({api_key:q.getClientID(),locale:q.getLocale(),sdk:'joey',kid_directed_site:q.getKidDirectedSite(),ref:this.getAttribute('ref')},this.getUrlBits().params);},_getURL:function(){var y=this.getDefaultWebDomain(),z='';return y+'/plugins/'+z+this.getUrlBits().name+'.php';},_postRequest:function(){i.submitToTarget({url:this._getURL(),target:this.getIframeNode().name,params:this._getQS()});}}),v=0,w={};function x(){var y={};for(var z in w){var aa=w[z];y[z]={widget:aa.getUrlBits().name,params:aa._getQS()};}return y;}e.exports=u;},null);
__d("sdk.XFBML.Comments",["sdk.Event","sdk.XFBML.IframeWidget","QueryString","sdk.Runtime","JSSDKConfig","UrlMap","UserAgent"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=h.extend({_visibleAfter:'immediate',_refreshOnAuthChange:true,setupAndValidate:function(){var o={channel_url:this.getChannelUrl(),colorscheme:this.getAttribute('colorscheme'),skin:this.getAttribute('skin'),numposts:this.getAttribute('num-posts',10),width:this._getLengthAttribute('width'),href:this.getAttribute('href'),permalink:this.getAttribute('permalink'),publish_feed:this.getAttribute('publish_feed'),order_by:this.getAttribute('order_by'),mobile:this._getBoolAttribute('mobile')};if(!o.width&&!o.permalink)o.width=550;if(k.initSitevars.enableMobileComments&&m.mobile()&&o.mobile!==false){o.mobile=true;delete o.width;}if(!o.skin)o.skin=o.colorscheme;if(!o.href){o.migrated=this.getAttribute('migrated');o.xid=this.getAttribute('xid');o.title=this.getAttribute('title',document.title);o.url=this.getAttribute('url',document.URL);o.quiet=this.getAttribute('quiet');o.reverse=this.getAttribute('reverse');o.simple=this.getAttribute('simple');o.css=this.getAttribute('css');o.notify=this.getAttribute('notify');if(!o.xid){var p=ES5(document.URL,'indexOf',true,'#');if(p>0){o.xid=encodeURIComponent(document.URL.substring(0,p));}else o.xid=encodeURIComponent(document.URL);}if(o.migrated)o.href=l.resolve('www')+'/plugins/comments_v1.php?'+'app_id='+j.getClientID()+'&xid='+encodeURIComponent(o.xid)+'&url='+encodeURIComponent(o.url);}else{var q=this.getAttribute('fb_comment_id');if(!q){q=i.decode(document.URL.substring(ES5(document.URL,'indexOf',true,'?')+1)).fb_comment_id;if(q&&ES5(q,'indexOf',true,'#')>0)q=q.substring(0,ES5(q,'indexOf',true,'#'));}if(q){o.fb_comment_id=q;this.subscribe('render',ES5(function(){if(!window.location.hash)window.location.hash=this.getIframeNode().id;},'bind',true,this));}}this._attr=o;return true;},oneTimeSetup:function(){this.subscribe('xd.addComment',ES5(this._handleCommentMsg,'bind',true,this));this.subscribe('xd.commentCreated',ES5(this._handleCommentCreatedMsg,'bind',true,this));this.subscribe('xd.commentRemoved',ES5(this._handleCommentRemovedMsg,'bind',true,this));},getSize:function(){if(!this._attr.permalink)return {width:this._attr.mobile?'100%':this._attr.width,height:160};},getUrlBits:function(){return {name:'comments',params:this._attr};},getDefaultWebDomain:function(){return l.resolve(this._attr.mobile?'m':'www',true);},_handleCommentMsg:function(o){if(!this.isValid())return;g.fire('comments.add',{post:o.post,user:o.user,widget:this});},_handleCommentCreatedMsg:function(o){if(!this.isValid())return;var p={href:o.href,commentID:o.commentID,parentCommentID:o.parentCommentID};g.fire('comment.create',p);},_handleCommentRemovedMsg:function(o){if(!this.isValid())return;var p={href:o.href,commentID:o.commentID};g.fire('comment.remove',p);}});e.exports=n;},null);
__d("sdk.XFBML.CommentsCount",["sdk.Data","sdk.DOM","sdk.XFBML.Element","sprintf"],function(a,b,c,d,e,f,g,h,i,j){var k=i.extend({process:function(){h.addCss(this.dom,'fb_comments_count_zero');var l=this.getAttribute('href',window.location.href);g._selectByIndex(['commentsbox_count'],'link_stat','url',l).wait(ES5(function(m){var n=m[0].commentsbox_count;h.html(this.dom,j('<span class="fb_comments_count">%s</span>',n));if(n>0)h.removeCss(this.dom,'fb_comments_count_zero');this.fire('render');},'bind',true,this));}});e.exports=k;},null);
__d("sdk.Anim",["sdk.DOM"],function(a,b,c,d,e,f,g){var h={ate:function(i,j,k,l){k=!isNaN(parseFloat(k))&&k>=0?k:750;var m=40,n={},o={},p=null,q=setInterval(ES5(function(){if(!p)p=ES5('Date','now',false);var r=1;if(k!=0)r=Math.min((ES5('Date','now',false)-p)/k,1);for(var s in j)if(j.hasOwnProperty(s)){var t=j[s];if(!n[s]){var u=g.getStyle(i,s);if(u===false)return;n[s]=this._parseCSS(u+'');}if(!o[s])o[s]=this._parseCSS(t.toString());var v='';ES5(n[s],'forEach',true,function(w,x){if(isNaN(o[s][x].numPart)&&o[s][x].textPart=='?'){v=w.numPart+w.textPart;}else if(isNaN(w.numPart)){v=w.textPart;}else v+=(w.numPart+Math.ceil((o[s][x].numPart-w.numPart)*Math.sin(Math.PI/2*r)))+o[s][x].textPart+' ';});g.setStyle(i,s,v);}if(r==1){clearInterval(q);if(l)l(i);}},'bind',true,this),m);},_parseCSS:function(i){var j=[];ES5(i.split(' '),'forEach',true,function(k){var l=parseInt(k,10);j.push({numPart:l,textPart:k.replace(l,'')});});return j;}};e.exports=h;},null);
__d("escapeHTML",[],function(a,b,c,d,e,f){var g=/[&<>"'\/]/g,h={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;','/':'&#x2F;'};function i(j){return j.replace(g,function(k){return h[k];});}e.exports=i;},null);
__d("sdk.Helper",["sdk.ErrorHandling","sdk.Event","UrlMap","safeEval","sprintf"],function(a,b,c,d,e,f,g,h,i,j,k){var l={isUser:function(m){return m<2.2e+09||(m>=1e+14&&m<=100099999989999)||(m>=8.9e+13&&m<=89999999999999);},upperCaseFirstChar:function(m){if(m.length>0){return m.substr(0,1).toUpperCase()+m.substr(1);}else return m;},getProfileLink:function(m,n,o){if(!o&&m)o=k('%s/profile.php?id=%s',i.resolve('www'),m.uid||m.id);if(o)n=k('<a class="fb_link" href="%s">%s</a>',o,n);return n;},invokeHandler:function(m,n,o){if(m)if(typeof m==='string'){g.unguard(j)(m,o);}else if(m.apply)g.unguard(m).apply(n,o||[]);},fireEvent:function(m,n){var o=n._attr.href;n.fire(m,o);h.fire(m,o,n);},executeFunctionByName:function(m){var n=Array.prototype.slice.call(arguments,1),o=m.split("."),p=o.pop(),q=window;for(var r=0;r<o.length;r++)q=q[o[r]];return q[p].apply(this,n);}};e.exports=l;},null);
__d("sdk.XFBML.ConnectBar",["sdk.Anim","sdk.api","sdk.Auth","createArrayFrom","JSSDKConnectBarConfig","sdk.Data","sdk.DOM","sdk.XFBML.Element","escapeHTML","sdk.Event","format","sdk.Helper","sdk.Insights","sdk.Intl","sdk.Runtime","UrlMap","UserAgent"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){var x=n.extend({_initialHeight:null,_initTopMargin:0,_picFieldName:'pic_square',_page:null,_displayed:false,_notDisplayed:false,_container:null,_animationSpeed:0,process:function(){i.getLoginStatus(ES5(function(y){p.monitor('auth.statusChange',ES5(function(){if(this.isValid()&&u.getLoginStatus()=='connected'){this._uid=u.getUserID();h({method:'Connect.shouldShowConnectBar'},ES5(function(z){if(z!=2){this._animationSpeed=(z==0)?750:0;this._showBar();}else this._noRender();},'bind',true,this));}else this._noRender();return false;},'bind',true,this));},'bind',true,this));},_showBar:function(){var y=l._selectByIndex(['first_name','profile_url',this._picFieldName],'user','uid',this._uid),z=l._selectByIndex(['display_name'],'application','api_key',u.getClientID());l.waitOn([y,z],ES5(function(aa){aa[0][0].site_name=aa[1][0].display_name;if(!this._displayed){this._displayed=true;this._notDisplayed=false;this._renderConnectBar(aa[0][0]);this.fire('render');s.impression({lid:104,name:'widget_load'});this.fire('connectbar.ondisplay');p.fire('connectbar.ondisplay',this);r.invokeHandler(this.getAttribute('on-display'),this);}},'bind',true,this));},_noRender:function(){if(this._displayed){this._displayed=false;this._closeConnectBar();}if(!this._notDisplayed){this._notDisplayed=true;this.fire('render');this.fire('connectbar.onnotdisplay');p.fire('connectbar.onnotdisplay',this);r.invokeHandler(this.getAttribute('on-not-display'),this);}},_renderConnectBar:function(y){var z=document.createElement('div'),aa=document.createElement('div');z.className='fb_connect_bar';aa.className='fb_reset fb_connect_bar_container';aa.appendChild(z);document.body.appendChild(aa);this._container=aa;this._initialHeight=Math.round(parseFloat(m.getStyle(aa,'height'))+parseFloat(m.getStyle(aa,'borderBottomWidth')));m.html(z,q('<div class="fb_buttons">'+'<a href="#" class="fb_bar_close">'+'<img src="{1}" alt="{2}" title="{2}"/>'+'</a>'+'</div>'+'<a href="{7}" class="fb_profile" target="_blank">'+'<img src="{3}" alt="{4}" title="{4}"/>'+'</a>'+'{5}'+' <span>'+'<a href="{8}" class="fb_learn_more" target="_blank">{6}</a> &ndash; '+'<a href="#" class="fb_no_thanks">{0}</a>'+'</span>',t.tx._("No Thanks"),v.resolve('fbcdn')+'/'+k.imgs.buttonUrl,t.tx._("Close"),y[this._picFieldName]||v.resolve('fbcdn')+'/'+k.imgs.missingProfileUrl,o(y.first_name),t.tx._("Hi {firstName}. \u003Cstrong>{siteName}\u003C\/strong> is using Facebook to personalize your experience.",{firstName:o(y.first_name),siteName:o(y.site_name)}),t.tx._("Learn More"),y.profile_url,v.resolve('www')+'/sitetour/connect.php'));ES5(j(z.getElementsByTagName('a')),'forEach',true,function(da){da.onclick=ES5(this._clickHandler,'bind',true,this);},this);this._page=document.body;var ba=0;if(this._page.parentNode){ba=Math.round((parseFloat(m.getStyle(this._page.parentNode,'height'))-parseFloat(m.getStyle(this._page,'height')))/2);}else ba=parseInt(m.getStyle(this._page,'marginTop'),10);ba=isNaN(ba)?0:ba;this._initTopMargin=ba;if(!window.XMLHttpRequest){aa.className+=" fb_connect_bar_container_ie6";}else{aa.style.top=(-1*this._initialHeight)+'px';g.ate(aa,{top:'0px'},this._animationSpeed);}var ca={marginTop:this._initTopMargin+this._initialHeight+'px'};if(w.ie()){ca.backgroundPositionY=this._initialHeight+'px';}else ca.backgroundPosition='? '+this._initialHeight+'px';g.ate(this._page,ca,this._animationSpeed);},_clickHandler:function(y){y=y||window.event;var z=y.target||y.srcElement;while(z.nodeName!='A')z=z.parentNode;switch(z.className){case 'fb_bar_close':h({method:'Connect.connectBarMarkAcknowledged'});s.impression({lid:104,name:'widget_user_closed'});this._closeConnectBar();break;case 'fb_learn_more':case 'fb_profile':window.open(z.href);break;case 'fb_no_thanks':this._closeConnectBar();h({method:'Connect.connectBarMarkAcknowledged'});s.impression({lid:104,name:'widget_user_no_thanks'});h({method:'auth.revokeAuthorization',block:true},ES5(function(){this.fire('connectbar.ondeauth');p.fire('connectbar.ondeauth',this);r.invokeHandler(this.getAttribute('on-deauth'),this);if(this._getBoolAttribute('auto-refresh',true))window.location.reload();},'bind',true,this));break;}return false;},_closeConnectBar:function(){this._notDisplayed=true;var y={marginTop:this._initTopMargin+'px'};if(w.ie()){y.backgroundPositionY='0px';}else y.backgroundPosition='? 0px';var z=(this._animationSpeed==0)?0:300;g.ate(this._page,y,z);g.ate(this._container,{top:(-1*this._initialHeight)+'px'},z,function(aa){aa.parentNode.removeChild(aa);});this.fire('connectbar.onclose');p.fire('connectbar.onclose',this);r.invokeHandler(this.getAttribute('on-close'),this);}});e.exports=x;},null);
__d("sdk.XFBML.LoginButton",["sdk.Helper","IframePlugin"],function(a,b,c,d,e,f,g,h){var i=h.extend({constructor:function(j,k,l,m){this.parent(j,k,l,m);var n=h.getVal(m,'on_login');if(n)this.subscribe('login.status',function(o){g.invokeHandler(n,null,[o]);});},getParams:function(){return {scope:'string',perms:'string',size:'string',login_text:'text',show_faces:'bool',max_rows:'string',show_login_face:'bool',registration_url:'url_maybe',auto_logout_link:'bool',one_click:'bool',show_banner:'bool',auth_type:'string'};}});e.exports=i;},null);
__d("sdk.XFBML.Name",["copyProperties","sdk.Data","escapeHTML","sdk.Event","sdk.XFBML.Element","sdk.Helper","Log","sdk.Runtime"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o=k.extend({process:function(){g(this,{_uid:this.getAttribute('uid'),_firstnameonly:this._getBoolAttribute('first-name-only'),_lastnameonly:this._getBoolAttribute('last-name-only'),_possessive:this._getBoolAttribute('possessive'),_reflexive:this._getBoolAttribute('reflexive'),_objective:this._getBoolAttribute('objective'),_linked:this._getBoolAttribute('linked',true),_subjectId:this.getAttribute('subject-id')});if(!this._uid){m.error('"uid" is a required attribute for <fb:name>');this.fire('render');return;}var p=[];if(this._firstnameonly){p.push('first_name');}else if(this._lastnameonly){p.push('last_name');}else p.push('name');if(this._subjectId){p.push('sex');if(this._subjectId==n.getUserID())this._reflexive=true;}var q;j.monitor('auth.statusChange',ES5(function(){if(!this.isValid()){this.fire('render');return true;}if(!this._uid||this._uid=='loggedinuser')this._uid=n.getUserID();if(!this._uid)return;if(l.isUser(this._uid)){q=h._selectByIndex(p,'user','uid',this._uid);}else q=h._selectByIndex(['name','id'],'profile','id',this._uid);q.wait(ES5(function(r){if(this._subjectId==this._uid){this._renderPronoun(r[0]);}else this._renderOther(r[0]);this.fire('render');},'bind',true,this));},'bind',true,this));},_renderPronoun:function(p){var q='',r=this._objective;if(this._subjectId){r=true;if(this._subjectId===this._uid)this._reflexive=true;}if(this._uid==n.getUserID()&&this._getBoolAttribute('use-you',true)){if(this._possessive){if(this._reflexive){q='your own';}else q='your';}else if(this._reflexive){q='yourself';}else q='you';}else switch(p.sex){case 'male':if(this._possessive){q=this._reflexive?'his own':'his';}else if(this._reflexive){q='himself';}else if(r){q='him';}else q='he';break;case 'female':if(this._possessive){q=this._reflexive?'her own':'her';}else if(this._reflexive){q='herself';}else if(r){q='her';}else q='she';break;default:if(this._getBoolAttribute('use-they',true)){if(this._possessive){if(this._reflexive){q='their own';}else q='their';}else if(this._reflexive){q='themselves';}else if(r){q='them';}else q='they';}else if(this._possessive){if(this._reflexive){q='his/her own';}else q='his/her';}else if(this._reflexive){q='himself/herself';}else if(r){q='him/her';}else q='he/she';break;}if(this._getBoolAttribute('capitalize',false))q=l.upperCaseFirstChar(q);this.dom.innerHTML=q;},_renderOther:function(p){var q='',r='';if(this._uid==n.getUserID()&&this._getBoolAttribute('use-you',true)){if(this._reflexive){if(this._possessive){q='your own';}else q='yourself';}else if(this._possessive){q='your';}else q='you';}else if(p){if(null===p.first_name)p.first_name='';if(null===p.last_name)p.last_name='';if(this._firstnameonly&&p.first_name!==undefined){q=i(p.first_name);}else if(this._lastnameonly&&p.last_name!==undefined)q=i(p.last_name);if(!q)q=i(p.name);if(q!==''&&this._possessive)q+='\'s';}if(!q)q=i(this.getAttribute('if-cant-see','Facebook User'));if(q){if(this._getBoolAttribute('capitalize',false))q=l.upperCaseFirstChar(q);if(p&&this._linked){r=l.getProfileLink(p,q,this.getAttribute('href',null));}else r=q;}this.dom.innerHTML=r;}});e.exports=o;},null);
__d("sdk.XFBML.RecommendationsBar",["sdk.Arbiter","DOMEventListener","sdk.Event","sdk.XFBML.IframeWidget","resolveURI","sdk.Runtime"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=j.extend({getUrlBits:function(){return {name:'recommendations_bar',params:this._attr};},setupAndValidate:function(){function n(w,x){var y=0,z=null;function aa(){x();z=null;y=ES5('Date','now',false);}return function(){if(!z){var ba=ES5('Date','now',false);if(ba-y<w){z=setTimeout(aa,w-(ba-y));}else aa();}return true;};}function o(w){if(w.match(/^\d+(?:\.\d+)?%$/)){var x=Math.min(Math.max(parseInt(w,10),0),100);w=x/100;}else if(w!='manual'&&w!='onvisible')w='onvisible';return w;}function p(w){return Math.max(parseInt(w,10)||30,10);}function q(w){if(w=='left'||w=='right')return w;return l.getRtl()?'left':'right';}this._attr={channel:this.getChannelUrl(),api_key:l.getClientID(),font:this.getAttribute('font'),colorscheme:this.getAttribute('colorscheme'),href:k(this.getAttribute('href')),side:q(this.getAttribute('side')),site:this.getAttribute('site'),action:this.getAttribute('action'),ref:this.getAttribute('ref'),max_age:this.getAttribute('max_age'),trigger:o(this.getAttribute('trigger','')),read_time:p(this.getAttribute('read_time')),num_recommendations:parseInt(this.getAttribute('num_recommendations'),10)||2};this._showLoader=false;this.subscribe('iframe.onload',ES5(function(){var w=this.dom.children[0];w.className='fbpluginrecommendationsbar'+this._attr.side;},'bind',true,this));var r=ES5(function(){h.remove(window,'scroll',r);h.remove(document.documentElement,'click',r);h.remove(document.documentElement,'mousemove',r);setTimeout(ES5(this.arbiterInform,'bind',true,this,'platform/plugins/recommendations_bar/action',null,g.BEHAVIOR_STATE),this._attr.read_time*1000);return true;},'bind',true,this);h.add(window,'scroll',r);h.add(document.documentElement,'click',r);h.add(document.documentElement,'mousemove',r);if(this._attr.trigger=="manual"){var s=ES5(function(w){if(w==this._attr.href){i.unsubscribe('xfbml.recommendationsbar.read',s);this.arbiterInform('platform/plugins/recommendations_bar/trigger',null,g.BEHAVIOR_STATE);}return true;},'bind',true,this);i.subscribe('xfbml.recommendationsbar.read',s);}else{var t=n(500,ES5(function(){if(this.calculateVisibility()){h.remove(window,'scroll',t);h.remove(window,'resize',t);this.arbiterInform('platform/plugins/recommendations_bar/trigger',null,g.BEHAVIOR_STATE);}return true;},'bind',true,this));h.add(window,'scroll',t);h.add(window,'resize',t);t();}this.visible=false;var u=n(500,ES5(function(){if(!this.visible&&this.calculateVisibility()){this.visible=true;this.arbiterInform('platform/plugins/recommendations_bar/visible');}else if(this.visible&&!this.calculateVisibility()){this.visible=false;this.arbiterInform('platform/plugins/recommendations_bar/invisible');}return true;},'bind',true,this));h.add(window,'scroll',u);h.add(window,'resize',u);u();this.focused=true;var v=ES5(function(){this.focused=!this.focused;return true;},'bind',true,this);h.add(window,'blur',v);h.add(window,'focus',v);this.resize_running=false;this.animate=false;this.subscribe('xd.signal_animation',ES5(function(){this.animate=true;},'bind',true,this));return true;},getSize:function(){return {height:25,width:(this._attr.action=='recommend'?140:96)};},calculateVisibility:function(){var n=document.documentElement.clientHeight;if(!this.focused&&window.console&&window.console.firebug)return this.visible;switch(this._attr.trigger){case "manual":return false;case "onvisible":var o=this.dom.getBoundingClientRect().top;return o<=n;default:var p=window.pageYOffset||document.body.scrollTop,q=document.documentElement.scrollHeight;return (p+n)/q>=this._attr.trigger;}}});e.exports=m;},null);
__d("sdk.XFBML.Registration",["sdk.Auth","sdk.Helper","sdk.XFBML.IframeWidget","sdk.Runtime","UrlMap"],function(a,b,c,d,e,f,g,h,i,j,k){var l=i.extend({_visibleAfter:'immediate',_baseHeight:167,_fieldHeight:28,_skinnyWidth:520,_skinnyBaseHeight:173,_skinnyFieldHeight:52,setupAndValidate:function(){this._attr={action:this.getAttribute('action'),border_color:this.getAttribute('border-color'),channel_url:this.getChannelUrl(),client_id:j.getClientID(),fb_only:this._getBoolAttribute('fb-only',false),fb_register:this._getBoolAttribute('fb-register',false),fields:this.getAttribute('fields'),height:this._getPxAttribute('height'),redirect_uri:this.getAttribute('redirect-uri',window.location.href),no_footer:this._getBoolAttribute('no-footer'),no_header:this._getBoolAttribute('no-header'),onvalidate:this.getAttribute('onvalidate'),width:this._getPxAttribute('width',600),target:this.getAttribute('target')};if(this._attr.onvalidate)this.subscribe('xd.validate',ES5(function(m){var n=ES5('JSON','parse',false,m.value),o=ES5(function(q){this.arbiterInform('Registration.Validation',{errors:q,id:m.id});},'bind',true,this),p=h.executeFunctionByName(this._attr.onvalidate,n,o);if(p)o(p);},'bind',true,this));this.subscribe('xd.authLogin',ES5(this._onAuthLogin,'bind',true,this));this.subscribe('xd.authLogout',ES5(this._onAuthLogout,'bind',true,this));return true;},getSize:function(){return {width:this._attr.width,height:this._getHeight()};},_getHeight:function(){if(this._attr.height)return this._attr.height;var m;if(!this._attr.fields){m=['name'];}else try{m=ES5('JSON','parse',false,this._attr.fields);}catch(n){m=this._attr.fields.split(/,/);}if(this._attr.width<this._skinnyWidth){return this._skinnyBaseHeight+m.length*this._skinnyFieldHeight;}else return this._baseHeight+m.length*this._fieldHeight;},getUrlBits:function(){return {name:'registration',params:this._attr};},getDefaultWebDomain:function(){return k.resolve('www',true);},_onAuthLogin:function(){if(!g.getAuthResponse())g.getLoginStatus();h.fireEvent('auth.login',this);},_onAuthLogout:function(){if(!g.getAuthResponse())g.getLoginStatus();h.fireEvent('auth.logout',this);}});e.exports=l;},null);
__d("sdk.XFBML.SocialContext",["sdk.Event","sdk.XFBML.IframeWidget"],function(a,b,c,d,e,f,g,h){var i=h.extend({setupAndValidate:function(){var j=this.getAttribute('size','small');this._attr={channel:this.getChannelUrl(),width:this._getPxAttribute('width',400),height:this._getPxAttribute('height',100),ref:this.getAttribute('ref'),size:this.getAttribute('size'),keywords:this.getAttribute('keywords'),urls:this.getAttribute('urls'),object_id:this.getAttribute('object_id')};this.subscribe('xd.social_context_stats',ES5(this._bubbleSocialContextStats,'bind',true,this));return true;},_bubbleSocialContextStats:function(j){var k={pluginID:this.getAttribute('plugin-id'),socialContextPageIDs:ES5('JSON','parse',false,j.social_context_page_ids)};g.fire('xfbml.social_context_stats',k);},getSize:function(){return {width:this._attr.width,height:this._attr.height};},getUrlBits:function(){return {name:'social_context',params:this._attr};}});e.exports=i;},null);
__d("legacy:fb.xfbml",["Assert","sdk.domReady","sdk.Event","FB","IframePlugin","PluginTags","wrapFunction","XFBML","sdk.XFBML.Comments","sdk.XFBML.CommentsCount","sdk.XFBML.ConnectBar","sdk.XFBML.LoginButton","sdk.XFBML.Name","sdk.XFBML.RecommendationsBar","sdk.XFBML.Registration","sdk.XFBML.SocialContext"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o={comments:b('sdk.XFBML.Comments'),comments_count:b('sdk.XFBML.CommentsCount'),connect_bar:b('sdk.XFBML.ConnectBar'),login_button:b('sdk.XFBML.LoginButton'),name:b('sdk.XFBML.Name'),recommendations_bar:b('sdk.XFBML.RecommendationsBar'),registration:b('sdk.XFBML.Registration'),social_context:b('sdk.XFBML.SocialContext')};ES5(ES5('Object','keys',false,l),'forEach',true,function(q){n.registerTag({xmlns:'fb',localName:q.replace(/_/g,'-'),ctor:k.withParams(l[q])});});ES5(ES5('Object','keys',false,o),'forEach',true,function(q){n.registerTag({xmlns:'fb',localName:q.replace(/_/g,'-'),ctor:o[q]});});j.provide('XFBML',{parse:function(q){g.maybeXfbml(q,'Invalid argument');if(q&&q.nodeType===9)q=q.body;return n.parse.apply(null,arguments);}});n.subscribe('parse',ES5(i.fire,'bind',true,i,'xfbml.parse'));n.subscribe('render',ES5(i.fire,'bind',true,i,'xfbml.render'));i.subscribe('init:post',function(q){if(q.xfbml)setTimeout(m(ES5(h,'bind',true,null,n.parse),'entry','init:post:xfbml.parse'),0);});g.define('Xfbml',function(q){return (q.nodeType===1||q.nodeType===9)&&typeof q.nodeName==='string';});try{if(document.namespaces&&!document.namespaces.item.fb)document.namespaces.add('fb');}catch(p){}},3);
__d("legacy:fb.xfbml-legacy",["FB","sdk.Event"],function(a,b,c,d,e,f,g,h){g.provide('XFBML.RecommendationsBar',{markRead:function(i){h.fire('xfbml.recommendationsbar.read',i||window.location.href);}});},3);

}).call({}, window.inDapIF ? parent.window : window);
} catch (e) {new Image().src="http:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"1267954","message":"'+e.message+'"}}');}

/*! jQuery UI - v1.11.1+CommonJS - 2014-09-17
* http://jqueryui.com
* Includes: widget.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );

	} else if (typeof exports === "object") {
		// Node/CommonJS:
		factory(require("jquery"));

	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Widget 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;



}));


/*
 * jQuery Iframe Transport Plugin 1.8.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',
            /*jshint scripturl: false */
                form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="' + initialIframeSrc +
                            '" name="iframe-transport-' + counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input)
                                    .prop('name', clone.prop('name'))
                                    .attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));


/*
 * jQuery File Upload Plugin 5.42.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('./vendor/jquery.ui.widget')
        );
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (limitSize && (!filesLength || files[0].size === undefined)) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                },
                dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                this.element[0].attributes,
                function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));


/*global window, $, navigator, document */
(function($) {	

    /*
     * here we're determining the source hostname of this executing script,
     * after trimming off the path.  we'll use this as our api url to post to
     * for uploads
     */
    var scripts = document.getElementsByTagName("script");
    var src = scripts[scripts.length-1].src;

    /*
     * here we're going to use a heuristic to determine if loom.js is being
     * served from django.  if it is, we need to include that proxied path
     */
    var split = src.split("/");
    var sliceEnd = 3;
    if (split[3] === "loom") {
        sliceEnd = 4;
    }
    var API_URL = split.slice(0, sliceEnd).join("/");

    var tmpl = [
        '<div class="loom-drag-n-drop" data-state="default">',
            '<div class="uploader-state default-msg group">',
                '<div class="ie">Upload a file <input class="ie" type="file" name="{name}" /></div>',
                '<div class="not-ie">',
                    '<div class="state-title">Drag your file here</div>',
                    'or <a class="trigger-file-upload">upload a file from your computer</a>',
                '</div>',
            '</div>',
            '<div class="uploader-state error-msg group"></div>',
            '<div class="uploader-state uploading-msg group">',
                '<div class="upload-in-progress state-title">Uploading</div>',
                '<progress class="success" id="progress_{name}" value="0" max="100"></progress>',
            '</div>',
            '<div class="uploader-state success-msg group">',
            '</div>',
            '<input class="not-ie" type="file" name="{name}" />',
            '<input type="hidden" class="loom-upload-id" />',
        '</div>'
    ];


    var AjaxFileUploader;
	$.fn.ajaxFileUpload = function(args) {
        return new AjaxFileUploader(this, args);
	};

	$.fn.ajaxFileUpload.uploaders = {};
	$.fn.ajaxFileUpload.fileUploadsInProgress = 0;
	$.fn.ajaxFileUpload.animateEllipses = function(el, maxEllipses, interval) {
		/*
		 * our default text getters and setters, for normal elements with
		 * innerHTML
		 */
		var textGetter, textSetter;
		textGetter = function() {return el.text();}; 
		textSetter = function(text) {return el.text(text);};
		
		/*
		 * to handle inputs, where they don't have an innerHTML, they have
		 * a value
		 */
		if (el.attr("value")) {
			textGetter = function() {
				return el.attr("value");
			};
			
			textSetter = function(text) {
				return el.attr("value", text);
			};
		}
		
		if (maxEllipses === undefined) {
			maxEllipses = 3;
		}
		if (interval === undefined) {
			interval = 500;
		}
		
		$.fn.ajaxFileUpload.stopEllipses(el);

		
		//el.data("ellipsesOriginalTextAlign", el.css("text-align"));
		//el.css("text-align", "left");
		
		el.data("ellipsesOriginalText", textGetter());
		el.data("ellipsesInterval", window.setInterval(function() {
    		var text = textGetter();
    		var matches = text.match(/\.+$/g);
    		var numEllipses = 0;
    		
    		if (matches) {
    			numEllipses = matches[0].length;
    		}
    		
    		if (numEllipses >= maxEllipses) {
    			text = el.data("ellipsesOriginalText");
    		}
    		else {
    			text += ".";
    		}
    		textSetter(text);
    	}, interval));
    	return;
    };
    
    
	$.fn.ajaxFileUpload.stopEllipses = function(el) {
		var existingInterval = el.data("ellipsesInterval");
		if (existingInterval) {
			window.clearInterval(existingInterval);
			el.html(el.data("ellipsesOriginalText"));
			//el.css("text-align", el.data("ellipsesOriginalTextAlign"));
		}
	};
    
    
	
	
	AjaxFileUploader = function(input, args) {
        this.container = $(tmpl.join("\n").replace(/\{name\}/g, "test"));
        $(input).replaceWith(this.container);
        this.hiddenId = this.container.find("input.loom-upload-id");
		var isIE = navigator.userAgent.match(/msie/i) ? 1:0;
		
		
		/*
		 * we don't do this if we're not IE because IE requires that we display
		 * the input[type=file] directly for the user to click, because it
		 * doesn't support programmatic clicks of that element (i guess for
		 * security reasons)
		 */
		if (!isIE) {
			/*
			 * cause clicking the drag-n-drop area to open the file dialog
			 */
			this.container.click(function(e) {
				var el = $(this);
				var notIEInput = el.find("input[type=file].not-ie");
				
				/*
				 * this is so ghetto, but because our input[type=file] is hidden, click
				 * events bubble up to .drag-n-drop's click handler.  what this means
				 * is that $(input).trigger("click") WILL END UP HERE AGAIN, hence
				 * this check
				 */
				if (e.target === notIEInput[0]) {
					return true;
				}
				$(notIEInput).trigger("click");
			});

            this.container.find(".ie").hide();
		}
        else {
            this.container.find(".not-ie").hide();
        }
		
		
		this.progressBar = this.container.find("progress");
		
		
		/*
		 * gets all the state divs and puts them into a mapping of state name
		 * => state div
		 */
		var states = {};
		this._states = states;
		var stateList = this.container.find(".uploader-state").map(function() {
			var stateName = null;
			var stateDiv = this;
			$.each(this.className.split(/\s+/), function(i, item) {
				if (/-msg$/.test(item)) {
					stateName = /(.+?)-msg$/.exec(item)[1];
				}
			});
			return [[stateName, stateDiv]];
		});
		$(stateList).each(function(i, el) {
			states[el[0]] = $(el[1]);
		});
		
		/*
		 * enable the actual fileupload widget on the individual form element
		 */
		if (isIE) {
			this._input = this.container.find("input[type=file].ie");
		}
		else {
			this._input = this.container.find("input[type=file].not-ie");
		}
	    this.name = this._input.attr("name");
	    
    	// used in the callbacks
    	var self = this;
    	
    	this._input.fileupload({
            url: API_URL + "/async-upload",
            paramName: "upload",
            pasteZone: null,
            dropZone: this.container,
            send: $.proxy(this._fileUploadStarted, self)
            //forceIframeTransport: true
        })
        .bind("fileuploadstart", $.proxy(this._startCallback, self))
        .bind("fileuploadprogress", $.proxy(this._progressCallback, self))
        .bind("fileuploaddone", $.proxy(this._doneCallback, self))
        .bind("fileuploadfail", $.proxy(this._failCallback, self));
        
    	$.fn.ajaxFileUpload.uploaders[this._input.attr("name")] = this;
    	
    	
    	/*
    	 * pull the state from the django-rendered widget and sync up the
    	 * javascript widget with that.  so if a file has been uploaded, it
    	 * will display the file link, etc
    	 */
    	this.setState(this.getState());
    	
    	this._uploadingCallback = null;
    	this._doneUploadingCallback = null;
    	this._successCallback = null;
    	this._errorCallback = null;
    	
    	
    	$(this.getStateDiv("success")).on("click", ".uploader-file", function(e) {
    		e.stopPropagation();
    		return true;
    	});
	};
	
	
	AjaxFileUploader.prototype = {
		_progressCallback: function(e, data) {
	    	/*
	    	 * we use 95% and not 100% so that the file won't appear to be finished
	    	 * until our callback (success or failure) is called, at which point
	    	 * we'll set the progress to 100%
	    	 */
	    	var amt = parseInt(data.loaded / data.total * 95, 10);
	    	this._setUploadProgress(amt);
	    },
	    
	    _setUploadProgress: function(amt) {
	    	this.progressBar.attr("value", amt);
	    },
	    
	    _startCallback: function(e) {
	    	this._setUploadProgress(0);
	    	this.setState("uploading");
	    },

        getUploadId: function() {
            return this.hiddenId.val();
        },
	    
	    _doneCallback: function(e, data) {
	    	var xhr = data.jqXHR;
	    	
	    	var res;
	    	
	    	if (xhr.responseText) {
	    		res = JSON.parse(xhr.responseText);
	    	}
	    	else {
	    		res = JSON.parse($(data.result).find("script").html());
	    	}
	    	
	    	var status = res.status;
	    	var msg = res.status_msg;
	    	
	    	var self = this;
            var callback = null;
	    	
	    	// success
	    	if (status) {
	            callback = function() {
	            	self.success(msg);
                    self.hiddenId.val(res.id);
	            	if (self._successCallback) {
	            		self._successCallback(res);
	            	}
	            };
	    	}
	    	else {
	    		callback = function() {
	    			self.error(msg);
	            	if (self._errorCallback) {
	            		self._errorCallback(res);
	            	}
	    		};
	    	}
    
		    this._fileDoneForOneReasonOrAnother(callback);
	    },
	    
	    setSuccessCallback: function(cb) {
	    	this._successCallback = $.proxy(cb, this);
	    },
	    
	    setErrorCallback: function(cb) {
	    	this._errorCallback = $.proxy(cb, this);
	    },
	    
	    setUploadStartCallback: function(cb) {
	    	this._uploadingCallback = $.proxy(cb, this);
	    },
	    
	    setUploadEndCallback: function(cb) {
	    	this._doneUploadingCallback = $.proxy(cb, this);
	    },
	    
	    setUploadTitle: function(html) {
	    	this._getUploadTitleElement().text(html);
	    },
	    
	    _getUploadTitleElement: function() {
	    	var state = this._states.uploading;
	    	return state.find(".upload-in-progress");
	    },
	    
	    _failCallback: function(e, data) {
	    	var xhr = data.jqXHR;
	    	var code = xhr.status;
	    	var error = xhr.statusText;
	    	
	    	var msg = "Upload error " + code + ": " + error;
	    	
	    	var self = this;
	    	function callback() {
	    		self.error(msg);
	    	}
	        
	        this._fileDoneForOneReasonOrAnother(callback);
	    },
	    
	    getStateDiv: function(name) {
	    	return this._states[name];
	    },
	    
	    getState: function() {
	    	return this.container.data("state");
	    },
	    
	    setState: function(state) {
	    	var oldState = this.getState();
	    	if (oldState === "uploading") {
	    		$.fn.ajaxFileUpload.stopEllipses(this._getUploadTitleElement());
	    	}
	    	
	    	this.container.data("state", state);
	    	this._showState(state);
	    	
	    	if (state === "uploading") {
	    		$.fn.ajaxFileUpload.animateEllipses(this._getUploadTitleElement());
	    	}
	    	
	    	return this;
	    },
	    
	    _showState: function(name) {
	    	var self = this;
	    	$.each(this._states, function(k,v) {
	    		if (k === name) {
	    			$(v).show();
	    			self.container.addClass(k);
	    		}
	    		else {
	    			self.container.removeClass(k);
	    			$(v).hide();
	    		}
	    	});
	    	return this;
	    },
	    
	    /*
	     * sets the success msg and shows the success state
	     */
	    success: function(msg) {
	    	this._states.success.html(msg);
	    	this.setState("success");
	    },
	    
	    /*
	     * sets the error msg and shows the error state
	     */
	    error: function(msg) {
	    	msg = $("<div><div class='state-title'>Oops! this file won't work!</div></div>").append(msg);
	    	this._states.error.html(msg);
	    	this.setState("error");
	    },
	    
	    _fileUploadStarted: function() {
	    	if (this._uploadingCallback) {
	    		this._uploadingCallback(this);
	    	}
	        $.fn.ajaxFileUpload.fileUploadsInProgress += 1;
	    },
	    
	    /*
	     * called when the upload completes, either because of an error or
	     * a success.  this does the nice thing of finishing the progress bar
	     * after a delay, so that very fast file uploads won't just have the
	     * progress bar flash in and out very quickly
	     */
	    _fileDoneForOneReasonOrAnother: function(callback) {
	    	var self = this;
	    	window.setTimeout(function() {
		    	$.fn.ajaxFileUpload.fileUploadsInProgress -= 1;
	    		callback();
	    		if (self._doneUploadingCallback) {
	    			self._doneUploadingCallback(self);
	    		}
	    	}, 1000);
	    }
	};
	
}(window.jQuery));


var ourJQuery = $;

$.noConflict(true);

var Loom = (function($) {

$.support.cors = true;

var FACEBOOK_APP_ID = '116832620224';
var GIRAFFE_SERVER = 'https://cdn-images.threadless.com';
var API_URL = 'https://loom.threadless.com';
var EMBED_CSS = 'https://d2djzakkfkyr8w.cloudfront.net/static/css/embed.css';
var API_IE_URL = 'https://www.threadless.com/loom/';

/*global FB, window, $, API_IE_URL, API_URL, FACEBOOK_APP_ID, CryptoJS */


function isUndefined(name) {
    return name === undefined;
}

function parseDate(dt) {
    return new Date(dt);
}

function ieVersion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var version = null;

    if (msie > 0) {
        version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    return version;
}

function walkObject(obj, path) {
    var paths = path.split(".");
    var i;
    var subpath;

    for (i = 0; i < paths.length; i += 1) {
        subpath = paths[i];
        obj = obj[subpath];
        if (isUndefined(obj)) {
            break;
        }
    }
    return obj;
}

function _toId(obj) {
    var id = obj;
    if (typeof id === "object") {
        id = obj.id;
    }
    return id;
}

function joinURLToPath(url, path) {
    url = url.replace(/\/+$/g, "");
    path = path.replace(/^\/+/g, "");
    return url + "/" + path;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function camelCase(word) {
    return word.replace(/(\_\w)/g, function (m) {return m[1].toUpperCase(); });
}

function fullURLToPath(path) {
    var fullUrlMatch = path.match(/https?:\/\/.+?(\/.+)/i);
    if (fullUrlMatch) {
        path = fullUrlMatch[1];
    }
    return path;
}

function composeOptions(page, perPage, options) {
    var allOptions = {"page": page, "per_page": perPage};
    $.extend(allOptions, options);
    return allOptions;
}

/*
 * guess who doesn't support btoa?  < IE10!
 */
function btoa(s) {
    var wordArray = CryptoJS.enc.Utf8.parse(s);
    return CryptoJS.enc.Base64.stringify(wordArray);
}

function btoaURL(s) {
    var b64 = btoa(s);
    return b64.replace("+", "-").replace("/", "_");
}

function atob(s) {
    var wordArray = CryptoJS.enc.Base64.parse(s);
    return wordArray.toString(CryptoJS.enc.Utf8);
}

function atobURL(b64) {
    b64 = b64.replace("_", "/").replace("-", "+");
    return atob(b64);
}

/*
 * helper function for default argument handling
 */
function _defaultArg(name, _default) {
    return isUndefined(name) ? _default : name;
}


function _parseGiraffeUrl(source) {
    var path = source;
    if (/https?:\/\//i.test(source)) {
        path = source.split("/").slice(3).join("/").split("?")[0];
    }

    var qs = {};
    var qsParts = source.split("?");
    if (qsParts.length > 1) {
        var params = qsParts[1].split("&");
        var i, kv;
        for (i=0; i<params.length; i+=1) {
            kv = params[i].split("=");
            qs[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
        }
    }

    var opStack = [];
    var v2 = qs.v2;
    if (v2) {
        var opDict = JSON.parse(atobURL(v2));
        opStack = opDict.ops;
    }

    return [path, opStack];
}

var GiraffeImage = function (source) {
    var res = _parseGiraffeUrl(source);
    this.source = res[0];
    this.opStack = res[1];
};

GiraffeImage.prototype = {
    call: function (opName, args, kwargs) {
        this.opStack.push([opName, args, kwargs]);
        var newImg = new GiraffeImage(this.source);
        $.each(this.opStack, function (i, op) {
            newImg.opStack.push(op);
        });
        return newImg;
    },

    getUrl: function () {
        var opDict = {
            ops: this.opStack
        };
        var server = GIRAFFE_SERVER.replace(/\/+$/, "");
        var opString = btoaURL(JSON.stringify(opDict));
        var url = server + "/" + this.source + "?v2=" + opString;
        return url;
    }
};


var LoomModel = function (api, dictOrURL, mappings) {
    /*
     * mappings may be undefined in the case that we're using LoomModel as
     * the model, instead of a derived subclass
     */
    this._mappings = mappings || {};
    this._api = api;

    var lazy = true;
    if (typeof dictOrURL === "object") {
        lazy = false;
        $.extend(this, dictOrURL);
    }

    this._lazy = lazy;
    this._lazyConstructor = null;
    this._underlyingDict = dictOrURL;
};

/*
 * turns some identifier (or nothing), into a model that we can use to
 * wrap around the json response
 */
function modelToModelObj(model) {
    if (!model) {
        model = LoomModel;
    } else if (typeof model === "string") {
        model = eval(model);
    }
    return model;
}


LoomModel.fromCollection = function (model, api, promise) {
    promise = promise.then(function (collection) {
        var newCollection = collection.map(function (item) {
            return LoomModel.fromResolvedObject(model, api, item);
        });
        return newCollection;
    });
    return promise;
};

LoomModel.fromPlainURL = function (Model, api, url) {
    Model = modelToModelObj(Model);
    var obj = new Model(api, url);
    obj._lazyConstructor = Model;
    return obj;
};

LoomModel.fromURL = function (Model, api, promise) {
    Model = modelToModelObj(Model);
    promise = promise.then(function (url) {
        var obj = new Model(api, url);
        obj._lazyConstructor = Model;
        return obj;
    });
    return promise;
};

LoomModel.fromObject = function (model, api, promise) {
    promise = promise.then(function (json) {
        return LoomModel.fromResolvedObject(model, api, json);
    });
    return promise;
};

LoomModel.fromResolvedObject = function (Model, api, json) {
    var obj = new Model(api, json);
    obj._populateFields(obj);
    return obj;
};

/*
 * creates a function that takes a callback and repeatedly calls it on the
 * results of the api endpoint at `path`, after they have been wrapped with
 * `model`
 */
function _mapRelatedIterAPICall(api, path, model) {
    var perPage = api._defaultIterPage;

    /*
     * this will resolve when we're completely done iterating over the
     * collection
     */
    var deferred = $.Deferred();

    function iterAccessor(cb, options) {
        function getMore(page, perPage, options) {
            var promise = api.get(path, composeOptions(page, perPage, options));
            var colPromise = LoomModel.fromCollection(model, api, promise);

            colPromise.then(function (collection) {
                collection.forEach(cb);

                if (collection.length) {
                    getMore(page + 1, perPage, options);
                } else {
                    deferred.resolve();
                }
            });
        }

        getMore(0, perPage, options);
        return deferred.promise();
    }

    return iterAccessor;
}

function setDottedKey(d, field, value) {
    var subD = d;
    var pieces = field.split(".");
    var lastPiece = pieces.pop();
    $.each(pieces, function (i, piece) {
        subD = subD[piece];
    });
    subD[lastPiece] = value;
}

function recursiveDictToFlatDottedDict(d, prefix) {
    var totalDottedDict = {};
    $.each(d, function (k, v) {
        if (typeof v === "object" && v !== null && v.hasOwnProperty) {
            var dottedDict = recursiveDictToFlatDottedDict(v, k);
            $.extend(true, totalDottedDict, dottedDict);
        }
        else {
            var dottedKey;
            if (prefix) {
                dottedKey = prefix + "." + k;
            }
            else {
                dottedKey = k;
            }
            totalDottedDict[dottedKey] = v;
        }
    });
    return totalDottedDict;
}

function _mapRelatedAPICall(api, pathOrShortObj, isCollection, model, method) {
    if (isUndefined(method)) {
        method = "get";
    }

    function getPath() {
        var path = null;
        if (typeof pathOrShortObj === "string") {
            path = pathOrShortObj;
        }
        else {
            path = pathOrShortObj.full_resource || null;
        }
        return path;
    }

    function updater(data) {
        var promise = api.post(getPath(), data);
        return LoomModel.fromObject(model, api, promise);
    }

    function objAccessor(options) {
        options = options || {};
        var promise = api.get(getPath(), options);
        return LoomModel.fromObject(model, api, promise);
    }

    function collectionAccessor(page, perPage, options) {
        options = options || {};
        if (isUndefined(perPage)) {
            perPage = page;
            page = 0;
        }
        options = composeOptions(page, perPage, options);
        var promise = api.get(getPath(), options);
        return LoomModel.fromCollection(model, api, promise);
    }

    var fn;
    if (method === "get") {
        fn = objAccessor;
        if (isCollection) {
            fn = collectionAccessor;
        }
    } else if (method === "post") {
        fn = updater;
    }

    return fn;
}


LoomModel.prototype = {

    inflate: function (options) {
        var promise = null;

        if (this._lazy) {
            promise = this._api.get(this._underlyingDict, options);
            promise = LoomModel.fromObject(this._lazyConstructor, this._api,
                    promise);
        } else {
            var def = $.Deferred();
            def.resolve(this);
            promise = def.promise();
        }

        return promise;
    },

    _populateFields: function (obj) {
        var modelSelf = this;

        function createAccessorName(field) {
            return "get" + capitalize(camelCase(field));
        }

        function createIterName(field) {
            return "each" + capitalize(camelCase(field));
        }


        function createRelatedAccessor(field, isCollection, model) {
            model = modelToModelObj(model);

            var value = obj[field];
            if (isUndefined(value)) {
                return null;
            }

            if (!value) {
                var deferred = $.Deferred();
                deferred.resolve(null);
                return deferred.promise();
            }

            return _mapRelatedAPICall(modelSelf._api, value, isCollection,
                    model);
        }

        /*
         * provides an "each"+name iterator that takes a callback and applies
         * it to every result from a collection endpoint, while seemlessly
         * doing the pagination under the hood
         */
        function createRelatedEach(field, model) {
            model = modelToModelObj(model);

            var value = obj[field];
            if (isUndefined(value)) {
                return null;
            }

            if (!value) {
                var deferred = $.Deferred();
                deferred.resolve(null);
                return deferred.promise();
            }

            return _mapRelatedIterAPICall(modelSelf._api, value, model);
        }

        function createRefreshAccessor(url, model) {
            var accessor = _mapRelatedAPICall(modelSelf._api, url, false,
                    model);
            return accessor;
        }

        function createUpdateAccessor(url, model) {
            var accessor = _mapRelatedAPICall(modelSelf._api, url, false, model,
                    "post");
            return accessor;
        }

        function createDeleter(url, model) {
            var accessor = function () {
                modelSelf._api.delete_(url);
            };
            return accessor;
        }

        var fn = function (obj) {
            var relatedObjectFields = obj._mappings.relatedObjects || {};
            $.each(relatedObjectFields, function (field, model) {
                obj[createAccessorName(field)] = createRelatedAccessor(field, false, model);
            });

            var relatedCollectionFields = obj._mappings.relatedCollections || {};
            $.each(relatedCollectionFields, function (field, model) {
                obj[createAccessorName(field)] = createRelatedAccessor(field,
                        true, model);
                obj[createIterName(field)] = createRelatedEach(field, model);
            });

            var flatFields = recursiveDictToFlatDottedDict(obj._underlyingDict);

            var dateFields = obj._mappings.dates || [];
            $.each(dateFields, function (fi, field) {
                var value = flatFields[field];
                if (!value) {
                    return;
                }
                setDottedKey(obj, field, parseDate(value));
            });

            var giraffeFields = obj._mappings.giraffeImages || [];
            $.each(giraffeFields, function (fi, field) {
                var value = flatFields[field];
                if (!value) {
                    return;
                }
                setDottedKey(obj, field, new GiraffeImage(value));
            });

            var fullResource = obj.full_resource;
            if (!isUndefined(fullResource)) {
                if (isUndefined(obj.refresh)) {
                    obj.refresh = createRefreshAccessor(fullResource, obj.model);
                }
                if (isUndefined(obj.update)) {
                    obj.update = createUpdateAccessor(fullResource, obj.model);
                }
                if (isUndefined(obj.delete_)) {
                    obj.delete_ = createDeleter(fullResource, obj.model);
                }
            }

            return obj;
        };

        /*
         * this is bad of me, but i don't remember why obj would ever be
         * undefined.  the source does not allude to this ever being the case
         */
        var res;
        if (isUndefined(obj)) {
            res = fn;
        } else {
            res = fn(obj);
        }
        return res;
    }
};


/*
 * a convenience function for creating a LoomModel subclass.  name is the name
 * of the model as it will appear in console.log, mappings is an object of
 * relatedCollections, relatedObjects, and dates, methods are additional
 * methods to exist on the subclass prototype
 */
function createModel(name, mappings, methods) {
    /*
     * this looks weird.  what it is doing is identical to the commented-out
     * Model function below.  why we're doing it this way is that if we use
     * the commented-out version, all models created with this helper function
     * will appear in the console.log as "Model", even though the objects
     * being instantiated are indeed using fully-qualified names like
     * "UserModel".  the problem has to do with the creation of the function
     * itself...only then can it be given the name it will appear as in the
     * console.  so we do some magic to create a dynamic function, and now
     * the console.log behaves like we want
     */
    var Model = new Function("LoomModel", "mappings",
            "return function " + name + "(api, json) {" +
            "LoomModel.call(this, api, json, mappings);" +
            "}")(LoomModel, mappings);

    /*
    function Model(api, json) {
        LoomModel.call(this, mappings, api, json);
    }
     */

    var prototype = $.extend({model: Model}, LoomModel.prototype, methods);
    Model.prototype = prototype;
    return Model;
}


/*
 * MODELS DEFINED BELOW
 */


var ShopModelMappings = {
    giraffeImages: [
        "images.cover",
        "images.logo",
        "images.card"
    ],
    relatedCollections: {
        "products": "ShopProductModel"
    },
    relatedObjects: {
        "user": "UserModel"
    }
};
var ShopModel = createModel("ShopModel", ShopModelMappings, {
    createProduct: function (title, description) {
        var path = this.full_resource + "/products";
        var data = {
            "title": title,
            "description": description
        };
        var promise = this._api.post(path, data);
        return LoomModel.fromURL("ShopProductModel", this._api, promise);
    }
});

var ShopProductModelMappings = {
    relatedCollections: {
        "stock": "ShopProductStockModel"
    },
    relatedObjects: {
        "shop": "ShopModel"
    },
    dates: [
        "date_added"
    ]
};
var ShopProductModel = createModel("ShopProductModel",
        ShopProductModelMappings, {
    createStock: function (categorySlug, sizeSlug, styleSlug, colorBucketSlug, price) {
        var path = this.full_resource + "/stock";
        var data = {
            "category_slug": categorySlug,
            "size_slug": sizeSlug,
            "style_slug": styleSlug,
            "color_bucket_slug": colorBucketSlug,
            "price": price
        };
        var promise = this._api.post(path, data);
        var self = this;
        return promise.then(function (stock) {
            return $.map(stock, function (s) {
                return LoomModel.fromPlainURL("ShopProductStockModel", self._api, s);
            });
        });
    }
});


var ShopProductStockModelMappings = {
    relatedObjects: {
        "product": "ShopProductModel",
        "attributes": "ShopStockAttributesModel"
    },
    dates: [
        "date_added"
    ]
};
var ShopProductStockModel = createModel("ShopProductStockModel",
        ShopProductStockModelMappings);


var ShopStockAttributesModelMappings = {
};
var ShopStockAttributesModel = createModel("ShopStockAttributesModel",
        ShopStockAttributesModelMappings);


var SubmissionModelMappings = {
    relatedCollections: {
        "preorders": null,
        "likes": null,
        "comments": null,
        "votes": null
    },
    relatedObjects: {
        "artist": "UserModel",
        "design": null
    },
    dates: [
        "voting_end",
        "pub_date",
        "approved_date"
    ]
};
var SubmissionModel = createModel("SubmissionModel", SubmissionModelMappings, {
    refresh: function () {
        return this._api.getSub(this.id);
    }
});


var UserModelMappings = {
    relatedCollections: {
        "preorders": "PreorderModel",
        "sales": "SaleModel",
        "products": null,
        "activities": null,
        "friends": "UserModel",
        "followers": "UserModel",
        "designs": "DesignModel",
        "submissions": "SubmissionModel"
    },
    relatedObjects: {
        "profile": null,
        "account": "AccountModel"
    }
};
var UserModel = createModel("UserModel", UserModelMappings, {
    refresh: function () {
        return this._api.getUser(this.id);
    }
});

var CreditCardMappings = {
    relatedObjects: {
        "user": "UserModel"
    }
};
var CreditCard = createModel("CreditCard", CreditCardMappings, {
    delete_: function () {
        var path = "/users/" + this.user_id + "/account/credit-cards/" + this.id;
        return this._api.delete_(path);
    }
});

var AccountModelMappings = {
    relatedCollections: {
        "addresses": "UserAddress",
        "credit_cards": "CreditCard"
    },
    relatedObjects: {
        "user": "UserModel"
    }
};
var AccountModel = createModel("AccountModel", AccountModelMappings, {
    getCreditCard: function (id) {
        var path = "/users/" + this.user_id + "/account/credit-cards/" + id;
        var promise = this._api.get(path);
        return LoomModel.fromObject(CreditCard, this._api, promise);
    },
    createCreditCard: function (nickname, ccNum, ccExpireMonth, ccExpireYear,
            firstName, lastName, billingAddrId) {
        
        var path = "/users/" + this.user_id + "/account/credit-cards";
        var data = {
            "cc_num": ccNum,
            "cc_expire_month": ccExpireMonth,
            "cc_expire_year": ccExpireYear,
            "first_name": firstName,
            "last_name": lastName,
            "nickname": nickname,
            "billing_address_id": billingAddrId
        };
        var promise = this._api.post(path, data);
        return LoomModel.fromURL(CreditCard, this._api, promise);
    }
});


var UserAddressMappings = {
    relatedObjects: {
        "user": "UserModel"
    }
};
var UserAddress = createModel("UserAddress", UserAddressMappings, {});


var DesignModelMappings = {
    relatedCollections: {
        "products": null
    },
    relatedObjects: {
        "submission": "SubmissionModel"
    }
};
var DesignModel = createModel("DesignModel", DesignModelMappings, {});

var PreorderModelMappings = {
    relatedObjects: {
        "user": "UserModel",
        "submission": "SubmissionModel"
    },
    dates: [
        "created",
        "when_last_state"
    ]
};
var PreorderModel = createModel("PreorderModel", PreorderModelMappings, {
});

var SubPromotionModelMappings = {
    relatedObjects: {
        "promoter": "UserModel",
        "submission": "SubmissionModel",
        "preorder": "PreorderModel"
    }
};
var SubPromotionModel = createModel("SubPromotionModel", SubPromotionModelMappings, {
});

var SaleModelMappings = {
};
var SaleModel = createModel("SaleModel", SaleModelMappings, {
});






/*
 * token is the api consumer
 * 
 * token secret is the api consumer secret
 * 
 * badCookieCallback - will be called if they have a loom cookie, but it turns
 *     out to be invalid.  this can happen if people log into different
 *     environments (dev, prod, staging) and try to jump back and forth
 *     
 * fbSuccessCallback
 * 
 * badSyncCallback - called when someone performs an operation that requires
 *     authorization.  this is to catch when a user is logged in through gza
 *     but doesn't have all the cookies required to log in through loom.
 *     they'll still end up making a request they shouldn't be allowed to make
 *     through the UI, but we need to be able to trigger some kind of logout
 *     or login action
 *     
 *     this is slightly different from badCookieCallback in that 
 *     badCookieCallback is designed primarily for handling wrong environments,
 *     while this is designed to handle if we're somehow showing we're logged
 *     in on gza, but not in loom
 *     
 * djangoIsLoggedIn - used as a hint of what actions to take if we find out
 *     we can't do a cookie login.  being logged in in django, but unable
 *     to cookie login will call badCookieCallback
 */
var Loom = function (token, secret, badCookieCallback, fbSuccessCallback,
        badSyncCallback, djangoIsLoggedIn) {

    this.token = token;
    this.secret = secret;
    this.username = null;
    this.userToken = null;
    this.badSyncCallback = badSyncCallback;
    this._defaultIterPage = 10;
    this._commonCookieOpts = {expires: 1000, domain: ".threadless.com",
            path: "/"};


    /*
     * see the comments for getPreference and loom's /users/<username>/account
     * endpoint
     */
    this._cachedPreferences = null;

    /*
     * temporarily disable this, because this looks at a loom api token cookie.
     * this cookie can become invalid if a user changes his password, and we've
     * had reports of a minority of users trying to score a ton of designs,
     * but their scores not showing up.  this is probably why...because their
     * loom token cookie is invalid, but they're still logged in through
     * gza
     */
    //this.loggedIn = this.checkIfLoggedIn();
    this.loggedIn = false;

    var ie = ieVersion();
    this._shouldTunnel = ie && ie <= 9;
    this._apiUrl = !ie || ie > 9 ? API_URL : API_IE_URL;

    /*
     * iOS devices like iPhone and iPad disable setting of 3rd party cookies
     * by default, which makes things like widget embedding difficult because
     * they can never login in (they can never set a login cookie).  
     * 
     * we're detecting if we can set a cookie, so we can choose to do something
     * else in the code that uses loom.js
     */
    this.setCookie("can-set-cookie", true, this._commonCookieOpts);
    this.canSetCookies = this.getCookie("can-set-cookie");

    this.logInPromise = this.tryAutoLogin(badCookieCallback, fbSuccessCallback,
            djangoIsLoggedIn);
};

Loom.prototype = {
    /*
     * tries to auto-login with our django cookie.  if that can't happen,
     * we hook up a subscription to the facebook login event
     */
    tryAutoLogin: function (badCookieCallback, fbSuccessCallback, djangoIsLoggedIn) {
        var loomSelf = this;
        var cookieLoginPromise = this.loginWithCookie();
        var deferred = $.Deferred();

        cookieLoginPromise.done(function (user) {
            deferred.resolve("gza", user);
        });

        cookieLoginPromise.fail(function (reason) {
            if ((reason === "bad_cookie" || djangoIsLoggedIn) && badCookieCallback) {
                badCookieCallback(loomSelf, deferred);
            } else {

                FB.init({
                    appId: FACEBOOK_APP_ID,
                    status: true, // check login status
                    cookie: true, // enable cookies to allow the server to access the session
                    xfbml: true  // parse XFBML
                });

                FB.Event.subscribe("auth.login", function (authResp) {
                    if (authResp.status === "connected") {
                        FB.api("/me", function (meResp) {
                            var fbToken = authResp.authResponse.accessToken;
                            var fbId = authResp.authResponse.userID;
                            var fbEmail = meResp.email;

                            var fbPromise = loomSelf.loginWithFacebook(fbToken,
                                    fbId, fbEmail);

                            if (fbSuccessCallback) {
                                fbPromise.done($.proxy(fbSuccessCallback, window));
                            }
                        });
                    }
                });
                deferred.reject();
            }
        });
        
        var promise = deferred.promise();
        return promise;
    },

    /*
     * logs in a user. this handles setting all internal state to persist
     * login on the page. returns a promise that you should .then() on to do
     * other api functions that require being logged in
     * 
     * if you already have an api token available to you, you can set it in
     * the Loom constructor, and avoid having to do a login before you make
     * other calls
     */
    login: function (username, password) {

        var loginPromise = this.post("/login", {username: username,
            password: password});

        return loginPromise.then($.proxy(this._loginHandler, this));
    },

    /*
     * logs you out as best as it can.  removes facebook connection cookies,
     * removes loom cookies, removes gza cookies
     */
    logout: function () {
        this.removeCookie("login");

        $.removeCookie("THDLSS_id", this._commonCookieOpts);
        $.removeCookie("THDLSS_uuid", this._commonCookieOpts);
        
        /*
         * we actually can't remove this cookie because it's httponly
         */
        //$.removeCookie("sessionid", {path: "/"});
    },

    /*
     * logs us into facebook.  this must be embedded in facebook's crazy
     * authentication handler code
     */
    loginWithFacebook: function (fbToken, fbId, fbEmail) {
        var data = {
            facebook_user_id: fbId,
            facebook_email: fbEmail,
            facebook_access_token: fbToken
        };
        var promise = this.post("/auth/facebook", data);
        return promise.then($.proxy(this._loginHandler, this));
    },
    

    /*
     * looks for the threadless website cookies with which to generate a valid
     * loom api user token
     */
    loginWithCookie: function () {
        var promise = null;
        var self = this;
        var deferred = $.Deferred();
        /*
         * if we're logged in already (from a loom cookie), do nothing really,
         * but return a resolved promise so other code waiting for login to
         * complete works as normal.
         * 
         * this should currently never be true because we've disabled the
         * this.loggedIn = self.checkIfLoggedIn() code in the constructor
         */
        if (this.loggedIn) {
            deferred.resolve();
            return deferred.promise();
        }

        var userId = $.cookie("THDLSS_id");
        var userUUID = $.cookie("THDLSS_uuid");

        /*
         * fail the login and delete the loom cookie if we don't have gza
         * cookies
         */
        if (isUndefined(userId) || isUndefined(userUUID)) {
            this.removeCookie("login");
            promise = deferred.promise();
            deferred.reject("no_cookie");
        } else {
            var data = {
                user_id: userId,
                user_uuid: userUUID
            };

            promise = deferred.promise();

            var cookieLoginPromise = this.post("/cookie-login", data);
            cookieLoginPromise.done(function (data) {
                var user = self._loginHandler(data);
                deferred.resolve(user);
            });
            cookieLoginPromise.fail(function () {
                deferred.reject("bad_cookie");
            });
        }

        return promise;
    },

    checkIfLoggedIn: function () {
        var data = this.getCookie("login");
        var loggedIn = false;

        if (!isUndefined(data)) {
            this.username = data.username;
            this.userToken = data.userToken;
            loggedIn = true;
        }
        return loggedIn;
    },

    /*
     * gets a preference from /users/<username>/account.  returns a promise to
     * the request that will fetch the data and walk to the preference.
     * 
     * notice that we're doing client-side caching of the preferences.  we do
     * this because loom is not yet hooked up to the preference saving,
     * because if it was, we could just clear the preferences cache on save.
     * 
     * but we also don't want *no* caching at all, because we may be checking
     * for preferences constantly...for example, in the case of the scoring
     * feed, where someone is scoring a lot of 5s
     */
    getPreference: function (name) {
        name = name.toLowerCase();
        var deferred = $.Deferred();
        var promise = deferred.promise();
        var loomSelf = this;

        if (this._cachedPreferences) {
            deferred.resolve(this._cachedPreferences);

            promise = promise.then(function (prefs) {
                var value = walkObject(prefs, name);
                return value;
            });
        } else {
            promise = this.getAccount("@" + this.username);
            promise = promise.then(function (account) {
                var prefs = account.preferences;
                loomSelf._cachedPreferences = prefs;

                var value = walkObject(prefs, name);
                return value;
            });
        }

        return promise;
    },

    createUser: function (username, password, email) {
        var path = "/users";
        var data = {
            "username": username,
            "password": password,
            "email": email
        };
        var promise = this.post(path, data);
        return LoomModel.fromURL(UserModel, this, promise);
    },

    getAccount: function (user) {
        var userId = _toId(user);
        var path = "/users/" + userId + "/account";
        return this.get(path);
    },

    getChallenges: function (page, perPage, options) {
        return this.get("/challenges", composeOptions(page, perPage, options));
    },

    getChallengeSubs: function (chalId, page, perPage, options) {
        var path = "/challenges/" + chalId + "/submissions";
        options = composeOptions(page, perPage, options);
        var promise = this.get(path, options);
        return LoomModel.fromCollection(SubmissionModel, this, promise);
    },

    getThreadlessSubs: function (page, perPage, options) {
        var path = "/submissions";
        options = composeOptions(page, perPage, options);
        var promise = this.get(path, options);
        return LoomModel.fromCollection(SubmissionModel, this, promise);
    },

    getSub: function (subIdOrSlug) {
        var path = "/submissions/" + subIdOrSlug;
        var promise = this.get(path);
        return LoomModel.fromObject(SubmissionModel, this, promise);
    },

    getEmbedCode: function (subIdOrSlug, width) {
        var path = "/submissions/" + subIdOrSlug + "/embed";
        return this.get(path, {"width": width});
    },

    getSetting: function (name, def) {
        var path = "/settings/" + name;
        return this.get(path, {"default": JSON.stringify(def)});
    },
    
    chat: function (room, message, args) {
        var path = "/hipchat-rooms/" + room + "/messages";
        var data = {
            "message": message
        };
        $.extend(data, args);
        return this.post(path, data);
    },

    getActivities: function (userId, page, perPage) {
        var path = "/users/" + userId + "/activites";
        return this.get(path, {page: page, per_page: perPage});
    },

    getFacebookFriends: function (user, page, perPage) {
        var path = "/friends/facebook";
        return this.get(path, {page: page, per_page: perPage});
    },

    getColorBuckets: function (page, perPage) {
        var path = "/color-buckets";
        return this.get(path, {page: page, per_page: perPage});
    },

    /*
     * paymentData should be an object like this:
     * 
     * {
     *     "cc_num": "4111111111111111",
     *     "cc_expire_month": "08",
     *     "cc_expire_year": "18",
     *     "cc_cvv": "123",
     *     "first_name": "Andrew",
     *     "last_name": "Moffat",
     *     "billing_address1": "1260 W Madison St",
     *     "billing_address2": "",
     *     "city": "Chicago",
     *     "country": "US",
     *     "postal_code": "60607",
     *     "state": "IL",
     *     "shirt_style": "girly",
     *     "shirt_size": "l",
     *     "save": false,
     * }
     */
    createPreorder: function (sub, paymentData) {
        var id = _toId(sub);
        var path = "/submissions/" + id + "/preorders";
        var promise = this.post(path, paymentData);
        return LoomModel.fromURL(PreorderModel, this, promise);
    },

    /*
     * cancels the preorder made by the current user, on this sub
     */
    cancelMyPreorder: function (sub) {
        var id = _toId(sub);
        var path = "/submissions/" + id + "/preorders/my";
        return this.delete_(path);
    },

    scoreSub: function (sub, score) {
        var data = {
            score: score
        };
        var id = _toId(sub);
        var path = "/submissions/" + id + "/votes";
        return this.post(path, data);
    },

    getPromoCode: function (subIdOrSlug, promoCode) {
        var path = "/submissions/" + subIdOrSlug + "/promotions/" + promoCode;
        var promise = this.get(path);
        return LoomModel.fromObject(SubPromotionModel, this, promise);
    },

    getVotes: function (subIdOrSlug, page, perPage, options) {
        var path = "/submissions/" + subIdOrSlug + "/votes";
        return this.get(path, composeOptions(page, perPage, options));
    },


    likeSub: function (subIdOrSlug) {
        var data = {"source": "web"};
        var path = "/submissions/" + subIdOrSlug + "/likes";
        return this.post(path, data);
    },

    getLikes: function (subIdOrSlug, page, perPage, options) {
        var path = "/submissions/" + subIdOrSlug + "/likes";
        return this.get(path, composeOptions(page, perPage, options));
    },

    sendEmail: function (fromAddr, toAddr, templateId, params, fromDisk) {
        if (isUndefined(fromDisk)) {
            fromDisk = false;
        }

        var path = "/emails";
        var data = {
            "from_addr": fromAddr,
            "to_addr": toAddr,
            "template_slug": templateId,
            "params": params,
            "from_disk": fromDisk
        };
        return this.post(path, data);
    },


    follow: function (user) {
        var friendId = null;
        if (typeof user === "number"){
            friendId = user;
        } else {
            friendId = _toId(user);
        }

        var path = "/users/@" + this.username + "/friends";
        var data = {
            user: friendId
        };
        return this.post(path, data);
    },

    unfollow: function (user) {
        var friendId = null;
        if (typeof user === "number"){
            friendId = user;
        } else {
            friendId = _toId(user);
        }

        var path = "/users/@" + this.username + "/friends/" + friendId;
        return this.delete_(path);
    },

    createShop: function (slug, username) {
        var path = "/shops";
        var data = {
            name: slug
        };
        if (!isUndefined(username)) {
            data.username = username;
        }
        var promise = this.post(path, data);
        return LoomModel.fromURL(ShopModel, this, promise);
    },

    createArtistStockAttributes: function (category, size,
        style, dropshipColorSlug, defaultPrice, weight,
        assetCategory) {

        var path = "/artist-shop-stock-attributes";
        var data = {
            category: category,
            size: size,
            style: style,
            default_price: defaultPrice,
            weight: weight,
            asset_category: assetCategory
        };
        var promise = this.post(path, data);
        return LoomModel.fromURL(ShopStockAttributesModel, this, promise);
    },

    getArtistStockAttributes: function (category, size, style, dropshipColorSlug) {
        var path = "/artist-shop-stock-attributes";
        path = path+"/"+category+"/"+size+"/"+style+"/"+dropshipColorSlug;
        var promise = this.get(path);
        return LoomModel.fromObject(ShopStockAttributesModel, this, promise);
    },

    createArtistShopOverlay: function (category, size, style, color, width, x,
            y, image) {
        var path = "/artist-shop-overlays";
        var data = {
            category_slug: category,
            size_slug: size,
            style_slug: style,
            dropship_color_slug: color,
            width: width,
            x: x,
            y: y,
            overlay: image
        };
        var promise = this.post(path, data);
        return promise;
    },

    setPrinterInputSize: function (category, size, style, color, width, height) {
        var path = "/printer-inputs";
        var data = {
            "category_slug": category,
            "size_slug": size,
            "style_slug": style,
            "dropship_color_slug": color,
            "printer_input": {
                "width": width,
                "height": height
            }
        };
        var promise = this.post(path, data);
        return promise;
    },

    getShop: function (shopIdOrSlug) {
        var path = "/shops/" + shopIdOrSlug;
        var promise = this.get(path);
        return LoomModel.fromObject(ShopModel, this, promise);
    },

    getUser: function (user) {
        var userId = _toId(user);
        var path = "/users/" + userId;
        var promise = this.get(path);
        return LoomModel.fromObject(UserModel, this, promise);
    },

    resetPassword: function (email) {
        var path = "/users-by-email/" + email + "/account";
        var data = {
            "password": null
        };
        return this.post(path, data);
    },

    getSelf: function () {
        var loomSelf = this;
        var promise = this.logInPromise.then(function () {
            var path = "/users/@" + loomSelf.username;
            return LoomModel.fromObject(UserModel, this, loomSelf.get(path));
        });
        return promise;
    },

    /*
     * the following 4 methods are for low-level loom api manipulation. you
     * don't want to use these. instead, write a wrapper method, like
     * getVotes, or scoreSub, or something, instead of using these directly
     */
    get: function (path, options) {
        if (!isUndefined(options) && !$.isEmptyObject(options)) {
            path = this._addParamsToURL(path, options);
        }
        return this._call("GET", path);
    },

    post: function (path, data) {
        return this._call("POST", path, data);
    },

    put: function (path, data) {
        var fn = this._call;
        if (this._shouldTunnel) {
            fn = this._tunnelRequestToPOST;
        }
        return fn.call(this, "PUT", path, data);
    },

    delete_: function (path) {
        var fn = this._call;
        if (this._shouldTunnel) {
            fn = this._tunnelRequestToPOST;
        }
        return fn.call(this, "DELETE", path, null);
    },

    _tunnelRequestToPOST: function (method, path, data) {
        var wrappedData = {
            _tunnel_method: method,
            _tunnel_data: data
        };
        return this._call("POST", path, wrappedData);
    },


    setCookie: function (name, value, options) {
        value = JSON.stringify(value);
        return $.cookie(this._prefixCookie(name), value, options);
    },

    getCookie: function (name) {
        var value = $.cookie(this._prefixCookie(name));
        if (!isUndefined(value)) {
            value = JSON.parse(value);
        }
        return value;
    },

    removeCookie: function (name) {
        return $.removeCookie(this._prefixCookie(name), this._commonCookieOpts);
    },

    _prefixCookie: function (name) {
        var prefix = "loom-";
        var fullName = prefix + name;
        return fullName;
    },

    _loginHandler: function (data) {
        this.loggedIn = true;
        this.username = data.username;
        this.userToken = data.api_token;

        $.cookie("THDLSS_id", data.id_cookie, this._commonCookieOpts);
        $.cookie("THDLSS_uuid", data.uuid_cookie, this._commonCookieOpts);

        this.setCookie("login", {
            username: this.username,
            userToken: this.userToken
        }, this._commonCookieOpts);

        return LoomModel.fromResolvedObject(UserModel, this, data);
    },

    _addParamsToURL: function (url, params) {
        var qs = $.param(params);

        var fullUrl = url;
        if (url.indexOf("?") > -1) {
            fullUrl += qs;
        } else {
            fullUrl += "?" + qs;
        }
        return fullUrl;
    },

    _augmentHeadersWithAuth: function (method, path, headers, data, token,
                secret, username, userToken) {

        var nowDateHeader = new Date().toUTCString();
        var date = headers.Date || nowDateHeader;

        var contentMD5 = CryptoJS.MD5(data || "").toString(CryptoJS.enc.Base64);

        var toSign = method + "\n" + contentMD5 + "\n" + date + "\n" + path;
        var signature = CryptoJS.HmacSHA256(toSign, secret).toString(CryptoJS.enc.Base64);

        headers["Content-MD5"] = contentMD5;
        headers["X-Date"] = date;
        headers["X-Authorization"] = "Threadless " + JSON.stringify({
            token: token,
            signature: signature,
            username: username,
            user_token: userToken
        });

        return headers;
    },
    
    _call: function (method, path, data) {
        path = fullURLToPath(path);

        var pathToSign = path;
        if (this._shouldTunnel) {
            pathToSign = path.replace(/\/loom/, "");
        }

        if (!isUndefined(data)) {
            data = JSON.stringify(data);
        }

        var headers = {
            "Content-Type": "application/json"
        };
        if (this._shouldTunnel) {
            headers["X-IE-Tunnelling"] = "1";
        }
        this._augmentHeadersWithAuth(method, pathToSign, headers, data,
                this.token, this.secret, this.username, this.userToken);


        var endpoint = joinURLToPath(this._apiUrl, path);

        var ajaxOpts = {
            type: method,
            data: data,
            headers: headers,
            cache: false
        };

        var promise = $.ajax(endpoint, ajaxOpts);
        
        var loomSelf = this;
        promise.fail(function (data) {
            if (data.responseJSON && data.responseJSON.error_code === 1 && loomSelf.badSyncCallback) {
                return loomSelf.badSyncCallback(loomSelf);
            }
        });
        
        return promise;
    }
};


Loom.$ = $;

Loom.GiraffeImage = GiraffeImage;

return Loom;

})(ourJQuery);

return Loom;

})();