/**
 * Sephora 2009-2016.
 * Loves functionality.
 */
(function(window, document, undefined) {'use strict';

  /**
   * @description
   * Todo: Move loves code here from sephora.user.js
   * Describe loves.....
   */
  var element = angular.element,

    body = element(document.querySelector('body')),

    copy = angular.copy,

    disableUntilAjaxComplete,

    xtnd = angular.extend,

    isArray = angular.isArray,

    isFunction = angular.isFunction,

    isObject = angular.isObject,

    // persistence localizations

    AJAX_COMPLETE_E = Sephora.AJAX_COMPLETE_E,

    AJAX_START_E = Sephora.AJAX_START_E,

    JUST_DATA = Sephora.JUST_DATA,

    POST_HEADERS = Sephora.POST_HEADERS, 

    DELETE_CSRF = Sephora.DELETE_CSRF,

    ParameterUtils = Sephora.util.ParameterUtils,

    app = angular.module("Sephora");


  xtnd(Sephora.ui.controller, {
    // Controller to handle the Add to My List button when no love items are shown
    SupportsLoves: {
      getLoveCnt: function(productId) {
        if(Modernizr.sessionstorage) {
          var key = "loveCnt_"+productId;
          return window.sessionStorage.getItem(key);
        }
      },

      // only update if exists unless isCreate=true
      updateLoveCnt: function(productId, cnt, isCreate) {
        if(Modernizr.sessionstorage) {
          if(cnt===undefined || isNaN(cnt)) {
            return;
          }
          var key = "loveCnt_"+productId;
          if(isCreate) {
            window.sessionStorage.setItem(key, cnt);
          } else {
            var val = window.sessionStorage.getItem(key);
            if(val!==undefined &&val!==null && !isNaN(val)) {
              window.sessionStorage.setItem(key, cnt);
            }
          }
        }
      }
    }
  });


  // elements that show loved status and can take action like add to loves
  Sephora.ui.directive.sephLovable = function($rootScope) {
    return {
      link: function(scope, elem, attrs) {
        var MyList = Sephora.MyList,
          self = Sephora.ui.controller.SupportsLoves,
          collVert = scope.product!==undefined? scope.product.isCollOrVertical() : false;
        var check = function(skuNumber) {
          Sephora.MyList.isOnMyList(skuNumber, function(isLoved) {
            setTimeout(function() {
              scope.$apply(function() {
                scope.isLoved = isLoved;
              });
          }, 0);//we don't know if isOnMyList returns in same thread or not
          });
        }

        scope.lovableText = function() {
          return scope.hoverTxt? scope.hoverTxt
            : scope.isLoved? collVert? "loved all": "loved" : collVert? "add all to loves" : "add to loves";
        }

        var w = scope.$watch("user", function(u) {
          if(!u) {
            return;
          }
          w();
          if(scope.user.isSignedIn()) {
            scope.$watch(function() {return elem.attr('data-sku_number'); }, function(val) {
              check(val);
            });
          }
        });

        scope.hoverEnable = true;

        elem.click(function(e) {
          e.preventDefault();
          //e.stopPropagation();

          var prodId,
            productId = attrs.sephLovable||elem.attr("data-product_id"), skuId, fn,
            isLove = !scope.isLoved,
            oldCnt = self.getLoveCnt(productId);

          if(collVert) {

            prodId = elem.attr("data-product_id");// this is 'love all'
            fn = isLove? "createAll" : "destroyAll";
          } else {
            fn = isLove? "create" : "destroy";
          }

          skuId = attrs.skuNumber;

          disableUntilAjaxComplete(elem);

          MyList[fn](collVert? prodId : skuId).then(function(lovedItems) {
            if(oldCnt!==undefined && oldCnt!==null) {
              self.updateLoveCnt(productId, parseInt(oldCnt) + (isLove? 1 : -1));
            }

            if(angular.isFunction(scope.updateLoveButton)) {
              scope.updateLoveButton(skuId, elem, isLove);
            }
            MyList.addListItems((angular.isArray(lovedItems)||angular.isObject(lovedItems))? lovedItems : {sku_number: skuId}, isLove);// this should be done in the create function

            scope.isLoved = isLove;
            delete scope.hoverEnable;
            delete scope.hoverTxt;

            if(angular.isFunction(scope.onSuccessfulLove)) {
              scope.onSuccessfulLove(skuId);
            }
            Sephora.event.publish(isLove? "itemLoved" : "itemUnloved", [skuId, isLove, elem, angular.isArray(lovedItems)? lovedItems[0]
                                                            : angular.isObject(lovedItems)? lovedItems
                                                            : {sku_number: skuId}]);

            productId = productId? productId : scope.sku.primary_product_id;  

            //notify basket that loves was changed
            $rootScope.$broadcast("changeLoves", {sku: skuId, isLove: isLove });
                                            

            Sephora.analytics.analyze("love", [productId, isLove, skuId], {nextPage: scope.user.isUnrecognized()});
          });
        });

        Sephora.event.resubscribe("itemLoved itemUnloved", function(e, skuNo, isLove, publisher) {
          if(attrs.skuNumber===skuNo && publisher[0]!==elem[0]) {
            scope.isLoved = isLove;
            delete scope.hoverEnable;
            delete scope.hoverTxt;
          }
        });

        if(!Modernizr.touch) {
          elem.on("mouseenter", function() {
            scope.$apply(function() {
              if(scope.isLoved) {
                scope.hoverTxt = collVert? "unlove all":"unlove";
              }
            });
          })
          .on("mouseleave", function() {
            scope.$apply(function() {
              scope.hoverEnable = true;
              delete scope.hoverTxt;
            });
          });
        }
      }
    }
  } // end Sephora.ui.directive.sephLovable

  Sephora.ui.directive.sephLoveCount = function() {
    return {
      link: function(scope, element, attrs) {
        var SupportsLoves = Sephora.ui.controller.SupportsLoves,
          key = scope.productId||scope.product.id,
          sessLoveCnt = Modernizr.sessionstorage? SupportsLoves.getLoveCnt(key) : null,
          fromSession = undefined!==sessLoveCnt&&null!==sessLoveCnt ? parseInt(sessLoveCnt) : undefined,
          format = function(loveCnt) { return loveCnt>9999? Math.floor(loveCnt/10000)+"0K" : loveCnt; };

        var w = scope.$watch("user", function(u) {
          if(!u) {
            return;
          }
          w();
          scope.$watch("allSkuIds", function(val) {
            if(val===undefined) {
              return;
            }
            // this should stop watching after the first time it enters here
            var allSkuIds = scope.allSkuIds(),
              loveCnt = !isNaN(fromSession)? fromSession : parseInt(attrs.sephLoveCount)||0;
            // if 0, guesstimate and store
            if(0===loveCnt && u.isSignedIn()) {
              allSkuIds.forEach(function(skuId, idx) {
                Sephora.MyList.isOnMyList(skuId, function(isLoved) {
                  if(isLoved) {
                    loveCnt++;
                  }
                  // apply when last was checked
                  if(idx===allSkuIds.length-1) {
                    var fn = function() {
                      scope.loveNumber = format(loveCnt);
                      SupportsLoves.updateLoveCnt(key, loveCnt, true);
                    }
                    scope.$$phase? fn() : scope.$apply(fn);
                  }
                })
              });
            } else {
              scope.loveNumber = format(loveCnt);
              SupportsLoves.updateLoveCnt(key, loveCnt, true);
            }
          });
        });

        Sephora.event.resubscribe("itemLoved itemUnloved", function(_, skuId, loved) {
          //remove apply in master too
          var r, oldCnt = SupportsLoves.getLoveCnt(key); // browsers that do not have session storage
          r = (oldCnt!==undefined && oldCnt!==null)? parseInt(oldCnt)
            : Math.max(0, (element.data("loves-num")||0) + (loved? 1 : -1));

          scope.loveNumber = format(r);
        });
      }
    };
  } // end Sephora.ui.directive.sephLoveCount

  app.run(function() {
      disableUntilAjaxComplete = Sephora.ajax.disableUntilAjaxComplete;
    })
    //block for Sephora.MyList
    .run(function($q, $http, $rootScope) {
      var withSignedIn = Sephora.withSignedIn;
      var toSend = ParameterUtils.toSend;
      var AJAX_COMPLETE = Sephora.AJAX_COMPLETE;

      Sephora.MyList = (function() {
        var myList, fn, fnAll, total;

        var setMyLoves = function(list) {
          myList = list;
        }

        return {
          url: "/rest/user/favorites/",

          /**
           * Retrieves MyList in JSON format for currently signed in user (same structure as ShoppingCart).
           * If User is not signed on, sends 400-499 HTTP status code.
           */
          all: function(opts) {

            return fnAll = $http.get(Sephora.MyList.url+"?"+toSend(opts))
              .then(JUST_DATA)
              ["finally"](AJAX_COMPLETE)
              .then(Sephora.MyList.mixInEntity)
              .then(function(resp) {
                myList = resp.favorites||[];
                if("total" in resp) { total = resp.total; }

                Sephora.logger.log("MyList.all is ready");
                return resp;
              });
          },
          // method for retrieving the desired number of favorites from cache, if available
          // if cache is empty, will use ongoing call or make a new call
          fromCacheIfEnoughItems: function(opts) {

            var d, p;
            if(myList && myList.length>=opts.limit) {
              d = $q.defer();
              p = d.promise;
              d.resolve(opts.limit ? myList.slice(0, opts.limit) : myList);
              return p;
            } else if(fnAll) {
              d = $q.defer();
              p = d.promise;
              fnAll.then(function() {
                // this is not perfect, what if the outgoing call did not request enough loves
                d.resolve({favorites: opts.limit ? myList.slice(0, opts.limit) : myList });
                fnAll = undefined; // no longer usable
              })
              return p;
            } else {
              // just make the call
              return Sephora.MyList.all(opts);
            }
          },

          mixInEntity: function(resp) {
            var ar;
            if(angular.isArray(resp)) {
              ar = resp;
            } else if(angular.isObject(resp)) {
              if("favorites" in resp) {
                ar = resp.favorites;
              } else {
                ar = [resp];
              }
            }
            (ar||[]).forEach(function(p) { Sephora.Sku.mixInEntity(p); })
            return resp;
          },

          isInited: function() {
            return (!!myList) || (!!fn);
          },

          totalCount: function() {
            return total || (myList? myList.length : -1);
          },

          // entry point for components that need to track loves in a collection
          // PDP, search
          initFavorites: function(results) {
            var MyList = Sephora.MyList, CookieUtils = Sephora.util.CookieUtils;
            if(results && ("favorites" in results)) {
              Sephora.logger.log("MyList.initFavorites mapping");
              setMyLoves(results.favorites.map(function(e) { return {sku_number: e}; }));
            }
            return results;
          },

          // we create one instance of the ajax function for each RESTful URL
          // so that pending calls can be traced
          // ideally a post and a delete should not be called at the same time
          memoized: (function() {
            var fns = {};
            return function(url, verb, builder) {
              fns[verb]||(fns[verb]={});
              if(fns[verb][url]) {
                return fns[verb][url];
              } else {
                return (fns[verb][url]=builder());
              }
            }
          })(),

          // if MyList.all has been called with options right before this, the
          // cached loves might not contain all the loves
          isOnMyList: function(skuId, success) {

            function checkMyList() {
              if (typeof myList !== "undefined") {
                var isOnList = myList.some(function(e) {
                  return e.sku_number===skuId;
                });
                success(isOnList);
              }
            }

            checkMyList();
          },

          // store or rename My List items on pages that require only the sku numbers
          // kept in a collection 'myList' such as swatch pages (rename this since it removes too)
          addListItems: function(myListIn, isAdded, success) {

            if(!isArray(myListIn)) { //normalize
              myListIn = [myListIn];
            }

            var controller = this,
              add = function() {
                myListIn.forEach(function(newItem) {
                  if (!myList.some(function(listItem) {
                    return listItem.sku_number === newItem.sku_number;
                  })) {
                    myList.unshift(newItem);
                    total++;
                  }
                });
              },
              remove = function() {
                // removed
                var idx, items = myList, skuId = myListIn[0].sku_number;
                items.forEach(function(item, i) {
                  if(item.sku_number === skuId){
                    idx = i; //find a better way for this
                  }
                });
                if(idx>-1) {
                  items.splice(idx, 1);
                  total--;
                }
              };

            if (isAdded===true) {
              add();
              if (isFunction(success)) success.call(controller, myList);
            } else if(isAdded===false) {
              remove();
              if (isFunction(success)) success.call(controller, myList);
            } else {
              if (isFunction(success)) success.call(controller, myList);//just hovering
            }
          }
        };
      })(); // MyList

      xtnd(Sephora.MyList, {
        // this is not a "nice" post since it uses the id in the URL
        "create": function(skuId) {
          return $http.post(this.url+skuId, {}, copy(POST_HEADERS))
            .then(JUST_DATA)
            .then(Sephora.MyList.mixInEntity)
            ["finally"](AJAX_COMPLETE);
        },

        "destroy": function(skuId) {
          return $http["delete"](this.url+skuId, DELETE_CSRF)
            .then(JUST_DATA)
            ["finally"](AJAX_COMPLETE);
        },

        // is this used?
        "createAll": function(prodId) {
          var url = "/rest/user/favorites/products/"+prodId;
          return $http.post(url, {}, copy(POST_HEADERS))
            .then(JUST_DATA)
            ["finally"](AJAX_COMPLETE);
        },

        "destroyAll": function(prodId) {
          var url = "/rest/user/favorites/products/"+prodId;
          return $http["delete"](url, DELETE_CSRF)
            .then(JUST_DATA)
            ["finally"](AJAX_COMPLETE);
        },

        // pass in a single string or single object with sku_number member, or any combination of these in an array
        "loveMultiple": function(ar) {
          ar = angular.isArray(ar)? ar : [ar];
          var body = ar.map(function(sku) {
            return "sku_id="+(angular.isObject(sku)? sku.sku_number : sku);
          }).join("&");
          return $http.post(this.url, body, copy(POST_HEADERS))
            ["finally"](AJAX_COMPLETE);
        },

        "resolveSharedUrl": function() {
          return $http.get("/rest/user/favorites/sharelink?"+toSend({ts:Date.now()}));
        }
      })

      Sephora.MyList.create = withSignedIn(Sephora.MyList.create);
      Sephora.MyList.destroy = withSignedIn(Sephora.MyList.destroy);
      Sephora.MyList.loveMultiple = withSignedIn(Sephora.MyList.loveMultiple);
      Sephora.MyList.createAll = withSignedIn(Sephora.MyList.createAll);
      Sephora.MyList.destroyAll = withSignedIn(Sephora.MyList.destroyAll);

      // pass in a single string or single object with sku_number member, or any combination of these in an array
      Sephora.MyList.unloveMultiple = function(ar) {
        ar = angular.isArray(ar)? ar : [ar];
        var sku_ids = ar.map(function(sku) {
          return (angular.isObject(sku)? sku.sku_number : sku);
        }).join(",");
        return $http['delete'](this.url+"?sku_ids="+sku_ids);
      }

    }) // end MyList block
    .directive("sephLovable", Sephora.ui.directive.sephLovable)
    .directive("sephLoveCount", Sephora.ui.directive.sephLoveCount)

  ;

})(window, document);