/**
* 
* Displays store activites and the means to enroll in them via TimeTrade.
*
**/

(function() {'use strict';

  Sephora.ui.controller.TimeTradeModalCtrl = function($scope, url) {
    $scope.url = url;
  };

  var sephora = angular.module("Sephora"),
    app = angular.module('s.store', []);

  app.directive("sephBookReservation", function($rootScope) {
        return {
          link: function() {
            $rootScope.strChannel = "ch=DOTCOM";
          }
        }
      })
      .directive("sephStoreReservations", function($http, $compile) {
        return {
          scope:true,
          link: function(scope, el, attrs) {

            scope.strChannel = "ch=DOTCOM";
            scope.hasClasses = scope.hasServices = false;
            
            try {
              scope.reservation = JSON.parse(attrs.reservation);
            } catch(e) {
              return;             
            }

            // determine what type of reservation container based on contained activity type
            for (var a = 0; a < scope.reservation.content.length; a++) {
              if (scope.reservation.content[a].tt_reservation_link.indexOf('appointmentTypeGroupId=classes') > -1) {
                scope.hasClasses = true;
              }
              if (scope.reservation.content[a].tt_reservation_link.indexOf('appointmentTypeGroupId=services') > -1) {
                scope.hasServices = true;
              }
            }
            
            var replaceAll = function(originalString, search, replacement) {
              return originalString.split(search).join(replacement);
            };
            var reservationType = scope.reservation.reservation_type.toLowerCase();

            $http.get("/javascripts/store/"+ replaceAll(reservationType, ' ','_') + ".seph").then(function(resp) {
              el.html(resp.data);
              $compile(el.contents())(scope);
            });  

          }
        }
      })
      .directive("sephTimeTradeModal", function($uibModal, $sce) {
        return {
          link: function(scope, el, attrs) {
            var launch = function() {
              $uibModal.open({
                templateUrl: "/javascripts/templates/modal/timetrade.seph",
                windowClass: "Modal--timetrade",
                controller: Sephora.ui.controller.TimeTradeModalCtrl,
                size: 'lg',
                resolve: {
                  url: function(){
                    return $sce.trustAsResourceUrl(attrs.sephTimeTradeModal);
                  }
                }
              });
            }
            el.click(function(e) {
              launch();
            });
          }
        }
      });

  // no directives yet
  // Add to dependencies
  sephora.requires.push('s.store');

})();