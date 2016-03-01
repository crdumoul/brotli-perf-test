MpElDs = {
    'hola.jetblue.com': 'es',
    'www.jetblue.com': 'en',
    'jetblue.com': 'en',
    'www-stg.jetblue.com': 'en',
    'book.jetblue.com': 'en',
	'trueblue.jetblue.com':'en',
	'mobile.jetblue.com':'en',
	'movil.jetblue.com':'es',
	'help.jetblue.com':'en',
	'vacations.jetblue.com':'en',
	'redeem.getaways.jetblue.com':'en',
	'ayuda.jetblue.com':'es',
	'vacaciones.jetblue.com':'es',
	'canjear.getaways.jetblue.com':'es'
};
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie)) {
    MpElD = "//hola.jetblue.com";
	if (location.host.toString().indexOf('mobile.jetblue.com') != -1) {
       MpElD = "//movil.jetblue.com";
    }
		if (location.host.toString().indexOf('vacations.jetblue.com') != -1) {
       MpElD = "//vacaciones.jetblue.com";
    } 
		if (location.host.toString().indexOf('redeem.getaways.jetblue.com') != -1) {
       MpElD = "//canjear.getaways.jetblue.com";
    } 
		if (location.host.toString().indexOf('help.jetblue.com') != -1) {
       MpElD = "//ayuda.jetblue.com";
    }  
    MpL = navigator.browserLanguage;
    if (!MpL) MpL = navigator.language;
    document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))
};