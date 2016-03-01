/*
 * Depends on jquery
 * Depends on jquery.cookies
 * Depends on jquery.query
 * Depends on 100_date.js
 */

;(function(window, $){
    var NCLCommon = NCLCommon || {};

    (NCLCommon.cidCookie = {
        init : function() {
            NCLCommon.cidCookie.addCIDCookie();
        },
        /*Add ncl_lastCID cookie if CID parameter is present on URL*/
        addCIDCookie : function() {
            var query = $.query.load(document.location.href);
            if(query.get('cid')) {
                $.cookies.set('ncl_lastCID', query.get('cid'), {
                    domain: "ncl.com",
                    expiresAt: Date.now().addDays(90)
                });
            }
        }
    }).init();

})(window, jQuery);
