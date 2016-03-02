var BaynoteJSVersion="$Revision$",BaynoteIgnored=!1,BN_READY_SIGNAL="ReadySignal",Strategy={ScriptDOMInject:2,OnLoadInject:3};if("undefined"==typeof baynote_globals)var baynote_globals={};baynote_globals.CommonResourceURL="/baynote/tags3/common";baynote_globals.CommonResourceID="Common";baynote_globals.PolicyResourceID="Policy";baynote_globals.CustomerStatus="/baynote/customerstatus2";baynote_globals.CommonScriptId="commonScriptId";
baynote_globals.DefaultInjectStrategy="undefined"!=typeof baynote_inject_strategy?baynote_inject_strategy:Strategy.ScriptDOMInject;baynote_globals.ServerTimeout="undefined"!=typeof baynote_server_timeout?baynote_server_timeout:void 0;baynote_globals.UseWindowName="undefined"!=typeof baynote_use_window_name?baynote_use_window_name:!1;baynote_globals.waitForReady=!1;baynote_globals.checkStatus=!1;baynote_globals.keepTrail=!1;baynote_globals.trailLength=5;bnIsOpera=0<=navigator.userAgent.indexOf("Opera");
bnIsSafari=0<=navigator.userAgent.indexOf("AppleWebKit");bnIsKonqueror=0<=navigator.userAgent.indexOf("Konqueror");bnIsKHTML=bnIsSafari||bnIsKonqueror||0<=navigator.userAgent.indexOf("KHTML");bnIsIE=0<=navigator.userAgent.indexOf("compatible")&&0<=navigator.userAgent.indexOf("MSIE")&&!bnIsOpera;bnIsMozilla=0<=navigator.userAgent.indexOf("Gecko")&&!bnIsKHTML;function BNLog(){this.timeBase=(new Date).getTime();this.lines=[];this.lastLine="";this.repCount=0}
BNLog.prototype.log=function(a){if(a==this.lastLine)++this.repCount;else{0<this.repCount&&this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+(1<this.repCount?"S":""));this.lastLine=a;this.repCount=0;var b=(new Date).getTime()-this.timeBase;this.lines.push(b+": "+a)}};BNLog.prototype.toString=function(){0<this.repCount&&(this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+(1<this.repCount?"S":"")),this.lastLine="",this.repCount=0);return this.lines.join("\n")};
if("undefined"==typeof bnLog)var bnLog=new BNLog;function BNCriticalSectionQueue(){this.waitList={};this.lastId=0}BNCriticalSectionQueue.prototype.issueId=function(){return++this.lastId};BNCriticalSectionQueue.prototype.enqueue=function(a,b){this.waitList[a]=b};BNCriticalSectionQueue.prototype.getWaiter=function(a){return null==a?null:this.waitList[a]};BNCriticalSectionQueue.prototype.firstWaiter=function(){return this.getWaiter(this.nextWaiterKeyAfter(null))};
BNCriticalSectionQueue.prototype.nextWaiterAfter=function(a){return this.getWaiter(this.nextWaiterKeyAfter(a))};BNCriticalSectionQueue.prototype.nextWaiterKeyAfter=function(a){for(var b in this.waitList)if("object"==typeof this.waitList[b]){if(null==a)return b;a==b&&(a=null)}return null};BNCriticalSectionQueue.prototype.nextPredecessor=function(a,b){for(var c=b;null!=c;c=this.nextWaiterAfter(c.id))if(c.enter||0!=c.number&&(c.number<a.number||c.number==a.number&&c.id<a.id))return c;return null};
function BNCriticalSection(a){this.csQueue=a;this.debug=1}BNCriticalSection.prototype.enter=function(a){this.enterFunc=a;this.id=this.csQueue.issueId();this.csQueue.enqueue(this.id,this);this.enter=!0;this.number=(new Date).getTime();this.enter=!1;this.attempt(this.csQueue.firstWaiter())};BNCriticalSection.prototype.leave=function(){this.debug&&bnLog.log("LEAVE "+this.id);this.number=0};
BNCriticalSection.prototype.attempt=function(a){var b=this.csQueue.nextPredecessor(this,a);if(null!=b){this.debug&&bnLog.log("WAIT "+this.id);var c=this;return setTimeout(function(){c.attempt(b)},50)}this.debug&&bnLog.log("ENTER "+this.id);this.enterFunc()};function BNResourceManager(a){this.csQueue=new BNCriticalSectionQueue;this.critSec=null;this.debug=1;this.resources={};this.waiting={};this.onloadInjected=!1;this.strategy="undefined"!=typeof a?a:Strategy.ScriptDOMInject}
BNResourceManager.prototype.getResource=function(a){return this.resources[a]};BNResourceManager.prototype.loadResource=function(a,b,c,d,f){if("undefined"==typeof this.resources[a]){this.resources[a]=null;var e=new BNCriticalSection(this.csQueue);e.enter(function(){bnResourceManager.inject(a,b,c,e,d,f)})}};
BNResourceManager.prototype.inject=function(a,b,c,d,f,e){this.critSec=d;this.debug&&bnLog.log("INJECT "+this.critSec.id+" ("+a+")");"undefined"!=typeof c&&"script"!=c&&"img"!=c?bnLog.log("Unexpected resource type to loadResource: "+c):this.defaultInject(a,b,c,f,e)};
BNResourceManager.prototype.defaultInject=function(a,b,c,d,f){if(!BaynoteIgnored)if(!c||"script"==c)this.strategy!=Strategy.OnLoadInject||a!=baynote_globals.CommonResourceID&&a!=baynote_globals.PolicyResourceID||this.onloadInjected?this.injectHandler(a,b,d,f):(c=function(){bnResourceManager.injectHandler(a,b,d,f)},window.addEventListener?window.addEventListener("load",c,!1):window.attachEvent?window.attachEvent("onload",c):window.onload=c,this.onloadInjected=!0);else if("img"==c){var e=document.createElement("IMG");
c=function(){bnResourceManager.registerAndAddResource(a,e)};e.addEventListener?e.addEventListener("load",c,!1):e.attachEvent?e.attachEvent("onload",c):e.onload=c;e.src=b;e.style.display="none";var g=document.getElementsByTagName("body")[0];setTimeout(function(){null!=g&&g.appendChild(e)},5)}};
BNResourceManager.prototype.injectHandler=function(a,b,c,d,f){if(!this.resources[a])if("undefined"!=typeof f)f.src="","function"==typeof d&&d(),BaynoteIgnored=!0,bnLog.log("FATAL: Treating Baynote as down. Resource '"+a+"' took more than "+c+" mSec");else{var e=document.createElement("script");setTimeout(function(){var a=document.getElementsByTagName("head");e.language="javascript";e.src=b;a[0].appendChild(e)},50);if(void 0===c||null===c)c=baynote_globals.ServerTimeout;"undefined"!=typeof c&&setTimeout(function(){bnResourceManager.injectHandler(a,
b,c,d,e)},c)}};BNResourceManager.prototype.waitForResource=function(a,b,c,d,f,e){with(this)if(getResource(a))this.runCallback(b);else{"undefined"==typeof waiting[a]&&(waiting[a]=[]);var g=waiting[a];g[g.length]=b;c&&this.loadResource(a,c,d,f,e)}};BNResourceManager.prototype.wakeUpWaiting=function(a){with(this){var b=waiting[a];if(!b)return;for(var c=0;c<b.length;c++)if(b[c]){var d=b[c];b[c]=null;this.debug&&d&&bnLog.log("CALLBACK "+a+": "+d);this.runCallback(d)}}};
BNResourceManager.prototype.registerAndAddResource=function(a,b){this.debug&&bnLog.log("REGISTER "+(this.critSec?this.critSec.id:"")+" ("+a+")");this.resources[a]=b;this.wakeUpWaiting(a);this.critSec&&this.critSec.leave();setTimeout("bnResourceManager.wakeUpWaiting('"+a+"')",5E3)};BNResourceManager.prototype.registerResource=function(a){this.registerAndAddResource(a,!0)};BNResourceManager.prototype.removeResource=function(a){this.resources[a]=null;delete this.resources[a]};
BNResourceManager.prototype.runCallback=function(a){"function"==typeof a?a():alert("Invalid callback, type\x3d"+typeof a)};if("undefined"==typeof bnResourceManager)var bnResourceManager=new BNResourceManager(baynote_globals.DefaultInjectStrategy);function BNSystem(){this.testServer=null}BNSystem.prototype.getCookieValue=function(a,b){b||(b=baynote_globals.cookieSubDomain);b&&(a+="-"+b);return RegExp("(?:; )?"+a+"\x3d([^;]*);?").test(document.cookie)?decodeURIComponent(RegExp.$1):null};
BNSystem.prototype.setCookie=function(a,b,c,d,f,e){b=encodeURIComponent(b);"NEVER"==d?(d=new Date,d.setFullYear(d.getFullYear()+500),d=d.toGMTString()):"SESSION"==d&&(d="");""!=c&&(c=";Path\x3d"+c);""!=d&&(d=";expires\x3d"+d);f||(f=baynote_globals.cookieDomain?baynote_globals.cookieDomain:"");""!=f&&(f=";domain\x3d"+f);e||(e=baynote_globals.cookieSubDomain);e&&(a+="-"+e);a=a+"\x3d"+b+d+c+f;if(4096<a.length)return!1;document.cookie=a;return!0};
BNSystem.prototype.removeCookie=function(a,b){this.setCookie(a,"","/","Mon, 1 Jan 1990 00:00:00",b)};BNSystem.prototype.getURLParam=function(a,b){b||(b=window.location.href);var c=RegExp("[\\?\x26]"+a+"\x3d([^\x26#]*)").exec(b);return c?c[1]:null};BNSystem.prototype.getTestServer=function(){if(null!=this.testServer)return this.testServer;var a=this.getCookieValue("bn_test");a||(a="");return this.testServer=a};if("undefined"==typeof bnSystem)var bnSystem=new BNSystem;
function BNTag(a){a?(this.id=a.id+1,this.server=a.server,this.customerId=a.customerId,this.code=a.code):this.id=0;this.attrs={};this.docAttrs={};this.css={}}BNTag.prototype.getCommonResourceId=function(){return baynote_globals.CommonResourceID};BNTag.prototype.getCommonResourceAddress=function(a){var b="?",c;for(c in a)"server"!=c&&(b+=c+"\x3d"+encodeURIComponent(a[c])+"\x26");a=b.substring(0,b.length-1);return this.server+baynote_globals.CommonResourceURL+a};
BNTag.prototype.getFailsafeResourceId=function(){return"Failsafe"};BNTag.prototype.getFailsafeResourceAddress=function(){var a=BaynoteJSVersion.split(" ")[1],b=bnSystem.getCookieValue("bn_u");return this.server+baynote_globals.CustomerStatus+"?customerId\x3d"+this.customerId+"\x26code\x3d"+this.code+"\x26v\x3d"+a+"\x26u\x3d"+b};BNTag.prototype.getParam=function(a,b){var c=this[a];return"undefined"==typeof c||null==c?b:c};if("undefined"==typeof baynote_tag){window.bn_tags=[];var baynote_tag=new BNTag(null)}
function bnReadySignal(){bnResourceManager.registerResource(BN_READY_SIGNAL)}function bnCall(a,b,c){var d=bnResourceManager.getResource(a);if(!d)bnResourceManager.waitForResource(a,function(){bnCall(a,b,c)});else if("object"==typeof d){var f=d[b];"function"==typeof f&&f.call(d,c)}}
function bnWaitForCustomerStatus(a){if(bnCheckCustomerStatus())bnResourceManager.runCallback(a);else{var b=baynote_tag.getFailsafeResourceId();bnResourceManager.waitForResource(b,function(){bnWaitForCustomerStatus(a)},baynote_tag.getFailsafeResourceAddress(),"img")}}function bnCheckCustomerStatus(){var a=baynote_tag.getFailsafeResourceId();return bnResourceManager.getResource(a)?!0:!1}
var BaynoteAPI={getURLParam:function(a,b){return bnSystem.getURLParam(a,b)},init:function(a){if(a&&a.server&&a.customerId&&a.code){a.timeout||(a.timeout=baynote_globals.ServerTimeout);a.onFailure||(a.onFailure=baynote_globals.onFailure);var b=bnSystem.getTestServer();b&&(/^https?:\/\/[^/]*\.baynote\.(com|net):?\d*(\/.*)?$/.test(b)?a.server=b:bnLog.log('Ignoring invalid test server "'+b+'"'));a.server&&(baynote_tag.server=a.server);a.customerId&&(baynote_tag.customerId=a.customerId);a.code&&(baynote_tag.code=
a.code);b=baynote_tag.getCommonResourceId();bnResourceManager.getResource(b)?BaynoteIgnored||bnCommon.completePreload(a):bnResourceManager.waitForResource(b,function(){BaynoteAPI.init(a)},baynote_tag.getCommonResourceAddress(a),"script",a.timeout,a.onFailure)}else bnLog.log("ERROR: init called with insufficient arguments - needs server, customerId, code")},execute:function(a,b){var c=baynote_tag.getCommonResourceId();"undefined"==typeof bnResourceManager.getResource(c)?bnLog.log("WARN: common not loaded - exiting execute; consider calling init first"):
"undefined"==typeof bnCommon?bnResourceManager.waitForResource(c,function(){BaynoteAPI.execute(a,b)}):bnCommon.waitAndExecute(a,b)},executeAll:function(a){var b=baynote_tag.getCommonResourceId();"undefined"==typeof bnResourceManager.getResource(b)?bnLog.log("WARN: common not loaded - exiting executeAll; consider calling init first"):"undefined"==typeof bnCommon?bnResourceManager.waitForResource(b,function(){BaynoteAPI.executeAll(a)}):bnCommon.waitAndExecuteAll(a)},call:function(a,b,c,d){var f=baynote_tag.getCommonResourceId();
"undefined"==typeof bnResourceManager.getResource(f)?bnLog.log("WARN: common not loaded - exiting call; consider calling init first"):"undefined"==typeof bnCommon?bnResourceManager.waitForResource(f,function(){BaynoteAPI.call(a,b,c,d)}):bnCommon.finishCall(a,b,c,d)},isBaynoteIgnored:function(){return BaynoteIgnored},getCookieDomain:function(){var a=window.location.href,b=a.indexOf("//"),a=a.substring(b+2),b=a.indexOf("/"),a=0>b?a:a.substring(0,b),b=a.indexOf("."),a=a.substring(b+1);a;return a}};
baynote_globals.cookieDomain=BaynoteAPI.getCookieDomain();var preLoadObj={},bn_locHref=window.location.href;0==bn_locHref.indexOf("https://")?preLoadObj.server="https://jcrew-www.baynote.net":preLoadObj.server="http://jcrew-www.baynote.net";preLoadObj.customerId="jcrew";preLoadObj.code="www";BaynoteAPI.init(preLoadObj);("undefined"==typeof baynoteObserver||"boolean"!=typeof baynoteObserver||baynoteObserver)&&BaynoteAPI.execute("observer");
("undefined"==typeof baynoteGuide||"boolean"!=typeof baynoteGuide||baynoteGuide)&&BaynoteAPI.execute("recommendation");"undefined"==typeof baynoteDisableAjax||"boolean"!=typeof baynoteDisableAjax||baynoteDisableAjax||BaynoteAPI.execute("ajax");