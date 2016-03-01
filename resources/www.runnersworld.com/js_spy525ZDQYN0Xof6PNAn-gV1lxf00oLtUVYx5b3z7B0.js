jQuery(document).ready(function($) {
  var url = "http://widgets.outbrain.com/outbrain.js";
  var include_outbrain_widget = true;
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w <= 699) {
    $('div[data-widget-id]').each(function(index) {
      switch($(this).attr('data-widget-id')) {
        case "AR_3":
          $(this).attr('data-widget-id', outbrain_article_bottom_mobile);
          break;
        case "VR_3":
          $(this).attr('data-widget-id', outbrain_article_bottom_mobile);
          break;
        case "AR_4":
          $(this).attr('data-widget-id', outbrain_slideshow_bottom_mobile);
          break;
        case "AR_10":
          if ($(this).parent().length > 0) {
            $(this).parent().remove();
          }
          include_outbrain_widget = false;
          break;
      }
    });
  }

  if (include_outbrain_widget) {
    $.getScript(url);
  }
});
;
