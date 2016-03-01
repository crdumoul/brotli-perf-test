$(function () {

  $('.promotion-overlay, .promotion-overlay .share-close').on('click', function(e) {
    e.stopPropagation();
    // stop the video first.
    document.getElementById('promotion-ytplayer').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    $('.promotion-overlay').hide();
    jQuery("body").trigger("spectre_popup_closed");
  });

  $('.promotion-overlay .promotion-body').on('click', function(e) {
    e.stopPropagation();
  });
});