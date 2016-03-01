(function (window, $, cricket, undefined) {
    'use strict';

    if (!$) { throw 'jQuery not found.'; }

    cricket.rteFooter = {

        $rteHiddenContent: null,
        $toggleContentButton: null,
        $hideButtonText: null,
        $showButtonText: null,

        /**
         * Init Function
         * @author Donald Gary
         * @version 1601
         * @function init
         * @memberof cricket.rteFooter
         * @description initializes the RTE Footer
         */
        init:  function () {
            cricket.rteFooter.$rteHiddenContent = $('.rte-footer-parsys .rte-footer .toggle-visible-content');
            cricket.rteFooter.$toggleContentButton = $('.rte-footer-parsys .rte-footer .toggle-content-button');
            cricket.rteFooter.$hideButtonText = $('.rte-footer-parsys .rte-footer .toggle-content-button .hide-text');
            cricket.rteFooter.$showButtonText = $('.rte-footer-parsys .rte-footer .toggle-content-button .show-text');
            cricket.rteFooter.bindEvents();
        },

        /**
         * Toggle RTE Content
         * @author Donald Gary
         * @version 1601
         * @function toggleRteContent
         * @memberof cricket.rteFooter
         * @description toggles display of footer rte content and aria attribute values
         */
        toggleRteContent: function () {
            cricket.rteFooter.$rteHiddenContent.slideToggle(300, function(){
                cricket.rteFooter.$hideButtonText.toggleClass('hidden');
                cricket.rteFooter.$showButtonText.toggleClass('hidden');
            });

            cricket.rteFooter.$toggleContentButton.find('[aria-hidden]').each(function(){ return !$(this).attr('aria-hidden') == true });
            cricket.rteFooter.$rteHiddenContent.attr('aria-expanded') == 'true' ? cricket.rteFooter.$rteHiddenContent.attr({'aria-expanded': 'false', 'aria-hidden': 'true' }) : cricket.rteFooter.$rteHiddenContent.attr({'aria-expanded': 'true', 'aria-hidden': 'false' });
        },

        /**
         * Bind Events
         * @author Donald Gary
         * @version 1601
         * @function bindEvents
         * @memberof cricket.rteFooter
         * @description Bind Events for the RTE Footer content
         */
        bindEvents: function () {

            cricket.rteFooter.$toggleContentButton.on('click', function () {
                cricket.rteFooter.toggleRteContent();
            });

            cricket.rteFooter.$toggleContentButton.on('keydown', function (e) {
                if(e.which === 13){
                    e.preventDefault();
                    cricket.rteFooter.toggleRteContent();
                }
            });

        }
    };

} (window, $, window.cricket = window.cricket || {}));

$(document).ready(function () {
    cricket.rteFooter.init();
});

