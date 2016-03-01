function SID00714_set_cookie( name, value, expires, path, domain, secure )
{
	var today = new Date();
	today.setTime( today.getTime() );

	if ( expires )
	{
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	SID00714_document_to_modify.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}


function SID00714_get_cookie( check_name ) {
	var a_all_cookies = SID00714_document_to_modify.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; 
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function SID00714_respond(answer){
	var expiration_yes = 30.00;
	var expiration_no = 30.00;
	var expiration_later = 2.00;
	var expiration_close = 2.00;
	var expiration_nothing = 2.00;
	var result = true;

	switch (answer)
	{
		case 'yes':
			clearTimeout(SID00714_timeout);
			SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/yes.htm");
			SID00714_set_cookie('SID00714_mrr', 1, expiration_yes, '/', '','');
			result = SID00714_openSurvey(); 
			break;
	 
		case 'no':
			clearTimeout(SID00714_timeout);
			SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/no.htm");
			SID00714_set_cookie('SID00714_mrr', 2, expiration_no, '/', '','');
			break;
	 
		case 'later':
			clearTimeout(SID00714_timeout);
			SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/later.htm");
			SID00714_set_cookie('SID00714_mrr', 2, expiration_later, '/', '','');
			break;

		case 'close':
			clearTimeout(SID00714_timeout);
			SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/close.htm");
			SID00714_set_cookie('SID00714_mrr', 2, expiration_close, '/', '','');
			break;

		case 'nothing' :
			SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/nothing.htm");
			SID00714_set_cookie('SID00714_mrr', 2, expiration_nothing, '/', '','');
			break;
	}

	SID00714_hide_popup();
	return result;
}


function SID00714_openSurvey() {
	var survwin = window.open("https://www.marketingresearchresources.com/images/sid00714/web.asp?I.User1=","SID00714");
	if (!survwin) return false;
	else return true;
}


function SID00714_checkIE6() {
	var ltIE6 = false;
	var version = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(navigator.userAgent) != null)
			version = parseFloat(RegExp.$1);
		if (version <= 6 && version >= 5.5)
			ltIE6 = true;
	}
	return ltIE6;
}


function SID00714_checkIE() {
	var gtIE6 = false;
	var version = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(navigator.userAgent) != null)
			version = parseFloat(RegExp.$1);
		if (version >= 6)
			gtIE6 = true;
	}
	return gtIE6;
}


function SID00714_loadfile(filename){
	var fileref=SID00714_document_to_modify.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);

	if (SID00714_checkIE()) {
		fileref.onload = function () {
			SID00714_document_to_modify.recalc();
			fileref.onload = null;
		}
	}

	if (typeof fileref!="undefined") {
		SID00714_document_to_modify.getElementsByTagName("head")[0].appendChild(fileref);
	}
}

function SID00714_show_popup(){
	var popUp = SID00714_document_to_modify.createElement('div');
	var popUpHTML = "<div class=\"css_SID00714_fixed\"><div class=\"css_SID00714_ipad\"><img src=\"http://popup.m-rr.com/surveypopup/SID00714/Sony_Popup.jpg\" width=\"527\" height=\"258\" alt=\"Sony.com_Popup\" usemap=\"#popupmap\" style=\"border: none;\" /><map name=\"popupmap\"><area shape=\"rect\" coords=\"144,163,375,203\" href=\"#\" onclick=\"SID00714_respond('yes');\" alt=\"Share your feedback\" title=\"Share your feedback\" /><area shape=\"rect\" coords=\"481,21,504,43\" href=\"#\" onclick=\"SID00714_respond('close');\" alt=\"Close\" title=\"Close\" /></map></div></div>";
	if (navigator.userAgent.indexOf("iPad") != -1) popUpHTML = popUpHTML.replace(/ style="display: none;"/g, "");
	popUp.id='SID00714_pop_up';
	SID00714_document_to_modify.body.appendChild(popUp);
	popUp.style.position = (SID00714_checkIE6()) ? "absolute" : "fixed";
	popUp.style.top = popUp.style.left = "-1000px";
	popUp.style.zIndex = "2147483647";
	popUp.innerHTML = popUpHTML;
	popUp.style.visibility = "visible";
	SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/proposal.htm");
	
	setTimeout(function() {
		if (true)
		{
			popUp.style.left = "50%";
			popUp.style.top = "50%";
			popUp.style.marginLeft = "-" + popUp.offsetWidth / 2 + "px";
			popUp.style.marginTop = "-" + popUp.offsetHeight / 2 + "px";
		}
		else
		{
			popUp.style.top = "0px";
			popUp.style.left = "0px";
		}
		
		if (SID00714_checkIE6())
		{
			var canvas = SID00714_document_to_modify.createElement('iframe');
			canvas.id = 'SID00714_canvas';
			canvas.src = 'about:blank';
			canvas.frameBorder = "0";
			canvas.scrolling = "no";
			canvas.style.position = "absolute";
			canvas.style.top = popUp.style.top;
			canvas.style.left = popUp.style.left;
			canvas.style.marginLeft = popUp.style.marginLeft;
			canvas.style.marginTop = popUp.style.marginTop;
			canvas.style.zIndex = "2147483646";
			canvas.style.display = "block";
			canvas.style.width = popUp.offsetWidth + "px";
			canvas.style.height = popUp.offsetHeight + "px";
			SID00714_document_to_modify.body.appendChild(canvas);
		}
	}, 100);
}

function SID00714_hide_popup(){
	var popUp = SID00714_document_to_modify.getElementById('SID00714_pop_up');
	popUp.style.visibility = "hidden";
	var ieCanvas = SID00714_document_to_modify.getElementById("SID00714_canvas");
	if (ieCanvas)
	ieCanvas.parentNode.removeChild(ieCanvas);
}

function SID00714_run() {
	var expiration_close = 2.00;
	var run_firstpage = true;
	var percentage = 0.0000;
	var popup_close_delay = 40 * 1000;
	var cookieEnabled=(navigator.cookieEnabled)? true : false;
	
	try {
		if (parent.location != self.location) {
			SID00714_document_to_modify = parent.document;
			parent.SID00714_respond = SID00714_respond;
		}
		else {
			SID00714_document_to_modify = document;
		}
	}
	catch(err) {
		SID00714_document_to_modify = document;
	}

	if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
		SID00714_document_to_modify.cookie="testcookie"
		cookieEnabled=(SID00714_document_to_modify.cookie.indexOf("testcookie")!=-1)? true : false
	}

	if (!cookieEnabled) {
		return null;
	}

	var firstpage_status = SID00714_get_cookie('SID00714_firstpage');

	if (!run_firstpage && firstpage_status==null) {
		SID00714_set_cookie('SID00714_firstpage', 0,'', '/', '','');
		return null;
	}

	var run_status = SID00714_get_cookie('SID00714_mrr');

	if (run_status != null) {
		return null;
	} 

	var random_number = Math.floor((Math.random() * 100 / percentage)+1);
	if (random_number == 1) {
		setTimeout(function() {
			SID00714_loadfile("http://popup.m-rr.com/surveypopup/SID00714/campaign.css");
			SID00714_set_cookie('SID00714_mrr', 0, expiration_close, '/', '','');
			SID00714_show_popup();
			SID00714_timeout = setTimeout("SID00714_respond(\'nothing\')", popup_close_delay);
		}, 3 * 1000);
	}
}

var SID00714_timeout, SID00714_document_to_modify;

if (window.addEventListener)
	window.addEventListener('load', SID00714_run, false);
else if (window.attachEvent)
	window.attachEvent('onload', SID00714_run);
