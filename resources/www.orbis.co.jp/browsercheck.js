function BrowserCheck() {

	var ua = navigator.userAgent;

	// IE
	var ie = false;
	if(ua.match("MSIE [0-9]{1,2}\.[0-9]{1,3}") || ua.match(/Trident/)){
		ie = true;
		ieVer = ua.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
	}

	// Firefox ver 0.x まで判定する
	var fi = (ua.match("Firefox/[0-9]{1,2}\.[0-9]{1,2}"));
	var fiVer = parseFloat(String(ua.match(new RegExp("Firefox/[0-9]{1,2}\.[0-9]{1,2}"))).replace("Firefox/",""));

	// Chrome
	var ch = (ua.match("Chrome/[0-9]{1,2}\.[0-9]{1,2}"));
	var chVer = Math.floor(parseFloat(String(ua.match(new RegExp("Chrome/[0-9]{1,4}\.[0-9]{1,2}"))).replace("Chrome/","")));

	// Safari
	var sf = (ua.match("Safari/[0-9]{1,3}\.[0-9]{1,3}") && ua.match("Chrome") == null && (ua.match("Macintosh") != null || ua.match("Mac OS") != null || ua.match("Windows") != null));
	var sfVer = Math.floor(parseFloat(String(ua.match(new RegExp("Safari/[0-9]{1,3}\.[0-9]{1,3}"))).replace("Safari/","")));

	// Opera
	var op = (ua.match("Opera[/ ][0-9]{1,2}\.[0-9]{1,2}"));
	var opVer = Math.floor(parseFloat(String(ua.match(new RegExp("Opera[/ ][0-9]{1,2}\.[0-9]{1,2}"))).substr(6)));

	// smartphone iPhone or Android - analyse WebKit version
	var sp = (ua.match("AppleWebKit/[0-9]{1,3}\.[0-9]{1,2}") && (ua.match("iPhone") != null || ua.match("Android") != null));
	var spVer = Math.floor(parseFloat(String(ua.match(new RegExp("AppleWebKit/[0-9]{1,3}\.[0-9]{1,2}"))).replace("AppleWebKit/","")));

	if ((ie && ieVer >= 9) || (fi && fiVer >= 3.6) || (ch && chVer >= 1) || (sf && sfVer >= 522) || (op && opVer >= 9) || (sp && spVer >= 525)) {
		return true;
	} else {
		return false;
	}
}

var BrowserVersionCheck = BrowserCheck();

document.write('<style type="text/css">');
document.write('<!--');
if (BrowserVersionCheck) {
	document.write('.script { display:none; }');
} else {
	document.write('.script { display:inline; }');
}
document.write('-->');
document.write('</style>');

