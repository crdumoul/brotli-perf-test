$(function() {
	var kuchikomiCarouselPanel = $('#kuchikomiCarouselPanel').bxSlider({
		mode: 'vertical',
		responsive: false,
		infiniteLoop: true,
		useCSS: false,
		minSlides: 3,
		maxSlides: 100,
		slideMargin: 7,
		adaptiveHeight: true,
		controls: true,
		pager: false,
		prevSelector: '#kuchikomiCarouselPanelPrev',
		nextSelector: '#kuchikomiCarouselPanelNext',
		nextText: '',
		prevText: '',
		touchEnabled: true,
		moveSlides: 3,

		bindSelector: true,
		slideWidth: 482,
		itemWidthAdjust: 12
	});
});