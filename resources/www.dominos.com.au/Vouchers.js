function applyBoxFit(){
    $.getScript("/Scripts/jquery.boxfit.min.js", function () {
        $('.offer-title').boxfit({ multiline: true, maximum_font_size: 56, align_center: false, align_middle: false });
    });
}

if (navigator.userAgent.indexOf("MSIE 9") < 0) {
    onDocumentReady(applyBoxFit);
}