//global variaveis
var isAndroid = navigator.userAgent.indexOf("Android") > 0;
var isMobile = navigator.userAgent.indexOf("Mobile") > 0;
var isIpad = navigator.userAgent.indexOf("iPad") > 0;
var isIphone = navigator.userAgent.indexOf("iPhone") > 0;

var isIe8 = $("html").hasClass('ie8');

isMobile = isMobile && !isIpad;

//isMobile = true;