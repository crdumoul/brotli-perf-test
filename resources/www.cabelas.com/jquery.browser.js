(function( jQuery, window, undefined ) {
"use strict";
 
var matched, browser;
 
jQuery.uaMatch = function( ua ) {
ua = ua.toLowerCase();
 
var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
/(msie) ([\w.]+)/.exec( ua ) ||
ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
[];
 
return {
browser: match[ 1 ] || "",
version: match[ 2 ] || "0"
};
};
 
// Don't clobber any existing jQuery.browser in case it's different
if ( !jQuery.browser ) {
matched = jQuery.uaMatch( window.navigator.userAgent );
browser = {};
 
if ( matched.browser ) {
browser[ matched.browser ] = true;
browser.version = matched.version;
}
 
// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
browser.webkit = true;
} else if ( browser.webkit ) {
browser.safari = true;
}
 
jQuery.browser = browser;
}
 
})( jQuery, window );
/*
FILE=jquery.browser.js
MD5=13456c4b956ec8214a3b0debf5b6f688
BUILD NUMBER=434
BUILD REVISION=RELEASE-20160217
TIMESTAMP=02/18/2016 at 09:24:03 MST
*/