(function() {

    //temporary placeholder script to redirect people to unsupported browser page
    if (navigator.userAgent.indexOf("MSIE 9") != -1 || navigator.userAgent.indexOf("MSIE 8") != -1 || navigator.userAgent.indexOf("MSIE 7") != -1 || navigator.userAgent.indexOf("MSIE 6") != -1) {
        location.href = location.protocol + "//www.stubhub.com/promotions/scratch/unified/unsupported-browser.html";
    }

    //temporary placeholder script to test smart app banners
    if (location.hostname.indexOf('.co.uk') === -1) {
        var deepLinkUrl = 'stubhub://stubhub.com/?',
            iosAppBanner = document.createElement('meta');

        if (location.pathname.indexOf('/event/') !== -1 && document.height > 550) {
            deepLinkUrl += 'event_id=' + getEntityId() + '&GCID=AppBanner:Event';
        } else if (location.pathname.indexOf('/performer/') !== -1) {
            deepLinkUrl += 'performer_id=' + getEntityId() + '&GCID=AppBanner:Performer';
        } else if (location.pathname.indexOf('/grouping/') !== -1) {
            deepLinkUrl += 'grouping_id=' + getEntityId() + '&GCID=AppBanner:Grouping';
        } else if (location.pathname.indexOf('/category/') !== -1) {
            deepLinkUrl += 'category_id=' + getEntityId() + '&GCID=AppBanner:Category';
        } else if (location.pathname.indexOf('/geography/') !== -1) {
            deepLinkUrl += 'geography_id=' + getEntityId() + '&GCID=AppBanner:Geography';
        } else if (location.pathname.indexOf('/venue/') !== -1) {
            deepLinkUrl += 'venue_id=' + getEntityId() + '&GCID=AppBanner:Venue';
        } else if (location.pathname.indexOf('/my/') !== -1) {
            deepLinkUrl = 'stubhub://stubhub.com?Home=1&open_account=1&GCID=AppBanner:MyAccount'
        } else if (location.pathname === '/') {
            deepLinkUrl += 'home=1&GCID=AppBanner:Home';
        } else {
            deepLinkUrl = false;
        }

        if (deepLinkUrl) {
            iosAppBanner.name = "apple-itunes-app";
            iosAppBanner.content = "app-id=366562751, affiliate-data=pt=346648&ct=SmartAppBanner, app-argument=" + deepLinkUrl;
            document.getElementsByTagName('head')[0].appendChild(iosAppBanner);
        }

        function getEntityId() {
            var id = [];
            id = location.pathname.split('/');
            id = id[id.length - 1] === "" ? id[id.length - 2] : id[id.length - 1];
            return id;
        }
    }

var fixCountryCheckInterval = setInterval(function() {
    if (typeof SH.country !== 'undefined' && SH.country !== null && typeof window.jQuery !== 'undefined' && window.jQuery !==null) {
        clearInterval(fixCountryCheckInterval);
        $(document).ajaxSend(function(event, jqXHR, ajaxOptions) {
            if (SH.country === 'gb' && ajaxOptions.type === 'POST' && ajaxOptions.url === '/shape/user/customers/v2/') {
                var data = ajaxOptions.data;
                if (data) {
                    data = data.replace('\"country\":\"UK\"', '"country":"GB"');
                    ajaxOptions.data = data;
                }
            }
            return true;
        });
    }
}, 50)
}());