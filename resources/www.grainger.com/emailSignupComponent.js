function validateEmailId(emailId,msg) { 
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        email = jQuery('#' + emailId).val();
    if(!re.test(email)){
    	jQuery('#validateEmailResult').html('<h2 class="alert">Please enter a valid email address and try again.</h2>');
    	return false;
    }
    var success = false;
    jQuery.ajax({
		  url: '/emails/validate',
	      method: 'post',
	      dataType: "json",
	      async: false,
	      data: {email: email, sourceId: 'freeEmailOffers'},
        success: function(data) {
            if(data != undefined && data === true){
            	success = true;
            } else {
            	jQuery('#validateEmailResult').html('<h2 class="alert">Please enter a valid email address and try again.</h2>');
            	success = false;
            }
        },
        error: function (errorMessage) {
        	jQuery('#validateEmailResult').html(msg);
        	success = false;
        }
	     
    });
    
    if(success){
    	return true;
    } else {
    	return false;
    }
}
function setPredefinedText(emailTxt){
	var emailText = '#' + emailTxt.id;
	if(jQuery(emailText).val('Email Address')){
		jQuery(emailText).val('');		
	}
}

jQuery(function() {
    // dynamic height yo
    // due to markup and structure, we move the email component to
    // clear the exposed left nav only for homepage
    if(jQuery('#body-main').hasClass('homepage')) {
        jQuery('#emailOffers').css('margin-top', jQuery('#prd_ctg_for_nav_comps').outerHeight() + 20);
    }
});