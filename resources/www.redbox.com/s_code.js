/* SiteCatalyst code version: H.27.4.
Copyright 1996-2014 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

// DEPENDENCY: s_account and s_linkInternalFilters are set in main.master
// based on values from web.config

//if s_account is not set
if ((!s_account) && (document.URL.split('/')[2].indexOf("m.redbox.com") > -1))
{
    var s_account = "rboxmobile";
}
else if ((!s_account) && (document.URL.split('/')[2].indexOf("www.redbox.com") > -1))
{
    var s_account = 'rboxmainprod';
}
var s = s_gi(s_account) //s_account set in main.master

//Grabs visitor ID from visitorAPI
s.visitor = Visitor.getInstance("F7703025512D2C320A490D44@AdobeOrg");

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
s.currencyCode = "USD"
/* Link Tracking Config */
s.trackDownloadLinks = false //disable automatic tracking of download links
s.trackExternalLinks = false //disable automatic tracking of exit links
s.trackInlineStats = true
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
if (!s_linkInternalFilters)
    var s_linkInternalFilters = 'javascript:,redbox.com,com-redbox-authentication,redbox.custhelp.com,premium.vcdelivery.com,redbox-rbi.accesscontrol,redboxownitnow.com';
s.linkInternalFilters = s_linkInternalFilters //s_linkInternalFilters set in main.master
s.linkLeaveQueryString = false
s.linkTrackVars = "None"
s.linkTrackEvents = "None"

/* Channel Manager Config */
s._extraSearchEngines = ""
s._channelDomain = ""
s._channelParameter = "Social Media|MREF"
s._channelPattern = "Banner|BNR>Email|EM>Affiliates|AFF,AF>Paid Search|PS>Social Media|SOC>Mobile|MOBILE>Natural Search|SEO>Referrers|REF>Refer a Friend|RAF>API Widget|api"

/* Plugin Config */
s.usePlugins = true

s.successfulSearchEvent = 'event1';
s.nullSearchEvent = 'event2';
s.searchTermVariable = 'eVar1';


function s_doPlugins(s)
{
    /* set logged in pathing */
    if (s.prop11 && typeof s.prop11 != 'undefined')
    {
        s.prop9 = s.prop11 + ': ' + s.pageName;
        s.eVar8 = s.prop11;
    }

    /* TnT to SC Integration */
    s.tnt = s.trackTNT()

    /* TnT PC and Session ID to SC */
    if (window.mboxFactoryDefault && typeof mboxFactoryDefault.getPCId == "function")
    {
        s.eVar35 = mboxFactoryDefault.getPCId().getId()
        s.eVar36 = mboxFactoryDefault.getSessionId().getId();
    }

    /* set subscriber pathing */
    if (s.prop12 && typeof s.prop12 != 'undefined')
    {
        s.prop10 = s.prop12 + ': ' + s.pageName;
        s.eVar9 = s.prop12;
    }

    /* copy order ID to an eVar */
    if (s.purchaseID && typeof s.purchaseID != 'undefined')
        s.eVar17 = s.purchaseID;

    /* collect the CheetahMail recipient ID */
    if (!s.eVar19)
        s.eVar19 = s.getQueryParam('om_rid');

    /* force search term to lower case */
    if (s.eVar1)
        s.eVar1 = s.eVar1.toLowerCase()

    /* collect paid tracking */
    if (!s.eVar16)
        s.eVar16 = s.getQueryParam('cid');

    /* collect api tracking codes */
    if (s.getQueryParam('aid').toLowerCase() == "api:all")
        s.eVar52 = "api:all";

    /* collect cheetamail refcode */
    if (!s.eVar40)
        s.eVar40 = s.getQueryParam('seg');

    /* collect gift card tracking code */
    if (!s.eVar71)
        s.eVar71 = s.getQueryParam('appcamp');

    /*
    * Do not refire search event if the same search term
    * passed in twice
    */
    /* force the search term to lower case */
    if (s.eVar1)
    {
        s.eVar1 = s.eVar1.toLowerCase()
    }

    var t_search = s.getValOnce(s[s.searchTermVariable], 'ev1', 0)
    if (t_search == '')
    {
        var a = s.split(s.events, ',');
        var e = '';
        for (var i = 0; i < a.length; i++)
        {
            if (a[i] == s.successfulSearchEvent)
                continue;
            else if (a[i] == s.nullSearchEvent)
                continue;
            else if (a[i] == 'event40')
                continue;
            else
                e += a[i] ? a[i] + ',' : a[i];
        }
        s.events = e.substring(0, e.length - 1);
    }

    /* set a blank product string whenever a search occurs */
    if (t_search && t_search != 'undefined' && !s.products)
        s.products = ";"

    /* call channel manager */
    s.channelManager('cid,MREF');
    if (s._campaign == "Direct Load")
    {
        s._campaign = s._channel = s._referrer = s._referringDomain = s._campaign = s._keywords = s._partner = s._referrer = s._referringDomain = "";
    }
    if (s._channel == 'Referrers')
    {
        s._channel = 'Referral';
        s._referringDomain = s.split(s._referringDomain, '/');
        s._campaign = 'REF:' + s._referringDomain[0];
    }
    if (s._channel == 'Natural Search')
    {
        s._campaign = 'SEO:' + s._partner;
        s.eVar21 = s.eVar12 = s._keywords;
        s.eVar22 = 'Natural Search';
        s.eVar11 = s._partner;
    }
    if (s._channel == 'Paid Search')
    {
        s.eVar22 = s.eVar12 = s._keywords;
        s.eVar21 = 'Paid Search';
        s.eVar11 = s._partner;
        s.eVar23 = s._campaign;
    }

    if (!s.campaign && s._campaign)
        s.campaign = s._campaign;

    s.eVar10 = s._channel;
    s.eVar13 = s.crossVisitParticipation(s._channel, 'o_v13', '60', '5', '>', 'purchase')

    if (s.campaign && s.campaign != 'undefined')
    {
        s.campaign = s.split(s.campaign, '#');
        s.campaign = s.campaign[0];
        s.eVar3 = 'External Campaigns';
        if (!s.eVar10)
            s.eVar10 = 'Unidentified Channel';
        if (!s.eVar11)
            s.eVar11 = 'Non-Search Campaign';
        if (!s.eVar12)
            s.eVar12 = 'Non-Search Campaign';
        if (!s.eVar21)
            s.eVar21 = 'Non-Search Campaign';
        if (!s.eVar22)
            s.eVar22 = 'Non-Search Campaign';
    }

    /* copy store selection variables to eVars */
    if (s.prop6 && !s.eVar21)
        s.eVar21 = s.prop6;

    if (s.prop7 && !s.eVar22)
        s.eVar22 = s.prop7;

    if (s.prop13 && !s.eVar23)
        s.eVar23 = s.prop13;

    if (!s.eVar28)
    {
        s.eVar28 = s.getQueryParam('icamp');
        s.eVar28 = s.getValOnce(s.eVar28, 's_eVar28', 30);
    }
    /************************MEMBER ID CODE UPDATE 08-25-2011 BEGIN*************/
    if (s.eVar33)
    {
        s.eVar33 = s.getValOnce(s.eVar33, 's_eVar33', 0);
    }
    /************************MEMBER ID CODE UPDATE 08-25-2011 END***************/

    /* copy facet type:attribute to prop with pathing */
    if (s.eVar42)
    {
        s.prop20 = s.eVar42;
    }

    /* stack facet type: attribute */
    s.eVar43 = s.crossVisitParticipation(s.eVar42, 's_ev43', '1', '5', '>', '')

    //Category Refinment Auto-populate Prop 21
    if (s.eVar48) s.prop21 = s.eVar48;

    //set event60 on first page of visit if visitor is logged in
    if (s.getVisitStart("s_visit") === 1 && (s.eVar8 && s.eVar8.indexOf('Not Logged In') == -1))
    {
        s.events = s.apl(s.events, 'event60', ',', 2);
    }

}
s.doPlugins = s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getVisitStart v2.1 - return 1 on start of visit, else 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,n,t=new Date;if(typeof s.callType=='function'&&s.callTyp"
+"e()=='+')return 0;if(!c)c='s_visit';t.setTime(t.getTime()+18e5);n=s"
+".c_r(c)?0:1;if(!s.c_w(c,1,t))s.c_w(c,1,0);if(!s.c_r(c))n=0;return n");


/*
* Plugin: getQueryParam 2.4
*/
s.getQueryParam = new Function("p", "d", "u", "h", ""
+ "var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+ "tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+ "?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+ "')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+ "g(i==p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", "h", ""
+ "var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+ "string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return''");

	
/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT = new Function("v", "p", "b", ""
+ "var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+ "getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+ "]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;")

/*
* Plugin: getValOnce_v1.1
*/
s.getValOnce = new Function("v", "c", "e", "t", ""
+ "var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+ "0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+ "==0?0:a);}return v==k?'':v");

/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
* Plugin Utility: apl v1.1
*/
s.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");

/*
* Plugin Utility: Replace v1.0
*/
s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
* s.join: 1.0 - s.join(v,p)
*/
s.join = new Function("v", "p", ""
+ "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/*
*	Plug-in: crossVisitParticipation v1.7 - stacks values from
*	specified variable in cookie and returns value
*/

s.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", "dv", ""
+ "var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+ " ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+ "ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+ "f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+ "v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+ ";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+ "ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+ "[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+ "5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+ "gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+ ").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+ " Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+ "getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+ "]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+ "front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+ "m:dl});if(ce)s.c_w(cn,'');return r;");

/*
* channelManager v2.45 - Tracking External Traffic
*/
s.channelManager = new Function("a", "b", "c", "d", "e", "f", ""
+ "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+ "X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+ "e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+ "?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+ "Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+ "nalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m+"
+ "+){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf("
+ "'//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r)"
+ ";t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchE"
+ "ngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s."
+ "repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;"
+ "i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length"
+ ";G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1)"
+ "{N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo'"
+ ");N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k"
+ "++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!"
+ "O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';el"
+ "se P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&"
+ "!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.g"
+ "etValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k."
+ "length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r"
+ ".length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if"
+ "(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k"
+ ".length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S="
+ "r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s"
+ "._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m"
+ "++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;"
+ "T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H"
+ "==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';"
+ "t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?"
+ "P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID="
+ "O;s._campaign=u;s._keywords=M;s._channel=P;");
/* Top 130 - Grouped */
s.seList = "altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc"
+ ".de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum"
+ ".net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Go"
+ "ogle>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|"
+ "MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query"
+ ",search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sezn"
+ "am.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query"
+ "|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>"
+ "yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.ea"
+ "rthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>"
+ "search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "redbox"
s.trackingServer = "metrics.redbox.com"
s.trackingServerSecure = "smetrics.redbox.com"
s.dc = "122"
s.vmk = "4A821418"

//Russ copy and pasted ending here
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.5.1
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function AppMeasurement(){var a=this;a.version="1.5.1";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.zb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.ob=function(a){try{console.log(a)}catch(b){}};a.za=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.fb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.fb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.G=[];a.ba=function(c,b,d){if(a.ta)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.G.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.na();0<a.G.length;){d=a.G.shift();if(b&&!d.t&&d.t>c){a.G.unshift(d);setTimeout(a.delayReady,
parseInt(a.maxDelay/2));break}a.ta=1;a[d.m].apply(a,d.a);a.ta=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.K,(m=a.lightTrackVars)&&(m=","+m+","+a.ga.join(",")+",");else{d=a.c;if(a.pe||a.linkType)m=a.linkTrackVars,
f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].yb,f=a[e].xb));m&&(m=","+m+","+a.A.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.B=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.B(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.za(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.hb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.K,(n=a.lightTrackVars)&&(n=","+n+","+a.ga.join(",")+",");else{b=a.c;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].yb,r=a[e].xb));n&&(n=","+n+","+a.A.join(",")+",");r&&(r=","+r+",",
n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.B("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.B("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&
"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.B("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.B("mts",a[e],n,e));g="";break;default:a.za(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.u=function(a){var b=a.tagName;if("undefined"!=""+a.Cb||"undefined"!=""+a.sb&&"HTML"!=(""+a.sb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.va=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.H=function(c){var b=a.u(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.va(c),e)?{id:e.substring(0,100),type:g}:0};a.Ab=function(c){for(var b=a.u(c),d=a.H(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.u(c),d=a.H(c);
d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.rb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.u(d);for(b=a.H(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.u(d),b=a.H(d);b&&"BODY"!=c||(d=0);if(d){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.va(d));e&&!a.linkLeaveQueryString&&
(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.ya(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?
(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,
100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.ib=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),b[p]=f;f=a.account.split(",");if(c||a.e){c&&
!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(m=0;m<f.length;m++)for(e&&(k=b[p].join(","),k==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),g=0;g<b[p].length;g++)k=b[p][g],k==f[m]&&(e&&(a.e+="&u="+a.escape(k)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(g,1),d=1);c||(d=1);if(d){e="";m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};
a.jb=function(){if(!a.wb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?
a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Bb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.wb=1}};a.L={};a.loadModule=function(c,b){var d=a.L[c];if(!d){d=k["AppMeasurement_Module_"+
c]?new k["AppMeasurement_Module_"+c](a):{};a.L[c]=a[c]=d;d.Na=function(){return d.Ra};d.Sa=function(b){if(d.Ra=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Na,set:d.Sa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.L)if(!Object.prototype[b]&&(d=a.L[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.mb=function(){var c=
Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.M=function(c,b){var d,f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Ga=function(c,b){var d,
f,e,g;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.cb=function(a){var b,d,f,e,g,m=0,k,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?m=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(m=",p,ei,"),
m&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=m.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?k=n+"&"+q:q=""}d=253-(k.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.Ma=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;
b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.Y=!1;a.D=!1;a.Ta=function(){a.D=!0;a.i()};a.W=!1;a.Q=!1;a.Qa=function(c){a.marketingCloudVisitorID=c;a.Q=!0;a.i()};a.T=!1;a.N=!1;a.Ia=function(c){a.analyticsVisitorID=c;a.N=!0;a.i()};a.V=!1;a.P=!1;a.Ka=function(c){a.audienceManagerLocationHint=c;a.P=!0;a.i()};a.U=!1;a.O=!1;a.Ja=function(c){a.audienceManagerBlob=c;a.O=!0;a.i()};a.La=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),
!1):!0};a.X=!1;a.C=!1;a.na=function(){a.C=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.Y||a.D||(a.Ma(a.Ta)?a.D=!0:a.Y=!0);if(a.Y&&!a.D)return!1;b&&b.isAllowed()&&(a.W||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.W=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Qa]),a.marketingCloudVisitorID&&(a.Q=!0)),a.T||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.T=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ia]),a.analyticsVisitorID&&(a.N=!0)),a.V||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.V=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ka]),a.audienceManagerLocationHint&&(a.P=!0)),a.U||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.U=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ja]),a.audienceManagerBlob&&(a.O=!0)),a.W&&!a.Q&&!a.marketingCloudVisitorID||a.T&&!a.N&&!a.analyticsVisitorID||a.V&&!a.P&&!a.audienceManagerLocationHint||a.U&&!a.O&&!a.audienceManagerBlob)&&(c=!1);a.X||
a.C||(a.La(a.na)?a.C=!0:a.X=!0);a.X&&!a.C&&(c=!1);return c};a.k=q;a.o=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Xa=c;f.Wa=b;f.Ua=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.o&&(a.o=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.o&&(clearInterval(a.o),a.o=0),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),c.Wa.apply(c.Xa,c.Ua)};a.Oa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Ga(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,
a.track,b);return!0}return!1};a.gb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+
"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.eb&&(a.authState=a.visitor.eb()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Oa(c)||(b&&a.M(b),c&&(d={},a.Ga(d,0),a.M(c)),a.mb()&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.gb()),a.rb(),a.usePlugins&&a.doPlugins&&
a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ha||(a.referrer=r.document.referrer),a.Ha=1,a.referrer=a.cb(a.referrer),a.l("_g")),a.ib()&&!a.abort&&(a.jb(),g+=a.hb(),a.qb(e,g),a.l("_t"),a.referrer=""))),c&&a.M(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=
a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.q=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.c.length;c++)if(b=a.c[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==
b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.qb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&
a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.vb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.ab(d);a.da()};a.ab=function(c){a.g||a.kb();a.g.push(c);a.fa=a.r();a.Fa()};a.kb=function(){a.g=a.nb();a.g||(a.g=[])};a.nb=function(){var c,b;if(a.ka()){try{(b=k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};
a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.wa=function(){var c=0;a.g&&(c=a.g.length);a.v&&c++;return c};a.da=function(){if(!a.v)if(a.xa=q,a.ja)a.fa>a.J&&a.Da(a.g),a.ma(500);else{var c=a.Va();if(0<c)a.ma(c);else if(c=a.ua())a.v=1,a.pb(c),a.tb(c)}};a.ma=function(c){a.xa||(c||(c=0),a.xa=setTimeout(a.da,c))};a.Va=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.r()-a.Ca;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.ua=function(){if(0<a.g.length)return a.g.shift()};a.pb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.ob(b)}};a.Pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.S=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.S=!0,a.R=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.R=function(a){return k.$.parseJSON(a)},a.S=!0):a.R=function(){return null};a.tb=function(c){var b,
d,f;a.Pa()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.S?b.pa=!0:b=0));!b&&a.lb&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",
b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="");b.ra=function(){try{a.la&&(clearTimeout(a.la),a.la=0),b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(c){}};b.onload=b.ub=function(){b.ra();a.$a();a.Z();a.v=0;a.da();if(b.pa){b.pa=!1;try{var c=a.R(b.responseText);AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.bb=function(){b.ra();(a.trackOffline||a.ja)&&a.v&&a.g.unshift(a.Za);a.v=0;a.fa>a.J&&a.Da(a.g);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&
(200==b.status?b.ub():b.bb())};a.Ca=a.r();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Aa)try{f.removeChild(a.Aa)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Aa=a.Ya}b.abort&&(a.la=setTimeout(b.abort,5E3));a.Za=c;a.Ya=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.F||a.q)a.forcedLinkTrackingTimeout||
(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.$a=function(){if(a.ka()&&!(a.Ba>a.J))try{k.localStorage.removeItem(a.ia()),a.Ba=a.r()}catch(c){}};a.Da=function(c){if(a.ka()){a.Fa();try{k.localStorage.setItem(a.ia(),k.JSON.stringify(c)),a.J=a.r()}catch(b){}}};a.Fa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.ua()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=
function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.r=function(){return(new Date).getTime()};a.ya=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.vb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.M(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],
f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&
b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.K=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.K.push("prop"+n)),a.c.push("eVar"+n),a.K.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
a.Ca=0;a.fa=0;a.J=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.lb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.F&&a.j.dispatchEvent(a.F);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.F=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.I&&a.I==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.I=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.I==m&&(a.I=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.F=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();
