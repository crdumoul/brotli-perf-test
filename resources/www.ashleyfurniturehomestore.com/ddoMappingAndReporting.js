$(document).on('UpdateDDO_orderDetail', function (event, data) {
    if (typeof window.DDO != "undefined")
        mapDDOData(data);
});

$(document).on('UpdateDDO_checkoutPages', function (event, data) {
    if (typeof window.DDO != "undefined") {
        mapDDOData(data);
    }
});

function mapControlSectionToDDOPageName(sectionName) {
    var ddoPageName = "Unknown"; //Default Value
    switch (sectionName.toLowerCase()) {
        case "cartviewpagemode":
            ddoPageName = "afh:checkout:shopping cart";
            break;
        case "shipping":
            ddoPageName = "afh:checkout:shipping";
            break;
        case "billing":
            ddoPageName = "afh:checkout:billing";
            break;
        case "confirm":
            ddoPageName = "afh:checkout:order review";
            break;
        case "thankyou":
            ddoPageName = "afh:checkout:order confirmation";
            break;
    }

    return ddoPageName;
}

function mapDDOData(axJsonData) {
    var pageSection = axJsonData.pageData.pageSiteSection;
    var checkoutPageName = mapControlSectionToDDOPageName(pageSection);
    var satelliteCallName = checkoutPageName;
    DDO.pageData.pageName = checkoutPageName;
    DDO.checkoutPages = axJsonData.checkoutPages;
    if (typeof axJsonData.orderDetail != "undefined") {
        DDO.orderDetail = axJsonData.orderDetail;
    }
    if (satelliteCallName == "Unknown") {
        satelliteCallName = "checkout_page_flow";
    }
    reportToAdobeSatellite(satelliteCallName);
}

function reportToAdobeSatellite(trackingName) {
    try {
        if (window.console && window.console.log) {
            if (typeof window.DDO === "undefined") {
                console.log("window DDO object is not defined");
            }
            else {
                console.log(window.DDO);
            }
        }
        _satellite.track(trackingName);
    }
    catch (e) { }
}