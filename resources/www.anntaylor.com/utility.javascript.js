







function showTabCom(objComDivId) {
     var imgPath = "/assets/images/shopping/"
     var objComDivArr = new Array("tab-more-info","tab-files","tab-email-friend","tab-products");
     for (i = 0; i < objComDivArr.length; i++) {
          if (document.getElementById(objComDivArr[i] + "-img")) {
               document.getElementById(objComDivArr[i] + "-img").src = imgPath + objComDivArr[i] + "-off.gif";
               document.getElementById(objComDivArr[i]).style.display = "none";
          }
     }
     document.getElementById(objComDivId + "-img").src = imgPath + objComDivId + ".gif";
     document.getElementById(objComDivId).style.display = "block";
}

utilityBrowserVer = parseInt(navigator.appVersion);

function imgOn(imgName) {
  	if (utilityBrowserVer >= 3) {
		imgOnString = eval(imgName + "_on.src");
		document.images[imgName].src = imgOnString;
	}
}

function imgOff(imgName) {
	if (utilityBrowserVer >= 3) {
		imgOffString = eval(imgName + "_off.src");
		document.images[imgName].src = imgOffString;
	}
}

function goToLink(address) {
	var linkURL = address.options[address.selectedIndex].value;
	window.top.location.href = linkURL;
	address.selectedIndex=0;
}

/*
 * This function launches a new web browser window to a specified width, height and features.
 * Features string is a comma separated window's feature needed for this new window. For Instance
 * If a new window needs a toolbar the feature string must be "toolbar" like needs scroll bar and
 * and toolbar then it must be "toolbar,scrollbar". Note that the order of the feature is not required.
 * Also it's case insensitive. Therefore, "scrollbar,toolbar" is identical to "Toolbar,ScrollBar".
 *
 * If the features string is ommitted then all the features are turned off. To turn all the features on
 * use the word "all" for features instead of specifying each feature.
 */

function openWindow(address, width, height,features)
{
	/* Find out what features need to be enable
	 *
   */
	if(features)
		features = features.toLowerCase();
	else
		features = "";

	var toolbar = (features == "all" ? 1 : 0);
	var menubar = (features == "all" ? 1 : 0);
	var location = (features == "all" ? 1 : 0);
	var directories = (features == "all" ? 1 : 0);
	var status = (features == "all" ? 1 : 0);
	var scrollbars = (features == "all" ? 1 : 0);
	var resizable = (features == "all" ? 1 : 0);


	if(features != "all")
	{
		//split features
		var feature = features.split(",");
		for(i = 0; i < feature.length; i++)
		{
		 	if(feature[i] == "toolbar")
			   toolbar = 1;
			else if(feature[i] == "menubar")
			   menubar = 1;
			else if(feature[i] == "location")
			   location = 1;
			else if(feature[i] == "directories")
			   directories = 1;
			else if(feature[i] == "status")
			   status = 1;
			else if(feature[i] == "scrollbars")
			   scrollbars = 1;
			else if(feature[i] == "resizable")
			   resizable = 1;
		}

	}
	features = "toolbar=" + toolbar + ",";
	features += "menubar=" + menubar + ",";
	features += "location=" + location + ",";
	features += "directories=" + directories + ",";
	features += "status=" + status + ",";
	features += "scrollbars=" + scrollbars + ",";
	features += "resizable=" + resizable;

	var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',"' + features + '"');
	newWindow.focus();
}

function confirmWindow(url, text) {

	if (confirm(text)) {
		window.go = url;
		window.location = url;
	}
}

function setOperation(opType,needSubmit,addressIndex) {
     document.addUpdateDeleteAddressForm.operation.value = opType;
            if(addressIndex)
                document.addUpdateDeleteAddressForm.selectedAddressIndex.value = addressIndex;
                if(needSubmit) {
                    if(opType == "EDIT")
                        window.location="/user/address_book.jsp?addressIndex=" + addressIndex;
                    else
                        document.addUpdateDeleteAddressForm.submit();
                    }
        }

function setAddTo(addToType) {
	document.productForm.addTo.value = addToType;
}

// This is an example of sending product data from the server
// to the client, then formatting the variants on the client-side
// based on certain criteria.
function cbFormatter(list, attribute, opt)
{
	// Get the price for this variant.. If this is the primary list, get all related
	// variants from the group and get their prices as well so we can build a range.
	var pvds = list.productVariantDropdownSupport;

	// Get all of the product variants for this attribute
	var variantGroup = attribute.getVariant().getProductVariantGroup();
	var groupVariants = variantGroup.getAllVariants()

	// Are all of the prices the same within the group?
	var lowGroupPrice = 999999.00;
	var highGroupPrice = -1.00;

	for (var idx = 0; idx < groupVariants.length; idx++)
	{
      lowGroupPrice = groupVariants[idx].numericPrice < lowGroupPrice ? groupVariants[idx].numericPrice : lowGroupPrice;
		highGroupPrice = groupVariants[idx].numericPrice > highGroupPrice ? groupVariants[idx].numericPrice : highGroupPrice;
   }

	// Are all of the prices the same within the variant?
	var variants = variantGroup.getVariantsMatching(attribute.name, attribute.value);
	var lowVariantPrice = 999999.00;
	var highVariantPrice = -1.00;

	var lowVariantDisplay = variants[0].displayPrice;
	var highVariantDisplay = variants[0].displayPrice;

   for (var idx = 0; idx < variants.length; idx++)
   {
		// Display really needs to be done before the re-assignment...
      lowVariantDisplay = variants[idx].numericPrice < lowVariantPrice ? variants[idx].displayPrice : lowVariantDisplay;
      lowVariantPrice = variants[idx].numericPrice < lowVariantPrice ? variants[idx].numericPrice : lowVariantPrice;
      highVariantDisplay = variants[idx].numericPrice > highVariantPrice ? variants[idx].displayPrice : highVariantDisplay;
		highVariantPrice = variants[idx].numericPrice > highVariantPrice ? variants[idx].numericPrice : highVariantPrice;
   }

	if (lowGroupPrice != highGroupPrice)
	{
		// Primary list should display a range
		if (pvds.isPrimary)
			if (lowVariantPrice != highVariantPrice)
				opt.text = opt.text + " " + lowVariantDisplay + " - " + highVariantDisplay;
			else
				opt.text = opt.text + " " + attribute.getVariant().displayPrice;
		else  // Secondary lists should show exact price
			opt.text = opt.text + " " + attribute.getVariant().displayPrice;
	}

   return opt;
}

/* This function is called when a subject is changed so that actual subject text can be
* stored in to a hidden subject field. Since value of the subject list is a keyword define
* in the command configuration file to identify it's email address.
*/
	function setSubject(thisRef)
	{
		var formRef = document.forms["contactUsForm"];
		//set subject value
		formRef.elements["subject"].value = (thisRef.options[thisRef.selectedIndex]).text;
	}

/* Image Swap/Restore */
function swapImgRestore(){ //v3.0
    var i, x, a = document.sr;
    for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) 
        x.src = x.oSrc;
}

function findObj(n, d){ //v4.01
    var p, i, x;
    if (!d) 
        d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) 
        x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) 
        x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) 
        x = findObj(n, d.layers[i].document);
    if (!x && d.getElementById) 
        x = d.getElementById(n);
    return x;
}

function swapImage(){ //v3.0
    var i, j = 0, x, a = swapImage.arguments;
    document.sr = new Array;
    for (i = 0; i < (a.length - 2); i += 3)
        if (jQuery("[name="+a[i]+"]").length > 0) {
            x = jQuery("[name="+a[i]+"]")[0];
            document.sr[j++] = x;
            if (!x.oSrc) 
                x.oSrc = x.src;
            x.src = a[i + 2];
        }
}


/* AT popup code */




/*

BrowserUtil.getEvent BEGINS

*/

var BrowserUtil = {};

BrowserUtil.getEvent = function(evtObj) {

	var navAgent = navigator.userAgent.toLowerCase();
   var evt = null;

   if ((window.event != null) && (navAgent.indexOf("mac") == -1)) {

      // Internet Explorer

      evt = window.event;

      // * IE 6 standards-compliant mode document.documentElement reassignment
      if (document.documentElement && document.documentElement.clientWidth) {

         evt.getViewportAxisX = document.documentElement.clientWidth;
         evt.getViewportAxisY = document.documentElement.clientHeight;

      } else if (document.body) {

         evt.getViewportAxisX = document.body.clientWidth;
         evt.getViewportAxisY = document.body.clientHeight;

      }

      evt.getViewportOffsetX = document.documentElement.scrollLeft;
      evt.getViewportOffsetY = document.documentElement.scrollTop;

      evt.getPageCoordX = evt.clientX + document.documentElement.scrollLeft;
      evt.getPageCoordY = evt.clientY + document.documentElement.scrollTop;

      evt.getRelatedTarget = evt.toElement ? evt.toElement : evt.fromElement;
		evt.getTarget = evt.srcElement;

   } else if (evtObj != null) {

      // EOMB

      evt = evtObj;

      evt.getViewportAxisX = self.innerWidth;
      evt.getViewportAxisY = self.innerHeight;
      evt.getViewportOffsetX = self.pageXOffset;
      evt.getViewportOffsetY = self.pageYOffset;

      evt.getPageCoordX = evt.pageX;
      evt.getPageCoordY = evt.pageY;

      evt.getRelatedTarget = evt.relatedTarget;
		evt.getTarget = evt.target;

   }

   return evt;

}




var useNonMacMSPops = ((navigator.userAgent.indexOf("PowerPC") < 0) || (navigator.userAgent.indexOf("MSIE") < 0));

//**********************************************************************************
// The following five functions are copied from the js library /js/popupControl.js *
//**********************************************************************************

function openPopup(popupName, wid, ht, tp, lft, bgColor, titleSrc, evtObj) {
	document.location.href="#ATLtop";
	if (useNonMacMSPops) {
		var popLayer = document.getElementById(popupName + "Top");
		var popInner = document.getElementById(popupName + "Inner");
		var popHeader = document.getElementById(popupName + "Header");
		var popTitle = document.getElementById(popupName + "TitleImage");
		var popContents = document.getElementById(popupName);
		popLayer.style.width = wid + "px";
		popLayer.style.height = ht + "px";
		popInner.style.width = wid + "px";
		popInner.style.height = (ht - 10) + "px";
		popLayer.style.borderBottomColor = bgColor;
		popLayer.style.borderBottomWidth = 10 + "px";
	   popLayer.style.borderBottomStyle = "solid"
		popHeader.style.width = wid + "px";
		popHeader.style.backgroundColor = bgColor;
		popTitle.src = titleSrc;
		popContents.style.width = (wid - 1) + "px";
		popContents.style.height = (ht - 44) + "px";
		popLayer.style.visibility = "visible";
		popLayer.style.display = "inline";

        var posX = 0;
        var posY = 0;

        var newEventObject = new BrowserUtil.getEvent(evtObj);
        posX = Math.round(newEventObject.getViewportAxisX/2) + newEventObject.getViewportOffsetX - Math.round(wid/2);
   	    posY = Math.round(newEventObject.getViewportAxisY/2) + newEventObject.getViewportOffsetY - Math.round(ht/2);

        //alert(posX);

        popLayer.style.top = posY + "px";
	    popLayer.style.left = posX + "px";

        //popLayer.style.top = tp + "px";
		//popLayer.style.left = lft + "px";



        setDropdownVisibility(window, "hidden");
	} else {
		var settings = "height=" + ht + ",width=" + wid + ",status=no,toolbar=no,menubar=no,location=no";
		currentPopupWin = window.open("/atlblank.jsp", popupName, settings);
		if (window.focus) {currentPopupWin.focus();}
	}
}

function closePopup(popupName, closeLocation, redirect) {
	if (useNonMacMSPops) {
		var popLayer = document.getElementById(popupName + "Top");
		popLayer.style.visibility = "hidden";
		setDropdownVisibility(parent, "visible");
		document.getElementsByName(popupName)[0].src="/atlblank.jsp";
		if (redirect == "true" ) {
			window.location = closeLocation;
		}
	}
}

function setDropdownVisibility(win, visibility) {
	if (useNonMacMSPops) {
		var doc = win.document;
		var dropdowns = doc.getElementsByTagName("select");
		for (var i = 0; i < dropdowns.length; i++) {
			if (!hasHiddenAncestor(doc, dropdowns[i])) dropdowns[i].style.visibility = visibility;
		}
	}
}

function hasHiddenAncestor(doc, elem) {
	if ((doc == elem) || (elem.nodeType == 9))
		return false;
	var mom = elem.parentNode;
	if (mom.nodeType == 1) {
		var momsStyle;
		var momsVis;
		var momsDisp;
		if (mom.currentStyle) {
			momsStyle = mom.currentStyle;
			momsVis = momsStyle.visibility;
			momsDisp = momsStyle.display;
		} else {
			momsStyle = window.getComputedStyle(mom,"");
			momsVis = momsStyle.getPropertyValue("visibility");
			momsDisp = momsStyle.getPropertyValue("display");
		}
		if ((momsVis == "hidden") || (momsDisp == "none"))
			return true;
		else
			return hasHiddenAncestor(doc, mom);
	}
}

function addPopup(popupName, closeLocation, redirect){
	// Generic popup.  It consists of a layer containing an iframe.  The layer provides control over visibility,
	// positioning and sizing, while the iframe provides a target for forms and links, plus scrollbars, when needed.
	if (useNonMacMSPops) {
		document.write('<div id="' + popupName + 'Top" class="popLyr">');
		document.write('	<div id="' + popupName + 'Inner" class="popLyrInr">');
		document.write('		<div id="' + popupName + 'Header" class="popLyrHdr" onmousedown="beginPopupDrag(document.getElementById(\'' + popupName + 'Top\'),event);">');
		
			document.write('			<img class="popTtl" id="' + popupName + 'TitleImage" onMouseMove="return false;" onMouseDown="return false;" src="/assets/images/header/nv_logo_sm.gif" alt="Ann Taylor"/>');
			document.write('			<a href="#null" onclick="closePopup(\''+popupName+'\', \''+closeLocation+'\', \''+redirect+'\');return false;"><img class="popClose" src="/assets/images/buttons/b_closewindow.gif" alt="close window"/></a>');
		
		document.write('		</div>');
		document.write('		<iframe name="' + popupName + '" id="' + popupName + '" src="/atlblank.html" frameborder="no" marginheight="0" marginwidth="0"></iframe>');
		document.write('	</div>');
		document.write('</div>');
	}
}

//*****************************************************************************
// The following two functions are copied from the js library /js/dragdrop.js *
//*****************************************************************************

function beginPopupDrag(elementToDrag, event) {
	var deltaX = event.clientX - parseInt(elementToDrag.style.left);
	var deltaY = event.clientY - parseInt(elementToDrag.style.top);
	if (document.addEventListener) {
		document.addEventListener("mousemove", moveHandler, true);
		document.addEventListener("mouseup", upHandler, true);
		document.addEventListener("mouseout", upHandler, true);
	} else if (document.attachEvent) {
		document.attachEvent("onmousemove", moveHandler);
		document.attachEvent("onmouseup", upHandler);
		document.attachEvent("onmouseout", upHandler);
	}

	if (event.stopPropogation) event.stopPropogation();
	else event.cancelBubble = true;

	if (event.preventDefault) event.preventDefault();
	else event.returnValue = false;

	function moveHandler(e) {
		if (!e) e = window.event;
		elementToDrag.style.left = (e.clientX - deltaX) + "px";
		elementToDrag.style.top = (e.clientY - deltaY) + "px";

		if (e.stopPropogation) e.stopPropogation();
		else e.cancelBubble = true;
	}

	function upHandler(e) {
		if (!e) e = window.event;

		if (document.removeEventListener) {
			document.removeEventListener("mouseup", upHandler, true);
			document.removeEventListener("mousemove", moveHandler, true);
			document.removeEventListener("mouseout", upHandler, true);
		} else if (document.detachEvent) {
			document.detachEvent("onmousemove", moveHandler);
			document.detachEvent("onmouseup", upHandler);
			document.detachEvent("onmouseout", upHandler);
		}
	}
	function getUpHandler() {
		return upHandler;
	}
}

// This appears to be some sort of vestige code that should probably be removed.
function detachOuterElement(popId) {
	if (document.removeEventListener) {
		;
	} else {
		;
	}
}

function printPopup(frameName) {
window.frames[frameName].focus();
window.frames[frameName].print();
}