/*******************
Stack-Brain Section
*******************/
(function($){

	if (typeof stackBrainSection == 'undefined') {
		
		//object for organizing code
		stackBrainSection = new Object;
		stackBrainSection.brainAnimations = function(){

			//animation on scroll disable if using a mobile device 
			var screenSize = $(window).width();
			var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
			
			//add animate class if user is on a mobile/tablet device
			if(ismobile){
				$('.brain-wrapper, .sliding-text').addClass('animate');
			}
			if (!ismobile){
				if(!$('body').hasClass('mobile')){
					
					// setting the variable for the animation for each section
					var pageHeight = $(document).height();
					var windowHeight = $(window).height();
					var bottomSection = $('.brain-section').offset().top;
					var currentScrollPosition = $(window).scrollTop();
					bottomSection = bottomSection - ((windowHeight/4) * 3);
					if(currentScrollPosition >= bottomSection){
						$('.brain-wrapper').addClass('animate');
					}
					$(window).scroll(function(){
						var pageHeight = $(document).height();
						var windowHeight = $(window).height();
						var bottomSection = $('.brain-section').offset().top;
						var currentScrollPosition = $(window).scrollTop();
						bottomSection = bottomSection - ((windowHeight/4) * 3);
						if(currentScrollPosition >= bottomSection){
							$('.brain-wrapper').addClass('animate');
						}

					});//end window scroll
				}//end screen size
				else {
					//add animate class to make sure elements appear on the page
					$('.brain-wrapper, .sliding-text').addClass('animate'); 
				}
			} //end if is mobile
		};
		$(document).ready(function(){
			//fallback if javascript is disabled
			$('.nojs').removeClass('nojs');

			if($('.stack-brain-section').length > 0){
				stackBrainSection.brainAnimations();
			}

		});//end document ready
	}
})(window.jQuery);
