/* Script imported from http://www.cvs.com/webcontent/js/store-pickup/module-store-pickup.js */
'use strict';

var CVSJS = CVSJS || {};
window.CVSJS.Bopus = window.CVSJS.Bopus || {};


//--------------------------------------------------------------------------------------------------------------------
//------------------- CONFIGURATION ----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

CVSJS.Bopus.Data = {
	storeavailability: [],
	addeditem: [],
	mystore: {},
};

CVSJS.Bopus.Globals = {
	skuID: "",
	mystoreID: "",
	productSPUInd: "",
	sessionId: "",
	orderId: "",
	addToCartRestUrl: "",
	upcNumber: "",
	itemStocklevel: "",
	salePrice: "",
	listPrice: "",
	bohStatus: "",
	storeSPUInd: "",
	productDetailShowError: false,
	productDetail: false,
	addItemToCartError: "",
	addItemToCartStatusCode: "",
	addItemToCartAdjustedValue: "",
	renderNoResults: false,
	spuFlag: ""
};

CVSJS.Bopus.Defaults = {
	bingMapKey: ''
}


CVSJS.Bopus.Global = {
	getJSONItemAvailability: function( serviceurl, requestData, requestType ){
		var returnjson = "";
		
		var type = requestType ? requestType : "POST";

		$.ajax({
			url: "/rest/bean" + serviceurl,
			async: false,
			type: type,
			data: requestData,
			dataType: "json",
			success: function( json ){
				if( json.atgResponse ){
					returnjson = json.atgResponse;
				}else{
					returnjson = { error: "500" };
				}
			},
			error: function(xhrObj, errorType, errorThrown){
				if(errorType == "timeout"){
					returnjson = { error: "999" };
				}else{
					returnjson = { error: "500" };
				}
			}
		});
		
		return returnjson;
	}
}

CVSJS.Bopus.ErrorMsgs = {
	sGetAvailableStores: 	"we were unable to process your store search",
	sNotProduct:			"we were unable to look up the product",
	sOutOfStock:            "this item is not available at your store. You can check availability at nearby stores or search for another location.",
	sSearchStoreNoInfo:     "Please enter a ZIP Code, City and State, Street Address or Store Number.", 
	solTryAgain:			"Please try again.",
	sSorry: 				"Sorry, ", 
	sQuantity: 				"Please note: Quantity has been adjusted to reflect item availability.", 
}

CVSJS.StoreLoc.build = function( context, solution, errCode ){
	var usrCode
	if(errCode && errCode != "99"){
		if(errCode === "999"){ //timeout
			usrCode = "[E1]";
		}else if(errCode === "500"){
			usrCode = "[E2]";
		}else{
			usrCode = "[E3]";
		}
		return "Sorry, " + context + ". " + solution + " " + usrCode;
	}
	return "";
}


CVSJS.Bopus.Services = {
	URL: {
		getStoreDetails: "/cvs/store/CvsStoreLocatorServices/getStoreIdDetails",
		getStoreInventoryValues: "/cvs/catalog/CvsBohServiceHandler/storeInventoryValues"

	},
	//Store Locator
	getBingResults: function( queryData, suggest, callback ){
		var returnData = "";
		var countryRegion = 'US';
		var intRegex = /^\d+$/;
		var searchString = $.trim(queryData);

		CVSJS.Bopus.Services.getBingKey();

		if(intRegex.test(searchString)){
			if(searchString.length < 6){
				var trimmedStr = searchString.replace(/^0+/, "");
				if(trimmedStr.length === 3){
					searchString = trimmedStr;
				}
			}

			if(suggest) {
				// setup "did you mean store #xxxx" search option
				if (searchString.length <= 5) {
					var checkStoreId = CVSJS.Bopus.Services.getStoreDetails(searchString);
					if (checkStoreId && checkStoreId.sm != null) {
						var suggestStoreId = 'Did you mean Store <strong>#' + trimmedStr + '</strong>? <a class="searchtermlink" href="#" data-storeid="' + trimmedStr + '" title="View details for this store">View details for this store.</a>';
						$('#suggestStoreId').html(suggestStoreId).show();
					}
				}
			}
			
			if(searchString.length === 1 || searchString.length === 2){
				if(searchString.length === 1){
					searchString = "0000" + searchString;
				}else if(searchString.length === 2){
					searchString = "000" + searchString;
				}
			}else if(searchString.length === 3){
				searchString = "00" + searchString;
				countryRegion = "PR";
			}else if(searchString.length === 4){
				searchString = "0" + searchString;
			}
		}
		var bingprotocol = window.location.protocol;
		var restprotocol = "http:";
		if (bingprotocol != null && bingprotocol != "" && bingprotocol === "https:"){
			restprotocol = "https:";
		}
		
		var bingURL = restprotocol+"//dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchString) + "," + countryRegion + "&output=json&key=" + CVSJS.Bopus.Defaults.bingMapKey + "&$filter=Cvs_Store_Flag%20Eq%20'Y'" + "&jsonp=?";
		
		$.getJSON( bingURL, function( data ){
			if(data && data.resourceSets.length > 0 && data.statusCode == "200"){
				return callback(data.resourceSets[0].resources, searchString, data.resourceSets[0].estimatedTotal);
			}else{
				return callback([], searchString, 0);
			}
		}).fail(function(){
			return callback([], searchString, 0);
		});

	},
	getStoreInventoryValues: function(reqData) {
		var data = CVSJS.Bopus.Global.getJSONItemAvailability( CVSJS.Bopus.Services.URL.getStoreInventoryValues, reqData); 
		if(data) {
			CVSJS.Bopus.Data.storeavailability = data;
		}else if(data && data.error){
			CVSJS.Bopus.Helper.growl(data.error, CVSJS.Bopus.ErrorMsgs.build(CVSJS.Bopus.ErrorMsgs.sGetAvailableStores, CVSJS.Bopus.ErrorMsgs.solTryAgain, data.error));
		}
	},
    getStoreDetails: function(storeId) {
        var data = CVSJS.StoreLoc.Global.getJSON( CVSJS.Bopus.Services.URL.getStoreDetails, {storeId: storeId}); 
        return data; 
    },
    getBingKey: function() {
    	CVSJS.Bopus.Defaults.bingMapKey = $('#dStorePickupAvailabilityOverlay .bingkey').data('bingmapskey');
    }
}

//Miscellaneous helper functions
CVSJS.Bopus.Helper = {
	growl: function(code, message, sticky, life){
			alert('Error occured! ' + code + ' ' + message );
	}
}




//--------------------------------------------------------------------------------------------------------------------
//------------------- Item Availability ----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

CVSJS.Bopus.ItemAvailability = {
	load: function(){
		$('#dStorePickupAvailabilityOverlay #btnFindAvailableStores').live('click', function(evElem) {
			CVSJS.Bopus.ItemAvailability.findstores(evElem);
		});
		$('#dStorePickupAvailabilityOverlay .details #iSearchAvail').live('keydown', function(evElem) {
			CVSJS.Bopus.ItemAvailability.checkforenter(evElem);
		});
		$('#dStorePickupAvailabilityOverlay .details .addToBasket').live('click', function(evElem) {
			CVSJS.Bopus.ItemAvailability.clearError(evElem);
			var that = this;
			CVSJS.Bopus.ItemAvailability.tealiumAddToBasket(that); 
		});
		$('#dStorePickupAvailabilityOverlay .details li.searchtermlink').live('click', function(evElem) {
			CVSJS.Bopus.ItemAvailability.selectsearchterm(evElem);
		});
		$('#dStorePickupAvailabilityOverlay .details a.searchtermlink').live('click', function(evElem) {
			CVSJS.Bopus.ItemAvailability.findSpecificStore(evElem);
		});
		$('#dStorePickupAvailabilityOverlay .details .quantity').live('keydown', function(evElem) {
			CVSJS.Bopus.ItemAvailability.validateQty(evElem);
		});
		$('.shoppingBtns .reload').live('click', function(evElem) {
			CVSJS.Bopus.ItemAvailability.reloadPage(evElem);
		});
		// Lets kick it off!
		CVSJS.Bopus.ItemAvailability.render();
	},
	findstores: function(ev, lat, long) {
		$('#dStorePickupAvailabilityOverlay .modalContainerAvailTable').scrollTop(0);
		CVSJS.Bopus.ItemAvailability.showSpinner();
		CVSJS.Bopus.ItemAvailability.clearError();
		CVSJS.Bopus.ItemAvailability.hidesuggestsearch();
		var $targetEl;
		if(ev.target){
			$targetEl = $(ev.target);
		}else if(window.event.srcElement){
			$targetEl = $(window.event.srcElement);
		}else{
			$targetEl = $(ev.target);
		}
		//Check if empty and show errors
		if($targetEl && $.trim($("#dStorePickupAvailabilityOverlay #iSearchAvail").val()) === ""){
			if(($targetEl.attr("id") === "btnFindAvailableStores" || $targetEl.attr("id") === "iSearchAvail") || $targetEl.hasClass("findlink")){ //hasClass test is for Chrome
				CVSJS.Bopus.ItemAvailability.renderErrorNoInfo();
			}
		}else{
			CVSJS.Bopus.ItemAvailability.toggleFindStoreBtn(); // Disabling the Find Store button
			if( lat && long ){	
				//We have lat/long from a clicked link in the suggest box
				//This shows up with longer search and displays addresses
				if(CVSJS.Bopus.Globals.skuID) {
					CVSJS.Bopus.Services.getStoreInventoryValues({ productId: CVSJS.Bopus.Globals.skuID, productSPUInd: CVSJS.Bopus.Globals.productSPUInd, favstore: "NULL", geolatitude: lat, geolongitude: long });

					if(CVSJS.Bopus.Data.storeavailability.length > 0){
						CVSJS.Bopus.ItemAvailability.clearNearbyStoreList();
						$.each( CVSJS.Bopus.Data.storeavailability, function( index, value ) {
							var storeEntry = CVSJS.Bopus.ItemAvailability.renderStores(value, false);
							$('#dStorePickupAvailabilityOverlay #storeData').append(storeEntry);
						});
						CVSJS.Bopus.ItemAvailability.showSearchResults();
						CVSJS.Bopus.ItemAvailability.tealiumStoreAvailSearch('');
						
					}else{
			 			CVSJS.Bopus.Globals.renderNoResults = true;
			 		}
			 	}
			}else{
				//We only have a search term, send it to bing to get results
				CVSJS.Bopus.Services.getBingResults($("#dStorePickupAvailabilityOverlay #iSearchAvail").val(), true, function(bingResults, searchTerm, totalPlaces){
					if (totalPlaces > 1){
						var matchedaddress = false;
						var appendHTML = "";

						//This tests to see if Bing came back with a place name or an address, if so we use it
						for(var i=0;i < bingResults.length;i++)	{
							if((i+1) < bingResults.length && bingResults[i].name==bingResults[i+1].name){
							matchedaddress = true;
							break;
							}
						}
						//shows the suggested matches
						for(var i=0;i<bingResults.length;i++)	{
							if(matchedaddress){
								if(bingResults[i].address.countryRegion === "United States" || bingResults[i].address.countryRegion === "Puerto Rico"){
									var address="";
									if(bingResults[i].address.formattedAddress != null){
										address = address + bingResults[i].address.formattedAddress;
									}
									if(bingResults[i].address.adminDistrict2 != null && address != ''){
										address = address + ', ' + bingResults[i].address.adminDistrict2;
									}else if(bingResults[i].address.adminDistrict != null){
										address = address+', ' + bingResults[i].address.adminDistrict;
									}				 					 			 					
									appendHTML += "<li class=\"searchtermlink\"><a href='#' data-latitude='" + bingResults[i].point.coordinates[0] + "' data-longitude='" + bingResults[i].point.coordinates[1] + "' title='" + address + "'>" + address + "</a></li>";
								}	
							} else {
								if(bingResults[i].address.countryRegion === "United States" || bingResults[i].address.countryRegion === "Puerto Rico"){
									appendHTML += "<li class=\"searchtermlink\"><a href='#' data-latitude='" + bingResults[i].point.coordinates[0] + "' data-longitude='" + bingResults[i].point.coordinates[1] + "' title='" + bingResults[i].name + "'>" + bingResults[i].name + "</a></li>";
								}
							}
						}
						if(appendHTML != ""){
							$("#dStorePickupAvailabilityOverlay #suggestions ul").html(appendHTML);
							$("#dStorePickupAvailabilityOverlay #suggestBoxHolderCont").show();
						}else{
							CVSJS.Bopus.Globals.renderNoResults = true;
						}
					}else if (totalPlaces === 1){
						var validResult = false;
						if(bingResults[0].address){
							if(bingResults[0].address.postalCode){
								if(bingResults[0].address.postalCode != $("#iSearchAvail").val()){
									$("#dStorePickupAvailabilityOverlay #iSearchAvail").val(bingResults[0].address.formattedAddress);
								}
								validResult = true;
							}else if(bingResults[0].name != "United States" && bingResults[0].name != "Puerto Rico"){
								$("#dStorePickupAvailabilityOverlay #iSearchAvail").val(bingResults[0].address.formattedAddress);
								validResult = true;
							}
						}
						if( validResult ){
							// valid results and now has the geo points
							// Check for product ID
							if(CVSJS.Bopus.Globals.skuID) {
								CVSJS.Bopus.Services.getStoreInventoryValues({ productId: CVSJS.Bopus.Globals.skuID, productSPUInd: CVSJS.Bopus.Globals.productSPUInd, favstore: "NULL", geolatitude: bingResults[0].point.coordinates[0], geolongitude: bingResults[0].point.coordinates[1] });
								if(CVSJS.Bopus.Data.storeavailability.length > 0){
									// Spit out results
									CVSJS.Bopus.ItemAvailability.clearNearbyStoreList();
									$.each( CVSJS.Bopus.Data.storeavailability, function( index, value ) {
										var storeEntry = CVSJS.Bopus.ItemAvailability.renderStores(value, false);
										$('#dStorePickupAvailabilityOverlay #storeData').append(storeEntry);
									});
									CVSJS.Bopus.ItemAvailability.showSearchResults();
									CVSJS.Bopus.ItemAvailability.tealiumStoreAvailSearch('');
								}else{				 			
									CVSJS.Bopus.Globals.renderNoResults = true;
								}
							} else {
								CVSJS.Bopus.Globals.renderNoResults = true;
							}
						}else{
							CVSJS.Bopus.Globals.renderNoResults = true;
						}
					}else{
						CVSJS.Bopus.Globals.renderNoResults = true;
					}
					if(CVSJS.Bopus.Globals.renderNoResults) {
						CVSJS.Bopus.Globals.renderNoResults = false;
						CVSJS.Bopus.ItemAvailability.renderNoResults();
						CVSJS.Bopus.ItemAvailability.tealiumStoreAvailSearch(CVSJS.Bopus.ErrorMsgs.sSorry + CVSJS.Bopus.ErrorMsgs.sGetAvailableStores);
					}
				});

			}
			if(CVSJS.Bopus.Globals.renderNoResults) {
				CVSJS.Bopus.Globals.renderNoResults = false;
				CVSJS.Bopus.ItemAvailability.renderNoResults();
				CVSJS.Bopus.ItemAvailability.tealiumStoreAvailSearch(CVSJS.Bopus.ErrorMsgs.sSorry + CVSJS.Bopus.ErrorMsgs.sGetAvailableStores);
			}
			CVSJS.Bopus.ItemAvailability.toggleFindStoreBtn(); // Enabling the Find Store button
		}
		return false;
	},
	findSpecificStore: function(ev) {
		ev.preventDefault();
		CVSJS.Bopus.ItemAvailability.clearError();
		CVSJS.Bopus.ItemAvailability.showSpinner();
		var $targetEl = $(ev.target);
		if(CVSJS.Bopus.Globals.skuID) {
			CVSJS.Bopus.Services.getStoreInventoryValues({ productId: CVSJS.Bopus.Globals.skuID, productSPUInd: CVSJS.Bopus.Globals.productSPUInd, favstore: $targetEl.data("storeid"), geolatitude: "NULL", geolongitude: "NULL" });
			// Render this store and state for the store
			CVSJS.Bopus.ItemAvailability.renderSelectedStoreInfo(false);
			CVSJS.Bopus.ItemAvailability.hideSuggestStoreId();
		} else {
			// No Product ID
			CVSJS.Bopus.ItemAvailability.renderNoProductID();
		}
		return false;
	},
	render: function() {
		// Reset view - clear error, hide stores
		$('#dStorePickupAvailabilityOverlay .modalContainerAvailTable').scrollTop(0);
		CVSJS.Bopus.ItemAvailability.clearError();
		CVSJS.Bopus.ItemAvailability.hideNearbyStoreList();
		CVSJS.Bopus.ItemAvailability.clearNearbyStoreList();
		CVSJS.Bopus.ItemAvailability.hideSelectedStoreInfo();
		// Check if there is a product ID
		if(CVSJS.Bopus.Globals.skuID) {
			if(CVSJS.Bopus.Globals.mystoreID && CVSJS.Bopus.Globals.mystoreID != "null") {
				$("#dStorePickupAvailabilityOverlay #dStoreResultsLoading").show();
				// Check webservice with this selected store and product to find state of the item
				CVSJS.Bopus.Services.getStoreInventoryValues({ productId: CVSJS.Bopus.Globals.skuID, productSPUInd: CVSJS.Bopus.Globals.productSPUInd, favstore: CVSJS.Bopus.Globals.mystoreID, geolatitude: "NULL", geolongitude: "NULL" });
				// Render this store and state for the store
				CVSJS.Bopus.ItemAvailability.renderSelectedStoreInfo(true);
				// Checks to see if we need to throw an error
				if(CVSJS.Bopus.Globals.productDetailShowError) {
					if(CVSJS.Bopus.Globals.addItemToCartStatusCode == "1" || CVSJS.Bopus.Globals.addItemToCartStatusCode == "3") {
						if(CVSJS.Bopus.Globals.addItemToCartError) {
							CVSJS.Bopus.ItemAvailability.renderAddToCartError(CVSJS.Bopus.Globals.addItemToCartError);
							CVSJS.Bopus.Globals.productDetailShowError = false;
						}
					}
					// Status 2 is qty too much
					if(CVSJS.Bopus.Globals.addItemToCartStatusCode == "2") {
						$('.modalItemQty').addClass('textR');
						$('.modalItemQty .quantity').val(CVSJS.Bopus.Globals.addItemToCartAdjustedValue);
						CVSJS.Bopus.ItemAvailability.renderAddToCartError(CVSJS.Bopus.ErrorMsgs.sQuantity);
						CVSJS.Bopus.ItemAvailability.tealiumStoreAvail(CVSJS.Bopus.Data.storeavailability[0].StoreSPUInd, CVSJS.Bopus.Globals.productSPUInd, CVSJS.Bopus.Data.storeavailability[0].bohStatus, CVSJS.Bopus.Globals.mystoreID, CVSJS.Bopus.Globals.skuID, CVSJS.Bopus.Globals.addItemToCartAdjustedValue, CVSJS.Bopus.ErrorMsgs.sQuantity, '', '', 'SHOP: BOPUS: Store Pickup Overlay: QuantityError', 'BOPUS');

					}
				}
			} else {
				// No Fav Store Selected: Nothing else to do
				CVSJS.Bopus.ItemAvailability.tealiumStoreAvail('', '', '', '', CVSJS.Bopus.Globals.skuID, '', '', '', '', 'SHOP: BOPUS: Store Pickup Overlay', 'BOPUS')
			}
		} else {
			// No Product ID
			CVSJS.Bopus.ItemAvailability.renderNoProductID();
		}
		CVSJS.Bopus.ItemAvailability.setCookie();
	},
	renderSelectedStoreInfo: function(firstRender) {
		if(CVSJS.Bopus.Data.storeavailability.length > 0){
			CVSJS.Bopus.ItemAvailability.clearNearbyStoreList();
			var count = 0;
			$.each( CVSJS.Bopus.Data.storeavailability, function( index, value ) {
				if(count == 0 && firstRender == true) {
					var favstoreEntry = CVSJS.Bopus.ItemAvailability.renderStores(value, true);
					$('#dStorePickupAvailabilityOverlay .mdlCtnStoreInfo').html(favstoreEntry);
					CVSJS.Bopus.ItemAvailability.showSelectedStoreInfo();
				} else {
			 		var storeEntry = CVSJS.Bopus.ItemAvailability.renderStores(value, false);
			 		$('#dStorePickupAvailabilityOverlay #storeData').append(storeEntry);
			 	}
			 	count++;
			 });
			CVSJS.Bopus.ItemAvailability.showSearchResults();

		}else{	
			CVSJS.Bopus.ItemAvailability.renderNoResults();
		}
	},
	reRenderWithErrors: function(curElement) {
		//statusCode - 1 Generic Fail,  2 qty too much, 3 out of stock
		if(CVSJS.Bopus.Globals.addItemToCartError) {
			if(CVSJS.Bopus.Globals.addItemToCartStatusCode == "1" || CVSJS.Bopus.Globals.addItemToCartStatusCode == "3") {
				CVSJS.Bopus.ItemAvailability.renderAddToCartError(CVSJS.Bopus.Globals.addItemToCartError);
			}
		}
		// Status 2 is qty too much
		if(CVSJS.Bopus.Globals.addItemToCartStatusCode == "2") {
			if(curElement) {
				$(curElement).parent().prev().addClass('textR');
				$(curElement).parent().prev().find('.quantity').val(CVSJS.Bopus.Globals.addItemToCartAdjustedValue);
				CVSJS.Bopus.ItemAvailability.renderAddToCartError(CVSJS.Bopus.ErrorMsgs.sQuantity);
				CVSJS.Bopus.ItemAvailability.tealiumStoreAvail(CVSJS.Bopus.Data.storeavailability[0].StoreSPUInd, CVSJS.Bopus.Globals.productSPUInd, CVSJS.Bopus.Data.storeavailability[0].bohStatus, CVSJS.Bopus.Globals.mystoreID, CVSJS.Bopus.Globals.skuID, CVSJS.Bopus.Globals.addItemToCartAdjustedValue, CVSJS.Bopus.ErrorMsgs.sQuantity, '', '', 'SHOP: BOPUS: Store Pickup Overlay: QuantityError', 'BOPUS');

			} else {
				$('.modalItemQty').addClass('textR');
				$('.modalItemQty .quantity').val(1);
			}
		}
		$("#overlayCloseAdd").click();
		$("#dStorePickupAvailabilityOverlay").overlay({
			oneInstance: false,
			fixed: false,
			  onLoad: function() {
			    if($("#exposeMask").is(":hidden"))$("#exposeMask").show();
			  },
			  onBeforeLoad: function() {
			     if($("#exposeMask").is(":hidden"))$("#exposeMask").show();
			  },
			  onClose: function () {
				//for multiple overlay masking onclose visible
	 			if($("#exposeMask").is(":visible"))$("#exposeMask").hide();
	 		},
		});
		$("#dStorePickupAvailabilityOverlay").overlay().load();
	},
	renderAddToCartError: function(errorMsg) {
		//Error adding item to cart
		$('#dStorePickupAvailabilityOverlay .modalContainerError .errorPadd ol').html('<li>'+ errorMsg + '</li>');
		CVSJS.Bopus.ItemAvailability.showError();
	},
	renderErrorNoInfo: function() {
		//Error showing no information in search
		$('#dStorePickupAvailabilityOverlay .modalContainerError .errorPadd ol').html('<li>'+ CVSJS.Bopus.ErrorMsgs.sSearchStoreNoInfo + '</li>');
		CVSJS.Bopus.ItemAvailability.showError();
		CVSJS.Bopus.ItemAvailability.tealiumStoreAvailSearch(CVSJS.Bopus.ErrorMsgs.sSearchStoreNoInfo);
	},
	renderNoResults: function() {
		//No results from search
		$('#dStorePickupAvailabilityOverlay .modalContainerError .errorPadd ol').html('<li>'+ CVSJS.Bopus.ErrorMsgs.sSorry + CVSJS.Bopus.ErrorMsgs.sGetAvailableStores + '</li>');
		CVSJS.Bopus.ItemAvailability.showError();
	},
	renderNoProductID: function() {
		//No product id 
		$('#dStorePickupAvailabilityOverlay .modalContainerError .errorPadd ol').html('<li>'+ CVSJS.Bopus.ErrorMsgs.sSorry + CVSJS.Bopus.ErrorMsgs.sNotProduct + '</li>');
		CVSJS.Bopus.ItemAvailability.showError();
	},
	renderErrorAddItem: function() {
		//Error adding item to cart
		$('#dStorePickupAvailabilityOverlay .modalContainerError .errorPadd ol').html('<li>'+ CVSJS.Bopus.Data.addeditem.error + '</li>');
		CVSJS.Bopus.ItemAvailability.showError();
	},
	renderStores: function(store, favStore) {
		var storeEntry = '',
			storeStatus = '';
		if(favStore) {
			//TODO
			if(store.bohStatus !== 'Out of Stock') {
				CVSJS.Bopus.ItemAvailability.tealiumStoreAvail(store.StoreSPUInd, store.spuEligible, store.bohStatus, store.storeId, CVSJS.Bopus.Globals.skuID, 1, '', '', '', 'SHOP: BOPUS: Store Pickup Overlay', 'BOPUS');
			}
			//Fav Store html
			var storeNumber = store.Phonenumber.slice(0,3) + '-'+ store.Phonenumber.slice(3);
			storeEntry +='<div class="modalStoreInfo"><span class="vertical-align">';
			storeEntry +='<span class="textR bold">myCVS </span><span class="addr">' + store.storeAddress + ", " + store.City + ", " + store.State + "  " + store.Zipcode + "&nbsp; &nbsp; &nbsp; &nbsp;" + '<nobr>' + store.Areacode + '-' + storeNumber + '</nobr></span></span></div>';
		} else {
			//store list html
			if(CVSJS.Bopus.Globals.mystoreID != store.storeId) {
				var storeNumber = store.Phonenumber.slice(0,3) + '-'+ store.Phonenumber.slice(3);
				storeEntry +='<div class="storeRow">';
				storeEntry +='<div class="address">';
				if(store.bohStatus == 'In Stock' && store.spuEligible && CVSJS.Bopus.Globals.spuFlag) {
					storeEntry +='<p class="textR bold">All of your store pickup items may not be available here.</p>';
				}
				storeEntry += store.storeAddress + ', ' + store.City + ', ' + store.State + ' ' + store.Zipcode + ' <br /> '  + store.Areacode + '-' + storeNumber + '  </div>';
			}
		}
		if(store.spuEligible && CVSJS.Bopus.Globals.spuFlag) {
			// Store and product are eligible for bopus
			if(favStore) {
				//Fav Store html
				storeEntry +='<div class="modalItemQty">';
				if(store.bohStatus == 'In Stock') {
					storeEntry +='<label for="quantity">Qty:</label> <input type="text" name="quantity" class="quantity" value="1" id="add-cart-quantity-fav-' + CVSJS.Bopus.Globals.mystoreID + '"></div>';
					storeEntry +='<div class="modalSubmitButton"><a href="#" title="Add to Basket" class="cvsbtn btn-red-med addToBasket" rel="#addToCart-overlay" data-prodid="' + CVSJS.Bopus.Globals.skuID + '" data-oid="' + CVSJS.Bopus.Globals.orderId + '" data-skuid="' + CVSJS.Bopus.Globals.skuID + '" data-tk="' + CVSJS.Bopus.Globals.sessionId + '" data-qty="add-cart-quantity-fav-' + CVSJS.Bopus.Globals.mystoreID + '" data-resturl="/rest/bean/atg/commerce/order/CvsAddToOrderHandler/addItemToOrder" data-otype="div" data-odiv="#modalDialogBoxBor" data-offer="null" data-storeId="' + CVSJS.Bopus.Globals.mystoreID + '" data-inStore="true" data-storespuind="' + store.StoreSPUInd + '" data-productspuind="' + store.spuEligible + '" data-productqty="' + store.Qty + '" data-stockstatus= "' + store.bohStatus + '" data-upcnumber="' + CVSJS.Bopus.Globals.upcNumber +'"> <span class="left"></span><span class="center"style="padding: 0;">Pick Up In Store</span><span class="right"></span></a></div>';
					storeEntry +='</div>';
				} else {
					storeEntry +='</div><div class="modalSubmitButton notAvail"><span class="vertical-align">';
					if(store.bohStatus == 'Out of Stock') {
						var errorMsg = CVSJS.Bopus.ErrorMsgs.sSorry + CVSJS.Bopus.ErrorMsgs.sOutOfStock;
						CVSJS.Bopus.ItemAvailability.renderAddToCartError(errorMsg);
						CVSJS.Bopus.ItemAvailability.tealiumStoreAvail(store.StoreSPUInd, store.spuEligible, store.bohStatus, store.storeId, CVSJS.Bopus.Globals.skuID, 0, errorMsg, '', '', 'SHOP: BOPUS: Store Pickup Overlay: OutOfStock', 'BOPUS');
					} else {
						storeStatus = CVSJS.Bopus.ItemAvailability.renderStoreAvailabilityStatus(store.bohStatus);
					}
					storeStatus = CVSJS.Bopus.ItemAvailability.renderStoreAvailabilityStatus(store.bohStatus);
					storeEntry += storeStatus;
					storeEntry +='</span></div></div>';
				}
			} else {
				//store list html
				if(CVSJS.Bopus.Globals.mystoreID != store.storeId) {
					storeEntry +='<div class="amt">';
					if(store.bohStatus == 'In Stock') {
						storeEntry +='<label for="quantity">Qty:</label> <input type="text" name="quantity" class="quantity" value="1" id="add-cart-quantity-list-' + store.storeId + '"></div>';					
						storeEntry +='<div class="availability"><a href="#" title="Add to Basket" class="cvsbtn btn-red-med addToBasket strSearch" rel="#addToCart-overlay" data-prodid="' + CVSJS.Bopus.Globals.skuID + '" data-oid="' + CVSJS.Bopus.Globals.orderId + '" data-skuid="' + CVSJS.Bopus.Globals.skuID + '" data-tk="' + CVSJS.Bopus.Globals.sessionId + '" data-qty="add-cart-quantity-list-' + store.storeId + '" data-resturl="/rest/bean/atg/commerce/order/CvsAddToOrderHandler/addItemToOrder" data-otype="div" data-odiv="#modalDialogBoxBor" data-offer="null" data-storeId="' + store.storeId + '" data-inStore="true" data-storespuind="' + store.StoreSPUInd + '" data-productspuind="' + store.spuEligible + '" data-productqty="' + store.Qty + '" data-stockstatus= "' + store.bohStatus + '" data-upcnumber="' + CVSJS.Bopus.Globals.upcNumber +'"> <span class="left"></span><span class="center"style="padding: 0;">Pick Up In Store</span><span class="right"></span></a></div>';
						storeEntry +='</div>';
					} else {
						storeEntry +='</div><div class="availability">';
						storeStatus = CVSJS.Bopus.ItemAvailability.renderStoreAvailabilityStatus(store.bohStatus);
						storeEntry += storeStatus;
						storeEntry +='</div></div>';
					}
				}
			}
		} else {
			// Store and Product is not eligible
			if(favStore) {
				//Fav Store html
				storeEntry +='<div class="modalItemQty"></div>';
				storeEntry +='<div class="modalSubmitButton notAvail"><span class="vertical-align">';
				if(store.bohStatus == 'Out of Stock') {
					var errorMsg = CVSJS.Bopus.ErrorMsgs.sSorry + CVSJS.Bopus.ErrorMsgs.sOutOfStock;
					CVSJS.Bopus.ItemAvailability.renderAddToCartError(errorMsg);
					CVSJS.Bopus.ItemAvailability.tealiumStoreAvail(store.StoreSPUInd, store.spuEligible, store.bohStatus, store.storeId, CVSJS.Bopus.Globals.skuID, store.Qty, errorMsg, '', '', 'SHOP: BOPUS: Store Pickup Overlay: OutOfStock', 'BOPUS');
				} else {
					storeStatus = CVSJS.Bopus.ItemAvailability.renderStoreAvailabilityStatus(store.bohStatus);
				}
				storeEntry += storeStatus;
				storeEntry +='</span></div></div>';
			} else {
				//store list html
				if(CVSJS.Bopus.Globals.mystoreID != store.storeId) {
					storeEntry +='<div class="amt"></div>';
					storeEntry +='<div class="availability">';
					storeStatus = CVSJS.Bopus.ItemAvailability.renderStoreAvailabilityStatus(store.bohStatus);
					storeEntry += storeStatus;
					storeEntry +='</div></div>';
				}
			}
		}
		return storeEntry;
	},
	renderStoreAvailabilityStatus: function(status) {
		switch(status) {
			case 'In Stock':
				return 'Available';
				break;
			case 'Out of Stock':
				return 'Not Available';
				break;
			case 'Unknown':
				return 'Not Sold At This Store';
			case 'Error':
				return 'Availability Unknown';
				break;
			default:
				return 'Availability Unknown';
				break;
		}
	},
	showSearchResults: function(){
		$("#dStorePickupAvailabilityOverlay #suggestBoxHolderCont").hide();
		$("#dStorePickupAvailabilityOverlay #dStoreResultsLoading").hide();
		$("#dStorePickupAvailabilityOverlay .modalContainerAvail").show();
	},
	toggleFindStoreBtn: function() {
		//Disable search btn
		var actionBtn=$("#dStorePickupAvailabilityOverlay #btnFindAvailableStores");
		if(actionBtn.is(":disabled")){
			actionBtn.removeAttr("disabled");
		}else{
			actionBtn.attr("disabled","disabled");
		}
	},
	checkforenter: function(ev) {
		if(ev.keyCode === 13){
			ev.preventDefault();
			CVSJS.Bopus.ItemAvailability.findstores(ev);
		}
	},
	validateQty: function(ev) {
		 // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(ev.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (ev.keyCode == 65 && ev.ctrlKey === true) || 
             // Allow: home, end, left, right
            (ev.keyCode >= 35 && ev.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((ev.shiftKey || (ev.keyCode < 48 || ev.keyCode > 57)) && (ev.keyCode < 96 || ev.keyCode > 105)) {
            ev.preventDefault();
        }
	  return false;
	},
	showSpinner: function() {
		$('#dStorePickupAvailabilityOverlay #suggestBoxHolderCont').hide();
		$('#dStorePickupAvailabilityOverlay #dStoreResultsLoading').show();
		CVSJS.Bopus.ItemAvailability.hideNearbyStoreList();
		$('#dStorePickupAvailabilityOverlay .mdlCtnStoreInfo .modalItemQty').removeClass('textR');
		$('#dStorePickupAvailabilityOverlay .modalContainerAvailTable .storeRow .amt').removeClass('textR');
		$('#dStorePickupAvailabilityOverlay .modalContainerAvailTable').scrollTop(0);
		return false;
	},
	clearError: function() {	
		$('#dStorePickupAvailabilityOverlay .modalContainerError').hide();
		$('#dStorePickupAvailabilityOverlay #formerrorswrapper li').remove();
		$('#dStorePickupAvailabilityOverlay .mdlCtnStoreInfo .modalItemQty').removeClass('textR');
		$('#dStorePickupAvailabilityOverlay .modalContainerAvailTable .storeRow .amt').removeClass('textR');
	},
	clearNearbyStoreList: function () {
		$('#dStorePickupAvailabilityOverlay #storeData').html('');
		return false;
	},
	showError: function(){
		$('#dStorePickupAvailabilityOverlay .modalContainerError').show();
		$("#dStorePickupAvailabilityOverlay #dStoreResultsLoading").hide();
		return false;
	},
	showSelectedStoreInfo: function() {
		$('#dStorePickupAvailabilityOverlay .mdlCtnStoreInfo').show();
		return false;
	},
	hidesuggestsearch: function(){
		$("#dStorePickupAvailabilityOverlay #suggestBoxHolderCont").hide();
		return false;
	},
	hideSuggestStoreId: function() {
		$('#dStorePickupAvailabilityOverlay #suggestStoreId').hide();
		return false;
	},
	hideSelectedStoreInfo: function() {
		$('#dStorePickupAvailabilityOverlay .mdlCtnStoreInfo').hide();
		return false;
	},
	hideNearbyStoreList: function() {
		$('#dStorePickupAvailabilityOverlay .modalContainerAvail').hide();
		return false;
	},
	selectsearchterm: function(ev) {
		ev.preventDefault();
		CVSJS.Bopus.ItemAvailability.clearError();
		CVSJS.Bopus.ItemAvailability.showSpinner();
		var $targetEl;
		if(ev.target){
			$targetEl = $(ev.target);
		}else if(window.event.srcElement){
			$targetEl = $(window.event.srcElement);
		}else{
			$targetEl = $(ev.target);
		}
		$("#iSearchAvail").val($targetEl.html());
		CVSJS.Bopus.ItemAvailability.findstores( ev, $targetEl.data("latitude"), $targetEl.data("longitude") );
		CVSJS.Bopus.ItemAvailability.hidesuggestsearch();
		return false;
	},
	reloadPage: function(ev) {
		window.location.hash = "";
		ev.preventDefault();
		location.reload();
	},
	setCookie: function() {
		var exdays = 0;
		if(exdays) {
		  var d = new Date();
		  d.setTime(d.getTime()+(exdays*24*60*60*1000));
		  var expires = "expires="+d.toGMTString();
		}
		window.location.hash = "#pickupoverlay";
		document.cookie = 'StorePickup_SkuID' + "=" + CVSJS.Bopus.Globals.skuID + "; " + expires + " ; path=/";
		document.cookie = 'StorePickup_Path' + "=" + window.location + "; " + expires + " ; path=/";
	},
	getCookie: function(c_name) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1) {
			c_start = c_value.indexOf(c_name + "=");
		}
		if (c_start == -1){
			c_value = null;
		}else{
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1){
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start,c_end));
		}
		return c_value;

	},
	checkCookie: function() {
		if(window.location.hash == '#pickupoverlay') {
			var path = CVSJS.Bopus.ItemAvailability.getCookie('StorePickup_Path');
			var skuId = CVSJS.Bopus.ItemAvailability.getCookie('StorePickup_SkuID');
			if(path && skuId) {
				if(window.location.href == path) {
					$('#skuId-'+ skuId).click();
				}
			}
		}

	},
	tealiumAddToBasket: function (btn, evntName) {
		var $btn = $(btn),
			storeSpuInd =  $btn.data('storespuind'),
			productSpuInd =  $btn.data('productspuind'),
			bohStatus = $btn.data('stockstatus'),
			storeId = $btn.data('storeid'),
			skuId = $btn.data('skuid'),
			qtyId =  $btn.data('qty'),
			productQty = $('#'+qtyId).val(),
			eventName = 'BOPUS:StorePickupOverlay:PickUpInStore';
		if(evntName) {
			eventName = evntName;
		}
		utag.link({ bopus_eligible_store_flag: storeSpuInd, bopus_eligible_product_flag: [productSpuInd], bopus_stock: [bohStatus], my_cvs_store_id: storeId, product_sku_id: [skuId], product_quantity: [productQty], event_name:eventName, event_category: 'BOPUS' });
	},
	tealiumStoreAvail: function (eligibleStore, eligibleProduct, stock, storeId, skuId, productQty, errors, eventName, eventCat, pageName, pageCat) {
		utag.view({bopus_eligible_store_flag: eligibleStore, bopus_eligible_product_flag: [eligibleProduct], bopus_stock: [stock], my_cvs_store_id: storeId, product_sku_id: [skuId], product_quantity: [productQty], field_errors: errors, event_name: eventName, event_category: eventCat, page_name: pageName, page_category: pageCat });
	},
	tealiumStoreAvailSearch: function (errors) {
		utag.link({  field_errors: errors, event_name: 'BOPUS:StoreSelectorOverlay:PickUpInStoreSearch', event_category: 'BOPUS' });
	}
}



//--------------------------------------------------------------------------------------------------------------------
//------------------- SHOPPING CART ----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

CVSJS.Bopus.ShoppingCartTabs = {
	load: function(){
		var arr = [];
		$("div[id^='storepickupTabsWrap']").attr('id', function(i) {
			arr.push("storepickupTabsWrap-item" + ++i);			
	    });
		$(function() {
			$.each(arr, function(i, val) {
				$("#" + val).tabs();
			});
		});
	}
}


//--------------------------------------------------------------------------------------------------------------------
//------------------- TAX TOOLTIP----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

$('#tooltiptaxHelp').live('click', function(evElem) {
	$('.taxtooltip').show();
});

$('.taxtooltip .close').live('click', function(evElem) {
	$('.taxtooltip').hide();
});


//--------------------------------------------------------------------------------------------------------------------
//------------------- STORE PICKUP INFORMAIION -----------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

CVSJS.Bopus.StorePickupInformationForm = {
	load: function(){
		$('#CheckoutTop').click(function(evElem) {
			CVSJS.Bopus.StorePickupInformationForm.validateForm(evElem);
		});
		$('#phoneNumber').live('keydown', function(evElem) {
			CVSJS.Bopus.StorePickupInformationForm.phoneNumberInput(evElem);
		});
		$('#phoneNumber').live('keyup', function(evElem) {
			 CVSJS.Bopus.StorePickupInformationForm.phoneFormat( $('#phoneNumber').val());
			 CVSJS.Bopus.StorePickupInformationForm.phoneNum(evElem);
		});

		$('#firstName').live('keyup', function(evElem) {
			 CVSJS.Bopus.StorePickupInformationForm.firstName(evElem);
		});
		$('#lastName').live('keyup', function(evElem) {
			 CVSJS.Bopus.StorePickupInformationForm.lastName(evElem);
		});
		$('#email').live('keyup', function(evElem) {
			 CVSJS.Bopus.StorePickupInformationForm.email(evElem);
		});
		$('#smsCheckbox').click(function(evElem) {
			CVSJS.Bopus.StorePickupInformationForm.smsCheck(evElem);
		});
	},
	firstName: function (ev) {
		var $firstName = $("#firstName"),
			currentView = this;

		if($.trim($firstName.val()) === ""){
			$firstName.addClass('error');
			currentView.showError('firstName');
		} else {
			$firstName.removeClass('error');
			currentView.hideError('firstName');
		}
	},
	lastName: function (ev) {
		var $lastName = $("#lastName"),
			currentView = this;

		if($.trim($lastName.val()) === ""){
			$lastName.addClass('error');
			currentView.showError('lastName');
		} else {
			$lastName.removeClass('error');
			currentView.hideError('lastName');
		}
	},
	email: function (ev) {
		var $email = $("#email"),
			currentView = this;

		if($.trim($email.val()) === "" || (!currentView.validateEmail($email.val())) ){
			$email.addClass('error');
			currentView.showError('email');
		} else {
			$email.removeClass('error');
			currentView.hideError('email');
		}
	},
	phoneNum: function(ev) {
		var $phoneNumber = $("#phoneNumber"),
			currentView = this;

		if($.trim($phoneNumber.val()) === "" || (!currentView.validatePhoneNumber($phoneNumber.val())) ){
			$phoneNumber.addClass('error');
			currentView.showError('phoneNumber');
		} else {
			$phoneNumber.removeClass('error');
			currentView.hideError('phoneNumber');
		}
		currentView.phoneFormat($phoneNumber.val());
	},
	validateForm: function(ev) {
		var $firstName = $("#firstName"),
			$lastName = $("#lastName"),
			$email = $("#email"),
			$phoneNumber = $("#phoneNumber"),
			isValid = true,
			currentView = this;

			currentView.clearErrors();
			if($.trim($firstName.val()) === ""){
				$firstName.addClass('error');
				currentView.showError('firstName');
				isValid = false;
			}

			if($.trim($lastName.val()) === ""){
				$lastName.addClass('error');
				currentView.showError('lastName');
				isValid = false;
			}

			if($.trim($email.val()) === "" || (!currentView.validateEmail($email.val())) ){
				$email.addClass('error');
				currentView.showError('email');
				isValid = false;
			}

			if($.trim($phoneNumber.val()) === "" || (!currentView.validatePhoneNumber($phoneNumber.val())) ){
				$phoneNumber.addClass('error');
				currentView.showError('phoneNumber');
				isValid = false;
			}
			currentView.phoneFormat($phoneNumber.val());

			if(!isValid) {
				ev.preventDefault();
			}
	},
	clearErrors: function () {
		$('.error_msg span').addClass('hidden');
		$('html').removeClass('error');
		$('input').removeClass('error');
		$('.error_msg').hide();
		return false;
	},
	validateEmail: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	},
	validatePhoneNumber: function (phoneNumber) {
		var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		return re.test(phoneNumber);
	},
	phoneNumberInput: function(ev) {
		 // Allow: backspace, delete, tab, escape, enter, . and -
        if ($.inArray(ev.keyCode, [46, 8, 9, 27, 13, 110, 190, 173, 189]) !== -1 ||
             // Allow: Ctrl+A
            (ev.keyCode == 65 && ev.ctrlKey === true) || 
             // Allow: home, end, left, right and down
            (ev.keyCode >= 35 && ev.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ( (ev.shiftKey || (ev.keyCode < 48 || ev.keyCode > 57)) && (ev.keyCode < 96 || ev.keyCode > 105) || $(ev.currentTarget).val().length >= 12) {
            ev.preventDefault();
        }
	  return false;
	},
	phoneFormat: function(phone) {
	  phone = phone.replace(/[^0-9]/g, '');
	  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
	  $('#phoneNumber').val(phone);
	},
	showError: function(id) {
		var errorMsg = '';
		switch(id) {
			case 'firstName':
			case 'lastName':
			case 'email':
			case 'phoneNumber':
					$('.' + id + ' span').removeClass('hidden');
					break;
			default:
					break;
		}
		$('html').addClass('error');
	},
	hideError: function(id) {
		var errorMsg = '';
		switch(id) {
			case 'firstName':
			case 'lastName':
			case 'email':
			case 'phoneNumber':
					$('.' + id + ' span').addClass('hidden');
					break;
			default:
					break;
		}
	},
	smsCheck: function(){
		if ($("#smsCheckbox").is(':checked')) {
			$("label[for='phoneNumber']").html('Mobile Phone Number');
			$(".smsOptionalText").show();
		  } else {
			$("label[for='phoneNumber']").html('Phone Number');
			$(".smsOptionalText").hide();
		  }
	}
}

// Document Ready. Load up any functions to be used.
$( document ).ready( function() {
	CVSJS.Bopus.ItemAvailability.checkCookie();
	$('#uiTabsWrapBopus li a').click(function() {
		 utag.link( $(this).data('info') );
	});
	$('#uiTabsWrapBopus .storepickSelect a').click(function() {
		 utag.link( $(this).data('info') );
	});
	$('.bopusStatus a, .prodInfo a').click(function() {
		 utag.link( $(this).data('info') );
	});	
	$('#dStorePickupAvailabilityOverlay .close, #addToCart-overlay').live('click', function() {
		window.location.hash = "";
	});
	$('#smsCheckbox').prop('checked',false); //sms checkbox on store pickup info page is default to unchecked state.
});