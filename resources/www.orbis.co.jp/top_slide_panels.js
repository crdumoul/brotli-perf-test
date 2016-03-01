;var SlidePanels = SlidePanels || {};

(function($) {

	SlidePanels = (function(element) {
		this.element = element;
	});

	SlidePanels.prototype.typeStandard = (function() {
		var self = this;
		var panelIndex = 1;
		var autoSlider;
		var disableAutoSlide = false;

		$(this.element).each(function() {
			//Get Elements
			self.$el = $(this);

			var $keyVisual = self.$el.find('.oec-topSlidePanelsJsKeyvisual');
			var $prev = self.$el.find('.oec-topSlidePanelsJsPrev');
			var $next = self.$el.find('.oec-topSlidePanelsJsNext');
			var $thumb = self.$el.find('.oec-topSlidePanelsJsThumb');
			var panelLength = $thumb.find('li').length;

			startAutoSlide();

			$thumb.find('li').on('click', function(event) {
				event.preventDefault();
				panelIndex = parseInt($(this).index()) + 1;
				movePanel($thumb, $keyVisual, panelIndex);
				disableAutoSlide = true;
			});

			$thumb.find('li').on('mouseenter', function() {
				stopAutoSlide();
			}).on('mouseleave', function() {
				if (!disableAutoSlide) startAutoSlide();
			});

			$keyVisual.on('mouseenter', function() {
				stopAutoSlide();
			}).on('mouseleave', function() {
				if (!disableAutoSlide) startAutoSlide();
			});

			$prev.on('click', function() {
				panelIndex--;
				if (panelIndex <= 0) {
					panelIndex = panelLength;
				}
				movePanel($thumb, $keyVisual, panelIndex)
				disableAutoSlide = true;
			});

			$next.on('click', function() {
				panelIndex++;
				if (panelIndex > panelLength) {
					panelIndex = 1;
				}
				movePanel($thumb, $keyVisual, panelIndex)
				disableAutoSlide = true;
			});

			function startAutoSlide() {
				autoSlider = setInterval(function() {
					panelIndex++;
					if (panelIndex > panelLength) {
						panelIndex = 1;
					}
					movePanel($thumb, $keyVisual, panelIndex);
				}, 5000);
			}

			function stopAutoSlide() {
				if (autoSlider) clearInterval(autoSlider);
			}
		});

		function movePanel($thumb, $keyvisual, panelIndex) {

			$thumb.find('li').find('.oec-topSlidePanelsJsArrow').stop(true, false).fadeTo(300, 0, function() {
				$(this).remove();
				$thumb.find('li').removeClass('oec-topSlidePanelsJsCurrent');
			});

			$thumb.find('li').eq(panelIndex-1).addClass('oec-topSlidePanelsJsCurrent');
			$thumb.find('li').eq(panelIndex-1).find('a').prepend('<div class="oec-topSlidePanelsJsArrow"><div class="oec-arrow"></div></div>');

			$keyvisual.stop(true, false).hide(0, function() {
				$($keyvisual[panelIndex-1]).stop(true, false).delay(100).fadeTo(1100, 1);
			});
		}
	});
})(jQuery);