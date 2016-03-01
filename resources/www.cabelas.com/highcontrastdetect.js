function detectHighContrast (options){
	
	var defaults = {
			divId:'jQueryHighContrastDetection',
	        image:'/assets/images/btn/headerNavigation/frontPageImages.png'
	       }
	
	var options=defaults;
	var hcdetect =$($.parseHTML('<div id="'+options.divId+'"></div>')).css({
			background:'url("'+options.image+'")',width:'0px',height:'0px'	});
	hcdetect.appendTo(document.body);
	
	if(hcdetect.css('background-image')=='none')
		return 'Y';
	else
		return 'N';
}
/*
FILE=highcontrastdetect.js
MD5=13456c4b956ec8214a3b0debf5b6f688
BUILD NUMBER=434
BUILD REVISION=RELEASE-20160217
TIMESTAMP=02/18/2016 at 09:24:03 MST
*/