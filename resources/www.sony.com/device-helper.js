$( document ).ready(function() {
    var md = new MobileDetect(window.navigator.userAgent);

    // display placeholder images for YT
    if (1 == 2 && ( md.match('Bravia') || md.is('TV')) ) {
        var placeholder = '/static/img/yt_placeholder.png';
        var vine_placeholder = '/static/img/vine_placeholder.png';
        // replace vines and youtube panels
        $('.ctt-youtube .play').remove();
        $('.ctt-youtube .source').remove();
        $('.ctt-youtube .video-wrapper').remove();
        $('.ctt-vine .vine-embed').replaceWith('<img src="' + vine_placeholder + '" />');
        $('.ctt-vine .vine-fallback').removeClass('hidden');
    }
});
