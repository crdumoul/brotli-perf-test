portingisLive = true;

/**
 * Check Clear Cart Cookie
 * @author unknown
 * @version unknown
 * @description Removing cookies if the clear cart cookie exist
 */
if ($.cookie('clearCart')) {
    $.removeCookie('BYOD_IMEI_val', {
        path: '/'
    });
    $.removeCookie('BYOD_deviceName', {
        path: '/'
    });
    $.removeCookie('BYOD_selectSIM', {
        path: '/'
    });
    $.removeCookie('BYOD_simtype', {
        path: '/'
    });
    $.removeCookie('clearCart', {
        path: '/'
    });
}

/**
 * Redirecting to AMSS login
 * @author Brian Boyett / Anselm Marie
 * @version unknown
 * @description Add any nesccessary cookies based on the parameters received then redirect to AMSS 
 * @param {string} redirecturl: The url that will be used when AMSS redirects back to the Cricket website
 * @param {boolean} gotoactivityselection: Based on true/false the user may see the AMSS activity selection screen
 * @param {string} redirect_to: The flow the user was going through
 * @return {boolean} creating a return false to stop any other actions from occurring
 */
function redirectToAMSSLogin(redirecturl, redirect_to) {

    $.cookie('redirectURL', redirecturl, {
        path: '/'
    });

    if ( redirect_to && redirect_to == 'prepurchased-amss' ) {
        $.cookie('PrePurchaseSIM', 'Yes', {
            path: '/'
        });
    }

    if( $.cookie("userName") ) {
        window.location = "/myaccount/secure/preloadAccountDashboard.do";
    } else {
        window.location = "/myaccount/ImplLoginAction.do?ecareAction=login";
    }
    
    return false;
}

/**
 * Check International Features
 * @author Brian Boyett
 * @version unknown
 * @description Checking if multiple international features are in the cart. If so an error will occur.
 * @param {object} data: Cart Servlet repsonse. This is optional, if it's not provided then we know that we need to call cartservlet again because there may be a change
 */
function checkInternationalFeatures(data) {
    if(!data) {
        queueRestCall(
            "cartsummary",
            "GET", {},
            function(data) {
                checkInternationalFeatures(data);
            },
            null,
            true,
            true
        );
    } else {
        $("div.cartsummary .flash.error").remove();
        
        var serviceSkus = ["ILD15MRC","ILD5MRC","ILDPPMRC","ILD5RC"];  // they can only have one of these to continue to checkout
        
        var addedcnt = 0;
        if(data.monthlyServices) {
            $.each(data.monthlyServices, function(i, service) {
                if(serviceSkus.indexOf(service.SKU) > -1) {
                    addedcnt++;
                }
            });
        }

        if(addedcnt > 1) {
            cricket.utilities.getErrorMessage(cricket.utilities.translateError("ONLY-ONE-INTL-FEATURE", null, "", true)).insertAfter("div.cartsummary h3");

            $("div.cartsummary .continue").attr("disabled", true);
        } else {
            $("div.cartsummary .continue").attr("disabled", false);
        }
    }
}

/**
 * Cancel Order
 * @author unknown
 * @version unknown
 * @description Begins the progesss of cancelling an order.
 */
function cancelOrder() {
    var options = {
        success: cancelOrderSuccess,
        error: cancelOrderError,
        cache: false
    };
    queueRestCall("cancelorder", "POST", null, cancelOrderSuccess, cancelOrderError);
}

/**
 * Cancel Order Success
 * @author unknown
 * @version unknown
 * @description If cancelling the order is unsuccessful then we track the issue here.
 * @param {object} responseText: The response that was recevied from the server
 */
function cancelOrderSuccess(responseText, statusText, xhr, $form) {
    if ($('#modal-cancel-cart').is(':visible')) {
        cricket.modifyCart.clearCart();
    } else {
        window.location.href = contextPath + siteRoot + "/en/shop/cart.html";
    }
}

/**
 * Cancel Order Error
 * @author unknown
 * @version unknown
 * @description If cancelling the order is unsuccessful then we track the issue here.
 * @param {object} responseText: The response that was recevied from the server
 */
function cancelOrderError(responseText, statusText, xhr, $form) {
    trackError({"error" : 'From: ' + statusText + ' ' + responseText.responseText});
}
(function (window, $, cricket) {
    'use strict';

    if (!$) {
        throw 'jQuery not found.';
    }

    cricket.shopDetails = {
        /**
         * Initializes the Shop Details code
         * @author Mitchell Gunnels, Anselm Marie, Brian Boyett
         * @version unknown
         * @description Does any initializing that is needed for the search results page: events, etc...
         */
        initShopDetails: function () {
            //for fake iPhone button links in long description graphics
            $('a[href="#service-plan"], a[href="#accessories"]').click(function () {
                $('.hidden_links').css('display','none');
            });

            $('a[href="#product-specs"]').click(function () {
                $('.hidden_links').css('display','block');
            });

            $('section.color-details ul li').on('click', function() {
                $(this).addClass('selected').siblings().removeClass('selected');
            });

            $('span.priceText').each(function(i, el) {
                var price = $(el).text();
                decimalAmt = price.match(/(\d+)(\.)(.+)/);
                if (decimalAmt !== null) {
                    $(this).replaceWith('<span class="priceText">' + '<span class="dollarAmt">' + decimalAmt[1] + '</span><span>' + decimalAmt[2] + '</span><span class="decimalAmt">' + decimalAmt[3] + '</span>');
                    if (decimalAmt[1].length > 2) {
                        $('.dollarAmt').addClass('long');
                    }
                }
            });

            queueRestCall("orderinfo", "GET", {},null, null, true, false);
        },

        /**
         * Cart Continue Validation
         * @author Mitch Gunnels, Brian Boyett, Anselm Marie
         * @version unnkown
         * @description Making sure the customer is in good standing on the cart page before going to the checkout page
         */
        checkCheckout: function () {
            // if the customer is migrating or prepurchase SIM send them to the old checkout.  
            // otherwise take them to the new checkout
            queueRestCall("cartsummary", "GET", {},
                function(response) {
                    if (!response.prePurchasedSIM) {
                        window.location.href = '/shop/mobile-checkout.html';
                    } else {
                        // Checking the order info repsonse and making sure the response doesn't have an error in it.
                        if ( isInResults("orderinfo") && !getServiceResult("orderinfo").errorCode ) {
                            //moveToCheckout('regular');
                            window.location = "/shop/checkout.html";

                        } else if ( isInResults("accountinfo") ) { //Checking oldAccountInfo Response
                            var accountInfoResponse = getServiceResult("accountinfo");

                            if (accountInfoResponse.amss_authenticated) { // logged in

                                // Scenario:
                                // Account is suspended


                                if (accountInfoResponse.account_status == "suspended" ) {

                                    queueRestCall(
                                        "cartsummary",
                                        "GET", {},
                                        function(cartresponse) {

                                            var device = cartresponse.device.SKU;
                                            var plan = cartresponse.plan.SKU;
                                            var monthlyServices = cartresponse.monthlyServices;

                                            if ( monthlyServices.length === 0 && device == null && plan == null ) {
                                                //moveToCheckout('regular');
                                                window.location = "/shop/checkout.html";
                                            } else {
                                                var callback_params = {
                                                    modal_name: '#acctSuspendModal'
                                                };

                                                loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/acctSuspendModal.handlebars', null, cricket.shopDetails.finishCheckoutModal, callback_params );
                                            }
                                        },
                                        null,
                                        true,
                                        true
                                    );   
                                    // Scenario:
                                    // Account is on bridge pay
                                } else if (accountInfoResponse.bridge_pay == "Y") {

                                    var callback_params = {
                                        modal_name: '#bridgePayModal'
                                    };

                                    loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/bridgePayModal.handlebars', null, cricket.shopDetails.finishCheckoutModal, callback_params );

                                    // Scenario:
                                    // Account has a line pending
                                } else if (accountInfoResponse.line_pending_activation == "Y") {
                                    queueRestCall(
                                        "cartsummary",
                                        "GET", {},
                                        function(cartresponse) {

                                            var device = cartresponse.device.name;
                                            var plan = cartresponse.plan.name;
                                            var monthlyServices = cartresponse.monthlyServices;

                                            if ( monthlyServices.length === 0 && device == ' ' && plan == ' ' ) {
                                                //moveToCheckout('regular');
                                                window.location = "/shop/checkout.html";
                                            } else {

                                                var callback_params = {
                                                    modal_name: '#linePendingModal'
                                                };

                                                loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/linePendingModal.handlebars', null, cricket.shopDetails.finishCheckoutModal, callback_params );

                                            }
                                        },
                                        null,
                                        true,
                                        true
                                    );
                                } else {
                                    //moveToCheckout('regular');
                                    window.location = "/shop/checkout.html";
                                }
                            } else {
                                //moveToCheckout('regular');
                                window.location = "/shop/checkout.html";
                            }
                        } else {
                            window.location = "/shop/checkout.html";
                        }
                    }   
                }
            );
        },

        /**
         * Set Read More Toggle
         * @author Anselm Marie
         * @version 1504
         * @description Adding a toggle function for content that has excess information
         */
        setReadMoreToggle: function () {
            if( $('#detailDescriptionContent').height() > $('#detailDescription').height() ){

                var readShortenHeight = $('#detailDescription').css('height');

                $('#toggleRead').on('click', function () {

                    if ($('#detailDescription').hasClass('read-more')) {

                        var getContentHeight = $('#detailDescriptionContent').height();

                        $('#detailDescription').animate({
                            height: getContentHeight + 21
                        }, 'normal', function() {
                            $('#detailDescription')
                                .removeClass('read-more')
                                .addClass('read-less')
                                .css('height', 'auto');
                            $('#readText').html('Read Less');
                        });

                    } else {

                        var getContentHeight = $('#detailDescriptionContent').height();
                        $('#detailDescription').css( 'height', getContentHeight );

                        $('#detailDescription').animate({
                            height: readShortenHeight
                        }, 'normal', function() {
                            $('#detailDescription').addClass('read-more').removeClass('read-less');
                            $('#readText').html('Read More');
                        });

                    }

                });

            } else {
                $('#toggleRead').remove();
                $('#detailDescription').css('height', 'auto');
            }
        },

        /**
         * Finishing modal
         * @author Anselm Marie
         * @version unknown
         * @description Finishing modals after loading them in handlebar function
         * @param {object} data: See the callback_params above for the contain used
         */
        finishCheckoutModal: function(data) {
            $( data.modal_name ).modal();
            returnAbilityToAddItemToCart( '.button.continue' );
        },
        
        /**
         * Combines the Responses from CQ and ATG product services
         * @author Brian Boyett
         * @version 1510
         * @description takes the two responses from CQ and ATG and produces a final result to use to render pages on the site
         * @param {json} atgResponse: The response from the GetProducts service created by ATG team
         * @param {json} cqResponse: The response from CQ service for products
         * @return {json}: The combined json object from the two responses
         */
        combineProductResponses: function (atgResponse, cqResponse) {
            
            var atgResponseObj = this.responseToObj(atgResponse.productList),
                cqResponseObj = this.responseToObj(cqResponse),
                productSku,
                record,
                results = {'products': {}};
            
            for (productSku in cqResponseObj) {
                var productRecord = cqResponseObj[productSku];

                if (atgResponseObj[productSku]) {
                    
                    // temporary fix for value that are sometimes not showing in the response
                    productRecord.colorValue = productRecord.colorValue ? productRecord.colorValue : '';
                    productRecord.model = productRecord.model ? productRecord.model : '';
                     
                    var additionalProperties = {
                        brand: productRecord.brand.trim() === '' ? '&nbsp;' : $('<textarea />').html(productRecord.brand.trim()).text(), 
                        type: $('<textarea />').html(productRecord.type).text(),
                        model: productRecord.model,
                        colorValue: productRecord.colorValue.indexOf('#') > -1 ? productRecord.colorValue : '#' + productRecord.colorValue,
                        displayName: productRecord.brand.toString().trim() + ' ' + productRecord.model.toString().trim().replace(/(<([^>]+)>)/ig,"")
                    };
                    
                    record = $.extend( {}, productRecord, atgResponseObj[productSku], additionalProperties );
                    cricket.shopDetails.addAdditionalValuesToCombinedRecord( record );
                    
                    if (!results.products[record.productID]) {
                        results.products[record.productID] = [];
                    }
                    
                    // Fixes the issue where the promo Samsung phone was showing in the Samsung color options
                    var isSamsungPromo = record.skuId === 'DSMM4004' && record.price === '0.99';

                    if(!isSamsungPromo) {
                        if (record.isDefaultColor) { // default so make it first
                            results.products[record.productID].unshift(record);        
                        } else {
                            results.products[record.productID].push(record);
                        }
                    }
                }
            }
            
            return results;
        },

        /**
         * Function imgPath
         * @author Gregory Jackson
         * @version 1509
         * @modified Brian Boyett
         * @param {string} sku: sku
         * @param {string} productType: the type of product (accessory, smartphone, basic, sim, plan)
         * @description Generate url for image based on sku
         */
        imgPath: function (sku, productType) {
            return '/content/dam/a/product/' + sku.toString().substring(0, 3) + '/' + sku.toString() + '/' + sku.toString() + this.getImgExtension(productType);
        },
        
        /**
         * Get Image 
         * @author Brian Boyett
         * @version 1510
         * @param {string} productType: the type of product (Accessory, Smartphone, Basic, SIM)
         * @description Returns the correct image extension based on the product type
         */
        getImgExtension: function (productType) {
            switch(productType) {
                case 'smartphone':
                case 'basic':
                    return '-list.png';
                case 'accessory':
                    return '-accessories.png';
                default:
                    return '';
            }    
        },

        /**
         * responseToObj Function
         * @author Gregory Jackson
         * @version 1509
         * @description Converts array to obj based on sku
         * @param {array} arr: Array of products
         */
        responseToObj: function (arr) {
            var retObj = {};
            
            arr instanceof Array && arr.forEach(function (o) {
                retObj[o.skuId] = o;
            });
            return retObj;
        },

        /**
         * Sorts final results by popularity
         * @author Brian Boyett
         * @version 1509
         * @description Sort the final results, of the combine function, by popularity
         * @param {json} finalResult: The combined json object from the two responses
         */
        popularitySort: function (a, b) {
            var aVal = parseInt(a.popularity),
                bVal = parseInt(b.popularity);
            if (isNaN(aVal) || isNaN(bVal)) {
                return 0;
            }
            return aVal < bVal ? -1 : 1;
        },

        /**
         * Function Remove obsolete object properties
         * @author Gregory Jackson
         * @version 1509
         * @description Takes a supplied object and removes properties
         * @param {object} obj: object to delete properties from
         */
        /*removeObsoleteProperties: function (obj) {
            delete obj.isDefaultColor;
            delete obj.colorName;
            delete obj.colorValue;
            delete obj.pagePath;
            delete obj.skuId;
            delete obj.productId;
            delete obj.instock;
        },*/

        /**
         * Add additional values to combined record
         * @author Brian Boyett
         * @version 1509
         * @description Takes the combined record and adds additional information to it
         * @param {json} combined: The record with the additions added to it
         */
        addAdditionalValuesToCombinedRecord: function (combined) {

            var final_price,
                splitFinalPrice;
            
            // General
            combined.isIPhone = combined.model.indexOf('iPhone') > -1 || combined.brand.toString().trim() === 'Apple';
            combined.imgPath = this.imgPath(combined.skuId, combined.productType);
            combined.additionalClasses = combined.isDefaultColor === true ? 'activeColor selected' : '';
            combined.additionalClasses += combined.instock ? '' : ' outOfStock';

            // Pricing
            combined.currentPrice = this.priceHTML(combined.price);

            if (combined.originalPrice) {
                combined.wasPrice = this.priceHTML(combined.originalPrice);
            }

            if (combined.discountAmount) {
                combined.discountAmount = this.priceHTML(combined.discountAmount);
            }
            
            final_price = combined.discountApplication == "port-in" ? parseFloat(combined.discountedPrice) : (combined.price * 100 - combined.discountAmount * 100) / 100;
            splitFinalPrice = final_price.toString().split('.');
            combined.finalPrice = final_price <= 0 ? "<p>FREE</p><small>+tax</small>" : ("<p><sup>$</sup>" + splitFinalPrice[0] + ".<sup>" + splitFinalPrice[1] + "</sup></p>");

            // Discounts
            combined.isMailDiscount = combined.discountApplication === 'mail';
            combined.isPortinDiscount = combined.discountApplication === 'port-in' ? true : false;
            combined.isPortinTeaser = combined.devicePortInContent && combined.isPortinDiscount == false ? true : false;

            // Promo
            combined.hasPromoTeaser =  combined.devicePromoContent ? true : false;
        },

        /**
         * Function priceHTML
         * @author Gregory Jackson
         * @version 1509
         * @description Generate html for a price display
         */
        priceHTML: function (price) {
            var splitPrice = price.toString().split('.');
            return '<sup>$</sup>' + splitPrice[0] + '.<sup>' + splitPrice[1] + '</sup>';
        },

        /**
         * Zoom for Main Image
         * @author Charles Jones
         * @version 1504
         * @description Creates the Zoom Functionality on the Page
         */
        zoomCreate:  function () {
            var $panzoom = $("#productSlider .active img");
            if (!$panzoom.hasClass('wp')) {
                $panzoom.addClass('wp').panzoom({
                    increment: 0.5,
                    minScale: 1,
                    maxScale: 3,
                    contain: 'invert',
                    $zoomIn: $("#zoomIn"),
                    $zoomOut: $("#zoomOut")
                });

                $panzoom.parent().on('mousewheel.focal', function (e) {
                    e.preventDefault();
                    var delta = e.delta || e.originalEvent.wheelDelta;
                    var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                    $panzoom.panzoom('zoom', zoomOut, {
                        increment: 0.1,
                        animate: false,
                        focal: e
                    });
                })
                    .on('touchend',function(){
                    //Do not remove the on touchend function as it is required to Windows Phone Functionality
                });
            }
        },

        /**
         * Zoom for Main Image
         * @author Charles Jones
         * @version 1504
         * @description Destroys the Zoom Functionality when the Image is not in use
         */
        zoomDestroy: function() {
            $("#productSlider img.wp").removeClass('wp').panzoom("reset").panzoom("destroy");
        }
    };

    $(document).ready(cricket.shopDetails.initShopDetails);

} (window, $, window.cricket = window.cricket || {}));

/**
 * Scaffolding Details
 * @author Brian Boyett
 * @version unknown
 * @description This function queries scaffolding for details of the provided SKUs and returns the response as a JSON object.
 * @param {object} skus: (required) array of skus to lookup in the scaffolding
 * @param {String} skuType: (optional) the type of the skus (smartphones, basicphones, accessories, or plans)
 * @returns the json response returned from the queryScaffolding function
 * @todo currently padding in more than one sku in the array does not work.
 */ 
function getScaffoldingDetails(skus, skuType) {
    var paths = [
        "path=/content/aio/en/cell-phones/smartphones",
        "path=/content/aio/en/cell-phones/basic",
        "path=/content/aio/en/cell-phone-accessories",
        "path=/content/aio/en/cell-phone-plans"
    ];
    
    var skusparam = "&property.value=";
    $.each(skus, function(i, sku) {
        if(i > 0) skusparam += ",";
        skusparam += sku;
    });

    var url = "/bin/querybuilder.json?";

    if(skuType) {
        if(skuType == "smartphones") {
            url += paths[0];
        } else if(skuType == "basicphones") {
            url += paths[1];
        } else if(skuType == "accessories") {
            url += paths[2];
        } else if(skuType == "plans") {
            url += paths[3];
        }
        
        url += "&p.hits=full&property=skuid" + skusparam

        return queryScaffolding(url);
    } else {
        // we don't know what kind of skus these are so we will have to iterate through each until we find it
        var skudetails;
        $.each(paths, function(i, path) {
            
            skudetails = queryScaffolding(url + path + "&p.hits=full&property=skuid" + skusparam);
            
            if(skudetails) {
                return false; // break loop
            }
        });

        // if not found just return nothing
        return skudetails;
    }
}

/**
 * Query Scaffolding
 * @author Brian Boyett
 * @version unknown
 * @description This is where the query occurs to get the sku details
 * @param {String} queryURL: (required) array of skus to lookup in the scaffolding
 * @return {object} the json response returned with the scaffolding results
 */ 
function queryScaffolding(queryURL) {
    var queryResults;
    $.ajax({
        url: queryURL,
        async: false
    })
    .done(function(response) {
        if(response && response.success == true && response.results > 0) {
            queryResults = response;
        }
    });

    return queryResults;
}
/**
 * View the colors
 * @author Brian Boyett
 * @version 1504
 * @description Shows the color swatches and hides the actions
 */
function viewColors(element) {
    // hide the view colors link
    $(element).addClass("hide");

    // show the close colors link
    $(element).siblings(".close-colors").removeClass("hide");

    // hide the actions
    $(element).parents(".colors").animate({top: -50}, 500, 'swing', function(){ 
        // show all the swatches
        $(element).siblings(".swatches").show().css({opacity: 1}); 
    });
}

/**
 * Close the colors
 * @author Brian Boyett
 * @version 1504
 * @description Hides the color swatches and shows the actions
 */
function closeColors(element) {
    // hide the close colors link
    $(element).addClass("hide");

    // show the view colors link
    $(element).siblings(".view-colors").removeClass("hide");

    // show the actions
    $(element).parents(".colors").animate({top: 0}, 500, 'swing', function(){ 
        // hide swatches
        $(element).siblings(".swatches").css({opacity: 0}).hide(); 
    });
}

/*!
  The MIT License (MIT)
  Copyright (c) 2014-current Andrea Giammarchi
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
 */

/*
CSS
  Disables all pan/zoom behaviors and fire pointer events in JavaScript instead.
  .disablePanZoom {
    -ms-touch-action: none;
    touch-action: none;
  }
JS
  Disables text selection
  element.addEventListener("selectstart", function(e) { e.preventDefault(); }, false);
*/

(function (navigator, document, pointerEnabled) {

  // highly experimental, should work on IE10 and IE11 only
  // normal IE mouse events won't be affected

  if (!(
    (pointerEnabled = !!navigator.pointerEnabled) ||
    navigator.msPointerEnabled
  ) ||
    'ontouchend' in document
  ) return;

  var
    // shortcuts
    ADD_EVENT_LISTENER = 'addEventListener',
    REMOVE_EVENT_LISTENER = 'removeEventListener',
    // used to force-simulate touch
    SET_CURRENT_CAPTURE = pointerEnabled ?
        'setPointerCapture' : 'msSetPointerCapture',
    RELEASE_CURRENT_CAPTURE = pointerEnabled ?
        'releasePointerCapture' : 'msReleasePointerCapture',
    // shortcut for common replacements
    ElementPrototype = Element.prototype,
    defineProperties = Object.defineProperties,
    defineProperty = Object.defineProperty,
    // for types too
    type = function (type) {
      var lo = type.toLowerCase(),
          ms = 'MS' + type;
      handler[ms] = handler[lo];
      return pointerEnabled ? lo: ms;
    },
    // these are calls to the passed event
    commonMethod = function (name) {
      return {
        value: function () {
          Event[name].call(this);
          this._[name]();
        }
      };
    },
    // DOM Level 0 accessors
    createAccessor = function (type) {
      var ontype = '_on' + type;
      return {
        enumerable: true,
        configurable: true,
        get: function () {
          return this[ontype] || null;
        },
        set: function (callback) {
          if (this[ontype]) {
            this[REMOVE_EVENT_LISTENER](type, this[ontype]);
          }
          this[ontype] = callback;
          if (callback) {
            this[ADD_EVENT_LISTENER](type, callback);
          }
        }
      };
    },
    // these are common DOM overrides
    commonOverride = function (proto, name) {
      var original = proto[name];
      defineProperty(proto, name, {
        configurable: true,
        value: function (type, eventHandler, capture) {
          if (type in types) {
            original.call(
              this,
              types[type],
              handleEvent,
              capture
            );
          }
          original.call(this, type, eventHandler, capture);
        }
      });
    },
    // these are delegated properties
    commonProperty = function (name) {
      return {
        get: function () {
          return this._[name];
        }
      };
    },
    // generates similar functions for similar cases
    upOrCancel = function (type) {
      return function (e) {
        var pointerId = e.pointerId,
            touch = touches[pointerId],
            currentTarget = e.currentTarget;
        delete touches[pointerId];
        if (RELEASE_CURRENT_CAPTURE in currentTarget) {
          currentTarget[RELEASE_CURRENT_CAPTURE](e.pointerId);
        }
        dispatchEvent(type, e, touch);
        delete changedTouches[pointerId];
      };
    },
    // shortcut for all events
    dispatchEvent = function (type, e, touch) {
      if (!touch) return;
      var c = document.createEvent('Event');
      c.initEvent(type, true, true);
      _.value = e;
      TouchEventProperties.currentTarget.value = touch.currentTarget;
      defineProperties(c, TouchEventProperties);
      touch.currentTarget.dispatchEvent(c);
    },
    get = function (name, object) {
      function returnID(id) {
        return object[id];
      }
      return function get() {
        _.value = Object.keys(object).map(returnID);
        return defineProperty(this, name, _)[name];
      };
    },
    // basically says if it's touch or not
    humanReadablePointerType = function (e) {
      switch(e.pointerType) {
        case 'mouse':
        case e.MSPOINTER_TYPE_MOUSE:
          return 'mouse';
      }
      // pen is just fine as touch
      return 'touch';
    },
    // recycle common descriptors too
    _ = {value: null},

    // the list of touches / changedTouches
    touches = Object.create(null),
    changedTouches = Object.create(null),
    // TODO: targetTouches = Object.create(null),

    Event = document.createEvent('Event'),
    // all properties per each event
    // defined at runtime .. not so fast
    // but still OKish in terms of RAM and CPU
    TouchEventProperties = {
      _: _,
      touches: {
        configurable: true,
        get: get('touches', touches)
      },
      changedTouches: {
        configurable: true,
        get: get('changedTouches', changedTouches)
      },
      currentTarget: {value:null},
      // almost everything is mirrored
      relatedTarget: commonProperty('relatedTarget'),
      target: commonProperty('target'),
      altKey: commonProperty('altKey'),
      metaKey: commonProperty('metaKey'),
      ctrlKey: commonProperty('ctrlKey'),
      shiftKey: commonProperty('shiftKey'),
      // including methods
      preventDefault: commonMethod('preventDefault'),
      stopPropagation: commonMethod('stopPropagation'),
      stopImmediatePropagation: commonMethod('stopImmediatePropagation')
    },
    // all types translated
    types = Object.create(null),
    // boosted up eventListener
    handleEvent = function (e) {
      if (humanReadablePointerType(e) === 'touch') {
        // invoke normalized methods
        handler[e.type](e);
      }
    },
    // the unique handler for all the things
    handler = {
      pointerdown: function (e) {
        var touch = new Touch(e),
            pointerId = e.pointerId,
            currentTarget = e.currentTarget;
        changedTouches[pointerId] = touches[pointerId] = touch;
        if (SET_CURRENT_CAPTURE in currentTarget) {
          currentTarget[SET_CURRENT_CAPTURE](e.pointerId);
        }
        dispatchEvent('touchstart', e, touch);
      },
      pointermove: function (e) {
        var pointerId = e.pointerId,
            touch = touches[pointerId];
        if (!touch) return;
        touch._ = e;
        dispatchEvent('touchmove', e, touch);
        changedTouches[pointerId]._ = e;
      },
      pointerup: upOrCancel('touchend'),
      pointercancel: upOrCancel('touchcancel')
    },
    accessors = {
      ontouchstart: createAccessor('touchstart'),
      ontouchmove: createAccessor('touchmove'),
      ontouchend: createAccessor('touchend'),
      ontouchcancel: createAccessor('touchcancel')
    }
  ;

  // facade for initial events info
  function Touch(_) {
    // the event needs to be refreshed
    // each touchmove
    this._ = _;
    this.currentTarget = _.currentTarget;
  }

  // all common properties
  defineProperties(
    Touch.prototype,
    {
      identifier: commonProperty('pointerId'),
      target: commonProperty('target'),
      screenX: commonProperty('screenX'),
      screenY: commonProperty('screenY'),
      clientX: commonProperty('clientX'),
      clientY: commonProperty('clientY'),
      pageX: commonProperty('pageX'),
      pageY: commonProperty('pageY')
    }
  );

  types.touchstart  = type('PointerDown');
  types.touchmove   = type('PointerMove');
  types.touchend    = type('PointerUp');
  types.touchcancel = type('PointerCancel');

  commonOverride(document, ADD_EVENT_LISTENER);
  commonOverride(document, REMOVE_EVENT_LISTENER);
  commonOverride(ElementPrototype, ADD_EVENT_LISTENER);
  commonOverride(ElementPrototype, REMOVE_EVENT_LISTENER);

  // make these available as DOM Level 0
  defineProperties(document, accessors);
  defineProperties(ElementPrototype, accessors);

}(navigator, document));

window.PointerEvent = undefined;
window.MSPointerEvent = undefined;
/**
 * @license jquery.panzoom.js v2.0.5
 * Updated: Thu Jul 03 2014
 * Add pan and zoom functionality to any element
 * Copyright (c) 2014 timmy willison
 * Released under the MIT license
 * https://github.com/timmywil/jquery.panzoom/blob/master/MIT-License.txt
 */

(function(global, factory) {
	// AMD
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], function(jQuery) {
			return factory(global, jQuery);
		});
	// CommonJS/Browserify
	} else if (typeof exports === 'object') {
		factory(global, require('jquery'));
	// Global
	} else {
		factory(global, global.jQuery);
	}
}(typeof window !== 'undefined' ? window : this, function(window, $) {
	'use strict';

	// Common properties to lift for touch or pointer events
	var list = 'over out down up move enter leave cancel'.split(' ');
	var hook = $.extend({}, $.event.mouseHooks);
	var events = {};

	// Support pointer events in IE11+ if available
	if ( window.PointerEvent ) {
		$.each(list, function( i, name ) {
			// Add event name to events property and add fixHook
			$.event.fixHooks[
				(events[name] = 'pointer' + name)
			] = hook;
		});
	} else {
		var mouseProps = hook.props;
		// Add touch properties for the touch hook
		hook.props = mouseProps.concat(['touches', 'changedTouches', 'targetTouches', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']);

		/**
		 * Support: Android
		 * Android sets pageX/Y to 0 for any touch event
		 * Attach first touch's pageX/pageY and clientX/clientY if not set correctly
		 */
		hook.filter = function( event, originalEvent ) {
			var touch;
			var i = mouseProps.length;
			if ( !originalEvent.pageX && originalEvent.touches && (touch = originalEvent.touches[0]) ) {
				// Copy over all mouse properties
				while(i--) {
					event[mouseProps[i]] = touch[mouseProps[i]];
				}
			}
			return event;
		};

		$.each(list, function( i, name ) {
			// No equivalent touch events for over and out
			if (i < 2) {
				events[ name ] = 'mouse' + name;
			} else {
				var touch = 'touch' +
					(name === 'down' ? 'start' : name === 'up' ? 'end' : name);
				// Add fixHook
				$.event.fixHooks[ touch ] = hook;
				// Add event names to events property
				events[ name ] = touch + ' mouse' + name;
			}
		});
	}

	$.pointertouch = events;

	var document = window.document;
	var datakey = '__pz__';
	var slice = Array.prototype.slice;
	var pointerEvents = !!window.PointerEvent;
	var supportsInputEvent = (function() {
		var input = document.createElement('input');
		input.setAttribute('oninput', 'return');
		return typeof input.oninput === 'function';
	})();

	// Regex
	var rupper = /([A-Z])/g;
	var rsvg = /^http:[\w\.\/]+svg$/;
	var rinline = /^inline/;

	var floating = '(\\-?[\\d\\.e]+)';
	var commaSpace = '\\,?\\s*';
	var rmatrix = new RegExp(
		'^matrix\\(' +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + '\\)$'
	);

	/**
	 * Utility for determing transform matrix equality
	 * Checks backwards to test translation first
	 * @param {Array} first
	 * @param {Array} second
	 */
	function matrixEquals(first, second) {
		var i = first.length;
		while(--i) {
			if (+first[i] !== +second[i]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Creates the options object for reset functions
	 * @param {Boolean|Object} opts See reset methods
	 * @returns {Object} Returns the newly-created options object
	 */
	function createResetOptions(opts) {
		var options = { range: true, animate: true };
		if (typeof opts === 'boolean') {
			options.animate = opts;
		} else {
			$.extend(options, opts);
		}
		return options;
	}

	/**
	 * Represent a transformation matrix with a 3x3 matrix for calculations
	 * Matrix functions adapted from Louis Remi's jQuery.transform (https://github.com/louisremi/jquery.transform.js)
	 * @param {Array|Number} a An array of six values representing a 2d transformation matrix
	 */
	function Matrix(a, b, c, d, e, f, g, h, i) {
		if ($.type(a) === 'array') {
			this.elements = [
				+a[0], +a[2], +a[4],
				+a[1], +a[3], +a[5],
				    0,     0,     1
			];
		} else {
			this.elements = [
				a, b, c,
				d, e, f,
				g || 0, h || 0, i || 1
			];
		}
	}

	Matrix.prototype = {
		/**
		 * Multiply a 3x3 matrix by a similar matrix or a vector
		 * @param {Matrix|Vector} matrix
		 * @return {Matrix|Vector} Returns a vector if multiplying by a vector
		 */
		x: function(matrix) {
			var isVector = matrix instanceof Vector;

			var a = this.elements,
				b = matrix.elements;

			if (isVector && b.length === 3) {
				// b is actually a vector
				return new Vector(
					a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
					a[3] * b[0] + a[4] * b[1] + a[5] * b[2],
					a[6] * b[0] + a[7] * b[1] + a[8] * b[2]
				);
			} else if (b.length === a.length) {
				// b is a 3x3 matrix
				return new Matrix(
					a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
					a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
					a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

					a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
					a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
					a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

					a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
					a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
					a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
				);
			}
			return false; // fail
		},
		/**
		 * Generates an inverse of the current matrix
		 * @returns {Matrix}
		 */
		inverse: function() {
			var d = 1 / this.determinant(),
				a = this.elements;
			return new Matrix(
				d * ( a[8] * a[4] - a[7] * a[5]),
				d * (-(a[8] * a[1] - a[7] * a[2])),
				d * ( a[5] * a[1] - a[4] * a[2]),

				d * (-(a[8] * a[3] - a[6] * a[5])),
				d * ( a[8] * a[0] - a[6] * a[2]),
				d * (-(a[5] * a[0] - a[3] * a[2])),

				d * ( a[7] * a[3] - a[6] * a[4]),
				d * (-(a[7] * a[0] - a[6] * a[1])),
				d * ( a[4] * a[0] - a[3] * a[1])
			);
		},
		/**
		 * Calculates the determinant of the current matrix
		 * @returns {Number}
		 */
		determinant: function() {
			var a = this.elements;
			return a[0] * (a[8] * a[4] - a[7] * a[5]) - a[3] * (a[8] * a[1] - a[7] * a[2]) + a[6] * (a[5] * a[1] - a[4] * a[2]);
		}
	};

	/**
	 * Create a vector containing three values
	 */
	function Vector(x, y, z) {
		this.elements = [ x, y, z ];
	}

	/**
	 * Get the element at zero-indexed index i
	 * @param {Number} i
	 */
	Vector.prototype.e = Matrix.prototype.e = function(i) {
		return this.elements[ i ];
	};

	/**
	 * Create a Panzoom object for a given element
	 * @constructor
	 * @param {Element} elem - Element to use pan and zoom
	 * @param {Object} [options] - An object literal containing options to override default options
	 *  (See Panzoom.defaults for ones not listed below)
	 * @param {jQuery} [options.$zoomIn] - zoom in buttons/links collection (you can also bind these yourself
	 *  e.g. $button.on('click', function(e) { e.preventDefault(); $elem.panzoom('zoomIn'); });)
	 * @param {jQuery} [options.$zoomOut] - zoom out buttons/links collection on which to bind zoomOut
	 * @param {jQuery} [options.$zoomRange] - zoom in/out with this range control
	 * @param {jQuery} [options.$reset] - Reset buttons/links collection on which to bind the reset method
	 * @param {Function} [options.on[Start|Change|Zoom|Pan|End|Reset] - Optional callbacks for panzoom events
	 */
	function Panzoom(elem, options) {

		// Allow instantiation without `new` keyword
		if (!(this instanceof Panzoom)) {
			return new Panzoom(elem, options);
		}

		// Sanity checks
		if (elem.nodeType !== 1) {
			$.error('Panzoom called on non-Element node');
		}
		if (!$.contains(document, elem)) {
			$.error('Panzoom element must be attached to the document');
		}

		// Don't remake
		var d = $.data(elem, datakey);
		if (d) {
			return d;
		}

		// Extend default with given object literal
		// Each instance gets its own options
		this.options = options = $.extend({}, Panzoom.defaults, options);
		this.elem = elem;
		var $elem = this.$elem = $(elem);
		this.$set = options.$set && options.$set.length ? options.$set : $elem;
		this.$doc = $(elem.ownerDocument || document);
		this.$parent = $elem.parent();

		// This is SVG if the namespace is SVG
		// However, while <svg> elements are SVG, we want to treat those like other elements
		this.isSVG = rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== 'svg';

		this.panning = false;

		// Save the original transform value
		// Save the prefixed transform style key
		// Set the starting transform
		this._buildTransform();

		// Build the appropriately-prefixed transform style property name
		// De-camelcase
		this._transform = !this.isSVG && $.cssProps.transform.replace(rupper, '-$1').toLowerCase();

		// Build the transition value
		this._buildTransition();

		// Build containment dimensions
		this.resetDimensions();

		// Add zoom and reset buttons to `this`
		var $empty = $();
		var self = this;
		$.each([ '$zoomIn', '$zoomOut', '$zoomRange', '$reset' ], function(i, name) {
			self[ name ] = options[ name ] || $empty;
		});

		this.enable();

		// Save the instance
		$.data(elem, datakey, this);
	}

	// Attach regex for possible use (immutable)
	Panzoom.rmatrix = rmatrix;

	// Container for event names
	Panzoom.events = $.pointertouch;

	Panzoom.defaults = {
		// Should always be non-empty
		// Used to bind jQuery events without collisions
		// A guid is not added here as different instantiations/versions of panzoom
		// on the same element is not supported, so don't do it.
		eventNamespace: '.panzoom',

		// Whether or not to transition the scale
		transition: true,

		// Default cursor style for the element
		cursor: 'move',

		// There may be some use cases for zooming without panning or vice versa
		disablePan: false,
		disableZoom: false,

		// The increment at which to zoom
		// adds/subtracts to the scale each time zoomIn/Out is called
		increment: 0.3,

		minScale: 0.4,
		maxScale: 5,

		// The default step for the range input
		// Precendence: default < HTML attribute < option setting
		rangeStep: 0.05,

		// Animation duration (ms)
		duration: 200,
		// CSS easing used for scale transition
		easing: 'ease-in-out',

		// Indicate that the element should be contained within it's parent when panning
		// Note: this does not affect zooming outside of the parent
		// Set this value to 'invert' to only allow panning outside of the parent element (basically the opposite of the normal use of contain)
		// 'invert' is useful for a large panzoom element where you don't want to show anything behind it
		contain: false
	};

	Panzoom.prototype = {
		constructor: Panzoom,

		/**
		 * @returns {Panzoom} Returns the instance
		 */
		instance: function() {
			return this;
		},

		/**
		 * Enable or re-enable the panzoom instance
		 */
		enable: function() {
			// Unbind first
			this._initStyle();
			this._bind();
			this.disabled = false;
		},

		/**
		 * Disable panzoom
		 */
		disable: function() {
			this.disabled = true;
			this._resetStyle();
			this._unbind();
		},

		/**
		 * @returns {Boolean} Returns whether the current panzoom instance is disabled
		 */
		isDisabled: function() {
			return this.disabled;
		},

		/**
		 * Destroy the panzoom instance
		 */
		destroy: function() {
			this.disable();
			$.removeData(this.elem, datakey);
		},

		/**
		 * Builds the restricing dimensions from the containment element
		 * Also used with focal points
		 * Call this method whenever the dimensions of the element or parent are changed
		 */
		resetDimensions: function() {
			// Reset container properties
			var $parent = this.$parent;
			this.container = {
				width: $parent.innerWidth(),
				height: $parent.innerHeight()
			};
			var po = $parent.offset();
			var elem = this.elem;
			var $elem = this.$elem;
			var dims;
			if (this.isSVG) {
				dims = elem.getBoundingClientRect();
				dims = {
					left: dims.left - po.left,
					top: dims.top - po.top,
					width: dims.width,
					height: dims.height,
					margin: { left: 0, top: 0 }
				};
			} else {
				dims = {
					left: $.css(elem, 'left', true) || 0,
					top: $.css(elem, 'top', true) || 0,
					width: $elem.innerWidth(),
					height: $elem.innerHeight(),
					margin: {
						top: $.css(elem, 'marginTop', true) || 0,
						left: $.css(elem, 'marginLeft', true) || 0
					}
				};
			}
			dims.widthBorder = ($.css(elem, 'borderLeftWidth', true) + $.css(elem, 'borderRightWidth', true)) || 0;
			dims.heightBorder = ($.css(elem, 'borderTopWidth', true) + $.css(elem, 'borderBottomWidth', true)) || 0;
			this.dimensions = dims;
		},

		/**
		 * Return the element to it's original transform matrix
		 * @param {Boolean} [options] If a boolean is passed, animate the reset (default: true). If an options object is passed, simply pass that along to setMatrix.
		 * @param {Boolean} [options.silent] Silence the reset event
		 */
		reset: function(options) {
			options = createResetOptions(options);
			// Reset the transform to its original value
			var matrix = this.setMatrix(this._origTransform, options);
			if (!options.silent) {
				this._trigger('reset', matrix);
			}
		},

		/**
		 * Only resets zoom level
		 * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to zoom()
		 */
		resetZoom: function(options) {
			options = createResetOptions(options);
			var origMatrix = this.getMatrix(this._origTransform);
			options.dValue = origMatrix[ 3 ];
			this.zoom(origMatrix[0], options);
		},

		/**
		 * Only reset panning
		 * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to pan()
		 */
		resetPan: function(options) {
			var origMatrix = this.getMatrix(this._origTransform);
			this.pan(origMatrix[4], origMatrix[5], createResetOptions(options));
		},

		/**
		 * Sets a transform on the $set
		 * @param {String} transform
		 */
		setTransform: function(transform) {
			var method = this.isSVG ? 'attr' : 'style';
			var $set = this.$set;
			var i = $set.length;
			while(i--) {
				$[method]($set[i], 'transform', transform);
			}
		},

		/**
		 * Retrieving the transform is different for SVG
		 *  (unless a style transform is already present)
		 * Uses the $set collection for retrieving the transform
		 * @param {String} [transform] Pass in an transform value (like 'scale(1.1)')
		 *  to have it formatted into matrix format for use by Panzoom
		 * @returns {String} Returns the current transform value of the element
		 */
		getTransform: function(transform) {
			var $set = this.$set;
			var transformElem = $set[0];
			if (transform) {
				this.setTransform(transform);
			} else {
				// Retrieve the transform
				transform = $[this.isSVG ? 'attr' : 'style'](transformElem, 'transform');
			}

			// Convert any transforms set by the user to matrix format
			// by setting to computed
			if (transform !== 'none' && !rmatrix.test(transform)) {
				// Get computed and set for next time
				this.setTransform(transform = $.css(transformElem, 'transform'));
			}

			return transform || 'none';
		},

		/**
		 * Retrieve the current transform matrix for $elem (or turn a transform into it's array values)
		 * @param {String} [transform] matrix-formatted transform value
		 * @returns {Array} Returns the current transform matrix split up into it's parts, or a default matrix
		 */
		getMatrix: function(transform) {
			var matrix = rmatrix.exec(transform || this.getTransform());
			if (matrix) {
				matrix.shift();
			}
			return matrix || [ 1, 0, 0, 1, 0, 0 ];
		},

		/**
		 * Given a matrix object, quickly set the current matrix of the element
		 * @param {Array|String} matrix
		 * @param {Boolean} [animate] Whether to animate the transform change
		 * @param {Object} [options]
		 * @param {Boolean|String} [options.animate] Whether to animate the transform change, or 'skip' indicating that it is unnecessary to set
		 * @param {Boolean} [options.contain] Override the global contain option
		 * @param {Boolean} [options.range] If true, $zoomRange's value will be updated.
		 * @param {Boolean} [options.silent] If true, the change event will not be triggered
		 * @returns {Array} Returns the newly-set matrix
		 */
		setMatrix: function(matrix, options) {
			if (this.disabled) { return; }
			if (!options) { options = {}; }
			// Convert to array
			if (typeof matrix === 'string') {
				matrix = this.getMatrix(matrix);
			}
			var dims, container, marginW, marginH, diffW, diffH, left, top, width, height;
			var scale = +matrix[0];
			var $parent = this.$parent;
			var contain = typeof options.contain !== 'undefined' ? options.contain : this.options.contain;

			// Apply containment
			if (contain) {
				dims = this._checkDims();
				container = this.container;
				width = dims.width + dims.widthBorder;
				height = dims.height + dims.heightBorder;
				// Use absolute value of scale here as negative scale doesn't mean even smaller
				marginW = ((width * Math.abs(scale)) - container.width) / 2;
				marginH = ((height * Math.abs(scale)) - container.height) / 2;
				left = dims.left + dims.margin.left;
				top = dims.top + dims.margin.top;
				if (contain === 'invert') {
					diffW = width > container.width ? width - container.width : 0;
					diffH = height > container.height ? height - container.height : 0;
					marginW += (container.width - width) / 2;
					marginH += (container.height - height) / 2;
					matrix[4] = Math.max(Math.min(matrix[4], marginW - left), -marginW - left - diffW);
					matrix[5] = Math.max(Math.min(matrix[5], marginH - top), -marginH - top - diffH + dims.heightBorder);
				} else {
					// marginW += dims.widthBorder / 2;
					marginH += dims.heightBorder / 2;
					diffW = container.width > width ? container.width - width : 0;
					diffH = container.height > height ? container.height - height : 0;
					// If the element is not naturally centered, assume full margin right
					if ($parent.css('textAlign') !== 'center' || !rinline.test($.css(this.elem, 'display'))) {
						marginW = marginH = 0;
					} else {
						diffW = 0;
					}
					matrix[4] = Math.min(
						Math.max(matrix[4], marginW - left),
						-marginW - left + diffW
					);
					matrix[5] = Math.min(
						Math.max(matrix[5], marginH - top),
						-marginH - top + diffH
					);
				}
			}
			if (options.animate !== 'skip') {
				// Set transition
				this.transition(!options.animate);
			}
			// Update range
			if (options.range) {
				this.$zoomRange.val(scale);
			}

			// Set the matrix on this.$set
			this.setTransform('matrix(' + matrix.join(',') + ')');

			if (!options.silent) {
				this._trigger('change', matrix);
			}

			return matrix;
		},

		/**
		 * @returns {Boolean} Returns whether the panzoom element is currently being dragged
		 */
		isPanning: function() {
			return this.panning;
		},

		/**
		 * Apply the current transition to the element, if allowed
		 * @param {Boolean} [off] Indicates that the transition should be turned off
		 */
		transition: function(off) {
			if (!this._transition) { return; }
			var transition = off || !this.options.transition ? 'none' : this._transition;
			var $set = this.$set;
			var i = $set.length;
			while(i--) {
				// Avoid reflows when zooming
				if ($.style($set[i], 'transition') !== transition) {
					$.style($set[i], 'transition', transition);
				}
			}
		},

		/**
		 * Pan the element to the specified translation X and Y
		 * Note: this is not the same as setting jQuery#offset() or jQuery#position()
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Object} [options] These options are passed along to setMatrix
		 * @param {Array} [options.matrix] The matrix being manipulated (if already known so it doesn't have to be retrieved again)
		 * @param {Boolean} [options.silent] Silence the pan event. Note that this will also silence the setMatrix change event.
		 * @param {Boolean} [options.relative] Make the x and y values relative to the existing matrix
		 */
		pan: function(x, y, options) {
			if (this.options.disablePan) { return; }
			if (!options) { options = {}; }
			var matrix = options.matrix;
			if (!matrix) {
				matrix = this.getMatrix();
			}
			// Cast existing matrix values to numbers
			if (options.relative) {
				x += +matrix[4];
				y += +matrix[5];
			}
			matrix[4] = x;
			matrix[5] = y;
			this.setMatrix(matrix, options);
			if (!options.silent) {
				this._trigger('pan', matrix[4], matrix[5]);
			}
		},

		/**
		 * Zoom in/out the element using the scale properties of a transform matrix
		 * @param {Number|Boolean} [scale] The scale to which to zoom or a boolean indicating to transition a zoom out
		 * @param {Object} [opts] All global options can be overwritten by this options object. For example, override the default increment.
		 * @param {Boolean} [opts.noSetRange] Specify that the method should not set the $zoomRange value (as is the case when $zoomRange is calling zoom on change)
		 * @param {jQuery.Event|Object} [opts.focal] A focal point on the panzoom element on which to zoom.
		 *  If an object, set the clientX and clientY properties to the position relative to the parent
		 * @param {Boolean} [opts.animate] Whether to animate the zoom (defaults to true if scale is not a number, false otherwise)
		 * @param {Boolean} [opts.silent] Silence the zoom event
		 * @param {Array} [opts.matrix] Optionally pass the current matrix so it doesn't need to be retrieved
		 * @param {Number} [opts.dValue] Think of a transform matrix as four values a, b, c, d
		 *  where a/d are the horizontal/vertical scale values and b/c are the skew values
		 *  (5 and 6 of matrix array are the tx/ty transform values).
		 *  Normally, the scale is set to both the a and d values of the matrix.
		 *  This option allows you to specify a different d value for the zoom.
		 *  For instance, to flip vertically, you could set -1 as the dValue.
		 */
		zoom: function(scale, opts) {
			// Shuffle arguments
			if (typeof scale === 'object') {
				opts = scale;
				scale = null;
			} else if (!opts) {
				opts = {};
			}
			var options = $.extend({}, this.options, opts);
			// Check if disabled
			if (options.disableZoom) { return; }
			var animate = false;
			var matrix = options.matrix || this.getMatrix();

			// Calculate zoom based on increment
			if (typeof scale !== 'number') {
				scale = +matrix[0] + (options.increment * (scale ? -1 : 1));
				animate = true;
			}

			// Constrain scale
			if (scale > options.maxScale) {
				scale = options.maxScale;
			} else if (scale < options.minScale) {
				scale = options.minScale;
			}

			// Calculate focal point based on scale
			var focal = options.focal;
			if (focal && !options.disablePan) {
				// Adapted from code by Florian Günther
				// https://github.com/florianguenther/zui53
				var dims = this._checkDims();
				var clientX = focal.clientX;
				var clientY = focal.clientY;
				// Adjust the focal point for default transform-origin => 50% 50%
				if (!this.isSVG) {
					clientX -= (dims.width + dims.widthBorder) / 2;
					clientY -= (dims.height + dims.heightBorder) / 2;
				}
				var clientV = new Vector(clientX, clientY, 1);
				var surfaceM = new Matrix(matrix);
				// Supply an offset manually if necessary
				var o = this.parentOffset || this.$parent.offset();
				var offsetM = new Matrix(1, 0, o.left - this.$doc.scrollLeft(), 0, 1, o.top - this.$doc.scrollTop());
				var surfaceV = surfaceM.inverse().x(offsetM.inverse().x(clientV));
				var scaleBy = scale / matrix[0];
				surfaceM = surfaceM.x(new Matrix([ scaleBy, 0, 0, scaleBy, 0, 0 ]));
				clientV = offsetM.x(surfaceM.x(surfaceV));
				matrix[4] = +matrix[4] + (clientX - clientV.e(0));
				matrix[5] = +matrix[5] + (clientY - clientV.e(1));
			}

			// Set the scale
			matrix[0] = scale;
			matrix[3] = typeof options.dValue === 'number' ? options.dValue : scale;

			// Calling zoom may still pan the element
			this.setMatrix(matrix, {
				animate: typeof options.animate === 'boolean' ? options.animate : animate,
				// Set the zoomRange value
				range: !options.noSetRange
			});

			// Trigger zoom event
			if (!options.silent) {
				this._trigger('zoom', matrix[0], options);
			}
		},

		/**
		 * Get/set option on an existing instance
		 * @returns {Array|undefined} If getting, returns an array of all values
		 *   on each instance for a given key. If setting, continue chaining by returning undefined.
		 */
		option: function(key, value) {
			var options;
			if (!key) {
				// Avoids returning direct reference
				return $.extend({}, this.options);
			}

			if (typeof key === 'string') {
				if (arguments.length === 1) {
					return this.options[ key ] !== undefined ?
						this.options[ key ] :
						null;
				}
				options = {};
				options[ key ] = value;
			} else {
				options = key;
			}

			this._setOptions(options);
		},

		/**
		 * Internally sets options
		 * @param {Object} options - An object literal of options to set
		 */
		_setOptions: function(options) {
			$.each(options, $.proxy(function(key, value) {
				switch(key) {
					case 'disablePan':
						this._resetStyle();
						/* falls through */
					case '$zoomIn':
					case '$zoomOut':
					case '$zoomRange':
					case '$reset':
					case 'disableZoom':
					case 'onStart':
					case 'onChange':
					case 'onZoom':
					case 'onPan':
					case 'onEnd':
					case 'onReset':
					case 'eventNamespace':
						this._unbind();
				}
				this.options[ key ] = value;
				switch(key) {
					case 'disablePan':
						this._initStyle();
						/* falls through */
					case '$zoomIn':
					case '$zoomOut':
					case '$zoomRange':
					case '$reset':
						// Set these on the instance
						this[ key ] = value;
						/* falls through */
					case 'disableZoom':
					case 'onStart':
					case 'onChange':
					case 'onZoom':
					case 'onPan':
					case 'onEnd':
					case 'onReset':
					case 'eventNamespace':
						this._bind();
						break;
					case 'cursor':
						$.style(this.elem, 'cursor', value);
						break;
					case 'minScale':
						this.$zoomRange.attr('min', value);
						break;
					case 'maxScale':
						this.$zoomRange.attr('max', value);
						break;
					case 'rangeStep':
						this.$zoomRange.attr('step', value);
						break;
					case 'startTransform':
						this._buildTransform();
						break;
					case 'duration':
					case 'easing':
						this._buildTransition();
						/* falls through */
					case 'transition':
						this.transition();
						break;
					case '$set':
						if (value instanceof $ && value.length) {
							this.$set = value;
							// Reset styles
							this._initStyle();
							this._buildTransform();
						}
				}
			}, this));
		},

		/**
		 * Initialize base styles for the element and its parent
		 */
		_initStyle: function() {
			var styles = {
				// Promote the element to it's own compositor layer
				'backface-visibility': 'hidden',
				// Set to defaults for the namespace
				'transform-origin': this.isSVG ? '0 0' : '50% 50%'
			};
			// Set elem styles
			if (!this.options.disablePan) {
				styles.cursor = this.options.cursor;
			}
			this.$set.css(styles);

			// Set parent to relative if set to static
			var $parent = this.$parent;
			// No need to add styles to the body
			if ($parent.length && !$.nodeName($parent[0], 'body')) {
				styles = {
					overflow: 'hidden'
				};
				if ($parent.css('position') === 'static') {
					styles.position = 'relative';
				}
				$parent.css(styles);
			}
		},

		/**
		 * Undo any styles attached in this plugin
		 */
		_resetStyle: function() {
			this.$elem.css({
				'cursor': '',
				'transition': ''
			});
			this.$parent.css({
				'overflow': '',
				'position': ''
			});
		},

		/**
		 * Binds all necessary events
		 */
		_bind: function() {
			var self = this;
			var options = this.options;
			var ns = options.eventNamespace;
			var str_start = pointerEvents ? 'pointerdown' + ns : ('touchstart' + ns + ' mousedown' + ns);
			var str_click = pointerEvents ? 'pointerup' + ns : ('touchend' + ns + ' click' + ns);
			var events = {};
			var $reset = this.$reset;
			var $zoomRange = this.$zoomRange;

			// Bind panzoom events from options
			$.each([ 'Start', 'Change', 'Zoom', 'Pan', 'End', 'Reset' ], function() {
				var m = options[ 'on' + this ];
				if ($.isFunction(m)) {
					events[ 'panzoom' + this.toLowerCase() + ns ] = m;
				}
			});

			// Bind $elem drag and click/touchdown events
			// Bind touchstart if either panning or zooming is enabled
			if (!options.disablePan || !options.disableZoom) {
				events[ str_start ] = function(e) {
					var touches;
					if (e.type === 'touchstart' ?
						// Touch
						(touches = e.touches) &&
							((touches.length === 1 && !options.disablePan) || touches.length === 2) :
						// Mouse/Pointer: Ignore right click
						!options.disablePan && e.which === 1) {

						e.preventDefault();
						e.stopPropagation();
						self._startMove(e, touches);
					}
				};
			}
			this.$elem.on(events);

			// Bind reset
			if ($reset.length) {
				$reset.on(str_click, function(e) {
					e.preventDefault();
					self.reset();
				});
			}

			// Set default attributes for the range input
			if ($zoomRange.length) {
				$zoomRange.attr({
					// Only set the range step if explicit or
					// set the default if there is no attribute present
					step: options.rangeStep === Panzoom.defaults.rangeStep &&
						$zoomRange.attr('step') ||
						options.rangeStep,
					min: options.minScale,
					max: options.maxScale
				}).prop({
					value: this.getMatrix()[0]
				});
			}

			// No bindings if zooming is disabled
			if (options.disableZoom) {
				return;
			}

			var $zoomIn = this.$zoomIn;
			var $zoomOut = this.$zoomOut;

			// Bind zoom in/out
			// Don't bind one without the other
			if ($zoomIn.length && $zoomOut.length) {
				// preventDefault cancels future mouse events on touch events
				$zoomIn.on(str_click, function(e) {
					e.preventDefault();
					self.zoom();
				});
				$zoomOut.on(str_click, function(e) {
					e.preventDefault();
					self.zoom(true);
				});
			}

			if ($zoomRange.length) {
				events = {};
				// Cannot prevent default action here, just use pointerdown/mousedown
				events[ (pointerEvents ? 'pointerdown' : 'mousedown') + ns ] = function() {
					self.transition(true);
				};
				// Zoom on input events if available and change events
				// See https://github.com/timmywil/jquery.panzoom/issues/90
				events[ (supportsInputEvent ? 'input' : 'change') + ns ] = function() {
					self.zoom(+this.value, { noSetRange: true });
				};
				$zoomRange.on(events);
			}
		},

		/**
		 * Unbind all events
		 */
		_unbind: function() {
			this.$elem
				.add(this.$zoomIn)
				.add(this.$zoomOut)
				.add(this.$reset)
				.off(this.options.eventNamespace);
		},

		/**
		 * Builds the original transform value
		 */
		_buildTransform: function() {
			// Save the original transform
			// Retrieving this also adds the correct prefixed style name
			// to jQuery's internal $.cssProps
			return this._origTransform = this.getTransform(this.options.startTransform);
		},

		/**
		 * Set transition property for later use when zooming
		 * If SVG, create necessary animations elements for translations and scaling
		 */
		_buildTransition: function() {
			if (this._transform) {
				var options = this.options;
				this._transition = this._transform + ' ' + options.duration + 'ms ' + options.easing;
			}
		},

		/**
		 * Checks dimensions to make sure they don't need to be re-calculated
		 */
		_checkDims: function() {
			var dims = this.dimensions;
			// Rebuild if width or height is still 0
			if (!dims.width || !dims.height) {
				this.resetDimensions();
			}
			return this.dimensions;
		},

		/**
		 * Calculates the distance between two touch points
		 * Remember pythagorean?
		 * @param {Array} touches
		 * @returns {Number} Returns the distance
		 */
		_getDistance: function(touches) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return Math.sqrt(Math.pow(Math.abs(touch2.clientX - touch1.clientX), 2) + Math.pow(Math.abs(touch2.clientY - touch1.clientY), 2));
		},

		/**
		 * Constructs an approximated point in the middle of two touch points
		 * @returns {Object} Returns an object containing pageX and pageY
		 */
		_getMiddle: function(touches) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return {
				clientX: ((touch2.clientX - touch1.clientX) / 2) + touch1.clientX,
				clientY: ((touch2.clientY - touch1.clientY) / 2) + touch1.clientY
			};
		},

		/**
		 * Trigger a panzoom event on our element
		 * The event is passed the Panzoom instance
		 * @param {String|jQuery.Event} event
		 * @param {Mixed} arg1[, arg2, arg3, ...] Arguments to append to the trigger
		 */
		_trigger: function (event) {
			if (typeof event === 'string') {
				event = 'panzoom' + event;
			}
			this.$elem.triggerHandler(event, [this].concat(slice.call(arguments, 1)));
		},

		/**
		 * Starts the pan
		 * This is bound to mouse/touchmove on the element
		 * @param {jQuery.Event} event An event with pageX, pageY, and possibly the touches list
		 * @param {TouchList} [touches] The touches list if present
		 */
		_startMove: function(event, touches) {
			var move, moveEvent, endEvent,
				startDistance, startScale, startMiddle,
				startPageX, startPageY;
			var self = this;
			var options = this.options;
			var ns = options.eventNamespace;
			var matrix = this.getMatrix();
			var original = matrix.slice(0);
			var origPageX = +original[4];
			var origPageY = +original[5];
			var panOptions = { matrix: matrix, animate: 'skip' };

			// Use proper events
			if (pointerEvents) {
				moveEvent = 'pointermove';
				endEvent = 'pointerup';
			} else if (event.type === 'touchstart') {
				moveEvent = 'touchmove';
				endEvent = 'touchend';
			} else {
				moveEvent = 'mousemove';
				endEvent = 'mouseup';
			}

			// Add namespace
			moveEvent += ns;
			endEvent += ns;

			// Remove any transitions happening
			this.transition(true);

			// Indicate that we are currently panning
			this.panning = true;

			// Trigger start event
			this._trigger('start', event, touches);

			if (touches && touches.length === 2) {
				startDistance = this._getDistance(touches);
				startScale = +matrix[0];
				startMiddle = this._getMiddle(touches);
				move = function(e) {
					e.preventDefault();

					// Calculate move on middle point
					var middle = self._getMiddle(touches = e.touches);
					var diff = self._getDistance(touches) - startDistance;

					// Set zoom
					self.zoom(diff * (options.increment / 100) + startScale, {
						focal: middle,
						matrix: matrix,
						animate: false
					});

					// Set pan
					self.pan(
						+matrix[4] + middle.clientX - startMiddle.clientX,
						+matrix[5] + middle.clientY - startMiddle.clientY,
						panOptions
					);
					startMiddle = middle;
				};
			} else {
				startPageX = event.pageX;
				startPageY = event.pageY;

				/**
				 * Mousemove/touchmove function to pan the element
				 * @param {Object} e Event object
				 */
				move = function(e) {
					e.preventDefault();
					self.pan(
						origPageX + e.pageX - startPageX,
						origPageY + e.pageY - startPageY,
						panOptions
					);
				};
			}

			// Bind the handlers
			$(document)
				.off(ns)
				.on(moveEvent, move)
				.on(endEvent, function(e) {
					e.preventDefault();
					// Unbind all document events
					$(this).off(ns);
					self.panning = false;
					// Trigger our end event
					// Simply set the type to "panzoomend" to pass through all end properties
					// jQuery's `not` is used here to compare Array equality
					e.type = 'panzoomend';
					self._trigger(e, matrix, !matrixEquals(matrix, original));
				});
		}
	};

	// Add Panzoom as a static property
	$.Panzoom = Panzoom;

	/**
	 * Extend jQuery
	 * @param {Object|String} options - The name of a method to call on the prototype
	 *  or an object literal of options
	 * @returns {jQuery|Mixed} jQuery instance for regular chaining or the return value(s) of a panzoom method call
	 */
	$.fn.panzoom = function(options) {
		var instance, args, m, ret;

		// Call methods widget-style
		if (typeof options === 'string') {
			ret = [];
			args = slice.call(arguments, 1);
			this.each(function() {
				instance = $.data(this, datakey);

				if (!instance) {
					ret.push(undefined);

				// Ignore methods beginning with `_`
				} else if (options.charAt(0) !== '_' &&
					typeof (m = instance[ options ]) === 'function' &&
					// If nothing is returned, do not add to return values
					(m = m.apply(instance, args)) !== undefined) {

					ret.push(m);
				}
			});

			// Return an array of values for the jQuery instances
			// Or the value itself if there is only one
			// Or keep chaining
			return ret.length ?
				(ret.length === 1 ? ret[0] : ret) :
				this;
		}

		return this.each(function() { new Panzoom(this, options); });
	};

	return Panzoom;
}));

/**
 * Feature object functions
 * @ author Charles Jones
 * @ version 1601
 * @ description Object containing Feature Options
 */

(function (window, $, cricket) {
    'use strict';

    if (!$) {
        throw 'jQuery not found.';
    }
    
    /**
     * Modify Cart Object
     * @namespace cricket.modifyCart
     * @memberof cricket
     * @author Charles Jones
     * @version 1602
     * @description Utility used Adding, Removing, and clearing the Cart
     */
    
    cricket.modifyCart = {
        
        skuId: '',
        method: '',
        redirect: '',
        woopraObject: '',
        body: 'body',
        pickerOverlay: '#pickerOverlay',
        dropDown: '.item-added-details p',
        
        
        /**
         * Add To Cart
         * @author Charles Jones
         * @modified Anselm Marie
         * @version 1602
         * @function addToCart
         * @memberof cricket.modifyCart
         * @description Used to add an item to the card and check to for any issues while adding
         * @param {string} skuId: SKU of the Product
         * @param {string} method: Method type for the Add to Cart function
         * @param {string} redirect: How to redirect the user after Item is added
         * @param {string} woopraObject: How to redirect the user after Item is added
         */
        addToCart: function (skuId, method, redirect, woopraObject) {
            
            var me = this;
            
            me.skuId = skuId;
            me.method = method;
            me.redirect = redirect;
            me.woopraObject = woopraObject;
            
            $(me.body).spin();
            $(me.body).prepend('<div id="pickerOverlay"></div>');
            
            $('button#add_' + skuId).attr({'disabled': 'disabled', 'aria-disabled': 'true'});
            $('a#add_' + skuId).addClass('disabled-link');
            $(".modal .btn-primary.conflict-add-to-cart").attr({'disabled': 'disabled', 'aria-disabled': 'true'});
            
            // Checking the order info repsonse and making sure the response doesn't have an error in it.
            if (isInResults('orderinfo') && !getServiceResult('orderinfo').errorCode) {

                me.addToCartContinue();

                /** Checking OldAccountInfo Response  */
            } else {
                queueRestCall(
                    'accountinfo',
                    'GET',
                    {},
                    function (accountInfoResponse) {


                        if (accountInfoResponse.amss_authenticated) { // logged in

                            /** Scenario: Add a Line flow with max of 9 lines and must not be in the upgrade/sim swap flow */
                            if (accountInfoResponse.number_of_lines === 9 && accountInfoResponse.flow_type !== 'upgrade' && accountInfoResponse.flow_type !== 'SIM_swap') {

                                loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/lineMaxModal.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#lineMaxModal');

                                /** Scenario BYOD Only: BYOD item with add a line flow and less then 9 lines || BYOD item with upgrade flow */
                            } else if (me.redirect.indexOf('byod') >= 0 && accountInfoResponse.number_of_lines < 9 && accountInfoResponse.flow_type === "add_line" || me.redirect.indexOf('byod') >= 0 && accountInfoResponse.flow_type == "upgrade") {

                                //addBYODToCart();
                                me.addToCartContinue();

                                /** Scenario BYOD Only: Account is suspended */
                            } else if (accountInfoResponse.account_status == "suspended") {

                                loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/acctSuspendModal.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#acctSuspendModal');
                                
                                /** Scenario: Account is on bridge pay */
                            } else if (accountInfoResponse.bridge_pay == "Y") {

                                loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/bridgePayModal.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#bridgePayModal');

                                /** Scenario: Account has a line pending */
                            } else if (accountInfoResponse.line_pending_activation == "Y") {

                                loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/linePendingModal.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#linePendingModal');

                                /** Scenario: No flow type so redirect them to AMSS flow type page */
                            } else if (!accountInfoResponse.flow_type) {

                                if (me.redirect.indexOf('amss') < 0) {
                                    me.redirect += '-amss'
                                }
                                me.addToCartContinue();
                                /** Scenario: Account in good standing */
                            } else if (accountInfoResponse.account_status == "active") {

                                if (me.redirect.indexOf('byod') >= 0) {
                                    me.redirect = 'byod-checkout';
                                }
                                
                                me.addToCartContinue();
                            }
                        } else {
                            me.addToCartContinue();
                        }
                    },
                    null,
                    true,
                    false
                );
            }
        },
        
        /**
         * Add To Cart Continue
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function addToCartContinue
         * @memberof cricket.modifyCart
         * @description After the user is in good standing we are checking if a method was used
         */
        addToCartContinue: function() {

            if (this.method == "removeThenAddToCart") {
                this.removeFromCart(this.skuId, this.redirect);
            } else if (this.method == "clearFeatureThenAddToCart") {
                this.removeFromCart(this.skuId, this.redirect, 'true');
            } else if (this.method == "clearThenAddToCart" || this.method == "clearFlowThenAddToCart") {
                this.clearCart(this.skuId, this.method, this.redirect);
            } else {
                this.addOnServer();
            }
        },
        
        /**
         * Add To Cart Server
         * @author Anselm Marie, Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function addOnServer
         * @memberof cricket.modifyCart
         * @description This function calls the endpoint to add the product to the cart.
         */
        addOnServer: function () {
            
            var me = this;
            var data = {"sku": this.skuId};
            
            /** Adding data to the IMEI var when needed */
            if (me.redirect.indexOf('byod') >= 0 || me.redirect.indexOf('prepurchased') >= 0) {
                if ($('#IMEI_number, #imei_number, [name="IMEI"]:visible').val()) {
                    data.IMEI = $('#IMEI_number, #imei_number, [name="IMEI"]:visible').val();
                }
            }

            /** Adding data to the ICCID and simtype vars when needed */
            if (me.redirect.indexOf('prepurchased') >= 0) {
                if ($('#sim_number').val()) {
                    data.ICCID = $('#sim_number').val();
                    data.simtype = 'nano';
                }
            }

            queueRestCall(
                "addItem",
                "GET", 
                data,
                function(response) {
                    
                    if (response.hasOwnProperty('errorCode') && response.errorCode === 'ATC009') {
                        me.addToCartError(response);
                        return false;
                    }
                    
                    queueRestCall(
                        "getproducts",
                        "GET", {
                            "skus": me.skuId
                        },
                        function (productDetails) {

                            /** If the item is a device or accessory we are calling the CQ service as well */
                            if ( me.redirect.indexOf('device') >= 0 || me.redirect.indexOf('accessory') >= 0 ) {

                                $.ajax({
                                    url: '/bin/listProducts',
                                    contentType: 'application/json; charset=utf-8',
                                    dataType: 'json',
                                    data: {
                                        'skuID': me.skuId
                                    }
                                })
                                .done(function(cqResponse) {
                                    cqResponse[0].price = productDetails.productList[0].price;
                                    me.itemAddedSuccessOrError("add", response, cqResponse);
                                });

                            } else {

                                var skuDetails = productDetails.productList;

                                /** Changing the SIM brand name and adding a model since its null */
                                if (me.redirect.indexOf('feature') >= 0) {
                                    skuDetails[0].model = "Feature";
                                } else if (me.redirect.indexOf('plan') >= 0) {
                                    skuDetails[0].model = "Plan";
                                }

                                if (me.method == "clearThenAddToCart") {
                                    $("#planInCart").modal("hide");
                                    $("#displayFullCart").modal("hide");
                                }

                                me.itemAddedSuccessOrError("add", response, skuDetails);

                            }

                        },
                        function (errorstatus) {},
                        true,
                        true
                    );

                },
                function(status) {
                    me.addToCartError('ATC100');
                    cricket.modifyCart.returnAbilityToAddItemToCart();
                },
                false,
                false
            );

        },
        
        /**
         * Item Added Success Or Error
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function itemAddedSuccessOrError
         * @memberof cricket.modifyCart
         * @description Checking if the response was an error or a success then intit that flow
         * @param {string} actionType: Since for now add to cart and remove from cart end up here this will indicate which one by 'add' or 'remove'
         * @param {object} response: Response from the ATC Call
         * @param {object} skuDetails: Details on the product client wants to add
         */
        itemAddedSuccessOrError: function (actionType, response, skuDetails) {
            if (response.errorCode) {

                /** If the skuDetails is an accessory response then change the variable slightly */
                if (skuDetails && skuDetails.accessories) {
                    skuDetails = skuDetails.accessories;
                }

                /** Pass error code to error handler */
                this.addToCartError(response, skuDetails);
                //Removing transparent overlay.
                $(this.pickerOverlay).remove();

            } else {

                // Remove the disabled attribute from the 'add to cart' button
                $('button#add_' + response.sku).removeAttr('disabled').attr('aria-disabled', 'false');

                // If not on accessories page, turn 'add to cart' button into a remove button
                if($(this.body).hasClass("shop_accessories") || this.redirect == 'accessory') {
                    $("#add_" + response.sku).html("Add More");
                } else {
                    $("#add_" + response.sku).addClass("remove").html("Remove").attr("onclick", "cricket.modifyCart.removeFromCart('" + response.sku + "', 'remove-only');");
                }

                // Show the Item Added drop down from the header
                var brand = "";
                var model = "";
                if (skuDetails) {

                    // added to search for plans by sku_id because we can not rely on the first item always being the one we need
                    // since plans all come back together and not always in same order from /v1/getproducts/
                    var cartItem = $.grep(skuDetails, function(_item){
                        return _item.skuId === cricket.modifyCart.skuId;
                    });

                    if (cartItem && cartItem.length > 0) {
                        brand = cartItem[0].brand;
                        model = (!cartItem[0].model || cartItem[0].model == undefined) ? '' : cartItem[0].model;
                        $(this.dropDown).html("The " + brand + " " + model + " is in your cart.");

                    } else if (skuDetails.accessories && skuDetails.accessories[0].brand) {

                        brand = skuDetails.accessories[0].brand;
                        model = (skuDetails.accessories[0].name);
                        $(this.dropDown).html("The " + brand + " " + model + " is in your cart.");

                    } else {
                        $(this.dropDown).html("The item was added to your cart.");
                    }

                } else {
                    $(this.dropDown).html("The item was added to your cart.");
                }

                $(".modal:visible").modal("hide");
                $(".item-added-details h4").html("Item Added");
                $("#itemAdded").removeClass("removed");
                $("#itemAdded").slideDown(300);

                // cricket.utilities.createPicker(pickerCurrentPage, true);
                queueRestCall(
                    "cartsummary",
                    "GET",
                    {},
                    function(response){
                        cricket.utilities.createPicker(response, true);
                    },
                    null,
                    true,
                    true
                );

                // for plans page only, change the plan button to Remove and reset the others
                if($("a.shop").length > 0 ) {
                    if(brand.indexOf("Talk") > -1) {
                        brand = "Talk";
                    }
                    $("." + brand).addClass("remove").html("Remove");
                    $.each($("a.shop:not(." + brand + ")"), function(i, btn){
                        $(btn).removeClass("remove").html(($(btn).hasClass('mobile')) ? "Add To Cart" : "Get "+$(btn).attr("data-planName"));
                    });
                }

                // Pass sku and redirect to success handler
                this.updateCartSuccess(actionType);

            }

        },
                
        /**
         * Update Cart Success
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function updateCartSuccess
         * @memberof cricket.modifyCart
         * @description When an add or remove action is performed successfully on the cart.
         * @param {string} actionType: Since for now add to cart and remove from cart end up here this will indicate which one by 'add' or 'remove'
         */
        updateCartSuccess: function (actionType) {
            // update cart total before anything happens because we have a delay
            
            var me = this;
            
            if(window.location.pathname == '/shop/cart.html' && (me.redirect == '' || me.redirect == 'accessory')){
                $(me.body).spin(false);
                window.location.reload();
            }

            /** Make sure to remove the spinner if no redirect_to was created */
            if (me.redirect == '' || me.redirect == 'accessory') {
                $(me.body).spin(false);
            }

            queueRestCall(
                "cartsummary", 
                "GET", 
                {},
                function(cartResponse) {
                    
                    // to show the "Hi Five!" notification
                    cricket.utilities.updateCartTotal(cartResponse);
                    
                    if(actionType == "add") {  // if it remove then will have already been tracked because it's no longer in the cart
                        trackCart(actionType, getCartTrackData(me.skuId, cartResponse), me.woopraObject);
                    }

                    setTimeout(function() {
                        $("#itemAdded").slideUp(300, function() {
                            //Removing transparent overlay.
                            $(me.pickerOverlay).remove();

                            queueRestCall(
                                "accountinfo", "GET", {},
                                function(accountInfoResponse) {
                                    me.updateCartRedirect(cartResponse, accountInfoResponse)
                                },
                                null,
                                false,
                                false
                            );
                        });
                    }, 2500);
                },
                null,
                true,
                true
            );
        },
        
        /**
         * Redirect To Directed Link
         * @author Charles Jones
         * @version 1602
         * @function redirectTo
         * @memberof cricket.modifyCart
         * @description Redirects the User to the Provided Link
         * @param {string} link: Link to send the user to
         */
           
        redirectTo: function(link) {
            window.location.href = link;
        },
        
        /**
         * How the Client is Redirected after add to Cart Success
         * @author Charles Jones
         * @version 1602
         * @function updateCartRedirect
         * @memberof cricket.modifyCart
         * @description How the Client is Redirected after add to Cart Success
         * @param {object} cartResponse: Cart Response Object
         * @param {object} accountInfoResponse: Account Info Response Object
         */
        
        updateCartRedirect: function(cartResponse ,accountInfoResponse) {
            if (this.redirect == 'device' || this.redirect == 'byod') {
                if (cartResponse.plan && cartResponse.plan.SKU) {
                    if(accountInfoResponse.flow_type == "upgrade") {
                        if (this.redirect == 'device') {
                            this.redirectTo("/my-account/upgrade-insurance.html");
                        } else {
                            this.redirectTo("/my-account/upgradeline.html");
                        }
                    } else {
                        this.redirectTo("/shop/features.html");
                    }
                } else {
                    this.redirectTo("/cell-phone-plans");
                }
            } else if (this.redirect == 'prepurchased') {

                if ($.cookie("userName")) {
                    if (cartResponse.plan && cartResponse.plan.SKU) {
                        if(accountInfoResponse.flow_type == "upgrade") {
                            redirectToAMSSLogin("/my-account/upgradeline.html", 'prepurchased-amss');
                        } else {
                            redirectToAMSSLogin("/shop/features.html", 'prepurchased-amss');
                        }
                    } else {
                        redirectToAMSSLogin("/cell-phone-plans", 'prepurchased-amss');
                    }
                } else {
                    this.redirectTo("/shop/device/prepurchased-activity-selection.html");
                }

            } else if (this.redirect == 'plan') {

                if (cartResponse.device && cartResponse.device.SKU) {
                    if(accountInfoResponse.flow_type == "upgrade") {
                        this.redirectTo("/my-account/upgradeline.html");
                    } else {
                        this.redirectTo("/en/shop/features.html");
                    }
                } else {
                    //Show modal becuase user does not have a device in cart
                    $('#shopDeviceSelection').modal();
                    $(this.body).spin(false);
                    return;
                }

            } else if (this.redirect == 'cart' || this.redirect == 'byod-checkout') {
                this.redirectTo("/en/shop/cart.html");

                /** AMSS - Go to the My Account Page - Configure Device Page Cookie */
            } else if (this.redirect == 'byod-amss' || this.redirect == 'device-amss') {
                redirectToAMSSLogin("/cell-phone-plans.html");

            } else if (this.redirect == 'prepurchased-amss') {

                /** AMSS - Go to the My Account Page - Checkout Page Cookie */
                if ($(this.body).hasClass('shop_checkout_single_page')) {
                    redirectToAMSSLogin("/shop/checkout.html", this.redirect);
                    /** AMSS - Go to the My Account Page - Configure Device Page Cookie */
                } else {
                    redirectToAMSSLogin("/cell-phone-plans", this.redirect);
                }

                /** AMSS - Go to the My Account Page - Cart Page Cookie */
            } else if (this.redirect == 'accessory-amss') {
                redirectToAMSSLogin("/shop/cart.html");

                /** AMSS - Go to the My Account Page - Plan Page Cookie */
            } else if (this.redirect == 'plan-amss') {

                redirectToAMSSLogin("/cell-phones/smartphones");

            } else {
                $(this.body).spin(false);
                this.updatePageDisplayIfCartEmpty();
            } 
        },
        
        /**
         * Add To Cart - Checking the error code
         * @author Anselm Marie, Stevo Perisic
         * @modified Charles Jones
         * @version 1602
         * @function addToCartError
         * @memberof cricket.modifyCart
         * @description (Based on the error_code we are calling a certain function to create an error modal)
         * @param {string/object} response: from the cart or error code
         * @param {object} skuDetails: The details of the SKU item
         */
        
        addToCartError: function (response, skuDetails) {
            
            $(this.pickerOverlay).remove();
            
            var errorCode = ''
        
            if (typeof response == 'string') {
                errorCode = response;
            } else {
                errorCode = response.errorCode;
            }
        
            cricket.utilities.translateError(null, errorCode, '', true);

            switch (errorCode) {
                case "ATC001": //Device already in cart
                    if ( this.redirect.indexOf('prepurchased') >= 0 ) {
                        this.itemsInCartSIMError();
                    } else {
                        this.deviceAlreadyInCart(skuDetails);
                    }
                    break;
                case "ATC002": //Plan already in cart
                    if ( this.redirect.indexOf('prepurchased') >= 0 ) {
                        this.itemsInCartSIMError();
                    } else {
                        this.planAlreadyInCart(skuDetails);
                    }
                    break;
                case "ATC003": //Feature already in cart
                    if ( this.redirect.indexOf('prepurchased') >= 0 ) {
                        this.itemsInCartSIMError();
                    } else {
                        this.featureAlreadyInCart(skuDetails);
                    }
                    break;
                case "ATC004": //Sim already in cart
                    if ( this.redirect.indexOf('prepurchased') >= 0 ) {
                        this.itemsInCartSIMError();
                    } else {
                        this.simAlreadyInCart(skuDetails);
                    }
                    break;
                case "ATC005": //Plan not compatible with device
                    this.planNotCompatible(skuDetails);
                    break;
                case "ATC006": //Feature not compatible with device;
                    this.featureDeviceNotCompatible(skuDetails);
                    break;
                case "ATC007": //Device not compatible with plan
                    this.deviceNotCompatible(skuDetails);
                    break;
                case "ATC008":
                    //Feature not compatible with Plan
                    this.featurePlanNotCompatible();
                    break;
                case "ATC009": //Invalid sku (bad sku value was sent)
                    this.invalidSKU();
                    break;
                case "ATC010": //Out of stock
                    this.outOfStock(skuDetails);
                    break;
                case "ATC011": //Sku not for sale (found but not for sale)
                    this.skuNotForSale(skuDetails);
                    break;
                case "ATC012": //Cart is full
                    if ( this.redirect.indexOf('prepurchased') >= 0 ) {
                        this.itemsInCartSIMError();
                    } else {
                        this.cartIsFull(skuDetails);
                    }
                    break;
                case "ATC013": //Plan not compatible with existing features
                    this.planFeaturesNotCompatibleError(skuDetails);
                    break;
                case "ATC014": //If IMEI is stolen
                    this.imeiStolenError();
                    break;
                case "ATC015": //If IMEI is not valid
                    this.imeiNotValidError();
                    break;
                case "ATC016": //If ICCID is not valid
                    this.iccidNotValidError();
                    break;
                case "ATC017": //If Amazon SKU is not valid
                    this.invalidPrePurchasedSKU();
                    break;
                case "ATC018": //Amazon SIM in the cart
                    this.setUpNewSIMError();
                    break;
                case "ATC019": //Adding Accessory when Amazon SIM in the cart
                    this.itemsInCartSIMError();
                    break;
                case "ATC020": //Music SOC Cannot be added for T & T plan
                    this.musicTextPlanError();
                    break;
                case "ATC021": //Music SOC Cannot be added for device upgrade
                    this.musicUpgradeError();
                    break;
                case "ATC022": //Device added not compatible w/insurance feature
                    this.featureIncompatibleWithDevice();
                    break;
                case "ATC025": //Cannot add new plan during device upgrade flow
                    this.upgradeCannotAddPlan();
                    break;
                case "ATC026": //Cannot add SIM to cart during device upgrade flow
                    this.upgradeCannotAddSim(skuDetails);
                    break;
                case "ATC027": //Cannot add new features related to plan during device upgrade flow(only allowed feature Insurance)
                    
                    break;
                case "ATC028": //Cart full for device upgrade flow
                    this.upgradePhoneInCart(skuDetails);
                    break;
                case "ATC029": // Cannot add Item other than SIM to cart during SIM Change flow.
                    this.addToCartDuringSIMSwap(skuDetails);
                    break;
                case "ATC031": //Cart full for device upgrade flow
                    this.addToCartEmptySIMSwap(skuDetails);
                    break;
                case "ATC032": //Cannot add SIM/Plan to cart during device Upgrade flow and device in cart
                    this.upgradeInProgress(skuDetails);
                    break;
                case "ATC034": // Insurance cannot be given for prepurchased device or sim
                    this.noInsuranceForPrepurchase();
                    break; 
                case "ATC100": //System error
                    this.cartServerError();
                    break;
            }
        },
        
        /**
         * ATC001 - Device already in cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function deviceAlreadyInCart
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        
        deviceAlreadyInCart: function (skuDetails) {
            
            var cartResponse = getServiceResult('cartsummary');
     
            var templateVars = this.populateModalDevices(skuDetails, cartResponse);
            
            var callBack = {
                    modalId: '#deviceInCart',
                    itemName : cartResponse.device.name
                };
        
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/deviceAlreadyInCart.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, callBack );

        },
        
        /**
         * ATC002 - Plan already in cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function planAlreadyInCart
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} sku_details: The details of the SKU item
         */
        planAlreadyInCart: function (skuDetails) {
            
            var templateVars = {
                response: getServiceResult('cartsummary'),
                skuId: this.skuId,
                skuDetails: skuDetails
            };

            if (skuDetails[0].discountedPrice){
                templateVars.itemPrice = skuDetails[0].discountedPrice;
            } else {
                templateVars.itemPrice = skuDetails[0].price;
            }

            templateVars.itemName = skuDetails[0].brand + ' ' + skuDetails[0].model;

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/planAlreadyInCart.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#planInCart' );

        },
        
        /**
         * ATC003 - Feature already in cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function featureAlreadyInCart
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        featureAlreadyInCart: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/featureAlreadyInCart.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#featureInCart' );
        },
        
        /**
         * ATC004 - SIM already in cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function simAlreadyInCart
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} sku_details: The details of the SKU item
         */
        simAlreadyInCart: function (skuDetails) {

            var templateVars = this.populateModalDevices(skuDetails, getServiceResult('cartsummary'));
            var accountInfo = getServiceResult('accountinfo');

            if (accountInfo.hasOwnProperty("flow_type") && accountInfo.flow_type == "simswap") {
                templateVars.flow_type = true;
            } else {
                templateVars.flow_type = false;
            }

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/simAlreadyInCart.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#simInCart' );

        },
        
        /**
         * ATC005 - Plan not compatible with device
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function planNotCompatible
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} sku_details: The details of the SKU item
         */
        planNotCompatible: function (skuDetails) {
            var cartResponse = getServiceResult('cartsummary');

            var templateVars = {
                response: cartResponse,
                skuId: this.skuId,
                name: skuDetails[0].brand + ' ' + skuDetails[0].model,
                deviceImage: '/content/dam/a/product/' + cartResponse.device.SKU.substring(0, 3) +'/' + cartResponse.device.SKU + '/' + cartResponse.device.SKU + '-list.png'
            };

            if (skuDetails[0].discountedPrice){
                templateVars.itemPrice = skuDetails[0].discountedPrice;
            } else {
                templateVars.itemPrice = skuDetails[0].price;
            }


            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/planNotCompatible.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#planNotCompatible');
            
        },
        
        /**
         * ATC006 - Feature not compatible with device
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function featureDeviceNotCompatible
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        featureDeviceNotCompatible: function () {
                loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/featureDeviceNotCompatible.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#featureDeviceNotCompatible');
        },
        
        /**
         * ATC007 - Device not compatible with plan
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function deviceNotCompatible
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        deviceNotCompatible: function (skuDetails) {

            var cartResponse = getServiceResult('cartsummary')
            
            var templateVars = {
                response: cartResponse,
                skuId: this.skuId,
                name: skuDetails[0].brand + ' ' + skuDetails[0].model,
                deviceColor: skuDetails[0].colorName,
                deviceImage: '/content/dam/a/product/' + skuDetails[0].skuId.substring(0, 3) +'/' + skuDetails[0].skuId + '/' + skuDetails[0].skuId + '-list.png'
            };

            if (cartResponse.plan.SKU == 25) {
                templateVars.basic = true;
            } else {
                templateVars.basic = false;
            }

            if (skuDetails[0].discountedPrice){
                templateVars.itemPrice = skuDetails[0].discountedPrice;
            } else {
                templateVars.itemPrice = skuDetails[0].price;
            }

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/deviceNotCompatible.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#deviceNotCompatible' );
        },
        
        /**
         * ATC008 - Feature not compatible with plan
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function featurePlanNotCompatible
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        featurePlanNotCompatible: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/featurePlanNotCompatible.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#featurePlanNotCompatible' );
        },
        
        /**
         * ATC009 && RMERR2 - Invalid sku (bad sku value was sent)
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function invalidSKU
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        invalidSKU: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/invalidSKU.handlebars', null,  cricket.modifyCart.finishAddToCartModal, '#invalidSKUModal' );
        },
        
        /**
         * ATC010 - Out of stock
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function outOfStock
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        outOfStock: function (skuDetails) {
            
            var callBack = {
                    modalId: '#outOfStockModal'
                };
            
            if ( this.redirect == 'prepurchased' ) {
                callBack.itemName = 'Pre-Purchased SIM Card';
            } else  if (skuDetails[0].type == "sim") {
                callBack.itemName = skuDetails[0].brand;
            } else {
                callBack.itemName = skuDetails[0].brand + ' ' + skuDetails[0].model;
            }
            
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/outOfStock.handlebars', null, cricket.modifyCart.finishAddToCartModal, callBack);
        },
        
        /**
         * ATC011 - Sku not for sale (found but not for sale)
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function skuNotForSale
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        skuNotForSale: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/skuNotForSale.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#skuNotForSale' );
        },
        
        /**
         * ATC012 - Cart is full
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function cartIsFull
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        cartIsFull: function (skuDetails) {
            
            var templateVars = this.populateModalDevices(skuDetails, getServiceResult('cartsummary'));

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/cartIsFull.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#displayFullCart');

        },
        
        /**
         * ATC013 - Plan not compatible with existing features
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function planFeaturesNotCompatibleError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        planFeaturesNotCompatibleError: function (skuDetails) {
            
            var templateVars = {'planName': skuDetails[0].brand};
        
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/planFeaturesNotCompError.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#planFeaturesNotCompatible');
        },
        
        /**
         * ATC014 - If IMEI is stolen
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function imeiStolenError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        imeiStolenError: function () {
           loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/lostStolen.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#lostStolen');
        },
        
        /**
         * ATC015 - If IMEI is not valid
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function imeiNotValidError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        imeiNotValidError: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/imeiNotValidError.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#imeiNotValidError' );
        },
        
        /**
         * ATC016 - If ICCID is not valid
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function iccidNotValidError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        iccidNotValidError: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/iccidNotValidError.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#iccidNotValidError');
        },
        
        /**
         * ATC017 - If Amazon SKU is not valid
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function invalidPrePurchasedSKU
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        invalidPrePurchasedSKU: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/invalidPrePurchasedSKU.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#invalidPrePurchasedSKU');
        },

        /**
         * ATC018 - Pre-Purchased Flow - Setup New SIM Card
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function setUpNewSIMError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        setUpNewSIMError: function (skuDetails) {
            
            var cartResponse = getServiceResult('cartsummary');
            
            /** If plan is already in cart then change the page to redirect to */
            if ( cartResponse.plan && cartResponse.plan.SKU ) {
                var redirect_url = 'device'; /** Going to the plans page */
            } else {
                var redirect_url = 'cart'; /** Going to the cart page */
            }

            var templateVars = {
                response: cartResponse,
                skuId: this.skuId,
                redirect_url: redirect_url
            };

            if ( this.redirect == 'prepurchased' ) {
                templateVars.itemName = 'Pre-Purchased SIM Card';
            } else  if (skuDetails[0].type == "sim") {
                templateVars.itemName = skuDetails[0].brand + ' Kit';
            } else {
                templateVars.itemName = skuDetails[0].brand + ' ' + skuDetails[0].model;
            }

            if ( cartResponse.device && cartResponse.device.imei ) {
                loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/setUpNewSIM.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#setUpNewSIMModal');
            } else {
                loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/setUpNewDevice.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#setUpNewDeviceModal');
            }

        },
        
        /**
         * ATC019 - Pre-Purchased Flow - Items in Your Cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function itemsInCartSIMError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        itemsInCartSIMError: function () {

            var templateVars = {
                skuId: this.skuId,
                redirect_to: this.redirect
            };

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/itemsInCartPrePurchasedFlow.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#itemsInCartPrePurchasedFlowModal');
        },
        
        /**
         * ATC020 - Music SOC Cannot be added for T & T plan
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function musicTextPlanError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        musicTextPlanError: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/musicTextPlanError.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#musicTextPlanErrorModal');
        },
        
        /**
         * ATC021 - Music SOC Cannot be added for device upgrade
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function musicUpgradeError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        musicUpgradeError: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/musicUpgradeError.handlebars', '', cricket.modifyCart.finishAddToCartModal, '#musicUpgradeErrorModal');
        },
        
        /**
         * ATC022 - Device added not compatible w/insurance feature
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function featureIncompatibleWithDevice
         * @memberof cricket.modifyCart
         * @description Loads the modal html into the page and then displays the modal by calling the function 'popFeatureIncompatibleModal'
         */
        featureIncompatibleWithDevice: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/featureIncompatibleWithDevice.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#modal-feature-incompatible-with-device' );
        },
        
        /**
         * ATC025 - Cannot add new plan during device upgrade flow and device not in cart
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function upgradeCannotAddPlan
         * @memberof cricket.modifyCart
         * @description Include the populated html for the Upgrade in progress modal
         */
        upgradeCannotAddPlan: function () {
                            
            var templateVars = {
                response: getServiceResult('cartsummary'),
                skuId: this.skuId,
                redirect: this.redirect
            };

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/upgradeInProgressAddPlanModal.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#upgradeInProgressAddPlanModal');
        },
        
        /**
         * ATC026 -  Cannot add SIM to cart during device Upgrade flow and device not in cart
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function upgradeCannotAddSim
         * @memberof cricket.modifyCart
         * @description Include the populated html for the Upgrade in progress modal
         * @param {object} skuDetails: The details of the SKU item
         */
        upgradeCannotAddSim: function (skuDetails) {
            
            var templateVars = {
                    skuId: this.skuId,
                    redirect: this.redirect
                },
                callBack = {
                    modalId: '#updrageInProgressActivitySelect',
                    itemName: skuDetails.brand
                };
            
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/updrageInProgressActivitySelect.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, callBack);
        },
        
        /**
         * ATC028 - Upgrade phone in cart
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function upgradePhoneInCart
         * @memberof cricket.modifyCart
         * @description Include the populated html for the Upgrade phone in cart modal
         * @param {object} skuDetails: The details of the SKU item   
         */
        upgradePhoneInCart: function (skuDetails) {

            var templateVars = this.populateModalDevices(skuDetails, getServiceResult('cartsummary'));

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/upgradePhoneInCart.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, "#upgradePhoneInCart" );
            
        },
        
        /**
         * ATC029 - Can not add any items to the cart during SIM upgrade/change flow - SIM in cart
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function addToCartDuringSIMSwap
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        addToCartDuringSIMSwap: function (skuDetails){

            if (this.redirect != "accessory") {
                this.redirect = this.redirect + "-amss";
            }

            var templateVars = this.populateModalDevices(skuDetails, getServiceResult('cartsummary'));
            
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/simPendingModal.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, '#simPendingModal');
        },
        
        
        /**
         * ATC031 - Can not add any items to the cart during SIM upgrade/change flow - Cart is empty
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function addToCartEmptySIMSwap
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {object} skuDetails: The details of the SKU item
         */
        addToCartEmptySIMSwap: function (skuDetails) {

            if (this.redirect != "accessory") {
                this.redirect = this.redirect + "-amss";
            }

            var templateVars = {
                skuId: this.skuId,
                redirect: this.redirect
                },
                callBack = {
                modalId: '#simSwapActivitySelectModal'
                };

            if (skuDetails[0].hasOwnProperty('type') && skuDetails[0].type == 'sim') {
                callBack.itemName = skuDetails[0].brand + ' Kit';
            } else {
                callBack.itemName = skuDetails[0].brand + ' ' + skuDetails[0].model;
            }


            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/simSwapActivitySelectModal.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, callBack );

        },
        
        /**
         * ATC032 - Cannot add SIM/Plan to cart during device Upgrade flow and device in cart
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function upgradeInProgress
         * @memberof cricket.modifyCart
         * @description Include the populated html for the Upgrade in progress modal
         * @param {object} skuDetails: The details of the SKU item
         */
        
        upgradeInProgress: function (skuDetails) {

            var templateVars = this.populateModalDevices(skuDetails, getServiceResult('cartsummary'));

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/upgradeInProgress.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, "#upgradeInProgress" );

        },
        
        /**
         * ACT034 - Insurance cannot be given for prepurchased device or sim
         * @author Charles Jones
         * @version 1602
         * @function noInsuranceForPrepurchase
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        noInsuranceForPrepurchase: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/noInsuranceForPrepurchase.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#noInsuranceForPrepurchase');
        },
        
        /**
         * ATC100 - Unknown server error
         * @author Anselm Marie
         * @modified Charles Jones
         * @function cartServerError
         * @memberof cricket.modifyCart
         * @version 1602
         * @description (Building the modal in this function before it shows)
         */
        cartServerError: function () {

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/cartServerError.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#cartServerError' );
            
        },
        
        /**
         * Remove From Cart - removing items from cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function removeFromCart
         * @memberof cricket.modifyCart
         * @description Called to Remove an Item frm the Cart
         * @param {string} skuId: The SKU code being used
         * @param {string} redirect: Dictates where the user where go it they decide to continue with the flow
         * @param {boolean} removeFeatures: Tells the API endpoint to remove the features if the user is removing the device or plan with features in cart
         * @param {function} successCallback: function to call upon successfully removing the item
         * @param {function} failCallback: function to call upon failing to remove the item
         */
        removeFromCart: function (skuId, redirect, removeFeatures, successCallback, failCallback) {
            var me = this;
            
            //Adding a transparent overlay so the user can't click on any other button.
            $(me.body).prepend('<div id="pickerOverlay"></div>');
            
            me.skuId = skuId;
            me.redirect = redirect;

            // data replaces the object that was being build in the queueRestCall, we are just building it ahead of the function call
            var data = {
                sku: me.skuId,
                removeFeatures: removeFeatures
            };

            if ( me.redirect == 'remove-only' ) {
                $(me.body).spin();
            } else {
                // removing sku from modal
                data.sku = $('.modal button.remove-item').attr('data-remove-sku');
            }

            // collect tracking data before it's removed from cart
            var trackData = {};
            queueRestCall(
                "cartsummary", "GET", {},
                function(cartResponse) {
                    trackData = getCartTrackData(data.sku, cartResponse);
                }
            );

            queueRestCall(
                "removeItem",
                "GET",
                data,
                function(response) {

                    if (response.errorCode) {
        
                        /** Pass error code to error handler */
                        me.removeFromCartError(response);
                        //Removing transparent overlay.
                        $(me.pickerOverlay).remove();

                    } else {

                        trackCart("remove", trackData);
                        
                        queueRestCall(
                            "cartsummary",
                            "GET",
                            {},
                            function(response){
                                cricket.utilities.createPicker(response, true);
                            },
                            null,
                            true,
                            true
                        );

                        if ( me.redirect == 'remove-only' ) {

                            //cricket.utilities.createPicker(pickerCurrentPage, true);

                            if($(me.body).hasClass("shop_smartphones")) {
                                $(".breadcrumbs-row").show();
                            }

                            $(".phoneincartmessage").hide(); 
                            $(".item-added-details p").html("");
                            $(".item-added-details h4").html("Item(s) Removed");
                            $("#itemAdded").addClass("removed");
                            $("#itemAdded").slideDown(300);

                            if($("a.shop.remove").length > 0 ) {
                                $.each($("a.shop.remove"), function(i, btn){
                                    $(btn).removeClass("remove").html(($(btn).hasClass('mobile')) ? "Add To Cart" : "Get "+$(btn).attr("data-planName"));
                                });
                            }

                            setTimeout(function() {
                                $("#itemAdded").slideUp(300, function () {
                                    //Removing transparent overlay.
                                    $(me.pickerOverlay).remove();
                                    $("#add_" + me.skuId).removeClass("remove").html("Add to Cart").attr("onclick", "cricket.modifyCart.addToCart('" + me.skuId + "', '', 'device');");
                                    if ($(me.body).hasClass('shop_cart')) {
                                        $("#" + me.skuId).remove();
                                    }
                                    me.updateCartSuccess("remove");
                                    if (typeof successCallback == "function") {
                                        successCallback(response);
                                    }
                                });
                            }, 2500);

                        } else {

                            //cricket.utilities.createPicker(pickerCurrentPage, true);
                            $(".phoneincartmessage").hide();
                            /** PrePurchase Only -- Remove if PrePurchase cookie exist and has a certain redirect */
                            if ($.cookie('PrePurchase') && me.redirect.indexOf('-removePreCookie') >= 0) {
                                $.removeCookie('PrePurchase', {path: "/"});
                                me.redirect = me.redirect.replace('-removePreCookie', '');

                            } else if (me.redirect.indexOf('-removePreCookie') >= 0) {
                                me.redirect = me.redirect.replace('-removePreCookie', '');
                            }

                            me.addOnServer(successCallback, failCallback);

                            //Removing transparent overlay.
                            $(me.pickerOverlay).remove();

                        }
                    }
                    checkInternationalFeatures();
                },
                function (response) {
                    this.removeFromCartError('RMERR3');
                    //Removing transparent overlay.
                    $(me.pickerOverlay).remove();
                    if (typeof failCallback == "function") {
                        failCallback(response);
                    }
                }
            );
        },
        
        /**
         * Remove From Cart Error - removing items from cart
         * @author Charles Jones
         * @version 1602
         * @function removeFromCartError
         * @memberof cricket.modifyCart
         * @description Based on the error_code we are calling a certain function to create an error modal
         * @param {object} response: Response from the Remove from Cart Call
         */
        
        removeFromCartError: function(response) {
            
            $(this.pickerOverlay).remove();
            
            var errorCode = ''
        
            if (typeof response == 'string') {
                errorCode = response;
            } else {
                errorCode = response.errorCode;
                if (response.hasOwnProperty('addons')) {
                    var addons = response.addons;
                }
            }
        
            cricket.utilities.translateError(null, errorCode, '', true);
            
            switch (errorCode) {
                case "RMERR1": //Item not in cart
                    this.itemNotInCart();
                    break;
                case "RMERR2": //Invalid sku (bad sku value was sent)
                    this.invalidSKU();
                    break;
                case "RMERR3": //System error
                    this.removeServerError();
                    break;
                case "RMERR5": //Information sent to FE regarding the dependent features available in the cart for the given Plan.  (Notification to FE. Not real error)
                    this.removePlanError();
                    break;
                case "RMERR6": //Information sent to FE regarding the dependent addons available in the cart for the given Device. (Notification to FE. Not real error)
                case "RMERR8": //Information sent to FE regarding the dependent features available in the cart for the given SIM.  (Notification to FE. Not real error) 
                    this.removeDeviceError(addons);
                    break;
                case "RMERR7": //CANNOT remove a Plan when cart has a device upgrade item.
                    this.unableRemovePlanUpgrade();
                    break;
            }
        },
        
        /**
         * RMERR1 - Item not in cart
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function itemNotInCart
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        itemNotInCart: function () {

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/itemNotInCart.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#itemNotInCart' );
        },
        
        /**
         * RMERR3 - Unknown server error
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function removeServerError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        removeServerError: function () {

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/removeServerError.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#removeServerError' );
        },
        
        /**
        * RMERR5 - If plan is removed all the features from cart will be removed including insurance.
         * @author Stevo Perisic
         * @modified Charles Jones
         * @version 1602
         * @function removePlanError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        removePlanError: function () {
            
            var cartResponse = getServiceResult('cartsummary');
            
            var templateVars = {
                    skuId: this.skuId,
                    onCart: false
                },
                callBack = {
                    modalId: '#removePlanError',
                    itemName: cartResponse.plan.name + " Plan"
                }
            
                if ($("body").hasClass("shop_cart")) {
                    templateVars.onCart = true;
                }

            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/removePlanError.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, callBack );
        },
        
        /**
         * RMERR6 - If device is removed, only insurance feature will be removed
         * RMERR8 - Information sent to FE regarding the dependent features available in the cart for the given SIM.
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function removeDeviceError
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         * @param {array} : addons - Addons That will be removed
         */
        removeDeviceError: function (addons) {
            
            var cartResponse = getServiceResult('cartsummary');
            
            var templateVars = {
                skuId : this.skuId,
                addons : addons,
                removeCart : false
                },
                callBack = {
                    modalId : '#removeDeviceError',
                    itemName : cartResponse.device.name
                };
                
                if($("body").hasClass("shop_cart")) {
                    templateVars.removeCart = true;
                }
            
            
            loadHandlebarsModal('/etc/designs/zig/global/handlebar_templates/removeDeviceError.handlebars', templateVars, cricket.modifyCart.finishAddToCartModal, callBack);
        },
        
        /**
         * RMERR7 - Unable to Remove Plan from Cart in Upgrade Flow.
         * @author Charles Jones
         * @version 1602
         * @function unableRemovePlanUpgrade
         * @memberof cricket.modifyCart
         * @description (Building the modal in this function before it shows)
         */
        unableRemovePlanUpgrade: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/unableRemovePlanUpgrade.handlebars', null, cricket.modifyCart.finishAddToCartModal, '#unableRemovePlanUpgrade');
        },
        
        /**
         * Clear the cart
         * @author Anselm Marie, Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function clearCart
         * @memberof cricket.modifyCart
         * @description The cart will be cleared and redirected if necessary
         * @param {string} : skuId - SKU of the Device
         * @param {string} : method - Methods used in clearing of cart
         * @param {string} : redirect - How the User is redirected
         */
        clearCart: function (skuId, method, redirect) {
            
            var me = this;
            
            me.skuId = skuId;
            me.method = method;
            me.redirect = redirect;
            
            var data = {"activity" : "clearcart"};

            if (method == "clearFlowThenAddToCart") {
                data.clearFlow = "true";
            }


            queueRestCall(
                "clearcart", 
                "POST",
                data, 
                function() {
                    queueRestCall(
                        "cartsummary", "GET", {},
                        function(cartResponse) {
                            trackCart("clear", getCartTrackData(this.skuId, cartResponse));
                        },
                        null,
                        true,
                        true
                    );

                    // Remove PrePurchase cookie 
                    $.removeCookie('PrePurchase', {path: "/"});

                    if(cricket.prepurchasedNav.simIsPrepurchased) {
                        window.location.href = contextPath + siteRoot + "/shop/device/prepurchased-sim-check.html";
                        cricket.prepurchasedNav.simIsPrepurchased = false;

                    // If redirect doesn't exist 
                    } else if ( me.redirect == '' || me.redirect == 'undefined' || me.redirect === undefined ) {
                        window.location.href = contextPath + siteRoot + "/en/shop/cart.html";            

                    // When you clear a device 
                    } else if ( me.redirect == 'clear-device' ) {
                        if ( $('#byodDevice_id').length ) {
                            window.location = "/cell-phones/bring-your-phone";
                        } else {
                            window.location = "/cell-phones";
                        }

                    // When you clear a plan
                    } else if ( me.redirect == 'clear-plan' ) {
                        window.location.href = contextPath + siteRoot + "/en/cell-phone-plans";                                    
                    } else {
                        me.addOnServer();
                    }
                }
            );
        },
        
        /**
         * Finishes the Clear Cart Modal
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function finishClearCart
         * @memberof cricket.modifyCart
         * @description (After the modal is loaded we open it and init the button function)
         */ 
        finishClearCart: function () {
            $('#clearCart.modal').modal();

            $('#clearCart.modal .button.btn-primary').on('click', function() {
                cricket.modifyCart.clearCart();
            });

            /* ensure no old data hangs around */
            cricket.utilities.sessionData('cartWoopraObject', {});
        },
        
        /**
         * Loads Clear Cart Modal
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function clearCartNotice
         * @memberof cricket.modifyCart
         * @description (This loads the clear cart modal)
         */ 
        clearCartNotice: function () {
            loadHandlebarsModal( '/etc/designs/zig/global/handlebar_templates/clearCart.handlebars', null, this.finishClearCart );
        },
        
        /**
         * Update page display if the cart is empty
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @function updatePageDisplayIfCartEmpty
         * @memberof cricket.modifyCart
         * @description Update page display if the cart is empty based on which page the user is on
         */
        updatePageDisplayIfCartEmpty: function () {
            var me = this;
            queueRestCall(
                "cartsummary",
                "GET", {},
                function(response) {
                    if(cricket.utilities.getNumItemsInCart(response) == 0 || response.error && response.errorMsg == "Empty Cart") {
                        if($(me.body).hasClass('shop_smartphones')) {
                            $(".parbase.intro").parent(".picker-hide").show();
                            $("#socialBar").show();
                        } else if ($(me.body).hasClass("shop_plans")) {
                            $(".intro").show();
                            $("#socialBar").show();

                            if($(".promobackground").length > 0) {
                                $(".promobackground").show();
                            }
                        } 
                    }
                }
            );
        },
        
        /**
         * Populate Modal Devices
         * @author Brian Boyett
         * @modified Charles Jones
         * @version 1602
         * @description Populate Modal devices content
         * @function populateModalDevices
         * @memberof cricket.modifyCart
         * @param {object} skuDetails: Details of the item you wish to add
         * @param {object} cartResponse: Details of device already in cart
         */
        populateModalDevices: function (skuDetails, cartResponse) {
            var productInformation = {};

            /** Checking if a discounted price exist otherwise use the orginal price */
            if (skuDetails[0].discountedPrice){
                productInformation.itemPrice = skuDetails[0].discountedPrice;
            } else {
                productInformation.itemPrice = skuDetails[0].price;
            }

            /** Changing the file format based on the device */
            if (skuDetails[0].type != "plan") {
                var imageExt;
                if (skuDetails[0].hasOwnProperty('type') && skuDetails[0].type == 'sim') {
                    imageExt = '.png';
                } else {
                    imageExt = '-list.png';
                }
            }

            var cartImageExt;
            if (cartResponse.device.deviceType == "byod") {
                cartImageExt = '.png';
            } else {
                cartImageExt = '-list.png';
            }

            /** Checking if this item is a SIM */
            if (skuDetails[0].hasOwnProperty('type') && skuDetails[0].type == 'sim') {
                productInformation.deviceName = skuDetails[0].brand + ' Kit';
            } else {
                productInformation.deviceName = skuDetails[0].brand + ' ' + skuDetails[0].model;
            }

            /** Checking if the a color exist otherwise the area is removed from the page */
            if (skuDetails[0].hasOwnProperty('colorName')) {
                productInformation.colorName = skuDetails[0].colorName;
            } 

            /** Adding the images */
            productInformation.cartDeviceImage = '/content/dam/a/product/' + cartResponse.device.SKU.substring(0, 3) + '/' + cartResponse.device.SKU + '/' + cartResponse.device.SKU + cartImageExt;

            if (skuDetails[0].type != "plan") {
                productInformation.addDeviceImage = '/content/dam/a/product/' + skuDetails[0].skuId.substring(0, 3) + '/' + skuDetails[0].skuId + '/' + skuDetails[0].skuId +  imageExt;
            } else {
                productInformation.addDeviceImage = '/content/dam/newco/global/modals/plan-icon.png';    
            }

            productInformation.response = cartResponse;
            productInformation.skuId = this.skuId;
            productInformation.redirect = this.redirect

            return productInformation;

        },
        
        /**
         * Opens the Modal after it has been added to the page
         * @author Charles Jones
         * @version 1602
         * @function finishAddToCartModal
         * @memberof cricket.modifyCart
         * @description Opens the Modal after it has been added to the page
         * @param {string/object} response: Data need to Display Modal
         */
        finishAddToCartModal: function (response) {
            
            var modalId = "";
            
            if (typeof response == 'string') {
                modalId = response;
            } else {
                modalId = response.modalId;
                $(modalId).find('.item-name').html(response.itemName);
            }
            
            $(modalId).modal();
            cricket.modifyCart.returnAbilityToAddItemToCart();
            cricket.utilities.createTopicFold();
        },
        
        /**
         * Remove the disabled attr/class from Cart buttons
         * @author Anselm Marie
         * @modified Charles Jones
         * @version 1602
         * @function returnAbilityToAddItemToCart
         * @memberof cricket.modifyCart
         * @description (This removes the disabled attr from all buttons after the add to cart service is done)
         */
        returnAbilityToAddItemToCart: function() {
            $('button#add_' + this.skuId).removeAttr('disabled').attr('aria-disabled', 'false');
            $('input' + this.skuId).removeAttr('disabled').attr('aria-disabled', 'false');
            $('a#add_' + this.skuId).removeClass('disabled-link');
            $('.byod-check').removeAttr('disabled').attr('aria-disabled', 'false');
            $(this.pickerOverlay).remove();
            $(this.body).spin(false);
        }
    }
} (window, $, window.cricket = window.cricket || {}));
