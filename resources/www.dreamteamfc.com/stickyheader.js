jQuery(window).scroll(function() {
	var hero = jQuery('#rollheader'),
		hp = hero.offset().top,
		wp = jQuery(this).scrollTop(),
		hh = hero.outerHeight();
	if (wp > (hp+hh)){
		jQuery('.logopane').addClass('showsn');
		jQuery('.socnetpane').addClass('showsn');
	}  else {
		jQuery('.logopane').removeClass('showsn');
		jQuery('.socnetpane').removeClass('showsn');
	}
});
