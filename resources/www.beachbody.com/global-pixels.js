// JavaScript Document
// Tealium JS
// condition is set so that the tealium code is not fired within the admin.
if(window.location.pathname !='/display.do' && window.location.pathname.indexOf('/admin/')<0){

	var site = document.domain,
	environment = [
   		{'name' : 'staging', 'env': 'bbcan-v142-staging.aws.marketlive.com', 'tc' : 'qa'},
		{'name' : 'production', 'env': 'beachbody.ca', 'tc' : 'prod'}],
		xChannel = 'dev',
		rightSite = site;

	for(var tChannel in environment){ 
		if(site.indexOf(environment[tChannel]['env']) >= 0){
          xChannel = environment[tChannel]['tc']; 
		   rightSite = environment[tChannel]['env'];
		}
	}
	
	(function(a,b,c,d){
		a='//tags.tiqcdn.com/utag/beachbody/bbca/'+ xChannel +'/utag.js';
		b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
		a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
	})();
	
	document.domain = rightSite;
}
//End Tealium JS

function logLink(linkname){
   try {	

	if(window.bFireLogLink == undefined || window.bFireLogLink){
		utag.link({ link_name : linkname, is_mobile : isMobile() });
	}

   }
	catch (e) {
   }
}