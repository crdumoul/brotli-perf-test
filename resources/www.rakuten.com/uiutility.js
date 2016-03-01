// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Revision of Flash required
var requiredRevision = 22;
// the version of javascript supported
var jsVersion = 1.0;

var bvIsLoaded = false;
// -----------------------------------------------------------------------------
// -->





function Querystring(qs) {
    this.params = {};

    if (qs == null) qs = location.search.substring(1, location.search.length);
    if (qs.length == 0) return;
    qs = qs.replace(/\+/g, ' ');
    var args = qs.split('&');

    for (var i = 0; i < args.length; i++) {
        var pair = args[i].split('=');
        var name = decodeURIComponent(pair[0]);

        var value = (pair.length == 2)
			? decodeURIComponent(pair[1])
			: name;

        this.params[name] = value;
    }
}

Querystring.prototype.get = function (key, default_) {
    var value = this.params[key];
    return (value != null) ? value : default_;
}

Querystring.prototype.contains = function (key) {
    var value = this.params[key];
    return (value != null);
}

Date.prototype.setISO8601 = function (string) {
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    var time = (Number(date) + (offset * 60 * 1000));
    this.setTime(Number(time));
}




function stopParentOnclicks(event)
{
    if (event.stopPropagation)
        event.stopPropagation();
    //for pre ie9
    if (event.cancelBubble != null)
        event.cancelBubble = true;
}

function scrollToLoader(container, url) {
    var position = $(container).offset().top;
    var scllwidth = $(window).scrollTop() + $(window).height();
    if (scllwidth > position) {
        $.get(url, function (data) { $(container).css("opacity", "0").html(data).animate({ opacity: '1' }); });
        $(window).unbind("scroll", scrollToLoader.caller);
    }
}

//////////////////// scroll ////////////////////////////////////////////////////////////////////////////
jQuery.getPos = function (e)
{
    var l = 0;
    var t = 0;
    var w = jQuery.intval(jQuery.css(e, 'width'));
    var h = jQuery.intval(jQuery.css(e, 'height'));
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent)
    {
        l += e.offsetLeft + (e.currentStyle ? jQuery.intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? jQuery.intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle ? jQuery.intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? jQuery.intval(e.currentStyle.borderTopWidth) : 0);
    return { x: l, y: t, w: w, h: h, wb: wb, hb: hb };
};
jQuery.getClient = function (e)
{
    var w = null;
    var h = null;

    if (e)
    {
        w = e.clientWidth;
        h = e.clientHeight;
    } else
    {
        w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
        h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
    }
    return { w: w, h: h };
};
jQuery.getScroll = function (e)
{
    var t = null;
    var l = null;
    var w = null;
    var h = null;

    if (e)
    {
        t = e.scrollTop;
        l = e.scrollLeft;
        w = e.scrollWidth;
        h = e.scrollHeight;
    } else
    {
        if (document.documentElement && document.documentElement.scrollTop)
        {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body)
        {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
    }
    return { t: t, l: l, w: w, h: h };
};

jQuery.intval = function (v)
{
    var v = parseInt(v);
    return isNaN(v) ? 0 : v;
};

jQuery.fn.ScrollTo = function (s)
{
    var o = jQuery.speed(s);
    return this.each(function ()
    {
        new jQuery.fx.ScrollTo(this, o);
    });
};

jQuery.fx.ScrollTo = function (e, o)
{
    var z = this;
    z.o = o;
    z.e = e;
    z.p = jQuery.getPos(e);
    z.s = jQuery.getScroll();
    z.clear = function () { clearInterval(z.timer); z.timer = null };
    z.t = (new Date).getTime();
    z.step = function ()
    {
        var t = (new Date).getTime();
        var p = (t - z.t) / z.o.duration;
        if (t >= z.o.duration + z.t)
        {
            z.clear();
            setTimeout(function () { z.scroll(z.p.y, z.p.x); }, 13);
        } else
        {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    //in small browser creates page shifting issue when you scroll because of shop together, it makes the page more than 1000px wide and adds an x-axis scroll bar, lame
    //z.scroll = function (t, l) { window.scrollTo(l, t) };
    z.scroll = function (t, l) { window.scrollTo(0, t) };
    z.timer = setInterval(function () { z.step(); }, 13);
};

//////////////////// scroll ////////////////////////////////////////////////////////////////////////////