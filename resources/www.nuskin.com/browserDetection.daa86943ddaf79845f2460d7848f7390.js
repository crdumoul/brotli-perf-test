/**
 * Created by chad on 1/8/14.
 */
/* BrowserDetection object is immediately executed when the page loads.
 This Object is used to detect the browser and version the user is using.
 */
window.BrowserDetection = function () {

    //TODO: update isWebkit because 'webkitURL' is deprecated.
    var
        userAgent = navigator.userAgent,
        appName = navigator.appName,
        isWebkit = (window.URL != null),
        isGecko = navigator.product == 'Gecko',
        UNKNOWN = 'Unknown',
        IE = 'Internet Explorer',
        NETSCAPE = 'Netscape',
        CHROME = 'Chrome',
        SAFARI = 'Safari',
        FIREFOX = 'Firefox',
        OPERA = 'Opera',
        EDGE = 'Edge',
        IPHONE_MOBILE = "iPhone Mobile",
        IPAD_MOBILE = "iPad Mobile",
        IPOD_MOBILE = "iPod Mobile";

    var publicInterface = {
        browserName: getBrowserName(), //Execute immediately
        browserVersion: getBrowserVersion(), //Execute immediately
        isIE: isIE,
        isIE11: isIE11,
        isEdge: isEdge,
        IECompatabilityVersion: getIECompatabilityVersion,
        isIEVersionAtLeastVersion: isIEVersionAtLeastVersion,
        isMobile: isMobileBrowser,
        isChrome: isChrome,
        isSafari: isSafari,
        isFirefox: isFirefox,
        isOpera: isOpera,
        isModernDefault: isModernDefault()
    };


    function getBrowserName() {

        var browser = '';

        if (mobileBrowsers() !== '') {
            browser = mobileBrowsers();
        } else if (desktopBrowsers() !== '') {
            browser = desktopBrowsers();
        } else {
            browser = UNKNOWN;
        }

        return browser;
    }

    function getBrowserVersion() {

        var version = -1;
        var desktopBrowser = desktopBrowsers();

        if (desktopBrowser === IE) {
            version = getIECompatabilityVersion();
        } else if (desktopBrowser === SAFARI) {
            (/Version[\/\s](\d+\.\d+)/).test(userAgent);
            version = parseFloat(new Number(RegExp.$1));
        } else if (desktopBrowser === EDGE) {
            (/Edge[\/\s](\d+\.\d+)/).test(userAgent);
            version = parseFloat(new Number(RegExp.$1));
        } else {
            version = parseFloat(new Number(RegExp.$1));
        }

        if (isMobileBrowser()) {
            var tempVersion = version;
            version = desktopBrowser + " " + tempVersion;
        }

        return version;
    }

    function desktopBrowsers() {
        var browser = '';

        if (isEdge()) {
            browser = EDGE;
        }
        else if (isIE()) {
            browser = IE;
        } else if (/Navigator[\/\s](\d+\.\d+)/.test(userAgent)) {
            browser = NETSCAPE;
        } else if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent) && navigator.vendor === 'Google Inc.') {
            browser = CHROME;
        } else if (/Safari[\/\s](\d+\.\d+)/.test(userAgent)) {
            browser = SAFARI;
        } else if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
            browser = FIREFOX;
        } else if (/OPR[\/\s](\d+\.\d+)/.test(userAgent) || /Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
            browser = OPERA;
        }

        return browser;
    }

    function isChrome() {
        return getBrowserName() === CHROME || mobileBrowsers() === "Android Mobile";
    }

    function isSafari() {
        return getBrowserName() === SAFARI || mobileBrowsers() === IPHONE_MOBILE || mobileBrowsers() === IPAD_MOBILE || mobileBrowsers() === IPOD_MOBILE;
    }

    function isFirefox() {
        return getBrowserName() === FIREFOX;
    }

    function isOpera() {
        return getBrowserName() === OPERA;
    }

    function mobileBrowsers() {
        var browser = '';
        if (/Android/i.test(userAgent)) {
            browser = 'Android Mobile';
        } else if (/iPhone/i.test(userAgent)) {
            browser = IPHONE_MOBILE;
        } else if (/iPad/i.test(userAgent)) {
            browser = IPAD_MOBILE;
        } else if (/iPod/i.test(userAgent)) {
            browser = IPOD_MOBILE;
        } else if (/BlackBerry/i.test(userAgent)) {
            browser = 'BlackBerry Mobile';
        } else if (/Windows Phone/i.test(userAgent)) {
            browser = 'Windows Mobile';
        } else if (window.innerWidth <= 800 && window.innerHeight <= 600) {
            browser = 'Generic Mobile';
        }
        return browser;
    }

    function isMobileBrowser() {
        if (mobileBrowsers() !== '') {
            return true;
        }
        return false;
    }


    function isIE() {
        "use strict";
        return getIECompatabilityVersion() !== -1;
    }

    function isIE11() {
        "use strict";
        var isVersion11 = false;

        if (appName === NETSCAPE) {
            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(userAgent) !== null) {
                isVersion11 = true;
            }
        }

        return isVersion11;
    }

    function isEdge() {
        "use strict";
        var isEdge = false;
        if (appName === NETSCAPE) {
            var re2 = new RegExp("Edge/");
            if (re2.exec(userAgent) !== null) {
                isEdge = true;
            }
        }
        return isEdge;
    }

    function isModernDefault() {
        return isEdge() || (!isFirefox() && isGecko) || isWebkit || isCanvasSupported();
    }

    function getIECompatabilityVersion() {
        "use strict";
        var IE_VERSION_11 = 11;
        var ieVersion = -1;
        var re;

        // Detect if browser is IE (Fails for IE 11)
        if (appName === 'Microsoft Internet Explorer') {
            re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(userAgent) !== null) {
                ieVersion = parseFloat(RegExp.$1);
            }
        }

        // Detect IE11. IE11 shows "Netscape" as its appName so we need to check for "Trident" as a regular expression in the user agent to see if it is IE11.
        else if (isIE11()) {
            ieVersion = IE_VERSION_11;
        }
        return ieVersion;
    }

    function isIEVersionAtLeastVersion(ieVersion) {
        "use strict";
        var IE_VERSION_11 = 11;
        var isAtLeastVersion = false;
        var compatibilityVersion = getIECompatabilityVersion();

        if (ieVersion > 0 && compatibilityVersion > 0) {
            // Check for IE 11 first
            if (isIE11()) {
                isAtLeastVersion = IE_VERSION_11 >= ieVersion;
            }
            else {
                isAtLeastVersion = compatibilityVersion >= ieVersion;
            }
        }
        return isAtLeastVersion;
    }

    // FEATURE DETECTION FALLBACK FUNCTIONS

    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    return publicInterface;
}();

