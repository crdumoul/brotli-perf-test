function backToMobile() {
	var date=new Date();date.setTime(date.getTime()+(30*24*60*60*1000));
	document.cookie = 'MOBILE_DEVICE=true; expires='+date+';domain=.'+location.host.split('.')[1]+'.com;path=/';
	document.location.href = 'http://m.'+location.host.split('.')[1]+'.com';
	return false;
}
$(document).ready(function(e) {
    if(navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/webOS/i) != null || navigator.userAgent.match(/Android/i) != null || readCookie('MDR_DEVICE') == "true") {
		$('#back_to_mobile_container').show();
	} else{
		$('#back_to_mobile_container').hide();
	}
});