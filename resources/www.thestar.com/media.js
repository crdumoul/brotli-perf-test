/*
Media redirect handler

rules:
- if client type listed in media type, stay here;
- otherwise
    -- if  media type includes desktop (d), redirect as appropriate;
    -- otherwise redirect to desktop site first.

client/media labels:
d - desktop,
m - mobile,
t - tablet,
b - older blackberry (before 9900)
*/

!(function(){

    var
    loc = window.location,
    test = (loc.search.search(/(?:\?|&)(?:rt|redir-test)=(?:1|true|yes|y)/i)>-1),// no actual redirects in test mode!
    say = function(msg){
        if (test && 'console' in window) window.console.log('media.js: '+msg);
    },
    mediaType = ('mediaType' in window) ? window.mediaType.toLowerCase() : null, // e.g. "dt" or "m"
    isMedia = function(type){
        return (typeof type=='string' && mediaType.indexOf(type)>-1);
    };

    // validate globally defined media type(s)
    if (!mediaType || !mediaType.match(/^[bdmt]+$/)){ // no valid media type
        say("Target media type is missing or incorrect");
        return;
    }

    var userAgent = navigator.userAgent;

    say(userAgent);

/*
 * Commenting this out for now, it was causing a problem where facebook users that click on one link are correctly redirected
 * but when they click on another link they remain on the desktop site instead of being redirected to the mobile site
 *     if (document.cookie.search(/debounce=[^;]+/)>-1) {// redirect loop, stay here
        say("debounce cookie found");
        document.cookie = "debounce=; expires=" + (new Date(0)).toGMTString();
        return;
    }
*/
    //check for desktop cookie, if found do not redirect
    if (document.cookie.search(/deskTop=[^;]+/)>-1) {
        say("desktop cookie found");
        return;
    }

    // client sniffer
    var client = new (function(ua, mt){
        ua = ua.toLowerCase();
        this.wide = (screen && screen.availWidth > 768);
        this.tall = (screen && screen.availHeight > 768);
        this.high = (this.wide || this.tall);
        this.iPhone = (ua.search(/\(i(?:phone|pod);/)>-1);
        this.iPad = (ua.indexOf("(ipad;")>-1);
        this.android = (ua.search(/\bandroid\b/)>-1);
        this.anMobi = (this.android && (ua.search(/\bmobile\b/)>-1));
        this.anTab = (this.android && !this.anMobi);
        this.bb9 = (ua.search(/blackberry\s99\d\d/) >-1);
        this.bb10 = (ua.search(/\(bb1\d;.+mobile/) >-1);
        this.bb = (ua.search(/\bblackberry\b/) >-1 && !this.bb9);// older BBs
        this.ie = (ua.search(/compatible; msie/)>-1 || ua.search(/trident/)>-1);
        this.tab = (ua.search(/\btablet\b/)>-1 && !this.ie) ;

        this.type = (function(o){
            if (o.bb) return 'b';
            //if (o.iPad || o.anTab || o.tab || (o.android && o.high)) return 't';
            if (o.iPad || o.anTab || o.tab) return 't';
            if (o.iPhone || o.anMobi || o.bb9 || o.bb10) return 'm';
            return 'd';
        })(this);
        this.valid = isMedia(this.type);
    })(userAgent, mediaType);

    // check if redirect required
    say("client type: '"+client.type+"', supported types: '"+mediaType+"'");
    if (client.valid) { // media is right, don't bother..
        say("document matches client");
        return;
    }

    var
    redir = function(url){
        say("redirecting to "+url);
        if (test) return;
        document.cookie = 'debounce=' + (new Date()).getTime();
        document.cookie = "RedirectedFrom=desktop,path=/;domain=thestar.com";

        loc.replace(url);
    },

    // where would we go?
    mediaHost = {
        m: ('mobile_domain' in window) ? window.mobile_domain : "m.thestar.com",
        t: ('tablet_domain' in window) ? window.tablet_domain : "t.thestar.com",
        d: ('desktop_domain' in window) ? window.desktop_domain : "www.thestar.com"
    };
    for (var k in mediaHost) if (isMedia(k)) mediaHost[k] = loc.host;// that's where you are
    mediaHost.b = mediaHost.d;

    // validate target host
    if (!(client.type in mediaHost) || !mediaHost[client.type]) {
        say("target host name for client '"+client.type+"' not specified");
        return;
    }

    var path = loc.pathname || '/', url = loc.protocol + '//' + mediaHost[client.type];

    say("checking redirect conditions..");

    switch (client.type){

        case 'b': // client is old BB
            if (isMedia('d')) {
                if (path=='/' || path=='/content/thestar/') path += 'index.html';
                 path = path.replace(/\.html$/, '.bb.html');
                url += path + loc.search;
                redir(url); return;
            }
            redir(loc.protocol + mediaHost.d + '/');
            return;

        case 'm':
            url += '/';
            var
            path = loc.pathname || '/',
            qs = loc.search,
            hash = '#',
            sep = (qs=='') ? '?' : (qs=='?') ? '' : '&',
            pageType = ('pageType' in window) ? window.pageType : "",
            videoMatcher = qs.match(/\bbctid=\d+\b/);

            if (client.type=='m' && 'mobilePageType' in window) pageType = window.mobilePageType;
            else if (client.type=='t' && 'tabletPageType' in window) pageType = window.tabletPageType;

            if (loc.hash.indexOf('#mystars/')>-1) {
                say("doing mystar business");
                if (loc.hash.indexOf('password')>0) hash += '/password';
                else if (loc.hash.indexOf('confirm')>0) hash += '/confirm';
                var pos = loc.hash.lastIndexOf('?');
                if (pos>0) hash += loc.hash.substr(pos);
                redir(url + hash);
                return;
            }
            if (qs.search(/\bconfirmation_token\b/i)>0 || qs.search(/\breset_password_token\b/i)>0) {
                say("going to settings");
                redir(url + '#/settings');
                return;
            }
            path = path.replace(/^\/content\/thestar\//, '/').replace(/^\/index\.html/, '/');
            if (path.length > 1) {
                if (path.match(/^\/authors\..+\.html$/)) path = path.replace(/^\/authors\./, '/author/');// '/authors.somebody.html' -> '/author/somebody.html'
                else if (pageType!=="") path = '/' + pageType + path;
            }
            //qs += sep + 'referrer=' + encodeURIComponent(document.referrer);
            qs = '?referrer=' + encodeURIComponent(document.referrer);
            if (videoMatcher && videoMatcher[0]) qs += '&' + videoMatcher[0];// pass videoId, if any
            hash += path + qs;
            say("switching to media type "+client.type);
            redir(url + hash);
            return;

        case 'd': // desktop and friends
            if (isMedia('b')) {
                url = loc.href.replace(/\.bb\.html\b/, '.html');
                redir(url);
                return;
            }
            say("switching to default media");
            redir(loc.protocol + '//' + mediaHost.d + '/');
            return;
    }

})();
