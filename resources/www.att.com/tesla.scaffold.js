/**
 * TESLA scaffold file - tesla.scaffold.js
 * Tesla scaffold file loads tesla dependency files (tesla.theme.css, tesla.ie.js [if browser IE], tesla.zepto.js, tesla.zepto.modules.js, tesla.core.js)
 * Created on 6/6/2015 by Team Tesla (teamtesla at list dot att dot com)
 * Updated on 11/17/2015 by Team Tesla (teamtesla at list dot att dot com)
 * Version 2.0
 * Consumer Digital IT Solutions
 * External JS Dependencies: none
 */

/**
 * Tesla FUNCTIONS
 */
/**
 * LazyLoad script loader
 */
/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */
/**
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
*/
LazyLoad=function(e){function t(t,n){var s,c=e.createElement(t);for(s in n)n.hasOwnProperty(s)&&c.setAttribute(s,n[s]);return c}function n(e){var t,n,s=i[e];s&&(t=s.callback,n=s.urls,n.shift(),u=0,n.length||(t&&t.call(s.context,s.obj),i[e]=null,f[e].length&&c(e)))}function s(){var t=navigator.userAgent;o={async:e.createElement("script").async===!0},(o.webkit=/AppleWebKit\//.test(t))||(o.ie=/MSIE|Trident/.test(t))||(o.opera=/Opera/.test(t))||(o.gecko=/Gecko\//.test(t))||(o.unknown=!0)}function c(c,u,h,g,d){var y,p,b,k,m,v,j=function(){n(c)},w="css"===c,T=[];if(o||s(),u)if(u="string"==typeof u?[u]:u.concat(),w||o.async||o.gecko||o.opera)f[c].push({urls:u,callback:h,obj:g,context:d});else for(y=0,p=u.length;p>y;++y)f[c].push({urls:[u[y]],callback:y===p-1?h:null,obj:g,context:d});if(!i[c]&&(k=i[c]=f[c].shift())){for(l||(l=e.head||e.getElementsByTagName("head")[0]),m=k.urls.concat(),y=0,p=m.length;p>y;++y)v=m[y],w?b=o.gecko?t("style"):t("link",{href:v,rel:"stylesheet"}):(b=t("script",{src:v}),b.async=!1),b.className="lazyload",b.setAttribute("charset","utf-8"),o.ie&&!w&&"onreadystatechange"in b&&!("draggable"in b)?b.onreadystatechange=function(){/loaded|complete/.test(b.readyState)&&(b.onreadystatechange=null,j())}:w&&(o.gecko||o.webkit)?o.webkit?(k.urls[y]=b.href,r()):(b.innerHTML='@import "'+v+'";',a(b)):b.onload=b.onerror=j,T.push(b);for(y=0,p=T.length;p>y;++y)l.appendChild(T[y])}}function a(e){var t;try{t=!!e.sheet.cssRules}catch(s){return u+=1,void(200>u?setTimeout(function(){a(e)},50):t&&n("css"))}n("css")}function r(){var e,t=i.css;if(t){for(e=h.length;--e>=0;)if(h[e].href===t.urls[0]){n("css");break}u+=1,t&&(200>u?setTimeout(r,50):n("css"))}}var o,l,i={},u=0,f={css:[],js:[]},h=e.styleSheets;return{css:function(e,t,n,s){c("css",e,t,n,s)},js:function(e,t,n,s){c("js",e,t,n,s)}}}(this.document);

/**
 * TESLASCAFFOLD Object Literal
 */
window.TESLASCAFFOLD = {
	teslaVersion: "2.0",
	teslaFilesLocation: "",
	teslaIsIE8: false,
	// Check for Tesla Debug
	//location.search.split('teslaDebug=')[1] ? location.search.split('teslaDebug=')[1] : false,
	/**
	 * Tesla detect IE
	 * returns version of IE or false, if browser is not Internet Explorer
	 */
	/* Undefined*/
	is_android_tablet: false,
	is_ipad_tablet: false,
	teslaDetectDebug: function() {
		if(location.search.split('teslaDebug=')[1]) {
			if((location.search.split('teslaDebug=')[1]).toLowerCase() == "true") {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	teslaDetectIE: function() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
		    // IE 10 or older => return version number
			
			//Check for IE8
			TESLASCAFFOLD.teslaIsIE8 = /MSIE 8/i.test(ua);
		    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}
		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
		    // IE 11 => return version number
		    var rv = ua.indexOf('rv:');
		    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}
		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
		   // IE 12 => return version number
		   return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		// other browser
		return false;
	},
	getUrlBase: function() {
		return window.location.protocol.split(':')[0] + '://' + window.location.host + '/';
	},
	getUrlSource: function() {
		return window.location.protocol.replace(/\:/g,'') + '://' + window.location.host + window.location.pathname;
	},
	getUrlHostname: function() {
		return window.document.location.hostname;
	},
	getUrlHost: function() {
		return window.document.location.host;
	},
	getUrlRelative: function() {
		return window.document.location.pathname;
	},
	in_array: function(needle, haystack){
	    var found = 0;
	    for (var i=0, len=haystack.length;i<len;i++) {
	        if (haystack[i] == needle) return i;
	            found++;
	    }
	    return -1;
	},
	is_tablet: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		TESLASCAFFOLD.is_android_tablet = /android|!mobile/.test(ua);
		TESLASCAFFOLD.is_ipad_tablet = /ipad/.test(ua);
		if(TESLASCAFFOLD.is_android_tablet || TESLASCAFFOLD.is_ipad_tablet) {
			return true;
		} else {
			return false;
		}
		
	},
	is_adobeDDOPresent: function() {
		if(typeof ddo != 'undefined') {
			// DTM Object present
			return true;
		} else {
			return false;
		}
	},
	is_adobeDMIPresent: function() {
		if(typeof DataMappingInterface != 'undefined') {
			// DTM Object present
			return true;
		} else {
			return false;
		}
	},
	teslaScaffoldHost: function() {
		var script = document.currentScript || (function() {
		      var scripts = document.getElementsByTagName('script');
		      return scripts[scripts.length - 1];
		    })();
		var currentSrc = script.getAttribute('src');
		var location = document.createElement("a");
	    location.href = currentSrc;
	    if (location.host == "") {
	        location.href = location.href;
	    }
	    var thisProtocol = location.protocol;
		var thisHost = location.hostname+(location.port > 0 ? ':'+location.port: '');
		var fullPath = thisProtocol+'//'+thisHost;
		return fullPath;
	},
	teslaFolderLocation: function() {
		if (globalNavDefaultSelections.string_set_teslaFolder) {
			return globalNavDefaultSelections.string_set_teslaFolder.replace(/^\/|\/$/g, '');
		} else {
			// Use Default location - globalnav/tesla
			return "globalnav/tesla";
		}
	}
}
var appfullpath = TESLASCAFFOLD.getUrlRelative();
var apppathArr = appfullpath.split("/");
var apppathName = apppathArr[1];
var apppathName = apppathName.toLowerCase();
var teslaDebug = TESLASCAFFOLD.teslaDetectDebug();
TESLASCAFFOLD.teslaFolder = TESLASCAFFOLD.teslaFolderLocation();
// Absolute or Relative path to Tesla assets
if (globalNavDefaultSelections.string_set_teslaHost) {
	if(globalNavDefaultSelections.string_set_teslaHost.indexOf('http') != -1 || globalNavDefaultSelections.string_set_teslaHost.indexOf('//') != -1 || globalNavDefaultSelections.string_set_teslaHost.indexOf('.') != -1) {	
		// Test for protocol
		if(globalNavDefaultSelections.string_set_teslaHost.indexOf('http') != -1) {
			TESLASCAFFOLD.teslaFilesLocation = globalNavDefaultSelections.string_set_teslaHost;
		} else if(globalNavDefaultSelections.string_set_teslaHost.indexOf('//') != -1) {
			TESLASCAFFOLD.teslaFilesLocation = globalNavDefaultSelections.string_set_teslaHost;
		} else {
			// Add http
			TESLASCAFFOLD.teslaFilesLocation = '//'+globalNavDefaultSelections.string_set_teslaHost;
		}
	} else {
		TESLASCAFFOLD.teslaFilesLocation = TESLASCAFFOLD.teslaScaffoldHost();
	}
	// Remove trailing slash if present
	if(TESLASCAFFOLD.teslaFilesLocation.charAt(TESLASCAFFOLD.teslaFilesLocation.length-1) == "/"){ TESLASCAFFOLD.teslaFilesLocation = TESLASCAFFOLD.teslaFilesLocation.substr(0, TESLASCAFFOLD.teslaFilesLocation.length - 1);}
} else {
	// Load Tesla assets from the host of the tesla.scaffold.js file
	TESLASCAFFOLD.teslaFilesLocation = TESLASCAFFOLD.teslaScaffoldHost();
}

/**
 * Tesla Scaffold File Injection
 */
//Test for DTM files
if(!TESLASCAFFOLD.is_adobeDDOPresent()) { 
	// Load All Tesla's DTM Files 
	LazyLoad.js(['//www.att.com/scripts/adobe/edmDataManager.js', '//www.att.com/scripts/adobe/edmDataDefinition.js'], function () {}); 
}
if(!TESLASCAFFOLD.is_adobeDMIPresent()) { 
	// Load All Tesla's DTM Files 
	LazyLoad.js('//www.att.com/scripts/adobe/dataMappingFramework.min.js', function () {}); 
}
// Load CSS
if(!teslaDebug) {
	LazyLoad.css(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/themes/tesla.theme.min.css', function () {});
} else {
	LazyLoad.css(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/themes/tesla.theme.css', function () {});
}
// Load IRU CSS
	LazyLoad.css([TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/themes/tesla.theme.IRU.css'], function () {});
// Check if IE for Special IE CSS
if (TESLASCAFFOLD.teslaDetectIE()) {
	LazyLoad.css([TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/themes/tesla.theme.ie.css'], function () {});
}
// Check if Tablet for Special Tablet CSS
if (TESLASCAFFOLD.is_tablet()) {
	LazyLoad.css(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/themes/tesla.theme.tablet.css', function () {});
}
// Load JS
//Check if IE for Special IE JS
if (TESLASCAFFOLD.teslaDetectIE()) {
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.ie.js', function () {});
}
//Required Tesla Core
if(!teslaDebug) {
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/zepto/tesla.zepto.min.js', function () {});
} else {
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/zepto/tesla.zepto.js', function () {});
}
// Required Tesla support Module JS files
LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/zepto/tesla.zepto.modules.js', function () {});
             
if(!teslaDebug) {             
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/core/tesla.core.min.js', function () {});             
} else {
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/core/tesla.core.js', function () {}); 
}             
LazyLoad.js([TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.modules.adobe.js',
            TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.modules.searchform.js',
            TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.modules.IRU.js'], function () {});
// Modules
// Conditional to either load Tesla's User Info module or use the applications module
if (!globalNavDefaultSelections.boolean_load_module_userinfo) {
	// Tesla owned User Info Module
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.modules.userinfo.js', function () {});
}
// Conditional to load Tesla's Motionpoint module
if (globalNavDefaultSelections.boolean_set_turnOnMotionpoint) {
	// Tesla owned Motionpoint Module
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.modules.motionpoint.js', function () {});
}
//Tesla Hosted Application Module
if (globalNavDefaultSelections.string_load_module_name) {
	LazyLoad.js(TESLASCAFFOLD.teslaFilesLocation+'/'+TESLASCAFFOLD.teslaFolder+'/'+TESLASCAFFOLD.teslaVersion+'/modules/tesla.modules.'+globalNavDefaultSelections.string_load_module_name+'.js', function () {});
}
//Application Hosted Application Module
if (globalNavDefaultSelections.string_load_module_fullpath) {
	LazyLoad.js(globalNavDefaultSelections.string_load_module_fullpath, function () {});
}