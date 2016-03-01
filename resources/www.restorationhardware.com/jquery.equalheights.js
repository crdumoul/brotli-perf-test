/*!
 * Simple jQuery Equal Heights
 *
 * Copyright (c) 2013 Matt Banks
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.5.1
 */
(function($) {

    $.fn.equalHeights = function(options) {
        var maxHeight = 0,
            $this = $(this),
            equalHeightsFn = function() {
                var height = $(this).innerHeight();
                console.log('innerHeight ' + height);
    
                if ( height > maxHeight ) { 
                    console.log('height > maxHeight ' + maxHeight);
                    maxHeight = height; }
            };
        options = options || {};

        $this.each(equalHeightsFn);

        if(options.wait) {
            var loop = setInterval(function() {
                if(maxHeight > 0) {
                    clearInterval(loop);
                    console.log('maxHeight' + maxHeight);
                    return $this.css('height', maxHeight);
                }
                $this.each(equalHeightsFn);
            }, 100);
        } else {
            console.log('maxHeight 3 ' + maxHeight);
            return $this.css('height', maxHeight);
        }
    };

    // auto-initialize plugin
    $('[data-equal]').each(function(){
        var $this = $(this),
            target = $this.data('equal');
        $this.find(target).equalHeights();
    });

})(jQuery);