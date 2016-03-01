   <!-- Hide script from older browsers
						function validEmail(email) {
                invalidChars = " /:,;"

                if (email == "") {return false;}						// cannot be empty
                
                for (i=0; i<invalidChars.length; i++) {	// does it contain any invalid characters?
                	badChar = invalidChars.charAt(i)
                	if (email.indexOf(badChar,0) > -1) {return false;}
                }
                atPos = email.indexOf("@",1)			// there must be one "@" symbol
                if (atPos == -1) {return false;}
								
                if (email.indexOf("@",atPos+1) != -1) {return false;}	// and only one "@" symbol
                
                periodPos = email.indexOf(".",atPos)
                if (periodPos == -1) {return false;}					// and at least one "." after the "@"
                
                if (periodPos+3 > email.length)	{return false;}		// must be at least 2 characters after the "."
                
                return true;
             }

             function isNum(passedVal) {					// Is this a number?
                if (passedVal == "") {return false;}
                
                
                for (i=0; i<passedVal.length; i++) {
                	if (passedVal.charAt(i) < "0") {return false;}
                	if (passedVal.charAt(i) > "9") {return false;}
                }
                return true;
              }

              function validZip(inZip) {					// Is this a valid Zip code?
                if (inZip == "") {return true;}
                if (isNum(inZip)) {return true;}			// Check if Zip is numeric
                
                
                return false;
              }
            	
            function subscribeEmail(vForm) {

                var xyz;
                // check to see if the email's valid
                if (!validEmail(vForm.subscriberkey.value)) {
                	alert("Invalid email address. Please re-enter.");
               		return false;
                }
				if (vForm.FormOptions && vForm.ConfEmail){
					if(vForm.FormOptions.value=="conf" && (vForm.subscriberkey.value != vForm.ConfEmail.value)) {
							alert("The email addresses do not match. Please re-enter.")
							vForm.ConfEmail.focus();
							vForm.ConfEmail.select();
							return false;
					}
				}                
                
                vForm.QS.value = "c76003443ff9837dc3ffba82e2d2bc794d08bec82ce70bc3";
                xyz = "http://pages.email.beachbody.com/page.aspx?";
                vForm.action=xyz;
      			return true;	
            } 
                       	
	function subscribeEmailInput(src,e) {
  		var k=e.keyCode || e.which;
  		if(k==13){
    		subscribeEmailDiv();
    		e.preventDefault();
    		e.stopPropagation();
  		}
  		return false;    
	}

	function subscribeEmailDiv() {
  		var email = $("#subscriberkey").val();
  		// check to see if the email's valid
  		if (!validEmail(email)) {
    		alert("Invalid email address. Please re-enter.");
    		return false;
  		}
  		window.location="http://pages.email.beachbody.com/page.aspx?QS=c76003443ff9837dc3ffba82e2d2bc794d08bec82ce70bc3&subscriberkey=" + email;
	} 

     
