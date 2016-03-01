/****************
Stack-Left-Image
****************/
// remap jQuery to $
(function($){

	if (typeof stackImageSections == 'undefined'){

		// object for organizing code
		stackImageSections = new Object;
		stackImageSections.init = function() {
			$(document).ready(function(){

				// calculating how many sections
				stackImageSections.numberOfSections = $('.js-animate-text').length;

				// Set a variable for all text animation sections
				stackImageSections.animationSections = $('.js-animate-text');

				// Count all sections
				stackImageSections.animationSectionsCount = stackImageSections.animationSections.length

				// fallback if javascript is disabled
				$('.nojs').removeClass('nojs');
				
				// sliding in animated text on scroll in sections enter in number of text sections
				if($('.js-animate-text').length > 0){
					stackImageSections.animatedSections();
				}
			}); // end document ready
		};

		

		// Set a counter
		stackImageSections.count = 0;

		// Return position of the bottom section
		stackImageSections.bottomSection = function() {
			var lastSectionTop = stackImageSections.animationSections.eq(stackImageSections.numberOfSections - 1).offset().top;
			var lastSectionHeight = stackImageSections.animationSections.eq(stackImageSections.numberOfSections).height();
			return (lastSectionHeight + lastSectionTop) - (($(window).height()/4) * 3);
		}

		stackImageSections.fadeInText = function() {

			// Getting the height of the current window to set the animation at the proper scroll position
			var currentScrollPosition = $(window).scrollTop();
			if( stackImageSections.count < stackImageSections.numberOfSections ){

				// Getting the scroll position of the next section
				var sectionScroll = $('.js-animate-text').eq(stackImageSections.count).offset().top;

				// Start the animation at the bottom 1/4th of the window
				var animateStart = sectionScroll - (($(window).height()/5) * 4);
				if( currentScrollPosition >= animateStart ){
					stackImageSections.animationSections.eq(stackImageSections.count).find('.sliding-text').addClass('animate');
					
					// Add the css class to animate
					stackImageSections.count += 1;

					// Now check the next scroll section and run this function again if ifs 1/4 of the window
					if ($('.js-animate-text').eq(stackImageSections.count).length > 0) {
						sectionScroll = $('.js-animate-text').eq(stackImageSections.count).offset().top;
						animateStart = sectionScroll - (($(window).height()/5) * 4);
						if ( currentScrollPosition >= animateStart ) {
							stackImageSections.fadeInText();
						}
					}
				}
			}
		};

		stackImageSections.animatedSections = function(){

			// animation on scroll disable if using a mobile device 
			var screenSize = $(window).width();
			var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		
			if ( ! ismobile ) {
				if( ! $('body').hasClass('mobile') ){
					
					// setting the variable for the animation for each section
					$section = $('.js-animate-text');

					// animate the sections if the page is refreshed and the scroll position is lower then section
					if($(window).scrollTop() >= stackImageSections.bottomSection()){
						stackImageSections.animationSections.eq(stackImageSections.numberOfSections - 1).find('.sliding-text').addClass('animate');
					}
					stackImageSections.fadeInText();
					$(window).scroll(stackImageSections.fadeInText);//end window scroll
				} else {
					//add animate class to make sure elements appear on the page when mobile
					$('.js-animate-text .sliding-text').addClass('animate');
				}
			} //end if is mobile
		};
		stackImageSections.init();
	}

})(window.jQuery);


