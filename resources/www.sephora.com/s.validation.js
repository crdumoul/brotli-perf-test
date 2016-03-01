/**
* Basic validation framework.
* No directives yet.
* todo: might use Angular validation.
**/

(function() {'use strict';

  var isArray = angular.isArray,
    isEmptyObj = function(o) {
      var name;
      for ( name in o ) {
        return false;
      }
      return true;
    },
    noop = angular.noop,
    t = Sephora.i18n.t;

  Sephora.validation2 = (function() {

    // we support . in the name
    var fromScope = function(field, scope) {
      var r=scope;
      field.split(".").forEach(function(p) {
        r = r[p];
      })
      return r;
    }

    return {

      "Validator": function(scope, validators, options) {
        var validators = validators||[];
        var stopOnError = (options || {}).stopOnError;

        return {
          addValidator: function(validator) {
            validators.push(validator);
          },

          ifValid: function(success) {
            delete scope.errors;
            var i = 0, cnt = validators.length, errors = {};
              if (cnt === 0) {
                throw {message: "Must have at least 1 Validator."};
              }

              for (; i < cnt; i++) {
                validators[i].validate(scope, errors);
                if (stopOnError && !isEmptyObj(errors)) {
                  break;
                }
              }
            if(isEmptyObj(errors)) {
              success && success();
            } else {
              // this behavior to add the generic message could be turned off with a flag
              (errors.global||(errors.global=[])).push(t("errors.general"));
              scope.errors = errors;
            }
          }
        };
      },

      "EmailValidator": function(fld, opts) {
        opts||(opts={});
        opts.i18n||(opts.i18n="email.invalid");

        return new Sephora.validation2.GenericValidator(fld, function(val) {
          return Sephora.util.HtmlUtils.validateEmailAddress(val);
        }, opts);
      },

      "ConfirmValidator": function(confirm, fld, opts) {
        if (isEmptyObj(opts)) { throw "i18n must be specified." };

        return new Sephora.validation2.GenericValidator(confirm, function(val, scope) {
          var other = (fromScope(fld, scope)||"").trim();

          return val===other;
        }, opts);
      },

      "GenericValidator": function(fld, validFn, opts) {
        opts = opts||{};
        if ( !isArray(fld) ) { fld = [ fld ]; }

        opts.ifFn=opts.ifFn||noop;

        var msg = Sephora.i18n.t(opts.i18n||"errors.general"),
          resolve = opts.resolve;

        this.validate = function(scope, errors) {
          var fields = isArray(fld)? fld : [fld];

          fields.forEach(function(field) {
            // allow resolution not from the scope too
            var val = opts.resolve? opts.resolve() : fromScope(field, scope);

            if (opts.ifFn()!==false && validFn(val, scope)===false) {
              var key = field.split(".").slice(-1)[0]
              errors.field=errors.field||{};
              (errors.field[key]=errors.field[key]||[]).push(msg);
            }
          });
        };
      },

      "MustBePresentValidator": function(fld, opts) {
        return new Sephora.validation2.GenericValidator(fld, function(val) {
          if (typeof val === "undefined") { return false; }

          var isMinCheck = "minLength" in opts, isMaxCheck = "maxLength" in opts,
            ret;
          if(isMinCheck||isMaxCheck) {
            ret = !isMinCheck ? true : (val.length >= opts.minLength);
            return ret && (!isMaxCheck ? true : (val.length <= opts.maxLength));
          } else {
            return !!val && val!=="-1" && val!==-1;
          }
        }, opts);
      }
    }; // end Sephora.validation2
  })();

  var app = angular.module("Sephora"),
    validationApp = angular.module('s.validation', []);
  // no directives yet
  // Add to dependencies
  app.requires.push('s.validation');

})();