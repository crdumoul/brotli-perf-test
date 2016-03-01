//Added to avoid errors in case symcDataLayer is not defined
var enableAdobeAnalytics = true;
if(typeof symcDataLayer === "undefined" || typeof symcDataLayer.om === "undefined") {
    symcDataLayer = {};
    symcDataLayer.om = {};
    enableAdobeAnalytics = false;
}

//Code updated to pick report suite from datalayer
var s_account=symcDataLayer.om['account']?symcDataLayer.om['account']:"veritasnonconsumer";
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,gz,gg,iso,kmz,xml,mp4,m4a,air,ppt,pptx,docx,xlsx,m4v,tar,txt,jpg,jpeg,png,gif,tiff,bmp,rar,msi,rpm,swf,1of2,2of2,1of3,2of3,3of3,1of4,2of4,3of4,4of4,1of5,2of5,3of5,4of5,5of5"
s.linkInternalFilters="javascript:,symantec.com,symantec.co"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
s.wd=window;

/* Plugin Config */
s.usePlugins=true

function s_doPlugins(s) {
    var url=s.linkHandler('.exe|.zip|.wav|.mp3|.mov|.mpg|.avi|.wmv|.doc|.pdf|.xls|.gz|.gg|.iso|.kmz|.xml|.mp4|.m4a|.air|.ppt|.pptx|.docx|.xlsx|.m4v|.tar|.txt|.jpg|.jpeg|.png|.gif|.tiff|.bmp|.rar|.msi|.rpm|.swf|.1of2|.2of2|.1of3|.2of3|.3of3|.1of4|.2of4|.3of4|.4of4|.1of5|.2of5|.3of5|.4of5|.5of5','d');

    if(url) {
        s.events="event1";

        var tmpArray = url.split('/');
        var filename = tmpArray[tmpArray.length - 1];
        var filetype = filename.substr(filename.lastIndexOf(".") + 1).toLowerCase();

        s.eVar1  = url;
        s.prop46 = filetype;
        s.prop47 = "download";
        s.prop48 = filename;
        s.eVar49 = filename;

        s.linkTrackVars="events,eVar1,prop46,prop47,prop48,eVar49";
        s.linkTrackEvents="event1";
    }

    // Internal Tracking Parameter
    s.prop21 = s.Util.getQueryParam('inid');
    s.eVar21 = s.prop21;


    s.prop35 = "D=pageName";

	s.prop59 = "";
	if(hasValue(symcDataLayer.om,"site_section"))
		s.prop59 = s.prop59 + symcDataLayer.om['site_section'];
	if(hasValue(symcDataLayer.om,"site_sub_section"))
		s.prop59 = s.prop59 + ":" + symcDataLayer.om['site_sub_section'];
	if(hasValue(symcDataLayer.om,"site_sub_sub_section"))
		s.prop59 = s.prop59 + ":" + symcDataLayer.om['site_sub_sub_section'];
	if(hasValue(symcDataLayer.om,"page_name"))
		s.prop59 = s.prop59 + ":" + symcDataLayer.om['page_name'];


    if(s.prop21) s.prop35 = '> ' + s.prop21 + ' ' + s.pageName;

    /**********************************/
    /***** campaign tracking code *****/

    s.prop22 = s.Util.getQueryParam('om_em_cid');

    if(!s.prop22) s.prop22 = s.Util.getQueryParam('om_sem_cid');
    if(!s.prop22) s.prop22 = s.Util.getQueryParam('om_rssid');
    if(!s.prop22) s.prop22 = s.Util.getQueryParam('om_ext_cid');
    if(!s.prop22) s.prop22 = s.Util.getQueryParam('om_aff_cid');

    s.prop22 = s.getValOnce(s.prop22,'s_prop22',30);
    s.eVar35 = s.prop22;
    s.campaign = s.prop22;
    s.eVar61 = s.prop22;

    s.prop26 = s.Util.getQueryParam('om_sem_kw');
    s.prop26 = s.getValOnce(s.prop26,'s_prop26',30);
    s.eVar45 = s.prop26;

    s.prop56 = s.Util.getQueryParam('aid');
    s.eVar2 = s.prop56

    if(s.campaign) s.prop35 = '> ' + s.campaign + ' ' + s.pageName;

    /***** campaign tracking code *****/
    /**********************************/


    /*********** Dynamic Variables**********/

    s.eVar18  = "D=pageName";
    s.eVar57 = "D=s_vi";

    s.eVar27 = s.prop2!=""?"D=c2":"";
    s.eVar28 = s.prop3!=""?"D=c3":"";
	s.eVar41 = s.prop41!=""?"D=c41":"";
	s.eVar49 = s.prop48!=""?"D=c48":"";
	s.eVar48 = s.prop49!=""?"D=c49":"";
	s.eVar58 = s.prop58!=""?"D=c58":"";
	s.eVar59 = s.prop59!=""?"D=c59":"";

    s.prop60=s.getPreviousValue(s.pageName,'s_gpv','');


    /* First Time Visitor  */
    if(s.getNewRepeat(240) == 'New') {
        var event69="event69";

        if(s.getValOnce(event69,'event69',240)){
            s.events=s.events?s.events+",event69":"event69";
        }
    }

    // TNT and Analytics Mapping
    var tmpTNT =s.trackTNT();
    tmpTNT = (tmpTNT == "::,")?'':tmpTNT;
    if( tmpTNT ) {
        s.eVar39 = s.tnt = tmpTNT;
    }


}
s.doPlugins=s_doPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
* Function to check if the dataLayerObj had a value for the variable name given in varName parameter.
* dataLayerObj - This is the data layer json object
* varName - Variable that contains the name of the data layer variable
* countryflag - This flag is used to enable or disable the site_country variable check. This is being used
*				to set the exact country value even if its value is 'na' for prop2 and eVar27.
*               so passing this flag true will disable this logic and allow setting na to prop2 and eVar27.
*/
function hasValue(dataLayerObj, varName,countryflag) {
	//This if condition was added to inorder to avoid passing site_sub_section & site_sub_sub_section values when set to na.
	if(varName != null && (varName == "site_sub_section" || varName == "site_sub_sub_section")) {
		if(dataLayerObj != null && dataLayerObj[varName] != null && dataLayerObj[varName].toLowerCase() !== "na" && dataLayerObj[varName] !== "")
			return true;
		else
			return false;
	//Below if condition was added to avoid passing site_country values when set to na for the symantec sub domains with site_name not set in data layer.
	} else if(varName != null && varName == "site_country" && countryflag == true) {
		if(dataLayerObj != null && dataLayerObj[varName] != null && dataLayerObj[varName].toLowerCase() !== "na" && dataLayerObj[varName] !== "")
			return true;
		else
			return false;
	}
	else if(dataLayerObj != null && dataLayerObj[varName] != null && dataLayerObj[varName] !== "") {
		return true;
	}else{
		return false;
	}
}
/*
* function to track the page views.
* dataLayerObj -data layer object containing page level variable values.
*/
function trackPageView(dataLayerObj) {
	s.pageName = "";
    if(hasValue(dataLayerObj,"site_name")) {
		s.pageName = dataLayerObj['site_name'];
		if(hasValue(dataLayerObj,"site_country"))
			s.pageName = s.pageName + ":" +dataLayerObj['site_country'];
		if(hasValue(dataLayerObj,"site_section"))
			s.pageName = s.pageName + ":" + dataLayerObj['site_section'];
		if(hasValue(dataLayerObj,"site_sub_section"))
			s.pageName = s.pageName + ":" + dataLayerObj['site_sub_section'];
		if(hasValue(dataLayerObj,"site_sub_sub_section"))
			s.pageName = s.pageName + ":" + dataLayerObj['site_sub_sub_section'];
		if(hasValue(dataLayerObj,"page_name"))
			s.pageName = s.pageName + ":" + dataLayerObj['page_name'];
	//Below else condition was added for symantec sub domains with site_name not set in data layer.
	} else {
		s.pageName = "";
		if(hasValue(dataLayerObj,"site_section"))
			s.pageName = dataLayerObj['site_section'];
		if(hasValue(dataLayerObj,"site_country",true)) {
			s.pageName = s.pageName!=null && s.pageName!=""?s.pageName + ":" :"";
			s.pageName = s.pageName +dataLayerObj['site_country'];
		}
		if(!hasValue(dataLayerObj,"site_country",true) & hasValue(dataLayerObj,'site_language')) {
			s.pageName = s.pageName!=null && s.pageName!=""?s.pageName + ":" :"";
			s.pageName = s.pageName +dataLayerObj['site_language'];
		}
		if(hasValue(dataLayerObj,"site_sub_section")) {
			s.pageName = s.pageName!=null && s.pageName!=""?s.pageName + ":" :"";
			s.pageName = s.pageName + dataLayerObj['site_sub_section'];
		}
		if(hasValue(dataLayerObj,"site_sub_sub_section")) {
			s.pageName = s.pageName!=null && s.pageName!=""?s.pageName + ":" :"";
			s.pageName = s.pageName + dataLayerObj['site_sub_sub_section'];
		}
		if(hasValue(dataLayerObj,"page_name")) {
			s.pageName = s.pageName!=null && s.pageName!=""?s.pageName + ":" :"";
			s.pageName = s.pageName + dataLayerObj['page_name'];
		}
	}
	s.server="symantec";
	s.prop27=hasValue(dataLayerObj,'site_name')?dataLayerObj['site_name']:"";
	s.eVar50=s.prop27!=""?"D=c27":"";
	s.prop2=hasValue(dataLayerObj,'site_country')?dataLayerObj['site_country']:"";
	s.prop3=hasValue(dataLayerObj,'site_language')?dataLayerObj['site_language']:"";
	s.prop41=hasValue(dataLayerObj,'site_section')?dataLayerObj['site_section']:"";
	s.prop46=hasValue(dataLayerObj,'content_format')?dataLayerObj['content_format']:"";
	s.prop47=hasValue(dataLayerObj,'content_type')?dataLayerObj['content_type']:"";
	s.prop48=hasValue(dataLayerObj,'content_title')?dataLayerObj['content_title']:"";
	s.prop49=hasValue(dataLayerObj,'site_sub_section')?dataLayerObj['site_sub_section']:"";
	s.prop58=hasValue(dataLayerObj,'site_sub_sub_section')?dataLayerObj['site_sub_sub_section']:"";
	s.eVar9=hasValue(dataLayerObj,'signed_in')?dataLayerObj['signed_in']:"";

    s.t();
}

//dUrl is the URL to the download file, dName is the filename, dType is the extension of the download.
trackCustomDownload = function (dUrl, dName, dType) {
	var s = s_gi(s_account);
	s.linkTrackVars = "events,eVar1,prop46,prop47,prop48,eVar49";
	s.linkTrackEvents = "event1";
	s.eVar1 = dUrl;
	s.prop48 = s.eVar49 = dName;
	s.prop46 = dType;
	s.prop47 = "download";
	s.events = "event1";
	s.tl(this, "d", dUrl);
};

/*
* Utility function to track  visit score. Not Used. Can be used in future.
*/
function trackVisitorScore(type, score) {
    var events=s.events;
    var v7=s.eVar7;
    var v8=s.eVar8;
    s.linkTrackVars="";
    s.linkTrackEvents="event18";
    s.events="event18="+score;
    s.eVar7=type
    s.eVar8="+"+score
    s.tl(this,'o',"visitor_scoring");
    s.events=events;
    s.eVar7=v7;
    s.eVar8=v8;
}

/*
 * Utility manageVars v1.4 - clear variable values (requires split 1.5)
 */

s.manageVars=new Function("c","l","f",""
    +"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
    +"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
    +",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
    +"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
    +"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
    +"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
    +"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
    +");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
    +"var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
    +"Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
    +"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
    +"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
    +"){for(y in j){if(i[x]==j[y]){if(s.Util.cookieRead(c)) r=s.Util.cookieRead(c);v?s.Util.cookieWrite(c,v,t)"
    +":s.Util.cookieWrite(c,'no value',t);return r}}}}}else{if(s.Util.cookieRead(c)) r=s.Util.cookieRead(c);v?"
    +"s.Util.cookieWrite(c,v,t):s.Util.cookieWrite(c,'no value',t);return r}");


/*
 * Plugin: getNewRepeat 1.1 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function("d",""
    +"var s=this,e=new Date(),cval,sval,ct=e.getTime();e.setTime(ct+d*24*"
    +"60*60*1000);cval=s.Util.cookieRead('s_nr');if(cval.length==0){s.Util.cookieWrite('s_nr',ct+'"
    +"-New',e);return 'New';}sval=cval.split('-');if(ct-sval[0]<30*60*100"
    +"0&&sval[1]=='New'){s.Util.cookieWrite('s_nr',ct+'-New',e);return 'New';}else {s."
    +"c_w('s_nr',ct+'-Repeat',e);return 'Repeat';}");



/*
 * TNT Integration Pluginv1.0 - heavily customized
 * v -Name of the javascriptvariable that is used. Defaults to s_tnt(optional)
 * p -Name of the urlparameter. Defaults to s_tnt(optional)
 * b -Blank Global variable after pluginruns. Defaults to true (Optional)
 */
s.trackTNT= function(v, p, b)
{
    var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true;
    if(s.Util.getQueryParam)
        pm = s.Util.getQueryParam(p); //grab the parameter
    if(pm)
        r += (pm + ","); // append the parameter
    if(s.wd[v] != undefined)
        r += s.wd[v]; // get the global variable
    if(b)
        s.wd[v] = ""; // Blank out the global variable for ajaxrequests
    return r;
};
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
    +"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.Util.cookieRead(c"
    +");if(v){a.setTime(a.getTime()+e*86400000);s.Util.cookieWrite(c,v,e?a:0);}return"
    +" v==k?'':v");
/*
 *      Plug-in: crossVisitParticipation v1.7 - stacks values from
 *      specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
    +"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
    +" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
    +"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
    +"f(!v||v==''){if(ce){s.Util.cookieWrite(cn,'');return'';}else return'';}v=escape("
    +"v);var arry=new Array(),a=new Array(),c=s.Util.cookieRead(cn),g=0,h=new Array()"
    +";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
    +"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
    +"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
    +"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
    +"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
    +").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
    +" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
    +"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
    +"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
    +"front:'[',back:']',wrap:\"'\"});s.Util.cookieWrite(cn,data,e);var r=s.join(h,{deli"
    +"m:dl});if(ce)s.Util.cookieWrite(cn,'');return r;");

/*
 * s.join: 1.0 - s.join(v,p)
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 */
s.join = new Function("v","p",""
    +"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
    +":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
    +";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
    +"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
    +"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
    +"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 * Updated code to support app measurement libary for custom link tracking
 */
s.linkHandler=new Function("p","t",""
    +"var s=this,h=typeof s.clickObject !== 'undefined'?s.Ab(s.clickObject):null,i,l;t=t?t:'o';if(!h"
    +")return '';h=h.href;i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
    +"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
    +"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
    +"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
    +"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
    +"return 0;");

/*
 * Plugin: check and verify if the customer clicked link is a download link by checking the link extensions
 * x -variable with the list of extensions for download links E.g. exe
 * d -seperator to seperate out the list of extensions in variable x
 * f -name of the function to be called fromm s.pt function
 * a -download link
 */
s.pt = function(x, d, f, a) {
	var s = this,
		t = x,
		z = 0,
		y, r;
	while (t) {
		y = t.indexOf(d);
		y = y < 0 ? t.length : y;
		t = t.substring(0, y);
		r = s[f](t, a);
		if (r) return r;
		z += y + d.length;
		t = x.substring(z, x.length);
		t = z < x.length ? t : ''
	}
	return ''
}



/* WARNING: Changing any of the below variables will cause drastic
 changes to how your visitor data is collected.  Changes should only be
 made when instructed to do so by your account manager.*/
s.trackingServer="om.symantec.com"
s.trackingServerSecure="oms.symantec.com"
s.dc=112

//Adobe visitorID service integration
if (typeof Visitor != 'undefined') {
s.visitor = Visitor.getInstance("A7F83BC75245AE580A490D4D@AdobeOrg");
s.prop75 = s.visitor.getMarketingCloudVisitorID();
}else{
s.prop75 = "MCMID not available";
}

/******Demand base***********/
s.maxDelay = 750;
s.loadModule("Integrate");
s.Integrate.onLoad = function (s, m) {


    /*
       * [Begin] Partner Plugin: Demandbase v2.1.2 im
    */
    s.Integrate.add("Demandbase");
    var _db = s.Integrate.Demandbase;
    _db._key="e48819e243a0fc3403348e0d982422b6";
    _db._apiURL="//api.demandbase.com/api/v2/ip.js?key=[_key]&var=[VAR]&rnd=[RAND]"+(_db._testIP?'&query='+_db._testIP:'');
    _db._delim=":";
    _db._responseObjects=["watch_list"];
    _db._setTnT=false;
    _db._tntVarPrefix="db_";
    _db._nonOrgMatchLabel = "[n/a]";
    _db._dimensionArray=[
        {"id":"demandbase_sid","max_size":10},
        {"id":"company_name","max_size":40},
        {"id":"industry","max_size":40},
        {"id":"sub_industry","max_size":40},
        {"id":"employee_range","max_size":30},
        {"id":"revenue_range","max_size":10},
        {"id":"audience","max_size":30},
        {"id":"audience_segment","max_size":30}
    ];
    _db._dimensionArrayCustom=[
        {"id":"watch_list_account_type","max_size":30},
        {"id":"watch_list_account_status","max_size":30},
        {"id":"watch_list_account_owner","max_size":30},
        {"id":"state","max_size":30},
        {"id":"country","max_size":30},
        {"id":"fortune_1000","max_size":30},
        {"id":"employee_count","max_size":30},
        {"id":"stock_ticker","max_size":30}
    ];
    _db._cName="s_dmdbase";
    _db._contextName="s_dmdbase";
    _db._contextNameCustom="s_dmdbase_custom";
    _db._setVarsCalled=false;

    _db._gpv=new Function("s","n",""+"var cval,c=this._cName,o;cval=this.c_r(s,c);if(!cval){cval='';}o=this._q"+"2o(cval);return o[n];");_db._q2o=new Function("q",""+"var nv,i,o={},a=q.split('&');for(i=0;i<a.length;i++){nv=a[i].split("+"'=');if(nv.length==2){o[nv[0]]=unescape(nv[1]);}}return o;");_db._o2q=new Function("o",""+"var q='',c=0;for(var n in o){q+=(c?'&':'')+n+('='+escape(o[n]));c++"+";}return q;");_db._spv=new Function("s","n","v",""+"var cval,c=this._cName,o;cval=this.c_r(s,c);if(!cval){cval='';}o=this._q"+"2o(cval);o[n]=v;cval=this._o2q(o);this.c_w(s,c,cval,0);if(!this.c_r(s,c)){ret"+"urn '';}else {return cval;}");_db.c_r=function(e,t){if(e.Util&&e.Util.cookieRead){return e.Util.cookieRead(t)}else{return e.c_r(t)}};_db.c_w=function(e,t,n){if(e.Util&&e.Util.cookieWrite){return e.Util.cookieWrite(t,n)}else{return e.c_w(t,n)}};_db.compact=function(e,t){var n=[];for(var r=0;r<t.length;r++){var i=t[r].id;var s=t[r].max_size;if(!s)s=20;if(i&&typeof e[i]!=="undefined"){var o=""+e[i]||this._nonOrgMatchLabel;o=o.replace(this._delim," ");n.push(o.substring(0,s))}else{n.push(this._nonOrgMatchLabel)}}return n.join(this._delim)};_db.flatten=function(e){if(e == null || typeof e != "object") return e;for(var i=0;i<this._responseObjects.length;i++){var d=this._responseObjects[i];if(e[d] && typeof e[d] == "object"){for (nd in e[d]) {e[d + "_" + nd] = e[d][nd]}delete e[d]}}return e};_db._setTnTParams=function(e){var t,n=this._cName,r,i,s,o,u=window,a,f,l={};a=this._gpv(e,"sentAT");if(typeof a!="undefined"&&a=="T")return;f=this._gpv(e,"rsp");if(f=="undefined"||f=="nomatch")return;if(typeof u.mboxDefine!="undefined"&&typeof u.mboxUpdate!="undefined"){var c=document.createElement("div");r=this._cName+"_div";c.setAttribute("id",r);c.style.display="none";document.body.appendChild(c);i="mbox_Genesis_Demandbase_hidden";u.mboxDefine(r,i);var h=[],p=this._gpv(e,"cData"),d=this._gpv(e,"cDataCustom"),v=[],m=this._dimensionArray,g=this._dimensionArrayCustom;h.push(i);if(p){v=p.split(this._delim);if(v.length==8){for(o=0;o<16;o++)l["p"+o]="";for(o=0;o<8;o++)if(m[o].id)h.push("profile."+this._tntVarPrefix+m[o].id+"="+v[o]);if(d&&g){v=d.split(this._delim);if(v.length==8)for(o=8;o<16;o++)if(g[o-8].id)h.push("profile."+this._tntVarPrefix+g[o-8].id+"="+v[o-8])}u.mboxUpdate.apply(u,h);this._spv(e,"sentAT","T")}}}};_db.setVars=function(e,t){var n=this.saveResponse(t);if(!this._setVarsCalled){if(typeof r=="undefined")var r=this._gpv(e,"cData");if(typeof r!="undefined"){var i=this._gpv(e,"sentAA");if(typeof i=="undefined"){this._spv(e,"sentAA","T");e.contextData[this._contextName]=r;if(_db._dimensionArrayCustom){var s=this._gpv(e,"cDataCustom");e.contextData[this._contextNameCustom]=s}}if(this._setTnT)this._setTnTParams(e)}else{if(this.VAR){window.s_1_Integrate_Demandbase=this;var o=this.VAR+"";window.setTimeout(function(){s_1_Integrate_Demandbase.saveResponse(window[o])},1500)}}}this._setVarsCalled=true};_db.saveResponse=function(e){var t=this.flatten(e);if(t&&typeof t=="object"&&t.hasOwnProperty("ip")){if(typeof t.audience!="undefined"){this._spv(s,"rsp","match");var n=this.compact(t,this._dimensionArray);this._spv(s,"cData",n);if(this._dimensionArrayCustom){var r=this.compact(t,this._dimensionArrayCustom);this._spv(s,"cDataCustom",r)}return"match"}else{this._spv(s,"rsp","nomatch");return"nomatch"}}};
    var _rsp_status=_db._gpv(s,"rsp");if(typeof _rsp_status=="undefined")_db.get(window.location.protocol+_db._apiURL)
    /*
       * [End] Partner Plugin: Demandbase v2.1.2 im
    */





};
/******End Demand base********/

//pageView Tracking call. symcDataLayer.spa was added for single page applications(spa)
if(enableAdobeAnalytics && !symcDataLayer.spa)
	trackPageView(symcDataLayer.om);

/****************************** MODULES *****************************/
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
        a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
    new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}


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
    b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.search(new RegExp(d + c + "=",'i')),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
    a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.K=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
    for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.K.push("prop"+n)),a.c.push("eVar"+n),a.K.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
    a.Ca=0;a.fa=0;a.J=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.lb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.F&&a.j.dispatchEvent(a.F);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.F=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
        a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.I&&a.I==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.I=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.I==m&&(a.I=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
    e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
        1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.F=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();