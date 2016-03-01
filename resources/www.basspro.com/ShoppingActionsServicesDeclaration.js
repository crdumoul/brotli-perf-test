//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2014 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This class contains declarations of AJAX services used by the Madisons store pages.
 */

dojo.require("wc.service.common");
dojo.require("dijit.registry");

/**
 * @class This class stores common parameters needed to make the service call.
 */
shoppingActionsServicesDeclarationJS = {
  langId: "-1", /* language of the  store */
  storeId: "", /*numeric unique identifier of the store */
  catalogId: "", /*catalog of the store that is currently in use */

  /**
   * Sets common parameters used by the services
   * @param (int) langId The language of the store.
   * @param (int) storeId The store currently in use.
   * @param (int) catalogId The catalog of the store currently in use.
   */
  setCommonParameters:function(langId,storeId,catalogId){
      this.langId = langId;
      this.storeId = storeId;
      this.catalogId = catalogId;
  }
}

  /**
   *  This service fetches the search coordinates based on search criteria
   *  @constructor
   */
  wc.service.declare({
    id: "fecthCoordinates",
    actionId: "fecthCoordinates",
    url: "",
    formId: ""

   /**
    *  On fetching valid coordinates, the success handler invokes another call to fetch store details.
    *  @param (object) serviceResponse The service response object, which is the
    *  JSON object returned by the service invocation.
    */
    ,successHandler: function(serviceResponse) {
      for (var prop in serviceResponse) {
        /*if(!window.console){
          console.debug(prop + "=" + serviceResponse[prop]);
        }*/
      }
      if(serviceResponse['Search Coordinates'] != null){
        var coordinates = serviceResponse['Search Coordinates'];
        var results = coordinates.split("|");
        if(results.length >= 2){
          var lat = results[0];
          var long = results[1];
        }
      }
      var zipCode = serviceResponse['zipCode'];
      var radius = serviceResponse['radius'];
      if(radius == null) radius = 100; //Assign a default value to radius.
      var isStoreOnlyPrd = $('#isStoreOnlyPrd').val();
      //Optional cookie check. If no searchCode cookie exists, create one
      //Call the refresh area and pass on the coordinates
      if(zipCode != 'null' && lat != 'null' && lat != '' && long != 'null' && long != ''){
        wc.render.updateContext("FetchStoreDetails_Context", {'zipCode': zipCode, 'latitude': lat, 'longitude': long, 'radius':radius, 'isStoreOnly': isStoreOnlyPrd});
      } else{
       //Error to show invalid ZipCode.
          $('#inProgress').hide();
          $("#errMsg1").show();
          $("#errMsg2").hide();
          $("#errMsg3").hide();
          $("#storeInfo").hide();
          $("#zipQuery").show();
      }
    }

  /**
   * display an error message.
   * @param (object) serviceResponse The service response object, which is the
   * JSON object returned by the service invocation.
   */
    ,failureHandler: function(serviceResponse) {
      $("#errMsg2").show();
      $("#errMsg1").hide();
      $("#errMsg3").hide();
      $("#storeInfo").hide();
      $("#zipQuery").show();
      cursor_clear();
    }
  }),

  /**
   *  This service fetches the In Store Availability Data
   *  @constructor
   */
  wc.service.declare({
    id: "fetchInStoreAvailability",
    actionId: "",
    url: "",
    formId: ""

   /**
    *  On fetching the instore availability data, the success handler displays the data on
    *  the Check In-store availability pop-up
    *  @param (object) serviceResponse The service response object, which is the
    *  JSON object returned by the service invocation.
    */
    ,successHandler: function(serviceResponse) {
      var sku, store = '';
      if(serviceResponse['sku'] != null){
        sku = serviceResponse['sku'];
      }
      if(serviceResponse['store'] != null){
          store = serviceResponse['store'];
        }
      if(serviceResponse[sku] != null){
        var skuDetails = serviceResponse[sku];
        var errorCode = skuDetails.errorCode;
        var errorMessage = skuDetails.errorMessage;
        var inventory = skuDetails.onHand;

        //Omniture call to track sku, store & onHand qty
        omniCheckInStoreResponse(sku, store, inventory);

        if(errorMessage != 'undefined' && errorMessage != ''){
          $("#errMsg2").show();
        }else{
          var listNo = '1'; //Defaulting to first store on the Store Locator modal
          if(null != serviceResponse['refPos'] && serviceResponse['refPos'] != ''){
            listNo = serviceResponse['refPos']; //listNo is the index of store being clicked on the Store Locator modal
          }
          var availThreshold = $('#lowInStock_threshold_qty_max').val();  //Being read from eSpot
          var lowInStockThreshold = $('#lowInStock_threshold_qty_min').val(); //Being read from eSpot
          if(null == availThreshold || availThreshold == 'undefined')availThreshold=3;
          if(null == lowInStockThreshold || lowInStockThreshold == 'undefined')lowInStockThreshold=1;

          if(inventory > availThreshold && errorCode == ''){
              $('#status-1_'+listNo).show();
          }else if(inventory <= availThreshold && inventory >= lowInStockThreshold && errorCode == ''){
              $('#status-2_'+listNo).show();
          }else{
              //Creating ATC button
              var count = 'addToCartBtn_'+$('#chartCount').val();
              var button = "";
              $('#buttonATC_modal_'+listNo).empty();
              if(document.getElementById(count) != null && document.getElementById(count) != 'undefined'){
                  button = document.getElementById(count).attributes;
                  var buttonId = button.id.value;
                  var href = button.href.value+';omniATCFromModal(tag)';
                  var onClick = "";
                  if(null != button.onclick && 'undefined' != button.onclick){onClick = button.onclick.value};
                  $('#buttonATC_modal_'+listNo).append($('<a>', {id:buttonId, class:'btn btn-warning cstm-btn', href:href, style:'color: white; padding-top: 10px;box-sizing: border-box', onClick:onClick}).text('Add To Cart'));
              } else{
                  $('#buttonATC_modal_'+listNo).append($('<a>', {class:'btn btn-warning cstm-btn', href:'javascript:void(0)', style:'color: white; padding-top: 10px; box-sizing: border-box', onClick:'javascript:Add2ShopCartAjax(OrderItemAddForm);omniAddToCart(tag);omniATCFromModal(tag)'}).text('Add To Cart'));
              }
              $('#status-3_'+listNo).show();
          }
        }
      }
      $('#inProgress').hide();
  }

  /**
   * display an error message.
   * @param (object) serviceResponse The service response object, which is the
   * JSON object returned by the service invocation.
   */
    ,failureHandler: function(serviceResponse) {
        $("#errMsg2").show();
        $("#errMsg1").hide();
        $("#errMsg3").hide();
        $("#storeInfo").hide();
        cursor_clear();
    }

  }),
  /**
   * Add an item to a shopping cart in Ajax mode. A message is displayed after
   * the service call.
   * @constructor
   */
  wc.service.declare({
    id: "AddOrderItem",
    actionId: "AddOrderItem",
    url: getAbsoluteURL() + "AjaxOrderChangeServiceItemAdd",
    formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

    ,successHandler: function(serviceResponse) {
      dojo.require("dijit.registry");
      MessageHelper.hideAndClearMessage();
      // Do not show this message. When item is added, we open up mini cart to display the currently added item.
      // MessageHelper.displayStatusMessage(storeNLS["SHOPCART_ADDED"]);
      cursor_clear();
      if(shoppingActionsJS){

        var attributes_container = dojo.query('div[id^="attrValue_"]');

        if ((dojo.query(".definingAttributes")[0]) != null) {
          var attributes_container = dojo.query(".definingAttributes");
        }
        else if ((dojo.query(".product_sizes")[0]) != null) {
          var attributes_container = dojo.query(".product_sizes");
        }
        else if ((dojo.query(".product_info")[0]) != null) {
          var attributes_container = dojo.query(".product_info");
        }

        var attributes = new Array();
        for (var i = 0; i < attributes_container.length; i++) {
          var attribute_selectors = attributes_container[i].querySelectorAll(".dijitSelect");
          for (var j = 0; j < attribute_selectors.length; j++) {
            attributes = attributes.concat(attribute_selectors[j]);
          }
        }

        var dijitSelect = new Array();
        for (var i = 0; i < attributes.length; i++) {
          dijitSelect[i] = dijit.registry.byNode(attributes[i]);
        }

        var singleSKU = true;
        for(var i=0; i<dijitSelect.length; i++){
          if (dijitSelect[i].options.length > 2)
          {
            singleSKU = false;
          }
        }

        if (!singleSKU)
        {
          shoppingActionsJS.selectedAttributes = new Object();
          dojo.topic.publish('DefiningAttributes_Resolved_'+shoppingActionsJS.baseCatalogEntryId, shoppingActionsJS.baseCatalogEntryId, -1);
          for(var i=0; i<dijitSelect.length; i++){
            if(dijitSelect[i] != null){
              dijitSelect[i].value = "";
            }
          }
        }

      }
      if(typeof(ShipmodeSelectionExtJS)!= null && typeof(ShipmodeSelectionExtJS)!='undefined'){
        ShipmodeSelectionExtJS.setOrderItemId(serviceResponse.orderItemId[0]);
      }
      dojo.publish("CMAddToCart");
    }
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
    ,failureHandler: function(serviceResponse) {

      if (serviceResponse.errorMessage) {
         if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
           MessageHelper.displayErrorMessage(storeNLS["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
         } else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
          var tempString = storeNLS["GENERICERR_MAINTEXT"];
          tempString = dojo.string.substitute(tempString,{0:storeNLS["GENERICERR_CONTACT_US"]});
           MessageHelper.displayErrorMessage(tempString);
         } else {
           MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
         }
      }
      else {
         if (serviceResponse.errorMessageKey) {
          MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
         }
      }
      cursor_clear();
    }

  }),

  /**
   * Adds a pre-defined dynamic kit to a shopping cart in Ajax mode. A message is displayed after
   * the service call.
   * @constructor
   */
  wc.service.declare({
    id: "AddPreConfigurationToCart",
    actionId: "AddOrderItem",
    url: getAbsoluteURL() + "AjaxOrderChangeServiceAddPreConfigurationToCart",
    formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

    ,successHandler: function(serviceResponse) {
      MessageHelper.hideAndClearMessage();
      cursor_clear();
      if(shoppingActionsJS){

        var attributes = document.getElementsByName("attrValue");

        var singleSKU = true;

        for(var i=0; i<attributes.length; i++){
          if (attributes[i].options.length > 1)
          {
            singleSKU = false;
          }
        }

        if (!singleSKU)
        {
          shoppingActionsJS.selectedAttributes = new Object();
          for(var i=0; i<attributes.length; i++){
            if(attributes[i] != null){
              attributes[i].value = "";
              attributes[i].onchange();
            }
          }
        }
      }
      if(typeof(ShipmodeSelectionExtJS)!= null && typeof(ShipmodeSelectionExtJS)!='undefined'){
        ShipmodeSelectionExtJS.setOrderItemId(serviceResponse.orderItemId[0]);
      }
    }
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
    ,failureHandler: function(serviceResponse) {

      if (serviceResponse.errorMessage) {
         if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
           MessageHelper.displayErrorMessage(storeNLS["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
         } else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
          var tempString = storeNLS["GENERICERR_MAINTEXT"];
          tempString = dojo.string.substitute(tempString,{0:storeNLS["GENERICERR_CONTACT_US"]});
           MessageHelper.displayErrorMessage(tempString);
         } else {
           MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
         }
      }
      else {
         if (serviceResponse.errorMessageKey) {
          MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
         }
      }
      cursor_clear();
    }

  })

  function omniCheckInStoreResponse(sku, store, inventory)
  {
   try
   {
       s.linkTrackVars='events,eVar62,eVar63,eVar64';
       s.linkTrackEvents='';
       s.events='';
       s.eVar62=sku;
       s.eVar63=store;
       s.eVar64=inventory.toString();
       s.tl(true,'o','Check InStore Response');
   }
   catch(error)
   {
     errorHandler(js_filename, "omniCheckInStoreAvailability()", error);
   }
  }
