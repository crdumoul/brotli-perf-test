/***********
Stack-Nav
***********/
(function($){

	if (typeof stackNavSection == 'undefined'){

		// object for organizing code
		// Global so our check above works when including this file multiple times
		stackNavSection = new Object;

		// Navbar Sliding Animation Function
		stackNavSection.navBarAnimations = function(){
			$('.lifestyle-tab p').click(function(){
				var $this = $(this);
				var $middleNav = $this.closest('.stack-nav').find('.middle-nav');
				var $lifeStyleTab = $this.closest('.stack-nav').find('.lifestyle-tab');
				if ( $middleNav.is(':visible') ) {
					$lifeStyleTab.find('span').addClass('closed');
				} else {
					$lifeStyleTab.find('span').removeClass('closed');
				}
				$middleNav.stop(true, true).slideToggle();
			});
		}

		$(document).ready(function(){
			
			// load the nav bar animation if the section appears
			if( $('.stack-nav').length > 0 ){
				stackNavSection.navBarAnimations();
			}

		});// end document ready
	}
})(window.jQuery);
