(function($,sr){
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
 
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };
 
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
 
          timeout = setTimeout(delayed, threshold || 500); 
      };
  }
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
}(jQuery,'smartresize'));


/*
 * All java script logic for the mobile layout.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 * The logic extends the JS namespace app.*
 */
(function(app, $, undefined) {
	
	app.responsive = {
	
		mobileLayoutWidth : 767,
		
		init : function () {
			
			if($(window).width() < 768){
				$('.mobile-category-toggle-content').hide();
				$('h3.mobile-category-toggle').removeClass("expanded");
				$('.mobile-filter-toggle-content h3').removeClass("expanded");
	
				
				$(".mobile-filter-toggle-content .toggle-content").each(function( index ) {
					if(!$(this).children("li").hasClass("selected")){
						$(this).hide();
					}
					else {
						$(this).prev().addClass("expanded");
					}
				});
			}
			
			$('body').append('<div class="pageMask"/>');
			
			$cache = {
				pageMask: $('.pageMask'),
				wrapper: $('#wrapper'),
				navigation: $('#navigation'),
				homepageSlider: $('#homepage-slider'),
				secondaryFolder: $('.secondary-folder')
			};

			// toggle menu element
			$cache.navigation.find('.navigation-header')
				.click(function(){
					jQuery(this).siblings('.menu-category').toggle();
				});
			$cache.wrapper.find('.navigation-bars').on('click', function(e){
				$cache.pageMask.fadeIn();
				$('body').addClass('openMenu');
			});
			
			$('body').find('.navigation-close, .pageMask').on('click', function(e){
				$cache.pageMask.fadeOut();
				$('body').removeClass('openMenu');
				$('body').removeClass('openSecondary');
				$('.toggle').removeClass('expanded');
			});
			
			
			$cache.wrapper.find('.mobile-filter-show').on('click', function(e){
				$cache.pageMask.fadeIn();
				if($(window).width() < 768){
					$('.mobile-category-toggle-content').hide();
					$('h3.mobile-category-toggle').removeClass("expanded");
					$('.mobile-filter-toggle-content h3').removeClass("expanded");
					
					$(".mobile-filter-toggle-content .toggle-content").each(function( index ) {
						if(!$(this).children("li").hasClass("selected")){
							$(this).hide();
						}
						else {
							$(this).show().prev().addClass("expanded");
						}
					});
				}
				$('body').addClass('openSecondary');
			});
				
			/*********** TODO: Starter code for the slide-out menu for CWC
			
			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation'),
					header: $('header'),
					homepageSlider: $('#homepage-slider')
				};

			// toggle menu element
			$cache.header.find('.navigation-header')
				.click(function(){
					$cache.navigation.toggle();
				});
			
			*******************************************/
		},
		
		// build vertical, collapsable menu
		enableMobileNav : function(){
			
			$cache.navigation.find('.menu-category')
				.children('li')
					.children('a')
						.click(function(){
							if( (jQuery(this).siblings().length > 0 ) && (!jQuery(this).siblings().is(":visible"))) {
								jQuery(this)
									.append('<span>close</span>')
									.children('span')
										.click(function(){
											jQuery(this).parent().siblings().hide();
											jQuery(this).remove();
											return false;
										})
									.parent().siblings().show();
								return false;
							} 
						})
		},
		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			$cache.navigation.find('.menu-category').show();
			$cache.navigation.find('.level-2').removeAttr('style');
			$cache.navigation.find('.level-1 span').remove();
		},
		
		// pull the slideshow into a variable to re-use
		rebuildHomepageSlides: function() {
			if($cache.homepageSlider.length > 0){
				var homeCarousel = 	$cache.homepageSlider.data('jcarousel');
				homeCarousel.stopAuto();
				homeCarousel.scroll(1);
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
				homeCarousel.reload();
			}
		},
		
		toggleGridWideTileView : function(){
			
			/*	toggle grid/wide tile	*/
			if(jQuery('.toggle-grid').length == 0 && (jQuery('.pt_order').length == 0) && (jQuery('.pt_content-search-result').length == 0))
			{
				jQuery('.results-hits').prepend('<a class="toggle-grid" href="'+location.href+'"><i class="fa fa-th-large"></i>&nbsp;<i class="fa fa-th-list"></i></a>');
				jQuery('.toggle-grid').click(function(){
					jQuery('.search-result-content').toggleClass('wide-tiles');
					return false;
				});
			}
			
		}
	}
	
	
	
	
	$(document).ready(function(){
		
		app.responsive.init();
		
		// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		if(screen.width > 767){
			
			$(window).smartresize(function(){
	
				if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
					app.responsive.rebuildHomepageSlides();
				}
				else {
					app.responsive.disableMobileNav();
					app.responsive.rebuildHomepageSlides();
				}
	
			});
		
		}

	});
		
}(window.app = window.app || {}, jQuery));



