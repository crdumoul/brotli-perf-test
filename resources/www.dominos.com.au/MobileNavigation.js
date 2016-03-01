
function toggleMobileMenu() {
    window.scrollTo(0, 0);
    if (navigator.userAgent.indexOf("MSIE 8") != -1) {
        return toggleMobileMenuForIE8();
    } else if (navigator.userAgent.indexOf("Mobile Safari/534.30") != -1)
    {
        return toggleMobileMenuForAndroidDefaultBrowser();
    }
    return toggleMobileMenuForModernBrowsers();
}

function toggleMobileMenuForModernBrowsers() {
    $("#responsive-mobile-menu").toggleClass("expand");
    $("body").toggleClass("shrink-page");
    if ($("#responsive-mobile-menu").hasClass("expand")) {
        $("body").bind("touchmove", function (e) { e.preventDefault() });
    } else {
        $("body").unbind("touchmove");
    }
}

function toggleMobileMenuForAndroidDefaultBrowser() {
    $("#responsive-mobile-menu").toggleClass("expand");
    $("#responsive-mobile-menu").toggleClass("expandAndroidDefault");
   
    $("body").toggleClass("shrink-page-android");
    if ($("#responsive-mobile-menu").hasClass("expand")) {
        $("body").bind("touchmove", function (e) { e.preventDefault() });
    } else {
        $("body").unbind("touchmove");
    }
}

/* IE8 doesn't apply style when dynamically changing class name */
function toggleMobileMenuForIE8() {
    var menu = document.getElementById("responsive-mobile-menu");
    var wrapper = document.getElementById("wrapper");
    var nav = findNavElement(wrapper);
    var hamburger = document.getElementById("hamburger-menu-link");
    if (!menu || !wrapper || !nav || !hamburger) return false;

    var toggle = menu.className == "";
    console.log("IE toggle menu: ", (toggle?"EXPAND":"SHRINK"));
    menu.className      = toggle ? "expand" : "";
    menu.style.display = toggle ? "block" : "none";
    wrapper.style.position = toggle ? "relative" : "fixed";
    wrapper.style.posLeft = toggle ? -240 : 0;
    wrapper.style.posRight = toggle ? -240 : 0;
    nav.style.position = toggle ? "relative" : "fixed";
}

function findNavElement(wrapper) {
    for (var i in wrapper.children) {
        var node = wrapper.children[i];
        if (node.tagName == "nav") return node; 
    }
    return false;
}