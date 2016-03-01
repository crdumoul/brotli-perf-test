/**
 * Sephora 2009-2016.
 * BI Rewards.
 */
(function(window, document, undefined) {'use strict';

  /**
   * @description
   *
   * BI Rewards.
   */

  var element = angular.element,

    body = element(document.querySelector('body')),

    isObject = angular.isObject,

    noop = angular.noop;

  Sephora.ui.directive.sephBiRewardItem = function($rootScope, $timeout, $sce) {
    var trust = function(c) {
        return $sce.trustAsHtml(c);
      },

      currencyPadded = Sephora.util.HtmlUtils.makePaddCurrFormatter(Sephora.Country.USorCACurrency()),

      formatAmt = function(amt) {
        return currencyPadded()+Sephora.ui.ViewHelper.currencyFormatted(amt);
      };

    return {
      require: "?^sephCarousel",
      templateUrl: "/javascripts/templates/sku.item.reward.seph",
      replace: true,
      link: function(scope, el, attrs, sephCarousel) {
        var el = el;

        scope.formatAmt = formatAmt;
        scope.trust = trust;
        scope.image = scope.sku.image? scope.sku.image : scope.sku.grid_image;
        scope.imageSize = scope.rewardsgroup? scope.rewardsgroup.image_size : 97;

        scope.getBiSealSize = function() {
          return Sephora.ui.mixin.getBiSealSize(parseInt(scope.imageSize));
        }

        if(scope.$last && !!sephCarousel) {
          var w = scope.$watch(function() {
            return el.is(':visible')
          }, function(val) {
            if(val) {
              sephCarousel.init();
              w();
            }
          });
        }

      } //end link
    };  //end return
  };  //end Sephora.ui.directive.sephBiRewardItem

  Sephora.ui.directive.sephBiRewardBtn = function($rootElement, $rootScope){

    var isCheckout = angular.element(document.body).attr("id")==="checkout",
        sc = new Sephora.ui.controller.ShoppingCartController(),
        isMyAccount = angular.element(document.body).attr("id")==="my-account",
        biStatus,
        w = $rootScope.$watch("user", function(u) {
          if(!u) {
            return;
          }
          w();
          biStatus = u.biStatusLo();
          
          $rootScope.showSignInBtn = (isMyAccount) && (u.logInStatus() === 'unrecognized') && (u.biStatus()==='NON_BI');
        });
      

    var isBirthdayGiftInBasket = function(){
      var bdayInBasket;
      ($rootScope.cart.line_items||[]).forEach(function(item) {
        if(item.sku.isBirthdayGift()) {
          bdayInBasket = item.sku.id;
        }
      });

      return bdayInBasket;
    }

    var isBiBtnDisabled = function(scope, biTier, countryRestrict, isBirthday){
      var isBiDisabled = false;
      //Recalculate if Bi Reward can be added
      if(scope.cart && (scope.sku.bi_value > scope.cart.available_bipoints) ||
         (sc.biTierMatrix[biTier] > sc.biTierMatrix[biStatus]) ||
         sc.isCountryRestricted(countryRestrict) || (isBirthday && isBirthdayGiftInBasket())){
        isBiDisabled = true;
      }

      return isBiDisabled;
    }

    return isMyAccount ? {
      link: accoutRewardsLink
    } : {
      require: "?^sephBasketRewards",
      link:  basketRewardsLink
    }

    function accoutRewardsLink(scope, el, attrs) {
      var MAX_QUANTITY = 5,
          biTier = scope.sku.bi_exclusivity_level,
          points = parseInt(scope.sku.bi_value),
          skuId = scope.sku.id,
          countryRestrict = scope.sku.restricted_countries ? scope.sku.restricted_countries.toString() : undefined,
          isBirthday = points===0,

        updateBirthday = function(skuIdIn, isRemove) {
          if(isRemove) {
            if(skuIdIn===skuId) {
              scope.btnValue = "ADD TO BASKET";
            }
          } else if(skuIdIn===skuId) {
            scope.btnValue = "REMOVE";
          }
        };

        scope.btnValue = "ADD TO BASKET";

        if(isBirthday) {
          scope.$on("skuRemoved", function(_, sku) {
            sku.isBirthdayGift() && updateBirthday(sku.sku_number, true);
          });
          scope.$on("updateBirthday", function(_, skuId, isRemove) {
            updateBirthday(skuId, isRemove);
          })

          var wc = $rootScope.$watch("cart", function(cart) {
            if(!cart) {
              return;
            }
            wc();
            if(skuId === isBirthdayGiftInBasket()){
              scope.btnValue = "REMOVE";
            }
          });
          
        }

        scope.isRewardDisabled = function(){
          return scope.btnValue === "ADD TO BASKET" && isBiBtnDisabled(scope, biTier, countryRestrict, isBirthday);
        }

        el.on("click", function() {
          var skuId = attrs.skuNumber;
          if(scope.btnValue === "REMOVE"){
            Sephora.ShoppingCart.removeLineItem(skuId).then(function(cart) {
              $rootScope.cart = cart;
              $rootScope.lineitems = cart.line_items;
              $rootScope.hoverBasketShow = true;
              scope.$parent.$broadcast("updateBirthday", skuId, true);//remove this
            });
          }
        });

        sc.addToBasket({
          button: el,
          scope: scope,
          isCustomEnable: attrs.customEnable==="true",
          resolve: function() {
            if(scope.btnValue === "ADD TO BASKET"){
              return Sephora.ShoppingCart.makeItems(skuId);
            }
          },
          success: function(cart, source) {
            var sku;
            delete scope.errors;//they all share the same scope
            if ( !("errors" in cart) ) {
              sku=cart.line_items[0].sku;
              if ( isBirthday ) {
                scope.$parent.$broadcast("updateBirthday", skuId, false);
              }
            } else {
              scope.errors = cart.errors;
            }

            Sephora.event.publish("rewardAdded", [cart]);
          }
        })
    }

    //logic for basket and checkout bi rewards
    function basketRewardsLink(scope, el, attrs, parentDir){
        var sku =  scope.sku,
            biValue = sku.bi_value,
            skuNumber = sku.id,
            countryRestrict = sku.restricted_countries ? sku.restricted_countries.toString() : undefined,
            biTier = sku.bi_exclusivity_level.toLowerCase(); 
            angular.extend(scope.sku, Sephora.Sku);
            var isBirthday = sku.isBirthdayGift(),
            isWelcomeKit = sku.isWelcomeKit();

            scope.btnValue = "ADD";

        //needed for Welcome kit link and image
        switch (sku.bi_type) {
          case "Welcome Kit":
              scope.biSimpleType = "vib";
              scope.kitMediaId = "17600021";
              break;
          case "Rouge Welcome Kit":
              scope.biSimpleType = "rouge";
              scope.kitMediaId = "18900078";
              break;
          case "RQ Rouge Welcome Kit":
              scope.biSimpleType = "rouge_rq";
              scope.kitMediaId = "21500024";
              break;
        }

       //check if reward is in cart, cart isn't ready yet
       var updateBtn = function(cart) {
          var li;

          if(cart===undefined) {
            return;
          }

          if($rootScope.testA){
            li = scope.cart.line_items;
          } else {
            li = scope.lineitems;
          }

          scope.btnValue = "ADD";
          (li||[]).forEach(function(item) {
            if(item.sku_id === skuNumber && (isBirthday || isWelcomeKit)) {
              scope.btnValue = "REMOVE";
            }
          })
        };

        var wcart = scope.$watch("cart", updateBtn);

        el.click(function(e) {
          // we will probably break this out into its own module if we decide to keep it
          (Sephora.ajax.disableUntilAjaxComplete||noop)(e.target); 
          if(isBirthday || isWelcomeKit){
            if(scope.btnValue === 'ADD') {
              // add item from basket
              var items = Sephora.ShoppingCart.makeItems(skuNumber);

              isCheckout && (items.prices = 'checkout');
              isCheckout && (items.is_from_checkout=true);
              Sephora.ShoppingCart.addItems(items, {include_skus: true}).then(function(cart) {
                scope.btnValue = "REMOVE";
                Sephora.event.publish("rewardAdded", [cart]); //fire off event to update basket
                $rootScope.$broadcast("rewardAdded", cart);
                return cart;
              }).then(function(cart) {Sephora.analytics.anaCheckoutEvt(cart, scope, 'coRewardAdd');});
            }
            else{
              // remove item from basket
              Sephora.ShoppingCart.removeLineItem(skuNumber, {is_from_checkout: isCheckout}).then(function(cart) {
                delete scope.$parent.errors;
                scope.btnValue = "ADD";
                Sephora.event.publish("rewardRemoved", [skuNumber, cart]); //Publish to Shopping Cart Basket
                $rootScope.$broadcast("rewardRemoved", skuNumber);
                return cart;
              }).then(function(cart) {Sephora.analytics.anaCheckoutEvt(cart, skuNumber, 'coRewardRemove');});
            }
          }
          else{
            var items = Sephora.ShoppingCart.makeItems(skuNumber);
            items.is_from_checkout = isCheckout;
            items.prices = 'checkout';
            Sephora.ShoppingCart.addItems(items, {include_skus: true}).then(function(cart) {
              if(!parentDir){
                delete scope.$parent.errors;
              } else {
                delete parentDir.deleteErrors();
              }
              if("errors" in cart){
                if(!parentDir){
                  scope.$parent.errors = cart.errors;
                } else {
                  parentDir.setErrors(cart.errors);
                }
              } else {
                Sephora.event.publish("rewardAdded", [cart]); //fire off event to update basket
                $rootScope.$broadcast("rewardAdded", cart);
              }
              //print errors
              return cart;
            }).then(function(cart) {Sephora.analytics.anaCheckoutEvt(cart, scope, 'coRewardAdd');});
          }
        });

        scope.isRewardDisabled = function(){
          return scope.btnValue === "ADD" && isBiBtnDisabled(scope, biTier, countryRestrict, isBirthday);
        }

        //watch remove from side basket - lddeave in jquery because of basekt
        Sephora.event.resubscribe("skuRemoved2.basket", function(e, skuId, cart) {
          delete scope.$parent.errors;

          if(skuId === skuNumber && scope.btnValue == "REMOVE"){
            scope.btnValue = "ADD";
          }
        });
      }
  } // end Sephora.ui.directive.sephBiRewardBtn


  Sephora.ui.directive.vibStatus = function($rootScope) {

    var userLevel,

      w = $rootScope.$watch("user", function(u) {
        if(!u) {
          return;
        }
        w();
        userLevel = u.biStatusLo();
      });

    var getLearnMorePopup = function(scope, vibStatus, onRewardsTab){
      var data, hasPopup,
        i18n = Sephora.i18n;
      scope.vib={};

      scope.isRouge = $rootScope.cart.isRouge();  //separate one for checkout?

      if(scope.hasVIBStatus && typeof userLevel !== 'undefined' ) {
        if(scope.showLearnMore){
          scope.vib.learnMore = i18n.t(scope.showLearnMore);  //for checkout
        }
        else if(onRewardsTab && /VIB_ROUGE_QUALIFIES/.test(vibStatus)) {
          scope.vib.learnMore = i18n.t("vibrt.explore_benefits"); // for basket
        }
        else{
          hasPopup=["NOT_VIB_CLOSE","NOT_VIB_QUALIFIES", "VIB_REQUALIFIES", "VIB_SPEND_CLOSE"].contains(vibStatus)||/VIB_ROUGE/.test(vibStatus);
          if(hasPopup) {
            scope.vib.learnMore = i18n.t("vibrt.learn_more"); // for basket
          }
        }

        if(scope.vib.learnMore){
          if(/VIB_ROUGE/.test(vibStatus)) {
            scope.vibInfoMediaId = "18900077";
          } else if(/VIB/.test(vibStatus)) {
            scope.vibInfoMediaId = "17600019";
          }
        }
      }
    }

    return {
      link: function(scope, el, attrs){
        var vibStatus,
            isBasket = attrs.sephVibStatusLocation === 'basket' ? true : false,

          w = scope.$watch("user", function(u) {
          if(!u) {
            return;
          }
          w();

          if(isBasket) {
            var updateVIBMessage = function(onRewardsTab){
              scope.hasVIBStatus = $rootScope.cart.vibStatusMessage(scope, isBasket, onRewardsTab);
              vibStatus = $rootScope.cart.vib_status;
              getLearnMorePopup(scope, vibStatus, onRewardsTab);
            }

            scope.$on("updateRewardsMsg", function(){
              var onRewardsTab = true;
              updateVIBMessage(onRewardsTab);
            });

            scope.$watch("cart", function(val) {
              updateVIBMessage();
            });
          }
          else{
            vibStatus = scope.rewards.vib_info.vib_state;
            getLearnMorePopup(scope, vibStatus);
          }
        });
      }
    }
  }; // end Sephora.ui.directive.vibStatus


var sephapp = angular.module("Sephora"),
    app = angular.module('s.birewards', []);
    
sephapp.requires.push('s.birewards');

  app.directive("sephVibStatus", Sephora.ui.directive.vibStatus)
    .directive("sephBiRewardBtn", Sephora.ui.directive.sephBiRewardBtn)
    .directive("sephBiRewardItem", Sephora.ui.directive.sephBiRewardItem)
    .directive("sephBiRewardsContainer", function() {
      
      return {
        template: '<div ng-include="contentUrl()"></div>',

        link: function(scope, elem) {
          
          scope.contentUrl = function() {
            return "/javascripts/templates/" + (scope.rewardsgroup.display === 'Carousel'? "bi.carousel.seph"
              : "bi.grid.seph");
          }

          var rewardsSetup = function() {
            var group = scope.rewardsgroup;
            
            if(!group) { return; }
            
            Sephora.Sku.mixInEntity(group.sku_list);
          }
          
          rewardsSetup();
        }
      };
    });


  // NO DATA LAYER YET

 })(window, document);
