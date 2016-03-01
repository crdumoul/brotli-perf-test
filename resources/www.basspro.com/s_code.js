/* SiteCatalyst code version: H.26.2
Copyright 1996-2012 Adobe, Inc. 
All Rights Reserved More info available at http://www.omniture.com */

var s_account='bpsbassprodev';
if(document.URL.indexOf('.basspro.com')>-1||document.URL.indexOf('basspro.custhelp.com')>-1)
	s_account='bpsbassproprod';
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
// You may add or alter any code config here.
s.charSet="ISO-8859-1"
// Conversion Config 
s.currencyCode="USD"
// Link Tracking Config
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,www.onlinepressroom.net/basspro/,www.unclebucksfishbowlandgrill.com/,www.basspro-shops.com/servlet/catalog.OnlineShopping,www.outdoorsite.com/knots/knot1.cfm,www.bassprophotosupport.com/,www.basspro-shops.com/servlet/catalog.CFPage,www.basspro-shops.com/servlet/catalog.QuickCatalog,www.outdoorsite.com/knots/knot7.cfm,ssl.basspro-shops.com/catalog_request/index.cfm,basspro.richfx.com.edgesuite.net/presentation/media/holiday_guide_tab/,outdoorsite.com/knots/knot1.cfm,www.basspro.ca/homepage.html,custhelp.com,basspro.com,basspro.net,recs.richrelevance.com,.nitro.com,.tahoe-boats.com,.mako-boats.com,.tahoesportboats.com,.ar-g.com,.outdoorworld.com,paypal.com,regencyboats.com,tmgpontoonboats.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

// Do not change tracking server settings
s.dc="122"
s.visitorNamespace="bassproshops"
s.visitorMigrationKey="508193D7"
s.trackingServer='omni.basspro.com';
s.trackingServerSecure='omnis.basspro.com';

// Marketing Channels
s._channelDomain='Social Networks|facebook.com,linkedin.com,twitter.com,orkut.com,friendster.com,livejournal.com,blogspot.com,wordpress.com,friendfeed.com,myspace.com,digg.com,reddit.com'
+'stumbleupon.com,twine.com,yelp.com,mixx.com,delicious.com,tumblr.com,disqus.com,intensedebate.com,plurk.com,slideshare.net,backtype.com,netvibes.com,mister-wong.com,'
+'diigo.com,flixster.com,youtube.com,vimeo.com,12seconds.tv,zooomr.com,identi.ca,jaiku.com,flickr.com,imeem.com,dailymotion.com,photobucket.com,fotolog.com,smugmug.com,'
+'classmates.com,myyearbook.com,mylife.com,tagged.com,brightkite.com,ning.com,bebo.com,hi5.com,yuku.com,cafemom.com,xanga.com,plus.google.com,pinterest.com>Bass Pro Blogs|blogs.basspro.com>';
s._channelParameter='Paid Search|sst,affcode_c>Email|om_mid>Affiliate|hvarAID>Partner Sites|cm_ven';

s.enableVideoTracking=true;
if(s.enableVideoTracking){
s.loadModule("Media")
s.Media.autoTrack=false;
s.Media.trackWhilePlaying=true;
s.Media.trackVars="events,eVar53,eVar54,eVar56,products";
s.Media.trackEvents="event44,event45,event46";
s.Media.trackMilestones="25,50,75";
s.Media.segmentByMilestones = true;
s.Media.trackUsingContextData = true;
s.Media.contextDataMapping = {
  "a.media.name":"eVar53",
  "a.media.segment":"eVar54",
  "a.media.view":"event44",
  "a.media.segmentView":"event45",
  "a.media.complete":"event46"

};
 
 s.Media.monitor = function (s,media) {
	if (media.event == "MILESTONE") {
	if(s.products)s.products=s.products;
	s.Media.track(media.name);
	};
	if (media.event == "CLOSE") {
	if(s.products)s.products=s.products;
	s.Media.track(media.name);
	}; 
 }
}

/* Correct pageURL to remove krypto params */
var friendlyURLReferrer = document.referrer;

try
{
	if(!s.pageURL)
		s.pageURL = window.location.href;
	s.pageURL = trimKryptoFromURL(s.pageURL);
	friendlyURLReferrer = trimKryptoFromURL(friendlyURLReferrer);
}
catch(ignore)
{}

function trimKryptoFromURL(kryptoURL)
{
	try
	{
		var indexKrypto = kryptoURL.indexOf('krypto=');
		if(indexKrypto > 1)
		{
			var indexAfterKrypto = kryptoURL.indexOf('&', indexKrypto);
			if(indexAfterKrypto != -1 && kryptoURL.length > indexAfterKrypto)
				kryptoURL = kryptoURL.substring(0, (indexKrypto-1))+kryptoURL.substring(indexAfterKrypto, kryptoURL.length);
			else
				kryptoURL = kryptoURL.substring(0, (indexKrypto-1));
		}
	}
	catch(ignore)
	{}
	return kryptoURL;
}

// Setup Clickmap
function s_getObjectID(o) 
{
	var ID=o.href;
	return ID;
}
s.getObjectID=s_getObjectID;

//get loadtime
s_getLoadTime()

/* Plugin Config */
s.usePlugins = true;
function s_doPlugins(s) 
{

	// Determine Bounce Rate for all visits
	s.visitstart=s.getVisitStart('s_vs');
	if(s.visitstart&&s.visitstart==1)
		s.firstPage='firstpage';
	s.clickPast(s.firstPage,'event39','event40');
	
	s.eVar31= s.bpsGrabURL();
	
	// Bass Pro Shops Blogs Keyword Referrer Evaluation Script
	var a = document.referrer;
	var b = "http://blogs.basspro.com/";
	if (a.indexOf(b) != -1)
		s.eVar33 = document.referrer;
	
	// Campaign tracking codes
	if (!s.campaign)
	{
		s.campaign = s.getQueryParam('om_mmc,om_mid');
		s.eVar26 = s.campaign;
		s.eVar27 = s.campaign;
		s.eVar28 = s.campaign;
	}

	// Internal Campaigns
    if (s.getQueryParam('cm_sp')) {
                s.eVar2=s.getQueryParam('cm_sp');
                s.eVar34=s.eVar2;
    }
    
    // Drop Down Nav tagging
    if (s.getQueryParam('ddnv')) {
		s.eVar37=s.getQueryParam('ddnv');
		s.eVar38=s.eVar37;
        s.prop30=s.eVar37;
	}

	
	// Automate Search Keyword Variables and Events
	if(s.prop1)
	{
		s.prop1=replaceChars(s.prop1);
		if(s.prop15)
			s.prop15=replaceChars(s.prop15);
		s.eVar1=s.prop1;
		s.events=s.apl(s.events,'event1',',',2);
		if(s.prop3&&(s.prop3=='0'||s.prop3=='zero'))
		{
			s.prop3='zero';
			s.events=s.apl(s.events,'event2',',',2);
		}
	}
	// Do not refire search event if the same search term passed in twice in a row 
	var t_search=s.getValOnce(s.eVar1,'s_stv',0);
	if(t_search=='')
	{	
		var a=s.split(s.events,',');
		var e='';
		for(var i = 0; i < a.length ; i++ )
		{
			if(a[i]=='event1'||a[i]=='event2'||a[i]=='event48')
				continue;
			else
				e += a[i]?a[i]+',':a[i];
		}
		s.events=e.substring(0,e.length-1);
	}

	// Set refinement sort by
	if (s.getQueryParam('RequestData') == 'page1')
	{
		s.prop8 = "Sort by";
		switch (s.getQueryParam('ea_sortColumnName'))
		{
			case "price":
				if (s.getQueryParam('ea_sortDirection') == "asc")
					s.prop9 = "Sort by: Price: low to high";
				else
					s.prop9 = "Sort by: Price: high to low";
				break;
			case "":
				s.prop9 = "Relevancy";
				break;
		}
	} 

	// Automate Custom ProdView Event
	if(s.events&&s.events.indexOf('prodView')>-1)
	{
		if(s.events.indexOf(';prodView;event3')>-1)
			s.events=s.repl(s.events,';',',');
		else
			s.events=s.apl(s.events,'event3',',',2);
		if(s.events.indexOf(',')==0)
			s.events=s.events.substring(1);
	}	

	// Determine Search Location, Add-to-Cart Location and Percentage of Page Viewed via previous page name
	s.prop22=s.getPreviousValue(s.pageName,'gpv','');
	if(s.events&&s.events.indexOf('scAdd')>-1)
	{
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar49',',',2);
		if(s.prop22)
			s.eVar49=s.prop22;
	}
	if(s.prop22)
		s.prop23=s.getPercentPageViewed();

		// Get cross-sell information	
	var tempVal = s.getQueryParam('cmCat');
	if (tempVal.match('CROSSSELL')){
		s.eVar51 = s.getQueryParam('cmCat');
	}
	if (tempVal.match('Spotlight_')){
		s.eVar59 = s.getQueryParam('cmCat').slice(10);
	}

	if(!s.eVar3){
	s.eVar3=s.getQueryParam('omFTD');
	s.eVar3=s.eVar3.toLowerCase();
	}
	
	// Channel manager plugin 
	s.channelManager('cm_ven,hvarAID,sst,affcode_c,om_mid,cm_mmc','','cmgvo','','s_dl');
	if(s._channel&&!s.eVar41)
	{
		s.mailRef=s._referringDomain.indexOf('.mail.')
		if(s.mailRef>-1)
			s._referringDomain=s._referringDomain.substring(s.mailRef+1);
		s.eVar41=s.eVar43=s._channel;
		if(s._keywords.indexOf('+')==0)
			s._keywords=s._keywords.replace('+','  ');
		s._keywords=s.repl(s._keywords,'+',' ');
		s._keywords=s.repl(s._keywords,'  ',' +').replace(/^\s+/,"");
		switch(s.eVar41)
		{
			case 'Affiliate':
				if(s._campaignID.indexOf('shopping')>-1)
				{
					s.eVar41=s.eVar43='Comparison Shopping Engine';
					s.eVar42=s.eVar44='Comparison Shopping Engine: '+s._referringDomain;
				}
				else
					s.eVar42=s.eVar44='Affiliate: '+s._referringDomain;
				break;
			case 'Partner Sites':
				if(s._campaignID.indexOf('redirect')>-1)
				{
					s.eVar41=s.eVar43='Redirect Links';
					s.eVar42=s.eVar44='Redirect Links: '+s._campaignID+':'+s.getQueryParam('cm_cat')+':'+s.getQueryParam('cm_pla')+':'+s.getQueryParam('cm_ite');
				}
				else
					s.eVar42=s.eVar44='Partner Sites: '+s._campaignID+':'+s.getQueryParam('cm_cat')+':'+s.getQueryParam('cm_pla')+':'+s.getQueryParam('cm_ite');
				break;
			case 'Paid Search':
				s.eVar42=s.eVar44='Paid Search: '+s._partner+': '+s._keywords.toLowerCase();
				break;
			case 'Natural Search':
				s.eVar42=s.eVar44='Natural Search: '+s._partner+': '+s._keywords.toLowerCase();
				break;
			case 'Typed/Bookmarked':
				s.eVar42=s.eVar44='Typed/Bookmarked: '+s.pageName;
				break;
			case 'Other Natural Referrers':
				s.eVar42=s.eVar44='Other Natural Referrers: '+s._referringDomain;
				break;
			default:
				s.eVar42=s.eVar44=s._channel+': '+s._campaignID!='n/a'?s._campaignID:s._referringDomain;
		}
		//cross visit participation
		s.eVar45=s.crossVisitParticipation(s.eVar41,'s_ev41','90','5',' > ','',1);
		s.eVar46=s.crossVisitParticipation(s.eVar42,'s_ev42','90','5',' > ','',1);
	}
	if(s.events&&s.events.indexOf('purchase')>-1)
		s.eVar47='+1';		

	// Automate Product Finding Method eVar 
	var internalFlag = false;
	if(document.referrer)
	{
		var filters = s.split(s.linkInternalFilters,',');
		var docRef = s.split(document.referrer,'/');
		docRef = docRef[2];
		for(var f in filters)
		{
			if(docRef.indexOf(filters[f])>-1)
				internalFlag = true;
		}
	}	
	if(s.campaign)
	{	
		s.eVar3='external campaign referral';
		if(!s.eVar1){
		s.eVar1='non-search';}
		s.eVar2='non-internal campaign';
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar51='non-cross sell';
		s.eVar59='non-spotlight';		
	}
	else if(document.referrer&&!internalFlag)
	{	
		s.eVar3='external natural referral';
		if(!s.eVar1){
		s.eVar1='non-search';}
		s.eVar2='non-internal campaign';
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar51='non-cross sell';
		s.eVar59='non-spotlight';
	}	
	else if(s.eVar1&&s.eVar1!='non-search')
	{
		s.eVar3='internal keyword search';
		s.eVar2='non-internal campaign';
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar51='non-cross sell';
		s.eVar59='non-spotlight';
	}
	else if(s.eVar2&&s.eVar2!='non-internal campaign')
	{
		s.eVar3='internal campaign';
		if(!s.eVar1){
		s.eVar1='non-search';}
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar51='non-cross sell';
		s.eVar59='non-spotlight';
	}	
	else if(s.eVar51&&s.eVar51!='non-cross sell')
	{
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar51,eVar3,eVar1,eVar2,eVar4,eVar5,eVar59',',',2);
		s.eVar3='cross-sell';
		if(!s.eVar1){
		s.eVar1='non-search';}
		s.eVar2='non-internal campaign';
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar59='non-spotlight';
	}
	else if(s.eVar4&&s.eVar4!='non-browse')
	{
		s.eVar3='browse';
		if(!s.eVar1){
		s.eVar1='non-search';}
		s.eVar2='non-internal campaign';
		if(!s.eVar5)
			s.eVar5=s.eVar4
		s.eVar51='non-cross sell';
		s.eVar59='non-spotlight';
	}	
	else if(s.eVar59&&s.eVar59!='non-spotlight')
	{
		s.eVar3='spotlight';
		s.eVar1='non-search';
		s.eVar2='non-internal campaign';
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar51='non-cross sell';
	}
	else if(s.events&&s.events.indexOf('purchase')>-1)
	{	
		s.eVar3='unknown at time of purchase';
		s.eVar1=s.eVar2=s.eVar4=s.eVar5=s.eVar49=s.eVar51=s.eVar59='D=v3';
	}
	else if(s.eVar3)
	{
		s.eVar1='non-search';
		s.eVar2='non-internal campaign';
		s.eVar4='non-browse';
		s.eVar5='D=v4';
		s.eVar51='non-cross sell';
		s.eVar59='non-spotlight';
	}
	// Create nonproduct product for merchandising eVar binding 
	if(s.eVar3 && (!s.products||(s.products&&s.products.indexOf(';nonproduct')>-1)||s.newProduct=='true') && (s.p_fo('onemerch')==1||(s.linkType!=''&&s.linkTrackVars.indexOf('eVar3')>-1)))
	{
		if(!s.c_r('productnum'))
			s.productNum=1;
		else
			s.productNum=parseInt(s.c_r('productnum'))+1;
		s.products=';nonproduct' + s.productNum;
		var e=new Date();
		e.setTime(e.getTime()+(30*86400000));
		s.c_w('productnum',s.productNum,e);
		s.linkTrackVars=s.apl(s.linkTrackVars,'events,products',',',2);
		s.linkTrackEvents=s.apl(s.linkTrackEvents,'event38',',',2);
		s.events=s.apl(s.events,'event38',',',2);
	}
	if(s.eVar3&&(s.events.indexOf('prodView')>-1||s.events.indexOf('event1')>-1))
	{
		s.events=s.apl(s.events,'event38',',',2);
	}
	if(s.c_r('productnum')&&s.events.indexOf('purchase')>-1)
		s.c_w('productnum','0',0);

	if(s.eVar1&&s.eVar1!='non-search'&&s.eVar3!='internal keyword search'){
		if(t_search!=''){
		s.events=s.apl(s.events,'event48',',',2);
		}
	}
	// Genesis Integration
	if (!s.eVar14) 
		s.eVar14 = s.getQueryParam('om_rid');

	// Time parting
	var d = new Date();
	s.eVar20 = s.getTimeParting('h', '-8', d.getFullYear()); // Set hour
	s.eVar21 = s.getTimeParting('d', '-8', d.getFullYear()); // Set day
	s.eVar22 = s.getTimeParting('w', '-8', d.getFullYear()); // Set Weekend / Weekday

	// Search Center Bounce Rate
	if (s.getQueryParam('s_kwcid')) 
		s.pageURL = s.manageQueryParam('s_kwcid', 1, 1); // swap and encode for SearchCenter
	s.clickPast(s.getQueryParam('s_kwcid'), 'event31', 'event32'); 

	// BazaarVoice Integration
	s.omnitureReviews([
	{
		'source': 'omtrProducts',
		'destination': [
		{
			'type': 'standard',
			'var': 'products'
		}]
	}, {
		'source': 'avgRating',
		'destination': [
		{
			'type': 'merchEvar',
			'var': 'eVar8'
		}]
	}, {
		'source': 'totalReviewCount',
		'destination': [
		{
			'type': 'merchEvar',
			'var': 'eVar32'
		}]
	} // CODE 11022010
	]);

	// Engage with BazaarVoice - needs to be fixed
	if (s.eVar16) 
		s.eVar16 = s.crossVisitParticipation(s.eVar16, 's_bv', '30', '5', ' > ', '');

	// Campaign Stacking
	if (s.campaign) 
		s.eVar29 = s.crossVisitParticipation(s.campaign, 's_cpm', '30', '5', ' > ', '');
		
	// Determine New or Repeat Visitor
	s.eVar52=s.getNewRepeat(365);	
	
	// Campaign Stacking
	if (s.campaign) 
		s.eVar29 = s.crossVisitParticipation(s.campaign, 's_cpm', '30', '5', ' > ', '');

	// Blank out products if events isn't set so that we don't inflate prodViews
	if(s.products&&!s.events)
		s.products='';

	// Automate OrderID eVar
	if(s.purchaseID&&!s.eVar12)
		s.eVar12=s.purchaseID;
			
	// Setup Clickmap Object IDs
	s.setupDynamicObjectIDs();
	
	// Get rid of browser plugin tracking.  Not used in SC15/not needed
	s.plugins='';
	
	s.eVar57=s.prop28=s_getLoadTime();
	
	//desktop or mobile
	s.prop29=s.eVar58='desktop';
	if(document.location.host.match(/m.basspro.com/gi)!= null) {
	  s.prop29=s.eVar58='mobile';
	  if(s.getQueryParam('utm_referrer')){
	  s.referrer=s.getQueryParam('utm_referrer');
	  }
	}
	if(document.location.host.match(/t.basspro.com/gi)!= null) {
	  s.prop29=s.eVar58='tablet';
	  if(s.getQueryParam('utm_referrer')){
	  s.referrer=s.getQueryParam('utm_referrer');
	  }	  
	}
	s.linkTrackVars=s.apl(s.linkTrackVars,'eVar58,prop29',',',2);

}
s.doPlugins=s_doPlugins

// START OF S7 connection code:
s.baseCategory = "";
s.viewerFrame = "";
s.lastFrame = "";
s.viewerType = "unknown";
s.asset = "";
s.internalCounter = 0;
s.pageName = "";

function s7pullProductParam(query) {
    if (!query) return "";

    var dQuery;
    try {
        dQuery = decodeURIComponent(query);
    } catch (e) {
        dQuery = query;
    }
    var lQuery = dQuery.toLowerCase();

    var params = ["rolloverkey", "rollover_key", "p", "productkey", "pid"];
    for (var n in params) {
        var m1 = lQuery.indexOf(params[n]+'=');
        if (m1 == undefined || m1 == -1) continue;
        m1 += params[n].length + 1;

        var m2 = lQuery.indexOf("&", m1);
        lQuery = lQuery.replace("');void(0);");
        return (m2 > m1) ? dQuery.substring(m1, m2) : dQuery.substr(m1);
    }
    return "";
}

//CFS
// Video time research
// This sample code overrides the current S7track function

function s7track(eventInfo, rolloverInfo) {
    var eventValues = eventInfo.split(',');
    var eventType = eventValues[0].toString();
    var eventData = (eventValues.length > 1) ? unescape(eventValues[1].toString()) : "";

    var params = new Array();
    var paramsRaw = eventInfo.split(",");
	
    // CFS: Initialize helper object-- this should be safe because s7sdk should be initialized
    if (!s.s7help || !s.S7Helper.isInitialized) {
        s.s7help = s.S7Helper.init(eventType, eventValues);
    } else { s.s7help.log ("%0", eventInfo); }
    // END CFS

    for (var param in paramsRaw) {
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            params.push(decodeURIComponent(unescape(paramsRaw[param])));
        } else {
            params.push(decodeURIComponent(paramsRaw[param])+'');
        }
    }

    if (eventType == "SWATCH") eventType = "PAGE";
    if (eventType == "SPIN") eventType = "PAGE";
    if (eventType == "TARG") eventType = "TARGET";
    if (eventType == "RELOAD") eventType = "SWAP";

    if (eventType == "PAGE") {
        if(eventData == "0")
             s.baseCategory = "p1";
        else
             s.baseCategory = "p" + parseInt(eventData)*2 + "-" + (parseInt(eventData)*2+1);
        s.pageName = params[2];
        s.lastFrame = s.viewerFrame;
        s.viewerFrame = params[1];
    } else if (eventType == "SWAP") {
        s.lastFrame = s.viewerFrame;
        s.viewerFrame = params[1];
        if (params.length >= 2) {
            // CFS: Gets current asset name from helper function, which strips "?" query params
            // s.asset = params[2];
            s.asset = s.s7help.getAssetName();
            // End CFS
        }
    } else if (eventType == "LOAD") {
        if (params.length > 1) {
            s.viewerType = params[1];
            var assetPos = 6;//default
            if (s.viewerType == 3) assetPos = 7;
            else if (s.viewerType == 2) assetPos = 7; // Is this also video?
            else if (s.viewerType == 5) assetPos = 7;
            else if (s.viewerType < 100) assetPos = 7;
			
            if (params.length >= assetPos) {
                // CFS: Gets current asset name from helper function, which strips "?" query params
                //s.asset = params[assetPos]+'';
                s.asset = s.s7help.getAssetName();
                // End CFS
            }
        }
    }

    s.internalCounter++;
	
	console.log(eventInfo);
	
	
var mediaPlayerName = "Scene7 Player";
var mediaLength = s.s7help.getVideoLength();
var mediaName = s.asset;
if(eventType == "PAUSE"){
s.c_w('mediaOffset',parseInt(params[1]));
}
if(s.c_r('mediaOffset')){
var mediaOffset = s.c_r('mediaOffset');
mediaOffset = parseInt(mediaOffset);
}
	
function playMovie(){
	s.Media.play(mediaName,0);
}
function stopMovie(){
	s.Media.stop(mediaName,mediaLength);
}

	
	if (eventType == "PLAY"&&params[1]==0) {
		s.Media.open(mediaName,mediaLength,mediaPlayerName);
		s.eVar56=mediaLength;
		playMovie();
    }
	if (eventType == "PAUSE"&&params[1]>.5) {
		s.Media.stop(s.asset,mediaOffset);
    }
	if (eventType == "PLAY"&&mediaOffset>0) {
		s.Media.play(s.asset,mediaOffset);
    }
	if (eventType == "MILESTONE"&&params[1]==0) {
		stopMovie();
		s.Media.close(s.asset);
		s.c_w('mediaOffset',0);
    }
    
	s.internalCounter--;//only count tracked events
	
	if (eventInfo.indexOf('SPIN')!=-1&&eventInfo != "SPIN,0") {
		if(!s.c_r('spinset')||(s.c_r('spinset')&&s.c_r('spinset')!=s.products)){
		s.linkTrackVars='';
		s.linkTrackEvents='';
		s.linkTrackVars='events,products';
		s.linkTrackEvents='event49';
		s.events='event49';
		s.tl(true,'o','spin set click');
		s.c_w('spinset',s.products,0);
		}
    }
}

/**
 * Scene7 add-in
 * Extends s7track() function with data specific to HTML5 SDK 
 * The object will be instantiated the first time an event is called by the S7 viewer
 */
s.S7Helper = (function () {
    /* Private methods and properties */
    var _sdk, // reference to S7 SDK
        _currentAsset, // name of asset
        _currentItem,  // asset object
        _currentParams, // use to check if viewer has been reloaded
        _currentRegComps, // array of registered components
        _aEvent, // alias to Asset Event
        _sdkTypes,
        _videoDuration,
        _MediaSetDesc,
        _VideoDesc,
        _currentSet,
        _assetStr;
    var _doInit = function (eventType, eventValues) {
        _sdk = window.s7sdk;
        _aEvent = _sdk.event.AssetEvent;
        _MediaSetDesc = _sdk.MediaSetDesc;
        _VideoDesc = _sdk.VideoDesc;
        _currentSet = null;
        _currentRegComps = null;
        _videoDuration = "";
        _sdkTypes = {
            "VIDEO" : _sdk.ItemDescType.VIDEO,
            "VIDEO_SET" : _sdk.ItemDescType.VIDEO_SET,
            "IMG" : _sdk.ItemDescType.IMG,
            "IMAGE_SET" : _sdk.ItemDescType.IMAGE_SET,
            "SPIN_SET" : _sdk.ItemDescType.SPIN_SET,
            "MEDIA_SET" : _sdk.ItemDescType.MEDIA_SET,
            "ECAT_SET" : _sdk.ItemDescType.ECAT_SET,
            "EMPTY" : _sdk.ItemDescType.EMPTY,
            "UNKNOWN" : _sdk.ItemDescType.UNKNOWN
        };
        // init reference to sdk and component types
        s.S7Helper.log("Initializing S7Helper");
        // get current asset event info from first SWAP event and compare to current asset name
        if (eventType === "SWAP") {
            _assetStr = _decodeAsset (eventValues);    
        }
        // find (1st) instance of parameter manager and get its contents
        for (var prop in window) {
            var windowObj = window[prop];
            // look for instance of Parameter Manager, which should be in all SDK viewers
            if (windowObj instanceof _sdk.ParameterManager) {
                // store current params
                _currentParams = windowObj;
                // get references to all registered components in viewer
                _currentRegComps = _setAssetListeners (_currentParams);
                break;
            }
        }
        // overrides default s7ComponentEvent
        window.s7ComponentEvent = function (objID, compClass, instName, timeStamp, eventData) {
            s.S7Helper.log("s7ComponentEvent: %0 || %1 || %2 || %3 || %4", objID, compClass, instName, timeStamp, eventData);
            var eValues = eventData.split(','),
                eType = eValues[0],
                vType = eValues[1];
            if (eType === "LOAD") {
                // viewer has reloaded or is loading for first time
                if (vType === "s7_html5_sdk" && _currentSet !== null) {
                    // force S7Helper to reset
                    s.S7Helper.isInitialized = false;
                    s.S7Helper.log("resetting S7Helper on next event");
                // normal load event after registration
                } else if (vType === "s7_html5_sdk") {
                    _currentSet = _decodeAsset (eventValues);
                }
            } else if (eType === "SWAP") {
                _assetStr = _currentAsset = _decodeAsset(eventValues);
            }
            // now forward event data to s7track function
            s7track(eventData);     
        };
        s.S7Helper.isInitialized = true;
        return;
    };
    var _setAssetListeners = function (params) {
        /* iterate over components and look for Swatches, ZoomView, SpinView, VideoView
           and set AssetEvent listeners which will fire when the asset changes */
        var regComponents = params.getRegisteredComponents();
        // create array for registered components
        var compArray = [];
        // sets current asset based on its name
        var setAsset = function (comp) {
            if (_assetStr === comp.asset) {
                _currentAsset = comp.asset;
                _currentItem = comp.item;
            }
        };
        for (var i = 0; i < regComponents.length; i++) {
            // build case/switch based on constructor name
            var compName = _getCompName (regComponents[i]);
            switch (compName) {
                case "Swatches":
                    s.S7Helper.log("Registering: %0", compName);
                    setAsset (regComponents[i]);
                    compArray.push (regComponents[i]);
                    regComponents[i].addEventListener(_aEvent.SWATCH_SELECTED_EVENT, _onAsset, false);
                    regComponents[i].addEventListener(_sdk.event.SwatchEvent.SWATCH_PAGE_CHANGE, _onSwatch, false);
                    break;
                case "ZoomView":
                    s.S7Helper.log("Registering: %0", compName);
                    setAsset (regComponents[i]);
                    compArray.push (regComponents[i]);
                    regComponents[i].addEventListener(_aEvent.ASSET_CHANGED, _onAsset, false);
                    break;
                case "SpinView":
                    s.S7Helper.log("Registering: %0", compName);
                    setAsset (regComponents[i]);
                    compArray.push (regComponents[i]);
                    regComponents[i].addEventListener(_aEvent.ASSET_CHANGED, _onAsset, false);
                    break;
                case "MediaSet":
                    s.S7Helper.log("Registering: %0", compName);
                    compArray.push (regComponents[i]);
                    regComponents[i].addEventListener(_aEvent.NOTF_SET_PARSED, _onAsset, false);
                    break;
            }
        }
        return compArray;
    };
    var _decodeAsset = function (eventValues) {
        return unescape(eventValues[2].toString());
    };
    var _onSwatch = function (evt) {
        s.S7Helper.log("_onSwatch *%0* || Asset %2 || Asset Type: %3 || Target %1", 
            evt.type, evt.target.s7base.cl, evt.s7event.asset.name, _getCompName (evt.s7event.asset) );
    };
    var _onAsset = function (evt) {
        s.S7Helper.log("_onAsset *%0* || Asset %2 || Asset Type: %3 || Target %1", 
            evt.type, evt.target.s7base.cl, evt.s7event.asset.name, _getCompName (evt.s7event.asset) );
        _currentItem = evt.s7event.asset;
        _currentAsset = evt.s7event.asset.name;
        if (_currentItem instanceof _MediaSetDesc || _currentItem instanceof _VideoDesc) {
            _getVideoInfo (_currentItem);
        }
    };
    var _getVideoInfo = function (desc) {
        // is this a MediaSetDesc or a VideoDesc?
        var vdesc = (desc.items) ? desc.items[0] : desc;
        // parses item to get userData
        if (vdesc instanceof _VideoDesc) {
            var ud = (vdesc.userData !== undefined) ? vdesc.userData[0] : null;
            _videoDuration = (ud !== null) ? ud.Video_Length : ud;
            s.S7Helper.log ("Video Duration: %0", _videoDuration);
        }
    };
    // gets name of custom component
    var _getCompName = function (comp) {
        var name = "";
        if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
            // use regex to get constructor name for IE browsers
            var funcNameRegex = /function\s+([^(]{1,})\s*\(/;
            var results = (funcNameRegex).exec(comp.constructor.toString());
            name = (results && results.length > 1) ? results[1] : "";
        } else {
            name = comp.constructor.name;
        }
        return name;
    };
    /* Public methods and properties */
    return {
        name : "S7Helper",
        isInitialized : false,
        init : function (eventType, eventValues) {
            if (window.s7sdk) {
                _doInit(eventType, eventValues);
                return this;
            } else {
            return false;
            }
        },
        getAssetName : function () {
            // if asset contains ?, remove it
            var assetName = (_currentAsset.indexOf ("?") > 0) 
                ? (_currentAsset.split ("?")) [0] 
                : _currentAsset;
            return assetName;
        },
        getItem : function () {
            var retItem = null;
            if (_currentItem !== null) {
                retItem = _currentItem;
            }
            return retItem;
        },
        getAssetType : function () {
            var retType = "Not set.";
            if (_currentItem !== null) {
                retType = _currentItem.type;
            }
            return retType;
        },
        getImgSize : function () {
            var retSize = "Asset is not an image, or size unknown.";
            if (_currentItem.type === _sdkTypes.IMG) {
                var size = [];
                size.push(_currentItem.height);
                size.push(_currentItem.width);
                retSize = size.toString()
            }
            return retSize;
        },
        lookupType : function (type) {
            var returnType = "Asset type is unknown.";
            try {
                returnType = _sdkTypes[type];        
            }
            catch (error) {
                this.log("asset unknown: %0", type);
            }   
            return returnType;
        },
        getVideoLength : function () {
            var retDuration = "Video length not set.";
            if (_videoDuration !== "") {
                retDuration = _videoDuration;
            }
            return retDuration;
        },
        // directs log output to viewer logger
        log : function () {
            // convert arguments to array
            var args = Array.prototype.slice.call(arguments);
            args[0] = "S7Helper: " + args[0];
            args.unshift (_sdk.Logger.INFO);
            _sdk.Logger.log.apply(this, args);
        }
    }
   
}());
//END CFS
// END S7 Connection code. 

/************************** PLUGINS SECTION *************************/

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) 
				c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function replaceChars(string)
{
	var tString = (escape(string));
	var nString = tString.replace(/%09/gi, "");
	var fString = (unescape(nString));
	return fString;
}

/*
 * Copyright 2011-2013 Adobe Systems, Inc.
 * s_getLoadTime v1.36 - Get page load time in units of 1/10 seconds
 */
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}

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
 *	Plug-in: manageQueryParam v1.2 - Manages query string parameters
 *	by either encoding, swapping, or both encoding and swapping a value.
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
 * Plugin: getTimeParting 2.1 
 */
s.getTimeParting=new Function("t","z","y","l","j",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(j=='1'){if(C>15){X='15'}if(C>30){X='30'}if(C"
+">45){X='45'}}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6||D==0)"
+"{A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Available'}els"
+"e{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){return A"
+"}}else{return Z+', '+W}}}");

/*
 * Plugin: getPercentPageViewed v1.5
 */
s.handlePPVevents=new Function("",""
+"var s=s_c_il["+s._in+"];if(!s.getPPVid)return;var dh=Math.max(Math."
+"max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.ma"
+"x(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max("
+"s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.i"
+"nnerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeigh"
+"t),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s"
+".wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh"
+"*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[]"
+",id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt"
+"(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?pars"
+"eInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy"
+")?vh:cy)):'';s.c_w('s_ppv',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 

/*                                                                  
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");

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
 * Plugin: getValOnce_v1.11
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
 * Plugin Utility - first only
 */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/* Bass Pro-specific plugins */
s.bpsGrabURL=new Function("a",""
+"var s=this,a;if(s.pageName=='Untagged Page'){a='D=g';return a;}");
s.bpsParseURL=new Function("",""
+"var c=friendlyURLReferrer;var b;b=s.split(c,'/');if(!b[7]){return b[4"
+"];}else{return b[4]+'>'+b[7];}");

/*
 * channelManager v2.7 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,g=new Date,h=0,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D"
+",E,F,G,H,I,J,K,L,M,N,O,P,Q,R;g.setTime(g.getTime()+1800000);if(e){h"
+"=1;if(s.c_r(e))h=0;if(!s.c_w(e,1,g))s.c_w(e,1,0);if(!s.c_r(e))h=0;}"
+"i=s.referrer?s.referrer:document.referrer;i=i.toLowerCase();if(!i)j"
+"=1;else {k=i.indexOf('?')>-1?i.indexOf('?'):i.length;l=i.substring("
+"0,k);m=s.split(i,'/');n=m[2].toLowerCase();o=s.linkInternalFilters."
+"toLowerCase();o=s.split(o,',');for(p=0;p<o.length;p++){q=n.indexOf("
+"o[p])==-1?'':i;if(q)break;}}if(!q&&!j){r=i;t=u=n;v='Other Natural R"
+"eferrers';w=s.seList+'>'+s._extraSearchEngines;if(d==1){l=s.repl(l,"
+"'oogle','%');l=s.repl(l,'ahoo','^');i=s.repl(i,'as_q','*');}x=s.spl"
+"it(w,'>');for(y=0;y<x.length;y++){z=x[y];z=s.split(z,'|');A=s.split"
+"(z[0],',');for(B=0;B<A.length;B++){C=l.indexOf(A[B]);if(C>-1){if(z["
+"2])D=u=z[2];else D=n;if(d==1){D=s.repl(D,'#',' - ');i=s.repl(i,'*',"
+"'as_q');D=s.repl(D,'^','ahoo');D=s.repl(D,'%','oogle');}E=s.split(z"
+"[1],',');for(F=0;F<E.length;F++){if(i.indexOf(E[F]+'=')>-1||i.index"
+"Of('https://www.google.')==0)G=1;H=s.getQueryParam(E[F],'',i).toLow"
+"erCase();if(G||H)break;}}if(G||H)break;}if(G||H)break;}}if(!q||f!='"
+"1'){q=s.getQueryParam(a,b);if(q){u=q;if(D)v='Paid Search';else v='U"
+"nknown Paid Channel';}if(!q&&D){u=D;v='Natural Search';}}if(j==1&&!"
+"q&&h==1)r=t=u=v='Typed/Bookmarked';I=s._channelDomain;if(I&&n){J=s."
+"split(I,'>');for(K=0;K<J.length;K++){L=s.split(J[K],'|');M=s.split("
+"L[1],',');N=M.length;for(O=0;O<N;O++){P=M[O].toLowerCase();Q=n.inde"
+"xOf(P);if(Q>-1){v=L[0];break;}}if(Q>-1)break;}}I=s._channelParamete"
+"r;if(I){J=s.split(I,'>');for(K=0;K<J.length;K++){L=s.split(J[K],'|'"
+");M=s.split(L[1],',');N=M.length;for(O=0;O<N;O++){Q=s.getQueryParam"
+"(M[O]);if(Q){v=L[0];break;}}if(Q)break;}}I=s._channelPattern;if(I){"
+"J=s.split(I,'>');for(K=0;K<J.length;K++){L=s.split(J[K],'|');M=s.sp"
+"lit(L[1],',');N=M.length;for(O=0;O<N;O++){P=M[O].toLowerCase();Q=q."
+"toLowerCase();R=Q.indexOf(P);if(R==0){v=L[0];break;}}if(R==0)break;"
+"}}S=v?q+t+v+H:'';c=c?c:'c_m';if(c!='0')S=s.getValOnce(S,c,0);if(S){"
+"s._campaignID=q?q:'n/a';s._referrer=r?r:'n/a';s._referringDomain=t?"
+"t:'n/a';s._campaign=u?u:'n/a';s._channel=v?v:'n/a';s._partner=D?D:'"
+"n/a';s._keywords=G?H?H:'Keyword Unavailable':'n/a';}");
/* Top 130 - Grouped */
s.seList="google.,googlesyndication.com|q,as_q|Google>yahoo.com,yahoo"
+".co.jp|p,va|Yahoo!>bing.com|q|Bing>altavista.co,altavista.de|q,r|Al"
+"taVista>.aol.,suche.aolsvc.de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>w"
+"ww.baidu.com|wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|i"
+"cq>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|N"
+"aver>netscape.com|query,search|Netscape Search>reference.com|q|Refe"
+"rence.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www."
+"tiscali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text"
+"|Yandex.ru>search.cnn.com|query|CNN Web Search>search.earthlink.net"
+"|q|Earthlink Search>search.comcast.net|q|Comcast Search>search.rr.c"
+"om|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length; q++){z=a"
+"rry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\", '');"
+"arry[q] = s.split(z, ',');}}var e=new Date();e.setFullYear(e.getFul"
+"lYear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry["
+"arry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,n"
+"ew Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;va"
+"r td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.ro"
+"und((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(a"
+"rry[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{de"
+"lim:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.jo"
+"in(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * DynamicObjectIDs v1.5: Setup Dynamic Object IDs based on URL
 */
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

/*
 * Plugin: omnitureReviews 0.9a
 */
s.omnitureReviews=new Function("p",""
+"if(typeof(omnitureReview)!='undefined'&&typeof(this.__orSent)=='undefined'){var p"
+"o=omnitureReview,s=this;var ajc=po.ajaxCatch,nltv='',nlte='';for(var k=0;k<p.le"
+"ngth;k++){var _o=p[k];var _da=_o['destination'];for(var j=0;j<_da.length;j++){var "
+"_d=_da[j];var _var=_d['var'];var _val=po[_o['source']];if(typeof(_val)!='undefined'){i"
+"f(_d.type=='standard'){s[_var]=_val;if(ajc){nltv+=_var+',';}}else if(_d.type=='"
+"counterEvent'){s.events=(s['events']?s['events']+',':'')+_var;if(ajc){nlte+=_var+',';"
+"if(nltv.indexOf('events')<0){nltv+='events,';}}}else if(_d.type=='numericEvent'"
+"||_d.type=='merchEvar'){if(s['products']){var _p='',pd=this.split(s['products'],',')"
+";var ie=_d.type=='numericEvent'?_var+'='+_val:'',me=_d.type=='merchEvar'?_var.t"
+"oLowerCase()+'='+_val:'';for(i=0;i<pd.length;i++){var pt=this.split(pd[i],';')"
+";var l=pt.length;_p+=(_p?',':'')+(l>0?pt[0]:'')+';'+(l>1?pt[1]:'')+';'+(l>2?pt["
+"2]:'')+';'+(l>3?pt[3]:'')+';'+(l>4?pt[4]?this.__orSent?ie:pt[4]+(ie?'|'+ie:''):"
+"ie:ie)+';'+(l>5?pt[5]?this.__orSent?me:pt[5]+(me?'|'+me:''):me:me);}s.products="
+"_p;}else {s.products=';;;;'+ie+';'+me;}if(ie){s.events=(s['events']?s['events']+',':'"
+"')+_var;}if(ajc){if(ie){nlte+=_var+',';if(nltv.indexOf('events')<0){nltv+='even"
+"ts,';}}else {nltv+=_var+',';}}}}}}this.__orSent=true;if(ajc){s.linkTrackVars=nl"
+"tv;s.linkTrackEvents=nlte;}}");

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";
s.m_i("Media");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.26.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!"
+"s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e"
+".getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'"
+"+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,"
+"l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='ht"
+"tps://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l="
+"',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'"
+"+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextDat"
+"a\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(n"
+"fn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){n"
+"k=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLi"
+"ghtData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(s"
+"p=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return "
+"qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe"
+"=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if"
+"(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv|"
+"|fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>25"
+"5){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if("
+"k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){"
+"q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';e"
+"lse if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else"
+" if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';el"
+"se if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextDa"
+"ta'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProf"
+"ileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if"
+"(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return "
+"qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substr"
+"ing(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.li"
+"nkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tra"
+"ckExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new F"
+"unction('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if"
+"(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,"
+"a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;retu"
+"rn}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.t"
+"agName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.targ"
+"et.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEv"
+"ent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e"
+".altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preven"
+"tDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>"
+"k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.subst"
+"ring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t=''"
+";if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.pr"
+"otocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');"
+"x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s"
+"_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un."
+"indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','r"
+"q',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;"
+"return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object."
+"prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'"
+"='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.oncl"
+"ick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.i"
+"smac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('F"
+"irefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function"
+"(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))ret"
+"urn 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring"
+"(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCas"
+"e();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa"
+"=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.s"
+"ubstring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd"
+".s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r"
+"=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_i"
+"l['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m"
+"=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_"
+"'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m"
+"[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var "
+"s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){"
+"i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'ht"
+"tp:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e"
+"?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','va"
+"r e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i"
+"=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]="
+"o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData"
+"\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il"
+"['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s."
+"dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dl"
+"l.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;"
+"i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e)"
+")fid=0;return fid};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+se"
+"d,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,"
+"q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y"
+"':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach"
+"){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8."
+"2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth"
+";bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeig"
+"ht;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var "
+"e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexO"
+"f(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}i"
+"f(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l"
+";if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!"
+"n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('"
+".s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h)"
+";if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.da"
+"taset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking"
+"){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(o"
+"cb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt("
+"oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('obje"
+"ctID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if"
+"(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles="
+"''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkNam"
+"e=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lig"
+"htProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t"
+".tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]"
+"){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y"
+"[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLower"
+"Case().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape"
+"6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscap"
+"e');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.n"
+"s6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4"
+"%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet"
+",visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfile"
+"s,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';"
+"s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;"
+"s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,jav"
+"aEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingS"
+"erverBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLi"
+"nks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.v"
+"l_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=functi"
+"on(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
