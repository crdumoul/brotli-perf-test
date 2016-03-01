window.onload = function() {
   (function($) {
      window.$ = window.jQuery;

      $( '.js-add-to-cart' ).click( function () {
         $( document ).trigger( 'addToCart.minicart', {
            item: {
               storeId:  8000,
               quantity: 1,
               sku:      'membership'
            }
         });
      });   

   })(jQuery);
}