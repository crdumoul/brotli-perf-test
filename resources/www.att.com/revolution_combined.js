/**********************************
 *	File: revolution_combined.js
 *	Includes functions for Unsupported Browser Message for AT&T
 *	Created on 10/9/2014 by Robert J. Butler rb205p@att.com
 *	Updated on 3/12/2015 Version 1.1.0.14 by Robert J. Butler rb205p@att.com
 *	Consumer Digital IT Solutions
 *	Developer: Robert J. Butler rb205p@att.com
*	JS Dependent on: EITHER TESLA Next Gen Nav /scripts/teslax.x.x/ge5p_3rdparty.js
 *	OR Page needs to load jQuery 1.5.2+ before this script
 **********************************/
 /* Versions
1.0.0 - Initial Revolution Release
1.1.0 - New GNSESS Key/Value pair conditional added to show/hide Revolution
*/
var Revolution = {
	init: function () {
		// COOKIE Check
		Revolution.rev_cookieName = 'GNSESS';
		Revolution.rev_cookieKey = 'REV';
		Revolution.compliant = 'Supported';
		Revolution.ie10plus = false;
		Revolution.OS == null;
		Revolution.rev_messageSeenAndClosed = false;
		// Native JSON
		Revolution.native_json_support = window.JSON && typeof JSON.stringify === 'function' && JSON.stringify(0) === '0' && !window.Prototype;
		// JSON.Stringify
		Revolution.rev_json_stringify = JSON.stringify;
		// Conditionals for cookie present and REV key & value
		if(Revolution.readCookie(Revolution.rev_cookieName)) {
			// Cookie is present so set to true
			Revolution.rev_cookiePresent = true;
			// Check Cookie for REV key & value
			var valueCookie = Revolution.readCookie(Revolution.rev_cookieName);
			if(typeof valueCookie == "object"){
				valueCookie = Revolution.safeToJSON(valueCookie);
			}
			var GNSESSObj = jQuery.parseJSON(valueCookie);
			var newObj = {};
			jQuery.each(GNSESSObj, function(key, val) {
				if(key == 'REV') {
					if (val == 'true') {
						Revolution.rev_messageSeenAndClosed = true;
					}
				}
			});	
		} else {
			// Cookie not present so set booleans
			Revolution.rev_cookiePresent = false;
			Revolution.rev_messageSeenAndClosed = false;
		}
		// UA
        Revolution.UA = navigator.userAgent.toLowerCase();
        Revolution.APPVer = navigator.appVersion.toLowerCase();
        // URL
        Revolution.rev_websiteurl = Revolution.getUrlSource();
		Revolution.rev_websiteurlBase = Revolution.getUrlBase();
		Revolution.rev_websiteurlSource = Revolution.getUrlSource();
		
		
		
		// new conditionals
		if(Revolution.rev_messageSeenAndClosed) {	
			// The message was seen and closed so do not show again
		} else {
			// The message was not seen and closed so show
			Revolution.UA_Arr = Revolution.UA.split(';');
			Revolution.is_android_device = /android/.test(Revolution.UA);
			Revolution.is_ios_device = /iphone|ipad|ipod/.test(Revolution.UA);
			Revolution.is_windows = /windows nt/.test(Revolution.UA);
			// Unsupported Versions less than
			Revolution.ExplorerVer = 10;
			Revolution.ChromeVer = 33;
			Revolution.FirefoxVer = 27;
			Revolution.AndroidVer = 4.4;
			Revolution.IOSVer = 7;
			Revolution.SafariWinVer = 534.57;
			Revolution.SafariMacVer = 537.71;
			if (Revolution.is_android_device || Revolution.is_ios_device) {
				Revolution.searchMobile();
			} else {
				if(Revolution.is_windows) {
					Revolution.OS = 'Windows';
				} else {
					Revolution.OS = 'NotWindows';
				}
				this.browser = this.searchString(this.dataBrowser) || "Other";
				// IE
				if(this.browser == 'Explorer') {
					if (Revolution.UA.indexOf('msie') != -1) {
						var detectIEregexp = /msie (\d+\.\d+);/ //test for MSIE x.x
						// Make call to browser function
						Revolution.iebrowser();
						//Check if true IE8 or IE emulation
						if (Revolution.iebrowser.verIE >=Revolution.ExplorerVer) {
							Revolution.ie10plus = true;
						} else {
							Revolution.ie10plus = false;
						}
						
					} else { // if no "MSIE" string in userAgent
						var detectIEregexp = /trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists
					}
					if (detectIEregexp.test(Revolution.UA)) //if some form of IE
					this.version = new Number(RegExp.$1) // capture x.x portion and store as a number
					
				} else {
					this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
				}
				
			}
			// Message Text
			Revolution.title = 'Time to upgrade your browser?';
			Revolution.paragraph1 = 'Looks like your browser isn&#39;t the latest version. Upgrade your browser to get the most from your visit.'
			Revolution.paragraph2 = '';
			// Upgrade Links
			Revolution.IELink = 'http://windows.microsoft.com/en-US/internet-explorer/download-ie'; 
			Revolution.ChromeLink = 'https://www.google.com/intl/en/chrome';
			Revolution.FirefoxLink = 'http://support.mozilla.org/en-US/kb/update-firefox-latest-version';
			Revolution.Safari = 'http://support.apple.com/downloads/#safari';
			// Sprite
			Revolution.sprite = '//www.att.com/shopcms/media/att/2014/global/ico/error-sprite.png';
			// CSS Styles 
			Revolution.rev_css_bkg_color = '#FFFDE8';
			Revolution.rev_css_close_bkg_color = '#E9E7D0';
			Revolution.rev_css_title_fontsize = '20px';
			Revolution.rev_css_content_fontsize = '12px';
			// Unsupported Browser Message HTML
			Revolution.rev_unupported_browser_message = '<div id=\"ge5p_z0\" class=\"ge5p_zone0\">'
				+'<div class=\"ge5p_z0_innerLeft\">'
					+'<h2 class=\"ge5p_z0_title\">'+Revolution.title+'</h2>'
					+'<p class=\"ge5p_z0_content\">'+Revolution.paragraph1+'<strong>'+Revolution.paragraph2+'</strong></p>'
					+'<ul>'
						+'<li><a href=\"'+Revolution.IELink+'\" target=\"_blank\">Internet Explorer &reg;</a></li>'
						+'<li class=\"ge5p_z0_chrome_icon\"><a href=\"'+Revolution.ChromeLink+'\" target=\"_blank\">Google Chrome &trade;</a></li>'
						+'<li class=\"ge5p_z0_safari_icon\"><a href=\"'+Revolution.Safari+'\" target=\"_blank\">Apple Safari &reg;</a></li>'
						+'<li class=\"ge5p_z0_firefox_icon\"><a href=\"'+Revolution.FirefoxLink+'\" target=\"_blank\">Mozilla Firefox &reg;</a></li>'
					+'</ul>'
				+'</div>'
				+'<div class=\"ge5p_z0_innerRight ge5p_z0_revolution_close\"><a href=\"http://www.att.com\"><span>Close</span></a></div>'
			+'</div>';
		}
		
	},
	searchString: function (data) {
		for (var i=0 ; i < data.length ; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;
			if (dataString.indexOf(data[i].subString) != -1) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	searchMobile: function() {
		// Browser & Version
		if (Revolution.is_android_device) {
			// Android
			Revolution.browser = "Android";
			// Version
			jQuery.each(Revolution.UA_Arr, function(key,value){
				value = value.replace(/^\s+|\s+$/gm,'');
				if(value.indexOf('android') != -1) {
					// version array
					var thisVersion = value.split(" ")[1];
					Revolution.version = parseFloat(thisVersion);
				}
			});
			
		} else {
			// IOS
			Revolution.browser = "IOS";
			// Version
			jQuery.each(Revolution.UA_Arr, function(key,value){
				value = value.replace(/^\s+|\s+$/gm,'');
				valueArr = value.split(" ");
				jQuery.each(valueArr, function(key2,value2){
					if(value2.indexOf('version') != -1) {
						var thisVersion = value2.split("/")[1];
                        Revolution.version = parseFloat(thisVersion);
					}
				});
			});
		}
	},
	/* Function to toggle the Unsupported
	 * Browser Message
	 **/
	toggleUnsupportedBrowserMessage: function() {
		// Add Zone 0 (Upgrade browser message) to Web Page
        // Test if GNSESS cookie exists
        if(Revolution.rev_messageSeenAndClosed) {
        	// Cookie present, & REV Key Value = true - do not show	
        } else {
			// Message not closed, so show
        	if(!jQuery('#ge5p_z0').length) {
                jQuery(Revolution.rev_unupported_browser_message).prependTo("body");
                Revolution.addUnsupportedBrowserMessageCSS();
                Revolution.compliant = 'Not Supported';
            }
        }
	},
    /* Function to add CSS styles to Message text
	 **/
    addUnsupportedBrowserMessageCSS: function() {
        // Unsupported Browser Message CSS
        jQuery('#ge5p_z0').css({
        	'background-color': Revolution.rev_css_bkg_color,
            'color': '#333333',
            'margin-top': '0',
            'width': '100%',
			'overflow': 'hidden'
        });
        jQuery('.ge5p_z0_innerLeft').css({
			'float': 'left',
			'padding': '20px'
        });
		jQuery('.ge5p_z0_innerLeft ul').css({
			'margin': 0,
			'padding': 0
		});
		jQuery('.ge5p_z0_innerLeft ul li').css({
			'background': 'url('+Revolution.sprite+') no-repeat scroll left top',
			'background-color': 'transparent',
			'display': 'inline-block',
			'line-height': '18px',
			'height': '18px',
			'margin-right': '15px',
			'margin-top': '10px',
			'padding-left': '20px',
			'vertical-align': 'middle'
		});
		jQuery('.ge5p_z0_innerLeft ul li.ge5p_z0_chrome_icon').css({
			'background-position': '0 -19px'
		});
		jQuery('.ge5p_z0_innerLeft ul li.ge5p_z0_safari_icon').css({
			'background-position': '0 -38px'
		});
		jQuery('.ge5p_z0_innerLeft ul li.ge5p_z0_firefox_icon').css({
			'background-position': '0 -57px'
		});
		jQuery('.ge5p_z0_innerLeft ul li a').css({
			'background': 'url('+Revolution.sprite+') no-repeat scroll right -76px',
			'background-color': 'transparent',
			'display': 'inline-block',
			'font-size': '12px',
			'height': '18px',
			'padding-right': '17px',
			'vertical-align': 'text-top',
			'text-decoration': 'none'
		});
		jQuery('.ge5p_z0_innerRight').css({
            'float': 'right'
        });
        jQuery('.ge5p_z0_title').css({
            'font-size': Revolution.rev_css_title_fontsize,
            'font-weight': 300,
			'margin-top': 0,
            'margin-bottom': '5px',
			'text-align': 'left'
        });
        jQuery('.ge5p_z0_content').css({
            'font-size': Revolution.rev_css_content_fontsize,
			'margin': 0,
			'padding': 0,
			'text-align': 'left'
        });
        jQuery('.ge5p_z0_revolution_close a').css({ 
            'background-color': Revolution.rev_css_close_bkg_color,
			'display': 'table-cell',
			'height': '81px',
			'padding': '15px',
			'vertical-align': 'middle'
        });
        jQuery('.ge5p_z0_revolution_close a span').css({
            'background': 'url('+Revolution.sprite+') no-repeat scroll left bottom',
            'background-color': 'transparent',
			'display': 'block',
			'height': '19px',
			'overflow': 'hidden',
			'text-indent': '100%',
			'white-space': 'nowrap',
			'width': '19px'
        });
        /* Application based */
        jQuery('#detail_browser_version').css({
            'font-weight':'bold',
            'color':'#FF0000'
        });
    },
    closeUnsupportedBrowserMessage: function(event) {
        // Check if Zone 0 is visible
        if(jQuery('#ge5p_z0').is(':visible')) {
            jQuery('#ge5p_z0').slideToggle('slow');
            if(!Revolution.rev_cookiePresent) {
            	// No cookie present, so create
            	// Check if domain contains .att.com
            	if(Revolution.rev_websiteurlSource.indexOf('.att.com') != -1) {
            		var domainName = ".att.com";
            	} else {
            		var domainName = Revolution.extractDomain(Revolution.rev_websiteurlSource);
            	}
    	        // GNSESS not present so create
    			var cookieObj = {};
    			var ugarray=["Unauth"];
    			var ska=[["1","jsp"]];
    			var locale="en_US";
    			var rev = "true";
    			cookieObj["UG"] = ugarray;
    			cookieObj["LOCALE"] = locale;
    			cookieObj["SKA"] = ska;
    			cookieObj["REV"] = rev;
            } else {
            	// Cookie present so update the values
            	// Check if domain contains .att.com
            	if(Revolution.rev_websiteurlSource.indexOf('.att.com') != -1) {
            		var domainName = ".att.com";
            	} else {
            		var domainName = Revolution.extractDomain(Revolution.rev_websiteurlSource);
            	}
            	var valueCookie = Revolution.readCookie(Revolution.rev_cookieName);
        		if(typeof valueCookie == "object"){
        			valueCookie = Revolution.safeToJSON(valueCookie);
        		}
        		// Turn cookie into an object
        		var GNSESSObj = jQuery.parseJSON(valueCookie);
        		var newObj = {};
        		// Check if REV KEY is present
        		var isREVKey = Revolution.getCookieMultiValue(Revolution.rev_cookieName,Revolution.rev_cookieKey)
        		
        		if(isREVKey.length > 1) {
        			// Key present so set value
        			jQuery.each(GNSESSObj, function(key, val) {
        				newObj[key] = GNSESSObj[key];
        				if(key == 'REV') {
             				newObj[key]='true';
             		   	}
             		});
        			// This is an object
        			var cookieObj = newObj;
        		} else {
        			// Key not present or null so create
        			jQuery.each(GNSESSObj, function(key, val) {
        				newObj[key] = GNSESSObj[key];
        			});
        			newObj[Revolution.rev_cookieKey] = 'true'; 
        			var cookieObj = newObj;
        		}
            }	
    		name=Revolution.rev_cookieName;
			days="";
			path="/";
			domain=domainName;
			Revolution.createCookie(name,cookieObj,days,domain,path);
        }
        return false;
    },
	readCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	createCookie: function(name,value,days,domain,path) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		
		if(value instanceof String || typeof value === "string") {
			var cookieObject = jQuery.parseJSON(value);
			document.cookie = name+"="+Revolution.safeToJSON(cookieObject)+expires+"; path="+path+"; domain="+domain;
		} else {
			document.cookie = name+"="+Revolution.safeToJSON(value)+expires+"; path="+path+"; domain="+domain;
		}
	},
	getCookieMultiValue: function(cookiename,cookiekey)	{
		var cookievalue=Revolution.readCookie(cookiename);
		if ( cookievalue == "")
			return "";
		var cookievaluesep=cookievalue.split("&");
		for (c=0;c<cookievaluesep.length;c++)
		{
			cookienamevalue=cookievaluesep[c].split("=");
			if (cookienamevalue.length > 1) //it has multi valued cookie
			{
				if ( cookienamevalue[0] == cookiekey )			
					return cookienamevalue[1].toString();			
			}
			else		
				return "";		
		}
		return "";
	},
	eraseCookie: function(name) {
		createCookie(name,"",-1);
	},
	safeToJSON: function(item) { 
		// Test if Native JSON.stringify is true or false
		if(Revolution.native_json_support) {
			// True - supported
			return JSON.stringify(item);
		} else {
			// False - not supported
			var _array_tojson = Array.prototype.toJSON;
			delete Array.prototype.toJSON;
			var r = Revolution.rev_json_stringify(item);
			Array.prototype.toJSON = _array_tojson;
			return r;
		}
	},
	extractDomain: function(url) {
	    var domain;
	    //find & remove protocol (http, ftp, etc.) and get domain
	    if (url.indexOf("://") > -1) {
	        domain = url.split('/')[2];
	    }
	    else {
	        domain = url.split('/')[0];
	    }
	    //find & remove port number
	    domain = domain.split(':')[0];

	    return domain;
	},
	getUrlBase: function() {
		return window.location.protocol.split(':')[0] + '://' + window.location.host + '/';
	},
	getUrlSource: function() {
		return window.location.protocol.replace(/\:/g,'') + '://' + window.location.host + window.location.pathname;
	},
	iebrowser: function() {
		// Version of IE
		// [number / null]
		var verIE = null;
		// browser.docModeIE is essentially the document mode for the IE browser.
		// It is the EFFECTIVE version of IE that renders the web page.
		// This tells you the level of HTML/CSS/Image support in IE.
		// It is independent of the user Agent, usually.
		// [number/null]
		//
		// If browser.docModeIE >= 6 for IE Desktop,
		//    then we have IE 6+ in Standards Mode.
		//
		// If browser.docModeIE == 5 for IE Desktop,
		//    then we have IE 6+ in Quirks mode,
		//
		// Note: For IE 5.5, browser.docModeIE == 5.5
		// Note: For IE 5, browser.docModeIE == 5
		//
		// No one uses IE < 6 anymore, so browser.docModeIE == 5 means that 
		// IE version >= 6 in Quirks Mode.
		var docModeIE = null;
		// The TRUE Version of IE.
		// Independent of browser mode / document mode / navigator.userAgent
		// [string "AA.BB.CCCC.DDDDD" / null]
		var verIEtrue = null;
		// Version of IE, derived from navigator.userAgent
		// [number/null]
		//
		// Used as a backup, in case all other detection methods fail.
		var verIE_ua = null;
		var tmp;
		// Detect Internet Explorer
		// To detect IE, while being independent of the navigator.userAgent,
		// we use a combination of 2 methods:
		//
		//   a) Look at the document.documentMode. If this property is READ ONLY
		//    and is a number >=0, then we have IE 8+.
		//    According to Microsoft:
		//       When the current document has not yet been determined, documentMode returns a value of
		//       zero (0). This usually happens when a document is loading.
		//       When a return value of zero is received, try to determine the document
		//       compatibility mode at a later time.
		//
		//   b) See if the browser supports Conditional Compilation.
		//    If so, then we have IE < 11.
		//
		tmp = document.documentMode;
		try{document.documentMode = "";}
		catch(e){};
		// If we have a number, then IE.
		// If not, then if we can see the conditional compilation, then IE.
		// Else we have a non-IE browser.
		Revolution.iebrowser.isIE = typeof document.documentMode == "number" || new Function("return/*@cc_on!@*/!1")();
		// We switch the value back to be unobtrusive for non-IE browsers
		try{document.documentMode = tmp;}
		catch(e){};

		// We only let IE run this code.
		if (Revolution.iebrowser.isIE) {
			// IE version from user agent
			//
			// For IE < 11, we look for "MSIE 10.0", etc...
			// For IE 11+, we look for "rv:11.0", etc...
			Revolution.iebrowser.verIE_ua = 
			   (/^(?:.*?[^a-zA-Z])??(?:MSIE|rv\s*\:)\s*(\d+\.?\d*)/i).test(navigator.userAgent || "") ?
			   parseFloat(RegExp.$1, 10) : null;
			// Get true IE version using clientCaps.
			var e, verTrueFloat, x, obj = document.createElement("div");
			// Array of classids that can give us the IE version
			CLASSID = [
			 "{45EA75A0-A269-11D1-B5BF-0000F8051515}", // Internet Explorer Help
			 "{3AF36230-A269-11D1-B5BF-0000F8051515}", // Offline Browsing Pack
			 "{89820200-ECBD-11CF-8B85-00AA005B4383}"
			];
			try{obj.style.behavior = "url(#default#clientcaps)"}
			catch(e){};
			for (x=0;x<CLASSID.length;x++)
			{
				try{
					 // This works for IE 5.5+.
					 // For IE 5, we would need to insert obj into the DOM, then set the behaviour,
					 // and then query.
					 Revolution.iebrowser.verIEtrue = obj.getComponentVersion(CLASSID[x],"componentid").replace(/,/g,".");

				}catch(e){};

				if (Revolution.iebrowser.verIEtrue) break;

			};
			// Given string "AA.BB.CCCC.DDDD", convert to a floating point number AA.BB
			// If verIEtrue is null, then verTrueFloat is 0.
			verTrueFloat = parseFloat(Revolution.iebrowser.verIEtrue||"0", 10);
			// For IE 8+, we look at document.documentMode
			//
			// Note: It is unlikely that a web designer would set document.documentMode to
			// some arbitrary value for IE < 8.
			Revolution.iebrowser.docModeIE = document.documentMode ||
			// If document.documentMode is not defined, then we have IE < 8 Desktop.
			// We try to artificially create a document mode number.
			//
			// if document.compatMode == "BackCompat", then we have Quirks mode, so return 5.
			// document.documentMode == 5 in Quirks mode.
			((/back/i).test(document.compatMode || "") ? 5 : verTrueFloat) ||
			// Else return version from navigator.userAgent, or null
			Revolution.iebrowser.verIE_ua;
			// [number / null]
			//
			// Try to use True version first, because this gives the
			// actual browser version.
			//
			// If not available, then use the document mode.
			// In most cases, this will be the actual IE version, anyway.
			Revolution.iebrowser.verIE = verTrueFloat || Revolution.iebrowser.docModeIE;
		}
	},
	dataBrowser: [
		{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
		{ string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
		{ string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
		{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
		{ string: navigator.userAgent, subString: "Safari", identity: "Safari" },
		{ string: navigator.userAgent, subString: "Opera", identity: "Opera" },
		{ string: navigator.userAgent, subString: "Android", identity: "Android" },
		{ string: navigator.userAgent, subString: "IOS", identity: "IOS" }
	]
};

jQuery(document).ready(function(){
	Revolution.init();
	if(	Revolution.browser == "Explorer" && Revolution.version < Revolution.ExplorerVer && !Revolution.ie10plus ||
		Revolution.OS == "Windows" && Revolution.browser == "Safari" && Revolution.version < Revolution.SafariWinVer ||
		Revolution.browser == "Chrome" && Revolution.version < Revolution.ChromeVer ||
		Revolution.browser == "Firefox" && Revolution.version < Revolution.FirefoxVer ||
		Revolution.browser == "Safari" && Revolution.OS != "Windows" && Revolution.version < Revolution.SafariMacVer ||
		Revolution.browser == "Android" && Revolution.version < Revolution.AndroidVer ||
		Revolution.browser == "IOS" && Revolution.version < Revolution.IOSVer) {
			Revolution.toggleUnsupportedBrowserMessage();
	}
	// Debug code for Testing TST servers only - will not show in production
	// Add console.log
	if(typeof window.console != "undefined" && typeof window.console.log != "undefined") {
		if(Revolution.rev_websiteurl.indexOf('tst') != -1 || !Revolution.rev_websiteurl.indexOf('www') != -1) {	
			console.log('Rev Debug: User Agent is: '+Revolution.UA);
			console.log('Rev Debug: App Version is: '+Revolution.APPVer);
			console.log('Rev Debug: Is IE10: '+Revolution.ie10plus);
			
			if(Revolution.rev_cookiePresent) {
				console.log('Rev Debug: GNSESS cookie is present - No message is visable.');
			} else {
				console.log('Rev Debug: Browser & Version is '+Revolution.compliant);
				if(typeof Revolution.browser == 'undefined' && typeof Revolution.version == 'undefined') {
					console.log('Rev Debug: Your Browser is supported!');
					console.log('Rev Debug: Your Browser version is supported!');
				} else {
					console.log('Rev Debug: Your Browser type: '+Revolution.browser);
					console.log('Rev Debug: Your Browser version: '+Revolution.version);
				}
			}
		}
	}
	jQuery('.ge5p_z0_revolution_close a').click(Revolution.closeUnsupportedBrowserMessage);
});