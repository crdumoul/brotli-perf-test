

//

'use strict';

var AHP = AHP || {};

AHP.isContentLoaded = false;
AHP.softLaunch = false;
AHP.currentTimeDate = null;
try {
	var timestamp = Date.parse('03/01/2016 19:38:27 GMT');
	if ( isNaN( timestamp ) === true ) {
		timestamp = Date.parse('03/01/2016 05:29:32 MST');
	}
	AHP.currentTimeDate = new Date(timestamp);
} catch (e) {
	AHP.currentTimeDate = new Date();
}

AHP.data = AHP.data || {};
AHP.data.heroTakeover = AHP.data.heroTakeover || {};
AHP.data.hero = AHP.data.hero || {};
try{
	var UN_M = "";
	AHP.data.urgentNotice = {
		m: UN_M
	}
	var HP_UN_M = "Internet Explorer 9<sup>&#174;</sup> and earlier versions are no longer supported by American Express. <a href=\"http://windows.microsoft.com/en-us/internet-explorer/download-ie\" title=\"Upgrade your browser\">Upgrade your browser</a> to avoid issues with viewing and managing your account online.";
} catch(e) {}

try {
	AHP.data.heroDefault = 40101;AHP.data.heroTakeover.id = "40109";AHP.data.heroTakeover.dts = "11/28/2015 00:00:00 MST";AHP.data.heroTakeover.dte = "11/28/2015 23:59:59 MST";AHP.data.heroes = {
	 "list": [
		{
			"id":"40126"
			,"filter":"cm,pr"
			,"dts":"02/26/2016 00:00:00 MST"
			,"dte":"04/24/2016 23:59:00 MST"
		}
		, {
			"id":"40125"
			,"filter":"cm"
			,"dts":"02/29/2016 00:00:00 MST"
			,"dte":"03/31/2016 23:59:00 MST"
		}
		, {
			"id":"40121"
			,"filter":"po"
			,"dts":"01/08/2016 00:00:00 MST"
			,"dte":"03/06/2016 23:59:00 MST"
		}
	]
};


} catch(e) {}

