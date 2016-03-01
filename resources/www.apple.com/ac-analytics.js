require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** 
 * @module ac-array
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	flatten:      require('./ac-array/flatten'),
	intersection: require('./ac-array/intersection'),
	toArray:      require('./ac-array/toArray'),
	union:        require('./ac-array/union'),
	unique:       require('./ac-array/unique'),
	without:      require('./ac-array/without')
};

},{"./ac-array/flatten":2,"./ac-array/intersection":3,"./ac-array/toArray":4,"./ac-array/union":5,"./ac-array/unique":6,"./ac-array/without":7}],2:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-array.flatten
 *
 * @function
 * 
 * @desc Take a multi-dimensional array and flatten it into a single level.
 *
 * @param {Array} array
 *        Take a multi-dimensional array and flatten it into a single level
 *
 * @returns {Array} Flattened array.
 */
module.exports = function flatten (array) {
	var flattenedArray = [];
	var callback = function (item) {
		if (Array.isArray(item)) {
			item.forEach(callback);
		} else {
			flattenedArray.push(item);
		}
	};
	array.forEach(callback);
	return flattenedArray;
};

},{}],3:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-array.intersection
 *
 * @function
 * 
 * @desc Produce an array that contains every item shared between all the passed-in arrays.
 *       Based on: https://github.com/jashkenas/underscore/blob/master/underscore.js#L525
 *
 * @param {...Array} array
 *        Any number of arrays
 *
 * @returns {Array} An empty array if no matches or an array containing all matches.
 */
module.exports = function intersection (array) {
	// If nothing was passed return an empty array
	if (!array) {
		return [];
	}
	var argsLength = arguments.length;
	var i = 0;
	var len = array.length;
	var result = [];
	var item;

	for(i; i < len; i++) {
		item = array[i];

		// If item has already been pushed continue on to the next iteration
		if (result.indexOf(item) > -1) {
			continue;
		}

		// If the item does not exist in the arguments index break;
		for(var j = 1; j < argsLength; j++) {
			if (arguments[j].indexOf(item) < 0) {
				break;
			}
		}

		// If all arguments have been matched push the item into the result
		if (j === argsLength) {
			result.push(item);
		}
	}

	return result;
};

},{}],4:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-array.toArray
 *
 * @function
 * 
 * @desc Take an Array-like object and convert it to an actual Array.
 *
 * @param {Object} arrayLike
 *        Take an Array-like object and convert it to an actual Array
 *        (for instance a NodeList)
 *
 * @returns {Array} Generated array from object.
 */
module.exports = function toArray (arrayLike) {
	return Array.prototype.slice.call(arrayLike);
};

},{}],5:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var flatten = require('./flatten');
var unique = require('./unique');

/**
 * @name module:ac-array.union
 *
 * @function
 * 
 * @desc Creates a union of unique values of the provided arrays.
 *
 * @param {...Array} array
 *        The array(s) to create a union of
 *
 * @returns {Array} An array containing the union of the provided arrays.
 */
module.exports = function union (array) {
	return unique(flatten(Array.prototype.slice.call(arguments)));
};

},{"./flatten":2,"./unique":6}],6:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-array.unique
 *
 * @function
 * 
 * @desc Takes an array containing duplicates and returns a new
 *       array containing only unique values.
 *
 * @param {Array} array
 *        An array containing duplicate values
 *
 * @returns {Array} An array containing only unique values.
 */
module.exports = function unique (array) {
	var _unique = function(prev, current) {
		if (prev.indexOf(current) < 0) {
			prev.push(current);
		}
		return prev;
	};
	return array.reduce(_unique, []);
};

},{}],7:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-array.without
 *
 * @function
 * 
 * @desc Removes an entry from an array.
 *
 * @param {Array} arr
 *        Source array
 *
 * @param {*} value
 *        Entry in array to remove
 *
 * @returns {Array} A new array that is the source array without the first
 *                  instance of the value provided.
 */
module.exports = function without (arr, value, recurse) {
	var newArr;
	var index = arr.indexOf(value);
	var length = arr.length;

	if (index >= 0) {

		// iterating through the array will be faster than calling .without() over and over
		if(recurse) {
			// clone the arr to newArr
			newArr = arr.slice(0, length);
			// start at the first index and continue
			var i,
				amountRemoved = 0;
			for (i = index; i < length; i++) {
				// if the value matches, remove it from the newArr
				if (arr[ i ] === value) {
					newArr.splice(i - amountRemoved, 1);
					// add one to the amountRemoved to handle the difference between arr and newArr
					amountRemoved++;
				}
			}

		// If it’s the last item
		} else if (index === (length - 1)) {
			newArr = arr.slice(0, (length - 1));

		// If it’s the first item
		} else if (index === 0) {
			newArr = arr.slice(1);

		// If it’s in the middle
		} else {
			newArr = arr.slice(0, index);
			newArr = newArr.concat(arr.slice(index + 1));
		}

	} else {
		return arr;
	}

	return newArr;
};

},{}],8:[function(require,module,exports){
/** 
 * @module ac-console
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	log: require('./ac-console/log')
};

},{"./ac-console/log":9}],9:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var debugMessagingKey = 'f7c9180f-5c45-47b4-8de4-428015f096c0';
var allowDebugMessaging = !!(function () {
	try { return window.localStorage.getItem(debugMessagingKey); } catch (err) {}
}());

module.exports = function log (message) {
	if (window.console && typeof console.log !== 'undefined' && allowDebugMessaging) {
		console.log(message);
	}
};

},{}],10:[function(require,module,exports){
/**
 * More or less follows this specification: 
 * http://wiki.commonjs.org/wiki/Promises/A
 * Other references: 
 * http://en.wikipedia.org/wiki/Futuresandpromises
 * http://livedocs.dojotoolkit.org/dojo/Deferred
 * http://www.sitepen.com/blog/2010/05/03/robust-promises-with-dojo-deferred-1-5/
 * http://api.jquery.com/category/deferred-object/
 *
 * Understanding Deferreds
 * ====================================
 * var asyncTask = function() { 
 *      var def = new Deferred(); 
 *
 *      setTimeout(function() { 
 *          def.resolve(1); 
 *      }, 1000); 
 *      
 *      return def.promise(); 
 *  }
 *  
 *  var haveAllData = Deferred.when(1, asyncTask());
 *  
 *  haveAllDataPromise.then(function(data) { 
 *      var result = data[0] + data[1];
 *      console.log(result); // logs 2
 *      return result; 
 *  }).then(function(data) {
 *      console.log(data * 2); // logs 4
 *  })
 *   
 */
(function (root, factory) {
    if (typeof exports === "object" && exports) {
        module.exports = factory; // CommonJS
    } else if (typeof define === "function" && define.amd) {
        define(factory); // AMD
    } else {
        root.Deferred = factory; // <script>
    }
}(this, (function() {
    'use strict';

    var exports = {};

    var statuses, each, CallbackContainer, funcOrEmpty, Deferred, Promise, promiseProto, passThrough;

    statuses = {
        0: 'pending',
        1: 'resolved',
        2: 'rejected'
    };

    // Used to loop through the pending promises for a given deferred.
    // promises must be fulfilled in order
    each = function(type, data) {
        var i, pending, length, callbackObj, callbackResult;

        if(this._status !== 0) { 
            if(console && console.warn) {
                console.warn('Trying to fulfill more than once.');
            }
            return false; 
        }

        // store the data for promises after fulfillment  
        this.data = data; 

        // reference to array of pending promises
        pending = this.pending;
        length = pending.length;

        for(i = 0; i < length; i++) {
            callbackObj = pending[i];

            // If callback of type (resolve, reject, progress) exists, invoke it.
            if(callbackObj[type]) {
                callbackResult = callbackObj[type](data);
            }
            
            // Pipe whatever is returned from the callback to the 
            // callback's deferred. This enables chaining. 
            if(typeof callbackResult === 'object' && callbackResult.hasOwnProperty('then') && callbackResult.hasOwnProperty('status')) {
                callbackResult.then(function(data) {
                    callbackObj.deferred.resolve(data);
                }, function(data) {
                    callbackObj.deferred.reject(data);
                }, function(data) {
                    callbackObj.deferred.progress(data);
                });
            }
            else {
                callbackObj.deferred[type](callbackResult || undefined);
            }

        }

        // if we are not updating progress, remove all the pending promises
        // as they have been now fulfilled or rejected and they cannot be fullfilled/rejected
        // more than once.
        if(type !== 'progress') {
            pending = [];
        }
        
        return true;
    };


    /**
     * Creates a Promise object
     * @name Promise
     */
    Promise = function(then, status) {
        this.then = then;
        this.status = status;
    };

    promiseProto = Promise.prototype;

    /* 
     * Shorthands for success, fail, and progress.
     * passThrough is used to pipe data through for chaining
     */
    passThrough = function(value) {
        return value;
    };

    promiseProto.success = function(callback, context) {
        return this.then(callback.bind(context), passThrough, passThrough);
    };

    promiseProto.fail = function(callback, context) {
        return this.then(passThrough, callback.bind(context), passThrough);
    };

    promiseProto.progress = function(callback, context) {
        return this.then(passThrough, passThrough, callback.bind(context));
    };

    funcOrEmpty = function(func) {
        if(typeof func !== 'function') {
            return function() {};
        }
        return func;
    };

    CallbackContainer = function(success, error, progress) {
        this.resolve = funcOrEmpty(success);
        this.reject = funcOrEmpty(error);
        this.progress = funcOrEmpty(progress);
        this.deferred = new Deferred();
    };

    /**
     * Creates a Deferred object
     * @class Asynch operation? Make a promise that you'll get that data in the future.
     * @name Deferred
     */
    Deferred = function() {
        // promises that are waiting to be fulfilled
        this.pending = [];

        this._status = 0; // initially pending

        // consumer access to then (does this need anything else?)
        this._promise = new Promise(this.then.bind(this), this.status.bind(this));
    };
    
    Deferred.prototype = /** @lends Deferred.prototype */ {
        /**
         * Gets the status of the deferred. 
         * Possible statuses: pending, resolved, rejected, canceled
         */
        status: function() {
            return statuses[this._status];
        },
        /**
         * Returns the promise object associated with a given deferrred instance. A promise can 
         * observe the deferred, but cannot resolve it.  
         */
        promise: function() {
            return this._promise;
        },
        /**
         * Alerts anyone that is listening for updates on a promise.
         * @param [update] Update data to send to listeners
         */
        progress: function(update) {
            each.call(this, 'progress', update);
            return this._promise;
        },
        /**
         * Called when the deferred task is complete and successful. 
         * @param [value] Data resulting from the deferred task
         */
        resolve: function(value) {
            each.call(this, 'resolve', value);
            if(this._status === 0) {
                this._status = 1;
            }
            return this._promise;
        },
        /**
         * Called when the deferred task errors out.
         * @param [error] Error message to pass to listeners
         */
        reject: function(error) {
            each.call(this, 'reject', error);
            if(this._status === 0) {
                this._status = 2;
            }
            return this._promise;
        },
        /**
         * Used to set callbacks on the deferred. This method is exposed to other code
         * through the promises object. 
         * @param {Function} [success] Invoked when a deferred is resolved
         * @param {Function} [error] Invoked when a deferred is rejected
         * @param {Function} [progress] May be invoked when progress is made on a deferred task
         */
        then: function(success, error, progress) {
            var result, callbackObject;

            callbackObject = new CallbackContainer(success, error, progress);

            if(this._status === 0) {
                this.pending.push(callbackObject);
            }
            else if(this._status === 1 && typeof success === 'function') {
                result = success(this.data);
                if(typeof result === 'object' && result.hasOwnProperty('then') && result.hasOwnProperty('status')) {
                    result.then(function(data) {
                        callbackObject.deferred.resolve(data);
                    }, function(data) {
                        callbackObject.deferred.reject(data);
                    }, function(data) {
                        callbackObject.deferred.progress(data);
                    });
                }
                else {
                    callbackObject.deferred.resolve(result);
                }
            }
            else if(this._status === 2 && typeof error === 'function') {
                result = error(this.data);
                callbackObject.deferred.reject(result);
            }

            return callbackObject.deferred.promise();

        }
    };

    /**
     * Execute code when all deferred tasks have completed. 
     * Accepts regular variables and promises. Returns a new promise.
     * @name when
     * @function
     *
     * @example
     * var promise = Deferred.when(1, asynchRequest());
     * promise.then(function(a, b) {
     *  console.log(a + b); // 1 + data returned from server
     * }
     */
    var when = function() {
        var values, deferred, pending, success, fail;

        values = [].slice.call(arguments);
        deferred = new Deferred();
        pending = 0;

        success = function(value) {
            pending--;

            var i = values.indexOf(this);
            values[i] = value;

            if(pending === 0) {
                deferred.resolve(values);
            }
        };

        fail = function(error) {
            deferred.reject(error);
        };

        values.forEach(function(value) {
            if(value.then) {
                pending++;
            }
        });

        values.forEach(function(value) {
            if(value.then) {
                value.then(success.bind(value), fail);
            }
        });

        return deferred.promise();
    };

    Deferred.when = when;

    exports.Deferred = Deferred;

    return exports;

}())));

},{}],11:[function(require,module,exports){

"use strict";
/**
 * @name defer.Deferred
 * @class Deferred object.
 * <pre>Deferred = require('defer/Deferred');</pre>
 * <p>API based off a subset of <a href="https://github.com/cujojs/when">when.js</a>.
 * <p>This is the interface we provide, however implementation is provided by a 3rd party library such as jett, when or jQuery.<br/>
 * @see <a href="https://github.com/cujojs/when">when.js</a>
 * @see <a href="http://api.jquery.com/category/deferred-object">jQuery Deferred Object</a>
 * @description Deferred constructor. (see example usage below)
 * @example var deferred = new Deferred();
 *
 * // Some async operation
 * setTimeout(function () {
 *     deferred.resolve();
 * },2000);
 *
 * // Pass the promise on
 * return deferred.promise();
 */

function Deferred() {}

Deferred.prototype = {
    /**
     *  @name defer.Deferred#resolve
     *  @description Signals resolution of the deferred (as per when.js spec)
     *  @return {defer.Promise}
     *  @function
     */
    'resolve' : function resolve() {
        this._defer.resolve.apply(this._defer, Array.prototype.slice.call(arguments));
        return this.promise();
    },
    /**
     *  @name defer.Deferred#reject
     *  @description Signals rejection of the deferred (as per when.js spec)
     *  @return {defer.Promise}
     *  @function
     */
    'reject' : function reject() {
        this._defer.reject.apply(this._defer, Array.prototype.slice.call(arguments));
        return this.promise();
    },
    /**
     *  @name defer.Deferred#progress
     *  @description Signals progression of the deferred (as per when.js spec)
     *  @deprecated as of 1.2.0, since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling.
     *  @return {defer.Promise}
     *  @function
     */
    'progress' : function progress() {
        var message = 'ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling';
        console.warn(message);
        this._defer.progress.apply(this._defer, Array.prototype.slice.call(arguments));
        return this.promise();
    },
    /**
     *  @name defer.Deferred#then
     *  @description Attach callbacks to the deferred
     *  @param {Function} success
     *  @param {Function} failure
     *  @param {Function} progress
     *  @return {defer.Promise}
     *  @function
     */
    'then' : function then() {
        this._defer.then.apply(this._defer, Array.prototype.slice.call(arguments));
        return this.promise();
    },
    /**
     *  @name defer.Deferred#promise
     *  @description gets the deferred promise (as per jQuery spec)
     *  @return {defer.Promise}
     *  @function
     */
    'promise' : function promise() {
        return this._defer.promise.apply(this._defer, Array.prototype.slice.call(arguments));
    }

    /**
    * @name defer.Deferred.join
    * @static
    * @description Return a {@link defer.Promise} that will resolve only once all the inputs have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the inputs.
    * @example var joinedPromise = Deferred.join(promiseOrValue1, promiseOrValue2, ...);
    *
    * @example // largerPromise will resolve to the greater of two eventual values
    * var largerPromise = defer.join(promise1, promise2).then(function (values) {
    *     return values[0] > values[1] ? values[0] : values[1];
    * });
    * @function
    * @param {defer.Promise} promiseOrValue1
    * @param {defer.Promise} promiseOrValue2 ...
    * @return {defer.Promise}
    * @see defer.Deferred#all
    */
    /**
    * @name defer.Deferred.all
    * @static
    * @description Return a {@link defer.Promise} that will resolve only once all the items in array have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the items in array.
    * @example var promise = Deferred.all(arrayOfPromisesOrValues);
    * @function
    * @param {Array} arrayOfPromisesOrValues Array of {@link defer.Promise} or values
    * @return {defer.Promise}
    * @see defer.Deferred#join
    */

};

module.exports = Deferred;

},{}],12:[function(require,module,exports){
'use strict';
/**
* @name interface.smartsign
* @inner
* @namespace Provides {@link defer} object using Smartsign's implementation.
* <br/>
* @description Provides {@link defer} object using Smartsign's implementation.
*/
var proto = new (require('./ac-deferred/Deferred'))(),
    SmartsignDeferred = require('smartsign-deferred').Deferred;

function Deferred() {
    this._defer = new SmartsignDeferred();
}

Deferred.prototype = proto;

module.exports.join = function join() {
    return SmartsignDeferred.when.apply(null, [].slice.call(arguments));
};

module.exports.all = function all(arrayOfPromises) {
    return SmartsignDeferred.when.apply(null, arrayOfPromises);
};

module.exports.Deferred = Deferred;
},{"./ac-deferred/Deferred":11,"smartsign-deferred":10}],13:[function(require,module,exports){
'use strict';

/**
 * @module ac-dom-events
 */
var events = {};

/**
 * Cross-browser event handling
 * @param {Element} target Element to listen for event on
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} [useCapture=false]
 * @returns target
 * @name module:ac-dom-events.addEventListener
 * @kind function
 */
events.addEventListener = function (target, type, listener, useCapture) {
	if (target.addEventListener) {
		target.addEventListener(type, listener, useCapture);
	} else if (target.attachEvent) {
		target.attachEvent('on' + type, listener);
	} else {
		target['on' + type] = listener;
	}
	return target;
};

/**
 * Cross-browser event dispatch
 * @param  {Element} target Element that will dispatch the event
 * @param  {String} type   The name of the event to fire
 * @returns {Element}       target
 * @name module:ac-dom-events.dispatchEvent
 * @kind function
 */
events.dispatchEvent = function (target, type) {
	// Expects polyfill for CustomEvent constructor
	if (document.createEvent) {
		target.dispatchEvent(new CustomEvent(type));
	} else {
		target.fireEvent('on' + type, document.createEventObject());
	}
	return target;
};

/**
 * Cross-browser event removing
 * @param {Element} target Element to listen for event on
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} [useCapture=false]
 * @returns target
 * @name module:ac-dom-events.removeEventListener
 * @kind function
 */
events.removeEventListener = function (target, type, listener, useCapture) {
	if (target.removeEventListener) {
		target.removeEventListener(type, listener, useCapture);
	} else {
		target.detachEvent('on' + type, listener);
	}
	return target;
};

var prefixMatch = /^(webkit|moz|ms|o)/i;

/**
 * Sets all the vendor event listeners of type on element.
 * @param {Element} target Element for which to set the listener upon
 * @param {String} type String representing the event type to listen for, e.g. animationEnd, webkitAnimationEnd, etc... IMPORTANT: This value is expected to be a string in camelCase.
 * @param {Function} listener Object that receives a notification when an event of the specified type occurs.
 * @param {Boolean} [useCapture=false] If true, useCapture indicates that the user wishes to initiate capture.
 * @returns target
 * @name module:ac-dom-events.addVendorPrefixEventListener
 * @kind function
 */
events.addVendorPrefixEventListener = function (target, type, listener, useCapture) {
	if (prefixMatch.test(type)) {
		type = type.replace(prefixMatch, '');
	} else {
		type = type.charAt(0).toUpperCase() + type.slice(1);
	}

	// To avoid adding the same event twice, we need to sniff the user agent.
	// Once we've confirmed a browser supports the generic event name, we'll
	// change this if to be < that build.
	if (/WebKit/i.test(window.navigator.userAgent)) {
		return events.addEventListener(target, 'webkit' + type, listener, useCapture);
	} else if (/Opera/i.test(window.navigator.userAgent)) {
		return events.addEventListener(target, 'O' + type, listener, useCapture);
	} else if (/Gecko/i.test(window.navigator.userAgent)) {
		return events.addEventListener(target, type.toLowerCase(), listener, useCapture);
	} else {
		type = type.charAt(0).toLowerCase() + type.slice(1);
		return events.addEventListener(target, type, listener, useCapture);
	}
};

/**
 * Removes all the vendor event listeners of type on an element.
 * @param {Element} target Element for which to remove the listener from
 * @param {String} type String representing the event type to listen for, e.g. animationEnd, webkitAnimationEnd, etc... IMPORTANT: This value is expected to be a string in camelCase.
 * @param {Function} listener Object that receives a notification when an event of the specified type occurs.
 * @param {Boolean} [useCapture=false] If true, useCapture indicates that the user wishes to initiate capture.
 * @returns target
 * @name module:ac-dom-events.removeVendorPrefixEventListener
 * @kind function
 */
events.removeVendorPrefixEventListener = function (target, type, listener, useCapture) {
	if (prefixMatch.test(type)) {
		type = type.replace(prefixMatch, '');
	} else {
		type = type.charAt(0).toUpperCase() + type.slice(1);
	}

	events.removeEventListener(target, 'webkit' + type, listener, useCapture);
	events.removeEventListener(target, 'O' + type, listener, useCapture);
	events.removeEventListener(target, type.toLowerCase(), listener, useCapture);

	type = type.charAt(0).toLowerCase() + type.slice(1);
	return events.removeEventListener(target, type, listener, useCapture);
};

/**
 * Stop propagation of event and prevent default behavior.
 * @param {Event} evt The event to stop
 * @name module:ac-dom-events.stop
 * @kind function
 */
events.stop = function (evt) {
	if (!evt) {
		evt = window.event;
	}

	if (evt.stopPropagation) {
		evt.stopPropagation();
	} else {
		evt.cancelBubble = true;
	}

	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.stopped = true;
	evt.returnValue = false;
};

/**
 * Cross-browser event target getter
 * @param {Event} evt
 * @name module:ac-dom-events.target
 * @kind function
 */
events.target = function (evt) {
	return (typeof evt.target !== 'undefined') ? evt.target : evt.srcElement;
};

module.exports = events;

},{}],14:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.COMMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for Comment
 */
module.exports = 8;

},{}],15:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.DOCUMENT_FRAGMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for DocumentFragment
 */
module.exports = 11;

},{}],16:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.DOCUMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for Document
 */
module.exports = 9;

},{}],17:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.DOCUMENT_TYPE_NODE
 *
 * @constant
 *
 * @desc nodeType value for DocumentType
 */
module.exports = 10;

},{}],18:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.ELEMENT_NODE
 *
 * @constant
 *
 * @desc nodeType value for Element
 */
module.exports = 1;

},{}],19:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.TEXT_NODE
 *
 * @constant
 *
 * @desc nodeType value for TextNode
 */
module.exports = 3;

},{}],20:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.createDocumentFragment
 *
 * @function
 *
 * @desc Create a DocumentFragment with optional HTML contents
 *
 * @param {String} [html]
 *        Optional inner HTML of the DocumentFragment
 *
 * @returns {DocumentFragment} A new DocumentFragment
 */
module.exports = function createDocumentFragment(html) {
	var fragment = document.createDocumentFragment();
	var div;

	if (html) {
		div = document.createElement('div');
		div.innerHTML = html;

		while (div.firstChild) {
			fragment.appendChild(div.firstChild);
		}
	}

	return fragment;
};

},{}],21:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('ac-polyfills/Array/prototype.slice');
require('ac-polyfills/Array/prototype.filter');

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var ELEMENT_NODE = require('./ELEMENT_NODE');

/**
 * @name module:ac-dom-nodes.filterByNodeType
 *
 * @function
 *
 * @desc Filters an Array of Nodes by nodeType.
 *
 * @param {Array|NodeList} nodes
 *
 * @param {Integer} [nodeType={@link module:ac-dom-nodes.ELEMENT_NODE ELEMENT_NODE}]
 *
 * @returns {Array} An new Array of Nodes of the specified nodeType
 */
module.exports = function filterByNodeType(nodes, nodeType) {
	nodeType = nodeType || ELEMENT_NODE;
	nodes = Array.prototype.slice.call(nodes);

	return nodes.filter(function (node) {
		return isNodeType(node, nodeType);
	});
};

},{"./ELEMENT_NODE":18,"./internal/isNodeType":29,"ac-polyfills/Array/prototype.filter":39,"ac-polyfills/Array/prototype.slice":41}],22:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.hasAttribute
 *
 * @function
 *
 * @desc Test whether or not the Element has the specified attribute or not.
 *
 * @param {Element} el
 *
 * @param {String} attr
 *
 * @returns {Boolean}
 */
module.exports = function hasAttribute(el, attr) {
 	if ('hasAttribute' in el) {
 		return el.hasAttribute(attr);
 	}

 	return (el.attributes.getNamedItem(attr) !== null);
};

},{}],23:[function(require,module,exports){
/**
 * Utility methods dealing with the DOM
 * @module ac-dom-nodes
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	createDocumentFragment: require('./createDocumentFragment'),
	filterByNodeType: require('./filterByNodeType'),
	hasAttribute: require('./hasAttribute'),
	indexOf: require('./indexOf'),
	insertAfter: require('./insertAfter'),
	insertBefore: require('./insertBefore'),
	insertFirstChild: require('./insertFirstChild'),
	insertLastChild: require('./insertLastChild'),
	isComment: require('./isComment'),
	isDocument: require('./isDocument'),
	isDocumentFragment: require('./isDocumentFragment'),
	isDocumentType: require('./isDocumentType'),
	isElement: require('./isElement'),
	isNode: require('./isNode'),
	isNodeList: require('./isNodeList'),
	isTextNode: require('./isTextNode'),
	remove: require('./remove'),
	replace: require('./replace'),

	COMMENT_NODE: require('./COMMENT_NODE'),
	DOCUMENT_FRAGMENT_NODE: require('./DOCUMENT_FRAGMENT_NODE'),
	DOCUMENT_NODE: require('./DOCUMENT_NODE'),
	DOCUMENT_TYPE_NODE: require('./DOCUMENT_TYPE_NODE'),
	ELEMENT_NODE: require('./ELEMENT_NODE'),
	TEXT_NODE: require('./TEXT_NODE')
};

},{"./COMMENT_NODE":14,"./DOCUMENT_FRAGMENT_NODE":15,"./DOCUMENT_NODE":16,"./DOCUMENT_TYPE_NODE":17,"./ELEMENT_NODE":18,"./TEXT_NODE":19,"./createDocumentFragment":20,"./filterByNodeType":21,"./hasAttribute":22,"./indexOf":24,"./insertAfter":25,"./insertBefore":26,"./insertFirstChild":27,"./insertLastChild":28,"./isComment":31,"./isDocument":32,"./isDocumentFragment":33,"./isDocumentType":34,"./isElement":35,"./isNode":36,"./isNodeList":37,"./isTextNode":38,"./remove":42,"./replace":43}],24:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('ac-polyfills/Array/prototype.indexOf');
require('ac-polyfills/Array/prototype.slice');

/** @ignore */
var validate = require('./internal/validate');
var filterByNodeType = require('./filterByNodeType');

/**
 * @name module:ac-dom-nodes.indexOf
 *
 * @function
 *
 * @desc Get the index of a Node amongst it's siblings
 *
 * @param {Node} node
 *
 * @param {Integer|Boolean} [nodeType={@link module:ac-dom-nodes.ELEMENT_NODE ELEMENT_NODE}]
 *                  A nodeType to filter by. Set to `false` for no filter.
 *
 * @returns {Number} The index of the Node, or -1 if not in the current nodeType filter
 */
module.exports = function indexOf(node, nodeType) {
	var parentNode = node.parentNode;
	var nodes;

	if (!parentNode) {
		return 0;
	}

	nodes = parentNode.childNodes;

	if (nodeType !== false) {
		nodes = filterByNodeType(nodes, nodeType);
	} else {
		nodes = Array.prototype.slice.call(nodes);
	}

	return nodes.indexOf(node);
};

},{"./filterByNodeType":21,"./internal/validate":30,"ac-polyfills/Array/prototype.indexOf":40,"ac-polyfills/Array/prototype.slice":41}],25:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.insertAfter
 *
 * @function
 *
 * @desc Insert a Node after a specified target
 *
 * @param {Node} node
 *        The Node to insert
 *
 * @param {Node} target
 *        The target Node
 *
 * @returns {Node} The inserted Node
 */
module.exports = function insertAfter(node, target) {
	validate.insertNode(node, true, 'insertAfter');
	validate.childNode(target, true, 'insertAfter');
	validate.hasParentNode(target, 'insertAfter');

	if (!target.nextSibling) {
		return target.parentNode.appendChild(node);
	}

	return target.parentNode.insertBefore(node, target.nextSibling);
};

},{"./internal/validate":30}],26:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.insertBefore
 *
 * @function
 *
 * @desc Insert a Node before a specified target
 *
 * @param {Node} node
 *        The Node to insert
 *
 * @param {Node} target
 *        The target Node
 *
 * @returns {Node} The inserted Node
 */
module.exports = function insertBefore(node, target) {
	validate.insertNode(node, true, 'insertBefore');
	validate.childNode(target, true, 'insertBefore');
	validate.hasParentNode(target, 'insertBefore');

	return target.parentNode.insertBefore(node, target);
};

},{"./internal/validate":30}],27:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.insertFirstChild
 *
 * @function
 *
 * @desc Insert a Node as the first child of a specified target
 *
 * @param {Node} node
 *        The Node to insert
 *
 * @param {Node} target
 *        The target Node
 *
 * @returns {Node} The inserted Node
 */
module.exports = function insertFirstChild(node, target) {
	validate.insertNode(node, true, 'insertFirstChild');
	validate.parentNode(target, true, 'insertFirstChild');

	if (!target.firstChild) {
		return target.appendChild(node);
	}

	return target.insertBefore(node, target.firstChild);
};

},{"./internal/validate":30}],28:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.insertLastChild
 *
 * @function
 *
 * @desc Insert a Node as the last child of a specified target
 *
 * @param {Node} node
 *        The Node to insert
 *
 * @param {Node} target
 *        The target Node
 *
 * @returns {Node} The inserted Node
 */
module.exports = function insertLastChild(node, target) {
	validate.insertNode(node, true, 'insertLastChild');
	validate.parentNode(target, true, 'insertLastChild');

	return target.appendChild(node);
};

},{"./internal/validate":30}],29:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNode = require('../isNode');

module.exports = function isNodeType(node, nodeType) {
	if (!isNode(node)) {
		return false;
	}

	if (typeof nodeType === 'number') {
		return (node.nodeType === nodeType);
	}

	return (nodeType.indexOf(node.nodeType) !== -1);
};

},{"../isNode":36}],30:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./isNodeType');
var COMMENT_NODE = require('../COMMENT_NODE');
var DOCUMENT_FRAGMENT_NODE = require('../DOCUMENT_FRAGMENT_NODE');
var ELEMENT_NODE = require('../ELEMENT_NODE');
var TEXT_NODE = require('../TEXT_NODE');

/** @ignore */
var VALID_INSERT_NODE = [
	ELEMENT_NODE,
	TEXT_NODE,
	COMMENT_NODE,
	DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_INSERT_NODE = ' must be an Element, TextNode, Comment, or Document Fragment';

/** @ignore */
var VALID_CHILD_NODE = [
	ELEMENT_NODE,
	TEXT_NODE,
	COMMENT_NODE
];

/** @ignore */
var ERR_INVALID_CHILD_NODE = ' must be an Element, TextNode, or Comment';

/** @ignore */
var VALID_PARENT_NODE = [
	ELEMENT_NODE,
	DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_PARENT_NODE = ' must be an Element, or Document Fragment';

/** @ignore */
var ERR_NO_PARENT_NODE = ' must have a parentNode';

module.exports = {

	/** @ignore */
	parentNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'target';

		if ((node || required) && !isNodeType(node, VALID_PARENT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_PARENT_NODE);
		}
	},

	/** @ignore */
	childNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'target';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_CHILD_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_CHILD_NODE);
		}
	},

	/** @ignore */
	insertNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_INSERT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_INSERT_NODE);
		}
	},

	/** @ignore */
	hasParentNode: function (node, funcName, paramName) {
		paramName = paramName || 'target';

		if (!node.parentNode) {
			throw new TypeError(funcName + ': ' + paramName + ERR_NO_PARENT_NODE);
		}
	}

};

},{"../COMMENT_NODE":14,"../DOCUMENT_FRAGMENT_NODE":15,"../ELEMENT_NODE":18,"../TEXT_NODE":19,"./isNodeType":29}],31:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var COMMENT_NODE = require('./COMMENT_NODE');

/**
 * @name module:ac-dom-nodes.isComment
 *
 * @function
 *
 * @desc Test whether or not an Object is a Comment.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isComment(obj) {
 	return isNodeType(obj, COMMENT_NODE);
};

},{"./COMMENT_NODE":14,"./internal/isNodeType":29}],32:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var DOCUMENT_NODE = require('./DOCUMENT_NODE');

/**
 * @name module:ac-dom-nodes.isDocument
 *
 * @function
 *
 * @desc Test whether or not an Object is a Document.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isDocument(obj) {
 	return isNodeType(obj, DOCUMENT_NODE);
};

},{"./DOCUMENT_NODE":16,"./internal/isNodeType":29}],33:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var DOCUMENT_FRAGMENT_NODE = require('./DOCUMENT_FRAGMENT_NODE');

/**
 * @name module:ac-dom-nodes.isDocumentFragment
 *
 * @function
 *
 * @desc Test whether or not an Object is a DocumentFragment.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isDocumentFragment(obj) {
 	return isNodeType(obj, DOCUMENT_FRAGMENT_NODE);
};

},{"./DOCUMENT_FRAGMENT_NODE":15,"./internal/isNodeType":29}],34:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var DOCUMENT_TYPE_NODE = require('./DOCUMENT_TYPE_NODE');

/**
 * @name module:ac-dom-nodes.isDocumentType
 *
 * @function
 *
 * @desc Test whether or not an Object is a DocumentType.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isDocumentType (obj) {
 	return isNodeType(obj, DOCUMENT_TYPE_NODE);
};

},{"./DOCUMENT_TYPE_NODE":17,"./internal/isNodeType":29}],35:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var ELEMENT_NODE = require('./ELEMENT_NODE');

/**
 * @name module:ac-dom-nodes.isElement
 *
 * @function
 *
 * @desc Test whether or not an Object is an Element.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isElement (obj) {
 	return isNodeType(obj, ELEMENT_NODE);
};

},{"./ELEMENT_NODE":18,"./internal/isNodeType":29}],36:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-dom-nodes.isNode
 *
 * @function
 *
 * @desc Test whether or not an Object is a Node.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isNode (obj) {
 	return !!(obj && obj.nodeType);
};

},{}],37:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var nodeListToStringPattern = /^\[object (HTMLCollection|NodeList|Object)\]$/;

/**
 * @name module:ac-dom-nodes.isNodeList
 *
 * @function
 *
 * @desc Test whether or not an Object is a NodeList.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isNodeList (obj) {
 	if (!obj) {
 		return false;
 	}

 	// not Array-like
 	if (typeof obj.length !== 'number') {
 		return false;
 	}

 	// Array-like, but not a NodeList
 	if (typeof obj[0] === 'object' && (!obj[0] || !obj[0].nodeType)) {
 		return false;
 	}

 	return nodeListToStringPattern.test(Object.prototype.toString.call(obj));
};

},{}],38:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isNodeType = require('./internal/isNodeType');
var TEXT_NODE = require('./TEXT_NODE');

/**
 * @name module:ac-dom-nodes.isTextNode
 *
 * @function
 *
 * @desc Test whether or not an Object is a TextNode.
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 */
module.exports = function isTextNode (obj) {
 	return isNodeType(obj, TEXT_NODE);
};

},{"./TEXT_NODE":19,"./internal/isNodeType":29}],39:[function(require,module,exports){
if (!Array.prototype.filter) {
/**
	Tests all elements in an array and returns a new array filled with elements that pass the test.
	@param {Function} callback Function to test against. The callback must return a boolean value.
	@param {Object} thisObj Object to use as `this` when executing the callback.
	@returns {Array} Returns a new array populated with values from the original array that passed the test implemented by the provided function.
	@reference https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
*/
	Array.prototype.filter = function filter(callback, thisObj) {
		var arrayObject = Object(this);
		// Mimic ES5 spec call for interanl method ToUint32()
		var len = arrayObject.length >>> 0;
		var i;
		var results = [];

		// Callback must be a callable function
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		for (i = 0; i < len; i += 1) {
			if (i in arrayObject && callback.call(thisObj, arrayObject[i], i, arrayObject)) {
				results.push(arrayObject[i]);
			}
		}

		return results;
	};
}
},{}],40:[function(require,module,exports){
if (!Array.prototype.indexOf) {
/**
	Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
	@param searchElement {Object} Element to locate in the array.
	@param fromIndex {Number} Optional; the index at which to begin the search. Defaults to 0, i.e. the whole array will be searched. If the index is greater than or equal to the length of the array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as the offset from the end of the array. Note that even when the index is negative, the array is still searched from front to back. If the calculated index is less than 0, the whole array will be searched.
*/
	Array.prototype.indexOf = function indexOf(searchElement, fromIndex) {
		var startIndex = fromIndex || 0;
		var currentIndex = 0;

		if (startIndex < 0) {
			startIndex = this.length + fromIndex - 1;
			if (startIndex < 0) {
				throw 'Wrapped past beginning of array while looking up a negative start index.';
			}
		}

		for (currentIndex = 0; currentIndex < this.length; currentIndex++) {
			if (this[currentIndex] === searchElement) {
				return currentIndex;
			}
		}

		return (-1);
	};
}
},{}],41:[function(require,module,exports){
/**
 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
 * (technically, since host objects have been implementation-dependent,
 * at least before ES6, IE hasn't needed to work this way).
 * Also works on strings, fixes IE < 9 to allow an explicit undefined
 * for the 2nd argument (as in Firefox), and prevents errors when
 * called on other DOM objects.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */
(function () {
    'use strict';
    var _slice = Array.prototype.slice;

    try {
        // Can't be used with DOM elements in IE < 9
        _slice.call(document.documentElement);
    } catch (e) { // Fails in IE < 9
        // This will work for genuine arrays, array-like objects, 
        // NamedNodeMap (attributes, entities, notations),
        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
        // and will not fail on other DOM objects (as do DOM elements in IE < 9)
        Array.prototype.slice = function (begin, end) {
            // IE < 9 gets unhappy with an undefined end argument
            end = (typeof end !== 'undefined') ? end : this.length;

            // For native Array objects, we use the native slice function
            if (Object.prototype.toString.call(this) === '[object Array]'){
                return _slice.call(this, begin, end); 
            }

            // For array like object we handle it ourselves.
            var i, cloned = [],
                size, len = this.length;

            // Handle negative value for "begin"
            var start = begin || 0;
            start = (start >= 0) ? start: len + start;

            // Handle negative value for "end"
            var upTo = (end) ? end : len;
            if (end < 0) {
                upTo = len + end;
            }

            // Actual expected size of the slice
            size = upTo - start;

            if (size > 0) {
                cloned = new Array(size);
                if (this.charAt) {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this.charAt(start + i);
                    }
                } else {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this[start + i];
                    }
                }
            }

            return cloned;
        };
    }
}());
},{}],42:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.remove
 *
 * @function
 *
 * @desc Remove a Node from it's parentNode
 *
 * @param {Node} node
 *        The Node to remove
 *
 * @returns {Node} The removed Node
 */
module.exports = function remove (node) {
	validate.childNode(node, true, 'remove');

	if (!node.parentNode) {
		return node;
	}

	return node.parentNode.removeChild(node);
};

},{"./internal/validate":30}],43:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-nodes.replace
 *
 * @function
 *
 * @desc Replace one Node with another
 *
 * @param {Node} newNode
 *        The Node to be inserted
 *
 * @param {Node} oldNode
 *        The Node to be replaced
 *
 * @returns {Node} The replaced Node
 */
module.exports = function replace (newNode, oldNode) {
	validate.insertNode(newNode, true, 'insertFirstChild', 'newNode');
	validate.childNode(oldNode, true, 'insertFirstChild', 'oldNode');
	validate.hasParentNode(oldNode, 'insertFirstChild', 'oldNode');

	return oldNode.parentNode.replaceChild(newNode, oldNode);
};

},{"./internal/validate":30}],44:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.ancestor
 *
 * @function
 *
 * @desc Returns the closest Element that is an ancestor of the specified Node, matching an optional CSS selector, up to and including the body.
 *
 * @param {Node} node
 *        The child Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter ancestor Elements by.
 *
 * @param {Boolean} [inclusive=false]
 *        `true` to include the target node in the potential results, otherwise `false`
 *
 * @returns {Element|null} Closest matching ancestor Element, or `null` if no matches are found.
 */
module.exports = function ancestor(node, selector, inclusive) {
 	validate.childNode(node, true, 'ancestors');
 	validate.selector(selector, false, 'ancestors');

 	if (inclusive && isElement(node) && (!selector || matchesSelector(node, selector))) {
 		return node;
 	}

 	if (node !== document.body) {
 		while ((node = node.parentNode) && isElement(node)) {
 			if (!selector || matchesSelector(node, selector)) {
 				return node;
 			}

 			if (node === document.body) {
 				break;
 			}
 		}
 	}

 	return null;
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-dom-nodes/isElement":35}],45:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.ancestors
 *
 * @function
 *
 * @desc Returns an Array of Elements that are ancestors of the specified Node, matching an optional CSS selector, up to and including the body.
 *
 * @param {Node} node
 *        The child Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter ancestor Elements by.
 *
 * @param {Boolean} [inclusive=false]
 *        `true` to include the target node in the potential results, otherwise `false`
 *
 * @returns {Element[]} Array of matching ancestor Elements, with the closest ancestor first.
 */
module.exports = function ancestors(node, selector, inclusive) {
 	var els = [];

 	validate.childNode(node, true, 'ancestors');
 	validate.selector(selector, false, 'ancestors');

 	if (inclusive && isElement(node) && (!selector || matchesSelector(node, selector))) {
 		els.push(node);
 	}

 	if (node !== document.body) {
	 	while ((node = node.parentNode) && isElement(node)) {
	 		if (!selector || matchesSelector(node, selector)) {
	 			els.push(node);
	 		}

	 		if (node === document.body) {
	 			break;
	 		}
	 	}
	}

 	return els;
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-dom-nodes/isElement":35}],46:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var filterByNodeType = require('ac-dom-nodes/filterByNodeType');
var filterBySelector = require('./filterBySelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.children
 *
 * @function
 *
 * @desc Returns an Array of Elements that are direct children of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The parent Element, Document, or Document Fragment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter children Elements by.
 *
 * @returns {Element[]} Array of matching child Elements, in DOM order.
 */
module.exports = function children(node, selector) {
	var els;

	validate.parentNode(node, true, 'children');
	validate.selector(selector, false, 'children');

	els = node.children || node.childNodes;
	els = filterByNodeType(els);

	if (selector) {
		els = filterBySelector(els, selector);
	}

	return els;
};

},{"./filterBySelector":47,"./internal/validate":51,"ac-dom-nodes/filterByNodeType":21}],47:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('ac-polyfills/Array/prototype.slice');
require('ac-polyfills/Array/prototype.filter');

/** @ignore */
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.filterBySelector
 *
 * @function
 *
 * @desc Filter an Array of Elements by a given CSS selector.
 *
 * @param {Node[]|NodeList} nodes
 *        The Elements to be filtered.
 *
 * @param {String} selector
 *        CSS selectors, separated by commas, to check Elements against.
 *
 * @returns {Element[]} A new Array of matching Elements.
 */
module.exports = function filterBySelector(nodes, selector) {
	validate.selector(selector, true, 'filterBySelector');

	nodes = Array.prototype.slice.call(nodes);

	return nodes.filter(function (el) {
		return matchesSelector(el, selector);
	});
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-polyfills/Array/prototype.filter":56,"ac-polyfills/Array/prototype.slice":59}],48:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var children = require('./children');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.firstChild
 *
 * @function
 *
 * @desc Returns the first Element that is a direct child of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The parent Element, Document, or Document Fragment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter children Elements by.
 *
 * @returns {Element|null} First matching child Element, or `null` if no matches are found.
 */
module.exports = function firstChild(node, selector) {
	var els;

	validate.parentNode(node, true, 'firstChild');
	validate.selector(selector, false, 'firstChild');

	if (node.firstElementChild && !selector) {
		return node.firstElementChild;
	}

	els = children(node, selector);

	if (els.length) {
		return els[0];
	}

	return null;
};

},{"./children":46,"./internal/validate":51}],49:[function(require,module,exports){
/**
 * @module ac-dom-traversal
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	ancestor: require('./ancestor'),
	ancestors: require('./ancestors'),
	children: require('./children'),
	filterBySelector: require('./filterBySelector'),
	firstChild: require('./firstChild'),
	lastChild: require('./lastChild'),
	matchesSelector: require('./matchesSelector'),
	nextSibling: require('./nextSibling'),
	nextSiblings: require('./nextSiblings'),
	previousSibling: require('./previousSibling'),
	previousSiblings: require('./previousSiblings'),
	querySelector: require('./querySelector'),
	querySelectorAll: require('./querySelectorAll'),
	siblings: require('./siblings')
};

},{"./ancestor":44,"./ancestors":45,"./children":46,"./filterBySelector":47,"./firstChild":48,"./lastChild":52,"./matchesSelector":53,"./nextSibling":54,"./nextSiblings":55,"./previousSibling":60,"./previousSiblings":61,"./querySelector":62,"./querySelectorAll":63,"./siblings":66}],50:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
module.exports = window.Element ? (function (proto) {
	return proto.matches ||
		proto.matchesSelector ||
		proto.webkitMatchesSelector ||
		proto.mozMatchesSelector ||
		proto.msMatchesSelector ||
		proto.oMatchesSelector;
}(Element.prototype)) : null;

},{}],51:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('ac-polyfills/Array/prototype.indexOf');

/** @ignore */
var isNode = require('ac-dom-nodes/isNode');
var COMMENT_NODE = require('ac-dom-nodes/COMMENT_NODE');
var DOCUMENT_FRAGMENT_NODE = require('ac-dom-nodes/DOCUMENT_FRAGMENT_NODE');
var DOCUMENT_NODE = require('ac-dom-nodes/DOCUMENT_NODE');
var ELEMENT_NODE = require('ac-dom-nodes/ELEMENT_NODE');
var TEXT_NODE = require('ac-dom-nodes/TEXT_NODE');

/** @ignore */
var isNodeType = function (node, nodeType) {
	if (!isNode(node)) {
		return false;
	}

	if (typeof nodeType === 'number') {
		return (node.nodeType === nodeType);
	}

	return (nodeType.indexOf(node.nodeType) !== -1);
};

/** @ignore */
var VALID_PARENT_NODE = [
	ELEMENT_NODE,
	DOCUMENT_NODE,
	DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_PARENT_NODE = ' must be an Element, Document, or Document Fragment';

/** @ignore */
var VALID_CHILD_NODE = [
	ELEMENT_NODE,
	TEXT_NODE,
	COMMENT_NODE
];

/** @ignore */
var ERR_INVALID_CHILD_NODE = ' must be an Element, TextNode, or Comment';

/** @ignore */
var ERR_INVALID_SELECTOR = ' must be a string';

module.exports = {

	/** @ignore */
	parentNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if ((node || required) && !isNodeType(node, VALID_PARENT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_PARENT_NODE);
		}
	},

	/** @ignore */
	childNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_CHILD_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_CHILD_NODE);
		}
	},

	/** @ignore */
	selector: function (selector, required, funcName, paramName) {
		paramName = paramName || 'selector';

		if ((selector || required) && typeof selector !== 'string') {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_SELECTOR);
		}
	}

};

},{"ac-dom-nodes/COMMENT_NODE":14,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":15,"ac-dom-nodes/DOCUMENT_NODE":16,"ac-dom-nodes/ELEMENT_NODE":18,"ac-dom-nodes/TEXT_NODE":19,"ac-dom-nodes/isNode":36,"ac-polyfills/Array/prototype.indexOf":58}],52:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var children = require('./children');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.lastChild
 *
 * @function
 *
 * @desc Returns the last Element that is a direct child of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The parent Element, Document, or Document Fragment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter children Elements by.
 *
 * @returns {Element|null} Last matching child Element, or `null` if no matches are found.
 */
module.exports = function lastChild(node, selector) {
	var els;

	validate.parentNode(node, true, 'lastChild');
	validate.selector(selector, false, 'lastChild');

	if (node.lastElementChild && !selector) {
		return node.lastElementChild;
	}

	els = children(node, selector);

	if (els.length) {
		return els[els.length - 1];
	}

	return null;
};

},{"./children":46,"./internal/validate":51}],53:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var nativeMatches = require('./internal/nativeMatches');
var validate = require('./internal/validate');
var sizzle = require('./vendor/sizzle/sizzle');

/**
 * @name module:ac-dom-traversal.matchesSelector
 *
 * @function
 *
 * @desc Returns whether or not an Element matches a given CSS selector.
 *
 * @param {Node} node
 *        The Element to be checked.
 *
 * @param {String} selector
 *        CSS selectors, separated by commas, to check Element against.
 *
 * @returns {Boolean} `true` if the Element matches the selector, otherwise `false`
 */
module.exports = function matchesSelector(node, selector) {
 	validate.selector(selector, true, 'matchesSelector');

 	if (!isElement(node)) {
 		return false;
 	}

 	if (!nativeMatches) {
 		return sizzle.matchesSelector(node, selector);
 	}

	return nativeMatches.call(node, selector);
};

},{"./internal/nativeMatches":50,"./internal/validate":51,"./vendor/sizzle/sizzle":67,"ac-dom-nodes/isElement":35}],54:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.nextSibling
 *
 * @function
 *
 * @desc Returns the closest sibling Element that follows the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element|null} Closest matching sibling Element, or `null` if no matches are found.
 */
module.exports = function nextSibling(node, selector) {
 	validate.childNode(node, true, 'nextSibling');
 	validate.selector(selector, false, 'nextSibling');

	if (node.nextElementSibling && !selector) {
		return node.nextElementSibling;
	}

	while (node = node.nextSibling) {
		if (isElement(node)) {
			if (!selector || matchesSelector(node, selector)) {
				return node;
			}
		}
	}

	return null;
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-dom-nodes/isElement":35}],55:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.nextSiblings
 *
 * @function
 *
 * @desc Returns an Array of sibling Elements that follow the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element[]} Array of matching sibling Elements, in DOM order.
 */
module.exports = function nextSiblings(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'nextSiblings');
 	validate.selector(selector, false, 'nextSiblings');

 	while (node = node.nextSibling) {
 		if (isElement(node)) {
 			if (!selector || matchesSelector(node, selector)) {
 				els.push(node);
 			}
 		}
 	}

 	return els;
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-dom-nodes/isElement":35}],56:[function(require,module,exports){
module.exports=require(39)
},{}],57:[function(require,module,exports){
if (!Array.prototype.forEach) {
/**
	Executes a provided function once per array element.
	@param callback {Function} Object to test against.
	@param thisObj {Object} What the callback method is bound to.
*/
	Array.prototype.forEach = function forEach(callback, thisObj) {
		var arrayObject = Object(this);
		// Mimic ES5 spec call for interanl method ToUint32()
		var i;
		var currentValue;

		if (typeof callback !== 'function') {
			throw new TypeError('No function object passed to forEach.');
		}

		for (i = 0; i < this.length; i += 1) {
			currentValue = arrayObject[i];
			callback.call(thisObj, currentValue, i, arrayObject);
		}
	};
}
},{}],58:[function(require,module,exports){
module.exports=require(40)
},{}],59:[function(require,module,exports){
module.exports=require(41)
},{}],60:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.previousSibling
 *
 * @function
 *
 * @desc Returns the closest sibling Element that preceeds the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element|null} Closest matching sibling Element, or `null` if no matches are found.
 */
module.exports = function previousSibling(node, selector) {
 	validate.childNode(node, true, 'previousSibling');
 	validate.selector(selector, false, 'previousSibling');

	if (node.previousElementSibling && !selector) {
		return node.previousElementSibling;
	}

	while (node = node.previousSibling) {
		if (isElement(node)) {
			if (!selector || matchesSelector(node, selector)) {
				return node;
			}
		}
	}

	return null;
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-dom-nodes/isElement":35}],61:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var isElement = require('ac-dom-nodes/isElement');
var matchesSelector = require('./matchesSelector');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.previousSiblings
 *
 * @function
 *
 * @desc Returns an Array of sibling Elements that preceed the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element[]} Array of matching sibling Elements, in DOM order.
 */
module.exports = function previousSiblings(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'previousSiblings');
 	validate.selector(selector, false, 'previousSiblings');

 	while (node = node.previousSibling) {
 		if (isElement(node)) {
 			if (!selector || matchesSelector(node, selector)) {
 				els.push(node);
 			}
 		}
 	}

 	return els.reverse();
};

},{"./internal/validate":51,"./matchesSelector":53,"ac-dom-nodes/isElement":35}],62:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./internal/validate');
var querySelectorShim = require('./shims/querySelector');

/**
 * @name module:ac-dom-traversal.querySelector
 *
 * @function
 *
 * @desc Returns the first Element within the specified context that match given CSS selector(s).
 *
 * @param {String} selector
 *        One or more CSS selectors separated by commas.
 *
 * @param {Node} [context=document]
 *        An optional ParentNode to scope the selector to. Defaults to `document`.
 *
 * @returns {Element|null} First matching Element, or `null` if no matches are found.
 */
module.exports = function querySelector(selector, context) {
	context = context || document;

	validate.parentNode(context, true, 'querySelector', 'context');
	validate.selector(selector, true, 'querySelector');

	if (!context.querySelector) {
		return querySelectorShim(selector, context);
	}

	return context.querySelector(selector);
};

},{"./internal/validate":51,"./shims/querySelector":64}],63:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('ac-polyfills/Array/prototype.slice');

/** @ignore */
var validate = require('./internal/validate');
var querySelectorAllShim = require('./shims/querySelectorAll');

/**
 * @name module:ac-dom-traversal.querySelectorAll
 *
 * @function
 *
 * @desc Returns an Array of Elements within the specified context that match given CSS selector(s).
 *
 * @param {String} selector
 *        One or more CSS selectors separated by commas.
 *
 * @param {Node} [context=document]
 *        An optional ParentNode to scope the selector to. Defaults to `document`.
 *
 * @returns {Element[]} Array of matching Elements
 */
module.exports = function querySelectorAll(selector, context) {
	context = context || document;

	validate.parentNode(context, true, 'querySelectorAll', 'context');
	validate.selector(selector, true, 'querySelectorAll');

	if (!context.querySelectorAll) {
		return querySelectorAllShim(selector, context);
	}

	return Array.prototype.slice.call(context.querySelectorAll(selector));
};

},{"./internal/validate":51,"./shims/querySelectorAll":65,"ac-polyfills/Array/prototype.slice":59}],64:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var querySelectorAll = require('./querySelectorAll');

/**
 * module:ac-dom-traversal.querySelector shim for IE < 8
 * Fallback to sizzle needed due to lack of native querySelector
 */
module.exports = function querySelector(selector, context) {
	var allResults = querySelectorAll(selector, context);

	return allResults.length ? allResults[0] : null;
};

},{"./querySelectorAll":65}],65:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

require('ac-polyfills/Array/prototype.forEach');

/** @ignore */
var sizzle = require('../vendor/sizzle/sizzle');
var getChildren = require('../children');
var isDocumentFragment = require('ac-dom-nodes/isDocumentFragment');

/**
 * module:ac-dom-traversal.querySelectorAll shim for IE < 8
 * Fallback to sizzle needed due to lack of native querySelectorAll
 */
module.exports = function querySelectorAll(selector, context) {
	var children;
	var matches;

	if (isDocumentFragment(context)) {
		children = getChildren(context);
		matches = [];

		children.forEach(function (node) {
			var childMatches;

			// check the child node
			if (sizzle.matchesSelector(node, selector)) {
				matches.push(node);
			}

			// check the child node's children
			childMatches = sizzle(selector, node);
			if (childMatches.length) {
				matches = matches.concat(childMatches);
			}
		});

		return matches;
	}

	return sizzle(selector, context);
};

},{"../children":46,"../vendor/sizzle/sizzle":67,"ac-dom-nodes/isDocumentFragment":33,"ac-polyfills/Array/prototype.forEach":57}],66:[function(require,module,exports){
/**
 * @copyright 2015 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var children = require('./children');
var validate = require('./internal/validate');

/**
 * @name module:ac-dom-traversal.siblings
 *
 * @function
 *
 * @desc Returns an Array of Elements that are siblings of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element[]} Array of matching sibling Elements, in DOM order.
 */
module.exports = function siblings(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'siblings');
 	validate.selector(selector, false, 'siblings');

 	if (node.parentNode) {
 		els = children(node.parentNode, selector);
 		els = els.filter(function (el) {
 			return (el !== node);
 		});
 	}

 	return els;
};

},{"./children":46,"./internal/validate":51}],67:[function(require,module,exports){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
/**
 * Finally found the exact commit for this version of Sizzle
 * commit: 683924fb73bafc5447b86cc5a38a4d99108e1196
 * @see https://github.com/jquery/sizzle/tree/683924fb73bafc5447b86cc5a38a4d99108e1196
 *
 * This is an unreleased version in between 1.7.2 and 1.8.0 committed 2012-07-23
 * It was basic tag: 1.8.0~9
 *
 * Since then this has been modified with:
 * - 2014-05-13 jisaacs: This comment block (cut a fork of the above mentioned commit)
 * - 2014-01-14 glan: CommonJS module.exports at the bottom of the file (ac-base)
 */
(function( window, undefined ) {

var cachedruns,
	dirruns,
	sortOrder,
	siblingCheck,
	assertGetIdNotName,

	document = window.document,
	docElem = document.documentElement,

	strundefined = "undefined",
	hasDuplicate = false,
	baseHasDuplicate = true,
	done = 0,
	slice = [].slice,
	push = [].push,

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",

	// Loosely modeled on Javascript identifier characters
	identifier = "(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",
	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + "+)" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + "+)|)|)" + whitespace + "*\\]",
	pseudos = ":(" + characterEncoding + "+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
	combinators = whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*",
	groups = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + attributes + "|" + pseudos.replace( 2, 7 ) + "|[^\\\\(),])+",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcombinators = new RegExp( "^" + combinators ),

	// All simple (non-comma) selectors, excluding insignifant trailing whitespace
	rgroups = new RegExp( groups + "?(?=" + whitespace + "*,|$)", "g" ),

	// A selector, or everything after leading whitespace
	// Optionally followed in either case by a ")" for terminating sub-selectors
	rselector = new RegExp( "^(?:(?!,)(?:(?:^|,)" + whitespace + "*" + groups + ")*?|" + whitespace + "*(.*?))(\\)|$)" ),

	// All combinators and selector components (attribute test, tag, pseudo, etc.), the latter appearing together when consecutive
	rtokens = new RegExp( groups.slice( 19, -6 ) + "\\x20\\t\\r\\n\\f>+~])+|" + combinators, "g" ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + "+)" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + "+)" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + "+)['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "[-", "[-\\*" ) + "+)" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	classCache = {},
	cachedClasses = [],
	compilerCache = {},
	cachedSelectors = [],

	// Mark a function for use in filtering
	markFunction = function( fn ) {
		fn.sizzleFilter = true;
		return fn;
	},

	// Returns a function to use in pseudos for input types
	createInputFunction = function( type ) {
		return function( elem ) {
			// Check the input's nodeName and type
			return elem.nodeName.toLowerCase() === "input" && elem.type === type;
		};
	},

	// Returns a function to use in pseudos for buttons
	createButtonFunction = function( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	},

	// Used for testing something on an element
	assert = function( fn ) {
		var pass = false,
			div = document.createElement("div");
		try {
			pass = fn( div );
		} catch (e) {}
		// release memory in IE
		div = null;
		return pass;
	},

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length ===
			// buggy browsers will return more than the correct 0
			2 + document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	}),

	// Check if the browser returns only elements
	// when doing getElementsByTagName("*")
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return div.getElementsByTagName("*").length === 0;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return false;
		}

		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length !== 1;
	});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
};

var Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	match: matchExpr,

	order: [ "ID", "TAG" ],

	attrHandle: {},

	createPseudo: markFunction,

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var argument,
				unquoted = match[4];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Relinquish our claim on characters in `unquoted` from a closing parenthesis on
			if ( unquoted && (argument = rselector.exec( unquoted )) && argument.pop() ) {

				match[0] = match[0].slice( 0, argument[0].length - unquoted.length - 1 );
				unquoted = argument[0].slice( 0, -1 );
			}

			// Quoted or unquoted, we have the full argument
			// Return only captures needed by the pseudo filter method (type and argument)
			match.splice( 2, 3, unquoted || match[3] );
			return match;
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className ];
			if ( !pattern ) {
				pattern = classCache[ className ] = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" );
				cachedClasses.push( className );
				// Avoid too large of a cache
				if ( cachedClasses.length > Expr.cacheLength ) {
					delete classCache[ cachedClasses.shift() ];
				}
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may set fn.sizzleFilter to indicate
			// that arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn.sizzleFilter ) {
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !!elem.firstChild;
		},

		"empty": function( elem ) {
			return !elem.firstChild;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputFunction("radio"),
		"checkbox": createInputFunction("checkbox"),
		"file": createInputFunction("file"),
		"password": createInputFunction("password"),
		"image": createInputFunction("image"),

		"submit": createButtonFunction("submit"),
		"reset": createButtonFunction("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// IE6/7 return a modified href
if ( !assertHrefNotNormalized ) {
	Expr.attrHandle = {
		"href": function( elem ) {
			return elem.getAttribute( "href", 2 );
		},
		"type": function( elem ) {
			return elem.getAttribute("type");
		}
	};
}

// Add getElementsByName if usable
if ( assertUsableName ) {
	Expr.order.push("NAME");
	Expr.find["NAME"] = function( name, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};
}

// Add getElementsByClassName if usable
if ( assertUsableClassName ) {
	Expr.order.splice( 1, 0, "CLASS" );
	Expr.find["CLASS"] = function( className, context, xml ) {
		if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
			return context.getElementsByClassName( className );
		}
	};
}

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

var isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
var contains = Sizzle.contains = docElem.compareDocumentPosition ?
	function( a, b ) {
		return !!( a.compareDocumentPosition( b ) & 16 );
	} :
	docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	return (baseHasDuplicate = 0);
});


if ( docElem.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( ; (elem = results[i]); i++ ) {
				if ( elem === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( selector, context, results, seed, groups ) {
	var match, not, anchor, ret, elements, currentContexts, part, lastIndex,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		// Reset regex index to 0
		rpos.exec("");
		selector = groups[i];
		ret = [];
		anchor = 0;
		elements = seed;
		while ( (match = rpos.exec( selector )) ) {
			lastIndex = rpos.lastIndex = match.index + match[0].length;
			if ( lastIndex > anchor ) {
				part = selector.slice( anchor, match.index );
				anchor = lastIndex;
				currentContexts = [ context ];

				if ( rcombinators.test(part) ) {
					if ( elements ) {
						currentContexts = elements;
					}
					elements = seed;
				}

				if ( (not = rendsWithNot.test( part )) ) {
					part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
				}

				if ( match.length > 1 ) {
					match[0].replace( rposgroups, setUndefined );
				}
				elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
			}
		}

		if ( elements ) {
			ret = ret.concat( elements );

			if ( (part = selector.slice( anchor )) && part !== ")" ) {
				multipleContexts( part, ret, results, seed );
			} else {
				push.apply( results, ret );
			}
		} else {
			Sizzle( selector, context, results, seed );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function tokenize( selector, context, xml ) {
	var tokens, soFar, type,
		groups = [],
		i = 0,

		// Catch obvious selector issues: terminal ")"; nonempty fallback match
		// rselector never fails to match *something*
		match = rselector.exec( selector ),
		matched = !match.pop() && !match.pop(),
		selectorGroups = matched && selector.match( rgroups ) || [""],

		preFilters = Expr.preFilter,
		filters = Expr.filter,
		checkContext = !xml && context !== document;

	for ( ; (soFar = selectorGroups[i]) != null && matched; i++ ) {
		groups.push( tokens = [] );

		// Need to make sure we're within a narrower context if necessary
		// Adding a descendant combinator will generate what is needed
		if ( checkContext ) {
			soFar = " " + soFar;
		}

		while ( soFar ) {
			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				soFar = soFar.slice( match[0].length );

				// Cast descendant combinators to space
				matched = tokens.push({ part: match.pop().replace( rtrim, " " ), captures: match });
			}

			// Filters
			for ( type in filters ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match, context, xml )) ) ) {

					soFar = soFar.slice( match.shift().length );
					matched = tokens.push({ part: type, captures: match });
				}
			}

			if ( !matched ) {
				break;
			}
		}
	}

	if ( !matched ) {
		Sizzle.error( selector );
	}

	return groups;
}

function addCombinator( matcher, combinator, context ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem, context ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem, context ) && elem;
				}
			}
		} :
		function( elem, context ) {
			var cache,
				dirkey = doneName + "." + dirruns,
				cachedkey = dirkey + "." + cachedruns;
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					if ( (cache = elem[ expando ]) === cachedkey ) {
						return false;
					} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
						if ( elem.sizset ) {
							return elem;
						}
					} else {
						elem[ expando ] = cachedkey;
						if ( matcher( elem, context ) ) {
							elem.sizset = true;
							return elem;
						}
						elem.sizset = false;
					}
				}
			}
		};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem, context ) {
			var result = deeper( elem, context );
			return result && higher( result === true ? elem : result, context );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context );
		} else {
			token.captures.push( context, xml );
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply( null, token.captures ) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem, context ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem, context) ) {
				return true;
			}
		}
		return false;
	};
}

var compile = Sizzle.compile = function( selector, context, xml ) {
	var tokens, group, i,
		cached = compilerCache[ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		cached.dirruns++;
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0; (tokens = group[i]); i++ ) {
		group[i] = matcherFromTokens( tokens, context, xml );
	}

	// Cache the compiled function
	cached = compilerCache[ selector ] = matcherFromGroupMatchers( group );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	cachedSelectors.push( selector );
	// Ensure only the most recent are cached
	if ( cachedSelectors.length > Expr.cacheLength ) {
		delete compilerCache[ cachedSelectors.shift() ];
	}
	return cached;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

var select = function( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, i, len, elem, token,
		type, findContext, notTokens,
		match = selector.match( rgroups ),
		tokens = selector.match( rtokens ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( selector, context, results, seed, match );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match && match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( tokens.length > 1 && contextNodeType === 9 && !xml &&
				(match = matchExpr["ID"].exec( tokens[0] )) ) {

			context = Expr.find["ID"]( match[1], context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().length );
		}

		findContext = ( (match = rsibling.exec( tokens[0] )) && !match.index && context.parentNode ) || context;

		// Get the last token, excluding :not
		notTokens = tokens.pop();
		token = notTokens.split(":not")[0];

		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];

			if ( (match = matchExpr[ type ].exec( token )) ) {
				elements = Expr.find[ type ]( (match[1] || "").replace( rbackslash, "" ), findContext, xml );

				if ( elements == null ) {
					continue;
				}

				if ( token === notTokens ) {
					selector = selector.slice( 0, selector.length - notTokens.length ) +
						token.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}
				}
				break;
			}
		}
	}

	// Only loop over the given elements once
	// If selector is empty, we're already done
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns;

		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}
		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem, context) ) {
				results.push( elem );
			}
		}
	}

	return results;
};

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			rbuggyQSA = [],
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [":active"],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			div.innerHTML = "<select><option selected></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							selector.replace( rgroups, "[id='" + nid + "'] $&" )
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( Expr.match.PSEUDO );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// EXPOSE

if (typeof module === 'object' && module.exports) {
    module.exports = Sizzle;
} else {
	window.Sizzle = Sizzle;
}
// EXPOSE

})( window );

},{}],68:[function(require,module,exports){
module.exports.DOMEmitter = require("./ac-dom-emitter/DOMEmitter");
},{"./ac-dom-emitter/DOMEmitter":69}],69:[function(require,module,exports){
/*global module */
'use strict';
var proto;

var EventEmitter = require('ac-event-emitter').EventEmitter;

/**
 * @name .DOMEmitter
 * @class DOMEmitter
 * <pre>DOMEmitter = require('/DOMEmitter');</pre>
 */

var internalEventPrefix = 'dom-emitter';

function DOMEmitter( el ) {
    if ( el === null ) {
        return;
    }
    this.el = el;
    this._bindings = {};
    this._eventEmitter = new EventEmitter();
}


proto = DOMEmitter.prototype;

proto._parseEventNames = function( evt ) {
    // handle any undefined/nulls and send em back
    if ( !evt ) {
        return [ evt ];
    }
    return evt.split(' ');
};

proto._onListenerEvent = function( evtName, e ) {
    this.trigger( evtName, e, false );
};

proto._setListener = function( evt ) {
    this._bindings[ evt ] = this._onListenerEvent.bind( this, evt );
    this._addEventListener( evt, this._bindings[ evt ] );
};

proto._removeListener = function( evt ) {
    this._removeEventListener( evt, this._bindings[ evt ] );
    delete this._bindings[ evt ];
};

proto._addEventListener = function( evt, func, useCapture ) {
    if ( this.el.addEventListener ) {
        this.el.addEventListener( evt, func, useCapture );
    } else if ( this.el.attachEvent ) {
        this.el.attachEvent( 'on' + evt, func );
    } else {
        target[ 'on' + evt ] = func;
    }
    return this;
};

proto._removeEventListener = function( evt, func, useCapture ) {
   if ( this.el.removeEventListener ) {
        this.el.removeEventListener( evt, func, useCapture );
    } else {
        this.el.detachEvent( 'on' + evt, func );
    }

    return this;
};

proto._triggerInternalEvent = function( evt, data ) {
    this.trigger( internalEventPrefix + ':' + evt, data );
};

proto.on = function( evts, callback, context ) {
    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, evt ) {

        if ( !this.has( evt ) ) {
            this._setListener( evt );
        }

         this._triggerInternalEvent( 'willon', {
            evt : evt,
            callback : callback,
            context : context
        });

        this._eventEmitter.on( evt, callback, context );
       
        this._triggerInternalEvent( 'didon', {
            evt : evt,
            callback : callback,
            context : context
        });

    }.bind( this, callback, context ));

    return this;
};

proto.off = function( evts, callback, context ) {
    var args = Array.prototype.slice.call( arguments, 0 );
    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, args, evt ) {

        // Handle unbinding all events ( this.off(); )
        if ( args.length === 0 ) {
            this._eventEmitter.off();

            // for each event, unbind it
            var i;
            for ( i in this._bindings ) {
                if ( this._bindings.hasOwnProperty( i ) ) {
                    this._removeListener( i );
                }
            }
            return;
        }

        this._triggerInternalEvent( 'willoff', {
            evt : evt,
            callback : callback,
            context : context
        });

        this._eventEmitter.off( evt, callback, context );
        
        this._triggerInternalEvent( 'didoff', {
            evt : evt,
            callback : callback,
            context : context
        });

        // for specific events
        if ( !this.has( evt ) ) {
            this._removeListener( evt );
        }
            
    }.bind( this, callback, context, args ));

    return this;
};

proto.once = function( evts, callback, context ) {
    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, evt ) {
        
        if ( !this.has( evt ) ) {
            this._setListener( evt );
        }
        
        this._triggerInternalEvent( 'willonce', {
            evt : evt,
            callback : callback,
            context : context
        });

        this._eventEmitter.once.call( this, evt, callback, context );
        
        this._triggerInternalEvent( 'didonce', {
            evt : evt,
            callback : callback,
            context : context
        });

    }.bind( this, callback, context ));

    return this;
};

proto.has = function( evt, callback, context ) {
    if ( this._eventEmitter && this._eventEmitter.has.apply( this._eventEmitter, arguments ) ) {
        return true;
    }
    return false;
};

proto.trigger = function( evts, data, doNotPropogate ) {
    evts = this._parseEventNames( evts );
    evts.forEach( function( data, doNotPropogate, evt ) {
        this._eventEmitter.trigger( evt, data, doNotPropogate );
    }.bind( this, data, doNotPropogate ));

    return this;
    
};

proto.destroy = function() {
    this._triggerInternalEvent( 'willdestroy' );
    this.off();
    this.el = this._eventEmitter = this._bindings = null;
};

module.exports = DOMEmitter;

},{"ac-event-emitter":121}],70:[function(require,module,exports){
/**
 * @module ac-dom-styles
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var vendorTransformHelper = require('./ac-dom-styles/vendorTransformHelper');

/**
 * Utility methods dealing with Elements
 * @name module:ac-dom-styles
 * @kind namespace
 */
var ac_dom_styles = {};

/**
 * Set one or more CSS styles on a DOM element.
 *
 * Usage:
 *
 *     // element and style paramaters as strings
 *     require('ac-dom-styles').setStyle('nav', 'float:left; background:#ccc;');
 *     // element paramater as DOM element, style paramater as an object
 *     var element = document.getElementById('nav');
 *     require('ac-dom-styles').setStyle(element, {
 *         float: "left",
 *         background: "#ccc"
 *     });
 *
 * @param {Element} el The DOM element to set the style/s on.
 * @param {String|Object} styles One or more styles as CSS string or an object with property/value pairs.
 * @returns el
 * @name module:ac-dom-styles.setStyle
 * @kind function
 */
ac_dom_styles.setStyle = function (el, styles) {
	var stylesObj;
	var camelCaseProp;
	var prop;

	if ((typeof styles !== 'string' && typeof styles !== 'object') || Array.isArray(styles)) {
		throw new TypeError('styles argument must be either an object or a string');
	}

	stylesObj = ac_dom_styles.setStyle.__explodeStyleStringToObject(styles);

	// iterate over stylesObj and set styles
	for (prop in stylesObj) {
		if (stylesObj.hasOwnProperty(prop)) {
			camelCaseProp = prop.replace(/-(\w)/g, ac_dom_styles.setStyle.__camelCaseReplace);
			ac_dom_styles.setStyle.__setStyle(el, camelCaseProp, stylesObj, stylesObj[prop]);
		}
	}

	return el;
};

/** @ignore */
ac_dom_styles.setStyle.__explodeStyleStringToObject = function (styles) {
	var stylesObj = (typeof styles === 'object') ? styles : {};
	var splitStyles;
	var colon;
	var len;
	var i;

	if (typeof styles === 'string') {
		splitStyles = styles.split(';');
		len = splitStyles.length;
		for (i = 0; i < len; i += 1) {
			colon = splitStyles[i].indexOf(':');
			if (colon > 0) {
				stylesObj[splitStyles[i].substr(0, colon).trim()] = splitStyles[i].substr(colon + 1).trim();
			}
		}
	}

	return stylesObj;
};

/** @ignore */
ac_dom_styles.setStyle.__setStyle = function (element, camelCaseProp, stylesObj, stylesValue) {
	if (typeof element.style[camelCaseProp] !== 'undefined') {
		element.style[camelCaseProp] = stylesValue;
	}
};

// replace function to handle camelCasing for module:ac-dom-styles.setStyle and getStyle.
// Accounts for Mozilla expecting 'Moz'.
/** @ignore */
ac_dom_styles.setStyle.__camelCaseReplace = function (match, group, offset, string) {
	return (offset === 0) && (string.substr(1, 3) !== 'moz') ? group : group.toUpperCase();
};

/**
 * Retrieves the value of a style property on a DOM element.
 * @param {Element} el The DOM element to check the style of.
 * @param {String} property The style property
 * @param {Object} [css] Overrides for window.getComputedStyle(el)
 * @returns {String} The value for the style property on this Element
 * @name module:ac-dom-styles.getStyle
 * @kind function
 */
ac_dom_styles.getStyle = function (el, property, css) {
	var value;

	property = property.replace(/-(\w)/g, ac_dom_styles.setStyle.__camelCaseReplace);

	property = (property === 'float') ? 'cssFloat' : property;

	css = css || window.getComputedStyle(el, null);
	value = css ? css[property] : null;

	if (property === 'opacity') {
		return value ? parseFloat(value) : 1.0;
	}

	return value === 'auto' ? null : value;
};

/**
 * Sets all the vendor specific style {{{property}}} to {{{value}}} on {{{el}}}.
 * @param {Element} el The Element for which to set the style upon
 * @param {String} property The css property, e.g. borderRadius, webkitBorderRadius, border-radius, etc...
 * @param {String|Number} value The value for which to set the element's css property
 * @name module:ac-dom-styles.setVendorPrefixStyle
 * @kind function
 */
ac_dom_styles.setVendorPrefixStyle = function (el, property, value) {
	if (typeof property !== 'string') {
		throw new TypeError('ac-dom-styles.setVendorPrefixStyle: property must be a string');
	}
	if (typeof value !== 'string' && typeof value !== 'number') {
		throw new TypeError('ac-dom-styles.setVendorPrefixStyle: value must be a string or a number');
	}

	// Empty value accounts for non-vendor-prefixed properties
	var prefixes = ['', 'webkit', 'Moz', 'ms', 'O'];
	var prefixedCamelProp;
	var prefixedValue;

	// Coerce value to string
	value += '';

	// Strip prefix from property if it has one
	property = property.replace(/-(webkit|moz|ms|o)-/i, '');
	// Strip js camelcase vendor prefix if it has one and lowercase first letter. e.g. webkitTransform
	property = property.replace(/^(webkit|Moz|ms|O)/, '');
	property = property.charAt(0).toLowerCase() + property.slice(1);

	// camelCase property
	property = property.replace(/-(\w)/, function (match, group) {
		return group.toUpperCase();
	});

	// Insert token for vendor prefix replacement in values
	value = value.replace(/-(webkit|moz|ms|o)-/, '-vendor-');

	// Iterate through prefixes array testing for existence of property. Update if present.
	prefixes.forEach(function (prefix) {
		// Apply prefixes
		prefixedCamelProp = (prefix === '') ? property : prefix + property.charAt(0).toUpperCase() + property.slice(1);
		prefixedValue = (prefix === '') ? value.replace('-vendor-', '') : value.replace('-vendor-', '-' + prefix.charAt(0).toLowerCase() + prefix.slice(1) + '-');

		if (prefixedCamelProp in el.style) {
			ac_dom_styles.setStyle(el, prefixedCamelProp + ':' + prefixedValue);
		}
	});

};

/**
 * Returns the style value for a specific property as a string and, if necessary, prefixed
 * with the correct vendor prefix for the executing browser.
 * @param {Element} el The DOM Element from which to return the style.
 * @param {String} property The CSS property to fetch the style for. Will accept either a CSS
 * property or a javascript Element.style property name. Vendor prefixes are optional. Any
 * acceptable property as a string will return the same results. e.g. -webkit-box-shadow,
 * -moz-box-shadow, boxShadow, and msBoxShadow will all yield the same return value.
 * @returns {String} The specified property's style as a string
 * @name module:ac-dom-styles.getVendorPrefixStyle
 * @kind function
 */
ac_dom_styles.getVendorPrefixStyle = function (el, property) {
	if (typeof property !== 'string') {
		throw new TypeError('ac-dom-styles.getVendorPrefixStyle: property must be a string');
	}

	var prefixes = ['', 'webkit', 'Moz', 'ms', 'O'];
	var style;

	// Strip css vendor prefix from property if it has one. e.g. -webkit-transform
	property = property.replace(/-(webkit|moz|ms|o)-/i, '');
	// Strip js camelcase vendor prefix if it has one and lowercase first letter. e.g. webkitTransform
	property = property.replace(/^(webkit|Moz|ms|O)/, '').charAt(0).toLowerCase() + property.slice(1);

	// camelCase property
	property = property.replace(/-(\w)/, function (match, group) {
		return group.toUpperCase();
	});

	// Iterate through prefixes array, testing for existence of property. module:ac-dom-styles.getStyle runs on the first match.
	prefixes.some(function (prefix, index) {
		// Apply prefixes
		var prefixedCamelProp = (prefix === '') ? property : prefix + property.charAt(0).toUpperCase() + property.slice(1);

		if (prefixedCamelProp in el.style) {
			style = ac_dom_styles.getStyle(el, prefixedCamelProp);
			return true;
		}
	});

	return style;
};

/**
 * Sets all the appropriate vendor prefixed transform properties to {{{transformFunctions}}} on {{{el}}}.
 * If the 3D version of the transform is available it will set that in favor of the 2D transform.
 * @param {Element} el The Element for which to set the style upon
 * @param {String|Object} transformFunctions the value for which to set the element's transform property. As a string
 * it takes the form of <code>[transformFunction]([parameters])</code>. As an object, pass the
 * <code>[transformFunctions]</code> as the key and the <code>[parameters]</code> as string to the key's value.
 * @name module:ac-dom-styles.setVendorPrefixTransform
 * @kind function
 */
ac_dom_styles.setVendorPrefixTransform = function (el, transformFunctions) {
	if ((typeof transformFunctions !== 'string' && typeof transformFunctions !== 'object') || Array.isArray(transformFunctions) || transformFunctions === null) {
		throw new TypeError('ac-dom-styles.setVendorPrefixTransform: transformFunctions argument must be either an object or a string');
	}

	ac_dom_styles.setVendorPrefixStyle(el, 'transform', vendorTransformHelper.convert2dFunctions(transformFunctions));
};

// IE compatibility
require('./ac-dom-styles/ie')(ac_dom_styles);

module.exports = ac_dom_styles;

},{"./ac-dom-styles/ie":71,"./ac-dom-styles/vendorTransformHelper":72}],71:[function(require,module,exports){
'use strict';

module.exports = function(ac_dom_styles) {
	/**
	 * IE 8 and below getStyle shim accounts for the absence of getComputedStyle as well as IE's
	 * currentStyle object's lack of support for background, font and border css shorthand props.
	 */
	if (typeof window.getComputedStyle !== 'function') {
		ac_dom_styles.getStyle = function (el, style, css) {
			var alphaFilter;
			var value;

			css = css || el.currentStyle;
			if (css) {
				style = style.replace(/-(\w)/g, ac_dom_styles.setStyle.__camelCaseReplace);

				// IE's currentStyle uses styleFloat instead of float
				style = style === 'float' ? 'styleFloat' : style;

				value = css[style] || null;
				return value === 'auto' ? null : value;
			}
		};
	}
};

},{}],72:[function(require,module,exports){
'use strict';

/*
 * A static helper object that handles the work for module:ac-dom-styles.setVendorPrefixTransform.
 * Functionality is abstracted out into this helper object in order to break it up into manageable chunks
 * and also to enable testing of the code that would otherwise be unreachable by the test suites.
 */
/** @ignore */
var vendorTransformHelper = {

	__objectifiedFunctions: {},

	/*
		The paramMaps are used as templates for mapping 2D transform function parameters into
		their equivalent 3D function counterparts. 'p1', 'p2', etc. are replacement tokens that
		correspond to the 2D function parameters. p1 is the first 2D parameter, p2 is the second and so on.
	*/
	__paramMaps: {
		translate: 'p1, p2, 0',
		translateX: 'p1, 0, 0',
		translateY: '0, p1, 0',
		scale: 'p1, p2, 1',
		scaleX: 'p1, 1, 1',
		scaleY: '1, p1, 1',
		rotate: '0, 0, 1, p1',
		matrix: 'p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1'
	},

	/*
		@param {String|Object} functions2d A space separated string of transform functions, or an object
		with function names as the keys and a string of comma separataed parameters as the values.
		@returns {String} A space separated list of transform functions with any eligible 2D functions
		mapped to their 3D counterparts.
	*/
	convert2dFunctions: function (functions2d) {
		var values;

		this.__init(functions2d);
		// loop through functions & replace 2d function with 3d function where available
		for (var func in this.__objectifiedFunctions) {
			if (this.__objectifiedFunctions.hasOwnProperty(func)) {
				values = this.__objectifiedFunctions[func].replace(' ', '').split(',');
				if (func in this.__paramMaps) {
					for (var map in this.__paramMaps) {
						if (func === map) {
							this.valuesToSet.push(this.__stripFunctionAxis(func) + '3d(' + this.__map2DTransformParams(values, this.__paramMaps[func]) + ')');
						}
					}
				} else {
					this.valuesToSet.push(func + '(' + this.__objectifiedFunctions[func] + ')');
				}
			}
		}
		return this.valuesToSet.join(' ');
	},

	/*
		Handles some light house cleaning - resetting properties.
		Expects to receive the functions2d parameter from convert2dFunctions and fills the
		_objectifiedFunctions property with key/value pairs from this string or object.
		@param {String|Object} functions2d A space separated string of transform functions, or an object
		with function names as the keys and a string of comma separataed parameters as the values.
		@returns {undefined}
	*/
	__init: function (functions2d) {
		this.valuesToSet = [];
		this.__objectifiedFunctions = (typeof functions2d === 'object') ? functions2d : {};
		if (typeof functions2d === 'string') {
			this.__objectifiedFunctions = this.__objectifyFunctionString(functions2d);
		}
	},

	/*
		@param {Array} params2d Array containing all the parameters from a transform function as
		individual members.
		@param {String} template3d One of the parameter maps from the __paramMaps object.
		@returns {String} The template3d parameter with the 2D function values mapped into it.
	*/
	__map2DTransformParams: function (params2d, template3d) {
		params2d.forEach(function (val, i) {
			template3d = template3d.replace('p' + (i + 1), val);
		});
		return template3d;
	},

	/*
		Splits a space separated string of transform functions into an array with each
		function as a member.
		@param {String} functionString A space separated string of transform functions
		@returns {Array} An array with each function from the string as a member
	*/
	__splitFunctionStringToArray: function (functionString) {
		return functionString.match(/[\w]+\(.+?\)/g);
	},

	/*
		Takes a single transform function as a string and splits its name and parameters into an array.
		@param {String} functionString
		@returns {Array} The resulting array from a match() method. The entire functionString
		will be the first member with the function name and the parameters populating the
		second and third members respectively.
	*/
	__splitFunctionNameAndParams: function (functionString) {
		return functionString.match(/(.*)\((.*)\)/);
	},

	/*
		Strips the X or Y axis off the end of a transform function.
		@param {String} func A transform function name that specifies an X or Y axis at the end
		@returns {String} The function with the axis removed
	*/
	__stripFunctionAxis: function (func) {
		return func.match(/([a-z]+)(|X|Y)$/)[1];
	},

	/*
		Splits a string of transform functions into an object consisting of the function
		names as the keys and the parameters as their respective values.
		@param {String} functionString A space separated string of transform functions
		@returns {Object} An object filled with keys as function names and values as their
		respective parameters
	*/
	__objectifyFunctionString: function (functionString) {
		var self = this;
		var splitMember;
		this.__splitFunctionStringToArray(functionString).forEach(function (member) {
			splitMember = self.__splitFunctionNameAndParams(member);
			self.__objectifiedFunctions[splitMember[1]] = splitMember[2];
		});
		return this.__objectifiedFunctions;
	}
};

module.exports = vendorTransformHelper;

},{}],73:[function(require,module,exports){
/**
 * @module ac-dom-metrics
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var ac_dom_styles = require('ac-dom-styles');

var ac_dom_metrics = {};

/** @ignore */
var viewportScrollOffsets = function () {
	return {
		x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	};
};

/** @ignore */
var viewportDimensions = function () {
	return {
		height: window.innerHeight || document.documentElement.clientHeight,
		width: window.innerWidth || document.documentElement.clientWidth
	};
};

/**
 * Returns an object with top and left offset values for an element relative
 * to the absolute top and left locations of html document.
 * @param {Element} el
 * @returns {Object} An object with numeric values for top and left properties.
 * @name module:ac-dom-metrics.cumulativeOffset
 * @kind function
 */
ac_dom_metrics.cumulativeOffset = function (el) {
	var box = ac_dom_metrics.getBoundingBox(el);
	var scrollOffsets = viewportScrollOffsets();
	var offset = [box.top + scrollOffsets.y, box.left + scrollOffsets.x];
	offset.top = offset[0];
	offset.left = offset[1];
	return offset;
};

/**
 * Returns the bounding box values for an element including width and height.
 * Borders and padding are included. Values are affected by box-sizing.
 * @param {Element} el The Element you want to query
 * @returns {Object} An object with top, right, bottom, left, width and height values as numbers
 * @name module:ac-dom-metrics.getBoundingBox
 * @kind function
 */
ac_dom_metrics.getBoundingBox = function (el) {
	var rect = el.getBoundingClientRect();
	var width = rect.width || rect.right - rect.left;
	var height = rect.height || rect.bottom - rect.top;

	return {
		top: rect.top,
		right: rect.right,
		bottom: rect.bottom,
		left: rect.left,
		width: width,
		height: height
	};
};

/**
 * Returns the width and height of an element's content box. Padding and
 * borders are not included. Accounts for `box-sizing:border-box;`.
 * @param {Element} el The element you want to query
 * @returns {Object} An object with width and height values as numbers
 * @name module:ac-dom-metrics.getInnerDimensions
 * @kind function
 */
ac_dom_metrics.getInnerDimensions = function (el) {
	var dims = ac_dom_metrics.getBoundingBox(el);
	var width = dims.width;
	var height = dims.height;
	var style;
	var styleValue;
	var css = window.getComputedStyle ? window.getComputedStyle(el, null) : null;

	['padding', 'border'].forEach(function (prop) {
		['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
			style = prop === 'border' ? prop + side + 'Width' : prop + side;
			styleValue = parseFloat(ac_dom_styles.getStyle(el, style, css));
			styleValue = isNaN(styleValue) ? 0 : styleValue;
			if (side === 'Right' || side === 'Left') {
				width -= styleValue;
			}
			if (side === 'Top' || side === 'Bottom') {
				height -= styleValue;
			}
		});
	});

	return {
		width: width,
		height: height
	};
};

/**
 * Returns the width and height of an element including borders and margins.
 * Accounts for `box-sizing:border-box;`.
 * @param {Element} el The Element you want to query
 * @returns {Object} An object with width and height values as numbers
 * @name module:ac-dom-metrics.getOuterDimensions
 * @kind function
 */
ac_dom_metrics.getOuterDimensions = function (el) {
	var dims = ac_dom_metrics.getBoundingBox(el);
	var width = dims.width;
	var height = dims.height;
	var marginStyle;
	var css = window.getComputedStyle ? window.getComputedStyle(el, null) : null;

	['margin'].forEach(function (prop) {
		['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
			marginStyle = parseFloat(ac_dom_styles.getStyle(el, prop + side, css));
			marginStyle = isNaN(marginStyle) ? 0 : marginStyle;
			if (side === 'Right' || side === 'Left') {
				width += marginStyle;
			}
			if (side === 'Top' || side === 'Bottom') {
				height += marginStyle;
			}
		});
	});

	return {
		width: width,
		height: height
	};
};

/**
 * Determines the amount of the height of the element that is in view.
 * @param {Element} element
 * @param {Object} [boundingBox] Memoized value from {@link ac_dom_metrics.getBoundingBox(el)}
 * @returns {Integer} Number of pixels of the element that are currently within the viewport.
 * @name module:ac-dom-metrics.pixelsInViewport
 * @kind function
 */
ac_dom_metrics.pixelsInViewport = function (el, boundingBox) {
	// Amount of the element that is visible inside of the viewport (px)
	var pixelsInView;

	// Get element and viewport metrics
	var viewportMetrics = viewportDimensions();
	boundingBox = boundingBox || ac_dom_metrics.getBoundingBox(el);

	// Determine the offset from the top of the element relative to the top edge
	// of the viewport (px)
	var elementViewportOffsetY = boundingBox.top;

	// If element is fully in view or cropped by bottom edge of viewport
	if (elementViewportOffsetY >= 0) {
		pixelsInView = viewportMetrics.height - elementViewportOffsetY;

		// If the bottom edge of element is in view and the top edge, then it
		// is fully in view
		if (pixelsInView > boundingBox.height) {
			pixelsInView = boundingBox.height;
		}

		// If element is cropped by top edge of viewport or is scrolled out of
		// view above top edge of viewport
	} else {
		pixelsInView = boundingBox.height + elementViewportOffsetY;
	}

	// If the element is completely out of view past the bottom edge of
	// the viewport, then 0 px of it is in view
	if (pixelsInView < 0) {
		pixelsInView = 0;
	}

	if (pixelsInView > viewportMetrics.height){
		pixelsInView = viewportMetrics.height;
	}

	return pixelsInView;
};

/**
 * Determines the percentage of the height of the Element that is in view.
 * @param {Element} el
 * @returns {Float} 0-1, Percentage of the Element within the viewport.
 * @name module:ac-dom-metrics.percentInViewport
 * @kind function
 */
ac_dom_metrics.percentInViewport = function (el) {
	var boundingBox = ac_dom_metrics.getBoundingBox(el);
	var pixelsInView = ac_dom_metrics.pixelsInViewport(el, boundingBox);
	return pixelsInView / boundingBox.height;
};

/**
 * Check if an Element is visible in the viewport above a percentage threshold.
 * @param {Element} el
 * @param {Float} [threshold=0] 0-1, Minimum percentage of the Element within the viewport.
 * @returns {Boolean} `true` if the Element meets the visibility threshold, otherwise `false`.
 * @name module:ac-dom-metrics.isInViewport
 * @kind function
 */
ac_dom_metrics.isInViewport = function (el, threshold) {
	var percentInViewport = ac_dom_metrics.percentInViewport(el);

	// Ensure that threshold is defined and within bounds.
	if (typeof threshold !== "number" || 1 < threshold || threshold < 0){
		threshold = 0;
	}

	return (percentInViewport > threshold || percentInViewport === 1);
};

require('./ac-dom-metrics/ie')(ac_dom_metrics);

module.exports = ac_dom_metrics;

},{"./ac-dom-metrics/ie":74,"ac-dom-styles":70}],74:[function(require,module,exports){
'use strict';

module.exports = function(ac_metrics) {

	/**
	 * Rudimentary shim for getBoundingClientRect in IE < 8.
	 * getBoundingClientRect is available in IE8 even with documentMode as IE7.
	 * It is not available in vanilla IE7.
	 */
	if (!('getBoundingClientRect' in document.createElement('_'))) {
		ac_metrics.getBoundingBox = function (el) {
			var left = el.offsetLeft;
			var top = el.offsetTop;
			var width = el.offsetWidth;
			var height = el.offsetHeight;
			return {
				top: top,
				right: left + width,
				bottom: top + height,
				left: left,
				width: width,
				height: height
			};
		};
	}
};

},{}],75:[function(require,module,exports){
/**
 * @module ac-dom-traversal
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var ac_dom_traversal = {
	querySelector: require('./ac-dom-traversal/querySelector'),
	querySelectorAll: require('./ac-dom-traversal/querySelectorAll'),
	ancestor: require('./ac-dom-traversal/ancestor'),
	ancestors: require('./ac-dom-traversal/ancestors'),
	children: require('./ac-dom-traversal/children'),
	firstChild: require('./ac-dom-traversal/firstChild'),
	lastChild: require('./ac-dom-traversal/lastChild'),
	siblings: require('./ac-dom-traversal/siblings'),
	nextSibling: require('./ac-dom-traversal/nextSibling'),
	nextSiblings: require('./ac-dom-traversal/nextSiblings'),
	previousSibling: require('./ac-dom-traversal/previousSibling'),
	previousSiblings: require('./ac-dom-traversal/previousSiblings'),
	filterBySelector: require('./ac-dom-traversal/filterBySelector'),
	matchesSelector: require('./ac-dom-traversal/matchesSelector')
};

// IE compatibility
require('./ac-dom-traversal/shims/ie')(ac_dom_traversal);

module.exports = ac_dom_traversal;

},{"./ac-dom-traversal/ancestor":76,"./ac-dom-traversal/ancestors":77,"./ac-dom-traversal/children":78,"./ac-dom-traversal/filterBySelector":79,"./ac-dom-traversal/firstChild":80,"./ac-dom-traversal/lastChild":83,"./ac-dom-traversal/matchesSelector":84,"./ac-dom-traversal/nextSibling":85,"./ac-dom-traversal/nextSiblings":86,"./ac-dom-traversal/previousSibling":87,"./ac-dom-traversal/previousSiblings":88,"./ac-dom-traversal/querySelector":89,"./ac-dom-traversal/querySelectorAll":90,"./ac-dom-traversal/shims/ie":91,"./ac-dom-traversal/siblings":92}],76:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.ancestor
 *
 * @function
 *
 * @desc Returns the closest Element that is an ancestor of the specified Node, matching an optional CSS selector, up to and including the body.
 *
 * @param {Node} node
 *        The child Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter ancestor Elements by.
 *
 * @returns {Element|null} Closest matching ancestor Element, or `null` if no matches are found.
 */
module.exports = function ancestor(node, selector) {
 	validate.childNode(node, true, 'ancestors');
 	validate.selector(selector, false, 'ancestors');

 	if (node !== document.body) {
 		while ((node = node.parentNode) && ac_dom_nodes.isElement(node)) {
 			if (!selector || matchesSelector(node, selector)) {
 				return node;
 			}

 			if (node === document.body) {
 				break;
 			}
 		}
 	}

 	return null;
};

},{"./helpers/validate":82,"./matchesSelector":84,"ac-dom-nodes":23}],77:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.ancestors
 *
 * @function
 *
 * @desc Returns an Array of Elements that are ancestors of the specified Node, matching an optional CSS selector, up to and including the body.
 *
 * @param {Node} node
 *        The child Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter ancestor Elements by.
 *
 * @returns {Element[]} Array of matching ancestor Elements, with the closest ancestor first.
 */
module.exports = function ancestors(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'ancestors');
 	validate.selector(selector, false, 'ancestors');

 	if (node !== document.body) {
	 	while ((node = node.parentNode) && ac_dom_nodes.isElement(node)) {
	 		if (!selector || matchesSelector(node, selector)) {
	 			els.push(node);
	 		}

	 		if (node === document.body) {
	 			break;
	 		}
	 	}
	}

 	return els;
};

},{"./helpers/validate":82,"./matchesSelector":84,"ac-dom-nodes":23}],78:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var filterBySelector = require('./filterBySelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.children
 *
 * @function
 *
 * @desc Returns an Array of Elements that are direct children of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The parent Element, Document, or Document Fragment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter children Elements by.
 *
 * @returns {Element[]} Array of matching child Elements, in DOM order.
 */
module.exports = function children(node, selector) {
	var els;

	validate.parentNode(node, true, 'children');
	validate.selector(selector, false, 'children');

	els = node.children || node.childNodes;
	els = ac_dom_nodes.filterByNodeType(els);

	if (selector) {
		els = filterBySelector(els, selector);
	}

	return els;
};

},{"./filterBySelector":79,"./helpers/validate":82,"ac-dom-nodes":23}],79:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.filterBySelector
 *
 * @function
 *
 * @desc Filter an Array of Elements by a given CSS selector.
 *
 * @param {Node[]|NodeList} nodes
 *        The Elements to be filtered.
 *
 * @param {String} selector
 *        CSS selectors, separated by commas, to check Elements against.
 *
 * @returns {Element[]} A new Array of matching Elements.
 */
module.exports = function filterBySelector(nodes, selector) {
	validate.selector(selector, true, 'filterBySelector');

	nodes = Array.prototype.slice.call(nodes);

	return nodes.filter(function (el) {
		return matchesSelector(el, selector);
	});
};

},{"./helpers/validate":82,"./matchesSelector":84}],80:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var children = require('./children');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.firstChild
 *
 * @function
 *
 * @desc Returns the first Element that is a direct child of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The parent Element, Document, or Document Fragment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter children Elements by.
 *
 * @returns {Element|null} First matching child Element, or `null` if no matches are found.
 */
module.exports = function firstChild(node, selector) {
	var els;

	validate.parentNode(node, true, 'firstChild');
	validate.selector(selector, false, 'firstChild');

	if (node.firstElementChild && !selector) {
		return node.firstElementChild;
	}

	els = children(node, selector);

	if (els.length) {
		return els[0];
	}

	return null;
};

},{"./children":78,"./helpers/validate":82}],81:[function(require,module,exports){
'use strict';

/** @ignore */
module.exports = window.Element ? (function (proto) {
	return proto.matches ||
		proto.matchesSelector ||
		proto.webkitMatchesSelector ||
		proto.mozMatchesSelector ||
		proto.msMatchesSelector ||
		proto.oMatchesSelector;
}(Element.prototype)) : null;

},{}],82:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');

/** @ignore */
var isNodeType = function (node, nodeType) {
	if (!ac_dom_nodes.isNode(node)) {
		return false;
	}

	if (typeof nodeType === 'number') {
		return (node.nodeType === nodeType);
	}

	return (nodeType.indexOf(node.nodeType) !== -1);
};

/** @ignore */
var VALID_PARENT_NODE = [
	ac_dom_nodes.ELEMENT_NODE,
	ac_dom_nodes.DOCUMENT_NODE,
	ac_dom_nodes.DOCUMENT_FRAGMENT_NODE
];

/** @ignore */
var ERR_INVALID_PARENT_NODE = ' must be an Element, Document, or Document Fragment';

/** @ignore */
var VALID_CHILD_NODE = [
	ac_dom_nodes.ELEMENT_NODE,
	ac_dom_nodes.TEXT_NODE,
	ac_dom_nodes.COMMENT_NODE
];

/** @ignore */
var ERR_INVALID_CHILD_NODE = ' must be an Element, TextNode, or Comment';

/** @ignore */
var ERR_INVALID_SELECTOR = ' must be a string';

module.exports = {

	/** @ignore */
	parentNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if ((node || required) && !isNodeType(node, VALID_PARENT_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_PARENT_NODE);
		}
	},

	/** @ignore */
	childNode: function (node, required, funcName, paramName) {
		paramName = paramName || 'node';

		if (!node && !required) {
			return;
		}

		if (!isNodeType(node, VALID_CHILD_NODE)) {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_CHILD_NODE);
		}
	},

	/** @ignore */
	selector: function (selector, required, funcName, paramName) {
		paramName = paramName || 'selector';

		if ((selector || required) && typeof selector !== 'string') {
			throw new TypeError(funcName + ': ' + paramName + ERR_INVALID_SELECTOR);
		}
	}

};

},{"ac-dom-nodes":23}],83:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var children = require('./children');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.lastChild
 *
 * @function
 *
 * @desc Returns the last Element that is a direct child of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The parent Element, Document, or Document Fragment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter children Elements by.
 *
 * @returns {Element|null} Last matching child Element, or `null` if no matches are found.
 */
module.exports = function lastChild(node, selector) {
	var els;

	validate.parentNode(node, true, 'lastChild');
	validate.selector(selector, false, 'lastChild');

	if (node.lastElementChild && !selector) {
		return node.lastElementChild;
	}

	els = children(node, selector);

	if (els.length) {
		return els[els.length - 1];
	}

	return null;
};

},{"./children":78,"./helpers/validate":82}],84:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var nativeMatches = require('./helpers/nativeMatches');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.matchesSelector
 *
 * @function
 *
 * @desc Returns whether or not an Element matches a given CSS selector.
 *
 * @param {Node} node
 *        The Element to be checked.
 *
 * @param {String} selector
 *        CSS selectors, separated by commas, to check Element against.
 *
 * @returns {Boolean} `true` if the Element matches the selector, otherwise `false`
 */
module.exports = function matchesSelector(node, selector) {
 	validate.selector(selector, true, 'matchesSelector');
	return ac_dom_nodes.isElement(node) ? nativeMatches.call(node, selector) : false;
};

},{"./helpers/nativeMatches":81,"./helpers/validate":82,"ac-dom-nodes":23}],85:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.nextSibling
 *
 * @function
 *
 * @desc Returns the closest sibling Element that follows the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element|null} Closest matching sibling Element, or `null` if no matches are found.
 */
module.exports = function nextSibling(node, selector) {
 	validate.childNode(node, true, 'nextSibling');
 	validate.selector(selector, false, 'nextSibling');

	if (node.nextElementSibling && !selector) {
		return node.nextElementSibling;
	}

	while (node = node.nextSibling) {
		if (ac_dom_nodes.isElement(node)) {
			if (!selector || matchesSelector(node, selector)) {
				return node;
			}
		}
	}

	return null;
};

},{"./helpers/validate":82,"./matchesSelector":84,"ac-dom-nodes":23}],86:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.nextSiblings
 *
 * @function
 *
 * @desc Returns an Array of sibling Elements that follow the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element[]} Array of matching sibling Elements, in DOM order.
 */
module.exports = function nextSiblings(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'nextSiblings');
 	validate.selector(selector, false, 'nextSiblings');

 	while (node = node.nextSibling) {
 		if (ac_dom_nodes.isElement(node)) {
 			if (!selector || matchesSelector(node, selector)) {
 				els.push(node);
 			}
 		}
 	}

 	return els;
};

},{"./helpers/validate":82,"./matchesSelector":84,"ac-dom-nodes":23}],87:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.previousSibling
 *
 * @function
 *
 * @desc Returns the closest sibling Element that preceeds the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element|null} Closest matching sibling Element, or `null` if no matches are found.
 */
module.exports = function previousSibling(node, selector) {
 	validate.childNode(node, true, 'previousSibling');
 	validate.selector(selector, false, 'previousSibling');

	if (node.previousElementSibling && !selector) {
		return node.previousElementSibling;
	}

	while (node = node.previousSibling) {
		if (ac_dom_nodes.isElement(node)) {
			if (!selector || matchesSelector(node, selector)) {
				return node;
			}
		}
	}

	return null;
};

},{"./helpers/validate":82,"./matchesSelector":84,"ac-dom-nodes":23}],88:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var ac_dom_nodes = require('ac-dom-nodes');
var matchesSelector = require('./matchesSelector');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.previousSiblings
 *
 * @function
 *
 * @desc Returns an Array of sibling Elements that preceed the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element[]} Array of matching sibling Elements, in DOM order.
 */
module.exports = function previousSiblings(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'previousSiblings');
 	validate.selector(selector, false, 'previousSiblings');

 	while (node = node.previousSibling) {
 		if (ac_dom_nodes.isElement(node)) {
 			if (!selector || matchesSelector(node, selector)) {
 				els.push(node);
 			}
 		}
 	}

 	return els.reverse();
};

},{"./helpers/validate":82,"./matchesSelector":84,"ac-dom-nodes":23}],89:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.querySelector
 *
 * @function
 *
 * @desc Returns the first Element within the specified context that match given CSS selector(s).
 *
 * @param {String} selector
 *        One or more CSS selectors separated by commas.
 *
 * @param {Node} [context=document]
 *        An optional ParentNode to scope the selector to. Defaults to `document`.
 *
 * @returns {Element|null} First matching Element, or `null` if no matches are found.
 */
module.exports = function querySelector(selector, context) {
	context = context || document;

	validate.parentNode(context, true, 'querySelector', 'context');
	validate.selector(selector, true, 'querySelector');

	return context.querySelector(selector);
};

},{"./helpers/validate":82}],90:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.querySelectorAll
 *
 * @function
 *
 * @desc Returns an Array of Elements within the specified context that match given CSS selector(s).
 *
 * @param {String} selector
 *        One or more CSS selectors separated by commas.
 *
 * @param {Node} [context=document]
 *        An optional ParentNode to scope the selector to. Defaults to `document`.
 *
 * @returns {Element[]} Array of matching Elements
 */
module.exports = function querySelectorAll(selector, context) {
	context = context || document;

	validate.parentNode(context, true, 'querySelectorAll', 'context');
	validate.selector(selector, true, 'querySelectorAll');

	return Array.prototype.slice.call(context.querySelectorAll(selector));
};

},{"./helpers/validate":82}],91:[function(require,module,exports){
'use strict';

/** @ignore */
var sizzle = require('../vendor/sizzle/sizzle');
var ac_dom_nodes = require('ac-dom-nodes');
var nativeMatches = require('../helpers/nativeMatches');
var validate = require('../helpers/validate');

module.exports = function(ac_dom_traversal, forceShim) {
	if (forceShim || !('querySelectorAll' in document)) {
		/**
		 * module:ac-dom-traversal.selectAll shim for IE < 8
		 * Fallback to sizzle needed due to lack of native querySelectorAll
		 */
		ac_dom_traversal.querySelectorAll = function (selector, context) {
			var children;
			var matches;

			context = context || document;

			validate.parentNode(context, true, 'querySelectorAll', 'context');
			validate.selector(selector, true, 'querySelectorAll');

			if (ac_dom_nodes.isDocumentFragment(context)) {
				children = ac_dom_traversal.children(context);
				matches = [];

				children.forEach(function (node) {
					var childMatches;

					// check the child node
					if (sizzle.matchesSelector(node, selector)) {
						matches.push(node);
					}

					// check the child node's children
					childMatches = sizzle(selector, node);
					if (childMatches.length) {
						matches = matches.concat(childMatches);
					}
				});

				return matches;
			}

			return sizzle(selector, context);
		};

		/**
		 * module:ac-dom-traversal.querySelector shim for IE < 8
		 * Fallback to sizzle needed due to lack of native querySelector
		 */
		ac_dom_traversal.querySelector = function (selector, context) {
			var allResults;

			context = context || document;

			validate.parentNode(context, true, 'querySelector', 'context');
			validate.selector(selector, true, 'querySelector');

			allResults = ac_dom_traversal.querySelectorAll(selector, context);

			return allResults.length ? allResults[0] : null;
		};
	}

	if (forceShim || !nativeMatches) {
		/**
		 * module:ac-dom-traversal.matchesSelector shim for IE < 10
		 * Fallback to sizzle needed due to lack of native matches or msMatchesSelector
		 */
		ac_dom_traversal.matchesSelector = function (node, selector) {
			return sizzle.matchesSelector(node, selector);
		};
	}
};

},{"../helpers/nativeMatches":81,"../helpers/validate":82,"../vendor/sizzle/sizzle":93,"ac-dom-nodes":23}],92:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var children = require('./children');
var validate = require('./helpers/validate');

/**
 * @name module:ac-dom-traversal.siblings
 *
 * @function
 *
 * @desc Returns an Array of Elements that are siblings of the specified Node, matching an optional CSS selector.
 *
 * @param {Node} node
 *        The Element, TextNode, or Comment.
 *
 * @param {String} [selector]
 *        Optional CSS selectors, separated by commas, to filter sibling Elements by.
 *
 * @returns {Element[]} Array of matching sibling Elements, in DOM order.
 */
module.exports = function siblings(node, selector) {
 	var els = [];

 	validate.childNode(node, true, 'siblings');
 	validate.selector(selector, false, 'siblings');

 	if (node.parentNode) {
 		els = children(node.parentNode, selector);
 		els = els.filter(function (el) {
 			return (el !== node);
 		});
 	}

 	return els;
};

},{"./children":78,"./helpers/validate":82}],93:[function(require,module,exports){
module.exports=require(67)
},{}],94:[function(require,module,exports){
/** 
 * @module ac-dom-emitter
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	DOMEmitter: require('./ac-dom-emitter/DOMEmitter')
};

},{"./ac-dom-emitter/DOMEmitter":95}],95:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';
var proto;

var EventEmitter = require('ac-event-emitter').EventEmitter,
    ac_dom_events = require('ac-dom-events'),
    ac_dom_traversal = require('ac-dom-traversal');

/**
 * @name .DOMEmitter
 * @class DOMEmitter
 * <pre>DOMEmitter = require('/DOMEmitter');</pre>
 */

var internalEventPrefix = 'dom-emitter';

function DOMEmitter( el ) {
    if ( el === null ) {
        return;
    }
    this.el = el;
    this._bindings = {};
    this._delegateFuncs = {};
    this._eventEmitter = new EventEmitter();
}

proto = DOMEmitter.prototype;

proto._parseEventNames = function( evt ) {
    // handle any undefined/nulls and send em back
    if ( !evt ) {
        return [ evt ];
    }
    // remove empty string events
    return evt.split(' ');
};

proto._onListenerEvent = function( evtName, e ) {
    this.trigger( evtName, e, false );
};

proto._setListener = function( evt ) {
    this._bindings[ evt ] = this._onListenerEvent.bind( this, evt );
    ac_dom_events.addEventListener( this.el, evt, this._bindings[ evt ] );
};

proto._removeListener = function( evt ) {
    ac_dom_events.removeEventListener( this.el, evt, this._bindings[ evt ] );
    this._bindings[ evt ] = null;
};

proto._triggerInternalEvent = function( evt, data ) {
    this.trigger( internalEventPrefix + ':' + evt, data );
};

proto._normalizeArgumentsAndCall = function( argsArr, func ) {
    /**
     * We use this method to normalize these options:
     *  // Sans-delegation
     *  domEmitter.on( 'click touchend', myFunc ); // 2-arg; string, function
     *  domEmitter.on( 'click touchend', myFunc, ctx ); // 3-arg; string, function, object
     *   
     *  // With Delegation
     *  domEmitter.on( 'click touchend', '.delegate query', myFunc ); // 3-arg; string, string, function
     *  domEmitter.on( 'click touchend', '.delegate query', myFunc, ctx ); // 4-arg; string, string, function, object
     *   
     *  // Object syntax
     *  domEmitter.on({
     *      'click touchend' : myFunc, // Sans-delegation
     *      'click touchend: .delegate query' : myFunc // With delegation
     *  }); // 1-arg; object
     *   
     *  domEmitter.on({
     *      'click' : myFunc,
     *      'click: .delegate query' : myFunc // With delegation
     *  }, ctx ); // 2-arg; object, object
     *
     * domEmitter.off(); // no args
     *
    **/

    var binding = {};

    // handle no-arg situation
    if ( argsArr.length === 0 ) {
        func.call( this, binding );
        return;
    }

    // handle non-object based syntax first
    if ( typeof argsArr[ 0 ] === 'string' || argsArr[ 0 ] === null ) {
        argsArr = this._cleanStringData( argsArr );
        binding.events = argsArr[ 0 ];

        // handle delegate query
        if ( typeof argsArr[ 1 ] === 'string' ) {
            binding.delegateQuery = argsArr[ 1 ];
            binding.callback = argsArr[ 2 ];
            binding.context = argsArr[ 3 ];
        } else {
             // handle non-delegate query
            binding.callback = argsArr[ 1 ];
            binding.context = argsArr[ 2 ];
        }

       func.call( this, binding );
       return;
    }

    // assume type is object here
    var i,
        splits,
        splitChar = ':',
        obj = argsArr[ 0 ];
    for ( i in obj ) {
        if ( obj.hasOwnProperty( i ) ) {
            binding = {};
            // if a colon exists, which will split delegate queries and event names
            splits = this._cleanStringData( i.split( splitChar ) );
            
            // save both. if splits[ 1 ] DNE then it will simply be undefined anyway
            binding.events = splits[ 0 ];
            binding.delegateQuery = splits[ 1 ];

            // set callback and context
            binding.callback = obj[ i ];
            binding.context = argsArr[ 1 ];

            func.call( this, binding );
        }
    }
};

proto._registerDelegateFunc = function( evt, delegateQuery, callback, unboundCallback, context ) {
    // bind a new delegateFunc
    var delegateFunc = this._delegateFunc.bind( this, evt, delegateQuery, callback, context );
    // create an array for delegate funcs with this key if DNE
    this._delegateFuncs[ delegateQuery ] = this._delegateFuncs[ delegateQuery ] || {};
    this._delegateFuncs[ delegateQuery ][ evt ] = this._delegateFuncs[ delegateQuery ][ evt ] || [];
    this._delegateFuncs[ delegateQuery ][ evt ].push({
        func : unboundCallback,
        context : context,
        delegateFunc : delegateFunc
    });

    return delegateFunc;
};

// remove whitespace before/after strings, as well as any empty strings in arrays
proto._cleanStringData = function( arr ) {
    // force it into an array if just a string is passed
    var isString = false;
    if ( typeof arr === 'string' ) {
        arr = [ arr ];
        isString = true; 
    }

    var result = [],
        i,
        val,
        valLen,
        spaceIdx,
        len = arr.length;

    for ( i = 0; i < len; i++ ) {
        val = arr[ i ];

        // if it's a string, check to see if we want it
        if ( typeof val === 'string' ) {
            // if it's an empty string or space, we don't want it. continue
            if ( val === '' || val === ' ' ) {
                continue;
            }

            // we'll remove whitespace in the beginning recursively
            valLen = val.length;
            while( val[ 0 ] === ' ' ) {
                val = val.slice( 1, valLen );
                valLen--;
            }

            // recursively remove whitespace in the end of the string
            while( val[ valLen - 1 ] === ' ' ) {
                val = val.slice( 0, valLen - 1 );
                valLen--;
            }
        }

        result.push( val );
    }

    if ( isString ) {
        return result[ 0 ];
    }

    return result;
};

proto._unregisterDelegateFunc = function( evt, delegateQuery, unboundCallback, context ) {
    // if no delegate functions exist, return
    if ( !this._delegateFuncs[ delegateQuery ] || !this._delegateFuncs[ delegateQuery ][ evt ] ) {
        return;
    }

    // find the index where the binding exists at
    var matchIdx = this._getDelegateFuncBindingIdx( evt, delegateQuery, unboundCallback, context ),
        delegateFunc;

    // if an index was found, remove it from the delegateFunc array
    if ( matchIdx > -1 ) {
        // save the delegate function so it can be unbound via EventEmitter later
        delegateFunc = this._delegateFuncs[ delegateQuery ][ evt ][ matchIdx ].delegateFunc;
        // remove this registry in the array
        this._delegateFuncs[ delegateQuery ][ evt ].splice( matchIdx, 1 );
        // if there aren't any left in the array, nullify this._delegateFuncs[ delegateQuery ][ evt ]
        if ( this._delegateFuncs[ delegateQuery ][ evt ].length === 0 ) {
            this._delegateFuncs[ delegateQuery ][ evt ] = null;
        }
    }

    return delegateFunc;

};

proto._unregisterDelegateFuncs = function( evt, delegateQuery ) {
    // only continue if there are events that need to be removed
    if ( !this._delegateFuncs[ delegateQuery ] ) {
        return;
    }

    if ( evt !== null && !this._delegateFuncs[ delegateQuery ][ evt ] ) {
        return;
    }

    // if the event is null, we just want to iterate over all and unbind
    if ( evt === null ) {
        var i;
        for ( i in this._delegateFuncs[ delegateQuery ] ) {
            if ( this._delegateFuncs[ delegateQuery ].hasOwnProperty( i ) ) {
                this._unbindDelegateFunc( i, delegateQuery );
            }
        }
        return;
    }

    // unbind callbacks just for that event
    this._unbindDelegateFunc( evt, delegateQuery );
};

proto._unbindDelegateFunc = function( evt, delegateQuery ) {
    var binding,
        preRemoveLen,
        i = 0;

    while( this._delegateFuncs[ delegateQuery ][ evt ] && this._delegateFuncs[ delegateQuery ][ evt ][ i ] ) {
        binding = this._delegateFuncs[ delegateQuery ][ evt ][ i ];
        
        // save the length of the events for the delegateQuery stack
        preRemoveLen = this._delegateFuncs[ delegateQuery ][ evt ][ i ].length;
        this._off({
            events : evt,
            delegateQuery : delegateQuery,
            callback : binding.func,
            context : binding.context
        });
        
        // test if an unbind did occur, and if not, we'll add one to 'i' to continue looking for new events
        // if it has changed, we want to keep the current idx because the array has already shifted
        if ( this._delegateFuncs[ delegateQuery ][ evt ] && preRemoveLen === this._delegateFuncs[ delegateQuery ][ evt ].length ) {
            i++;
        }
    }

     binding = preRemoveLen = null;
};

proto._unregisterDelegateFuncsByEvent = function( evt ) {
    var i;
    // for each delegate query
    for ( i in this._delegateFuncs ) {
        if ( this._delegateFuncs.hasOwnProperty( i ) ) {
             this._unregisterDelegateFuncs( evt, i );
        }
    }
};

proto._delegateFunc = function( evt, delegateQuery, callback, context, e ) {
    if ( ac_dom_traversal.matchesSelector( ac_dom_events.target( e ), delegateQuery ) ) {

        var args = Array.prototype.slice.call( arguments, 0 ),
            // remove the four arguments we added ourselves
            unboundArgs = args.slice( 4, args.length );

        context = context || window;
        // if it was a CustomEvent, just get the event data and ignore the rest from the DOM
        if ( typeof e.detail === 'object' ) {
            unboundArgs[ 0 ] = e.detail;
        }
        // call the callback with the natural arguments, minus the three we added ourselves
        callback.call( context, unboundArgs );
    }
};

proto.on = function() {
    this._normalizeArgumentsAndCall( Array.prototype.slice.call( arguments, 0 ), this._on );
    return this;
};

proto.once = function() {
    this._normalizeArgumentsAndCall( Array.prototype.slice.call( arguments, 0 ), this._once );
    return this;
};

proto.off = function() {
    this._normalizeArgumentsAndCall( Array.prototype.slice.call( arguments, 0 ), this._off );
    return this;
};

proto._on = function( binding ) {
    var evts = binding.events,
        callback = binding.callback,
        delegateQuery = binding.delegateQuery,
        context = binding.context,
        unboundCallback = binding.unboundCallback || callback;

    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, unboundCallback, context, delegateQuery, evt ) {

        if ( !this.has( evt ) ) {
            this._setListener( evt );
        }

        // if this should be delegated, register a delegationFunc for it
        if ( typeof delegateQuery === 'string' ) {
            callback = this._registerDelegateFunc( evt, delegateQuery, callback, unboundCallback, context );
        }

         this._triggerInternalEvent( 'willon', {
            evt : evt,
            callback : callback,
            context : context,
            delegateQuery : delegateQuery
        });

        this._eventEmitter.on( evt, callback, context );
       
        this._triggerInternalEvent( 'didon', {
            evt : evt,
            callback : callback,
            context : context,
            delegateQuery : delegateQuery
        });

    }.bind( this, callback, unboundCallback, context, delegateQuery ));

    evts = callback = unboundCallback = delegateQuery = context = null;
};

proto._off = function( binding ) {
    var evts = binding.events,
        callback = binding.callback,
        delegateQuery = binding.delegateQuery,
        context = binding.context,
        unboundCallback = binding.unboundCallback || callback;

     // Handle unbinding all events ( this.off(); )
    if ( typeof evts === 'undefined' ) {
        this._eventEmitter.off();

        // for each event, unbind it
        var i;
        for ( i in this._bindings ) {
            if ( this._bindings.hasOwnProperty( i ) ) {
                this._removeListener( i );
            }
        }

        // for each event in the _delegateFuncs, remove them
        for ( i in this._delegateFuncs ) {
            if ( this._delegateFuncs.hasOwnProperty( i ) ) {
                this._delegateFuncs[ i ] = null;
            }
        }
        return;
    }

    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, unboundCallback, context, delegateQuery, evt ) {

        // if this should be delegated, register a delegationFunc for it
        if ( typeof delegateQuery === 'string' && typeof unboundCallback === 'function' ) {
            callback = this._unregisterDelegateFunc( evt, delegateQuery, unboundCallback, context );
            // if a callback isn't found here, it means that the query was incorrect.
            // this could cause some issues if we let it continue, so we'll return false here
            if ( !callback ) {
                return;
            }
        }

        // if a delegate string was added, but no callback was given, it's essentially .off() just for that query
        if ( typeof delegateQuery === 'string' && typeof callback === 'undefined' ) {
            // we'll iterate over each one and unbind them seperately
            this._unregisterDelegateFuncs( evt, delegateQuery );
            return;
        }

        // if an event was called, with no other params, we want to make sure we remove related delegateBindings from memory too
        if ( typeof evt === 'string' && typeof callback === 'undefined' ) {
            this._unregisterDelegateFuncsByEvent( evt );
            // don't continue here if we had a delegate query, since it will run through this again with correct params
            if ( typeof delegateQuery === 'string' ) {
                return;
            }
        }

        this._triggerInternalEvent( 'willoff', {
            evt : evt,
            callback : callback,
            context : context,
            delegateQuery : delegateQuery
        });

        this._eventEmitter.off( evt, callback, context );
        
        this._triggerInternalEvent( 'didoff', {
            evt : evt,
            callback : callback,
            context : context,
            delegateQuery : delegateQuery
        });

        // for specific events
        if ( !this.has( evt ) ) {
            this._removeListener( evt );
        }
            
    }.bind( this, callback, unboundCallback, context, delegateQuery ));

    evts = callback = unboundCallback = delegateQuery = context = null;
};

proto._once = function( binding ) {
    var evts = binding.events,
        callback = binding.callback,
        delegateQuery = binding.delegateQuery,
        context = binding.context;

    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, delegateQuery, evt ) {

        // .once() on a delegate is tricky, because it needs to stay bound until it triggers the callback on the delegate, not this.el
        if ( typeof delegateQuery === 'string' ) {
            // to handle this, it's easiest to polyfill a delegate's .once() on our own
            return this._handleDelegateOnce( evt, callback, context, delegateQuery );
        }
        
        if ( !this.has( evt ) ) {
            this._setListener( evt );
        }

        this._triggerInternalEvent( 'willonce', {
            evt : evt,
            callback : callback,
            context : context,
            delegateQuery : delegateQuery
        });

        // we can trick EventEmitter with .call here, where when it calls .on() internally, it call this.on() instead
        this._eventEmitter.once.call( this, evt, callback, context );
        
        this._triggerInternalEvent( 'didonce', {
            evt : evt,
            callback : callback,
            context : context,
            delegateQuery : delegateQuery
        });

    }.bind( this, callback, context, delegateQuery ));

    evts = callback = delegateQuery = context = null;
};

proto._handleDelegateOnce = function( evt, callback, context, delegateQuery ) {
    this._triggerInternalEvent( 'willonce', {
        evt : evt,
        callback : callback,
        context : context,
        delegateQuery : delegateQuery
    });

    // bind the event with a naturalCallback so we can match correctly
    this._on({
        events: evt,
        context : context,
        delegateQuery: delegateQuery,
        callback: this._getDelegateOnceCallback.bind( this, evt, callback, context, delegateQuery ),
        unboundCallback: callback
    });

    this._triggerInternalEvent( 'didonce', {
        evt : evt,
        callback : callback,
        context : context,
        delegateQuery : delegateQuery
    });

    return this;
};

proto._getDelegateOnceCallback = function( evt, callback, context, delegateQuery ) {
    // there could be any number of arguments, so we'll get them all
    var args = Array.prototype.slice.call( arguments, 0 ),
        // strip the args we added ourselves
        passedArgs = args.slice( 4, args.length );
    // if context, call the callback with the context given and the args
    callback.apply( context, passedArgs );
    // unbind the event after it was called with this.off();
    this._off({
        events : evt,
        delegateQuery : delegateQuery,
        callback : callback,
        context : context 
    });
};

proto._getDelegateFuncBindingIdx = function( evt, delegateQuery, unboundCallback, context, ignoreFuncMatch ) {
    var idx = -1;

    if ( this._delegateFuncs[ delegateQuery ] && this._delegateFuncs[ delegateQuery ][ evt ] ) {
        var i,
            bindingObj,
            len = this._delegateFuncs[ delegateQuery ][ evt ].length;
        for ( i = 0; i < len; i++ ) {
            bindingObj = this._delegateFuncs[ delegateQuery ][ evt ][ i ];

            // sometimes we want to match on whether or not the callback is defined, specifically for .has()
            if ( ignoreFuncMatch && typeof unboundCallback === 'undefined' ) {
                unboundCallback = bindingObj.func;
            }

            if ( bindingObj.func === unboundCallback && bindingObj.context === context ) {
                idx = i;
                break;
            }
        }
    }

    return idx;
};

proto._triggerDelegateEvents = function( evt, delegateQuery, data ) {
    var targets = ac_dom_traversal.querySelectorAll( delegateQuery, this.el );

    var i,
        target,
        len = targets.length;
    for ( i = 0; i < len; i++ ) {
        target = targets[ i ];
        // Expects polyfill for CustomEvent constructor
        if ( document.createEvent ) {
            target.dispatchEvent( new CustomEvent( evt, {
                bubbles : true,
                cancelable : false,
                detail : data
            }));
        } else {
            var eventObject = document.createEventObject();
            eventObject.detail = data;
            target.fireEvent( 'on' + evt, eventObject );
        }
        return target;
    }
};

proto.has = function( evt, callbackOrDelegateQuery, callbackOrContext, context ) {
    // normalize input a bit here
    var delegateQuery,
        callback;

    if ( typeof callbackOrDelegateQuery === 'string' ) {
        delegateQuery = callbackOrDelegateQuery;
        callback = callbackOrContext;
    } else {
        callback = callbackOrDelegateQuery;
        context = callbackOrContext;
    }

    // if a delegateQuery exists, we check inside of this._delegateFuncs for binding info
    if ( delegateQuery ) {
        var matchIdx = this._getDelegateFuncBindingIdx( evt, delegateQuery, callback, context, true );
        if ( matchIdx > -1 ) {
            return true;
        }
        return false;
    }

    if ( this._eventEmitter && this._eventEmitter.has.apply( this._eventEmitter, arguments ) ) {
        return true;
    }
    return false;
};

proto.trigger = function( evts, dataOrDelegateQuery, doNotPropogateOrData, doNotPropogate ) {
    evts = this._parseEventNames( evts );

    var delegateQuery,
        data;

    if ( typeof dataOrDelegateQuery === 'string' ) {
        delegateQuery = this._cleanStringData( dataOrDelegateQuery );
        data = doNotPropogateOrData;
    } else {
        data = dataOrDelegateQuery;
        doNotPropogate = doNotPropogateOrData;
    }

    // clean strings for matching
    evts = this._cleanStringData( evts );

    evts.forEach( function( delegateQuery, data, doNotPropogate, evt ) {
        // if a delegateQuery exists, we have to trigger DOM events to properly catch all of the matches
        if ( delegateQuery ) {
            this._triggerDelegateEvents( evt, delegateQuery, data );
            return;
        }
        this._eventEmitter.trigger( evt, data, doNotPropogate );
    }.bind( this, delegateQuery, data, doNotPropogate ));

    return this;
    
};

proto.propagateTo = function( eventEmitter, prefix ) {
    this._eventEmitter.propagateTo( eventEmitter, prefix );
    return this;
};

proto.stopPropagatingTo = function( eventEmitter ) {
    this._eventEmitter.stopPropagatingTo( eventEmitter );
    return this;
};

proto.destroy = function() {
    this._triggerInternalEvent( 'willdestroy' );
    this.off();
    this.el = this._eventEmitter = this._bindings = this._delegateFuncs = null;
};

module.exports = DOMEmitter;
},{"ac-dom-events":13,"ac-dom-traversal":75,"ac-event-emitter":121}],96:[function(require,module,exports){
/** 
 * @module ac-shared-instance
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	SharedInstance: require('./ac-shared-instance/SharedInstance')
};

},{"./ac-shared-instance/SharedInstance":97}],97:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var instanceScope = window,
	instanceSharedInstanceNamespace = 'AC',
	instanceExportKey = 'SharedInstance',
	instanceTarget = instanceScope[ instanceSharedInstanceNamespace ];

var SharedInstance = (function() {

	var registry = {};

	return {

		get : function( name, version ) {
			var module = null;

			// See if a version currently exists for the defined module
			if ( registry[ name ] && registry[ name ][ version ] ) {
				module = registry[ name ][ version ];
			}

			return module;
		},

		set : function( name, version, Module ) {
			// Ensure that a namespace for this module name exists
			if ( !registry[ name ] ) {
				registry[ name ] = {};
			}

			// Test whether or not the Module is a function (constructor) or not
			if ( typeof Module === 'function' ) {
				// If it is, construct away...
				registry[ name ][ version ] = new Module();
			} else {
				// Otherwise, we can assume that this is something we should exec
				registry[ name ][ version ] = Module;
			}

			return registry[ name ][ version ];
		},

		share : function( name, version, Module ) {
			var module = this.get( name, version );

			if ( !module ) {
				module = this.set( name, version, Module );
			}

			return module;
		},

		remove : function( name, version ) {
			// This can do two things. Remove all instances under "name" without a version arg
			// Or remove name + version combo with both arguments
			var versionType = typeof version;
			if ( versionType === 'string' || versionType === 'number' ) {

				if ( !registry[ name ] || !registry[ name ][ version ] ) {
					return;
				}
				
				registry[ name ][ version ] = null;
				return;
			}

			// If no version exists, we're asking to remove all references under "name"
			if ( registry[ name ] ) {
				registry[ name ] = null;
			}
		}
	};

}());

// Ensure an AC namespace exists
if ( !instanceTarget ) {
	instanceTarget = instanceScope[ instanceSharedInstanceNamespace ] = {};
}

// Move SharedInstance to the namespace if it does not yet exist there
if ( !instanceTarget[ instanceExportKey ] ) {
	instanceTarget[ instanceExportKey ] = SharedInstance;
}


// Export the instance of SharedInstance that should be used
module.exports = instanceTarget[ instanceExportKey ];

},{}],98:[function(require,module,exports){
/** 
 * @module ac-window-delegate
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	WindowDelegate: require('./ac-window-delegate/WindowDelegate'),
	WindowDelegateOptimizer: require('./ac-window-delegate/WindowDelegateOptimizer'),
	WindowDelegateCustomEvent: require('./ac-window-delegate/WindowDelegateCustomEvent')
};

},{"./ac-window-delegate/WindowDelegate":101,"./ac-window-delegate/WindowDelegateCustomEvent":102,"./ac-window-delegate/WindowDelegateOptimizer":103}],99:[function(require,module,exports){
'use strict';

var EventEmitter = require('ac-event-emitter').EventEmitter;

var CustomEventController = function() {
	this._emitter = new EventEmitter();
	this._customEvents = {};
};

var proto = CustomEventController.prototype;

proto.on = function( evts, callback, context ) {
	this._activateCustomEvents( evts );
	this._emitterOn.apply( this, arguments );
	return this;
};

proto.once = function( evts, callback, context ) {
	this._emitterOnce.apply( this, arguments );
	return this;
};

proto.off = function( evts, callback, context ) {
	this._emitterOff.apply( this, arguments );
	this._deactivateCustomEvents( evts );
	return this;
};

proto.has = function( evt, callback, context ) {
	return this._emitter.has.apply( this._emitter, arguments );
};

proto.trigger = function() {
	this._emitter.trigger.apply( this._emitter, arguments );
	return this;
};

proto.propagateTo = function() {
	this._emitter.propagateTo.apply( this._emitter, arguments );
	return this;
};

proto.stopPropagatingTo = function() {
	this._emitter.stopPropagatingTo.apply( this._emitter, arguments );
	return this;
};

proto.add = function( customEvent ) {
	this._customEvents[ customEvent.name ] = customEvent;
};

proto.canHandleCustomEvent = function( evt ) {
	return this._customEvents.hasOwnProperty( evt );
};

proto.isHandlingCustomEvent = function( evt ) {
	if ( this._customEvents[ evt ] && this._customEvents[ evt ].active ) {
		return true;
	}
	return false;
};

proto._activateCustomEvents = function( evts ) {
	var evtsArr = evts.split(' '),
		evt,
		i,
		len = evtsArr.length;

	for ( i = 0; i < len; i++ ) {
		evt = evtsArr[ i ];
		if( this._customEvents[ evt ] && !this._customEvents[ evt ].active ) {
			this._customEvents[ evt ].initialize();
			this._customEvents[ evt ].active = true;
		}
	}
};

proto._deactivateCustomEvents = function( evts ) {
	var i;
	
	// handle .off() (no args) scenario
	if ( !evts || evts.length === 0 ) {
		for ( i in this._customEvents ) {
			if ( this._customEvents.hasOwnProperty( i ) ) {
				this._deactivateCustomEvent( i );
			}
		}
		return;
	}

	var evtsArr = evts.split(' '),
		len = evtsArr.length;

	for ( i = 0; i < len; i++ ) {
		this._deactivateCustomEvent( evtsArr[ i ] );
	}
};

proto._deactivateCustomEvent = function( evt ) {
	if( !this.has( evt ) && this._customEvents[ evt ] && this._customEvents[ evt ].active ) {
		this._customEvents[ evt ].deinitialize();
		this._customEvents[ evt ].active = false;
	}
};

proto._emitterOn = function() {
	this._emitter.on.apply( this._emitter, arguments );
};

proto._emitterOnce = function() {
	this._emitter.once.apply( this._emitter, arguments );
};

proto._emitterOff = function() {
	this._emitter.off.apply( this._emitter, arguments );
};


module.exports = CustomEventController;
},{"ac-event-emitter":121}],100:[function(require,module,exports){
'use strict';

var EventEmitter = require('ac-event-emitter').EventEmitter;

var proto;

var OptimizerController = function( optimizers ) {
	EventEmitter.call( this );

	this.optimizers = optimizers;
	
	this._events = {};
	this._properties = {};

	this._initialize();
};

proto = OptimizerController.prototype = new EventEmitter( null );

proto.canOptimizeEvent = function( evt ) {
	return this._events.hasOwnProperty( evt );
};

proto.canOptimizeProperty = function( prop ) {
	return this._properties.hasOwnProperty( prop );
};

proto.isOptimizingEvent = function( evt ) {
	if ( this._events[ evt ] && this._events[ evt ].active ) {
		return true;
	}
	return false;
};

proto.isOptimizingProperty = function( prop ) {
	if ( this._properties[ prop ] && this._properties[ prop ].active ) {
		return true;
	}
	return false;
};

proto.add = function( optimizer ) {
	this._setOptimizerEvents( optimizer );
	this._setOptimizerProperties( optimizer );

	optimizer.on( 'update', this._onUpdate, this );
	optimizer.on( 'activate', this._onActivate, this );
	optimizer.on( 'deactivate', this._onDeactivate, this );
};

proto.get = function( prop ) {
	if ( this.isOptimizingProperty( prop ) ) {
		return this._properties[ prop ].value;
	}
	return null;
};

proto.set = function( prop, val ) {
	if ( !this._properties[ prop ] ) {
		return false;
	}
	this._properties[ prop ].value = val;
	return this;
};

proto.getOptimizerByEvent = function( evt ) {
	if ( this._events[ evt ] ) {
		return this._events[ evt ];
	}
	return null;
};

proto._initialize = function() {
	var i,
		optimizer;
	for ( i in this.optimizers ) {
		if ( this.optimizers.hasOwnProperty( i ) ) {
			this.add( this.optimizers[ i ] );
		}
	}
};

proto._onUpdate = function( e ) {
	this.set( e.prop, e.val );
};

proto._onActivate = function( optimizer ) {
	var propertyNames = optimizer.propertyNames,
		i,
		len = propertyNames.length;

	for ( i = 0; i < len; i++ ) {
		this._properties[ propertyNames[ i ] ].active = true;
	}
};

proto._onDeactivate = function( optimizer ) {
	var propertyNames = optimizer.propertyNames,
		i,
		len = propertyNames.length;

	for ( i = 0; i < len; i++ ) {
		this._properties[ propertyNames[ i ] ].active = false;
	}
};

proto._setOptimizerEvents = function( optimizer ) {
	var i,
		optimizerEvents = optimizer.eventNames,
		len = optimizerEvents.length;

	for ( i = 0; i < len; i++ ) {
		this._setOptimizerEvent( optimizerEvents[ i ], optimizer );
	}
};

proto._setOptimizerEvent = function( evt, optimizer ) {
	// Currently, only one optimizer per event is supported 
	if ( this._events[ evt ] ) {
		return;
	}
	this._events[ evt ] = optimizer;
};

proto._setOptimizerProperties = function( optimizer ) {
	var i,
		optimizeProperties = optimizer.propertyNames,
		len = optimizeProperties.length;

	for ( i = 0; i < len; i++ ) {
		this._setOptimizerProperty( optimizeProperties[ i ] );
	}
};

proto._setOptimizerProperty = function( prop ) {
	if ( this._properties.hasOwnProperty( prop ) ) {
		return;
	}

	this._properties[ prop ] = {};
	this._properties[ prop ].active = false;
	this._properties[ prop ].value = null;
};

module.exports = OptimizerController;
},{"ac-event-emitter":121}],101:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var proto;

var SharedInstance = require('ac-shared-instance').SharedInstance,
	DOMEmitter = require('ac-dom-emitter').DOMEmitter,
	OptimizerController = require('./OptimizerController'),
	CustomEventController = require('./CustomEventController'),
	queries = require('./queries/queries'),
	optimizers = require('./optimizers/optimizers');

var sharedInstanceName = 'ac-window-delegate:WindowDelegate',
	sharedInstanceVersion = '2.0.1';

/**
 * @name .WindowDelegate
 * @class WindowDelegate
 * <pre>WindowDelegate = require('/WindowDelegate');</pre>
 */
function WindowDelegate() {

	this._emitter = new DOMEmitter( window );
	this._controllers = {
		optimizer : new OptimizerController( optimizers ),
		customEvent : new CustomEventController()
	};

	// Set property queries dynamically
	var i;
	for ( i in queries ) {
		if ( queries.hasOwnProperty( i ) ) {
			// Set instance functions for getting each poperty
			this[ i ] = this._getProperty.bind( this, i ); 
			// Override query functions to bind to WindowDelegate
			queries[ i ] = queries[ i ].bind( this );
		}
	}

	this._bindEvents();
}

proto = WindowDelegate.prototype;

/* Event Emitter Delegation */

proto.on = function( evts, callback, context ) {
	var evtsObj = this._seperateCustomEvents( evts );
	this._optimizeEvents( evtsObj.standardEvents );
	this._customEventOn( evtsObj.customEvents, callback, context );
	this._emitterOn.apply( this, arguments );
	return this;
};

proto.once = function( evts, callback, context ) {
	var evtsObj = this._seperateCustomEvents( evts );
	this._optimizeEvents( evtsObj.standardEvents );
	this._customEventOnce( evtsObj.customEvents, callback, context );
	this._emitterOnce.apply( this, arguments );
	return this;
};

proto.off = function( evts, callback, context ) {
	var evtsObj = this._seperateCustomEvents( evts ),
		force = false;

	if ( !evts ) {
		force = true;
	}

	this._customEventOff( evtsObj.customEvents, callback, context, force );
	this._emitterOff.apply( this, arguments );

	/* If no arguments are passed, we have to assume that all events from windowEmitter have been removed.
	 * In this case, we have to rebind our internal events after this fact and assume they didn't fire.
	 * A try/catch makes sense here in case .destroy() was called, in which case it would fail.
	 */
	if ( force ) {
		try {

			// Deoptimize all events
			var evt;
			for ( evt in this._controllers.optimizer._events ) {
				if ( this._controllers.optimizer._events.hasOwnProperty( evt ) && this._shouldDeoptimizeEvent( evt, true ) ) {
					this._deoptimizeEvent( evt );
				}
			}

			// Rebind internal events
			this._bindEvents();
		} catch( e ) {}
	}

	return this;
};

proto.has = function( evt, callback, context ) {
	return this._emitter.has.apply( this._emitter, arguments );
};

proto.trigger = function() {
	this._emitter.trigger.apply( this._emitter, arguments );
	return this;
};

proto.propagateTo = function() {
	this._emitter.propagateTo.apply( this._emitter, arguments );
	return this;
};

proto.stopPropagatingTo = function() {
	this._emitter.stopPropagatingTo.apply( this._emitter, arguments );
	return this;
};

proto.addOptimizer = function( optimizer ) {
	this._controllers.optimizer.add( optimizer );
	return this;
};

proto.addCustomEvent = function( customEvent ) {
	this._controllers.customEvent.add( customEvent );
	return this;
};

proto._emitterOn = function() {
	this._emitter.on.apply( this._emitter, arguments );
};

proto._emitterOnce = function() {
	this._emitter.once.apply( this._emitter, arguments );
};

proto._emitterOff = function() {
	this._emitter.off.apply( this._emitter, arguments );
};

proto._onEventUnbound = function( e ) {
	var evt = e.evt;
	if ( this._shouldDeoptimizeEvent( evt ) ) {
		this._deoptimizeEvent( evt );
	}
};

proto._customEventOn = function( evtsArr, callback, context ) {
	if ( evtsArr.length === 0 ) {
		return;
	}
	this._controllers.customEvent.on( evtsArr.join(' '), callback, context );
};

proto._customEventOnce = function( evtsArr, callback, context ) {
	if ( evtsArr.length === 0 ) {
		return;
	}
	this._controllers.customEvent.once( evtsArr.join(' '), callback, context );
};

proto._customEventOff = function( evtsArr, callback, context, force ) {
	if ( !force && evtsArr.length === 0 ) {
		return;
	}

	// handle the WindowDelegate.off() (no args) scenario
	if ( force && evtsArr.length === 0 ) {
		this._controllers.customEvent.off();
		return;
	}

	this._controllers.customEvent.off( evtsArr.join(' '), callback, context );
};

/* WindowDelegate specific functionality */

proto._getProperty = function( prop, forceQuery ) {
	var value = null;

	if ( !forceQuery ) {
		value = this._getOptimizedValue( prop );
	}

	if ( value === null ) {
		value = queries[ prop ].call( this, forceQuery );
	}

	return value;
};

proto._optimizeEvents = function( evts ) {
	var evt,
		i,
		len = evts.length;
	for ( i = 0; i < len; i++ ) {
		evt = evts[ i ];
		if ( this._shouldOptimizeEvent( evt ) ) {
			this._optimizeEvent( evt );
		}
	}
};

proto._shouldOptimizeEvent = function( evt ) {
	if ( this._controllers.optimizer.canOptimizeEvent( evt ) && !this._controllers.optimizer.isOptimizingEvent( evt ) ) {
		return true;
	}
	return false;
};

proto._shouldDeoptimizeEvent = function( evt, force ) {
	// if we know we have one event bound (the optimization) and that's all that's left to be fired, we'll remove it
	if ( this._controllers.optimizer.isOptimizingEvent( evt ) && ( force || this._emitter._eventEmitter._events[ evt ].length <= 1 ) ) {
		return true;
	}
	return false;
};

proto._optimizeEvent = function( evt ) {
	var optimizer = this._controllers.optimizer.getOptimizerByEvent( evt );
	optimizer.activate();
	this._emitterOn( evt, optimizer.callback, optimizer );
};

proto._deoptimizeEvent = function( evt ) {
	var optimizer = this._controllers.optimizer.getOptimizerByEvent( evt );
	optimizer.deactivate();
	this._emitterOff( evt, optimizer.callback, optimizer );
};

proto._getOptimizedValue = function( prop ) {
	return this._controllers.optimizer.get( prop );
};

proto._seperateCustomEvents = function( evtString ) {

	var result = {
		customEvents : [],
		standardEvents : []
	};

	if( typeof evtString === 'string' ) {
		var evtsArray = evtString.split(' '),
			evt,
			i,
			len = evtsArray.length;
		for ( i = 0; i < len; i++ ) {
			evt = evtsArray[ i ];
			if ( this._controllers.customEvent.canHandleCustomEvent( evt ) ) {
				result.customEvents.push( evt );
			} else {
				result.standardEvents.push( evt );
			}
		}
	}

	return result;
};

proto._bindEvents = function() {
	// Bind to DOMEmitter's internal 'off' event to help us determine if we should remove optimizations
	this._emitter.on( 'dom-emitter:didoff', this._onEventUnbound, this );
};

module.exports = SharedInstance.share( sharedInstanceName, sharedInstanceVersion, WindowDelegate );
},{"./CustomEventController":99,"./OptimizerController":100,"./optimizers/optimizers":106,"./queries/queries":115,"ac-dom-emitter":94,"ac-shared-instance":96}],102:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var EventEmitter = require('ac-event-emitter').EventEmitter;

/**
 * @name module:ac-window-delegate-custom-event.WindowDelegateCustomEvent
 * @class
 * 
 * @desc Custom event pattern for WindowDelegate plugins
 * 
 * @param {Object} [options]
 *        Options to initialize the instance with
 */
function WindowDelegateCustomEvent( name, initializeFunc, deinitializeFunc ) {
	// constructor code goes here
	EventEmitter.call( this );
	this.name = name;
	this.active = false;
	this._initializeFunc = initializeFunc;
	this._deinitializeFunc = deinitializeFunc; 
}

var proto = WindowDelegateCustomEvent.prototype = new EventEmitter( null );

proto.initialize = function () {
	if ( this._initializeFunc ) {
		this._initializeFunc();
	}
	return this;
};

proto.deinitialize = function () {
	if ( this._deinitializeFunc ) {
		this._deinitializeFunc();
	}
	return this;
};

module.exports = WindowDelegateCustomEvent;

},{"ac-event-emitter":121}],103:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var EventEmitter = require('ac-event-emitter').EventEmitter;

/**
 * @name module:ac-window-delegate-optimizer.WindowDelegateOptimizer
 * @class
 * 
 * @desc Optimizer constructor pattern used to create optimizations for WindowDelegate events
 * 
 * @param {Object} [options]
 *        Options to initialize the instance with
 */
function WindowDelegateOptimizer( config, callback ) {
	EventEmitter.call( this );

	this.active = false;
	this.eventNames = config.eventNames;
	this.propertyNames = config.propertyNames;
	this.options = config.options || {};
	this.callback = callback;
}

var proto = WindowDelegateOptimizer.prototype = new EventEmitter( null );

proto.update = function( prop, val ) {
	this.trigger( 'update', {
		prop : prop,
		val : val
	});
};

proto.activate = function() {
	this.active = true;
	this.trigger( 'activate', this );
};

proto.deactivate = function() {
	this.active = false;
	this.trigger( 'deactivate', this );
};

module.exports = WindowDelegateOptimizer;

},{"ac-event-emitter":121}],104:[function(require,module,exports){
'use strict';

var Optimizer = require('../../WindowDelegateOptimizer'),
	queries = require('../../queries/queries');

/* TOFO: What happens on orientationchange? We should try to make sure both are bound */
var config = {
	eventNames : [ 'resize' ],
	propertyNames : [ 'clientWidth', 'clientHeight', 'innerWidth', 'innerHeight' ]
};

var resizeOptimizer = new Optimizer( config, function( e ) {

	var i,
		propertyNames = config.propertyNames,
		len = propertyNames.length;

	for ( i = 0; i < len; i++ ) {
		this.update( propertyNames[ i ], queries[ propertyNames[ i ] ]( true ) );
	} 

});

module.exports = resizeOptimizer;
},{"../../WindowDelegateOptimizer":103,"../../queries/queries":115}],105:[function(require,module,exports){
'use strict';

var Optimizer = require('../../WindowDelegateOptimizer'),
	queries = require('../../queries/queries');

var config = {
	eventNames : [ 'scroll' ],
	propertyNames : [ 'scrollX', 'scrollY', 'maxScrollX', 'maxScrollY' ]
};

var scrollOptimizer = new Optimizer( config, function( e ) {

	var i,
		propertyNames = config.propertyNames,
		len = propertyNames.length;

	for ( i = 0; i < len; i++ ) {
		this.update( propertyNames[ i ], queries[ propertyNames[ i ] ]( true ) );
	} 

});

module.exports = scrollOptimizer;
},{"../../WindowDelegateOptimizer":103,"../../queries/queries":115}],106:[function(require,module,exports){
'use strict';

var resizeEvt = require('./events/resize'),
	scrollEvt = require('./events/scroll');

module.exports = [
	resizeEvt,
	scrollEvt
];
},{"./events/resize":104,"./events/scroll":105}],107:[function(require,module,exports){
'use strict';

var queryClientHeight = function( forceQuery ) {
	return document.documentElement.clientHeight;
};

module.exports = queryClientHeight;
},{}],108:[function(require,module,exports){
'use strict';

var queryClientWidth = function( forceQuery ) {
	return document.documentElement.clientWidth;
};

module.exports = queryClientWidth;
},{}],109:[function(require,module,exports){
'use strict';

var queryInnerHeight = function( forceQuery ) {
	return window.innerHeight || this.clientHeight( forceQuery );
};

module.exports = queryInnerHeight;
},{}],110:[function(require,module,exports){
'use strict';

var queryInnerWidth = function( forceQuery ) {
	return window.innerWidth || this.clientWidth( forceQuery );
};

module.exports = queryInnerWidth;
},{}],111:[function(require,module,exports){
'use strict';

var queryMaxScrollX = function( forceQuery ) {
	// innerWidth is updated from other queries, so we shouldn't force it
	return document.body.scrollWidth - this.innerWidth();
};

module.exports = queryMaxScrollX;
},{}],112:[function(require,module,exports){
'use strict';

var queryMaxScrollY = function( forceQuery ) {
	// innerHeight is updated from other queries, so we shouldn't force it
	return document.body.scrollHeight - this.innerHeight();
};

module.exports = queryMaxScrollY;
},{}],113:[function(require,module,exports){
'use strict';

var queryScrollX = function( forceQuery ) {
	var offset = window.pageXOffset;

	if ( !offset ) {
		var target = document.documentElement || document.body.parentNode || document.body;
		offset = target.scrollLeft;
	}

	return offset;
};

module.exports = queryScrollX;
},{}],114:[function(require,module,exports){
'use strict';

var queryScrollY = function( forceQuery ) {
	var offset = window.pageYOffset;

	if ( !offset ) {
		var target = document.documentElement || document.body.parentNode || document.body;
		offset = target.scrollTop;
	}

	return offset;
};

module.exports = queryScrollY;
},{}],115:[function(require,module,exports){
'use strict';

var queryInnerWidth = require('./methods/innerWidth'),
	queryInnerHeight = require('./methods/innerHeight'),
	queryClientWidth = require('./methods/clientWidth'),
	queryClientHeight = require('./methods/clientHeight'),
	queryScrollX = require('./methods/scrollX'),
	queryScrollY = require('./methods/scrollY'),
	queryMaxScrollX = require('./methods/maxScrollX'),
	queryMaxScrollY = require('./methods/maxScrollY');

module.exports = {

	innerWidth : queryInnerWidth,
	innerHeight : queryInnerHeight,
	clientWidth : queryClientWidth,
	clientHeight : queryClientHeight,
	scrollX : queryScrollX,
	scrollY : queryScrollY,
	maxScrollX : queryMaxScrollX,
	maxScrollY : queryMaxScrollY

};
},{"./methods/clientHeight":107,"./methods/clientWidth":108,"./methods/innerHeight":109,"./methods/innerWidth":110,"./methods/maxScrollX":111,"./methods/maxScrollY":112,"./methods/scrollX":113,"./methods/scrollY":114}],116:[function(require,module,exports){
var ElementTracker = require('./ac-element-tracker/ElementTracker');
module.exports = new ElementTracker();
module.exports.ElementTracker = ElementTracker;

},{"./ac-element-tracker/ElementTracker":117}],117:[function(require,module,exports){
/**
 *  @desc Tracks, reports metrics, and emits events for various elements on the page
 *  @module ElementTracker
 */

'use strict';

var proto;
var ac_Object = require('ac-object');
var ac_dom_nodes = require('ac-dom-nodes');
var ac_dom_metrics = require('ac-dom-metrics');
var ac_Array = require('ac-array');
var windowDelegate = require('ac-window-delegate').WindowDelegate;
var TrackedElement = require('./TrackedElement');
var EventEmitter = require('ac-event-emitter').EventEmitter;

// default autoStart to false because it gives the user a chance to attach their event listeners
// before things start firing events.
var defaultOptions = {
	autoStart: false
};

/**
 * @constructor
 * @name ElementTracker
 * @param {(Array|NodeList)} elements - Array or Nodelist of DOM elements to track
 * @param {Object} [options] - Hash of user defined options
 */
function ElementTracker (elements, options) {

	this.options = ac_Object.clone(defaultOptions);
	this.options = typeof options === 'object' ? ac_Object.extend(this.options, options) : this.options;
	this.windowDelegate = windowDelegate;

	// are we tracking?
	this.tracking = false;

	// array of tracked element objects
	this.elements = [];

	// add elements if we get a valid Element object, Array or NodeList
	if (elements && (Array.isArray(elements) || ac_dom_nodes.isNodeList(elements) || ac_dom_nodes.isElement(elements))) {
		this.addElements(elements);
	}

	// only start if autoStart
	if (this.options.autoStart) {
		this.start();
	}

}

proto = ElementTracker.prototype = ac_Object.create(EventEmitter.prototype);

var nodelistToStringPattern = /^\[object (HTMLCollection|NodeList|Object)\]$/;


/**
 * @desc Accepts single DOM Elements or an array of DOM Elements. Turns DOM Elements into TrackedElement objects and pushes them to this.elements
 * @private
 */
proto._registerElements = function (elements) {
	// make sure we use an array
	elements = [].concat(elements);

	elements.forEach(function (element) {
		// only register elements that are present in the DOM
		if (this._elementInDOM(element)) {
			var trackedElement = new TrackedElement(element);
			// we only want to get this once intially for now
			trackedElement.offsetTop = trackedElement.element.offsetTop;

			this.elements.push(trackedElement);
		}

	}, this);
};


/**
 * @desc Register objects that are already TrackedElement instances. Will accept a single object or an array of objects
 * @private
 */
proto._registerTrackedElements = function (trackedElements) {
	var objects = [].concat(trackedElements);

	objects.forEach(function (object) {
		// only register objects in DOM
		if (this._elementInDOM(object.element)) {
			object.offsetTop = object.element.offsetTop;
			this.elements.push(object);
		}
	}, this);
};

/**
 * @desc returns true if the element is a valid element and exists in the DOM
 * @private
 */
proto._elementInDOM = function (element) {
	var assertion = false;
	var body = document.getElementsByTagName('body')[0];

	if (ac_dom_nodes.isElement(element) && body.contains(element)) {
		assertion = true;
	}

	return assertion;
};

/**
 * @private
 */
proto._onVPChange = function () {
	this.elements.forEach(function (elementObj) {
		this.refreshElementState(elementObj);
	}, this);
};


/**
 * @private
 */
proto._elementPercentInView = function (elementObj) {
	return elementObj.pixelsInView / elementObj.height;
};

/**
 * @private
 */
proto._elementPixelsInView = function (elementObj) {
	// pixels in view will be 0 if none of the conditions below are met
	var pixels = 0;
	var top = elementObj.top;
	var bottom = elementObj.bottom;
	var winHeight = this.windowDelegate.innerHeight();

	// if both element top and bottom extend beyond viewport
	if (top <= 0 && bottom >= winHeight) {
		pixels = winHeight;

	// if element top is in view, but bottom isn't
	} else if (top >= 0 && top < winHeight && bottom > winHeight) {
		pixels = winHeight - top;

	// if element top is not in view, but bottom is
	} else if (top < 0 && (bottom < winHeight && bottom >= 0)) {
		pixels = elementObj.bottom;

	// if element is entirely in view
	} else if (top >= 0 && bottom <= winHeight) {
		pixels = elementObj.height;
	}

	return pixels;
};

/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if is in view, but was not necessarily already in view.
 * @private
 */
proto._ifInView = function (trackedElement, alreadyInView) {
	// if the element enters view
	if (!alreadyInView) {
		trackedElement.trigger('enterview', trackedElement);
	}
};

/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if it was already in view, but not necessarily in view anymore.
 * @private
 */
proto._ifAlreadyInView = function (trackedElement) {
	// if the element exits view
	if (!trackedElement.inView) {
		trackedElement.trigger('exitview', trackedElement);
	}
};

/**
 * Public Methods
 */


/**
 * @name ElementTracker#addElements
 * @desc Add elements to the element index. Accepts single element or array of elements or a nodelist
 * @public
 * @method
 * @param {(Element|Array|NodeList)} collection - A single DOM Element or an array of DOM Elements or a NodeList
 */
proto.addElements = function (collection) {
	collection = ac_dom_nodes.isNodeList(collection) ? ac_Array.toArray(collection) : [].concat(collection);
	collection.forEach(function (element) {
		this.addElement(element);
	}, this);
};

/**
 * @name ElementTracker#addElement
 * @desc Add a single element to be tracked. Pass just the DOM Element to use the default options, or pass an object with properties that match the `TrackedElement` API.
 * @public
 * @method
 * @param {Element} element - A DOM Element object
 * @returns a new instance of a `TrackedElement` object.
 * @throws TypeError if the supplied element is not a valid DOM Element
 */
proto.addElement = function (element) {
	var trackedElement;

	if (ac_dom_nodes.isElement(element)) {
		trackedElement = new TrackedElement(element);
		this._registerTrackedElements(trackedElement);
	}

	return trackedElement;
};

/**
 * @name ElementTracker#removeElement
 * @desc Remove an element object from the element index. Will remove any duplicates of passed element.
 * @public
 * @method
 * @param {(Element|Object)} element - A DOM Element or a valid `TrackedElement` object
 */
proto.removeElement = function (element) {
	var indexes = [];
	var filtered;

	this.elements.forEach(function (elementObj, i) {
		if (elementObj === element || elementObj.element === element) {
			indexes.push(i);
		}
	});

	// remove matched elements at specified indexes
	filtered = this.elements.filter(function (element, i) {
		return indexes.indexOf(i) < 0 ? true : false;
	});

	this.elements = filtered;
};

/**
 * @name ElementTracker#stop
 * @desc Stop tracking. Removes the scroll listener.
 * @public
 * @method
 */
proto.stop = function () {
	if (this.tracking === true) {
		this.tracking = false;
		this.windowDelegate.off('scroll resize orientationchange', this._onVPChange, this);
	}
};

/**
 * @name ElementTracker#start
 * @desc Start tracking. Adds the scroll listener.
 * @public
 * @method
 */
proto.start = function () {
	if (this.tracking === false) {
		this.tracking = true;
		this.windowDelegate.on('scroll resize orientationchange', this._onVPChange, this);
		this.refreshAllElementStates();
	}
};

/**
 * @name ElementTracker#refershAllElementStates
 * @desc Force a metric and state update on all tracked elements
 * @public
 * @method
 */
proto.refreshAllElementStates = function () {
	this.elements.forEach(function (trackedElement) {
		this.refreshElementState(trackedElement);
	}, this);
};

/**
 * @name ElementTracker#refershAllElementStates
 * @desc Force a metric and state update provided tracked element
 * @param {Object} trackedElement - the `TrackedElement` object of the elemet you want to update.
 * @public
 * @method
 * @returns the passed `trackedElement` object
 */
proto.refreshElementState = function (trackedElement) {
	var box = ac_dom_metrics.getBoundingBox(trackedElement.element);
	var alreadyInView = trackedElement.inView;

	trackedElement = ac_Object.extend(trackedElement, box);
	trackedElement.pixelsInView = this._elementPixelsInView(trackedElement);
	trackedElement.percentInView = this._elementPercentInView(trackedElement);
	trackedElement.inView = trackedElement.pixelsInView > 0;

	if (trackedElement.inView) {
		this._ifInView(trackedElement, alreadyInView);
	}

	if (alreadyInView) {
		this._ifAlreadyInView(trackedElement);
	}

	return trackedElement;
};



module.exports = ElementTracker;

},{"./TrackedElement":118,"ac-array":1,"ac-dom-metrics":73,"ac-dom-nodes":23,"ac-event-emitter":121,"ac-object":127,"ac-window-delegate":98}],118:[function(require,module,exports){
/**
 *  @desc Extends DOMEmitter and wraps a DOM Element with metrics related to its position in the viewport.
 *  @module TrackedElement
 */

'use strict';

var proto;
var DOMEmitter = require('ac-dom-emitter').DOMEmitter;
var ac_dom_nodes = require('ac-dom-nodes');
var ac_Object = require('ac-object');

/**
 * @constructor
 * @name TrackedElement
 * @param {Element} element - A valid DOM element
 */
function TrackedElement (element) {

	// if just an element is passed
	if (ac_dom_nodes.isElement(element)) {
		this.element = element;
	} else {
		throw new TypeError('TrackedElement: ' + element + ' is not a valid DOM element');
	}

	// baseline property values
	this.inView = false;
	this.percentInView = 0;
	this.pixelsInView = 0;
	this.offsetTop = 0;
	this.top = 0;
	this.right = 0;
	this.bottom = 0;
	this.left = 0;
	this.width = 0;
	this.height = 0;

	DOMEmitter.call(this, element);

}

proto = TrackedElement.prototype = ac_Object.create(DOMEmitter.prototype);


module.exports = TrackedElement;

},{"ac-dom-emitter":68,"ac-dom-nodes":23,"ac-object":127}],119:[function(require,module,exports){
var ElementEngagement = require('./ac-element-engagement/ElementEngagement');

module.exports = new ElementEngagement();
module.exports.ElementEngagement = ElementEngagement;

},{"./ac-element-engagement/ElementEngagement":120}],120:[function(require,module,exports){
/**
 *  @desc Reports user engagement on tracked elements
 *  @module ElementEngagement
 */

'use strict';

var proto;
var ac_Object = require('ac-object');
var Super = require('ac-element-tracker').ElementTracker;

var trackedElementDefaults = {
	timeToEngage: 500,
	inViewThreshold: 0.75,
	stopOnEngaged: true
};

// defaults for when we decorate the TrackedElement objects
var extendedTrackedElementProps = {
	thresholdEnterTime: 0,
	thresholdExitTime: 0,
	inThreshold: false,
	engaged: false,
	tracking: true
};


/**
 * @constructor
 * @todo Think about implementing real time engagement tracking.
 *         current behavior is to report engagement only on thresholdexit.
 *         This mirrors the current track-section-engagement script.
 * @name ElementEngagement
 */

var ElementEngagement = function () {
	Super.call(this);
};

proto = ElementEngagement.prototype = ac_Object.create(Super.prototype);

/**
 * @desc decorates the TrackedElement instances with ElementEngagement specific properties
 * @private
 */
proto._decorateTrackedElement = function (trackedElement, options) {
	var extendedDefaults;

	// merge user specified options with defaults
	extendedDefaults = ac_Object.defaults(trackedElementDefaults, options || {});
	ac_Object.extend(trackedElement, extendedDefaults);
	ac_Object.extend(trackedElement, extendedTrackedElementProps);
};


/**
 * @desc Adds EventEmitter listeners to an individual TrackedElement object
 * @private
 */
proto._attachElementListeners = function (trackedElement) {
	trackedElement.on('thresholdenter', this._thresholdEnter, this);
	trackedElement.on('thresholdexit', this._thresholdExit, this);
	trackedElement.on('enterview', this._enterView, this);
	trackedElement.on('exitview', this._exitView, this);
};

/**
 * @desc Removes EventEmitter listeners from an individaul TrackedElement object
 * @private
 */
proto._removeElementListeners = function (trackedElement) {
	trackedElement.off('thresholdenter', this._thresholdEnter);
	trackedElement.off('thresholdexit', this._thresholdExit);
	trackedElement.off('enterview', this._enterView);
	trackedElement.off('exitview', this._exitView);
};

/**
 * @desc Attaches EventEmitter listeners to all TrackedElement objects
 * @private
 */
proto._attachAllElementListeners = function () {
	this.elements.forEach(function (trackedElement) {
		if (!trackedElement.stopOnEngaged) {
			this._attachElementListeners(trackedElement);
		} else if (!trackedElement.engaged) {
			this._attachElementListeners(trackedElement);
		}
	}, this);
};

/**
 * @desc Removes EventEmitter listeners from all TrackedElement objects
 * @private
 */
proto._removeAllElementListeners = function () {
	this.elements.forEach(function (trackedElement) {
		this._removeElementListeners(trackedElement);
	}, this);
};


/**
 * @desc is the element in view past its defined threshold? Offset if viewport is >= element height.
 * @private
 */
proto._elementInViewPastThreshold = function (trackedElement) {
	var winHeight = this.windowDelegate.innerHeight();
	var isIt = false;

	// if the whole viewport is filled with the element, then we consider that enough in view
	if (trackedElement.pixelsInView === winHeight) {
		isIt = true;
	} else {
		isIt = (trackedElement.percentInView > trackedElement.inViewThreshold);
	}

	return isIt;
};


/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if is in view, but was not necessarily already in view.
 * @private
 */
proto._ifInView = function (trackedElement, alreadyInView) {
	var alreadyInThreshold = trackedElement.inThreshold;
	Super.prototype._ifInView.apply(this, arguments);

	// if element enters view threshold
	if (!alreadyInThreshold && this._elementInViewPastThreshold(trackedElement)) {
		trackedElement.inThreshold = true;
		trackedElement.trigger('thresholdenter', trackedElement);

		if (typeof trackedElement.timeToEngage === 'number' && trackedElement.timeToEngage >= 0) {
			trackedElement.engagedTimeout = window.setTimeout(this._engaged.bind(this, trackedElement), trackedElement.timeToEngage);
		}
	}
};

/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if it was already in view, but not necessarily in view anymore.
 * @private
 */
proto._ifAlreadyInView = function (trackedElement) {
	var alreadyInThreshold = trackedElement.inThreshold;
	Super.prototype._ifAlreadyInView.apply(this, arguments);

	// if element exits view threshold
	if (alreadyInThreshold && !this._elementInViewPastThreshold(trackedElement)) {
		trackedElement.inThreshold = false;
		trackedElement.trigger('thresholdexit', trackedElement);

		if (trackedElement.engagedTimeout) {
			window.clearTimeout(trackedElement.engagedTimeout);
			trackedElement.engagedTimeout = null;
		}
	}
};

proto._engaged = function (trackedElement) {
	trackedElement.engagedTimeout = null;
	this._elementEngaged(trackedElement);
	trackedElement.trigger('engaged', trackedElement);
	this.trigger('engaged', trackedElement);
};

/**
 * @desc Method that gets fired on EventEmitter 'thresholdenter' event
 * @private
 */
proto._thresholdEnter = function (trackedElement) {
	// replace old values
	trackedElement.thresholdEnterTime = Date.now();
	trackedElement.thresholdExitTime = 0;

	// fire thresholdenter event
	this.trigger('thresholdenter', trackedElement);
};

/**
 * @desc Method that gets fired on EventEmitter 'thresholdexit' event
 * @private
 **/
proto._thresholdExit = function (trackedElement) {
	// set exit time
	trackedElement.thresholdExitTime = Date.now();

	// fire thresholdexit event
	this.trigger('thresholdexit', trackedElement);
};

proto._enterView = function (trackedElement) {
	this.trigger('enterview', trackedElement);
};

proto._exitView = function (trackedElement) {
	this.trigger('exitview', trackedElement);
};

/**
 * @desc Method that fires on EventEmitter 'engaged' event
 * @private
 */
proto._elementEngaged = function (trackedElement) {
	trackedElement.engaged = true;
	// stop tracking element if stopOnEngaged is true
	if (trackedElement.stopOnEngaged) {
		this.stop(trackedElement);
	}
};


/**
 * Public methods
 */

/**
 * @method
 * @public
 * @desc Remove tracking from all elements. Or pass a single TrackedElement object to
 *       remove tracking from only that element.
 * @name ElementEngagement#stop
 * @param {Object} [trackedElement] - A TrackedElement object that is provided to ElementEngagement
 *                                    by ElementTracker.
 */
proto.stop = function (trackedElement) {
	// stop everything
	if (this.tracking && !trackedElement) {
		this._removeAllElementListeners();
		Super.prototype.stop.call(this);
	}

	// just stop tracking the trackedElement
	if (trackedElement && trackedElement.tracking) {
		trackedElement.tracking = false;
		this._removeElementListeners(trackedElement);
	}

};

/**
 * @method
 * @public
 * @desc Start tracking all elements, or pass a single TrackedElement object to start
 *       tracking only that element. Will not resume tracking on elements that have
 *       already been engaged.
 * @name ElementEngagement#start
 * @param {Object} [trackedElement] - A TrackedElement object that is provided to ElementEngagement
 *                                    by ElementTracker.
 */
proto.start = function (trackedElement) {
	// start everything
	if (!trackedElement) {
		this._attachAllElementListeners();
	}

	// just start tracking the trackedElement
	if (trackedElement && !trackedElement.tracking) {
		if (!trackedElement.stopOnEngaged) {
			trackedElement.tracking = true;
			this._attachElementListeners(trackedElement);
		} else if (!trackedElement.engaged) {
			trackedElement.tracking = true;
			this._attachElementListeners(trackedElement);
		}
	}

	// Start tracking if not already. Else, just refresh the elements
	if (!this.tracking) {
		Super.prototype.start.call(this);
	} else {
		this.refreshAllElementStates();
	}

};

// add a single element
proto.addElement = function (element, options) {
	var trackedElement = Super.prototype.addElement.call(this, element);
	this._decorateTrackedElement(trackedElement, options);

	return trackedElement;
};

// add a bunch of elements that all use the same options
proto.addElements = function (collection, options) {
	// call forEach with collection as context to iterate over nodelist or array
	[].forEach.call(collection, function (element) {
		this.addElement(element, options);
	}, this);
};


module.exports = ElementEngagement;

},{"ac-element-tracker":116,"ac-object":127}],121:[function(require,module,exports){
/** 
 * @module ac-event-emitter
 * @author Ronald "Doctor" Jett <rjett@apple.com>
 * @copyright 2014 Apple Inc. All rights reserved.
 */
module.exports.EventEmitter = require('./ac-event-emitter/EventEmitter');
},{"./ac-event-emitter/EventEmitter":122}],122:[function(require,module,exports){
/** 
 * @module ac-event-emitter/EventEmitter
 * @classdesc An object that provides an event system
 */
'use strict';

var propagationName = 'EventEmitter:propagation';

/**
 * @constructor
 */
var EventEmitter = function(context) {
    // we should only create a context property if
    // the user is using EventEmitter through composition
    // and not using it as a part of their prototype chain
    if (context) {
        this.context = context;
    }
};

// shorthand to the prototype 
var proto = EventEmitter.prototype;

// test to see if the instant has an object
// that as been allocated to store events
var getEvents = function() {
    if (!this.hasOwnProperty('_events') && typeof this._events !== 'object') {
        this._events = {};
    }
    return this._events;
};

// @arguments arguments Could be:
//  event Single string event, space seperated string, or map of events/callbacks
//  callback Callback function for space seperated or single events
//  context Context to apply to callbacks when invoked
// @argument register The function that will get called for each event/callback/context
var parseEvents = function(args, register) {
    var event = args[0];
    var callback = args[1];
    var context = args[2];

    // event should be a string or an plain object (not an array or null)
    if ((typeof event !== 'string' && typeof event !== 'object') || event === null || Array.isArray(event)) {
        throw new TypeError('Expecting event name to be a string or object.');
    }

    // ensure that calls to on/once with a string for event names
    // also come with a callback function
    if ((typeof event === 'string') && !callback) {
        throw new Error('Expecting a callback function to be provided.');
    }

    // callback should be a function
    if (callback && (typeof callback !== 'function')) {
        // unless we have a map of events/callbacks, then it could actually
        // be a context object
        if (typeof event === 'object' && typeof callback === 'object') {
            context = callback;
        }
        else {
            throw new TypeError('Expecting callback to be a function.');
        }
    }

    // we have a map of events/callbacks
    if (typeof event === 'object') {
        for (var evt in event) {
            register.call(this, evt, event[evt], context);
        }
    }

    // we have a string of events
    if (typeof event === 'string') {
        event = event.split(' ');
        event.forEach(function(evt) {
            register.call(this, evt, callback, context);
        }, this);
    }
};

// Finds the array of callback objects for 
// a given event name, then executes the provided
// callback for each one of them. Passing the callback
// object and the index.
var each = function(event, callback) {
    var eventsArray;
    var i;
    var length;

    eventsArray = getEvents.call(this)[event];

    if (!eventsArray || eventsArray.length === 0) { 
        return; 
    }

    // copy it in case anything we call tries to modify it
    eventsArray = eventsArray.slice();
    
    // reset this._stoppedImmediatePropagation for the run loop
    this._stoppedImmediatePropagation = false;
    
    for (i = 0, length = eventsArray.length; i < length; i++) {
        // if the event has been stopped via the run loop, break early
        if (this._stoppedImmediatePropagation || callback(eventsArray[i], i)) {
            break;
        }
    }
};

// Remove a callback for a given event
var removeSpecificCallback = function(events, event, callback) {
    // looking for a specific callback
    var i = -1;
    each.call(this, event, function(callbackObject, index) {
        if (callbackObject.callback === callback) {
            i = index;
            return true;
        }
    });

    if(i === -1) {
        return;
    }

    events[event].splice(i, 1);
};


/**
 * A method for adding a callback for a given event
 * @method
 * @param {string} event Event name
 * @param {function} callback A function to invoke when an event is triggered
 * @param {object} [context] A context to bind to the callback
 */
proto.on = function() {
    var events = getEvents.call(this);

    parseEvents.call(this, arguments, function(event, callback, context) {
        events[event] = events[event] || (events[event] = []);
        events[event].push({
            callback: callback,
            context: context
        });
    });

    return this;
};

/**
 * A method for adding a callback for an event that will only execute once
 * and then be removed.
 * @method
 * @param {string} event Event name
 * @param {function} callback A function to invoke when an event is triggered
 * @param {object} [context] A context to bind to the callback
 */
proto.once = function() {
    parseEvents.call(this, arguments, function(event, callback, context) {
        var wrapper = function(data) {
            callback.call(context || this, data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper, this);
    });

    return this;
};

/**
 * A method for removing a callback for a given event
 * If no arguments are specified, all handlers are removed.
 * @method
 * @param {string} [event] Event name
 * @param {function} [callback] A function to remove
 */
proto.off = function(event, callback) {
    var events = getEvents.call(this);

    // if no arguments are specified
    // we will drop all callbacks
    if (arguments.length === 0) {
        this._events = {};
    }
    // event names should be a string
    else if (!event || (typeof event !== 'string' && typeof event !== 'object') || Array.isArray(event)) {
        throw new TypeError('Expecting event name to be a string or object.');
    }

    if (typeof event === 'object') {
        for (var e in event) {
            removeSpecificCallback.call(this, events, e, event[e]);
        }
    }

    // one or more events passed as string
    if (typeof event === 'string') {
        var split = event.split(' ');

        // only one event passed
        if (split.length === 1) {
            // if a callback was specified remove that callback
            if (callback) {
                removeSpecificCallback.call(this, events, event, callback);
            }
            // otherwise, remove all the callbacks for that event
            else {
                events[event] = [];
            }
        }
        // space seperated events passed
        else {
            split.forEach(function(event) {
                events[event] = [];
            });
        }
    }

    return this;
};

/**
 * A method for firing/triggering an event
 * @method
 * @param {string} event Event name
 * @param {object} [data] Data to pass to the listening callbacks
 * @param {boolean} [doNotPropagate] Flag to silence propagation
 */
proto.trigger = function(event, data, doNotPropagate) {
    // you need at least an event
    if (!event) {
        throw new Error('trigger method requires an event name');
    }

    // event names should be a string
    if (typeof event !== 'string') {
        throw new TypeError('Expecting event names to be a string.');
    }

    // doNotPropagate flag should be a boolean
    if (doNotPropagate && typeof doNotPropagate !== 'boolean') {
        throw new TypeError('Expecting doNotPropagate to be a boolean.');
    }

    // split events incase we are trigger multiples with a space delimiter
    event = event.split(' ');

    // loop through the events
    event.forEach(function(evt) {

        // call all the callbacks for the given event
        each.call(this, evt, function(callbackObject) {
            callbackObject.callback.call(callbackObject.context || this.context || this, data);
        }.bind(this));

        // propagate event if anyone else is listening, unless told not to
        if (!doNotPropagate) {
            each.call(this, propagationName, function(propagation) {
                var eventName = evt;

                if (propagation.prefix) {
                    eventName = propagation.prefix + eventName;
                }

                propagation.emitter.trigger(eventName, data);
            });
        }

    }, this);

    return this;
};

/**
 * A method for propagating events to another EventEmitter
 * @method
 * @param {object} eventEmitter An event emitting object to propagate events to
 * @param {string} [prefix] A prefix to be appended to the name of a propagating event
 */
proto.propagateTo = function(eventEmitter, prefix) {
    var events = getEvents.call(this);

    if (!events[propagationName]) {
        this._events[propagationName] = [];
    }

    events[propagationName].push({
        emitter: eventEmitter,
        prefix: prefix
    });
};

/**
 * A method for removing propagation
 * @method
 * @param {object} [eventEmitter] The event emitter to stop propagating to
 */
proto.stopPropagatingTo = function(eventEmitter) {
    var events = getEvents.call(this);

    // If an argument was not specified,
    // all propagations will be removed.
    if (!eventEmitter) {
        events[propagationName] = [];
        return;
    }

    // If an event emitter was passed in,
    // just removed propagation to that object
    var propagationTargets = events[propagationName];
    var length = propagationTargets.length;
    var i;

    for(i = 0; i < length; i++) {
        if (propagationTargets[i].emitter === eventEmitter) {
            propagationTargets.splice(i, 1);
            break;
        }
    }
};

/**
 * A method for cancelling future callbacks from firing in a event trigger loop
 * @method
 */
proto.stopImmediatePropagation = function() {
    this._stoppedImmediatePropagation = true;
};

/**
 * A method for checking whether or not there are callbacks for a given event
 * @method
 * @param {string} evt An event name to check
 * @param {function} [callback] A callback to check for 
 * @parma {object} [context] A particular context
 */
proto.has = function(evt, callback, context) {
    var events = getEvents.call(this);
    var eventsArray = events[evt];

    // return an array of all events if no arguments specified
    if (arguments.length === 0) {
        return Object.keys(events);
    }
    
    // If there's no events, exit.
    if (!eventsArray) {
        return false;
    }

    // If we are not looking for a particular callback,
    // check the length of the events array
    if (!callback) {
        return (eventsArray.length > 0) ? true : false;
    }

    // If we are looking for a particular callback/context, loop through 
    // the array of callbacks for the given event name
    for (var i = 0, length = eventsArray.length; i < length; i++) {
        var callbackContainer = eventsArray[i];

        // looking for both a callback and a context
        if (context && callback && callbackContainer.context === context && callbackContainer.callback === callback) {
            return true;
        }
        // just looking for a callback
        else if (callback && !context && callbackContainer.callback === callback) {
            return true;
        }
    }

    return false;
};

module.exports = EventEmitter;

},{}],123:[function(require,module,exports){
'use strict';

/**
 * @module module:ac-feature
 */
var feature = {
	cssPropertyAvailable: require('./ac-feature/cssPropertyAvailable'),
	localStorageAvailable: require('./ac-feature/localStorageAvailable')
};

var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Returns whether the browser supports the 3d media query
 * @returns {Boolean} whether or not the browser supports the 3d media query
 * @name module:ac-feature.threeDTransformsAvailable
 * @kind function
 */
feature.threeDTransformsAvailable = function () {
	// Memoize previously returned value
	if (typeof this._threeDTransformsAvailable !== 'undefined') {
		return this._threeDTransformsAvailable;
	}

	var div, style;

	try {
		this._threeDTransformsAvailable = false;

		if (hasOwnProp.call(window, 'styleMedia')) {
			this._threeDTransformsAvailable = window.styleMedia.matchMedium('(-webkit-transform-3d)');

		} else if (hasOwnProp.call(window, 'media')) {
			this._threeDTransformsAvailable = window.media.matchMedium('(-webkit-transform-3d)');
		}

		// chrome returns all the values as true, but doesn't actually have 3d support
		if (!this._threeDTransformsAvailable) {
			if (!(style = document.getElementById('supportsThreeDStyle'))) {
				style = document.createElement('style');
				style.id = 'supportsThreeDStyle';
				style.textContent = '@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }';
				document.querySelector('head').appendChild(style);
			}

			if (!(div = document.querySelector('#supportsThreeD'))) {
				div = document.createElement('div');
				div.id = 'supportsThreeD';
				document.body.appendChild(div);
			}
			this._threeDTransformsAvailable = (div.offsetHeight === 3) || style.style['MozTransform'] !== undefined || style.style['WebkitTransform'] !== undefined;
		}

		return this._threeDTransformsAvailable;
	} catch (e) {
		return false;
	}
};

/**
 * Detects whether or not the browser understands the HTML5 Canvas API.
 * @returns {Boolean} true if the browser supports canvas.
 * @name module:ac-feature.canvasAvailable
 * @kind function
 */
feature.canvasAvailable = function () {
	// Memoize previously returned value
	if (typeof this._canvasAvailable !== 'undefined') {
		return this._canvasAvailable;
	}

	var canvas = document.createElement('canvas');

	this._canvasAvailable = !!(typeof canvas.getContext === 'function' && canvas.getContext('2d'));
	return this._canvasAvailable;
};

/**
 * Returns whether the browser supports HTML5 sessionStorage, and
 * does not have privacy mode enabled or cookies turned off.
 * @returns {Boolean} true if the browser supports sessionStorage
 * @name module:ac-feature.sessionStorageAvailable
 * @kind function
 */
feature.sessionStorageAvailable = function () {
	// Memoize previously returned value
	if (typeof this._sessionStorageAvailable !== 'undefined') {
		return this._sessionStorageAvailable;
	}

	try {
		if (typeof window.sessionStorage !== 'undefined' && typeof window.sessionStorage.setItem === 'function') {
			window.sessionStorage.setItem('ac_browser_detect', 'test');
			this._sessionStorageAvailable = true;
			window.sessionStorage.removeItem('ac_browser_detect', 'test');
		} else {
			this._sessionStorageAvailable = false;
		}
	} catch (e) {
		this._sessionStorageAvailable = false;
	}
	return this._sessionStorageAvailable;
};

/**
 * Returns whether the browser has cookies enabled.
 * @returns {Boolean} true if cookies are enabled.
 * @name module:ac-feature.cookiesAvailable
 * @kind function
 */
feature.cookiesAvailable = function () {
	// Memoize previously returned value
	if (typeof this._cookiesAvailable !== 'undefined') {
		return this._cookiesAvailable;
	}
	this._cookiesAvailable = (hasOwnProp.call(document, 'cookie') && !!navigator.cookieEnabled) ? true : false;
	return this._cookiesAvailable;
};


// Some devices swap the width/height when in landscape, so we want to make
// sure we're always reporting width as the lesser value. Except when the
// device isn't orientable, then we want to honor window.screen.width.
/** @ignore */
feature.__normalizedScreenWidth = function () {
	// We only care if the device is orientable
	if (typeof window.orientation === 'undefined') {
		return window.screen.width;
	}
	return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
};

/**
 * Tests for touch support on the device.
 * DocumentTouch is specific to Firefox <25 support.
 * @returns {Boolean} true if the device supports touch.
 * @name module:ac-feature.touchAvailable
 * @kind function
 */
feature.touchAvailable = function () {
	return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
};

/**
 * Attempts to determine if device is a desktop. The test is based on the assumptions
 * that desktop machines don't support touch and aren't orientable
 * @returns {Boolean} true if device has no support for touch and orientation
 * @name module:ac-feature.isDesktop
 * @kind function
 */
feature.isDesktop = function () {
	if (!this.touchAvailable() && !window.orientation) {
		return true;
	}
	return false;
};

/**
 * Attempts to determine if device is handheld. e.g. phones and iPod Touches.
 * The test is based on the value of module:ac-feature.isDesktop() and
 * if the device screen width is less than or equal to 480 pixels.
 * @returns {Boolean} true if the device is determined to be handheld
 * @name module:ac-feature.isHandheld
 * @kind function
 */
feature.isHandheld = function () {
	return !this.isDesktop() && !this.isTablet();
};

/**
 * Attempts to determine if device is a tablet. i.e. iPad or Nexus 7.
 * The test is based on the value of module:ac-feature.isDesktop() and
 * if the device screen width is greater than 480 pixels.
 * @returns {Boolean} true if the device is determined to be a tablet
 * @name module:ac-feature.isTablet
 * @kind function
 */
feature.isTablet = function () {
	return !this.isDesktop() && this.__normalizedScreenWidth() > 480;
};

/**
 * Attempts to determine whether the display is retina.
 * @returns {Boolean} true if DPR is determined to be greater than or equal to 1.5
 * @name module:ac-feature.isRetina
 * @kind function
 */
feature.isRetina = function () {
	// Vendor prefixes and media queries for DPR detection are a mess
	var mediaQueryStrings = [
		'min-device-pixel-ratio:1.5',
		'-webkit-min-device-pixel-ratio:1.5',
		'min-resolution:1.5dppx',
		'min-resolution:144dpi',
		'min--moz-device-pixel-ratio:1.5'
	];
	var i;

	// Use devicePixelRatio if available
	if (window.devicePixelRatio !== undefined) {
		if (window.devicePixelRatio >= 1.5) {
			return true;
		}

	// Else resort to matchMedia
	} else {
		for (i = 0; i < mediaQueryStrings.length; i += 1) {
			if (window.matchMedia('(' + mediaQueryStrings[i] + ')').matches === true) {
				return true;
			}
		}
	}

	// Otherwise return false
	return false;
};

/**
 * Browser support for SVG in background images very closely matches that of SVG in <img> tags.
 * Detecting this feature checks for support as both inline and background images.
 * @returns {Boolean} true if SVG support is available
 * @name module:ac-feature.svgAvailable
 * @kind function
 */
feature.svgAvailable = function () {
	return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
};

module.exports = feature;

},{"./ac-feature/cssPropertyAvailable":124,"./ac-feature/localStorageAvailable":125}],124:[function(require,module,exports){
'use strict';

var style = null;
var prefixes = null;
var preFixes = null;
var css = null;

/**
 * Sets all the vendor specific style property to value on element.
 * @param {String} property The CSS property to test, can be of the form: webkitBorderRadius, mozBorderRadius, etc.; borderRadius -webkit-border-radius, -moz-border-radius, etc.; border-radius
 * @returns true if the current browser supports the given CSS property, otherwise, returns false.
 * @name module:ac-feature.cssPropertyAvailable
 * @kind function
 */
module.exports = function (property) {

	if (style === null) {
		style = document.createElement('browserdetect').style;
	}
	if (prefixes === null) {
		prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', '-khtml-', ''];
	}
	if (preFixes === null) {
		preFixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml', ''];
	}
	if (css === null) {
		css = {};
	}

	property = property.replace(/([A-Z]+)([A-Z][a-z])/g, '$1\\-$2').replace(/([a-z\d])([A-Z])/g, '$1\\-$2').replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, '').toLowerCase();
	switch (property) {
	case 'gradient':
		if (css.gradient !== undefined) {
			return css.gradient;
		}

		property = 'background-image:';
		var value1 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';
		var value2 = 'linear-gradient(left top,#9f9, white);';

		style.cssText = (property + prefixes.join(value1 + property) + prefixes.join(value2 + property)).slice(0, -property.length);
		css.gradient = (style.backgroundImage.indexOf('gradient') !== -1);
		return css.gradient;

	case 'inset-box-shadow':
		if (css['inset-box-shadow'] !== undefined) {
			return css['inset-box-shadow'];
		}

		property = 'box-shadow:';
		var value = '#fff 0 1px 1px inset;';

		style.cssText = prefixes.join(property + value);
		css['inset-box-shadow'] = (style.cssText.indexOf('inset') !== -1);
		return css['inset-box-shadow'];

	default:
		var properties = property.split('-');
		var length = properties.length;
		var Property;
		var i;
		var j;

		if (properties.length > 0) {
			property = properties[0];
			for (i = 1; i < length; i += 1) {
				property += properties[i].substr(0, 1).toUpperCase() + properties[i].substr(1);
			}
		}
		Property = property.substr(0, 1).toUpperCase() + property.substr(1);

		if (css[property] !== undefined) {
			return css[property];
		}

		for (j = preFixes.length - 1; j >= 0; j -= 1) {
			if (style[preFixes[j] + property] !== undefined || style[preFixes[j] + Property] !== undefined) {
				css[property] = true;
				return true;
			}
		}
		return false;
	}
};

},{}],125:[function(require,module,exports){
'use strict';

var isAvailable = null;

/**
 * Returns whether the browser supports HTML5 localStorage, and
 * does not have privacy mode enabled or cookies turned off.
 * NOTE: Does not support Firefox <= 13 because of a bug where Firefox interprets a nonexistent item as null instead of undefined
 * @returns {Boolean} true if the browser supports localStorage
 * @name module:ac-feature.localStorageAvailable
 * @kind function
 */
module.exports = function localStorageAvailable() {
	// Memoize previously returned value
	if (isAvailable === null) {
		isAvailable = !!(window.localStorage && window.localStorage.non_existent !== null);
	}
	return isAvailable;
};

},{}],126:[function(require,module,exports){
/**
 * Object#toString() ref for stringify().
 */

var toString = Object.prototype.toString;

/**
 * Object#hasOwnProperty ref
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Array#indexOf shim.
 */

var indexOf = typeof Array.prototype.indexOf === 'function'
  ? function(arr, el) { return arr.indexOf(el); }
  : function(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === el) return i;
      }
      return -1;
    };

/**
 * Array.isArray shim.
 */

var isArray = Array.isArray || function(arr) {
  return toString.call(arr) == '[object Array]';
};

/**
 * Object.keys shim.
 */

var objectKeys = Object.keys || function(obj) {
  var ret = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret.push(key);
    }
  }
  return ret;
};

/**
 * Array#forEach shim.
 */

var forEach = typeof Array.prototype.forEach === 'function'
  ? function(arr, fn) { return arr.forEach(fn); }
  : function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i]);
    };

/**
 * Array#reduce shim.
 */

var reduce = function(arr, fn, initial) {
  if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
  var res = initial;
  for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
  return res;
};

/**
 * Cache non-integer test regexp.
 */

var isint = /^[0-9]+$/;

function promote(parent, key) {
  if (parent[key].length == 0) return parent[key] = {}
  var t = {};
  for (var i in parent[key]) {
    if (hasOwnProperty.call(parent[key], i)) {
      t[i] = parent[key][i];
    }
  }
  parent[key] = t;
  return t;
}

function parse(parts, parent, key, val) {
  var part = parts.shift();

  // illegal
  if (hasOwnProperty.call(Object.prototype, key)) return;

  // end
  if (!part) {
    if (isArray(parent[key])) {
      parent[key].push(val);
    } else if ('object' == typeof parent[key]) {
      parent[key] = val;
    } else if ('undefined' == typeof parent[key]) {
      parent[key] = val;
    } else {
      parent[key] = [parent[key], val];
    }
    // array
  } else {
    var obj = parent[key] = parent[key] || [];
    if (']' == part) {
      if (isArray(obj)) {
        if ('' != val) obj.push(val);
      } else if ('object' == typeof obj) {
        obj[objectKeys(obj).length] = val;
      } else {
        obj = parent[key] = [parent[key], val];
      }
      // prop
    } else if (~indexOf(part, ']')) {
      part = part.substr(0, part.length - 1);
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
      // key
    } else {
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
    }
  }
}

/**
 * Merge parent key/val pair.
 */

function merge(parent, key, val){
  if (~indexOf(key, ']')) {
    var parts = key.split('[')
      , len = parts.length
      , last = len - 1;
    parse(parts, parent, 'base', val);
    // optimize
  } else {
    if (!isint.test(key) && isArray(parent.base)) {
      var t = {};
      for (var k in parent.base) t[k] = parent.base[k];
      parent.base = t;
    }
    set(parent.base, key, val);
  }

  return parent;
}

/**
 * Compact sparse arrays.
 */

function compact(obj) {
  if ('object' != typeof obj) return obj;

  if (isArray(obj)) {
    var ret = [];

    for (var i in obj) {
      if (hasOwnProperty.call(obj, i)) {
        ret.push(obj[i]);
      }
    }

    return ret;
  }

  for (var key in obj) {
    obj[key] = compact(obj[key]);
  }

  return obj;
}

/**
 * Parse the given obj.
 */

function parseObject(obj){
  var ret = { base: {} };

  forEach(objectKeys(obj), function(name){
    merge(ret, name, obj[name]);
  });

  return compact(ret.base);
}

/**
 * Parse the given str.
 */

function parseString(str){
  var ret = reduce(String(str).split('&'), function(ret, pair){
    var eql = indexOf(pair, '=')
      , brace = lastBraceInKey(pair)
      , key = pair.substr(0, brace || eql)
      , val = pair.substr(brace || eql, pair.length)
      , val = val.substr(indexOf(val, '=') + 1, val.length);

    // ?foo
    if ('' == key) key = pair, val = '';
    if ('' == key) return ret;

    return merge(ret, decode(key), decode(val));
  }, { base: {} }).base;

  return compact(ret);
}

/**
 * Parse the given query `str` or `obj`, returning an object.
 *
 * @param {String} str | {Object} obj
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if (null == str || '' == str) return {};
  return 'object' == typeof str
    ? parseObject(str)
    : parseString(str);
};

/**
 * Turn the given `obj` into a query string
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

var stringify = exports.stringify = function(obj, prefix) {
  if (isArray(obj)) {
    return stringifyArray(obj, prefix);
  } else if ('[object Object]' == toString.call(obj)) {
    return stringifyObject(obj, prefix);
  } else if ('string' == typeof obj) {
    return stringifyString(obj, prefix);
  } else {
    return prefix + '=' + encodeURIComponent(String(obj));
  }
};

/**
 * Stringify the given `str`.
 *
 * @param {String} str
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyString(str, prefix) {
  if (!prefix) throw new TypeError('stringify expects an object');
  return prefix + '=' + encodeURIComponent(str);
}

/**
 * Stringify the given `arr`.
 *
 * @param {Array} arr
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyArray(arr, prefix) {
  var ret = [];
  if (!prefix) throw new TypeError('stringify expects an object');
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[' + i + ']'));
  }
  return ret.join('&');
}

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyObject(obj, prefix) {
  var ret = []
    , keys = objectKeys(obj)
    , key;

  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    if ('' == key) continue;
    if (null == obj[key]) {
      ret.push(encodeURIComponent(key) + '=');
    } else {
      ret.push(stringify(obj[key], prefix
        ? prefix + '[' + encodeURIComponent(key) + ']'
        : encodeURIComponent(key)));
    }
  }

  return ret.join('&');
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (hasOwnProperty.call(Object.prototype, key)) return;
  if (undefined === v) {
    obj[key] = val;
  } else if (isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length
    , brace
    , c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' == c) brace = false;
    if ('[' == c) brace = true;
    if ('=' == c && !brace) return i;
  }
}

/**
 * Decode `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function decode(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (err) {
    return str;
  }
}

},{}],127:[function(require,module,exports){
/**
 * @module ac-object
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	clone: require('./ac-object/clone'),
	create: require('./ac-object/create'),
	defaults: require('./ac-object/defaults'),
	extend: require('./ac-object/extend'),
	getPrototypeOf: require('./ac-object/getPrototypeOf'),
	isDate: require('./ac-object/isDate'),
	isEmpty: require('./ac-object/isEmpty'),
	isRegExp: require('./ac-object/isRegExp'),
	toQueryParameters: require('./ac-object/toQueryParameters')
};

},{"./ac-object/clone":128,"./ac-object/create":129,"./ac-object/defaults":130,"./ac-object/extend":131,"./ac-object/getPrototypeOf":132,"./ac-object/isDate":133,"./ac-object/isEmpty":134,"./ac-object/isRegExp":135,"./ac-object/toQueryParameters":136}],128:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var extend = require('./extend');

/**
 * @name module:ac-object.clone
 *
 * @function
 * 
 * @desc Create a new Object that has the same properties as the original.
 *
 * @param {Object} object
 *        The Object to make a clone of.
 *
 * @returns {Object} The cloned object.
 */
module.exports = function clone (object) {
	return extend({}, object);
};

},{"./extend":131}],129:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var F = function () {};

/**
 * @name module:ac-object.create
 *
 * @function
 *
 * @desc Create a new Object who’s prototype is the object passed
 *
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *
 * @param {Object} proto
 *        The prototype for the new Object
 *
 * @returns {Object} The new Object
 */
module.exports = function create(proto) {
	// Don’t support second argument because it is not possible to accurately polyfill
	if (arguments.length > 1) {
		throw new Error('Second argument not supported');
	}

	// Prototype object is required
	if (proto === null || typeof proto !== 'object') {
		throw new TypeError('Object prototype may only be an Object.');
	}

	// If native Object.create exists, use it!
	if (typeof Object.create === 'function') {
		return Object.create(proto);

	// Otherwise create a new Object F with the prototype provided assigned to it
	} else {
		F.prototype = proto;
		return new F();
	}
};

},{}],130:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var extend = require('./extend');

/**
 * @name module:ac-object.defaults
 *
 * @function
 * 
 * @desc Combines defaults and options into a new object and returns it.
 *
 * @param {Object} defaultsObj
 *        The defaults object.
 *
 * @param {Object} options
 *        The options object.
 *
 * @returns {Object} An object resulting from the combination of defaults and options.
 */
module.exports = function defaults (defaultsObj, options) {
	if (typeof defaultsObj !== 'object'){
		throw new TypeError('defaults: must provide a defaults object');
	}
	options = options || {};
	if (typeof options !== 'object'){
		throw new TypeError('defaults: options must be a typeof object');
	}
	return extend({}, defaultsObj, options);
};

},{"./extend":131}],131:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.extend
 *
 * @function
 * 
 * @desc Add properties from one object into another. Not a deep copy.
 *
 * @param {Object} destination
 *        The object where the properties will end up. Properties in this Object
 *        that have the same key as properties in the source object will be
 *        overwritten with the source property’s value. If destination is not
 *        provided a blank object is created.
 *
 * @param {Object} source
 *        The properties to add / overwrite in the destination Object. An infinite
 *        number of source paramaters may be passed.
 *
 * @returns {Object} The extended object.
 */
module.exports = function extend () {
	var args;
	var dest;

	if (arguments.length < 2) {
		args = [{}, arguments[0]];
	} else {
		args = [].slice.call(arguments);
	}

	dest = args.shift();

	args.forEach(function (source) {
		if (source != null) {
			for (var property in source) {
				// Anything that does not prototype Object will not have this method
				if (hasOwnProp.call(source, property)) {
					dest[property] = source[property];
				}
			}
		}
	});

	return dest;	
};

},{}],132:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.getPrototypeOf
 *
 * @function
 * 
 * @desc Returns the prototype (i.e. the internal [[Prototype]]) of the specified object.
 *
 * @param {Object} obj
 *        The object whose prototype is to be returned.
 *
 * @returns {Object} The prototype of the specified object.
 */
module.exports = function getPrototypeOf (obj) {
	if (Object.getPrototypeOf) {
		return Object.getPrototypeOf(obj);
	}
	else {
		if (typeof obj !== 'object') {
			throw new Error('Requested prototype of a value that is not an object.');
		}
		else if (typeof this.__proto__ === 'object') {
			return obj.__proto__;
		}
		else {
			var constructor = obj.constructor;
			var oldConstructor;
			if (hasOwnProp.call(obj, 'constructor')) {
				oldConstructor = constructor;
				// reset constructor
				if (!(delete obj.constructor)) {
					// can't delete obj.constructor, return null
					return null;
				}
				// get real constructor
				constructor = obj.constructor;
				// restore constructor
				obj.constructor = oldConstructor;
			}
			// needed for IE
			return constructor ? constructor.prototype : null;
		}
	}
};

},{}],133:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-object.isDate
 *
 * @function
 * 
 * @desc Test an Object to see if it is an instance of the Date constructor or not.
 *
 * @param {Object} date
 *        The Object to test.
 *
 * @returns {Boolean} If the Object is a Date or not.
 */
module.exports = function isDate (date) {
	return Object.prototype.toString.call(date) === '[object Date]';
};

},{}],134:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.isEmpty
 *
 * @function
 * 
 * @desc Check if an empty object.
 *
 * @param {Object} object
 *        The Object to check if empty.
 *
 * @returns {Boolean} Return true if and only if object is empty ({}).
 */
module.exports = function isEmpty (object) {
	var prop;

	if (typeof object !== 'object') {
		throw new TypeError('ac-base.Object.isEmpty : Invalid parameter - expected object');
	}

	for (prop in object) {
		if (hasOwnProp.call(object, prop)) {
			return false;
		}
	}

	return true;
};

},{}],135:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-object.isRegExp
 *
 * @function
 * 
 * @desc Test whether or not an Object is a Regular Expression.
 *
 * @param {Object} obj
 *        Object to test whether or not it is a Regular Expression.
 *
 * @returns {Boolean} Whether or not it is a Regular Expression.
 */
module.exports = function isRegExp (obj) {
	return window.RegExp ? obj instanceof RegExp : false;
};

},{}],136:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var qs = require('qs');

/**
 * @name module:ac-object.toQueryParameters
 *
 * @function
 * 
 * @desc Convert object to query string.
 *
 * @param {Object} object
 *        The Object to convert to a query string.
 *
 * @returns {String} Returns query string representation of object.
 */
module.exports = function toQueryParameters (object) {
	if (typeof object !== 'object'){
		throw new TypeError('toQueryParameters error: argument is not an object');
	}
	return qs.stringify(object);
};

},{"qs":126}],137:[function(require,module,exports){
'use strict';

var sCode = require('./s-code/s-code');
var plugins = require('./s-code/plugins');

// exported `sCode` is a function that gets passed the
// `s_account` variable, which is a string.
// once the function is executed, all the `s` variables
// will be available on the window.
//
// The plugins.init method can then be ran.
// pass the result of the sCode function plugins.init
module.exports.init = sCode;
module.exports.plugins = plugins;

},{"./s-code/plugins":138,"./s-code/s-code":151}],138:[function(require,module,exports){
'use strict';

function init (sCode) {
	// utilities
	require('./plugins/utilities/utilities')(sCode);

	// require all plugins
	require('./plugins/customLinkHandler')(sCode);
	require('./plugins/detectRIA')(sCode);
	require('./plugins/deviceOrientationChanges')(sCode);
	require('./plugins/downloadLinkHandler')(sCode);
	require('./plugins/getAndPersistValue')(sCode);
	require('./plugins/getPercentPageViewed')(sCode);
	require('./plugins/getPreviousValue')(sCode);
	require('./plugins/getQueryParam')(sCode);
	require('./plugins/getValOnce')(sCode);
	require('./plugins/setClickMapEmail')(sCode);
	require('./plugins/setDynamicObjectIDs')(sCode);
}

module.exports.init = init;

},{"./plugins/customLinkHandler":139,"./plugins/detectRIA":140,"./plugins/deviceOrientationChanges":141,"./plugins/downloadLinkHandler":142,"./plugins/getAndPersistValue":143,"./plugins/getPercentPageViewed":144,"./plugins/getPreviousValue":145,"./plugins/getQueryParam":146,"./plugins/getValOnce":147,"./plugins/setClickMapEmail":148,"./plugins/setDynamicObjectIDs":149,"./plugins/utilities/utilities":150}],139:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: linkHandler 0.5 - identify and report custom links
	 */
	sCode.linkHandler = new Function("p", "t", "" + "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN" + "ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h." + "substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam" + "e=l=='[['?'':l;s.linkType=t;return h;}return '';");

	sCode.p_gn = new Function("t", "h", "" + "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=" + "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}" + "return 0;");

};

},{}],140:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {
	/*
	 * Plugin: detectRIA v0.1 - detect and set Flash, Silverlight versions
	 */
	sCode.detectRIA = new Function("cn", "fp", "sp", "mfv", "msv", "sf", "" + "cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-" + "1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc'," + "'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin" + "g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u" + "k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)" + "{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['" + "Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16" + ",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len" + "gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript" + "ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)" + "{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}" + "if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec" + "Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri" + "pt('on error resume next: result = IsObject(CreateObject(\"Shockwav" + "eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'Flas" + "h Not Detected':fv==0?'Flash Enabled (No Version)':'Flash '+fv;}if(" + "!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'" + "+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'" + "+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'" + "+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'" + "+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('" + "+'e){}}';eval(tc);sr=sv==''?'Silverlight Not Detected':'Silverlight" + " '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;" + "if(sr)s[sp]=sr;}}");

};

},{}],141:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: deviceOrientationChanges v1.1
	 *
	 */
	sCode.p_oc = new Function("evt", "" + "var o=s.wd.orientation,ot=(Math.abs(o)==90)?'l':'p',cv,v;s.lc=(evt." + "type=='load')?s.lc+1:s.lc;if(s.lc==0)return;if(typeof(o)!='undefine" + "d'){ot=(evt.type=='load')?ot:ot+':'+s.c_r('s_orientationHeight');cv" + "=s.c_r('s_orientation');v=cv?cv+=','+ot:ot;s.c_w('s_orientation',v)" + "}");

	sCode.p_och = new Function("", "" + "var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement." + "scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of" + "fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie" + "ntHeight));vph=s.wd.innerHeight||(s.d.documentElement.clientHeight|" + "|s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documen" + "tElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph;s.c_w('" + "s_orientationHeight',vh);");

	sCode.deviceOrientationChanges = new Function("ext", "" + "var s=this,v;s.lc=0;if(typeof(s.linkType)!='undefined'&&s.linkType!" + "='e')return'';var cv=s.c_r('s_orientation'),cva=(cv.indexOf(',')>-1" + ")?cv.split(','):'';if(cv){if(cva){if(!ext){for(i=1;i<cva.length;i++" + "){cva[i]=cva[i].split(':')[0];}}cva[0]+='@s';cva.push(cva[cva.lengt" + "h-1].split(':')[0]+'@e');v=cva.toString();}else{v=cv+'@s,'+cv+'@e';" + "}}s.c_w('s_orientation','');if(s.wd.addEventListener){s.wd.addEvent" + "Listener('orientationchange',s.p_oc,false);s.wd.addEventListener('l" + "oad',s.p_oc,false);s.wd.addEventListener('load',s.p_och,false);s.wd" + ".addEventListener('scroll',s.p_och,false);}return v;");

};

},{}],142:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {
	/*
	 * Plugin: downloadLinkHandler 0.5 - identify and report download links
	 */
	sCode.downloadLinkHandler = new Function("p", "" + "var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT" + "ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;" + "if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");

};

},{}],143:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getAndPersistValue 0.3 - get a value on every page
	 */
	sCode.getAndPersistValue = new Function("v", "c", "e", "" + "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(" + "v)s.c_w(c,v,e?a:0);return s.c_r(c);");
	sCode.__se = new Function("" + "var l={'~':'tl:[\\'','^': 'kw:[\\'','%': 'ahoo','|': '\\'],','>': '" + "\\']}','*': '.com','$': 'search',';':'query','#':'land','`':'oogle'" + ",'+':'http://www','<':'keyword'};var f=this.___se+'';var g='';for(v" + "ar i=0;i<f.length;i++){if(l[f.substring(i,i+1)]&&typeof l[f.substri" + "ng(i,i+1)]!='undefined'){g+=l[f.substring(i,i+1)];}else{g+=f.substr" + "ing(i,i+1);}}return eval('('+g+')');");
	sCode.___se = "{}";

	sCode.isEntry = new Function("" + "var s=this;var l=s.linkInternalFilters,r=s.referrer||typeof s.refer" + "rer!='undefined'?s.referrer:document.referrer,p=l.indexOf(','),b=0," + "v='';if(!r){return 1;}while(p=l.indexOf(',')){v=p>-1?l.substring(b," + "p):l;if(v=='.'||r.indexOf(v)>-1){return 0;}if(p==-1){break;}b=p+1;l" + "=l.substring(b,l.length);}return 1;");

	sCode.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");

};

},{}],144:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getPercentPageViewed v1.4 *** Modified for Apple ***
	 */
	sCode.handlePPVevents = new Function("", "" + "if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeigh" + "t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight," + "s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s." + "d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documen" + "tElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||" + "(s.wd.document.documentElement.scrollTop||s.wd.document.body.scroll" + "Top),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_pp" + "v'),a=(c.indexOf(',')>-1)?c.split(',',5):[],id=(a.length>0)?(a[0]):" + "escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>" + "2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),pt=s._ct," + "ph=s._ch,t=new Date;t.setTime(t.getTime()+1800000);s._ct=new Date()" + ".getTime();s._ch=vh;var sa='',td=Math.round((s._ct-pt)/1000),hd=Mat" + "h.abs(s._ch-ph),lowerBound,upperBound;if(hd&&td){lowerBound=Math.ce" + "il(st/100)*100;upperBound=Math.ceil(s._ch/100)*100;while(lowerBound" + "<=upperBound){if(lowerBound!=0){var value=lowerBound+':'+(td>10?'>'" + ":td);if(s.pxViewedArray.length==0){s.pxViewedArray.push(value);}els" + "e if(s.pxViewedArray.toString().indexOf(lowerBound)==-1){s.pxViewed" + "Array.push(value);}else{for(i=0;i<s.pxViewedArray.length;i++){var a" + "v=s.pxViewedArray[i].split(':');if(lowerBound==av[0]){if(av[1]!='>'" + "){var totalTime=Math.floor((Number(av[1])+Number(td))*100)/100;if(t" + "otalTime>10){totalTime='>';}s.pxViewedArray[i]=av[0]+':'+totalTime;" + "}break;}}}}lowerBound=lowerBound+100;s.pxViewedArray.sort(function(" + "a,b){return parseInt(a)-parseInt(b)});}}sa=s.pxViewedArray.toString" + "().replace(/,/g,'|');cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+(" + "(vh>cy)?vh:cy)+','+((sa)?sa:'')):'';s.c_w('s_ppv',cn,t);");

	sCode.getPercentPageViewed = new Function("pid", "" + "pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false,t=new Date;t." + "setTime(t.getTime()+1800000);if(typeof(s.linkType)!='undefined'&&s." + "linkType!='e')return'';var v=s.c_r('s_ppv'),a=(v.indexOf(',')>-1)?v" + ".split(',',5):[];if(a.length<5){for(var i=4;i>0;i--){a[i]=(i<a.leng" + "th)?(a[i-1]):('');}a[0]='';}a[0]=unescape(a[0]);s.getPPVpid=pid;s.c" + "_w('s_ppv',escape(pid),t);s.pxViewedArray=[];if(ist){s.getPPVid=(pi" + "d)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('s_pp" + "v',escape(s.getPPVid),0);if(s.wd.addEventListener){s.wd.addEventLis" + "tener('load',s.handlePPVevents,false);s.wd.addEventListener('scroll" + "',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handleP" + "PVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload" + "',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevents)" + ";s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-')?" + "(a):(a[1]);");

};

},{}],145:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getPreviousValue_v1.0 - return previous value of designated
	 *   variable (requires split utility)
	 */
	sCode.getPreviousValue = new Function("v", "c", "el", "" + "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" + "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" + "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

};

},{}],146:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getQueryParam 2.3
	 */
	sCode.getQueryParam = new Function("p", "d", "u", "" + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati" + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p" + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-" + "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i=" + "=p.length?i:i+1)}return v");

	sCode.p_gpv = new Function("k", "u", "" + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v" + "=s.pt(q,'&','p_gvf',k)}return v");

	sCode.p_gvf = new Function("t", "k", "" + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T" + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s." + "epa(v)}return ''");

};

},{}],147:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getValOnce_v1.0
	 */
	sCode.getValOnce = new Function("v", "c", "e", "" + "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c" + ");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return" + " v==k?'':v");

};

},{}],148:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: setClickMapEmail v1.3 - sets ClickMap variables w/ q-string values
	 */
	sCode.setClickMapEmail = new Function("qp", "ot", "" + "var s=this,v=s.getQueryParam(qp,'~'),d,pn,oid,ot=s.getQueryParam(ot)" + ",ot=ot?ot:'A',cv;d=v.indexOf('~');if(!v)return '';if(d>-1){pn=v.subs" + "tring(0,d);oid=v.substring(d+1);}cv='&pid='+s.ape(s.fl(pn,255))+'&pi" + "dt=1&oid='+s.ape(s.fl(oid,100))+'&oidt=1&ot='+ot+'&oi=1';s.sq(cv);");

};

},{}],149:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
	 *********** MODIFIED FOR APPLE (DO NOT REPLACE) **************
	 */

	sCode.setupDynamicObjectIDs = new Function("" + "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv" + ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else" + " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa" + "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho" + "re=1}");

	sCode.setOIDs = new Function("e", "" + "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i" + ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)" + "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];" + "if(s._isSafari){s.acAnalytics.dynamicObjectIdHandlerSafari(s, l);}" + "c=l[o]?''+l[o]:'';b" + "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_" + "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re" + "pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';" + "if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0" + ")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this." + "s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o" + "]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

};

},{}],150:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/************************ Utility Functions for Plugins ***************************/
	/*
	 * Utility manageVars v0.2 - clear variable values (requires split 1.5)
	 */
	sCode.manageVars = new Function("c", "l", "f", "" + "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa" + "geName,purchaseID,channel,server,pageType,campaign,state,zip,events" + ",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar" + "'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl" + "it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l" + "a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}" + "}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0" + ");return true;}else{return false;}");

	sCode.clearVars = new Function("t", "var s=this;s[t]='';");

	sCode.lowercaseVars = new Function("t", "" + "var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index" + "Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

	/*
	 * s.join: 1.0 - s.join(v,p)
	 */
	sCode.join = new Function("v", "p", "" + "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back" + ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0" + ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el" + "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

	/*
	 * Utility Function: p_fo - required for detectRIA
	 */
	sCode.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");

	/*
	 * Utility Function: p_gh
	 */
	sCode.p_gh = new Function("" + "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot(" + "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){" + "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s." + "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

	/*
	 * Plugin Utility: apl v1.1
	 */
	sCode.apl = new Function("L", "v", "d", "u", "" + "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a." + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" + "e()));}}if(!m)L=L?L+d+v:v;return L");

	/*
	 * Plugin Utility: Replace v1.0
	 */
	sCode.repl = new Function("x", "o", "n", "" + "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x." + "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

	/*
	 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
	 */
	sCode.split = new Function("l", "d", "" + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

	/*
	 * Utility Function: vpr - set the variable vs with value v
	 */
	sCode.vpr = new Function("vs", "v", "if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

};

},{}],151:[function(require,module,exports){
(function () {

'use strict';

/**
* @ SiteCatalyst code version: H.27.
* @ Copyright 1996-2014 Adobe, Inc. All Rights Reserved. More info available at http://www.omniture.com
* @Name: s_code { by Adobe }
* @Description: Creates the script tag and injects scode on the page.
* @Event: { window.onload }
*/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x)"
+";for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+',"
+"'%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+"
+"x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescap"
+"e(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z"
+"+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,"
+"2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f"
+");return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibi"
+"litychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while("
+"s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s"
+".sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.link"
+"Type=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,"
+"n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.'"
+",'c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?"
+"c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60)"
+";if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');"
+"return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l"
+"[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf="
+"new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.w"
+"d,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;r"
+"eturn true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s."
+"tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for("
+"n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingS"
+"erverBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLower"
+"Case();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.versio"
+"n+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!"
+"s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r"
+";return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[im"
+"n];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s."
+"nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s"
+"_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.g"
+"etTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v"
+"]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l="
+"0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='http"
+"s://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',"
+"p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c"
+";else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData"
+"\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nf"
+"n=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk"
+"=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLig"
+"htData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp"
+"=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return q"
+"s};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe="
+"s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if("
+"fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||"
+"fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';el"
+"se if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL')"
+"{q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigration"
+"Key')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}e"
+"lse if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='coo"
+"kieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='r"
+"esolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='bro"
+"wserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';"
+"else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q="
+"'mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k]"
+",fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'"
+"?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0"
+",qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h"
+"){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h"
+"))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';"
+"return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.di"
+"spatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s."
+"_in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForc"
+"edLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target"
+";while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0"
+";t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}c"
+"atch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,"
+"e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePr"
+"opagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||("
+"j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!"
+"='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():"
+"'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;i"
+"f(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'')"
+",\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o."
+"s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>"
+"=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);"
+"return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){va"
+"r s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if("
+"x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+="
+"(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s"
+".d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s."
+"apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n"
+".userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s"
+".wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n)"
+"{if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&"
+"&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i"
+";s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un"
+".substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,"
+"a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._i"
+"l;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}e"
+"lse if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g"
+"=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'"
+"+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=f"
+"unction(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m["
+"t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s"
+".m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h"
+"?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){i"
+"f(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\""
+"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c',"
+"'i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChi"
+"ld(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.l"
+"ength&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k"
+"==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+"
+"k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}el"
+"se f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime"
+"();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketing"
+"CloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackC"
+"heck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsV"
+"isitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._aud"
+"ienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s."
+"_callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.a"
+"udienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.vis"
+"itor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s.marketingCloudVisitorID = visit"
+"or.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (!s.marketingCloudVisitorID) {s._waitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.an"
+"alyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (!s.analyticsVisitorID) {s._waitingForAnalyticsVisi"
+"torID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s.audienceManagerLocationHint = visitor.getAudienceM"
+"anagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (!s.audienceManagerLocationHint) {s._waitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s."
+"audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (!s.audienceManagerBlob) {s._waitingForAudie"
+"nceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)     "
+"     && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceM"
+"anagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._"
+"callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo."
+"callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWh"
+"enReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReady"
+"ToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._"
+"callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();cal"
+"lbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = "
+"null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}se"
+"tVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this"
+",d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math."
+"random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTr"
+"ack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+"
+"'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplement"
+"alDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.m"
+"pc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,"
+"o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.isma"
+"c&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j"
+"='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.ja"
+"vaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>="
+"5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\""
+"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)"
+"while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s."
+"browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if("
+"s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');"
+"if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);"
+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');"
+"s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttrib"
+"ute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.index"
+"Of('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'"
+"||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc"
+"){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')"
+"+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?q"
+"s:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.pageURLRest=s."
+"lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){"
+"var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s."
+"setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t."
+"lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!="
+"'function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f"
+"].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElements"
+"ByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.in"
+"dexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.ap"
+"v=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);"
+"s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='suppleme"
+"ntalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+"Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+"deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+"lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n"
+"<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resol"
+"ution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackin"
+"gServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMa"
+"tch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTra"
+"ckVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function("
+"un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf();


// export the s_gi function which instantiates s-code
module.exports = s_gi;

}());

},{}],152:[function(require,module,exports){
var sCode = require('./ac-s-code/sCode');

module.exports = {
	init: sCode.init,
	getInstance: sCode.getInstance
};

// ac-s-code@1.1.5

},{"./ac-s-code/sCode":165}],153:[function(require,module,exports){
 (function() {

	'use strict';

	function sCodeAccount (bucket) {

		var s_account = '';

		if (typeof bucket === 'string') {
			s_account = bucket;
		}

		/* AOS Campaign Check */
		if (document.location.search && s_account) {
			var dls = document.location.search;
			if (dls.indexOf('?cid=AOS-') > -1 || dls.indexOf('&cid=AOS-') > -1) {
				s_account += ',applestoreWW';
			}
		}

		return s_account;
	}

	module.exports = sCodeAccount;

})();

// ac-s-code@1.1.5

},{}],154:[function(require,module,exports){
(function() {

	'use strict';

	var sCodePlugins                   = require('../plugin/sCodePlugins');
	var sCodeServers                   = require('./server');
	var browserHelper                  = require('./helper/browser');
	var dynamicObjectIdHandlerSafari   = require('./../plugin/helper/dynamicObjectIdHandlerSafari');

	function setDefaults (sCode, options) {

		// @param: (expires) expects a true date object
        function resetCookie(cookieName, expires) {
            var date = new Date();
            
            // Expire in 2 years. Set it back to a Date Object since s.c_w method expects only a date object.
            var defaultExpirationDate = new Date(date.setFullYear(date.getFullYear()+2));
            var expirationDate = expires || defaultExpirationDate;
            var cookieValue = sCode.c_r(cookieName);

            if (cookieValue) {

                try {
                    sCode.c_w(cookieName, cookieValue, expirationDate);
                } catch(e) {
                    // Do nothing
                }
            }
        }

        // As per rdar://problem/23510183, reset method for s_vi cookie needs to use the document.cookie method
        // since it is set once by sCode on initial page visit and is kept alive forever after that 
        // using the below rewrite for 2 years in the future.
        // Also it doesnt need encoding as per Adobe.
        function resetVisitorIDCookie(cookieName) {
            var date = new Date();
            var defaultExpirationDate = new Date(date.setFullYear(date.getFullYear()+2)); // Expire in 2 years
            var cookieValue = sCode.c_r(cookieName);

            if (cookieValue) {
                document.cookie = cookieName + "=" + cookieValue + "; expires=" + defaultExpirationDate.toUTCString() + "; domain=apple.com; path=/";
            }
        }

        if (typeof sCode.acAnalytics !== 'object') {
            sCode.acAnalytics = {};
        }

        // Expose this method to s-code plugin for dynamic object handling for safari
        sCode.acAnalytics.dynamicObjectIdHandlerSafari = dynamicObjectIdHandlerSafari;

        sCode.pageName = (options.pageName || '');

        sCode.currencyCode = 'USD';

        /* Link Tracking Config */
        sCode.trackDownloadLinks = true;

        sCode.trackExternalLinks = true;

        sCode.trackInlineStats = true;

        sCode.useForcedLinkTracking = true;

        sCode.forcedLinkTrackingTimeout = 100;

        sCode.linkDownloadFileTypes = 'zip,wav,mp3,doc,pdf,xls,dmg,sit,pkg,exe,m4a,rss,xml,extz,safariextz';

        sCode.linkInternalFilters = 'javascript:,apple.com' + ((options.linkInternalFilters) ? '/' + options.linkInternalFilters : '');

        sCode.linkLeaveQueryString = false;

        sCode.linkTrackVars = 'campaign';

        sCode.linkTrackEvents = 'None';

        sCode._isSafari = browserHelper.isSafari(s);

        /* Stop Safari Top Sites Calls to Omniture */
        if (browserHelper.isSafariTopSitesPreview(s) === true) {
            sCode.t = function () { return ''; };
        }

        // reset s_vnum cookie to expire in another two years (infinity)
        resetCookie('s_vnum_n2_us');

        // reset s_vi cookie to expire in another two years (infinity)
        resetVisitorIDCookie('s_vi');
        
        // delete s_pv cookie
        var tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate()-1);
        resetCookie('s_pv', tmpDate);

		/* DynamicObjectIDs config */
		function s_getObjectID (o) {
			var ID = o.href;
			return ID;
		}

		sCode.getObjectID = s_getObjectID;

		/**
		 * TODO: What is `iTunesDetected` and where the heck does it come from?
		 * Right now this block will never run because in this scope,
		 * `iTunesDetected` is never going to be defined.
		 */
		if (typeof(iTunesDetected) === 'function') {

			var activeX = document.createElement('object');

			activeX.setAttribute('width', 1);
			activeX.setAttribute('height', 1);
			activeX.id = 'iTunesDetectorIE';
			activeX.setAttribute('classid', 'clsid:D719897A-B07A-4C0C-AEA9-9B663A28DFCB');

			document.getElementsByTagName('head')[0].appendChild(activeX);
			sCode.prop12 = iTunesDetected() ? 'itunes' : 'no itunes';
		}

		/* Adding URL and referrer to each request */

		sCode.eVar54 = document.location.href;

		sCode.eVar49 = document.referrer;

		sCode.usePlugins = true;

		sCode.doPlugins = sCodePlugins;

		sCode.trackingServer = sCodeServers.getTrackingServer();

		sCode.trackingServerSecure = sCodeServers.getSecureTrackingServer();

		sCode.dc = sCodeServers.getDataCenterId();
	}

	module.exports = setDefaults;

})();

// ac-s-code@1.1.5

},{"../plugin/sCodePlugins":164,"./../plugin/helper/dynamicObjectIdHandlerSafari":158,"./helper/browser":155,"./server":156}],155:[function(require,module,exports){
(function() {

	'use strict';

	function isSafariTopSitesPreview () {

		if (navigator && navigator.loadPurpose && navigator.loadPurpose === 'preview') {
			return true;
		}

		return false;
	}

	function isSafari (sCode) {

		if (sCode.u.toLowerCase().indexOf('webkit') > -1) {
			if (sCode.u.toLowerCase().indexOf('safari') > -1 && sCode.u.toLowerCase().indexOf('chrome') < 0) {
				return true;
			}
		}

		return false;
	}

	module.exports = {
		isSafariTopSitesPreview: isSafariTopSitesPreview,
		isSafari: isSafari
	};

})();

// ac-s-code@1.1.5

},{}],156:[function(require,module,exports){
(function() {

	'use strict';

	var production = ['www.apple.com', 'images.apple.com', 'movies.apple.com', 'ssl.apple.com'];

	function getTrackingServer () {

		return (_isProduction()) ? 'metrics.apple.com' : location.hostname;
	}

	function getSecureTrackingServer () {

		return (_isProduction()) ?  'securemetrics.apple.com' : location.hostname;
	}

	function getDataCenterId () {

		return 112;
	}

	function _isProduction () {

		var hostname = window.location.host;

		if (production.indexOf(hostname) > -1) {
			return true;
		}

		return false;
	}

	module.exports = {
		getTrackingServer: getTrackingServer,
		getSecureTrackingServer: getSecureTrackingServer,
		getDataCenterId: getDataCenterId
	};

})();

// ac-s-code@1.1.5

},{}],157:[function(require,module,exports){
(function () {

	'use strict';

	function cleanPageName (sCode) {

		if (sCode.pageName) {

			var pgEscaped = escape(sCode.pageName);

			pgEscaped = pgEscaped.replace(/(%u2018|%u2019|%u02BC|%u02BD)/g,'%27');

			pgEscaped = pgEscaped.replace(/(%u201C|%u201D|%E2%80%9C|%E2%80%9D)/g,'%22');

			pgEscaped = pgEscaped.replace(/(%09|%0A|%0D)/g,'');

			sCode.pageName = unescape(pgEscaped);
		}
	}

	module.exports = cleanPageName;

}());

// ac-s-code@1.1.5

},{}],158:[function(require,module,exports){
(function () {

	'use strict';

	/* Function to add mouseup Event handler for exit and download links for Safari */
	function dynamicObjectIdHandlerSafari (sCode, link) {

		if (sCode.lt(link.href)) {

			link.addEventListener('mouseup', function(evt) {

				// Left click only
				if (((evt.which) && (evt.which === 1)) || ((evt.button) && (evt.button === 1))) {

					var linkHref = evt.currentTarget.href;

					var linkType = sCode.lt(linkHref);

					if (linkType === 'd') {

						if (linkHref.match(/\.rss|\.xml/)){

							sCode.eVar16 = sCode.prop16 = 'sign ups';

						} else {

							sCode.eVar11 = ((sCode.pageName && sCode.pageName !== '') ? sCode.pageName : '') + ' - ' + linkHref.substring(linkHref.lastIndexOf('/')+1,linkHref.length);

							sCode.eVar11 = sCode.eVar11.toLowerCase();

							sCode.eVar16 = sCode.prop16 = 'Downloads';

							sCode.events = sCode.apl(sCode.events,'event5','','',1);
						}

						sCode.linkTrackVars = 'prop16,eVar16,eVar11,events';

						sCode.linkTrackEvents = 'event5';
					}

					sCode.linkTrackVars = 'None';

					sCode.linkTrackEvents = 'None';
				}
			}, false);
		}
	}

	module.exports = dynamicObjectIdHandlerSafari;

}());

// ac-s-code@1.1.5

},{}],159:[function(require,module,exports){
(function () {

	'use strict';

	function getVisitNumPerChannel (sCode) {

		var e = new Date();
		var cl;
		var cs;
		var vn = 0;
		var iv = false;
		var lm = false;
		var ch = 'no channel';
		var ct = e.getTime();
		var xs = ct + 30 * 60 * 1000; // Short expiration (30 minutes)
		var xl = ct + 730 * 24 * 60 * 60 * 1000; // Long expiration (2 yrs)
		var pn = sCode.wd.location.pathname;
		var geoCode = 'us';
		var channelMap = '';
		var i;

		/**
		 * @TODO
		 * Whatever this is used for, it should not be here. It should be defined in a module
		 */
		var channelTable = new Array('no channel', 'aos', 'homepage', 'support', 'itunes', 'myappleid.iforgot', 'trailers', 'ip', 'discussions', 'myappleid', 'quicktime', 'ipad', 'ipadmini', 'legal', 'mac', 'macosx', 'safari', 'ipod', 'developer', 'retailstore', 'macbookair', 'retail.concierge', 'macosx.downloads', 'ipodtouch', 'ios', 'macbookpro', 'webapps', 'search', 'retail.onetoone', 'icloud', 'imac', 'macmini', 'ilife', 'other', 'findouthow', 'jobs', 'mobileme', 'whymac', 'macappstore', 'hotnews', 'redirects', 'ipodnano', 'education', 'iwork', 'ipodclassic', 'macpro', 'contact', 'appletv', 'finalcutstudio', 'pr', 'productpromotions', 'ipodshuffle', 'airportexpress', 'environment', 'aperture', 'batteries', 'mac.facetime', 'productpromotions.rebate', 'timecapsule', 'displays', 'airportextreme', 'logicstudio', 'buy', 'about', 'accessibility', 'mightymouse', 'thunderbolt', 'html5', 'remotedesktop', 'magictrackpad', 'keyboard', 'business', 'retail.jointventure', 'itunesappstore', 'pro', 'science', 'logicexpress', 'channelprograms', 'startpage', 'advertising', 'financialservices', 'giftcards', 'xsan', 'server', 'battery', 'companystore', 'ali', 'supplier', 'beatles', 'usergroups', 'webbadges', 'procurement', '802.11n', 'retail', 'itunesnews', 'ibooks-author', 'osx', 'apple-events', 'applewatch');


		if (sCode.wd.location.hostname.match(/apple.com.cn/)) {
			geoCode = 'cn';
		} else if (!pn.match(/^\/(ws|pr|g5|go|ta|wm|kb)\//)) {
			if (pn.match(/^\/(\w{2}|befr|benl|chfr|chde|asia|lae)(?=\/)/)) {
				geoCode = pn.split('/')[1].toLowerCase();
			}
		}

		var c = 's_vnum_n2_' + geoCode;
		var c2 = 's_invisit_n2_' + geoCode;

		if (sCode.channel) {
			ch = sCode.channel.substring(sCode.channel.indexOf('.') + 1, sCode.channel.length);
			ch = ch.substring(ch.indexOf('.') + 1, ch.length);
		}

		function chLookup(channel) {
			for (i = 0; i <= channelTable.length; i++) {
				if (channel === channelTable[i]) {
					return i + 1;
				}
			}
		}

		channelMap = chLookup(ch);
		if (!channelMap) {
			channelMap = '0';
		}

		//remove legacy cookie, write new one
		sCode.c_w('s_vnum_' + geoCode, '', 63072000);
		sCode.c_w('s_invisit_' + geoCode, '', 63072000);
		sCode.c_w('s_invisit_n_' + geoCode, '', 63072000);
		sCode.c_w('s_vnum_n_' + geoCode, '', 63072000);

		cl = sCode.c_r(c);
		cs = sCode.c_r(c2);

		//set new cookie
		if (channelMap) {
			var val;
			if (cs) {
				var csa = cs.split(/,/);
				for (i = 0; (val = csa[i]); i++) {
					if (channelMap.toString() === val) {
						iv = true;
						break;
					}
				}
			}
			if (!iv) {
				var cla = (cl) ? cl.split(/,/) : [];
				var vs;
				for (i = 0; (val = cla[i]); i++) {
					vs = val.split(/\|/);
					if (channelMap.toString() === vs[0]) {
						vn = parseInt(vs[1], 10) + 1;
						cla[i] = vs[0] + '|' + vn;
						lm = true;
						break;
					}
				}

				e.setTime(xs);
				sCode.c_w(c2, (cs ? (cs + ',' + channelMap) : channelMap), e);
				e.setTime(xl);
				if (lm) {
					sCode.c_w(c, cla.toString(), e);
					return ch + '=' + vn;
				} else {
					if (cla.toString()) { 
						cla.push(channelMap + '|' + 1);
					} else {
					 	cla = (channelMap + '|' + 1);
					}

					sCode.c_w(c, cla.toString(), e);
					return ch + '=' + 1;
				}
			}
		}
	}

	module.exports = getVisitNumPerChannel;

}());

// ac-s-code@1.1.5

},{}],160:[function(require,module,exports){
(function () {

	'use strict';

	function osDetect (sCode) {
		var match;

		if (sCode.u.match(/windows/i)) {
			sCode.prop9 = "windows";
			return;
		}

		if (sCode.u.match(/(kindle|silk-accelerated)/i)) {
			if (sCode.u.match(/(kindle fire|silk-accelerated)/i)) {
				sCode.prop9 = "kindle fire";
			} else {
				sCode.prop9 = "kindle";
			}
			return;
		}

		if (sCode.u.match(/(iphone|ipod|ipad)/i)) {
			match = sCode.u.match(/OS [0-9_]+/i);
			sCode.prop9 = 'i' + match[0].replace(/_/g,'.');
			return;
		}

		if (sCode.u.match(/android/i)) {
			sCode.prop9 = sCode.u.match(/android [0-9]\.?[0-9]?\.?[0-9]?/i);
			return;
		}

		if (sCode.u.match(/webos\/[0-9\.]+/i)) {
			match = sCode.u.match(/webos\/[0-9]\.?[0-9]?\.?[0-9]?/i);
			sCode.prop9 = match[0].replace(/webos\//i,'web os ');
			return;
		}

		if (sCode.u.match(/rim tablet os [0-9\.]+/i)) {
			match = sCode.u.match(/rim tablet os [0-9]\.?[0-9]?\.?[0-9]?/i);
			sCode.prop9 = match[0].replace(/rim tablet os/i,'rim os ');
			return;
		}

		if ((sCode.u.match(/firefox\/(\d{2}||[3-9])/i) || sCode.u.match(/AppleWebKit\//)) && sCode.u.match(/Mac OS X [0-9_\.]+/)) {
			var matches = sCode.u.match(/[0-9_\.]+/g);
			matches = matches[1].split(/_|\./);
			sCode.prop9 = matches[0] + "." + matches[1] + ".x";
			return;
		}

		var mv = sCode.u.match(/AppleWebKit\/\d*/i) && sCode.u.match(/AppleWebKit\/\d*/i).toString().replace(/AppleWebKit\//i,'');

		if (mv > 522) {
			sCode.prop9 = "10.5.x";
		} else if (mv > 400) {
			sCode.prop9 = "10.4.x";
		} else if (mv > 99) {
			sCode.prop9 = "10.3.x";
		} else if (mv > 80) {
			sCode.prop9 = "10.2.x";
		} else {
			sCode.prop9 = "mac unknown or non-safari";
		}
	}

	module.exports = osDetect;

}());

// ac-s-code@1.1.5

},{}],161:[function(require,module,exports){
(function () {

	'use strict';

	function percentPageViewed (sCode) {

		if (!sCode.prop17) {

			var percent = sCode.getPercentPageViewed(sCode.pageName);

			if (percent && percent.length >= 5 && typeof(percent[1]) !== 'undefined') {
				sCode.prop14 = percent[0];
				sCode.prop17 = percent[1] + ':' + percent[2];
				sCode.prop28 = Math.round(percent[3]/10) * 10;
				sCode.eVar17 = sCode.eVar18 = '';

				if (percent[4]) {

					var sva = percent[4].split(/\|/g);
					var sv = '';
					var svaSize = sva.length;

					for (var i=0; i < svaSize; i++) {
						if (i !== (svaSize-1)) {

							var diff = sva[i + 1].split(/:/)[0] - sva[i].split(/:/)[0];

							if (diff > 100) {

								sv += sva[i].split(/:/)[1];

								var nz = diff/100;

								while (nz > 1) {

									sv += '0';

									nz--;
								}

							} else {

								sv += sva[i].split(/:/)[1];

							}

						} else {

							sv += sva[i].split(/:/)[1];
						}
					}

					if (sv.length > 254) {

						sCode.eVar17 = sv.substring(0,254);

						sCode.eVar18 = sv.substring(255,sv.length);

					} else {

						sCode.eVar17 = sv;
					}
				}

				if (!sCode.tcall) {

					sCode.linkTrackVars = 'prop17,prop28';
				}
			}
		}
	}

	module.exports = percentPageViewed;

}());

// ac-s-code@1.1.5

},{}],162:[function(require,module,exports){
(function () {

	'use strict';

	function plpChannel (sCode) {

		if (((sCode.pageName && sCode.prop14 && sCode.pageName.toLowerCase() !== sCode.prop14.toLowerCase()) || !sCode.prop14) && sCode.tcall) {
			var ch;
			var pathLengthValue;
			var cookieValue = sCode.c_r('s_pathLength');

			var pathLengthArray = (cookieValue.indexOf(',') > -1) ? cookieValue.split(',') : [];
			var e = new Date();
			var ct = e.getTime();

			e.setTime(ct + 30 * 60 * 1000);

			if (sCode.channel) {

				ch = sCode.channel.substring(sCode.channel.indexOf('.') + 1, sCode.channel.length);

				ch = ch.substring(ch.indexOf('.') + 1, ch.length);

			} else {
				ch = 'no channel';
			}

			if (pathLengthArray.length !== 0 && pathLengthArray.toString().indexOf(ch + '=') > -1) {

				var pathLengthArraySize = pathLengthArray.length;

				for (var i = 0; i < pathLengthArraySize; i++) {

					if (pathLengthArray[i].toString().indexOf(ch + '=') > -1) {

						pathLengthValue = pathLengthArray[i].split('=');

						++pathLengthValue[1];

						pathLengthArray[i] = pathLengthValue[0] + '=' + pathLengthValue[1];

						sCode.prop48 = pathLengthValue[1];
					}
				}

				sCode.c_w('s_pathLength', pathLengthArray,e);

			} else {

				pathLengthValue = cookieValue + ch + '=' + 1 + ',';

				sCode.c_w('s_pathLength', pathLengthValue,e);

				sCode.prop48 = '1';
			}

		}
	}

	module.exports = plpChannel;

}());

// ac-s-code@1.1.5

},{}],163:[function(require,module,exports){
(function () {

	'use strict';

	function setMembership (sCode) {

		if (sCode.tcall) {

			var membership;

			var pathname = window.location.pathname;

			var newMembership = false;

			var noMatch = true;

			if (sCode.c_r('iTunesPresent') || (sCode.prop12 && sCode.prop12 === 'iTunes')) {
				membership = (membership) ? membership + 'it,' : 'it,';
			}

			if (sCode.c_r('hasMobileMe')) {
				membership = (membership) ? membership + 'mm,' : 'mm,';
			}

			if (sCode.c_r('DefaultAppleID') || (sCode.pageName && sCode.pageName.match(/iforgot - cr or email option/))) {
				membership = membership ? membership + 'aid,' : 'aid,';
			}

			if (sCode.c_r('trackStartpage')) {
				membership = membership ? membership + 'sp,' : 'sp,';
			}

			if (sCode.prop11) {
				if (sCode.prop11.match('3p')) {
					membership = membership ? membership + '3p,' : '3p,';
				}
			}

			if (sCode.pageName) {
				if (sCode.pageName.match(/one to one - index/)) {
					membership = membership ? membership + 'o2o,' : 'o2o,';
				}
			}

			if (pathname.match('/welcomescreen/')) {

				var portion;

				if (portion === pathname.match('ilife.*')) {

					portion = 'il' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;

				} else if (portion === pathname.match('iwork.*')) {

					portion = 'iwk' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;

				} else if (portion === pathname.match('itunes.*')) {

					portion = 'it' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;

				} else if (portion === pathname.match('aperture.*')) {

					portion = 'ap' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;
				}
			}

			if (sCode.getQueryParam('sr') && sCode.getQueryParam('vr')) {

				var ver = sCode.getQueryParam('vr');

				ver = ver.substring(0, ver.indexOf('-')) + ',';

				membership = (membership) ? membership + ver : ver;
			}

			if (typeof(membership) !== 'undefined') {
				var e;
				var ct;
				membership = membership.substring(0, membership.length-1).toLowerCase();
				membership = membership.split(',');

				if (sCode.c_r('s_membership')) {

					var membershipCookie = sCode.c_r('s_membership').split(/:/);

					membershipCookie.splice(0,1);

					for (var i = 0; i < membership.length; i++) {
						for (var j = 0; j < membershipCookie.length; j++) {
							if (membershipCookie[j] === membership[i]) {
								noMatch = false;
							}
						}

						if (noMatch) {
							membershipCookie[membershipCookie.length] = membership[i];
							newMembership = true;
						}

						noMatch = true;
					}

					if (newMembership) {

						e = new Date();

						membership = membershipCookie.length + ':' + membershipCookie.toString().replace(/,/g,':');
						ct = e.getTime();
						e.setTime(ct+63072000);//Two years
						sCode.c_w('s_membership', membership,e);
						sCode.prop31 = membership;
					}
				} else {
					membership = membership.length + ':' + membership.toString().replace(/,/g,':');
					e = new Date();
					ct = e.getTime();
					e.setTime(ct+63072000);//Two years
					sCode.c_w('s_membership', membership,e);
					sCode.prop31 = membership;
				}
			}

			if (!sCode.prop31 && !sCode.c_r('s_pathLength')) {
				sCode.prop31 = sCode.c_r('s_membership');
			}
		}
	}

	module.exports = setMembership;

}());

// ac-s-code@1.1.5

},{}],164:[function(require,module,exports){
(function() {

	'use strict';

	var plpChannel            = require('./helper/plpChannel');
	var cleanPageName         = require('./helper/cleanPageName');
	var osDetect              = require('./helper/osDetect');
	var percentPageViewed     = require('./helper/percentPageViewed');
	var setMembership         = require('./helper/setMembership');
	var getVisitNumPerChannel = require('./helper/getVisitNumPerChannel');


	function sCodePlugins (sCode) {

		sCode.tcall = (typeof (sCode.linkType) === 'undefined') ? true : false;

		if (typeof (cleanPageName) === 'function') {
			cleanPageName(sCode);
		}


		/**
		 * DynamicObjectIDs for Clickmap
		 */
		var dynamicObjectPathExp = '/(apple.com\/retail\/.+\/map\/|apple.com\/buy\/locator\/|discussions.apple.com|discussionsjapan.apple.com)/g';

		if (!sCode.d.URL.match(dynamicObjectPathExp)) {
			sCode.setupDynamicObjectIDs();
		}


		/**
		 * Detecting 1x vs 2x Platform and setting Prop 5
		 */
		if (navigator && navigator.platform) {
			if (window.devicePixelRatio >= 1.5) {
				sCode.prop5 = navigator.platform + ' 2x';
			} else {
				sCode.prop5 = navigator.platform;
			}
		}

		/**
		 * Redirect Referrer 'ref' query string
		 */
		var tempVar1 = sCode.getQueryParam('ref');

		if (tempVar1 && sCode.tcall) {
			sCode.referrer = tempVar1;
		} else if (tempVar1 && !sCode.tcall) {
			sCode.referrer = '';
		}


		/**
		 * External Campaigns
		 */
		if (!sCode.campaign) {

			sCode.campaign = sCode.getQueryParam('cid');

			sCode.setClickMapEmail('Email_PageName,Email_OID','Email_OT');

			if (sCode.campaign.match(/OAS-.+?-DOMAINS-/i)) {

				var tempVar0 = 'http://' + sCode.campaign.replace(/OAS-.+?-DOMAINS-/i, '');

				sCode.referrer = (sCode.tcall) ? tempVar0 : '';
			}
		}


		/**
		 * Redirect Alias
		 */
		sCode.server = sCode.getQueryParam('alias');

		if (!sCode.server) {
			sCode.server = 'new approach ac-analytics';
		}


		/**
		 * Set campaign
		 */
		sCode.campaign = sCode.getValOnce(sCode.campaign, 's_campaign', 0);


		/**
		 * Set Campaign Path
		 */
		sCode.prop6 = (!sCode.prop6 && sCode.getQueryParam('cp') && sCode.pageName) ? ('D="' + sCode.getQueryParam('cp').toLowerCase() + ': ' + sCode.pageName + '"') : sCode.prop6;


		/**
		 * Set Campaign Channel
		 */
		sCode.prop11 = sCode.getQueryParam('sr');

		if (!sCode.d.URL.match(/\/channel\//) && !sCode.prop11 && sCode.c_r("s_3p")) {

			sCode.prop11 = sCode.c_r('s_3p');

			sCode.c_w('s_3p', '', -1);
		}



		/**
		 * Internal Campaigns
		 * TODO: Make sure we want this logic. Seems a little blah to me.
		 */
		sCode.eVar7 = (!sCode.eVar7) ? sCode.getQueryParam('aid') : '';

		sCode.eVar7 = sCode.getValOnce(sCode.eVar7, 's_var_7', 0);


		/**
		 * Internal Search
		 */
		if (sCode.eVar2) {

			sCode.events = sCode.apl(sCode.events, 'event6', ', ', 1);
		}

		if ((!sCode.d.URL.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//) && !sCode.d.URL.match(/apple.com\/search\//)) && (sCode.d.referrer.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//) || sCode.d.referrer.match(/apple.com\/search\//))) {

			sCode.eVar2 = (sCode.d.referrer.match(/\/support\//))?"acs: ":((sCode.d.referrer.match(/\/store\//)?"aos: ":"www: "));

			if (sCode.d.referrer.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search/)) {

				sCode.eVar2 += sCode.getQueryParam('q', '', sCode.d.referrer).replace(/\+/g,' ');

				var geo = sCode.d.referrer.match(/\/(\w{2}|befr|benl|chfr|chde|asia|lae)\//i);

				sCode.eVar2 += " ("+geo[0].replace(/\//g,'') + ")";
			} else {

				sCode.eVar2 += sCode.getQueryParam('q', '', sCode.d.referrer).replace(/\+/g,' ') + " (us)";
			}
		}

		/**
		 * Used to populate the Referrer Type report
		 */
		if (sCode.prop11 === 'em' && sCode.tcall) {

			sCode.referrer = 'imap://chatterbox.com';
		}

		if (sCode.prop11 === 'app' && sCode.tcall) {

			sCode.referrer = 'file://fromApp';
		}

		if (document.referrer && document.referrer.indexOf('apple.com/startpage/') >-1 && sCode.tcall) {

			sCode.referrer = 'news://startpage.com';

			sCode._1_referrer = 1;
		}

		if (typeof (percentPageViewed) === 'function') {
			percentPageViewed(sCode);
		}

		/**
		 * Device orientation changes
		 */
		sCode.prop38 = (sCode.tcall) ? sCode.deviceOrientationChanges(true) : '';


		/**
		 * Product Ownership (from Chatterbox)
		 */
		sCode.prop32 = sCode.eVar32 = sCode.getQueryParam('psid');

		if (sCode.prop32 || sCode.c_r('s_sid')) {

			var e = new Date();

			var ct = e.getTime();

			e.setTime(ct + 630720000); //Two years

			if (sCode.prop32) {
				sCode.c_w('s_psid', sCode.prop32, e);
			} else {
				sCode.c_w('s_psid', sCode.c_r('s_sid'), e);
			}

			sCode.c_w('s_sid', '', -1);
		}

		if (!sCode.prop32 && !sCode.c_r('s_pathLength')) {

			sCode.prop32 = sCode.c_r('s_psid');
		}

		/**
		 * Enhanced Download Tracking: Populate eVar11 with file name and fire event15
		 */
		sCode.linkLeaveQueryString = true;

		var pageURL = sCode.downloadLinkHandler();

		if (pageURL) {

			if (pageURL.match(/\.rss|\.xml/)) {

				sCode.eVar16 = sCode.prop16 = 'sign ups';

			} else {

				sCode.eVar11 = ((sCode.pageName && sCode.pageName !== '') ? sCode.pageName : '') + ' - ' + pageURL.substring(pageURL.lastIndexOf('/')+1, pageURL.length);

				sCode.eVar16 = sCode.prop16 = 'downloads';

				sCode.events = sCode.apl(sCode.events,'event5', ', ', 1);
			}

			//Track eVar & Event

			sCode.linkTrackVars = 'prop16,eVar16,eVar11,events';

			sCode.linkTrackEvents = 'event5';
		}

		sCode.linkLeaveQueryString = false;


		/**
		 * OS Detection
		 */
		if (typeof (osDetect) === 'function') {
			osDetect(sCode);
		}


		/**
		 * Click Depth Check
		 */
		if (sCode.pageName && sCode.pageName.match(/feedback - thank you/)) {

			sCode.prop16 = sCode.eVar16 = "feedback";
		}

		sCode.linkLeaveQueryString = true;

		var exitUrl = sCode.linkHandler('itms.apple.com|itunes.apple.com', 'e');

		var url = sCode.linkHandler('ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/|rss.support.apple.com', 'o');

		if (url) {

			sCode.eVar16 = sCode.prop16 = 'sign ups';

			sCode.linkTrackVars = 'eVar16,prop16';
		}

		sCode.linkLeaveQueryString = false;

		/**
		 * Membership Tracking
		 */
		if (typeof (setMembership) === 'function') {
			setMembership(sCode);
		}


		/**
		 * Path Per Channel Length
		 */
		if (typeof plpChannel === 'function') {
			plpChannel(sCode);
		}

		/**
		 * Determine the Number of Visits  Per Channel
		 */
		if (sCode.tcall) {

			sCode.prop50 = getVisitNumPerChannel(s);
		}


		/**
		 * Populate channel into hier for adobe insight
		 */
		sCode.hier1 = (sCode.channel) ? sCode.channel : '';

		sCode.linkTrackVars = sCode.apl(sCode.linkTrackVars, 'hier1', ', ', 1);

		// Remove all spaces from linkTrackVars
		sCode.linkTrackVars = sCode.linkTrackVars.replace(new RegExp(' ', 'g'), '');



		/**
		 * Populate Prop 49 with Visitor ID
		 */
		function getCleanVisitorId() {
			var visitorId = (sCode && sCode.c_r) ? sCode.c_r('s_vi') : '';
			var match = (visitorId) ? visitorId.match(/^\s*\[CS\]v1\|(.+)\[CE\]\s*$/) : null;

			if (match) {
				return match[1];
			}
		}

		sCode.prop49 = 'D=' + (getCleanVisitorId() || 's_vi');

		// Adding properties to support AOS
		// Affiliate ID - A cookie is set for the store if a user is coming from an affiliate site (we know if "afid" is present in the query parameters)
		// Read the value of the cookie and set it in eVar10 for the store
		var eVar10 = sCode.getQueryParam("afid");

		if (eVar10) {
			sCode.eVar10 = sCode.getValOnce(eVar10, "s_afc");
		}

		/**
		 * Copy current URL Dynamically
		 */
		sCode.prop4 = (sCode.prop4) ? sCode.prop4 : 'D=g';

		// Retail cookie - A cookie set by the store when a user favorites their local apple store
		var retailCookie = sCode.c_r("rtsid") || sCode.c_r("rtsidInt") || null;
		if (retailCookie) {
			if (!sCode.events) {
				sCode.events = "event37";
			} else {
				if (typeof sCode.events === "string" && sCode.events.indexOf("event37") === -1) {
					sCode.events += ",event37";
				}
			}
		}

		/**
		 * Manage s_code Vars: Lowercase all variables, except for one specified in the second parameter.
		 */
		sCode.manageVars('lowercaseVars', 'purchaseID,pageType,events,products,transactionID', 2);
	}

	module.exports = sCodePlugins;

})();



// ac-s-code@1.1.5

},{"./helper/cleanPageName":157,"./helper/getVisitNumPerChannel":159,"./helper/osDetect":160,"./helper/percentPageViewed":161,"./helper/plpChannel":162,"./helper/setMembership":163}],165:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Object        = require('ac-object');
	var sCode            = require('s-code');
	var sCodeAccount     = require('./config/account');
	var setDefaults      = require('./config/defaults');
	var sCodeInstance;

	var initDefaults = {
	  force: false
	};

	/**
	 * @desc Inits sCode once and returns the instance. Returns existing instance on subsequent calls.
	 * @param  {Object} options Hash of user options
	 * @return {Object} The sCode instance
	 */
	function init (options) {

		options = ac_Object.defaults(initDefaults, options || {});

		if (!sCodeInstance || options.force === true) {
			var bucket      = (options.bucket || '');
			sCodeInstance 	= window.s = sCode.init(sCodeAccount(bucket));
			var plugins     = sCode.plugins.init(sCodeInstance);

			setDefaults(sCodeInstance, options);
		}

		return sCodeInstance;
	}

	function getInstance () {
		return sCodeInstance;
	}

	module.exports = {
		init: init,
		getInstance: getInstance
	};

}());
// ac-s-code@1.1.5

},{"./config/account":153,"./config/defaults":154,"ac-object":127,"s-code":137}],166:[function(require,module,exports){
/** 
 * @module ac-checksum
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	adler32: require('./ac-checksum/adler32')
};

},{"./ac-checksum/adler32":167}],167:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-checksum.adler32
 *
 * @function
 * 
 * @desc Adler-32 checksum for string provided.
 *
 * @reference http://en.wikipedia.org/wiki/Adler-32
 *
 * @param {String} string
 *        The string you want to get the checksum for.
 *
 * @returns {Integer} Adler-32 checksum for string provided.
 */
module.exports = function adler32 (string) {
	var adlerModulo = 65521;
	var checksum16a = 1;
	var checksum16b = 0;
	var unicodeValueForCurrentChar;
	var i;

	for (i = 0; i < string.length; i += 1) {
		unicodeValueForCurrentChar = string.charCodeAt(i);
		checksum16a = (checksum16a + unicodeValueForCurrentChar) % adlerModulo;
		checksum16b = (checksum16b + checksum16a) % adlerModulo;
	}

	return (checksum16b << 16) | checksum16a;
};

},{}],168:[function(require,module,exports){
/**
 * @module ac-storage
 * @copyright 2014 Apple Inc. All rights reserved.
 *
 * @description
 * Wrapper for localStorage and sessionStorage for key/value pair storage outside of the page context.
 *
 * Instance of {@link Storage} with empty namespace.
 *
 */
'use strict';

var DEFAULT_NAMESPACE = 'ac-storage-';

var Item             = require('./ac-storage/Item');
var Storage          = require('./ac-storage/Storage');
var storageAvailable = require('./ac-storage/Storage/storageAvailable');

var ac_Storage = new Storage(DEFAULT_NAMESPACE);

// Expose Item constructor
ac_Storage.Item = Item;

// Expose storageAvailable method
ac_Storage.storageAvailable = storageAvailable;

module.exports = ac_Storage;

},{"./ac-storage/Item":169,"./ac-storage/Storage":176,"./ac-storage/Storage/storageAvailable":178}],169:[function(require,module,exports){
'use strict';

var ac_adler32           = require('ac-checksum').adler32;
var ac_Object            = require('ac-object');
var apis                 = require('./Item/apis');
var createExpirationDate = require('./Item/createExpirationDate');
var encoder              = require('./Item/encoder');

var DAY                       = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr
var DEFAULT_DAYS_TO_EXPIRE_IN = 30; // in days

/**
 * Constructor for objects that contain key and value information for the purpose
 * of storing after the page context unloads. Has additional features as well, such
 * as mimicking cookie expiration, invalidating the value based on a provided checksum
 * and saving various other metadata.
 *
 * Value is allowed to be any object that can be stringified into JSON and parsed back
 * again. It will not provide the object as a pointer to the same place on the disk, which
 * would no longer exist, but it does provide a new object containing the same owned properties.
 *
 * @constructor Item
 *
 * @param {String} key
 *
 * @property {String}  key            Protected; Storage key for this Item
 * @property {String}  checksum       String that describes information about the validity of this Item’s value.
 * @property {Mixed}   value          Value of this Item
 * @property {Integer} expirationDate Date after which this item will expire, as a timestamp
 * @property {Object}  metadata       Extra information that can be stored on this Item and used in other ways
 *
 */
function Item(key) {
	if (!key || typeof key !== 'string') {
		throw 'ac-storage/Item: Key for Item must be a string';
	}

	// New Item has only a key until state is loaded or otherwise manipulated
	this._key            = key;
	this._checksum       = null;
	this._expirationDate = null;
	this._metadata       = null;
	this._value          = null;

	// Set to 30 days from now, as accurate as 1 day
	this.setExpirationDate(Item.createExpirationDate(DEFAULT_DAYS_TO_EXPIRE_IN));
}

Item.prototype = {
	/**
	 * Save the state of this Item in storage
	 *
	 * @memberOf Item#
	 *
	 * @return {Boolean}
	 */
	save: function () {
		var api;
		var stateObj;
		var value;
		var options = {};

		// Get the best available API for the options
		api = apis.best(options);

		// If an api to store on is available, use it!
		if (api) {
			if (this.value() === null && typeof api.removeItem === 'function') {
				return api.removeItem(this.key());

			} else if (typeof api.setItem === 'function') {

				// Get object that represents the state of the Item
				stateObj = this.__state();

				// Encode the state as a string
				value = encoder.encode(stateObj);

				// Store state in persistent storage
				return api.setItem(this.key(), value, this.expirationDate());
			}

		}

		return false;
	},


	/**
	 * Load the state of this Item from storage
	 *
	 * @memberOf Item#
	 *
	 * @return {Boolean}
	 *
	 */
	load: function () {
		var api;
		var value;

		// Get the best available API
		api = apis.best();

		// If an api to load from is available, use it!
		if (api && typeof api.getItem === 'function') {
			value = api.getItem(this.key());

			// Update the state of this object based on value
			this.__updateState(encoder.decode(value));

			if (value === null || this.hasExpired()) {
				// Update persistent storage to remove item
				this.remove();

				return false;

			} else {

				return true;
			}

		} else {
			return false;
		}
	},


	/**
	 * Remove this item for storage, no matter which type of storage it was saved in
	 *
	 * @memberOf Item#
	 *
	 * @return {Boolean}
	 *
	 */
	remove: function () {
		var api;

		// Clear object state
		this.__updateState(null);

		// Get the best available API
		api = apis.best();

		// Remove the item for this key for the best available API.
		// Most likely if this browser had chosen best api for getItem it will be the same for removeItem
		return api.removeItem(this.key());
	},


	/**
	 * Whether the state of this object is still valid
	 *
	 * @memberOf Item#
	 *
	 * @param {String} checksum Optional;
	 *
	 * @return {Boolean} Is the state still valid?
	 *
	 */
	hasExpired: function (checksum) {
		// Expired if expiration date is in the past (or right now)
		// or that checksum is no longer valid
		// false means session storage, so it’s valid if it exists and checksum is valid!
		if (((this.expirationDate() !== false) && (this.expirationDate() <= Date.now())) || !this.__checksumIsValid(checksum)) {
			return true;
		}

		// We got this far! Item’s value is still good, as long as we loaded state history first.
		return false;
	},


	/**
	 * Getter for `value` property. Removes Item and returns null if it has expired.
	 *
	 * @method
	 * @memberOf Item#
	 *
	 * @param {String} checksum Optional;
	 *
	 * @return  {Mixed} value `null` if value hasExpired
	 *
	 */
	value: function (checksum) {
		// If value is not valid anymore
		if (this.hasExpired(checksum)) {
			this.remove();
		}

		// Return value. If it has expired, value will be `null`
		return this._value;
	},

	/**
	 * @module 	ac-storage.Item#setValue
	 * @desc 	Sets the current value for this item.
	 * Note there are no validity checks in place
	 *
	 * @function
	 *
	 * @param {Object|null} value
	 **/
	setValue: function(value){
		this._value = value;
	},


	/**
	 * Setter for `checksum` property
	 *
	 * @method
	 * @memberOf Item#
	 *
	 * @param  {String} checksum A string that represents all the information in a particular syntax that needs to remain consistent for the state of this Item to remain valid. This string is ran through the Adler32 algorithm to save space in storage.
	 *
	 */
	setChecksum: function (checksum) {
		if (checksum === null) {
			this._checksum = checksum;
		} else if (typeof checksum === 'string' && checksum !== '') {
			this._checksum = ac_adler32(checksum);
		} else {
			throw 'ac-storage/Item#setChecksum: Checksum must be null or a string';
		}
	},

	/**
	 * @module ac-storage.Item#checksum
	 * @function
	 *
	 * @returns {String} Returns an Adler32 encoded string representing the checksum for this object
	 */
	checksum: function(){
		return this._checksum;
	},


	/**
	 * Setter for `expirationDate` property
	 *
	 * @method
	 * @memberOf Item#
	 *
	 * @param  {Mixed} expirationDate Set the expiration date to a certain day in the future. Use a Date object, a date string, or a timestamp to define a date. Use `false` to save this Item just for the user’s session.
	 *
	 */
	setExpirationDate: function (expirationDate) {
		if (expirationDate === null) {
			expirationDate = Item.createExpirationDate(DEFAULT_DAYS_TO_EXPIRE_IN);
		}

		// False means use sessionStorage
		if (expirationDate !== false) {
			// Parse date string to timestamp
			if (typeof expirationDate === 'string') {
				expirationDate = new Date(expirationDate).getTime();
			}

			// Parse date object to timestamp
			if (expirationDate && typeof expirationDate.getTime === 'function') {
				expirationDate = expirationDate.getTime();
			}

			// Validate as timestamp, which is really just a number. 0 is considered invalid as new Date(null).getTime() === 0
			if (!expirationDate || isNaN(expirationDate)) {
				throw 'ac-storage/Item: Invalid date object provided as expirationDate';
			}

			// Round down expiration date to midnight (UTC timezone)
			expirationDate -= expirationDate % DAY;

			// Expiring today or in the past is treated as session storage
			if (expirationDate <= Date.now()) {
				expirationDate = false;
			}
		}

		// Update expiration date in context
		this._expirationDate = expirationDate;
	},

	/**
	 * @module ac-storage.Item#experationDate
	 * @function
	 *
	 * @returns {Date|String|Boolean} Returns a Date object, a date string, or a timestamp to define a date. `false` is means this Item is saved only for the current session.
	 */
	expirationDate: function(){
		return this._expirationDate;
	},


	/**
	 * Represent the state of this Item as an object
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 * @return {Object} Object that represents the state of the Item, for storing
	 */
	__state: function () {
		var stateObj = {};

		stateObj.checksum = this.checksum();
		stateObj.expirationDate = this.expirationDate();
		stateObj.metadata = this.metadata();
		stateObj.value = this.value();

		return stateObj;
	},


	/**
	 * Update this item based on a stateObj. Used for loading.
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 * @param  {Object} stateObj Object that represents the state of the Item. Use `null` to clear state (retains key).
	 *
	 */
	__updateState: function (stateObj) {
		var prop;
		var setter;

		// For clearing out state
		if (stateObj === null) {
			stateObj = {
				checksum: null,
				expirationDate: null,
				metadata: null,
				value: null
			};
		}

		// For every proper in the state object
		for (prop in stateObj) {
			// Figure out setter name
			setter = 'set' + prop.charAt(0).toUpperCase() + prop.slice(1);

			// If a setter exists for this prop
			if (typeof this[setter] === 'function') {

				// Set the new value for the property
				this[setter](stateObj[prop]);
			}
		}
	},


	/**
	 * Update this item based on a stateObj. Used for loading.
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 * @param  {String} checksum Checksum value to check against checksum in state
	 *
	 */
	__checksumIsValid: function (checksum) {
		// If a checksum was passed
		if (checksum) {

			// Convert to Adler32 checksum format first
			checksum = ac_adler32(checksum);

			// If the Item’s state does not have a checksum
			if (!this.checksum()) {
				throw 'ac-storage/Item: No checksum exists to determine if this Item’s value is valid. Try loading context from persistent storage first.';

			// If they are exactly equal, our Item’s value is still valid
			} else if (checksum === this.checksum()) {
				return true;
			}

			// If we’ve made it this far, then our value is no longer valid :[
			return false;

		// We were not expecting a checksum to exist in the state because we didn’t pass one!
		} else if (this.checksum()) {
			throw 'ac-storage/Item: No checksum passed, but checksum exists in Item’s state.';
		}

		return true;
	},


	/**
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 */
	setKey: function () {
		throw 'ac-storage/Item: Cannot set key /after/ initialization!';
	},

	/**
	 * @module 	ac-storage.Item#key
	 * @desc 	Returns the key used for this item
	 *
	 * @function
	 * @returns {Object} Key used for this item
	 **/
	key: function(){
		return this._key;
	},

	/**
	 * @module ac-storage.Item#metadata
	 * @function
	 *
	 * @returns {Object} Extra information that can be stored on this Item and used in other ways
	 */
	metadata: function() {
		return this._metadata;
	},

	/**
	 * @module 	ac-storage.Item#setMetadata
	 * @function
	 *
	 * @param {Object} value User defined object which can be stored on in this Item for later use
	 **/
	setMetadata: function( value ) {
		this._metadata = value;
	}
};



/**
 * Getter for `key` property
 *
 * @method
 * @memberOf Item#
 * @name Item#key
 *
 * @return  {String} Key
 *
 */

/**
 * Getter for `checksum` property
 *
 * @method
 * @memberOf Item#
 * @name Item#checksum
 *
 * @return  {String} checksum
 *
 */

/**
 * Getter for `expirationDate` property
 *
 * @method
 * @memberOf Item#
 * @name Item#expirationDate
 *
 * @return  {Date} expirationDate
 *
 */

/**
 * Getter for `metadata` property
 *
 * @method
 * @memberOf Item#
 * @name Item#metadata
 *
 * @return  {Object} metadata
 *
 */

/**
 * Setter for `metadata` property
 *
 * @method
 * @memberOf Item#
 * @name Item#setMetadata
 *
 * @param  {Object} metadata
 *
 */

/**
 * Setter for `value` property
 *
 * @method
 * @memberOf Item#
 * @name Item#setValue
 *
 * @param  {Mixed} value
 *
 */


Item.createExpirationDate = createExpirationDate;

module.exports = Item;

},{"./Item/apis":170,"./Item/createExpirationDate":173,"./Item/encoder":174,"ac-checksum":166,"ac-object":127}],170:[function(require,module,exports){
'use strict';

var ac_Log           = require('ac-console').log;
var api_localStorage = require('./apis/localStorage');
var api_userData     = require('./apis/userData');

/**
 * Method to access Normalized Storage APIs for storing key/value pairs
 * in the browser for use after page context is unloaded.
 *
 * @namespace Item/apis
 *
 * @todo  {@link https://interactive-git.apple.com/Interactive-Interfaces/ac-storage/issues/21 | storage/Item/apis : If feature unavailable, remove from list}
 */
var apis = {
	/**
	 * List of available APIs for storing key/value pairs using
	 *
	 * @memberOf Item/apis
	 * @private
	 *
	 * @type {Array}
	 */
	_list: [
		api_localStorage,
		api_userData
	],


	/**
	 * Access the list of APIs
	 *
	 * @memberOf Item/apis
	 *
	 * @return {Array}
	 */
	list: function () {
		return this._list;
	},


	/**
	 * Run a method on all of the available APIs defined.
	 *
	 * @memberOf Item/apis
	 *
	 * @param  {String} method Name of the method to run
	 *
	 * @return {Array} An array of results for whatever the provided method returns for each api
	 * @deprecated
	 */
	all: function (method) {

		ac_Log('ac-storage/Item/apis.all: Method is deprecated');

		// Pass subsequent arguments to method
		var args = Array.prototype.slice.call(arguments, 1);

		if (typeof method !== 'string') {
			throw 'ac-storage/Item/apis.all: Method name must be provided as a string';
		}

		var results = this.list().map(function (api) {
			if (api.available()) {
				if (typeof api[method] === 'function') {
					return api[method].apply(api, args);
				} else {
					throw 'ac-storage/Item/apis.all: Method not available on api';
				}
			}

			return false;
		});

		return results;
	},


	/**
	 * Get the best API available to save storage on
	 *
	 * @memberOf Item/apis
	 *
	 * @return {Object} Normalized Storage API
	 */
	best: function () {
		var best = null;

		this.list().some(function (api) {
			if (api.available()) {
				best = api;
				return true;
			}
		});

		return best;
	}
};

module.exports = apis;

},{"./apis/localStorage":171,"./apis/userData":172,"ac-console":8}],171:[function(require,module,exports){
'use strict';

var AC_Environment_Feature = require('ac-feature');

var api = window.localStorage;
var api_session = window.sessionStorage;

var available;

/**
 * Wrapper for the localStorage API
 *
 * @memberOf Item/apis
 * @namespace Item/apis/localStorage
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage|MDN: DOM Storage guide}
 *
 */
var api_localStorage = {

	name: 'localStorage',

	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @return {Boolean}
	 */
	available: function () {
	// Prevent errors on Safari with "private mode" enabled.
		try {
			localStorage.setItem('localStorage', 1);
			localStorage.removeItem('localStorage');
		} catch (e) { return false; }
	// then test normally, if no private-mode errors occur.
		if (available === undefined) {
			available = AC_Environment_Feature.localStorageAvailable();
		}
		return available;
	},

	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @param  {String} key
	 *
	 * @return {String}
	 */
	getItem: function (key) {
		return api.getItem(key) || api_session.getItem(key);
	},

	/**
	 * Store a key/value pair.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @param  {String} key
	 * @param  {String} Value
	 * @param  {Date | Boolean} expirationDate The date on which this Item expires. False means valid only for session.
	 *
	 * @return {Boolean}
	 */
	setItem: function (key, value, expirationDate) {
		// Session Storage
		if (expirationDate === false) {
			api_session.setItem(key, value);

		// Local Storage
		} else {
			api.setItem(key, value);
		}

		return true;
	},

	/**
	 * Remove an item from storage.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @param  {String} key
	 *
	 * @return {Boolean}
	 */
	removeItem: function (key) {
		api.removeItem(key);
		api_session.removeItem(key);

		return true;
	}
};

module.exports = api_localStorage;

},{"ac-feature":123}],172:[function(require,module,exports){
'use strict';

var AC_Element  = require('ac-dom-nodes');

var DAY = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr

var storeID = 'ac-storage';
var available;

/**
 * Wrapper for the IE #userData API, which can be used to shim localStorage for IE < 8
 *
 * @memberOf Item/apis
 * @namespace Item/apis/userData
 *
 * @see {@link http://msdn.microsoft.com/en-us/library/ms531424|Microsoft.com: userData Behavior}
 *
 */
var api_userData = {

	name: 'userData',

	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @return {Boolean}
	 */
	available: function () {
		if (available === undefined) {
			available = false;

			// Requires a DOM be available
			if (document && document.body) {
				var el = this.element();

				// IE7 returns typeof el.addBehavior as 'object', even though it is a function...
				if (AC_Element.isElement(el) && el.addBehavior !== undefined) {
					available = true;
				}

				// If userData is not available then remove the element from DOM.
				if (available === false) {
					this.removeElement();
				}
			} else {
				throw 'ac-storage/Item/apis/userData: DOM must be ready before using #userData.';
			}
		}

		return available;
	},

	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @param  {String} key
	 *
	 * @return {String}
	 */
	getItem: function (key) {
		var el = this.element();

		// Load saved #userData attributes
		el.load(storeID);

		return el.getAttribute(key) || null;
	},

	/**
	 * Store a key/value pair.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @param  {String} key
	 * @param  {String} Value
	 * @param  {Date | Boolean} expirationDate The date on which this Item expires. False means valid only for session.
	 *
	 * @return {Promise}
	 */
	setItem: function (key, value, expirationDate) {
		var el = this.element();

		// Storage the value on the attribute
		el.setAttribute(key, value);

		// Session Storage
		if (expirationDate === false) {
			// Set expiration date to tomorrow, as sessionStorage does not exist in #userData
			expirationDate = new Date(Date.now() + DAY);
		}

		// Set expiration date
		if (expirationDate && typeof expirationDate.toUTCString === 'function') {
			el.expires = expirationDate.toUTCString();
		}

		// Save the #userData attributes to the key
		el.save(storeID);

		return true;
	},

	/**
	 * Remove an item from storage.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @param  {String} key
	 *
	 * @return {Promise}
	 */
	removeItem: function (key) {
		var el = this.element();

		// Remove the attribute with persistent data
		el.removeAttribute(key);

		// Save the #userData to the key
		el.save(storeID);

		return true;
	},


	_element: null,
	/**
	 * @inner
	 */
	element: function () {
		if (this._element === null) {
			this._element = document.createElement('meta');
			this._element.setAttribute('id', 'userData');
			this._element.setAttribute('name', 'ac-storage');
			this._element.style.behavior = "url('#default#userData')";
			document.getElementsByTagName('head')[0].appendChild(this._element);
		}

		return this._element;
	},

	removeElement: function () {
		if (this._element !== null) {
			AC_Element.remove(this._element);
		}

		return this._element;
	}
};

module.exports = api_userData;

},{"ac-dom-nodes":23}],173:[function(require,module,exports){
'use strict';

var DAY = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr

/**
 * Figure out the expiration date based on the current date or the supplied date object,
 * and the amount of days until it is set to expire.
 *
 * @memberOf Item
 * @static
 *
 * @param  {Integer} days How many days from the fromDate do we want this to expire in?
 * @param  {Date|Integer} fromDate If not right now, when do we start couting? As a Date object or timestamp.
 *
 * @return {Integer} Timestamp
 *
 */
var createExpirationDate = function (days, fromDate) {
	if (typeof days !== 'number') {
		throw 'ac-storage/Item/createExpirationDate: days parameter must be a number.';
	}

	// fromDate can be a Date object or timestamp
	if (fromDate === undefined || typeof fromDate === 'number') {
		fromDate = fromDate === undefined ? new Date() : new Date(fromDate);
	}

	if (typeof fromDate.toUTCString !== 'function' || fromDate.toUTCString() === 'Invalid Date') {
		throw 'ac-storage/Item/createExpirationDate: fromDate must be a date object, timestamp, or undefined.';
	}

	fromDate.setTime(fromDate.getTime() + (days * DAY));

	// Return as time stamp (e.g. 1322849543460)
	return fromDate.getTime();
};


module.exports = createExpirationDate;

},{}],174:[function(require,module,exports){
'use strict';

var compressor = require('./encoder/compressor');

/**
 * Compress an item’s state object before serializing for storage
 *
 * @memberOf Item
 * @namespace Item/encoder
 *
 * @type {Object}
 *
 */
var encoder = {
	/**
	 * Encode and compress JSON string to store state of this Item
	 *
	 * @memberOf Item/encoder
	 *
	 * @param {Object} stateObj Uncompressed state object
	 *
	 * @return {String} Compressed state object string
	 */
	encode: function (stateObj) {
		var stateObjString;
		var compressedStateObj;

		compressedStateObj = compressor.compress(stateObj);

		try	{
			stateObjString = JSON.stringify(compressedStateObj);
		} catch (ignore) { }

		if (!this.__isValidStateObjString(stateObjString)) {
			throw 'ac-storage/Item/encoder/encode: state object is invalid or cannot be saved as string';
		}

		return stateObjString;
	},


	/**
	 * Decode and decompress JSON string to state object
	 *
	 * @memberOf Item/encoder
	 *
	 * @param {String} stateObjString Compressed state object as string
	 *
	 * @return {Object} Decompressed state object
	 */
	decode: function (stateObjString) {
		var stateObj;
		var decompressedStateObj;

		if (!this.__isValidStateObjString(stateObjString)) {
			if (stateObjString === undefined || stateObjString === null || stateObjString === '') {
				return null;
			}

			throw 'ac-storage/Item/encoder/decode: state string does not contain a valid state object';
		}

		try {
			stateObj = JSON.parse(stateObjString);
		} catch (ignore) {
			throw 'ac-storage/Item/encoder/decode: Item state object could not be decoded';
		}

		decompressedStateObj = compressor.decompress(stateObj);

		return decompressedStateObj;
	},


	/**
	 * Check if the state object string containts a valid state object
	 *
	 * @memberOf Item/encoder
	 * @private
	 * @ignore
	 *
	 * @param  {Mixed} stateObjString to be validated
	 *
	 * @return {Boolean} Is the argument passed in a valid state object?
	 */
	__isValidStateObjString: function (stateObjString) {
		try {
			if (stateObjString !== undefined && stateObjString.substring(0,1) === '{') {
				return true;
			}
			return false;
		}
		catch (e) {
			return false;
		}

	}
};

module.exports = encoder;

},{"./encoder/compressor":175}],175:[function(require,module,exports){
/**
 * Compress an item’s state object before serializing for storage
 *
 * @memberOf Item/encoder
 * @namespace Item/encoder/compressor
 *
 * @type {Object}
 *
 */

var DAY      = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr
var DATE_KEY = 14975; // number of days (rounded down) from Jan 01 2011

var compressor = {

	mapping : {
		key :            'k',
		checksum :       'c',
		expirationDate : 'e',
		metadata :       'm',
		value :          'v'
	},

	/**
	 * Compress object to save bytes when storing Item state
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param {Object} stateObj Uncompressed state object
	 *
	 * @return {Object} Compressed state object
	 */
	compress: function (stateObj) {

		var compressedStateObj = {};
		var mapping = compressor.mapping;

		for (var prop in mapping) {

			if(stateObj.hasOwnProperty(prop) && stateObj[prop]) {

				if (prop === 'expirationDate') {
					// convert the expiration date to days
					var days = this.millisecondsToOffsetDays(stateObj[prop]);

					compressedStateObj[mapping[prop]] = days;
				} else {
					compressedStateObj[mapping[prop]] = stateObj[prop];
				}
			}
		}

		return compressedStateObj;
	},

	/**
	 * Compress object to restore Item state
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param {Object} stateObj Compressed state object
	 *
	 * @return {Object} Decompressed state object
	 */
	decompress: function (compressedStateObj) {

		var stateObj = {};
		var mapping = compressor.mapping;


		for (var prop in mapping) {

			if(compressedStateObj.hasOwnProperty(mapping[prop])) {

				if (prop === 'expirationDate') {
					// convert the expiration date back to milliseconds
					var milliseconds = this.offsetDaysToMilliseconds(compressedStateObj[mapping[prop]]);

					stateObj[prop] = milliseconds;
				} else {
					stateObj[prop] = compressedStateObj[mapping[prop]];
				}
			}

		}

		return stateObj;
	},

	/**
	 * Convert milliseconds to days
	 * Rounds down to the nearest day
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param  {Integer} number of milliseconds
	 *
	 * @return {Integer} number of days
	 */
	millisecondsToOffsetDays: function (milliseconds) {
		return Math.floor(milliseconds / DAY) - DATE_KEY;
	},

	/**
	 * Convert days to milliseconds
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param  {Integer} number of days
	 *
	 * @return {Integer} number of milliseconds
	 */
	offsetDaysToMilliseconds: function (days) {
		return (days + DATE_KEY) * DAY;
	}
};

module.exports = compressor;

},{}],176:[function(require,module,exports){
'use strict';

var ac_Object          = require('ac-object');
var api_localStorage   = require('./Item/apis/localStorage');
var registry           = require('./Storage/registry');

/**
 * Default options for Storage instances. Currently there are none.
 *
 * @memberOf Storage~
 * @private
 *
 * @type {Object}
 */
var defaultOptions = {};

/**
 * Wrapper for localStorage and sessionStorage for key/value pair storage outside of the page context.
 *
 * @constructor Storage
 *
 * @param {String} namespace
 * @param {Object} options Optional; Override default options if applicable
 *
 * @property {String} namespace Any item accessed through an instance of Storage will have this string prepending it’s key.
 * @property {Object} options Configuration object for this instance
 *
 */
function Storage(namespace, options) {
	this._namespace = namespace || '';
	this._options = ac_Object.extend(ac_Object.clone(defaultOptions), options || {});
}

Storage.prototype = {
	/**
	 * Get the value of an Item for a key from storage
	 *
	 * @memberOf Storage#
	 *
	 * @param {String} key
	 *
	 * @return {Mixed | null} Value of item for key
	 */
	getItem: function (key) {
		// Get the Item object from the registry
		var item = this.__item(key);

		// Load the saved state from storage
		item.load();

		// Return the item’s value
		return item.value();
	},



	/**
	 * Store a value for a key.
	 *
	 * @memberOf Storage#
	 *
	 * @param {String} key
	 * @param {Mixed} value Value can be any simple object. It will be stringified into JSON, then parse back when retrieved.
	 *
	 * @return {Boolean}
	 */
	setItem: function (key, value) {

		// Get the Item object from the registry
		var item = this.__item(key);

		if (value === undefined) {
			throw 'ac-storage/Storage#setItem: Must provide value to set key to. Use #removeItem to remove.';
		}

		// Update item’s state
		item.setValue(value);

		return item.save();
	},



	/**
	 * Remove an item from storage
	 *
	 * @memberOf Storage#
	 *
	 * @param {String} key
	 *
	 * @return {Boolean}
	 */
	removeItem: function (key) {
		// Get the Item object from the registry
		var item = this.__item(key);

		// Remove item from registry
		registry.remove(item.key(), true);

		// Remove the item from storage
		return item.save();
	},

	// /**
	//  * Removes all localStorage values that have expired.
	//  * Also removes any #userData values with the same key.
	//  *
	//  * @memberOf Storage
	//  * @name removeExpired
	//  * @method
	//  *
	// */
	removeExpired: function () {
		var item;
		var i;

		// Expiration is only relevant for localStorage and #userData,

		if (api_localStorage.available()) {

			// Iterate over all localStorage items
			for (i = 0; i < window.localStorage.length; i++) {
				// Get the item object from the key
				item = this.__item(window.localStorage.key(i));

				//Remove if expired
				if (item.hasExpired() && JSON.parse(window.localStorage[window.localStorage.key(i)]).v !== 'undefined') {
					item.remove();
				}
			}

		} else {

			// Iterate over all userData items
			var storeID = 'ac-storage';
			var el = document.getElementById('userData');
			el.load(storeID);
			var attr;
			var doc = el.xmlDocument; // the reference to the XMLDocument
			var attributes = doc.firstChild.attributes; // the root element will always be the firstChild of the XMLDocument
			var len = attributes.length;

			i = -1;

			while ( ++i < len ) {
				attr = attributes[i];
				item = this.__item(attr.nodeName);
				if(item.hasExpired() && JSON.parse(attr.nodeValue).v !== 'undefined') {
					item.remove();
				}
			}
		}

	},

	/**
	 * Gets Item instance for key using registry, pre-pending with namespace
	 *
	 * @memberOf Storage#
	 * @private
	 *
	 * @param  {String} key
	 *
	 * @return {Object} Instance of {@link Item} for the key provided, prepended by namespace.
	 *
	 */
	__item: function (key) {
		if (typeof key !== 'string' || key === '') {
			throw 'ac-storage/Storage: Key must be a String.';
		}

		// Get the Item object from the registry
		var item = registry.item(this.namespace() + key);

		return item;
	},

	/// Explicit Accessors
	/**
	 * @module ac-storage.Storage#namespace
	 * @function
	 *
	 * @returns {String} The namespace for this Storage object, which will be prepended to any keys
	 */
	namespace: function() {
		return this._namespace;
	},

	/**
	 * @module 	ac-storage.Storage#setNamespace
	 * @desc 	Sets the namespace for this Storage object, which will be prepended to any keys
	 * @function
	 *
	 * @param {String} value
	 **/
	setNamespace: function( value ) {
		this._namespace = value;
	},

	/**
	 * @module ac-storage.Storage#options
	 * @function
	 *
	 * @returns {Object} options Configuration object for this instance
	 */
	options: function() {
		return this._namespace;
	},

	/**
	 * @module 	ac-storage.Storage#setOptions
	 * @desc 	Sets the Configuration object for this instance
	 * @function
	 *
	 * @param {Object} value
	 **/
	setOptions: function( value ) {
		this._namespace = value;
	}
};

module.exports = Storage;

},{"./Item/apis/localStorage":171,"./Storage/registry":177,"ac-object":127}],177:[function(require,module,exports){
'use strict';

var Item = require('../Item');

var items = {};

/**
 * Singleton for storing instances of items for use with storage/storage.
 * Not used when referencing storage/Item directly.
 *
 * @memberOf Storage
 * @namespace Storage/registry
 *
 */
var registry = {
	/**
	 * Get an item from the registry by key. If the item does not exist
	 * in the registry yet, it will create a new Item with that key and
	 * load it’s state from storage.
	 *
	 * @memberOf Storage/registry
	 *
	 * @param  {String} key
	 *
	 * @return {Item}
	 *
	 */
	item: function (key) {
		var item = items[key];

		if (!item) {
			item = this.register(key);
		}

		return item;
	},

	/**
	 * Register a new Item for easy lookup later
	 *
	 * @memberOf Storage/registry
	 *
	 * @param  {String} key
	 *
	 * @return {Item}
	 *
	 */
	register: function (key) {
		var item = items[key];

		if (!item) {
			// Create a new Item in page memory
			item = new Item(key);

			// Add item to registry list
			items[key] = item;
		}

		return item;
	},

	/**
	 * Clear the whole registry
	 *
	 * @memberOf Storage/registry
	 *
	 * @param {Boolean} alsoRemoveItemFromStorage Default is `false`; Whether we should manually clear the page memory as well.
	 *
	 * @return {Promise}
	 */
	clear: function (alsoRemoveItemFromStorage) {
		var key;

		for (key in items) {
			this.remove(key, alsoRemoveItemFromStorage);
		}

		return true;
	},

	/**
	 * Remove an item from the registry
	 *
	 * @memberOf Storage/registry
	 *
	 * @param {String} key
	 * @param {Boolean} alsoRemoveItemFromStorage Default is `false` Whether we should manually clear the page memory as well.
	 *
	 * @return {Promise}
	 */
	remove: function (key, alsoRemoveItemFromStorage) {
		var item = items[key];

		if (item && !!alsoRemoveItemFromStorage) {
			item.remove();
		}

		items[key] = null;

		return true;
	}
};

module.exports = registry;

},{"../Item":169}],178:[function(require,module,exports){
'use strict';

var apis = require('../Item/apis');

var available;

/**
 *
 * @namespace Storage
 *
 * @return {Boolean} Whether or not there are any available APIs for which to store persistent data.
 *
 */

module.exports = function storageAvailable() {

	// Memoize
	if (available !== undefined) {
		return available;
	}

	// If there is no best API, then assume no APIs are available.
	available = !!apis.best();

	return available;
};

},{"../Item/apis":170}],"++O3BW":[function(require,module,exports){
/**
 * @module ac-analytics
 * @copyright 2014 Apple Inc. All rights reserved.
 */
module.exports = {
	observer: {
		Audio:      require('./ac-analytics/observer/Audio'),
		Click:      require('./ac-analytics/observer/Click'),
		Event:      require('./ac-analytics/observer/Event'),
		Exit:       require('./ac-analytics/observer/Exit'),
		Gallery:    require('./ac-analytics/observer/Gallery'),
		Link:       require('./ac-analytics/observer/Link'),
		Overlay:    require('./ac-analytics/observer/Overlay'),
		Page:       require('./ac-analytics/observer/Page'),
		Section:    require('./ac-analytics/observer/Section'),
		Video:      require('./ac-analytics/observer/Video')
	},
	regions: require('./ac-analytics/regions/regions'),
	createBasicObserverSuite: require('./ac-analytics/factory/basicObserverSuite').create,
	reset: require('./ac-analytics/reset')
};

},{"./ac-analytics/factory/basicObserverSuite":"eT/lVE","./ac-analytics/observer/Audio":"0uVCsT","./ac-analytics/observer/Click":"smIHK0","./ac-analytics/observer/Event":"FP42yW","./ac-analytics/observer/Exit":"G1nVnI","./ac-analytics/observer/Gallery":"7OkBs0","./ac-analytics/observer/Link":"csLHIR","./ac-analytics/observer/Overlay":"ZDCq+L","./ac-analytics/observer/Page":"2ltmNh","./ac-analytics/observer/Section":"ft2q1p","./ac-analytics/observer/Video":"EVr9gK","./ac-analytics/regions/regions":"DxeItO","./ac-analytics/reset":"DebV0p"}],"ac-analytics":[function(require,module,exports){
module.exports=require('++O3BW');
},{}],"ac-analytics/Queue":[function(require,module,exports){
module.exports=require('ZTQIFU');
},{}],"ZTQIFU":[function(require,module,exports){
'use strict';

var proto;
var ac_Array = require('ac-array');
var errorHandler = require('./error-handler/ErrorHandler');
var ac_Storage = require('ac-storage');
var STORAGE_KEY = require('./storageKey').analyticsQueue;

function Queue() {
	this._storage = ac_Storage;
	this._arr = [];
	this._length = 0;
}

proto = Queue.prototype;

proto.add = function(item) {
	if (!item) {
		errorHandler.log('Queue', 'add', item + ' is not a valid object');
	}

	if (errorHandler.exception) {
		return;
	}

	this._arr.push(item);
	this._updateQueueSize();
};

proto.remove = function () {
	if (this.size() > 0) {
		this._arr.shift();
		this._updateQueueSize();
	}
};

proto.reset = function () {
	this._arr = [];
	this._length = 0;
};

proto.peek = function () {
	if (this.size() > 0) {
		return this._arr[0];
	}
};

proto.isEmpty = function () {
	return (this.size() === 0);
};

proto.size = function () {
	return this._length;
};

proto.load = function () {
	var analyticsData = this._storage.getItem(STORAGE_KEY);

	if (Array.isArray(analyticsData)) {
		this._arr = analyticsData;
		this._storage.removeItem(STORAGE_KEY);
		this._updateQueueSize();
	}
};

proto.save = function () {
	this._storage.setItem(STORAGE_KEY, this._arr);
	this.reset();
};

proto.collect = function () {
	var analyticsQueue = this._arr;
	var analyticsData = this._storage.getItem(STORAGE_KEY);

	if (Array.isArray(analyticsData)) {
		var temp = analyticsData;
		analyticsQueue = temp.concat(analyticsQueue);
	}
	this._storage.setItem(STORAGE_KEY, analyticsQueue);
	this.reset();
};

proto.canSave = function () {
	return this._storage.storageAvailable();
};

proto._updateQueueSize = function () {
	this._length = this._arr.length;
};

module.exports = Queue;

},{"./error-handler/ErrorHandler":"yoExqy","./storageKey":"ntdzZF","ac-array":1,"ac-storage":168}],"vBwaVP":[function(require,module,exports){
'use strict';

var proto;

var Deferred = require('ac-deferred').Deferred;
var Queue = require('./Queue');
var plugins = require('./plugins/plugins');
var translator = require('./translator/translator');
var errorHandler = require('./error-handler/ErrorHandler');
var moduleName = 'Tracker';

// A singleton that collects, queues and runs an analytics queue asynchronously
function Tracker (plugin) {

	if (typeof plugins[plugin] === 'function') {
		this.plugin = new plugins[plugin]();
	} else {
		errorHandler.log(moduleName, null, 'Could not create a Tracker. "' + plugin + '" is not a valid plugin');
	}

	if (errorHandler.exception) {
		return;
	}

	this.paused = false;

	this._queue = new Queue();

	// If there is something left in the storage that we want to flush out
	this.resume();
}

proto = Tracker.prototype;

// Adds an analytics request to the queue and runs the queue
proto.track = function (request) {
	var translatedRequest;

	if (!request || typeof request !== 'object' || !request.type) {
		errorHandler.log(moduleName, 'track', request + ' is not a valid request object');
	}

	if (errorHandler.exception) {
		return;
	}

	// Translate the request into a generic format
	translatedRequest = translator.translate(request);

	// Translate the generic request into plugin (sCode) specific format
	translatedRequest = this.plugin.translate(translatedRequest);
	this._queue.add(translatedRequest);

	if (this.paused === true) {
		this._queue.collect();
		return;
	}

	this._run();
};

// Checks if the Tracker is paused
proto.isPaused = function () {
	return this.paused;
};

// Resumes a paused analytics queue and sets paused property of the Tracker to false
proto.resume = function () {
	
	this._queue.load();

	var queueSize = this._queue.size();

	if (queueSize === 0) {
		return;
	}

	this.paused = false;

	this._run();
};

// Runs the analytics queue by submitting requests to the analytics plugin in sync or async
proto._run = function () {
	var promise;

	if (this._queue.size() === 0) {
		return;
	}

	// Adding logic to run requests synchronously
	var request = this._queue.peek();

	var options = request.options || {};

	// If we didnt find async option then we assume async is true
	if (typeof options.async === 'undefined') {
		options.async = true;
	}

	if (options.async === false) {
		promise = this.sync(this.send.bind(this));
	} else {
		promise = this.async(this.send.bind(this));
	}

	promise.then(function () {			
		if (!this.paused && this._queue.size() > 0) {
			this._run();
		}

	}.bind(this));

};

// Sends the queue for processing single request at a time
proto.send = function () {

	if (typeof this.plugin.submit !== 'function') {
		errorHandler.log(moduleName, 'send', 'provided plugin does not contain a valid submit method');
	}

	if (errorHandler.exception) {
		return;
	}
	
	if (this._queue.size() === 0) {
		return;
	}
	
	var request = this._queue.peek();

	this.plugin.submit(request);
	this._queue.remove();
};

// Pauses an analytics queue and sets paused property of the Tracker to true
proto.pause = function () {

	if (this.paused === true) {
		return;
	}

	if (!this.canPause()) {
		return;
	}

	if (this._queue.size() > 0) {
		this._queue.save();
	}

	this.paused = true;
};

// Checks if the Tracker can be paused
proto.canPause = function () {

	return this._queue.canSave();
};

// Runs a function in a zero second setTimeout
proto.async = function (callback) {

	var defer = new Deferred();

	if ((!callback) || (typeof (callback) !== 'function')) {
		errorHandler.log(moduleName, 'async', 'Provided callback "' + callback + '" is not a function');
	}

	if (errorHandler.exception) {
		return;
	}

	setTimeout(function() {

		callback();

		defer.resolve();

	}, 0);

	return defer.promise();
};

// Executes a callback synchronously
proto.sync = function (callback) {

	var defer = new Deferred();

	if ((!callback) || (typeof (callback) !== 'function')) {
		errorHandler.log(moduleName, 'sync', 'Provided callback "' + callback + '" is not a function');
	}

	if (errorHandler.exception) {
		return;
	}

	callback();

	defer.resolve();

	return defer.promise();
};

module.exports = Tracker;

},{"./Queue":"ZTQIFU","./error-handler/ErrorHandler":"yoExqy","./plugins/plugins":"kyzDBL","./translator/translator":"eq7uW9","ac-deferred":12}],"ac-analytics/Tracker":[function(require,module,exports){
module.exports=require('vBwaVP');
},{}],"FmX+Kz":[function(require,module,exports){
'use strict';

var proto;

var ac_DOMNodes = require('ac-dom-nodes');
var ac_DOMEvents = require('ac-dom-events');
var errorHandler = require('../error-handler/ErrorHandler');

var moduleName = 'TouchController';

/**
 * Tracks an actual click on a DOM element on touch devices.
 * @constructor TouchController
 * @param {object} element A DOM element
 * @requires module:ac-dom-nodes
 * @requires module:ac-dom-events
 * @requires module:ErrorHandler
 */

function TouchController (element, eventCallback) {

	if (!ac_DOMNodes.isElement(element)) {
		errorHandler.log(moduleName, null, element + ' is not a valid DOM element');
	}

	if (typeof eventCallback !== 'function') {
		errorHandler.log(moduleName, null, eventCallback + ' is not a valid function');
	}

	if (errorHandler.exception) {
		return;
	}

	this._element = element;

	this._eventCallback = eventCallback;

	this.addEventListener();
}

proto = TouchController.prototype;

/**
 * @name TouchController#addEventListener
 *
 * @function
 *
 * @desc Adds a touchstart event listener to a DOM element.
 */
proto.addEventListener = function () {
	ac_DOMEvents.addEventListener(this._element, 'touchstart', this._onTouchStart.bind(this));
};

/**
 * @name TouchController#removeEventListener
 *
 * @function
 *
 * @desc Removes a touchstart event listener from a DOM element.
 */
proto.removeEventListener = function () {
	ac_DOMEvents.removeEventListener(this._element, 'touchstart', this._boundOnTouchStart);
	ac_DOMEvents.removeEventListener(this._element, 'touchmove', this._boundOnTouchMove);
	ac_DOMEvents.removeEventListener(this._element, 'touchend', this._boundOnTouchEnd);
};

/**
 * @name TouchController#_onTouchStart
 *
 * @private
 *
 * @desc Listens to the touchstart event.
 */
proto._onTouchStart = function (e) {
	this.moved = false;

	this._boundOnTouchMove = this._onTouchMove.bind(this);
	this._boundOnTouchEnd = this._onTouchEnd.bind(this);

	ac_DOMEvents.addEventListener(this._element, 'touchmove', this._boundOnTouchMove);
	ac_DOMEvents.addEventListener(this._element, 'touchend', this._boundOnTouchEnd);
};

/**
 * @name TouchController#_onTouchMove
 *
 * @private
 *
 * @desc Listens to the touchmove event.
 */
proto._onTouchMove = function(e) {
	this.moved = true;
};

/**
 * @name TouchController#_onTouchEnd
 *
 * @private
 *
 * @desc Listens to the touchend event.
 */
proto._onTouchEnd = function(e) {
	ac_DOMEvents.removeEventListener(this._element, 'touchmove', this._boundOnTouchMove);
	ac_DOMEvents.removeEventListener(this._element, 'touchend', this._boundOnTouchEnd);

	if (!this.moved) {
		this._eventCallback(e);
	}
};

/**
 * @name TouchController#destroy
 *
 * @desc Kills the touch observer events and properties.
 */
proto.destroy = function () {
	this.removeEventListener();
	this._element = null;
	this._eventCallback = null;
	this._boundOnTouchStart = null;
};

module.exports = TouchController;
},{"../error-handler/ErrorHandler":"yoExqy","ac-dom-events":13,"ac-dom-nodes":23}],"ac-analytics/controller/Touch":[function(require,module,exports){
module.exports=require('FmX+Kz');
},{}],"DckvZc":[function(require,module,exports){
(function () {
	'use strict';

	// parse options from a data-attribute string
	// returns an object with options
	// assumes string is colon/comma separated
	// e.g. data-foo="color:blue,format:landscape"
	function dataStringToObject (data) {
		var options;
		var optionsObj = {};
		var splitOption;

		if (data && data.length > 0) {
			options = data.split(',');
			if (options && options.length > 0) {
				options.forEach(function (option) {
					splitOption = option.split(':');
					optionsObj[splitOption[0]] = splitOption[1];
				});
			}
		}

		return optionsObj;
	}

	module.exports = {
		dataStringToObject: dataStringToObject
	};
}());
},{}],"ac-analytics/data-attr/helper":[function(require,module,exports){
module.exports=require('DckvZc');
},{}],"yoExqy":[function(require,module,exports){
'use strict';

var proto;
var ac_console = require('ac-console');
var messagePrefix = 'Analytics';

function ErrorHandler () {
	this.exception = false;
	this.errors = [];
}

proto = ErrorHandler.prototype;

proto.log = function (moduleName, methodName, message) {
	var formattedMessage = this._formatMessage(moduleName, methodName, message);

	this.exception = true;

	this.errors.push({
		instance: moduleName,
		method: methodName,
		message: formattedMessage
	});

	ac_console.log(formattedMessage);

};

proto.report = function (index) {
	var out = '';
	if (typeof index === 'number' && this.errors[index]) {
		out = this.errors[index].message;
		ac_console.log(this.errors[index].message);
	} else {
		this.errors.forEach(function (err) {
			out += err.message + '\r\n';
		});
		ac_console.log(out);
	}

	return out;
};


proto._formatMessage = function (moduleName, methodName, message) {
	var thrower;
	var throwerString = '';
	var separator = ' : ';
	var throwerSep;

	if (!!moduleName || !!methodName) {
		throwerSep = (moduleName && methodName) ? '.' : '';
		throwerString = (moduleName || '') + throwerSep + (methodName || '') + separator;
	}

	return messagePrefix + separator + throwerString + message;
};

module.exports = new ErrorHandler();

},{"ac-console":8}],"ac-analytics/error-handler/ErrorHandler":[function(require,module,exports){
module.exports=require('yoExqy');
},{}],"eT/lVE":[function(require,module,exports){
'use strict';

var PageObserver = require('../observer/Page');
var LinkObserver = require('../observer/Link');
var ClickObserver = require('../observer/Click');
var SectionObserver = require('../observer/Section');
var ac_Object = require('ac-object');
var onDocumentReady = require('../onDocumentReady');

var defaults = {
	page: {
		// allow page observer to enable as soon as possible
	},
	link: {
		autoEnable: false
	},
	click: {
		autoEnable: false
	},
	section: {
		autoEnable: false
	}
};

function _enableObservers (observers) {
	for (var prop in observers) {
		if (observers.hasOwnProperty(prop)) {
			if (typeof observers[prop].enable === 'function') {
				observers[prop].enable();
			}
		}
	}
}

function create (options) {
	options = ac_Object.extend(defaults, options || {});

	var observers = {
		page: new PageObserver(options.page),
		link: new LinkObserver(options.link),
		click: new ClickObserver(options.click),
		section: new SectionObserver(options.section)
	};

	onDocumentReady(function () {
		_enableObservers(observers);
	});

	return observers;
}

module.exports = {
	create: create
};

},{"../observer/Click":"smIHK0","../observer/Link":"csLHIR","../observer/Page":"2ltmNh","../observer/Section":"ft2q1p","../onDocumentReady":"s+JdTz","ac-object":127}],"ac-analytics/factory/basicObserverSuite":[function(require,module,exports){
module.exports=require('eT/lVE');
},{}],"W+q+EN":[function(require,module,exports){
(function () {
	'use strict';

	var ac_Array = require('ac-array');
	var errorHandler = require('./error-handler/ErrorHandler');
	var head = document.getElementsByTagName('head')[0];
	var metaTags = ac_Array.toArray(head.getElementsByTagName('meta'));
	var metaPropertyPrefix = 'analytics';
	var prefixPattern = '^' + metaPropertyPrefix + '-';
	var patternRegex = new RegExp(prefixPattern);
	var metaObject;
	var initialTimeStamp = Date.now();
	var moduleName = 'metadata';

	// Gets the name of the product used in the track meta tag
	function _getProductName (metaObject) {

		var analyticsPageTitle = _strToArray(metaObject.track);

		if (!Array.isArray(analyticsPageTitle) || analyticsPageTitle.length === 0) {
			errorHandler.log(moduleName, '_getProductname', '"track" meta tag value is malformed. e.g. "product name - page name"');
		}

		if (errorHandler.exception) {
			return;
		}

		return analyticsPageTitle[0].trim();
	}

	// Gets the page name from track meta tag
	function _getPageName (metaObject) {

		if (!metaObject.track || metaObject.track === '') {
			errorHandler.log(moduleName, '_getPageName', '"track" meta tag value is malformed. e.g. "product name - page name"');
		}

		if (errorHandler.exception) {
			return;
		}

		return metaObject.track.toLowerCase();
	}

	// Gets the current locale
	function _getLocale () {

		var htmlEl = document.documentElement;
		var locale = htmlEl.getAttribute('data-locale') || htmlEl.lang;

		if (!locale) {
			errorHandler.log(moduleName, '_getLocale', 'html lang attribute can not be empty');
		}

		if (errorHandler.exception) {
			return;
		}
		return locale;
	}

	// dump all meta tags into an object where the key/value pairs map to
	// the property/content attributes respectively.
	function _metaTagsToObject (tags) {
		tags = _filterMetaTags(tags);
		var metaObject = {};

		tags.forEach(function (tag) {
			var key = _transformPropertyName(tag.getAttribute('property'));
			var value = tag.getAttribute('content');
			metaObject[key] = value;
		});

		return metaObject;
	}

	// filters out all meta tags not prefixed with our defined prefix
	function _filterMetaTags (tags) {
		var filtered = tags.filter(function (tag) {
			var propName = tag.getAttribute('property');
			return patternRegex.test(propName);
		});

		return filtered;
	}

	// removes analytics property prefix and camelCases what remains
	function _transformPropertyName (name) {
		var transformed = name.replace(metaPropertyPrefix + '-', '');

		return transformed.replace(/-+(.)?/g, function (match, character) {
			return character ? character.toUpperCase() : '';
		});

	}

	// adds some normalized prperties to the meta object that we always
	// want to always provide
	function _augmentMetaObject (metaObject) {
		metaObject.pageName = metaObject.pageName || _getPageName(metaObject);
		metaObject.productName = metaObject.productName || _getProductName(metaObject);
		metaObject.locale = metaObject.locale || _getLocale();
		metaObject.initialTimeStamp = initialTimeStamp;

		return metaObject;
	}

	// converts a string to array based on a separator, defaults to '-'
	function _strToArray (str, separator) {
		separator = separator || '-';

		if (typeof str !== 'string') {
			errorHandler.log(moduleName, '_strToArray', str + ' is not a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		return str.split(separator);
	}

	function bundleMetaObject (metaTags) {
		metaObject = _metaTagsToObject(metaTags);
	}

	function getMetadata () {
		return _augmentMetaObject(metaObject);
	}

	function refreshMetadata () {
		metaTags = ac_Array.toArray(head.getElementsByTagName('meta'));
		metaObject = null;
		initialTimeStamp = Date.now();

		bundleMetaObject(metaTags);

		return _augmentMetaObject(metaObject);
	}

	bundleMetaObject(metaTags);

	module.exports = {
		getMetadata: getMetadata,
		refreshMetadata: refreshMetadata
	};

}());
},{"./error-handler/ErrorHandler":"yoExqy","ac-array":1}],"ac-analytics/metadata":[function(require,module,exports){
module.exports=require('W+q+EN');
},{}],"nHWlaR":[function(require,module,exports){
'use strict';

/** A module that exports a single instance of the Tracker with the default sCode plugin and also exports the Tracker constructor. Also exports the Tracker constructor.
 *  @module metricsTracker
 */
var Tracker = require('./Tracker');

module.exports = new Tracker ('sCode');
module.exports.Tracker = Tracker;

},{"./Tracker":"vBwaVP"}],"ac-analytics/metricsTracker":[function(require,module,exports){
module.exports=require('nHWlaR');
},{}],"0uVCsT":[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var ac_DOMEvents    = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	mediaEvents: ['play', 'pause', 'ended']
};

var moduleName = 'AudioAnalyticsObserver';

/**
 * Tracks HTML5 audio events and submits it to the Tracker.
 * @constructor AudioAnalyticsObserver
 * @param {object} audio A reference to the audio tag in the dom.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:ac-dom-events
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function AudioAnalyticsObserver(audio, options) {

	if (!audio) {
		errorHandler.log(moduleName, null, audio + ' is not a valid audio object');
	}

	defaultOptions.mediaEventCallbacks = {
		'ended': this._onEnded.bind(this)
	};

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.mediaEvents)) {
		errorHandler.log(moduleName, null, this.options.mediaEvents + ' is not a valid media events array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.audio = audio;
	this.tracker = metricsTracker;
	this.defaultTracking = this.track.bind(this);

	this.attachEvents();
}

proto = AudioAnalyticsObserver.prototype;

/**
 * @name AudioAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the audio element.
 */
proto.attachEvents = function () {
	var options = this.options;
	var customCallback;
	var mediaEventCallback;

	options.mediaEvents.forEach(function(mediaEvent) {
		customCallback = options.mediaEventCallbacks[mediaEvent];
		mediaEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.addListener(mediaEvent, mediaEventCallback);
	}.bind(this));
};

/**
 * @name AudioAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the audio element.
 */
proto.detachEvents = function () {
	var options = this.options;
	var customCallback;
	var mediaEventCallback;

	options.mediaEvents.forEach(function(mediaEvent) {
		customCallback = options.mediaEventCallbacks[mediaEvent];
		mediaEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.removeListener(mediaEvent, mediaEventCallback);
	}.bind(this));
};

/**
 * @name AudioAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the audio element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventName, callback) {
	ac_DOMEvents.addEventListener(this.audio, eventName, callback);
};

/**
 * @name AudioAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the audio element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventName, callback) {
	ac_DOMEvents.removeEventListener(this.audio, eventName, callback);
};

/**
 * @name AudioAnalyticsObserver#_onEnded
 *
 * @private
 *
 * @desc Adds an event handler to the 'ended' event of the audio element.
 */
proto._onEnded = function (e) {
	this.ended = true;
	this.track(e);
};

/**
 * @name AudioAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits a tracking request to the Tracker.
 * @param {object} e The event data object.
 */
proto.track = function(e) {

	var data = {};

	data.ended = this.ended;

	this.tracker.track({
		"type": "audio",
		"event": e,
		"data": data,
		"options": this.options
	});
};

/**
 * @name AudioAnalyticsObserver#destroy
 *
 * @desc Kills the audio observer events and properties.
 */
proto.destroy = function () {
	this.detachEvents();
	this.options = null;
	this.tracker = null;
	this.audio = null;
	this.defaultTracking = null;
};

module.exports = AudioAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-dom-events":13,"ac-object":127}],"ac-analytics/observer/Audio":[function(require,module,exports){
module.exports=require('0uVCsT');
},{}],"smIHK0":[function(require,module,exports){
'use strict';

var proto;

var ac_DOMTraversal = require('ac-dom-traversal');
var ac_DOMNodes     = require('ac-dom-nodes');
var ac_Object       = require('ac-object');
var ac_Feature      = require('ac-feature');
var ac_DOMEvents    = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');
var TouchController = require('../controller/Touch');
var EventEmitter    = require('ac-event-emitter').EventEmitter;

var defaultOptions = {
	dataAttribute: 'analytics-click',
	titleDataAttribute: 'analytics-title',
	autoEnable: true
};

var moduleName = 'ClickAnalyticsObserver';

/**
 * Tracks click interaction with any DOM element that has the data-analytics-click attribute.
 * @constructor ClickAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-dom-traversal
 * @requires module:ac-dom-nodes
 * @requires module:ac-dom-events
 * @requires module:ac-object
 * @requires module:ac-feature
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 * @requires module:ac-gesture-touchclick
 */
function ClickAnalyticsObserver (options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.isEnabled = false;
	this._boundOnInteraction = this._onInteraction.bind(this);
	this._touchGesture = [];
	this._elements = null;

	if (this.options.autoEnable === true) {
		this.enable();
	}

}

proto = ClickAnalyticsObserver.prototype = ac_Object.create(EventEmitter.prototype);

/**
 * @desc Queries the DOM, and attaches event listeners
 */
proto.enable = function () {
	if (!this.isEnabled) {
		this.addListener();
		this.isEnabled = true;
		this.trigger('enabled');
	}
};

/**
 * @name ClickAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds a listener to the document.body element and captures an interaction of click, mouseup or touch.
 */
proto.addListener = function () {
	var element = document.body;

	if (!ac_Feature.touchAvailable()) {
		ac_DOMEvents.addEventListener(element, 'mouseup', this._boundOnInteraction);
	} else {
		this._elements = ac_DOMTraversal.querySelectorAll('*[data-' + this.options.dataAttribute + ']');

		this._elements.forEach(function (element, i) {
			this._touchGesture[i] = new TouchController(element, this._boundOnInteraction);
		}.bind(this));
	}
};

/**
 * @name ClickAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes a listener from the document.body for mouseup, click or touch if it exists.
 */
proto.removeListener = function () {
	var element = document.body;
 	ac_DOMEvents.removeEventListener(element, 'mouseup', this._boundOnInteraction);
	if (this._touchGesture.length > 0) {

		this._touchGesture.forEach(function(touchgesture) {
			touchgesture.destroy();
		});
	}
};

/**
 * @name ClickAnalyticsObserver#_onInteraction
 *
 * @private
 *
 * @desc Determines the target element to be used for the request and calls track if the target element has the analytics data attribute.
 */
proto._onInteraction = function (e) {

	var targetEl = ac_DOMEvents.target(e);

	if (targetEl.getAttribute('data-' + this.options.dataAttribute)) {
		this.track(e, targetEl);
	}
};

/**
 * @function
 *
 * @name ClickAnalyticsObserver#track
 *
 * @desc Tracks a mouseup event.
 */
proto.track = function (e, targetEl) {

	var data = {};

	if (!ac_DOMNodes.isElement(targetEl)) {
		errorHandler.log(moduleName, 'track', targetEl + ' is not a valid DOM element');
	}

	if (errorHandler.exception) {
		return;
	}

	data.targetEl = targetEl;

	this.tracker.track({
		"type": "click",
		"event": e,
		"data": data,
		"options": this.options
	});
};

/**
 * @name ClickAnalyticsObserver#destroy
 *
 * @desc Kills the click observer events and properties.
 */
proto.destroy = function () {
	this.removeListener();
	this.options = null;
	this.tracker = null;
	this.isEnabled = null;
	this._boundOnInteraction= null;
	this._touchGesture = [];
	this._elements = null;
};

module.exports = ClickAnalyticsObserver;

},{"../controller/Touch":"FmX+Kz","../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-dom-events":13,"ac-dom-nodes":23,"ac-dom-traversal":49,"ac-event-emitter":121,"ac-feature":123,"ac-object":127}],"ac-analytics/observer/Click":[function(require,module,exports){
module.exports=require('smIHK0');
},{}],"ac-analytics/observer/Event":[function(require,module,exports){
module.exports=require('FP42yW');
},{}],"FP42yW":[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var errorHandler    = require('../error-handler/ErrorHandler');
var metricsTracker  = require('../metricsTracker');

var defaultOptions = {
	interactionEvents: [],
	interactionEventCallbacks: {}
};

var moduleName = 'EventAnalyticsObserver';

/**
 * Tracks any custom events passed to it in options object with the properties passed with options.data object.
 * @constructor EventAnalyticsObserver
 * @param {object} targetObj An object that is an EventEmitter or DOMEmitter.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 */
function EventAnalyticsObserver(targetObj, options) {

	if (!targetObj || typeof targetObj !== 'object' || typeof targetObj.on !== 'function' || typeof targetObj.off !== 'function') {
		errorHandler.log(moduleName, null, targetObj + ' does not appear to be a valid EventEmitter or DOMEmitter');
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.interactionEvents)) {
		errorHandler.log(moduleName, null, this.options.interactionEvents + ' is not an array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.tracker = metricsTracker;
	this.targetObj = targetObj;
	this._callbacks = {};

	this.attachEvents();
}

proto = EventAnalyticsObserver.prototype;

/**
 * @name EventAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the target object. One callback is allowed per event.
 */
proto.attachEvents = function () {
	var options = this.options;
	var interactionEventCallback;
	var instanceCallbackName;

	options.interactionEvents.forEach(function(interactionEvent) {
		// use provided callback for event or default to this.track
		interactionEventCallback = options.interactionEventCallbacks[interactionEvent];
		interactionEventCallback = (typeof interactionEventCallback === 'function') ? interactionEventCallback : this.track.bind(this);

		// store callback for access later
		this._callbacks[interactionEvent] = interactionEventCallback;

		// attach
		this.addListener(interactionEvent, interactionEventCallback);
	}, this);
};

/**
 * @name EventAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the target object.
 */
proto.detachEvents = function () {
	var options = this.options;
	var instanceCallbackName;

	// loop through stashed callbacks and remove the listeners
	Object.keys(this._callbacks).forEach(function(callbackName) {
		this.removeListener(callbackName, this._callbacks[callbackName]);
	}, this);
};

/**
 * @name EventAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the target object.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventType, callback) {
	this.targetObj.on(eventType, callback);
};

/**
 * @name EventAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the target object.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventType, callback) {
	this.targetObj.off(eventType, callback);
};

/**
 * @name EventAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits a tracking request to the Tracker.
 */
proto.track = function(data) {

	this.tracker.track({
		"type": "event",
		"data": data,
		"options": this.options
	});
};

/**
 * @name EventAnalyticsObserver#destroy
 *
 * @desc Kills the event observer events and properties.
 */
proto.destroy = function () {
	this.detachEvents();
	this.options = null;
	this.tracker = null;
	this.targetObj = null;
	this._callbacks = null;
};

module.exports = EventAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-object":127}],"G1nVnI":[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var ac_DOMEvents    = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	async: false
};

/**
 * Tracks the exit of a user from a page.
 * @constructor ExitAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:ac-dom-events
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function ExitAnalyticsObserver(options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});

	this.tracker = metricsTracker;

	this._boundOnBeforeUnload = this._onBeforeUnload.bind(this);

	this.addExitListener();
}

proto = ExitAnalyticsObserver.prototype;

/**
 * @name ExitAnalyticsObserver#addExitListener
 *
 * @function
 *
 * @desc Add an event listener to the window onbeforeunload event if it is available.
 */
proto.addExitListener = function () {

	if ('onbeforeunload' in window) {
		ac_DOMEvents.addEventListener(window, 'beforeunload', this._boundOnBeforeUnload);
	}
};

/**
 * @name ExitAnalyticsObserver#removeExitListener
 *
 * @function
 *
 * @desc Removes an event listener from the window onbeforeunload event if it is available.
 */
proto.removeExitListener = function () {

	if ('onbeforeunload' in window) {
		ac_DOMEvents.removeEventListener(window, 'beforeunload', this._boundOnBeforeUnload);
	}
};

/**
 * @name ExitAnalyticsObserver#_onBeforeUnload
 *
 * @private
 *
 * @desc Submits a page analytics request when user is exiting the page.
 */
proto._onBeforeUnload = function(e) {

	var data = {};

	data.exitTimeStamp = e.timeStamp;

	this.tracker.track({
		"type": "exit",
		"event": e,
		"data": data,
		"options": this.options
	});
};

/**
 * @name ExitAnalyticsObserver#destroy
 *
 * @desc Kills the exit observer events and properties.
 */
proto.destroy = function () {
	this.removeExitListener();
	this.options = null;
	this.tracker = null;
	this._boundOnBeforeUnload = null;
};

module.exports = ExitAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-dom-events":13,"ac-object":127}],"ac-analytics/observer/Exit":[function(require,module,exports){
module.exports=require('G1nVnI');
},{}],"7OkBs0":[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var metricsTracker  = require('../metricsTracker');
var metadata        = require('../metadata').getMetadata();
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	trackAutoRotate: false
};

var moduleName = 'GalleryAnalyticsObserver';

/**
 * Tracks user interaction with ac-gallery.
 * @constructor GalleryAnalyticsObserver
 * @param {object} gallery An instance of ac-gallery.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:metadata
 * @requires module:ErrorHandler
 */
function GalleryAnalyticsObserver(gallery, options) {

	if (!gallery || typeof gallery !== 'object') {
		errorHandler.log(moduleName, null, gallery + ' is not an object');
	}

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.gallery = gallery;
	this.tracker = metricsTracker;
	this.trackedInteractionTypes = [];
	this.outgoingSlideInteractionType = 'auto';
	this.incomingSlideTimestamp = metadata.initialTimeStamp;

	this.addListener();
}

proto = GalleryAnalyticsObserver.prototype;

/**
 * @name GalleryAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event listener to the ac-gallery 'didShow' event.
 */
proto.addListener = function() {
	this.gallery.on('willShow',  this._onWillShow, this);
	this.gallery.on('didShow',  this.track, this);
};

/**
 * @name GalleryAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes the event listener to the ac-gallery 'didShow' event.
 */
proto.removeListener = function() {
	this.gallery.off('willShow',  this._onWillShow, this);
	this.gallery.off('didShow', this.track, this);
};

/**
 * @name GalleryAnalyticsObserver#_onWillShow
 *
 * @function
 *
 * @desc Tracks event data on ac-gallery 'willShow' event before it gets through any timeouts.
 */
proto._onWillShow = function(d) {

	var interactionEvent;
	this.interactionEvent = null;

	// If interaction event is available then clone the required properties
	if (d.interactionEvent) {
		// Keyboard: interactionEvent and originalEvent both have the event data
		// Touch: originalEvent has the actual event data
		interactionEvent = d.interactionEvent.originalEvent || d.interactionEvent;

		if (interactionEvent) {
			// IE bug when sending Event info in a setTimeOut event reference is lost (member not found)
			this.interactionEvent = {
				type: interactionEvent.type,
				target: interactionEvent.target,
				srcElement: interactionEvent.srcElement
			};
		}
	}
};

/**
 * @name GalleryAnalyticsObserver#track
 *
 * @private
 *
 * @desc Submits a tracking request to the Tracker on gallery 'didShow' event.
 */
proto.track = function(d) {

	// Don't track an auto rotation that is not triggered by the user
	// On auto interaction ac-gallery can pass no interactionEvent or an instance of gallery
	if (this.options.trackAutoRotate === false) {
		if (!d.interactionEvent || d.interactionEvent.gallery && d.interactionEvent.gallery === this.gallery) {
			return false;
		}
	}

	var data = ac_Object.clone(d);

	data.interactionEvent = this.interactionEvent;

	if (!this.options.galleryName) {
		if (this.gallery.options.engagementElement && this.gallery.options.engagementElement.id) {
			this.options.galleryName = this.gallery.options.engagementElement.id;
		}
	}

	this.outgoingSlideTimestamp = this.incomingSlideTimestamp;
	this.incomingSlideTimestamp = Date.now();

	data.incomingSlideTimestamp = this.incomingSlideTimestamp;
	data.outgoingSlideTimestamp = this.outgoingSlideTimestamp;

	this.tracker.track({
		"type": "gallery",
		"data": data,
		"observer": this,
		"options": this.options
	});
};

/**
 * @name GalleryAnalyticsObserver#destroy
 *
 * @desc Kills the gallery observer events and properties.
 */
proto.destroy = function () {
	this.removeListener();
	this.options = null;
	this.tracker = null;
	this.gallery = null;
	this.trackedInteractionTypes = null;
	this.outgoingSlideInteractionType = null;
	this.outgoingSlideTimestamp = null;
	this.incomingSlideTimestamp = null;
	this.interactionEvent = null;
};

module.exports = GalleryAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metadata":"W+q+EN","../metricsTracker":"nHWlaR","ac-object":127}],"ac-analytics/observer/Gallery":[function(require,module,exports){
module.exports=require('7OkBs0');
},{}],"ac-analytics/observer/Link":[function(require,module,exports){
module.exports=require('csLHIR');
},{}],"csLHIR":[function(require,module,exports){
'use strict';

var ac_DOMTraversal = require('ac-dom-traversal');
var ac_Object       = require('ac-object');
var ac_DOMEvents    = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');
var EventEmitter      = require('ac-event-emitter').EventEmitter;

var proto;

var defaultOptions = {
	dataAttribute: 'analytics-click',
	titleDataAttribute: 'analytics-title',
	silent: true,
	autoEnable: true
};

/**
 * Tracks link clicks that bubble up to the document.body and submits tracking requests. If a link needs not to be tracked propogation must be stopped on it.
 * @constructor LinkAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-dom-traversal
 * @requires module:ac-object
 * @requires module:ac-dom-events
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function LinkAnalyticsObserver (options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.isEnabled = false;
	this.defaultTracking = this.track.bind(this);

	if (this.options.autoEnable === true) {
		this.enable();
	}
}

proto = LinkAnalyticsObserver.prototype = ac_Object.create(EventEmitter.prototype);

/**
 * @desc Queries the DOM, and attaches event listeners
 */
proto.enable = function () {
	if (!this.isEnabled) {
		this.addListener();
		this.isEnabled = true;
		this.trigger('enabled');
	}
};

/**
 * @name LinkAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds a mouseup handler to document.body for anchor tags.
 */
proto.addListener = function () {
	var element = document.body;
	ac_DOMEvents.addEventListener(element, 'mouseup', this.defaultTracking);
};

/**
 * @name LinkAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes the mouseup handler from document.body for anchor tags.
 */
proto.removeListener = function () {
	var element = document.body;
	ac_DOMEvents.removeEventListener(element, 'mouseup', this.defaultTracking);
};

/**
 * @name LinkAnalyticsObserver#track
 *
 * @private
 *
 * @desc Tracks a mouseup event.
 */
proto.track = function (e) {

	var data = {};

	var targetEl;

	var linkAncestor;

	var element = ac_DOMEvents.target(e);

	if (element.nodeName.toLowerCase() === 'a' && !element.getAttribute('data-' + this.options.dataAttribute)) {
		targetEl = element;
	}

	if (!targetEl) {

		linkAncestor = ac_DOMTraversal.ancestor(element, 'a');

		if (linkAncestor && !linkAncestor.getAttribute('data-' + this.options.dataAttribute)) {
			targetEl = linkAncestor;
		}
	}

	if (targetEl) {

		data.targetEl = targetEl;

		this.tracker.track({
			"type": "link",
			"event": e,
			"data": data,
			"options": this.options
		});
	}
};

/**
 * @name LinkAnalyticsObserver#destroy
 *
 * @desc Kills the link observer events and properties.
 */
proto.destroy = function () {
	this.removeListener();
	this.options = null;
	this.tracker = null;
	this.isEnabled = null;
	this.defaultTracking = null;
};

module.exports = LinkAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-dom-events":13,"ac-dom-traversal":49,"ac-event-emitter":121,"ac-object":127}],"ZDCq+L":[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	interactionEvents: ['open', 'close', 'reopen']
};

var moduleName = 'OverlayAnalyticsObserver';

/**
 * Tracks interaction events with an overlay and submits it to the Tracker.
 * @constructor OverlayAnalyticsObserver
 * @param {object} overlay An instance of the overlay.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function OverlayAnalyticsObserver(overlay, options) {

	if (!overlay || typeof overlay !== 'object'  || typeof overlay.on !== 'function' || typeof overlay.off !== 'function') {
		errorHandler.log(moduleName, null, overlay + ' is not an object');
	}

	defaultOptions.interactionEventCallbacks = {
		'open': this._onOpen.bind(this),
		'close': this._onClose.bind(this),
		'reopen': this._onReopen.bind(this)
	};

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.interactionEvents)) {
		errorHandler.log(moduleName, null, this.options.interactionEvents + ' is not a valid interaction events array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.overlay = overlay;
	this.tracker = metricsTracker;
	this.active = false;
	this.defaultTracking = this.track.bind(this);
	
	this.attachEvents();
}

proto = OverlayAnalyticsObserver.prototype;

/**
 * @name OverlayAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the overlay element.
 */
proto.attachEvents = function() {
	var options = this.options;
	var customCallback;
	var interactionEventCallback;

	options.interactionEvents.forEach(function(interactionEvent) {
		customCallback = options.interactionEventCallbacks[interactionEvent];
		interactionEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.addListener(interactionEvent, interactionEventCallback);
	}.bind(this));
};

/**
 * @name OverlayAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the overlay element.
 */
proto.detachEvents = function() {
	var options = this.options;
	var customCallback;
	var interactionEventCallback;

	options.interactionEvents.forEach(function(interactionEvent) {
		customCallback = options.interactionEventCallbacks[interactionEvent];
		interactionEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.removeListener(interactionEvent, interactionEventCallback);
	}.bind(this));
};

/**
 * @name OverlayAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the overlay element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventName, callback) {
	this.overlay.on(eventName, callback);
};

/**
 * @name OverlayAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the overlay element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventName, callback) {
	this.overlay.off(eventName, callback);
};

/**
 * @name OverlayAnalyticsObserver#_onOpen
 *
 * @private
 *
 * @desc Adds an event handler to the 'open' event of the overlay element.
 */
proto._onOpen = function (e) {
	this.active = true;
	this.track(e);
};

/**
 * @name OverlayAnalyticsObserver#_onReopen
 *
 * @private
 *
 * @desc Adds an event handler to the 'reopen' event of the overlay element.
 */
proto._onReopen = function (e) {
	this.active = true;
	this.track(e);
};

/**
 * @name OverlayAnalyticsObserver#_onClose
 *
 * @private
 *
 * @desc Adds an event handler to the 'close' event of the overlay element.
 */
proto._onClose = function (e) {
	this.active = false;
	this.track(e);
};

/**
 * @name OverlayAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits an overlay interaction event tracking request to the Tracker.
 * @param {object} e The event data object.
 */
proto.track = function(e) {
	var data = this.options.data || {};

	data.active = this.active;

	this.tracker.track({
		"type": "overlay",
		"event": e,
		"data": data,
		"options": this.options
	});
};

/**
 * @name OverlayAnalyticsObserver#destroy
 *
 * @desc Kills the overlay observer events and properties.
 */
proto.destroy = function () {
	this.detachEvents();
	this.options = null;
	this.tracker = null;
	this.overlay = null;
	this.active = null;
	this.defaultTracking = null;
};

module.exports = OverlayAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-object":127}],"ac-analytics/observer/Overlay":[function(require,module,exports){
module.exports=require('ZDCq+L');
},{}],"ac-analytics/observer/Page":[function(require,module,exports){
module.exports=require('2ltmNh');
},{}],"2ltmNh":[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');
var EventEmitter    = require('ac-event-emitter').EventEmitter;

var defaultOptions  = {
	autoEnable: true
};

/**
 * Tracks a single page load request and submits it to the Tracker.
 * @constructor PageAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function PageAnalyticsObserver(options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.data = this.options.data || {};
	this.isEnabled = false;

	if (this.options.autoEnable === true) {
		this.enable();
	}
}

proto = PageAnalyticsObserver.prototype = ac_Object.create(EventEmitter.prototype);

proto.enable = function () {
	if (!this.isEnabled) {
		this.track();
		this.isEnabled = true;
		this.trigger('enabled');
	}
};

/**
 * @name PageAnalyticsObserver#track
 *
 * @private
 *
 * @desc Submits a page analytics request.
 */
proto.track = function(e) {

	var data = this.options.data || {};

	this.tracker.track({
		"type": "page",
		"event": e,
		"data": data,
		"options": this.options
	});

};

/**
 * @name PageAnalyticsObserver#destroy
 *
 * @desc Kills the page observer properties.
 */
proto.destroy = function () {
	this.options = null;
	this.tracker = null;
	this.data = null;
	this.isEnabled = null;
};

module.exports = PageAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-event-emitter":121,"ac-object":127}],"ac-analytics/observer/Section":[function(require,module,exports){
module.exports=require('ft2q1p');
},{}],"ft2q1p":[function(require,module,exports){
'use strict';

var proto;

var ac_Object         = require('ac-object');
var ac_DOMTraversal   = require('ac-dom-traversal');
var ElementEngagement = require('ac-element-engagement').ElementEngagement;
var metricsTracker    = require('../metricsTracker');
var errorHandler      = require('../error-handler/ErrorHandler');
var dataAttr          = require('../data-attr/helper');
var EventEmitter      = require('ac-event-emitter').EventEmitter;

var defaultOptions = {
	dataAttribute: 'analytics-section-engagement',
	autoEnable: true
};

var trackedElementDefaults = {
	stopOnEngaged: false,
	timeToEngage: 1000
};

/**
 * Tracks section engagement for all elements with a dataAttribute passed in via options (defaults to data-analytics-section-engagement).
 * @constructor SectionAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-dom-traversal
 * @requires module:ac-element-engagement
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 * @requires module:dataAttr
 */

function SectionAnalyticsObserver (options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.elementEngagement = new ElementEngagement();
	this.isEnabled = false;

	if (this.options.autoEnable === true) {
		this.enable();
	}
}

proto = SectionAnalyticsObserver.prototype = ac_Object.create(EventEmitter.prototype);

/**
 * @desc Queries the DOM, loads up the element engagement and starts tracking
 */
proto.enable = function () {
	if (!this.isEnabled) {
		this._loadSections();
		this.isEnabled = true;
		this.trigger('enabled');
	}
};

/**
 * @name SectionAnalyticsObserver#_onDOMReady
 *
 * @private
 *
 * @desc Selects all elements onDOMReady, instantiates ElementEngagement with those elements and binds events.
 */
proto._loadSections = function () {
	this.sections = ac_DOMTraversal.querySelectorAll('[data-' + this.options.dataAttribute + ']');

	this.sections.forEach(function (section) {
		var options;
		var dataString = section.getAttribute('data-' + this.options.dataAttribute);

		// apply any options from the data attribute
		options = dataAttr.dataStringToObject(dataString);
		options = this._castDataAttributeOptions(options);

		// apply data attribute options using ttackedElementDefaults as the base
		options = ac_Object.defaults(trackedElementDefaults, options);

		this.elementEngagement.addElement(section, options);
	}, this);

	if (this.sections && this.sections.length > 0) {
		this._setPosition();
		this.options.elements = this.sections;
		this._bindEvents();
		this.elementEngagement.start();
	}
};

/**
 * @name SectionAnalyticsObserver#_setPosition
 *
 * @private
 *
 * @desc Add a section number for each section on the page.
 */
proto._setPosition = function () {
	var i;
	var totalSections = this.sections.length;

	for (i = 0; i < totalSections; i += 1) {
		// Start with 1
		this.sections[i].position = i + 1;
	}
};

/**
 * @desc options from the data attribute arrive in the form of a string.
 *       We need to convert them to their appropriate types
 * @private
 */
proto._castDataAttributeOptions = function (options) {
	var inViewThreshold;
	var timeToEngage;
	var trackOnce;
	options = ac_Object.clone(options);


	Object.keys(options).forEach(function (key) {
		var value = options[key];
		var castValue;

		// if boolean
		if (value === 'false') {
			castValue = false;
		} else if (value === 'true') {
			castValue = true;

		// numbers
		} else if (!isNaN(parseFloat(value))) {
			castValue = parseFloat(value);

		// else, it's just a string
		} else {
			castValue = value;
		}

		options[key] = castValue;
	});

	return options;
};

/**
 * @name SectionAnalyticsObserver#_bindEvents
 *
 * @private
 *
 * @desc Bind event callbacks for section engagement events.
 */
proto._bindEvents = function () {
	this.elementEngagement.on('thresholdexit', this._onThresholdExit, this);
	this.elementEngagement.windowDelegate.on('scroll', this._onScroll, this);
};

/**
 * @name SectionAnalyticsObserver#_unbindEvents
 *
 * @private
 *
 * @desc Unbind event callbacks for section engagement events.
 */
proto._unbindEvents = function () {
	this.elementEngagement.off('thresholdexit', this._onThresholdExit, this);
	this.elementEngagement.windowDelegate.off('scroll', this._onScroll, this);
};

/**
 * @name SectionAnalyticsObserver#_onThresholdExit
 *
 * @private
 *
  * @desc ‘thresholdexit‘ event callback.
 */
proto._onThresholdExit = function (trackedElement) {
	if (trackedElement.engaged) {
		var data = {
			element: trackedElement
		};
		this.elementEngagement.stop(trackedElement);
		this.track(data);
	}
};

proto._onScroll = function () {
	var windowDelegate = this.elementEngagement.windowDelegate;
	if (windowDelegate.scrollY() >= windowDelegate.maxScrollY()) {
		this._pageEnd();
	}
};

/**
 * Since we can't scroll any farther:
 * When we hit the bottom of the page we need to track any sections that are engaged
 * and we need to listen for engaged on inView sections that are not yet engaged
 */
proto._pageEnd = function () {
	var len = this.elementEngagement.elements.length;
	var sectionsInView = [];

	this.elementEngagement.elements.forEach(function (element) {
		if (element.inView && element.inThreshold && element.tracking) {
			sectionsInView.push(element);
		}
	});

	sectionsInView.forEach(function (section) {
		if (section.engaged) {
			this._forceTracking(section);
		} else {
			if (section.has('engaged') === false) {
				section.once('engaged', this._forceTracking, this);
			}
		}
	}, this);
};

proto._forceTracking = function (trackedElement) {
	// we need to enter a valid value for thresholdExitTime
	trackedElement.thresholdExitTime = Date.now();
	this.elementEngagement.stop(trackedElement);
	this.track({ element: trackedElement });
};

/**
 * @name SectionAnalyticsObserver#track
 *
 * @private
 *
 * @desc Submits a section engaged analytics request to the Tracker.
 */
proto.track = function (data) {
	this.tracker.track({
		type: 'section',
		data: data,
		options: this.options
	});
};

/**
 * @name SectionAnalyticsObserver#destroy
 *
 * @desc Kills the section observer events and properties.
 */
proto.destroy = function () {
	if (this.elementEngagement) {
		this.elementEngagement.stop();
	}
	this._unbindEvents();
	this.options = null;
	this.elementEngagement = null;
	this.tracker = null;
	this.sections = null;
};

module.exports = SectionAnalyticsObserver;

},{"../data-attr/helper":"DckvZc","../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-dom-traversal":49,"ac-element-engagement":119,"ac-event-emitter":121,"ac-object":127}],"ac-analytics/observer/Video":[function(require,module,exports){
module.exports=require('EVr9gK');
},{}],"EVr9gK":[function(require,module,exports){
'use strict';

var proto;

var ac_Object             = require('ac-object');
var errorHandler          = require('../error-handler/ErrorHandler');
var metricsTracker        = require('../metricsTracker');
var ac_DOMNodes_isElement = require('ac-dom-nodes/isElement');

/**
 * mediaEventCallbacks object should follow this format
 *
 * mediaEventCallbacks = {
 *   play: myPlaCallback.bind(someContext, 'play'),
 *   ended: myEndedCallback.bind(someContext, 'ended')
 * };
 */
var defaultOptions = {
	mediaEvents: [],
	mediaEventCallbacks: {},
	mediaEventPrefix: ''
};

var moduleName = 'VideoAnalyticsObserver';

var dataAttributeAnalyticsId = "data-analytics-id";

/**
 * Tracks HTML5 video events and submits it to the Tracker.
 * @constructor VideoAnalyticsObserver
 * @param {object} video An instance of ac-video.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 */
function VideoAnalyticsObserver(video, options) {
	var prefix;

	if (!video || typeof video !== 'object') {
		errorHandler.log(moduleName, null, video + ' is not an object');
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.mediaEvents)) {
		errorHandler.log(moduleName, null, this.options.mediaEvents + ' is not a valid media events array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.tracker = metricsTracker;
	this.video = video;
	this.playCount = 0;
	this.captionsEnableCount = 0;
	this._callbacks = {};

	prefix = this.options.mediaEventPrefix;

	this._events = {
		play: prefix + 'play',
		ended: prefix + 'ended',
		timeupdate: prefix + 'timeupdate',
		scrubStart: prefix + 'scrub-start',
		scrubEnd: prefix + 'scrub-end',
		captionsEnabled: prefix + 'captions-enabled'
	};

	this.attachEvents();
}

proto = VideoAnalyticsObserver.prototype;

/**
 * @name VideoAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the video element. One callback is allowed per event.
 */
proto.attachEvents = function () {
	var options = this.options;
	var mediaEventCallback;

	// Wire up user provided callbacks
	options.mediaEvents.forEach(function(mediaEvent) {
		// use provided callback for event or default to this.track
		mediaEventCallback = options.mediaEventCallbacks[mediaEvent];
		mediaEventCallback = (typeof mediaEventCallback === 'function') ? mediaEventCallback : this._defaultTracking.bind(this, mediaEvent);

		// store callback for access later
		this._callbacks[mediaEvent] = mediaEventCallback;

		// attach
		this.addListener(options.mediaEventPrefix + mediaEvent, this._callbacks[mediaEvent]);
	}.bind(this));

	// attach our private events
	this._bindPlay();
	this.video.on(this._events.ended, this._onEnded, this);
	this.video.on(this._events.captionsEnabled, this._onCaptionsEnabled, this);
	this.video.on(this._events.timeupdate, this._onTimeupdate, this);
};

/**
 * @name VideoAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the video element.
 */
proto.detachEvents = function () {
	var options = this.options;

	options.mediaEvents.forEach(function(mediaEvent) {
		this.removeListener(options.mediaEventPrefix + mediaEvent, this._callbacks[mediaEvent]);
	}.bind(this));
};

/**
 * @private
 * @name VideoAnalyticsObserver#_onPlay
 *
 * @desc Adds an event handler to the 'play' event of the video element.
 */
proto._onPlay = function (e) {
	var data = this._bundleTrackingData('play', e);
	data.playCount = this.playCount;
	this.track(data);
	this.playCount += 1;
	this._playBound = false;
};

proto._onTimeupdate = function (e) {
	if (e.currentTime === 0) {
		// don't bind on first play since the timeupdate event fires before the play event
		if (this.playCount > 0) {
			this._bindPlay();
		}
	}
};

proto._bindPlay = function () {
	if (!this._playBound) {
		this.video.once(this._events.play, this._onPlay, this);
		this._playBound = true;
	}
};

/**
 * @private
 * @name VideoAnalyticsObserver#_onCaptionsEnabled
 *
 * @desc Adds an event handler to the 'captions-enabled' event of ac-video.
 */
proto._onCaptionsEnabled = function (e) {
	var data = this._bundleTrackingData('captions-enabled', e);
	data.captionsEnableCount = this.captionsEnableCount;
	this.track(data);
	this.captionsEnableCount += 1;
};

/**
 * @private
 * @name VideoAnalyticsObserver#_onEnded
 *
 * @desc Adds an event handler to the 'ended' event of the video element.
 */
proto._onEnded = function (e) {
	var data = this._bundleTrackingData('ended', e);
	this.ended = true;
	this.track(data);
	// we don't always get a timeupdate back to 0 on ended.
	// so make sure we reattach the play listener
	this._bindPlay();
};

/**
 * @name VideoAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the video element.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventType, callback) {
	this.video.on(eventType, callback);
};

/**
 * @name VideoAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the video element.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventType, callback) {
	this.video.off(eventType, callback);
};

/**
 * @private
 * @name VideoAnalyticsObserver#_setCommonVideoData
 *
 * @desc Sets the common properties for each tracking request.
 */
proto._getCommonVideoData = function () {
	var data = {};
	var videoIdFromDataAttr;

	data.targetEl = this.video.el || this.video.element || null;
	videoIdFromDataAttr = (data.targetEl && ac_DOMNodes_isElement(data.targetEl)) ? data.targetEl.getAttribute(dataAttributeAnalyticsId) : '';

	data.videoId = (videoIdFromDataAttr) ? videoIdFromDataAttr : this.video.targetId;
	data.ended = this.ended;

	return data;
};

/**
 * @private
 * @name VideoAnalyticsObserver#_bundleTrackingData
 *
 * @desc Gets the currentTime property from an event object.
 */
proto._bundleTrackingData = function (eventType, e) {
	var commonTrackingData = this._getCommonVideoData();
	commonTrackingData.eventType = eventType;
	return ac_Object.extend(ac_Object.clone(e), commonTrackingData);
};

/**
 * @private
 * @name VideoAnalyticsObserver#_defaultTracking
 *
 * @desc Default tracking for media events.
 */
proto._defaultTracking = function (eventType, e) {
	var data = this._bundleTrackingData(eventType, e);
	this.track(data);
};

/**
 * @name VideoAnalyticsObserver#track
 * @function
 *
 * @desc Submits a tracking request to the Tracker.
 */
proto.track = function(data) {
	this.tracker.track({
		type: "video",
		data: data,
		options: this.options
	});
};

/**
 * @name VideoAnalyticsObserver#destroy
 *
 * @desc Kills the video observer events and properties.
 */
proto.destroy = function () {
	this.detachEvents();
	this.options = null;
	this.tracker = null;
	this.video = null;
	this.playCount = null;
	this.captionsEnableCount = null;
	this._events = null;
	this._callbacks = null;
};

module.exports = VideoAnalyticsObserver;

},{"../error-handler/ErrorHandler":"yoExqy","../metricsTracker":"nHWlaR","ac-dom-nodes/isElement":35,"ac-object":127}],"ac-analytics/onDocumentReady":[function(require,module,exports){
module.exports=require('s+JdTz');
},{}],"s+JdTz":[function(require,module,exports){
'use strict';

var isLoaded = false;
var ac_DOMEvents = require('ac-dom-events');



function onDocumentReady (func) {

	function _documentReadyCallback () {
		if (document.readyState === 'complete') {
			func();
			ac_DOMEvents.removeEventListener(document, 'readystatechange', _documentReadyCallback);
		}
	}

	if (document.readyState === 'complete') {
		func();
	} else {
		ac_DOMEvents.addEventListener(document, 'readystatechange', _documentReadyCallback);
	}
}

module.exports = onDocumentReady;

},{"ac-dom-events":13}],"ac-analytics/plugins/plugins":[function(require,module,exports){
module.exports=require('kyzDBL');
},{}],"kyzDBL":[function(require,module,exports){
'use strict';

module.exports = {
	sCode: require('./s-code/sCode')
};

},{"./s-code/sCode":"2v3JQJ"}],"M8C1F0":[function(require,module,exports){
(function() {

	'use strict';

	var ac_DOMNodes = require('ac-dom-nodes');
	var errorHandler = require('../../../error-handler/ErrorHandler');

	var moduleName = 'sCodePluginHelper-DOM';

	function isIntraPageLink (element) {
		var internalLink = true;
		if (ac_DOMNodes.isElement(element) && element.href) {
			var href = element.getAttribute('href');
			if (href.charAt(0) !== '#' && href.indexOf('javascript:') === -1) {
				internalLink = false;
			}
		}
		return internalLink;
	}

	function isStoreLink (url) {
		var pattern = new RegExp(/^(https?:\/\/.*\.apple\.com)?(\/[a-z\-_0-9]*)?\/shop(\/.*)?$/i);

		if (typeof url !== 'string') {
			errorHandler.log(moduleName, 'isStoreLink', url + ' is not a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		return pattern.test(url);
	}

	module.exports = {
		isIntraPageLink: isIntraPageLink,
		isStoreLink: isStoreLink
	};

}());

},{"../../../error-handler/ErrorHandler":"yoExqy","ac-dom-nodes":23}],"ac-analytics/plugins/s-code/helpers/DOM":[function(require,module,exports){
module.exports=require('M8C1F0');
},{}],"WZEdYN":[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../error-handler/ErrorHandler');
	var moduleName = 'sCodePluginFormatter';
	var separator   = require('./separator');

	// collection of helper methods that deal with formatting strings specifically for s-code requests

	function productName (value) {
		return lowerCaseString(value);
	}

	function channel (value, locale) {
		var prefix = 'www.';
		var customCountryCodeFormat = {
			"fr-ca": "ca.fr"
		};

		prefix += customCountryCodeFormat[locale] ? customCountryCodeFormat[locale] : legacyCountryCode(locale);

		return prefix + '.' + value;
	}

	function pageName (originalPageName, locale) {
		var suffix = '';
		// certain country codes are expressed differently in s-code
		var customCountryCodes = {
			"fr-ca": "ca-fr"
		};
		var customCode = customCountryCodes[locale];

		originalPageName = originalPageName || '';

		if (typeof locale === 'string') {
			locale = locale.toLowerCase();
			suffix = customCode ? customCode : legacyCountryCode(locale);
			suffix = _decorateCountryCode(suffix);
		}

		return lowerCaseString(originalPageName) + suffix;
	}


	// takes a prefix and a suffix to return a string used to represent specific events
	// that took place on the page: eg 's@v'
	// This string is typically used at the front of the s_code request strings.
	function eventString (prefix, suffix) {
		prefix = prefix || '';
		suffix = suffix || '';

		return !!prefix ? (prefix + '@' + suffix) : suffix;
	}


	// returns a value suitable for replacing the COUNTRY_CODE_FILTER template variable
	// This is used to identify internal vs outgoing links
	function countryCodeFilter (locale) {
		var translated;
		var customCountryFilter = {
			"fr-ca": "ca/fr",
			"en-419": "lae",
			"es-419": "la",
			"en-ap": "asia"
		};

		var reversedLocales = [
			'fr-be',
			'nl-be',
			'fr-ch',
			'de-ch'
		];

		if (customCountryFilter[locale]) {
			translated = customCountryFilter[locale];

		} else if (reversedLocales.indexOf(locale) >= 0) {
			var localeStr = _transformLocale(locale);
			translated = localeStr.reverse().join('-');

		} else {
			translated = _getCountryCodeFromLocale(locale);
		}

		return translated;
	}

	// returns the country code format for certain locales used in some of the
	// older metrics implemenation on apple.com
	function legacyCountryCode (locale) {
		var legacy;
		var customCountryCode = {
			"fr-be":  "bf",
			"nl-be":  "bl",
			"fr-ch":  "cr",
			"de-ch":  "ce",
			"en-419": "la",
			"es-419": "la",
			"en-gb":  "uk"
		};

		if (customCountryCode[locale]) {
			legacy = customCountryCode[locale];
		} else {
			legacy = _getCountryCodeFromLocale(locale);
		}

		return legacy;
	}

	// Cleans the property values in the properties object from any special characters.
	function cleanProps (properties) {

		var cleanProperties = {};

		if (typeof (properties) === 'object') {

			for (var key in properties) {
				cleanProperties[key] = _sanitize(properties[key]);
			}
		}

		return cleanProperties;
	}

	// Replaces all occurances of a target from a given string.
	function stringReplacer (str, target, replaceWith) {

		var transformedStr = str;

		target = (typeof target === 'string') ? target : '';

		replaceWith = (typeof replaceWith === 'string') ? replaceWith : '';

		if (typeof transformedStr === 'string') {
			transformedStr = transformedStr.replace(new RegExp(target, 'gi'), replaceWith);
		}

		return transformedStr;
	}

	function getRegionAncestry (data) {
		var regionAncestry = '';

		if (Array.isArray(data.regionAncestry)) {
			data.regionAncestry.forEach(function(region) {
	 			regionAncestry += region.name + separator.pipe;
	 		});
		}

		return regionAncestry;
	}

	function lowerCaseString(str) {
		if (typeof str === 'string') {
			str = str.toLowerCase();
		}

		return str;
	}

	/**
	 * PRIVATE FUNCTIONS
	 */

	// returns the lower-cased country abbreviation from a properly formatted locale abbreviation.
	// e.g. en-US => us
	// this appears to only be used for the sole purpose of supporting the legacy country code formats
	function _getCountryCodeFromLocale (locale) {

		if (!locale) {
			errorHandler.log(moduleName, '_getCountryCodeFromLocale', 'locale should be a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		var temp = _transformLocale(locale);
		var country;

		if (temp.length > 1) {
			country = lowerCaseString(temp[1]);
		}

		return country;
	}


	// returns a value appropriate for using in an s_code request string
	function _decorateCountryCode (countryCode) {
		
		if (!countryCode) {
			errorHandler.log(moduleName, '_decorateCountryCode', 'countryCode should be a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		return ' (' + lowerCaseString(countryCode) + ')';
	}

	// Cleans a string from special characters.

	var whitelist = /[\ì\î\ë\í]/g;

	function _sanitize (value) {

		if (typeof value === 'string') {
			value = value.replace(whitelist, '');
		}

		return value;
	}

	function _transformLocale (locale) {
		return locale.split(/[-_]/);
	}

	module.exports = {
		productName: productName,
		channel: channel,
		pageName: pageName,
		eventString: eventString,
		countryCodeFilter: countryCodeFilter,
		legacyCountryCode: legacyCountryCode,
		cleanProps: cleanProps,
		stringReplacer: stringReplacer,
		lowerCaseString: lowerCaseString,
		getRegionAncestry: getRegionAncestry
	};

}());

},{"../../../error-handler/ErrorHandler":"yoExqy","./separator":"9JEe2W"}],"ac-analytics/plugins/s-code/helpers/formatter":[function(require,module,exports){
module.exports=require('WZEdYN');
},{}],"DHq73b":[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../error-handler/ErrorHandler');
	var sProps = {
		channel: 'sChannel',
		campaign: 'sCampaign',
		bucket: 'sBucket',
		bucketProduct: 'sBucketProduct',
		bucketStore: 'sBucketStore'
	};

	var moduleName = 'sCodePluginMetadataHelper';
	
	function channel (topLevelMetadata) {
		var value = topLevelMetadata[sProps.channel];

		if (!value) {
			errorHandler.log(moduleName, 'channel', 'analytics-s-channel metadata tag must exist');
		}

		if (errorHandler.exception) {
			return;
		}

		value = value.toLowerCase().split(' ').join('.');

		return value;
	}

	function bucket (bucketIndex, topLevelMetadata) {
		var bucketProp = sProps.bucket + bucketIndex;

		if (!topLevelMetadata[bucketProp]) {
			errorHandler.log(moduleName, 'bucket', 'analytics-s-bucket-' + bucketIndex + ' metadata tag must exist');
		}

		if (errorHandler.exception) {
			return;
		}
		
		return topLevelMetadata[bucketProp];
	}

	// Gets the product string for bucket data. The bucket product for bucket 0,1,2 is optional. 
	// If we find it we append it to the bucket.
	function bucketProduct (bucketIndex, topLevelMetadata) {
		var bucketProductProp = sProps.bucketProduct + bucketIndex;
		var bucketProd = topLevelMetadata[bucketProductProp];

		return bucketProd;
	}

	// Gets the bucket string for store.
	function bucketStore (topLevelMetadata) {
		return topLevelMetadata[sProps.bucketStore] || '';
	}

	function campaign (topLevelMetadata) {
		return topLevelMetadata[sProps.campaign] || '';
	}

	function platform () {
		var value = 'other';
		var userAgent = navigator.userAgent;
		var patterns = {
			'mobile other': '/(kindle|silk-accelerated|android|webos|rim tablet os|windows phone)/i',
			'windows': /windows/i,
			'iphone/ipod touch': /(iphone|ipod)/i,
			'ipad': /(ipad)/i,
			'Mac': /Mac OS X/i
		};

		for (var key in patterns) {
			if (userAgent.match(patterns[key])) {
				value = key;
				break;
			}
		}

		return value;
	}

	module.exports = {
		channel: channel,
		bucket: bucket,
		bucketProduct: bucketProduct,
		bucketStore: bucketStore,
		platform: platform,
		campaign: campaign
	};
}());

},{"../../../error-handler/ErrorHandler":"yoExqy"}],"ac-analytics/plugins/s-code/helpers/metadata":[function(require,module,exports){
module.exports=require('DHq73b');
},{}],"ac-analytics/plugins/s-code/helpers/separator":[function(require,module,exports){
module.exports=require('9JEe2W');
},{}],"9JEe2W":[function(require,module,exports){
(function () {

	'use strict';

	module.exports = {
		pipe: ' | ',
		hyphen: ' - ',
		colon: ': '
	};
	
}());
},{}],"ac-analytics/plugins/s-code/helpers/templateVar":[function(require,module,exports){
module.exports=require('2ZvpEb');
},{}],"2ZvpEb":[function(require,module,exports){
(function () {

	'use strict';
	
	var formatter = require('./formatter');

	function set (metadata, originalMetaData) {
		return [
				{ name: "{PAGE_NAME}", value: metadata.pageName},
				{ name: "{PAGE_NAME_NO_LOCALE}", value: originalMetaData.pageName},
				{ name: "{CHANNEL}", value: metadata.channel},
				{ name: "{CAMPAIGN}", value: metadata.campaign},
				{ name: "{COUNTRY_CODE}", value: metadata.legacyCountryCode},
				{ name: "{COUNTRY_CODE_FILTER}", value: metadata.countryCodeFilter},
				{ name: "{PRODUCT_NAME}", value: metadata.productName},
				{ name: "{PLATFORM}", value: metadata.platform}
		];
	}

	function translate (str, templateVarArr) {
		if (typeof str === 'string') {
			templateVarArr.forEach(function(templateVar) {
				if (templateVar.name && typeof templateVar.name === 'string') {
					if (str.toLowerCase().indexOf(templateVar.name.toLowerCase()) > -1) {
						str = formatter.stringReplacer(str, templateVar.name, templateVar.value);
					}
				}
			});
		}

		return str;
	}

	module.exports = {
		set: set,
		translate: translate
	};
}());
},{"./formatter":"WZEdYN"}],"2v3JQJ":[function(require,module,exports){
'use strict';

var proto;

var errorHandler        = require('../../error-handler/ErrorHandler');
var ac_Object           = require('ac-object');
var ac_sCode            = require('ac-s-code');
var topLevelMetadata    = require('../../metadata');
var formatter           = require('./helpers/formatter');
var metadataHelper      = require('./helpers/metadata');
var translator          = require('./translator/translator');
var submitMethods       = require('./submit-methods/submitMethods');
var templateVarHelper   = require('./helpers/templateVar');

var countryBucket = [
	'us',
	'au|ca|cn|de|es|fr|it|jp|uk',
	'ap|at|bf|bl|br|ce|cr|dk|fi|hk|ie|in|kr|la|mx|nl|no|nz|pl|pt|ru|se|sg|th|tw|za'
];

var moduleName = 'SCodePlugin';

function SCodePlugin () {
	if (errorHandler.exception) {
		return;
	}

	this._initializePlugin(topLevelMetadata.getMetadata());
}

proto = SCodePlugin.prototype;

proto.reset = function () {
	var options = {
		force: true
	};

	this.clearProps();
	this._initializePlugin(topLevelMetadata.refreshMetadata(), options);
};

proto._initializePlugin = function (topLevelMetadataObj, options) {
	this.setPageMetadata(topLevelMetadataObj);
	this.setFormattedValues();
	this.setTemplateVars();

	// @TODO: This code has become very sequence dependent
	// Try to make the individual tasks independent of each other as much as we can
	// Replace any template token used for channel
	this.formattedValues.channel = this._replaceTemplateVars(this.formattedValues.channel);

	this.initializeSCode(topLevelMetadataObj, options);
};

proto.initializeSCode = function (topLevelMetadataObj, options) {
	options = options || {};
	options.bucket = this.getBucket(topLevelMetadataObj);
	options.channel = this.formattedValues.channel;
	options.pageName = this.formattedValues.pageName;
	options.linkInternalFilters = this.getLinkInternalFilters();

	ac_sCode.init(options);
};

proto.setPageMetadata = function (topLevelMetadataObj) {
	this.pageMetadata = ac_Object.clone(topLevelMetadataObj);
	this.pageMetadata.platform = metadataHelper.platform();
	this.pageMetadata.campaign = metadataHelper.campaign(topLevelMetadataObj);
	this.pageMetadata.channel = metadataHelper.channel(topLevelMetadataObj);

	// Lowercase the original metadata as well
	this.pageMetadata.pageName = formatter.lowerCaseString(this.pageMetadata.pageName);
	this.pageMetadata.locale = formatter.lowerCaseString(this.pageMetadata.locale);
};

proto.setFormattedValues = function () {
	this.formattedValues = {
		pageName: formatter.pageName(this.pageMetadata.pageName, this.pageMetadata.locale),
		channel: formatter.channel(this.pageMetadata.channel, this.pageMetadata.locale),
		productName: formatter.productName(this.pageMetadata.productName),
		countryCodeFilter: formatter.countryCodeFilter(this.pageMetadata.locale),
		legacyCountryCode: formatter.legacyCountryCode(this.pageMetadata.locale),
		campaign: this.pageMetadata.campaign,
		platform: this.pageMetadata.platform
	};
};

proto.setTemplateVars = function () {
	this.templateVarArr = templateVarHelper.set(this.formattedValues, this.pageMetadata);
};

// Resets global s_code properties
proto.clearProps = function () {
	var sCode = ac_sCode.getInstance();
	if (typeof sCode === 'object') {
		sCode.prop6 =  sCode.g_prop6 = sCode.pageURL = sCode.g_pageURL = sCode.g_channel = '';
	}
};


// Translates the properties into s_code specific format.
proto.translate = function (request) {
	if (!request || typeof request !== 'object') {
		errorHandler.log(moduleName, 'translate', 'Request param (' + request + ') is not an object');
	}

	if (errorHandler.exception) {
		return;
	}

	// set properties as translated request
	request = translator.translate(request, this.formattedValues, this.pageMetadata);

	return request;
};

// Determines the type of analytics request and fires the appropriate s call.
proto.submit = function (translatedRequest) {

	var options;
	var sCode = ac_sCode.getInstance();

	if (!translatedRequest || typeof translatedRequest !== 'object') {
		errorHandler.log(moduleName, 'submit', 'Request param (' + translatedRequest + ') is not an object');
	}

	if (errorHandler.exception) {
		return;
	}

	if (!translatedRequest.type || typeof translatedRequest.type !== 'string') {
		errorHandler.log(moduleName, 'submit', 'property "type" (' + translatedRequest.type + '") must be a string');
	}

	if (!window.s || typeof window.s !== 'object') {
		errorHandler.log(moduleName, 'submit', 'sCode (' + window.s + ') is not an object');
	}

	if (errorHandler.exception) {
		return;
	}

	options = translatedRequest.options || {};

	// Loop through and assign the properties to s_code before the final call
	this._setSCodeProps(translatedRequest);

	if (options.silent !== true) {
		if (translatedRequest.submitMethod && submitMethods[translatedRequest.submitMethod]) {
			submitMethods[translatedRequest.submitMethod](translatedRequest, this.formattedValues, sCode);
		}
	}
};

// set the s.linkInternalFilters property to let s-code differentiate between internal and external links
proto.getLinkInternalFilters = function () {
	var value;

	if (this.formattedValues.countryCodeFilter !== 'us') {
		value = this.formattedValues.countryCodeFilter;
	}

	return value;
};

// set properties on the global `s` object prior to submitting tracking requests
proto._setSCodeProps = function (request) {
	var properties = request.properties || {};
	var sCode = ac_sCode.getInstance();

	// Reset link tracking events for each request
	sCode.linkTrackEvents = '';

	request.data.linkTrackVars = request.data.linkTrackVars || [];

	for (var key in properties) {
		if (key === 'events') {
			sCode.linkTrackEvents = properties[key];
		}

		if (key !== 'title') {
			request.data.linkTrackVars.push(key);
			sCode[key] = properties[key];
		}
	}
};

proto.getBucket = function (topLevelMetadataObj) {

	var countryBucketSize = countryBucket.length;

	// Default index to bucket 2
	var index = 2;

	// Determine which tier the country falls under
	for (var i=0; i < countryBucketSize; i++) {
		if (countryBucket[i].indexOf(this.formattedValues.legacyCountryCode) !== -1) {
			index = i;
			break;
		}
	}

	// Get the bucket string from the meta tag for the current tier
	var bucketMetaTagValue = metadataHelper.bucket(index, topLevelMetadataObj);

	var bucket = this._replaceTemplateVars(bucketMetaTagValue);

	// Get the bucket product string from the meta tag for the current tier
	var bucketProduct = this._replaceTemplateVars(metadataHelper.bucketProduct(index, topLevelMetadataObj));

	// Get the store bucket string if available
	 var bucketStore = this._replaceTemplateVars(metadataHelper.bucketStore(topLevelMetadataObj));
 
	 return bucket + (!!bucketProduct ? (',' + bucketProduct) : '') + (!!bucketStore ? (',' + bucketStore) : '');
};

// Replaces template
proto._replaceTemplateVars = function (str) {
	return templateVarHelper.translate(str, this.templateVarArr);
};

module.exports = SCodePlugin;

},{"../../error-handler/ErrorHandler":"yoExqy","../../metadata":"W+q+EN","./helpers/formatter":"WZEdYN","./helpers/metadata":"DHq73b","./helpers/templateVar":"2ZvpEb","./submit-methods/submitMethods":"1e2jY8","./translator/translator":"LJ68Kt","ac-object":127,"ac-s-code":152}],"ac-analytics/plugins/s-code/sCode":[function(require,module,exports){
module.exports=require('2v3JQJ');
},{}],"reNdTz":[function(require,module,exports){
(function () {

	'use strict';

	function submit (request, metadata, sCode) {

		var url = window.location.href;
		var title = request.properties.title || '';
		var src;
		var img1x1;

		if (typeof sCode === 'object') {
			src = _getBasePath(url) + ((metadata.countryCodeFilter !== 'us') ? metadata.countryCodeFilter : '') +
					 '/b/ss/' + sCode.un + '/'+ (sCode.mobile ? '5.1':'1') + '/' + sCode.version +
					 '/s0' + Date.now() + '?ndh=1&t=' + _getTimestamp() + '&fid=' + sCode.fid + '&g=' + url +
					 '&pageName=' + metadata.pageName + '&cc=' + sCode.currencyCode + '&c3=' + title + '&h1=' + sCode.channel +
					 '&pe=lnk_e&pev2=' + title + '&s=' + sCode.resolution + '&c=' + sCode.colorDepth +
					 '&j=' + sCode.javascriptVersion + '&v=' + sCode.javaEnabled + '&k=' + sCode.cookiesEnabled + '&bw=' + sCode.browserWidth +
					 '&bh=' + sCode.browserHeight + '&p=' + sCode.plugins + '&r=' + sCode.eVar49;

			img1x1 = document.createElement('img');
			img1x1.setAttribute('width', '1');
			img1x1.setAttribute('height', '1');
			img1x1.setAttribute('border', '0');
			img1x1.src = src;

			return img1x1;
		}
	}

	function _getBasePath (url) {
		var protocol;
		var host;

		url = url.split('/');
		protocol = url[0];
		host = url[2];
		
		return protocol + '//' + host + '/';
	}

	function _getTimestamp () {
		var now = new Date();
		return now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' + now.getDay() + ' ' + now.getTimezoneOffset();
	}

	module.exports = submit;

}());

},{}],"ac-analytics/plugins/s-code/submit-methods/manual":[function(require,module,exports){
module.exports=require('reNdTz');
},{}],"ac-analytics/plugins/s-code/submit-methods/submitMethods":[function(require,module,exports){
module.exports=require('1e2jY8');
},{}],"1e2jY8":[function(require,module,exports){
var t = require('./t');
var tl = require('./tl');
var manual = require('./manual');

module.exports = {
	t: t,
	tl: tl,
	manual: manual
};

},{"./manual":"reNdTz","./t":"Jo4tJj","./tl":"0Vhqq3"}],"Jo4tJj":[function(require,module,exports){
(function () {

	'use strict';

	function submit (request, metadata, sCode) {

		if (typeof sCode === 'object' && typeof sCode.t === 'function') {
			// Set the global properties for s_code page view tracking.
			sCode.pageName = metadata.pageName;
			sCode.channel = metadata.channel;

			sCode.t();
		}
	}
	
	module.exports = submit;
	
}());

},{}],"ac-analytics/plugins/s-code/submit-methods/t":[function(require,module,exports){
module.exports=require('Jo4tJj');
},{}],"0Vhqq3":[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../error-handler/ErrorHandler');
	
	var moduleName = 'sCodePluginSubmitMethodtl';

	var DOMHelper = require('../helpers/DOM');

	function submit (request, metadata, sCode) {
		var linkType;
		var targetEl;

		// don't even think about doing anything if sCode or the tl method don't exist.
		if (typeof sCode === 'object' && typeof sCode.tl === 'function') {

			if (typeof request.data !== 'object') {
				errorHandler.log(moduleName, 'submit', 'Request param data (' + request.data + ') is not an object');
			}

			if (typeof request.properties.title !== 'string') {
				errorHandler.log(moduleName, 'submit', 'Request param title (' + request.properties.title + ') is not a string');
			}

			if (errorHandler.exception) {
				return;
			}

			// Set default linkTrackVars for referrer and current location
			sCode.linkTrackVars = 'eVar54,eVar49';

			if (request.data.linkTrackVars && request.data.linkTrackVars.length > 0) {
				sCode.linkTrackVars += ',' + request.data.linkTrackVars.join(',');
			}

			// Default to custom link type if link type is not defined
			linkType = request.data.linkType || 'o';

			// s.tl method needs the first parameter to be either a valid DOM element or `true`
			targetEl = _targetEl(request.data.targetEl);

			// set s_code's internal timeout to 0 if not tracking a link
			sCode.forcedLinkTrackingTimeout = _forcedLinkTrackingTimeout(request);

			// Call s.tl for all other tracking calls
			sCode.tl(targetEl, linkType, request.properties.title);

			_clearTrackingData(sCode);
		}
	}

	/**
	 * Priavte Functions
	 */

	 // Clear the link tracking custom properties and events after each s.tl request
	 function _clearTrackingData (sCode) {
	 	sCode.linkTrackVars = '';
	 	sCode.linkTrackEvents = '';
	 }

	// set s_code's timeout 0 if not tracking a link
	function _forcedLinkTrackingTimeout (request) {
		var duration = 0;
		var element = request.data.targetEl;
		var href;

		if (request.type && request.type === 'link' || request.type === 'click') {
			if (_isOutgoingLink(element) === true) {
				duration = 500;
			}
		}

		return duration;
	}

	function _targetEl (element) {
		var result = _isOutgoingLink(element);
		return (result === true) ? element : true;
	}

	function _isOutgoingLink (element) {
		var isOutgoingLink = true;
		var isIntraPageLink = DOMHelper.isIntraPageLink(element);

		if (!element || isIntraPageLink === true) {
			isOutgoingLink = false;
		}

		return isOutgoingLink;
	}

	module.exports = submit;

}());

},{"../../../error-handler/ErrorHandler":"yoExqy","../helpers/DOM":"M8C1F0"}],"ac-analytics/plugins/s-code/submit-methods/tl":[function(require,module,exports){
module.exports=require('0Vhqq3');
},{}],"g4AmU0":[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;
		
		var interactionTypePrefix = {
			"play": "s",
			"replay": "r",
			"ended": "e",
			"pause": "p"
		};

		var divider = ' - ';

		var properties = {};

		properties.prop13 = formatter.eventString('a', interactionTypePrefix[data.interactionType]) + divider + originalMetaData.pageName;

		properties.prop3 = properties.title = formatter.eventString('a', interactionTypePrefix[data.interactionType]) + divider + originalMetaData.pageName + divider + formatter.lowerCaseString(data.title);

		properties.prop4 = data.audioSrc;

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/formatter":"WZEdYN"}],"ac-analytics/plugins/s-code/translator/component/audio":[function(require,module,exports){
module.exports=require('g4AmU0');
},{}],"hIhnjJ":[function(require,module,exports){
(function () {

	'use strict';

	var STORAGE_KEY = require('../../../../storageKey').appleMetrics;
	var separator   = require('../../helpers/separator');
	var ac_Storage = require('ac-storage');
	var dataAttrHelper = require('../../../../data-attr/helper');
	var formatter = require('../../helpers/formatter');
	var DOMHelper = require('../../helpers/DOM');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var properties = {};

		var dataAttrValue = data.targetEl.getAttribute('data-' + request.options.dataAttribute);

		var customProperties = dataAttrHelper.dataStringToObject(dataAttrValue);

		var linkText = data.linkText.toLowerCase();

		var defaultText = originalMetaData.pageName + separator.hyphen + (translatedRequest.data.linkImg || linkText);

		var regionAncestry = formatter.getRegionAncestry(data);

		var postfix;

		var isIntraPageLink = DOMHelper.isIntraPageLink(data.targetEl);

		if (customProperties.prop3) {
			customProperties.prop3 = formatter.lowerCaseString(customProperties.prop3);
		}

		if (customProperties.prefix) {
			defaultText = formatter.eventString(customProperties.prefix, originalMetaData.pageName + separator.hyphen + (customProperties.prop3 || translatedRequest.data.linkImg || linkText));
		}

		// If it is an outgoing link then don't run it in async
		translatedRequest.options.async = (!isIntraPageLink) ? false : true;

		properties.prop3 = properties.title = (!customProperties.prefix && customProperties.prop3) ? originalMetaData.pageName + separator.hyphen + customProperties.prop3 : defaultText;

		properties.eVar1 = originalMetaData.pageName + separator.hyphen + (regionAncestry || '') + linkText;

		_setNavPathInfo(data, metadata);

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	function _setNavPathInfo (data, metadata) {

		var navSourceData = {};
		var navSourceDataStr;

		if (data.region) {

			navSourceData.pageName = metadata.pageName;
			navSourceData.region = data.region;

			navSourceDataStr = JSON.stringify(navSourceData);

			ac_Storage.setItem(STORAGE_KEY, navSourceDataStr);
		}
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../../../data-attr/helper":"DckvZc","../../../../storageKey":"ntdzZF","../../helpers/DOM":"M8C1F0","../../helpers/formatter":"WZEdYN","../../helpers/separator":"9JEe2W","ac-storage":168}],"ac-analytics/plugins/s-code/translator/component/click":[function(require,module,exports){
module.exports=require('hIhnjJ');
},{}],"ac-analytics/plugins/s-code/translator/component/event":[function(require,module,exports){
module.exports=require('6NDW85');
},{}],"6NDW85":[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	var templateVarHelper = require('../../helpers/templateVar');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var templateVarArr = templateVarHelper.set(metadata, originalMetaData);

		var properties = {};

		for (var key in data) {
			properties[key] = data[key];
			
			if (typeof properties[key] === 'string') {
				properties[key] = templateVarHelper.translate(properties[key], templateVarArr);
			}
		}

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../helpers/formatter":"WZEdYN","../../helpers/templateVar":"2ZvpEb"}],"ac-analytics/plugins/s-code/translator/component/exit":[function(require,module,exports){
module.exports=require('YjpnJy');
},{}],"YjpnJy":[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var properties = {};

		var timeSpentOnPage = ((data.exitTimeStamp - originalMetaData.initialTimeStamp) * 0.001).toFixed(2);

		properties.prop3 = timeSpentOnPage;

		properties.title = formatter.eventString(timeSpentOnPage, originalMetaData.pageName);

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'manual';

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../helpers/formatter":"WZEdYN"}],"paaDxu":[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../../error-handler/ErrorHandler');
	var formatter = require('../../helpers/formatter');
	var moduleName = 'sCodePluginGalleryTranslator';

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var interactionTypeMap = {
			"click": "ci",
			"keydown": "ki",
			"swipe": "si",
			"dot": "bi",
			"thumb": "ci",
			"paddle": "pi",
			"auto": "ai"
		};

		var outgoingInteractionType;

		var incomingInteractionType;

		var properties = {};

		var propString = '';

		_clearConditionalsCodeProps(properties);

		if (data.incomingInteractionType) {

			if (interactionTypeMap[data.incomingInteractionType]) {
				incomingInteractionType = interactionTypeMap[data.incomingInteractionType];
			}
		}

		if (data.outgoingInteractionType) {

			if (interactionTypeMap[data.outgoingInteractionType]) {
				outgoingInteractionType = interactionTypeMap[data.outgoingInteractionType];
			}
		}

		if (!incomingInteractionType) {
			errorHandler.log(moduleName, 'translate', incomingInteractionType + '" is not a valid interaction type for the incoming slide');
		}

		if (!outgoingInteractionType) {
			errorHandler.log(moduleName, 'translate', outgoingInteractionType + '" is not a valid interaction type for the outgoing slide');
		}

		if (errorHandler.exception) {
			return;
		}

		propString = originalMetaData.pageName + divider + request.options.galleryName + divider;
		
		properties.prop2 = formatter.eventString(outgoingInteractionType, '') + propString + data.outgoing.id;

		properties.prop3 = properties.title = formatter.eventString(incomingInteractionType, '') + propString + data.incoming.id;

		if (data.galleryFirstTimeTrigger === true) {

			properties.prop16 = 'gallery interaction';

			properties.eVar16 = (request.options.galleryName ? request.options.galleryName + ' ' : '') + 'gallery interaction';

			properties.events = 'event1';
		}

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	// If s. (props) were set in a condition in previous request
	// make sure they are cleared on the next request
	function _clearConditionalsCodeProps (properties) {
		properties.prop16 = properties.eVar16 = '';
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../../../error-handler/ErrorHandler":"yoExqy","../../helpers/formatter":"WZEdYN"}],"ac-analytics/plugins/s-code/translator/component/gallery":[function(require,module,exports){
module.exports=require('paaDxu');
},{}],"ac-analytics/plugins/s-code/translator/component/link":[function(require,module,exports){
module.exports=require('iCOMu/');
},{}],"iCOMu/":[function(require,module,exports){
(function () {

	'use strict';

	var STORAGE_KEY = require('../../../../storageKey').appleMetrics;
	var separator = require('../../helpers/separator');
	var ac_Storage = require('ac-storage');
	var formatter = require('../../helpers/formatter');
	var DOMHelper = require('../../helpers/DOM');
	var ac_feature = require('ac-feature');
	var w = window;

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;
		var linkUrl = _getLinkHref(translatedRequest.data.targetEl);

		// Add properties to a separate object
		translatedRequest.properties = {};

		// Set async to false on outgoing links
		translatedRequest.options.async = _setAsync(translatedRequest.data);

		// Set tracking properties for link tracking (this prop is not used at the moment)
		// Link tracking only tracks the user's navigation path througout the site
		_setNavTrackingProps(translatedRequest, originalMetaData, linkUrl);

		// Set user's navigation path info to storage, to be retrieved on the next page request (s.t)
		_setNavPathInfo(translatedRequest.data, metadata, linkUrl);

		// Just in case link observer ever needed to fire a tracking request on each link click
		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	function _setNavTrackingProps (translatedRequest, originalMetaData, linkUrl) {
		var identityStr = (linkUrl.indexOf('http://') > -1 || linkUrl.indexOf('https://') > -1) ? linkUrl.split('/')[2].split('.')[0] + ' link' : '';
		var defaultLinkTitle = _getDefaultLinkTitle(translatedRequest.data, originalMetaData);
		translatedRequest.properties.title = defaultLinkTitle + (identityStr !== '' ? separator.hyphen + identityStr : '');
	}

	function _getLinkHref (targetEl) {
		return (targetEl.href) ? targetEl.getAttribute('href') : '';
	}

	function _getDefaultLinkTitle (data, originalMetaData) {
		return (data.region ? formatter.eventString(data.region.charAt(0), data.linkImg || data.linkText || data.linkId) + separator.hyphen + originalMetaData.pageName : originalMetaData.pageName + separator.hyphen + data.linkText);
	}

	function _setAsync (data) {
		var isIntraPageLink = DOMHelper.isIntraPageLink(data.targetEl);
		var async = true;

		// If it is an outgoing link then don't run it in async
		if (!isIntraPageLink) {
			async = false;
		}
		return async;
	}

	function _setNavPathInfo (data, metadata, linkUrl) {

		var navSrcObj = {};
		var navSrcStr;
		var regionAncestry = formatter.getRegionAncestry(data);

		if (data.region) {
			navSrcObj.region = data.region;
		}

		navSrcObj.pageName = metadata.pageName;
		navSrcObj.linkText = data.linkText;
		navSrcObj.eVar1 = (metadata.pageName + separator.pipe + regionAncestry + data.linkText);

		// Add to storage as well so store can pick it
		if (data.region === 'search') {
			navSrcObj.eVar2 = data.linkText;
			navSrcObj.events = 'event8';
		}

	 	navSrcStr = JSON.stringify(navSrcObj);

		// If it is a link going to the store use window.localStorage
		// else use ac-storage
		if (DOMHelper.isStoreLink(linkUrl) === false) {
			ac_Storage.setItem(STORAGE_KEY, navSrcStr);
		} else {
			_navPathInfoHandOff(navSrcStr);
		}
	}

	// If it is a link going to the store then prepare to handoff via html5 localStorage
	// Store will be resposible to remove the data from localStorage
	function _navPathInfoHandOff (navSrcStr) {
		if (ac_feature.localStorageAvailable() === true) {
			w.localStorage.setItem(STORAGE_KEY, navSrcStr);
		}
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../../../storageKey":"ntdzZF","../../helpers/DOM":"M8C1F0","../../helpers/formatter":"WZEdYN","../../helpers/separator":"9JEe2W","ac-feature":123,"ac-storage":168}],"ac-analytics/plugins/s-code/translator/component/overlay":[function(require,module,exports){
module.exports=require('94pkSs');
},{}],"94pkSs":[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');
	
	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var properties = {};

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/formatter":"WZEdYN"}],"ac-analytics/plugins/s-code/translator/component/page":[function(require,module,exports){
module.exports=require('BagcUO');
},{}],"BagcUO":[function(require,module,exports){
(function () {

	'use strict';

	var STORAGE_KEY = require('../../../../storageKey').appleMetrics;
	var separator = require('../../helpers/separator');
	var ac_Storage = require('ac-storage');
	var formatter = require('../../helpers/formatter');
	var DOMHelper = require('../../helpers/DOM');
	var templateVarHelper = require('../../helpers/templateVar');
	var errorHandler = require('../../../../error-handler/ErrorHandler');
	var ac_feature = require('ac-feature');
	var w = window;

	var moduleName = 'sCodePageTranslator';

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		// Add properties to a separate object
		translatedRequest.properties = {};

		// Set default properties before the tokens get transformed
		_setDefaultProps (translatedRequest);

		// Replace all tokens and assign to the properties object. Dont touch data.
		_replaceTemplateVars (translatedRequest, metadata, originalMetaData);

		// Set the page load request properties
		_setPageRequestProps (translatedRequest, metadata);

		// Add page request properties for navigation source
		_setNavSrcProps(translatedRequest, metadata);
		
		translatedRequest.submitMethod = 't';

		return translatedRequest;
	}

	function _setDefaultProps (translatedRequest) {
		translatedRequest.data.prop20 = translatedRequest.data.prop20 || 'AOS' + separator.colon + '{COUNTRY_CODE}';
	}

	function _setPageRequestProps (translatedRequest, metadata) {

		if (typeof translatedRequest.properties !== 'object') {
			errorHandler.log(moduleName, '_setPageRequestProps', translatedRequest.properties + ' is not a valid properties object in the analytics request');
		}

		if (errorHandler.exception) {
			return;
		}

		translatedRequest.properties.prop19 = translatedRequest.properties.prop20 + separator.colon + metadata.pageName;
		translatedRequest.properties.eVar3 = translatedRequest.properties.prop20;
	}

	function _setNavSrcProps (translatedRequest, metadata) {
		// Get nav path info
		var navSrcData = _getNavPathInfo() || {};

		translatedRequest.properties.prop25 = _getNavSource(navSrcData);

		// Props for the store
		translatedRequest.properties.eVar1 = navSrcData.eVar1 || null;
		translatedRequest.properties.products = navSrcData.products || null;

		// Only available with search link clicked
		translatedRequest.properties.eVar2 = navSrcData.eVar2 || null;

		if (navSrcData.events) {
			translatedRequest.properties.events = navSrcData.events;
		}
	}

	function _getNavPathInfo () {
		var isArrivingFromStore = _isArrivingFromStore();
		var navSrcStr;
		var navSrcObj;

		if (isArrivingFromStore === true && ac_feature.localStorageAvailable() === true) {
			navSrcStr = w.localStorage.getItem(STORAGE_KEY);
			navSrcObj = _transformLocalStorageStrtoObject(w.localStorage, navSrcStr);
		} else {
			navSrcStr = ac_Storage.getItem(STORAGE_KEY);
			navSrcObj = _transformLocalStorageStrtoObject(ac_Storage, navSrcStr);
		}

		return navSrcObj;
	}

	function _transformLocalStorageStrtoObject (storageObj, str) {
		var obj;

		if (str) {
			storageObj.removeItem(STORAGE_KEY);
			obj = JSON.parse(str);
		}

		return obj;
	}

	function _isArrivingFromStore () {

		var referrer = document.referrer;
		return (referrer && DOMHelper.isStoreLink(referrer));
	}

	function _replaceTemplateVars (translatedRequest, metadata, originalMetaData) {

		var templateVarArr = templateVarHelper.set(metadata, originalMetaData);

		if (typeof translatedRequest.data !== 'object') {
			errorHandler.log(moduleName, '_replaceTemplateVars', translatedRequest.data + ' is not a valid data object in the analytics request');
		}

		if (errorHandler.exception) {
			return;
		}
		
		for (var key in translatedRequest.data) {
			if (translatedRequest.data.hasOwnProperty(key)) {
				translatedRequest.properties[key] = translatedRequest.data[key];

				if (typeof translatedRequest.properties[key] === 'string') {
					translatedRequest.properties[key] = templateVarHelper.translate(translatedRequest.properties[key], templateVarArr);
				}
			}
		}
	}

	function _getNavSource (navSourceData) {
		var entryPoint = _getEntryPointStr();

		if (navSourceData.region) {
			return navSourceData.region;
		}

		if (entryPoint) {
			return entryPoint;
		}

		return 'other nav or none';
	}

	function _getEntryPointStr () {
		var referrer = document.referrer;
		var currentDomain = window.location.host;
		var entryPoint;

		if (!referrer) {
			entryPoint = 'direct entry';
		}

		if (referrer && referrer !== '' && referrer.split('?')[0].indexOf(currentDomain) === -1) {
			entryPoint = 'third party';
		}

		return entryPoint;
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../../../error-handler/ErrorHandler":"yoExqy","../../../../storageKey":"ntdzZF","../../helpers/DOM":"M8C1F0","../../helpers/formatter":"WZEdYN","../../helpers/separator":"9JEe2W","../../helpers/templateVar":"2ZvpEb","ac-feature":123,"ac-storage":168}],"ac-analytics/plugins/s-code/translator/component/section":[function(require,module,exports){
module.exports=require('+0a7ZJ');
},{}],"+0a7ZJ":[function(require,module,exports){
(function () {

	'use strict';

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var trackedElement = translatedRequest.data.element;

		var divider = ' - ';

		var properties = {};

		var elementName = trackedElement.name || trackedElement.id || '';

		var timeInThreshold = trackedElement.thresholdExitTime - trackedElement.thresholdEnterTime;

		var sectionNumber = (trackedElement.element && trackedElement.element.position) ? ' .' + trackedElement.element.position : '';

		properties.prop34 = properties.title = originalMetaData.pageName + divider + elementName + divider + 'section engaged' + sectionNumber;

		properties.prop35 = (timeInThreshold / 1000).toFixed(2);

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],"ac-analytics/plugins/s-code/translator/component/video":[function(require,module,exports){
module.exports=require('5BgK4Z');
},{}],"5BgK4Z":[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var eventTypeMap = {
			"started": "s",
			"replay": "rp",
			"ended": "e",
			"reended": "re",
			"captions-enabled": "ce"
		};

		var eventType = (data.eventType && eventTypeMap[data.eventType]) ? eventTypeMap[data.eventType] : data.eventType;

		var properties = {};

		// If any event is not in our mapping then dont fire an s.tl for it
		// mainly because we want to track one video session per user
		if (!eventTypeMap[data.eventType]) {
			translatedRequest.options.silent = true;
		} else {
			translatedRequest.options.silent = false;
		}

		_clearConditionalsCodeProps(properties);

		properties.title = properties.prop13 = formatter.eventString('v', eventType) + ': ' + originalMetaData.pageName + divider + data.videoId;

		if (data.eventType === 'started') {
			properties.prop16 = properties.eVar16 = 'video plays';
			properties.events = 'event2';

		} else if (data.eventType === 'ended') {
			properties.prop16 = properties.eVar16 = 'video ends';
		}

		if (data.eventType === 'captions-enabled') {
			properties.title = properties.prop2 = originalMetaData.pageName + divider + data.videoId + divider + 'cc';
			properties.prop13 = ''; //We dont need this prop for captions-enabled event
		}

		if (data.videoType && data.playerType) {
			properties.prop18 = data.videoType + ' via ' + data.playerType;
		}

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	// If s. (props) were set in a condition in previous request
	// make sure they are cleared on the next request
	function _clearConditionalsCodeProps (properties) {
		properties.prop16 = properties.eVar16 = properties.prop18 = properties.prop2 = '';
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/formatter":"WZEdYN"}],"ac-analytics/plugins/s-code/translator/translator":[function(require,module,exports){
module.exports=require('LJ68Kt');
},{}],"LJ68Kt":[function(require,module,exports){
(function () {
	'use strict';

	var components = {
		audio: require('./component/audio'),
		gallery: require('./component/gallery'),
		link: require('./component/link'),
		click: require('./component/click'),
		overlay: require('./component/overlay'),
		page: require('./component/page'),
		section: require('./component/section'),
		video: require('./component/video'),
		exit: require('./component/exit'),
		event: require('./component/event')
	};

	function translate(request, metaData, originalMetaData) {
		var translatedRequest = request;

		if (request.type && components[request.type]) {
			translatedRequest = components[request.type].translate(request, metaData, originalMetaData);
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate,
		components: components
	};
}());

},{"./component/audio":"g4AmU0","./component/click":"hIhnjJ","./component/event":"6NDW85","./component/exit":"YjpnJy","./component/gallery":"paaDxu","./component/link":"iCOMu/","./component/overlay":"94pkSs","./component/page":"BagcUO","./component/section":"+0a7ZJ","./component/video":"5BgK4Z"}],"DXveIM":[function(require,module,exports){
'use strict';

var proto;
var dataAttribute = 'analytics-region';
var validJSONPattern = /(?:\w+:\w+)(?:,(?=(?:\w+:\w+))|$)/;
var singleValuePattern = /[\w\s]+/;
var dataAttrHelper = require('../data-attr/helper');

/**
 * Creates an object for a region element with details about its parent and child regions.
 * @constructor Region
 * @param {object} regionElement A DOM Element.
 */
function Region (regionElement) {
	this.element = regionElement;
	this.childRegions = {};
	this.parentRegion = '';
	this.options = this.getDataOptions();
	this.name = this.setName();
}

proto = Region.prototype;

/**
 * @name Region#setName
 *
 * @function
 *
 * @desc Sets the name for a region.
 */
proto.setName = function () {
	var value = '';

	// pull name from options
	if (this.options.name) {
		value = this.options.name;
	}

	// default to element's id value if not specified
	if (!this.options.name && this.element.id) {
		this.options.name = this.element.id;
	}

	return value;
};

/**
 * @name Region#getDataOptions
 *
 * @function
 *
 * @desc Gets options from the data attribute.
 */
proto.getDataOptions = function () {
	var data = {};
	var value = this.element.getAttribute('data-' + dataAttribute);

	// strip trailing commas
	value = value.charAt(value.length - 1) === ',' ? value.substr(0, value.length - 1) : value;

	if (this._isJSONable(value)) {
		data = dataAttrHelper.dataStringToObject(value);

	// if it's just a single value, set it to the name property
	} else if (this._isSingleValue(value)) {
		data.name = value;
	}

	// return empty object if none of the conditions are met.
	return data;
};

/**
 * @name Region#_isJSONable
 *
 * @private
 *
 * @desc Checks if a string passed can be JSONified.
 */
proto._isJSONable = function (value) {
	return validJSONPattern.test(value);
};

/**
 * @name Region#_isSingleValue
 *
 * @private
 *
 * @desc Checks if a string passed is a single value string.
 */
proto._isSingleValue = function (value) {
	return singleValuePattern.test(value);
};

module.exports = {
	Region: Region,
	dataAttribute: dataAttribute
};
},{"../data-attr/helper":"DckvZc"}],"ac-analytics/regions/Region":[function(require,module,exports){
module.exports=require('DXveIM');
},{}],"ac-analytics/regions/regions":[function(require,module,exports){
module.exports=require('DxeItO');
},{}],"DxeItO":[function(require,module,exports){
(function () {

	'use strict';

	/**
	 * Provides different methods to get region information for an element in the DOM.
	 * @name regions
	 * @module
	 */

	var ac_DOMTraversal = require('ac-dom-traversal');
	var ac_DOMNodes = require('ac-dom-nodes');
	var Region = require('./Region').Region;
	var dataAttribute = require('./Region').dataAttribute;

	var allRegions = [];
	var tree = {};

	// Find all regions in the DOM, store in array and also
	// create a hierarchical tree object of the regions.
	function getAllRegions () {

		if (allRegions.length > 0 ) {
			return allRegions;
		}

		var allRegionsElements = ac_DOMTraversal.querySelectorAll('[data-' + dataAttribute + ']');
		var topLevelRegion;
		var regionsLen = allRegionsElements.length;
		var i = 0;

		// recursive function that maps nested regions to their parents
		// also creates Region objects of nested regions as it finds them.
		function _getChildRegions (regionObj) {
			var childRegion;
			while (ac_DOMNodes.isElement(allRegionsElements[i + 1]) && regionObj.element.contains(allRegionsElements[i + 1])) {
				childRegion = new Region(allRegionsElements[i + 1]);
				allRegions.push(childRegion);
				childRegion.parentRegion = regionObj.name;
				regionObj.childRegions[childRegion.name] = childRegion;
				i += 1;
				_getChildRegions(childRegion);
			}
		}

		// loop through the regions, store all regions in an array and an object
		for (i; i < regionsLen; i += 1) {
			topLevelRegion = new Region(allRegionsElements[i]);
			tree[topLevelRegion.name] = topLevelRegion;
			allRegions.push(topLevelRegion);
			_getChildRegions(topLevelRegion);
		}
		return allRegions;
	}

	// returns a hierarchical tree object of the regions
	function getTree () {

		getAllRegions();

		if (Object.keys(tree).length > 0) {
			return tree;
		}
	}

	// returns the parent region for an element
	function getRegionByElement (element) {
		var parsedRegions = getAllRegions();
		if (ac_DOMNodes.isElement(element)) {
			var allAncestorRegions = getRegionAncestryByElement(element);
			if (allAncestorRegions.length > 0) {
				return allAncestorRegions.pop();
			}
		}
	}

	// returns all parent regions of an element
	function getRegionAncestryByElement (element) {
		var parsedRegions = getAllRegions();
		if (ac_DOMNodes.isElement(element)) {
			return parsedRegions.filter(function(region) {
				return region.element.contains(element);
			});
		}
	}

	// returns a region by name
	function getRegionByName (name) {
		var parsedRegions = getAllRegions();
		if (typeof name === 'string') {
			return parsedRegions.filter(function(region) {
				return region.name === name;
			});
		}
	}

	// refreshes a region by the region element or object
	function refreshRegion (region) {
		var regionObj = region;
		if (ac_DOMNodes.isElement(region)) {
			regionObj = getRegionByElement(region);
		}

		if (typeof regionObj === 'object') {
			allRegions.forEach(function (r) {
				if (r.element === regionObj.element) {
					r.options = r.getDataOptions();
					r.name = r.setName();
				}
			});
		}
	}

	module.exports = {
		/** Returns a hierarchical tree object of all the parent level DOM elements with a data attribute of 'data-analytics-region'. */
		getTree: getTree,
		/** Returns an array of all the DOM elements with a data attribute of 'data-analytics-region'. */
		getAllRegions: getAllRegions,
		/** Returns a parent region object for a given DOM element.*/
		getRegionByElement: getRegionByElement,
		/** Returns a region object for a given region name string. */
		getRegionByName: getRegionByName,
		/** Returns an array of all the parent regions of a given DOM element. */
		getRegionAncestryByElement: getRegionAncestryByElement,
		/** Updates state of a region object to match its current state in the DOM. */
		refreshRegion: refreshRegion
	};
}());

},{"./Region":"DXveIM","ac-dom-nodes":23,"ac-dom-traversal":49}],"ac-analytics/reset":[function(require,module,exports){
module.exports=require('DebV0p');
},{}],"DebV0p":[function(require,module,exports){
var topLevelMetadata = require('./metadata');
var regions 		 = require('./regions/regions');
var metricsTracker   = require('./metricsTracker');

function resetACAnalytics () {
	topLevelMetadata.refreshMetadata();
	regions.refreshRegion();
	metricsTracker.plugin.reset();	
}

module.exports = resetACAnalytics;
},{"./metadata":"W+q+EN","./metricsTracker":"nHWlaR","./regions/regions":"DxeItO"}],"ac-analytics/storageKey":[function(require,module,exports){
module.exports=require('ntdzZF');
},{}],"ntdzZF":[function(require,module,exports){
(function () {

	'use strict';

	module.exports = {
		appleMetrics: 'apple_Metrics',
		analyticsQueue: 'ac-analytics-queue'
	};
	
}());
},{}],"8lTacU":[function(require,module,exports){
(function () {

	'use strict';

	var ac_DOMTraversal = require('ac-dom-traversal');

	var ac_DOMEvents = require('ac-dom-events');

	var interactionTypes = {
		play: function (request) {

			if (request.data.ended === true) {
				return 'replay';
			}

			return 'play';
		},

		ended: function (request) {

			return request.event.type;
		},

		pause: function (request) {

			return request.event.type;
		}
	};

	function translate (request) {

		var translatedRequest = request;

		var targetEl = ac_DOMEvents.target(request.event);

		translatedRequest.data.targetEl = targetEl;

		// Determine audio source
		if (targetEl && targetEl.getAttribute('src')) {
			translatedRequest.data.audioSrc = targetEl.getAttribute('src');
		}

		if (!translatedRequest.data.audioSrc) {

			var audioSourceTag = ac_DOMTraversal.querySelector('source', targetEl);

			if (audioSourceTag && audioSourceTag.getAttribute('src')) {
				translatedRequest.data.audioSrc = audioSourceTag.getAttribute('src');
			}
		}

		translatedRequest.data.interactionType = (interactionTypes[request.event.type]) ? interactionTypes[request.event.type](request) : request.event.type;

		translatedRequest.data.title = translatedRequest.data.targetEl.title || 'No title found';

		translatedRequest.data.duration = translatedRequest.data.targetEl.duration;

		translatedRequest.data.currentTime = translatedRequest.data.targetEl.currentTime;

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"ac-dom-events":13,"ac-dom-traversal":49}],"ac-analytics/translator/component/audio":[function(require,module,exports){
module.exports=require('8lTacU');
},{}],"JuqcqK":[function(require,module,exports){
(function () {

	'use strict';

	var ac_DOMTraversal = require('ac-dom-traversal');
	var regions = require('../../regions/regions');

	function translate (request) {

		var translatedRequest = request;

		var linkImg = ac_DOMTraversal.querySelector('img', request.data.targetEl);

		var linkImgSrc;

		var targetElParentRegion = regions.getRegionByElement(request.data.targetEl);

		var linkTitle = request.data.targetEl.getAttribute('data-' + request.options.titleDataAttribute);

		translatedRequest.data.regionAncestry = regions.getRegionAncestryByElement(request.data.targetEl);
		
		if (linkImg) {
			linkImgSrc = linkImg.getAttribute('src');
			translatedRequest.data.linkImg = linkImgSrc.substring(linkImgSrc.lastIndexOf('/') + 1, linkImgSrc.length);

			if (typeof translatedRequest.data.linkImg === 'string') {
				translatedRequest.data.linkImg = translatedRequest.data.linkImg.toLowerCase();
			}
		}

		if (linkTitle) {
			translatedRequest.data.linkText = linkTitle;
		} else {
			translatedRequest.data.linkText = (typeof request.data.targetEl.innerText === 'string') ? request.data.targetEl.innerText.trim() : request.data.targetEl.textContent.trim();
		}

		if (typeof targetElParentRegion === 'object') {
			translatedRequest.data.region = targetElParentRegion.name;
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../regions/regions":"DxeItO","ac-dom-traversal":49}],"ac-analytics/translator/component/click":[function(require,module,exports){
module.exports=require('JuqcqK');
},{}],"kZao3w":[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		var translatedRequest = request;
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{}],"ac-analytics/translator/component/event":[function(require,module,exports){
module.exports=require('kZao3w');
},{}],"yWnp5u":[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		var translatedRequest = request;

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{}],"ac-analytics/translator/component/exit":[function(require,module,exports){
module.exports=require('yWnp5u');
},{}],"ac-analytics/translator/component/gallery":[function(require,module,exports){
module.exports=require('P9nfNI');
},{}],"P9nfNI":[function(require,module,exports){
(function () {
	'use strict';

	var ac_DOMTraversal = require('ac-dom-traversal');

	// methods to map interaction types
	var interactionTypes = {

		click: function (request) {
			var type = 'click';
			// if the click happened on a dot/paddle/thumb nav, we want to know
			var navType = _triggerNavType(request);

			return navType || type;
		},

		auto: function (request) {
			var type = 'auto';

			return type;
		},

		keydown: function (request) {
			var type = 'keydown';

			return type;
		},

		touchend: function (request) {
			var type = 'swipe';

			return type;
		},

		touchstart: function (request) {
			var type = 'swipe';

			return type;
		},

		touchmove: function (request) {
			var type = 'swipe';

			return type;
		}

	};

	/**
	 * Exported translate function
	 */
	function translate (request) {
		var interactionEventType = _interactionEventType(request);
		var interactionType = interactionEventType;
		var observer = request.observer;
		var translatedRequest = request;

		if (interactionTypes[interactionEventType]) {
			interactionType = interactionTypes[interactionEventType](request);
		}

		// add props to the request
		translatedRequest.data.targetEl = _getTargetElement(request);
		translatedRequest.data.slideInViewTime = _slideInViewTime(request);
		translatedRequest.data.outgoingInteractionType = request.observer.outgoingSlideInteractionType;
		translatedRequest.data.incomingInteractionType = interactionType;
		translatedRequest.data.galleryFirstTimeTrigger = _isFirstTimeGalleryTrigger(translatedRequest);

		// update the props on the observer
		observer.outgoingSlideInteractionType = interactionType;

		return translatedRequest;
	}


	/**
	 * Private Functions
	 */

	// attempts to determine what type of gallery nav was interacted with
	function _triggerNavType (request) {
		var type = false;
		var trigger = _getTargetElement(request);
		var nav;

		if (trigger) {
			nav = ac_DOMTraversal.ancestor(trigger, 'nav');
			type = nav ? _getNavTypeFromClassName(nav.className) : type;
		}

		return type;
	}

	// determines if a classname has a specific word.
	// If so, it returns that word, else false.
	function _getNavTypeFromClassName (className) {
		var type = false;

		['paddle', 'dot', 'thumb'].some(function (typeName) {
			if (className.indexOf(typeName) >= 0) {
				type = typeName;
				return true;
			}
		});

		return type;
	}

	// return the target element from the interactionEvent in the request, if there is one.
	// else returns false.
	function _getTargetElement (request) {
		var interactionEvent = request.data.interactionEvent;
		var element = false;

		if (interactionEvent) {
			element = (interactionEvent.target || interactionEvent.srcElement);
		}

		return element;
	}

	// how long was the outgoing slide in view for?
	function _slideInViewTime (request) {
		return request.data.incomingSlideTimestamp - request.data.outgoingSlideTimestamp;
	}

	// We want to know if user has interacted with the gallery
	function _isFirstTimeGalleryTrigger (request) {
		var incomingInteractionType = request.data.incomingInteractionType;
		var observer = request.observer;
		var firstTimeGalleryTrigger = false;

		if (incomingInteractionType !== 'auto' && observer.trackedInteractionTypes.indexOf(incomingInteractionType) === -1) {
			firstTimeGalleryTrigger = true;
			observer.trackedInteractionTypes.push(incomingInteractionType);
		}

		return firstTimeGalleryTrigger;
	}

	// determine event type. Default to 'auto'
	function _interactionEventType (request) {
		var data = request.data;
		var type = 'auto';

		if (data.interactionEvent && data.interactionEvent.type) {
			type = data.interactionEvent.type;
		}

		return type;
	}

	module.exports = {
		translate: translate
	};

}());

},{"ac-dom-traversal":49}],"ac-analytics/translator/component/link":[function(require,module,exports){
module.exports=require('L1gkGb');
},{}],"L1gkGb":[function(require,module,exports){
(function () {

	'use strict';

	var ac_DOMTraversal = require('ac-dom-traversal');
	var regions = require('../../regions/regions');

	function translate (request) {

		var translatedRequest = request;

		var linkImg = ac_DOMTraversal.querySelector('img', request.data.targetEl);

		var linkImgSrc;

		var targetElParentRegion = regions.getRegionByElement(request.data.targetEl);

		var linkTitle = request.data.targetEl.getAttribute('data-' + request.options.titleDataAttribute);

		if (linkTitle) {
			translatedRequest.data.linkText = linkTitle;
		} else {
			translatedRequest.data.linkText = (typeof request.data.targetEl.innerText === 'string') ? request.data.targetEl.innerText.trim() : request.data.targetEl.textContent.trim();
		}

		translatedRequest.data.regionAncestry = regions.getRegionAncestryByElement(request.data.targetEl);
		
		if (request.data.targetEl.id) {
			translatedRequest.data.linkId = request.data.targetEl.id;
		}

		if (linkImg) {
			linkImgSrc = linkImg.getAttribute('src');
			translatedRequest.data.linkImg = linkImgSrc.substring(linkImgSrc.lastIndexOf('/') + 1, linkImgSrc.length);

			if (typeof translatedRequest.data.linkImg === 'string') {
				translatedRequest.data.linkImg = translatedRequest.data.linkImg.toLowerCase();
			}
		}

		if (typeof targetElParentRegion === 'object') {
			translatedRequest.data.region = targetElParentRegion.name;
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../regions/regions":"DxeItO","ac-dom-traversal":49}],"vPF0EK":[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {
		
		var translatedRequest = request;
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],"ac-analytics/translator/component/overlay":[function(require,module,exports){
module.exports=require('vPF0EK');
},{}],"ac-analytics/translator/component/page":[function(require,module,exports){
module.exports=require('NcRXMk');
},{}],"NcRXMk":[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		var translatedRequest = request;
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],"chF+IX":[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		return request;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],"ac-analytics/translator/component/section":[function(require,module,exports){
module.exports=require('chF+IX');
},{}],"ac-analytics/translator/component/video":[function(require,module,exports){
module.exports=require('ighRR/');
},{}],"ighRR/":[function(require,module,exports){
(function () {

	'use strict';

	var eventTypes = {

		play: function (request) {

			if (request.data.ended === true) {
				return 'replay';
			}

			return 'started';
		},

		ended: function (request) {

			if (request.data.ended === true) {
				return 'reended';
			}
			return 'ended';
		},

		'captions-enabled': function (request) {

			if (request.data.captionsEnableCount === 0) {
				return 'captions-enabled';
			}
			return 'captions-reenabled';
		}
	};

	var interactionTypes = {

		click: function (request) {
			return request.data.event.type;
		}
	};

	function translate (request) {

		var translatedRequest = request;

		translatedRequest.data.eventType = (eventTypes[request.data.eventType]) ? eventTypes[request.data.eventType](request) : request.data.eventType;

		if (request.data.event && interactionTypes[request.data.event.type]) {
			translatedRequest.data.interactionType = interactionTypes[request.data.event.type](request);
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],"eq7uW9":[function(require,module,exports){
(function () {
	'use strict';
	var errorHandler = require('../error-handler/ErrorHandler');

	var components = {
		audio: require('./component/audio'),
		gallery: require('./component/gallery'),
		link: require('./component/link'),
		click: require('./component/click'),
		overlay: require('./component/overlay'),
		page: require('./component/page'),
		section: require('./component/section'),
		video: require('./component/video'),
		exit: require('./component/exit'),
		event: require('./component/event')
	};

	function translate(request) {
		var translatedRequest = request;

		if (request.type && components[request.type]) {
			if (typeof request.data !== 'object') {
				errorHandler.log('Translator', 'translate', 'request.data (' + request.data + ') must be an object');
			}

			if (errorHandler.exception) {
				return;
			}
			
			translatedRequest = components[request.type].translate(request);
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate,
		components: components
	};
}());

},{"../error-handler/ErrorHandler":"yoExqy","./component/audio":"8lTacU","./component/click":"JuqcqK","./component/event":"kZao3w","./component/exit":"yWnp5u","./component/gallery":"P9nfNI","./component/link":"L1gkGb","./component/overlay":"vPF0EK","./component/page":"NcRXMk","./component/section":"chF+IX","./component/video":"ighRR/"}],"ac-analytics/translator/translator":[function(require,module,exports){
module.exports=require('eq7uW9');
},{}]},{},["++O3BW"])