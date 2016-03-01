var ua = navigator.userAgent;
var iPad = !!ua.match(/iPad/i);
var webkit = !!ua.match(/WebKit/i);
var version6 = !!ua.match(/Version\/6/i);
var iOSChrome = !!ua.match(/CriOS/i);
var iOSSafari6 = iPad && webkit && version6 && !iOSChrome;
var iOSSafari = iPad && webkit && !iOSChrome;

if (iOSSafari) {
    onDocumentReady(function () { document.documentElement.className += " mSafari"; });
}

if (iOSSafari6) {
    onDocumentReady(function () { document.documentElement.className += " mSafari-6"; });
}