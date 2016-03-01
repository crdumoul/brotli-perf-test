dojo.require("dojo.cookie");
dojo.require("ds.cookiePolicy.cookiePolicy");
var global_isTypeaheadOn = true;
var mobileButtonText = {"en-us" : "Mobile Version of This Site",
						"en-gb" : "Mobile Version of This Site"
};

function legacy_getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) end = cookie.length;
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function setCookieAttribute(cookieName, cookieAttributeName, value){
	var exists = false;
	var cookieValue = "";
	var attr = dojo.cookie(cookieName);
	if(attr != null){
		var cookieAttributes = attr.split(",,,");
		
		for(i = 0; i < cookieAttributes.length; i++){
			if(cookieAttributes[i].split("~")[0] == cookieAttributeName){
				cookieValue = cookieValue + cookieAttributeName + "~" + value;
				exists = true;
			}
			else{
				cookieValue = cookieValue + cookieAttributes[i];
			}
			if((i+1) < cookieAttributes.length){
				cookieValue = cookieValue + ",,,";
			}
		}
	}
	
	if(!exists){
		cookieValue = cookieValue + ",,," + cookieAttributeName + "~" + value;
	}
	
	// setCookie(cookieName, cookieValue, false, '/', false, false);
	dojo.cookie(cookieName,cookieValue,{path : "/"});	
}

function getCookieAttribute(cookieName, cookieAttributeName){
	var value = dojo.cookie(cookieName);
	if(value == null){
		return "";
	}
	var cookieAttributes = dojo.cookie(cookieName).split(",,,");
	for(i = 0; i < cookieAttributes.length; i++){
		if(cookieAttributes[i].split("~")[0] == cookieAttributeName){
			return cookieAttributes[i].split("~")[1];
		}
	}
	return "";
}

function deleteCookieAttribute(cookieName,cookieAttributeName){
	var cookieValue = "";
	var attr = dojo.cookie(cookieName);
	if(attr != null){
		cookieAttributes = attr.split(",,,");
		
		for(i = 0; i < cookieAttributes.length; i++){
			if(cookieAttributes[i].split("~")[0] != cookieAttributeName){
				cookieValue = cookieValue + cookieAttributes[i];
			}if((i+1) < cookieAttributes.length){
				cookieValue = cookieValue + ",,,";
			}
		}
	}
	
	// setCookie(cookieName, cookieValue, false, '/', false, false);
	dojo.cookie(cookieName,cookieValue,{path : "/"});
}
function deleteAuthCookies(){
	dojo.cookie("access_token", null, {expires: -1});
	dojo.cookie("SWID", null, {expires: -1});
}
function setAuthCookies(accessToken){
	dojo.cookie("access_token", accessToken,{path : "/"});
}
function setHeaderItems(dsiCartCookie){
	dojo.cookie("DSICart", dsiCartCookie, {path : "/"});
}
function getHeaderItems(){
	dojo.cookie("DSICart");
}
function showMobilewebLink(uri) {
	var agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf("ipad") != -1 || agent.indexOf("android") != -1) {
		dojo.create("a", {"class":"button mobileButton",  "innerHTML":mobileButtonText[dojo.locale], "href":uri}, "sfLinks");
	}	
}

function getParam (paramName,strURL){
	  //alert ("paramName="+paramName);
	  var paramValue = "";
	  //alert ("strURL="+strURL);
	  if ( strURL.indexOf("&") > -1 ){
	    var initialQueryString = strURL.substr(strURL.indexOf("?"));
	    var queryString = initialQueryString.split("&");
	    for (var i=0; i<queryString.length; i++) {
	      if (queryString[i].indexOf(paramName + "=") > -1) {
	        var paramArray = queryString[i].split("=");
	        paramValue = paramArray[1];
	        break;
	      }
	    }
	  }
	  //alert ("paramValue="+paramValue);
	  return paramValue;
}

// return current epoch time in milliseconds
function getTime() {
	var cookieTime = getCookieAttribute("DSISession", "DSILASTACCESS");
	if(cookieTime != "") {
		// return time stored in session cookie
		return parseInt(cookieTime);
	} else {
		// use browser time
		var d = new Date();
		return d.getTime();
	}
}

var enabledFeature = false;

function alertkey(e) {
  if( !e ) {
    //if the browser did not pass the event information to the
    //function, we will have to obtain it from the event register
	    if( window.event ) {
	      //Internet Explorer
	      e = window.event;
	    } else {
	      //total failure, we have no way of referencing the event
	      return;
	    }
	}

	  if( typeof( e.keyCode ) == 'number'  ) {
	    //DOM
	    e = e.keyCode;
	  } else if( typeof( e.which ) == 'number' ) {
	    //NS 4 compatible
	    e = e.which;
	  } else if( typeof( e.charCode ) == 'number'  ) {
	    //also NS 6+, Mozilla 0.9+
	    e = e.charCode;
	  } else {
	    //total failure, we have no way of obtaining the key code
	    return;
	  }
	  

	  if (e == 192 && document.getElementById) {
	  	enabledFeature=true;
	  }
	  if (enabledFeature) {
		  if (e == 219 && document.getElementById) {
			var all = document.all ? document.all : document.getElementsByTagName('*');
			  for (var i = 0; i < all.length; i++) {
			    if (all[i].className == 'caption') {all[i].style.display='block';}
			    if (all[i].className == 'genericESpot') {all[i].style.border='2px dashed red';}
			    if (all[i].className == 'genericCSpot') {all[i].style.border='2px dashed blue';}
			  }
		  }else if (e == 221 && document.getElementById) {
			var all = document.all ? document.all : document.getElementsByTagName('*');
			  for (var i = 0; i < all.length; i++) {
			    if (all[i].className == 'caption') {all[i].style.display='none';}
			    if (all[i].className == 'genericESpot') {all[i].style.border='0px solid white';}
			    if (all[i].className == 'genericCSpot') {all[i].style.border='0px dashed white';}
			  }
		  }
	}
}

//Tell the browsers to react to the event
if( document.captureEvents && Event.KEYUP ) {
	document.captureEvents( Event.KEYUP );
}
document.onkeyup = alertkey;

var keyPressAvailable=true;

function outlineSpots() {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	  for (var i = 0; i < all.length; i++) {
	    if (all[i].className == 'caption') {all[i].style.display='block';}
	    if (all[i].className == 'genericESpot') {all[i].style.border='2px dashed red';}
	    if (all[i].className == 'genericCSpot') {all[i].style.border='2px dashed blue';}
	  }
}

function hideSpots() {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	  for (var i = 0; i < all.length; i++) {
	    if (all[i].className == 'caption') {all[i].style.display='none';}
	    if (all[i].className == 'genericESpot') {all[i].style.border='0px solid white';}
	    if (all[i].className == 'genericCSpot') {all[i].style.border='0px dashed white';}
	  }
}
