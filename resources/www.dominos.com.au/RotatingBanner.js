/**
 * Inits Owl Carousel
 * @returns void 
 */
function initBanner() {
    if (typeof (useLocalTime) == "undefined") useLocalTime = false;
    if (typeof (withYoutube) == "undefined") withYoutube = false;
    console.log("========================== INIT banner carousel ==========================");
    console.log("useLocalTime:", useLocalTime, "withYoutube:",withYoutube);
    console.log("Using " + (useLocalTime ? "LOCAL" : "SERVER") + " time");
    // this needs to happe AFTER date filter for proper carouseling
    var owlOptions = {
        navigation: true,
        navigationText: ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
        slideSpeed: 300,
        paginationSpeed: 800,
        pagination: true,
        autoPlay: true,
        singleItem: true,
        rewindNav: true,
        mouseDrag: false,
        touchDrag: true
    };
    if (useLocalTime) {
        owlOptions.beforeInit = filterByLocalDate("#rotating-banner .banner-background");
    }
    if (withYoutube) {
        owlOptions.afterInit = initYoutubePlayerAPI;
        owlOptions.beforeMove = stopAllVideos;
    }
    $("#rotating-banner").owlCarousel(owlOptions);
    window.owl = $("#rotating-banner").data('owlCarousel');

 }

function stopCarousel() {
    if (window.owl.apStatus == "stop") return;
    console.log("stop carousel");
    window.owl.stop();
}
function startCarousel() {
    if (window.owl.apStatus == "play") return;
    console.log("start carousel");
    window.owl.play();
}
/*
 * Fixes a chrome bug: carousel items are shifted to the left when clicking on youtube iframe
 */
function fixCarouselPosition() {
    // check if current item is properly positioned
    if ($($(".owl-item")[window.owl.currentItem]).offset().left == 0) {
        console.log("owl items are all good! no fixing required");
        return;
    }
    console.log("owl items are shifted! fixing position");
    $(".owl-item").each(function(i) {
        var offset = $(this).offset();
        var gap = i - window.owl.currentItem;
        var newleftpos = gap * window.owl.itemWidth;
        $(this).offset({ left: newleftpos });
        console.log("item " + i + " is at offset " + offset.left + ", moving to " + newleftpos);
    });
}

onDocumentReady(function () {
    $.getScript("/Scripts/owl-carousel/owl.carousel.js", initBanner);

});
