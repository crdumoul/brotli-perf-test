;var CarouselPanels = CarouselPanels || {};

(function ($) {

    /*-----------------------------------------------------------
     carouse_panels.js
     ------------------------------------------------------------*/

    CarouselPanels = (function (element) {
        this.element = element;
    });

    CarouselPanels.prototype.typeStandard = (function () {

        var self = this;
        $(this.element).each(function () {
            //Get Elements
            self.$el = $(this);

            var $oecItemBoxWrapper = self.$el.find('.oec-itemBoxWrapper');
            var $oecCarouselPanelMovePanel = self.$el.find('.oec-carouselPanel-movePanel');
            var $oecCarouselPanelFlame = self.$el.find('.oec-carouselPanel-flame');
            var $oecCarouselPanelPrev = self.$el.find('.oec-carouselPanel-prev');
            var $oecCarouselPanelNext = self.$el.find('.oec-carouselPanel-next');
            var $oecCarouselItemController = self.$el.find('.oec-itemControllerPrev,.oec-itemControllerNext');
            var barragePreventionFlag = true;

            var PANEL_MAX = 5;
            var PANEL_LENGTH = self.$el.find('.oec-carouselItemBox').length;
            var PANEL_WIDTH = self.$el.find('.oec-carouselItemBox').eq(1).outerWidth();

            initializer();

            function initializer() {
                $oecItemBoxWrapper.width(PANEL_LENGTH * PANEL_WIDTH);
                $oecCarouselPanelMovePanel.find('.oec-carouselItemBox:last').prependTo($oecCarouselPanelMovePanel);
                if(PANEL_LENGTH <= PANEL_MAX){
                    $oecCarouselPanelMovePanel.css({'left': '0px'});
                    $oecCarouselPanelFlame.css({'width': 'auto'});
                    $oecCarouselItemController.hide();
                }else{
                    $oecCarouselPanelMovePanel.css({'left': '-' + PANEL_WIDTH + 'px'});
                }

                setPanelSize();
                handlesEvents();
            }

            function movePanel(moveDirection, addDirection) {
                if (barragePreventionFlag) {
                    barragePreventionFlag = false;
                    $oecCarouselPanelMovePanel.stop().animate({'left': moveDirection + PANEL_WIDTH + 'px'}, function () {
                        $oecCarouselPanelMovePanel.css({'left': '-' + PANEL_WIDTH + 'px'});

                        if (addDirection) {
                            $oecCarouselPanelMovePanel.find('.oec-carouselItemBox:first').appendTo($oecCarouselPanelMovePanel);
                        } else {
                            $oecCarouselPanelMovePanel.find('.oec-carouselItemBox:last').prependTo($oecCarouselPanelMovePanel);
                        }
                        barragePreventionFlag = true;
                    });
                }
            }

            function setPanelSize(){
                //setFlame Size
                var panelHeights = [];
                $oecCarouselPanelMovePanel.find('.oec-carouselItemBox').each(function(){
                    panelHeights.push($(this).outerHeight());
                });
                $oecCarouselPanelFlame.height(Math.max.apply(null,panelHeights));
            }


            function handlesEvents() {
                $oecCarouselPanelPrev.on('mouseenter', function () {
                    $(this).stop().animate({translateX: '-=3px'}, 200);
                }).on('mouseleave', function () {
                    $(this).stop().animate({translateX: '0px'}, 200);
                });

                $oecCarouselPanelNext.on('mouseenter', function () {
                    $(this).stop().animate({translateX: '+=3px'}, 200);
                }).on('mouseleave', function () {
                    $(this).stop().animate({translateX: '0px'}, 200);
                });

                $oecCarouselPanelPrev.on('click', function () {
                    movePanel('+=', false);
                });

                $oecCarouselPanelNext.on('click', function () {
                    movePanel('-=', true);
                });
            }

        });

    });


})(jQuery);