/*global window, console, jQuery, $, document */
/*global requestTick, adjustParallaxElements, centerGalleries, adjustSixteenNines */


var latestKnownScrollY = 0,
	ticking = false,
	windowWidth = 0;

jQuery(document).ready(function () {
	'use strict';
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('html').addClass('mobile');
	} else {
		$('html').addClass('non-mobile');
	}

	windowWidth = $(window).innerWidth();

	$(window).scroll(function (event) {
		latestKnownScrollY = $(this).scrollTop();
		requestTick();
	});
	requestTick();

	$('.video-mobile').on('click', function (event) {
		event.preventDefault();

		var width = $(this).width(),
			src = $(this).find('iframe').attr('src') + '&autoplay=1';

		$(this).parent().addClass('playing');

		$(this).find('iframe').attr('src', src).width(width).height(300);
	});

	$('.video-swap').on('click', function (event) {
		event.preventDefault();

		var videoEl = $(this).attr("href");
		$(videoEl).find('iframe').attr('src', $(videoEl).find('iframe').data('autoplay-src'));
		$(videoEl).fadeIn(900).addClass('active').find('.close').on('click', function (event) {
			event.preventDefault();
			$(this).parent().removeClass('active').fadeOut().siblings('.container-background').removeClass('active');
			$(this).parent().find('iframe').attr('src', '');
		});
		$(videoEl).siblings('.container-background').addClass('active');
		adjustSixteenNines();
	});


	$(window).resize(function (event) {
		adjustParallaxElements();
		centerGalleries();
		adjustSixteenNines();
		windowWidth = $(window).innerWidth();
	});
	
	centerGalleries();
	
	var domchecker = setInterval(function () {
		if ($('#company-notification').length > 0) {
//			clearInterval(domchecker);
			adjustParallaxElements();
		}
	}, 250);

});

function centerGalleries() {
	'use strict';
	if ($(window).innerWidth() <= 1024) {
		$('.gallery').each(function () {
			var scrollToPos = ($(this).children().first().width() - windowWidth) * 0.5;
			$(this).scrollLeft(scrollToPos);
		});
	}
}

function adjustSixteenNines() {
	'use strict';
	$('.sixteen-nine').each(function () {
		if ($(window).innerWidth() <= 799) {
			$(this).height($(this).width() * 9 / 16);
		} else {
			$(this).css('height', '100%');
		}
	});
}

function adjustParallaxElements() {
	'use strict';
	$('.parallax-tracking').each(function () {

		var headerHeight = 0,
			offset,
			prevSibling,
			prevSiblingBottomEdgeInWindow = -$(window).scrollTop();

		headerHeight = ($('#company-notification').length > 0 && $('#company-notification').css('display') !== 'none') ? $('#company-notification').height() : 0;

		if ($(this).parent().index() > 0) { // these are fixed elements, that need to be aligned to their prev sibling's bottoms
			prevSibling = $(this).parent().prev();
			prevSiblingBottomEdgeInWindow = -$(window).scrollTop() + (prevSibling.offset().top + prevSibling.height());
		}

		offset = Math.floor((prevSiblingBottomEdgeInWindow) * -0.8);

		prevSiblingBottomEdgeInWindow = prevSiblingBottomEdgeInWindow + headerHeight;
		if ($(window).width() < 1280) {
			offset = 0;
			prevSiblingBottomEdgeInWindow = 0;
		}
		$(this).parent().css('top', prevSiblingBottomEdgeInWindow);
		$(this).css('top', offset + 'px');
	});
	ticking = false;
}


function requestTick() {
	'use strict';
	if (window.requestAnimationFrame) {
		if (!ticking) {
			window.requestAnimationFrame(adjustParallaxElements);
		}
	} else {
		adjustParallaxElements();
	}
	ticking = true;
}