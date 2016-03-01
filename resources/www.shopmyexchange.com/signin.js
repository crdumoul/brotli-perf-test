/**
 * creates the request to the /account/gadgets/signinModalForm.jsp to perform the login though an ajax call.
 */

function ajaxLogin(contextPath) {
   var urlToRedirect = $(".login-button").attr("urlToRedirect");
   var ajaxerror = 'false';
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;
   var errorDiv = document.getElementById("error-message");
   
   var ajaxurl =  contextPath + "/account/gadgets/signinModalForm.jsp";
   var params = "username=" + encodeEspecialChars(username) + "&password=" + encodeEspecialChars(password);
   
   errorDiv.setAttribute("class","sign-in-warning");
   errorDiv.innerHTML = "please wait...";
   
   if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
   } else if (window.ActiveXObject) {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   if (xmlhttp) {
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var errorIndexText = "error-message"; // search the error div in the response
            var errorIndexTextSize = errorIndexText.length;
            var errorIndex = response.indexOf(errorIndexText);
            if (errorIndex > -1) {
              ajaxerror = 'true';
              // get error messages from ajax response
              var element = $(response).filter('#error-message').get(0);
              var errorMessages = element.innerHTML.trim();    
              //redirect if it is a migrated profile
              if (errorMessages == "MigratedProfile") {
            	  window.location.href= contextPath + "/account/sign-in";
              }
              // replace error div content with error messages
              errorDiv.innerHTML =  errorMessages;
              errorDiv.setAttribute("class","sign-in-error");
            }
         } else {
         }
      };
      try {
         xmlhttp.open("POST", ajaxurl, false);
         xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         xmlhttp.setRequestHeader("Content-length", params.length);
         xmlhttp.send(params);
      } catch (e) {
       
      }
   }
   if (ajaxerror == 'true') {
      return false;
   } else {
	   if (urlToRedirect){
		   window.location.assign(contextPath + urlToRedirect);
		}else{
		  if(window.selectedAttrsVars){
			  var tempForm = "<form id=\"supplyQuantity\" action=\""+window.location+"\" method=\"POST\"><input type=\"hidden\" name=\"selectedAttrsVars\" value=\""+selectedAttrsVars+"\" /></form>";
			  $("body").append(tempForm);
			  $("#supplyQuantity").submit();
			  return;
		  }
    	  window.location.reload(true);
	   }
	   if(window.marketPlaceLink == true){
		   window.open(window.marketPlaceURL);
		   window.marketPlaceLink = false;
	   }
   }
   return false;
}

/**
 * detect enter key for login
 */
function login(e, contextPath) {
   key = (document.all) ? e.keyCode : e.which;
   if (key==13) {
      ajaxLogin(contextPath);
   }
}

function sendMeCopyCheckClick(){
	if(jQuery("#contactUs-prefSendMeACopy").attr("checked")=='checked'){
		jQuery("#hiddenSendMeCopy").val(true);
	}else{
		jQuery("#hiddenSendMeCopy").val(false);
	}
}

function contactPrefRadioClick(){
	if(jQuery("#contactUs-prefEmail").is(":checked")){
		jQuery("#hiddenPrefContact").val('Email');
	}else{
		jQuery("#hiddenPrefContact").val('Phone');
	}
}

function encodeEspecialChars(text) {
	// ^[]`!@#$~%&*()_+=\|}{;:<,.>/?"
	var especialChars = { 
			  '^': "%5E", '[': "%5B", ']': "%5D", '`': "%60", '!': "%21",
			  '@': "%40", '$': "%24", '~': "%7E", '%': "%25", '&': "%26",
			  '*': "%2A", '(': "%28", ')': "%29", '_': "%5F", '+': "%2B",
			  '=': "%3D", '\\': "%5C", '|': "%7C", '}': "%7D", '{': "%7B", 
			  ';': "%3B", ':': "%3A", '<': "%3C", ',': "%2C", '.': "%2E",
			  '>': "%3E", '/': "%2F", '?': "%3F"
	};
	
	var encodedString = "";
	for (var i = 0; i < text.length; ++i) {
		var c = text.charAt(i);
		encodedString += ((especialChars[c] === undefined) ? c : especialChars[c]);
	}
	
	return encodedString;
}