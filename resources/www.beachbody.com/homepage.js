jQuery(document).ready(function() {
		
  initAllSlideShows();


	
	
	
	
/******************************************************************************************
	END script for Slideshow
*******************************************************************************************
	START script for Email Collector
******************************************************************************************/
	$("#email_collector_link_coachint").fancybox({
		'padding'	: '5',
		'scrolling'	: 'no',
		'titleShow'	: false,
		'onClosed'	: function() {
			$("#submit_error").hide();
		}
	});
	
	$("#frm_337210e3a8").validate({
		rules: {
			fld_5e44606771: "required",
			fld_0c3296bdd3: {
				required: true,
				email: true
			}
		},
		messages: {
			fld_5e44606771: "Please enter your name.",
			fld_0c3296bdd3: "Please enter a valid email address."
		},
		submitHandler: function(form) {
			alert("Successfully submitted. Thank you!");
			document.frm_337210e3a8.submit();
		}
	});
/******************************************************************************************
	END script for Email Collector
******************************************************************************************/
});
