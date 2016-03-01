/**
 * Sephora 2009-2016.
 * Email reminders.
 */
(function(window, document, undefined) {'use strict';

  /**
   * @description
   *
   * Describe email reminders.....
   */
  var element = angular.element,

    body = element(document.querySelector('body')),

    disableUntilAjaxComplete,

    xtnd = angular.extend,

    isObject = angular.isObject,

    ParameterUtils = Sephora.util.ParameterUtils,

    app = angular.module("Sephora");


    Sephora.ui.controller.ReminderCtrl = function($scope, $rootScope, $uibModalInstance, $compile, user, emailSku) {

    var CHANGE_COMING_SOON, CHANGE;
    var t = Sephora.i18n.t;
    var DIALOG_TITLE = "email me when available";
    var DIALOG_TITLE_INSTOCK = "email me when in stock";

    var errors = new Sephora.ui.error.ErrorHelper($scope);

    $scope.isLoad = true;

    // email when back in stock request, Sephora.util.HtmlUtils
    this.onEmailMe = function(e) {
      e.preventDefault();
      
      var isRemove = !!emailSku.is_email_scheduled||(!!$scope.isRemove),
        method = isRemove ? 'removeEmailWhenInStock' : 'emailWhenInStock',
        skuId = emailSku.sku_number;

      delete $scope.whatSuccess;

        var data = {skuId: skuId},
          success = function(response) {
            var prodInfo;
            errors.withNoErrors(response.errors, function() {
              if (!isRemove && emailSku.is_coming_soon ){
                if ( $("#product-content").length ){ //PPage only
                  prodInfo = $scope.sku.primary_product;
                  Sephora.analytics.analyze(
                    "emailNotify",
                    ["email sign up:coming soon:confirmation", prodInfo.id,
                      prodInfo.brand_name.trim(), prodInfo.display_name.trim()
                    ],
                    {sameThread: true}
                  );
                }
                else {
                  var sku = emailSku;
                  sku.primary_product||(sku.primary_product={}); // move away from getting product id, brand name and product name from attributes
                  Sephora.analytics.analyze(
                    "emailNotify", // todo: this might not work on some pages
                    ["email sign up:coming soon:confirmation", sku.primary_product.id,
                      sku.primary_product.brand_name, sku.primary_product.display_name
                    ],
                    {sameThread: true}
                  );
                }
              }

              $scope.whatSuccess = isRemove? 'remove' : 'schedule';
              if(!isRemove && !("user_name" in user)) {
                user.user_name = $scope.email; // remember for walkin users
              }

              CHANGE_COMING_SOON||(CHANGE_COMING_SOON=t("sku.change.coming.soon.email"));
              CHANGE||(CHANGE=t("sku.change.in.stock.email"));
              var sku = emailSku;
              sku.is_email_scheduled = !isRemove;

              $rootScope.$broadcast("skuReminder", sku);
            });
          };
        if (!isRemove) {
          data.email = $scope.email;
        }
        errors.clear();
        Sephora.Reminder[method](data).then(success);
        return false;
      };

    Sephora.Reminder.find(emailSku.sku_number).then(function(resp) {

      $scope.isSignedIn = Sephora.User.current().isSignedIn();

      angular.element(document.querySelector('#notify_form')).append(resp);
      $compile(angular.element(document.querySelector('#notify_form')).contents())($scope);

      $scope.title = emailSku.is_coming_soon? DIALOG_TITLE : DIALOG_TITLE_INSTOCK;

      $scope.emailSku = emailSku;

      var currencyPadded = Sephora.util.HtmlUtils.makePaddCurrFormatter(Sephora.Country.USorCACurrency());

      $scope.formatAmt = function(amt) {
        return currencyPadded()+Sephora.ui.ViewHelper.currencyFormatted(amt);
      };

      if(!$scope.email) {
        $scope.email = user.user_name; // anonymous user
      }

      delete $scope.isLoad;

      Sephora.analytics.analyze("layover", [{title:"email when in stock", type:"pop-info"}]);
    });

    this.closeModal = function () {
      $uibModalInstance.close();
    };
  }


  // Create a singleton object to handle email when back in stock functionality.
  Sephora.ui.directive.emailWhenInStock = function($rootScope, $uibModal) {

    var t = Sephora.i18n.t;

    var CHANGE;
    var INSTOCK_EMAIL, COMING_SOON_EMAIL;
    var user;

    return {
      // Enables the register when back in stock functionality.
      // @param selector (optional) The buttons for which to show the register dialog, etc.
      link: function(scope, elem, attrs) {
        var self, emailSku, txt;
        self = this;

            // isShow = !sku.is_in_stock && sku.is_available_for_email;
        var emailText = function(sku) {
            INSTOCK_EMAIL||(INSTOCK_EMAIL=t("sku.emailMeWhenInStock.popup.header"));
            COMING_SOON_EMAIL||(COMING_SOON_EMAIL=t("sku.emailMeWhenAvailable.popup.header"));
            CHANGE||(CHANGE=t("sku.change.in.stock.email"));

          var isComing = sku.is_coming_soon ,
            isScheduled = sku.is_email_scheduled,
            isComponent = scope.isComponent||sku.is_component||attrs.isComponent==="true";

          if(!isScheduled && (isComponent || scope.isCarousel)) { // if directive becomes isolate scope, pass these in
            return isComing? Sephora.COMING_SOON_EMAIL_COMPONENT: Sephora.INSTOCK_EMAIL_COMPONENT;
          }
            return isScheduled? CHANGE
              : isComing? COMING_SOON_EMAIL
              : INSTOCK_EMAIL;
          };

        // for now,several components might have different Sku instances
        // todo: bind email text to emailSku
        $rootScope.$on("skuReminder", function(_, sku) {
          if(sku.sku_number===emailSku.sku_number) {
            //someone else's message
            emailSku.is_email_scheduled = sku.is_email_scheduled;
            scope.emailLabel = emailText(emailSku);//remove argument
          }
        });

        // it would be better to wait for the sku object, not the number because now we have to "guess"
        // the name of the sku in the scope
        attrs.$observe('sephEmailWhenInStock',
          function(val) {
            if(!val) {
              return;
            }

          // the only attribute the directive currently looks for is the sku number and it is NOT used
          // this directive should be changed to accept the sku object itself in this attribute and then
          // the 'skuForEmail' scope function should not be implemented in the users of this directive
          if(!scope.skuForEmail) {
            scope.skuForEmail = function() {
              return this.sku;
            }
          }

          emailSku = scope.skuForEmail()

          Sephora.Reminder.checkReminder(emailSku).then(function(resp) {
            emailSku.is_email_scheduled = resp;
            scope.emailLabel = emailText(emailSku);//remove argument
          });
        });

        var handler = function(e) {
          e.preventDefault();
          var self = e.data;

          emailSku = scope.skuForEmail(); // for UI with swatches, must get it since the sku might be different everytime

          var show = function() {
            $uibModal.open({
              templateUrl: "/javascripts/templates/modal/notify.seph",
              controller: Sephora.ui.controller.ReminderCtrl,
              windowClass: "Modal--notify",
              controllerAs: "ctrl",
              size: "sm",
              resolve: {
                emailSku: function() { return emailSku; },
                user: function() { return user; }
              }
            })
          };

          if(!user) {
            if(Sephora.User.current().isSignedIn()) {
              user = Sephora.User.current();
            } else {
              user = {};
            }
          }
          show();
        };

        elem.click(self, handler);
      }
    };
  }; // directive.emailWhenInStock

  
  app.directive("sephEmailWhenInStock", Sephora.ui.directive.emailWhenInStock)
  ;

})(window, document);