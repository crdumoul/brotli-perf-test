var SecureHost = (("https:" == document.location.protocol) ? "https://" : "http://");

function getWebservice(path, lib_name, data)
{
    var url = "/service.asmx/";
    if (isApplicationPathSite()) url = SecureHost + window.location.host + '/' + getWebsite() + url;
    var dataURL = (data == "") ? url + path : url + path + "?" + data;

    $.ajax({
        datatype: 'json',
        url: dataURL,
        type: 'GET',
        cache: true,
        //data: data,
        success: function (obj) {
            switch (lib_name)
            {
                case "fn_overview":
                    fn_overview(obj);
                    break;
                case "fn_localization":
                    fn_localization(obj);
                    break;
                case "fn_compare":
                    CompareJson = obj;
                    fn_compare(obj);
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function XML_ReaderByWebservice(path, lib_name, data) {
    var url = "/GetData.asmx/";
    if (isApplicationPathSite()) url = SecureHost + window.location.host + '/' + getWebsite() + url;
    //if (isMultipleLanguageWebsite()) url = SecureHost + window.location.host + '/' + getShortLanguage(getWebsite()) + url;
    var dataURL = (data == "") ? url + path : url + path + "?" + data;
    $.ajax({
        datatype: 'xml',
        url: dataURL,
        type: 'GET',
        cache: true,
        //data: data,
        success: function (xml) {
            XML_Library(xml, lib_name);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function XML_ReaderByWebserviceName(servicename, path, lib_name, data) {
    var url = "/" + servicename + "/";
    if (isApplicationPathSite()) url = SecureHost + window.location.host + '/' + getWebsite() + url;
    //if (isMultipleLanguageWebsite()) url = SecureHost + window.location.host + '/' + getShortLanguage(getWebsite()) + url;
    var dataURL = (data == "") ? url + path : url + path + "?" + data;
    $.ajax({
        datatype: 'xml',
        url: dataURL,
        type: 'GET',
        cache: true,
        //data: data,
        success: function (xml) {
            XML_Library(xml, lib_name);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function XML_Reader(path, lib_name) {
    //if (isMultipleLanguageWebsite()) {path = '/' + getShortLanguage(getWebsite()) +'/' + path;}
    $.ajax({
        url: path,
        type: "GET",
        cache: true,
        error: function() {
            //alert("Error !!" + path);
        },
        datatype: "xml",
        success: function(xml) {
            XML_Library(xml, lib_name);
        }
    });
}

function XML_Library(xml, lib_name) {
    switch (lib_name.split("_")[0]) {
        case "topmenu":
            topmenu(xml);
            break;
        case "websites":
            websites(xml);
            break;
        case "indexAllProducts":
            indexAllProducts(xml);
            break;
        case "indexSpotlight":
            indexSpotlight(xml);
            break;
        case "indexBanners":
            indexBanners(xml);
            break;
        case "indexHotProducts":
            indexHotProducts(xml);
            break;
        case "indexNews":
            indexNews(xml);
            break;
        case "specification":
            specification(xml);
            break;
        case "overview":
            overview(xml);
            break;
        case "ProductInformation":
            ProductInformation(xml);
            break;
        case "ProductFooter":
            ProductFooter(xml);
            break;
        case "gallery":
            gallery(xml);
            break;
        case "ProductGroupAll":
            ProductGroupAll(xml);
            break;
        case "ProductGroupAward":
            ProductGroupAward(xml);
            break;
        case "ProductGroupBanners":
            ProductGroupBanners(xml);
            break;
        case "ProductGroupHotProduct":
            ProductGroupHotProduct(xml);
            break;
        case "ProductGroupCategory":
            ProductGroupCategory(xml);
            break;
        case "ProductGroupReadXML":
            ProductGroupReadXML(xml);
            break;
        case "ProductGroupInnovation":
            ProductGroupInnovation(xml);
            break;
        case "ProductGroupSpotlight":
            ProductGroupSpotlight(xml);
            break;
        case "ProductGroupStaticWebPage":
            ProductGroupStaticWebPage(xml);
            break;
        case "NewsContent":
            NewsContent(xml);
            break;
        case "ContentCategory":
            ContentCategory(xml);
            break;
        case "ContentPageContent":
            ContentPageContent(xml);
            break;
        case "FeatureCategory":
            FeatureCategory(xml);
            break;
        case "FeatureList":
            FeatureList(xml);
            break;
        case "FeatureContent":
            FeatureContent(xml);
            break;
        case "FeatureFeatureDescription":
            FeatureFeatureDescription(xml);
            break;
        case "ASUSBottom":
            ASUSBottom(xml);
            break;
        case "AllProducts":
            AllProducts(xml);
            break;
        case "Localization":
            Localization(xml);
            break;
        case "Accessory":
            Accessory(xml);
            break;
        case "Keyword":
            Keyword(xml);
            break;
        case "MDA":
            MDA(xml);
            break;
        case "HomePopup":
            HomePopup(xml);
            break;
        case "ProductFeature":
            ProductFeature(xml);
            break;
        case "ProductFeatureContent":
            ProductFeatureContent(xml, lib_name.split("_")[1]);
            break;
        case "mapupdate":
            mapupdate(xml);
            break;
        case "video":
            video(xml);
            break;
        case "CompareTitle":
            CompareTitle(xml);
            break;
        case "ProductTabSrc":
            ProductTabSrc(xml);
            break;
        case "getProductGroup":
            getProductGroup(xml);
            break;
        case "getSeries":
            getSeries(xml);
            break;
        case "getModel":
            getModel(xml);
            break;
        case "getAccessory":
            getAccessory(xml);
            break;
        case "getOverview":
            getOverview(xml);
            break;
    }
}