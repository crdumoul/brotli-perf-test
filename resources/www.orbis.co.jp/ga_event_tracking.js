// 指定要素配下のaタグにクリックイベントを貼る
var dataLayer = dataLayer || [];
(function($) {
    function attachClickEvent( selector, eventName) {
        if($(selector).length) {
            $(selector + ' a').each(function() {
                $(this).click(function() {
                	dataLayer.push({'event':eventName,'dl_clickurl':$(this).attr('href')});
                });
            });
        }
        else{
            return;
        }
    }
    attachClickEvent('#pcMegamenuSale','pcMegamenuNewitemClick');
    attachClickEvent('#pcMegamenuCampaign','pcMegamenuCampaignClick');
})(jQuery);
