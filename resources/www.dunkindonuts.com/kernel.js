/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics</code> library contains all analytics component classes and utilities.
 * @static
 * @class CQ_Analytics
 */

if( !window.CQ_Analytics ) {
    window.CQ_Analytics = {};
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.Operator</code> object is a singleton providing the most common operator names and
 * utils around the operators.
 * @singleton
 * @class CQ_Analytics.Operator
 */
CQ_Analytics.Operator = (function() {
    return function () {
    };
})();

/**
 * Operator "is".
 * @static
 * @type String
 */
CQ_Analytics.Operator.IS = "is";

/**
 * Operator "equals".
 * @static
 * @type String
 */
CQ_Analytics.Operator.EQUALS = "equals";

/**
 * Operator "not equals".
 * @static
 * @type String
 */
CQ_Analytics.Operator.NOT_EQUAL = "notequal";

/**
 * Operator "greater than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.GREATER = "greater";

/**
 * Operator "equals or greater than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.GREATER_OR_EQUAL = "greaterorequal";

/**
 * Operator "older than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.OLDER = "older";

/**
 * Operator "equals or older than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.OLDER_OR_EQUAL = "olderorequal";

/**
 * Operator "less than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.LESS = "less";

/**
 * Operator "equals or less than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.LESS_OR_EQUAL = "lessorequal";

/**
 * Operator "younger than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.YOUNGER = "younger";

/**
 * Operator "equals or younger than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.YOUNGER_OR_EQUAL = "youngerorequal";

/**
 * Operator "contains".
 * @static
 * @type String
 */
CQ_Analytics.Operator.CONTAINS = "contains";

/**
 * Operator "begins with".
 * @static
 * @type String
 */
CQ_Analytics.Operator.BEGINS_WITH = "beginswith";

/**
 * The <code>CQ_Analytics.OperatorActions</code> object is a singleton providing utilities to resolve operations
 * containing operators (type of <code>CQ_Analytics.Operators</code>).
 */
CQ_Analytics.OperatorActions = function() {
    var mapping = {};

    var addOperator = function(name, text, operation) {
        mapping[name] = [text, operation];
    };

    addOperator(CQ_Analytics.Operator.EQUALS, "equals", "==");
    addOperator(CQ_Analytics.Operator.IS, "is", "==");

    addOperator(CQ_Analytics.Operator.NOT_EQUAL, "is not equal to", "!=");

    addOperator(CQ_Analytics.Operator.GREATER, "is greater than", ">");
    addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL, "is equal to or greater than", ">=");

    addOperator(CQ_Analytics.Operator.OLDER, "is older than", ">");
    addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL, "is equal to or older than", ">=");

    addOperator(CQ_Analytics.Operator.LESS, "is less than", "<");
    addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL, "is equal to or less than", "<=");

    addOperator(CQ_Analytics.Operator.YOUNGER, "is younger than", "<");
    addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL, "is equal to or younger than", "<=");

    addOperator(CQ_Analytics.Operator.CONTAINS, "contains", function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
            }
            return true;
        }
        return false;
    });

    addOperator(CQ_Analytics.Operator.BEGINS_WITH, "begins with", function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) == 0;
            }
            return true;
        }
        return false;
    });

    var getByIndex = function(op, index) {
        if (mapping[op] && mapping[op][index]) {
            return mapping[op][index];
        }
        return "";
    };

    var escapeQuote = function(str) {
        if (str) {
            str = str.replace(new RegExp("\\'", "ig"), str);
        }
        return str;
    };

    return {
        /**
         * Returns operator friendly name.
         * @param {CQ_Analytics.Operator} operator
         * @return {String} text if defined, empty string otherwise.
         */
        getText: function(operator) {
            return getByIndex(operator, 0);
        },

        /**
         * Set operator friendly name.
         * @param {CQ_Analytics.Operator} operator
         * @param {String} newText The next text
         */
        setText: function(operator, newText) {
            if (mapping[operator] && mapping[operator][0]) {
                mapping[operator][0] = newText;
            }
        },

        /**
         * Returns operator operation, which can be either:<ul>
         * <li>String: mathematical JS operator like ==, <, <=, > ... </li>
         * <li>Function: function requiring 2 parameters, the 2 values to operate and which returns true if operation
         * success, false otherwise.
         * Example: contains operator function.<code>
         function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
            }
            return true;
        }
        return false;
    }
         * </code></li>
         * </ul>
         * @param {CQ_Analytics.Operator} operator
         * @return {String/Function} Operator string or function if operator is defined, empty string otherwise.
         */
        getOperation: function(operator) {
            return getByIndex(operator, 1);
        },

        /**
         * Operates a property value and a value with an operator. Sample: <code>
           var obj = {};
           obj["age"] = 30;
           CQ_Analytics.OperatorActions.operate(obj, "age", CQ_Analytics.Operator.IS, "30", "parseInt"); //returns true
           CQ_Analytics.OperatorActions.operate(obj, "age", CQ_Analytics.Operator.GREATER_THAN, "40", "parseInt"); //returns false
         * </code>
         *
         * @param {Object} object Value container.
         * @param {String} property Name of the propert to operate.
         * @param {CQ_Analytics.Operator} operator
         * @param {String} value The second value of the operation
         * @param {String} valueFormat (optional) An optional value formatter (parseInt, parseFloat, toString...)
         * @return {Boolean} true if operation success, false otherwise.
         */
        operate: function(object, property, operator, value, valueFormat) {
            try {
                if (object && object[property]) {
                    var toEval = "";
                    var op = this.getOperation(operator);
                    op = op ? op : operator;
                    var objectValue = CQ.shared.XSS.getXSSTablePropertyValue(object, property);
                    if (typeof op == "function") {
                        return op.call(this, objectValue, value, valueFormat);
                    } else {
                        if (valueFormat) {
                            toEval = valueFormat + "('" + objectValue + "') " + op + " " + valueFormat + "('" + value + "')";
                        } else {
                            var s1 = escapeQuote(objectValue);
                            var s2 = escapeQuote(value);
                            toEval = "'" + s1 + "' " + op + " '" + s2 + "'";
                        }
                        var b = eval(toEval);
                        return b;
                    }

                }
            } catch(e) {
                //console.log("Error in Operator resolution", e, toEval);
            }
            return false;
        }
    };
}();
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A helper class providing a set of utility methods.
 * <br>
 * @class CQ_Analytics.Utils
 */
CQ_Analytics.Utils = new function() {
    return {
        /**
         * Attaches an event handler while properly considering (aka chaining) an existing one
         * @static
         * @param {Object} event Event
         * @param {Function} func Function
         */
        registerDocumentEventHandler: function(event, func) {
            var oldHandler = window.document[event];
            if (typeof window.document[event] != 'function') {
                window.document[event] = func;
            } else {
                // chain old with new func
                window.document[event] = function(e) {
                    if (oldHandler) {
                        oldHandler(e);
                    }
                    func(e);
                };
            }
        },

        /**
         * Creates a event wraping function of a parameter function. Available parameters are:<ul>
         *        <li><b>event</b> : Object<div class="sub-desc">Event</div></li>
         *        <li><b>keyCode</b> : Number<div class="sub-desc">Key code</div></li>
         *        </ul>
         * @static
         * @param {Function} func The function to wrap
         * @return {Function} Wrapping function
         */
        eventWrapper: function(func) {
            return function(e) {
                var keyCode, event;
                if (document.all) {
                    keyCode = window.event.keyCode;
                    event = window.event;
                } else {
                    keyCode = (typeof(e.which) != 'undefined') ? e.which : 0;
                    event = e;
                }
                if (event) {
                    func(event, keyCode);
                }
            };
        },

        /**
         * Loads the HTML returned by a GET request into a DOM element.
         * @static
         * @param {String} url URL to request
         * @param {String} elemId Id of the DOM element where HTML is inserted.
         */
        loadElement: function(url, elemId) {
            $CQ("#" + elemId).load(url);
        },

        /**
         * Loads the HTML returned by a GET request into a DOM element. Teasers smooth loading.
         * @static
         * @param {String} url URL to request
         * @param {String} elemId Id of the DOM element where HTML is inserted.
         */
        loadTeaserElement: function(url, elemId) {
            var hbckup = $CQ("#" + elemId).css("height");
            var h = $CQ("#" + elemId).height();
            if (h > 0) {
                //force height to avoid flickering
                $CQ("#" + elemId).css("height", h);
            }

            var showTeaser = function(text) {
                if (text && text != "") {
                    var toInject = $CQ(text).css("display", "none");
                    $CQ("#" + elemId).append(toInject);
                    toInject.fadeIn(/*"fast", */function() {
                        if (hbckup && hbckup != "0px") {
                            $CQ("#" + elemId).css("height", hbckup);
                        }
                    });
                } else {
                    if (hbckup && hbckup != "0px") {
                        $CQ("#" + elemId).css("height", hbckup);
                    }
                }
            };

            var cacheTeaser = function(url, text) {
                if (!CQ_Analytics.Utils.teasersCache) {
                    CQ_Analytics.Utils.teasersCache = {};
                }

                CQ_Analytics.Utils.teasersCache[url] = text;
            };


            var handleTeaser = function() {
                if (CQ_Analytics.Utils.teasersCache && CQ_Analytics.Utils.teasersCache[url]) {
                    showTeaser(CQ_Analytics.Utils.teasersCache[url]);
                } else {
                    CQ_Analytics.Utils.teasersLoading = CQ_Analytics.Utils.teasersLoading || {};
                    //teaser might be alreading being loaded
                    if( CQ_Analytics.Utils.teasersLoading[url]) {
                        //"come back" in some few ms
                        window.setTimeout(function() {
                            CQ_Analytics.Utils.loadTeaserElement(url, elemId);
                        }, 100);
                    } else {
                        CQ_Analytics.Utils.teasersLoading[url] = true;
                        loadTeaser();
                    }
                }
            };

            var loadTeaser = function() {
                // the WCM mode might have been changed using a parameter, in such cases
                // we need to proxy the parameter to the teaser paragraph to avoid JS
                // errors that originate from the parameter rendered in the wrong mode
                // (for example, rendered for edit mode when the WCM mode is actually
                // disabled); also ensure that a "overridden URL" (for example, provided
                // by the portal adapter) takes precedence over the actual URL
                var requestURL = url;
                var baseUrl = location.href;
                if (typeof CQ_CONTENT_PATH != "undefined") {
                    baseUrl = CQ_CONTENT_PATH;
                }
                var wcmMode = CQ.shared.HTTP.getParameter(baseUrl, "wcmmode");
                if (wcmMode) {
                    requestURL += (requestURL.indexOf("?") > 0 ? "&" : "?") + "wcmmode=" + wcmMode;
                }

                CQ.shared.HTTP.get(requestURL, function(o, success, response) {
                    if (success) {
                        var text = response.body;
                        if (text) {
                            //filter response because following fadeOut cannot be applied to
                            //empty text nodes
                            text = text.replace(new RegExp("\\n", "ig"), "");
                            text = text.replace(new RegExp("\\r", "ig"), "");

                            cacheTeaser(url, text);

                            delete CQ_Analytics.Utils.teasersLoading[url];

                            handleTeaser();
                        }
                    } else {
                        cacheTeaser(url, "");
                    }
                });
            };

            var length = $CQ("#" + elemId).children().length;
            if (length > 0) {
                var item = 0;
                $CQ("#" + elemId).children().fadeOut(/*"fast",*/ function() {
                    var child = $CQ(this);
                    window.setTimeout(function() {
                        child.remove();
                        item ++;
                        if (item >= length) {
                            handleTeaser();
                        }
                    }, 50);
                });
            } else {
                handleTeaser();
            }


        },

        /**
         * Clears in the inner HTML content of a DOM element.
         * @static
         * @param {String} elemId Id of the DOM element to clear.
         */
        clearElement: function(elemId) {
            if (elemId) {
                $CQ("#" + elemId).html("");
            }
        },

        /**
         * Checks whether or not the specified object exists in the array.
         * @static
         * @param {Object} o The object to check for
         * @return {Number} The index of o in the array (or -1 if it is not found)
         */
            //Copied from CQ.Ext
        indexOf : function(array, o) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == o) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameter:<ul>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        </ul>
         */
        load: function(url, callback, scope) {
            return CQ.shared.HTTP.get(url, callback, scope);
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameter:<ul>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope
         */
        post: function(url, callback, params, scope) {
            return CQ.shared.HTTP.post(url, callback, params, scope);
        },

        /**
         * Returns the current page path.
         * @static
         * @return {String} Page path
         */
        getPagePath: function() {
            return CQ.shared.HTTP.getPath();
        },

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL
         * @return {String} The path
         */
        getPath: function(url) {
            return CQ.shared.HTTP.getPath(url);
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            return CQ.shared.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: function(url) {
            return CQ.shared.HTTP.removeParameters(url);
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         * Copied from CQ.HTTP
         */
        removeAnchor: function(url) {
            return CQ.shared.HTTP.removeAnchor(url);
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
            //Copied from CQ.HTTP
        getSchemeAndAuthority: function(url) {
            return CQ.shared.HTTP.getSchemeAndAuthority(url);
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: function(url, doc) {
            return CQ.shared.HTTP.internalize(doc);
        },

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            return CQ.shared.HTTP.externalize(url, encode);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link CQ.shared.HTTP#encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @static
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: function(url) {
            return CQ.shared.HTTP.encodePathOfURI(url);
        },

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ' ( )</code><br>
         * <code>; / : @ & = $ ,</code><br>
         * @static
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: function(path) {
            return CQ.shared.HTTP.encodePath(path);
        },

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: function() {
            return CQ.shared.HTTP.getContextPath();
        },

        /**
         * Detects the context path used on the server.
         * @private
         * @static
         * @since 5.3
         */
        detectContextPath: function() {
            return CQ.shared.HTTP.detectContextPath();
        },

        /**
         * Takes an object and converts it to an encoded URL. e.g. <code>CQ.Ext.urlEncode({foo: 1, bar: 2});</code>
         * would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting
         * string that's returned will contain a name/value pair for each array value.
         * @static
         * @param {Object} o
         * @return {String}
         */
            //Copied from CQ.HTTP
        urlEncode : function(o) {
            if (!o) {
                return "";
            }
            if (typeof o == 'string') {
                return o;
            }
            var buf = [];
            for (var key in o) {
                var ov = o[key], k = encodeURIComponent(key);
                var type = typeof ov;
                if (type == 'undefined') {
                    buf.push(k, "=&");
                } else if (type != "function" && type != "object") {
                    buf.push(k, "=", encodeURIComponent(ov), "&");
                } else if (typeof ov == "array") {
                    if (ov.length) {
                        for (var i = 0, len = ov.length; i < len; i++) {
                            buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
                        }
                    } else {
                        buf.push(k, "=&");
                    }
                }
            }
            buf.pop();
            return buf.join("");
        },

        /**
         * Returns a base 16 encoded UID based on a timestamp and a random number.
         * @static
         * @return {String} UID
         */
        getUID: function() {
            //concatenate a timestamp + a 42 bits number ( 2^42- 1)
            var r = Math.floor(Math.random() * (Math.pow(2, 42) - 1));
            return this.getTimestamp().toString(16) + r.toString(16);
        },

        /**
         * Returns a timestamp.
         * @static
         * @return {Number} Timestamp
         */
        getTimestamp: function() {
            var d = new Date();
            return d.getTime();
        },

        /**
         * Inserts a string every x character into another string.
         * @static
         * @param {String} str Source string
         * @param {Number} every Inserts <b>every</b> x characters
         * @param {String} separator String to insert
         * @return {String} The string with inserted separators
         */
        insert: function(str, every, separator) {
            if (!str || isNaN(every) || !separator) return str;
            var res = "";
            var from = 0;
            var to = every;
            while (to < str.length) {
                res += str.substring(from, to) + separator;
                from += every;
                to += every;
            }
            if (from < str.length) {
                res += str.substring(from);
            }
            return res;
        },

        /**
         * @private
         */
        addListener: function () {
            if (window.addEventListener) {
                return function(el, eventName, fn, capture) {
                    el.addEventListener(eventName, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        },

        /**
         * @private
         */
        removeListener: function() {
            if (window.removeEventListener) {
                return function (el, eventName, fn, capture) {
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }
    };
};

/**
 * A helper class providing a set of clickstream cloud rendering utility methods.
 * <br>
 * @class CQ_Analytics.ClickstreamcloudRenderingUtils
 */
CQ_Analytics.ClickstreamcloudRenderingUtils = new function() {
    return {
        /**
         * Creates a link DOM element.
         * @static
         * @param {String} text Text
         * @param {Function} func Onclick method
         * @param {Object} props Tag attributes
         * @return {Element} Link DOM element.
         */
        createLink: function(text, func, props, anchor) {
            var link = document.createElement("a");
            link.href = anchor;
            link.onclick = func;
            link.innerHTML = text;
            if (props) {
                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        link[p] = props[p];
                    }
                }
            }
            return link;
        },

        /**
         * Creates a link DOM element.
         * @static
         * @param {String} text Text
         * @param {String} href Href
         * @param {Object} title Title
         * @return {Element} Link DOM element.
         */
        createStaticLink: function(text, href, title) {
            var link = document.createElement("a");
            link.href = href;
            link.innerHTML = text;
            link.title = title;
            link.alt = title;
            return link;
        },

        /**
         * Creates a span DOM element with format "property = value"
         * @static
         * @param {String} label Property label
         * @param {String} value Value
         * @param {String} cssClass CSS class name
         * @param {String} title Span title
         * @return {Element} Span DOM element.
         */
        createNameValue: function(label, value, cssClass, title) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            span.innerHTML = label + " = " + value;
            span.title = title;
            span.alt = title;
            return span;
        },

        /**
         * Creates a span DOM element
         * @static
         * @param {String} text Span inner HTML
         * @param {String} cssClass CSS class name
         * @param {String} title Span title
         * @return {Element} Span DOM element.
         */
        createText: function(text, cssClass, title) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            if (text && text.indexOf && (
                (text.indexOf("/home") != -1 && text.indexOf("/image") != -1)
                    || (text.indexOf("/") != -1 && text.indexOf(".png") != -1))) {
                //image
                span.innerHTML = "<img src=\"" + text + ".prof.thumbnail.png\" border=\"0\">";
            }
            else if (text && text.indexOf && text.indexOf("www.gravatar.com") != -1) {
                span.innerHTML = "<img src=\"" + text + "\">";
            }
            else {
                span.innerHTML = text;
            }
            span.title = title;
            span.alt = title;
            return span;
        },

        /**
         * Creates a span DOM element with format "property = value" and transforms
         * it to a text input field on click.
         * @static
         * @param {String} name Property label
         * @param {String} value Value
         * @return {Element} Span DOM element.
         */
        createEditablePropertySpan: function(name, value) {
            //TODO generalize css classes
            var onclick = "var editSpan = this.nextSibling; " +
                "this.style.display = 'none'; " +
                "editSpan.style.display = 'block';";
            var onblur = "var editSpan = this.parentNode; " +
                "var readSpan = this.parentNode.previousSibling;" +
                "var newValue = this.value;" +
                "editSpan.style.display = 'none'; " +
                "readSpan.innerHTML = '" + name + " = '+value; " +
                "readSpan.style.display = 'block';";
            var span = document.createElement("span");
            span.innerHTML = "<span class=\"ccl-data\" onclick=\"" + onclick + "\">" + name + " = " + value + "</span>";
            span.innerHTML += "<span class=\"ccl-data\" style=\"display: none;\">" + name + " = <input class=\"ccl-input\" type=\"text\" value=\"" + value + "\" onblur=\"" + onblur + "\"></span>";
            span.className = "ccl-data";
            return span;
        }
    }
};

/**
 * A helper class providing a set of ClientContext utility methods.
 * <br>
 * @class CQ_Analytics.ClientContextUtils
 * @since 5.5
 */
CQ_Analytics.ClientContextUtils = new function() {
    return {
        /**
         * Renders a store property value into the DOM. On store update, rendering will be updated.
         * @static
         * @param {String} id Id of the DOM element that will contain the property rendering
         * @param {String} storeName Name of the store
         * @param {String} propertyName Name of the property
         * @param {String} prefix (Optional) Fixed prefix to prepend to property value
         * @param {String} suffix (Optional) Fixed suffix to append to property value
         * @param {String} defaultValue (Optional) Default value to render if property is not in the store
         */
        renderStoreProperty: function(id, storeName, propertyName, prefix, suffix, defaultValue) {
            if (CQ_Analytics && CQ_Analytics.CCM) {
                CQ_Analytics.CCM.onReady(function() {
                    var init = function() {
                        var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                        if (store) {
                            var renderer = function() {
                                var value = store.getProperty(propertyName) || defaultValue;
                                var el = $CQ("#" + id);

                                if (el.attr("contenteditable") &&
                                    /* test needed for IE7 */
                                    el.attr("contenteditable") != "inherit") return;

                                if (typeof(value) == "string" &&
                                    (
                                        (value.indexOf("/") == 0 &&
                                            (value.toLowerCase().indexOf(".png") != -1
                                                || value.toLowerCase().indexOf(".jpg") != -1
                                                || value.toLowerCase().indexOf(".gif") != -1)
                                            || value.toLowerCase().indexOf("http") == 0)
                                        )
                                    ) {
                                    if (!value || value == "") {
                                        el.children().remove();
                                        if( CQ_Analytics.isUIAvailable) {
                                            el.html(CQ.I18n.getMessage("No", null, "Ex: No address, No keywords") + " " + propertyName);
                                        } else {
                                            el.html("No " + propertyName);
                                        }
                                    } else {
                                        var url = "";
                                        if (el.parents(".cq-cc-thumbnail").length == 0 ||
                                            value.toLowerCase().indexOf("http") == 0 ||
                                            value.indexOf("/libs/wcm/mobile") == 0) {
                                            url = value.replace(new RegExp("&amp;", "g"), "&");
                                        } else {
                                            url = "/etc/clientcontext/shared/thumbnail/content.png";
                                            url = CQ.shared.HTTP.addParameter(url, "path", CQ_Analytics.Variables.replaceVariables(value));
                                        }
                                        url = CQ_Analytics.Variables.replaceVariables(url);
                                        /* as some browsers updates url() by host:port, we can't simply check if urls are equal, have to check if current contains proposed path instead */
                                        var previousUrl = el.find("div").css("background-image") || "";
                                        if (previousUrl.indexOf(url + ")") === -1) {
                                            if (store.fireEvent("beforepropertyrender", store, id) !== false) {
                                                //image
                                                el.html("");
                                                el.children().remove();
                                                $CQ("<div>")
                                                    .addClass("cq-cc-thumbnail-img")
                                                    .css("background-image", "url(" + CQ.shared.HTTP.externalize(url) + ")")
                                                    .appendTo(el);
                                                store.fireEvent("propertyrender", store, id);
                                            }
                                        }
                                    }
                                } else {
                                    value = CQ_Analytics.Variables.replaceVariables(value);
                                    if( CQ_Analytics.isUIAvailable) {
                                        value = (!value || value == "") ?
                                            CQ.I18n.getMessage("No", null, "Ex: No address, No keywords") + " " + propertyName :
                                            value = prefix + value + suffix;
                                    } else {
                                        value = (!value || value == "") ?
                                            "No " + propertyName :
                                            value = prefix + value + suffix;
                                    }
                                    if (el.html() != value) {
                                        if (store.fireEvent("beforepropertyrender", store, id) !== false) {
                                            el.html(value);
                                            store.fireEvent("propertyrender", store, id);
                                        }
                                    }
                                }
                            };

                            if (store.fireEvent("beforeinitialpropertyrender", store, id) !== false) {
                                renderer();

                                if (store.addListener) {
                                    store.addListener('update', function() {
                                        renderer();
                                    });
                                }

                                store.fireEvent("initialpropertyrender", store, id);
                            }
                        }
                    };

                    CQ_Analytics.ClientContextUtils.onStoreRegistered(storeName, init);
                });
            }
        },

        /**
         * Renders a store into the DOM. On store update, rendering will be updated. Rendering is done by calling the
         * <code>renderer</code> method of the store.
         * @static
         * @param {String} id Id of the DOM element that will contain the property rendering
         * @param {String} storeName Name of the store
         */
        renderStore: function(id, storeName) {
            if (CQ_Analytics && CQ_Analytics.CCM && id && storeName) {
                CQ_Analytics.CCM.onReady(function() {
                    var init = function() {
                        var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                        if (store) {
                            store.divId = id;
                            var renderer = function() {
                                if (store.fireEvent("beforerender", store, store.divId) !== false) {
                                    store.renderer(store, store.divId);
                                    store.fireEvent("render", store, store.divId);
                                }
                            };

                            if (store.fireEvent("beforeinitialrender", store, id) !== false) {
                                renderer();

                                if (store.addListener) {
                                    store.addListener('update', function() {
                                        renderer();
                                    });
                                }

                                store.fireEvent("initialrender", store, id);
                            }
                        }
                    };

                    CQ_Analytics.ClientContextUtils.onStoreRegistered(storeName, init);
                });
            }
        },

        /**
         * Returns a list of options: list of stores registered in the {@link CQ_Analytics.StoreRegistry}.
         * @static
         * @return {Object[]} Computed options
         */
        storesOptionsProvider: function() {
            var options = [];
            var stores = CQ_Analytics.StoreRegistry.getStores();
            for (var name in stores) {
                options.push({
                    value: name
                });
            }
            return options;
        },

        /**
         * Returns a list of options: list of properties of a store.
         * @static
         * @param {String} storeName Name of the store
         * @param {Boolean} showValue (Optional) True to add value to the options (defaults to false)
         * @return {Object[]} Computed options
         */
        storePropertiesOptionsProvider: function(storeName, showValue) {
            var options = [];
            var store = CQ_Analytics.StoreRegistry.getStore(storeName);
            if (store) {
                var names = store.getPropertyNames();
                for (var i = 0; i < names.length; i++) {
                    var value = names[i];
                    if (!CQ.shared.XSS.KEY_REGEXP.test(value)) {
                        var o = {
                            value: value
                        };

                        if (showValue) {
                            o["text"] = value + " - " + store.getProperty(value);
                        }
                        options.push(o);
                    }
                }
            }
            return options;
        },

        /**
         * Executes a callback function when a store is registered.
         * @static
         * @param {String} storeName Name of the store
         * @param {Function} callback Function to execute
         */
        onStoreRegistered: function(storeName, callback) {
            if (callback) {
                var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                if (store) {
                    callback.call(store, store);
                } else {
                    CQ_Analytics.CCM.addListener('storeregister', function(e, sessionstore) {
                        if (sessionstore.getName() == storeName) {
                            callback.call(sessionstore, sessionstore);
                        }
                    });
                }
            }
        },

        /**
         * Executes a callback function when a store is initialized. Some store might be initialized several times
         * (default init + asynchronous data loading): use delay parameter to try to get only one call of the callback.
         * A timeout is defined before every init event, next init event kills all previous calls. Latest one execute
         * the callback. WARNING: if time between 2 init events is bigger than timeout, callback is called several
         * times.
         * @static
         * @param {String} storeName Name of the store
         * @param {Function} callback Function to execute
         * @param {Boolean/Number} delay True to enable a default delay
         * (value is {@link #ClientContextUtils.DEFAULT_INIT_DELAY DEFAULT_INIT_DELAY} or a number of milliseconds (defaults
         * false).
         */
        onStoreInitialized: function(storeName, callback, delay) {
            if( delay === true) {
                delay = CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY;
            }

            var internal_callback = function() {
                var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                if( store.DELAYED_INIT_TIMEOUT ) {
                    window.clearTimeout(store.DELAYED_INIT_TIMEOUT);
                    store.DELAYED_INIT_TIMEOUT = null;
                }

                if( delay > 0 ) {
                    store.DELAYED_INIT_TIMEOUT = window.setTimeout(function() {
                        store.DELAYED_INIT_TIMEOUT = null;
                        callback.call(store, "initialize", store);
                    }, delay);
                } else {
                    callback.call(store, "initialize", store);
                }
            };

            var store = CQ_Analytics.StoreRegistry.getStore(storeName);
            if (store) {
                if( store.isInitialized()) {
                    internal_callback.call(store);
                    store.addListener("initialize",function(event, store) {
                        internal_callback.call(store);
                    });
                } else {
                    store.addListener("initialize",function(event, store) {
                        internal_callback.call(store);
                    });
                }
            } else {
                    CQ_Analytics.CCM.addListener('storeregister', function(e, sessionstore) {
                        if (sessionstore.getName() == storeName) {
                            CQ_Analytics.ClientContextUtils.onStoreInitialized(storeName, callback, delay);
                        }
                    });
                }
        },

        /**
         * Inits the ClientContext.
         * @static
         * @param {String} ccPath ClientContext path
         * @param {String} pagePath Current page path
         */
        init: function(ccPath, pagePath, options) {
            CQ_Analytics.ClientContextMgr.PATH = ccPath;
            CQ_Analytics.ClientContextMgr.loadConfig(options, true);

            var url = CQ.shared.HTTP.externalize(ccPath + "/content/jcr:content/stores.init.js");
            url = CQ.shared.HTTP.addParameter(url, "path", pagePath);
            url = CQ.shared.HTTP.noCaching(url);
            //jquery will do the eval
            var res = CQ.shared.HTTP.get(url);
        },

        /**
         * Inits the ClientContext UI.
         * @static
         * @param {String} ccPath ClientContext path
         * @param {String} pagePath Current page path
         */
        initUI: function(ccPath, pagePath, editMode) {
            CQ_Analytics.ClientContextUI.create(ccPath, pagePath, editMode);
        }

    }
};

/**
 * Default init delay. See {@link #onStoreInitialized}.
 * @static
 * @type Number
 */
CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY = 200;

/**
 * A helper class providing a set of ClientContext utility methods to handle variables: a variable is a marker used
 * in a store property value to referenced the value of another property. Format: ${/storeName/propertyName}
 * <br>
 * @class CQ_Analytics.Variables
 * @since 5.5
 */
CQ_Analytics.Variables = new function() {
    return {
        /**
         * Returns if a value contains a variable of not.
         * @static
         * @param {String} value The value to test
         */
        containsVariable: function(value) {
            return CQ_Analytics.Variables.getVariables(value).length > 0;
        },

        /**
         * Returns the variables contained into a value.
         * @static
         * @param {String} value The value
         */
        getVariables: function(value) {
            if (!value || typeof(value) != "string") return [];
            var res = value.match(new RegExp("\\$\\{([\\w/]*)\\}", "ig"));
            return res ? res : [];
        },

        /**
         * Replaces the variables into a value by their corresponding values in the ClientContext and returns
         * the result.
         * @static
         * @param {String} value The value
         * @return {String} The result of the replacement
         */
        replaceVariables: function(value) {
            if (!value) return value;
            //keep history to avoid infinite loops
            var history = "";
            var res = value;
            var variables = CQ_Analytics.Variables.getVariables(value);
            while (variables.length > 0 && history.indexOf(variables.join()) == -1) {
                for (var i = 0; i < variables.length; i++) {
                    //current format should ${store/property}
                    //extract store/property
                    var vName = CQ_Analytics.Variables.getPropertyPath(variables[i]);
                    var v = CQ_Analytics.ClientContext.get(vName) || "";
                    res = CQ_Analytics.Variables.replace(res,vName,v);
                }
                history += variables.join();
                variables = CQ_Analytics.Variables.getVariables(res);
            }
            return res;
        },

        /**
         * Returns the path to the property contained in the provided variable.
         * @static
         * @param {String} variable The variable
         * @return The path to the property. Null if no path available.
         */
        getPropertyPath: function(variable) {
            if( !variable || variable.length < 2 ) return null;
            return variable.substring(2, variable.length - 1);
        },

        /**
         * Returns the name of the property contained in the provided variable.
         * @static
         * @param {String} variable The variable
         * @return The name of the property. Null if no property name available.
         */
        getPropertyName: function(variable) {
            var p = CQ_Analytics.Variables.getPropertyPath(variable);
            if( p ) {
                var s = p.split("/");
                if(s.length == 3) {
                    return s[2];
                }
            }
            return null;
        },

        /**
         * Returns the name of the store contained in the provided variable.
         * @static
         * @param {String} variable The variable
         * @return The name of the store. Null if no store name available.
         */
        getStoreName: function(variable) {
            var p = CQ_Analytics.Variables.getPropertyPath(variable);
            if( p ) {
                var s = p.split("/");
                if(s.length > 1) {
                    return s[1];
                }
            }
            return null;
        },

        /**
         * Replaces all instances of the variable <code>${key}</code> by <code>value</code>
         * in the provided <code>string</code> and returns the result.
         * @static
         * @param {String} string The string
         * @param {String} key The variable key
         * @param {String} value The replacement value
         * @return {String} The result of the replacement
         */
        replace: function(string, key, value) {
            return string.replace(new RegExp("\\\$\\{" + key + "\\}", "ig"), value);
        }
    }
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ_Analytics.SessionPersistence = CQ.shared.ClientSidePersistence;
CQ_Analytics.Cookie = CQ.shared.ClientSidePersistence.CookieHelper;

/**
 * @class CQ_Analytics.Observable
 * An Observable adds the observable design pattern to an object: this object fires events and allows other objects to
 * listen to these events and react.
 * @constructor
 * Creates a new Observable.
 */
CQ_Analytics.Observable = function() {
    this.fireEvent = function(event) {
        if (event && this.listeners && !this.suppressEvents) {
            event = event.toLowerCase();
            var args = Array.prototype.slice.call(arguments, 0);

            // Listeners which refresh their WCM.editables remove themselves before refresh since
            // the refresh will replace them.  We therefore have to make a copy of the listeners
            // array or we'll skip some listeners as the array moves around underneath us.
            var listenersCopy = this.listeners.slice(0);

            for (var i = 0; i < listenersCopy.length; i++) {
                var l = listenersCopy[i];
                if (event == l.event) {
                    if (l.fireFn.apply(l.scope || this || window, args) === false) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
};

/**
 * Appends an event handler to the current Observable.
 * @param {String} event Event name.
 * @param {Function} fct The method the event invokes.
 * @param {Object} scope (optional) The scope in which to execute the handler
 * function. The handler function's "this" context.
 */
CQ_Analytics.Observable.prototype.addListener = function(event, fct, scope) {
    this.listeners = this.listeners || new Array();
    if (event && fct) {
        this.listeners.push({
            "event": event.toLowerCase(),
            "fireFn": fct,
            "scope": scope
        });
    }
};

/**
 * Removes an event handler from the current Observable.
 * @param {String} event Event name.
 * @param {Function} fct The method the event invokes.
 */
CQ_Analytics.Observable.prototype.removeListener = function(event, fct) {
    this.listeners = this.listeners || new Array();
    if (event && fct) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].event == event &&
                    this.listeners[i].fireFn == fct) {
                this.listeners.splice(i, 1);
            }
        }
    }
};

/**
 * Sets the value of the <tt>suppressEvents</tt> property
 * 
 * @param {Boolean} suppressEvents
 */
CQ_Analytics.Observable.prototype.setSuppressEvents = function(suppressEvents) {
	this.suppressEvents = suppressEvents;
}

/**
 * Array of listeners objects.
 * @private
 */
CQ_Analytics.Observable.prototype.listeners = null;

/**
 * Flag which controls suppression of event delivery
 * 
 * <p>If set to <tt>true</tt>, listeners will not be notified of events. Default to <tt>false</tt>.</p>
 * 
 * @private
 */
CQ_Analytics.Observable.prototype.suppressEvents = false;

if( !CQ_Analytics.StoreRegistry ) {
    /**
     * Registery that contain a list of {@link CQ_Analytics.SessionStore}.
     * <br>
     * @static
     * @singleton
     * @class CQ_Analytics.StoreRegistry
     * @since 5.5
     */
    CQ_Analytics.StoreRegistry = new function() {
        var stores = {};
        return {
            /**
             * Registers a store into the registery
             * @param {Array} store
             */
            register: function(store) {
                if( store["STORENAME"] ) {
                    stores[store.STORENAME] = store;
                }
            },

            /**
             * Returns all registered stores.
             * @return Object
             */
            getStores: function() {
                return stores;
            },

            /**
             * Returns the store of the given name.
             * @param {String} name
             * @return Object
             */
            getStore: function(name) {
                return stores[name];
            }
        }
    }();
}

/**
 * @class CQ_Analytics.SessionStore
 * @extends CQ_Analytics.Observable
 * A SessionStore is a container of properties/values.
 * @constructor
 * Creates a new SessionStore.
 */
CQ_Analytics.SessionStore = function() {};

CQ_Analytics.SessionStore.prototype = new CQ_Analytics.Observable();

/**
 * Sets the value of a property.
 * @param {String} name Property name.
 * @param {String} value Property value.
 */
CQ_Analytics.SessionStore.prototype.setProperty = function(name, value) {
    if (this.data == null) {
        this.init();
    }
    this.data[name] = value;
    this.fireEvent("update", name);
};

/**
 * Sets the value of multiple properties
 * @param {Object} values The key-value store of values to set
 */
CQ_Analytics.SessionStore.prototype.setProperties = function( properties ) {
	if (this.data == null) {
		this.init();
	}

    var names = [];

	for ( var name in properties ) {
		if ( properties.hasOwnProperty (name) ) {

            names.push(name);
			var value = properties[name];

            this.data[name] = value;
		}
	}

	if (names.length > 0) {
        this.fireEvent("update", names);
    }
};

CQ_Analytics.SessionStore.prototype.initialized = false;

/**
 * Initializes the store.
 */
CQ_Analytics.SessionStore.prototype.init = function() {
    this.initialized = true;
    this.fireEvent("initialize",this);
};

/**
 * Returns a store property friendly label.
 * @param {String} name Property name.
 * @return {String} the label.
 */
CQ_Analytics.SessionStore.prototype.getLabel = function(name) { return name; };

/**
 * Returns a store property in a link format.
 * @param {String} name Property name.
 * @return {String} the link value.
 */
CQ_Analytics.SessionStore.prototype.getLink = function(name) { return name; };

/**
 * Removes a property from the store.
 * @param {String} name Property name.
 */
CQ_Analytics.SessionStore.prototype.removeProperty = function(name) {
    if (this.data == null) {
        this.init();
    }
    if (this.data[name]) {
        delete this.data[name];
    }

    this.fireEvent("update", name);
};

/**
 * Returns all store property names.
 * @param {String[]} excluded (Optional) Array of excluded properties (not returned).
 * @return {String[]} Array of the property names.
 */
CQ_Analytics.SessionStore.prototype.getPropertyNames = function(excluded) {
    if (this.data == null) {
        this.init();
    }

    excluded = excluded ? excluded : [];

    var res = new Array();
    for (var p in this.data) {
        if (CQ_Analytics.Utils.indexOf(excluded, p) == -1) {
            res.push(p);
        }
    }
    return res;
};

/**
 * Returns the session store attached to the current object (returns this).
 * @return {CQ_Analytics.SessionStore} Session store.
 */
CQ_Analytics.SessionStore.prototype.getSessionStore = function() {
    return this;
};

/**
 * Clears the store.
 */
CQ_Analytics.SessionStore.prototype.clear = function() {
    this.data = null;
};

/**
 * Returns the store data.
 * @param {String[]} excluded Property names to exclude from the result.
 * @return {Object} Object containing the store data (obj["property"] = value).
 */
CQ_Analytics.SessionStore.prototype.getData = function(excluded) {
    if (this.data == null) {
        this.init();
    }

    if (excluded) {
        var ret = {};
        for (var p in this.data) {
            if (CQ_Analytics.Utils.indexOf(excluded, p) == -1) {
                ret[p] = this.data[p];
            }
        }
        return ret;
    } else {
        return this.data;
    }
};

/**
 * Resets the store: restores initial values.
 */
CQ_Analytics.SessionStore.prototype.reset = function() {
    if (this.data != null) {
        this.data = null;
        this.fireEvent("update");
    }
};

/**
 * Returns the value of a store property (XSS filtered value).
 * @param {String} name Property name.
 * @param {Boolean} raw Raw value, no XSS filtering
 * @return {String} the value.
 */
CQ_Analytics.SessionStore.prototype.getProperty = function(name, raw) {
    if (this.data == null) {
        this.init();
    }
    var value = this.data[name];
    if( !raw ) {
        var xssValue = CQ.shared.XSS.getXSSValue(value);
        return xssValue;
    }
    return value;
};

/**
 * Returns the store name.
 */
CQ_Analytics.SessionStore.prototype.getName = function() {
    return this.STORENAME;
};

/**
 * Adds an initial property to the store.
 * @param {String} name Property name.
 * @param {String} value Property value.
 */
CQ_Analytics.SessionStore.prototype.addInitProperty = function(name, value) {
    if (! this.initProperty) this.initProperty = {};
    this.initProperty[name] = value;
};

/**
 * Returns the value of an initial property.
 * @param {String} name Property name.
 * @return {String} The value.
 */
CQ_Analytics.SessionStore.prototype.getInitProperty = function(name) {
    return this.initProperty ? this.initProperty[name] : null;
};

/**
 * Loads initial properties from an object.
 * @param {Object} obj Object containing the initial store data (obj["property"] = value).
 * @param {Boolean} setValues True to set the value in the store IF property does is not already present
 */
CQ_Analytics.SessionStore.prototype.loadInitProperties = function(obj, setValues) {
    if (obj) {
        for (var p in obj) {
            this.addInitProperty(p, obj[p]);
            if( setValues && this.data && this.data[p] === undefined) {
                this.setProperty(p, obj[p]);
            }
        }
    }
};

/**
 * Returns true if the store is initialized. False otherwise.
 */
CQ_Analytics.SessionStore.prototype.isInitialized = function() {
    return this.initialized;
};

/**
 * @class CQ_Analytics.PersistedSessionStore
 * @extends CQ_Analytics.SessionStore
 * A PersistedSessionStore is a persisted container of properties/values. The persistence is done
 * with {@link CQ_Analytics.SessionPersistence}.
 * @constructor
 * Creates a new PersistedSessionStore.
 */
CQ_Analytics.PersistedSessionStore = function () {};

CQ_Analytics.PersistedSessionStore.prototype = new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY = "key";

/**
 * Defines a property as non persited. By default all properties are persisted.
 * @param {String} name Property name
 */
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted = function(name) {
    if (!this.nonPersisted) this.nonPersisted = {};
    this.nonPersisted[name] = true;
};

CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX = "^generated*";

/**
 * Returns if a property in persisted or not.
 * @param {String} name Property name.
 * @return {Boolean} true if persisted, false otherwise.
 */
CQ_Analytics.PersistedSessionStore.prototype.isPersisted = function(name) {
    if (!this.nonPersisted) this.nonPersisted = {};
    return this.nonPersisted[name] !== true &&
        !new RegExp(CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX, "ig").test(name) &&
        !$CQ.isFunction(this.data[name]) &&
        (typeof this.data[name]) != "object";
};

/**
 * Returns the store key name used by persistence.
 * @return {String} The key name.
 */
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey = function() {
    return this.STOREKEY;
};

/**
 * Persists the store. All properties will be persisted as property=value using a {@link CQ_Analytics.SessionPersistence}.
 */
CQ_Analytics.PersistedSessionStore.prototype.persist = function() {
    if (this.fireEvent("beforepersist") !== false) {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        store.set(this.getStoreKey(), this.toString());
        this.fireEvent("persist");
    }
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.setProperty = function(name, value) {
    if (this.data == null) {
        this.init();
    }
    this.data[name] = value;
    if (this.isPersisted(name)) {
        this.persist();
    }
    this.fireEvent("update", name);
};


//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.setProperties = function( properties ) {
    if (this.data == null) {
        this.init();
    }

    var names = [];
    var shouldPersist = false;

    for ( var name in properties ) {
        if ( properties.hasOwnProperty (name) ) {

            names.push(name);
            var value = properties[name];

            this.data[name] = value;
            if (this.isPersisted(name)) {
                shouldPersist = true;
            }
        }
    }

    if (shouldPersist) {
        this.persist();
    }

    if (names.length > 0) {
        this.fireEvent("update", names);
    }
};

/**
 * Transforms the current store of paris (name,value) to a string.
 * @return {String} The stringified store.
 * @private
 */
CQ_Analytics.PersistedSessionStore.prototype.toString = function() {
    var list = null;
    if (this.data) {

        var encodeCommandChars = function(value) {
            if( !value || typeof(value) != "string") return value;
            var ret = value;
            ret = ret.replace(new RegExp(",","g"),"&#44;");
            ret = ret.replace(new RegExp("=","g"),"&#61;");
            ret = ret.replace(new RegExp("\\|","g"),"&#124;");
            return ret;
        };

        for (var p in this.data) {
            if (this.isPersisted(p)
                && this.data.hasOwnProperty(p)) {
                list = (list === null ? "" : list + ",");
                list += (p + "=" + encodeCommandChars(this.data[p]));
            }
        }
    }
    return list;
};

/**
 * Parses the given string to fill the store.
 * @param {String} str Stringified store.
 * @return {Object} Parsed object.
 * @private
 */
CQ_Analytics.PersistedSessionStore.prototype.parse = function(str) {
    var decodeCommandChars = function(value) {
        if( !value || typeof(value) != "string") return value;
        var ret = value;
        ret = ret.replace(new RegExp("&#44;","g"),",");
        ret = ret.replace(new RegExp("&#61;","g"),"=");
        ret = ret.replace(new RegExp("&#124;","g"),"|");
        return ret;
    };

    var obj = {};
    var array = str.split(",");
    for (var t in array) {
        if (array.hasOwnProperty(t)) {
            var entry = array[t].split("=");
            if (entry.length == 2) {
                obj[entry[0]] = decodeCommandChars(entry[1]);
            }
        }
    }
    return obj;
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.reset = function(deferEvent) {
    if (this.data != null) {
        this.data = {};
        this.persist();
        this.data = null;
        if (!deferEvent) {
            this.fireEvent("update");
        }
    }
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.removeProperty = function(name) {
    if (this.data == null) {
        this.init();
    }
    if (this.data[name]) {
        delete this.data[name];
        if (this.isPersisted(name)) {
            this.persist();
        }
    }
    this.fireEvent("update", name);
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.clear = function() {
    var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
    store.remove(this.getStoreKey());
    this.data = null;
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered int\o
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ClientContextMgr</code> object is a singleton providing methods for registration,
 * persistence and management of different session stores linked to the clientcontext.<br>
 * Each store is basically a set of pairs (key,value) and will be used by segmentation (see {@link CQ_Analytics.SegmentMgr})
 * and displayed by clientcontext UI (see {@link CQ_Analytics.ClientContextUI}).
 * @singleton
 * @class CQ_Analytics.ClientContextMgr
 * @extends CQ_Analytics.PersistedSessionStore
 */
if (!CQ_Analytics.ClientContextMgr) {
    CQ_Analytics.ClientContextMgr = function() {
        this.clientcontext = null;
        this.clientcontextToServer = null;
        this.stores = {};
        this.data = null;
        this.config = null;
        this.isConfigLoaded = false;
        this.areStoresLoaded = false;
    };

    CQ_Analytics.ClientContextMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * Store internal key (used by persistence).
     * @final
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.STOREKEY = "CLIENTCONTEXT";

    /**
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.STORENAME = "clientcontext";

    /**
     * Number of milliseconds between the last store gets registered and the event storesinitialize
     * gets fired.
     * @final
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.INITIALIZATION_EVENT_TIMER = 1000;

    /**
     * Location of the config.
     * @static
     * @type String
     */
     CQ_Analytics.ClientContextMgr.prototype.CONFIG_PATH = CQ_Analytics.Utils.externalize("/etc/clientcontext/legacy/config.json",true);

    //inheritDoc
    CQ_Analytics.ClientContextMgr.prototype.init = function() {
        if( !this.initialized) {
            this.clientcontext = {};
            this.clientcontextToServer = {};
        }

        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = store.get(this.getStoreKey());
        if (value) {
            this.data = this.parse(value);
        } else {
            this.data = {};
        }

        this.initialized = true;
        this.fireEvent("initialize",this);

    };

    /**
     * Returns the unique session ID.
     * @return {String} the session ID.
     */
    CQ_Analytics.ClientContextMgr.prototype.getSessionId = function() {
        if (!this.data["sessionId"]) {
            this.setSessionId(CQ_Analytics.Utils.getUID());
        }
        return this.data["sessionId"];
    };

    /**
     * Sets the session ID.
     * @param {String} id the session ID.
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.setSessionId = function(id) {
        if (id) {
            this.setProperty("sessionId", id);
        }
    };

    /**
     * Returns the visitor ID if defined.
     * @return {String} the visitor ID, <code>undefined</code> if not defined.
     */
    CQ_Analytics.ClientContextMgr.prototype.getVisitorId = function() {
        return this.data["visitorId"];
    };

    /**
     * Sets the visitor ID.
     * @param {String} id the visitor ID.
     */
    CQ_Analytics.ClientContextMgr.prototype.setVisitorId = function(id) {
        this.setProperty("visitorId", id);
    };

    /**
     * Returns the current clientcontext ID. Can be either: <ul>
     * <li>visitor ID if defined</li>
     * <li>session unique ID in other case.</li>
     * </ul>
     * If visitor ID is not defined, clientcontext is considered as anonymous.
     * @return {String} the ID.
     */
    CQ_Analytics.ClientContextMgr.prototype.getId = function() {
        var id = this.getVisitorId();
        if (!id) {
            return this.getSessionId();
        }
        return id;
    };

    /**
     * Returns if manager is still defined in anonymous mode (no visitor id defined).
     * @return {Boolean} true if anonymous.
     */
    CQ_Analytics.ClientContextMgr.prototype.isAnonymous = function() {
        var id = this.getVisitorId();
        return (!id);
    };

    /**
     * Returns if mode is defined.
     * @param {Number} mode Mode to check.
     * @return {Boolean} true if mode is defined.
     */
    CQ_Analytics.ClientContextMgr.prototype.isMode = function(mode) {
        return CQ_Analytics.ClientContextMgr.ServerStorage.isMode(mode);
    };

    /**
     * Returns the current clientcontext object. Object can contain the non server persited data.
     * @param {Boolean} toServer true to exclue non server persisted data.
     * @return {Object} object representing the clientcontext.
     */
    CQ_Analytics.ClientContextMgr.prototype.get = function(toServer) {
        if (this.clientcontext == null) {
            this.init();
        }
        if (toServer) {
            return this.clientcontextToServer;
        }
        return this.clientcontext;
    };

    /**
     * Registers a session store. The current ClickstreamcloudManager will handle its own persistence store
     * depending on updates done into the registred session store.
     * @param {CQ_Analytics.SessionStore} sessionstore The session store
     */
    CQ_Analytics.ClientContextMgr.prototype.register = function(sessionstore) {
        if (this.clientcontext == null) {
            this.init();
        }
        var ccm = this;
        
        this.clientcontext[sessionstore.getName()] = sessionstore.getData();
        this.stores[sessionstore.getName()] = sessionstore;
        CQ_Analytics.StoreRegistry.register(sessionstore);

        var config = this.getStoreConfig(sessionstore.getName());
        if (config["stats"] !== false && config["stats"] != "false") {
            this.clientcontextToServer[sessionstore.getName()] = sessionstore.getData(config["excludedFromStats"]);
        }

        if( this.initTimer ) {
            window.clearTimeout(this.initTimer);
            this.initTimer = null;
        }
        
        var timeout = this.isConfigLoaded && typeof this.config['initializationEventTimer'] !== 'undefined' ? 
                this.config['initializationEventTimer'] : this.INITIALIZATION_EVENT_TIMER ;
                
        this.initTimer = window.setTimeout(function() {
            ccm.fireEvent("storesinitialize");
            ccm.areStoresInitialized = true;
        }, timeout);

        //auto update current obj if sessionstore is updated
        sessionstore.addListener("update", function() {
            ccm.update(sessionstore);
        });

        CQ_Analytics.ClientContextMgr.ServerStorage.handleStoreRegistration(sessionstore);

        //clear sessionstore if clientcontext is cleared
        this.addListener("clear", function() {
            sessionstore.clear();
        });

        this.fireEvent("storeregister", sessionstore);
        this.fireEvent("storeupdate", sessionstore);
    };

    /**
     * Updates a session store. The current registred session store with the same name is updated by the given one.
     * @param {CQ_Analytics.SessionStore} sessionstore The session store
     */
    CQ_Analytics.ClientContextMgr.prototype.update = function(sessionstore) {
        if (this.clientcontext == null) {
            this.init();
        }
        this.clientcontext[sessionstore.getName()] = sessionstore.getData();

        var config = this.getStoreConfig(sessionstore.getName());
        if (config["stats"] !== false && config["stats"] != "false") {
            this.clientcontextToServer[sessionstore.getName()] = sessionstore.getData(config["excludedFromStats"]);
        }
        this.fireEvent("storeupdate", sessionstore);
    };

    /**
     * Starts the posting.
     */
    CQ_Analytics.ClientContextMgr.prototype.startPosting = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.startPosting();
    };

    /**
     * Stops the posting.
     */
    CQ_Analytics.ClientContextMgr.prototype.stopPosting = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.stopPosting();
    };

    /**
     * Posts the current clientcontext object to the server (occurs only if posting is started).
     */
    CQ_Analytics.ClientContextMgr.prototype.post = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.post();
    };

    /**
     * Returns the current clientcontext object in "JCR style"
     * o.property = value --> ./property = value
     * o.level1.property = value --> ./level1/property = value
     * 2 levels only
     * @return {Object} object representing the clientcontext in "JCR style"
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.getCCMToJCR = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.getCCMToJCR();
    };

    //inheritDoc
    CQ_Analytics.ClientContextMgr.prototype.getName = function() {
        return this.STORENAME;
    };

    //inheritDoc
    CQ_Analytics.ClientContextMgr.prototype.clear = function() {
        this.clientcontext = null;
        this.clientcontextToServer = null;
        this.fireEvent("clear");
    };

    /**
     * Returns the registered store looked up by name.
     * @param {String} name Name of the store to retrieve
     * @return {CQ_Analytics.SessionStore} The registered store or null.
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.prototype.getRegisteredStore = function(name) {
        return this.stores && this.stores[name] ? this.stores[name] : null;
    };

    /**
     * Loads the config and fires <code>configloaded</code> and <code>storesloaded</code> events.
     */
    CQ_Analytics.ClientContextMgr.prototype.loadConfig = function(c, autoConfig) {
        var setConfig = function(ccm, config) {
            if ( typeof config === "undefined" ) {
                config = {};
            }
            ccm.config = config;

            ccm.isConfigLoaded = true;
            ccm.fireEvent("configloaded");
            ccm.fireEvent("storesloaded");
            ccm.areStoresLoaded = true;
            
        };
        
        if( c ) {
            setConfig(this, c);
        } else {
            if( !autoConfig ) {
                //asynchronous load
                var params = {};
                params["path"] = CQ_Analytics.Utils.getPagePath();
                params["cq_ck"] = new Date().valueOf();
                var url = this.CONFIG_PATH;
                url += "?" + CQ_Analytics.Utils.urlEncode(params);

                CQ_Analytics.Utils.load(url, function(data, status, response) {
                    var config = {};
                    try {
                        config = eval("config = " + response.responseText);
                    } catch(error) {}
                    setConfig(this, config);
                }, this);
            } else {
                setConfig(this, {});
            }
        }
    };

    /**
     * Returns the config object.
     * @return {Object} config object if loaded, null otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getConfig = function() {
        return this.config;
    };

    /**
     * Returns the store config object for the give store name.
     * Shortcut to <code>config["configs"][storename]["store"]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} config object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getStoreConfig = function(storename) {
        if (this.config &&
            this.config["configs"] &&
            this.config["configs"][storename] &&
            this.config["configs"][storename]["store"]) {
            return this.config["configs"][storename]["store"];
        }
        return {};
    };

    /**
     * Returns the edit config object for the give store name.
     * Shortcut to <code>config["configs"][storename]["edit"]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} config object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getEditConfig = function(storename) {
        if (this.config &&
            this.config["configs"] &&
            this.config["configs"][storename] &&
            this.config["configs"][storename]["edit"]) {
            return this.config["configs"][storename]["edit"];
        }
        return {};
    };

    /**
     * Returns the UI config object for the give store name.
     * Shortcut to <code>config["configs"][storename]["ui"]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} config object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getUIConfig = function(storename) {
        if (this.config &&
            this.config["configs"] &&
            this.config["configs"][storename] &&
            this.config["configs"][storename]["ui"]) {
            return this.config["configs"][storename]["ui"];
        }
        return {};
    };

    /**
     * Returns the initial data for the give store name.
     * Shortcut to <code>config["data"][storename]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} data object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getInitialData = function(storename) {
        if (this.config &&
            this.config["data"] &&
            this.config["data"][storename]) {
            return this.config["data"][storename];
        }
        return {};
    };

    /**
     * Returns the registered stores.
     * @return {Object} All registered stores
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.prototype.getStores = function() {
        return this.stores;
    };

    /**
     * Executes the callback when the current ClientContextMgr is ready, i.e. when all stores are loaded.
     * @param {Function} callback Function to execute on ready
     * @param {Object} scope (optional) The execution scope; window object if null
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.prototype.onReady = function(callback, scope) {
        if( callback ) {
            if( this.areStoresLoaded) {
                callback.call(scope);
            } else {
                this.addListener("storesloaded", callback, scope);
            }
        }
    };

    CQ_Analytics.ClientContextMgr = CQ_Analytics.CCM = new CQ_Analytics.ClientContextMgr();

    //backward compatibility
    CQ_Analytics.ClickstreamcloudMgr = CQ_Analytics.CCM;
    //just kept for compatibility with internal name during 5.5 dev
    CQ_Analytics.ContextCloudMgr = CQ_Analytics.CCM;

    //Path to the clientcontext on the server. To be defined in app.
    CQ_Analytics.ClientContextMgr.PATH = null;

    /**
     * Prepends the client context path to the provided url.
     * @param {String} url URL to prepend
     * @return {String} the computed url
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.getClientContextURL = function(url) {
        return CQ_Analytics.ClientContextMgr.PATH + url;
    };

    //inits the CCM store in a different thread.
    window.setTimeout(function() {
        CQ_Analytics.CCM.init();
    }, 1);

    CQ_Analytics.Utils.addListener(window, "unload", function() {
        try {
            for(var p in CQ_Analytics.ClientContextMgr) {
                delete CQ_Analytics.ClientContextMgr[p];
            }
            CQ_Analytics.ClientContextMgr = null;
        } catch(error) {}
        CQ_Analytics.CCM = null;
    });
}
/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2011 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
/**
 * @class CQ_Analytics.ClientContextMgr.ServerStorage
 */
if( CQ_Analytics.ClientContextMgr && ! CQ_Analytics.ClientContextMgr.ServerStorage ) {
    CQ_Analytics.ClientContextMgr.ServerStorage = function() {
        //posting is by default set false: no stats by default. CQ_Analytics.CCM.startPosting() is required.
        this.posting = false;
        this.initialized = false;
    };

    /**
     * @cfg {Number} POST_MODE_PAGELOAD
     * Page load mode constant: POST on every page load.
     * @final
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_PAGELOAD = 0x1;

    /**
     * @cfg {Number} POST_MODE_TIMER
     * Timer mode constant: POST defined by an time interval.
     * @final
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_TIMER = 0x2;

    /**
     * @cfg {Number} POST_MODE_DATAUPDATE
     * Data update mode constant: POST if one session store data is updated.
     * @final
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_DATAUPDATE = 0x4;

    /**
     * @cfg {Number} POST_TIMER
     * Interval in seconds to POST in POST_MODE_TIMER mode (defaults to 600s).
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_TIMER = 600;

    /**
     * @cfg {Number} POST_PROCESS_TIMER
     * Interval in seconds to check if POST is needed in POST_MODE_TIMER mode (defaults to 60s).
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PROCESS_TIMER = 60;

    /**
     * @cfg {Number} POST_MODE
     * The POST mode of the clickstreamcloud. Must be a & value of the following properties:<ul>
     * <li>POST_MODE_PAGELOAD: POST on page load</li>
     * <li>POST_MODE_TIMER: POST on timer interval</li>
     * <li>POST_MODE_DATAUPDATE: POST when one session store data is updated</li>
     * </ul>
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE = 0x6;

    /**
     * @cfg {Number} POST_PATH
     * Beginning of the path used by post.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PATH = "/var/statistics/";

    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.init = function() {
        if (this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER)) {
            var currentObj = this;
            var func = function() {
                currentObj.timer = window.setInterval(function() {
                    try {
                        var lastPost = parseInt(currentObj.data["lastPost"]);
                        var doPost = false;
                        if (isNaN(lastPost)) {
                            doPost = true;
                        } else {
                            var currentTime = new Date().getTime();
                            if (currentTime > lastPost + CQ_Analytics.ClientContextMgr.ServerStorage.POST_TIMER * 1000) {
                                doPost = true;
                            }
                        }
                    } catch(error) {
                    }
                    if (doPost) {
                        currentObj.post();
                    }
                }, CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER * 1000);
            };

            func.call(this);
        }
        this.initialized = true;
    };

    /**
     * Returns if mode is defined.
     * @param {Number} mode Mode to check.
     * @return {Boolean} true if mode is defined.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.isMode = function(mode) {
        return (CQ_Analytics.CCM.POST_MODE & mode) > 0;
    };

    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.handleStoreRegistration = function(sessionstore) {
        if( ! this.initialized ) {
            this.init();
        }
        if (this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE)) {
            sessionstore.addListener("persist", function() {
                //if a store has been persisted, call current persist
                CQ_Analytics.ClientContextMgr.ServerStorage.post(sessionstore);
            });
        }
    };

    /**
     * Starts the posting.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.startPosting = function() {
        this.posting = true;
    };

    /**
     * Stops the posting.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.stopPosting = function() {
        this.posting = false;
    };

    /**
     * Posts the current clientcontext object to the server (occurs only if posting is started).
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.post = function(storeName, forced) {
        if (this.posting || forced) {
            try {
                var obj = this.getCCMToJCR(storeName);
                var currentTime = CQ_Analytics.Utils.getTimestamp();
                obj["./jcr:primaryType"] = "nt:unstructured";
                obj["./sessionId"] = CQ_Analytics.CCM.getSessionId();
                var url = this.POST_PATH + "clientcontext/";
                if (CQ_Analytics.CCM.isAnonymous()) {
                    var sessionSplit = CQ_Analytics.Utils.insert(CQ_Analytics.CCM.getId(), 2, "/");
                    url += "anonymous/" + sessionSplit + "/" + currentTime;
                } else {
                    url += "users/" + CQ_Analytics.CCM.getId() + "/" + currentTime;
                }
                CQ_Analytics.Utils.post(url, null, obj);
                this.lastPost = currentTime;
            } catch(error) {
            }
        }
    };

    /**
     * Returns the current clientcontext object in "JCR style"
     * o.property = value --> ./property = value
     * o.level1.property = value --> ./level1/property = value
     * 2 levels only
     * @return {Object} object representing the clientcontext  in "JCR style"
     * @private
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.getCCMToJCR = function(storeName) {
        var obj = CQ_Analytics.CCM.get(true);

        var resObj = {};
        for (var key in obj) {
            if( !storeName || key == storeName ) {
                var ov = obj[key], k = encodeURIComponent(key);
                var type = typeof ov;
                if (type == 'object') {
                    for (var l2key in ov) {
                        var v = ov[l2key];
                        //trick for tags
                        l2key = l2key.replace(":", "/");
                        resObj[ "./" + key + "/./" + l2key ] = v;
                    }
                } else {
                    resObj[ "./" + key] = ov;
                }
            }
        }

        return resObj;
    };

    CQ_Analytics.ClientContextMgr.ServerStorage = new CQ_Analytics.ClientContextMgr.ServerStorage();
    
    //support backward compatibility
    
    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE_PAGELOAD = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_PAGELOAD;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE_TIMER = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE_DATAUPDATE = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_TIMER = CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_PROCESS_TIMER = CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_PATH = CQ_Analytics.ClientContextMgr.ServerStorage.POST_PATH;
}


/*
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
/**
 * The <code>CQ_Analytics.Percentile</code> object is a singleton providing utility functions
 * for matching users to percentiles.
 * @singleton
 * @class CQ_Analytics.Percentile
 */
CQ_Analytics.Percentile = {};

CQ_Analytics.Percentile.matchesPercentiles = function(percentiles) {
    
    var percentileValue = ClientContext.get("/surferinfo/percentile");
    if ( !percentileValue ) {
        percentileValue = Math.round(Math.random() * 100);
        ClientContext.set("/surferinfo/percentile", percentileValue);
    }
    
    for ( var i = 0 ; i < percentiles.length ; i++ ) {
        var percentile = percentiles[i];
        if ( ( percentile.start <= percentileValue ) && ( percentileValue < percentile.end ) )
            return true;
    }
    
    return false;
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.SegmentMgr</code> object is a singleton providing methods for registration and resolution
 * of different segments.
 * @singleton
 * @class CQ_Analytics.SegmentMgr
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.SegmentMgr) {
    CQ_Analytics.SegmentMgr = function() {
        this.SEGMENTATION_ROOT = "/etc/segmentation";
        this.SEGMENT_SELECTOR = ".segment.js";
        this.SEGMENTATION_SCRIPT_LOADER = "cq-segmentation-loader";

        this.segments = {};
        this.boosts = {};

        var currentObj = this;
        this.fireUpdate = function() {
            currentObj.fireEvent("update");
        };

        this.init();
    };

    CQ_Analytics.SegmentMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.SegmentMgr.prototype.STORENAME = "segments";

    /**
     * Registers a segment.
     * @param {String} segmentPath Path to the segment.
     * @param {String} rule Boolean JS expression defining the segment.
     * @param {Number} boost (Optional) Segment boost (defaults to 0).
     */
    CQ_Analytics.SegmentMgr.prototype.register = function(segmentPath, rule, boost) {
        this.segments[segmentPath] = rule;
        if ( this.rulesCache && this.rulesCache[segmentPath] ) {
            this.rulesCache[segmentPath] = false;
        }
        this.boosts[segmentPath] = !isNaN(boost) ? parseInt(boost) : 0;
        this.fireUpdate();
    };

    /**
     * Resolves an array of segments. Resolution depends on operator:<ul>
     * <li>operator is AND: success if all segments of array resolve.</li>
     * <li>operator is OR: success when finding one segment of array resolving.</li>
     * </ul>
     * @param {String[]} segmentPaths Array of segment paths.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @param {String} operator (Optional) Operator: "OR" / "AND" (defaults to "OR").
     * @return {Boolean/String} True if resolution success, false otherwise. String containing error description
     * if any execption occurs during resolution.
     */
    CQ_Analytics.SegmentMgr.prototype.resolveArray = function(segmentPaths, clientcontext, operator) {
        clientcontext = clientcontext || CQ_Analytics.ClientContextMgr.get();

        if (!(segmentPaths instanceof Array)) {
            return this.resolve(segmentPaths, clientcontext);
        }

        operator = ( operator == "AND" ? "AND" : "OR");

        var finalRes = ( operator == "AND");
        for (var i = 0; i < segmentPaths.length; i++) {
            var s = segmentPaths[i];
            var res = this.resolve(s, clientcontext);
            if (operator == "AND") {
                if (res !== true) return res;
            } else {
                if (res === true) return true;
            }
        }
        return finalRes;
    };

    /**
     * Resolves a segment. Tries to eval the rule of the segment the given clientcontext object.
     * @param {String} segmentPath Segment path.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @return {Boolean/String} True if resolution success, false otherwise. String containing error description
     * if any execption occurs during resolution.
     */
    CQ_Analytics.SegmentMgr.prototype.resolve = function(segmentPath, clientcontext) {
        clientcontext = clientcontext || CQ_Analytics.ClientContextMgr.get();

        // argument check
        if (!segmentPath) return false;

        // support arrays -> looping and aggregation handled over in resolveArray()
        if (segmentPath instanceof Array) return this.resolveArray(segmentPath, clientcontext);

        // only support segments under /etc/segmentation
        if (segmentPath.indexOf(this.SEGMENTATION_ROOT) != 0) return false;

        // the root segment always matches
        if (segmentPath == this.SEGMENTATION_ROOT) return true;

        // match if there is NO rule registered for this segment
        if (!this.segments[segmentPath]) return true;

        //first resolve parents
        var parent = segmentPath.substring(0, segmentPath.lastIndexOf("/"));
        if (parent.indexOf(this.SEGMENTATION_ROOT) == 0) {
            var pres = this.resolve(parent, clientcontext);
            if (pres !== true) return pres;
        }

        //keep old names for backward compatibility
        var rules = "function(clientcontext, contextcloud, clickstreamcloud) { return true ";
        rules += " && ( " + this.segments[segmentPath] + " ) ";
        rules += ";}";

        var res = true;
        try {
            var f = null;
            this.rulesCache = this.rulesCache || {};
            if ( this.rulesCache[segmentPath] ) {
                f = this.rulesCache[segmentPath];
            } else {
                eval("f = " + rules + "");
                this.rulesCache[segmentPath] = f;
            }
            var e = (f == null || f(clientcontext,clientcontext,clientcontext));
            res = res && (e === true);
        } catch(error) {
            return "Unresolved - Error while evaluating segment " + segmentPath + " : " + error.message;
        }
        return res;
    };

    /**
     * Returns all resolving segments for the given clientcontext.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @return {String[]} Array of resolving segments.
     */
    CQ_Analytics.SegmentMgr.prototype.getResolved = function(clientcontext) {
        clientcontext = clientcontext || CQ_Analytics.ClientContextMgr.get();
        var res = new Array();
        for (var path in this.segments) {
            if (this.resolve(path, clientcontext) === true) {
                res.push(path);
            }
        }
        return res;
    };

    /**
     * Returns the max boost of an array of segments. Segment must resolve the given clientcontext.
     * @param {String[]} segmentPaths Array of segment paths.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @return {Number} The max boost of the resolving segments.
     */

    CQ_Analytics.SegmentMgr.prototype.getMaxBoost = function(segmentPaths, clientcontext) {
        if (!(segmentPaths instanceof Array)) {
            return this.getBoost(segmentPaths);
        }
        var boost = 0;
        for (var i = 0; i < segmentPaths.length; i++) {
            var s = segmentPaths[i];
            if (this.resolve(s, clientcontext) === true) {
                var b = this.boosts[s] || 0;
                if (b > boost) {
                    boost = b;
                }
            }
        }
        return boost;
    };

    /**
     * Returns the boost of a segment.
     * @param {Array} segmentPath Path of the segment
     * @return {Number} Boost of the segment.
     */
    CQ_Analytics.SegmentMgr.prototype.getBoost = function(segmentPath) {
        if (!(segmentPath instanceof Array)) {
            segmentPath = [segmentPath];
        }
        return this.boosts[segmentPath] || 0;
    };

    /**
     * Reloads the given segment.
     * @param {String} path Path to the segment.
     */
    CQ_Analytics.SegmentMgr.prototype.reload = function(path) {
        var url = path;
        if( !url ) {
            url = this.SEGMENTATION_ROOT;
        }

        if(url) {
            if(url.indexOf(this.SEGMENT_SELECTOR) == -1) url += this.SEGMENT_SELECTOR;
            try {
                CQ_Analytics.Utils.load(url,function(config, status, response) {
                    if(response && response.responseText) {
                        eval(response.responseText);
                    }
                },this);
                var response = CQ.HTTP.get(scripts[i].src);
            } catch(err) {}
        }
    };

    CQ_Analytics.SegmentMgr.prototype.getSessionStore = function() {
        return this;
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getProperty = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getLink = function(name) {
        return name + ".html";
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getLabel = function(name) {
        if (name) {
            var label = name;
            var index = label.lastIndexOf("/");
            if (index != -1) {
                label = label.substring(index + 1, label.length);
            }
            var res = this.resolve(name);
            if (res === true) {
                return label;
            } else {
                if (res !== true) {
                    return "<span class=\"invalid\" title=\"" + res + "\" alt=\"" + res + "\">" + label + "</span>";
                }
            }
        }
        return name;
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getPropertyNames = function() {
        return this.getResolved();
    };

    CQ_Analytics.SegmentMgr = new CQ_Analytics.SegmentMgr();

    /**
     * Loads the segments at URL: path + ".segment.js".
     * Fires "segmentsload" event.
     * @param {String} path Path from where segments are loaded
     * @static
     * @since 5.5
     */
    CQ_Analytics.SegmentMgr.loadSegments = function(path) {
        CQ_Analytics.SegmentMgr.areSegmentsLoaded = false;
        //jquery will do the eval
        CQ.shared.HTTP.get(CQ.shared.HTTP.externalize(path + ".segment.js"));
        CQ_Analytics.SegmentMgr.areSegmentsLoaded = true;
        this.fireEvent("segmentsload");
    };

    /**
     * Renders the current segments found in the SegmentMgr store. Rendering is appended to the provided
     * target id.
     * @param {CQ_Analytics.SessionStore} store The SegmentMgr store
     * @param {String} targetId The target id
     * @static
     * @since 5.5
     */
    CQ_Analytics.SegmentMgr.renderer = function(store, targetId) {
        if( store && store.STORENAME == CQ_Analytics.SegmentMgr.STORENAME ) {
            var props = store.getPropertyNames();
            var elements=[];
            elements.push("<div>");
            for(var i = 0; i < props.length; i++) {
                var name = props[i];
                elements.push("<span title=\""+store.getProperty(name)+"\" >"
                          + "<a href=\""+CQ.shared.HTTP.externalize(store.getLink(name))+"\" "
                          + " title=\""+store.getProperty(name)+"\" >"
                          + store.getLabel(name)
                          + "</a>"
                          + "</span>");
            }
            elements.push("</div>");
            $CQ("#" + targetId).children().remove();
            $CQ("#" + targetId).append(elements.join(""));
        }
    };

    CQ_Analytics.ClientContextMgr.addListener("storeupdate", CQ_Analytics.SegmentMgr.fireUpdate);

    CQ_Analytics.Utils.addListener(window, "unload", function() {
        try {
            for(var p in CQ_Analytics.SegmentMgr) {
                delete CQ_Analytics.SegmentMgr[p];
            }
        } catch(error) {}
        CQ_Analytics.SegmentMgr = null;
    });
}

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.StrategyMgr</code> object is a singleton managing registration of different selection
 * strategies and selection of teasers
 * @class CQ_Analytics.StrategyMgr
 * @singleton
 */
if (!CQ_Analytics.StrategyMgr) {
    CQ_Analytics.StrategyMgr = function() {
        this.strategies = {};
    };

    CQ_Analytics.StrategyMgr.prototype = {};

    /**
     * Returns if a strategy is registered or not.
     * @param {String} strategy Strategy name
     * @return {Boolean} true if strategy registred. False otherwise.
     */
    CQ_Analytics.StrategyMgr.prototype.isRegistered = function(strategy) {
        return !!this.strategies[strategy];
    };

    /**
     * Registers a selection strategy. Selection function must return true or false,
     * and has one Array parameter: list of all teasers.
     * @param {String} strategy Strategy name
     * @param {Function} func Selection function
     */
    CQ_Analytics.StrategyMgr.prototype.register = function(strategy, func) {
        if (typeof func == 'function') {
            this.strategies[strategy] = func;
        }
    };

    /**
     * Chooses one teaser if the teasers list depending on the specified strategy.
     * @param {String} strategy Strategy name
     * @param {Array} teasers List of teasers
     * @return {Object} The selected teaser
     */
    CQ_Analytics.StrategyMgr.prototype.choose = function(strategy, teasers) {
        //no need to apply a strategy to choose in a list of one item!
        if (teasers.length == 1) return teasers[0];

        if (this.strategies[strategy]) {
            return this.strategies[strategy].call(this, teasers);
        }

        return null;
    };

    CQ_Analytics.StrategyMgr = new CQ_Analytics.StrategyMgr();
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which selects a teaser depending on the current surfer clickstream score
CQ_Analytics.StrategyMgr.register("clickstream-score", function(teasers) {
    //no need to apply a complex logic choose one item in a set of one!
    if( teasers.length == 1) {
        return teasers[0];
    }

    var selectedTeasers = [];
    if( CQ_Analytics.TagCloudMgr ){
        var tags = CQ_Analytics.TagCloudMgr.getTags();
        tags = tags || {};
        var selectedTeasersWeight =  -1;
        for(var i = 0;i < teasers.length; i++) {
            var currentTeaserWeight = 0;
            var teaserTags = teasers[i].tags;
            if( teaserTags ) {
                for(var j = 0;j<teaserTags.length; j++) {
                    var tagID = teaserTags[j].tagID;
                    currentTeaserWeight += parseInt(tags[tagID]) || 0;
                }
            }

            if( currentTeaserWeight == selectedTeasersWeight) {
                selectedTeasers.push(teasers[i]);
            } else {
                if( currentTeaserWeight > selectedTeasersWeight) {
                    //new max weight, clear list, add current teaser and change max weight
                    selectedTeasers = [];
                    selectedTeasers.push(teasers[i]);
                    selectedTeasersWeight = currentTeaserWeight;
                }
            }
        }
    } else {
        //fallback: random
        selectedTeasers = teasers;
    }

    if( selectedTeasers.length == 1) {
        return selectedTeasers[0];
    }

    //at this point 2 cases:
    // - no tagcloud manager, selected teasers are all resolved teasers
    // - can have several teasers with same max weight

    // ==> random choose
    var random = null;
    if( CQ_Analytics.PageDataMgr ) {
        random = CQ_Analytics.PageDataMgr.getProperty("random");
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom;
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom = Math.random();
    }

    if( parseFloat(random) > 1) {
        random = 1 / random;
    }

    if( parseFloat(random) == 1) {
        random = 0;
    }
    var ranNum = Math.floor(random*selectedTeasers.length);
    return selectedTeasers[ranNum];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which selects the first teaser
CQ_Analytics.StrategyMgr.register("first", function(teasers) {
    return teasers[0];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which random selects a teaser
CQ_Analytics.StrategyMgr.register("random", function(teasers) {
    var random = null;
    if( CQ_Analytics.PageDataMgr ) {
        random = CQ_Analytics.PageDataMgr.getProperty("random");
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom;
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom = Math.random();
    }

    if( parseFloat(random) > 1) {
        random = 1 / random;
    }

    if( parseFloat(random) == 1) {
        random = 0;
    }

    var ranNum = Math.floor(random*teasers.length);
    return teasers[ranNum];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.PageDataMgr</code> object is a store providing page data information.
 * @class CQ_Analytics.PageDataMgr
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.PageDataMgr) {
    CQ_Analytics.PageDataMgr = function() {};

    CQ_Analytics.PageDataMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.PageDataMgr.prototype.STORENAME = "pagedata";
    
    /**
     * internal name for the setExperience etc cookie.
     * @final
     * @private
     */
    CQ_Analytics.PageDataMgr.prototype.FORCE_EXPERIENCE_COOKIE = "cq-forceexperience";

    //inheritDoc
    CQ_Analytics.PageDataMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.PageDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.PageDataMgr.prototype.getLink = function(name) {
        return "";
    };

    
    /**
     * Sets a cookie that forces the display of a specific teaser page in a
     * teaser when loading the next page.
     * @param {String} path Path to the teaserpage to show.
     */
    CQ_Analytics.PageDataMgr.prototype.setExperience = function(path) {
        CQ.shared.HTTP.setCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE, path, "/");
    };
    
    /**
     * Retrieves the content of the force experience cookie. See {@link #setExperience}.
     * If no cookie is set null or "" is returned.
     * @return {Object}
     */
    CQ_Analytics.PageDataMgr.prototype.getExperience = function() {
        return CQ.shared.HTTP.getCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE, "/");
    };
    
    /**
     * Removes the force experience cookie. See {@link #setExperience}.
     */
    CQ_Analytics.PageDataMgr.prototype.clearExperience = function() {
        CQ.shared.HTTP.clearCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE, "/");
    };
    
    CQ_Analytics.PageDataMgr = new CQ_Analytics.PageDataMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
        this.init();

        //registers Page Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);

    }, CQ_Analytics.PageDataMgr);
}

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>BrowserInfoInstance</code> object is a singleton providing utility methods to retrieve client browser information.
 * @class CQ_Analytics.BrowserInfoInstance
 * @singleton
 */
CQ_Analytics.BrowserInfo = function() {
    var ua = navigator.userAgent.toLowerCase();
    var check = function(r) {
        return r.test(ua);
    };

    var getBrowser = function() {
        if (check(/opera/)) {
            return {
                browserFamily: "Opera",
                browserVersion: ""
            };
        }

        if (check(/chrome/)) {
            return {
                browserFamily: "Chrome",
                browserVersion: ""
            };
        }

        if (check(/safari/)) {
            if (check(/applewebkit\/4/)) { // unique to Safari 2
                return {
                    browserFamily: "Safari",
                    browserVersion: "2"
                };
            }

            if (check(/version\/3/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "3"
                };
            }

            if (check(/version\/4/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "4"
                };
            }

            if (check(/version\/5/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "5"
                };
            }

            if (check(/version\/6/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "6"
                };
            }

            return {
                browserFamily: "Safari",
                browserVersion: "7 or higher"
            };
        }

        if (check(/webkit/)) {
            return {
                browserFamily: "WebKit",
                browserVersion: ""
            };
        }

        if (check(/msie/)) {
            if (check(/msie 6/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "6"
                };
            }

            if (check(/msie 7/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "7"
                };
            }

            if (check(/msie 8/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "8"
                };
            }

            if (check(/msie 9/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "9"
                };
            }

            if (check(/msie 10/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "10"
                };
            }

            return {
                browserFamily: "IE",
                browserVersion: "11 or higher"
            };
        }

        if (check(/gecko/)) {
            if (check(/rv:1\.8/)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "2"
                };
            }

            if (check(/rv:1\.9/)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "3"
                };
            }

            if (check(/rv:2.0/)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "4"
                };
            }

            if (check(/rv:5./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "5"
                };
            }

            if (check(/rv:6./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "6"
                };
            }

            if (check(/rv:7./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "7"
                };
            }

            if (check(/rv:8./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "8"
                };
            }

            if (check(/rv:9./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "9"
                };
            }

            return {
                browserFamily: "Firefox",
                browserVersion: "10 or higher"
            };
        }

        var isAir = check(/adobeair/);
        if (isAir) {
            return {
                browserFamily: "Adobe AIR",
                browserVersion: ""
            };
        }

        return {
            browserFamily: "Unresolved",
            browserVersion: "Unresolved"
        };
    };

    var getOS = function() {
        if (check(/windows 98|win98/)) {
            return "Windows 98";
        }

        if (check(/windows nt 5.0|windows 2000/)) {
            return "Windows 2000";
        }

        if (check(/windows nt 5.1|windows xp/)) {
            return "Windows XP";
        }

        if (check(/windows nt 5.2/)) {
            return "Windows Server 2003";
        }

        if (check(/windows nt 6.0/)) {
            return "Windows Vista";
        }

        if (check(/windows nt 6.1/)) {
            return "Windows 7";
        }

        if (check(/windows nt 4.0|winnt4.0|winnt/)) {
            return "Windows NT 4.0";
        }

        if (check(/windows me/)) {
            return "Windows ME";
        }

        if (check(/mac os x/)) {
            if (check(/ipad/) || check(/iphone/)) {
                return "iOS";
            }
            return "Mac OS X";
        }

        if (check(/macintosh|mac os/)) {
            return "Mac OS";
        }

        if (check(/android/)) {
            return "Android";
        }

        if (check(/linux/)) {
            return "Linux";
        }

        return "Unresolved";
    };

    var getDeviceType = function() {
        if (check(/ipad/)) {
            return "iPad";
        }

        if (check(/iphone/)) {
            return "iPhone";
        }

        if (check(/mobi/)) {
            return "Mobile";
        }

        return "Desktop";
    };

    var b = getBrowser.call();
    this.browserFamily = b.browserFamily;
    this.browserVersion = b.browserVersion;

    this.OSName = getOS.call();
    this.deviceType = getDeviceType.call();
    this.ua = ua;

    //protocol
    var isSecure = /^https/i.test(window.location.protocol);

    //resolution
    this.screenResolution = screen.width + "x" + screen.height;
};

CQ_Analytics.BrowserInfo.prototype = {
    /**
     * Returns the browser name.
     * @return {String} Browser name.
     */
    getBrowserName: function() {
        return this.browserFamily + " " + this.browserVersion;
    },

    /**
     * Returns the browser family.
     * @return {String} Browser family.
     */
    getBrowserFamily: function() {
        return this.browserFamily;
    },

    /**
     * Returns the browser version.
     * @return {String} Browser version.
     */
    getBrowserVersion: function() {
        return this.browserVersion;
    },

    /**
     * Returns the operating system name.
     * @return {String} OS name.
     */
    getOSName: function() {
        return this.OSName;
    },

    /**
     * Returns the screen resolution.
     * @return {String} Screen resolution.
     */
    getScreenResolution: function() {
        return this.screenResolution;
    },

    /**
     * Returns the device type.
     * @return {String} Device type.
     */
    getDeviceType: function() {
        return this.deviceType;
    },

    /**
     * Returns the user agent.
     * @return {String} User agent.
     */
    getUserAgent: function() {
        return this.ua;
    },

    /**
     * Returns if the device is a mobile device.
     * @return {Boolean} <code>true</code> if the device is a mobile device.
     */
    isMobile: function(deviceType) {
        if (!deviceType) {
            deviceType = this.getDeviceType();
        }
        deviceType = deviceType ? deviceType.toLowerCase() : "desktop";
        return deviceType != "desktop";
    },

    /**
     * Returns if the browser is Internet Explorer.
     * @return {Boolean}.
     */
    isIE: function(version) {
        return this.getBrowserFamily() == "IE" &&
            (version ? this.getBrowserVersion() == version : true);
    },

    /**
     * Returns if the browser is Internet Explorer 6.
     * @return {Boolean}.
     */
    isIE6: function() {
        return this.isIE("6");
    },

    /**
     * Returns if the browser is Internet Explorer 7.
     * @return {Boolean}.
     */
    isIE7: function() {
        return this.isIE("7");
    },

    /**
     * Returns if the browser is Internet Explorer 8.
     * @return {Boolean}.
     */
    isIE8: function() {
        return this.isIE("8");
    },

    /**
     * Returns if the browser is Internet Explorer 9.
     * @return {Boolean}.
     */
    isIE9: function() {
        return this.isIE("9");
    }
};

CQ_Analytics.BrowserInfoInstance = new CQ_Analytics.BrowserInfo();
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.MousePositionMgr</code> object is a singleton providing utility methods to retrieve
 * te current mouse position.
 * @class CQ_Analytics.MousePositionMgr
 * @singleton
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.MousePositionMgr) {
    CQ_Analytics.MousePositionMgr = function() {
        this.position = {
            "x": 0,
            "y": 0
        };

        this.getPageX = function(ev) {
            var x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;
            }
            return x;
        };

        this.getPageY = function(ev) {
            var y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;
            }
            return y;
        };

        var currentObj = this;

        this.timer = null;

        $CQ(document).bind("mousemove", function(event, a, b, c) {
            var e = event || window.event;
            if (e) {
                //update coordinates only every 500ms.
                if (!currentObj.timer) {
                    var x = currentObj.getPageX(e);
                    var y = currentObj.getPageY(e);
                    currentObj.timer = setTimeout(function() {
                        currentObj.setPosition(x, y);
                        currentObj.timer = null;
                    }, 500);
                }
            }
        });

        this.init();
    };

    CQ_Analytics.MousePositionMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.MousePositionMgr.prototype.STORENAME = "mouseposition";

    /**
     * Sets the current mouse position.
     * @param {Number} x X mouse position
     * @param {Number} y Y mouse position
     * @private
     */
    CQ_Analytics.MousePositionMgr.prototype.setPosition = function(x, y) {
        this.position["x"] = x;
        this.position["y"] = y;
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getProperty = function(name) {
        return this.position[name];
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getLink = function(name) {
        return "";
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getPropertyNames = function() {
        var res = new Array();
        for (var p in this.position) {
            res.push(p);
        }
        return res;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getSessionStore = function() {
        return this;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getData = function(excluded) {
        return this.position;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.clear = function() {
        this.position = {};
    };

    CQ_Analytics.MousePositionMgr = new CQ_Analytics.MousePositionMgr();
    CQ_Analytics.CCM.register(CQ_Analytics.MousePositionMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.EventDataMgr</code> object is a store providing page data information.
 * @class CQ_Analytics.EventDataMgr
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.EventDataMgr) {
    CQ_Analytics.EventDataMgr = function() {};

    CQ_Analytics.EventDataMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.EventDataMgr.prototype.STORENAME = "eventdata";

    //inheritDoc
    CQ_Analytics.EventDataMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.initialized = true;
        this.fireEvent("initialize",this);

        if (typeof(this.initProperty) != 'undefined') {
            this.fireEvent("update");
        }
    };

    //inheritDoc
    CQ_Analytics.EventDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.EventDataMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.EventDataMgr = new CQ_Analytics.EventDataMgr();

    /* initialization and registration */
    CQ_Analytics.EventDataMgr.init();
    CQ_Analytics.CCM.register(CQ_Analytics.EventDataMgr);
}
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @deprecated
 */
if (!window.CQ_Context) {
    window.CQ_Context = function() {};
    window.CQ_Context.prototype = new CQ_Analytics.Observable();

    window.CQ_Context.prototype.getProfile = function() {
        return (function() {
            return {
                /**
                 *
                 */
                getUserId: function() {
                    return this.getProperty("authorizableId");
                },

                /**
                 *
                 */
                getDisplayName: function() {
                    var fn = this.getProperty("formattedName");
                    if( fn ) return fn;

                    fn = this.getProperty("displayName");
                    if( fn ) return fn;

                    //fallback
                    return this.getUserId();
                },

                /**
                 *
                 */
                getFirstname: function() {
                    return this.getProperty("givenName");
                },

                /**
                 *
                 */
                getLastname: function() {
                    return this.getProperty("familyName");
                },

                /**
                 *
                 */
                getEmail: function() {
                    return this.getProperty("email");
                },

                /**
                 *
                 * @param {String} name
                 */
                getProperty: function(name) {
                    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        return CQ_Analytics.ProfileDataMgr.getProperty(name);
                    }
                    return "";
                },

                /**
                 *
                 */
                getProperties: function() {
                    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        return CQ_Analytics.ProfileDataMgr.getData();
                    }
                    return {};
                },

                /**
                 *
                 */
                getAvatar: function() {
                    return this.getProperty("avatar");
                },

                /**
                 *
                 * @param {Function} fct
                 * @param {Object} scope
                 */
                onUpdate: function(fct, scope) {
                    if (fct && CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        CQ_Analytics.ProfileDataMgr.addListener("update",fct,scope || this);
                    }
                }
            }
        })();
    };

    window.CQ_Context = new window.CQ_Context();
}


/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2013 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

CQ_Analytics.Engine = function() {

    window.CQ_trackTeasersStats = true;

    function isEditMode() {
        // ensure boolean return value
        return !!( window.CQ && CQ.WCM && CQ.WCM.isEditMode() );
    }

    function isPreviewMode() {
        return !!(window.CQ && CQ.WCM && CQ.WCM.isPreviewMode())
    }

    /**
     * Returns a jQuery promise for an editable given its path.
     * During page load, editables might not be available right away, or it is
     * known that this editable will be created and one wants to listen for it.
     * This promise will resolve when the editable is present, with the editable
     * as argument.
     *
     * @param path the editable path
     * @returns {*} jQuery promise object - use promise.done(function(editable) {...}) to handle it
     */
    function getEditablePromise(path) {
        var deferred = $CQ.Deferred();
        var editable = CQ.WCM.getEditable(path);
        if (editable) {
            // already available, can resolve right away
            deferred.resolve(editable);
        } else {
            // not ready yet, extjs still loading, need to hook into editableready event
            CQ.WCM.onEditableReady(path, function(editable) {
                deferred.resolve(editable);
            });
        }
        return deferred.promise();
    }

    function initTracking(teaser, trackingURL) {
        if (!CQ_Analytics.loadedTeasersStack) {
            // store in loadedTeasersStack the list of teasers shown in the page.
            CQ_Analytics.loadedTeasersStack = [];
            // on window unload, post
            $CQ(window).unload(function() {
                try {
                    var loadedTeasers = CQ_Analytics.loadedTeasersStack;
                    if (loadedTeasers) {
                        delete CQ_Analytics.loadedTeasersStack;
                        //build the URL : trackingURL + paths
                        var url = trackingURL;
                        for (var i=0; i < loadedTeasers.length; i++) {
                            url = CQ.shared.HTTP.addParameter(url, "path", loadedTeasers[i]);
                        }
                        //run get in asynch mode.
                        CQ.shared.HTTP.get(url, function() {});
                    }
                } catch(error) {}
            });
        }
        CQ_Analytics.loadedTeasersStack.push(teaser.path);
    }

    /**
     * Gives an HTML text describing how selection was done based on the decisionInfo etc.
     */
    function buildDecisionHTML(decisionInfo, winnerPath, strategy) {
        var html = "", text;

        function getHTML(text, url, thumbnail, match) {
            return '<a href="' + url + '" class="cq-teaser-segment-link">' +
                       '<img src="' + thumbnail + '" class="cq-teaser-decision-thumbnail ' + (match ? 'cq-teaser-decision-match' : 'cq-teaser-decision-nomatch') + '">' +
                   '</a>' + text + '<br>';
        }

        for (var i = 0; i < decisionInfo.length; i++) {
            var info = decisionInfo[i];

            var path = CQ.shared.HTTP.externalize(info.teaser.path + ".html");

            if (info.hasOwnProperty("boost")) {
                // match
                if (info.noSegment) {
                    text = CQ.I18n.getMessage("Experience: {0} - match (no segments, boost = {1})", [info.teaser.title, info.boost]);
                } else {
                    text = CQ.I18n.getMessage("Experience: {0} - match (boost = {1})", [info.teaser.title, info.boost]);
                }
                var item = getHTML(text, path, info.teaser.thumbnail, true);
                if (winnerPath === info.teaser.path) {
                    html += "<b>" + item + "</b>";
                } else {
                    html += item;
                }
            } else {
                // no match
                if (info.unknownSegment) {
                    text = CQ.I18n.getMessage("Experience: {0} - no match (unknown segment)", [info.teaser.title]);
                } else {
                    text = CQ.I18n.getMessage("Experience: {0} - no match", [info.teaser.title]);
                }
                html += getHTML(text, path, info.teaser.thumbnail, false);
            }
        }

        html += "<br>";

        if (strategy) {
            html += CQ.I18n.getMessage("Strategy <b>{0}</b> selected current teaser.", strategy );
        } else {
            html += CQ.I18n.getMessage("No strategy configured, used the first match.");
        }

        html += "<br>";

        return html;
    }

    /**
     * Sets up the tooltip explaining the teaser selection.
     */
    function setDecisionTooltip(editablePromise, decisionInfo, winnerPath, strategy) {
        editablePromise.done(function(editable) {
            if ( editable.teaserToolTip ) {
                editable.teaserToolTip.hide();
                editable.teaserToolTip.remove();
            }

            editable.teaserToolTip = new CQ.Ext.Tip({
                "html": buildDecisionHTML(decisionInfo, winnerPath, strategy),
                "title": CQ.I18n.getMessage("Selection decision"),
                "width": 450,
                "autoHide": false,
                "closable": true,
                "height": 300,
                "floating": true,
                "autoHeight": false,
                "bodyStyle": "overflow-y: scroll;"
            });

            editable.on(CQ.wcm.EditRollover.EVENT_SHOW_HIGHTLIGHT, function(highlight) {
                if ( !this.teaserInfoButton ) {
                    this.teaserInfoButton = CQ.Ext.DomHelper.append('CQ',{
                        tag: 'div',
                        cls: 'x-tool x-tool-help cq-teaser-tooltip-tool'
                    }, true);
                    this.teaserInfoButton.position("absolute");
                    this.teaserInfoButton.on("click", function() {
                        var pos = this.getXY();
                        editable.teaserToolTip.setPosition(pos[0] - 460, pos[1] - 100);
                        editable.teaserToolTip.show();
                    });
                }
                this.teaserInfoButton.anchorTo(
                    highlight.frameBottom.getEl(),
                    "tr",
                    [-26, -15]);
                this.teaserInfoButton.show();
            });

            editable.on(CQ.wcm.EditRollover.EVENT_HIDE_HIGHTLIGHT, function(highlight) {
                if (this.teaserInfoButton) {
                    this.teaserInfoButton.hide();
                }
            });
        });
    }

    /**
     * Removes the tooltip explaining the teaser selection.
     */
    function removeDecisionTooltip(editablePromise) {
        editablePromise.done(function(editable) {
            if ( editable.teaserToolTip ) {
                editable.teaserToolTip.hide();
                editable.teaserToolTip.remove();
                editable.teaserToolTip = null;
            }
        });
    }

    function resolveTeaserCandidates(teasers, decisionInfo) {
        var candidates = [];
        var lastBoost = 0;

        for (var i = 0; i < teasers.length; i++) {
            var teaser = teasers[i],
                segments = teaser.segments;

            var info;
            if (decisionInfo) {
                info = {
                    teaser: teaser
                };
                decisionInfo.push(info);
            }

            // teaser becomes a candidate if:
            // - it does not specify a segment (= applies to everyone)
            // - its segments can be resolved (= are currently active)
            // - at least one of its segments has the highest boost overall
            var match = !segments || segments.length === 0;

            if (match && info) {
                info.noSegment = true;
            }

            // check if segment(s) evaluate
            if (!match && CQ_Analytics.SegmentMgr.resolve(segments)) {
                match = true;
                // HACK: to avoid changing SegmentMgr.resolve()
                // if segment is unkown (= outside configured segmentPath), SegmentMgr currently
                // sees it as a match, but we don't want this here, it's very confusing, because
                // this gives a lot of false matches
                if (segments && segments.length > 0) {
                    if (!CQ_Analytics.SegmentMgr.segments[segments[0]]) {
                        match = false;
                        if (info) {
                            info.unknownSegment = true;
                        }
                    }
                }
            }

            if (match) {
                // handle boost
                var boost = CQ_Analytics.SegmentMgr.getMaxBoost(segments);

                if (info) {
                    info.boost = boost;
                }

                if (boost === lastBoost) {
                    // same boost, add to list
                    candidates.push(teaser);
                } else {
                    if (boost > lastBoost) {
                        // better boost, clear list and keep only this one
                        candidates = [];
                        candidates.push(teaser);
                        lastBoost = boost;
                    }
                }
            }

        }
        return candidates;
    }

    // stores functions by editable path
    var teaserListeners = {};

    function trackTeaserLoader(editablePath, fn) {
        // first make make sure an existing one is gone (precautious)
        CQ_Analytics.Engine.stopTeaserLoader(editablePath);

        teaserListeners[editablePath] = fn;
    }

    /**
     * Small utility function that checks the equality between two arrays
     * @param arr1
     * @param arr2
     */
    function arrayEquals(arr1, arr2) {
        if (!arr1 || !arr2) {
            return false;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        // sort the arrays first
        arr1.sort();
        arr2.sort();
        for (var idx = 0; idx < arr1.length; idx++) {
            if (arr1[idx] !== arr2[idx]) {
                return false;
            }
        }
        return true;
    }

    var teasersCache = {};

    return {

        /**
         * Stops the teaser loader for the given editable (or editable path) to run
         * (it runs continuously when client context simulation is active).
         * @param editable editable object or path
         */
        stopTeaserLoader: function(editable) {
            var editablePath = editable.path || editable;

            if (!editablePath) {
                return;
            }
            var listener = teaserListeners[editablePath];
            if (listener) {
                CQ_Analytics.SegmentMgr.removeListener("update", listener);
                delete teaserListeners[editablePath];
            }
        },

        /**
         * Resolves a teaser to display.
         * @param {Array} teasers all teaser candidates
         * @param {String} strategy name of a strategy (optional)
         * @param {Array} decisionInfo empty array that will be filled with the list of teaser candidates and their evaluated boost (optional)
         * @returns {Object} the resolved teaser or null
         */
        resolveTeaser: function(teasers, strategy, decisionInfo) {
            // select the candidates based on the segments and boost
            var candidates = resolveTeaserCandidates(teasers, decisionInfo);
            if (candidates.length === 0) {
                return null;
            }
            // let strategy find the final teaser or fall back to first
            return CQ_Analytics.StrategyMgr.choose(strategy, candidates) || candidates[0];
        },

        /**
         * Initializes the teaser loader for a given element. Selects a teaser from a list
         * (dependending on the given strategy) and will to load choosen teaser content into a DOM element.
         * Also allows for overriding the automatic teaser selection for simulation purposes.
         *
         * @param {Object} options map of options
         * @param {String} options.targetID       ID of DOM element on which to insert choosen teaser
         * @param {Array}  options.teasers        Complete list of available teasers
         * @param {String} [options.strategy]     Name of the selection strategy (must be availabe in CQ_Analytics.StrategyManager)
         * @param {String} [options.trackingURL]  URL of the tracking service for teaser impressions (if window.CQ_trackTeasersStats)
         */
        loadTeaser: function(options) {
            // in wcm authoring mode, we need to get our editable
            var editable, editablePath;
            if (isEditMode()) {
                editablePath = CQ.WCM.getEditablePathFromDOM(document.getElementById(options.targetID));
                editable = getEditablePromise(editablePath);
            }

            var campaignStore = ClientContext.get("campaign");
            if (campaignStore && campaignStore.isCampaignSelected() && !isPreviewMode) {
                return;
            }

            var toExecute = function() {
                // Simulation: Override the normal teaser display if
                // the PageDataMgr has an experience set.
                var forceExp = CQ_Analytics.PageDataMgr.getExperience();
                if (forceExp) {
                    CQ_Analytics.PageDataMgr.clearExperience();
                    var TEASER_SUFFIX = "/_jcr_content/par.html";
                    if ( isEditMode() ) {
                        TEASER_SUFFIX += "?wcmmode=disabled";
                    }
                    CQ_Analytics.Utils.loadElement(forceExp + TEASER_SUFFIX, options.targetID);
                    return;
                }

                var currentTeaser = null;

                // function which chooses and loads a teaser.
                var loadTeasers = function() {
                    var decisionInfo = null;
                    if (isEditMode()) {
                        decisionInfo = [];
                    }
                    var campaignStore = ClientContext.get("campaign"),
                        teaserToShow;

                    if (campaignStore && campaignStore.isCampaignSelected()) {
                        // make the target component react to the changes in campaign store: CQ-10513
                        // determine the current segments based on selected experience
                        var campaignPath = campaignStore.data["path"],
                            experience = campaignStore.data["recipe/path"],
                            campaignList = campaignStore.data["campaigns"],
                            currentSegments = {},
                            teasers = options.teasers,
                            defaultTeaser;

                        for (var i = 0; i < teasers.length; i++) {
                            if (teasers[i].name === "default") {
                                defaultTeaser = teasers[i];
                            }
                        }

                        // check the cache first:
                        if (teasersCache[options.targetID] && teasersCache[options.targetID][experience]) {
                            teaserToShow = teasersCache[options.targetID][experience];
                        } else {
                            // shortcut for default
                            if (experience === "DEFAULT") {
                                // just choose the default teaser
                                teaserToShow = defaultTeaser;
                            } else {
                                // collect the segments for this experience
                                // by looking into the campaign store
                                for (var i = 0; i < campaignList.length; i++) {
                                    var campaign = campaignList[i];
                                    if (campaignList[i]["path"] === campaignPath) {
                                        var ex = campaign["experiences"];
                                        for (var j = 0; j < ex.length; j++) {
                                            if (ex[j]["path"] === experience) {
                                                if (ex[j].hasOwnProperty("segments")) {
                                                    var segments = ex[j]["segments"];
                                                    for (var k = 0; k < segments.length; k++) {
                                                        currentSegments[segments[k]] = currentSegments;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                // check if the collected segments match one of the teasers and show that teaser
                                for (var i = 0; i < teasers.length; i++) {
                                    var teaser = teasers[i];
                                    if (teaser.hasOwnProperty("segments")
                                        && (teaser["segments"].length === segments.length)) {
                                        if (arrayEquals(segments, teaser["segments"])) {
                                            teaserToShow = teasers[i];
                                            break;
                                        }
                                    }
                                }
                            }
                            // last resort = no teaser - show the default
                            if (!teaserToShow) {
                                teaserToShow = defaultTeaser;
                            }
                            // add the teaser to the cache
                            teasersCache[options.targetID] = { experience: teaserToShow };
                        }
                    } else {
                        teaserToShow = CQ_Analytics.Engine.resolveTeaser(options.teasers, options.strategy, decisionInfo);
                    }


                    if (teaserToShow) {
                        if (!currentTeaser || currentTeaser.path !== teaserToShow.path) {
                            currentTeaser = teaserToShow;

                            var url = teaserToShow.url;
                            if ( isEditMode() ) {
                                url += "?wcmmode=disabled";
                            }
                            CQ_Analytics.Utils.loadTeaserElement(url, options.targetID);

                            if (window.CQ_trackTeasersStats && options.trackingURL) {
                                initTracking(teaserToShow, options.trackingURL);
                            }

                            if ( editable ) {
                                setDecisionTooltip(editable, decisionInfo, currentTeaser.path, options.strategy);
                            }
                        }
                    } else {
                        if ( editable ) {
                            removeDecisionTooltip(editable);
                        }
                        CQ_Analytics.Utils.clearElement(options.targetID);
                        currentTeaser = null;
                    }
                };

                loadTeasers.call();

                //loaded teaser might change everytime a segment resolution state changes
                if (CQ_Analytics.SegmentMgr) {
                    if (editablePath) {
                        // keep track of the listener to allow the TargetEditor to disable it
                        // when it takes over control of teaser/experience display
                        trackTeaserLoader(editablePath, loadTeasers);
                    }
                    CQ_Analytics.SegmentMgr.addListener("update", loadTeasers);
                }
                // also listen to campaign store
                if (CQ_Analytics.CampaignMgr) {
                    if (CQ_Analytics.CampaignMgr) {
                        CQ_Analytics.CampaignMgr.addListener("update", loadTeasers);
                    }
                }
            };

            // first teaser load is done when all stores are loaded
            if (CQ_Analytics.CCM.areStoresInitialized) {
                toExecute.call(this);
            } else {
                CQ_Analytics.CCM.addListener("storesinitialize", toExecute);
            }
        }
    };
}();

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
window.CQ_trackTeasersStats = true;

/**
 * Initializes every needed to select a teaser from a list (dependending on the given strategy) and
 * to load choosen teaser content into a DOM element.
 * @param {Array} allTeasers Teasers list
 * @param strategyName Name of the selection strategy (must be availabe in CQ_Analytics.StrategyManager)
 * @param targetElementId DOM element to insert choosen teaser
 * @param isEditMode True if edit mode is enabled
 * @param trackingURL (optional) URL of the tracking service for teaser impressions (if window.CQ_trackTeasersStats)
 */
function initializeTeaserLoader(allTeasers, strategyName, targetElementId, isEditMode, trackingURL) {
    isEditMode = CQ.Ext && (isEditMode == "true" || isEditMode === true);

    if( window.CQ_Analytics ) {
        var toExecute = function() {
            var TEASER_SUFFIX = "/_jcr_content/par.html";

            //function which computes an HTML text describing how selection is done.
            var computeDecisionHTML = function(teaserPath) {
                var html = "";

                var teasers = new Array();
                if (CQ_Analytics.SegmentMgr) {
                    var lastBoost = 0;
                    for (var i = 0; i < allTeasers.length; i++) {
                        if (!allTeasers[i]["segments"] ||
                            allTeasers[i]["segments"].length == 0 ||
                            CQ_Analytics.SegmentMgr.resolveArray(allTeasers[i]["segments"]) === true) {
                            var boost = CQ_Analytics.SegmentMgr.getMaxBoost(allTeasers[i]["segments"]);
                            if (teaserPath == allTeasers[i].path) {
                                html += CQ.I18n.getMessage("<b>Teaser {0} is resolved ( boost = {1} )</b><br>", [allTeasers[i]["name"], boost]);
                            } else {
                                html += CQ.I18n.getMessage("Teaser {0} is resolved with ( boost = {1} )<br>", [allTeasers[i]["name"], boost]);
                            }

                            if (boost == lastBoost) {
                                //same boost, add to list
                                teasers.push(allTeasers[i]);
                            } else {
                                if (boost > lastBoost) {
                                    //better boost, clear list and keep only this one
                                    teasers = new Array();
                                    teasers.push(allTeasers[i]);
                                    lastBoost = boost;
                                }
                            }
                        } else {
                            html += CQ.I18n.getMessage("Teaser {0} is not resolved<br>", allTeasers[i]["name"]);
                        }
                    }
                }
                html += CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>", strategyName);
                return html;
            };

            var currentVisibleTeaser = null;
            var ttip = null;
            //function which chooses and loads a teaser.
            var loadTeasers = function() {
                var teasers = new Array();
                if (CQ_Analytics.SegmentMgr) {
                    var lastBoost = 0;
                    for (var i = 0; i < allTeasers.length; i++) {
                        if (!allTeasers[i]["segments"] ||
                            allTeasers[i]["segments"].length == 0 ||
                            CQ_Analytics.SegmentMgr.resolveArray(allTeasers[i]["segments"]) === true) {
                            var boost = CQ_Analytics.SegmentMgr.getMaxBoost(allTeasers[i]["segments"]);
                            if (boost == lastBoost) {
                                //same boost, add to list
                                teasers.push(allTeasers[i]);
                            } else {
                                if (boost > lastBoost) {
                                    //better boost, clear list and keep only this one
                                    teasers = new Array();
                                    teasers.push(allTeasers[i]);
                                    lastBoost = boost;
                                }
                            }
                        }
                    }
                }
                if (teasers.length > 0) {
                    // fallback: display first
                    var teaserToShow = teasers[0];
                    if (CQ_Analytics.StrategyMgr) {
                        var teas = CQ_Analytics.StrategyMgr.choose(strategyName, teasers);
                        if (teas != null) {
                            teaserToShow = teas;
                        }
                    }
                    if (!currentVisibleTeaser || currentVisibleTeaser.path != teaserToShow.path) {
                        currentVisibleTeaser = teaserToShow;
                        CQ_Analytics.Utils.loadElement(teaserToShow.path + TEASER_SUFFIX, targetElementId);

                        if(window.CQ_trackTeasersStats && trackingURL) {
                            if( !CQ_Analytics.loadedTeasersStack) {
                                //store in loadedTeasersStack the list of teasers shown in the page.
                                CQ_Analytics.loadedTeasersStack = [];
                                //on window unload, post
                                $CQ(window).unload(function() {
                                    try {
                                        var loadedTeasers = CQ_Analytics.loadedTeasersStack;
                                        if( loadedTeasers ) {
                                            delete CQ_Analytics.loadedTeasersStack;
                                            //build the URL : trackingURL + paths
                                            var url = trackingURL;
                                            for(var i=0;i<loadedTeasers.length; i++) {
                                                url = CQ.shared.HTTP.addParameter(url,"path",loadedTeasers[i]);
                                            }
                                            //run get in asynch mode.
                                            CQ.shared.HTTP.get(url, function() {});
                                        }
                                    } catch(error) {}
                                });
                            }
                            CQ_Analytics.loadedTeasersStack.push(teaserToShow.path);
                        }

                        if( isEditMode ) {
                            if( ttip ) {
                                ttip.remove();
                            }
                            var elem = CQ.Ext.get(targetElementId);
                            if(elem) {
                                var ttip = new CQ.Ext.ToolTip({
                                    "target": elem,
                                    "html": computeDecisionHTML(currentVisibleTeaser.path),
                                    "title": CQ.I18n.getMessage("Selection decision"),
                                    "width": 420
                                });
                            }
                        }
                    }
                } else {
                    if( isEditMode && ttip) {
                        ttip.remove();
                    }
                    CQ_Analytics.Utils.clearElement(targetElementId);
                    currentVisibleTeaser = null;
                }
            };

            loadTeasers.call();

            //loaded teaser might change everytime a segment resolution state changes
            if (CQ_Analytics.SegmentMgr) {
                CQ_Analytics.SegmentMgr.addListener("update", loadTeasers);
            }
        };

        //first teaser load is done when all stores are loaded
        if( CQ_Analytics.ClickstreamcloudMgr ) {
            if( CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded ) {
                toExecute.call(this);
            } else {
                CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",toExecute);
            }
        }
    }
}
/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

window.CQ_trackLandingPagesStats = true;

function initializeLandingPageLoader(allLandingPages, strategyName, targetElementId, isEditMode, trackingURL) {
    isEditMode = CQ.Ext && (isEditMode == "true" || isEditMode === true);

    if( window.CQ_Analytics ) {
        var LANDINGPAGE_SUFFIX = ".html";

        var toExecute = function() {
            var currentVisibleLandingPage = null;
            //function which chooses and loads a landingPage.
            var loadLandingPages = function() {
                var landingPages = new Array();
                if (CQ_Analytics.SegmentMgr) {
                    var lastBoost = 0;
                    for (var i = 0; i < allLandingPages.length; i++) {
                        if (!allLandingPages[i]["segments"] ||
                            allLandingPages[i]["segments"].length == 0 ||
                            CQ_Analytics.SegmentMgr.resolveArray(allLandingPages[i]["segments"]) === true) {
                            var boost = CQ_Analytics.SegmentMgr.getMaxBoost(allLandingPages[i]["segments"]);
                            if (boost == lastBoost) {
                                //same boost, add to list
                                landingPages.push(allLandingPages[i]);
                            } else {
                                if (boost > lastBoost) {
                                    //better boost, clear list and keep only this one
                                    landingPages = new Array();
                                    landingPages.push(allLandingPages[i]);
                                    lastBoost = boost;
                                }
                            }
                        }
                    }
                }
                if (landingPages.length > 0) {
                    // fallback: display first
                    var landingPageToShow = landingPages[0];
                    if (CQ_Analytics.StrategyMgr) {
                        var lp = CQ_Analytics.StrategyMgr.choose(strategyName, landingPages);
                        if (lp != null) {
                            landingPageToShow = lp;
                        }
                    }
                    if (!currentVisibleLandingPage || currentVisibleLandingPage.path != landingPageToShow.path) {
                        var previousLandingPage = currentVisibleLandingPage;
                        currentVisibleLandingPage = landingPageToShow;

                        var request = CQ.shared.HTTP.get(landingPageToShow.path + LANDINGPAGE_SUFFIX);
                        var text = request.responseText;

                        var extractDiv = function(text, id) {
                            var ret = "";
                            if( text && text.indexOf("id=\"" + id + "\"") != -1) {
                                var index = text.indexOf("id=\"" + id + "\"");
                                var oDivIndex = text.substring(0, index).lastIndexOf("<div");
                                var tmp = text.substring(oDivIndex);
                                var split = tmp.split(new RegExp("<div", "ig"));
                                var opened = 0;
                                for(var i=0;i<split.length;i++) {
                                    opened++;
                                    var split2 = split[i].split(new RegExp("</div", "ig"));
                                    for(var j=1; j < split2.length; j++) {
                                        opened--;

                                        if(opened == 1) {
                                            var cDivIndex = split[i].lastIndexOf("</div") + 6;

                                            cDivIndex = tmp.indexOf(split[i]) + cDivIndex;
                                            tmp = tmp.substring(0, cDivIndex);

                                            tmp = tmp.substring(tmp.indexOf(">") + 1, tmp.lastIndexOf("</div"));
                                            return tmp;
                                        }
                                    }
                                }
                             }
                             return "";
                        };

                        text = extractDiv(text, targetElementId);

                        var target = $CQ("#" + targetElementId)[0];

                        var removeEditables = function(filter, show) {
                            if( isEditMode ) {
                                var editables = CQ.WCM.getEditables();
                                for(var epath in editables) {
                                    var editable = editables[epath];
                                    if( !filter || editable.path.indexOf(filter) != -1) {
                                        editable.hide();
                                        editable.remove();
                                    }
                                }
                            }
                        };

                        var node = document.createElement("div");
                        node.innerHTML = text;

                        if( previousLandingPage ) {
                            $CQ("object", target).parent().fadeOut("slow");
                            $CQ("img", target).fadeOut("slow");
                            $CQ(target).slideUp("slow", function() {
                                removeEditables(previousLandingPage.path, false);
                                $CQ(target).children().remove();

                                var toInject = target.insertBefore(node,target.firstChild);

                                $CQ(target).slideDown("slow", function() {
                                    if( isEditMode ) {
                                        CQ.DOM.executeScripts(CQ.Ext.get(node));
                                    }
                                });
                            });
                        } else {
                            var toInject = target.insertBefore(node,target.firstChild);
                            $CQ(target).slideDown("slow", function() {
                                if( isEditMode ) {
                                    CQ.DOM.executeScripts(CQ.Ext.get(node));
                                }
                            });
                        }

                        try {
                            if(window.CQ_trackLandingPagesStats && trackingURL) {
                                if( !CQ_Analytics.loadedLandingPagesStack) {
                                    //store in loadedLandingPagesStack the list of landingPages shown in the page.
                                    CQ_Analytics.loadedLandingPagesStack = [];
                                    //on window unload, post
                                    $CQ(window).unload(function() {
                                        try {
                                            var loadedLandingPages = CQ_Analytics.loadedLandingPagesStack;
                                            if( loadedLandingPages ) {
                                                delete CQ_Analytics.loadedLandingPagesStack;
                                                //build the URL : trackingURL + paths
                                                var url = trackingURL;
                                                for(var i=0;i<loadedLandingPages.length; i++) {
                                                    url = CQ.shared.HTTP.addParameter(url,"path",loadedLandingPages[i]);
                                                }
                                                //run get in asynch mode.
                                                CQ.shared.HTTP.get(url, function() {});
                                            }
                                        } catch(error) {}
                                    });
                                }
                                CQ_Analytics.loadedLandingPagesStack.push(landingPageToShow.path);
                            }
                        } catch(error) {}
                    }
                } else {
                    CQ_Analytics.Utils.clearElement(targetElementId);
                    currentVisibleLandingPage = null;
                }
            };

            loadLandingPages.call();

            //loaded landingPage might change everytime a segment resolution state changes
            if (CQ_Analytics.SegmentMgr) {
                CQ_Analytics.SegmentMgr.addListener("update", loadLandingPages);
            }
        };

        //first landingPage load is done when all stores are loaded
        if( CQ_Analytics.ClickstreamcloudMgr ) {
            if( CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded ) {
                toExecute.call(this);
            } else {
                CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",toExecute);
            }
        }
    }
    }

/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.PersistedJSONStore
 * @extends CQ_Analytics.PersistedSessionStore
 * A PersistedJSONStore is a persisted container of a JSON object.
 * @constructor
 * Creates a new PersistedJSONStore.
 * @since 5.5
 */
CQ_Analytics.PersistedJSONStore = function() {};

CQ_Analytics.PersistedJSONStore.prototype = new CQ_Analytics.PersistedSessionStore();

/**
 * @cfg {String} STOREKEY
 * Store internal key
 * @final
 * @private
 */
CQ_Analytics.PersistedJSONStore.prototype.STOREKEY = "";

/**
 * @cfg {String} STORENAME
 * Store internal name
 * @final
 * @private
 */
CQ_Analytics.PersistedJSONStore.prototype.STORENAME = "";

//inheritDoc
CQ_Analytics.PersistedJSONStore.prototype.init = function() {
    var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
    var value = store.get(this.getStoreKey());
    if (!value || value == "") {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
    } else {
        this.data = this.parse(value);
    }
    this.persist();

    this.initialized = true;
    this.fireEvent("initialize",this);
    this.fireEvent("update");
};

//inheritDoc
CQ_Analytics.PersistedJSONStore.prototype.clear = function() {
    var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
    store.remove(this.getStoreKey());
    this.data = null;
    this.initProperty = {};
};

/**
 * Sets the store data with the specified JSON object. Note that inside the store, properties are stored based
 * on property path in the store.
 * <code>{
 * A: "valueA",
 * B: {
 *  B1: "valueBB1"
 * }</code>
 * will be accessed in the store as:
 * <code>A: "valueA"
 * B/B1: "valueBB1"</code>
 *
 * @param {Object} jsonData The JSON object containing the data.
 */
CQ_Analytics.PersistedJSONStore.prototype.initJSON = function(jsonData, doNotClear) {
    if( !doNotClear ) {
        this.initProperty = {};
    }

    var propertyToPaths= function(target, prefix, obj) {
        for(var p in obj) {
            if( typeof obj[p]  == "object") {
                propertyToPaths(target, prefix ? prefix + "/" + p : p, obj[p]);
            } else {
                target[prefix ? prefix + "/" + p : p] = obj[p];
            }
        }
    };

    propertyToPaths(this.initProperty, null, jsonData);
};

/**
 * Returns the store data as a JSON object.
 * @return {Object} The JSON object.
 */
CQ_Analytics.PersistedJSONStore.prototype.getJSON = function() {
    var data = this.getData();
    var res = {};

    for(var longProp in data) {
        var s = longProp.split("/");
        var level = res;
        for(var i = 0; i < s.length; i++) {
            var propLevel = s[i];
            if( i == s.length - 1) {
                level[propLevel] = data[longProp];
            } else {
                level[propLevel] = level[propLevel] || {};
                level = level[propLevel];
            }
        }
    }

    return res;
};

/**
 * Returns a new instance of a CQ_Analytics.PersistedJSONStore instance is initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.PersistedJSONStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONStore.getInstance = function(storeName, jsonData) {
    var s = new CQ_Analytics.PersistedJSONStore();
    s.STOREKEY = storeName.toUpperCase();
    s.STORENAME = storeName;

    s.initJSON(jsonData);

    return s;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.PersistedJSONStore
 * instance initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.PersistedJSONStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONStore.registerNewInstance = function(storeName, jsonData) {
    var jsonStore = CQ_Analytics.PersistedJSONStore.getInstance(storeName, jsonData);
    jsonStore.init();
    //registers new store to clickstreamcloud manager
    CQ_Analytics.CCM.register(jsonStore);

    return jsonStore;
};


/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.JSONStore
 * @extends CQ_Analytics.SessionStore
 * A JSONStore is a container of a JSON object.
 * @constructor
 * Creates a new JSONStore.
 * @since 5.5
 */
CQ_Analytics.JSONStore = function() {};

CQ_Analytics.JSONStore.prototype = new CQ_Analytics.SessionStore();

/**
 * @cfg {String} STOREKEY
 * Store internal key
 * @final
 * @private
 */
CQ_Analytics.JSONStore.prototype.STOREKEY = "";

/**
 * @cfg {String} STORENAME
 * Store internal name
 * @final
 * @private
 */
CQ_Analytics.JSONStore.prototype.STORENAME = "";

//inheritDoc
CQ_Analytics.JSONStore.prototype.init = function() {
    this.data = {};
    for (var p in this.initProperty) {
        this.data[p] = this.initProperty[p];
    }

    this.initialized = true;
    this.fireEvent("initialize",this);
    this.fireEvent("update");
};

//inheritDoc
CQ_Analytics.JSONStore.prototype.clear = function() {
    this.data = null;
    this.initProperty = {};
};

/**
 * Sets the store data with the specified JSON object. Note that inside the store, properties are stored based
 * on property path in the store.
 * <code>{
 * A: "valueA",
 * B: {
 *  B1: "valueBB1"
 * }</code>
 * will be accessed in the store as:
 * <code>A: "valueA"
 * B/B1: "valueBB1"</code>
 *
 * @param {Object} jsonData The JSON object containing the data.
 */
CQ_Analytics.JSONStore.prototype.initJSON = function(jsonData, doNotClear) {
    if( !doNotClear ) {
        this.initProperty = {};
    }

    var propertyToPaths= function(target, prefix, obj) {
        for(var p in obj) {
            if( typeof obj[p]  == "object") {
                propertyToPaths(target, prefix ? prefix + "/" + p : p, obj[p]);
            } else {
                target[prefix ? prefix + "/" + p : p] = obj[p];
            }
        }
    };

    propertyToPaths(this.initProperty, null, jsonData);
};

/**
 * Returns the store data as a JSON object.
 * @return {Object} The JSON object.
 */
CQ_Analytics.JSONStore.prototype.getJSON = function() {
    var data = this.getData();
    var res = {};

    for(var longProp in data) {
        var s = longProp.split("/");
        var level = res;
        for(var i = 0; i < s.length; i++) {
            var propLevel = s[i];
            if( i == s.length - 1) {
                level[propLevel] = data[longProp];
            } else {
                level[propLevel] = level[propLevel] || {};
                level = level[propLevel];
            }
        }
    }

    return res;
};

/**
 * Returns a new instance of a CQ_Analytics.JSONStore instance is initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.JSONStore} The new store instance
 */
CQ_Analytics.JSONStore.getInstance = function(storeName, jsonData) {
    var s = new CQ_Analytics.JSONStore();
    s.STOREKEY = storeName.toUpperCase();
    s.STORENAME = storeName;

    s.initJSON(jsonData);

    return s;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.JSONStore
 * instance initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.JSONStore} The new store instance
 */
CQ_Analytics.JSONStore.registerNewInstance = function(storeName, jsonData) {
    var jsonStore = CQ_Analytics.JSONStore.getInstance(storeName, jsonData);
    jsonStore.init();
    //registers new store to clickstreamcloud manager
    CQ_Analytics.CCM.register(jsonStore);

    return jsonStore;
};


/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.PersistedJSONPStore
 * @extends CQ_Analytics.PersistedJSONStore
 * A PersistedJSONPStore is a persisted container of a JSON object retrieved from a remote JSONP service.
 * @constructor
 * Creates a new PersistedJSONPStore.
 * @since 5.5
 */
CQ_Analytics.PersistedJSONPStore = function() {};

CQ_Analytics.PersistedJSONPStore.prototype = new CQ_Analytics.PersistedJSONStore();

/**
 * Sets a new service URL.
 * @param {String} serviceURL The service URL
 */
CQ_Analytics.PersistedJSONPStore.prototype.setServiceURL = function(serviceURL) {
    this.serviceURL = serviceURL;
};

/**
 * Returns the service URL of the store.
 * @return {String} The service URL if defined. Null otherwise
 */
CQ_Analytics.PersistedJSONPStore.prototype.getServiceURL = function() {
    return this.serviceURL;
};

/**
 * Loads in the store the data from the remote JSONP service.
 * @param {String} serviceURL (Optional) Defines a new service URL
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 */
CQ_Analytics.PersistedJSONPStore.prototype.load = function(serviceURL, dynamicData, callback) {
    var storeName = this.getName();
    if( ! CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[this.getName()]) {
        CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[storeName] = function(data) {
            var s = CQ_Analytics.CCM.getRegisteredStore(storeName);
            if( s ) {
                s.initJSON(data);
                if( dynamicData ) {
                    s.initJSON(dynamicData, true);
                }

            }
            if( callback ) {
                callback.call(s);
            }
        };
    }

    if( serviceURL ) {
        this.setServiceURL(serviceURL);
    }

    var url = this.serviceURL;
    url = url.replace("\$\{callback\}","CQ_Analytics.PersistedJSONPStore.JSONPCallbacks." + storeName);
    $CQ.getScript(url);
};

/**
 * Used as storage for JSONP callbacks (one callback per unique store name).
 */
CQ_Analytics.PersistedJSONPStore.JSONPCallbacks = {};

/**
 * Returns a new instance of a CQ_Analytics.PersistedJSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL (Optional) The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Boolean} deferLoading (Optional) True to defer the store loading
 * @param {Function} loadingCallback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.PersistedJSONPStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONPStore.getInstance = function(storeName, serviceURL, dynamicData, deferLoading, loadingCallback) {
    if( storeName && serviceURL) {
        try {
            var jsonpStore = new CQ_Analytics.PersistedJSONPStore();
            jsonpStore.STOREKEY = storeName.toUpperCase();
            jsonpStore.STORENAME = storeName;

            if( serviceURL ) {
                jsonpStore.setServiceURL(serviceURL);
            }

            if( !deferLoading ) {
                jsonpStore.load(serviceURL, dynamicData, loadingCallback);
            }

            return jsonpStore;
        } catch(error) {
            console.log("Cannot create the JSONP store",storeName, serviceURL,error);
        }
    }
    return null;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.PersistedJSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.PersistedJSONPStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONPStore.registerNewInstance = function(storeName, serviceURL, dynamicData, callback) {
    if( !serviceURL ) {
        return null;
    }

    if( !storeName ) {
        //try to extract a name from service url

        var sa = CQ.shared.HTTP.getSchemeAndAuthority(serviceURL);
        if( sa ) {
            if(sa.indexOf(".") !=-1) {
                sa = sa.substring(0, sa.lastIndexOf("."));
                storeName = sa.substring(sa.lastIndexOf(".") + 1);
            } else {
                storeName = sa.substring(sa.lastIndexOf("/") + 1);
            }
        } else {
            //weird case, should never happen
            storeName = serviceURL;
        }

    }

    var store = CQ_Analytics.PersistedJSONPStore.getInstance(storeName, serviceURL, dynamicData, false, function() {
        this.init();
        this.reset();
        if( callback ) {
            callback.call(this);
        }
    });
    if( store != null ) {
        //registers new store to clickstreamcloud manager
        CQ_Analytics.CCM.register(store);
        return store;
    }
    return null;
};
/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.JSONPStore
 * @extends CQ_Analytics.JSONStore
 * A JSONPStore is a container of a JSON object retrieved from a remote JSONP service.
 * @constructor
 * Creates a new JSONPStore.
 * @since 5.5
 */
CQ_Analytics.JSONPStore = function() {};

CQ_Analytics.JSONPStore.prototype = new CQ_Analytics.JSONStore();

/**
 * Sets a new service URL.
 * @param {String} serviceURL The service URL
 */
CQ_Analytics.JSONPStore.prototype.setServiceURL = function(serviceURL) {
    this.serviceURL = serviceURL;
};

/**
 * Returns the service URL of the store.
 * @return {String} The service URL if defined. Null otherwise
 */
CQ_Analytics.JSONPStore.prototype.getServiceURL = function() {
    return this.serviceURL;
};

/**
 * Loads in the store the data from the remote JSONP service.
 * @param {String} serviceURL (Optional) Defines a new service URL
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 */
CQ_Analytics.JSONPStore.prototype.load = function(serviceURL, dynamicData, callback) {
    var storeName = this.getName();
    if( ! CQ_Analytics.JSONPStore.JSONPCallbacks[this.getName()]) {
        CQ_Analytics.JSONPStore.JSONPCallbacks[storeName] = function(data) {
            var s = CQ_Analytics.CCM.getRegisteredStore(storeName);
            if( s ) {
                s.initJSON(data);
                if( dynamicData ) {
                    s.initJSON(dynamicData, true);
                }

            }
            if( callback ) {
                callback.call(s);
            }
        };
    }

    if( serviceURL ) {
        this.setServiceURL(serviceURL);
    }

    var url = this.serviceURL;
    url = url.replace("\$\{callback\}","CQ_Analytics.JSONPStore.JSONPCallbacks." + storeName);
    $CQ.getScript(url);
};

/**
 * Used as storage for JSONP callbacks (one callback per unique store name).
 */
CQ_Analytics.JSONPStore.JSONPCallbacks = {};

/**
 * Returns a new instance of a CQ_Analytics.JSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL (Optional) The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Boolean} deferLoading (Optional) True to defer the store loading
 * @param {Function} loadingCallback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.JSONPStore} The new store instance
 */
CQ_Analytics.JSONPStore.getInstance = function(storeName, serviceURL, dynamicData, deferLoading, loadingCallback) {
    if( storeName ) {
        try {
            var jsonpStore = new CQ_Analytics.JSONPStore();
            jsonpStore.STOREKEY = storeName.toUpperCase();
            jsonpStore.STORENAME = storeName;

            if( serviceURL ) {
                jsonpStore.setServiceURL(serviceURL);
                if( !deferLoading ) {
                    jsonpStore.load(serviceURL, dynamicData, loadingCallback);
                }
            }

            return jsonpStore;
        } catch(error) {
            console.log("Cannot create the JSONP store",storeName, serviceURL,error);
        }
    }
    return null;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.JSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.JSONPStore} The new store instance
 */
CQ_Analytics.JSONPStore.registerNewInstance = function(storeName, serviceURL, dynamicData, callback) {
    if( !storeName && serviceURL) {
        //try to extract a name from service url

        var sa = CQ.shared.HTTP.getSchemeAndAuthority(serviceURL);
        if( sa ) {
            if(sa.indexOf(".") !=-1) {
                sa = sa.substring(0, sa.lastIndexOf("."));
                storeName = sa.substring(sa.lastIndexOf(".") + 1);
            } else {
                storeName = sa.substring(sa.lastIndexOf("/") + 1);
                storeName = storeName.replace(new RegExp(":", "ig"),"_");
            }
        } else {
            //weird case, should never happen
            storeName = serviceURL;
        }

    }

    var store = CQ_Analytics.JSONPStore.getInstance(storeName, serviceURL, dynamicData, false, function() {
        this.init();
        this.reset();
        if( callback ) {
            callback.call(this);
        }
    });
    if( store != null ) {
        //registers new store to clickstreamcloud manager
        CQ_Analytics.CCM.register(store);
        return store;
    }
    return null;
};
/**
 * Stores the 'data' object into the appropriate properties of the 'store'
 * client side store.
 * 
 * @param {Object}
 *            SessionStore object.
 * @param {Object}
 *            Data object.
 * @private
 */
CQ_Analytics.storeData = function(store, data) {
	
	var findMappingFor = function(prop,value) {
		for (var i=0; i< CQ_Analytics.Sitecatalyst.frameworkMappings.length; i++) {
			var m = CQ_Analytics.Sitecatalyst.frameworkMappings[i];
			if (m[prop] === value) {
				return m;
			}
		}
		return null;
	}
	
	var stripValue = function(value) {
		if (typeof value === 'string') {
			return value.replace(/[,;=\|]/g,"");
		}
		return value;
	}
	
	for (var j in data) {
    	//handle generic data
    	if (j !== "product") {
        	var idx = j.indexOf(".");
        	var storeName = (idx > 0) ? j.substr(0,idx-1) : undefined;
        	var key = (idx > 0) ? j.substr(idx) : j;
        	if ( storeName && CQ_Analytics.StoreRegistry.getStore(storeName) ) {
        		store = CQ_Analytics.StoreRegistry.getStore(storeName);
        	}
            store.setProperty(key, data[j]);
    	// handle product data
    	} else {
    		var productProperties = ["category","sku","quantity","price","events","evars"];
    		var products = store.getProperty("products").split(",");
    		products = (products[0] == "") ? new Array() : products; 

    		var data = (data[j] instanceof Array)
    				   ? data[j] 
    				   : [data[j]];
    			
    		for (var prod = 0; prod < data.length; prod++) {
    			var p = data[prod];
    			var product = new Array(6);
    			for (var k in p) {
	    			var idx = productProperties.indexOf(k);
	    			if (idx > -1) {
	    				if (idx < 4) {
	    					product[idx] = stripValue(p[k]);
	    				} else {
	    					var multival = []; 
	    					for(var l in p[k]) {
	    						var propPath = store.getName() + "." + j + "." + k + "." + l;
	    						var cm = findMappingFor("cqVar", propPath);
	    						if (cm) {
	    							multival.push(cm.scVar + "=" + stripValue(p[k][l]));
	    							//add to events store like normal event
	    							var events = store.getProperty("events").split("\u2026")
	    							if (events.indexOf(cm.cqVar) < 0) {
	    								events.push(cm.cqVar.replace(/.+\./,""));
	    								store.setProperty("events", events.join("\u2026"));
	    							}
	    						}
	    					}
	    					product[idx] = multival.join("|"); 
	    				}
	            	}
	    		}
    			products.push(product.join(";"));
    		}
    		store.setProperty("products", products.join(","));
    	}
    }
};

/**
 * Records a user interaction in the a ClientContext store (by default
 * EventDataManager) to be picked up by the used analytics solution for further
 * processing.
 * 
 * @param {Object}
 *            options Tracking options.
 * 
 * <p>
 * Generic options properties.
 * </p>
 * @param {String}/{Array}
 *            options.event Tracking event name or Array of Strings for multiple 
 *            event names.
 * @param {Object}
 *            options.values Tracking values.
 * @param {Boolean}
 *            options.collect Flag which indicates if event and values should be
 *            collected (optional).
 * @param {String}
 *            options.dataMgr User ClientContext store to hold the information
 *            (optional). Default is <code>CQ_Analytics.EventDataMgr</code>.
 * @param {Object}
 *            options.options Options object holding analytics specific options
 *            (optional).
 * 
 * <p>
 * By default when using SiteCatalyst following <code>options.options</code>
 * are supported.
 * </p>
 * @param {DOM
 *            Element} options.options.obj Link DOM element
 * @param {String}
 *            options.options.defaultLinkType SiteCatalyst link type
 * 
 * @return {Array} An array holding the options.event and options.values if
 *         <code>options.collect</code> is <code>true</code>, otherwise
 *         nothing is returned.
 * @since 5.5
 */
CQ_Analytics.record = function(options) {

    if (options.collect) {
        return [options.event, options.values]; 
    } else {  
        if (options.event) { 
            options.options = options.options || { };
            //execute callbacks before data is set
            try {
                CQ_Analytics.recordBeforeCallbacks.sort(function(a, b){
                    return a.rank-b.rank;
                });
                for(var callback in CQ_Analytics.recordBeforeCallbacks) {
                    if (CQ_Analytics.recordBeforeCallbacks[callback].func.call(this, options)) {
                        return;
                    }
                }
            } catch(err) {
                //nothing to do 
            }
         
            //record data to clickStreamCloud
            var dataMgr = options.dataMgr || CQ_Analytics.EventDataMgr
            dataMgr.reset();

            if (typeof options.event == "string") {
                dataMgr.setProperty("events",options.event);
            } else {
                dataMgr.setProperty("events",options.event.join("\u2026"));
            }
            
            if (options.values) {
                CQ_Analytics.storeData(dataMgr, options.values);
            }
            
            //execute callbacks after data was set
            try {
               CQ_Analytics.recordAfterCallbacks.sort(function(a, b){
                   return a.rank-b.rank;
               });
               for(var callback in CQ_Analytics.recordAfterCallbacks) {
                    if (CQ_Analytics.recordAfterCallbacks[callback].func.call(this, options)) {
                        return;
                    }
                }
            } catch(err) {
                //nothing to do 
            }
        }
    }
};

/**
 * @private
 */
CQ_Analytics.recordBeforeCallbacks = [];

/**
 * @private
 */
CQ_Analytics.recordAfterCallbacks = []; 

/**
 * Registers a callback handler which is called before data in ClientContext
 * store was set.
 * 
 * @param {Function}
 *            Callback function. Parameter passed to the callback is the
 *            <code>options</code> object from the record method.
 * @param {Integer}
 *            Execution rank.
 */
CQ_Analytics.registerBeforeCallback = function(callback, rank) {
    CQ_Analytics.recordBeforeCallbacks.push({rank: rank, func: callback});
};

/**
 * Registers a callback handler which is called after data in ClientContext
 * store was set.
 * 
 * @param {Function}
 *            Callback function. Parameter passed to the callback is the
 *            <code>options</code> object from the record method.
 * @param {Integer}
 *            Execution rank.
 */
CQ_Analytics.registerAfterCallback = function(callback, rank) {
    CQ_Analytics.recordAfterCallbacks.push({rank: rank, func: callback});
};

/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

if (!CQ_Analytics.ClientContext) {
    /**
     * The <code>ClientContext</code> object is a facade to access / update the session stores and
     * their properties contained in the {@link CQ_Analytics.ClientContextMgr}.
     * <br>
     * @static
     * @singleton
     * @class CQ_Analytics.ClientContext
     * @since 5.5
     */
    CQ_Analytics.ClientContext = new function() {
        return {
            /**
             * Returns a store or the value of a property from a store loaded in the ClientContext
             * @param {String} path Format: /"storeName" or /"storeName"/"propertyName". E.g.: /profile, /profile/email
             * or /geolocation/address/city. First / can be omitted - "profile" or profile/email would work too.
             * @param {Boolean} resolveVariables True to resolves the variables contained in the value (defaults to false).
             * @return {Object/String} a store or a property value. Null if not found.
             */
            get: function(path, resolveVariables) {
                if( path ) {
                    if( path.indexOf("/") != 0) {
                        path = "/" + path;
                    }

                    var storeName = path.split("/")[1];
                    var propertyName = path.substring(path.indexOf("/" + storeName) + storeName.length + 2, path.length);
                    var store = CQ_Analytics.CCM.getRegisteredStore(storeName);
                    if( store ) {
                        if( propertyName ) {
                            var value = store.getProperty(propertyName);
                            if( value && resolveVariables ) {
                                value = CQ_Analytics.Variables.replaceVariables(value);
                            }
                            return value;
                        }
                        return store;
                    }
                }
                return null;
            },

            /**
             * Sets the value of a property from a store loaded in the ClientContext
             * @param {String} path Format: /"storeName" or /"storeName"/"propertyName". E.g.: /profile, /profile/email
             * or /geolocation/address/city. First / can be omitted - "profile" or profile/email would work too.
             * @param {String} value New value of the property
             *
             */
            set: function(path, value) {
                if( path ) {
                    if( path.indexOf("/") != 0) {
                        path = "/" + path;
                    }

                    var storeName = path.split("/")[1];
                    var propertyName = path.substring(path.indexOf("/" + storeName) + storeName.length + 2, path.length);
                    var store = CQ_Analytics.CCM.getRegisteredStore(storeName);
                    if( store ) {
                        if( propertyName ) {
                            store.setProperty(propertyName,value);
                        }
                    }
                }
            },

            /**
             * Clears all the stores loaded in the ClientContext (removes properties and values)
             */
            clear: function() {
                var stores = CQ_Analytics.CCM.getStores();
                if( stores ) {
                    for(var s in stores) {
                        if( stores[s].clear ) {
                            stores[s].clear();
                        }
                    }
                }
            },

            /**
             * Resets all the stores loaded in the ClientContext (reset to initial values)
             */
            reset: function() {
                var stores = CQ_Analytics.CCM.getStores();
                if( stores ) {
                    for(var s in stores) {
                        if( stores[s].reset ) {
                            stores[s].reset();
                        }
                    }
                }
            },

            /**
             * Persists the full ClientContext content or the specified store.
             * @param {String} storeName Name of the store to persist.
             */
            persist: function(storeName) {
                CQ_Analytics.ClientContextMgr.ServerStorage.post(storeName, true);
            }
        }
    }();

    /**
     * Shortcut for the {@link CQ_Analytics.ClientContext}.
     * <br>
     * @static
     * @singleton
     * @class ClientContext
     * @since 5.5
     */
    window.ClientContext = CQ_Analytics.ClientContext;
    //just kept for compatibility with internal name during 5.5 dev
    window.ContextCloud = CQ_Analytics.ClientContext;
}
/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * 2448US01 - Patent Application - US - 13/648,856
 **************************************************************************/
/**
 * The <code>CQ_Analytics.TwitterProfileDataMgr</code> object is a store providing user's twitter profile information.
 */
if (CQ_Analytics && !CQ_Analytics.TwitterProfileDataMgr) {

    CQ_Analytics.TwitterProfileDataMgr = function() {};

    CQ_Analytics.TwitterProfileDataMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */

    CQ_Analytics.TwitterProfileDataMgr.prototype.STOREKEY = "TWITTERPROFILEDATA";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */

    CQ_Analytics.TwitterProfileDataMgr.prototype.STORENAME = "twitterprofile";

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.TwitterProfileDataMgr.prototype.clear = function() {
        if (this.persistence) {
            this.persistence.remove(this.getStoreKey());
        }

        this.data = null;
        this.initProperty = {};
    };

    CQ_Analytics.TwitterProfileDataMgr.prototype.init = function() {
        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = this.persistence.get(this.getStoreKey());

        if (!value || value == "") {
            this.data = {};
            for (var p in this.initProperty) {
                this.data[p] = this.initProperty[p];
            }
        } else {
            this.data = this.parse(value);
        }

        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    CQ_Analytics.TwitterProfileDataMgr.prototype.getLoaderURL = function() {
        return CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/twitterprofiledata/loader.json");
    };

    CQ_Analytics.TwitterProfileDataMgr.prototype.loadProfile = function(authorizableId) {
        if(authorizableId) {
            this.setProperty('authorizableId', authorizableId);
            var url = this.getLoaderURL();
            url = CQ_Analytics.Utils.addParameter(url, "authorizableId", authorizableId);

            try {

                // the response body will be empty if the authorizableId doesn't resolve to a profile
                var object = CQ.shared.HTTP.eval(url);
                if (object) {
                    this.data = {};
                    for (var p in object) {
                        this.data[p] = object[p];
                    }

                    this.setProperty('authorizableId', authorizableId);
                    this.persist();
                    this.fireEvent("update");

                    if (CQ_Analytics.ClickstreamcloudEditor) {
                        CQ_Analytics.ClickstreamcloudEditor.reload();
                    }
                    return true;
                }


            } catch(error) {
                if (console && console.log) console.log("Error during profile loading", error);
            }
        }
        return false;
    };

    CQ_Analytics.TwitterProfileDataMgr = new CQ_Analytics.TwitterProfileDataMgr();

    CQ_Analytics.ClientContextUtils.onStoreRegistered("profile", function() {
        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
            if (uid != this.getProperty('authorizableId')) {
                CQ_Analytics.TwitterProfileDataMgr.loadProfile(uid);
                this.fireEvent("update");
            }
        }, CQ_Analytics.TwitterProfileDataMgr);
    });

    //registers Profile Data to clickstreamcloud manager
    CQ_Analytics.CCM.register(CQ_Analytics.TwitterProfileDataMgr);
}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * 2448US01 - Patent Application - US - 13/648,856
 **************************************************************************/
/**
 * The <code>CQ_Analytics.FacebookProfileDataMgr</code> object is a store providing user's facebook profile information.
 */
if (!CQ_Analytics.FacebookProfileDataMgr) {

    CQ_Analytics.FacebookProfileDataMgr = function() {};

    CQ_Analytics.FacebookProfileDataMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */

    CQ_Analytics.FacebookProfileDataMgr.prototype.STOREKEY = "FBPROFILEDATA";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */

    CQ_Analytics.FacebookProfileDataMgr.prototype.STORENAME = "facebookprofile";

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.FacebookProfileDataMgr.prototype.clear = function() {
        if (this.persistence) {
            this.persistence.remove(this.getStoreKey());
        }

        this.data = null;
        this.initProperty = {};
    };

    CQ_Analytics.FacebookProfileDataMgr.prototype.init = function() {
        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = this.persistence.get(this.getStoreKey());

        if (!value || value == "") {
            this.data = {};
            for (var p in this.initProperty) {
                this.data[p] = this.initProperty[p];
            }
        } else {
            this.data = this.parse(value);
        }

        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    CQ_Analytics.FacebookProfileDataMgr.prototype.getLoaderURL = function() {
        return CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/fbprofiledata/loader.json");
    };

    CQ_Analytics.FacebookProfileDataMgr.prototype.loadProfile = function(authorizableId) {
        if(authorizableId) {
            this.setProperty('authorizableId', authorizableId);
            var url = this.getLoaderURL();
            url = CQ_Analytics.Utils.addParameter(url, "authorizableId", authorizableId);

            try {

                // the response body will be empty if the authorizableId doesn't resolve to a profile
                var object = CQ.shared.HTTP.eval(url);
                if (object) {
                    this.data = {};
                    for (var p in object) {
                        this.data[p] = object[p];
                    }

                    this.setProperty('authorizableId', authorizableId);
                    this.persist();
                    this.fireEvent("update");
                    this.fireEvent("checkBirthday");
                    if (CQ_Analytics.ClickstreamcloudEditor) {
                        CQ_Analytics.ClickstreamcloudEditor.reload();
                    }
                    return true;
                }


            } catch(error) {
                if (console && console.log) console.log("Error during profile loading", error);
            }
        }
        return false;
    };

    CQ_Analytics.FacebookProfileDataMgr = new CQ_Analytics.FacebookProfileDataMgr();

    CQ_Analytics.ClientContextUtils.onStoreRegistered("profile", function() {
        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
            if (uid != this.getProperty('authorizableId')) {
                CQ_Analytics.FacebookProfileDataMgr.loadProfile(uid);
                this.fireEvent("update");
            }
        },CQ_Analytics.FacebookProfileDataMgr);
    });

    //registers Profile Data to clickstreamcloud manager
    CQ_Analytics.CCM.register(CQ_Analytics.FacebookProfileDataMgr);
}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * 2448US01 - Patent Application - US - 13/648,856
 **************************************************************************/

if (!CQ_Analytics.FacebookInterestsMgr) {
    CQ_Analytics.FacebookInterestsMgr = function() {};

    CQ_Analytics.FacebookInterestsMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */

    CQ_Analytics.FacebookInterestsMgr.prototype.STOREKEY = "FBINTERESTSDATA";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */

    CQ_Analytics.FacebookInterestsMgr.prototype.STORENAME = "fbinterests";

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.FacebookInterestsMgr.prototype.getLabel = function(name) {
        return name;
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.FacebookInterestsMgr.prototype.getLink = function(name) {
        return "";
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.FacebookInterestsMgr.prototype.clear = function() {
        if (this.persistence) {
            this.persistence.remove(this.getStoreKey());
        }

        this.data = null;
        this.initProperty = {};

    };

    CQ_Analytics.FacebookInterestsMgr.prototype.init = function() {
        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = this.persistence.get(this.getStoreKey());

        if (!value || value == "") {
            this.data = {};
            for (var p in this.initProperty) {
                this.data[p] = this.initProperty[p];
            }
        } else {
            this.data = this.parse(value);
        }

        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    CQ_Analytics.FacebookInterestsMgr.prototype.getLoaderURL = function() {
        return CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/fbinterestsdata/loader.json");
    };

    CQ_Analytics.FacebookInterestsMgr.prototype.loadProfile = function(authorizableId) {
        if(authorizableId) {
            this.setProperty('authorizableId', authorizableId);
            var url = this.getLoaderURL();
            url = CQ_Analytics.Utils.addParameter(url, "authorizableId", authorizableId);
            CQ_Analytics.FacebookInterestsMgr.lastUid = authorizableId;
            try {

                 // the response body will be empty if the authorizableId doesn't resolve to a profile
                    var object = CQ.shared.HTTP.eval(url);
                    if (object) {
                        this.data = {};
                        for (var p in object) {
                            this.data[p] = object[p];
                        }

                        this.setProperty('authorizableId', authorizableId);
                        this.persist();

                        if (CQ_Analytics.ClickstreamcloudEditor) {
                            CQ_Analytics.ClickstreamcloudEditor.reload();
                        }
                        return true;
                    }


            } catch(error) {
                if (console && console.log) console.log("Error during profile loading", error);
            }
        }
        return false;
    };


    CQ_Analytics.FacebookInterestsMgr = new CQ_Analytics.FacebookInterestsMgr();

    CQ_Analytics.ClientContextUtils.onStoreRegistered("profile", function() {
        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
            if (uid != this.getProperty('authorizableId')) {
                CQ_Analytics.FacebookInterestsMgr.loadProfile(uid);
                this.fireEvent("update");
            }
        },CQ_Analytics.FacebookInterestsMgr);
    });

    CQ_Analytics.CCM.register(CQ_Analytics.FacebookInterestsMgr);
}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
/**
 * The <code>CQ_Analytics.SalesforceProfileDataMgr</code> object is a store providing user's twitter profile information.
 */
if (CQ_Analytics && !CQ_Analytics.SalesforceProfileDataMgr) {

    CQ_Analytics.SalesforceProfileDataMgr = function() {};

    CQ_Analytics.SalesforceProfileDataMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */

    CQ_Analytics.SalesforceProfileDataMgr.prototype.STOREKEY = "SALESFORCEPROFILEDATA";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */

    CQ_Analytics.SalesforceProfileDataMgr.prototype.STORENAME = "salesforceprofile";

    CQ_Analytics.SalesforceProfileDataMgr.prototype.lastUid = "";

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.SalesforceProfileDataMgr.prototype.clear = function() {
        this.data = null;
        this.initProperty = {};
    };

    CQ_Analytics.SalesforceProfileDataMgr.prototype.init = function() {
        if (!this.data) {
            this.data = {};
            for (var p in this.initProperty) {
                this.data[p] = this.initProperty[p];
            }
        }
    };

    CQ_Analytics.SalesforceProfileDataMgr.prototype.getLoaderURL = function() {
        return CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/salesforceprofiledata/loader.json");
    };

    // When ProfileDataMgr is updated, update Salesforce Profile as well
    CQ_Analytics.SalesforceProfileDataMgr.prototype.handleUpdateProfileDataMgr = function(){

        var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
        if (uid != CQ_Analytics.SalesforceProfileDataMgr.lastUid) {
            CQ_Analytics.SalesforceProfileDataMgr.loadProfile(uid);
            CQ_Analytics.SalesforceProfileDataMgr.fireEvent("update");
        }
    };

    CQ_Analytics.SalesforceProfileDataMgr.prototype.loadProfile = function(authorizableId) {
        CQ_Analytics.SalesforceProfileDataMgr.lastUid = authorizableId;
        var url = this.getLoaderURL();
        url = CQ_Analytics.Utils.addParameter(url, "authorizableId", authorizableId);

        try {
            // the response body will be empty if the authorizableId doesn't resolve to a profile
            var object = CQ.shared.HTTP.eval(url);
            if (object) {
                this.data = {};
                for (var p in object) {
                    this.data[p] = object[p];
                }
                this.fireEvent("update");

                if (CQ_Analytics.ClickstreamcloudEditor) {
                    CQ_Analytics.ClickstreamcloudEditor.reload();
                }
                return true;
            }

        } catch(error) {
            if (console && console.log) console.log("Error during profile loading", error);
        }
        return false;
    };

    CQ_Analytics.SalesforceProfileDataMgr = new CQ_Analytics.SalesforceProfileDataMgr();
    CQ_Analytics.CCM.register(CQ_Analytics.SalesforceProfileDataMgr);
}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2014 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

/**
 * The <code>CQ_Analytics.CampaignSeedMgr</code> object is a store providing seed user's profile information.
 */
if (CQ_Analytics && !CQ_Analytics.CampaignSeedMgr) {

   	CQ_Analytics.CampaignSeedMgr = CQ_Analytics.JSONStore.registerNewInstance(
            "campaignseed", {});

    CQ_Analytics.CampaignSeedMgr.SERVICE_PATH = "/_jcr_content.campaign.seeddata.json/{seed}";


    CQ_Analytics.CCM.addListener("configloaded", function() {
        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
            if (uid != this.lastUid) {
                this.lastUid = uid;
                this.clear();
                this.fireEvent("update");
            }
        }, CQ_Analytics.CampaignSeedMgr);
    }, CQ_Analytics.CampaignSeedMgr);
}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2014 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

/**
 * The <code>CQ_Analytics.CampaignMetadataMgr</code> object is a store providing user's twitter profile information.
 */
if (CQ_Analytics && !CQ_Analytics.CampaignMetadataMgr) {

    CQ_Analytics.CampaignMetadataMgr = CQ_Analytics.JSONStore.registerNewInstance(
        "campaignmetadata", {});

    CQ_Analytics.CampaignMetadataMgr.SERVICE_PATH = "/_jcr_content.campaign.metadata.json";

    CQ_Analytics.CampaignMetadataMgr.setNLIntegrationURL = function(baseURL) {
        this.baseURL = CQ_Analytics.Utils.externalize(baseURL);
        this.serviceURL = baseURL + this.SERVICE_PATH;
        $CQ.getJSON(CQ.shared.HTTP.noCaching(this.serviceURL), function(data) {
            CQ_Analytics.CampaignMetadataMgr.initJSON(data);
            CQ_Analytics.CampaignMetadataMgr.init();
            CQ_Analytics.CampaignMetadataMgr._isDataAvailable = true;
            if (CQ_Analytics.CampaignMetadataMgr._onDataAvailable) {
                var fct = CQ_Analytics.CampaignMetadataMgr._onDataAvailable.fct;
                fct(CQ_Analytics.CampaignMetadataMgr._onDataAvailable.data);
                CQ_Analytics.CampaignMetadataMgr._onDataAvailable = null;
            }
        });
    };

    CQ_Analytics.CampaignMetadataMgr._isDataAvailable = false;

    CQ_Analytics.CampaignMetadataMgr._onDataAvailable = null;

    /**
     * Ensures the specified function is executed after metadata is actually available.
     * @param fct The function
     * @param data The data that is passed as first parameter to the function
     */
    CQ_Analytics.CampaignMetadataMgr.whenDataAvailable = function(fct, data) {
        if (CQ_Analytics.CampaignMetadataMgr._isDataAvailable) {
            fct(data);
        } else {
            CQ_Analytics.CampaignMetadataMgr._onDataAvailable = {
                fct: fct,
                data: data
            }
        }
    }

}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
/**
 * The <code>CQ_Analytics.ViewedProducts</code> object is a store providing
 * most-recently-viewed product information.
 * @class CQ_Analytics.ViewedProducts
 * @singleton
 * @extends CQ_Analytics.PersistedSessionStore
 */
if (!CQ_Analytics.ViewedProducts) {
    CQ_Analytics.ViewedProducts = function() {
        this.data = null;
        this.MAX_COUNT = 20;
    };

    CQ_Analytics.ViewedProducts.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.ViewedProducts.prototype.STOREKEY = "VIEWEDPRODUCTS";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.ViewedProducts.prototype.STORENAME = "viewedproducts";

    /**
     * Pushes a product onto the most-recently-viewed stack.
     * @param {String} path Product path.
     */
    CQ_Analytics.ViewedProducts.prototype.record = function(path, title, image, price) {
        if (!this.data) {
            this.init();
        }

        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].path == path) {
                this.data.splice(i, 1);
                break;
            }
        }
        if (this.data.length == this.MAX_COUNT) {
            this.data.shift();
        }
        this.data.push({'path': path, 'title': title, 'image': image, 'price': price});
        this.persist();
        this.fireEvent("update");
    };

    /**
     * Returns the most recently pushed product (irrespective of whether or not it currently
     * appears in the shopping cart).
     * @return {Object} containing 'path', 'image', 'title' and 'price' fields
     */
    CQ_Analytics.ViewedProducts.prototype.mostRecent = function() {
        if (!this.data) {
            this.init();
        }

        if (this.data.length > 0) {
            return this.data[this.data.length-1];
        } else {
            return null;
        }
    };

    /**
     * Returns the most recently viewed product which is not in the shopping cart.
     * @return {Object} containing 'path', 'image', 'title' and 'price' fields
     */
    CQ_Analytics.ViewedProducts.prototype.mostRecentNotInCart = function() {
        if (!this.data) {
            this.init();
        }

        if (!CQ_Analytics.CartMgr) {
            return this.mostRecent();
        }
        for (var i = this.data.length-1; i >= 0; i--) {
            var candidate = this.data[i];
            if (!CQ_Analytics.CartHelper.containsProduct(CQ_Analytics.CartMgr.getData(), candidate.path, 1)) {
                return candidate;
            }
        }
        return null;
    };

    /**
     * Returns the n most-recently-viewed products.
     * @param count     the number of products to return
     * @param notInCart if true, only products not already in the shopping cart will be returned
     * @return {Array} of JSON objects, each containing 'path', 'image', 'title' and 'price' fields
     */
    CQ_Analytics.ViewedProducts.prototype.recent = function(count, notInCart) {
        var result = [];

        if (!this.data) {
            this.init();
        }
        if (!CQ_Analytics.CartMgr) {
            notInCart = false;
        }

        for (var i = this.data.length-1; i >= 0 && count > 0; i--) {
            var candidate = this.data[i];
            if (notInCart && CQ_Analytics.CartHelper.containsProduct(CQ_Analytics.CartMgr.getData(), candidate.path, 1)) {
                continue;
            }
            result.push(candidate);
            count--;
        }
        return result;
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.getData = function(excluded) {
        if (!this.data) {
            this.init();
        }

        return this.data;
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.init = function() {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = store.get(this.getStoreKey());

        // convert to real string in case it is a "magic" globalstorage object
        value = value === null ? "" : new String(value);

        var products = value.split(";");
        this.data = [];
        for (var i = 0; i < products.length; i++) {
            var fields = products[i].split(",");
            if (fields.length >= 4) {
                this.data.push({'path': fields[0], 'title': fields[1], 'image': fields[2], 'price': fields[3]});
            } else if (fields.length >= 3) {
                this.data.push({'path': fields[0], 'title': fields[1], 'image': fields[2], 'price': undefined});
            }
        }

        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.persist = function() {
        if (this.fireEvent("beforepersist") !== false) {
            var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});

            var products = [];
            for (var i = 0; i < this.data.length; i++) {
                var product = this.data[i];
                var record = product.path + "," + product.title + "," + product.image;
                if (product.price) {
                    record += "," + product.price;
                }
                products.push(record);
            }
            store.set(this.getStoreKey(), products.join(";"));

            this.fireEvent("persist");
        }
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.reset = function() {
        this.clear();
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.clear = function() {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        store.remove(this.getStoreKey());
        this.data = [];
    };

    CQ_Analytics.ViewedProducts = new CQ_Analytics.ViewedProducts();
    CQ_Analytics.CCM.register(CQ_Analytics.ViewedProducts);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.TagCloudMgr</code> object is a store providing tag cloud information.
 * @class CQ_Analytics.TagCloudMgr
 * @singleton
 * @extends CQ_Analytics.PersistedSessionStore
 */
if (!CQ_Analytics.TagCloudMgr) {
    CQ_Analytics.TagCloudMgr = function() {
        this.data = null;
        this.addedTags = {};
        this.frequencies = null;
        this.initialTags = null;
        this.initialAddedTags = {};

        this.copyObject = function(from) {
            var to = {};
            for(var p in from) {
                to[p] = from[p];
            }
            return to;
        };
    };

    CQ_Analytics.TagCloudMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.STOREKEY = "TAGCLOUD";

/**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.STORENAME = "tagcloud";

    /**
     * Parses the given tag list.
     * @param {String} taglist Tag list to parse.
     * @return {Object} Tags object.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.parseTagList = function(taglist) {
        var tags = {};
        var tagArray = taglist.split(",");
        for (var t in tagArray) {
            if (tagArray.hasOwnProperty(t)) {
                var entry = tagArray[t].split("=");
                if (entry.length == 2) {
                    tags[entry[0]] = parseInt(entry[1]);
                }
            }
        }
        return tags;
    };

    /**
     * Parses a string in the form "foobar=2,bla=3", with entries
     * being <tagid>=<count>.
     * @param {String} taglist Tag list to parse.
     * @return {Object} Current object.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.parseString = function(taglist) {
        this.data = this.parseTagList(taglist);
        return this;
    };

    /**
     * Adds a tag.
     * @param {String} tag Tag name.
     */
    CQ_Analytics.TagCloudMgr.prototype.add = function(tag) {
        this.addedTags[tag] = true;
        this.data[tag] = (this.data[tag] || 0) + 1;
    };

    /**
     * Iterates on the data and applies the function to each data.
     * @param {Function} func Function to apply.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.each = function(func /*(tag, count)*/) {
        for (var t in this.data) {
            if (this.data.hasOwnProperty(t)) {
                func(t, this.data[t]);
            }
        }
    };

    /**
     * Calculates frequencies of each tags.
     * @return {Number[]} Tags frequencies.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.calculateFrequencies = function() {
        var freqSet = {};
        var freqArray = [];

        this.each(function(tag, count) {
            if (!freqSet[count]) {
                freqArray.push(count);
            }
            freqSet[count] = true;
        });

        freqArray.sort(function compareNumbers(a, b) {
            if (a > b)
                return 1;
            if (a < b)
                return -1;
            return 0;
        });

        return freqArray;
    };

    /**
     *
     * @param frequency
     * @param n
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.calculateNtile = function(frequency, n) {
        if (this.frequencies === null) {
            this.frequencies = this.calculateFrequencies();
        }
        var i = 0;
        while (true) {
            // if we reach the end of the array, return the maximum
            // otherwise if we found the frequency or a higher value in the array
            if ((i >= (this.frequencies.length - 1)) || (this.frequencies[i] >= frequency)) {
                return Math.ceil((i + 1) / this.frequencies.length * n);
            }
            i++;
        }
    };

    /**
     * Returns the tags.
     * @return {Object} Tags.
     */
    CQ_Analytics.TagCloudMgr.prototype.getTags = function() {
        return this.data;
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getData = function(excluded) {
        return this.getTags();
    };

    /**
     * Returns the number of occurencies of a tag.
     * @param {String} tag Tag name.
     * @return {Number} Number of occurencies.
     */
    CQ_Analytics.TagCloudMgr.prototype.getTag = function(tag) {
        return this.data[tag] > 0 ? this.data[tag] : 0;
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.init = function(pageTags) {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = store.get(this.getStoreKey());

        // convert to real string in case it is a "magic" globalstorage object
        value = value === null ? "" : new String(value);
        this.data = this.parseTagList(value);

        if (pageTags) {
            // add current page tags to cloud
            for (var i in pageTags) {
                if (pageTags.hasOwnProperty(i)) {
                    this.add(pageTags[i]);
                }
            }
        }

        this.initialTags = this.copyObject(this.data);
        this.initialAddedTags = this.copyObject(this.addedTags);
        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.setProperty = function(tag, value) {
        if (this.data == null) {
            this.init();
        }
        if(value > 0) {
            this.addedTags[tag] = true;
            this.data[tag] = value > 0 ? value : 0;
        } else {
            delete this.addedTags[tag];
            delete this.data[tag];
        }
        this.persist();
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.reset = function() {
        this.clear();
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getProperty = function(tag) {
        if (this.data == null) {
            this.init();
        }
        return this.data[tag] > 0 ? this.data[tag] : 0;
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.removeProperty = function(tag) {
        if (this.data == null) {
            this.init();
        }
        this.setProperty(tag, 0);
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.clear = function() {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        store.remove(this.getStoreKey());
        this.addedTags = {};
        this.data = {};
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getLink = function(name) {
        return "";
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getLabel = function(name) {
        if (name) {
            var namespaceSplit = name.split(":");
            var pathSplit = namespaceSplit[namespaceSplit.length - 1].split("/");
            name = pathSplit[pathSplit.length - 1];
        }
        return name;
    };

    CQ_Analytics.TagCloudMgr = new CQ_Analytics.TagCloudMgr();
    CQ_Analytics.CCM.register(CQ_Analytics.TagCloudMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ProfileDataMgr</code> object is a store providing surfer information, like referral keywords,
 * mouse position and browser details.
 * @class CQ_Analytics.SurferInfoMgr
 * @singleton
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.SurferInfoMgr) {
    CQ_Analytics.SurferInfoMgr = function() {};

    CQ_Analytics.SurferInfoMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.SurferInfoMgr.prototype.STOREKEY = "SURFERINFO";

    /**
     * Store internal name
     * @private
     */
    CQ_Analytics.SurferInfoMgr.prototype.STORENAME = "surferinfo";

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.clear = function() {
        this.data = null;
        this.initProperty = {};
    };

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.SurferInfoMgr = new CQ_Analytics.SurferInfoMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        //add browser info to surfer info
        var bi = CQ_Analytics.BrowserInfoInstance;
        this.addInitProperty("browserFamily", bi.getBrowserFamily());
        this.addInitProperty("browserVersion", bi.getBrowserVersion());
        this.addInitProperty("browser", "${/surferinfo/browserFamily} ${/surferinfo/browserVersion}");
        this.addInitProperty("OS", bi.getOSName());

        this.addInitProperty("resolution", bi.getScreenResolution());
        this.addInitProperty("device", bi.getDeviceType());
        this.addInitProperty("isMobile", bi.isMobile());
        this.addInitProperty("userAgent", bi.getUserAgent());

        var today = new Date();
        this.addInitProperty("day", today.getDate());
        this.addInitProperty("month", today.getMonth() + 1);
        this.addInitProperty("year", today.getFullYear());
        this.addInitProperty("hours", today.getHours());
        this.addInitProperty("minutes", today.getMinutes());

        var image = "${/surferinfo/browserFamily}";
        if( bi.isMobile() ) {
            image = "${/surferinfo/device}";
        }
        this.addInitProperty("image", image);

        var thumbnail = CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/surferinfo/resources/${/surferinfo/image}.png");
        this.addInitProperty("thumbnail", thumbnail);

        if (CQ_Analytics.MousePositionMgr) {
            CQ_Analytics.MousePositionMgr.addListener("update", function() {
                this.setProperty("mouse X", CQ_Analytics.MousePositionMgr.getProperty("x"));
                this.setProperty("mouse Y", CQ_Analytics.MousePositionMgr.getProperty("y"));
            }, this);
        }

        this.addListener("update", function() {
            //magic to maintain image property with logic
            // if( deviceType != "desktop" ) image = device
            // else image = browser
            var deviceType = this.getProperty("device");
            var image = "${/surferinfo/browserFamily}";
            if( bi.isMobile(deviceType) ) {
                image = "${/surferinfo/device}";
            }
            var currentImage = this.getProperty("image");

            //do not set if is the current value to avoid infinite loop
            if( currentImage != image) {
                this.setProperty("image", image);
            }
        }, this);

        //registers Profile Data to clickstreamcloud manager
        this.init();
        CQ_Analytics.CCM.register(this);


    }, CQ_Analytics.SurferInfoMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

if (!CQ_Analytics.SocialGraphMgr) {
    /**
     * Social graph JSONP store. Gets the social graph of the current loaded user and renders it.
     * @class CQ_Analytics.SocialGraphMgr
     * @singleton
     * @since 5.5
     */
    CQ_Analytics.SocialGraphMgr = CQ_Analytics.JSONPStore.registerNewInstance("socialgraph");

    CQ_Analytics.CCM.addListener("configloaded", function() {
        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
            if (uid != this.lastUid) {
                this.fireEvent("update");
            }
        }, CQ_Analytics.SocialGraphMgr);
    }, CQ_Analytics.SocialGraphMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
if( CQ_Analytics.SegmentMgr && !CQ_Analytics.SegmentMgr.isResolvedRegistered) {
    CQ_Analytics.SegmentMgr.isResolvedRegistered = true;

    CQ_Analytics.CCM.addListener("configloaded", function() {
        CQ_Analytics.StoreRegistry.register(CQ_Analytics.SegmentMgr);
        CQ_Analytics.CCM.fireEvent("storeregister", CQ_Analytics.SegmentMgr);

    }, CQ_Analytics.SegmentMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ProfileDataMgr</code> object is a store providing user profile information.
 * @class CQ_Analytics.ProfileDataMgr
 * @singleton
 * @extends CQ_Analytics.PersistedSessionStore
 * @since 5.5
 */
if (!CQ_Analytics.ProfileDataMgr) {
    CQ_Analytics.ProfileDataMgr = function() {
        this.addListener("beforepersist", function() {
            this.checkAuthorizableId();
        }, this);
    };

    CQ_Analytics.ProfileDataMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.ProfileDataMgr.prototype.STOREKEY = "PROFILEDATA";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.ProfileDataMgr.prototype.STORENAME = "profile";

    /**
     * @deprecated
     * Use PROFILE_LOADER
     */
    CQ_Analytics.ProfileDataMgr.prototype.LOADER_PATH = CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.js", true);

    /**
     * @deprecated
     * Use getLoaderURL method
     */
    CQ_Analytics.ProfileDataMgr.prototype.PROFILE_LOADER = CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.json", true);

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.init = function() {
        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});

        var value = this.persistence.get(this.getStoreKey());
        if (!value || value == "") {
            this.data = {};
            for (var p in this.initProperty) {
                this.data[p] = this.initProperty[p];
            }
        } else {
            this.data = this.parse(value);
        }
        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    /**
     * Checks if authorizableId property is defined in profile data and updates the ClickstreamcloudMgr in consequence.
     * See {@link CQ_Analytics.ClientContextMgr#setVisitorId}.
     */
    CQ_Analytics.ProfileDataMgr.prototype.checkAuthorizableId = function() {
        if (!this.data) {
            this.init();
        }
        if (this.data["authorizableId"]) {
            CQ_Analytics.CCM.setVisitorId(this.data["authorizableId"]);
        } else {
            CQ_Analytics.CCM.setVisitorId("");
        }
    };

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.getLink = function(name) {
        return "";
    };

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.clear = function() {
        if (this.persistence) {
            this.persistence.remove(this.getStoreKey());
        }

        this.data = null;
        this.initProperty = {};
    };

    /**
     * Return the profile loader URL.
     * @return {String} The URL
     * @since 5.5
     */
    CQ_Analytics.ProfileDataMgr.prototype.getLoaderURL = function() {
        return CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/profiledata/loader.json");
    };

    /**
     * Loads a profile based on the authoriable id of the user.
     * @param {String} authorizableId The user id
     */
    CQ_Analytics.ProfileDataMgr.prototype.loadProfile = function(authorizableId) {
        var url = this.getLoaderURL();
        url = CQ_Analytics.Utils.addParameter(url, "authorizableId", authorizableId);

        try {
            // the response body will be empty if the authorizableId doesn't resolve to a profile
            var object = CQ.shared.HTTP.eval(url);
            if (object) {
                this.data = {};
                for (var p in object) {
                    this.data[p] = object[p];
                }

                this.persist();
                this.fireEvent("initialize",this);
                this.fireEvent("update");

                if (CQ_Analytics.ClickstreamcloudEditor) {
                    CQ_Analytics.ClickstreamcloudEditor.reload();
                }
                return true;
            }
        } catch(error) {
            if (console && console.log) console.log("Error during profile loading", error);
        }

        return false;
    };

    CQ_Analytics.ProfileDataMgr = new CQ_Analytics.ProfileDataMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        this.checkAuthorizableId();

        //creates link between birthday and age
        this.addListener("update", function(event, property) {
            if (property == "birthday" || !property) {
                var birthday = this.getProperty("birthday");
                var age = this.getProperty("age");
                var newAge = "";
                if (birthday) {
                    try {
                        var getDaysBetween = function(d1, d2) {
                            var tmp = new Date(d2.getTime());
                            tmp.setUTCHours(d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds(), d1.getUTCMilliseconds());
                            var time = tmp.getTime() - d1.getTime();
                            return time / (1000 * 60 * 60 * 24);
                        };
                        var getDayOfYear = function(dob) {
                            var start = new Date(dob.getFullYear(), 0, 0);
                            return getDaysBetween(dob, start) * -1;
                        };
                        var dob = new Date(Date.parse(birthday));
                        if (!isNaN(dob.getTime())) {
                            var today = new Date();
                            //display birthday cake if birthday is today
                            if (getDayOfYear(dob) == getDayOfYear(today) &&
                                dob.getMonth() == today.getMonth()) {
                                newAge = CQ.shared.HTTP.externalize(
                                    CQ_Analytics.ClientContextMgr.getClientContextURL(
                                        "/contextstores/profiledata/resources/birthday_cake.png"));
                            } else {
                                var yearDiff = today.getFullYear() - dob.getFullYear();
                                if (getDayOfYear(dob) > getDayOfYear(today)) {
                                    newAge = yearDiff;
                                } else {
                                    newAge = Math.max(0, yearDiff - 1);
                                }
                            }
                        } else {
                            newAge = "";
                        }
                    } catch(error) {
                        newAge = "";
                    }
                }
                if (age != newAge) {
                    this.setProperty("age", newAge);
                }
            }
        });

        //registers Profile Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);
    }, CQ_Analytics.ProfileDataMgr);
}
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 * AdobePatentID="2884US01"
 */

if (!CQ_Analytics.OrderHistoryMgr) {
    CQ_Analytics.OrderHistoryMgr = new CQ_Analytics.SessionStore();
    CQ_Analytics.OrderHistoryMgr.STOREKEY = "ORDERHISTORY";
    CQ_Analytics.OrderHistoryMgr.STORENAME = "orderhistory";

    CQ_Analytics.OrderHistoryMgr.init = function() {
        if (!this.data) {
            this.data = {};
        } else {
            this.fireEvent("initialize", this);
            this.fireEvent("update");
        }
    };

    CQ_Analytics.CCM.addListener("configloaded", function() {

        CQ_Analytics.CCM.register(this);

    }, CQ_Analytics.OrderHistoryMgr);

}
/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2011 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
//AdobePatentID="2441US01"
if (!CQ_Analytics.GeolocationUtils) {
    /**
     * A helper class providing a set of utility methods to manage a geolocation store.
     * <br>
     * @static
     * @singleton
     * @class CQ_Analytics.GeolocationUtils
     */
    CQ_Analytics.GeolocationUtils = new function() {
        return {
            /**
             * Initializes a persisted json store that contains the geolocation.
             * @param {String} storeName Name of the store
             */
            init: function(storeName) {
                var geoloc;
                try {
                    if (typeof navigator.geolocation === 'undefined') {
                        geoloc = google.gears.factory.create('beta.geolocation');
                    } else {
                        geoloc = navigator.geolocation;
                    }
                } catch(e) {
                }

                var createStore = function(defaultData) {
                    var store = CQ_Analytics.PersistedJSONStore.registerNewInstance(storeName, defaultData);
                    store.addListener("update", function(event, property) {
                        var latitude = CQ_Analytics.ClientContext.get(storeName + "/latitude");
                        var longitude = CQ_Analytics.ClientContext.get(storeName + "/longitude");

                        if (!latitude || !longitude) {
                            if (property != "generatedThumbnail") {
                                store.setProperty("generatedThumbnail", CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback);
                            } else {
                                //if not lat or lng, display the fallback thumbnail
                                if (store.getProperty(property, true) != CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback) {
                                    store.setProperty(property, CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback);
                                }
                            }
                        } else {
                            //if lat or lng, restore initial thumbnail if was set to the fallback
                            if (store.getProperty("generatedThumbnail", true) == CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback) {
                                store.setProperty("generatedThumbnail", store.getInitProperty("generatedThumbnail"));
                            }
                            if (property == "latitude" || property == "longitude" || !property) {
                                CQ_Analytics.GeolocationUtils.computeAddress(latitude, longitude, storeName);
                            }
                        }
                    });
                };

                var initGeolocationStore = function(data, skipValues) {
                    var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                    if (store) {
                        var setDefaults = true;

                        if (data) {
                            var latitude = parseFloat(data.latitude);
                            var longitude = parseFloat(data.longitude);

                            setDefaults = !(isFinite(latitude) && (typeof(latitude) === 'number') && isFinite(longitude) && (typeof(longitude) === 'number'));
                        }

                        /* if latitude or longitude was not set, use default values */
                        if (setDefaults) {
                            data = CQ_Analytics.GeolocationUtils.DEFAULTS;
                        }

                        //backup thumbnail
                        var gt = data["generatedThumbnail"] = store.getInitProperty("generatedThumbnail");
                        store.initJSON(data);

                        if (!skipValues) {
                            store.init();
                            //re set because it gets lost during init
                            store.setProperty("generatedThumbnail", gt);
                        }

                        var address = store.getProperty("address/country");
                        if( !address || address == "" || address == "undefined") {
                            //if no address after init, try to compute it
                            CQ_Analytics.GeolocationUtils.computeAddress(data.latitude, data.longitude, storeName)
                        }
                    } else {
                        createStore(data);
                    }
                };

                createStore();
                if (geoloc) {
                    geoloc.getCurrentPosition(
                        function(data) {
                            var d = {
                                "longitude": data.coords.longitude,
                                "latitude": data.coords.latitude
                            };

                            if (data.address) {
                                d["address"] = data.address
                            }

                            initGeolocationStore(d, CQ_Analytics.CCM.areStoresInitialized);
                        }, function(error) {
                            if (!CQ_Analytics.CCM.areStoresInitialized) {
                                var msg = "Error";
                                if( CQ_Analytics.isUIAvailable ) {
                                    //code = 3 default is timeout
                                    msg = CQ.I18n.getMessage("Connection timeout", null, "timeout while connecting geolocation service");
                                    if (error.code == 1) {
                                        msg = CQ.I18n.getMessage("Permission denied", null, "permission denied message from goelocation service");
                                    } else {
                                        if (error.code == 2) {
                                            msg = CQ.I18n.getMessage("Position unavailable", null, "geolocation service couldn't find location");
                                        }
                                    }
                                }

                                var d = {
                                    "address": {
                                        "country": msg
                                    }
                                };

                                initGeolocationStore(d, CQ_Analytics.CCM.areStoresInitialized);
                            }
                        }
                    );
                } else {
                    initGeolocationStore();
                }
            },

            /**
             * Computes the address based on latitude and longitude and sets it in the according store.
             * @param {Number} lat The latitude
             * @param {Number} lng The longitude
             * @param {String} storeName The name of the store
             */
            computeAddress: function(lat, lng, storeName) {
                var internal = function() {
                    CQ_Analytics.ClientContext.set(storeName + "/address/region","");
                    CQ_Analytics.ClientContext.set(storeName + "/address/countryCode","");
                    CQ_Analytics.ClientContext.set(storeName + "/address/country","");
                    CQ_Analytics.ClientContext.set(storeName + "/address/city","");
                    CQ_Analytics.ClientContext.set(storeName + "/address/postalCode","");
                    var geocode_callback = function() {
                        var point = new google.maps.LatLng(+lat, +lng);
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({location: point},
                            function(result, status) {
                                if (status === "OK" && result ) {
                                    for (var j = result.length - 1;j >= 0; j--) {
                                        if( result[j].address_components ) {
                                            for (var i = 0; i < result[j].address_components.length; i++) {
                                                var a = result[j].address_components[i];
                                                if (a.types && a.types.length) {
                                                    if (a.types[0] == "administrative_area_level_1") {
                                                        CQ_Analytics.ClientContext.set(storeName + "/address/region", a["short_name"]);
                                                    } else {
                                                        switch (a.types[0]) {
                                                            case 'country':
                                                                CQ_Analytics.ClientContext.set(storeName + "/address/countryCode", a["short_name"]);
                                                                CQ_Analytics.ClientContext.set(storeName + "/address/country", a["long_name"]);
                                                                break;
                                                            case 'locality':
                                                                CQ_Analytics.ClientContext.set(storeName + "/address/city", a["short_name"]);
                                                                break;
                                                            case 'postal_code':
                                                                CQ_Analytics.ClientContext.set(storeName + "/address/postalCode", a["short_name"]);
                                                                break;
                                                            default:
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        );
                    };

                    if (!window.google) {
                        window.geocode_callback = geocode_callback;

                        /* script has to be loaded when document.body is available, otherwise google maps fails to initialize their code */
                        $(function() {
                            $CQ.getScript(document.location.protocol + "//maps.google.com/maps/api/js?sensor=false&callback=geocode_callback");
                        });
                    } else {
                        geocode_callback.call();
                    }
                };

                //avoid to run the call too often, especially after setting lat AND lng sequentially
                if( CQ_Analytics.GeolocationUtils.computeAddressTimer ) {
                    clearTimeout(CQ_Analytics.GeolocationUtils.computeAddressTimer);
                }
                CQ_Analytics.GeolocationUtils.computeAddressTimer = setTimeout(function() {
                    internal.call();
                    delete CQ_Analytics.GeolocationUtils.computeAddressTimer;
                },300);
            }
        }
    }();

    //defines the default location if current one could not be resolved (defaults to Adobe HQ)
    CQ_Analytics.GeolocationUtils.DEFAULTS = {
        "latitude": 37.331375,//= Adobe HQ // 47.554995, = basel
        "longitude": -121.893992//= Adobe HQ // 7.589998 = basel
    };

    //fallback thumbnail on California max zoom
    CQ_Analytics.GeolocationUtils.THUMBNAILS = {
        "fallback": document.location.protocol + "//maps.googleapis.com/maps/api/staticmap?center=37,-121&zoom=0&size=80x80&sensor=false"
    }
}


/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 * AdobePatentID="2884US01"
 */

if (!CQ_Analytics.CartMgr) {
    CQ_Analytics.CartMgr = new CQ_Analytics.SessionStore();
    CQ_Analytics.CartMgr.STOREKEY = "CART";
    CQ_Analytics.CartMgr.STORENAME = "cart";

    CQ_Analytics.CartMgr.init = function() {
        if (!this.data) {
            this.data = {};
        } else {
            var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
            var simulationString = store.get(this.STOREKEY);
            if (simulationString) {
                var referenceAndTotal = simulationString.split("=");
                if (referenceAndTotal.length >= 2) {
                    this.referenceTotalPrice = referenceAndTotal[0];
                    this.simulatedTotalPrice = referenceAndTotal[1];
                    this.updateSimulatedPrice();
                }
            }

            this.initialized = true;
            this.fireEvent("initialize", this);
            this.fireEvent("update");
        }
    };

    //
    // A simulated total is the one thing we persist
    //
    CQ_Analytics.CartMgr.persist = function() {
        if (this.fireEvent("beforepersist") !== false) {
            var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
            var simulationString = null;
            if (this.referenceTotalPrice && this.simulatedTotalPrice) {
                simulationString = this.referenceTotalPrice + "=" + this.simulatedTotalPrice;
            }
            store.set(this.STOREKEY, simulationString);
            this.fireEvent("persist");
        }
    };

    //
    // Check to see if a simulation is still valid (ie: the reference value underneath it
    // hasn't changed), and if so, apply it to the store.
    //
    CQ_Analytics.CartMgr.updateSimulatedPrice = function() {
        if (this.simulatedTotalPrice && this.referenceTotalPrice == this.data["totalPriceFloat"]) {
            this.data["totalPrice"] = this.simulatedTotalPrice + "";
            this.data["totalPriceFloat"] = this.simulatedTotalPrice;
        } else {
            this.simulatedTotalPrice = null;
            this.persist();
        }
    };

    //
    // Register that the user has simulated a total price.
    //
    CQ_Analytics.CartMgr.registerSimulatedPrice = function(value) {
        if (this.simulatedTotalPrice) {
            // already in a simulation; just update the value
            this.simulatedTotalPrice = value;
            this.data["totalPrice"] = value + "";
        } else {
            // new simulation; store the reference price and simulated value
            this.referenceTotalPrice = this.data["totalPriceFloat"];
            this.simulatedTotalPrice = value;
        }
        this.persist();
    };

    //
    // Override getProperty/setProperty to handle JSON data.
    //
    CQ_Analytics.CartMgr.getProperty = function(name, raw) {
        if (!this.data) {
            this.init();
        }

        var obj = this.data;
        try {
            var parts = name.split(".");
            for (var i = 0; i < parts.length-1; i++) {
                var part = parts[i];
                var indexPos = part.indexOf("[");
                var index = -1;
                if (indexPos > 0) {
                    index = parseInt(part.substring(indexPos+1, part.length-1));
                    part = part.substring(0, indexPos);
                }
                obj = obj[part];

                if (index >= 0) {
                    obj = obj[index];
                }
            }

            var finalPart = parts[parts.length-1];
            if (!raw) {
                var xssName = CQ.shared.XSS.getXSSPropertyName(finalPart);
                if (obj[xssName]) {
                    return obj[xssName];
                }
            }
            return obj[finalPart];
        } catch(e) {
            return undefined;
        }
    };

    CQ_Analytics.CartMgr.validate = function(name, value) {
        if (name == "totalPriceFloat") {
            var price = parseFloat(value);
            return price >= 0;                  // will return false for NaN
        } else if (name.indexOf(".quantity") > 0) {
            var quantity = parseInt(value);
            return quantity >= 0;               // will return false for NaN
        }
        return true;
    }

    CQ_Analytics.CartMgr.setProperty = function(name, value) {
        if (!this.data) {
            this.init();
        }

        if (!this.validate(name, value)) {
            this.fireEvent("change", name);     // reset UI to current value
            return;
        }

        if (name == "totalPriceFloat") {
            this.registerSimulatedPrice(value);
        }

        var obj = this.data;

        var parts = name.split(".");
        for (var i = 0; i < parts.length-1; i++) {
            var part = parts[i];
            var indexPos = part.indexOf("[");
            var index = -1;
            if (indexPos > 0) {
                index = parseInt(part.substring(indexPos+1, part.length-1));
                part = part.substring(0, indexPos);
            }

            if (!obj[part]) {
                obj[part] = {};
            }
            obj = obj[part];

            if (index >= 0) {
                if (!obj[index]) {
                    obj[index] = {};
                }
                obj = obj[index];
            }
        }

        var finalPart = parts[parts.length-1];
        obj[finalPart] = value;
        var xssName = CQ.shared.XSS.getXSSPropertyName(finalPart);
        this.data[xssName] = CQ.shared.XSS.getXSSValue(value);
        this.fireEvent("change", name);
    };

    CQ_Analytics.CartMgr.addListener("change", function(eventName, propName) {
        var store = this;

        // Send any changed data up to the server for recalculation (and persistence):
        if (propName && propName != "totalPrice") {
            if (CQ_Analytics.CartMgr.refreshTimeout) {
                clearTimeout(CQ_Analytics.CartMgr.refreshTimeout);
            }

            CQ_Analytics.CartMgr.refreshTimeout = setTimeout(function() {
                store.update();
            }, 50);
        }
    });

    //
    // Round-trip store to the server for recalculation and persistence
    //
    CQ_Analytics.CartMgr.update = function() {
        var store = this;

        if (this.updateUrl) {
            $CQ.ajax({
                url: this.updateUrl,
                type: "POST",
                data: {
                    "cart": JSON.stringify(store.data)
                },
                externalize: false,
                encodePath: false,
                hook: true,
                success: function(jsonData) {
                    store.data = jsonData;
                    store.updateSimulatedPrice();
                    CQ_Analytics.ClientContextUtils.renderStore(CQ_Analytics.CartMgr.divId, CQ_Analytics.CartMgr.STORENAME);
                    store.fireEvent("updatecomplete");
                    store.fireEvent("update");
                }
            });

        }
    };

    CQ_Analytics.CartMgr.clear = function() {
        if (this.data["entries"]) {
            this.data["entries"] = [];
        }
        if (this.data["vouchers"]) {
            this.data["vouchers"] = [];
        }
        this.data["totalPrice"] = "0";

        this.referenceTotalPrice = null;
        this.simulatedTotalPrice = null;
    };

    CQ_Analytics.CartMgr.reset = function() {
        this.clear();
        this.fireEvent("update");

        // persist changes locally
        this.persist();

        // and push them up to server
        this.update();
    }

    CQ_Analytics.CCM.addListener("configloaded", function() {

        CQ_Analytics.CCM.register(this);

        CQ_Analytics.SegmentMgr.addListener("update", function() {
            if (!this.promotionsMap) {
                return;
            }
            if (!this.data.promotions) {
                this.data.promotions = [];
            }
            if (!CQ_Analytics.SegmentMgr.areSegmentsLoaded) {
                return;
            }
            var resolvedSegments = CQ_Analytics.SegmentMgr.getResolved();

            var resolvedPromoPaths = [];
            var i, j, path, found;

            for (i = 0; i < this.promotionsMap.length; i++) {
                var testPromotionMap = this.promotionsMap[i];
                var testSegments = testPromotionMap.segments.split(",");
                for (found = false, j = 0; j < testSegments.length; j++) {
                    if ($CQ.inArray(testSegments[j], resolvedSegments) >= 0) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    resolvedPromoPaths.push(testPromotionMap.path);
                }
            }

            var changed = false;

            //
            // Check existing promotions to see if they're no longer resolved:
            //
            for (i = 0; i < this.data.promotions.length; i++) {
                path = this.data.promotions[i]["path"];
                for (found = false, j = 0; j < resolvedPromoPaths.length; j++) {
                    if (resolvedPromoPaths[j] == path) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.data.promotions.splice(i--, 1);  // remove
                    changed = true;
                }
            }

            //
            // See if there are any new promotions that have just been resolved:
            //
            for (i = 0; i < resolvedPromoPaths.length; i++) {
                path = resolvedPromoPaths[i];
                for (found = false, j = 0; j < this.data.promotions.length; j++) {
                    if (this.data.promotions[j]["path"] == path) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    var promo = { "path": path };
                    this.data.promotions.push(promo);
                    changed = true;
                }
            }

            if (changed) {
                this.update();
            }
        }, CQ_Analytics.CartMgr);

        CQ_Analytics.SegmentMgr.addListener("update", function() {
            if (!this.serverPromotionsMap) {
                return;
            }
            if (!this.data.promotions) {
                this.data.promotions = [];
            }
            if (!CQ_Analytics.SegmentMgr.areSegmentsLoaded) {
                return;
            }
            var resolvedSegments = CQ_Analytics.SegmentMgr.getResolved();

            var resolvedPromoPaths = [];
            var i, j, path, found;

            for (i = 0; i < this.serverPromotionsMap.length; i++) {
                var testPromotionMap = this.serverPromotionsMap[i];
                var testSegments = testPromotionMap.segments.split(",");
                for (found = false, j = 0; j < testSegments.length; j++) {
                    if ($CQ.inArray(testSegments[j], resolvedSegments) >= 0) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    resolvedPromoPaths.push(testPromotionMap.path);
                }
            }

            var changed = false;

            //
            // Check existing promotions to see if they're no longer resolved:
            //
            for (i = 0; i < this.data.promotions.length; i++) {
                if (!this.data.promotions[i]["resolve"])
                    continue;

                path = this.data.promotions[i]["path"];
                for (found = false, j = 0; j < resolvedPromoPaths.length; j++) {
                    if (resolvedPromoPaths[j] == path) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.data.promotions.splice(i--, 1);  // remove
                    changed = true;
                }
            }

            //
            // See if there are any new promotions that have just been resolved:
            //
            for (i = 0; i < resolvedPromoPaths.length; i++) {
                path = resolvedPromoPaths[i];
                for (found = false, j = 0; j < this.data.promotions.length; j++) {
                    if (this.data.promotions[j]["path"] == path) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    var promo = { "path": path };
                    this.data.promotions.push(promo);
                    changed = true;
                }
            }

            if (changed) {
                this.update();
            }
        }, CQ_Analytics.CartMgr);

    }, CQ_Analytics.CartMgr);
}


/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

if(!CQ_Analytics.CartHelper) {
    CQ_Analytics.CartHelper = (function() {
        return {

            containsProduct: function(data, product, quantity) {
                var productPagePath = product ? product.substring(0, product.lastIndexOf("#")) : null;
                for (var i = 0; data.entries && i < data.entries.length; i++) {
                    var entry = data.entries[i];
                    var entryPagePath = entry.page.substring(0, entry.page.lastIndexOf("#"));
                    if ((!product || entryPagePath == productPagePath) && (!quantity || entry.quantity >= quantity)) {
                        return true;
                    }
                }
                return false;
            },

            containsPromotion: function(data, promotion, status, operator) {
                if (!promotion)
                    return false;

                if (!status)
                    return false;

                if (!operator)
                    return false;

                function mainPart(s) {
                    if(s) {
                        var i = s.lastIndexOf("#");
                        if (i > -1) {
                            s = s.substring(0, i);
                        }
                    }
                    return s;
                }

                function promotionInCart(data, promotion, status){
                    var promotionPath = mainPart(promotion);
                    var promotions = data.promotions;
                    for (var i = 0; promotions && i < promotions.length; i++) {
                        var cartPromotion = promotions[i];
                        var entryPath = mainPart(cartPromotion.path);
                        if (entryPath == promotionPath && status == cartPromotion.status) {
                            return true;
                        }
                    }
                    return false;
                }

                if (operator == "contains") {
                    return promotionInCart(data, promotion, status);
                } else if (operator == "notcontains") {
                    return !promotionInCart(data, promotion, status);
                } else {
                    return false;
                }
            }
        };
    })();
}

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.CampaignMgr</code> object is a store providing campaign information
 * 
 * This store exposes the following properties:
 * 
 * <ol>
 *  <li>name: the name of the campaign</li>
 *  <li>path: the path of the campaign page in the CQ repository</li>
 *  <li>id: the id the campaign page in Adobe Target</li>
 *  <li>recipe/name</li>
 *  <li>recipe/path</li>
 *  <li>recipe/id</li>
 * </ol>
 * 
 * @class CQ_Analytics.CampaignMgr
 * @singleton
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.CampaignMgr) {
    CQ_Analytics.CampaignMgr = function() {};

    CQ_Analytics.CampaignMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.CampaignMgr.prototype.STOREKEY = "CAMPAIGN";

    /**
     * Store internal name
     * @private
     */
    CQ_Analytics.CampaignMgr.prototype.STORENAME = "campaign";

    /**
     * String identifying the default experience (only used for editing).
     * All experience paths start with a slash, so there can be no collision.
     * @final
     * @private
     */
    CQ_Analytics.CampaignMgr.prototype.DEFAULT_EXPERIENCE = "DEFAULT";

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.init = function() {
        var p;

        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = this.persistence.get(this.getStoreKey());
        if (!this.data) {
            this.data = {};
        }

        if (!value || value === "") {
            for (p in this.initProperty) {
                if (this.initProperty.hasOwnProperty(p)) {
                    this.data[p] = this.initProperty[p];
                }
            }
        } else {
            this.data = this.parse(value);
            // campaigns are not persisted
            var campaigns = this.getInitProperty('campaigns');
            if ( campaigns ) {
                this.data.campaigns = campaigns;
            }
        }
        this.validate();

        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    CQ_Analytics.CampaignMgr.prototype.validate = function() {
        // only check if we have the list of all campaigns
        if (this.data.campaigns) {
            if (!this.getCampaignBy("path", this.data.path) && !this.getCampaignBy("id", this.data.id)) {
                // campaign not found
                this.setCampaign(null);
            }
            if (this.data["recipe/path"] !== CQ_Analytics.CampaignMgr.DEFAULT_EXPERIENCE) {
                if (!this.getExperienceBy("path", this.data["recipe/path"]) && !this.getExperienceBy("id", this.data["recipe/id"])) {
                    // experience not found
                    this.setExperience(null);
                }
            }
        }
    };

    CQ_Analytics.CampaignMgr.prototype.getCampaignBy = function(prop, value) {
        if (!this.data || !this.data.campaigns) {
            return null;
        }
        var i, campaigns = this.data.campaigns;
        for ( i = 0 ; i < campaigns.length; i++ ) {
            var campaign = campaigns[i];
            if ( campaign[prop] === value ) {
                return campaign;
            }
        }
        return null;
    };

    CQ_Analytics.CampaignMgr.prototype.getExperienceBy = function(prop, value) {
        if (!this.data || !this.data.campaigns) {
            return null;
        }
        var i, campaigns = this.data.campaigns;
        for ( i = 0 ; i < campaigns.length; i++ ) {
            var campaign = campaigns[i];
            for ( var j = 0 ; j < campaign.experiences.length ; j++ ) {
                var experience = campaign.experiences[j];
                if ( experience[prop] === value ) {
                    return experience;
                }
            }
        }
        return null;
    };

    CQ_Analytics.CampaignMgr.prototype.setCampaign = function(campaign) {
        // update all the campaign properties
        this.setProperties({
            'name': campaign ? campaign.title : "",
            'path': campaign ? campaign.path  : "",
            'id'  : campaign ? campaign.id    : "",

            'recipe/name' :  campaign ? CQ.I18n.getMessage("(default)") : "",
            'recipe/path' :  campaign ? this.DEFAULT_EXPERIENCE : "",
            'recipe/id'   :  campaign ? this.DEFAULT_EXPERIENCE : ""
        });
    };

    CQ_Analytics.CampaignMgr.prototype.setExperience = function(experience) {
        this.setProperties({
            'recipe/name' :  experience ? experience.title : "",
            'recipe/path' :  experience ? experience.path : "",
            'recipe/id'   :  experience ? experience.id : ""
        });
    };

    CQ_Analytics.CampaignMgr.prototype.setProperty = function(name, value) {
        // certain properties must update co-properties as well
        if (name === "id" || name === "path") {
            // campaigns: path and id are unique
            this.setCampaign(this.getCampaignBy(name, value));
            return;

        } else if (name === "recipe/id" || name === "recipe/path") {
            if (value !== CQ_Analytics.CampaignMgr.DEFAULT_EXPERIENCE) {
                // experiences: path and id are unique
                this.setExperience(this.getExperienceBy(name.substring("recipe/".length), value));
                return;
            }
        }

        // otherwise update individually
        CQ_Analytics.PersistedSessionStore.prototype.setProperty.call(this, name, value);
    };
    
    CQ_Analytics.CampaignMgr.prototype.isCampaignSelected = function() {
        
        return this.getProperty("path") !== '';
    };

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.clear = function() {
        this.data = null;
        this.initProperty = {};
    };

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.CampaignMgr = new CQ_Analytics.CampaignMgr();
    CQ_Analytics.CCM.register(CQ_Analytics.CampaignMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
if (!CQ_Analytics.ActivityStreamMgr) {
    /**
     * Activity stream JSON store. Receives and renders the activities of the currently loaded user.
     * @class CQ_Analytics.ActivityStreamMgr
     * @extends CQ_Analytics.JSONStore
     * @singleton
     * @since 5.5
     */
    CQ_Analytics.ActivityStreamMgr = CQ_Analytics.JSONStore.registerNewInstance("activitystream", {});

    /**
     * Loads and renders the activities.
     * @param {String} profilePath Path to user profile
     * @param {String} divId Id of the div to render to
     * @static
     * @private
     * @method internalRenderer
     * @member CQ_Analytics.ActivityStreamMgr
     */
    CQ_Analytics.ActivityStreamMgr.internalRenderer = function(profilePath, divId) {
        // Sample url:
        // /home/users/a/aparker@geometrixx.info/profile.form.html/etc/clientcontext/default/contextstores/activitystream.html?limit=3
        var url = profilePath + ".form.html";
        url += CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/activitystream.html");
        url += "?limit=3";

        CQ.shared.HTTP.get(url, function(options, success, response) {
            $CQ("#" + divId).children().remove();
            if (success) {
                $CQ("#" + divId).append(response.body);
            }
        });
    };

    /**
     * Registers the <code>activityStore</code> store to profile update and delegates to
     * {@link #internalRenderer} for rendering.
     * @param {String} activityStore The activity store to render
     * @param {String} divId Id of the div to render to
     * @static
     * @method renderer
     * @member CQ_Analytics.ActivityStreamMgr
     */
    CQ_Analytics.ActivityStreamMgr.renderer = function(activityStore, divId) {
        if (!activityStore.isReady) {
            activityStore.isReady = true;

            CQ_Analytics.ClientContextUtils.onStoreRegistered("profile", function(profileStore) {
                profileStore.addListener("update", function(event, path) {
                    var profilePath = this.getProperty("path");
                    if (profilePath != CQ_Analytics.ActivityStreamMgr.currentProfilePath) {
                        CQ_Analytics.ActivityStreamMgr.currentProfilePath = profilePath;
                        CQ_Analytics.ActivityStreamMgr.internalRenderer(profilePath, divId);
                    }
                }, profileStore);

                var profilePath = profileStore.getProperty("path");
                CQ_Analytics.ActivityStreamMgr.currentProfilePath = profilePath;
                CQ_Analytics.ActivityStreamMgr.internalRenderer(profilePath, divId);
            });

        }
        return "";
    }
}
/*
 * This implementation adds error handling which is missing from the standard jQuery $.ajax methods.
 * Its required since the user adds the Audience Manager Partner ID which forms part of the Demdex URL.
 * Taken from the GitHub Repo at 3bb3da3d064ec0efe4cafad3fa36db68f6155e9e
 * 
 * jQuery JSONP Core Plugin 2.4.0 (2012-08-21)
 *
 * https://github.com/jaubourg/jquery-jsonp
 *
 * Copyright (c) 2012 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
( function( $ ) {

    // ###################### UTILITIES ##

    // Noop
    function noop() {
    }

    // Generic callback
    function genericCallback( data ) {
        lastValue = [ data ];
    }

    // Call if defined
    function callIfDefined( method , object , parameters ) {
        return method && method.apply( object.context || object , parameters );
    }

    // Give joining character given url
    function qMarkOrAmp( url ) {
        return /\?/ .test( url ) ? "&" : "?";
    }

    var // String constants (for better minification)
        STR_ASYNC = "async",
        STR_CHARSET = "charset",
        STR_EMPTY = "",
        STR_ERROR = "error",
        STR_INSERT_BEFORE = "insertBefore",
        STR_JQUERY_JSONP = "_jqjsp",
        STR_ON = "on",
        STR_ON_CLICK = STR_ON + "click",
        STR_ON_ERROR = STR_ON + STR_ERROR,
        STR_ON_LOAD = STR_ON + "load",
        STR_ON_READY_STATE_CHANGE = STR_ON + "readystatechange",
        STR_READY_STATE = "readyState",
        STR_REMOVE_CHILD = "removeChild",
        STR_SCRIPT_TAG = "<script>",
        STR_SUCCESS = "success",
        STR_TIMEOUT = "timeout",

        // Window
        win = window,
        // Deferred
        Deferred = $.Deferred,
        // Head element
        head = $( "head" )[ 0 ] || document.documentElement,
        // Page cache
        pageCache = {},
        // Counter
        count = 0,
        // Last returned value
        lastValue,

        // ###################### DEFAULT OPTIONS ##
        xOptionsDefaults = {
            //beforeSend: undefined,
            //cache: false,
            callback: STR_JQUERY_JSONP,
            //callbackParameter: undefined,
            //charset: undefined,
            //complete: undefined,
            //context: undefined,
            //data: "",
            //dataFilter: undefined,
            //error: undefined,
            //pageCache: false,
            //success: undefined,
            //timeout: 0,
            //traditional: false,
            url: location.href
        },

        // opera demands sniffing :/
        opera = win.opera,

        // IE < 10
        oldIE = !!$( "<div>" ).html( "<!--[if IE]><i><![endif]-->" ).find("i").length;

    // ###################### MAIN FUNCTION ##
    function jsonp( xOptions ) {

        // Build data with default
        xOptions = $.extend( {} , xOptionsDefaults , xOptions );

        // References to xOptions members (for better minification)
        var successCallback = xOptions.success,
            errorCallback = xOptions.error,
            completeCallback = xOptions.complete,
            dataFilter = xOptions.dataFilter,
            callbackParameter = xOptions.callbackParameter,
            successCallbackName = xOptions.callback,
            cacheFlag = xOptions.cache,
            pageCacheFlag = xOptions.pageCache,
            charset = xOptions.charset,
            url = xOptions.url,
            data = xOptions.data,
            timeout = xOptions.timeout,
            pageCached,

            // Abort/done flag
            done = 0,

            // Life-cycle functions
            cleanUp = noop,

            // Support vars
            supportOnload,
            supportOnreadystatechange,

            // Request execution vars
            firstChild,
            script,
            scriptAfter,
            timeoutTimer;

        // If we have Deferreds:
        // - substitute callbacks
        // - promote xOptions to a promise
        Deferred && Deferred(function( defer ) {
            defer.done( successCallback ).fail( errorCallback );
            successCallback = defer.resolve;
            errorCallback = defer.reject;
        }).promise( xOptions );

        // Create the abort method
        xOptions.abort = function() {
            !( done++ ) && cleanUp();
        };

        // Call beforeSend if provided (early abort if false returned)
        if ( callIfDefined( xOptions.beforeSend , xOptions , [ xOptions ] ) === !1 || done ) {
            return xOptions;
        }

        // Control entries
        url = url || STR_EMPTY;
        data = data ? ( (typeof data) == "string" ? data : $.param( data , xOptions.traditional ) ) : STR_EMPTY;

        // Build final url
        url += data ? ( qMarkOrAmp( url ) + data ) : STR_EMPTY;

        // Add callback parameter if provided as option
        callbackParameter && ( url += qMarkOrAmp( url ) + encodeURIComponent( callbackParameter ) + "=?" );

        // Add anticache parameter if needed
        !cacheFlag && !pageCacheFlag && ( url += qMarkOrAmp( url ) + "_" + ( new Date() ).getTime() + "=" );

        // Replace last ? by callback parameter
        url = url.replace( /=\?(&|$)/ , "=" + successCallbackName + "$1" );

        // Success notifier
        function notifySuccess( json ) {

            if ( !( done++ ) ) {

                cleanUp();
                // Pagecache if needed
                pageCacheFlag && ( pageCache [ url ] = { s: [ json ] } );
                // Apply the data filter if provided
                dataFilter && ( json = dataFilter.apply( xOptions , [ json ] ) );
                // Call success then complete
                callIfDefined( successCallback , xOptions , [ json , STR_SUCCESS, xOptions ] );
                callIfDefined( completeCallback , xOptions , [ xOptions , STR_SUCCESS ] );

            }
        }

        // Error notifier
        function notifyError( type ) {

            if ( !( done++ ) ) {

                // Clean up
                cleanUp();
                // If pure error (not timeout), cache if needed
                pageCacheFlag && type != STR_TIMEOUT && ( pageCache[ url ] = type );
                // Call error then complete
                callIfDefined( errorCallback , xOptions , [ xOptions , type ] );
                callIfDefined( completeCallback , xOptions , [ xOptions , type ] );

            }
        }

        // Check page cache
        if ( pageCacheFlag && ( pageCached = pageCache[ url ] ) ) {

            pageCached.s ? notifySuccess( pageCached.s[ 0 ] ) : notifyError( pageCached );

        } else {

            // Install the generic callback
            // (BEWARE: global namespace pollution ahoy)
            win[ successCallbackName ] = genericCallback;

            // Create the script tag
            script = $( STR_SCRIPT_TAG )[ 0 ];
            script.id = STR_JQUERY_JSONP + count++;

            // Set charset if provided
            if ( charset ) {
                script[ STR_CHARSET ] = charset;
            }

            opera && opera.version() < 11.60 ?
                // onerror is not supported: do not set as async and assume in-order execution.
                // Add a trailing script to emulate the event
                ( ( scriptAfter = $( STR_SCRIPT_TAG )[ 0 ] ).text = "document.getElementById('" + script.id + "')." + STR_ON_ERROR + "()" )
            :
                // onerror is supported: set the script as async to avoid requests blocking each others
                ( script[ STR_ASYNC ] = STR_ASYNC )

            ;

            // Internet Explorer: event/htmlFor trick
            if ( oldIE ) {
                script.htmlFor = script.id;
                script.event = STR_ON_CLICK;
            }

            // Attached event handlers
            script[ STR_ON_LOAD ] = script[ STR_ON_ERROR ] = script[ STR_ON_READY_STATE_CHANGE ] = function ( result ) {

                // Test readyState if it exists
                if ( !script[ STR_READY_STATE ] || !/i/.test( script[ STR_READY_STATE ] ) ) {

                    try {

                        script[ STR_ON_CLICK ] && script[ STR_ON_CLICK ]();

                    } catch( _ ) {}

                    result = lastValue;
                    lastValue = 0;
                    result ? notifySuccess( result[ 0 ] ) : notifyError( STR_ERROR );

                }
            };

            // Set source
            script.src = url;

            // Re-declare cleanUp function
            cleanUp = function( i ) {
                timeoutTimer && clearTimeout( timeoutTimer );
                script[ STR_ON_READY_STATE_CHANGE ] = script[ STR_ON_LOAD ] = script[ STR_ON_ERROR ] = null;
                head[ STR_REMOVE_CHILD ]( script );
                scriptAfter && head[ STR_REMOVE_CHILD ]( scriptAfter );
            };

            // Append main script
            head[ STR_INSERT_BEFORE ]( script , ( firstChild = head.firstChild ) );

            // Append trailing script if needed
            scriptAfter && head[ STR_INSERT_BEFORE ]( scriptAfter , firstChild );

            // If a timeout is needed, install it
            timeoutTimer = timeout > 0 && setTimeout( function() {
                notifyError( STR_TIMEOUT );
            } , timeout );

        }

        return xOptions;
    }

    // ###################### SETUP FUNCTION ##
    jsonp.setup = function( xOptions ) {
        $.extend( xOptionsDefaults , xOptions );
    };

    // ###################### INSTALL in jQuery ##
    $.jsonp = jsonp;

} )( jQuery );
/*
 * Taken from https://github.com/garycourt/murmurhash-js at 0197ce38bedac0e05f40b9d7152095d06db8292c
 * 
 * License (MIT)
 * Copyright (c) 2011 Gary Court
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {

    /**
     * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
     * 
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/murmurhash-js
     * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
     * @see http://sites.google.com/site/murmurhash/
     * 
     * @param {string}
     *            key ASCII only
     * @param {number}
     *            seed Positive integer only
     * @return {number} 32-bit positive integer hash
     */

    function murmurhash3_32_gc(key, seed) {
        var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

        remainder = key.length & 3; // key.length % 4
        bytes = key.length - remainder;
        h1 = seed;
        c1 = 0xcc9e2d51;
        c2 = 0x1b873593;
        i = 0;

        while (i < bytes) {
            k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) |
                    ((key.charCodeAt(++i) & 0xff) << 24);
            ++i;

            k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

            h1 ^= k1;
            h1 = (h1 << 13) | (h1 >>> 19);
            h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
            h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
        }

        k1 = 0;

        switch (remainder) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
        }

        h1 ^= key.length;

        h1 ^= h1 >>> 16;
        h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
        h1 ^= h1 >>> 16;

        return h1 >>> 0;
    }

    // ###################### INSTALL in jQuery ##
    $.murmurhash3 = murmurhash3_32_gc;

})(jQuery);
/*******************************************************************************
 *
 * ADOBE CONFIDENTIAL __________________
 *
 * Copyright 2013 Adobe Systems Incorporated All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or copyright
 * law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is obtained from Adobe
 * Systems Incorporated.
 ******************************************************************************/
CQ_Analytics = window.CQ_Analytics || {};
CQ_Analytics.AAM = CQ_Analytics.AAM || {};

/**
 * Integration point with AudienceManager endpoint.
 * This either runs in simulation mode in conjunction with the SegmentMgr or it runs in publish mode and calls
 * the demdex end point. It is configured with the following properties on construction.
 *
 * config.partner  the name of the audience manager partner, defaults to geometrixx
 * config.desinationNames  a map of maps defining destinations, keyed by the destination name.
 *                         each submap contains:
 *                            domain, the domain the key exists in
 *                            segkey, the parameter key for segments ids (optional defaults to segs)
 *                            keysep, the character used to separate keys (optional defaults to ,)
 *                            valsep, the character user to separate values (optional defaults to ;)
 *                         using defaults, destination values of segs=123,segs=32423  or segs=342;32432;234 represent
 *                         segmentids.
 * config.simulationPath  if present the CQ server will be used for simulation, if not, the live Audience Manager endpoint will be used.
 * config.containerNSID the audience manager container to use.
 *
 */
CQ_Analytics.AAM.AudienceMgr = CQ_Analytics.AAM.AudienceMgr ||
    function(config) {
        "use strict";

        var partner = config.partner || 'geometrixx';
        var destinationNames = config.destinationNames || {
                "CQIntegrationDestination" : {
                    domain : ".cqclientintegration.adobe.com",
                    segkey : "segs",
                    keysep : ",",
                    valsep : ";"
                }
            };
        var debugMessages = config.debug || false;

        var containerNSID = config.containerNSID || "0";

        // server url used to resolve traits into segments.
        var resolveSegmentsUrl = false;
        if ( config.simulationPath ) {
            resolveSegmentsUrl = config.simulationPath + ".segments.json";
        }



        var debug = function() {};
        if ( debugMessages ) {
            debug = function(msg) {
                console.log("DEBUG: audiencemanager.js "+msg);
            };
        }
        var error = function(msg) {
            console.log("ERROR: audiencemanager.js "+msg);
        };

        debug("Initialise Audience Manager");

        var audienceManagerUserSegments = {};

        var newStore = new CQ_Analytics.JSONStore();


        var demdexEndpoint = "http://";
        if ( "https:" == document.location.protocol ) {
            demdexEndpoint = "https://";
        }
        // the =? at the end is a placeholder for jQuery jsonp. Do not remove.
        demdexEndpoint += encodeURIComponent(partner)+".demdex.net/event?d_cb=?";

        /**
         *
         * Parse the destination response. 2 forms are accepted.
         * segs=23423;23432;23423;23423;234
         * or segs=23423,segs=23432,segs=234234
         * , and ; may be specified.
         * <pre>
         * {
         *    "dests":[
         *       {
         *          "id":"123-1354180261",
         *          "y":"img",
         *          "c":"http://<some destination URL>"
         *       },
         *       {
         *          "id":"1934-1234567899",
         *          "y":"img",
         *          "c":"http://<another destionation URL>"
         *       }
         *    ],
         *    "stuff":[
         *       {
         *          "cn":"aam_tnt",
         *          "cv":"segs=14612,14623",
         *          "ttl":0,
         *          "dmn":"www.my_domain.com",
         *          "u":"abc123"
         *       },
         *       {
         *          "cn":"aam_xyz",
         *          "cv":"segs=14612,14623",
         *          "ttl":0,
         *          "dmn":"www.my_domain.com",
         *          "u":"abc123"
         *       }
         *    ],
         *    "uuid":"abc123"
         * }
         * </pre>
         *
         */
        function parseDestinationResponse(stuff) {
            var segments = {};
            $.each(stuff, function(index, value) {
                // is there cn value present in the map of names.
                if ( destinationNames[value.cn] ) {
                    // does the domain match.
                    var dest = destinationNames[value.cn];
                    if ( value.dmn.slice(0,dest.domain.length) === dest.domain) {
                        var destn = (dest.segkey || "segs") + "=" ;
                        var destl = destn.length;
                        var keysep = dest.keysep || ",";
                        var valsep = dest.valsep || ";";
                        // extract the terms. in the form segs=213;234;234 or segs=23423,segs=23423
                        $.each(value.cv.split(keysep), function( index, seg) {
                            if ( seg.slice(0,destl) === destn ) {
                                $.each(seg.substring(destl).split(valsep), function(index, segv) {
                                    segments[segv] = true;
                                });
                            }
                        });
                    }
                }
            });
            return segments;
        }

        /**
         * An empty callback.
         */
        function emptyCallback() {
        }

        /**
         * set the new segments, and update the store property representing the new segments if required.
         * @param segments a map of segments keyed by id.
         */
        function setUserSegments(segments) {
            audienceManagerUserSegments = {};
            var ids = [];
            $.each(segments, function(key, value){
                if ( value ) {
                    audienceManagerUserSegments[key] = true;
                    ids.push(key);
                }
            });
            ids.sort();
            // this should trigger updates with anything in the client context that is listening.
            // putting a single property in, avoids multiple updates.
            var current = newStore.getProperty("segments");
            var newIds = ids.join(",");
            if ( current !== newIds ) {
                newStore.setProperty("segments", newIds);
                debug("Set segments to "+newIds);
            }
        }

        /**
         * Invoke the end point with new signals and call the provided callback when complete.
         * @param signals map of signals to send, if the key is sid it will be send as AAM traits.
         * @param callbacl an optional callback function.
         */
        function invoke(signals, callback) {
            callback = callback || emptyCallback;
            if ( resolveSegmentsUrl ) {
                // perform a call to the CQ server in simulation mode.
                if ( !signals.sid ) {
                    callback();
                    newStore.fireEvent("update");
                } else {
                    $.getJSON(resolveSegmentsUrl, { t : signals.sid }, function(response) {
                        if ( response.segments ) {
                            setUserSegments(response.segments);
                        }
                        callback();
                        newStore.fireEvent("update");
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        error("Failed to resolve segments from AAM server  "+textStatus+" error "+errorThrown);
                        callback();
                        newStore.fireEvent("update");
                    });
                }
            } else {
                var data = {};
                signals = signals || {};
                $.each(signals, function(key, value) {
                   if ( key === "sid" ) {
                       data.d_sid = value;
                   } else {
                       data["c_"+key] = value;
                   }
                });
                data.d_nsid = containerNSID;
                data.d_rtbd = "json";
                $.jsonp({
                    url : demdexEndpoint,
                    callback : "__aaminvoke",
                    data : data,
                    success : function(json, textStatus, xOptions) {
                        // parse the response extracting segments from all configured destinations.
                        if ( json.stuff ) {
                            setUserSegments(parseDestinationResponse(json.stuff));
                        }
                        callback();
                        newStore.fireEvent("update");
                    },
                    error : function(xOptions, textStatus) {
                        error("Failed to retieve json response "+textStatus);
                        callback();
                        newStore.fireEvent("update");
                    }
                });
            }
        }

        /**
         * get the AAM segments for the user.
         */
        function getUserSegments() {
            return audienceManagerUserSegments;
        }


        /**
         * @param segmentId the AAM segment id.
         * @returns true if the AAM segment identified by segmentId is present.
         */
        function checkSegmentMatch(segmentId) {
            return (audienceManagerUserSegments[segmentId]);
        }


        invoke(false, function() {
            CQ_Analytics.ClientContextMgr.register(newStore);
        });

        // make some functions public.
        newStore.getUserSegments = getUserSegments;
        newStore.matches = checkSegmentMatch;
        newStore.invoke = invoke;
        return newStore;
    };
