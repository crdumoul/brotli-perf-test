function initSpecialOffers() {
    console.log("initSpecialOffers");
    var spacer = $("#footer-spacer");
    if (spacer.length > 0) {
        console.log("move disclaimer above footer");
        $("#disclaimer-footer").insertBefore(spacer);
    } else {
        setTimeout(initSpecialOffers, 100);
    }
}
onDocumentReady(initSpecialOffers);