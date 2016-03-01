function scrollToWithOffset(elementId) {
    var offset = 160;
    var pageWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if ((pageWidth > 1024) || isIpadPortraitWidth(pageWidth)) {
        offset = 250;
    }

    window.scrollTo(window.scrollX, $(elementId).offset().top - offset);
}

function isIpadPortraitWidth(pageWidth) {
    return (pageWidth == 768);
}