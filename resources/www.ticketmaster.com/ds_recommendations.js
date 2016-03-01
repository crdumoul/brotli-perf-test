if (typeof DS_RECOMMENDATIONS === 'undefined') {
    var DS_RECOMMENDATIONS = {};
}
(function ($DS, $IC) {

    /*** EVENTS ***/
    if ($DS.EVENTS === undefined) {
        $DS.EVENTS = {};
    }
    (function ($E) {
        $E.DATA_PROVIDER_DATA_LOADED = 'data_provider_data_loaded';
        $E.DATA_PROVIDER_TIMED_OUT = 'data_provider_timed_out';
    })($DS.EVENTS);

    /**
    * Expected input (params):
    * {
    *     request: {
    *         endpoint:         '//example.com',
    *         page_name:        'home',
    *         current_domain:   'US',
    *         locale:           'en-us',
    *         market_id:        '###',
    *         mid:              '###',
    *         sid:              '###',
    *         bid:              '###',
    *         pid:              '###',
    *         major_category:   '###',
    *         minor_category:   '###',
    *         pgt:              '###',
    *         artist_id:        '###',
    *         artist_ids:       '###',
    *         num_tickets:      '###',
    *         amounts:          '###'
    *     }
    * }
    */
    $DS.DataProvider = function (params) {
        /**
        * Init parameters.
        */
        // path map
        var __endpoint,
            __page_name;
        // query params
        var __current_domain,
            __locale,
            __market_id,
            __pgt,
            __mid,
            __sid,
            __bid,
            __pid,
            __major_category,
            __minor_category,
            __artist_id,
            __artist_ids,
            __num_tickets,
            __amounts;

        /**
        * Private vars.
        * These vars is accessible via getters.
        */
        var _this = this;
        var _request,
            _timeout;

        /**
        * Utility vars.
        */
        var _u_timeout_id,
            _u_timeout_startTime,
            _u_requestAborted;

        /**
        * Inheritance.
        */
        $DS.DataProvider.baseConstructor.call(_this);

        _this.getXMLHttpRequest = function () {
            return _request;
        };

        _this.getTimeout = function () {
            return _timeout;
        };

        _this.setTimeout = function (value) {
            if (value !== undefined) {
                if (typeof value !== 'number') {
                    throw new TypeError('passed value type is not "number"');
                } else if (isNaN(value)) {
                    throw new TypeError('NaN value passed');
                }
            }

            if (_u_timeout_id !== undefined) {
                clearTimeout(_u_timeout_id);
                _u_timeout_id = undefined;
            }
            _timeout = value;
            if (_timeout !== undefined) {
                _u_timeout_id = setTimeout(timeoutHandler, _timeout - ( (new Date()).getTime() - _u_timeout_startTime ) );
            }
        };

        var timeoutHandler = function () {
            _u_timeout_id = undefined;
            _u_requestAborted = true;
            _request.abort();
        };

        var requestHandler = function (event) {
            event = event || window.event;
            if (_u_requestAborted) {
                /* workaround for IE9 */
                _this.dispatchEvent({ type:$DS.EVENTS.DATA_PROVIDER_TIMED_OUT, status:0, XHR_event: event });
            } else if (_request.readyState == 4) {
                if (_u_timeout_id !== undefined) {
                    clearTimeout(_u_timeout_id);
                    _u_timeout_id = undefined;
                }
                var eventType;
                if ( _timeout !== undefined && (new Date()).getTime() - _u_timeout_startTime > _timeout ) {
                    eventType = $DS.EVENTS.DATA_PROVIDER_TIMED_OUT;
                } else {
                    eventType = $DS.EVENTS.DATA_PROVIDER_DATA_LOADED;
                }
                _this.dispatchEvent({ type:eventType, status:_request.status, XHR_event: event });
            }
        };

        _this.load = function () {
            var query_string = '';
            if (__current_domain) {
                query_string += '&domain=' + __current_domain;
            }
            if (__locale) {
                query_string += '&locale=' + __locale;
            }
            if (__market_id) {
                query_string += '&marketId=' + __market_id;
            }
            if (__pgt) {
                query_string += '&pgt=' + __pgt;
            }
            if (__mid) {
                query_string += '&mid=' + __mid;
            }
            if (__sid) {
                query_string += '&sid=' + __sid;
            }
            if (__bid) {
                query_string += '&bid=' + __bid;
            }
            if (__pid) {
                query_string += '&pid=' + __pid;
            }
            if (__major_category) {
                query_string += '&majorCategoryId=' + __major_category;
            }
            if (__minor_category) {
                query_string += '&minorCategoryId=' + __minor_category;
            }
            if (__artist_id) {
                query_string += '&artistId=' + __artist_id;
            }
            if (__artist_ids) {
                query_string += '&artistIds=' + __artist_ids;
            }
            if (__num_tickets) {
                query_string += '&numTickets=' + __num_tickets;
            }
            if (__amounts) {
                query_string += '&amounts=' + __amounts;
            }
            query_string = query_string.substr(1);
            var request_url = __endpoint + ( __page_name ? '/' + __page_name : '' ) + ( query_string ? '?' + query_string : '' );

            _u_requestAborted = false;
            _request.open('GET', request_url, true);
            _request.onreadystatechange = requestHandler;

            if (_u_timeout_id !== undefined) {
                clearTimeout(_u_timeout_id);
                _u_timeout_id = undefined;
            }
            if (_timeout !== undefined) {
                _u_timeout_id = setTimeout(timeoutHandler, _timeout);
            }
            _u_timeout_startTime = (new Date()).getTime();

            _request.send();
        };

        _this.destroy = function () {
            _request.onreadystatechange = undefined;
            _request = null;
            _this = null;
        };

        /**
        * Initialization.
        */
        (function () {
            _request = new XMLHttpRequest();
            _timeout = undefined;
            _u_timeout_id = undefined;
            _u_requestAborted = undefined;

            // handle params
            if (!params) {
                params = {};
            }
            if (!params.request) {
                params.request = {};
            }
            __endpoint = params.request.endpoint;
            __page_name = params.request.page_name;
            __current_domain = params.request.current_domain;
            __locale = params.request.locale;
            __market_id = params.request.market_id;
            __pgt = params.request.pgt;
            __mid = params.request.mid;
            __sid = params.request.sid;
            __bid = params.request.bid;
            __pid = params.request.pid;
            __major_category = params.request.major_category;
            __minor_category = params.request.minor_category;
            __artist_id = params.request.artist_id;
            __artist_ids = params.request.artist_ids;
            __num_tickets = params.request.num_tickets;
            __amounts = params.request.amounts;

            if (typeof __endpoint !== 'string') {
                throw new TypeError('"request.endpoint" type is not "string"');
            }
        })();
    };
    $IC.UTILS.extend($DS.DataProvider, $IC.EventDispatcher);

})(DS_RECOMMENDATIONS, INTERNAL_CORE);
