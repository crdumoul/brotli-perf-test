/**
 * Sephora 2009-2016.
 * Quick look.
 */
(function(window, document, undefined) {'use strict';

  /**
   * @description
   *
   * Quick look. Describe....
   */
  var element = angular.element,

    body = element(document.querySelector('body')),

    disableUntilAjaxComplete,

    xtnd = angular.extend,

    isObject = angular.isObject,

    ParameterUtils = Sephora.util.ParameterUtils,

    app = angular.module("Sephora");

  Sephora.ui.directive.quickLook = function($uibModal) {

    return {
      link: function(scope, element, attrs) {

        var templ = Sephora.ui.directive.template; // todo: move this out to a module like disableUntilAjaxComplete

        var launch = function(id, skuNumber, isMiniProd, isMini) {

          // show the dialog here
          var modalInstance = $uibModal.open({
            templateUrl: templ("modal/quick.look"+ (isMini? ".mini":"")),
            controller: Sephora.ui.controller.QLCtrl,
            windowClass: "Modal--QL",
            resolve: {
              prodId: function () {
                return id;
              },
              currentSkuId: function() {
                return skuNumber;
              },
              isMiniProd: function() {
                return isMiniProd;
              },
              isMini: function() {
                return isMini;
              },
              trigger: function() {
                return element;
              }
            }
          });
        }

        var showQL = function() {
          var id, skuNumber, isMiniProd, isMini;
          if(attrs.productId!==undefined) {
            id = attrs.productId;
            skuNumber = attrs.skuNumber;
            isMiniProd = attrs.miniProd;
          } else if(attrs.skuNumber!==undefined) {
            skuNumber = attrs.skuNumber;
            isMini = true;
          } else {
            throw {message: "Either product id or sku number must be specified."}
          }
          launch(id, skuNumber, isMiniProd, isMini);
        }

        if(Modernizr.touch) {
          var timer, wasMoved = false, delay=400;

          var followLink = function(target) {
            if(!target.is("a")) {
              target = target.parents("a");
            }
            if(target.is("a")) {
              window.location.href = target.attr("href");
            }
          }

          var onTouchEnd = function(e) {
            if(e.type==="click") {
              return;
            }

            var target = $(this),
              now = new Date().getTime(),
              lastTouch = target.data('lastTouch') || (now + 1),
              delta = now - lastTouch;

            clearTimeout(timer);

            if(delta<delay && delta>0){
              e.preventDefault();
              followLink(target);
            } else if (!wasMoved) {
              timer = setTimeout(function(evt){
                clearTimeout(timer);
                showQL();
              }, delay, e);
            } else {
              wasMoved = false;
            }
            target.data('lastTouch', now);
          };

          var onTouchMove = function(e) {
            $(this).removeData('lastTouch'); // product image
            wasMoved = true;
          }

          // no QL for regular/standard/reward products with links to PDP
          // maybe we should use separate quick look directives for mobile
          var enable = function() {
            // parent or sibling <a> should have a collaborating directive
            var s = element.parents("a").length===1? element.parents("a")
              : element.siblings("a");

            // show QL for rewards only with no link. Checkout BI accordion has no anchors.
            if(s.length===0) {
              // where do we want to register from which outer
              element.parent().on("touchstart", function(e) {
                  e.preventDefault();
                })
              .on("touchend", onTouchEnd)
              .on("touchmove", onTouchMove);
            }
          };
          enable();
        } else {

          element.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();// this is to block BT from handling this, might be a mistake!
            showQL();
          });
        }
      }
    }
  };

  
  Sephora.ui.controller.QLCtrl = function($scope, $uibModalInstance, $sce, prodId, currentSkuId, isMiniProd, isMini, trigger) {

    var oldSku,
        currCountry = Sephora.Country.shipCountry(),
        skuStorage = Sephora.util.storage.SKUStorage.makeInstance();

    $scope.isMiniProd = isMiniProd;
    $scope.currCountry = Sephora.Country.displayName(currCountry);
    $scope.currency = Sephora.currency;
    $scope.isLoad = true;
    $scope.productId = prodId;
    //Get the component name from the parent scope instead...
    $scope.originCompName = trigger.closest("[data-name]").attr("data-name");
    if(ParameterUtils.extractParam("shade_code")) {
      $scope.shade_code = ParameterUtils.extractParam("shade_code");
    }

    if(Sephora.search && Sephora.search.searchType==="sale") {
      $scope.showOnSaleOnly = true;
    }

    $scope.noProductLink = Sephora.util.HtmlUtils.isCheckout();

    $scope.closeModal = function () {
      $uibModalInstance.close();
    };

    var init = function(prod) {

      if(!("skus" in prod)) {
        // the only reason skus are misssing is that the single Sku is not in stock
        Sephora.i18n.t("product.notavailable", function(m) {
          $scope.productOOS = m;
          delete $scope.isLoad;
          (!$scope.$$phase) && $scope.$apply(); //change t function to use $apply
        })
        return;
      }
      prod.skus.forEach(function(s) {
        s.primary_product = prod;
      });
      // we could be lazier here and just check when the user hovers over the swatch, but then we would make a call for each
      // OOS Sku
      Sephora.Reminder.checkReminders( prod.skus );

      $scope.product = prod;
      $scope.productId = prod.id;

      $scope.productUrl = function() {
        return $scope.product.productUrl($scope.activeSku);
      }

      $scope.isRestrictedCountry = "skus" in prod && prod.skus.length>0 && prod.skus[0].isCountryRestricted();

      currentSkuId||(currentSkuId=prod.skus[0].sku_number);
      $scope.currentSku = $scope.activeSku = (prod.skus||[]).filter(function(sku) {
        return sku.sku_number===currentSkuId;
      })[0];

      if($scope.shade_code) {
        $scope.matchSku = $scope.activeSku;
      }

      if($scope.currentSku===undefined) {
        $scope.currentSku = $scope.activeSku = prod.skus[0];//this can happen with some "use it with" QLs
      }

      $scope.quantity = $scope.activeSku.isOutOfStock()? Sephora.LineItem.OOS_QTY : 1;

      $scope.swatchSize = function() {
        switch(prod.swatch_type) {
          case 'Image - 36':
            return '36';
          case 'Image - 42':
            return '42';
          case 'Image - 62':
            return '62';
          case 'Image - Rectangle':
            return '36x72';
        }
      }

      $scope.freeShipText = function() {
        var text="", sku = $scope.currentSku, info = Sephora.Sku.skuInfo(sku),
          promoDispType;

        if(sku.is_in_stock!==false && sku.is_available_for_email!==true) {
          if(promoDispType = sku.promoDisplayType(Sephora.User.current(), $scope.freeShipAmt)) {
            text = Sephora.ShoppingCart.freeShipMessage(promoDispType);
          } else {
            text= ((sku.sale_price ? sku.sale_price : sku.list_price) >= this.freeShippingAmt)
              && !info.isEgc ? Sephora.ShoppingCart.freeShipMessage('TRESHOLD_FREE_SHIP') : "";
          }
        }

        return text;
      }

      $scope.trust = function(c) {
        return $sce.trustAsHtml(c);
      }

      $scope.currentHero = function() {
        return $scope.currentSku.hero_images.split(' ').slice(-1)[0];
      }

      $scope.allSkuIds = function() {
        return $scope.product.skus.map(function(sku) { // use sku_ids
          return sku.sku_number;
        });
      }

      $scope.skuForEmail = function() {
        return $scope.activeSku;
      }

      $scope.changeActive = function(sku) {
        $scope.currentSku = $scope.activeSku = sku;
        oldSku = undefined;
        $scope.quantity = $scope.activeSku.isOutOfStock()? Sephora.LineItem.OOS_QTY : 1;
        Sephora.analytics.analyze("quicklook-swatch", ["quicklook:swatch"]);
      }

      $scope.mouseEnter = function(sku) {
        oldSku = $scope.currentSku;
        $scope.currentSku = sku;
      }

      $scope.mouseLeave = function() {
        if(oldSku!==undefined) {
          $scope.currentSku = oldSku;
          oldSku = undefined;
        }
      }

      $scope.activeSku.hero_images = $scope.currentHero();

      delete $scope.isLoad;

      if(!$scope.$$phase) {
        $scope.$apply();
      }

      if(/MSIE/.test(navigator.userAgent)) {
        //force repaint hack!
        setTimeout(function() {
          var q = $("[ng-model='quantity']");
          q.append('<option value="2">fff</option>');
          q.find("option:last").remove();
        },0);
      }

      Sephora.analytics.analyze("quickLook", [prod, $scope.activeSku, trigger]);
    } // end init

    if(isMini) {
      Sephora.Sku.productForSku(currentSkuId).then(function(prod) {
        init(prod);
      })

    } else {
      var opts = {include_skus: 250};
      if($scope.isRestrictedQL) {
        opts.restricted=true;
      }
      if($scope.isFullPurchHistory) {
        opts.include_out_of_stock = true;
      }
      Sephora.Product.retrieve(prodId, opts).success(function(prod) {
        init(prod);
      });
    }

    $scope.shade_code = Sephora.util.ParameterUtils.extractParam("shade_code");

    // the following $scope functions are here to avoid Angular interpolation errors until
    // the product is resolved
    $scope.hasFullSizedSku = function() {
      return "activeSku" in $scope && "full_size_sku_number" in $scope.activeSku;
    }

    $scope.loveCnt = function() {
      return "product" in $scope? $scope.product.loves_count : "";
    }

    $scope.rating = function() {
      return "product" in $scope? $scope.product.rating : "";
    }

    $scope.biLabel = Sephora.ui.mixin.makeBiLabelFn($scope, "currentSku");

    var freeShippingAmt = $scope.freeShipAmt;
  } // end QLCtrl

  app.directive("sephQuickLook", Sephora.ui.directive.quickLook);

})(window, document);