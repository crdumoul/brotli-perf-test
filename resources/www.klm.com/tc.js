/*
 * tagContainer Generator v5
 * Copyright Tag Commander
 * http://www.tagcommander.com/
 * Generated: 2016-01-27 16:01:17 Europe/Paris
 * ---
 * Version  : 56.04
 * IDTC     : 41
 * IDS      : 395
 */
function tc_events_41(t,e,n){if(n.id=e,function(){var t="id".split("|");for(var e in t)n.hasOwnProperty(t[e])||(n[t[e]]="")}(),"WT_Code"==n.id){tC.launchTag("eWT_Code","Webtrends code","-1","395","41");var r,a,n=(tC.switchDataSource(),tC.calculateValues(n));tC.internalvars.tc_urlparams=r="?";for(var i in n)r+=i+"="+n[i]+"&";if(tC.internalvars.pixelParams=void 0===tC.internalvars.pixelParams?[]:tC.internalvars.pixelParams,void 0!==tC.internalvars.cookiesWereAccepted&&""!==tC.internalvars.useStrictCookiePolicy||(tC.internalvars.cookiesWereAccepted=void 0===tC.getCookie("cookiesWereAccepted")||""===tC.getCookie("cookiesWereAccepted")?n.cookiesWereAccepted:tC.getCookie("cookiesWereAccepted")),tC.internalvars.useStrictCookiePolicy=void 0===tC.internalvars.useStrictCookiePolicy||""===tC.internalvars.useStrictCookiePolicy?n.useStrictCookiePolicy:tC.internalvars.useStrictCookiePolicy,(void 0===n.useStrictCookiePolicy||void 0===n.cookiesWereAccepted||tC.internalvars.pixelParams.length>0)&&(void 0!==n.useStrictCookiePolicy&&void 0!==n.cookiesWereAccepted||(a=tC.tcms.WebtrendsTag.measureData(n),tc_vars.z_stay_duration&&""!=tc_vars.z_stay_duration&&(tC.internalvars.tc_urlparams+="&z_stay_duration="+tc_vars.z_stay_duration),tc_vars.z_day_before_flight&&""!=tc_vars.z_day_before_flight&&(tC.internalvars.tc_urlparams+="&z_day_before_flight="+tc_vars.z_day_before_flight),tc_vars.z_passenger&&""!=tc_vars.z_passenger&&(tC.internalvars.tc_urlparams+="&z_passenger="+tc_vars.z_passenger),"?"===tC.internalvars.tc_urlparams&&(tC.internalvars.tc_urlparams=r),tc_vars.z_perf_apisupport||tc_vars.z_perf_total||tC.internalvars.pixelParams.push(tC.internalvars.tc_urlparams)),document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase())>-1||void 0!==tC.internalvars.cookiesWereAccepted&&"true"===tC.internalvars.cookiesWereAccepted||"false"===tC.internalvars.cookiesWereAccepted&&"false"===tC.internalvars.useStrictCookiePolicy))for(var o=0;o<tC.internalvars.pixelParams.length;o++)tC.createIframe(tC.internalvars.pixelParams[o]),tC.internalvars.pixelParams.splice(o,1);if(void 0===n.useStrictCookiePolicy||void 0===n.cookiesWereAccepted)if(window._tmsQueue=window._tmsQueue||[],window._tmsQueue.push(tc_vars),function(){var t=document.createElement("img");t.src="//klm.commander1.com/s3/?tcs=395&rand="+Math.random()+"&p="+tc_vars.ti+"&pt="+tc_vars.cg_s}(),tC.extend({getPnrSalesValue:function(t){for(var e=0,n=[t.z_base_fare,t.z_booking_fee,t.z_carrier_surcharge,t.z_payment_surcharge],r=0;r<n.length;r++)void 0!==n[r]&&(e+=parseInt(n[r]));return e}}),tC.internalvars.pnrSalesValue=tC.getPnrSalesValue(tc_vars),tc_vars.pnr_sales_value=tC.internalvars.pnrSalesValue,"object"!=typeof tC.ams&&(tC.ams=[]),"undefined"!=typeof tc_vars.z_pnr_number&&"EBT7"==tc_vars.z_application&&(tC.ams.idorder=tc_vars.z_pnr_number,tC.ams.amount=tC.internalvars.pnrSalesValue,tC.ams.currency="EUR",tC.ams.additional_params="&lng="+tc_vars.z_language+"&fare="+tc_vars.z_base_fare+"&tax="+tc_vars.z_tax+"&fuel="+tc_vars.z_carrier_surcharge+"&fees="+tc_vars.z_booking_fee+"&currency=EUR&cty="+tc_vars.z_country+"&ebt=&status=&haul="+tc_vars.z_haul+"&fb="+tc_vars.z_is_FB_in_PNR+"&od="+tc_vars.z_origin+"-"+tc_vars.z_destination+"&app=EBT7&p="+tc_vars.products+"&sup="+tC.internalvars.device+"&dev="+tC.internalvars.device+"&dep_date="+tc_vars.z_departure_date+"&ret_date="+tc_vars.z_return_date+"&pay_type="+tc_vars.z_payment_type+"&tot_amt="+tc_vars.z_pnr_total_value+"&nb_pass="+tc_vars.z_passenger,tC.ams.tc_px=new Image,tC.ams.tc_px.id="tc_img__1",tC.ams.tc_px.border="0",tC.ams.tc_px.width="1",tC.ams.tc_px.height="1",tC.ams.tc_rand=Math.random(),tC.pixelTrack.add("//klm.commander1.com/o3/?tcs=395&idorder="+tC.ams.idorder+"&amount="+tC.ams.amount+"&currency="+tC.ams.currency+tC.ams.additional_params+"&rand="+tC.ams.tc_rand)),(a||n)&&(tC.tcms.pubsub.publish("tc_events_41-usabila",a?a:n),tC.tcms.pubsub.publish("tc_events_41-survey",a?a:n),tC.tcms.pubsub.publish("tc_events_41-chat",a?a:n)),-1==document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase())&&window.advmon){var s=new Object;s=tC.tcms.utils.objectAssign({},window.Webtrends),s.dcss.dcsobj_0.WT=tC.tcms.utils.objectAssign(s.dcss.dcsobj_0.WT,tc_vars),"EBT"==tc_vars.cg_n&&"Confirmation"==tc_vars.cg_s?window.advmon.monitoring("KL-02",s):window.advmon.monitoring("KL-01",s)}else"EBT"==tc_vars.cg_n&&"Confirmation"==tc_vars.cg_s?window.advmon.monitoring("AF-02",s):window.advmon.monitoring("AF-01",s)}}/* RETRO COMPATIBILITY FUNCTIONS */
if("undefined"==typeof tC&&("undefined"!=typeof document.domain&&"undefined"!=typeof document.referrer||(document=window.document),/*
    if (typeof console == 'undefined' || typeof console.log == 'undefined')
        var console = {
            log        : function() {},
            error    : function() {},
            warn    : function() {}
        };
     */
function(t,e){var n,r=t.document,a=t.location,i=(t.navigator,t.tC,t.$,Array.prototype.push,Array.prototype.slice,Array.prototype.indexOf,Object.prototype.toString),o=(Object.prototype.hasOwnProperty,String.prototype.trim,function(t,e){return new o.fn.init(t,e,n)}),s=(/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/),c=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,l={};o.fn=o.prototype={constructor:o,init:function(t,n,a){var i,l,u;if(!t)return this;if(t.nodeType)return this.context=this[0]=t,this.length=1,this;if("string"==typeof t){if(i="<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3?[null,t,null]:s.exec(t),!i||!i[1]&&n)return!n||n.tC?(n||a).find(t):this.constructor(n).find(t);if(i[1])return n=n instanceof o?n[0]:n,u=n&&n.nodeType?n.ownerDocument||n:r,t=o.parseHTML(i[1],u,!0),c.test(i[1])&&o.isPlainObject(n)&&this.attr.call(t,n,!0),o.merge(this,t);if(l=r.getElementById(i[2]),l&&l.parentNode){if(l.id!==i[2])return a.find(t);this.length=1,this[0]=l}return this.context=r,this.selector=t,this}return o.isFunction(t)?a.ready(t):(t.selector!==e&&(this.selector=t.selector,this.context=t.context),o.makeArray(t,this))},each:function(t,e){return o.each(this,t,e)},ready:function(t){
// Add the callback
//tC.ready.promise().done(fn);
//CORRECTION SF/DP ... A VALIDER PAR MG
return o.ready.promise(t),this}},o.fn.init.prototype=o.fn,o.extend=o.fn.extend=function(){var t,n,r,a,i,s,c=arguments[0]||{},l=1,u=arguments.length,d=!1;for("boolean"==typeof c&&(d=c,c=arguments[1]||{},l=2),"object"==typeof c||o.isFunction(c)||(c={}),u===l&&(c=this,--l);u>l;l++)if(null!=(t=arguments[l]))for(n in t)r=c[n],a=t[n],c!==a&&(d&&a&&(o.isPlainObject(a)||(i=o.isArray(a)))?(i?(i=!1,s=r&&o.isArray(r)?r:[]):s=r&&o.isPlainObject(r)?r:{},c[n]=o.extend(d,s,a)):a!==e&&(c[n]=a));return c},o.extend({ssl:"https:"==r.location.protocol?"https://manager.":"http://redirect395.",//UTILISE ... mais du coup par contre on se retrouve avec des redirectXXX.XXX@tagcommander.com, � nettoyer
randOrd:function(){return Math.round(Math.random())-.5},nodeNames:"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",rnocache:/<(?:script|object|embed|option|style)/i,rnoshimcache:new RegExp("<(?:"+o.nodeNames+")[\\s/>]","i"),rchecked:/checked\s*(?:[^=]|=\s*.checked.)/i,containersLaunched:{}}),o.extend({inArray:function(t,e,n){var r,a=Array.prototype.indexOf;if(e){if(a)return a.call(e,t,n);for(r=e.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in e&&e[n]===t)return n}return-1},isFunction:function(t){return"function"===o.type(t)},isArray:Array.isArray||function(t){return"array"===o.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){return!isNaN(parseFloat(t))&&isFinite(t)},type:function(t){return null==t?String(t):l[i.call(t)]||"object"},each:function(t,n,r){var a,i=0,s=t.length,c=s===e||o.isFunction(t);if(r)if(c){for(a in t)if(n.apply(t[a],r)===!1)break}else for(;s>i&&n.apply(t[i++],r)!==!1;);else if(c){for(a in t)if(n.call(t[a],a,t[a])===!1)break}else for(;s>i&&n.call(t[i],i,t[i++])!==!1;);return t},log:function(t,e){try{o.getCookie("tCdebugLib")&&console&&console[e?e:"log"](t)}catch(n){}}}),o.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(t,e){l["[object "+e+"]"]=e.toLowerCase()}),n=o(r);o.buildFragment=function(t,n,a){var i,s,c,l=t[0];
// Set context from what may come in as undefined or a jQuery collection or a node
// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
// Cloning options loses the selected state, so don't cache them
// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
// Mark cacheable and look for a hit
// Update the cache, but only store false
// unless this is a second parsing of the same content
return n=n||r,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,!(1===t.length&&"string"==typeof l&&l.length<512&&n===r&&"<"===l.charAt(0))||o.rnocache.test(l)||!o.support.checkClone&&o.rchecked.test(l)||!o.support.html5Clone&&o.rnoshimcache.test(l)||(s=!0,i=jQuery.fragments[l],c=i!==e),i||(i=n.createDocumentFragment(),o.clean(t,n,i,a),s&&(o.fragments[l]=c&&i)),{fragment:i,cacheable:s}};var u=a.hostname,d=u.split("."),p="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
//if local domain without extension or domain is one ip
d.length<2||u.match(p)?o.maindomain=u:o.maindomain=d[d.length-2]+"."+d[d.length-1],t.tC=o}(window)),tC.extend({internalvars:"undefined"!=typeof tC.internalvars?tC.internalvars:{},internalFunctions:"undefined"!=typeof tC.internalFunctions?tC.internalFunctions:{},privacyVersion:"",containerVersion:"56.04",id_container:"41",id_site:"395",generatorVersion:"1.0.0",dedup_done:"undefined"!=typeof tC.dedup_done?tC.dedup_done:!1}),tC.extend({launchTag:function(t,e,n,r,a){tC.array_launched_tags.push(e),tC.array_launched_tags_keys.push(t),tC.containersLaunched[r][a].t.push({id:t,label:e,idTpl:n}),window.postMessage('TC.EX:{"id":"'+t+'","idc":"'+a+'","idt":"'+n+'","ids":"'+r+'","lb":"'+e.replace(/"/g,'\\"')+'"}',"*")}}),void 0===tC.containersLaunched&&(tC.containersLaunched={}),void 0===tC.containersLaunched[395]&&(tC.containersLaunched[395]={}),tC.containersLaunched[395][41]={v:"56.04",t:[]},/*extends*/
/*

tC.extend({
    isReady : false,
    readyWait : 1,
    ready : function(wait) {
        if (wait === true ? --tC.readyWait : tC.isReady)
            return;
        if (!document.body)
            return setTimeout(tC.ready, 1);
        tC.isReady = true;
        if (wait !== true && --tC.readyWait > 0)
            return;
        readyList.resolveWith(document, [tC]);
        if (tC.fn.trigger)
            tC(document).trigger("ready").off("ready");
    }
});


tC.ready.promise = function(fn){
    if ( document.addEventListener ) {
        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", function(){
            document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
            fn();
        }, false );

    // If IE event model is used
    } else if ( document.attachEvent ) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                document.detachEvent( "onreadystatechange", arguments.callee );
                fn();
            }
        });

        // If IE and not an iframe
        // continually check to see if the document is ready
        if ( document.documentElement.doScroll && window == window.top ) (function(){
            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch( error ) {
                setTimeout( arguments.callee, 0 );
                return;
            }

            // and execute any waiting functions
            fn();
        })();
    }
}
 
DOMContentLoaded = function() {
    if(typeof tC.ready != 'undefined'){
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            tC.ready();
        } else if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", DOMContentLoaded);
            tC.ready();
        }
    }
};
*/
tC.extend({domReady:!1,isDOMReady:function(){if("complete"==document.readyState||"loaded"==document.readyState)return!0;if("interactive"!=document.readyState)return!1;if(!document.documentElement.doScroll)return!0;try{return document.documentElement.doScroll("left"),!0}catch(t){return!1}},waitingOnDomReadyCallBacks:tC.waitingOnDomReadyCallBacks||[],excuteOnDomReadyCallBacks:function(){for(var t=0;t<tC.waitingOnDomReadyCallBacks.length;t++)tC.waitingOnDomReadyCallBacks[t]();tC.waitingOnDomReadyCallBacks=[]},onDomReady:function(t){if(this.domReady)return void t();tC.waitingOnDomReadyCallBacks.push(t);var e=!1;/* Mozilla, Chrome, Opera */
document.addEventListener?(e=!0,document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,!1),tC.excuteOnDomReadyCallBacks()},!1)):document.attachEvent&&(e=!0,document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),tC.excuteOnDomReadyCallBacks())}),document.documentElement.doScroll&&window==window.top&&function(){if(!tC.domReady){try{document.documentElement.doScroll("left")}catch(t){return void setTimeout(arguments.callee,0)}tC.excuteOnDomReadyCallBacks()}}()),/* Other web browsers */
e||(window.onload=tC.excuteOnDomReadyCallBacks)}}),tC.isDOMReady()?tC.domReady=!0:tC.onDomReady(function(){tC.domReady=!0}),/*
 * 
 */
tC.extend({isCurrentVersion:function(){/*
         * return true :
         * - if bm is disable, 
         * - if bm is enable but the container is loaded by the bookmarklet
         * else return false
         */
var t=tC.getCookie("tc_mode_test"),e="testModeIncludeReplaceThisByTrue";/*
         * info : 'testModeIncludeReplaceThisByTrue' is replaced by "true" by the test mode include script
         */
return"1"!=t||"1"==t&&"true"==e}}),/*
 * Extension pixelTrack
 * 
 * @vars 
 */
tC.extend({pixelTrack:{add:function(t,e){t=t||0,e=e||"img",tC.onDomReady(function(){if("iframe"==e){var n=document.createElement(e);n.src=t,n.width=1,n.height=1,n.style.display="none",document.body.appendChild(n)}else{var n=new Image;n.src=t}})}}}),/*
 * Extension domain
 */
tC.extend({tc_hdoc:!1,domain:function(){this.tc_hdoc=document;try{try{this.tc_hdoc=top.document}catch(t){
//iframe with different domain/alias => get domain of the iframe
this.tc_hdoc=document}var e="undefined"!=typeof this.tc_hdoc.domain?this.tc_hdoc.domain.toLowerCase().split("."):!1,n="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";if(e.length<2||this.tc_hdoc.domain.match(n))return"";var r=e[e.length-3],a=e[e.length-2],i=e[e.length-1];return"co"==a||"com"==a?"."+r+"."+a+"."+i:"."+a+"."+i}catch(t){tC.log(["tC.domain error : ",t],"warn")}}}),tC.domain(),/*
 * Extension cookie
 * 
 * tC.setCookie(name, value, expires, path, domain, secure)
 */
tC.extend({removeCookie:function(t){
//document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
this.setCookie(t,"",-1)},setCookie:function(t,e,n,r,a,i){a||(a=tC.domain());var o=new Date;o.setTime(o.getTime()),n&&(n=1e3*n*60*60*24);var s=new Date(o.getTime()+n);document.cookie=t+"="+escape(e)+(n?";expires="+s.toGMTString():"")+(r?";path="+r:";path=/")+(a?";domain="+a:"")+(i?";secure":"")},getCookie:function(t){return(result=new RegExp("(?:^|; )"+encodeURIComponent(t)+"=([^;]*)").exec(document.cookie))?unescape(result[1]):""}}),/**
 * Extension hitCounter
 * 
 * adds the hit counter for each container
 * allows to follow the usage of this container
 * will be called once in $frequency times
 * 
 * @vars id_tagcommander,id_site,version,frequency
 */
tC.extend({/*
     * f = force le hit
     * c = className du hit img
     */
hitCounter:function(){0==Math.floor(Math.random()*parseInt(1e3))&&tC.pixelTrack.add("//manager.tagcommander.com/utils/hit.php?id=41&site=395&version=56.04&frequency=1000&position="+tC.container_position+"&rand="+Math.random())}}),tC.container_position="undefined"!=typeof tc_container_position?tc_container_position:"undefined"!=typeof tC.container_position?tC.container_position:0,tC.container_position++,"undefined"!=typeof tc_container_position&&tc_container_position++,tC.hitCounter(),/*
 * Extension script
 */
tC.extend({script:{add:function(t,e,n){var r=document.getElementsByTagName("body")[0]||document.getElementsByTagName("script")[0].parentNode,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=t,a.charset="utf-8",r?(e&&(a.addEventListener?/* normal browsers (FF, Chrome,IE9+)*/
a.addEventListener("load",function(){e()},!1):a.onreadystatechange=function(){/* old IEs (8-) */
a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,e())}),n&&"number"==typeof n&&setTimeout(function(){r&&a.parentNode&&r.removeChild(a)},n),r.insertBefore(a,r.firstChild)):tC.log("tC.script error : the element <script> or <body> is not found ! the file "+t+" is not implemented !","warn")}}}),tC.extend({addClass:function(t){var e,n,r,a,i,o,s;if(tC.isFunction(t))return this.each(function(e){jQuery(this).addClass(t.call(this,e,this.className))});if(t&&"string"==typeof t)for(e=t.split(core_rspace),n=0,r=this.length;r>n;n++)if(a=this[n],1===a.nodeType)if(a.className||1!==e.length){for(i=" "+a.className+" ",o=0,s=e.length;s>o;o++)i.indexOf(" "+e[o]+" ")<0&&(i+=e[o]+" ");a.className=jQuery.trim(i)}else a.className=t;return this},removeClass:function(t){var e,n,r,a,i,o,s;if(tC.isFunction(t))return this.each(function(e){jQuery(this).removeClass(t.call(this,e,this.className))});if(t&&"string"==typeof t||void 0===t)for(e=(t||"").split(core_rspace),o=0,s=this.length;s>o;o++)if(r=this[o],1===r.nodeType&&r.className){
// loop over each item in the removal list
for(n=(" "+r.className+" ").replace(rclass," "),a=0,i=e.length;i>a;a++)
// Remove until there is nothing to remove,
for(;n.indexOf(" "+e[a]+" ")>=0;)n=n.replace(" "+e[a]+" "," ");r.className=t?jQuery.trim(n):""}return this},toggleClass:function(t,e){var n=typeof t,r="boolean"==typeof e;return tC.isFunction(t)?this.each(function(n){tC(this).toggleClass(t.call(this,n,this.className,e),e)}):this.each(function(){if("string"===n)for(
// toggle individual class names
var a,i=0,o=jQuery(this),s=e,c=t.split(core_rspace);a=c[i++];)s=r?s:!o.hasClass(a),o[s?"addClass":"removeClass"](a);else"undefined"!==n&&"boolean"!==n||(this.className&&
// store className if set
jQuery._data(this,"__className__",this.className),
// toggle whole className
this.className=this.className||t===!1?"":jQuery._data(this,"__className__")||"")})},hasClass:function(t){for(var e=" "+t+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(rclass," ").indexOf(e)>=0)return!0;return!1}}),/*
 * Extension crypt
 */
tC.extend({crypt:function(t){for(var e,n="",r=0;r<t.length;r++){var a=t.charCodeAt(r);a>=32&&126>=a?(e=a+26,e>126&&(e=e%126+32-1),n+=String.fromCharCode(e)):n+=t.charAt(r)}return n},uncrypt:function(t){for(var e,n="",r=0;r<t.length;r++)t.charCodeAt(r)>=32&&t.charCodeAt(r)<=126?(e=t.charCodeAt(r)>=58&&t.charCodeAt(r)<=126?t.charCodeAt(r)-26:t.charCodeAt(r)-26+94+1,n+=String.fromCharCode(e)):n+=t.charAt(r);return n}}),/*
 * Extension match
 */
tC.extend({match:function(t,e,n){try{return t.match(new RegExp(e,n))}catch(r){tC.log("the tC.match error ! message : "+r.message,"data : "+t,"p : "+e,"flag : "+n,"warn")}}}),/*
 * Extension getParamURL
 */
tC.extend({getParamURL:function(t,e){if("undefined"==typeof t)return"";t=t.toLowerCase();var n=new Array;if(!e){var r="";try{"undefined"!=typeof top&&"undefined"!=typeof top.document&&(r=top.document)}catch(a){}""===r&&(r=document),e="undefined"!=typeof r.location?r.location.href:""}var i=0,o=e.indexOf("?"),s=e.indexOf("#");-1!=o?i=o:-1!=s&&(i=s);var c="";0!=i&&(c=e.substring(i+1,e.length).split("#").join("&")),c=c.replace(/%3d/g,"=");for(var l=c.split("&"),u=0;u<l.length;u++){var d=l[u].split("="),p=d.shift().toLowerCase(),f=d.join("=");n[p]=f}return"undefined"!=typeof n[t]?n[t]:""}}),/*
 * Extension deduplication
 */
/*
 * execute the dedup only if the container is the current version 
 */
tC.isCurrentVersion()&&(/*
     * execute the dedup only if : Le code de dedup n'a pas était déjà executé par un autre container
     */
"undefined"!=typeof tC.dedup_done&&tC.dedup_done!==!1||(tC.extend({dedup:{crypted:!0,LeA:!1,/* last_event_all */
LeAD:!1,/* last event all detail */
LeC:!1,/* last event click */
LeCD:!1,/* last event click detail */
LeV:!1,/* last event view */
LeVD:!1,/* last event view detail */
FeA:!1,/* first event all */
FeAD:!1,/* first event all detail */
FeC:!1,/* first event click */
FeCD:!1,/* first event click detail */
FeV:!1,/* first event view */
FeVD:!1,/* first event view detail */
AeA:[],/* any event all */
AeC:[],/* any event click */
AeV:[],/* any event view */
tc_hdoc:document,/*
             * dynamique conf
             */
brands:null,/* list des brands */
d_tags:null,/* tb rules by tags*/
//d_paying                  : null,                                 /* paying*/
tc_scompshop:null,/* tb list shoping */
tc_scomnet:null,/* tb list social */
tc_ssearchv:null,/* tb list search enginers */
tc_ssearche:null,/* tb list search enginers */
cj_max:null,/* nbs events cj max in cookie */
enable_dedup:null,/* active dedup or not */
ch_A:[],/* tb list channel enable*/
ch_C:[],/* tb list channel enable click */
ch_V:[],/* tb list channel enable view */
ch_0:null,/* tb list all channels */
detected_channel:"",/* detected channel on page*/
detected_source:"",/* detected source on page*/
tc_scookcj_name:"tc_cj_v2",tc_scookcj_path:"/",/* cookie for customer journey storage */
tc_scookcj_days:365,/* cookie for customer journey storage */
tc_dm:tC.domain(),tc_scooksda_name:"tc_sdauid",tc_scooksda_path:"/",/* cookie for direct access session management */
//scookcj_dedup             : false,                                    /* cookie for event deduplication */
/**
             * @function tC.dedup.setup()
             * @description set the dynamical vars
             * @param k the label vars
             * @param v the value vars
             * @return the this instance
             */
setup:function(t,e){return this[t]=e,this},init:function(){if(this.enable_dedup){var t=this,e="",/* Channel */
n="",/* Campaign */
r=0;t.cj=t.getCj();/*
                 * trie des channel entre les click et le view
                 * si le type du channel == v (comme view) ou a (a comme all) alors on ajoute le channel dans le tableau des view
                 * si le type du channel == c (comme click) ou a (a comme all) alors on ajoute le channel dans le tableau des click
                 * si le type du channel != 0 (desable) alors on ajoute le channel dans le tableau des enable
                 */
for(g in t.ch_0){var a=t.ch_0[g];"c"!=a.t&&"a"!=a.t||t.ch_C.push(a),"v"!=a.t&&"a"!=a.t||t.ch_V.push(a),"0"!=a.t&&"undefined"!=typeof a.l&&t.ch_A.push(a)}try{t.tc_hdoc=top.document}catch(i){}/* TRY TO GET TOP DOCUMENT IF IN IFRAME */
/*
                 * COOKIE MANAGEMENT TCID AND TCSESSION
                 */
""==tC.getCookie("TCID")&&tC.setCookie("TCID",t.rand(),365,"/","."+t.tc_dm),""==tC.getCookie("TCSESSION")&&tC.setCookie("TCSESSION",t.rand(),0,"/","."+t.tc_dm);/*
                 * Paying Channels
                 */
var o=tC.getParamURL;/*
** Channel SEA
**/
if(""!=o("WT.srch")&&o("WT.srch").match(/^1$/)){e={l:"SEA"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel SocialMedia
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^social$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^socialcampaign$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^SOCIALCAMPAIGN$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Socialcampaign$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^SocialCampaign$/)){e={l:"SocialMedia"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel Affiliation
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^affiliation$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Affiliation$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^AFFILIATION$/)){e={l:"Affiliation"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel Email
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^email$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Email$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^EMAIL$/)){e={l:"Email"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel Metasearch
**/
if(""!=o("wt.tsrc")&&o("wt.tsrc").match(/^metasearch$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Metasearch$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^METASEARCH$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^MetaSearch$/)){e={l:"Metasearch"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel Display
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^display$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Display$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^DISPLAY$/)){e={l:"Display"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel Offline
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^offline$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Offline$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^OFFLINE$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^OffLine$/)){e={l:"Offline"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel Localchannels
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^localchannels$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Localchannels$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^LocalChannels$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^LOCALCHANNELS$/)){e={l:"Localchannels"};var s=o("WT.mc_id");""!=s&&(n=void 0!=s.split("_")[3]?s.split("_")[3]:"")}/*
** Channel MultiChannelRetargeting
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^MCR$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^mcr$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Mrc$/)){e={l:"MultiChannelRetargeting"};var s=o("WT.mc_id");n=s}/*
** Channel Mobile
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Mobile$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^mobile$/)){e={l:"Mobile"};var s=o("")}/*
** Channel Video
**/
if(""!=o("WT.tsrc")&&o("WT.tsrc").match(/^Video$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^video$/)||""!=o("WT.tsrc")&&o("WT.tsrc").match(/^VIDEO$/)){e={l:"Video"};var s=o("")}/*
                 * GET NATURAL SOURCE
                 * ONLY SEARCH FOR NATURAL IF PAYING NOT FOUND
                 */
if(/*
                 * verif si nos channel paying match afin de seter le cj
                 * channel.g == group_rules
                 */
/*for(var key_channel in s.ch_A){
                    var channel = s.ch_A[key_channel];
                    if(channel.id > 0 && channel.g){
                        var groups_rules = channel.g;
                        for(var key_groups_rules in group_rules){
                            var rules           = group_rules.r,
                                source          = group_rules.s,
                                group_source    = group_rules.g;
    
                            switch(source){
                                case 'split':
                                    var spliting_opt_with           = group_rules.w,                            //with
                                        spliting_opt_block_number   = group_rules.n                             //number
                                break;
                                case 'substr':
                                    var substr_opt_from_character   = group_rules.f,                            //from
                                        substr_opt_to               = group_rules.t;                            //to
                                break;
                            }
    
                            // TODO ::  continuer et faire les test pour matcher le channel
    
    
                        }
                    }
                }*/
"undefined"!=typeof e.l&&(e=e.l),/*
                 * HIT GENERATION 
                 */
"undefined"!=typeof e&&null!=e&&""!=e&&(r=1),"undefined"!=typeof n&&null!=n&&""!=n&&(r=1),!r){var c=t.meta_origin(t.tc_hdoc.referrer);c&&(e=c.split("@@@")[0],n=c.split("@@@")[1])}/*
                 * set cookie
                 * /!\ si la le cookie redirect est initialisé à 1 on ne refait pas le settage cookie car la redirection la deja fait par le redirect php /!\
                 */
if("1"!=tC.dedup.redirect){if(e){var l=e+"@@@"+n+"@@@"+(new Date).getTime()+"@@@C",//ALWAYS CLICK IN THIS CASE !
u=t.cj;/*
                         * si le channel,la source et le type sont identique au dernier event, on supprime le dernier event pour le remplacer
                         * par le nouveaux afin de ne pas avoir de doublon
                         */
if(u.length>0){var d=u[u.length-1],p=d.split("@@@"),f="undefined"!=typeof p[0]?p[0]:"",_="undefined"!=typeof p[1]?p[1]:"",m="undefined"!=typeof p[3]?p[3].replace("CLICK","C"):"";f==e&&_==n&&"C"==m&&t.cj.pop()}t.setCj(l),
//AJOUT DU HIT POUR COOKISAGE SUR DOMAINE TIERS
-1!=="klm.commander1.com".indexOf("commander1.com")&&tC.pixelTrack.add("//klm.commander1.com/dc3/?chn="+e+"&src="+n+"&type=C&limit="+tC.dedup.cj_max+"&rand="+Math.random(),"img"),
//Local touch backup
tC.dedup.detected_channel=e,tC.dedup.detected_source=n}}else tC.setCookie("TCREDIRECT","0",0,"/",tC.domain());/* type du last event, pour gestion du Click over View */
for(var v=t.cj,h="",g=v.length-1;g>=0;g--){var C=v[g].split("@@@");if(4!=C.length);else{var y=C[0],/* channel label */
b=C[1],/* source */
w=t.age(C[2]),/* event age in day */
w=""==w?!1:w,k=C[3].replace("VIEW","V").replace("CLICK","C"),z=(t.getChannel({l:y,t:"A"}),t.getChannel({l:y,t:"C"})),T=t.getChannel({l:y,t:"V"});(z||T)&&w!==!1&&(
//tC.log(['C',event_age,channel_label, parseFloat(event_age),'<=', parseFloat(channel_data_C.a), parseFloat(event_age) <= parseFloat(channel_data_C.a)]);
0!=z&&"C"==k&&parseFloat(w)<=parseFloat(z.a)&&(t.LeC||(t.LeC=y,t.LeCD=b),t.FeC=y,t.FeCD=b,t.AeC.push({c:y,d:b}),t.LeA&&"V"!=h||(t.LeA=y,t.LeAD=b,h="C"),t.FeA=y,t.FeAD=b,t.AeA.push({c:y,d:b})),
//tC.log(['V',event_age,channel_label, parseFloat(event_age),'<=', parseFloat(channel_data_C.b), parseFloat(event_age) <= parseFloat(channel_data_C.b)]);
0!=T&&"V"==k&&parseFloat(w)<=parseFloat(T.b)&&(t.LeV||(t.LeV=y,t.LeVD=b),t.FeV=y,t.FeVD=b,t.AeV.push({c:y,d:b}),t.LeA||(t.LeA=y,t.LeAD=b,h="V"),t.FeA=y,t.FeAD=b,t.AeA.push({c:y,d:b})))}}}},/**
             * @function tC.dedup.getChannel()
             * @description get the data channel if is found on channel list
             * @param d (object){
             *  i|l  id or label
             *  t [C|V|A] //click view all
             * }
             * @return data channel if is found or false
             */
getChannel:function(t){/*tC.log(['getChannel',d]);*/
var e,n=t.t,r=tC.dedup;e="C"==n||"click"==n?r.ch_C:"V"==n||"view"==n?r.ch_V:"A"==n||"all"==n?r.ch_A:r.ch_0,"undefined"!=typeof t.l&&(t.l=t.l.replace("DIRECT_ACCESS","Direct Access").replace("EXTERNAL_LINK","External links"),"COM"==t.l&&(t.l="Community websites"),"CSS"==t.l&&(t.l="Comparison shopping services"),"BRAND"==t.l&&(t.l="Brand"));for(var a in e)if("undefined"!=typeof t.i&&parseInt(t.i)==parseInt(e[a].i)||"undefined"!=typeof t.l&&"undefined"!=typeof e[a].l&&t.l.toLowerCase()==e[a].l.toLowerCase())/*tC.log([d.i,channels_list[k].i]);*/
return e[a];return!1},/**
             * @function tC.dedup.rand()
             * @description get a random number
             * @return int
             */
rand:function(){var t=new Date;return""+t.getYear()+(t.getMonth()+1)+t.getDay()+t.getHours()+t.getMinutes()+t.getSeconds()+parseInt(12345678942*Math.random())},/**
             * @function tC.dedup.getCj()
             * @description set cookie customer journey
             * @param value (string) 
             * @return mixed
             */
getCj:function(){var t=this.crypted?tC.uncrypt(tC.getCookie(this.tc_scookcj_name)):tC.getCookie(this.tc_scookcj_name);return""==t?[]:t.split("|||")},/**
             * @function tC.dedup.setCj()
             * @description set cookie customer journey in queue event cj list and limit this max events list
             * @param data (string|array)
             */
setCj:function(t){var e=this.cj;if(tC.isArray(t))for(var n in t)e.push(t[n]);else e.push(t);for(;e.length>this.cj_max;)e.shift();this.cj=e,tC.setCookie(this.tc_scookcj_name,this.crypted?tC.crypt(e.join("|||")):e.join("|||"),this.tc_scookcj_days,this.tc_scookcj_path,this.tc_dm)},/**
             * @function tC.dedup.removeCj()
             * @description vide le cokie cutomer journee
             */
removeCj:function(){tC.setCookie(this.tc_scookcj_name,"",0,this.tc_scookcj_path,this.tc_dm)},/**
             * @function tC.dedup.match()
             * @description Cette fonction va tester selon le match_type si la source value match avec value
             * @param match_type (string) type de test (equals|different|contains|notcontains|ignored) 
             * @param source_value (string)
             * @param value (string)
             * @return boleen
             */
match:function(t,e,n){if(!t||"ignored"==t||""==n)return!0;switch(t){case"equals":if(n==e)return!0;break;case"different":if(n!=e)return!0;break;case"contains":if(tC.match(n,e))return!0;break;case"notcontains":if(!tC.match(n,e))return!0;break;default:return!0}return!1},/**
             * @function tC.dedup.contains_channel()
             * @description Cette fonction va tester dans tous les events si ils y en a un qui match avec channel_name et avec la source
             * @param d (object){
             *  c   (string)            // channel_name : le nom du channeml
             *  e   (object)            // events : liste des events
             *  m   (string)            // match_type : type de match requis (equals|different|contains|notcontains|ignored)
             *  s   (string)            // source_value : la valeur de la source
             * }
             * @return boleen
             */
contains_channel:function(t){//tC.log(['dedup.contains_channel',d]);
/*tC.log(['contains_channel',d]);*/
for(var e in t.e){var n=t.e[e];if("object"==typeof n&&"undefined"!=typeof n.c&&"undefined"!=typeof t.c&&n.c.toLowerCase()==t.c.toLowerCase()&&this.match(t.m,t.s,n.d))return!0}return!1},ValidRules:function(id_tag){/*
                 * on cherche si on a des rules attaché à ce tag
                 */
var rules="undefined"!=typeof this.d_tags[id_tag]?this.d_tags[id_tag]:!1,valid_rules=!0,self=this;/*
                 * si le tag ne contient de rules alors c'est qu'il est valid
                 */
if(!rules)return!0;/*
                 * si le tag a des rules, on les test
                 */
state_rules_string="";for(var tab_length=rules.length,i=0;tab_length>i;i++){var rule=rules[i];if("object"==typeof rule){var res=self.test(rule);0==i?state_rules_string+=res:state_rules_string+=" "+rule.x+" "+res}}return eval(state_rules_string.replace(/and/g,"&&").replace(/or/g,"||"))},/**
             * @function tC.dedup.test()
             * @description Cette fonction verifie si notre channel est contenu dans une list d'event touch point
             * @param data (object) {
             *      t   (string) (all|click|view)                                                   // touch_type :: type d'event
             *      w   (string) (any|last|first)                                                   // what_events :: on what events
             *      c   (array)                                                                     // channel_ids :: id des channel
             *      m   (string) (equals|different|contains|notcontains|ignored)                    // match_type :: type de match requis
             *      s   (string)                                                                    // source_value :: value of source
             *      f   (booleen)                                                                   // from_channel :: from channel or not
             *      d   (json object)                                                               // data tag
             *      x   (string)                                                                    // conditioon type or , and
             * }
             * @return boleen
             */
test:function(t){var e=this,n=channel_found_in_cj=[],r=t.t.toLowerCase(),a=t.w,i=t.m,o=t.s,s=t.f,c=("undefined"!=typeof t.d?t.d:!1,t.c);/*
                 * on recupe les events.
                 * dans la cas ou on veut test le last ou le first event, on ajout celui-ci dans un tableau
                 * pour que celui-ci soit tester dans la fonction contains_channel
                 */
"all"==r?"any"==a?n=e.AeA:"last"==a?n=e.LeA?[{c:e.LeA,d:e.LeAD}]:[]:"first"==a&&(n=e.FeA?[{c:e.FeA,d:e.FeAD}]:[]):"click"==r?"any"==a?n=e.AeC:"last"==a?n=e.LeC?[{c:e.LeC,d:e.LeCD}]:[]:"first"==a&&(n=e.FeC?[{c:e.FeC,d:e.FeCD}]:[]):"view"==r&&("any"==a?n=e.AeV:"last"==a?n=e.LeV?[{c:e.LeV,d:e.LeVD}]:[]:"first"==a&&(n=e.FeV?[{c:e.FeV,d:e.FeVD}]:[]));/*
                 * on vérifie la presence des channels dans le cj
                 */
for(var l in c)if("function"!=typeof c[l]){var u=c[l],d=e.getChannel({i:u,t:r}),p=d.l;tC.dedup.contains_channel({c:p,e:n,m:i,s:o})&&channel_found_in_cj.push(u)}/*
                 * dans le cas ou la rule precise "is not from channel", aucuns channel ne doit etre trouvé dans le cj
                 * sion la rule precise is from, donc si un seul channel et contenu dans le cj
                 */
return"1"==s&&0!=channel_found_in_cj.length||"0"==s&&0==channel_found_in_cj.length},/**
             * @function tC.dedup.age()
             * @description Cette fonction va retouner le nombre de jours entre un timestamp et le current timestamp
             * @param v (timestamp)
             * @return (int)
             */
age:function(t){/*
                 * le +100 permet de debuger le test de la fonction dans le cas ou c'est un element cj qui est unique
                 */
var e=(new Date).getTime()+100;return((e-t)/3600/24/1e3).toFixed(2)},/**
             * @function tC.dedup.meta_origin()
             * @description Cette fonction détecte les channels gratuits (SEO, DIRECT ACCESS, CSS, COM et EXTERNAL LINK)
             * @param ref (url)
             * @return (mixed)
             */
meta_origin:function(t){if("undefined"==t||!t||""==t)//if no referrer, return channel DIRECT ACCESS
return"DIRECT_ACCESS@@@";var t=t.toLowerCase(),e=this.tc_hdoc.domain.toLowerCase(),n=ref_d_s=cur_d_s="",r=this;if(""!=t){var a=t.split("/"),n=a[2];my_d_a=n.split("."),ref_d_s=my_d_a[my_d_a.length-2]}if("co"!=ref_d_s&&"com"!=ref_d_s&&"org"!=ref_d_s||(//check extension .co.** or .com.**
ref_d_s=my_d_a[my_d_a.length-3]),""!=e){var i=e.split(".");cur_d_s=i[i.length-2],"co"!=cur_d_s&&"com"!=cur_d_s&&"org"!=cur_d_s||(//check extension .co.** or .com.**
cur_d_s=i[i.length-3])}if(ref_d_s==cur_d_s)//referrer domain and local domain are equal, internal link, return false
return!1;for(var o=0;o<r.tc_ssearche.length;o++)//check search engines
if(ref_d_s==r.tc_ssearche[o]){//search engine found
var s=tC.getParamURL(r.tc_ssearchv[o],t),//get keyword from query string
s=unescape(s.toLowerCase());for(type in r.brands){//check if matches brand
var c=r.brands[type];for(kb in c){var l=c[kb];if("string"==typeof l){var l=""!=l?l.toLowerCase():!1,u="Regex"==type?new RegExp(l,"g"):!1;if(l&&("Exact word"==type&&s===l||"Contain"==type&&-1!=s.indexOf(l)||"Regex"==type&&u.test(s)))return"BRAND@@@"+r.tc_ssearche[o]}}}return"SEO@@@"+r.tc_ssearche[o]}for(var o=0;o<r.tc_scomnet.length;o++)//check if referrer is community website
if(ref_d_s==r.tc_scomnet[o])return"COM@@@"+r.tc_scomnet[o];//matches, return COM channel
for(var o=0;o<r.tc_scompshop.length;o++)//check comparison shopping service (comparateur)
if(ref_d_s==r.tc_scompshop[o])return"CSS@@@"+r.tc_scompshop[o];//matches, return CSS channel
//matches, return CSS channel
return ref_d_s!=cur_d_s?"EXTERNAL_LINK@@@"+n:!1}}}),
//tc_redirect kept for retro compatibility. Created in click & site tracking (up to 1.4 and not on the CookiesThird version)
tC.dedup.redirect="undefined"!=typeof tc_redirect?tc_redirect:"undefined"!=typeof tC.dedup.redirect?tC.dedup.redirect:tC.getCookie("TCREDIRECT")),tC.dedup.setup("d_tags",[]).setup("ch_0",[{i:"1",l:"SEA",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"1",n:"0"}],w:"_",n:3}]},{i:"3",l:"SocialMedia",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"social",n:"0"},{c:" or ",m:"customized",a:!1,l:"socialcampaign",n:"0"},{c:" or ",m:"customized",a:!1,l:"SOCIALCAMPAIGN",n:"0"},{c:" or ",m:"customized",a:!1,l:"Socialcampaign",n:"0"},{c:" or ",m:"customized",a:!1,l:"SocialCampaign",n:"0"}],w:"_",n:3}]},{i:"5",l:"Affiliation",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"affiliation",n:"0"},{c:" or ",m:"customized",a:!1,l:"Affiliation",n:"0"},{c:" or ",m:"customized",a:!1,l:"AFFILIATION",n:"0"}],w:"_",n:3}]},{i:"7",l:"Email",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"email",n:"0"},{c:" or ",m:"customized",a:!1,l:"Email",n:"0"},{c:" or ",m:"customized",a:!1,l:"EMAIL",n:"0"}],w:"_",n:3}]},{i:"11",l:"Metasearch",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"metasearch",n:"0"},{c:" or ",m:"customized",a:!1,l:"Metasearch",n:"0"},{c:" or ",m:"customized",a:!1,l:"METASEARCH",n:"0"},{c:" or ",m:"customized",a:!1,l:"MetaSearch",n:"0"}],w:"_",n:3}]},{i:"13",l:"Display",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"display",n:"0"},{c:" or ",m:"customized",a:!1,l:"Display",n:"0"},{c:" or ",m:"customized",a:!1,l:"DISPLAY",n:"0"}],w:"_",n:3}]},{i:"17",l:"Offline",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"offline",n:"0"},{c:" or ",m:"customized",a:!1,l:"Offline",n:"0"},{c:" or ",m:"customized",a:!1,l:"OFFLINE",n:"0"},{c:" or ",m:"customized",a:!1,l:"OffLine",n:"0"}],w:"_",n:3}]},{i:"19",l:"Localchannels",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"split",r:[{c:" and ",m:"customized",a:!1,l:"localchannels",n:"0"},{c:" or ",m:"customized",a:!1,l:"Localchannels",n:"0"},{c:" or ",m:"customized",a:!1,l:"LocalChannels",n:"0"},{c:" or ",m:"customized",a:!1,l:"LOCALCHANNELS",n:"0"}],w:"_",n:3}]},{i:"21",l:"MultiChannelRetargeting",t:"c",a:"30.00",b:"0.00",g:[{g:"WT.mc_id",s:"takeall",r:[{c:" and ",m:"customized",a:!1,l:"MCR",n:"0"},{c:" or ",m:"customized",a:!1,l:"mcr",n:"0"},{c:" or ",m:"customized",a:!1,l:"Mrc",n:"0"}]}]},{i:"23",l:"Mobile",t:"c",a:"30.00",b:"0.00",g:[{g:"",s:"",r:[{c:" and ",m:"customized",a:!1,l:"Mobile",n:"0"},{c:" or ",m:"customized",a:!1,l:"mobile",n:"0"}]}]},{i:"25",l:"Video",t:"c",a:"30.00",b:"0.00",g:[{g:"",s:"",r:[{c:" and ",m:"customized",a:!1,l:"Video",n:"0"},{c:" or ",m:"customized",a:!1,l:"video",n:"0"},{c:" or ",m:"customized",a:!1,l:"VIDEO",n:"0"}]}]}]),"undefined"!=typeof tC.dedup_done&&tC.dedup_done!==!1||(tC.dedup.setup("brands",{"Exact word":["klm","kml","mkl"]}).setup("tc_scompshop",["shopping","kelkoo"]).setup("tc_scomnet",["facebook","linkedin","viadeo","trombi","myspace","orkut","habbo","xing","yammer","twitter"]).setup("tc_ssearchv",["q","p","q","query","encquery","query","q","q","query","query","qt","terms","query","q","q","rdata","qs","q","wd","qs","text","q","q","query","query","q","q","szukaj","qt","q","q","q","k","q","searchExpr","q","q","query","query","q","q","search_for","q","q","search_word","query","q","words","qt","q"]).setup("tc_ssearche",["google","yahoo","msn","aol","aol","lycos","ask","altavista","netscape","cnn","looksmart","about","mamma","alltheweb","gigablast","voila","virgilio","live","baidu","alice","yandex","najdi","aol","club-internet","mama","seznam","search","wp","onet","netsprint","google.interia","szukacz","yam","pchome","kvasir","sesam","ozu","terra","nostrum","mynet","ekolay","search.ilse","bing","daum","eniro","naver","kvasir","rambler","onetcenter","szukacs"]).setup("cj_max",10).setup("enable_dedup",tC.isCurrentVersion()).init(),tC.dedup_done=!0)),tC395_41=tC,"undefined"==typeof tc_vars)var tc_vars=[];if(function(){var t="operating_carrier|marketing_carrier|si_cs|skyteam|success|picture|payment_method|payment_method_status|tridion_eventplace|tridion_eventvalue|tridion_eventtype|event|z_base_fare|event_place|event_type|event_value|carrier|flightplan|z_PNR_number|z_tax|z_fuel_surcharge|z_fees|z_currency|z_haul|z_is_FB_in_PNR|z_country|z_language|z_trip_duration|z_origin|z_destination|z_cabin_code|z_ebt_origin|z_ebt_destination|z_ebt_departuredate|z_ebt_returndate|z_trip_type|z_widget|z_payment_method_status|z_payment_method|z_booking_fee|z_departure_day|z_departure_month|z_departure_year|z_return_day|z_return_month|z_return_year|z_stay_duration|z_day_before_flight|z_passenger|z_carrier_surcharge|pnr_sales_value|is_logged_user|z_payment_surcharge|EBT_type|origin|destination|cabin_code|widget|tx_u|error_application|sunday_rule|pos|booking_fee|day_before_flight|passenger|stay_duration|error_errorcode|departure_day|departure_month|departure_year|arrival_day|arrival_month|arrival_year|nb_adults|nb_children|nb_infants|nb_seniors|nb_students_major|nb_youth_minor|nb_youth_major|trip_type|currency|tx_e|ffp_tier_level|product_ids|haul|fare_pref|date_flexibility|typological_fares|si_n|si_x|direct_flight|mini_fare_offered|has_date_changed|sort_by|is_lowest|pnr_total_value|base_fare|tax|fuel_surcharge|fees|exchange_rate|inbound_is_mini_fare|outbound_is_mini_fare|outbound_prices|outbound_selected|outbound_flight_durations|outbound_departure_times|outbound_numbers_of_stops|inbound_prices|inbound_selected|inbound_flight_durations|inbound_departure_times|inbound_numbers_of_stops|inbound_subclass|outbound_subclass|ti|dnt|application|host|country|language|cg_n|cg_s|dcsuri|cg_s1|cg_s2|cg_s3|city|errorcode|error_errordescription|error_severity|mmb_entry|mmb_mya|mmb_login|mmb_offers|mmb_size|mmb_office|mmb_pax|mmb_flights|mmb_cabin|z_application|z_tc_version|newsletter_subscription|civility|mail|name|surname|fb_number|is_FB_in_PNR|products|is_ticket_issued|inbound_fare_basis|outbound_fare_basis|payment_type|product_prices|booking_date|booking_time|PNR_number|pax_aci|pax_ase|pax_ok|z_pnr_total_value|inboundProductSMH_Offered|outboundProductSMH_Offered|ProductSMH_Inbound|ProductSMH_Outbound|productSMH_offered|productSMH|soc_action|soc_content|login_method|login_partner|affinity_level1_2_price_difference|affinity_level1_2_result|affinity_level1_price|affinity_level2_price|os|screenid|device".split("|");for(var e in t)tc_vars.hasOwnProperty(t[e])||(tc_vars[t[e]]="")}(),/*DYNAMIC JS BLOCK 1*/
/*END DYNAMIC JS BLOCK 1*/
/*CUSTOM_JS_BLOCK1*/
tC.tcms=tC.tcms||{},function(){var t=function(){var t={},e=-1,n={publish:function(e,n){return t[e]?(setTimeout(function(){for(var r=t[e],a=r?r.length:0;a--;)r[a].func(e,n)},0),!0):!1},subscribe:function(n,r){t[n]||(t[n]=[]);var a=(++e).toString();return t[n].push({token:a,func:r}),a},unsubscribe:function(e,n){var r,a,i=function(){return e&&n&&"function"==typeof n?"topic_fn":"string"==typeof e?"token":!1}();if("topic_fn"===i){if(t[e])for(r=0,a=t[e].length;a>r;r++)if(t[e][r].func===n)return t[e].splice(r,1),e}else if("token"===i)for(var o in t)if(t[o])for(r=0,a=t[o].length;a>r;r++)if(t[o][r].token===e)return t[o].splice(r,1),e;return!1}};return n};tC.tcms.pubsub=new t}(),/**
 * Revealing Module usabilla. this creates a utility for array and object handeling.
 * @return publicAPI{[object]}
 */
function(){"use strict";/*--------------------------------------------------------------------------*/
/**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
function t(t,e,n){for(var r=(n||0)-1,a=t?t.length:0;++r<a;)if(t[r]===e)return r;return-1}/**
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {number} Returns the sort order indicator of `1` or `-1`.
   */
function e(t,e){for(var n=t.criteria,r=e.criteria,a=-1,i=n.length;++a<i;){var o=n[a],s=r[a];if(o!==s){if(o>s||"undefined"==typeof o)return 1;if(s>o||"undefined"==typeof s)return-1}}
// Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
// that causes it, under certain circumstances, to return the same value for
// `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
//
// This also ensures a stable sort in V8 and other engines.
// See http://code.google.com/p/v8/issues/detail?id=90
return t.index-e.index}/**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
function n(t){return"\\"+Oe[t]}/**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
function r(){return pe.pop()||[]}/**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
function a(t){t.length=0,pe.length<ve&&pe.push(t)}/**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
function i(t,e,n){e||(e=0),"undefined"==typeof n&&(n=t?t.length:0);for(var r=-1,a=n-e||0,i=Array(0>a?0:a);++r<a;)i[r]=t[e+r];return i}/*--------------------------------------------------------------------------*/
/**
   * Creates a `lodash` object which wraps the given value to enable intuitive
   * method chaining.
   *
   * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
   * and `unshift`
   *
   * Chaining is supported in custom builds as long as the `value` method is
   * implicitly or explicitly included in the build.
   *
   * The chainable wrapper functions are:
   * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
   * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
   * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
   * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
   * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
   * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
   * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
   * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
   * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
   * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
   * and `zip`
   *
   * The non-chainable wrapper functions are:
   * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
   * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
   * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
   * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
   * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
   * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
   * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
   * `template`, `unescape`, `uniqueId`, and `value`
   *
   * The wrapper functions `first` and `last` return wrapped values when `n` is
   * provided, otherwise they return unwrapped values.
   *
   * Explicit chaining can be enabled by using the `_.chain` method.
   *
   * @name _
   * @constructor
   * @category Chaining
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns a `lodash` instance.
   * @example
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // returns an unwrapped value
   * wrapped.reduce(function(sum, num) {
   *   return sum + num;
   * });
   * // => 6
   *
   * // returns a wrapped value
   * var squares = wrapped.map(function(num) {
   *   return num * num;
   * });
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
function o(t){return t instanceof o?t:new s(t)}/**
   * A fast path for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap in a `lodash` instance.
   * @param {boolean} chainAll A flag to enable chaining for all methods
   * @returns {Object} Returns a `lodash` instance.
   */
function s(t,e){this.__chain__=!!e,this.__wrapped__=t}/*--------------------------------------------------------------------------*/
/**
   * The base implementation of `_.bind` that creates the bound function and
   * sets its meta data.
   *
   * @private
   * @param {Array} bindData The bind data array.
   * @returns {Function} Returns the new bound function.
   */
function c(t){function e(){
// `Function#bind` spec
// http://es5.github.io/#x15.3.4.5
if(r){
// avoid `arguments` object deoptimizations by using `slice` instead
// of `Array.prototype.slice.call` and not assigning `arguments` to a
// variable as a ternary expression
var t=i(r);Ge.apply(t,arguments)}
// mimic the constructor's `return` behavior
// http://es5.github.io/#x13.2.2
if(this instanceof e){
// ensure `new bound` is an instance of `func`
var o=u(n.prototype),s=n.apply(o,t||arguments);return R(s)?s:o}return n.apply(a,t||arguments)}var n=t[0],r=t[2],a=t[4];return e}/**
   * The base implementation of `_.clone` without argument juggling or support
   * for `thisArg` binding.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep=false] Specify a deep clone.
   * @param {Function} [callback] The function to customize cloning values.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates clones with source counterparts.
   * @returns {*} Returns the cloned value.
   */
function l(t,e,n,o,s){if(n){var c=n(t);if("undefined"!=typeof c)return c}
// inspect [[Class]]
var u=R(t);if(!u)return t;var d=qe.call(t);if(!Se[d])return t;var p=an[d];switch(d){case ke:case ze:return new p(+t);case xe:case Ee:return new p(t);case De:return c=p(t.source,he.exec(t)),c.lastIndex=t.lastIndex,c}var f=cn(t);if(e){
// check for circular references and return corresponding clone
var _=!o;o||(o=r()),s||(s=r());for(var m=o.length;m--;)if(o[m]==t)return s[m];c=f?p(t.length):{}}else c=f?i(t):D({},t);
// exit for shallow clone
// add array properties assigned by `RegExp#exec`
// exit for shallow clone
// add the source value to the stack of traversed objects
// and associate it with its clone
// recursively populate clone (susceptible to call stack limits)
return f&&(Ue.call(t,"index")&&(c.index=t.index),Ue.call(t,"input")&&(c.input=t.input)),e?(o.push(t),s.push(c),(f?at:gn)(t,function(t,r){c[r]=l(t,e,n,o,s)}),_&&(a(o),a(s)),c):c}/**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} prototype The object to inherit from.
   * @returns {Object} Returns the new object.
   */
function u(t,e){return R(t)?Ke(t):{}}/**
   * The base implementation of `_.createCallback` without support for creating
   * "_.pluck" or "_.where" style callbacks.
   *
   * @private
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns a callback function.
   */
function d(t,e,n){if("function"!=typeof t)return Jt;
// exit early for no `thisArg` or already bound by `Function#bind`
if("undefined"==typeof e||!("prototype"in t))return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,a){return t.call(e,n,r,a)};case 4:return function(n,r,a,i){return t.call(e,n,r,a,i)}}return Nt(t,e)}/**
   * The base implementation of `createWrapper` that creates the wrapper and
   * sets its meta data.
   *
   * @private
   * @param {Array} bindData The bind data array.
   * @returns {Function} Returns the new function.
   */
function p(t){function e(){var t=l?s:this;if(a){var v=i(a);Ge.apply(v,arguments)}if((o||f)&&(v||(v=i(arguments)),o&&Ge.apply(v,o),f&&v.length<c))return r|=16,p([n,_?r:-4&r,v,null,s,c]);if(v||(v=arguments),d&&(n=t[m]),this instanceof e){t=u(n.prototype);var h=n.apply(t,v);return R(h)?h:t}return n.apply(t,v)}var n=t[0],r=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=1&r,d=2&r,f=4&r,_=8&r,m=n;return e}/**
   * The base implementation of `_.difference` that accepts a single array
   * of values to exclude.
   *
   * @private
   * @param {Array} array The array to process.
   * @param {Array} [values] The array of values to exclude.
   * @returns {Array} Returns a new array of filtered values.
   */
function f(t,e){for(var n=-1,r=k(),a=t?t.length:0,i=[];++n<a;){var o=t[n];r(e,o)<0&&i.push(o)}return i}/**
   * The base implementation of `_.flatten` without support for callback
   * shorthands or `thisArg` binding.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
   * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
   * @param {number} [fromIndex=0] The index to start from.
   * @returns {Array} Returns a new flattened array.
   */
function _(t,e,n,r){for(var a=(r||0)-1,i=t?t.length:0,o=[];++a<i;){var s=t[a];if(s&&"object"==typeof s&&"number"==typeof s.length&&(cn(s)||I(s))){
// recursively flatten arrays (susceptible to call stack limits)
e||(s=_(s,e,n));var c=-1,l=s.length,u=o.length;for(o.length+=l;++c<l;)o[u++]=s[c]}else n||o.push(s)}return o}/**
   * The base implementation of `_.isEqual`, without support for `thisArg` binding,
   * that allows partial "_.where" style comparisons.
   *
   * @private
   * @param {*} a The value to compare.
   * @param {*} b The other value to compare.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `a` objects.
   * @param {Array} [stackB=[]] Tracks traversed `b` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
function m(t,e,n,r){if(t===e)return 0!==t||1/t==1/e;var a=typeof t,i=typeof e;if(!(t!==t||t&&Ae[a]||e&&Ae[i]))return!1;if(null==t||null==e)return t===e;var s=qe.call(t),c=qe.call(e);if(s!=c)return!1;switch(s){case ke:case ze:return+t==+e;case xe:return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case De:case Ee:return t==String(e)}var l=s==we;if(!l){var u=t instanceof o,d=e instanceof o;if(u||d)return m(u?t.__wrapped__:t,d?e.__wrapped__:e,n,r);if(s!=Ie)return!1;var p=t.constructor,f=e.constructor;if(p!=f&&!(P(p)&&p instanceof p&&P(f)&&f instanceof f)&&"constructor"in t&&"constructor"in e)return!1}n||(n=[]),r||(r=[]);for(var _=n.length;_--;)if(n[_]==t)return r[_]==e;var v=!0,h=0;if(n.push(t),r.push(e),l){if(h=e.length,v=h==t.length)for(;h--&&(v=m(t[h],e[h],n,r)););}else hn(e,function(e,a,i){return Ue.call(i,a)?(h++,v=Ue.call(t,a)&&m(t[a],e,n,r)):void 0}),v&&hn(t,function(t,e,n){return Ue.call(n,e)?v=--h>-1:void 0});return n.pop(),r.pop(),v}/**
   * The base implementation of `_.merge` without argument juggling or support
   * for `thisArg` binding.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} [callback] The function to customize merging properties.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates values with source counterparts.
   */
function v(t,e,n,r,a){(cn(e)?at:gn)(e,function(e,i){var o,s,c=e,l=t[i];if(e&&((s=cn(e))||Cn(e))){for(
// avoid merging previously merged cyclic sources
var u=r.length;u--;)if(o=r[u]==e){l=a[u];break}if(!o){var d;n&&(c=n(l,e),(d="undefined"!=typeof c)&&(l=c)),d||(l=s?cn(l)?l:[]:Cn(l)?l:{}),
// add `source` and associated `value` to the stack of traversed objects
r.push(e),a.push(l),
// recursively merge objects and arrays (susceptible to call stack limits)
d||v(l,e,n,r,a)}}else n&&(c=n(l,e),"undefined"==typeof c&&(c=e)),"undefined"!=typeof c&&(l=c);t[i]=l})}/**
   * The base implementation of `_.random` without argument juggling or support
   * for returning floating-point numbers.
   *
   * @private
   * @param {number} min The minimum possible value.
   * @param {number} max The maximum possible value.
   * @returns {number} Returns a random number.
   */
function h(t,e){return t+Qe(rn()*(e-t+1))}/**
   * The base implementation of `_.uniq` without support for callback shorthands
   * or `thisArg` binding.
   *
   * @private
   * @param {Array} array The array to process.
   * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
   * @param {Function} [callback] The function called per iteration.
   * @returns {Array} Returns a duplicate-value-free array.
   */
function g(t,e,n){for(var r=-1,a=k(),i=t?t.length:0,o=[],s=n?[]:o;++r<i;){var c=t[r],l=n?n(c,r,t):c;(e?!r||s[s.length-1]!==l:a(s,l)<0)&&(n&&s.push(l),o.push(c))}return o}/**
   * Creates a function that aggregates a collection, creating an object composed
   * of keys generated from the results of running each element of the collection
   * through a callback. The given `setter` function sets the keys and values
   * of the composed object.
   *
   * @private
   * @param {Function} setter The setter function.
   * @returns {Function} Returns the new aggregator function.
   */
function C(t){return function(e,n,r){var a={};n=Yt(n,r,3);var i=-1,o=e?e.length:0;if("number"==typeof o)for(;++i<o;){var s=e[i];t(a,s,n(s,i,e),e)}else gn(e,function(e,r,i){t(a,e,n(e,r,i),i)});return a}}/**
   * Creates a function that, when called, either curries or invokes `func`
   * with an optional `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of method flags to compose.
   *  The bitmask may be composed of the following flags:
   *  1 - `_.bind`
   *  2 - `_.bindKey`
   *  4 - `_.curry`
   *  8 - `_.curry` (bound)
   *  16 - `_.partial`
   *  32 - `_.partialRight`
   * @param {Array} [partialArgs] An array of arguments to prepend to those
   *  provided to the new function.
   * @param {Array} [partialRightArgs] An array of arguments to append to those
   *  provided to the new function.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new function.
   */
function y(t,e,n,r,a,i){var o=2&e,s=16&e,l=32&e;if(!o&&!P(t))throw new TypeError;s&&!n.length&&(e&=-17,s=n=!1),l&&!r.length&&(e&=-33,l=r=!1);
// fast path for `_.bind`
var u=1==e||17===e?c:p;return u([t,e,n,r,a,i])}/**
   * Creates compiled iteration functions.
   *
   * @private
   * @param {...Object} [options] The compile options object(s).
   * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
   * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
   * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
   * @param {string} [options.args] A comma separated string of iteration function arguments.
   * @param {string} [options.top] Code to execute before the iteration branches.
   * @param {string} [options.loop] Code to execute in the object loop.
   * @param {string} [options.bottom] Code to execute after the iteration branches.
   * @returns {Function} Returns the compiled function.
   */
function b(){
// iterator options
je.array=je.bottom=je.loop=je.top="",je.init="iterable",je.useHas=!0;
// merge options into a template data object
for(var t,e=0;t=arguments[e];e++)for(var n in t)je[n]=t[n];var r=je.args;je.firstArg=/^[^,]+/.exec(r)[0];
// create the function factory
var a=Function("baseCreateCallback, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, stringClass, stringProto, toString","return function("+r+") {\n"+sn(je)+"\n}");
// return the compiled function
return a(d,Ue,_e,I,cn,H,je.keys,Fe,Ae,Ee,Pe,qe)}/**
   * Used by `escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
function w(t){return fn[t]}/**
   * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
   * customized, this method returns the custom method, otherwise it returns
   * the `baseIndexOf` function.
   *
   * @private
   * @returns {Function} Returns the "indexOf" function.
   */
function k(){var e=(e=o.indexOf)===zt?t:e;return e}/**
   * Checks if `value` is a native function.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
   */
function z(t){return"function"==typeof t&&Ve.test(t)}/**
   * A fallback implementation of `isPlainObject` which checks if a given value
   * is an object created by the `Object` constructor, assuming objects created
   * by the `Object` constructor have no inherited enumerable properties and that
   * there are no `Object.prototype` extensions.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   */
function T(t){var e,n;
// avoid non Object objects, `arguments` objects, and DOM elements
// avoid non Object objects, `arguments` objects, and DOM elements
// In most environments an object's own properties are iterated before
// its inherited properties. If the last iterated property is an object's
// own property then there are no inherited enumerable properties.
return t&&qe.call(t)==Ie&&(e=t.constructor,!P(e)||e instanceof e)?(hn(t,function(t,e){n=e}),"undefined"==typeof n||Ue.call(t,n)):!1}/**
   * Used by `unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} match The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
function x(t){return _n[t]}/*--------------------------------------------------------------------------*/
/**
   * Checks if `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })(1, 2, 3);
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
function I(t){return t&&"object"==typeof t&&"number"==typeof t.length&&qe.call(t)==be||!1}/*--------------------------------------------------------------------------*/
/**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources will overwrite property assignments of previous
   * sources. If a callback is provided it will be executed to produce the
   * assigned values. The callback is bound to `thisArg` and invoked with two
   * arguments; (objectValue, sourceValue).
   *
   * @static
   * @memberOf _
   * @type Function
   * @alias extend
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [source] The source objects.
   * @param {Function} [callback] The function to customize assigning values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
   * // => { 'name': 'fred', 'employer': 'slate' }
   *
   * var defaults = _.partialRight(_.assign, function(a, b) {
   *   return typeof a == 'undefined' ? b : a;
   * });
   *
   * var object = { 'name': 'barney' };
   * defaults(object, { 'name': 'fred', 'employer': 'slate' });
   * // => { 'name': 'barney', 'employer': 'slate' }
   */
function D(t){if(!t)return t;for(var e=1,n=arguments.length;n>e;e++){var r=arguments[e];if(r)for(var a in r)t[a]=r[a]}return t}/**
   * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
   * be cloned, otherwise they will be assigned by reference. If a callback
   * is provided it will be executed to produce the cloned values. If the
   * callback returns `undefined` cloning will be handled by the method instead.
   * The callback is bound to `thisArg` and invoked with one argument; (value).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep=false] Specify a deep clone.
   * @param {Function} [callback] The function to customize cloning values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the cloned value.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * var shallow = _.clone(characters);
   * shallow[0] === characters[0];
   * // => true
   *
   * var deep = _.clone(characters, true);
   * deep[0] === characters[0];
   * // => false
   *
   * _.mixin({
   *   'clone': _.partialRight(_.clone, function(value) {
   *     return _.isElement(value) ? value.cloneNode(false) : undefined;
   *   })
   * });
   *
   * var clone = _.clone(document.body);
   * clone.childNodes.length;
   * // => 0
   */
function E(t,e,n,r){
// allows working with "Collections" methods without using their `index`
// and `collection` arguments for `isDeep` and `callback`
return"boolean"!=typeof e&&null!=e&&(r=n,n=e,e=!1),l(t,e,"function"==typeof n&&d(n,r,1))}/**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties that resolve to `undefined`. Once a
   * property is set, additional defaults of the same property will be ignored.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [source] The source objects.
   * @param- {Object} [guard] Allows working with `_.reduce` without using its
   *  `key` and `object` arguments as sources.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * var object = { 'name': 'barney' };
   * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
   * // => { 'name': 'barney', 'employer': 'slate' }
   */
function S(t){if(!t)return t;for(var e=1,n=arguments.length;n>e;e++){var r=arguments[e];if(r)for(var a in r)"undefined"==typeof t[a]&&(t[a]=r[a])}return t}/**
   * Creates a sorted array of property names of all enumerable properties,
   * own and inherited, of `object` that have function values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns an array of property names that have function values.
   * @example
   *
   * _.functions(_);
   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
   */
function j(t){var e=[];return hn(t,function(t,n){P(t)&&e.push(n)}),e.sort()}/**
   * Checks if the specified property name exists as a direct property of `object`,
   * instead of an inherited property.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @param {string} key The name of the property to check.
   * @returns {boolean} Returns `true` if key is a direct property, else `false`.
   * @example
   *
   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
   * // => true
   */
function A(t,e){return t?Ue.call(t,e):!1}/**
   * Creates an object composed of the inverted keys and values of the given object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to invert.
   * @returns {Object} Returns the created inverted object.
   * @example
   *
   * _.invert({ 'first': 'fred', 'second': 'barney' });
   * // => { 'fred': 'first', 'barney': 'second' }
   */
function O(t){for(var e=-1,n=un(t),r=n.length,a={};++e<r;){var i=n[e];a[t[i]]=i}return a}/**
   * Checks if `value` is a boolean value.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
   * @example
   *
   * _.isBoolean(null);
   * // => false
   */
function L(t){return t===!0||t===!1||t&&"object"==typeof t&&qe.call(t)==ke||!1}/**
   * Checks if `value` is a date.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   */
function M(t){return t&&"object"==typeof t&&qe.call(t)==ze||!1}/**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   */
function B(t){return t&&1===t.nodeType||!1}/**
   * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
   * length of `0` and objects with no own enumerable properties are considered
   * "empty".
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Array|Object|string} value The value to inspect.
   * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({});
   * // => true
   *
   * _.isEmpty('');
   * // => true
   */
function W(t){if(!t)return!0;if(cn(t)||H(t))return!t.length;for(var e in t)if(Ue.call(t,e))return!1;return!0}/**
   * Performs a deep comparison between two values to determine if they are
   * equivalent to each other. If a callback is provided it will be executed
   * to compare values. If the callback returns `undefined` comparisons will
   * be handled by the method instead. The callback is bound to `thisArg` and
   * invoked with two arguments; (a, b).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} a The value to compare.
   * @param {*} b The other value to compare.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'name': 'fred' };
   * var copy = { 'name': 'fred' };
   *
   * object == copy;
   * // => false
   *
   * _.isEqual(object, copy);
   * // => true
   *
   * var words = ['hello', 'goodbye'];
   * var otherWords = ['hi', 'goodbye'];
   *
   * _.isEqual(words, otherWords, function(a, b) {
   *   var reGreet = /^(?:hello|hi)$/i,
   *       aGreet = _.isString(a) && reGreet.test(a),
   *       bGreet = _.isString(b) && reGreet.test(b);
   *
   *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
   * });
   * // => true
   */
function N(t,e){return m(t,e)}/**
   * Checks if `value` is, or can be coerced to, a finite number.
   *
   * Note: This is not the same as native `isFinite` which will return true for
   * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
   * @example
   *
   * _.isFinite(-101);
   * // => true
   *
   * _.isFinite('10');
   * // => true
   *
   * _.isFinite(true);
   * // => false
   *
   * _.isFinite('');
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
function F(t){return Xe(t)&&!Ze(parseFloat(t))}/**
   * Checks if `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   */
function P(t){return"function"==typeof t}/**
   * Checks if `value` is the language type of Object.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
function R(t){
// check if the value is the ECMAScript language type of Object
// http://es5.github.io/#x8
// and avoid a V8 bug
// http://code.google.com/p/v8/issues/detail?id=2291
return!(!t||!Ae[typeof t])}/**
   * Checks if `value` is `NaN`.
   *
   * Note: This is not the same as native `isNaN` which will return `true` for
   * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
function q(t){
// `NaN` as a primitive is the only value that is not equal to itself
// (perform the [[Class]] check first to avoid errors with some host objects in IE)
return $(t)&&t!=+t}/**
   * Checks if `value` is `null`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(undefined);
   * // => false
   */
function V(t){return null===t}/**
   * Checks if `value` is a number.
   *
   * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4 * 5);
   * // => true
   */
function $(t){return"number"==typeof t||t&&"object"==typeof t&&qe.call(t)==xe||!1}/**
   * Checks if `value` is a regular expression.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
   * @example
   *
   * _.isRegExp(/fred/);
   * // => true
   */
function Q(t){return t&&Ae[typeof t]&&qe.call(t)==De||!1}/**
   * Checks if `value` is a string.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
   * @example
   *
   * _.isString('fred');
   * // => true
   */
function H(t){return"string"==typeof t||t&&"object"==typeof t&&qe.call(t)==Ee||!1}/**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   */
function U(t){return"undefined"==typeof t}/**
   * Recursively merges own enumerable properties of the source object(s), that
   * don't resolve to `undefined` into the destination object. Subsequent sources
   * will overwrite property assignments of previous sources. If a callback is
   * provided it will be executed to produce the merged values of the destination
   * and source properties. If the callback returns `undefined` merging will
   * be handled by the method instead. The callback is bound to `thisArg` and
   * invoked with two arguments; (objectValue, sourceValue).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [source] The source objects.
   * @param {Function} [callback] The function to customize merging properties.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * var names = {
   *   'characters': [
   *     { 'name': 'barney' },
   *     { 'name': 'fred' }
   *   ]
   * };
   *
   * var ages = {
   *   'characters': [
   *     { 'age': 36 },
   *     { 'age': 40 }
   *   ]
   * };
   *
   * _.merge(names, ages);
   * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
   *
   * var food = {
   *   'fruits': ['apple'],
   *   'vegetables': ['beet']
   * };
   *
   * var otherFood = {
   *   'fruits': ['banana'],
   *   'vegetables': ['carrot']
   * };
   *
   * _.merge(food, otherFood, function(a, b) {
   *   return _.isArray(a) ? a.concat(b) : undefined;
   * });
   * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
   */
function G(t){var e=arguments,n=2;if(!R(t))return t;if(
// allows working with `_.reduce` and `_.reduceRight` without using
// their `index` and `collection` arguments
"number"!=typeof e[2]&&(n=e.length),n>3&&"function"==typeof e[n-2])var o=d(e[--n-1],e[n--],2);else n>2&&"function"==typeof e[n-1]&&(o=e[--n]);for(var s=i(arguments,1,n),c=-1,l=r(),u=r();++c<n;)v(t,s[c],o,l,u);return a(l),a(u),t}/**
   * Creates a shallow clone of `object` excluding the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If a callback is provided it will be executed for each
   * property of `object` omitting the properties the callback returns truey
   * for. The callback is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|...string|string[]} [callback] The properties to omit or the
   *  function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns an object without the omitted properties.
   * @example
   *
   * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
   * // => { 'name': 'fred' }
   *
   * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
   *   return typeof value == 'number';
   * });
   * // => { 'name': 'fred' }
   */
function Y(t){var e=[];hn(t,function(t,n){e.push(n)}),e=f(e,_(arguments,!0,!1,1));for(var n=-1,r=e.length,a={};++n<r;){var i=e[n];a[i]=t[i]}return a}/**
   * Creates a two dimensional array of an object's key-value pairs,
   * i.e. `[[key1, value1], [key2, value2]]`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns new array of key-value pairs.
   * @example
   *
   * _.pairs({ 'barney': 36, 'fred': 40 });
   * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
   */
function K(t){for(var e=-1,n=un(t),r=n.length,a=Array(r);++e<r;){var i=n[e];a[e]=[i,t[i]]}return a}/**
   * Creates a shallow clone of `object` composed of the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If a callback is provided it will be executed for each
   * property of `object` picking the properties the callback returns truey
   * for. The callback is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|...string|string[]} [callback] The function called per
   *  iteration or property names to pick, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns an object composed of the picked properties.
   * @example
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
   * // => { 'name': 'fred' }
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
   *   return key.charAt(0) != '_';
   * });
   * // => { 'name': 'fred' }
   */
function J(t){for(var e=-1,n=_(arguments,!0,!1,1),r=n.length,a={};++e<r;){var i=n[e];i in t&&(a[i]=t[i])}return a}/**
   * Creates an array composed of the own enumerable property values of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns an array of property values.
   * @example
   *
   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
   * // => [1, 2, 3] (property order is not guaranteed across environments)
   */
function X(t){for(var e=-1,n=un(t),r=n.length,a=Array(r);++e<r;)a[e]=t[n[e]];return a}/*--------------------------------------------------------------------------*/
/**
   * Checks if a given value is present in a collection using strict equality
   * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
   * offset from the end of the collection.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {*} target The value to check for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 1);
   * // => true
   *
   * _.contains([1, 2, 3], 1, 2);
   * // => false
   *
   * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
   * // => true
   *
   * _.contains('pebbles', 'eb');
   * // => true
   */
function Z(t,e){var n=k(),r=t?t.length:0,a=!1;return r&&"number"==typeof r?a=n(t,e)>-1:gn(t,function(t){return!(a=t===e)}),a}/**
   * Checks if the given callback returns truey value for **all** elements of
   * a collection. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {boolean} Returns `true` if all elements passed the callback check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes']);
   * // => false
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.every(characters, 'age');
   * // => true
   *
   * // using "_.where" callback shorthand
   * _.every(characters, { 'age': 36 });
   * // => false
   */
function tt(t,e,n){var r=!0;e=Yt(e,n,3);var a=-1,i=t?t.length:0;if("number"==typeof i)for(;++a<i&&(r=!!e(t[a],a,t)););else gn(t,function(t,n,a){return r=!!e(t,n,a)});return r}/**
   * Iterates over elements of a collection, returning an array of all elements
   * the callback returns truey for. The callback is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of elements that passed the callback check.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [2, 4, 6]
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'blocked': false },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.filter(characters, 'blocked');
   * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
   *
   * // using "_.where" callback shorthand
   * _.filter(characters, { 'age': 36 });
   * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
   */
function et(t,e,n){var r=[];e=Yt(e,n,3);var a=-1,i=t?t.length:0;if("number"==typeof i)for(;++a<i;){var o=t[a];e(o,a,t)&&r.push(o)}else gn(t,function(t,n,a){e(t,n,a)&&r.push(t)});return r}/**
   * Iterates over elements of a collection, returning the first element that
   * the callback returns truey for. The callback is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias detect, findWhere
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the found element, else `undefined`.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36, 'blocked': false },
   *   { 'name': 'fred',    'age': 40, 'blocked': true },
   *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
   * ];
   *
   * _.find(characters, function(chr) {
   *   return chr.age < 40;
   * });
   * // => { 'name': 'barney', 'age': 36, 'blocked': false }
   *
   * // using "_.where" callback shorthand
   * _.find(characters, { 'age': 1 });
   * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
   *
   * // using "_.pluck" callback shorthand
   * _.find(characters, 'blocked');
   * // => { 'name': 'fred', 'age': 40, 'blocked': true }
   */
function nt(t,e,n){e=Yt(e,n,3);var r=-1,a=t?t.length:0;if("number"!=typeof a){var i;return gn(t,function(t,n,r){return e(t,n,r)?(i=t,!1):void 0}),i}for(;++r<a;){var o=t[r];if(e(o,r,t))return o}}/**
   * Examines each element in a `collection`, returning the first that
   * has the given properties. When checking `properties`, this method
   * performs a deep comparison between values to determine if they are
   * equivalent to each other.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Object} properties The object of property values to filter by.
   * @returns {*} Returns the found element, else `undefined`.
   * @example
   *
   * var food = [
   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
   *   { 'name': 'banana', 'organic': true,  'type': 'fruit' },
   *   { 'name': 'beet',   'organic': false, 'type': 'vegetable' }
   * ];
   *
   * _.findWhere(food, { 'type': 'vegetable' });
   * // => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }
   */
function rt(t,e){return Ct(t,e,!0)}/**
   * Iterates over elements of a collection, executing the callback for each
   * element. The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection). Callbacks may exit iteration early by
   * explicitly returning `false`.
   *
   * Note: As with other "Collections" methods, objects with a `length` property
   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
   * may be used for object iteration.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
   * // => logs each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
   * // => logs each number and returns the object (property order is not guaranteed across environments)
   */
function at(t,e,n){var r=-1,a=t?t.length:0;if(e=e&&"undefined"==typeof n?e:d(e,n,3),"number"==typeof a)for(;++r<a&&e(t[r],r,t)!==!1;);else gn(t,e)}/**
   * This method is like `_.forEach` except that it iterates over elements
   * of a `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @alias eachRight
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
   * // => logs each number from right to left and returns '3,2,1'
   */
function it(t,e){var n=t?t.length:0;if("number"==typeof n)for(;n--&&e(t[n],n,t)!==!1;);else{var r=un(t);n=r.length,gn(t,function(t,a,i){return a=r?r[--n]:--n,e(i[a],a,i)})}}/**
   * Invokes the method named by `methodName` on each element in the `collection`
   * returning an array of the results of each invoked method. Additional arguments
   * will be provided to each invoked method. If `methodName` is a function it
   * will be invoked for, and `this` bound to, each element in the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|string} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [arg] Arguments to invoke the method with.
   * @returns {Array} Returns a new array of the results of each invoked method.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
function ot(t,e){var n=i(arguments,2),r=-1,a="function"==typeof e,o=t?t.length:0,s=Array("number"==typeof o?o:0);return at(t,function(t){s[++r]=(a?e:t[e]).apply(t,n)}),s}/**
   * Creates an array of values by running each element in the collection
   * through the callback. The callback is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of the results of each `callback` execution.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9] (property order is not guaranteed across environments)
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.map(characters, 'name');
   * // => ['barney', 'fred']
   */
function st(t,e,n){var r=-1,a=t?t.length:0;if(e=Yt(e,n,3),"number"==typeof a)for(var i=Array(a);++r<a;)i[r]=e(t[r],r,t);else i=[],gn(t,function(t,n,a){i[++r]=e(t,n,a)});return i}/**
   * Retrieves the maximum value of a collection. If the collection is empty or
   * falsey `-Infinity` is returned. If a callback is provided it will be executed
   * for each value in the collection to generate the criterion by which the value
   * is ranked. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * _.max(characters, function(chr) { return chr.age; });
   * // => { 'name': 'fred', 'age': 40 };
   *
   * // using "_.pluck" callback shorthand
   * _.max(characters, 'age');
   * // => { 'name': 'fred', 'age': 40 };
   */
function ct(t,e,n){var r=-(1/0),a=r;
// allows working with functions like `_.map` without using
// their `index` argument as a callback
"function"!=typeof e&&n&&n[e]===t&&(e=null);var i=-1,o=t?t.length:0;if(null==e&&"number"==typeof o)for(;++i<o;){var s=t[i];s>a&&(a=s)}else e=Yt(e,n,3),at(t,function(t,n,i){var o=e(t,n,i);o>r&&(r=o,a=t)});return a}/**
   * Retrieves the minimum value of a collection. If the collection is empty or
   * falsey `Infinity` is returned. If a callback is provided it will be executed
   * for each value in the collection to generate the criterion by which the value
   * is ranked. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * _.min(characters, function(chr) { return chr.age; });
   * // => { 'name': 'barney', 'age': 36 };
   *
   * // using "_.pluck" callback shorthand
   * _.min(characters, 'age');
   * // => { 'name': 'barney', 'age': 36 };
   */
function lt(t,e,n){var r=1/0,a=r;
// allows working with functions like `_.map` without using
// their `index` argument as a callback
"function"!=typeof e&&n&&n[e]===t&&(e=null);var i=-1,o=t?t.length:0;if(null==e&&"number"==typeof o)for(;++i<o;){var s=t[i];a>s&&(a=s)}else e=Yt(e,n,3),at(t,function(t,n,i){var o=e(t,n,i);r>o&&(r=o,a=t)});return a}/**
   * Reduces a collection to a value which is the accumulated result of running
   * each element in the collection through the callback, where each successive
   * callback execution consumes the return value of the previous execution. If
   * `accumulator` is not provided the first element of the collection will be
   * used as the initial `accumulator` value. The callback is bound to `thisArg`
   * and invoked with four arguments; (accumulator, value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [accumulator] Initial value of the accumulator.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(sum, num) {
   *   return sum + num;
   * });
   * // => 6
   *
   * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
   *   result[key] = num * 3;
   *   return result;
   * }, {});
   * // => { 'a': 3, 'b': 6, 'c': 9 }
   */
function ut(t,e,n,r){if(!t)return n;var a=arguments.length<3;e=Yt(e,r,4);var i=-1,o=t.length;if("number"==typeof o)for(a&&(n=t[++i]);++i<o;)n=e(n,t[i],i,t);else gn(t,function(t,r,i){n=a?(a=!1,t):e(n,t,r,i)});return n}/**
   * This method is like `_.reduce` except that it iterates over elements
   * of a `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @alias foldr
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [accumulator] Initial value of the accumulator.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * var list = [[0, 1], [2, 3], [4, 5]];
   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
function dt(t,e,n,r){var a=arguments.length<3;return e=Yt(e,r,4),it(t,function(t,r,i){n=a?(a=!1,t):e(n,t,r,i)}),n}/**
   * The opposite of `_.filter` this method returns the elements of a
   * collection that the callback does **not** return truey for.
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of elements that failed the callback check.
   * @example
   *
   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [1, 3, 5]
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'blocked': false },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.reject(characters, 'blocked');
   * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
   *
   * // using "_.where" callback shorthand
   * _.reject(characters, { 'age': 36 });
   * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
   */
function pt(t,e,n){return e=Yt(e,n,3),et(t,function(t,n,r){return!e(t,n,r)})}/**
   * Retrieves a random element or `n` random elements from a collection.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to sample.
   * @param {number} [n] The number of elements to sample.
   * @param- {Object} [guard] Allows working with functions like `_.map`
   *  without using their `index` arguments as `n`.
   * @returns {Array} Returns the random sample(s) of `collection`.
   * @example
   *
   * _.sample([1, 2, 3, 4]);
   * // => 2
   *
   * _.sample([1, 2, 3, 4], 2);
   * // => [3, 1]
   */
function ft(t,e,n){if(t&&"number"!=typeof t.length&&(t=X(t)),null==e||n)return t?t[h(0,t.length-1)]:de;var r=_t(t);return r.length=nn(en(0,e),r.length),r}/**
   * Creates an array of shuffled values, using a version of the Fisher-Yates
   * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to shuffle.
   * @returns {Array} Returns a new shuffled collection.
   * @example
   *
   * _.shuffle([1, 2, 3, 4, 5, 6]);
   * // => [4, 1, 6, 3, 5, 2]
   */
function _t(t){var e=-1,n=t?t.length:0,r=Array("number"==typeof n?n:0);return at(t,function(t){var n=h(0,++e);r[e]=r[n],r[n]=t}),r}/**
   * Gets the size of the `collection` by returning `collection.length` for arrays
   * and array-like objects or the number of own enumerable properties for objects.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to inspect.
   * @returns {number} Returns `collection.length` or number of own enumerable properties.
   * @example
   *
   * _.size([1, 2]);
   * // => 2
   *
   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
   * // => 3
   *
   * _.size('pebbles');
   * // => 7
   */
function mt(t){var e=t?t.length:0;return"number"==typeof e?e:un(t).length}/**
   * Checks if the callback returns a truey value for **any** element of a
   * collection. The function returns as soon as it finds a passing value and
   * does not iterate over the entire collection. The callback is bound to
   * `thisArg` and invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {boolean} Returns `true` if any element passed the callback check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'blocked': false },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.some(characters, 'blocked');
   * // => true
   *
   * // using "_.where" callback shorthand
   * _.some(characters, { 'age': 1 });
   * // => false
   */
function vt(t,e,n){var r;e=Yt(e,n,3);var a=-1,i=t?t.length:0;if("number"==typeof i)for(;++a<i&&!(r=e(t[a],a,t)););else gn(t,function(t,n,a){return!(r=e(t,n,a))});return!!r}/**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection through the callback. This method
   * performs a stable sort, that is, it will preserve the original sort order
   * of equal elements. The callback is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an array of property names is provided for `callback` the collection
   * will be sorted by each property value.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Array|Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of sorted elements.
   * @example
   *
   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
   * // => [3, 1, 2]
   *
   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
   * // => [3, 1, 2]
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40 },
   *   { 'name': 'barney',  'age': 26 },
   *   { 'name': 'fred',    'age': 30 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.map(_.sortBy(characters, 'age'), _.values);
   * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
   *
   * // sorting by multiple properties
   * _.map(_.sortBy(characters, ['name', 'age']), _.values);
   * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
   */
function ht(t,n,r){var a=-1,i=t?t.length:0,o=Array("number"==typeof i?i:0);for(n=Yt(n,r,3),at(t,function(t,e,r){o[++a]={criteria:[n(t,e,r)],index:a,value:t}}),i=o.length,o.sort(e);i--;)o[i]=o[i].value;return o}/**
   * Converts the `collection` to an array.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to convert.
   * @returns {Array} Returns the new converted array.
   * @example
   *
   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
   * // => [2, 3, 4]
   */
function gt(t){return cn(t)?i(t):t&&"number"==typeof t.length?st(t):X(t)}/**
   * Performs a deep comparison of each element in a `collection` to the given
   * `properties` object, returning an array of all elements that have equivalent
   * property values.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Object} props The object of property values to filter by.
   * @returns {Array} Returns a new array of elements that have the given properties.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
   *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
   * ];
   *
   * _.where(characters, { 'age': 36 });
   * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
   *
   * _.where(characters, { 'pets': ['dino'] });
   * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
   */
function Ct(t,e,n){return n&&W(e)?de:(n?nt:et)(t,e)}/*--------------------------------------------------------------------------*/
/**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are all falsey.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @returns {Array} Returns a new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
function yt(t){for(var e=-1,n=t?t.length:0,r=[];++e<n;){var a=t[e];a&&r.push(a)}return r}/**
   * Creates an array excluding all values of the provided arrays using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {...Array} [values] The arrays of values to exclude.
   * @returns {Array} Returns a new array of filtered values.
   * @example
   *
   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
   * // => [1, 3, 4]
   */
function bt(t){return f(t,_(arguments,!0,!0,1))}/**
   * Gets the first element or first `n` elements of an array. If a callback
   * is provided elements at the beginning of the array are returned as long
   * as the callback returns truey. The callback is bound to `thisArg` and
   * invoked with three arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias head, take
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Function|Object|number|string} [callback] The function called
   *  per element or the number of elements to return. If a property name or
   *  object is provided it will be used to create a "_.pluck" or "_.where"
   *  style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the first element(s) of `array`.
   * @example
   *
   * _.first([1, 2, 3]);
   * // => 1
   *
   * _.first([1, 2, 3], 2);
   * // => [1, 2]
   *
   * _.first([1, 2, 3], function(num) {
   *   return num < 3;
   * });
   * // => [1, 2]
   *
   * var characters = [
   *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
   *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
   *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.first(characters, 'blocked');
   * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
   *
   * // using "_.where" callback shorthand
   * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
   * // => ['barney', 'fred']
   */
function wt(t,e,n){var r=0,a=t?t.length:0;if("number"!=typeof e&&null!=e){var o=-1;for(e=Yt(e,n,3);++o<a&&e(t[o],o,t);)r++}else if(r=e,null==r||n)return t?t[0]:de;return i(t,0,nn(en(0,r),a))}/**
   * Flattens a nested array (the nesting can be to any depth). If `isShallow`
   * is truey, the array will only be flattened a single level. If a callback
   * is provided each element of the array is passed through the callback before
   * flattening. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to flatten.
   * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
   *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.flatten(characters, 'pets');
   * // => ['hoppy', 'baby puss', 'dino']
   */
function kt(t,e){return _(t,e)}/**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the array is already sorted
   * providing `true` for `fromIndex` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 1
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 4
   *
   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
   * // => 2
   */
function zt(e,n,r){if("number"==typeof r){var a=e?e.length:0;r=0>r?en(0,a+r):r||0}else if(r){var i=jt(e,n);return e[i]===n?i:-1}return t(e,n,r)}/**
   * Gets all but the last element or last `n` elements of an array. If a
   * callback is provided elements at the end of the array are excluded from
   * the result as long as the callback returns truey. The callback is bound
   * to `thisArg` and invoked with three arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Function|Object|number|string} [callback=1] The function called
   *  per element or the number of elements to exclude. If a property name or
   *  object is provided it will be used to create a "_.pluck" or "_.where"
   *  style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a slice of `array`.
   * @example
   *
   * _.initial([1, 2, 3]);
   * // => [1, 2]
   *
   * _.initial([1, 2, 3], 2);
   * // => [1]
   *
   * _.initial([1, 2, 3], function(num) {
   *   return num > 1;
   * });
   * // => [1]
   *
   * var characters = [
   *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
   *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
   *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.initial(characters, 'blocked');
   * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
   *
   * // using "_.where" callback shorthand
   * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
   * // => ['barney', 'fred']
   */
function Tt(t,e,n){var r=0,a=t?t.length:0;if("number"!=typeof e&&null!=e){var o=a;for(e=Yt(e,n,3);o--&&e(t[o],o,t);)r++}else r=null==e||n?1:e||r;return i(t,0,nn(en(0,a-r),a))}/**
   * Creates an array of unique values present in all provided arrays using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {...Array} [array] The arrays to inspect.
   * @returns {Array} Returns an array of shared values.
   * @example
   *
   * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
   * // => [1, 2]
   */
function xt(){for(var t=[],e=-1,n=arguments.length;++e<n;){var r=arguments[e];(cn(r)||I(r))&&t.push(r)}var a=t[0],i=-1,o=k(),s=a?a.length:0,c=[];t:for(;++i<s;)if(r=a[i],o(c,r)<0){for(var e=n;--e;)if(o(t[e],r)<0)continue t;c.push(r)}return c}/**
   * Gets the last element or last `n` elements of an array. If a callback is
   * provided elements at the end of the array are returned as long as the
   * callback returns truey. The callback is bound to `thisArg` and invoked
   * with three arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Function|Object|number|string} [callback] The function called
   *  per element or the number of elements to return. If a property name or
   *  object is provided it will be used to create a "_.pluck" or "_.where"
   *  style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the last element(s) of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   *
   * _.last([1, 2, 3], 2);
   * // => [2, 3]
   *
   * _.last([1, 2, 3], function(num) {
   *   return num > 1;
   * });
   * // => [2, 3]
   *
   * var characters = [
   *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
   *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
   *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.pluck(_.last(characters, 'blocked'), 'name');
   * // => ['fred', 'pebbles']
   *
   * // using "_.where" callback shorthand
   * _.last(characters, { 'employer': 'na' });
   * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
   */
function It(t,e,n){var r=0,a=t?t.length:0;if("number"!=typeof e&&null!=e){var o=a;for(e=Yt(e,n,3);o--&&e(t[o],o,t);)r++}else if(r=e,null==r||n)return t?t[a-1]:de;return i(t,en(0,a-r))}/**
   * Gets the index at which the last occurrence of `value` is found using strict
   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
   * as the offset from the end of the collection.
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=array.length-1] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 4
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 1
   */
function Dt(t,e,n){var r=t?t.length:0;for("number"==typeof n&&(r=(0>n?en(0,r+n):nn(n,r-1))+1);r--;)if(t[r]===e)return r;return-1}/**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to but not including `end`. If `start` is less than `stop` a
   * zero-length range is created unless a negative `step` is specified.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @param {number} [step=1] The value to increment or decrement by.
   * @returns {Array} Returns a new range array.
   * @example
   *
   * _.range(4);
   * // => [0, 1, 2, 3]
   *
   * _.range(1, 5);
   * // => [1, 2, 3, 4]
   *
   * _.range(0, 20, 5);
   * // => [0, 5, 10, 15]
   *
   * _.range(0, -4, -1);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 4, 0);
   * // => [1, 1, 1]
   *
   * _.range(0);
   * // => []
   */
function Et(t,e,n){t=+t||0,n=+n||1,null==e&&(e=t,t=0);for(
// use `Array(length)` so engines like Chakra and V8 avoid slower modes
// http://youtu.be/XAqIpGU8ZZk#t=17m25s
var r=-1,a=en(0,$e((e-t)/n)),i=Array(a);++r<a;)i[r]=t,t+=n;return i}/**
   * The opposite of `_.initial` this method gets all but the first element or
   * first `n` elements of an array. If a callback function is provided elements
   * at the beginning of the array are excluded from the result as long as the
   * callback returns truey. The callback is bound to `thisArg` and invoked
   * with three arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias drop, tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Function|Object|number|string} [callback=1] The function called
   *  per element or the number of elements to exclude. If a property name or
   *  object is provided it will be used to create a "_.pluck" or "_.where"
   *  style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a slice of `array`.
   * @example
   *
   * _.rest([1, 2, 3]);
   * // => [2, 3]
   *
   * _.rest([1, 2, 3], 2);
   * // => [3]
   *
   * _.rest([1, 2, 3], function(num) {
   *   return num < 3;
   * });
   * // => [3]
   *
   * var characters = [
   *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
   *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
   *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.pluck(_.rest(characters, 'blocked'), 'name');
   * // => ['fred', 'pebbles']
   *
   * // using "_.where" callback shorthand
   * _.rest(characters, { 'employer': 'slate' });
   * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
   */
function St(t,e,n){if("number"!=typeof e&&null!=e){var r=0,a=-1,o=t?t.length:0;for(e=Yt(e,n,3);++a<o&&e(t[a],a,t);)r++}else r=null==e||n?1:en(0,e);return i(t,r)}/**
   * Uses a binary search to determine the smallest index at which a value
   * should be inserted into a given sorted array in order to maintain the sort
   * order of the array. If a callback is provided it will be executed for
   * `value` and each element of `array` to compute their sort ranking. The
   * callback is bound to `thisArg` and invoked with one argument; (value).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([20, 30, 50], 40);
   * // => 2
   *
   * // using "_.pluck" callback shorthand
   * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
   * // => 2
   *
   * var dict = {
   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
   * };
   *
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
   *   return dict.wordToNumber[word];
   * });
   * // => 2
   *
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
   *   return this.wordToNumber[word];
   * }, dict);
   * // => 2
   */
function jt(t,e,n,r){var a=0,i=t?t.length:a;for(
// explicitly reference `identity` for better inlining in Firefox
n=n?Yt(n,r,1):Jt,e=n(e);i>a;){var o=a+i>>>1;n(t[o])<e?a=o+1:i=o}return a}/**
   * Creates an array of unique values, in order, of the provided arrays using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {...Array} [array] The arrays to inspect.
   * @returns {Array} Returns an array of combined values.
   * @example
   *
   * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
   * // => [1, 2, 3, 5, 4]
   */
function At(){return g(_(arguments,!0,!0))}/**
   * Creates a duplicate-value-free version of an array using strict equality
   * for comparisons, i.e. `===`. If the array is sorted, providing
   * `true` for `isSorted` will use a faster algorithm. If a callback is provided
   * each element of `array` is passed through the callback before uniqueness
   * is computed. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a duplicate-value-free array.
   * @example
   *
   * _.uniq([1, 2, 1, 3, 1]);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 1, 2, 2, 3], true);
   * // => [1, 2, 3]
   *
   * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
   * // => ['A', 'b', 'C']
   *
   * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
   * // => [1, 2.5, 3]
   *
   * // using "_.pluck" callback shorthand
   * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
function Ot(t,e,n,r){
// juggle arguments
return"boolean"!=typeof e&&null!=e&&(r=n,n="function"!=typeof e&&r&&r[e]===t?null:e,e=!1),null!=n&&(n=Yt(n,r,3)),g(t,e,n)}/**
   * Creates an array excluding all provided values using strict equality for
   * comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to filter.
   * @param {...*} [value] The values to exclude.
   * @returns {Array} Returns a new array of filtered values.
   * @example
   *
   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
   * // => [2, 3, 4]
   */
function Lt(t){return f(t,i(arguments,1))}/**
   * Creates an array of grouped elements, the first of which contains the first
   * elements of the given arrays, the second of which contains the second
   * elements of the given arrays, and so on.
   *
   * @static
   * @memberOf _
   * @alias unzip
   * @category Arrays
   * @param {...Array} [array] Arrays to process.
   * @returns {Array} Returns a new array of grouped elements.
   * @example
   *
   * _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   */
function Mt(){for(var t=-1,e=ct(kn(arguments,"length")),n=Array(0>e?0:e);++t<e;)n[t]=kn(arguments,t);return n}/**
   * Creates an object composed from arrays of `keys` and `values`. Provide
   * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
   * or two arrays, one of `keys` and one of corresponding `values`.
   *
   * @static
   * @memberOf _
   * @alias object
   * @category Arrays
   * @param {Array} keys The array of keys.
   * @param {Array} [values=[]] The array of values.
   * @returns {Object} Returns an object composed of the given keys and
   *  corresponding values.
   * @example
   *
   * _.zipObject(['fred', 'barney'], [30, 40]);
   * // => { 'fred': 30, 'barney': 40 }
   */
function Bt(t,e){var n=-1,r=t?t.length:0,a={};for(e||!r||cn(t[0])||(e=[]);++n<r;){var i=t[n];e?a[i]=e[n]:i&&(a[i[0]]=i[1])}return a}/*--------------------------------------------------------------------------*/
/**
   * Creates a function that executes `func`, with  the `this` binding and
   * arguments of the created function, only after being called `n` times.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {number} n The number of times the function must be called before
   *  `func` is executed.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var saves = ['profile', 'settings'];
   *
   * var done = _.after(saves.length, function() {
   *   console.log('Done saving!');
   * });
   *
   * _.forEach(saves, function(type) {
   *   asyncSave({ 'type': type, 'complete': done });
   * });
   * // => logs 'Done saving!', after all saves have completed
   */
function Wt(t,e){if(!P(e))throw new TypeError;return function(){return--t<1?e.apply(this,arguments):void 0}}/**
   * Creates a function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any additional `bind` arguments to those
   * provided to the bound function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {...*} [arg] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'fred' }, 'hi');
   * func();
   * // => 'hi fred'
   */
function Nt(t,e){return arguments.length>2?y(t,17,i(arguments,2),null,e):y(t,1,null,null,e)}/**
   * Binds methods of an object to the object itself, overwriting the existing
   * method. Method names may be specified as individual arguments or as arrays
   * of method names. If no method names are provided all the function properties
   * of `object` will be bound.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {...string} [methodName] The object method names to
   *  bind, specified as individual method names or arrays of method names.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var view = {
   *   'label': 'docs',
   *   'onClick': function() { console.log('clicked ' + this.label); }
   * };
   *
   * _.bindAll(view);
   * jQuery('#docs').on('click', view.onClick);
   * // => logs 'clicked docs', when the button is clicked
   */
function Ft(t){for(var e=arguments.length>1?_(arguments,!0,!1,1):j(t),n=-1,r=e.length;++n<r;){var a=e[n];t[a]=y(t[a],1,null,null,t)}return t}/**
   * Creates a function that is the composition of the provided functions,
   * where each function consumes the return value of the function that follows.
   * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
   * Each function is executed with the `this` binding of the composed function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {...Function} [func] Functions to compose.
   * @returns {Function} Returns the new composed function.
   * @example
   *
   * var realNameMap = {
   *   'pebbles': 'penelope'
   * };
   *
   * var format = function(name) {
   *   name = realNameMap[name.toLowerCase()] || name;
   *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
   * };
   *
   * var greet = function(formatted) {
   *   return 'Hiya ' + formatted + '!';
   * };
   *
   * var welcome = _.compose(greet, format);
   * welcome('pebbles');
   * // => 'Hiya Penelope!'
   */
function Pt(){for(var t=arguments,e=t.length;e--;)if(!P(t[e]))throw new TypeError;return function(){for(var e=arguments,n=t.length;n--;)e=[t[n].apply(this,e)];return e[0]}}/**
   * Creates a function that will delay the execution of `func` until after
   * `wait` milliseconds have elapsed since the last time it was invoked.
   * Provide an options object to indicate that `func` should be invoked on
   * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
   * to the debounced function will return the result of the last `func` call.
   *
   * Note: If `leading` and `trailing` options are `true` `func` will be called
   * on the trailing edge of the timeout only if the the debounced function is
   * invoked more than once during the `wait` timeout.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to debounce.
   * @param {number} wait The number of milliseconds to delay.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
   * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
   * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // avoid costly calculations while the window size is in flux
   * var lazyLayout = _.debounce(calculateLayout, 150);
   * jQuery(window).on('resize', lazyLayout);
   *
   * // execute `sendMail` when the click event is fired, debouncing subsequent calls
   * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * });
   *
   * // ensure `batchLog` is executed once after 1 second of debounced calls
   * var source = new EventSource('/stream');
   * source.addEventListener('message', _.debounce(batchLog, 250, {
   *   'maxWait': 1000
   * }, false);
   */
function Rt(t,e,n){var r,a,i,o,s,c,l,u=0,d=!1,p=!0;if(!P(t))throw new TypeError;if(e=en(0,e)||0,n===!0){var f=!0;p=!1}else R(n)&&(f=n.leading,d="maxWait"in n&&(en(e,n.maxWait)||0),p="trailing"in n?n.trailing:p);var _=function(){var n=e-(zn()-o);if(0>=n){a&&clearTimeout(a);var d=l;a=c=l=de,d&&(u=zn(),i=t.apply(s,r),c||a||(r=s=null))}else c=setTimeout(_,n)},m=function(){c&&clearTimeout(c),a=c=l=de,(p||d!==e)&&(u=zn(),i=t.apply(s,r),c||a||(r=s=null))};return function(){if(r=arguments,o=zn(),s=this,l=p&&(c||!f),d===!1)var n=f&&!c;else{a||f||(u=o);var v=d-(o-u),h=0>=v;h?(a&&(a=clearTimeout(a)),u=o,i=t.apply(s,r)):a||(a=setTimeout(m,v))}return h&&c?c=clearTimeout(c):c||e===d||(c=setTimeout(_,e)),n&&(h=!0,i=t.apply(s,r)),!h||c||a||(r=s=null),i}}/**
   * Defers executing the `func` function until the current call stack has cleared.
   * Additional arguments will be provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {...*} [arg] Arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) { console.log(text); }, 'deferred');
   * // logs 'deferred' after one or more milliseconds
   */
function qt(t){if(!P(t))throw new TypeError;var e=i(arguments,1);return setTimeout(function(){t.apply(de,e)},1)}/**
   * Executes the `func` function after `wait` milliseconds. Additional arguments
   * will be provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay execution.
   * @param {...*} [arg] Arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.delay(function(text) { console.log(text); }, 1000, 'later');
   * // => logs 'later' after one second
   */
function Vt(t,e){if(!P(t))throw new TypeError;var n=i(arguments,2);return setTimeout(function(){t.apply(de,n)},e)}/**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided it will be used to determine the cache key for storing the result
   * based on the arguments provided to the memoized function. By default, the
   * first argument provided to the memoized function is used as the cache key.
   * The `func` is executed with the `this` binding of the memoized function.
   * The result cache is exposed as the `cache` property on the memoized function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] A function used to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   *
   * fibonacci(9)
   * // => 34
   *
   * var data = {
   *   'fred': { 'name': 'fred', 'age': 40 },
   *   'pebbles': { 'name': 'pebbles', 'age': 1 }
   * };
   *
   * // modifying the result cache
   * var get = _.memoize(function(name) { return data[name]; }, _.identity);
   * get('pebbles');
   * // => { 'name': 'pebbles', 'age': 1 }
   *
   * get.cache.pebbles.name = 'penelope';
   * get('pebbles');
   * // => { 'name': 'penelope', 'age': 1 }
   */
function $t(t,e){var n={};return function(){var r=e?e.apply(this,arguments):me+arguments[0];return Ue.call(n,r)?n[r]:n[r]=t.apply(this,arguments)}}/**
   * Creates a function that is restricted to execute `func` once. Repeat calls to
   * the function will return the value of the first call. The `func` is executed
   * with the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // `initialize` executes `createApplication` once
   */
function Qt(t){var e,n;if(!P(t))throw new TypeError;return function(){
// clear the `func` variable so the function may be garbage collected
return e?n:(e=!0,n=t.apply(this,arguments),t=null,n)}}/**
   * Creates a function that, when called, invokes `func` with any additional
   * `partial` arguments prepended to those provided to the new function. This
   * method is similar to `_.bind` except it does **not** alter the `this` binding.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [arg] Arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) { return greeting + ' ' + name; };
   * var hi = _.partial(greet, 'hi');
   * hi('fred');
   * // => 'hi fred'
   */
function Ht(t){return y(t,16,i(arguments,1))}/**
   * Creates a function that, when executed, will only call the `func` function
   * at most once per every `wait` milliseconds. Provide an options object to
   * indicate that `func` should be invoked on the leading and/or trailing edge
   * of the `wait` timeout. Subsequent calls to the throttled function will
   * return the result of the last `func` call.
   *
   * Note: If `leading` and `trailing` options are `true` `func` will be called
   * on the trailing edge of the timeout only if the the throttled function is
   * invoked more than once during the `wait` timeout.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to throttle.
   * @param {number} wait The number of milliseconds to throttle executions to.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // avoid excessively updating the position while scrolling
   * var throttled = _.throttle(updatePosition, 100);
   * jQuery(window).on('scroll', throttled);
   *
   * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
   * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
   *   'trailing': false
   * }));
   */
function Ut(t,e,n){var r=!0,a=!0;if(!P(t))throw new TypeError;return n===!1?r=!1:R(n)&&(r="leading"in n?n.leading:r,a="trailing"in n?n.trailing:a),n={},n.leading=r,n.maxWait=e,n.trailing=a,Rt(t,e,n)}/**
   * Creates a function that provides `value` to the wrapper function as its
   * first argument. Additional arguments provided to the function are appended
   * to those provided to the wrapper function. The wrapper is executed with
   * the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {*} value The value to wrap.
   * @param {Function} wrapper The wrapper function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var p = _.wrap(_.escape, function(func, text) {
   *   return '<p>' + func(text) + '</p>';
   * });
   *
   * p('Fred, Wilma, & Pebbles');
   * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
   */
function Gt(t,e){return y(e,16,[t])}/*--------------------------------------------------------------------------*/
/**
   * Produces a callback bound to an optional `thisArg`. If `func` is a property
   * name the created callback will return the property value for a given element.
   * If `func` is an object the created callback will return `true` for elements
   * that contain the equivalent object properties, otherwise it will return `false`.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns a callback function.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // wrap to create custom callback shorthands
   * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
   *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
   *   return !match ? func(callback, thisArg) : function(object) {
   *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
   *   };
   * });
   *
   * _.filter(characters, 'age__gt38');
   * // => [{ 'name': 'fred', 'age': 40 }]
   */
function Yt(t,e,n){var r=typeof t;if(null==t||"function"==r)return d(t,e,n);
// handle "_.pluck" style callback shorthands
if("object"!=r)return te(t);var a=un(t);return function(e){for(var n=a.length,r=!1;n--&&(r=e[a[n]]===t[a[n]]););return r}}/**
   * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
   * corresponding HTML entities.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} string The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escape('Fred, Wilma, & Pebbles');
   * // => 'Fred, Wilma, &amp; Pebbles'
   */
function Kt(t){return null==t?"":String(t).replace(vn,w)}/**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'name': 'fred' };
   * _.identity(object) === object;
   * // => true
   */
function Jt(t){return t}/**
   * Adds function properties of a source object to the destination object.
   * If `object` is a function methods will be added to its prototype as well.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Function|Object} [object=lodash] object The destination object.
   * @param {Object} source The object of functions to add.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
   * @example
   *
   * function capitalize(string) {
   *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   * }
   *
   * _.mixin({ 'capitalize': capitalize });
   * _.capitalize('fred');
   * // => 'Fred'
   *
   * _('fred').capitalize().value();
   * // => 'Fred'
   *
   * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
   * _('fred').capitalize();
   * // => 'Fred'
   */
function Xt(t){at(j(t),function(e){var n=o[e]=t[e];o.prototype[e]=function(){var t=[this.__wrapped__];Ge.apply(t,arguments);var e=n.apply(o,t);return this.__chain__?new s(e,!0):e}})}/**
   * Reverts the '_' variable to its previous value and returns a reference to
   * the `lodash` function.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @returns {Function} Returns the `lodash` function.
   * @example
   *
   * var lodash = _.noConflict();
   */
function Zt(){return Le._=Re,this}/**
   * Creates a "_.pluck" style function, which returns the `key` value of a
   * given object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} key The name of the property to retrieve.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'fred',   'age': 40 },
   *   { 'name': 'barney', 'age': 36 }
   * ];
   *
   * var getName = _.property('name');
   *
   * _.map(characters, getName);
   * // => ['barney', 'fred']
   *
   * _.sortBy(characters, getName);
   * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
   */
function te(t){return function(e){return e[t]}}/**
   * Produces a random number between `min` and `max` (inclusive). If only one
   * argument is provided a number between `0` and the given number will be
   * returned. If `floating` is truey or either `min` or `max` are floats a
   * floating-point number will be returned instead of an integer.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {number} [min=0] The minimum possible value.
   * @param {number} [max=1] The maximum possible value.
   * @param {boolean} [floating=false] Specify returning a floating-point number.
   * @returns {number} Returns a random number.
   * @example
   *
   * _.random(0, 5);
   * // => an integer between 0 and 5
   *
   * _.random(5);
   * // => also an integer between 0 and 5
   *
   * _.random(5, true);
   * // => a floating-point number between 0 and 5
   *
   * _.random(1.2, 5.2);
   * // => a floating-point number between 1.2 and 5.2
   */
function ee(t,e){return null==t&&null==e&&(e=1),t=+t||0,null==e?(e=t,t=0):e=+e||0,t+Qe(rn()*(e-t+1))}/**
   * Resolves the value of property `key` on `object`. If `key` is a function
   * it will be invoked with the `this` binding of `object` and its result returned,
   * else the property value is returned. If `object` is falsey then `undefined`
   * is returned.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object to inspect.
   * @param {string} key The name of the property to resolve.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = {
   *   'cheese': 'crumpets',
   *   'stuff': function() {
   *     return 'nonsense';
   *   }
   * };
   *
   * _.result(object, 'cheese');
   * // => 'crumpets'
   *
   * _.result(object, 'stuff');
   * // => 'nonsense'
   */
function ne(t,e){if(t){var n=t[e];return P(n)?t[e]():n}}/**
   * A micro-templating method that handles arbitrary delimiters, preserves
   * whitespace, and correctly escapes quotes within interpolated code.
   *
   * Note: In the development build, `_.template` utilizes sourceURLs for easier
   * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
   *
   * For more information on precompiling templates see:
   * http://lodash.com/custom-builds
   *
   * For more information on Chrome extension sandboxes see:
   * http://developer.chrome.com/stable/extensions/sandboxingEval.html
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} text The template text.
   * @param {Object} data The data object used to populate the text.
   * @param {Object} [options] The options object.
   * @param {RegExp} [options.escape] The "escape" delimiter.
   * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
   * @param {Object} [options.imports] An object to import into the template as local variables.
   * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
   * @param {string} [sourceURL] The sourceURL of the template's compiled source.
   * @param {string} [variable] The data object variable name.
   * @returns {Function|string} Returns a compiled function when no `data` object
   *  is given, else it returns the interpolated text.
   * @example
   *
   * // using the "interpolate" delimiter to create a compiled template
   * var compiled = _.template('hello <@= name @>');
   * compiled({ 'name': 'fred' });
   * // => 'hello fred'
   *
   * // using the "escape" delimiter to escape HTML in data property values
   * _.template('<b><@- value @></b>', { 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   * // using the "evaluate" delimiter to generate HTML
   * var list = '<@ _.forEach(people, function(name) { @><li><@- name @></li><@ }); @>';
   * _.template(list, { 'people': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
   * _.template('hello ${ name }', { 'name': 'pebbles' });
   * // => 'hello pebbles'
   *
   * // using the internal `print` function in "evaluate" delimiters
   * _.template('<@ print("hello " + name); @>!', { 'name': 'barney' });
   * // => 'hello barney!'
   *
   * // using a custom template delimiters
   * _.templateSettings = {
   *   'interpolate': /{{([\s\S]+?)}}/g
   * };
   *
   * _.template('hello {{ name }}!', { 'name': 'mustache' });
   * // => 'hello mustache!'
   *
   * // using the `imports` option to import jQuery
   * var list = '<@ jq.each(people, function(name) { @><li><@- name @></li><@ }); @>';
   * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the `sourceURL` option to specify a custom sourceURL for the template
   * var compiled = _.template('hello <@= name @>', null, { 'sourceURL': '/basic/greeting.jst' });
   * compiled(data);
   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
   *
   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
   * var compiled = _.template('hi <@= data.name @>!', null, { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   *   var __t, __p = '', __e = _.escape;
   *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
   *   return __p;
   * }
   *
   * // using the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and a stack trace
   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */
function re(t,e,r){var a=o,i=a.templateSettings;t=String(t||""),r=S({},r,i);var s=0,c="__p += '",l=r.variable,u=RegExp((r.escape||Ce).source+"|"+(r.interpolate||Ce).source+"|"+(r.evaluate||Ce).source+"|$","g");t.replace(u,function(e,r,a,i,o){return c+=t.slice(s,o).replace(ye,n),r&&(c+="' +\n_.escape("+r+") +\n'"),i&&(c+="';\n"+i+";\n__p += '"),a&&(c+="' +\n((__t = ("+a+")) == null ? '' : __t) +\n'"),s=o+e.length,e}),c+="';\n",l||(l="obj",c="with ("+l+" || {}) {\n"+c+"\n}\n"),c="function("+l+") {\nvar __t, __p = '', __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"+c+"return __p\n}";try{var d=Function("_","return "+c)(a)}catch(p){throw p.source=c,p}return e?d(e):(d.source=c,d)}/**
   * Executes the callback `n` times, returning an array of the results
   * of each callback execution. The callback is bound to `thisArg` and invoked
   * with one argument; (index).
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {number} n The number of times to execute the callback.
   * @param {Function} callback The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns an array of the results of each `callback` execution.
   * @example
   *
   * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
   * // => [3, 6, 4]
   *
   * _.times(3, function(n) { mage.castSpell(n); });
   * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
   *
   * _.times(3, function(n) { this.cast(n); }, mage);
   * // => also calls `mage.castSpell(n)` three times
   */
function ae(t,e,n){t=(t=+t)>-1?t:0;var r=-1,a=Array(t);for(e=d(e,n,1);++r<t;)a[r]=e(r);return a}/**
   * The inverse of `_.escape` this method converts the HTML entities
   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
   * corresponding characters.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} string The string to unescape.
   * @returns {string} Returns the unescaped string.
   * @example
   *
   * _.unescape('Fred, Barney &amp; Pebbles');
   * // => 'Fred, Barney & Pebbles'
   */
function ie(t){return null==t?"":String(t).replace(mn,x)}/**
   * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} [prefix] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
function oe(t){var e=++fe+"";return t?t+e:e}/*--------------------------------------------------------------------------*/
/**
   * Creates a `lodash` object that wraps the given value with explicit
   * method chaining enabled.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {*} value The value to wrap.
   * @returns {Object} Returns the wrapper object.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36 },
   *   { 'name': 'fred',    'age': 40 },
   *   { 'name': 'pebbles', 'age': 1 }
   * ];
   *
   * var youngest = _.chain(characters)
   *     .sortBy('age')
   *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
   *     .first()
   *     .value();
   * // => 'pebbles is 1'
   */
function se(t){return t=new s(t),t.__chain__=!0,t}/**
   * Invokes `interceptor` with the `value` as the first argument and then
   * returns `value`. The purpose of this method is to "tap into" a method
   * chain in order to perform operations on intermediate results within
   * the chain.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {*} value The value to provide to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @returns {*} Returns `value`.
   * @example
   *
   * _([1, 2, 3, 4])
   *  .tap(function(array) { array.pop(); })
   *  .reverse()
   *  .value();
   * // => [3, 2, 1]
   */
function ce(t,e){return e(t),t}/**
   * Enables explicit method chaining on the wrapper object.
   *
   * @name chain
   * @memberOf _
   * @category Chaining
   * @returns {*} Returns the wrapper object.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // without explicit chaining
   * _(characters).first();
   * // => { 'name': 'barney', 'age': 36 }
   *
   * // with explicit chaining
   * _(characters).chain()
   *   .first()
   *   .pick('age')
   *   .value();
   * // => { 'age': 36 }
   */
function le(){return this.__chain__=!0,this}/**
   * Extracts the wrapped value.
   *
   * @name valueOf
   * @memberOf _
   * @alias value
   * @category Chaining
   * @returns {*} Returns the wrapped value.
   * @example
   *
   * _([1, 2, 3]).valueOf();
   * // => [1, 2, 3]
   */
function ue(){return this.__wrapped__}/** Used as a safe reference for `undefined` in pre ES5 environments */
var de,pe=[],fe=0,_e={},me=+new Date+"",ve=40,he=/\w*$/,ge=/<@=([\s\S]+?)@>/g,Ce=/($^)/,ye=/['\n\r\t\u2028\u2029\\]/g,be="[object Arguments]",we="[object Array]",ke="[object Boolean]",ze="[object Date]",Te="[object Function]",xe="[object Number]",Ie="[object Object]",De="[object RegExp]",Ee="[object String]",Se={};Se[Te]=!1,Se[be]=Se[we]=Se[ke]=Se[ze]=Se[xe]=Se[Ie]=Se[De]=Se[Ee]=!0;/** Used as the data object for `iteratorTemplate` */
var je={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},Ae={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Oe={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},Le=Ae[typeof window]&&window||this,Me=Ae[typeof exports]&&exports&&!exports.nodeType&&exports,Be=Ae[typeof module]&&module&&!module.nodeType&&module,We=(Be&&Be.exports===Me&&Me,Ae[typeof global]&&global);!We||We.global!==We&&We.window!==We||(Le=We);/*--------------------------------------------------------------------------*/
/**
   * Used for `Array` method references.
   *
   * Normally `Array.prototype` would suffice, however, using an array literal
   * avoids issues in Narwhal.
   */
var Ne=[],Fe=Object.prototype,Pe=String.prototype,Re=Le._,qe=Fe.toString,Ve=RegExp("^"+String(qe).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),$e=Math.ceil,Qe=Math.floor,He=z(He=Object.getPrototypeOf)&&He,Ue=Fe.hasOwnProperty,Ge=Ne.push,Ye=Fe.propertyIsEnumerable,Ke=z(Ke=Object.create)&&Ke,Je=z(Je=Array.isArray)&&Je,Xe=Le.isFinite,Ze=Le.isNaN,tn=z(tn=Object.keys)&&tn,en=Math.max,nn=Math.min,rn=Math.random,an={};an[we]=Array,an[ke]=Boolean,an[ze]=Date,an[Te]=Function,an[Ie]=Object,an[xe]=Number,an[De]=RegExp,an[Ee]=String,
// ensure `new lodashWrapper` is an instance of `lodash`
s.prototype=o.prototype;/**
   * An object used to flag environments features.
   *
   * @static
   * @memberOf _
   * @type Object
   */
var on={};!function(){var t={0:1,length:1};/**
     * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
     *
     * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
     * and `splice()` functions that fail to remove the last element, `value[0]`,
     * of array-like objects even though the `length` property is set to `0`.
     * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
     * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
     *
     * @memberOf _.support
     * @type boolean
     */
on.spliceObjects=(Ne.splice.call(t,0,1),!t[0])}(1),/**
   * By default, the template delimiters used by Lo-Dash are similar to those in
   * embedded Ruby (ERB). Change the following template settings to use alternative
   * delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
o.templateSettings={/**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
escape:/<@-([\s\S]+?)@>/g,/**
     * Used to detect code to be evaluated.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
evaluate:/<@([\s\S]+?)@>/g,/**
     * Used to detect `data` property values to inject.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
interpolate:ge,/**
     * Used to reference the data object in the template text.
     *
     * @memberOf _.templateSettings
     * @type string
     */
variable:""};/*--------------------------------------------------------------------------*/
/**
   * The template used to create iterator functions.
   *
   * @private
   * @param {Object} data The data object used to populate the text.
   * @returns {string} Returns the interpolated text.
   */
var sn=function(t){var e="var index, iterable = "+t.firstArg+", result = "+t.init+";\nif (!iterable) return result;\n"+t.top+";";t.array&&(e+="\nvar length = iterable.length; index = -1;\nif ("+t.array+") {\n  while (++index < length) {\n    "+t.loop+";\n  }\n}\nelse {  ");var n=[];return t.useHas&&t.keys?(e+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",n.length&&(e+="    if ("+n.join(" && ")+") {\n  "),e+=t.loop+";    ",n.length&&(e+="\n    }"),e+="\n  }  "):(e+="\n  for (index in iterable) {\n",t.useHas&&n.push("hasOwnProperty.call(iterable, index)"),n.length&&(e+="    if ("+n.join(" && ")+") {\n  "),e+=t.loop+";    ",n.length&&(e+="\n    }"),e+="\n  }  "),t.array&&(e+="\n}"),e+=t.bottom+";\nreturn result"};
// fallback for browsers without `Object.create`
Ke||(u=function(){function t(){}return function(e){if(R(e)){t.prototype=e;var n=new t;t.prototype=null}return n||Le.Object()}}()),
// fallback for browsers that can't detect `arguments` objects by [[Class]]
I(arguments)||(I=function(t){return t&&"object"==typeof t&&"number"==typeof t.length&&Ue.call(t,"callee")&&!Ye.call(t,"callee")||!1});/**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
var cn=Je||function(t){return t&&"object"==typeof t&&"number"==typeof t.length&&qe.call(t)==we||!1},ln=function(t){var e,n=t,r=[];if(!n)return r;if(!Ae[typeof t])return r;for(e in n)Ue.call(n,e)&&r.push(e);return r},un=tn?function(t){return R(t)?tn(t):[]}:ln,dn={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:!1,keys:un,loop:"if (callback(iterable[index], index, collection) === false) return result"},pn={top:"if (!objectTypes[typeof iterable]) return result;\n"+dn.top,array:!1},fn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"},_n=O(fn),mn=RegExp("("+un(_n).join("|")+")","g"),vn=RegExp("["+un(fn).join("")+"]","g"),hn=b(dn,pn,{useHas:!1}),gn=function(t,e){var n,r=t,a=r;if(!r)return a;if(!Ae[typeof r])return a;for(var i=-1,o=Ae[typeof r]&&un(r),s=o?o.length:0;++i<s;)if(n=o[i],e(r[n],n,t)===!1)return a;return a};
// fallback for older versions of Chrome and Safari
P(/x/)&&(P=function(t){return"function"==typeof t&&qe.call(t)==Te});/**
   * Checks if `value` is an object created by the `Object` constructor.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * _.isPlainObject(new Shape);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   */
var Cn=He?function(t){if(!t||qe.call(t)!=Ie)return!1;var e=t.valueOf,n=z(e)&&(n=He(e))&&He(n);return n?t==n||He(t)==n:T(t)}:T,yn=C(function(t,e,n){Ue.call(t,n)?t[n]++:t[n]=1}),bn=C(function(t,e,n){(Ue.call(t,n)?t[n]:t[n]=[]).push(e)}),wn=C(function(t,e,n){t[n]=e}),kn=st,zn=z(zn=Date.now)&&zn||function(){return(new Date).getTime()};/*--------------------------------------------------------------------------*/
// add functions that return wrapped values when chaining
o.after=Wt,o.bind=Nt,o.bindAll=Ft,o.chain=se,o.compact=yt,o.compose=Pt,o.countBy=yn,o.debounce=Rt,o.defaults=S,o.defer=qt,o.delay=Vt,o.difference=bt,o.filter=et,o.flatten=kt,o.forEach=at,o.forIn=hn,o.functions=j,o.groupBy=bn,o.indexBy=wn,o.initial=Tt,o.intersection=xt,o.invert=O,o.invoke=ot,o.keys=un,o.map=st,o.max=ct,o.memoize=$t,o.merge=G,o.min=lt,o.omit=Y,o.once=Qt,o.pairs=K,o.partial=Ht,o.pick=J,o.pluck=kn,o.range=Et,o.reject=pt,o.rest=St,o.shuffle=_t,o.sortBy=ht,o.tap=ce,o.throttle=Ut,o.times=ae,o.toArray=gt,o.union=At,o.uniq=Ot,o.values=X,o.where=Ct,o.without=Lt,o.wrap=Gt,o.zip=Mt,
// add aliases
o.collect=st,o.drop=St,o.each=at,o.extend=D,o.methods=j,o.object=Bt,o.select=et,o.tail=St,o.unique=Ot,/*--------------------------------------------------------------------------*/
// add functions that return unwrapped values when chaining
o.clone=E,o.contains=Z,o.escape=Kt,o.every=tt,o.find=nt,o.has=A,o.identity=Jt,o.indexOf=zt,o.isArguments=I,o.isArray=cn,o.isBoolean=L,o.isDate=M,o.isElement=B,o.isEmpty=W,o.isEqual=N,o.isFinite=F,o.isFunction=P,o.isNaN=q,o.isNull=V,o.isNumber=$,o.isObject=R,o.isPlainObject=Cn,o.isRegExp=Q,o.isString=H,o.isUndefined=U,o.lastIndexOf=Dt,o.mixin=Xt,o.noConflict=Zt,o.random=ee,o.reduce=ut,o.reduceRight=dt,o.result=ne,o.size=mt,o.some=vt,o.sortedIndex=jt,o.template=re,o.unescape=ie,o.uniqueId=oe,
// add aliases
o.all=tt,o.any=vt,o.detect=nt,o.findWhere=rt,o.foldl=ut,o.foldr=dt,o.include=Z,o.inject=ut,/*--------------------------------------------------------------------------*/
// add functions capable of returning wrapped and unwrapped values when chaining
o.first=wt,o.last=It,o.sample=ft,
// add aliases
o.take=wt,o.head=wt,/*--------------------------------------------------------------------------*/
// add functions to `lodash.prototype`
Xt(o),/**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */
o.VERSION="2.4.1",
// add "Chaining" functions to the wrapper
o.prototype.chain=le,o.prototype.value=ue,
// add `Array` mutator functions to the wrapper
at(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=Ne[t];o.prototype[t]=function(){var t=this.__wrapped__;
// avoid array-like object bugs with `Array#shift` and `Array#splice`
// in Firefox < 10 and IE < 9
return e.apply(t,arguments),on.spliceObjects||0!==t.length||delete t[0],this}}),
// add `Array` accessor functions to the wrapper
at(["concat","join","slice"],function(t){var e=Ne[t];o.prototype[t]=function(){var t=this.__wrapped__,n=e.apply(t,arguments);return this.__chain__&&(n=new s(n),n.__chain__=!0),n}}),/*--------------------------------------------------------------------------*/
tC.tcms._=o}(),/**
 * Revealing Module usabilla. this creates a feedback button.
 * @return publicAPI{[object]}
 */
tC.tcms.utils=function(t){"use strict";var e=function(t){return t?t.toLowerCase():void 0},n=function(t){return t?t.toUpperCase():void 0},r=function(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")},a=function(t,n){var r,a,i,o,s=!1;try{for(i=e(t.z_country),o=e(t.z_language),r=0;r<n.length;r++)a=n[r],a.country===i&&a.language===o?s=!0:a.language&&""!==a.language&&"all"!==a.language||a.country!==i?a.country&&""!==a.country&&"all"!==a.country||a.language!==o||(s=!0):s=!0;return s}catch(c){throw new Error("tC.tcms.utils cannot process posCheck")}},i=function(t,e){var n=t.indexOf("?"+e+"=");if(0>n&&(n=t.indexOf("&"+e+"=")),0>n)return"";n+=e.length+2;var r=t.indexOf("&",n)-1;0>r&&(r=t.length);for(var a="",i=n;r>=i;i++){var o=t.charAt(i);a+="+"===o?" ":o}return window.unescape(a)},o=function(t){var e,n;return window.unescape(document.cookie).length>0&&(e=window.unescape(document.cookie).indexOf(t+"="),-1!==e)?(e=e+t.length+1,n=window.unescape(document.cookie).indexOf(";",e),-1===n&&(n=window.unescape(document.cookie).length),window.unescape(window.unescape(document.cookie).substring(e,n))):""},s=function(t){if(void 0===t||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(void 0!==r&&null!==r)for(var a in r)r.hasOwnProperty(a)&&(e[a]=r[a])}return e};return{posCheck:a,upperCase:n,lowerCase:e,cookieEncode:r,getParam:i,getCookie:o,objectAssign:s}}(tC),/* global document, top */
/**
 * Revealing Module survey. this creates a overlay in homepage asks for survey.
 * @return publicAPI{[object]}
 */
tC.tcms.survey=function(t){"use strict";var e={started:!1,scriptId:"tc_script_survey_dk"},n=[{country:"br",language:"en",DI:5,MTI:5},{country:"br",language:"br",DI:5,MTI:5},{country:"ca",language:"en",DI:4,MTI:4},{country:"ca",language:"fr",DI:4,MTI:4},{country:"cn",language:"cn",DI:4,MTI:4},{country:"cn",language:"en",DI:4,MTI:4},{country:"fr",language:"en",DI:4,MTI:4},{country:"fr",language:"fr",DI:4,MTI:4},{country:"de",language:"en",DI:5,MTI:5},{country:"de",language:"de",DI:5,MTI:5},{country:"id",language:"id",DI:3,MTI:3},{country:"id",language:"en",DI:3,MTI:3},{country:"it",language:"en",DI:8,MTI:8},{country:"it",language:"it",DI:8,MTI:8},{country:"jp",language:"en",DI:4,MTI:4},{country:"jp",language:"ja",DI:4,MTI:4},{country:"kr",language:"en",DI:1,MTI:1},{country:"kr",language:"ko",DI:1,MTI:1},{country:"my",language:"en",DI:3,MTI:3},{country:"nl",language:"nl",DI:25,MTI:25},{country:"nl",language:"en",DI:25,MTI:25},{country:"no",language:"en",DI:5,MTI:5},{country:"no",language:"no",DI:5,MTI:5},{country:"ru",language:"en",DI:5,MTI:5},{country:"ru",language:"ru",DI:5,MTI:5},{country:"sg",language:"en",DI:3,MTI:3},{country:"za",language:"en",DI:3,MTI:3},{country:"es",language:"en",DI:5,MTI:5},{country:"es",language:"es",DI:5,MTI:5},{country:"se",language:"en",DI:5,MTI:5},{country:"se",language:"sv",DI:5,MTI:5},{country:"gb",language:"en",DI:5,MTI:5},{country:"us",language:"en",DI:5,MTI:5}],r=function(t,e,n){var r,a,i=[];for(e=e.toLowerCase(),n=n.toLowerCase(),r=0;r<t.length;++r)a=t[r],a&&a.country&&-1!==a.country.toLowerCase().indexOf(e)&&a&&a.language&&-1!==a.language.toLowerCase().indexOf(n)&&i.push(a);return i},a=function(t){return document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase())>-1?!1:"mobile"===tC.internalvars.device||"tablet"===tC.internalvars.device||!t.z_application||"homepage"===t.z_application},i=function(t,e,n){var r={ML_CN:e[0].country?e[0].country.toLowerCase():"",ML_LG:e[0].language?e[0].language.toLowerCase():"",ML_DEV:tC.internalvars.device?tC.internalvars.device:"",ML_TI:t.ti?t.ti:"",ML_BRWSR:tC.sayswho?tC.sayswho:"",ML_RFR:document.referrer,ML_FUVI:n.split("&").toString(),ML_FULAST:t.si_n?t.si_n:"",ML_BOFL:"",ML_DBFL:t.z_day_before_flight?t.z_day_before_flight:"",ML_CABCO:t.z_cabin_code?t.z_cabin_code:"",ML_ORGDES:t.z_origin?t.z_origin+"/"+(t.z_destination?t.z_destination:""):"",ML_TCVAPRO:""};return r},o=function(t,n,r){!function(){var a=tC.getCookie("TCBlockedScripts"),i=e.scriptId;if(!tC.isblockedScripts(i)){window._tmsQueue=window._tmsQueue||[];var o="www.klm.com";(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(o=tC.internalvars.fulldomain);var s="//"+o+"/ams/tms/tms/static/js/metrixlab/p23101_klm/overlay.js";tC.addScript(s,i,function(e){var o,s;"success"===e?c(t,n,r):"timeout"===e?(o=document.getElementById(i),s=document.getElementById(i).parentNode,s.removeChild(o),document.cookie="TCBlockedScripts="+a+"&"+i):(o=document.getElementById(i),s=document.getElementById(i).parentNode,s.removeChild(o),document.cookie="TCBlockedScripts="+a+"&"+i)},tC.scriptTimeout)}}()},s=function(){var t=top.document.getElementById(e.scriptId);if(t)try{t.parentNode.removeChild(t)}catch(n){tC.log("Failed to remove usabilla : "+n)}},c=function(t,e,n){e&&e.length>0&&(document.cookie="ML_Variables=?&"+tC.tcms.utils.cookieEncode(i(t,e,n))+"&ML_WEBTR="+tC.tcms.utils.getCookie("WT_FPC"),window.MetrixLabNameSpace&&window.MetrixLabNameSpace.MetrixLab_getCountryAndIntercept(e[0].country?e[0].country.toUpperCase():"",e[0].language?e[0].language.toLowerCase():"",e[0].DI,e[0].MTI))},l=function(e){var n=tC.getCookie("Visited_Services");return e.z_application&&t.indexOf(n.split("&"),e.z_application)<=-1&&(n=n+e.z_application+"&",document.cookie="Visited_Services="+n+";domain=.klm.com;path=/"),n},u=function(t,i){if(i.z_country&&i.z_language&&""!==i.z_country&&""!==i.z_language){var u=l(i),d=top.document.getElementById(e.scriptId);if(a(i)){var p=r(n,i.z_country,i.z_language);e.started||null!==d?c(p):p&&p.length>0&&(e.started=!0,o(i,p,u))}else d&&(// we need to remove the script from the page due to SPA applications.
e.started=!1,s())}};tC.tcms.pubsub.subscribe("tc_events_41-survey",u)}(tC.tcms._),/**
 * Revealing Module usabilla. this creates a feedback button.
 * @return publicAPI{[object]}
 */
tC.tcms.usabilla=function(t){"use strict";var e={started:!1,scriptId:"tc_script_usabilla"},n=function(t){if(document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase())>-1)return!1;if(t.z_application&&"myweb"===t.z_application)return!0;var e=[{country:"gb",language:"en"},{country:"us",language:"en"},{country:"nl",language:"nl"},{country:"nl",language:"en"}];if(tC.tcms.utils.posCheck(t,e)===!1)return!1;var n=t.cg_s?t.cg_s.toString().toLowerCase():"";return!("true"==tC.internalvars.EBT7&&"7"==tC.internalvars.six||n.indexOf("Payment details".toLowerCase())>-1||n.indexOf("Review booking".toLowerCase())>-1)},r=function(t){!function(){var e=tC.getCookie("TCBlockedScripts"),n="tc_script_usabilla";if(!tC.isblockedScripts(n)){window._tmsQueue=window._tmsQueue||[];var r="www.klm.com";(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(r=tC.internalvars.fulldomain);var a="//"+r+"/ams/tms/tms/static/js/usabilla/usabilla.js";tC.addScript(a,n,function(r){if("success"===r)i(t);else if("timeout"===r){var a=document.getElementById(n),o=document.getElementById(n).parentNode;o.removeChild(a),document.cookie="TCBlockedScripts="+e+"&"+n}else{var a=document.getElementById(n),o=document.getElementById(n).parentNode;o.removeChild(a),document.cookie="TCBlockedScripts="+e+"&"+n}},tC.scriptTimeout)}}()},a=function(){var t=top.document.getElementById("tc_script_usabilla"),e=top.document.querySelectorAll(".usabilla_live_button_container")[0];if(t)try{t.parentNode.removeChild(t)}catch(n){tC.log("Failed to remove usabilla : "+n)}if(e)try{e.parentNode.removeChild(e)}catch(n){tC.log("Failed to remove usabilla : "+n)}},i=function(e){var n={};e.z_testnumber&&e.z_testvariant&&t.merge(n,{custom:{z_testnumber:e.z_testnumber,z_testvariant:e.z_testvariant}});var r=tC.tcms.utils.getCookie("klm_tracking_id");r&&t.merge(n,{custom:{"KLM tracking ID":r}}),n&&window.usabilla_live("data",n)},o=function(t,o){var s=top.document.getElementById("tc_script_usabilla"),c=top.document.querySelectorAll(".usabilla_live_button_container")[0];o.z_country&&o.z_language&&""!=o.z_country&&""!=o.z_language&&(n(o)?e.started||window.top!==window.self?window.top===window.self&&i(o):(e.started=!0,r(o)):(s||c)&&(e.started=!1,a()))};tC.tcms.pubsub.subscribe("tc_events_41-usabila",o)}(tC.tcms._),/* global document, top */
/**
 * Revealing Module Chat. this creates a chat button in customer support page and payment page.
 * @return publicAPI{[object]}/Divya
 */
tC.tcms.chat=function(t){"use strict";var e=function(e,n){var r=["NL","EN","SE","NO","DK","FI","GB"],a=n.z_language?n.z_language.toLowerCase():"",i=document.getElementById("script_salesforce_chat"),o=n.cg_s?n.cg_s.toString().toLowerCase():"";if(null===i&&n.z_country&&t.indexOf(r,n.z_country.toUpperCase())>-1){if(-1==document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase()))if(o.indexOf("Payment details".toLowerCase())>=0||o.indexOf("Review booking".toLowerCase())>=0||-1!=window.top.location.toString().toLowerCase().indexOf("customer_support/customer_support/contact/index.htm".toLowerCase())||-1!=window.top.location.toString().toLowerCase().indexOf("customer_support/customer_support/all_about_customer_support/index.htm".toLowerCase())){var s=window.top.document.getElementsByClassName("salesforce-chat-button online")[0];s||!function(){var t=tC.getCookie("TCBlockedScripts"),e="script_salesforce_chat";if(!tC.isblockedScripts(e)){var n="www.klm.com";document.createElement("script");(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(n=tC.internalvars.fulldomain);var r="//"+n+"/ams/tms/tms/static/js/salesforce/deployment.js";tC.addScript(r,e,function(r){if("success"===r){if(!window.liveagent)return;var i=window.top.document.createElement("link");i.setAttribute("rel","stylesheet"),i.setAttribute("href","//"+n+"/ams/tms/tms/static/js/salesforce/salesforce.css");var o=window.top.document.getElementsByTagName("head")[0];o.appendChild(i),window._laq||(window._laq=[]);var s={chatButtonID:"573g00000004CTN",SalesForceDeployementID:"572g00000004CN0",SalesForceOrganisationID:"00Dg0000003NlsJ",SalesForceDomain:"c.la2w1cs",buttonsTexts:{online:"Need help? Chat with us",popup:"Ok"},popup:{title:"Just so you know:",text:"Information is collected and stored for a legitimate, explicit and limited purpose, with explicit consent of the customer",close:"&#x78;"}};!function(){var t=function(){function e(){for(var t={},e=0;e<arguments.length;e++)for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(t[n]=arguments[e][n]);return t}function n(t){this.buttonOptions=e(this.buttonOptions,t)}function r(){n.call(this,{online:{attributes:{id:"liveagent_button_online_"+this.chatOptions.chatButtonID,"class":"salesforce-chat-button online",style:"display: none;",onkeypress:"tC.internalvars.chatService.openPopup();",/*Divya : Detect keyboard enter to open popup*/
onclick:"tC.internalvars.chatService.openPopup();"},content:'<span class="headset-icon">&#xe011;</span>                <span class="button-content">'+this.chatOptions.buttonsTexts.online+"</span>"}}),n.call(this,{popup:{attributes:{id:"salesforceChatButton","class":"start-chat-button",onkeypress:'liveagent.startChat("'+this.chatOptions.chatButtonID+'");',onclick:'liveagent.startChat("'+this.chatOptions.chatButtonID+'");'},content:this.chatOptions.buttonsTexts.popup}})}function a(t){var e=window.top.document.createElement("div");e.innerHTML=this.buttonOptions[t].content;for(var n in this.buttonOptions[t].attributes)e.setAttribute(n,this.buttonOptions[t].attributes[n]);return e}function i(){var t=this,e=document.createElement("div"),n=document.createElement("div"),r=document.createElement("span"),i=document.createElement("div"),o=a.call(this,"popup");/* Divya : To set focus on tabbing */
o.setAttribute("tabindex","0"),r.setAttribute("tabindex","0"),e.setAttribute("tabindex","0"),/* Divya : To set role attribute for accessibility */
e.setAttribute("role","alert"),r.setAttribute("role","button"),e.setAttribute("id","salesforceChatPopup"),e.setAttribute("class","salesforce-chat-popup"),e.setAttribute("style","display:none;"),r.setAttribute("id","salesforceChatClose"),r.setAttribute("class","salesforce-chat-close"),r.innerHTML=this.chatOptions.popup.close,n.setAttribute("class","salesforce-chat-popup-title"),n.innerHTML=this.chatOptions.popup.title,i.setAttribute("class","salesforce-chat-popup-body"),i.innerHTML=this.chatOptions.popup.text,n.appendChild(r),e.appendChild(n),e.appendChild(i),e.appendChild(o),r.addEventListener("click",function(){t.closePopup()}),o.addEventListener("click",function(){var e="liveagent_button_online_"+t.chatOptions.chatButtonID,n=window.top.document.getElementById(e);n.parentNode.removeChild(n),t.closePopup()}),window.top.document.body.appendChild(e)}t.prototype.openPopup=function(){var t=window.top.document.getElementById("salesforceChatPopup");t.style.display="block",/*Divya : On chat button click to get focus on modal dialog*/
t.focus()},t.prototype.closePopup=function(){window.top.document.getElementById("salesforceChatPopup").style.display="none"},t.prototype.init=function(t){if(liveagent){var n=this;n.chatOptions=e(s,t),r.call(this),i.call(this);var o=a.call(this,"online");window.top.document.body.appendChild(o),/* Divya: To set focus on tabbing */
o.setAttribute("tabindex","0"),window._laq.push(function(){liveagent.showWhenOnline(n.chatOptions.chatButtonID,o)}),liveagent.init("https://"+this.chatOptions.SalesForceDomain+".salesforceliveagent.com/chat",this.chatOptions.SalesForceDeployementID,this.chatOptions.SalesForceOrganisationID),window.top.liveagent=liveagent}}};window.top.tC.internalvars.chatService=new t,tC.internalvars.chatService=window.top.tC.internalvars.chatService}(),"www.klm.com"==n?tC.internalvars.chatService.init({chatButtonID:"nl"==a?"57320000000L0tV":"57320000000L0tW",SalesForceDeployementID:"57220000000L00O",SalesForceOrganisationID:"00D20000000CPM3",SalesForceDomain:"c.la2w2",buttonsTexts:{online:"nl"==a?"Hulp nodig? Chat met ons":"Need help? Chat with us",popup:"Ok"},popup:{title:"nl"==a?"Even tussendoor:":"Just so you know:",text:"nl"==a?"Excuus voor deze extra stap. We willen even laten weten dat chatsessies worden bewaard om onze service te verbeteren. Alle gedeelde persoonlijke gegevens blijven strikt vertrouwelijk, en worden nooit voor commerciële doeleinden gebruikt.":"Sorry for this extra step. We just wanted to let you know that chat sessions will be saved to improve our service. Any personal details shared are kept strictly confidential and are never used for commercial purposes.",close:"&#x78;"}}):tC.internalvars.chatService.init({chatButtonID:"nl"==a?"573g00000004CSy":"573g00000004CSt",SalesForceDeployementID:"572g00000004CN0",SalesForceOrganisationID:"00Dg0000003NlsJ",SalesForceDomain:"c.la2w1cs",buttonsTexts:{online:"nl"==a?"Hulp nodig? Chat met ons":"Need help? Chat with us",popup:"Ok"},popup:{title:"nl"==a?"Even tussendoor:":"Just so you know:",text:"nl"==a?"Excuus voor deze extra stap. We willen even laten weten dat chatsessies worden bewaard om onze service te verbeteren. Alle gedeelde persoonlijke gegevens blijven strikt vertrouwelijk, en worden nooit voor commerciële doeleinden gebruikt.":"Sorry for this extra step. We just wanted to let you know that chat sessions will be saved to improve our service. Any personal details shared are kept strictly confidential and are never used for commercial purposes.",close:"&#x78;"}})}else if("timeout"===r){var c=document.getElementById(e),l=document.getElementById(e).parentNode;l.removeChild(c),document.cookie="TCBlockedScripts="+t+"&"+e}else{var c=document.getElementById(e),l=document.getElementById(e).parentNode;l.removeChild(c),document.cookie="TCBlockedScripts="+t+"&"+e}},tC.scriptTimeout)}}()}else for(var s=window.top.document.querySelectorAll(".salesforce-chat-button.online"),c=0;c<s.length;c++)if(s[c]){var l=s[c].parentNode;l.removeChild(s[c])}tC.tcms.pubsub.publish("chat-glance",n)}};tC.tcms.pubsub.subscribe("tc_events_41-chat",e)}(tC.tcms._),/* global document, top */
/**
 * Revealing Module Chat. this creates a chat button in customer support page and payment page.
 * @return publicAPI{[object]}
 */
tC.tcms.glance=function(t){"use strict";var e=function(t,e){function n(){var t=f.readyState;"loaded"!==t&&"complete"!==t||(o=!0)}function r(){GLANCE&&GLANCE.Cobrowse&&GLANCE.Cobrowse.Visitor&&GLANCE.Cobrowse.Visitor.addEventListener("sessioncontinue",function(){GLANCE.Cobrowse.Visitor.setStartParams({sessionKey:GLANCE.Cobrowse.Visitor.getKey()})})}if("chat"!==e.cg_s&&"landingpage"!==e.cg_s1){var a,i=(tC.getCookie("TCBlockedScripts"),"cobrowsescript"),o=!1,s=50,c=0,l=3*(1e3/s),u=document.getElementById(i);top.document.getElementById(i);if(!tC.isblockedScripts(i)&&!o&&null===u){var d="www.klm.com";document.createElement("script");a="production",(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(d=tC.internalvars.fulldomain,a="staging");var p="//"+d+"/ams/tms/tms/static/js/salesforce/GlanceCobrowseLoader_3.0.1M.js",f=document.createElement("script");f.id=i,f.async="async",f.defer="defer",f.setAttribute("groupid","18891"),f.setAttribute("site",a),f.setAttribute("skin","Custom"),f.setAttribute("charset","UTF-8"),f.src=p,f.onLoad=function(){o=!0},f.onreadystatechange=n;var _=setInterval(function(){o===!0&&(r(),clearInterval(_)),c++,c===l&&clearInterval(_)},s);(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]||document.getElementsByTagName("script")[0].parentNode).insertBefore(f,null);var m=document.querySelectorAll(".chat-accept-button")[0],v=document.querySelectorAll(".chat-decline-button")[0];v&&v.addEventListener("click",function(t){t.preventDefault(),window.close()}),v&&m.addEventListener("click",function(t){t.preventDefault(),setTimeout(function(){window.close()},500)})}}};tC.tcms.pubsub.subscribe("chat-glance",e)}(tC.tcms._),tC.wt_mapping=[],tC.scriptTimeout=1e3,tC.addScript=function(t,e,n,r){function a(){var t=c.readyState;"loaded"!==t&&"complete"!==t||(s=!0)}function i(){s||(s=!0,n("error"))}var o=document.getElementsByTagName("head")[0],s=!1,c=document.createElement("script");c.type="text/javascript",c.src=t,c.id=e,c.async=!0,c.defer="defer",c.onload=function(){s=!0},c.onreadystatechange=a,c.onerror=i,o.appendChild(c),setTimeout(function(){n(s?"success":"timeout")},r)},tC.isblockedScripts=function(t){for(var e=tC.getCookie("TCBlockedScripts").split("&"),n=0;n<e.length;n++)if(e[n]===t)return!0;return!1},tC.createIframe=function(t){var e=tC.internalvars.fulldomain;window._tmsQueue=window._tmsQueue||[],window._tmsQueue.push(tc_vars);var n;if(n=window.location.host.indexOf("klm")>-1?e&&-1!==e.indexOf(".klm.com")?e:"www.klm.com":window.location.host.indexOf("airfrance")>-1?e&&-1!==e.indexOf("airfrance")?e:"www.airfrance.nl":"otherDomain","otherDomain"!==n&&window.postMessage){var r=document.getElementById("tc_iframe_416_1");if(null===r){var a=document.createElement("iframe");a.id="tc_iframe_416_1",a.src="//"+n+"/ams/tms/tms/static/fls_redirect.html",a.frameBorder=0,a.title="Pixel container",a.height=0,a.width=0,a.style.display="none",document.body.appendChild(a),setTimeout(function(){try{var e=document.getElementById("tc_iframe_416_1"),n=document.location.protocol+"//"+window.location.host;e.contentWindow.postMessage(t,n)}catch(r){}},1e3)}else{var i=document.location.protocol+"//"+window.location.host;r.contentWindow.postMessage(t,i)}}},tC.switchDataSource=function(){var t="dcs8i7h6p00000om5mqog2xmv_9h5e",e=tC.internalvars.fulldomain;try{switch(e.toString().toLowerCase()){case"www.ite1.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ite2.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ute1.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ute2.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ute3.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.se2.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ave1.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ave2.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ae1.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ae2.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"www.ae3.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"mobile.klm.com":t="dcscayhhsuz5bdfycynyj8xcm_4q2r";break;case"livejms.klm.com":t="dcscayhhsuz5bdfycynyj8xcm_4q2r";break;case"kltest.mobileaware.com":t="dcslnjhji10000sx834b6fqms_1o8v";break;case"wannagives.klm.com":t="dcs0001kc100000cday3tyow0_6w4p";break;case"bookmobile.klm.com":t="dcscayhhsuz5bdfycynyj8xcm_4q2r";break;case"testwannagives2.klm.com":t="dcs0001kc100000cday3tyow0_6w4p";break;case"stage.ebuilders.nl":t="dcsw02gke10000gkyw16xkpms_9u6b";break;case"localhost":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"my.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"proxy.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"local.klm.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"flightguide-fe-dev.herokuapp.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"flightguide-fe-test.herokuapp.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"flightguide-fe-acc.herokuapp.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"followmybaggage-dev.herokuapp.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;case"followmybaggage-acc.herokuapp.com":t="dcs4z9qji9dv0hgshpyukkh36_2r3j";break;default:t="dcs8i7h6p00000om5mqog2xmv_9h5e"}e&&e.toString().toLowerCase().indexOf("airfrance")>-1&&(t=e.toString().toLowerCase().indexOf("bmw")>-1||e.toString().toLowerCase().indexOf("mobileaware")>-1?"dcsmnrpmv00000oym3l5kjqms_6j2v":e.toString().toLowerCase().indexOf("mobile.airfrance")>-1?"dcsygsma3wz5bdyigjqlayinm_5h1z":e.toString().toLowerCase().indexOf("b2c")>-1?"dcslekwvr10000stxfr3o9nkx_7c4f":"dcsb82wbr00000c5cqct20nkx_9u3w")}catch(n){}finally{return t}},tC.calculateValues=function(t){return t=tC.calculateAppVersion(t),t=tC.calculatePassengers(t),t=tC.calculateDates(t)},tC.calculateAppVersion=function(t){try{if(void 0!==t.z_app_version){var e=t.z_app_version.split(";");t.z_app_version=e[0]}t.z_tc_version=tC.id_container+"_"+tC.containerVersion,(tC.saywho?tC.sayswho.indexOf("PTST"):-1)>-1&&(t.z_testtool="speedcurve")}catch(n){}finally{return t}},tC.calculatePassengers=function(t){try{var e=0;void 0!==t.z_adult?e+=parseInt(t.z_adult,10):void 0!==t.z_ebt_adult?e+=parseInt(t.z_ebt_adult,10):void 0!==t.z_nb_adults&&(e+=parseInt(t.z_nb_adults,10)),void 0!==t.z_child?e+=parseInt(t.z_child,10):void 0!==t.z_ebt_child?e+=parseInt(t.z_ebt_child,10):void 0!==t.z_nb_children&&(e+=parseInt(t.z_nb_children,10)),tC.internalvars.passenger=e,t.z_passenger=e,tc_vars.z_passenger=e;"undefined"==typeof tc_vars.tx_u&&"undefined"!==tc_vars.z_widget&&"undefined"!==tc_vars.ti&&"calendar ebt"===tc_vars.z_widget.toLowerCase()&&"flight summary"==tc_vars.ti.toLowerCase()&&(t.tx_u=e,tc_vars.tx_u=e)}catch(n){}finally{return t}},tC.calculateDates=function(t){try{var e=!1,n=!1,r=864e5;if(void 0!==t.z_ebt_departuredate?e=t.z_ebt_departuredate:void 0!==t.z_departure_date&&(e=t.z_departure_date),void 0!==t.z_ebt_returndate?n=t.z_ebt_returndate:void 0!==t.z_return_date&&(n=t.z_return_date),e!==!1){var a=new Date(e.replace(/-/g,"/")),i=new Date,o=Math.abs(a.getTime()-i.getTime());if(tC.internalvars.daysBeforeFlight=Math.round(o/r),t.z_day_before_flight=tC.internalvars.daysBeforeFlight,tc_vars.z_day_before_flight=tC.internalvars.daysBeforeFlight,n!==!1){var s=new Date(n.replace(/-/g,"/")),c=Math.abs(s.getTime()-a.getTime());tC.internalvars.stayDuration=Math.round(c/r),t.z_stay_duration=tC.internalvars.stayDuration,tc_vars.z_stay_duration=tC.internalvars.stayDuration}}}catch(l){}finally{return t}},tC.sayswho=function(){var t,e=navigator.userAgent,n=e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(n[1])?(t=/\brv[ :]+(\d+)/g.exec(e)||[],"IE "+(t[1]||"")):"Chrome"===n[1]&&(t=e.match(/\bOPR\/(\d+)/),null!=t)?"Opera "+t[1]:(n=n[2]?[n[1],n[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(t=e.match(/version\/(\d+)/i))&&n.splice(1,1,t[1]),n.join(" "))}(),/*END_CUSTOM_JS_BLOCK1*/
tC.array_launched_tags=[],tC.array_launched_tags_keys=[],tC.id_site="395",tC.internalFunctions.tc_function_6=function(t,e,n){return t.replace(new RegExp(e,"g"),n)},tC.internalFunctions.tc_function_14=function(t){return t.length>=8?t.substr(4,2)+"/"+t.substr(6,2)+"/"+t.substr(0,4):""},1==tC.getCookie("tc_mode_test"))!function(){var t=document.createElement("script");t.type="text/javascript",t.src="//manager.tagcommander.com/utils/test_mode_include.php?id=41&site=395&type=load&rand="+Math.random()+"&version=",(document.getElementsByTagName("body")[0]||document.getElementsByTagName("head")[0]||document.getElementsByTagName("script")[0].parentNode).appendChild(t)}();else{/*VARIABLES_BLOCK*/
tC.internalvars.maindomain="";var tmp1=window.location.hostname.split(".");1==tmp1.length?tC.internalvars.maindomain=tmp1[0]:tmp1[tmp1.length-3].length<=2?tC.internalvars.maindomain="."+tmp1[tmp1.length-3]+"."+tmp1[tmp1.length-2]+"."+tmp1[tmp1.length-1]:tC.internalvars.maindomain="."+tmp1[tmp1.length-2]+"."+tmp1[tmp1.length-1],tC.internalvars.pathname="",tC.internalvars.pathname=window.location.pathname,tC.internalvars.language="","undefined"!=typeof jQuery&&(tC.internalvars.language=jQuery("html body#body.portrait div table tbody tr td a").eq(0).attr("href"),tC.internalvars.language=null!=tC.internalvars.language?tC.internalvars.language.match(/lang=([^&]*)/):[],tC.internalvars.language=null!=tC.internalvars.language&&tC.internalvars.language.length>1?jQuery.trim(tC.internalvars.language[1]):"");try{tC.internalvars.origDest=tc_vars.origin+""+tc_vars.destination}catch(eignore){}if(tC.internalvars.fulldomain=window.location.hostname,tC.internalvars.timestamp=Math.round((new Date).getTime()/1e3),tC.internalvars.WTMCID=tC.getParamURL("WT.mc_id",document.location.href).split("_"),tC.internalvars.WTMCIDLocalisation=tC.internalvars.WTMCID[0],tC.internalvars.WTMCIDCountry=tC.internalvars.WTMCID[1],tC.internalvars.WTMCIDChannel=tC.internalvars.WTMCID[2],tC.internalvars.WTMCIDPartner=tC.internalvars.WTMCID[3],tC.internalvars.WTMCIDMarketingProgram=tC.internalvars.WTMCID[4],tC.internalvars.WTMCIDOffer=tC.internalvars.WTMCID[5],tC.internalvars.WTMCIDCmpName=tC.internalvars.WTMCID[6],tC.internalvars.WTMCIDOther=tC.internalvars.WTMCID[7],tC.internalvars.EBT7="","undefined"!=typeof tc_vars.si_n&&(tC.internalvars.TmpDetect=tc_vars.si_n.split(";"),"EBT7 Funnel"!=tC.internalvars.TmpDetect[0]&&"EBT7 Funnel"!=tC.internalvars.TmpDetect[1]||(tC.internalvars.EBT7="true")),tC.internalvars.six="","undefined"!=typeof tc_vars.si_x&&(tC.internalvars.TmpDetectSix=tc_vars.si_x.split(";"),1==tC.internalvars.TmpDetectSix.length?tC.internalvars.six=tC.internalvars.TmpDetectSix[0].replace(/^\s+|\s+$/g,""):tC.internalvars.six=tC.internalvars.TmpDetectSix[1].replace(/^\s+|\s+$/g,"")),tC.internalvars.revInclYQ=0,"undefined"!==tc_vars.pnr_sales_value){var salesValue=parseInt(tc_vars.pnr_sales_value,10);isNaN(salesValue)||(tC.internalvars.revInclYQ=tC.internalvars.revInclYQ+salesValue)}if("undefined"!==tc_vars.tax){var tax=parseInt(tc_vars.z_tax,10);isNaN(tax)||(tC.internalvars.revInclYQ=tC.internalvars.revInclYQ-tax)}tC.internalvars.duration="",tC.internalvars.ebt9="",-1!=window.top.location.toString().toLowerCase().indexOf("mytrip/overview.xhtml".toLowerCase())&&(tC.internalvars.ebt9="true"),tC.internalvars.formerEBTHP="","KLM - Royal Dutch Airlines - KLM.com"==document.title&&"Tridion"==tc_vars.z_application&&(tC.internalvars.formerEBTHP="true"),tC.extend({getPnrSalesValue:function(t){for(var e=0,n=[t.z_base_fare,t.z_booking_fee,t.z_carrier_surcharge],r=0;r<n.length;r++)void 0!==n[r]&&""!==n[r]&&(e+=parseInt(n[r]));return e}}),tC.internalvars.pnrSalesValue=tC.getPnrSalesValue(tc_vars),tc_vars.pnr_sales_value=tC.internalvars.pnrSalesValue,tC.internalvars.ebtPath="/travel/generic/static/js/tagcommander",tC.internalvars.randomNum=Math.random(),void 0!==tc_vars.z_destination?tC.internalvars.dest=tc_vars.z_destination:void 0!==tc_vars.z_ebt_destination&&(tC.internalvars.dest=tc_vars.z_ebt_destination),void 0!==tc_vars.z_origin?tC.internalvars.origin=tc_vars.z_origin:void 0!==tc_vars.z_ebt_origin&&(tC.internalvars.origin=tc_vars.z_ebt_origin),void 0!==tc_vars.z_destination?tC.internalvars.dest=tc_vars.z_destination:void 0!==tc_vars.z_ebt_destination&&(tC.internalvars.dest=tc_vars.z_ebt_destination),void 0!==tc_vars.z_origin?tC.internalvars.origin=tc_vars.z_origin:void 0!==tc_vars.z_ebt_origin&&(tC.internalvars.origin=tc_vars.z_ebt_origin),void 0!==tc_vars.z_departure_date?tC.internalvars.departureDate=tc_vars.z_departure_date:void 0!==tc_vars.z_departuredate?tC.internalvars.departureDate=tc_vars.z_departuredate:void 0!==tc_vars.z_ebt_departure_date?tC.internalvars.departureDate=tc_vars.z_ebt_departure_date:void 0!==tc_vars.z_ebt_departuredate&&(tC.internalvars.departureDate=tc_vars.z_ebt_departuredate),void 0!==tc_vars.z_return_date?tC.internalvars.returnDate=tc_vars.z_return_date:void 0!==tc_vars.z_returndate?tC.internalvars.returnDate=tc_vars.z_returndate:void 0!==tc_vars.z_ebt_return_date?tC.internalvars.returnDate=tc_vars.z_ebt_return_date:void 0!==tc_vars.z_ebt_returndate&&(tC.internalvars.returnDate=tc_vars.z_ebt_returndate),tC.internalvars.passenger=0,void 0!==tc_vars.z_adult?tC.internalvars.passenger+=parseInt(tc_vars.z_adult,10):void 0!==tc_vars.z_ebt_adult?tC.internalvars.passenger+=parseInt(tc_vars.z_ebt_adult,10):void 0!==tc_vars.z_nb_adults&&(tC.internalvars.passenger+=parseInt(tc_vars.z_nb_adults,10)),void 0!==tc_vars.z_child?tC.internalvars.passenger+=parseInt(tc_vars.z_child,10):void 0!==tc_vars.z_ebt_child?tC.internalvars.passenger+=parseInt(tc_vars.z_ebt_child,10):void 0!==tc_vars.z_nb_children&&(tC.internalvars.passenger+=parseInt(tc_vars.z_nb_children,10)),tc_vars.z_passenger=tC.internalvars.passenger,void 0!==tc_vars.z_currency?tC.internalvars.currency=tc_vars.z_currency:void 0!==tc_vars.z_ebt_currency&&(tC.internalvars.currency=tc_vars.z_ebt_currency),tC.internalvars.revenueWithTax=0,void 0!==tc_vars.pnr_sales_value&&(tC.internalvars.revenueWithTax+=parseInt(tc_vars.pnr_sales_value,10)),void 0!==tc_vars.z_tax&&(tC.internalvars.revenueWithTax+=parseInt(tc_vars.z_tax,10)),tC.internalvars.tifDlpFlightOffers=!1,void 0!==tc_vars.z_application&&"tif"===tc_vars.z_application.toLowerCase()&&(tC.internalvars.tifDlpFlightOffers="true"),void 0!==tc_vars.z_application&&"dlp"===tc_vars.z_application.toLowerCase()&&(tC.internalvars.tifDlpFlightOffers="true"),void 0!==tc_vars.cg_s&&"flight_offers"===tc_vars.cg_s.toLowerCase()&&(tC.internalvars.tifDlpFlightOffers="true"),void 0!==tc_vars.cg_s1&&"flight_offers"===tc_vars.cg_s1.toLowerCase()&&(tC.internalvars.tifDlpFlightOffers="true"),tC.internalvars.cabinClass="",void 0!==tc_vars.z_cabin_class?tC.internalvars.cabinClass=tc_vars.z_cabin_class:void 0!==tc_vars.z_Travel_class&&(tC.internalvars.cabinClass=tc_vars.z_Travel_class);try{if(void 0!==tC.internalvars.departureDate){var ONE_DAY=864e5,now=new Date,departureDate=new Date(tC.internalvars.departureDate.replace(/-/g,"/")),difference_ms=Math.abs(departureDate.getTime()-now.getTime());tc_vars.z_day_before_flight=Math.round(difference_ms/ONE_DAY),tC.internalvars.daysBeforeFlight=Math.round(difference_ms/ONE_DAY),tc_vars.z_day_before_flight=tC.internalvars.daysBeforeFlight}}catch(e){}try{if(void 0!==tC.internalvars.departureDate&&void 0!==tC.internalvars.returnDate){var ONE_DAY=864e5,returnDate=new Date(tC.internalvars.returnDate.replace(/-/g,"/")),departureDate=new Date(tC.internalvars.departureDate.replace(/-/g,"/")),difference_ms=Math.abs(returnDate.getTime()-departureDate.getTime());tC.internalvars.stayDuration=Math.round(difference_ms/ONE_DAY)+1,tc_vars.z_stay_duration=tC.internalvars.stayDuration}}catch(e){}try{if(void 0!==tC.internalvars.departureDate){for(var dateParts=tC.internalvars.departureDate.split("-"),year,i=0;i<dateParts.length;i++)4===dateParts[i].length&&(year=dateParts[i].slice(2,4));tC.internalvars.havasDepartureDate=dateParts[2]+dateParts[1]+year}}catch(e){}try{if(void 0!==tC.internalvars.returnDate){for(var dateParts=tC.internalvars.returnDate.split("-"),year,i=0;i<dateParts.length;i++)4===dateParts[i].length&&(year=dateParts[i].slice(2,4));tC.internalvars.havasReturnDate=dateParts[2]+dateParts[1]+year}}catch(e){}if(void 0!==tc_vars.z_pnr_total_value){var dotPos=tc_vars.z_pnr_total_value.toString().indexOf("."),numOfFiguresBehindComma=tc_vars.z_pnr_total_value.toString().length-dotPos;if(0>dotPos)tC.internalvars.pnrRound=tc_vars.z_pnr_total_value+".000";else if(4>numOfFiguresBehindComma){tC.internalvars.pnrRound=tc_vars.z_pnr_total_value;for(var i=numOfFiguresBehindComma;4>i;i++)tC.internalvars.pnrRound+="0"}else tC.internalvars.pnrRound=tc_vars.z_pnr_total_value.slice(0,dotPos+4)}if(void 0!==tc_vars.z_base_fare){var dotPos=tc_vars.z_base_fare.toString().indexOf("."),numOfFiguresBehindComma=tc_vars.z_base_fare.toString().length-dotPos;if(0>dotPos)tC.internalvars.baseFareRound=tc_vars.z_base_fare+".000";else if(4>numOfFiguresBehindComma){tC.internalvars.baseFareRound=tc_vars.z_base_fare;for(var i=numOfFiguresBehindComma;4>i;i++)tC.internalvars.baseFareRound+="0"}else tC.internalvars.baseFareRound=tc_vars.z_base_fare.slice(0,dotPos+4)}if(tC.internalvars.searchFunnel=!1,tC.internalvars.searchFunnel="","undefined"!=typeof tc_vars.si_n){var widgets=tc_vars.si_n.split(";"),steps=tc_vars.si_x.split(";");if(tc_vars.si_n.indexOf("calendar widget")>-1){tC.internalvars.searchFunnel="true";for(var i=0;i<widgets.length;i++)tC.internalvars.searchStep=parseInt(steps[i],10)}}tC.internalvars.businessDeals=!1,void 0!==tc_vars.ti&&("business_deals"!==tc_vars.ti.toLowerCase()&&"business deals"!==tc_vars.ti.toLowerCase()||(tC.internalvars.businessDeals=!0)),tC.internalvars.device="",navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)?screen.width>=480&&screen.height>=800||screen.width>=800&&screen.height>=480||navigator.userAgent.match(/ipad/gi)?tC.internalvars.device="tablet":tC.internalvars.device="mobile":tC.internalvars.device="desktop",tC.internalvars.ICI="","undefined"!==tc_vars.z_application&&(tC.internalvars.ICI=tc_vars.z_application),tC.internalvars.newEbtPath="/ams/tms/tms/static/js/tagcommander"}
//----------------------------------------------------
//----
1==tC.getCookie("tc_mode_test")?(!function(){var t=document.createElement("script");t.type="text/javascript",t.src="//manager.tagcommander.com/utils/test_mode_include.php?id=41&site=395&type=exec&rand="+Math.random()+"&version=56.04",(document.getElementsByTagName("body")[0]||document.getElementsByTagName("head")[0]||document.getElementsByTagName("script")[0].parentNode).appendChild(t)}(),function(){setTimeout(function(){"undefined"!=typeof top.tc_count?top.tc_count++:top.tc_count=1;var t=document.createElement("script");t.type="text/javascript",t.src="//manager.tagcommander.com/utils/livetest/bookmarklet.php?r="+Math.random()+"&nb="+top.tc_count+"&container=395!41&version=56.04",(document.getElementsByTagName("body")[0]||document.getElementsByTagName("head")[0]||document.getElementsByTagName("script")[0].parentNode).appendChild(t)},1e3)}()):(tC.dedup.ValidRules("7168")&&("true"==tC.internalvars.EBT7&&"7"==tC.internalvars.six||"true"==tC.internalvars.EBT7&&"8"==tC.internalvars.six)&&(tC.launchTag("7168","AMS V3 - Get dedup cookie","900","395","41"),tC.onDomReady(function(){var t=tC.getCookie("TCBlockedScripts"),e="tc_script_ams_v3_1",n=document.getElementById(e);if(!tC.isblockedScripts(e)&&!n){var r="//klm.commander1.com/dg3/";"undefined"!=typeof tC.dedup.cj_max&&(r+="?limit="+tC.dedup.cj_max),tC.addScript(r,e,function(n){if("success"===n);else if("timeout"===n){var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}else{var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}},tC.scriptTimeout)}})),tC.dedup.ValidRules("7164")&&"9"!=tc_vars.si_x&&"EBT7"!=tc_vars.z_application&&(tC.launchTag("7164","AMS V3 - Click + Site Tracking","1099","395","41"),"object"!=typeof tC.ams&&(tC.ams=[]),tC.onDomReady(function(){tC.ams.page_name=tc_vars.ti,tC.ams.page_type=tc_vars.cg_s,tC.ams.channel=tC.internalvars.WTMCIDChannel,tC.ams.source=tC.internalvars.WTMCIDPartner,tC.ams.campaign=tC.internalvars.WTMCIDCmpName,tC.ams.medium=tC.getParamURL("WT.srch"),tC.ams.dns="klm.commander1.com",tC.ams.sbrand=[],tC.ams.sbrand[0]="",tC.ams.sbrand[1]="",tC.ams.sbrand[2]="",tC.ams.sbrand[3]="",tC.ams.id_site="395",tC.ams.additional_params="&lcl="+tC.internalvars.WTMCIDLocalisation+"&ctry="+tC.internalvars.WTMCIDCountry+"&prtn_pub="+tC.internalvars.WTMCIDPartner+"&mktg_prg="+tC.internalvars.WTMCIDMarketingProgram+"&oth="+tC.internalvars.WTMCIDOther+"&off="+tC.internalvars.WTMCIDOffer;var t=tC.getCookie("TCBlockedScripts"),e="tc_script_ams_v3_2",n=document.getElementById(e);if(!tC.isblockedScripts(e)&&!n){var r="//cdn.tagcommander.com/ams/ams_klm.js";tC.addScript(r,e,function(n){if("success"===n){var r=document.getElementById(e);tC.ams.scriptElt1=r}else if("timeout"===n){var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}else{var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}},tC.scriptTimeout)}})),tC.dedup.ValidRules("7781")&&"EBT7"==tc_vars.z_application&&"9"==tc_vars.si_x&&(tC.launchTag("7781","AMS V3 - Site Tracking Only","1651","395","41"),"object"!=typeof tC.ams&&(tC.ams=[]),tC.onDomReady(function(){tC.ams.dns="klm.commander1.com",tC.ams.id_site="395",tC.ams.page_name=tc_vars.ti,tC.ams.page_type=tc_vars.cg_s,tC.ams.rand=Math.random(),tC.ams.additional_params="",tC.ams.px=new Image,tC.ams.px.id="tc_img__1",tC.ams.src="","undefined"!=typeof tC.ams.page_name&&null!=tC.ams.page_name&&""!=tC.ams.page_name&&(tC.ams.src+="&p="+tC.ams.page_name),"undefined"!=typeof tC.ams.page_type&&null!=tC.ams.page_type&&""!=tC.ams.page_type&&(tC.ams.src+="&pt="+tC.ams.page_type),"undefined"!=typeof tC.ams.additional_params&&null!=tC.ams.additional_params&&""!=tC.ams.additional_params&&(tC.ams.src+=tC.ams.additional_params),tC.ams.hdoc="";try{"undefined"!=typeof top&&"undefined"!=typeof top.document&&(tC.ams.hdoc=top.document)}catch(t){}""===tC.ams.hdoc&&(tC.ams.hdoc=document),"undefined"!=typeof tC.ams.hdoc.referrer&&null!=tC.ams.hdoc.referrer&&""!=tC.ams.hdoc.referrer&&(-1!=tC.ams.hdoc.referrer.indexOf("?")?tC.ams.src+="&ref="+tC.ams.hdoc.referrer.substr(0,tC.ams.hdoc.referrer.indexOf("?")):tC.ams.src+="&ref="+tC.ams.hdoc.referrer),tC.ams.px.src="//"+tC.ams.dns+"/s3/?tcs="+tC.ams.id_site+"&rand="+tC.ams.rand+tC.ams.src,(document.getElementsByTagName("body")[0]||document.getElementsByTagName("head")[0]).appendChild(tC.ams.px)})),tC.dedup.ValidRules("7663")&&-1==document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase())&&(tC.launchTag("7663","Qmon","72","395","41"),function(){var t=tC.getCookie("TCBlockedScripts"),e="tc_script_qmon";if(!tC.isblockedScripts(e)){var n="www.klm.com";document.createElement("script");(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(n=tC.internalvars.fulldomain);var r="//"+n+"/travel/generic/static/js/tagcommander/qmon.js";tC.addScript(r,e,function(n){if("success"===n);else if("timeout"===n){var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}else{var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}},tC.scriptTimeout)}}()),tC.dedup.ValidRules("7665")&&-1==document.location.toString().toLowerCase().indexOf("airfrance".toLowerCase())&&(tC.launchTag("7665","Synovite","72","395","41"),function(){var t=tC.getCookie("TCBlockedScripts"),e="tc_script_synovite",n=document.getElementById(e);if(!tC.isblockedScripts(e)&&!n){window._tmsQueue=window._tmsQueue||[];var r="www.klm.com";document.createElement("script");(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(r=tC.internalvars.fulldomain);var a="//"+r+"/ams/tms/tms/static/js/tms_bootstrap.js";tC.addScript(a,e,function(n){if("success"===n);else if("timeout"===n){var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}else{var r=document.getElementById(e),a=document.getElementById(e).parentNode;a.removeChild(r),document.cookie="TCBlockedScripts="+t+"&"+e}},tC.scriptTimeout)}}()),tC.dedup.ValidRules("7775")&&(tC.launchTag("7775","webtrends","72","395","41"),function(){tC.tcms=tC.tcms||{},tC.tcms.WebtrendsTag=function(){var t,e=[],n=function(t,e){if([].indexOf)return t.indexOf(e);0>e&&(e=0);for(var n=0;n<t.length;n++)if(t[n]===e)return n;return-1},r=function(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n].from===e)return n;return-1},a=function(t){var e,a,i,o=t,s=["application","country","language","host","widget","destination","event","eventvalue"],c=["z_passenger","z_deeplink","z_deeplink_actualprice","z_deeplink_channel","z_destination","z_error_application","z_error_code","z_outbound_price","z_origin","z_pos","z_trip","z_error_erroropexlink","z_payment_type","z_return_date","z_base_fare","z_datedifference"],l=["z_country"],u=["z_language"],d=[{from:"z_cabin_code",to:"z_Travel_class"},{from:"z_Travel_class",to:"z_cabin_code"},{from:"z_carrier_surcharge",to:"z_fuel_surcharge"},{from:"z_day_before_flight",to:"z_ebt_daybeforeflight"},{from:"z_nb_children",to:"z_ebt_child"},{from:"z_nb_infants",to:"z_ebt_infant"},{from:"z_nb_adults",to:"z_ebt_adult"},{from:"z_outbound_flight_durations",to:"z_ebt_outbound_journeyduration"},{from:"z_outbound_numbers_of_stops",to:"z_ebt_outbound_numberofstops"},{from:"z_inbound_flight_durations",to:"z_ebt_inbound_journeyduration"},{from:"z_inbound_numbers_of_stops",to:"z_ebt_inbound_numberofstops"},{from:"z_pnr_total_value",to:"z_ebt_pnrpaidvalue"},{from:"z_trip_type",to:"z_trip"},{from:"product_prices",to:"tx_s"},{from:"PNR_number",to:"tx_i"},{from:"booking_time",to:"tx_it"},{from:"booking_date",to:"tx_id"},{from:"z_paymentfee",to:"z_ebt_paymentfee"},{from:"z_stay_duration",to:"z_ebt_travelperiod"},{from:"z_outbound_transfer_time",to:"z_outbound_transfer_time"},{from:"z_flexibilitywaiver",to:"z_flexibilitywaiver"}],p=[{from:"z_ebt_return_date",to:"z_ebt_returndate"},{from:"z_ebt_trip",to:"z_trip"},{from:"z_ebt_base_fare",to:"z_ebt_basefare"}];for(e in t)n(s,e)>=0&&(o["z_"+e]=t[e],delete o[e],e="z_"+e),n(c,e)>=0&&(tC.log(e),a=e.replace("z_","z_ebt_"),o[a]=t[e],e=a),n(l,e)>=0&&(o[e]=o[e].toUpperCase()),n(u,e)>=0&&(o[e]=o[e].toLowerCase()),i=r(d,e),i>=0&&(tC.log(e),a=d[i].to,o[a]=t[e],e=a),i=r(p,e),i>=0&&(tC.log(e),a=p[i].to,o[a]=t[e],delete o[e],e=a);return tC.log("latest object",o),o},i=function(t){var e,n,r=["z_country"],i=["z_language"];if("EBT7"==t.application||"EBT7"==t.z_application||"ebt7"==tC.tcms.utils.lowerCase(t.z_application)||"ebt7"==tC.tcms.utils.lowerCase(t.application))e=a(t);else{for(e=t,n=0;n<r.length;n++)e[r[n]]&&(e[r[n]]=e[r[n]].toUpperCase());for(n=0;n<i.length;n++)e[i[n]]&&(e[i[n]]=e[i[n]].toLowerCase())}return e},o=function(t,e){var n,r=e.split("?")[0],a=[],i=-1!==e.indexOf("?")?e.split("?")[1]:"";if(""!==i){a=i.split("&");for(var o=a.length-1;o>=0;o-=1)n=a[o].split("=")[0],n===t&&a.splice(o,1);r=r+"?"+a.join("&")}return r},s=function(n){if(t){var r=i(n),a=[];for(var s in r)r.hasOwnProperty(s)&&(a.push("WT."+s),a.push(""+(void 0===r[s]||""===r[s]?" ":r[s])),tC.internalvars.tc_urlparams+=s+"="+r[s]+"&");if("EBT7"==r.application||"EBT7"==r.z_application){var c=tC.sayswho;if(tC.internalvars.tc_urlparams.length>900&&("MSIE 9"==c||"MSIE 8"==c||"MSIE 7"==c)){for(var l=tC.internalvars.tc_urlparams,u=0;u<extraIEVars.length;u++)l=o(extraIEVars[u],l),a[extraIEVars[u]]=void 0;tC.internalvars.tc_urlparams=l}}return t.dcsMultiTrack.apply(t,a),r}e.push(arguments)},c=function(){for(var t=0,n=e.length;n>t;t++)s.apply(void 0,e[t]);e=[]},l=function(e){window.webtrendsAsyncInit=function(){t=(new Webtrends.dcs).init({dcsid:tC.switchDataSource(),domain:"statse.webtrendslive.com",timezone:1,i18n:!0,download:!0,downloadtypes:"xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip",anchor:!1,javascript:!1,dcsdelay:25,fpcdom:tC.internalvars.maindomain,plugins:{}}),c()},function(){var t="www.klm.com";(window.location.host.indexOf(".ite")>-1||window.location.host.indexOf(".ute")>-1)&&(t=tC.internalvars.fulldomain);var e=document.createElement("script");e.async=!0,e.src="//"+t+"/ams/tms/tms/static/js/tagcommander/webtrends.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}()};return l(),{measureData:s,tagManipulation:i}}()}()));