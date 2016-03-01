(function(w, $){
'use strict';

if($ === void 0) return;

var ImageRollover = (function(){

	function IR() {
		this.elms = {
			wrapper: $(),
			rollOverImage: null,
			rollOutImage: null
		};
		this.options = {
			suffix: '_on',
			speed: 300,
			rolloverClass: 'oec-imageRollover'
		};
	}

	IR.prototype.setWrapper = function($elm) {
		if(!$elm instanceof jQuery) return;
		this.elms.wrapper = $elm;
		return this;
	};

	IR.prototype.setOptions = function(options) {
		if(typeof options !== 'object') return;
		this.options = {
			suffix: options.suffix || this.options.suffix,
			speed: options.speed || this.options.speed,
			rolloverClass: options.rolloverClass || this.options.rolloverClass
		};
		return this;
	};

	IR.prototype.prepare = function() {
		this.elms.rollOutImage = this.elms.wrapper.find('img').first();
		this.elms.rollOverImage = this.elms.rollOutImage.clone(false);

		this.elms.rollOverImage
			.attr('src', this.elms.rollOutImage[0].src.replace(/^(.+)(\.[a-z]+)$/, '$1'+this.options.suffix+'$2'))
			.css({position: 'absolute', opacity: '0'})
			.addClass(this.options.rolloverClass);

		this.elms.wrapper.prepend(this.elms.rollOverImage);
		return this;
	};

	IR.prototype.rollover = function() {
		this.elms.rollOverImage.animate({opacity: '1'}, this.options.speed);
		return this;
	};

	IR.prototype.rollout = function() {
		this.elms.rollOverImage.stop().animate({opacity: '0'}, this.options.speed);
		return this;
	};

	IR.prototype.bindRolloverImage = function() {
		var self = this;
		this.elms.wrapper.on({
			'mouseenter': function() {
				self.rollover();
			},
			'mouseleave': function() {
				self.rollout();
			}
		});
		return this;
	};

	IR.prototype.start = function() {
		this.prepare();
		this.bindRolloverImage();
		return this;
	};

	return IR;
})();

$(function(){
	$('.oec-imageRolloverWrapper').each(function(){
		var imageRollover = new ImageRollover();
		imageRollover.setWrapper($(this)).start();
	});
});

})(window, jQuery);