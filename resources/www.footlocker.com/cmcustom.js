/*
* DATE: 10/10/2013 - Replacing cmdatatagutils.js file with cmcustom.js
* Issue: Element tag function definition required an update from the deprecated cmCreatePageElementTag() function
*/
/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID	: required. Page ID to set on this Pageview tag
 * categoryID	: optional. Category ID to set on this Pageview tag
 * searchString	: optional. Internal search string enterred by user to reach
 *				  this page.
 *
 *
 */

function cmReadCookie(name) {
	var nameEQ=name+"=";
	var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++) {
		var c=ca[i];
		while(c.charAt(0)==' ')
			c=c.substring(1,c.length);

		if(c.indexOf(nameEQ)==0)
			return decodeURIComponent(c.substring(nameEQ.length,c.length));
	}
	return null;
}

function cmGetSiteAttribute(attr, asVar) {
	if (attr == null)
		return "";

	var fallbackCookie = true;
	var siteAttribute = "";
	if (asVar) {
		try {
			siteAttribute = eval(attr);
			fallbackCookie = false;
		}
		catch(e) {
			// we tried
		}
	}

	if (fallbackCookie)
		siteAttribute = cmReadCookie(attr.toUpperCase());

	if (siteAttribute == null)
		return "";

	return siteAttribute;
}

function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults,attributes) {
    if (pageID == null) { pageID = cmGetDefaultPageID(); }
    var cm_exAttr = new Array;
    if (attributes){
        cm_exAttr = attributes.split("-_-");
    }
    cm_exAttr.push(cmGetSiteAttribute("locale", true));
    cm_exAttr.push(cmGetSiteAttribute("track_user_p", false));
    cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"cm_exAttr",cm_exAttr]);
}
/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Format of Page ID is "PDP[: Template <productTemplate>]: <Product Name>: <Product ID>"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag 
 * productTemplate	: optional. Custom product template number on this Productview tag 
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateProductviewTag(productID, productName, categoryID, productTemplate, microsite, attributes) {
	if (productName == null) 
		productName = "";

	if (productTemplate != null && productTemplate != "")
		productTemplate = "Template " + productTemplate + ": ";
	else
		productTemplate = "";
	
	if (microsite != null && microsite != "")
		microsite += ": ";
	// first check if readCookie function isDefined needed EB mobile
	else if (typeof readCookie == 'function' && readCookie('COBRANDED') != null) {
 		var tempcobrand = unescape(readCookie('COBRANDED'));
  	 	var tempcobrandstr = tempcobrand.split('|');
 		microsite = tempcobrandstr[1];
 		microsite += ": ";	
 	}
	else
		microsite = "";

	var cm_exAttr=new Array;
	if (attributes){
		cm_exAttr=attributes.split("-_-");
	}
    	cm_exAttr.push(cmGetSiteAttribute("locale", true));
    	cm_exAttr.push(cmGetSiteAttribute("track_user_p", false));
	cmMakeTag(["tid","5","pi",microsite + "PDP: " + productTemplate + productName + ": " + productID,"pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
}

/*
 * Creates a Registration tag and/or a Newsletter tag
 *
 * customerID		: required for Registration. ID of Customer to register.
 * customerEmail	: required for Newsletters. Optional for Registration.
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 * newsletterName	: required for Newsletters. The name of the Newsletter.
 * subscribe		: required for Newsletters. Either "Y" or "N"
 *
 */
function cmCreateRegistrationTag(customerID, customerEmail, customerCity,customerState, customerZIP, newsletterName, subscribe, attributes) {
	var cm_exAttr=new Array;
	if (attributes){
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cm_exAttr",cm_exAttr]);
}
