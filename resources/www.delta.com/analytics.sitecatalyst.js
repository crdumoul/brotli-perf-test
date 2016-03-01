
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.saveEvars();
	            CQ_Analytics.Sitecatalyst.updateEvars(options);
	            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
	            return false;
	        }, 10);
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            s = s_gi("deltacom2");
	            if (s.linkTrackVars == "None") {
	                s.linkTrackVars = "events";
	            } else {
	                s.linkTrackVars = s.linkTrackVars + ",events";
	            }
	            CQ_Analytics.Sitecatalyst.trackLink(options);
	            return false;
	        }, 100);
	
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.restoreEvars();
	            return false;
	        }, 200);
	
	        CQ_Analytics.adhocLinkTracking = "false";
	        
	
	
	        var s_account = "deltacom2";
	        var s = s_gi(s_account);
	        s.fpCookieDomainPeriods = "2";
	        s.currencyCode= 'USD';
        s.trackInlineStats= false;
        s.linkTrackVars= 'None';
        s.charSet= 'UTF-8';
        s.linkLeaveQueryString= false;
        s.linkExternalFilters= '';
        s.linkTrackEvents= 'None';
        s.trackExternalLinks= true;
        s.linkDownloadFileTypes= 'exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,xlsx,ppt,pptx';
        s.linkInternalFilters= 'javascript:,delta.com,blog.delta.com,airelite.com,deltaprivatejets.com,si.delta.com,delta-offers.com,nwa.com,verifiedbyvisa.com,visa.com,arcot.com,securesuite.net,securecode.com,mycardsecure.com,www304.americanexpress.com';
        s.trackDownloadLinks= true;
        
        s.visitorNamespace = "delta";
        s.trackingServer = "delta.112.2o7.net";
        s.trackingServerSecure = "delta.112.2o7.net";
        
        function cqgetCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name){
            return unescape(y);
        }
    }
}
var dfa_environment;
if(s_account == "deltacom2"){
    dfa_environment="u20=PROD"
} else {
    dfa_environment="u20=DEV";
}
/* Plugin Config */
s.usePlugins=true
/********************************************************************
 *
 * Page name Config variables 
 *
 *******************************************************************/
/* Page Name Plugin Config */
s.siteID=""            // leftmost value in pagename
s.defaultPage=""       // filename to add when none exists
s.queryVarsList=""     // query parameters to keep
s.pathExcludeDelim=";" // portion of the path to exclude
s.pathConcatDelim=":"   // page name component separator
s.pathExcludeList=""   // elements to exclude from the path

/* Channel Manager Plugin Config */

s._channelParameter="Paid Search|clickid"
s.maxDelay="750" // maximum time to wait for DFA, in milliseconds
s.loadModule("Integrate")

s.Integrate.onLoad=function(s,m) {

        s.socialAuthors();

}

function s_doPlugins(s) {
    /* Add calls to plugins here */

 
		
    var expCookieSet="";
    expCookieSet=s.c_r('exp_type');    //read cookie to see if it has been set
    if (expCookieSet==""){
        s.eVar16=s.getQueryParam('type');    //cookie not set, look for type parameter
        s.c_w('exp_type',s.eVar16,0);        //set cookie with eVar16 value 
    }
    else s.eVar16=s.c_r('exp_type');  
    if(!s.eVar16)
        s.eVar16="delta.com";
    s.linkTrackVars=s.apl(s.linkTrackVars,'eVar16',',',2);   //capture eVar16 in custom link calls also
    
    /*platform type
    s.eVar16="delta.com";
    s.linkTrackVars=s.apl(s.linkTrackVars,'eVar16',',',2);   
    */
    s.tnt=s.trackTNT();
    s.prop25=s.propTwentyFive();
    
    /*get url minus parameters*/
    
    s.prop61=window.location.href.split('?')[0];
    
    s.eVar23=s.getNewRepeat();
	
	/*custom code from sitecatalyst.jsp , start */
	try {
	        	CustomerInfo.setData(loginData,"custData");

	    	} catch (error){
	        	var loginData = {"loggedIn":false,"rememberMeIndicator":false, "cartCnt":"0"};
	        	CustomerInfo.setData(loginData,"custData");
	            } 
	       try {
	       	 s.prop34 = ((cqgetCookie("clflg")).indexOf('Y')==0)?"Logged In":"Logged Out";
	    	} catch (error) {
	        	s.prop34 = "Logged Out";
	    	}
			s.prop16 = UserTracking.getProp("countryAndLanguage");
	        s.eVar20 = UserTracking.getProp("countryAndLanguage");
	    	s.server = window.location.host.toString().split('.')[0];
	    	if(CustomerInfo.isSkyMilesMember() != null && CustomerInfo.isSkyMilesMember()){
	        	s.eVar22 = UserTracking.getProp("loyaltyId");
	        	s.eVar21 = UserTracking.getProp("skyMilesMemType");
	    	}
	    	if(UserTracking.getProp("pageName") == "Home Page"){
	        	s.pageName = UserTracking.getProp("pageName");
				
	    	}
	        //UserTracking.addClickTracking();
			//s.prop58="";
	/* custom code from sitecatalyst.jsp end */
    
    /* Plugin Example: getTimeToComplete 0.4*/
    var gttcCookieSet="";
    gttcCookieSet=s.c_r('ttc');   
    if(s.events&&gttcCookieSet==""&&((s.events.indexOf('event14')>-1)||(s.events.indexOf('event19')>-1)||(s.events.indexOf('event32')>-1)))
            s.prop29='start';
    if(s.events&&((s.events.indexOf('event16')>-1)||(s.events.indexOf('event34')>-1)))
            s.prop29='stop';
            s.prop29=s.getTimeToComplete(s.prop29,'ttc',0);

    /* Plugin Example: getPagename v2.1*/
    if(!s.pageType && !s.pageName){
    
            s.pageName=s.getPageName();
    }
    /* set pagename in cookie for TnT */
    s.c_w('tnt_pagename',s.pageName,0);        

    /* set eVar1 with internal campaign value (itc parameter) */
    if(!s.eVar1) { s.eVar1=s.getQueryParam('itc'); }

    /* set eVar68 with internal campaign value (icid parameter) */
    if(!s.eVar68) { s.eVar68=s.getQueryParam('icid'); }

    if(!s.campaign){ 
	s.campaign=s.getQueryParam('mkcpgn,mkast,mkplac',',');
	s.campaign=s.getValOnce(s.campaign,"cname",0);
	  

	/* collect paid & natural search, unpaid referrals and direct */

		s.channelManager('clickid','','c_m','0','s_dl','1');
	if(s._channel=="Referrers"){
						s._campaign='REF|'+s._referringDomain;
						s.campaign=s._campaign;
						s.eVar56=s._referringDomain;
		}

		/* 6/29/2011 - Capture Search Engine into Campaign */
		if(s._channel=="Natural Search"){
						/*s.campaign="SEzzznat";*/
						s.campaign='NS|'+s._partner;
						s._keywords='NS|'+s._keywords;
		}

		/* 2/7/2011 Collect Kenshoo parameters */
		if(s._channel=='Paid Search'){
						//s.campaign=s.getQueryParam('mkcpgn');
						s._keywords=s.getQueryParam('s_kwcid');
						s.eVar48=s.getQueryParam('tracking_id');
						s.eVar49=s.getQueryParam('clickid');
		}
		if (s._channel=='Direct Load')
		{
						var sCampaign="";
						sCampaign=s._channel;
		}

		/* Campaign Channel Stacking */
		if (!s.eVar2){
			s.eVar2 = s.crossVisitParticipation(s._channel,'s_chl','90','5','>','purchase',0) 
		}
		/* Keyword Stacking */
		if (!s.eVar55 && s._keywords != 'n/a'){
			 s.eVar55 = s.crossVisitParticipation(s._keywords,'s_cpmscm','90','5','>','purchase',0);
		}
}

        /*socialPlatforms v1.0 - used for SocialAnalytics*/
            s.socialPlatforms('eVar74');
            
        /* Read and clean up the s_vi cookie and populate to eVar26 */
		if (s.eo === undefined) {
            var s_visIdCookie=s.c_r('s_vi');

            var visRegExp=/[0-9A-F]+-[0-9A-F]+/g;

            var s_visId=s_visIdCookie.match(visRegExp);

            if(s_visId){

                s.eVar26=s_visId;
                if (!(window.location.href.indexOf('selectBoardingPassNext.action')>-1||s.pageName.indexOf('View Boarding Pass')>-1)){
                    //s_dfaCall();
                }
            }

            else{
                //setTimeout("s_dfaCall()", 1500); /*should this be adjusted */
}

            /* Persist the visitor ID in an Adobe cookie */

            s.eVar26=s.getAndPersistValue(s.eVar26,'s_v??_persist',730); /*should the 730 value be adjusted */
		}
}

s.doPlugins=s_doPlugins
/* CONVENIENCE FUNCTIONS */
function omni_trackRefinement(refinement){
      s.linkTrackVars='eVar15';
      s.eVar15=refinement;
      s.tl(true,'o','flight search refinement');
      s.eVar15='';
}
function customInteraction(desc,loc){
    s.linkTrackVars='prop1,prop2';
    s.prop1=desc;
    s.prop2=loc;
    s.tl(this,'o',desc);
    s.prop1=s.prop2='';
}
function skyMilesEmailUpdate(subscribes,unsubscribes){
s.linkTrackVars='events,eVar50,eVar51';
s.linkTrackEvents='event58';
s.events='event58';
s.eVar50=subscribes;
s.eVar51=unsubscribes;
s.tl(this,'o','skymiles email update');
s.eVar50=s.eVar51='';
}


/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/* 
* TNT Integration Plugin v1.0 
* v - Name of the javascript variable that is used. Defaults to s_tnt 
(optional) 
* p - Name of the url parameter. Defaults to s_tnt (optional) 
* b - Blank Global variable after plugin runs. Defaults to true (Optional) 
*/ 
s.trackTNT = function(v, p, b) 
{ 
var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true; 
if(s.getQueryParam) 
pm = s.getQueryParam(p); //grab the parameter 
if(pm) 
r += (pm + ","); // append the parameter 
if(s.wd[v] != undefined) 
r += s.wd[v]; // get the global variable 
if(b) 
s.wd[v] = ""; // Blank out the global variable for ajax requests 
return r;
} 

s.propTwentyFive = function(v, p, b)
{
    var s = this, n = "s_propTwentyFive", p = (p)?p:n, v = (v)?v:n, r="",pm=false, b = (b)?b:true;
    if(s.getQueryParam)   
        pm = s.getQueryParam(p); //grap the parameter
    if(pm)
        r += (pm + ","); // append the parameter
    if(s.wd[v] != undefined)
        r += s.wd[v]; // get the global variable
    if(b)   
        s.wd[v] = ""; // Blank out the global variable for ajax requests
    return r;
}
/*
* Plugin: s_dfaCall: create a DFA Floodlight tag on every page of the visit
*/
function s_dfaCall(){
	return;
    var a,b,c,d,e,f;
    if(!s.eVar26 || s.eVar26 == 'null') {
        a=s.c_r('s_vi');
        b=/[0-9A-F]+-[0-9A-F]+/g;
        c=a.match(b);
    }
    else{c=s.eVar26;}
    var delim = '%$&';
    
    /* Using variable not an array */
    var dfaParams;
    var FT =  'FT1='+c;
    
    if(s.purchaseID) FT= FT + delim + 'FT2='+ s.purchaseID;
        
    if(s.eVar2){  
        
        var str = ""+s.eVar2;
        var n=str.lastIndexOf(";");
        str = str.substring(n+1,str.length); /*save only last value of the variable */
        
        FT= FT + delim +'FT3='+ str;
        
    }
        
    if(s.campaign) FT = FT + delim + 'FT4=' + s.campaign;
    if(s.eVar48)   FT = FT + delim + 'FT5=' + s.eVar48;
    if(s.eVar68)   FT = FT + delim + 'FT6=' + s.eVar68;
    if(s.pageName) FT = FT + delim +'FT7='+ s.pageName;
    if(s.events)   FT = FT + delim +'FT8='+ s.events;
    if(s.products) FT = FT + delim +'FT9='+ s.products;
    if(s.eVar22)   FT = FT + delim +'FT10='+ s.eVar22;
    if(s.eVar21)   FT = FT + delim +'FT11='+ s.eVar21;
    if(s.eVar6)    FT  = FT + delim +'FT12='+ s.eVar6;
    if(s.eVar3)    FT  = FT + delim +'FT13='+ s.eVar3;
    if(s.eVar37)   FT  = FT + delim +'FT14='+ s.eVar37;
    if(s.eVar7)    FT  = FT + delim +'FT15='+ s.eVar7;
    if(s.eVar10)   FT  = FT + delim +'FT16='+ s.eVar10;
    if(s.eVar11)   FT  = FT + delim +'FT17='+ s.eVar11;
    if(s.eVar24)   FT  = FT + delim +'FT18='+ s.eVar24;
    if(s.state)    FT  = FT + delim +'FT19='+ s.state;
    if(s.zip)      FT  = FT + delim +'FT20='+ s.zip;
	if(s.eVar17)   FT  = FT + delim +'FT21='+ s.eVar17;
	if(s.eVar1)    FT  = FT + delim +'FT22='+ s.eVar1;
	if(s.prop25)   FT  = FT + delim +'FT23='+ s.prop25;
	
	var del =";";
	if(s.prop58){
		FT = FT + delim +'FT24='+ s.prop58 + delim;
		del ="";
	}
    /*New variable Creation 'u9' This will hold all the values starting from FT1 thru F21*/
    var u = 'u9=' + FT;
    
    /* Replace the repl UDF with replace function of JS */
    u = replaceAll(u,';','~');
    u = replaceAll(u,',','^');
    
    /*Replacing the Delimeter 'delim='%$&'' by (;)*/
    u = replaceAll(u,delim,';');
    
    /*Set System Environment Variable*/
    //dfaParams= u + 'u20=DEV';   
    dfaParams= u + dfa_environment;
    
    if(dfaParams){
        var axel=Math.random()+'';
        var n=axel*10000000000000;
        var protocol=window.location.protocol;
        var omtrdfaURL=protocol+'//383639.fls.doubleclick.net/activityi;src=383639;type=dltadobe;cat=dfaplug;'+dfaParams+';ord='+n+'?'; 
        var createIframe=document.createElement('iframe');
        createIframe.setAttribute('src',omtrdfaURL);
        createIframe.setAttribute('width','1');
        createIframe.setAttribute('height','1');
        createIframe.setAttribute('frameborder','0');
        createIframe.setAttribute('style','display:none');
    document.getElementsByTagName('body')[0].appendChild(createIframe);
    }
}
function replaceAll(str, src, dst) {

    while (str.indexOf(src) !== -1) {
        str = str.replace(src, dst);
    }
    return str;
}
/*
* Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
*/
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
* Plugin: getTimeToComplete 0.4 - return the time from start to stop
*/
s.getTimeToComplete=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");

/*
 *  Plug-in: manageQueryParam v1.2 - Manages query string parameters
 *  by either encoding, swapping, or both encoding and swapping a value. 
 */                                                                                       
s.manageQueryParam=new Function("p","w","e","u",""
+"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
+"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
+",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
+"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
+"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
+";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
+";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
+"p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
+"f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
+"?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
+"(qp)qs='?'+qp;return u+qs;"); 

/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * Plugin Utility: s.join: 1.0
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

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
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: getQueryParamNoEncode - return non-encoded query string parameter(s)
 */
s.getQueryParamNoEncode=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpvne(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpvne=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvfne',k)}return v");
s.p_gvfne=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return v;"
+"}return ''");


/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");



/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");

/*
 * Plugin: getValOnce_v1.1
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
 * Plugin: getTimeParting 3.1 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,B,C,D,U,W,X,Y,Z;d=new Date();A=d.getFullYear();if(A="
+"='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A=='2013'){B="
+"'10';C='03'}if(A=='2014'){B='09';C='02'}if(A=='2015'){B='08';C='01'"
+"}if(A=='2016'){B='13';C='06'}if(A=='2017'){B='12';C='05'}if(!B||!C)"
+"{B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000"
+"');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}el"
+"se{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date"
+"();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*"
+"60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','We"
+"dnesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinu"
+"tes();if(C<10){C='0'+C};D=W.getDay();Z=X[D];U='AM';A='weekday';X='0"
+"0';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6|"
+"|D==0){A='weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availabl"
+"e'}else{if(t){if(t=='h'){return W}if(t=='m'){return B+':'+C+' '+U}i"
+"f(t=='d'){return Z}if(t=='w'){return A}if(t=='f'){return B+':'+C+' "
+"'+U+' - '+Z}}else{return Z+', '+W}}}");
/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

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
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * channelManager v2.45 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+"?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+"Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+"nalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m+"
+"+){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf("
+"'//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r)"
+";t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchE"
+"ngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s."
+"repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;"
+"i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length"
+";G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1)"
+"{N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo'"
+");N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k"
+"++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!"
+"O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';el"
+"se P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&"
+"!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.g"
+"etValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k."
+"length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r"
+".length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if"
+"(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k"
+".length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S="
+"r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s"
+"._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m"
+"++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;"
+"T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H"
+"==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';"
+"t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?"
+"P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID="
+"O;s._campaign=u;s._keywords=M;s._channel=P;");
/* non-custom list */
s.seList="search.aol.com,search.aol.ca|query,q|AOL.com Search>ask.com"
+",ask.co.uk|ask,q|Ask Jeeves>google.co,googlesyndication.com|q,as_q|"
+"Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as_q"
+"|Google - Australia>google.be|q,as_q|Google - Belgium>google.com.br"
+"|q,as_q|Google - Brasil>google.ca|q,as_q|Google - Canada>google.cl|"
+"q,as_q|Google - Chile>google.cn|q,as_q|Google - China>google.com.co"
+"|q,as_q|Google - Colombia>google.dk|q,as_q|Google - Denmark>google."
+"com.do|q,as_q|Google - Dominican Republic>google.fi|q,as_q|Google -"
+" Finland>google.fr|q,as_q|Google - France>google.de|q,as_q|Google -"
+" Germany>google.gr|q,as_q|Google - Greece>google.com.hk|q,as_q|Goog"
+"le - Hong Kong>google.co.in|q,as_q|Google - India>google.co.id|q,as"
+"_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google.co.i"
+"l|q,as_q|Google - Israel>google.it|q,as_q|Google - Italy>google.co."
+"jp|q,as_q|Google - Japan>google.com.my|q,as_q|Google - Malaysia>goo"
+"gle.com.mx|q,as_q|Google - Mexico>google.nl|q,as_q|Google - Netherl"
+"ands>google.co.nz|q,as_q|Google - New Zealand>google.com.pk|q,as_q|"
+"Google - Pakistan>google.com.pe|q,as_q|Google - Peru>google.com.ph|"
+"q,as_q|Google - Philippines>google.pl|q,as_q|Google - Poland>google"
+".pt|q,as_q|Google - Portugal>google.com.pr|q,as_q|Google - Puerto R"
+"ico>google.ro|q,as_q|Google - Romania>google.com.sg|q,as_q|Google -"
+" Singapore>google.co.za|q,as_q|Google - South Africa>google.es|q,as"
+"_q|Google - Spain>google.se|q,as_q|Google - Sweden>google.ch|q,as_q"
+"|Google - Switzerland>google.co.th|q,as_q|Google - Thailand>google."
+"com.tr|q,as_q|Google - Turkey>google.co.uk|q,as_q|Google - United K"
+"ingdom>google.co.ve|q,as_q|Google - Venezuela>bing.com|q|Microsoft "
+"Bing>naver.com,search.naver.com|query|Naver>yahoo.com,search.yahoo."
+"com|p|Yahoo!>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Canada>yah"
+"oo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>sg.yahoo.com,sg.sea"
+"rch.yahoo.com|p|Yahoo! - Singapore>uk.yahoo.com,uk.search.yahoo.com"
+"|p|Yahoo! - UK and Ireland>search.cnn.com|query|CNN Web Search>sear"
+"ch.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Se"
+"arch>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Searc"
+"h";

/*
 * Function - read combined cookies v 0.36
 */
if(!s.__ccucr)
{
    s.c_rr=s.c_r;
    s.__ccucr = true;
    function c_r(k)
    {
        var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;
        if(v)return v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;
        i=c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';',i);
        m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:m));
        if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.getTime())
        {d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}return v;
    }
    s.c_r=c_r;
}
/*
 * Function - write combined cookies v 0.36
 */
if(!s.__ccucw)
{
    s.c_wr=s.c_w;
    s.__ccucw = true;
    function c_w(k,v,e)
    {
        var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,c,i,t;
        d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s.ape(k);
        pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1)
        {pv=pv.substring(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);
        i=sv.indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.indexOf(';',i)+1);
        sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime()){pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';
        pc=1;}}else{sv+=' '+k+'='+s.ape(v)+';';sc=1;}sv=sv.replace(/%00/g,'');  
        pv=pv.replace(/%00/g,'');if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t.indexOf(';')!=-1){
        var t1=parseInt(t.substring(t.indexOf('|')+1,t.indexOf(';')));
        t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn,pv,d);}
        return v==s.c_r(s.epa(k));
    }
    s.c_w=c_w;
}

/*
         * Plugin: socialPlatforms v1.0
         */
        s.socialPlatforms=new Function("a",""
        +"var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
        +"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
        +"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");
        s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|pinterest.com>Pinterest";

        /*  
         * socialAuthors v1.3
         */
        s.socialAuthors=new Function("",""
        +"var s=this,g,tco;g=s.referrer?s.referrer:document.referrer;if(g.ind"
        +"exOf('t.co/')!=-1){s.tco=escape(s.split(g,'/')[3]);s.Integrate.add("
        +"'SocialAuthor');s.Integrate.SocialAuthor.tEvar='eVar75';s.Integrate"
        +".SocialAuthor.get('search.twitter.com/search.json?var=[VAR]&"
        +"callback=s.twitterSearch&q=http%3A%2F%2Ft.co%2F'+s.tco);s.Integrate"
        +".SocialAuthor.delay();s.Integrate.SocialAuthor.setVars=function(s,p"
        +"){s[p.tEvar]=s.user;}}");
        s.twitterSearch=new Function("obj",""
        +"var s=this,txt,txtRT,txtEnd,txtAuthor;txt=obj.results[0].text;txtRT"
        +"=txt.indexOf('RT @');if(txtRT!=-1){txtEnd=txt.indexOf(' ',txtRT+4);"
        +"txtAuthor=txt.substring(txtRT+4,txtEnd);s.user=txtAuthor.replace(':"
        +"','');}else{s.user=obj.results[0].from_user;}s.Integrate.SocialAuth"
        +"or.ready();");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="delta"
s.trackingServer="metrics.delta.com"
s.trackingServerSecure="smetrics.delta.com"


/****************************** MODULES *****************************/

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"
+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m."
+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"
+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"
+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)=='s."
+"'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z)u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y}}}return u};m.get=function(u,v){var p"
+"=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p."
+"_d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=func"
+"tion(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integ"
+"rate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;"
+"if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");



