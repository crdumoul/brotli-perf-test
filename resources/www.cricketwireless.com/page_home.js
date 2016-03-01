/**
 * Home Page object functions
 * @ author Charles Jones
 * @ version pre 1508
 * @ description Object containing Functions for the Home Page
 */

(function (window, $, cricket) {
    'use strict';

    if (!$) {
        throw 'jQuery not found.';
    }

    cricket.home = {

        slider: function() {
            $('#homeSlider').cycle({
                fx: 'fade',
                log: false,
                manualFx: 'scrollHorz',
                manualTrump: false,
                manualSpeed: 250,
                next: '> .next',
                pager: '.pagination',
                pagerTemplate : '<li tabindex="0" class="slider-circle" aria-label="" role="button"></li>',
                pauseOnHover: true,
                prev: '> .prev',
                swipe: true,
                swipeFx: 'scrollHorz',
                slides: '> div',
                speed: 1500,
                timeout: 5000
            });
        },
        /**
         * Loads the Modals
         * @author Brian Boyett
         * @version 1505
         * @description Loads the Modals and adds in the callback Event.
         */
        sliderModals: function() {
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/promoCardTerms.handlebars');
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/promoHomePageCarousel.handlebars', null, function() {
                $('#modal-promo-home-page-carousel-1').on('hidden.bs.modal', function () { // modal has been hidden
                   $("#homeSlider").cycle('resume');

                });
            });
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/promoHomePageCarouselTwo.handlebars', null, function() {
                $('#modal-promo-home-page-carousel-2').on('hidden.bs.modal', function () { // modal has been hidden
                    $("#homeSlider").cycle('resume');
                });
            });
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/promoHomePageCarouselThree.handlebars', null, function() {
                $('#modal-promo-home-page-carousel-3').on('hidden.bs.modal', function () { // modal has been hidden
                    $("#homeSlider").cycle('resume');
                });
            });
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/promoHomePageCarouselFour.handlebars', null, function() {
                $('#modal-promo-home-page-carousel-4').on('hidden.bs.modal', function () { // modal has been hidden
                    $("#homeSlider").cycle('resume');
                });
            });
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/promoHomePageCarouselFive.handlebars', null, function() {
                $('#modal-promo-home-page-carousel-5').on('hidden.bs.modal', function () { // modal has been hidden
                    $("#homeSlider").cycle('resume');
                });
            });
        },

        /**
         * Label Circles
         * @author Donald Gary
         * @version 1510
         * @description Labels the slider circles with a reformatted verison of their respective promotion link
         */
        labelCircles: function(){
            var promoLinks = $('#homeSlider div a img').parent(),
                circles = $('ul.pagination li');
            promoLinks.each(function(i){
                circles[i].setAttribute('aria-label', promoLinks[i].href.split('\/').pop().replace(/(-|\.html)/g, " ").trim() + " promotion");
            });
        },
        sliderPaused: function(){
            return $('#homeSlider').hasClass('cycle-paused');
        },
        toggleSliderOnFocus: function(){
            $('#topSlider').on('focusin mouseenter', function(event){
                $(".next, .prev").css('opacity', '100');
                if(!cricket.home.sliderPaused() ){//&& cricket.accessibility.isChildOf('#topSlider', event.target)){
                    $("#homeSlider").cycle('pause');
                }
            });
            $('#topSlider').on('focusout mouseleave', function(event){
                $(".next, .prev").css('opacity', '0');
                if(cricket.home.sliderPaused()){
                    $("#homeSlider").cycle('resume');
                }
            });
        },
        stopClick: function() {
            $(".mailIn-tc").on("click", function() {
                $("#homeSlider").cycle('pause');
            });
        },
        focusPause: function(){
            $('#homeSlider').on('focusin', this.cycle('pause'));
            $('#homeSlider').on('focusout', this.cycle('resume'));
        },
        nextSlide: function() {
            $('.next').on('click', function(){
                $('#homeSlider').cycle('next');
            });
        },
        prevSlide: function() {
            $('.prev').on('click', function(){
                $('#homeSlider').cycle('prev');
            });
        },
        goTo: function(){
            $('ul.pagination li').keydown(function(event){
                var promoIndex = $(event.target).index();
                if(event.which == 13){
                    $('#homeSlider').cycle('goto', promoIndex);
                }
            });
        },
        bindEvents: function() {
            cricket.home.stopClick();
            cricket.home.toggleSliderOnFocus();
            cricket.home.nextSlide();
            cricket.home.prevSlide();
            cricket.home.goTo();
        },
        mobileSlider: function() {
            var browserWidth = window.innerWidth;

            if ( browserWidth > '480' || device.tablet() ) {

                $('#addShopInfo .shop-slider').cycle('destroy');

            } else if ( browserWidth <= '480' || device.mobile() ) {

                $('#addShopInfo .shop-slider').cycle({
                    fx: 'fade',
                    log: false,
                    manualFx: 'scrollHorz',
                    manualTrump: false,
                    manualSpeed: 250,
                    pager: '.mobilePagination',
                    pagerTemplate : '<li></li>',
                    pauseOnHover: true,
                    swipe: true,
                    swipeFx: 'scrollHorz',
                    slides: '> div',
                    speed: 1000,
                    timeout: 5000
                });
            }
        },
        init: function() {
            cricket.home.slider();
            cricket.home.bindEvents();
            cricket.home.sliderModals();
            cricket.home.mobileSlider();
            cricket.home.labelCircles();
        }
    };

} (window, $, window.cricket = window.cricket || {}));

$(document).ready(function(){
    cricket.home.init();
});

$(window).resize(function(){
    cricket.home.mobileSlider();
});
