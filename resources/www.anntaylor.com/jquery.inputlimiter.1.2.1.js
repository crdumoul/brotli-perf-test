/*
 * jQuery Input Limiter plugin 1.2.1
 * http://rustyjeans.com/jquery-plugins/input-limiter/
 *
 * Copyright (c) 2009 Russel Fones <russel@rustyjeans.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {
	$.fn.inputlimiter = function(options) {
        function setPosition() {
            
            if ( $(this).val().length > opts.limit ) {
                $(this).val($(this).val().substring(0,opts.limit));
            }

            if ( opts.boxAttach )
            {
                $('#'+opts.boxId).css({
                    'z-index': 2000
                });
            }
            var charsRemaining = opts.limit - $(this).val().length;
            var remText = opts.remTextFilter(opts, charsRemaining);
            var limitText = opts.limitTextFilter(opts);

            if ( opts.limitTextShow )
            {
                $('#'+opts.boxId).html(remText + ' ' + limitText);

                // Show the limiter box
                $('#'+opts.boxId).show();
            }
            else {  
                $('#'+opts.boxId).html(remText).show();
            }
            
            if (charsRemaining == 0) {
                $('#'+opts.boxId).css('font-weight', 'bold');
            } else {
                $('#'+opts.boxId).css('font-weight', 'normal');
            }
                
        }

		var opts = $.extend({}, $.fn.inputlimiter.defaults, options);
		if ( opts.boxAttach && !$('#'+opts.boxId).length )
		{
			// apply bgiframe if available
			if ( $.fn.bgiframe )
				$('#'+opts.boxId).bgiframe();

		}
		$(this).each(function(i){
			$(this).unbind();
			$(this).keyup(function(e){
                setPosition.call(this, e);
			});
			$(this).keypress(function(e){
				if ( (!e.keyCode || (e.keyCode > 46 && e.keyCode < 90)) && $(this).val().length >= opts.limit )
					return false;
			});
			$(this).blur(function(){
				if ( opts.boxAttach )
				{
					//$('#'+opts.boxId).fadeOut('fast');
				}
				else if ( opts.remTextHideOnBlur )
				{
					var limitText = opts.limitText;
					limitText = limitText.replace(/\%n/g, opts.limit);
					limitText = limitText.replace(/\%s/g, ( opts.limit == 1?'':'s' ));
					$('#'+opts.boxId).html(limitText);
				}
			});
            setPosition.call(this);
		});
	};

	$.fn.inputlimiter.remtextfilter = function(opts, charsRemaining) {
		var remText = opts.remText;
		if ( charsRemaining == 0 && opts.remFullText != null ) {
			remText = opts.remFullText;
		}
		remText = remText.replace(/\%n/g, charsRemaining);
		remText = remText.replace(/\%s/g, ( opts.zeroPlural ? ( charsRemaining == 1?'':'s' ) : ( charsRemaining <= 1?'':'s' ) ) );
		return remText;
	};

	$.fn.inputlimiter.limittextfilter = function(opts) {
		var limitText = opts.limitText;
		limitText = limitText.replace(/\%n/g, opts.limit);
		limitText = limitText.replace(/\%s/g, ( opts.limit <= 1?'':'s' ));
		return limitText;
	};

	$.fn.inputlimiter.defaults = {
		limit: 120,
		boxAttach: true,
		boxId: 'limiterBox',
		boxClass: 'fine-print char-limit',
        remText: '%n character%s left',
		remTextFilter: $.fn.inputlimiter.remtextfilter,
		remTextHideOnBlur: false,
		remFullText: null,
		limitTextShow: false,
		limitText: 'Field limited to %n character%s.',
		limitTextFilter: $.fn.inputlimiter.limittextfilter,
		zeroPlural: true
	};

})(jQuery);