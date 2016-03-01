var SlideOpenContents = SlideOpenContents || {};

;(function($) {

    /*-----------------------------------------------------------
     SlideOpenContents
     ------------------------------------------------------------*/


    SlideOpenContents = function slideOpenContents(element) {

        $(element).each(function () {

            //Get Elements
            var $el = $(this);
            var $openSlide = $el.find('.oec-slideOpenBtnClickHandle');
            var $closeSlide = $el.find('.oec-slideOpenBtnClose');
            var $slide = $el.find('.oec-slideOpenBtnOpen');

            var closePanelFlag = $(this).hasClass('oec-slideOpen-close-off');

            //Get box height
            var boxHeight = $el.find('.oec-slideOpenContentBox').outerHeight();
            var itemQuickOrderBtn = $el.find('.oec-slideOpenBtn').outerHeight();

            //Setting OpenSlide height
            var BOX_BORDER_BOTTOM = 8;
            var OPEN_SLIDER_HEIGHT = (boxHeight + itemQuickOrderBtn) + BOX_BORDER_BOTTOM;


            function initialize() {
                handlesEvents();
            }

            function handlesEvents() {
                //openSlide!
                $openSlide.on('click', function () {
                    $closeSlide.removeClass('on');

                    $(this).addClass('on');

                    if(!closePanelFlag){
                        $('.oec-slideOpenBtnOpen').animate({'height': 0}, {
                            duration: 300,
                            queue: false
                        });
                    }

                    $slide.animate({'height': OPEN_SLIDER_HEIGHT},{
                        duration: 300,
                        queue: false,
                        complete: function(){
                            $slide.css('height', 'auto');
                        }
                    });
                });
                //closeSlide!
                $closeSlide.on('click', function () {
                    $openSlide.removeClass('on');
                    $(this).addClass('on');
                    $slide.animate({'height': 0}, 300);
                });
            }

            initialize();

        });
    };

    //


})(jQuery);