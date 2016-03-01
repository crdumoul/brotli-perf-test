jQuery(window).scroll(function(){
	if (jQuery(this).scrollTop() > 600) {
		jQuery('#like-footer').addClass('show');
			} else {
		jQuery('#like-footer').removeClass('show');
	}
});

//Click event to scroll to top

 jQuery('#like-footer').click(function(){
	jQuery('html, body').animate({scrollTop : 0},1200);
	return false;
});
