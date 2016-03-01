/*
 * cmdatatagutils.js
 * $Id: cmdatatagutils-10011390-90007517-022610.txt 139864 2010-02-26 14:59:55Z wbird $
 * $Revision: 139864 $
 *
 * Coremetrics Tag v3.1, 2/28/2002
 * COPYRIGHT 1999-2002 COREMETRICS, INC.
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 * Date				IE						Desc
 * 7/31/09			Hutch White	Update cmdatatagutils to move client variables from eluminate
 * 2/26/10			WBIRD		 Added non-maketag cmCreateManualImpressionTag
 * 2/03/11			YHUNT		 Update to support new test system per ticket 10060473
 */
var cm_ClientID=cm_rhconfig_testing_id;

var cm_TrackLink = "A";
var cm_TrackImpressions = "RS";
var cm_HOST = "testdata.coremetrics.com/cm?";
//
// The following code installs a custom normalization function.
// You must implement this function for link tracking to function properly!
//

// this line seems silly but it's necessary to conditionally declare the var
if (defaultNormalize == null) {
  var defaultNormalize = null;
}

function myNormalizeURL(url, isHref) {
  var newURL = url;
  if (isHref) {
    var blackList = ["jsessionid=", "navAction=", "navCount="];
    var paramString;
    var sessionIndex = newURL.indexOf(";");
    var paramIndex = newURL.indexOf("?");
    var params;
    var keepParams = new Array();
    var goodParam;
    if (paramIndex > 0) {
      paramString = newURL.substring(paramIndex+1);
      newURL = newURL.substring(0, sessionIndex);
      params = paramString.split("&");
      for (var i = 0; i < params.length; i++) {
	goodParam = true;
	for (var j = 0; j < blackList.length; j++) {
	  if (params[i].indexOf(blackList[j]) == 0) {
	    goodParam = false;
	  }
	}
	if (goodParam == true) {
	  keepParams[keepParams.length] = params[i];
	}
      }
      newURL += "?" + keepParams.join("&");
    }
    if (paramIndex <= 0) {
      newURL = newURL.substring(0, sessionIndex);
    }
    if (defaultNormalize != null) {
      newURL = defaultNormalize(newURL, isHref);
    }
  }
  return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
  var func = "" + document.cmTagCtl.normalizeURL;
  if (func.indexOf('myNormalizeURL') == -1) {
    defaultNormalize = document.cmTagCtl.normalizeURL;
    document.cmTagCtl.normalizeURL = myNormalizeURL;
  }
}

//install cm_lm parameter checking

function cmIndexOfParameter (parameter) {
	return document.URL.indexOf(parameter);
}

function cmCheckCMLM() {
	if (cmIndexOfParameter("cm_lm") != -1){

		var s = document.URL;
		var begin = s.indexOf("cm_lm");
		var end = s.indexOf("&", begin);
		if (end == -1) {
			end = s.length;
		}
		var middle = s.indexOf("=", begin);

		var emailAddress = s.substring(middle + 1, end);

		if (emailAddress.indexOf(":") != -1){
			var tempArray = emailAddress.split(":");
			emailAddress = tempArray[1];
		}

		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

// TAG GENERATING FUNCTIONS ----------------------------------------------------

/*
 * Calling this function points tags to the production database
 */
function cmSetProduction() {
	cm_ClientID=cm_rhconfig_production_id;
  cm_HOST = "cimg-1.restorationhardware.com/cm?";
}

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		var cm = new _cm("tid","9","vn2","e4.0");
		cm.pi = pageID;
		cm.cm_sp = trackSP;
		cm.cm_re = trackRE;
		cm.st = cm_ClientTS;
		cm.writeImg();
}

/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID       : required. Page ID to set on this Pageview tag
 * searchString : optional. Internal search string enterred by user to reach
 *                this page.
 * categoryID   : optional. Category ID to set on this Pageview tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreatePageviewTag(pageID, searchString, categoryID, numResults) {
  if (pageID) {
    var cm = new _cm("tid", "1", "vn2", "e3.1");
    cm.pi = pageID;
    if (searchString) {
      cm.se = searchString;
    }
	if (numResults)	{
		cm.sr = numResults;
	}
    if (categoryID) {
      cm.cg = categoryID;
    }
    // if available, override the referrer with the frameset referrer
    if (parent.cm_ref != null) {
      cm.rf = parent.cm_ref;
      parent.cm_ref = document.URL;
    }

	cmCheckCMLM();

    cm.writeImg();
  }
}

/*
 * Creates a Pageview tag appropriate for category pages.
 * Format of Page ID is "CATEGORY: <category Name> (<category ID>) <PAGE x>"
 *
 * categoryID   : required. Category ID to set on this Pageview tag and in
 *                the Page ID.
 * categoryName : required. Category Name to set on this Pageview tag and in
 *                the Page ID.
 * pageNumber   : optional. If appropriate, the current page number for this
 *                category.  Only page numbers greater than "1" will be
 *                added to the Page ID.
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateCategoryPageviewTag(categoryID, categoryName, pageNumber) {
  if (categoryID && categoryName) {
    if (pageNumber && (pageNumber != "") && (pageNumber != "1")) {
      cmCreatePageviewTag("CATEGORY: " + categoryName + " (" + categoryID + ")" + " PAGE " + pageNumber, null, categoryID);
    }
    else {
      cmCreatePageviewTag("CATEGORY: " + categoryName + " (" + categoryID + ")", null, categoryID);
    }
  }
}

/*
 * Creates a Tech Props tag.
 * pageID       : required. Page ID to set on this Pageview tag
 */
function cmCreateTechPropsTag(pageID) {
  if (pageID) {
    var cm = new _cm("tid", "6", "vn2", "e3.1");
    cm.pc = "Y";
    cm.pi = pageID;
    // if available, override the referrer with the frameset referrer
    if (parent.cm_ref != null) {
      cm.rf = parent.cm_ref;
      parent.cm_ref = document.URL;
    }
    cm.addTP();

	cmCheckCMLM();

    cm.writeImg();
  }
}

/*
 * Creates a Pageview tag with the default value for Page ID.
 * Format of Page ID is "x/y/z/MyPage.asp"
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateDefaultPageviewTag() {
  cmCreatePageviewTag(getFileNameFromURL(), null, null);
}

/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc = "Y"
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID    : required. Product ID to set on this Productview tag
 * productName  : required. Product Name to set on this Productview tag
 * categoryID   : optional. Category ID to set on this Productview tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateProductviewTag(productID, productName, categoryID) {
  if (productID && productName) {
    var cm = new _cm("tid", "5", "vn2", "e3.1");

    // if available, override the referrer with the frameset referrer
    if (parent.cm_ref != null) {
      cm.rf = parent.cm_ref;
      parent.cm_ref = document.URL;
    }
    cm.pr = productID;
    cm.pm = productName;
    cm.cg = categoryID;
    cm.pc = "Y";
    cm.pi = "PRODUCT: " + productName + " (" + productID + ")";

	cmCheckCMLM();

    cm.writeImg();
  }
}

/*
 * Creates a Quickview Tag
 * Also creates a Pageview Tag by setting pc = "Y"
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID    : required. Product ID to set on this Quickview tag
 * productName  : required. Product Name to set on this Quickview tag
 * categoryID   : optional. Category ID to set on this Quickview tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateQuickviewTag(productID, productName, categoryID) {
  if (productID && productName) {
    var cm = new _cm("tid", "5", "vn2", "e3.1");

    // if available, override the referrer with the frameset referrer
    if (parent.cm_ref != null) {
      cm.rf = parent.cm_ref;
      parent.cm_ref = document.URL;
    }
    cm.pr = productID;
    cm.pm = productName;
    cm.cg = categoryID;
    cm.pc = "Y";
    cm.pi = "QUICKVIEW: " + productName + " (" + productID + ")";

	cmCheckCMLM();

    cm.writeImg();
  }
}

/*
 * Variables and Arrays to support Lineitem Aggregation
 */

var cmShopProducts = new Array();
var cmShopIds = new Array();
var cmShopCats = new Array();
var cmShopQtys = new Array();
var cmShopPrices = new Array();
var cmShopSKUs = new Array();
var cmShopCounter = 0;
var cmShopOrderIds = new Array();
var cmShopCustomerIds = new Array();
var cmShopOrderPrices = new Array();
var cmShopRegistryNumber = new Array();

var cmSKUCounter = 0;

var cmSKUIds = new Array();
var cmSKUProducts = new Array();
var cmSKUProductIDs = new Array();
var cmSKUCats = new Array();
var cmSKUQtys = new Array();
var cmSKUPrices = new Array();
var cmSKUOrderIds = new Array();
var cmSKURegistryNumber = new Array();

/* Internal, to support aggregation */
function cmGetProductIndex(id) {
  var i = 0;
  for (i = 0; i < cmShopCounter; i++) {
    if (id == cmShopIds[i]) {
      return i;
    }
  }
  return -1;
}

/* Internal, to support aggregation */
function cmGetSKUIndex(id) {
  var i = 0;
  for (i = 0; i < cmSKUCounter; i++) {
    if (id == cmSKUIds[i]) {
      return i;
    }
  }
  return -1;
}

function cmCreateShopAction5Tag(productID, productName, sku, skuName, productQuantity, productPrice, categoryID, registryNumber) {
  // SHOP 5 AGGREGATION
  var index = cmGetProductIndex(productID);
  if (index != -1) {
    var oldPrice = cmShopPrices[index];
    var oldQty = cmShopQtys[index];
    var newQty = oldQty + parseInt(productQuantity);
    var newPrice = (oldPrice * oldQty + parseInt(productQuantity) * parseFloat(productPrice)) / (newQty);

    cmShopPrices[index] = newPrice;
    cmShopQtys[index] = newQty;
  }
  else {
    if (!categoryID) {
      categoryID = "";
    }
    cmShopProducts[cmShopCounter] = productName;
    cmShopIds[cmShopCounter] = productID;
    cmShopCats[cmShopCounter] = categoryID;
    cmShopQtys[cmShopCounter] = parseInt(productQuantity);
    cmShopPrices[cmShopCounter] = parseFloat(productPrice);
    cmShopRegistryNumber[cmShopCounter] = registryNumber;
    cmShopCounter++;
  }

  // SKU AGGREGATION
  var index = cmGetSKUIndex(sku);
  if (index != -1) {
    var oldPrice = cmSKUPrices[index];
    var oldQty = cmSKUQtys[index];
    var newQty = oldQty + parseInt(productQuantity);
    var newPrice = (oldPrice * oldQty + parseInt(productQuantity) * parseFloat(productPrice)) / (newQty);
    cmSKUPrices[index] = newPrice;
    cmSKUQtys[index] = newQty;
  }
  else {
    if (!categoryID) {
      categoryID = "";
    }
    cmSKUProducts[cmSKUCounter] = skuName;
    cmSKUIds[cmSKUCounter] = sku;
    cmSKUProductIDs[cmSKUCounter] = productID;
    cmSKUCats[cmSKUCounter] = categoryID;
    cmSKUQtys[cmSKUCounter] = parseInt(productQuantity);
    cmSKUPrices[cmSKUCounter] = parseFloat(productPrice);
    cmSKURegistryNumber[cmSKUCounter] = registryNumber;
    cmSKUCounter++;
  }
}

/* render the aggregated cart lineitems with Shop 5 tags*/
function cmDisplayShop5s() {
  var rt = new Date();
  var connector = rt.getTime() % 10000000;

  var i;
  for (i = 0; i < cmShopCounter; i++) {
    var cm = new _cm("tid", "4", "vn2", "e3.1");
    cm.at = "5";
    cm.pr = cmShopIds[i];
    cm.pm = cmShopProducts[i];
    cm.cg = cmShopCats[i];
    cm.qt = cmShopQtys[i] ;
    cm.bp = cmShopPrices[i];
    cm.sx1 = cmShopRegistryNumber[i];
    cm.pc = "N";
    cm.writeImg();
  }
  cmShopCounter = 0;
  for (i = 0; i < cmSKUCounter; i++) {
    var cm = new _cm("tid", "7", "vn2", "e3.1");
    cm.li  = 3;
    cm.ps1 = 0;
    cm.ps2 = cmSKUIds[i];
    cm.ps3 = cmSKUProducts[i];
    cm.ps4 = cmSKUQtys[i];;
    cm.ps5 = cmSKUPrices[i];
    cm.ps6 = cmSKUCats[i];
    cm.ps8 = cmSKUProductIDs[i];
    cm.ps9 = connector;
    cm.ps10 = cmSKURegistryNumber[i];
    cm.writeImg();
  }
  cmSKUCounter = 0;
}

function cmCreateShopAction9Tag(productID, productName, sku, skuName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, registryNumber) {
  var index = cmGetProductIndex(productID);
  if (index != -1) {
    var oldPrice = cmShopPrices[index];
    var oldQty = cmShopQtys[index];
    var newQty = oldQty + parseInt(productQuantity);
    var newPrice = (oldPrice * oldQty + parseInt(productQuantity) * parseFloat(productPrice)) / (newQty);
    cmShopPrices[index] = newPrice;
    cmShopQtys[index] = newQty;
    cmShopSKUs[index] = "|" + productID + "|" + newPrice + "|" + newQty + "|";
  }
  else {
    if (!categoryID) {
      categoryID = "";
    }
    cmShopProducts[cmShopCounter] = productName;
    cmShopIds[cmShopCounter] = productID;
    cmShopOrderIds[cmShopCounter] = orderID;
    cmShopOrderPrices[cmShopCounter] = orderTotal;
    cmShopCustomerIds[cmShopCounter] = customerID;
    cmShopCats[cmShopCounter] = categoryID;
    cmShopQtys[cmShopCounter] = parseInt(productQuantity);
    cmShopPrices[cmShopCounter] = parseFloat(productPrice);
    cmShopSKUs[cmShopCounter] = "|" + productID + "|" + productPrice + "|" + productQuantity + "|";
    cmShopCounter++;
  }

  // SKU AGGREGATION
  var index = cmGetSKUIndex(sku);
  if (index != -1) {
    var oldPrice = cmSKUPrices[index];
    var oldQty = cmSKUQtys[index];
    var newQty = oldQty + parseInt(productQuantity);
    var newPrice = (oldPrice * oldQty + parseInt(productQuantity) * parseFloat(productPrice)) / (newQty);
    cmSKUPrices[index] = newPrice;
    cmSKUQtys[index] = newQty;
  }
  else {
    if (!categoryID) {
      categoryID = "";
    }
    cmSKUProducts[cmSKUCounter] = skuName;
    cmSKUIds[cmSKUCounter] = sku;
    cmSKUProductIDs[cmSKUCounter] = productID;
    cmSKUCats[cmSKUCounter] = categoryID;
    cmSKUQtys[cmSKUCounter] = parseInt(productQuantity);
    cmSKUPrices[cmSKUCounter] = parseFloat(productPrice);
    cmSKUOrderIds[cmSKUCounter] = orderID;
    cmSKURegistryNumber[cmSKUCounter] = registryNumber;
    cmSKUCounter++;
  }
}


/* render the aggregated order lineitems with Shop 9 tags*/
function cmDisplayShop9s() {
  var rt = new Date();
  var connector = rt.getTime() % 10000000;
  var i;
  for (i = 0; i < cmShopCounter; i++) {
    var cm = new _cm("tid", "4", "vn2", "e3.1");
    cm.at = "9";
    cm.pr = cmShopIds[i];
    cm.pm = cmShopProducts[i];
    cm.cg = cmShopCats[i];
    cm.qt = cmShopQtys[i] ;
    cm.bp = cmShopPrices[i];
    cm.cd = cmShopCustomerIds[i];
    cm.on = cmShopOrderIds[i];
    cm.tr = cmShopOrderPrices[i];
    cm.sx1 = cmShopRegistryNumber[i];
    cm.pc = "N";
    cm.writeImg();
  }
  cmShopCounter = 0;
  for (i = 0; i < cmSKUCounter; i++) {
    var cm = new _cm("tid", "7", "vn2", "e3.1");
    cm.li  = 4;
    cm.ps1 = 0;
    cm.ps2 = cmSKUIds[i];
    cm.ps3 = cmSKUProducts[i];
    cm.ps4 = cmSKUQtys[i];
    cm.ps5 = cmSKUPrices[i];
    cm.ps6 = cmSKUCats[i];
    cm.ps7 = cmSKUOrderIds[i];
    cm.ps8 = cmSKUProductIDs[i];
    cm.ps9 = connector;
    cm.ps10 = cmSKURegistryNumber[i];
    cm.writeImg();
  }
  cmSKUCounter = 0;
}

/*
 * Creates an Order tag
 *
 * orderID              : required. Order ID of this order
 * orderTotal           : required. Total of this order (minus tax and shipping)
 * orderShipping        : required. Shipping charge for this order
 * customerID           : required. Customer ID that placed this order
 * customerCity         : optional. City of Customer that placed this order
 * customerState        : optional. State of Customer that placed this order
 * customerZIP          : optional. Zipcode of Customer that placed this order
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID, customerCity, customerState, customerZIP, registryNumber) {
  if (orderID && orderTotal && orderShipping && customerID) {
    var cm = new _cm("tid", "3", "vn2", "e3.1");
    cm.on = orderID;
    cm.tr = orderTotal;
    cm.osk = getOSK();
    cm.sg = orderShipping;
    cm.cd = customerID;
    cm.sa = customerState;
    cm.ct = customerCity;
    cm.zp = customerZIP;
    cm.or1 = registryNumber;
    cm.writeImg();
  }
}

function getOSK() {
  var i = 0;
  var result = "";
  for (i = 0; i < cmShopCounter; i++) {
    result += cmShopSKUs[i];
  }
  return result;
}

/*
 * Creates a Registration tag and/or a Newsletter tag
 *
 * customerID           : required for Registration. ID of Customer to register.
 * customerEmail        : required for Newsletters. Optional for Registration.
 * customerCity         : optional. City of Customer that placed this order
 * customerState        : optional. State of Customer that placed this order
 * customerZIP          : optional. Zipcode of Customer that placed this order
 * newsletterName       : required for Newsletters. The name of the Newsletter.
 * subscribe            : required for Newsletters. Either "Y" or "N"
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, newsletterName, subscribe) {
  var cm = new _cm("tid", "2", "vn2", "e3.1");
  cm.cd = customerID;
  cm.em = customerEmail;
  cm.sa = customerState;
  cm.ct = customerCity;
  cm.zp = customerZIP;
  if (newsletterName && subscribe) {
    cm.nl = newsletterName;
    cm.sd = subscribe;
  }
  cm.writeImg();
}

/* Creates an Error Tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateErrorTag() {
  //DO NOT CHANGE THESE PARAMETERS
  var cm = new _cm("tid", "404", "vn2", "e3.1");
  // get the referrer from the frameset
  if (parent.cm_ref != null) {
    cm.rf = parent.cm_ref;
    parent.cm_ref = document.URL;
  }
  cm.pc = "Y";
  cm.pi = getFileNameFromURL();
  cm.writeImg();
}

// HELPER FUNCTIONS -----------------------------------------------------------
/* These functions are used by the tag-generating functions and/or may be used
 * in in general as convenience functions
 */

/*
 * Creates an acceptable default Page ID value to use for Pageview tags.
 * The default Page ID is based on the URL, and consists of the path and
 * filename (without the protocol, domain and query string).
 *
 * example:
 * returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
 */
function getFileNameFromURL() {
  var pageName = window.location.pathname;
  // eliminates everything after "?" (for Opera browswers)
  var tempIndex1 = pageName.indexOf("?");
  if (tempIndex1 != -1) {
    pageName = pageName.substr(0, tempIndex1 - 1);
  }
  // eliminates everything after "#" (for Opera browswers)
  var tempIndex2 = pageName.indexOf("#");
  if (tempIndex2 != -1) {
    pageName = pageName.substr(0, tempIndex2 - 1);
  }
  // eliminates everything after ";" (RH specific)
  var tempIndex3 = pageName.indexOf(";");
  if (tempIndex3 != -1) {
    pageName = pageName.substr(0, tempIndex3);
  }
  var slashPos = pageName.lastIndexOf("/");
  if (slashPos == pageName.length - 1) {
    // SET TO DEFAULT DOC NAME
    pageName = pageName + "index.jsp";
  }
  while (pageName.indexOf("/") == 0) {
    pageName = pageName.substr(1,pageName.length);
  }
  var ref = window.location.href;
  if (ref.indexOf("/registry/index.jsp") != -1) {
    var tempIndex4 = ref.indexOf("?");
    if (tempIndex4 != -1) {
      pageName = pageName + "?" + ref.substr(tempIndex4 + 1);
    }
  }
  return(pageName);
}

/*
 * Checks to see if a parameter exists in the request search string.
 * Returns -1 if not found or the index of the first character of the
 * name in the name-value pair if found.
 */
function cmIndexOfParameter (parameter) {
  return document.URL.indexOf(parameter);
}

/*
 * Extracts the value of a name-value pair in the request search string.
 */
function cmExtractParameter (parameter) {
  if (cmIndexOfParameter(parameter) == -1) {
    return "";
  }
  var s = location.search;
  var begin = s.indexOf(parameter);
  var end = s.indexOf("&", begin);
  if (end == -1) {
    end = s.length;
  }
  var middle = s.indexOf("=", begin);
  return s.substring(middle + 1, end);
}

if (!cmHandleLinkClick) {
  var cmHandleLinkClick = C9;
 }

/*  The following is a wrapper function that will allow the client to create a
 * link click tag manually by providing an href and link name. Uniqueness will
 * be determined by this combination of href and link name. The link name is
 * optional and can be left null if not needed.  This function can be called in
 * an onClick event (or any other JavaScript event).
 *
 * In order for this Link Click to be annotated in LIVEview, the client must
 * also create a fake link in the page and set the href and name properties of
 * that link to the same values sent in the manual link click tag.
 * The link will need to be placed in the location they want the annotation to
 * occur. The client can make this link invisible by using a 1x1 image.
 *
 * Function:   cmCreateManualLinkClickTag(in_href, in_link_name)
 * Parameters: in_href      Required   HREF of the link to send tag for
 *             in_link_name Optional   Link name of the link to send tag for
 *
 */
function cmCreateManualLinkClickTag(in_href, in_link_name) {
  var e = new Object();
  e.tagName = "A";
  // normalization not necessary
  e.href = in_href;
  e.name = in_link_name;
  cmHandleLinkClick(e);
}
//-->
