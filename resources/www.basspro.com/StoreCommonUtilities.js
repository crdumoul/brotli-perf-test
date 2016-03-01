//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009, 2014 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------


/** 
 * @fileOverview This file provides the common functions which are specific to the Madisons store.
 * This JavaScript file is used by StoreCommonUtilities.jspf.
 */

//Import the required Dojo libraries
dojo.registerModulePath("wc", "../wc");
	
dojo.require("wc.service.common");
dojo.require("dojo.io.iframe");
dojo.require("dojo.io.script");

//Reloads widgets when parts of the page has been re-loaded from server
dojo.require("dojo.parser");

//Category menu support
dojo.require("dijit.form.Button");
dojo.require("wc.widget.WCMenu");
dojo.require("wc.widget.WCDialog");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");	
dojo.require("dijit.Tooltip");
dojo.require("wc.widget.WCDropDownButton");
dojo.require("dijit.Dialog");
dojo.require("dojo.currency");
dojo.require("dijit.Tree");
dojo.require("dojo.back");
dojo.require("dijit.form.DateTextBox");
dojo.require("wc.widget.RefreshArea");
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("dojo.cookie");
dojo.require("dojo.topic");
dojo.subscribe("ajaxRequestInitiated", "incrementNumAjaxRequest");
dojo.subscribe("ajaxRequestCompleted", "decrementNumAjaxRequest");
dojo.subscribe("ajaxRequestCompleted", "initializeInactivityWarning");

/** This variable indicates whether the dropdown is shown or not. */
var showDropdown = false;

/** This variable stores the current dropdown dialog element. */
var dropDownDlg = null;

/** This variable stores the current product added dropdown dialog element. */
var productAddedDropDownDlg = null;

/** This variable is used to store the width of the mini shopping cart on page load. It is used when shopper's browser is IE6. */
var originalMiniCartWidth = 0;

/** This variable indicates whether the browser used is Internet Explorer or not. */
var isIE = (document.all) ? true : false;

/** Initializes the variable to false. **/
	var correctBrowser = false;

/** 
 * This variable indicates whether a request has been submitted or not.
 * The value is initialized to true and resets to false on full page load.
 */
var requestSubmitted = true;

/** 
 * This variable stores the id of the element (ex: button/link) which the user clicked.
 * This id is set when the user clicks an element which triggers an Ajax request.
 */
var currentId = "";

/** 
 * This variable keeps track of the number of active ajax requests currently running on the page 
 * The value is initialized to 0.
 */
var numAjaxRequests = 0;

var widgetsList = [];

/**
 * Variable to save whether a tab or shift-tab was pressed
 */
var tabPressed = false;

/** This variable is used to keep track of the quick info/compare touch events */
var currentPopup = '';

/** This variable indicates whether Android is used or not */
var android = null;

/** This variable indicates whether iOS is used or not */
var ios = null;

/**
 * Initialize the client side inactivity warning dialog, this function is called at every page load and at 
 * every the time when ajax request completed.  Be default, 30 seconds before the session timeout, a dialog
 * will popup and display a warning to let the user to extend the time.  The timing of when the dialog
 * will be displayed can be modified with "inactivityWarningDialogBuffer" variable in CommonJSToInclude.jspf
 */
function initializeInactivityWarning() {

	// only set timer if user is not guest and is able to retrieve inactivityTimeout from server
	if (storeUserType != "G" && inactivityTimeout != 0) {
		// Reset the inactivity timer dialog
		if (inactivityTimeoutTracker != null) {
			clearTimeout(inactivityTimeoutTracker);
		}
		
		// setup the inactivity timout tracker
		inactivityTimeoutTracker = setTimeout(showInactivityWarningDialog, inactivityTimeout - inactivityWarningDialogBuffer);
	}
}

/**
 * Show the inactivity warning dialog, the dialog will be closed in 20 seconds.  The timing of when the dialog
 * will be closed can be modified with "inactivityWarningDialogDisplayTimer" variable in CommonJSToInclude.jspf
 */
function showInactivityWarningDialog() {
	dijit.byId("inactivityWarningPopup").show();
	if (dialogTimeoutTracker != null) {
		clearTimeout(dialogTimeoutTracker);
	}
	dialogTimeoutTracker = setTimeout(hideInactivityWarningDialog, inactivityWarningDialogDisplayTimer);
}

/**
 * Hide the inactivity warning dialog
 */
function hideInactivityWarningDialog() {
	dijit.byId("inactivityWarningPopup").hide();
}

/**
 * Send a Ping request to server to reset the inactivity timer.  The client side timer to display the inactivity warning
 * dialog will also be reset.
 */
function resetServerInactivity() {
	dojo.xhrPost({
		url: getAbsoluteURL() + "Ping",				
		handleAs: "json-comment-filtered",
		content: null,
		service: this,
		load: function(serviceResponse, ioArgs) {
			if (serviceResponse.success) {
				initializeInactivityWarning();
			} else {
				console.error("Ping service failed");				
			}
		},
		error: function(errObj, ioArgs) {
			console.error("Ping service failed");
		}
	});
}

/**
 * DOM Shorthand
 */
function byId(r){
	return document.getElementById(r);
}

/** 
 * Sends back focus to the first focusable element on tabbing from the last focusable element.
 */
function focusSetter(){  
	if(dojo.byId("MiniCartFocusReceiver1"))
		dojo.byId("MiniCartFocusReceiver1").focus();
	else
		dojo.byId("MiniCartFocusReceiver2").focus();
}

/** 
 * Sends back focus to the last focusable element on reverse tabbing from the first focusable element.
 * 
 * @param {object} event The event triggered from user actions
 */
function determineFocus(event) {
		if(event.shiftKey && event.keyCode == dojo.keys.TAB)
		{
			if(event.srcElement)
			{
				if(event.srcElement.id=="MiniCartFocusReceiver1")
				{
					if(dojo.byId("WC_MiniShopCartDisplay_link_5"))
					{
						dojo.byId("WC_MiniShopCartDisplay_link_5").focus();
					}
					dojo.stopEvent(event);
				}
				else if(event.srcElement.id=="MiniCartFocusReceiver2")
				{
					dojo.byId("MiniCartFocusReceiver2").focus();
					dojo.stopEvent(event);
				}
			}
			else
			{
				if(event.target.id=="MiniCartFocusReceiver1")
				{
					if(dojo.byId("WC_MiniShopCartDisplay_link_5"))
					{
						dojo.byId("WC_MiniShopCartDisplay_link_5").focus();
					}
					dojo.stopEvent(event);
				}
				else if(event.target.id=="MiniCartFocusReceiver2")
				{
					dojo.byId("MiniCartFocusReceiver2").focus();
					dojo.stopEvent(event);
				}
			}
		}
}

/**
 * Destroys the existing dialogs with outdated data.
 * @param {string} contentId The identifier of the dialog to destroy. If undefined, the default is 'quick_cart_container'.
 */
function destroyDialog(contentId){
	if(contentId == undefined){
		contentId = 'quick_cart_container';
	} 
	//If data has changed, then we should destroy the quick_cart_container dialog and recreate it with latest data
	dojo.query('.dijitDialog', document).forEach(function(tag) {
		if (dijit.byNode(tag).id == contentId) 
			dijit.byNode(tag).destroyRecursive();// or dijit.getEnclosingWidget(tag).destroyRecursive();
	 });
	 
	if(contentId != undefined && contentId == 'quick_cart_container'){
	 	 dropDownDlg = null;
	} else {
		productAddedDropDownDlg = null;
	}
}

/**
 * Hides the DialogUnderlayWrapper component, the component that grays out the screen behind,
 * as we do not want the background to be greyed out.
 */
function hideUnderlayWrapper(){
	dojo.query('.dijitDialogUnderlayWrapper', document).forEach(function(tag) {		
		tag.style.display='none';
	});	
}

/**
 * Loads the specified URL.
 *
 * @param {string} url The URL of the page to be loaded.
 */
function loadLink(url){
	document.location.href=url;
}

/**
 * Clears the Search term string displayed in Simple Search field.
 */
function clearSearchField() {
	searchText = document.getElementById("SimpleSearchForm_SearchTerm").value;
	if(searchText == document.getElementById("searchTextHolder").innerHTML){
		document.getElementById("SimpleSearchForm_SearchTerm").value = "";
	}
	else{
		document.getElementById("SimpleSearchForm_SearchTerm").select();
		showAutoSuggestIfResults();
		autoSuggestHover = false;
	}
}

/**
 * Displays the Search term string in Simple Search field.
 */
function fillSearchField() {
	if (document.getElementById("SimpleSearchForm_SearchTerm").value == "") {
		document.getElementById("SimpleSearchForm_SearchTerm").className = "search_input gray_color";
		document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML;
	}
	// hide the search box results
	if(!autoSuggestHover) {
		showAutoSuggest(false);
	}
}

/**
 * Displays the top dropdown menu, including the category dropdowns and the mini shopping cart.
 */
function showDropDownMenu(){
	var showMenu = document.getElementById("header_menu_dropdown");
	if(document.getElementById("header_menu_dropdown")!=null && document.getElementById("header_menu_dropdown")!='undefined'){
		showMenu.style.display = "block";
	}
	if(document.getElementById("outerCartContainer")!=null && document.getElementById("outerCartContainer")!='undefined'){
		var outershopcart = document.getElementById("outerCartContainer");
		outershopcart.style.display = "block";
	}
}

/**
 * Initializes the mini shopping cart object and subscribes dojo actions on this object.
 */
function initShopcartTarget(){
			
	dojo.subscribe("/dnd/drop", function(source, nodes, copy, target){
		if (source != target) {
			target.deleteSelectedNodes();
		}
		var actionListScroll = new popupActionProperties(); 
		actionListScroll.showProductCompare = showProductCompare;

		if(target.parent.id=='miniShopCart_dndTarget'){
			var indexOfIdentifier = source.parent.id.indexOf("_",0);
			if ( indexOfIdentifier >= 0) {
				//remove the prefix including the "underscore"
				source.parent.id = source.parent.id.substring(indexOfIdentifier+1);					
			}
			if(source.node.getAttribute('dndType')=='item' || source.node.getAttribute('dndType')=='package') {
				categoryDisplayJS.AddItem2ShopCartAjax(source.parent.id ,1);
			} else if(source.node.getAttribute('dndType')=='product' || source.node.getAttribute('dndType')=='bundle') {
				showPopup(source.parent.id,function(e){return e;},'miniShopCart_dndTarget',null,actionListScroll);
			}
		}
	});
}

/**
 * Displays the progress bar dialog to indicate a request is currently running.
 * There are certain cases where displaying the progress bar causes problems in Opera,
 * the optional parameter "checkForOpera" is passed to specifically check if the browser used is Opera,
 * if so, do not display the progress bar in these cases.
 *
 * @param {boolean} checkForOpera Indicates whether to check if the browser is Opera or not.
 */
function cursor_wait(checkForOpera) {
	var showPopup = true;	

	//Since dijit does not support Opera
	//Some progress bar dialog will be blocked in Opera to avoid error
	if(checkForOpera == true){
		if(dojo.isOpera > 0){
			showPopup = false;
		}
	}
	
	//For all other browsers and pages that work with Opera
	//Display the progress bar dialog
	if(showPopup){
		//Delay the progress bar from showing up
		setTimeout('showProgressBar()',500);
	}
}

/**
 * Helper method for cursor_wait() to display the progress bar pop-up.
 * Displays progress bar, next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * Progress bar will only be displayed if the submitted request has not been completed.
 * This method is only called implicitly by the cursor_wait() method, which is triggered before a request is submitted.
 */
function showProgressBar(){
	//After the delay, if the request is still not finished
	//Then continue and show the progress bar
	//Otherwise, do not execute the following code
	if(!requestSubmitted){
		return;
	}
	
	displayProgressBar();
	
}


/**
 * Helper method for showProgressBar() to display the progress bar pop-up.
 * It can also be forced to show the progress bar directly in special cases.
 * The function also displays the progress bar next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * This method can be called implicitly by the cursor_wait() method or explicitly by itself.
 */
function displayProgressBar(){
	var dialog = dijit.byId('progress_bar_dialog');
	
	//Make sure the dialog is created
	if(dialog != null){
			
		//Hide the header for the close button
		dialog.closeButtonNode.style.display='none';		
		
		var progressBar = document.getElementById('progress_bar');
		progressBar.style.display = 'block';	
				
		//Check whether or not an element ID is provided
		//If yes, point the progress bar to this element
		//Otherwise, show the progress bar in a dialog
		if(this.currentId != ""){
			var element = document.getElementById(this.currentId);	
			var pos = dijit.placeOnScreenAroundElement(progressBar,element,{'TR':'TL'});	
		} else {
			dialog.containerNode.innerHTML == "";
			progressBar.style.left = '';
			progressBar.style.top = '';
			dialog.containerNode.appendChild(progressBar);
			dialog.show();		
		}
		
		//Make sure the progress bar dialog goes away after 30 minutes
		//and does not hang if server calls does not return
		//Assuming the longest server calls return before 30 minutes
		setTimeout("cursor_clear()",1800000);
	}
}

/**
 * Stores the id of the element (ex: button/link) that triggered the current submitted request.
 * Store the new element id only when no request is currently running.
 *
 * @param {string} id The id of element triggering the submitted request.
 */
function setCurrentId(id){
	//If there is no request already submitted, update the id
	if(!requestSubmitted && this.currentId == ""){
		this.currentId = id;
	}
}

/**
 * This function trims the spaces from the pased in word.
 * Delete all pre and trailing spaces around the word.
 * 
 * @param {string} inword The word to trim.
 */
function trim(inword)
{
	word = inword.toString();
	var i=0;
	var j=word.length-1;
	while(word.charAt(i) == " ") i++;
	while(word.charAt(j) == " ") j=j-1;
	if (i > j) {
		return word.substring(i,i);
	} else {
		return word.substring(i,j+1);
	}
}

/**
 * Hides the progress bar dialog when the submitted request has completed.
 * Set the visibility of the progress bar dialog to hide from the page.
 */
function cursor_clear() {
		//Reset the flag 
		requestSubmitted = false;

		//Hide the progress bar dialog
		var dialog = dijit.byId('progress_bar_dialog');
		var progressBar = document.getElementById('progress_bar');
		if(dialog != null){
			if(progressBar != null){
				progressBar.style.display = 'none';
			}
			dialog.hide();
			this.currentId="";
		}
}	

/**
 * Checks whether a request can be submitted or not.
 * A new request may only be submitted when no request is currently running.
 * If a request is already running, then the new request will be rejected.
 *
 * @return {boolean} Indicates whether the new request was submitted (true) or rejected (false).
 */
function submitRequest() {
	if(!requestSubmitted) {
		requestSubmitted  = true;
		return true;
	}
	return false;
}

function resetRequest() {
	requestSubmitted = false;
}
 
/**
 * Set the current page to a new URL.
 * Takes a new URL as input and set the current page to it, executing the command in the URL.
 * Used for Non-ajax calls that requires multiple clicks handling.
 * 
 * @param {string} newPageLink The URL of the new page to redirect to.
 */
function setPageLocation(newPageLink) {
	//For Handling multiple clicks
	if(!submitRequest()){
		return;
	}
			
	document.location.href = newPageLink;
}

/**
 * Submits the form parameter.
 * Requires a form element to be passed in and submits form with its inputs.
 * Used for Non-ajax calls that requires multiple clicks handling.
 *
 * @param {element} form The form to be submitted.
 */
function submitSpecifiedForm(form) {
	if(!submitRequest()){
		return;
	}
	console.debug("form.action == "+form.action);
	form.submit();
}


/**
 * Parses a Dojo widget.
 * Pass in the id of a dojo widget or a HTML container element containing a dojo widget, such as a div,
 * and this method will parse that widget, or all the widgets within that HTML container element.
 * 
 * @param {string} id The id of a dojo widget or a HTML container of a dojo widget to be parsed.
 */
function parseWidget(id)
{
	/*
	var node;
	var widget = dijit.byId(id);
	
	if (widget == null || widget == undefined)
	{
		if (id == null || id == undefined)
		{	
			node = dojo.body();
		}
		else
		{
			node = dojo.byId(id);
		}
		
		if (node != null && node != undefined)
		{
			if (node.getAttribute("dojoType") != null && node.getAttribute("dojoType") != undefined)
			{
				dojo.parser.instantiate([node]);
			}
			else
			{
				dojo.parser.parse(node);
			}
		}
	}
	*/
}

function parseAllWidgets(){
	for(var i = 0; i < widgetsList.length; i++){
		parseWidget(widgetsList[i]);
	}
}

function addToWidgetsList(widgetId){
	widgetsList.push(widgetId);
}


/**
 * Parses the co-shopping Dojo widget.
 * @param {string} id The id of a coshopping dojo widget or a HTML container of a dojo widget to be parsed.
 */
function parseWCCEAWidget(id)
{
	var node;
	var widget = ceadijit.byId(id);
	
	if (widget == null || widget == undefined)
	{
		if (id == null || id == undefined)
		{	
			node = ceadojo.body();
		}
		else
		{
			node = ceadojo.byId(id);
		}
		
		if (node != null && node != undefined)
		{
			if (node.getAttribute("ceadojoType") != null && node.getAttribute("ceadojoType") != undefined)
			{
				ceadojo.parser.instantiate([node]);
			}
			else
			{
				ceadojo.parser.parse(node);
			}
		}
	}
}

/**
 * Parses the header menu.
 * The header menu is only parsed when the user hovers over it to improve the performance of the store loading.
 *
 * @param {string} id The id of the menu item which the user hovers over to initialize the progress bar next to that item.
 */
function parseHeader(id)
{
	var node = dojo.byId("progress_bar_dialog");
	var showMenu = document.getElementById("header_menu_loaded");
	var hideMenu = document.getElementById("header_menu_overlay");
	
	if(currentId.length == 0 && document.getElementById("header_menu_loaded")!=null && document.getElementById("header_menu_loaded")!='undefined' && document.getElementById("header_menu_overlay")!=null && document.getElementById("header_menu_overlay")!='undefined' && document.getElementById("header_menu_loaded").style.display == 'none')
	{
		setCurrentId((id != null && id != undefined)?id:hideMenu.id);
		submitRequest();
		cursor_wait();
		hideMenu.style.display = "none";
		parseWidget("header_menu_loaded");
		showMenu.style.display = "block";
		cursor_clear();
		
		//the headers are parsed now. Connect _onDropDownClick to Coshopping's topCategoryClicked
		try {
			if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {
				dijit.registry.byClass("wc.widget.WCDropDownButton").forEach(function(w){
					dojo.connect(w, '_onDropDownClick', dojo.hitch(window.top._ceaCollabDialog, "topCategoryClicked", w.getURL()));
					dojo.connect(w, 'onKeyPress', window.top._ceaCollabDialog, function(e) {
						if (e.keyCode == dojo.keys.ENTER) {
							window.top._ceaCollabDialog.topCategoryClicked(w.getURL());
						}
					}); 
				});			
			}
		}catch(err) {
			console.log(err);
		}
	}
}


 /**
  * This function is used to hide an element with the specified id.
  * @param {string} elementId The id of the element to be hidden.
  */

  function hideElementById(elementId){
		var div = dojo.byId(elementId);
		div.style.display = "none";
 }

/**
  * This function is used to display an element with the specified id.
  * @param {string} elementId The id of the element to be displayed.
  */

   function showElementById(elementId){
		var div = dojo.byId(elementId);
		div.style.display = "block";
}

/**
  * This function is used to hide the background image of an element.
  * @param {DomNode} element The node whose background image is to be hidden.
  */
    function hideBackgroundImage(element){
		element.style.backgroundImage='none';
}

/**
  * This function is used to display the background image of a product onhover.
  * @param {DomNode} element The node for which the product hover background image is to be displayed.
  */

	 function showBackgroundImage(element){
		element.style.backgroundImage='url('+getImageDirectoryPath()+getStyleDirectoryPath()+'product_hover_background.png)';
}
	/**
	* checkIE8Browser checks to see if the browser is IE 8 or less. It then sets correctBrowser to true if it is.
	*
	**/
	
	function checkIE8Browser() { 
       if( dojo.isIE && dojo.isIE <= 8 ){
    	    correctBrowser = true
       }
   } 
 
	/**
	* ApprovalToolLink provides the appropriate URL if the browser is correct, otherwise displays a message.
	*
	* @param {String} idTag Used to identify the id tag in the jsp that is calling it.
	* @param {String} approvalToolLinkURL This is a URL which is passed from the calling jsp.
	*
	**/
   
	function ApprovalToolLink(idTag, approvalToolLinkURL) { 
		
		//checks if the browser is IE 8 or less.
		checkIE8Browser();
		
		if (correctBrowser) {
    	  RFQwindow=window.open(approvalToolLinkURL);
		}
		else {      
    	  MessageHelper.formErrorHandleClient(idTag,MessageHelper.messages["ERROR_INCORRECT_BROWSER"]); return;
    	}
	}  


/**
 * Updates view (image/detailed) and starting index of pagination of product display in SetCurrencyPreferenceForm when currency is changed from the drop-down menu. 
 * These are later passed as url parameters.
 */

function updateViewAndBeginIndexForCurrencyChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{	
		if(document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		}
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		}
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']
		}
	}
	else if(document.getElementById('Search_Result_Summary2')!=null && document.getElementById('Search_Result_Summary2')!='')
	{
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']
		}
	}
	
	//allow coshopper to change currency. Only used for coshopping
	try {
		if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {	
			dojo.byId('SetCurrencyPreferenceForm').URL.value= 
					dojo.byId('SetCurrencyPreferenceForm').URL.value + "&coshopChangeCurrency=" +
					dojo.byId('currencySelection').options[dojo.byId('currencySelection').selectedIndex].value;
		}
	}catch(err) {
		console.log(err);
	}
}


/**
 * Updates view (image/detailed) and starting index of pagination of product display in LanguageSelectionForm when language is changed from the drop-down menu.
 * These are later passed as url parameters.
 */

function updateViewAndBeginIndexForLanguageChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{
		if(document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		} 
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		} 
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
	else if(document.getElementById('Search_Result_Summary2')!=null && document.getElementById('Search_Result_Summary2')!='')
	{
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
	
	//appending landId to the URL. Only used for coshopping
	try {
		if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {	
			dojo.byId('LanguageSelectionForm').action= 
				dojo.byId('LanguageSelectionForm').action + "&langId=" +
				dojo.byId('languageSelection').options[dojo.byId('languageSelection').selectedIndex].value;
		}
	}catch(err) {
		console.log(err);
	}
}

/**
 * Displays the header links in two lines.
 */
function showHeaderLinksInTwoLines(){
	if(document.getElementById("header_links")!=null && document.getElementById("header_links")!='undefined'){
		if(dojo.contentBox(document.getElementById("header_links")).w > 750){
			if(document.getElementById("header_links1")!=null && document.getElementById("header_links1")!='undefined'){
				document.getElementById("header_links1").style.display = "block";
			}
			if(document.getElementById("headerHomeLink")!=null && document.getElementById("headerHomeLink")!='undefined'){
				document.getElementById("headerHomeLink").style.display = "none";
			}
			if(document.getElementById("headerShopCartLink")!=null && document.getElementById("headerShopCartLink")!='undefined'){
				document.getElementById("headerShopCartLink").style.display = "none";
			}
		}
		document.getElementById("header_links").style.visibility="visible";
	}
}

/**
  * Displays the header links in one line.
  */
 function showLinksInOneLine(){
 	if(document.getElementById("header_links")!=null && document.getElementById("header_links")!='undefined'){
 		document.getElementById("header_links").style.visibility="visible";
 	}
 }

/**
 * Validates if the input value is a non-negative integer using regular expression.
 *
 * @param {String} value The value to validate.
 * 
 * @return {Boolean} Indicates if the given value is a non-negative integer. 
 */
function isNonNegativeInteger(value){
	var regExpTester = new RegExp(/^\d*$/);
	return (value != null && value != "" && regExpTester.test(value));
}

/**
* Validates if the input value is a positive integer.
*
* @param {String} value The value to validate.
* 
* @return {Boolean} Indicates if the given value is a positive integer. 
*/
function isPositiveInteger(value){
	return (isNonNegativeInteger(value) && value != 0);
}

/**
 * This function closes all dijit.dialogs on the page. 
 */
function closeAllDialogs(){
	dijit.registry.byClass("dijit.Dialog").forEach(function(w){w.hide()});
}
 
/**
 * This function store a error key in the cookie. The error key will be used to retrieve error messages. 
 * @param {String} errorKey  The key used to retrieve error/warning messages. 
 */
function setWarningMessageCookie(errorKey) {
	dojo.cookie("signon_warning_cookie",errorKey, {path: "/"});
}
/**
* This function removes a cookie
* @param {String} name the name of the cookie to be removed. 
*/
function removeCookie(name) {
	dojo.cookie(name, null, {expires: -1});
}
/**
* This function gets a cookie
* @param {String} c the name of the cookie to be get.
*/
function getCookie(c) {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var index = cookies[i].indexOf("=");
		var name = cookies[i].substr(0,index);
		name = name.replace(/^\s+|\s+$/g,"");
		if (name == c) {
			return unescape(cookies[i].substr(index + 1));
		}
	}
}

/**
 * checks if the store is in preview mode
 * @param {String} contextPathUsed The context path being used by the Store. 
 * @param {String} criteria criteria used to check if contextPathUsed is the preview context. 
 */
function isStorePreview(contextPathUsed,criteria) {
	if(contextPathUsed.indexOf(criteria)>-1) {
		return true;
	}
	return false;
}

/**
 * checks hides the ESpot info popup window
 * @param {String} The id of the popup dialog
 * @param {String} The browser event
 */
function hideESpotInfoPopup(id,event) { 
	if(event!=null && event.type=="keypress" && event.keyCode!="27") {
		return;
	}
	else {
		var quickInfo = dijit.byId(id);
		if(quickInfo != null) {
			quickInfo.hide();
		}
	}
}

/**
 * checks shows the ESpot info popup window
 * @param {String} The id of the popup dialog
 * @param {String} The browser event
 */
function showESpotInfoPopup(id,event) { 
	if(event!=null && event.type=="keypress" && event.keyCode!="13") {
		return;
	}
	else {
		if(!parent.checkPopupAllowed()){
			return;
		}
		var quickInfo = dijit.byId(id);
		if(quickInfo != null) {
			quickInfo.show();
		}
	}
}  
/**
* This function increments the numAjaxRequests counter by 1. 
*/
function incrementNumAjaxRequest(){
	if(numAjaxRequests != 'undefined'){
		numAjaxRequests++;
	}
}

/**
* This function decrements the numAjaxRequests counter by 1. 
*/
function decrementNumAjaxRequest(){
	if(numAjaxRequests != 'undefined'){
		if(numAjaxRequests != 0){
			numAjaxRequests--;
		}
	}
}

/**
* updateParamObject This function updates the given params object with a key to value pair mapping.
*				    If the toArray value is true, It creates an Array for duplicate entries otherwise it overwrites the old value.
*			        This is useful while making a service call which accepts a few parameters of type array.
*					This function is used to prepare a a map of parameters which can be passed to XMLHttpRequests. 
* 					The keys in this parameter map will be the name of the parameter to send and the value is the corresponding value for each parameter key.
* @param {Object} params The parameters object to add name value pairs to.
* @param {String} key The new key to add.
* @param {String} value The new value to add to the specified key.
* @param {Boolean} toArray Set to true to turn duplicate keys into an array, or false to override previous values for a specified key.
* @param {int} index The index in an array of values for a specified key in which to place a new value.
*
* @return {Object} params A parameters object holding name value pairs.
*
**/
function updateParamObject(params, key, value, toArray, index){
	
	if(params == null) {
		params = [];
	}
	if(params[key] != null && toArray) {
		if(dojo.lang.isArrayLike(params[key])) {
			//3rd time onwards
			if(index != null && index != "") {
				//overwrite the old value at specified index
				params[key][index] = value;
			} else {
				params[key].push(value);
			}
		} else {
			//2nd time
			var tmpValue = params[key];
			params[key] = [];
			params[key].push(tmpValue);
			params[key].push(value);
		}
   } else {
	   //1st time
	   if(index != null && index != "" && index != -1) {
		   //overwrite the old value at specified index
		   params[key+"_"+index] = value;
	   } else if(index == -1) {
		   var i = 1;
		   while(params[key + "_" + i] != null) {
			   i++;
		   }
		   params[key + "_" + i] = value;
	   } else {
		   params[key] = value;
	   }
   }
   return params;
 }

/** 
 * Show the html element
 * 
 * @param {string} id The id of the section to show.
 */
function showSection (id){
	var section = dojo.byId(id);
	if(section!=null && section!='undefined'){
		section.style.visibility="visible";
	}
}

/** 
 * Hides the html element.
 * 
 * @param {string} id The id of the section to hide. 
 */	
function hideSection (id){
	var section = dojo.byId(id);
	if(section!=null && section!='undefined'){
		section.style.visibility="";
	}
}
 
/** 
 * hides the section if the user clicks shift+tab.
 * 
 * @param {string} id The id of the div area to hide. 
 * @param {event} event The keystroke event entered by the user. 
 */	
function shiftTabHideSection (id, event){
	if (event.shiftKey && (event.keyCode == dojo.keys.TAB)){
		hideSection(id);
	} 
}

/** 
 * hides the section if the user clicks tab.
 * 
 * @param {string} id The id of the div area to hide. 
 * @param {event} event The keystroke event entered by the user. 
 */	
function tabHideSection (id, event, nextId){
	if (!event.shiftKey && (event.keyCode == dojo.keys.TAB)){
		if(null != nextId){
			dojo.byId(nextId).focus();
		}
		hideSection(id);
		dojo.stopEvent(event);
	} 
}

/**
 * Saves whether the shift and tab keys were pressed or not.  Ignores tab.
 * @param {event} event The event that happened by pressing a key
 */
function saveShiftTabPress(event) {
	if (event.shiftKey == true && event.keyCode == 9) {
		tabPressed = true;
	}
}

/**
 * Saves whether the tab key was pressed or not.  Ignores SHIFT-tab.
 * @param {event} event The event that happened by pressing a key
 */
function saveTabPress(event) {
	if (event.shiftKey == false && event.keyCode == 9) {
		tabPressed = true;
	}
}
/**
 * Sets the focus to the given form element if a tab or shift-tab was pressed.  Workaround to tabbing from a country dropdown
 * to a dynamic state element that becomes a dropdown when it was a textbox and vice versa.  Defect was Firefox specific. 
 * @param {String} formElementId The form element id to set the focus to
 */
function setFocus(formElementId) {
	if (tabPressed) {
		tabPressed = false;
		document.getElementById(formElementId).focus();
	}
}

/**
 * Increase the height of a container due to the addition of a message
 * @param ${String} The id of the container whose height will be increased
 * @param ${Integer} Number of pixels to increase height by
 */
function increaseHeight(containerId, increase) {
	var temp = document.getElementById(containerId).offsetHeight;
	document.getElementById(containerId).style.height = (temp + increase) + 'px';
}


function redirectToSignOn(forcedUrl) {
	if(typeof(forcedUrl)!='undefined'){
		var currentURL = forcedUrl;
	}else{
		var currentURL = location.href;
	}
	currentURL = "OrderItemMove?continue=1&createIfEmpty=1&updatePrices=0&deleteIfEmpty=*&fromOrderId=*&toOrderId=.&page=&calculationUsageId=-1&URL="+encodeURIComponent("OrderCalculate?URL="+encodeURIComponent(currentURL));
	document.location.href = "LogonForm?myAcctMain=1&storeId="
			+ WCParamJS.storeId + "&catalogId=" + WCParamJS.catalogId
			+ "&langId=" + WCParamJS.langId + "&URL=" + encodeURIComponent(currentURL);
}

/**
 * Keeps track of the current quick info/compare touch event in tablets
 * @param ${String} link The link of the product detail page
 * @param ${String} newPopup The id of the new product quick info/compare touched
 */
function handlePopup(link,newPopup) {
	if (currentPopup == newPopup){
		document.location.href = link;
	} else {
		currentPopup = newPopup;
	}
}

/**
 * Check to see if the device in use is running the android OS
 * @return {boolean} Indicates whether the device is running android
 */
function isAndroid() {
	if(android == null){
		if(navigator != null){
			if(navigator.userAgent != null){
				var ua = navigator.userAgent.toLowerCase();
				android = ua.indexOf("android") > -1; 
			}
		}
	}
	return android;
}

/**
 * Check to see if the device in use is running iOS
 * @return {boolean} Indicates whether the device is running iOS
 */
function isIOS() {
	if(ios == null){
		if(navigator != null){
			if(navigator.userAgent != null){
				var ua = navigator.userAgent.toLowerCase();
				ios = (ua.indexOf("ipad") > -1) || (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1); 
			}
		}
	}
	return ios;
}


/**
* This function highlight all marketing spots and catalog objects in preview mode, overwriting the implementation in site level (StorePreviewerHeader.jsp)
*/
function outlineSpots(){
	dojo.addClass(document.body,'editMode');
	dojo.query('.carousel > .content').style({zIndex:'auto'});
	dojo.query(".ESpotInfo").style({ display:"block" });
	dojo.query(".searchScore").style({ display:"block" });
	dojo.query(".editManagedContent").style({ display:"block" });
	var all = dojo.query(".genericESpot,.product,.searchResultSpot,.productDetail,.categorySpot");
	for (var i = 0; i < all.length; i++) {
		var currEl = all[i];
		if(dojo.hasClass(currEl,"emptyESpot")){
			var elementWidth = dojo.query('.ESpotInfo',currEl)[0].offsetWidth+4;
			var elementHeight = dojo.query('.ESpotInfo',currEl)[0].offsetHeight+4;
			dojo.attr(currEl,'_width',dojo.style(currEl,'width'));
			dojo.attr(currEl,'_height',dojo.style(currEl,'height'));
			dojo.style(currEl,{'width':+elementWidth+'px','height':elementHeight+'px'});
			
		}
	 	if(dojo.query(".borderCaption",currEl).length==0){
	 		dojo.place("<div class='borderCaption'></div>",currEl,'first');
	 	}else{
	 		dojo.query(".borderCaption",currEl).style({'display':'block'});
	 	}
		if(currEl.addEventListener){
			currEl.addEventListener('mouseover',function(evt){
				if(!window.parent.frames[0].isSpotsShown()){return;}
				dojo.query(".caption").style({ display:"none" });
				dojo.style(dojo.query(".caption",this)[0],{ display:"block" });
				evt.stopPropagation();
			},false);
			currEl.addEventListener('mouseout',function(evt){
				if(!window.parent.frames[0].isSpotsShown()){return;}
				dojo.query(".caption",this).style({ display:"none" });
				evt.stopPropagation();
			},false);
		}else if(currEl.attachEvent){
			currEl.onmouseover=(
				(function(currEl){
					return (function(){
						if(!window.parent.frames[0].isSpotsShown()){return;}
						dojo.query(".caption").style({ display:"none" });
						dojo.style(dojo.query(".caption",currEl)[0],{ display:"block" });
						window.event.cancelBubble = true;
					});
				})(currEl)
			);
			currEl.onmouseleave=(
				(function(currEl){
					return (function(){
						if(!window.parent.frames[0].isSpotsShown()){return;}
						dojo.query(".caption",currEl).style({ display:"none" });
						window.event.cancelBubble = true;
						
					});
				})(currEl)
			);
		}
	}
}

/**
* This function un-highlight all marketing spots and catalog objects in preview mode, overwriting the implementation in site level (StorePreviewerHeader.jsp)
*/
function hideSpots(){
	dojo.removeClass(document.body,'editMode');
	dojo.query('.carousel > .content').style({zIndex:''});
	dojo.query(".ESpotInfo").style({ display:"none" });
	dojo.query(".caption").style({ display:"none" });
	dojo.query(".searchScore").style({ display:"none" });
	dojo.query(".editManagedContent").style({ display:"none" });
	dojo.query(".borderCaption").style({ display:"none" });
	dojo.query(".emptyESpot").forEach(function(e){
		dojo.style(e,{'width':dojo.attr(e,'_width')+'px'});
		dojo.style(e,{'height':dojo.attr(e,'_height')+'px'});
		});
	
}

/**
* This function resets the mini cart cookie values, then continues to log off the shopper.
*/
function logout(url){
	setDeleteCartCookie();
	document.location.href = url;
}
