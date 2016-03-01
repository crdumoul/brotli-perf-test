function initWidgets() {
    console.log("initWidgets");
    if ($("#footer").length > 0) {
        console.log("move widget to footer");
        $("#footer").prepend($("#widget-ribbon"));
        $("#footer").prepend($("#eclub-wrapper"));
        $("#footer").prepend($("#localstore-wrapper"));
    } else {
        setTimeout(initWidgets, 100);
    }
}
onDocumentReady(initWidgets);