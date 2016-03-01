/**
 * Sephora
 * Login modules.
 */
(function(window, document, undefined) {'use strict';

  /**
   * @description
   *
   * Login and registration functionality. (Not password reset.)
   */

  var isIE9 = /MSIE 9\.0/.test(navigator.userAgent),

    element = angular.element,

    body = element(document.querySelector('body')),

    copy = angular.copy,

    isObject = angular.isObject,

    xtnd = angular.extend,

    launchRegistration,

    launchSignin,

    app = angular.module("Sephora");
    
  app.run(function($uibModal, $rootScope, $q, $uibModalStack) {

    Sephora.module("modal");

    Sephora.modal.isIE9 = isIE9;

    $rootScope.logOut = function() {

      Sephora.Login.logOut().then(function() {

        body.trigger("pageCall", ["sign out"]);
        body.trigger("logout");

        // .maincontent-content or .user, , .purchase-history, .payment-methods ?
        if ($(".user").length > 0) {
          window.location.href = Sephora.conf.myAccountLandingUrl;
        } else if ($(".co-module").length > 0) {
          window.location.href = Sephora.conf.contextPath ? Sephora.conf.contextPath : "/";
        } else {
          Sephora.util.Redirecting.refreshSimple();
        }

        if(Sephora.util.CookieUtils.read_cookie('user') &&
          Sephora.User.fromSessionStore()){
          Sephora.util.CookieUtils.write_cookie('user', undefined, -1);
        }

        Sephora.User.removeFromSessionStore();
      });
    };

    Sephora.modal.signInOrRedirectForIE9 = function() {
      if(isIE9 && location.protocol==="http:") {
        Sephora.util.Redirecting.toFullLogin(location.href);
      } else {
        launchSignin();
      }
    }

    // we need this so we can reuse this controller for the stand-alone login pages
    // as well as the signin modal
    var signInCtrl = Sephora.modal.SignInCtrl = function($scope, $rootScope, $uibModalInstance, opts) {
        opts||(opts={});
        var refresh = opts.refresh!==false;
        var isCheckout = opts.isCheckout===true;
        var submitBasketPage = opts.submitBasketPage;
        var isSocial = [true, "true"].contains(opts.isSocial);

        $scope.is_play = opts.is_play;
        $scope.is_play_quiz = opts.is_play_quiz;

        $scope.dontChangeUserName = isCheckout && !!($rootScope.user||{}).user_name;
        
        $scope.user={ user_name: opts.user_name||($rootScope.user||{}).user_name }; // not to be confused with the rootscope user
        
        var v = Sephora.validation2,

          validator = v.Validator($scope, [
            new v.EmailValidator("user.user_name", { i18n: "email.invalid" }),
            new v.MustBePresentValidator("user.password", { minLength: 6, maxLength: 12, i18n: "user.password.format.error" }),
          ]),
          // for new users
          v2 = v.Validator($scope, [
            new v.EmailValidator("user.user_name", { i18n: "email.invalid" })
          ]);
        
        var normalLogin = function() {
          validator.ifValid(function() {

            $scope.disableForm = true;
            
            var data = copy($scope.user);
              if([true, "true"].contains(opts.isSocial)) {
                xtnd(data, {
                  nextpage: opts.nextpage, 
                  provider: opts.provider });
              }

            Sephora.Login[isCheckout? "loginForCheckout" : "logIn"](data).then(function(r) {
              var resp = r.data;
              if("errors" in resp) {
                $scope.errors = resp.errors;
              } else {
                var user = resp.user;
                Sephora.User.current(user); // save more stuff (cart, etc.) later
                user.saveToSessionStore();

                if(user.is_store_bi_member) {
                  $uibModalInstance.close("startPOSRegister");
                  launchRegistration($scope.user.user_name, {isPOS: true, user: resp.user});
                } else {
                  
                  $rootScope.$broadcast("signIn");
                  wa.forNextPage({"eVar53": user.user_name, "onTopDomain": true});

                  var loc = r.headers("Location");

                  if(isSocial) {
                    // let the directive handle it all
                    $uibModalInstance.close(["signin", r.status, loc]);
                  } else if (opts.nextpage) {
                    $uibModalInstance.close("signin"); // standalone login.jsp handles redirects
                  } else {
                    $uibModalInstance.close("signin");
                    
                    if(loc) {
                      window.location.href = loc;
                    } else {
                      refresh && Sephora.util.Redirecting.refreshSimple();
                    }
                  }
                }
              }
            })
            ["finally"](function()  {
              delete $scope.disableForm;
            })
          });
        }

        this.logIn = function(e) {
          e.preventDefault();
          if(!$scope.userExists) {
            if(isCheckout) {
              // Test B scenario
              // validate user name here
              v2.ifValid(function() {
                submitBasketPage($scope.user.user_name, {validate: true}).then(function(resp) {
                  if("errors" in resp) {
                    $scope.errors = resp.errors;
                  }
                });
              });
            } else if (opts.isSocial) {
              // login page only
              $scope.disableForm = true;
              var userName = $scope.user.user_name;
              Sephora.User.probe({login: userName, provider: opts.provider, nextpage: encodeURIComponent(opts.nextpage), is_social: opts.isSocial })
              .then(function(resp) {
                if( resp.status === 204){
                  $scope.errors = {global: Sephora.i18n.t("user.registration.emailAlreadyExists", userName)};
                }
                else if( resp.status === 200){
                  $uibModalInstance.close("startPOSRegister");
                  launchRegistration(userName, {user: resp.data});
                }
              },function(resp){
                  if( resp.status === 400){
                    $scope.errors = resp.data.errors;
                  } else if( resp.status === 404){
                    Sephora.util.Redirecting.redirectTo("/profile/registration/registration.jsp?type=sephoraAccountRegistrationSocial");
                  }
                })
              ["finally"](function()  {
                delete $scope.disableForm;
              });
            }  else {

              $scope.disableForm = true;
              var userName = $scope.user.user_name;
              Sephora.User.probe({login: userName})
              .then(function(resp) {
                //204 -> Already Registered and not in store -> Show Error Message
                //200 -> POS
                if( resp.status === 204){
                  $scope.errors = {global: Sephora.i18n.t("user.registration.emailAlreadyExists", userName)};
                }
                else if( resp.status === 200){
                  $uibModalInstance.close("startPOSRegister");
                  // Pass in the user data though.
                  launchRegistration(userName, {user: resp.data});
                }
              },function(resp){
                  //400 means that login parameter is not valid - error from response should be rendered
                  //404 means user not found and can be successfully registered
                  if( resp.status === 400){
                    $scope.errors = resp.data.errors;
                  } else if( resp.status === 404){
                    // nextpage means standalone login page, we do not show the 
                    // registration modal there either
                    if(!opts.nextpage) {
                      launchRegistration(userName);
                    }
                    $uibModalInstance.close("startregister");
                  }
                })
              ["finally"](function()  {
                delete $scope.disableForm;
              });
            }
          } else {
            normalLogin();
          }
        }
      };//sign in controller

    Sephora.modal.launchSignin = launchSignin = function(opts) {

      var modal = $uibModal.open({
        templateUrl: "/javascripts/templates/modal/signin.seph",
        windowClass: "Modal--signin",
        controllerAs: "ctrl",
        controller: signInCtrl,
        resolve: {
          opts: function() {
            return opts;
          }
        }
      });

      return modal.result;
    } // launchSigin

    var registrationCtrl = function($scope, $uibModalInstance, userName, opts) {
        opts||(opts={});
        var isPOS = opts.isPOS===true,
          isRefresh = opts.isRefresh!==false,
          isDefEmail = Sephora.Country.currentCountry()!==Sephora.CA||opts.is_subscribed_to_email;

        // this is for old browsers that do not process HTML5 validation attributes
        var v = Sephora.validation2,
          whenNotOnlyBISignup = function() {
            return !$scope.isBIMode;
          },
          mustTc = function() {
            return $scope.isBIMode||["birth_month","birth_day","birth_year"].some(function(f) {
              return $scope.u[f] && $scope.u[f]!==-1;
            });
          },

          birthDateValidator = new v.MustBePresentValidator(["u.birth_month","u.birth_day","u.birth_year"], { ifFn: function() {
              return $scope.u.tc_agree||$scope.isBIMode;
            } }),

          validator = v.Validator($scope, [
            new v.ConfirmValidator("u.confirm_user_name", "u.user_name", { i18n: "email.mismatch", ifFn: whenNotOnlyBISignup  }),
            new v.EmailValidator("u.user_name", { i18n: "email.invalid", ifFn: whenNotOnlyBISignup }),
            new v.MustBePresentValidator("u.first_name", { i18n: "user.firstName.missing", ifFn: whenNotOnlyBISignup }),
            new v.MustBePresentValidator("u.last_name", { i18n: "user.lastName.missing", ifFn: whenNotOnlyBISignup }),
            new v.MustBePresentValidator("u.challenge_answer", { i18n: "user.challengeAnswer.missing", ifFn: whenNotOnlyBISignup  }),
            new v.MustBePresentValidator("u.tc_agree", { i18n: "user.BI.terms.required", ifFn: mustTc  }),
            new v.MustBePresentValidator("u.password", { minLength: 6, maxLength: 12, i18n: "user.password.format.error", ifFn: whenNotOnlyBISignup }),
            new v.ConfirmValidator("u.password_confirmation", "u.password", { i18n: "user.password.mismatch", ifFn: whenNotOnlyBISignup  }),
            birthDateValidator
          ])
          // end validation

          this.theyears=[{name: "year", value: -1}, {name:"-----"}];
          var j=(new Date()).getFullYear()-13;
          while(j>1899) {
            this.theyears.push({name: j, value:j--});
          }
          this.theyears.push({name: "Before 1900", value: "Before 1900"});

          this.themonths=[{name: "month", value: -1}, {name:"-----"}, {name:"January", value:1}, {name:"February",value:2},{name:"March",value:3}, {name:"April",value:4}, 
            {name:"May",value:5}, {name:"June", value:6}, {name:"July", value:7}, 
            {name:"August", value:8}, {name:"September", value:9}, {name:"October", value:10}, {name:"November", value:11}, 
            {name:"December", value: 12}];
          
          this.thedays = [{name: "day", value: -1}, {name: "-----"}];
          j=1;
          while(j<32){
            this.thedays.push({name: j, value:j++});
          }

          var changeToPos = this.changeToPos = function(isPos) {
            $scope.isPosMode = isPos;
            if(isPos) {
              $scope.u.is_subscribed_to_email = !!$scope.u.user_name && isDefEmail;
              $scope.u.tc_agree = !!$scope.u.user_name;
              $scope.u.confirm_user_name = $scope.u.user_name;// or we could set this in toSubmit
              $scope.isDisableTc = !!$scope.u.user_name
            }
            else {
              $scope.isDisableTc = false;
              $scope.u = {birth_month: -1, birth_day: -1, birth_year: -1, user_name: userName, is_subscribed_to_email: isDefEmail};
            }
          }

          $scope.isPosMode = isPOS;

          $scope.isBIMode = $scope.user.isSignedIn()&&!$scope.user.isBI();
          if(!("user" in opts)) {
            $scope.u = {birth_month: -1, birth_day: -1, birth_year: -1, user_name: userName, is_subscribed_to_email: isDefEmail}; // collect user data in this
          }

          // todo: if opts has 'user', switch to POS mode and do not make the touch call.
          if("user" in opts) {
            $scope.u = opts.user;
            $scope.u.user_name = userName;
            $scope.u.birth_year||($scope.u.birth_year=-1); // sometimes the server does not send years
            changeToPos(true);
          } else if(userName && !isPOS && !$scope.isBIMode) {
            Sephora.User.probe({ login: userName })
              .then(function(resp) {
                if( resp.status === 200 ){ //POS mode
                  $scope.u = resp.data;
                  $scope.u.user_name = userName;
                  changeToPos(true);
                } else if(resp.status === 204){
                  $scope.errors = {global: Sephora.i18n.t("user.registration.emailAlreadyExists", userName)};
                }
              });
          }

          var ifVerifiedUser = function(cont) {
            
            if ($scope.isPosMode) {
              cont();
            } else {
              var login = $scope.u.user_name||$scope.user.user_name;
              Sephora.User.probe({ login: login })
              .then(function(resp) {
                  if(resp.status === 204){
                    var error = {global: Sephora.i18n.t("user.registration.emailAlreadyExists", login)};
                    $scope.errors = error;
                    digitalData.util.fireEventForTMS("errorMessages", error);
                  }
                  else if( resp.status === 200 ){ //POS mode
                    // did we ever copy the password before we reset the user?
                    var uname = $scope.u.user_name;
                    $scope.u = resp.data;
                    $scope.u.user_name = uname;
                    changeToPos(true);
                  }
                },
                function(resp){
                  if(resp.status === 404){cont();}
                }
              )["finally"](function(){
                $(document).trigger("ajaxComplete");// todo: clean this up
              })
            }
          }

          var secretVal = function() {
            return element(document.querySelector('#AO_ATO_variable'))[0].value;
          }

          var processRegistration = function() {
            if("util" in window) {
              util.parse('AO_ATO_variable');
            }

            ($scope.isBIMode? function(fn) { fn(); } : ifVerifiedUser)(function() {
              var posReg = $scope.isPosMode,
                u = $scope.u;
              
              if ($scope.isBIMode) {
                delete u.user_name;
              } else if(!u.tc_agree) {
                delete u.birth_month;
                delete u.birth_day;
                delete u.birth_year;
              }

              if (posReg){
                u.tc_agree = true;
              }
              // todo: if is_subscribed_to_email is disabled, then send it as checked
              if($scope.isEmailSubscribeDisabled) {
                u.is_subscribed_to_email = isDefEmail;
              }
              
              u.AO_ATO_variable = secretVal();

              $scope.disableForm=true;
              delete $scope.captchaErrors;
              delete $scope.errors;
              
              Sephora.User[$scope.isBIMode? "joinBI" : "create"](u)
              .then(function(data) {
                
                // leave the errors check in master, response must always be object, not string
                 // join bi returns nothing, i.e. a string
                if(isObject(data)) {
                  var user = data.user;
                  if(!("errors" in data)) {
                    Sephora.User.current(user);
                    user.saveToSessionStore();
                    Sephora.analytics.userRegistered($scope);
                    Sephora.analytics.analyze("register", [user], {sameThread:true});
                    $uibModalInstance.close("register");
                    isRefresh && Sephora.util.Redirecting.refreshSimple();
                  } else {
                    $scope.errors = data.errors;
                    Sephora.analytics.analyze("submitRegistration", {"errors":$scope.errors}, {sameThread:true});
                    if (isObject(data) && "challenge_answer" in ((data.errors||{}).field||{}) ) {
                      $scope.captchaErrors = {field: {challenge_answer: ""}};
                      Sephora.$rootScope.$broadcast("refreshCaptcha");
                    }
                  }
                }
              })
              ["finally"](function() {
                delete $scope.disableForm;
              });
            });
          };

          this.onTcAgree = function() {
            if($scope.u.tc_agree) {
              $scope.u.is_subscribed_to_email=isDefEmail;
              isDefEmail && ($scope.isEmailSubscribeDisabled=true);
            } else {
              delete $scope.isEmailSubscribeDisabled;
            }
          }
          
          this.onSubmit = function(e) {
            e.preventDefault();

            validator.ifValid(processRegistration);
            if ($scope.errors !== undefined) {
                Sephora.analytics.analyze("submitRegistration", [$scope.errors], {sameThread:true});
            }
          }

        }// end registration controller
  

    Sephora.modal.launchRegistration = launchRegistration = function(userName, opts) {
 
      var modal = $uibModal.open({
        templateUrl: "/javascripts/templates/modal/register.seph",
        windowClass: "Modal--register",
        controllerAs: "ctrl",
        controller: registrationCtrl,
        resolve: {
          userName: function() {
            return userName;
          },
          opts: function() {
            return opts;
          }
        }
      });

      return modal.result;
    } // end launchRegistration
  })

  .directive("sephSignIn", function() {
    return {
      link: function(scope, el) {
        el.on("click", function(e) {
          e.preventDefault();
          Sephora.analytics.analyze("layover", [{title:"sign in", info:{type: "in"}}]);
          if( (isIE9 && location.protocol==="http:") ||  window.location.href.indexOf("http://community.") > -1) {
            Sephora.util.Redirecting.toFullLogin(location.href);
          } else {
            launchSignin();
          }
        });
      }
    };
  })

  .directive("sephRegister", function($uibModal) {
    return {
      link: function(scope, el) {
        el.on("click", function() {
            (isIE9 && location.protocol==="http:")? Sephora.util.Redirecting.redirectTo("/profile/registration/registration.jsp?nextpage="+encodeURIComponent(location.href)) 
            : (scope.user&&scope.user.isSignedIn()&&!scope.user.isBI())? launchRegistration(scope.user.user_name, {is_subscribed_to_email: scope.user.is_subscribed_to_email}) 
            : launchRegistration();
            Sephora.analytics.analyze("layover", [{title:"register", info:{type: "up"}}]); 
          })
      }
    };
  })
  ;


  // NO DATA LAYER YET

 })(window, document);