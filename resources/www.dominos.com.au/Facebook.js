
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    if (navigator.userAgent.indexOf("MSIE 8") != -1 || navigator.userAgent.indexOf("MSIE 9") != -1) {
        js.src = "//connect.facebook.net/en_US/sdk/debug.js#xfbml=1&version=v2.3";
    } else {
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
    }
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));