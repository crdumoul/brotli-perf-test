var tracking_country;
var sysWording;
var sysWordingRead = false; 
var intSysWordingCheckSpeed = 100;
var CompareJson;

getWebservice("getWordingTranslation", "fn_localization", "");

function fn_localization(obj) {
    sysWording = obj.value_pair;
    sysWordingRead = true;
    if (window.location.hostname != "athena.asus.com") {
        if (window.location.href.indexOf('PageError') > -1) {
            var tracking_site = (getWebsite() != "global") ? "/" + getWebsite() : "";
        }
    }
    getWebservice("getCompare", "fn_compare", "");
}

function querySt(strName) {
    hu = window.location.search.substring(1);
    var rtn = "";
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0].toUpperCase() == strName.toUpperCase()) {
            rtn = ft[1];
        }
    }
    return rtn;
}

function ButtonTrk(level, product, type, detail_info) {
    if (tracking_country != "") {
        var _item = _item || [];
        _item.push("1=" + tracking_country);
        _item.push("2=" + level);
        _item.push("5=" + product);
        _item.push("6=" + type);
        _item.push("7=" + detail_info);
        wmx_BtnTrack(_item);
    }
}

//: [[ 2011/05/19 Angel, For Multi Language use
function toShowLanguageSelection() {
    var strLanguage = getLanguageForWebsite().toUpperCase();
    var pathnameURL = window.location.pathname;
    var LevelName = pathnameURL.split("/");
    var isContainLanguage = (LevelName[1] == "") ? -1 : strLanguage.indexOf(LevelName[1].toUpperCase());
    return (isMultipleLanguageWebsite() && isContainLanguage == -1);
}

function getLanguageForWebsite() {
    switch (window.location.hostname.toLowerCase().replace('origin-', '')) {
        case "ca.asus.com":
            return "en,fr"
        case "ch.asus.com":
            return "it,fr,de";
        case "be.asus.com":
            return "nl,fr";
        case "ae.asus.com":
            return "en,ar"
        default:
            return "";
    }
}
//:]]

function getcookiedata(cookieName) {
    if (cookieName == "") return "";
    theData = "";
    theCookie = document.cookie + ";";
    start = theCookie.indexOf(cookieName + "=");
    if (start != -1) {
        end = theCookie.indexOf(";", start);
        theData = unescape(theCookie.substring(start + cookieName.length + 1, end));
    }
    return theData.replace(";", "");
}

function add_compare_model(cookieName, product_id, model_name, imgtype, img_ref) {
    theData = getcookiedata(cookieName);
    if (theData.indexOf(product_id + ".") != -1) {
    }
    else {
        document.cookie = cookieName + "=" + escape(product_id + "." + model_name.replace(".", "^") + "." + imgtype + "." + img_ref + "," + theData) + "; domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + ";path=/";
    }
}

function add_recently_model(product_id, model_name) {
    add_compare_model("recently", product_id, model_name);
}

function add_cookie(cookieName, cookieContent, windowlife) {
    if (windowlife) {
        document.cookie = cookieName + "=" + cookieContent + "; domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + ";path=/";
    }
    else {
        document.cookie = cookieName + "=" + cookieContent + "; domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + ";path=/";
    }
}

function remove_compare_model(cookieName, product_id, model_name, imgtype, img_ref) {
    theData = getcookiedata(cookieName);
    if (imgtype != "") {
        theData = theData.replace(product_id + "." + model_name.replace(".", "^") + "." + imgtype + "." + img_ref + ",", "");
    } else {
        theData = theData.replace(product_id + "." + model_name.replace(".", "^") + ",", "");
    }

    if (product_id == "" && model_name == "") { document.cookie = cookieName + "=" + "" + "; domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + ";path=/"; }
    else document.cookie = cookieName + "=" + escape(theData) + "; domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + ";path=/";
}

function remove_recently_model(product_id, model_name) {
    remove_compare_model("recently", product_id, model_name);
}

function itemcount(strValue) {
    if (!strValue) return 0;
    var items = new Array;
    items = strValue.split(",");
    return items.length - 1;
}

var fileIsExistedreturnvalue;
function fileIsExisted(path) {
    var checkCNT = 0;
    var objXHR = createAJAX();
    if (!objXHR) return false;
    try {
        objXHR.open("get", path, false);
        objXHR.send(null);
        while (objXHR.readyState != 4 || checkCNT <= 50) {
            checkCNT = checkCNT + 1;
        }
        return (objXHR.status == 200) ? true : false;
    }
    catch (er) {
        return false;
    }
}

function fileIsExisted_onreadystatechange(obj) {
    if (objXHR.readyState == 4) {
        if (objXHR.status == 200) {
            objXHR.onreadystatechange = null;
            return true;
        }
        else {
            return false;
        }
    }
}

function createAJAX(){
    var HttpRequest = false;
    try {
        HttpRequest = new XMLHttpRequest();
        // for almost all browsers. (Maybe included M$IE7)   
    } catch (tryMSIE) {
        try {
            HttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (tryMSIE2) {
            try {
                HttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (NotSupported) {
                HttpRequest = false;
            }
        }
    }
    return HttpRequest;
}

function flash_palyer(strFilename, intHeight, intWidth) {
    var objectflash = "";
    objectflash += "<object codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,12,36' width='" + intWidth + "' height='" + intHeight + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'>";
	objectflash += "        <param name='FlashVars' value='' />";
	objectflash += "        <param name='Movie' value='" + strFilename + "' />";
	objectflash += "        <param name='Src' value='" + strFilename + "' />";
	objectflash += "        <param name='WMode' value='Transparent' />";
	objectflash += "        <param name='Play' value='-1' />";
	objectflash += "        <param name='Loop' value='-1' />";
	objectflash += "        <param name='Quality' value='High' />";
	objectflash += "        <param name='SAlign' value='' />";
	objectflash += "        <param name='Menu' value='-1' />";
	objectflash += "        <param name='Base' value='' />";
	objectflash += "        <param name='AllowScriptAccess' value='always' />";
	objectflash += "        <param name='Scale' value='ShowAll' />";
	objectflash += "        <param name='DeviceFont' value='0' />";
	objectflash += "        <param name='EmbedMovie' value='0' />";
	objectflash += "        <param name='BGColor' value='' />";
	objectflash += "        <param name='SWRemote' value='' />";
	objectflash += "        <param name='MovieData' value='' />";
	objectflash += "        <param name='SeamlessTabbing' value='1' />";
	objectflash += "        <param value='false' name='menu' />";
	objectflash += "        <param value='opaque' name='wmode' />";
	objectflash += "        <embed wmode='transparent' flashvars='" + strFilename + "' src='" + strFilename + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='" + intWidth + "' height='" + intHeight + "'></embed>";
    objectflash += "</object>";
    return objectflash;
}


//Date Format Functions Begin
Date.prototype.formatDate = function(format) {
    var date = this;
    format = format.toLowerCase();
    if (!format)
        format = "yyyy/mm/dd";
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    format = format.replace("mm", month.toString().padL(2, "0"));

    if (format.indexOf("yyyy") > -1)
        format = format.replace("yyyy", year.toString());
    else if (format.indexOf("yy") > -1)
        format = format.replace("yy", year.toString().substr(2, 2));

    format = format.replace("dd", date.getDate().toString().padL(2, "0"));
    var hours = date.getHours();

    return format;
}

String.prototype.padL = function(width, pad) {
    if (!width || width < 1)
        return this;

    if (!pad) pad = " ";

    var length = width - this.length

    if (length < 1)
        return this.substr(0, width);

    return (String.repeat(pad, length) + this).substr(0, width);
}
String.prototype.padR = function(width, pad) {
    if (!width || width < 1)
        return this;

    if (!pad) pad = " ";

    var length = width - this.length

    if (length < 1) this.substr(0, width);
    return (this + String.repeat(pad, length)).substr(0, width);
}
String.repeat = function(chr, count) {
    var str = "";
    for (var x = 0; x < count; x++) {
        str += chr
    };
    return str;
}

String.IsNumeric = function (input)
{
   return (input - 0) == input && input.length > 0;
}


function date_format(da, fo) {

    var date = new Date(da);
    var str = date.formatDate(fo);

    return str;

}

function trim(str) { return str.replace(/(^\s*)|(\s*$)/g, ""); }
//Date Format Functions End

function youtubePlayer(yHeight, yWidth, URL, obj) {
    var youtubeObj = "<object height='" + yHeight + "' width='" + yWidth + "'><param value='" + URL + "&autoplay=1' name='movie'><param value='true' name='allowFullScreen'><param value='always' name='allowscriptaccess'><embed height='" + yHeight + "' width='" + yWidth + "' allowfullscreen='true' allowscriptaccess='always' type='application/x-shockwave-flash' src='" + URL + "&autoplay=1'></object>";
    $(obj).after(youtubeObj);
    $(obj).hide();
}

function getFBLangCode() {
    switch (getWebsite()) {
        case "jp":
            getFBLangCode = "ja_JP";
            break;
        case "tw":
            getFBLangCode = "zh_TW";
            break;
        case "de":
            getFBLangCode = "de_DE";
            break;
        case "es":
            getFBLangCode = "es_ES";
            break;
        case "fr":
            getFBLangCode = "fr_FR";
            break;
        case "pl":
            getFBLangCode = "pl_PL";
            break;
        default:
            getFBLangCode = "en_US";
    }
    return getFBLangCode;
}

function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
	            seg = a.search.replace(/^\?/, '').split('&'),
	            len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

function GATrackEvent(category, action, label, link)
{
    Sendga('send', 'event', category, action, label);
    if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100)
    else window.open(link.href);
}

function GABannerTrackEvent(obj)
{
	try {
		var datatrack = $(obj).attr("data-track");
		if(datatrack != "" && datatrack != "undefined" ){
			Sendga('send', 'event', datatrack, 'click', obj.href);	
		}
    } catch (err) { }
	
    if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100)
    else window.open(link.href);
}

function googleTrackEvent(title, link, isIndex) {
    try {
        var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
        switch (title) {
            case "HotProducts":
                var TrackBanner = "";
                TrackBanner = $("img", link).attr("src");
                
                var index_pic = (TrackBanner.indexOf("/products/") == -1) ? TrackBanner.indexOf("/hotproduct/") : TrackBanner.indexOf("/products/");
                TrackBanner = (TrackBanner.indexOf("/products/") == -1) ? TrackBanner.substr(index_pic + 11) : TrackBanner.substr(index_pic + 9);

                var pageView = TrackBanner;
                link.target = "_self";
                break;
            case "Banner":
                var TrackBanner = $(link).data("track");
                var pageView = TrackBanner;
                break;
            case "Spotlight":
            case "Feature":
            case "HeadNews":
            case "ProductGroup Award":
            case "MediaReview":
            case "Video":
            case "Country_Lang_Menu":
            case "index_menu":
                var pageView = (link.title == "") ? link.innerHTML : link.title;
                if (title == "HeadNews" || title == "ProductGroup Award" || title == "Feature" || title == "Country_Lang_Menu") link.target = "_self";
                break;
            default:
                var pageView = '';
                link.target = "_self";
                break;mem
        }
        if (currentProductGroup == "" && title == "HeadNews") isIndex = true;
        if (isIndex == true) {
            Sendga('send', 'event', 'Index', title, pageView);
        }
        else {
            Sendga('send', 'event', currentProductGroup, title, pageView);
        }

        if (title != "Product Comparison" && title != "Video" && link.title != "Recently_Viewed" && link.title != "Compare_List" &&
            link.title != "minicart" && link.title.indexOf('account_') == -1) {
            if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100);
            else window.open(link.href);
        }
    } catch (err) { }
}

function TopmenuGoogleTraking(obj, RowId, MenuIdImgName) {
    try {
        var pageView = (obj.title == "") ? obj.innerHTML : obj.title;
        Sendga('send', 'event', 'banner-whats-hot-'+RowId, 'click', MenuIdImgName);
        
		if (obj.target == "_self") setTimeout('document.location = "' + obj.href + '"', 100)
		else window.open(obj.href);
        
    } catch (err) { }
}

function googleTrackFamilySite(link, position) {
    try {
        var pageView = (link.title == "") ? link.innerHTML : link.title;
        Sendga('send', 'event', 'Family Site', position, pageView);

        if (position.indexOf("WhereToBuy") == -1) {
            if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100)
            else window.open(link.href);
        }

    } catch (err) { }
}
//----2013 /05/24 @duncan-----
function trackOverview(hashId, tab) {
    try {
        Sendga('send', 'event', 'Overview', hashId, tab);
    } catch (err) { }
}
function trackSpecialOverview(hashId, tab) {
    try {
        Sendga('send', 'event', 'SpecialOverview', hashId, tab);
    } catch (err) { }
}
//----2013 /05/24 @end-----
function googleTrackProduct(TrackTab) {
    try {
        var pathname = window.location.pathname;
        var length = pathname.split('/').length;
        var productmodel = pathname.split('/')[length - 2];
        var pageView = pathname + TrackTab;

        var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
        var url_arr = window.location.pathname.split("/");
        url_tab = url_arr[url_arr.length - 2];

        if (TrackTab == url_tab) { Sendga('send', 'event', currentProductGroup + " - Product", pathname.replace("/" + currentProductGroup, ""), TrackTab); }
    } catch (err) { }
}

function googleTrackProductfn(title, link) {
    try {
        switch (title) {
            case "Microsite":
            case "BuyNow":
            case "AddCompare":
            case "BusinessDataSheet":
            case "wheretobuy_adi":
                googleTrackProduct(title);
                if (title != "AddCompare") {
                    if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100);
                    else window.open(link.href);
                }
                break;
            case "ProductPrint":
            case "Gallery":
            case "Video":
                var pathname = window.location.pathname;
                var length = pathname.split('/').length;
                var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];

                if (link != '' && (title == "Gallery" || title == "Video")) {
                    var TrackPic = (typeof ($("img", link).attr("src")) == "undefined") ? link.split('/')[4] : $("img", link).attr("src").split('/')[4];
                    var productmodel = pathname.split('/')[length - 2];
                    var pageView = pathname.replace("Gallery", "");
                    Sendga('send', 'event', currentProductGroup + " - Product", pageView.replace("/" + currentProductGroup, ""), title + "/" + TrackPic);
                    if (typeof ($("img", link).attr("src")) != "undefined") setTimeout('document.location = "' + link.href + '"', 100);
                }
                else {
                    var productmodel = (title == "ProductPrint") ? pathname.split('/')[length - 3] : pathname.split('/')[length - 2];
                    var replaceWord = (title == "ProductPrint") ? "/ProductPrint" : "Gallery";
                    var pageView = pathname.replace(replaceWord, "");
                    if (title != "Gallery") {
                        Sendga('send', 'event', currentProductGroup + " - Product", pageView.replace("/" + currentProductGroup, ""), title);
                    }
                }
                break;
            case "WTB_OnlineRetailer":
                var pathname = window.location.pathname;
                var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
                Sendga('send', 'event', currentProductGroup + " - Product", pathname.replace("/" + currentProductGroup, ""), "WTB_OnlineRetailer - " + link.title);
                if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100);
                break;
            case "WTB_Iceleads_OnlineRetailer":
                var pathname = window.location.pathname;
                var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
                Sendga('send', 'event', currentProductGroup + " - Product", pathname.replace("/" + currentProductGroup, ""), "WTB_Iceleads_OnlineRetailer - " + link.title);
                if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 100);
                else window.open(link.href);
                break;
            case "WTB_Dealer":
                var pathname = window.location.pathname;
                var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
                Sendga('send', 'event', currentProductGroup + " - Product", pathname.replace("/" + currentProductGroup, ""), "WTB_Dealer");
                break;
            case "Related_Item":
                var pathname = window.location.pathname;
                var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
                Sendga('send', 'event', currentProductGroup + " - Product", pathname.replace("/" + currentProductGroup, ""), "Related_Item");

                ButtonTrk('wmx_L3', link.rel, '8', 'Related_Item');
                if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 300);
                break;

            case "Similar_Product":
                var pathname = window.location.pathname;
                var currentProductGroup = (isMultipleLanguageWebsite() || isApplicationPathSite()) ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1];
                Sendga('send', 'event', currentProductGroup + " - Product", pathname.replace("/" + currentProductGroup, ""), "Similar_Product");

                ButtonTrk('wmx_L3', link.rel, '8', 'Similar_Product');
                if (link.target == "_self") setTimeout('document.location = "' + link.href + '"', 300);
                break;
        }
    } catch (err) { }
}

function common_track(category, action, label) {
    try {
        Sendga('send', 'event', category, action, label);
    } catch (err) { }
}

function setBanner_MDA_part(type) {
    var Window7ImgUrl = "";
    var HomeBannerImgUrl = "";
    var Window7Url = "";
    var HomeBannerUrl = "";

    switch (getWebsite()) {
        case "global":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://morethanyourordinarypc.com";
            HomeBannerImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_950x476.jpg";
            HomeBannerUrl = "http://morethanyourordinarypc.com";
            break;
        case "ar":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://es.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://es.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_ES_LATAM.jpg";
            HomeBannerUrl = "http://es.morethanyourordinarypc.com/";
            break;
        case "de":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://de.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://de.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_DE.jpg";
            HomeBannerUrl = "http://de.morethanyourordinarypc.com/";
            break;
        case "fr":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://fr.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://fr.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_FR.jpg";
            HomeBannerUrl = "http://fr.morethanyourordinarypc.com/";
            break;
        case "it":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://it.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://it.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_IT.jpg ";
            HomeBannerUrl = "http://it.morethanyourordinarypc.com/";
            break;
        case "nl":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://nl.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://nl.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_NL.jpg";
            HomeBannerUrl = "http://nl.morethanyourordinarypc.com/";
            break;
        case "tw":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://tw.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://tw.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_TW.jpg";
            HomeBannerUrl = "http://tw.morethanyourordinarypc.com/";
            break;
        case "cn":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://ch.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://ch.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_CH.jpg";
            HomeBannerUrl = "http://ch.morethanyourordinarypc.com/";
            break;
        case "ru":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://ru.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://ru.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_RU.jpg";
            HomeBannerUrl = "http://ru.morethanyourordinarypc.com/";
            break;
        case "pt":
            Window7ImgUrl = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg";
            Window7Url = "http://pt.morethanyourordinarypc.com/";
            HomeBannerImgUrl = "http://pt.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_PT.jpg";
            HomeBannerUrl = "http://pt.morethanyourordinarypc.com/";
            break;
        default:
            break;
    }

    if (Window7ImgUrl != "" && Window7Url != "" && type == "product") {
        $("#slogo").removeClass("hide");
        $("#slogo").append("<a href='" + Window7Url + "' target='_blank'><img src='" + Window7ImgUrl + "' /></a>");
    }
    if (HomeBannerImgUrl != "" && HomeBannerUrl != "" && type == "banner") {
        if ($("#bannerlink div").length <= 6) {
            $("#bannerlink div:last").remove();
            $("#bannerlink img:last").remove();
            $("#bannerlink").append("<div id='divHide' style='display:none'><span id='spanLink'>" + HomeBannerUrl + "</span><span id='spanTarget'>_blank</span></div><img src='" + HomeBannerImgUrl + "' border='0' style='display: none'/>");
        }
        else {
            $("#bannerlink img:eq(5)").after("<div id='divHide' style='display:none'><span id='spanLink'>" + HomeBannerUrl + "</span><span id='spanTarget'>_blank</span></div><img src='" + HomeBannerImgUrl + "' border='0' style='display: none'/>");
        }
    }
}

/*=============手機>>電腦切換 @start 2014/2/19 duncan=========*/
var devicesBol = false,
    local_v_str = [{ local: 'global', str: ["Mobile site", "Full site"] }, { local: 'tw', str: ["手機版", "電腦版"] }],
    winW = 0;;
var checkMobile = function () {
    var mobiles = [
		"iphone", "android", "iPod", "sony", "samsung", "htc",
                "incognito", "webmate", "dream", "cupcake", "webos", "sgh", "gradi", "jb", "dddi", "moto",
                "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                "phone", "cdm", "up.b", "audio", "sie-", "sec-",
                "mot-", "mitsu", "sagem", "alcatel", "lg", "eric", "vx",
                "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                "s8000", "bada", "googlebot-mobile"
    ],
        ua = navigator.userAgent.toLowerCase(),
        isMobile = false;
    for (var i = 0; i < mobiles.length; i++) {
        if (ua.indexOf(mobiles[i]) > 0) {
            isMobile = true;
            break;
        }
    }
    return isMobile;
}
var setStorage = function (key, val) {
    localStorage.setItem(key, val);
}

var getStorage = function (key) {
    try {
        return localStorage[key];
    } catch (er) {
        return false;
    }
}
var mobieChangeVersion = function (e) {
    e.preventDefault();
    //1:mobile 2:desktop  
    e.data.v == 1 ? asus.cookie.set('viewType', 'mobile') : asus.cookie.set('viewType', 'desktop');
    window.location.reload();

}
var changeMeta = function (type) {
    $("#middle-menu-zone").css('position', 'relative');
    $("#version-group").css('display', 'block');
    if (type == "desktop") {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) { viewportmeta.content = 'width=1024'; }
        $("#version-btn-1").removeClass('active');
        $("#version-btn-2").addClass('active');
    } else {

        $("#version-btn-1").addClass('active');
        $("#version-btn-2").removeClass('active');
    }

}
var local_v_Str = function () {
    var local = asus.script.get_local().replace("new", "");
    var l_length = local_v_str.length;
    for (var i = 0; i < l_length; i++) {
        if (local == local_v_str[i].local) {
            return local_v_str[i].str;
        }
    }
    return local_v_str[0].str;
}
var setVg = function () {
    var str = local_v_Str(),
        v_div = "<div class='version-group'><a href='#' id='version-btn-1' >" + str[0] + "</a><a href='#' id='version-btn-2'>" + str[1] + "</a></div>";
    $("#extra_link").append(v_div);
    $("#version-btn-1").bind('click', { v: 1 }, mobieChangeVersion);
    $("#version-btn-2").bind('click', { v: 2 }, mobieChangeVersion);
    devicesBol = true;
}
$(document).ready(function () {
    winW = $(window).width();
    if (checkMobile()) {
         $("body").addClass('mobile');
        setVg();
        changeMeta(asus.cookie.get('viewType'));
    }
    if (!checkMobile() && winW < 720) {
        //setVg();
        changeMeta("desktop");
    }
});
/*=============手機>>電腦切換 @end=========*/


//Send ga的動作，拉出來成一個function並加上try catch, 排除因Domain不同而導致ga 不存在的error 
function Sendga(value1, value2, value3, value4, value5){
	try{
		ga(value1, value2, value3, value4, value5);
	}catch(err){}
}